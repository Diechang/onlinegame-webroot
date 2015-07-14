// JavaScript Document

/** Index Mashup - Google News & Tweet
------------------------------ **/

/** Google load
------------------------------ **/
google.load('search', '1' , {"language" : "ja_JP"});
google.setOnLoadCallback(function()
{
	$(function()
	{
		News.init();
	});
	$(window).unload(function()
	{
		News	= null;
		Tweet	= null;
	});
});


/** Google news search
------------------------------ **/
var News = 
{
	/** Vars
	------------------------------ **/
	AJAX_LOADER_L_CLASS		: "ajax-loader-l",
	$resultContainer	: new Object(),
	//
	poweredLink : 
	{
		$elm	: new Object(),
		url		: "http://news.google.co.jp/news/search?pz=1&cf=all&ned=jp&hl=ja&q="
	},
	//
	word		: "",
	//
	newsSearch	: null,
	
	/** Functions
	------------------------------ **/
	init : function()
	{
		var _self = this;
		_self.$wordInput		= $("#newsSearchWord");
		_self.$resultContainer	= $("#newsResult");
		//
//		_self.poweredLink.$elm	= $("#newsPowered > a");
		//
		_self.search();
	},
	
	resultSet : function()
	{
		this.$resultContainer.removeClass(News.AJAX_LOADER_L_CLASS);
		//Results
		if (this.newsSearch.results && this.newsSearch.results.length > 0)
		{
			//Result table
			var results = "";
			for (var $i = 0; $i < this.newsSearch.results.length; $i++)
			{
				var news		= this.newsSearch.results[$i];
				results += '<h4>' + '<a href="' + news.unescapedUrl + '" target="_blank">' + news.titleNoFormatting + '</a></h4>';
				results += '<p class="content">' + news.content + '</p>';
				results += '<p class="publish">' + news.publisher + '</p>';
			}
			//
			//Paging
			var paging	= News._gPaging(News.newsSearch , "News.newsSearch");
			//
			//Append
			this.$resultContainer.html(paging + results + paging);
		}
		else
		{
			this.$resultContainer.html("<p>記事が見つかりませんでした</p>");
		}
		//Powered
//		this.poweredLink.$elm.attr("href" , this.poweredLink.url + encodeURI(this.word));
//		this.poweredLink.$elm.html("Powered by Google ニュース検索（" + this.word + "）");
	},
	
	search : function()
	{
		var _self = this;
		//
		if(_self.$wordInput.val().length)
		{
			//word
			_self.word = _self.$wordInput.val();
			//Loader
			_self.$resultContainer.html("").addClass(News.AJAX_LOADER_L_CLASS);
			//
			_self.newsSearch = new google.search.NewsSearch();
			_self.newsSearch.setResultOrder(google.search.Search.ORDER_BY_RELEVANCE);
			_self.newsSearch.setResultSetSize(google.search.Search.SMALL_RESULTSET);
			_self.newsSearch.setRestriction(google.search.Search.RESTRICT_EXTENDED_ARGS , {"ned" : "jp"});
			_self.newsSearch.setSearchCompleteCallback(this, News.resultSet);
			_self.newsSearch.execute(_self.word);
		}
	},
	
	_gPaging : function(obj , objName)
	{
		//Paging
		var cursor	= obj.cursor;
		var curPage	= cursor.currentPageIndex;
		var paging	= "";
		if(cursor.pages.length > 1)
		{
			paging += '<p class="paging"> ';
			//Prev
			if(curPage > 0)
			{
				paging += '<span><a href="javascript:' + objName + '.gotoPage(' + (curPage - 1) + ')">≪前へ</a></span>';
			}
			//Pag numbers
			for (var $i = 0; $i < cursor.pages.length; $i++)
			{
				var page = cursor.pages[$i];
				if (curPage == $i)
				{
					paging += '<span class="current">' + page.label + '</span>';
				}
				else
				{
					paging += '<span><a href="javascript:' + objName + '.gotoPage(' + $i + ')">' + page.label + '</a></span>';
				}
			}
			//Next
			if(curPage + 1 < cursor.pages.length)
			{
				paging += '<span><a href="javascript:' + objName + '.gotoPage(' + (curPage + 1) + ')">次へ≫</a></span>';
			}
			paging += ' </p>';
		}
		//
		return paging;
	}
}


/** Twitter Widget
------------------------------ **/
var TWidget = 
{
	obj : function(word)
	{
		return {
			version: 2,
			type: 'search',
			search: word,
			interval: 6000,
			title: "from Twitter",
			subject: word,
			width: 510,
			height: 300,
			theme:
			{
				shell:
				{
					background: '#666666',
					color: '#ffffff'
				},
				tweets:
				{
					background: '#ffffff',
					color: '#333333',
					links: '#3399cc'
				}
			},
			features:
			{
				scrollbar: false,
				loop: true,
				live: true,
				hashtags: true,
				timestamp: true,
				avatars: true,
				toptweets: true,
				behavior: 'default'
			}
		}
	}
}