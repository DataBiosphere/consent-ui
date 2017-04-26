#!/bin/bash
set -euox pipefail
IFS=$'\n\t'

npm install n
n stable
npm install wrench
npm install bower
npm install jshint
npm install gulp
bower install
npm install
gulp
