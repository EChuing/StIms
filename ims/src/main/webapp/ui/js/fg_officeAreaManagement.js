$(function(){
	loadSelectList();
	queryOffice(1,0);
	$("#virtualDataGrid").datagrid({
		// 表格行单击事件
		onClickRow : function(rowIndex, rowData) {
			_virtualIndex = rowIndex;
			var row = $('#virtualDataGrid').datagrid('getSelected');
			// 初始化跟进记录表
			queryFollow(row.houseCoding, 1, 0);
		},
		/*公区双击事件*/
		onDblClickRow : function(rowIndex, rowData) {
			$('#operationWindow').tabs({
				plain : true,
				fit : true,
				border	: false,
				onSelect : function(title, index) {
					// 获得点击选项卡的列数，调用表格初始化
					initTable(title);
				}
			});
			$("#operationWindow").tabs("select", 0);
			$("#searchBillingDateFrom").val("");
			$("#searchBillingDateTo").val("");
			doubleClickTheWindow();
		}
	});
	//耗材管理双击事件
	$('#suppliesInformation').datagrid({
		onDblClickRow : function(rowIndex, rowData){
			_indexNum[0] = rowIndex;
			$("#suppliesInfo_index").val(rowIndex);
			$('#suppliesInfoTabs').tabs({
				plain : true,
				fit : true,
				border	: false,
				onSelect : function(title, index) {
					// 获得点击选项卡的列数，调用表格初始化
					initTable1(index);
				}
			});
			$("#suppliesInfoTabs").tabs("select", 0);
			openSuppliesInfo();
			queryFollow();
		}
	});
	//资产选项卡
	$('#assetOperation').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$("#assetInfo_index").val(rowIndex);
			$('#assetInfoTabs').tabs({
				plain : true,
				fit : true,
				border	: false,
				onSelect : function(title, index) {
					// 获得点击选项卡的列数，调用表格初始化
					initTable2(index);
				}
			});
			$("#assetInfoTabs").tabs("select", 0);
			openAssetInfo();
			queryFollow1();
		}
	});
	//智能设备
	$('#deviceInfoTable').datagrid({
		// 表格行单击事件
		onClickRow: function (rowIndex, rowData) {
			if (rowData.devBrandId == 20 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
				$("#deviceControl").attr("onclick","subDevice()");
			}else if (rowData.devBrandId == 23 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
				$("#deviceControl").attr("onclick", "mdElectricBoxDlg()");
			}  else {
				$("#deviceControl").attr("onclick","chooseOperateDlg()");
			}

		},
		onDblClickRow : function(rowIndex, rowData) {
			console.log(rowData)
			if (rowData.devBrandId == 20 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
				subDevice();
			} else if (rowData.devBrandId == 23 && rowData.devFirstType == 16 && rowData.devSecondType == 16) {
				console.log("5555555555555s")
				mdElectricBoxDlg();
			} else if(rowData.devBrandId == 22 && rowData.devFirstType == 24 && rowData.devSecondType == 33){
				faceControl();
			}else {
				chooseOperateDlg();
			}
		}
	});
		
	$('#financialDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			readonlyDataToDb("readonlyPaymentInfoTable","financialDg");
		}
	});
	
	for (var i in _loginCompanyRentDistrict) {
	    $('#searchDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	    $('#searchAddDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
});


/**************************收支处理******************************/
//收支记录表导入信息
function queryFinancial(row, page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var startTime =  $('#searchBillingDateFrom').val();
	var endTime =  $('#searchBillingDateTo').val();
	$.post("../allvirtualPayments.action", {
		startNum : startNum,
		endNum : endNum,
		startTime:startTime,
		endTime:endTime,
		jfHouseId:row.houseCoding,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 9);
			$('#financialDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 9);
			}
			$("#financialDg").datagrid("loadData", data);
		}
	}, "json");
}
function formatDate(date){
  var year = date.getFullYear();       //年
  var month = date.getMonth() + 1;     //月
  var day = date.getDate();            //日
 
  var fmd = year + "-";
 
  if(month < 10){
  	fmd += "0";
  }
  fmd += month + "-";
 
  if(day < 10){
  	fmd += "0";
  } 
  fmd += day;

  return(fmd); 
} 
function within1weeks(){
	var date = new Date();
	var billingDateTo = formatDate(date);
	date.setDate(date.getDate()-6);
	var billingDateFrom = formatDate(date);
	$("#searchBillingDateFrom").val(billingDateFrom);
	$("#searchBillingDateTo").val(billingDateTo);
	$('#oneWeek').addClass("choose-cur");
	$('#oneMonth').removeClass("choose-cur");
	$('#threeMonths').removeClass("choose-cur");
	var row = $('#virtualDataGrid').datagrid('getSelected');
	queryFinancial(row,1,0);
}
function within1months(){
	var date = new Date();
	var billingDateTo = formatDate(date);
	date.setMonth(date.getMonth()-1);
	var billingDateFrom = formatDate(date);
	$("#searchBillingDateFrom").val(billingDateFrom);
	$("#searchBillingDateTo").val(billingDateTo);
	$('#oneWeek').removeClass("choose-cur");
	$('#oneMonth').addClass("choose-cur");
	$('#threeMonths').removeClass("choose-cur");
	var row = $('#virtualDataGrid').datagrid('getSelected');
	queryFinancial(row,1,0);
}
function within3months(){
	var date = new Date();
	var billingDateTo = formatDate(date);
	date.setMonth(date.getMonth()-3);
	var billingDateFrom = formatDate(date);
	$("#searchBillingDateFrom").val(billingDateFrom);
	$("#searchBillingDateTo").val(billingDateTo);
	$('#oneWeek').removeClass("choose-cur");
	$('#oneMonth').removeClass("choose-cur");
	$('#threeMonths').addClass("choose-cur");
	var row = $('#virtualDataGrid').datagrid('getSelected');
	queryFinancial(row,1,0);
}
function querykufang(){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	queryFinancial(row, 1, 0);
	$('#oneWeek').removeClass("choose-cur");
	$('#oneMonth').removeClass("choose-cur");
	$('#threeMonths').removeClass("choose-cur");
}
/*****************************end********************************/

/***********************************************************审批附件查看start****************************************************************/
//查看图片
function showAttachmentHandle() {
	var row = $('#eventInfoTable').datagrid('getSelected');
	if(!row){
		myTips("请选择一条记录查看附件","error");
		return;
	}
	initAttachmentDlgHandle()
}
//初始化附件窗口
function initAttachmentDlgHandle(){
	$('#attachmentDlgHandle').dialog({
		title : '附件',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapperHandle").empty();
		},
	});
	showPictureHandle();
}
//显示图片
function showPictureHandle() {
	$("#imgWrapperHandle").empty();
	$('#attachmentDlgHandle').dialog('open');
	var row = $('#eventInfoTable').datagrid('getSelected');
	$.post("../selectEventApprovalById.action",{
		eaId : row.eaId
	}, function(data) {
		if (data.code<0) {
			$('#imageNumHandle').html("（图片：0张    文件：0个）");
			$(".attachmentNumHandle").html("（图片：0张    文件：0个）");
			return;
		}
		data=data.body[0];
		var path = data.eaImgPath.getRealJsonStr();
		var img = eval('([' + path + '])');
		var imgNum = 0;
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
						$('#imgWrapperHandle').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#imgWrapperHandle .fileList').append('<li>' +
						'<input name="other" class="picturecheckHandle" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+newUrls[i]+'" class="attachmentHandle" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
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
						$('#imgWrapperHandle').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#imgWrapperHandle .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="attachmentImg attachmentHandle" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="picturecheckHandle" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#imageNumHandle').html("（图片：" + imgNum + "张    文件：" + fileNum + "个）");
			$(".attachmentNumHandle").html("（图片：" + imgNum + "张    文件：" + fileNum + "个）");
			$(".attachmentImg").colorbox({
				rel : 'attachmentImg',
				transition : "none",
				width : "60%",
				height : "90%"
			});
		});
	}); 
}
//刷新
function refreshHandle(){
	showPictureHandle();
}
/***********************************************************审批附件查看end****************************************************************/
//查询审批
function queryEvent(page,type){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	$.post("../selectEventApproval.action", {
		startNum 		: startNum,
		endNum 			: endNum,
		eaHouseId		: row.houseCoding,
	},function(data){
		if (data.code<0) {
			$("#eventInfoTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			sourcePage(0,0,12);
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page,12);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].totalPage = taskCostTime(data[i].eaReleaseTime,data[i].eaUseTime);
				
				if ((data[i].eaRentId != null && data[i].eaRentId != '')||(data[i].eaStoreId != null && data[i].eaStoreId != '')||(data[i].eaHouseId != null && data[i].eaHouseId != '')) {
					data[i].detailAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
				} else {
					data[i].detailAddress = '无归属审批';
				}
				if(data[i].eaHomeType == "其他审批" || data[i].eaHomeType == "日常事务" || data[i].eaHomeType == "项目事务"){
					data[i].detailAddress = data[i].keyAdministrator;
				}
			}
			$("#eventInfoTable").datagrid("loadData", data);
		}
	});
}
//审批详情
function seeEvent(eaId){
	var row = $("#eventInfoTable").datagrid("getSelected");
	if (eaId != undefined) {
		var rows = $("#eventInfoTable").datagrid("getRows");
		for (var i in rows) {
			if (rows[i].eaId == eaId) {
				row = rows[i];
			}
		}
	}
	//将信息映射到表格中
	for (var i in row) {
		$('#seeEventDlg table.eventInfo .' + i).html(row[i]);
	}
	//按钮显示/隐藏
	if(row.eaEventState == "处理中" && row.eaEventHandler == _loginUserId){
		$("#openHandleBtn").show();
		if (row.eaAmountInvolved !=0 && row.eaWhetherGenerateRecord == '否') {
			$('#account').show();
		} else {
			$('#account').hide();
		}
	}else{
		$("#openHandleBtn").hide();
		$('#account').hide();
	}
	//付款信息表格显示/隐藏
	if (row.eaWhetherGenerateRecord == '是') {
		$('.payInfo').show();
	} else {
		$('.payInfo').hide();
	}
	//收款账户显示/隐藏
	if (row.eaBankName == '' && row.eaBankUsername == '' && row.eaBankAccountNumber == '') {
		$('.shoukuanzhanghu').hide();
	} else {
		$('.shoukuanzhanghu').show();
	}
	//赋值
	$("#eaId").val(row.eaId);
	$("#handlerId").val(_loginUserId);
	$("#handlerName").val(_loginUserName);
	if(row.eaHomeType != "其他审批"){
		$(".houseAddress").html(row.detailAddress);
	}else{
		$(".houseAddress").html(row.keyAdministrator);
	}
	$("#rentId").val(row.eaRentId);
	$("#storeId").val(row.eaStoreId);
	$("#houseId").val(row.eaHouseId);
	$('#eaApprovalNumber1').html(row.eaApprovalNumber);
	$(".eaAmountInvolved2").html(convertCurrency(row.eaAmountInvolved));
	var eaId = $("#eaId").val();
	$.post("../selectEventApprovalById.action",{
		eaId : eaId
	},function(data){
		data=data.body[0];
		var imgNum = data.eaImgNum;
		var img = imgNum.split("/")[0];
		var file = imgNum.split("/")[1];
		$(".attachmentNumHandle").html("（图片：" + img + "张    文件：" + file + "个）");
		$('#addCity').val(data.addCity);
		$('#addCommunity').val(data.addCommunity);
	});
	if (row.eaFinancialCoding != '') {
		$.post("../queryFinancialCommon.action",{
			jfFinancialCoding : row.eaFinancialCoding,
		},function(data){
			if (data.code<0) {
				return;
			}
			data=data.body[0];
			for (var i in data) {
				$('#seeEventDlg table.payInfo .' + i).html(data[i]);
			}
		});
	}
	$("#seeEventDlg").dialog({
		title : "查看 " + row.eaEventType +" 审批单",
		top : getTop(500),
		left : getLeft(650),
		width : 650,
		height : 530,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#seeEventDlg [notes="notes"]').val('');
		}
	});
	$("#seeEventDlg").dialog('open');
	if ($('#showProcessTable').hasClass('datagrid-f')) {

	} else {
		$('#showProcessTable').datagrid({
			columns : [ [
				{
					field : 'node',
					title : '审批节点',
					width : 15,
					align : 'center'
				},
				{
					field : 'name',
					title : '审批人',
					width : 15,
					align : 'center'
				},
				{
					field : 'advise',
					title : '审批意见',
					width : 45,
					align : 'center'
				},
				{
					field : 'time',
					title : '审批时间',
					width : 25,
					align : 'center'
				} ] ],
			width : '100%',
			height : '100%',
			singleSelect : true,
			autoRowHeight : false,
			pagination : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#showProcessTable').datagrid('getSelected');
				showHandleInfo(row);
			}
		});
	}
	queryEventProcess(row);
}
//查审批流程记录
function queryEventProcess(row) {
	$('#showProcessTable').datagrid({
		data : [],
	});
	if(row.eaTreatmentOpinion != null && row.eaTreatmentOpinion != ""){	
		var data = eval('(' + '[' +  row.eaTreatmentOpinion.getRealJsonStr().replace(/\n/g, "&nbsp;&nbsp;&nbsp;&nbsp;") + ']' + ')');
		var inData = "";
		if(data.length == 1){
			$('#showProcessTable').datagrid({
				data : data,
			});
		}else{
			for(var i=data.length-1;i>=0;i--){
				if(i==data.length-1){
					inData += JSON.stringify(data[i]);
				}else{
					inData += ","+JSON.stringify(data[i]);
				}
			}
			inData = eval('(' + "[" + inData + "]" + ')');
			$('#showProcessTable').datagrid({
				data : inData,
			});
		}
	}else{
		$('#showProcessTable').datagrid({
			data : [],
		});
	}
}

