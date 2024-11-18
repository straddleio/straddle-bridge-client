import{EBridgeMessageType as e}from"@straddleio/bridge-core";const o="Straddle-widget-iframe",n={getUrl:()=>`${n.origin}/${"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://",""))}`,origin:"",mounted:!1,verbose:!1,init:function(t){let{appUrl:l,token:d,onSuccess:r,onSuccessCTAClicked:a,onClose:i,onLoadError:s,allowManualEntry:c=!0,onManualEntry:g,onRetry:u,targetRef:m,style:p,className:y,verbose:f=!1}=t;l=l.endsWith("/")?l.slice(0,-1):l,n.origin=null!=l?l:"https://production.straddle.io",f&&console.log("init called");const w=document.createElement("iframe");w.setAttribute("src",n.getUrl()),w.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==s||s(e)})),w.id=o;let b=p;p||(b={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),Object.assign(w.style,b),y&&y.split(" ").forEach((e=>{w.classList.add(e)})),(m||document.getElementsByTagName("body")[0]).appendChild(w),"undefined"!=typeof window&&window.addEventListener("message",(function(t){var l,s,m;if(t.origin===n.origin){f&&console.log("Message received from widget:",t.data.type,t),f&&(()=>{try{return window.self!==window.top}catch(e){return!0}})()&&(null===(s=null===(l=window.parent)||void 0===l?void 0:l.postMessage)||void 0===s||s.call(l,t.data,"*"));const p=t.data;switch(null==p?void 0:p.type){case e.MOUNTED:n.mounted=!0,n.send({type:e.INITIALIZE,token:d,allowManualEntry:c});break;case e.ON_CLOSE:null==i||i(),n.mounted=!1,null===(m=document.querySelector(`#${o}`))||void 0===m||m.remove();break;case e.ON_SUCCESS_CTA_CLICKED:document.getElementsByTagName("body")[0].removeChild(w),null==a||a();break;case e.ON_MANUAL_ENTRY:null==g||g();break;case e.ON_RETRY:null==u||u();break;case e.ON_PAYKEY:null==r||r(p.paykeyResponse);break;case e.CONSOLE:{const e=p.payload.map((e=>{try{return JSON.parse(e)}catch(o){return e}}));"method"in p&&console[p.method].apply(console,e)}}}}))},getIframe:()=>document.getElementById("Straddle-widget-iframe"),show:()=>{n.verbose&&console.log("straddleBridge.show method called.");const e=n.getIframe();n.verbose&&e&&console.log("iframe found, setting display to block."),e.style.display="block"},hide:()=>{n.verbose&&console.log("straddleBridge.hide method called.");const e=n.getIframe();n.verbose&&e&&console.log("iframe found, setting display to none."),e.style.display="none"},remove:()=>{n.verbose&&console.log("straddleBridge.remove method called.");const e=n.getIframe();null==e||e.remove(),n.mounted=!1},send:function(e){var o;const t=document.getElementById("Straddle-widget-iframe");console.log("sending message:",e,"to",n.origin),null===(o=null==t?void 0:t.contentWindow)||void 0===o||o.postMessage(e,n.origin)}};"undefined"!=typeof window&&(window.straddleBridge=n),Object.defineProperty(n,"debug",{value:{enable:()=>n.send({type:e.DEBUG,enable:!0}),disable:()=>n.send({type:e.DEBUG,enable:!1})},enumerable:!1,writable:!1,configurable:!1});export{n as straddleBridge};
//# sourceMappingURL=bridge-js.esm.js.map
