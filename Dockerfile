FROM node:23-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