//单条审批记录详情
function showHandleInfo(row){
	$('#handleInfo').dialog({
		title : '详细处理信息',
		top : getTop(300),
		left : getLeft(600),
		width : 600,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#handleInfo span').text('');
		},
	});
	for(var i in row){
		if(i == "advise"){
			$('#readHandle_'+i).html(row[i].replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "<br/>"));
		}else{
			$('#readHandle_'+i).html(row[i]);
		}
	}
	$('#handleInfo').dialog('open');
}
//上一条下一条
function laterOrNext2(type) {
	var dataIndex = $("#event_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;

			$("#event_index").val(num);
			changeData = $('#eventInfoTable').datagrid('getData').rows[num];
			$('#eventInfoTable').datagrid('selectRow',num); 

		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#eventInfoTable").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#event_index").val(num);
			changeData = $('#eventInfoTable').datagrid('getData').rows[num];
			$('#eventInfoTable').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	if (changeData.length != 0) {
		for (var i in changeData) {
			if (changeData[i] == null) {
				changeData[i] = '';
			}
		}
		seeEvent();
	}
}
//添加审批
function addEvent(){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if(!row){
		myTips("请选择一条记录","error");
		return;
	}
	$("#addEventDlg").dialog({
		title : "添加审批",
		top : getTop(340),
		left : getLeft(640),
		width : 640,
		height : 340,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addEventDlg [clear="clear"]').val('');
			$('#addEventDlg [clear="clear"]').html('');
			$('#addEventDlg [choose="choose"]').val('');
			$('#addEventDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#shorMessageRemind1').prop({checked:false});
			$('#ifSpeed').prop({checked:false});
			clearAttachment();
		}
	});
	clear();
	$('#payBankInfo').hide();
	$('#eaApprovalNumber').val(approvalNumber());
	$('.houseId').val(row.houseCoding);
	$('.houseType').val('其他审批');
	$('.houseAddress').val(row.keyAdministrator);
	
	$("#shorMessageRemind1").prop("checked", false);
	$('.amountInvolved').val(0);
	$('#ifSpeed').prop({checked:false});
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$("#addEventDlg").dialog('open');
}
//可优化，谁有时间优化下？
function clear(){
	$(".choseHouse").val("单击选择房源");
	$(".rentId").val("");
	$(".storeId").val("");
	$(".houseId").val("");
	$(".houseType").val("");
	$(".houseAddress").val("");
	$(".amountInvolved").val("");
	$(".amountType").val("");
	$(".eventType").val("");
	$("#handlerDept").val("");
	$("#handler").html("<option></option>");
	$(".eventDescribe").val("");
	$(".errMsg").text("");
	
	$(".publisher").val("");
	$(".curHandler").val("");
	$("#token").val("");
	$("#att").val("");
	$("#co").val("");
	$("#eaId").val("");
	$("#handlerId").val("");
	$("#handlerName").val("");
}
//生成审批编号
function approvalNumber(){
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
//执行添加审批
function doAddEvent(){
	var rentId = $(".rentId").val();
	var storeId = $(".storeId").val();
	var houseId = $(".houseId").val();
	var houseType = $(".houseType").val();
	var amountInvolved = $(".amountInvolved").val();
	var eventType = $(".eventType").find("option:selected").text();
	var handler = $("#doEventGetUserId").val();
	var eventDescribe = $(".eventDescribe").val();
	var houseAddress = $(".houseAddress").val();
	var eaApprovalNumber = $("#eaApprovalNumber").val();
	var eaBankName = $('#eaBankName').val();
	var eaBankUsername = $('#eaBankUsername').val();
	var eaBankAccountNumber = $('#eaBankAccountNumber').val();
	var att = $("#att").val();
	if (amountInvolved == 0) {
		eaBankName = '';
		eaBankUsername = '';
		eaBankAccountNumber = '';
	}
	if($('#ifSpeed').prop("checked")){
		eventDescribe = "【优先处理】"+eventDescribe;
	}
	if(amountInvolved != 0 && amountInvolved != '' && (houseAddress == null || houseAddress == '')){
		$(".errMsg").text("涉及金额，请绑定房源！");
		return;
	}
	var jhfFollowRemark = getNowFormatDate()+' '+ _loginUserName+' 添加的'+houseType+':'+eventDescribe;
	if(amountInvolved != 0 && amountInvolved != '' && (eaBankName == '' || eaBankUsername == '' || eaBankAccountNumber == '')){
		$.messager.defaults.ok = '添加账户';
		$.messager.defaults.cancel = '提交审批';
		$.messager.confirm('提示','收款账户为空，是否添加账户？',function(r){    
			$.messager.defaults.ok = '确定';
			$.messager.defaults.cancel = '取消';
		    if (r) {    
		        return;
		    } else {
		    	showLoading();
		    	$.post("../insertEventApproval.action", {
		    		eaRentId : rentId,
		    		eaStoreId : storeId,
		    		eaHouseId : houseId,
		    		eaEventPublisher : _loginUserId,
		    		eaEventHandler : handler,
		    		eaHomeType : houseType,
		    		eaEventType : eventType,
		    	    eaEventState : "处理中",
		    	    eaWhetherGenerateRecord : "否",
		    	    eaAmountInvolved : amountInvolved,
		    	    eaEventContent : eventDescribe,
		    	    eaApprovalNumber: eaApprovalNumber,
		    	    eaBankName: eaBankName,
		    	    eaBankUsername: eaBankUsername,
		    	    eaBankAccountNumber: eaBankAccountNumber,
		    	    att : att
		    	}, function(data) {
		    		hideLoading();
		    		if (data.code<0) {
		    			myTips("添加失败！", "error");
		    			return;
		    		}
		    		isSave = true;
		    		$.post("../insertHousingFollow.action",{
		    			jhfHouseId        : houseId,
		    			jhfHouse4rentId   : rentId,
		    			jhfHouse4storeId  : storeId,
		    			jhfFollowRemark   : jhfFollowRemark,
		    			jhfUserId         : _loginUserId,
		    			jhfDepartment     : _loginDepartment,
		    			jhfStorefront     : _loginStore,
		    			jhfPaymentWay     : '系统跟进',
		    			jhfFollowResult   : '跟进成功',
		    		}, function(fData){
		    			
		    		})
		    		doSendEventMessage();
		    		myTips("添加成功！", "success");
		    	});
		    }
		});  
	} else {
		showLoading();
		$.post("../insertEventApproval.action", {
			eaRentId : rentId,
			eaStoreId : storeId,
			eaHouseId : houseId,
			eaEventPublisher : _loginUserId,
			eaEventHandler : handler,
			eaHomeType : houseType,
			eaEventType : eventType,
		    eaEventState : "处理中",
		    eaWhetherGenerateRecord : "否",
		    eaAmountInvolved : amountInvolved,
		    eaEventContent : eventDescribe,
		    eaApprovalNumber: eaApprovalNumber,
		    eaBankName: eaBankName,
		    eaBankUsername: eaBankUsername,
		    eaBankAccountNumber: eaBankAccountNumber,
		    att : att
		}, function(data) {
			hideLoading();
			if (data.code<0) {
				myTips("添加失败！", "error");
				return;
			}
			isSave = true;
			$.post("../insertHousingFollow.action",{
			jhfHouseId        : houseId,
			jhfHouse4rentId   : rentId,
			jhfHouse4storeId  : storeId,
			jhfFollowRemark   : jhfFollowRemark,
			jhfUserId         : _loginUserId,
			jhfDepartment     : _loginDepartment,
			jhfStorefront     : _loginStore,
			jhfPaymentWay     : '系统跟进',
			jhfFollowResult   : '跟进成功',
		}, function(fData){
			
		})
			doSendEventMessage();
			myTips("添加成功！", "success");
		});
	}
}
//审批涉及金额时可填写收款账户
function changeMoney(){
	if ($('.amountInvolved').val() != 0 && $('.amountInvolved').val() != '' ) {
		$('#payBankInfo').show();
	} else {
		$('#payBankInfo').hide();
	}
}

//添加审批执行发送短信
function doSendEventMessage(){
	if($('#shorMessageRemind1').prop("checked")){
		if($('#ifSpeed').prop("checked")){
			
		}
		var userId = $('#doEventGetUserId').val();
				
		var evenTypeRp = $('.eventType').val();
		var evenDescribe = "发布人："+_loginUserName+"-"+$('.eventDescribe').val();
		var evenAdd = $('.houseAddress').val();
		var houseType = $('.houseType').val();
		var amountInvolved = $('.amountInvolved').val();
		if($('#ifSpeed').prop("checked")){
			evenDescribe = "【优先处理】"+evenDescribe;
		}
		if(amountInvolved == '' || amountInvolved == null || amountInvolved ==0){
			amountInvolved = 0;
		}
	
		var rentId = $('.rentId').val();	
		var storeId = $('.storeId').val();	
	
		var evenApprovalJson= {
			smUserId : userId,
			smRentId :rentId,
			smNotRentId :storeId,
			evenType : evenTypeRp,
			addCommunity : evenAdd,
			houseType : houseType,
			smMoney : amountInvolved,
			handleStatus : '处理中',
			repairDescribe : evenDescribe,
		};
		$.post("../massage/sendEventApprovalMsg.action",evenApprovalJson ,function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
			}
			$("#addEventDlg").dialog('close');
		});								
	}else{
		queryEvent(1,0);
		$("#addEventDlg").dialog('close');
		return;
	}
}

/*********************************审批end*********************************/

/*************************************************任务开始*********************************************/
function getTaskTime(){
	var taskTime = formatTime(getNowFormatDate(), 2);
	var hopeSelect = $('.repair_hope_select').find('option:selected').text()
	if (hopeSelect == "尽快" || hopeSelect == "今天" ||hopeSelect == "电话联系"||hopeSelect == "") {
		
	}else if (hopeSelect == "明天") {
		var tomorrow = new Date(taskTime);
		var sDay = 1;
		taskTime = formatDate(tomorrow.setDate(tomorrow.getDate()+sDay));
	}else if (hopeSelect == "后天") {
		var afterTomorrow = new Date(taskTime);
		var sDay = 2;
		taskTime = formatDate(afterTomorrow.setDate(afterTomorrow.getDate()+sDay));
	}else if (hopeSelect == "本周末") {
		var now = new Date;
    var day = now.getDay ();
    var week = "1234567";
    var Saturday = 5 - week.indexOf (day);
    var satur = new Date;
    satur.setDate (satur.getDate () + Saturday);
    var sunday = 6 - week.indexOf (day);
    var sun = new Date;
    sun.setDate (sun.getDate () + sunday);
    taskTime = formatDate(sun);
	}
	return taskTime;
}

