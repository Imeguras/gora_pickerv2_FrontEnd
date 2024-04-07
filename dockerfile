FROM node:16.13.0-alpine as build
WORKDIR /app
ARG FRONTEND_PORT 
COPY package*.json /app/

RUN npm i -g @ionic/cli
RUN npm i
COPY ./ /app/
ENV FRONTEND_PORT=$FRONTEND_PORT
#RUN mv /app/src/gora_config_EXAMPLE.ts /app/src/gora_config.ts


ENTRYPOINT ["ionic", "serve", "-p", "${FRONTEND_PORT}", "--external"]