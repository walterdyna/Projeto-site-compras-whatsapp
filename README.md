# Projeto Site da Quezia

## 1. Visão Geral do Projeto
Este projeto é um sistema completo de catálogo online com funcionalidades integradas de e-commerce e gerenciamento administrativo. Desenvolvido para pequenos e médios empreendedores, oferece uma plataforma moderna, intuitiva e segura para digitalizar vendas. O sistema permite cadastro, edição, visualização e exclusão de produtos, controle de usuários com diferentes níveis de permissão e processos simplificados de compra, com foco em usabilidade, performance e segurança.

A aplicação é construída com as seguintes tecnologias:

### Backend:
- Node.js
- Express
- MongoDB
- Mongoose

### Autenticação e Segurança:
- JWT (JSON Web Tokens) para autenticação robusta
- bcrypt para hash seguro de senhas

### Upload de Imagens:
- Multer para tratamento de arquivos
- Cloudinary para armazenamento em nuvem

### Frontend:
- HTML5, CSS3 e JavaScript puro (sem frameworks)

### Outros:
- Middleware de tratamento global de erros
- Sistema de permissões e controle de acesso por níveis

## 2. Funcionalidades Detalhadas

### Gerenciamento de Produtos
- CRUD completo de produtos (Create, Read, Update, Delete)
- Upload de imagens com armazenamento em nuvem via Cloudinary
- Visualização completa dos dados do produto: nome, preço, descrição, categoria, estoque e imagem
- Validação automática do estoque antes da finalização de uma compra para evitar inconsistências

### Gerenciamento de Usuários
- Cadastro e login de usuários com senhas armazenadas com segurança (hash com bcrypt)
- Controle de acesso baseado em níveis de permissão:
  - Usuários comuns: navegam e compram
  - Administradores: gerenciam produtos
  - Usuários Supremos: acesso irrestrito, inclusive ao gerenciamento de usuários e relatórios

### Autenticação e Segurança
- Sistema de autenticação robusto utilizando JWT com validade de 24 horas
- Proteção de rotas sensíveis com middleware de verificação de token
- Middleware de controle de permissões administrativas e supremas
- Tratamento global de erros para padronizar respostas e facilitar debugging

### Carrinho de Compras
- Interface intuitiva para adicionar/remover produtos do carrinho
- Persistência do estado do carrinho utilizando localStorage no navegador
- Envio do resumo do carrinho via WhatsApp com link direto e mensagem pré-formatada

### Relatórios
- Geração de relatório simplificado com base no estoque atual
- Acesso restrito exclusivamente aos usuários supremos para garantir segurança e confidencialidade

## 3. Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MongoDB (local ou hospedado, como MongoDB Atlas)
- Conta no Cloudinary (opcional, mas essencial para upload de imagens)

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:
```
MONGODB_URI=seu_uri_mongodb
JWT_SECRET=sua_chave_secreta_jwt
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
PORT=3000
```
⚠️ **Importante:** Nunca compartilhe seu `.env` publicamente. Para deploy, use variáveis seguras no ambiente da hospedagem (Vercel, Heroku, etc).

### Passos para Instalação
```bash
git clone https://github.com/walterdyna/Projeto-site-de-vendas
cd site-de-vendas
npm install
npm start
```
Acesse no navegador: `http://localhost:3000`

## 4. Segurança e Node.js

Este projeto prioriza a segurança em sua arquitetura backend com Node.js:

- **Autenticação JWT:** Tokens seguros com validade limitada para proteger sessões.
- **Hash de Senhas:** Uso do bcrypt para armazenar senhas de forma segura, evitando exposição em caso de vazamento.
- **Middleware de Autorização:** Controle rigoroso de acesso a rotas sensíveis, garantindo que apenas usuários autorizados possam executar ações administrativas.
- **Tratamento Global de Erros:** Captura e log de erros para evitar falhas silenciosas e facilitar a manutenção.
- **Validação de Dados:** Proteções contra dados inválidos ou maliciosos, garantindo integridade do banco de dados.
- **Configuração Segura de Variáveis:** Uso de variáveis de ambiente para segredos e configurações sensíveis, evitando exposição no código-fonte.

## 5. Uso da Aplicação

- Usuários podem se cadastrar e fazer login.
- Usuários supremos têm acesso exclusivo a funções administrativas sensíveis.
- Produtos podem ser visualizados, adicionados ao carrinho e pedidos enviados via WhatsApp.
- Área administrativa para gerenciamento de produtos, usuários e relatórios.

## 6. Contato e Contribuição

Contribuições são bem-vindas! Para sugestões, bugs ou melhorias, abra uma issue ou envie um pull request.

Contato:
- Alex Dyna
- GitHub: https://github.com/walterdyna
- E-mail: wdyna@hotmail.com

---
Este README foi atualizado para enfatizar a segurança e a arquitetura Node.js do projeto.
