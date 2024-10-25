"use strict";var e=require("@straddleio/bridge-core");const o="Straddle-widget-iframe",n={getUrl:()=>`${n.origin}/${encodeURIComponent("undefined"!=typeof window&&window.location.origin)}`,origin:"",mounted:!1,verbose:!1,init:function(t){const{appUrl:d,token:s,onSuccess:r,onSuccessCTAClicked:i,onClose:l,onLoadError:a,onManualEntry:g,onRetry:c,targetRef:m,style:u,className:p,verbose:y=!1}=t;n.origin=null!=d?d:"https://production.straddle.io",y&&console.log("init called");const E=document.createElement("iframe");E.setAttribute("src",n.getUrl()),E.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==a||a(e)})),E.id=o;let b=u;u||(b={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),Object.assign(E.style,b),p&&p.split(" ").forEach((e=>{E.classList.add(e)})),(m||document.getElementsByTagName("body")[0]).appendChild(E),"undefined"!=typeof window&&window.addEventListener("message",(function(t){var d;if(t.origin===n.origin){y&&console.log("Message received from widget:",t.data.type,t);const a=t.data;switch(null==a?void 0:a.type){case e.EBridgeMessageType.MOUNTED:n.mounted=!0,n.send({type:e.EBridgeMessageType.INITIALIZE,token:s});break;case e.EBridgeMessageType.ON_CLOSE:null==l||l(),n.mounted=!1,null===(d=document.querySelector(`#${o}`))||void 0===d||d.remove();break;case e.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:document.getElementsByTagName("body")[0].removeChild(E),null==i||i();break;case e.EBridgeMessageType.ON_MANUAL_ENTRY:null==g||g();break;case e.EBridgeMessageType.ON_RETRY:null==c||c();break;case e.EBridgeMessageType.ON_PAYKEY:null==r||r(a.paykeyResponse);break;case e.EBridgeMessageType.CONSOLE:{const e=a.payload.map((e=>{try{return JSON.parse(e)}catch(o){return e}}));"method"in a&&console[a.method].apply(console,e)}}}}))},getIframe:()=>document.getElementById("Straddle-widget-iframe"),show:()=>{n.verbose&&console.log("straddleBridge.show method called.");const e=n.getIframe();n.verbose&&e&&console.log("iframe found, setting display to block."),e.style.display="block"},hide:()=>{n.verbose&&console.log("straddleBridge.hide method called.");const e=n.getIframe();n.verbose&&e&&console.log("iframe found, setting display to none."),e.style.display="none"},remove:()=>{n.verbose&&console.log("straddleBridge.remove method called.");n.getIframe().remove(),n.mounted=!1},send:function(e){var o;const t=document.getElementById("Straddle-widget-iframe");console.log("sending message:",e),null===(o=null==t?void 0:t.contentWindow)||void 0===o||o.postMessage(e,n.origin)}};"undefined"!=typeof window&&(window.straddleBridge=n),Object.defineProperty(n,"debug",{value:{enable:()=>n.send({type:e.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>n.send({type:e.EBridgeMessageType.DEBUG,enable:!1})},enumerable:!1,writable:!1,configurable:!1}),exports.straddleBridge=n;
