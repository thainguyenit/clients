
/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
(function($){
	$.cookie = function(name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        // CAUTION: Needed to parenthesize options.path and options.domain
	        // in the following expressions, otherwise they evaluate to undefined
	        // in the packed version for some reason...
	        var path = options.path ? '; path=' + (options.path) : '';
	        var domain = options.domain ? '; domain=' + (options.domain) : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};
})(jQuery);


(function($){

	var doc = document;

	window.Shared = (function(){
		var _ua = window.navigator.userAgent.toLowerCase(),
		    _IE, _IEver,
		    _Edge,
		    _Chrome, _ChromeVer,
		    _FireFox, _FireFoxVer,
		    _Safari, _SafariVer,
		    _Opera, _OperaVer,
		    _Mac, _iPhone, _iPad, _iPod, _iOSver,
		    _Android, _AndroidMobile, _AndroidTablet, _AndroidVer,
		    _WindowsPhone,
		    _WindowsPC,
			_bot;

		// ブラウザ判定
		if (_ua.indexOf("msie") != -1){
			_IE = true;
			_ua.match(/msie (\d+\.\d)/);
			_IEver = parseFloat(RegExp.$1);

		}else if(_ua.indexOf("trident") != -1){
			_IE = true;
			_ua.match(/rv\:?(\d+\.\d)/);
			_IEver = parseFloat(RegExp.$1);

		}else if(_ua.indexOf("applewebkit") != -1 && _ua.indexOf("edge") != -1){
			_Edge = true;
			_ua.match(/edge\:?(\d+\.\d)/);
			_EdgeVer = parseFloat(RegExp.$1);

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

		// 携帯端末
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

		}else if (_ua.indexOf("android")       != -1){
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

		if(_ua.indexOf('windows') != -1){
			if(_ua.indexOf('phone') == -1){
				_WindowsPC = true;
			}
		}
		// クローラー系
		if(_ua.indexOf('googlebot') != -1 || _ua.indexOf('yahoo') != -1 || _ua.indexOf('msnbot') != -1){
			_bot = true;
		}

		var ua = {
			isIE     : (_IE),
			isIE6    : (_IEver == 6.0),
			isIE7    : (_IEver == 7.0),
			isIE8    : (_IEver == 8.0),
			isIE9    : (_IEver == 9.0),
			isIE10   : (_IEver == 10.0),
			isIE11   : (_IEver == 11.0),
			isIEgt6  : (_IEver > 6),
			isIEgt7  : (_IEver > 7),
			isIEgt8  : (_IEver > 8),
			isIEgt9  : (_IEver > 9),
			isIEgt10 : (_IEver > 10),
			isIEgt11 : (_IEver > 11),
			isIElt6  : (_IE && _IEver < 6),
			isIElt7  : (_IE && _IEver < 7),
			isIElt8  : (_IE && _IEver < 8),
			isIElt9  : (_IE && _IEver < 9),
			isIElt10 : (_IE && _IEver < 10),
			isIElt11 : (_IE && _IEver < 11),

			isEdge   : (_Edge),
			isMS     : (_IE || _Edge),

			isiPhone        : _iPhone ,
			isiPad          : _iPad,
			isiPod          : _iPod,
			isiOS           : (_iPhone || _iPad || _iPod),
			isAndroid       : _Android,
			isAndroidMobile	: _AndroidMobile,
			isAndroidTablet : _AndroidTablet,
			isWindowsPhone  : _WindowsPhone,
			isSmartPhone    : (_iPhone || _iPad || _iPod || _Android || _WindowsPhone),

			isMobile : (_iPhone || _iPod || _AndroidMobile || _WindowsPhone),
			isTablet : (_iPad || _AndroidTablet),
			isDesktop     : (!(_iPhone || _iPod || _AndroidMobile || _WindowsPhone || _iPad || _AndroidTablet)),

			isSafari  : _Safari,
			isChrome  : _Chrome,
			isOpera   : _Opera,
			isFireFox : _FireFox,
			isMac     : _Mac,
			isWin     : _WindowsPC,

			verIE      : _IEver,
			verFireFox : _FireFoxVer,
			verChrome  : _ChromeVer,
			verSafari  : _SafariVer,
			verOpera   : _OperaVer,
			verAndroid : _AndroidVer,
			veriOS     : _iOSver,

			isBot : _bot
		};

		//console.log(ua)



		// CSS機能判定
		var style  = doc.createElement('div').style;
		var vendor = false;
		var transitionEnd = false;

		var hasOpacity        = false;
		var hasTransform      = false;
		var hasTranslate3d    = false; // translate3dが使えるよ
		var hasTranslate2d    = false; // translateが使えるよ
		var hasTransition     = false; // transitionが使えるよ
		var hasBackgroundSize = false; // background-sizeが効くよ
		var hasBorderRadius   = false; // border-radiusが使えるよ
		var hasZoom           = false;

		if('opacity' in style){
			hasOpacity = true;
		}
		if('transform' in style){
			vendor = '';
			style.transform = 'translate(1px, 1px)';
			if(style.transform != '') hasTranslate2d = true;
			style.transform = 'translate3d(1px, 1px, 1px)';
			if(style.transform != '') hasTranslate3d = true;
		}
		if('transition' in style){
			style.transition = 'opacity 0ms linear 0ms';
			if(style.transition != ''){
				hasTransition = true;
				transitionEnd = 'transitionend';
			}
		}
		if('msTransform' in style){
			vendor = '-ms-';
			style.msTransform = 'translate(1px, 1px)';
			if(style.msTransform != '') hasTranslate2d = true;
			style.msTransform = 'translate3d(1px, 1px, 1px)';
			if(style.msTransform != '') hasTranslate3d = true;
		}
		if(_IEver > 9 && 'msTransition' in style){
			style.msTransition = 'opacity 0ms linear 0ms';
			if(style.msTransition != ''){
				hasTransition = true;
				transitionEnd = 'transitionend';
			}
		}
		if('MozTransform' in style){
			vendor = '-moz-';
			style.MozTransform = 'translate(1px, 1px)';
			if(style.MozTransform != '') hasTranslate2d = true;
			style.MozTransform = 'translate3d(1px, 1px, 1px)';
			if(style.MozTransform != '') hasTranslate3d = true;
		}
		if('MozTransition' in style){
			style.MozTransition = 'opacity 0ms linear 0ms';
			if(style.MozTransition != ''){
				hasTransition = true;
				transitionEnd = 'transitionend';
			}
		}
		if('webkitTransform' in style){
			vendor = '-webkit-';
			style.webkitTransform = 'translate(1px, 1px)';
			if(style.webkitTransform != '') hasTranslate2d = true;
			style.webkitTransform = 'translate3d(1px, 1px, 1px)';
			if(style.webkitTransform != '') hasTranslate3d = true;
		}
		if('webkitTransition' in style){
			style.webkitTransition = 'opacity 0ms linear 0ms';
			if(style.webkitTransition != ''){
				hasTransition = true;
				transitionEnd = 'webkitTransitionEnd';
			}
		}
		if('background-size' in style || 'backgroundSize' in style){
			hasBackgroundSize = true;
		}
		if('border-radius' in style || 'borderRadius' in style){
			hasBorderRadius = true;
		}
		if('zoom' in style){
			hasZoom = true;
		}

		if(_IEver == 9 || _Opera){
			hasTranslate3d = false;
		}

		var css = {
			vendor : vendor,
			hasZoom : hasZoom,
			hasOpacity : hasOpacity,
			hasTransition : hasTransition,
			hasTranslate2d : hasTranslate2d,
			hasTranslate3d : hasTranslate3d,
			hasBackgroundSize : hasBackgroundSize,
			hasBorderRadius : hasBorderRadius,
			transitionEnd : transitionEnd
		};

		// HTML機能判定
		var hasCanvas = false;
		var hasTouch  = false;

		var canvas = doc.createElement('canvas');

		if(canvas && canvas.getContext){
			hasCanvas = true;
		}
		if('ontouchstart' in window){
			hasTouch = true;
		}

		var html = {
			hasCanvas : hasCanvas,
			hasTouch  : hasTouch
		};

		return {
			ua:ua,
			css:css,
			html:html
		};
	})();

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

	// プリロード画像を入れるダミー要素
	var dummyElement = doc.createElement('div');
	dummyElement.style.cssText = 'position:absolute; left:-9999px; top:-9999px; display:none';
	$(function(){
		doc.body.appendChild(dummyElement);
	});

	// イベント制御
	var win = $(window);
	var winWidth;
	var winHeight;
	var resizeObservers = null;
	var scrollObservers = null;

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
			var t = doc.body.scrollTop || doc.documentElement.scrollTop;
			var l = doc.body.scrollLeft || doc.documentElement.scrollLeft;
			var b = t + winHeight;
			var r = l + winWidth;

			for(var i=0; i<scrollObservers.length; i++){
				(scrollObservers[i])(t, b, l, r);
			}
		}
		if(window.addEventListener){
			window.addEventListener('scroll', handler, false);
		}else{
			window.attachEvent('onscroll', handler);
		}
	}

	$.extend({
		/**
		 * 画像のプリロード関数。
		 * (new Image()).src = *** は、古いIEで効かない
		 * @param src:string 画像のソース
		 */
		preload : function(src){
			var img = doc.createElement('img');
			img.src = src;
			img.setAttribute('width', 'auto');
			img.setAttribute('height', 'auto');
			dummyElement.appendChild(img);
		},

		addResizeObserver : function(fn){
			if(typeof fn === 'function'){
				if(resizeObservers === null) startResizeObserver();
				fn(winWidth, winHeight);
				resizeObservers.push(fn);
			}
		},

		addScrollObserver : function(fn){
			if(typeof fn === 'function'){
				if(resizeObservers === null) startResizeObserver();
				if(scrollObservers === null) startScrollObserver();
				scrollObservers.push(fn);

				var t = doc.body.scrollTop || doc.documentElement.scrollTop;
				var l = doc.body.scrollLeft || doc.documentElement.scrollLeft;
				var b = t + winHeight;
				var r = l + winWidth;

				fn(t, b, l, r);
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
					doc.createStyleSheet().cssText = "v\\:rect, v\\:fill, v\\:shape, v\\:group, v\\:path { behavior: url(#default#VML); display:inline-block; margin:0; padding:0; }";
					doc.createStyleSheet().cssText = "._rewrited2vml {visibility:hidden !important; position:absolute !important; top:-9999px !important; left:-9999px !important;}";
				}
				return true;
			}else{
				return false;
			}
		},

		windowSizeChanged : function(fn1, fn2){
			var narrow = null;

			$.addResizeObserver(function(w){
				if(narrow === null){
					if(w > 767){
						narrow = false;
						fn1();
					}else{
						narrow = true;
						fn2();
					}
				}else{
					if(narrow){
						if(w > 767){
							narrow = false;
							fn1();
						}
					}else{
						if(w <= 767){
							narrow = true;
							fn2();
						}
					}
				}
			});
		},

		viewport : function(content, override){
			var metas = doc.getElementsByTagName('meta');
			var meta;

			for(var i=0; i<metas.length; i++){
				if(metas[i].name == 'viewport'){
					meta = metas[i];
					break;
				}
			}
			if(!meta || override === undefined || !!override){
				if(!meta){
					meta = doc.createElement('meta');
					meta.name = 'viewport';
					metas[0].parentNode.insertBefore(meta, metas[metas.length-1].nextSibling);
				}
				meta.content = content;
			}
		}
	});

	$.fn.extend({

		/**
		 * 画像vml書き換え関数。
		 * IE8以下で、png画像のフェードを行う場合に予め使用する。
		 * imgタグのsrc、サイズを変化させると、vmlも自動で変化する。
		 * ただし、imgのスタイルを変化させても、vmlは変化しない。
		 */
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
						if(Shared.ua.isIE6){
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
						}
						var w = img.clientWidth;//images.eq(i).attr('width');
						var h = img.clientHeight;//images.eq(i).attr('height');

						fill.src     = img.src;
						fill.type    = 'frame';
						fill.opacity = 1;

						rect.style.top    = '-1px';
						rect.style.left   = '-1px';
						rect.fillcolor    = 'none';
						rect.stroked      = false;
						rect.coorsize     = w+','+h;
						rect.coordorigin  = '0,0';
						rect.style.width  = w + 'px';
						rect.style.height = h + 'px';
						rect.style.clip   = 'rect(2px 2px '+w+'px '+h+'px)';
						rect.appendChild(fill);

						if(Shared.ua.isIE8){
							rect.style.position = 'relative';
						}
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

		/**
		 * マウスオーバーによる画像の変更を行う関数。vml対応。
		 * 元の画像名に、_ovを付けた画像を用意すること。ないとエラーが出るよ。
		 */
		ov : function(){
			return this.each(function(){
				if(this.tagName.toLowerCase() == 'img'){
					var self = $(this);
					var area = self;
					var srcOff = self.attr('src');
					var srcOv  = srcOff.replace(/^(.+)(\..+)$/, '$1_ov$2');

					$.preload(srcOff);
					$.preload(srcOv);

					if(self.hasClass('_rewrited2vml')){
						var area = self.siblings('rect');

						// aタグのカーソルが指にならないバグの対策
						if(this.parentNode.tagName == 'A' && this.parentNode.currentStyle['cursor'] == 'auto'){
							this.parentNode.style.cursor = 'pointer';
						}
					}

					if(Shared.html.hasTouch){
						area.bind('touchstart', function(){
							self.attr('src', srcOv);
						});
						area.bind('touchend touchcancel', function(){
							self.attr('src', srcOff);
						});
					}else{
						area.hover(function(){
							self.attr('src', srcOv);
						}, function(){
							self.attr('src', srcOff);
						});
					}
				}
			});
		},

		hashLink : function(){
			return this.each(function(){
				if(this.tagName == 'A'){
					var url = this.href;

					if(url.indexOf('#') != -1){
						var hash = this.href.split('#')[1];
						var target = $('#'+hash);

						$(this).bind('click', function(e){
							e.preventDefault();

							var top = target.length > 0 ? target.offset().top : 0;
							var sct = document.body.scrollTop || document.documentElement.scrollTop;
							var dur = Math.abs(top-sct);

							if(dur > 500) dur = 500;

							$('html,body').animate({scrollTop:top}, dur, 'easeOutQuart');
						});
					}
				}
			});
		},

		/**
		 * 画像読み込み待機関数。
		 * セレクタで指定した要素内の、全画像ロード完了後に引数のコールバック関数を実行する。
		 * @param fn:function コールバック関数。全て成功した場合は、引数true。
		 */
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

		/**
		 * インラインスタイルのリセット
		 */
		clearStyle : function(){
			return this.removeTransition().each(function(){
				this.setAttribute('style', '');
				this.removeAttribute('style');
			});
		},

		postload : function(fn){
			var these = this;
			var target = new Array();

			if(Shared.ua.isMobile){
				this.each(function(){
					var srcSp = this.getAttribute('data-src-sp');

					if(srcSp){
						this.setAttribute('data-src', srcSp);
						this.removeAttribute('data-src-sp');
						target.push(this);
					}else if(this.getAttribute('data-src')){
						target.push(this);
					}
				});
			}else{
				this.each(function(){
					if(this.getAttribute('data-src')){
						target.push(this);
					}
				});
			}

			if(target.length > 0){
				var count = 0;

				for(var i=0; i<target.length; i++){
					var img = new Image();

					$(img).on('load', function(){
						if(++count == target.length){
							for(var j=0; j<target.length; j++){
								if(target[j].tagName == 'IMG'){
									target[j].src = target[j].getAttribute('data-src');
								}else{
									target[j].style.backgroundImage = 'url(' + target[j].getAttribute('data-src') + ')';
								}
								target[j].removeAttribute('data-src');
							}
							if(fn) fn(true);
						}
					});
					img.src = target[i].getAttribute('data-src');

					dummyElement.appendChild(img);
				}
			}else{
				fn(false);
			}
			return this;
		},

		/**
		 * 画像読み込み待機関数。
		 * セレクタで指定した要素内の、全画像ロード完了後に引数のコールバック関数を実行する。
		 * @param fn:function コールバック関数。全て成功した場合は、引数true。
		 */
		loadEnd : function(fn){
			var imgSrc = new Array();
			var success = true;

			this.filter('img').each(function(){
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

		/**
		 * CSS3のtransition指定関数
		 * @param prop:string     対象プロパティ。省略した場合は、all
		 * @param duration:number 変化にかかる時間。単位はミリ秒。
		 * @param easing:string   イージング関数名。ほとんどのjQuery.easingが使用可能。
		 * @param delay:number    変化開始の遅延時間。単位はミリ秒。
		 */
		transition : function(prop, duration, easing, delay){
			if(Shared.css.hasTransition){
				if(!prop) prop = 'all';
				if(!duration) duration = 0;
				if(!easing) easing = 'linear';
				if(!delay) delay = 0;
				if(prop == 'transform') prop = Shared.css.vendor+prop;

				this.css('transition', prop+' '+duration+'ms '+cubicBezier(easing)+' '+delay+'ms');
				this.css(Shared.css.vendor+'transition', prop+' '+duration+'ms '+cubicBezier(easing)+' '+delay+'ms');
			}
			return this;
		},

		transitionEnd : function(fn, once){
			if(fn){
				var self = this;

				return this.each(function(i){
					self.eq(i).bind(Shared.css.transitionEnd, function(e){
						if(e.target == this){
							if(once) self.eq(i).unbind(Shared.css.transitionEnd, arguments.callee);
							fn.call(this, e);
						}
					});
				});
			}else{
				return this.unbind(Shared.css.transitionEnd);
			}
		},

		transform : function(text){
			if(Shared.css.vendor !== false){
				this.css('transform', text);
				this.css(Shared.css.vendor+'transform', text);
			}
			return this;
		},

		/**
		 * CSS3のtransition追加関数
		 * @param prop:string     対象プロパティ。省略した場合は、all。allの場合は、他を全て上書き
		 * @param duration:number 変化にかかる時間。単位はミリ秒。
		 * @param easing:string   イージング関数名。ほとんどのjQuery.easingが使用可能。
		 * @param delay:number    変化開始の遅延時間。単位はミリ秒。
		 */
		addTransition : function(prop, duration, easing, delay){
			if(Shared.css.hasTransition){
				if(!prop) prop = 'all';
				if(!duration) duration = 0;
				if(!easing) easing = 'linear';
				if(!delay) delay = 0;
				if(prop == 'transform') prop = Shared.css.vendor + 'transform';

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

					if(Shared.css.vendor != ''){
						this.style[Shared.css.vendor+'transition'] = a.join(',');
					}
					$.data(this, 'transition', t);
				});
			}
			return this;
		},

		/**
		 * CSS3のtransition削除関数
		 * @param prop:string     対象プロパティ。省略した場合は、all。allの場合は、全削除。
		 */
		removeTransition : function(prop){
			if(Shared.css.hasTransition){
				if(!prop) prop = 'all';
				if(prop == 'transform') prop = Shared.css.vendor + 'transform';

				this.each(function(){
					if(prop == 'all'){
						this.style['transition'] = '';

						if(Shared.css.vendor != ''){
							this.style[Shared.css.vendor+'transition'] = '';
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

						if(Shared.css.vendor != ''){
							this.style[Shared.css.vendor+'transition'] = a.join(',');
						}
						$.data(this, 'transition', t);
					}
				});
			}
			return this;
		},

		/**
		 * CSS3のtransfrom:translate3d指定関数。
		 * translate3dが使えない場合、translateを指定
		 * @param x:number x軸方向の移動量(pxは省略すること)
		 * @param y:number y軸方向の移動量(pxは省略すること)
		 * @param z:number z軸方向の移動量(pxは省略すること)
		 */
		translate3d : function(x, y, z){
			if(x == undefined) x = 0;
			if(y == undefined) y = 0;
			if(z == undefined) z = 0;

			if(Shared.css.hasTranslate3d){
				this.css(Shared.css.vendor+'transform', 'translate3d('+x+'px,'+y+'px,'+z+'px)');
			}else if(Shared.css.hasTranslate2d){
				this.css(Shared.css.vendor+'transform', 'translate('+x+'px,'+y+'px)');
			}
			return this;
		},

		transformOrigin : function(x, y){
			if(typeof x == 'number') x += 'px';
			if(typeof y == 'number') y += 'px';

			if(Shared.css.hasTranslate2d){
				this.css('transform-origin', x+' '+y);

				if(Shared.css.vendor !== ''){
					this.css(Shared.css.vendor+'transform-origin', x+' '+y);
				}
			}
			return this;
		},

		/**
		 * CSS3のmatrix指定関数。
		 * @param a:number x軸方向のスケール変化
		 * @param b:number skew
		 * @param c:number skey
		 * @param d:number y軸方向のスケール変化
		 * @param x:number x軸方向の移動量
		 * @param y:number y軸方向の移動量
		 */
		matrix : function(a, b, c, d, x, y){
			if(!x) x = 0;
			if(!y) y = 0;

			if(arguments.length == 0){
				a = d = 1;
				b = c = x = y = 0;
			}
			if(Shared.css.hasTranslate2d){
				this.css(Shared.css.vendor+'transform', 'matrix('+a+','+b+','+c+','+d+','+x+','+y+')');
			}else{
				this.css('filter', "progid:DXImageTransform.Microsoft.Matrix(M11="+a+", M12="+c+", M21="+b+", M22="+d+", SizingMethod='auto expand')");
			}
			return this;
		},

		cssAnimation : function(name, duration, easing, delay, iteration){

			if(arguments.length == 0){
				return this.css(Shared.css.vendor+'animation', '');
			}else{
				if(!delay){
					delay = 0;
				}
				if(!iteration){
					iteration = 'infinite';
				}
				return this.css(Shared.css.vendor+'animation', name+' '+duration+'ms '+delay+'ms '+easing+' '+iteration);
			}
		},

		rotateZ : function(deg, duration, easing, fn){
			if(Shared.css.hasTranslate3d){
				this.css(Shared.css.vendor+'transform', 'rotateZ('+deg+'deg)');
			}else if(Shared.css.hasTranslate2d){
				this.css(Shared.css.vendor+'transform', 'rotate('+deg+'deg)');
			}
			return this;
		},

		// VML対応フェード関数(delay対応)
		opacity : function(opacity, duration, easing, fn){
			return this.each(function(){

				var self = $(this);
				var fill = this.getElementsByTagName('fill');

				if(!duration){
					if(fill.length > 0){
						for(var i=0; i<fill.length; i++){
							fill[i].opacity = (opacity > 0 ? opacity : 0.001);
						}
					}else{
						self.css({opacity:opacity});
					}
					return true;
				}

				if(fill.length > 0){
					var from = fill[0].opacity;

					self.queue(function(){
						$(doc.createElement('div')).css({top:from*1000}).animate({top:opacity*1000}, {duration:duration, easing:easing,
							complete:function(){
								if(fn){
									fn.call(self);
								}
								self.dequeue();
							},
							step:function(op){
								op /= 1000;
								if(op <= 0) op = 0.001;
								if(op >= 1) op = 1.0;

								for(var i=0; i<fill.length; i++){
									fill[i].opacity = op;
								}
							}
						});
					});
				}else{
					if(Shared.css.hasTransition){
						self.queue(function(){
							$(this).transition('opacity', duration, easing).css({opacity:opacity});

							setTimeout(function(){
								if(fn){
									fn.call(self);
								}
								self.dequeue();

							}, duration);
						});
					}else{
						$(this).animate({opacity:opacity}, {duration:duration, easing:easing, complete:fn});
					}
				}
			});
		},

		rotateSlide : function(options){
			var holder = this;
			var items  = this.find('.item');
			var next   = options.next ? $(options.next) : null;
			var prev   = options.prev ? $(options.prev) : null;
			var thumbs = options.thumbs ? $(options.thumbs) : null;
			var curr   = options.current || 0;
			var timerID = null;
			var moveX  = 800;

			var outL = 'rotateY(-30deg) rotateX(60deg) rotateZ(15deg) scale(0.5)';
			var outR = 'rotateY(30deg) rotateX(-60deg) rotateZ(-15deg) scale(0.5)';
			var interL = 'rotateY(-10deg) rotateX(20deg) rotateZ(0deg) scale(0.8)';
			var interR = 'rotateY(10deg) rotateX(-20deg) rotateZ(0deg) scale(0.8)';
			var delay  = 80;

			if(Shared.html.hasTouch){
				outL = 'rotateY(-40deg) rotateX(70deg) rotateZ(30deg) scale(0.5) translate3d(-1800px, 0, 0)';
				outR = 'rotateY(40deg) rotateX(-70deg) rotateZ(-30deg) scale(0.5) translate3d(1800px, 0, 0)';
				interL = 'rotateY(-10deg) rotateX(20deg) rotateZ(0deg) scale(0.8) translate3d(0, 0, 0)';
				interR = 'rotateY(10deg) rotateX(-20deg) rotateZ(0deg) scale(0.8) translate3d(0, 0, 0)';
				moveX = 0;
			}


			// 初期化
			items.each(function(i){
				var left = 0;

				if(i < curr){
					items.eq(i).transform(outL);
					left = -800;
				}
				if(i > curr){
					items.eq(i).transform(outR);
					left = 800;
				}
				if(Shared.html.hasTouch){
					left = 0;
				}
				items.eq(i).css({
					opacity : 0,
					left    : left,
					display : 'block'
				});
			});

			if(Shared.css.hasTransition){
				setTimeout(function(){
					items.eq(curr).transition('all', 1000, 'easeInOutQuart').css({opacity:1});
				}, 30);
			}else{
				items.eq(curr).animate({opacity:1}, 1000, 'easeInOutQuart');
			}

			function move(to){
				if(to < 0) to = items.length-1;
				if(to > items.length-1) to = 0;

				if(to == curr || holder.hasClass('disabled')) return;

				if(timerID){
					clearTimeout(timerID);
				}

				var num = Math.abs(curr-to);

				if(num == 1){
					if(to > curr){
						items.eq(curr).transition('all', 1000, 'easeInOutQuart').transform(outL).css({left:-moveX, opacity:0});
					}else{
						items.eq(curr).transition('all', 1000, 'easeInOutQuart').transform(outR).css({left:moveX, opacity:0});
					}
					items.eq(to).transition('all', 1000, 'easeInOutQuart').transform('').css({left:0, opacity:1});
				}else{
					holder.addClass('disabled');

					if(to > curr){
						items.eq(curr).transition('all', 800, 'easeInOutQuart').transform(outL).css({left:-moveX, opacity:0});

						for(var i=curr+1, j=1; i<to; i++,j++){
							items.eq(i).transition('all', 500, 'easeInQuart', j*delay).transform(interL).css({left:0, opacity:0.8}).transitionEnd(function(){
								$(this).transitionEnd().transition('all', 500, 'easeOutQuart').transform(outL).css({left:-moveX, opacity:0});
							});
						}
					}else{
						items.eq(curr).transition('all', 800, 'easeInOutQuart').transform(outR).css({left:moveX, opacity:0});

						for(var i=curr-1, j=1; i>to; i--,j++){
							items.eq(i).transition('all', 500, 'easeInQuart', j*delay).transform(interR).css({left:0, opacity:0.8}).transitionEnd(function(){
								$(this).transitionEnd().transition('all', 500, 'easeOutQuart').transform(outR).css({left:moveX, opacity:0});
							});
						}
					}
					items.eq(to).transition('all', 1000, 'easeInOutQuart', num*delay).transform('').css({left:0, opacity:1}).transitionEnd(function(){
						$(this).transitionEnd();
						holder.removeClass('disabled');
					});
				}
				if(options.timer){
					timerID = setTimeout(function(){
						move(curr+1);
					}, options.timer);
				}
				if(options.callback){
					(options.callback)(to, curr);
				}
				curr = to;
			}

			if(next){
				next.bind('click', function(e){
					e.preventDefault();
					move(curr+1);
				});
			}
			if(prev){
				prev.bind('click', function(e){
					e.preventDefault();
					move(curr-1);
				});
			}
			if(thumbs){
				thumbs.each(function(i){
					thumbs.eq(i).bind('click', function(e){
						e.preventDefault();
						move(i);
					});
				});
			}
			if(options.timer){
				timerID = setTimeout(function(){
					move(curr+1);
				}, options.timer);
			}
			holder.data({
				doSlide : move
			});
		},

		moveSlide : function(options){
			var slider = this;
			var holder = slider.find('.holder');
			var items  = holder.find('.item');
			var next   = options.next ? $(options.next) : null;
			var prev   = options.prev ? $(options.prev) : null;
			var thumbs = options.thumbs ? $(options.thumbs) : null;
			var curr   = options.current || 0;
			var loop   = (options.loop === undefined ? true : options.loop);
			var width  = items.eq(0).width();
			var height = holder.height();
			var timerID = null;

			var dummyElement = $('<div></div>');

			var useTransition = Shared.css.hasTransition && (options.css3 === undefined || options.css3);



			var xyBool = false;

			// 初期化
			for(var i=0; i<items.size(); i++){
				items.eq(i).css({left:i*width});
			}
			if(useTransition){
				holder.transition().transform('all', 0).css({position:'relative'}).translate3d(-curr*width);
			}else{
				holder.css({left:-curr*width});
			}
			dummyElement.css({left:-curr*width});

			// サイズ変更処理
			if(options.resize){
				jQuery.addResizeObserver(function(w, h){
					width = items.eq(0).width();

					for(var i=0; i<items.size(); i++){
						items.eq(i).css({left:i*width});//.transition().translate3d();
					}
					if(useTransition){
						holder.transition().transform('all', 0).translate3d(-curr*width);
					}else{
						holder.stop().css({left:-curr*width});
					}
					dummyElement.stop().css({left:-curr*width});

					setTimer();
				});
			}

			function setTimer(){
				if(options.timer){
					if(timerID){
						clearTimeout(timerID);
					}
					timerID = setTimeout(function(){
						move(curr+1);
					}, options.timer);
				}
			}

			function move(to){
				if(loop){
					if(to < 0) to = items.length-1;
					if(to > items.length-1) to = 0;
				}else{
					if(to < 0) to = 0;
					if(to > items.length-1) to = items.length-1;
				}

				if(holder.hasClass('disabled')) return;

				setTimer();

				if(useTransition){
					holder.transition('all', 1000, 'easeInOutQuart').translate3d(-to*width);
				}else{
					holder.stop().animate({left:-to*width}, 1000, 'easeInOutQuart');
				}
				dummyElement.stop().animate({left:-to*width}, 1000, 'easeInOutQuart');

				if(options.callback){
					(options.callback)(to, curr);
				}
				curr = to;
			}
			if(next){
				next.bind('click', function(e){
					e.preventDefault();
					move(curr+1);
				});
			}
			if(prev){
				prev.bind('click', function(e){
					e.preventDefault();
					move(curr-1);
				});
			}
			if(thumbs){
				thumbs.each(function(i){
					thumbs.eq(i).bind('click', function(e){
						e.preventDefault();
						move(i);
					});
				});
			}
			if(options.draggable){
				var startX = null;
				var startY = null;
				var holderX = null;
				var currentX = null;
				var scrollTop = null;

				if(typeof options.draggable == 'number'){
					var th = options.draggable;
				}else{
					var th = 0;
				}

				function start(x, y){
					if(holder.hasClass('disabled')) return false;

					if(timerID){
						clearTimeout(timerID);
					}
					startX    = x;
					startY    = y;
					holderX   = x;
					scrollTop = document.body.scrollTop;
					currentX  = parseInt(dummyElement.stop().css('left'));

					if(useTransition){
						holder.transition('all', 0).translate3d(currentX, 0);
					}else{
						holder.stop().css({left:currentX});
					}
				}
				function drag(x, y, e){
					if(holder.hasClass('disabled')) return false;

					if(startX !== null){

						// if(Shared.ua.isAndroid){
						// 	e.preventDefault();

						// 	var movedY = y - startY;

						// 	if(Math.abs(movedY) > 30){
						// 		if(movedY > 0){
						// 			document.body.scrollTop = scrollTop-movedY+30;
						// 		}else{
						// 			document.body.scrollTop = scrollTop-movedY-30;
						// 		}
						// 	}
						// }

						var movedX = x - startX;
						var movedY = y - startY;

						var movedXabs = Math.abs(movedX);
						var movedYabs = Math.abs(movedY);

						// console.log('movedX:'+movedX+' movedY:'+movedY);
						// $(window).on('touchmove.noScroll', function(e) {
						//     e.preventDefault();
						// });

						if(movedXabs > 15 || movedYabs > 15){
							if(movedXabs < movedYabs){
								xyBool = true;
								$('body').off('.noScroll');
							}else{
								$('body').on('touchmove.noScroll', function(e) {
								    e.preventDefault();
								});
							}
						}


						if(!xyBool){
							if(Math.abs(movedX) > th){
								if(movedX > 0){
									if(useTransition){
										holder.transition('all', 0).translate3d(currentX+movedX-th);
									}else{
										holder.stop().css({left:currentX+movedX-th});
									}
									dummyElement.stop().css({left:currentX+movedX-th});
								}else{
									if(useTransition){
										holder.transition('all', 0).translate3d(currentX+movedX+th);
									}else{
										holder.stop().css({left:currentX+movedX+th});
									}
									dummyElement.stop().css({left:currentX+movedX+th});
								}
							}else{
								if(useTransition){
									holder.transition('all', 0).translate3d(currentX);
								}else{
									holder.stop().css({left:currentX});
								}
								dummyElement.stop().css({left:currentX});
							}
							holderX = x;
						}
					}
				}
				function end(e){
					if(holder.hasClass('disabled')) return false;

					if(startX !== null && holderX !== null){
						if(!Shared.html.hasTouch) e.preventDefault();

						if(Math.abs(holderX - startX) > 50){
							if(holderX < startX){
								move(curr+1);
							}else{
								move(curr-1);
							}
						}else{
							out();
						}
					}
					startX = null;
					xyBool = false;//初期化
					$('body').off('.noScroll');
				}
				function out(){
					if(startX !== null){
						move(curr);
					}
					startX = holderX = null;
				}

				if(Shared.html.hasTouch){
					holder.get(0).addEventListener('touchstart', function(e){
						start(e.touches[0].clientX, e.touches[0].clientY);
					}, false);

					holder.get(0).addEventListener('touchmove', function(e){
						if(e.touches.length == 1){
							drag(e.touches[0].clientX, e.touches[0].clientY, e);
						}else{
							out();
						}
					}, false);

					holder.get(0).addEventListener('touchend', function(e){
						end();
					}, false);

				}else{
					holder.bind('mousedown', function(e){
						e.preventDefault();
						start(e.clientX, e.clientY);
					});
					holder.bind('mousemove', function(e){
						if(startX !== null){
							e.preventDefault();
							drag(e.clientX, e.clientY, e);
						}
					});
					holder.bind('mouseup', end);
					holder.bind('mouseout', out);

					holder.bind('click', function(e){
						if(holderX !== null){
							e.preventDefault();
						}
					});
				}
			}

			setTimer();

			holder.data({
				doSlide : move,

				nextSlide : function(){
					move(curr+1);
				},
				prevSlide : function(){
					move(curr-1);
				}
			});

			return this;
		},

		fadeSlide : function(options){
			var slider = this;
			var holder = slider.find('.holder');
			var items  = holder.find('.item');
			var next   = options.next ? $(options.next) : null;
			var prev   = options.prev ? $(options.prev) : null;
			var thumbs = options.thumbs ? $(options.thumbs) : null;
			var curr   = options.current || 0;

			items.each(function(i){
				holder.prepend(items.eq(i));
			});

			function fade(to){
				if(to < 0) to = items.length-1;
				if(to > items.length-1) to = 0;

				if(to == curr || holder.hasClass('disabled')) return;

				items.eq(to).css({opacity:0});

				holder.append(items.eq(to));

				items.eq(to).animate({opacity:1}, 1000, 'easeInOutQuart');

				if(options.callback){
					(options.callback)(to, curr);
				}
				curr = to;
			}

			if(next){
				next.bind('click', function(e){
					e.preventDefault();
					fade(curr+1);
				});
			}
			if(prev){
				prev.bind('click', function(e){
					e.preventDefault();
					fade(curr-1);
				});
			}
			if(thumbs){
				thumbs.each(function(i){
					thumbs.eq(i).bind('click', function(e){
						e.preventDefault();
						fade(i);
					});
				});
			}
		}
	});



})(jQuery);


