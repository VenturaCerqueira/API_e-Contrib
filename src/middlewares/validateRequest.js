const { validationResult } = require('express-validator');
const loggers = require('../config/logger'); 

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggers.warn(`⚠️ Erros de validação na requisição: ${JSON.stringify(errors.array())}`);
    
    return res.status(400).json({
      message: 'Houve erros na validação da requisição.',
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validateRequest;
