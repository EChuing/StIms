var printAddress = '';
$(function(){
	if($('#searchYear').val()!=''){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		$('#searchYear').val(year);
		$('#searchMonth').val(month);
		$('#searchYear2').val(year);
		$('#searchMonth2').val(month);
	}
	$("#payableDg").datagrid({
		onDblClickRow : function(rowIndex, rowData){
			$("#payable_index").val(rowIndex);
			seePayable();
		}
	});
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
			queryPayableApp(1, 0);
		}else if(clickId.indexOf("theSortContrary")>-1){
			var alltheSortContrary = $('.theSortContrary');
			$('.theSortContrary').each(function(){
				$(this).removeClass("theSortContrarySelect");
			});
			$("#"+clickId).addClass("theSortContrarySelect");
			$('#theSortContraryInput').val($("#"+clickId).attr("searchVal"));
			queryPayableApp(1, 0);
		}else{
			$("#theSortDlg").fadeOut();
		}
	});
	$("#freeDg").datagrid({
		onDblClickRow : function(rowIndex, rowData){
			seeFree();
		}
	});
	$("#payableAppAddDg").datagrid({
		rowStyler : function(index, row) {
			return 'color:#000;';
		}
	});
	for (var i in _loginCompanyRentDistrict) {
	    $('#searchDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
	for (var i in _acountType) {
		$('#paymentAccountType').append("<option value='" + _acountType[i] + "'>" + _acountType[i] + "</option>");
	}
	for (var i in _payType) {
		$('#paymentMethod').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
	}
	queryPayable(1,0);
});

//分页统计总条数
function getpayablePageCount(page){
	var pageSize = 15;
	var addCity = $("#searchCity").find("option:selected").text();
	var addDistrict = $("#searchDistrict").find("option:selected").text();
	var addZone = $("#searchZone").find("option:selected").text();
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#sourceBuilding").val();
	var addDoorplateno = $("#sourceDoorplateno").val();
	var landlordName = $("#searchLandlordName").val();
	var money = $("#searchMoney").val();
	var hsState = $("#searchHsState").val();
	var auditStatus = $("#searchAuditStatus").val();
	var jciState = $("#searchJciState").val();
	var startDate = $("#searchStartDate").val();
	var endDate = $("#searchEndDate").val();
	var year = $("#searchYear").val();
	var month = $("#searchMonth").val();
	$.post("../selectPayableToLandlord.action", {
		addCity 			: addCity,
		addDistrict 		: addDistrict,
		addZone 			: addZone,
		addCommunity 		: addCommunity,
		addBuilding 		: addBuilding,
		addDoorplateno 		: addDoorplateno,
		landlordName 		: landlordName,
		jciMoney 			: money,
		hsState				: hsState,
		auditStatus 		: auditStatus,
		jciState 			: jciState,
		startDate 			: startDate,
		endDate 			: endDate,
		year 				: year,
		month 				: month,
	},function(data){
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"payable",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"payable",0);
		}
	});
}

