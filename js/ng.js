// JavaScript Document

/** New Games
------------------------------ **/
var NG = 
{
	/** Vars
	------------------------------ **/
	ACTIVE_CLASS_STRINGS	: "active",
	
	$base		: new Object(),
	$thumbs		: new Object(),
	$info		: new Object(),
	$container	: new Object(),
	$slides		: new Object(),
	
	slideLength	: 0,
	slideWidth	: 0,
	slideHeight	: 0,
	
	currentIndex	: 0,
	
	timer : null,
	
	
	/** Functions
	------------------------------ **/
	//Initialize
	init : function()
	{
		var _self = this;
		
		//$ Objects
		_self.$base			= $("#newGames");
		_self.$thumbs		= _self.$base.children(".thumbs");
		_self.$thumbsChild	= _self.$thumbs.find("li");
		_self.$info			= _self.$base.children(".info");
		_self.$container	= _self.$info.children("#slideContainer");
		_self.$slides		= _self.$container.children(".slide");
		
		//Slide properties
		_self.slideLength	= _self.$slides.length;
		_self.slideWidth	= _self.$info.width();
		_self.slideHeight	= _self.$info.height();
		
		_self.$container.width(_self.slideWidth * _self.slideLength);
		_self.$container.height(_self.slideHeight);
		
		//Events
		_self.$thumbsChild.find("img").bind("mouseover" , function()
		{
			_self.currentIndex = _self.$thumbsChild.find("img").index(this) + 1;
			_self.clearTimer();
			_self.change();
			//Mouseout
			_self.$thumbsChild.find("img").bind("mouseout" , function()
			{
				_self.setTimer();
				_self.$thumbsChild.find("img").unbind("mouseout");
			});
		});
		
		//Timer
		_self.setTimer();
	},
	
	//Slide Change
	change : function()
	{
		//Class change
		this.$thumbsChild.find("a").removeClass(this.ACTIVE_CLASS_STRINGS);
		this.$thumbsChild.find("a").eq(this.currentIndex - 1).addClass(this.ACTIVE_CLASS_STRINGS);
		
		//Animate
		this.$container.animate(
		{
			left : 0 - this.slideWidth * this.currentIndex
		},
		{
			easing	:  "swing",
			queue	: false
		});
	},
	
	//Timer
	setTimer : function()
	{
		NG.timer = setTimeout(NG.nextSlide , 3000);
	},
	clearTimer : function()
	{
		clearTimeout(NG.timer);
	},
	nextSlide : function()
	{
		NG.clearTimer();
		//
		NG.currentIndex++;
		if(NG.currentIndex >= NG.slideLength)
		{
			NG.currentIndex = 1;
		}
		//
		NG.setTimer();
		NG.change();
	}
}
$r(function()
{
	NG.init();
});
$(window).unload(function()
{
	NG = null;
});