"use strict";var e=require("@straddleio/bridge-core"),r=require("react");const t="Straddle-widget-iframe",d=({appUrl:e})=>{const[d,a]=r.useState(!1),[o,s]=r.useState(!1),i=`${e}/${n()}/`;return{send:e=>{var r;const d=document.getElementById(t);d&&(null===(r=d.contentWindow)||void 0===r||r.postMessage(e,i))},iframeMounted:d,setIframeMounted:a,bridgeAppMounted:o,setBridgeAppMounted:s,url:i}},n=()=>"undefined"!=typeof window&&encodeURIComponent(window.location.origin),a=r.forwardRef(((n,a)=>{const{appUrl:o,open:s=!0,token:i,onSuccess:l,onSuccessCTAClicked:c,onClose:u,onLoadError:p,className:g,style:f,verbose:y}=n,{send:E,setIframeMounted:m,bridgeAppMounted:b,setBridgeAppMounted:B,url:v}=d({appUrl:o}),M=r.useRef(!1);return r.useEffect((()=>{var r;if(s&&!M.current){M.current=!0;const r=document.createElement("iframe");r.setAttribute("src",v),r.setAttribute("src",v),r.addEventListener("error",(()=>{console.error("Error loading Straddle iframe"),null==p||p()})),r.id=t;let d=f;f||(d={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),d&&Object.assign(r.style,d),g&&g.split(" ").forEach((e=>{r.classList.add(e)})),a&&"current"in a&&a.current&&a.current instanceof Node?a.current.appendChild(r):(!a||!("current"in a)||a.current&&a.current instanceof Node||console.warn("ref passed to StraddleBridge is not a valid ref, reverting to appening to body. Ref passed:",a.current),document.getElementsByTagName("body")[0].appendChild(r)),window.addEventListener("message",(function(r){var d,n;if(r.origin===o)switch(y&&"@straddleio/bridge-js/log"!==r.data.type&&console.log("Straddle Bridge React client, Message received from widget:",r.data.type,r),null===(d=r.data)||void 0===d?void 0:d.type){case e.EBridgeMessageType.PING:break;case e.EBridgeMessageType.MOUNTED:b||(B(!0),E({type:e.EBridgeMessageType.INITIALIZE,token:i}));break;case e.EBridgeMessageType.ON_CLOSE:null==u||u(),B(!1),null===(n=document.querySelector(`#${t}`))||void 0===n||n.remove();break;case e.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:null==c||c();break;case e.EBridgeMessageType.ON_PAYKEY:null==l||l(r.data);break;case"@straddleio/bridge-js/log":{const e=r.data.payload.map((e=>{try{return JSON.parse(e)}catch(r){return e}}));console[r.data.method].apply(console,e)}}}))}else!s&&M&&(null===(r=document.querySelector(`#${t}`))||void 0===r||r.remove(),m(!1),M.current=!1,B(!1))}),[s,b]),r.useEffect((()=>{"undefined"!=typeof window&&(window.verbose={enable:()=>E({type:e.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>E({type:e.EBridgeMessageType.DEBUG,enable:!1})})}),[]),null}));a.displayName="StraddleBridge",exports.StraddleBridge=a,exports.useStraddleBridge=d;
//# sourceMappingURL=index.js.map
