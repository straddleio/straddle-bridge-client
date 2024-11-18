!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports,require("@straddleio/bridge-core")):"function"==typeof define&&define.amd?define(["exports","@straddleio/bridge-core"],o):o((e="undefined"!=typeof globalThis?globalThis:e||self).StraddleBridge={},e.BridgeCore)}(this,(function(e,o){"use strict";const t="Straddle-widget-iframe",n={getUrl:()=>`${n.origin}/${"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://",""))}`,origin:"",mounted:!1,verbose:!1,init:function(e){let{appUrl:d,token:r,onSuccess:s,onSuccessCTAClicked:l,onClose:i,onLoadError:a,allowManualEntry:g=!0,onManualEntry:c,onRetry:u,targetRef:p,style:y,className:m,verbose:f=!1}=e;d=d.endsWith("/")?d.slice(0,-1):d,n.origin=null!=d?d:"https://production.straddle.io",f&&console.log("init called");const E=document.createElement("iframe");E.setAttribute("src",n.getUrl()+"?allowManualEntry="+g),E.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==a||a(e)})),E.id=t;let b=y;y||(b={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),Object.assign(E.style,b),m&&m.split(" ").forEach((e=>{E.classList.add(e)})),(p||document.getElementsByTagName("body")[0]).appendChild(E),"undefined"!=typeof window&&window.addEventListener("message",(function(e){var d,a,g;if(e.origin===n.origin){f&&console.log("Message received from widget:",e.data.type,e),f&&(()=>{try{return window.self!==window.top}catch(e){return!0}})()&&(null===(a=null===(d=window.parent)||void 0===d?void 0:d.postMessage)||void 0===a||a.call(d,e.data,"*"));const p=e.data;switch(null==p?void 0:p.type){case o.EBridgeMessageType.MOUNTED:n.mounted=!0,n.send({type:o.EBridgeMessageType.INITIALIZE,token:r});break;case o.EBridgeMessageType.ON_CLOSE:null==i||i(),n.mounted=!1,null===(g=document.querySelector(`#${t}`))||void 0===g||g.remove();break;case o.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:document.getElementsByTagName("body")[0].removeChild(E),null==l||l();break;case o.EBridgeMessageType.ON_MANUAL_ENTRY:null==c||c();break;case o.EBridgeMessageType.ON_RETRY:null==u||u();break;case o.EBridgeMessageType.ON_PAYKEY:null==s||s(p.paykeyResponse);break;case o.EBridgeMessageType.CONSOLE:{const e=p.payload.map((e=>{try{return JSON.parse(e)}catch(o){return e}}));"method"in p&&console[p.method].apply(console,e)}}}}))},getIframe:()=>document.getElementById("Straddle-widget-iframe"),show:()=>{n.verbose&&console.log("straddleBridge.show method called.");const e=n.getIframe();n.verbose&&e&&console.log("iframe found, setting display to block."),e.style.display="block"},hide:()=>{n.verbose&&console.log("straddleBridge.hide method called.");const e=n.getIframe();n.verbose&&e&&console.log("iframe found, setting display to none."),e.style.display="none"},remove:()=>{n.verbose&&console.log("straddleBridge.remove method called.");const e=n.getIframe();null==e||e.remove(),n.mounted=!1},send:function(e){var o;const t=document.getElementById("Straddle-widget-iframe");console.log("sending message:",e,"to",n.origin),null===(o=null==t?void 0:t.contentWindow)||void 0===o||o.postMessage(e,n.origin)}};"undefined"!=typeof window&&(window.straddleBridge=n),Object.defineProperty(n,"debug",{value:{enable:()=>n.send({type:o.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>n.send({type:o.EBridgeMessageType.DEBUG,enable:!1})},enumerable:!1,writable:!1,configurable:!1}),e.straddleBridge=n}));
//# sourceMappingURL=bridge-js.umd.js.map
