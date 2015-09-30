#!/bin/sh

../node_modules/.bin/cordova plugin rm cordova-plugin-sdwebimage
../node_modules/.bin/cordova plugin add --link ../../cordova-plugin-sdwebimage
../node_modules/.bin/cordova prepare
