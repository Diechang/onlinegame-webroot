//index new games
(function($)
{
	/** Vars
	------------------------------ **/
	var BASENAME		= "newGames";

	var CLASS_THUMBS	= "thumbs";
	var CLASS_SLIDE		= "slide";

	//$objects
	var $base, $thumbs, $slide;
	//slick instance
	var slick;
	var slickOptions = 
	{
		speed : 300,
		autoplay : true,
		arrows : false
	}


	/** Functions
	------------------------------ **/
	var init = function()
	{
		$base		= $("." + BASENAME);
		$thumbsBase	= $base.find("." + CLASS_THUMBS);
		$thumbs		= $thumbsBase.find("li");
		$slide		= $base.find("." + CLASS_SLIDE).find("ul:first");
		//init slick
		slick = $slide.slick(slickOptions).slick("getSlick");
		$thumbs.eq(slick.options.initialSlide).addClass(OGL.CLASS_CURRENT);

		initEvent();
	}
	var initEvent = function()
	{
		//thumbs base events
		$thumbsBase.on("mouseenter." + BASENAME, function(e)
		{
			slick.setOption("speed", 0);
			slick.pause();
		})
		.on("mouseleave." + BASENAME, function(e)
		{
			slick.setOption("speed", slickOptions.speed);
			slick.play();
		})
		//thumbs events
		$thumbs.on("mouseover." + BASENAME, function(e)
		{
			slick.goTo($(this).index());
		});
		//slide events
		$slide.on("beforeChange", function(e, slick, currentSlide, nextSlide)
		{
			$thumbs.filter("." + OGL.CLASS_CURRENT).removeClass(OGL.CLASS_CURRENT);
			$thumbs.eq(nextSlide).addClass(OGL.CLASS_CURRENT);
		})
		.on("afterChange", function(e, slick, currentSlide)
		{
			$thumbs.eq(currentSlide).addClass(OGL.CLASS_CURRENT);
		});

	}


	/** Initialize
	------------------------------ **/
	$(function(){ init(); });
})(jQuery);