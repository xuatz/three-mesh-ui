(()=>{"use strict";var e,t={"./examples/api__hidden_overflow.js":(e,t,n)=>{var o=n("./node_modules/three/build/three.module.js"),i=n("./node_modules/three/examples/jsm/webxr/VRButton.js"),r=n("./node_modules/three/examples/jsm/controls/OrbitControls.js"),d=n("./node_modules/three/examples/jsm/geometries/BoxLineGeometry.js"),a=n("./src/three-mesh-ui.js"),s=n("./examples/assets/Roboto-msdf.json");const l=n.p+"5a41f46a5020bc8f41ff554d0d890ad3.png",c=window.innerWidth,u=window.innerHeight;let p,h,w,f,m,b;function g(){const e=.25*Math.sin(Date.now()/2e3),t=.25*Math.cos(Date.now()/2e3);m.position.x=e,m.position.y=t+.85,b.position.x=.6*e,b.position.y=.6*t,a.ZP.update(),f.update(),w.render(p,h)}window.addEventListener("load",(function(){p=new o.xsS,p.background=new o.Ilk(5263440),h=new o.cPb(60,c/u,.1,100),h.position.set(0,1.6,0),h.lookAt(0,1,-1.8),w=new o.CP7({antialias:!0}),w.localClippingEnabled=!0,w.setPixelRatio(window.devicePixelRatio),w.setSize(c,u),w.xr.enabled=!0,document.body.appendChild(i.N.createButton(w)),document.body.appendChild(w.domElement),f=new r.z(h,w.domElement),h.position.set(0,1.6,0),f.target=new o.Pa4(0,1,-1.8),f.update();const e=new o.ejS(new d.d(6,6,6,10,10,10).translate(0,3,0),new o.nls({color:8421504}));p.add(e),function(){const e=new a.ZP.Block({height:.2,width:1.2,fontSize:.09,justifyContent:"center",fontFamily:s,fontTexture:l,backgroundColor:new o.Ilk("blue"),backgroundOpacity:.2}).add(new a.ZP.Text({content:"hiddenOverflow attribute :"}));e.position.set(0,1.8,-2),p.add(e),m=new a.ZP.Block({height:.7,width:.6,padding:.05,justifyContent:"center",backgroundOpacity:1,backgroundColor:new o.Ilk("grey")}),m.setupState({state:"hidden-on",attributes:{hiddenOverflow:!0}}),m.setupState({state:"hidden-off",attributes:{hiddenOverflow:!1}}),m.setState("hidden-on"),m.position.set(0,1,-1.8),m.rotation.x=-.55,p.add(m),b=new a.ZP.Block({width:1,height:1,padding:.09,backgroundColor:new o.Ilk("blue"),backgroundOpacity:.2,justifyContent:"center"}),m.add(b);const t=new a.ZP.Text({content:"hiddenOverflow ".repeat(28),fontSize:.054,fontFamily:s,fontTexture:l});b.add(t),setInterval((()=>{"hidden-on"===m.currentState?m.setState("hidden-off"):m.setState("hidden-on")}),1500)}(),w.setAnimationLoop(g)})),window.addEventListener("resize",(function(){h.aspect=window.innerWidth/window.innerHeight,h.updateProjectionMatrix(),w.setSize(window.innerWidth,window.innerHeight)}))}},n={};function o(e){var i=n[e];if(void 0!==i)return i.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.m=t,e=[],o.O=(t,n,i,r)=>{if(!n){var d=1/0;for(c=0;c<e.length;c++){for(var[n,i,r]=e[c],a=!0,s=0;s<n.length;s++)(!1&r||d>=r)&&Object.keys(o.O).every((e=>o.O[e](n[s])))?n.splice(s--,1):(a=!1,r<d&&(d=r));if(a){e.splice(c--,1);var l=i();void 0!==l&&(t=l)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[n,i,r]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j="api__hidden_overflow",(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={api__hidden_overflow:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var i,r,[d,a,s]=n,l=0;if(d.some((t=>0!==e[t]))){for(i in a)o.o(a,i)&&(o.m[i]=a[i]);if(s)var c=s(o)}for(t&&t(n);l<d.length;l++)r=d[l],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(c)},n=self.webpackChunkthree_mesh_ui=self.webpackChunkthree_mesh_ui||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var i=o.O(void 0,["chunk_imported-assets","chunk_three-mesh-ui","chunk_vendors"],(()=>o("./examples/api__hidden_overflow.js")));i=o.O(i)})();