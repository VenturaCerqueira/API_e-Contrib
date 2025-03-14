// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const app = express();
const contribuintesRoutes = require('./routes/contribuintes.routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');  // Importando a biblioteca YAML
const swaggerDocument = YAML.load('./src/config/swagger.yaml');  // Carregando o arquivo YAML para o Swagger
const winston = require('winston');

// Configuração do logger do Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
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

// Exporta o app e o servidor para os testes
module.exports = { app, server };

// Adicionar uma função para fechar o servidor no final dos testes, se necessário
if (process.env.NODE_ENV !== 'test') {
  process.on('SIGINT', () => {
    server.close(() => {
      logger.info('Servidor encerrado');
      process.exit(0);
    });
  });
}
