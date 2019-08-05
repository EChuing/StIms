$(function(){
	queryTrusteeship(_pageNum[0], 0, 0);
	queryDept();
	$('#trusteeshipDg').datagrid({
		// 表格行单击事件
		onClickRow : function(rowIndex, rowData) {
			// 初始化跟进记录表
			// queryFollow(rowData, 1, 0);
			queryFollow(1, 0, rowData);//分页参数规定使用
		},
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			_indexNum[0] = rowIndex;
			_updateHouseInfo = rowData;
			readonlyTruDlg();
		}
	});
	
	$('#renterPaymentTable').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			updateInstallment(0);
		}
	});
	$('#landlordPaymentTable').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			updateInstallment(1);
		}
	});
	$("#renewalContinueTable").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			updateRenterRenewal();
		}
	});
	$("#landlordContinueTable").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			updateLandlordRenewal();
		}
	});
	//城区
	for (var i in _loginCompanyRentDistrict) {
		$("#searchDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	//朝向
	for (var i = 0; i < _direction.length; i++) {
		$("#updateRhrHouseDirection").append("<option value = '" + _direction[i] + "'>" + _direction[i] + "</option>");
		$("#updateThsHouseDirection").append("<option value = '" + _direction[i] + "'>" + _direction[i] + "</option>");
	}
	//户型
	for (var i = 0; i < _sectionType.length; i++) {
		$("#updateRhrSectionType").append("<option value = '" + _sectionType[i] + "'>" + _sectionType[i] + "</option>");
		$("#updateThsSectionType").append("<option value = '" + _sectionType[i] + "'>" + _sectionType[i] + "</option>");
	}
	//用途
	for (var i = 0; i < _househrState.length; i++) {
		$("#updateRhrHouseOwner").append("<option value = '" +  _househrState[i] + "'>" + _househrState[i]+ "</option>");
		$("#updateThsHouseOwner").append("<option value = '" +  _househrState[i] + "'>" + _househrState[i]+ "</option>");
	}
	//银行名称
	for (var i = 0; i < _bankType.length; i++) {
		$("#updateThsBankType").append("<option value = '" + _bankType[i] + "'>" + _bankType[i] + "</option>");
	}
	//缴费方式
	for (var i = 0; i < _hrPaymentType.length; i++) {
		$(".jrlPaymentMethod").append( "<option value = '" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
		$(".jrrPaymentMethod").append( "<option value = '" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
		$(".jrrManagePayment").append( "<option value = '" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
		$(".jrrServerPayment").append( "<option value = '" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
	}
	//合同性质
	for (var i = 0; i < _contractType.length; i++) {
		$(".jrlContractType").append("<option value = '" + _contractType[i] + "'>" + _contractType[i]+ "</option>");
		$(".jrrContractType").append("<option value = '" + _contractType[i] + "'>" + _contractType[i]+ "</option>");
	}
})

var _updateHouseInfo=[];

var _updateWeg={
		incomingWater:"",
		newWaterReadings:"",
		incomingElectric:"",
		latestElectricalReadings:"",
		incomingGas:"",
		latestGasReading:"",
		
		incomingHotWater:"",
		latestHotWaterReading:"",
		incomingHotAir:"",
		latestHotAirReading:"",
		
};

//分页统计总条数
function gettrusteeshipPageCount(page){
	var pageSize = 15;
	var qDistrict = $("#searchDistrict").find("option:selected").text();
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var hsLeaseState = $("#searchLeaseState").val();
	var hsState = $("#searchState").val();
	var hsDownDeposit = $("#searchHsDownDeposit").val();
	var hsAutoSendMsg = $("#searchHsAutoSendMsg").val();

	// 房源信息表导入数据
	$.post("../selectNotRenting.action", {
		addDistrict : qDistrict,
		addCommunity : qCommunity,
		addBuilding : qBuilding,
		addDoorplateno : qDoorplateno,
		hsLeaseState : hsLeaseState,
		hsState : hsState,
		hsDownDeposit : hsDownDeposit,
		hsAutoSendMsg : hsAutoSendMsg,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"trusteeship",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"trusteeship",0);
		}
	});
}

//托管房源查询
function queryTrusteeship(page, type, num) {
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var qDistrict = $("#searchDistrict").find("option:selected").text();
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var hsLeaseState = $("#searchLeaseState").val();
	var hsState = $("#searchState").val();
	var hsDownDeposit = $("#searchHsDownDeposit").val();
	var hsAutoSendMsg = $("#searchHsAutoSendMsg").val();

	// 房源信息表导入数据
	$.post("../selectNotRenting.action", {
		startNum : startNum,
		endNum : endNum,
		addDistrict : qDistrict,
		addCommunity : qCommunity,
		addBuilding : qBuilding,
		addDoorplateno : qDoorplateno,
		hsLeaseState : hsLeaseState,
		hsState : hsState,
		hsDownDeposit : hsDownDeposit,
		hsAutoSendMsg : hsAutoSendMsg,
	}, function(data) {
		if (data.code<0) {
			// sourcePage(0, 0, 0);
			$('#trusteeshipDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			// sourcePage(0, 0, 1);
			$('#followInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryTrusteeship","trusteeship");
			}else{
				notCountPage(page, 0 ,"queryTrusteeship","trusteeship");
			}
			return;
		}
		data=data.body;
		// if (page == 1 && type == 0) {
		// 	sourcePage(data[0].totalNum, page, 0);
		// }
		if(data.length<endNum){
			notCountPage(page, 2 , "queryTrusteeship","trusteeship");
		}else{
			notCountPage(page, 1 , "queryTrusteeship","trusteeship");
		}

		for (var i in data) {
			for ( var j in data[i]) {
				if (data[i][j] == null) {
					data[i][j] = '';
				}
			}
			data[i].totalPage = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
		}
		$("#trusteeshipDg").datagrid("loadData", data);
		$('#trusteeshipDg').datagrid("selectRow",_indexNum[0]);

		var selectRow = $('#trusteeshipDg').datagrid("getSelected");
		// queryFollow(selectRow, 1, 0);
		queryFollow(1, 0, selectRow);
		_updateHouseInfo = $('#trusteeshipDg').datagrid('getSelected');
	});

}

//分页统计总条数
function getfollowPageCount(page){
	var pageSize = 4;
	var row = $('#trusteeshipDg').datagrid("getSelected");
	$.post("../queryAllHousingFollow.action", {
		jhfHouse4storeId : row.hsId,
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

//房源列表下的跟进记录导入数据
// function queryFollow(row, page, type) {
function queryFollow(page, type, row) {//分页参数规定使用
	var startNum = (parseInt(page) - 1) * 4;
	var endNum = 4;
	$('#followInfoTable').datagrid({
		columns : [ [ {
			field : 'jhfFollowTime',
			title : '跟进时间',
			width : '20%',
			align : 'center'
		}, {
			field : 'jhfUserName',
			title : '跟进人',
			width : '15%',
			align : 'center'
		}, {
			field : 'jhfPaymentWay',
			title : '跟进类型',
			width : '10%',
			align : 'center'
		}, {
			field : 'jhfFollowBelong',
			title : '跟进归属',
			width : '10%',
			align : 'center'
		}, {
			field : 'jhfFollowRemark',
			title : '跟进内容',
			width : '45%',
			align : 'center'
		}] ],
		width : '100%',
		height : '127px',
		singleSelect : true,
		autoRowHeight : false,
		pageSize : 10,
		scrollbarSize : 0,
		showPageList : false,
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			var row = $('#followInfoTable').datagrid('getSelected');
			downFollowInfo(row);
		}
	});
	var jhfHouse4storeId = "";
	if(null==row){
		var selectRow = $('#trusteeshipDg').datagrid("getSelected");
		if(selectRow){
			jhfHouse4storeId = selectRow.hsId;
		}else{
			return;
		}
	}else {
		jhfHouse4storeId = row.hsId;
	}
	// 跟进记录表取数据
	$.post("../queryAllHousingFollow.action", {
		jhfHouse4storeId : jhfHouse4storeId,
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data.code<0) {
			// sourcePage(0, 0, 1);
			$('#followInfoTable').datagrid({
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
			// 	sourcePage(data[0].totalNum, page, 1);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryFollow","follow");
			}else{
				notCountPage(page, 1 , "queryFollow","follow");
			}
			$("#followInfoTable").datagrid("loadData", data);
		}
	}, "json");
}
//列表下方跟进的详细界面
function downFollowInfo(row) {
	$('#downFollowInfo').dialog({
		title : '跟进详细信息',
		top : getTop(250),
		left : getLeft(450),
		width : 450,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#downFollowInfo span').text('');
		},
	});
	for (var i in row) {
		if (i == 'jhfFollowRemark') {
			$('#readDownFollow' + i).html("&nbsp;&nbsp;&nbsp;&nbsp;"+ row[i].replace(/\n/g,"<br>&nbsp;&nbsp;&nbsp;&nbsp;"));
		} else {
			$('#readDownFollow' + i).html(row[i]);
		}
	}
	$('#downFollowInfo').dialog('open');
}

//切换选项卡操作
function initTable(title) {
	var row = $('#trusteeshipDg').datagrid('getSelected');
	if(title == '已租信息'){
		rentedDataLoading();
	}
	if(title == '未租信息'){
		nonRentedInformationProcessing();
	}
	if(title == '租客账单'){
		queryRenterPayment(1,0);
	}
	if(title == '业主账单'){
		if(row.hsPrimitiveMother !=null && row.hsPrimitiveMother !=''&& row.hsPrimitiveMother !=0){
			$('#landlordPaymentTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '无相关的合约信息'
			});
		}else{
			queryLandlordPayment(1,0);
		}
	}
	if(title == '合约记录'){
		if(row.hrId != null && row.hrId != ''){
			$('#renewalContinueDiv').show();
			renterContract(row.hrId);
		}else{
			$('#renewalContinueDiv').hide();
		}
		if(row.hsPrimitiveMother !=null && row.hsPrimitiveMother !=''&& row.hsPrimitiveMother !=0){
			$('#landlordContinueTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '无相关的合约信息'
			});
		}else{
			landlordContract(row.hsId);
		}
	}
	if(title == '客户信息'){
		$('#customerTabs').tabs({
			plain : true,
			fit : true,
			border : false,
			onSelect : function(title, index) {
				// 获得点击选项卡的列数，调用表格初始化
				customerInformationTabs(title, row);
			}
		});
		if(row.renterPopulationId != null && row.renterPopulationId != ''){
			if($('#customerTabs').tabs('getTab', '租客信息')!=null){
				$('#customerTabs').tabs('getTab', '租客信息').panel('options').tab.show();
				$("#customerTabs").tabs("select", '租客信息');
			}

			selectRenterInfo(row, 0);
		}else{
			if($('#customerTabs').tabs('getTab', '租客信息')!=null){
				$('#customerTabs').tabs('getTab', '租客信息').panel('options').tab.hide();
			}
			if($('#customerTabs').tabs('getTab', '业主信息')!=null){
				$("#customerTabs").tabs("select", '业主信息');
			}
			selectRenterInfo(row, 1);
		}
	}
	if(title == '能源卡号'){
		//能源卡号
		$('#energyCardInfoTable').datagrid({
			columns : [ [ {
				field : 'jdcnCardName',
				title : '类型',
				width : '15%',
				align : 'center'
			}, {
				field : 'jdcnCardNumber',
				title : '用户编号',
				width : '20%',
				align : 'center'
			}, {
				field : 'jdcnMeterNumber',
				title : '表号',
				width : '20%',
				align : 'center'
			}, {
				field : 'jdcnBelongingToPeople',
				title : '归属人',
				width : '15%',
				align : 'center'
			}, {
				field : 'jdcnIdCard',
				title : '证件号码',
				width : '15%',
				align : 'center'
			}, {
				field : 'jdcnTelephone',
				title : '电话',
				width : '15%',
				align : 'center'
			} ] ],
			width : '100%',
			height: '277px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowdata) {
				updateCard();
			},
		});
		queryCard(row);
	}
}
//客户信息选项卡
function customerInformationTabs(title, row){
	if(title == '租客信息'){
		selectRenterInfo(row, 0);
	}
	if(title == '业主信息'){
		selectRenterInfo(row, 1);
	}
}
function energy(){
	//控制非选中能源项隐藏
	var chargingPlan=parent._chargingPlan;
	for(var i in chargingPlan){
		if(!chargingPlan[i]["state"]){
			$("."+i).hide();
		}
	}
}

//详细窗口
function readonlyTruDlg(){
	$('#readonlyTruDlg').dialog({
		title : '综合信息修改',
		top : getTop(400),
		left : getLeft(1000),
		width : 980,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onOpen : function() {
			$('#readonlyTabs').tabs({
				fit : true,
				border : false,
				tabWidth : 82,
				headerWidth : 82,
				tabPosition : 'left',
				onSelect : function(title, index) {
					// 获得点击选项卡的列数，调用表格初始化
					initTable(title);
				}
			});
			if(_updateHouseInfo.hrId==null||_updateHouseInfo.hrId==''){
				if($('#readonlyTabs').tabs('getTab', '已租信息')!=null){
					$('#readonlyTabs').tabs('getTab', '已租信息').panel('options').tab.hide();
				}
				if($('#readonlyTabs').tabs('getTab', '租客账单')!=null) {
					$('#readonlyTabs').tabs('getTab', '租客账单').panel('options').tab.hide();
				}
			}else{
				if($('#readonlyTabs').tabs('getTab', '已租信息')!=null) {
					$('#readonlyTabs').tabs('getTab', '已租信息').panel('options').tab.show();
				}
				if($('#readonlyTabs').tabs('getTab', '租客账单')!=null) {
					$('#readonlyTabs').tabs('getTab', '租客账单').panel('options').tab.show();
				}
			}
		},
		onClose : function() {
			$("#readonlyTruDlg input").val('');
			$("#readonlyTruDlg select").val('');
			$("#readonlyTruDlg textarea").val('');
			$('#renewalContinueDiv').show();
		},
	});
	$('#readonlyTruDlg').dialog('open');
	initExistsTable();
	energy();
}
function initExistsTable(){
	if($('#readonlyTabs').tabs('exists','已租信息') && _updateHouseInfo.hrId!=null && _updateHouseInfo.hrId!=''){
		$("#readonlyTabs").tabs("select", '已租信息');
		initTable('已租信息');
	}else if($('#readonlyTabs').tabs('exists','未租信息')){
		$("#readonlyTabs").tabs("select", '未租信息');
		initTable('未租信息');
	}else if($('#readonlyTabs').tabs('exists','租客账单') && _updateHouseInfo.hrId!=null && _updateHouseInfo.hrId!=''){
		$("#readonlyTabs").tabs("select", '租客账单');
		initTable('租客账单');
	}else if($('#readonlyTabs').tabs('exists','业主账单')){
		$("#readonlyTabs").tabs("select", '业主账单');
		initTable('业主账单');
	}else if($('#readonlyTabs').tabs('exists','合约记录')){
		$("#readonlyTabs").tabs("select", '合约记录');
		initTable('合约记录');
	}else if($('#readonlyTabs').tabs('exists','客户信息')){
		$("#readonlyTabs").tabs("select", '客户信息');
		initTable('客户信息');
	}else if($('#readonlyTabs').tabs('exists','能源卡号')){
		$("#readonlyTabs").tabs("select", '能源卡号');
		initTable('能源卡号');
	}
}
/************************************抄表读数修改处理***************************************/
//抄表读数修改窗口
function readingWindow(){
	$('#readingWindowDlg').dialog({
		title : '抄表读数修改',
		top : getTop(180),
		left : getLeft(400),
		width : 400,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateThsWaterVolLast').val('');
			$("#updateThsElectritVolLast").val('');
			$("#updateThsGasVolLast").val('');
			$("#updateThsWaterVolNew").val('');
			$("#updateThsElectritVolNew").val('');
			$("#updateThsGasVolNew").val('');
			$("#updateThsHotWaterVolLast").val('');
			$("#updateThsHotWaterVolNew").val('');
			$("#updateThsHotAirVolLast").val('');
			$("#updateThsHotAirVolNew").val('');
			
		},
	});
	
/*	//加入更新
	$('#updateThsWaterVolLast').val(incomingWater);
	$('#updateThsElectritVolLast').val(incomingElectric);
	$('#updateThsGasVolLast').val(incomingGas);
	$('#updateThsWaterVolNew').val(newWaterReadings);
	$('#updateThsElectritVolNew').val(latestElectricalReadings);
	$('#updateThsGasVolNew').val(latestGasReading);*/
	
	$('#readingWindowDlg').dialog('open');
	var meterReadingRecord = eval('(' + _updateHouseInfo.hsMeterReadingRecord.getRealJsonStr() + ')');//读数记录
	$("#updateThsWaterVolLast").val(meterReadingRecord.water.lastReading);//上次水读数
	$("#updateThsElectritVolLast").val(meterReadingRecord.electrit.lastReading);//上次电读数
	$("#updateThsGasVolLast").val(meterReadingRecord.gas.lastReading);//上次气读数
	
	$("#updateThsHotWaterVolLast").val(meterReadingRecord.hotwater.lastReading);//上次气读数
	$("#updateThsHotAirVolLast").val(meterReadingRecord.hotair.lastReading);//上次气读数
	
	_updateWeg.incomingWater=meterReadingRecord.water.lastReading;
	_updateWeg.incomingElectric=meterReadingRecord.electrit.lastReading;
	_updateWeg.incomingGas=meterReadingRecord.gas.lastReading;
	_updateWeg.incomingHotWater=meterReadingRecord.hotwater.lastReading;
	_updateWeg.incomingHotAir=meterReadingRecord.hotair.lastReading;
	
	if(meterReadingRecord.water.thisReading.length!=0){
		$("#updateThsWaterVolNew").val(meterReadingRecord.water.thisReading[meterReadingRecord.water.thisReading.length-1]);//最新水读数
		_updateWeg.newWaterReadings= meterReadingRecord.water.thisReading[meterReadingRecord.water.thisReading.length-1];
	}else{
		$("#updateThsWaterVolNew").val(meterReadingRecord.water.lastReading);//上次水读数
		_updateWeg.newWaterReadings= meterReadingRecord.water.lastReading;
	}
	if(meterReadingRecord.electrit.thisReading.length!=0){
		$("#updateThsElectritVolNew").val(meterReadingRecord.electrit.thisReading[meterReadingRecord.electrit.thisReading.length-1]);//最新电读数
		_updateWeg.latestElectricalReadings= meterReadingRecord.electrit.thisReading[meterReadingRecord.electrit.thisReading.length-1];
	}else{
		$("#updateThsElectritVolNew").val(meterReadingRecord.electrit.lastReading);//上次电读数
		_updateWeg.latestElectricalReadings= meterReadingRecord.electrit.lastReading;
	}
	if(meterReadingRecord.gas.thisReading.length!=0){
		$("#updateThsGasVolNew").val(meterReadingRecord.gas.thisReading[meterReadingRecord.gas.thisReading.length-1]);//最新气读数
		_updateWeg.latestGasReading= meterReadingRecord.gas.thisReading[meterReadingRecord.gas.thisReading.length-1];
	}else{
		$("#updateThsGasVolNew").val(meterReadingRecord.gas.lastReading);//上次气读数
		_updateWeg.latestGasReading= meterReadingRecord.gas.lastReading;
	}
	
	if(meterReadingRecord.hotwater.thisReading.length!=0){
		$("#updateThsHotWaterVolNew").val(meterReadingRecord.hotwater.thisReading[meterReadingRecord.hotwater.thisReading.length-1]);//最新热水读数
		_updateWeg.latestHotWaterReading= meterReadingRecord.hotwater.thisReading[meterReadingRecord.hotwater.thisReading.length-1];
	}else{
		$("#updateThsHotWaterVolNew").val(meterReadingRecord.hotwater.lastReading);//上次热水读数
		_updateWeg.latestHotWaterReading= meterReadingRecord.hotwater.lastReading;
	}
	
	if(meterReadingRecord.hotair.thisReading.length!=0){
		$("#updateThsHotAirVolNew").val(meterReadingRecord.hotair.thisReading[meterReadingRecord.hotair.thisReading.length-1]);//最新暖气读数
		_updateWeg.latestHotAirReading= meterReadingRecord.hotair.thisReading[meterReadingRecord.hotair.thisReading.length-1];
	}else{
		$("#updateThsHotAirVolNew").val(meterReadingRecord.hotair.lastReading);//上次气读数
		_updateWeg.latestHotAirReading= meterReadingRecord.hotair.lastReading;
	}
	energy();
	
}
//检测抄表读数正确性
function doCheckUpPower(){
	var incomingWater = $("#updateThsWaterVolLast").val();//上次水读数
	var incomingElectric = $("#updateThsElectritVolLast").val();//上次电读数
	var incomingGas = $("#updateThsGasVolLast").val();//上次气读数
	
	var incomingHotWater = $("#updateThsHotWaterVolLast").val();//上次热水读数
	var incomingHotAir = $("#updateThsHotAirVolLast").val();//上次暖气读数
	
	
	
	var newWaterReadings = $("#updateThsWaterVolNew").val();//最新水读数
	var latestElectricalReadings = $("#updateThsElectritVolNew").val();//最新水读数
	var latestGasReading = $("#updateThsGasVolNew").val();//最新水读数
	
	var latestHotWaterReading = $("#updateThsHotWaterVolNew").val();//最新水读数
	var latestHotAirReading = $("#updateThsHotAirVolNew").val();//最新水读数
	
	var confirm="";
	if(accSub(incomingWater,newWaterReadings)>0){
		confirm +="水表最新读数不能小于上次结清读数</br>";
	}
	if(accSub(incomingElectric,latestElectricalReadings)>0){
		confirm +="电表最新读数不能小于上次结清读数</br>";
	}
	if(accSub(incomingGas,latestGasReading)>0){
		confirm +="气表最新读数不能小于上次结清读数</br>";
	}
	
	if(accSub(incomingHotWater,latestHotWaterReading)>0){
		confirm +="热水表最新读数不能小于上次结清读数</br>";
	}
	if(accSub(incomingHotAir,latestHotAirReading)>0){
		confirm +="暖气表最新读数不能小于上次结清读数</br>";
	}
	
	
	if(confirm==""){
		doUpdatePower();
	}else{
		$.messager.confirm("操作提示", confirm+"确定继续保存吗？", function(data) {
			if(data){
				doUpdatePower();
			}
		});
	}
}
//修改抄表读数
function doUpdatePower(){
	var hrId = _updateHouseInfo.hrId;
	var hsId = _updateHouseInfo.hsId;
	var jhfHouseId = $("#updateThsHouseId").val();
	var incomingWater = $("#updateThsWaterVolLast").val();//上次水读数
	var incomingElectric = $("#updateThsElectritVolLast").val();//上次电读数
	var incomingGas = $("#updateThsGasVolLast").val();//上次气读数	
	
	var incomingHotWater = $("#updateThsHotWaterVolLast").val();//上次热水读数	
	var incomingHotAir = $("#updateThsHotAirVolLast").val();//上次暖气读数	
	
	var newWaterReadings = $("#updateThsWaterVolNew").val();//最新水读数
	var latestElectricalReadings = $("#updateThsElectritVolNew").val();//最新水读数
	var latestGasReading = $("#updateThsGasVolNew").val();//最新水读数
	
	var latestHotWaterReading = $("#updateThsHotWaterVolNew").val();//最新热水读数
	var latestHotAirReading = $("#updateThsHotAirVolNew").val();//最新暖气读数
	
	
	var jhfFollowRemark = "" ;
	if(accSub(_updateWeg.incomingWater,incomingWater)){
		jhfFollowRemark	+= "上次结清水表读数："+_updateWeg.incomingWater+" 改为 → "+incomingWater+";";
	}
	if(accSub(_updateWeg.newWaterReadings,newWaterReadings)){
		jhfFollowRemark	+= "最新抄录水表读数："+_updateWeg.newWaterReadings+" 改为 → "+newWaterReadings+";";
	}
	if(accSub(_updateWeg.incomingElectric,incomingElectric)){
		jhfFollowRemark	+= "上次结清电表读数："+_updateWeg.incomingElectric+" 改为 → "+incomingElectric+";";
	}
	if(accSub(_updateWeg.latestElectricalReadings,latestElectricalReadings)){
		jhfFollowRemark	+= "最新抄录电表读数："+_updateWeg.latestElectricalReadings+" 改为 → "+latestElectricalReadings+";";
	}
	if(accSub(_updateWeg.incomingGas,incomingGas)){
		jhfFollowRemark	+= "上次结清气表读数："+_updateWeg.incomingGas+" 改为 → "+incomingGas+";";
	}
	if(accSub(_updateWeg.latestGasReading,latestGasReading)){
		jhfFollowRemark	+= "最新抄录气表读数："+_updateWeg.latestGasReading+" 改为 → "+latestGasReading+";";
	}
	
	if(accSub(_updateWeg.incomingHotWater,incomingHotWater)){
		jhfFollowRemark	+= "上次结清热水表读数："+_updateWeg.incomingHotWater+" 改为 → "+incomingHotWater+";";
	}
	if(accSub(_updateWeg.latestHotWaterReading,latestHotWaterReading)){
		jhfFollowRemark	+= "最新抄录热水表读数："+_updateWeg.latestHotWaterReading+" 改为 → "+latestHotWaterReading+";";
	}
	if(accSub(_updateWeg.incomingGas,incomingHotAir)){
		jhfFollowRemark	+= "上次结清暖气表读数："+_updateWeg.incomingHotAir+" 改为 → "+incomingHotAir+";";
	}
	if(accSub(_updateWeg.latestHotAirReading,latestHotAirReading)){
		jhfFollowRemark	+= "最新抄录暖气表读数："+_updateWeg.latestHotAirReading+" 改为 → "+latestHotAirReading+";";
	}
	
	$('.do_overDiv').show();
	$.post("../upWaterElectricalModification.action", {
		hsId 						: hsId,
		incomingWater 				: incomingWater,
		incomingElectric 			: incomingElectric,
		incomingGas 				: incomingGas,
		incomingHotWater  		    : incomingHotWater,
		incomingHotAir				: incomingHotAir,
		newWaterReadings			: newWaterReadings,
		latestElectricalReadings	: latestElectricalReadings,
		latestGasReading			: latestGasReading,
		
		latestHotWaterReading		: latestHotWaterReading,
		latestHotAirReading			: latestHotAirReading
	}, function(data) {
		if (data.code<0) {
			myTips(data.msg, "error");
			$('.do_overDiv').hide();
			return;
		}
		if(jhfFollowRemark==""){
			$('.do_overDiv').hide();
			
			myTips("修改成功!", "success");
			//重新查询列表
			queryTrusteeship(_pageNum[0], 0, 0);
			$('#readingWindowDlg').dialog('close')
		}else{
			jhfFollowRemark = "综合修改，修改抄表读数-"+jhfFollowRemark ;
			$.post("../insertHousingFollow.action", {
				jhfDepartment			: _loginDepartment,
				jhfStorefront			: _loginStore,
				jhfHouse4rentId 		: hrId,
				jhfHouse4storeId 		: hsId,
				jhfHouseId				: jhfHouseId,
				jhfFollowRemark 		: jhfFollowRemark,
				jhfFollowResult 		: '跟进成功',
				jhfPaymentWay 			: '系统跟进',
				jhfUserId 				: _loginUserId
			},function(){
				$('.do_overDiv').hide();
				
				myTips("修改成功!", "success");
				queryTrusteeship(_pageNum[0], 0, 0);
				$('#readingWindowDlg').dialog('close')
			});
		}
	});
}
/*******************************抄表读数end*************************************/

