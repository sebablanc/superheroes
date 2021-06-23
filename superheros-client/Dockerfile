FROM node:16-alpine3.11


WORKDIR /superheroes-client

ENV PATH /superheroes-client/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install npm --silent
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

CMD ["npm", "start"]