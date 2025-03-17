const request = require('supertest');
const { Sequelize } = require('sequelize');
const app = require('../app'); 
const dbConfig = require('../config/db.config');
const winston = require('winston');


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


const mockContribuintes = [
  {
    id: 1,
    nome: 'Empresa XYZ',
    dados: {
      tipo: 'Jurídica',
      cpf_cnpj: '12345678000195',
      fantasia: 'Empresa XYZ',
      email: 'contato@empresa.com',
      telefone: '123456789',
      celular: '987654321',
    },
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
        valor_total: 3000.75,
      },
    ]
  },
  {
    id: 2,
    nome: 'Empresa ABC',
    dados: {
      tipo: 'Jurídica',
      cpf_cnpj: '98765432100195',
      fantasia: 'Empresa ABC',
      email: 'empresa@abc.com',
      telefone: '555123456',
      celular: '555987654',
    },
    endereco: {
      pais: 'Brasil',
      cidade_estado: 'Rio de Janeiro/RJ',
      tipo_logradouro: 'Rua',
      bairro: 'Copacabana',
      cep: '22000000',
      endereco: 'Rua Barata Ribeiro',
      numero: '456',
      complemento: 'Loja 01',
      site: 'www.empresaabc.com.br',
    },
    dam: [
      {
        sigla: 'DAM1',
        valor_total: 2000.00,
      },
    ]
  },
  {
    id: 3,
    nome: 'Empresa DEF',
    dados: {
      tipo: 'Jurídica',
      cpf_cnpj: '55512345678',
      fantasia: 'Empresa DEF',
      email: 'empresa@def.com',
      telefone: '333333333',
      celular: '444444444',
    },
    endereco: {
      pais: 'Brasil',
      cidade_estado: 'Salvador/BA',
      tipo_logradouro: 'Rua',
      bairro: 'Centro',
      cep: '40000000',
      endereco: 'Av. Sete de Setembro',
      numero: '789',
      complemento: 'Apto 202',
      site: 'www.empresadef.com.br',
    },
    dam: [
      {
        sigla: 'DAM1',
        valor_total: 1500.30,
      },
    ]
  }
];

beforeAll(async () => {
  try {
    
    await sequelize.authenticate();
    logger.info('Conexão com o banco de dados bem-sucedida.');

    
    await sequelize.sync(); 
    logger.info('Tabelas sincronizadas com o banco de dados.');

    
    await sequelize.getQueryInterface().bulkInsert('contribuintes', mockContribuintes);
    logger.info('Dados de teste inseridos no banco de dados.');
  } catch (error) {
    logger.error('Erro na conexão com o banco de dados:', error);
  }
});

afterAll(async () => {
  try {
    
    await sequelize.getQueryInterface().bulkDelete('contribuintes', null, {});
    logger.info('Dados de teste removidos.');

    
    await sequelize.close();
    logger.info('Conexão com o banco de dados fechada.');
  } catch (error) {
    logger.error('Erro ao fechar a conexão com o banco de dados:', error);
  }
});

describe('Testes da API de Contribuintes', () => {
  it('Deve retornar todos os contribuintes', async () => {
    const response = await request(app).get('/contribuintes');
    
    
    expect(response.status).toBe(200);
    
    
    expect(Array.isArray(response.body)).toBe(true);

    
    expect(response.body.length).toBeGreaterThan(0);
    logger.info('Testes realizados com sucesso, retornando contribuintes.');
  });

  it('Deve retornar uma lista vazia se não houver contribuintes', async () => {
    
    await sequelize.getQueryInterface().bulkDelete('contribuintes', null, {});
    
    const response = await request(app).get('/contribuintes');

    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0); 

    logger.info('Lista vazia de contribuintes retornada, conforme esperado.');
  });
});
