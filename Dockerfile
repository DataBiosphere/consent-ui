FROM node

MAINTAINER Catalog Team <workbench-catalog@broadinstitute.org>

USER root

# base setup
RUN apt-get update && \
    apt-get install -y && \
    apt-get clean &&  \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

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

WORKDIR /app
RUN npm cache clean -f && \
    npm install -g n && \
    n stable && \
    npm install -g wrench && \
    npm install -g bower && \
    npm install -g gulp
RUN npm install

# Package, build to dist directory
RUN bower install --allow-root && \
    gulp

## Clean up global dev dependencies after build
RUN npm uninstall -g wrench && \
    npm uninstall -g bower && \
    npm uninstall -g gulp

## Clean up old source files after build
RUN rm -Rf .tmp && \
    rm -Rf bower_components && \
    rm -Rf gulp && \
    rm -Rf e2e && \
    rm -Rf node_modules && \
    rm -Rf src && \
    rm -Rf swagger && \
    rm -f .bowerrc && \
    rm -f .jshintrc && \
    rm -f .yo-rc.json && \
    rm -f bower.json && \
    rm -f gulpfile.js && \
    rm -f karma.conf.js && \
    rm -f package.json && \
    rm -f protractor.conf.js

## Add the single production dependency
RUN npm install -g http-server

EXPOSE 8000

CMD ["http-server", "/app/dist", "-p 8000"]
