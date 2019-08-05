//短租设置信息
setUp = {};
//价格方案信息
pricePlanInfo = {};
//渠道信息
channelInfo = {};
	
$(function () {
	$('#pricePlanTable').datagrid({
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			openPricePlan(1,rowData);
		}
	});
	getDeviceInfo();

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if(e.target.hash=='#ttab7'){
			getSetUpInfo();
		}

		e.target // newly activated tab
		e.relatedTarget // previous active tab
	})

});
//查询服务
function getSetUpInfo(){
	$.ajax({
		url:"../getSetUpInfo.action",
		type:"post",
		data:{
			jsrsuId : 1,
		},
		success:function(result){
			if(result.code == 1){
				var data = JSON.parse(result.body);
				data = data[0];
				var info = data;
				for(var i in info){
					$("#" + i).val(info[i])
					if(i=='jsrsuShopAccount' || i == 'jsrsuCashAccount'){
						var fa = $("#" + i);
						fa.find('.accountType').append('<option></option>');
						fa.find('.accountName').append('<option></option>');
						for (var j in _acountType) {
							fa.find('.accountType').append("<option value='" + _acountType[j] + "'>" + _acountType[j] + "</option>");
						}
						var accountId = info[i];
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
				setUp = data;
				jsrsuRoomTypeList = JSON.parse(data.jsrsuRoomType);
				//将对象里面字符串转化为对象
				var newdata=JSON.parse(data.jsrsuRoomType);
				var html="";
				for(var i in newdata){
					var index = parseInt(i) + 1;
					html += '<div class="jsrsu" style="margin: 10px 0 0 0px"><input id="configurationInfo'+index+'" value="'+newdata[i].configurationInfo+'" type="hidden">房型: <input class="jsrsuRoomTypeItem" value="'+newdata[i].roomType+'" style="width:100px;margin-right:20px" />'
					+'<button class="easyui-linkbutton" plain="false" style="margin-right:10px" onclick="setRoomConfiguration('+index+')"">房型配置</button>'
					+'<button class="easyui-linkbutton" plain="false" onclick="checkPic('+index+')"">上传图片</button>'
					+'<img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -7px 0" /></div>';
				}
				$("#jsrsuRoomType").html(html);
				//押金支付方式
				$('#onlineDepositPrcent').val(data.jsrsuRoomChargePercent);
				if(data.jsrsuDepositRules == 0){//线上支付
					$('#depositPayOnline').attr("checked", "true");
					$('#onlineDepositPrcent').attr("readOnly","true");
				}else{							//现场支付
					$('#depositPayScene').attr("checked", "true");
					$('#onlineDepositPrcent').attr("readOnly",false);
				}
				$(":checkbox").click(function(){
					var flag = $(this).is(':checked');
			        if (flag) {
			            $(this).siblings("input").attr("checked", false);
			        }
			    });
				
				//押金设置规则
				if(data.jsrsuDepositSetType != null){
					var jsrsuDepositSetType = JSON.parse(data.jsrsuDepositSetType)
					if(jsrsuDepositSetType.type == 1){
						$('#depositMoney').val(jsrsuDepositSetType.depositMoney);
						$('#depositSetType').attr("checked", "true");
						$('#depositMoney').attr("readOnly",false);
					}else{
						$('#depositMoney').val("0.00");
						$('#depositSetType').attr("checked", false);
						$('#depositMoney').attr("readOnly", "true");
					}
				}
			}else{
				myTips("查询短租设置表失败","error")
			}
			openSetUp();
		}
	})
}

function getDeviceInfo(){
	$.ajax({
		type:"post",
		url:"../queryDevice.action",
		data:{
			devId:"41",
			devBrandId:20
		},
		dataType:"json",
		async:false,
		success:function(data){
		}
	});
}

function openSetUp(){
    console.log(setUp)
	//动态加载短租设置信息
	for(var i in setUp){
		$("#" + i).val(setUp[i]);
	}
	if(setUp.jsrsuTradingRules != null && setUp.jsrsuTradingRules != ""){
		//动态加载公众号交易规则
		var newjsrsuTradingRules=JSON.parse(setUp.jsrsuTradingRules);
		for(var j in newjsrsuTradingRules){
			$("#" + j).val(newjsrsuTradingRules[j]);
		}
	}

	$('#serviceCharge')
			.datagrid(
					{
						columns : [ [
							{
								field : 'popservice',
								title : '服务',
								width : 25,
								align : 'center',
								editor : 'textbox'
							},
								{
									field : 'popcharge',
									title : '金额',
									width : 15,
									align : 'center',
									editor : 'textbox'
								},
								{
									field : 'deleteAdd',
									title : '删除',
									width : 10,
									align : 'center',
									formatter : function(value, row, index) {
										return "<a href='#' onclick=\"myDeleteRows('"+row.popservice+"','popservice','serviceCharge',0)\">删除</a>";
									}
								} ] ],
						width : '100%',
						height : '100%',
						singleSelect : true,
						autoRowHeight : false,
						scrollbarSize : 0,
						showPageList : false,
						fitColumns : true,
						jdonClickCell : jdonClickCell1,//点击一个单元格的时候触发
	});
	//field加载服务消费
	
	if(setUp.jsrsuServiceCharge!="" && setUp.jsrsuServiceCharge!=null){
		var newjsrsuServiceCharge=JSON.parse(setUp.jsrsuServiceCharge);
		$('#serviceCharge').datagrid('loadData',newjsrsuServiceCharge);
	}
	
	//加载钟点房使用规则
	var jsrsuHourRoom=JSON.parse(setUp.jsrsuHourRoom);
	for(var r in jsrsuHourRoom){
		$("#" + r).val(jsrsuHourRoom[r]);
	}
	
	//电子门牌设置

	var jsrsuElectronicDoorplateno = JSON.parse(setUp.jsrsuElectronicDoorplateno);
	for(var k in jsrsuElectronicDoorplateno){
		if(k == jsrsuElectronicDoorplateno[k].keyNumber){
			$('#key'+k).val(jsrsuElectronicDoorplateno[k].keyName);
			if($('#key'+k).val() == "已入住"){
				var e = $('#key'+k).parent().next();
				e.show();
				if(jsrsuElectronicDoorplateno[k].scenarioMode == 0){
					e.children().attr("checked", false);
				}else{
					e.children().attr("checked", "true");
				}
			}
		}
	}
}

function jdonClickCell1(index, field) {
	if (endEditing1(field)) {
		$('#serviceCharge').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex1 = index;
	}
}

function getInputItem(id){
	var array = [];
	$("#"+id+" .jsrsu").each(function (index){
		var item = {};
		var num = index+1;
		item["roomType"] = $(this).children(".jsrsuRoomTypeItem").val();
		item["configurationInfo"] = $(this).children("#configurationInfo"+num+"").val();
//		item["jsrrtpPlanNumber"] = index;
		array.push(item);
	});
	return JSON.stringify(array);
}
//打开添加服务消费窗口
function addService(){
	$('#addServiceDlg').dialog({
		title : "添加服务",
		top : getTop(-250),
		left : getLeft(-120),
//		top :  400,
//		left : 620,
		width : 300,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#service').val('');
			$('#charge').val('');
		}
	});
	/*var input =document.getElementById("charge");
	var regex = /^[0-9A-F]+$/;
	if(!regex.test(input.value)){
	}*/
	$('#addServiceDlg').dialog('open');
}

//保存添加服务消费窗口
function doservice(){
	var service=$('#service').val();
	var charge=$('#charge').val();
	if(service !="" && charge !=""){
		var rows=$('#serviceCharge').datagrid("getRows");
	}
	obj={};
	obj.popservice=service;
	obj.popcharge=charge;
	rows.push(obj);
	$('#serviceCharge').datagrid('loadData',rows);
	$('#addServiceDlg').dialog('close');
}

//短租设置保存
function doSetUp(){
	var jsrsuCheckInTime = $("#jsrsuCheckInTime").val();
	var jsrsuCheckOutTime = $("#jsrsuCheckOutTime").val();
	var jsrsuWxgzhTitle = $("#jsrsuWxgzhTitle").val();
	var jsrsuState = $("#jsrsuState").val();
	var jsrsuRefundRoomCharge = $("#jsrsuRefundRoomCharge").val();
	var jsrsuRefundRoomChargeTime = $("#jsrsuRefundRoomChargeTime").val();
	var jsrsuAdImgs = $("#jsrsuAdImgs").val();
	var jsrsuTelphone = $("#jsrsuTelphone").val();
	var jsrsuGrogshopIntroduce = $("#jsrsuGrogshopIntroduce").val();
    var jsrsuLongestBookingDays =$("#jsrsuLongestBookingDays").val();//最长订房天数
    var jsrsuFutureBookingDays =$("#jsrsuFutureBookingDays").val();//未来多少天可以预定
	var jsrsuRoomType = getInputItem('jsrsuRoomType');
	//公众号交易规则
	var jsrsuPredeterminedMode=$("#jsrsuPredeterminedMode").val();
	var jsrsuCheckInMode=$("#jsrsuCheckInMode").val();
	var jsrsuOnlineDepositRatio=$("#jsrsuOnlineDepositRatio").val();
	var jsrsuOtherExpenses=$("#jsrsuOtherExpenses").val();
	var jsrsuTradingDeposit=$("#jsrsuTradingDeposit").val();
	var jsrsuAddGuest=$("#jsrsuAddGuest").val();
	var jsrsuInstructionsForAdmission=$("#jsrsuInstructionsForAdmission").val();
	var rows=$('#serviceCharge').datagrid("getRows");
	var serviceData=JSON.stringify(rows);

	var obj={}
	obj.jsrsuPredeterminedMode=jsrsuPredeterminedMode;
	obj.jsrsuCheckInMode=jsrsuCheckInMode;
	obj.jsrsuOnlineDepositRatio=jsrsuOnlineDepositRatio;		//在线订金比
	obj.jsrsuOtherExpenses=jsrsuOtherExpenses;
	obj.jsrsuTradingDeposit=jsrsuTradingDeposit;
	obj.jsrsuAddGuest=jsrsuAddGuest;
	obj.jsrsuInstructionsForAdmission=jsrsuInstructionsForAdmission;
	var jsrsuTradingRules =JSON.stringify(obj);
	
	//钟点房使用规则
	var hourRoomStartTime=$('#hourRoomStartTime').val();		//钟点房开始使用时间段
	var hourRoomEndTime=$('#hourRoomEndTime').val();			//钟点房结束使用时间段
	var hourRoom=$('#hourRoom').val();							//钟点房选择时间段
	var objRoom={}
	objRoom.hourRoomStartTime=hourRoomStartTime;			
	objRoom.hourRoomEndTime=hourRoomEndTime;
	objRoom.hourRoom=hourRoom;
	var jsrsuHourRoom =JSON.stringify(objRoom);
	
	//押金支付方式 0为线上支付；1为现场支付
	var jsrsuDepositRules = "";
	$("input[name='depositPay']:checkbox").each(function() {
		if($(this).is(":checked")) {
			jsrsuDepositRules = $(this).val();
		}
	});
	
	//押金设置规则
	var depositSetType = {};
	var depositMoney = "";
	if($('#depositSetType').is(":checked")) {
		depositSetType.type = 1;
		depositMoney = $('#depositMoney').val()
	}else{
		depositSetType.type = 0;
		depositMoney = 0.00;
	}
	depositSetType.depositMoney = parseFloat(depositMoney).toFixed(2);
	
	//在线定金比
	var onlineDepositPrcent = $('#onlineDepositPrcent').val();
	
	//电子门牌设置
	var jsrsuElectronicDoorplateno = [];
	$(".electronicDoorplateno").each(function (index){
		var item = {};
		item["keyNumber"] = index;
		console.log(index)
		item["keyName"] = $(this).children('.key').find("option:selected").val();
		item["scenarioMode"] = $(this).next().children().is(":checked")?1:0;
		jsrsuElectronicDoorplateno.push(item);
	});

	//客房密码设置(天猫精灵密码)
	var jsrsuTmPassword = $('#jsrsuTmPassword').val();
	jsrsuTmPassword = jsrsuTmPassword==''?"fzz123":jsrsuTmPassword;
	console.log("天猫精灵的密码 "+jsrsuTmPassword);
	
	$.ajax({
		url:"../updateSetUp.action",
		type:"post",
		data:{
			jsrsuId : 1,
			jsrsuCheckInTime : jsrsuCheckInTime,
			jsrsuCheckOutTime : jsrsuCheckOutTime,
			jsrsuWxgzhTitle : jsrsuWxgzhTitle,
			jsrsuState:jsrsuState,
			jsrsuAdImgs:jsrsuAdImgs,
			jsrsuRoomType:jsrsuRoomType,
			jsrsuTelphone:jsrsuTelphone,
			jsrsuTradingRules:jsrsuTradingRules,
			jsrsuServiceCharge:serviceData,
			jsrsuHourRoom:jsrsuHourRoom,
			jsrsuDepositRules:jsrsuDepositRules,
			jsrsuRoomChargePercent:onlineDepositPrcent,
			jsrsuRefundRoomCharge:jsrsuRefundRoomCharge,
			jsrsuRefundRoomChargeTime:jsrsuRefundRoomChargeTime,
			jsrsuGrogshopIntroduce:jsrsuGrogshopIntroduce,
            jsrsuLongestBookingDays:jsrsuLongestBookingDays,
            jsrsuFutureBookingDays:jsrsuFutureBookingDays,
			jsrsuDepositSetType:JSON.stringify(depositSetType),
			jsrsuElectronicDoorplateno:JSON.stringify(jsrsuElectronicDoorplateno),
			jsrsuTmPassword:jsrsuTmPassword
		},
		success:function(result){
			if(result.code == 1){
				myTips("成功","success");
				$("#roomConfiguration").dialog('close');
				getSetUpInfo();
	//			ergodicInputItem(info.cgsuCommunity,'jsrsuRoomType');
			}else{
				myTips("修改失败","error");
			}
		}
	})
}
//添加房型字段
function addInput(id){
	var num = $('#jsrsuRoomType .jsrsu').length+1;
	var html = '<div class="jsrsu" style="margin: 10px 0 0 0px"><input id="configurationInfo'+num+'" type="hidden">房型: <input class="jsrsuRoomTypeItem" style="width:100px;margin-right:20px" />'
	+'<button id="configurationButton'+num+'" class="easyui-linkbutton" plain="false" style="margin-right:10px" onclick="setRoomConfiguration('+num+')"">房型配置</button>'
	+'<img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -7px 0" /></div>';

	$("#" + id).append(html);
}
//删除房型字段
$("#jsrsuRoomType,#address").delegate(".cleanItem","click",function(){
	$(this).parent().remove();
})

//type==0 开始时间  type==1结束时间
function calendar(type,num){
	$("#addPlanDiv .setRoomTypePlan").each(function (index){
		if(num==index){
			var beginTimeId = "jsrsuBeginTime"+num;
			var endTimeId = "jsrsuEndTime"+num;
			if(type==0){
				WdatePicker({minDate:'%y-%M-01',maxDate:"#F{$dp.$D(\'"+endTimeId+"\',{d:-1});}",dateFmt:"yyyy-MM-dd",autoPickDate:true});
			}
			if(type==1){
				WdatePicker({minDate:"#F{$dp.$D(\'"+beginTimeId+"\',{d:0});}",maxDate:"%y-%M-%ld",dateFmt:"yyyy-MM-dd",autoPickDate:true});
			}
		}
	});
}

/***********************************************************短租广告图片上传start****************************************************************/
//电脑上传
function uploadJdPic(){
	$('#uploadDlg input[clear=true]').val('');
	var att = randomn(9);
	$("#jsrsuId").val(1);
	
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
			jdRefresh();
		}
	});
	creatQr();
	$.post("../pubupload/getUpTokenCallback.action",function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		
		$("#token").val(token);
		$("#co").val(co);
		
		initUploader();
		doJdCancel();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creatQr(){
	$.post("../pubupload/getMobUploadUrl.action",{
		jsrsuId : $("#jsrsuId").val()
	},function(data){
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doJdCancel();
	});
}

//查看图片
function checkPic(type) {
	if(type==0){
		$('#jsrsu_room_type').val("");
	}else{
		$('#jsrsuRoomType .jsrsu').each(function(index){
			if(type == (index+1)){
				$('#jsrsu_room_type').val($(this).children('.jsrsuRoomTypeItem').val());
			}
		})
	}
	
	doJdCancel();
	showPic();
}
//删除图片
function removeJdPic(){
	var photos = $('.contFile');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removeJdPicture').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemoveJdPic').show();
	}
}
//执行删除图片
function doRemoveJdPic(){
	var arr = 0;
	var path = '';
	var chk = $('.picturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgJDWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgJDWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		$.post("../deleteShortRentAdImg.action",{
			jsrsuId : 1,
			jsrsuAdImgs : path
		}, function(data) {
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				showPic();
			}
		});
		doJdCancel();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
