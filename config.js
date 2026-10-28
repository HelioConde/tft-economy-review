window.JOURNAL_CONFIG={
  "id": "tft-economy-review",
  "title": "TFT Economy Review",
  "titleField": "session",
  "groupFields": [
    "session"
  ],
  "groupLabel": "Decisões por sessão",
  "metric": null,
  "fields": [
    {
      "key": "session",
      "label": "Sessão",
      "type": "text",
      "required": true,
      "maxLength": 50,
      "placeholder": "Ex.: treino da noite"
    },
    {
      "key": "set",
      "label": "Set",
      "type": "text",
      "required": true,
      "maxLength": 40,
      "placeholder": "Ex.: Set de teste"
    },
    {
      "key": "patch",
      "label": "Patch",
      "type": "text",
      "required": true,
      "maxLength": 20,
      "placeholder": "Ex.: 26.1"
    },
    {
      "key": "round",
      "label": "Rodada",
      "type": "text",
      "required": true,
      "maxLength": 20,
      "placeholder": "Ex.: 3-2"
    },
    {
      "key": "gold",
      "label": "Ouro aproximado",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 200
    },
    {
      "key": "level",
      "label": "Nível",
      "type": "number",
      "required": true,
      "min": 1,
      "max": 10
    },
    {
      "key": "action",
      "label": "Ação tomada",
      "type": "select",
      "options": [
        "Guardar",
        "Subir nível",
        "Rolar a loja"
      ]
    },
    {
      "key": "reason",
      "label": "Por que decidiu assim?",
      "type": "textarea",
      "required": true,
      "maxLength": 400,
      "placeholder": "Dinheiro, vida, tabuleiro, lobby..."
    },
    {
      "key": "review",
      "label": "Revisão posterior",
      "type": "textarea",
      "required": true,
      "maxLength": 400,
      "placeholder": "O que testaria numa situação parecida?"
    },
    {
      "key": "date",
      "label": "Data da partida",
      "type": "date",
      "required": true
    }
  ],
  "demo": [
    {
      "session": "Treino fictício A",
      "set": "Demonstração",
      "patch": "demo.1",
      "round": "3-2",
      "gold": 32,
      "level": 6,
      "action": "Guardar",
      "reason": "Exemplo manual: queria preservar juros.",
      "review": "A decisão não prova que houve ganho de colocação.",
      "date": "2026-10-27"
    },
    {
      "session": "Treino fictício A",
      "set": "Demonstração",
      "patch": "demo.1",
      "round": "4-1",
      "gold": 20,
      "level": 7,
      "action": "Rolar a loja",
      "reason": "Exemplo manual: precisava estabilizar.",
      "review": "Comparar alternativas sem usar resultado como causa.",
      "date": "2026-10-27"
    },
    {
      "session": "Treino fictício B",
      "set": "Demonstração",
      "patch": "demo.1",
      "round": "3-2",
      "gold": 50,
      "level": 6,
      "action": "Subir nível",
      "reason": "Exemplo para comparar duas sessões.",
      "review": "Testar novamente em outra composição.",
      "date": "2026-10-27"
    }
  ]
};
