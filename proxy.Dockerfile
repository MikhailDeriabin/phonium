FROM debian:stable-backports AS build

WORKDIR /app
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm && \
    apt-get clean

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

COPY ./frontend .

RUN npm run build

FROM debian:stable-backports AS runtime

RUN apt-get update && apt-get install -y nginx && apt-get clean

COPY --from=build /app/dist /var/www/html

COPY nginx.conf /etc/nginx/sites-available/default

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
