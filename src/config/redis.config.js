const redis = require('redis');
const winston = require('winston');

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

const redisConfig = {
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    reconnectStrategy: (retries) => Math.min(retries * 50, 500), // Estratégia de reconexão progressiva
    connectTimeout: 10000, // 10 segundos para conexão
  },
  ...(process.env.REDIS_PASSWORD ? { password: process.env.REDIS_PASSWORD } : {}), // Só inclui a senha se for definida
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined, 
};

const client = redis.createClient(redisConfig);

(async () => {
  try {
    await client.connect();
    logger.info('✅ Conexão com o Redis estabelecida.');
  } catch (err) {
    logger.error(`❌ Erro ao conectar com o Redis: ${err.message}`);
  }
})();

client.on('error', (err) => {
  logger.error(`❌ Erro no Redis: ${err.message}`);
});

// Graceful shutdown para desconectar o Redis
process.on('SIGINT', async () => {
  try {
    await client.disconnect();
    logger.info('🚪 Redis desconectado com sucesso.');
  } catch (err) {
    logger.error(`❌ Erro ao desconectar do Redis: ${err.message}`);
  } finally {
    process.exit(0);
  }
});

module.exports = client;
