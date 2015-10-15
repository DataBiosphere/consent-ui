FROM phusion/baseimage:latest
FROM node

MAINTAINER Belatrix Team <belatrix@broadinstitute.org>

USER root

#base setup
RUN apt-get update \
    && apt-get install -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy source files to the app directory
COPY gulp /app/gulp
COPY e2e /app/e2e
COPY src /app/src
COPY .bowerrc /app/
COPY .jshintrc /app/
COPY .yo-rc.json /app/
COPY bower.json /app/
COPY gulpfile.js /app/
COPY karma.conf.js /app/
COPY package.json /app/
COPY protractor.conf.js /app/
COPY swagger /app/swagger

# Some dependencies require node v0.12.7
RUN npm install -g npm
RUN npm cache clean -f \
    && npm install -g n \
    && n 0.12.7

#install bower and gulp, and local gulp
WORKDIR /app
RUN npm install -g wrench \
    && npm install -g bower \
    && npm install -g gulp \
    && npm install -g http-server \
    && npm install --save-dev gulp \
    && npm install \
    && bower install --allow-root

RUN gulp

EXPOSE 8000

CMD ["http-server", "/app/dist", "-p 8000"]
