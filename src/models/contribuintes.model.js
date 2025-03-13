const request = require('supertest');
const { Sequelize } = require('sequelize');
const app = require('../app'); // Assumindo que seu app está exportando a instância do Express
const dbConfig = require('../config/db.config');
const winston = require('winston');

// Configuração do logger do Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
  ],
});

// Criando uma instância do Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
  }
);

// Dados de teste fictícios (dados para testes)
const mockContribuintes = [
  {
    id: 1,
    nome: 'Contribuinte 1',
    tipo: 'Física',
    cpf_cnpj: '12345678900',
    fantasia: 'Empresa 1',
    email: 'empresa1@example.com',
    contato: '123456789',
    contato2: '987654321',
    created_at: '2025-03-13',
    updated_at: '2025-03-13',
  },
  {
    id: 2,
    nome: 'Contribuinte 2',
    tipo: 'Jurídica',
    cpf_cnpj: '98765432100',
    fantasia: 'Empresa 2',
    email: 'empresa2@example.com',
    contato: '1122334455',
    contato2: '5566778899',
    created_at: '2025-03-13',
    updated_at: '2025-03-13',
  }
];

beforeAll(async () => {
  try {
    // Autentica a conexão com o banco de dados
    await sequelize.authenticate();
    logger.info('Conexão com o banco de dados bem-sucedida.');

    // Se a tabela não existir, você pode sincronizar os modelos com o banco de dados
    await sequelize.sync(); // Isso cria as tabelas conforme os modelos definidos
    logger.info('Tabelas sincronizadas com o banco de dados.');

    // Simular inserção de dados de teste (mock de dados)
    await sequelize.getQueryInterface().bulkInsert('contribuintes', mockContribuintes);
    logger.info('Dados de teste inseridos no banco de dados.');
  } catch (error) {
    logger.error('Erro na conexão com o banco de dados:', error);
  }
});

afterAll(async () => {
  try {
    // Limpar dados após os testes
    await sequelize.getQueryInterface().bulkDelete('contribuintes', null, {});
    logger.info('Dados de teste removidos.');

    // Fecha a conexão com o banco de dados
    await sequelize.close();
    logger.info('Conexão com o banco de dados fechada.');
  } catch (error) {
    logger.error('Erro ao fechar a conexão com o banco de dados:', error);
  }
});

describe('Testes da API de Contribuintes', () => {
  it('Deve retornar todos os contribuintes', async () => {
    const response = await request(app).get('/contribuintes');
    
    // Verifica se o status da resposta é 200
    expect(response.status).toBe(200);
    
    // Verifica se o retorno é um array
    expect(Array.isArray(response.body)).toBe(true);

    // Verifica se existem dados no array
    expect(response.body.length).toBeGreaterThan(0);
    logger.info('Testes realizados com sucesso, retornando contribuintes.');
  });

  it('Deve retornar uma lista vazia se não houver contribuintes', async () => {
    // Limpar dados antes do teste
    await sequelize.getQueryInterface().bulkDelete('contribuintes', null, {});
    
    const response = await request(app).get('/contribuintes');

    // Verifica se o status da resposta é 200 e a lista está vazia
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0); // A lista de contribuintes deve estar vazia

    logger.info('Lista vazia de contribuintes retornada, conforme esperado.');
  });
});
