# 🧪 Automação de Apontamentos – Cypress + Excel

Este projeto automatiza o preenchimento e envio de apontamentos no sistema [GDP Mouts](https://gdp.mouts.info/) usando **Cypress** com suporte à leitura de arquivos Excel (`.xlsx`).

---

## 📦 Requisitos

- Node.js 16 ou superior
- npm
- Git
- Google Chrome (ou outro navegador suportado pelo Cypress)

---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

2. Instale as dependências:

```bash
npm install
```

---

## 🔐 Configuração de variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
CYPRESS_USERNAME=seu_usuario
CYPRESS_PASSWORD=sua_senha
```

> ⚠️ Este arquivo está listado no `.gitignore` e não será versionado.

---

## 📑 Planilha de apontamentos

Coloque sua planilha no seguinte caminho:

```
cypress/fixtures/planilhaHoras.xlsx
```

A planilha deve conter uma aba chamada **`horas`** com as seguintes colunas:

| DATE       | PROJECT                                              | START_HOUR | END_HOUR | PASS  | DESCRIPTION                  |
|------------|-------------------------------------------------------|------------|----------|-------|------------------------------|
| 15/07/2025 | ABI - SOW-2025-170 - SODA ETL Project - QA-Tester... | 08:00      | 08:00    | 12345 | Criação e execução de testes |

### Explicação dos campos:

- `DATE`: Data do apontamento no formato `dd/mm/yyyy`
- `PROJECT`: Nome completo do projeto, exatamente como aparece no select da interface
- `START_HOUR`: Hora de início no formato `hh:mm`
- `END_HOUR`: Hora de término no formato `hh:mm`
- `PASS`: Senha necessária, se exigida (opcional)
- `DESCRIPTION`: Descrição da tarefa realizada

OBS: Os campos devem ser no formato Text na planilha
---

## 🚀 Execução dos testes

### ▶️ Modo visual (GUI)

```bash
npx cypress open
```

- Isso abrirá a interface interativa do Cypress.
- Selecione o teste `gdp-apontar-hora.cy.js` na interface.

### 💻 Modo headless (linha de comando)

```bash
npx cypress run --spec cypress/e2e/gdp-apontar-hora.cy.js --browser chrome
```

> Use `--browser electron` se quiser o modo padrão headless do Cypress.

### 🖥️ Com resolução específica

```bash
npx cypress run --config viewportWidth=1920,viewportHeight=1080
```
---

## 📁 Estrutura do projeto

```
projeto/
├── cypress/
│   ├── e2e/
│   │   └── gdp-apontar-hora.cy.js         # Script de testes
│   ├── fixtures/
│   │   └── planilhaHoras.xlsx         # Planilha de entrada
│   └── support/
│       ├── commands.js
├── cypress.config.js                  # Configuração Cypress + task
├── package.json
└── .env                               # Credenciais do usuário (NÃO versionar)
```

---

## 🛠 Logs e depuração

- O conteúdo da planilha será impresso no Cypress Test Runner com `cy.log()`.
- Logs adicionais aparecem no console (`console.log()`).
- Cada linha é processada independentemente — falhas não interrompem o fluxo.

---

## 🔄 Comportamento da automação

- O script acessa o sistema GDP, faz login, navega até "Novo Registro" e preenche o formulário.
- Cada linha do Excel é usada como um apontamento.
- Campos opcionais como `PASS` são preenchidos apenas se existirem.
- A automação é resiliente e continua mesmo se uma linha falhar.

---

## 🤝 Contribuição

Pull requests e sugestões são bem-vindos.

1. Fork o repositório
2. Crie sua feature branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Minha feature'`
4. Push para o branch remoto: `git push origin minha-feature`
5. Abra um Pull Request

---

## 👨‍💻 Autor

Gabriel Bergmann
