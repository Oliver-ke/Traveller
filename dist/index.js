!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){},,function(e,t,r){"use strict";r.r(t);const n=document.querySelector("input[name=location]"),o=document.querySelector("input[name=date]"),a=document.querySelector(".spinner"),c=document.querySelector("span.error"),u=document.querySelector("form"),s=document.querySelector("input[type=submit]"),i=(document.querySelector("button.save-trip"),async(e,t)=>{try{const r=await t(e);return{error:null,data:await r.json()}}catch(e){return console.log(e),{error:e,data:null}}});var l=(e,t,r,n)=>{const o=r[e];switch(e){case"GEONAMES":{const e=n.GEO_USER_NAME;return`${o}?${`maxRows=20&placename=${encodeURIComponent(t)}&username=${e}`}`}case"WEATHERBIT":{const e=n.WEATHERBIT_API_KEY;let r=`city=${encodeURIComponent(t)}&key=${e}`;if(t.lat&&t.lon){const{lat:n,lon:o}=t;r=`key=${e}&lat=${n}&lon=${o}`}return`${o}?${r}`}case"PIXABAY":return`${"https://cors-anywhere.herokuapp.com/"}${o}?${`key=${n.PIXABAY_API_KEY}&q=${encodeURIComponent(t)}&per_page=10`}`;default:return}};const d={GEO_USER_NAME:"oliverke",WEATHERBIT_API_KEY:"833f5515002f470bb298e49362d3a40a",PIXABAY_API_KEY:"9791837-24687b3b0fb9fe7f0289366cc"},f={GEONAMES:" http://api.geonames.org/postalCodeSearchJSON",WEATHERBIT:"https://api.weatherbit.io/v2.0/forecast/daily",PIXABAY:"https://pixabay.com/api/",RESTCOUNTRY:""};var p=(e,t,r=null)=>{switch(e){case"START_SPINNER":return void t.classList.add("show-spinner");case"STOP_SPINNER":return void t.classList.remove("show-spinner");case"SHOW_ERROR":return t.classList.add("show-error"),void(t.textContent=r);case"CLEAR_ERROR":return t.classList.remove("show-error");case"SHOW_RESULT":{const{}=r;return void(t.innerHTML="")}default:return}};const E={weather:{},countryInfo:{},pictures:[]},R=async e=>{e.preventDefault();const t=n.value;o.value;if(!t)return p("SHOW_ERROR",c,"Provide a location");p("CLEAR_ERROR",c),p("START_SPINNER",a);const r=l("GEONAMES","Ghana",f,d),{error:u,data:s}=await i(r,fetch);if(u||!s.postalCodes)return p("STOP_SPINNER",a),p("SHOW_ERROR",c,"Could not find Location");const R=(S=s.postalCodes,m="placeName",y="Ghana",S.filter(e=>e[m]==y));var S,m,y;if(R.length<1){const e=l("WEATHERBIT",t,f,d),{data:r}=await i(e,fetch);E.weather=r}else{const{lng:e,lat:t}=R[0],r=l("WEATHERBIT",{lon:e,lat:t},f,d),{data:n}=await i(r,fetch);E.weather=n}const _=l("PIXABAY",t,f,d),{data:A}=await i(_,fetch);E.pictures=((e,t)=>e.map(e=>e[t]))(A.hits,"webformatURL"),p("STOP_SPINNER",a),window.location.href="/trip"};r(0);s.addEventListener("submit",R),u.addEventListener("submit",R)}]);