/****************************能源卡号处理*******************************/
//能源卡号
var addAddressCard, landNameCard, landIdCardCard, landTelCard
function queryCard() {
	var row = $('#trusteeshipDg').datagrid('getSelected');
	addAddressCard = ''+row.addDistrict+row.addCommunity+row.addBuilding+row.addDoorplateno;
	landNameCard = row.laName;
	landIdCardCard = row.laIdcard;
	landTelCard = row.laTelephone;
	$.post("../selectDailyCardNumber.action", {
		jdcnHouse4storeId  :  row.hsId,
	}, function(data) {
		if (data < 0 || data == '' || data.length == 0) {
			$('#energyCardInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
			return;
		}
		for (var i in data) {
			for(var j in data[i]){
				if(data[i][j]==null){
					data[i][j]='';
				}
			}
			data[i].addCommunity = data[i].addDistrict + " " + data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
		}
		$("#energyCardInfoTable").datagrid("loadData", data);
	});
}
//能源卡号添加窗口
function addCard(){
	$("#addCardDlg").dialog({
		title : '添加卡号',
		top : getTop(340),
		left : getLeft(500),
		width : 500,
		height : 380,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addCardDlg [clear="clear"]').val('');
			$('#addCardDlg [clean="clean"]').html('');
			$('#addCardDlg [require="require"]').css('border', '1px solid #a9a9a9');
			clearAttachment();
			clearCard();
		}
	});
	$("#addCardButton").show();
	$("#updateCardButton").hide();
	$("#landNameDiv").show();
	$("#landIdCardDiv").show();
	$("#landTelDiv").show();
	$("#addCardDlg").dialog('open');
	$('#addAddress').val(addAddressCard);
	$('#landName').val(landNameCard);
	$('#landIdCard').val(landIdCardCard);
	$('#landTel').val(landTelCard);
}
function clearCard(){
	$('#addCardDlg input').val('');
	$('#errorMsg').html('');
}
//添加能源卡号
function doAddCard(){
	var row = $('#trusteeshipDg').datagrid('getSelected');
	var addHouseStoreId = row.hsId;
	var cardName = $('#cardName').val();
	var cardNum = $('#cardNum').val();
	var cardPeople = $('#cardPeople').val();
	var cardPeopleId = $('#cardPeopleId').val();
	var cardBankName = $('#cardBankName').val();
	var cardBank = $('#cardBank').val();
	var cardTel = $('#cardTel').val();
	var cardRemark = $('#cardRemark').val();
	var jdcnMeterNumber = $('#jdcnMeterNumber').val();
	var jhfHouseId=$('#updateRhsHouseId').val();
	
	$.post("../insertDailyCardNumber.action", {
		jdcnHouse4storeId 		: addHouseStoreId,
		jdcnCardName 			: cardName,
		jdcnCardNumber 			: cardNum,
		jdcnBelongingToPeople 	: cardPeople,
		jdcnIdCard				: cardPeopleId,
		jdcnBankName			: cardBankName,
		jdcnBankCard 			: cardBank,
		jdcnTelephone 			: cardTel,
		jdcnRemarks 			: cardRemark,
		jdcnMeterNumber			: jdcnMeterNumber,
		jhfHouseId              : jhfHouseId,
	}, function(data) {
		if (data < 0 || data == '') {
			myTips("添加失败", "error");
			return;
		}
		myTips("添加成功", "success");
        $('#cardName').val('');
        $('#cardNum').val('');
        $('#jdcnMeterNumber').val('');
		queryTrusteeship(_pageNum[0], 0, 0);
		queryCard(row);
		//$('#addCardDlg').dialog('close')
	});
}
//能源卡号修改
function updateCard(){
	var row = $('#energyCardInfoTable').datagrid('getSelected');
	if(!row){
		myTips("请选择一条记录再作修改", "error");
		return;
	}
	//$('#addHouseCoding').val('单击切换房源');
	$("#addCardDlg").dialog({
		title : '修改卡号',
		top : getTop(340),
		left : getLeft(500),
		width : 500,
		height : 380,
		closed : true,
		cache : false,
		modal : true,
		onClose : function(){
			$('#addCardDlg [clear="clear"]').val('');
			$('#addCardDlg [clean="clean"]').html('');
			$('#addCardDlg [require="require"]').css('border', '1px solid #a9a9a9');
			clearAttachment();
			clearCard();
		}
	});
	$("#addCardButton").hide();
	$("#updateCardButton").show();
	$("#landNameDiv").hide();
	$("#landIdCardDiv").hide();
	$("#landTelDiv").hide();
	$("#addCardDlg").dialog('open');
	
	$('#addHouseStoreId').val(row.jdcnHouse4storeId);
	$('#jdcnId').val(row.jdcnId);	
	$('#addAddress').val(row.addCommunity);
	$('#cardName').val(row.jdcnCardName);
	$('#cardNum').val(row.jdcnCardNumber);
	$('#cardPeople').val(row.jdcnBelongingToPeople);
	$('#cardPeopleId').val(row.jdcnIdCard);
	$('#cardBankName').val(row.jdcnBankName);
	$('#cardBank').val(row.jdcnBankCard);
	$('#cardTel').val(row.jdcnTelephone);
	$('#cardRemark').val(row.jdcnRemarks);
	$('#jdcnMeterNumber').val(row.jdcnMeterNumber);
}
//修改能源卡号
function doUpdateCard(){
	var row = $('#trusteeshipDg').datagrid('getSelected');
	var rows = $('#energyCardInfoTable').datagrid('getSelected');
	var jdcnId = $('#jdcnId').val();
	var addHouseStoreId = row.hsId;
	var cardName = $('#cardName').val();
	var cardNum = $('#cardNum').val();
	var cardPeople = $('#cardPeople').val();
	var cardPeopleId = $('#cardPeopleId').val();
	var cardBankName = $('#cardBankName').val();
	var cardBank = $('#cardBank').val();
	var cardTel = $('#cardTel').val();
	var cardRemark = $('#cardRemark').val();
	var jdcnMeterNumber = $('#jdcnMeterNumber').val();
	
	
	var followUpContent = '综合修改能源卡号，';
	if(cardName != rows.jdcnCardName){
		followUpContent += '卡名:'+rows.jdcnCardName+' → '+cardName+','
	}
	if(cardNum != rows.jdcnCardNumber){
		followUpContent += '卡号:'+rows.jdcnCardNumber+' → '+cardNum+','
	}
	if(cardPeople != rows.jdcnBelongingToPeople){
		followUpContent += '卡号归属人:'+rows.jdcnBelongingToPeople+' → '+cardPeople+','
	}
	if(cardPeopleId != rows.jdcnIdCard){
		followUpContent += '身份证:'+rows.jdcnIdCard+' → '+cardPeopleId+','
	}
	if(cardTel != rows.jdcnTelephone){
		followUpContent += '联系方式:'+rows.jdcnTelephone+' → '+cardTel+','
	}
	if(cardBankName != rows.jdcnBankName){
		followUpContent += '银行名称:'+rows.jdcnBankName+' → '+cardBankName+','
	}
	if(cardBank != rows.jdcnBankCard){
		followUpContent += '银行卡号:'+rows.jdcnBankCard+' → '+cardBank+','
	}
	if(cardRemark != rows.jdcnRemarks){
		followUpContent += '备注:'+rows.jdcnRemarks+' → '+cardRemark+','
	}
	if(jdcnMeterNumber != rows.jdcnMeterNumber){
		followUpContent += '表号:'+rows.jdcnMeterNumber+' → '+jdcnMeterNumber+','
	}
	
	$.post("../updateDailyCardNumber.action", {
		jdcnId 					: jdcnId,
		jdcnHouse4storeId 		: addHouseStoreId,
		jdcnCardName 			: cardName,
		jdcnCardNumber 			: cardNum,
		jdcnBelongingToPeople 	: cardPeople,
		jdcnIdCard 				: cardPeopleId,
		jdcnBankName 			: cardBankName,
		jdcnBankCard 			: cardBank,
		jdcnTelephone 			: cardTel,
		jdcnRemarks 			: cardRemark,
		jdcnMeterNumber			: jdcnMeterNumber,
		followUpContent         : followUpContent,
		jhfDepartment           : _loginDepartment,
		jhfStorefront           : _loginStore,
		jhfUserId               : _loginUserId,
		jhfHouseId              : row.hsHouseId,
		jhfHouse4rentId         : row.hrId,
	}, function(data) {
		if (data < 0 || data == '') {
			myTips("修改失败", "error");
			return;
		}
		myTips("修改成功", "success");
		queryCard(row);
		queryTrusteeship(_pageNum[0], 0, 0);
		$('#addCardDlg').dialog('close')
	});
}
/****************************能源卡号end*******************************/

