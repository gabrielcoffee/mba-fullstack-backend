# Backend NestJS - Zeine

API REST para gerenciamento de produtos com upload de imagens.

## 🚀 Instalação

```bash
npm install
```

## 🏃‍♂️ Executar

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

## 📡 Endpoints Principais

### Produtos
- `GET /products` - Listar produtos
- `POST /products` - Criar produto
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

### Upload de Imagens
- `POST /products/upload` - Upload de imagem
- `GET /uploads/:filename` - Acessar imagem

### Autenticação
- `POST /auth/login` - Login

## 🗄️ Banco de Dados

Configure as variáveis de ambiente:
```
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=your_secret_key
```

## 🚀 Deploy no Render

1. Conecte o repositório ao Render
2. Use o arquivo `render.yaml` para configuração automática
3. Render criará automaticamente o banco PostgreSQL
4. Deploy automático

### Deploy Manual (sem render.yaml):
1. Crie um novo Web Service
2. Conecte seu repositório GitHub
3. Configure:
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm run start:prod`
4. Adicione PostgreSQL como add-on
5. Configure variáveis de ambiente:
   - `DATABASE_URL` (fornecido pelo PostgreSQL add-on)
   - `JWT_SECRET` (valor aleatório)
   - `NODE_ENV=production`

## 📁 Estrutura

```
src/
├── auth/          # Autenticação
├── products/      # Produtos e upload
├── users/         # Usuários
└── shared/        # Serviços compartilhados
```

## 🛠️ Tecnologias

- NestJS
- PostgreSQL
- Multer (upload)
- JWT (autenticação)
