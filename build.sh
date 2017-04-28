#!/bin/bash
set -euox pipefail
IFS=$'\n\t'

npm install
bower install
gulp clean
gulp build
