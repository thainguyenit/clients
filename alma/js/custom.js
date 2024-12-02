/*
    panr - v0.0.1
    jQuery plugin for zoom & pan elements on mousemove
    by Robert Bue (@robert_bue)

    Powered by the Greensock Tweening Platform
    http://www.greensock.com
    Greensock License info at http://www.greensock.com/licensing/
    
    Dual licensed under MIT and GPL.
 */
! function(e, t, n, a) {
    function s(t, n) {
        this.element = t, this.settings = e.extend({}, i, n), this._defaults = i, this._name = o, this.init()
    }
    var o = "panr",
        i = {
            sensitivity: 30,
            scale: !0,
            scaleOnHover: !1,
            moveTarget: "container",
            scaleTo: 1.1,
            scaleDuration: .25,
            panY: !0,
            panX: !0,
            panDuration: 1.25,
            resetPanOnMouseLeave: !1,
            onEnter: function() {},
            onLeave: function() {}
        };
    s.prototype = {
        init: function() {
            var r, c, l, u, f, v, t = this.settings,
                n = e(this.element),
                a = n.width(),
                i = (n.height(), n.width() - t.sensitivity),
                s = (a - i) / i;
            (t.scale || !t.scaleOnHover && t.scale) && TweenMax.set(n, {
                scale: t.scaleTo
            }), "container" === jQuery.type(t.moveTarget) && (t.moveTarget = e(this.element).closest(t.moveTarget)), t.moveTarget || (t.moveTarget = e(this.element)), "container" == t.moveTarget && (t.moveTarget = e(this.element).closest(".layer-panr")), t.moveTarget.on("mousemove", function(a) {
                r = a.pageX - n.offset().left, c = a.pageY - n.offset().top, t.panX && (u = {
                    x: -s * r
                }), t.panY && (f = {
                    y: -s * c
                }), l = e.extend({}, u, f), TweenMax.to(n, t.panDuration, l)
            }), t.moveTarget.on("mouseenter", function(e) {
                t.scaleOnHover && TweenMax.to(n, t.scaleDuration, {
                    scale: t.scaleTo
                }), t.onEnter(n)
            }), t.scale && (t.scaleOnHover || t.scale) ? t.resetPanOnMouseLeave && (v = {
                x: 0,
                y: 0
            }) : v = {
                scale: 1,
                x: 0,
                y: 0
            }, t.moveTarget.on("mouseleave", function(e) {
                TweenMax.to(n, t.scaleDuration, v), t.onLeave(n)
            })
        }
    }, e.fn[o] = function(t) {
        return this.each(function() {
            e.data(this, "plugin_" + o) || e.data(this, "plugin_" + o, new s(this, t))
        })
    }
}(jQuery, window, document);

