//http://plugins.krajee.com/file-input
$("#file-1").fileinput({
    allowedFileExtensions: ['jpg', 'png', 'gif'],
    uploadUrl: '#',
    overwriteInitial: false,
    maxFileSize: 2000,
    showUpload: false,
    removeTitle: 'Xóa tất cả',
    removeLabel: 'Gỡ bỏ',
    browseLabel: 'Chọn hình sản phẩm',
    dropZoneTitle: 'Kéo và thả các tập tin ở đây',
    msgNo: 'No',
    msgSizeTooLarge: 'kích thước file phải nhỏ hơn 2 MB'
});
$("#file-2").fileinput({
    allowedFileExtensions: ['jpg', 'png', 'gif'],
    uploadUrl: '#',
    overwriteInitial: false,
    maxFileSize: 1000,
    showUpload: false,
    removeTitle: 'Xóa tất cả',
    removeLabel: 'Gỡ bỏ',
    browseLabel: 'Chọn file màu',
    dropZoneTitle: 'Kéo và thả các tập tin ở đây',
    msgNo: 'No',
    msgSizeTooLarge: 'kích thước file phải nhỏ hơn 1 MB'
});
$(document).ready(function(e) {

    yesnoCheck();
    checkAddress();

	$(".js-example-placeholder-single").select2();
	$('.format-price').priceFormat({
	    prefix: '',
	    suffix: ' VNĐ',
	    centsLimit: 3
	});

	$('.js-example-tags').select2({
	    maximumSelectionLength: 1,
	    tags: true,
	    formatSelectionTooBig: function(limit) {
	        return 'Bạn chỉ nhập 1 item';
	    }
	});
	$(".js-example-theme-multiple").select2({
	    theme: "classic"
	});


    $('#js-gallery').photoSwipe('.slide', {bgOpacity: 0.8, shareEl: false}, {
        close: function () {
            console.log('closed');
        }
    });


    $("#slider-cost").slider({
        min: 0,
        max: 1000,
        value: [0, 1000],
        focus: true
    });


    $('.size-color .item').each(function() {
        $(this).find('a').click(function() {
            $(this).parents('ul').find('.active-size').removeClass('active-size');
            $(this).addClass("active-size");
            return false;
        });
    });

    $('.title-mgg a').click(function() {
        $('.show-mgg').fadeIn('slow');
        $('.title-mgg').fadeOut('slow');
        return false;
    });


    $('.sle-method li').click(function() {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('active-pt');
        $('.s-pt-active').removeClass('s-pt-active');

        $('.sop-pt-item').hide();
        $(this).addClass('active-pt');
        $("#" + tab_id).fadeIn('slow').addClass('s-pt-active');
    })


    // MENU
    // jQuery(document).ready(function($){
    $('#menu_offcanvas').SnsAccordion({
        accordion: false,
        expand: false,
        btn_open: '<i class="fa fa-plus"></i>',
        btn_close: '<i class="fa fa-minus"></i>'
    });
    $('#cha_mommenu .btn2.offcanvas').on('click', function() {
        if ($('#menu_offcanvas').hasClass('active')) {
            $(this).find('.overlay').fadeOut(250);
            $('#menu_offcanvas').removeClass('active');
            $('body').removeClass('show-sidebar');
        } else {
            $('#menu_offcanvas').addClass('active');
            $(this).find('.overlay').fadeIn(250);
            $('body').addClass('show-sidebar');
        }
    });
    if ($('#cha_left').length) {
        $('#cha_mommenu .btn2.leftsidebar').css('display', 'inline-block').on('click', function() {
            if ($('#cha_left').hasClass('active')) {
                $(this).find('.overlay').fadeOut(250);
                $('#cha_left').removeClass('active');
                //$('body').removeClass('show-sidebar1');
            } else {
                $('#cha_left').addClass('active');
                $(this).find('.overlay').fadeIn();
                //$('body').addClass('show-sidebar1');
            }
        });
    }

    // ----------------cha_producttaps_wraps
    $('#cha_producttaps1 .precar').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $("#cha_producttaps1").removeClass("active");
            $(this).find('[class*="fa-caret-"]').removeClass('fa-align-justify').addClass('fa-align-justify');
            $('#cha_producttaps1 .nav-tabs').stop(true, true).slideUp("1400");
        } else {
            $(this).addClass('active');
            $("#cha_producttaps1").addClass("test");
            $(this).find('[class*="fa-caret-"]').removeClass('fa-align-justify').addClass('fa-align-justify');
            $('#cha_producttaps1 .nav-tabs').stop(true, true).slideDown("1400");
        }
    });
    // ----------AND----------------


    //-----------suggest collection
    /*$('#cha_suggest12 .fa').on('click', function() {
    	if ($(this).hasClass('active')) {
    		$(this).removeClass('active');
    		$(".cha_suggest").removeClass("active");
    		$(this).find('[class*="fa-caret-"]').removeClass('fa-align-justify').addClass('fa-align-justify');
    		$('.cha_suggest .suggest-content').stop(true, true).slideUp("1400");
    	} else {
    		$(this).addClass('active');
    		$(".cha_suggest").addClass("test");
    		$(this).find('[class*="fa-caret-"]').removeClass('fa-align-justify').addClass('fa-align-justify');
    		$('.cha_suggest .suggest-content').stop(true, true).slideDown("1400");
    	}
    });*/

    // Slideshow
    $("#slider-banner-top").owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });
    $("#partners_slider1").owlCarousel({
        items: 1,
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 3
            },
            600: {
                items: 4
            },
            980: {
                items: 5
            },
            1000: {
                items: 6
            }
        },
        nav: true,
        dots: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });
    $("#cha_thumbail").owlCarousel({
        items: 1,
        responsive: {
            0: {
                items: 3
            },
            640: {
                items: 4
            },
            768: {
                items: 3
            },
            1000: {
                items: 4
            }
        },
        nav: true,
        dots: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        loop: true
    });

    // ----------AND----------------

    $("#products_small").owlCarousel({
        items: 1,
        responsive: {
            0: {
                items: 1
            },
            530: {
                items: 2
            },
            600: {
                items: 2
            },
            800: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        },
        nav: true,
        dots: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });

    // product-slide-01
    $("#product-slide-01").owlCarousel({
        items: 1,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        },
        nav: true,
        dots: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true

    });
    $("#product-slide-02").owlCarousel({
        items: 1,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        },
        nav: true,
        dots: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true

    });
    $("#news-item").owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        },
        nav: true,
        dots: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        // singleItem: true,
        loop: true
    });
    $("#product-slide-03").owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            530: {
                items: 1
            }
        },
        nav: false,
        dots: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });


    /*$("#slider-range").slider({
    	range: true,
    	min: 0,
    	max: 16000,
    	values: [1250, 9999],
    	slide: function(event, ui) {
    		$("#amount-1").val(ui.values[0]);
    		$("#amount-2").val(ui.values[1]);
    	}
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
    	" - $" + $("#slider-range").slider("values", 1));*/

});


