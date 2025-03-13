# Etapa 1: Definir a imagem base
FROM node:18-alpine

# Etapa 2: Definir o diretório de trabalho
WORKDIR /usr/src/app

# Etapa 3: Copiar o package.json e package-lock.json
COPY package*.json ./

# Etapa 4: Instalar as dependências
RUN npm install

# Etapa 5: Copiar o restante dos arquivos para dentro do container
COPY . .

# Etapa 6: Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Etapa 7: Definir o comando para rodar a aplicação
CMD ["npm", "start"]