jQuery(document).ready(function() {
    'use strict';
    $('.dropdown-toggle').on('click', function(e) {
        if (Modernizr.mq('screen and (max-width:768px)')) {
            e.preventDefault();
            $(this).toggleClass("current");
            $(this).next($('.dropdown-menu')).slideToggle();
        }
    });

    setsize();

    echo.init({
        offset: 100,
        throttle: 250,
        unload: false
    });

    $('#view-block .tabs li.active').click(function() {
        $('#view-block .tabs li.active').removeClass('current');
        $('#gallery .images li').removeClass('current');
        var elem = $(this).attr('id');
        $('.' + elem).addClass('current');
        $(this).addClass('current');
    });

    $(".dropdown-menu a[href^='#']").on('click', function(e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000, function() {
            window.location.hash = hash;
        });
    });

    /*********************************************
        -   DEVICES DETECTING   -
    **********************************************/

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if (isMobile.any()) {
        $('html').addClass('mobile');
    } else {
        $('html').addClass('no-mobile');
    }


    /*********************************************
        -   DEVICES VIEWPORT WIDTH  -
    **********************************************/

    var $windowWidth = {
        any: function() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        }
    };

    /*********************************************
    -   CHECK FOR TOUCH -
    **********************************************/

    function isTouchSupported() {
        var msTouchEnabled = window.navigator.msMaxTouchPoints;
        var generalTouchEnabled = "ontouchstart" in document.createElement("div");

        if (msTouchEnabled || generalTouchEnabled) {
            //        return true;
            $('body').addClass('touchy');
        } else {
            //       return false;
            $('body').addClass('no-touchy');
        }

    }

    /*********************************************
        -   HIDE MENU WHEN CLICK ON SMALL DEVICES   -
    **********************************************/

    function hideList() {
        var $menu = $('.mobile-wrap[data-one-page="true"]'),
            $menuItem = $('.carna-menu-mobile').children(),
            $canvasWidth = $(window).width();
            $menuItem.each(function() {
                $(this).children('a').on('click', function() {
                    $(this).parents('.mobile-wrap').slideUp(500);
                });
            });
    }

    /*********************************************
        -   SHOW HID MENU ON ONE PAGE   -
    **********************************************/

    function showHideMenu() {
        var $button = $('.button-trigger'),
            $carnaMobile = $('.mobile-wrap'),
            MQ = 992;
        //        $carnaMobile.hide();
        $(window).on('debouncedresize', function() {
            if ($windowWidth.any() > 992) {
                $carnaMobile.hide();
            }
        });


        if ($carnaMobile.data('has-button') === true) {
            $button.on('click', function(event) {
                $(this).parent().siblings('.mobile-wrap').stop(true, true).animate({
                    height: 'toggle'
                }, 500, 'easeInOutSine');
                $(this).toggleClass('active');
                event.preventDefault();
                return false;
            });
        }
    }

    /*********************************************
    -   SHRINK MENU -
    **********************************************/


    function shrink() {
        $(window).on('scroll', function(e) {
            var distanceY = $(window).pageYOffset || $(document).scrollTop(),
                $this = $('.nav-wrap'),
                navOffset = $this.outerHeight(),
                shrinkOn = ($this.data('set-offset')) ? $this.data('set-offset') : navOffset,
                isShrink = $(".is-shrink");

            if (distanceY > shrinkOn) {
                isShrink.addClass("smaller");

            } else {
                isShrink.removeClass("smaller");
            }
        });
    }

    /*********************************************
    -   ADD BG TO MENU ON SCROLL    -
    **********************************************/

    function headerFill() {
        $(window).on('scroll', function(e) {

            var distanceY = $(window).pageYOffset || $(document).scrollTop(),
                navWrap = $('.nav-wrap'),
                navHeight = $('.nav-wrap').outerHeight();

            if (distanceY > navHeight && navWrap.data("is-fill") === true) {
                navWrap.addClass('is-fill');
            } else {
                navWrap.removeClass('is-fill');
            }

        });

    }


    /*********************************************
        -   BX SLIDER   -
    **********************************************/

    function regularSlider() {
        $('.bx-slider').each(function() {
            var $this = $(this),

                $mode = $this.data('bx-mode'),
                $autoPlay = $this.data('bx-auto-play'),
                $autoDelay = $this.data('bx-delay'),
                $autoHover = $this.data('bx-auto-hover'),
                $speed = $this.data('bx-speed'),
                $easing = (!$('body').hasClass('touchy')) ? $this.data('bx-easing') : null,
                $captions = $this.data('bx-captions'),
                $addVideo = $this.data('bx-video'),
                $control = $this.data('bx-control'),
                $prevSelector = $this.data('bx-prev-selector'),
                $nextSelector = $this.data('bx-next-selector'),
                $pager = $this.data('bx-pager'),
                $height = $this.parent().height(),
                $pauseAmount = $this.data('pause-amount'),
                $pagerCustom = $this.data('bx-pager-custom'),
                $maxSlide = $this.data('max-slide'),
                $moveSlide = $this.data('move-slide'),
                $slideMargin = $this.data('slide-margin'),
                $slideWidth = function() {

                    if ($this.data('bx-carousel') === true && $(window).width() > 1200) {
                        var $w = $this.parent().width(),
                            columnNum = $maxSlide,
                            slideWidth = 0;
                        slideWidth = Math.floor($w / columnNum - $slideMargin);

                    } else {
                        slideWidth = $this.data('slide-width')
                    }

                    return slideWidth;

                },

                $buildPager = function(sliderpager) {
                    switch (sliderpager) {
                        case 0:
                            return '<i class="fa fa-flask fa-2x"></i>';
                        case 1:
                            return '<i class="fa fa-puzzle-piece fa-2x"></i>';
                        case 2:
                            return '<i class="fa fa-gears fa-2x"></i>';
                        case 3:
                            return '<i class="fa fa-magic fa-2x"></i>';
                        case 4:
                            return '<i class="fa fa-rocket fa-2x"></i>';
                    }
                },
                $mainBuildpager = ($this.data('build-pager') === 1) ? $buildPager : null;


            if ($('.bx-slider').length) {
                $this.bxSlider({
                    adaptiveHeight: true,
                    mode: $mode,
                    auto: $autoPlay,
                    slideWidth: $slideWidth(),
                    minSlides: 1,
                    maxSlides: $maxSlide,
                    moveSlides: $moveSlide,
                    slideMargin: $slideMargin,
                    autoDelay: $autoDelay,
                    pause: $pauseAmount,
                    autoHover: $autoHover,
                    easing: $easing,
                    video: $addVideo,
                    controls: $control,
                    pager: $pager,
                    useCSS: false,
                    speed: $speed,
                    nextSelector: $nextSelector,
                    prevSelector: $prevSelector,
                    nextText: '<i class="pe-7s-angle-right"></i>',
                    prevText: '<i class="pe-7s-angle-left"></i>',
                    touchEnabled: true,
                    swipeThreshold: 50,
                    oneToOneTouch: true,
                    pagerCustom: $pagerCustom,
                    buildPager: $mainBuildpager,
                    onSliderLoad: function() {


                    }
                }).animate({
                    'opacity': 1
                }, 1300);
            }

        });

    }


    /*function navHighLight() {

        var aChildren = $(".heighlight-menu li").children(':not(.outer-link)'); // find the a children of the list items
        var aArray = []; // create the empty aArray

        for (var i = 0; i < aChildren.length; i++) {
            var aChild = aChildren[i];
            var ahref = $(aChild).attr('href');
            aArray.push(ahref);

        } // this for loop fills the aArray with attribute href values


        $(window).scroll(function() {
            var windowPos = $(window).scrollTop() + 84; // get the offset of the window from the top of page
            var windowHeight = $(window).height(); // get the height of the window
            var docHeight = $(document).height();

            for (var i = 0; i < aArray.length; i++) {
                var theID = aArray[i];
                var divPos = $(theID).offset().top; // get the offset of the div from the top of page
                var divHeight = $(theID).outerHeight(); // get the height of the div in question
                if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                    $("a[href='" + theID + "']").addClass("active");
                } else {
                    $("a[href='" + theID + "']").removeClass("active");
                }
            }

            if (windowPos + windowHeight == docHeight) {
                if (!$(".heighlight-menu li:last-child a").hasClass("active")) {
                    var navActiveCurrent = $(".active").attr("href");
                    $("a[href='" + navActiveCurrent + "']").removeClass("active");
                    $(".heighlight-menu li:last-child a").addClass("active");
                }
            }
        });


    }*/


    /*********************************************
    -   ADDING  Z-INDEX     -
    **********************************************/

    function zIndex() {
        var $layerZ = $('.layer_z');

        if ($layerZ.length) {
            $layerZ.each(function() {
                var $this = $(this),
                    $dataZ = $this.data('zindex');

                $this.css('z-index', $dataZ);
            })
        }

    }


    /*********************************************
        -   LIGHT BOX   -
    **********************************************/

    function standardLightBox() {
        $('.mag-popup').each(function() {

            var $this = $(this),
                $type = ($this.data('popup-type')) ? $this.data('popup-type') : 'image',
                $removalDelay = $this.data('popup-removal-delay'),
                $galleryEnable = $this.data('popup-gallery-enable'),
                $mainClass = $this.data('popup-main-class'),
                $zoomEnable = $this.data('popup-zoom-enabled');

            if ($this.length) {
                $this.find('a.mag-lightbox').magnificPopup({
                    // delegate: $this.data('popup-dlegate'),

                    type: $type,
                    fixedContentPos: false,
                    removalDelay: $removalDelay,
                    showCloseBtn: false,
                    mainClass: $mainClass,
                    tLoading: '',
                    midClick: true,
                    gallery: {
                        enabled: $galleryEnable,
                        navigateByImgClick: true,
                    },
                    zoom: {
                        enabled: $zoomEnable,
                        duration: 300
                    },

                    callbacks: {
                        imageLoadComplete: function() {
                            //                    sameHeight();
                        },

                    }

                    /*callbacks: {
                      beforeOpen: function() {
                          var $triggerEl = $(this.st.el),
                              newClass = $triggerEl.data("modal-class");
                              if (newClass) {
                                this.st.mainClass = this.st.mainClass + ' ' + newClass;
                              }
                      }
                    }*/

                });
            }

            $(document).on('click', '.popup-modal-close', function(e) {
                e.preventDefault();
                $.magnificPopup.close();
            });
        });

        //    return $.Deferred().resolve();
    }


    /*********************************************
    -   SELECT LIST -
    **********************************************/

    Array.prototype.slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
        new SelectFx(el);
    });


    /*********************************************
        -   BACK TO TOP -
    **********************************************/

    /* function backToTop() {
         var offset = 220;
         var duration = 500;
         $(window).scroll(function() {
             if ($(this).scrollTop() > offset) {
                 $('.back-to-top').fadeIn(duration);
             } else {
                 $('.back-to-top').fadeOut(duration);
             }
         });


         if ($('.back-to-top').length) {
             $('.back-to-top').on('click', function(event) {
                 event.preventDefault();
                 $('html, body').animate({
                     scrollTop: 0
                 }, duration, 'easeOutCubic');
                 return false;
             });
         }
     }*/

    /*********************************************
    -   ANIMAION LOADER -
    **********************************************/

    function animationLoader() {


        if (!$('body').hasClass('no-animate')) {

            if ($(".animsition").length) {

                $(".animsition").animsition({

                    inClass: 'fade-in-up-sm',
                    outClass: 'fade-out-down-sm',
                    inDuration: 1000,
                    outDuration: 800,
                    //    linkElement           :   '.animsition-link',
                    linkElement: 'a:not([target="_blank"]):not([href^=#]):not([href^="ajax"]):not([class*="mag-popup"]):not([class*="ajax"]):not([class*="showhide"]):not([href^="javascript"]):not([class^="bx"]):not([class^="standard-popup"]):not([href^="food"]):not([class*="mag-lightbox"]):not([data-popup]):not([class*="header-video__play-trigger"]):not([class*="ui-datepicker-"])',
                    loading: true,
                    loadingParentElement: 'body', //animsition wrapper element
                    loadingClass: 'animsition-loading',
                    browser: ['animation-duration', '-webkit-animation-duration'],
                    //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
                    //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

                    overlay: false,

                    overlayClass: 'animsition-overlay-slide',
                    overlayParentElement: 'body',
                    transition: function(url) {
                        window.location.href = url;
                    }
                });
            }

        } else {
            $('body').find('.animsition, .animsition-overlay').removeClass('animsition, animsition-overlay');
        }

    }

    /*********************************************
        -   ANIMATED    -
    **********************************************/

    function animated() {

        if (!isMobile.any() && $('.animatedIn').length) {
            $('.animatedIn').appear(function() {

                var elem = $(this);
                var animation = elem.data('animation');
                var animationPercent = elem.data('percent');
                var animationDelay = elem.data('animation-delay');

                if (!elem.hasClass('visibleIn')) {
                    elem.css({
                        'width': animationPercent + '%',
                    });
                    if (animationDelay) {
                        setTimeout(function() {
                            elem.addClass(animation + ' visibleIn');
                        }, animationDelay);
                    } else {
                        elem.addClass(animation + ' visibleIn');
                    }
                }
            }, {
                accY: -150
            });
        } else {
            $('.animatedIn').css('visibility', 'visible');
        }

    }

    function highlightBack() {
        $('.main-header').appear(function() {
            var $this = $(this);
            $this.addClass('add-back');
        }, {
            accY: -200
        });
    }
    
    function sameHeight() {
        $('.same-height').each(function() {
            var $this = $(this),
                $h1 = $('.height-main').height(),
                $h2 = $('.height-recev');

            if ($windowWidth.any() > 992) {
                $h2.css('height', $h1 + 'px');
            } else {
                $h2.css('height', 'auto');
            }
        })
    }

    $(window).on("load", function() {
        sameHeight();
    });

    hideList();
    showHideMenu();
    shrink();
    headerFill();
    regularSlider();
    zIndex();
    standardLightBox();
    animationLoader();
    animated();
    highlightBack();
    isTouchSupported();
    $(window).on('debouncedresize', function() {
        sameHeight();
    });
    sefeedback();

});
$(window).resize(function() {
    setsize();
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= 143) {
        $('.pageTop').fadeIn("slow");
        $('.main-nav').addClass("fixNav");
    } else {
        $('.pageTop').fadeOut("slow");
        $('.main-nav').removeClass("fixNav");
    }

    if ($(this).scrollTop() >= 360) {
        $('.info-special').addClass("fixSpeci");
    } else {
        $('.info-special').removeClass("fixSpeci");
    }

});