var __slice = [].slice;
(function(e, t) {
    var n;
    n = function() {
        function t(t, n) {
            var r, i, s, o = this;
            this.options = e.extend({}, this.defaults, n);
            this.$el = t;
            s = this.defaults;
            for (r in s) {
                i = s[r];
                if (this.$el.data(r) != null) {
                    this.options[r] = this.$el.data(r)
                }
            }
            this.createStars();
            this.syncRating();
            this.$el.on("mouseover.starrr", "span", function(e) {
                return o.syncRating(o.$el.find("span").index(e.currentTarget) + 1)
            });
            this.$el.on("mouseout.starrr", function() {
                return o.syncRating()
            });
            this.$el.on("click.starrr", "span", function(e) {
                return o.setRating(o.$el.find("span").index(e.currentTarget) + 1)
            });
            this.$el.on("starrr:change", this.options.change)
        }
        t.prototype.defaults = {
            rating: void 0,
            numStars: 5,
            change: function(e, t) {}
        };
        t.prototype.createStars = function() {
            var e, t, n;
            n = [];
            for (e = 1, t = this.options.numStars; 1 <= t ? e <= t : e >= t; 1 <= t ? e++ : e--) {
                n.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"))
            }
            return n
        };
        t.prototype.setRating = function(e) {
            if (this.options.rating === e) {
                e = void 0
            }
            this.options.rating = e;
            this.syncRating();
            return this.$el.trigger("starrr:change", e)
        };
        t.prototype.syncRating = function(e) {
            var t, n, r, i;
            e || (e = this.options.rating);
            if (e) {
                for (t = n = 0, i = e - 1; 0 <= i ? n <= i : n >= i; t = 0 <= i ? ++n : --n) {
                    this.$el.find("span").eq(t).removeClass("glyphicon-star-empty").addClass("glyphicon-star")
                }
            }
            if (e && e < 5) {
                for (t = r = e; e <= 4 ? r <= 4 : r >= 4; t = e <= 4 ? ++r : --r) {
                    this.$el.find("span").eq(t).removeClass("glyphicon-star").addClass("glyphicon-star-empty")
                }
            }
            if (!e) {
                return this.$el.find("span").removeClass("glyphicon-star").addClass("glyphicon-star-empty")
            }
        };
        return t
    }();
    return e.fn.extend({
        starrr: function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            return this.each(function() {
                var i;
                i = e(this).data("star-rating");
                if (!i) {
                    e(this).data("star-rating", i = new n(e(this), r))
                }
                if (typeof r === "string") {
                    return i[r].apply(i, t)
                }
            })
        }
    })
})(window.jQuery, window);
$(function() {
    return $(".starrr").starrr()
})

