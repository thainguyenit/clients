$(document).ready(function() {
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
    elementsHeight['section-' + counter] = $(this).outerHeight(true);
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
    /*if (!flag) {
      return; 
    }*/
    if(flag){
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
    }
    buttonNextPage();
  });
  
  /*--------------------------------------------------
    resize
  --------------------------------------------------*/
  $(window).resize(function() {
    flag = false;
    buttonNextPage();
    resizeTimer = setTimeout(checkCLass(), 2000);
    //
    resizeContent();

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

  //
  mainNAV();
  resizeContent();
}); //end Document

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
        .delay(2000)
        .fadeOut(2000, showNextQuote);
  }
  
  showNextQuote();
    
})();