function sefeedback() {
    $('.modal-body li').each(function(){
        $(this).click(function(){
            $('.active-fb').removeClass('active-fb');
            $(this).addClass('active-fb');
        });
    });
}

function setsize() {
    var getWW = $(window).width();
    var getHW = $(window).height();
    var getHwlogo = getHW / 5;
    var getHwnext = getHW - getHwlogo;
    $('.video-home').css({
        "width": getWW,
        "height": getHW
    });
    $('.info-home').css({
        "margin-top": getHwlogo
    });
    $('.next-top').css({
        "top": getHwnext
    });
}


/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

    var $event = $.event,
        $special,
        resizeTimeout;

    $special = $event.special.debouncedresize = {
        setup: function() {
            $(this).on("resize", $special.handler);
        },
        teardown: function() {
            $(this).off("resize", $special.handler);
        },
        handler: function(event, execAsap) {
            // Save the context
            var context = this,
                args = arguments,
                dispatch = function() {
                    // set correct event type
                    event.type = "debouncedresize";
                    $event.dispatch.apply(context, args);
                };

            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }

            execAsap ?
                dispatch() :
                resizeTimeout = setTimeout(dispatch, $special.threshold);
        },
        threshold: 150
    };

    

})(jQuery);




// SmoothScroll v0.9.9
// Licensed under the terms of the MIT license.
// People involved
// - Balazs Galambosi: maintainer (CHANGELOG.txt)
// - Patrick Brunner (patrickb1991@gmail.com)
// - Michael Herf: ssc_pulse Algorithm
function ssc_init() {
    if (document.body) {
        var e = document.body,
            s = document.documentElement,
            c = window.innerHeight,
            t = e.scrollHeight;
        if (ssc_root = document.compatMode.indexOf("CSS") >= 0 ? s : e, ssc_activeElement = e, ssc_initdone = !0, top != self) ssc_frame = !0;
        else if (t > c && (e.offsetHeight <= c || s.offsetHeight <= c) && (ssc_root.style.height = "auto", ssc_root.offsetHeight <= c)) {
            var o = document.createElement("div");
            o.style.clear = "both", e.appendChild(o)
        }
        ssc_fixedback || (e.style.backgroundAttachment = "scroll", s.style.backgroundAttachment = "scroll"), ssc_keyboardsupport && ssc_addEvent("keydown", ssc_keydown)
    }
}

