//租客账单生成收支相关的js
var IsCheckFlag = -1; //标识是否选中一期分期账单
var currentBillingData;
$(function () {
	//初始化生成分类查询menu菜单
	showAddFinancilTypeSearch('financilAdd','');
	for (var i in _acountType) {
		$('#setRenterEveryFinancialWay').append("<option value='" + i + "'>" + _acountType[i] + "</option>");
		$('#billsFinancialWay').append("<option value='" + _acountType[i] + "'>" + _acountType[i] + "</option>");
	}
	for (var i in _payType) {
		$('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
	}
	$('#renterInstallmentDg').datagrid({
		onClickRow: function (rowIndex, field, value) {
			console.log("点击");
			$("#ifCheckMoney").val('已变更');
			if (IsCheckFlag==rowIndex) {//不选择账单，只去未租房查水电读数
				IsCheckFlag = -1;
				$('#renterInstallmentDg').datagrid("clearSelections");
				queryNewMeterReading();
			}else{//选择账单，读取短信的金额
				IsCheckFlag = rowIndex;
				chooseRenterInstallmentDg();
			}
			checkMoney();
			$('#choseConstractInstallmentDlg [update="update"]').attr('disabled', true);
		}
	});
	$('#setRenterEveryFinancialTable').datagrid();
});

//打开选择账单列表
function choseConstractInstallment(index, jciLabelType){
	$('#monthlyBillsDgIndex').val(index);
	if(jciLabelType == 0){
		$("#choseConstractInstallmentDlg").dialog({
			title : '选择账单',
			top : getTop(410),
			left : getLeft(1000),
			width : 1000,
			height : 410,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#choseConstractInstallmentDlg [update="update"]').attr('disabled', true);
			}
		});
		//查账单
		queryRenterInstallment(1,0);
		//查最新读数
		queryNewMeterReading();
		IsCheckFlag = -1;
		$("#choseConstractInstallmentDlg").dialog('open');
	}else if(jciLabelType ==1){
		$("#temporaryFinancialBillsDlg").dialog({
			title : '生成临时、金融账单收支',
			top : getTop(450),
			left : getLeft(650),
			width : 650,
			height : 450,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#temporaryFinancialBillsDlg input').val('');
				$('#temporaryFinancialBillsDlg select').val('');
				$('#temporaryFinancialBillsDlg [require="require"]').each(function(){
						$(this).css("border","1px solid #A9A9A9");
				})
			}
		});	
		$("#temporaryFinancialBillsDlg").dialog("open");
		$('#addAuspiciousBill').datagrid({
				columns : 
					[ [
						{
							field : 'nature',
							title : '性质',
							width : 20,
							align : 'center'
						},
						{
							field : 'species',
							title : '种类',
							width : 20,
							align : 'center'
						},
						{
							field : 'jciMoney',
							title : '金额',
							width : 20,
							align : 'center',
							editor : {
								type : "numberbox",
								options : {
									precision : 2
								}
							},
						},
						{
							field : 'jciRemark',
							title : '备注',
							width : 20,
							align : 'center',
							editor : 'textbox'
						},
					] ],
				width : '100%',
				height : '100%',
				singleSelect : true,
				autoRowHeight : false,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				rowStyler : function(index, row) {
					return 'color:#000;';
				},
			}
		);
		temporaryFinancialBills();
	}else if(jciLabelType == 3){
		$("#temporaryFinancialBillsDlg").dialog({
			title : '签约账单收支',
			top : getTop(450),
			left : getLeft(650),
			width : 650,
			height : 450,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#temporaryFinancialBillsDlg input').val('');
				$('#temporaryFinancialBillsDlg select').val('');
				$('#temporaryFinancialBillsDlg [require="require"]').each(function(){
					$(this).css("border","1px solid #A9A9A9");
				})
			}
		});
		$("#temporaryFinancialBillsDlg").dialog("open");
		$('#addAuspiciousBill').datagrid({
				columns :
					[ [
						{
							field : 'nature',
							title : '性质',
							width : 20,
							align : 'center'
						},
						{
							field : 'species',
							title : '种类',
							width : 20,
							align : 'center'
						},
						{
							field : 'jciMoney',
							title : '金额',
							width : 20,
							align : 'center',
							editor : {
								type : "numberbox",
								options : {
									precision : 2
								}
							},
						},
					] ],
				width : '100%',
				height : '100%',
				singleSelect : true,
				autoRowHeight : false,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				rowStyler : function(index, row) {
					return 'color:#000;';
				},
			}
		);
		contractBills();
	}
	/*energy();*/
}


//生成租客每期收支窗口
function setRenterEveryFinancial(){
	var row = $('#monthlyBillsDg').datagrid('getSelected');
	$("#setRenterEveryFinancialDlg").dialog({
		title : '生成租客每期收支',
		top : getTop(450),
		left : getLeft(650),
		width : 650,
		height : 450,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#setRenterEveryFinancialDlg input').val('');
			$('#setRenterEveryFinancialDlg select').val('');
			$('#setRenterEveryFinancialAccountName').empty();
			$("#setRenterEveryFinancialTable").datagrid("loadData", []);
		}
	});
	$("#setRenterEveryFinancialDlg").dialog("open");
	$('#setRenterEveryFinancialIfMsg').prop("checked", false);
	$("#setRenterEveryHouseCoding").val(row.hrId);
	$("#setRenterEveryHouseCodingType").val('已租');
	$("#setRenterEveryFinancialHouseId").val(row.hrHouseId);
	$("#setRenterEveryFinancialHouseStoreId").val(row.hrHouse4storeId);
	$("#setRenterEveryFinancialHouseRentId").val(row.hrId);
	$("#setRenterEveryFinancialBelongType").val('租客');
	$("#setRenterEveryFinancialRenterId").val(row.hrRenterId);
	$("#setRenterEveryFinancialLandlordId").val(row.hrLandlordId);
	$.post("../selectHouseRentName.action",{
		renterId : row.hrRenterId,
	}, function(data){
		data=data.body;
		$("#setRenterEveryFinancialPopId").val(data[0].renterPopulationId);
	});
	$("#setRenterEveryFinancialBelongName").val(row.renterPopName);
	$("#setRenterEveryFinancialBelongId").val(row.hrRenterId);
	$('#setRenterEveryFinancialDoTime').val(formatTime(getNowFormatDate(), 2));
	$("#setRenterEveryFinancialBelongAddress").val(row.hrAddCommunity + '' + row.hrAddBuilding + '' + row.hrAddDoorplateno);
	$("#setRenterEveryFinancialManage").val(row.hrManageCost);
	$("#setRenterEveryFinancialTv").val(row.hrTvCharge);
	$("#setRenterEveryFinancialNet").val(row.hrWifiCharge);
	//查本次读数的抄表日期
		$.post('../selectWegDate.action',{
			wegrdHouse4storeId: row.hrHouse4storeId,
			wegrdType: '水表',
			wegrdNums: $("#srefWaterThis").val(),
		}, function(data){
			if (data.code > 0) {
				$("#setWaterDate").val(data.body[data.body.length-1].wegrdMonth);
			}
		});
		$.post('../selectWegDate.action',{
			wegrdHouse4storeId: row.hrHouse4storeId,
			wegrdType: '电表',
			wegrdNums: $("#srefElectritThis").val(),
		}, function(data){
			if (data.code > 0) {
				$("#setElectDate").val(data.body[data.body.length-1].wegrdMonth);
			}
		});
		$.post('../selectWegDate.action',{
			wegrdHouse4storeId: row.hrHouse4storeId,
			wegrdType: '燃气表',
			wegrdNums: $("#srefGasThis").val(),
		}, function(data){
			if (data.code > 0) {
				$("#setGasDate").val(data.body[data.body.length-1].wegrdMonth);
			}
		});
		$.post('../selectWegDate.action',{
			wegrdHouse4storeId: row.hrHouse4storeId,
			wegrdType: '热水',
			wegrdNums: $("#srefHotWaterThis").val(),
		}, function(data){
			if (data.code > 0) {
				$("#setHotWaterDate").val(data.body[data.body.length-1].wegrdMonth);
			}
		});
		$.post('../selectWegDate.action',{
			wegrdHouse4storeId: row.hrHouse4storeId,
			wegrdType: '暖气',
			wegrdNums: $("#srefHotAirThis").val(),
		}, function(data){
			if (data.code > 0) {
				$("#setHotAirDate").val(data.body[data.body.length-1].wegrdMonth);
			}
		});
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
	}else if(type==4){
		var faPaymentType = $("#billsFinancialWay").find("option:selected").text();
		$("#billsFinancialBankNums").val('');
		$("#billsFinancialAccountNums").val('');
		$("#billsFinancialAccountBelong").val('');
		$("#billsFinancialAccountName").empty();
		$("#billsFinancialAccountName").append("<option></option>");
		if(faPaymentType == ""){
			return;
		}
		$.post("../selectNamePublic.action", {
			faPaymentType:faPaymentType,
		}, function(data) {
			$("#billsFinancialAccountName").empty();
			$("#billsFinancialAccountName").append("<option></option>");
			for (var i in data.body) {
				$("#billsFinancialAccountName").append(
						"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
			}
		});
	}
}
function getAccountId(type) {
	if(type==0){
		if($(".add_financial_accountName").val()==''){
			$(".add_financial_bankNums").val("");
			$(".add_financial_accountBelong").val("");
			$(".add_financial_accountNums").val("");
		}else{
			$(".add_financial_bankNums").val($(".add_financial_accountName").val().split("*#*")[0]);
			$(".add_financial_accountBelong").val($(".add_financial_accountName").val().split("*#*")[1]);
			$(".add_financial_accountNums").val($(".add_financial_accountName").val().split("*#*")[2]);
		}
	}else if(type==1){
		if($("#setRenterEveryFinancialAccountName").val()==''){
			$("#setRenterEveryFinancialBankNums").val("");
			$("#setRenterEveryFinancialAccountBelong").val("");
			$("#setRenterEveryFinancialAccountNums").val("");
		}else{
			$("#setRenterEveryFinancialBankNums").val($("#setRenterEveryFinancialAccountName").val().split("*#*")[0]);
			$("#setRenterEveryFinancialAccountBelong").val($("#setRenterEveryFinancialAccountName").val().split("*#*")[1]);
			$("#setRenterEveryFinancialAccountNums").val($("#setRenterEveryFinancialAccountName").val().split("*#*")[2]);
		}
	}else if(type==2){
		if($("#setRenterNewFinancialAccountName").val()==''){
			$("#setRenterNewFinancialBankNums").val("");
			$("#setRenterNewFinancialAccountBelong").val("");
			$("#setRenterNewFinancialAccountNums").val("");
		}else{
			$("#setRenterNewFinancialBankNums").val($("#setRenterNewFinancialAccountName").val().split("*#*")[0]);
			$("#setRenterNewFinancialAccountBelong").val($("#setRenterNewFinancialAccountName").val().split("*#*")[1]);
			$("#setRenterNewFinancialAccountNums").val($("#setRenterNewFinancialAccountName").val().split("*#*")[2]);
		}
	}else if(type==3){
		if($("#billsFinancialAccountName").val()==''){
			$("#billsFinancialBankNums").val("");
			$("#billsFinancialAccountBelong").val("");
			$("#billsFinancialAccountNums").val("");
		}else{
			$("#billsFinancialBankNums").val($("#billsFinancialAccountName").val().split("*#*")[0]);
			$("#billsFinancialAccountBelong").val($("#billsFinancialAccountName").val().split("*#*")[1]);
			$("#billsFinancialAccountNums").val($("#billsFinancialAccountName").val().split("*#*")[2]);
		}
	}
}
//查询租客账单
function queryRenterInstallment(page,type){
	var index = $('#monthlyBillsDgIndex').val();
	var row = $('#monthlyBillsDg').datagrid('getRows')[index];
	var startNum = (parseInt(page) - 1) * 8;
	var endNum = 8;
	var jciState = $("#searchJciState2").val();
	var jciHouse4rentId = row.hrId;
	var jciRenterId = row.hrRenterId;
	var jciLabelType = 1;
	$.post("../queryAllContractInstallment.action", {
		startNum 				: startNum,
		endNum 					: endNum,
		contractType 			: "renter",
		jciState 				: jciState,
		jciHouse4rentId			: jciHouse4rentId,
		jciRenterId				: jciRenterId,
		sort					: 2,
		jciLabelType 			: jciLabelType,
		temporaryAuspiciousBill :1,
	},function(data){
		if(data.code<0){
			sourcePage(0,0,5);
			$('#renterInstallmentDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if(page == 1 && type == 0){
				sourcePage(data[0].totalNum,page,5);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].pageNumber = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}
			$("#renterInstallmentDg").datagrid("loadData",data);
		}
	}, "json");
}
//核算费用，算出最新欠结
function checkMoney(){
	var powerMoneyArry = $('#srefPowerDiv input');//所有能源输入框
	var rentMoney = $("#srefRentMoney").val();//租金
	var realPay = $("#srefRealPay").val();//实交金额
	var pastOwe = $("#srefPastOwe").val();//历史欠结、历史余额
	if(realPay==''&&realPay!=0){
		$("#setRenterEveryFinancialTips").html("请输入实交金额!");
		return;
	}
	$("#setRenterEveryFinancialTips").html("");
	//能源杂费
	var powerMoney = 0;
	for(var i = 0;i<powerMoneyArry.length;i++){
		if(!$("#"+powerMoneyArry[i].id).attr("not-energy-data")){
			powerMoney = accAdd(powerMoney,$("#"+powerMoneyArry[i].id).val());
		}
		
	}
	$("#srefPowerMoney").val(powerMoney);
	//滞纳金
	var damages = $("#srefDamages").val();
	//算出应收金额
	var shouldPay = accAdd(pastOwe,accAdd(damages,accAdd(powerMoney,rentMoney)));//应收金额=历史欠结+滞纳金+能源杂费+租金
	$("#srefShouldPay").val(shouldPay);
	//最新欠结
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
	$("#srefAllOwe").val(neOwe);
	$("#ifCheckMoney").val("已核算");
}

