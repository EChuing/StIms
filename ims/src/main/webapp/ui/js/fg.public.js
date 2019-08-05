document.write('<script src="js/locale/easyui-lang-zh_CN.js"><\/script>');
if(getJspName()!='fg_main'){
	document.write('<script src="js/doPurview.js"><\/script>');
}

$(function() {
	//页面渲染完毕后移除白色蒙版
	$(".bodyLoadingOver").remove();

	// 监听页面点击操作，刷新倒计时
	$(document).click(function() {
		window.parent.sec = 600;
		window.parent.parent.sec = 600;
	});
	// 监听键盘输入操作，刷新倒计时
	$(document).keyup(function() {
		window.parent.sec = 600;
		window.parent.parent.sec = 600;
	});

	//从其他页面跳转过来时，自动填写筛选条件
	doSkipToChild();

	//禁用浏览器自动完成
	$('input').attr('autocomplete', 'off');
});

//这里是读取身份证按钮要处理的
function IDCardInformation(){
	//console.log();
	var identityInformation= $("#id_card_reader_text_box", parent.document).val();
	
	$("#identityInformation").val(identityInformation+"");
	//console.log($("#identityInformation").val());
	if(identityInformation==''){
		myTips("读卡器无数据，请检测读卡器是否连接!","error");
	}else{
		//var identityInformation = JSON
		//console.log(identityInformation);
		//console.log($("identityInformation").val());
		identityInformation = JSON.parse(identityInformation);
		$("#popBirth").val(identityInformation.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
		//$("#birthday").val(identityInformation.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
		$("#popIdcard").val(identityInformation.Certificate.IDNumber);
		$("#idIssued").val(identityInformation.Certificate.IDIssued);
		$("#issuedValidDate").val(identityInformation.Certificate.IssuedData+"-"+identityInformation.Certificate.ValidDate);
		$("#popIdcardType").val("身份证/临时身份证/户口本");//身份证类型
		var imgData =identityInformation.Certificate.Base64Photo;
		$("#id_img_pers").attr("src","data:image/jpg;base64,"+imgData);
		$("#personIdPhoto").val(imgData);
		$("#personPhoto").val("");
		$("#popName").val(identityInformation.Certificate.Name);
		$("#addrtTypeDb").val("在住");//住户状态
		$("#popSex").val(identityInformation.Certificate.Sex);		//性别
		//$("#gender").val(identityInformation.Certificate.Sex);
		$("#popNation").val(identityInformation.Certificate.Nation);//民族
		//$("#nation").val(identityInformation.Certificate.Nation);
		//$("#address").val(identityInformation.Certificate.Address);
		$("#popIdcardAddress").val(identityInformation.Certificate.Address);//户籍地址
	}
}

function getJspName(){
	var a = location.href;
	var b = a.split("/");
	var c = b.slice(b.length-1, b.length).toString(String).split(".");
	var d = c.slice(0, 1)[0];//获取JSP名
	return d;
}
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
				if (args.current > args.pageCount - 4 && args.current >= args.pageCount){
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
				if (args.current < args.pageCount){
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

/** *** 时间相关 ***** */
// 获取当前时间
function getNowFormatDate() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if (hours >= 0 && hours <= 9) {
		hours = "0" + hours;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	var currentdate = date.getFullYear() + "-" + month + "-" + strDate + " "
			+ hours + ":" + minutes + ":" + seconds;
	return currentdate;
}
// 日期格式化
function formatDate(strTime) {
	var date = new Date(strTime);
	var fYear = date.getFullYear();
	var fMonth;
	if ((date.getMonth() + 1) <= 9) {
		fMonth = date.getMonth() + 1;
		fMonth = "0" + fMonth;
	} else {
		fMonth = date.getMonth() + 1;
	}
	var fDay;
	if (date.getDate() <= 9) {
		fDay = "0" + date.getDate();
	} else {
		fDay = date.getDate();
	}
	return fYear + "-" + fMonth + "-" + fDay;
}
// md5加密
function md5(string) {
	  var x = Array();
	  var k, AA, BB, CC, DD, a, b, c, d;
	  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
	  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
	  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
	  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
	  string = uTF8Encode(string);
	  x = convertToWordArray(string);
	  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	  for (k = 0; k < x.length; k += 16) {
	    AA = a; BB = b; CC = c; DD = d;
	    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
	    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
	    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
	    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
	    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
	    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
	    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
	    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
	    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
	    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
	    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
	    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
	    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
	    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
	    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
	    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
	    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
	    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
	    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
	    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
	    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
	    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
	    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
	    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
	    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
	    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
	    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
	    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
	    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
	    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
	    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
	    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
	    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
	    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
	    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
	    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
	    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
	    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
	    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
	    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
	    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
	    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
	    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
	    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
	    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
	    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
	    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
	    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
	    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
	    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
	    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
	    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
	    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
	    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
	    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
	    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
	    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
	    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
	    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
	    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
	    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
	    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
	    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
	    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
	    a = addUnsigned(a, AA);
	    b = addUnsigned(b, BB);
	    c = addUnsigned(c, CC);
	    d = addUnsigned(d, DD);
	  }
	  var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
	  return tempValue.toLowerCase();
	}
	var uTF8Encode = function (string) {
		  string = string.replace(/\x0d\x0a/g, "\x0a");
		  var output = "";
		  for (var n = 0; n < string.length; n++) {
		    var c = string.charCodeAt(n);
		    if (c < 128) {
		      output += String.fromCharCode(c);
		    } else if ((c > 127) && (c < 2048)) {
		      output += String.fromCharCode((c >> 6) | 192);
		      output += String.fromCharCode((c & 63) | 128);
		    } else {
		      output += String.fromCharCode((c >> 12) | 224);
		      output += String.fromCharCode(((c >> 6) & 63) | 128);
		      output += String.fromCharCode((c & 63) | 128);
		    }
		  }
		  return output;
		};

	var convertToWordArray = function (string) {
	  var lWordCount;
	  var lMessageLength = string.length;
	  var lNumberOfWordsTempOne = lMessageLength + 8;
	  var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
	  var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
	  var lWordArray = Array(lNumberOfWords - 1);
	  var lBytePosition = 0;
	  var lByteCount = 0;
	  while (lByteCount < lMessageLength) {
	    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
	    lBytePosition = (lByteCount % 4) * 8;
	    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
	    lByteCount++;
	  }
	  lWordCount = (lByteCount - (lByteCount % 4)) / 4;
	  lBytePosition = (lByteCount % 4) * 8;
	  lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
	  lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
	  lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
	  return lWordArray;
	};

	var wordToHex = function (lValue) {
	  var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
	  for (lCount = 0; lCount <= 3; lCount++) {
	    lByte = (lValue >>> (lCount * 8)) & 255;
	    WordToHexValueTemp = "0" + lByte.toString(16);
	    WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
	  }
	  return WordToHexValue;
	};
	
	var addUnsigned = function (lX, lY) {
		  var lX4, lY4, lX8, lY8, lResult;
		  lX8 = (lX & 0x80000000);
		  lY8 = (lY & 0x80000000);
		  lX4 = (lX & 0x40000000);
		  lY4 = (lY & 0x40000000);
		  lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		  if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		  if (lX4 | lY4) {
		    if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
		    else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		  } else {
		    return (lResult ^ lX8 ^ lY8);
		  }
	}
	
	var F = function (x, y, z) {
		  return (x & y) | ((~x) & z);
		}

		var G = function (x, y, z) {
		  return (x & z) | (y & (~z));
		}

		var H = function (x, y, z) {
		  return (x ^ y ^ z);
		}

		var I = function (x, y, z) {
		  return (y ^ (x | (~z)));
		}

		var FF = function (a, b, c, d, x, s, ac) {
		  a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
		  return addUnsigned(rotateLeft(a, s), b);
		};

		var GG = function (a, b, c, d, x, s, ac) {
		  a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
		  return addUnsigned(rotateLeft(a, s), b);
		};

		var HH = function (a, b, c, d, x, s, ac) {
		  a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
		  return addUnsigned(rotateLeft(a, s), b);
		};

		var II = function (a, b, c, d, x, s, ac) {
		  a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
		  return addUnsigned(rotateLeft(a, s), b);
		};
		
		var rotateLeft = function (lValue, iShiftBits) {
			  return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
			}
	
// 自定义时间格式
function formatTime(time, type) {
	// console.log(time);
	var getTime = '';
	// 格式1：月-日 时:分 01-01 00:00
	if (type == '1') {
		var month = time.split("-")[1];
		var date = time.split("-")[2].split(" ")[0];
		var hour = time.split("-")[2].split(" ")[1].split(":")[0];
		var minute = time.split("-")[2].split(" ")[1].split(":")[1];
		getTime = month + "-" + date + " " + hour + ":" + minute;
	}
	// 格式2：年-月-日 2016-01-01
	if (type == '2') {
		var year = time.split("-")[0];
		var month = time.split("-")[1];
		var date = time.split("-")[2].split(" ")[0];
		getTime = year + "-" + month + "-" + date;
	}
	// 格式3：年月日时分秒 201601010000
	if (type == '3') {
		var year = time.split("-")[0];
		var month = time.split("-")[1];
		var date = time.split("-")[2].split(" ")[0];
		var hour = time.split("-")[2].split(" ")[1].split(":")[0];
		var minute = time.split("-")[2].split(" ")[1].split(":")[1];
		var second = time.split("-")[2].split(" ")[1].split(":")[2];
		getTime = year + month + date + hour + minute + second;
	}

	if (type == '4') {
		var year = time.split("-")[0];
		var month = time.split("-")[1];
		var date = time.split("-")[2].split(" ")[0];
		var hour = time.split("-")[2].split(" ")[1].split(":")[0];
		var minute = time.split("-")[2].split(" ")[1].split(":")[1];
		var second = time.split("-")[2].split(" ")[1].split(":")[2];
		getTime = year +"年"+ month+"月" + date+"日 " + hour +":"+ minute ;
	}

	if (type == '5') {
		var year = time.split("-")[0];
		var month = time.split("-")[1];
		var date = time.split("-")[2].split(" ")[0];
		var hour = time.split("-")[2].split(" ")[1].split(":")[0];
		var minute = time.split("-")[2].split(" ")[1].split(":")[1];
		var second = time.split("-")[2].split(" ")[1].split(":")[2];
		getTime = year +"年"+ month+"月" + date+"日 " + hour +":"+ minute+":"+second;
	}


	return getTime;
}

/** *** 选择楼栋input弹出选择框**** */
$(function() {
	// 给字母下拉框赋值
	for (var i in _buildingVal.letter) {
		$("#buildingLetter").append("<option value='" + _buildingVal.letter[i] + "座'>" + _buildingVal.letter[i] + "座</option> ");
	}
	// 给数字下拉框赋值
	for (var i in _buildingVal.num) {
		$("#buildingNum").append("<option value='" + _buildingVal.num[i] + "栋'>" + _buildingVal.num[i] + "栋</option> ");
	}
	// 给字母+数字下拉框赋值
	for (var i in _buildingVal.groupOne) {
		$("#buildingGroupOne").append("<option value='" + _buildingVal.groupOne[i] + "'>" + _buildingVal.groupOne[i] + "</option> ");
	}
	// 给数字+字母下拉框赋值
	for (var i in _buildingVal.groupTwo) {
		$("#buildingGroupTwo").append("<option value='" + _buildingVal.groupTwo[i] + "'>" + _buildingVal.groupTwo[i] + "</option> ");
	}
	// 监听下拉框选择
	$("#selectBuilding select").change(function() {
		var text = $(this).find("option:selected").text();
		$("#inputSelect").val(text);
		$('#selectBuilding').hide();
		$('#selectBuilding input').val('');
		$('#selectBuilding select').val('');
	});
	// 监听输入框输入
	$("#selectBuilding input").keyup(function() {
		var text = $(this).val();
		$("#inputSelect").val(text);
	});
	// 点击输入框显示选择框
	$('#inputSelect').click(function() {
		$('#selectBuilding').css({
			'z-index' : '9999'
		});
		$('#selectBuilding').show();
	});

});
/** ***输入限制**** */
// 限制只能输入数字
$(function() {
	// 文本框只能输入数字，并屏蔽输入法和粘贴
	$.fn.numeral = function() {
		// 禁用输入法
		$(this).css("ime-mode", "disabled");
		this.bind("keypress", function(e) {
			var code = (e.keyCode ? e.keyCode : e.which); // 兼容火狐 IE
			return code >= 48 && code <= 57;
		});
		this.bind("blur", function() {
			if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
				this.value = this.value.substr(0, this.value.length - 1);
			} else if (isNaN(this.value)) {
				this.value = "";
			}
		});
		this.bind("paste", function(e) {
			// 获取剪切板的内容
			var clipboardData = window.clipboardData; //for IE   
	        if (!clipboardData) { // for chrome   
	            clipboardData = e.originalEvent.clipboardData;  
	        }  
			var s = clipboardData.getData('text');
			if (!/\D/.test(s))
				;
			value = s.replace(/^0*/, '');
			return false;
		});
		this.bind("dragenter", function() {
			return false;
		});
	};
});
// 限制只能输入字母
$(function() {
	// 文本框只能输入字母，并屏蔽输入法和粘贴
	$.fn.onlyAlpha = function() {
		// 禁用输入法
		$(this).css("ime-mode", "disabled");
		$(this).bind(
				'keypress',
				function(event) {
					var eventObj = event || e;
					var keyCode = eventObj.keyCode || eventObj.which;
					if ((keyCode >= 65 && keyCode <= 90)
							|| (keyCode >= 97 && keyCode <= 122))
						return true;
					else
						return false;
				});
		$(this).bind('focus', function() {
			this.style.imeMode = 'disabled';
		});
		$(this).bind("paste", function() {
			var clipboard = window.clipboardData.getData("Text");
			if (/^[a-zA-Z]+$/.test(clipboard))
				return true;
			else
				return false;
		});
	};
});
// 限制只能输入数字和字母
$(function() {
	// 文本框只能输入数字和字母，并屏蔽输入法和粘贴
	$.fn.onlyNumAlpha = function() {
		// 禁用输入法
		$(this).css("ime-mode", "disabled");
		$(this).bind(
				'keypress',
				function(event) {
					var eventObj = event || e;
					var keyCode = eventObj.keyCode || eventObj.which;
					if ((keyCode >= 48 && keyCode <= 57)
							|| (keyCode >= 65 && keyCode <= 90)
							|| (keyCode >= 97 && keyCode <= 122))
						return true;
					else
						return false;
				});
		$(this).bind('focus', function() {
			this.style.imeMode = 'disabled';
		});
		$(this).bind("paste", function() {
			var clipboard = window.clipboardData.getData("Text");
			if (/^(\d|[a-zA-Z])+$/.test(clipboard))
				return true;
			else
				return false;
		});
	};
});
//限制只能输入小数点后只有两位的正数金额
$(function() {
	// 文本框只能输入数字，并屏蔽输入法和粘贴
	$.fn.moneyNumeral = function() {
		// 禁用输入法
		$(this).attr("ime-mode", "disabled");
		this.bind("keypress", function(e) {
			var code = (e.keyCode ? e.keyCode : e.which); // 兼容火狐 IE
			var inputSelection = parseInt($(this).getInputSelection());// 获取input的光标位置
			if( ($(this).val()[0]=="0" && inputSelection==1 && code!=46)  
			   || ($(this).val()[0]!="0" && inputSelection==0 && code==48 )){//限制不能出现 01 01.情况
				return false;
			}
			if($(this).val()=='' && code==46){//限制为空值时不能输入小数点
				return false;
			}
			if($(this).val().indexOf(".") > -1 && code==46){//限制只能输入一个小数点
				return false;
			}
			if($(this).val().indexOf(".") > -1 && $(this).val().split(".")[1].length==2){//判断小数点后有两位数
				if(inputSelection > parseInt(($(this).val().length-3))){//限制输入的光标如果在小数点后面 不能进行输入
					return false;
				}
			}
			if($(this).val().length>2 && inputSelection==0 && code==46){
				return false;
			}
			return code >= 48 && code <= 57 || code==46;
		});
		//禁用复制
		this.bind("paste", function() {
			return false;
		});
		this.bind("dragenter", function() {
			return false;
		});
	};
});
//限制只能输入小数点后只有两位的可以为负数的金额
$(function() {
	// 文本框只能输入数字，并屏蔽输入法和粘贴
	$.fn.neMoneyNumeral = function() {
		// 禁用输入法
		$(this).css("ime-mode", "disabled");
		this.bind("keypress", function(e) {
			var code = (e.keyCode ? e.keyCode : e.which); // 兼容火狐 IE
			var inputSelection = parseInt($(this).getInputSelection());// 获取input的光标位置
			if( inputSelection > 0 && code==45){//限制只能在第一位输入负号
				return false;
			}
			if( $(this).val().indexOf("-") > -1 && code==45){//限制只能输入一个负号
				return false;
			}
			if((($(this).val()[0]=="0" && inputSelection==1) || ($(this).val()[0]=="-" && $(this).val()[1]=="0" && inputSelection==2))  && code!=46){//限制不能出现 01 01.情况
				return false;
			}
			if(($(this).val()=='' || $(this).val()=='-') && code==46){//限制为空值时或只有一个负号时不能输入小数点
				return false;
			}
			if($(this).val().indexOf(".") > -1 && code==46){//限制只能输入一个小数点
				return false;
			}
			if($(this).val().indexOf(".") > -1 && $(this).val().split(".")[1].length==2){//判断小数点后是否两位数
				if( inputSelection > parseInt(($(this).val().length-3))){//限制输入的光标如果在小数点后面 不能进行输入
					return false;
				}
			}
			return code >= 48 && code <= 57 || code==46 || code==45;
		});
		//禁用复制
		this.bind("paste", function() {
			return false;
		});
		this.bind("dragenter", function() {
			return false;
		});
	};
});
// $(this).getInputSelection()获取输入框光标的位置
$.fn.getInputSelection = function() {
    var obj = $(this).get(0);
    var cursurPosition=-1;
    if(obj.selectionStart || obj.selectionStart == 0){//非IE浏览器
        cursurPosition= obj.selectionStart;
    }else{//IE
        var range = document.selection.createRange();
        range.moveStart("character",-obj.value.length);//获取从光标位置到input最左边的位置，"-"表示坐标的左边
        cursurPosition=range.text.length;
        //alert(range.text);//获取range中的文本内容
    }
    return cursurPosition;
}
$.fn.setInputSelection = function(startIndex,len){
    var obj = $(this).get(0);
    $(obj).each(function(){
        if (obj.setSelectionRange){
            obj.focus();
            obj.setSelectionRange(startIndex, startIndex + len);
        } else if (document.selection) {
            var range = obj.createTextRange();
            range.collapse(true);
            range.moveStart('character', startIndex);
            range.moveEnd('character', len);
            range.select();
        } else {
            obj.selectionStart = startIndex;
            obj.selectionEnd = startIndex + len;
        }
    });
    return obj;
}

/** ***自定义浮点计算**** */
/**
 * 加法函数，用来得到精确的加法结果
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
 * 调用：accAdd(arg1,arg2) 
 * 返回值：arg1加上arg2的精确结果
 */
function accAdd(arg1, arg2) {
	if( arg1 == '' || arg1 == null ){
		arg1 = 0;
	}
	if( arg2 == ''|| arg2 == null ){
		arg2 = 0;
	}
	var r1, r2, m, c;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		var cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.toString().replace(".", "")) * cm;
			arg2 = Number(arg2.toString().replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.toString().replace(".", ""));
		arg2 = Number(arg2.toString().replace(".", ""));
	}
	return ((arg1 + arg2) / m).toFixed(2);
}

