# ClientHub
Projeto simples em `Next.js` para gerenciamento de dados de clientes.

O projeto foi criado para fins de aprendizado, e utiliza `Next.js 15 RC` como framework base, `Sequelize` como ORM para gerenciamento de banco de dados PostgreSQL, `Next-Auth` para autenticação e, por fim, integração com DropBox para salvar arquivos.

## Configuração inicial
Para utilizar o app, você vai precisar criar um arquivo `.env` para salvar os dados sensíveis necessários para o projeto, e registrar um usuário inicial através de uma requisição de método POST.

### Variáveis de ambiente
Para configuração das variáveis de ambiente, você precisa criar um arquivo com nome `.env` (ou `.env.local` no caso de estar executando o projeto em ambiente de testes) e adicionar as seguintes variáveis:
```
NEXTAUTH_URL={URL}
NEXTAUTH_SECRET={Token}
API_KEY={Chave de API}

DROPBOX_APP_ID={App ID}
DROPBOX_APP_SECRET={App Secret}
DROPBOX_REFRESH_TOKEN={Token}

POSTGRES_URL={Sua URL de conexão com banco de dados}
```

### Registro de usuário
Para registrar um usuário você deve fazer uma requisição POST para o endpoint abaixo e adicionar `x-api-key` aos headers
```http
POST /api/users/register
x-api-key: {{Chave da API}}
```
O corpo da requisição deve ser um JSON no seguinte formato:
```
{
  "username": "{Seu nome de usuário}",
  "password": "{Sua senha}"
}
```
