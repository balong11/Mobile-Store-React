FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
