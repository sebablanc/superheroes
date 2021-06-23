FROM node:14-alpine3.11

WORKDIR /api
COPY package*.json ./
RUN npm ci
RUN npm install
COPY . .
EXPOSE 8000

CMD ["npm", "start"]