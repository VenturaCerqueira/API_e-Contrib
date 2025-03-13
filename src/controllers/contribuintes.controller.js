const contribuintesService = require('../services/contribuintes.service');
const logger = require('../config/logger');

const getContribuintes = async (req, res) => {
  try {
    const contribuintes = await contribuintesService.getAllContribuintes();
    res.status(200).json(contribuintes);
  } catch (error) {
    logger.error(`Erro ao buscar contribuintes: ${error.message}`);
    res.status(500).json({ message: 'Erro ao buscar contribuintes', error });
  }
};

module.exports = { getContribuintes };
