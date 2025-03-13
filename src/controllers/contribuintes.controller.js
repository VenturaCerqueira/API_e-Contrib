// src/controllers/contribuintes.controller.js
const db = require('../config/db.config.js'); // Assumindo que a configuração de banco está em 'db.js'

exports.getContribuintes = (req, res) => {
  db.query('SELECT * FROM contribuinte', (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      return res.status(500).json({ error: 'Erro ao buscar dados' });
    }

    // Tratamento dos dados
    const dadosTratados = results.map(item => {
      const contribuinte = {
        tipo: item.tipo === 0 ? 'Jurídica' : item.tipo === 1 ? 'Física' : 'Não informado',
        cpf_cnpj: item.cpf_cnpj.replace(/\D/g, ''),
        fantasia: item.fantasia ? item.fantasia.trim().toUpperCase() : null,
        email: item.email,
        contato: item.contato,
        contato2: item.contato2,
        created_at: item.created_at ? new Date(item.created_at).toLocaleString() : null,
        updated_at: item.updated_at ? new Date(item.updated_at).toLocaleString() : null
      };

      const endereco = {
        fk_pais: item.fk_pais,
        fk_cidade: item.fk_cidade,
        fk_tipo_logradouro: item.fk_tipo_logradouro,
        fk_bairro: item.fk_bairro,
        fk_imovel_caracteristica: item.fk_imovel_caracteristica,
        cep: item.cep,
        endereco: item.endereco,
        numero: item.numero,
        complemento: item.complemento,
        site: item.site
      };

      return {
        Contribuinte: item.razao_social ? item.razao_social.trim().toUpperCase() : null,
        dados: contribuinte,
        endereco: endereco
      };
    });

    res.json({
      success: true,
      message: 'Consulta realizada com sucesso.',
      data: dadosTratados
    });
  });
};
