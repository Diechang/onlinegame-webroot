// OGL Utils

(function($, window, document, undefined){
	var BASENAME = OGL.PREFIX + "-utils";

	//Public object
	OGL.utils = {};
	
	/**
	 * デフォルトイベントをキャンセル
	 * 
	 * @param	{event}	e
	 * 
	 * @return	false
	 */
	OGL.utils.cancelEvent = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	
	/**
	 * 配列($.serializeArray)をオブジェクト化
	 * 
	 * @param	{array}	serializedArray $.serializeArray
	 *
	 * @return	{object}
	 */
	OGL.utils.serializeObject = $.serializeObject = function(serializedArray)
	{
		// console.log(serializedArray)
		var object = {};
		$.each(serializedArray, function()
		{
			object[this.name] = this.value;
		});
		return object;
	}
	//ver.$plugin
	$.fn.serializeObject = function()
	{
		var serializedArray = this.serializeArray();
		return $.serializeObject(serializedArray);
	}

	/**
	 * パラメタ文字列をオブジェクト化
	 * https://gist.github.com/rcmachado/242617
	 * 
	 * @param  {string}	string
	 * @return {object}
	 */
	OGL.utils.unserialize = function(string){
		var str = decodeURI(string);
		var pairs = str.split('&');
		var obj = {}, p, idx, val;
		for (var i=0, n=pairs.length; i < n; i++) {
			p = pairs[i].split('=');
			idx = p[0];
 
			if (idx.indexOf("[]") == (idx.length - 2)) {
				// Eh um vetor
				var ind = idx.substring(0, idx.length-2)
				if (obj[ind] === undefined) {
					obj[ind] = [];
				}
				obj[ind].push(p[1]);
			}
			else {
				obj[idx] = p[1];
			}
		}
		return obj;
	};

	/**
	 * スクロール
	 *
	 * @param	{mixed}	number or $obj
	 */
	OGL.utils.scrollTo = function($target, duration)
	{
		OGL._hb.animate({scrollTop: (typeof $target === "number" ? $target : $target.offset().top)}, duration || "fast");
	}
	/**
	 * トップへ
	 */
	OGL.utils.scrollTop = function()
	{
		OGL.utils.scrollTo(0);
	}

	/**
	 * User agent
	 */
	OGL.utils.ua = (function()
	{
		var ua	= {};
		ua.name	= window.navigator.userAgent.toLowerCase();

		ua.isIE			= (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
		ua.isiPhone		= ua.name.indexOf('iphone') >= 0;
		ua.isiPod		= ua.name.indexOf('ipod') >= 0;
		ua.isiPad		= ua.name.indexOf('ipad') >= 0;
		ua.isiOS		= (ua.isiPhone || ua.isiPod || ua.isiPad);
		ua.isAndroid	= ua.name.indexOf('android') >= 0;
		ua.isTablet		= (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));
		ua.isTouch		= (ua.isiOS || ua.isAndroid);

		if(ua.isIE)
		{
			ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
			if(ua.verArray) ua.ver = parseInt(ua.verArray[2], 10);
		}
		if(ua.isiOS)
		{
			ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name);
			if(ua.verArray) ua.ver = parseInt(ua.verArray[2], 10);
		}
		if(ua.isAndroid)
		{
			ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
			if(ua.verArray) ua.ver = parseInt(ua.verArray[2], 10);
		}

		return ua;
	})();

	/**
	 * Unique ID
	 */
	OGL.utils.uniqueId = function()
	{
		var date	= new Date();
		var time	= date.getTime();
		var randam	= Math.floor(Math.random() * 1000);
		return time.toString() + '_' + randam;
	}

})(jQuery, this, this.document);
