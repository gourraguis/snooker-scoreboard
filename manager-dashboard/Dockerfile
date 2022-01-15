FROM node:16.13.2-alpine

WORKDIR /usr/src/app/manager-dashboard

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]