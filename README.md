Consent-UI
==========

[![Build Status](https://travis-ci.com/broadinstitute/consent-ui.svg?token=3ve6QNemvC5zpJzsoKzf&branch=develop)](https://travis-ci.com/broadinstitute/consent-ui)

consent-ui is an angularJS application that requires running consent and consent-ontology services.

To run the consent-ui app:

1. Check out code
    ```
    git clone git@github.com:broadinstitute/consent-ui.git
    cd consent-ui
    ```
2. One time commands - only need to install npm once and build once. 
  * `brew install npm`
  * `sudo ./build.sh` 

3. Pull configurations from broadinstitute/firecloud-develop, local branch, or generate manually: 
    ```
    APP_NAME=consent-ui ENV=local OUTPUT_DIR=config ../firecloud-develop/configure.rb
    ```
4. Run the docker compose file 
    ```
    docker-compose -p consent-ui -f config/docker-compose.yaml up
    ```
