FROM node:latest

RUN mkdir -p /app

# RUN npm install nodemon -g

WORKDIR /app

COPY /api .

# RUN npm install -g npm

RUN npm install

EXPOSE 3000

CMD ["npm","start"]