// 给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function(arg) {
	return accAdd(this, arg);
};
/**
 * 减法函数，用来得到精确的减法结果 
 * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 * 调用：accSub(arg1,arg2)
 * 返回值：arg1减去arg2的精确结果
 */
function accSub(arg1, arg2) {
	if( arg1 == '' || arg1 == null ){
		arg1 = 0;
	}
	if( arg2 == ''|| arg2 == null ){
		arg2 = 0;
	}
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(2);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function(arg) {
	return accSub(this, arg);
};
/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以 arg2的精确结果
 */
function accMul(arg1, arg2) {
	if( arg1 == '' || arg1 == null ){
		arg1 = 0;
	}
	if( arg2 == ''|| arg2 == null ){
		arg2 = 0;
	}
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {
	}
	return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(2);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function(arg) {
	return accMul(this, arg);
};
/**
 * 除法函数，用来得到精确的除法结果 
 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * 调用：accDiv(arg1,arg2) 
 * 返回值：arg1除以arg2的精确结果
 */
function accDiv(arg1, arg2) {
	if( arg1 == '' || arg1 == null ){
		arg1 = 0;
	}
	if( arg2 == ''|| arg2 == null ){
		arg2 = 0;
	}
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {
	}
	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	return ((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(2);
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function(arg) {
	return accDiv(this, arg);
};

// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
// 详情查看javascript的数值范围
function checkIDCard(idcode){
  // 加权因子
  var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  var code = idcode + "";
  var last = idcode[17];//最后一个

  var seventeen = code.substring(0, 17);

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  var arr = seventeen.split("");
  var len = arr.length;
  var num = 0;
  for(var i = 0; i<len; i++){
  num = num + arr[i] * weight_factor[i];
  }

  // 获取余数
  var resisue = num % 11;
  var last_no = check_code[resisue];

  // 格式的正则
  // 正则思路
  /*
  第一位不可能是0
  第二位到第六位可以是0-9
  第七位到第十位是年份，所以七八位为19或者20
  十一位和十二位是月份，这两位是01-12之间的数值
  十三位和十四位是日期，是从01-31之间的数值
  十五，十六，十七都是数字0-9
  十八位可能是数字0-9，也可能是X
  */
  var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

  // 判断格式是否正确
  var format = idcard_patter.test(idcode);

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return last === last_no && format ? true : false;
 }

// 区域部门联动
function storeAndDepartment(idPrefix, departSelect) {
	var storeId = idPrefix + 'TheStore';
	var departId = idPrefix + 'TheDepartment';
	var departmentStorefrontId = $("#" + storeId).val();
	$("#" + departId).empty();
	$.post('../queryDepartment.action', {
		departmentStorefrontId : departmentStorefrontId
	}, function(data) {
		if (data.code < -1) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		if (data.code == -1) {
			$("#" + departId).append("<option>无部门</option>");
			return;
		} else {
			$("#" + departId).append("<option></option>");
			for (var i in data.body) {
				$("#" + departId).append(
						"<option value = '" + data.body[i].departmentId + "'>"
								+ data.body[i].departmentName + "</option>");
			}
			if (departSelect != 'noSelect') {
				$("#" + departId).val(departSelect);
			}
		}
	});
}
// 合约日期年份计算
function renewalDate(time, nums, type) {
	var sumDate = new Date(time);
	if (type == 0) {//holidaySettingA nums为年数
		var sMonth = ((parseInt(nums)-1) * 12);
		sumDate.setMonth(sumDate.getMonth() + sMonth);
	} else if (type == 1) {//holidaySettingD nums为年数
		var sMonth = (parseInt(nums) * 12);
		sumDate.setMonth(sumDate.getMonth() + sMonth);
		sumDate.setDate(sumDate.getDate() - 1);
	} else if(type==2){//holidaySettingD nums为年*月*日
		var sMonth = parseInt(nums.split("*")[0])*12+parseInt(nums.split("*")[1]);
		var sDay = parseInt(nums.split("*")[2]);
		sumDate.setMonth(sumDate.getMonth() + sMonth);
		sumDate.setDate(sumDate.getDate() + sDay - 1);
	} else if(type==3){//holidaySettingB nums为天数
		if(nums == 0){
			nums = 1;
		}else if(nums == 1){
			nums = 2;
		}
		sumDate.setDate(sumDate.getDate() + parseInt(nums) - 1);
	} else if(type==4){//holidaySettingC nums为天数
		if(nums == 0){
			nums = 1;
		}else if(nums == 1){
			nums = 2;
		}
		sumDate.setDate(sumDate.getDate() - parseInt(nums) + 1);
	}
	return formatDate(sumDate);
}
// 合约免租期计算
function renewalHolidaySum(timeA,timeB,timeC,timeD,holiday){
	var tA = new Date(timeA.replace(/-/g, "/"));
	var tB = new Date(timeB.replace(/-/g, "/"));
	var tC = new Date(timeC.replace(/-/g, "/"));
	var tD = new Date(timeD.replace(/-/g, "/"));
	var days1 = tB.getTime() - tA.getTime();
	var days2 = tD.getTime() - tC.getTime();
	var time1 = parseInt(days1 / (1000 * 60 * 60 * 24))+1;
	var time2 = parseInt(days2 / (1000 * 60 * 60 * 24))+1;
	if(tA.getTime()==tB.getTime()){
		time1 = parseInt(0);
	}
	if(tD.getTime()==tC.getTime()){
		time2 = parseInt(0);
	}
	if((parseInt(time1)+parseInt(time2))==holiday){
		return false;
	}else{
		return true;
	}
}
//合约免租期计算-获得天数  此方法只针对修改合约有用，修改合约时能读取到免租期时段，不能直接反应为年前多少天，年后多少天，此函数可通过免租期时段计算出年前年后免租期天数
function changeHoliday(nums,type){
	var timeAId = '';
	var timeBId = '';
	if(type==0){
		timeAId = 'holidaySettingA'+nums;
		timeBId = 'holidaySettingB'+nums;
	}else{
		timeAId = 'holidaySettingC'+nums;
		timeBId = 'holidaySettingD'+nums;
	}
	var timeA = $('#'+timeAId).val();
	var timeB = $('#'+timeBId).val();
	var tA = new Date(timeA.replace(/-/g, "/"));
	var tB = new Date(timeB.replace(/-/g, "/"));
	var days1 = tB.getTime() - tA.getTime() + 1;
	var time1 = parseInt(days1 / (1000 * 60 * 60 * 24))+1;
	if(tA.getTime()==tB.getTime()){
		time1 = parseInt(0);
	}
	if(type==0){
		if($('#'+timeBId).val()==''){
			$('#holidaySumBefor'+nums).val(0);
			return;
		}
		$('#holidaySumBefor'+nums).val(time1);
	}else{
		if($('#'+timeAId).val()==''){
			$('#holidaySumAfter'+nums).val(0);
			return;
		}
		$('#holidaySumAfter'+nums).val(time1);
	}
}

//计算两个日期之间，每自然年的总天数
function getEveryYearTotalDays(beginDate, endDate) {
	var y = 0,//两个日期间相隔的年份
		everyYearBeginArr = [],//每年的开始
		everyYearEndArr = [],//每年的结束
		everyYearTotalDays = [],//每年的总天数
		date,
		begin = new Date(beginDate),
		end = new Date(endDate);
	if (begin >= end) {
		return everyYearTotalDays;
	}
	//计算年份
	do {
		date = new Date(beginDate);
		date.setFullYear(date.getFullYear() + (++y));
		date.setDate(date.getDate() - 1);
	} while (date < end);
//	console.log(beginDate + ' ~ ' + endDate + '之间相隔' + y + '年')
	//计算每年的开始
	for(var i=0;i<y;i++){
		var everyYearBegin = new Date(beginDate);
		everyYearBegin.setFullYear(everyYearBegin.getFullYear() + i);
		everyYearBeginArr.push(everyYearBegin);
	}
	//计算每年的结束
	for(var i=1;i<=y;i++){
		var everyYearEnd = new Date(beginDate);
		everyYearEnd.setFullYear(everyYearEnd.getFullYear() + i);
		everyYearEnd.setDate(everyYearEnd.getDate() - 1);
		if(i<y){
			everyYearEndArr.push(everyYearEnd);
		}else{//最后一年
			everyYearEndArr.push(end);
		}
	}
	//计算每年的总天数
	for(var i=0;i<y;i++){
//		console.log(everyYearBeginArr[i]+' ~ '+everyYearEndArr[i]);
		var thisYearDays = ((everyYearEndArr[i].getTime() - everyYearBeginArr[i].getTime()) / (1000 * 3600 * 24)) + 1;
		everyYearTotalDays.push(thisYearDays);
	}
	return everyYearTotalDays;
}

//添加未租时计算每年的免租期总天数
function getEveryYearHolidays(){
	var dayArr = [];
	var begin = new Date($('#addHsBegin').val());
	var end = new Date($('#addHsEnd').val());
	var date = new Date(begin);
	date.setDate(date.getDate() - 1);
	while(date < end){
		date.setFullYear(date.getFullYear() + 1);
	}
	var settingArrs = $('#priceLadder input');
	var holidayArrs = [];
	//settingArrs.length 是#priceLadder中所有input的个数
	for (var i = 0; i < settingArrs.length; i++) {
		if (settingArrs[i].id.indexOf('holidaySetting') > -1) {
			//获取id=holidaySettingA、B、C、D的input
			holidayArrs.push(settingArrs[i]);
		}
	}
	
	var number = holidayArrs.length/4;
	for (var i = 0; i < number; i++) {
		var holidayNums = parseInt(i) + 1;
		var sumBefor = $('#holidaySumBefor' + holidayNums).val();
		var sumAfter = $('#holidaySumAfter' + holidayNums).val();
		dayArr.push(Number(sumBefor)+Number(sumAfter));
	}
	return dayArr;
}

//部门用户联动（1）
function deptStaffChose(deptId, staffId, selectId) {
	var deptment = $('#' + deptId).val();
	if (deptment == '') {
		$('#' + staffId).empty();
		$('#' + staffId).append("<option></option>");
		if(deptId=='search_theStore' ){
			queryRepair(1, 0);
		}
		if(deptId=='followUserDept'){
			queryFollowInfo(1, 0);
		}
		if(deptId=='searchHsManagerUserDept'){
			queryTrusteeship(1, 0);
		}
		if(deptId=='searchHrManagerUserDept'){
			querySourceInfo(1, 0);
		}
		if(deptId=='addSaveHouseKeyDept'){
			$('#addSaveHouseTheStore').val('');
		}
		if(deptId=='search_theStore_intended'){
			queryIntended(1, 0);
		}
		return;
	}
	if(deptId=='followUserDept'){
		queryFollowInfo(1, 0);
	}
	$.post("../queryUserByDepartmentID.action", {
		suDepartmentId : deptment
	}, function(data) {
		if (data.code < 0) {
			return;
		}
		data = data.body;
		_deptStaff = [ {
			"deptment" : deptment,
			"staff" : data
		} ];
		theStoreStaff(deptId, staffId, selectId);
	});

}
// 部门用户联动（2）
function theStoreStaff(deptId, staffId, selectId) {
	var code = $("#" + deptId).val();
	var jsonData = _deptStaff[0].staff;
	var selC = $("#" + staffId);
	selC.empty();
	if (jsonData != null) {
		selC.append("<option></option>");
		for (var i = 0; i < jsonData.length; i++) {
			var item = jsonData[i];
			selC.append("<option value = '" + item.userId + "'>"
					+ item.suStaffName + "</option>");
		}
		if (staffId == 'addSaveHouseKeyStaff' && selectId == 0) {
			$.post("../queryStorefront.action", {
				storefrontId : item.suTheStore
			}, function(data) {
				if (data.code < 0) {
					$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
					return;
				}
				data = data.body;
				$('#addSaveHouseTheStore').val(data[0].storefrontName);
			}, "json");
		}
		if (selectId != 0) {
			selC.val(selectId);
		}
	} else {
		selC.empty();
	}
}
function doDateSum(time,year,month,day){
	var afterTime = new Date(time);
	var sMonth = parseInt(month)+parseInt(year)*12;
	var sDay = parseInt(day);
	afterTime.setDate(afterTime.getMonth()()+sMonth);
	afterTime.setDate(afterTime.getDate()+sDay);
	return formatDate(afterTime);
}

function getStore(staffId,storeId){
	var userId = $("#" + staffId).val();
	if(userId==null || userId ==''){
		$("#" + storeId).val('');
	}else{
		$.post("../queryUserByDepartmentID.action", {
			userId : userId
		}, function(data) {
			if (data.code < 0) {
//				$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
				return;
			}
			data = data.body;
			$("#" + storeId).val(data[0].suStoreId);
		});
	}
}

//带拼音搜索的下拉框
function filteroption(selectId) { //初始化列表，参数为列表id
	var tempul;
	tempul = $("#" + selectId).clone(true);
	tempul.children().each(function() {
		var htmword = $(this).html();
		var pyword = $(this).toPinyin();
		var supperword = "";
		pyword.replace(/[A-Z]/g, function(word) {
			supperword += word
		});
		$(this).attr("mka", (htmword).toLowerCase());
		$(this).attr("mkb", (pyword).toLowerCase());
		$(this).attr("mkc", (supperword).toLowerCase());
	});
	window[selectId] = tempul;
}

//筛选符合的列表项
function resetOption(inputId, selectId, divId) {
	var keys = $.trim($("#" + inputId).val());
	choseSelectHide(divId, 1)
	keys = keys.toLowerCase();
	$("#" + selectId).children().remove();
	var duplul = $(window[selectId]);
	if(keys.length <= 0) {
		duplul.children().each(function() {
			$("#" + selectId).append($(this).clone(true).removeAttr("mka").removeAttr("mkb").removeAttr("mkc"));
		});
		return;
	}
	duplul.children('[mka*="' + keys + '"],[mkb*="' + keys + '"],[mkc*="' + keys + '"]').each(function() {
		$("#" + selectId).append($(this).clone(true).removeAttr("mka").removeAttr("mkb").removeAttr("mkc"));
	});
}


function choseSelectVal(inputId, selectId, divId) {
	$('#' + divId).css({
		'z-index': '-1',
		'display': 'none'
	});
	$("#" + inputId).val($("#" + selectId).find("option:selected").text());

}
function choseSelectHide(divId, type){
	if(type == 1) {//显示
		$('#' + divId).css({
			'z-index': '9999',
			'display': 'block'
		});
	}
	if(type == 2) {//隐藏
		$('#' + divId).css({
			'z-index': '-1',
			'display': 'none'
		});
	}
}
//计费方案 计算水电气收费
function powerCalculate(step_arr,total_num){
	if(step_arr===''){
		return 0;
	}
	step_arr = eval("("+step_arr+")");
	var baseMoney = step_arr.baseMoney;//基础计费
	var ladder = step_arr.ladder;//阶梯方案
	var total_price = 0;//计费值
	//变量step_chosen就是一共需要爬梯的数量
	var step_chosen = undefined;
	//1、先求出，可以最多使用到哪一个阶梯
	for(var i = 0; i<ladder.length; i++){
		if(parseInt(total_num) < parseInt(ladder[i].step)){
			if(accSub(ladder[i].step,total_num)<1){
				step_chosen = i+1;
				break;
			}else{
				step_chosen = i;
				break;
			}
		}
	}//0-10   11-00
	if(step_chosen == undefined){
		//2、如果数量级超过最大阶梯的话
		step_chosen = ladder.length;
	}else{
		//3、如果数量级不超过最大阶梯的话，值不变
		
	}
	//变量step_chosen就是一共需要爬梯的数量	
	for(var i = 0; i < step_chosen; i++){
		if(step_chosen==1){//如果只有一阶，直接计算
			total_price += total_num * ladder[0].price;
		}else{
			if(i == (step_chosen-1)){
				
				total_price = accAdd(total_price,((total_num-ladder[i].step+1) * ladder[i].price));
			}else{
				if(ladder[i].step==0){
					total_price = accAdd(total_price,((ladder[i+1].step-ladder[i].step-1) * ladder[i].price));
				}else{
					total_price = accAdd(total_price,((ladder[i+1].step-ladder[i].step) * ladder[i].price));
				}
			}
		}
	}
	return accAdd(baseMoney,total_price);
}
//输入框或下拉框是否可以修改
function ifDisabled(target,type){
	if(type==0){
		if($("." + target).prop("disabled")){
			$("." + target).removeAttr('disabled','disabled');
		}else{
			$("." + target).attr('disabled','disabled');
		}
	}else if(type==1){
		if($("#" + target).prop("disabled")){
			$("#" + target).removeAttr('disabled','disabled');
		}else{
			$("#" + target).attr('disabled','disabled');
		}
	}
}
//loading转圈圈
function addLoading(){
	$('body').append('<div id="form-submit-overlay"></div>');
	$('#form-submit-overlay').append('<div id="form-submit-loading"></div>');
	$("#form-submit-loading").css("display",'block');
}
function showLoading(){
	$('#form-submit-overlay').show();
	$('#form-submit-loading').show();
}
function hideLoading(){
	$('#form-submit-overlay').hide();
	$('#form-submit-loading').hide();
}
$(function() {
	addLoading();
	hideLoading();
});
//自写datagrid 删除行方法
function myDeleteRows(value,field,tableId,showNumber){
	//value：field的值
	//field：列的唯一id 一般是主键  可以用其他唯一字段代替
	//tableId：datagr的ID
	//showNumber：某些需要显示datagrid当前行数的显示DIV的id,不需要显示的可以传0
	var rows = $('#'+tableId).datagrid('getRows');
	var index =0;
	for(var i =0;i< rows.length;i++){
		for(var j in rows[i]){
			if(j==field){
				if(rows[i][j]==value){
					index = i;
				}
			}
		}
	}
	$('#'+tableId).datagrid('deleteRow',index);
	if(showNumber!=0){
		$('#'+showNumber).html(rows.length);
	}
}
/********* 收支分类查询menu菜单 **********/
//初始化生成分类查询menu菜单
function showFinancilTypeSearch(t,f){
	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
	for(var i in _newFinancial) {
		if(_newFinancial[i].nature!="代支出"){
			str += "<div onclick=\"putInputValue(0,'"+t+"','"+_newFinancial[i].nature+"--','"+f+"')\">";
			str += "<span>" + _newFinancial[i].nature + "</span>";
			str += "<div style='width:150px;'>";
			for(var j in _newFinancial[i].types) {
				str += "<div  onclick=\"putInputValue(0,'"+t+"','"+_newFinancial[i].nature+"-"+_newFinancial[i].types[j].bigType+"-','"+f+"')\">";
				str += "<span>" + _newFinancial[i].types[j].bigType + "</span>";
				str += "<div style='width:120px;'>";
				for(var k in _newFinancial[i].types[j].type) {
					str += "<div  onclick=\"putInputValue(0,'"+t+"','"+_newFinancial[i].nature+"-"+_newFinancial[i].types[j].bigType+"-"+_newFinancial[i].types[j].type[k]+"','"+f+"')\">" + _newFinancial[i].types[j].type[k] + "</div>";
				}
				str += "</div></div>";
			}
			if(f!=''){
				if(i == (_newFinancial.length - 2)) {
					str += "</div></div><div  onclick=\"putInputValue(0,'"+t+"','','"+f+"')\">全部</div>";
				} else {
					str += "</div></div>";
				}
			}else{
				str += "</div></div>";
			}
		}
	}
	str += "</div>";
	$("#"+t+"Div").append(str);
	$("#"+t+"Menu").menu({
		onClick: function(item) {
			
		},
		hideOnUnhover: false,
	});

	$("#"+t+"Button").click(function(e) {
		$("#"+t+"Menu").menu('show', {
			left: e.pageX-30,
			top: e.pageY
		});
	});
}
//初始化生成分类查询menu菜单
function showAddFinancilTypeSearch(t,f){
	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
	for(var i in _newFinancial) {
		if(_newFinancial[i].nature!="代支出"){
			str += "<div onclick=\"putInputValue(0,'"+t+"','"+_newFinancial[i].nature+"--','"+f+"')\">";
			str += "<span>" + _newFinancial[i].nature + "</span>";
			str += "<div style='width:150px;'>";
			for(var j in _newFinancial[i].types) {
				if(_newFinancial[i].types[j].bigType!="欠结类"){
					str += "<div  onclick=\"putInputValue(0,'"+t+"','"+_newFinancial[i].nature+"-"+_newFinancial[i].types[j].bigType+"-','"+f+"')\">";
					str += "<span>" + _newFinancial[i].types[j].bigType + "</span>";
					str += "<div style='width:120px;'>";
					for(var k in _newFinancial[i].types[j].type) {
						str += "<div  onclick=\"putInputValue(0,'"+t+"','"+_newFinancial[i].nature+"-"+_newFinancial[i].types[j].bigType+"-"+_newFinancial[i].types[j].type[k]+"','"+f+"')\">" + _newFinancial[i].types[j].type[k] + "</div>";
					}
					str += "</div></div>";
				}
			}
			if(f!=''){
				if(i == (_newFinancial.length - 2)) {
					str += "</div></div><div  onclick=\"putInputValue(0,'"+t+"','---','"+f+"')\">全部</div>";
				} else {
					str += "</div></div>";
				}
			}else{
				str += "</div></div>";
			}
		}
	}
	str += "</div>";
	$("#"+t+"Div").append(str);
	$("#"+t+"Menu").menu({
		onClick: function(item) {
			
		},
		hideOnUnhover: false,
	});

	$("#"+t+"Button").click(function(e) {
		$("#"+t+"Menu").menu('show', {
			left: e.pageX-30,
			top: e.pageY
		});
	});
}
//点击menu给搜索框赋值然后进行查询
function putInputValue(t,i,v,f){
	if(t==0){//财务
		$("#"+i+"JfNatureOfThe").val(v.split("-")[0]);
		$("#"+i+"JfBigType").val(v.split("-")[1]);
		if(v.split('-').length == 4){
			$("#"+i+"JfAccountingSpecies").val(v.split("-")[2]+'-'+v.split("-")[3]);
		}else{
			$("#"+i+"JfAccountingSpecies").val(v.split("-")[2]);
		}
	}
	if(t==1){
		if(i == 'updateRhr' || i == 'AdminUser' || i == 'updateThs'){//只显示人名不显示门店部门
			$("#"+i+"ShowUserInfo").val(v.split("-")[2]);
		}else if(i=='doRepair'){//允许只选门店或部门
			$("#"+i+"ShowUserInfo").val(v.split("-")[0]+" "+v.split("-")[1]+" "+v.split("-")[2]);
		}else{//必需选择人员不能直选门店和部门
			$("#"+i+"ShowUserInfo").val(v.split("-")[0]+" "+v.split("-")[1]+" "+v.split("-")[2]);
			if(v.split("-")[1]=='' && v.split("-")[2]==''){
				$("#"+i+"ShowUserInfo").val('');
			}
		}
		$("#"+i+"GetUserStoreId").val(v.split("-")[3]);
		$("#"+i+"GetUserDetId").val(v.split("-")[4]);
		$("#"+i+"GetUserId").val(v.split("-")[5]);
	}
	if(t==2){//品牌
		$("#"+i+"ShowBrandInfo").val(v.split("-")[0]+" "+v.split("-")[1]+" "+v.split("-")[2]);
		$("#"+i+"GetBrandName").val(v.split("-")[0]);
		$("#"+i+"GetBrandType").val(v.split("-")[1]);
		$("#"+i+"GetBrandId").val(v.split("-")[3]);
	}
	if (t==3){//设备菜单
		$("#"+i+"ShowDeviceInfo").val(v.split("-")[0]+" "+v.split("-")[1]);
		$("#"+i+"GetDeviceName").val(v.split("-")[0]);
		$("#"+i+"GetDeviceOneId").val(v.split("-")[3]);
		$("#"+i+"GetDeviceType").val(v.split("-")[1]);
		$("#"+i+"GetDeviceTwoId").val(v.split("-")[2]);
	}
	if (t==4){//设备一二级类型菜单
		console.log(v)
		$("#"+i+"ShowDeviceType").val(v.split("-")[0]+" "+v.split("-")[1]);
		$("#"+i+"GetDeviceName").val(v.split("-")[0]);
		$("#"+i+"GetDeviceOneId").val(v.split("-")[3]);
		$("#"+i+"GetDeviceType").val(v.split("-")[1]);
		$("#"+i+"GetDeviceTwoId").val(v.split("-")[2]);
	}
	if(f!=''){
		eval(f);
	}
}
//初始化生成 代支出  分类查询menu菜单
function showReFinancilTypeSearch(t,f){
	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
	for(var i in _newFinancial) {
		if(_newFinancial[i].nature=="代支出"){
			str += "<div onclick=\"putInputValue(0,'financilAdd','"+_newFinancial[i].nature+"--','"+f+"')\">";
			str += "<span>" + _newFinancial[i].nature + "</span>";
			str += "<div style='width:150px;'>";
			for(var j in _newFinancial[i].types) {
				str += "<div  onclick=\"putInputValue(0,'financilAdd','"+_newFinancial[i].nature+"-"+_newFinancial[i].types[j].bigType+"-','"+f+"')\">";
				str += "<span>" + _newFinancial[i].types[j].bigType + "</span>";
				str += "<div style='width:120px;'>";
				for(var k in _newFinancial[i].types[j].type) {
					str += "<div  onclick=\"putInputValue(0,'financilAdd','"+_newFinancial[i].nature+"-"+_newFinancial[i].types[j].bigType+"-"+_newFinancial[i].types[j].type[k]+"','"+f+"')\">" + _newFinancial[i].types[j].type[k] + "</div>";
				}
				str += "</div></div>";
			}
			if(f!=''){
				if(i == (_newFinancial.length - 2)) {
					str += "</div></div><div  onclick=\"putInputValue(0,'financilAdd','---','"+f+"')\">全部</div>";
				} else {
					str += "</div></div>";
				}
			}else{
				str += "</div></div>";
			}
		}
	}
	str += "</div>";
	$("#"+t+"Div").append(str);
	$("#"+t+"Menu").menu({
		onClick: function(item) {
			
		},
		hideOnUnhover: false,
	});

	$("#"+t+"Button").click(function(e) {
		$("#"+t+"Menu").menu('show', {
			left: e.pageX-30,
			top: e.pageY
		});
	});
}
//初始化生成 欠结补结  分类查询menu菜单
function showOweFinancilTypeSearch(t,f){
	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
	for(var i in _newFinancial) {
		if(_newFinancial[i].nature=="收入" || _newFinancial[i].nature=="支出"){
			str += "<div onclick=\"putInputValue(0,'financilAdd','"+_newFinancial[i].nature+"--','"+f+"')\">";
			str += "<span>" + _newFinancial[i].nature + "</span>";
			str += "<div style='width:150px;'>";
			for(var j in _newFinancial[i].types) {
				if(_newFinancial[i].types[j].bigType=="欠结类"){
					str += "<div  onclick=\"putInputValue(0,'financilAdd','"+_newFinancial[i].nature+"-"+_newFinancial[i].types[j].bigType+"-','"+f+"')\">";
					str += "<span>" + _newFinancial[i].types[j].bigType + "</span>";
					str += "<div style='width:120px;'>";
					for(var k in _newFinancial[i].types[j].type) {
						str += "<div  onclick=\"putInputValue(0,'financilAdd','"+_newFinancial[i].nature+"-"+_newFinancial[i].types[j].bigType+"-"+_newFinancial[i].types[j].type[k]+"','"+f+"')\">" + _newFinancial[i].types[j].type[k] + "</div>";
					}
					str += "</div></div>";
				}
			}
			if(f!=''){
				if(i == (_newFinancial.length - 2)) {
					str += "</div></div><div  onclick=\"putInputValue(0,'financilAdd','---','"+f+"')\">全部</div>";
				} else {
					str += "</div></div>";
				}
			}else{
				str += "</div></div>";
			}
		}
	}
	str += "</div>";
	$("#"+t+"Div").append(str);
	$("#"+t+"Menu").menu({
		onClick: function(item) {
			
		},
		hideOnUnhover: false,
	});

	$("#"+t+"Button").click(function(e) {
		$("#"+t+"Menu").menu('show', {
			left: e.pageX-30,
			top: e.pageY
		});
	});
}
function queryDept(){
	$.post("../queryDepartment.action", {
		departmentStorefrontId : _loginStore,
	}, function(data) {
		data=data.body;
		for (var i in data) {
			$(".select-dept").append("<option value = '" + data[i].departmentId + "'>" + data[i].departmentName + "</option>");
			_depadepartment[i] = data[i].departmentId;
		}
	});
}
//执行跳转操作
function doSkipToChild(){
	if(_skipToChildJson.length>0){
		for(var i in _skipToChildJson){
			if(_skipToChildJson[i].target==""){
				//跳转无操作
			}else if(_skipToChildJson[i].target=="s"){
				//跳转并选中select对应的value值
				$("#"+_skipToChildJson[i].id).val(_skipToChildJson[i].jsonVal);
			}else if(_skipToChildJson[i].target=="i"){
				//跳转并赋值给input
				$("#"+_skipToChildJson[i].id).val(_skipToChildJson[i].jsonVal);
			}else if(_skipToChildJson[i].target=="e"){
				//跳转并清除元素
				$("#"+_skipToChildJson[i].id).empty();
			}else if(_skipToChildJson[i].target=="v1"){
				//跳转事务并筛选本人发起的事务
				_handlerIf = 1;
				_publisher = 1;
			}else if(_skipToChildJson[i].target=="v2"){
				//跳转事务并筛选本人接受的事务
				_handlerIf = 0;
				_publisher = 0;
			}else if(_skipToChildJson[i].target=="addDay"){
				//跳转并赋值日期
				var inputDay = new Date();
				inputDay.setDate(inputDay.getDate()+parseInt(_skipToChildJson[i].jsonVal));
				inputDay =  formatDate(inputDay);
				$("#"+_skipToChildJson[i].id).val(inputDay);
			}else if(_skipToChildJson[i].target=="subDay"){
				//跳转并赋值日期
				var inputDay = new Date();
				inputDay.setDate(inputDay.getDate()-parseInt(_skipToChildJson[i].jsonVal));
				inputDay =  formatDate(inputDay);
				$("#"+_skipToChildJson[i].id).val(inputDay);
			}else if(_skipToChildJson[i].target=="f"){
				
			}
		}
		parent._skipToChildJson=[];
		_skipToChildJson=[];
	}
	//跳转并调用方法
	if(_skipFunction.length>0){
		for(var i in _skipFunction){
			eval(_skipFunction[i]);
		}
		parent._skipFunction=[];
		_skipFunction=[];
	}
}
//获取指定名称的cookie的值
function getCookie(cookieName){
	var cookieArray = document.cookie.split("; ");
	for(var i = 0;i < cookieArray.length;i ++){
		var getCookie = cookieArray[i].split("=");
		if(getCookie[0] == cookieName) {
			return getCookie[1];
		}
	}
}

//日期时间格式化
Date.prototype.format = function (format) {
	var o = {
		"M+" : this.getMonth() + 1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

/**
 * js中更改日期 
 * y年， M月， d日， h小时， m分钟，s秒 
 */
Date.prototype.add = function (part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case "y":
            this.setFullYear(this.getFullYear() + value);
            break;
        case "M":
            this.setMonth(this.getMonth() + value);
            break;
        case "d":
            this.setDate(this.getDate() + value);
            break;
        case "h":
            this.setHours(this.getHours() + value);
            break;
        case "m":
            this.setMinutes(this.getMinutes() + value);
            break;
        case "s":
            this.setSeconds(this.getSeconds() + value);
            break;
        default:
 
    }
}

//判断浏览器兼容-获取文本 代替 innerText
function getInnerText(element) {
    return (typeof element.textContent == "string") ? element.textContent : element.innerText;
}
//判断浏览器兼容-写入文本 代替 innerText
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}
// 计算任务耗时
function taskCostTime(t1,t2){
	var costTime = '';
	t2 = t2=="" ? getNowFormatDate() : t2;
	
	t1 = new Date(t1);
	t2 = new Date(t2);
	t1 = t1.getTime();
	t2 = t2.getTime();
	var subTime = parseInt((t2-t1)/1000/60);
	if(subTime<60){
		costTime = subTime+"分";
		return costTime;
	}
	
	if((subTime/60)>=1 && (subTime/60/24)<1){
		if(subTime%60>0){
			costTime = (subTime/60).toString().split(".")[0]+"小时"+(subTime%60)+"分";	
		}else{
			costTime = (subTime/60)+"小时";	
		}
		return costTime;
	}
	if((subTime/60/24)>=1){
		if(parseInt(subTime/60)%24>=1){
			costTime = (subTime/(60*24)).toString().split(".")[0]+"天"+(parseInt(subTime/60)%24)+"小时";	
		}else{
			costTime = parseInt(subTime/(60*24))+"天";	
		}
		return costTime;
	}
}
//各类详细页面
function readonlyDataToDb(d,t){
	var row = $('#'+t).datagrid('getSelected');
	for(var i in row){
		if(row[i]==null){
			row[i]='';
		}
		$('#'+t+i).html(row[i]);
		if((d=="readonlyPaymentInfoTable" && i=="jfAccountId")
			||( d=="readonlyPayableInfoTable" && i=="ptlAccountId")){
			
			if(!(row[i]==null||row[i]=='')){
				$.post("../selectNamePublic.action", {
					faId:row[i]
				}, function(data) {
					for(var j in data.body[0]){
						if(data.body[0][j]==null){
							data.body[0][j]='';
						}
						$('#'+t+j).html(data.body[0][j]);
					}
				});
			}
		}
		if(i=="eaTreatmentOpinion" && row[i]!=null && row[i]!=""){
			var eaTreatmentOpinionJson = eval('(' + '[' +  row[i].getRealJsonStr().replace(/\n/g, "&nbsp;&nbsp;&nbsp;&nbsp;") + ']' + ')');
			if(eaTreatmentOpinionJson.length == 1){
				$('#'+d+"Body").append(	'<tr class="eaTreatmentOpinionInfo">'
									+		'<td colspan="2"><span>'+eaTreatmentOpinionJson[0].time+'</span></td>'
									+		'<td><span>'+eaTreatmentOpinionJson[0].name+'</span></td>'
									+		'<td colspan="3"><span>'+eaTreatmentOpinionJson[0].advise+'</span></td>'
									+'</tr>'
				);
			}else{
				for(var i=eaTreatmentOpinionJson.length-1;i>=0;i--){
					$('#'+d+"Body").append(	'<tr class="eaTreatmentOpinionInfo">'
							+		'<td colspan="2"><span>'+eaTreatmentOpinionJson[i].time+'</span></td>'
							+		'<td><span>'+eaTreatmentOpinionJson[i].name+'</span></td>'
							+		'<td colspan="3"><span>'+eaTreatmentOpinionJson[i].advise+'</span></td>'
							+'</tr>'
					);
				}
			}
		}
	}
	$('#'+d).dialog();
	$('#'+d).window('center');
	$('#'+d).dialog('open');
}

var dgShowOrHideArray = [];
//打开显示隐藏列对话框
function dgShowOrHideDlg(){
	var colBox =  $("#dgShowOrHideDlg input[type='checkbox']");
	
	for(var i in colBox){
		var getField = colBox[i].value;
		if(getField!="allColumns"){
			for(var j in dgShowOrHideArray){
				if(dgShowOrHideArray[j].field == getField){
					if(dgShowOrHideArray[j].state=="show"){
						$("#dgShowOrHide"+getField).prop('checked', true);
					}else{
						$("#dgShowOrHide"+getField).prop('checked', false);
					}
				}
			}
		}
	}
	$('#dgShowOrHideDlg').dialog('open');
}
//显示隐藏列全选按钮
function dgShowOrHideSelectAll(){
	if ($("#allColumns").prop('checked')) {
		$("#dgShowOrHideDlg input[type='checkbox']").prop("checked", true);
		$("#allColumns").prop("checked", true);
	} else {
		$("#dgShowOrHideDlg input[type='checkbox']").prop("checked", false);
		$("#allColumns").prop("checked", false);
	}
}
//初始化显示隐藏列数组
function dgShowOrHideInit(dgId){
	var allFields = $('#'+dgId).datagrid('getColumnFields');
	for(var i in allFields){
		var getCol = $('#'+dgId).datagrid( "getColumnOption" , allFields[i] );
		if(getCol.sortable==true){
			dgShowOrHideArray.push({field:allFields[i],state:"hide"});
		}else{
			dgShowOrHideArray.push({field:allFields[i],state:"show"});
		}
	}
	achieveDgShowOrHide(dgId);
}
//执行显示隐藏列
function doDgShowOrHide(dgId){
	var colBox =  $("#dgShowOrHideDlg	 input[type='checkbox']");
	for(var i in colBox){
		var getField = colBox[i].value;
		if(getField!="allColumns"){//排除全选的checkbox
			console.log(dgShowOrHideArray)
			for(var j in dgShowOrHideArray){
				console.log('s')
				if(dgShowOrHideArray[j].field == getField){
					if(colBox[i].checked){
						dgShowOrHideArray[j].state="show";
					}else{
						dgShowOrHideArray[j].state="hide";
					}
				}
			}
		}
	}
	achieveDgShowOrHide(dgId);
	$('#dgShowOrHideDlg').dialog('close');
}
//实现显示隐藏列
function achieveDgShowOrHide(dgId){
	for(var i in dgShowOrHideArray){
		if(dgShowOrHideArray[i].state=='show'){
			$('#'+dgId).datagrid('showColumn', dgShowOrHideArray[i].field);
		}
		if(dgShowOrHideArray[i].state=='hide'){
			$('#'+dgId).datagrid('hideColumn', dgShowOrHideArray[i].field);
		}
	}
}

//弹出排序方式窗口
function showTheSortDlg(){
	$("#theSortDlg").show();
}
//根据欠结金额的正负去修改显示字样
function changeBaseShowFont(i,v,t){
	if(t==0){
		var showMoney = $('#'+v).val();
		if(showMoney>0){
			$('#'+i).html("欠结金额：");
			$('#'+v).val(showMoney);
		}else{
			showMoney = accSub(0,showMoney);
			$('#'+i).html("预存金额：");
			$('#'+v).val(showMoney);
		}
	}
	if(t==1){
		var showMoney = $('#'+v).val();
		if(showMoney>0){
			$('#'+i).html("欠结款："+'<input style="width:100px;color:red;" disabled="disabled" id="infoReadhrBase">');
			$('#'+v).val(showMoney);
		}else{
			showMoney = accSub(0,showMoney);
			$('#'+i).html("预存款："+'<input style="width:100px;color:red;" disabled="disabled" id="infoReadhrBase">');
			$('#'+v).val(showMoney);
		}
	}
	if(t==2){
		var showMoney = $('#'+v).val();
		if(showMoney>0){
			$('#'+i).html("欠结金额：");
			$('#'+v).val(showMoney);
		}else{
			showMoney = accSub(0,showMoney);
			$('#'+i).html("预存金额：");
			$('#'+v).val(showMoney);
		}
	}
	if(t==3){
		var showMoney = $('#'+v).val();
		if(showMoney>0){
			$('#'+i).html("业主欠结款："+'<input style="width:100px;color:red;" disabled="disabled" id="readhsBase">');
			$('#'+v).val(showMoney);
		}else{
			showMoney = accSub(0,showMoney);
			$('#'+i).html("业主预存款："+'<input style="width:100px;color:red;" disabled="disabled" id="readhsBase">');
			$('#'+v).val(showMoney);
		}
	}
}
/** **** 分页插件-不统计总数量 ***** */
/**
 * page		当前页码
 * type		分页类型 type=0：未查询到符合条件的记录
 * function 查询函数
 * id		标识，用于区分是哪个表的分页
 * 
 * 调用示例参考device.js
 */
function notCountPage(p,t,fn,d){
	// console.log(p+"**"+t)
	p=parseInt(p);
	var obj = $("#"+d+"PageDiv");
	obj.css("text-align","center");
	obj.empty();
	var addStr = "";
	addStr += '<div class="tcdPageCode" style="text-align:center">';
	if(t==0){//未查询到符合条件的记录
		if(p==0 || p==1){//page=0 type=0 第一页未查询到符合条件的记录
			addStr += '<span class="disabled">上一页</span>';
			addStr += '<span class="disabled">下一页</span>';
		}else{//page!=0 type=0 第n页未查询到符合条件的记录（n>1）
			addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p-1)+')\')">上一页</a>';
			addStr += '<a href="javascript:;" onclick="eval(\''+fn+'(1)\')">1</a>';
			if(p>3){
				addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p-2)+')\')">'+(p-2)+'</a>';
			}
			if(p>2){
				addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p-1)+')\')">'+(p-1)+'</a>';
			}
			addStr += '<span class="current">'+p+'</span>';
			addStr += '<span class="disabled">下一页</span>';
		}
	}else if(t==1){//数据刚好一页，说明下一页可能还有数据
		if(p==0 || p==1){
			addStr += '<span class="disabled">上一页</span>';
		}else{
			addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p-1)+')\')">上一页</a>';
		}
		if(p==1){
			addStr += '<span class="current">1</span>';
			addStr += '<a href="javascript:;" onclick="eval(\''+fn+'(2)\')">2</a>';
			// addStr += '<a href="javascript:;" onclick="eval(\''+fn+'(3)\')">3</a>';
			// addStr += '<a href="javascript:;" onclick="eval(\''+fn+'(4)\')">4</a>';
			addStr += '<span>...</span>';
		}else{
			addStr += '<a href="javascript:;" onclick="eval(\''+fn+'(1)\')">1</a>';
			if(p>3){
				addStr += '<span>...</span>';
			}
			if(p>2){
				addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p-1)+')\')">'+(p-1)+'</a>';
				addStr += '<span class="current">'+p+'</span>';
				addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p+1)+')\')">'+(p+1)+'</a>';
			}else{//p==2
				addStr += '<span class="current">2</span>';
				addStr += '<a href="javascript:;" onclick="eval(\''+fn+'(3)\')">3</a>';
				// addStr += '<a href="javascript:;" onclick="eval(\''+fn+'(4)\')">4</a>';
			}
			addStr += '<span>...</span>';
		}
		if(p==0){
			addStr += '<span class="disabled">下一页</span>';
		}else{
			addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p+1)+')\')">下一页</a>';
		}
	}else if(t==2){//数据不足一页，说明是最后一页
		if(p==0 || p==1){
			addStr += '<span class="disabled">上一页</span>';
		}else{
			addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p-1)+')\')">上一页</a>';
		}
		if(p==1){
			addStr += '<span class="current">1</span>';
		}else{
			addStr += '<a href="javascript:;" onclick="eval(\''+fn+'(1)\')">1</a>';
			addStr += '<span>...</span>';
			if(p>3){
				addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p-2)+')\')">'+(p-2)+'</a>';
			}
			if(p>2){
				addStr += '<a href="javascript:;" onclick="eval(\''+fn+'('+(p-1)+')\')">'+(p-1)+'</a>';
			}
			addStr += '<span class="current">'+p+'</span>';
		}
		addStr += '<span class="disabled">下一页</span>';
	}
	addStr += '<font style="font-size:12px;" color="#50B4D2" id="'+d+'PageCount"></font>';
	addStr += '<a href="javascript:;" style="height:18px;font-size:14px;padding-top:1px" ';
	addStr += 'id="get'+d+'PageCount" onclick="eval(\'get'+d+'PageCount('+p+')\')">统计数据</a>';
	addStr += '</div>';
	obj.append(addStr);
}
/** **** 分页插件-统计总数量 ***** */
/**
 * t:已废除 原来t=0 0条数据 t=1 n条数据
 */
