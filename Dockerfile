FROM node:20.11.1

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]