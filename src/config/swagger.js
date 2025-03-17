const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Contribuintes',
      version: '1.0.0',
      description: 'API para consultar dados detalhados de contribuintes, incluindo informações de identificação, endereço e valores de DAM (Documento de Arrecadação Municipal).',
      contact: {
        name: 'Suporte Técnico',
        email: 'suporte@empresa.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8888/api',
        description: 'Servidor local de desenvolvimento',
      },
    ],
  },
  apis: ['./src/controllers/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Configura a documentação Swagger na aplicação.
 *
 * @param {Express} app - Instância do Express para aplicar o Swagger UI.
 * @param {string} url - Rota onde a documentação estará disponível.
 */
const setupSwagger = (app, url = '/api-docs') => {
  app.use(url, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`📄 Documentação disponível em: http://localhost:8888${url}`);
};

module.exports = setupSwagger;
