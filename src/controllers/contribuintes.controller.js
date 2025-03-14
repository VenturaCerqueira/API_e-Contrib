// src/controllers/contribuintes.controller.js
const db = require('../config/db.config.js'); // Importando o pool configurado
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
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

/**
 * @swagger
 * /api/contribuintes:
 *   get:
 *     summary: Retorna a lista de contribuintes com dados detalhados e DAM
 *     description: Retorna todos os contribuintes cadastrados com suas informações detalhadas e dados do DAM.
 *     tags:
 *       - Contribuintes
 *     responses:
 *       200:
 *         description: Lista de contribuintes retornada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Consulta realizada com sucesso.
 *               data:
 *                 - Contribuinte: "EMPRESA ABC"
 *                   dados:
 *                     tipo: "Jurídica"
 *                     cpf_cnpj: "12345678000199"
 *                     fantasia: "ABC"
 *                     email: "contato@empresa.com"
 *                     Telefone: "12345678"
 *                     Celular: "987654321"
 *                   endereco:
 *                     pais: "Brasil"
 *                     cidade_estado: "São Paulo/SP"
 *                     tipo_logradouro: "Avenida"
 *                     bairro: "Centro"
 *                     cep: "01000000"
 *                     endereco: "Av. Paulista"
 *                     numero: "100"
 *                     complemento: "Sala 101"
 *                     site: "www.empresa.com"
 *                   dam:
 *                     - sigla: "DAM1"
 *                       valor_total: 5000
 *                     - sigla: "DAM2"
 *                       valor_total: 3000
 *       500:
 *         description: Erro ao buscar dados
 */

exports.getContribuintes = async (req, res) => {
  logger.info(`Recebida requisição: GET /api/contribuintes - IP: ${req.ip}`);

  try {
    const [results] = await db.promise().query(`
      SELECT 
        c.tipo,
        c.cpf_cnpj,
        c.fantasia,
        c.email,
        c.contato,
        c.contato2,
        c.razao_social,
        c.fk_pais,
        c.fk_cidade,
        c.fk_tipo_logradouro,
        c.fk_bairro,
        c.cep,
        c.endereco,
        c.numero,
        c.complemento,
        c.site,
        p.nome AS pais,
        ci.nome AS cidade,
        e.nome AS estado,
        l.nome AS tipo_logradouro,
        b.nome AS bairro
      FROM contribuinte c
      JOIN pais p ON c.fk_pais = p.id
      JOIN cidade ci ON c.fk_cidade = ci.id
      JOIN estado e ON ci.fk_estado = e.id
      JOIN logradouro l ON c.fk_tipo_logradouro = l.id
      JOIN bairro b ON c.fk_bairro = b.id
      WHERE c.id BETWEEN 499 AND 800
    `);

    const [damResults] = await db.promise().query(`
      SELECT 
        c.cpf_cnpj, 
        cc.sigla, 
        SUM(lc.valor_total) AS valor_total
      FROM lancamento l 
      JOIN lancamento_cota lc ON (l.id = lc.fk_lancamento)
      JOIN conta_contabil cc ON (cc.id = l.fk_conta_contabil)
      JOIN lancamento_baixa lb ON (lb.fk_lancamento_cota = lc.id AND lb.fk_modalidade = 1)
      JOIN contribuinte c ON (c.id = l.fk_contribuinte)
      GROUP BY c.cpf_cnpj, cc.sigla
      ORDER BY c.cpf_cnpj, cc.sigla
      LIMIT 50
    `);

    // Mapeando os dados de contribuintes
    const dadosTratados = results.map(item => {
      // Encontrar o DAM do contribuinte
      const dam = damResults.filter(damItem => damItem.cpf_cnpj === item.cpf_cnpj).map(damItem => ({
        sigla: damItem.sigla,
        valor_total: damItem.valor_total
      }));

      return {
        Contribuinte: item.razao_social ? item.razao_social.trim().toUpperCase() : 'Sem informação',
        dados: {
          tipo: item.tipo === 1 ? 'Jurídica' : item.tipo === 0 ? 'Física' : 'Não informado',
          cpf_cnpj: item.cpf_cnpj ? item.cpf_cnpj.replace(/\D/g, '') : 'Sem informação',
          fantasia: item.fantasia ? item.fantasia.trim().toUpperCase() : 'Sem informação',
          email: item.email && item.email.trim() ? item.email.trim() : 'Sem informação',
          Telefone: item.contato && item.contato.trim() ? item.contato.trim() : 'Sem informação',
          Celular: item.contato2 && item.contato2.trim() ? item.contato2.trim() : 'Sem informação'
        },
        endereco: {
          pais: item.pais || 'Sem informação',
          cidade_estado: item.cidade && item.estado ? `${item.cidade}/${item.estado}` : 'Sem informação',
          tipo_logradouro: item.tipo_logradouro || 'Sem informação',
          bairro: item.bairro || 'Sem informação',
          cep: item.cep || 'Sem informação',
          endereco: item.endereco || 'Sem informação',
          numero: item.numero || 'Sem informação',
          complemento: item.complemento || 'Sem informação',
          site: item.site && item.site.trim() ? item.site.trim() : 'Sem informação'
        },
        dam // Adicionando o DAM do contribuinte
      };
    });

    res.json({
      success: true,
      message: 'Consulta realizada com sucesso.',
      data: dadosTratados
    });

    logger.info('Consulta realizada com sucesso.');
  } catch (err) {
    logger.error(`Erro ao buscar dados: ${err.message}`);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
};
