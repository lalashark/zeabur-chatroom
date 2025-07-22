# frontend/Dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# serve dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "8080"]

EXPOSE 3000
