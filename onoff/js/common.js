$(document).ready(function() {
  $('.flexslider').flexslider({
    pausePlay: false,
    pauseOnHover: true,
    slideshowSpeed: 3200,
    animationSpeed: 800,
    animation: "fade",
    after: function (slider){
      if (!slider.playing){
        slider.pause();
        slider.play();
        slider.off( "mouseenter mouseleave" );
        slider.off( "mouseover mouseout" );
        slider.mouseover( function() {
           if ( !slider.manualPlay && !slider.manualPause ){
             slider.pause();
           }
        }).mouseout( function() {
           if (!slider.manualPause && !slider.manualPlay && !slider.stopped){
             slider.play();
           }
        }); 
      }
    }
  });
  //Next page
  $('.load-more span').click(function(){
    loadJsonData.loadPage();
    return false;
  });

  navHash();
  refreshBrowser();
  loadJsonData.ajaxLoadData();
  loadJsonDataDetail.ajaxloadDetail();
  //checkActiveLang();
});

function displayInOrder(){
  $('.survay div').hide();
  $('.s1').delay(1000).fadeIn('slow');
  $('.s2').delay(2000).fadeIn('slow');
  $('.s3').delay(3000).fadeIn('slow');
  $('.s4').delay(3000).fadeIn('slow');
  $('.s5').delay(4000).fadeIn('slow');
  $('.s6').delay(4500).fadeIn('slow');
  $('.s7').delay(4500).fadeIn('slow');
  $('.s8').delay(5000).fadeIn('slow');
  $('.s9').delay(5500).fadeIn('slow');
  $('.s10').delay(5500).fadeIn('slow');
  $('.s11').delay(6000).fadeIn('slow');
}


/*function checkActiveLang(){
  $('.social-ac span').click(function(){
    $('.social-ac span').removeClass('activeSo');
    $(this).addClass('activeSo');
  });
}*/

// Catch Hash for button back & next of browser
$(window).bind('hashchange',function(){
  refreshBrowser()
});
//tim hieu cai nay, no la nguyen nhan gay roi 
//$(window).trigger('hashchange');

//config
var url_base; //http://www.onoff.ne.jp
url_base = 'http://www.onoff.ne.jp'; 
if($('.activeSo').attr('dataname') == 'en'){
  url_base = 'http://www.onoff.ne.jp/en'; 
}
var getWorkList = url_base + '/API/get-works.json';
var getWorkDetail = url_base + '/API/get-works-detail.json';

// load json Data list
var loadJsonData = (function(){
  //config
  ajax_config = { lang: 'ja', page: 1};
  current_page = 1;

  //load Data by call ajax
  function ajaxLoadData(){
    if($('#choseA').attr('dataname') == 'work-list'){
      $.ajax({
        url: getWorkList,
        //cache: !1,
        type: 'GET',
        dataType: 'json',
        data: ajax_config,
        beforeSend: function(){},
        success: loadDataList,
        error: function(){ console.log(' ajax is error!'); }
      });
    }
  }
  
  // load data
  function loadDataList(v){
    if(v.status == false)//if data is empty --> do nothing
      return;
    //check: next page is exist? -->view more btn 
    if(v.is_next == true){
      //alert('true');
    }else{
      //alert('false');
    }
    appendWorkList(v);

  }

  // append new data in view
  function appendWorkList(v){    
    var $ul = $('.hash-detail ul'),
        $html = '',
        $result = '',
        $value = v.data;
    //check existing of data 
    if(v.count != 0){ // count: giá trị trong json
      for(var i=0; i < $value.length; i++){
          $result = $value[i];
          $html = '<li>'
            $html += '<a href="#" title="'+ $result.title_en +'" dataname="'+ $result.id +'">'
              if($('.activeSo').attr('dataname') == 'en'){
                $html += '<img src="'+ '../' + $result.thumb_pc +'" alt="" />'
                $html += '<p>'+ $result.title_en +'</p>'
              }
              if($('.activeSo').attr('dataname') == 'jp'){
                $html += '<img src="'+ $result.thumb_pc +'" alt="" />'
                $html += '<p>'+ $result.title_jp +'</p>'
              }
//              $html += '<span>'+ $result.ourworks +'</span>'
            $html += '</a>'
          $html += '</li>';
          $($ul).append($html);
      }
      $('li:nth-child(3n+1)', $ul).addClass('alpha');
    }else {
      alert("no data");
    }
  }

  //load them data vao view
  function loadPage(){
    current_page++;
    ajax_config.page = current_page;
    ajaxLoadData();
    //hidden next button when it be last page.
    /*if (v.is_next == false ){ // is_next: giá trị trong json
      $('.load-more').addClass('hidecontrol');
    }*/
  }

  //return
  return{
    ajaxLoadData:ajaxLoadData,
    appendWorkList:appendWorkList,
    loadDataList:loadDataList,
    loadPage:loadPage
  }

})();

