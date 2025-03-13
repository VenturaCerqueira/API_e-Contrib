const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');  // Conexão com o banco de dados

const Contribuinte = sequelize.define('Contribuinte', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cpf_cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fantasia: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  contato: {
    type: DataTypes.STRING,
  },
  // Defina outros campos conforme necessário
}, {
  tableName: 'contribuintes',
});

module.exports = Contribuinte;
