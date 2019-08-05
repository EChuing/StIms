$(function() {
	advancedScreening(0);
	for (var i in _loginCompanyRentDistrict) {
		$("#searchAddDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	for(var j in _userInfoData){
		if(_loginUserId == _userInfoData[j].userId){
			$("#searchFollowGetUserId").val(_loginUserId);
			$("#searchFollowShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}
	if($("#searchState").val()==''){
		$("#searchState").val('未完成');
	}
	queryRepair(1, 0);
	queryDept();
	if(_loginType == "合作方"){
		$("#getUserQuery").hide();
		$("#setUserQuery").hide();
	}
	$("#repairDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			var imgNum = rowData.repImgNum;
			var img = imgNum.split("/")[0];
			var file = imgNum.split("/")[1];
			$(".checImageNum").html("（图片：" + img + "张    文件：" + file + "个）");
			$(".repair_index").val(rowIndex);
			$("#repairInfoDlg").dialog({
				title : "维修信息",
				top : getTop(530),
				left : getLeft(750),
				width : 750,
				height : 530,
				closed : true,
				cache : false,
				modal : true,
				onClose : function() {
					$("#repairInfoDlg input").val('');
					$("#repairInfoDlg textarea").val('');
				}
			});
			queryRepairInfo(rowData);
		}
	});
	for (var i in _billingInfo) {
		$(".add_billing_info").append(
				"<option value = '" + i + "'>" + _billingInfo[i] + "</option>");
	}
	for (var i in _retResult) {
		$(".add_return_result").append(
				"<option value = '" + i + "'>" + _retResult[i] + "</option>");
	}
	for (var i in _proType) {
		$(".add_proType").append(
				"<option value = '" + _proType[i] + "'>" + _proType[i] + "</option>");
	}
	for (var i in _retAttitude) {
		$(".add_return_attitude").append(
				"<option value = '" + i + "'>" + _retAttitude[i] + "</option>");
	}
	for (var i in _repHopeTime) {
		$(".repair_hope_select").append(
				"<option value = '" + _repHopeTime[i] + "'>" + _repHopeTime[i] + "</option>");
	}
	for (var i in _repResponsibility) {
		$(".repair_responsibility").append("<option value = '" + i + "'>" + _repResponsibility[i]+ "</option>");
		$("#newAttribution").append("<option value = '" + i + "'>" + _repResponsibility[i]+ "</option>");
	}
	for (var i in _eventType) {
		$(".repair_type_rp").append(
				"<option value = '" + i + "'>" + _eventType[i] + "</option>");
	}
	for (var i in _saUse) {
		$('#searchSaUse').append(
				"<option value='" + _saUse[i] + "'>" + _saUse[i] + "</option>");
	}
	for (var i in _saType) {
		$('#searchSaType').append(
				"<option value='" + _saType[i] + "'>" + _saType[i] + "</option>");
	}
	for (var i in _acountType) {
		$('#setFinancialWay').append(
				"<option value='" + i + "'>" + _acountType[i] + "</option>");
		$('.add_financial_way').append(
				"<option value='" + i + "'>" + _acountType[i] + "</option>");
	}
	for (var i in _payType) {
		$('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
	}
	for (var i in _supType) {
		$('#searchSupType').append('<option value="' + _supType[i] + '">' + _supType[i] + '</option>');
	}
	// 部门添加
	$.post("../queryDepartment.action", {
		departmentStorefrontId : _loginStore,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$(".add_source_theStore").append("<option value = '" + data[i].departmentId + "'>" + data[i].departmentName + "</option>");
			_depadepartment[i] = data[i].departmentId;
		}
	}, "json");
});

//高级筛选
function advancedScreening(num){
	if(num == 0){
		$('.advancedScreening').css({
			"height" : "30px",
			"width"  : '900px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "28px",
		})
		$('.advanced2').css({
			"height" : "0px",
		})
		$('#screening').attr('onclick','advancedScreening(1)');
	}else if(num == 1){
		$('.advancedScreening').css({
			"height" : "65px",
			"width"  : '100%',
		})
		$('.advanced1').css({
			"height" : "28px",
		})
		$('.advanced2').css({
			"height" : "32px",
		})
		$('#screening').attr('onclick','advancedScreening(0)');
	}
}

// 维修表导入数据
function queryRepair(page, type) {
    console.log("page:"+page);
	var pageSize = 15;
	var startPage = (parseInt(page) - 1) * pageSize;
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#searchBuilding").val();
	var addDoorplateno = $("#searchDoorplateno").val();
	var startTime = $("#searchStartTime").val();
	var endTime = $("#searchEndTime").val();
	var repState = $("#searchState").val();
	var repRepairPeopleId = $("#searchFollowGetUserId").val();
	var repUserId = $("#searchRegistGetUserId").val();
	var repDepartment = $("#searchFollowGetUserDetId").val();
	$.post("../selectRepair.action", {
		startNum 			: startPage,
		endNum 				: pageSize,
		addCommunity 		: addCommunity,
		repState 			: repState,
		fromTime 			: startTime,
		toTime 				: endTime,
		repRepairPeopleId	: repRepairPeopleId,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		repUserId			: repUserId,
		repDepartment		: repDepartment,
		splitFlag			: 1,
	}, function(data) {
		if (data.code<0) {
			$('#repairDg').datagrid({
				data : [],
				view : myview,
				emptyMsg :data.msg
			});
			notCountPage(page, 0 ,"queryRepair","repair");
		} else {
			data=data.body;
			// for (var i in data){
			// 	console.log(data[i]);
			// }
			if(data.length<pageSize){
				notCountPage(page, 2 , "queryRepair","repair");
			}else{
				notCountPage(page, 1 , "queryRepair","repair");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].totalPage = taskCostTime(data[i].repReportingTime,data[i].repUseTime);
				if ((data[i].repHouse4rentId != null && data[i].repHouse4rentId != '')||(data[i].repHouse4storeId != null && data[i].repHouse4storeId != '')||(data[i].repHouseId != null && data[i].repHouseId != '')) {
					data[i].startNum = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
				} else {
					data[i].startNum = '无地址维修';
				}
			}
			$("#repairDg").datagrid("loadData", data);
		}
	}, "json");
}
//分页统计数据
function getrepairPageCount(page) {
	var pageSize = 15;
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#searchBuilding").val();
	var addDoorplateno = $("#searchDoorplateno").val();
	var startTime = $("#searchStartTime").val();
	var endTime = $("#searchEndTime").val();
	var repState = $("#searchState").val();
	var repRepairPeopleId = $("#searchFollowGetUserId").val();
	var repUserId = $("#searchRegistGetUserId").val();
	var repDepartment = $("#searchFollowGetUserDetId").val();
	$.post("../selectRepair.action", {
		addCommunity 		: addCommunity,
		repState 			: repState,
		fromTime 			: startTime,
		toTime 				: endTime,
		repRepairPeopleId	: repRepairPeopleId,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		repUserId			: repUserId,
		repDepartment		: repDepartment,
		splitFlag			: 0,
	}, function(data) {
		if (data.code<0) {
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"repair",0);
		} else {
			data=data.body;
			for (var i in data){
				console.log(data[i]);
			}
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(0,countJson,pageSize,page,"repair",0);
		}
	}, "json");
}
// 上一条下一条
function laterOrNext(type) {
	var dataIndex = $(".repair_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".repair_index").val(num);
			changeData = $('#repairDg').datagrid('getData').rows[num];
			$('#repairDg').datagrid('selectRow', num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#repairDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".repair_index").val(num);
			changeData = $('#repairDg').datagrid('getData').rows[num];
			$('#repairDg').datagrid('selectRow', num);
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
		queryRepairInfo(changeData);
	}
}
// 维修详细信息获取
function queryRepairInfo(row) {
	if ((row.repHouse4rentId != null && row.repHouse4rentId != '')||(row.repHouse4storeId != null && row.repHouse4storeId != '')||(row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_address").val(row.startNum);
	}else {
		$(".repair_address").val('无地址维修');
	}
	if ((row.repHouse4rentId != null && row.repHouse4rentId != '')&&(row.repHouse4storeId != null && row.repHouse4storeId != '')&&(row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_houseType").val('已租维修');
	}else if((row.repHouse4rentId == null || row.repHouse4rentId == '')&&(row.repHouse4storeId != null && row.repHouse4storeId != '')&&(row.repHouseId != null && row.repHouseId != '')){
		$(".repair_houseType").val('未租维修');
	}else if((row.repHouse4rentId == null || row.repHouse4rentId == '')&&(row.repHouse4storeId == null || row.repHouse4storeId == '')&&(row.repHouseId != null && row.repHouseId != '')){
		$(".repair_houseType").val('盘源维修');
	}else{
		$(".repair_houseType").val('无关联维修');
	}
	switch (row.repState) {
		case "未领取": {
			$("#doProgressButton").hide();
			$("#doReturningButton").hide();
			$("#updateRepairPeopleButton").show();
			$("#responsibilityAttribution").show();
			break;
		}
		case "跟进中": {
			$("#doProgressButton").show();
			$("#doReturningButton").hide();
			$("#updateRepairPeopleButton").show();
			$("#responsibilityAttribution").show();
			break;
		}
		case "未完成": {
			$("#doProgressButton").show();
			$("#doReturningButton").hide();
			$("#updateRepairPeopleButton").show();
			$("#responsibilityAttribution").show();
			break;
		}
		case "事件完成": {
			$("#doProgressButton").hide();
			$("#doReturningButton").show();
			$("#updateRepairPeopleButton").hide();
			$("#responsibilityAttribution").hide();
			break;
		}
		case "回访完成": {
			$("#doProgressButton").hide();
			$("#doReturningButton").hide();
			$("#updateRepairPeopleButton").hide();
			$("#responsibilityAttribution").hide();
			break;
		}
	}
	$(".repair_id").val(row.repId);
	$(".repair_time").val(row.repReportingTime);
	$(".repair_userName").val(row.repUserName);
	$(".repair_userId").val(row.repUserId);
	$(".repair_contacis").val(row.repContacts);
	$(".repair_contacisPhone").val(row.repContactsPhone);
	$("#repair_responsibility").val(row.repResponsibility);
	$(".repair_hope_time").val(row.repHopeTime);
	$(".repair_receive").val(row.repToReceive);
	$(".repair_type").val(row.repTypeRp);
	$(".repair_event").val(row.repEventRp);
	$(".repair_progress_rp").val(row.repProgressRp);
	$(".repair_peopleName").val(row.repRepairman);
	$(".repair_peopleId").val(row.repRepairPeopleId);
	$(".repair_state").val(row.repState);
	$(".repair_returnning").val(row.repReturningRp);
	$(".repair_toll_rp").val(row.repTollRp + "元");
	$('#repair_number').html(row.repNumber);
	$("#repairInfoDlg").dialog('open');
	
	$('#showReturningTable').datagrid({
		columns : [ [ {
			field : 'retTime',
			title : '回访时间',
			width : 10,
			align : 'center'
		}, {
			field : 'userName',
			title : '负责人',
			width : 10,
			align : 'center'
		}, {
			field : 'retResult',
			title : '回访结果',
			width : 10,
			align : 'center'
		},{
			field : 'retViolationRegulation',
			title : '是否违纪',
			width : 10,
			align : 'center'
		},{
			field : 'rteRemark',
			title : '备注',
			width : 35,
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
			var row = $("#showReturningTable").datagrid("getSelected");
			if (row) {
				for(var i in row){
					$("#readShowReturning"+i).text(row[i]);
				}
				$('#showReturningDlg').dialog({
					title : '回访详情',
					top : getTop(230),
					left : getLeft(420),
					width : 420,
					height : 230,
					closed : true,
					cache : false,
					modal : true,
					onClose : function() {
						$('.xwtable1 span').text('');
					}
				});
				$('#showReturningDlg').dialog('open');
			}
		}
	});
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
					title : '进展描述',
					width : 45,
					align : 'center',
					formatter : function(value, row, index) {
						return "<span title='" + row.proRemark
								+ "'>" + row.proRemark + "</span>";
					}
				}] ],
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
			var row = $("#showProgressTable").datagrid("getSelected");
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
						$('.xwtable1 span').text('');
					}
				});
				$('#showProgressDlg').dialog('open');
			}
		}
	});
	queryRepairReturning(row.repId);
	queryRepairProgress(row.repId);
}
// 维修详细回访列表导入数据
function queryRepairReturning(repId) {
	$.post("../queryAllRepairReturning.action", {
		retRepairId : repId
	}, function(data) {
		if (data.code<0) {
			$('#showReturningTable').datagrid("loadData", []);
		} else {
			data=data.body;
			for (var i in data) {
				data[i].retTime = formatTime(data[i].retTime, 1);
			}
			$('#showReturningTable').datagrid("loadData", data);
		}
	});
}
//维修详细进展列表导入数据
function queryRepairProgress(repId) {
	$.post("../queryAllRepairProgress.action", {
		proRepairId : repId
	}, function(data) {
		if (data.code<0) {
			$('#showProgressTable').datagrid("loadData", []);
		}else{
			data=data.body;
			for (var i in data) {
				data[i].proTime = formatTime(data[i].proTime, 1);
			}
			$('#showProgressTable').datagrid("loadData", data);
		}
	});
}
// 分页操作
function repairPage(totalNum, page) {
		var pageNum = Math.ceil(totalNum / 25);
		$("#repairPage").remove();
		$("#repairPageDiv").append("<div class='tcdPageCode' id='repairPage' style='text-align:center;'></div>");
		$("#repairPage").createPage({
			onePageNums:30,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRepair(p, 1);
				}
			}
		});
}
//维修状态列格式
function formatState(value, row, index) {
	if (row.repState == '未领取') {
		return "<a style='text-decoration:none;color:red;'>" + row.repState + "<a>";
	} else if (row.repState == '回访完成') {
		return "<a style='text-decoration:none;color:blue;'>" + row.repState + "<a>";
	} else {
		return "<a style='text-decoration:none;color:green;'>" + row.repState + "<a>";
	}
}
// 报修时间列格式
function formatOperRepTime(value, row, index) {
	return formatTime(row.repReportingTime, 1);
}
// 维修事件列格式
function formatEventRp(value, row, index) {
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
// 领取维修列格式
function formatReceive(value, row, index) {
	if (row.repToReceive == '未领取') {
		return "<a href='#' style='text-decoration:none;color:red;' onclick='toReceive("
				+ row.repId + "," + index + ")'>" + row.repToReceive + "<a>";
	} else {
		return formatTime(row.repToReceive, 1);
	}
}
// 进展列格式
function formatProgressRp(value, row, index) {
	if (row.repProgressRp != null && row.repProgressRp != '') {
		var progress = row.repProgressRp;
		if (row.repProgressRp.length > 20) {
			progress = row.repProgressRp.substr(0, 20) + "...";
		}
		return "<a href='#' style='text-decoration:none;color:blue;' onclick='showProgress("
				+ row.repId
				+ ")' title='"
				+ row.repProgressRp
				+ "'>"
				+ progress + "</span>";
	} else {
		return '';
	}
}
// 回访列格式
function formatReturningRp(value, row, index) {
	if (row.repReturningRp == '未回访' || row.repReturningRp == '未完成') {
		$('#repairDg').datagrid('selectRow', index);
		return "<a href='#' style='text-decoration:none;color:red;' onclick='addReturningRp("
				+ index + ",0)'>" + row.repReturningRp + "</a>";
	} else {
		$('#repairDg').datagrid('selectRow', index);
		return "<a href='#' style='text-decoration:none;color:blue;' onclick='showReturningRp("
				+ row.repId + ")'>" + row.repReturningRp + "</a>";
	}
}
// 执行领取维修
function toReceive(repId, index) {
	var loginPurview = $('#loginPurview').val();
	var loginPurviewJson = JSON.parse(loginPurview);
	if (_thisPurview['a'] == 0 || _thisPurview['c'][3]==0) {//领取维保任务
		$.messager.alert('通知', '无领取维保任务权限', 'info');
		return;
	}
	$.messager.confirm("操作提示", "确定要领取租务维修吗？", function(data) {
		if (data) {
			var repToReceive = getNowFormatDate();
			$.post("../updateRepair.action", {
				repId : repId,
				repToReceive : repToReceive,
				repState : '跟进中'
			}, function(data) {
				if(data.code<0){
					myTips(data.msg,"error");
				}
				myTips("领取成功！","success");
				var current=$(".current").html();
				queryRepair(current, 0);
			});
		}
	});
}
//添加维保
function addRepair() {
	$("#addRepairDlg").dialog({
		title : "添加维保",
		top : getTop(340),
		left : getLeft(380),
		width : 380,
		height : 340,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addRepairDlg [clear="clear"]').val('');
			$('#addRepairDlg [clean="clean"]').html('');
			$('#addRepairDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#shorMessageRemind').prop({checked:true});
			clearAttachment();
		},
		onOpen :function(){
			$("#addRepairDlg #repair_hope_time").val("尽快");
		}
	});
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$("#addRepairDlg").dialog('open');
}
//执行添加维修
function doAddRepair() {
	var houseRentCoding = $(".repair_houseRentCoding").val();
	var houseStoreCoding = $(".repair_houseStoreCoding").val();
	var houseCoding = $(".repair_houseCoding").val();
	var repName = $(".repair_name").val();
	var repPhone = $(".repair_phone").val();
	var repHopeTime = $("#repair_hope_time").val();
	var repRespon = $(".repair_responsibility").find("option:selected").text();
	var repEvent = $(".repair_event_rp").val();
	var repTypeRp = $(".repair_type_rp").find("option:selected").text();
	var repRepairPeopleId = $("#doRepairGetUserId").val();
	var repTaskTime = getTaskTime();
	var repNumber = randomNumber();
	var att = $("#att").val();
	var jhfFollowRemark = _loginUserName+' 添加'+repTypeRp+':'+repEvent;
	var type="维保";
	showLoading();
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
		repUserId : _loginUserId,
		repTypeRp : repTypeRp,
		repDepartment : _loginDepartment,
		repStorefront : _loginStore,
		repTaskTime : repTaskTime,
		repNumber : repNumber,
		att : att,
		type:type,
	}, function(data) {
		hideLoading();
		if (data.code<0) {
			myTips(data.msg, "error");
			return;
		}
//		$.post("../insertHousingFollow.action",{
//			jhfHouseId        : houseCoding,
//			jhfHouse4rentId   : houseRentCoding,
//			jhfHouse4storeId  : houseStoreCoding,
//			jhfFollowRemark   : jhfFollowRemark,
//			jhfUserId         : _loginUserId,
//			jhfDepartment     : _loginDepartment,
//			jhfStorefront     : _loginStore,
//			jhfPaymentWay     : '系统跟进',
//			jhfFollowResult   : '跟进成功',
//		}, function(fData) {
//			
//		})
		isSave = true;
		doSendMessage();
		doSendTemplateMessage();
		myTips("添加成功！", "success");
	});
}
// 选择房源
function choseHouse() {
	$('#choseHouseDlg').dialog({
		title : '选择房源',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	relationDataGrid();
	$('#choseHouseDlg').dialog('open');
}
function relationDataGrid() {
	var relationType = $('#searchBelongType').find('option:selected').text();
	$('#searchHrStateDiv').hide();
	if (relationType == '已租列表') {
		$('#choseSaveHouse').hide();
		$('#choseTrusteeship').hide();
		$('#choseSource').show();
		$('#searchHrStateDiv').show();
		if ($('#choseSourceTable').hasClass('datagrid-f')) {

		} else {
			$('#searchHrStateDiv').show();
			$('#choseSourceTable').datagrid({
				columns : [ [ {
					field : 'hrAddDistrict',
					title : '城区',
					width : 20,
					align : 'center'
				}, {
					field : 'hrAddZone',
					title : '片区',
					width : 20,
					align : 'center'
				}, {
					field : 'hrAddCommunity',
					title : '楼盘名称',
					width : 30,
					align : 'center'
				}, {
					field : 'hrAddBuilding',
					title : '楼栋',
					width : 10,
					align : 'center'
				}, {
					field : 'hrAddDoorplateno',
					title : '门牌',
					width : 10,
					align : 'center'
				}, {
					field : 'renterPopName',
					title : '租客',
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
					var row = $('#choseSourceTable').datagrid('getSelected');
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					$('.repair_houseRentCoding').val('');
					$('.repair_houseStoreCoding').val('');
					$('.repair_houseCoding').val('');
					$('.repair_houseType').val('');
					$('.repair_name').val('');
					$('.repair_phone').val('');
					
					$('.repair_choseHouse').val(row.hrAddCommunity + row.hrAddBuilding + row.hrAddDoorplateno);
					$('.repair_houseRentCoding').val(row.hrId);
					$('.repair_houseStoreCoding').val(row.hrHouse4storeId);
					$('.repair_houseCoding').val(row.hrHouseId);
					$('.repair_houseType').val('已租维修');
					$('.repair_name').val(row.renterPopName);
					$('.repair_phone').val(row.renterPopTelephone);
					$('#choseHouseDlg').dialog('close');
				}
			});
		}
	}
	if (relationType == '未租列表') {
		$('#choseSource').hide();
		$('#choseSaveHouse').hide();
		$('#choseTrusteeship').show();
		if ($('#choseTrusteeshipTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipTable').datagrid({
				columns : [ [ {
					field : 'hsAddDistrict',
					title : '城区',
					width : 20,
					align : 'center'
				}, {
					field : 'hsAddZone',
					title : '片区',
					width : 20,
					align : 'center'
				}, {
					field : 'hsAddCommunity',
					title : '楼盘名称',
					width : 30,
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
				}, {
					field : 'laPopName',
					title : '业主',
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
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					$('.repair_houseRentCoding').val('');
					$('.repair_houseStoreCoding').val('');
					$('.repair_houseCoding').val('');
					$('.repair_houseType').val('');
					$('.repair_name').val('');
					$('.repair_phone').val('');
					
					$('.repair_choseHouse').val(row.hsAddCommunity + row.hsAddBuilding + row.hsAddDoorplateno);
					$('.repair_houseRentCoding').val('');
					$('.repair_houseStoreCoding').val(row.hsId);
					$('.repair_houseCoding').val(row.hsHouseId);
					$('.repair_houseType').val('未租维修');
					$('.repair_name').val(row.laPopName);
					$('.repair_phone').val(row.laPopTelephone);
					$('#choseHouseDlg').dialog('close');
				}
			});
		}
	}
	if (relationType == '盘源列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').show();
		if ($('#choseSaveHouseTable').hasClass('datagrid-f')) {

		} else {
			$('#choseSaveHouseTable').datagrid({
				columns : [ [ {
					field : 'addDistrict',
					title : '城区',
					width : 20,
					align : 'center'
				}, {
					field : 'addZone',
					title : '片区',
					width : 20,
					align : 'center'
				}, {
					field : 'addCommunity',
					title : '楼盘名称',
					width : 30,
					align : 'center'
				}, {
					field : 'addBuilding',
					title : '楼栋',
					width : 10,
					align : 'center'
				}, {
					field : 'addDoorplateno',
					title : '门牌号',
					width : 10,
					align : 'center'
				}, {
					field : 'houseState',
					title : '状态',
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
					var row = $('#choseSaveHouseTable').datagrid(
							'getSelected');
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					$(".repair_houseRentCoding").val('');
					$(".repair_houseStoreCoding").val('');
					$(".repair_houseCoding").val('');
					$(".repair_houseType").val('');
					$(".repair_name").val('');
					$(".repair_phone").val('');
					
					$(".repair_choseHouse").val(row.addCommunity + row.addBuilding + row.addDoorplateno);
					$(".repair_houseRentCoding").val('');
					$(".repair_houseStoreCoding").val('');
					$(".repair_houseCoding").val(row.houseCoding);
					$(".repair_houseType").val('盘源维修');
					if(row.lipLandlordName!=''&&row.lipLandlordName!=null&&row.lipLandlordPhone!=''&&row.lipLandlordPhone!=null){
						$(".repair_name").val(row.lipLandlordName);
						$(".repair_phone").val(row.lipLandlordPhone);
					}
					$('#choseHouseDlg').dialog('close');
				}
			});
		}
	}
	choseHouseData(1, 0);
}
function choseHouseData(page, type) {
	var relation = $('#searchBelongType').val();
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();
	var searchHrLeaseState = $("#searchHrLeaseState").val();
	if (relation == 1) {
		$.post("../queryHouseRentCommon.action", {
			startNum 		: startNum,
			endNum 			: endNum,
			hrAddCity 		: qhAddCity,
			hrAddDistrict 	: qhAddDistrict,
			hrAddZone 		: qhAddZone,
			hrAddCommunity 	: qhAddCommunity,
			hrAddBuilding 	: qhAddBuilding,
			hrAddDoorplateno: qhAddDoorplateno,
			hrLeaseState	: searchHrLeaseState,
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 1);
				$('#choseSourceTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data = data.body;
				if (page == 1 && type == 0) {
					sourcePage(data[0].totalNum, page, 1);
				}
				$("#choseSourceTable").datagrid("loadData", data);
			}
		}, "json");
	}
	if (relation == 2) {
		$.post("../queryHouseStoreCommon.action", {
			startNum : startNum,
			endNum : endNum,
			hsAddCity : qhAddCity,
			hsAddDistrict : qhAddDistrict,
			hsAddZone : qhAddZone,
			hsAddCommunity : qhAddCommunity,
			hsAddBuilding : qhAddBuilding,
			hsAddDoorplateno : qhAddDoorplateno,
			hsLeaseState :'所有未租',
		}, function(data) {
			if (data.code < 0) {
				sourcePage(0, 0, 2);
				$('#choseTrusteeshipTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data= data.body;
				if (page == 1 && type == 0) {
					sourcePage(data[0].totalNum, page, 2);
				}
				$("#choseTrusteeshipTable").datagrid("loadData", data);
			}
		}, "json");
	}
	if (relation == 3) {
		$.post("../queryHousePaperCommon.action", {
			startNum : startNum,
			endNum : endNum,
			addCity : qhAddCity,
			addDistrict : qhAddDistrict,
			addZone : qhAddZone,
			addCommunity : qhAddCommunity,
			addBuilding : qhAddBuilding,
			addDoorplateno : qhAddDoorplateno,
			houseSignedState :'未托管',

		}, function(data) {
			if (data.code < 0) {
				sourcePage(0, 0, 3);
				$('#choseSaveHouseTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				if (page == 1 && type == 0) {
					sourcePage(data.body[0].totalNum, page, 3);
				}
				$("#choseSaveHouseTable").datagrid("loadData", data.body);
			}
		}, "json");
	}
}
// 分页
function sourcePage(totalNum, page, type) {
	console.log(totalNum);
	var pageNum = Math.ceil(totalNum / 15);
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 15);
		$("#choseSourcePage").remove();
		$("#choseSourcePageDiv")
				.append(
						"<div class='tcdPageCode' id='choseSourcePage' style='text-align:center;'></div>");
		$("#choseSourcePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					choseHouseData(p, 1);
				}
			}
		});
	}
	if (type == 2) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseTrusteeshipPage").remove();
		$("#choseTrusteeshipPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseTrusteeshipPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					choseHouseData(p, 1);
				}
			}
		});
	}
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 15);
		$("#choseSaveHousePage").remove();
		$("#choseSaveHousePageDiv")
				.append(
						"<div class='tcdPageCode' id='choseSaveHousePage' style='text-align:center;'></div>");
		$("#choseSaveHousePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					choseHouseData(p, 1);
				}
			}
		});
	}
	if (type == 4) {
		pageNum = Math.ceil(totalNum / 15);
		$("#assetsPage").remove();
		$("#assetsPageDiv")
				.append(
						"<div class='tcdPageCode' id='assetsPage' style='text-align:center;'></div>");
		$("#assetsPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAsset(p, 1);
				}
			}
		});
	}
	if (type == 5) {
		pageNum = Math.ceil(totalNum / 15);
		$("#assetsListTablePage").remove();
		$("#assetsListTablePageDiv")
				.append(
						"<div class='tcdPageCode' id='assetsListTablePage' style='text-align:center;'></div>");
		$("#assetsListTablePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAsset(p, 1);
				}
			}
		});
	}
}
//添加进展
function addProgress() {
	var row = $("#repairDg").datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	if (row.repState == '未领取') {
		myTips('维修还未领取，无法添加进展!');
		return;
	} else if (row.repState == '回访完成') {
		myTips('回访已完成，无法添加进展!');
		return;
	} else if (row.repState == '事件完成') {
		myTips('维修已完成，无法添加进展!');
		return;
	}
	$("#addProgressDlg").dialog({
		title : '添加进展',
		top : getTop(330),
		left : getLeft(580),
		height : 330,
		width : 580,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addProgressDlg [clear="clear"]').val('');
			$('#addProgressDlg [clear="clear"]').html('');
			$('#addProgressDlg [choose="choose"]').val('');
		}

	});
	
	$(".add_pro_repairId").val(row.repId);
	$(".add_pro_tollRp").val(row.repTollRp);
	$(".add_pro_time").val(getNowFormatDate());
	$(".add_pro_man_money").val(0);
	$(".add_pro_use_money").val(0);
	$(".add_pro_other_money").val(0);
	$('.complete').hide();
	var imgNum = row.repImgNum;
	var img = imgNum.split("/")[0];
	var file = imgNum.split("/")[1];
	$(".checImageNum").html("（图片：" + img + "张    文件：" + file + "个）");
	$("#addProgressDlg").dialog('open');
}
function changeProgressType(){
	var proType = $('.add_proType').val();
	if (proType == '已完成') {
		$('.complete').show();
		$('.eventApproval').hide();
		$('#createEventApproval').prop("checked", false);
		$('#shorMessageRemind1').prop("checked", false);
	} else {
		$('.complete').hide();
		$('#createEventApproval').prop("checked", false);
		$('#shorMessageRemind1').prop("checked", false);
		$('#confirmNumber').val('');
		$('#confirmNumberCheckoutIf').val('');
		$('#confirmNumberTips').html('');
		$('.add_pro_tollRp').val('');
		$('.add_billing_info').val('');
		$('.add_pro_man_money').val('');
		$('.add_pro_use_money').val('');
	}
}
// 添加回访记录
function addReturningRp(index, type) {
	var row = $('#repairDg').datagrid('getData').rows[index];
	if (row.repState == '未领取') {
		myTips('维修还未领取，无法添加回访!');
		return;
	} else if (row.repState == '回访完成') {
		myTips('回访已完成，无法添加回访!');
		return;
	} else if (row.repState == '跟进中') {
		myTips('维修还未完成，无法添加回访!');
		return;
	}
	$("#addReturningDlg").dialog({
		title : '添加回访',
		top : getTop(300),
		left : getLeft(600),
		height : 310,
		width : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addReturningDlg input").val('');
			$("#addReturningDlg textarea").val('');
			$("#addReturningDlg select").val('');
			$("#addReturningDlg input[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
			$("#addReturningDlg select[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
		}
	});
	$("#addReturningInfo").show();
	$(".add_return_userName").val(_loginUserName);
	$(".add_return_userId").val(_loginUserId);
	$(".add_return_repairId").val(row.repId);
	$(".add_return_pay").val(row.repTollRp);
	$(".add_return_time").val(getNowFormatDate());
	$("#addReturningDlg").dialog('open');
}

// 执行添加进展
function doAddProgress() {
	var rowIndex = $('#repairDg').datagrid('getRowIndex', $('#repairDg').datagrid('getSelected'));
	var proTime = $('.add_pro_time').val();
	var repId = $('.add_pro_repairId').val();
	var proState = $('.add_proType').find('option:selected').text();
	var proBillingInfo = $('.add_billing_info').find('option:selected').text();
	var proManMoney = $('.add_pro_man_money').val();
	var proUseMoney = $('.add_pro_use_money').val();
	var proMoney = accAdd(proManMoney,proUseMoney);
	var proMark = $('.add_pro_mark').val();
	if(proManMoney != 0){
		proMark += '，人工费：'+ proManMoney;
	}
	if(proUseMoney != 0){
		proMark += '，材料费：'+ proUseMoney;
	}
	if($('#createEventApproval').is(':checked')){
		proMark += '，已生成审批';
	}
	var jcdId = $('#confirmNumberCheckoutIf').val();
	var row = $("#repairDg").datagrid("getSelected");
	var jcdHouseAddress = row.addCommunity + " " + row.addBuilding + " " + row.addDoorplateno;
	showLoading();
	$.post('../insertRepairProgress.action', {
		proRepairId 		: repId,
		proUserId 			: _loginUserId,
		department 			: _loginDepartment,
		storefront 			: _loginStore,
		proTime 			: proTime,
		proState 			: proState,
		proReceivableMoney	: proMoney,
		proBillingInfo 		: proBillingInfo,
		proRemark 			: proMark,
		proManMoney			: proManMoney,
		proUseMoney			: proUseMoney,
		jcdId				: jcdId,
		jcdHouseAddress		: jcdHouseAddress,
	}, function(data) {
		hideLoading();
		if (data.code<0) {
			myTips(data.msg,'error');
			return;
		} else {
			data=data.body;
			$('#addProgressDlg').dialog('close');
			var addProState = '跟进中';
			//最新进展
			var repProgressRp = '(' + formatTime(proTime, 2) + ')' + proState + ',' + proMark;
			//改事件状态
			if (proState == '已完成') {
				addProState = '事件完成';
				$('#repairDg').datagrid('updateRow', {
					index : rowIndex,
					row : {
						repState : '事件完成',
					}
				});
			}
			//改事件状态、最新进展
			$.post('../updateRepair.action', {
				repId : repId,
				repProgressRp : repProgressRp,
				repState : addProState,
				repTollRp : proMoney
			}, function(data) {
				if (data.code<0) {
					myTips(data.msg, 'error');
					return;
				}
				$('.repair_toll_rp').val(proMoney);
				$('#repairDg').datagrid('updateRow', {
					index : rowIndex,
					row : {
						repState	  : addProState,
						repProgressRp : repProgressRp,
						repTollRp	  : proMoney,
					}
				});
				queryRepairReturning(repId);
				queryRepairProgress(repId);
				$("#repairInfoDlg").dialog('close');
				myTips('添加进展成功！','success');
				
			});
		}
	});
}
// 执行添加回访
function doAddReturning() {
	var rowIndex = $('#repairDg').datagrid('getRowIndex',
			$('#repairDg').datagrid('getSelected'));
	var retRepairId = $(".add_return_repairId").val();
	var retUserId = $(".add_return_userId").val();
	var retResult = $(".add_return_result").find("option:selected").text();
	var retTime = $(".add_return_time").val();
	var retServiceAttitude = $(".add_return_attitude").find("option:selected").text();
	var retCompleteQuality = $(".add_return_quality").find("option:selected").text();
	var retViolationShopping = $(".add_return_shopping").find("option:selected").text();
	var tollRp = $(".add_return_pay").val();
	var retViolationGetpay = $(".add_return_getpay").val();
	var rteRemark = $(".add_return_mark").val();
	var returnState = $(".add_return_resultState").val();
	var retViolationRegulation = '无违纪';
	// 判断是否违纪
	if (retServiceAttitude == ' 态度很差' || retCompleteQuality == '否'
			|| retViolationShopping == '否'
			|| (retViolationGetpay != '' && retViolationGetpay != tollRp)) {
		retViolationRegulation = '有违纪';
	}
	if(returnState=="回访未成功"){
		retResult = '未完成';
	}
	showLoading();
	$.post("../insertRepairReturning.action", {
		retRepairId : retRepairId,
		retUserId : _loginUserId,
		retTime : retTime,
		retResult : retResult,
		retServiceAttitude : retServiceAttitude,
		retCompleteQuality : retCompleteQuality,
		retViolationShopping : retViolationShopping,
		retViolationGetpay : retViolationGetpay,
		rteRemark : rteRemark,
		retViolationRegulation : retViolationRegulation,
		department : _loginDepartment,
		storefront : _loginStore
	}, function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
		}else{
			var repState = '事件完成';
			$("#addReturningDlg").dialog('close');
			if(returnState== '回访未成功'){
				var proState = "回访未成功";
				var proMark = rteRemark;
				var repProgressRp = "(" + formatTime(retTime, 2) + ")"
						+ proState + "," + proMark;
				$.post("../insertRepairProgress.action", {
					proRepairId : retRepairId,
					proUserId : _loginUserId,
					proTime : retTime,
					proState : proState,
					proRemark : proMark,
					department : _loginDepartment,
					storefront : _loginStore
				}, function(data) {
					$.post("../updateRepair.action", {
						repId : retRepairId,
						repState : repState,
						repProgressRp : repProgressRp,
						repReturningRp : '未完成'
					}, function(data) {
						$("#addReturningDlg").dialog('close');
						$(".repair_progress_rp").val(repProgressRp);
						$('#repairDg').datagrid('updateRow', {
							index : rowIndex,
							row : {
								repState : repState,
								repProgressRp : repProgressRp,
								repReturningRp : '未完成',
							}
						});
						queryRepairReturning(retRepairId);
						queryRepairProgress(retRepairId);
						$("#repairInfoDlg").dialog('close');
						myTips("添加回访成功！","success");
					});
				});
			}else{
				if (retResult == '回访完成') {
					repState = '回访完成';
					$.post("../updateRepair.action", {
						repId : retRepairId,
						repState : repState,
						repReturningRp : retResult
					}, function(data) {
						$('#repairDg').datagrid('updateRow', {
							index : rowIndex,
							row : {
								repState : '回访完成',
								repReturningRp : '回访完成',
							}
						});
						queryRepairReturning(retRepairId);
						queryRepairProgress(retRepairId);
						$("#repairInfoDlg").dialog('close');
						myTips("添加回访成功！","success");
					});
				}else if(retResult == '未完成') {
					repState = '跟进中';
					var proState = "未完成";
					var proMark = "回访客户反馈说未完成。";
					var repProgressRp = "(" + formatTime(retTime, 2) + ")"
							+ proState + "," + proMark;
					$.post("../insertRepairProgress.action", {
						proRepairId : retRepairId,
						proUserId : _loginUserId,
						proTime : retTime,
						proState : proState,
						proRemark : proMark,
						department : _loginDepartment,
						storefront : _loginStore
					}, function(data) {
						$.post("../updateRepair.action", {
							repId : retRepairId,
							repState : repState,
							repProgressRp : repProgressRp,
							repReturningRp : retResult
						}, function(data) {
							$("#addReturningDlg").dialog('close');
							$(".repair_progress_rp").val(repProgressRp);
							$('#repairDg').datagrid('updateRow', {
								index : rowIndex,
								row : {
									repState : repState,
									repProgressRp : repProgressRp,
									repReturningRp : proState,
								}
							});
							queryRepairReturning(retRepairId);
							queryRepairProgress(retRepairId);
							$("#repairInfoDlg").dialog('close');
							myTips("添加回访成功！","success");
						});
					});
				}
			}
		}
	});
}
// 进展列表显示
function showProgress(repId) {
	$("#progressDlg").dialog({
		title : '进展过程',
		top : getTop(300),
		left : getLeft(600),
		width : 600,
		height : 300,
		closed : true,
		cache : false,
		modal : true
	});
	if ($('#progressTable').hasClass('datagrid-f')) {

	} else {
		$('#progressTable').datagrid(
				{
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
								title : '进展描述',
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
						var row = $("#progressTable").datagrid("getSelected");
						if (row) {
							for(var i in row){
								$("#readShowProgress"+i).text(row[i]);
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
									$('.xwtable1 span').text('');
								}
							});
							$('#showProgressDlg').dialog('open');
						}
					}
				});
	}
	$.post("../queryAllRepairProgress.action", {
		proRepairId : repId,
	}, function(data) {
		data=data.body;
		for (var i in data) {
			data[i].proTime = formatTime(data[i].proTime, 2);
		}
		$('#progressTable').datagrid("loadData", data);
	});
	$("#progressDlg").dialog('open');
}
// 回访列表显示
function showReturningRp(retRepairId) {
	$("#returningDlg").dialog({
		title : '回访过程',
		top : getTop(300),
		left : getLeft(600),
		width : 600,
		height : 300,
		closed : true,
		cache : false,
		modal : true
	});
	if ($('#returningTable').hasClass('datagrid-f')) {

	} else {
		$('#returningTable').datagrid({
			columns : [ [ {
				field : 'retTime',
				title : '回访时间',
				width : 10,
				align : 'center'
			}, {
				field : 'userName',
				title : '负责人',
				width : 10,
				align : 'center'
			}, {
				field : 'retResult',
				title : '回访结果',
				width : 10,
				align : 'center'
			}, {
				field : 'rteRemark',
				title : '备注',
				width : 45,
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
				var row = $("#returningTable").datagrid("getSelected");
				if (row) {
					for(var i in row){
						$("#readShowReturning"+i).text(row[i]);
					}
					$('#showReturningDlg').dialog({
						title : '回访详情',
						top : getTop(230),
						left : getLeft(420),
						width : 420,
						height : 230,
						closed : true,
						cache : false,
						modal : true,
						onClose : function() {
							$('.xwtable1 span').text('');
						}
					});
					$('#showReturningDlg').dialog('open');
				}
			}
		});
	}
	$.post("../queryAllRepairReturning.action", {
		retRepairId : retRepairId
	}, function(data) {
		data=data.body;
		for (var i in data) {
			data[i].retTime = formatTime(data[i].retTime, 2);
		}
		$('#returningTable').datagrid("loadData", data);
	}, "json");
	$("#returningDlg").dialog('open');
}
// 期望时间
function hopeTimeVal() {
	var hopeSelect = $('.repair_hope_select').find('option:selected').text()
	if (hopeSelect == "尽快" || hopeSelect == "电话联系") {
		$('#repair_hope_time').val(hopeSelect);
	}
	if (hopeSelect == "今天") {
		$('#repair_hope_time').val(formatTime(getNowFormatDate(), 2) + " ");
	}
	if (hopeSelect == "明天") {
		var d = formatTime(getNowFormatDate(), 2)
		var tomorrow = new Date(d);
		var sDay = 1;
		tomorrow.setDate(tomorrow.getDate() + sDay);
		$('#repair_hope_time').val(formatDate(tomorrow));
	}
	if (hopeSelect == "后天") {
		var d = formatTime(getNowFormatDate(), 2)
		var afterTomorrow = new Date(d);
		var sDay = 2;
		afterTomorrow.setDate(afterTomorrow.getDate() + sDay);
		$('#repair_hope_time').val(formatDate(afterTomorrow));
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
		$('#repair_hope_time').val(formatDate(satur) + "或" + formatDate(sun));
	}
}
function getTaskTime() {
	var taskTime = formatTime(getNowFormatDate(), 2);
	var hopeSelect = $('.repair_hope_select').find('option:selected').text()
	if (hopeSelect == "尽快" || hopeSelect == "今天" || hopeSelect == "电话联系"
			|| hopeSelect == "") {

	} else if (hopeSelect == "明天") {
		var tomorrow = new Date(taskTime);
		var sDay = 1;
		taskTime = formatDate(tomorrow.setDate(tomorrow.getDate() + sDay));
	} else if (hopeSelect == "后天") {
		var afterTomorrow = new Date(taskTime);
		var sDay = 2;
		taskTime = formatDate(afterTomorrow.setDate(afterTomorrow.getDate()
				+ sDay));
	} else if (hopeSelect == "本周末") {
		var now = new Date;
		var day = now.getDay();
		var week = "1234567";
		var Saturday = 5 - week.indexOf(day);
		var satur = new Date;
		satur.setDate(satur.getDate() + Saturday);
		var sunday = 6 - week.indexOf(day);
		var sun = new Date;
		sun.setDate(sun.getDate() + sunday);
		taskTime = formatDate(sun);
	}
	return taskTime;
}

//部门用户联动（1）
function deptStaffChose(deptId, staffId, selectId) {
	var deptment = $('#' + deptId).val();
	if (deptment == '') {
		$('#' + staffId).empty();
		$('#' + staffId).append("<option></option>");
		if(deptId=="search_theStore"){
			queryRepair(1, 0);
		}
		return;
	}
	$.post("../queryUserByDepartmentID.action", {
		suDepartmentId : deptment
	}, function(data) {
		if (data.code < 0) {
//			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		_deptStaff = [ {
			"deptment" : deptment,
			"staff" : data
		} ];
		theStoreStaff(deptId, staffId, selectId);
		if(deptId=="search_theStore"){
			queryRepair(1, 0);
		}
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
		if (selectId != 0) {
			selC.val(selectId);
		}
	} else {
		selC.empty();
		queryRepair(1, 0);
	}
}
//打开修改指维修负责人窗口
function updateRepairMan(){
	$("#updateRepairManDlg").dialog({
		title : '修改维修负责人',
		top : getTop(170),
		left : getLeft(300),
		width : 300,
		height : 170,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#updateRepairManOld").val('');
			$("#updateRepairManTheStore").val('');
			$('#shorMessageRemind2').prop({checked:true});
		}
	});
	var userId = $(".repair_peopleId").val();
	$.post("../queryUserByDepartmentID.action", {
		userId : userId
	}, function(data) {
		if (data.code < 0) {
//			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		$("#updateRepairManOld").val(data[0].storefrontName+"  "+data[0].departmentName+"  "+data[0].suStaffName);
	});
	
	$("#updateRepairManDlg").dialog('open');
}
//执行修改维修负责人
function doUpdateRepairMan(){
	var repRepairPeopleId = $("#newRepairGetUserId").val();
	var repId = $(".repair_id").val();
	var repRepairPeopleName = $("#newRepairShowUserInfo").val();
	var oldRepRepairPeople = $("#updateRepairManOld").val();
	var changeNote = "修改维修负责人-原维修负责人："+oldRepRepairPeople
					+";新维修负责人："+ repRepairPeopleName
					+";操作人员："  + _loginUserName;
	$.post("../updateRepair.action", {
		repId 				: repId,
		repRepairPeopleId	:repRepairPeopleId,
	}, function(data) {
		if(data.code<0){
			myTips(data.msg,"error");
		}
		$.post("../insertRepairProgress.action", {
			proRepairId 		: repId,
			proUserId 			: _loginUserId,
			department 			: _loginDepartment,
			storefront 			: _loginStore,
			proTime 			: getNowFormatDate(),
			proState 			: "未完成",
			proReceivableMoney 	: "0.00",
			proBillingInfo 		: "无结算",
			proRemark 			: changeNote,
		}, function(proData) {
			var repProgressRp = "(" + formatTime(getNowFormatDate(), 2) + ")" + changeNote;
			$.post("../updateRepair.action", {
				repId 			: repId,
				repProgressRp 	: repProgressRp
			}, function(updateData) {
				
			});
			updateRepairSendMessage();
			myTips("修改成功！","success");
		});
	});
}
//写进展，维修完成自动生成账单
function choseIfFinancila(){
	var row = $("#repairDg").datagrid("getSelected");
	var rentId = row.repHouse4rentId;
	var storeId = row.repHouse4storeId;
	var houseId = row.repHouseId;
	var repaireType = '';
	if (rentId != null && rentId != '') {
		repaireType = '已租维保';
	} else if (storeId != null && storeId != '') {
		repaireType = '未租维保';
	} else if (houseId != null && houseId != '') {
		repaireType = '盘源维保';
	}
	var add_proType = $(".add_proType").val();
	var add_billing_info = $(".add_billing_info").find("option:selected").text();
	var proManMoney = $('.add_pro_man_money').val();
	var proUseMoney = $('.add_pro_use_money').val();
	var totalMoney = accAdd(proManMoney, proUseMoney);
	var jcdId = $('#confirmNumberCheckoutIf').val();
	var checkFlag = 0;
	$('#addProgressDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (add_proType == '已完成') {
		$('#addProgressDlg [must="must2"]').each(function(){
			if ($(this).val() == '') {
				$(this).css('border-color','red');
				checkFlag++;
			} else {
				$(this).css('border-color','#A9A9A9');
			}
		});
		if(add_billing_info!='无结算'){//有结算时收款账户必填
			$('#addProgressDlg [must="must4"]').each(function(){
				if ($(this).val() == '') {
					$(this).css('border-color','red');
					checkFlag++;
				} else {
					$(this).css('border-color','#A9A9A9');
				}
			});
		}
		if(_comfirmNum == 1){
			if(jcdId==""){
				$('#confirmNumber').css("border","1px solid red");
				myTips("请填写确认书编号!","error");
				return;
			}else{
				$('#confirmNumber').css("border","1px solid #A9A9A9");
			}
		}
		if($('#createEventApproval').is(':checked')){
			$('#addProgressDlg [must="must3"]').each(function(){
				if ($(this).val() == '') {
					$(this).css('border-color','red');
					checkFlag++;
				} else {
					$(this).css('border-color','#A9A9A9');
				}
			});	
		}
	}
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	//添加进展
	doAddProgress();
	if(add_proType != '已完成'){
		return;
	}
	//生成审批
	if($('#createEventApproval').is(':checked')){
		var houseType = '';
		if (rentId != null && rentId != '') {
			houseType = '已租审批';
		} else if (storeId != null && storeId != '') {
			houseType = '未租审批';
		} else if (houseId != null && houseId != '') {
			houseType = '盘源审批';
		}
		var amountInvolved = $("#amountInvolved").val();
		var eventType = '付款';
		var handler = $("#doEventGetUserId").val();
		var eventDescribe = row.repEventRp + ' '+$('.add_pro_mark').val()+ ' 来自维保编号：' + row.repNumber;
		var houseAddress = row.startNum;
		var eaApprovalNumber = randomNumber();
		var eaBankName = $('#eaBankName').val();
		var eaBankUsername = $('#eaBankUsername').val();
		var eaBankAccountNumber = $('#eaBankAccountNumber').val();
		if (amountInvolved == 0) {
			eaBankName = '';
			eaBankUsername = '';
			eaBankAccountNumber = '';
		}
		var jhfFollowRemark = _loginUserName+' 添加'+houseType+':'+eventDescribe;
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
		}, function(data) {
			hideLoading();
			if (data.code<0) {
				myTips("添加审批失败！", "error");
				return;
			}
			//添加跟进
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
    		//发送短信
    		if($('#shorMessageRemind1').prop("checked")){
    			var evenDescribe = "发布人："+_loginUserName+"-"+eventDescribe;
    			var evenApprovalJson= {
    				smUserId : handler,
    				smRentId :rentId,
    				smNotRentId :storeId,
    				evenType : '付款',
    				addCommunity : houseAddress,
    				houseType : houseType,
    				smMoney : amountInvolved,
    				handleStatus : '处理中',
    				repairDescribe : evenDescribe,
    			};
    			$.post("../massage/sendEventApprovalMsg.action",evenApprovalJson ,function(data) {
    				if(data.code<0){
    					myTips(data.msg,"error");
    				}
    			});								
    		}
		});
	}
	//生成账单
	if(add_proType == '已完成' && (proManMoney > 0 || proUseMoney > 0)){
		var today = new Date().format('yyyy-MM-dd');
		var bdata = [];
		if(proManMoney>0){
			bdata.push({
				jfNatureOfThe		: '收入',
				jfFinanNote 		: row.repEventRp,
				jfSumMoney 			: Math.abs(proManMoney),
				jfBigType			: '维修类',
				jfAccountingSpecies : '内部-人工费',
				jfStartCycle		: today,
				jfEndCycle			: today,
			});
		}
		if(proUseMoney>0){
			bdata.push({
				jfNatureOfThe		: '收入',
				jfFinanNote 		: row.repEventRp,
				jfSumMoney 			: proUseMoney,
				jfBigType			: '维修类',
				jfAccountingSpecies : '内部-材料费',
				jfStartCycle		: today,
				jfEndCycle			: today,
			});
		}
		if(add_billing_info=='签单月结' && totalMoney>0){
			bdata.push({
				jfNatureOfThe		: '支出',
				jfFinanNote 		: '应收款'+totalMoney+'元。',
				jfSumMoney 			: totalMoney,
				jfBigType			: '财务类',
				jfAccountingSpecies : '应收款',
				jfStartCycle		: today,
				jfEndCycle			: today,
			});
			if(repaireType == '已租维保'){
				bdata.push({
					jfNatureOfThe		: '支出',
					jfFinanNote 		: '租客欠结款'+totalMoney+'元。',
					jfSumMoney 			: totalMoney,
					jfBigType			: '欠结类',
					jfAccountingSpecies : '租客欠结款',
					jfStartCycle		: today,
					jfEndCycle			: today,
				});
			}else if(repaireType == '未租维保'){
				bdata.push({
					jfNatureOfThe		: '支出',
					jfFinanNote 		: '房东欠结款'+totalMoney+'元。',
					jfSumMoney 			: totalMoney,
					jfBigType			: '欠结类',
					jfAccountingSpecies : '房东欠结款',
					jfStartCycle		: today,
					jfEndCycle			: today,
				});
			}
		}
		var financialBelongAddress = row.addDistrict + " " + row.addZone + " " + row.addCommunity + " " + row.addBuilding + " " + row.addDoorplateno;

		//已租维修 归属租客
		if(row.repHouse4storeId !=null && row.repHouse4storeId !='' && row.repHouse4rentId !=null && row.repHouse4rentId !=''){
			var relationBelongType = '租客';
		}else{//未租维修 归属业主
			var relationBelongType = '业主';
		}
		
		var relationBelongName = row.repContacts;
		var addFinancialHouseId = row.repHouseId;
		var addFinancialHouseStoreId = row.repHouse4storeId;
		var addFinancialHouseRentId = row.repHouse4rentId;
		var repId = row.repId;
		
		var jfPayType = '"jfPayType":"'+$('#repairPayType').val()+'"';
		var belongConding  = '"jfHouse4rentId":"' + addFinancialHouseRentId + '",'+'"jfHouse4storeId":"' + addFinancialHouseStoreId + '",'+'"jfHouseId":"' + addFinancialHouseId + '"';
		var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
		var jfBillingDate = '"jfBillingDate":"' + today + '"';
		var jfHandlers = '"jfHandlers":"' + _loginUserId + '"';
		var jfTheOwnershipType = '"jfTheOwnershipType":"' + relationBelongType + '"';
		var jfBelongingToTheName = '"jfBelongingToTheName":"' + relationBelongName + '"';
		var jfFinancialCoding = '"jfFinancialCoding":"'
				+ formatTime(getNowFormatDate(), 3)
				+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
				+ Math.floor(Math.random() * 10) + '"';
		var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ',添加维修账单收支记录"';
		var jfAccountId = '"jfAccountId":"' + $('#repairFinancialBankNums').val() + '"';
		var department = '"department":"' + _loginDepartment + '"';
		var jfAccountingWhy = '"jfAccountingWhy":"' + financialBelongAddress + '"';
		var storefront = '"storefront":"' + _loginStore + '"';
		var strArray = jfAccountId + "," + jfAccountingWhy + "," 
			+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + ","
			+ belongConding + "," + jfBillingDate + "," 
			+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
			+storefront+","+department+","+jfPayType;
		var jsonStrArry = '';
		for (var i in bdata) {
			if (i == 0) {
				jsonStrArry += JSON.stringify(bdata[i]).split('}')[0] + ',' + strArray + '}';
			} else {
				jsonStrArry += ',' + JSON.stringify(bdata[i]).split('}')[0] + ',' + strArray + '}';
			}
		}
		jsonStrArry = "[" + jsonStrArry + "]";
		//维修事务收支生成
		showLoading();
		$.post("../balanceOfThings.action",{
			jsonArray : jsonStrArry,
			repId	  : repId,
		},function(data) {
			hideLoading();
			/*if(data.code<0){
				myTips('生成账单失败！', 'error');
			}else{*/
				queryRepairReturning(repId);
				queryRepairProgress(repId);
				$("#setRepairFinancialDlg").dialog('close');
			/*}*/
		});
	}
}

