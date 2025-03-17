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
    new winston.transports.Console(),  
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/requests.log'),  
      level: 'info',
      maxsize: 1000000,  
      maxFiles: 5,       
      tailable: true    
    })
  ],
});


router.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  
  logger.info(`Recebida requisição: ${req.method} ${req.originalUrl}`, { ip });
  next();
});


router.get('/contribuintes', contribuintesController.getContribuintes);


router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Exporte as rotas
module.exports = router;
