const formatCpfCnpj = (value) => {
    return value.replace(/\D/g, '');
  };
  
  module.exports = { formatCpfCnpj };
  