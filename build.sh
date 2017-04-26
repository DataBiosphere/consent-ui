#!/bin/bash
set -euox pipefail
IFS=$'\n\t'

npm install n
n stable
npm install fs-readdir-recursive
npm install bower
npm install jshint
npm install gulp
bower install
npm install
gulp clean
gulp build
