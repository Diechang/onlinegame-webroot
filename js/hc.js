// JavaScript Document

/** Head Chaser
------------------------------ **/
document.write('<link href="/css/hc.css" rel="stylesheet" type="text/css" />');
var HC = 
{
	/** Vars
	------------------------------ **/
	BASENAME	: "headChaser",
	BODYNAME	: "hcBody",
	
	BORDERLINE	: 100,
	
	$w		: new Object(),
	$base	: new Object(),
	$body	: new Object(),
	
	$org	: 
	{
		menu	: new Object(),
		pankuz	: new Object()
	},
	
	//表示フラグ
	disp : false,
	
	/** Functions
	------------------------------ **/
	//Initialize
	init : function()
	{
		var _self = this;
		
		//要素追加
		$("body:eq(0)").append('<div id="' + _self.BASENAME + '"><div class="' + _self.BODYNAME + '"></div></div>');
		
		// $
		_self.$w	= $(window);
		_self.$base	= $("#" + _self.BASENAME);
		_self.$body	= _self.$base.children("." + _self.BODYNAME);
		_self.$org.menu		= $("#mainNav");
		_self.$org.pankuz	= $(".pankuz");
		
		//クローン
		_self.$org.menu.clone(true).appendTo(_self.$body);
		if(_self.$org.pankuz.length)
		{
			_self.$org.pankuz.clone().appendTo(_self.$body);
			var pHeight = _self.$org.pankuz.height();
		}
		else
		{
			var pHeight = 5;
		}
		_self.$base.height(_self.$org.menu.height() + pHeight).hide();
		
		//Event
		$(window).bind("scroll" , function()
		{
			if(_self.$w.scrollTop() > _self.BORDERLINE)
			{
				_self.$base.show();
			}
			else
			{
				_self.$base.hide();
			}
		});
	}
}
$r(function()
{
	if($.browser.msie && $.browser.version < 7)
	{
		HC = null;
	}
	else
	{
		if(location.hash.length > 0)
		{
			HC.init() = null;
		}
		else
		{
			HC.init();
		}
	}
})
$(window).unload(function()
{
	HC = null;
});