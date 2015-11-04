
# Cordova UIWebView + SDWebImage + WebViewProxy

Experimental project with Cordova UIWebView + [SDWebImage](https://github.com/rs/SDWebImage) + [WebViewProxy](https://github.com/marcuswestin/WebViewProxy)

using this plugin : https://github.com/revolunet/cordova-plugin-sdwebimage

Two tests :

 - Intercepts images via WebViewProxy downloads and use SDWebImage for caching
 - Get base64 images via cordova

Benchmarks made on iPAD Air (end 2013 version)

There is two type of caching that affect performance :
 - Image is cached on the device, so we save a network request
 - Image is pre-heated in safari cache, so it can display instantly

Here's an attempt to combine boths using SDWebImage + WebViewProxy

**TL;DR :**
 - builtin-safari cache is the most performant
 - SDWebImage gives you more control, and a more persistent disk-cache and you can add safari image cache (pre-heat) for perf

### SDWebImage

 - Can download and cache images on native side
 - Memory cache and/or disk
 - Optional resizes/compressions

### WebViewProxy

 - intercepts UiWebView requests and serve cached images on-the-fly

### Tests

example with a [650k image](http://img0.mxstatic.com/wallpapers/232ae79ed2a5532d717cf361adc7af0d_large.jpeg)


| config | First download |  Restore cache |  Re-display |
|-------|----------|--------|-------|
| UiWebView  | 750ms | 350ms | 10ms |
| SDWebImage+WebViewProxy | 750ms (`SDImageCacheTypeNone`)| 350ms  (`SDImageCacheTypeDisk`)| 150ms (`SDImageCacheTypeMemory`) or 10ms (with force safari cache) |
| SDWebImage+cordova base64 | 1200ms (`SDImageCacheTypeNone`)| 800ms  (`SDImageCacheTypeDisk`)| 500ms (`SDImageCacheTypeMemory`) |