//任务数据
function virtualRepair(page,type){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	var pageSize = 15;
	var startPage = (parseInt(page) - 1) * pageSize;
	$.post('../queryTaskCommon.action',{
		startNum           : startPage,
		endNum             : pageSize,
		repHouseId  	   : row.houseCoding,
		splitFlag	: 1
	},function(data){
		if (data.code<0) {
			$('#taskInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			notCountPage(page, 0 ,"virtualRepair","taskInfo");
		} else {
			data=data.body;
			if(data.length<pageSize){
				notCountPage(page, 2 , "virtualRepair","taskInfo");
			}else{
				notCountPage(page, 1 , "virtualRepair","taskInfo");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			for(var i in data){
				var addCity = data[i].addCity;
				if(addCity == '项目' || addCity == '库房' || addCity == '供应商' || addCity == '公区'){
					data[i].addCommunity = addCity;
				}
				if(addCity != '项目' && addCity != '库房' && addCity != '供应商' && addCity != '公区'){
					data[i].keyAdministrator = data[i].addCommunity+data[i].addBuilding+data[i].addDoorplateno;
				}
				if((data[i].repHouseId == null || data[i].repHouseId == '') && (data[i].repHouse4rentId == null || data[i].repHouse4rentId == '')
						&& (data[i].repHouse4storeId == null || data[i].repHouse4storeId == '')){
					data[i].keyAdministrator = '无归属任务';
				}
				if(data[i].repUseTime == null || data[i].repUseTime == ''){
					data[i].repUseTime = '未完成';
					if(data[i].repToReceive != '未领取'){
						data[i].endTime = getDays(getNowFormatDate() ,data[i].repToReceive);
					}else{
						data[i].endTime = '未领取';
					}
				}else{
					//领取时间repToReceive
					if(data[i].repToReceive != '未领取'){
						data[i].endTime = getDays(data[i].repUseTime, data[i].repToReceive);
					}else{
						data[i].endTime = '未领取';
					}
				} 
			}
			$("#taskInfoTable").datagrid("loadData", data);
		}
	})
}
function gettaskInfoPageCount(page){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	var pageSize = 5;
	$.post('../queryTaskCommon.action',{
		repHouseId    : row.houseCoding,
		splitFlag	: 0
	},function(data){
		if (data.code < 0) {
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"taskInfo",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(0,countJson,pageSize,page,"taskInfo",0);
		}
	})
}
//添加任务
function addTask(){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	$("#addvirtualRepair").dialog({
		title : "添加任务",
		top : getTop(330),
		left : getLeft(410),
		width : 410,
		height : 330,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addvirtualRepair [clear="clear"]').val('');
			$('#addvirtualRepair [clean="clean"]').html('');
			$('#addvirtualRepair [require]').css('border', '1px solid #a9a9a9');
			$('#addvirtualRepair [noos="noos"]').val('');
			$(".errMsg1").val('');
			clearAttachment();
		},
		onOpen :function(){
    		$("#repairName").removeAttr("require");
	    	$("#repairPhone").removeAttr("require");
			$("#repairHopeTime").val("尽快");
		}
	});
	$('.do_overDiv').hide();
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	var myDate = getNowFormatDate();
	$("#repairReportingTime").val(myDate);
	$("#repairUserId").val(_loginUserId);
	$("#repairUserName").val(_loginUserName);
	$("#repairHouseCoding").val(row.houseCoding);
	$("#repairName").val(row.keyNumber);
	$("#repairPhone").val(row.houseEntrust4rent);
	$("#repairHouseType").val('项目任务');
	$("#addvirtualRepair").dialog('open');
}
//执行添加任务
function doAddvirtualRepair(type){
	$('.do_overDiv').show();
	var houseRentCoding,houseStoreCoding,houseCoding,repTime,repName,repPhone,repHopeTime,repRespon,repUserId,repEvent,repTypeRp,repRepairPeopleId,repTaskTime,att,repairTypeRp;
	if(type == 0){
		houseRentCoding = $("#repHouse4rentId").val();
		houseStoreCoding = $("#repair_houseRentCoding").val();
		houseCoding = $("#repairHouseCoding").val();
		repTime = $("#repairReportingTime").val();
		repName = $("#repairName").val();
		repPhone = $("#repairPhone").val();
		repHopeTime = $("#repairHopeTime").val();
		repRespon = $("#repairResponsibility").find("option:selected").text();
		repUserId = $("#repairUserId").val();
		repEvent = $("#repairEventRp").val();
		repTypeRp = $("#repairTypeRp").find("option:selected").text();
		repRepairPeopleId = $("#doTaskGetUserId").val();
		repTaskTime = getTaskTime();
		att = $("#att").val();
		type="任务";
	}
	else if(type == 1){
		var row = $('#trusteeshipDg').datagrid('getSelected');
		houseStoreCoding = row.hsId;
		houseCoding = row.hsHouseId;
		repName = $('#taskAffairsrepairName').val();
		repPhone = $('#taskAffairsrepairPhone').val();
		repRespon = $('#taskAffairsRepairResponsibility').val();
		repEvent = $('#writeFollowNote').val();
		repHopeTime = $(".repair_hope_time").val();
		repRepairPeopleId = $("#taskAffairsGetUserId").val();
		repUserId = _loginUserId;
		repTime = getNowFormatDate();
		repTypeRp = $('#taskrepairTypeRp').val();
		repTaskTime = getTaskTime();
		att = '';
		type="任务";
	}
	
	
	$.post("../insertRepair.action", {
		repHouse4rentId : houseRentCoding,
		repHouse4storeId: houseStoreCoding,
		repHouseId: houseCoding,
		repContacts : repName,
		repContactsPhone : repPhone,
		repResponsibility : repRespon,
		repEventRp : repEvent,
		repHopeTime : repHopeTime,
		repRepairPeopleId : repRepairPeopleId,
		repUserId : repUserId,
		repReportingTime : repTime,
		repTypeRp : repTypeRp,
		repDepartment : _loginDepartment,
		repStorefront : _loginStore,
		repTaskTime : repTaskTime,
		att : att,
		type:type,
	}, function(data) {
		if (data.code<0) {
			myTips("添加失败！", "error");
			$('.do_overDiv').hide();
			return;
		}
		isSave = true;
		sendTaskSMS(type);
		if(type == 0){
				myTips("添加事件成功！","success");
		}else{
			myTips("跟进成功！","success");
		}
		$('.do_overDiv').hide();
	});
}
//任务短信发送
function sendTaskSMS(type){
	if((type == 0 && $('#sendTaskMessageRemind').prop("checked")) || (type == 1 && $('#taskAffairsshorMessage').prop("checked"))){
		var row = $('#trusteeshipDg').datagrid('getSelected');
		var repairUserId,repTypeRp1,smNotRentId,address,addCommunity,popName,popTel,repHopeTime,repairDescribe,repairJson;
		address = ''+row.hsAddCommunity+row.hsAddBuilding+row.hsAddDoorplateno;
		addCommunity = '';
		if(address == '' || address == null ){
			address = '无归属任务';
		}
		
		if(type == 0){
			smNotRentId = $('#repair_houseRentCoding').val();
			repairUserId = $('#move_in_asset_staff').val();	
			repTypeRp1 = $("#repair_type_rp").find("option:selected").text();			
			popName = $('#repairName').val();
			popTel = $('#repairPhone').val();
			repHopeTime = $('#repairHopeTime').val();
			repairDescribe = $('#repairEventRp').val()+"负责人："+_loginUserName;
		}
		if(type == 1){
			smNotRentId = row.hsId;
			repairUserId = $('#taskAffairsGetUserId').val();	
			repTypeRp1 = $("#taskrepairTypeRp").val();		
			popName = $('#taskAffairsrepairName').val();
			popTel = $('#taskAffairsrepairPhone').val();
			repHopeTime = $('.repair_hope_time').val();
			repairDescribe = $('#writeFollowNote').val()+"负责人："+_loginUserName;
		}
		
		repairJson= {
			smUserId : repairUserId,
			smNotRentId :smNotRentId,
			repairEvenType : repTypeRp1,
			addCommunity : address,
			popName : popName,
			popTelephone : popTel,
			hopeTime : repHopeTime,
			repairDescribe : repairDescribe,
		};
		$.post("../massage/sendRepairMsg.action",repairJson ,function(data) {
			if(data.code<0){
				//myTips("短信发送失败!","error");
				$("#addvirtualRepair").dialog('close');
				$("#writeFollowDlg").dialog('close');
				virtualRepair(1, 0);
				return;
			}
			$("#addvirtualRepair").dialog('close');
			$("#writeFollowDlg").dialog('close');
			virtualRepair(1, 0);
		});			
	}else{
		$("#addvirtualRepair").dialog('close');
		$("#writeFollowDlg").dialog('close');
		virtualRepair(1, 0);
		return;
	}
}
//任务详细信息窗口
function repairInfoDlg(row){
	$("#repairInfoDlg").dialog({
		title : "任务信息",
		top : getTop(420),
		left : getLeft(660),
		width : 660,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#repairInfoDlg input").val('');
			$("#repairInfoDlg textarea").val('');
		}
	});
	if (row.keyAdministrator == '') {
		$("#repairAddress").val(row.addCommunity+row.addBuilding+row.addDoorplateno);
	}else {
		$("#repairAddress").val(row.keyAdministrator);
	}
	if ((row.repHouse4rentId != null && row.repHouse4rentId != '')&&(row.repHouse4storeId != null && row.repHouse4storeId != '')&&(row.repHouseId != null && row.repHouseId != '')) {
		$("#repairHouseType1").val('已租任务');
	}else if((row.repHouse4rentId == null || row.repHouse4rentId == '')&&(row.repHouse4storeId != null && row.repHouse4storeId != '')&&(row.repHouseId != null && row.repHouseId != '')){
		$("#repairHouseType1").val('未租任务');
	}else if((row.repHouse4rentId == null || row.repHouse4rentId == '')&&(row.repHouse4storeId == null || row.repHouse4storeId == '')&&(row.repHouseId != null && row.repHouseId != '')){
		$("#repairHouseType1").val('项目任务');
	}else{
		$("#repairHouseType1").val('无关联任务');
	}
	$("#repairId").val(row.repId);
	$("#repairTime").val(row.repReportingTime);
	$("#repairUserName1").val(row.repUserName);
	$("#repairUserId1").val(row.repUserId);
	$("#repairContacis").val(row.repContacts);
	$("#repairContacisPhone").val(row.repContactsPhone);
	$("#repairResponsibility1").val(row.repResponsibility);
	$("#repairHopeTime1").val(row.repHopeTime);
	$("#repairReceive").val(row.repToReceive);
	$("#repairType").val(row.repTypeRp);
	$("#repairEvent").val(row.repEventRp);
	$("#repair_responsibility").val(row.repProgressRp);
	$("#repairPeopleName").val(row.repRepairman);
	$("#repairPeopleId").val(row.repRepairPeopleId);
	$("#repairState").val(row.repState);
	//$(".repair_toll_rp").val(row.repTollRp + "元");
	$("#repairInfoDlg").dialog('open');
	$('#showProgressTable').datagrid({
		columns : [ [
			{
				field : 'proTime',
				title : '进展时间',
				width : 10,
				align : 'center'
			},
			{
				field : 'userName',
				title : '负责人',
				width : 10,
				align : 'center'
			},
			{
				field : 'proState',
				title : '进展状态',
				width : 10,
				align : 'center'
			},
			{
				field : 'proRemark',
				title : '备注',
				width : 45,
				align : 'center',
				formatter : function(value, row, index) {
					return "<span title='" + row.proRemark
							+ "'>" + row.proRemark + "</span>";
				}
			} ] ],
		width : '100%',
		height : '100%',
		singleSelect : true,
		autoRowHeight : false,
		pagination : false,
		pageSize : 10,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		onDblClickRow : function(rowIndex, rowData) {
			var row = $('#showProgressTable').datagrid('getSelected');
			if (row) {
				for(var i in row){
					$("#readShowProgress"+i).html(row[i]);
				}
				$('#showProgressDlg').dialog({
					title : '进展详情',
					top : getTop(230),
					left : getLeft(420),
					width : 420,
					height : 230,
					closed : true,
					cache : false,
					modal : true,
					onClose : function() {
						$('.xwtable span').text('');
					}
				});
				$('#showProgressDlg').dialog('open');
			}
		}
	});
	queryRepairProgress1(row.repId);
}
//事件详细进展列表导入数据
function queryRepairProgress1(repId) {
	$.post("../queryAllRepairProgress.action", {
		proRepairId : repId
	}, function(data) {
		if (data.code<0){
			$('#showProgressTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			}); 
		}else{
			data=data.body;
			for (var i in data) {
				data[i].proTime = formatTime(data[i].proTime, 1);
			}
			$('#showProgressTable').datagrid("loadData", data);
		}
	}, "json");
}
//任务详细窗口的上一条下一条
function repairLaterOrNext(type) {
	var dataIndex = $(".repair_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".repair_index").val(num);
			changeData = $('#taskInfoTable').datagrid('getData').rows[num];
			$('#taskInfoTable').datagrid('selectRow', num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#taskInfoTable").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".repair_index").val(num);
			changeData = $('#taskInfoTable').datagrid('getData').rows[num];
			$('#taskInfoTable').datagrid('selectRow', num);
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	if (changeData.length != 0) {
		for (var i in changeData) {
			if (changeData[i] == null) {
				changeData[i] = '';
			}
		}
		repairInfoDlg(changeData);
	}
}
/*************************************************任务结束*********************************************/

/**
 * 查询资产
 * 注：城市不能作为查询条件，因为这里不光查资料房，还要查项目
 */
function queryAsset(page, type, num) {
	var onePageNums = 10;
	var startNum = (parseInt(page) - 1) * onePageNums;
	var searchDistrict = $('#searchDistrict').val();
	var searchCommunity = $('#searchCommunity').val();
	var searchBuilding = $('#searchBuilding').val();
	var searchDoorplateno = $('#searchDoorplateno').val();
	var searchVirtualType = $('#searchVirtualType').val();
	var searchVirtualName = $('#searchVirtualName').val();
	var saType = $('#searchSaType').val();
	var saUse = $('#searchSaUse').val();
	var saStatus = $('#searchSaState').val();
	var saName = $('#searchSaName').val();
	var saBrand = $('#searchSaBrand').val();
	var saModel = $('#searchSaModel').val();
	var saNumber = $('#searchSaNumber').val();
	var saClassify = $('#searchSaClassify').val();
	
	$.post("../queryAssetsCommon.action", {
		startNum		: startNum,
		endNum 			: onePageNums,
		addDistrict		: searchDistrict,
		addCommunity	: searchCommunity,
		addBuilding		: searchBuilding,
		addDoorplateno	: searchDoorplateno,
		virtualType		: searchVirtualType,
		keyAdministrator: searchVirtualName,
		saUse			: saUse,
		saName			: saName,
		saBrand			: saBrand,
		saModel			: saModel,
		saType			: saType,
		saStatus		: saStatus,
		saNumber		: saNumber,
		saClassify		: saClassify,
		saHouseId       : num,
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 2);
			$('#assetOperation').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum, page, 2);
			}
			for (var i in data.body) {
				data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
			}
			$("#assetOperation").datagrid("loadData", data.body);
			//$('#assetOperation').datagrid("selectRow", _virtualIndex);
		}
	});
}
/**
 * 查询耗材
 */
function querySupplies(page, type, num) {
	var onePageNums = 15;
	var startNum = (parseInt(page) - 1) * onePageNums;
	var supType = $('#searchSupType').val();
	var supName = $('#searchSupName').val();
	var supBrand = $('#searchSupBrand').val();
	var supModel = $('#searchSupModel').val();
	$.post("../querySupplies.action", {
		startNum			: startNum,
		endNum 				: onePageNums,
		supType				: supType,
		supName				: supName,
		supBrand			: supBrand,
		supModel			: supModel,
		supHouseId          : num,
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 1);
			$('#suppliesInformation').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum, page, 1);
			}
			for (var i in data.body) {
				data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
			}
			
			$("#suppliesInformation").datagrid("loadData", data.body);
			//$('#suppliesInformation').datagrid("selectRow",_virtualIndex);
		}
	});
}
//耗材管理窗口
function doubleClickTheWindow(){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	$('#internalOperationOfStoreroom').dialog({
		title : '公区详细信息',
		top : getTop(400),
		left : getLeft(920),
		width : 1020,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function(){
			$("#operationWindow").tabs("select",0);
		},
		onClose : function() {
			$('.xwtable1 span').text('');
			$('#suppliesInformation').datagrid("loadData", []);
			$("#assetOperation").datagrid("loadData", []);
		},
	});
	for(var i in row){
		$('#readOnlyVirtual'+i).html(row[i]);
	}
	$('#internalOperationOfStoreroom').dialog("open");
}

/**
 * 耗材onkeyup搜索延时器
 */
var timer1 = null;
function queryOnkeyup1(id, num, type) {
	var row = $('#virtualDataGrid').datagrid('getSelected');
	var millisecond = num * 100;
	if($("#"+id).val()==''){
		if(type == 0){
			querySupplies(1, 0, row.houseCoding);
		}
		if(type == 1){
			choseHouseData(1);
		}
		if(type == 2){
			choseProjectData(1);
		}
		if(type == 3){
			queryAsset(1, 0, row.houseCoding);
		}
	}else{
		clearTimeout(timer1);
		if(type == 0){
			timer1 = setTimeout(function(){
				querySupplies(1, 0, row.houseCoding);
			}, millisecond);
		}
		if(type == 1){
			timer1 = setTimeout(function(){
				choseHouseData(1);
			}, millisecond);
		}
		if(type == 2){
			timer1 = setTimeout(function(){
				choseProjectData(1);
			}, millisecond);
		}
		if(type == 3){
			timer1 = setTimeout(function(){
				queryAsset(1, 0, row.houseCoding);
			}, millisecond);
		}
	}
}

