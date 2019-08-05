
$(function() {
	for (var i = 0; i < _renterCheckoutNature.length; i++) {
		$("#renterCheckout_rcoCheckOutNature").append("<option value = '" + _renterCheckoutNature[i] + "'>" + _renterCheckoutNature[i] + "</option>");
	}
	for (var i = 0; i < _proceduresState.length; i++) {
		$("#renterCheckout_rcoProcedures").append("<option value = '" + _proceduresState[i] + "'>" + _proceduresState[i] + "</option>");
		$("#landlordCheckout_nrcProcedures").append("<option value = '" + _proceduresState[i] + "'>" + _proceduresState[i] + "</option>");
	}
	for (var i = 0; i < _landlordCheckoutNature.length; i++) {
		$("#landlordCheckout_nrcCheckOutNature").append("<option value = '" + _landlordCheckoutNature[i] + "'>" + _landlordCheckoutNature[i] + "</option>");
	}
	for (var i in _acountType) {
		$('.add_financial_way').append("<option value='" + i + "'>" + _acountType[i] + "</option>");
	}
	for (var i in _payType) {
		$('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
	}
	for (var i in _loginCompanyRentDistrict) {
		$("#sourceDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
		$("#searchDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	$('.renterCheckOutState button').click(function(){
		$('#searchState').val($(this).val());
		$(this).removeClass('btn-success');
		$(this).addClass('btn-info');
		$(this).siblings().removeClass('btn-info').addClass('btn-success');
		querySourceInfo(1,0);
	});
	$('.landlordCheckOutState button').click(function(){
		$('#searchState1').val($(this).val());
		$(this).removeClass('btn-success');
		$(this).addClass('btn-info');
		$(this).siblings().removeClass('btn-info').addClass('btn-success');
		queryTrusteeship(1,0);
	});
	$('#tabs').tabs({
		onSelect : function(title, index) {
			// 获得点击选项卡的列数，调用表格初始化
			initTable(title);
		}
	});
	if($('#tabs').tabs('exists','租客退房')){
		initTable('租客退房');
	}else if($('#tabs').tabs('exists','业主退房')){
		initTable('业主退房');
	}
});
function initTable(title){
	if(title == '租客退房'){
		$('#rent_contract_15').css("backgroundColor","#336699");
		$('#rent_contract_15').css("color","white");
		$('#rent_contract_15').attr("divflag", "1");
		querySourceInfo(_pageNum[0],0);
		queryRentContract(1,0);
		$("#renterCheckOutDg").datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				renterCheckoutDlg();
			}
		});
	}else if(title == '业主退房'){
		$('#proprietor_contract_15').css("backgroundColor","#336699");
		$('#proprietor_contract_15').css("color","white");
		$('#proprietor_contract_15').attr("divflag", "1");
		queryTrusteeship(_pageNum[1], 0);
		queryLandLordContract(1,0);
		$("#landlordCheckOutDg").datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				landlordCheckOutDlg();
			}
		});
	}
}
//分页统计总条数
function getrenterCheckOutPageCount(page){
	var pageSize = 15;
	var qCity = $("#sourceCity").find("option:selected").text();
	var qDistrict = $("#sourceDistrict").find("option:selected").text();
	var qZone = $("#sourceZone").find("option:selected").text();
	var qCommunity = $("#sourceCommunity").val();
	var qBuilding = $("#sourceBuilding").val();
	var qDoorplateno = $("#sourceDoorplateno").val();
	var hrState = $("#searchState").val();

	$.post("../queryRenterCheckOut.action", {
		hrAddCity		: qCity,
		hrAddDistrict	: qDistrict,
		hrAddZone		: qZone,
		hrAddCommunity	: qCommunity,
		hrAddBuilding	: qBuilding,
		hrAddDoorplateno: qDoorplateno,
		hrState			: hrState,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"renterCheckOut",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"renterCheckOut",0);
		}
	});
}

//查询租客退房
function querySourceInfo(page,type){
	var startNum = (parseInt(page)-1)*15;
	var endNum = 15;

	var qCity = $("#sourceCity").find("option:selected").text();
	var qDistrict = $("#sourceDistrict").find("option:selected").text();
	var qZone = $("#sourceZone").find("option:selected").text();
	var qCommunity = $("#sourceCommunity").val();
	var qBuilding = $("#sourceBuilding").val();
	var qDoorplateno = $("#sourceDoorplateno").val();
	var hrState = $("#searchState").val();
	
	$.post("../queryRenterCheckOut.action", {
		startNum 		: startNum,
		endNum 			: endNum,
		hrAddCity		: qCity,
		hrAddDistrict	: qDistrict,
		hrAddZone		: qZone,
		hrAddCommunity	: qCommunity,
		hrAddBuilding	: qBuilding,
		hrAddDoorplateno: qDoorplateno,
		hrState			: hrState,
	}, function(data) {
		if(data.code < 0){
			//sourcePage(0,0,0);
			$('#renterCheckOutDg').datagrid({
	            data: [],
	            view: myview,
	            emptyMsg: data.msg
	        });
			if(page==1){
				notCountPage(0, 0 ,"querySourceInfo","renterCheckOut");
			}else{
				notCountPage(page, 0 ,"querySourceInfo","renterCheckOut");
			}
		}else{
			data = data.body;
			console.log(data);
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].detailAddress = data[i].hrAddCommunity + " " + data[i].hrAddBuilding + " " + data[i].hrAddDoorplateno;
			}
			// if(page==1 && type ==0){
			// 	sourcePage(data[0].totalNum,page,0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "querySourceInfo","renterCheckOut");
			}else{
				notCountPage(page, 1 , "querySourceInfo","renterCheckOut");
			}
			
			$("#renterCheckOutDg").datagrid("loadData", data);
		}
	}, "json");
	//查退房总数量
	$.post("../queryHouseRentCheckoutNum.action", {}, function(data) {
		if(data.code > 0){
			data = data.body;
			var arr = ['正办理退房', '退房待审核', '退房待复核', '退房待出账'];
			var arr2 = [];
			for (var i in data) {
				arr2.push(data[i].rcoCheckOutTheState);
			}
			for (var i in arr) {
				if (arr2.indexOf(arr[i] == -1)) {
					$('.renterCheckOutState button[value="'+arr[i]+'"] span').html('（' + 0 + '）');
				}
			}
			for (var i in data) {
				if (data[i].rcoCheckOutTheState == '正办理退房') {
					$('.renterCheckOutState .totalNum0').html('（' + data[i].totalNum + '）');
				} else if (data[i].rcoCheckOutTheState == '退房待审核') {
					$('.renterCheckOutState .totalNum1').html('（' + data[i].totalNum + '）');
				} else if (data[i].rcoCheckOutTheState == '退房待复核') {
					$('.renterCheckOutState .totalNum2').html('（' + data[i].totalNum + '）');
				} else if (data[i].rcoCheckOutTheState == '退房待出账') {
					$('.renterCheckOutState .totalNum3').html('（' + data[i].totalNum + '）');
				}
			}
			$('.renterCheckOutState .totalNum4').html('（' + data[0].totalNum2 + '）');
		}
	});
}

//查询业主退房
function queryTrusteeship(page, type) {
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var qCity = $("#searchCity").find("option:selected").text();
	var qDistrict = $("#searchDistrict").find("option:selected").text();
	var qZone = $("#searchZone").find("option:selected").text();
	var qRoad = $("#searchRoad").val();
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var hsState = $("#searchState1").val();
	var hsDownDeposit = $("#searchHsDownDeposit").val();;
	// 房源信息表导入数据
	$.post("../queryLandlordCheckOut.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		hsAddCity 			: qCity,
		hsAddDistrict 		: qDistrict,
		hsAddZone 			: qZone,
		hsAddCommunity 		: qCommunity,
		hsAddBuilding 		: qBuilding,
		hsAddDoorplateno 	: qDoorplateno,
		hsState				: hsState,
		hsDownDeposit		: hsDownDeposit,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 1);
			$('#landlordCheckOutDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 1);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].detailAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
			}
			$("#landlordCheckOutDg").datagrid("loadData", data);
		}
	}, "json");
	//查退房总数量
	$.post("../queryHouseStoreCheckoutNum.action", {}, function(data) {
		if(data.code > 0){
			data = data.body;
			var arr = ['正办理退房', '退房待审核', '退房待复核', '退房待出账'];
			var arr2 = [];
			for (var i in data) {
				arr2.push(data[i].nrcCheckOutTheState);
			}
			for (var i in arr) {
				if (arr2.indexOf(arr[i] == -1)) {
					$('.landlordCheckOutState button[value="'+arr[i]+'"] span').html('（' + 0 + '）');
				}
			}
			for (var i in data) {
				if (data[i].nrcCheckOutTheState == '正办理退房') {
					$('.landlordCheckOutState .totalNum0').html('（' + data[i].totalNum + '）');
				} else if (data[i].nrcCheckOutTheState == '退房待审核') {
					$('.landlordCheckOutState .totalNum1').html('（' + data[i].totalNum + '）');
				} else if (data[i].nrcCheckOutTheState == '退房待复核') {
					$('.landlordCheckOutState .totalNum2').html('（' + data[i].totalNum + '）');
				} else if (data[i].nrcCheckOutTheState == '退房待出账') {
					$('.landlordCheckOutState .totalNum3').html('（' + data[i].totalNum + '）');
				}
			}
			$('.landlordCheckOutState .totalNum4').html('（' + data[0].totalNum2 + '）');
		}
	});
}
//分页操作
function sourcePage(totalNum,page,type){
	var pageNum = Math.ceil(totalNum /10);
	if(type==0){
		pageNum = Math.ceil(totalNum /15);
		$("#renterCheckOutPage").remove();
		$("#renterCheckOutPageDiv").append("<div class='tcdPageCode' id='renterCheckOutPage' style='text-align:center;'></div>");
		$("#renterCheckOutPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				_pageNum[0] = p;
				if(p<=pageNum){
					querySourceInfo(p,1);
				}
			}
		});
	}
	if(type==1){
		pageNum = Math.ceil(totalNum /15);
		$("#landlordCheckOutPage").remove();
		$("#landlordCheckOutPageDiv").append("<div class='tcdPageCode' id='landlordCheckOutPage' style='text-align:center;'></div>");
		$("#landlordCheckOutPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				_pageNum[1] = p;
				if(p<=pageNum){
					queryTrusteeship(p,1);
				}
			}
		});
	}
	if(type==2){
		pageNum = Math.ceil(totalNum /5);
		$("#rentContractPage").remove();
		$("#rentContractPageDiv").append("<div class='tcdPageCode' id='rentContractPage' style='text-align:center;'></div>");
		$("#rentContractPage").createPage({
			onePageNums:5,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				if(p<=pageNum){
					queryRentContract(p,1);
				}
			}
		});
	}
	if(type==3){
		pageNum = Math.ceil(totalNum /5);
		$("#landLordContractPage").remove();
		$("#landLordContractPageDiv").append("<div class='tcdPageCode' id='landLordContractPage' style='text-align:center;'></div>");
		$("#landLordContractPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				if(p<=pageNum){
					queryLandLordContract(p,1);
				}
			}
		});
	}
}
//账户类型和账号联动
function changeWay(type,accountId) {
	var faPaymentType = $("#"+type+"FinancialWay").find("option:selected").text();
	$("#"+type+"FinancialAccountName").empty();
	$("#"+type+"FinancialAccountName").val('');
	$("#"+type+"FinancialAccountBelong").val('');
	$("#"+type+"FinancialAccountNums").val('');
	$("#"+type+"FinancialBankNums").val('');
	if(faPaymentType==''){
		return;
	}
	$.post("../selectNamePublic.action", {
		faPaymentType:faPaymentType,
	}, function(data) {
		$("#"+type+"FinancialAccountName").append("<option></option>");
		for (var i in data.body) {
			$("#"+type+"FinancialAccountName").append(
					"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
		}
		if(accountId!=0){
			for (var i in data.body) {
				if(data.body[i].faId==accountId){
					$("#"+type+"FinancialAccountName").val(data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount);
					getAccountId(type);
				}
			}
		}
	});
}
function getAccountId(type) {
	if($("#"+type+"FinancialAccountName").val()==''){
		return;
	}
	$("#"+type+"FinancialBankNums").val($("#"+type+"FinancialAccountName").val().split("*#*")[0]);
	$("#"+type+"FinancialAccountNums").val($("#"+type+"FinancialAccountName").val().split("*#*")[2]);
	$("#"+type+"FinancialAccountBelong").val($("#"+type+"FinancialAccountName").val().split("*#*")[1]);
}
//取消租客退房
function revokeRenterCheckOut(){
	$.messager.confirm("操作提示", "确定取消此租客退房吗？", function(data) {
		if (data) {
			var row = $('#renterCheckOutDg').datagrid('getSelected');
			$.post("../deleteInfoHaveRentCheckOut.action", {
				rcoId:row.rcoId,
				hrId:row.hrId,
				hsId:row.hrHouse4storeId,
			}, function(data) {
				if(data.code<0||data==''){
					myTips(data.msg,"error");
					return;
				}
				myTips("取消退房成功！","success");
				querySourceInfo(_pageNum[0],0);
				$('#renterCheckOutDlg').dialog('close');
			});
		}else{
			return;
		}
	});
}
//打开租客审核、复核、出账对话框
function checkRenterCheckoutDlg(type){
	if(type==0){//审核
		$('#checkRenterCheckoutDlg').dialog({
			title : '退房待审核',
			top : getTop(180),
			left : getLeft(280),
			width : 280,
			height : 180,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#renterCheckIf').val('通过');
				$("#checkRenterCheckoutDlg textarea").val('');
			},
		});
		$("#doCheckRenterCheckoutOne").show();
		$("#doCheckRenterCheckoutTwo").hide();
		$('#checkRenterCheckoutDlg').dialog('open');
	}else if(type==1){//复核
		if($('#renterFinancialBankNums').val()==''){
			myTips("请选择一个结算账户！","error");
			hideLoading();
			return;
		}
		$('#checkRenterCheckoutDlg').dialog({
			title : '退房待复核',
			top : getTop(180),
			left : getLeft(280),
			width : 280,
			height : 180,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#renterCheckIf').val('通过');
				$("#checkRenterCheckoutDlg textarea").val('');
			},
		});
		$("#doCheckRenterCheckoutOne").hide()
		$("#doCheckRenterCheckoutTwo").show();
		$('#checkRenterCheckoutDlg').dialog('open');
	}
}
//租客退房审核、复核
function doCheckRenterCheckout(type){
	if(type==0){//审核提交
		if($('#renterCheckIf').val()=='通过'){
			doRenterUpdateCheckout(2, '审核');
		}else{
			doRenterUpdateCheckout(3, '审核');
		}
	}else if(type==1){//复核提交
		if($('#renterCheckIf').val()=='通过'){
			doRenterUpdateCheckout(4, '复核');
		}else{
			doRenterUpdateCheckout(3, '复核');
		}
	}
}

