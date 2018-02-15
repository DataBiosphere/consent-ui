FROM node:8-alpine

MAINTAINER Catalog Team <workbench-catalog@broadinstitute.org>

ENV npm_config_unsafe_perm="true"

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

# Take care of install's needs, then clean up
RUN echo '{ "allow_root": true }' > /root/.bowerrc && \
  apk --no-cache add --virtual native-deps \
  git g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet && \
  npm run build && \
  apk del native-deps

## Clean up old source files after build
RUN rm -Rf .tmp && \
    rm -Rf bower_components && \
    rm -Rf gulp && \
    rm -Rf e2e && \
    rm -Rf node_modules && \
    rm -Rf src && \
    rm -f .bowerrc && \
    rm -f .jshintrc && \
    rm -f .yo-rc.json && \
    rm -f bower.json && \
    rm -f gulpfile.js && \
    rm -f karma.conf.js && \
    rm -f package.json && \
    rm -f protractor.conf.js

EXPOSE 8000

CMD ["npm", "run", "serve"]
