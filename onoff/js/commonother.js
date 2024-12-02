$(document).ready(function() {
  martcl();
  showlcrigh();

});
$(window).resize(function() {
    martcl();
    $(".location").hide('fast');
    $('.inner-he').removeClass('change-he');
    $('body').removeClass('fixbody');
    $('.showFix').hide('fast');
});
function martcl(){
  var winHeight = $(window).outerHeight();
  var lcHeight = $('.location').outerHeight();
  var navHeight = $('.inner-he').outerHeight();
  var footerHeight = $('.footer').outerHeight();
  var contentHeight = $('.content').outerHeight();

  var lc_nav_fo = lcHeight + navHeight + footerHeight;
  var lc_nv = lcHeight + navHeight;

  var resultH = winHeight - lc_nav_fo;
  var c_H = contentHeight + 62;
  var reCH = c_H - lc_nv -34;

  //alert(resultH);
  if(c_H >= lc_nv && winHeight >= lc_nv){
    //alert(1);
    $('body').addClass('fixbody');
    return resultH;
  }
  if(c_H >= lc_nv && winHeight <= lc_nv){
    //alert(2);
    return reCH;
  }
  if(c_H <= lc_nv && winHeight <= lc_nv){
    //alert(3);
  }
  if(c_H <= lc_nv && winHeight >= lc_nv){
    //alert(4);
     return resultH;
  }
}

function showlcrigh(){
  $('.show-Local').click( function(event) {
      var showFixHeight = $('.showFix');
      var locaI = $(".location");
      var resultH = martcl();
      //
      event.preventDefault();
      if (locaI.is( ":visible" )){
        locaI.slideUp('slow');
        $('.inner-he').removeClass('change-he');
        $('.inner-he').animate({'padding-bottom': '0'}, 500);
        $('body').removeClass('fixbody');
        $(showFixHeight).animate({
          height: '0'
        }, 500 );
      } else {
        locaI.slideDown('slow');
        $('.inner-he').addClass('change-he');
        $('.inner-he').animate({'padding-bottom': '34px'}, 500);
        $(showFixHeight).show();
        $(showFixHeight).animate({
          height: resultH
        }, 500 );
      }
      return false;
  });
}