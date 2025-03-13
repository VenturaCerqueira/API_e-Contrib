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

// Função para formatar CPF/CNPJ
const formatCpfCnpj = (value) => {
  // Logando o valor de entrada
  logger.info(`Formatando CPF/CNPJ: ${value}`);
  
  const formattedValue = value.replace(/\D/g, '');  // Remove os caracteres não numéricos

  // Logando o valor formatado
  logger.info(`Valor formatado: ${formattedValue}`);
  
  return formattedValue;
};

module.exports = { formatCpfCnpj };
