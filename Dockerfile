FROM node:15-alpine

WORKDIR /src/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm test

ENTRYPOINT ["/bin/sh", "-c"]