function ssc_scrollArray(e, s, c, t) {
    if (t || (t = 1e3), ssc_directionCheck(s, c), ssc_que.push({
            x: s,
            y: c,
            lastX: 0 > s ? .99 : -.99,
            lastY: 0 > c ? .99 : -.99,
            start: +new Date
        }), !ssc_pending) {
        var o = function() {
            for (var r = +new Date, n = 0, a = 0, i = 0; i < ssc_que.length; i++) {
                var l = ssc_que[i],
                    _ = r - l.start,
                    u = _ >= ssc_animtime,
                    d = u ? 1 : _ / ssc_animtime;
                ssc_pulseAlgorithm && (d = ssc_pulse(d));
                var f = l.x * d - l.lastX >> 0,
                    m = l.y * d - l.lastY >> 0;
                n += f, a += m, l.lastX += f, l.lastY += m, u && (ssc_que.splice(i, 1), i--)
            }
            if (s) {
                var h = e.scrollLeft;
                e.scrollLeft += n, n && e.scrollLeft === h && (s = 0)
            }
            if (c) {
                var p = e.scrollTop;
                e.scrollTop += a, a && e.scrollTop === p && (c = 0)
            }
            s || c || (ssc_que = []), ssc_que.length ? setTimeout(o, t / ssc_framerate + 1) : ssc_pending = !1
        };
        setTimeout(o, 0), ssc_pending = !0
    }
}

function ssc_wheel(e) {
    ssc_initdone || ssc_init();
    var s = e.target,
        c = ssc_overflowingAncestor(s);
    if (!c || e.defaultPrevented || ssc_isNodeName(ssc_activeElement, "embed") || ssc_isNodeName(s, "embed") && /\.pdf/i.test(s.src)) return !0;
    var t = e.wheelDeltaX || 0,
        o = e.wheelDeltaY || 0;
    t || o || (o = e.wheelDelta || 0), Math.abs(t) > 1.2 && (t *= ssc_stepsize / 120), Math.abs(o) > 1.2 && (o *= ssc_stepsize / 120), ssc_scrollArray(c, -t, -o), e.preventDefault()
}

