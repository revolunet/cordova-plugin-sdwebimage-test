
# Cordova UIWebView + SDWebImage + WebViewProxy

Experiment with Cordova UIWebView + [SDWebImage](https://github.com/rs/SDWebImage) + [WebViewProxy](https://github.com/marcuswestin/WebViewProxy)

Two tests :

 - Intercepts images downloads and use SDWebImage for caching
 - Get base64 images via cordova

Benchmarks made on iPAD Air (end 2013 version)

**TL;DR :**
 - builtin-safari cache is the most performant
 - SDWebImage gives you more control, and a more persistent disk-cache.

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
