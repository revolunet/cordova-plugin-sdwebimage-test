/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
        //
        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function loadImages(urls) {
  var count = 0;
  var start = (new Date()).getTime();
  console.log('loadImages START', start);
  urls.forEach(function(url) {
    var i = new Image();
    i.onload = i.onerror = function() {
      count++;
      images.appendChild(i);
      if (count===urls.length) {
        info.innerHTML = ((new Date()).getTime() - start) + 'ms';
        console.log('loadImages END', (new Date()).getTime() - start);
      }
    }
    i.src = url;
  });
}

var imageList = [
  'http://lorempixel.com/1024/768/sports/1/',
  'http://lorempixel.com/1024/768/sports/2/',
  'http://lorempixel.com/1024/768/sports/3/',
  'http://lorempixel.com/1024/768/sports/4/',
  'http://lorempixel.com/1024/768/sports/5/',
  'http://lorempixel.com/1024/768/sports/6/',
  'http://lorempixel.com/1024/768/sports/7/',
  'http://lorempixel.com/1024/768/sports/8/',
  'http://lorempixel.com/1024/768/sports/9/',
  'http://lorempixel.com/1024/768/sports/10/'
];

var images = document.getElementById('images');
var info = document.getElementById('status');

function bench(url) {
  loadImages(imageList);
}

function bench1() {
  // standard urls
  console.log('bench remote images');
  loadImages(imageList);
}

function bench2() {
  // prefix urls with proxy
  console.log('bench remote images via SDWebImage + proxy');
  loadImages(imageList.map(function(url) { return 'http://proxy/' + url;}));
}

function bench3() {
  // get base64 from plugin and use it as img.src
  console.log('bench remote images via SDWebImage + base64');
  var b64 = [];
  var start = (new Date()).getTime();
  imageList.forEach(function(url) {
    cordova.plugins.SDWebImage.getImage({
      downloadOptions: 0,
      src: url,
      quality: 85
    }, function(data) {
      b64.push('data:image/jpg;base64,' + data);
      if (b64.length === imageList.length) {
        loadImages(b64);
        info.innerHTML = ((new Date()).getTime() - start) + 'ms';
        console.log('bench3 END', (new Date()).getTime() - start);
      };
    });
  })
}


function preoloadImages() {
  cordova.plugins.SDWebImage.prefetchURLs(imageList, function(data) {
    console.log('preoloadImages finished', data);
  });
}

function clearImages() {
  console.log('clearImages');
  images.innerHTML = '';
}

function clearCache() {
  cordova.plugins.SDWebImage.clearCache();
}


function getCacheInfo() {
  cordova.plugins.SDWebImage.getCacheInfo(function(data) {
    console.log('getCacheInfo', data);
  });
}



app.initialize();
