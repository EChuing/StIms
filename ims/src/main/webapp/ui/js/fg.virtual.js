$(function(){
	queryVirtual(_pageNum[0], 0);
	$("#virtualDataGrid").datagrid({
		// 表格行单击事件
		onClickRow : function(rowIndex, rowData) {
			_virtualIndex = rowIndex;
			var row = $('#virtualDataGrid').datagrid('getSelected');
			// 初始化跟进记录表
			// queryFollow(row.houseCoding, 1, 0);
			queryFollow(1,0, row.houseCoding);
		},
		onDblClickRow : function(rowIndex, rowData) {
			$('#readonlyTabs').tabs({
				plain : true,
				fit : true,
				border	: false,
				onSelect : function(title, index) {
					// 获得点击选项卡的列数，调用表格初始化
					initTable(title);
				}
			});
			$("#readonlyTabs").tabs("select", 0);
			$("#searchBillingDateFrom").val("");
			$("#searchBillingDateTo").val("");
			readonlyVirtualDlg();
		}
	});
	$('#financialDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			readonlyDataToDb("readonlyPaymentInfoTable","financialDg");
		}
	});
	for (var i in _taskType) {
		$("#repairTypeRp").append("<option value = '" + i + "'>" + _taskType[i] + "</option>");
	}
	for (var i in _eventApprovalType) {
		$('.eventType').append("<option value='" + _eventApprovalType[i] + "'>" + _eventApprovalType[i] + "</option>");
	}
	for (var i in _repHopeTime) {
		$(".repair_hope_select").append("<option value = '" + _repHopeTime[i] + "'>" + _repHopeTime[i] + "</option>");
	}
	if($('#readonlyTabs').tabs('exists','租客退房')){
		initTable('租客退房');
	}
	
	
});

function validate(type){
	if(type==0){
		doAddVirtual();
	}else if(type==1){
		doUpdateVirtual();
	}
}

