$(function() {
	fristLoading()
	
});
function fristLoading(){

	advancedScreening(0);
	$("#searchJfCheckInTimeEnd").val(formatTime(getNowFormatDate(), 2));
	showFinancilTypeSearch('financilSearch','queryFinancial(1)');
	showAddFinancilTypeSearch('financilAdd','');
	showReFinancilTypeSearch('financilReplaced','');
	showOweFinancilTypeSearch('financilOwe','');
	for (var i in _loginCompanyRentDistrict) {
		$("#searchDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
		$("#searchAddDistrict").append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
	$('#financialDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			var row = $('#financialDg').datagrid('getSelected');
			if (row) {
				$(".financialInfo_index").val(rowIndex);
				queryFinancialInfo(row);
			}
		}, rowStyler:function(index,row){
	        if (row.jfStrikeABalanceStatus=='冲账' || row.jfStrikeABalanceStatus=='被冲账'){
	            return {'class':'datagrid-row-gainsboro'};
	        }   
	    }   
	});
	dgShowOrHideInit("financialDg");
	//排序点击事件 
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
			queryFinancial(1);
		}else if(clickId.indexOf("theSortContrary")>-1){
			var alltheSortContrary = $('.theSortContrary');
			$('.theSortContrary').each(function(){
				$(this).removeClass("theSortContrarySelect");
			});
			$("#"+clickId).addClass("theSortContrarySelect");
			$('#theSortContraryInput').val($("#"+clickId).attr("searchVal"));
			queryFinancial(1);
		}else{
			$("#theSortDlg").fadeOut();
		}
	});
	for (var i in _acountType) {
		$('.add_financial_way').append(
				"<option value='" + i + "'>" + _acountType[i] + "</option>");
		$('#searchWay').append(
				"<option value='" + i + "'>" + _acountType[i] + "</option>");
		$('#setRenterEveryFinancialWay').append(
				"<option value='" + i + "'>" + _acountType[i] + "</option>");
		$('#setRenterNewFinancialWay').append(
				"<option value='" + i + "'>" + _acountType[i] + "</option>");
	}
	for (var i in _strikeAbalanceStatus) {
		$('#searchJfStrikeAbalanceStatus').append(
				"<option value='" + i + "'>" + _strikeAbalanceStatus[i] + "</option>");
	}
	for (var i in _theOwnershipType) {
		$('#searchJfTheOwnershipType').append(
				"<option value='" + i + "'>" + _theOwnershipType[i] + "</option>");
	}
	for (var i in _payType) {
		$('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
	}
	$("#searchCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$("#searchCity").val(0);
	$("#searchAddCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$("#searchAddCity").val(0);
	queryFinancial(1);

	
	
}

//高级筛选
function advancedScreening(num){
	if(num == 0){
		$('.advancedScreening').css({
			"height" : "32px",
			"width"  : '700px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "32px",
		})
		$('.advanced2').css({
			"height" : "0px",
		})
		$('.advanced3').css({
			"height" : "0px",
		})
		$('#screening').attr('onclick','advancedScreening(1)');
	}else if(num == 1){
		$('.advancedScreening').css({
			"height" : "92px",
			"width"  : '100%',
		})
		$('.advanced1').css({
			"height" : "32px",
		})
		$('.advanced2').css({
			"height" : "25px",
		})
		$('.advanced3').css({
			"height" : "25px",
		})
		$('#screening').attr('onclick','advancedScreening(0)');
	}
}

var IsCheckFlag = -1; //标示是否是勾选复选框选中行的

//收支记录表导入信息
function queryFinancial(page) {
	_pageNum[0] = page;
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	  
	var jfCertificateNumber = $('#searchJfCertificateNumber').val();
	var jfFinancialCoding = $('#searchJfFinancialCoding').val();
	var jfTicketNumber = $('#searchJfTicketNumber').val();
	   
	var jfAuditState= $('#searchJfAuditState').val();
	var jfStrikeABalanceStatus= $('#searchJfStrikeAbalanceStatus').find('option:selected').text();
	var jfTheOwnershipType= $('#searchJfTheOwnershipType').find('option:selected').text();
	
	var jfNatureOfThe= $('#financilSearchJfNatureOfThe').val();
	var jfBigType= $('#financilSearchJfBigType').val();
	var jfAccountingSpecies= $('#financilSearchJfAccountingSpecies').val();
	
	var startTime =  $('#searchJfCheckInTimeStart').val();
	var endTime =  $('#searchJfCheckInTimeEnd').val();
	var jfAccountId =  $('#searchAccountName').val();
	var jfPayType =  $('#searchPayType').val();
	
	var addCity= $("#searchCity").find("option:selected").text();
	var addDistrict= $("#searchDistrict").find("option:selected").text();
	var addZone= $("#searchZone").find("option:selected").text();
	var addCommunity= $("#searchCommunity").val();
	var addBuilding= $("#sourceBuilding").val();
	var addDoorplateno= $("#sourceDoorplateno").val();
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	if(endTime!=''){
		endTime = new Date(endTime);
		endTime.setDate(endTime.getDate() + 1);
		endTime =  formatDate(endTime);
	}
	$.post("../queryFinancial.action", {
		startNum 				: startNum,
		endNum 					: endNum,
		theSortTerm 			: theSortTerm,
		theSortContrary 		: theSortContrary,
		jfCertificateNumber		: jfCertificateNumber,
		jfFinancialCoding		: jfFinancialCoding,
		jfTicketNumber			: jfTicketNumber,
		jfAuditState			: jfAuditState,
		jfStrikeABalanceStatus	: jfStrikeABalanceStatus,
		jfTheOwnershipType		: jfTheOwnershipType,
		jfNatureOfThe			: jfNatureOfThe,
		jfBigType				: jfBigType,
		jfAccountingSpecies		: jfAccountingSpecies,
		startTime				: startTime,
		endTime					: endTime,
		jfAccountId				: jfAccountId,
		addDistrict				: addDistrict,
		addZone					: addZone,
		addCommunity			: addCommunity,
		addBuilding				: addBuilding,
		addDoorplateno			: addDoorplateno,
		jfPayType				: jfPayType,
		splitFlag				: 1,
	}, function(data) {
		if (data.code<0) {
			$('#financialDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryFinancial","financial");
			}else{
				notCountPage(page, 0 ,"queryFinancial","financial");
			}
		} else {
			data=data.body;
			if(data.length<20){
				notCountPage(page, 2 , "queryFinancial","financial");
			}else{
				notCountPage(page, 1 , "queryFinancial","financial");
			}
			console.log(data)
			$("#financialDg").datagrid("loadData", data);
		}
	}, "json");
}

//分页统计总条数
function getfinancialPageCount(page){
	var pageSize = 20;
	var addCommunity= $("#searchCommunity").val();
	var addBuilding= $("#sourceBuilding").val();
	var addDoorplateno= $("#sourceDoorplateno").val();
	var jfAuditState= $('#searchJfAuditState').val();
	
	$.post("../queryFinancial.action", {
		addCommunity	: addCommunity,
		addBuilding		: addBuilding,
		addDoorplateno	: addDoorplateno,
		jfAuditState	: jfAuditState,
		splitFlag: 0,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"financial",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"financial",0);
		}
	});
}

