// JavaScript Document

/** Google load
------------------------------ **/
google.load('search', '1' , {"language" : "ja_JP"});
google.setOnLoadCallback(function()
{
	$(function()
	{
		MBS.init();
	//	Shadowbox.init();
	});
	$(window).unload(function()
	{
		MBS		= null;
		Video	= null;
		Blog	= null;
	});
});


/** Movie & Blog Search
------------------------------ **/
var MBS = 
{
	/** Vars
	------------------------------ **/
	AJAX_PATH_MOVIE			: "",
	AJAX_PATH_BLOG			: "",
	ACTIVE_CLASS_STRINGS	: "active",
	AJAX_LOADER_L_CLASS		: "ajax-loader-l",
	
	$tabs		: new Object(),
	$base		: new Object(),
	$blocks		: new Object(),
	
	current		: 0,
	
	/** Functions
	------------------------------ **/
	//Initialize
	init : function()
	{
		var _self = this;
		
		//$ Objects
		_self.$tabs		= $("#searchTabs").children("li");
		_self.$base		= $("#titlesSearchContainer");
		_self.$blocks	= _self.$base.children(".searchs");
		
		//Hide
		_self.$blocks.hide();
		
		//Tabs Set
		_self.tarChange();
		
		//Events
		_self.$tabs.bind("click" , function()
		{
			var index = _self.$tabs.index(this);
			if(_self.current != index)
			{
				_self.current = index;
				_self.tarChange();
			}
		});
		
		//Youtube
//		Youtube.init();
		//Video search
		Video.init();
		//Blog search
		Blog.init();
	},
	
	//Target Change
	tarChange : function()
	{
		//Tabs
		this.$tabs.children("a").removeClass(this.ACTIVE_CLASS_STRINGS);
		this.$tabs.children("a").eq(this.current).addClass(this.ACTIVE_CLASS_STRINGS);
		//Blocks
		this.$blocks.filter(":visible").hide();
		this.$blocks.eq(this.current).fadeIn();
	},
	
	/** Lib
	------------------------------ **/
	//Google paging
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


/** Google video search
------------------------------ **/
var Video = 
{
	/** Vars
	------------------------------ **/
	$base				: new Object(),
	$wordInput			: new Object(),
	$searchButton		: new Object(),
	$resultContainer	: new Object(),
	//
	poweredLink : 
	{
		$elm	: new Object(),
		url		: "http://jp.youtube.com/results?search_type=&amp;aq=f&amp;search_query="
	},
	//
	word		: "",
	//
	videoSearch	: null,
	
	/** Functions
	------------------------------ **/
	init : function()
	{
		var _self = this;
		_self.$base				= $("#movie");
		_self.$wordInput		= $("#movieSearchWord");
		_self.$searchButton		= $("#movieSearchButton");
		_self.$resultContainer	= $("#movieResult");
		//
		_self.poweredLink.$elm	= $("#moviePowered > a");
		//
		//Search event
		_self.$searchButton.bind("click" , function(){_self.search()});
		_self.$wordInput.bind("keypress" , function(e)
		{
			if(e.keyCode == 13)
			{
				_self.search();
			}
		});
		//
		_self.search();
		//
		Shadowbox.init();
	},
	
	resultSet : function()
	{
		this.$resultContainer.removeClass(MBS.AJAX_LOADER_L_CLASS);
		//Results
		if (this.videoSearch.results && this.videoSearch.results.length > 0)
		{
			//Result table
			var results = "";
			results	+= "<table>";
			for (var $i = 0; $i < this.videoSearch.results.length; $i++)
			{
				var video		= this.videoSearch.results[$i];
				var duration	= new Date(0);
				duration.setSeconds(video.duration);
				results += '<tr>' +
						'<td class="thumb">' +
						'<a href="' + video.playUrl + '" onclick="Video.sbOpen(this,\'' + video.playUrl + '\',\'thumb\'); return false;">' +
						'<img src="' + video.tbUrl + '" alt="' + video.titleNoFormatting + '" width="80" />' +
						'</a>' +
						'<div class="star50Back" style="margin:5px auto;">' +
						'<div class="star50" style="width:' + (Math.round(video.rating) * 10) + 'px;"><img src="/img/design/rating_star50.gif" alt="評価：' + video.rating + '点" /></div>' +
						'</div>' +
						'</td>' +
						'<td class="data">' +
						'<p class="title"><a href="' + video.playUrl + '" onclick="Video.sbOpen(this,\'' + video.playUrl + '\',\'string\'); return false;">' + video.titleNoFormatting + '</a></p>' +
						'<p class="description">' + video.content + '</p>' +
						'<p class="data">[再生時間]' + duration.getMinutes() + '分' + duration.getSeconds() + '秒</p>' +
						'</td>' +
						'</tr>';
			}
			results += '</table>';
			//
			//Paging
			var paging	= MBS._gPaging(Video.videoSearch , "Video.videoSearch");
			//
			//Append
			this.$resultContainer.html(paging + results + paging);
		}
		else
		{
			this.$resultContainer.html("<p>動画が見つかりませんでした</p>");
		}
		//Powered
		this.poweredLink.$elm.attr("href" , this.poweredLink.url + encodeURI(this.word));
		this.poweredLink.$elm.html("Powered by Youtube（" + this.word + "）");
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
			_self.$resultContainer.html("").addClass(MBS.AJAX_LOADER_L_CLASS);
			//
			_self.videoSearch = new google.search.VideoSearch();
			_self.videoSearch.setResultOrder(google.search.Search.ORDER_BY_RELEVANCE);
			_self.videoSearch.setResultSetSize(google.search.Search.LARGE_RESULTSET);
			_self.videoSearch.setSearchCompleteCallback(this, Video.resultSet);
			_self.videoSearch.execute(_self.word);
		}
	},
	
	//Shadowbox open
	sbOpen : function(elm,cont,gal)
	{
		Shadowbox.open({
			link	: elm,
			content	: cont,
			gallery	: gal,
			player	: "swf",
			width	: 640,
			height	: 480
		});
	}
}