//查询全部房东账单
function queryPayable(page,type){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var addCity = $("#searchCity").find("option:selected").text();
	var addDistrict = $("#searchDistrict").find("option:selected").text();
	var addZone = $("#searchZone").find("option:selected").text();
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#sourceBuilding").val();
	var addDoorplateno = $("#sourceDoorplateno").val();
	var landlordName = $("#searchLandlordName").val();
	var money = $("#searchMoney").val();
	var hsState = $("#searchHsState").val();
	var auditStatus = $("#searchAuditStatus").val();
	var jciState = $("#searchJciState").val();
	var startDate = $("#searchStartDate").val();
	var endDate = $("#searchEndDate").val();
	var year = $("#searchYear").val();
	var month = $("#searchMonth").val();
	$.post("../selectPayableToLandlord.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		addCity 			: addCity,
		addDistrict 		: addDistrict,
		addZone 			: addZone,
		addCommunity 		: addCommunity,
		addBuilding 		: addBuilding,
		addDoorplateno 		: addDoorplateno,
		landlordName 		: landlordName,
		jciMoney 			: money,
		hsState				: hsState,
		auditStatus 		: auditStatus,
		jciState 			: jciState,
		startDate 			: startDate,
		endDate 			: endDate,
		year 				: year,
		month 				: month,
	},function(data){
		if (data.code < 0 || data.body.length == 0) {
			// sourcePage(0,0,0);
			$("#payableDg").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg != '' ? data.msg : '没有查询到符合条件的记录！'
			});
			if(page==1){
				notCountPage(0, 0 ,"queryPayable","payable");
			}else{
				notCountPage(page, 0 ,"queryPayable","payable");
			}
			$('#totalMoney').html(0);
		} else {
			// if (page == 1 && type == 0) {
			// 	sourcePage(data.body[0].totalNum,page,0);
			// }
			if(data.body.length<endNum){
				notCountPage(page, 2 , "queryPayable","payable");
			}else{
				notCountPage(page, 1 , "queryPayable","payable");
			}
			for (var i in data.body) {
				if (data.body[i].jciAudit != null) {
					data.body[i].jciAudit = data.body[i].jciAudit.substring(1, data.body[i].jciAudit.length - 1);
					var audit = JSON.parse(data.body[i].jciAudit);
					for (var j in audit) {
						data.body[i][j] = audit[j];
					}
				}
			}
			for (var i in data.body) {
				for(var j in data.body[i]){
					if(data.body[i][j]==null){
						data.body[i][j]='';
					}
				}
				data.body[i].detailedAddress = data.body[i].addCommunity + " " + data.body[i].addBuilding + " " + data.body[i].addDoorplateno;
			}
			$('#totalMoney').html(data.body[0].totalMoney);
			$("#payableDg").datagrid("loadData", data.body);
		}
	});
}
//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 15);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#payablePage").remove();
		$("#payablePageDiv")
				.append(
						"<div class='tcdPageCode' id='payablePage' style='text-align:center;'></div>");
		$("#payablePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryPayable(p, 1);
				}
			}
		});
	}

	/*if (type == 2) {
		pageNum = Math.ceil(totalNum / 5);
		$("#payableAppPage").remove();
		$("#payableAppPageDiv")
				.append(
						"<div class='tcdPageCode' id='payableAppPage' style='text-align:center;'></div>");
		$("#payableAppPage").createPage({
			onePageNums:5,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryPayableApp(p, 1);
				}
			}
		});
	}*/
}
function clearAll(){
	$("#landlordName").val("");
	$("#address").val("");
	$("#jciPeriods").val("");
	$("#jciBeginPeriods").val("");
	$("#jciEndPeriods").val("");
	$("#jciMoney").val("");
	$("#hsBaseMoney").val("");
	$("#shouldPayMoney").val("");
	$("#jciState").val("");
	$("#bankName").val("");
	$("#bankType").val("");
	$("#bankNum").val("");
	$("#paymentAccountId").val("");
	$("#paymentAccountType").val("");
	$("#paymentAccountName").empty();
	$("#paymentAccountNum").val("");
	$("#paymentAccountBelong").val("");
	$("#paymentMethod").val("");
	$("#auditStatus").val("");
	$("#auditName").val("");
	$("#reviewName").val("");
	$(".errorMsg").text("");
}
//查看详细信息
function seePayable(){
	clearAll();
	var row = $("#payableDg").datagrid("getSelected");
	$("#payableInfoDlg").dialog({
		title : '查看业主账单',
		top : getTop(470),
		left : getLeft(600),
		width : 600,
		height : 470,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	$("#landlordName").val(row.landlordName);
	$("#address").val(row.addCity + row.addDistrict + row.addZone + row.detailedAddress);
	$("#jciPeriods").val(row.jciPeriods);
	$("#jciBeginPeriods").val(row.jciBeginPeriods);
	$("#jciEndPeriods").val(row.jciEndPeriods);
	$("#jciState").val(row.jciState);
	$('#jciSpecialNumber').val(row.jciSpecialNumber);
	if (row.auditStatus == "未审核" || row.auditStatus == "重新核验") {
		$("#jciMoney").val(Number(row.jciMoney));
		$("#hsBaseMoney").val(Number(row.hsBase));
		var debt = mySub(row.jciMoney,row.hsBase);
		if(debt<0){
			$("#shouldPayMoney").val(0.00);
		}else{
			$("#shouldPayMoney").val(debt);
		}
		//业主账号
		$.post("../landlordCard.action", {
			jciId : row.jciId
		}, function(data) {
			if(data.code > 0){
				data = data.body;
				$("#bankName").val(data[0].hsBankName);
				$("#bankType").val(data[0].hsBankType);
				$("#bankNum").val(data[0].hsBankNum);
			}
		});
		$("#paymentAccountType").val(row.paymentAccountType);
		//付款账号
		if(row.paymentAccountType != null && row.paymentAccountType != ""){
			$.post("../selectNamePublic.action", {
				faPaymentType:row.paymentAccountType,
			}, function(data) {
				$("#paymentAccountName").empty();
				for (var i in data.body) {
					if(data.body[i].faId == row.paymentAccountId){
						$("#paymentAccountName").append("<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "' selected='selected'>" + data.body[i].faUserName + "</option>");
						$("#paymentAccountId").val(data.body[i].faId);
						$("#paymentAccountNum").val(data.body[i].faAccount);
						$("#paymentAccountBelong").val(data.body[i].faBelonging);
					}else{
						$("#paymentAccountName").append("<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
					}
				}
			});
		}
		$("#paymentMethod").val(row.paymentMethod);
		$("#auditStatus").val(row.auditStatus);
		$("#auditName").val(row.auditName);
		$("#reviewName").val(row.reviewName);
	} else {
		$("#jciMoney").val(row.accountPayable);
		$("#hsBaseMoney").val(row.debt);
		$("#shouldPayMoney").val(row.actualPayment);
		$("#bankName").val(row.landAccountName);
		$("#bankType").val(row.landAccountBank);
		$("#bankNum").val(row.landAccountNum);
		$("#paymentAccountId").val(row.paymentAccountId);
		$("#paymentAccountType").val(row.paymentAccountType);
		$("#paymentAccountName").append("<option value='' selected='selected'>" + row.paymentAccountName + "</option>");
		$("#paymentAccountNum").val(row.paymentAccountNum);
		$("#paymentAccountBelong").val(row.paymentAccountBelong);
		$("#paymentMethod").val(row.paymentMethod);
		$("#auditStatus").val(row.auditStatus);
		$("#auditName").val(row.auditName);
		$("#reviewName").val(row.reviewName);
	}
	if(row.auditStatus == "未审核"){
		$("#doAuditOne").show();
		$("#doAuditTwo").hide();
		$("#doAuditThree").hide();
		$("#doAuditFour").show();
		$("#account-info").hide();
	}else if(row.auditStatus == "已审核"){
		$("#doAuditOne").hide();
		$("#doAuditTwo").show();
		$("#doAuditThree").hide();
		$("#doAuditFour").show();
		$("#account-info").hide();
	}else if(row.auditStatus == "待付款"){
		$("#doAuditOne").hide();
		$("#doAuditTwo").hide();
		$("#doAuditThree").show();
		$("#doAuditFour").show();
		$("#account-info").show();
		$("#sentMsgDiv").show();
		$("#paymentAccountType").attr("disabled",false);
		$("#paymentAccountName").attr("disabled",false);
		$("#paymentMethod").attr("disabled",false);
	}else if(row.auditStatus == "重新核验"){
		$("#doAuditOne").show();
		$("#doAuditTwo").hide();
		$("#doAuditThree").hide();
		$("#doAuditFour").hide();
		$("#account-info").hide();
	}else{
		$("#doAuditOne").hide();
		$("#doAuditTwo").hide();
		$("#doAuditThree").hide();
		$("#doAuditFour").hide();
		$("#account-info").show();
		$("#sentMsgDiv").hide();
		$("#paymentAccountType").attr("disabled",true);
		$("#paymentAccountName").attr("disabled",true);
		$("#paymentMethod").attr("disabled",true);
	}
	$("#payableInfoDlg").dialog("open");
}
//上一条下一条
function laterOrNext(type) {
	var dataIndex = $("#payable_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$("#payable_index").val(num);
			changeData = $('#payableDg').datagrid('getData').rows[num];
			$('#payableDg').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#payableDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#payable_index").val(num);
			changeData = $('#payableDg').datagrid('getData').rows[num];
			$('#payableDg').datagrid('selectRow',num);
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
		seePayable();
	}
}

function doCheck(type){
	var row = $("#payableDg").datagrid("getSelected");
	console.log(row);
	var jciId = row.jciId;
	var auditStatus;
	var auditName = $("#auditName").val();
	var reviewName = $("#reviewName").val();
	var draweeName = "";
	var landAccountName = $("#bankName").val();
	var landAccountBank = $("#bankType").val();
	var landAccountNum = $("#bankNum").val();
	var paymentAccountId = $("#paymentAccountId").val();
	var paymentAccountType = $("#paymentAccountType").find("option:selected").text();
	var paymentAccountName = $("#paymentAccountName").find("option:selected").text();
	var paymentAccountNum = $("#paymentAccountNum").val();
	var paymentAccountBelong = $("#paymentAccountBelong").val();
	var paymentMethod = $("#paymentMethod").val();
	var accountPayable = $("#jciMoney").val();
	var debt = $("#hsBaseMoney").val();
	var actualPayment = $("#shouldPayMoney").val();
	var ifPrint  = row.jciIfPrint;
	switch (type) {
		case 1:
			auditStatus = "已审核";
			auditName = _loginUserName;
			break;
		case 2:
			auditStatus = "待付款";
			reviewName = _loginUserName;
			break;
		case 3:
			auditStatus = "已付款";
			draweeName = _loginUserName;
			if(ifPrint=="否"){
				$(".errorMsg").text("请先打印付款申请单再进行付款操作!");
				return;
			}
			if(paymentAccountId == ""){
				$(".errorMsg").text("请选择付款账户");
				return;
			}
			if(paymentMethod == ""){
				$(".errorMsg").text("请选择收支方式");
				return;
			}
			break;
		case 4:
			auditStatus = "重新核验";
			auditName = null;
			reviewName = null;
			break;
	}
	// !!! 注意：属性auditStatus必须放第一个，它是作为筛选条件使用的
	var audit = {
		auditStatus: auditStatus,
		auditName: auditName,
		reviewName: reviewName,
		draweeName: draweeName,
		landAccountName: landAccountName,
		landAccountBank: landAccountBank,
		landAccountNum: landAccountNum,
		paymentAccountType: paymentAccountType,
		paymentAccountName: paymentAccountName,
		paymentAccountNum: paymentAccountNum,
		paymentAccountBelong: paymentAccountBelong,
		paymentMethod: paymentMethod,
		accountPayable: accountPayable,
		debt: debt,
		actualPayment: actualPayment
	}
	if (type == 4) {
		audit = {
			auditStatus: auditStatus
		}
	}
	audit = JSON.stringify(audit);
	if(type == 3){//付款
		var jfPayType = '"jfPayType":"' + paymentMethod + '"';
		var jfFinancialCoding = '"jfFinancialCoding":"'
			+ formatTime(getNowFormatDate(), 3)
			+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
			+ Math.floor(Math.random() * 10) + '"';
		var jfHouse4storeId = '"jfHouse4storeId":"' + row.jciHouse4storeId + '"';
		var jfHouseId = '"jfHouseId":"' + row.hsHouseId + '"';
		var jfLandlordId = '"jfLandlordId":"' + row.jciLandlordId + '"';
		var jfHandlers = '"jfHandlers":"' + _loginUserId + '"';
		var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
		var department = '"department":"' + _loginDepartment + '"';
		var storefront = '"storefront":"' + _loginStore + '"';
		var jfAccountingWhy = '"jfAccountingWhy":"' + row.addCommunity + row.addBuilding + row.addDoorplateno + '"';
		var jfAccountId = '"jfAccountId":"' + paymentAccountId + '"';
		var jfSumMoney = '"jfSumMoney":"' + accountPayable + '"';
		var jfClosedWay = '"jfClosedWay":"' + paymentAccountType + '"';
		var jfStartCycle = '"jfStartCycle":"' + row.jciBeginPeriods + '"';
		var jfEndCycle = '"jfEndCycle":"' + row.jciEndPeriods + '"';
		var jfTheOwnershipType = '"jfTheOwnershipType":"业主"';
		var jfBelongingToTheName = '"jfBelongingToTheName":"' + row.landlordName + '"';
		var jfNatureOfThe = '"jfNatureOfThe":"支出"';
		var jfAccountingSpecies = '"jfAccountingSpecies":"租金"';
		var jfBigType = '"jfBigType":"主营类"';
		var bankName = $("#bankName").val();
		var bankType = $("#bankType").val();
		var bankNum = $("#bankNum").val();
		var jfFinanNote = '"jfFinanNote":"' + '户名：' + bankName + ' 银行：' + bankType + ' 账号：' + bankNum + '"';
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		if(month < 9){
			month = "0" + (month + 1);
		}else{
			month = "" + (month + 1);
		}
		var day = date.getDate();
		if(day < 10){
			day = "0" + day;
		}else{
			day = "" + day;
		}
		var dateformat = year + "-" + month + "-" + day;
		var jfBillingDate = '"jfBillingDate":"' + dateformat + '"';

		var strArray = jfAccountingWhy+ "," +jfFinancialCoding + "," + jfHouse4storeId + "," + jfLandlordId + "," + jfHouseId + "," + jfBigType
		+ "," + jfHandlers + "," + jfTheCashierPeople + "," + department + "," + storefront
		+ "," + jfAccountId + "," + jfSumMoney + "," + jfClosedWay + "," + jfStartCycle
		+ "," + jfEndCycle + "," + jfTheOwnershipType + "," + jfBelongingToTheName
		+ "," + jfBillingDate + "," + jfNatureOfThe + "," + jfAccountingSpecies + "," + jfFinanNote + "," + jfPayType;
		var jsonStrArry = '[{' + strArray + '}]';
		var jfSumMoney2 = '';
		var jfSumMoney3 = '';
		if(debt>0){
			jfNatureOfThe = '"jfNatureOfThe":"收入"';
			jfBigType = '"jfBigType":"欠结类"';
			jfAccountingSpecies = '"jfAccountingSpecies":"房东还欠结款"';
			console.log('========'+debt+' '+accountPayable)
            var sum = parseFloat(debt) - parseFloat(accountPayable);
            console.log('sum========'+sum)
			if(sum<0){
				jfSumMoney2 = '"jfSumMoney":"' + debt + '"';
				jfFinanNote = '"jfFinanNote":"房东还欠结款 '+ debt +'元 "';
			}else{
				jfSumMoney2 = '"jfSumMoney":"' + accountPayable + '"';
				jfFinanNote = '"jfFinanNote":"房东还欠结款 '+ accountPayable +'元 "';
			}

			var strArray1 = jfAccountingWhy+ "," +jfFinancialCoding + "," + jfHouse4storeId + "," + jfLandlordId + "," + jfHouseId + "," + jfBigType
			+ "," + jfHandlers + "," + jfTheCashierPeople + "," + department + "," + storefront
			+ "," + jfAccountId + "," + jfSumMoney2 + "," + jfClosedWay + "," + jfStartCycle
			+ "," + jfEndCycle + "," + jfTheOwnershipType + "," + jfBelongingToTheName
			+ "," + jfBillingDate + "," + jfNatureOfThe + "," + jfAccountingSpecies + "," + jfFinanNote + "," + jfPayType;
			jsonStrArry = '[{' + strArray + '},{' + strArray1 + '}]';
		}else if(debt<0){
			jfNatureOfThe = '"jfNatureOfThe":"支出"';
			jfBigType = '"jfBigType":"欠结类"';
			jfAccountingSpecies = '"jfAccountingSpecies":"支付房东待付款"';
			jfSumMoney3 = '"jfSumMoney":"' + accSub(0,debt) + '"';
			jfFinanNote = '"jfFinanNote":"支付房东待付款 '+ accSub(0,debt) +'元 "';

			var strArray1 = jfAccountingWhy+ "," +jfFinancialCoding + "," + jfHouse4storeId + "," + jfLandlordId + "," + jfHouseId + "," + jfBigType
			+ "," + jfHandlers + "," + jfTheCashierPeople + "," + department + "," + storefront
			+ "," + jfAccountId + "," + jfSumMoney3 + "," + jfClosedWay + "," + jfStartCycle
			+ "," + jfEndCycle + "," + jfTheOwnershipType + "," + jfBelongingToTheName
			+ "," + jfBillingDate + "," + jfNatureOfThe + "," + jfAccountingSpecies + "," + jfFinanNote + "," + jfPayType;
			jsonStrArry = '[{' + strArray + '},{' + strArray1 + '}]';
		}
		showLoading();
		$.post("../insertFinancialAll.action",{
			jsonArray : jsonStrArry
		},function(data){
			if(data.code<0||data==''){
				hideLoading();
				myTips('付款失败!','error');
				return;
			}
			$.post("../updateContractInstallment.action",{
				jciId : jciId,
				jciAudit: audit,
				jciState: "已付"
			},function(data){
				if(data<0||data==''){
					hideLoading();
					myTips('已生成收支，但修改审核状态失败!','error');
					return;
				}else{
					/*121qq*/
					var jhfFollowRemark = "支付房东待付款 "+ row.jciMoney +"元 ;"+"周期："+row.jciBeginPeriods+"到"+row.jciEndPeriods
						+ "; 房东收款户名：" + bankName + ", 开户银行：" + bankType + ", 银行卡号：" + bankNum + ";";
					$.post("../insertHousingFollow.action", {
						jhfDepartment			:_loginDepartment,
						jhfStorefront			:_loginStore,
						jhfHouse4storeId 		: row.jciHouse4storeId,
						jhfHouseId				: row.hsHouseId,
						jhfFollowRemark 		: jhfFollowRemark,
						jhfFollowResult 		: '付款成功',
						jhfPaymentWay 			: '系统跟进',
						jhfUserId 				: _loginUserId
					},function(){
					});
					var page=$(".current").html();
					queryPayable(page,0);
					hideLoading();
					myTips('付款成功!','success');
					$("#payableInfoDlg").dialog('close');
				}
			});
		},"json");
		if($('#sentMsg').is(':checked')){
			var smMoney = row.jciMoney;
			if(row.hsBase<=row.jciMoney){
				smMoney =accSub(row.jciMoney,row.hsBase);
			}
			if(row.hsBase>row.jciMoney){
				smMoney = 0.00;
			}
			$.post("../massage/sendOutsideMessage.action", {
				smNotRentId : row.jciHouse4storeId,
				smLandId : row.jciLandlordId,
				smMoney : smMoney,
				hsBankType : bankType,
				hsBankNum : bankNum,
				hsBankName : bankName,
				smPopId : row.popId,
				messageType:11,
				smUserId    : _loginUserId,
			}, function(data) {
				if(data.code<0){
					myTips(data.msg,"error");
				}else{

				}

			});
			//发短信的同时生成一条财务跟进
			var banknum = "尾数"+bankNum.substring(bankNum.length-4);
			var follow_mark = '已发送付款短信：尊敬的业主您好！您：'+row.detailedAddress+'，本月租金'+smMoney+'，已提交到您'+bankType+'账户'+banknum+'，收款人'+bankName+'，请注意查收！';
			$.post("../insertHousingFollow.action", {
				jhfHouseId			: row.hsHouseId,
				jhfHouse4storeId 	: row.hsId,
				jhfFollowRemark 	: follow_mark,
				jhfRemind			: '否',
				jhfFollowResult 	: '跟进成功',
				jhfFollowBelong		: '业主',
				jhfPaymentWay 		: '财务跟进',
				jhfUserId			: _loginUserId,
				jhfDepartment 		: _loginDepartment,
				jhfStorefront 		: _loginStore,
			}, function(data) {});
		}
	}else{
		var param = {
			jciId : jciId,
			jciAudit: audit
		};
		if(type==4){
			param.jciSpecialNumber = '';
			param.jciIfPrint = '否';
		}
		showLoading();
		$.post("../updateContractInstallment.action",param,function(data){
			hideLoading();
			if(data<0||data==''){
				myTips('操作失败!','error');
			}else{
                var page=$(".current").html();
				queryPayable(page,0);
				$("#payableInfoDlg").dialog('close');
				myTips('操作成功!','success');
			}
		},"json");
	}
}
//账户类型和账号联动
function changeWay() {
	var faPaymentType = $("#paymentAccountType").find("option:selected").text();
	$("#paymentAccountName").empty();
	$("#paymentAccountName").append("<option></option>");
	$("#paymentAccountId").val("");
	$("#paymentAccountNum").val("");
	$("#paymentAccountBelong").val("");
	if(faPaymentType == ""){
		return;
	}
	$.post("../selectNamePublic.action", {
		faPaymentType:faPaymentType,
	}, function(data) {
		$("#paymentAccountName").empty();
		$("#paymentAccountName").append("<option></option>");
		for (var i in data.body) {
			$("#paymentAccountName").append(
					"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
		}
	});
}
function getAccountId() {
	if($("#paymentAccountName").val()==''){
		$("#paymentAccountId").val("");
		$("#paymentAccountBelong").val("");
		$("#paymentAccountNum").val("");
	}else{
		$("#paymentAccountId").val($("#paymentAccountName").val().split("*#*")[0]);
		$("#paymentAccountBelong").val($("#paymentAccountName").val().split("*#*")[1]);
		$("#paymentAccountNum").val($("#paymentAccountName").val().split("*#*")[2]);
	}
}


//格式化审核状态
function formatAuditStatus(value, row, index) {
	if (row.auditStatus == '重新核验') {
		return row.auditStatus;
	} else if (row.auditStatus == '未审核'){
		return "<a style='text-decoration:none;color:red;'>" + row.auditStatus + "<a>";
	} else if (row.auditStatus == '已审核') {
		return "<a style='text-decoration:none;color:green;'>" + row.auditStatus + "<a>";
	} else if (row.auditStatus == '待付款') {
		return "<a style='text-decoration:none;color:blue;'>" + row.auditStatus + "<a>";
	} else if (row.auditStatus == '已付款'){
		return "<a style='text-decoration:none;color:gray;'>" + row.auditStatus + "<a>";
	}
}
//格式化打印状态
function formatJciIfPrint(value, row, index) {
	if (row.jciIfPrint == '是'){
		return "<a style='text-decoration:none;color:blue;'>已打印<a>";
	}
	if (row.jciIfPrint == '否') {
		return "<a style='text-decoration:none;color:red;'>未打印<a>";
	}
}

//格式化免租期月份
function formatIlfbMonth(value, row, index) {
	return row.ilfbMonth.substring(0, 7);
}
function seeFree(){
	var row = $("#freeDg").datagrid("getSelected");
	$("#freeDlg").dialog({
		title : '发送短信',
		top : getTop(213),
		left : getLeft(540),
		width : 540,
		height : 213,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#msgView').html('');
		}
	});
	var add = row.detailedAddress;
	var msg = '【房至尊】尊敬的业主你好。你的物业'+add+'，本月为免租期。感谢您使用我司房屋托管服务。';
	$('#msgView').html(msg);
	$("#freeDlg").dialog('open');
}
//打印付款申请单
function createApplication(){
	$("#applicationDlg").dialog({
		title : '生成付款申请单',
		top : getTop(600),
		left : getLeft(1065),
		width : 1065,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	$("#payableAppAddDg").datagrid("loadData", []);
	$("#applicationDlg").dialog('open');
	var page=$(".current").html();
	queryPayable(page,0);
}
//打印付款申请单页面的查询
var payableAppDgLength = 0;
function queryPayableApp(page,type){
	// var startNum = (parseInt(page) - 1) * 5;
	// var endNum = 5;
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	var addCommunity = $("#searchCommunityApp").val();
	var addBuilding = $("#sourceBuildingApp").val();
	var addDoorplateno = $("#sourceDoorplatenoApp").val();
	var landlordName = $("#searchLandlordNameApp").val();
	var hsState = $("#searchHsStateApp").val();
	var money = $("#searchMoneyApp").val();
	var auditStatus = $("#searchAuditStatusApp").val();
	var startDate = $("#searchStartDateApp").val();
	var endDate = $("#searchEndDateApp").val();
	$.post("../selectPayableToLandlord.action", {
		// startNum 			: startNum,
		// endNum 				: endNum,
		theSortTerm 		: theSortTerm,
		theSortContrary 	: theSortContrary,
		addCommunity 		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno 		: addDoorplateno,
		landlordName 		: landlordName,
		hsState				: hsState,
		jciMoney 			: money,
		auditStatus 		: "待付款",
		startDate 			: startDate,
		endDate 			: endDate,
		jciIfPrint			: "否",
	},function(data){
		if (data.code < 0 || data.body.length == 0) {
			/*sourcePage(0,0,2);
			$("#payableAppDg").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg != '' ? data.msg : '没有查询到符合条件的记录！'
			});*/
		} else {
			/*if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum,page,2);
			}*/
			for (var i in data.body) {
				if (data.body[i].jciAudit != null) {
					data.body[i].jciAudit = data.body[i].jciAudit.substring(1, data.body[i].jciAudit.length - 1);
					var audit = JSON.parse(data.body[i].jciAudit);
					for (var j in audit) {
						data.body[i][j] = audit[j];
					}
				}
			}
			for (var i in data.body) {
				for(var j in data.body[i]){
					if(data.body[i][j]==null){
						data.body[i][j]='';
					}
				}
				data.body[i].detailedAddress = data.body[i].addCommunity + " " + data.body[i].addBuilding + " " + data.body[i].addDoorplateno;
			}
            console.log("进来了")
            payableAppDgLength = data.length;
			$("#payableAppDg").datagrid("loadData", data.body);
		}
	});
}
/*function tianjia(value, row, index){
    return "<a href='#' style='color:blue' onclick=\"addOneToNeedTo("+ index +")\" >添加</a>";
}
function shanchu(value, row, index){
    return "<a href='#' style='color:red' onclick=\"myDeleteRows('"+row.jciId+"','jciId','payableAppAddDg','needToAddNums');\">删除</a>";
}

//添加一条到需要打印的表格中
function addOneToNeedTo(index){
    var row = $("#payableAppDg").datagrid('getData').rows[index];
    var rows = $("#payableAppAddDg").datagrid('getRows');
    var checkFlag = 0;
    if(rows != ''){
        if(rows.length==12){
            myTips("一次最多为12条账单！","error");
            return;
        }
        for(var i in rows){
            if(rows[i].jciId==row.jciId){
                checkFlag++;
            }
        }
    }
    if(checkFlag!=0){
        myTips("此条账单已经添加到下方列表！","error");
        return;
    }else{
        $('#payableAppAddDg').datagrid('insertRow', {
            index : 0,
            row : row
        });
        $("#needToAddNums").html(rows.length);
    }
}*/
//添加需要打印的账单
function addOneToNeedTo(){
    var rows = $('#payableAppDg').datagrid("getChecked");
    if(rows.length == 0){
        myTips("请选择需要添加的账单","error")
        return;
    }
    if (rows) {
        for(var i=0; i<rows.length;i++){
            var rowIndex = $('#payableAppDg').datagrid('getRowIndex', rows[i]);
            $('#payableAppDg').datagrid('deleteRow', rowIndex);
        }
    }
    $('#payableAppAddDg').datagrid("loadData",rows );
}

//取消需要打印的账单
function cancelOneToNeedTo(){
    var rows = $('#payableAppAddDg').datagrid("getChecked");
    if(rows.length == 0){
        myTips("请选择需要取消的账单","error")
        return;
    }
    if (rows) {
        for(var i=0; i<rows.length;i++){
            var rowIndex = $('#payableAppAddDg').datagrid('getRowIndex', rows[i]);
            $('#payableAppAddDg').datagrid('deleteRow', rowIndex);
        }
    }
    $('#payableAppDg').datagrid("loadData",rows)
}

function doPrint(){
	var rows = $("#payableAppAddDg").datagrid('getRows');
	if(rows == ''){
		myTips("请先添加账单再打印","error");
		return;
	}
	console.log(rows);
	var idArry = "";
	var num = specialNumber();
	for(var i in rows){
		if(i==0){
			var jciId = rows[i].jciId;
			idArry += '{"jciId":'+jciId+',"jciSpecialNumber":"'+num+'"}';
			printAddress += rows[i].addCommunity+rows[i].addBuilding+rows[i].addDoorplateno+'&&';
		}else{
			var jciId = rows[i].jciId;
			idArry += ',{"jciId":'+jciId+',"jciSpecialNumber":"'+num+'"}';
			printAddress += rows[i].addCommunity+rows[i].addBuilding+rows[i].addDoorplateno+'&&';
		}
	}
	console.log(idArry);
	$.post("../updateIfPrint.action", {
		jciAudit : '['+idArry+']',
	},function(data){
		console.log(data);
	});
	var publicArrays = '';
	var year = formatTime(getNowFormatDate(), 2).split("-")[0];
	var month = formatTime(getNowFormatDate(), 2).split("-")[1];
	var day = formatTime(getNowFormatDate(), 2).split("-")[2];
	publicArrays += '{year:"'+year+'",month:"'+month+'",date:"'+day+'",';

	var nullArrsys = '{fangwu:"",shoukuanren:"",fukuanri:"",qishu:"",zhouqi:"",zhanghao:"",yinhang:"",money:"-"}';

	var printArray ='';
	var sumFlag = 0.00;
	for(var i in rows){
		var auditName = "";
		if(rows[i].auditName){
			auditName = rows[i].auditName;
		}
		var reviewName = "";
		if(rows[i].reviewName){
			reviewName = rows[i].reviewName;
		}
		var draweeName = "";
		if(rows[i].draweeName){
			draweeName = rows[i].draweeName;
		}
		if(i==0){
			printArray += publicArrays;
			printArray += 'jizhangren:"'+auditName
			+'",shenheren:"'+reviewName
			+'",fuheren:"'+draweeName
			+'",journal_arr:[';
		}
		var showMoney = rows[i].actualPayment;
		printArray += '{fangwu:"'+rows[i].detailedAddress+'",'
		  +'shoukuanren:"'+rows[i].hsBankName+'",'
		  +'fukuanri:"'+rows[i].jciFukuanri+'",'
		  +'qishu:"'+rows[i].jciPeriods+'",'
		  +'zhouqi:"'+rows[i].jciBeginPeriods+'~'+rows[i].jciEndPeriods+'",'
		  +'zhanghao:"'+rows[i].hsBankNum+'",'
		  +'yinhang:"'+rows[i].hsBankType+'",'
		  +'money:"'+ showMoney +'"},';
		//sumFlag = accAdd(sumFlag,rows[i].jciMoney);
		sumFlag = accAdd(sumFlag,showMoney);
		if(i==(rows.length-1)){
			if(rows.length==12){

			}else{
				var subFlag= 12-rows.length;
				for(var sub =0;sub<subFlag;sub++){
					printArray+=nullArrsys;
					if(sub!=(subFlag-1)){
						printArray += ',';
					}
				}
			}
			printArray+='],sum:"'+sumFlag+'"}';
		}
	}
	$.post("../insertHistoryPrint.action",{
		jhpJson 			: printArray,
		jhpType 			: "业主应付款申请单",
		jhpTitle			: getNowFormatDate()+" 生成业主应付款申请单",
		jhpUserId			: _loginUserId,
		jhpPrintAddress     : printAddress,
		jhpSpecialNumber    : num,
	}, function(data) {
		queryPayable(1,0);
		queryPayableApp(1,0);
	});
	parent.doPrintInExe(printArray,1);
	$("#payableAppAddDg").datagrid('loadData',[]);
	$("#needToAddNums").html(0);
}

//生成房东付款特殊编号
function specialNumber(){
	var strNumber = 'FD';
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
    for(var i=0;i<4;i++){
        rnd+=Math.floor(Math.random()*10);
    }
	strNumber = strNumber+year+month+day+rnd;

	console.log(strNumber);
	return strNumber;
}

//查看打印账单
function lookatThePrintBill(){
	var row = $("#payableDg").datagrid("getSelected");
	console.log(row);
	jciSpecialNumber = row.jciSpecialNumber
	if(jciSpecialNumber == ''){
		myTips("没有打印特殊编号！","error");
		return;
	}
	var skipJspName = '票据打印';
	var skipJspUrl = 'fg_historyPrint';
	var skipJspIcon = 'lishipiaojudayin';
	parent._skipToChildJson.push({
		target:"s",
		id:'searchType',
		jsonVal:'业主应付款申请单',
	});
	parent._skipToChildJson.push({
		target:"i",
		id:'jhpSpecialNumber',
		jsonVal:row.jciSpecialNumber,
	});
	window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
}

function advancedScreening(num){
	if(num==0){
		$("#advancedScreening").hide();
		$('#screening').attr('onclick','advancedScreening(1)');
	}else if(num==1){
		$("#advancedScreening").show();
		$('#screening').attr('onclick','advancedScreening(0)');
	}
}

