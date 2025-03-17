# Etapa 1: Imagem base para o Node.js
FROM node:16 AS build

# Diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar os arquivos do projeto para o diretório de trabalho no container
COPY ./src/package*.json ./

# Instalar as dependências do projeto
RUN npm install --production

# Copiar o restante do código do projeto
COPY ./src /usr/src/app

# Etapa 2: Configuração da imagem de produção
FROM node:16

# Definir diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar os arquivos de dependências instaladas da etapa de build
COPY --from=build /usr/src/app /usr/src/app

# Expor a porta do aplicativo
EXPOSE 8888

# Variáveis de ambiente
ENV NODE_ENV=production
ENV DB_HOST=db
ENV DB_USER=anderson
ENV DB_PASS=126303@acv
ENV DB_NAME=db_gestaotributaria_riachaodojacuipe
ENV DB_PORT=3306

# Comando para iniciar a aplicação
CMD ["npm", "start"]
