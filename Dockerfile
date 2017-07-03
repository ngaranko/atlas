FROM node:8.1

MAINTAINER datapunt.ois@amsterdam.nl

EXPOSE 80

ENV USERNAME_EMPLOYEE=atlas.employee@amsterdam.nl
ENV USERNAME_EMPLOYEE_PLUS=atlas.employee.plus@amsterdam.nl
ARG PASSWORD_EMPLOYEE
ARG PASSWORD_EMPLOYEE_PLUS
ENV PASSWORD_EMPLOYEE=$PASSWORD_EMPLOYEE
ENV PASSWORD_EMPLOYEE_PLUS=$PASSWORD_EMPLOYEE_PLUS

RUN apt-get update && apt-get upgrade -y --no-install-recommends \
  && apt-get install -y bzip2 git nginx unzip xz-utils \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g bower grunt-cli

RUN echo 'deb http://deb.debian.org/debian jessie-backports main' > /etc/apt/sources.list.d/jessie-backports.list

ENV LANG C.UTF-8

RUN { \
		echo '#!/bin/sh'; \
		echo 'set -e'; \
		echo; \
		echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
	} > /usr/local/bin/docker-java-home \
	&& chmod +x /usr/local/bin/docker-java-home

# do some fancy footwork to create a JAVA_HOME that's cross-architecture-safe
RUN ln -svT "/usr/lib/jvm/java-8-openjdk-$(dpkg --print-architecture)" /docker-java-home

ENV JAVA_HOME /docker-java-home
ENV JAVA_VERSION 8u131
ENV JAVA_DEBIAN_VERSION 8u131-b11-1~bpo8+1

# see https://bugs.debian.org/775775
# and https://github.com/docker-library/java/issues/19#issuecomment-70546872
ENV CA_CERTIFICATES_JAVA_VERSION 20161107~bpo8+1

RUN set -ex; \
	\
	apt-get update; \
	apt-get install -y \
		openjdk-8-jdk="$JAVA_DEBIAN_VERSION" \
		ca-certificates-java="$CA_CERTIFICATES_JAVA_VERSION" \
	; \
	rm -rf /var/lib/apt/lists/*; \
	\
# verify that "docker-java-home" returns what we expect
	[ "$(readlink -f "$JAVA_HOME")" = "$(docker-java-home)" ]; \
	\
# update-alternatives so that future installs of other OpenJDK versions don't change /usr/bin/java
	update-alternatives --get-selections | awk -v home="$(readlink -f "$JAVA_HOME")" 'index($3, home) == 1 { $2 = "manual"; print | "update-alternatives --set-selections" }'; \
# ... and verify that it actually worked for one of the alternatives we care about
	update-alternatives --query java | grep -q 'Status: manual'

# see CA_CERTIFICATES_JAVA_VERSION notes above
RUN /var/lib/dpkg/info/ca-certificates-java.postinst configure

COPY . /app
WORKDIR /app

ENV PATH=./node_modules/.bin/:~/node_modules/.bin/:$PATH
RUN git config --global url.https://github.com/.insteadOf git://github.com/ \
  && git config --global url."https://github.com/".insteadOf git@github.com: \
  && npm install && bower install --allow-root \
  && ./node_modules/protractor/node_modules/webdriver-manager/bin/webdriver-manager update

ARG BUILD_ID
ENV BUILD_ID=$BUILD_ID

RUN grunt set-build-id --buildid=${BUILD_ID} \
  && grunt build-release \
  && grunt test-e2e \
  && cp -r /app/build/. /var/www/html/

COPY default.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/sites-enabled/default

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]
