//(c)2015 ONLINEGAME LIFE. by diechang
(function($)
{
	/** Vars
	------------------------------ **/
	var BASENAME = "OGL";

	var PREFIX = "ogl";

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
		//vars
		BASENAME		: BASENAME,
		CLASS_ACTIVE	: CLASS_ACTIVE,
		CLASS_CURRENT	: CLASS_CURRENT
	}
})(jQuery);