$(function(){
	$.ajax({
		type:"post",
		url:"../selectShopSetUp.action",
		data:{
			cgsuId:1
		},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.code == 1){
				var info = data.body[0];
				console.log(info)
				for(var i in info){
					$("#" + i).val(info[i])
					if(i=='cgsuShopAccount' || i == 'cgsuCashAccount'){
						var fa = $("#" + i);
						fa.find('.accountType').append('<option></option>');
						fa.find('.accountName').append('<option></option>');
						for (var j in _acountType) {
							fa.find('.accountType').append("<option value='" + _acountType[j] + "'>" + _acountType[j] + "</option>");
						}
						var accountId = info[i];
						if(info[i] != null && info[i] != ""){
							$.ajax({
								type:"post",
								url:"../selectNamePublic.action",
								data:{
									faId :accountId
								},
								dataType:"json",
								async:false,
								success:function(account){
									fa.find(".accountName").empty();
									fa.find(".accountType").val(account.body[0].faPaymentType);
									//为了查出该种类的其他数据
									$.ajax({
										type:"post",
										url:"../selectNamePublic.action",
										data:{
											faPaymentType: account.body[0].faPaymentType,
										},
										dataType:"json",
										async:false,
										success:function(result){
											for (var k in result.body) {
												if(result.body[k].faId == accountId){
													fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "' selected='selected'>" + result.body[k].faUserName + "</option>");
													fa.find(".accountId").val(result.body[k].faId);
													fa.find(".accountNum").val(result.body[k].faAccount);
													fa.find(".accountBelong").val(result.body[k].faBelonging);
												}else{
													fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "'>" + result.body[k].faUserName + "</option>");
												}
											}
										}
									})
								}
							})
						}
					}
				}
				ergodicInputItem(info.cgsuAdFont,'ad');
				ergodicInputItem(info.cgsuCommunity,'address');
			}else{
				myTips("查询商超设置表失败","error");
			}
		}
	});
});
function ergodicInputItem(dataStr,id){
	var data = JSON.parse(dataStr.getRealJsonStr());
	var html = '<div style="margin:0 0 0 0px"><input class="'+id+'Item" value="" style="width:280px;margin:10px 0 0 0" /></div>';
	
	for(var i in data){
		if(i == 0){
			html = '<div style="margin:0 0 0 0px"><input class="'+id+'Item" value="'+data[i][id]+'" style="width:280px;margin:10px 0 0 0" /></div>'
		}else{
			html += '<div style="margin: 10px 0 0 0px"><input class="'+id+'Item" value="'+data[i][id]+'" style="width:280px;" /><img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -5px 10px" /></div>'
		}
	}
	
	$("#" +id).html(html)
}
function updateShopSetUp(){
	var cgsuGisongjine = $("#cgsuGisongjine").val();
	var cgsuShippingFee = $("#cgsuShippingFee").val();
	var cgsuOweState = $("#cgsuOweState").find("option:selected").val();
	var cgsuOweMax = $("#cgsuOweMax").val();
	var cgsuShopName = $("#cgsuShopName").val();
	var cgsuFreeShippingFeeNum = $("#cgsuFreeShippingFeeNum").val();
	var cgsuAdFont = getInputItem('ad');
	var cgsuCommunity = getInputItem('address');

	var cgsuShopAccount = $("#cgsuShopAccount").find(".accountId").val();
	var cgsuCashAccount = $("#cgsuCashAccount").find(".accountId").val();
	
	var cgsuBeginTime = $("#cgsuBeginTime").val();
	var cgsuEndTime = $("#cgsuEndTime").val();
	var cgsuState = $("#cgsuState option:selected").val();
	if(CompareDate(cgsuBeginTime,cgsuEndTime)){
		myTips("营业开始时间不能大于营业结束时间","error");
		return;
	}
	
	$.ajax({
		type:"post",
		url:"../updateShopSetUp.action",
		data:{
			cgsuGisongjine:cgsuGisongjine,
			cgsuShippingFee:cgsuShippingFee,
			cgsuOweState:cgsuOweState,
			cgsuOweMax:cgsuOweMax,
			cgsuShopName:cgsuShopName,
			cgsuFreeShippingFeeNum:cgsuFreeShippingFeeNum,
			cgsuAdFont:cgsuAdFont,
			cgsuCommunity:cgsuCommunity,
			cgsuId : 1,
			cgsuShopAccount:cgsuShopAccount,
			cgsuCashAccount:cgsuCashAccount,
			cgsuBeginTime:cgsuBeginTime,
			cgsuEndTime:cgsuEndTime,
			cgsuState:cgsuState
		},
		dataType:"json",
		success:function(data){
			if(data.code == 1){
				$('#shopSetUpDlg').dialog('close');
				myTips("修改成功","success");
			}else{
				myTips("修改失败","error");
			}
		}
	});
}
function getInputItem(id){
	var array = [];
	
	$("#"+id+" ."+id+"Item").each(function (){
		var item = {};
		item[id] = $(this).val();
		array.push(item);
	})
	
	return JSON.stringify(array)
}
function CompareDate(t1,t2){
	var date = new Date();
	var a = t1.split(":");
	var b = t2.split(":");
	return date.setHours(a[0],a[1]) > date.setHours(b[0],b[1]);
}
//查看图片
function checkPic() {
	doCancel();
	showPic();
}
//取消删除图片
function doCancel(){
	$('#removePicture').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic').hide();
}
function showPic(){
	$('#shopImgDlg').dialog({
		title : '查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapper").empty();
		},
	});
	$("#imgWrapper").empty();
	$.post("../selectShopSetUp.action",{
		cgsuId:1
	}, function(data) {
		if(data.code < 0){
			$("#imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		data=data.body;
		var path = data[0].cgsuAdImgPath;
		$('#shopImgDlg').dialog('open');
		if (path == null) {
			return;
		}
		var img = eval('([' + path.getRealJsonStr() + '])');
		var imgNum = 0;
		var fileNum = 0;
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapper .fileList').append('<li>' +
						'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+img[i].path+'" class="contFile" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
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
					$('#imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="shopAdImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
		$(".shopAdImg").colorbox({
			rel:'shopAdImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//电脑上传
function uploadPic(){
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
			refresh1();
		}
	});
	creatQr1();
	$.post("../pubupload/getUpTokenCallback.action",function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$('#uploadDlg input[clear=true]').val('');
		$("#token").val(token);
		$("#co").val(co);
		$("#cgsuId").val("1");
		$("#type").val("2");
		initUploader();
		doCancel1();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creatQr1(){
	$.post("../pubupload/getMobUploadUrl.action",{
		cgsuId : 1,
		type:2
	},function(data){
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel1();
	});
}
//刷新
function refresh1(){
	doCancel1();
	showPic1();
}
//取消删除图片
function doCancel1(){
	$('#removePicture1').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic1').hide();
}
function showPic1(){
	$('#shopLincenseImgDlg').dialog({
		title : '查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose: function(){
			var path = "";
			var flag = true;
			$("#shopLincenseImgDlg .shopLicenseImgDiv").each(function(){
				var url = $(this).find(".imgPath").attr("src");
				var name = $(this).find(".imgName").text();
				var title = $(this).find(".shopLicenseInput").val();
				if(title == "" || title == null){
					flag = false;
				}
				if(path == ""){
                    path = '{"path":"' + url + '","name":"' + name + '","title":"' +title+ '"}';
                }else{
                    path = path + ',{"path":"' + url + '","name":"' + name + '","title":"' + title+ '"}';
                }
			})
			if(!flag){
				myTips("有图片标题没有确定","error");
				return false;
			}else{
				$.ajax({
					type:"post",
					url:"../updateShopSetUp.action",
					data:{
						cgsuLicenseImg : path,
						cgsuId : 1
					},
					dataType:"json",
					success:function(data){
						if(data.code == 1){
						}else{
							myTips("修改失败","error");
						}
					}
				});
			}
		},
		onClose : function() {
			$("#imgWrapper1").empty();
		},
	});
	$("#imgWrapper1").empty();
	$.post("../selectShopSetUp.action",{
		cgsuId:1
	}, function(data) {
		if(data.code < 0){
			$("#imgWrapper1").append("<p>" + data.msg + "</p>");
			return;
		}
		data=data.body;
		var path = data[0].cgsuLicenseImg;
		$('#shopLincenseImgDlg').dialog('open');
		if (path == null) {
			return;
		}
		var img = eval('([' + path.getRealJsonStr() + '])');
		var imgNum = 0;
		var fileNum = 0;
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapper1').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapper1 .fileList').append('<li>' +
						'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+img[i].path+'" class="contFile" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
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
					$('#imgWrapper1').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapper1 .imageList').append('<li style="float:left;position:relative;" class="shopLicenseImgDiv">' +
					'<img title="'+img[i].name+'" class="shopLicenseImg contFile imgPath" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p class="imgName" style="position:absolute;bottom:50px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'<div style="margin: 0 0 0 70px">标题</div>' + 
					'<div><input style="width:157px" value="'+img[i].title+'" class="shopLicenseInput" /></div>' + 
					'<div><select onchange="updateFont(this)" class="shopLicenseSelect" style="width:157px"><option></option><option>营业执照</option><option>实体店经营</option><option>商标注册证书</option><option>食品流通许可证</option><option>食品经营许可证</option><option>印刷经营许可证</option><option>道路经营许可证</option><option>出版物经营许可证</option><option>特种行业经营许可证</option></select></div>'+
					'</li>'
					);
				imgNum++;
			}
		}
		$(".shopLicenseImg").colorbox({
			rel:'shopLicenseImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//删除图片
function removePic(){
	var photos = $('.contFile');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePicture').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemovePic').show();
	}
}
//刷新
function refresh(){
	doCancel();
	showPic();
}
function addInput(id){
	var html = '<div style="margin: 10px 0 0 0px"><input class="'+id+'Item" value="" style="width:280px;" /><img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -5px 10px" /></div>';
	
	$("#" + id).append(html);
}
$("#ad,#address").delegate(".cleanItem","click",function(){
	$(this).parent().remove();
})
