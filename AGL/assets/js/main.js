
/*
 *  Main JS
 *  
 */
"use strict";
$(document).ready(function() {
  leftNav();
});
function leftNav() {
  $('#menu_btn').click(function(){
    if (!$("#nav").is(":visible"))
      $('#menu_btn').addClass("active");
    $("#nav").slideToggle(function() { 
      if (!$("#nav").is(":visible"))
      $('#menu_btn').removeClass("active");
    });
  });
}