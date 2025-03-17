// Função para formatar os dados do contribuinte
const formatContribuinteData = (contribuinte) => {
  return {
    nome: contribuinte.razao_social ? contribuinte.razao_social.trim().toUpperCase() : 'Sem informação',
    dados_cadastrais: {
      tipo: contribuinte.tipo === 1 ? 'Jurídica' : contribuinte.tipo === 0 ? 'Física' : 'Não informado',
      cpf_cnpj: contribuinte.cpf_cnpj ? contribuinte.cpf_cnpj.replace(/\D/g, '') : 'Sem informação',
      fantasia: contribuinte.fantasia ? contribuinte.fantasia.trim().toUpperCase() : 'Sem informação',
      email: contribuinte.email && contribuinte.email.trim() ? contribuinte.email.trim() : 'Sem informação',
      telefone: contribuinte.contato && contribuinte.contato.trim() ? contribuinte.contato.trim() : 'Sem informação',
      celular: contribuinte.contato2 && contribuinte.contato2.trim() ? contribuinte.contato2.trim() : 'Sem informação',
    },
    endereco: {
      pais: contribuinte.pais || 'Sem informação',
      cidade_estado: contribuinte.cidade && contribuinte.estado ? `${contribuinte.cidade}/${contribuinte.estado}` : 'Sem informação',
      tipo_logradouro: contribuinte.tipo_logradouro || 'Sem informação',
      bairro: contribuinte.bairro || 'Sem informação',
      cep: contribuinte.cep || 'Sem informação',
      endereco: contribuinte.endereco || 'Sem informação',
      numero: contribuinte.numero || 'Sem informação',
      complemento: contribuinte.complemento || 'Sem informação',
      site: contribuinte.site && contribuinte.site.trim() ? contribuinte.site.trim() : 'Sem informação',
    },
  };
};

// Função para formatar dados do DAM
const formatDAMData = (damResults, cpfCnpj) => {
  return damResults
    .filter(damItem => damItem.cpf_cnpj === cpfCnpj)
    .map(damItem => ({
      sigla: damItem.sigla,
      valor_total: damItem.valor_total,
    }));
};

// Função principal para formatar todos os dados do contribuinte
const formatContribuinteWithDAM = (contribuinte, damResults) => {
  const formattedContribuinte = formatContribuinteData(contribuinte);
  const damData = formatDAMData(damResults, contribuinte.cpf_cnpj);

  return {
    ...formattedContribuinte,
    dam: damData,
  };
};

module.exports = {
  formatContribuinteData,
  formatDAMData,
  formatContribuinteWithDAM,
};
