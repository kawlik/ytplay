import{r as s,j as e,F as a,a as i,d as g,b as x,c as v,e as S,f as b,g as M,R as P,h as $}from"./vendor.85799928.js";const k=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}};k();const p=s.exports.createContext(null);function w({children:r}){const[o,l]=s.exports.useState(new Audio("https://cdn01.ytjar.xyz/get.php/f/3e/J3YdO44YNBE.mp3?h=bC0UJPclE2LJKTE_CkSstA&s=1635894987&n=sanah-etc-na-disco-Official-video")),c={audio:o,setAudio:l};return s.exports.useEffect(()=>{},[]),e(a,{children:e(p.Provider,{value:c,children:r})})}function C(){return e(a,{children:e("section",{className:"search"})})}function E({target:r}){return e(a,{children:i("div",{className:"option song",children:[e("h3",{children:r}),e("button",{className:"action",children:e(g,{})}),e("p",{className:"title",children:"sanah \u2013 etc. (na disco) (Official video)"}),e("p",{className:"author",children:"Sanah"})]})})}function O(){return e(a,{children:i("div",{className:"option add",children:[e("h3",{children:"Dodaj"}),e("button",{className:"action",children:e(x,{})})]})})}function A(){return e(a,{children:e("section",{className:"view",style:{backgroundImage:""},children:i("div",{className:"backdrop",children:[e(E,{target:"Teraz"}),e(O,{})]})})})}function _(){const{audio:r}=s.exports.useContext(p),[o,l]=s.exports.useState(!0);function c(){o?r.play():r.pause(),l(t=>!t)}return s.exports.useEffect(()=>{const t=document.querySelector("#timing"),n=t.querySelector(".t-now"),d=t.querySelector(".t-end"),h=t.querySelector(".track");function m(){if(Number.isNaN(+r.duration))return;const u=r.currentTime,f=Math.ceil(r.duration),y=`${Math.floor(u/60)}:${Math.ceil(u%60)>9?Math.ceil(u%60):"0"+Math.ceil(u%60)}`,N=`${Math.floor(f/60)}:${Math.ceil(f%60)>9?Math.ceil(f%60):"0"+Math.ceil(f%60)}`;h.value=u,h.max=f,n.textContent=y,d.textContent=N,!o&&!touch&&requestAnimationFrame(m)}m()},[o]),e(a,{children:i("section",{className:"play",children:[e("button",{className:"skip-prev",children:e(v,{})}),e("button",{className:"play-pause",onClick:c,children:o?e(S,{}):e(b,{})}),e("button",{className:"skip-next",children:e(M,{})}),i("div",{className:"timing",id:"timing",children:[e("input",{className:"track",type:"range",min:0,max:0}),e("span",{className:"t-now",children:"0"}),e("span",{className:"t-end",children:"0"})]})]})})}function j(){return e(a,{children:i(w,{children:[e(C,{}),e(A,{}),e(_,{})]})})}P.render(e($.StrictMode,{children:e(j,{})}),document.getElementById("root"));