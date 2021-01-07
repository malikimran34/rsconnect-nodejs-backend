FROM node:12

WORKDIR /usr/rsconnect-nodejs-backend
COPY    package*.json ./

RUN     npm install
COPY    . .
EXPOSE  5000
CMD     ["npm", "start"]