//上一条下一条
function laterOrNext(type) {
	var dataIndex = $(".financialInfo_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".financialInfo_index").val(num);
			changeData = $('#financialDg').datagrid('getData').rows[num];
			$('#financialDg').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#financialDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".financialInfo_index").val(num);
			changeData = $('#financialDg').datagrid('getData').rows[num];
			$('#financialDg').datagrid('selectRow',num);
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
		queryFinancialInfo(changeData);
	}
}

function queryFinancialInfo(row){
	if(row.jfAuditState=='已复核'){
		$("#doStrike").hide();
		$("#doAuditOne").hide();
		$("#doAuditTwo").hide();
	}else if(row.jfAuditState=='已审核'){
		if(row.jfStrikeABalanceStatus == '冲账'){
			$("#doStrike").hide();
		}else{
			$("#doStrike").show();
		}
		$("#doAuditOne").hide();
		$("#doAuditTwo").show();
	}else if(row.jfAuditState=='未审核'){
		if(row.jfStrikeABalanceStatus == '冲账'){
			$("#doStrike").hide();
		}else{
			$("#doStrike").show();
		}
		$("#doAuditOne").show();
		$("#doAuditTwo").hide();
	}else if(row.jfAuditState=='无效'|| row.jfStrikeABalanceStatus == '被冲账'){
		$("#doStrike").hide();
		$("#doAuditOne").hide();
		$("#doAuditTwo").hide();
	}else if(row.jfAuditState=='审核不通过'||row.jfAuditState=='复核不通过'){
		$("#doStrike").show();
		$("#doAuditOne").hide();
		$("#doAuditTwo").hide();
	}
	
	$(".financialInfo_payType").val(row.jfPayType);
	$(".financialInfo_nowBalance").val(row.jfNowBalance);
	$(".financialInfo_cashierPeopleName").val(row.cashierPeopleName);
	$(".financialInfo_reviewOneName").val(row.reviewOneName);
	$(".financialInfo_reviewerName").val(row.reviewerName);
	$(".financialInfo_handlersName").val(row.handlersName);
	$(".financialInfo_jfStrikeAbalanceStatus").val(row.jfStrikeABalanceStatus);
	$(".financialInfo_jfAuditState").val(row.jfAuditState);
	$(".financialInfo_jfCertificateNumber").val(row.jfCertificateNumber);
	$(".financialInfo_jfBillingDate").val(row.jfBillingDate);
	$(".financialInfo_jfTheOwnershipType").val(row.jfTheOwnershipType);
	$(".financialInfo_jfBelongingToTheName").val(row.jfBelongingToTheName);
	$(".financialInfo_jfClosedWay").val(row.jfClosedWay);
	$(".financialInfo_jfNatureOfThe").val(row.jfNatureOfThe);
	$(".financialInfo_jfAccountingSpecies").val(row.jfAccountingSpecies);
	$(".financialInfo_jfSumMoney").val(row.jfSumMoney);
	$(".financialInfo_jfFinanNote").val(row.jfFinanNote);
	$(".financialInfo_jfFinancialCoding").val(row.jfFinancialCoding);
	$(".financialInfo_belongBegin").val(row.jfStartCycle);
	$(".financialInfo_belongEnd").val(row.jfEndCycle);
	$(".financialInfo_jfClosedWay").val(row.jfClosedWay);
	$(".financialInfo_bankName").val('无');
	$(".financialInfo_bankNums").val('无');
	$(".financialInfo_bankBelong").val('无');
	if(!(row.jfAccountId==null||row.jfAccountId=='')){
		$.post("../selectNamePublic.action", {
			faId:row.jfAccountId
		}, function(data) {
			$(".financialInfo_bankName").val(data.body[0].faUserName);
			$(".financialInfo_bankNums").val(data.body[0].faAccount);
			$(".financialInfo_bankBelong").val(data.body[0].faBelonging);
		});
	}
	$(".financialInfo_nums").val(row.jfTicketNumber);
	if(row.jfAccountingWhy!=null&&row.jfAccountingWhy!=""){
		$(".financialInfo_jfAccountingWhy").val(row.jfAccountingWhy);
	}else{
		$(".financialInfo_jfAccountingWhy").val(row.addCommunity+row.addBuilding+row.addDoorplateno);
	}
	
	if (row.jfHouse4rentId != null && row.jfHouse4rentId != '') {
		$(".financialInfo_houseCoding").val(row.jfHouse4rentId);
		$(".financialInfo_belongId").val(row.jfRenterId);
	}
	if ((row.jfHouse4rentId == null || row.jfHouse4rentId == '') && row.jfHouse4storeId != null && row.jfHouse4storeId != '') {
		$(".financialInfo_houseCoding").val(row.jfHouse4storeId);
		$(".financialInfo_belongId").val(row.jfLandlordId);
	}
	if ((row.jfHouse4storeId == null || row.jfHouse4storeId == '') && row.jfHouseId != null&& row.jfHouseId != '') {
		$(".financialInfo_houseCoding").val(row.jfHouseId);
	}
	
	$("#financialInfoDlg").dialog({
		title : '查看收支',
		top : getTop(370),
		left : getLeft(660),
		width : 660,
		height : 520,
		closed : true,
		cache : false,
		modal : true
	});
	$(".financialInfo_jfId").val(row.jfId);
	$(".financialInfo_jfStrikeBalanceEncoding").val(row.jfStrikeBalanceEncoding);
	$(".financialInfo_jfBelongingToTheName").val(row.jfBelongingToTheName);
	var jfOperationRecords = row.jfOperationRecords;
	var reg=new RegExp("＜br＞","g");
	if(jfOperationRecords!=null&&jfOperationRecords!=''){
		jfOperationRecords= jfOperationRecords.replace(reg,"\r\n");
	}else{
		jfOperationRecords='暂无操作记录。'
	}
	$(".financialInfo_jfOperationRecords").val(jfOperationRecords);
	$("#financialInfoDlg").dialog('open');
}

