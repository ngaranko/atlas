# Build
FROM node:10.10 AS build-deps
LABEL maintainer="datapunt@amsterdam.nl"

WORKDIR /app

COPY package.json package-lock.json .env.* /app/
COPY sitemap-generator /app/sitemap-generator
COPY public /app/public


# Install all NPM dependencies, and:
#  * Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git:// && \
    git config --global url."https://github.com/".insteadOf git@github.com: && \
#    npm config set registry https://nexus.data.amsterdam.nl/repository/npm-group/ && \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    npm --production=false \
        --unsafe-perm \
        --verbose \
        ci

RUN npm run generate:sitemap

# Build dependencies
COPY src /app/src
COPY modules /app/modules
COPY scripts /app/scripts
COPY .eslintrc.js \
     .eslintignore \
     .prettierrc \
     .prettierignore \
     babel.config.js \
     webpack.* \
     index.ejs \
     favicon.png \
     /app/

ARG NODE_ENV=production

RUN npm run build:${NODE_ENV}
RUN echo "build= `date`" > /app/dist/version.txt

# Test dependencies
COPY karma.conf.js \
     jest.config.js \
     /app/
COPY test /app/test


# Web server image
FROM nginx:1.12.2-alpine
ARG NODE_ENV=production
COPY nginx-${NODE_ENV}.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-deps /app/dist /usr/share/nginx/html
