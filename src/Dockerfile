# Usando uma imagem do Node.js
FROM node:16

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando os arquivos do projeto
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante dos arquivos
COPY . .

# Expondo a porta que o servidor vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
