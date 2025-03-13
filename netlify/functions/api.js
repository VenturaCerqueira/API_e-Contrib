// netlify/functions/api.js
const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Importe as rotas da sua API
const contribuintesRoutes = require('../../src/routes/contribuintes.routes');

// Usando as rotas da sua API
app.use(express.json());
app.use('/api', contribuintesRoutes);

module.exports.handler = serverless(app);