//执行退房操作
function doRenterUpdateCheckout(type, operate){
	
	var row = $('#renterCheckOutDg').datagrid('getSelected');
	var rcoId = row.rcoId;//退房ID
	var renterPopTelephone=row.renterPopTelephone;
	var hrRenterId=row.hrRenterId;
	var hrHouse4storeId=row.hrHouse4storeId;
	console.log("------hrRenterId:"+hrRenterId+" hrHouse4storeId:"+hrHouse4storeId);
	//退房信息
	var rcoCheckOutActualTime = $("#renterCheckout_rcoCheckOutActualTime").val();//办理时间
	var rcoARefundOfTime = $("#renterCheckout_rcoARefundOfTime").val();//退款时间
	var rcoCheckOutNature= $("#renterCheckout_rcoCheckOutNature").html();//退房性质
	var rcoProcedures = $("#renterCheckout_rcoProcedures").val();//手续状态
	var rcoDaysOverdue = $("#renterCheckout_rcoDaysOverdue").html();//超期天数
	var rcoCheckOutReason = $("#renterCheckout_rcoCheckOutReason").val();//退房备注
	var rcoHandler = $('#handlerGetUserId').val();//经办人
	
	//抄表处理
	var rcoWaterBase = $("#renterCheckout_rcoWaterBase").val();//退房水读数
	var rcoLastWaterBase = $("#renterCheckout_rcoLastWaterBase").val();//结清水读数
	var rcoWaterPrice = $("#renterCheckout_rcoWaterPrice").html();//水差额
	var rcoWaterPlan = $("#renterCheckout_rcoWaterPlan").html();//水计费方案

	var rcoElectricityBase = $("#renterCheckout_rcoElectricityBase").val();//退房电读数
	var rcoLastElectricityBase = $("#renterCheckout_rcoLastElectricityBase").val();//结清电读数
	var rcoElectricityPrice = $("#renterCheckout_rcoElectricityPrice").html();//电差额
	var rcoElectricityPlan = $("#renterCheckout_rcoElectricityPlan").html();//电计费方案
	
	var rcoGasBaseNumber = $("#renterCheckout_rcoGasBaseNumber").val();//退房燃气读数
	var rcoGasBaseLast = $("#renterCheckout_rcoGasBaseLast").val();//结清燃气读数
	var rcoGasPrice = $("#renterCheckout_rcoGasPrice").html();//燃气差额
	var rcoGasPlan = $("#renterCheckout_rcoGasPlan").html();//燃气计费方案
	
	var rcoHotWaterBaseNumber = $("#renterCheckout_rcoHotWaterBaseNumber").val();//退房热水读数
	var rcoHotWaterBaseLast = $("#renterCheckout_rcoHotWaterBaseLast").val();//结清热水读数
	var rcoHotWaterPrice = $("#renterCheckout_rcoHotWaterPrice").html();//热水差额
	var rcoHotWaterPlan = $("#renterCheckout_rcoHotWaterPlan").html();//热水计费方案
	
	var rcoHotAirBaseNumber = $("#renterCheckout_rcoHotAirBaseNumber").val();//退房暖气读数
	var rcoHotAirBaseLast = $("#renterCheckout_rcoHotAirBaseLast").val();//结清暖气读数
	var rcoHotAirPrice = $("#renterCheckout_rcoHotAirPrice").html();//暖气差额
	var rcoHotAirPlan = $("#renterCheckout_rcoHotAirPlan").html();//暖气计费方案
	
	
	var rcoSysWater = $("#renterCheckout_rcoSysWater").val();//系统计算水费
	var rcoSysElectricity = $("#renterCheckout_rcoSysElectricity").val();//系统计算电费
	var rcoSysGas = $("#renterCheckout_rcoSysGas").val();//系统计算燃气费
	
	var rcoSysHotWater = $("#renterCheckout_rcoSysHotWater").val();//系统计算热水费
	var rcoSysHotAir = $("#renterCheckout_rcoSysHotAir").val();//系统计算暖气费
	
	//应缴费用
	var rcoWaterCombined = $("#renterCheckout_rcoWaterCombined").val();//水费
	var rcoElectricityCombined = $("#renterCheckout_rcoElectricityCombined").val();//电费
	var rcoGasCombined = $("#renterCheckout_rcoGasCombined").val();//燃气费
	
	var rcoHotWaterCombined = $("#renterCheckout_rcoHotWaterCombined").val();//热水费
	var rcoHotAirCombined = $("#renterCheckout_rcoHotAirCombined").val();//暖气费
	
	var rcoPropertyCostsInTotal = $("#renterCheckout_rcoPropertyCostsInTotal").val();//物管费
	var rcoServerCost = $("#renterCheckout_rcoServerCost").val();//服务费
	var rcoWifiCost = $("#renterCheckout_rcoWifiCost").val();//网络费
	var rcoTvCost = $("#renterCheckout_rcoTvCost").val();//电视费
	var rcoBeyondTheRent = $("#renterCheckout_rcoBeyondTheRent").val();//超期房租
	var rcoOtherChargesInTotal = $("#renterCheckout_rcoOtherChargesInTotal").val();//欠结金额
	var rcoDeductionCombined = $("#renterCheckout_rcoDeductionCombined").val();//合计应缴
	
	//应退费用
	var rcoReturnDeposit = $("#renterCheckout_rcoReturnDeposit").val();//房屋押金
	var rcoReturnPowerDeposit = $("#renterCheckout_rcoReturnPowerDeposit").val();//水电押金
	var rcoReturnDoorDeposit = $("#renterCheckout_rcoReturnDoorDeposit").val();//门卡押金
	var rcoReturnOtherDeposit = $("#renterCheckout_rcoReturnOtherDeposit").val();//其他押金
	var rcoLicenceFee = $("#renterCheckout_rcoLicenceFee").val();//预存费用
	var rcoTotalShouldBeReturned = $("#renterCheckout_rcoTotalShouldBeReturned").val();//合计应退
	
	//违约金及维保
	var rcoBreachOfContract = $("#renterCheckout_rcoBreachOfContract").val();//违约金
	var rcoBreachDetail = $("#renterCheckout_rcoBreachDetail").val();//违约金明细
	var rcoRepairDamages = $("#renterCheckout_rcoRepairDamages").val();//维保费用
	var rcoLateFeeDetail = $("#renterCheckout_rcoLateFeeDetail").val();//维保明细
	
	//退款账户
	var rcoRefundTheUserName = $("#renterCheckout_rcoRefundTheUserName").val();//退款账户名
	var rcoRefundBank = $("#renterCheckout_rcoRefundBank").val();//退款银行
	var rcoRefundAccount = $("#renterCheckout_rcoRefundAccount").val();//退款账号
	
	//扣款账户
	var rcoCheckoutAccount = $("#renterFinancialBankNums").val();//公司扣款退款账号
	var rcoPayType = $("#renterCheckout_rcoPayType").val();//收支方式
	
	//操作记录
	var operationRecords = new Object();
	operationRecords.time = getNowFormatDate();
	operationRecords.operator = _loginUserName;
	operationRecords.operate = operate;
	operationRecords.result = $('#renterCheckIf').val();
	if (operate == '出账') {
		operationRecords.result = '';
	}
	operationRecords.remarks = $('#renterCheckNote').val().replace(/\n/g,' ');
	
	//应缴、应退描述
	var yingjiao = $('#renterCheckout_rcoPayNote').val();
	var yingtui = $('#renterCheckout_rcoReturnNote').val();
	
	//维保记录
	var repairRows = $('#repairDg').datagrid('getRows');
	var rcoRepairNote = JSON.stringify(repairRows);

	showLoading();
	if(type==0){//暂存
		var rcoCheckOutTheState = '正办理退房';
		console.log(""+""+""+""+"");
		$.post("../updataInfoHaveRentCheckOut.action", {
			rcoId 					:rcoId,
			rcoRentId				:row.hrId,
			rcoStoreId				:row.hrHouse4storeId,
			rcoRenterId				:row.hrRenterId,
			rcoCheckOutTheState		:rcoCheckOutTheState,
			rcoCheckOutActualTime	:rcoCheckOutActualTime,
			rcoARefundOfTime		:rcoARefundOfTime,
			rcoCheckOutNature		:rcoCheckOutNature,
			rcoProcedures			:rcoProcedures,
			rcoDaysOverdue			:rcoDaysOverdue,
			rcoCheckOutReason		:rcoCheckOutReason,
			rcoHandler				:rcoHandler,
			rcoWaterBase			:rcoWaterBase,
			rcoLastWaterBase 		:rcoLastWaterBase,
			rcoWaterPrice			:rcoWaterPrice,
			rcoWaterPlan			:rcoWaterPlan,
			rcoElectricityBase		:rcoElectricityBase,
			rcoLastElectricityBase	:rcoLastElectricityBase,
			rcoElectricityPrice		:rcoElectricityPrice,
			rcoElectricityPlan		:rcoElectricityPlan,
			rcoGasBaseNumber 		:rcoGasBaseNumber,
			rcoGasBaseLast 			:rcoGasBaseLast,
			rcoGasPrice 			:rcoGasPrice,
			rcoGasPlan				:rcoGasPlan,
			
			rcoHotWaterBaseNumber 	:rcoHotWaterBaseNumber,
			rcoHotWaterBaseLast 	:rcoHotWaterBaseLast,
			rcoHotWaterPrice 		:rcoHotWaterPrice,
			rcoHotWaterPlan			:rcoHotWaterPlan,
			
			
			rcoHotAirBaseNumber 	:rcoHotAirBaseNumber,
			rcoHotAirBaseLast 		:rcoHotAirBaseLast,
			rcoHotAirPrice 			:rcoHotAirPrice,
			rcoHotAirPlan			:rcoHotAirPlan,
			
			rcoSysWater				:rcoSysWater,
			rcoSysElectricity		:rcoSysElectricity,
			rcoSysGas				:rcoSysGas,
			
			rcoSysHotWater			:rcoSysHotWater,
			rcoSysHotAir			:rcoSysHotAir,
			
			rcoWaterCombined		:rcoWaterCombined,
			rcoElectricityCombined	:rcoElectricityCombined,
			rcoGasCombined 			:rcoGasCombined,
			
			rcoHotWaterCombined 	:rcoHotWaterCombined,
			rcoHotAirCombined 		:rcoHotAirCombined,
			
			rcoPropertyCostsInTotal :rcoPropertyCostsInTotal,
			rcoServerCost 			:rcoServerCost,
			rcoWifiCost 			:rcoWifiCost,
			rcoTvCost				:rcoTvCost,
			rcoBeyondTheRent		:rcoBeyondTheRent,
			rcoOtherChargesInTotal	:rcoOtherChargesInTotal,
			rcoDeductionCombined	:rcoDeductionCombined,
			rcoReturnDeposit		:rcoReturnDeposit,
			rcoReturnPowerDeposit	:rcoReturnPowerDeposit,
			rcoReturnDoorDeposit	:rcoReturnDoorDeposit,
			rcoReturnOtherDeposit	:rcoReturnOtherDeposit,
			rcoLicenceFee			:rcoLicenceFee,
			rcoTotalShouldBeReturned:rcoTotalShouldBeReturned,
			rcoBreachOfContract 	:rcoBreachOfContract,
			rcoBreachDetail			:rcoBreachDetail,
			rcoRepairDamages		:rcoRepairDamages,
			rcoLateFeeDetail		:rcoLateFeeDetail,
			rcoRefundTheUserName	:rcoRefundTheUserName,
			rcoRefundBank 			:rcoRefundBank,
			rcoRefundAccount 		:rcoRefundAccount,
			rcoPayNote				:yingjiao,
			rcoReturnNote			:yingtui,
			rcoRepairNote			:rcoRepairNote,
			rcoSave						:'暂存',
			renterPopTelephone:renterPopTelephone,
			hrRenterId				:hrRenterId,
			hrHouse4storeId		:hrHouse4storeId
		}, function(data) {
			hideLoading();
			if(data.code<0){
				myTips(data.msg,"error");
				return;
			}
			querySourceInfo(_pageNum[0],0);
			myTips("保存成功！","success");
			$('#renterCheckOutDlg').dialog('close');
		});
	}else if(type==1){//提交退房
		var rcoCheckOutTheState = '退房待审核';
		var checkFlag = 0;
		$('#renterCheckOutDlg [require="require"]').each(function(){
			if($(this).val()==''){
				$(this).css("border","1px solid red");
				checkFlag++;
			}else{
				$(this).css("border","1px solid #A9A9A9");
			}
		});
		if(checkFlag!=0){
			myTips("有必填项未填写!","error");
			hideLoading();
			return;
		}
		if($('#renterCheckout_rcoProcedures').val()=='未办手续'){
			myTips("未办手续只能暂存，不可提交！","error");
			hideLoading();
			return;
		}
		var row = $('#renterCheckOutDg').datagrid('getSelected');
		var rows =$('#repairDg').datagrid('getRows');
		$.post("../updataInfoHaveRentCheckOut.action", {
			rcoId 					:rcoId,
			rcoRentId				:row.hrId,
			rcoStoreId				:row.hrHouse4storeId,
			rcoRenterId				:row.hrRenterId,
			rcoCheckOutTheState		:rcoCheckOutTheState,
			rcoCheckOutActualTime	:rcoCheckOutActualTime,
			rcoARefundOfTime		:rcoARefundOfTime,
			rcoCheckOutNature		:rcoCheckOutNature,
			rcoProcedures			:rcoProcedures,
			rcoDaysOverdue			:rcoDaysOverdue,
			rcoCheckOutReason		:rcoCheckOutReason,
			rcoHandler				:rcoHandler,
			rcoWaterBase			:rcoWaterBase,
			rcoLastWaterBase 		:rcoLastWaterBase,
			rcoWaterPrice			:rcoWaterPrice,
			rcoWaterPlan			:rcoWaterPlan,
			rcoElectricityBase		:rcoElectricityBase,
			rcoLastElectricityBase	:rcoLastElectricityBase,
			rcoElectricityPrice		:rcoElectricityPrice,
			rcoElectricityPlan		:rcoElectricityPlan,
			rcoGasBaseNumber 		:rcoGasBaseNumber,
			rcoGasBaseLast 			:rcoGasBaseLast,
			rcoGasPrice 			:rcoGasPrice,
			rcoGasPlan				:rcoGasPlan,
			
			rcoHotWaterBaseNumber 	:rcoHotWaterBaseNumber,
			rcoHotWaterBaseLast 	:rcoHotWaterBaseLast,
			rcoHotWaterPrice 		:rcoHotWaterPrice,
			rcoHotWaterPlan			:rcoHotWaterPlan,
			
			rcoHotAirBaseNumber 	:rcoHotAirBaseNumber,
			rcoHotAirBaseLast 		:rcoHotAirBaseLast,
			rcoHotAirPrice 			:rcoHotAirPrice,
			rcoHotAirPlan			:rcoHotAirPlan,
			
			
			rcoSysWater				:rcoSysWater,
			rcoSysElectricity		:rcoSysElectricity,
			rcoSysGas				:rcoSysGas,
			
			rcoSysHotWater			:rcoSysHotWater,
			rcoSysHotAir			:rcoSysHotAir,
			
			
			rcoWaterCombined		:rcoWaterCombined,
			rcoElectricityCombined	:rcoElectricityCombined,
			rcoGasCombined 			:rcoGasCombined,
			
			rcoHotWaterCombined 	:rcoHotWaterCombined,
			rcoHotAirCombined 		:rcoHotAirCombined,
			
			
			rcoPropertyCostsInTotal :rcoPropertyCostsInTotal,
			rcoServerCost 			:rcoServerCost,
			rcoWifiCost 			:rcoWifiCost,
			rcoTvCost				:rcoTvCost,
			rcoBeyondTheRent		:rcoBeyondTheRent,
			rcoOtherChargesInTotal	:rcoOtherChargesInTotal,
			rcoDeductionCombined	:rcoDeductionCombined,
			rcoReturnDeposit		:rcoReturnDeposit,
			rcoReturnPowerDeposit	:rcoReturnPowerDeposit,
			rcoReturnDoorDeposit	:rcoReturnDoorDeposit,
			rcoReturnOtherDeposit	:rcoReturnOtherDeposit,
			rcoLicenceFee			:rcoLicenceFee,
			rcoTotalShouldBeReturned:rcoTotalShouldBeReturned,
			rcoBreachOfContract 	:rcoBreachOfContract,
			rcoBreachDetail			:rcoBreachDetail,
			rcoRepairDamages		:rcoRepairDamages,
			rcoLateFeeDetail		:rcoLateFeeDetail,
			rcoRefundTheUserName	:rcoRefundTheUserName,
			rcoRefundBank 			:rcoRefundBank,
			rcoRefundAccount 		:rcoRefundAccount,
			rcoPayNote				:yingjiao,
			rcoReturnNote			:yingtui,
			rcoRepairNote			:rcoRepairNote,
			rcoSave					:'暂存',
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			hideLoading();
			querySourceInfo(_pageNum[0],0);
			$('#renterCheckOutDlg').dialog('close');
			myTips("提交成功！","success");
		});
	}else if(type==2){//审核通过
		var rcoCheckOutTheState = '退房待复核';
		$.post("../updateChecOutAudit.action", {
			rcoId 					:rcoId,
			rcoRentId				:row.hrId,
			rcoStoreId				:row.hrHouse4storeId,
			rcoRenterId				:row.hrRenterId,
			rcoCheckOutTheState		:rcoCheckOutTheState,
			rcoOperationRecords		:JSON.stringify(operationRecords),
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			hideLoading();
			querySourceInfo(_pageNum[0],0);
			$('#checkRenterCheckoutDlg').dialog('close');
			$('#renterCheckOutDlg').dialog('close');
			myTips("审核成功！","success");	
		});
	}else if(type==3){//审核、复核不通过
		var rcoCheckOutTheState = '正办理退房';
		$.post("../updateChecOutAudit.action", {
			rcoId 					:rcoId,
			rcoRentId				:row.hrId,
			rcoStoreId				:row.hrHouse4storeId,
			rcoRenterId				:row.hrRenterId,
			rcoCheckOutTheState		:rcoCheckOutTheState,
			rcoCheckOutNature		:rcoCheckOutNature,
			reflashStore			:"重置",
			rcoOperationRecords		:JSON.stringify(operationRecords),
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			hideLoading();
			querySourceInfo(_pageNum[0],0);
			$('#checkRenterCheckoutDlg').dialog('close');
			$('#renterCheckOutDlg').dialog('close');
			myTips("操作成功！","success");
		});
	}else if(type==4){//复核通过
		var rcoCheckOutTheState = '退房待出账';
		$.post("../updateReviewCheckOut.action", {
			rcoId 					: rcoId,
			rcoRentId				: row.hrId,
			rcoStoreId				: row.hrHouse4storeId,
			rcoRenterId				: row.hrRenterId,
			rcoCheckOutTheState		: rcoCheckOutTheState,
			rcoCheckoutAccount		: rcoCheckoutAccount,
			rcoPayType				: rcoPayType,
			rcoOperationRecords		: JSON.stringify(operationRecords),
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			hideLoading();
			querySourceInfo(_pageNum[0],0);
			$('#checkRenterCheckoutDlg').dialog('close');
			$('#renterCheckOutDlg').dialog('close');
			myTips("复核成功！","success");	
		});
	}else if(type==5){//出账
		var rcoCheckOutTheState = '退房完成';
		var row2 = $('#financialTable').datagrid('getRows');
		var jsonStrArry =  JSON.stringify(row2);
		$.post("../updateReviewCheckOut.action", {
			rcoId 					:rcoId,
			rcoRentId				:row.hrId,
			rcoStoreId				:row.hrHouse4storeId,
			rcoRenterId				:row.hrRenterId,
			rcoCheckOutTheState		:rcoCheckOutTheState,
			rcoCheckOutNature		:rcoCheckOutNature,
			rcoOperationRecords		:JSON.stringify(operationRecords),
			rcoActualReceipts		:$('.rcoActualReceipts').val(),
			jsonArray 				:jsonStrArry
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			if(row2.length>0){
				savePrint();
			}
			hideLoading();
			querySourceInfo(_pageNum[0],0);
			$('#financialDlg').dialog('close');
			$('#renterCheckOutDlg').dialog('close');
			myTips("退房完成！","success");	
		});
	}
}
//出账收支查看
function showFinancial(type){
	if (type == 0) {
		if ($('.rcoActualReceiptsDiv').is(':visible') && $('.rcoActualReceipts').val() == '') {
			$('.rcoActualReceipts').css('border', '1px solid red');
			myTips('请填写实收款', 'error');
			return;
		} else {
			$('.rcoActualReceipts').css("border", "1px solid #A9A9A9");
		}
	}
	//查询凭证组对话框
	$("#financialDlg").dialog({
		title : '出账核对',
		top : getTop(320),
		left : getLeft(900),
		width : 900,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	if ($('#financialTable').hasClass('datagrid-f')) {

	} else {
		$('#financialTable').datagrid({
			columns : [ [ {
				field : 'jfAccountingWhy',
				title : '收支目标',
				width : 30,
				align : 'center'
			}, {
				field : 'jfTheOwnershipType',
				title : '归属类型',
				width : 10,
				align : 'center'
			}, {
				field : 'jfBelongingToTheName',
				title : '归属名字',
				width : 10,
				align : 'center'
			},{
				field : 'jfNatureOfThe',
				title : '收支性质',
				width : 10,
				align : 'center'
			},{
				field : 'jfBigType',
				title : '收支大类',
				width : 20,
				align : 'center'
			}, {
				field : 'jfAccountingSpecies',
				title : '收支种类',
				width : 20,
				align : 'center'
			}, {
				field : 'jfSumMoney',
				title : '收支金额',
				width : 10,
				align : 'center'
			} , {
				field : 'jfClosedWay',
				title : '账户类型',
				width : 10,
				align : 'center'
			}] ],
			width : '100%',
			height : '320px',
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
	if(type==0){//租客出账
		var row = $('#renterCheckOutDg').datagrid('getSelected');
		//水电
		var rcoWaterBase = $("#renterCheckout_rcoWaterBase").val();//退房水读数
		var rcoElectricityBase = $("#renterCheckout_rcoElectricityBase").val();//退房电读数
		var rcoGasBaseNumber = $("#renterCheckout_rcoGasBaseNumber").val();//退房燃气读数
		
		var rcoHotWaterBaseNumber = $("#renterCheckout_rcoHotWaterBaseNumber").val();//退房热水读数
		var rcoHotAirBaseNumber = $("#renterCheckout_rcoHotAirBaseNumber").val();//退房暖气读数
		
		
		
		//应退费用
		var rcoReturnDeposit = $("#renterCheckout_rcoReturnDeposit").val();//房屋押金
		var rcoReturnDoorDeposit = $("#renterCheckout_rcoReturnDoorDeposit").val();//门卡押金
		var rcoReturnPowerDeposit = $("#renterCheckout_rcoReturnPowerDeposit").val();//水电押金
		var rcoReturnOtherDeposit = $("#renterCheckout_rcoReturnOtherDeposit").val();//其他押金
		var rcoLicenceFee = $("#renterCheckout_rcoLicenceFee").val();//预存费用
		
		//应缴费用
		var rcoWaterCombined = $("#renterCheckout_rcoWaterCombined").val();//水费
		var rcoElectricityCombined = $("#renterCheckout_rcoElectricityCombined").val();//电费
		var rcoGasCombined = $("#renterCheckout_rcoGasCombined").val();//燃气费
		
		var rcoHotWaterCombined = $("#renterCheckout_rcoHotWaterCombined").val();//热水费
		var rcoHotAirCombined = $("#renterCheckout_rcoHotAirCombined").val();//暖气费
		
		
		
		var rcoPropertyCostsInTotal = $("#renterCheckout_rcoPropertyCostsInTotal").val();//物管费
		var rcoServerCost = $("#renterCheckout_rcoServerCost").val();//服务费
		var rcoWifiCost = $("#renterCheckout_rcoWifiCost").val();//网络费
		var rcoTvCost = $("#renterCheckout_rcoTvCost").val();//电视费
		var rcoBeyondTheRent = $("#renterCheckout_rcoBeyondTheRent").val();//超期房租
		var rcoOtherChargesInTotal = $("#renterCheckout_rcoOtherChargesInTotal").val();//欠结金额
		
		//违约金及维保费
		var rcoBreachOfContract = $("#renterCheckout_rcoBreachOfContract").val();//违约金
		var rcoBreachDetail = $("#renterCheckout_rcoBreachDetail").val();//违约金明细
		var rcoRepairDamages = $("#renterCheckout_rcoRepairDamages").val();//维保费
		var rcoLateFeeDetail = $("#renterCheckout_rcoLateFeeDetail").val();//维保费明细
		
		var rcoCheckoutAccount = $("#renterFinancialBankNums").val();//公司收付款账号
		var jfPayType = $("#renterCheckout_rcoPayType").val();//收支方式
		var jfTicketNumber = $('.rcoNumber').html();//票据编号
		
		//欠结
		var yingjiao = $('#renterCheckout_rcoDeductionCombined').val();
		var yingtui = $('#renterCheckout_rcoTotalShouldBeReturned').val();
		var shishoukuan = $('.rcoActualReceipts').val();
		var yingtuikuan = mySum(shishoukuan, yingtui);//应退=实收+应退-应缴
		yingtuikuan = mySub(yingtuikuan, yingjiao);
		
		jfPayType = '"jfPayType":"' + jfPayType + '"';
		jfTicketNumber = '"jfTicketNumber":"' + jfTicketNumber + '"';
		var belongId = '"jfRenterId":"' + row.hrRenterId + '",'
						+'"jfLandlordId":"' + row.hrLandlordId + '"';
		var belongConding  = '"jfHouse4rentId":"' + row.hrId  + '",'
		                     +'"jfHouse4storeId":"' + row.hrHouse4storeId + '",'
		                     +'"jfHouseId":"' + row.hrHouseId + '"';
		var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
		var jfBillingDate = '"jfBillingDate":"' + formatTime(getNowFormatDate(), 2) + '"';
		var jfHandlers = '"jfHandlers":"' + _loginUserId + '"';
		var jfTheOwnershipType = '"jfTheOwnershipType":"' + '租客' + '"';
		var jfRenterId = '"jfRenterId":"' + row.hrRenterId + '"';
		var jfBelongingToTheName = '"jfBelongingToTheName":"' + row.renterPopName + '"';
		var jfFinancialCoding = '"jfFinancialCoding":"'
				+ formatTime(getNowFormatDate(), 3)
				+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
				+ Math.floor(Math.random() * 10) + '"';
		var jfStartCycle = '"jfStartCycle":"' + formatTime(getNowFormatDate(), 2) + '"';
		var jfEndCycle = '"jfEndCycle":"' + formatTime(getNowFormatDate(), 2) + '"';
		var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ',添加收支记录"';
		var jfClosedWay = '"jfClosedWay":"' + $('#renterFinancialWay').find('option:selected').text()+ '"';
		var jfAccountId = '"jfAccountId":"'+  rcoCheckoutAccount + '"';
		var department = '"department":"'+ _loginDepartment + '"';
		var storefront = '"storefront":"'+ _loginStore + '"';
		var jfAccountingWhy = '"jfAccountingWhy":"'
			+ row.hrAddDistrict 
			+ row.hrAddZone
			+ row.hrAddStreet
			+ row.hrAddCommunity
			+ row.hrAddBuilding
			+ row.hrAddDoorplateno + '"';
		var strArray = jfAccountId + "," + jfAccountingWhy + "," + jfClosedWay + ","
				+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfEndCycle + "," 
				+ jfStartCycle + "," + jfBelongingToTheName + ","
				+ belongConding + "," + belongId + "," + jfBillingDate + ","
				+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
				+ storefront + "," + department + "," + jfPayType + "," + jfTicketNumber;
		var jsonStrArry = '';
		//押金、预存款只能支出
		if(rcoReturnDeposit>0){
			jsonStrArry += "{"+insertFinancial(rcoReturnDeposit,'房屋押金','押金类','支出','退房结算：退还房屋押金')+strArray+"},";
		}else if(rcoReturnDeposit<0){
			jsonStrArry += "{"+insertFinancial(-rcoReturnDeposit,'房屋押金','押金类','支出','退房结算：退还房屋押金')+strArray+"},";
		}
		if(rcoReturnDoorDeposit>0){
			jsonStrArry += "{"+insertFinancial(rcoReturnDoorDeposit,'门卡押金','押金类','支出','退房结算：退还门卡押金')+strArray+"},";
		}else if(rcoReturnDoorDeposit<0){
			jsonStrArry += "{"+insertFinancial(-rcoReturnDoorDeposit,'门卡押金','押金类','支出','退房结算：退还门卡押金')+strArray+"},";
		}
		if(rcoReturnPowerDeposit>0){
			jsonStrArry += "{"+insertFinancial(rcoReturnPowerDeposit,'水电押金','押金类','支出','退房结算：退还水电押金')+strArray+"},";
		}else if(rcoReturnPowerDeposit<0){
			jsonStrArry += "{"+insertFinancial(-rcoReturnPowerDeposit,'水电押金','押金类','支出','退房结算：退还水电押金')+strArray+"},";
		}
		if(rcoReturnOtherDeposit>0){
			jsonStrArry += "{"+insertFinancial(rcoReturnOtherDeposit,'其他押金','押金类','支出','退房结算：退还其他押金')+strArray+"},";
		}else if(rcoReturnOtherDeposit<0){
			jsonStrArry += "{"+insertFinancial(-rcoReturnOtherDeposit,'其他押金','押金类','支出','退房结算：退还其他押金')+strArray+"},";
		}
		if(rcoLicenceFee>0){
			jsonStrArry += "{"+insertFinancial(rcoLicenceFee,'余款结算','能源类','支出','退房结算：退还租客预存款')+strArray+"},";
		}else if(rcoLicenceFee<0){
			jsonStrArry += "{"+insertFinancial(-rcoLicenceFee,'余款结算','能源类','支出','退房结算：退还租客预存款')+strArray+"},";
		}
		//欠结款只能收回
		if(rcoOtherChargesInTotal>0){
			jsonStrArry += "{"+insertFinancial(rcoOtherChargesInTotal,'租客还欠结款','欠结类','收入','退房结算：收取租客还欠结款')+strArray+"},";
		}else if(rcoOtherChargesInTotal<0){
			jsonStrArry += "{"+insertFinancial(-rcoOtherChargesInTotal,'租客还欠结款','欠结类','收入','退房结算：收取租客还欠结款')+strArray+"},";
		}
		//其他可收可支
		if(rcoWaterCombined>0){
			jsonStrArry += "{"+insertFinancial(rcoWaterCombined,'水费','能源类','收入','交清底数'+rcoWaterBase+'立方,退房结算-收取结算水费')+strArray+"},";
		}else if(rcoWaterCombined<0){
			jsonStrArry += "{"+insertFinancial(-rcoWaterCombined,'水费','能源类','支出','交清底数'+rcoWaterBase+'立方,退房结算-退还结算水费')+strArray+"},";
		}
		if(rcoElectricityCombined>0){
			jsonStrArry += "{"+insertFinancial(rcoElectricityCombined,'电费','能源类','收入','交清底数'+rcoElectricityBase+'度,退房结算-收取结算电费')+strArray+"},";
		}else if(rcoElectricityCombined<0){
			jsonStrArry += "{"+insertFinancial(-rcoElectricityCombined,'电费','能源类','支出','交清底数'+rcoElectricityBase+'度,退房结算-退还结算电费')+strArray+"},";
		}
		if(rcoGasCombined>0){
			jsonStrArry += "{"+insertFinancial(rcoGasCombined,'燃气费','能源类','收入','交清底数'+rcoGasBaseNumber+'立方,退房结算-收取结算燃气费')+strArray+"},";
		}else if(rcoGasCombined<0){
			jsonStrArry += "{"+insertFinancial(-rcoGasCombined,'燃气费','能源类','支出','交清底数'+rcoGasBaseNumber+'立方,退房结算-退还结算燃气费')+strArray+"},";
		}
		
		if(rcoHotWaterCombined>0){
			jsonStrArry += "{"+insertFinancial(rcoHotWaterCombined,'热水费','能源类','收入','交清底数'+rcoHotWaterBaseNumber+'立方,退房结算-收取结算燃气费')+strArray+"},";
		}else if(rcoHotWaterCombined<0){
			jsonStrArry += "{"+insertFinancial(-rcoHotWaterCombined,'热水费','能源类','支出','交清底数'+rcoHotWaterBaseNumber+'立方,退房结算-退还结算燃气费')+strArray+"},";
		}
		if(rcoHotAirCombined>0){
			jsonStrArry += "{"+insertFinancial(rcoHotAirCombined,'热水费','能源类','收入','交清底数'+rcoHotAirBaseNumber+'立方,退房结算-收取结算燃气费')+strArray+"},";
		}else if(rcoHotAirCombined<0){
			jsonStrArry += "{"+insertFinancial(-rcoHotAirCombined,'热水费','能源类','支出','交清底数'+rcoHotAirBaseNumber+'立方,退房结算-退还结算燃气费')+strArray+"},";
		}
		
		
		if(rcoPropertyCostsInTotal>0){
			jsonStrArry += "{"+insertFinancial(rcoPropertyCostsInTotal,'物业管理费','能源类','收入','退房结算：收取结算物管费')+strArray+"},";
		}else if(rcoPropertyCostsInTotal<0){
			jsonStrArry += "{"+insertFinancial(-rcoPropertyCostsInTotal,'物业管理费','能源类','支出','退房结算：退还结算物管费')+strArray+"},";
		}
		if(rcoServerCost>0){
			jsonStrArry += "{"+insertFinancial(rcoServerCost,'租赁管理服务费','主营类','收入','退房结算：收取租赁管理服务费')+strArray+"},";
		}else if(rcoServerCost<0){
			jsonStrArry += "{"+insertFinancial(-rcoServerCost,'租赁管理服务费','主营类','支出','退房结算：退还租赁管理服务费')+strArray+"},";
		}
		if(rcoWifiCost>0){
			jsonStrArry += "{"+insertFinancial(rcoWifiCost,'网络费','能源类','收入','退房结算：收取网络费')+strArray+"},";
		}else if(rcoWifiCost<0){
			jsonStrArry += "{"+insertFinancial(-rcoWifiCost,'网络费','能源类','支出','退房结算：退还网络费')+strArray+"},";
		}
		if(rcoTvCost>0){
			jsonStrArry += "{"+insertFinancial(rcoTvCost,'电视费','能源类','收入','退房结算：收取电视费')+strArray+"},";
		}else if(rcoTvCost<0){
			jsonStrArry += "{"+insertFinancial(-rcoTvCost,'电视费','能源类','支出','退房结算：退还电视费')+strArray+"},";
		}
		if(rcoBeyondTheRent>0){
			jsonStrArry += "{"+insertFinancial(rcoBeyondTheRent,'租金','主营类','收入','退房结算：退租超期，收取超期房租费')+strArray+"},";
		}else if(rcoBeyondTheRent<0){
			jsonStrArry += "{"+insertFinancial(-rcoBeyondTheRent,'租金','主营类','支出','退房结算：退还剩余多收租金')+strArray+"},";
		}
		if(rcoBreachOfContract>0){
			jsonStrArry += "{"+insertFinancial(rcoBreachOfContract,'退房-违约金','违约类','收入','退房结算：租客违约，收取租客违约金。违约金明细：'+rcoBreachDetail)+strArray+"},";
		}else if(rcoBreachOfContract<0){
			jsonStrArry += "{"+insertFinancial(-rcoBreachOfContract,'退房-违约金','违约类','支出','退房结算：公司违约，付给租客违约金。违约金明细：'+rcoBreachDetail)+strArray+"},";
		}
		if(rcoRepairDamages>0){
			jsonStrArry += "{"+insertFinancial(rcoRepairDamages,'退房-材料费','维修类','收入','退房结算：收取维修赔偿费')+strArray+"},";
		}else if(rcoRepairDamages<0){
			jsonStrArry += "{"+insertFinancial(-rcoRepairDamages,'材料费','维修类','支出','退房结算：退还维修赔偿费')+strArray+"},";
		}
		//实际应退<0，说明租客欠钱，应该生成欠结款
		if(yingtuikuan < 0){
			jsonStrArry += "{"+insertFinancial(-yingtuikuan,'应收款','财务类','支出','退房结算：垫付租客应收款')+strArray+"},";
			jsonStrArry += "{"+insertFinancial(-yingtuikuan,'租客欠结款','欠结类','支出','退房结算：租客欠结款')+strArray+"},";
		}
		jsonStrArry = "["+jsonStrArry+"]";
		jsonStrArry = eval(jsonStrArry.replace(/[\r\n]/g,""));
		var deleteArray = []
		for(var i in jsonStrArry){
			if(jsonStrArry[i].jfSumMoney==0||jsonStrArry[i].jfSumMoney==''){
				deleteArray.push(i);
			}
		}
		var deleteFlag = 0 ;
		for(var i in deleteArray){
			jsonStrArry.splice(parseInt(deleteArray[i]-deleteFlag),1);
			deleteFlag++;
		}
		$("#financialTable").datagrid("loadData", jsonStrArry);
		$("#doRenterFinancialButton").show();
		$("#doLandlordFinancialButton").hide();
	}else{//房东出账
		var row = $('#landlordCheckOutDg').datagrid('getSelected');
		//退款相关
		var nrcRefundTheUserName = $("#landlordCheckout_nrcRefundTheUserName").val();//开户名称
		var nrcARefundOfTime = $("#landlordCheckout_nrcARefundOfTime").val();//退款时间
		var nrcRefundBank = $("#landlordCheckout_nrcRefundBank").val();//退款银行名称
		var nrcRefundAccount = $("#landlordCheckout_nrcRefundAccount").val();//退款银行账号
		
		//其他费用
		var nrcBreachOfContract = $("#landlordCheckout_nrcBreachOfContract").val();//违约金
		var nrcBreachOfContractNote = $("#landlordCheckout_nrcBreachOfContractNote").val();//违约金明细
		var nrcMaintenanceCompensation = $("#landlordCheckout_nrcMaintenanceCompensation").val();//维保赔偿
		var nrcRemainingRental = $("#landlordCheckout_nrcRemainingRental").val();//租金
		var nrcHouseDeposit = $("#landlordCheckout_nrcHouseDeposit").val();//押金
		var nrcWaterCombined = $("#landlordCheckout_nrcWaterCombined").val();//水费
		var nrcElectricityCombined = $("#landlordCheckout_nrcElectricityCombined").val();//电费
		var nrcGasCombined = $("#landlordCheckout_nrcGasCombined").val();//燃气费
		
		var nrcHotWaterCombined = $("#landlordCheckout_nrcHotWaterCombined").val();//热水费
		var nrcHotAirCombined = $("#landlordCheckout_nrcHotAirCombined").val();//暖气费
		
		
		
		var nrcContentCanalFee = $("#landlordCheckout_nrcContentCanalFee").val();//管理费
		var nrcTvCost = $("#landlordCheckout_nrcTvCost").val();//电视费
		var savingsAccount = $("#landlordCheckout_savingsAccount").val();//预存费用
		var arrears = $("#landlordCheckout_arrears").val();//欠结金额
		
		var nrcFinancialAccountTable = $("#landlordFinancialBankNums").val();//公司收付款账户
		
		var jfPayType = $("#landlordCheckout_nrcPayType").val();//收支方式
		var jfTicketNumber = $('.nrcNumber').html();//票据编号
		
		jfPayType = '"jfPayType":"' + jfPayType + '"';
		jfTicketNumber = '"jfTicketNumber":"' + jfTicketNumber + '"';
		var belongConding = '"jfHouse4storeId":"' + row.hsId + '"';
		var belongId = '"jfLandlordId":"' + row.hsLandlordId + '"';
		var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
		var jfBillingDate = '"jfBillingDate":"' + formatTime(getNowFormatDate(), 2) + '"';
		var jfHandlers = '"jfHandlers":"' + _loginUserId + '"';
		var jfTheOwnershipType = '"jfTheOwnershipType":"' + '业主' + '"';
		var jfBelongingToTheName = '"jfBelongingToTheName":"' + row.popName + '"';
		var jfFinancialCoding = '"jfFinancialCoding":"'
				+ formatTime(getNowFormatDate(), 3)
				+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
				+ Math.floor(Math.random() * 10) + '"';
		var jfClosedWay = '"jfClosedWay":"' + $('#landlordFinancialWay').find('option:selected').text()+ '"';
		var jfStartCycle = '"jfStartCycle":"' + formatTime(getNowFormatDate(), 2) + '"';
		var jfEndCycle = '"jfEndCycle":"' + formatTime(getNowFormatDate(), 2) + '"';
		var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ',添加收支记录"';
		var jfAccountId = '"jfAccountId":"' +  nrcFinancialAccountTable + '"';
		var department = '"department":"' + _loginDepartment + '"';
		var storefront = '"storefront":"' + _loginStore + '"';
		var jfAccountingWhy = '"jfAccountingWhy":"'
			+ row.hsAddDistrict
			+ row.hsAddZone
			+ row.hsAddStreet
			+ row.hsAddCommunity
			+ row.hsAddBuilding
			+ row.hsAddDoorplateno + '"';
		var strArray = jfAccountId + ","  + jfAccountingWhy + ","
				+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfEndCycle
				+ "," + jfStartCycle + "," + jfBelongingToTheName + "," +jfClosedWay+ ","
				+ belongConding + "," + belongId + "," + jfBillingDate + ","
				+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
				+ storefront + "," + department + ","+ jfPayType + "," + jfTicketNumber;
		var jsonStrArry = '';
		
		//押金只能收回
		if(nrcHouseDeposit>0){
			jsonStrArry += "{"+insertFinancial(nrcHouseDeposit,'房屋押金','押金类','收入','退房结算：收回房屋押金')+strArray+"},";
		}else if(nrcHouseDeposit<0){
			jsonStrArry += "{"+insertFinancial(-nrcHouseDeposit,'房屋押金','押金类','收入','退房结算：收回房屋押金')+strArray+"},";
		}
		//其他可收可支
		if(nrcWaterCombined>0){
			jsonStrArry += "{"+insertFinancial(nrcWaterCombined,'水费','能源类','收入','退房结算：收取业主结算水费')+strArray+"},";
		}else if(nrcWaterCombined<0){
			jsonStrArry += "{"+insertFinancial(-nrcWaterCombined,'水费','能源类','支出','退房结算：付给业主结算水费')+strArray+"},";
		}
		if(nrcElectricityCombined>0){
			jsonStrArry += "{"+insertFinancial(nrcElectricityCombined,'电费','能源类','收入','退房结算：收取业主结算电费')+strArray+"},";
		}else if(nrcElectricityCombined<0){
			jsonStrArry += "{"+insertFinancial(-nrcElectricityCombined,'电费','能源类','支出','退房结算：付给业主结算电费')+strArray+"},";
		}
		if(nrcGasCombined>0){
			jsonStrArry += "{"+insertFinancial(nrcGasCombined,'燃气费','能源类','收入','退房结算：收取业主结算燃气费')+strArray+"},";
		}else if(nrcGasCombined<0){
			jsonStrArry += "{"+insertFinancial(-nrcGasCombined,'燃气费','能源类','支出','退房结算：付给业主结算燃气费')+strArray+"},";
		}
		
		if(nrcHotWaterCombined>0){
			jsonStrArry += "{"+insertFinancial(nrcHotWaterCombined,'热水费','能源类','收入','退房结算：收取业主结算燃气费')+strArray+"},";
		}else if(nrcHotWaterCombined<0){
			jsonStrArry += "{"+insertFinancial(-nrcHotWaterCombined,'热水费','能源类','支出','退房结算：付给业主结算燃气费')+strArray+"},";
		}
		if(nrcHotAirCombined>0){
			jsonStrArry += "{"+insertFinancial(nrcHotAirCombined,'暖气费','能源类','收入','退房结算：收取业主结算燃气费')+strArray+"},";
		}else if(nrcHotAirCombined<0){
			jsonStrArry += "{"+insertFinancial(-nrcHotAirCombined,'暖气费','能源类','支出','退房结算：付给业主结算燃气费')+strArray+"},";
		}
		
		
		if(nrcContentCanalFee>0){
			jsonStrArry += "{"+insertFinancial(nrcContentCanalFee,'物业管理费','能源类','收入','退房结算：收取业主结算物业管理费')+strArray+"},";
		}else if(nrcContentCanalFee<0){
			jsonStrArry += "{"+insertFinancial(-nrcContentCanalFee,'物业管理费','能源类','支出','退房结算：付给业主结算物业管理费')+strArray+"},";
		}
		if(nrcTvCost>0){
			jsonStrArry += "{"+insertFinancial(nrcTvCost,'电视费','能源类','收入','退房结算：收取业主电视费')+strArray+"},";
		}else if(nrcTvCost<0){
			jsonStrArry += "{"+insertFinancial(-nrcTvCost,'电视费','能源类','支出','退房结算：付给业主电视费')+strArray+"},";
		}
		if(nrcBreachOfContract>0){
			jsonStrArry += "{"+insertFinancial(nrcBreachOfContract,'退房-违约金','违约类','收入','退房结算：公司违约，收取业主违约金。违约金明细：'+nrcBreachOfContractNote)+strArray+"},";
		}else if(nrcBreachOfContract<0){
			jsonStrArry += "{"+insertFinancial(-nrcBreachOfContract,'退房-违约金','违约类','支出','退房结算：业主违约，付给业主违约金。违约金明细：'+nrcBreachOfContractNote)+strArray+"},";
		}
		if(nrcMaintenanceCompensation>0){
			jsonStrArry += "{"+insertFinancial(nrcMaintenanceCompensation,'材料费','维修类','收入','退房结算：收取业主维修赔偿费')+strArray+"},";
		}else if(nrcMaintenanceCompensation<0){
			jsonStrArry += "{"+insertFinancial(-nrcMaintenanceCompensation,'退房-材料费','维修类','支出','退房结算：付给业主维修赔偿费')+strArray+"},";
		}
		if(nrcRemainingRental>0){
			jsonStrArry += "{"+insertFinancial(nrcRemainingRental,'租金','主营类','收入','退房结算：收取多付给业主的租金')+strArray+"},";
		}else if(nrcRemainingRental<0){
			jsonStrArry += "{"+insertFinancial(-nrcRemainingRental,'租金','主营类','支出','退房结算：付给业主未付的租金')+strArray+"},";
		}
		jsonStrArry += "{"+insertFinancial(arrears,'余款结算','能源类','收入','退房结算：收取房东还欠结款。')+strArray+"},";
		jsonStrArry += "{"+insertFinancial(savingsAccount,'房东还欠结款','欠结类','支出','退房结算：退还房东预存款')+strArray+"},";
		jsonStrArry = "["+jsonStrArry+"]";
		jsonStrArry = eval(jsonStrArry.replace(/[\r\n]/g,""));
		var deleteArray = []
		for(var i in jsonStrArry){
			if(jsonStrArry[i].jfSumMoney==0||jsonStrArry[i].jfSumMoney==''){
				deleteArray.push(i);
			}
		}
		var deleteFlag = 0 ;
		for(var i in deleteArray){
			jsonStrArry.splice(parseInt(deleteArray[i]-deleteFlag),1);
			deleteFlag++;
		}
		$("#financialTable").datagrid("loadData", jsonStrArry);
		$("#doRenterFinancialButton").hide();
		$("#doLandlordFinancialButton").show();
	}
	
	$("#financialDlg").dialog('open');
}
//收支公共
function insertFinancial(jfSumMoney,jfAccountingSpecies,jfBigType,jfNatureOfThe,jfFinanNote){
	if(jfSumMoney==null || jfSumMoney==''){
		jfSumMoney = 0;
	}
	var jsonString =  '"jfSumMoney":"'+ jfSumMoney + '"'+","
					 +'"jfAccountingSpecies":"'+ jfAccountingSpecies + '"'+","
					 +'"jfBigType":"'+ jfBigType + '"'+"," 
					 +'"jfNatureOfThe":"'+ jfNatureOfThe + '"'+","
					 +'"jfFinanNote":"'+ jfFinanNote + '"'+"," ;
	return jsonString;
}
/****************** 房东退房部分 **********************/
//打开业主退房审核、复核对话框
function checkLandlordCheckoutDlg(type){
	if(type==0){
		$('#checkLandlordCheckoutDlg').dialog({
			title : '退房待审核',
			top : getTop(180),
			left : getLeft(280),
			width : 280,
			height : 180,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#landlordCheckIf').val('通过');
				$("#checkLandlordCheckoutDlg textarea").val('');
			},
		});
		$("#doCheckLandlordCheckoutOne").show();
		$("#doCheckLandlordCheckoutTwo").hide();
		$('#checkLandlordCheckoutDlg').dialog('open');
	}else if(type==1){
		$('#checkLandlordCheckoutDlg').dialog({
			title : '退房待复核',
			top : getTop(180),
			left : getLeft(280),
			width : 280,
			height : 180,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#landlordCheckIf').val('通过');
				$("#checkLandlordCheckoutDlg textarea").val('');
			},
		});
		$("#doCheckLandlordCheckoutOne").hide();
		$("#doCheckLandlordCheckoutTwo").show();
		$('#checkLandlordCheckoutDlg').dialog('open');
	}
}
//房东退房待审核复核判断
function doCheckLandlordCheckout(type){
	if(type==0){//审核
		if($('#landlordCheckIf').val()=='通过'){
			doLandlordUpdateCheckout(2, '审核');
		}else{
			doLandlordUpdateCheckout(3, '审核');
		}
	}else if(type==1){//复核
		if($('#landlordCheckIf').val()=='通过'){
			doLandlordUpdateCheckout(4, '复核');
		}else{
			doLandlordUpdateCheckout(3, '复核');
		}
	}
}
//房东退房操作
function doLandlordUpdateCheckout(type, operate){
	showLoading();
	var row = $('#landlordCheckOutDg').datagrid('getSelected');
	//退房信息
	var nrcId = row.nrcId;//id
	var nrcProcedures = $("#landlordCheckout_nrcProcedures").find("option:selected").text();//手续状态
	var nrcCheckOutNature = $("#landlordCheckout_nrcCheckOutNature").html();//退房性质
	var nrcCheckOutReason = $("#landlordCheckout_nrcCheckOutReason").val();//退房原因
	var nrcActualCheckOutTime = $("#landlordCheckout_nrcActualCheckOutTime").val();//实际退房时间
	var nrcARefundOfTime = $("#landlordCheckout_nrcARefundOfTime").val();//退款时间
	var nrcHandler = $("#landHandlerGetUserId").val();//经办人
	
	//退款相关
	var nrcRefundTheUserName = $("#landlordCheckout_nrcRefundTheUserName").val();//开户名称
	var nrcRefundBank = $("#landlordCheckout_nrcRefundBank").val();//退款银行名称
	var nrcRefundAccount = $("#landlordCheckout_nrcRefundAccount").val();//退款银行账号
	
	//水电气
	var nrcWaterVolFirst = $("#landlordCheckout_nrcWaterVolFirst").val();//水退房抄表
	var nrcWaterVolLast = $("#landlordCheckout_nrcWaterVolLast").val();//水上次结清
	var nrcWaterDiff = $("#landlordCheckout_nrcWaterDiff").html();//水差值
	var nrcWaterUnitPrice = $("#landlordCheckout_nrcWaterUnitPrice").val();//水单价
	var nrcWaterCombined = $("#landlordCheckout_nrcWaterCombined").val();//水费
	var nrcElectritVolFirst = $("#landlordCheckout_nrcElectritVolFirst").val();//电退房抄表
	var nrcElectritVolLast = $("#landlordCheckout_nrcElectritVolLast").val();//电上次结清
	var nrcElectritDiff = $("#landlordCheckout_nrcElectritDiff").html();//电差值
	var nrcElectritUnitPrice = $("#landlordCheckout_nrcElectritUnitPrice").val();//电单价
	var nrcElectricityCombined = $("#landlordCheckout_nrcElectricityCombined").val();//电费
	var nrcGasVolFirst = $("#landlordCheckout_nrcGasVolFirst").val();//气退房抄表
	var nrcGasVolLast = $("#landlordCheckout_nrcGasVolLast").val();//气上次结清
	var nrcGasDiff = $("#landlordCheckout_nrcGasDiff").html();//气差值
	var nrcGasUnitPrice = $("#landlordCheckout_nrcGasUnitPrice").val();//气单价
	var nrcGasCombined = $("#landlordCheckout_nrcGasCombined").val();//燃气费
	
	var nrcHotWaterVolFirst = $("#landlordCheckout_nrcHotWaterVolFirst").val();//热水退房抄表
	var nrcHotWaterVolLast = $("#landlordCheckout_nrcHotWaterVolLast").val();//热水上次结清
	var nrcHotWaterDiff = $("#landlordCheckout_nrcHotWaterDiff").html();//热水差值
	var nrcHotWaterUnitPrice = $("#landlordCheckout_nrcHotWaterUnitPrice").val();//热水单价
	var nrcHotWaterCombined = $("#landlordCheckout_nrcHotWaterCombined").val();//热水费
	
	var nrcHotAirVolFirst = $("#landlordCheckout_nrcHotAirVolFirst").val();//热水退房抄表
	var nrcHotAirVolLast = $("#landlordCheckout_nrcHotAirVolLast").val();//热水上次结清
	var nrcHotAirDiff = $("#landlordCheckout_nrcHotAirDiff").html();//热水差值
	var nrcHotAirUnitPrice = $("#landlordCheckout_nrcHotAirUnitPrice").val();//热水单价
	var nrcHotAirCombined = $("#landlordCheckout_nrcHotAirCombined").val();//热水费
	
	//其他费用
	var nrcBreachOfContract = $("#landlordCheckout_nrcBreachOfContract").val();//违约金
	var nrcBreachOfContractNote = $("#landlordCheckout_nrcBreachOfContractNote").val();//违约金明细
	var nrcMaintenanceCompensation = $("#landlordCheckout_nrcMaintenanceCompensation").val();//维修赔偿
	var nrcHouseDeposit = $("#landlordCheckout_nrcHouseDeposit").val();//押金
	var nrcRemainingRental = $("#landlordCheckout_nrcRemainingRental").val();//租金
	var nrcContentCanalFee = $("#landlordCheckout_nrcContentCanalFee").val();//管理费
	var nrcTvCost = $("#landlordCheckout_nrcTvCost").val();//电视费
	var nrcDeductTheAmount = $("#landlordCheckout_nrcDeductTheAmount").val();//合计应缴
	var nrcRefundTheAmount = $("#landlordCheckout_nrcRefundTheAmount").val();//合计应退
	
	var nrcFinancialAccountTable = $("#landlordFinancialBankNums").val();//公司收付款账户
	var nrcPayType = $("#landlordCheckout_nrcPayType").val();//收支方式
	
	//操作记录
	var operationRecords = new Object();
	operationRecords.time = getNowFormatDate();
	operationRecords.operator = _loginUserName;
	operationRecords.operate = operate;
	operationRecords.result = $('#landlordCheckIf').val();
	if (operate == '出账') {
		operationRecords.result = '';
	}
	operationRecords.remarks = $('#landlordCheckNote').val().replace(/\n/g,' ');
	
	//应缴、应退描述
	var yingjiao = $('#landlordCheckout_nrcPayNote').val();
	var yingtui = $('#landlordCheckout_nrcReturnNote').val();
	
	//维保记录
	var repairRows = $('#repairLandlordDg').datagrid('getRows');
	var nrcRepairNote = JSON.stringify(repairRows);
	if(type==0){//暂存
		var nrcCheckOutTheState = '正办理退房';
		$.post("../updateNotRentCheckOut.action", {
			nrcId 						:nrcId,
			nrcLandlordId 				:row.hsLandlordId,
			nrcStoreId 					:row.hsId,
			nrcProcedures				:nrcProcedures,
			nrcCheckOutTheState			:nrcCheckOutTheState,
			nrcCheckOutNature 			:nrcCheckOutNature,
			nrcCheckOutReason 			:nrcCheckOutReason,
			nrcActualCheckOutTime 		:nrcActualCheckOutTime,
			nrcARefundOfTime 			:nrcARefundOfTime,
			nrcHandler					:nrcHandler,
			nrcRefundTheUserName 		:nrcRefundTheUserName,
			nrcRefundBank 				:nrcRefundBank,
			nrcRefundAccount 			:nrcRefundAccount,
			nrcWaterVolFirst			:nrcWaterVolFirst,
			nrcWaterVolLast				:nrcWaterVolLast,
			nrcWaterDiff				:nrcWaterDiff,
			nrcWaterUnitPrice			:nrcWaterUnitPrice,
			nrcWaterCombined			:nrcWaterCombined,
			nrcElectritVolFirst			:nrcElectritVolFirst,
			nrcElectritVolLast			:nrcElectritVolLast,
			nrcElectritDiff				:nrcElectritDiff,
			nrcElectritUnitPrice		:nrcElectritUnitPrice,
			nrcElectricityCombined		:nrcElectricityCombined,
			nrcGasVolFirst				:nrcGasVolFirst,
			nrcGasVolLast				:nrcGasVolLast,
			nrcGasDiff					:nrcGasDiff,
			nrcGasUnitPrice				:nrcGasUnitPrice,
			nrcGasCombined				:nrcGasCombined,
			
			nrcHotWaterVolFirst			:nrcHotWaterVolFirst,
			nrcHotWaterVolLast			:nrcHotWaterVolLast,
			nrcHotWaterDiff				:nrcHotWaterDiff,
			nrcHotWaterUnitPrice		:nrcHotWaterUnitPrice,
			nrcHotWaterCombined			:nrcHotWaterCombined,
			
			nrcHotAirVolFirst			:nrcHotAirVolFirst,
			nrcHotAirVolLast			:nrcHotAirVolLast,
			nrcHotAirDiff				:nrcHotAirDiff,
			nrcHotAirUnitPrice			:nrcHotAirUnitPrice,
			nrcHotAirCombined			:nrcHotAirCombined,
			
			
			nrcBreachOfContract 		:nrcBreachOfContract,
			nrcBreachOfContractNote		:nrcBreachOfContractNote,
			nrcMaintenanceCompensation 	:nrcMaintenanceCompensation,
			nrcHouseDeposit 			:nrcHouseDeposit,
			nrcRemainingRental 			:nrcRemainingRental,
			nrcContentCanalFee 			:nrcContentCanalFee,
			nrcTvCost 					:nrcTvCost,
			nrcDeductTheAmount			:nrcDeductTheAmount,
			nrcRefundTheAmount			:nrcRefundTheAmount,
			nrcPayNote					:yingjiao,
			nrcReturnNote				:yingtui,
			nrcRepairNote				:nrcRepairNote,
			nrcSave						:'暂存',
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			queryTrusteeship(_pageNum[1], 0);
			$('#landlordCheckOutDlg').dialog('close');
			hideLoading();
			myTips("操作成功！","success");
		});
	}else if(type==1){//提交退房
		var nrcCheckOutTheState = '退房待审核';
		var checkFlag = 0;
		$('#landlordCheckOutDlg [require="require"]').each(function(){
			if($(this).val()==''){
				$(this).css("border","1px solid red");
				checkFlag++;
			}else{
				$(this).css("border","1px solid #A9A9A9");
			}
		});
		if(checkFlag!=0){
			myTips("有必填项未填写!","error");
			hideLoading();
			return;
		}
		if($('#landlordCheckout_nrcProcedures').val()=='未办手续'){
			myTips("未办手续只能暂存，不可提交！","error");
			hideLoading();
			return;
		}
		$.post("../updateNotRentCheckOut.action", {
			nrcId 						:nrcId,
			nrcLandlordId 				:row.hsLandlordId,
			nrcStoreId 					:row.hsId,
			nrcProcedures				:nrcProcedures,
			nrcCheckOutTheState			:nrcCheckOutTheState,
			nrcCheckOutNature 			:nrcCheckOutNature,
			nrcCheckOutReason 			:nrcCheckOutReason,
			nrcActualCheckOutTime 		:nrcActualCheckOutTime,
			nrcARefundOfTime 			:nrcARefundOfTime,
			nrcHandler					:nrcHandler,
			nrcRefundTheUserName 		:nrcRefundTheUserName,
			nrcRefundBank 				:nrcRefundBank,
			nrcRefundAccount 			:nrcRefundAccount,
			nrcWaterVolFirst			:nrcWaterVolFirst,
			nrcWaterVolLast				:nrcWaterVolLast,
			nrcWaterDiff				:nrcWaterDiff,
			nrcWaterUnitPrice			:nrcWaterUnitPrice,
			nrcWaterCombined			:nrcWaterCombined,
			nrcElectritVolFirst			:nrcElectritVolFirst,
			nrcElectritVolLast			:nrcElectritVolLast,
			nrcElectritDiff				:nrcElectritDiff,
			nrcElectritUnitPrice		:nrcElectritUnitPrice,
			nrcElectricityCombined		:nrcElectricityCombined,
			nrcGasVolFirst				:nrcGasVolFirst,
			nrcGasVolLast				:nrcGasVolLast,
			nrcGasDiff					:nrcGasDiff,
			nrcGasUnitPrice				:nrcGasUnitPrice,
			nrcGasCombined				:nrcGasCombined,
			
			
			nrcHotWaterVolFirst			:nrcHotWaterVolFirst,
			nrcHotWaterVolLast			:nrcHotWaterVolLast,
			nrcHotWaterDiff				:nrcHotWaterDiff,
			nrcHotWaterUnitPrice		:nrcHotWaterUnitPrice,
			nrcHotWaterCombined			:nrcHotWaterCombined,
			
			nrcHotAirVolFirst			:nrcHotAirVolFirst,
			nrcHotAirVolLast			:nrcHotAirVolLast,
			nrcHotAirDiff				:nrcHotAirDiff,
			nrcHotAirUnitPrice			:nrcHotAirUnitPrice,
			nrcHotAirCombined			:nrcHotAirCombined,
			
			
			nrcBreachOfContract 		:nrcBreachOfContract,
			nrcBreachOfContractNote		:nrcBreachOfContractNote,
			nrcMaintenanceCompensation 	:nrcMaintenanceCompensation,
			nrcHouseDeposit 			:nrcHouseDeposit,
			nrcRemainingRental 			:nrcRemainingRental,
			nrcContentCanalFee 			:nrcContentCanalFee,
			nrcTvCost 					:nrcTvCost,
			nrcDeductTheAmount			:nrcDeductTheAmount,
			nrcRefundTheAmount			:nrcRefundTheAmount,
			nrcPayNote					:yingjiao,
			nrcReturnNote				:yingtui,
			nrcRepairNote				:nrcRepairNote,
			nrcSave						:'暂存',
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			queryTrusteeship(_pageNum[1], 0);
			$('#landlordCheckOutDlg').dialog('close');
			$('#checkLandlordCheckoutDlg').dialog('close');
			hideLoading();
			myTips("操作成功！","success");
		});
	}else if(type==2){//审核通过
		var nrcCheckOutTheState = '退房待复核';
		$.post("../auditNotRentCheckOut.action", {
			nrcId 						:nrcId,
			nrcLandlordId 				:row.hsLandlordId,
			nrcStoreId 					:row.hsId,
			nrcCheckOutTheState			:nrcCheckOutTheState,
			nrcCheckOutNature			:nrcCheckOutNature,
			nrcOperationRecords			:JSON.stringify(operationRecords),
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			queryTrusteeship(_pageNum[1], 0);
			$('#landlordCheckOutDlg').dialog('close');
			$('#checkLandlordCheckoutDlg').dialog('close');
			hideLoading();
			myTips("操作成功！","success");
		});
	}else if(type==3){//审核不通过
		var nrcCheckOutTheState = '正办理退房';
		$.post("../auditNotRentCheckOut.action", {
			nrcId 						:nrcId,
			nrcLandlordId 				:row.hsLandlordId,
			nrcStoreId 					:row.hsId,
			nrcCheckOutTheState			:nrcCheckOutTheState,
			nrcCheckOutNature			:nrcCheckOutNature,
			nrcOperationRecords			:JSON.stringify(operationRecords),
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			queryTrusteeship(_pageNum[1], 0);
			$('#landlordCheckOutDlg').dialog('close');
			$('#checkLandlordCheckoutDlg').dialog('close');
			hideLoading();
			myTips("操作成功！","success");	
		});
	}else if(type==4){//复核通过
		var nrcCheckOutTheState = '退房待出账';
		if($('#landlordFinancialBankNums').val()==''){
			myTips("请选择一个结算账户！","error");
			hideLoading();
			return;
		}
		$.post("../reviewNotRentCheckOut.action", {
			nrcId 						:nrcId,
			nrcLandlordId 				:row.hsLandlordId,
			nrcStoreId 					:row.hsId,
			nrcCheckOutTheState			:nrcCheckOutTheState,
			nrcCheckOutNature			:nrcCheckOutNature,
			nrcFinancialAccountTable	:nrcFinancialAccountTable,
			nrcPayType					:nrcPayType,
			nrcOperationRecords			:JSON.stringify(operationRecords),
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			queryTrusteeship(_pageNum[1], 0);
			$('#landlordCheckOutDlg').dialog('close');
			$('#checkLandlordCheckoutDlg').dialog('close');
			hideLoading();
			myTips("操作成功！","success");	
		});
	}else if(type==5){//出账
		var nrcCheckOutTheState = '退房完成';
		var row2 = $('#financialTable').datagrid('getRows');
		var jsonStrArry =  JSON.stringify(row2);
		$.post("../reviewNotRentCheckOut.action", {
			nrcId 						:nrcId,
			nrcLandlordId 				:row.hsLandlordId,
			nrcStoreId 					:row.hsId,
			nrcCheckOutTheState			:nrcCheckOutTheState,
			nrcCheckOutNature			:nrcCheckOutNature,
			nrcOperationRecords			:JSON.stringify(operationRecords),
			jsonArray 					:jsonStrArry
		}, function(data) {
			hideLoading();
			if(data.code<0){
				myTips(data.msg,"error");
				return;
			}
			if (row2.length > 0) {
				savePrint2();
			}
			queryTrusteeship(_pageNum[1], 0);
			$('#financialDlg').dialog('close');
			$('#landlordCheckOutDlg').dialog('close');
			myTips("退房完成！","success");	
		});
	}else if(type==6){//恢复正办理退房
		var nrcCheckOutTheState = '正办理退房';
		operationRecords = {};
		operationRecords.time = getNowFormatDate();
		operationRecords.operator = _loginUserName;
		operationRecords.operate = '恢复为正办理退房';
		operationRecords.result = '';
		operationRecords.remarks = '';
		$.post("../auditNotRentCheckOut.action", {
			nrcId 						:nrcId,
			nrcLandlordId 				:row.hsLandlordId,
			nrcStoreId 					:row.hsId,
			nrcCheckOutTheState			:nrcCheckOutTheState,
			nrcCheckOutNature			:nrcCheckOutNature,
			nrcOperationRecords			:JSON.stringify(operationRecords),
		}, function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			queryTrusteeship(_pageNum[1], 0);
			$('#landlordCheckOutDlg').dialog('close');
			hideLoading();
			myTips("操作成功！","success");	
		});
	}
}
//取消业主退房
function revokeLandlordCheckOut(){
	$.messager.confirm("操作提示", "确定取消此业主退房吗？", function(data) {
		if (data) {
			var row = $('#landlordCheckOutDg').datagrid('getSelected');
			$.post("../deleteNotRentCheckOut.action", {
				nrcId:row.nrcId,
				hsId:row.hsId,
				houseCoding:row.hsHouseId,
			}, function(data) {
				if(data.code<0){
					myTips(data.msg,"error");
					hideLoading();
					return;
				}
				myTips("取消退房成功！","success");
				queryTrusteeship(_pageNum[1], 0);
				$('#landlordCheckOutDlg').dialog('close');
			});
		}else{
			return;
		}
	});
}


function doPrint(){
	var printArray = '';
	$('#renterCheckOutDlg .rentPrint span[rent-print]').each(function(){
		printArray += $(this).attr('rent-print') + ':"' + $(this).html() + '",';
	});
    printArray = '{' + printArray.replace(/[\r\n]/g,"") + '}';
	parent.doPrintInExe(printArray,3);
}
function savePrint(){
	var json = '';
	$('#renterCheckOutDlg .rentPrint span[rent-print]').each(function(){
		json += $(this).attr('rent-print') + ':"' + $(this).html() + '",';
	});
	json = '{' + json.replace(/[\r\n]/g,"") + '}';
	var row = $('#renterCheckOutDg').datagrid('getSelected');
	var jhpHouseId = row.hrHouseId;
	var jhpHouse4storeId = row.hrHouse4storeId;
	var jhpHouse4rentId = row.hrId;
	var jhpRenterId = row.hrRenterId;
	var jhpLandlordId = row.hrLandlordId;
	
	$.post("../insertHistoryPrint.action",{
		jhpJson 			: json,
		jhpType 			: "租客退房审批",
		jhpTitle			: getNowFormatDate()+" 租客退房出账打印审批单",
		jhpHouse4rentId		: jhpHouse4rentId,
		jhpHouse4storeId	: jhpHouse4storeId,
		jhpHouseId			: jhpHouseId,
		jhpLandlordId		: jhpLandlordId,
		jhpRenterId			: jhpRenterId,
		jhpUserId			: _loginUserId,
		jhpSpecialNumber	: $('.rcoNumber').html()
	}, function(data) {
		if(data.code<0){
			myTips(data.msg, 'error');
		}
	});	
}
function doPrint2(){
	var printArray = '';
	$('#landlordCheckOutDlg .landPrint span[land-print]').each(function(){
		printArray += $(this).attr('land-print') + ':"' + $(this).html() + '",';
	});
	printArray = '{' + printArray.replace(/[\r\n]/g,"") + '}';
	parent.doPrintInExe(printArray,4);
}
function savePrint2(){
	var json = '';
	$('#landlordCheckOutDlg .landPrint span[land-print]').each(function(){
		json += $(this).attr('land-print') + ':"' + $(this).html() + '",';
	});
	json = '{' + json.replace(/[\r\n]/g,"") + '}';
	var row = $('#landlordCheckOutDg').datagrid('getSelected');
	var jhpHouseId = row.hsHouseId;
	var jhpHouse4storeId = row.hsId;
	var jhpLandlordId = row.hsLandlordId;
	
	$.post("../insertHistoryPrint.action",{
		jhpJson 			: json,
		jhpType 			: "业主退房审批",
		jhpTitle			: getNowFormatDate()+" 业主退房出账打印审批单",
		jhpHouse4storeId	: jhpHouse4storeId,
		jhpHouseId			: jhpHouseId,
		jhpLandlordId		: jhpLandlordId,
		jhpUserId			: _loginUserId,
	}, function(data) {
		if(data.code<0){
			myTips(data.msg, 'error');
		}
	});	
}
function rent_contract_over(v){
	$(v).css("borderColor","#336699");
}

function rent_contract_out(v){
	$(v).css("borderColor","#CCCCCC");
}
//租客 即将到期合约数据
function rent_contract_click(v){
	$('#rent_contract_15').css("backgroundColor","white");
	$('#rent_contract_15').css("color","#336699");
	$('#rent_contract_15').attr("divflag", "0");
	
	$('#rent_contract_30').css("backgroundColor","white");
	$('#rent_contract_30').css("color","#336699");
	$('#rent_contract_30').attr("divflag", "0");
	
	$('#rent_contract_60').css("backgroundColor","white");
	$('#rent_contract_60').css("color","#336699");
	$('#rent_contract_60').attr("divflag", "0");
	
	$(v).css("backgroundColor","#336699");
	$(v).css("color","white");
	$(v).attr("divflag", "1");
	
	if(v.id==='rent_contract_15'){
		queryRentContract(1,0);//15天
	}
	if(v.id==='rent_contract_30'){
		queryRentContract(1,0);
	}
	if(v.id==='rent_contract_60'){
		queryRentContract(1,0);
	}
}
function proprietor_contract_over(v){
	$(v).css("borderColor","#336699");
}

function proprietor_contract_out(v){
	$(v).css("borderColor","#CCCCCC");
}

// 业主 即将到期合约数据
function proprietor_contract_click(v){
	$('#proprietor_contract_15').css("backgroundColor","white");
	$('#proprietor_contract_15').css("color","#336699");
	$('#proprietor_contract_15').attr("divflag", "0");
	
	$('#proprietor_contract_30').css("backgroundColor","white");
	$('#proprietor_contract_30').css("color","#336699");
	$('#proprietor_contract_30').attr("divflag", "0");
	
	$('#proprietor_contract_60').css("backgroundColor","white");
	$('#proprietor_contract_60').css("color","#336699");
	$('#proprietor_contract_60').attr("divflag", "0");
	
	$(v).css("backgroundColor","#336699");
	$(v).css("color","white");
	$(v).attr("divflag", "1");
	
	if(v.id==='proprietor_contract_15'){
		queryLandLordContract(1,0);//15天
	}
	if(v.id==='proprietor_contract_30'){
		queryLandLordContract(1,0);
	}
	if(v.id==='proprietor_contract_60'){
		queryLandLordContract(1,0);
	}
}

//分页统计总条数
function getrentContractPageCount(page){
	var pageSize = 5;
	var dateType = 15;
	if($('#rent_contract_15').attr("divflag")==1){
		dateType = 15;
	}
	if($('#rent_contract_30').attr("divflag")==1){
		dateType = 30;
	}
	if($('#rent_contract_60').attr("divflag")==1){
		dateType = 60;
	}
	$.post("../queryExpiredRenterCont.action", {
		dateType : dateType
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"rentContract",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"rentContract",0);
		}
	});
}