/************************************租客、业主 信息处理*****************************************/
//查询  租客  或  业主  信息
function selectRenterInfo(row, num){
	$('#popClassdiv [clear="clear"]').val('');
	$('#popClassdiv [choose="choose"]').val('');
	var popId;
	if(num == 0){
		popId = row.renterPopulationId;
	}else{
		popId = row.laPopulationId;
	}
	$.post("../selectPopulationCommon.action", {
		popId : popId,
	}, function(data) {
		if (data.code<0) {
			return;
		}
		data=data.body;
		if(num == 0){
			for(var i in data[0]){
				$('#'+i).val(data[0][i]);
			}
		}else{
			for(var i in data[0]){
				$('#'+i+1).val(data[0][i]);
			}
		}
	});
}
//执行修改客户信息
function doUpdatePopulation(num){
	var popId,popName,popNameRemark,popIdcardType, 
	 popIdcard,popTelephone,popSex,popNation,popIdcardAddress,popBirth,popMarriageState,popFromArea,popPresentAddress,popOccupation, 
	 popDegreeEducation,popResidenceType,popUnitService,popResidenceCause,popCheckinTime,popRelation,popInnerCreditLevel,popOuterCreditLevel
	if(num == 0){
		popId = $("#popId").val();
		popName = $("#popName").val();
		popNameRemark = $("#popNameRemark").val();
		popIdcardType = $("#popIdcardType").val();
		popIdcard = $("#popIdcard").val();
		popTelephone = $('#popTelephone').val();
		popSex = $('#popSex').val();
		popNation = $('#popNation').val();
		popIdcardAddress = $('#popIdcardAddress').val();
		popBirth = $('#popBirth').val();
		popMarriageState = $('#popMarriageState').val();
		popFromArea = $('#popFromArea').val();
		popPresentAddress = $('#popPresentAddress').val();
		popOccupation = $('#popOccupation').val();
		popDegreeEducation = $('#popDegreeEducation').val();
		popResidenceType = $('#popResidenceType').val();
		popUnitService = $('#popUnitService').val();
		popResidenceCause = $('#popResidenceCause').val();
		popCheckinTime = $('#popCheckinTime').val();
		popRelation = $("#popRelation").val();
		popInnerCreditLevel = $("#popInnerCreditLevel").val();
		popOuterCreditLevel = $("#popOuterCreditLevel").val();
		type="租客";
	}else{
		popId = $("#popId1").val();
		popName = $("#popName1").val();
		popNameRemark = $("#popNameRemark1").val();
		popIdcardType = $("#popIdcardType1").val();
		popIdcard = $("#popIdcard1").val();
		popTelephone = $('#popTelephone1').val();
		popSex = $('#popSex1').val();
		popNation = $('#popNation1').val();
		popIdcardAddress = $('#popIdcardAddress1').val();
		popBirth = $('#popBirth1').val();
		popMarriageState = $('#popMarriageState1').val();
		popFromArea = $('#popFromArea1').val();
		popPresentAddress = $('#popPresentAddress1').val();
		popOccupation = $('#popOccupation1').val();
		popDegreeEducation = $('#popDegreeEducation1').val();
		popResidenceType = $('#popResidenceType1').val();
		popUnitService = $('#popUnitService1').val();
		popResidenceCause = $('#popResidenceCause1').val();
		popCheckinTime = $('#popCheckinTime1').val();
		popRelation = $("#popRelation1").val();
		popInnerCreditLevel = $("#popInnerCreditLevel1").val();
		popOuterCreditLevel = $("#popOuterCreditLevel1").val();
		type="业主";
	}
	showLoading();
	
	console.log(_updateHouseInfo)
	$.post("../updatePopulation.action", {
		popId 					: popId,
		popName                 : popName,
		popNameRemark           : popNameRemark,
		popIdcardType           : popIdcardType,
		popIdcard               : popIdcard,
		popTelephone            : popTelephone,
		popSex                  : popSex,
		popNation               : popNation,
		popIdcardAddress        : popIdcardAddress,
		popBirth                : popBirth,
		popMarriageState        : popMarriageState,
		popFromArea             : popFromArea,
		popPresentAddress       : popPresentAddress,
		popOccupation           : popOccupation,
		popDegreeEducation      : popDegreeEducation,
		popResidenceType        : popResidenceType,
		popUnitService          : popUnitService,
		popResidenceCause       : popResidenceCause,
		popCheckinTime          : popCheckinTime,
		popRelation             : popRelation,
		popInnerCreditLevel     : popInnerCreditLevel,
		popOuterCreditLevel     : popOuterCreditLevel,
		registrantName			: _loginUserName,
		hsId                    : _updateHouseInfo.hsId,
		hsHouseId               : _updateHouseInfo.hsHouseId,
		type                    : type,
	}, function(data) {
		hideLoading();
		if(data.code<0){
			if(data.code==-21){
				myTips("身份证已存在，已存在身份证的人口姓名与本次填写的姓名不一致！","error");
			} else {
				myTips(data.msg,"error");
			}
			return;
		}
		myTips("修改成功","success");
		queryTrusteeship(_pageNum[0], 0, 0);
	});
}
/**************************************租客、业主 信息end***************************************/

