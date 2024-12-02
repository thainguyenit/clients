$(document).ready(function() {
  
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
    
  });
  /*--------------------------------------------------
    resize
  --------------------------------------------------*/
  //var prevNowPlaying = null;
  $(window).resize(function() {

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
}); //end Document

function mainNAV(){
  var pull = $('#pull'),
      menu = $('.main-nav ul');
    $(pull).on('click', function(e) {
      e.preventDefault();
      menu.slideToggle();
    });
}


