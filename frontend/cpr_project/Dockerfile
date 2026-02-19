FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG REACT_APP_CHATBOT_URL
ENV REACT_APP_CHATBOT_URL=$REACT_APP_CHATBOT_URL

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
