(function ($, window, document, undefined) {
    'use strict';
	
	jQuery(document).ready(function(){

		jQuery('.tp-banner').show().revolution(
		{
			dottedOverlay:"none",
			delay:7000,
			startwidth:1170,
			startheight:700,
			hideThumbs:200,
			
			thumbWidth:100,
			thumbHeight:50,
			thumbAmount:5,
			
			navigationType:"none",
			navigationArrows:"solo",
			navigationStyle:"preview1",
			
			touchenabled:"on",
			onHoverStop:"on",
			
			swipe_velocity: 0.7,
			swipe_min_touches: 1,
			swipe_max_touches: 1,
			drag_block_vertical: false,
									
									
			keyboardNavigation:"off",
			
			navigationHAlign:"center",
			navigationVAlign:"bottom",
			navigationHOffset:0,
			navigationVOffset:20,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:0,
					
			shadow:0,
			fullWidth:"off",
			fullScreen:"on",

			spinner:"spinner0",
			
			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,

			shuffle:"off",
			hideTimerBar:"on",
									
			forceFullWidth:"off",                       
			fullScreenAlignForce:"off",                     
			minFullScreenHeight:"400",                      
									
			hideThumbsOnMobile:"off",
			hideNavDelayOnMobile:1500,                      
			hideBulletsOnMobile:"off",
			hideArrowsOnMobile:"off",
			hideThumbsUnderResolution:0,
			
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			startWithSlide:0,
			fullScreenOffsetContainer: ".header"    
		});                                        

		
		(function () {

			window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {   

				return true;
			}

		})();

		initMap();
	 
	});
	
	$(window).load(function(){

		$("#header").sticky({ topSpacing: 0 });

		jQuery("#preloader").delay(900).fadeOut(500); 
		
	});

	
	
	$('.q-item').click(function(){
	    $(this).parents('li').find('.a-item').toggle();
	});
	/* ==============================================
		SMOOTH SCROLLING
	=============================================== */

	/*$('body').scrollspy();

	$(".scrollspy-id a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top - 200
			}, 1000, function(){
			window.location.hash = hash;
		});
	}); */

	
	$(window).scroll(function () {
        var y = $(this).scrollTop();
        $('.parallax-bg').css('background-position-y', parseInt( y / 2 ) + 'px,' + parseInt( -y / 2 ) + 'px');
        /*if($(this).scrollTop() >= 73){
	      $('#header-sticky-wrapper').fadeIn();
	    }else {
	      $('#header-sticky-wrapper').fadeOut();
	    }*/
	    if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
	$('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

	$('.jum-news').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top - 50
	    }, 500);
	    return false;
	});
	
	
	//mapSum();
	goBack();
	new WOW().init();
	viewMap();
	tabCareer();
	setleft();
	setheighttimeline();
	

})(jQuery, window, document);

/*$(window).resize(function() {
    setleft();
    setTimeout(function() {
	    setheighttimeline();
	}, 1000);
});*/
$(window).bind('resize', function() {
	setleft();
	setheighttimeline();
});
function setleft() {
	var wSL = $('.bn-txt-03 span').width();
	//var wSL01 = $('.bn-txt-03-01 span').width();
	var wW = $(window).width();
	var reWsl011 = wW - wSL;
	//var reW01 = wW - wSL01;
	if (wW > 768 ) {
	    $('.bn-txt-04').css({
	      "left": reWsl011/2 + 100
	    });
	    $('.bn-txt-04-01').css({
	      "left": reWsl011/2 + 100
	    });
	    $('.cl-tp-cap').removeClass('text-center');
	    
	} else {
		$('.bn-txt-04').css({
	      "left": 0
	    });
	    $('.bn-txt-04-01').css({
	      "left": 0
	    });
		$('.cl-tp-cap').addClass('text-center');
	}
}
/*function setheighttimeline() {
	var wW = $(window).outerWidth(true);
	$('.timeline li').each(function(){
		var element = $(this).find('.timeline-panel');
		var element01 = $(this).find('.timeline-panel-other');
		if (wW >= 768 ) {
			var he = $(element).outerHeight();
			var heimg = $(element01).outerHeight();
			if(he >= heimg) {
				$(element01).css({
			      "height": he
			    });
			} else {
				$(element01).css({
			      "height": "inherit"
			    });
			}
		} else {
			$(element01).css({
		      "height": "inherit"
		    });
		}
	});
}*/
function setheighttimeline() {
	var wW = $(window).outerWidth(true);
	$('.timeline li').each(function(){
		var element = $(this).find('.timeline-panel');
		var element01 = $(this).find('.timeline-panel-other');
		new ResizeSensor(element, function() {
			if (wW > 740 ) {
				var he = $(element).outerHeight();
				var heimg = $(element01).outerHeight();
				console.log('he' + he);
				console.log('heimg' + he);
				if(he >= heimg) {
					$(element01).css({
				      "height": he
				    });
				} else {
					$(element01).css({
				      "height": "inherit"
				    });
				}
			} else {
				$(element01).css({
			      "height": "inherit"
			    });
			}
		});
	});
}


