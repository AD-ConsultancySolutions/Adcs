(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


(function(){

	$wrapper = $('#wrapper');
	$drawerRight = $('#drawer-right');

	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////

	/*function setHomeBannerHeight() {
		var windowHeight = jQuery(window).height();	
		jQuery('#header').height(windowHeight);
	}*/

	///////////////////////////////
	// Center Home Slideshow Text
	///////////////////////////////

	/*function centerHomeBannerText() {
			var bannerText = jQuery('#header > .center');
			var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2) - 40;		
			bannerText.css('padding-top', bannerTextTop+'px');		
			bannerText.show();
	}*/



	///////////////////////////////
	// SlideNav
	///////////////////////////////

	function setSlideNav(){
		jQuery(".toggleDrawer").click(function(e){
			//alert($wrapper.css('marginRight'));
			e.preventDefault();

			if($wrapper.css('marginLeft')=='0px'){
				$drawerRight.animate({marginRight : 0},500);
				$wrapper.animate({marginLeft : -300},500);
			}
			else{
				$drawerRight.animate({marginRight : -300},500);
				$wrapper.animate({marginLeft : 0},500);
			}
			
		})
	}

	function setHeaderBackground() {		
		var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top	
		
	// 	if (scrollTop > 300 || jQuery(window).width() < 700) { 
	// 		jQuery('#header .top').addClass('solid');
	// 		jQuery('#port .top').addClass('solid');
	// 		jQuery('#about .top').addClass('solid');
	// 		jQuery('#services .top').addClass('solid');
	// 	} else {
	// 		jQuery('#header .top').removeClass('solid');
	// 		jQuery('#port .top').removeClass('solid');	
	// 		jQuery('#about .top').removeClass('solid');
	// 		jQuery('#services .top').removeClass('solid');
	// 	}
	}




	///////////////////////////////
	// Initialize
	///////////////////////////////


	setSlideNav();
	/*jQuery.noConflict();
	setHomeBannerHeight();
	centerHomeBannerText();*/
	setHeaderBackground();

	//Resize events
	/*jQuery(window).smartresize(function(){
		setHomeBannerHeight();
		centerHomeBannerText();
		setHeaderBackground();
	});*/


	//Set Down Arrow Button
	// jQuery('#scrollToContent').click(function(e){
	// 	e.preventDefault();
	// 	jQuery.scrollTo("#portfolio", 1000, { offset:-(jQuery('#header .top').height()), axis:'y' });
	// });

	// jQuery('nav > ul > li > a').click(function(e){
	// 	e.preventDefault();
	// 	jQuery.scrollTo(jQuery(this).attr('href'), 400, { offset:-(jQuery('#header .top').height()), axis:'y' });
	// })

	jQuery(window).scroll( function() {
	   setHeaderBackground();
	});

})();

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
		event.preventDefault();
		
		// Get the height of the header
		var headerHeight = $("div#header").height();
		var scrollToPosition = $(target).offset().top - 100;
		
        $('html, body').animate({
          scrollTop: scrollToPosition 
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  $("#hide").click(function(){
    $("p").hide();
  });

  $(document).ready(function(){
	$("#close").click(function(){
	  $("events").hide();
	});
  });