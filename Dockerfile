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

# Install required build packages
WORKDIR /app
RUN npm install -g fs-readdir-recursive && \
    npm install -g bower && \
    npm install -g jshint && \
    npm install -g gulp && \
    npm install

# Package, build to dist directory
RUN bower install --allow-root && \
    gulp clean && \
    gulp build

# Clean up global dev dependencies after build
RUN npm uninstall -g fs-readdir-recursive && \
    npm uninstall -g bower && \
    npm uninstall -g jshint && \
    npm uninstall -g gulp

# Force clean and add production dependency
RUN rm -Rf node_modules && \
    npm install -g http-server

EXPOSE 8000

CMD ["http-server", "/app/dist", "-p 8000"]