//执行发送短信
function doSendMessage(){
	if($('#shorMessageRemind').prop("checked")){
		var repairUserId = $('#doRepairGetUserId').val();		
		var repTypeRp = $('.repair_type_rp').find("option:selected").text();		
		var smRentId = $('.repair_houseRentCoding').val();	
		var smNotRentId = $('.repair_houseStoreCoding').val();	
		var address = $('.repair_choseHouse').val();			
		var addCommunity = '';
		if(address == '' || address == null ){
			address = '无归属维修';
		}		
		var popName = $('.repair_name').val();
		var popTel = $('.repair_phone').val();
		var repHopeTime = $('#repair_hope_time').val();
		var repairDescribe = $('.repair_event_rp').val()+"负责人："+_loginUserName;

		var repairJson= {
			smUserId : repairUserId,
			smRentId :smRentId,
			smNotRentId :smNotRentId,
			repairEvenType : repTypeRp,
			addCommunity : address,
			popName : popName,
			popTelephone : popTel,
			hopeTime : repHopeTime,
			repairDescribe : repairDescribe,
		};
		$.post("../massage/sendRepairMsg.action",repairJson ,function(data) {
			if(data.code<0){
				if (!$('#shorMessageTemplateRemind').prop("checked")) {
					myTips(data.msg, "error");
					$("#addRepairDlg").dialog('close');
					queryRepair(1, 0);
				}
				return;
			}
			if (!$('#shorMessageTemplateRemind').prop("checked")) {
				$("#addRepairDlg").dialog('close');
				queryRepair(1, 0);
			}
		});			
	}else{
		if (!$('#shorMessageTemplateRemind').prop("checked")) {
			$("#addRepairDlg").dialog('close');
			queryRepair(1, 0);
		}
		return;
	}
}

