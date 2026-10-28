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
