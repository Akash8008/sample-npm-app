#FROM node:22-alpine
#WORKDIR /app
#COPY package.json package-lock.json ./ 

#RUN npm install --omit=dev

#COPY dist ./dist

#EXPOSE 3000

#CMD ["node", "dist/server.js"]


#####version 3 multi docker files ci and docker build


FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm test

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist /app/dist

EXPOSE 3200

CMD ["node","dist/server.js"]