function ssc_keydown(e) {
    var s = e.target,
        c = e.ctrlKey || e.altKey || e.metaKey;
    if (/input|textarea|embed/i.test(s.nodeName) || s.isContentEditable || e.defaultPrevented || c) return !0;
    if (ssc_isNodeName(s, "button") && e.keyCode === ssc_key.spacebar) return !0;
    var t, o = 0,
        r = 0,
        n = ssc_overflowingAncestor(ssc_activeElement),
        a = n.clientHeight;
    switch (n == document.body && (a = window.innerHeight), e.keyCode) {
        case ssc_key.up:
            r = -ssc_arrowscroll;
            break;
        case ssc_key.down:
            r = ssc_arrowscroll;
            break;
        case ssc_key.spacebar:
            t = e.shiftKey ? 1 : -1, r = -t * a * .9;
            break;
        case ssc_key.pageup:
            r = .9 * -a;
            break;
        case ssc_key.pagedown:
            r = .9 * a;
            break;
        case ssc_key.home:
            r = -n.scrollTop;
            break;
        case ssc_key.end:
            var i = n.scrollHeight - n.scrollTop - a;
            r = i > 0 ? i + 10 : 0;
            break;
        case ssc_key.left:
            o = -ssc_arrowscroll;
            break;
        case ssc_key.right:
            o = ssc_arrowscroll;
            break;
        default:
            return !0
    }
    ssc_scrollArray(n, o, r), e.preventDefault()
}

function ssc_mousedown(e) {
    ssc_activeElement = e.target
}

function ssc_setCache(e, s) {
    for (var c = e.length; c--;) ssc_cache[ssc_uniqueID(e[c])] = s;
    return s
}

function ssc_overflowingAncestor(e) {
    var s = [],
        c = ssc_root.scrollHeight;
    do {
        var t = ssc_cache[ssc_uniqueID(e)];
        if (t) return ssc_setCache(s, t);
        if (s.push(e), c === e.scrollHeight) {
            if (!ssc_frame || ssc_root.clientHeight + 10 < c) return ssc_setCache(s, document.body)
        } else if (e.clientHeight + 10 < e.scrollHeight && (overflow = getComputedStyle(e, "").getPropertyValue("overflow"), "scroll" === overflow || "auto" === overflow)) return ssc_setCache(s, e)
    } while (e = e.parentNode)
}

function ssc_addEvent(e, s, c) {
    window.addEventListener(e, s, c || !1)
}

function ssc_removeEvent(e, s, c) {
    window.removeEventListener(e, s, c || !1)
}

function ssc_isNodeName(e, s) {
    return e.nodeName.toLowerCase() === s.toLowerCase()
}

function ssc_directionCheck(e, s) {
    e = e > 0 ? 1 : -1, s = s > 0 ? 1 : -1, (ssc_direction.x !== e || ssc_direction.y !== s) && (ssc_direction.x = e, ssc_direction.y = s, ssc_que = [])
}

function ssc_pulse_(e) {
    var s, c, t;
    return e *= ssc_pulseScale, 1 > e ? s = e - (1 - Math.exp(-e)) : (c = Math.exp(-1), e -= 1, t = 1 - Math.exp(-e), s = c + t * (1 - c)), s * ssc_pulseNormalize
}

function ssc_pulse(e) {
    return e >= 1 ? 1 : 0 >= e ? 0 : (1 == ssc_pulseNormalize && (ssc_pulseNormalize /= ssc_pulse_(1)), ssc_pulse_(e))
}
var ssc_framerate = 150,
    ssc_animtime = 500,
    ssc_stepsize = 150,
    ssc_pulseAlgorithm = !0,
    ssc_pulseScale = 6,
    ssc_pulseNormalize = 1,
    ssc_keyboardsupport = !0,
    ssc_arrowscroll = 50,
    ssc_frame = !1,
    ssc_direction = {
        x: 0,
        y: 0
    },
    ssc_initdone = !1,
    ssc_fixedback = !0,
    ssc_root = document.documentElement,
    ssc_activeElement, ssc_key = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36
    },
    ssc_que = [],
    ssc_pending = !1,
    ssc_cache = {};
setInterval(function() {
    ssc_cache = {}
}, 1e4);
var ssc_uniqueID = function() {
        var e = 0;
        return function(s) {
            return s.ssc_uniqueID || (s.ssc_uniqueID = e++)
        }
    }(),
    ischrome = /chrome/.test(navigator.userAgent.toLowerCase());
ischrome && (ssc_addEvent("mousedown", ssc_mousedown), ssc_addEvent("mousewheel", ssc_wheel), ssc_addEvent("load", ssc_init));