/***********************************租客合约处理******************************************/
//租客合约数据
function renterContract(hrId){
	// 租客合约记录表取数据
	$.post("../queryAllRenewalRenter.action", {
		jrrHouse4rentId : hrId,
	}, function(data){
		if(data.code<0){
			$('#renewalContinueTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '无相关的合约信息'
			});
			return;
		}
		data=data.body;
		$("#renewalContinueTable").datagrid("loadData", data);
	});
}
//租客合约修改窗口
function updateRenterRenewal(){
	var row = $("#renewalContinueTable").datagrid("getSelected");
	if(row == null){
		myTips('请选中需要修改的行！', 'error');
		return;
	}
	$("#updateRenterContractInfoDlg").dialog({
		title : '修改租客合约',
		top : getTop(280),
		left : getLeft(600),
		width : 600,
		height : 280,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#numberMode').val(1)
		}
	});
	$(".yishouEndTime").val("");
	$.post("../selectEndPeriods.action", {
		jciRentContId : row.jrrId,
		jciState : "已收"
	},function(data){
		$(".yishouEndTime").val(data);
	});	
	$("#settingTips").html("");
	$(".jrrRenewalCoding").val(row.jrrRenewalCoding);
	$(".jrrHouse4rentId").val(row.jrrHouse4rentId);
	$(".jrrHouse4storeId").val(row.jrrHouse4storeId);
	$(".jrrRenterId").val(row.jrrRenterId);
	$(".jrrLandlordId").val(row.jrrLandlordId);
	$(".jrrUserId").val(row.jrrUserId);
	$(".jrrDepartment").val(row.jrrDepartment);
	$(".jrrStorefront").val(row.jrrStorefront);
	$(".jrrContractType").val(row.jrrContractType);
	$(".jrrTheContract").val(row.jrrTheContract);
	if(row.advanceMode == null || row.advanceMode == ''){
		$('#advanceMode').val(1);
		$("#jrrInAdvancePay").val(row.jrrBeginTime.split('-')[2]);
	}else{
		$('#advanceMode').val(row.advanceMode);
		if(row.advanceMode == 1){//自然月
			$("#jrrInAdvancePay").val(row.jrrInAdvancePay);
		}else{//整月
			$("#jrrInAdvancePay").val(1);
		}
	}
	var year = row.jrrTheTerm.split("年")[0];
	var month = row.jrrTheTerm.split("年")[1].split("月")[0];
	var day = row.jrrTheTerm.split("年")[1].split("月")[1].split("日")[0];
	if(year==''||year==null){
		year =0 ;
	}
	if(month==''||month==null){
		month =0 ;
	}
	if(day==''||day==null){
		day =0 ;
	}
	$(".jrrTheTermYear").val(year);
	$(".jrrTheTermMonth").val(month);
	$(".jrrTheTermDay").val(day);
	$(".jrrTheTerm").val(row.jrrTheTerm);
	$(".jrrBeginTime").val(row.jrrBeginTime);
	$(".jrrEndTime").val(row.jrrEndTime);
	$(".jrrSignedTime").val(row.jrrSignedTime);
	$(".jrrRemark").val(row.jrrRemark);
	$(".jrrMoney").val(row.jrrMoney);
	$(".jrrPaymentMethod").val(row.jrrPaymentMethod);
	$(".jrrManageCost").val(row.jrrManageCost);
	$(".jrrManagePayment").val(row.jrrManagePayment);
	$(".jrrServerCost").val(row.jrrServerCost);
	$(".jrrServerPayment").val(row.jrrServerPayment);
	
	$("#updateRenterContractInfoDlg").dialog('open');
}
//修改合约
function doUpdateRenterContract(){
	var row = $("#renewalContinueTable").datagrid("getSelected");
	var jrrRenewalCoding = $(".jrrRenewalCoding").val();
	var jrrHouse4rentId = $(".jrrHouse4rentId").val();
	var jrrHouse4storeId = $(".jrrHouse4storeId").val();
	var jrrRenterId = $(".jrrRenterId").val();
	var jrrLandlordId = $(".jrrLandlordId").val();
	var jrrUserId = $(".jrrUserId").val();
	var jrrDepartment = $(".jrrDepartment").val();
	var jrrStorefront = $(".jrrStorefront").val();
	var jrrContractType = $(".jrrContractType").val();
	var jrrTheContract = $(".jrrTheContract").val();
	var jrrTheTerm = $(".jrrTheTerm").val();
	var jrrBeginTime = $(".jrrBeginTime").val();
	var jrrEndTime = $(".jrrEndTime").val();
	var jrrSignedTime = $(".jrrSignedTime").val();
	var jrrInAdvancePay = $("#jrrInAdvancePay").val();
	var jrrRemark = $(".jrrRemark").val();
	var jrrMoney = $(".jrrMoney").val();
	var jrrPaymentMethod = $(".jrrPaymentMethod").val();
	var yishouEndTime = $(".yishouEndTime").val();
	var jrrManageCost = $(".jrrManageCost").val();
	var jrrManagePayment = $(".jrrManagePayment").val();
	var jrrServerCost = $(".jrrServerCost").val();
	var jrrServerPayment = $(".jrrServerPayment").val();
	
	var jhfHouseId=$("#updateRhsHouseId").val();
	
	var advanceMode = $("#advanceMode").val();
	var numberMode = $("#numberMode").val();
	
	if(jrrTheTerm == "0年0月0日"){
		$("#settingRenterTips").html("请设置合同期限");
		return;
	}
	if(jrrBeginTime == ""){
		$("#settingRenterTips").html("请设置开始时间");
		return;
	}
	if(jrrPaymentMethod == ""){
		$("#settingRenterTips").html("请设置缴费方式");
		return;
	}
	if(jrrMoney == ""){
		$("#settingRenterTips").html("请设置租金");
		return;
	}
	if(jrrSignedTime == ""){
		$("#settingRenterTips").html("请设置签约时间");
		return;
	}
	if(jrrInAdvancePay == "" || jrrInAdvancePay == 0){
		$("#settingRenterTips").html("请设置收租日期！");
		return;
	}
	if(yishouEndTime != ""){
		var yishou = new Date(yishouEndTime);
		var endTime = new Date(jrrEndTime);
		if(endTime < yishou){
			$("#settingTips").html("本合约已收账单结束日期为"+formatDate(yishou)+",修改后的合约到期日必须在已收账单结束日期之后");
			return;
		}
	}
	console.log(row);
	$('.do_overDiv').show();
	$.post("../updateRenewalRenter.action",{
		jrrId 				: row.jrrId,
		jrrRenewalCoding 	: jrrRenewalCoding,
		jrrHouse4rentId	 	: jrrHouse4rentId,
		jrrHouse4storeId 	: jrrHouse4storeId,
		jrrRenterId 		: jrrRenterId,
		jrrLandlordId 		: jrrLandlordId,
		jrrUserId 			: jrrUserId,
		jrrDepartment 		: jrrDepartment,
		jrrStorefront 		: jrrStorefront,
		jrrContractType 	: jrrContractType,
		jrrBeginTime 		: jrrBeginTime,
		jrrEndTime 			: jrrEndTime,
		jrrSignedTime 		: jrrSignedTime,
		jrrRemark 			: jrrRemark,
		jrrMoney 			: jrrMoney,
		jrrTheTerm 			: jrrTheTerm,
		jrrTheContract 		: jrrTheContract,
		jrrInAdvancePay 	: jrrInAdvancePay,
		jrrPaymentMethod 	: jrrPaymentMethod,
		jrrManageCost		: jrrManageCost,
		jrrServerCost		: jrrServerCost,
		jrrManagePayment	: jrrManagePayment,
		jrrServerPayment	: jrrServerPayment,
		updateFlag          : 1,
		advanceMode         : advanceMode,
		numberMode          : numberMode,
		hsHouseId           : jhfHouseId,
	},function(data){
		if(data.code<0){
			myTips(data.msg,"error");
			$('.do_overDiv').hide();
			return;
		}else{
			myTips("修改成功","success");
			renterContract(jrrHouse4rentId)
			queryTrusteeship(_pageNum[0], 0, 0);
			$('#updateRenterContractInfoDlg').dialog('close');
			$('.do_overDiv').hide();
		}
	});
}
//废除合约
function abrogateRenterContract() {
	var row = $("#renewalContinueTable").datagrid("getSelected");
	if(row == null){
		myTips('请选中一行数据', 'error');
		return;
	}
	$.messager.confirm('提示', '废除合约将删除与该合约相关的分期账单及能源读数，您确定要废除该合约吗？', function(r){
		if (r){
			showLoading();
			$.post('../abrogateRenterContract.action', {
				jrrId 			: row.jrrId,
				jrrHouse4rentId : row.jrrHouse4rentId,
			}, function(data){
				hideLoading();
				if (data.code < 0) {
					myTips(data.msg, 'error');
				} else {
					myTips("废除成功", "success");
					renterContract(row.jrrHouse4rentId);
					queryTrusteeship(_pageNum[0], 0, 0);
				}
			});
		}
	});
}
/**********************************租客合约end*******************************************/