//执行发送公众号消息
function doSendTemplateMessage() {
	if ($('#shorMessageTemplateRemind').prop("checked")) {
		var repairUserId = $('#doRepairGetUserId').val();
		var address = $('.repair_choseHouse').val();
		var repTypeRp1 = $('.repair_type_rp').find("option:selected").text();
		var sendTime=formatTime(getNowFormatDate(), 4);
		var popName = $('.repair_name').val();
		var popTel = $('.repair_phone').val();
		var repairDescribe = address+" "+$('.repair_event_rp').val();
		// console.log(
		// 	"  repairUserId "+repairUserId+
		// 	"  repTypeRp1 "+repTypeRp1+
		// 	"  address "+address+
		// 	"  popName "+popName+
		// 	"  popTe "+popTel+
		// 	"  repairDescribe "+repairDescribe);
		// console.log("id======"+repairUserId);
		$.post("../sendTemplateMessage.action",{
			toUserId	:repairUserId,
			toUserType	:"repair",
			scene		:1,
			firstValue	:"您好，您有新的"+repTypeRp1+"！",
			keyValue1	:popName,
			keyValue2	:popTel,
			keyValue3	:sendTime,
			keyValue4	:repairDescribe,
			remarkValue	:"请及时登录房至尊公众号接单确认！"
		}, function(data) {
			if (data.code < 0) {
				setTimeout(function () {
					myTips(data.msg, "error");
				}, 800);
				$("#addRepairDlg").dialog('close');
				queryRepair(1, 0);
				return;
			}
			$("#addRepairDlg").dialog('close');
			queryRepair(1, 0);
		});
	} else {
		$("#addRepairDlg").dialog('close');
		queryRepair(1, 0);
		return;
	}
}


