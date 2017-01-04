// JavaScript Document

$(function()
{
	CTR.init();
	ET.init();
	LT.init();
	
	//WYSIWYG Editor
	if($("textarea.editor").length > 0) TinyMceInit();
	
	//Focus select
	var bPreventMouseUp = true;
	$(".focusSelect").focus(function()
	{
		if($(this).val().length)
		{
			this.select();
		}
	})
	.mouseup(function(e)
	{
		if(bPreventMouseUp)
		{
			e.preventDefault();
			bPreventMouseUp = false;
		}
	})
	.blur(function(e)
	{
		bPreventMouseUp = true;
	});
	
	//Bubble popup - $
	$('td[title]').each(function()
	{
		var inner = $(this).attr("title");
		$(this).removeAttr("title");
		$(this).CreateBubblePopup(
		{
			selectable	: true,
			position	: 'top',
			align		: 'center',
			innerHtml	: inner,
			innerHtmlStyle:
			{
				color	: '#FFFFFF'
//				'text-align' : 'center'
			},
			themeName	: 'all-black',
			themePath	: '/css/bubblepopup/jquerybubblepopup-theme',
			width		: 480
		});
	});
	
	//Table sorter - $
	if($("table.tablesorter").length > 0)
	{
		//TextExtraction - tablesorter
		var te = function(node)
		{
			var ret;
			// extract data from markup and return it
			$node = $(node);
			if($node.find("input").length > 0)
			{
				ret = $node.find("input").val();
			}
			else if($node.children().length > 0)
			{
				ret = $node.text();
			}
			else
			{
				ret = $node.html();
			}
			return ret;
		}
		
		var tslast	= $("table.tablesorter thead:eq(0) th").length - 1;
		
		var headers		= new Object();
		headers[0]		= {sorter:false};
		headers[tslast]	= {sorter:false};
		
		$("table.tablesorter").tablesorter(
		{
			headers			: headers,
			textExtraction	: te
		});
		$("table.tablesorter").bind("sortStart",function()
		{
			CTR.start();
		}).bind("sortEnd",function()
		{
			CTR.end();
		});

	}
});

/** Controll
------------------------------ **/
var CTR = 
{
	$base		: null,
	$handling	: null,
	
	Shandling	: '<span class="handling">...処理中...</span>',
	//
	init : function()
	{
		if($(".controll").length > 0)
		{
			this.$base		= $(".controll").append(this.Shandling);
			this.$handling	= $(".handling").hide();
		}
		
	},
	start : function()
	{
		if(this.$base)
		{
			this.$handling.show()
		}
	},
	end : function()
	{
		if(this.$base)
		{
			this.$handling.hide();
		}
	}
}

/** Edit Table
------------------------------ **/
var ET = 
{
	/** Vars
	------------------------------ **/
	$adTextInput	: new Object(),
	$adTextDiv		: new Object(),
	$adImageInput	: new Object(),
	$adImageDiv		: new Object(),
	
	$adPartUrl		: new Object(),
	$adPartText		: new Object(),
	$adPartImg		: new Object(),
	$adPartTrack	: new Object(),
	
	
	/** Functions
	------------------------------ **/
	init : function()
	{
		if($("table.edit").length > 0)
		{
			this.$adTextInput	= $("textarea.adText:eq(0)");
			this.$adTextDiv		= $("div.adText:eq(0)");
			this.$adImageInput	= $("textarea.adImage:eq(0)");
			this.$adImageDiv	= $("div.adImage:eq(0)");
			this.$adBannerInput	= $("textarea.adBanner:eq(0)");
			this.$adBannerDiv	= $("div.adBanner:eq(0)");
			
			this.$adPartUrl		= $("input.adPartUrl:eq(0)");
			this.$adPartText	= $("input.adPartText");
			this.$adPartImg		= $("input.adPartImg:eq(0)");
			this.$adPartTrack	= $("input.adPartTrack:eq(0)");
		}
	},
	
	getAdText : function()
	{
		var _self	= this;
		var adSrc	= _self.$adTextInput.val();
		_self.$adTextDiv.html(adSrc);
		//url & text
		if(_self.$adTextDiv.has("a"))
		{
			var $a = _self.$adTextDiv.find("a:eq(0)");
			//url
			_self.$adPartUrl.val($a.attr("href"));
			//text
			_self.$adPartText.val($a.text());
		}
		//track
		if(_self.$adTextDiv.has("img"))
		{
			_self.$adPartTrack.val(_self.$adTextDiv.find("img:eq(0)").attr("src"));
		}
	},
	
	getAdImage : function()
	{
		var _self	= this;
		var adSrc	= _self.$adImageInput.val();
		_self.$adImageDiv.html(adSrc);
		//src
		if(_self.$adImageDiv.has("img"))
		{
			if(_self.$adImageDiv.find("img").length == 1)
			{
				_self.$adPartImg.val(_self.$adImageDiv.find("img:eq(0)").attr("src"));
			}
			else
			{
				_self.$adImageDiv.find("img").each(function()
				{
					$(this).bind("load" , function()
					{
						if($(this).width() > 10 && $(this).width() > 10)
						{
							_self.$adPartImg.val($(this).attr("src"));
							return false;
						}
					});
				});
			}
		}
	},
	
	getAdBanner : function()
	{
		var _self	= this;
		var adSrc	= _self.$adBannerInput.val();
		_self.$adBannerDiv.html(adSrc);
		//url
		if(_self.$adBannerDiv.has("a"))
		{
			var $a = _self.$adBannerDiv.find("a:eq(0)");
			//url
			_self.$adPartUrl.val($a.attr("href"));
		}
		//src
		if(_self.$adBannerDiv.has("img"))
		{
			if(_self.$adBannerDiv.find("img").length == 1)
			{
				_self.$adPartImg.val(_self.$adBannerDiv.find("img:eq(0)").attr("src"));
			}
			else
			{
				_self.$adBannerDiv.find("img").each(function()
				{
					$(this).bind("load" , function()
					{
						if($(this).width() > 10 && $(this).width() > 10)
						{
							_self.$adPartImg.val($(this).attr("src"));
							return false;
						}
					});
				});
			}
		}
	}
}