function getCountData(t,j,o,p,d,e){//t：类型;j：参数，包括总条数和其他自定义参数;o:单页总条数;p:当前页码;d:ID标识;e:额外统计标识;
	p=parseInt(p);
	if (p == 0) {
		p = 1;
	}
	$("#get"+d+"PageCount").hide();
	var pageNums = Math.ceil(j.totalNum/ o);//总页数
	var thisPageNums = o;//当前页条数
	var showStr = "";
	if(p>=pageNums){
		thisPageNums =  j.totalNum - o * (p-1);
	}
	if(thisPageNums<0){
		thisPageNums=0;
	}
	showStr = "共 "+ pageNums +" 页  "+j.totalNum+" 条数据 当前页  "+ thisPageNums +" 条数据";
	if(e==1){//财务额外统计
		showStr+=' 合计收支金额差：'+j.totalMoney+'元';
	}
	$("#"+d+"PageCount").html(showStr);
}
//去掉JSON字符串头尾的双引号
String.prototype.getRealJsonStr = function(){
	return this.substring(1,this.length-1);
}
//初始化生成选择人员menu菜单
function showAllUser(t,f){
	$("#"+t+"Menu").menu('destroy');
	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
	for(var i in _allUserInfo) {
		str += "<div onclick=\"putInputValue(1,'"+t+"'," 
						+"'"+_allUserInfo[i].storeName+"-"
						+"-"
						+"-"
						+_allUserInfo[i].storeId+"-"
						+"-"
						+"'" 
						+",'"+f+"')\">";
		str += "<span>" + _allUserInfo[i].storeName + "</span>";
		str += "<div style='width:150px;'>";
		for(var j in _allUserInfo[i].storeDep){
			str += "<div  onclick=\"putInputValue(1,'"+t+"'," 
						+"'"+_allUserInfo[i].storeName+"-"
						+_allUserInfo[i].storeDep[j].depName+"-"
						+"-"
						+_allUserInfo[i].storeId+"-"
						+_allUserInfo[i].storeDep[j].depId+"-"
						+"'" 
						+",'"+f+"')\">";
			str += "<span>" + _allUserInfo[i].storeDep[j].depName + "</span>";
			str += "<div style='width:120px;'>";
			for(var k in _allUserInfo[i].storeDep[j].depUser) {
				str += "<div  onclick=\"putInputValue(1,'"+t+"'," 
						+"'"+_allUserInfo[i].storeName+"-"
						+_allUserInfo[i].storeDep[j].depName+"-"
						+_allUserInfo[i].storeDep[j].depUser[k].userName+"-"
						+_allUserInfo[i].storeId+"-"
						+_allUserInfo[i].storeDep[j].depId+"-"
						+_allUserInfo[i].storeDep[j].depUser[k].userId+"'" 
						+",'"+f+"')\"'>" 
						+ _allUserInfo[i].storeDep[j].depUser[k].userName + "</div>";
			}
			str += "</div></div>";
		}
		if(i == (_allUserInfo.length - 1)) {
			str += "</div></div><div onclick=\"putInputValue(1,'"+t+"','------','"+f+"')\">清空</div>";
		} else {
			str += "</div></div>";
		}
	}
	str += "</div>";
	$("#"+t+"ShowUserInfoDiv").empty();
	$("#"+t+"ShowUserInfoDiv").append(str);
	$.parser.parse($("#"+t+"ShowUserInfoDiv"));
	$("#"+t+"Menu").menu({
		onClick: function(item) {
			
		},
		hideOnUnhover: false,
	});

	$("#"+t+"ShowUserInfo").click(function(e) {//原来是ChooseUserButton
		$("#"+t+"Menu").menu('show', {
			left: e.pageX-30,
			top: e.pageY
		});
	});
}
$(function() {
	//为所有选择人员按钮绑定事件
	$(".choose_user_button").each(function(){
		showAllUser($(this).attr("doFlag"),$(this).attr("doFun"));
	});
	//为所有选择品牌按钮绑定事件
	$(".choose_brand_button").each(function(){
		showAllBrand($(this).attr("doFlag"),$(this).attr("doFun"));
	});
	//未所有设备按钮绑定事件
	$(".choose_device_button").each(function(){
		showAllDevice($(this).attr("doFlag"),$(this).attr("doFun"));
	});
	//所有设备一二级类型
	$(".choose_device_type_button").each(function(){
		showAllDevType($(this).attr("doFlag"),$(this).attr("doFun"));
	});
});
//比对数组中是否有存在的值
function checkIfInArray(str,array){
	var ifInFlag = 0;
	for(var i in array){
		if(str==array[i]){
			ifInFlag++;
		}
	}
	if(ifInFlag==0){
		return true;
	}else{
		return false;
	}
}

