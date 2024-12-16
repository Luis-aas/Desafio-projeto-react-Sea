**Documentação do Projeto**

**Introdução**

O projeto é uma aplicação React focada no gerenciamento de funcionários. A estrutura de pastas segue uma organização limpa e modular, facilitando a manutenção e escalabilidade. O projeto utiliza tecnologias modernas como **React**, **Vite** e **Ant Design**.

**Estrutura do Projeto**

**Árvore de Diretórios**

/desafio-projeto

|-- node_modules/

|-- public/

|-- src/

|-- api/ // Requisições para a API

|-- getFuncionarios.ts

|-- assets/ // Recursos estáticos como imagens

|-- components/ // Componentes reutilizáveis

|-- Footer/

|-- Header/

|-- Modals/

|-- Sidebar/

|-- UserEmployeed/

|-- View/

|-- FuncionarioCard/

|-- Register/

|-- ViewEmployeed.css

|-- ViewEmployeed.tsx

|-- layouts/ // Layouts padrões da aplicação

|-- DefaultLayouts.css

|-- DefaultLayouts.tsx

|-- pages/ // Páginas principais

|-- Edit/

|-- Enterprise/

|-- Notifications/

|-- Sitemap/

|-- Timeloop/

|-- User/

|-- App.css // Estilos globais

|-- App.tsx // Componente raiz

|-- main.tsx // Ponto de entrada da aplicação

|-- Router.tsx // Configuração de rotas

|-- vite-env.d.ts // Tipagem do Vite

|-- db.json // Banco de dados mock para json-server

|-- eslint.config.js // Configuração do ESLint

|-- index.html // Arquivo HTML principal

|-- package.json // Gerenciador de pacotes

|-- tsconfig.app.json // Configuração do TypeScript

|-- package-lock.json // Lockfile do npm

**Componentes**

Os componentes reutilizáveis estão no diretório **src/components**, facilitando a organização e reutilização.

**Sidebar**

- **Local**: src/components/Sidebar/
- **Descrição**: Componente responsável pela navegação principal da aplicação.
- **Estilo**: Sidebar.css

**FuncionarioCard**

- **Local**: src/components/View/FuncionarioCard/
- **Descrição**: Representação visual de um funcionário, incluindo botões de ação (editar/excluir).
- **Uso**: Utilizado na tela de visualização de funcionários.

**Layouts**

Os layouts padrões são definidos no diretório **src/layouts**.

- **DefaultLayouts.tsx**: Define a estrutura base da aplicação, como o cabeçalho e a barra lateral.
- **DefaultLayouts.css**: Estilização do layout padrão.

**Páginas**

As páginas principais da aplicação estão em **src/pages**. Abaixo está uma breve descrição de cada página:

**Edit**

- **Descrição**: Tela para edição de informações de um funcionário.
- **Estilo**: Edit.css

**Enterprise**

- **Descrição**: Página relacionada a informações gerais da empresa.
- **Estilo**: Enterprise.css

**Notifications**

- **Descrição**: Tela para exibição de notificações do sistema.
- **Estilo**: Notifications.css

**Sitemap**

- **Descrição**: Tela exibindo um mapa visual da aplicação.
- **Estilo**: Sitemap.css

**Timeloop**

- **Descrição**: Página para gerenciamento de tempo.
- **Estilo**: Timeloop.css

**User**

- **Descrição**: Tela com informações do usuário autenticado.
- **Estilo**: User.css

**Rotas**

As rotas são configuradas no arquivo **Router.tsx**. Exemplo:

tsx

Copiar código

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ViewEmployeed from "./components/View/ViewEmployeed";

import Edit from "./pages/Edit/Edit";

function Router() {

return (

&lt;BrowserRouter&gt;

&lt;Routes&gt;

&lt;Route path="/view" element={<ViewEmployeed /&gt;} />

&lt;Route path="/edit" element={<Edit /&gt;} />

&lt;/Routes&gt;

&lt;/BrowserRouter&gt;

);

}

export default Router;

**API Mock (json-server)**

O arquivo **db.json** serve como banco de dados mockado e utiliza o json-server.

- **Endpoints Disponíveis**:
  - GET /funcionarios: Retorna todos os funcionários.
  - POST /funcionarios: Adiciona um novo funcionário.
  - PUT /funcionarios/:id: Atualiza informações do funcionário.
  - DELETE /funcionarios/:id: Remove um funcionário.

**Execução do Projeto**

**Instalação das Dependências**

Execute o comando:

bash

Copiar código

npm install

**Rodar o Projeto**

Inicie a aplicação em modo de desenvolvimento:

bash

Copiar código

npm run dev

**Build de Produção**

Crie a versão otimizada do projeto:

bash

Copiar código

npm run build

**Estilização**

Os arquivos CSS estão organizados em **src/components** e **src/pages**. Cada componente/página possui seu próprio arquivo CSS.

Exemplo de estilo (App.css):

css

body {

margin: 0;

font-family: "Ubuntu", sans-serif;

background-color: #f4f4f4;

}

**Melhorias Futuras**

- **Autenticação**: Implementar um sistema de login seguro.
- **Testes**: Adicionar testes unitários com Jest.
- **Responsividade**: Garantir que o layout funcione perfeitamente em dispositivos móveis.
