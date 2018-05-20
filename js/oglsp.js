//(c)2018 ONLINEGAME LIFE. by diechang
(function($)
{
	/** Vars
	------------------------------ **/
	var BASENAME	= "OGL";
	var MODE		= "SP";

	var PREFIX = "ogl";

	var CLASS_ACTIVE	= "active";
	var CLASS_CURRENT	= "current";

	var HEADER_HEIGHT	= 50;

	//base objects
	var _w, _d, _h, _b, _hb,
	$header, $footer, $contents, $main, $side, $sub;


	/** Functions
	------------------------------ **/
	var init = function()
	{
		_w			= $(window);
		_d			= $(document);
		_h			= $("html:first");
		_b			= $("body:first");
		_hb			= $("html:first,body:first");

		$header		= $("header:first");
		$footer		= $("footer:first");
		$contents	= $(".contents:first");

		initHash();
		initTopMenu();
	}
	// Hash change
	var initHash = function()
	{
		// load
		if(!!location.hash)
		{
			_hb.scrollTop(_hb.scrollTop() - HEADER_HEIGHT);
			// _w.one("load." + BASENAME, function(e){ OGL.utils.scrollTo(_hb.scrollTop() - HEADER_HEIGHT); });
		}
		// link
		$("a[href^='#']").on("click." + BASENAME, function(e)
		{
			var href= $(this).attr("href");
			var $target = $(href == "#" || href == "" ? 'html' : href);
			OGL.utils.scrollTo($target.offset().top - HEADER_HEIGHT);
			OGL.utils.cancelEvent(e);
		});
	}
	// Top menu toggle
	var initTopMenu = function()
	{
		var $topMenu		= $header.find(".topMenu").eq(0);
		var $topMenuItems	= $topMenu.find(".topMenu-item");
		
		$topMenuItems.each(function()
		{
			var $this		= $(this);
			var $trigger	= $this.find(".topMenu-trigger").eq(0);

			$trigger.on("click." + BASENAME, function(e)
			{
				$this[$this.hasClass(CLASS_ACTIVE) ? "removeClass" : "addClass"](CLASS_ACTIVE);
				$this.siblings().removeClass(CLASS_ACTIVE);
			});
		});
	}


	/** Initialize
	------------------------------ **/
	$(function()
	{
		init();
		//public object - $obj
		$.extend(window.OGL, 
		{
			//base objects
			_w	: _w,
			_d	: _d,
			_h	: _h,
			_b	: _b,
			_hb	: _hb,
			//$objects
			$header		: $header,
			$footer		: $footer,
			$contents	: $contents
		});
	});

	//public object - vars
	window.OGL = 
	{
		//vars
		BASENAME		: BASENAME,
		MODE			: MODE,
		CLASS_ACTIVE	: CLASS_ACTIVE,
		CLASS_CURRENT	: CLASS_CURRENT
	}
})(jQuery);