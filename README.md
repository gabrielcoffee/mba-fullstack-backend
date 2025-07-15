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

## 🚂 Deploy no Railway

1. Conecte o repositório ao Railway
2. Adicione serviço PostgreSQL
3. Configure variáveis de ambiente
4. Deploy automático

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