//查询租客即将到期
function queryRentContract(page,type){
	var startNum = (parseInt(page) - 1) * 5;
	var endNum = 5;
	var dateType = 15;
	if($('#rent_contract_15').attr("divflag")==1){
		dateType = 15;
	}
	if($('#rent_contract_30').attr("divflag")==1){
		dateType = 30;
	}
	if($('#rent_contract_60').attr("divflag")==1){
		dateType = 60;
	}
	$.post("../queryExpiredRenterCont.action", {
		startNum : startNum,
		endNum : endNum,
		dateType : dateType
	}, function(data) {
		if (data.code<0) {
			//sourcePage(0, 0, 2);
			$('#rentContractDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryRentContract","rentContract");
			}else{
				notCountPage(page, 0 ,"queryRentContract","rentContract");
			}
		} else {
			data=data.body;
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 2);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryRentContract","rentContract");
			}else{
				notCountPage(page, 1 , "queryRentContract","rentContract");
			}
			$("#rentContractDg").datagrid("loadData",data);
		}
	}, "json");
}
//查询业主即将到期
function queryLandLordContract(page,type){
	var startNum = (parseInt(page) - 1) * 5;
	var endNum = 5;
	var dateType = 15;
	if($('#proprietor_contract_15').attr("divflag")==1){
		dateType = 15;
	}
	if($('#proprietor_contract_30').attr("divflag")==1){
		dateType = 30;
	}
	if($('#proprietor_contract_60').attr("divflag")==1){
		dateType = 60;
	}
	
	$.post("../queryExpiredLandlordCont.action", {
		startNum : startNum,
		endNum : endNum,
		dateType : dateType
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 3);
			$('#landLordContractDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 3);
			}
			$("#landLordContractDg").datagrid("loadData",data);	
		}
	}, "json");
}
//租客恢复为正办理退房
function recoveryRenterCheckOut(){
	var row = $('#renterCheckOutDg').datagrid('getSelected');
	//操作记录
	var operationRecords = new Object();
	operationRecords.time = getNowFormatDate();
	operationRecords.operator = _loginUserName;
	operationRecords.operate = '恢复为正办理退房';
	operationRecords.result = '';
	operationRecords.remarks = '';
	showLoading();
	$.post("../recoveryHaveRentCheckOut.action", {
		rcoId					: row.rcoId,
		hrId					: row.hrId,
		rcoOperationRecords		: JSON.stringify(operationRecords),
	}, function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		querySourceInfo(1,0);
		$('#renterCheckOutDlg').dialog('close');
		myTips("恢复成功！","success");
	});
}
//业主恢复为正办理退房
function recoveryLandlordCheckOut(){
	var row = $('#landLordContractDg').datagrid('getSelected');
	//操作记录
	var operationRecords = new Object();
	operationRecords.time = getNowFormatDate();
	operationRecords.operator = _loginUserName;
	operationRecords.operate = '恢复为正办理退房';
	operationRecords.result = '';
	operationRecords.remarks = '';
	showLoading();
	$.post("../updateNotRentCheckOut.action", {
		nrcId					: row.nrcId,
		hsId					: row.hsId,
		rcoOperationRecords		: JSON.stringify(operationRecords),
	}, function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		queryTrusteeship(1,0);
		$('#landlordCheckOutDlg').dialog('close');
		myTips("恢复成功！","success");
	});
}

//发送信息
//function sendRepMsg(row,rows){
//	console.log("a");
//	console.log(	$('#renterCheckOutDg').datagrid('getSelected').popTelephone);
//	console.log("row:"+row.detailAddress);
//	for(i in rows){
//		console.log(i.repairUserId+
//				i.repTypeRp
//				);
//	}
//	console.log("rows:"+rows);
//}