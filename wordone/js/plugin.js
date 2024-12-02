/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright ﾂｩ 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(
	jQuery.easing, {
	def:'easeOutQuad',
	swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},
	easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},
	easeOutQuad:function(x,t,b,c,d){return -c *(t/=d)*(t-2)+b;},
	easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1) return c/2*t*t+b;return -c/2 *((--t)*(t-2) - 1)+b;},
	easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},
	easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
	easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1) return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
	easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},
	easeOutQuart:function(x,t,b,c,d){return -c *((t=t/d-1)*t*t*t - 1)+b;},
	easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1) return c/2*t*t*t*t+b;return -c/2 *((t-=2)*t*t*t - 2)+b;},
	easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
	easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
	easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1) return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
	easeInSine:function(x,t,b,c,d){return -c * Math.cos(t/d *(Math.PI/2))+c+b;},
	easeOutSine:function(x,t,b,c,d){return c * Math.sin(t/d *(Math.PI/2))+b;},
	easeInOutSine:function(x,t,b,c,d){return -c/2 *(Math.cos(Math.PI*t/d) - 1)+b;},
	easeInExpo:function(x,t,b,c,d){return(t==0)?b:c * Math.pow(2,10 *(t/d - 1))+b;},
	easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c *(-Math.pow(2,-10 * t/d)+1)+b;},
	easeInOutExpo:function(x,t,b,c,d){if(t==0) return b;if(t==d) return b+c;if((t/=d/2)<1) return c/2 * Math.pow(2,10 *(t - 1))+b;return c/2 *(-Math.pow(2,-10 *--t)+2)+b;},
	easeInCirc:function(x,t,b,c,d){return -c *(Math.sqrt(1 -(t/=d)*t) - 1)+b;},
	easeOutCirc:function(x,t,b,c,d){return c * Math.sqrt(1 -(t=t/d-1)*t)+b;},
	easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1) return -c/2 *(Math.sqrt(1 - t*t) - 1)+b;return c/2 *(Math.sqrt(1 -(t-=2)*t)+1)+b;},
	easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0) return b;if((t/=d)==1) return b+c;if(!p) p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI) * Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p ))+b;},
	easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0) return b;if((t/=d)==1) return b+c;if(!p) p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI) * Math.asin(c/a);return a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.PI)/p )+c+b;},
	easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0) return b;if((t/=d/2)==2) return b+c;if(!p) p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI) * Math.asin(c/a);if(t<1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p ))+b;return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )*.5+c+b;},
	easeInBack:function(x,t,b,c,d,s){if(s==undefined) s=1.70158;return c*(t/=d)*t*((s+1)*t - s)+b;},
	easeOutBack:function(x,t,b,c,d,s){if(s==undefined) s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
	easeInOutBack:function(x,t,b,c,d,s){if(s==undefined) s=1.70158;if((t/=d/2)<1) return c/2*(t*t*(((s*=(1.525))+1)*t - s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
	easeInBounce:function(x,t,b,c,d){return c - jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},
	easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},
	easeInOutBounce:function(x,t,b,c,d){if(t<d/2) return jQuery.easing.easeInBounce(x,t*2,0,c,d) * .5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d) * .5+c*.5+b;}
});

// remvoe no-js
(function(){
	if(document.documentElement.className.indexOf('no-js') !== -1){
		document.documentElement.className = document.documentElement.className.replace('no-js', '');
	}
})();

