const Contribuinte = require('../models/contribuintes.model');

const getAllContribuintes = async () => {
  try {
    return await Contribuinte.findAll();
  } catch (error) {
    throw new Error('Erro ao buscar contribuintes');
  }
};

module.exports = { getAllContribuintes };
