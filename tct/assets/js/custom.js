/*------------------------------------------------------------------
    Thai Nguyen
    thainguyenit@gmail.com

-------------------------------------------------------------------*/
$(document).ready(function() {

    // Preloader
    $(window).on('load', function() {
        var $preloader = $('#page-preloader'),
            $spinner = $preloader.find('.spinner');
        $spinner.fadeOut();
        $preloader.delay(350).fadeOut(800);
    });


    removeSo();
    IsSafari();
    visionab();

    /* <!-- =============================================== --> */
    /* <!-- ========== Menu Links Scroll ===+============== --> */
    /* <!-- =============================================== -->  */
    $('.scroll').click(function(e) {
        var off = -95;
        var target = this.hash;
        if ($(target).offset().top == 0) {
            off = 0;
        }
        $('html,body').scrollTo(target, 800, {
            offset: off,
            easing: 'easeInOutExpo'
        });
        e.preventDefault();
        //   ---- dissapearing menu on click
        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').removeClass('in').addClass('collapse');
        }
    });

    /* <!-- =============================================== --> */
    /* <!-- ===============  Scrollspy fix ================ --> */
    /* <!-- =============================================== --> */
    $(window).on('load', function() {
        var $body = $('body'),
            $navtop = $('#nav'),
            offset = $navtop.outerHeight();
        // Enable scrollSpy with correct offset based on height of navbar
        $body.scrollspy({
            target: '#nav',
            offset: offset
        });
        // function to do the tweaking
        function fixSpy() {
            // grab a copy the scrollspy data for the element
            var data = $body.data('bs.scrollspy');
            // if there is data, lets fiddle with the offset value
            if (data) {
                // get the current height of the navbar
                offset = $navtop.outerHeight();
                // change the data's offset option to match
                data.options.offset = offset
                    // now stick it back in the element
                $body.data('bs.scrollspy', data);
                // and finally refresh scrollspy
                $body.scrollspy('refresh');
            }
        }
        // Now monitor the resize events and make the tweaks
        var resizeTimer;
        $(window).resize(function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(fixSpy, 200);
        });
    });


    $('.home-header .carousel').carousel({
        interval: 8000,
        swipe: 30
    });
    $('.about-box .carousel').carousel({
        pause: true,
        interval: false,
        swipe: 30
    });

    // Fancybox 
    $(".fancybox").fancybox();

    $('.grid-item-life > a ').each(function() {
        $(this).hoverdir();
    });

    var agent = navigator.userAgent;
    var $container = $('.gallery-items');
    var $benifit = $('.list-benifit');
    var $isotopeGrid = $('.isotopeGrid');

    if (agent.search(/iPad/) == -1) {
        $(".itemBase").hover(
            function() {
                var method = 'easeOutExpo';
                var txt = $(this).find(".txt");
                var txt2 = $(this).find(".txt2");
                var bg = $(this).find(".bg");

                var item = $(this).find('.item');
                item.stop().opacity(0.5, 300, 'easeInOutCubic');

                txt.stop().fadeOut('fast', function() {
                    txt2.stop().fadeIn('fast', function() {

                    });
                });

                bg.stop().animate({
                    width: '60%'
                }, {
                    duration: 1000,
                    easing: method
                });
            },
            function() {
                var method = 'easeOutExpo';
                var txt = $(this).find(".txt");
                var txt2 = $(this).find(".txt2");
                var bg = $(this).find(".bg");

                var item = $(this).find('.item');

                item.stop().opacity(1, 300, 'easeInOutCubic');
                txt2.stop().fadeOut('fast', function() {
                    txt.stop().fadeIn('fast', function() {

                    });
                });
                txt.stop().animate({
                    opacity: 1
                }, 200, 'easeInOutCubic');
                bg.stop().animate({
                    width: '30%'
                }, {
                    duration: 1000,
                    easing: method
                });
            }
        );
    }

    $(window).load(function() {

        $container.isotope({
            transitionDuration: '0.8s',
            //itemSelector: '.grid-item',
            // set layoutMode
            layoutMode: 'masonry',
            // options for cellsByRow layout mode
            cellsByRow: {
                columnWidth: 0,
                rowHeight: 0
            },
            // options for masonry layout mode
            masonry: {
                columnWidth: $container.find('.pic-item:not(.wide)')[0]
            }
        });


        $benifit.isotope({
            transitionDuration: '0.8s',
            masonry: {
                columnWidth: $benifit.find('.grid-item:not(.wide)')[0]
            }
        });

        
        $isotopeGrid.isotope({
            transitionDuration: '0.8s',
            itemSelector: '.grid-item-life',
            //layoutMode: 'masonry',
            /*masonry: {
                    columnWidth: 1
                },
            cellsByRow: {
                columnWidth: 0,
                rowHeight: 0
            },*/
            // options for masonry layout mode
            masonry: {
                //columnWidth: $isotopeGrid.find('.grid-item-life:not(.wide)')[0]
               columnWidth: 1
            }
        });
        $(window).resize(function() {
            $container.isotope('layout');
            $benifit.isotope('layout');
            $isotopeGrid.isotope('layout');
        });

    });


    
    $('.respon-slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    // filter items on button click
    $('#filters').on('click', 'button', function(e) {
        $(e.target).toggleClass('active').siblings().removeClass("active");
        var filterValue = $(this).attr('data-filter');
        $container.isotope({
            filter: filterValue
        });
    });
    $('#filters button').each(function() {
        if ($(this).hasClass("active")) {
            var filterValue = $(this).attr('data-filter');
            $container.isotope({
                filter: filterValue
            });
        }
    });

    var currentIndex = 0,
        items = $('#filters button'),
        itemAmt = items.length;

    function cycleItems() {
        var item = $('#filters button').eq(currentIndex);
        items.removeClass('active');
        item.addClass('active');
        $('#filters button').each(function() {
            if ($(this).hasClass("active")) {
                var filterValue = $(this).attr('data-filter');
                $container.isotope({
                    filter: filterValue
                });
            }
        });
    }

    /* <!-- =============================================== --> */
    /* <!-- ============ Herader Animation =========== --> */
    /* <!-- =============================================== -->  */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 15) {
            $('.ch-navbar').addClass("navbar-alt")
        } else {
            $('.ch-navbar').removeClass("navbar-alt")
        }

        if ($(this).scrollTop() > 100) {
            $('.scrollToTop-vn').fadeIn();
        } else {
            $('.scrollToTop-vn').fadeOut();
        }
        
    });

    $('.scrollToTop-vn').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    /*$(window).resize(function() {
        if ($(window).width() < 769) {
            $('.floated .with-border').removeClass('with-border');
        } else {
            $('.navbar-nav').addClass('with-border');
        }
        removeSo();
    });*/
        

    new WOW().init();
}); // Document ready

