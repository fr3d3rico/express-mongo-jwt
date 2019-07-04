FROM mongo
EXPOSE 27017

FROM node:carbon
WORKDIR /root/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 27017
CMD ["npm", "start"]