(function(e){function a(a){for(var n,p,m=a[0],d=a[1],u=a[2],f=0,o=[];f<m.length;f++)p=m[f],Object.prototype.hasOwnProperty.call(r,p)&&r[p]&&o.push(r[p][0]),r[p]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);c&&c(a);while(o.length)o.shift()();return i.push.apply(i,u||[]),t()}function t(){for(var e,a=0;a<i.length;a++){for(var t=i[a],n=!0,m=1;m<t.length;m++){var d=t[m];0!==r[d]&&(n=!1)}n&&(i.splice(a--,1),e=p(p.s=t[0]))}return e}var n={},r={app:0},i=[];function p(a){if(n[a])return n[a].exports;var t=n[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.m=e,p.c=n,p.d=function(e,a,t){p.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},p.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(e,a){if(1&a&&(e=p(e)),8&a)return e;if(4&a&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(p.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)p.d(t,n,function(a){return e[a]}.bind(null,n));return t},p.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return p.d(a,"a",a),a},p.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},p.p="/vue-image-lazy/";var m=window["webpackJsonp"]=window["webpackJsonp"]||[],d=m.push.bind(m);m.push=a,m=m.slice();for(var u=0;u<m.length;u++)a(m[u]);var c=d;i.push([0,"chunk-vendors"]),t()})({0:function(e,a,t){e.exports=t("56d7")},"56d7":function(e,a,t){"use strict";t.r(a);t("e260"),t("e6cf"),t("cca6"),t("a79d");var n=t("2b0e"),r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"app"}},[t("h2",[e._v("Image Lazy Load")]),t("div",{staticClass:"container"},e._l(e.images,(function(e,a){return t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"img"}],key:a,staticClass:"img",attrs:{alt:""}})})),0)])},i=[],p={name:"App",data:function(){return{images:["https://im0-tub-ru.yandex.net/i?id=9e65a377d26fd77f4861a3390f3fd688&amp;ref=rim&amp;n=33&amp;w=421&amp;h=300","https://im0-tub-ru.yandex.net/i?id=7e505e6153e0acb3b65984575ed8f79c&amp;ref=rim&amp;n=33&amp;w=448&amp;h=300","https://im0-tub-ru.yandex.net/i?id=feaa21cd6ec198caf8a2d6c5265511c9&amp;ref=rim&amp;n=33&amp;w=200&amp;h=300","https://im0-tub-ru.yandex.net/i?id=132e5b95ea20382bf24fc581c2eaef5e&amp;ref=rim&amp;n=33&amp;w=449&amp;h=300","https://im0-tub-ru.yandex.net/i?id=4115e07599c41ed8ba1fd1ba3f1213c8&amp;ref=rim&amp;n=33&amp;w=402&amp;h=300","https://im0-tub-ru.yandex.net/i?id=2b71d887bc322761d85d545f5372383a&amp;ref=rim&amp;n=33&amp;w=410&amp;h=300","https://im0-tub-ru.yandex.net/i?id=9b8fefdf2759f9b567444bb1c05ec902&amp;ref=rim&amp;n=33&amp;w=186&amp;h=300","https://im0-tub-ru.yandex.net/i?id=0244ec5da0e4bff97e97e4df93a4fd22&amp;ref=rim&amp;n=33&amp;w=480&amp;h=293","https://im0-tub-ru.yandex.net/i?id=c163e96f941e29f52e45c467e4611107&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300","https://im0-tub-ru.yandex.net/i?id=0dac4c5085d89466713acd4f42f3e13a&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300","https://im0-tub-ru.yandex.net/i?id=4237b7305a5874b48a5137f025314632&amp;ref=rim&amp;n=33&amp;w=418&amp;h=300","https://im0-tub-ru.yandex.net/i?id=c4aeb8d5544a66030a5731806b20c091&amp;ref=rim&amp;n=33&amp;w=480&amp;h=298","https://im0-tub-ru.yandex.net/i?id=c15e218a9e1a6860eaa4f11b5e5d9abe&amp;ref=rim&amp;n=33&amp;w=248&amp;h=300","https://im0-tub-ru.yandex.net/i?id=3d09983a61ebafe760da556d8870f303&amp;ref=rim&amp;n=33&amp;w=392&amp;h=300","https://im0-tub-ru.yandex.net/i?id=381b3571014016a03cb1554cc2616b14&amp;ref=rim&amp;n=33&amp;w=282&amp;h=300","https://im0-tub-ru.yandex.net/i?id=c54b9b21453b8b15edcb8285ed2cc455&amp;ref=rim&amp;n=33&amp;w=453&amp;h=300","https://im0-tub-ru.yandex.net/i?id=52976489879bfdebc7339fe7f6d613a9&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300","https://im0-tub-ru.yandex.net/i?id=b6266194ad8f9491ff1cd7497ccf79f7&amp;ref=rim&amp;n=33&amp;w=265&amp;h=300","https://im0-tub-ru.yandex.net/i?id=ffe375a34780765b3f518b44c059c9f9&amp;ref=rim&amp;n=33&amp;w=300&amp;h=300","https://im0-tub-ru.yandex.net/i?id=52baea42849acd761c2f20641620ffcd&amp;ref=rim&amp;n=33&amp;w=206&amp;h=300","https://im0-tub-ru.yandex.net/i?id=4cee9a1da08d5d3a6a1fbce9f34463db&amp;ref=rim&amp;n=33&amp;w=448&amp;h=300","https://im0-tub-ru.yandex.net/i?id=61f60b78e48bc546c8766b2d85a39804&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300","https://im0-tub-ru.yandex.net/i?id=e0fb5f05029ca723a8c64cd9e70f094b&amp;ref=rim&amp;n=33&amp;w=412&amp;h=300","https://im0-tub-ru.yandex.net/i?id=08df986498c8f72d5f1369757cdc6666&amp;ref=rim&amp;n=33&amp;w=480&amp;h=192","https://im0-tub-ru.yandex.net/i?id=8dbb7180c6f8520262820ef450191dba&amp;ref=rim&amp;n=33&amp;w=453&amp;h=300","https://im0-tub-ru.yandex.net/i?id=5a6c6a2300844ca014210dd6e831e15c&amp;ref=rim&amp;n=33&amp;w=300&amp;h=300","https://im0-tub-ru.yandex.net/i?id=d703b87e9a2c2635f0e0cc3d4a73587f&amp;ref=rim&amp;n=33&amp;w=400&amp;h=300","https://im0-tub-ru.yandex.net/i?id=d8297328e7885ab4c44c3869b7bee848&amp;ref=rim&amp;n=33&amp;w=344&amp;h=300","https://im0-tub-ru.yandex.net/i?id=2808018f598277f20473f929849d4222&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300","https://im0-tub-ru.yandex.net/i?id=cb55401c9eaa8d4adcd6fa4dc0cbd10f&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300"]}}},m=p,d=(t("7989"),t("2877")),u=Object(d["a"])(m,r,i,!1,null,"3b138d94",null),c=u.exports,f=(t("7545"),t("4160"),t("159b"),t("d4ec")),o=t("bee2"),s=function(){function e(a){Object(f["a"])(this,e);var t=a.lazyOptions;this.el=a.el,this.src=a.src,this.parent=a.parent,this.preload=t.preload,this.loading=t.loading,this.error=t.error,this.state="init"}return Object(o["a"])(e,[{key:"checkInView",value:function(){var e=this.parent.getBoundingClientRect(),a=e.top,t=e.height,n=this.el.getBoundingClientRect(),r=n.top;return r-t*this.preload<a}},{key:"load",value:function(){var e=this;this.state="pending",this.el.src=this.loading,this.loadImage((function(){e.state="success",e.el.src=e.src}),(function(){e.state="failure",e.el.src=e.error}))}},{key:"loadImage",value:function(e,a){var t=new Image;t.src=this.src,t.addEventListener("load",e),t.addEventListener("error",a)}}]),e}(),l=s,h=function(){function e(a,t){Object(f["a"])(this,e),this.Vue=a,this.options=t,this.listenerQueue=[],this.hasBindScroll=!1,this.parent=void 0,this.lazyHandler=this.throttle(this.lazyHandler.bind(this),200)}return Object(o["a"])(e,[{key:"add",value:function(e,a){var t=this;this.Vue.nextTick((function(){t.parent=t.getScrollParent(e),t.hasBindScroll||(t.parent.addEventListener("scroll",t.lazyHandler),t.hasBindScroll=!0);var n=new l({el:e,src:a.value,parent:t.parent,lazyOptions:t.options});t.listenerQueue.push(n),t.lazyHandler()}))}},{key:"lazyHandler",value:function(){this.listenerQueue.forEach((function(e){e.checkInView()&&"init"===e.state&&e.load()}))}},{key:"throttle",value:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=null;return function(){for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];t||(t=setTimeout((function(){e.apply(void 0,r),t=null}),a))}}},{key:"destroy",value:function(){this.parent.removeEventListener("scroll",this.lazyHandler),this.listenerQueue=[],this.hasBindScroll=!1}},{key:"getScrollParent",value:function(e){var a=e.parentNode;while(a&&a!==window){var t=getComputedStyle(a),n=t.overflow,r=t.overflowY;if(/scroll|auto/.test(n)||/scroll|auto/.test(r))break;a=a.parentNode}return a}}]),e}(),b=h,y=function(e,a){var t=new b(e,a);e.directive("lazy",{bind:t.add.bind(t),unbind:t.destroy.bind(t)})},v=y;n["a"].use(v,{preload:1.3,error:t("5943"),loading:t("c9cf")}),n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(c)}}).$mount("#app")},5943:function(e,a,t){e.exports=t.p+"img/error.acb32768.png"},7545:function(e,a,t){},7989:function(e,a,t){"use strict";var n=t("f7f4"),r=t.n(n);r.a},c9cf:function(e,a,t){e.exports=t.p+"img/loading.f90a32f2.png"},f7f4:function(e,a,t){}});
//# sourceMappingURL=app.dcc5ef4d.js.map