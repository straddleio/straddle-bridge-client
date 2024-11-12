var StraddleBridge=function(e){"use strict";var o;!function(e){e.PING="@straddleio/js-bridge/ping",e.ERROR="@straddleio/js-bridge/error",e.INITIALIZE="@straddleio/js-bridge/initialize",e.INITIALIZING="@straddleio/js-bridge/initializing",e.INITIALIZED="@straddleio/js-bridge/initialized",e.MOUNTED="@straddleio/js-bridge/mounted",e.ON_PAYKEY="@straddleio/js-bridge/on-paykey",e.ON_SUCCESS="@straddleio/js-bridge/on-success",e.ON_SUCCESS_CTA_CLICKED="@straddleio/js-bridge/on-success-cta-clicked",e.ON_CLOSE="@straddleio/js-bridge/on-close",e.ON_MANUAL_ENTRY="@straddleio/js-bridge/on-manual-entry",e.ON_RETRY="@straddleio/js-bridge/on-retry",e.TOKEN="@straddleio/js-bridge/token",e.DEBUG="@straddleio/js-bridge/debug",e.CONSOLE="@straddleio/js-bridge/console"}(o||(o={}));const d="Straddle-widget-iframe",t={getUrl:()=>`${t.origin}/${"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://",""))}`,origin:"",mounted:!1,verbose:!1,init:function(e){let{appUrl:n,token:i,onSuccess:r,onSuccessCTAClicked:s,onClose:l,onLoadError:a,onManualEntry:c,onRetry:g,targetRef:u,style:m,className:b,verbose:p=!1}=e;n=n.endsWith("/")?n.slice(0,-1):n,t.origin=null!=n?n:"https://production.straddle.io",p&&console.log("init called");const y=document.createElement("iframe");y.setAttribute("src",t.getUrl()),y.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==a||a(e)})),y.id=d;let E=m;m||(E={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),Object.assign(y.style,E),b&&b.split(" ").forEach((e=>{y.classList.add(e)})),(u||document.getElementsByTagName("body")[0]).appendChild(y),"undefined"!=typeof window&&window.addEventListener("message",(function(e){var n,a,u;if(e.origin===t.origin){p&&console.log("Message received from widget:",e.data.type,e),p&&(()=>{try{return window.self!==window.top}catch(e){return!0}})()&&(null===(a=null===(n=window.parent)||void 0===n?void 0:n.postMessage)||void 0===a||a.call(n,e.data,"*"));const m=e.data;switch(null==m?void 0:m.type){case o.MOUNTED:t.mounted=!0,t.send({type:o.INITIALIZE,token:i});break;case o.ON_CLOSE:null==l||l(),t.mounted=!1,null===(u=document.querySelector(`#${d}`))||void 0===u||u.remove();break;case o.ON_SUCCESS_CTA_CLICKED:document.getElementsByTagName("body")[0].removeChild(y),null==s||s();break;case o.ON_MANUAL_ENTRY:null==c||c();break;case o.ON_RETRY:null==g||g();break;case o.ON_PAYKEY:null==r||r(m.paykeyResponse);break;case o.CONSOLE:{const e=m.payload.map((e=>{try{return JSON.parse(e)}catch(o){return e}}));"method"in m&&console[m.method].apply(console,e)}}}}))},getIframe:()=>document.getElementById("Straddle-widget-iframe"),show:()=>{t.verbose&&console.log("straddleBridge.show method called.");const e=t.getIframe();t.verbose&&e&&console.log("iframe found, setting display to block."),e.style.display="block"},hide:()=>{t.verbose&&console.log("straddleBridge.hide method called.");const e=t.getIframe();t.verbose&&e&&console.log("iframe found, setting display to none."),e.style.display="none"},remove:()=>{t.verbose&&console.log("straddleBridge.remove method called."),t.getIframe().remove(),t.mounted=!1},send:function(e){var o;const d=document.getElementById("Straddle-widget-iframe");console.log("sending message:",e,"to",t.origin),null===(o=null==d?void 0:d.contentWindow)||void 0===o||o.postMessage(e,t.origin)}};return"undefined"!=typeof window&&(window.straddleBridge=t),Object.defineProperty(t,"debug",{value:{enable:()=>t.send({type:o.DEBUG,enable:!0}),disable:()=>t.send({type:o.DEBUG,enable:!1})},enumerable:!1,writable:!1,configurable:!1}),e.straddleBridge=t,e}({});
