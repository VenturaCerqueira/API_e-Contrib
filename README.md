![image](https://github.com/user-attachments/assets/9900b64b-2f39-4d45-9779-f0df3af98be7)
# Projeto Gestão Tributária

Este projeto é uma API desenvolvida para consulta de informações de contribuintes, seus dados cadastrais, endereços e dados relacionados ao DAM (Documento de Arrecadação Municipal). A API foi construída utilizando Node.js com o framework Express, MySQL como banco de dados e Swagger para documentação da API.

* **Acesse (Get):**

> ```
>> https://api-e-contrib.onrender.com/api/contribuintes
> ```


## Tecnologias utilizadas:

- Node.js
- Express.js
- MySQL
- Sequelize
- Swagger
- Winston (para log)
- Jest (para testes)
- Supertest (para testes de integração)

## Funcionalidades:

- Consulta de dados de contribuintes.
- Retorno de dados detalhados do contribuinte, incluindo informações de DAM (Documento de Arrecadação Municipal).
- Processamento e formatação das informações para facilitar o consumo.

## Instalação

### Pré-requisitos

Certifique-se de ter as seguintes dependências instaladas em seu ambiente:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Passos para instalação

1. Clone este repositório:

   ```
   git clone https://github.com/usuario/projeto-gestao-tributaria.git
   ```

<h3> Navegue até o diretório do projeto:<h3>

 ```cd projeto-gestao-tributaria ```

<h3> Instale as dependências:</h3>

 ```npm install ```

<h3> Crie um arquivo .env na raiz do projeto e adicione as credenciais do banco de dados:</h3>

```
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=gestao_tributaria
DB_PORT=3306
```

<h3> Inicie o servidor:

`npm start`

<h3>O servidor estará disponível em http://localhost:3000.</h3>

<h2>Testes</h2>
<h3>Para rodar os testes de integração, utilize o comando:</h3>

`npm test`

## Documentação da API (Swagger)
![image](https://github.com/user-attachments/assets/7cf9879a-0814-4190-a982-0b0827cf9f4d)

A documentação da API está disponível via Swagger. Ao rodar o projeto, acesse a documentação em:
```
https://api-e-contrib.onrender.com/api/api-docs
```
A documentação contém todas as rotas disponíveis, seus parâmetros e exemplos de respostas.

### Endpoints principais:

1. **GET /api/contribuintes**

   - Retorna a lista de contribuintes com seus dados cadastrais, endereços e informações do DAM.
   - **Resposta esperada**:

   ```json
   {
     "success": true,
     "message": "Consulta realizada com sucesso.",
     "data": [
       {
         "contribuinte": {
           "nome": "EMPRESA ABC",
           "dados_cadastrais": {
             "tipo": "Jurídica",
             "cpf_cnpj": "12345678000199",
             "fantasia": "ABC",
             "email": "contato@empresa.com",
             "telefone": "12345678",
             "celular": "987654321"
           },
           "endereco": {
             "pais": "Brasil",
             "cidade_estado": "São Paulo/SP",
             "tipo_logradouro": "Avenida",
             "bairro": "Centro",
             "cep": "01000000",
             "endereco": "Av. Paulista",
             "numero": "100",
             "complemento": "Sala 101",
             "site": "www.empresa.com"
           },
           "dam": [
             { "sigla": "DAM1", "valor_total": 5000 },
             { "sigla": "DAM2", "valor_total": 3000 }
           ]
         }
       }
     ]
   }
   ```

### Exemplos de erro:

* **Erro 500**: Caso ocorra um erro no servidor.

`{ "error": "Erro ao buscar dados" }`

* **Erro 404**: Caso a rota solicitada não seja encontrada.
* `{ "error": "Rota não encontrada" }`

## Estrutura do Projeto

```markdown
## Estrutura do Projeto
O projeto está estruturado da seguinte forma:

├── src/
│   ├── config/                # Configurações da aplicação (banco de dados, etc)
│   ├── controllers/           # Lógica de controle para as rotas
│   ├── routes/                # Definição das rotas da API
│   ├── models/                # Definições dos modelos de dados (Sequelize)
│   ├── services/              # Lógica de serviços (interações com o banco, etc)
│   ├── tests/                 # Testes automatizados
│   ├── app.js                 # Arquivo principal para inicialização do servidor
│   └── db.config.js           # Configuração do banco de dados
├── .env                       # Arquivo de variáveis de ambiente (não comitar no repositório)
├── package.json               # Arquivo de configuração do npm e dependências
├── README.md                  # Documentação do projeto
└── logs/                      # Diretório para logs da aplicação




```

### Detalhes das pastas e arquivos:

- **config/db.config.js**: Configurações do banco de dados MySQL.
- **controllers/contribuinte.controller.js**: Contém a lógica das rotas de contribuintes.
- **models/contribuinte.model.js**: Define a estrutura do banco de dados para o contribuinte.
- **routes/contribuinte.routes.js**: Define as rotas relacionadas aos contribuintes.
- **tests/contribuinte.test.js**: Arquivo com testes automatizados para verificar o funcionamento da API.
- **app.js**: Arquivo principal onde o servidor Express é configurado.
