FROM node:8.9

MAINTAINER datapunt.ois@amsterdam.nl

EXPOSE 80

ENV NODE_ENV=production

ARG PASSWORD_EMPLOYEE
ARG PASSWORD_EMPLOYEE_PLUS
ENV USERNAME_EMPLOYEE=atlas.employee@amsterdam.nl
ENV USERNAME_EMPLOYEE_PLUS=atlas.employee.plus@amsterdam.nl

RUN apt-get update \
  && apt-get upgrade -y --no-install-recommends \
  && apt-get install -y git nginx

# Chromium dependencies
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 \
  libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
  libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
  libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation \
  libappindicator1 libnss3 lsb-release xdg-utils \
  xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

RUN rm -rf /var/lib/apt/lists/*

RUN wget -qO- https://get.docker.com | sh

COPY default.conf /etc/nginx/conf.d/
COPY package.json package-lock.json /app/
RUN rm /etc/nginx/sites-enabled/default

WORKDIR /app

ENV PATH=./node_modules/.bin/:~/node_modules/.bin/:$PATH
RUN git config --global url.https://.insteadOf git:// && \
  git config --global url."https://github.com/".insteadOf git@github.com: && \
  npm --production=false --unsafe-perm install && \
  chmod -R u+x node_modules/.bin/

COPY . /app

ARG BUILD_ENV=prod
ARG BUILD_ID
RUN npm run build-${BUILD_ENV} -- --env.buildId=${BUILD_ID} \
  && cp -r /app/dist/. /var/www/html/

RUN npm run test-e2e

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]