//将从SESSION中获取的设备菜单转为可应用格式
function getDeviceMenu() {
	var devcieBefore = eval(_loginDeviceMenu);
	for (var i in devcieBefore) {
		if (i == 0) {
			_deviceMenuJson.push({
				flmdDeviceDescription: devcieBefore[i].flmdDeviceDescription,
				flmdId: devcieBefore[i].flmdId,
				smdDeviceDescription: [{
					smdDeviceDescription: devcieBefore[i].smdDeviceDescription,
					smdId: devcieBefore[i].smdId,
				}],
			});
		} else {
			var typeFlag = -1;
			for (var j in _deviceMenuJson) {
				if (_deviceMenuJson[j].flmdDeviceDescription == devcieBefore[i].flmdDeviceDescription) {
					typeFlag = j;
					break;
				}
			}
			if (typeFlag != -1) {
				_deviceMenuJson[typeFlag].smdDeviceDescription.push({
					smdDeviceDescription: devcieBefore[i].smdDeviceDescription,
					smdId: devcieBefore[i].smdId,
				});
			}
			else{
				_deviceMenuJson.push({
					flmdDeviceDescription: devcieBefore[i].flmdDeviceDescription,
					flmdId: devcieBefore[i].flmdId,
					smdDeviceDescription: [{
						smdDeviceDescription: devcieBefore[i].smdDeviceDescription,
						smdId: devcieBefore[i].smdId,
					}],
				});
			}
		}
	}
}

