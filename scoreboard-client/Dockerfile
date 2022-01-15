FROM node:16.13.2-alpine

WORKDIR /usr/src/app/scoreboard-client

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]