// JavaScript Document

/** Review or All Changer
------------------------------ **/
var RAC = 
{
	/** Vars
	------------------------------ **/
	REVIEW_CLASS_STRINGS	: "review",
	
	$tabs		: new Object(),
	$allVotes	: new Object(),
	$onlyReview	: new Object(),
	$base		: new Object(),
	$lists		: new Object(),
	
	/** Functions
	------------------------------ **/
	//Initialize
	init : function()
	{
		var _self = this;
		
		//$ Objects
		_self.$tabs			= $("#reviewTabs");
		_self.$allVotes		= _self.$tabs.children("li.allVotes");
		_self.$onlyReview	= _self.$tabs.children("li.onlyReview");
		_self.$base			= $(".reviewList");
		_self.$lists		= _self.$base.children("li");
		
		var hash = (location.hash) ? location.hash : false;
		
		if(_self.$lists.hasClass(_self.REVIEW_CLASS_STRINGS))
		{
			if(_self.$lists.length > _self.$lists.filter("." + _self.REVIEW_CLASS_STRINGS).length)
			{
				//Events
				_self.$allVotes.bind("click" , function(){ _self.allVotes(); });
				_self.$onlyReview.bind("click" , function(){ _self.onlyReview(false); });
				//
				_self.onlyReview(hash);
				_self.init = null;
			}
			else
			{
				_self.$tabs.remove();
				RAC = null;
			}
		}
		else
		{
			_self.$tabs.remove();
			RAC = null;
		}
	},
	
	//All votes
	allVotes : function()
	{
		this.$lists.show();
		this.$allVotes.hide();
		this.$onlyReview.show();
	},
	
	//Only review
	onlyReview : function(hash)
	{
		this.$lists.not("." + this.REVIEW_CLASS_STRINGS).hide();
		this.$allVotes.show();
		this.$onlyReview.hide();
		//
		if(hash) $(window).scrollTop($(hash).offset().top);
	}
}
$r(function()
{
	RAC.init();
});
$(window).unload(function()
{
	RAC = null;
});