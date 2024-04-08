FROM node:16.13.0-alpine as build
WORKDIR /app
ARG FRONTEND_PORT=80
ARG FRONTEND_API_URL
ARG FRONTEND_API_DOMAIN
COPY package*.json /app/
RUN npm i -g @ionic/cli
RUN npm i
COPY ./ /app/
ENV FRONTEND_REAL_PORT=${FRONTEND_PORT}

ENV FRONTEND_API_URL=${FRONTEND_API_URL}
ENV FRONTEND_API_DOMAIN=${FRONTEND_API_DOMAIN}

RUN sh /app/config_injection.sh
RUN echo $FRONTEND_PORT
ENTRYPOINT ionic serve --port $FRONTEND_REAL_PORT --external