//将从SESSION中获取的设备菜单转为可应用格式
function getDevTypeMenu() {
	var devcieBefore = eval(_loginDevTypeMenu);
	for (var i in devcieBefore) {
		if (i == 0) {
			_devTypeMenuJson.push({
				dftName: devcieBefore[i].dftName,
				dftId: devcieBefore[i].dftId,
				dstName: [{
					dstName: devcieBefore[i].dstName,
					dstId: devcieBefore[i].dstId,
				}],
			});
		} else {
			var typeFlag = -1;
			for (var j in _devTypeMenuJson) {
				if (_devTypeMenuJson[j].dftName == devcieBefore[i].dftName) {
					typeFlag = j;
					break;
				}
			}
			if (typeFlag != -1) {
				_devTypeMenuJson[typeFlag].dstName.push({
					dstName: devcieBefore[i].dstName,
					dstId: devcieBefore[i].dstId,
				});
			}
			else{
				_devTypeMenuJson.push({
					dftName: devcieBefore[i].dftName,
					dftId: devcieBefore[i].dftId,
					dstName: [{
						dstName: devcieBefore[i].dstName,
						dstId: devcieBefore[i].dstId,
					}],
				});
			}
		}
	}
}

//将从SESSION中获取的品牌转为可应用格式
function getBrandToUse(){
	var brandBefore = eval(_loginBrand);
	_brandSelect = brandBefore;
	var brandOne = [];
	var brandTwo = [];
	var brandThree = [];
	for(var i in brandBefore){
		if(i==0){
			_brandJson.push({
				brandName:brandBefore[i].brandName,
				brandType:[{
					brandType:brandBefore[i].brandType,
					brandModel:[{
						brandModel:brandBefore[i].brandModel,
						brandId:brandBefore[i].brandId,
					}],
				}],
			});
		}else{
			var nameFlag = -1;
			var typeFlag = -1;
			for(var j in _brandJson){
				if(_brandJson[j].brandName==brandBefore[i].brandName){
					nameFlag=j;
					break;
				}
			}
			if(nameFlag!=-1){
				for(var j in _brandJson[nameFlag].brandType){
					if(_brandJson[nameFlag].brandType[j].brandType==brandBefore[i].brandType){
						typeFlag=j;
						break;
					}
				}
				if(typeFlag!=-1){
					_brandJson[nameFlag].brandType[typeFlag].brandModel.push({
							brandModel:brandBefore[i].brandModel,
							brandId:brandBefore[i].brandId,
					});
				}else{
					_brandJson[nameFlag].brandType.push({
						brandType:brandBefore[i].brandType,
						brandModel:[{
							brandModel:brandBefore[i].brandModel,
							brandId:brandBefore[i].brandId,
						}],
					});
				}
			}else{
				_brandJson.push({
					brandName:brandBefore[i].brandName,
					brandType:[{
						brandType:brandBefore[i].brandType,
						brandModel:[{
							brandModel:brandBefore[i].brandModel,
							brandId:brandBefore[i].brandId,
						}],
					}],
				});
			}
		}
	}
}

