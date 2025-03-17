const express = require('express');
const router = express.Router();
const contribuintesController = require('../controllers/contribuintes.controller');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');  
const swaggerDocument = YAML.load('./src/config/swagger.yaml');  
const winston = require('winston');
const path = require('path');


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),  
    winston.format.colorize(),   
    winston.format.printf(({ timestamp, level, message, ip }) => {
      
      return `${timestamp} [${level}] ${message} - IP: ${ip}`;
    })
  ),
  transports: [
    new winston.transports.Console(),  // Log no console
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/requests.log'),  
      level: 'info',
      maxsize: 1000000,  // Tamanho máximo do arquivo (1MB)
      maxFiles: 5,       
      tailable: true    
    })
  ],
});

// Middleware  logar requisições
router.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  
  logger.info(`Recebida requisição: ${req.method} ${req.originalUrl}`, { ip });
  next();
});

// Rota consultar contribuintes
router.get('/contribuintes', contribuintesController.getContribuintes);

// Rota Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = router;
