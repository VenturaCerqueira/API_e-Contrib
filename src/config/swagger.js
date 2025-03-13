const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Contribuintes',
      version: '1.0.0',
      description: 'API para consultar dados de contribuintes'
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
