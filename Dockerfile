FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm test

RUN npm run build

RUN echo "===== DIST CONTENTS =====" && ls -R /app/dist

FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

RUN echo "===== FINAL DIST =====" && ls -R /app/dist

EXPOSE 3000

CMD ["node","dist/server.js"]