//分页统计总条数
function getvirtualPageCount(page){
	var pageSize = 20;
	var searchVirtualName = $("#searchVirtualName").val();
	var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
	var searchVirtualContact = $("#searchVirtualContact").val();
	var searchVirtualState = $("#searchVirtualState").val();

	$.post("../queryOffice.action", {
		keyAdministrator : searchVirtualName,//公区名称
		addDoorplateno : searchVirtualDoorplateno,//备注描述
		keyNumber : searchVirtualContact,//联系人
		houseEntrust4sell: searchVirtualState,//公区状态
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"virtual",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"virtual",0);
		}
	});
}

//加载办公区数据
function queryOffice(page, type){
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var searchVirtualName = $("#searchVirtualName").val();
	var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
	var searchVirtualContact = $("#searchVirtualContact").val();
	var searchVirtualState = $("#searchVirtualState").val();
	
	$.post("../queryOffice.action", {
		startNum : startNum,
		endNum : endNum,
		keyAdministrator : searchVirtualName,//公区名称
		addDoorplateno : searchVirtualDoorplateno,//备注描述
		keyNumber : searchVirtualContact,//联系人
		houseEntrust4sell: searchVirtualState,//公区状态
	}, function(data) {
		if (data.code<0) {
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryOffice","virtual");
			}else{
				notCountPage(page, 0 ,"queryOffice","virtual");
			}
			$('#virtualDataGrid').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			// if (page == 1 && type == 0) {
			// 	sourcePage(data.body[0].totalNum, page, 0);
			// 	_virtualIndex = 0;
			// }
			if(data.body.length<endNum){
				notCountPage(page, 2 , "queryOffice","virtual");
			}else{
				notCountPage(page, 1 , "queryOffice","virtual");
			}
			$("#virtualDataGrid").datagrid("loadData", data.body);
		}
	}, "json");
}
//分页操作
function sourcePage(totalNum, page, type) {
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if(type == 0){
		var pageNum = Math.ceil(totalNum / 20);
		$("#virtualPage").remove();
		$("#virtualPageDiv")
				.append(
						"<div class='tcdPageCode' id='virtualPage' style='text-align:center;'></div>");
		$("#virtualPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0]=p;
					_virtualIndex = 0;
					queryOffice(p, 1);
				}
			}
		});
	}
	if(type == 1){
		var pageNum = Math.ceil(totalNum / 15);
		$("#suppliesInPage").remove();
		$("#suppliesInPageDiv")
				.append(
						"<div class='tcdPageCode' id='suppliesInPage' style='text-align:center;'></div>");
		$("#suppliesInPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0]=p;
					_virtualIndex = 0;
					querySupplies(p, 1, row.houseCoding);
				}
			}
		});
	}
	if(type == 2){
		var pageNum = Math.ceil(totalNum / 10);
		$("#assetPage").remove();
		$("#assetPageDiv")
				.append(
						"<div class='tcdPageCode' id='assetPage' style='text-align:center;'></div>");
		$("#assetPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0]=p;
					_virtualIndex = 0;
					queryAsset(p, 1, row.houseCoding);
				}
			}
		});
	}
	if (type == 3) {
		var pageNum = Math.ceil(totalNum / 10);
		$("#choseProjectPage").remove();
		$("#choseProjectPageDiv").append("<div class='tcdPageCode' id='choseProjectPage' style='text-align:center;'></div>");
		$("#choseProjectPage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function(p) {
				if (p <= pageNum) {
					choseProjectData(p);
				}
			}
		});
	}
	if(type == 4){
		var pageNum = Math.ceil(totalNum / 10);
		$("#choseTrusteeshipPage").remove();
		$("#choseTrusteeshipPageDiv").append("<div class='tcdPageCode' id='choseTrusteeshipPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipPage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function(p) {
				if (p <= pageNum) {
					choseHouseData(p);
				}
			}
		});
	}
	if(type == 5){
		var pageNum = Math.ceil(totalNum / 10);
		$("#choseVirtualHousePage").remove();
		$("#choseVirtualHousePageDiv").append("<div class='tcdPageCode' id='choseVirtualHousePage' style='text-align:center;'></div>");
		$("#choseVirtualHousePage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function(p) {
				if (p <= pageNum) {
					choseHouseData(p);
				}
			}
		});
	}
	if(type == 6){
		var pageNum = Math.ceil(totalNum / 10);
		$("#choseSupplierPage").remove();
		$("#choseSupplierPageDiv").append("<div class='tcdPageCode' id='choseSupplierPage' style='text-align:center;'></div>");
		$("#choseSupplierPage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function(p) {
				if (p <= pageNum) {
					choseSupplierData(p);
				}
			}
		});
	}
	if(type == 9){
		pageNum = Math.ceil(totalNum / 20);
		$("#financialPage").remove();
		$("#financialPageDiv").append("<div class='tcdPageCode' id='financialPage' style='text-align:center;'></div>");
		$("#financialPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryFinancial(row, p, 1);	
				}
			}
		});
	}
	if (type == 12) {
		pageNum = Math.ceil(totalNum / 10);
		$("#eventInfoPage").remove();
		$("#eventInfoPageDiv").append("<div class='tcdPageCode' id='eventInfoPage' style='text-align:center;'></div>");
		$("#eventInfoPage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryEvent(p, 1);
				}
			}
		});
	}
	if (type == 13) {
		pageNum = Math.ceil(totalNum / 10);
		$("#queryDeviceRecordPage").remove();
		$("#queryDeviceRecordPageDiv").append("<div class='tcdPageCode' id='queryDeviceRecordPage' style='text-align:center;'></div>");
		$("#queryDeviceRecordPage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function (p) {
				if (p <= pageNum) {
					queryDeviceRecord(p, 1);
				}
			}
		});
	}
}
/**
 * 格式化"使用情况"列
 */
function formatterSaUse(value, row, index) {
	if (row.saUse =='使用中') {
		return "<a style='text-decoration:none;color:green;'>"+row.saUse+"<a>";
	}else if (row.saUse =='未使用'){
		return "<a style='text-decoration:none;color:blue;'>"+row.saUse+"<a>";
	}else if (row.saUse =='已报废'){
		return "<a style='text-decoration:none;color:gray;'>"+row.saUse+"<a>";
	}else{
		return "<a style='text-decoration:none;'>"+row.saUse+"<a>";
	}
}
/**
 * 查看耗材详情
 */
function openSuppliesInfo(){
	$('#suppliesInfoDlg').dialog({
		title : '耗材详细信息',
		top : getTop(500),
		left : getLeft(660),
		width : 660,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function(){
			$('#suppliesInfoTabs').tabs('select',0);
		},
		onClose : function() {
			$('#suppliesInfoDlg [clear="clear"]').val('');
		},
	});
	seeSupplies();
	$('#suppliesInfoDlg').dialog('open');
}
/**
 * 加载耗材详情数据
 */
function seeSupplies() {
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		return;
	}
	$('#query_supplies_choseHouse').val(row.keyAdministrator);
	$('#query_supplies_type').val(row.supType);
	$('#query_supplies_name').val(row.supName);
	$('#query_supplies_brand').val(row.supBrand);
	$('#query_supplies_model').val(row.supModel);
	$('#query_supplies_price').val(row.supPrice);
	$('#query_supplies_number').val(row.supNum);
	$('#query_supplies_remark').val(row.supRemark);
}
/**
 * 上一条下一条
 */
function laterOrNext(type) {
	$('#suppliesInformation').datagrid('clearChecked');
	var dataIndex = $("#suppliesInfo_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$("#suppliesInfo_index").val(num);
			changeData = $('#suppliesInformation').datagrid('getData').rows[num];
			$('#suppliesInformation').datagrid('selectRow',num);
			_indexNum[0] = num;
			queryFollow();
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#suppliesInformation").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#suppliesInfo_index").val(num);
			changeData = $('#suppliesInformation').datagrid('getData').rows[num];
			$('#suppliesInformation').datagrid('selectRow',num);
			_indexNum[0] = num;
			queryFollow();
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	seeSupplies();
}
/**
 * 初始化耗材管理tab
 */
function initTable1(index){
	if(index=='0'){
		seeSupplies();
	}
	if(index=='1'){
		check_supplies_img();
	}
}

/**********************耗材图片处理**************************/
//电脑上传
function upload_supplies_img() {
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录','info');
		return;
	}
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
			refresh_supplies_img()
		}
	});
	creat_supplies_qr();
	$.post('../upload/getUpTokenCallback.action', function (data) {
		var token = data.split('#####')[0];
		var co = data.split('#####')[1];
		$('#uploadDlg input[clear=true]').val('');
		$('#token').val(token);
		$('#co').val(co);
		$('#supId').val(row.supId);
		$('#userName').val(_loginUserName);
		initUploader();
		doCancel_supplies_img();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creat_supplies_qr() {
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录',"info");
		return;
	}
	$.post("../upload/getMobUploadUrl.action", {
		supId : row.supId,
		userName : _loginUserName,
	}, function (data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel_supplies_img();
	});
}

//查看图片
function check_supplies_img() {
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (row) {
		doCancel_supplies_img();
		show_supplies_img(row.supId);
	} else {
		$.messager.alert('消息','请选择一条记录',"info");
	}
}
//删除图片
function remove_supplies_img() {
	var file = $('._supplies_file');
	if (file.length == 0) {
		$.messager.alert('消息','没有图片可以删除',"error");
	} else {
		$('#_supplies_title').html('请选择要删除的图片').show();
		$('._supplies_checkbox').show();
		$('#_supplies_btn').show();
	}
}
//取消删除图片
function doCancel_supplies_img(){
	$('#_supplies_title').hide();
	$('._supplies_checkbox').hide().removeAttr('checked');
	$('#_supplies_btn').hide();
}
//执行删除图片
function doRemove_supplies_img() {
	var row = $("#suppliesInformation").datagrid("getSelected");
	var arr = 0;
	var path = '';
	var chk = $('._supplies_checkbox');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#_supplies_imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#_supplies_imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0, path.length-1);//去掉最后一个逗号
		$.post("../deleteSuppliesPic.action",{
			supId : row.supId,
			supImgPath : path,
			userName : _loginUserName,
		}, function(data) {
			if (data < 0 || data == '') {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				show_supplies_img(row.supId);
			}
		});
		doCancel_supplies_img();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
function show_supplies_img(supId){
	$("#_supplies_imgWrapper").empty();
	$.post("../querySupplies.action",{
		supId : supId
	}, function(data) {
		if (data.code < 0) {
			$("#_supplies_imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		var path = data.body[0].supImgPath.getRealJsonStr();
		if(path == '' || path == null){
			$('#_supplies_imgNum').html('');
			return;
		}
		var img = eval('([' + path + '])');
		var imgNum = 0;
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
						$('#_supplies_imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#_supplies_imgWrapper .fileList').append('<li>' +
							'<input name="other" class="_supplies_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
							'<a href="'+newUrls[i]+'" class="_supplies_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
							'</li>');
					fileNum++;
					
				}
			}
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				var j = parseInt(i) + parseInt(img.length);
				if (ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png") {
					if (imgNum == 0) {
						$('#_supplies_imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#_supplies_imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="_supplies_group _supplies_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="_supplies_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#_supplies_imgNum').html("图片：" + imgNum + "张    文件：" + fileNum + "个");
			$("._supplies_group").colorbox({
				rel:'_supplies_group', 
				transition:"none", 
				width:"60%", 
				height:"90%"
			});
		});
	});
}
//刷新
function refresh_supplies_img(){
	var row = $("#suppliesInformation").datagrid("getSelected");
	if (row){
		doCancel_supplies_img();
		show_supplies_img(row.supId);
	}
}
/**************************************************************/

/**
 * 查询耗材的跟进记录
 */
function queryFollow(rowId, page, type) {
	if ($('#followTable').hasClass('datagrid-f')) {
		var startNum = (parseInt(page) - 1) * 10;
		var endNum = 10;
	} else {
		$('#followTable').datagrid({
			columns : [ [ {
				field : 'time',
				title : '跟进时间',
				width : '20%',
				align : 'center'
			}, {
				field : 'name',
				title : '跟进人',
				width : '10%',
				align : 'center'
			}, {
				field : 'type',
				title : '跟进类型',
				width : '10%',
				align : 'center'
			}, {
				field : 'text',
				title : '跟进内容',
				width : '60%',
				align : 'center'
			} ] ],
			width : '100%',
			height : '170px',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#followTable').datagrid('getSelected');
				downFollowInfo(row);
			}
		});
	}
	// 跟进记录表取数据
			$.post("../queryAllHousingFollow.action", {
				jhfHouseId : rowId,
				startNum : startNum,
				endNum : endNum
			}, function(data) {
				if (data.code<0) {
					sourcePage(0, 0, 4);
					$('#followTable').datagrid({
						data : [],
						view : myview,
						emptyMsg : data.msg
					});
				} else {
					data=data.body;	
					if (page == 1 && type == 0) {
						sourcePage(data[0].totalNum, page, 4);
					}
					$("#followTable").datagrid("loadData", data);
				}
			}, "json");
}
//耗材跟进的详细界面
function downFollowInfo(row){
	$('#downFollowInfo').dialog({
		title : '跟进详细信息',
		top : getTop(250),
		left : getLeft(450),
		width : 450,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#downFollowInfo span').text('');
		},
	});
	for(var i in row){
		$('#readDownFollow'+i).html("&nbsp;&nbsp;&nbsp;&nbsp;"+row[i].replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;"));
	}
	
	$('#downFollowInfo').dialog('open');
}

/****************************办公区的增删查改***********************************/
/*打开录入办公区窗口*/
function addVirtual(){
	$("#saveAdd").show();
	$("#saveUpdate").hide();
	$("#virtualType").attr("disabled", true);
	resetInput();
	$("#addVirtualDlg").dialog({
		title : '添加公区',
		top : getTop(305),
		left : getLeft(480),
		width : 480,
		height : 305,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addVirtualDlg [clear="clear"]').val('');
			$('#addVirtualDlg [clean="clean"]').html('');
			$('#addVirtualDlg [require]').css('border', '1px solid #a9a9a9');
			clearAttachment();
		}
	});
	$("#virtualTypeDiv").hide();
	$("#addVirtualDlg").dialog("open");
}
//添加
function validate(type){ 
	if(type==0){
		doAddVirtual();
	}else if(type==1){
		doUpdateVirtual();
	}
}
/*添加办公区到数据库*/
function doAddVirtual(){
	var virtualName = $("#virtualName").val();
	var virtualContact = $("#virtualContact").val();
	var virtualTel = $("#virtualTel").val();
	var virtualCity = $("#virtualType").val();
	var virtualDoorplateno = $("#virtualDoorplateno").val();
	
	$.post("../addOffice.action", {
		keyAdministrator 	: virtualName,
		keyNumber 			: virtualContact,
		houseEntrust4rent 	: virtualTel,
		houseEntrust4sell 	: '正常',
		addCity 			: '公区',
		addCommunity        : '公区',
		addDoorplateno 		: virtualDoorplateno,
		userId 				: _loginUserId,
		storefront 			: _loginStore,
		department 			: _loginDepartment,
	}, function(data){
		if(data.code<0){
			myTips(data.msg, "error");
			return;
		}
		queryOffice(_pageNum[0], 0);
		myTips("添加成功", "success");
		$("#addVirtualDlg").dialog('close');
	}, "json"); 
}

