/***********************************************************预先上传start**************************************************************/

/**
 * 使用方法：
 * <a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private', 'pushHouse')">上传</a>
 * <span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
 * 
 * 参数说明
 * TYPE: private（私有） | public（公开） 私有上传需要下载凭证，公开不需要
 * 特别注意：
 * “添加xx对话框”的关闭事件里要调用clearAttachment()清除att
 * “添加xx对话框”点击提交时isSave要置为true
 */

var isSave = false;
//清除att
function clearAttachment(){
	var att = $("#att").val();
	if (att != "") {
		if (isSave) {
			$.post("../deleteAttachment.action", {
				att : att
			});
		} else {
			$.post("../deleteAttachmentAndFile.action", {
				att : att
			});
		}
	}
	$('#att').val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	isSave = false;
}

//上传
function uploadAttachment(TYPE, BTN){
	$('#uploadDlg').dialog({
		title : '上传',
		top : getTop(464),
		left : getLeft(600),
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refreshAttachment(TYPE, BTN);
			//将没有贝壳url的path上传到贝壳
			uploadBk();
		}
	});
	var url = "";
	if (TYPE == 'private') {
		url = '../upload/getUpTokenCallback.action';
	} else if (TYPE == 'public') {
		url = '../pubupload/getUpTokenCallback.action';
	} else {
		alert("上传功能出错，请联系管理员处理");
		return;
	}
	creatQrAttachment(TYPE);
	$.post(url, function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$("#token").val(token);
		$("#co").val(co);
		initUploader();
		$('#uploadDlg').dialog('open');
		console.log('att='+$("#att").val());
	});
}

//生成二维码
function creatQrAttachment(TYPE){
	var url = "";
	if (TYPE == 'private') {
		url = '../upload/getMobUploadUrl.action';
	} else if (TYPE == 'public') {
		url = '../pubupload/getMobUploadUrl.action';
	} else {
		alert("系统异常");
		return;
	}
	$.post(url, {
		att : $("#att").val()
	}, function(data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		console.log('qr='+data);
	});
}

//查看图片
function openAttachment(TYPE, BTN) {
	if($("#att").val()==""){
		var att = parseInt((Math.random()*9+1)*10000000);
		$.post("../insertAttachment.action",{
			att : att
		},function(data){
			if (data.code < 0) {
				$.messager.alert('消息','服务器异常，请重试',"error");
				return;
			}else{
				$("#att").val(att);
				doCancelAttachment();
				showPictureAttachment(TYPE, BTN);
			}
		});
	}else{
		doCancelAttachment();
		showPictureAttachment(TYPE, BTN);
	}
}

//删除图片
function removeAttachment(){
	var photos = $('.attachment');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePictureText').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemovePic').show();
	}
}

//取消删除图片
function doCancelAttachment(){
	$('#removePictureText').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic').hide();
}

//执行删除图片
function doRemoveAttachment(TYPE){
	var att = $("#att").val();
	var arr = 0;
	var path = '';
	var chk = $('.picturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapperAttachment input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapperAttachment input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		$.post("../deleteAttachmentPic.action",{
			att : att,
			path : path
		}, function(data) {
			if (data.code < 0) {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				refreshAttachment(TYPE);
			}
		});
		doCancelAttachment();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}

//显示图片
function showPictureAttachment(TYPE, BTN) {
	if ($("#attachmentDlg").length != 0) {
		$("#attachmentDlg").dialog('destroy');
	}
	appendAttachmentImgDlg(TYPE, BTN);
	$.parser.parse($("#attachmentDlg"));
	$('#attachmentDlg').dialog({
		title : '上传及查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function() {
			var coverFlag = 0;
			var picTypeFlag = 0;
			if ($('#imgWrapperAttachment .attachmentLi').length == 0) {
				return true;
			}
			$('#imgWrapperAttachment .attachmentLi').each(function(){
				var picType = $(this).find('.picType').val();
				if (picType == '') {
					picTypeFlag++;
				}
				if ($(this).find('.cover').css('display') != 'none') {
					coverFlag++;
				}
			});
			if (picTypeFlag > 0) {
				myTips('请选择图片分类', 'error');
				return false;
			}
			if (BTN == 'pushRentUnit' && coverFlag == 0) {
				myTips('请设置封面', 'error');
				return false;
			}
		},
		onClose : function() {
			$("#imgWrapperAttachment").empty();
		},
	});
	$("#imgWrapperAttachment").empty();
	$('#attachmentDlg').dialog('open');
	var att = $("#att").val(); 
	$.post("../getAttachment.action",{
		att : att
	}, function(data) {
		if (data.code < 0) {
			$(".attachmentNum").html("（图片：0张 文件：0个）");
			return;
		}
		data = data.body;
		var path = data[0].path.getRealJsonStr();
		var img = eval('([' + path + '])');
		if (TYPE == "private") {
			var urls = "";
			for(var i in img){
				if(i==0){
					urls += img[i].path;
				}else{
					urls += ","+img[i].path;
				}
			}
			$.post("../upload/getDownloadUrl.action",{
				baseUrls : urls
			},function(data){
				var newUrls = data.split(",");
				loadAttachmentImg(TYPE, img, newUrls, BTN);
			});
		} else if (TYPE == "public") {
			loadAttachmentImg(TYPE, img, img, BTN);
		} else {
			alert("系统异常");
			return;
		}
	});
}

//刷新
function refreshAttachment(TYPE, BTN){
	doCancelAttachment();
	showPictureAttachment(TYPE, BTN);
}

