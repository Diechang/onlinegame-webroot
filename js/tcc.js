// JavaScript Document

/** Tab contents changer
------------------------------ **/
var TCC = 
{
	/** Vars
	------------------------------ **/
	ACTIVE_CLASS_STRINGS : "active",
	
	$base		: new Object(),
	$tabs		: new Object(),
	$contents	: new Object(),
	
	current		: 0,
	
	/** Functions
	------------------------------ **/
	init : function()
	{
		var _self = this;
		//
		_self.$base		= $(".tccBase");
		_self.$tabs		= $(".tccTabs").children();
		_self.$contents	= $(".tccContents");
		//
		if(_self.$tabs.length > 0)
		{
			_self.$tabs.bind("click" , function()
			{
				var index = _self.$tabs.index(this);
				if(_self.current != index)
				{
					_self.current = index;
					_self.contentsChange();
				}
			});
			//
			_self.contentsChange();
		}
	},
	
	//Contents Change
	contentsChange : function()
	{
		var _self = this;
		//Tabs
		_self.$tabs.children("a").removeClass(_self.ACTIVE_CLASS_STRINGS);
		_self.$tabs.children("a").eq(_self.current).addClass(_self.ACTIVE_CLASS_STRINGS);
		//Blocks
		_self.$contents.each(function()
		{
			$(this).children(".tccContent").filter(":visible").hide();
			$(this).children(".tccContent").eq(_self.current).fadeIn("fast");
		});
	}
}
$r(function()
{
	TCC.init();
});
$(window).unload(function()
{
	TCC = null;
});