!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports):"function"==typeof define&&define.amd?define(["exports"],o):o((e="undefined"!=typeof globalThis?globalThis:e||self).StraddleBridge={})}(this,(function(e){"use strict";var o;!function(e){e.PING="@straddleio/js-bridge/ping",e.ERROR="@straddleio/js-bridge/error",e.INITIALIZE="@straddleio/js-bridge/initialize",e.INITIALIZING="@straddleio/js-bridge/initializing",e.INITIALIZED="@straddleio/js-bridge/initialized",e.MOUNTED="@straddleio/js-bridge/mounted",e.ON_PAYKEY="@straddleio/js-bridge/on-paykey",e.ON_SUCCESS="@straddleio/js-bridge/on-success",e.ON_SUCCESS_CTA_CLICKED="@straddleio/js-bridge/on-success-cta-clicked",e.ON_CLOSE="@straddleio/js-bridge/on-close",e.ON_MANUAL_ENTRY="@straddleio/js-bridge/on-manual-entry",e.ON_RETRY="@straddleio/js-bridge/on-retry",e.TOKEN="@straddleio/js-bridge/token",e.DEBUG="@straddleio/js-bridge/debug",e.CONSOLE="@straddleio/js-bridge/console"}(o||(o={}));const d="Straddle-widget-iframe",t={getUrl:()=>`${t.origin}/${encodeURIComponent("undefined"!=typeof window&&window.location.origin)}`,origin:"",mounted:!1,verbose:!1,init:function(e){const{appUrl:n,token:i,onSuccess:s,onSuccessCTAClicked:r,onClose:l,onLoadError:a,onManualEntry:c,onRetry:g,targetRef:u,style:m,className:b,verbose:f=!1}=e;t.origin=null!=n?n:"https://dev.straddle.io",f&&console.log("init called");const p=document.createElement("iframe");p.setAttribute("src",t.getUrl()),p.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==a||a(e)})),p.id=d;let y=m;m||(y={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),Object.assign(p.style,y),b&&b.split(" ").forEach((e=>{p.classList.add(e)})),(u||document.getElementsByTagName("body")[0]).appendChild(p),"undefined"!=typeof window&&window.addEventListener("message",(function(e){var n;if(e.origin===t.origin){f&&console.log("Message received from widget:",e.data.type,e);const a=e.data;switch(null==a?void 0:a.type){case o.MOUNTED:t.mounted=!0,t.send({type:o.INITIALIZE,token:i});break;case o.ON_CLOSE:null==l||l(),t.mounted=!1,null===(n=document.querySelector(`#${d}`))||void 0===n||n.remove();break;case o.ON_SUCCESS_CTA_CLICKED:document.getElementsByTagName("body")[0].removeChild(p),null==r||r();break;case o.ON_MANUAL_ENTRY:null==c||c();break;case o.ON_RETRY:null==g||g();break;case o.ON_PAYKEY:null==s||s(a.paykeyResponse);break;case o.CONSOLE:{const e=a.payload.map((e=>{try{return JSON.parse(e)}catch(o){return e}}));"method"in a&&console[a.method].apply(console,e)}}}}))},getIframe:()=>document.getElementById("Straddle-widget-iframe"),show:()=>{t.verbose&&console.log("straddleBridge.show method called.");const e=t.getIframe();t.verbose&&e&&console.log("iframe found, setting display to block."),e.style.display="block"},hide:()=>{t.verbose&&console.log("straddleBridge.hide method called.");const e=t.getIframe();t.verbose&&e&&console.log("iframe found, setting display to none."),e.style.display="none"},remove:()=>{t.verbose&&console.log("straddleBridge.remove method called.");t.getIframe().remove(),t.mounted=!1},send:function(e){var o;const d=document.getElementById("Straddle-widget-iframe");console.log("sending message:",e),null===(o=null==d?void 0:d.contentWindow)||void 0===o||o.postMessage(e,t.origin)}};"undefined"!=typeof window&&(window.straddleBridge=t),Object.defineProperty(t,"debug",{value:{enable:()=>t.send({type:o.DEBUG,enable:!0}),disable:()=>t.send({type:o.DEBUG,enable:!1})},enumerable:!1,writable:!1,configurable:!1}),e.straddleBridge=t}));
//# sourceMappingURL=bridge-js.umd.bundle.js.map
