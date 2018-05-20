//index new games
(function($)
{
	/** Vars
	------------------------------ **/
	var BASENAME		= "slide";

	//$objects
	var $slides;
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
		// slick slides
		$slides = $("." + BASENAME);
		$slides.each(function(e)
		{
			var $slide = $(this);
			//init slick
			$slide.on("init", function(slick)
			{
				// for iOS swipe
				$slide.find(".slick-slide").on('touchstart', function(){
					return true;
				});
			});
			$slide.slick(slickOptions).slick("getSlick");
		});
	}


	/** Initialize
	------------------------------ **/
	$(function(){ init(); });
})(jQuery);