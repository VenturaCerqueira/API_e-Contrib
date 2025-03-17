const winston = require('winston');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      format
    ),
    handleExceptions: true, // Captura exceções não tratadas
  }),
  new winston.transports.File({
    filename: 'logs/combined.log',
    format,
    level: 'info',
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    format,
    level: 'error',
    handleExceptions: true,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  transports,
  exitOnError: false, // Não encerra o processo em caso de erro
});

module.exports = logger;