//分页统计总条数
function getvirtualPageCount(page){
	var pageSize = 10;
	var addCity = '项目';
	var searchVirtualName = $("#searchVirtualName").val();
	var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
	var searchVirtualContact = $("#searchVirtualContact").val();
	var searchVirtualState = $("#searchVirtualState").val();

	$.post("../queryProject.action", {
		addCity : addCity,
		keyAdministrator : searchVirtualName,
		addDoorplateno : searchVirtualDoorplateno,
		keyNumber : searchVirtualContact,
		houseEntrust4sell:searchVirtualState,
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

/*查询项目*/
function queryVirtual(page, type){
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var addCity = '项目';
	var searchVirtualName = $("#searchVirtualName").val();
	var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
	var searchVirtualContact = $("#searchVirtualContact").val();
	var searchVirtualState = $("#searchVirtualState").val();
	
	$.post("../queryProject.action", {
		startNum : startNum,
		endNum : endNum,
		addCity : addCity,
		keyAdministrator : searchVirtualName,
		addDoorplateno : searchVirtualDoorplateno,
		keyNumber : searchVirtualContact,
		houseEntrust4sell:searchVirtualState,
	}, function(data) {
		if (data.code<0) {
			// sourcePage(0, 0, 0);
			$('#virtualDataGrid').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			// sourcePage(0, 0, 1);
			$('#financialDg').datagrid("loadData", []);
			// sourcePage(0, 0, 4);
			$('#followTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
			if(page==1){
				notCountPage(0, 0 ,"queryVirtual","virtual");
				notCountPage(0, 0 ,"queryFollow","follow");
			}else{
				notCountPage(page, 0 ,"queryVirtual","virtual");
			}
		} else {
			// if (page == 1 && type == 0) {
			// 	sourcePage(data.body[0].totalNum, page, 0);
				_virtualIndex = 0;
			// }
			if(data.body.length<endNum){
				notCountPage(page, 2 , "queryVirtual","virtual");
			}else{
				notCountPage(page, 1 , "queryVirtual","virtual");
			}
			for(var i in data.body){
				var addCity = data.body[i].addCity;
				if(addCity == '项目'){
					data.body[i].addCommunity = addCity;
				}
			}
			// queryFollow(data.body[0].houseCoding, 1, 0);
			queryFollow(1,0,data.body[0].houseCoding);
			$("#virtualDataGrid").datagrid("loadData", data.body);
			$("#virtualDataGrid").datagrid("selectRow", _virtualIndex);
		}
	}, "json");
}
/*分页操作*/
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 10);
		$("#virtualPage").remove();
		$("#virtualPageDiv")
				.append(
						"<div class='tcdPageCode' id='virtualPage' style='text-align:center;'></div>");
		$("#virtualPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0]=p;
					_virtualIndex = 0;
					queryVirtual(p, 1);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 10);
		$("#financialPage").remove();
		$("#financialPageDiv")
				.append(
						"<div class='tcdPageCode' id='financialPage' style='text-align:center;'></div>");
		$("#financialPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					var row = $('#virtualDataGrid').datagrid('getSelected');
					if(row){
						queryFinancial(row, p, 1);
					}else{
						row = $('#virtualDataGrid').datagrid('getData').rows[_virtualIndex];
						queryFinancial(row, p, 1);
					}
				}
			}
		});
	}
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 15);
		$("#eventPage").remove();
		$("#eventPageDiv") .append("<div class='tcdPageCode' id='eventPage' style='text-align:center;'></div>");
		$("#eventPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryEvent(1,0)
				}
			}
		});
	}
	if (type == 4) {
		pageNum = Math.ceil(totalNum / 10);
		$("#followPage").remove();
		$("#followPageDiv") .append("<div class='tcdPageCode' id='followPage' style='text-align:center;'></div>");
		$("#followPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					var row = $('#virtualDataGrid').datagrid('getSelected');
					if (row) {
						// queryFollow(row.houseCoding, p, 1);
						queryFollow(p,1,row.houseCoding);
					} else {
						row = $('#virtualDataGrid').datagrid('getData').rows[0];
						// queryFollow(row.houseCoding, p, 1);
						queryFollow(p,1,row.houseCoding);
					}
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
}
/*重置表单数据*/
function resetInput(){
	$("#virtualType").val("0");
	$("#addVirtualDlg input").val("");
	$("#initialAmount").val("0");
	$("#calibrationAmount").val("0");
	$("#virtualDoorplateno").val("");
}
/*打开录入项目窗口*/
function addVirtual(){
	$("#saveAdd").show();
	$("#saveUpdate").hide();
	$("#virtualType").attr("disabled", true);
	resetInput();
	$("#addVirtualDlg").dialog({
		title : '录入项目',
		top : getTop(305),
		left : getLeft(420),
		width : 420,
		height : 305,
		closed : true,
		cache : false,
		modal : true,
		onClose : function(){
			$('#addVirtualDlg [clear="clear"]').val('');
			$('#addVirtualDlg [clean="clean"]').html('');
			$('#addVirtualDlg [require]').css('border', '1px solid #a9a9a9');
			clearAttachment();
			resetInput();
		}
	});
	$("#virtualTypeDiv").hide();
	$("#addVirtualDlg").dialog("open");
}

/*添加项目到数据库*/
function doAddVirtual(){
	var virtualName = $("#virtualName").val();
	var virtualContact = $("#virtualContact").val();
	var virtualTel = $("#virtualTel").val();
	var virtualCity = '项目'
	var virtualDistrict = $("#virtualDistrict").val();
	var virtualZone = $("#virtualZone").val();
	var virtualRoad = $("#virtualRoad").val();
	var virtualCommunity = '项目'
	var virtualBuilding = $("#virtualBuilding").val();
	var virtualDoorplateno = $("#virtualDoorplateno").val();
	$.post("../AddingVirtual.action", {
		keyAdministrator 	: virtualName,
		keyNumber 			: virtualContact,
		houseEntrust4rent 	: virtualTel,
		houseEntrust4sell 	: '正常',
		addCity 			: virtualCity,
		addDistrict 		: virtualDistrict,
		addZone 			: virtualZone,
		addStreet 			: virtualRoad,
		addCommunity 		: virtualCommunity,
		addBuilding 		: virtualBuilding,
		addDoorplateno 		: virtualDoorplateno,
		userId 				: _loginUserId,
		storefront 			: _loginStore,
		department 			: _loginDepartment,
	}, function(data){
		if(data.code<0){
			myTips(data.msg, "error");
			return;
		}
		queryVirtual(_pageNum[0], 0);
		myTips("添加成功", "success");
		$("#addVirtualDlg").dialog('close');
	}, "json");
}
/*打开修改项目窗口*/
function updateVirtual(){
	$("#saveAdd").hide();
	$("#saveUpdate").show();
	$("#virtualType").attr("disabled", true);
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if(row){
		$("#addVirtualDlg").dialog({
			title : '修改项目',
			top : getTop(305),
			left : getLeft(420),
			width : 420,
			height : 305,
			closed : true,
			cache : false,
			modal : true,
			onClose : function(){
				$('#addVirtualDlg [clear="clear"]').val('');
				$('#addVirtualDlg [clean="clean"]').html('');
				$('#addVirtualDlg [require]').css('border', '1px solid #a9a9a9');
				clearAttachment();
				resetInput();
			}
		});
		$("#error").val("");
		$("#virtualType").val("项目");
		$("#virtualName").val(row.keyAdministrator);
		$("#virtualContact").val(row.keyNumber);
		$("#virtualTel").val(row.houseEntrust4rent);
		$("#houseCoding").val(row.houseCoding);
		$("#virtualCity").val(row.addCity);
		$("#virtualDistrict").val(row.addDistrict);
		$("#virtualZone").val(row.addZone);
		$("#virtualRoad").val(row.addStreet);
		$("#virtualCommunity").val(row.addCommunity);
		$("#virtualBuilding").val(row.addBuilding);
		$("#virtualDoorplateno").val(row.addDoorplateno);
		$("#outerVirtualRoom").val(row.outerVirtualRoom);
		$("#nonCostVirtualRoom").val(row.nonCostVirtualRoom);
		$("#virtualState").val(row.houseEntrust4sell);
		$("#virtualTypeDiv").show();
		$("#addVirtualDlg").dialog("open");
	}
}
/*将修改后的项目保存到数据库*/
function doUpdateVirtual(){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	var virtualName = $("#virtualName").val();
	var virtualContact = $("#virtualContact").val();
	var virtualTel = $("#virtualTel").val();
	var houseCoding = $("#houseCoding").val();
	var virtualCity = $("#virtualCity").val();
	var virtualDistrict = $("#virtualDistrict").val();
	var virtualZone = $("#virtualZone").val();
	var virtualRoad = $("#virtualRoad").val();
	var virtualCommunity = $("#virtualCommunity").val();
	var virtualBuilding = $("#virtualBuilding").val();
	var virtualDoorplateno = $("#virtualDoorplateno").val();
	var virtualState = $("#virtualState").val();;
	$.post("../updateVirtual.action", {
		keyAdministrator : virtualName,
		keyNumber : virtualContact,
		houseEntrust4rent : virtualTel,
		houseEntrust4sell : virtualState,
		houseCoding : houseCoding,
		addCity : virtualCity,
		addDistrict : virtualDistrict,
		addZone : virtualZone,
		addStreet : virtualRoad,
		addCommunity : virtualCommunity,
		addBuilding : virtualBuilding,
		addDoorplateno : virtualDoorplateno,
		userId : _loginUserId,
		storefront : _loginStore,
		department : _loginDepartment,
		houseId : row.houseCoding
	}, function(data){
		if(data.code < 0){
			myTips(data.msg, "error");
			return;
		}
		queryVirtual(_pageNum[0], 0);
		myTips("修改成功", "success");
		$("#addVirtualDlg").dialog('close');
	}, "json");
}
/*****************************************项目收支开始*************************************/
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
function query(){
	queryVirtual(_pageNum[0], 0);
	$('#oneWeek').removeClass("choose-cur");
	$('#oneMonth').removeClass("choose-cur");
	$('#threeMonths').removeClass("choose-cur");
}
//收支记录表导入信息
function queryFinancial(row, page, type) {
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
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
			sourcePage(0, 0, 1);
			$('#financialDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 1);
			}
			$("#financialDg").datagrid("loadData", data);
		}
	}, "json");
}
/*
项目收支总额统计，先留着，以后可能还会用到
function reload(){
	$.post("../statisticsAllVirtualBalance.action", function(data) {
		if (data.code<0) {
			myTips(data.msg, "error");
			return;
		} else {
			myTips("统计成功", "success");
			query();
		}
	});
}*/
/*****************************************项目收支结束*************************************/