// 後方互換
(function($){
	var msie = {
		isIE     : Shared.ua.isIE,
		isIE6    : Shared.ua.isIE6,
		isIE7    : Shared.ua.isIE7,
		isIE8    : Shared.ua.isIE8,
		isIE9    : Shared.ua.isIE9,
		isIE10   : Shared.ua.isIE10,
		isIE11   : Shared.ua.isIE11,
		isIElt6  : Shared.ua.isIElt6,
		isIElt7  : Shared.ua.isIElt7,
		isIElt8  : Shared.ua.isIElt8,
		isIElt9  : Shared.ua.isIElt9,
		isIElt10 : Shared.ua.isIElt10,
		isIElt11 : Shared.ua.isIElt11,
		isIEgt6  : Shared.ua.isIEgt6,
		isIEgt7  : Shared.ua.isIEgt7,
		isIEgt8  : Shared.ua.isIEgt8,
		isIEgt9  : Shared.ua.isIEgt9,
		isIEgt10 : Shared.ua.isIEgt10,
		isIEgt11 : Shared.ua.isIEgt11
	};
	$.extend({
		msie : function(){
			return msie;
		},
		canTransition : function(){
			return Shared.css.hasTransition;
		},
		canTranslate2D : function(){
			return Shared.css.hasTranslate2d;
		},
		canTranslate3D : function(){
			return Shared.css.hasTranslate3d;
		},
		getVendorPrefix : function(){
			return Shared.css.vendor;
		}
	});

	//////////////////////////////////////////////////////
	//                 add class to html
	//////////////////////////////////////////////////////
	var html = $('html')
	if(Shared.ua.isMac){
		html.addClass('mac');
	}else if(Shared.ua.isWin){
		html.addClass('win');
	}

	if(Shared.ua.isIE){
		html.addClass('ie');
	}


	var ln = (location.href.indexOf('/jp/') < 1)?'en':'jp';
	var html = $('html');
	for(i in Shared.ua){
	  if(i.indexOf('is') != -1){
	    if(Shared.ua[i]){
	      var vnd = i.toLowerCase().split('is')[1];
	      html.addClass(vnd);
	      if(vnd == 'chrome' || vnd == 'safari'){
	        html.addClass('webkit');
	      }
	    }
	  }else if(i.indexOf('ver') != -1){
	    if(Shared.ua[i]){
	      var vnd = i.toLowerCase().split('ver')[1];
	      html.addClass(vnd + Shared.ua[i]);

	      //chrome equal less than 35
	      if(vnd == 'chrome' && (Shared.ua[i] <= 35)){
	        html.addClass(vnd +'_lte'+ 35);
	      }
	    }
	  }
	}
})(jQuery);
