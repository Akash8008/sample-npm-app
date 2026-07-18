FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm test

RUN npm run build

EXPOSE 3000

CMD ["node","dist/server.js"]