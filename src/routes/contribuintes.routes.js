const express = require('express');
const router = express.Router();
const contribuintesController = require('../controllers/contribuintes.controller');
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

// Middleware para logar requisições
router.use((req, res, next) => {
  logger.info(`Recebida requisição: ${req.method} ${req.originalUrl}`);
  next();
});

// Rota para consultar contribuintes
router.get('/contribuintes', contribuintesController.getContribuintes);

// Exporte as rotas
module.exports = router;