//取消删除图片
function doJdCancel(){
	$('#removeJdPicture').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemoveJdPic').hide();
}
function showPic(){
	$('#adImgDlg').dialog({
		title : '查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgJDWrapper").empty();
		},
	});
	$("#imgJDWrapper").empty();
	$.post("../getSetUpInfo.action",{
		jsrsuId:1
	}, function(data) {
		if(data.code < 0){
			$("#imgJDWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		data=JSON.parse(data.body);
		var path = data[0].jsrsuAdImgs;
		$('#adImgDlg').dialog('open');
		if (path == null) {
			return;
		}
		var img = eval('([' + path + '])');
		var imgNum = 0;
		var fileNum = 0;
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgJDWrapper').append('<ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgJDWrapper .fileList').append('<li>' +
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
					$('#imgJDWrapper').append('<ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgJDWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="adImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
		$(".adImg").colorbox({
			rel:'adImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//刷新
function jdRefresh(){
	doJdCancel();
	showPic();
}
/***********************************************************短租广告图片上传end****************************************************************/

//账户类型和账号联动
function jdChangeWay(evet) {
	var fa = $(evet).parent().parent();
	var faPaymentType = fa.find(".accountType1").find("option:selected").text();
	
	fa.find(".accountName").empty();
	fa.find(".accountName").append("<option></option>");
	fa.find(".accountId").val("");
	fa.find(".accountNum").val("");
	fa.find(".accountBelong").val("");
	if(faPaymentType == ""){
		return;
	}
	$.post("../selectNamePublic.action", {
		faPaymentType:faPaymentType,
	}, function(data) {
		fa.find(".accountName").empty();
		fa.find(".accountName").append("<option></option>");
		for (var i in data.body) {
			fa.find(".accountName").append("<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
		}
	});
}
function jdGetAccountId(evet) {
	var fa = $(evet).parent().parent();
	
	var data = fa.find(".accountName").val();
	if(data == ''){
		fa.find(".accountId").val("");
		fa.find(".accountBelong").val("");
		fa.find(".accountNum").val("");
	}else{
		fa.find(".accountId").val(data.split("*#*")[0])
		fa.find(".accountBelong").val(data.split("*#*")[1])
		fa.find(".accountNum").val(data.split("*#*")[2])
	}
}

function updateShopSetUp(){
	var jsrsuShopAccount = $("#jsrsuShopAccount").find(".accountId").val();
	var jsrsuCashAccount = $("#jsrsuCashAccount").find(".accountId").val();
	$.ajax({
		type:"post",
		url:"../updateSetUp.action",
		data:{
			jsrsuId : 1,
			jsrsuShopAccount:jsrsuShopAccount,
			jsrsuCashAccount:jsrsuCashAccount
		},
		dataType:"json",
		success:function(data){
			if(data.code == 1){
				myTips("修改成功","success");
			}else{
				myTips("修改失败","error");
			}
		}
	});
}

//押金支付方式
function depositPayType(type){
	$(":checkbox").click(function(){
		var flag = $(this).is(':checked');
        if (flag) {
            $(this).siblings("input").attr("checked", false);
        }
    });
	if(type == 0){
		$('#onlineDepositPrcent').val('100');
		$('#onlineDepositPrcent').attr("readOnly","true");
	}else{
		$('#onlineDepositPrcent').attr("readOnly",false);
	}
}

//押金设置规则
function depositSetType(){
	$(":checkbox").click(function(){
		var flag = $(this).is(':checked');
        if (flag) {
            $('#depositMoney').attr("readOnly",false);
        }else{
        	$('#depositMoney').attr("readOnly","true");
        }
    });
}

function checkKeyName(type){
	$('.electronicDoorplateno').each(function(index){
		if(type == index){
			var keyName = $("#key"+index).find("option:selected").val();
			var e = $("#key"+index).parent().next();
			if(keyName == "已入住"){
				e.show();
			}else{
				e.children().attr("checked",false);
				e.hide();
			}
			return false;
		}
	})
}


//房型配置设置  num用于区分不同房型
function setRoomConfiguration(num){
	//房间配置
	var configurationInfo = $('#configurationInfo'+num+'').val().split(" ");
	$("#roomConfiguration .btn").each(function(){
		for (var i in configurationInfo) {
			if($(this).val() == configurationInfo[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	
	var roomType = JSON.parse(setUp.jsrsuRoomType)[num-1].roomType;
	$('#roomConfiguration').dialog({
		title : roomType+"的配置",
		top : getTop(220),
		left : getLeft(780),
		width : 780,
		height : 220,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#roomConfiguration .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
		}
	});
	$("#doSetConfiguration").attr("onclick","doSetConfiguration("+num+")")
	$("#roomConfiguration").dialog('open');
}

//房间配置
$('.configuration button').click(function(){
	if ($(this).hasClass('btn-default')) {
		$(this).removeClass('btn-default');
		$(this).addClass('btn-success');
	} else {
		$(this).removeClass('btn-success');
		$(this).addClass('btn-default');
	}
});

//保存房型配置
function doSetConfiguration(num){
	var roomConfiguration= '';
	$(".configuration .btn").each(function(){
		if($(this).hasClass('btn-success')){
			roomConfiguration += $(this).val();
			roomConfiguration += ' ';
		}
	});
	$('#configurationInfo'+num+'').val(roomConfiguration);
	
	doSetUp();
}

/**
 * 获取输入时间 前 day 天 或者 后 day 天
 * 格式为yyyy-MM-dd hh:mm:ss
 */
function getNextDate(time,day){
	var date = new Date(time).getTime() + day * 1000 * 60 * 60 * 24;
	var newDate = new Date(date).format("yyyy-MM-dd");
	return newDate;
}
