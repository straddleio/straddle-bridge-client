!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports,require("@straddleio/bridge-core")):"function"==typeof define&&define.amd?define(["exports","@straddleio/bridge-core"],o):o((e="undefined"!=typeof globalThis?globalThis:e||self).StraddleBridge={},e.BridgeCore)}(this,(function(e,o){"use strict";const t="Straddle-widget-iframe",d={getUrl:()=>`${d.origin}/${"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://",""))}`,origin:"",mounted:!1,verbose:!1,init:function(e){let{appUrl:n,token:s,onSuccess:r,onSuccessCTAClicked:i,onClose:l,onLoadError:a,onManualEntry:g,onRetry:c,targetRef:p,style:u,className:m,verbose:y=!1}=e;n=n.endsWith("/")?n.slice(0,-1):n,d.origin=null!=n?n:"https://production.straddle.io",y&&console.log("init called");const f=document.createElement("iframe");f.setAttribute("src",d.getUrl()),f.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==a||a(e)})),f.id=t;let b=u;u||(b={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),Object.assign(f.style,b),m&&m.split(" ").forEach((e=>{f.classList.add(e)})),(p||document.getElementsByTagName("body")[0]).appendChild(f),"undefined"!=typeof window&&window.addEventListener("message",(function(e){var n,a,p;if(e.origin===d.origin){y&&console.log("Message received from widget:",e.data.type,e),y&&(()=>{try{return window.self!==window.top}catch(e){return!0}})()&&(null===(a=null===(n=window.parent)||void 0===n?void 0:n.postMessage)||void 0===a||a.call(n,e.data,"*"));const u=e.data;switch(null==u?void 0:u.type){case o.EBridgeMessageType.MOUNTED:d.mounted=!0,d.send({type:o.EBridgeMessageType.INITIALIZE,token:s});break;case o.EBridgeMessageType.ON_CLOSE:null==l||l(),d.mounted=!1,null===(p=document.querySelector(`#${t}`))||void 0===p||p.remove();break;case o.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:document.getElementsByTagName("body")[0].removeChild(f),null==i||i();break;case o.EBridgeMessageType.ON_MANUAL_ENTRY:null==g||g();break;case o.EBridgeMessageType.ON_RETRY:null==c||c();break;case o.EBridgeMessageType.ON_PAYKEY:null==r||r(u.paykeyResponse);break;case o.EBridgeMessageType.CONSOLE:{const e=u.payload.map((e=>{try{return JSON.parse(e)}catch(o){return e}}));"method"in u&&console[u.method].apply(console,e)}}}}))},getIframe:()=>document.getElementById("Straddle-widget-iframe"),show:()=>{d.verbose&&console.log("straddleBridge.show method called.");const e=d.getIframe();d.verbose&&e&&console.log("iframe found, setting display to block."),e.style.display="block"},hide:()=>{d.verbose&&console.log("straddleBridge.hide method called.");const e=d.getIframe();d.verbose&&e&&console.log("iframe found, setting display to none."),e.style.display="none"},remove:()=>{d.verbose&&console.log("straddleBridge.remove method called.");d.getIframe().remove(),d.mounted=!1},send:function(e){var o;const t=document.getElementById("Straddle-widget-iframe");console.log("sending message:",e,"to",d.origin),null===(o=null==t?void 0:t.contentWindow)||void 0===o||o.postMessage(e,d.origin)}};"undefined"!=typeof window&&(window.straddleBridge=d),Object.defineProperty(d,"debug",{value:{enable:()=>d.send({type:o.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>d.send({type:o.EBridgeMessageType.DEBUG,enable:!1})},enumerable:!1,writable:!1,configurable:!1}),e.straddleBridge=d}));
//# sourceMappingURL=bridge-js.umd.js.map
