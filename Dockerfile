FROM node:7.9-alpine

MAINTAINER datapunt.ois@amsterdam.nl

EXPOSE 80

ENV USERNAME_EMPLOYEE=atlas.employee@amsterdam.nl
ENV USERNAME_EMPLOYEE_PLUS=atlas.employee.plus@amsterdam.nl
ARG PASSWORD_EMPLOYEE
ARG PASSWORD_EMPLOYEE_PLUS
ENV PASSWORD_EMPLOYEE=$PASSWORD_EMPLOYEE
ENV PASSWORD_EMPLOYEE_PLUS=$PASSWORD_EMPLOYEE_PLUS

RUN apk update && apk upgrade \
 && apk add git nginx openjdk8-jre \
 && npm install -g bower grunt-cli \
 && mkdir /app

ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk

WORKDIR /app
COPY *.json /app/

RUN rm -rf node_modules\
 && rm -rf bower_components \
 && npm cache clean \
 && bower cache clean --allow-root \
 && npm install \
 && ./node_modules/protractor/node_modules/webdriver-manager/bin/webdriver-manager update \
 && bower install --allow-root

COPY . /app/

ARG BUILD_ID
ENV BUILD_ID=$BUILD_ID

RUN grunt set-build-id --buildid=${BUILD_ID}

RUN grunt build-release \
 && cp -r /app/build/. /var/www/html/

COPY default.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/sites-enabled/default

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]
