!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.akkordeon=t():e.akkordeon=t()}(window,(function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r={defaultOpenedIndex:null,delay:400,onToggle:null,canOpenMultiple:!1},s=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),(i=t)instanceof Element||i instanceof HTMLDocument){var i,o=t.children;this.containerElement=t,this._setConfig(n),this._setTitleAndContentElements(o),this._setUniqueIds(),this.isToggling=!1,this._initialiseContainerElement(),this._initialiseTitleElements(),this._initialiseContentElements(),null!==this.config.defaultOpenedIndex&&this.toggleAtIndex(n.defaultOpenedIndex)}else console.error('Failed to initialise accordion "'.concat(t,'" is not an object of type Element'))}var t,n,s;return t=e,(n=[{key:"_setConfig",value:function(e){this.config=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(n,!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},r,{},e)}},{key:"_setTitleAndContentElements",value:function(e){for(var t=[],n=[],i=0;i<e.length;i+=2)t.push(e[i]),n.push(e[i+1]);this.titleElements=t,this.contentElements=n}},{key:"_setUniqueIds",value:function(){this.ids=this.titleElements.map((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e5;return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}()}))}},{key:"_initialiseContainerElement",value:function(){this.containerElement.setAttribute("role","tablist")}},{key:"_initialiseTitleElements",value:function(){var e=this;this.titleElements.forEach((function(t,n){var i=e.contentElements[n];e._initialiseTitleElement(t,i,n)}))}},{key:"_initialiseTitleElement",value:function(e,t,n){var i=this;e.addEventListener("click",(function(){return i._onTitleClick(e,t,n)})),e.addEventListener("keydown",(function(o){return i._onTitleKeydown(o,e,t,n)})),e.setAttribute("role","tab"),e.setAttribute("tabindex","0"),e.setAttribute("aria-selected","false"),e.setAttribute("aria-controls","contentElement-".concat(this.ids[n]));var o=document.createElement("span");o.classList.add("Akkordeon-expansionIcon"),e.prepend(o)}},{key:"_onTitleClick",value:function(e,t,n){var i=this;this.isToggling||(this.isToggling=!0,this._updateTitleElementsIsExpanded(e),this._toggleContentElement(t),this.config.onToggle&&this.config.onToggle(e,t,n),setTimeout((function(){i.isToggling=!1}),this.config.delay))}},{key:"_onTitleKeydown",value:function(e,t,n,i){13!==e.keyCode&&32!==e.keyCode||this._onTitleClick(t,n,i)}},{key:"_updateTitleElementsIsExpanded",value:function(e){if(!this.config.canOpenMultiple){var t=!0,n=!1,i=void 0;try{for(var o,l=this.titleElements[Symbol.iterator]();!(t=(o=l.next()).done);t=!0){var r=o.value;r!==e&&(r.classList.remove("is-expanded"),r.setAttribute("aria-selected","false"))}}catch(e){n=!0,i=e}finally{try{t||null==l.return||l.return()}finally{if(n)throw i}}}e.classList.contains("is-expanded")?(e.classList.remove("is-expanded"),e.setAttribute("aria-selected","false")):(e.classList.add("is-expanded"),e.setAttribute("aria-selected","true"))}},{key:"_initialiseContentElements",value:function(){var e=this;this.contentElements.forEach((function(t,n){e._initialiseContentElement(t,n)}))}},{key:"_initialiseContentElement",value:function(e,t){e.style.transitionDuration=this.config.delay+"ms",e.classList.add("is-hidden"),e.setAttribute("role","tabpanel"),e.setAttribute("id","contentElement-".concat(this.ids[t])),e.setAttribute("aria-expanded","false")}},{key:"_toggleContentElement",value:function(e){this.config.canOpenMultiple||this._hideAllContentElementsButTarget(e),e.classList.contains("is-hidden")?(e.classList.remove("is-hidden"),e.setAttribute("aria-expanded","true")):(e.classList.add("is-hidden"),e.setAttribute("aria-expanded","false"))}},{key:"_hideAllContentElementsButTarget",value:function(e){var t=!0,n=!1,i=void 0;try{for(var o,l=this.contentElements[Symbol.iterator]();!(t=(o=l.next()).done);t=!0){var r=o.value;r!==e&&r.classList.add("is-hidden")}}catch(e){n=!0,i=e}finally{try{t||null==l.return||l.return()}finally{if(n)throw i}}}},{key:"toggleAtIndex",value:function(e){var t=this.titleElements.length;e>=0&&e<t?this.titleElements[e].click():console.warn("".concat(e," index not found. Accordion has only ").concat(t," elements"))}},{key:"insertNewTitleContentPair",value:function(e,t){var n=document.createElement("dt");n.innerHTML=e,n.classList.add("Akkordeon-title");var i=document.createElement("dl");i.innerHTML=t,i.classList.add("Akkordeon-content");var o=this.titleElements.length;this.titleElements.push(n),this.contentElements.push(i),this._initialiseTitleElement(n,i,o),this._initialiseContentElement(i,o),this.containerElement.appendChild(n),this.containerElement.appendChild(i)}}])&&l(t.prototype,n),s&&l(t,s),e}();n.d(t,"Akkordeon",(function(){return s}))}])}));