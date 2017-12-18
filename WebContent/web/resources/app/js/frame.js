(function($, window, document) {

	$(function() {
		$(document).on("click", "a[data-new-page]", function() {
			openWindow($(this).data("newPage"));
		});
		$(document).on("click", "a[data-page]", function() {
			redirect($(this).data("page"))
		});
		$(document).on("click", "a[data-menu]", function() {
			var $parent=$(this).parent();
			var level=$parent.data("level");
			if(!$.isNullOrEmpty(level)){//点击菜单
				$("#sidebar").find("[data-level=1]").removeClass("active");
				$("#sidebar").find("[data-level=1]").removeClass("open");
				$("#sidebar").find("[data-level=2]").removeClass("active");
				
				if(level=="1"){
					$parent.addClass("active");
				}
				if(level==2){
					$parent.addClass("active");
					$parent.parent().parent().addClass("active open");
				}
			}			
			openMenu($(this).data("menu"));
		});
		$(window).bind("load resize", function() {
			topOffset = 45;

			height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height);
			height = height - topOffset;
			if (height < 1) height = 1;
			if (height > topOffset) {
				$("#page-container").css("min-height", (height) + "px");
			}
		});
	});

}(jQuery, window, document));

function openWindow(url) {
	if (appConfig.network == "1") {
		url = url.replace(".jsp", "");
	}
	if (url.indexOf("http") != 0) {
		url = appConfig.contextPath + url;
	}
	window.open(url);
};

function openMenu(url) {
	if (appConfig.network == "1") {
		url = url.replace(".jsp", "");
	}
	if (url.indexOf("http") != 0) {
		url = appConfig.contextPath + url;
	}
	
	var seg = url.split('?');
	var params = {};
	if (seg.length > 1) {
		var seg = seg[1].split('&');
		var len = seg.length;
		for (var i = 0; i < len; i++) {
			s = seg[i].split('=');
			params[s[0]] = s[1];
		}
	}
	
	$("#page-container").empty();
	$("#page-container").data("params",params);
	if(appConfig.network=="1"){
		$("#page-container").load(url,{_action:"menu"});
	}else{
		$("#page-container").load(url);
	}	
}

function redirect(url) {
	if (appConfig.network == "1") {
		url = url.replace(".jsp", "");
	}
	if (url.indexOf("http") != 0) {
		url = appConfig.contextPath + url;
	}
	window.location.href = url;
};

function parseURL(url) {
	var a = document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':', ''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function() {
			var ret = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length,
				i = 0,
				s;
			for (; i < len; i++) {
				if (!seg[i]) {
					continue;
				}
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
		hash: a.hash.replace('#', ''),
		path: a.pathname.replace(/^([^\/])/, '/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
		segments: a.pathname.replace(/^\//, '').split('/')
	};
};
$.postData=function(url,data,callback){
	return $.post(url,data,function(res){
		if(res.code==-1){
			window.location.href=res.url;
		}else{
			callback(res);
		}
	},"json");
};
function getParams() {
	var params=$("#page-container").data("params");
	return params;
}