//冲账状态列格式
function formatJfStrikeAbalanceStatus(value, row, index) {
	if (row.jfStrikeABalanceStatus == '冲账') {
		return "<a style='text-decoration:none;color:green;'>" + row.jfStrikeABalanceStatus + "</a>";
	} else if (row.jfStrikeABalanceStatus == '被冲账') {
		return "<a style='text-decoration:none;color:red;'>" + row.jfStrikeABalanceStatus + "</a>";
	} else if (row.jfStrikeABalanceStatus == '正常') {
		return "<a style='text-decoration:none;color:blue;'>" + row.jfStrikeABalanceStatus + "</a>";
	}
}
//收支金额列格式
function formatJfSumMoney(value, row, index) {
	if (row.jfNatureOfThe == '收入') {
		return "<a>" + row.jfSumMoney + "</a>";
	} else if (row.jfNatureOfThe == '支出') {
		return "<a>-" + row.jfSumMoney + "</a>";
	} else if (row.jfNatureOfThe == '冲账') {
		return row.jfSumMoney;
	}
}
//结清挂账格式
function formatJfCreditSituation(value, row, index){
	if (row.jfCreditSituation == 0) {
		return "<a>是 </a>";
	} else {
		return "<a>否 </a>";
	}
}

//冲账、审核、复核对话框
function updateFinancial(type){
	$("#checkFinancial").dialog({
		title : '操作',
		top : getTop(200),
		left : getLeft(400),
		width : 400,
		height : 160,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#checkFinancial input").val('');
			$("#checkFinancial select").val('0');
			$("#checkFinancial textarea").val('');
			$("#strikeDiv").hide();
			$("#reviewerOneDiv").hide();
			$("#reviewerTwoDiv").hide();
		}
	});
	if(type==0){
		$("#checkFinancial").dialog({title : '冲账操作'});
		$("#strikeDiv").show();
	}
	if(type==1){
		$("#checkFinancial").dialog({title : '审核操作'});
		$("#reviewerOneDiv").show();
	}
	if(type==2){
		$("#checkFinancial").dialog({title : '复核操作'});
		$("#reviewerTwoDiv").show();
	}
	$("#checkFinancial").dialog('open');
}
//执行冲账、审核、复核
function doCheck(type){
	showLoading();
	var jfId = $(".financialInfo_jfId").val();
	var jfStrikeBalanceEncoding = $(".financialInfo_jfStrikeBalanceEncoding").val();
	var jfTheOwnershipType = $(".financialInfo_jfTheOwnershipType").val();
	if(type==0){
		var jfStrikeABalanceReason = $(".add_jfStrikeABalanceReason").val();
		var jfOperationRecords = $(".financialInfo_jfOperationRecords").val();
		if(jfStrikeABalanceReason==''){
			var note = jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"进行冲账"+"<br>";
		}else{
			var note = jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"进行冲账"+" 备注："+jfStrikeABalanceReason+"<br>";
		}
		var jfFinancialCoding =  formatTime(getNowFormatDate(), 3)
			+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
			+ Math.floor(Math.random() * 10);
		if(jfTheOwnershipType != '内部项目' && jfTheOwnershipType != '外部项目' && jfTheOwnershipType != '非成本项目' && jfTheOwnershipType != '其他类'){
			$.post("../strikeBalanceInterface.action",{
				jfId						:jfId,
				jfTheCashierPeople			:_loginUserId,
				jfFinancialCoding			:jfFinancialCoding,
				jfStrikeABalanceReason		:jfStrikeABalanceReason,
				jfOperationRecords			:note,
			},function(data){
				hideLoading();
				if(data.code<0){
					myTips('冲账失败!','error');
				}else{
					myTips('冲账成功!','success');
				}
			});
		}else{
			$.post("../virtualStrikeABalance.action",{
				jfId						:jfId,
				jfTheCashierPeople			:_loginUserId,
				jfFinancialCoding			:jfFinancialCoding,
				jfStrikeABalanceReason		:jfStrikeABalanceReason,
				jfOperationRecords			:note,
			},function(data){
				hideLoading();
				if(data.code<0){
					myTips(data.msg,'error');
				}else{
					myTips('冲账成功!','success');
				}
			});
		}
	}
	if(type==1){
		var yesOrNo = $(".add_reviewerOneYesOrNo").find("option:selected").text();
		var jfAuditState ="已审核";
		var jfStrikeABalanceStatus = $(".financialInfo_jfStrikeAbalanceStatus").val();
		var jfOperationRecords = $(".financialInfo_jfOperationRecords").val();
		if($(".add_reviewerOneNote").val()==''){
			var note = jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"审核"+yesOrNo+"<br>";
		}else{
			var note = jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"审核"+yesOrNo+" 备注："+$(".add_reviewerOneNote").val()+"<br>";
		}
		if(yesOrNo=='不通过'){
			jfAuditState='审核不通过';
			if(jfStrikeABalanceStatus=='冲账'){
				jfAuditState='无效';
				//jfStrikeABalanceStatus='无效冲账';
				$.post("../updateFinancial.action",{
					jfId					:jfStrikeBalanceEncoding,
					jfOperationRecords		:note,
					jfAuditState			:'未审核',
					jfStrikeABalanceStatus	:'正常'
				},function(data){
					
				});
			}
		}
		if(jfTheOwnershipType != '内部项目' && jfTheOwnershipType != '外部项目' && jfTheOwnershipType != '非成本项目' && jfTheOwnershipType != '其他类'){
			$.post("../updateFinancial.action",{
				jfId					:jfId,
				jfOperationRecords		:note,
				jfAuditState			:jfAuditState,
				jfStrikeABalanceStatus	:jfStrikeABalanceStatus,
				jfTheReviewer			:_loginUserId
			},function(data){
				hideLoading();
				if(data.code<0||data==''){
					myTips('审核失败!','error');
				}else{
					myTips('审核成功!','success');
				}
			});
		}else{
			$.post("../virtualAudit.action",{
				jfId					:jfId,
				jfOperationRecords		:note,
				jfAuditState			:jfAuditState,
				jfStrikeABalanceStatus	:jfStrikeABalanceStatus,
				jfTheReviewer			:_loginUserId
			},function(data){
				hideLoading();
				if(data.code<0||data==''){
					myTips('审核失败!','error');
				}else{
					myTips('审核成功!','success');
				}
			});
		}
	}
	if(type==2){
		var yesOrNo = $(".add_reviewerTwoYesOrNo").find("option:selected").text();
		var jfAuditState ="已复核";
		var jfStrikeABalanceStatus = $(".financialInfo_jfStrikeAbalanceStatus").val();
		var jfOperationRecords = $(".financialInfo_jfOperationRecords").val();
		if($(".add_reviewerTwoNote").val()==''){
			var note = jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"复核"+yesOrNo+"<br>";
		}else{
			var note = jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"复核"+yesOrNo+" 备注："+$(".add_reviewerTwoNote").val()+"<br>";
		}
		if(yesOrNo=='不通过'){
			jfAuditState='复核不通过';
			if(jfStrikeABalanceStatus=='冲账'){
				jfAuditState='无效';
				//jfStrikeABalanceStatus='无效冲账';
				$.post("../updateFinancial.action",{
					jfId					:jfStrikeBalanceEncoding,
					jfOperationRecords		:note,
					jfAuditState			:'未审核',
					jfStrikeABalanceStatus	:'正常'
				},function(data){
					
				});
//				$.post("../notThroughTheReview.action",{
//					fajfId: jfId,
//				},function(idata){
//					
//				});
			}
		}
		if(jfTheOwnershipType != '内部项目' && jfTheOwnershipType != '外部项目' && jfTheOwnershipType != '非成本项目' && jfTheOwnershipType != '其他类'){
			$.post("../updateFinancialReview.action",{
				jfId					:jfId,
				jfOperationRecords		:note,
				jfAuditState			:jfAuditState,
				jfStrikeABalanceStatus	:jfStrikeABalanceStatus,
				jfFinanReview			:_loginUserId
			},function(data){
				hideLoading();
				if(data.code<0||data==''){
					myTips('复核失败!','error');
				}else{
//					var jfTheOwnershipType = $(".financialInfo_jfTheOwnershipType").val();
//					var jfNatureOfThe = $(".financialInfo_jfNatureOfThe").val();
//					var jfAccountingSpecies = $(".financialInfo_jfAccountingSpecies").val();
//					if ( jfTheOwnershipType == '租客' && jfAuditState=='已复核') {
//						if(jfNatureOfThe=='欠结'){
//							if(jfAccountingSpecies=='租客欠结'){
//								var baseMoney = $(".financialInfo_jfSumMoney").val();
//								$.post("../arithmetic.action",{
//									hrId		   : $(".financialInfo_houseCoding").val(),
//									arithmeticBase : baseMoney,
//								},function(data){
//											
//								});
//							}else if(jfAccountingSpecies=='租客补结'){
//								var baseMoney = accSub(0,$(".financialInfo_jfSumMoney").val());
//								$.post("../arithmetic.action",{
//									hrId		   : $(".financialInfo_houseCoding").val(),
//									arithmeticBase : baseMoney,
//								},function(data){
//											
//								});
//							}
//						}
//					}
					myTips('复核成功!','success');
					
				}
			});
		}else{
			$.post("../virtualReview.action",{
				jfId					:jfId,
				jfOperationRecords		:note,
				jfAuditState			:jfAuditState,
				jfStrikeABalanceStatus	:jfStrikeABalanceStatus,
				jfFinanReview			:_loginUserId
			},function(data){
				hideLoading();
				if(data.code<0||data==''){
					myTips('复核失败!','error');
				}else{
					myTips('复核成功!','success');
				}
			});
		}
	}
	$("#checkFinancial").dialog('close');
	$("#financialInfoDlg").dialog('close');
	fristLoading()
}
//财务状态列格式
function formatJfAuditState(value, row) {
	if (row.jfAuditState == '无效' ||row.jfAuditState == '被冲账' || row.jfAuditState == '审核不通过' || row.jfAuditState == '复核不通过') {
		return row.jfAuditState;
	} else if (row.jfAuditState == '已复核') {
		return "<a style='text-decoration:none;color:blue;'>" + row.jfAuditState + "</a>";
	} else if (row.jfAuditState == '已审核') {
		return "<a style='text-decoration:none;color:green;'>" + row.jfAuditState + "</a>";
	}else if (row.jfAuditState == '未审核'){
		return "<a style='text-decoration:none;color:red;'>" + row.jfAuditState + "</a>";
	}
}

