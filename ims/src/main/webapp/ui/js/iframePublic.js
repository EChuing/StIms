$(function() {
	$(".bodyLoadingOver").remove();
});
/** **** 分页插件 ***** */
(function($) {
	var ms = {
		init : function(obj, args) {
			return (function() {
				ms.fillHtml(obj, args);
				ms.bindEvent(obj, args);
			})();
		},
		// 填充html
		fillHtml : function(obj, args) {
			return (function() {
				obj.empty();
				// 上一页
				if (args.current > 1) {
					obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
				} else {
					obj.remove('.prevPage');
					obj.append('<span class="disabled">上一页</span>');
				}
				// 中间页码
				if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
					obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
				}
				if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
					obj.append('<span>...</span>');
				}
				var start 	= args.current - 2;
				var end		= args.current + 2;
				if ((start > 1 && args.current < 4) || args.current == 1) {
					end++;
				}
				if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
					start--;
				}
				for (; start <= end-1; start++) {
					if (start <= args.pageCount && start >= 1) {
						if (start != args.current) {
							obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
						} else {
							obj.append('<span class="current">' + start + '</span>');
						}
					}
				}
				if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
					obj.append('<span>...</span>');
				}
				if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
					obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a>');
				}
				var thisPageNums = args.onePageNums;
				// 下一页
				if (args.current < args.pageCount) {
					obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
					if(args.addbr==true){
						obj.append("<br>");
					}
					obj.append("<font style='font-size:12px;' color='#50B4D2'>  共 " + args.pageCount + " 页  "+args.totalNum+"条数据 当前页"+thisPageNums+"条数据 </font>");
					obj.append('</center>');
				} else {
					thisPageNums = args.totalNum - args.onePageNums*(args.current-1);
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页</span>');
					if(args.addbr==true){
						obj.append("<br>");
					}
					obj.append("<font style='font-size:12px;' color='#50B4D2'>  共 " + args.pageCount + " 页  "+args.totalNum+"条数据 当前页"+thisPageNums+"条数据 </font>");
				}
			})();
		},
		// 绑定事件
		bindEvent : function(obj, args) {
			return (function() {
				obj.on("click", "a.tcdNumber", function() {
					var current = parseInt($(this).text());
					ms.fillHtml(obj, {
						"current" : current,
						"pageCount" : args.pageCount,
						"totalNum":args.totalNum,
						"onePageNums":args.onePageNums,
						"addbr":args.addbr,
					});
					if (typeof (args.backFn) == "function") {
						args.backFn(current);
					}
				});
				// 上一页
				obj.on("click", "a.prevPage",
						function() {
							var current = parseInt(obj.children("span.current")
									.text());
							ms.fillHtml(obj, {
								"current" : current - 1,
								"pageCount" : args.pageCount,
								"totalNum":args.totalNum,
								"onePageNums":args.onePageNums,
								"addbr":args.addbr,
							});
							if (typeof (args.backFn) == "function") {
								args.backFn(current - 1);
							}
						});
				// 下一页
				obj.on("click", "a.nextPage",
						function() {
							var current = parseInt(obj.children("span.current").text());
							ms.fillHtml(obj, {
								"current" : current + 1,
								"pageCount" : args.pageCount,
								"totalNum":args.totalNum,
								"onePageNums":args.onePageNums,
								"addbr":args.addbr,
							});
							if (typeof (args.backFn) == "function") {
								args.backFn(current + 1);
							}
						});
			})();
		}
	}
	$.fn.createPage = function(options) {
		var args = $.extend({
			onePageNums:10,
			totalNum : 10,
			pageCount : 10,
			current : 1,
			addbr:false,
			backFn : function() {
			}
		}, options);
		ms.init(this, args);
	}
})(jQuery);

//弹窗top
function getTop(height){
	var top = $(window).height();
	if (top > 564) {
		top = $(document).scrollTop() + ($(window).height() - height) * 0.3;
	} else {
		top = $(document).scrollTop() + 20;
	}
	if (top < 0) {
		top = 20;
	}
	return top;
}
//弹窗left
function getLeft(width){
	var left = $(window).width();
	if (left > 800) {
		left = $(document).scrollLeft() + ($(window).width() - width) * 0.5;
	} else {
		left = $(document).scrollLeft() + 20;
	}
	if (left < 0) {
		left = 20;
	}
	return left;
}
//初始化dialog
function initDialog(id){
	$('#' + id).show();
	$('#' + id).dialog({
		title : '',
		top : getTop(600),
		left : getLeft(800),
		width : 800,
		height : 600,
		closed : true,
		cache : false,
		modal : true
	});
}