(function($){

	window.doc = document;

	var MODE_CSS3 = 1;
	var MODE_JS   = 2;
	var debugMode = MODE_CSS3;

	window.Shared = (function(){
		var _ua = window.navigator.userAgent.toLowerCase(),
		    _IE, _IEver,
		    _Chrome, _ChromeVer,
		    _FireFox, _FireFoxVer,
		    _Safari, _SafariVer,
		    _Opera, _OperaVer,
		    _Mac, _iPhone, _iPad, _iPod, _iOSver,
		    _Android, _AndroidMobile, _AndroidTablet, _AndroidVer,
		    _WindowsPhone,
			_bot;

		if (_ua.indexOf("msie") != -1){
			_IE = true;
			_ua.match(/msie (\d+\.\d)/);
			_IEver = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("chrome")  != -1){
			_Chrome = true;
			_ua.match(/chrome[\/ ]?(\d+\.\d+)/);
			_ChromeVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("firefox") != -1){
			_FireFox = true;
			_ua.match(/firefox[\/ ]?(\d+\.\d+)/);
			_FireFoxVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("opera")   != -1){
			_Opera = true;
			_ua.match(/opera[\/ ]?(\d+\.\d+)/);
			_OperaVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("safari")  != -1){
			_Safari = true;
			_ua.match(/version[\/ ]?(\d+\.\d+)/);
			_SafariVer = parseFloat(RegExp.$1);
		}
		if (_ua.indexOf("iphone") != -1){
			_iPhone = true;
			_ua.match(/iphone os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("ipad") != -1){
			_iPad = true;
			_ua.match(/cpu os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("ipod") != -1){
			_iPod = true;
			_ua.match(/os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("android") != -1){
			_Android = true;
			_ua.match(/android (\d+\.\d)/);
			_AndroidVer = parseFloat(RegExp.$1);

			if(_ua.indexOf('mobile') != -1){
				_AndroidMobile = true;
			}else{
				_AndroidTablet = true;
			}
		}else if (_ua.indexOf("windows phone") != -1) {
			_WindowsPhone = true;
		}
		if(_ua.indexOf('mac os') != -1){
			_Mac = true;
		}
		if(_ua.indexOf('googlebot') != -1 || _ua.indexOf('yahoo') != -1 || _ua.indexOf('msnbot') != -1){
			_bot = true;
		}

		var ua = {
			isIE     : !!_IE,
			isIE6    : (_IEver == 6.0),
			isIE7    : (_IEver == 7.0),
			isIE8    : (_IEver == 8.0),
			isIE9    : (_IEver == 9.0),
			isIE10   : (_IEver == 10.0),
			isIEgt6  : !!(_IEver > 6),
			isIEgt7  : !!(_IEver > 7),
			isIEgt8  : !!(_IEver > 8),
			isIEgt9  : !!(_IEver > 9),
			isIEgt10 : !!(_IEver > 10),
			isIElt6  : !!(_IE && _IEver < 6),
			isIElt7  : !!(_IE && _IEver < 7),
			isIElt8  : !!(_IE && _IEver < 8),
			isIElt9  : !!(_IE && _IEver < 9),
			isIElt10 : !!(_IE && _IEver < 10),

			isiPhone : !!_iPhone ,
			isiPad   : !!_iPad,
			isiPod   : !!_iPod,
			isiOS    : !!(_iPhone || _iPad || _iPod),
			isAndroid       : !!_Android,
			isAndroidMobile	: !!_AndroidMobile,
			isAndroidTablet : !!_AndroidTablet,
			isWindowsPhone : !!_WindowsPhone,
			isSmartPhone   : (!!_iPhone || !!_iPad || !!_iPod || !!_Android || !!_WindowsPhone),
			isMobile       : (!!_iPhone || !!_iPod || !!_AndroidMobile || !!_WindowsPhone),
			isTablet       : (!!_iPad || !!_AndroidTablet),

			isSafari       : !!_Safari,
			isChrome       : !!_Chrome,
			isOpera        : !!_Opera,
			isFireFox      : !!_FireFox,
			isMac          : !!_Mac,

			verIE      : _IEver,
			verFireFox : _FireFoxVer,
			verChrome  : _ChromeVer,
			verSafari  : _SafariVer,
			verOpera   : _OperaVer,
			verAndroid : _AndroidVer,
			veriOS     : _iOSver,

			isBot : !!_bot
		};


		// CSS
		var style  = doc.createElement('div').style;
		var vendor = '';
		var prefix = '';

		var hasRGBA           = false;
		var hasZoom           = ('zoom' in style);
		var hasOpacity        = ('opacity' in style);
		var hasBoxShadow      = ('box-shadow' in style || 'boxShadow' in style);
		var hasBorderRadius   = ('border-radius' in style || 'borderRadius' in style);
		var hasBackgroundSize = ('background-size' in style || 'backgroundSize' in style);
		var hasTransition     = false;
		var hasAnimation      = false;
		var transitionEnd     = false;
		var hasFilter         = false;
		var hasMediaQuery     = false;
		var hasPositionFixed  = false;


		// RGBA
		try{
			style.backgroundColor = 'rgba(255,0,0,0.5)';
			hasRGBA = (style.backgroundColor.indexOf('rgba') == 0);
		}catch(e){}

		// vendor prefix
		prefix = (function(){
			var _vendors = ['o', 'ms', 'moz', 'Moz', 'webkit', ''];

			vendor = '';

			for(var i=1; i<_vendors.length; i++){
				if(_vendors[i] + 'Transform' in style){
					if(_vendors[i] != ''){
						vendor = _vendors[i].toLowerCase();
						return '-' + vendor + '-';
					}else{
						vendor = '';
						return '';
					}
				}
			}
			return '';
		})();

		// transition
		hasTransition = (function(){
			var prefixT = ['oT', 'msT', 'mozT', 'MozT', 'webkitT', 't'];

			for(var i=0; i<prefixT.length; i++){
				var property = prefixT[i] + 'ransition';
				if(property in style){
					style[property] = '';
					style[property] = 'left 1ms linear 1ms';
					if(style[property] != ''){
						if(property.indexOf('webkit') == 0){
							transitionEnd = 'webkitTransitionEnd';
						}else{
							transitionEnd = 'transitionend';
						}
						return true;
					}
				}
			}
			return false;
		})();

		// animation
		hasAnimation = (function(){
			var prefixA = ['oA', 'msA', 'mozA', 'MozA', 'webkitA', 'a'];
			for(var i=0; i<prefixA.length; i++){
				var property = prefixA[i] + 'nimation';
				if(property in style){
					style[property] = '';
					style[property] = 'check 1ms ease 0ms infinite';
					if(style[property] != ''){
						return true;
					}
				}
			}
			return false;
		})();

		// filter
		hasFilter = (function(){
			var prefixF = ['oF', 'msF', 'mozF', 'MozF', 'webkitF', 'f'];
			for(var i=0; i<prefixF.length; i++){
				var property = prefixF[i] + 'ilter';
				if(property in style){
					style[property] = '';
					style[property] = 'blur(10px)';
					if(style[property] != ''){
						if(_IE){
							return (typeof history.pushState === 'function');
						}else{
							return true;
						}

					}
				}
			}
			return false;
		})();

		// media query
		hasMediaQuery = (function(){
			if(window.matchMedia || window.msMatchMedia){
				return ((window.matchMedia || window.msMatchMedia)('all').matches);
			}else{
				var dummyDiv = doc.createElement('div');
				var checkDiv = doc.createElement('div');
				var dummyCSS = '<style>@media all and (min-width: 0px) {#mqdummyelement{position:absolute;}}</style>';
				var head = doc.getElementsByTagName('head')[0];

				dummyDiv.innerHTML = dummyCSS;
				head.appendChild(dummyDiv)

				checkDiv.setAttribute('id', 'mqdummyelement');
				dummyDiv.appendChild(checkDiv);

				var _has = (window.getComputedStyle ? getComputedStyle(checkDiv, null) : checkDiv.currentStyle)['position'] == 'absolute';
				head.removeChild(dummyDiv);

				return _has;
			}
		})();


		// transform
		var transform = {
			'translate'   : '1px, 1px',
			'translate3d' : '1px, 1px, 1px',
			'translateX'  : '1px',
			'translateY'  : '1px',
			'translateZ'  : '1px',
			'scale'       : '0, 0',
			'scale3d'     : '0, 0, 0',
			'scaleX'      : '1',
			'scaleY'      : '1',
			'scaleZ'      : '1',
			'rotate'      : '1deg',
			'rotate3d'    : '1, 1, 1, 1deg',
			'rotateX'     : '1deg',
			'rotateY'     : '1deg',
			'rotateZ'     : '1deg',
			'skew'        : '1deg, 1deg',
			'skewX'       : '1deg',
			'skewY'       : '1deg',
			'matrix'      : '1, 0, 0, 1, 1, 1',
			'matrix3d'    : '1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1',
			'perspective' : '100px'
		};

		if(debugMode == MODE_CSS3 && ('transform' in style || prefix+'transform' in style)){
			for(var property in transform){
				var val = property + '(' + transform[property] + ')';

				style[prefix+'transform'] = '';
				style[prefix+'transform'] = val;

				if(style[prefix+'transform'] != ''){
					transform[property] = true;
				}else{
					transform[property] = false;
				}
			}
		}else{
			for(var property in transform){
				transform[property] = false;
			}
		}

		var css = {
			vendor : vendor,
			prefix : prefix,

			hasRGBA           : hasRGBA,
			hasZoom           : hasZoom,
			hasOpacity        : hasOpacity,
			hasBoxShadow      : hasBoxShadow,
			hasBorderRadius   : hasBorderRadius,
			hasBackgroundSize : hasBackgroundSize,
			hasMediaQuery     : hasMediaQuery,
			hasMediaQueries   : hasMediaQuery,
			hasPositionFixed  : hasPositionFixed,

			transform     : transform,
			hasTransition : (debugMode == MODE_CSS3 ? hasTransition : false),
			hasAnimation  : (debugMode == MODE_CSS3 ? hasAnimation  : false),
			transitionEnd : (debugMode == MODE_CSS3 ? transitionEnd : false),
			hasFilter     : (debugMode == MODE_CSS3 ? hasFilter : false)
		};


		// HTML
		var hasFlash = false;

		try {
			hasFlash = !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
		}catch(e){
			hasFlash = (navigator.mimeTypes ["application/x-shockwave-flash"] != undefined);
		}

		var html = {
			hasFlash  : hasFlash,
			hasCanvas : !!doc.createElement('canvas').getContext,
			hasVideo  : !!doc.createElement('video').canPlayType,
			hasAudio  : !!doc.createElement('audio').canPlayType,
			hasSVG    : !!(doc.createElementNS && doc.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect),
			hasWebGL  : !!window.WebGLRenderingContext,
			hasGeolocation : ('geolocation' in navigator),
			hasWebSocket   : ('WebSocket' in window || 'MozWebSocket' in window),
			hasWebWorkers  : ('Worker' in window)
		};

		// Event
		var event = {
			hasOrientationChange : ('onorientationchange' in window),
			hasHashChange        : ('onhashchange' in window),
			hasDeviceMotion      : ('ondevicemotion' in window),
			hasPropertyChange    : ('onpropertychange' in doc.documentElement)
		};

		// Device
		var device = {
			hasTouch       : ('ontouchstart' in window),
			hasMotion      : ('ondevicemotion' in window),
			hasOrientation : (typeof window.orientation !== 'undefined'),
			pixelRatio     : (window.devicePixelRatio ? window.devicePixelRatio : 1)
		};

		// Utility
		var util = {
			/*
			 * @param n number
			 * @param d digit
			 */
			zeroPad : function(n, d){
				if(typeof d == 'number'){
					var len = (n+'').length;
					if(len < d) for(var i=0; i<d-len; i++) n = '0' + n;
					return n+'';
				}else{
					return n+'';
				}
			},

			reqAF : function(fn){
				var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.setTimeout;

				var t0 = +new Date();
				var pt = t0;

				function update(){
					var t1 = +new Date();
					fn.call(this, t1, t1-pt, t1-t0);
					requestAnimationFrame(update, 30);
					pt = t1;
				}
				requestAnimationFrame(update, 30);
			}
		};


		// cookie
		var cookie = function(){
			var name = arguments[0];

			if(!!name){
				if(arguments.length > 1){
					// write
					var value   = (arguments[1] || '');
					var options = (arguments[2] || {});

					var path    = options.path   ? '; path=' + (options.path) : '';
        			var domain  = options.domain ? '; domain=' + (options.domain) : '';
       				var secure  = options.secure ? '; secure' : '';
					var expires = options.expires ? options.expires : '';

					if(expires != ''){
						var date;

						if(typeof expires == 'number'){
							date = new Date();
							date.setTime(date.getTime() + expires*1000);
						}else if(expires.toUTCString){
							date = expires;
						}else if(typeof expires == 'string'){
							var msec = 0;

							if(expires.match(/^([0-9]+)second(s)?$/)){
								msec = (RegExp.$1-0)*1000;
							}else if(expires.match(/^([0-9]+)minute(s)?$/)){
								msec = (RegExp.$1-0)*60*1000;
							}else if(expires.match(/^([0-9]+)hour(s)?$/)){
								msec = (RegExp.$1-0)*60*60*1000;
							}else if(expires.match(/^([0-9]+)day(s)?$/)){
								msec = (RegExp.$1-0)*24*60*60*1000;
							}else if(expires.match(/^([0-9]+)week(s)?/)){
								msec = (RegExp.$1-0)*7*24*60*60*1000;
							}else if(expires.match(/^([0-9]+)month(s)?$/)){
								msec = (RegExp.$1-0)*30*24*60*60*1000;
							}else if(expires.match(/^([0-9]+)year(s)?$/)){
								msec = (RegExp.$1-0)*365*24*60*60*1000;
							}
							if(msec > 0){
								date = new Date();
								date.setTime(date.getTime() + msec);
							}
						}
						if(date) expires = '; expires=' + date.toUTCString();
					}
					doc.cookie = name + '=' + encodeURIComponent(value) + path + domain + secure + expires;
				}else{
					// read
					if(!!doc.cookie){
						var sp = doc.cookie.split(';');

						for(var i=0; i<sp.length; i++){
							var pair = sp[i].split('=');
							if(jQuery.trim(pair[0]) == name){
								return decodeURIComponent(jQuery.trim(pair[1]));
							}
						}
					}
					return undefined;
				}
			}
		};

		if(Object.freeze) ua = Object.freeze(ua);
		if(Object.freeze) css = Object.freeze(css);
		if(Object.freeze) html = Object.freeze(html);
		if(Object.freeze) event = Object.freeze(event);
		if(Object.freeze) device = Object.freeze(device);

		return {
			ua:ua,
			css:css,
			html:html,
			util:util,
			event:event,
			device:device,
			cookie:cookie
		};
	})();

	// jQueryを使用しない場合
	if(typeof $ == 'undefiend') return;


	var cubicBezierParams = {
		linear : null,
		swing : [0.250, 0.100, 0.250, 1.000],
		easeInQuad : [0.55, 0.085, 0.68, 0.53],
		easeOutQuad : [0.25, 0.460, 0.45, 0.94],
		easeInOutQuad : [0.455, 0.03, 0.515, 0.955],
		easeInCubic : [0.550, 0.055, 0.675, 0.190],
		easeOutCubic : [0.215, 0.610, 0.355, 1.000],
		easeInOutCubic : [0.645, 0.045, 0.355, 1.000],
		easeInQuart : [0.895, 0.030, 0.685, 0.220],
		easeOutQuart : [0.165, 0.840, 0.440, 1.000],
		easeInOutQuart : [0.770, 0.000, 0.175, 1.000],
		easeInQuint : [0.755, 0.050, 0.855, 0.060],
		easeOutQuint : [0.230, 1.000, 0.320, 1.000],
		easeInOutQuint : [0.860, 0.000, 0.070, 1.000],
		easeInSine : [0.470, 0.000, 0.745, 0.715],
		easeOutSine : [0.390, 0.575, 0.565, 1.000],
		easeInOutSine : [0.445, 0.050, 0.550, 0.950],
		easeInExpo : [0.950, 0.050, 0.795, 0.035],
		easeOutExpo : [0.190, 1.000, 0.220, 1.000],
		easeInOutExpo : [1.000, 0.000, 0.000, 1.000],
		easeInCirc : [0.600, 0.040, 0.980, 0.335],
		easeOutCirc : [0.075, 0.820, 0.165, 1.000],
		easeInOutCirc : [0.785, 0.135, 0.150, 0.860],
		easeInBack : [0.600, -0.280, 0.735, 0.045],
		easeOutBack : [0.175, 0.885, 0.320, 1.275],
		easeInOutBack : [0.680, -0.550, 0.265, 1.550]
	};

	function cubicBezier(name){
		if(name in cubicBezierParams){
			var easing = cubicBezierParams[name];

			if(easing != null){
				return 'cubic-bezier('+easing[0]+', '+easing[1]+', '+easing[2]+', '+easing[3]+')';
			}else{
				return 'linear';
			}
		}else{
			return 'linear';
		}
	}

	/*******************************************************************************************************************************
	 * Utility
	 *******************************************************************************************************************************/

	var dummyElement = null;

	var win = $(window);
	var winWidth;
	var winHeight;
	var resizeObservers = null;
	var scrollObservers = null;
	var wheelObservers  = null;

	function startResizeObserver(){
		resizeObservers = [];
		function handler(){
			winWidth = win.width();
			winHeight = win.height();
			for(var i=0; i<resizeObservers.length; i++){
				(resizeObservers[i])(winWidth, winHeight);
			}
		}
		handler();
		if(window.addEventListener){
			window.addEventListener('resize', handler, false);
			window.addEventListener('orientationchange', function(){
				setTimeout(handler, 1000);
			}, false);
		}else{
			window.attachEvent('onresize', handler);
		}
	}

	function startScrollObserver(){
		scrollObservers = [];
		function handler(){
			var top = doc.body.scrollTop || doc.documentElement.scrollTop;
			var bot = top + winHeight;
			for(var i=0; i<scrollObservers.length; i++){
				(scrollObservers[i])(top, bot, winHeight);
			}
		}
		if(window.addEventListener){
			window.addEventListener('scroll', handler, false);
		}else{
			window.attachEvent('onscroll', handler);
		}
	}


	$.extend({
		preload : function(src){
			if(!dummyElement){
				dummyElement = doc.createElement('div');
				dummyElement.style.cssText = 'position:absolute; left:-9999px; top:-9999px; display:none';
				doc.body.appendChild(dummyElement);
			}
			var img = doc.createElement('img');
			img.src = src;
			img.setAttribute('width', 'auto');
			img.setAttribute('height', 'auto');
			dummyElement.appendChild(img);
		},

		addResizeObserver : function(fn){
			if(typeof fn === 'function'){
				if(resizeObservers === null) startResizeObserver();
				resizeObservers.push(fn);
				fn(winWidth, winHeight);
			}
		},

		addScrollObserver : function(fn){
			if(typeof fn === 'function'){
				if(resizeObservers === null) startResizeObserver();
				if(scrollObservers === null) startScrollObserver();
				scrollObservers.push(fn);
				var top = doc.body.scrollTop || doc.documentElement.scrollTop;
				fn(top, top+winHeight, winHeight);
			}
		},

		removeResizeObserver : function(fn){
			if(resizeObservers !== null){
				if(fn){
					for(var i=0; i<resizeObservers.length;) (fn == resizeObservers[i]) ?  resizeObservers.splice(i, 1) : i++;
				}else{
					resizeObservers = [];
				}
			}
		},

		removeScrollObserver : function(fn){
			if(scrollObservers !== null){
				if(fn){
					for(var i=0; i<scrollObservers.length;) (fn == scrollObservers[i]) ? scrollObservers.splice(i, 1) : i++;
				}else{
					scrollObservers = [];
				}
			}
		},

		useVML : function(){
			if(doc.namespaces){
				if(!doc.namespaces['v']){
					if(Shared.ua.isIE8){
						doc.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
					}else{
						doc.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
					}
					doc.createStyleSheet().cssText = "v\\:rect, v\\:fill, v\\:shape, v\\:group, v\\:path, v\\:oval { behavior: url(#default#VML); display:inline-block; margin:0; padding:0; }";
					doc.createStyleSheet().cssText = "._rewrited2vml {visibility:hidden !important; position:absolute !important; top:-9999px !important; left:-9999px !important;}";
				}
				return true;
			}else{
				return false;
			}
		}
	});

	$.fn.extend({

		img2vml : function(){
			if(Shared.ua.isIElt9){
				if(doc.namespaces){
					jQuery.useVML();

					var images = this.filter('img');

					images.each(function(i){
						var img = this;

						if(img.src.indexOf('.png') != img.src.length-4){
							return true;
						}
						if(images.eq(i).hasClass('_rewrited2vml')){
							return true;
						}else{
							images.eq(i).addClass('_rewrited2vml');
						}
						if(Shared.ua.isIElt8){
							images.eq(i).css({visibility:'hidden', position:'absolute', top:'-9999px', left:'-9999px'});
						}
						if(Shared.ua.isIE8){
							var dummy = doc.createElement('div');
							dummy.innerHTML = '<v:rect><v:fill></v:fill></v:rect>';
							var rect = dummy.firstChild;
							var fill = rect.firstChild;
						}else{
							var rect = doc.createElement('v:rect');
							var fill = doc.createElement('v:fill');
							rect.appendChild(fill);
						}
						var w = img.clientWidth;//images.eq(i).attr('width');
						var h = img.clientHeight;//images.eq(i).attr('height');

						fill.src     = img.src;
						fill.type    = 'frame';
						fill.opacity = 1;

						rect.fillcolor    = 'none';
						rect.stroked      = false;
						rect.coorsize     = w+','+h;
						rect.coordorigin  = '0,0';
						rect.style.width  = w + 'px';
						rect.style.height = h + 'px';

						img.parentNode.insertBefore(rect, img);

						fill.color = 'none';

						img.attachEvent('onpropertychange', function(e){
							if(e.propertyName == 'src'){
								fill.src = img.src;
							}
							if(e.propertyName == 'width' || e.propertyName == 'style.width'){
								rect.style.width = img.currentStyle.width;
							}
							if(e.propertyName == 'height' || e.propertyName == 'style.height'){
								rect.style.height = img.currentStyle.height;
							}
						});
					});
				}
			}
			return this;
		},

		ov : function(){
			return this.each(function(){
				if(this.tagName == 'IMG'){
					var self = $(this);
					var area = self;
					var srcOff = self.attr('src');
					var srcOv  = srcOff.replace(/^(.+)(\..+)$/, '$1_ov$2');

					$.preload(srcOff);
					$.preload(srcOv);

					if(self.hasClass('_rewrited2vml')){
						var area = self.siblings('rect');

						if(this.parentNode.tagName == 'A' && this.parentNode.currentStyle['cursor'] == 'auto'){
							this.parentNode.style.cursor = 'pointer';
						}
					}

					area.hover(function(){
						self.attr('src', srcOv);
					}, function(){
						self.attr('src', srcOff);
					});
				}
			});
		},

		clearStyle : function(){
			return this.each(function(){
				this.setAttribute('style', ''); // 空にしてからでないと、chromeで属性名が残る
				this.removeAttribute('style');
			});
		},

		postload : function(fn, attrName){
			var these = this;
			var target = new Array();

			if(!attrName) attrName = 'data-src';

			this.each(function(){
				if(this.getAttribute(attrName)){
					target.push(this);
				}
			});
			if(target.length > 0){
				var success = true;
				var count = 0;

				for(var i=0; i<target.length; i++){
					var src = target[i].getAttribute(attrName);
					target[i].removeAttribute(attrName);

					if(target[i].tagName === 'IMG'){
						target[i].src = src;
					}else{
						target[i].style.backgroundImage = 'url(' + src + ')';
					}
					var img = new Image();

					img.onload = function(){
						if(fn && ++count == target.length) fn(success);
					};
					img.onerror = function(){
						success = false;
						if(fn && ++count == target.length) fn(success);
					};
					img.src = src;
				}
			}else{
				if(fn) fn(false);
			}
			return this;
		},

		loadEnd : function(fn){
			var imgSrc = new Array();
			var success = true;

			this.filter('img').each(function(){
				imgSrc.push(this.src);
			});
			this.find('img').each(function(){
				imgSrc.push(this.src);
			});

			if(imgSrc.length > 0){
				for(var i=0, count=0; i<imgSrc.length; i++){
					var img = new Image();

					img.onload = function(){
						if(++count == imgSrc.length) fn(success);
					};
					img.onerror = function(){
						success = false;
						if(++count == imgSrc.length) fn(success);
					};
					img.src = imgSrc[i];
				}
			}else{
				fn(undefined);
			}
			return this;
		},

		transition : function(prop, duration, easing, delay){
			if(Shared.css.hasTransition){
				if(prop){
					if(!duration) duration = 0;
					if(!easing) easing = 'linear';
					if(!delay) delay = 0;
					if(prop == 'filter') prop = Shared.css.prefix+prop;
					if(prop == 'transform') prop = Shared.css.prefix+prop;

					this.css('transition', prop+' '+duration+'ms '+cubicBezier(easing)+' '+delay+'ms');
					this.css(Shared.css.prefix+'transition', prop+' '+duration+'ms '+cubicBezier(easing)+' '+delay+'ms');
				}else{
					this.css('transition', 'none');
					this.css(Shared.css.prefix+'transition', 'none');
				}
			}
			return this;
		},

		transitionEnd : function(fn, once, property){
			if(Shared.css.transitionEnd){
				if(fn){
					this.each(function(){
						this.addEventListener(Shared.css.transitionEnd, function(e){
							if(e.target == this && (property === undefined || e.propertyName == property || e.propertyName == Shared.css.prefix + property)){
								if(once) this.removeEventListener(Shared.css.transitionEnd, arguments.callee);
								fn.call(this, e);
							}
						}, false);
					});
				}else{
					this.each(function(i){
						this.removeEventListener(Shared.css.transitionEnd);
					});
				}
			}
			return this;
		},

		addTransition : function(prop, duration, easing, delay){
			if(Shared.css.hasTransition){
				if(!prop) prop = 'all';
				if(!duration) duration = 0;
				if(!easing) easing = 'linear';
				if(!delay) delay = 0;
				if(prop == 'transform') prop = Shared.css.prefix + 'transform';

				this.each(function(){
					var t = $.data(this, 'transition') || {};
					var s = '';
					var n = prop+' '+duration+'ms '+cubicBezier(easing)+' '+delay+'ms';
					var a = [], i = 0;

					if(prop == 'all'){
						t = {'all':n};
					}else{
						t[prop] = n;
					}
					for(var k in t){
						a[i++] = t[k];
					}
					this.style['transition'] = a.join(',');

					if(Shared.css.prefix != ''){
						this.style[Shared.css.prefix+'transition'] = a.join(',');
					}
					$.data(this, 'transition', t);
				});
			}
			return this;
		},

		removeTransition : function(prop){
			if(Shared.css.hasTransition){
				if(!prop) prop = 'all';
				if(prop == 'transform') prop = Shared.css.prefix + 'transform';

				this.each(function(){
					if(prop == 'all'){
						this.style['transition'] = '';

						if(Shared.css.prefix != ''){
							this.style[Shared.css.prefix+'transition'] = '';
						}
						$.data(this, 'transition', {});

					}else{
						var t = $.data(this, 'transition') || {};
						var a = [];

						for(var k in t){
							if(k == prop){
								delete t[prop];
							}else{
								a.push(t[k]);
							}
						}
						this.style['transition'] = a.join(',');

						if(Shared.css.prefix != ''){
							this.style[Shared.css.prefix+'transition'] = a.join(',');
						}
						$.data(this, 'transition', t);
					}
				});
			}
			return this;
		},

		setPerspective : function(number){
			if(Shared.css.transform.perspective){
				this.each(function(){
					var transform = $.data(this, 'transform') || Shared.css.getTransformTemplate();

					transform.perspective = number;

					$.data(this, 'transform', transform);
				});
			}
			return this;
		},

		transform : function(){
			if(arguments.length > 0){
				this.css(Shared.css.prefix+'transform', arguments[0]);
			}else{
				this.css(Shared.css.prefix+'transform', '');
			}
			return this;
		},

		translate3d : function(x, y, z){
			if(arguments.length > 0){
				if(x === undefined) x = 0;
				if(y === undefined) y = 0;
				if(z === undefined) z = 0;

				if(Shared.css.transform.translate3d){
					this.css(Shared.css.prefix+'transform', 'translate3d('+x+'px,'+y+'px,'+z+'px)');
				}else if(Shared.css.transform.translate){
					this.css(Shared.css.prefix+'transform', 'translate('+x+'px,'+y+'px)');
				}
			}else{
				if(Shared.css.transform.translate3d){
					this.css(Shared.css.prefix+'transform', '');
				}else if(Shared.css.transform.translate){
					this.css(Shared.css.prefix+'transform', '');
				}
			}
			return this;
		},

		transformOrigin : function(x, y){
			if(typeof x === 'number') x += 'px';
			if(typeof y === 'number') y += 'px';

			if(Shared.css.transform.translate){
				this.css('transform-origin', x+' '+y);

				if(Shared.css.prefix !== ''){
					this.css(Shared.css.prefix+'transform-origin', x+' '+y);
				}
			}
			return this;
		},

		matrix : function(a, b, c, d, x, y){
			if(!x) x = 0;
			if(!y) y = 0;

			if(arguments.length == 0){
				a = d = 1;
				b = c = x = y = 0;
			}
			if(Shared.css.transform.matrix){
				this.css(Shared.css.prefix+'transform', 'matrix('+a+','+b+','+c+','+d+','+x+','+y+')');
			}else{
				this.css('filter', "progid:DXImageTransform.Microsoft.Matrix(M11="+a+", M12="+c+", M21="+b+", M22="+d+", SizingMethod='auto expand')");
			}
			return this;
		},

		cssAnimation : function(name, duration, easing, delay, iteration){

			if(arguments.length == 0){
				return this.css(Shared.css.prefix+'animation', '');
			}else{
				if(!delay){
					delay = 0;
				}
				if(!iteration){
					iteration = 'infinite';
				}
				return this.css(Shared.css.prefix+'animation', name+' '+duration+'ms '+delay+'ms '+cubicBezier(easing)+' '+iteration);
			}
		},

		rotateZ : function(deg, duration, easing, fn){
			if(Shared.css.transform.rotateZ){
				this.css(Shared.css.prefix+'transform', 'rotateZ('+deg+'deg)');
			}else if(Shared.css.transform.rotate){
				this.css(Shared.css.prefix+'transform', 'rotate('+deg+'deg)');
			}else{
				var cos = Math.cos(deg*Math.PI/180);
				var sin = Math.sin(deg*Math.PI/180);
				var that = this;

				return this.each(function(i){
					var w  = that.eq(i).outerWidth();
					var h  = that.eq(i).outerHeight();
					var mx = (w*cos + h*sin) - w;
					var my = (w*sin + h*cos) - h;
					//that.eq(i).css({marginLeft:-mx/2, marginTop:-my/2});
					this.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+cos+", M12="+(sin)+", M21="+(-sin)+", M22="+cos+", SizingMethod='auto expand')";
				});
			}
			return this;
		}
	});

})(jQuery);