//核算费用
function checkMoney(t){
	$("#ifCheckMoney").val('');
	var powerMoneyArry = $('#srefPowerDiv input');//所有能源输入框
	var rentMoney = $("#srefRentMoney").val();//租金
	var realPay = $("#srefRealPay").val();//实交金额
	var pastOwe = $("#srefPastOwe").val();//往期欠费金额
	if(t==0){
		realPay = 0.00 ;
		$("#srefRealPay").val(0.00);
	}
	if(realPay==''&&realPay!=0){
		$("#setRenterEveryFinancialTips").html("请输入实交金额!");
		return;
	}
	$("#setRenterEveryFinancialTips").html("");
	var powerMoney = 0;
	for(var i = 0;i<powerMoneyArry.length;i++){
		powerMoney = accAdd(powerMoney,$("#"+powerMoneyArry[i].id).val());
	}
	$("#srefPowerMoney").val(powerMoney);
	var damages = $("#srefDamages").val();//违约金
	var shouldPay = accAdd(pastOwe,accAdd(damages,accAdd(powerMoney,rentMoney)));//算出应收金额
	$("#srefShouldPay").val(shouldPay);
	var neOwe = accSub(shouldPay,realPay);
	
	if(neOwe>0){
		$("#everyNewOwe").show();
		$("#srefNewOwe").val(accSub(neOwe,0));
		
		$("#everyNewSave").hide();
		$("#srefNewSave").val(0.00);
	}else{
		$("#everyNewSave").show();
		$("#srefNewSave").val(accSub(0,neOwe));
		
		$("#everyNewOwe").hide();
		$("#srefNewOwe").val(0.00);
	}
	$("#srefAllOwe").val(accSub(shouldPay,realPay));
	
	$("#ifCheckMoney").val("已核算");
}


