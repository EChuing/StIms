$(function() {
	advancedScreening(0);

	$("#searchEndTime").val(formatTime(getNowFormatDate(), 2));
	//查城区
	for (var i in _loginCompanyRentDistrict) {
		$("#searchAddDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	for (var j in _userInfoData) {
		if (_loginUserId == _userInfoData[j].userId) {
			$("#searchFollowGetUserId").val(_loginUserId);
			$("#searchFollowShowUserInfo").val(_userInfoData[j].storefrontName + " " + _userInfoData[j].departmentName + " " + _userInfoData[j].suStaffName);
		}
	}
	//查任务类型
	// console.log(_taskType);
	for (var k = 0; k < _taskType.length; k++) {
		$('#repair_type_rp').append("<option value = '" + _taskType[k] + "'>" + _taskType[k] + "</option>");
		$('#searchType').append("<option value = '" + _taskType[k] + "'>" + _taskType[k] + "</option>");
	}
	//查任务类型
	for (var k in _dailyClassification) {
		$('#dailyClassification').append("<option value = '" + k + "'>" + _dailyClassification[k] + "任务" + "</option>")
	}
	//查项目类型
	for (var k = 3; k < _dailyClassification.length; k++) {
		$('#searchVirtualType').append("<option value = '" + (k + 2) + "'>" + _dailyClassification[k] + "列表" + "</option>")
	}

	if ($("#searchState").val() == "") {
		$("#searchState").val('未完成');
	}
	queryRepair(1, 0);
	cityLink();
	$("#repairDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			var row = $("#repairDg").datagrid("getSelected");
			if (row) {
				if (row.repState == '事件完成') {
					$('#updateRepairPeopleButton').hide();
					$('#writeProgress').hide();
					$('#doReturningButton').show();
				} else {
					$('#updateRepairPeopleButton').show();
					$('#writeProgress').show();
					$('#doReturningButton').hide();
				}
				if (row.repState == '已复核' || row.repState == '未领取' || row.repState == '事件完成') {
					$("#writeProgress").hide();
				} else {
					$("#writeProgress").show();
				}
				if (row.repState == '已复核' || row.repState == '事件完成') {
					$("#updateRepairPeopleButton").hide();
				} else {
					$("#updateRepairPeopleButton").show();
				}
				$(".repair_index").val(rowIndex);
				$("#repairInfoDlg").dialog({
					title : "任务信息",
					top : getTop(380),
					left : getLeft(700),
					width : 700,
					height : 515,
					closed : true,
					cache : false,
					modal : true,
					onClose : function() {
						$("#repairInfoDlg input").val('');
						$("#repairInfoDlg textarea").val('');
					}
				});
				queryRepairInfo(row);
			}
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
			"<option value = '" + i + "'>" + _proType[i] + "</option>");
	}
	for (var i in _retAttitude) {
		$(".add_return_attitude").append(
			"<option value = '" + i + "'>" + _retAttitude[i] + "</option>");
	}
	for (var i in _repHopeTime) {
		$(".repair_hope_select").append(
			"<option value = '" + i + "'>" + _repHopeTime[i] + "</option>");
	}
	$(".repair_responsibility").append("<option value = '负责人'>负责人</option>");
	/*for (var i in _taskType) {
//		$("#repair_type_rp").append("<option value = '" + _taskType[i] + "'>" + _taskType[i] + "</option>");
	}*/
	//获取部门信息加载到下拉框
	$.post("../queryDepartment.action", {
		departmentStorefrontId : _loginStore,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for (var i in data.body) {
			$(".add_source_theStore").append(
				"<option value = '" + data.body[i].departmentId + "'>"
				+ data.body[i].departmentName + "</option>");
			_depadepartment[i] = data.body[i].departmentId;
		}
	}, "json");

	$("#showReturningTable").datagrid({
		onDblClickRow:function (rowIndex, rowData) {
			if (rowData) {
				for (var i in rowData) {
					$("#readShowCheck" + i).html(rowData[i]);
				}
				$('#showCheckDlg').dialog({
					title : '复核详情',
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
				$('#showCheckDlg').dialog('open');
			}
		}
	})
});

//高级筛选
function advancedScreening(num) {
	if (num == 0) {
		$('.advancedScreening').css({
			"height" : "30px",
			"width" : '900px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "28px",
		})
		$('.advanced2').css({
			"height" : "35px",
		})
	$('#screening').attr('onclick', 'advancedScreening(1)');
	} 
	if (num == 1) {
		$('.advancedScreening').css({
			"height" : "65px",
			"width" : '100%',
		})
		$('.advanced1').css({
			"height" : "31px",
		})
		$('.advanced2').css({
			"height" : "32px",
		})
		$('#screening').attr('onclick', 'advancedScreening(0)');
	}
}

//排序点击事件 addHsSalesmanShowUserInfo
$(document).click(function(e) {
	var clickId = $(e.target).attr('id');
	if(!clickId){
		$("#theSortDlg").fadeOut();
		return;
	}
	if(clickId=="showTheSortButton" || clickId=="showTheSortjia"){
		
	}else if(clickId.indexOf("theSortTerm")>-1){
		var alltheSortTerm = $('.theSortTerm');
		$('.theSortTerm').each(function(){
			$(this).removeClass("theSortTermSelect");
		});
		$("#"+clickId).addClass("theSortTermSelect");
		$('#theSortTermInput').val($("#"+clickId).attr("searchVal"));
		queryRepair(1, 0);
	}else if(clickId.indexOf("theSortContrary")>-1){
		var alltheSortContrary = $('.theSortContrary');
		$('.theSortContrary').each(function(){
			$(this).removeClass("theSortContrarySelect");
		});
		$("#"+clickId).addClass("theSortContrarySelect");
		$('#theSortContraryInput').val($("#"+clickId).attr("searchVal"));
		queryRepair(1, 0);
	}else{
		$("#theSortDlg").fadeOut();
	}
});	

//日常分类筛选框隐藏处理
function dailyClassification() {
	var type = $('#dailyClassification').val(); //获取类型
	// console.log(type);
	if (type == '0') {
		$('#projectDailyTreatment').hide();
		$('#otherDailyHandling').hide();
	} else if (type == '1') {
		$('#projectDailyTreatment').hide();
		$('#otherDailyHandling').show();
	} else if (type == '2') {
		$('#projectDailyTreatment').hide();
		$('#otherDailyHandling').show();
	} else {
		$('#projectDailyTreatment').show();
		$('#otherDailyHandling').hide();
	}
}


// 任务表导入数据
function queryRepair(page, type) {
	var num = $('#dailyClassification').val(); //获取类型
	var addCity = ''; //任务类型
	if (num != 0 && num != 1 && num != 2) {
		addCity = _dailyClassification[num];
	}
	var pageSize = 15;
	var startNum = (parseInt(page) - 1) * pageSize;
	var startTime = $("#searchStartTime").val();
	var endTime = $("#searchEndTime").val();
	var repState = $("#searchState").val();

	var repRepairPeopleId = $("#searchFollowGetUserId").val();//负责人
	var repRepairDetId=$("#searchFollowGetUserDetId").val();//负责人部门
	var repRepairStoreId = $("#searchFollowGetUserStoreId").val();//负责人区域

	var repUserId = $("#searchRegistGetUserId").val();//登记人
	var repDepartment=$("#searchRegistGetUserDetId").val();//登记人部门
	var repStorefront=$("#searchRegistGetUserStoreId").val();//登记人区域

	var keyAdministrator = $('#searchKeyAdministrator').val(); //任务名称
	var repEventRp = $("#searchDoorplateno").val(); //任务描述
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#searchBuilding").val();
	var addDoorplateno = $("#searchDoorplateno1").val();
	var repGrade = $("#searchGrade").val();
	var searchType=$("#searchType").val();
	//排序    
	var theSortTerm = $('#theSortTermInput').val();



	var theSortContrary = $('#theSortContraryInput').val();
	if (startTime == '') {
		startTime = '1980-01-01';
	}
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime = formatDate(endTime);
	console.log("queryRepair theSortTerm:"+theSortTerm+"  theSortContrary:"+theSortContrary+"--"+addCity);
	$.post("../queryTask.action", {
		repState : repState,
		fromTime : startTime,
		toTime : endTime,
		startNum : startNum,
		endNum : pageSize,
		repRepairPeopleId : repRepairPeopleId,
		repRepairDetId:repRepairDetId,
		repRepairStoreId:repRepairStoreId,
		repUserId : repUserId,
		repDepartment:repDepartment,
		repStorefront:repStorefront,
		addCommunity : addCommunity,
		addBuilding : addBuilding,
		addDoorplateno : addDoorplateno,
		repGrade : repGrade,
		splitFlag : 1,
		addCity : addCity,
		keyAdministrator : keyAdministrator,
		repEventRp : repEventRp,
		theSortTerm:theSortTerm,
		theSortContrary:theSortContrary,
		searchType :searchType,
	}, function(data) {
		if (data.code < 0) {
			repairPage(0, 0);
			$('#repairDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});

			/*--1593571234567*/
		/*	for( var i=0 ; i<array.data ; i++ ) {
				for (var j = 0; j < 3; j++) {
					if (data[i].repGrade == j) {
					data:[i]
					}
				}
			}*/
	/*		$("#suFrozenInput").val(row.suFollowupValue);*/

			notCountPage(page, 0, "queryRepair", "repair");
		} else {
			// if (page == 1 && type == 0) {
			// 	repairPage(data.body[0].totalNum, page);
			// 	notCountPage(page, 0 ,"virtualRepair","taskInfo");
			// }
			data = data.body;
			console.log(data);
			if (data.length < pageSize) {
				notCountPage(page, 2, "queryRepair", "repair");
			} else {
				notCountPage(page, 1, "queryRepair", "repair");
			}
			for (var i in data) {
				for (var j in data[i]) {
					if (data[i][j] == null) {
						data[i][j] = '';
					}
				}
			}
			for (var i in data) {
				var addCity = data[i].addCity;
				// console.log(data);
				if (addCity == '项目' || addCity == '库房' || addCity == '供应商' || addCity == '公区') {
					data[i].addCommunity = addCity;
				}
				if (addCity != '项目' && addCity != '库房' && addCity != '供应商' && addCity != '公区') {
					data[i].keyAdministrator = data[i].addCommunity + data[i].addBuilding + data[i].addDoorplateno;
				}
				if ((data[i].repHouseId == null || data[i].repHouseId == '') && (data[i].repHouse4rentId == null || data[i].repHouse4rentId == '')
					&& (data[i].repHouse4storeId == null || data[i].repHouse4storeId == '')) {
					if(data[i].repCocId !== null && data[i].repCocId !== ''){
						data[i].keyAdministrator = data[i].repContacts;
					}else{
						data[i].keyAdministrator = '无归属任务';
					}
					
				}
				if (data[i].repReturningRp == '未回访') {
					data[i].repReturningRp = '未复核';
				}
//				if(data[i].repFinishTime==''){
//					console.log("null time");
//					data[i].repFinishTime='';
//				}
					
				if (data[i].repUseTime == '') {
					if (data[i].repToReceive == '') {
						data[i].repUseTime = "任务未领取";
					} else {
						var end = new Date();
						var statr = data[i].repToReceive;
						data[i].repUseTime = taskCostTime(statr, end);
					/*if(difference < 60){
						data[i].repUseTime = Math.ceil(difference)+"秒";
					}else{
						data[i].repUseTime = Math.ceil(difference/60)+"分钟";
					}*/
					}
					
				} else {
					//console.log("bbb"+data[i].repUseTime);
					var end = data[i].repUseTime;
					var statr = data[i].repToReceive;
					data[i].repUseTime = taskCostTime(statr, end);

					/*var difference= (end-statr)/1000;
					if(difference < 60){
						data[i].repUseTime = Math.ceil(difference)+"秒";
					}else{
						data[i].repUseTime = Math.ceil(difference/60)+"分钟";
					}*/

				}

			}
		$("#repairDg").datagrid("loadData", data);


		}
	}, "json");
}

//任务统计数据
// function getrepairPageCount(page) {
// 	var row = $('#repairDg').datagrid('getSelected');
// 	var num = $('#dailyClassification').val();
// 	var startNum = (parseInt(page) - 1) * 30;
// 	var endNum = 30;
// 	var startTime = $("#searchStartTime").val();
// 	var endTime = $("#searchEndTime").val();
// 	var repState = $("#searchState").val();
// 	var repRepairPeopleId = $("#searchFollowGetUserId").val();
// 	var repUserId = $("#searchRegistGetUserId").val();
// 	var addCommunity = $("#searchCommunity").val();
// 	var addBuilding = $("#searchBuilding").val();
// 	var addDoorplateno = $("#searchDoorplateno1").val();
// 	var searchType=$("#searchType").val();
//
// 	//排序
// 	var theSortTerm = $('#theSortTermInput').val();
// 	var theSortContrary = $('#theSortContraryInput').val();
// 	var pageSize = 15;
// 	// console.log('theSortContrary:'+theSortContrary+"theSortTerm:"+theSortTerm);
// 	$.post('../queryTask.action', {
// 		repState : repState,
// 		fromTime : startTime,
// 		toTime : endTime,
// 		startNum : startNum,
// 		endNum : endNum,
// 		repRepairPeopleId : repRepairPeopleId,
// 		repUserId : repUserId,
// 		addCommunity : addCommunity,
// 		addBuilding : addBuilding,
// 		addDoorplateno : addDoorplateno,
// 		splitFlag : 0,
// 		theSortTerm:theSortTerm,
// 		theSortContrary:theSortContrary,
// 		searchType:searchType
// 	}, function(data) {
// 		if (data.code < 0) {
// 			var countJson = {
// 				totalNum : 0,
// 			};
// 			getCountData(0, countJson, pageSize, page, "repair", 0);
// 		} else {
// 			data = data.body;
// 			console.log(data);
// 			var countJson = {
// 				totalNum : data[0].totalNum,
// 			};
// 			getCountData(0, countJson, pageSize, page, "repair", 0);
// 		}
// 	});
// }

function getrepairPageCount(page){
	var num = $('#dailyClassification').val(); //获取类型
	var addCity = ''; //任务类型
	if (num != 0 && num != 1 && num != 2) {
		addCity = _dailyClassification[num];
	}
	var pageSize = 15;
	var startTime = $("#searchStartTime").val();
	var endTime = $("#searchEndTime").val();
	var repState = $("#searchState").val();

	var repRepairPeopleId = $("#searchFollowGetUserId").val();//负责人
	var repRepairDetId=$("#searchFollowGetUserDetId").val();//负责人部门
	var repRepairStoreId = $("#searchFollowGetUserStoreId").val();//负责人区域

	var repUserId = $("#searchRegistGetUserId").val();//登记人
	var repDepartment=$("#searchRegistGetUserDetId").val();//登记人部门
	var repStorefront=$("#searchRegistGetUserStoreId").val();//登记人区域

	var keyAdministrator = $('#searchKeyAdministrator').val(); //任务名称
	var repEventRp = $("#searchDoorplateno").val(); //任务描述
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#searchBuilding").val();
	var addDoorplateno = $("#searchDoorplateno1").val();
	var repGrade = $("#searchGrade").val();
	var searchType=$("#searchType").val();
	//排序
	var theSortTerm = $('#theSortTermInput').val();



	var theSortContrary = $('#theSortContraryInput').val();
	if (startTime == '') {
		startTime = '1980-01-01';
	}
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime = formatDate(endTime);
	console.log("queryRepair theSortTerm:"+theSortTerm+"  theSortContrary:"+theSortContrary+"--"+addCity);
	$.post("../queryTask.action", {
		repState : repState,
		fromTime : startTime,
		toTime : endTime,
		repRepairPeopleId : repRepairPeopleId,
		repRepairDetId:repRepairDetId,
		repRepairStoreId:repRepairStoreId,
		repUserId : repUserId,
		repDepartment:repDepartment,
		repStorefront:repStorefront,
		addCommunity : addCommunity,
		addBuilding : addBuilding,
		addDoorplateno : addDoorplateno,
		repGrade : repGrade,
		splitFlag : 0,
		addCity : addCity,
		keyAdministrator : keyAdministrator,
		repEventRp : repEventRp,
		theSortTerm:theSortTerm,
		theSortContrary:theSortContrary,
		searchType :searchType,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"repair",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"repair",0);
		}
	});
}


//任务详细复核列表导入数据
function queryRepairReturning(repId) {
	$.post("../queryAllRepairReturning.action", {
		retRepairId : repId
	}, function(data) {
		if (data.code < 0) {
			$('#showReturningTable').datagrid("loadData", []);

		} else {
			data = data.body;
			for (var i in data) {
				data[i].retTime = formatTime(data[i].retTime, 1);
			}
			$('#showReturningTable').datagrid("loadData", data);
		}
	});
}

// 事件详细进展列表导入数据
function queryRepairProgress(repId) {
	$.post("../queryAllRepairProgress.action", {
		proRepairId : repId
	}, function(data) {
		if (data.code < 0) {
			$('#showProgressTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			for (var i in data) {
				data[i].proTime = formatTime(data[i].proTime, 1);
			}
			$('#showProgressTable').datagrid("loadData", data);
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
// 事件详细信息获取
function queryRepairInfo(row) {
	if (row.keyAdministrator == '') {
		$(".repair_address").val(row.addCommunity + row.addBuilding + row.addDoorplateno);
	} else {
		$(".repair_address").val(row.keyAdministrator);
	}
	if ((row.repHouse4rentId != null && row.repHouse4rentId != '') && (row.repHouse4storeId != null && row.repHouse4storeId != '') && (row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_houseType").val('已租任务');
	} else if ((row.repHouse4rentId == null || row.repHouse4rentId == '') && (row.repHouse4storeId != null && row.repHouse4storeId != '') && (row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_houseType").val('未租任务');
	} else if ((row.repHouse4rentId == null || row.repHouse4rentId == '') && (row.repHouse4storeId == null || row.repHouse4storeId == '') && (row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_houseType").val('项目任务');
	} else {
		$(".repair_houseType").val('无关联任务');
	}
	$(".repair_id").val(row.repId);
	$(".repair_time").val(row.repReportingTime);
	$(".repair_userName").val(row.repUserName);
	$(".repair_userId").val(row.repUserId);
	$(".repair_contacis").val(row.repContacts);
	$(".repair_contacisPhone").val(row.repContactsPhone);
	$(".repair_responsibility").val(row.repResponsibility);
	$(".repair_hope_time").val(row.repHopeTime);
	$(".repair_receive").val(row.repToReceive);
	$(".repair_type").val(row.repTypeRp);
	$(".repair_event").val(row.repEventRp);
	$(".repair_progress_rp").val(row.repProgressRp);
	$(".repair_peopleName").val(row.repRepairman);
	$(".repair_peopleId").val(row.repRepairPeopleId);
	$(".repair_state").val(row.repState);
	$(".repair_grade").val(row.repGrade);
	$(".repair_returnning").val(row.repReturningRp);
	$("#repairInfoDlg").dialog('open');
	if ($('#showProgressTable').hasClass('datagrid-f')) {
	} else {
		$('#showProgressTable').datagrid(
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
						for (var i in row) {
							$("#readShowProgress" + i).html(row[i]);
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
	}
	$('#showProgressTable').datagrid({
		data : [],
	});
	queryRepairProgress(row.repId);
	queryRepairReturning(row.repId);
}

// 分页操作
function repairPage(totalNum, page) {
	console.log(totalNum+'   '+page)
	var pageNum = Math.ceil(totalNum / 30);
	$("#repairPage").remove();
	$("#repairPageDiv")
		.append(
			"<div class='tcdPageCode' id='repairPage' style='text-align:center;'></div>");
	$("#repairPage").createPage({
		onePageNums : 30,
		totalNum : totalNum,
		pageCount : pageNum,
		current : 1,
		backFn : function(p) {
			if (p <= pageNum) {
				queryRepair(p, 1);
			}
		}
	});
}
// 任务状态列格式
function formatState(value, row, index) {
	if (row.repState == '未领取') {
		return "<a style='text-decoration:none;color:red;'>" + row.repState
			+ "<a>";
	} else if (row.repState == '回访完成') {
		return "<a style='text-decoration:none;color:blue;'>" + row.repState
			+ "<a>";
	} else {
		return "<a style='text-decoration:none;color:green;'>" + row.repState
			+ "<a>";
	}
}
// 报修时间列格式
function formatOperRepTime(value, row, index) {
//	console.log("repReportingTime    "+row.repReportingTime);
	return formatTime(row.repReportingTime, 1);
}
// 任务事件列格式
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
//任务等级
function formatRepGrade(value, row, index) {
	if (row.repGrade == 1) {
		return "<span title='紧急任务'>" + row.repGrade + "</span>";
	} else if (row.repGrade == 2) {
		return "<span title='正常任务'>" + row.repGrade + "</span>";
	} else if (row.repGrade == 3) {
		return "<span title='时间较充裕任务'>" + row.repGrade + "</span>";
	}
}
// 领取任务列格式
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
// 执行领取任务
function toReceive(repId, index) {
	var loginPurview = $('#loginPurview').val();
	var loginPurviewJson = JSON.parse(loginPurview);
	if (_thisPurview['a'] == 0 || _thisPurview['c'][3] == 0) { //领取任务
		$.messager.alert('通知', '无领取任务权限', 'info');
		return;
	}
	$.messager.confirm("操作提示", "确定要领取任务吗？", function(data) {
		if (data) {
			var repToReceive = getNowFormatDate();
			$.post("../updateRepair.action", {
				repId : repId,
				repToReceive : repToReceive,
				repState : '跟进中'
			}, function(data) {
				if (data.code < 0) {
					myTips(data.msg, "error");
				}
				myTips("领取成功！", "success");
				var page=$(".current").html();
				queryRepair(page, 0);
			});
		} else {

		}
	});
}
//添加任务
function doAddRepair() {
	var houseRentCoding = $(".repair_houseRentCoding").val();
	var houseStoreCoding = $(".repair_houseStoreCoding").val();
	var houseCoding = $(".repair_houseCoding").val();
	var repName = $(".repair_name").val();
	var repPhone = $(".repair_phone").val();
	var repHopeTime = $("#repair_hopetime").val();
	var repRespon = $(".repair_responsibility").find("option:selected").text();
	var repEvent = $(".repair_event_rp").val();
	var repTypeRp = $("#repair_type_rp").find("option:selected").text();
	var repRepairPeopleId = $("#doRepairGetUserId").val();
	var repTaskTime = getTaskTime();   
	var att = $("#att").val();
	var jhfFollowRemark = _loginUserName + ' 添加的' + repTypeRp + ':' + repEvent;
	var type = "任务";
	var grade = $(".repair_grade").find("option:selected").text();
	var keyAdministrator=$("#repair_choseHouse").val();
	var cocId = $("#cocId").val();
	
	showLoading();
	$.post("../insertRepair.action", {
		repCocId : cocId,
		repHouse4rentId : houseRentCoding,
		repHouse4storeId : houseStoreCoding,
		repHouseId : houseCoding,
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
		att : att,
		type : type,
		repGrade : grade,
		keyAdministrator : keyAdministrator,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips("添加失败！", "error");
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
		//		},
		//		function(fData){
		//			console.log(fData);
		//		})
		isSave = true;
		doSendMessage();
		doSendTemplateMessage();
		myTips("添加成功！", "success");
	});
}
//执行发送短信
function doSendMessage() {
	if ($('#shorMessageRemind').prop("checked")) {
		var repairUserId = $('#doRepairGetUserId').val();
		var repTypeRp1 = $("#repair_type_rp").find("option:selected").text();
		var smRentId = $('.repair_houseRentCoding').val();
		var smNotRentId = $('.repair_houseStoreCoding').val();
		var address = $('.repair_choseHouse').val();
		var addCommunity = '';
		if (address == '' || address == null) {
			address = '无归属任务';
		}
		var popName = $('.repair_name').val();
		var popTel =  $(".repair_phone").val();
		var repHopeTime = $('.repair_hope_time').val();
		var repairDescribe = $('.repair_event_rp').val() + "负责人：" + _loginUserName;
		console.log(
				"  repairUserId "+repairUserId+
				"  smRentId "+smRentId+
				"  smNotRentId "+smNotRentId+
				"  smNotRentId "+smNotRentId+
				"  repTypeRp1 "+repTypeRp1+
				"  address "+address+
				"  popName "+popName+
				"  popTel "+popTel+
				"  repHopeTime "+repHopeTime+
				"  repairDescribe "+repairDescribe);
		var repairJson = {
			smUserId : repairUserId,
			smRentId : smRentId,
			smNotRentId : smNotRentId,
			repairEvenType : repTypeRp1,
			addCommunity : address,
			popName : popName,
			popTelephone : popTel,
			hopeTime : repHopeTime,
			repairDescribe : repairDescribe,
		};
		// console.log("sss:"+repairJson);
		// console.log('有没有' + repairJson);
		$.post("../massage/sendRepairMsg.action", repairJson,  function(data) {
			if (data.code < 0) {
				myTips(data.msg, "error");
				if (!$('#shorMessageTemplateRemind').prop("checked")) {
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
	} else {
		if (!$('#shorMessageTemplateRemind').prop("checked")) {
			$("#addRepairDlg").dialog('close');
			queryRepair(1, 0);
		}
		return;
	}
}

//执行发送短信
function doSendTemplateMessage() {
	if ($('#shorMessageTemplateRemind').prop("checked")) {
		var repairUserId = $('#doRepairGetUserId').val();
		var repTypeRp1 = $("#repair_type_rp").find("option:selected").text();
		var address = $('.repair_choseHouse').val();
		var sendTime=formatTime(getNowFormatDate(), 4);
		var popName = $('.repair_name').val();
		var popTel = $('.repair_phone').val();
		var repairDescribe = address+" "+$('.repair_event_rp').val()
		console.log("template  "+
			"  repairUserId "+repairUserId+
			"  repTypeRp1 "+repTypeRp1+
			"  address "+address+
			"  popName "+popName+
			"  popTel "+popTel+
			"  repairDescribe "+repairDescribe);
		console.log("id======"+repairUserId);
		$.post("../sendTemplateMessage.action",{
			toUserId	:repairUserId,
			toUserType	:"task",
			scene	  	: 1,
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

// 选择项目
function choseHouse() {
	$('#choseHouseDlg').dialog({
		title : '选择楼盘/项目',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {}
	});
	relationDataGrid();
	$('#choseHouseDlg').dialog('open');
}
function relationDataGrid() {
	var relationType = $('#searchVirtualType').find('option:selected').text();
	$('#searchHrStateDiv').hide();
	if (relationType == '已租列表') {
		$('#virtualRelationSelect [clsso="clsso"]').val('');
		$('#virtualRelationSelect').hide();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').hide();
		$('#choseSource').show();
		$('#choseHouseSelect').show();
		$('#searchHrStateDiv').show();
		$('#choseCustomer').hide();
		$('#customerSelect').hide();
		if ($('#choseSourceTable').hasClass('datagrid-f')) {
		} else {
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
					$('.add_repair_houseType').val('');
					$('.repair_name').val('');
					$('.repair_phone').val('');

					$('.repair_choseHouse').val(row.hrAddCommunity + row.hrAddBuilding + row.hrAddDoorplateno);
					$('.repair_houseRentCoding').val(row.hrId);
					$('.repair_houseStoreCoding').val(row.hrHouse4storeId);
					$('.repair_houseCoding').val(row.hrHouseId);
					$('.add_repair_houseType').val('已租任务');
					$('.repair_name').val(row.renterPopName);
					$('.repair_phone').val(row.renterPopTelephone);
					$('.repair_name2').val(row.renterPopName);
					$('.repair_phone2').val(row.renterPopTelephone);
					$('.repair_name3').val(row.landlordPopName);
					$('.repair_phone3').val(row.landlordPopTelephone);
					$('#choseHouseDlg').dialog('close');
				}
			});
		}
	}
	else if (relationType == '未租列表') {
		$('#virtualRelationSelect [clsso="clsso"]').val('');
		$('#virtualRelationSelect').hide();
		$('#choseHouseSelect').show();
		$('#choseSource').hide();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').hide();
		$('#choseTrusteeship').show();
		$('#choseCustomer').hide();
		$('#customerSelect').hide();
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
					$('.add_repair_houseType').val('');
					$('.repair_name').val('');
					$('.repair_phone').val('');

					$('.repair_choseHouse').val(row.hsAddCommunity + row.hsAddBuilding + row.hsAddDoorplateno);
					$('.repair_houseRentCoding').val('');
					$('.repair_houseStoreCoding').val(row.hsId);
					$('.repair_houseCoding').val(row.hsHouseId);
					$('.add_repair_houseType').val('未租任务');
					$('.repair_name').val(row.laPopName);
					$('.repair_phone').val(row.laPopTelephone);
					$('#choseHouseDlg').dialog('close');
				}
			});
		}
	}
	else if  (relationType == '盘源列表') {
		$('#virtualRelationSelect [clsso="clsso"]').val('');
		$('#virtualRelationSelect').hide();
		$('#choseHouseSelect').show();
		$('#choseSource').hide();
		$('#choseTrusteeship').hide();
		$('#choseVirtual').hide();
		$('#choseSaveHouse').show();
		$('#choseCustomer').hide();
		$('#customerSelect').hide();
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
					$(".add_repair_houseType").val('');
					$(".repair_name").val('');
					$(".repair_phone").val('');

					$(".repair_choseHouse").val(row.addCommunity + row.addBuilding + row.addDoorplateno);
					$(".repair_houseRentCoding").val('');
					$(".repair_houseStoreCoding").val('');
					$(".repair_houseCoding").val(row.houseCoding);
					$(".add_repair_houseType").val('盘源任务');
					if (row.lipLandlordName != '' && row.lipLandlordName != null && row.lipLandlordPhone != '' && row.lipLandlordPhone != null) {
						$(".repair_name").val(row.lipLandlordName);
						$(".repair_phone").val(row.lipLandlordPhone);
					}
					$('#choseHouseDlg').dialog('close');
				}
			});
		}
	} else if(relationType == '客户列表'){

		$('#choseHouseSelect [clone="clone"]').val('');
		$('#choseHouseSelect').hide();
		$('#virtualRelationSelect').hide();
		$('#customerSelect').show();
		$('#choseSource').hide();
		$('#choseSaveHouse').hide();
		$('#choseTrusteeship').hide();
		$('#choseVirtual').hide();
		$('#choseCustomer').show();
		if ($('#choseCustomerTable').hasClass('datagrid-f')) {

		} else {
			$('#choseCustomerTable').datagrid({
				columns : [ [ {
					field : 'cocType',
					title : '类型',
					width : 10,
					align : 'center'
				}, {
					field : 'cocContacts',
					title : '联系人',
					width : 10,
					align : 'center'
				}, {
					field : 'cocCompany',
					title : '公司名称',
					width : 10,
					align : 'center'
				}, {
					field : 'cocPhone',
					title : '电话号码',
					width : 10,
					align : 'center'
				}, {
					field : 'cocGrade',
					title : '客户等级',
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
					var row = $('#choseCustomerTable').datagrid(
						'getSelected');
				
					console.log(row);
					if (row) {
						for (var i in row) {
							if (row[i] == null) {
								row[i] = '';
							}
						}
						$(".repair_houseRentCoding").val('');
						$(".repair_houseStoreCoding").val('');
						$(".repair_houseCoding").val('');
						$(".add_repair_houseType").val('');
						$(".repair_name").val('');
						$(".repair_phone").val('');

						$(".repair_choseHouse").val(row.cocContacts);
						$(".repair_houseRentCoding").val('');
						$(".repair_houseStoreCoding").val('');
						$(".repair_houseCoding").val(row.houseCoding);
						$(".add_repair_houseType").val("客户列表");
						$(".repair_name").val(row.cocContacts);
						$(".repair_phone").val(row.cocPhone);
						$("#cocId").val(row.cocId);
						$('#choseHouseDlg').dialog('close');
					}
				}
			});
		}
	
		
	}else {
		$('#choseHouseSelect [clone="clone"]').val('');
		$('#choseHouseSelect').hide();
		$('#virtualRelationSelect').show();
		$('#choseSource').hide();
		$('#choseSaveHouse').hide();
		$('#choseTrusteeship').hide();
		$('#choseVirtual').show();
		$('#choseCustomer').hide();
		$('#customerSelect').hide();
		if ($('#choseVirtualTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualTable').datagrid({
				columns : [ [ {
					field : 'addCommunity',
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
					var row = $('#choseVirtualTable').datagrid(
						'getSelected');
					if (row) {
						for (var i in row) {
							if (row[i] == null) {
								row[i] = '';
							}
						}
						$(".repair_houseRentCoding").val('');
						$(".repair_houseStoreCoding").val('');
						$(".repair_houseCoding").val('');
						$(".add_repair_houseType").val('');
						$(".repair_name").val('');
						$(".repair_phone").val('');

						$(".repair_choseHouse").val(row.keyAdministrator);
						$(".repair_houseRentCoding").val('');
						$(".repair_houseStoreCoding").val('');
						$(".repair_houseCoding").val(row.houseCoding);
						relationTypes = $("#searchVirtualType").find('option:selected').text();
						relationTypes.replace("列表","任务");
						$(".add_repair_houseType").val(relationTypes+"任务");
						$(".repair_name").val(row.keyNumber);
						$(".repair_phone").val(row.houseEntrust4rent);
						$('#choseHouseDlg').dialog('close');
					}
				}
			});
		}
	}
	choseHouseData(1, 0);
}

function choseHouseData(page, type) {
	var relation = $('#searchVirtualType').val();
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var taskSign = 'task';
	if(relation > 4){//其他任务
		var addCity = '';
		for (var k in _dailyClassification) {
			if (k == relation - 1) {
				addCity = _dailyClassification[k];
				break;
			}
		}
		console.log(addCity);
		var virtualType = $("#searchVirtualType").val();
		var searchVirtualName = $("#searchVirtualName").val();
		var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
		var searchVirtualContact = $("#searchVirtualContact").val();
		$.post("../queryVirtualThings.action", {
			startNum : startNum,
			endNum : endNum,
			virtualType : virtualType,
			addCity : addCity,
			keyAdministrator : searchVirtualName,
			addDoorplateno : searchVirtualDoorplateno,
			keyNumber : searchVirtualContact,
			taskSign  : taskSign,
		}, function(data) {
			if (data.code <0) {
				sourcePage(0, 0, 1);
				$('#choseVirtualTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				if (page == 1 && type == 0) {
					sourcePage(data.body[0].totalNum, page, 1);
				}
				$("#choseVirtualTable").datagrid("loadData", data.body);
			}
		}, "json");
	}else{//房屋任务
		var qhAddCity = $("#searchAddCity").find("option:selected").text();
		var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
		var qhAddZone = $("#searchAddZone").find("option:selected").text();
		var qhAddCommunity = $("#searchAddCommunity").val();
		var qhAddBuilding = $("#searchAddBuilding").val();
		var qhAddDoorplateno = $("#searchAddDoorplateno").val();
		var searchHrLeaseState = $("#searchHrLeaseState").val();
		var customerContact = $("#customerContact").val();
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
				if (data.code<0){
					sourcePage(0, 0, 2);
					$('#choseSourceTable').datagrid({
						data : [],
						view : myview,
						emptyMsg : data.msg
					});
				} else {
					if (page == 1 && type == 0) {
						sourcePage(data.body[0].totalNum, page, 2);
					}
					$("#choseSourceTable").datagrid("loadData", data.body);
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
					sourcePage(0, 0, 3);
					$('#choseTrusteeshipTable').datagrid({
						data : [],
						view : myview,
						emptyMsg : data.msg
					});
				} else {
					data= data.body;
					if (page == 1 && type == 0) {
						sourcePage(data[0].totalNum, page, 3);
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
					sourcePage(0, 0, 4);
					$('#choseSaveHouseTable').datagrid({
						data : [],
						view : myview,
						emptyMsg : data.msg
					});
				} else {
					if (page == 1 && type == 0) {
						sourcePage(data.body[0].totalNum, page, 4);
					}
					$("#choseSaveHouseTable").datagrid("loadData", data.body);
				}
			}, "json");
		}
		if (relation == 4) {
			$.post("../queryCustomer.action", {
				startNum : startNum,
				endNum : endNum,
				cocContacts : customerContact,
			}, function(data) {
				if (data.code < 0) {
					sourcePage(0, 0, 5);
					$('#choseCustomerTable').datagrid({
						data : [],
						view : myview,
						emptyMsg : data.msg
					});
				} else {
					if (page == 1 && type == 0) {
						sourcePage(data.body[0].totalNum, page, 5);
					}
					$("#choseCustomerTable").datagrid("loadData", data.body);
				}
			}, "json");
		}
	}
}
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseVirtualPage").remove();
		$("#choseVirtualPageDiv")
			.append(
				"<div class='tcdPageCode' id='choseVirtualPage' style='text-align:center;'></div>");
		$("#choseVirtualPage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
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
		$("#choseSourcePage").remove();
		$("#choseSourcePageDiv")
			.append(
				"<div class='tcdPageCode' id='choseSourcePage' style='text-align:center;'></div>");
		$("#choseSourcePage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
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
		pageNum = Math.ceil(totalNum / 10);
		$("#choseTrusteeshipPage").remove();
		$("#choseTrusteeshipPageDiv")
			.append(
				"<div class='tcdPageCode' id='choseTrusteeshipPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipPage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
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
		pageNum = Math.ceil(totalNum / 10);
		$("#choseSaveHousePage").remove();
		$("#choseSaveHousePageDiv")
			.append(
				"<div class='tcdPageCode' id='choseSaveHousePage' style='text-align:center;'></div>");
		$("#choseSaveHousePage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					choseHouseData(p, 1);
				}
			}
		});
	}
	if (type == 5) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseSaveCostomerPage").remove();
		$("#choseCustomerPageDiv")
			.append(
				"<div class='tcdPageCode' id='choseSaveCostomerPage' style='text-align:center;'></div>");
		$("#choseSaveCostomerPage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					choseHouseData(p, 1);
				}
			}
		});
	}
}
// 添加进展
function addProgress(type) {
	/*if (type == 1) {
		var repId = $('.repair_id').val();
		//var repTollRp = $('.repair_toll_rp').val().split("元")[0];
		var repRepairPeopleId = $('.repair_peopleId').val();
		var repState = $('.repair_state').val();
		var row = {
			"repId" : repId,
			//"repTollRp" : repTollRp,
			"repRepairPeopleId" : repRepairPeopleId,
			"repState" : repState
		};
	} else {
		var row = $("#repairDg").datagrid('getSelected');
	}*/
	var row = $("#repairDg").datagrid('getSelected');
	console.log(row)
	if (row) {
		if (row.repState == '未领取') {
			myTips('任务还未领取，无法添加进展!');
			return;
		} else if (row.repState == '已复核') {
			myTips('复核已完成，无法添加进展!');
			return;
		} else if (row.repState == '事件完成') {
			myTips('任务已完成，无法添加进展!');
			return;
		}
		$("#addProgressDlg").dialog({
			title : '添加进展',
			top : getTop(200),
			left : getLeft(350),
			height : 200,
			width : 350,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$("#addProgressDlg input").val('');
				$("#addProgressDlg textarea").val('');
				$("#addProgressDlg select").val('');
			}
		});
		$(".add_pro_repairId").val(row.repId);
		$(".add_pro_tollRp").val(row.repTollRp);
		$(".add_pro_userId").val(row.repRepairPeopleId);
		$(".add_pro_time").val(getNowFormatDate());
		$("#addProgressDlg").dialog('open');
	} else {
		myTips("请选择一条信息用于添加进展！", "error");
	}
}
//添加任务
function addRepair() {
	$("#addRepairDlg").dialog({
		title : "添加任务",
		top : getTop(360),
		left : getLeft(390),
		width : 390,
		height : 360,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addRepairDlg [clear="clear"]').val('');
			$('#addRepairDlg [clean="clean"]').html('');
			$('#addRepairDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#shorMessageRemind').prop({
				checked : true
			});
			clearAttachment();
		},
		onOpen : function() {
			$("#addRepairDlg .repair_hope_time").val("尽快");
		}
	});
	$(".repair_grade").val('3');
	$(".repair_responsibility").val('负责人')
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$("#addRepairDlg").dialog('open');
}
// 执行添加进展
function doAddProgress() {
	var rowIndex = $('#repairDg').datagrid('getRowIndex', $('#repairDg').datagrid('getSelected'));
	var proTime = $(".add_pro_time").val();
	var proRepairId = $(".add_pro_repairId").val();
	var proUserId = $(".add_pro_userId").val();
	var proState = $(".add_proType").find('option:selected').text();
	var proMoney = $(".add_pro_receivable_money").val();
	var proBillingInfo = $(".add_billing_info").val();
	var proMark = $(".add_pro_mark").val();
	var aTollRp = $(".add_pro_tollRp").val();
	var bTollRp = parseInt(aTollRp);
	if (proMoney != '') {
		bTollRp += parseInt(proMoney);
	}
	var repUseTime;
	var repFinishTime;
	if (proState == '已完成') {
		repUseTime = getNowFormatDate();
		repFinishTime=  getNowFormatDate();
	}
	showLoading();
	$.post("../insertRepairProgress.action", {
		proRepairId : proRepairId,
		proUserId : _loginUserId,
		proTime : proTime,
		proState : proState,
		proReceivableMoney : proMoney,
		proBillingInfo : proBillingInfo,
		proRemark : proMark,
		department : _loginDepartment,
		storefront : _loginStore
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, 'error');
		} else {
			data = data.body;
			$("#addProgressDlg").dialog('close');
			var addProState = '跟进中';
			var repProgressRp = "(" + formatTime(proTime, 2) + ")" + proState + "," + proMark;
			if (proState == '已完成') {
				addProState = '事件完成';
				$('#repairDg').datagrid('updateRow', {
					index : rowIndex,
					row : {
						repState : '事件完成',
					}
				});
			}
			$.post("../updateRepair.action", {
				repId : proRepairId,
				repProgressRp : repProgressRp,
				repState : addProState,
				repFinishTime:repFinishTime
			}, function(data) {
				$(".repair_progress_rp").val(repProgressRp);
				$('#repairDg').datagrid('updateRow', {
					index : rowIndex,
					row : {
						repState : addProState,
						repProgressRp : repProgressRp,
					}
				});
				queryRepairProgress(proRepairId);
				myTips("添加进展成功！", "success");
				if (proState == '已完成') {
					addProState = '事件完成';
					$('#repairDg').datagrid('updateRow', {
						index : rowIndex,
						row : {
							repState : '事件完成',
						}
					});
					setTimeout(function() {
						$("#repairInfoDlg").dialog('close');
					}, 1000);
				}
			});
			$("#repairInfoDlg").dialog('close');
			queryRepair(1,0);
		}
	});
}
// 期望时间
function hopeTimeVal() {
	var hopeSelect = $('.repair_hope_select').find('option:selected').text()
	if (hopeSelect == "尽快" || hopeSelect == "电话联系") {
		$('.repair_hope_time').val(hopeSelect);
	}
	if (hopeSelect == "今天") {
		$('.repair_hope_time').val(formatTime(getNowFormatDate(), 2) + " ");
	}
	if (hopeSelect == "明天") {
		var d = formatTime(getNowFormatDate(), 2)
		var tomorrow = new Date(d);
		var sDay = 1;
		tomorrow.setDate(tomorrow.getDate() + sDay);
		$('.repair_hope_time').val(formatDate(tomorrow));
	}
	if (hopeSelect == "后天") {
		var d = formatTime(getNowFormatDate(), 2)
		var afterTomorrow = new Date(d);
		var sDay = 2;
		afterTomorrow.setDate(afterTomorrow.getDate() + sDay);
		$('.repair_hope_time').val(formatDate(afterTomorrow));
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
		$('.repair_hope_time').val(formatDate(satur) + "或" + formatDate(sun));
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
function cityLink() {
	$("#searchAddCity").append("<option value = '0'>" + _loginCompanyRentCity + "</option>");
	$("#searchAddCity").val(0);
}
function checkContact() {
	if ($('.add_repair_houseType').val() == '已租任务') {
		if ($('#repair_type_rp').val() == '客户事务') {
			$('.repair_name').val($('.repair_name2').val());
			$('.repair_phone').val($('.repair_phone2').val());
		} else if ($('#repair_type_rp').val() == '业主事务') {
			$('.repair_name').val($('.repair_name3').val());
			$('.repair_phone').val($('.repair_phone3').val());
		} else if ($('#repair_type_rp').val() == '公司事务') {
			$('.repair_name').val($('.repair_name2').val());
			$('.repair_phone').val($('.repair_phone2').val());
		}
	}
}
/****************************修改负责人************************************/
//打开修改负责人窗口
function updateRepairMan() {
	$("#updateRepairManDlg").dialog({
		title : '修改负责人',
		top : getTop(230),
		left : getLeft(300),
		width : 300,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateRepairManDlg [clear="clear"]').val('');
			$('#updateRepairManDlg [clean="clean"]').html('');
			$('#updateRepairManDlg [choose="choose"]').val('');
			$('#updateRepairManDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#shorMessageRemind2').prop({
				checked : true
			});
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
		$("#updateRepairManOld").val(data[0].storefrontName + " " + data[0].departmentName + " " + data[0].suStaffName);
	});

	$("#updateRepairManDlg").dialog('open');
}
//执行修改负责人
function doUpdateRepairMan() {
	var repId = $(".repair_id").val();
	var repRepairPeopleId = $("#newRepairGetUserId").val();
	var oldRepRepairPeople = $("#updateRepairManOld").val();
	var repRepairPeopleName = $("#newRepairShowUserInfo").val();
	if ((oldRepRepairPeople == repRepairPeopleName) || repRepairPeopleId == '') {
		myTips('请选择新负责人', 'error');
		return;
	}
	if(oldRepRepairPeople.split(" ").length==3){
		oldRepRepairPeople=oldRepRepairPeople.split(" ")[2];
	}
	if(repRepairPeopleName.split(" ").length==3){
		repRepairPeopleName=repRepairPeopleName.split(" ")[2];
	}
	var changeNote = "原负责人：" + oldRepRepairPeople
		+ ";新负责人：" + repRepairPeopleName
		+ ";操作人员：" + _loginUserName;
	var updateRepairProgress = $('#updateRepairProgress').val();
	showLoading();
	$.post("../updateRepair.action", {
		repId : repId,
		repRepairPeopleId : repRepairPeopleId,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, "error");
			return;
		}
		$.post("../insertRepairProgress.action", {
			proRepairId : repId,
			proUserId : _loginUserId,
			department : _loginDepartment,
			storefront : _loginStore,
			proTime : getNowFormatDate(),
			proState : "未完成",
			proReceivableMoney : "0.00",
			proBillingInfo : "无结算",
			proRemark : changeNote,
		}, function(proData) {
			if (updateRepairProgress != '') {
				$.post("../insertRepairProgress.action", {
					proRepairId : repId,
					proUserId : _loginUserId,
					department : _loginDepartment,
					storefront : _loginStore,
					proTime : getNowFormatDate(),
					proState : "未完成",
					proReceivableMoney : "0.00",
					proBillingInfo : "无结算",
					proRemark : updateRepairProgress,
				}, function(proData) {});
			}
			var repProgressRp = "(" + formatTime(getNowFormatDate(), 2) + ")" + changeNote;
			$.post("../updateRepair.action", {
				repId : repId,
				repProgressRp : repProgressRp
			}, function(updateData) {});
			updateRepairSendMessage();
			myTips("修改成功！", "success");
		});
	});
}
//修改负责人、短信发提醒
function updateRepairSendMessage() {
	if ($('#shorMessageRemind2').prop("checked")) {
		var row = $("#repairDg").datagrid('getSelected');
		var userId = $('#newRepairGetUserId').val();
		var repairUserId = $("#newRepairGetUserId").val();
		var smRentId = row.repHouse4rentId;
		var smNotRentId = row.repHouse4storeId;
		var updateRepairManOld = $('#updateRepairManOld').val();
		var repairDescribe = row.repEventRp + '。负责人:' + updateRepairManOld;
		var updateRepairJson = {
			smUserId : repairUserId,
			smRentId : smRentId,
			smNotRentId : smNotRentId,
			repairEvenType : row.repTypeRp,
			addCommunity : row.startNum,
			popName : row.repContacts,
			popTelephone : row.repContactsPhone,
			hopeTime : row.repHopeTime,
			repairDescribe : repairDescribe,
		};
		$.post("../massage/sendRepairMsg.action", updateRepairJson, function(data) {
			if (data.code < 0) {
				myTips(data.msg, "error");
				queryRepair(1, 0);
				$("#updateRepairManDlg").dialog('close');
				$("#repairInfoDlg").dialog('close');
				return;
			}
			queryRepair(1, 0);
			$("#updateRepairManDlg").dialog('close');
			$("#repairInfoDlg").dialog('close');
		});
	} else {
		queryRepair(1, 0);
		$("#updateRepairManDlg").dialog('close');
		$("#repairInfoDlg").dialog('close');
		return;
	}
}

