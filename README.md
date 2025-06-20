# Projeto Site de vendas

## 1. Visão Geral do Projeto
Este projeto é uma plataforma web robusta e completa que serve como um sistema de catálogo digital e e-commerce para pequenos e médios empreendedores. Ele integra funcionalidades essenciais para a gestão eficiente de produtos, usuários e vendas, proporcionando uma experiência intuitiva tanto para administradores quanto para clientes finais.

A aplicação permite o cadastro detalhado de produtos, incluindo imagens, descrições, categorias e controle de estoque, facilitando a organização e a atualização do catálogo. Além disso, oferece um sistema de autenticação seguro com diferentes níveis de acesso, garantindo que usuários comuns, administradores e usuários supremos tenham permissões adequadas às suas funções.

O sistema também inclui um carrinho de compras interativo, com persistência local e integração para envio de pedidos via WhatsApp, otimizando o processo de venda. Relatórios de estoque são gerados para usuários com permissões elevadas, auxiliando no controle e planejamento de vendas.

Construído com tecnologias modernas e práticas recomendadas de segurança, o projeto prioriza a performance, usabilidade e proteção dos dados, tornando-se uma solução confiável para digitalização de vendas e gerenciamento online.

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
- Filtros dinâmicos por categoria e busca por nome
- Interface responsiva para visualização em dispositivos móveis e desktops

### Gerenciamento de Usuários
- Cadastro e login de usuários com senhas armazenadas com segurança (hash com bcrypt)
- Controle de acesso baseado em níveis de permissão:
  - Usuários comuns: navegam e compram
  - Administradores: gerenciam produtos
  - Usuários Supremos: acesso irrestrito, inclusive ao gerenciamento de usuários e relatórios
- Usuário especial "cadastro" com senha padrão "12345" que também tem acesso ao botão de troca do número WhatsApp

### Autenticação e Segurança
- Sistema de autenticação robusto utilizando JWT com validade de 24 horas
- Proteção de rotas sensíveis com middleware de verificação de token
- Middleware de controle de permissões administrativas e supremas
- Tratamento global de erros para padronizar respostas e facilitar debugging
- Hash seguro de senhas com bcrypt para proteção contra vazamentos

### Carrinho de Compras
- Interface intuitiva para adicionar/remover produtos do carrinho
- Persistência do estado do carrinho utilizando localStorage no navegador
- Envio do resumo do carrinho via WhatsApp com link direto e mensagem pré-formatada
- Modal de visualização do carrinho com total atualizado dinamicamente

### Relatórios
- Geração de relatório simplificado com base no estoque atual
- Acesso restrito exclusivamente aos usuários supremos para garantir segurança e confidencialidade
- Modal para visualização detalhada do relatório no frontend

### Troca do Número WhatsApp
- Botão "Trocar Número WhatsApp" disponível para usuários supremos e para o usuário "cadastro"
- Funcionalidade para alterar o número de WhatsApp associado a um usuário via prompt no frontend
- Atualização segura via API protegida por autenticação e autorização
- Validação básica de entrada no frontend para garantir dados mínimos

## 3. Estrutura do Projeto

- `/public`: Arquivos estáticos do frontend (HTML, CSS, JS)
- `/routes`: Rotas da API REST para produtos, usuários e autenticação
- `/models`: Modelos Mongoose para usuários e produtos
- `/middlewares`: Middlewares para autenticação, autorização e controle de estoque
- `/scripts`: Scripts auxiliares para manutenção e sincronização
- `server.js`: Arquivo principal para inicialização do servidor Express

## 4. Instalação e Configuração

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

## 5. Uso da Aplicação

- Usuários podem se cadastrar e fazer login.
- Usuários supremos têm acesso exclusivo a funções administrativas sensíveis.
- Usuário "cadastro" com senha padrão "12345" tem acesso ao botão de troca do número WhatsApp e deve ser usado para testar todas as funcionalidades completas do sistema.
- Produtos podem ser visualizados, adicionados ao carrinho e pedidos enviados via WhatsApp.
- Área administrativa para gerenciamento de produtos, usuários e relatórios.

## 6. Segurança e Boas Práticas

- Uso de JWT para autenticação e autorização
- Hashing de senhas com bcrypt para segurança
- Middleware Helmet para cabeçalhos de segurança HTTP
- Redirecionamento automático de HTTP para HTTPS em produção
- Middleware para proteção de rotas sensíveis
- Validação de dados no backend para evitar inconsistências
- Tratamento global de erros para facilitar manutenção
- Uso de variáveis de ambiente para segredos e configurações

## 7. Testes e Qualidade

- Testes manuais realizados para cadastro, login, gerenciamento de produtos, usuários, relatórios e troca do número WhatsApp
- Recomenda-se testes adicionais para casos de borda e carga
- Sugestão de uso de ferramentas de testes automatizados para garantir qualidade contínua

## 8. API Endpoints Principais

- `POST /api/auth/login` - Autenticação de usuário, retorna token JWT.
- `GET /api/users/me` - Retorna dados do usuário logado (username, isAdmin, whatsappNumber).
- `PUT /api/users/whatsapp` - Atualiza número de WhatsApp de um usuário (apenas usuários supremos).
- Rotas CRUD para produtos e usuários protegidas por autenticação e autorização.

## 9. Contato e Contribuição

Contribuições são bem-vindas! Para sugestões, bugs ou melhorias, abra uma issue ou envie um pull request.

Contato:
- Alex Dyna
- GitHub: https://github.com/walterdyna
- E-mail: wdyna@hotmail.com

---
Este README foi atualizado para refletir todas as funcionalidades atuais do projeto, incluindo a nova funcionalidade de troca do número WhatsApp e melhorias gerais.
