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

var count = 1;
var url = 'http://img0.mxstatic.com/wallpapers/232ae79ed2a5532d717cf361adc7af0d_large.jpeg';

var images = document.getElementById('images');
var info = document.getElementById('status');

function getImagesUrls(url, nb) {
  var urls = [];
  for (var i=0; i<nb; i++) {
    urls.push(url + '?r=' + i);
  }
  return urls;
}


function bench(url) {
  loadImages(getImagesUrls(url, count));
}

function bench1() {
  // standard urls
  console.log('bench remote images');
  bench(url);
}

function bench2() {
  // prefix urls with proxy
  console.log('bench remote images via SDWebImage + proxy');
  bench('http://intercept/' + url);
}

function bench3() {
  // get base64 from plugin and use it as img.src
  console.log('bench remote images via SDWebImage + base64');
  var urls = getImagesUrls(url, count);
  var b64 = [];
  var start = (new Date()).getTime();
  urls.forEach(function(url) {
    cordova.plugins.SDWebImage.getImage({
      downloadOptions: 0,
      src: url,
      quality: 85
    }, function(data) {
      b64.push('data:image/jpg;base64,' + data);
      if (b64.length === urls.length) {
        loadImages(b64);
        info.innerHTML = ((new Date()).getTime() - start) + 'ms';
        console.log('bench3 END', (new Date()).getTime() - start);
      };
    });
  })
}


function clearImages() {
  console.log('clearImages');
  images.innerHTML = '';
}

function clearCache() {
  cordova.plugins.SDWebImage.clearCache();
}

app.initialize();
