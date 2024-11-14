"use strict";var e=require("@straddleio/bridge-core");const o="Straddle-widget-iframe",t={getUrl:()=>`${t.origin}/${"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://",""))}`,origin:"",mounted:!1,verbose:!1,init:function(n){let{appUrl:d,token:s,onSuccess:r,onSuccessCTAClicked:l,onClose:i,onLoadError:a,onManualEntry:g,onRetry:c,targetRef:p,style:u,className:m,verbose:y=!1}=n;d=d.endsWith("/")?d.slice(0,-1):d,t.origin=null!=d?d:"https://production.straddle.io",y&&console.log("init called");const E=document.createElement("iframe");E.setAttribute("src",t.getUrl()),E.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==a||a(e)})),E.id=o;let f=u;u||(f={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),Object.assign(E.style,f),m&&m.split(" ").forEach((e=>{E.classList.add(e)})),(p||document.getElementsByTagName("body")[0]).appendChild(E),"undefined"!=typeof window&&window.addEventListener("message",(function(n){var d,a,p;if(n.origin===t.origin){y&&console.log("Message received from widget:",n.data.type,n),y&&(()=>{try{return window.self!==window.top}catch(e){return!0}})()&&(null===(a=null===(d=window.parent)||void 0===d?void 0:d.postMessage)||void 0===a||a.call(d,n.data,"*"));const u=n.data;switch(null==u?void 0:u.type){case e.EBridgeMessageType.MOUNTED:t.mounted=!0,t.send({type:e.EBridgeMessageType.INITIALIZE,token:s});break;case e.EBridgeMessageType.ON_CLOSE:null==i||i(),t.mounted=!1,null===(p=document.querySelector(`#${o}`))||void 0===p||p.remove();break;case e.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:document.getElementsByTagName("body")[0].removeChild(E),null==l||l();break;case e.EBridgeMessageType.ON_MANUAL_ENTRY:null==g||g();break;case e.EBridgeMessageType.ON_RETRY:null==c||c();break;case e.EBridgeMessageType.ON_PAYKEY:null==r||r(u.paykeyResponse);break;case e.EBridgeMessageType.CONSOLE:{const e=u.payload.map((e=>{try{return JSON.parse(e)}catch(o){return e}}));"method"in u&&console[u.method].apply(console,e)}}}}))},getIframe:()=>document.getElementById("Straddle-widget-iframe"),show:()=>{t.verbose&&console.log("straddleBridge.show method called.");const e=t.getIframe();t.verbose&&e&&console.log("iframe found, setting display to block."),e.style.display="block"},hide:()=>{t.verbose&&console.log("straddleBridge.hide method called.");const e=t.getIframe();t.verbose&&e&&console.log("iframe found, setting display to none."),e.style.display="none"},remove:()=>{t.verbose&&console.log("straddleBridge.remove method called.");const e=t.getIframe();null==e||e.remove(),t.mounted=!1},send:function(e){var o;const n=document.getElementById("Straddle-widget-iframe");console.log("sending message:",e,"to",t.origin),null===(o=null==n?void 0:n.contentWindow)||void 0===o||o.postMessage(e,t.origin)}};"undefined"!=typeof window&&(window.straddleBridge=t),Object.defineProperty(t,"debug",{value:{enable:()=>t.send({type:e.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>t.send({type:e.EBridgeMessageType.DEBUG,enable:!1})},enumerable:!1,writable:!1,configurable:!1}),exports.straddleBridge=t;
//# sourceMappingURL=bridge-js.cjs.js.map