//修改维修负责人、短信发提醒
function updateRepairSendMessage(){
	if($('#shorMessageRemind2').prop("checked")){
		var row = $("#repairDg").datagrid('getSelected');
		
		var userId = $('#newRepairGetUserId').val();
	
		var repairUserId = $("#newRepairGetUserId").val();
		
		var smRentId = row.repHouse4rentId;
		var smNotRentId = row.repHouse4storeId;
		
		var updateRepairManOld = $('#updateRepairManOld').val();

		var repairDescribe = row.repEventRp + '。负责人:' + updateRepairManOld;

		var updateRepairJson= {
				smUserId : repairUserId,
				smRentId :smRentId,
				smNotRentId :smNotRentId,
				repairEvenType : row.repTypeRp,
				addCommunity : row.startNum,
				popName : row.repContacts,
				popTelephone : row.repContactsPhone,
				hopeTime : row.repHopeTime,
				repairDescribe : repairDescribe,
		};
		$.post("../massage/sendRepairMsg.action",updateRepairJson ,function(data) {
			if(data.code <0){
				myTips(data.msg,"error");
				queryRepair(1, 0);
				$("#updateRepairManDlg").dialog('close');
				$("#repairInfoDlg").dialog('close');
				return;
			}
			queryRepair(1, 0);
			$("#updateRepairManDlg").dialog('close');
			$("#repairInfoDlg").dialog('close');
		});	

	}else{
		queryRepair(1, 0);
		$("#updateRepairManDlg").dialog('close');
		$("#repairInfoDlg").dialog('close');
		return;
	}
}
//生成维修账单窗口
/*function repairFinancial(data){

}*/
///单元格单击编辑
//新增收支单元格编辑
var editIndex1 = undefined;
function endEditing1() {
	if (editIndex1 == undefined) {
		return true
	}
	if ($('#setFinancialTable').datagrid('validateRow', editIndex1)) {
		$('#setFinancialTable').datagrid('endEdit', editIndex1);
		editIndex1 = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell1(index, field) {
	if (endEditing1()) {
		$('#setFinancialTable').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex1 = index;
	}
}
//账户类型和账号联动
function changeWay(type) {
	console.log("第一次");
	if(type==0){
		var faPaymentType = $("#setFinancialWay").find("option:selected").text();
		$("#setFinancialBankNums").val('');
		$("#setFinancialAccountNums").val('');
		$("#setFinancialAccountBelong").val('');
		$("#setFinancialAccountName").empty();
		if(faPaymentType == ""){
			return;
		}
		$.post("../selectNamePublic.action", {
			faPaymentType:faPaymentType,
		}, function(data) {
			$("#setFinancialAccountName").empty();
			for (var i in data.body) {
				$("#setFinancialAccountName").append(
						"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
			}
		});
	}
}
function getAccountId(type) {
	if(type==0){
		if($("#setFinancialAccountName").val()==''){
			$("#setFinancialBankNums").val("");
			$("#setFinancialAccountBelong").val("");
			$("#setFinancialAccountNums").val("");
		}else{
			$("#setFinancialBankNums").val($("#setFinancialAccountName").val().split("*#*")[0]);
			$("#setFinancialAccountBelong").val($("#setFinancialAccountName").val().split("*#*")[1]);
			$("#setFinancialAccountNums").val($("#setFinancialAccountName").val().split("*#*")[2]);
		}
	}
}

function changeBilling(){
	var billing = $(".add_billing_info").find("option:selected").text();
	if(billing=="无结算"){
		$(".add_pro_man_money").val(0);
		$(".add_pro_use_money").val(0);
		$(".add_pro_other_money").val(0);
		
		$(".add_pro_man_money").attr("disabled","disabled");
		$(".add_pro_use_money").attr("disabled","disabled");
		$(".add_pro_other_money").attr("disabled","disabled");
		$("#repairAccountDiv").hide();
	}else{
		$(".add_pro_man_money").removeAttr("disabled","disabled");
		$(".add_pro_use_money").removeAttr("disabled","disabled");
		$(".add_pro_other_money").removeAttr("disabled","disabled");
		$("#repairAccountDiv").show();
		$("#repairFinancialWay").val(0);
		changeWay1();
		
	}
}

//回访结果维修隐藏和显示
function changeReturnResult(){
	var returnResult = $(".add_return_resultState").val();
	if(returnResult=="回访未成功"){
		$("#addReturningInfo").hide();
		$(".add_return_result").val("1");
		$("#addReturnResultDiv").hide();
	}
	if(returnResult=="回访成功"){
		$("#addReturningInfo").show();
		$(".add_return_result").val("0");
		$("#addReturnResultDiv").show();
	}
	if(returnResult==""){
		$("#addReturnResultDiv").show();
		$("#addReturningInfo").show();
		$(".add_return_result").val("");
	}
}

//跳转查看房源
function skipToCheckHouse(){
	var row = $('#repairDg').datagrid('getSelected');
	var skipJspName = '';
	var skipJspUrl = '';
	var skipJspIcon = '';
	var skipInputId = ['','',''];
	var skipInputVal = ['','',''];
	if ((row.repHouse4rentId == null || row.repHouse4rentId == '')
		&&(row.repHouse4storeId == null || row.repHouse4storeId == '')
		&&(row.repHouseId == null || row.repHouseId == '')) {
		myTips("无地址维修无法查看房源！","error");
		return;
	}
	if (row.repHouse4rentId != null && row.repHouse4rentId != '') {
		skipJspName = '已租房间';
		skipJspUrl = 'fg_sourceInfo';
		skipJspIcon = 'yizuguanli';
		skipInputId[0] = 'sourceCommunity';
		skipInputId[1] = 'sourceBuilding';
		skipInputId[2] = 'sourceDoorplateno';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
	}else if(row.repHouse4storeId != null && row.repHouse4storeId != ''){
		skipJspName = '未租房间';
		skipJspUrl = 'fg_trusteeship';
		skipJspIcon = 'weizuguanli';
		skipInputId[0] = 'searchCommunity';
		skipInputId[1] = 'searchBuilding';
		skipInputId[2] = 'searchDoorplateno';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
	}else if(row.repHouseId != null && row.repHouseId != ''){
		skipJspName = '房源资料';
		skipJspUrl = 'fg_dataHouse';
		skipJspIcon = 'panyuanguanli';
		skipInputId[0] = 'searchCommunity';
		skipInputId[1] = 'searchBuilding';
		skipInputId[2] = 'searchDoorplateno';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
	}
	
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[0],
		jsonVal:skipInputVal[0],
	});
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[1],
		jsonVal:skipInputVal[1],
	});
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[2],
		jsonVal:skipInputVal[2],
	});
	window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
}
/**
 * 查询耗材
 */