/*打开修改办公区窗口*/
function updateVirtual(){
	$("#saveAdd").hide();
	$("#saveUpdate").show();
	$("#virtualType").attr("disabled", true);
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if(row){
		$("#addVirtualDlg").dialog({
			title : '公区修改',
			top : getTop(305),
			left : getLeft(420),
			width : 420,
			height : 305,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#addVirtualDlg [clear="clear"]').val('');
				$('#addVirtualDlg [clean="clean"]').html('');
				$('#addVirtualDlg [require="require"]').css('border', '1px solid #a9a9a9');
				clearAttachment();
			}
		});
		$("#error").val("");
		$("#virtualName").val(row.keyAdministrator);
		$("#virtualContact").val(row.keyNumber);
		$("#virtualTel").val(row.houseEntrust4rent);
		$("#houseCoding").val(row.houseCoding);
		$("#virtualCity").val(row.addCity);
		$("#virtualDoorplateno").val(row.addDoorplateno);
		$("#virtualState").val(row.houseEntrust4sell);
		$("#virtualTypeDiv").show();
		$("#addVirtualDlg").dialog("open");
	}else{
		myTips("请选择一条记录", "error");
		return;
	}
}

/*将修改后的办公区保存到数据库*/
function doUpdateVirtual(){
	var virtualName = $("#virtualName").val();
	var virtualContact = $("#virtualContact").val();
	var virtualTel = $("#virtualTel").val();
	var houseCoding = $("#houseCoding").val();
	var virtualCity = $("#virtualCity").val();
	var virtualDoorplateno = $("#virtualDoorplateno").val();
	var virtualState = $("#virtualState").val();
	
	$.post("../updateOffice.action", {
		keyAdministrator : virtualName,
		keyNumber : virtualContact,
		houseEntrust4rent : virtualTel,
		houseEntrust4sell : virtualState,
		houseCoding : houseCoding,
		addCity : virtualCity,
		addDoorplateno : virtualDoorplateno,
		userId : _loginUserId,
		storefront : _loginStore,
		department : _loginDepartment,
	}, function(data){
		if(data.code < 0){
			myTips(data.msg, "error");
			return;
		}
		queryOffice(_pageNum[0], 0);
		myTips("修改成功", "success");
		$("#addVirtualDlg").dialog('close');
	}, "json");
}
/*************************************************/

/************************耗材的增删查改******************************/
/**
 * 添加耗材
 */
function addSupplies() {
	var row = $('#virtualDataGrid').datagrid('getSelected');
	$('#addSuppliesDlg').dialog({
		title : '添加耗材',
		top : getTop(310),
		left : getLeft(650),
		width : 650,
		height : 310,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addSuppliesDlg [clear="clear"]').val('');
			$('#addSuppliesDlg [choose="choose"]').val('');
		}
	});
	$('#supplies_choseHouse').val(row.keyAdministrator);
	$('#supplies_houseCoding').val(row.houseCoding);
	$('#addSuppliesDlg').dialog('open');
}
/**
 * 执行添加耗材
 */
function doAddSupplies() {
	var supUserId =  _loginUserId;
	var supDepartment = _loginDepartment;
	var supStorefront = _loginStore;
	var supHouseId = $('#supplies_houseCoding').val();
	var supType = $('#add_supplies_type').val();
	var supName = $('#add_supplies_name').val();
	var supBrand = $('#add_supplies_brand').val();
	var supModel = $('#add_supplies_model').val();
	var supPrice = $('#add_supplies_price').val();
	var supNum = $('#add_supplies_number').val();
	var supRemark = $('#add_supplies_remark').val();
	
	var checkFlag = 0;
	$('#addSuppliesDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}

	showLoading();
	$.post('../insertSupplies.action', {
		supUserId: supUserId,
		supDepartment: supDepartment,
		supStorefront: supStorefront,
		supHouseId: supHouseId,
		supType: supType,
		supName: supName,
		supBrand: supBrand,
		supModel: supModel,
		supPrice: supPrice,
		supNum: supNum,
		supRemark: supRemark,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '添加失败！原因：' + data.msg, 'error');
			return;
		} else {
			myTips('添加成功！', 'success');
			$('#addSuppliesDlg').dialog('close');
			querySupplies(1, 0, supHouseId);
		}
	});	
}
/**
 * 修改耗材
 */
function updateSupplies(){
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	} 
	$('#updateSuppliesDlg').dialog({
		title : '修改耗材',
		top : getTop(280),
		left : getLeft(650),
		width : 650,
		height : 280,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateSuppliesDlg [clear="clear"]').val('');
			$('#updateSuppliesDlg [choose="choose"]').val('');
		}
	});
	$('#update_supplies_choseHouse').val(row.keyAdministrator);
	$('#update_supplies_type').val(row.supType);
	$('#update_supplies_name').val(row.supName);
	$('#update_supplies_brand').val(row.supBrand);
	$('#update_supplies_model').val(row.supModel);
	$('#update_supplies_price').val(row.supPrice);
//	$('#update_supplies_number').val(row.supNum);
	$('#update_supplies_remark').val(row.supRemark);
	$('#updateSuppliesDlg').dialog('open');
}
/**
 * 执行修改耗材
 */
function doUpdateSupplies(){
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var supType = $('#update_supplies_type').val();
	var supName = $('#update_supplies_name').val();
	var supBrand = $('#update_supplies_brand').val();
	var supModel = $('#update_supplies_model').val();
	var supPrice = $('#update_supplies_price').val();
	var supRemark = $('#update_supplies_remark').val();
	
	var checkFlag = 0;
	$('#updateSuppliesDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}

	showLoading();
	$.post('../updateSupplies.action', {
		userName: _loginUserName,
		supId: row.supId,
		supType: supType,
		supName: supName,
		supBrand: supBrand,
		supModel: supModel,
		supPrice: supPrice,
//		supNum: supNum,
		supRemark: supRemark,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#updateSuppliesDlg').dialog('close');
			myTips('修改成功！', 'success');
			querySupplies(1, 0, row.supHouseId);
		}
	});	
}
/**
 * 迁移耗材
 */
function moveSupplies(){
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#move_from_supplies_choseHouse').val(row.keyAdministrator);
	$('#moveSuppliesDlg').dialog({
		title : '迁移耗材',
		top : getTop(180),
		left : getLeft(510),
		width : 510,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveSuppliesDlg [clear="clear"]').val('');
		}
	});
	$('#moveSuppliesDlg').dialog('open');
}
/**
 * 执行迁移耗材
 */
function doMoveSupplies(){
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var hd = row.supHouseId;
	var supHouseId = $('#move_to_supplies_houseCoding').val();
	var supMoveFrom = $('#move_from_supplies_choseHouse').val();
	var supMoveTo = $('#move_to_supplies_choseHouse').val();
	var supNum = $('#move_supplies_number').val();
	var checkFlag = 0;
	$('#moveSuppliesDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
			return;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	if (supHouseId == row.supHouseId) {
		myTips('该耗材无须迁移','error');
		return;
	}
	if (supNum > row.supNum || supNum <= 0) {
		myTips('数量填写错误','error');
		return;
	}

	showLoading();
	$.post('../moveSupplies.action', {
		userName: _loginUserName,
		supUserId: _loginUserId,
		supDepartment: _loginDepartment,
		supStorefront: _loginStore,
		supId: row.supId,
		supHouseId: supHouseId,
		supMoveFrom: supMoveFrom,
		supMoveTo: supMoveTo,
		supNum: supNum,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#moveSuppliesDlg').dialog('close');
			myTips('迁移成功！', 'success');
			querySupplies(1, 0, hd);
		}
	});
}
/**
 * 使用耗材
 */
function useSupplies(){
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#useSuppliesDlg').dialog({
		title : '使用耗材',
		top : getTop(225),
		left : getLeft(510),
		width : 510,
		height : 225,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#useSuppliesDlg [clear="clear"]').val('');
		}
	});
	$('#useSuppliesDlg').dialog('open');
}
/**
 * 执行使用耗材
 */
function doUseSupplies(){
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var hd = row.supHouseId;
	var useAddress = $('#use_supplies_choseHouse').val();
	var supNum = $('#use_supplies_number').val();
	var useReason = $('#use_supplies_reason').val();
	
	var checkFlag = 0;
	$('#useSuppliesDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
			return;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	if (supNum > row.supNum || supNum <= 0) {
		myTips('数量填写错误','error');
		return;
	}

	showLoading();
	$.post('../useSupplies.action', {
		userName: _loginUserName,
		supId: row.supId,
		useAddress: useAddress,
		supNum: supNum,
		useReason: useReason,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '使用失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#useSuppliesDlg').dialog('close');
			myTips('使用成功！', 'success');
			querySupplies(1, 0, hd);
		}
	});
}
/**
 * 增减耗材数量
 */
function purchaseSupplies(){
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	} 
	$('#purchaseSuppliesDlg').dialog({
		title : '增减耗材数量',
		top : getTop(200),
		left : getLeft(430),
		width : 430,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#purchaseSuppliesDlg [clear="clear"]').val('');
			$('#purchaseSuppliesDlg [choose="choose"]').val('');
		}
	});
	$('#current_supplies_number').val(row.supNum);
	$('#purchaseSuppliesDlg').dialog('open');
}
/**
 * 执行增减耗材数量
 */
function doPurchaseSupplies(){
	var row = $('#suppliesInformation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var hd = row.supHouseId;
	var supNum = $('#purchase_supplies_number').val();
	var supRemark = $('#purchase_supplies_remark').val();
	var checkFlag = 0;
	$('#purchaseSuppliesDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	if (supNum == 0) {
		myTips('数量填写错误!','error');
		return;
	}
	showLoading();
	$.post('../purchaseSupplies.action', {
		userName: _loginUserName,
		supId: row.supId,
		supNum: supNum,
		supRemark: supRemark,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#purchaseSuppliesDlg').dialog('close');
			myTips('修改成功！', 'success');
			querySupplies(1, 0, hd);
		}
	});	
}

/***********************end*******************************/

/********************* 资产增删查改处理 ****************************/



/************************资产end***************************/

/**
 * 使用 耗材、资产 选择房源
 */
function choseHouse(type, num) {
	$('#choseHouseDlg').dialog({
		title : '选择房源',
		top : getTop(550),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			if(type == 1){
				$('#choseHouseType').val('');
			}
		}
	});
	if(type == 1){
		$('#choseHouseType').val(type);
	}
	relationDataGrid(num);
	$('#choseHouseDlg').dialog('open');
}
/**
 * 使用耗材选择房源-显示列表
 */
