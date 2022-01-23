FROM node:16.13.2-alpine

WORKDIR /usr/src/app/owner-dashboard

COPY package*.json ./

RUN npm ci

CMD ["npm", "run", "dev"]