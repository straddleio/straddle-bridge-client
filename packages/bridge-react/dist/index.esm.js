import{EBridgeMessageType as e}from"@straddleio/bridge-core";import{forwardRef as t,useEffect as n,useState as d}from"react";const o="Straddle-widget-iframe",a=({appUrl:e})=>{const[t,n]=d(!1),[a,i]=d(!1),s=`${e}/${r()}/`;return{send:e=>{var t;const n=document.getElementById(o);n&&(null===(t=n.contentWindow)||void 0===t||t.postMessage(e,s))},iframeMounted:t,setIframeMounted:n,bridgeAppMounted:a,setBridgeAppMounted:i,url:s}},r=()=>"undefined"!=typeof window&&encodeURIComponent(window.location.origin),i=t(((t,d)=>{const{appUrl:r,open:i=!0,token:s,onSuccess:l,onSuccessCTAClicked:c,className:p,style:u}=t,{send:m,iframeMounted:g,setIframeMounted:f,bridgeAppMounted:b,setBridgeAppMounted:y,url:w}=a({appUrl:r});return n((()=>{var t;if(i&&!g){f(!0);const t=document.createElement("iframe");t.setAttribute("src",w),t.id=o;let n=u;u||(n={position:"fixed",width:"100%",height:"100%",top:"0%",left:"0",zIndex:"2147483647"}),n&&Object.assign(t.style,n),p&&p.split(" ").forEach((e=>{t.classList.add(e)})),d&&"current"in d?d.current.appendChild(t):document.getElementsByTagName("body")[0].appendChild(t),window.addEventListener("message",(function(t){var n;if(t.origin===r)switch(null===(n=t.data)||void 0===n?void 0:n.type){case e.PING:break;case e.MOUNTED:b||(y(!0),m({type:e.INITIALIZE,token:s}));break;case e.ON_SUCCESS_CTA_CLICKED:null==c||c();break;case e.ON_PAYKEY:null==l||l(t.data);break;case"@straddleio/bridge-js/log":{const e=t.data.payload.map((e=>{try{return JSON.parse(e)}catch(t){return e}}));console[t.data.method].apply(console,e)}}}))}else!i&&g&&(null===(t=document.querySelector(`#${o}`))||void 0===t||t.remove(),f(!1),y(!1))}),[i]),n((()=>{"undefined"!=typeof window&&(window.debug={enable:()=>m({type:e.DEBUG,enable:!0}),disable:()=>m({type:e.DEBUG,enable:!1})})}),[]),null}));i.displayName="StraddleBridge";export{i as StraddleBridge,a as useStraddleBridge};
//# sourceMappingURL=index.esm.js.map