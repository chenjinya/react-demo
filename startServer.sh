#!/bin/bash

ip=`awk '/inet / && $2 != "127.0.0.1"{print $2}' <(ifconfig)`

node node_modules/webpack-dev-server/bin/webpack-dev-server.js  --port 3000 --inline --host $ip --content-base build

