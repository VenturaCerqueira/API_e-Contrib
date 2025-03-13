const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const winston = require('winston');

const logDir = path.join(__dirname, '../../logs');

// Cria o diretório se ele não existir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Configuração do winston para logs
const logger = winston.createLogger({
  level: 'info', // Pode ser 'info', 'warn', 'error', etc.
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Log no console
    new winston.transports.File({ filename: path.join(logDir, 'app.log'), level: 'info' }) // Log no arquivo
  ],
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 10000  // Timeout em milissegundos (10 segundos)
});

// Tentando conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    logger.error(`Erro ao conectar ao banco de dados: ${err.message}`);
    return;
  }
  logger.info('Conexão bem-sucedida ao banco de dados');
});

module.exports = connection;
