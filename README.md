# Sistema SPA de Perguntas e Respostas

Aplicação **Single Page Application (SPA)** desenvolvida com:

* React
* TypeScript
* Vite
* Material UI (MUI)
* Context API
* LocalStorage

O sistema permite:

* CRUD de Perguntas
* CRUD de Respostas
* Relação Many-to-Many entre perguntas e respostas
* Perguntas de múltipla escolha
* Responder questionário
* Exportar respostas em `.txt`

---

# Como baixar o repositório

## 1 - Clonar o projeto

```bash
git clone https://github.com/MauroNRB/spa.git
```

## 2 - Entrar na pasta do projeto

```bash
cd spa
```

---

# Instalação

Certifique-se de ter o **Node.js 22+** instalado.

Verifique sua versão:

```bash
node -v
```

## Instalar dependências

```bash
npm install
```

---

# Executar em ambiente de desenvolvimento

```bash
npm run dev
```

O terminal exibirá algo como:

```
Local: http://localhost:5173/
```

Abra essa URL no navegador.

---

# Build para produção

Para gerar a versão otimizada:

```bash
npm run build
```

Para visualizar a build:

```bash
npm run preview
```

---

# Estrutura do Projeto

```
src/
 ├── components/
 │    ├── PerguntaDialog.tsx
 │    └── RespostaDialog.tsx
 ├── context/
 │    └── DataContext.tsx
 ├── pages/
 │    ├── Dashboard.tsx
 │    ├── Perguntas.tsx
 │    └── Respostas.tsx
 ├── types/
 │    └── models.ts
 ├── App.tsx
 ├── main.tsx
 └── theme.ts
```

---

# Funcionalidades

## Administração

* Criar perguntas
* Editar perguntas
* Excluir perguntas
* Criar respostas
* Editar respostas
* Excluir respostas
* Associar/desassociar respostas em perguntas

## Questionário

* Listagem de perguntas ativas
* Seleção múltipla de respostas
* Exportação para arquivo `.txt`

---

# Regras de Negócio

* Cada pergunta é de múltipla escolha
* Respostas podem ser reutilizadas
* Relação Many-to-Many
* Exclusão de resposta remove vínculo nas perguntas
* Persistência em LocalStorage

---

# Tecnologias Utilizadas

* React 18+
* TypeScript
* Vite
* Material UI v5
* MUI DataGrid
* UUID
* React Router DOM

---

# Observações Importantes

* Os dados são armazenados no **LocalStorage do navegador**
* Não há backend
* Para limpar os dados, basta limpar o LocalStorage

---

# Desenvolvedor

Projeto acadêmico / estudo de SPA com React + TypeScript + MUI.

---

# Fluxo Rápido (Resumo)

```bash
git clone https://github.com/MauroNRB/spa.git
cd spa
npm install
npm run dev
```