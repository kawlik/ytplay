import{r as l,j as e,F as s,a as c,d as f,b as h,c as p,e as m,f as y,g,R as N,h as v}from"./vendor.85799928.js";const x=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}};x();const u=l.exports.createContext(null);function b({children:a}){const[r,i]=l.exports.useState(new Audio("https://cdn01.ytjar.xyz/get.php/f/3e/J3YdO44YNBE.mp3?h=bC0UJPclE2LJKTE_CkSstA&s=1635894987&n=sanah-etc-na-disco-Official-video")),o={audio:r,setAudio:i};return l.exports.useEffect(()=>{},[]),e(s,{children:e(u.Provider,{value:o,children:a})})}function S(){return e(s,{children:e("section",{className:"search"})})}function P({target:a}){return e(s,{children:c("div",{className:"option song",children:[e("h3",{children:a}),e("button",{className:"action",children:e(f,{})}),e("p",{className:"title",children:"sanah \u2013 etc. (na disco) (Official video)"}),e("p",{className:"author",children:"Sanah"})]})})}function O(){return e(s,{children:c("div",{className:"option add",children:[e("h3",{children:"Dodaj"}),e("button",{className:"action",children:e(h,{})})]})})}function k(){return e(s,{children:e("section",{className:"view",style:{backgroundImage:""},children:c("div",{className:"backdrop",children:[e(P,{target:"Teraz"}),e(O,{})]})})})}function _(){const{audio:a}=l.exports.useContext(u),[r,i]=l.exports.useState(!0);function o(){r?a.play():a.pause(),i(t=>!t)}return e(s,{children:c("section",{className:"play",children:[e("button",{className:"skip-prev",children:e(p,{})}),e("button",{className:"play-pause",onClick:o,children:r?e(m,{}):e(y,{})}),e("button",{className:"skip-next",children:e(g,{})}),c("div",{className:"timing",children:[e("input",{className:"track",type:"range",min:0,max:0}),e("span",{className:"t-now",children:"0:00"}),e("span",{className:"t-end",children:"0:00"})]})]})})}function j(){return e(s,{children:c(b,{children:[e(S,{}),e(k,{}),e(_,{})]})})}N.render(e(v.StrictMode,{children:e(j,{})}),document.getElementById("root"));
