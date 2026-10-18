# Back-end da COMPET

Esta pasta sera usada para a API da COMPET, desenvolvida com Node.js e Express.

## Estrutura planejada

```text
backend/
├── src/
│   ├── routes/       # Endpoints da API
│   ├── controllers/  # Regras para atender as requisicoes
│   ├── database/     # Conexao com o MySQL
│   └── server.js     # Inicializacao do servidor
├── .env.example      # Modelo de configuracao sem senhas reais
└── package.json
```

Ainda nao existe uma API implementada. A estrutura sera criada por etapas, depois que o front-end estiver pronto.

## Seguranca

Nunca envie senhas, tokens ou credenciais reais ao GitHub. As variaveis locais devem ficar em `.env`, que e ignorado pelo Git.
