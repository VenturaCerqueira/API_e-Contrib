const express = require('express');
const router = express.Router();
const contribuintesController = require('../controllers/contribuintes.controller');

// Definindo a rota para obter os contribuintes
router.get('/contribuintes', contribuintesController.getContribuintes);

module.exports = router;
