FROM node:12.18.4

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm run install

CMD ["npm", "start"]