/***********************************业主合约处理******************************************/
//业主合约
function landlordContract(hsId) {
	$.post("../queryAllRenewalLandlord.action",{
		jrlHouse4storeId : hsId
	}, function(data) {
		if(data.code<0){
			$('#landlordContinueTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '无相关的合约信息'
			});
			return;
		}
		data=data.body;
		$("#landlordContinueTable").datagrid("loadData", data);
	});
}
//打开修改业主合约对话框
function updateLandlordRenewal(){
	var row = $('#landlordContinueTable').datagrid('getSelected');
	if(!row){
		myTips("请选择一条合约进行修改！","error");
		return;
	}
	$("#updateLandlordContractInfoDlg").dialog({
		title : '修改业主合约',
		top : getTop(370),
		left : getLeft(680),
		width : 680,
		height : 370,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$(".yifuEndTime").val("");
	$.post("../selectEndPeriods.action", {
		jciLandContId : row.jrlId,
		jciState : "已付"
	},function(data){
		$(".yifuEndTime").val(data);
	});
	
	$(".jrlRenewalCoding").val(row.jrlRenewalCoding);
	$(".jrlHouse4storeId").val(row.jrlHouse4storeId);
	$(".jrlLandlordId").val(row.jrlLandlordId);
	$(".jrlUserId").val(row.jrlUserId);
	$(".jrlDepartment").val(row.jrlDepartment);
	$(".jrlStorefront").val(row.jrlStorefront);
	$(".jrlContractType").val(row.jrlContractType);
	$(".jrlBeginTime").val(row.jrlBeginTime);
	$(".jrlEndTime").val(row.jrlEndTime);
	$(".jrlSignedTime").val(row.jrlSignedTime);
	var year = row.jrlTheTerm.split("年")[0];
	var month = row.jrlTheTerm.split("年")[1].split("月")[0];
	var day = row.jrlTheTerm.split("年")[1].split("月")[1].split("日")[0];
	if(year==''||year==null){
		year =0 ;
	}
	if(month==''||month==null){
		month =0 ;
	}
	if(day==''||day==null){
		day =0 ;
	}
	$(".jrlTheTermYear").val(year);
	$(".jrlTheTermMonth").val(month);
	$(".jrlTheTermDay").val(day);
	$(".jrlTheTerm").val(row.jrlTheTerm);
	$(".jrlInAdvancePay").val(row.jrlInAdvancePay);
	$(".jrlRentFreeDays").val(row.jrlRentFreeDays);
	$(".jrlPaymentMethod").val(row.jrlPaymentMethod);
	$(".jrlRemark").val(row.jrlRemark);
	$(".jrlPriceLadder").val(row.jrlPriceLadder);
	$(".jrlRentFreeSegment").val(row.jrlRentFreeSegment);
	settingPriceLadder();
	
	$("#updateLandlordContractInfoDlg").dialog('open');
}
//生成合约年限等
function settingPriceLadder(){
	var year = $(".jrlTheTermYear").val();
	var month = $(".jrlTheTermMonth").val();
	var day = $(".jrlTheTermDay").val();
	if(year==''||year==null){
		year =0 ;
	}
	if(month==''||month==null){
		month =0 ;
	}
	if(day==''||day==null){
		day =0 ;
	}
	$("#settingTips").html('');
	$('.priceLadderDiv').empty();
	$('.rentFreeSegmentDiv').empty();
	if((year==0 && month==0 && day==0)){
		$("#settingTips").html("请设置合约期限");
		return;
	}
	if($(".jrlBeginTime").val()==""){
		$("#settingTips").html("请设置开始时间");
		return;
	}
	if($(".jrlRentFreeDays").val()==""){
		$("#settingTips").html("请设置免租天数");
		return;
	}
	var isWholeYear = 1;//1表示整年，0表示非整年
	if(month!=0 || day!=0){
		isWholeYear = 0;
	}
	var beginTime = $(".jrlBeginTime").val();
	var priceLadderArray = $('.jrlPriceLadder').val().split(",");
	var rentFreeSegment = $('.jrlRentFreeSegment').val().split(",");
	var rentFreeSegment2 = new Array();
	for(var i=0;i<rentFreeSegment.length;i++){
		rentFreeSegment2[i] = rentFreeSegment[i].split("#");
	}
	if(isWholeYear == 1){
		for(var i=1;i<parseInt(year)+1;i++){
			$('.priceLadderDiv').append(
				'<div style="margin:5px 0 0 2px;float: left;">'
				+'第'+i+'年租金：<input style="width:80px;" class="updatePriceLadder" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">'
				+'</div>'
			);
			$('.rentFreeSegmentDiv').append(
				'<div style="margin:5px 10px 0 2px;float: left;">'
				+'第'+i+'年： 年前<input style="display:none;" id="holidaySettingA'+i+'" class="rentFreeSegmentIndex">'
				+'<input style="display:none;" id="holidaySettingB'+i+'">'
				+'<input style="width:80px;" id="holidaySumBefor'+i+'" type="number" min="0" max="100" onchange="changeRentFreeSegment('+i+',0)">天'
				+'&emsp;年后<input style="display:none;" id="holidaySettingC'+i+'">'
				+'<input style="display:none;" id="holidaySettingD'+i+'">'
				+'<input style="width:80px;" id="holidaySumAfter'+i+'" type="number" min="0" max="100" onchange="changeRentFreeSegment('+i+',1)">天'
				+'</div>'
			);
			$('#holidaySettingA' + i).val(renewalDate(beginTime, i, 0));
			$('#holidaySettingD' + i).val(renewalDate(beginTime, i, 1));
			if($('.jrlPriceLadder').val() != ""){
				$('.updatePriceLadder:eq('+(i-1)+')').val(priceLadderArray[i-1]);
			}
			if($('.jrlRentFreeSegment').val() != ""){
				$('#holidaySettingB' + i).val(rentFreeSegment2[i-1][1]);
				$('#holidaySettingC' + i).val(rentFreeSegment2[i-1][2]);
				changeHoliday(i,0);
				changeHoliday(i,1);
			}
		}
	}else{
		for(var i=1;i<parseInt(year)+2;i++){
			$('.priceLadderDiv').append(
				'<div style="margin:5px 0 0 2px;float: left;">'
				+'第'+i+'年租金：<input style="width:80px;" class="updatePriceLadder" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">'
				+'</div>'
			);
			$('.rentFreeSegmentDiv').append(
				'<div style="margin:5px 10px 0 2px;float: left;">'
				+'第'+i+'年： 年前<input style="display:none;" id="holidaySettingA'+i+'" class="rentFreeSegmentIndex">'
				+'<input style="display:none;" id="holidaySettingB'+i+'">'
				+'<input style="width:80px;" id="holidaySumBefor'+i+'" type="number" min="0" max="100" onchange="changeRentFreeSegment('+i+',0)">天'
				+'&emsp;年后<input style="display:none;" id="holidaySettingC'+i+'">'
				+'<input style="display:none;" id="holidaySettingD'+i+'">'
				+'<input style="width:80px;" id="holidaySumAfter'+i+'" type="number" min="0" max="100" onchange="changeRentFreeSegment('+i+',1)">天'
				+'</div>'
			);
			$('#holidaySettingA' + i).val(renewalDate(beginTime, i, 0));
			if(i < parseInt(year)+1){
				$('#holidaySettingD' + i).val(renewalDate(beginTime, i, 1));
			}else{//最后一年
				var numsDate = year + "*" + month + "*" + day;
				$('#holidaySettingD' + i).val(renewalDate(beginTime, numsDate, 2));
			}
			if($('.jrlPriceLadder').val() != ""){
				$('.updatePriceLadder:eq('+(i-1)+')').val(priceLadderArray[i-1]);
			}
			if($('.jrlRentFreeSegment').val() != ""){
				$('#holidaySettingB' + i).val(rentFreeSegment2[i-1][1]);
				$('#holidaySettingC' + i).val(rentFreeSegment2[i-1][2]);
				changeHoliday(i,0);
				changeHoliday(i,1);
			}
		}
	}
}
//修改合约
function checkSetting(){
	var year = $(".jrlTheTermYear").val();
	var month = $(".jrlTheTermMonth").val();
	var day = $(".jrlTheTermDay").val();
	var isWholeYear = 1;//1表示整年，0表示非整年
	if(month!=0 || day!=0){
		isWholeYear = 0;
	}
	var settingArrs = $('#priceLadder input');
	var priceArrs = [];
	var holidayArrs = [];
	/*
	  	indexOF
		indexOf() 方法返回某个指定的字符串值在字符串中首次出现的位置（从左向右）。没有匹配的则返回-1，否则返回首次出现位置的字符串的下标值。
		var src="images/off_1.png";
		alert(src.indexOf('t'));
		alert(src.indexOf('i'));
		alert(src.indexOf('g'));
		弹出值依次为：-1,0,3
		push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
	 */
	//settingArrs.length 是#priceLadder中所有input的个数
	for (var i = 0; i < settingArrs.length; i++) {
		if (settingArrs[i].className.indexOf('updatePriceLadder') > -1) {
			//console.log("settingArrs[i]="+settingArrs[i]);
			//获取租金阶梯价的input
			priceArrs.push(settingArrs[i]);
		} else if (settingArrs[i].id.indexOf('holidaySetting') > -1) {
			//获取id=holidaySettingA、B、C、D的input
			holidayArrs.push(settingArrs[i]);
		}
	}
	for (var i = 0; i < priceArrs.length; i++) {
		if (priceArrs[i].value == '' || priceArrs[i].value == '0.00') {
			$("#settingTips").html('第' + (parseInt(i) + 1) + '年租金设置错误！');
			return;
		}
	}
	var number = holidayArrs.length/4;
	for (var i = 0; i < number; i++) {
		var holidayNums = parseInt(i) + 1;
		var holidayA = $('#holidaySettingA' + holidayNums).val();
		var holidayB = $('#holidaySettingB' + holidayNums).val();
		var holidayC = $('#holidaySettingC' + holidayNums).val();
		var holidayD = $('#holidaySettingD' + holidayNums).val();
//		var holiday = $('.jrlRentFreeDays').val();
		var sumBefor = $('#holidaySumBefor' + holidayNums).val();
		var sumAfter = $('#holidaySumAfter' + holidayNums).val();
		if(sumBefor == "" || sumAfter == ""){
			$("#settingTips").html('请设置第' + holidayNums + '年免租期天数');
			return;
		}
		if(sumBefor < 0 || sumAfter < 0){
			$("#settingTips").html('第' + holidayNums + '年免租期错误');
			return;
		}
		if((sumBefor >= 1 && sumBefor < 2) || (sumAfter >= 1 && sumAfter < 2)){
			$("#settingTips").html("第"+holidayNums+"年免租期错误，系统暂不支持年前1天或年后1天此特殊情况");
			return;
		}
		/*if(isWholeYear == 1 || i < number-1){//整年每年验证    非整年的最后一年免验证
			if(parseInt(sumBefor)+parseInt(sumAfter)!=holiday){
				$("#settingTips").html('第' + holidayNums + '年免租期错误');
				return;
			}
			if (renewalHolidaySum(holidayA, holidayB, holidayC, holidayD, holiday)) {
				$("#settingTips").html('第' + holidayNums + '年免租期年前加年后不等于' + holiday + '天！');
				return;
			}
		}*/
	}
	var i = 0;
	var updatePriceLadderArray = new Array();
	$(".updatePriceLadder").each(function(){
		updatePriceLadderArray[i] = parseFloat($(this).val());
		i++;
	});
	var updatePriceLadder = updatePriceLadderArray.join(",");
	var updateRentFreeSegmentArray = new Array();
	i = 0;
	$(".rentFreeSegmentIndex").each(function(){
		updateRentFreeSegmentArray[i] = $("#holidaySettingA"+(i+1)).val() + "#" + $("#holidaySettingB"+(i+1)).val() + "#" + $("#holidaySettingC"+(i+1)).val() + "#" + $("#holidaySettingD"+(i+1)).val();		
		i++;
	});
	var updateRentFreeSegment = updateRentFreeSegmentArray.join(",");
	$(".jrlPriceLadder").val(updatePriceLadder);
	$(".jrlRentFreeSegment").val(updateRentFreeSegment);
	doUpdateContract();
}
function doUpdateContract(){
	var row = $("#landlordContinueTable").datagrid("getSelected");
	var jrlRenewalCoding = $(".jrlRenewalCoding").val();
	var jrlHouse4storeId = $(".jrlHouse4storeId").val();
	var jrlLandlordId = $(".jrlLandlordId").val();
	var jrlUserId = $(".jrlUserId").val();
	var jrlDepartment = $(".jrlDepartment").val();
	var jrlStorefront = $(".jrlStorefront").val();
	var jrlContractType = $(".jrlContractType").val();
	var jrlBeginTime = $(".jrlBeginTime").val();
	var jrlEndTime = $(".jrlEndTime").val();
	var jrlSignedTime = $(".jrlSignedTime").val();
	var jrlTheTerm = $(".jrlTheTerm").val();
	var jrlInAdvancePay = $(".jrlInAdvancePay").val();
	var jrlRentFreeDays = $(".jrlRentFreeDays").val();
	var jrlPaymentMethod = $(".jrlPaymentMethod").val();
	var jrlRemark = $(".jrlRemark").val();
	var jrlPriceLadder = $(".jrlPriceLadder").val();
	var jrlRentFreeSegment = $(".jrlRentFreeSegment").val();
	var yifuEndTime = $(".yifuEndTime").val();
	 var jhfHouseId=$("#updateRhsHouseId").val();
	if(jrlTheTerm == "0年0月0日"){
		$("#settingTips").html("请设置合约期限");
		return;
	}
	if(jrlBeginTime == ""){
		$("#settingTips").html("请设置开始时间");
		return;
	}
	if(jrlPaymentMethod == ""){
		$("#settingTips").html("请设置缴费方式");
		return;
	}
	if(jrlSignedTime == ""){
		$("#settingTips").html("请设置签约时间");
		return;
	}
	if(jrlInAdvancePay == ""){
		$("#settingTips").html("请设置提前缴租天数");
		return;
	}
	if(jrlRentFreeDays == ""){
		$("#settingTips").html("请设置免租天数");
		return;
	}
	if(yifuEndTime != ""){
		var yifu = new Date(yifuEndTime);
		var endTime = new Date(jrlEndTime);
		if(endTime < yifu){
			$("#settingTips").html("本合约已付账单结束日期为"+formatDate(yifu)+",修改后的合约到期日必须在已付账单结束日期之后");
			return;
		}
	}
	if(jrlPriceLadder == "" || jrlRentFreeSegment == ""){
		$("#settingTips").html("请设置租金和免租期时段");
		return;
	}
	$('.do_overDiv').show();
	$.post("../updateRenewalLandlord.action",{
		 jrlId : row.jrlId,
		 jrlRenewalCoding : jrlRenewalCoding,
		 jrlHouse4storeId : jrlHouse4storeId,
		 jrlLandlordId : jrlLandlordId,
		 jrlUserId : jrlUserId,
		 jrlDepartment : jrlDepartment,
		 jrlStorefront : jrlStorefront,
		 jrlContractType : jrlContractType,
		 jrlBeginTime : jrlBeginTime,
		 jrlEndTime : jrlEndTime,
		 jrlSignedTime : jrlSignedTime,
		 jrlTheTerm : jrlTheTerm,
		 jrlInAdvancePay : jrlInAdvancePay,
		 jrlPriceLadder : jrlPriceLadder,
		 jrlRentFreeDays : jrlRentFreeDays,
		 jrlRentFreeSegment : jrlRentFreeSegment,
		 jrlPaymentMethod : jrlPaymentMethod,
		 jrlRemark : jrlRemark,
		 updateFlag : 1,
		 hsHouseId : jhfHouseId,
		 
	},function(data){
		if(data.code<0){
			myTips(data.msg,"error");
			$('.do_overDiv').hide();
			return;
		}else{
			myTips("修改成功","success");
			landlordContract(jrlHouse4storeId);
			queryTrusteeship(_pageNum[0], 0, 0);
			$('#updateLandlordContractInfoDlg').dialog('close');
			$('.do_overDiv').hide();
		}
	});
}
//废除业主合约
function abrogateLandlordContract() {
	var row = $("#landlordContinueTable").datagrid("getSelected");
	if(row == null){
		myTips('请选中一行数据', 'error');
		return;
	}
	$.messager.confirm('提示', '废除合约将删除与该合约相关的分期账单及能源读数，您确定要废除该合约吗？', function(r){
		if (r){
			showLoading();
			$.post('../abrogateLandlordContract.action', {
				jrlId 			 : row.jrlId,
				jrlHouse4storeId : row.jrlHouse4storeId,
			}, function(data){
				hideLoading();
				if (data.code < 0) {
					myTips(data.msg, 'error');
				} else {
					myTips("废除成功", "success");
					landlordContract(row.jrlHouse4storeId);
					queryTrusteeship(_pageNum[0], 0, 0);
				}
			});
		}
	});
}
/**********************************业主合约end*********************************************/


function energy(){
	//控制非选中能源项隐藏
	var chargingPlan=parent._chargingPlan;
	for(var i in chargingPlan){
		if(!chargingPlan[i]["state"]){
			//$("."+i+" input").val(0);
			$("."+i).hide();
		}
	}
}
/*******************************未租信息处理************************************/
function nonRentedInformationProcessing(){
	var row = $('#trusteeshipDg').datagrid('getSelected');
	for(var i in row ){
		$("#updateT"+i).val(row[i]);
		$("#doupdate"+i).val(row[i]);
	}
	$('#updateThsAddress').val(row.addCommunity+' '+row.addBuilding+' '+row.addDoorplateno);
	
	energy();//能源项显示隐藏
	//业绩受益人
	$.post("../queryAllTransactionAssistanceRentStore.action", {
		assistHouse4store : row.hsId,
		assistType : '存房'
	}, function(assdata) {
		if(assdata.code<0){
			$("#readhsAssist").val('无业绩受益人');
		}else{
			assdata = assdata.body;
			if(assdata == null){
				assdata = [];
			}
			var assInfo = '';
			for(var i in assdata){
				assInfo += assdata[i].assistPeople+"："+assdata[i].assistBonus+"%；";
			}
			$("#updateThsAssist").val(assInfo);
		}
	});
	//业务员
	if(row.hsAdminUserId != null && row.hsAdminUserId != ''){
		$.post("../queryUserByDepartmentID.action", {
			userId : row.hsAdminUserId
		}, function(data1) {
			if (data1.code < 0) {
				return;
			}
			data1 = data1.body;
			if(data1 == null){
				data1 = [];
			}
			if(data1 != '' && data1.length > 0){
				$('#updateThsShowUserInfo').val(data1[0].suStaffName);
				$("#updateThsGetUserStoreId").val(data1[0].suStoreId);
				$("#updateThsGetUserDetId").val(data1[0].suDepartmentId);
				$("#updateThsGetUserId").val(data1[0].userId);
			}
		});
	}
	//录入人
	if(row.hsUserId != null && row.hsUserId != ''){
		$.post("../queryUserByDepartmentID.action", {
			userId : row.hsUserId
		}, function(data3) {
			if (data3.code < 0) {
				return;
			}
			data3 = data3.body;
			if(data3 == null){
				data3 = [];
			}
			if(data3 != '' && data3.length > 0){
				$('#updateThsUserName').val(data3[0].suStaffName);
			}
		});
	}
}
//修改未租信息
function doUpdateTrusteeship(){
	var hrId = $("#updateRhrId").val();
	var hsId = $("#updateThsId").val();
	if(hsId!=""){
		hrId="";
	}
	var jhfHouseId = $("#updateThsHouseId").val();
	var hsHouseSquare = $("#updateThsHouseSquare").val();
	var hsSectionType = $("#updateThsSectionType").val();
	var hsHouseOwner = $("#updateThsHouseOwner").val();
	var hsHouseDirection = $("#updateThsHouseDirection").val();
	var hsGuidePrice = $("#updateThsGuidePrice").val();
	var hsHouseDeposit = $("#updateThsHouseDeposit").val();
	var hsBase = $("#updateThsBase").val();//欠结金额
	var hsAdminUserId = $("#updateThsGetUserId").val();
	var hsAdminUserName=$("#updateThsShowUserInfo").val();
	var hsDecorationHoliday = $("#updateThsDecorationHoliday").val();
	var hsBankName = $("#updateThsBankName").val();
	var hsBankType = $("#updateThsBankType").val();
	var hsBankNum = $("#updateThsBankNum").val();
	var hsHouseNote = $("#updateThsHouseNote").val();
	var hsWaterVolFirst = $("#updateThsWaterVolFirst").val();
	var hsElectritVolFirst = $("#updateThsElectritVolFirst").val();
	var hsGasVolFirst = $("#updateThsGasVolFirst").val();
	
	var hsHotWaterVolFirst=$("updateThsHotWaterVolFirst").val();
	var hsHotAirVolFirst=$("updateThsHotAirVolFirst").val();
	
	var hsMeterReadingRecord = "{" 
							+"'water':{'lastReading':"+hsWaterVolFirst+",'thisReading':[]},"
							+"'electrit':{'lastReading':"+hsElectritVolFirst+",'thisReading':[]},"
							+"'gas':{'lastReading':"+hsGasVolFirst+",'thisReading':[]},"+
							+"'hotwater':{'lastReading':"+hsHotWaterVolFirst+",'thisReading':[]},"+
							+"'hotair':{'lastReading':"+hsHotAirVolFirst+",'thisReading':[]}"+
							"}"

	$('.do_overDiv').show();
	$.post("../updateNotRenting.action", {
		hrId	            : hrId,
		hsId 				: hsId,
		hsHouseId			: jhfHouseId,
		hsAdminUserName     : hsAdminUserName,
		hsHouseSquare 		: hsHouseSquare,
		hsSectionType 		: hsSectionType,
		hsHouseOwner 		: hsHouseOwner,  
		hsHouseDirection 	: hsHouseDirection,
		hsGuidePrice        : hsGuidePrice,
		hsHouseDeposit		: hsHouseDeposit,
		hsBase				: hsBase,
		hsAdminUserId 		: hsAdminUserId,
		hsDecorationHoliday : hsDecorationHoliday,
		hsBankName 			: hsBankName, 
		hsBankType			: hsBankType,
		hsBankNum 			: hsBankNum,
		hsHouseNote 		: hsHouseNote,
		hsWaterVolFirst 	: hsWaterVolFirst, 
		hsElectritVolFirst 	: hsElectritVolFirst, 
		hsGasVolFirst 		: hsGasVolFirst,
		hsHotWaterVolFirst  : hsHotWaterVolFirst,
		hsHotAirVolFirst	: hsHotAirVolFirst,
		
		}, function(data) {
			if (data.code<0) {
				myTips(data.msg, "error");
				$('.do_overDiv').hide();
				return;
			}
			else{
				$('.do_overDiv').hide();
				myTips("修改成功!", "success");
				queryTrusteeship(_pageNum[0], 0, 2);
				$('#readonlyTruDlg').dialog('close')
			}
	});
}
//查询业主账单
function queryLandlordPayment(page,type){
	
	var pageNum = 10;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var row = $('#trusteeshipDg').datagrid('getSelected');
	var hsId = row.hsId
	
	$.post("../queryPaymentInUpdateAll.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		contractType 		: "landlord",
		jciHouse4storeId	: hsId,
	},function(data){
		if (data.code<0) {
			sourcePage(0, 0, 3);
			$('#landlordPaymentTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum, page, 3);
			}
			$("#landlordPaymentTable").datagrid("loadData", data.body);
		}
	}, "json");
}
/*********************************未租end**********************************/

/***********************************已租信息处理****************************************/
//已租信息加载
function rentedDataLoading(){
	var row = $('#trusteeshipDg').datagrid('getSelected');
	
	//已租信息显示
	for(var i in row ){
		$("#updateR"+i).val(row[i]);
		if(i == 'hrManagerUserName'){
			$('#updateRhrShowUserInfo').val(row[i]);
			$('#updateRhrGetUserStoreId').val(row.hrStorefront);
			$('#updateRhrGetUserDetId').val(row.hrDepartment);
			$('#updateRhrGetUserId').val(row.hrManagerUserId);
		}
	}
	//微信绑定
	if (row.wxOpenid!=null && row.wxOpenid!="" && row.wxOpenid!="0") {
		$('#updateRwxOpen').val('是');
	} else{
		$('#updateRwxOpen').val('否');
	}
	//剩余租期
	if (row.overplusTime >0 && row.overplusTime<31) {
		$('#updateRoverplus').val(row.overplusTime);
		$('#updateRoverplus').css("color","blue");
	} else if (row.overplusTime <=0) {
		$('#updateRoverplus').val('已到期');
		$('#updateRoverplus').css("color","red");
	} else if (row.overplusTime >30) {
		$('#updateRoverplus').val(row.overplusTime);
		$('#updateRoverplus').css("color","black");
	}
	//水电气计费方案
	$.post("../selectPlanTableRentStore.action", {
		planHdId	:row.hrHouseDictId,
	}, function(data) {
	
		data=data.body;
		$("#updateRhrWaterPlan").empty().append('<option value=""></option>');
		$("#updateRhrElectritPlan").empty().append('<option value=""></option>');
		$("#updateRhrGasPlan").empty().append('<option value=""></option>');
		$("#updateRhrHotWaterPlan").empty().append('<option value=""></option>');
		$("#updateRhrHotAirPlan").empty().append('<option value=""></option>');
		for(var i in data){
			if(data[i].planType=='水'){
				$("#updateRhrWaterPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
			}else if(data[i].planType=='电'){
				$("#updateRhrElectritPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
			}else if(data[i].planType=='气'){
				$("#updateRhrGasPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
			}else if(data[i].planType=='热水'){
				$("#updateRhrHotWaterPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
			}else if(data[i].planType=='暖气'){
				$("#updateRhrHotAirPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
			}
			
		}
		if(row.hrWaterPlan!=''&&row.hrWaterPlan!=null){
			$("#updateRhrWaterPlan").val(row.hrWaterPlan);
		}
		if(row.hrElectritPlan!=''&&row.hrElectritPlan!=null){
			$("#updateRhrElectritPlan").val(row.hrElectritPlan);
		}
		if(row.hrGasPlan!=''&&row.hrGasPlan!=null){
			$("#updateRhrGasPlan").val(row.hrGasPlan);
		}
		if(row.hrHotWaterPlan!=''&&row.hrHotWaterPlan!=null){
			$("#updateRhrHotWaterPlan").val(row.hrHotWaterPlan);
		}
		if(row.hrHotAirPlan!=''&&row.hrHotAirPlan!=null){
			$("#updateRhrHotAirPlan").val(row.hrHotAirPlan);
		}
	});
	//录入人
	if(row.hrUserId != null && row.hrUserId != ''){
		$.post("../queryUserByDepartmentID.action", {
			userId : row.hrUserId
		}, function(userData) {
			if (userData.code < 0) {
				return;
			}
			userData = userData.body;
			if(userData == null){
				userData = [];
			}
			$("#updateRhrUser").val(userData[0].suStaffName);
		});
	}
	//业务员
	if(row.hrAdminUserId != null && row.hrAdminUserId != ''){
		$.post("../queryUserByDepartmentID.action", {
			userId : row.hrAdminUserId
		}, function(userData) {
			if (userData.code < 0) {
				return;
			}
			userData = userData.body;
			if(userData == null){
				userData = [];
			}
			$("#AdminUserShowUserInfo").val(userData[0].suStaffName);
			$("#AdminUserGetUserStoreId").val(userData[0].suStoreId);
			$("#AdminUserGetUserDetId").val(userData[0].suDepartmentId);
			$("#AdminUserGetUserId").val(userData[0].userId);
		});
	}
	//业绩受益人
	$.post("../queryAllTransactionAssistance.action", {
		assistHouse4rent : row.hrId,
		assistType:'出房'
	}, function(assdata) {
		if(assdata.code<0){
			return;
		}else{
			assdata=assdata.body;
			if(assdata == null){
				assdata = [];
			}
			var assInfo = '';
			for(var i in assdata){
				assInfo += assdata[i].assistPeople+"："+assdata[i].assistBonus+"%；";
			}
			$("#updateRRassInfo").val(assInfo);
		}
	});
}
//修改已租信息
function doUpdateSourceInfo(){
	var statistics =0;
	//水计费
	var hrWaterPlan= $("#updateRhrWaterPlan").val();
	var shui = $("#qupdateRhrWaterPlan").attr("style");
	var s  = shui.indexOf("display");
	if(s<0){
		if($("#updateRhrWaterPlan").val()==''){
			$("#updateRhrWaterPlan").css('border', '1px solid red');
			statistics++;
		}
	}
	//电计费
	var hrElectritPlan= $("#updateRhrElectritPlan").val();
	var shui = $("#qupdateRhrElectritPlan").attr("style");
	var d  = shui.indexOf("display");
	if(d<0){
		if($("#updateRhrElectritPlan").val()==''){
			$("#updateRhrElectritPlan").css('border', '1px solid red');
			statistics++;
		}
	}
	//气计费
	var hrGasPlan= $("#updateRhrGasPlan").val();
	var shui = $("#qupdateRhrGasPlan").attr("style");
	var d  = shui.indexOf("display");
	if(d<0){
		if($("#updateRhrGasPlan").val()==''){
			$("#updateRhrGasPlan").css('border', '1px solid red');
			statistics++;
		}
	}
	//热水计费
	var hrHotWaterPlan= $("#updateRhrHotWaterPlan").val();
	var shui = $("#qupdateRhrHotWaterPlan").attr("style");
	var d  = shui.indexOf("display");
	if(d<0){
		if($("#updateRhrHotWaterPlan").val()==''){
			$("#updateRhrHotWaterPlan").css('border', '1px solid red');
			statistics++;
		}
	}
	//暖气计费
	var hrHotAirPlan= $("#updateRhrHotAirPlan").val();
	var shui = $("#qupdateRhrHotAirPlan").attr("style");
	var d  = shui.indexOf("display");
	if(d<0){
		if($("#updateRhrHotAirPlan").val()==''){
			$("#updateRhrHotAirPlan").css('border', '1px solid red');
			statistics++;
		}
	}
	if(statistics!=0){
		return;
	}
	
	
	var hrId = $("#updateRhrId").val();
	var hsId = $("#updateRhsId").val();
	var jhfHouseId = $("#updateRhsHouseId").val();
	var hrSectionType = $("#updateRhrSectionType").val();
	var hrHouseOwner = $("#updateRhrHouseOwner").val();
	var hrHouseDirection = $("#updateRhrHouseDirection").val();
	var hrHouseSquare = $("#updateRhrHouseSquare").val();
	var hrWaterVolFirst = $("#updateRhrWaterVolFirst").val();
	var hrElectritVolFirst = $("#updateRhrElectritVolFirst").val();
	var hrGasVolFirst = $("#updateRhrGasVolFirst").val();
	
	var hrHotWaterVolFirst = $("#updateRhrHotWaterVolFirst").val();
	var hrHotAirVolFirst = $("#updateRhrHotAirVolFirst").val();
	
	var hrHouseDeposit = $("#updateRhrHouseDeposit").val();
	var hrDoorDeposit = $("#updateRhrDoorDeposit").val();
	var hrPowerDeposit = $("#updateRhrPowerDeposit").val();
	var hrOtherDeposit = $("#updateRhrOtherDeposit").val();
	var hrBase = $("#updateRhrBase").val();
	var hrAdminUserId = $("#AdminUserGetUserId").val();
	var hrTvCharge= $("#updateRhrTvCharge").val();
	
	var hrWifiCharge= $("#updateRhrWifiCharge").val();
	
	
	var hrHouseKey = $("#updateRhrHouseKey").val();
	var hrFurnitureConfig = $("#updateRhrFurnitureConfig").val();
	var hrHouseNote = $("#updateRhrHouseNote").val();
	var hrHouseSquare = $("#updateRhrHouseSquare").val();
	var hrOtherPay = $('#updateRhrOtherPay').val();
	
	
	//var hrUserId = '';
	var hrManagerUserName = $('#updateRhrShowUserInfo').val();
	var hrManagerUserId = $('#updateRhrGetUserId').val();
	var hrDepartment = $('#updateRhrGetUserDetId').val();
	var hrStorefront = $('#updateRhrGetUserStoreId').val();
	//获取业务员的姓名
	var hrAdminUserName=$('#AdminUserShowUserInfo').val();
	
	
	
	var jhfFollowRemark = "综合修改，修改已租房信息：";
	if(_updateHouseInfo.hrManagerUserName!=hrManagerUserName){
		jhfFollowRemark+="房管员："+_updateHouseInfo.hrManagerUserName+" 改为 → "+hrManagerUserName+";";
		
	}
	if(_updateHouseInfo.hrAdminUserName!=hrAdminUserName){
		jhfFollowRemark+="业务员："+_updateHouseInfo.hrAdminUserName+" 改为 → "+hrAdminUserName+";";
		
	}
	if(_updateHouseInfo.hrSectionType!=hrSectionType){
		jhfFollowRemark+="户型："+_updateHouseInfo.hrSectionType+" 改为 → "+hrSectionType+";";
	}
	if(_updateHouseInfo.hrHouseOwner!=hrHouseOwner){
		jhfFollowRemark+="用途："+_updateHouseInfo.hrHouseOwner+" 改为 → "+hrHouseOwner+";";
	}
	if(_updateHouseInfo.hrHouseDirection!=hrHouseDirection){
		jhfFollowRemark+="朝向："+_updateHouseInfo.hrHouseDirection+" 改为 → "+hrHouseDirection+";";
	}
	if(_updateHouseInfo.hrHouseSquare!=hrHouseSquare){
		jhfFollowRemark+="面积："+_updateHouseInfo.hrHouseSquare+" 改为 → "+hrHouseSquare+";";
	}
	if(_updateHouseInfo.hrWaterVolFirst!=hrWaterVolFirst){
		jhfFollowRemark+="水底数："+_updateHouseInfo.hrWaterVolFirst+" 改为 → "+hrWaterVolFirst+";";
	}
	if(_updateHouseInfo.hrElectritVolFirst!=hrElectritVolFirst){
		jhfFollowRemark+="电底数："+_updateHouseInfo.hrElectritVolFirst+" 改为 → "+hrElectritVolFirst+";";
	}
	if(_updateHouseInfo.hrGasVolFirst!=hrGasVolFirst){
		jhfFollowRemark+="气底数："+_updateHouseInfo.hrGasVolFirst+" 改为 → "+hrGasVolFirst+";";
	}
	
	if(_updateHouseInfo.hrHotWaterVolFirst!=hrHotWaterVolFirst){
		jhfFollowRemark+="热水底数："+_updateHouseInfo.hrHotWaterVolFirst+" 改为 → "+hrHotWaterVolFirst+";";
	}
	if(_updateHouseInfo.hrHotAirVolFirst!=hrHotAirVolFirst){
		jhfFollowRemark+="暖气底数："+_updateHouseInfo.hrHotAirVolFirst+" 改为 → "+hrHotAirVolFirst+";";
	}
	
	if(_updateHouseInfo.hrHouseDeposit!=hrHouseDeposit){
		jhfFollowRemark+="房屋押金："+_updateHouseInfo.hrHouseDeposit+" 改为 → "+hrHouseDeposit+";";
	}
	if(_updateHouseInfo.hrDoorDeposit!=hrDoorDeposit){
		jhfFollowRemark+="门卡押金："+_updateHouseInfo.hrDoorDeposit+" 改为 → "+hrDoorDeposit+";";
	}
	if(_updateHouseInfo.hrPowerDeposit!=hrPowerDeposit){
		jhfFollowRemark+="水电押金："+_updateHouseInfo.hrPowerDeposit+" 改为 → "+hrPowerDeposit+";";
	}
	if(_updateHouseInfo.hrOtherDeposit!=hrOtherDeposit){
		jhfFollowRemark+="其他押金："+_updateHouseInfo.hrOtherDeposit+" 改为 → "+hrOtherDeposit+";";
	}
	if(_updateHouseInfo.hrHouseNote!=hrHouseNote){
		jhfFollowRemark+="备注："+_updateHouseInfo.hrHouseNote+" 改为 → "+hrHouseNote+";";
	}
	if(_updateHouseInfo.hrWifiCharge!=hrWifiCharge){
		jhfFollowRemark+="网费："+_updateHouseInfo.hrWifiCharge+" 改为 → "+hrWifiCharge+";";
	}
	if(_updateHouseInfo.hrTvCharge!=hrTvCharge){
		jhfFollowRemark+="电视费："+_updateHouseInfo.hrTvCharge+" 改为 → "+hrTvCharge+";";
	}
	if(_updateHouseInfo.hrOtherPay != hrOtherPay){
		jhfFollowRemark+="其他费："+_updateHouseInfo.hrOtherPay+" 改为 → "+hrOtherPay+";";
	}
	if(_updateHouseInfo.hrBase!=hrBase){
		jhfFollowRemark+="欠结金额："+_updateHouseInfo.hrBase+" 改为 → "+hrBase+";";
	}
	$('.do_overDiv').show();
	$.post("../updateNotRenting.action", {
		hrId 					: hrId,
		hrHouse4storeId		    : hsId,
		hrManagerUserName       : hrManagerUserName,
		hrAdminUserName         : hrAdminUserName,
		hrHouseId				: jhfHouseId,
		hrSectionType			: hrSectionType,
		hrHouseOwner			: hrHouseOwner,
		hrHouseDirection		: hrHouseDirection,
		hrHouseSquare			: hrHouseSquare,
		hrWaterVolFirst			: hrWaterVolFirst,
		hrElectritVolFirst		: hrElectritVolFirst,
		hrGasVolFirst			: hrGasVolFirst,
		
		hrHotWaterVolFirst		: hrHotWaterVolFirst,
		hrHotAirVolFirst		: hrHotAirVolFirst,
		
		hrHouseDeposit			: hrHouseDeposit,
		hrDoorDeposit			: hrDoorDeposit,
		hrPowerDeposit			: hrPowerDeposit,
		hrOtherDeposit			: hrOtherDeposit,
		hrBase					: hrBase,
		hrAdminUserId			: hrAdminUserId,
		hrManagerUserId         : hrManagerUserId,
		hrHouseKey				: hrHouseKey,
		hrFurnitureConfig		: hrFurnitureConfig,
		hrHouseNote				: hrHouseNote,
		hrWifiCharge			: hrWifiCharge,
		hrTvCharge				: hrTvCharge,
		hrWaterPlan				: hrWaterPlan,
		hrElectritPlan			: hrElectritPlan,
		hrGasPlan				: hrGasPlan,
		
		hrHotWaterPlan			: hrHotWaterPlan,
		hrHotAirPlan			: hrHotAirPlan,
		
		hrOtherPay              : hrOtherPay,
		hrManagerUserId         : hrManagerUserId,
		hrDepartment            : hrDepartment,
		hrStorefront            : hrStorefront,
	}, function(data) {
		if (data.code<0) {
			myTips(data.msg, "error");
			$('.do_overDiv').hide();
			return;
		}
		else{
			$('.do_overDiv').hide();
			myTips("修改成功!", "success");
			queryTrusteeship(_pageNum[0], 0, 1);
			$('#readonlyTruDlg').dialog('close')
		}
	});
}

//查询租客账单
function queryRenterPayment(page,type){
	var pageNum = 10;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var hrId = $('#updateRhrId').val();
	$.post("../queryPaymentInUpdateAll.action", {
		startNum 		: startNum,
		endNum 			: endNum,
		contractType 	: "renter",
		jciHouse4rentId	: hrId,
	},function(data){
		console.log(data);
		if (data.code<0) {
			sourcePage(0, 0, 2);
			$('#renterPaymentTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum, page, 2);
			}
			$("#renterPaymentTable").datagrid("loadData", data.body);
		}
	}, "json");
}
/*******************************已租end***************************************/

//租客、业主 账单修改窗口
function updateInstallment(type){
	var row, title, paymentDlg;
	if(type==0){
		row = $("#renterPaymentTable").datagrid("getSelected");
		if(row == null){
			myTips('请选中需要修改的行！', 'error');
			return;
		}
		title = '修改租客账单';
		paymentDlg = 'updateRenterPaymentDlg';
	}else{
		row = $("#landlordPaymentTable").datagrid("getSelected");
		if(row == null){
			myTips('请选中需要修改的行！', 'error');
			return;
		}
		title = '修改业主账单';
		paymentDlg = 'updateLandlordPaymentDlg';
		$("#landlordJciMoney").val(row.jciMoney);
	}
	$("#"+paymentDlg).dialog({
		title : title,
		top : getTop(150),
		left : getLeft(360),
		width : 360,
		height : 150,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$("#renterJciMoney").val(row.jciMoney);
	$("#renterJciState").val(row.jciState);
	if(type==0){
		$("#renterJciManageCost").val(row.jciManageCost);
		$("#renterJciServerCost").val(row.jciServerCost);
	}
	if(type==0){
		$("#updateRenterPaymentDlg").dialog("open");
	}else{
		$("#updateLandlordPaymentDlg").dialog("open");
	}
}
//租客 、租客 账单修改
function doUpdatePayment(type){
	
	if(type==0){
		var row = $("#renterPaymentTable").datagrid("getSelected");
		var jciMoney = $("#renterJciMoney").val();
		var jciState = $("#renterJciState").val();
		var jciManageCost = $("#renterJciManageCost").val();
		var jciServerCost = $("#renterJciServerCost").val();
		var jhfHouseId=$("#updateRhsHouseId").val();
		$.post("../updatePaymentInUpdateAll.action",{
			jciId 			: row.jciId,
			jciMoney 		: jciMoney,
			jciState 		: jciState,
			jciManageCost	: jciManageCost,
			jciServerCost 	: jciServerCost,
			hsHouseId       : jhfHouseId,
		},function(data){
			if(data.code < 0){
				myTips("修改失败","error");
			}else{
				myTips("修改成功","success");
				queryTrusteeship(_pageNum[0], 0, 0);
				queryRenterPayment(1,0);
				$('#updateRenterPaymentDlg').dialog('close');
			}
		});
	}else{
		var row = $("#landlordPaymentTable").datagrid("getSelected");
		var jciMoney = $("#landlordJciMoney").val();
		var jciState = $("#landlordJciState").val();
		var jhfHouseId=$("#updateRhsHouseId").val();
		$.post("../updatePaymentInUpdateAll.action",{
			jciId 		: row.jciId,
			jciMoney 	: jciMoney,
			jciState 	: jciState,
			hsHouseId   : jhfHouseId,
		},function(data){
			if(data.code < 0){
				myTips("修改失败","error");
			}else{
				myTips("修改成功","success");
				queryTrusteeship(_pageNum[0], 0, 0);
				queryLandlordPayment(1,0);
				$('#updateLandlordPaymentDlg').dialog('close');
			}
		});
	}
}

//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#trusteeshipPage").remove();
		$("#trusteeshipPageDiv").append("<div class='tcdPageCode' id='trusteeshipPage' style='text-align:center;'></div>");
		$("#trusteeshipPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				_pageNum[0] = p;
				_indexNum[0] = 0
				if (p <= pageNum) {
					queryTrusteeship(p, 1, 0);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 4);
		$("#followPage").remove();
		$("#followPageDiv")
				.append(
						"<div class='tcdPageCode' id='followPage' style='text-align:center;'></div>");
		$("#followPage").createPage({
			onePageNums : 4,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					var row = $('#trusteeshipDg').datagrid('getSelected');
					if(row){
						// queryFollow(row,p,1);
						queryFollow(p,1,row);
					}else{
					row = $('#trusteeshipDg').datagrid('getData').rows[0];
						// queryFollow(row,p,1);
						queryFollow(p,1,row);
					}
				}
			}
		});
	}
	if (type == 2) {
		pageNum = Math.ceil(totalNum / 10);
		$("#renterPage").remove();
		$("#renterPageDiv").append("<div class='tcdPageCode' id='renterPage' style='text-align:center;'></div>");
		$("#renterPage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenterPayment(p,1);
				}
			}
		});
	}
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 10);
		$("#landlordPage").remove();
		$("#landlordPageDiv").append("<div class='tcdPageCode' id='landlordPage' style='text-align:center;'></div>");
		$("#landlordPage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryLandlordPayment(p,1);
				}
			}
		});
	}
}
//自动发送
function hsAutoSendMsg(){
	var selRows = $('#trusteeshipDg').datagrid('getChecked');
	if(selRows.lenght==0||selRows==""){
		myTips('请勾选需要自动发送的信息！','error');
		return;
	}

//	var aa=[];
//	for (var i in selRows){
//		aa.push(selRows[i].hsId);
//	}
	/*var printArray = [];
	var obj={};*/
	/*for(var k in selRows){
		obj=selRows[k].hsId;
		console.log(obj);
	}*/
//	console.log(selRows);
//	console.log(aa);
	var hsIdStr = "";
	for(var i in selRows){
		hsIdStr += i==0 ? selRows[i].hsId : ","+selRows[i].hsId;
	}
	console.log(hsIdStr);
	$.post("../autoSendMsg.action",{
		jsonArray : hsIdStr
	},function(data){
		if(data.code<0){
			myTips(data.msg,'error');
			return;
		}
		myTips('设置成功','success');
		queryTrusteeship(_pageNum[0], 0, 0);
	});
//	printArray= JSON.stringify(printArray);
}
//手动发送
function hsManualSendMsg(){
	var  selRows = $('#trusteeshipDg').datagrid('getChecked');
	if(selRows.lenght==0||selRows==""){
		myTips('请勾选需要手动发送的信息！','error');
		return;
	}
	
	var hsIdStr = "";
	for(var i in selRows){
		hsIdStr += i==0 ? selRows[i].hsId : ","+selRows[i].hsId;
	}
	$.post("../manualSendMsg.action",{
		jsonArray : hsIdStr
	},function(data){
		if(data.code<0){
			myTips(data.msg,'error');
			return;
		}
		myTips('设置成功','success');
		queryTrusteeship(_pageNum[0], 0, 0);
	});
}


