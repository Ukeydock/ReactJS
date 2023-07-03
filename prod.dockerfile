FROM node:18.16.1

WORKDIR /app

COPY package.json .

RUN npm install

RUN mkdir src

RUN mkdir public

COPY src src

COPY public public

COPY tsconfig.json .

COPY tsconfig.paths.json .

COPY craco.config.js .

COPY .env .

CMD [ "npm", "run", "start" ]