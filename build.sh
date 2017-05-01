#!/bin/bash
set -euox pipefail
IFS=$'\n\t'

# Make sure only root can run our script
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

# NPM needs global permissions, and fails terribly without root.
# Get the user so we can reset ownership after we're done.
USER=`ls -ld ./ | awk '{print $3}'`

npm install -g n
n 0.12.7
npm install -g wrench
npm install -g bower
npm install -g gulp
npm install
bower install --allow-root
gulp

chown -R $USER .tmp
chown -R $USER dist
chown $USER package.json
