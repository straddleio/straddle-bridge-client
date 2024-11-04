"use strict";var e=require("@straddleio/bridge-core"),r=require("react");const t="Straddle-widget-iframe",n=({appUrl:e})=>{const[n,s]=r.useState(!1),[a,o]=r.useState(!1);console.log({bridgeAppMounted:a});const i=d();return{send:r=>{var n;const d=document.getElementById(t);d&&(null===(n=d.contentWindow)||void 0===n||n.postMessage(r,e))},iframeMounted:n,setIframeMounted:s,bridgeAppMounted:a,setBridgeAppMounted:o,url:`${e}/${i}/`}},d=()=>"undefined"!=typeof window&&encodeURIComponent(window.location.origin.replace("https://","").replace("http://","")),s=r.forwardRef(((d,s)=>{const{appUrl:a,open:o=!0,token:i,onSuccess:l,onSuccessCTAClicked:c,onClose:p,onLoadError:u,onManualEntry:g,onRetry:y,className:E,style:f,verbose:M}=d,{send:m,setIframeMounted:B,bridgeAppMounted:b,setBridgeAppMounted:S,url:T}=n({appUrl:a}),N=r.useRef(!1);return r.useEffect((()=>{var r;if(o&&!N.current){N.current=!0;const r=document.createElement("iframe");r.setAttribute("src",T),r.addEventListener("error",(e=>{console.error("Error loading Straddle Widget"),null==u||u(e)})),r.id=t;let n=f;f||(n={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),n&&Object.assign(r.style,n),E&&E.split(" ").forEach((e=>{r.classList.add(e)})),s&&"current"in s&&s.current&&s.current instanceof Node?s.current.appendChild(r):(!s||!("current"in s)||s.current&&s.current instanceof Node||console.warn("ref passed to StraddleBridge is not a valid ref, reverting to appening to body. Ref passed:",s.current),document.getElementsByTagName("body")[0].appendChild(r)),window.addEventListener("message",(function(r){var n;if(r.origin===a){M&&r.data.type!==e.EBridgeMessageType.CONSOLE&&console.log("Straddle Bridge React client, Message received from widget:",r.data.type,r);const d=r.data;switch(null==d?void 0:d.type){case e.EBridgeMessageType.PING:break;case e.EBridgeMessageType.MOUNTED:S(!0),m({type:e.EBridgeMessageType.INITIALIZE,token:i});break;case e.EBridgeMessageType.ON_CLOSE:null==p||p(),S(!1),null===(n=document.querySelector(`#${t}`))||void 0===n||n.remove();break;case e.EBridgeMessageType.ON_SUCCESS_CTA_CLICKED:null==c||c();break;case e.EBridgeMessageType.ON_PAYKEY:null==l||l(d.paykeyResponse);break;case e.EBridgeMessageType.ON_MANUAL_ENTRY:null==g||g();break;case e.EBridgeMessageType.ON_RETRY:null==y||y();break;case e.EBridgeMessageType.CONSOLE:{const e=d.payload.map((e=>{try{return JSON.parse(e)}catch(r){return e}}));"method"in d&&console[d.method].apply(console,e)}}}}))}else!o&&N&&(null===(r=document.querySelector(`#${t}`))||void 0===r||r.remove(),B(!1),N.current=!1,S(!1))}),[o,b]),r.useEffect((()=>{"undefined"!=typeof window&&(window.straddleDebug={enable:()=>m({type:e.EBridgeMessageType.DEBUG,enable:!0}),disable:()=>m({type:e.EBridgeMessageType.DEBUG,enable:!1})})}),[]),null}));s.displayName="StraddleBridge",exports.StraddleBridge=s,exports.useStraddleBridge=n;
//# sourceMappingURL=index.js.map
