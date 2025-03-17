require('dotenv').config();

const express = require('express');
const app = express();
const contribuintesRoutes = require('./routes/contribuintes.routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');  
const swaggerDocument = YAML.load('./src/config/swagger.yaml');  
const winston = require('winston');


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),  
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' })  
  ],
});

// Middlewares
app.use(express.json());  

// Rota para documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api', contribuintesRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 8888;
const server = app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});


module.exports = { app, server };


if (process.env.NODE_ENV !== 'test') {
  process.on('SIGINT', () => {
    server.close(() => {
      logger.info('Servidor encerrado');
      process.exit(0);
    });
  });
}
