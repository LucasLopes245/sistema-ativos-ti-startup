# Sistema de Gerenciamento de Ativos de TI

Sistema web para gerenciamento de equipamentos de TI de laboratórios acadêmicos, desenvolvido para a **UNICEPLAC — Gestão de Laboratórios**.

---

## Tecnologias

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT (JSON Web Token)
- **Validação:** Zod
- **Containerização:** Docker + Docker Compose
- **Testes:** Jest

---

## Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- CRUD completo de equipamentos (Monitor, CPU, Teclado)
- Filtros por tipo e status
- Busca por nome em tempo real
- Contador de equipamentos no dashboard
- Exportação de relatórios em JSON e CSV direto pelo navegador
- Modal de confirmação ao deletar equipamentos
- Loading spinner durante carregamento
- Interface responsiva com identidade visual da UNICEPLAC
- Botão de logout na navbar
- Containerização completa com Docker

---

## Rodar com Docker (recomendado)

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando

### Passos

```bash
git clone https://github.com/LucasLopes245/sistema-ativos-ti-startup.git
cd sistema-ativos-ti-startup
docker-compose up --build
```

Aguarde os containers subirem e acesse:

- **Frontend:** `http://localhost`
- **API:** `http://localhost:3000`

### Criar primeiro usuário

Acesse `http://localhost` → clique em **"Cadastre-se"** → crie sua conta → faça login.

---

## Rodar localmente (sem Docker)

### Pré-requisitos

- Node.js 18+
- PostgreSQL instalado e rodando

### 1. Clonar o repositório

```bash
git clone https://github.com/LucasLopes245/sistema-ativos-ti-startup.git
cd sistema-ativos-ti-startup
```

### 2. Configurar o banco de dados

No pgAdmin ou terminal do PostgreSQL, execute:

```sql
CREATE DATABASE sistema_ativos;

\c sistema_ativos

CREATE TABLE equipamentos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  data_aquisicao DATE NOT NULL,
  status VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);
```

### 3. Configurar o Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=sistema_ativos
DB_PASSWORD=sua_senha
DB_PORT=5432
JWT_SECRET=sistema_ativos_chave_2024
```

Inicie o servidor:

```bash
npm run dev
```

API rodando em `http://localhost:3000`

### 4. Configurar o Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend rodando em `http://localhost:5173`

### 5. Criar sua conta

Acesse `http://localhost:5173` → clique em **"Cadastre-se"** → crie sua conta → faça login.

---

## Autenticação

Todas as rotas de equipamentos são protegidas por JWT. O token é gerado no login e enviado automaticamente em todas as requisições.

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/registrar | Registra novo usuário |
| POST | /api/auth/login | Realiza login e retorna token |
| GET | /api/equipamentos | Lista todos |
| GET | /api/equipamentos?tipo=Monitor | Filtra por tipo |
| GET | /api/equipamentos?status=Ativo | Filtra por status |
| GET | /api/equipamentos/:id | Busca por ID |
| POST | /api/equipamentos | Cadastra novo |
| PUT | /api/equipamentos/:id | Atualiza |
| DELETE | /api/equipamentos/:id | Remove |

---

## Exportação de relatórios

**Pelo navegador:** No dashboard clique nos botões **⬇ JSON** ou **⬇ CSV** para baixar o arquivo diretamente.

**Pelo terminal:**
```bash
cd backend
npm run exportar:json  # gera equipamentos.json
npm run exportar:csv   # gera equipamentos.csv
```

---

## Testes unitários

```bash
cd backend
npm test
```

---

## Estrutura do projeto

```
sistema-ativos-ti-startup/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── scripts/
│   ├── tests/
│   ├── server.js
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   ├── nginx.conf
│   └── Dockerfile
├── db/
│   └── init.sql
├── docker-compose.yml
└── README.md
```