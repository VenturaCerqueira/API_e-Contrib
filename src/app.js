const express = require('express');
const app = express();
const contribuintesRoutes = require('./routes/contribuintes.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');

// Middlewares
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use('/api', contribuintesRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