//下定状态颜色显示
function depositStateFormatter(value, row, index) {
	if (row.hsDownDeposit == "是") {
		return "<a style='text-decoration:none;color:red;'>已定<a>";
	} else {
		return "<a style='text-decoration:none;color:blue;'>未定<a>";
	}
}
//租赁状态颜色显示
function hsLeaseStateFormatter(value, row, index) {
	if (row.hsLeaseState == "已租") {
		return "<a style='text-decoration:none;color:green;'>已租<a>";
	} else{
		return "<a style='text-decoration:none;color:blue;'>"+row.hsLeaseState+"<a>";
	}
}

//发送方式
function hsAutoSendMsgmatter(value, row, index) {
	if (row.hsAutoSendMsg == "1") {
		return "<span style='text-decoration:none;color:green;'>自动发送<span>";
	} else{
		return "<a style='text-decoration:none;color:blue;'>手动发送<a>";
	}
}
//租客账单状态列格式
function formatRenterState(value, row, index) {
	if (row.jciState == '待收') {
		return "<a style='text-decoration:none;color:blue;'>" + row.jciState + "<a>";
	} else if (row.jciState == '已收'){
		return "<a style='text-decoration:none;color:green;'>" + row.jciState + "<a>";
	} else {
		return row.jciState;
	}
}
//房东账单状态列格式
function formatLandlordState(value, row, index) {
	if (row.jciState == '待付') {
		return "<a style='text-decoration:none;color:blue;'>" + row.jciState + "<a>";
	} else if (row.jciState == '已付'){
		return "<a style='text-decoration:none;color:green;'>" + row.jciState + "<a>";
	} else {
		return row.jciState;
	}
}

