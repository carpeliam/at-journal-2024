"use strict";(self.webpackChunkat_2024_day_by_day=self.webpackChunkat_2024_day_by_day||[]).push([[691],{3204:function(e){const t=/[\p{Lu}]/u,n=/[\p{Ll}]/u,r=/^[\p{Lu}](?![\p{Lu}])/gu,a=/([\p{Alpha}\p{N}_]|$)/u,i=/[_.\- ]+/,s=new RegExp("^"+i.source),o=new RegExp(i.source+a.source,"gu"),l=new RegExp("\\d+"+a.source,"gu"),c=(e,a)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(a={pascalCase:!1,preserveConsecutiveUppercase:!1,...a},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const i=!1===a.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(a.locale),c=!1===a.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(a.locale);if(1===e.length)return a.pascalCase?c(e):i(e);return e!==i(e)&&(e=((e,r,a)=>{let i=!1,s=!1,o=!1;for(let l=0;l<e.length;l++){const c=e[l];i&&t.test(c)?(e=e.slice(0,l)+"-"+e.slice(l),i=!1,o=s,s=!0,l++):s&&o&&n.test(c)?(e=e.slice(0,l-1)+"-"+e.slice(l-1),o=s,s=!1,i=!0):(i=r(c)===c&&a(c)!==c,o=s,s=a(c)===c&&r(c)!==c)}return e})(e,i,c)),e=e.replace(s,""),e=a.preserveConsecutiveUppercase?((e,t)=>(r.lastIndex=0,e.replace(r,(e=>t(e)))))(e,i):i(e),a.pascalCase&&(e=c(e.charAt(0))+e.slice(1)),((e,t)=>(o.lastIndex=0,l.lastIndex=0,e.replace(o,((e,n)=>t(n))).replace(l,(e=>t(e)))))(e,c)};e.exports=c,e.exports.default=c},8032:function(e,t,n){n.d(t,{L:function(){return g},M:function(){return x},P:function(){return E},S:function(){return q},_:function(){return o},a:function(){return s},b:function(){return u},g:function(){return d},h:function(){return l}});var r=n(7294),a=(n(3204),n(5697)),i=n.n(a);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(a[n]=e[n]);return a}const l=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;function c(e,t,n){const r={};let a="gatsby-image-wrapper";return"fixed"===n?(r.width=e,r.height=t):"constrained"===n&&(a="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:a,"data-gatsby-image-wrapper":"",style:r}}function u(e,t,n,r,a){return void 0===a&&(a={}),s({},n,{loading:r,shouldLoad:e,"data-main-image":"",style:s({},a,{opacity:t?1:0})})}function d(e,t,n,r,a,i,o,l){const c={};i&&(c.backgroundColor=i,"fixed"===n?(c.width=r,c.height=a,c.backgroundColor=i,c.position="relative"):("constrained"===n||"fullWidth"===n)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),o&&(c.objectFit=o),l&&(c.objectPosition=l);const u=s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return u}const p=["children"],f=function(e){let{layout:t,width:n,height:a}=e;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:a/n*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:n,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:`data:image/svg+xml;charset=utf-8,%3Csvg%20height='${a}'%20width='${n}'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E`,style:{maxWidth:"100%",display:"block",position:"static"}})):null},g=function(e){let{children:t}=e,n=o(e,p);return r.createElement(r.Fragment,null,r.createElement(f,s({},n)),t,null)},m=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],y=function(e){let{src:t,srcSet:n,loading:a,alt:i="",shouldLoad:l}=e,c=o(e,m);return r.createElement("img",s({},c,{decoding:"async",loading:a,src:l?t:void 0,"data-src":l?void 0:t,srcSet:l?n:void 0,"data-srcset":l?void 0:n,alt:i}))},b=function(e){let{fallback:t,sources:n=[],shouldLoad:a=!0}=e,i=o(e,h);const l=i.sizes||(null==t?void 0:t.sizes),c=r.createElement(y,s({},i,t,{sizes:l,shouldLoad:a}));return n.length?r.createElement("picture",null,n.map((e=>{let{media:t,srcSet:n,type:i}=e;return r.createElement("source",{key:`${t}-${i}-${n}`,type:i,media:t,srcSet:a?n:void 0,"data-srcset":a?void 0:n,sizes:l})})),c):c};var v;y.propTypes={src:a.string.isRequired,alt:a.string.isRequired,sizes:a.string,srcSet:a.string,shouldLoad:a.bool},b.displayName="Picture",b.propTypes={alt:a.string.isRequired,shouldLoad:a.bool,fallback:a.exact({src:a.string.isRequired,srcSet:a.string,sizes:a.string}),sources:a.arrayOf(a.oneOfType([a.exact({media:a.string.isRequired,type:a.string,sizes:a.string,srcSet:a.string.isRequired}),a.exact({media:a.string,type:a.string.isRequired,sizes:a.string,srcSet:a.string.isRequired})]))};const w=["fallback"],E=function(e){let{fallback:t}=e,n=o(e,w);return t?r.createElement(b,s({},n,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",s({},n))};E.displayName="Placeholder",E.propTypes={fallback:a.string,sources:null==(v=b.propTypes)?void 0:v.sources,alt:function(e,t,n){return e[t]?new Error(`Invalid prop \`${t}\` supplied to \`${n}\`. Validation failed.`):null}};const x=function(e){return r.createElement(r.Fragment,null,r.createElement(b,s({},e)),r.createElement("noscript",null,r.createElement(b,s({},e,{shouldLoad:!0}))))};x.displayName="MainImage",x.propTypes=b.propTypes;const C=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],k=["style","className"],S=e=>e.replace(/\n/g,""),L=function(e,t,n){for(var r=arguments.length,a=new Array(r>3?r-3:0),s=3;s<r;s++)a[s-3]=arguments[s];return e.alt||""===e.alt?i().string.apply(i(),[e,t,n].concat(a)):new Error(`The "alt" prop is required in ${n}. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html`)},O={image:i().object.isRequired,alt:L},j=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],I=["style","className"],R=new Set;let z,N;const T=function(e){let{as:t="div",image:a,style:i,backgroundColor:u,className:d,class:p,onStartLoad:f,onLoad:g,onError:m}=e,h=o(e,j);const{width:y,height:b,layout:v}=a,w=c(y,b,v),{style:E,className:x}=w,C=o(w,I),k=(0,r.useRef)(),S=(0,r.useMemo)((()=>JSON.stringify(a.images)),[a.images]);p&&(d=p);const L=function(e,t,n){let r="";return"fullWidth"===e&&(r=`<div aria-hidden="true" style="padding-top: ${n/t*100}%;"></div>`),"constrained"===e&&(r=`<div style="max-width: ${t}px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height='${n}'%20width='${t}'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E" style="max-width: 100%; display: block; position: static;"></div>`),r}(v,y,b);return(0,r.useEffect)((()=>{z||(z=n.e(731).then(n.bind(n,6731)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:n}=e;return N=t,{renderImageToString:t,swapPlaceholderImage:n}})));const e=k.current.querySelector("[data-gatsby-image-ssr]");if(e&&l())return e.complete?(null==f||f({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==f||f({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void R.add(S);if(N&&R.has(S))return;let t,r;return z.then((e=>{let{renderImageToString:n,swapPlaceholderImage:o}=e;k.current&&(k.current.innerHTML=n(s({isLoading:!0,isLoaded:R.has(S),image:a},h)),R.has(S)||(t=requestAnimationFrame((()=>{k.current&&(r=o(k.current,S,R,i,f,g,m))}))))})),()=>{t&&cancelAnimationFrame(t),r&&r()}}),[a]),(0,r.useLayoutEffect)((()=>{R.has(S)&&N&&(k.current.innerHTML=N(s({isLoading:R.has(S),isLoaded:R.has(S),image:a},h)),null==f||f({wasCached:!0}),null==g||g({wasCached:!0}))}),[a]),(0,r.createElement)(t,s({},C,{style:s({},E,i,{backgroundColor:u}),className:`${x}${d?` ${d}`:""}`,ref:k,dangerouslySetInnerHTML:{__html:L},suppressHydrationWarning:!0}))},_=(0,r.memo)((function(e){return e.image?(0,r.createElement)(T,e):null}));_.propTypes=O,_.displayName="GatsbyImage";const A=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function M(e){return function(t){let{src:n,__imageData:a,__error:i}=t,l=o(t,A);return i&&console.warn(i),a?r.createElement(e,s({image:a},l)):(console.warn("Image not loaded",n),null)}}const $=M((function(e){let{as:t="div",className:n,class:a,style:i,image:l,loading:p="lazy",imgClassName:f,imgStyle:m,backgroundColor:h,objectFit:y,objectPosition:b}=e,v=o(e,C);if(!l)return console.warn("[gatsby-plugin-image] Missing image prop"),null;a&&(n=a),m=s({objectFit:y,objectPosition:b,backgroundColor:h},m);const{width:w,height:L,layout:O,images:j,placeholder:I,backgroundColor:R}=l,z=c(w,L,O),{style:N,className:T}=z,_=o(z,k),A={fallback:void 0,sources:[]};return j.fallback&&(A.fallback=s({},j.fallback,{srcSet:j.fallback.srcSet?S(j.fallback.srcSet):void 0})),j.sources&&(A.sources=j.sources.map((e=>s({},e,{srcSet:S(e.srcSet)})))),r.createElement(t,s({},_,{style:s({},N,i,{backgroundColor:h}),className:`${T}${n?` ${n}`:""}`}),r.createElement(g,{layout:O,width:w,height:L},r.createElement(E,s({},d(I,!1,O,w,L,R,y,b))),r.createElement(x,s({"data-gatsby-image-ssr":"",className:f},v,u("eager"===p,!1,A,p,m)))))})),V=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(r)):new Error(`"${t}" ${e[t]} may not be passed when layout is fullWidth.`)},P=new Set(["fixed","fullWidth","constrained"]),W={src:i().string.isRequired,alt:L,width:V,height:V,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!P.has(e.layout))return new Error(`Invalid value ${e.layout}" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".`)}};$.displayName="StaticImage",$.propTypes=W;const q=M(_);q.displayName="StaticImage",q.propTypes=W},5480:function(e,t,n){n.r(t),n.d(t,{Head:function(){return q},default:function(){return W}});var r=n(7294),a=n(8032);const i=1;function s(e,t){return Object.freeze({...e,...t})}const o=(0,r.createContext)(null),l=o.Provider;function c(){const e=(0,r.useContext)(o);if(null==e)throw new Error("No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>");return e}function u(){return c().map}n(3935);function d(e,t,n){return Object.freeze({instance:e,context:t,container:n})}function p(e,t){return null==t?function(t,n){const a=(0,r.useRef)();return a.current||(a.current=e(t,n)),a}:function(n,a){const i=(0,r.useRef)();i.current||(i.current=e(n,a));const s=(0,r.useRef)(n),{instance:o}=i.current;return(0,r.useEffect)((function(){s.current!==n&&(t(o,n,s.current),s.current=n)}),[o,n,a]),i}}function f(e,t){const n=(0,r.useRef)();(0,r.useEffect)((function(){return null!=t&&e.instance.on(t),n.current=t,function(){null!=n.current&&e.instance.off(n.current),n.current=null}}),[e,t])}function g(e,t){const n=e.pane??t.pane;return n?{...e,pane:n}:e}function m(e,t){(0,r.useEffect)((function(){return(t.layerContainer??t.map).addLayer(e.instance),function(){t.layerContainer?.removeLayer(e.instance),t.map.removeLayer(e.instance)}}),[t,e])}function h(e){return function(t){const n=c(),a=e(g(t,n),n);return function(e,t){const n=(0,r.useRef)(t);(0,r.useEffect)((function(){t!==n.current&&null!=e.attributionControl&&(null!=n.current&&e.attributionControl.removeAttribution(n.current),null!=t&&e.attributionControl.addAttribution(t)),n.current=t}),[e,t])}(n.map,t.attribution),f(a.current,t.eventHandlers),m(a.current,n),a}}function y(e){return function(t){const n=c(),a=e(g(t,n),n);return f(a.current,t.eventHandlers),m(a.current,n),function(e,t){const n=(0,r.useRef)();(0,r.useEffect)((function(){if(t.pathOptions!==n.current){const r=t.pathOptions??{};e.instance.setStyle(r),n.current=r}}),[e,t])}(a.current,t),a}}function b(e,t){return function(e){function t(t,n){const{instance:a,context:i}=e(t).current;return(0,r.useImperativeHandle)(n,(()=>a)),null==t.children?null:r.createElement(l,{value:i},t.children)}return(0,r.forwardRef)(t)}(y(p(e,t)))}var v=n(5243);const w=b((function({data:e,...t},n){const r=new v.GeoJSON(e,t);return d(r,s(n,{overlayContainer:r}))}),(function(e,t,n){t.style!==n.style&&(null==t.style?e.resetStyle():e.setStyle(t.style))}));const E=b((function({center:e,children:t,...n},r){const a=new v.Circle(e,n);return d(a,s(r,{overlayContainer:a}))}),(function(e,t,n){t.center!==n.center&&e.setLatLng(t.center),null!=t.radius&&t.radius!==n.radius&&e.setRadius(t.radius)}));function x(){return x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},x.apply(this,arguments)}function C({bounds:e,boundsOptions:t,center:n,children:a,className:s,id:o,placeholder:c,style:u,whenReady:d,zoom:p,...f},g){const[m]=(0,r.useState)({className:s,id:o,style:u}),[h,y]=(0,r.useState)(null);(0,r.useImperativeHandle)(g,(()=>h?.map??null),[h]);const b=(0,r.useCallback)((r=>{if(null!==r&&null===h){const a=new v.Map(r,f);null!=n&&null!=p?a.setView(n,p):null!=e&&a.fitBounds(e,t),null!=d&&a.whenReady(d),y(function(e){return Object.freeze({__version:i,map:e})}(a))}}),[]);(0,r.useEffect)((()=>()=>{h?.map.remove()}),[h]);const w=h?r.createElement(l,{value:h},a):c??null;return r.createElement("div",x({},m,{ref:b}),w)}const k=(0,r.forwardRef)(C);const S=function(e){function t(t,n){const{instance:a}=e(t).current;return(0,r.useImperativeHandle)(n,(()=>a)),null}return(0,r.forwardRef)(t)}(h(p((function({url:e,...t},n){return d(new v.TileLayer(e,g(t,n)),n)}),(function(e,t,n){!function(e,t,n){const{opacity:r,zIndex:a}=t;null!=r&&r!==n.opacity&&e.setOpacity(r),null!=a&&a!==n.zIndex&&e.setZIndex(a)}(e,t,n);const{url:r}=t;null!=r&&r!==n.url&&e.setUrl(r)}))));var L=Object.defineProperty,O=(e,t,n)=>((e,t,n)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n),j=new Map,I=new WeakMap,R=0,z=void 0;function N(e){return Object.keys(e).sort().filter((t=>void 0!==e[t])).map((t=>{return`${t}_${"root"===t?(n=e.root,n?(I.has(n)||(R+=1,I.set(n,R.toString())),I.get(n)):"0"):e[t]}`;var n})).toString()}function T(e,t,n={},r=z){if(void 0===window.IntersectionObserver&&void 0!==r){const a=e.getBoundingClientRect();return t(r,{isIntersecting:r,target:e,intersectionRatio:"number"==typeof n.threshold?n.threshold:0,time:0,boundingClientRect:a,intersectionRect:a,rootBounds:a}),()=>{}}const{id:a,observer:i,elements:s}=function(e){const t=N(e);let n=j.get(t);if(!n){const r=new Map;let a;const i=new IntersectionObserver((t=>{t.forEach((t=>{var n;const i=t.isIntersecting&&a.some((e=>t.intersectionRatio>=e));e.trackVisibility&&void 0===t.isVisible&&(t.isVisible=i),null==(n=r.get(t.target))||n.forEach((e=>{e(i,t)}))}))}),e);a=i.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),n={id:t,observer:i,elements:r},j.set(t,n)}return n}(n),o=s.get(e)||[];return s.has(e)||s.set(e,o),o.push(t),i.observe(e),function(){o.splice(o.indexOf(t),1),0===o.length&&(s.delete(e),i.unobserve(e)),0===s.size&&(i.disconnect(),j.delete(a))}}r.Component;function _({threshold:e,delay:t,trackVisibility:n,rootMargin:a,root:i,triggerOnce:s,skip:o,initialInView:l,fallbackInView:c,onChange:u}={}){var d;const[p,f]=r.useState(null),g=r.useRef(u),[m,h]=r.useState({inView:!!l,entry:void 0});g.current=u,r.useEffect((()=>{if(o||!p)return;let r;return r=T(p,((e,t)=>{h({inView:e,entry:t}),g.current&&g.current(e,t),t.isIntersecting&&s&&r&&(r(),r=void 0)}),{root:i,rootMargin:a,threshold:e,trackVisibility:n,delay:t},c),()=>{r&&r()}}),[Array.isArray(e)?e.toString():e,p,i,a,s,o,n,c,t]);const y=null==(d=m.entry)?void 0:d.target,b=r.useRef(void 0);p||!y||s||o||b.current===y||(b.current=y,h({inView:!!l,entry:void 0}));const v=[f,m.inView,m.entry];return v.ref=v[0],v.inView=v[1],v.entry=v[2],v}const A=(0,r.createContext)({activeEntry:null,setActiveEntry:null});function M(e){var t,n;let{publicURL:a,name:i}=e;const{activeEntry:s}=(0,r.useContext)(A),{0:o,1:l}=(0,r.useState)(),c=u(),d=i.startsWith(s)&&"hiking"===(null==o||null===(t=o.features[0])||void 0===t||null===(n=t.properties)||void 0===n?void 0:n.activityType),p=d?"#228B22":"gray";if(o&&d){const e=new v.LatLngBounds([o.bbox[1],o.bbox[0]],[o.bbox[3],o.bbox[2]]);c.flyToBounds(e,{duration:1})}(0,r.useEffect)((()=>{fetch(a).then((e=>e.json())).then(l)}),[]);return o&&r.createElement(r.Fragment,null,r.createElement(w,{data:o,style:{color:p},eventHandlers:{click:e=>{document.getElementById(i.split("_")[0]).scrollIntoView(!0)}}}),d&&r.createElement(r.Fragment,null,r.createElement(E,{center:(f=o.features[0].geometry.coordinates,[f[0][1],f[0][0]]),radius:75,color:p,pathOptions:{fillOpacity:.9}}),r.createElement(E,{center:(e=>{const t=e[e.length-1];return[t[1],t[0]]})(o.features[0].geometry.coordinates),radius:75,color:"black",pathOptions:{fillOpacity:.5}})));var f}function $(e){let{metadata:t}=e;const{setActiveEntry:i}=(0,r.useContext)(A),{ref:s}=_({threshold:0,rootMargin:"0px 0px -96% 0px",onChange:(e,t)=>{t.isIntersecting&&i(null)}});return r.createElement("header",{className:"mb-12",ref:s},r.createElement("div",{style:{display:"grid"}},r.createElement(a.S,{src:"../images/trail-with-blaze.jpeg",alt:"My tent on the trail",style:{gridArea:"1/1"},layout:"fullWidth",aspectRatio:2,__imageData:n(1331)}),r.createElement("div",{className:"relative grid place-items-center",style:{gridArea:"1/1"}},r.createElement("h1",{className:"text-center lg:text-5xl text-gray-100"},t.title))),t.description)}function V(e){let{fields:t,frontmatter:n,html:a,excerpt:i}=e;const{setActiveEntry:s}=(0,r.useContext)(A),{ref:o}=_({threshold:0,rootMargin:"0px 0px -96% 0px",onChange:(e,t)=>{t.isIntersecting&&s(n.date.split("T")[0])}}),l=n.date.split("T")[0];return r.createElement("article",{key:t.slug,ref:o},r.createElement("h3",{style:{margin:0},id:l},n.title),r.createElement("small",null,n.date),r.createElement("div",null,n.miles," miles"),r.createElement("div",{dangerouslySetInnerHTML:{__html:a}},i))}function P(){const{activeEntry:e}=(0,r.useContext)(A),t=u();return null===e&&t.flyTo([39.717330464,-77.503664652],5,{duration:.75}),!1}var W=function(e){let{data:t}=e;const n=t.allFile.edges.map((e=>{let{node:t}=e;return r.createElement(M,Object.assign({key:t.name},t))})),{0:a,1:i}=(0,r.useState)();return r.createElement("main",null,r.createElement(A.Provider,{value:{activeEntry:a,setActiveEntry:i}},r.createElement("div",{style:{position:"fixed"}},r.createElement(k,{style:{height:"100vh",width:425},center:[39.717330464,-77.503664652],zoom:5,scrollWheelZoom:!1},r.createElement(P,null),r.createElement(S,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),n)),r.createElement("div",{style:{marginLeft:425,padding:10}},r.createElement($,{metadata:t.site.siteMetadata}),t.allMarkdownRemark.edges.map((e=>{let{node:t}=e;return r.createElement(V,Object.assign({key:t.fields.slug},t))})))))};const q=e=>{let{data:t}=e;return r.createElement("title",null,t.site.siteMetadata.title)}},1331:function(e){e.exports=JSON.parse('{"layout":"fullWidth","backgroundColor":"#081818","images":{"fallback":{"src":"/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/dac54/trail-with-blaze.jpg","srcSet":"/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/5f965/trail-with-blaze.jpg 750w,\\n/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/76f9a/trail-with-blaze.jpg 1080w,\\n/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/54fb8/trail-with-blaze.jpg 1366w,\\n/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/dac54/trail-with-blaze.jpg 1920w","sizes":"100vw"},"sources":[{"srcSet":"/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/ee7ce/trail-with-blaze.webp 750w,\\n/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/819dc/trail-with-blaze.webp 1080w,\\n/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/7b8ce/trail-with-blaze.webp 1366w,\\n/gpx-journal/static/4ffdc797981558ab8314535f96eaae53/e0a47/trail-with-blaze.webp 1920w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":0.5}')}}]);
//# sourceMappingURL=component---src-pages-index-tsx-2b7d8b600648e44a20fd.js.map