# Node.js Application with NestJS / Aplicação Node.js com NestJS

This is a **Node.js** application built using **NestJS**, following a **module-based architecture**. It implements authentication using **JWT** to generate a token upon login, which is later used to validate user permissions.

Esta é uma aplicação **Node.js** desenvolvida com **NestJS**, seguindo uma **arquitetura baseada em módulos**. Foi implementada a autenticação utilizando **JWT** para gerar um token ao logar, que posteriormente é utilizado para validar permissões do usuário.

---

## 📦 Installation & Running / Instalação e Execução

### 1️⃣ Clone the Repository / Clonar o Repositório

```sh
git clone https://github.com/CristianFnds/MyFamilyAlbum.BFF.git
cd MyFamilyAlbum.BFF
```

### 2️⃣ Install dependencies / Instalar dependências

```sh
npm install
```

### 3️⃣ Configure Environment Variables / Configurar Variáveis de Ambiente

Create a `.env` file in the root directory and add:
Crie um arquivo `.env` na raiz do projeto e adicione:

```sh
BASE_URL=https://jsonplaceholder.typicode.com
JWT_SECRET=secretyourtokenhere
JWT_EXPIRATION_TIME="1h"
PORT=3000
```

### 4️⃣ Configure VS Code with Prettier / Configurar o VS Code com Prettier

To ensure consistent code formatting, install **Prettier - Code Formatter** and configure VS Code:
Para garantir a formatação consistente do código, instale o **Prettier - Code Formatter** e configure o VS Code:

1. Install the Prettier extension in VS Code.
2. Add the following settings to your VS Code configuration (`settings.json`):

```json
{
  "editor.formatOnSave": true,
  "prettier.requireConfig": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

### 5️⃣ Run the Application / Executar a Aplicação

```sh
npm run start:dev
```

The application will be available at `http://localhost:3000`.
A aplicação estará disponível em `http://localhost:3000`.

---

## 🧪 Running Tests / Executando Testes

To run tests, use:
Para rodar os testes, use:

```sh
npx jest
```

---

## 🏗️ Module-Based Architecture / Arquitetura Baseada em Módulos

The application follows a **modular architecture**, organizing features into separate modules for better scalability and maintainability.
A aplicação segue uma **arquitetura modular**, organizando funcionalidades em módulos separados para melhor escalabilidade e manutenção.

---

## 🔐 Authentication with JWT / Autenticação com JWT

When logging in, a **JWT token** is generated, which is later used for authorization of protected routes.
Ao logar, um **token JWT** é gerado e posteriormente utilizado para autorização de rotas protegidas.

### Login Validation / Validação de Login

- The system validates only if the provided **email exists** in the API:
- O sistema valida apenas se o **e-mail informado existe** na API:

  [https://jsonplaceholder.typicode.com/users/](https://jsonplaceholder.typicode.com/users/)

- The password can be **anything**.
- A senha pode ser **qualquer coisa**.

### Why this approach? / Motivos para essa abordagem

- Simplifies authentication for testing and development.
- Keeps user validation minimal while focusing on JWT implementation.
- Simplifica a autenticação para testes e desenvolvimento.
- Mantém a validação do usuário mínima, focando na implementação do JWT.

---

## 🚀 Future Improvements / Melhorias Futuras

✅ **Middleware for Authorization**

- Create a middleware to handle authorization for all protected routes.
- Criar um middleware para autorização de todas as rotas protegidas.

✅ **Better Exception Handling**

- Implement a more robust way to handle exceptions.
- Implementar uma forma mais eficiente de tratar exceções.