/** List Table
------------------------------ **/
var LT = 
{
	/** Vars
	------------------------------ **/
	$table			: new Object(),
	$tbody			: new Object(),
	$results		: new Object(),
	$wordSearcher	: new Object(),
	$narrowChanger	: new Object(),
	
	narrowType		: null,
	
	/** Functions
	------------------------------ **/
	init : function()
	{
		if($("table.list").length > 0)
		{
			this.$table		= $("table.list");
			this.$tbody		= this.$table.children("tbody");
			this.$results	= ($("#results").length) ? $("#results") : false;
			
			if($("#word_searcher").length > 0)
			{
				this.$wordSearcher = $("#word_searcher");
				this.$wordSearcher.bind("keypress" , function(e)
				{
					if(e.keyCode == 13)
					{
						LT.wordSearch(this.value);
						return false;
					}
				});
			}
			
			if($("#narrow_changer").length > 0)
			{
				this.$narrowChanger		= $("#narrow_changer");
				this.narrowType			= this.$narrowChanger.attr("class");
				
				switch(this.narrowType)
				{
					case "title":
						this.narrowTitleId(this.$narrowChanger.val());
						break;
					case "category":
						this.narrowCategory(this.$narrowChanger.val());
						break;
				}
			}
			//
			this.resultSet();
		}
	},
	
	narrowAll : function()
	{
		CTR.start();
		//
		this.$tbody.children("tr").show();
		this.$narrowChanger.val("all");
		this.$wordSearcher.val("");
		this.resultSet();
		//
		CTR.end();
	},
	
	wordSearch : function(word)
	{
		if(word.length > 0)
		{
			var rObj = new RegExp(word,"i");
			//
			CTR.start();
			//
			this.$tbody.children("tr").each(function()
			{
				if($(this).text().match(rObj))
				{
					$(this).show();
				}
				else
				{
					$(this).hide()
				}
			});
			//
			CTR.end();
		}
		else
		{
			this.narrowAll();
		}
		//
		this.$narrowChanger.val("all");
		this.resultSet();
		return false;
	},
	
	narrowCategory : function(cat)
	{
		if(cat == "all")
		{
			this.narrowAll();
		}
		else
		{
			CTR.start();
			//
			this.$tbody.children("tr").each(function()
			{
				if($(this).find("td.categories").is(":contains('\"" + cat + "\"')"))
				{
					$(this).show();
				}
				else
				{
					$(this).hide()
				}
			});
			//
			CTR.end();
		}
		//
		this.$narrowChanger.val(cat);
		this.$wordSearcher.val("");
		this.resultSet();
	},
	
	narrowTitleId : function(id)
	{
		if(id == "all")
		{
			this.narrowAll();
		}
		else
		{
			CTR.start();
			//
			this.$tbody.children("tr").not(".title_id_" + id).hide();
			this.$tbody.children("tr.title_id_" + id).show();
			//
			CTR.end();
		}
		//
		this.$narrowChanger.val(id);
		this.$wordSearcher.val("");
		this.resultSet();
	},
	
	resultSet : function()
	{
		if($("table.list").length > 0 && this.$results)
		{
			this.$results.html(this.$tbody.children(":visible").length + "件");
		}
	}
}

/** Tiny MCE
------------------------------ **/
var TinyMceInit = function()
{
	$('textarea.editor').tinymce({
		//
		relative_urls : false,
		
		// Location of TinyMCE script
		script_url : '/js/tiny_mce/tiny_mce.js',
		
		// Language
		language : 'ja',

		// General options
		theme : "advanced",
		plugins : "style,advhr,advimage,advlink,inlinepopups,media,contextmenu,noneditable,visualchars,nonbreaking,xhtmlxtras,advlist",
//		plugins : "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

		// Theme options
		theme_advanced_buttons1 : "bold,italic,underline,strikethrough,forecolor,|,styleselect,formatselect,fontselect,fontsizeselect",
		theme_advanced_buttons2 : "link,unlink,anchor,image,cleanup,code",
		theme_advanced_buttons3 : "",
		theme_advanced_buttons4 : "",
/*
		theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
		theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
		theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
		theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
*/
		//
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : true,

		// Example content CSS (should be your site CSS)
		// content_css : "/css/content.css",

		// Drop lists for link/image/media/template dialogs
		// template_external_list_url : "lists/template_list.js",
		// external_link_list_url : "lists/link_list.js",
		// external_image_list_url : "lists/image_list.js",
		// media_external_list_url : "lists/media_list.js",

		// Replace values for the template plugin
		template_replace_values : {
			username : "Some User",
			staffid : "991234"
		},
		
		//Mad file manager
		file_browser_callback : MadFileBrowser
	});
}

function MadFileBrowser(field_name, url, type, win) {
  tinyMCE.activeEditor.windowManager.open({
	  file : "/mfm.php?field=" + field_name + "&url=" + url + "",
	  title : 'File Manager',
	  width : 640,
	  height : 450,
	  resizable : "no",
	  inline : "yes",
	  close_previous : "no"
  }, {
	  window : win,
	  input : field_name
  });
  return false;
}
//