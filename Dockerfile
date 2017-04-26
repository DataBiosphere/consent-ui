FROM node:alpine

MAINTAINER Catalog Team <catalog-team@broadinstitute.org>

USER root

# Git required for bower
RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git openssh

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

#install required npm packages
WORKDIR /app
RUN npm install n
RUN npm install -g fs-readdir-recursive
RUN npm install -g bower
RUN npm install -g jshint
RUN npm install -g gulp
RUN npm install -g http-server
#RUN npm install --save-dev gulp
RUN npm install
RUN bower install --allow-root
RUN gulp clean
RUN gulp build

EXPOSE 8000

CMD ["http-server", "/app/dist", "-p 8000"]
