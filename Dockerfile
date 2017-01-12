FROM phusion/baseimage:latest
FROM node

MAINTAINER Belatrix Team <belatrix@broadinstitute.org>

USER root

#base setup
RUN apt-get update \
    && apt-get install -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Some dependencies require n v0.12.7
RUN npm cache clean -f \
    && npm install -g n \
    && n 0.12.7

#install bower and gulp, and local gulp
RUN mkdir /app
WORKDIR /app

# Copy packaging files to the app directory
COPY gulp /app/gulp
COPY e2e /app/e2e
COPY .bowerrc /app/
COPY .jshintrc /app/
COPY .yo-rc.json /app/
COPY bower.json /app/
COPY gulpfile.js /app/
COPY karma.conf.js /app/
COPY package.json /app/
COPY protractor.conf.js /app/

RUN npm install -g wrench
RUN npm install -g bower
RUN npm install -g gulp
RUN npm install -g http-server
RUN npm install --save-dev gulp
RUN npm install
RUN bower install --allow-root

# Copy source files to the app directory
COPY src /app/src
COPY swagger /app/swagger

RUN gulp

EXPOSE 8000

CMD ["http-server", "/app/dist", "-p 8000"]
