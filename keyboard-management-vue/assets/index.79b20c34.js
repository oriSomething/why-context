var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,r=Object.getOwnPropertySymbols,s=Object.prototype.propertyIsEnumerable,a=(t,r,s)=>(((t,r,s)=>{r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[r]=s})(t,"symbol"!=typeof r?r+"":r,s),s);import{u as o,r as n,i,p as c,c as l,o as u,a as d,b as h,d as p,e as f,f as m,w as y,g as v,t as b,h as w,j as _,k,l as g,F,m as K,n as L}from"./vendor.7ad75b2f.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(r){const s=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((r,o)=>{const n=new URL(e,s);if(self[t].moduleMap[n])return r(self[t].moduleMap[n]);const i=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){o(new Error(`Failed to import: ${e}`)),a(c)},onload(){r(self[t].moduleMap[n]),a(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/");const O=0;class j{constructor(e,t){a(this,"data"),this.id=e,this.type=t}}class D{constructor(e){a(this,"parent",null),a(this,"children",[]),this.data=e}remove(){if(null==this.parent)return;const e=this.parent.children.indexOf(this);-1!==e&&this.parent.children.splice(e,1)}addChild(e){const t=new D(e);return t.parent=this,this.children.push(t),t}findLeaf(e){for(let t=this.children.length-1;t>=0;t--){const r=this.children[t].findLeaf(e);if(void 0!==r)return r}if(e(this.data))return this}flatData(){const e=[];for(let t=this.children.length-1;t>=0;t--){const r=this.children[t];e.push(...r.flatData())}return e.push(this.data),e}}function x(e,t){if(0===t.length)return e;const[r,...s]=t;for(let a of e.children)if(a.data.id===r)return x(a,s)}function C(e,t){return(e.key.toLowerCase()===t.key.toLowerCase()||e.code.toLowerCase()===t.key.toLowerCase())&&e.altKey===(t.altKey||!1)&&e.ctrlKey===(t.ctrlKey||!1)&&e.shiftKey===(t.shiftKey||!1)&&e.metaKey===(t.metaKey||!1)}let R=0;const M=new class{constructor(){a(this,"_onKeyDown",(e=>{if(e.defaultPrevented)return;if(e.repeat)return;if(e.isComposing)return;if(!(e instanceof KeyboardEvent))return;const t=this._currentRoot.flatData().flatMap((e=>e.data));for(const r of t)if(C(e,r)){r.callback();break}})),this._root=new D(new j(-1,O)),this._root.data.data=[],window.addEventListener("keydown",this._onKeyDown)}get _currentRoot(){return this._root.findLeaf((e=>e.type===O))}register(e,t,r){return x(this._root,e).addChild(new j(t,r))}},U={expose:[],inheritAttrs:!1,setup(e){const a=++R,{attrs:f}=o(),{type:m="global"}=f,y=n(),{path:v,register:b}=i("keyboard-management",{path:[],register:(e,t,r)=>M.register(e,t,r)});c("keyboard-management",{path:[...v,a],register:(e,t,r)=>(void 0===y.value&&(y.value=b(v,a,m)),b(e,t,r))});const w=l((()=>{const{type:e}=f;return((e,a)=>{var o={};for(var n in e)t.call(e,n)&&a.indexOf(n)<0&&(o[n]=e[n]);if(null!=e&&r)for(var n of r(e))a.indexOf(n)<0&&s.call(e,n)&&(o[n]=e[n]);return o})(f,["type"])}));function _(){void 0===y.value&&(y.value=b(v,a,m));const e=[];for(let[t,r]of Object.entries(w.value))e.push({key:t.slice(2),callback:r});y.value.data.data=e}return u(_),d(_),h((()=>{void 0!==y.value&&(y.value.data.data=[],y.value.remove(),y.value=void 0)})),(e,t)=>p(e.$slots,"default")}};const A={class:"FrameKey__kbd"},E={expose:[],inheritAttrs:!1,setup(e){const{shortcut:t,shortcutDisplay:r=t,description:s,inverse:a=!1}=o().attrs;return(e,o)=>(f(),m(U,{[_(w(t))]:o[1]||(o[1]=t=>e.$emit("shortcut"))},{default:y((()=>[v("div",{class:{FrameKey:!0,"FrameKey--inverse":w(a)}},[v("kbd",A,b(w(r).toUpperCase()),1),v("span",null,b(w(s)),1)],2)])),_:1},16))}};const $={},P={class:"FrameKeyEmpty"};$.render=function(e,t){return f(),m("div",P)};const S={class:"Frame"},B={expose:[],inheritAttrs:!1,setup(e){const t="xcvbnm,.".split(""),{onDelete:r}=o().attrs,s=n(!1),a=n(1),i=l((()=>Array.from(Array(a.value),((e,r)=>({description:3===r?"For new empty":"For new shortcut",shortcut:t[r]}))).slice(0,2)));return(e,t)=>{const o=k("Frame",!0);return f(),m(U,{type:"root"},{default:y((()=>[v("div",S,[v("div",{class:{Frame__content:!0,"Frame__content--hasFrame":s.value}},[w(r)?(f(),m(E,{key:0,inverse:"true",shortcut:"Backspace",shortcutDisplay:"⌫",description:"Delete",onShortcut:t[1]||(t[1]=e=>w(r)())})):g("",!0),v(E,{shortcut:"z",description:"For new root",onShortcut:t[2]||(t[2]=e=>s.value=!0)}),(f(!0),m(F,null,K(w(i),(e=>(f(),m(E,{key:e.shortcut,description:e.description,shortcut:e.shortcut,onShortcut:t[3]||(t[3]=e=>a.value=Math.min(3,a.value+1))},null,8,["description","shortcut"])))),128)),3===a.value?(f(),m($,{key:1})):g("",!0)],2),s.value?(f(),m(o,{key:0,onDelete:t[4]||(t[4]=e=>s.value=!1)})):g("",!0)])])),_:1})}}};L({expose:[],inheritAttrs:!1,setup:e=>(e,t)=>(f(),m(B))}).mount("#app");