/**
 * jquery.gridrotator.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
! function(t, e, i) {
    "use strict";

    function n() {
        var t = ["webkit", "moz", "ms", "o"];
        if ("hidden" in document) return "hidden";
        for (var e = 0; e < t.length; e++)
            if (t[e] + "Hidden" in document) return t[e] + "Hidden";
        return null
    }

    function r() {
        var t = n();
        return t ? document[t] : !1
    }

    function h(t) {
        return 0 === Object.keys(t).length
    }
    var o, a, s = t.event;
    o = s.special.debouncedresize = {
        setup: function() {
            t(this).on("resize", o.handler)
        },
        teardown: function() {
            t(this).off("resize", o.handler)
        },
        handler: function(t, e) {
            var i = this,
                n = arguments,
                r = function() {
                    t.type = "debouncedresize", s.dispatch.apply(i, n)
                };
            a && clearTimeout(a), e ? r() : a = setTimeout(r, o.threshold)
        },
        threshold: 100
    }, Array.prototype.shuffle = function() {
        for (var e, i, t = this.length; t--;) e = Math.floor(Math.random() * t), i = this[t], this[t] = this[e], this[e] = i;
        return this
    };
    var d = t(e),
        l = e.Modernizr;
    t.GridRotator = function(e, i) {
        if (this.$el = t(i), l.backgroundsize) {
            this.$el.addClass("ri-grid-loading"), this._init(e)
        }
    }, t.GridRotator.defaults = {
        rows: 3,
        columns: 10,
        w1024: {
            rows: 3,
            columns: 8
        },
        w768: {
            rows: 3,
            columns: 7
        },
        w480: {
            rows: 3,
            columns: 5
        },
        w320: {
            rows: 2,
            columns: 4
        },
        w240: {
            rows: 2,
            columns: 3
        },
        step: "random",
        maxStep: 3,
        preventClick: !0,
        animType: "random",
        animSpeed: 800,
        animEasingOut: "linear",
        animEasingIn: "linear",
        interval: 3e3,
        slideshow: !0,
        onhover: !1,
        nochange: []
    }, t.GridRotator.prototype = {
        _init: function(e) {
            this.options = t.extend(!0, {}, t.GridRotator.defaults, e), this._config()
        },
        _config: function() {
            var e = this,
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                };
            this.supportTransitions = l.csstransitions, this.supportTransforms3D = l.csstransforms3d, this.transEndEventName = i[l.prefixed("transition")] + ".gridrotator", this.animTypes = this.supportTransforms3D ? ["fadeInOut", "slideLeft", "slideRight", "slideTop", "slideBottom", "rotateLeft", "rotateRight", "rotateTop", "rotateBottom", "scale", "rotate3d", "rotateLeftScale", "rotateRightScale", "rotateTopScale", "rotateBottomScale"] : ["fadeInOut", "slideLeft", "slideRight", "slideTop", "slideBottom"], this.animType = this.options.animType, "random" === this.animType || this.supportTransforms3D || -1 !== t.inArray(this.animType, this.animTypes) || "showHide" === this.animType || (this.animType = "fadeInOut"), this.animTypesTotal = this.animTypes.length, this.$list = this.$el.children("ul");
            var s = 0,
                o = this.$list.find("img"),
                a = o.length;
            o.each(function() {
                var i = t(this),
                    n = i.attr("src");
                t("<img/>").load(function() {
                    ++s, i.parent().css("background-image", "url(" + n + ")"), s === a && (o.remove(), e.$el.removeClass("ri-grid-loading"), e.$items = e.$list.children("li"), e.$itemsCache = e.$items.clone(), e.itemsTotal = e.$items.length, e.outItems = [], e._layout(function() {
                        e._initEvents()
                    }), e._start())
                }).attr("src", n)
            })
        },
        _layout: function(e) {
            var i = this;
            this._setGridDim(), this.$list.empty(), this.$items = this.$itemsCache.clone().appendTo(this.$list);
            var s = this.$items.filter(":gt(" + (this.showTotal - 1) + ")"),
                o = s.children("a");
            this.outItems.length = 0, o.each(function(e) {
                i.outItems.push(t(this))
            }), s.remove();
            for (var a = document.defaultView ? parseInt(document.defaultView.getComputedStyle(this.$el.get(0), null).width) : this.$el.width(), n = Math.floor(a / this.columns), r = a - this.columns * Math.floor(n), h = 0; h < this.rows; ++h)
                for (var d = 0; d < this.columns; ++d) {
                    var l = this.columns * h + d,
                        c = this.$items.eq(l);
                    c.css({
                        width: d < Math.floor(r) ? n + 1 : n,
                        height: n
                    }), -1 !== t.inArray(l, this.options.nochange) && c.addClass("ri-nochange").data("nochange", !0)
                }
            this.options.preventClick && this.$items.children().css("cursor", "default").on("click.gridrotator", !1), e && e.call()
        },
        _setGridDim: function() {
            var t = this.$el.width();
            switch (!0) {
                case 240 > t:
                    this.rows = this.options.w240.rows, this.columns = this.options.w240.columns;
                    break;
                case 320 > t:
                    this.rows = this.options.w320.rows, this.columns = this.options.w320.columns;
                    break;
                case 480 > t:
                    this.rows = this.options.w480.rows, this.columns = this.options.w480.columns;
                    break;
                case 768 > t:
                    this.rows = this.options.w768.rows, this.columns = this.options.w768.columns;
                    break;
                case 1024 > t:
                    this.rows = this.options.w1024.rows, this.columns = this.options.w1024.columns;
                    break;
                default:
                    this.rows = this.options.rows, this.columns = this.options.columns
            }
            this.showTotal = this.rows * this.columns
        },
        _initEvents: function() {
            var e = this;
            d.on("debouncedresize.gridrotator", function() {
                e._layout()
            });
            var i = n();
            if (i) {
                var s = i.replace(/[H|h]idden/, "") + "visibilitychange";
                document.addEventListener(s, function() {
                    e._visChange()
                })
            }!l.touch && this.options.onhover && e.$items.on("mouseenter.gridrotator", function() {
                var i = t(this);
                i.data("active") || i.data("hovered") || i.data("nochange") || (i.data("hovered", !0), e._replace(i))
            }).on("mouseleave.gridrotator", function() {
                t(this).data("hovered", !1)
            })
        },
        _visChange: function() {
            r() ? clearTimeout(this.playtimeout) : this._start()
        },
        _start: function() {
            this.showTotal < this.itemsTotal && this.options.slideshow && this._showNext()
        },
        _getAnimType: function() {
            return "random" === this.animType ? this.animTypes[Math.floor(Math.random() * this.animTypesTotal)] : this.animType
        },
        _getAnimProperties: function(t) {
            var r, e = {},
                s = {},
                o = {},
                a = {},
                n = this._getAnimType(),
                h = 0;
            switch (n) {
                case "showHide":
                    r = 0, a.opacity = 0;
                    break;
                case "fadeInOut":
                    a.opacity = 0;
                    break;
                case "slideLeft":
                    e.left = t.width(), o.left = 0, a.left = -t.width();
                    break;
                case "slideRight":
                    e.left = -t.width(), o.left = 0, a.left = t.width();
                    break;
                case "slideTop":
                    e.top = t.height(), o.top = 0, a.top = -t.height();
                    break;
                case "slideBottom":
                    e.top = -t.height(), o.top = 0, a.top = t.height();
                    break;
                case "rotateLeft":
                    r = this.options.animSpeed / 2, e.transform = "rotateY(90deg)", o.transform = "rotateY(0deg)", h = r, a.transform = "rotateY(-90deg)";
                    break;
                case "rotateRight":
                    r = this.options.animSpeed / 2, e.transform = "rotateY(-90deg)", o.transform = "rotateY(0deg)", h = r, a.transform = "rotateY(90deg)";
                    break;
                case "rotateTop":
                    r = this.options.animSpeed / 2, e.transform = "rotateX(90deg)", o.transform = "rotateX(0deg)", h = r, a.transform = "rotateX(-90deg)";
                    break;
                case "rotateBottom":
                    r = this.options.animSpeed / 2, e.transform = "rotateX(-90deg)", o.transform = "rotateX(0deg)", h = r, a.transform = "rotateX(90deg)";
                    break;
                case "scale":
                    r = this.options.animSpeed / 2, e.transform = "scale(0)", s.transform = "scale(1)", o.transform = "scale(1)", h = r, a.transform = "scale(0)";
                    break;
                case "rotateLeftScale":
                    s.transform = "scale(1)", r = this.options.animSpeed / 2, e.transform = "scale(0.3) rotateY(90deg)", o.transform = "scale(1) rotateY(0deg)", h = r, a.transform = "scale(0.3) rotateY(-90deg)";
                    break;
                case "rotateRightScale":
                    s.transform = "scale(1)", r = this.options.animSpeed / 2, e.transform = "scale(0.3) rotateY(-90deg)", o.transform = "scale(1) rotateY(0deg)", h = r, a.transform = "scale(0.3) rotateY(90deg)";
                    break;
                case "rotateTopScale":
                    s.transform = "scale(1)", r = this.options.animSpeed / 2, e.transform = "scale(0.3) rotateX(90deg)", o.transform = "scale(1) rotateX(0deg)", h = r, a.transform = "scale(0.3) rotateX(-90deg)";
                    break;
                case "rotateBottomScale":
                    s.transform = "scale(1)", r = this.options.animSpeed / 2, e.transform = "scale(0.3) rotateX(-90deg)", o.transform = "scale(1) rotateX(0deg)", h = r, a.transform = "scale(0.3) rotateX(90deg)";
                    break;
                case "rotate3d":
                    r = this.options.animSpeed / 2, e.transform = "rotate3d( 1, 1, 0, 90deg )", o.transform = "rotate3d( 1, 1, 0, 0deg )", h = r, a.transform = "rotate3d( 1, 1, 0, -90deg )"
            }
            return {
                startInProp: e,
                startOutProp: s,
                endInProp: o,
                endOutProp: a,
                delay: h,
                animSpeed: r != i ? r : this.options.animSpeed
            }
        },
        _showNext: function(t) {
            var e = this;
            clearTimeout(this.playtimeout), this.playtimeout = setTimeout(function() {
                var t = e.options.step,
                    i = e.options.maxStep,
                    s = 1;
                i > e.showTotal && (i = e.showTotal);
                for (var o = "random" === t ? Math.floor(Math.random() * i + s) : Math.min(Math.abs(t), i), a = e._getRandom(o, e.showTotal), n = 0; o > n; ++n) {
                    var r = e.$items.eq(a[n]);
                    if (r.data("active") || r.data("nochange")) return e._showNext(1), !1;
                    e._replace(r)
                }
                e._showNext()
            }, t || Math.max(Math.abs(this.options.interval), 300))
        },
        _replace: function(e) {
            e.data("active", !0);
            var i = this,
                s = e.children("a:last"),
                o = {
                    width: s.width(),
                    height: s.height()
                };
            e.data("active", !0);
            var a = this.outItems.shift();
            this.outItems.push(s.clone().css("transition", "none")), a.css(o).prependTo(e);
            var n = this._getAnimProperties(s);
            a.css(n.startInProp), s.css(n.startOutProp), this._setTransition(a, "all", n.animSpeed, n.delay, this.options.animEasingIn), this._setTransition(s, "all", n.animSpeed, 0, this.options.animEasingOut), this._applyTransition(a, n.endInProp, n.animSpeed, function() {
                var e = t(this),
                    s = n.animSpeed === i.options.animSpeed && h(n.endInProp) ? n.animSpeed : 0;
                setTimeout(function() {
                    i.supportTransitions && e.off(i.transEndEventName), e.next().remove(), e.parent().data("active", !1)
                }, s)
            }, 0 === n.animSpeed || h(n.endInProp)), this._applyTransition(s, n.endOutProp, n.animSpeed)
        },
        _getRandom: function(t, e) {
            for (var i = [], s = 0; e > s; ++s) i.push(s);
            return i.shuffle().slice(0, t)
        },
        _setTransition: function(t, e, i, s, o) {
            setTimeout(function() {
                t.css("transition", e + " " + i + "ms " + s + "ms " + o)
            }, 25)
        },
        _applyTransition: function(e, i, s, o, a) {
            var n = this;
            setTimeout(function() {
                t.fn.applyStyle = n.supportTransitions ? t.fn.css : t.fn.animate, o && n.supportTransitions && (e.on(n.transEndEventName, o), a && o.call(e)), o = o || function() {
                    return !1
                }, e.stop().applyStyle(i, t.extend(!0, [], {
                    duration: s + "ms",
                    complete: o
                }))
            }, 25)
        }
    };
    var c = function(t) {
        e.console && e.console.error(t)
    };
    t.fn.gridrotator = function(e) {
        var i = t.data(this, "gridrotator");
        if ("string" == typeof e) {
            var s = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                return i ? t.isFunction(i[e]) && "_" !== e.charAt(0) ? void i[e].apply(i, s) : void c("no such method '" + e + "' for gridrotator instance") : void c("cannot call methods on gridrotator prior to initialization; attempted to call method '" + e + "'")
            })
        } else this.each(function() {
            i ? i._init() : i = t.data(this, "gridrotator", new t.GridRotator(e, this))
        });
        return i
    }
}(jQuery, window);

/*!
 * Retina.js v1.3.0
 *
 * Copyright 2014 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
/*! function() {
    function a() {}

    function b(a) {
        return f.retinaImageSuffix + a
    }

    function c(a, c) {
        if (this.path = a || "", "undefined" != typeof c && null !== c) this.at_2x_path = c, this.perform_check = !1;
        else {
            if (void 0 !== document.createElement) {
                var d = document.createElement("a");
                d.href = this.path, d.pathname = d.pathname.replace(g, b), this.at_2x_path = d.href
            } else {
                var e = this.path.split("?");
                e[0] = e[0].replace(g, b), this.at_2x_path = e.join("?")
            }
            this.perform_check = !0
        }
    }

    function d(a) {
        this.el = a, this.path = new c(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
        var b = this;
        this.path.check_2x_variant(function(a) {
            a && b.swap()
        })
    }
    var e = "undefined" == typeof exports ? window : exports,
        f = {
            retinaImageSuffix: "@2x",
            check_mime_type: !0,
            force_original_dimensions: !0
        };
    e.Retina = a, a.configure = function(a) {
        null === a && (a = {});
        for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b])
    }, a.init = function(a) {
        null === a && (a = e);
        var b = a.onload || function() {};
        a.onload = function() {
            var a, c, e = document.getElementsByTagName("img"),
                f = [];
            for (a = 0; a < e.length; a += 1) c = e[a], c.getAttributeNode("data-no-retina") || f.push(new d(c));
            b()
        }
    }, a.isRetina = function() {
        var a = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
        return e.devicePixelRatio > 1 ? !0 : e.matchMedia && e.matchMedia(a).matches ? !0 : !1
    };
    var g = /\.\w+$/;
    e.RetinaImagePath = c, c.confirmed_paths = [], c.prototype.is_external = function() {
        return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }, c.prototype.check_2x_variant = function(a) {
        var b, d = this;
        return this.is_external() ? a(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in c.confirmed_paths ? a(!0) : (b = new XMLHttpRequest, b.open("HEAD", this.at_2x_path), b.onreadystatechange = function() {
            if (4 !== b.readyState) return a(!1);
            if (b.status >= 200 && b.status <= 399) {
                if (f.check_mime_type) {
                    var e = b.getResponseHeader("Content-Type");
                    if (null === e || !e.match(/^image/i)) return a(!1)
                }
                return c.confirmed_paths.push(d.at_2x_path), a(!0)
            }
            return a(!1)
        }, b.send(), void 0) : a(!0)
    }, e.RetinaImage = d, d.prototype.swap = function(a) {
        function b() {
            c.el.complete ? (f.force_original_dimensions && (c.el.setAttribute("width", c.el.offsetWidth), c.el.setAttribute("height", c.el.offsetHeight)), c.el.setAttribute("src", a)) : setTimeout(b, 5)
        }
        "undefined" == typeof a && (a = this.path.at_2x_path);
        var c = this;
        b()
    }, a.isRetina() && a.init(e)
}();*/

