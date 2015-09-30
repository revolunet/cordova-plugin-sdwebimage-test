#!/usr/bin/env node

/*
fix the plist for ios 9 WkWebView permissions
*/



var fs = require('fs');

var plist = require('plist');

var targetFile = './platforms/ios/HelloCordova/HelloCordova-Info.plist';

var contents = plist.parse(fs.readFileSync(targetFile, 'utf8'));

// disable web security : check if we need to alter the file
if (!contents.NSAppTransportSecurity) {
  contents.NSAppTransportSecurity = {
    NSAllowsArbitraryLoads: true
  };
  fs.writeFileSync(targetFile, plist.build(contents));
  console.log('✔ plist NSAppTransportSecurity updated');
}

// disable multi-tasking (require portrait mode) : check if we need to alter the file
if (!contents.UIRequiresFullScreen) {
  contents.UIRequiresFullScreen = true;
  fs.writeFileSync(targetFile, plist.build(contents));
  console.log('✔ plist UIRequiresFullScreen updated');
}