/*********************************租客、业主 收益人处理*****************************************/
//业绩受益人修改
function beneficiariesOfPerformance(num){
	$("#beneficiariesOfPerformanceDlg").dialog({
		title : '业绩受益人信息',
		top : getTop(300),
		left : getLeft(600),
		width : 600,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			clearCard();
		}
	});
	if(num == 1){
		$('#rentAssTableDlv').show();
		$('#storeAssTableDlv').hide();
	}
	if(num == 2){
		$('#rentAssTableDlv').hide();
		$('#storeAssTableDlv').show();
	}
	$("#beneficiariesOfPerformanceDlg").dialog('open');
	performanceData(num);
}
//受益人数据
function performanceData(num){
	var row = $('#trusteeshipDg').datagrid('getSelected');
	console.log(row);
	var stHouse4rent, stHouse4store, stType
	if(num == 1){
		stHouse4rent = row.hrId
		stHouse4store = null;
		stType = '出房';
	}else if(num == 2){
		stHouse4rent = null;
		stHouse4store = row.hsId
		stType = '存房';
	}
		//业绩受益人
	$.post("../queryAllTransactionAssistance.action", {
		assistHouse4rent   : stHouse4rent,
		assistHouse4store  : stHouse4store,
		assistType         : stType,
	}, function(assdata) {
		if(assdata.code<0){
			if(num == 1){
				$('#rentassistanceDg').datagrid({ data:[], view:myview, emptyMsg:'暂无业绩受益人！' });
			}else if(num == 2){
				$('#storeassistanceDg').datagrid({ data:[], view:myview, emptyMsg:'暂无业绩受益人！' });
			}
			return;
		}
		assdata=assdata.body;
		if(assdata == null){
			assdata = [];
		}
		if(num == 1){
			$("#rentassistanceDg").datagrid("loadData", assdata);
		}else if(num == 2){
			$("#storeassistanceDg").datagrid("loadData", assdata);
		}
	});
}
//打开添加业绩受益人对话框
function addAssistance(type){
	var row = $('#trusteeshipDg').datagrid('getSelected');
	var rentRow = $("#rentassistanceDg").datagrid('getRows');
	var storeRow = $("#storeassistanceDg").datagrid('getRows');
	if(type==0){
		if(rentRow.length!=0){
			$.messager.alert('通知','已经存在出房业绩受益人，请进行修改出房业绩受益人操作！',"error");
			return;
		}
		$("#addAssistanceDlg").dialog({
			title : "添加出房业绩受益人",
			top : getTop(430),
			left : getLeft(650),
			width : 650,
			height : 430,
			closed : true,
			cache : false,
			modal : true,
			onClose:function(){
				$("#addAssistanceTable").datagrid("loadData", []);
			}
		});
		clear();
		$("#addAssistType").val("出房");
	}else if(type==1){
		if(storeRow.length!=0){
			$.messager.alert('通知','已经存在存房业绩受益人，请进行修改存房业绩受益人操作！',"error");
			return;
		}
		$("#addAssistanceDlg").dialog({
			title : "添加存房房业绩受益人",
			top : getTop(430),
			left : getLeft(650),
			width : 650,
			height : 430,
			closed : true,
			cache : false,
			modal : true,
			onClose:function(){
				$("#addAssistanceTable").datagrid("loadData", []);
			}
		});
		clear();
		$("#addAssistType").val("存房");
	}
	$(".add_installment_userName").val(_loginUserName);
	$(".add_installment_userId").val(_loginUserId);
	$("#addBtn").show();
	$("#updateBtn").hide();
	$("#rentId").val(row.hrId);
	$("#storeId").val(row.hsId);
	$("#addAssistAddress").val(row.addCommunity+" " +row.addBuilding+"-" +row.addDoorplateno);
	$("#addAssistanceDlg").dialog('open');
	$('#addAssistanceTable').datagrid({
		columns : [ [					
		{
			field : 'assistAddress',
			title : '地址',
			width : 40,
			align : 'center',
		},
		{
			field : 'assistPeople',
			title : '业绩受益人',
			width : 20,
			align : 'center',
		},
		{
			field : 'assistType',
			title : '类型',
			width : 20,
			align : 'center',
		},
		{
			field : 'assistBonus',
			title : '比例',
			width : 20,
			align : 'center',
			editor : 'textbox'
		},
		{
			field : 'deleteAdd',
			title : '删除',
			width : 10,
			align : 'center',
			formatter : 
				function(value, row, index) {
					return "<a href='#' onclick=\"myDeleteRows('"+row.assistUserId+"','assistUserId','addAssistanceTable',0);\">删除</a>";
				}
		} ] ],
		width : '100%',
		height : '100%',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
	});
}
//添加一条业绩受益人
function addToDataGrid() {
	//业绩受益人姓名
	var assistPeople = $('#addAssistanceStaffShowUserInfo').val().split(' ')[$('#addAssistanceStaffShowUserInfo').val().split(' ').length-1];
	
	//var assistPeople = $('#addAssistanceStaff').find('option:selected').text();
	//业绩受益人部门ID
	var assistDepartment = $('#addAssistanceStaffGetUserDetId').val();
	//业绩受益人分店ID
	var assistStorefront = $('#addAssistanceStaffGetUserStoreId').val();
	//业绩受益人ID
	var assistUserId = $('#addAssistanceStaffGetUserId').val();
	//已租ID
	var assistHouse4rent = $('#rentId').val();
	//未租ID
	var assistHouse4store = $('#storeId').val();
	//详细地址
	var assistAddress = $('#addAssistAddress').val();
	//类型
	var assistType = $('#addAssistType').val();
	//比例
	var assistBonus = $('#addAssistBonus').val();
	//console.log(assistHouse4rent+"---"+assistHouse4store);
	if (assistType == '') {
		$('.errorMsg').html("请选择类型");
		return;
	}
	if (assistType == '存房' && assistHouse4store == '') {
		$('.errorMsg').html("请选择房源");
		return;
	}
	if (assistType == '出房' && (assistHouse4rent == '' || assistHouse4store == '')) {
		$('.errorMsg').html("请选择房源");
		return;
	}
	if (assistUserId == '') {
		$('.errorMsg').html("请选择业绩受益人");
		return;
	}
	if (assistBonus == '') {
		$('.errorMsg').html("请输入比例");
		return;
	}
	var dataJson = {
		assistPeople : assistPeople,
		assistDepartment:assistDepartment,
		assistStorefront:assistStorefront,
		assistUserId : assistUserId,
		assistHouse4rent : assistHouse4rent,
		assistHouse4store : assistHouse4store,
		assistAddress : assistAddress,
		assistType : assistType,
		assistBonus : assistBonus
	};
	var rows = $("#addAssistanceTable").datagrid("getRows");
	if(percentValidate(rows,assistBonus,assistType,assistHouse4rent,assistHouse4store,assistUserId)){
		$('#addAssistanceTable').datagrid('insertRow', {
			index : 0,
			row : dataJson
		});
	}
}
//验证比例是否合法
function percentValidate(rows,assistBonus,assistType,assistHouse4rent,assistHouse4store,assistUserId){
	var a = 0;
	if(assistBonus <= 0 || assistBonus > 100){
		$(".errorMsg").html("比例错误");
		return false;
	}
	if(rows.length > 0){
		for(var i in rows){
			if(assistType=="存房"){
				if(rows[i].assistHouse4store==assistHouse4store){
					a += rows[i].assistBonus*1;
					if(rows[i].assistUserId == assistUserId){
						$(".errorMsg").html("业绩受益人重复");
						return false;
					}
				}
			}else{
				if(rows[i].assistHouse4rent==assistHouse4rent){
					a += rows[i].assistBonus*1;
					if(rows[i].assistUserId == assistUserId){
						$(".errorMsg").html("业绩受益人重复");
						return false;
					}
				}
			}
		}
		if(a+assistBonus*1>100){
			$(".errorMsg").html("比例错误");
			return false;
		}
	}
	$(".errorMsg").html("");
	return true;
}
//执行添加业绩受益人
function doAddAssistance(){
	if(!percentValidateAgain()){
		return;
	}
	$('.do_overDiv').show();
	var rows = $("#addAssistanceTable").datagrid("getRows");
	var assistRegisterPeople = '"assistRegisterPeople":"'+ _loginUserId + '"';
	var strArray = assistRegisterPeople ;
	var jsonStrArry = '';
	var number;
	for(var i in rows){
		var assistType = '"assistType":"' + rows[i].assistType + '"';
		var assistHouse4store = '';
		var assistHouse4rent = '';
		if(rows[i].assistHouse4store != null && rows[i].assistHouse4store != ''){
			assistHouse4store = '"assistHouse4store":"' + rows[i].assistHouse4store + '"';
		}else{
			assistHouse4store = '"assistHouse4store":""';
		}
		if(rows[i].assistHouse4rent != null && rows[i].assistHouse4rent != ''){
			assistHouse4rent = '"assistHouse4rent":"' + rows[i].assistHouse4rent + '"';
			number = 1;
		}else{
			assistHouse4rent = '"assistHouse4rent":""';
			number = 2;
		}
		if(rows[i].assistType=='存房'){
			assistHouse4rent = '"assistHouse4rent":""';
			number = 2;
		}
		var assistStorefront = '"assistStorefront":"' + rows[i].assistStorefront + '"';
		var assistDepartment = '"assistDepartment":"'+rows[i].assistDepartment+ '"';
		var assistUserId = '"assistUserId":"' + rows[i].assistUserId + '"';
		var assistBonus = '"assistBonus":"'+rows[i].assistBonus+ '"';
		if(i==0){
			jsonStrArry += "{" + strArray + "," + assistType + "," + assistHouse4store + "," + assistHouse4rent + "," 
			+ assistStorefront + ","+ assistDepartment + "," + assistUserId + "," + assistBonus + "}";
		}else{
			jsonStrArry += ",{" + strArray + "," + assistType + "," + assistHouse4store + "," + assistHouse4rent + "," 
			+ assistStorefront + ","+ assistDepartment + "," + assistUserId + "," + assistBonus + "}";
		}
	}
	jsonStrArry =  "[" + jsonStrArry + "]";
	
	$.post("../insertTAList.action",{
		jsonArray : jsonStrArry
	},function(data) {
		if (data < 0||data=='') {
			myTips('添加失败！', 'error');
			$('.do_overDiv').hide();
			return;
		}
		$("#addAssistanceTable").datagrid("loadData", []);
		$('#addAssistanceDlg').dialog('close');
		myTips('添加成功！', 'success');
		$('.do_overDiv').hide();
		queryTrusteeship(_pageNum[0], 0, 0);
		performanceData(number);
		if(number == 1){
			rentedDataLoading();
		}else if(number == 2){
			nonRentedInformationProcessing();
		}
	});
}