function visionab() {
    var countVi = 0;
    var countCrVi = 0;
    $('.panel-default .panel-heading').each(function() {
        countVi++;
        $(this).attr('rel', countVi);
    });
    $('.circle-vision .cvi-com').each(function() {
        countCrVi++;
        $(this).attr('rel', countCrVi);
    });
    var thisTa;
    var relID;
    $(".panel-default .panel-heading").hover(
        function() {
            thisTa = $(this);
            relID = thisTa.attr('rel');
            $('.cvi-com').removeClass('ch-efcvi');
            $('.cvi-com[rel=' + relID + ']').addClass('ch-efcvi');
        },
        function() {
            $('.cvi-com[rel=' + relID + ']').removeClass('ch-efcvi');
        }
    );
    $(".circle-vision .cvi-com").hover(
        function() {
            thisTa = $(this);
            relID = thisTa.attr('rel');
            $('.panel-default .panel-heading').removeClass('ch-efcvi');
            $('.panel-default .panel-heading[rel=' + relID + ']').addClass('ch-efcvi');
        },
        function() {
            $('.panel-default .panel-heading[rel=' + relID + ']').removeClass('ch-efcvi');
        }
    );
}

function removeSo() {
    if ($(window).width() < 800) { //769
        $('.inner-solu').find('.card-container').removeClass('card-container');
        $('.inner-solu').find('.card').removeClass('card')
    } else {
        $('.inner-solu').find('.sp-solu').addClass('card-container');
        $('.inner-solu').find('.sp-ilu').addClass('card')
    }

}
(function($) {
    $(function() {

        var activeWidth = $('.card-container').width();
        var activeImgWidth = $('.card-container .card div').width();

        function balanceCards() {
            // Calc offset for active card
            var index = $('.card-container').index($('.active'));
            var offset = -1 * ((index * activeWidth) + (activeImgWidth / 2));

            //$('.card-container.active').css({ "margin-left": offset + "px"});
        }

        balanceCards();

        $('.card div').click(function(e) {
            e.preventDefault();
            $(this).parents('.card-container').siblings().not('.' + $(this).attr("class")).removeClass("active").css({
                "margin-left": "0px"
            });
            $(this).parents('.card-container').addClass("active");
            balanceCards();
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space

function IsSafari() {

    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    var isPhone = ua.indexOf("iphone") > -1; //&& ua.indexOf("mobile");

    if (navigator.appVersion.indexOf("Mac") != -1) {

        if (ua.indexOf('safari') != -1) {
            if (ua.indexOf('chrome') > -1) {
                //alert("1") // Chrome
            } else {
                $('#container').addClass('fixSafari');
            }
        }
    }
    if (isAndroid || isPhone) {
        $('#container').removeClass('fixSafari');
    }

}