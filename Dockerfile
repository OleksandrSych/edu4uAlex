FROM node:12.13-alpine

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install


COPY ./dist ./dist
