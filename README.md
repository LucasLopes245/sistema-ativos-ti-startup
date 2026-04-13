# Sistema de Gerenciamento de Ativos de TI

Sistema web para gerenciamento de equipamentos de TI de laboratórios acadêmicos.

## Tecnologias

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Banco de Dados:** PostgreSQL

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL instalado e rodando

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/sistema-ativos-ti-startup.git
cd sistema-ativos-ti-startup
```

### 2. Configurar o banco de dados
No PostgreSQL, execute:
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
```

### 3. Configurar o Backend
```bash
cd backend
npm install
cp .env.example .env
```
Edite o `.env` com suas credenciais do PostgreSQL.

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

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/equipamentos | Lista todos |
| GET | /api/equipamentos?tipo=Monitor | Filtra por tipo |
| GET | /api/equipamentos?status=Ativo | Filtra por status |
| GET | /api/equipamentos/:id | Busca por ID |
| POST | /api/equipamentos | Cadastra novo |
| PUT | /api/equipamentos/:id | Atualiza |
| DELETE | /api/equipamentos/:id | Remove |

## Exportação de relatórios

```bash
cd backend
npm run exportar:json  # gera equipamentos.json
npm run exportar:csv   # gera equipamentos.csv
```