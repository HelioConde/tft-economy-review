# DESIGN_SYSTEM — TFT Economy Review

## Produto e escopo
Revise decisões econômicas por sessão e rodada. A aplicação é um diário pessoal com dados **manuais**, sem banco, autenticação, API de jogo ou pontuações oficiais. Exemplos são rotulados como fictícios e carregados somente por ação explícita.

## Taste Skill / tokens
Fonte única em `styles.css`: `--bg #171a29`, `--accent #f4d58e`, `--accent-two #9de5cf`, cores de superfície, `--focus`, `--space-1/2/3/4/6/8/12/16` (4–64px), raios 10/18/30 px. Tipografia nativa e títulos fluidos.

## Web Design Guidelines
Layout responsivo, teclado e foco visível, links semânticos, salto ao conteúdo, campos com rótulos, atualização de status via `aria-live`, confirmação para exclusões/importação destrutiva e `prefers-reduced-motion`. Dados pessoais nunca são enviados e são inseridos com `textContent` para evitar HTML injetado.

## Awesome Design / Image to Code
O repositório original era somente um README de concepção, sem telas nem capturas preexistentes. Por isso o redesenho visual é um **projeto original**, com emblema CSS, favicon SVG e layout de cartões; não há alegação de conversão de imagens que não foram fornecidas.

## Dados, limitações e comparação
Cada registro é validado conforme os campos do produto; backups versionados `{app,version,entries}`, máximo 250 registros, limite de 1 MB para importação. Chave LocalStorage `tft-economy-review-v1`. Dados guardados localmente, sem criptografia ou sincronização.

**Análise:** agrupamento de registros para revisão pessoal, nunca métricas importadas da API.

## QA e GitHub Pages
GitHub Actions executa testes estáticos e Playwright em 320, 390, 768, 1366, 1600 px, capturas de página inteira, fluxos de exemplos, edição, persistência, exportação, exclusão e overflow. Publicação estática por `gh-pages/(root)` sem build de runtime; a configuração de Pages da conta pode exigir habilitação manual.

## Direção visual exclusiva
Livro-caixa de economia: reestruturação da hierarquia, cartões, densidade e tratamento de dados em `identity.css`, preservando o núcleo JS e o LocalStorage. QA visual com cinco resoluções.

## Extrato econômico (interface específica)
Resumo `Ouro por rodada` agrupa até 5 sessões e 16 decisões por sessão, ordenadas por rodadas numéricas. Barras mostram ouro manual na escala **0–200** sem interpolar valores nem alegar dados em tempo real; filtros de sessão/busca são aplicados. Playwright verifica barras e filtro depois de recarregar. O backup original é preservado.

## Auditoria de screenshots mobile (28/10/2026)
Capturas 320/390 px revisadas. Hero e elementos decorativos comprimidos no mobile para priorizar dados e ações de produto. Link de navegação rápida continua acessível pelo teclado, recortado fora do foco. Testes incluem validação de foco e regressão responsiva em cinco resoluções.

## QA de acessibilidade 28/10/2026
Playwright testa Tab/Shift+Tab, navegação rápida para main com foco, rótulos e contraste computado de inputs e placeholders (mínimo 4,5:1), ações de toque e formulário com 44px de altura, e anel de foco. CSS em `a11y.css` mantém a identidade e os dados locais. Checagem automatizada direcionada, não certificação WCAG.

## Navegação mobile de extrato
Menu acessível em telas até 640 px com identidade de livro-caixa e atalhos para extrato, lançamentos e nova decisão. O extrato agora possui ID para navegação direta. Enter, Escape e links têm cobertura Playwright; nenhum dado/schema foi modificado.

## Navegação contextual desktop
Destinos: Extrato, Lançamentos, Nova decisão. Testes Playwright garantem todos os IDs existentes, navegação ao primeiro recurso e ausência de menu desktop nas larguras mobile. Badge decorativo removido no tablet estreito. CSS independente da versão mobile.
