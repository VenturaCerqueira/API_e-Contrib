require('dotenv').config();  

const request = require('supertest');
const { app, server } = require('../app');  
const db = require('../config/db.config.js');
const winston = require('winston');  


const logger = winston.createLogger({
  level: 'info', 
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), 
    new winston.transports.File({ filename: 'logs/test.log', level: 'info' }), 
  ],
});


jest.mock('../config/db.config.js', () => ({
  query: jest.fn((query, callback) => {
    
    const mockData = [
      {
        id: 1,
        nome: 'Empresa XYZ',
        tipo: 'Jurídica',
        cpf_cnpj: '12345678000195',
        fantasia: 'Empresa XYZ',
        email: 'contato@empresa.com',
        contato: '123456789',
        contato2: '987654321',
        endereco: {
          pais: 'Brasil',
          cidade_estado: 'São Paulo/SP',
          tipo_logradouro: 'Avenida',
          bairro: 'Centro',
          cep: '40000000',
          endereco: 'Av. Paulista',
          numero: '100',
          complemento: 'Sala 101',
          site: 'www.empresa.com.br',
        },
        dam: [
          {
            sigla: 'DAM1',
            valor_total: 5000.50,
          },
          {
            sigla: 'DAM2',
            valor_total: 2000.75,
          }
        ],
      },
    ];
    callback(null, mockData);  
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
    
    // Verificando se o campo 'dam' está presente
    expect(response.body.data[0]).toHaveProperty('dam');  // Verifica se existe a chave 'dam' na resposta
    
    // Verificando se o campo 'endereco' está presente
    expect(response.body.data[0]).toHaveProperty('endereco');  // Verifica se existe a chave 'endereco' na resposta
    
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