//初始化生成选择设备menu菜单
function showAllDevice(t,f){
	console.log(_deviceMenuJson);
	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
	for(var i in _deviceMenuJson) {
		// str += "<div>";
		// str += "<span>" + _deviceMenuJson[i].idftName + "</span>";
		str += "<div onclick=\"putInputValue(3,'"+t+"',"
			+"'"+_deviceMenuJson[i].idftName+"-"
			+"-"
			+"-"
			+_deviceMenuJson[i].idftId+"-"
			+"-"
			+"'"
			+",'"+f+"')\">";
		str += "<span>" + _deviceMenuJson[i].idftName + "</span>";
		str += "<div style='width:150px;'>";
	 	for(var j in _deviceMenuJson[i].idstName){
			str += "<div  onclick=\"putInputValue(3,'"+t+"',"
				+"'"+_deviceMenuJson[i].idftName+"-"
					+_deviceMenuJson[i].idstName[j].idstName+"-"
					+_deviceMenuJson[i].idstName[j].idstId+"-"
					+_deviceMenuJson[i].idftId+"'"
				+",'"+f+"')\" '>"
				+ _deviceMenuJson[i].idstName[j].idstName+"</div>";
		}
	 	// console.log(str)
 		if(i == (_deviceMenuJson.length - 1)) {
			str += "</div></div><div onclick=\"putInputValue(3,'"+t+"','---','"+f+"')\">清空</div>";
		} else {
			str += "</div></div>";
		}
	 }
	str += "</div>";
	$("#"+t+"ShowDeviceInfoDiv").append(str);
	$("#"+t+"Menu").menu({
		onClick: function(item) {
		},
		hideOnUnhover: false,
	});
	$("#"+t+"ShowDeviceInfo").click(function(e) {
		$("#"+t+"Menu").menu('show', {
			left: e.pageX-10,
			top: e.pageY
		});
	});
}

// //初始化生成选择设备menu菜单
// function showAllDevType(t,f){
// 	console.log(_deviceMenuJson);
// 	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
// 	for(var i in _deviceMenuJson) {
// 		// str += "<div>";
// 		// str += "<span>" + _deviceMenuJson[i].dftName + "</span>";
// 		str += "<div onclick=\"putInputValue(3,'"+t+"',"
// 			+"'"+_deviceMenuJson[i].dftName+"-"
// 			+"-"
// 			+"-"
// 			+_deviceMenuJson[i].dftId+"-"
// 			+"-"
// 			+"'"
// 			+",'"+f+"')\">";
// 		str += "<span>" + _deviceMenuJson[i].dftName + "</span>";
// 		str += "<div style='width:150px;'>";
// 		for(var j in _deviceMenuJson[i].dstName){
// 			str += "<div  onclick=\"putInputValue(3,'"+t+"',"
// 				+"'"+_deviceMenuJson[i].dftName+"-"
// 				+_deviceMenuJson[i].dstName[j].dstName+"-"
// 				+_deviceMenuJson[i].dstName[j].dstId+"-"
// 				+_deviceMenuJson[i].dftId+"'"
// 				+",'"+f+"')\" '>"
// 				+ _deviceMenuJson[i].dstName[j].dstName+"</div>";
// 		}
// 		if(i == (_deviceMenuJson.length - 1)) {
// 			str += "</div></div><div onclick=\"putInputValue(3,'"+t+"','---','"+f+"')\">清空</div>";
// 		} else {
// 			str += "</div></div>";
// 		}
// 	}
// 	str += "</div>";
// 	$("#"+t+"ShowDeviceInfoDiv").append(str);
// 	$("#"+t+"Menu").menu({
// 		onClick: function(item) {
// 		},
// 		hideOnUnhover: false,
// 	});
// 	$("#"+t+"ShowDeviceInfo").click(function(e) {
// 		$("#"+t+"Menu").menu('show', {
// 			left: e.pageX-10,
// 			top: e.pageY
// 		});
// 	});
// }

//初始化生成选择设备menu菜单1
function showAllDevType(t,f){
	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
	for(var i in _devTypeMenuJson) {
		// str += "<div>";
		// str += "<span>" + _devTypeMenuJson[i].dftName + "</span>";
		str += "<div onclick=\"putInputValue(4,'"+t+"',"
			+"'"+_devTypeMenuJson[i].dftName+"-"
			+"-"
			+"-"
			+_devTypeMenuJson[i].dftId+"-"
			+"-"
			+"'"
			+",'"+f+"')\">";
		str += "<span>" + _devTypeMenuJson[i].dftName + "</span>";
		str += "<div style='width:150px;'>";
		for(var j in _devTypeMenuJson[i].dstName){
			// console.log("=="+_devTypeMenuJson[i].dstName[j].dstName);
			str += "<div  onclick=\"putInputValue(4,'"+t+"',"
				+"'"+_devTypeMenuJson[i].dftName+"-"
				+_devTypeMenuJson[i].dstName[j].dstName+"-"
				+_devTypeMenuJson[i].dstName[j].dstId+"-"
				+_devTypeMenuJson[i].dftId+"'"
				+",'"+f+"')\" '>"
				+ _devTypeMenuJson[i].dstName[j].dstName+"</div>";
		}
		//console.log(str)
		if(i == (_devTypeMenuJson.length - 1)) {
			str += "</div></div><div onclick=\"putInputValue(4,'"+t+"','---','"+f+"')\">清空</div>";
		} else {
			str += "</div></div>";
		}
	}
	str += "</div>";
	$("#"+t+"ShowDeviceTypeDiv").append(str);
	$("#"+t+"Menu").menu({
		onClick: function(item) {
		},
		hideOnUnhover: false,
	});
	$("#"+t+"ShowDeviceType").click(function(e) {
		$("#"+t+"Menu").menu('show', {
			left: e.pageX-10,
			top: e.pageY
		});
	});
}


//初始化生成选择设备品牌menu菜单
function showAllBrand(t,f){
	var str = "<div id='"+t+"Menu' class='easyui-menu' style='width:120px;'>";
	for(var i in _brandJson) {
//		str += "<div onclick=\"putInputValue(2,'"+t+"',"
//						+"'"+_brandJson[i].brandName+"-"
//						+"-"
//						+"-"
//						+_brandJson[i].brandName+"-"
//						+"-"
//						+"'" 
//						+",'"+f+"')\">";
		str += "<div>";
		str += "<span>" + _brandJson[i].brandName + "</span>";
		str += "<div style='width:150px;'>";
		for(var j in _brandJson[i].brandType){
//			str += "<div  onclick=\"putInputValue(2,'"+t+"',"
//						+"'"+_brandJson[i].brandName+"-"
//						+_brandJson[i].brandType[j].brandType+"-"
//						+"-"
//						+_brandJson[i].brandName+"-"
//						+_brandJson[i].brandType[j].brandType+"-"
//						+"'"
//						+",'"+f+"')\">";
			str += "<div>";
			str += "<span>" + _brandJson[i].brandType[j].brandType + "</span>";
			str += "<div style='width:120px;'>";
			for(var k in _brandJson[i].brandType[j].brandModel) {
				str += "<div  onclick=\"putInputValue(2,'"+t+"',"
						+"'"+_brandJson[i].brandName+"-"
						+_brandJson[i].brandType[j].brandType+"-"
						+_brandJson[i].brandType[j].brandModel[k].brandModel+"-"
						+_brandJson[i].brandType[j].brandModel[k].brandId+"'"
						+",'"+f+"')\" '>"
						+ _brandJson[i].brandType[j].brandModel[k].brandModel + "</div>";
			}
			str += "</div></div>";
		}
		if(i == (_brandJson.length - 1)) {
			str += "</div></div><div onclick=\"putInputValue(2,'"+t+"','---','"+f+"')\">清空</div>";
		} else {
			str += "</div></div>";
		}
	}
	str += "</div>";
	$("#"+t+"ShowBrandInfoDiv").append(str);
	$("#"+t+"Menu").menu({
		onClick: function(item) {
			
		},
		hideOnUnhover: false,
	});

	$("#"+t+"ShowBrandInfo").click(function(e) {
		$("#"+t+"Menu").menu('show', {
			left: e.pageX-10,
			top: e.pageY
		});
	});
}



