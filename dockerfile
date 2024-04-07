FROM node:16.13.0-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm i -g @ionic/cli
RUN npm i
COPY ./ /app/
RUN sh /app/config_injection.sh



ENTRYPOINT ["ionic", "serve", "-p", "${FRONTEND_PORT}", "--external"]