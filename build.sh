#!/bin/bash
set -euox pipefail
IFS=$'\n\t'

npm install n
n stabl
npm install wrench
npm install bower
npm install jshint
npm install gulp
npm install
bower install
gulp
