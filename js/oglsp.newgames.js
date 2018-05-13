//index new games
(function($)
{
	/** Vars
	------------------------------ **/
	var BASENAME		= "newGames";

	var CLASS_SLIDE		= "slide";

	//$objects
	var $base, $slide;
	//slick instance
	var slick;
	var slickOptions = 
	{
		speed : 300,
		autoplay : true,
		arrows : false,
		dots : true
	}


	/** Functions
	------------------------------ **/
	var init = function()
	{
		$base		= $("." + BASENAME);
		$slide		= $base.find("." + CLASS_SLIDE);
		//init slick
		$slide.on("init", function(slick)
		{
			// for iOS swipe
			$slide.find(".slick-slide").on('touchstart', function(){
				return true;
			});
		});
		window.s = $slide.slick(slickOptions).slick("getSlick");
	}


	/** Initialize
	------------------------------ **/
	$(function(){ init(); });
})(jQuery);