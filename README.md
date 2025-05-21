# Cadastro de Usuários

Este projeto foi desenvolvido com o objetivo de atender aos requisitos do desafio técnico proposto pelo Instituto Brasileiro de Biotecnologia e Inovação (IBBI).

A aplicação tem como finalidade realizar o gerenciamento de usuários, permitindo as seguintes operações:

- Criação de usuários

- Listagem de usuários

- Edição de informações de usuários

- Exclusão de usuários

Todos os dados são armazenados localmente por meio de um banco de dados SQLite, garantindo simplicidade e agilidade durante o desenvolvimento e testes da aplicação.

## Tecnologias utilizadas

### Front-end

**React JS** - Uma biblioteca JavaScript usada para criar interfaces de usuário, principalmente em sites e aplicações web. Permitindo criar interfaces de forma modular usando componentes reutilizáveis

### Back-end

**Express.js** - Um framework para Node.js que facilita a criação de API REST

**Prisma ORM** - é uma ferramenta que facilita o uso de banco de dados com Node.js, permitindo interagir com o banco de dados de forma segura e simples

**Sqlite** - Banco de dados relacional que armazena os dados localmente em um único arquivo .db, facilitando assim na hora do desenvolvimento

## Instalação

1.**Clone o Repositório**

```bash
git clone https://github.com/guilhermeQuinco/desafio-tecnico-IBBI.git

cd desafio-tecnico-IBBI

```

2.**Instale e execute o Back-end(http://localhost:3333)**

```bash
cd api

# Instala as depedências
npm install

## Cria as tabelas no banco de dados local
npx prisma migrate dev

## Execute a api
npm run start:dev

```

2.**Instale e execute o Front-end(http://localhost:5173)**

```bash
cd frontend

# Instala as depedências
npm install

## Execute o Front-end
npm run dev

```

## Exemplo de tela

<img src="/assets/screenshot.png" alt="cadastro de usuários screenshot" width="300">
