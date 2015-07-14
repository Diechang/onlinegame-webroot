// JavaScript Document

/** List Change
------------------------------ **/
var LC = 
{
	/** Vars
	------------------------------ **/
	ACTIVE_CLASS_STRINGS	: "active",
	
	$tabs		: new Object(),
	$base		: new Object(),
	//
	$bal		: new Object(),
	$balTitle	: new Object(),
	$balBody	: new Object(),
	
	current		: 0,
	
	classes		: new Array(),
	
	/** Functions
	------------------------------ **/
	//Initialize
	init : function()
	{
		var _self = this;
		
		//$ Objects
		_self.$tabs		= $(".listChangeTabs");
		_self.$base		= $("#titlesList");
		
		//Classes set
		_self.$tabs.eq(0).children("li").each(function()
		{
			_self.classes.push($(this).attr("class") + "List");
		});
		
		//Balloon append
		$("body:eq(0)").append('<div id="bal"><div class="title"></div><div class="body"></div></div>');
		_self.$bal 		= $("#bal").hide();
		_self.$balTitle	= _self.$bal.children("div.title");
		_self.$balBody	= _self.$bal.children("div.body");
		
		//Events set
		_self.$tabs.each(function()
		{
			var tabs = $(this);
			tabs.children("li").bind("click" , function()
			{
				var index = tabs.children("li").index(this);
				if(_self.current != index)
				{
					_self.current = index;
					_self.tarChange();
				}
				//
				//Balloon
				if(index == 1)
				{
					_self.$base.children("li").bind("mouseover" , _self.balDisp);
					_self.$base.children("li").bind("mouseout" , _self.balHide);
					_self.$bal.bind("mouseover" , _self.balShow);
					_self.$bal.bind("mouseout" , _self.balHide);
				}
				else
				{
					_self.$base.children("li").unbind("mouseover");
					_self.$base.children("li").unbind("mouseout");
					_self.$bal.unbind("mouseover");
					_self.$bal.unbind("mouseout");
				}
			});
		});
		
		//1st change
		_self.tarChange();
	},
	
	//Target Change
	tarChange : function()
	{
		var _self = this;
		//Tabs
		_self.$tabs.each(function()
		{
			$(this).children("li").children("a").removeClass(_self.ACTIVE_CLASS_STRINGS);
			$(this).children("li").children("a").eq(_self.current).addClass(_self.ACTIVE_CLASS_STRINGS);
		});
		//Class change
		for(var $i = 0; $i < _self.classes.length; $i++)
		{
			var className = _self.classes[$i];
			
			if($i == _self.current)
			{
				_self.$base.addClass(className);
			}
			else
			{
				_self.$base.removeClass(className);
			}
		}
	},
	//
	//Balloon
	balDisp : function(e)
	{
		var $c		= $(e.currentTarget);
		//
		LC.$balTitle.html($c.find("h3 a").html());
		LC.$balBody.html($c.find(".description").html());
		//
		var top		= $c.offset().top + 80;
		var left	= ($c.hasClass("fourth")) ? $c.offset().left + 10 : $c.offset().left + 110;
		LC.$bal.css(
		{
			top		: top,
			left	: left
		});
		//
		LC.$bal.show();
	},
	balShow : function(e)
	{
		LC.$bal.show();
	},
	balHide : function(e)
	{
		LC.$bal.hide();
	}
}
$r(function()
{
	LC.init();
})
$(window).unload(function()
{
	LC = null;
});