$(function() {
    $('.starrr').on('starrr:change', function(e, value) {
        ratingsField.val(value);
    });
});

function yesnoCheck() {
    if ($("#in-no-acc").is(':checked')) {
        $("#in-txt-no-acc").prop('disabled', false);
        $("#in-txt-have-acc").prop('disabled', true);
    } else {
        $("#in-txt-no-acc").prop('disabled', false);
        $("#in-txt-have-acc").prop('disabled', false);
    }
}

function checkAddress() {
    $('.input-pay').click(function(event) {
        if ($(this).is(':checked')) {
            $('.pay-cart-open').slideDown('slow');
        } else {
            $('.pay-cart-open').fadeOut('slow');
        }
    });
    $('.address-list .fo-item').each(function() {
        if ($(this).find('.input-add').is(':checked')) {
            //alert("it's checked");
            $(this).addClass("choose-add");
        }

        $(this).click(function() {
            $('.choose-add').removeClass('choose-add');
            $(this).addClass("choose-add");

            if ($(this).find('.input-add-other').is(':checked')) {
                $('.address-other').slideDown('slow')
            } else {
                $('.address-other').fadeOut('slow');
            }

            //$('.choose-add').removeClass('choose-add');
            //$(this).addClass("choose-add").children("input[@type=radio]").click();
            //$(this).children("input").attr("value");

            //$('input:radio').attr("checked", false);
            //$("input:radio").removeAttr("checked");
            //$('.choose-add').removeClass('choose-add');
            //$(this).addClass('choose-add').children("input").attr("checked","checked");
            //return false;
            /*$('.choose-add').removeClass('choose-add');
            $("input:radio").removeAttr("checked");
            if ($(this).hasClass('choose-add')) {
            	//$('input:radio').attr("checked", "checked");
            }
            else {
            	$(this).addClass('choose-add');
            	$(this).find('input:radio').attr("checked", "checked");
            }*/
        });
    });
}