function formatReturningRp(value, row, index) {
	if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined || 
			_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//修改复核
		
		if (row.repReturningRp == '未复核' || row.repReturningRp == '未完成' || row.repReturningRp == '复核不通过') {
			$('#repairDg').datagrid('selectRow', index);
			return "<a href='#' style='text-decoration:none;color:red;'>" + row.repReturningRp + "</a>";
		}else {
			$('#repairDg').datagrid('selectRow', index);
			return "<a href='#' style='text-decoration:none;color:blue;' onclick='showReturningRp("
				+ row.repId + ")'>" + row.repReturningRp + "</a>";
		}
		
	}else{
	if (row.repReturningRp == '未复核' || row.repReturningRp == '未完成' || row.repReturningRp == '复核不通过') {
		$('#repairDg').datagrid('selectRow', index);
		return "<a href='#' style='text-decoration:none;color:red;' onclick='addReturningRp("
			+ index + ",0)'>" + row.repReturningRp + "</a>";
	} else {
		$('#repairDg').datagrid('selectRow', index);
		return "<a href='#' style='text-decoration:none;color:blue;' onclick='showReturningRp("
			+ row.repId + ")'>" + row.repReturningRp + "</a>";
	}}
}

//添加回访记录
function addReturningRp(index, type) {
	var row = $('#repairDg').datagrid('getData').rows[index];
	if (row.repState == '未领取') {
		myTips('任务还未领取，无法添加复核!');
		return;
	} else if (row.repState == '复核完成') {
		myTips('复核已完成，无法添加复核!');
		return;
	} else if (row.repState == '跟进中') {
		myTips('任务还未完成，无法添加复核!');
		return;
	}
	$("#addReturningDlg").dialog({
		title : '添加复核',
		top : getTop(180),
		left : getLeft(280),
		width : 420,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addReturningDlg input").val('');
			$("#addReturningDlg textarea").val('');
			$("#addReturningDlg select").val('');
		}
	});
	$(".add_return_userName").val(_loginUserName);
	$(".add_return_userId").val(_loginUserId);
	$(".add_return_repairId").val(row.repId);
	$("#addReturningDlg").dialog('open');
	$("#repairInfoDlg").dialog('close')
}