//打开修改业绩受益人对话框
function updateAssistance(type){
	var row = $('#trusteeshipDg').datagrid('getSelected');
	var rentRow = $("#rentassistanceDg").datagrid('getRows');
	var storeRow = $("#storeassistanceDg").datagrid('getRows');
	if(type==0){
		if(rentRow.length==0){
			myTips("无出房业绩受益人，请进行添加出房业绩受益人操作！","error");
			return;
		}
		$("#addAssistanceDlg").dialog({
			title : "修改出房业绩受益人",
			top : getTop(430),
			left : getLeft(650),
			width : 650,
			height : 430,
			closed : true,
			cache : false,
			modal : true,
			onClose:function(){
				$("#addAssistanceTable").datagrid("loadData", []);
			}
		});
		clear();
		$("#addAssistType").val("出房");
	}else if(type==1){
		if(storeRow.length==0){
			myTips("无存房业绩受益人，请进行添加存房业绩受益人操作！","error");
			return;
		}
		$("#addAssistanceDlg").dialog({
			title : "修改存房业绩受益人",
			top : getTop(430),
			left : getLeft(650),
			width : 650,
			height : 430,
			closed : true,
			cache : false,
			modal : true,
			onClose:function(){
				$("#addAssistanceTable").datagrid("loadData", []);
			}
		});
		clear();
		$("#addAssistType").val("存房");
	}
	$(".add_installment_userName").val(_loginUserName);
	$(".add_installment_userId").val(_loginUserId);
	$("#addBtn").hide();
	$("#updateBtn").show();
	$("#rentId").val(row.hrId);
	$("#storeId").val(row.hsId);
	$("#addAssistAddress").val(row.addCommunity+" " +row.addBuilding+"-" +row.addDoorplateno);
	$("#addAssistanceDlg").dialog('open');
	$('#addAssistanceTable').datagrid({
		columns : [ [					
				{
					field : 'assistAddress',
					title : '地址',
					width : 40,
					align : 'center',
				},
				{
					field : 'assistPeople',
					title : '业绩受益人',
					width : 20,
					align : 'center',
				},
				{
					field : 'assistType',
					title : '类型',
					width : 20,
					align : 'center',
				},
				{
					field : 'assistBonus',
					title : '比例',
					width : 20,
					align : 'center',
					editor : 'textbox'
				},
				{
					field : 'deleteAdd',
					title : '删除',
					width : 10,
					align : 'center',
					formatter : 
						function(value, row, index) {
							return "<a href='#' onclick=\"myDeleteRows('"+row.assistUserId+"','assistUserId','addAssistanceTable',0);\">删除</a>";
						}
				} ] ],
		width : '100%',
		height : '100%',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
	});
}
//执行修改业绩受益人
function doUpdateAssistance(){
	if(!percentValidateAgain()){
		return;
	}
	$('.do_overDiv').show();
	var rows = $("#addAssistanceTable").datagrid("getRows");
	var assistRegisterPeople = '"assistRegisterPeople":"'+ _loginUserId + '"';
	var strArray = assistRegisterPeople ;
	var jsonStrArry = '';
	var number;
	for(var i in rows){
		var assistType = '"assistType":"' + rows[i].assistType + '"';
		var assistHouse4store = '';
		var assistHouse4rent = '';
		if(rows[i].assistHouse4store != null && rows[i].assistHouse4store != ''){
			assistHouse4store = '"assistHouse4store":"' + rows[i].assistHouse4store + '"';
		}else{
			assistHouse4store = '"assistHouse4store":""';
		}
		if(rows[i].assistHouse4rent != null && rows[i].assistHouse4rent != ''){
			assistHouse4rent = '"assistHouse4rent":"' + rows[i].assistHouse4rent + '"';
			number = 1;
		}else{
			assistHouse4rent = '"assistHouse4rent":""';
			number = 2;
		}
		if(rows[i].assistType=='存房'){
			assistHouse4rent = '"assistHouse4rent":""';
			number = 2;
		}
		var assistStorefront = '"assistStorefront":"' + rows[i].assistStorefront + '"';
		var assistDepartment = '"assistDepartment":"' + rows[i].assistDepartment + '"';
		var assistUserId = '"assistUserId":"' + rows[i].assistUserId + '"';
		var assistBonus = '"assistBonus":"'+rows[i].assistBonus+ '"';
		if(i==0){
			jsonStrArry += "{" + strArray + "," + assistType + "," + assistHouse4store + "," + assistHouse4rent + "," 
			+ assistStorefront + ","+ assistDepartment + "," + assistUserId + "," + assistBonus + "}";
		}else{
			jsonStrArry += ",{" + strArray + "," + assistType + "," + assistHouse4store + "," + assistHouse4rent + "," 
			+ assistStorefront + ","+ assistDepartment + "," + assistUserId + "," + assistBonus + "}";
		}
	}
	jsonStrArry =  "[" + jsonStrArry + "]";
	
	$.post("../updateAssist.action",{
		jsonArray : jsonStrArry
	},
	function(data) {
		if (data < 0||data=='') {
			myTips('修改失败！', 'error');
			$('.do_overDiv').hide();
			return;
		} else {
			$("#addAssistanceTable").datagrid("loadData", []);
			$('#addAssistanceDlg').dialog('close');
			myTips('修改成功！', 'success');
			$('.do_overDiv').hide();
			queryTrusteeship(_pageNum[0], 0, 0);
			performanceData(number);
			if(number == 1){
				rentedDataLoading();
			}else if(number == 2){
				nonRentedInformationProcessing();
			}
		}
	});
}
//保存时再次验证
/*
存房、未租房id、业绩受益人id  比例求和
出房、已租房id、业绩受益人id  比例求和

1.定义一个数组存各个房的比例和
1-1 获取全部未租房id，已租房id，存入storeIds[n1] rentIds[n2]
1-2 创建数组bonus[num]
1-3 遍历bonus[num]
	到idArray[num]获取对应的房id
	遍历rows匹配id 累加比例存入bonus
2.判断该数组中是否每个数都是100
*/
function percentValidateAgain(){
	var rows = $("#addAssistanceTable").datagrid("getRows");
	if (rows.length == 0) {
		$(".errorMsg").html("没有可用于添加的数据");
		return false;
	}
	for(var i in rows){
		if(rows[i].assistBonus <= 0 || rows[i].assistBonus > 100){
			$(".errorMsg").html("比例错误");
			return false;
		}
	}
	var storeIds = [];
	var rentIds = [];
	for(var i in rows){
		if(rows[i].assistType == "存房" && storeIds.indexOf(rows[i].assistHouse4store) == -1){
			storeIds.push(rows[i].assistHouse4store);
		}else if(rows[i].assistType == "出房" && rentIds.indexOf(rows[i].assistHouse4rent) == -1){
			rentIds.push(rows[i].assistHouse4rent);
		}
	}
	var storeBonus = new Array(storeIds.length);
	var rentBonus = new Array(rentIds.length);
	for(var i=0;i<storeBonus.length;i++){
		storeBonus[i] = 0;
		for(var j in rows){
			if(rows[j].assistType == "存房" && rows[j].assistHouse4store == storeIds[i]){
				storeBonus[i] += rows[j].assistBonus*1;
			}
		}
	}
	for(var i=0;i<rentBonus.length;i++){
		rentBonus[i] = 0;
		for(var j in rows){
			if(rows[j].assistType == "出房" && rows[j].assistHouse4rent == rentIds[i]){
				rentBonus[i] += rows[j].assistBonus*1;
			}
		}
	}
	for(var i in storeBonus){
		if(storeBonus[i] != 100){
			$(".errorMsg").html("比例错误");
			return false;
		}
	}
	for(var i in rentBonus){
		if(rentBonus[i] != 100){
			$(".errorMsg").html("比例错误");
			return false;
		}
	}
	return true;
}
function clear(){
	$("#addAssistType").val("");
	$("#addAssistAddress").val("");
	$("#rentId").val("");
	$("#storeId").val("");
	$("#addAssistanceDept").val("");
	$("#addAssistanceStaff").val("");
	$("#addAssistBonus").val("");
	$('#searchBelongType').val("");
	$('.errorMsg').html("");
}
/****************************业绩受益人end****************************/

//到期时间根据开始时间及合同期限改变而改变
function changeDate(type) {
	if(type==0){
		if($(".jrrBeginTime").val()==''){
			return;
		}
		// 当期限不都为0时进行计算
		if (!($(".jrrTheTermYear").val() == 0 && $(".jrrTheTermMonth").val() == 0 && $(".jrrTheTermDay").val() == 0)) {
			var sMonth = (parseInt($(".jrrTheTermMonth").val()) + parseInt($(
					".jrrTheTermYear").val()) * 12);
			var sDay = parseInt($(".jrrTheTermDay").val() - 1);
			var beginDate = new Date($(".jrrBeginTime").val());
			beginDate.setMonth(beginDate.getMonth() + sMonth);
			beginDate.setDate(beginDate.getDate() + sDay);
			$(".jrrEndTime").val(formatDate(beginDate));
		} else {// 全为0则结束时间设空
			$(".jrrEndTime").val("");
		}
		$(".jrrTheTerm").val($(".jrrTheTermYear").val()+"年"+$(".jrrTheTermMonth").val()+"月"+$(".jrrTheTermDay").val()+"日");
	}else{
		if($(".jrlBeginTime").val()==''){
			return;
		}
		// 当期限不都为0时进行计算
		if (!($(".jrlTheTermYear").val() == 0 && $(".jrlTheTermMonth").val() == 0 && $(".jrlTheTermDay").val() == 0)) {
			var sMonth = (parseInt($(".jrlTheTermMonth").val()) + parseInt($(
					".jrlTheTermYear").val()) * 12);
			var sDay = parseInt($(".jrlTheTermDay").val() - 1);
			var beginDate = new Date($(".jrlBeginTime").val());
			beginDate.setMonth(beginDate.getMonth() + sMonth);
			beginDate.setDate(beginDate.getDate() + sDay);
			$(".jrlEndTime").val(formatDate(beginDate));
		} else {// 全为0则结束时间设空
			$(".jrlEndTime").val("");
		}
		$(".jrlTheTerm").val($(".jrlTheTermYear").val()+"年"+$(".jrlTheTermMonth").val()+"月"+$(".jrlTheTermDay").val()+"日");
		$(".jrlPriceLadder").val("");
		$(".jrlRentFreeSegment").val("");
		settingPriceLadder();
	}
}

//获取交租日当月是多少号
function acquisitionOfRentDay(){
	var timeBegin, advanceMode, str;
	timeBegin = $('.jrrBeginTime').val()
	advanceMode = $('#advanceMode').val();
	str = timeBegin.split('-')
	if(str != ''){
		if(advanceMode == 1){
			$('#jrrInAdvancePay').val(str[2]);
		}else{
			$('#jrrInAdvancePay').val(1);
		}
	}else{
		$('#jrrInAdvancePay').val(1);
	}
}

function clearRentFreeSegment(){
	$(".jrlRentFreeSegment").val("");
}
function changeRentFreeSegment(i,type){
	if(type == 0){
		var beginTime = $("#holidaySettingA" + i).val();
		var days = $("#holidaySumBefor" + i).val();
		$("#holidaySettingB" + i).val(renewalDate(beginTime,days,3));
	}else if(type == 1){
		var endTime = $("#holidaySettingD" + i).val();
		var days = $("#holidaySumAfter" + i).val();
		$("#holidaySettingC" + i).val(renewalDate(endTime,days,4));
	}
}