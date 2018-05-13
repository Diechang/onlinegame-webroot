//(c)2018 ONLINEGAME LIFE. by diechang
(function($)
{
	/** Vars
	------------------------------ **/
	var BASENAME = "OGLSP";

	var PREFIX = "oglsp";

	var CLASS_ACTIVE	= "active";
	var CLASS_CURRENT	= "current";

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

		initTopMenu();
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
		$.extend(window.OGLSP, 
		{
			//base objects
			_w			: _w,
			_d			: _d,
			_h			: _h,
			_b			: _b,
			_hb			: _hb,
			//$objects
			$header			: $header,
			$footer			: $footer,
			$contents		: $contents
		});
	});

	//public object - vars
	window.OGL = 
	{
		SP : 
		{
			//vars
			BASENAME		: BASENAME,
			CLASS_ACTIVE	: CLASS_ACTIVE,
			CLASS_CURRENT	: CLASS_CURRENT
		}
	}
})(jQuery);