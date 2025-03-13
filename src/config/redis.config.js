const redis = require('redis');
const winston = require('winston');

// Configuração do logger do Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log', level: 'info' })
  ],
});

// Criação de um cliente Redis
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
  password: process.env.REDIS_PASSWORD || '',
});

// Conectar explicitamente ao Redis
(async () => {
  try {
    await client.connect();
    logger.info('✅ Conexão com o Redis estabelecida.');
  } catch (err) {
    logger.error('❌ Erro ao conectar com o Redis: ' + err.message);
  }
})();

client.on('error', (err) => {
  logger.error('❌ Erro ao conectar com o Redis: ' + err);
});

// Remove client.quit() ou client.disconnect() para manter a conexão aberta!

module.exports = client;