function querySupplies(page) {
	var row = $("#repairDg").datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	if (row.repState == '未领取') {
		myTips('维修还未领取，无法使用耗材!');
		return;
	} else if (row.repState == '回访完成') {
		myTips('回访已完成，无法使用耗材!');
		return;
	} else if (row.repState == '维修完成') {
		myTips('维修已完成，无法使用耗材!');
		return;
	} else if (row.startNum == '无地址维修') {
		myTips('该维修无法使用耗材!');
		return;
	}
	$('#querySuppliesDlg').dialog({
		title : '使用耗材',
		top : getTop(440),
		left : getLeft(750),
		width : 750,
		height : 440,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	$('#use_supplies_reason').val($('.repair_event').val());
	$('#querySuppliesDlg').dialog('open');
	$("#suppliesDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			useSupplies();
		}
	});
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var searchVirtualType = $('#searchVirtualType').val();
	var searchVirtualName = $('#searchVirtualName').val();
	var supType = $('#searchSupType').val();
	var supName = $('#searchSupName').val();
	var supBrand = $('#searchSupBrand').val();
	var supModel = $('#searchSupModel').val();
	$.post("../querySupplies.action", {
		startNum: startNum,
		endNum : onePageNums,
		virtualType: searchVirtualType,
		keyAdministrator: searchVirtualName,
		supType: supType,
		supName: supName,
		supBrand: supBrand,
		supModel: supModel,
	}, function(data) {
		if (data.code < 0) {
			initPage(0, onePageNums, 0);
			$('#suppliesDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1) {
				initPage(data.body[0].totalNum, onePageNums, 0);
			}
			for (var i in data.body) {
				data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
			}
			$("#suppliesDg").datagrid("loadData", data.body);
		}
	});
}
/**
 * 分页初始化
 */