function relationDataGrid(num) {
	var relationType = $('#searchBelongType').find('option:selected').text();
	if (relationType == '房源列表') {
		$('#choseHouseSelect').show();
		$('#virtualRelationSelect').hide();
		$('#choseTrusteeship').show();
		$('#choseVirtualHouse').hide();
		if ($('#choseTrusteeshipTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipTable').datagrid(
				{
					columns : [ [ {
						field : 'hsAddDistrict',
						title : '城区',
						width : 10,
						align : 'center'
					}, {
						field : 'hsAddZone',
						title : '片区',
						width : 10,
						align : 'center'
					}, {
						field : 'hsAddCommunity',
						title : '楼盘名称',
						width : 20,
						align : 'center'
					}, {
						field : 'hsAddBuilding',
						title : '楼栋',
						width : 10,
						align : 'center'
					}, {
						field : 'hsAddDoorplateno',
						title : '门牌',
						width : 10,
						align : 'center'
					} ] ],
					width : '100%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseTrusteeshipTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							if(num == 1){
								$('#use_supplies_houseCoding').val(row.hsHouseId);
								$('#use_supplies_choseHouse').val(
									row.hsAddCommunity + ' ' 
									+ row.hsAddBuilding + ' ' 
									+ row.hsAddDoorplateno);
							}
							if(num == 2){
								var type = $('#choseHouseType').val();
								if (type == 0) {
									$('#assets_houseStoreCoding').val(row.hsId);
									$('#assets_houseCoding').val(row.hsHouseId);
									$('#assets_choseHouse').val(
										row.hsAddCommunity + ' ' 
										+ row.hsAddBuilding + ' ' 
										+ row.hsAddDoorplateno);
								} else if (type == 1) {
									$('#move_to_asset_houseStoreCoding').val(row.hsId);
									$('#move_to_asset_houseCoding').val(row.hsHouseId);
									$('#move_to_asset_choseHouse').val(
										row.hsAddCommunity + ' ' 
										+ row.hsAddBuilding + ' ' 
										+ row.hsAddDoorplateno);
								}
							}
							$('#choseHouseDlg').dialog('close');
						}
					}
				});
		}
	}
	if (relationType == '公区列表') {
		$('#choseHouseSelect').hide();
		$('#virtualRelationSelect').show();
		$('#choseTrusteeship').hide();
		$('#choseVirtualHouse').show();
		if ($('#choseVirtualHouseTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualHouseTable').datagrid(
				{
					columns : [ [ /*{
						field : 'houseCoding',
						title : '盘源编号',
						width : 10,
						align : 'center'
					}, */{
						field : 'addCity',
						title : '分类',
						width : 10,
						align : 'center'
					}, {
						field : 'keyAdministrator',
						title : '名称',
						width : 20,
						align : 'center'
					}, {
						field : 'addDoorplateno',
						title : '备注描述',
						width : 10,
						align : 'center'
					}, {
						field : 'keyNumber',
						title : '联系人',
						width : 10,
						align : 'center'
					}, {
						field : 'houseEntrust4rent',
						title : '联系电话',
						width : 10,
						align : 'center'
					} ] ],
					width : '100%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseVirtualHouseTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#use_supplies_houseCoding').val(row.houseCoding);
							$('#use_supplies_choseHouse').val(row.keyAdministrator);
							var type = $('#choseHouseType').val();
							if (type == 0) {
								$('#assets_houseStoreCoding').val('');
								$('#assets_houseCoding').val(row.houseCoding);
								$('#assets_choseHouse').val(row.keyAdministrator);
							} else if (type == 1) {
								$('#move_to_asset_houseStoreCoding').val('');
								$('#move_to_asset_houseCoding').val(row.houseCoding);
								$('#move_to_asset_choseHouse').val(row.keyAdministrator);
							}
							$('#choseHouseDlg').dialog('close');
						}
					}
				});
		}
	}
	choseHouseData(1);
}
/**
 * 使用耗材选择房源-查数据
 */
function choseHouseData(page) {
	var relation = $('#searchBelongType').val();
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var addCity = '公区';
	var qhAddCity = $('#searchAddCity').find('option:selected').text();
	var qhAddDistrict = $('#searchAddDistrict').find('option:selected').text();
	var qhAddZone = $('#searchAddZone').find('option:selected').text();
	var qhAddCommunity = $('#searchAddCommunity').val();
	var qhAddBuilding = $('#searchAddBuilding').val();
	var qhAddDoorplateno = $('#searchAddDoorplateno').val();
	var virtualType = $('#searchVirtualType2').val();
	var searchVirtualName = $('#searchVirtualName2').val();
	var searchVirtualContact = $('#searchVirtualContact2').val();
	if (relation == 1) {
		$.post('../queryHouseStoreCommon.action', {
			startNum: startNum,
			endNum: onePageNums,
			hsAddCity: qhAddCity,
			hsAddDistrict: qhAddDistrict,
			hsAddZone: qhAddZone,
			hsAddCommunity: qhAddCommunity,
			hsAddBuilding: qhAddBuilding,
			hsAddDoorplateno: qhAddDoorplateno,
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 4);
				$('#choseTrusteeshipTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1) {
					sourcePage(data[0].totalNum, 0, 4);
				}
				$("#choseTrusteeshipTable").datagrid("loadData", data);
			}
		});
	}
	if (relation == 2) {
		$.post("../queryProjectCommon.action", {
			startNum: startNum,
			endNum: onePageNums,
			addCity: addCity,
			keyAdministrator: searchVirtualName,
			keyNumber: searchVirtualContact,
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 5);
				$('#choseVirtualHouseTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : '没有查询到符合条件的记录！'
				});
			} else {
				if (page == 1) {
					sourcePage(data.body[0].totalNum, 0, 5);
				}
				$("#choseVirtualHouseTable").datagrid("loadData", data.body);
			}
		});
	}
}

/**
 * 选择办公区
 */
function choseProject(type) {
	$('#choseProjectDlg').dialog({
		title : '选择公区',
		top : getTop(550),
		left : getLeft(750),
		width : 750,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	relationProjectGrid(type);
	$('#choseProjectDlg').dialog('open');
}
/**
 * 选择办公区-查数据
 */
function choseProjectData(page) {
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var addCity = '公区';
	var searchProjectName = $("#searchProjectName").val();
	var searchProjectContact = $("#searchProjectContact").val();
	$.post("../queryProjectCommon.action", {
		startNum : startNum,
		endNum : onePageNums,
		addCity : addCity,
		keyAdministrator : searchProjectName,
		keyNumber : searchProjectContact,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 3);
			$('#choseProjectTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1) {
				sourcePage(data.body[0].totalNum, 0, 3);
			}
			$("#choseProjectTable").datagrid("loadData", data.body);
		}
	});
}
/**
 * 选择办公区-显示列表
 */
function relationProjectGrid(type) {
	if ($('#choseProjectTable').hasClass('datagrid-f')) {

	}else{
		$('#choseProjectTable').datagrid({
			columns : [ [{
				field : 'addCity',
				title : '分类',
				width : 10,
				align : 'center'
			}, {
				field : 'keyAdministrator',
				title : '名称',
				width : 10,
				align : 'center'
			}, {
				field : 'addDoorplateno',
				title : '备注描述',
				width : 10,
				align : 'center'
			}, {
				field : 'keyNumber',
				title : '联系人',
				width : 10,
				align : 'center'
			}, {
				field : 'houseEntrust4rent',
				title : '联系电话',
				width : 10,
				align : 'center'
			} ] ],
			width : '100%',
			height : '84%',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#choseProjectTable').datagrid('getSelected');
				if (row) {
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					if (type == 0) {
						$('#supplies_choseHouse').val(row.keyAdministrator);
						$('#supplies_houseCoding').val(row.houseCoding);
					} else if (type == 1) {
						$('#move_to_supplies_choseHouse').val(row.keyAdministrator);
						$('#move_to_supplies_houseCoding').val(row.houseCoding);
					}
					$('#choseProjectDlg').dialog('close');
				}
			}
		});
	}
	choseProjectData(1);
}
/**
 * 加载下拉列表
 */
function loadSelectList() {
	for (var i in _taskType) {
		$("#repairTypeRp").append("<option value = '" + i + "'>" + _taskType[i] + "</option>");
	}
	for (var i in _eventApprovalType) {
		$('.eventType').append("<option value='" + _eventApprovalType[i] + "'>" + _eventApprovalType[i] + "</option>");
	}
	for (var i in _repHopeTime) {
		$(".repair_hope_select").append("<option value = '" + _repHopeTime[i] + "'>" + _repHopeTime[i] + "</option>");
	}
	for (var i in _loginCompanyRentDistrict) {
	    $('#searchDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	    $('#searchAddDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
	for (var i in _supType) {
		$('#searchSupType').append('<option value="' + _supType[i] + '">' + _supType[i] + '</option>');
		$('#add_supplies_type').append('<option value="' + _supType[i] + '">' + _supType[i] + '</option>');
		$('#update_supplies_type').append('<option value="' + _supType[i] + '">' + _supType[i] + '</option>');
	}
	for (var i in _saType) {
		$('#searchSaType').append('<option value="' + _saType[i] + '">' + _saType[i] + '</option>');
		$('#add_asset_type').append('<option value="' + _saType[i] + '">' + _saType[i] + '</option>');
		$('#update_asset_type').append('<option value="' + _saType[i] + '">' + _saType[i] + '</option>');
	}
	for (var i in _assetsType) {
		$('#searchSaClassify').append('<option value="' + _assetsType[i].type + '">' + _assetsType[i].type + '</option>');
		$('#add_asset_classify').append('<option value="' + _assetsType[i].type + '">' + _assetsType[i].type + '</option>');
		$('#update_asset_classify').append('<option value="' + _assetsType[i].type + '">' + _assetsType[i].type + '</option>');
	}
	for (var i in _saUse) {
		$('#searchSaUse').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
		$('#add_asset_use').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
		$('#update_asset_use').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
	}
	for (var i in _saStatus) {
		$('#searchSaState').append('<option value="' + _saStatus[i] + '">' + _saStatus[i] + '</option>');
		$('#add_asset_status').append('<option value="' + _saStatus[i] + '">' + _saStatus[i] + '</option>');
		$('#update_asset_status').append('<option value="' + _saStatus[i] + '">' + _saStatus[i] + '</option>');
	}
}
/*重置表单数据*/
function resetInput(){
	$("#virtualType").val("0");
	$("#addVirtualDlg input").val("");
	$("#initialAmount").val("0");
	$("#calibrationAmount").val("0");
	$("#virtualDoorplateno").val("");
}

/******************************资产功能处理*************************************/


/**
 * 添加资产
 */
function addAsset() {
	var row = $('#virtualDataGrid').datagrid('getSelected');
	$('#addAssetDlg').dialog({
		title : '添加资产',
		top : getTop(485),
		left : getLeft(850),
		width : 850,
		height : 485,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addAssetDlg [clear="clear"]').val('');
			$('#addAssetDlg [choose="choose"]').val('');
			$("#addAssetTable").datagrid({ data: [] });
		}
	});
	$('#assets_choseHouse').val(row.keyAdministrator);
	$('#assets_houseCoding').val(row.houseCoding);
	$('#assets_houseStoreCoding').val('');
	$('#addAssetDlg').dialog('open');
	if ($('#addAssetTable').hasClass('datagrid-f')) {
		
	} else {
		$('#addAssetTable').datagrid(
			{
				columns : [ [
						{
							field : 'saHouseAddress',
							title : '地址/项目',
							width : 30,
							align : 'center',
						},
						{
							field : 'saType',
							title : '所属',
							width : 10,
							align : 'center',
						},
						{
							field : 'saClassify',
							title : '类型',
							width : 10,
							align : 'center',
						},
						{
							field : 'saUse',
							title : '使用',
							width : 10,
							align : 'center',
						},
						{
							field : 'saStatus',
							title : '状态',
							width : 10,
							align : 'center',
						},
						{
							field : 'saName',
							title : '名称',
							width : 20,
							align : 'center',
						},
						{
							field : 'saBrand',
							title : '品牌',
							width : 20,
							align : 'center',
						},
						{
							field : 'saModel',
							title : '型号',
							width : 20,
							align : 'center',
						},
						{
							field : 'saPrice',
							title : '价值',
							width : 20,
							align : 'center',
						},
						{
							field : 'saRemarks',
							title : '备注',
							width : 20,
							align : 'center',
						},
						{
							field : 'saSupplierName',
							title : '供应商',
							width : 20,
							align : 'center',
						},
						{
							field : 'deleteAdd',
							title : '删除',
							width : 10,
							align : 'center',
							formatter : function(value, row, index) {
								return "<a href='#' onclick=\"myDeleteRows('"+row.random+"','random','addAssetTable',0);\">删除</a>";
							}
						} ] ],
				width : '100%',
				height : '202px',
				singleSelect : true,
				autoRowHeight : false,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				rowStyler : function(index, row) {
					return 'color:#000;';
				},
			});
	}
}
/**
 * 添加资产到列表
 */
function addToDataGrid() {
	var saRegistrant =  _loginUserId;
	var department = _loginDepartment;
	var storefront = _loginStore;
	var saHouseAddress = $('#assets_choseHouse').val();
	var saHouseStoreId = $('#assets_houseStoreCoding').val();
	var saHouseId = $('#assets_houseCoding').val();
	var saType = $('#add_asset_type').val();
	var saClassify = $('#add_asset_classify').val();
	var saUse = $('#add_asset_use').val();
	var saStatus = $('#add_asset_status').val();
	var assetName = $('#add_asset_name').val();
	var assetBrand = $('#add_asset_brand').val();
	var assetModel = $('#add_asset_model').val();
	var assetPrice = $('#add_asset_price').val();
	var assetNumber = $('#add_asset_number').val();
	var saSupplierName = $('#assets_changeSupplier').val();
	var saSupplier = $('#assets_supplier_id').val();
	var assetRemarks = $('#add_asset_remark').val();
	
	var checkFlag = 0;
	$('#addAssetDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	var dataJson = {
		saRegistrant: saRegistrant,
		department: department,
		storefront: storefront,
		saHouseAddress: saHouseAddress,
		saHouseStoreId: saHouseStoreId,
		saHouseId: saHouseId,
		saType: saType,
		saClassify: saClassify,
		saUse: saUse,
		saStatus: saStatus,
		saName: assetName,
		saBrand: assetBrand,
		saModel: assetModel,
		saPrice: assetPrice,
		saSupplierName: saSupplierName,
		saSupplier: saSupplier,
		saRemarks: assetRemarks,
		assetNumber:assetNumber,
		saHouseAddress:saHouseAddress,
	};
	for (var i = 0; i < assetNumber; i++) {
		var random = parseInt((Math.random()*9+1)*10000000);
		dataJson.random = random;
		$('#addAssetTable').datagrid('insertRow', {
			index: 0,
			row: dataJson
		});
	}
}
/**
 * 清空添加资产input值
 */
function cleanDataGrid() {
	$('#addAssetDlg [clear="clear"]').val('');
	$('#addAssetDlg [choose="choose"]').val('');
}
/**
 * 执行添加资产
 */
function doAddAsset() { 
	var rows = $('#addAssetTable').datagrid('getRows');
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if (rows.length == 0) {
		myTips('没有可用于添加的数据', 'error');
		return;
	}
	var saHouseId = row.houseCoding
	showLoading();
	$.post('../insertAssets.action',{
		jsonArray : JSON.stringify(rows)
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '添加失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#addAssetDlg').dialog('close');
			myTips('添加成功！', 'success');
			queryAsset(1, 0, saHouseId);
		}
	});	
}
/**
 * 修改资产
 */