//加载预览图
function loadAttachmentImg(TYPE, img, newUrls, BTN){
	var imgNum = 0;
	var fileNum = 0;
	if (TYPE == 'private') {
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			var j = parseInt(i) + parseInt(img.length);
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapperAttachment').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapperAttachment .fileList').append('<li>' +
					'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
					'<a href="'+newUrls[i]+'" class="attachment" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
					'</li>');
				fileNum++;
			}else{
				if(imgNum == 0){
					$('#imgWrapperAttachment').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapperAttachment .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="attachmentImg attachment" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
	} else {
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapperAttachment').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapperAttachment .fileList').append('<li>' +
					'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
					'<a href="'+img[i].path+'" class="attachment" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
					'</li>');
				fileNum++;
			}else{
				if(imgNum == 0){
					$('#imgWrapperAttachment').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				if (BTN == 'pushHouse') {
					$('#imgWrapperAttachment .imageList').append('<li class="attachmentLi" style="float:left;position:relative;width:150px;margin:5px;overflow: hidden;">' +
							'<div class="attachmentList">' + 
								'<img title="'+img[i].name+'" class="attachmentImg attachment" style="display:inline-block;width:150px;height:200px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;box-sizing:border-box;" href="'+img[i].path+'" src="'+img[i].path+'">' +
								'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:0px;top:1px;position:absolute;z-index:3;display:none;">' +
								'<p style="position:absolute;bottom:16px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:0px;">' + img[i].name + '</p>' +
							'</div>' + 
							'<select class="picType" style="margin-bottom:5px;width:150px;" data-url="'+img[i].path+'" onchange="updateBkType()"><option></option><option value="0">未知</option><option value="5">客厅</option><option value="6">餐厅</option><option value="8">厨房</option><option value="9">卫生间</option></select>' +
						'</li>');
				} else if (BTN == 'pushRentUnit') {
					$('#imgWrapperAttachment .imageList').append('<li class="attachmentLi" style="float:left;position:relative;width:150px;margin:5px;overflow: hidden;">' +
							'<div class="attachmentList">' + 
								'<img title="'+img[i].name+'" class="attachmentImg attachment" style="display:inline-block;width:150px;height:200px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;box-sizing:border-box;" href="'+img[i].path+'" src="'+img[i].path+'">' +
								'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:0px;top:1px;position:absolute;z-index:3;display:none;">' +
								'<p style="position:absolute;bottom:16px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:0px;">' + img[i].name + '</p>' +
								'<p class="setcover" style="position:absolute;bottom:16px;width:150px;height:40px;line-height:40px;background:#ff7442;opacity:0.9;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:4;width: 150px;z-index: 4;margin: 12px 0 12px 0px;text-align: center;font-size: 16px;cursor: pointer;display:none;">设为封面</p>' +
								'<span class="cover" style="display:none;">封面</span>' + 
							'</div>' + 
							'<select class="picType" style="margin-bottom:5px;width:150px;" data-url="'+img[i].path+'" onchange="updateBkType()"><option></option><option value="0">未知</option><option value="1">卧室</option><option value="2">主卧</option><option value="3">次卧</option><option value="4">厅</option><option value="7">过厅</option><option value="10">户型图</option><option value="11">标准户型图</option><option value="12">非标准户型图</option><option value="13">外景</option><option value="14">配套设施</option></select>' +
						'</li>');
				}
				imgNum++;
			}
		}
		for (var i in img) {
			$('#imgWrapperAttachment .attachmentLi').each(function(){
				var url = $(this).find('.attachmentImg').attr('src');
				if (url == img[i].path) {
					if (img[i].type != undefined) {
						$(this).find('.picType').val(img[i].type);
					}
					if (img[i].cover == 1) {
						$('.cover').hide();
						$('.setcover').hide();
						$(this).find('.cover').show();
					}
				}
			});
		}
		
	}
	
	$(".attachmentNum").html("（图片：" + imgNum + "张 文件：" + fileNum + "个）");
	$(".attachmentImg").colorbox({
		rel : 'attachmentImg',
		transition : "none",
		width : "60%",
		height : "90%"
	});
	
	//设为封面
	$('.attachmentList').on('mouseover', function(){
		$('.setcover').hide();
		if ($(this).find('.cover').is(':hidden')) {
			$(this).find('.setcover').show();
		}
	});
	$('.attachmentList').on('mouseleave', function(){
		$('.setcover').hide();
	});
	$('.setcover').on('click', function(){
		$('.cover').hide();
		$('.setcover').hide();
		$(this).siblings('.cover').show();
		updateBkType();
	});
}

//动态加载上传对话框
function appendAttachmentImgDlg(TYPE, BTN){
	var html = ['<div id="attachmentDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">',
		'	<div style="padding:5px 0 0 10px;">',
		'		<a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadAttachment(\'' + TYPE + '\', \'' + BTN + '\')">上传</a>',
		'		<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removeAttachment()">删除</a> ',
		'		<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refreshAttachment(\'' + TYPE + '\', \'' + BTN + '\')">刷新</a> ',
		'		<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>',
		'	</div>',
		'	<div id="removePictureText" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>',
		'	<div id="imgWrapperAttachment" style="margin:10px 0 0 10px;"></div>',
		'	<div style="clear:both"></div>',
		'	<center>',
		'		<div id="doRemovePic" style="margin:10px 0 0 10px;display:none;">',
		'			<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemoveAttachment(\'' + TYPE + '\')">删除</a> ',
		'			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancelAttachment()">取消</a>',
		'		</div>',
		'	</center>',
		'</div>'].join("");
	$("body").append(html);
}
/***********************************************************预先上传end****************************************************************/