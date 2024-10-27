"use strict";var e=require("@straddleio/bridge-core"),r=require("react");const t="Straddle-widget-iframe",n=({appUrl:e})=>{const[n,d]=r.useState(!1),[o,a]=r.useState(!1);console.log({bridgeAppMounted:o});const i=s();return{send:r=>{var n;const s=document.getElementById(t);s&&(null===(n=s.contentWindow)||void 0===n||n.postMessage(r,e))},iframeMounted:n,setIframeMounted:d,bridgeAppMounted:o,setBridgeAppMounted:a,url:`${e}/${i}/`}},s=()=>"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://","")),d=r.forwardRef(((s,d)=>{const{appUrl:o,open:a=!0,token:i,onSuccess:l,onSuccessCTAClicked:c,onClose:p,onLoadError:u,onManualEntry:g,onRetry:y,className:E,style:f,verbose:M}=s,{send:m,setIframeMounted:B,bridgeAppMounted:b,setBridgeAppMounted:S,url:T}=n({appUrl:o}),N=r.useRef(!1);return r.useEffect((()=>{var r;if(a&&!N.current){N.current=!0;const r=document.createElement("iframe");r.setAttribute("src",T),r.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==u||u(e)})),r.id=t;let n=f;f||(n={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),n&&Object.assign(r.style,n),E&&E.split(" ").forEach((e=>{r.classList.add(e)})),d&&"current"in d&&d.current&&d.current instanceof Node?d.current.appendChild(r):(!d||!("current"in d)||d.current&&d.current instanceof Node||console.warn("ref passed to StraddleBridge is not a valid ref, reverting to appening to body. Ref passed:",d.current),document.getElementsByTagName("body")[0].appendChild(r)),window.addEventListener("message",(function(r){var n;if(r.origin===o){M&&r.data.type!==e.EBridgeMessageType.CONSOLE&&console.log("Straddle Bridge React client, Message received from widget:",r.data.type,r);const s=r.data;switch(null==s?void 0:s.type){case e.EBridgeMessageType.PING:break;case e.EBridgeMessageType.MOUNTED:S(!0),m({type:e.EBridgeMessageType.INITIALIZE,token:i});break;case e.EBridgeMessageType.ON_CLOSE:null==p||p(),S(!1),null===(n=document.querySelector(`#${t}`))||void 0===n||n.remove();break;case e.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:null==c||c();break;case e.EBridgeMessageType.ON_PAYKEY:null==l||l(s.paykeyResponse);break;case e.EBridgeMessageType.ON_MANUAL_ENTRY:null==g||g();break;case e.EBridgeMessageType.ON_RETRY:null==y||y();break;case e.EBridgeMessageType.CONSOLE:{const e=s.payload.map((e=>{try{return JSON.parse(e)}catch(r){return e}}));"method"in s&&console[s.method].apply(console,e)}}}}))}else!a&&N&&(null===(r=document.querySelector(`#${t}`))||void 0===r||r.remove(),B(!1),N.current=!1,S(!1))}),[a,b]),r.useEffect((()=>{"undefined"!=typeof window&&(window.verbose={enable:()=>m({type:e.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>m({type:e.EBridgeMessageType.DEBUG,enable:!1})})}),[]),null}));d.displayName="StraddleBridge",exports.StraddleBridge=d,exports.useStraddleBridge=n;
//# sourceMappingURL=index.js.map