function initPage(totalNum, onePageNums, type) {
	var pageCount = Math.ceil(totalNum / onePageNums);
	if (type == 0) {
		$("#suppliesPage").remove();
		$("#suppliesPageDiv").append("<div class='tcdPageCode' id='suppliesPage' style='text-align:center;'></div>");
		$("#suppliesPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					_pageNum[0] = p;
					_indexNum[0] = 0;
					querySupplies(p);
				}
			}
		});
	}
	if (type == 1) {
		$("#choseTrusteeshipAssetPage").remove();
		$("#choseTrusteeshipAssetPageDiv").append("<div class='tcdPageCode' id='choseTrusteeshipAssetPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipAssetPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseHouseData(p);
				}
			}
		});
	}
	if (type == 2) {
		$("#choseVirtualHouseAssetPage").remove();
		$("#choseVirtualHouseAssetPageDiv").append("<div class='tcdPageCode' id='choseVirtualHouseAssetPage' style='text-align:center;'></div>");
		$("#choseVirtualHouseAssetPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseHouseData(p);
				}
			}
		});
	}
}
/**
 * 使用耗材
 */
function useSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
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
	var row2 = $("#repairDg").datagrid("getSelected");
	$('#use_supplies_choseHouse').val(row2.startNum);
	$('#useSuppliesDlg').dialog('open');
}
/**
 * 执行使用耗材
 */
function doUseSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var row2 = $("#repairDg").datagrid("getSelected");
	var useAddress = $('#use_supplies_choseHouse').val();
	var supNum = $('#use_supplies_number').val();
	var useReason = $('#use_supplies_reason').val();
	var repId = row2.repId;
	
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
	$.post('../repairUseSupplies.action', {
		userName: _loginUserName,
		supId: row.supId,
		useAddress: useAddress,
		supNum: supNum,
		useReason: useReason,
		proRepairId : repId,
		proUserId : _loginUserId,
		proDepartment : _loginDepartment,
		proStorefront : _loginStore,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '使用失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#useSuppliesDlg').dialog('close');
			myTips('使用成功！', 'success');
			querySupplies(1);
			queryRepairProgress(repId);
		}
	});
}
//资产列表信息导入
function queryAsset(page, type) {
	var row = $("#repairDg").datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	if (row.repState == '未领取') {
		myTips('维修还未领取，无法变更资产!');
		return;
	} else if (row.repState == '回访完成') {
		myTips('回访已完成，无法变更资产!');
		return;
	} else if (row.repState == '维修完成') {
		myTips('维修已完成，无法变更资产!');
		return;
	} else if (!((row.repHouse4rentId != null && row.repHouse4rentId != '')&&(row.repHouse4storeId != null && row.repHouse4storeId != '')&&(row.repHouseId != null && row.repHouseId != ''))
			&& !((row.repHouse4rentId == null || row.repHouse4rentId == '')&&(row.repHouse4storeId != null && row.repHouse4storeId != '')&&(row.repHouseId != null && row.repHouseId != ''))) {
		myTips('该维修无法变更资产!');
		return;
	}
	$('#queryAssetsDlg').dialog({
		title : '变更资产',
		top : getTop(410),
		left : getLeft(750),
		width : 750,
		height : 410,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	$('#queryAssetsDlg').dialog('open');
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	$.post('../queryAssetsCommon.action', {
		startNum : startNum,
		endNum : endNum,
		saHouseStoreId : row.repHouse4storeId
	}, function(data){
		if (data.code < 0) {
			sourcePage(0, 0, 4);
			$('#assetsInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum, page, 4);
			}
			$('#assetsInfoTable').datagrid('loadData', data.body);
		}
	});
}
// 迁入资产
function moveInAssets(){
	$("#moveInAssetsDlg").dialog({
		title : '迁入资产',
		top : getTop(670),
		left : getLeft(900),
		width : 900,
		height : 670,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveInAssetsDlg [clear="clear"]').val('');
			$('#moveInAssetsDlg [choose="choose"]').val('');
		}
	});
	if ($('#assetsListTable').hasClass('datagrid-f')) {

	} else {
		$('#assetsListTable').	datagrid({
			columns : [ [
			{
				field : 'saDetailedAddress',
				title : '地址/项目',
				width : 30,
				align : 'center'
			},
			{
				field : 'saType',
				title : '所属',
				width : 10,
				align : 'center'
			},	
			{
				field : 'saClassify',
				title : '类型',
				width : 10,
				align : 'center'
			},
			{
				field : 'saName',
				title : '名称',
				width : 20,
				align : 'center'
			},
			{
				field : 'saBrand',
				title : '品牌',
				width : 10,
				align : 'center'
			},
			{
				field : 'saModel',
				title : '型号',
				width : 10,
				align : 'center'
			},
			{
				field : 'saStatus',
				title : '状态',
				width : 10,
				align : 'center'
			},
			{
				field : 'saUse',
				title : '使用情况',
				width : 10,
				align : 'center'
			},
			{
				field : 'do',
				title : '添加',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' style='color:blue' onclick=\"addOneToNeedTo("+ index +")\" >添加</a>";
				}
			} ] ],
			width : '100%',
			height : '152px',
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
	
	if ($('#assetsMoveInTable').hasClass('datagrid-f')) {

	} else {
		$('#assetsMoveInTable').datagrid({
			columns : [ [
			{
				field : 'saDetailedAddress',
				title : '地址/项目',
				width : 30,
				align : 'center'
			},
			{
				field : 'saType',
				title : '所属',
				width : 10,
				align : 'center'
			},	
			{
				field : 'saClassify',
				title : '类型',
				width : 10,
				align : 'center'
			},
			{
				field : 'saName',
				title : '名称',
				width : 20,
				align : 'center'
			},
			{
				field : 'saBrand',
				title : '品牌',
				width : 10,
				align : 'center'
			},
			{
				field : 'saModel',
				title : '型号',
				width : 10,
				align : 'center'
			},
			{
				field : 'saStatus',
				title : '状态',
				width : 10,
				align : 'center'
			},
			{
				field : 'saUse',
				title : '使用情况',
				width : 10,
				align : 'center'
			},
			{
				field : 'do',
				title : '取消',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' style='color:red' onclick=\"myDeleteRows('"+row.saId+"','saId','assetsMoveInTable','0')\">删除</a>";
				}
			} ] ],
			width : '100%',
			height : '152px',
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
	$("#assetsMoveInTable").datagrid("loadData", []);
	$("#moveInAssetsDlg").dialog('open');
	queryAssetsList(1, 0);
}
// 资产导入信息
function queryAssetsList(page, type) {
	var startNum = (parseInt(page) - 1) * 5;
	var endNum = 5;
	var searchCommunity = $('#searchCommunity_asset').val();
	var searchBuilding = $('#searchBuilding_asset').val();
	var searchDoorplateno = $('#searchDoorplateno_asset').val();
	var searchVirtualType = $('#searchVirtualType_asset').val();
	var searchVirtualName = $('#searchVirtualName_asset').val();
	var saType = $('#searchSaType').val();
//	var saUse = $('#searchSaUse').val();
	var saNumber = $('#searchSaNumber').val();
	var saName = $('#searchSaName').val();
	var saBrand = $('#searchSaBrand').val();
	var saModel = $('#searchSaModel').val();

	$.post("../queryAssetsCommon.action", {
		startNum: startNum,
		endNum : endNum,
		addCommunity: searchCommunity,
		addBuilding: searchBuilding,
		addDoorplateno: searchDoorplateno,
		virtualType: searchVirtualType,
		keyAdministrator: searchVirtualName,
		saType: saType,
//		saUse: saUse,
		saNumber: saNumber,
		saName: saName,
		saBrand: saBrand,
		saModel: saModel,
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 5);
			$('#assetsListTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum, page, 5);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$("#assetsListTable").datagrid("loadData", data.body);
		}
	});
}
//添加一条资产到需要迁入的资产列表里
function addOneToNeedTo(index){
	var row = $('#assetsListTable').datagrid('getData').rows[index];
	var rows = $('#assetsMoveInTable').datagrid('getRows');
	var rows2 = $('#assetsInfoTable').datagrid('getRows');
	for (var i in rows) {
		if (rows[i].saId == row.saId) {
			myTips('此条资产已经添加到下方列表！','error');
			return;
		}
	}
	for (var i in rows2) {
		if (rows2[i].saId == row.saId) {
			myTips('该资产已在该房内，无需迁移！','error');
			return;
		}
	}
	$('#assetsMoveInTable').datagrid('insertRow', {
		index : 0,
		row : row
	});
}
//执行迁入资产
function doMoveInAssets(){
	var rows = $('#assetsMoveInTable').datagrid('getRows');	
	if (rows.length == 0) {
		myTips('请先将待迁入的资产添加到下方列表！', 'error');
		return;
	}
	var checkFlag = 0;
	$('#moveInAssetsDlg [must="must"]').each(function(){
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
	var agentName = $('#move_in_asset_staff option:selected').text();
	var moveReason = $('#move_in_asset_reason').val();
	var row = $('#repairDg').datagrid('getSelected');
	var jsonArray = [];
	for (var i in rows) {
		var jsonObject = {
			registrantName: _loginUserName,
			saRegistrant: _loginUserId,
			department: _loginDepartment,
			storefront: _loginStore,
			agentName: agentName,
			moveReason: moveReason,
			saId: rows[i].saId,
			saHouseStoreId: row.repHouse4storeId,
			saHouseId: row.repHouseId,
			saMoveFrom: rows[i].saDetailedAddress,
			saMoveTo: row.startNum,
		};
		jsonArray[i] = jsonObject;
	}
	showLoading();
	$.post('../repairMoveAssets.action', {
		saId: rows[0].saId,
		jsonArray: JSON.stringify(jsonArray),
		proRepairId : row.repId,
		proUserId : _loginUserId,
		proDepartment : _loginDepartment,
		proStorefront : _loginStore,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#moveInAssetsDlg').dialog('close');
			myTips('迁移成功！', 'success');
			queryAsset(1, 0);
			queryRepairProgress(row.repId);
		}
	});	
}
/**
 * 迁出资产
 */
function moveOutAssets(){
	var row = $('#assetsInfoTable').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var row2 = $("#repairDg").datagrid("getSelected");
	$('#move_from_assets_choseHouse').val(row2.startNum);
	$('#moveOutAssetsDlg').dialog({
		title : '迁移资产',
		top : getTop(250),
		left : getLeft(540),
		width : 540,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveOutAssetsDlg [clear="clear"]').val('');
			$('#moveOutAssetsDlg [choose="choose"]').val('');
		}
	});
	$('#moveOutAssetsDlg').dialog('open');
}
/**
 * 执行迁出资产
 */
function doMoveOutAssets(){
	var row = $('#assetsInfoTable').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var row2 = $("#repairDg").datagrid("getSelected");
	var saHouseStoreId = $('#move_to_assets_houseStoreCoding').val();
	var saHouseId = $('#move_to_assets_houseCoding').val();
	var saMoveFrom = $('#move_from_assets_choseHouse').val();
	var saMoveTo = $('#move_to_assets_choseHouse').val();
	var agentName = $('#move_to_asset_staff option:selected').text();
	var moveReason = $('#move_to_asset_reason').val();
	var repId = row2.repId;
	
	var checkFlag = 0;
	$('#moveOutAssetsDlg [must="must"]').each(function(){
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
		saHouseStoreId: saHouseStoreId,
		saHouseId: saHouseId,
		saMoveFrom: saMoveFrom,
		saMoveTo: saMoveTo,
	};
	jsonArray[0] = jsonObject;
	showLoading();
	$.post('../repairMoveAssets.action', {
		saId: row.saId,
		jsonArray: JSON.stringify(jsonArray),
		proRepairId : repId,
		proUserId : _loginUserId,
		proDepartment : _loginDepartment,
		proStorefront : _loginStore,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#moveOutAssetsDlg').dialog('close');
			myTips('迁移成功！', 'success');
			queryAsset(1);
			queryRepairProgress(repId);
		}
	});
}
/**
 * 选择房源
 */
function choseHouseAsset() {
	$('#choseHouseAssetDlg').dialog({
		title : '选择房源',
		top : getTop(550),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	relationDataGridAsset();
	$('#choseHouseAssetDlg').dialog('open');
}
/**
 * 选择房源-显示列表
 */
function relationDataGridAsset() {
	var relationType = $('#searchBelongTypeAsset').find('option:selected').text();
	if (relationType == '房源列表') {
		$('#choseHouseSelectAsset').show();
		$('#virtualRelationSelectAsset').hide();
		$('#choseTrusteeshipAsset').show();
		$('#choseVirtualHouseAsset').hide();
		if ($('#choseTrusteeshipAssetTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipAssetTable').datagrid(
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
						var row = $('#choseTrusteeshipAssetTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#move_to_assets_houseStoreCoding').val(row.hsId);
							$('#move_to_assets_houseCoding').val(row.hsHouseId);
							$('#move_to_assets_choseHouse').val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
							$('#choseHouseAssetDlg').dialog('close');
						}
					}
				});
		}
	}
	if (relationType == '项目列表') {
		$('#choseHouseSelectAsset').hide();
		$('#virtualRelationSelectAsset').show();
		$('#choseTrusteeshipAsset').hide();
		$('#choseVirtualHouseAsset').show();
		if ($('#choseVirtualHouseAssetTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualHouseAssetTable').datagrid(
				{
					columns : [ [ /*{
						field : 'houseCoding',
						title : '盘源编号',
						width : 10,
						align : 'center'
					}, */{
						field : 'addCommunity',
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
						var row = $('#choseVirtualHouseAssetTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#move_to_assets_houseStoreCoding').val('');
							$('#move_to_assets_houseCoding').val(row.houseCoding);
							$('#move_to_assets_choseHouse').val(row.keyAdministrator);
							$('#choseHouseAssetDlg').dialog('close');
						}
					}
				});
		}
	}
	choseHouseDataAsset(1);
}
/**
 * 选择房源-显示列表-查数据
 */
function choseHouseDataAsset(page) {
	var relation = $('#searchBelongTypeAsset').val();
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var qhAddCity = $('#searchAddCity').find('option:selected').text();
	var qhAddDistrict = $('#searchAddDistrictAsset').find('option:selected').text();
	var qhAddZone = $('#searchAddZone').find('option:selected').text();
	var qhAddCommunity = $('#searchAddCommunityAsset').val();
	var qhAddBuilding = $('#searchAddBuildingAsset').val();
	var qhAddDoorplateno = $('#searchAddDoorplatenoAsset').val();
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
				initPage(0, onePageNums, 1);
				$('#choseTrusteeshipAssetTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data = data.body;
				if (page == 1) {
					initPage(data[0].totalNum, onePageNums, 1);
				}
				$("#choseTrusteeshipAssetTable").datagrid("loadData", data);
			}
		});
	}
	if (relation == 2) {
		$.post("../virtualProperty.action", {
			startNum: startNum,
			endNum: onePageNums,
			virtualType: virtualType,
			keyAdministrator: searchVirtualName,
			keyNumber: searchVirtualContact,
		}, function(data) {
			if (data.code<0) {
				initPage(0, onePageNums, 2);
				$('#choseVirtualHouseAssetTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				if (page == 1) {
					initPage(data.body[0].totalNum, onePageNums, 2);
				}
				$("#choseVirtualHouseAssetTable").datagrid("loadData", data.body);
			}
		});
	}
}

//修改责任归属
function changeOfResponsibilityAttribution(){
	var row = $("#repairDg").datagrid("getSelected");
	$('#originalOwnership').val(row.repResponsibility);
	$('#attributionRepId').val(row.repId);
	$("#attributionChange").dialog({
		title : '更改责任归属',
		top : getTop(140),
		left : getLeft(250),
		width : 250,
		height : 150,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#attributionChange [claer="claer"]').val('');
		}
	});
	$("#attributionChange").dialog('open');
}
function addAttribution(){
	var repId = $('#attributionRepId').val();
	var repResponsibility = $('#newAttribution').find('option:selected').text();
	var oldResponsibility = $('#originalOwnership').val();
	var changeNote = "更改责任归属-原归属："+oldResponsibility
	+";新归属："+ repResponsibility
	+";操作人员："  + _loginUserName;
	$.post("../updateRepair.action", {
		repId 				: repId,
		repResponsibility	: repResponsibility,
	}, function(data) {
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		$.post("../insertRepairProgress.action", {
			proRepairId 		: repId,
			proUserId 			: _loginUserId,
			department 			: _loginDepartment,
			storefront 			: _loginStore,
			proTime 			: getNowFormatDate(),
			proState 			: "未完成",
			proReceivableMoney 	: "0.00",
			proBillingInfo 		: "无结算",
			proRemark 			: changeNote,
		}, function(proData) {
			var repProgressRp = "(" + formatTime(getNowFormatDate(), 2) + ")" + changeNote;
			$.post("../updateRepair.action", {
				repId 			: repId,
				repProgressRp 	: repProgressRp
			}, function(updateData) {
				
			});
		});
		
		myTips("修改成功！","success");
		$('.repair_responsibility').val(repResponsibility)
		queryRepair(1, 0);
		$('#attributionChange').dialog('close');
		$("#repairInfoDlg").dialog('close');
	});
}
//检测确认书编号
function confirmNumberCheckout(numId,ifId,tipsId){
	if(_comfirmNum != 1){
		return;
	}
	var detectionContract = $("#"+numId).val();
	if(detectionContract==''){
		$("#"+tipsId).html("");//编号不能为空！
		return;
	}
	$.post("../contractNumberdetection.action", {
		detectionContract : detectionContract,
	},function(data){
		if(data.code<0){
			$("#"+tipsId).html(data.msg);
			$("#"+tipsId).css("color", "red");
			return;
		}else{
			data=data.body;
			$("#"+tipsId).html("编号正确");
			$("#"+tipsId).css("color", "green");
			$("#"+ifId).val(data[0].jcdId);
		}
	});
}
//生成审批
function createEventApproval(){
	if($('#createEventApproval').is(':checked')){
		$('.eventApproval').show();
		$('#shorMessageRemind1').prop("checked", false);
		$("#addProgressDlg").dialog('resize', {
			width : 580,
			height : 330
		});
	}else{
		$('.eventApproval').hide();
		$('#shorMessageRemind1').prop("checked", false);
		$("#addProgressDlg").dialog('resize', {
			width : 580,
			height : 280
		});
	}
}
//账户类型和账号联动
function changeWay1() {
	var faPaymentType = $("#repairFinancialWay").find("option:selected").text();
	$("#repairFinancialBankNums").val('');
	$("#repairFinancialAccountNums").val('');
	$("#repairFinancialAccountBelong").val('');
	$("#repairAccountName").empty();
	$("#repairAccountName").append("<option></option>");
	if(faPaymentType==''){
		return;
	}
	$.post("../selectNamePublic.action", {
		faPaymentType:faPaymentType,
	}, function(data) {
		$("#repairAccountName").empty();
		$("#repairAccountName").append("<option></option>");
		for (var i in data.body) {
			$("#repairAccountName").append(
					"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
		}
	});
}
function getAccountId1() {
	if($("#repairAccountName").val()==''){
		return;
	}
	$("#repairFinancialBankNums").val($("#repairAccountName").val().split("*#*")[0]);
	$("#repairFinancialAccountNums").val($("#repairAccountName").val().split("*#*")[2]);
	$("#repairFinancialAccountBelong").val($("#repairAccountName").val().split("*#*")[1]);
}
