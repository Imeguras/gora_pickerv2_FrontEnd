FROM node:16.13.0-alpine as build
WORKDIR /app
ARG FRONTEND_PORT
ARG FRONTEND_API_URL
ARG FRONTEND_API_DOMAIN
COPY package*.json /app/
RUN npm i -g @ionic/cli
RUN npm i
COPY ./ /app/
ENV FRONTEND_PORT=${FRONTEND_PORT}
ENV FRONTEND_API_URL=${FRONTEND_API_URL}
ENV FRONTEND_API_DOMAIN=${FRONTEND_API_DOMAIN}

RUN sh /app/config_injection.sh



ENTRYPOINT ["ionic", "serve", "-p", "$FRONTEND_PORT", "--external"]