//项目详细信息
function readonlyVirtualDlg(){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	$('#readonlyVirtualDlg').dialog({
		title : '项目详细信息',
		top : getTop(450),
		left : getLeft(920),
		width : 920,
		height : 450,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function(){
			$("#readonlyTabs").tabs("select",0);
		},
		onClose : function() {
			$('.xwtable1 span').text('');
			$("#repairInfoTable").datagrid("loadData", []);
			$("#eventTable").datagrid("loadData", []);
		},
	});
	var addCity = row.addCity;
	if(addCity == '项目'){
		row.addCommunity = addCity;
	}
	for(var i in row){
		$('#readOnlyVirtual'+i).html(row[i]);
	}
	$('#readonlyVirtualDlg').dialog("open");
}
//初始化tab
function initTable(title){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if(title=='项目详细'){
		for(var i in row){
			$('#readOnlyVirtual'+i).html(row[i]);
		}
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
	if(title=='项目收支'){
		queryFinancial(row,1,0);
	}
	
}

//分页统计总条数
function getfollowPageCount(page){
	var pageSize = 10;
	var row = $('#virtualDataGrid').datagrid("getSelected");
	if(row==null){
		var countJson = {
			totalNum:0,
		};
		getCountData(0,countJson,pageSize,page,"follow",0);
		return;
	}
	$.post("../queryAllHousingFollow.action", {
		jhfHouseId : row.houseCoding,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"follow",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"follow",0);
		}
	});
}