// loadJsonDataDetail
var loadJsonDataDetail = (function(){
  //config
  ajax_config = { lang: 'ja', page: 1};
  function ajaxloadDetail(){
    if($('#choseB').attr('dataname') == 'work-detail'){
      $.ajax({
        url: getWorkDetail,
        //cache: !1,
        type: 'GET',
        dataType: 'json',
        data: ajax_config,
        beforeSend: function(){},
        success: loadDataDetail,
        error: function(){ console.log(' ajax is error!'); }
      });
    }
  }

  function loadDataDetail(v){
    if(v.status == false)//if data is empty --> do nothing
      return;
    //check: next page is exist? -->view more btn 
    if(v.is_next == true){
      //alert('true');
    }else{
      //alert('false');
    }
    appendWorkDetail(v);
  }

  // append detail data in view
  function appendWorkDetail(v){
    var $div = $('.con-detail-works'),
        $html = '',
        $result = '',
        $value = v.data;
    //check existing of data
    resetData();
    if(v.count != 0){
      for(var i=0; i<$value.length; i++){
        $result = $value[i];
        var itemN = window.location.hash.slice(7);
        if($result.id === itemN){
            if($('.activeSo').attr('dataname') == 'en'){
              $html = '<div class="close-detail"><a href="http://www.onoff.ne.jp/en/#works"></a></div>'
            }
            if($('.activeSo').attr('dataname') == 'jp'){
              $html = '<div class="close-detail"><a href="http://www.onoff.ne.jp/#works"></a></div>'
            }
            $html += '<div class="des-de">'
              if($('.activeSo').attr('dataname') == 'en'){
                $html += '<h3 class="title-h3">'+ $result.title_en +'</h3>'
                $html += '<h3 class="info-h3">'
                    $html += '<a href="'+ $result.url +'">'+ $result.url +'</a><br />'
                    $html += $result.client_en
                $html += '</h3>'
                $html += '<div class="fck">'+ $result.des_en +'</div>'
              }
              if($('.activeSo').attr('dataname') == 'jp'){
                $html += '<h3 class="title-h3">'+ $result.title_jp +'</h3>'
                $html += '<h3 class="info-h3">'
                    $html += '<a href="'+ $result.url +'">'+ $result.url +'</a><br />'
                    $html += $result.client_jp
                $html += '</h3>'
                $html += '<div class="fck">'+ $result.des_jp +'</div>'
              }
              
              $html += '<div class="more-info">'
                  $html += $result.ourworks +'<br />'
//                  $html += 'Art director: '+ $result.artdirector +'<br />'
//                  $html += 'Direction: '+ $result.direction +'<br />'
//                  $html += 'Design: '+ $result.design +'<br />'
//                 $html += 'Cording: '+ $result.cording +'<br />'
              $html += '</div>'
          $html += '</div>'
          $html += '<div class="list-img">'
              if($('.activeSo').attr('dataname') == 'en'){
                $html += '<img src="'+ '../' + $result.thumb_01 +'" alt="" />'
                $html += '<img src="'+ '../' + $result.thumb_02 +'" alt="" />'
                $html += '<img src="'+ '../' + $result.thumb_03 +'" alt="" />'
              } 
              if($('.activeSo').attr('dataname') == 'jp'){
                $html += '<img src="'+ $result.thumb_01 +'" alt="" />'
                $html += '<img src="'+ $result.thumb_02 +'" alt="" />'
                $html += '<img src="'+ $result.thumb_03 +'" alt="" />'
              }
          $html += '</div>';
          $($div).append($html);
        }else {
          //alert('not value');
        }
        
      }
    }else {
      alert('no data');
    }
    
  }
  //return
  return{
    ajaxloadDetail:ajaxloadDetail,
    appendWorkDetail:appendWorkDetail,
    loadDataDetail:loadDataDetail
  }

})();

