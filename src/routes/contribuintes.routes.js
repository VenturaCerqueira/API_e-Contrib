const express = require('express');
const router = express.Router();
const contribuintesController = require('../controllers/contribuintes.controller');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');  // Importando YAMLJS
const swaggerDocument = YAML.load('./src/config/swagger.yaml');  // Carregando o arquivo YAML usando YAMLJS
const winston = require('winston');
const path = require('path');

// Configuração do logger do Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),  // Adiciona timestamp (data e hora)
    winston.format.colorize(),   // Cores no log
    winston.format.printf(({ timestamp, level, message, ip }) => {
      // Customização do formato de log com IP
      return `${timestamp} [${level}] ${message} - IP: ${ip}`;
    })
  ),
  transports: [
    new winston.transports.Console(),  // Log no console
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/requests.log'),  // Local do arquivo de log
      level: 'info',
      maxsize: 1000000,  // Tamanho máximo do arquivo (1MB)
      maxFiles: 5,       // Número máximo de arquivos de log
      tailable: true     // Manter sempre o arquivo mais recente
    })
  ],
});

// Middleware para logar requisições
router.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  // Captura o IP do cliente
  logger.info(`Recebida requisição: ${req.method} ${req.originalUrl}`, { ip });
  next();
});

// Rota para consultar contribuintes
router.get('/contribuintes', contribuintesController.getContribuintes);

// Rota para Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Exporte as rotas
module.exports = router;
