const { getContribuintes } = require('../../src/controllers/contribuintes.controller');  
exports.handler = async (event, context) => {
  try {
    const response = await getContribuintes(event, context);  // Chama sua função para processar a requisição
    return {
      statusCode: 200,
      body: JSON.stringify(response),  // Retorna a resposta no formato JSON
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno do servidor', error: err.message }),
    };
  }
};
