FROM node:latest

RUN mkdir -p /usr/src/zoala-server

WORKDIR /usr/src/zoala-server

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]