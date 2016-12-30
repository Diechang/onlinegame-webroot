//floating contents
(function($)
{
	/** Vars
	------------------------------ **/
	var BASENAME		= "floatings";

	var CLASS_FLOATING			= "floating";
	var CLASS_FLOATING_ACTIVE	= CLASS_FLOATING + "-" + OGL.CLASS_ACTIVE;
	var CLASS_FLOATING_LIMITED	= CLASS_FLOATING + "-limited";

	//$objects
	var $header, $titles;
	//instances
	var header, side, sub, titles;


	/** Functions
	------------------------------ **/
	var init = function()
	{
		$header 		= $("header.floating");
		$headerTitles	= $header.find(".titles");
		$titleNav		= $(".title-nav");

		//create instances
		OGL._w.on("load." + BASENAME, function(e)
		{
			//floating header
			header = new Header($header, {
				borderActive : OGL.$header.offset().top + OGL.$header.height()
			});
			//floating titles
			if($headerTitles.length && $titleNav.length) titles = new Header($headerTitles, {
				borderActive : $titleNav.offset().top + $titleNav.outerHeight()
			});

			//floating side contents
			if(OGL.$main.height() > OGL.$side.height() && OGL.$main.height() > OGL.$sub.height())
			{
				//side contents
				side = new Side(OGL.$side);
				//sub 
				sub = new Side(OGL.$sub);
			}
		})
	}


	/** Classes
	------------------------------ **/
	//header floating
	var Header = function($base, options)
	{
		this.$base = $base;
		//flags
		this.flags = 
		{
			active	: false,
			limited	: false
		}
		//options
		this.options = $.extend({
			borderActive	: null,
			borderLimited	: null
		}, options);

		this.init();
	}
	Header.prototype = 
	{
		init : function()
		{
			var _self = this;
			if(typeof _self.options.borderActive === "number") OGL._w.on("scroll." + BASENAME, function(e)
			{
				_self.judgePositions(e);
			});
			this.judgePositions();
		},
		judgePositions : function(e)
		{
			var scrollY = (!!e && !!e.currentTarget && !!e.currentTarget.scrollY) ? e.currentTarget.scrollY : OGL._w.scrollTop();

			//border active
			if(scrollY >= this.options.borderActive)
			{
				if(!this.flags.active)
				{
					this.$base.addClass(CLASS_FLOATING_ACTIVE);
					this.flags.active = true;
				}
			}
			else if(scrollY < this.options.borderActive)
			{
				if(this.flags.active)
				{
					this.$base.removeClass(CLASS_FLOATING_ACTIVE);
					this.flags.active = false;
				}
			}
		}
	}

	//side floating
	var Side = function($base, options)
	{
		this.$base		= $base;
		this.$floating	= this.$base.find("." + CLASS_FLOATING).eq(0);

		//flags
		this.flags = 
		{
			active	: false,
			limited	: false
		}
		//options
		this.options = $.extend({
			marginBottom : 40
		}, options);

		this.init();
		this.initEvent();
	}
	Side.prototype = 
	{
		init : function()
		{
			this.getBorders();
			this.getStyles();
			this.judgePositions();
		},
		initEvent : function()
		{
			var _self = this;

			OGL._w.on("scroll." + BASENAME, function(e)
			{
				_self.judgePositions(e);
			});
			OGL._w.on("resize." + BASENAME, function(e)
			{
				_self.resize();
			});
		},
		getBorders : function()
		{
			this.borderActive	= this.$base.offset().top + this.$floating.height() - OGL._w.height() + this.options.marginBottom;
			this.borderLimited	= OGL.$footer.offset().top - OGL._w.height();
		},
		getStyles : function()
		{
			this.styles = 
			{
				left : this.$base.offset().left,
				width : this.$base.width()
			}
		},
		judgePositions : function(e)
		{
			var scrollY = (!!e && !!e.currentTarget && !!e.currentTarget.scrollY) ? e.currentTarget.scrollY : OGL._w.scrollTop();

			//border limited
			if(scrollY >= this.borderLimited)
			{
				if(!this.flags.limited) this.setLimited();
			}
			//border active
			else if(scrollY >= this.borderActive)
			{
				if(!this.flags.active) this.setActive();
			}
			else if(scrollY < this.borderActive)
			{
				if(this.flags.active) this.unsetActive();
			}
		},
		setActive : function()
		{
			this.unsetLimited()
			this.$floating.addClass(CLASS_FLOATING_ACTIVE);
			this.flags.active = true;
			//set styles
			this.$floating.css({
				left : this.styles.left,
				width : this.styles.width
			});
		},
		unsetActive : function()
		{
			this.$floating.removeClass(CLASS_FLOATING_ACTIVE);
			this.flags.active = false;
			//unset styles
			this.$floating.removeAttr("style");
		},
		setLimited : function()
		{
			this.unsetActive();
			this.$floating.addClass(CLASS_FLOATING_LIMITED);
			this.flags.limited = true;
			//set styles
			this.$floating.css({
				top : this.borderLimited - this.borderActive,
				width : this.styles.width
			});
		},
		unsetLimited : function()
		{
			this.$floating.removeClass(CLASS_FLOATING_LIMITED);
			this.flags.limited = false;
			//unset styles
			this.$floating.removeAttr("style");
		},
		resize : function()
		{
			this.getBorders();
			this.getStyles();
			this.judgePositions();
		}
	}


	/** Initialize
	------------------------------ **/
	$(function(){ init(); });
})(jQuery);