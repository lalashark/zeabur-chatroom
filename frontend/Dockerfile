FROM node:18-alpine
WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .
RUN npm run build

RUN npm install -g serve


ENV PORT=3000
EXPOSE 3000

# 用 sh -c 來展開環境變數
CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