/** Google blog search
------------------------------ **/
var Blog = 
{
	/** Vars
	------------------------------ **/
	$base				: new Object(),
	$wordInput			: new Object(),
	$searchButton		: new Object(),
	$resultContainer	: new Object(),
	//
	poweredLink : 
	{
		$elm	: new Object(),
		url		: "http://blogsearch.google.co.jp/blogsearch?hl=ja&amp;ie=UTF-8&amp;lr=lang_ja&amp;q="
	},
	//
	word		: "",
	//
	blogSearch	: null,
	
	/** Functions
	------------------------------ **/
	init : function()
	{
		var _self = this;
		_self.$base				= $("#blog");
		_self.$wordInput		= $("#blogSearchWord");
		_self.$searchButton		= $("#blogSearchButton");
		_self.$resultContainer	= $("#blogResult");
		_self.poweredLink.$elm	= $("#blogPowered > a");
		//
		//Search event
		_self.$searchButton.bind("click" , function(){_self.search()});
		_self.$wordInput.bind("keypress" , function(e)
		{
			if(e.keyCode == 13)
			{
				_self.search();
			}
		});
		//
		_self.search();
	},
	
	resultSet : function()
	{
		this.$resultContainer.removeClass(MBS.AJAX_LOADER_L_CLASS);
		if (this.blogSearch.results && this.blogSearch.results.length > 0)
		{
			//Result table
			var results = "";
			results	+= "<table>";
			for (var $i = 0; $i < this.blogSearch.results.length; $i++)
			{
				var blog		= this.blogSearch.results[$i];
				var date		= new Date(blog.publishedDate);
				results += '<tr>' +
						'<td class="thumb">' +
						'<a href="' + blog.blogUrl + '" target="_blank">' +
						'<img src="http://capture.heartrails.com/small?' + blog.blogUrl + '" width="80" />' +
						'</a>' +
						'</td>' +
						'<td class="data">' +
						'<p class="title"><a href="' + blog.postUrl + '" target="_blank">' + blog.titleNoFormatting + '</a></p>' +
						'<p class="description">' + blog.content + '</p>' +
						'<p class="data">[投稿日]' + date.toLocaleDateString() + '<br />' +
						'[ブログ]<a href="' + blog.blogUrl + '" target="_blank">' + blog.blogUrl + '</a></p>' +
						'</td>' +
						'</tr>';
			}
			results += '</table>';
			//
			//Paging
			var paging	= MBS._gPaging(Blog.blogSearch , "Blog.blogSearch");
			//
			//Append
			this.$resultContainer.html(paging + results + paging);
		}
		else
		{
			this.$resultContainer.html("<p>記事が見つかりませんでした</p>");
		}
		//Powered
		this.poweredLink.$elm.attr("href" , this.poweredLink.url + encodeURI(this.word));
		this.poweredLink.$elm.html("Powered by Googleブログ検索（" + this.word + "）");
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
			_self.$resultContainer.html("").addClass(MBS.AJAX_LOADER_L_CLASS);
			//
			_self.blogSearch = new google.search.BlogSearch();
			_self.blogSearch.setResultOrder(google.search.Search.ORDER_BY_DATE);
			_self.blogSearch.setResultSetSize(google.search.Search.LARGE_RESULTSET);
			_self.blogSearch.setSearchCompleteCallback(this, Blog.resultSet);
			_self.blogSearch.execute(_self.word);
		}
	}
}
