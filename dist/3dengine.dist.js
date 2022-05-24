(()=>{"use strict";var t=function(t){return t*Math.PI/180};const e=function(){function e(){}return e.translate=function(t,e,r,n){return{x:t.x+e,y:t.y+r,z:t.z+n}},e.scale=function(t,e,r,n){return{x:t.x*e,y:t.y*r,z:t.z*n}},e.perspectiveProjection=function(t,e){return{x:t.x*e/t.z,y:t.y*e/t.z,z:0}},e.rotateX=function(e,r){var n=t(r);return{x:e.x,y:e.y*Math.cos(n)+e.z*Math.sin(n),z:-e.y*Math.sin(n)+e.z*Math.cos(n)}},e.rotateY=function(e,r){var n=t(r);return{x:e.x*Math.cos(n)-e.z*Math.sin(n),y:e.y,z:e.x*Math.sin(n)+e.z*Math.cos(n)}},e.rotateZ=function(e,r){var n=t(r);return{x:e.x*Math.cos(n)+e.y*Math.sin(n),y:-e.x*Math.sin(n)+e.y*Math.cos(n),z:e.z}},e}();var r=function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};const n=function(){function t(){}return t.prototype.translate=function(t,n,o){var i,a;try{for(var s=r(this.polygons),c=s.next();!c.done;c=s.next()){var l=c.value;l.points=l.points.map((function(r){return e.translate(r,t,n,o)}))}}catch(t){i={error:t}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(i)throw i.error}}},t.prototype.rotate=function(t,n,o){var i,a;try{for(var s=r(this.polygons),c=s.next();!c.done;c=s.next()){var l=c.value;l.points=l.points.map((function(r){return r=e.rotateX(r,t),r=e.rotateX(r,n),r=e.rotateX(r,o)}))}}catch(t){i={error:t}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(i)throw i.error}}},t}();var o=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","svg");if(!(t instanceof SVGSVGElement))throw new Error("Expected svg root elem");return t},i=function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};const a=function(){function t(e,r){void 0===e&&(e=[]),void 0===r&&(r="black"),this.root=o(),this.elem=document.createElementNS("http://www.w3.org/2000/svg","polygon"),this.elem.setAttribute("fill",r),this.points=e,t.count++,this.number=t.count}return Object.defineProperty(t.prototype,"fillColor",{set:function(t){this.elem.setAttribute("fill",t)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"tagElem",{get:function(){return this.elem},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"texture",{get:function(){return this.textrueElem},enumerable:!1,configurable:!0}),t.prototype.setTexture=function(t){this.elem.id="defs-"+this.number,this.textrueElem=function(t,e){var r=document.createElementNS("http://www.w3.org/2000/svg","defs"),n=document.createElementNS("http://www.w3.org/2000/svg","pattern");n.id=e,n.setAttribute("patternContentUnits","objectBoundingBox"),n.setAttribute("height","100%"),n.setAttribute("width","100%"),n.setAttribute("x","0"),n.setAttribute("y","0"),n.setAttribute("preserveAspectRatio","none");var o=document.createElementNS("http://www.w3.org/2000/svg","image");return o.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t),o.setAttribute("width","1"),o.setAttribute("height","1"),o.setAttribute("preserveAspectRatio","none"),n.append(o),r.append(n),r}(t,this.elem.id),this.elem.setAttribute("fill","url(#".concat(this.elem.id,")"))},t.prototype.render=function(t){var e,r;this.elem.points.clear();var n=t.convertPoints(this.points),o=n.points,a=n.averageDistance;this.averageDistance=a;try{for(var s=i(o),c=s.next();!c.done;c=s.next()){var l=c.value,u=this.root.createSVGPoint();u.x=l.x,u.y=l.y,this.elem.points.appendItem(u)}}catch(t){e={error:t}}finally{try{c&&!c.done&&(r=s.return)&&r.call(s)}finally{if(e)throw e.error}}},t.count=0,t}();var s,c=(s=function(t,e){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},s(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),l=function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};const u=function(t){function e(e,r,n,o,i,s){var c,u;void 0===i&&(i="black");var y=t.call(this)||this;if(y.polygons=[new a([{x:-n/2,y:-r/2,z:-e/2},{x:n/2,y:-r/2,z:-e/2},{x:n/2,y:r/2,z:-e/2},{x:-n/2,y:r/2,z:-e/2}],i),new a([{x:-n/2,y:-r/2,z:e/2},{x:n/2,y:-r/2,z:e/2},{x:n/2,y:r/2,z:e/2},{x:-n/2,y:r/2,z:e/2}],i),new a([{x:-n/2,y:r/2,z:-e/2},{x:n/2,y:r/2,z:-e/2},{x:n/2,y:r/2,z:e/2},{x:-n/2,y:r/2,z:e/2}],i),new a([{x:-n/2,y:-r/2,z:-e/2},{x:n/2,y:-r/2,z:-e/2},{x:n/2,y:-r/2,z:e/2},{x:-n/2,y:-r/2,z:e/2}],i),new a([{x:n/2,y:-r/2,z:-e/2},{x:n/2,y:-r/2,z:e/2},{x:n/2,y:r/2,z:e/2},{x:n/2,y:r/2,z:-e/2}],i),new a([{x:-n/2,y:-r/2,z:-e/2},{x:-n/2,y:-r/2,z:e/2},{x:-n/2,y:r/2,z:e/2},{x:-n/2,y:r/2,z:-e/2}],i)],s)try{for(var h=l(y.polygons),p=h.next();!p.done;p=h.next()){p.value.setTexture(s)}}catch(t){c={error:t}}finally{try{p&&!p.done&&(u=h.return)&&u.call(h)}finally{if(c)throw c.error}}return y.translate(o.x,o.y,o.z),y}return c(e,t),e}(n);var y=function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};const h=function(){function t(t,e,r,n,o){this.width=t,this.height=e,this.z0=r,this.zFar=n,this.camera=o}return t.prototype.convertPoints=function(t){var r,n,o=[],i=0;try{for(var a=y(t),s=a.next();!s.done;s=a.next()){var c=s.value;c=this.cameraTranslate(c),(c=this.cameraRotate(c)).z<0||(c.z>this.zFar||(i+=Math.sqrt(Math.pow(c.x,2)+Math.pow(c.y,2)+Math.pow(c.z,2)),c=e.perspectiveProjection(c,this.z0),c=e.scale(c,1,-1,1),c=e.translate(c,this.width/2,this.height/2,0),o.push(c)))}}catch(t){r={error:t}}finally{try{s&&!s.done&&(n=a.return)&&n.call(a)}finally{if(r)throw r.error}}return{points:o,averageDistance:i/o.length}},t.prototype.cameraTranslate=function(t){return e.translate(t,-this.camera.position.x,-this.camera.position.y,-this.camera.position.z)},t.prototype.cameraRotate=function(t){return t=e.rotateX(t,this.camera.rotation.ax),t=e.rotateY(t,this.camera.rotation.ay),e.rotateX(t,this.camera.rotation.az)},t}();const p=function(){function e(t){this.rotation={ax:0,ay:0,az:0},this.position={x:0,y:0,z:0},this.rotationSpeed={ax:0,ay:0,az:0},this.speedComponents={x:0,y:0,z:0},this.keys={w:!1,s:!1,d:!1,a:!1,shift:!1,space:!1},this.angleSpeed=3,this.speed=2,this.azMax=70,this.root=t,this.setControls()}return e.prototype.update=function(){this.updateSpeed(),this.position.x+=this.speedComponents.x,this.position.y+=this.speedComponents.y,this.position.z+=this.speedComponents.z,this.rotation.ax+=this.rotationSpeed.ax,this.rotation.ay+=this.rotationSpeed.ay,this.changeZAngle(this.rotationSpeed.az),this.rotation.ax%=360,this.rotation.ay%=360,this.rotation.az%=360},e.prototype.changeZAngle=function(t){(Math.abs(this.rotation.az)<this.azMax||this.rotation.az>0&&t<0||this.rotation.az<0&&t>0)&&(this.rotation.az+=t)},e.prototype.updateSpeed=function(){var e={x:0,y:0,z:0},r=Math.cos(t(this.rotation.ay)),n=Math.sin(t(this.rotation.az)),o=Math.sin(t(this.rotation.ay));this.keys.w&&(e.x+=this.speed*o,e.z+=this.speed*r,e.y-=this.speed*n),this.keys.s&&(e.x-=this.speed*o,e.z-=this.speed*r,e.y+=this.speed*n),this.keys.a&&(e.x-=this.speed*r,e.z+=this.speed*o),this.keys.d&&(e.x+=this.speed*r,e.z-=this.speed*o),this.keys.shift&&(e.y-=this.speed),this.keys.space&&(e.y+=this.speed),this.speedComponents=e},e.prototype.setControls=function(){var t=this,e=function(e){t.rotation.ay+=e.movementX/10,t.changeZAngle(e.movementY/10)},r=function(e){t.keys.w&&"KeyW"===e.code&&(t.keys.w=!1),t.keys.s&&"KeyS"===e.code&&(t.keys.s=!1),t.keys.a&&"KeyA"===e.code&&(t.keys.a=!1),t.keys.d&&"KeyD"===e.code&&(t.keys.d=!1),t.keys.shift&&"ShiftLeft"===e.code&&(t.keys.shift=!1),t.keys.space&&"Space"===e.code&&(t.keys.space=!1),"ArrowRight"===e.key&&(t.rotationSpeed.ay=0),"ArrowLeft"===e.key&&(t.rotationSpeed.ay=0),"ArrowUp"===e.code&&(t.rotationSpeed.az=0),"ArrowDown"===e.code&&(t.rotationSpeed.az=0)},n=function(e){t.keys.w||(t.keys.w="KeyW"===e.code),t.keys.s||(t.keys.s="KeyS"===e.code),t.keys.a||(t.keys.a="KeyA"===e.code),t.keys.d||(t.keys.d="KeyD"===e.code),t.keys.shift||(t.keys.shift="ShiftLeft"===e.code),t.keys.space||(t.keys.space="Space"===e.code),"ArrowRight"===e.code&&(t.rotationSpeed.ay=t.angleSpeed),"ArrowLeft"===e.code&&(t.rotationSpeed.ay=-t.angleSpeed),"ArrowUp"===e.code&&(t.rotationSpeed.az=-t.angleSpeed),"ArrowDown"===e.code&&(t.rotationSpeed.az=t.angleSpeed)};document.addEventListener("pointerlockchange",(function(){document.pointerLockElement===t.root?(document.addEventListener("mousemove",e),document.addEventListener("keyup",r),document.addEventListener("keydown",n)):(document.removeEventListener("mousemove",e),document.removeEventListener("keyup",r),document.removeEventListener("keydown",n))})),this.root.addEventListener("click",(function(){t.root.requestPointerLock()}))},e}();var f=function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},d=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},v=function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};const g=function(){function e(t){this.objects=[],this.polygons=[],this.bgElems=[],this.bg={width:0,url:""},this.styleString="",this.zFar=1e6,this.fov=45,this.svgRoot=o(),this.svgRoot.style.width="100%",this.svgRoot.style.height="100%",this.groupObject=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g");if(!(t instanceof SVGGElement))throw new Error("Expected svg g elem");return t}(),this.svgRoot.append(this.groupObject),t.append(this.svgRoot),this.root=t,this.root.classList.add("wallpaper");var e=this.calcZ0(this.fov,this.zFar);this.camera=new p(t),this.renderPipe=new h(t.clientWidth,t.clientHeight,e,this.zFar,this.camera)}return Object.defineProperty(e.prototype,"cameraObj",{get:function(){return this.camera},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"svgRootElement",{get:function(){return this.svgRoot},enumerable:!1,configurable:!0}),e.prototype.addBgElem=function(){for(var t,e,r,n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];try{for(var i=f(n),a=i.next();!a.done;a=i.next()){var s=a.value;this.styleString+=s.styleBg+","}}catch(e){t={error:e}}finally{try{a&&!a.done&&(e=i.return)&&e.call(i)}finally{if(t)throw t.error}}this.root.style.background=this.styleString.slice(0,-1),(r=this.bgElems).push.apply(r,v([],d(n),!1))},e.prototype.updateBg=function(){this.styleString="";for(var t="",e=0;e<this.bgElems.length;e++)this.bgElems[e].update(this.root.clientWidth,this.camera.rotation.ay),this.styleString+=this.bgElems[e].styleBg,t+="100px",e<this.bgElems.length-1&&(this.styleString+=", ",t+=", ");0!==this.bgElems.length&&(t+=", ",this.styleString+=", ");var r=this.bg.width+this.root.clientWidth,n=this.camera.rotation.ay*r/360;this.styleString+='url("'.concat(this.bg.url,'") ').concat(-n,"px 0 repeat-x"),t+="cover",this.root.style.background=this.styleString,this.root.style.backgroundSize=t},e.prototype.setBackground=function(t){var e=this,r=new Image;r.src=t,this.bg.url=t,r.onload=function(){e.bg.width=r.width}},e.prototype.addObjects=function(){for(var t,e,r,n,o,i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];try{for(var s=f(i),c=s.next();!c.done;c=s.next()){var l=c.value;try{for(var u=(r=void 0,f(l.polygons)),y=u.next();!y.done;y=u.next()){var h=y.value;h.texture&&this.svgRoot.prepend(h.texture),this.groupObject.append(h.tagElem),this.polygons.push(h)}}catch(t){r={error:t}}finally{try{y&&!y.done&&(n=u.return)&&n.call(u)}finally{if(r)throw r.error}}}}catch(e){t={error:e}}finally{try{c&&!c.done&&(e=s.return)&&e.call(s)}finally{if(t)throw t.error}}(o=this.objects).push.apply(o,v([],d(i),!1))},e.prototype.setUpdateFunction=function(t){this.updateFunction=t},e.prototype.run=function(t){var e,r,n,o=this,i=function(){requestAnimationFrame(i);var t=(r=Date.now())-n;t>e&&(n=r-t%e,o.render())};e=1e3/t,n=Date.now(),i()},e.prototype.calcZ0=function(e,r){e=t(e);var n=2*r*Math.tan(e/2);return r*this.root.clientWidth/n},e.prototype.render=function(){var t,e;if(this.camera.update(),this.updateBg(),this.updateFunction&&this.updateFunction(),0!==this.polygons.length){try{for(var r=f(this.polygons),n=r.next();!n.done;n=r.next()){n.value.render(this.renderPipe)}}catch(e){t={error:e}}finally{try{n&&!n.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}this.polygons.sort((function(t,e){return e.averageDistance-t.averageDistance}));for(var o=0,i=0;this.polygons[i].tagElem.isEqualNode(this.groupObject.children[i]);)if((o=++i)>=this.polygons.length-1)return;for(var a=o;a<this.polygons.length;a++)this.groupObject.insertBefore(this.polygons[a].tagElem,this.groupObject.children[a])}},e}();var x=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),w=function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};const m=function(t){function e(e,r,n,o){var i,s;void 0===n&&(n="black");var c=t.call(this)||this;if(c.polygons=[new a([{x:-e/2,y:-e/2,z:-e/2},{x:e/2,y:-e/2,z:-e/2},{x:e/2,y:e/2,z:-e/2},{x:-e/2,y:e/2,z:-e/2}],n),new a([{x:-e/2,y:-e/2,z:e/2},{x:e/2,y:-e/2,z:e/2},{x:e/2,y:e/2,z:e/2},{x:-e/2,y:e/2,z:e/2}],n),new a([{x:-e/2,y:e/2,z:-e/2},{x:e/2,y:e/2,z:-e/2},{x:e/2,y:e/2,z:e/2},{x:-e/2,y:e/2,z:e/2}],n),new a([{x:-e/2,y:-e/2,z:-e/2},{x:e/2,y:-e/2,z:-e/2},{x:e/2,y:-e/2,z:e/2},{x:-e/2,y:-e/2,z:e/2}],n),new a([{x:e/2,y:-e/2,z:-e/2},{x:e/2,y:-e/2,z:e/2},{x:e/2,y:e/2,z:e/2},{x:e/2,y:e/2,z:-e/2}],n),new a([{x:-e/2,y:-e/2,z:-e/2},{x:-e/2,y:-e/2,z:e/2},{x:-e/2,y:e/2,z:e/2},{x:-e/2,y:e/2,z:-e/2}],n)],o)try{for(var l=w(c.polygons),u=l.next();!u.done;u=l.next()){u.value.setTexture(o)}}catch(t){i={error:t}}finally{try{u&&!u.done&&(s=l.return)&&s.call(l)}finally{if(i)throw i.error}}return c.translate(-r.x,-r.y,-r.z),c}return x(e,t),e}(n);var b=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();const z=function(t){function e(e,r,n){void 0===n&&(n="black");var o=t.call(this)||this;return o.polygons=[new a([{x:-e/2,y:-e/2,z:-e/2},{x:e/2,y:-e/2,z:-e/2},{x:e/2,y:-e/2,z:e/2},{x:-e/2,y:-e/2,z:e/2}],n),new a([{x:e/2,y:-e/2,z:-e/2},{x:e/2,y:-e/2,z:e/2},{x:0,y:e/2,z:0}],n),new a([{x:-e/2,y:-e/2,z:-e/2},{x:-e/2,y:-e/2,z:e/2},{x:0,y:e/2,z:0}],n),new a([{x:-e/2,y:-e/2,z:e/2},{x:e/2,y:-e/2,z:e/2},{x:0,y:e/2,z:0}],n),new a([{x:-e/2,y:-e/2,z:-e/2},{x:e/2,y:-e/2,z:-e/2},{x:0,y:e/2,z:0}],n)],o.translate(r.x,r.y,r.z),o}return b(e,t),e}(n);var S=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),k=function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};const E=function(t){function e(e,r,n,o){var i,s;void 0===n&&(n="black");var c=t.call(this)||this;c.polygons=[],c.centerPoint=e;for(var l=2*Math.PI/10,u=Math.PI/10,y=[],h=0;h<=10;h++)for(var p=Math.PI/2-h*u,f=r*Math.cos(p),d=r*Math.sin(p),v=0;v<=10;v++){var g=v*l,x=f*Math.cos(g),w=f*Math.sin(g);y.push({x,y:w,z:d})}for(h=0;h<10;h++){var m=11*h,b=m+10+1;for(v=0;v<10;++v,++m,++b)c.polygons.push(new a([y[m],y[m+1],y[b+1],y[b]],n))}if(o)try{for(var z=k(c.polygons),S=z.next();!S.done;S=z.next()){S.value.setTexture(o)}}catch(t){i={error:t}}finally{try{S&&!S.done&&(s=z.return)&&s.call(z)}finally{if(i)throw i.error}}return c.translate(e.x,e.y,e.z),c}return S(e,t),e.prototype.setCenterPoint=function(t,e,r){this.translate(-this.centerPoint.x,-this.centerPoint.y,-this.centerPoint.z),this.translate(t,e,r),this.centerPoint={x:t,y:e,z:r}},e}(n);var O=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),j=function(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};const _=function(t){function r(r,n,o,i){var s,c;void 0===o&&(o="black");var l=t.call(this)||this;l.polygons=[];for(var u=[],y=r/10,h=r/10,p=0;p<=y;p++)for(var f=0;f<=h;f++){var d={x:0,y:0,z:-r/2};d.x=10*f,d.z=10*p,d=e.translate(d,-r/2,0,-r/2),u.push(d)}console.log(u);for(p=0;p<y;p++){var v=p*(h+1),g=v+h+1;for(f=0;f<h;f++,v++,g++)l.polygons.push(new a([u[v],u[v+1],u[g+1],u[g]],o))}if(i)try{for(var x=j(l.polygons),w=x.next();!w.done;w=x.next()){w.value.setTexture(i)}}catch(t){s={error:t}}finally{try{w&&!w.done&&(c=x.return)&&c.call(x)}finally{if(s)throw s.error}}return l.translate(n.x,n.y,n.z),l}return O(r,t),r}(n);var A=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a},M=function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))},P=function(t){var e=this;this.cube=function(t,e,r,n,o){return void 0===e&&(e=0),void 0===r&&(r=0),void 0===n&&(n=0),void 0===o&&(o="black"),new m(t,{x:e,y:r,z:n},o)},this.pyramid=function(t,e,r,n,o){return void 0===e&&(e=0),void 0===r&&(r=0),void 0===n&&(n=0),void 0===o&&(o="black"),new z(t,{x:e,y:r,z:n},o)},this.parallelepiped=function(t,e,r,n,o,i,a){return void 0===n&&(n=0),void 0===o&&(o=0),void 0===i&&(i=0),void 0===a&&(a="black"),new u(t,e,r,{x:n,y:o,z:i},a)},this.sphere=function(t,e,r,n,o){return void 0===e&&(e=0),void 0===r&&(r=0),void 0===n&&(n=0),void 0===o&&(o="black"),new E({x:e,y:r,z:n},t,o)},this.floor=function(t,e,r,n,o){return void 0===e&&(e=0),void 0===r&&(r=0),void 0===n&&(n=0),void 0===o&&(o="black"),new _(t,{x:e,y:r,z:n},o)},this.setBackground=function(t){return e.world.setBackground(t)},this.add=function(){for(var t,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return(t=e.world).addObjects.apply(t,M([],A(r),!1))},this.update=function(t){return e.world.setUpdateFunction(t)},this.saveScreen=function(){var t=e.world.svgRootElement,r=(new XMLSerializer).serializeToString(t);r='<?xml version="1.0" standalone="no"?>\r\n'+r;var n="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(r),o=document.createElement("a"),i=new MouseEvent("click");o.download="download.svg",o.href=n,o.dispatchEvent(i)};var r=document.getElementById(t);r.style.overflow="hidden",r.style.backgroundRepeat="repeat-x",r.style.backgroundSize="cover",this.world=new g(r),this.player=this.world.cameraObj,this.world.run(120)};window.SVGEngine=function(t){return new P(t)};var T=SVGEngine("world"),R=T.cube(100);T.add(R),T.update((function(){R.translate(1,1,1)}))})();