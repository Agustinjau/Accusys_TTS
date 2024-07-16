FROM node:alpine

WORKDIR /home/node/app

# Install app dependencies
COPY package*.json ./
RUN npm install && npm install typescript -g

COPY . .

EXPOSE 6000
CMD ["node", "./index.js"]