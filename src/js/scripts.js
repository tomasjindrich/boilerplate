/*!
 * project v1.0.0
 * project
 * (c) 2020 Tomas Jindrich
 */

/*------------------------------------*\
    Lazy Load
\*------------------------------------*/
var lazyLoad = new LazyLoad({
  elements_selector: ".lazy"
});


/*------------------------------------*\
    Animate on Scroll
\*------------------------------------*/
// AOS.init({
//   disable: 'mobile',
//   duration: 600,
//   once: true
// });


/*------------------------------------*\
    Overlay (mobile) menu
\*------------------------------------*/
var elMenu = $(".main-menu-overlay");
var elMenuOpenBtn = $(".main-menu-overlay-open");
var elMenuCloseBtn = $(".main-menu-overlay-close");

var elHeader = $('.header');

var elMoveOnTop = $('.move-on-top');

$((function() {                       
  elMenuOpenBtn.click((function() { 
    elHeader.addClass("hidden");
    elMenu.addClass("visible");
    elMenu.removeClass("hidden");
  }));
  elMenuCloseBtn.click((function() {
    elHeader.removeClass("hidden");
    elMenu.removeClass("visible");
    elMenu.addClass("hidden");
  }));
}));


/*------------------------------------*\
    Toggle header on scroll
\*------------------------------------*/
var prev = 0;
var $window = $(window);
$window.on('scroll', (function(){
  var scrollTop = $window.scrollTop();
  
  // schovávání hlavičky
  if (!elMenu.hasClass("visible")) {
    // if scrollTop > prev = scrolluje se dolů
    elHeader.toggleClass('hidden', (scrollTop > prev) && (scrollTop > 50));
  }

  // MoveOnTop se objeví až za minimálním scrollem
  // if (scrollTop > 600) {
  //   elMoveOnTop.css("visibility: visible");
  // } else elMoveOnTop.css("visibility: hidden");


  prev = scrollTop;
}));


/*------------------------------------*\
    Scroll to Anchor
\*------------------------------------*/
var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 100,
  easing: 'easeInOutCubic'
});