function updateAsset(){
	var row = $('#assetOperation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	} 
	$('#updateAssetDlg').dialog({
		title : '修改资产',
		top : getTop(280),
		left : getLeft(850),
		width : 850,
		height : 280,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateAssetDlg [clear="clear"]').val('');
			$('#updateAssetDlg [choose="choose"]').val('');
		}
	});
	$('#update_asset_choseHouse').val(row.saDetailedAddress);
	$('#update_asset_type').val(row.saType);
	$('#update_asset_classify').val(row.saClassify);
	changeAssetsType('update_asset_');
	$('#update_asset_use').val(row.saUse);
	$('#update_asset_status').val(row.saStatus);
	$('#update_asset_name').val(row.saName);
	$('#update_asset_brand').val(row.saBrand);
	$('#update_asset_model').val(row.saModel);
	$('#update_asset_price').val(row.saPrice);
	$('#update_asset_remark').val(row.saRemarks);
	$('#update_asset_supplier_id').val(row.saSupplier);
	$('#update_asset_changeSupplier').val(row.saSupplierName);
	$('#updateAssetDlg').dialog('open');
}
/**
 * 执行修改资产
 */
function doUpdateAsset(){
	var row = $('#assetOperation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var hdId = row.saHouseId;
	var saType = $('#update_asset_type').val();
	var saClassify = $('#update_asset_classify').val();
	var saUse = $('#update_asset_use').val();
	var saStatus = $('#update_asset_status').val();
	var assetName = $('#update_asset_name').val();
	var assetBrand = $('#update_asset_brand').val();
	var assetModel = $('#update_asset_model').val();
	var assetPrice = $('#update_asset_price').val();
	var saSupplierName = $('#update_asset_changeSupplier').val();
	var saSupplier = $('#update_asset_supplier_id').val();
	var assetRemarks = $('#update_asset_remark').val();
	
	var checkFlag = 0;
	$('#updateAssetDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}

	showLoading();
	$.post('../updateAssets.action', {
		registrantName: _loginUserName,
		saId: row.saId,
		saType: saType,
		saClassify: saClassify,
		saUse: saUse,
		saStatus: saStatus,
		saName: assetName,
		saBrand: assetBrand,
		saModel: assetModel,
		saPrice: assetPrice,
		saSupplierName: saSupplierName,
		saSupplier: saSupplier,
		saRemarks: assetRemarks,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#updateAssetDlg').dialog('close');
			myTips('修改成功！', 'success');
			queryAsset(1, 0, hdId);
		}
	});	
}
/**
 * 迁移资产
 */
function moveAsset(){
	var row = $('#assetOperation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#move_from_asset_choseHouse').val(row.keyAdministrator);
	$('#moveAssetDlg').dialog({
		title : '迁移资产',
		top : getTop(250),
		left : getLeft(540),
		width : 540,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveAssetDlg [clear="clear"]').val('');
			$('#moveAssetDlg [choose="choose"]').val('');
		}
	});
	$('#moveAssetDlg').dialog('open');
}
/**
 * 执行迁移资产
 */
function doMoveAsset(){
	var row = $('#assetOperation').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var saHdId = row.saHouseId;
	var saHouseStoreId = $('#move_to_asset_houseStoreCoding').val();
	var saHouseId = $('#move_to_asset_houseCoding').val();
	var saMoveFrom = $('#move_from_asset_choseHouse').val();
	var saMoveTo = $('#move_to_asset_choseHouse').val();
	//var agentName = $('#move_to_asset_staff option:selected').text();
	var agentName = $('#addAssistanceStaffShowUserInfo').val().split(' ')[$('#addAssistanceStaffShowUserInfo').val().split(' ').length-1];
	
	var moveReason = $('#move_asset_reason').val();
	var checkFlag = 0;
	$('#moveAssetDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
			return;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	if (saHouseStoreId == row.saHouseStoreId && saHouseId == row.saHouseId) {
		myTips('该资产无须迁移','error');
		return;
	}
	
	var jsonArray = [];
	var jsonObject = {
		registrantName: _loginUserName,
		saRegistrant: _loginUserId,
		department: _loginDepartment,
		storefront: _loginStore,
		agentName: agentName,
		moveReason: moveReason,
		saId: row.saId,
		saNumber: row.saNumber,
		saHouseStoreId: saHouseStoreId,
		saHouseId: saHouseId,
		saMoveFrom: saMoveFrom,
		saMoveTo: saMoveTo,
	};
	jsonArray[0] = jsonObject;
	showLoading();
	$.post('../moveAssets.action', {
		saId: row.saId,
		jsonArray: JSON.stringify(jsonArray),
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#moveAssetDlg').dialog('close');
			myTips('迁移成功！', 'success');
			queryAsset(1, 0, saHdId);
		}
	});	
}

/**
 * 查看资产详情
 */
function openAssetInfo(){
	$('#assetInfoDlg').dialog({
		title : '资产详细信息',
		top : getTop(500),
		left : getLeft(850),
		width : 850,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function(){
			$('#assetInfoTabs').tabs('select', 0);
		},
		onClose : function() {
			$('#assetInfoDlg [clear="clear"]').val('');
		},
	});
	seeAsset();
	$('#assetInfoDlg').dialog('open');
}
/**
 * 加载资产详情数据
 */
function seeAsset() {
	var row = $('#assetOperation').datagrid('getSelected');
	if (!row) {
		return;
	}
	$('#query_asset_choseHouse').val(row.saDetailedAddress);
	$('#query_asset_type').val(row.saType);
	$('#query_asset_classify').val(row.saClassify);
	$('#query_asset_use').val(row.saUse);
	$('#query_asset_status').val(row.saStatus);
	$('#query_asset_name').val(row.saName);
	$('#query_asset_brand').val(row.saBrand);
	$('#query_asset_model').val(row.saModel);
	$('#query_asset_price').val(row.saPrice);
	$('#query_asset_remark').val(row.saRemarks);
	$('#query_asset_changeSupplier').val(row.saSupplierName);
	$('#query_asset_number').val(row.saNumber);
	$('#query_asset_depreciation_price').val(row.saDepreciationPrice);
}

/******************************** end *************************************/
/**
 * 资产上一条下一条
 */
function laterOrNext1(type) {
	$('#assetOperation').datagrid('clearChecked');
	var dataIndex = $("#assetInfo_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$("#assetInfo_index").val(num);
			changeData = $('#assetOperation').datagrid('getData').rows[num];
			$('#assetOperation').datagrid('selectRow',num);
			_indexNum[0] = num;
			queryFollow1();
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#assetOperation").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#assetInfo_index").val(num);
			changeData = $('#assetOperation').datagrid('getData').rows[num];
			$('#assetOperation').datagrid('selectRow',num);
			_indexNum[0] = num;
			queryFollow1();
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	seeAsset();
}
//资产类型选项卡
function changeAssetsType(prefix){
	var assetsType = $("#"+prefix+"classify").val();
	$("#"+prefix+"name").empty();
	if(assetsType==""){
		return;
	}
	for(var i in _assetsType){
		if(assetsType==_assetsType[i].type){
			for(var j in _assetsType[i].name){
				 $("#"+prefix+"name").append('<option value="' + _assetsType[i].name[j] + '">' + _assetsType[i].name[j] + '</option>');
			}
		}
	}
}
/**
 * 选择供应商
 */
function choseSupplier(type) {
	$('#choseSupplierDlg').dialog({
		title : '选择供应商',
		top : getTop(550),
		left : getLeft(750),
		width : 750,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	relationSupplierGrid(type);
	$('#choseSupplierDlg').dialog('open');
}
/**
 * 选择供应商-显示列表
 */
function relationSupplierGrid(type) {
	if ($('#choseSupplierTable').hasClass('datagrid-f')) {

	}else{
		$('#choseSupplierTable').datagrid({
			columns : [ [{
				field : 'keyAdministrator',
				title : '名称',
				width : 10,
				align : 'center'
			}, {
				field : 'addDoorplateno',
				title : '备注描述',
				width : 10,
				align : 'center'
			}, {
				field : 'keyNumber',
				title : '联系人',
				width : 10,
				align : 'center'
			}, {
				field : 'houseEntrust4rent',
				title : '联系电话',
				width : 10,
				align : 'center'
			} ] ],
			width : '100%',
			height : '84%',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#choseSupplierTable').datagrid('getSelected');
				if (row) {
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					if (type == 0) {
						$('#assets_changeSupplier').val(row.keyAdministrator);
						$('#assets_supplier_id').val(row.houseCoding);
					} else if (type == 1) {
						$('#update_asset_changeSupplier').val(row.keyAdministrator);
						$('#update_asset_supplier_id').val(row.houseCoding);
					}
					$('#choseSupplierDlg').dialog('close');
				}
			}
		});
	}
	choseSupplierData(1);
}
/**
 * 选择供应商-查数据
 */
function choseSupplierData(page) {
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var addCity = '供应商';
	var searchVirtualName = $("#searchSupplierName").val();
	var searchVirtualContact = $("#searchSupplierVirtualContact").val();
	$.post("../queryProjectCommon.action", {
		startNum : startNum,
		endNum : onePageNums,
		addCity : addCity,
		keyAdministrator : searchVirtualName,
		keyNumber : searchVirtualContact,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 6);
			$('#choseSupplierTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1) {
				sourcePage(data.body[0].totalNum, 0, 6);
			}
			$("#choseSupplierTable").datagrid("loadData", data.body);
		}
	});
}
/***********************************************************资产附件上传start****************************************************************/
//电脑上传
function upload_asset_img() {
	var row = $('#assetOperation').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录','info');
		return;
	}
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
			refresh_asset_img();
		}
	});
	creat_asset_qr();
	$.post('../upload/getUpTokenCallback.action', function (data) {
		var token = data.split('#####')[0];
		var co = data.split('#####')[1];
		$('#uploadDlg input[clear=true]').val('');
		$('#token').val(token);
		$('#co').val(co);
		$('#saId').val(row.saId);
		$('#userName').val(_loginUserName);
		initUploader();
		doCancel_asset_img();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creat_asset_qr() {
	var row = $('#assetOperation').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录',"info");
		return;
	}
	$.post("../upload/getMobUploadUrl.action", {
		saId : row.saId,
		userName : _loginUserName,
	}, function (data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel_asset_img();
	});
}

//查看图片
function check_asset_img() {
	var row = $('#assetOperation').datagrid('getSelected');
	if (row) {
		doCancel_asset_img();
		show_asset_img(row.saId);
	} else {
		$.messager.alert('消息','请选择一条记录',"info");
	}
}
//删除图片
function remove_asset_img() {
	var file = $('._asset_file');
	if (file.length == 0) {
		$.messager.alert('消息','没有图片可以删除',"error");
	} else {
		$('#_asset_title').html('请选择要删除的图片').show();
		$('._asset_checkbox').show();
		$('#_asset_btn').show();
	}
}
//取消删除图片
function doCancel_asset_img(){
	$('#_asset_title').hide();
	$('._asset_checkbox').hide().removeAttr('checked');
	$('#_asset_btn').hide();
}
//执行删除图片
function doRemove_asset_img() {
	var row = $("#assetOperation").datagrid("getSelected");
	var arr = 0;
	var path = '';
	var chk = $('._asset_checkbox');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#_asset_imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#_asset_imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0, path.length-1);//去掉最后一个逗号
		$.post("../deleteAssetsPic.action",{
			saId : row.saId,
			saPhotos : path,
			registrantName : _loginUserName,
		}, function(data) {
			if (data < 0 || data == '') {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				show_asset_img(row.saId);
			}
		});
		doCancel_asset_img();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
function show_asset_img(saId){
	$("#_asset_imgWrapper").empty();
	$.post("../queryAssetsCommon.action",{
		saId : saId
	}, function(data) {
		if (data.code < 0) {
			$("#_asset_imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		var path = data.body[0].saPhotos;
		if(path == '' || path == null){
			$('#_asset_imgNum').html('');
			return;
		}
		path = path.substring(1, path.length - 1);
		var img = eval('([' + path + '])');
		var imgNum = 0;
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
						$('#_asset_imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#_asset_imgWrapper .fileList').append('<li>' +
							'<input name="other" class="_asset_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
							'<a href="'+newUrls[i]+'" class="_asset_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
							'</li>');
					fileNum++;
					
				}
			}
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				var j = parseInt(i) + parseInt(img.length);
				if (ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png") {
					if (imgNum == 0) {
						$('#_asset_imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#_asset_imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="_asset_group _asset_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="_asset_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#_asset_imgNum').html("图片：" + imgNum + "张    文件：" + fileNum + "个");
			$("._asset_group").colorbox({
				rel:'_asset_group', 
				transition:"none", 
				width:"60%", 
				height:"90%"
			});
		});
	});
}
//刷新
function refresh_asset_img(){
	var row = $("#assetOperation").datagrid("getSelected");
	if (row){
		doCancel_asset_img();
		show_asset_img(row.saId);
	}
}
/***********************************************************资产附件上传end****************************************************************/

/**
 * 查询资产的跟进记录
 */
function queryFollow1() {
	if ($('#followTable1').hasClass('datagrid-f')) {

	} else {
		$('#followTable1').datagrid({
			columns : [ [ {
				field : 'time',
				title : '跟进时间',
				width : '20%',
				align : 'center'
			}, {
				field : 'registrantName',
				title : '跟进人',
				width : '10%',
				align : 'center'
			}, {
				field : 'agentName',
				title : '经手人',
				width : '10%',
				align : 'center'
			}, {
				field : 'text',
				title : '跟进内容',
				width : '60%',
				align : 'center'
			} ] ],
			width : '100%',
			height : '174px',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#followTable1').datagrid('getSelected');
				downFollowInfo1(row);
			}
		});
	}
	var row = $('#assetOperation').datagrid('getSelected');
	var data = [];
	if (row.saFollowUp != null && row.saFollowUp != '') {
		var str = row.saFollowUp.getRealJsonStr();
		data = JSON.parse(str);
	}
	$('#followTable1').datagrid('loadData', data.reverse());
}
/**
 * 列表下方跟进的详细界面
 */
function downFollowInfo1(row){
	$('#downFollowInfo1').dialog({
		title : '跟进详细信息',
		top : getTop(200),
		left : getLeft(450),
		width : 450,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#downFollowInfo1 span').text('');
		},
	});
	for(var i in row){
		$('#readDownFollow'+i+1).html(row[i]);
	}
	$('#downFollowInfo1').dialog('open');
}

