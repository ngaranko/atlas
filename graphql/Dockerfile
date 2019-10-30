FROM node:12.13.0-alpine

WORKDIR /usr/src/app
COPY package*.json .env.* ./

RUN npm install

ARG NODE_ENV=production

COPY . .

COPY ./.env.${NODE_ENV} ./.env

EXPOSE 4000

ENTRYPOINT ["npm", "run"]

CMD ["build"]
CMD ["serve"]

