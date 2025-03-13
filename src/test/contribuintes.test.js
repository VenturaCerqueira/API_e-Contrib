require('dotenv').config();  // Isso carrega as variáveis do .env

const request = require('supertest');
const { app, server } = require('../app');  // Desestruturando para acessar o 'server'
const db = require('../config/db.config.js');
const winston = require('winston');  // Importando o winston

// Configuração do winston para logs
const logger = winston.createLogger({
  level: 'info', // Pode ser 'info', 'warn', 'error', etc.
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Log no console
    new winston.transports.File({ filename: 'logs/test.log', level: 'info' }), // Log no arquivo
  ],
});

// Mock de conexão com o banco de dados
jest.mock('../config/db.config.js', () => ({
  query: jest.fn((query, callback) => {
    // Simulando uma resposta de sucesso com dados fictícios
    const mockData = [
      {
        id: 1,
        nome: 'Contribuinte 1',
        tipo: 1,
        cpf_cnpj: '12345678900',
        fantasia: 'Empresa 1',
        email: 'empresa1@example.com',
        contato: '123456789',
        contato2: '987654321',
        created_at: '2025-03-13',
        updated_at: '2025-03-13',
      },
    ];
    callback(null, mockData);  // Simulando a resposta com dados
  }),
}));

describe('GET /api/contribuintes', () => {
  it('deve retornar 200 e dados dos contribuintes', async () => {
    const response = await request(app).get('/api/contribuintes');
    
    // Log de execução do teste
    logger.info('Executando o teste GET /api/contribuintes');
    
    // Verificando o status da resposta
    expect(response.status).toBe(200);  // Verifica se a resposta tem status 200
    
    // Verificando a propriedade 'data' na resposta
    expect(response.body).toHaveProperty('data');  // Verifica se existe a chave 'data' na resposta
    
    // Verificando se há pelo menos um contribuinte retornado
    expect(response.body.data.length).toBeGreaterThan(0);  // Verifica se há pelo menos um contribuinte retornado
    
    // Log de sucesso após execução do teste
    logger.info('Teste GET /api/contribuintes executado com sucesso');
  });
});

// Fechar o servidor após os testes
afterAll((done) => {
  server.close(() => {
    logger.info('Servidor fechado após os testes');
    done();
  });
});