function resetData(){
  var reset_data = '';
  $('.con-detail-works').html(reset_data);
}
// get hash detail
function getHashDetail(){
  jQuery(document).on("click", ".hash-detail li a", function (event) {
    var hdt = $(this).attr('dataname');
    newHashD = 'works/' + hdt;
    window.location.hash = newHashD;
    loadJsonDataDetail.ajaxloadDetail();
    $('.sec-com').fadeOut('slow');
    return false;
  });

}

// get nav hash
function navHash(){
  var aitem = $('.hashCl a');
  var flat = true;
  if(window.location.hash){
    flat = false;
  }
  $(aitem).click(function(e){
    $('body').removeClass('fixbody');
    $('.inner-he').removeClass('change-he');
    $('.inner-he').animate({'padding-bottom': '0'}, 500);
    $(".location").slideUp( "slow");
    $('.showFix').animate({
      height: '0'
    }, 'fast' );

    window.location.hash = $(this).attr('dataname');
    var locaP = window.location.hash.substring(1);
    if(flat){
      $(aitem).removeClass('active');
      $(this).addClass('active');
      $('.sec-com').fadeOut('slow');
      flat = false;
    }
    if(!$(this).hasClass('active')){
        $('.sec-com').fadeOut('slow');
        $(aitem).removeClass('active');
        $(this).addClass('active');   
    }
    if(locaP === 'works'){
      getHashDetail();
    }
    return false;
  });
}

// keep hash
function keepHash(){
  newHash = window.location.hash;
  var keepH = newHash.substring(1);
  requestHash(keepH);
  return keepH;
}

// check Hash after refresh browser + button back & next of browser
function refreshBrowser(){
  $('.sec-com').css('display','none');
  var keepH = keepHash();
  var aitemW = $('.nav-he li:nth-child(3) a');
  var aitem = $('.inner-he a');
  $(aitem).removeClass('active');
  var ahW = keepH.indexOf("/");
  if(ahW > 0){
    $(aitemW).addClass('active');
    loadJsonDataDetail.ajaxloadDetail();
  }
  if(keepH !== '' ){
    $('.inner-he a').filter(function( index ) {
      return $(this).attr("dataname") === keepH;
    }).addClass('active');
  } else {
    window.location.hash = 'home-page';
  }
  if(keepH === 'works'){
    getHashDetail();
  }

}

//Hàm xử lý  Hash
function requestHash(hashUrl){
  var hn = hashUrl;
  var hnH = hn.indexOf("/");
  //switch
  if(hnH > 0){
    $('.works').fadeOut('fast');
    $('.works-detail').delay(700).fadeIn();
  } else {
    $('.works-detail').fadeOut('fast');
    switch (hn){
      case "home-page":
        $('.home-page').delay(700).fadeIn();
        break;
      case "about-us":
        $('.about-us').delay(700).fadeIn();
        break;
      case "service":
        $('.service').delay(700).fadeIn();
        displayInOrder();
        break;
      case "works":
        $('.works').delay(700).fadeIn();
        break;
      case "company":
        $('.company').delay(700).fadeIn();
        break;
      case "recruit":
        $('.recruit').delay(700).fadeIn();
        break;
      case "contact":
         $('.contact').delay(700).fadeIn();
        break;
      default:
          break;
    }
  }
  return hn;
}



