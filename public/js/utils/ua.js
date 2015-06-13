function getUA(){
  return {
    
    "default": {
      classNames: {
        android: "android",
        ios: {
          ipad: "ipad",
          iphone: "iphone"
        },
        chrome: "chrome",
        safari: "safari"
      }
    },
    
    constructor: function(){
      this.ua = navigator.userAgent;
      this.setClass();
    },
    
    getBrowser: function(){
      console.log("userAgent:", this.ua);
      var ua = this.ua;
      return {
        chrome: !!ua.match(/chrome/i),
        android_browser: !!ua.match(/safari/i) && !!ua.match(/android/i),
        safari: !!ua.match(/safari/i),
        firefox: !!ua.match(/firefox/i)
      };
    },
    
    getDevice: function(){
      var ua = this.ua;
      return {
        android: !!ua.match(/android/i),
        iphone: !!ua.match(/iPhone/i),
        ipad: !!ua.match(/iPad/i),
        ipod: !!ua.match(/iPod/i),
        ios: !!ua.match(/iPad/i) && !!ua.match(/iPod/i) && !!ua.match(/iPhone/i),
        other: !ua.match(/iPad/i) && !ua.match(/iPod/i) && !ua.match(/iPhone/i) && !ua.match (/android/i)
      };
    },
    
    setClass: function() {
      var browsers, devices, putClass, element;
      var classStrings = "";
      
      browsers = this.getBrowser();
      devices = this.getDevice();
      element = document.getElementsByTagName("HTML")[0];
      putClass = function(d){
        for(let k in d){
          if(k){
            classStrings = " "+k;
            break;
          }
        };
        element.className += classStrings;
      };
      
      putClass(browsers);
      putClass(devices);
    }
  };
}

      
module.exports = {
  getUA: new getUA().constructor()
};