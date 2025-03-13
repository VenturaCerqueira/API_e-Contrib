const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Gestão Tributária',
      version: '1.0.0',
      description: 'API para gerenciar dados tributários e contribuintes',
    },
  },
  apis: ['./src/routes/*.js'],  // Definindo onde estão as rotas
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