/**
 * 查询项目的跟进记录
 */
// function queryFollow(rowId, page, type) {
function queryFollow(page, type, rowId) {//分页参数规定使用
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	if ($('#followTable').hasClass('datagrid-f')) {

	} else {
		$('#followTable').datagrid({
			columns : [ [ {
				field : 'jhfFollowTime',
				title : '跟进时间',
				width : '20%',
				align : 'center'
			}, {
				field : 'jhfUserName',
				title : '跟进人',
				width : '10%',
				align : 'center'
			}, {
				field : 'jhfPaymentWay',
				title : '跟进类型',
				width : '10%',
				align : 'center'
			}, {
				field : 'jhfFollowRemark',
				title : '跟进内容',
				width : '60%',
				align : 'center'
			} ] ],
			width : '100%',
			height : '277px',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			// 表格行双击事件
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#followTable').datagrid('getSelected');
				downFollowInfo(row);
			}
		});
	}
	//分页重复调用的参数
	var selectRow = $('#virtualDataGrid').datagrid("getSelected");
	if(null==rowId){
		if(selectRow){
			rowId=selectRow.houseCoding;
		}else{
			return;
		}
	}

	// 跟进记录表取数据
	$.post("../queryAllHousingFollow.action", {
		jhfHouseId : rowId,
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data.code<0) {
			// sourcePage(0, 0, 4);
			$('#followTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryFollow","follow");
			}else{
				notCountPage(page, 0 ,"queryFollow","follow");
			}
		} else {
			data=data.body;	
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 4);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryFollow","follow");
			}else{
				notCountPage(page, 1 , "queryFollow","follow");
			}
			$("#followTable").datagrid("loadData", data);
		}
	}, "json");
}
/**
 * 列表下方跟进的详细界面
 */
function downFollowInfo(row){
	$('#downFollowInfo').dialog({
		title : '跟进详细信息',
		top : getTop(200),
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
		if(i=='jhfFollowRemark'){
			$('#readDownFollow'+i).html("&nbsp;&nbsp;&nbsp;&nbsp;"+row[i].replace(/\n/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;"));
		}else{
			$('#readDownFollow'+i).html(row[i]);
		}
		
	}
	$('#downFollowInfo').dialog('open');
}


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
	if(type == 1){
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