/**
下一步
html模板：XXXXX即参数describe
<div id="XXXXXDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
	<div class="process-bar" style="padding:0 10px">
		<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.必填</span>
		<span class="process arrow-in arrow-out step2" data-step="2">2.选填</span>
	</div>
	<hr color=#95b8e7 size=1 style="margin:3px">
	<div class="XXXXXSteps">
		<div class="step XXXXXStep1">
			<div style="min-height:100px;padding:5px 0 0 0;">
				步骤一
			</div>
			<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="validateStep('XXXXX', 2);">下一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="$('#XXXXXDlg').dialog('close');">取消</a>
			</div>
		</div>
	</div>
	<div class="XXXXXSteps">
		<div class="step XXXXXStep2">
			<div style="min-height:100px;padding:5px 0 0 0;">
				步骤二
			</div>
			<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('XXXXX', 1);">上一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="">保存</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="$('#XXXXXDlg').dialog('close');">取消</a>
			</div>
		</div>
	</div>
</div>
 */
//流程下一步
function gotoStep(describe, step){
	//流程箭头样式修改
	var i = 1;
	$('#' + describe + 'Dlg .process-bar .process').each(function(){
		if (i <= step) {
			$('#' + describe + 'Dlg .process-bar .step' + i).addClass('active');
		} else {
			$('#' + describe + 'Dlg .process-bar .step' + i).removeClass('active');
		}
		i++;
	});
	//内容修改
	i = 1;
	$('#' + describe + 'Dlg' + ' .' + describe + 'Steps .step').each(function(){
		if (i == step) {
			$('#' + describe + 'Dlg' + ' .' + describe + 'Steps' + ' .' + describe + 'Step' + i).show();
		} else {
			$('#' + describe + 'Dlg' + ' .' + describe + 'Steps' + ' .' + describe + 'Step' + i).hide();
		}
		i++;
	});
}
//先验证再下一步
function validateStep(describe, step){
	var checkFlag = 0;
	var thisStep = step - 1;
	if (thisStep > 0) {//#addHsDlg.addHsSteps.addHsStep5
		$('#' + describe + 'Dlg' + ' .' + describe + 'Steps' + ' .' + describe + 'Step' + thisStep + ' input[require="require"]').each(function(){
			if($(this).val()==''){
				$(this).css('border', '1px solid red');
				checkFlag++;
			}else{
				$(this).css('border', '1px solid #a9a9a9');
			}
		});
		$('#' + describe + 'Dlg' + ' .' + describe + 'Steps' + ' .' + describe + 'Step' + thisStep + ' select[require="require"]').each(function(){
			if($(this).val()==''||$(this).val()==null){
				$(this).css('border', '1px solid red');
				checkFlag++;
			}else{
				$(this).css('border', '1px solid #a9a9a9');
			}
		});
		if(checkFlag!=0){
			myTips("有必填项未填写!","error");
			return false;
		}
	}
	
	gotoStep(describe, step);
	return true;
}
//添加收益人
function addProfit(flag) {
	var html = '';
	var profitIndex = 0;
	$('#addProfitDiv div[profit-index]').each(function(){
		profitIndex = $(this).attr('profit-index');
	});
	profitIndex++;
	html = '<div profit-index="' + profitIndex + '" style="margin:5px 0 0 0;"> ' + 
				'<lable style="display:inline-block;width:100px;"><span class="require v-hide">*</span>业绩收益人：</lable> ' + 
				'<input id="' + flag + profitIndex + 'ShowUserInfo" class="choose_user_button" doFlag="' + flag + profitIndex + '" doFun="" style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear"> ' + 
				'<input id="' + flag + profitIndex + 'GetUserStoreId" type="hidden"> ' + 
				'<input id="' + flag + profitIndex + 'GetUserDetId" type="hidden"> ' + 
				'<input id="' + flag + profitIndex + 'GetUserId" type="hidden"> ' + 
				'<div id="' + flag + profitIndex + 'ShowUserInfoDiv" style="display:none;"></div> ' + 
				'<input id="' + flag + profitIndex + 'Percent" type="number" style="width:50px;">% ' + 
				'<button class="choose" style="margin:0 5px;" onclick="addProfit(\'' + flag + '\');">添加</button> ' +
				'<button class="choose" style="margin:0 5px;" onclick="$(\'#addProfitDiv div[profit-index=' + profitIndex + ']\').remove();">删除</button> ' + 
			'</div> ';
	$('#addProfitDiv').append(html);
	$("#addProfitDiv .choose_user_button").each(function(){
		showAllUser($(this).attr("doFlag"),$(this).attr("doFun"));
	});
//	$('#' + flag + profitIndex + 'ChooseUserButton').on('click', function(){
//		$('#' + flag + profitIndex + 'Menu').show();
//	});
}
//勾选默认业务员100%收益
function checkProfit(id, flag, salesmanFlag) {
	$('#addProfitDiv div[profit-index]').remove();
	addProfit(flag);
	setDefaultProfit(flag, salesmanFlag);
	if ($(id).is(':checked')) {
		$('#addProfitDiv div[profit-index]').hide();
	} else {
		$('#addProfitDiv div[profit-index]').show();
	}
}
//默认业务员100%收益
function setDefaultProfit(flag, salesmanFlag) {
	var userId = $("#" + salesmanFlag + "GetUserId").val();
	var deptId = $("#" + salesmanFlag + "GetUserDetId").val();
	var storeId = $("#" + salesmanFlag + "GetUserStoreId").val();
	$("#" + flag + "1GetUserId").val(userId);
	$("#" + flag + "1Percent").val(100);
	for(var j in _userInfoData){
		if(userId == _userInfoData[j].userId){
			$("#" + flag + "1ShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
			$("#" + flag + "1GetUserStoreId").val(storeId);
			$("#" + flag + "1GetUserDetId").val(deptId);
		}
	}
}
//添加已租/未租，变更业务员触发
function changeSalesman(id, flag, salesmanFlag){
	if ($(id).is(':checked')) {
		checkProfit(id, flag, salesmanFlag);
	}
}
//读取收益人数据
function getProfitData(flag, assistType){
	var array = [];
	var checkFlag = 0;
	$("#addProfitDiv div[profit-index]").each(function(){
		var profitIndex = $(this).attr('profit-index');
		var profit = {};
		profit.assistRegisterPeople = _loginUserId;
		profit.assistType = assistType;
		profit.assistStorefront = $('#' + flag + profitIndex + 'GetUserStoreId').val();
		profit.assistDepartment = $('#' + flag + profitIndex + 'GetUserDetId').val();
		profit.assistUserId = $('#' + flag + profitIndex + 'GetUserId').val();
		profit.assistBonus = $('#' + flag + profitIndex + 'Percent').val();
		if(profit.assistUserId != '' && profit.assistBonus != '') {
			array.push(profit);
		} else {
			checkFlag++;
		}
	});
	if (checkFlag > 0) {
		return {
			code: -1,
			msg: '业绩收益人未填写完整'
		};
	}
	if (array.length > 0) {
		var bonus = 0;
		for (var i in array) {
			bonus += Number(array[i].assistBonus);
		}
		if (bonus != 100) {
			return {
				code: -1,
				msg: '业绩收益人比例总和必须等于100%'
			};
		}
		
	}
	var ids = [];
	for (var i in array) {
		if (ids.indexOf(array[i].assistUserId) < 0) {
			ids.push(array[i].assistUserId);
		} else {
			return {
				code: -1,
				msg: '业绩收益人有重复'
			};
		}
	}
	return {
		code: 1,
		msg: '',
		body: JSON.stringify(array)
	}
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
//计算两个日期之间有几年几月几日
function getYearMonthDay(beginDate, endDate) {
	var y = 0,
		m = 0,
		d = 0,
		date,
		begin = new Date(beginDate),
		end = new Date(endDate);
	if (begin >= end) {
		return [0, 0, 0];
	}
	do {
		date = new Date(beginDate);
		date.setFullYear(date.getFullYear() + (++y));
		date.setDate(date.getDate() - 1);
	} while (date <= end);
	y--;
	do {
		date = new Date(beginDate);
		date.setFullYear(date.getFullYear() + y);
		date.setMonth(date.getMonth() + (++m));
		date.setDate(date.getDate() - 1);
	} while (date <= end);
	m--;
	do {
		date = new Date(beginDate);
		date.setFullYear(date.getFullYear() + y);
		date.setMonth(date.getMonth() + m);
		date.setDate(date.getDate() + (++d));
		date.setDate(date.getDate() - 1);
	} while (date <= end);
	d--;
	return [y, m, d];
}
//加法
function mySum(v1, v2) {
	v1 = Number(v1);
	v2 = Number(v2);
	return Number((v1 + v2).toFixed(2));
}
//减法
function mySub(v1, v2) {
	v1 = Number(v1);
	v2 = Number(v2);
	return Number((v1 - v2).toFixed(2));
}
/** 数字金额大写转换(可以处理整数,小数,负数) */
//此函数有单精度问题，不推荐，先用下面的convertCurrency函数替代
/*function smalltoBIG(n)
{    
    var fraction = ['角', '分'];    
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];    
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];    
    var head = n < 0? '欠': '';    
    n = Math.abs(n);    
  
    var s = '';    
  
    for (var i = 0; i < fraction.length; i++)     
    {    
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');    
    }    
    s = s || '整';    
    n = Math.floor(n);    
  
    for (var i = 0; i < unit[0].length && n > 0; i++)     
    {    
        var p = '';    
        for (var j = 0; j < unit[1].length && n > 0; j++)     
        {    
            p = digit[n % 10] + unit[1][j] + p;    
            n = Math.floor(n / 10);    
        }    
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;    
    }    
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');    
}*/
function convertCurrency(money) {
	//汉字的数字
	var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
	//基本单位
	var cnIntRadice = new Array('', '拾', '佰', '仟');
	//对应整数部分扩展单位
	var cnIntUnits = new Array('', '万', '亿', '兆');
	//对应小数部分单位
	var cnDecUnits = new Array('角', '分', '毫', '厘');
	//整数金额时后面跟的字符
	var cnInteger = '整';
	//整型完以后的单位
	var cnIntLast = '元';
	//最大处理的数字
	var maxNum = 999999999999999.9999;
	//金额整数部分
	var integerNum;
	//金额小数部分
	var decimalNum;
	//输出的中文金额字符串
	var chineseStr = '';
	//分离金额后用的数组，预定义
	var parts;
	if (money == '') { return ''; }
	money = parseFloat(money);
	if (money >= maxNum) {
		//超出最大处理数字
		return '';
	}
	if (money == 0) {
		chineseStr = cnNums[0] + cnIntLast + cnInteger;
		return chineseStr;
	}
	//转换为字符串
	money = money.toString();
	if (money.indexOf('.') == -1) {
		integerNum = money;
		decimalNum = '';
	} else {
		parts = money.split('.');
		integerNum = parts[0];
		decimalNum = parts[1].substr(0, 4);
	}
	//获取整型部分转换
	if (parseInt(integerNum, 10) > 0) {
		var zeroCount = 0;
		var IntLen = integerNum.length;
		for (var i = 0; i < IntLen; i++) {
			var n = integerNum.substr(i, 1);
			var p = IntLen - i - 1;
			var q = p / 4;
			var m = p % 4;
			if (n == '0') {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					chineseStr += cnNums[0];
				}
				//归零
				zeroCount = 0;
				chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
			}
			if (m == 0 && zeroCount < 4) {
				chineseStr += cnIntUnits[q];
			}
		}
		chineseStr += cnIntLast;
	}
	//小数部分
	if (decimalNum != '') {
		var decLen = decimalNum.length;
		for (var i = 0; i < decLen; i++) {
			var n = decimalNum.substr(i, 1);
			if (n != '0') {
				chineseStr += cnNums[Number(n)] + cnDecUnits[i];
			}
		}
	}
	if (chineseStr == '') {
		chineseStr += cnNums[0] + cnIntLast + cnInteger;
	} else if (decimalNum == '') {
		chineseStr += cnInteger;
	}
	return chineseStr;
}

/**
 * input框输入验证
 * data-type="money"			正负小数，限制两位小数
 * data-type="money-positive"	正小数，限制两位小数
 * data-type="money-negative"	负小数，限制两位小数
 * data-type="number"			正负整数，长度不限
 * data-type="number-positive"	正整数，长度不限
 * data-type="number-negative"	负整数，长度不限
 */
$(function(){
	$('input[data-type="money"]').on('keyup', function(){
		moneyKeyupFomat(this);
		if ($(this).is('[data-fn-keyup]')) eval($(this).attr('data-fn-keyup'));
	});
	$('input[data-type="money"]').on('blur', function(){
		moneyBlurFomat(this);
		if ($(this).is('[data-fn-blur]')) eval($(this).attr('data-fn-blur'));
	});
	$('input[data-type="money"]').on('focus', function(){
		if ($(this).val() =='0.00') $(this).val('');
		if ($(this).is('[data-fn-focus]')) eval($(this).attr('data-fn-focus'));
	});
	
	$('input[data-type="money-positive"]').on('keyup', function(){
		moneyPositiveKeyupFomat(this);
		if ($(this).is('[data-fn-keyup]')) eval($(this).attr('data-fn-keyup'));
	});
	$('input[data-type="money-positive"]').on('blur', function(){
		moneyPositiveBlurFomat(this);
		if ($(this).is('[data-fn-blur]')) eval($(this).attr('data-fn-blur'));
	});
	$('input[data-type="money-positive"]').on('focus', function(){
		if ($(this).val() =='0.00') $(this).val('');
		if ($(this).is('[data-fn-focus]')) eval($(this).attr('data-fn-focus'));
	});
	
	$('input[data-type="money-negative"]').on('keyup', function(){
		moneyNegativeKeyupFomat(this);
		if ($(this).is('[data-fn-keyup]')) eval($(this).attr('data-fn-keyup'));
	});
	$('input[data-type="money-negative"]').on('blur', function(){
		moneyNegativeBlurFomat(this);
		if ($(this).is('[data-fn-blur]')) eval($(this).attr('data-fn-blur'));
	});
	$('input[data-type="money-negative"]').on('focus', function(){
		if ($(this).val() =='0.00') $(this).val('');
		if ($(this).is('[data-fn-focus]')) eval($(this).attr('data-fn-focus'));
	});
	
	$('input[data-type="number"]').on('keyup', function(){
		numberFomat(this);
		if ($(this).is('[data-fn-keyup]')) eval($(this).attr('data-fn-keyup'));
	});
	$('input[data-type="number"]').on('blur', function(){
		numberFomat(this);
		if ($(this).is('[data-fn-blur]')) eval($(this).attr('data-fn-blur'));
	});
	$('input[data-type="number"]').on('focus', function(){
		if ($(this).val() =='0') $(this).val('');
		if ($(this).is('[data-fn-focus]')) eval($(this).attr('data-fn-focus'));
	});
	
	$('input[data-type="number-positive"]').on('keyup', function(){
		numberPositiveFomat(this);
		if ($(this).is('[data-fn-keyup]')) eval($(this).attr('data-fn-keyup'));
	});
	$('input[data-type="number-positive"]').on('blur', function(){
		numberPositiveFomat(this);
		if ($(this).is('[data-fn-blur]')) eval($(this).attr('data-fn-blur'));
	});
	$('input[data-type="number-positive"]').on('focus', function(){
		if ($(this).val() =='0') $(this).val('');
		if ($(this).is('[data-fn-focus]')) eval($(this).attr('data-fn-focus'));
	});
	
	$('input[data-type="number-negative"]').on('keyup', function(){
		numberNegativeFomat(this);
		if ($(this).is('[data-fn-keyup]')) eval($(this).attr('data-fn-keyup'));
	});
	$('input[data-type="number-negative"]').on('blur', function(){
		numberNegativeFomat(this);
		if ($(this).is('[data-fn-blur]')) eval($(this).attr('data-fn-blur'));
	});
	$('input[data-type="number-negative"]').on('focus', function(){
		if ($(this).val() =='0') $(this).val('');
		if ($(this).is('[data-fn-focus]')) eval($(this).attr('data-fn-focus'));
	});
});


//正负小数，限制两位小数
function moneyKeyupFomat(input) {
	var regexp = /^-?\d*\.?\d*$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}
function moneyBlurFomat(input) {
	if (input.value === '') {
		input.value = '0.00';
	} else if (input.value === '0') {
		input.value = '0.00';
	} else if (input.value === '0.') {
		input.value = '0.00';
	}
	var regexp = /^-?([1-9]\d*|0)(\.\d{1,2})?$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}
//正小数，限制两位小数
function moneyPositiveKeyupFomat(input) {
	var regexp = /^\d*\.?\d*$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}
function moneyPositiveBlurFomat(input) {
	if (input.value === '') {
		input.value = '0.00';
	} else if (input.value === '0') {
		input.value = '0.00';
	} else if (input.value === '0.') {
		input.value = '0.00';
	}
	var regexp = /^([1-9]\d*|0)(\.\d{1,2})?$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}
//负小数，限制两位小数
function moneyNegativeKeyupFomat(input) {
	var regexp = /^-\d*\.?\d*$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}
function moneyNegativeBlurFomat(input) {
	if (input.value === '') {
		input.value = '0.00';
	} else if (input.value === '0') {
		input.value = '0.00';
	} else if (input.value === '0.') {
		input.value = '0.00';
	}
	var regexp = /^-([1-9]\d*|0)(\.\d{1,2})?$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}

//正负整数，长度不限
function numberFomat(input) {
	var regexp = /^-?\d*$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}

//正整数，长度不限
function numberPositiveFomat(input) {
	var regexp = /^\d*$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}

//负整数，长度不限
function numberNegativeFomat(input) {
	var regexp = /^-\d*$/;
	if (!regexp.test(input.value)){
		input.value='';
	}
}
//匹配输入的是否是正数，暂时用于建筑面积
function matchedPositiveNumber(className){
	var parameter = $('.'+className).val();
	var patrn = /^([1-9]\d*|0)(\.\d*[1-9])?$/;
	if (!patrn.test(parameter)){
		$('.'+className).val('');
	}
}
//匹配输入的只能是中文,英文,数字  与小括号，暂时只用于姓名备注
function chineseNumerals(id){
	var parameter = $('#'+id).val();
	var patrn = /^[\a-zA-Z\u4e00-\u9fa5\d\()\（）]+$/;
	if (!patrn.test(parameter)){
		$('#'+id).select();
		
		$('#addHrBenZhu').html("<span style='color:red;'>*输入的只能是中文,英文,数字</span>");
		
	}else{
		$('#addHrBenZhu').html("");
			
	}
	
}


//生成随机编号
function randomNumber(){
	var strNumber = '';	
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	var day = myDate.getDate();
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	var rnd="";
	for(var i=0;i<6;i++){
	    rnd+=Math.floor(Math.random()*10);
	}
	var yearStr = year.toString().substring(2,4);
	strNumber = yearStr+month+day+rnd;
	return strNumber;
}
//上一条/下一条
/*
<div style='margin:8px 0 0 0;text-align:center;'>
	<a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'energyBill_index', 'accountReceivableTable', 'energyBillDlg', 'energyBillDlg(row)')">上一条</a>
	<a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'energyBill_index', 'accountReceivableTable', 'energyBillDlg', 'energyBillDlg(row)')">下一条</a>
</div>
*/
function lastOrNext(type, index, table, dialog, fn) {
	var dataIndex = $('#'+index).val();
	var changeData = {};
	var row;
	console.log("下标："+dataIndex);
	if (type == 0) {
		if (dataIndex != 0) {
			$('#'+dialog+' [clear="clear"]').val('');
			$('#'+dialog+' [clear="clear"]').html('');
			$('#'+dialog+' [choose="choose"]').val('');
            $("#id_img_pers_open").attr("src","images/userImage.png");
			var num = parseInt(dataIndex) - 1;
			$('#'+index).val(num);
			$('#'+table).datagrid('selectRow',num);
			row = $('#'+table).datagrid('getSelected');
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $('#'+table).datagrid('getData').total;
		if (dataIndex != parseInt(size) - 1) {
			$('#'+dialog+' [clear="clear"]').val('');
			$('#'+dialog+' [clear="clear"]').html('');
			$('#'+dialog+' [choose="choose"]').val('');
            $("#id_img_pers_open").attr("src","images/userImage.png");
			var num = parseInt(dataIndex) + 1;
			$('#'+index).val(num);
			$('#'+table).datagrid('selectRow',num);
			row = $('#'+table).datagrid('getSelected');
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}	
	eval(fn);
}
//计算两个日期相差多少天小时分
function getDays(date1 , date2){
	var dateTime1 = new Date(date1).format('yyyy-MM-dd hh:mm:ss');
	var dateTime1 = new Date(dateTime1.replace(new RegExp("-","gm"),"/")).getTime();
	var dateTime2 = new Date(date2).format('yyyy-MM-dd hh:mm:ss');
	var dateTime2 = new Date(dateTime2.replace(new RegExp("-","gm"),"/")).getTime();
	//时间差的毫秒数
	var date3 = dateTime1 - dateTime2;
	//计算出相差天数
	var days=Math.floor(date3/(24*3600*1000));
	//计算出小时数
	var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));
	//计算相差分钟数
	var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000));
	
	return days+'天 '+hours+'时 '+minutes+'分';
}