//打印资产标识卡
function printAsset(){
	var selRows = $('#assetOperation').datagrid('getChecked');
	if(selRows.length==0){
		myTips('请勾选需要打印的资产！', 'error');
		return;
	}
	var printArray = [];
	var saIdStr = "";
	for(var i in selRows){
		saIdStr += i==0 ? selRows[i].saId : ","+selRows[i].saId;
		var dizhi = selRows[i].innerVirtualRoom==0 
				? selRows[i].addCommunity + selRows[i].addBuilding + selRows[i].addDoorplateno
				: selRows[i].keyAdministrator ;
		printArray.push({
			name		: selRows[i].saName,
			pinpai		: selRows[i].saBrand=="" ? "定制" : selRows[i].saBrand,
			xinghao		: selRows[i].saModel,
			dizhi		: dizhi,
			zhuangtai	: selRows[i].saStatus,
			nums		: selRows[i].saNumber,
			qrcode		: "asset:"+selRows[i].saId,
		});
	}
	$.post("../printAssetFollow.action",{
		jsonArray : saIdStr
	},function(data){
		
	});
	printArray= JSON.stringify(printArray);
	parent.doPrintInExe(printArray,7);
}

//初始化
function initTable(title){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if(title=='公区详细'){
		for(var i in row){
			$('#readOnlyVirtual'+i).html(row[i]);
		}
	}
	if(title=='耗材管理'){
		querySupplies(1, 0, row.houseCoding);
	}
	if(title=='资产管理'){
		queryAsset(1, 0, row.houseCoding);
	}
	if(title=='审批记录'){
		$('#eventInfoTable').datagrid({
			columns : [ [ {
				field : 'eaEventState',
				title : '审批状态',
				width : '10%',
				align : 'center'
			},{
				field : 'eaEventType',
				title : '审批类型',
				width : '10%',
				align : 'center'
			},{
				field : 'eaReleaseTime',
				title : '申请时间',
				width : '10%',
				align : 'center'
			},{
				field : 'eaEventContent',
				title : '审批内容',
				width : '30%',
				align : 'center'
			},{
				field : 'eaAmountInvolved',
				title : '涉及金额',
				width : '10%',
				align : 'center'
			},{
				field : 'eaImgNum',
				title : '附件数量',
				width : '10%',
				align : 'center'
			},{
				field : 'eaCompletionTime',
				title : '完成时间',
				width : '10%',
				align : 'center'
			},{
				field : 'totalPage',
				title : '审批耗时',
				width : '10%',
				align : 'center'
			},] ],
			width : '100%',
			height: '277px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				$("#event_index").val(rowIndex);
				seeEvent();
			},
		});
		queryEvent(1,0);
	}
	if(title=='任务记录'){
		$('#taskInfoTable').datagrid({
				columns : [[ {
					field : 'repState',
					title : '任务状态',
					width : '10%',
					align : 'center',
				},
				{
					field : 'repTypeRp',
					title : '任务类型',
					width : '10%',
					align : 'center'
				},
				{
					field : 'repReportingTime',
					title : '登记时间',
					width : '10%',
					align : 'center',
					formatter : function(value, row, index) {
						return formatTime(row.repReportingTime, 1);
					}
				},
				{
					field : 'repEventRp',
					title : '任务描述',
					width : '30%',
					align : 'center',
					formatter: function(value, row, index) {
						if (row.repEventRp != null && row.repEventRp != '') {
							var eventRp = row.repEventRp;
							if (row.repEventRp.length > 10) {
								eventRp = eventRp.substr(0, 10) + "...";
							}
							return "<span title='" + row.repEventRp + "'>" + eventRp + "</span>";
						} else {
							return '';
						}
					}
				},
				{
					field : 'repToReceive',
					title : '受理时间',
					width : '10%',
					align : 'center',
				},
				{
					field : 'repImgNum',
					title : '图片数量',
					width : '10%',
					align : 'center'
				},
				{
					field : 'repUseTime',
					title : '完成时间',
					width : '10%',
					align : 'center'
				}, 
				{
					field : 'endTime',
					title : '总耗时',
					width : '10%',
					align : 'center'
				}, 
			]],
			width : '100%',
			height : '277px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				if (rowData) {
					$(".repair_index").val(rowIndex);
					repairInfoDlg(rowData);
				}
			},
		});
		virtualRepair(1,0);
	}	
	if(title=='收支记录'){
		queryFinancial(row,1,0);
	}
	if(title == '智能设备'){//智能设备
		queryOfficeInfo();
	}
	
}

//关联未租房窗口
function officeAssociateHr(){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	console.log(row);
//	console.log("office:"+row.hsId);
	if(row){
		$("#OfficeAssociateHrDlg").dialog({
			title : '关联房间',
			top : getTop(305),
			left : getLeft(1000),
			width : 980,
			height : 500,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$("#addRelationRoom input").val('');
				$("#addRelationRoom select").empty();
				$('#unRelatedRoomDg').datagrid('loadData', []);
				$('#existingRelationRoomDg').datagrid('loadData', []);
				clearAttachment();
			}
		});		
		queryUnrelated(row.hsId,1);
		queryRelated(row.hsId,1);
		$("#OfficeAssociateHrDlg").dialog("open");
	}else{
		myTips("请选择一条记录", "error");
		return;
	}
}

//查询未关联房和设备
function queryUnrelated(officeId,page){
	var pageSize=15;
	var row = $('#virtualDataGrid').datagrid('getSelected');
	var startNum = (parseInt(page) - 1) * pageSize;
    var community=$("#searchCommunity").val()
    var building=$("#searchBuilding").val()
	var doorplateno=$("#searchDoorplateno").val()
//	console.log("startNum:"+startNum+" community:"+community+" building:"+building+" doorplateno:"+doorplateno)
	$.post("../selectNoRelationHs.action", {
		JhoOfficeId	:row.hsId,
//		startNum:startNum,
//		endNum:pageSize,
		Community:community,
		Building:building,
		Doorplateno:doorplateno
	},function(data){
		if(data<0){
			sourcePage(0, 0, 0);
			$('#unRelatedRoomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if (page == 1 && type == 0) {
				_indexNum[0] = 0;
				sourcePage(data[0].totalNum, page, 0);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			if(data!=null){
				$("#unRelatedRoomDg").datagrid("loadData", data);
			}else{
				$("#unRelatedRoomDg").datagrid("loadData", []);
			}
		}
	},"json");
    $.post("../selectNoRelationDevice.action", {
		JhoOfficeId	:row.hsId,
//		startNum:startNum,
//		endNum:pageSize,
//		Community:community,
//		Building:building,
//		Doorplateno:doorplateno
	},function(data){
		if(data<0){
			sourcePage(0, 0, 0);
			$('#unRelatedRoomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if (page == 1 && type == 0) {
				_indexNum[0] = 0;
				sourcePage(data[0].totalNum, page, 0);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			if(data!=null){
				$("#unRelatedDeviceDg").datagrid("loadData", data);
			}else{
				$("#unRelatedDeviceDg").datagrid("loadData", []);
			}
		}
	},"json");
	
}

//查询已关联房和设备
function queryRelated(officeId,page){
	var pageSize=15;
	var startNum = (parseInt(page) - 1) * pageSize;
	var row = $('#virtualDataGrid').datagrid('getSelected');
    var community=$("#searchCommunity").val()
    var building=$("#searchBuilding").val()
	var doorplateno=$("#searchDoorplateno").val()
//	console.log("startNum:"+startNum+" community:"+community+" building:"+building+" doorplateno:"+doorplateno)
	$.post("../selectRelatedHs.action", {
		JhoOfficeId	:row.hsId,
//		startNum:startNum,
//		endNum:pageSize,
		Community:community,
		Building:building,
		Doorplateno:doorplateno
	},function(data){
		if(data<0){
			sourcePage(0, 0, 0);
			$('#existingRelationRoomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if (page == 1 && type == 0) {
				_indexNum[0] = 0;
				sourcePage(data[0].totalNum, page, 0);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			if(data!=null){
//				console.log(data);
				$("#existingRelationRoomDg").datagrid("loadData", data);
			}else{
				$("#existingRelationRoomDg").datagrid("loadData", []);
			}
		}
	},"json");
	$.post("../selectRelatedDevice.action", {
		JhoOfficeId	:row.hsId,
//		startNum:startNum,
//		endNum:pageSize,
//		Community:community,
//		Building:building,
//		Doorplateno:doorplateno
	},function(data){
		if(data<0){
			sourcePage(0, 0, 0);
			$('#unRelatedRoomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			for(i in data){
				console.log(data[i]);
			}
			if (page == 1 && type == 0) {
				_indexNum[0] = 0;
				sourcePage(data[0].totalNum, page, 0);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			if(data!=null){
				$("#existingRelationDeviceDg").datagrid("loadData", data);
			}else{
				$("#existingRelationDeviceDg").datagrid("loadData", []);
			}
		}
	},"json");
}

//房间 更新关联(左右移动) 
function updateHsRelation(type){
	if(type==0){//添加关联
		var rows =$("#unRelatedRoomDg").datagrid('getChecked');
		if(rows==0){
			myTips("请选择要关联的房","error");
			return;
		}
		var relatedRrows = $('#existingRelationRoomDg').datagrid("getRows");
		for (var i in relatedRrows){
			for(var j in rows){
				if(relatedRrows[i].hsId == rows[j].hsId){
					$.messager.alert('Warning',rows[j].hsAddCommunity+"(小区 )"+rows[j].hsAddBuilding+"(栋/单元) "+"(层) "+rows[j].hsAddDoorplateno+"(房间号) "+"  "+"已关联，请勿重复关联！");
					return;
				}
			}
		}
		var addRelation=[];//计数器
		for(var i in rows){
			$("#existingRelationRoomDg").datagrid('appendRow',rows[i]);
			var index = $("#unRelatedRoomDg").datagrid("getRowIndex",rows[i]);
			$("#unRelatedRoomDg").datagrid('deleteRow',index);
		}
		$("#unRelatedRoomDg").datagrid('clearChecked');
	}
	if(type==1){//移除关联
		var row = $("#existingRelationRoomDg").datagrid("getChecked");
		if(row.length == 0){
			myTips("请选择要取消关联的房","error");
			return;
		}
		for(var i in row){
			var index = $("#existingRelationRoomDg").datagrid("getRowIndex",row[i]);
			$("#existingRelationRoomDg").datagrid('deleteRow',index);
			$("#unRelatedRoomDg").datagrid('appendRow',row[i]);
		}
		$("#existingRelationRoomDg").datagrid('clearChecked');
	}
}

//设备 更新关联(左右移动) 
function updateDeviceRelation(type){
	if(type==0){//添加关联
		var rows =$("#unRelatedDeviceDg").datagrid('getChecked');
		if(rows==0){
			myTips("请选择要关联的房","error");
			return;
		}
//		console.log(rows.length);
		var relatedRrows = $('#existingRelationDeviceDg').datagrid("getRows");
		for (var i in relatedRrows){
			for(var j in rows){
				if(relatedRrows[i].id == rows[j].id){
					$.messager.alert('Warning',rows[j].devType+"(类型) "+rows[j].devNickname+"设备 "+"已关联，请勿重复关联！");
					return;
				}
			}
		}
		for(var i in rows){
			$("#existingRelationDeviceDg").datagrid('appendRow',rows[i]);
			var index = $("#unRelatedRoomDg").datagrid("getRowIndex",rows[i]);
		}
		$("#unRelatedDeviceDg").datagrid('clearChecked');
	}
	if(type==1){//移除关联
		var row = $("#existingRelationDeviceDg").datagrid("getChecked");
		if(row.length == 0){
			myTips("请选择要取消关联的设备","error");
			return;
		}
		for(var i in row){
			var index = $("#existingRelationDeviceDg").datagrid("getRowIndex",row[i]);
			$("#existingRelationDeviceDg").datagrid('deleteRow',index);
			/*$("#unRelatedDeviceDg").datagrid('appendRow',row[i]);*/
		}
		$("#existingRelationDeviceDg").datagrid('clearChecked');
	}
}

//更新关联房
function updateRelations(){
	var hsRows = $('#existingRelationRoomDg').datagrid('getRows');
	var devRows=$('#existingRelationDeviceDg').datagrid('getRows');
	var row = $('#virtualDataGrid').datagrid('getSelected');
	
	var data = [];

	var jsonArray = [];
	if (hsRows.length == 0) {
		jsonArray.push({
			jhoOfficeId 	: row.hsId,
			jhoHsId 		: 0
		});
	}else{
		for(var i in devRows){
			for (var j in hsRows) {
				jsonArray.push({
					jhoOfficeId 	: row.hsId,
					jhoDeviceId		: devRows[i].id,
					jhoHsId 		: hsRows[j].hsId
				});
			}	
		}
	}
	var splitJson = JSON.stringify(jsonArray);
	showLoading();
	$.post("../updateJourHsOffice.action", {jhoIdJson : splitJson}, function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}else{
			myTips(data.msg,"success");
		}
	});
}

//添加查询搜索
function searchRoom(rooms){
	$("#searchCommunity").append("<option value = ''></option>");
	$("#searchBuilding").append("<option value = ''></option>");
	for(var i =0;i<rooms.length;i++){
		$("#searchCommunity").append("<option value = '" + row[i].hsAddCommunity + "'>" + row[i].hsAddCommunity + "</option>");
		$("#searchBuilding").append("<option value = '" + row[i].hsAddBuilding + "'>" + row[i].hsAddBuilding + "</option>");
	}
	
}