//账户类型和账号联动
function changeWay(type) {
	if(type==0){
		var faPaymentType = $("#searchWay").find("option:selected").text();
		$("#searchAccountName").empty();
		$("#searchAccountName").append("<option></option>");
		if(faPaymentType == ""){
			return;
		}
		$.post("../selectNamePublic.action", {
			faPaymentType:faPaymentType,
		}, function(data) {
			for (var i in data.body) {
				$("#searchAccountName").append(
						"<option value='" +  data.body[i].faId + "'>" + data.body[i].faUserName + "</option>");
			}
		});
	}else if(type==1){
		var faPaymentType = $(".add_financial_way").find("option:selected").text();
		$(".add_financial_bankNums").val('');
		$(".add_financial_accountNums").val('');
		$(".add_financial_accountBelong").val('');
		$(".add_financial_accountName").empty();
		$(".add_financial_accountName").append("<option></option>");
		if(faPaymentType == ""){
			return;
		}
		$.post("../selectNamePublic.action", {
			faPaymentType:faPaymentType,
		}, function(data) {
			$(".add_financial_accountName").empty();
			$(".add_financial_accountName").append("<option></option>");
			for (var i in data.body) {
				$(".add_financial_accountName").append(
						"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
			}
		});
	}else if(type==2){
		var faPaymentType = $("#setRenterEveryFinancialWay").find("option:selected").text();
		$("#setRenterEveryFinancialBankNums").val('');
		$("#setRenterEveryFinancialAccountNums").val('');
		$("#setRenterEveryFinancialAccountBelong").val('');
		$("#setRenterEveryFinancialAccountName").empty();
		$("#setRenterEveryFinancialAccountName").append("<option></option>");
		if(faPaymentType == ""){
			return;
		}
		$.post("../selectNamePublic.action", {
			faPaymentType:faPaymentType,
		}, function(data) {
			$("#setRenterEveryFinancialAccountName").empty();
			$("#setRenterEveryFinancialAccountName").append("<option></option>");
			for (var i in data.body) {
				$("#setRenterEveryFinancialAccountName").append(
						"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
			}
		});
	}else if(type==3){
		var faPaymentType = $("#setRenterNewFinancialWay").find("option:selected").text();
		$("#setRenterNewFinancialBankNums").val('');
		$("#setRenterNewFinancialAccountNums").val('');
		$("#setRenterNewFinancialAccountBelong").val('');
		$("#setRenterNewFinancialAccountName").empty();
		$("#setRenterNewFinancialAccountName").append("<option></option>");
		if(faPaymentType == ""){
			return;
		}
		$.post("../selectNamePublic.action", {
			faPaymentType:faPaymentType,
		}, function(data) {
			$("#setRenterNewFinancialAccountName").empty();
			$("#setRenterNewFinancialAccountName").append("<option></option>");
			for (var i in data.body) {
				$("#setRenterNewFinancialAccountName").append(
						"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
			}
		});
	}
}
//跳转查看房源
function skipToCheckHouse(){
	var row = $('#financialDg').datagrid('getSelected');
	var skipJspName = '';
	var skipJspUrl = '';
	var skipJspIcon = '';
	var skipInputId = ['','',''];
	var skipInputVal = ['','',''];
	if((row.jfTheOwnershipType=="租客" && row.jfJsrcId!=null && row.jfJsrcId!='') || (row.jfTheOwnershipType=="业主" && row.jfJsrcId!=null && row.jfJsrcId!='') ){
		skipJspName = '客房管理';
		skipJspUrl = 'fg_shortRentHouse';
		skipJspIcon = 'fangjianguanli';
		skipInputId[0] = 'searchHsAddCommunity';
		skipInputId[1] = 'searchHsAddBuilding';
		skipInputId[2] = 'searchHsAddDoorplateno';
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