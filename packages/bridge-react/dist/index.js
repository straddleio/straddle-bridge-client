"use strict";var e=require("@straddleio/bridge-core"),r=require("react");const t="Straddle-widget-iframe",n={production:"https://bridge.straddle.io",sandbox:"https://bridge-sandbox.straddle.io"},d=({mode:e,appUrl:d})=>{d=null!=d?d:(e=>n[null!=e?e:"production"])(e),d=d.endsWith("/")?d.slice(0,-1):d;const[s,a]=r.useState(!1),[i,l]=r.useState(!1),c=o();return{send:e=>{var r;const n=document.getElementById(t);n&&(null===(r=n.contentWindow)||void 0===r||r.postMessage(e,d))},iframeMounted:s,setIframeMounted:a,bridgeAppMounted:i,setBridgeAppMounted:l,url:`${d}/${c}/`}},o=()=>"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://","")),s=r.forwardRef(((n,o)=>{const{mode:s,appUrl:a,open:i=!0,token:l,onSuccess:c,onSuccessCTAClicked:u,onClose:p,onLoadError:g,allowManualEntry:y=!0,onManualEntry:E,onRetry:m,className:f,style:M,verbose:b}=n,{send:B,setIframeMounted:S,bridgeAppMounted:w,setBridgeAppMounted:v,url:T}=d({mode:s,appUrl:a}),N=r.useRef(!1);return r.useEffect((()=>{var r;let n,d;if(i){let r=document.querySelector("#"+t);r||(r=document.createElement("iframe"),r.setAttribute("src",`${T}?allowManualEntry=${y}`)),n=e=>{console.error("Error loading Straddle Widget"),null==g||g(e)},r&&r.addEventListener("error",n),r.id=t;let s=M;M||(s={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),s&&Object.assign(r.style,s),f&&f.split(" ").forEach((e=>{r.classList.add(e)})),o&&"current"in o&&o.current&&o.current instanceof Node?o.current.appendChild(r):(!o||!("current"in o)||o.current&&o.current instanceof Node||console.warn("ref passed to StraddleBridge is not a valid ref, reverting to appening to body. Ref passed:",o.current),document.getElementsByTagName("body")[0].appendChild(r)),d=function(r){var n;if(r.origin===a){b&&r.data.type!==e.EBridgeMessageType.CONSOLE&&console.log("Straddle Bridge React client, Message received from widget:",r.data.type,r);const d=r.data;switch(null==d?void 0:d.type){case e.EBridgeMessageType.PING:break;case e.EBridgeMessageType.MOUNTED:v(!0),B({type:e.EBridgeMessageType.INITIALIZE,token:l});break;case e.EBridgeMessageType.ON_CLOSE:null==p||p(),v(!1),null===(n=document.querySelector(`#${t}`))||void 0===n||n.remove();break;case e.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:null==u||u();break;case e.EBridgeMessageType.ON_PAYKEY:null==c||c(d.paykeyResponse);break;case e.EBridgeMessageType.ON_MANUAL_ENTRY:null==E||E();break;case e.EBridgeMessageType.ON_RETRY:null==m||m();break;case e.EBridgeMessageType.CONSOLE:{const e=d.payload.map((e=>{try{return JSON.parse(e)}catch(r){return e}}));"method"in d&&console[d.method].apply(console,e)}}}},window.addEventListener("message",d)}else!i&&N&&(null===(r=document.querySelector(`#${t}`))||void 0===r||r.remove(),S(!1),N.current=!1,v(!1));return()=>{const e=document.querySelector("#"+t);n&&e&&e.removeEventListener("error",n),d&&window.removeEventListener("message",d)}}),[i]),r.useEffect((()=>{"undefined"!=typeof window&&(window.straddleDebug={enable:()=>B({type:e.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>B({type:e.EBridgeMessageType.DEBUG,enable:!1})})}),[]),null}));s.displayName="StraddleBridge",exports.StraddleBridge=s,exports.useStraddleBridge=d;
//# sourceMappingURL=index.js.map
