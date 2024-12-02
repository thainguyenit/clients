$(document).ready(function() {
  /*$(".nav-M li a").hover(function(){
    $(this).css("background-color","#0089ce");
    },function(){
    $(this).css("background-color","");
  });*/
  /*--------------------------------------------------
    Click NAV
  --------------------------------------------------*/
  var containerObj = $('#content'),
      tabObj = $('.nav-M'),
      height = $('li', tabObj).outerHeight(),
      elementsHeight = {},
      counter = 0,
      flag = true;
  
  $('.sections').each(function() {
    counter++;
    $(this).attr('ref', counter);
    //elementsHeight['section-' + counter] = $(this).outerHeight(true);
  });
  // Click NAV
  $('a', tabObj).click(function(){
    flag = false;
    $('a.current', tabObj).removeClass('current');
    if($(window).width() <= 767){
      $(tabObj).hide();
    }
    var sectionID = $(this).attr('rel');
    var scrollChange = $('.sections[ref=' + sectionID +']', containerObj).offset().top - 53;
    $('html, body').animate({scrollTop: scrollChange}, function() {setTimeout(function() {flag = true;}, 0);});
    $(this).addClass('current');

    buttonNextPage();
    return false;
  });

  // go next page
  $('.nextpage').bind('click', function(e){
    flag = false;
    e.preventDefault();
    $(tabObj).each(function(){
       var $selected = $('a.current',$(this));
        if($selected.length){
          var sectionID = Number($selected.attr('rel'));
          var nextP = sectionID + 1;
          if(nextP <= 6){
            var scrollChange = $('.sections[ref=' + nextP +']', containerObj).offset().top - 53;
            $('html, body').animate({scrollTop: scrollChange}, function() {setTimeout(function() {flag = true;}, 0);});
            $('a.current', tabObj).removeClass('current');
            $('a[rel=' + nextP +']', tabObj).addClass('current');
          }else {
            return false;
          }
          
        }
    });
    buttonNextPage();
    return false;
  });
  var Hhomepage = $('.home-page').outerHeight();
  var Hcompanypage = $('.company-page').outerHeight();
  var Hproductpage = $('.product-page').outerHeight();
  var Hnewspage = $('.news-page').outerHeight();
  var Hpresspage = $('.press-page').outerHeight();
  var Hcontactpage = $('.contact-page').outerHeight();
  var hWindow = $(window).height();
  /*--------------------------------------------------
    scroll nav
  --------------------------------------------------*/
  $(window).scroll(function(){
    //show page top + fix nav
    if($(this).scrollTop() >= 143){
      $('.pageTop').fadeIn("slow");
      $('.main-nav').addClass("fixNav");
    }else {
      $('.pageTop').fadeOut("slow");
      $('.main-nav').removeClass("fixNav");
    }
    //map
    if($(this).scrollTop() >= 681){
      $('.list-map li').addClass('an-map');
    }else {
      $('.list-map li').removeClass('an-map');
    }
    //
    /*if(hWindow <= Hhomepage + 25 && $(this).scrollTop() >= 10){
      $(".nextpage").removeClass('changeNextPage');
    } else if (hWindow <= Hhomepage + 25 && $(this).scrollTop() <= 10){
      $(".nextpage").addClass('changeNextPage');
    }
    if(hWindow >= Hhomepage + 25 && $(this).scrollTop() >= 10){
      $(".nextpage").removeClass('changeNextPage');
    } else {
      $(".nextpage").removeClass('changeNextPage');
    }*/
    /*if($(this).scrollTop() >= 10 && hWindow >= Hhomepage + 25){
      $(".nextpage").removeClass('changeNextPage');
    }else if ($(this).scrollTop() <= 10 && hWindow <= Hhomepage + 25){
      $(".nextpage").addClass('changeNextPage');
    }*/

    /*if(hWindow <= Hhomepage + 25){
    $(".nextpage").addClass('changeNextPage');
  }else {
    $(".nextpage").removeClass('changeNextPage');
  }*/

    //
    if (!flag) {
      return; 
    }
    /*if(flag){
      var _top = $('.sections[ref=1]', containerObj).offset().top - 53;
      var top = $(this).scrollTop();
      $('a', tabObj).removeClass('current');
      var top1 = _top;
      for (var i = 0; i < counter; i++) {
        var j = i + 1;
        top1 += elementsHeight.hasOwnProperty('section-' + i) ? elementsHeight['section-' + i] : 0;
        var top2 = top1 + elementsHeight['section-' + j];
        if (top + i >= top1 && top < top2) {
          $('a', tabObj).removeClass('current');
          $('a[rel=' + j + ']', tabObj).addClass('current');
        }
      }
    }*/
    var _top = $('.sections[ref=1]', containerObj).offset().top - 53;
    var top = $(this).scrollTop();
    $('a', tabObj).removeClass('current');
    var top1 = _top;

     if (top >= _top && top < _top + Hhomepage) {
      $('a[rel=1]', tabObj).addClass('current');
    }
    
    if (top >= _top + Hhomepage && top < _top + Hhomepage + Hcompanypage) {
      $('a[rel=2]', tabObj).addClass('current');
    }
    if (top >= _top + Hhomepage + Hcompanypage && top < _top + Hhomepage + Hcompanypage + Hproductpage) {
      $('a[rel=3]', tabObj).addClass('current');
    }
    if (top >= _top + Hhomepage + Hcompanypage + Hproductpage && top < _top + Hhomepage + Hcompanypage + Hproductpage + Hnewspage) {
      $('a[rel=4]', tabObj).addClass('current');
    }
    if (top >= _top + Hhomepage + Hcompanypage + Hproductpage + Hnewspage && top < _top + Hhomepage + Hcompanypage + Hproductpage + Hnewspage + Hpresspage) {
      $('a[rel=5]', tabObj).addClass('current');
    }
    if (top >= _top + Hhomepage + Hcompanypage + Hproductpage + Hnewspage + Hpresspage && top < _top + Hhomepage + Hcompanypage + Hproductpage + Hnewspage + Hpresspage +Hcontactpage) {
      $('a[rel=6]', tabObj).addClass('current');
    }

    buttonNextPage();
  });

  /*--------------------------------------------------
    resize
  --------------------------------------------------*/
  $(window).resize(function() {
    var Hhomepage = $('.home-page').outerHeight();
    var Hcompanypage = $('.company-page').outerHeight();
    var Hproductpage = $('.product-page').outerHeight();
    var Hnewspage = $('.news-page').outerHeight();
    var Hpresspage = $('.press-page').outerHeight();
    var Hcontactpage = $('.contact-page').outerHeight();

    buttonNextPage();
    resizeTimer = setTimeout(checkCLass(), 2000);
    //
    resizeContent();
    //changeColor();

    if($(window).width() >= 767){
      $('.nav-M').show();
    }
  });
  /*--------------------------------------------------
    Common
  --------------------------------------------------*/

  //scroll to top page
  $('body,html').animate({
    scrollTop: 0 
  }, 800);

  //click pagetop
  $('.pageTop').click(function(){
    $('body,html').animate({
      scrollTop: 0 
    }, 800);
  });

  ///
  $('.img02 a').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    scrollToDiv(elWrapped,53);
    return false;
  });
  
  function scrollToDiv(element,navheight){    
    var offset = element.offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop-navheight;
    $('body,html').animate({
        scrollTop: totalScroll
    }, 500);
  }

  //
  //changeColor();
  mainNAV();
  resizeContent();
}); //end Document
//change color next page
/*function changeColor(){
  var hWindow = $(window).height();
  var Hhomepage = $('.home-page').outerHeight();
  if(hWindow <= Hhomepage + 25){
    $(".nextpage").addClass('changeNextPage');
  }else {
    $(".nextpage").removeClass('changeNextPage');
  }
}*/
//
function checkCLass(){
  var tabObj = $('.nav-M'),
      containerObj = $('#content');
  $(tabObj).each(function(){
   var $selected = $('a.current',$(this));
    if($selected.length){
      var sectionID = $selected.attr('rel');
      var scrollChange = $('.sections[ref=' + sectionID +']', containerObj).offset().top - 53;
      $('html, body').animate({scrollTop: scrollChange}, 0);
      flag = true;
    }
  });
}
function buttonNextPage(){
  if($('.nav-M li:last-child a').hasClass('current')){
    $('.nextpage').fadeOut('slow');
  }else {
    $('.nextpage').fadeIn('slow');
  }
}

function resizeContent() {
  var winHeight = $(window).height();
  var footerHeight = $('.footer').height();
  var lastSectionObj = $('.sections:last');
  var realHeightLastSection = $(lastSectionObj).css('height', 'auto').height();

  var heightNAV = $('.main-nav').height();
  var newHeight = winHeight - footerHeight - heightNAV;

  if(newHeight >= realHeightLastSection){
    $(lastSectionObj).css('height', newHeight);
  }

}
function mainNAV(){
  var pull = $('#pull'),
      menu = $('.main-nav ul');
    $(pull).on('click', function(e) {
      e.preventDefault();
      menu.slideToggle();
    });
}

(function() {
  var quotes = $(".home-page li");
  var quoteIndex = -1; 
  function showNextQuote() {
    ++quoteIndex;
    quotes.eq(quoteIndex % quotes.length)
        .fadeIn(2000)
        .delay(0)
        .fadeOut(2000, showNextQuote);
  }
  showNextQuote();
  
    
})();