//点击生成收支
function addSetRenterEveryFinancial(){
	if($("#ifCheckMoney").val()=="已变更"){
		$('#setRenterEveryFinancialTips').html("费用已经发生变化，请重新核算费用！");
		return;
	}
	$('#setRenterEveryFinancialTips').html("");
	//经手人
	for(var j in _userInfoData){
		if(_loginUserId == _userInfoData[j].userId){
			$("#jfHandlersGetUserId").val(_userInfoData[j].userId);
			$("#jfHandlersShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}
	var rowRenter = $('#renterInstallmentDg').datagrid('getSelected');
	var jciBeginPeriods = '';
	var jciEndPeriods = '';
	if (rowRenter != null) {
		jciBeginPeriods = rowRenter.jciBeginPeriods;
		jciEndPeriods = rowRenter.jciEndPeriods;
	}
	
	var dataJson = [];
	
	var shouldPay = $("#srefShouldPay").val();//应收金额
	var realPay = $("#srefRealPay").val();//实收金额
	
	var newOwe = $("#srefNewOwe").val();//最新欠结
	var newSave = $("#srefNewSave").val();//最新余额
	var thisOwe = $("#srefAllOwe").val();//最新欠结或余额
	
	var inputArry = $("#choseConstractInstallmentDlg input");
	for(var i=0;i<inputArry.length;i++){
		if($("#"+inputArry[i].id).attr("mType")){
			if($("#"+inputArry[i].id).val()!=0){
				if($("#"+inputArry[i].id).val()==''){
					$("#"+inputArry[i].id).val(0.00);
				}
				var historicalReadings = '';
				var jfFinanNote = $("#"+inputArry[i].id).attr("mNote")+$("#"+inputArry[i].id).val()+"元。";
				var note = '';
				
				if($("#"+inputArry[i].id).attr("mhistorys")){
					 historicalReadings = $("#"+inputArry[i].id).attr("mhistorys");
					 jfFinanNote ='交清底数：'+historicalReadings.split(",")[1];
				}
				console.log(historicalReadings);
				var waterElectricalIdentification = '';
				if($("#"+inputArry[i].id).attr("mType")=="水费"){
					waterElectricalIdentification = '水';
					jfFinanNote+=" 立方,"+$("#"+inputArry[i].id).val()+"元。";
				}else if($("#"+inputArry[i].id).attr("mType")=="电费"){
					waterElectricalIdentification = '电';
					jfFinanNote+=" 度,"+$("#"+inputArry[i].id).val()+"元。";
				}else if($("#"+inputArry[i].id).attr("mType")=="燃气费"){
					waterElectricalIdentification = '气';
					jfFinanNote+=" 立方,"+$("#"+inputArry[i].id).val()+"元。";
				}else if($("#"+inputArry[i].id).attr("mType")=="热水费"){
					waterElectricalIdentification = '热水';
					jfFinanNote+=" 立方,"+$("#"+inputArry[i].id).val()+"元。";
				}else if($("#"+inputArry[i].id).attr("mType")=="暖气费"){
					waterElectricalIdentification = '暖气';
					jfFinanNote+=" 立方,"+$("#"+inputArry[i].id).val()+"元。";
				}else if($("#"+inputArry[i].id).attr("mType")=="租金"){
					jfFinanNote ="收租周期：从 "+jciBeginPeriods +" 至 "+ jciEndPeriods 
						+" 房屋租金："+$("#"+inputArry[i].id).val()+"元。";
					note ="从 "+jciBeginPeriods +" 至 "+ jciEndPeriods;
				}else if($("#"+inputArry[i].id).attr("mType")=="逾期-违约金"){
					jfFinanNote +="违约天数"+$("#srefNotDays").val()+"天。";
					note = "违约"+$("#srefNotDays").val()+"天";
				}else if($("#"+inputArry[i].id).attr("mType")=="物业管理费"){
					note ="从 "+jciBeginPeriods +" 至 "+ jciEndPeriods;
				}else if($("#"+inputArry[i].id).attr("mType")=="租赁管理服务费"){
					note ="从 "+jciBeginPeriods +" 至 "+ jciEndPeriods;
				}
				dataJson.push({
					jfTicketNumber 		: 	'',
					jfNatureOfThe		: 	'收入',
					jfSumMoney 			: 	$("#"+inputArry[i].id).val(),
					jfBigType			:	$("#"+inputArry[i].id).attr("bigType"),
					jfAccountingSpecies : 	$("#"+inputArry[i].id).attr("mType"),
					jfFinanNote 		: 	jfFinanNote,
					note				:	note,
					historicalReadings	:   historicalReadings,
					waterElectricalIdentification:waterElectricalIdentification,
				});
			}
		}
	}
	
	$("#setRenterEveryFinanciaBegin").val(jciBeginPeriods);
	$("#setRenterEveryFinanciaEnd").val(jciEndPeriods);
	$('#setRenterEveryFinancialMoneyTotal').val(shouldPay);
	$('#setRenterEveryFinancialMoneyGet').val(realPay);
	$('#setRenterEveryFinancialMoneySum').val(thisOwe);
	$("#setRenterEveryFinancialTable").datagrid("loadData",dataJson);
	if(thisOwe>0){
		$("#setRenterEveryOweDiv").show();
		$("#setRenterEverySaveDiv").hide();
	}else{
		$("#setRenterEveryOweDiv").hide();
		$("#setRenterEverySaveDiv").show();
	}
	$("#setRenterEveryOwe").val(newOwe);//最新欠结
	$("#setRenterEverySave").val(newSave);//最新余额
	
	//生成欠结类收支
	var hisOwe = $('#srefHisOwe').val();//历史欠结
	var hisSave = $('#srefHisSave').val();//历史余额
	var newOwe = $('#srefNewOwe').val();//最新欠结
	var NewSave = $('#srefNewSave').val();//最新余额
	if (hisOwe != 0 || hisSave != 0 || newOwe!=0 || NewSave != 0) {//有欠结时生成，没欠结跳过
		var insertJson = [];
		var shouldGet =  $('#srefShouldPay').val();
		var realGet =  $('#srefRealPay').val();
		var getSum = accSub(realGet,shouldGet);//实际结余
		//只有最新余额
		if(hisOwe==0 && hisSave==0 && NewSave != 0){console.log('只有最新余额')
			insertJson.push({
				jfSumMoney 			: getSum,
				jfNatureOfThe 		: "收入",
				jfBigType			: "欠结类",
				jfAccountingSpecies : "租客预存款",
				jfFinanNote 		: '租客预存款'+getSum+"元。",
			});
		}
		//只有最新欠结
		if(hisOwe==0 && hisSave==0 && newOwe!=0){
			if(getSum>0){console.log('只有最新欠结,'+getSum+'>0')
				insertJson.push({
					jfSumMoney 			: getSum,
					jfNatureOfThe 		: "收入",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客预存款",
					jfFinanNote 		: '租客预存款'+getSum+"元。",
				});
			}
			if(getSum<0){console.log('只有最新欠结,'+getSum+'<0');
				insertJson.push({
					jfSumMoney 			: accSub(0,getSum),
					jfNatureOfThe 		: "支出",
					jfBigType			: "财务类",
					jfAccountingSpecies : "应收款",
					jfFinanNote 		: '应收款'+accSub(0,getSum)+"元。",
				});
				insertJson.push({
					jfSumMoney 			: accSub(0,getSum),
					jfNatureOfThe 		: "支出",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客欠结款",
					jfFinanNote 		: '租客欠结款'+accSub(0,getSum)+"元。",
				});
			}
		}
		//有历史欠结
		if(hisOwe!=0){console.log('有历史欠结');
			insertJson.push({
				jfSumMoney 			: hisOwe,
				jfNatureOfThe 		: "收入",
				jfBigType			: "欠结类",
				jfAccountingSpecies : "租客还欠结款",
				jfFinanNote 		: '租客还欠结款'+hisOwe+"元。",
			});
			if(getSum>0){console.log('有历史欠结,'+getSum+'>0');
				insertJson.push({
					jfSumMoney 			: getSum,
					jfNatureOfThe 		: "收入",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客预存款",
					jfFinanNote 		: '租客预存款'+getSum+"元。",
				});
			}
			if(getSum<0){console.log('有历史欠结,'+getSum+'<0');
				insertJson.push({
					jfSumMoney 			: accSub(0,getSum),
					jfNatureOfThe 		: "支出",
					jfBigType			: "财务类",
					jfAccountingSpecies : "应收款",
					jfFinanNote 		: '应收款'+accSub(0,getSum)+"元。",
				});
				insertJson.push({
					jfSumMoney 			: accSub(0,getSum),
					jfNatureOfThe 		: "支出",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客欠结款",
					jfFinanNote 		: '租客欠结款'+accSub(0,getSum)+"元。",
				});
			}
		}
		//有历史余额
		if(hisSave!=0){console.log('有历史余额');
			insertJson.push({
				jfSumMoney 			:  hisSave,
				jfNatureOfThe 		: "支出",
				jfBigType			: "欠结类",
				jfAccountingSpecies : "还租客预存款",
				jfFinanNote 		: '还租客预存款'+ hisSave +"元。",
			});
			if(getSum>0){console.log('有历史余额,'+getSum+'>0');
				insertJson.push({
					jfSumMoney 			: getSum,
					jfNatureOfThe 		: "收入",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客预存款",
					jfFinanNote 		: '租客预存款'+getSum+"元。",
				});
			}
			if(getSum<0){console.log('有历史余额,'+getSum+'<0');
				insertJson.push({
					jfSumMoney 			: accSub(0,getSum),
					jfNatureOfThe 		: "支出",
					jfBigType			: "财务类",
					jfAccountingSpecies : "应收款",
					jfFinanNote 		: '应收款'+accSub(0,getSum)+"元。",
				});
				insertJson.push({
					jfSumMoney 			: accSub(0,getSum),
					jfNatureOfThe 		: "支出",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客欠结款",
					jfFinanNote 		: '租客欠结款'+accSub(0,getSum)+"元。",
				});
			}
		}
		for(var i in insertJson){
			if(insertJson[i].jfSumMoney!=0){
				$('#setRenterEveryFinancialTable').datagrid('insertRow', {
					index : 0,
					row : insertJson[i]
				});
			}
		}
	}
	//修改金额后要生成的已租房跟进的内容
	setRenterEveryFinancial();
}

//执行生成租客每期收支账单
function doSetRenterEveryFinancial(){
	var rows = $("#setRenterEveryFinancialTable").datagrid("getRows");
	if ($('#setRenterEveryFinancialDiv input').length != 0) {
		$.messager.alert('操作提示', '数据表中有未完成编辑的数据，请完成编辑后再保存！');
		return;
	}
	var moneySum = $("#setRenterEveryFinancialMoneySum").val();
	var moneyGet = $("#setRenterEveryFinancialMoneyGet").val();
	var moneyTotal = $("#setRenterEveryFinancialMoneyTotal").val();
	var relationBelongType = $("#setRenterEveryFinancialBelongType").val();
	var relationBelong = $("#setRenterEveryHouseCoding").val();
	var relationBelongChose = $("#setRenterEveryHouseCodingType").val();
	var relationBelongName = $("#setRenterEveryFinancialBelongName").val();
	var relationBelongId = $("#setRenterEveryFinancialBelongId").val();
	var addFinancialHouseId = $("#setRenterEveryFinancialHouseId").val();
	var addFinancialHouseStoreId = $("#setRenterEveryFinancialHouseStoreId").val();
	var addFinancialHouseRentId = $("#setRenterEveryFinancialHouseRentId").val();
	var addFinancialRenterId = $("#setRenterEveryFinancialRenterId").val();
	var addFinancialLandlordId = $("#setRenterEveryFinancialLandlordId").val();
	var jfStartCycle1 = $("#setRenterEveryFinanciaBegin").val();
	var jfEndCycle1 = $("#setRenterEveryFinanciaEnd").val();
	var jciId = $("#renterInstallmentId").val();//分期账单ID
	var jciOverdueDays = $('#srefNotDays').val();
	var jfPayType= $("#everyFinancialPayType").val();
	if (relationBelongName == '') {
		myTips('收支归属信息不完整！请完善后再进行保存！', "error");
		return;
	} else if (rows.length == 0){
		myTips('没有可用于添加的数据', "error");
		return;
	} else if ($("#setRenterEveryFinanciaBegin").val()==''||$("#setRenterEveryFinanciaEnd").val()=='') {
		myTips('归属周期不可为空！', "error");
		return;
	} else if ($("#setRenterEveryFinancialBankNums").val()=='') {
		myTips('请选择收支账户！', "error");
		return;
	} else if (jfPayType =='') {
		myTips('请选择收支方式！', "error");
		return;
	}
	//组装收支jsonArray
	jfPayType = '"jfPayType":"' + jfPayType + '"';
	var belongId = '"jfRenterId":"' + addFinancialRenterId + '",'+'"jfLandlordId":"' + addFinancialLandlordId + '"';
	var belongConding  = '"jfHouse4rentId":"' + addFinancialHouseRentId + '",'+'"jfHouse4storeId":"' + addFinancialHouseStoreId + '",'+'"jfHouseId":"' + addFinancialHouseId + '"';
	var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
	var jfBillingDate = '"jfBillingDate":"' + $("#setRenterEveryFinancialDoTime").val() + '"';
	var jfHandlers = '"jfHandlers":"' + $("#jfHandlersGetUserId").val() + '"';
	var jfTheOwnershipType = '"jfTheOwnershipType":"' + relationBelongType + '"';
	var jfBelongingToTheName = '"jfBelongingToTheName":"' + relationBelongName + '"';
	var jfClosedWay =  '"jfClosedWay":"' + $("#setRenterEveryFinancialWay").find("option:selected").text()+ '"';
	var jfFinancialCoding = '"jfFinancialCoding":"'
			+ formatTime(getNowFormatDate(), 3)
			+ Math.floor(Math.random() * 10) 
			+ Math.floor(Math.random() * 10)
			+ Math.floor(Math.random() * 10) + '"';
	
	var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ','+_loginUserName+'添加收支记录<br>"';
	var jfAccountId = '"jfAccountId":"' + $("#setRenterEveryFinancialBankNums").val() + '"';
	var department = '"department":"' 	+ _loginDepartment + '"';
	var jfAccountingWhy = '"jfAccountingWhy":"' + $("#setRenterEveryFinancialBelongAddress").val() + '"';
	var storefront = '"storefront":"' + _loginStore + '"';
	var jfStartCycle = '"jfStartCycle":"'+ jfStartCycle1 + '"';
	var jfEndCycle	= '"jfEndCycle":"'+ jfEndCycle1 + '"';
	var strArray = jfAccountId + "," + jfAccountingWhy + "," + belongId + ","
		+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + "," + jfClosedWay + ","
		+ belongConding + "," + jfBillingDate + "," 
		+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","+jfStartCycle+","+jfEndCycle+","
		+storefront+","+department+","+jfPayType;
	
	//生成包含水电气的收支要用的
	var jmarWaterDiff = $("#srefWaterNum").val();
	var jmarWaterMoney  = $("#srefWaterMoney").val();
	var jmarElectricDiff = $("#srefElectritNum").val();
	var jmarElectricMoney = $("#srefElectritMoney").val();
	var jmarGasDiff = $("#srefGasNum").val();
	var jmarGasMoney = $("#srefGasMoney").val();
	//tzl
	var jmarHotWaterDiff = $("#srefHotWaterNum").val();
	var jmarHotWaterMoney = $("#srefHotWaterMoney").val();
	//tzl
	var jmarHotAirDiff = $("#srefHotAirNum").val();
	var jmarHotAirMoney = $("#srefHotAirMoney").val();
	
	var jmarManageCharge = $("#srefManageMoney").val();
	var jmarServerCharge = $("#srefServerMoney").val();
	var jmarWifiCharge = $("#srefWifiMoney").val();
	var jmarTvCharge = $("#srefTvMoney").val();
	var jmarLiquidatedDamages = $("#srefDamages").val();
	var jmarThisArrears = $("#srefThisOwe").val();
	var jmarCumulativeArrears = $("#srefAllOwe").val();
	
	var ifPower= 0;//用于判断是否包含水电气费
	var giveMoney = 0.00;//短信金额
	
	/***********************************************保存账单内容开始***************************************/
	var row = $('#monthlyBillsDg').datagrid('getSelected');
	var jciMessageNote = '';
	var sysRentMoney,sysRentWater,sysRentEcl,sysRentGas,sysRentOwe,sysRentTV,sysRentWifi,sysRentManage,sysServer,sysOther,sysPower,sysRentDamages,
		sysPirce,sendMessageRentMoney,sendMessageRentWater,sendMessageRentEcl,sendMessageRentGas,sendMessageRentOwe,sendMessageRentTV,sendMessageRentWifi
		,sendMessageRentManage,sendMessageServer,sendMessageRentOther,sendMessagePower,sendMessageRentDamages,sendMessagePirce,monthlyBillsThisWater
		,monthlyBillsLastWater,monthlyBillsThisElectrit,monthlyBillsLastElectrit,monthlyBillsThisGas,monthlyBillsLastGas,
		monthlyBillsThisHotwater,monthlyBillsLastHotwater,monthlyBillsThisHotAir,monthlyBillsLastHotAir,//tzl
		sysRentHotWater,sysRentHotAir,sendMessageRentHotWater,sendMessageRentHotAir
		;
	if(row.jciLabelType != '' && row.jciLabelType != null){
		
		sysRentHotWater = 0.0;
		sysRentHotAir = 0.0;
		
		sysRentMoney = $("#srefShouldPay").val();
		sysRentWater = 0.0;
		sysRentEcl = 0.0;
		sysRentGas = 0.0;
		sysRentOwe = 0.0;
		sysRentTV = 0.0;
		sysRentWifi = 0.0;
		sysRentManage = 0.0;
		sysServer = 0.0;
		sysOther = 0.0;
		sysPower = parseFloat($("#srefShouldPay").val()) - parseFloat($("#srefDamages").val());
		sysRentDamages = $('#srefDamages').val();
		sysPirce = $("#srefShouldPay").val();	
		sendMessageRentMoney = 0.0;
		sendMessageRentWater = 0.0;
		sendMessageRentEcl = 0.0;
		sendMessageRentGas = 0.0;
		
		sendMessageRentHotWater = 0.0;
		sendMessageRentHotAir = 0.0;
		
		sendMessageRentOwe = 0.0;
		sendMessageRentTV = 0.0;
		sendMessageRentWifi = 0.0;
		sendMessageRentManage = 0.0;
		sendMessageServer = 0.0;
		sendMessageRentOther = 0.0;
		sendMessagePower = parseFloat($("#srefShouldPay").val()) - parseFloat($("#srefDamages").val());
		sendMessageRentDamages = $('#srefDamages').val();
		sendMessagePirce = $("#srefShouldPay").val();
		monthlyBillsThisWater = 0;
		monthlyBillsLastWater = 0;
		monthlyBillsThisElectrit = 0;
		monthlyBillsLastElectrit = 0;
		monthlyBillsThisGas = 0;
		monthlyBillsLastGas = 0;
		
		monthlyBillsThisHotwater = 0;
		monthlyBillsLastHotwater = 0;
		monthlyBillsThisHotAir = 0;
		monthlyBillsLastHotAir = 0;
		
	}else{
		sysRentMoney = $("#srefShouldPay").val();
		sysRentWater = $("#srefWaterMoney").val();
		sysRentEcl = $("#srefElectritMoney").val();
		sysRentGas = $("#srefGasMoney").val();
		
		sysRentHotWater = $("#srefHotWaterMoney").val();
		sysRentHotAir = $("#srefHotAirMoney").val();
		
		sysRentOwe = $("#srefHisOwe").val();
		sysRentTV = $("#srefTvMoney").val();
		sysRentWifi = $("#srefWifiMoney").val();
		sysRentManage = $("#srefManageMoney").val();
		sysServer = $("#srefServerMoney").val();
		sysOther = $("#srefOtherSys").val();
		sysPower = parseFloat($("#srefShouldPay").val()) - parseFloat($("#srefDamages").val());
		sysRentDamages = $('#srefDamages').val();
		sysPirce = $("#srefShouldPay").val();
		sendMessageRentMoney = $("#srefRentMoney").val();
		sendMessageRentWater = $("#srefWaterMoneyMsg").val();
		sendMessageRentEcl = $("#srefElectritMoneyMsg").val();
		sendMessageRentGas = $("#srefGasMoneyMsg").val();
		
		sendMessageRentHotWater = $("#srefHotWaterMoneyMsg").val();
		sendMessageRentHotAir = $("#srefHotAirMoneyMsg").val();
		
		sendMessageRentOwe = $("#srefHisOwe").val();
		sendMessageRentTV = $("#srefTvMoneyMsg").val();
		sendMessageRentWifi = $("#srefWifiMoneyMsg").val();
		sendMessageRentManage = $("#srefManageMoneyMsg").val();
		sendMessageServer = $("#srefServerMoneyMsg").val();
		sendMessageRentOther = $("#srefOtherMsg").val();
		sendMessagePower = parseFloat($("#srefShouldPay").val()) - parseFloat($("#srefDamages").val());
		sendMessageRentDamages = $('#srefDamages').val();
		sendMessagePirce = $("#srefShouldPay").val();
		monthlyBillsThisWater = $("#srefWaterThis").val();
		monthlyBillsLastWater = $("#srefWaterLast").val();
		monthlyBillsThisElectrit = $("#srefElectritThis").val();
		monthlyBillsLastElectrit = $("#srefElectritLast").val();
		monthlyBillsThisGas = $("#srefGasThis").val();
		monthlyBillsLastGas = $("#srefGasLast").val();
		//tzl
		monthlyBillsThisHotwater = $("#srefHotWaterThis").val();
		monthlyBillsLastHotwater = $("#srefHotWaterLast").val();
		monthlyBillsThisHotAir = $("#srefHotAirThis").val();
		monthlyBillsLastHotAir = $("#srefHotAirLast").val();
	}
	//抄表日期
	var waterDate = $("#setWaterDate").val();
	var electDate = $("#setElectDate").val();
	var gasDate = $("#setGasDate").val();
	
	var hotWaterDate = $("#setHotWaterDate").val();
	var hotAirDate = $("#setHotAirDate").val();
	
	console.log("55555::"+gasDate);
	//开始生成短信json
	var sendMessageNote = $("#sendMessageNote").val();
	var jciMessageNote = {
		sys : {
				
				
				rent	: sysRentMoney,
				water 	: sysRentWater,
				elect 	: sysRentEcl,
				gas 	: sysRentGas,
				
				hotWater : sysRentHotWater,
				hotAir : sysRentHotAir,
				
				owe		: sysRentOwe,
				tv 		: sysRentTV,
				wifi 	: sysRentWifi,
				manager : sysRentManage,
				server 	: sysServer,
				other	: sysOther,			
				power	: sysPower,
				damages	: sysRentDamages,
				total 	: sysPirce,	
		},
		msg : {
			
				
				
				rent	: sendMessageRentMoney,
				water 	: sendMessageRentWater,
				elect 	: sendMessageRentEcl,
				gas 	: sendMessageRentGas,
				
				hotWater : sendMessageRentHotWater,
				hotAir : sendMessageRentHotAir,

				owe		: sendMessageRentOwe,
				tv 		: sendMessageRentTV,
				wifi 	: sendMessageRentWifi,
				manager : sendMessageRentManage,
				server 	: sendMessageServer,
				power	: sendMessagePower,
				damages	: sendMessageRentDamages,
				total 	: sendMessagePirce,	
				other	: sendMessageRentOther,
		},
		note:sendMessageNote,
		waterThis : monthlyBillsThisWater,
		electThis : monthlyBillsThisElectrit,
		gasThis : monthlyBillsThisGas,
		
		hotWaterThis : monthlyBillsThisHotwater,
		hotAirThis : monthlyBillsThisHotAir,
		
		waterLast : monthlyBillsLastWater,
		electLast : monthlyBillsLastElectrit,
		gasLast : monthlyBillsLastGas,
		
		hotWaterLast : monthlyBillsLastHotwater,
		hotAirLast : monthlyBillsLastHotAir,
		
		waterDate : waterDate,
		electDate : electDate,
		gasDate : gasDate,
		
		hotWaterDate : hotWaterDate,
		hotAirDate : hotAirDate,
	};
	jciMessageNote = JSON.stringify(jciMessageNote);
	/***********************************************保存账单内容结束***************************************/
	
	//生成已租跟进相关数据
	var rentNote= '收取租客每期租金，收取明细：';
	var rentSum = 0.00;//应交金额
	var readlySum = 0.00;//实际金额
	for(var i in rows){
		if(rows[i].jfAccountingSpecies=="水费"||rows[i].jfAccountingSpecies=="电费"||rows[i].jfAccountingSpecies=="燃气费"){
			ifPower++;
		}
		if(		rows[i].jfAccountingSpecies!="租客欠结款"
			&&	rows[i].jfAccountingSpecies!="租客预存款"
			&&	rows[i].jfAccountingSpecies!="租客还欠结款"
			&&	rows[i].jfAccountingSpecies!="还租客预存款"
			&&	rows[i].jfAccountingSpecies!="应收款"){
			rentNote+=rows[i].jfAccountingSpecies+"： "+rows[i].jfSumMoney+" 元;";
			rentSum = accAdd(rows[i].jfSumMoney,rentSum);
		}else if(rows[i].jfAccountingSpecies=="租客欠结款" || rows[i].jfAccountingSpecies=="还租客预存款"){
			readlySum = accSub(0,rows[i].jfSumMoney);
		}else if(rows[i].jfAccountingSpecies=="租客预存款" || rows[i].jfAccountingSpecies=="租客还欠结款"){
			readlySum = rows[i].jfSumMoney;
		}
	}
	giveMoney =  $('#setRenterEveryFinancialMoneyGet').val();
	readlySum = accAdd(rentSum,readlySum);
	rentNote+="应交金额："+ rentSum +" 元;实际金额："+readlySum+" 元。";
	
	//生成票据编号
	showLoading();
	$.post("../getBillNoWhenPrint.action",{
	},function(printData){
		if (printData.code < 0) {
			$.messager.alert('通知', '票据编号生成失败！原因：' + printData.msg, 'error');
			hideLoading();
			return;
		}
		printData = printData.body;
		$('#billNoGet').val(printData);
		//生成票据打印需要的数据
		var printRow = $('#setRenterEveryFinancialTable').datagrid('getRows');
		var noteArray= {water:"",electrit:"",gas:"",tv:"",wifi:"",manager:"",server:"",rent:"",owe:"",other:""};
		for(var i in printRow ){
			if(printRow[i].note!='' && printRow[i].note!=null && printRow[i].note!='undefined'){
				if(printRow[i].jfAccountingSpecies=="水费"){
					noteArray.water = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="电费"){
					noteArray.electrit = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="燃气费"){
					noteArray.gas = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="热水费"){
					noteArray.hotwater = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="暖气费"){
					noteArray.hotair = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="电视"){
					noteArray.tv = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="网络费"){
					noteArray.wifi = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="物业管理费"){
					noteArray.manager = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="租赁管理服务费"){
					noteArray.server = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="租金"){
					noteArray.rent = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="逾期-违约金"){
					noteArray.owe = printRow[i].note;
				}
				if(printRow[i].jfAccountingSpecies=="代缴费用"){
					noteArray.other = printRow[i].note;
				}
			}
		}
		
		var year = 'year:"' 	+ formatTime(getNowFormatDate(), 2).split("-")[0] + '",';
		var month = 'month:"' 	+ formatTime(getNowFormatDate(), 2).split("-")[1] + '",';
		var day = 'date:"' 		+ formatTime(getNowFormatDate(), 2).split("-")[2] + '",';
		var wuyedizhi = 'wuyedizhi:"' + $("#setRenterEveryFinancialBelongAddress").val() + '",';
		var name = 'name:"' + $("#setRenterEveryFinancialBelongName").val() + '",';
		var feiyongzhouqi = 'feiyongzhouqi:"' + $('#setRenterEveryFinanciaBegin').val() + '~' + $('#setRenterEveryFinanciaEnd').val() + '",';
		var gongsimingcheng = 'gongsimingcheng:"' 	+ _loginCompanyName + '",';
		var jizhangren = 'jizhangren:"' 	+ _loginUserName + '",';
		var shoukuanren = 'shoukuanren:"' 	+ _loginUserName + '",';
		var piaojubianhao = 'piaojubianhao:"' + printData + '",';
		var shoukuanfangshi = 'shoukuanfangshi:"'+ $("#everyFinancialPayType").find('option:selected').text() + '",';
		
		var shoufeixiangmu_w = '水费';
		var benqidushu_w = $("#srefWaterThis").val();
		var shangqidushu_w = $("#srefWaterLast").val();
		var shiyongliang_w = $("#srefWaterNum").val();
		var jifeifangan_w = $("#srefWaterPlan").val();
		var jine_w = $("#srefWaterMoney").val();
		var water = '{shoufeixiangmu:"' + shoufeixiangmu_w
			+ '",benqidushu:"' + benqidushu_w
			+ '",shangqidushu:"' + shangqidushu_w
			+ '",shiyongliang:"' + shiyongliang_w
			+ '",jifeifangan:"' + jifeifangan_w
			+ '",jine:"' + jine_w
			+ '",beizhu:"' + noteArray.water
			+ '"},';
		
		var shoufeixiangmu_e = '电费';
		var benqidushu_e = $("#srefElectritThis").val();
		var shangqidushu_e = $("#srefElectritLast").val();
		var shiyongliang_e = $("#srefElectritNum").val();
		var jifeifangan_e = $("#srefElectritPlan").val();
		var jine_e = $("#srefElectritMoney").val();
		var electrit = '{shoufeixiangmu:"' + shoufeixiangmu_e
			+ '",benqidushu:"' + benqidushu_e
			+ '",shangqidushu:"' + shangqidushu_e
			+ '",shiyongliang:"' + shiyongliang_e
			+ '",jifeifangan:"' + jifeifangan_e
			+ '",jine:"' + jine_e
			+ '",beizhu:"' + noteArray.electrit
			+ '"},';
			
		var shoufeixiangmu_g = '气费';
		var benqidushu_g = $("#srefGasThis").val();
		var shangqidushu_g = $("#srefGasLast").val();
		var shiyongliang_g = $("#srefGasNum").val();
		var jifeifangan_g = $("#srefGasPlan").val();
		var jine_g = $("#srefGasMoney").val();
		var gas = '{shoufeixiangmu:"' + shoufeixiangmu_g
			+ '",benqidushu:"' + benqidushu_g
			+ '",shangqidushu:"' + shangqidushu_g
			+ '",shiyongliang:"' + shiyongliang_g
			+ '",jifeifangan:"' + jifeifangan_g
			+ '",jine:"' + jine_g
			+ '",beizhu:"' + noteArray.gas
			+ '"},';
		
		var shoufeixiangmu_hw = '热水费';
		var benqidushu_hw = $("#srefHotWaterThis").val();
		var shangqidushu_hw = $("#srefHotWaterLast").val();
		var shiyongliang_hw = $("#srefHotWaterNum").val();
		var jifeifangan_hw = $("#srefHotWaterPlan").val();
		var jine_hw = $("#srefHotWaterMoney").val();
		var hotwater = '{shoufeixiangmu:"' + shoufeixiangmu_hw
			+ '",benqidushu:"' + benqidushu_hw
			+ '",shangqidushu:"' + shangqidushu_hw
			+ '",shiyongliang:"' + shiyongliang_hw
			+ '",jifeifangan:"' + jifeifangan_hw
			+ '",jine:"' + jine_hw
			+ '",beizhu:"' + noteArray.hotwater
			+ '"},';
		
		var shoufeixiangmu_ha = '暖气费';
		var benqidushu_ha = $("#srefHotAirThis").val();
		var shangqidushu_ha = $("#srefHotAirLast").val();
		var shiyongliang_ha = $("#srefHotAirNum").val();
		var jifeifangan_ha = $("#srefHotAirPlan").val();
		var jine_ha = $("#srefHotAirMoney").val();
		var hotair = '{shoufeixiangmu:"' + shoufeixiangmu_ha
			+ '",benqidushu:"' + benqidushu_ha
			+ '",shangqidushu:"' + shangqidushu_ha
			+ '",shiyongliang:"' + shiyongliang_ha
			+ '",jifeifangan:"' + jifeifangan_ha
			+ '",jine:"' + jine_ha
			+ '",beizhu:"' + noteArray.hotair
			+ '"},';
			
		
		var energy_arr = '';
		if(jine_w != 0){
			energy_arr += water;
		}
		if(jine_e != 0){
			energy_arr += electrit;
		}
		if(jine_g != 0){
			energy_arr += gas;
		}
		if(jine_hw != 0){
			energy_arr += hotwater;
		}
		if(jine_ha != 0){
			energy_arr += hotair;
		}
		if(energy_arr != ''){
			energy_arr = 'energy_arr:[' + energy_arr + '],';
		}
	
		var tv = $("#srefTvMoney").val();
		var wifi = $("#srefWifiMoney").val();
		var manage = $("#srefManageMoney").val();
		var server = $("#srefServerMoney").val();
		var rent = $('#srefRentMoney').val();
		var zhinajin = $('#srefDamages').val();
		var lishiqianjie = $('#srefPastOwe').val();
		var qita = $('#srefOtherMoney').val();
		var journal_arr = '';
		if(tv != 0){
			journal_arr += '{feiyong:"电视费",jine:"' + tv + '",beizhu:"' + noteArray.tv + '"},';
		}
		if(wifi != 0){
			journal_arr += '{feiyong:"网络费",jine:"' + wifi + '",beizhu:"' + noteArray.wifi + '"},';
		}
		if(manage != 0){
			journal_arr += '{feiyong:"物业管理费",jine:"' + manage + '",beizhu:"' + noteArray.manager + '"},';
		}
		if(server != 0){
			journal_arr += '{feiyong:"租赁服务费",jine:"' + server + '",beizhu:"' + noteArray.server + '"},';
		}
		if(rent != 0){
			journal_arr += '{feiyong:"租金",jine:"' + rent + '",beizhu:"' + noteArray.rent + '"},';
		}
		if(zhinajin != 0){
			journal_arr += '{feiyong:"滞纳金",jine:"' + zhinajin + '",beizhu:"' + noteArray.owe + '"},';
		}
		if(qita != 0){
			journal_arr += '{feiyong:"其他费用",jine:"' + qita + '",beizhu:"' + noteArray.other + '"},';
		}
		if($('#srefHisOwe').val()!=0){
			journal_arr += '{feiyong:"往期欠结金额",jine:"' + lishiqianjie + '",beizhu:"往期欠结金额：'+lishiqianjie+'元"},';
		}
		if($('#srefHisSave').val()!=0){
			journal_arr += '{feiyong:"往期结余金额",jine:"' + accSub(0,lishiqianjie) + '",beizhu:"往期结余金额：'+accSub(0,lishiqianjie)+'元"},';
		}
		if(journal_arr != ''){
			journal_arr = 'journal_arr:[' + journal_arr + '],';
		}
		var hejijine = 'hejijine:"' + $('#srefShouldPay').val() + '",';
		
		var shishoujine = 'shishoujine:"' + $('#srefRealPay').val() + '",';
		
		var benqiqianjie = 'benqiqianjie:"' + accSub($('#srefShouldPay').val(),$('#srefRealPay').val()) + '",';//最新欠结或余额
		
		benqiqianjie = (benqiqianjie ==0 || benqiqianjie =="" || benqiqianjie ==null) ? 0.00  : benqiqianjie;
		
		var shangqiqianjie = 'shangqiqianjie:"' + $("#srefPastOwe").val() + '",';
		
		var beizhu = '';
		if($('#shoujubeizhu').val() != ''){
			beizhu = 'beizhu:"' + $('#shoujubeizhu').val() + '",';
		}
		
		var printArray = '{' + year + month + day + gongsimingcheng + piaojubianhao + jizhangren + shoukuanren
				+ shoukuanfangshi + wuyedizhi + name + feiyongzhouqi + energy_arr + journal_arr + 
				hejijine + shishoujine + benqiqianjie + shangqiqianjie  + beizhu + '}';
		var jhpHouseId = $("#setRenterEveryFinancialHouseId").val();
		var jhpHouse4storeId = $("#setRenterEveryFinancialHouseStoreId").val();
		var jhpHouse4rentId = $("#setRenterEveryFinancialHouseRentId").val();
		var jhpRenterId = $("#setRenterEveryFinancialRenterId").val();
		var jhpLandlordId = $("#setRenterEveryFinancialLandlordId").val();
		//生成打印票据保存到历史票据表
		$.post("../insertHistoryPrint.action",{
			jhpJson 			: printArray,
			jhpType 			: "租客每期收支",
			jhpTitle			: getNowFormatDate()+" 生成租客每期收支打印收据",
			jhpHouse4rentId		: jhpHouse4rentId,
			jhpHouse4storeId	: jhpHouse4storeId,
			jhpHouseId			: jhpHouseId,
			jhpLandlordId		: jhpLandlordId,
			jhpRenterId			: jhpRenterId,
			jhpUserId			: _loginUserId,
			jciId               : jciId,//更新打印票据的 id
			jciOverdueDays		: jciOverdueDays,//更新超期天数
		}, function(data) {
			if (data != 1) {
				$.messager.alert('通知', wuyedizhi + ' 生成打印票据出错,注意检查账单状态', 'error');
			}
		});
		for(var i in rows){
			if(rows[i].note && rows[i].note!==null && rows[i].note!=='' && rows[i].note!==undefined){
				rows[i].jfFinanNote = rows[i].jfFinanNote + "-票据备注:"+ rows[i].note;
			}
			rows[i].jfTicketNumber = printData;
		}
		var jsonStrArry = '';
		for (var i in rows) {
			if (i == 0) {
				jsonStrArry += JSON.stringify(rows[i]).split('}')[0] + ',' + strArray + '}';
			} else {
				jsonStrArry += ',' + JSON.stringify(rows[i]).split('}')[0] + ',' + strArray + '}';
			}
		}
		jsonStrArry = "[" + jsonStrArry + "]";
		if(ifPower==0){//如果不包含水电气收支
			//租客每期租金收支生成
			$.post("../rentEachPayment.action",{
				jsonArray 				: jsonStrArry,
				jciId 					: jciId,
			},function(data) {
				if(data.code<0){
					$.messager.alert('通知', '生成收支失败！原因：' + data.msg, 'error');
					hideLoading();
					return;
				}
				//短信
				if($("#setRenterEveryFinancialIfMsg").prop('checked')){
					var giveRenterJson= {
							smPopId 	: $("#setRenterEveryFinancialPopId").val(),
							smrentId	: $("#setRenterEveryFinancialRenterId").val(),
							smRentId	: addFinancialHouseRentId,
							smNotRentId	: addFinancialHouseStoreId,
							smMoney		: giveMoney,
							messageType	: 14,
							smUserId    : _loginUserId,
					};
					$.post("../massage/sendOutsideMessage.action",giveRenterJson ,function(data) {

					});
				}
				//已租房跟进
				$.post("../insertHousingFollow.action", {
					jhfDepartment		: _loginDepartment,
					jhfStorefront		: _loginStore,
					jhfHouse4rentId 	: addFinancialHouseRentId,
					jhfHouse4storeId 	: addFinancialHouseStoreId,
					jhfHouseId			: addFinancialHouseId,
					jhfFollowRemark 	: rentNote,
					jhfFollowResult 	: '跟进成功',
					jhfPaymentWay 		: '系统跟进',
					jhfUserId 			: _loginUserId
				});
				myTips('添加成功！', 'success');
				hideLoading();
				printShouju();
			});
		}else{//包含水电气的收支
			//新增财务收支与历史能源账单、更新未租房能源字段
			$.post("../newInsertFinancialEnergyBill.action",{
				jsonArray 				: jsonStrArry,
				jciId 					: jciId,
				jmarRentId				: addFinancialHouseRentId,
				houseStoreId			: addFinancialHouseStoreId,
				jmarWaterDiff 			: jmarWaterDiff,
				jmarWaterMoney  		: jmarWaterMoney,
				jmarElectricDiff 		: jmarElectricDiff,
				jmarElectricMoney 		: jmarElectricMoney,
				jmarGasDiff				: jmarGasDiff,
				jmarGasMoney 			: jmarGasMoney,
				
				//tzl
				jmarHotWaterDiff        : jmarHotWaterDiff,
				jmarHotWaterMoney	    : jmarHotWaterMoney,
				jmarHotAirDiff	        : jmarHotAirDiff,
				jmarHotAirMoney         : jmarHotAirMoney,
				
				jmarManageCharge 		: jmarManageCharge,
				jmarServerCharge 		: jmarServerCharge,
				jmarWifiCharge			: jmarWifiCharge,
				jmarTvCharge			: jmarTvCharge,
				jmarLiquidatedDamages 	: jmarLiquidatedDamages,
				jmarThisArrears 		: jmarThisArrears,
				jmarCumulativeArrears	: jmarCumulativeArrears,
			 	jmarBeginTime			: jfStartCycle1,
			 	jmarEndTime				: jfEndCycle1,
			},function(data) {
				hideLoading();
				if(data.code<0){
					$.messager.alert('通知', '生成收支失败！原因：' + data.msg, 'error');
					return;
				}else{
					$.post("../querySendMessageAndUpdate.action",{
						jciId			: row.jciId,
						jciMessageNote	: jciMessageNote,
						jciOverdueDays  : $('#srefNotDays').val()
					} ,function(isData) {
						if(isData.code < 0){
							myTips(isData.msg,"error");
						}
					});
					//短信
					if($("#setRenterEveryFinancialIfMsg").prop('checked')){
						var giveRenterJson= {
								smPopId 	: $("#setRenterEveryFinancialPopId").val(),
								smrentId	: $("#setRenterEveryFinancialRenterId").val(),
								smRentId	: addFinancialHouseRentId,
								smNotRentId	: addFinancialHouseStoreId,
								smMoney		: giveMoney,
								messageType	: 14,
								smUserId    : _loginUserId,
						};
						$.post("../massage/sendOutsideMessage.action",giveRenterJson ,function(data) {
							
						});
					}
					//已租房跟进
					$.post("../insertHousingFollow.action", {
						jhfDepartment		: _loginDepartment,
						jhfStorefront		: _loginStore,
						jhfHouse4rentId 	: addFinancialHouseRentId,
						jhfHouse4storeId 	: addFinancialHouseStoreId,
						jhfHouseId			: addFinancialHouseId,
						jhfFollowRemark 	: rentNote,
						jhfFollowResult 	: '跟进成功',
						jhfPaymentWay 		: '系统跟进',
						jhfUserId 			: _loginUserId
					});
					myTips('添加成功！', 'success');
					printShouju();
				}
			});
		}
	});
	var page=$(".current").html();
	queryMonthlyBills(page,0,1);
}
//到期时间根据开始时间及合同期限改变而改变
function changeDate(type) {
	if(type==0){
		if ($("#add_financial_belongBegin").val() != '') {
			var beginDate = new Date($("#add_financial_belongBegin").val());
			beginDate.setMonth(beginDate.getMonth() + 1);
			beginDate.setDate(beginDate.getDate() - 1);
			$("#add_financial_belongEnd").val(formatDate(beginDate));
		}
	}else if(type==1){
		if ($("#setRenterEveryFinanciaBegin").val() != '') {
			var beginDate = new Date($("#setRenterEveryFinanciaBegin").val());
			beginDate.setMonth(beginDate.getMonth() + 1);
			beginDate.setDate(beginDate.getDate() - 1);
			$("#setRenterEveryFinanciaEnd").val(formatDate(beginDate));
		}
	}
}

function printShouju(){
	$("#printShoujuDlg").dialog({
		title : '打印收据',
		top : getTop(180),
		left : getLeft(400),
		width : 400,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			var nullData = [];
			$("#setRenterEveryFinancialTable").datagrid("loadData", nullData);
			$("#setRenterEveryFinancialDlg input").val('');
			$("#setRenterEveryFinancialBelongType").val('');
			$("#setRenterEveryFinancialAccountName").empty();
			$("#setRenterEveryFinancialWay").val('');
			$('#setRenterEveryFinancialMoneyTotal').val('0.00');
			$('#setRenterEveryFinancialMoneyGet').val('0.00');
			$('#setRenterEveryFinancialMoneySum').val('0.00');
			$('#setRenterEveryFinancialIfMsg').prop("checked", false);
			$('#setRenterEveryFinancialDoTime').val(formatTime(getNowFormatDate(), 2));
			$('#setRenterEveryFinancialDlg').dialog('close');
			$('#choseConstractInstallmentDlg').dialog('close');
		}
	});
	$("#printShoujuDlg").dialog('open');
}

function doPrintShouju(){
	var row = $('#setRenterEveryFinancialTable').datagrid('getRows');
	var noteArray= {water:"",electrit:"",gas:"",hotwater:"",hotair:"",tv:"",wifi:"",manager:"",server:"",rent:"",owe:"",other:""};
	for(var i in row ){
		if(row[i].note!='' && row[i].note!=null && row[i].note!='undefined'){
			if(row[i].jfAccountingSpecies=="水费"){
				noteArray.water = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="电费"){
				noteArray.electrit = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="燃气费"){
				noteArray.gas = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="热水费"){
				noteArray.hotwater = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="暖气费"){
				noteArray.hotair = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="电视"){
				noteArray.tv = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="网络费"){
				noteArray.wifi = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="物业管理费"){
				noteArray.manager = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="租赁管理服务费"){
				noteArray.server = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="租金"){
				noteArray.rent = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="逾期-违约金"){
				noteArray.owe = row[i].note;
			}
			if(row[i].jfAccountingSpecies=="代缴费用"){
				noteArray.other = row[i].note;
			}
		}
	}
	
	var year = 'year:"' 	+ formatTime(getNowFormatDate(), 2).split("-")[0] + '",';
	var month = 'month:"' 	+ formatTime(getNowFormatDate(), 2).split("-")[1] + '",';
	var day = 'date:"' 		+ formatTime(getNowFormatDate(), 2).split("-")[2] + '",';
	var wuyedizhi = 'wuyedizhi:"' + $("#setRenterEveryFinancialBelongAddress").val() + '",';
	var name = 'name:"' + $("#setRenterEveryFinancialBelongName").val() + '",';
	var feiyongzhouqi = 'feiyongzhouqi:"' + $('#setRenterEveryFinanciaBegin').val() + '~' + $('#setRenterEveryFinanciaEnd').val() + '",';
	var gongsimingcheng = 'gongsimingcheng:"' 	+ _loginCompanyName + '",';
	var jizhangren = 'jizhangren:"' 	+ _loginUserName + '",';
	var shoukuanren = 'shoukuanren:"' 	+ _loginUserName + '",';
	var piaojubianhao = 'piaojubianhao:"' + $('#billNoGet').val() + '",';
	var shoukuanfangshi = 'shoukuanfangshi:"'+ $("#everyFinancialPayType").find('option:selected').text() + '",';
	
	var shoufeixiangmu_w = '水费';
	var benqidushu_w = $("#srefWaterThis").val();
	var shangqidushu_w = $("#srefWaterLast").val();
	var shiyongliang_w = $("#srefWaterNum").val();
	var jifeifangan_w = $("#srefWaterPlan").val();
	var jine_w = $("#srefWaterMoney").val();
	var water = '{shoufeixiangmu:"' + shoufeixiangmu_w
		+ '",benqidushu:"' + benqidushu_w
		+ '",shangqidushu:"' + shangqidushu_w
		+ '",shiyongliang:"' + shiyongliang_w
		+ '",jifeifangan:"' + jifeifangan_w
		+ '",jine:"' + jine_w
		+ '",beizhu:"' + noteArray.water
		+ '"},';
	
	var shoufeixiangmu_e = '电费';
	var benqidushu_e = $("#srefElectritThis").val();
	var shangqidushu_e = $("#srefElectritLast").val();
	var shiyongliang_e = $("#srefElectritNum").val();
	var jifeifangan_e = $("#srefElectritPlan").val();
	var jine_e = $("#srefElectritMoney").val();
	var electrit = '{shoufeixiangmu:"' + shoufeixiangmu_e
		+ '",benqidushu:"' + benqidushu_e
		+ '",shangqidushu:"' + shangqidushu_e
		+ '",shiyongliang:"' + shiyongliang_e
		+ '",jifeifangan:"' + jifeifangan_e
		+ '",jine:"' + jine_e
		+ '",beizhu:"' + noteArray.electrit
		+ '"},';
		
	var shoufeixiangmu_g = '气费';
	var benqidushu_g = $("#srefGasThis").val();
	var shangqidushu_g = $("#srefGasLast").val();
	var shiyongliang_g = $("#srefGasNum").val();
	var jifeifangan_g = $("#srefGasPlan").val();
	var jine_g = $("#srefGasMoney").val();
	var gas = '{shoufeixiangmu:"' + shoufeixiangmu_g
		+ '",benqidushu:"' + benqidushu_g
		+ '",shangqidushu:"' + shangqidushu_g
		+ '",shiyongliang:"' + shiyongliang_g
		+ '",jifeifangan:"' + jifeifangan_g
		+ '",jine:"' + jine_g
		+ '",beizhu:"' + noteArray.gas
		+ '"},';
	
	var shoufeixiangmu_hw = '热水费';
	var benqidushu_hw = $("#srefGasThis").val();
	var shangqidushu_hw = $("#srefGasLast").val();
	var shiyongliang_hw = $("#srefGasNum").val();
	var jifeifangan_hw = $("#srefGasPlan").val();
	var jine_hw = $("#srefGasMoney").val();
	var hotwater = '{shoufeixiangmu:"' + shoufeixiangmu_hw
		+ '",benqidushu:"' + benqidushu_hw
		+ '",shangqidushu:"' + shangqidushu_hw
		+ '",shiyongliang:"' + shiyongliang_hw
		+ '",jifeifangan:"' + jifeifangan_hw
		+ '",jine:"' + jine_hw
		+ '",beizhu:"' + noteArray.hotwater
		+ '"},';
	
	var shoufeixiangmu_ha = '暖气费';
	var benqidushu_ha = $("#srefGasThis").val();
	var shangqidushu_ha = $("#srefGasLast").val();
	var shiyongliang_ha = $("#srefGasNum").val();
	var jifeifangan_ha = $("#srefGasPlan").val();
	var jine_ha = $("#srefGasMoney").val();
	var hotair = '{shoufeixiangmu:"' + shoufeixiangmu_ha
		+ '",benqidushu:"' + benqidushu_ha
		+ '",shangqidushu:"' + shangqidushu_ha
		+ '",shiyongliang:"' + shiyongliang_ha
		+ '",jifeifangan:"' + jifeifangan_ha
		+ '",jine:"' + jine_ha
		+ '",beizhu:"' + noteArray.hotair
		+ '"},';
		
	var energy_arr = '';
	if(jine_w != 0){
		energy_arr += water;
	}
	if(jine_e != 0){
		energy_arr += electrit;
	}
	if(jine_g != 0){
		energy_arr += gas;
	}
	
	if(jine_hw != 0){
		energy_arr += hotwater;
	}
	if(jine_ha != 0){
		energy_arr += hotair;
	}
	
	if(energy_arr != ''){
		energy_arr = 'energy_arr:[' + energy_arr + '],';
	}

	var tv = $("#srefTvMoney").val();
	var wifi = $("#srefWifiMoney").val();
	var manage = $("#srefManageMoney").val();
	var server = $("#srefServerMoney").val();
	var rent = $('#srefRentMoney').val();
	var zhinajin = $('#srefDamages').val();
	var lishiqianjie = $('#srefPastOwe').val();
	var qita = $('#srefOtherMoney').val();
	var journal_arr = '';
	if(tv != 0){
		journal_arr += '{feiyong:"电视费",jine:"' + tv + '",beizhu:"' + noteArray.tv + '"},';
	}
	if(wifi != 0){
		journal_arr += '{feiyong:"网络费",jine:"' + wifi + '",beizhu:"' + noteArray.wifi + '"},';
	}
	if(manage != 0){
		journal_arr += '{feiyong:"物业管理费",jine:"' + manage + '",beizhu:"' + noteArray.manager + '"},';
	}
	if(server != 0){
		journal_arr += '{feiyong:"租赁服务费",jine:"' + server + '",beizhu:"' + noteArray.server + '"},';
	}
	if(rent != 0){
		journal_arr += '{feiyong:"租金",jine:"' + rent + '",beizhu:"' + noteArray.rent + '"},';
	}
	if(zhinajin != 0){
		journal_arr += '{feiyong:"滞纳金",jine:"' + zhinajin + '",beizhu:"' + noteArray.owe + '"},';
	}
	if(qita != 0){
		journal_arr += '{feiyong:"其他费用",jine:"' + qita + '",beizhu:"' + noteArray.other + '"},';
	}
	if($('#srefHisOwe').val()!=0){
		journal_arr += '{feiyong:"往期欠结金额",jine:"' + lishiqianjie + '",beizhu:"往期欠结金额：'+lishiqianjie+'元"},';
	}
	if($('#srefHisSave').val()!=0){
		journal_arr += '{feiyong:"往期结余金额",jine:"' + accSub(0,lishiqianjie) + '",beizhu:"往期结余金额：'+accSub(0,lishiqianjie)+'元"},';
	}
//	for(var i in row){
//		if(row[i].jfBigType=="欠结类"){
//			journal_arr += '{feiyong:"'+row[i].jfAccountingSpecies+'",jine:"' + row[i].jfSumMoney + '",beizhu:"'+row[i].jfAccountingSpecies+'：'+row[i].jfSumMoney+'元"},';
//		}
//	}
	if(journal_arr != ''){
		journal_arr = 'journal_arr:[' + journal_arr + '],';
	}
	var hejijine = 'hejijine:"' + $('#srefShouldPay').val() + '",';
	
	var shishoujine = 'shishoujine:"' + $('#srefRealPay').val() + '",';
	
	var benqiqianjie = 'benqiqianjie:"' + accSub($('#srefShouldPay').val(),$('#srefRealPay').val()) + '",';//最新欠结或余额
	
	benqiqianjie = (benqiqianjie ==0 || benqiqianjie =="" || benqiqianjie ==null) ? 0.00  : benqiqianjie;
	
	var shangqiqianjie = 'shangqiqianjie:"' + $("#srefPastOwe").val() + '",';
	
	var beizhu = '';
	if($('#shoujubeizhu').val() != ''){
		beizhu = 'beizhu:"' + $('#shoujubeizhu').val() + '",';
	}
	
	var printArray = '{' + year + month + day + gongsimingcheng + piaojubianhao + jizhangren + shoukuanren
			+ shoukuanfangshi + wuyedizhi + name + feiyongzhouqi + energy_arr + journal_arr + 
			hejijine + shishoujine + benqiqianjie + shangqiqianjie  + beizhu + '}';
	parent.doPrintInExe(printArray,2);
//	$("#printShoujuDlg").dialog('close');
}
//租客分期账单状态列格式
function formatRenterState(value, row, index) {
	if (row.jciState == '待收') {
		return "<a style='text-decoration:none;color:blue;'>" + row.jciState + "<a>";
	} else if (row.jciState == '已收'){
		return "<a style='text-decoration:none;color:green;'>" + row.jciState + "<a>";
	} else {
		return row.jciState;
	}
}
//租客分期账单付款凭证列格式
function formatPaymentVoucher(value, row, index) {
	if (row.jciPaymentVoucher != null && row.jciPaymentVoucher != '') {
		return '<a href="javascript:;" style="text-decoration:none;color:green;" onclick="showPaymentVoucher('+index+')">有<a>';
	} else {
		return '<a style="text-decoration:none;color:blue;">无<a>';
	}
}
//查看付款凭证
function showPaymentVoucher(index){
	var rows = $("#renterInstallmentDg").datagrid("getRows");
	var paymentVoucher = rows[index].jciPaymentVoucher;
	paymentVoucher = JSON.parse('[' + paymentVoucher.getRealJsonStr() +']');
	$("#paymentVoucherDlg").dialog({
		title : '查看付款凭证',
		top : getTop(270),
		left : getLeft(550),
		width : 550,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
	
		}
	});
	$("#paymentVoucherDlg").dialog('open');
	$("#imgWrapper").empty();
	$('#describe').empty();
	var path = '';
	for(var i in paymentVoucher){
		if(paymentVoucher[i] != null){
			if(paymentVoucher[i].type=='img'){
				path += paymentVoucher[i].data + ',';
			}else if(paymentVoucher[i].type=='txt'){
				$('#describe').append('<p>' + paymentVoucher[i].data + '</p>');
			}else if(paymentVoucher[i].path!=undefined){
				path += paymentVoucher[i].path + ',';
			}
		}
	}
	if(path == ""){
		$("#imgWrapper").append("<p>没有查询到付款凭证</p>");
		return;
	}
	path = path.substring(0, path.length-1);
	var img = path.split(',');
	$.post("../upload/getDownloadUrl.action",{
		baseUrls : path
	},function(data){
		var newUrls = data.split(",");
		$('#imgWrapper').append('<ul class="imageList"></ul>');
		for(var i in img){
			var j = parseInt(i) + parseInt(img.length);
			$('#imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img class="installmentImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
					'</li>');
		}
		$(".installmentImg").colorbox({
			rel:'installmentImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//查看付款凭证
function showPaymentVoucher2(){
	var row = $("#monthlyBillsDg").datagrid("getSelected");
	var paymentVoucher = row.jciPaymentVoucher;
	paymentVoucher = JSON.parse('[' + paymentVoucher.getRealJsonStr() +']');
	$("#paymentVoucherDlg").dialog({
		title : '查看付款凭证',
		top : getTop(270),
		left : getLeft(550),
		width : 550,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
	
		}
	});
	$("#paymentVoucherDlg").dialog('open');
	$("#imgWrapper").empty();
	$('#describe').empty();
	var path = '';
	for(var i in paymentVoucher){
		if(paymentVoucher[i] != null){
			if(paymentVoucher[i].type=='img'){
				path += paymentVoucher[i].data + ',';
			}else if(paymentVoucher[i].type=='txt'){
				$('#describe').append('<p>' + paymentVoucher[i].data + '</p>');
			}else if(paymentVoucher[i].path!=undefined){
				path += paymentVoucher[i].path + ',';
			}
		}
	}
	if(path == ""){
		$("#imgWrapper").append("<p>没有查询到付款凭证</p>");
		return;
	}
	path = path.substring(0, path.length-1);
	var img = path.split(',');
	$.post("../upload/getDownloadUrl.action",{
		baseUrls : path
	},function(data){
		var newUrls = data.split(",");
		$('#imgWrapper').append('<ul class="imageList"></ul>');
		for(var i in img){
			var j = parseInt(i) + parseInt(img.length);
			$('#imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img class="installmentImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
					'</li>');
		}
		$(".installmentImg").colorbox({
			rel:'installmentImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//租客分期账单付款凭证列格式
function formatPaymentVoucher3(value, row, index) {
	if (row.jciPaymentVoucher != null && row.jciPaymentVoucher != '') {
		return '<a href="javascript:;" style="text-decoration:none;color:green;" onclick="showPaymentVoucher3('+index+')">有<a>';
	} else {
		return '<a style="text-decoration:none;color:blue;">无<a>';
	}
}
//查看付款凭证
function showPaymentVoucher3(index){
	var rows = $("#monthlyBillsDg").datagrid("getRows");
	var paymentVoucher = rows[index].jciPaymentVoucher;
	paymentVoucher = JSON.parse('[' + paymentVoucher.getRealJsonStr() +']');
	$("#paymentVoucherDlg").dialog({
		title : '查看付款凭证',
		top : getTop(270),
		left : getLeft(550),
		width : 550,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
	
		}
	});
	$("#paymentVoucherDlg").dialog('open');
	$("#imgWrapper").empty();
	$('#describe').empty();
	var path = '';
	for(var i in paymentVoucher){
		if(paymentVoucher[i] != null){
			if(paymentVoucher[i].type=='img'){
				path += paymentVoucher[i].data + ',';
			}else if(paymentVoucher[i].type=='txt'){
				$('#describe').append('<p>' + paymentVoucher[i].data + '</p>');
			}else if(paymentVoucher[i].path!=undefined){
				path += paymentVoucher[i].path + ',';
			}
		}
	}
	if(path == ""){
		$("#imgWrapper").append("<p>没有查询到付款凭证</p>");
		return;
	}
	path = path.substring(0, path.length-1);
	var img = path.split(',');
	$.post("../upload/getDownloadUrl.action",{
		baseUrls : path
	},function(data){
		var newUrls = data.split(",");
		$('#imgWrapper').append('<ul class="imageList"></ul>');
		for(var i in img){
			var j = parseInt(i) + parseInt(img.length);
			$('#imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img class="installmentImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
					'</li>');
		}
		$(".installmentImg").colorbox({
			rel:'installmentImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
/*
	不选择账单
	查最新的水电读数，填入《抄表情况》、《能源收费明细（系统计算）》、《能源收费明细（短信通知）》（都填“无”）、《能源收费明细》（都填系统计算的值）
	历史欠结、历史余额、实收金额
	计算总金额
*/
function queryNewMeterReading(){
	var index = $('#monthlyBillsDgIndex').val();
	var row = $('#monthlyBillsDg').datagrid('getRows')[index];
	$("#renterInstallmentId").val('');
	$('#srefShouldDay').val('');//交租日
	
	$('#srefNotDays').val(0);//滞纳天数
	$('#srefDamages').val(0);//滞纳金
	$('#srefRentMoney').val(0);//房屋租金
	
	$("#everyHisSave").show();//历史余额
	$("#srefHisSave").val(0.00);//历史余额
	$("#everyHisOwe").hide();//历史欠结
	$("#srefHisOwe").val(0.00);//历史欠结
	
	$("#everyNewSave").show();//最新余额
	$("#srefNewSave").val(0.00);//最新余额
	$("#everyNewOwe").hide();//最新欠结
	$("#srefNewOwe").val(0.00);//最新欠结
	$.post("../selectMeterReadingScheme.action", {
		hrId : row.hrId,
		hrHouse4storeId : row.hrHouse4storeId,
	},function(data){
		data=data.body;
		//查最新的水电读数，填入《抄表情况》、《能源收费明细（系统计算）》、《能源收费明细（短信通知）》（都填“无”）、《能源收费明细》（都填系统计算的值）
		if( data[0].hsMeterReadingRecord!=null && data[0].hsMeterReadingRecord!='' ){
			var meterReadingRecord = eval('(' + data[0].hsMeterReadingRecord.getRealJsonStr() + ')');//读数记录
			var waterLast = meterReadingRecord.water.lastReading;//上次水读数
			var waterThis = waterLast;//本次水读数
			if(meterReadingRecord.water.thisReading.length!=0){
				waterThis = meterReadingRecord.water.thisReading[meterReadingRecord.water.thisReading.length-1];
			}
			
			var electritLast = meterReadingRecord.electrit.lastReading;//上次电读数
			var electritThis = electritLast;//本次电读数
			if(meterReadingRecord.electrit.thisReading.length!=0){
				electritThis = meterReadingRecord.electrit.thisReading[meterReadingRecord.electrit.thisReading.length-1];
			}
			
			var gasLast = meterReadingRecord.gas.lastReading;//上次气读数
			var gasThis = gasLast;//本次气读数
			if(meterReadingRecord.gas.thisReading.length!=0){
				gasThis = meterReadingRecord.gas.thisReading[meterReadingRecord.gas.thisReading.length-1];
			}

			var hotWaterLast = 0;//上次热水读数
			var hotWaterThis = 0;//本次热水读数
			if(meterReadingRecord.hotwater != undefined) {
				hotWaterLast = meterReadingRecord.hotwater.lastReading;//上次热水读数
				hotWaterThis = hotWaterLast;//本次热水读数
				if (meterReadingRecord.hotwater.thisReading.length != 0) {
					hotWaterThis = meterReadingRecord.hotwater.thisReading[meterReadingRecord.hotwater.thisReading.length - 1];
				}
			}

			var hotAirLast = 0;//上次暖气读数
			var hotAirThis = 0;//本次暖气读数
			if(meterReadingRecord.hotair != undefined) {
				hotAirLast = meterReadingRecord.hotair.lastReading;//上次热水读数
				hotAirThis = hotAirLast;//本次热水读数
				if (meterReadingRecord.hotair.thisReading.length != 0) {
					hotAirThis = meterReadingRecord.hotair.thisReading[meterReadingRecord.hotair.thisReading.length - 1];
				}
			}
			
			var waterNum = accSub(waterThis,waterLast);//水差额
			var electritNum = accSub(electritThis,electritLast);//电差额
			var gasNum = accSub(gasThis,gasLast);//气差额
			var hotWaterNum = accSub(hotWaterThis,hotWaterLast);//热水差额
			var hotAirNum = accSub(hotAirThis,hotAirLast);//暖气差额
			
			var waterMoney = powerCalculate(data[0].waterPlan!=''?data[0].waterPlan.getRealJsonStr():'',waterNum);//水费
			var electritMoney = powerCalculate(data[0].electritPlan!=''?data[0].electritPlan.getRealJsonStr():'',electritNum);//电费
			var gasMoney = powerCalculate(data[0].gasPlan!=''?data[0].gasPlan.getRealJsonStr():'',gasNum);//气费
			var hotWaterMoney = powerCalculate(data[0].hotWaterPlan!=''?data[0].hotWaterPlan.getRealJsonStr():'', hotWaterNum);//热水费
			var hotAirMoney = powerCalculate(data[0].hotAirPlan!=''?data[0].hotAirPlan.getRealJsonStr():'', hotAirNum);//暖气费

			//抄表情况
			//水
			$("#srefWaterThis").val(waterThis);
			$("#srefWaterLast").val(waterLast);
			$("#srefWaterNum").val(waterNum);
			$("#srefWaterPlan").val(data[0].water);
			//电
			$("#srefElectritThis").val(electritThis);
			$("#srefElectritLast").val(electritLast);
			$("#srefElectritNum").val(electritNum);
			$("#srefElectritPlan").val(data[0].electrit);
			//气
			$("#srefGasThis").val(gasThis);
			$("#srefGasLast").val(gasLast);
			$("#srefGasNum").val(gasNum);
			$("#srefGasPlan").val(data[0].gas);
			
			//热水
			$("#srefHotWaterThis").val(hotWaterThis);
			$("#srefHotWaterLast").val(hotWaterLast);
			$("#srefHotWaterNum").val(hotWaterNum);
			$("#srefHotWaterPlan").val(data[0].hotWater);
			
			//暖气
			$("#srefHotAirThis").val(hotAirThis);
			$("#srefHotAirLast").val(hotAirLast);
			$("#srefHotAirNum").val(hotAirNum);
			$("#srefHotAirPlan").val(data[0].hotAir);
			
			
			//系统计算
			$("#srefWaterMoneySys").val(waterMoney);
			$("#srefElectritMoneySys").val(electritMoney);
			$("#srefGasMoneySys").val(gasMoney);
			$("#srefHotWaterMoneySys").val(hotWaterMoney);
			$("#srefHotAirMoneySys").val(hotAirMoney);
			
			$("#srefManageMoneySys").val(0.00);
			$("#srefServerMoneySys").val(0.00);
			$("#srefTvMoneySys").val(data[0].hrTvCharge);
			$("#srefWifiMoneySys").val(data[0].hrWifiCharge);
			$("#srefOtherSys").val(data[0].hrOtherPay);
			//短信通知
			$('#srefWaterMoneyMsg').val(0);
			$('#srefElectritMoneyMsg').val(0);
			$('#srefGasMoneyMsg').val(0);
			$('#srefHotWaterMoneyMsg').val(0);
			$('#srefHotAirMoneyMsg').val(0);
			$('#srefManageMoneyMsg').val(0);
			$('#srefServerMoneyMsg').val(0);
			$('#srefTvMoneyMsg').val(0);
			$('#srefWifiMoneyMsg').val(0);
			$('#srefOtherMsg').val(0);
			//能源收费明细
			$('#srefWaterMoney').val(waterMoney);
			$('#srefElectritMoney').val(electritMoney);
			$('#srefGasMoney').val(gasMoney);
			$('#srefHotWaterMoney').val(hotWaterMoney);
			$('#srefHotAirMoney').val(hotAirMoney);
			$('#srefManageMoney').val(0.00);
			$('#srefServerMoney').val(0.00);
			$('#srefTvMoney').val(data[0].hrTvCharge);
			$('#srefWifiMoney').val(data[0].hrWifiCharge);
			$('#srefOtherMoney').val(data[0].hrOtherPay);
			
			$("#srefWaterMoney").attr("mhistorys",waterLast+","+waterThis);
			$("#srefElectritMoney").attr("mhistorys",electritLast+","+electritThis);
			$("#srefGasMoney").attr("mhistorys",gasLast+","+gasThis);
			$("#srefHotWaterMoneySys").attr("mhistorys",hotWaterLast+","+hotWaterThis);
			$("#srefHotAirMoneySys").attr("mhistorys",hotAirLast+","+hotAirThis);
		} else {
			//水
			$("#srefWaterThis").val(0);
			$("#srefWaterLast").val(0);
			$("#srefWaterNum").val(0);
			$("#srefWaterPlan").val(data[0].water);
			//电
			$("#srefElectritThis").val(0);
			$("#srefElectritLast").val(0);
			$("#srefElectritNum").val(0);
			$("#srefElectritPlan").val(data[0].electrit);
			//气
			$("#srefGasThis").val(0);
			$("#srefGasLast").val(0);
			$("#srefGasNum").val(0);
			$("#srefGasPlan").val(data[0].gas);
			
			//热水
			$("#srefHotWaterThis").val(0);
			$("#srefHotWaterLast").val(0);
			$("#srefHotWaterNum").val(0);
			$("#srefHotWaterPlan").val(data[0].hotWater);
			//暖气
			$("#srefHotAirThis").val(0);
			$("#srefHotAirLast").val(0);
			$("#srefHotAirNum").val(0);
			$("#srefHotAirPlan").val(data[0].hotAir);
			
			//水电气sys
			$("#srefWaterMoneySys").val(0);
			$("#srefElectritMoneySys").val(0);
			$("#srefGasMoneySys").val(0);
			$("#srefHotWaterMoneySys").val(0);
			$("#srefHotAirMoneySys").val(0);
			$("#srefManageMoneySys").val(0);
			$("#srefServerMoneySys").val(0);
			$("#srefTvMoneySys").val(0);
			$("#srefWifiMoneySys").val(0);
			$("#srefOtherSys").val(0);
			//短信通知
			$('#srefWaterMoneyMsg').val(0);
			$('#srefElectritMoneyMsg').val(0);
			$('#srefGasMoneyMsg').val(0);
			$('#srefHotWaterMoneyMsg').val(0);
			$('#srefHotAirMoneyMsg').val(0);
			$('#srefManageMoneyMsg').val(0);
			$('#srefServerMoneyMsg').val(0);
			$('#srefTvMoneyMsg').val(0);
			$('#srefWifiMoneyMsg').val(0);
			$('#srefOtherMsg').val(0);
			//能源收费明细
			$('#srefWaterMoney').val(0);
			$('#srefElectritMoney').val(0);
			$('#srefGasMoney').val(0);
			$('#srefHotWaterMoney').val(0);
			$('#srefHotAirMoney').val(0);
			$('#srefManageMoney').val(0);
			$('#srefServerMoney').val(0);
			$('#srefTvMoney').val(0);
			$('#srefWifiMoney').val(0);
			$('#srefOtherMoney').val(0);

			$("#srefWaterMoney").attr("mhistorys",$('#srefWaterLast').val()+","+$('#srefWaterThis').val());
			$("#srefElectritMoney").attr("mhistorys",$('#srefElectritLast').val()+","+$('#srefElectritThis').val());
			$("#srefGasMoney").attr("mhistorys",$('#srefGasLast').val()+","+$('#srefGasThis').val());
			$("#srefHotWaterMoneyMsg").attr("mhistorys",$('#srefHotWaterLast').val()+","+$('#srefHotWaterThis').val());
			$("#srefHotAirMoneyMsg").attr("mhistorys",$('#srefHotAirLast').val()+","+$('#srefHotAirThis').val());
		}
		//历史欠结、历史余额
		if(data[0].hrBase>0){
			$("#everyHisOwe").show();
			$("#everyHisSave").hide();
			$("#srefHisOwe").val(data[0].hrBase);
			$("#srefHisSave").val(0.00);
		}else{
			$("#everyHisOwe").hide();
			$("#everyHisSave").show();
			$("#srefHisOwe").val(0.00);
			$("#srefHisSave").val(-data[0].hrBase);
		}
		$("#srefPastOwe").val(data[0].hrBase);
		//实收金额
		$("#srefRealPay").val(0.00);
		energy1();
	   	checkMoney();
	   	
	   	
	});
}
function energy1(){
	
	//控制非选中能源项隐藏
	var chargingPlan=parent._chargingPlan;
	$("#costTable").width("540px");
	for(var i in chargingPlan){
		
		if(!chargingPlan[i]["state"]&&"hotair"==i.toString()){
			$("."+i+" input").val("0.00");
			$("."+i).hide();
			continue;
		}
		if(!chargingPlan[i]["state"]){
			$("#costTable").width($("#costTable").width()-135+"px");
			$("."+i+" input").val("0.00");
			$("."+i).hide();
			
		}
	}
	/*moneyBlurFomat($("#sendMessageRentMoney"));
	console.log($("#sendMessageRentMoney").val());*/
	/*var obj=$("#sendMessageRentMoney");
	changeSendPrice(obj[0]);*/

}
/*
	选择账单
	
	是否有发短信
		是：填入《抄表情况》、《能源收费明细（系统计算）》、《能源收费明细（短信通知）》、《能源收费明细》（都填“短信通知”的值）
		否：填入《能源收费明细（短信通知）》（都填“无”）、《能源收费明细》（都填“系统计算”的值）
	是否待收
		是：计算滞纳金、滞纳天数、租金
		否：滞纳金、滞纳天数、租金为0、《能源收费明细》（都填0）
 */
function chooseRenterInstallmentDg() {
	var row = $('#renterInstallmentDg').datagrid('getSelected');
	$("#renterInstallmentId").val(row.jciId);
	$('#srefShouldDay').val(row.jciFukuanri);
	
	
	//发了短信：填入《抄表情况》、《能源收费明细（系统计算）》、《能源收费明细（短信通知）》、《能源收费明细》（都填“短信通知”的值）
	if(row.jciMessageNote != ''&&row.jciMessageNote != null){//发短信的取短信的读数
		var json = eval('('+row.jciMessageNote.getRealJsonStr()+')');
		//抄表情况
		$('#srefWaterLast').val(json.waterLast);
		$('#srefWaterThis').val(json.waterThis);
		$('#srefWaterNum').val(accSub(json.waterThis,json.waterLast));

		$('#srefElectritLast').val(json.electLast);
		$('#srefElectritThis').val(json.electThis);
		$('#srefElectritNum').val(accSub(json.electThis,json.electLast));
		
		$('#srefGasLast').val(json.gasLast);
		$('#srefGasThis').val(json.gasThis);
		$('#srefGasNum').val(accSub(json.gasThis,json.gasLast));
		
		$('#srefHotWaterLast').val(json.hotWaterLast);
		$('#srefHotWaterThis').val(json.hotWaterThis);
		$('#srefHotWaterNum').val(accSub(json.hotWaterThis,json.hotWaterLast));
		
		$('#srefHotAirLast').val(json.hotAirLast);
		$('#srefHotAirThis').val(json.hotAirThis);
		$('#srefHotAirNum').val(accSub(json.hotWaterThis,json.hotWaterLast));
		
		//系统计算
		$('#srefWaterMoneySys').val(json.sys.water);
		$('#srefElectritMoneySys').val(json.sys.elect);
		$('#srefGasMoneySys').val(json.sys.gas);
		$('#srefHotWaterMoneySys').val(json.sys.hotWater);
		$('#srefHotAirMoneySys').val(json.sys.hotAir);

		$('#srefManageMoneySys').val(json.sys.manager);
		$('#srefServerMoneySys').val(json.sys.server);
		$('#srefTvMoneySys').val(json.sys.tv);
		$('#srefWifiMoneySys').val(json.sys.wifi);
		$('#srefOtherSys').val(json.sys.other);
		//短信通知
		$('#srefWaterMoneyMsg').val(json.msg.water);
		$('#srefElectritMoneyMsg').val(json.msg.elect);
		$('#srefGasMoneyMsg').val(json.msg.gas);
		$('#srefHotWaterMoneyMsg').val(json.msg.hotWater);
		$('#srefHotAirMoneyMsg').val(json.msg.hotAir);
		
		$('#srefManageMoneyMsg').val(json.msg.manager);
		$('#srefServerMoneyMsg').val(json.msg.server);
		$('#srefTvMoneyMsg').val(json.msg.tv);
		$('#srefWifiMoneyMsg').val(json.msg.wifi);
		$('#srefOtherMsg').val(json.msg.other);

        //能源收费明细
		$('#srefWaterMoney').val(json.msg.water);
        $('#srefElectritMoney').val(json.msg.elect);
        $('#srefGasMoney').val(json.msg.gas);
        $('#srefHotWaterMoney').val(json.msg.hotWater);
        $('#srefHotAirMoney').val(json.msg.hotAir);

        $('#srefManageMoney').val(json.msg.manager);
		$('#srefServerMoney').val(json.msg.server);
		$('#srefTvMoney').val(json.msg.tv);
		$('#srefWifiMoney').val(json.msg.wifi);
		$('#srefOtherMoney').val(json.msg.other);

        $("#srefWaterMoney").attr("mhistorys",json.waterLast+","+json.waterThis);
        $("#srefElectritMoney").attr("mhistorys",json.electLast+","+json.electThis);
        $("#srefGasMoney").attr("mhistorys",json.gasLast+","+json.gasThis);
        $("#srefHotWaterMoney").attr("mhistorys",json.hotWaterLast+","+json.hotWaterThis);
        $("#srefHotAirMoney").attr("mhistorys",json.hotAirLast+","+json.hotAirThis);
    }else{//没发短信：填入《能源收费明细（短信通知）》（都填“无”）、《能源收费明细》（都填“系统计算”的值）
		//短信通知
		$('#srefWaterMoneyMsg').val(0);
		$('#srefElectritMoneyMsg').val(0);
		$('#srefGasMoneyMsg').val(0);
		$('#srefHotWaterMoneyMsg').val(0);
		$('#srefHotAirMoneyMsg').val(0);
		
		$('#srefManageMoneyMsg').val(0);
		$('#srefServerMoneyMsg').val(0);
		$('#srefTvMoneyMsg').val(0);
		$('#srefWifiMoneyMsg').val(0);
		$('#srefOtherMsg').val(0);
		//能源收费明细
		$('#srefWaterMoney').val($('#srefWaterMoneySys').val());
		$('#srefElectritMoney').val($('#srefElectritMoneySys').val());
		$('#srefGasMoney').val($('#srefGasMoneySys').val());
		$('#srefHotWaterMoney').val($('#srefHotWaterMoneySys').val());
		$('#srefHotAirMoney').val($('#srefHotAirMoneySys').val());
		
		$("#srefManageMoney").val((row.jciManageCost!=null && row.jciManageCost !="")?row.jciManageCost:0.00);
		$("#srefServerMoney").val((row.jciServerCost!=null && row.jciServerCost !="")?row.jciServerCost:0.00);
		$('#srefTvMoney').val($('#srefTvMoneySys').val());
		$('#srefWifiMoney').val($('#srefWifiMoneySys').val());
		$('#srefOtherMoney').val($('#srefOtherSys').val());

		$("#srefWaterMoney").attr("mhistorys",$('#srefWaterLast').val()+","+$('#srefWaterThis').val());
		$("#srefElectritMoney").attr("mhistorys",$('#srefElectritLast').val()+","+$('#srefElectritThis').val());
		$("#srefGasMoney").attr("mhistorys",$('#srefGasLast').val()+","+$('#srefGasThis').val());
		$("#srefHotWaterMoney").attr("mhistorys",$('#srefHotWaterLast').val()+","+$('#srefHotWaterThis').val());
		$("#srefHotAirMoney").attr("mhistorys",$('#srefHotAirLast').val()+","+$('#srefHotAirThis').val());
	}
	if(row.jciState=="待收"){
		//计算滞纳金、滞纳天数、租金
		var money = 0;
		var powerMoneyArry = $('#srefPowerDiv input');//所有能源输入框
		for(var i = 0;i<powerMoneyArry.length;i++){
			if(powerMoneyArry[i].id=="srefShouldDay"||powerMoneyArry[i].id=="srefNotDays"||powerMoneyArry[i].id=="srefDamages"){
				continue;
			}
			money = accAdd(money,$("#"+powerMoneyArry[i].id).val());
		}
		money = accAdd(money,row.jciMoney);
		var today = new Date(formatTime(getNowFormatDate(), 2));
	    var fukuanri = new Date(row.jciFukuanri);
	    if(today<=fukuanri){
	    	$('#srefNotDays').val(0);
		    $('#srefDamages').val(0);
	    }else{
		    var notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
		    $('#srefNotDays').val(notDays);
		    $('#srefDamages').val(accAdd(0,money*notDays*_lateFeeRate*0.01));
	    }
		$('#srefRentMoney').val(row.jciMoney);
		
	}else{
		//清空各种费用
		$('#srefNotDays').val(0);
		$('#srefDamages').val(0);
		$('#srefRentMoney').val(0);

		$('#srefWaterMoney').val(0);
		$('#srefElectritMoney').val(0);
		$('#srefGasMoney').val(0);
		$('#srefHotWaterMoney').val(0);
		$('#srefHotAirMoney').val(0);
		
		$('#srefManageMoney').val(0);
		$('#srefServerMoney').val(0);
		$('#srefTvMoney').val(0);
		$('#srefWifiMoney').val(0);
		$('#srefOtherMoney').val(0);
		
		$("#srefWaterMoney").attr("mhistorys","0,0");
		$("#srefElectritMoney").attr("mhistorys","0,0");
		$("#srefGasMoney").attr("mhistorys","0,0");
		$("#srefHotWaterMoney").attr("mhistorys","0,0");
		$("#srefHotAirMoney").attr("mhistorys","0,0");
	}
	//核算费用
	checkMoney();
}
///单元格单击编辑
//新增收支单元格编辑
var editIndex2 = undefined;
function endEditing2() {
	if (editIndex2 == undefined) {
		return true;
	}
	if ($('#setRenterEveryFinancialTable').datagrid('validateRow', editIndex2)) {
		$('#setRenterEveryFinancialTable').datagrid('endEdit', editIndex2);
		editIndex2 = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell2(index, field) {
	if (endEditing2()) {
		$('#setRenterEveryFinancialTable').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex2 = index;
	}
}
//允许修改金额
function updateRenterEveryFinancial(){
	$('#choseConstractInstallmentDlg [update="update"]').attr('disabled', false);
}

//计算最新欠结
function calNewOwe(){
	var moneyTotal = accAdd(currentBillingData.hrBase, accAdd($('#billsjfSumMoney').val(),$('#billsLateFee').val()));
	$('#billsFinancialMoneyTotal').val(moneyTotal);//应收金额=历史欠结+账单总金额+滞纳金
	var moneybase = currentBillingData.hrBase;//历史欠结
	var moneyGet = $('#billsFinancialMoneyGet').val();//实收金额
	var owe = mySub(moneyTotal, moneyGet);//最新欠结=应收金额-实收金额
	console.log('最新欠结：'+owe);
	if(owe >= 0){
		$('#billsOweDiv').show();
		$('#billsSaveDiv').hide();
		$('#billsEveryOwe').val(accAdd(0,owe));
		$('#billsEverySave').val(0.00);
	}else{
		$('#billsOweDiv').hide();
		$('#billsSaveDiv').show();
		$('#billsEveryOwe').val(0.00);
		$('#billsEverySave').val(accAdd(0,-owe));
	}
}

//生成临时账单、金融账单窗口
function temporaryFinancialBills(){
	var index = $('#monthlyBillsDgIndex').val();
	console.log('index'+index);
	var row = $('#monthlyBillsDg').datagrid('getRows')[index];//首页选中行数据
	currentBillingData = row;
	var jciBillJson = JSON.parse(currentBillingData.jciBillJson.getRealJsonStr());//获取字符串
	$("#addAuspiciousBill").datagrid("loadData",jciBillJson);//加载数据
	//经手人
	for(var j in _userInfoData){
		if(_loginUserId == _userInfoData[j].userId){
			$("#billsGetUserId").val(_userInfoData[j].userId);
			$("#billsShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}//获取经手人填入
	}
	if(currentBillingData.hrBase>0){
		$('#hrbase').html("历史欠结：");
		$('#billsFinancialMoneyhistory').val(currentBillingData.hrBase);
	}else if(currentBillingData.hrBase<=0){
		$('#hrbase').html("历史余额：");
		$('#billsFinancialMoneyhistory').val(-currentBillingData.hrBase);
	}
	$('#billsFinancialDoTime').val(formatDate(getNowFormatDate()));//记账日期
	$('#billsFinanciaBegin').val(row.jciFukuanri);
	$('#billsFinanciaEnd').val(row.jciFukuanri);
	$('#billsMonthlyBillsDate').val(row.jciFukuanri);//收款日
	$('#billsjfSumMoney').val(row.jciMoney); //金额
    $('#billsOweDiv').val(calNewOwe());
	var jciMoney = row.jciMoney;
	var today = new Date(formatTime(getNowFormatDate(), 2));
    var fukuanri = new Date(row.jciFukuanri);
    var notDays = 0;
	if(row.jciState == '待收'){
		if(today<=fukuanri){
			notDays = 0;
		}else{
			notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
		}
	}else{
		notDays = row.jciOverdueDays;
	}
	console.log("li");
	$('#billsNotDays').val(notDays);
	$('#billsLateFee').val(accAdd(0,jciMoney*notDays*_lateFeeRate*0.01));
	$('#billsFinancialMoneyTotal').val(accAdd(currentBillingData.hrBase, accAdd(row.jciMoney,$('#billsLateFee').val())));
}
//生成签约账单窗口
function contractBills(){
	var index = $('#monthlyBillsDgIndex').val();//索引
	console.log('index'+index);
	var row = $('#monthlyBillsDg').datagrid('getRows')[index];//选中行
	console.log(row);
	currentBillingData = row;
	var jciBillJson = JSON.parse(currentBillingData.jciBillJson.getRealJsonStr());//字符串获取
	$("#addAuspiciousBill").datagrid("loadData",jciBillJson);//加载
	//经手人
	for(var j in _userInfoData){
		if(_loginUserId == _userInfoData[j].userId){
			$("#billsGetUserId").val(_userInfoData[j].userId);
			$("#billsShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}
	if(currentBillingData.hrBase>0){
		$('#hrbase').html("历史欠结：");
		$('#billsFinancialMoneyhistory').val(currentBillingData.hrBase);
	}else if(currentBillingData.hrBase<=0){
		$('#hrbase').html("历史余额：");
		$('#billsFinancialMoneyhistory').val(-currentBillingData.hrBase);
	}
	$('#billsFinancialDoTime').val(formatDate(getNowFormatDate()));//记账日期
	$('#billsMonthlyBillsDate').val(row.jciRegisterTime.split(" ")[0]);//收款日
	$('#billsFinanciaBegin').val(row.jciFukuanri);//归属日期
	var total = 0.00;
	var powerFee = 0.00;
	countPaymentType(1, 1);
	for(var i in jciBillJson) {
		if (jciBillJson[i].paymentType == "月付") {
			countPaymentType(1, 1);
			break;
		} else if (jciBillJson[i].paymentType == "季付") {
			countPaymentType(3, 1);
			break;
		} else if (jciBillJson[i].paymentType == "半年付") {
			countPaymentType(6, 1);
			break;
		} else if (jciBillJson[i].paymentType == "年付") {
			countPaymentType(1, 2);
			break;
		}
	}
	for(var i in jciBillJson){
		if(jciBillJson[i].nature == "支出"){
			total = accSub(total,parseFloat(jciBillJson[i].jciMoney));
			console.log(total);
		}else {
			powerFee = accAdd(total,parseFloat(jciBillJson[i].jciMoney));
			total = accAdd(total, parseFloat(jciBillJson[i].jciMoney));
		}
	}

	$('#billsjfSumMoney').val(total); //金额

	$('#billsOweDiv').val(calNewOwe());//计算应收金额，计算实收金额和应收金额差值填入最新欠结
	var today = new Date(formatTime(getNowFormatDate(), 2));
	var fukuanri = new Date(row.jciRegisterTime.split(" ")[0]);
	var notDays = 0;//计算滞纳金
	if(row.jciState == '待收'){
		if(today<=fukuanri){
			notDays = 0;
		}else{
			notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
		}
	}else{
		notDays = row.jciOverdueDays;
	}
	$('#billsNotDays').val(notDays);
	$('#billsLateFee').val(accAdd(0,powerFee*notDays*_lateFeeRate*0.01));
	$('#billsFinancialMoneyTotal').val(accAdd(currentBillingData.hrBase, accAdd(0,powerFee*notDays*_lateFeeRate*0.01)));//应收金额 = 金额 + 滞纳金 + 历史欠结
}
// console.log("账单");
//生成临时账单收支
var jciType;
function addTemporaryBillGeneration(){
	var checkFlag = 0;
	$('#temporaryFinancialBillsDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	var billsFinanciaBegin = $("#billsFinanciaBegin").val(); 					//归属周期开始
	var billsFinanciaEnd = $("#billsFinanciaEnd").val(); 						//归属周期结束
	var billsFinancialWay = $("#billsFinancialWay").val(); 						//账户类型
	var billsFinancialAccountName = $("#billsFinancialAccountName").val(); 		//账户名称
	var jfPayType = $("#billsFinancialPayType").val(); 							//收支方式
	var billsFinancialBankNums = $("#billsFinancialBankNums").val(); 			//账户号码
	var billsFinancialAccountBelong = $("#billsFinancialAccountBelong").val(); 	//账户归属
	var BillJson = $("#addAuspiciousBill").val();								//表格数据
	var billsjfSumMoney = $("#billsjfSumMoney").val();							//金额
	var billsMonthlyBillsDate = $("#billsMonthlyBillsDate").val();				//收款日
	var billsNotDays = $("#billsNotDays").val(); 								//超期天数
	var billsLateFee = $("#billsLateFee").val(); 								//滞纳金
	var billsFinancialMoneyTotal =  $("#billsFinancialMoneyTotal").val(); 		//应收金额
	var billsFinancialMoneyGet = $("#billsFinancialMoneyGet").val(); 			//实收金额
//	var billsFinancialIfMsg = $("#billsFinancialIfMsg").val(); 					//是否发送短信
	var billsEveryOwe = $("#billsEveryOwe").val(); 								//最新欠结
	var billsEverySave = $("#billsEverySave").val(); 							//最新余额
	var jciId = currentBillingData.jciId;
	
	var relationBelongType = '租客';
	var jfFinancialCoding = formatTime(getNowFormatDate(), 3) + parseInt((Math.random()*9+1)*100);
	
	var jfAccountingWhy = currentBillingData.hrAddCommunity + currentBillingData.hrAddBuilding + currentBillingData.hrAddDoorplateno ;
	var jmarLiquidatedDamages = billsLateFee;
	
	var rentNote= '收取' + jciType + '金额，收取明细：';
	var jfOperationRecords = getNowFormatDate() + ','+_loginUserName+'添加收支记录<br>"';
	var jfNatureOfThe;
	
	var jciBillJson = JSON.parse(currentBillingData.jciBillJson.getRealJsonStr());
	var benqiqianjie=0;//打印票据中的本期欠结

	$.ajaxSettings.async = false;
	//生成票据编号
	showLoading();
	$.post("../getBillNoWhenPrint.action",{
		
	},function(printData){
		if (printData.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + printData.msg, 'error');
			return;
		}
		printData = printData.body;
		if(billsLateFee != 0 && billsLateFee != ''){
			var znjson = {};
			znjson.jciMoney = billsLateFee;
			znjson.nature 	= '收入';
			znjson.classification = '违约类';
			znjson.species 	= '逾期-违约金';
			znjson.jciRemark = '违约'+ billsNotDays + '天';
			jciBillJson.push(znjson);
		}
		if(currentBillingData.hrBase > 0){
			var znjson1 = {};
			znjson1.jciMoney = currentBillingData.hrBase;
			znjson1.nature 	= '收入';
			znjson1.classification = '欠结类';
			znjson1.species = '租客还欠结款';
			jciBillJson.push(znjson1);
		}
		if(currentBillingData.hrBase < 0){
			var znjson4 = {};
			znjson4.jciMoney = -currentBillingData.hrBase;
			znjson4.nature 	= '支出';
			znjson4.classification = '欠结类';
			znjson4.species = '还租客预存款';
			jciBillJson.push(znjson4);
		}
		if(billsEveryOwe > 0){//最新欠结
			var znjson2 = {};
			znjson2.jciMoney = billsEveryOwe;
			znjson2.nature = '支出';
			znjson2.classification = '欠结类';
			znjson2.species = '租客欠结款';
			jciBillJson.push(znjson2);
			benqiqianjie = billsEveryOwe;
		}
		if(billsEverySave > 0){//最新余额
			var znjson3 = {};
			znjson3.jciMoney = billsEverySave;
			znjson3.nature = '收入';
			znjson3.classification = '欠结类';
			znjson3.species = '租客预存款';
			jciBillJson.push(znjson3);
			benqiqianjie = -billsEverySave;
		}
		//组装收支jsonArray
		var journal_arr=[];//打印票据
		var provisionalBillJsonArray = [];
		var mingxi = '';
		var provisionalBillJson = {
			jfAccountId		    : billsFinancialBankNums,
			jfAccountingWhy     : jfAccountingWhy,
			jfRenterId          : currentBillingData.hrRenterId,
			jfTheCashierPeople  : _loginUserId,
			jfOperationRecords  : jfOperationRecords,
			jfBelongingToTheName: currentBillingData.renterPopName,
			jfClosedWay		    : billsFinancialWay,
			jfHouse4rentId      : currentBillingData.hrId,
			jfBillingDate 		: currentBillingData.jciRegisterTime,
			jfHandlers		    : _loginUserId,
			jfTheOwnershipType  : relationBelongType,
			jfFinancialCoding   : jfFinancialCoding,
			jfStartCycle        : billsFinanciaBegin,
			jfEndCycle          : billsFinanciaEnd,
			storefront 		    : _loginStore,
			department		    : _loginDepartment,
			jfPayType 			: jfPayType,
			jfHouseId		    : currentBillingData.hrHouseId,
			jfHouse4storeId	    : currentBillingData.hrHouse4storeId,
			jfLandlordId        : currentBillingData.hrLandlordId,
		}
		for(var i in jciBillJson){
			var jcinote = jciBillJson[i].species+':'+jciBillJson[i].jciMoney+'。'
			var jjson ={};
			jjson.feiyong = jciBillJson[i].species;
			jjson.jine = jciBillJson[i].jciMoney;
			jjson.beizhu = jciBillJson[i].jciRemark;
			if(jciBillJson[i].jciLabelType==3&&jciBillJson[i].species=="租金"){
				jjson.beizhu = "从"+$('#billsFinanciaBegin').val()+"至"+$('#billsFinanciaEnd').val();
			}
			journal_arr.push(jjson);
			mingxi = jciBillJson[i].species +',' + mingxi ;
			var item = {
				jfNatureOfThe       : jciBillJson[i].nature,
				jfSumMoney		    : jciBillJson[i].jciMoney,
				jfBigType		    : jciBillJson[i].classification,
				jfAccountingSpecies : jciBillJson[i].species,
				jfFinanNote			: jcinote,
				jfTicketNumber		: printData,
			};
			item = $.extend(item, provisionalBillJson);
			provisionalBillJsonArray.push(item);
		}
		$.post("../rentEachPayment.action",{
			jsonArray 				: JSON.stringify(provisionalBillJsonArray),
			jciId 					: jciId,
		},function(data) {
			if(data.code<0){
				$.messager.alert('通知', '生成收支失败！原因：' + data.msg, 'error');
				hideLoading();
				return;
			}
		});
		/*for(var i in jciBillJson ){
			$.post("../insertFinancial.action",{
				jfFinancialCoding   : jfFinancialCoding,
				jfHouse4rentId      : currentBillingData.hrId,
				jfHouseId		    : currentBillingData.hrHouseId,
				jfHouse4storeId	    : currentBillingData.hrHouse4storeId,
				jfLandlordId        : currentBillingData.hrLandlordId,
				jfRenterId          : currentBillingData.hrRenterId,
				jfHandlers		    : _loginUserId,
				jfTheCashierPeople  : _loginUserId,
				department		    : _loginDepartment,
				storefront 		    : _loginStore,
				jfAccountId		    : billsFinancialBankNums,
				jfClosedWay		    : billsFinancialWay,
				jfNatureOfThe       : jciBillJson[i].nature,
				jfBigType		    : jciBillJson[i].classification,
				jfAccountingSpecies : jciBillJson[i].species,
				jfAccountingWhy     : jfAccountingWhy,
				jfSumMoney		    : jciBillJson[i].jciMoney,
				jfFinanNote   	    : jcinote,
				jfStartCycle        : billsFinanciaBegin,
				jfEndCycle          : billsFinanciaEnd,
				jfTheOwnershipType  : relationBelongType,
				jfBelongingToTheName: currentBillingData.renterPopName,
				jfBillingDate 		: currentBillingData.jciRegisterTime,
				jfOperationRecords  : jfOperationRecords,
				jfPayType 			: jfPayType,
				jfTicketNumber		: printData,
			},function(data) {
				if(data.code<0){
					$.messager.alert('通知', '生成收支失败！原因：' + data.msg, 'error');
					hideLoading();
					return;
				}
			});
		}*/
		var gongsimingcheng = 'gongsimingcheng:"' 	+ _loginCompanyName + '",';
		var piaojubianhao = 'piaojubianhao:"' + printData + '",';
		var jizhangren = 'jizhangren:"' 	+ _loginUserName + '",';
		var shoukuanren = 'shoukuanren:"' 	+ _loginUserName + '",';
		var shoukuanfangshi = 'shoukuanfangshi:"'+jfPayType + '",';
		var wuyedizhi = 'wuyedizhi:"' + jfAccountingWhy + '",';
		var name = 'name:"' + currentBillingData.renterPopName+ '",';
		var feiyongzhouqi = 'feiyongzhouqi:"' + billsFinanciaBegin+ '~' + billsFinanciaEnd+ '",';
		var shagnqiqianjie = 0;
		
		if(currentBillingData.hrBase<0){
			shagnqiqianjie = 0.00;
		}else{
			shagnqiqianjie = currentBillingData.hrBase;
		}

		if(jciBillJson[0].jciLabelType == 3){
			jhpType="租客签约账单收支";
			jciType="租客签约账单";
		}else{
			jhpType="租客临时账单收支";
			jciType="租客临时账单";
		}
		var printArray = {};
		printArray.year					=	formatTime(getNowFormatDate(), 2).split("-")[0];
		printArray.month				=	formatTime(getNowFormatDate(), 2).split("-")[1];
		printArray.day					=	formatTime(getNowFormatDate(), 2).split("-")[2];
		printArray.gongsimingcheng		=	_loginCompanyName;
		printArray.piaojubianhao		=	printData;
		printArray.jizhangren			=	_loginUserName;
		printArray.shoukuanren			=	_loginUserName;
		printArray.shoukuanfangshi		=	jfPayType;
		printArray.wuyedizhi			=	jfAccountingWhy;
		printArray.name					=	currentBillingData.renterPopName;
		printArray.feiyongzhouqi		=	billsFinanciaBegin + '~' + billsFinanciaEnd;
		printArray.journal_arr			=	journal_arr;
		printArray.hejijine				=	billsFinancialMoneyTotal;
		printArray.shishoujine			=	billsFinancialMoneyGet;
		printArray.benqiqianjie			=	benqiqianjie;
		printArray.shangqiqianjie		=	shagnqiqianjie;
		printArray.beizhu				=	"";

		//生成打印票据保存到历史票据表
		$.post("../insertHistoryPrint.action",{
			jhpJson 			: JSON.stringify(printArray),
			jhpType 			: jhpType,
			jhpTitle			: getNowFormatDate()+" 生成"+jhpType+"打印收据",
			jhpHouse4rentId		: currentBillingData.hrId,
			jhpHouse4storeId	: currentBillingData.hrHouse4storeId,
			jhpHouseId			: currentBillingData.hrHouseId,
			jhpLandlordId		: currentBillingData.hrLandlordId,
			jhpRenterId			: currentBillingData.hrRenterId,
			jhpUserId			: _loginUserId,
			jciId               : jciId,
			jciOverdueDays		: billsNotDays,
		}, function(data) {
			if (data != 1) {
				$.messager.alert('通知', wuyedizhi + ' 生成打印票据出错,注意检查账单状态', 'error');
				hideLoading();
			}
		});
		//跟进
		var rentNotenn;
		rentNotenn = '收取'+ jciType +',收取明细：'+mingxi+'实际金额：'+billsFinancialMoneyGet;
		if(jciBillJson[0].jciLabelType == "3") {
			var totalMoney = 0;
			var items = "";
			for (var i = 0; i < jciBillJson.length; i++) {
				items += jciBillJson[i].species + "：" + jciBillJson[i].jciMoney +"元；";
				if(jciBillJson[i].nature =="支出") {
					totalMoney = mySub(totalMoney,parseFloat(jciBillJson[i].jciMoney));
				}else{
					totalMoney = mySum(totalMoney,parseFloat(jciBillJson[i].jciMoney));
				}
			}
			rentNotenn = '收取'+ jciType +',收取明细：'+items+'实际金额：'+totalMoney;
		}
		$.post("../insertHousingFollow.action", {
			jhfDepartment		: _loginDepartment,
			jhfStorefront		: _loginStore,
			jhfHouse4rentId 	: currentBillingData.hrId,
			jhfHouse4storeId 	: currentBillingData.hrHouse4storeId,
			jhfHouseId			: currentBillingData.hrHouseId,
			jhfFollowRemark 	: rentNotenn,
			jhfFollowResult 	: '跟进成功',
			jhfPaymentWay 		: '系统跟进',
			jhfUserId 			: _loginUserId
		},function(data) {
			hideLoading();
			if (data.code!= 1) {
				$.messager.alert('通知',  + ' 系统跟进出错,注意检查账单状态', 'error');
			}else{
				myTips('保存成功！', "success");
				$('#temporaryFinancialBillsDlg').dialog('close');
				console.log("haofan");
			}
		});
		var page=$(".current").html();
		queryMonthlyBills(page,0,1);
		/*$.post("../updateContractInstallment.action",{
			jciId               : jciId,
			jciState			: '已收',
		},function(data) {
			if (data.code != 1) {
				$.messager.alert('通知',  + ' 更新状态出错,注意检查账单状态', 'error');
				hideLoading();
			}else{
				$.post("../updateHouseForRent.action",{
					hrId			: currentBillingData.hrId,
					hrBase			: benqiqianjie,
				},function(data) {
					if (data.code!= 1) {
						$.messager.alert('通知', ' 系统跟进出错,注意检查账单状态', 'error');
						hideLoading();
					}else{
						
					}
				});
			}
		});*/
	});
	$.ajaxSettings.async = true;
}
function AddDays(dayIn,date) {
	var date=new Date(date);
	var myDate=new Date(date.getTime()+dayIn*24*60*60*1000);
	var year=myDate.getFullYear();
	var month=myDate.getMonth()+1;
	var day=myDate.getDate();
	CurrentDate=year+"-";
	if(month>=10)
	{
		CurrentDate=CurrentDate+month+"-";
	}
	else
	{
		CurrentDate=CurrentDate+"0"+month+"-";
	}
	if(day>=10)
	{
		CurrentDate=CurrentDate+day;
	}
	else
	{
		CurrentDate=CurrentDate+"0"+day;
	}
	return CurrentDate;
}
function countPaymentType(num,type){//type=1为加月份，type=2为加年份
	if(type == 1) {
		var begin = new Date($('#billsFinanciaBegin').val());
		begin.setMonth(begin.getMonth() + num);
		begin.setDate(begin.getDate() - 1);
		var end = formatDate(begin);
		$("#billsFinanciaEnd").val(end);
	}else if(type == 2){
		var begin = new Date($('#billsFinanciaBegin').val());
		begin.setFullYear(begin.getFullYear() + num);
		begin.setDate(begin.getDate() - 1);
		var end = formatDate(begin);
		$("#billsFinanciaEnd").val(end);
	}
}
function countTotalFee(num){
	var total = 0.00;
	for(var i in jciBillJson){
		if(jciBillJson[i].nature == "支出"){
			total = mySub(total,parseFloat(jciBillJson[i].jciMoney));
			console.log(total);
		}else {
			if(jciBillJson[i].species == "租金") {
				total = mySum(total, parseFloat(jciBillJson[i].jciMoney)*num);
				console.log(total);
			}else{
				total = mySum(total, parseFloat(jciBillJson[i].jciMoney));
				console.log(total);
			}
		}
	}
	return total;
}