//执行添加复核
function doAddReturning() {
	var rowIndex = $('#repairDg').datagrid('getRowIndex',
		$('#repairDg').datagrid('getSelected'));
	var repId = $(".add_return_repairId").val();
	var userId = $(".add_return_userId").val();
	var addReturnResult = $("#addReturnResult").find("option:selected").text();
	var addReturnMark = $("#addReturnMark").val();
	showLoading();
	$.post("../insertRepairReturning.action", {
		retRepairId : repId,
		retUserId : _loginUserId,
		retResult : addReturnResult,
		rteRemark : addReturnMark,
		department : _loginDepartment,
		storefront : _loginStore
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, "error");
		} else {
			if (addReturnResult == '合格') {
				var repState = '已复核';
				$.post("../updateRepair.action", {
					repId : repId,
					repState : repState,
					repReturningRp : repState
				}, function(data) {
					$('#repairDg').datagrid('updateRow', {
						index : rowIndex,
						row : {
							repState : '已复核',
							repReturningRp : '已复核',
						}
					});
					queryRepair(1, 0);
					$("#addReturningDlg").dialog('close');
					myTips("添加复核成功！", "success");
				});
			} else {
				var repState = '复核不通过';
				$.post("../updateRepair.action", {
					repId : repId,
					repState : repState,
					repReturningRp : repState
				}, function(data) {
					$('#repairDg').datagrid('updateRow', {
						index : rowIndex,
						row : {
							repState : '复核不通过',
							repReturningRp : '复核不通过',
						}
					});
					queryRepair(1, 0);
					$("#addReturningDlg").dialog('close');
					myTips("添加复核成功！", "success");
				});
			}
		}
	});
}

//回访列表显示
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
					for (var i in row) {
						$("#readShowReturning" + i).text(row[i]);
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
		data = data.body;
		for (var i in data) {
			data[i].retTime = formatTime(data[i].retTime, 2);
		}
		$('#returningTable').datagrid("loadData", data);
	}, "json");
	$("#returningDlg").dialog('open');
}

//进展列表显示
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
						for (var i in row) {
							$("#readShowProgress" + i).text(row[i]);
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
		data = data.body;
		for (var i in data) {
			data[i].proTime = formatTime(data[i].proTime, 2);
		}
		$('#progressTable').datagrid("loadData", data);
	});
	$("#progressDlg").dialog('open');
}




/*******************************end********************************/