#!/bin/bash
set -euox pipefail
IFS=$'\n\t'

sudo npm install -g npm && sudo npm cache clean -f && sudo npm install -g n && sudo n 0.12.7

#install bower and gulp, and local gulp
sudo npm install -g wrench && sudo npm install -g bower && sudo npm install -g gulp

# Uncomment if you want to run http-server. This is only used in the deployed docker instance.
# Otherwise, run gulp serve for local development
#sudo npm install -g http-server

sudo npm install --save-dev gulp && sudo npm install && sudo bower install --allow-root
