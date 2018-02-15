Consent-UI
==========

[![Build Status](https://travis-ci.org/DataBiosphere/consent-ui.svg?branch=develop)](https://travis-ci.org/DataBiosphere/consent-ui)

consent-ui is an angularJS application that requires running consent and consent-ontology services.

To run the consent-ui app:

1. Check out code:

    ```bash
    git clone git@github.com:broadinstitute/consent-ui.git
    cd consent-ui
    ```
2. Pull configurations from broadinstitute/firecloud-develop, local branch, or generate manually.  
   From `firecloud-develop`:
   
    ```bash
    RUN_CONTEXT=local APP_NAME=consent-ui ENV=dev OUTPUT_DIR=$PWD/../consent-ui/config ./configure.rb
    ```

  
3. Run the docker compose file:

    ```bash
    npm run up
    ```

## Docker
Consent-UI is packaged into a docker image that is stored in the cloud in the [Consent-UI Dockerhub Repo](https://hub.docker.com/r/broadinstitute/consent-ui).
```
# to build the consent-ui image
./build.sh -d build

# to build the consent-ui image and push it to dockerhub
./build.sh -d push

# to pull the image from dockerhub
docker pull broadinstitute/consent-ui
```
