var StraddleBridge=function(e){"use strict";function t(e){if(e.__esModule)return e;var t=e.default;if("function"==typeof t){var o=function e(){if(this instanceof e){var o=[null];return o.push.apply(o,arguments),new(Function.bind.apply(t,o))}return t.apply(this,arguments)};o.prototype=t.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(e).forEach((function(t){var d=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(o,t,d.get?d:{enumerable:!0,get:function(){return e[t]}})})),o}var o,d={};!function(e){e.PING="@straddleio/js-bridge/ping",e.ERROR="@straddleio/js-bridge/error",e.INITIALIZE="@straddleio/js-bridge/initialize",e.INITIALIZING="@straddleio/js-bridge/initializing",e.INITIALIZED="@straddleio/js-bridge/initialized",e.MOUNTED="@straddleio/js-bridge/mounted",e.ON_PAYKEY="@straddleio/js-bridge/on-paykey",e.ON_SUCCESS="@straddleio/js-bridge/on-success",e.ON_SUCCESS_CTA_CLICKED="@straddleio/js-bridge/on-success-cta-clicked",e.ON_CLOSE="@straddleio/js-bridge/on-close",e.ON_MANUAL_ENTRY="@straddleio/js-bridge/on-manual-entry",e.ON_RETRY="@straddleio/js-bridge/on-retry",e.TOKEN="@straddleio/js-bridge/token",e.DEBUG="@straddleio/js-bridge/debug",e.CONSOLE="@straddleio/js-bridge/console"}(o||(o={}));var r=t(Object.freeze({__proto__:null,get EBridgeMessageType(){return o}}));e.straddleBridge=void 0;var n=r;const i="Straddle-widget-iframe",s={getUrl:()=>`${s.origin}/${"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://",""))}`,origin:"",mounted:!1,verbose:!1,init:function(e){let{appUrl:t,token:o,onSuccess:d,onSuccessCTAClicked:r,onClose:l,onLoadError:a,onManualEntry:g,onRetry:c,targetRef:u,style:p,className:y,verbose:b=!1}=e;t=t.endsWith("/")?t.slice(0,-1):t,s.origin=null!=t?t:"https://production.straddle.io",b&&console.log("init called");const f=document.createElement("iframe");f.setAttribute("src",s.getUrl()),f.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==a||a(e)})),f.id=i;let E=p;p||(E={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),Object.assign(f.style,E),y&&y.split(" ").forEach((e=>{f.classList.add(e)})),(u||document.getElementsByTagName("body")[0]).appendChild(f),"undefined"!=typeof window&&window.addEventListener("message",(function(e){var t,a,u;if(e.origin===s.origin){b&&console.log("Message received from widget:",e.data.type,e),b&&(()=>{try{return window.self!==window.top}catch(e){return!0}})()&&(null===(a=null===(t=window.parent)||void 0===t?void 0:t.postMessage)||void 0===a||a.call(t,e.data,"*"));const p=e.data;switch(null==p?void 0:p.type){case n.EBridgeMessageType.MOUNTED:s.mounted=!0,s.send({type:n.EBridgeMessageType.INITIALIZE,token:o});break;case n.EBridgeMessageType.ON_CLOSE:null==l||l(),s.mounted=!1,null===(u=document.querySelector(`#${i}`))||void 0===u||u.remove();break;case n.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:document.getElementsByTagName("body")[0].removeChild(f),null==r||r();break;case n.EBridgeMessageType.ON_MANUAL_ENTRY:null==g||g();break;case n.EBridgeMessageType.ON_RETRY:null==c||c();break;case n.EBridgeMessageType.ON_PAYKEY:null==d||d(p.paykeyResponse);break;case n.EBridgeMessageType.CONSOLE:{const e=p.payload.map((e=>{try{return JSON.parse(e)}catch(t){return e}}));"method"in p&&console[p.method].apply(console,e)}}}}))},getIframe:()=>document.getElementById("Straddle-widget-iframe"),show:()=>{s.verbose&&console.log("straddleBridge.show method called.");const e=s.getIframe();s.verbose&&e&&console.log("iframe found, setting display to block."),e.style.display="block"},hide:()=>{s.verbose&&console.log("straddleBridge.hide method called.");const e=s.getIframe();s.verbose&&e&&console.log("iframe found, setting display to none."),e.style.display="none"},remove:()=>{s.verbose&&console.log("straddleBridge.remove method called."),s.getIframe().remove(),s.mounted=!1},send:function(e){var t;const o=document.getElementById("Straddle-widget-iframe");console.log("sending message:",e,"to",s.origin),null===(t=null==o?void 0:o.contentWindow)||void 0===t||t.postMessage(e,s.origin)}};return"undefined"!=typeof window&&(window.straddleBridge=s),Object.defineProperty(s,"debug",{value:{enable:()=>s.send({type:n.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>s.send({type:n.EBridgeMessageType.DEBUG,enable:!1})},enumerable:!1,writable:!1,configurable:!1}),e.straddleBridge=d.straddleBridge=s,e.default=d,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
