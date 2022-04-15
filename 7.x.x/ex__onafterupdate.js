(()=>{"use strict";var e,t={"./examples/ex__onafterupdate.js":(e,t,n)=>{var o=n("./node_modules/three/build/three.module.js"),r=n("./node_modules/three/examples/jsm/webxr/VRButton.js"),i=n("./node_modules/three/examples/jsm/controls/OrbitControls.js"),a=n("./node_modules/three/examples/jsm/geometries/BoxLineGeometry.js"),s=n("./src/three-mesh-ui.js"),d=n("./examples/assets/Roboto-msdf.json");const l=n.p+"5a41f46a5020bc8f41ff554d0d890ad3.png",c=window.innerWidth,u=window.innerHeight;let p,f,h,m;function w(){s.ZP.update(),m.update(),h.render(p,f)}window.addEventListener("load",(function(){p=new o.xsS,p.background=new o.Ilk(5263440),f=new o.cPb(60,c/u,.1,100),h=new o.CP7({antialias:!0}),h.setPixelRatio(window.devicePixelRatio),h.setSize(c,u),h.xr.enabled=!0,document.body.appendChild(r.N.createButton(h)),document.body.appendChild(h.domElement),m=new i.z(f,h.domElement),f.position.set(0,1.6,0),m.target=new o.Pa4(0,1,-1.8),m.update();const e=new o.ejS(new a.d(6,6,6,10,10,10).translate(0,3,0),new o.nls({color:8421504}));p.add(e),function(){let e=0;const t=new s.ZP.Block({width:1.2,height:.5,justifyContent:"center",fontFamily:d,fontTexture:l});t.position.set(0,1,-1.8),t.rotation.x=-.55,p.add(t),t.onAfterUpdate=function(){this.frame.layers.set(e%2)};const n=new s.ZP.Text({content:"onAfterUpdate get called after any update.\n\n",fontSize:.055}),o=new s.ZP.Text({content:"0",fontSize:.08});t.add(n,o),setInterval((()=>{e++,o.set({content:String(e)})}),500)}(),h.setAnimationLoop(w)})),window.addEventListener("resize",(function(){f.aspect=window.innerWidth/window.innerHeight,f.updateProjectionMatrix(),h.setSize(window.innerWidth,window.innerHeight)}))}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,n,r,i)=>{if(!n){var a=1/0;for(c=0;c<e.length;c++){for(var[n,r,i]=e[c],s=!0,d=0;d<n.length;d++)(!1&i||a>=i)&&Object.keys(o.O).every((e=>o.O[e](n[d])))?n.splice(d--,1):(s=!1,i<a&&(a=i));if(s){e.splice(c--,1);var l=r();void 0!==l&&(t=l)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[n,r,i]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j="ex__onafterupdate",(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={ex__onafterupdate:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[a,s,d]=n,l=0;if(a.some((t=>0!==e[t]))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(d)var c=d(o)}for(t&&t(n);l<a.length;l++)i=a[l],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(c)},n=self.webpackChunkthree_mesh_ui=self.webpackChunkthree_mesh_ui||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,["chunk_imported-assets","chunk_three-mesh-ui","chunk_vendors"],(()=>o("./examples/ex__onafterupdate.js")));r=o.O(r)})();