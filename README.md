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

3. One time commands - only need to install npm once and build once:
  
    ```bash
    brew install npm
    npm install
    ``` 
  
4. Run the docker compose file:

    ```bash
    npm run up
    ```