function goBack() {
	$('.back-window').click(function(){
		window.history.back();
	});
}
function mapSum() {
	var myLatlng1 = new google.maps.LatLng(35.466682,139.616876);
	var myOptions1 = {
		zoom: 16,
		center: myLatlng1,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map1 = new google.maps.Map(document.getElementById("map-canvas-01"), myOptions1);
	new google.maps.Marker({
		position: new google.maps.LatLng(35.466682,139.616876),
		map: map1,
	  icon: "assets/img/logo_map.png"
	});

	var myLatlng2 = new google.maps.LatLng(43.060086,141.3527776);
	var myOptions2 = {
		zoom: 16,
		center: myLatlng2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map2 = new google.maps.Map(document.getElementById("map-canvas-02"), myOptions2);
	new google.maps.Marker({
		position: new google.maps.LatLng(43.060086,141.3527776),
		map: map2,
	  icon: "assets/img/logo_map.png"
	});

	var myLatlng3 = new google.maps.LatLng(34.6988538,135.4980486);
	var myOptions3 = {
		zoom: 16,
		center: myLatlng3,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var map3 = new google.maps.Map(document.getElementById("map-canvas-03"), myOptions3);
	new google.maps.Marker({
		position: new google.maps.LatLng(34.6988538,135.4980486),
		map: map3,
	  icon: "assets/img/logo_map.png"
	});

	// Disabled Map Scroll in Contact Page 
	map1.setOptions({
	    'scrollwheel': false
	});
	map2.setOptions({
	    'scrollwheel': false
	});
	map3.setOptions({
	    'scrollwheel': false
	});
		    
}
function mapSumProfile() {
	var myLatlngPro1 = new google.maps.LatLng(35.466682,139.616876);
	var myOptionsPro1 = {
		zoom: 16,
		center: myLatlngPro1,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var mapPro1 = new google.maps.Map(document.getElementById("map-canvas-pro-01"), myOptionsPro1);
	new google.maps.Marker({
		position: new google.maps.LatLng(35.466682,139.616876),
		map: mapPro1,
	  icon: "assets/img/logo_map.png"
	});

	var myLatlngPro2 = new google.maps.LatLng(43.060086,141.3527776);
	var myOptionsPro2 = {
		zoom: 16,
		center: myLatlngPro2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var mapPro2 = new google.maps.Map(document.getElementById("map-canvas-pro-02"), myOptionsPro2);
	new google.maps.Marker({
		position: new google.maps.LatLng(43.060086,141.3527776),
		map: mapPro2,
	  icon: "assets/img/logo_map.png"
	});

	var myLatlngPro3 = new google.maps.LatLng(34.6988538,135.4980486);
	var myOptionsPro3 = {
		zoom: 16,
		center: myLatlngPro3,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var mapPro3 = new google.maps.Map(document.getElementById("map-canvas-pro-03"), myOptionsPro3);
	new google.maps.Marker({
		position: new google.maps.LatLng(34.6988538,135.4980486),
		map: mapPro3,
	  icon: "assets/img/logo_map.png"
	});
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map-canvas-02'), {
    zoom: 16,
    center: {lat: 43.060007, lng: 141.352738}
  });
  setMarkers(map);
}
var beaches = [
  ['OSAKA', 34.698854, 135.498049, 2],
  ['SAPPORO', 43.060007, 141.352738, 1]
];

function setMarkers(map) {
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  };
  if (beaches) {
	  for (var i = 0; i < beaches.length; i++) {
	    var beach = beaches[i];
	    var marker = new google.maps.Marker({
	      position: {lat: beach[1], lng: beach[2]},
	      map: map,
	      icon: image
	    });
	  }
	}
}

function viewMap() {
	var countRel = 0;
	$('.map-canvas-other').each(function(){
    	countRel++;
    	$(this).attr('rel', countRel);
  	});
  	$('.item-list-map .item-lm').on( "click", function( event ) {
	    var relID = $(this).attr('rel');
	    if($(this).hasClass("active-map")){
	    	//event.preventDefault();
	    }else {
	    	$('.active-map').removeClass('active-map')
		    $('.map-canvas-other').hide();
		    $('.map-canvas-other[rel=' + relID +']').fadeIn('slow', function() {
			    //mapSum();
			    initMap();
			});
		    $('.close-map').fadeIn();
		    $(this).addClass('active-map');

		    $('html, body').animate({
	            scrollTop: $('.footer-big').offset().top - 70
	        }, 1000);
	    }
	});
	$('.close-map').click(function(){
		$('.map-canvas-other').fadeOut('slow');
		$(this).fadeOut();
		$('.active-map').removeClass('active-map');

	});
}

function tabCareer() {
	/*var countRelCa = 0;
	var countRelSc = 0;
  	$('.new-employees .title a').each(function(){
    	countRelCa++;
    	$(this).attr('rel', countRelCa);
  	});
  	$('.new-employees .sc-item').each(function(){
    	countRelSc++;
    	$(this).attr('rel', countRelSc);
  	});*/
	//$('.sc-item').first().show();
	$('.new-employees li').each(function(){
		$(this).find('.sc-item').first().show();
		$(this).find('.item-cl').click(function(){
		    var relIDSC = $(this).attr('rel');
		    $(this).parents('.new-employees li').find('.sc-item').hide();
		    $('.sc-item[rel=' + relIDSC +']').fadeIn('slow');

		    return false;
		});
	});
  	
	
}
