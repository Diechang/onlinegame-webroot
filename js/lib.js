// JavaScript Document

/** Lib
------------------------------ **/
_id = function()
{
	try{
		return document.getElementById(id);
	}
	catch(e){
		return false;
	}
}

//Add $ ready 
var $r = function(func)
{
	if($.browser.mozilla)
	{
		$(window).bind("load",func);
	}
	else
	{
		$(func);
	}
}

/** Common onload
------------------------------ **/
$r(function()
{
	MC.init();
	
	/** Form submit **/
	if($("form").length > 0)
	{
		$("form").each(function()
		{
			var $form	= $(this);
			
			$form.find("button.submit,input.submit").bind("click" , function()
			{
				$form.submit();
				return false;
			});
		});
	}
});

/** Social Bookmarks
------------------------------ **/
var SBM = 
{
	siteName	: "オンラインゲームライフ",
	siteUrl		: "http://onlinegame.dz-life.net/",
	
	browser : function()
	{
		if ( window.sidebar || document.all)
		{
			if ( window.sidebar )
			{
				window.sidebar.addPanel(this.siteName, this.siteUrl, '');
			}
			else if( document.all )
			{
				window.external.AddFavorite(this.siteUrl, this.siteName);
			}
		}
		else
		{
			alert("ご使用中のブラウザには未対応です。\n手動でブックマークをお願いします。");
		}
	},
	
	yahoo : function()
	{
		location.href="http://bookmarks.yahoo.co.jp/bookmarklet/showpopup?ei=UTF-8&u=" + encodeURIComponent(this.siteUrl) + "&t=" + encodeURIComponent(this.siteName);
	},
	
	hatena : function()
	{
		location.href="http://b.hatena.ne.jp/add?mode=confirm&url=" + encodeURIComponent(this.siteUrl) + "&title=" + encodeURIComponent(this.siteName);
	}
}

/** Menu childs
------------------------------ **/
var MC = 
{
	
	/** Vars
	------------------------------ **/
	HASCHILD_CLASS : "hasChild",
	
	$base		: new Object(),
	$hasChilds	: new Object(),
	
	/** Functions
	------------------------------ **/
	init : function()
	{
		var _self = this;
		//
		_self.$base			= $("#mainNav");
		_self.$hasChilds	= _self.$base.children("." + _self.HASCHILD_CLASS);
		//
		_self.$hasChilds.hover(
			function()
			{
				$(this).children("ul").not(":animated").slideDown("fast");
			},
			function()
			{
				$(this).children("ul").slideUp("fast");
			});
	}
}
