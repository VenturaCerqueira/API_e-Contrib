const { Contribuinte } = require('../models/contribuintes.model');
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

const getAllContribuintes = async () => {
  try {
    // Logando quando a busca de contribuintes começar
    logger.info('Iniciando a busca de todos os contribuintes');

    const contribuintes = await Contribuinte.findAll();

    // Logando o sucesso da operação
    logger.info(`Número de contribuintes encontrados: ${contribuintes.length}`);

    return contribuintes;
  } catch (error) {
    // Logando o erro
    logger.error(`Erro ao buscar contribuintes: ${error.message}`);
    
    throw new Error('Erro ao buscar contribuintes');
  }
};

module.exports = { getAllContribuintes };
