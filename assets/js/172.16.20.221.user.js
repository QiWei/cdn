// ==UserScript==
// @name        Inject TodoList
// @namespace   Violentmonkey Scripts
// @match       *://172.16.20.221:8085/front/*
// @match       *://172.21.152.199:10003/front/*
// @grant       none
// @version     1.1
// @author      QWCloud@outlook.com
// @description February 24, 2022
// @downloadURL https://cdn.jsdelivr.net/gh/QiWei/CDN/assets/js/172.16.20.221.user.js
// ==/UserScript==

// https://github.com/muicss/loadjs/raw/master/dist/loadjs.min.js
window.loadJS = function(){var h=function(){},c={},u={},f={};function o(e,n){if(e){var r=f[e];if(u[e]=n,r)for(;r.length;)r[0](e,n),r.splice(0,1)}}function l(e,n){e.call&&(e={success:e}),n.length?(e.error||h)(n):(e.success||h)(e)}function d(r,t,s,i){var c,o,e=document,n=s.async,u=(s.numRetries||0)+1,f=s.before||h,l=r.replace(/[\?|#].*$/,""),a=r.replace(/^(css|img)!/,"");i=i||0,/(^css!|\.css$)/.test(l)?((o=e.createElement("link")).rel="stylesheet",o.href=a,(c="hideFocus"in o)&&o.relList&&(c=0,o.rel="preload",o.as="style")):/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(l)?(o=e.createElement("img")).src=a:((o=e.createElement("script")).src=r,o.async=void 0===n||n),!(o.onload=o.onerror=o.onbeforeload=function(e){var n=e.type[0];if(c)try{o.sheet.cssText.length||(n="e")}catch(e){18!=e.code&&(n="e")}if("e"==n){if((i+=1)<u)return d(r,t,s,i)}else if("preload"==o.rel&&"style"==o.as)return o.rel="stylesheet";t(r,n,e.defaultPrevented)})!==f(r,o)&&e.head.appendChild(o)}function r(e,n,r){var t,s;if(n&&n.trim&&(t=n),s=(t?r:n)||{},t){if(t in c)throw"LoadJS";c[t]=!0}function i(n,r){!function(e,t,n){var r,s,i=(e=e.push?e:[e]).length,c=i,o=[];for(r=function(e,n,r){if("e"==n&&o.push(e),"b"==n){if(!r)return;o.push(e)}--i||t(o)},s=0;s<c;s++)d(e[s],r,n)}(e,function(e){l(s,e),n&&l({success:n,error:r},e),o(t,e)},s)}if(s.returnPromise)return new Promise(i);i()}return r.ready=function(e,n){return function(e,r){e=e.push?e:[e];var n,t,s,i=[],c=e.length,o=c;for(n=function(e,n){n.length&&i.push(e),--o||r(i)};c--;)t=e[c],(s=u[t])?n(t,s):(f[t]=f[t]||[]).push(n)}(e,function(e){l(n,e)}),r},r.done=function(e){o(e,[])},r.reset=function(){c={},u={},f={}},r.isDefined=function(e){return e in c},r}();

var injectScript = 'https://cdn.jsdelivr.net/gh/QiWei/CDN/assets/js/' + window.location.hostname + '.js';

if (sessionStorage.getItem('currentUser') && JSON.parse(sessionStorage.getItem('currentUser')).username == '周爽') {
	injectScript = window.location.protocol + '//localhost/scripts/web/' + window.location.hostname + '.js';
}

function include(file) {
	return new Promise(function(resolve, reject){
		var script = document.createElement('script');
		script.src = file;
		script.type ='text/javascript';
		script.defer = true;
		document.getElementsByTagName('head').item(0).appendChild(script);
		script.onload = function(){
			resolve()
		}
		script.onerror = function(){
			reject()
		}
	})
}

if (typeof loadJS !== "undefined") {
	include('//unpkg.com/loadjs@latest/dist/loadjs.min.js').then(() => {window.loadJS = loadjs});
}

// cdn.jsdelivr.net疑似被dns污染
include('https://fastly.jsdelivr.net/npm/jspanel4@latest/dist/jspanel.js').then(async () => {
	let urls = [
		'extensions/modal/jspanel.modal.js',
		'extensions/tooltip/jspanel.tooltip.js',
		'extensions/hint/jspanel.hint.js',
		'extensions/layout/jspanel.layout.js',
		'extensions/contextmenu/jspanel.contextmenu.js',
		'extensions/dock/jspanel.dock.js'
	];
	await Promise.all(urls.map((e, i, a) => {
		return include('https://fastly.jsdelivr.net/npm/jspanel4@latest/dist/' + e).then(console.log(e + ' has been loaded'));
	}));
});

loadJS([
	'https://fastly.jsdelivr.net/npm/jspanel4@latest/dist/jspanel.css',
	'https://unpkg.com/css.gg/icons/all.css',
	'https://fastly.jsdelivr.net/npm/css.gg/icons/css/info.css'
]);

include(injectScript).then(function(){
	console.log(injectScript.split('/').reverse()[0] + ' has been loaded');
}, function(){
	console.log(injectScript.substring(injectScript.lastIndexOf("/") + 1) + ' has not been loaded');
});
