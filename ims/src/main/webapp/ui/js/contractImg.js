DATA=[];

/***********************************************************租客合约上传start****************************************************************/
//电脑上传
function uploadRentCont(){
	var row = $('#tenantDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择合约',"info");
		return;
	}
	creatRentQr();
	$('#uploadDlg').dialog({
		title : '上传图片',
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
			refreshRent()
		}
	});
	$.post("../upload/getUpTokenCallback.action",function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$('#uploadDlg input[clear=true]').val('');
		$("#token").val(token);
		$("#co").val(co);
		$("#jrrId").val(row.jrrId);
		initUploader();
		doCancelRent();
		$('#uploadDlg').dialog('open');
	});
}


function creatRentQr(){
	var row = $('#tenantDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择合约',"info");
		return;
	}
	
	$.post("../upload/getMobUploadUrl.action",{
		jrrId : row.jrrId
	},function(data){
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancelRent();
	});
}

//租客合约图片
function tenantImgDg(data){
	var row = $('#tenantDg').datagrid('getSelected');
	DATA=data;
	if (row) {
		doCancelRent();
		showRentPicture(data);
	} else {
		$.messager.alert('消息','请选择合约',"info");
	}
}
//取消删除图片
function doCancelRent(){
	$('#removeRentPicture').hide();
	$('.rentpicturecheck').hide().removeAttr('checked');
	$('#doRemoveRentPic').hide();
}
//显示合同图片
function showRentPicture(data) {
	
//	var row = $("#tenantDg").datagrid("getSelected");
//	console.log(row)
	$('#renterRenewalImgDlg').dialog({
		title : '查看租客合约图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapperRent").empty();
		},
	});
	
	$('#renterRenewalImgDlg').dialog('open');
	$("#imgWrapperRent").empty();
	console.log(data)
//	$.post("../renewalRenterInRentDb.action",{
//		jrrId : jrrId
//	}, function(data) {
//		console.log(data);
//		if(data.code<0){
//			$("#imgWrapperRent").append("<p>"+data.msg+"</p>");
//			return;
//		}
//		data=data.body;
		var imgNum = 0;
//		// 判断是否为电子签
//		console.log(data);
		if(data[0].jrrTypeOfContract ==2){
		 var imgList = data[0].contractImgPaths;
		 console.log('111111111'+imgList);
		 var j;
		 for(var i in imgList){
			j = parseInt(i)+1;
			console.log(imgNum);
				if(imgNum == 0){
					$('#imgWrapperRent').append('<ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				
				$('#imgWrapperRent .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="" class="renterContractImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+imgList[i]+'.jpg" src="'+imgList[i]+'.jpg">' +
					'<input name="image" class="rentpicturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">电子合同'+j+'</p>' +
					'</li>');
				imgNum++;
			}
		$('#imageNumRent').html("图片：" + imgNum + "张    文件：" + 0 + "个");
		$(".renterContractImg").colorbox({
				rel : 'renterContractImg',
				transition : "none",
				width : "60%",
				height : "90%"
			});
		}
		var path = data[0].jrrImgPath;
		if (path == '' || path == null) {
			return;
		}
		var img = eval('([' + path.getRealJsonStr() + '])');
		var fileNum = 0;
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
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
					if(fileNum == 0){
						$('#imgWrapperRent').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#imgWrapperRent .fileList').append('<li>' +
						'<input name="other" class="rentpicturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+newUrls[i]+'" class="contFile" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
						'</li>');
					fileNum++;
				}
			}
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				var j = parseInt(i) + parseInt(img.length);
				if(ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png"){
					if(imgNum == 0){
						$('#imgWrapperRent').append('<ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#imgWrapperRent .imageList').append('<div style="clear:both"></div><li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="renterContractImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="rentpicturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#imageNumRent').html("图片：" + imgNum + "张    文件：" + fileNum + "个");
			$(".renterContractImg").colorbox({
				rel : 'renterContractImg',
				transition : "none",
				width : "60%",
				height : "90%"
			});
		});
	//});
}
//刷新
function refreshRent(){
	var data=DATA;
//	var row = $("#tenantDg").datagrid("getSelected");
//	if(row){
		doCancelRent();
		showRentPicture(data);
//	}
}
//删除合约图片
function removeRenterContract(){
	var photos = $('.contFile');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removeRentPicture').html('请选择要删除的图片').show();
		$('.rentpicturecheck').show();
		$('#doRemoveRentPic').show();
	}
}
//执行删除图片
function doRemoveRent(){
	var flag = true;
	var row = $("#tenantDg").datagrid("getSelected");
	var arr = 0;
	var path = '';
	var imgPaths = row.jrrImgPath;
	var chk = $('.rentpicturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapperRent input[name='image']:checked").each(function() { // 遍历选中的checkbox
			if(imgPaths.search($(this).parent().children("img").attr('src').split("?")[0]) == -1){
				flag = false;
			}
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapperRent input[name='other']:checked").each(function() { // 遍历选中的checkbox
			if(imgPaths.search($(this).parent().children("img").attr('src').split("?")[0]) == -1){
				flag = false;
			}
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		if(flag){
			$.post("../deleteRentContPic.action",{
				jrrId : row.jrrId,
				jrrImgPath : path
			}, function(data) {
				if (data <0 || data=='') {
					myTips('删除失败！', 'error');
					return;
				} else {
					myTips('删除成功！', 'success');
					showRentPicture(row.jrrId);
				}
			});
		}else{
			myTips('电子合同不能被删除，请重新选择', 'error');
		}
		doCancelRent();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
//取消删除图片
function doCancelRent(){
	$('#removeRentPicture').hide();
	$('.rentpicturecheck').hide().removeAttr('checked');
	$('#doRemoveRentPic').hide();
}
/***********************************************************租客合约上传end****************************************************************/