/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2015 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
! function(t) {
    t.fn.appear = function(e, a) {
        var i = t.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, a);
        return this.each(function() {
            var a = t(this);
            if (a.appeared = !1, !e) return void a.trigger("appear", i.data);
            var s = t(window),
                o = function() {
                    if (!a.is(":visible")) return void(a.appeared = !1);
                    var t = s.scrollLeft(),
                        e = s.scrollTop(),
                        o = a.offset(),
                        r = o.left,
                        n = o.top,
                        h = i.accX,
                        c = i.accY,
                        l = a.height(),
                        d = s.height(),
                        p = a.width(),
                        f = s.width();
                    n + l + c >= e && e + d + c >= n && r + p + h >= t && t + f + h >= r ? a.appeared || a.trigger("appear", i.data) : a.appeared = !1
                },
                r = function() {
                    if (a.appeared = !0, i.one) {
                        s.unbind("scroll", o);
                        var r = t.inArray(o, t.fn.appear.checks);
                        r >= 0 && t.fn.appear.checks.splice(r, 1)
                    }
                    e.apply(this, arguments)
                };
            i.one ? a.one("appear", i.data, r) : a.bind("appear", i.data, r), s.scroll(o), t.fn.appear.checks.push(o), o()
        })
    }, t.extend(t.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var e = t.fn.appear.checks.length;
            if (e > 0)
                for (; e--;) t.fn.appear.checks[e]()
        },
        run: function() {
            t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout), t.fn.appear.timeout = setTimeout(t.fn.appear.checkAll, 20)
        }
    }), t.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(e, a) {
        var i = t.fn[a];
        i && (t.fn[a] = function() {
            var e = i.apply(this, arguments);
            return t.fn.appear.run(), e
        })
    })
}(jQuery);