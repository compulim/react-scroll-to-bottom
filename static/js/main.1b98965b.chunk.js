(this.webpackJsonpplayground=this.webpackJsonpplayground||[]).push([[0],{1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AutoHideFollowButton",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"Composer",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"FunctionContext",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"Panel",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"StateContext",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"useAnimating",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"useAtBottom",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"useAtEnd",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"useAtStart",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"useAtTop",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"useMode",{enumerable:!0,get:function(){return b.default}}),Object.defineProperty(t,"useScrollTo",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"useScrollToBottom",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"useScrollToEnd",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"useScrollToStart",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(t,"useScrollToTop",{enumerable:!0,get:function(){return O.default}}),Object.defineProperty(t,"useSticky",{enumerable:!0,get:function(){return h.default}}),t.default=void 0;var r=j(n(24)),a=j(n(112)),o=j(n(30)),u=j(n(6)),l=j(n(32)),c=j(n(5)),i=j(n(116)),s=j(n(117)),f=j(n(118)),d=j(n(119)),m=j(n(120)),b=j(n(121)),p=j(n(122)),v=j(n(123)),y=j(n(28)),g=j(n(124)),O=j(n(125)),h=j(n(29));function j(e){return e&&e.__esModule?e:{default:e}}var E=a.default;t.default=E},112:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(15),a=s(n(9)),o=s(n(17)),u=s(n(0)),l=s(n(24)),c=s(n(30)),i=s(n(32));function s(e){return e&&e.__esModule?e:{default:e}}var f=(0,r.css)({position:"relative"}),d=function(e){var t=e.checkInterval,n=e.children,r=e.className,a=e.debounce,s=e.followButtonClassName,d=e.mode,m=e.scrollViewClassName;return u.default.createElement(c.default,{checkInterval:t,debounce:a,mode:d},u.default.createElement("div",{className:(0,o.default)(f+"",(r||"")+"")},u.default.createElement(i.default,{className:m},n),u.default.createElement(l.default,{className:s})))};d.defaultProps={checkInterval:void 0,children:void 0,className:void 0,debounce:void 0,followButtonClassName:void 0,mode:void 0,scrollViewClassName:void 0},d.propTypes={checkInterval:a.default.number,children:a.default.any,className:a.default.string,debounce:a.default.number,followButtonClassName:a.default.string,mode:a.default.oneOf(["bottom","top"]),scrollViewClassName:a.default.string};var m=d;t.default=m},113:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,a=n(0),o=(r=n(114))&&r.__esModule?r:{default:r};var u=function(e){var t=e.debounce,n=e.name,r=e.onEvent,u=e.target,l=(0,a.useRef)();l.current=r;var c=(0,a.useCallback)((0,o.default)((function(e){var t=l.current;t&&t(e)}),t),[t,l]),i=(0,a.useCallback)((function(e){e.timeStampLow=Date.now(),c(e)}),[c]);return(0,a.useLayoutEffect)((function(){return u.addEventListener(n,i,{passive:!0}),i({target:u,type:n}),function(){return u.removeEventListener(n,i)}}),[n,i,u]),!1};u.defaultProps={debounce:200};var l=u;t.default=l},114:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(!t)return e;var n=0,r=null;return function(){for(var a=arguments.length,o=new Array(a),u=0;u<a;u++)o[u]=arguments[u];var l=Date.now();l-n>t?(e.apply(void 0,o),n=l):(clearTimeout(r),r=setTimeout((function(){e.apply(void 0,o),n=Date.now()}),Math.max(0,t-l+n)))}}},115:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,a=n(0),o=(r=n(9))&&r.__esModule?r:{default:r};function u(e,t){var n=Math.sign(t-e),r=e+Math.sqrt(Math.abs(t-e))*n;return n>0?Math.min(t,r):Math.max(t,r)}function l(e,t,n,r){for(var a=e,o=0;o<r;o++)a=n(a,t);return a}var c=function(e){var t=e.name,n=e.onEnd,r=e.target,o=e.value,c=(0,a.useRef)(),i=(0,a.useCallback)((function(e,t,a,o){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:Date.now();"100%"!==a&&"number"!==typeof a||(cancelAnimationFrame(c.current),c.current=requestAnimationFrame((function(){if(r){var c="100%"===a?r.scrollHeight-r.offsetHeight:a,f=l(t,c,u,(Date.now()-s)/5);Math.abs(c-f)<1.5&&(f=c),r[e]=f,c===f?n&&n(!0):i(e,t,a,o+1,s)}})))}),[c,n,r]),s=(0,a.useCallback)((function(){cancelAnimationFrame(c),n&&n(!1)}),[n]);return(0,a.useLayoutEffect)((function(){if(i(t,r[t],o,1),r)return r.addEventListener("pointerdown",s,{passive:!0}),function(){return r.removeEventListener("pointerdown",s)}}),[i,s,t,r,o]),!1};c.propTypes={name:o.default.string.isRequired,onEnd:o.default.func,target:o.default.any.isRequired,value:o.default.oneOfType([o.default.number,o.default.oneOf(["100%"])]).isRequired};var i=c;t.default=i},116:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return[(0,a.useContext)(o.default).animating]};var r,a=n(0),o=(r=n(5))&&r.__esModule?r:{default:r}},117:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return[(0,a.useContext)(o.default).atBottom]};var r,a=n(0),o=(r=n(5))&&r.__esModule?r:{default:r}},118:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return[(0,a.useContext)(o.default).atEnd]};var r,a=n(0),o=(r=n(5))&&r.__esModule?r:{default:r}},119:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return[(0,a.useContext)(o.default).atStart]};var r,a=n(0),o=(r=n(5))&&r.__esModule?r:{default:r}},120:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return[(0,a.useContext)(o.default).atTop]};var r,a=n(0),o=(r=n(5))&&r.__esModule?r:{default:r}},121:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return[(0,a.useContext)(o.default).mode]};var r,a=n(0),o=(r=n(5))&&r.__esModule?r:{default:r}},122:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return(0,a.useContext)(o.default).scrollTo};var r,a=n(0),o=(r=n(6))&&r.__esModule?r:{default:r}},123:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return(0,a.useContext)(o.default).scrollToBottom};var r,a=n(0),o=(r=n(6))&&r.__esModule?r:{default:r}},124:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return(0,a.useContext)(o.default).scrollToStart};var r,a=n(0),o=(r=n(6))&&r.__esModule?r:{default:r}},125:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return(0,a.useContext)(o.default).scrollToTop};var r,a=n(0),o=(r=n(6))&&r.__esModule?r:{default:r}},126:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(33),u=n.n(o),l=n(11),c=n(2),i=n(4),s=n(3),f=n.n(s),d=n(34),m=n.n(d),b=n(18),p=n(1),v=n.n(p),y=Object(i.css)({backgroundColor:"#FFF",boxShadow:"0 0 10px rgba(0, 0, 0, .2)","& > ul":{display:"flex",listStyleType:"none",margin:0,padding:10,"&:first-child":{paddingBottom:0},"& > li:not(:first-child)":{marginLeft:4}},"& > .badges > li":{alignItems:"center",backgroundColor:"#DDD",borderRadius:5,display:"flex",flex:1,fontFamily:"Arial",fontSize:"50%",justifyContent:"center",padding:"2px 4px",textAlign:"center","&.lit":{backgroundColor:"Red",color:"White"}}}),g=function(){var e=Object(p.useAnimating)(),t=Object(c.a)(e,1)[0],n=Object(p.useAtBottom)(),o=Object(c.a)(n,1)[0],u=Object(p.useAtEnd)(),l=Object(c.a)(u,1)[0],i=Object(p.useAtStart)(),s=Object(c.a)(i,1)[0],d=Object(p.useAtTop)(),m=Object(c.a)(d,1)[0],b=Object(p.useMode)(),v=Object(c.a)(b,1)[0],g=Object(p.useSticky)(),O=Object(c.a)(g,1)[0],h=Object(p.useScrollTo)(),j=Object(p.useScrollToBottom)(),E=Object(p.useScrollToEnd)(),_=Object(p.useScrollToStart)(),k=Object(p.useScrollToTop)(),C=Object(r.useCallback)((function(){return h(100)}),[h]);return a.a.createElement("div",{className:y+""},a.a.createElement("ul",{className:"actions"},a.a.createElement("li",null,a.a.createElement("button",{onClick:j},"Scroll to bottom")),a.a.createElement("li",null,a.a.createElement("button",{onClick:k},"Scroll to top")),a.a.createElement("li",null,a.a.createElement("button",{onClick:_},"Scroll to start")),a.a.createElement("li",null,a.a.createElement("button",{onClick:E},"Scroll to end")),a.a.createElement("li",null,a.a.createElement("button",{onClick:C},"100px"))),a.a.createElement("ul",{className:"badges"},a.a.createElement("li",{className:f()({lit:t})},"ANIMATING"),a.a.createElement("li",{className:f()({lit:o})},"AT BOTTOM"),a.a.createElement("li",{className:f()({lit:l})},"AT END"),a.a.createElement("li",{className:f()({lit:s})},"AT START"),a.a.createElement("li",{className:f()({lit:m})},"AT TOP"),a.a.createElement("li",{className:f()({lit:"top"!==v})},"STICK TO BOTTOM"),a.a.createElement("li",{className:f()({lit:O})},"STICKY")))},O=i.css.keyframes({"0%":{opacity:.2},"100%":{opacity:1}}),h=Object(i.css)({"& > ul.button-bar":{display:"flex",listStyleType:"none",margin:0,padding:0,"& > li:not(:last-child)":{marginRight:10}},"& > .panes":{display:"flex","& > *":{flex:1},"& > *:not(:last-child)":{marginRight:10}}}),j=Object(i.css)({borderColor:"Black",borderStyle:"solid",borderWidth:1,height:400,marginTop:10}),E=Object(i.css)({height:600}),_=Object(i.css)({backgroundColor:"#EEE"}),k=Object(i.css)({paddingLeft:10,paddingRight:10,"&:not(.sticky)":{backgroundColor:"rgba(255, 0, 0, .1)"},"& > p":{animation:"".concat(O," 500ms")}}),C=Object(i.css)({height:300}),S=function(e){return new Array(e).fill().map((function(){return Object(b.loremIpsum)({units:"paragraph"})}))},w=function(){var e=Object(r.useState)(""),t=Object(c.a)(e,2),n=t[0],o=t[1],u=Object(r.useState)(!1),i=Object(c.a)(u,2),s=i[0],d=i[1],y=Object(r.useState)(S(10)),O=Object(c.a)(y,2),w=O[0],T=O[1],M=Object(r.useState)(!1),P=Object(c.a)(M,2),N=P[0],x=P[1],A=Object(r.useCallback)((function(e){return T([].concat(Object(l.a)(w),Object(l.a)(S(e))))}),[w,T]),B=Object(r.useCallback)((function(){return A(1)}),[A]),I=Object(r.useCallback)((function(){return A(10)}),[A]),L=Object(r.useCallback)((function(){return T([].concat(Object(l.a)(w),["Button: "+Object(b.loremIpsum)({units:"words"})]))}),[w,T]),D=Object(r.useCallback)((function(){return T([])}),[T]),R=Object(r.useCallback)((function(e){var t=e.target.checked;return x(t)}),[x]),W=Object(r.useCallback)((function(){return o("large")}),[o]),H=Object(r.useCallback)((function(){return o("")}),[o]),F=Object(r.useCallback)((function(){return o("small")}),[o]),q=Object(r.useCallback)((function(e){var t=e.target.checked;return d(t)}),[]),V=Object(r.useMemo)((function(){return f()(j+"","small"===n?C+"":"large"===n?E+"":"")}),[n]),U=Object(r.useCallback)((function(e){switch(e.keyCode){case 49:return B();case 50:return I();case 51:return D();case 52:return F();case 53:return H();case 54:return W();case 55:return L();case 82:return window.location.reload()}}),[B,I,L,D,W,H,F]);return Object(r.useEffect)((function(){return window.addEventListener("keydown",U),function(){return window.removeEventListener("keydown",U)}}),[U]),a.a.createElement("div",{className:h+""},a.a.createElement("ul",{className:"button-bar"},a.a.createElement("li",null,a.a.createElement("button",{onClick:B},"Add new paragraph")),a.a.createElement("li",null,a.a.createElement("button",{onClick:I},"Add 10 new paragraphs")),a.a.createElement("li",null,a.a.createElement("button",{onClick:D},"Clear")),a.a.createElement("li",null,a.a.createElement("button",{onClick:F},"Small")),a.a.createElement("li",null,a.a.createElement("button",{onClick:H},"Normal")),a.a.createElement("li",null,a.a.createElement("button",{onClick:W},"Large")),a.a.createElement("li",null,a.a.createElement("button",{onClick:L},"Add a button")),a.a.createElement("li",null,a.a.createElement("label",null,a.a.createElement("input",{checked:s,onChange:q,type:"checkbox"}),"Add one every second")),a.a.createElement("li",null,a.a.createElement("label",null,a.a.createElement("input",{checked:N,onChange:R,type:"checkbox"}),"Show command bar"))),a.a.createElement("div",{className:"panes"},a.a.createElement(v.a,{className:V,scrollViewClassName:_+""},N&&a.a.createElement(g,null),a.a.createElement(p.StateContext.Consumer,null,(function(e){var t=e.sticky;return a.a.createElement("div",{className:f()(k+"",{sticky:t})},w.map((function(e){return a.a.createElement("p",{key:e},e.startsWith("Button: ")?a.a.createElement("button",{type:"button"},e.substr(8)):e)})))})),N&&a.a.createElement(g,null)),a.a.createElement(v.a,{className:V,mode:"top"},N&&a.a.createElement(g,null),a.a.createElement(p.StateContext.Consumer,null,(function(e){var t=e.sticky;return a.a.createElement("div",{className:f()(k+"",{sticky:t})},Object(l.a)(w).reverse().map((function(e){return a.a.createElement("p",{key:e},e.startsWith("Button: ")?a.a.createElement("button",{type:"button"},e.substr(8)):e)})))})),N&&a.a.createElement(g,null))),s&&a.a.createElement(m.a,{callback:B,enabled:!0,timeout:1e3}))},T=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function M(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}u.a.render(a.a.createElement(w,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/react-scroll-to-bottom",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/react-scroll-to-bottom","/service-worker.js");T?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):M(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):M(e)}))}}()},24:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(15),a=i(n(17)),o=i(n(9)),u=i(n(0)),l=i(n(28)),c=i(n(29));function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var u,l=e[Symbol.iterator]();!(r=(u=l.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(c){a=!0,o=c}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d=(0,r.css)({backgroundColor:"rgba(0, 0, 0, .2)",borderRadius:10,borderWidth:0,bottom:5,cursor:"pointer",height:20,outline:0,position:"absolute",right:20,width:20,"&:hover":{backgroundColor:"rgba(0, 0, 0, .4)"},"&:active":{backgroundColor:"rgba(0, 0, 0, .6)"}}),m=function(e){var t=e.children,n=e.className,r=s((0,c.default)(),1)[0],o=(0,l.default)();return!r&&u.default.createElement("button",{className:(0,a.default)(d+"",(n||"")+""),onClick:o,type:"button"},t)};m.defaultProps={children:void 0,className:""},m.propTypes={children:o.default.any,className:o.default.string};var b=m;t.default=b},28:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return(0,a.useContext)(o.default).scrollToEnd};var r,a=n(0),o=(r=n(6))&&r.__esModule?r:{default:r}},29:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return[(0,a.useContext)(o.default).sticky]};var r,a=n(0),o=(r=n(5))&&r.__esModule?r:{default:r}},30:function(e,t,n){"use strict";function r(e){return(r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=d(n(9)),o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!==typeof e)return{default:e};var t=f();if(t&&t.has(e))return t.get(e);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var u=a?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(n,o,u):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n(0)),u=d(n(113)),l=d(n(6)),c=d(n(31)),i=d(n(115)),s=d(n(5));function f(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return f=function(){return e},e}function d(e){return e&&e.__esModule?e:{default:e}}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var u,l=e[Symbol.iterator]();!(r=(u=l.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(c){a=!0,o=c}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e){var t=e.mode,n=e.target,r=n.offsetHeight,a=n.scrollHeight,o=n.scrollTop,u=a-o-r<1,l=o<1;return{atBottom:u,atEnd:"top"===t?l:u,atStart:"top"!==t?l:u,atTop:l}}var v=function(e){var t=e.checkInterval,n=e.children,r=e.debounce,a=e.mode;a="top"===a?"top":"bottom";var f=(0,o.useRef)(0),d=m((0,o.useState)("top"===a?0:"100%"),2),b=d[0],v=d[1],y=m((0,o.useState)(0),2),g=y[0],O=y[1],h=m((0,o.useState)(0),2),j=h[0],E=h[1],_=m((0,o.useState)(!1),2),k=_[0],C=_[1],S=m((0,o.useState)(!0),2),w=S[0],T=S[1],M=m((0,o.useState)(!0),2),P=M[0],N=M[1],x=m((0,o.useState)(!0),2),A=x[0],B=x[1],I=m((0,o.useState)(!1),2),L=I[0],D=I[1],R=m((0,o.useState)(!0),2),W=R[0],H=R[1],F=(0,o.useCallback)((function(e){C(!0),v(e)}),[C,v]),q=(0,o.useCallback)((function(){return F("100%")}),[F]),V=(0,o.useCallback)((function(){return F(0)}),[F]),U=(0,o.useCallback)((function(){return"top"===a?V():q()}),[a,q,V]),$=(0,o.useCallback)((function(){return"top"===a?q():V()}),[a,q,V]),J=m((0,o.useState)(null),2),K=J[0],Y=J[1];(0,o.useEffect)((function(){if(W){var e=!1,n=(r=function(){W&&K&&!p({mode:a,target:K}).atEnd?e?Date.now()-e>34&&(!k&&U(),e=!1):e=Date.now():e=!1},o=Math.max(17,t)||17,r(),setInterval(r,o));return function(){return clearInterval(n)}}var r,o}),[k,t,a,U,W,K]);var z=(0,o.useCallback)((function(e){if(!(e.timeStampLow<=f.current)&&K){var t=p({mode:a,target:K}),n=t.atBottom,r=t.atEnd,o=t.atStart,u=t.atTop;T(n),N(r),D(o),B(u);var l=K.offsetHeight,c=K.scrollHeight,i=l!==g,s=c!==j;i&&O(l),s&&E(c),!i&&!s&&H(k||r),null===b&&C(!1)}}),[k,f,a,g,j,b,C,T,N,D,B,O,E,H,K]),G=(0,o.useCallback)((function(){f.current=Date.now(),C(!1),v(null)}),[f,v]),Q=(0,o.useMemo)((function(){return{offsetHeight:g,scrollHeight:j,setTarget:Y}}),[g,j,Y]),X=(0,o.useMemo)((function(){return{animating:k,atBottom:w,atEnd:P,atStart:L,atTop:A,mode:a,sticky:W}}),[k,w,P,L,A,a,W]),Z=(0,o.useMemo)((function(){return{scrollTo:F,scrollToBottom:q,scrollToEnd:U,scrollToStart:$,scrollToTop:V}}),[F,q,U,$,V]);return(0,o.useEffect)((function(){if(K){var e=function(){return E(K.scrollHeight)};return K.addEventListener("focus",e,{capture:!0,passive:!0}),function(){return K.removeEventListener("focus",e)}}}),[K]),o.default.createElement(c.default.Provider,{value:Q},o.default.createElement(l.default.Provider,{value:Z},o.default.createElement(s.default.Provider,{value:X},n,K&&o.default.createElement(u.default,{debounce:r,name:"scroll",onEvent:z,target:K}),K&&null!==b&&o.default.createElement(i.default,{name:"scrollTop",onEnd:G,target:K,value:b}))))};v.defaultProps={checkInterval:100,children:void 0,debounce:17,mode:void 0},v.propTypes={checkInterval:a.default.number,children:a.default.any,debounce:a.default.number,mode:a.default.oneOf(["bottom","top"])};var y=v;t.default=y},31:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=((r=n(0))&&r.__esModule?r:{default:r}).default.createContext({offsetHeight:0,scrollHeight:0,setTarget:function(){return 0}});a.displayName="ScrollToBottomInternalContext";var o=a;t.default=o},32:function(e,t,n){"use strict";function r(e){return(r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(15),o=s(n(17)),u=s(n(9)),l=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var u=a?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(n,o,u):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n(0)),c=s(n(31));function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function s(e){return e&&e.__esModule?e:{default:e}}var f=(0,a.css)({height:"100%",overflowY:"auto",width:"100%"}),d=function(e){var t=e.children,n=e.className,r=(0,l.useContext)(c.default).setTarget;return l.default.createElement("div",{className:(0,o.default)(f+"",(n||"")+""),ref:r},t)};d.defaultProps={children:void 0,className:void 0},d.propTypes={children:u.default.any,className:u.default.string};var m=d;t.default=m},35:function(e,t,n){e.exports=n(126)},5:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=((r=n(0))&&r.__esModule?r:{default:r}).default.createContext({animating:!1,atBottom:!0,atEnd:!0,atTop:!0,mode:"bottom",sticky:!0});a.displayName="ScrollToBottomStateContext";var o=a;t.default=o},6:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=((r=n(0))&&r.__esModule?r:{default:r}).default.createContext({scrollTo:function(){return 0},scrollToBottom:function(){return 0},scrollToEnd:function(){return 0},scrollToStart:function(){return 0},scrollToTop:function(){return 0}});a.displayName="ScrollToBottomFunctionContext";var o=a;t.default=o}},[[35,1,2]]]);
//# sourceMappingURL=main.1b98965b.chunk.js.map