//获取两个日期的天数差值
function getDayDiff(startDate, endDate){
	var time1 = new Date(startDate).getTime();
	var time2 = new Date(endDate).getTime();
	var days = (time2 - time1) / (1000 * 3600 * 24);
	return days;
}

//获取对应权限
function getModelPurview(purviewFlag, loginPurview){
	var allPurview = JSON.parse(loginPurview);
	var onePurview =purviewFlag.split("?")[0];
	var twoPurview =parseInt(purviewFlag.split("?")[1]);
	if (allPurview[onePurview] == undefined || allPurview[onePurview].length == 0 || allPurview[onePurview][twoPurview] == undefined) {
		return {a:0};
	} else {
		return allPurview[onePurview][twoPurview];
	}
}

//onkeyup搜索延时器
var searchTimer = null;
function searchOnkeyup(id, fn){
	if ($('#' + id).val() == '') {
		eval(fn);
	} else {
		clearTimeout(searchTimer);
		searchTimer = setTimeout(function(){
			eval(fn);
		}, 800);
	}
}

//验证必填项 
function validateRequire(dialog){
	var checkFlag = 0;
	var dialogArray = $('#' + dialog + ' [require="require"]');
	console.log("dialogArray ="+dialogArray);
	console.log(dialogArray)
	$.each(dialogArray,function(index,val){
		console.log($(val).val())
		if($(val).val()=='' || $(val).val()==null){
			$(val).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(val).css('border', '1px solid #a9a9a9');
		}});
	
	
	/*$('#' + dialog + ' [require="require"]').each(function(){
		if($(this).val()=='' || $(this).val()==null){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});*/
	if(checkFlag!=0){	
			myTips("有必填项未填写!","error");
			return false;
		}
		
	return true;
}

//期望时间
function hopeTimeVal(select, input) {
	var hopeSelect = $('#'+select).val();
	if (hopeSelect == "尽快" || hopeSelect == "电话联系") {
		$('#'+input).val(hopeSelect);
	}
	if (hopeSelect == "今天") {
		$('#'+input).val(formatTime(getNowFormatDate(), 2) + " ");
	}
	if (hopeSelect == "明天") {
		var d = formatTime(getNowFormatDate(), 2)
		var tomorrow = new Date(d);
		var sDay = 1;
		tomorrow.setDate(tomorrow.getDate() + sDay);
		$('#'+input).val(formatDate(tomorrow));
	}
	if (hopeSelect == "后天") {
		var d = formatTime(getNowFormatDate(), 2)
		var afterTomorrow = new Date(d);
		var sDay = 2;
		afterTomorrow.setDate(afterTomorrow.getDate() + sDay);
		$('#'+input).val(formatDate(afterTomorrow));
	}
	if (hopeSelect == "本周末") {
		var now = new Date;
		var day = now.getDay();
		var week = "1234567";
		var Saturday = 5 - week.indexOf(day);
		var satur = new Date;
		satur.setDate(satur.getDate() + Saturday);
		var sunday = 6 - week.indexOf(day);
		var sun = new Date;
		sun.setDate(sun.getDate() + sunday);
		$('#'+input).val(formatDate(satur) + "或" + formatDate(sun));
	}
}

//获取n位的随机数
//RegExp(pattern, attributes)attributes-gim(全局匹配、区分大小写的匹配、多行匹配)
function randomn(n) {
	if (n > 21) return null
	var re =new RegExp("(\\d{" + n + "})(\\.|$)")
	var num = (Array(n-1).join(0) + Math.pow(10,n) * Math.random()).match(re)[1]
	return num
	// Array(n > num ? (n - ('' + num).length +1) : 0).join(0) + num 补位
}

/**
 * 简化版的调试输出
 */
function c(text){
	console.log(text);
}
//删除绝对定位的提示文字位置
function empityMsgRemove(){
	$('.datagrid-empty').remove();
}


////判断日期格式 
//function CheckDateTime(str){ 
//	  var reg=/^(\d+)-(\d{ 1,2})-(\d{ 1,2})(\d{ 1,2}):(\d{1,2}):(\d{1,2})$/; 
//	  var r=str.match(reg); 
//	  if(r==null) return false; 
//	  r[2]=r[2]-1; 
//	  var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]); 
//	  if(d.getFullYear()!=r[1]) return false; 
//	  if(d.getMonth()!=r[2]) return false; 
//	  if(d.getDate()!=r[3]) return false; 
//	  if(d.getHours()!=r[4]) return false; 
//	  if(d.getMinutes()!=r[5]) return false; 
//	  if(d.getSeconds()!=r[6]) return false; 
//	  return true; 
//	}