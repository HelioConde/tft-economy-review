"use strict";
const auditAccessibility=require("./accessibility-audit.cjs");
const {chromium}=require("playwright"),{spawn}=require("node:child_process"),fs=require("node:fs");
fs.mkdirSync("screenshots",{recursive:true});
const server=spawn("python3",["-m","http.server","8755","--bind","127.0.0.1"],{stdio:"ignore"});
const sleep=n=>new Promise(resolve=>setTimeout(resolve,n));
(async()=>{
 await sleep(750);
 const browser=await chromium.launch(process.env.BROWSER_CHANNEL==="chrome"?{channel:"chrome",headless:true}:{headless:true});
 const results=[],viewports=[320,390,768,1366,1600];
 try{for(const width of viewports){
  const viewport={width,height:width<500?750:850};
  const ctx=await browser.newContext({viewport,reducedMotion:"reduce",acceptDownloads:true}),page=await ctx.newPage();
  const errors=[];page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
  page.on("response",r=>{if(r.status()>=400&&r.url().startsWith("http://127.0.0.1:8755"))errors.push(r.status()+" "+r.url())});
  try{
   const response=await page.goto("http://127.0.0.1:8755/",{waitUntil:"load"});if(response.status()!==200)errors.push("Home status "+response.status());
   await page.getByRole("heading",{level:1}).waitFor();
    await auditAccessibility(page,errors);
   const desktopNav=page.locator("header nav.nav-links");
   const desktopLinks=desktopNav.locator('a[href^="#"]');
   if(await desktopLinks.count()!==3)errors.push("Desktop navigation missing product shortcuts");
   for(const link of await desktopLinks.all()){
     const id=(await link.getAttribute("href")).slice(1);
     if(await page.locator('[id="'+id+'"]').count()!==1)errors.push("Desktop target #"+id+" absent/duplicated");
   }
   if(page.viewportSize().width>640){
     if(!await desktopNav.isVisible())errors.push("Desktop links hidden");
     else{const href=await desktopLinks.first().getAttribute("href");await desktopLinks.first().click();if(await page.evaluate(()=>location.hash)!==href)errors.push("Desktop anchor navigation failed");}
   }else if(await desktopNav.isVisible())errors.push("Desktop navigation unexpectedly visible on mobile");

   const menu=page.locator("header details.mobile-nav");
   if(page.viewportSize().width<=640){
    if(!await menu.isVisible())errors.push("Ledger mobile menu hidden");
    const summary=menu.locator("summary");await summary.focus();await page.keyboard.press("Enter");
    if(!await menu.evaluate(el=>el.open))errors.push("Enter did not open ledger menu");
    if(await menu.locator("nav a").count()!==3)errors.push("Ledger menu incomplete");
    await page.keyboard.press("Escape");if(await menu.evaluate(el=>el.open))errors.push("Escape did not close menu");
    await summary.click();const destination=await menu.locator("nav a").first().getAttribute("href");await menu.locator("nav a").first().click();
    if(await menu.evaluate(el=>el.open))errors.push("Menu did not close after selection");
    if(await page.evaluate(()=>location.hash)!==destination)errors.push("Ledger menu destination mismatch");
   }else if(await menu.isVisible())errors.push("Mobile ledger menu visible on desktop");

   const skip=page.locator("a.skip,a.skip-link");
   if(await skip.count()!==1)errors.push("Missing unique keyboard skip link");
   else{const before=await skip.evaluate(el=>getComputedStyle(el).clipPath);
     if(!before.includes("inset"))errors.push("Skip link not clipped at rest");
     await skip.focus();if(await skip.evaluate(el=>getComputedStyle(el).clipPath)!=="none")errors.push("Skip link not visible on keyboard focus");
     await skip.evaluate(el=>el.blur());}

   if(await page.locator("#entries article").count()!==0)errors.push("First visit must be empty");
   await page.getByRole("button",{name:/Carregar exemplos/i}).click();
   const expected=Number(await page.locator("body").getAttribute("data-demo-count"));
   if(await page.locator("#entries article").count()!==expected)errors.push("Demo count");
   await page.reload();
   if(await page.locator("#entries article").count()!==expected)errors.push("LocalStorage did not persist");
   if(await page.locator("#economy-ledger .ledger-row").count()!==expected)errors.push("Manual gold ledger must render demo rounds");
   const firstGroup=await page.locator("#group-filter option").nth(1).getAttribute("value");
   await page.locator("#group-filter").selectOption(firstGroup);
   if(await page.locator("#economy-ledger .ledger-session").count()!==1)errors.push("Ledger does not respect session filter");
   await page.locator("#group-filter").selectOption("");
   await page.locator("#entries article").first().getByRole("button",{name:"Editar"}).click();
   const input=page.locator("#field-"+await page.locator("body").getAttribute("data-primary-field"));
   const original=await input.inputValue();await input.fill(original+" teste");
   await page.getByRole("button",{name:"Atualizar anotação"}).click();
   if(!await page.locator("#entries").getByText(original+" teste",{exact:true}).count())errors.push("Edit did not update");
   const downloadPromise=page.waitForEvent("download");
   await page.getByRole("button",{name:"Exportar JSON"}).click();
   const download=await downloadPromise;if(!download.suggestedFilename().endsWith(".json"))errors.push("Export failed");
   page.once("dialog",dlg=>dlg.accept());
   await page.locator("#entries article").first().getByRole("button",{name:"Excluir"}).click();
   if(await page.locator("#entries article").count()!==expected-1)errors.push("Delete failed");
   const offenders=await page.evaluate(()=>[...document.querySelectorAll("body *")].filter(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return s.position!=="fixed"&&s.display!=="none"&&r.width>0&&r.right>innerWidth+2}).slice(0,6).map(el=>el.tagName+"."+(String(el.className||"").replaceAll(" ","."))));
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))errors.push("Horizontal overflow: "+offenders.join(", "));
   await page.screenshot({path:"screenshots/"+width+".png",fullPage:true,animations:"disabled"});
   results.push({width,passed:errors.length===0,errors});
  }catch(e){errors.push(String(e));results.push({width,passed:false,errors})}
  finally{await ctx.close()}
 }}
 finally{await browser.close();server.kill()}
 fs.writeFileSync("screenshots/report.json",JSON.stringify(results,null,2));
 results.forEach(r=>console.log(JSON.stringify(r)));
 if(results.length!==viewports.length||results.some(r=>!r.passed))process.exitCode=1;
})().catch(e=>{console.error(e);server.kill();process.exitCode=1});
