
function energy1(){
	//控制非选中能源项隐藏
	var chargingPlan=parent._chargingPlan;
	for(var i in chargingPlan){
		if(!chargingPlan[i]["state"]){
			$("."+i+" input").val(0);
			$("."+i+" td span").html(0);
			$("."+i+" input").removeAttr("require");
			$("."+i).hide();
		}
	}
}
//打开租客退房窗口
function renterCheckoutDlg(){
	$('#renterCheckOutDlg').dialog({
		title : '租客退房',
		top : getTop(660),
		left : getLeft(850),
		width : 850,
		height : 670,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#renterCheckOutDlg [clear="clear"]').val('');
			$('#renterCheckOutDlg [clear="clear"]').html('');
			$('#renterCheckOutDlg [choose="choose"]').val('');
			$('#renterCheckOutDlg [require="require"]').css('border', '1px solid #a9a9a9');
		}
	});
	
	
	var row = $('#renterCheckOutDg').datagrid('getSelected');
	
	//查退房表数据并展示到相应表格中
	$.post("../selectInfoHaveRentCheckOut.action", {
		rcoRentId: row.hrId
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		data = data.body[0];
		for(var i in data){
			$("#renterCheckOutDlg span#renterCheckout_"+i).html(data[i]);
			$("#renterCheckOutDlg input#renterCheckout_"+i).val(data[i]);
			$("#renterCheckOutDlg select#renterCheckout_"+i).val(data[i]);
			$("#renterCheckOutDlg textarea#renterCheckout_"+i).val(data[i]);
			$("#renterCheckOutDlg span."+i).html(data[i]);
			$("#renterCheckOutDlg textarea."+i).val(data[i]);
		}
		//导入已租房信息
		for(var i in row){
			if(row[i]==null){
				row[i]='';
			}
			$("#renterCheckOutDlg span."+i).html(row[i]);
		}console.log(row)
		//经办人
		$('#handlerShowUserInfo').val(data.rcoHandlerName);
		//计算应退款/应收款
		calActualRefund(data);
		//计算出账申请单上的汇总金额
		calTotalRentPrint(data);
		//公司收付款账号
		if(data.rcoCheckoutAccount!=null && data.rcoCheckoutAccount!=""){
			$.post("../selectNamePublic.action", {
				faId:data.rcoCheckoutAccount,
			}, function(accountData) {
				for(var i in _acountType){
					if(_acountType[i]==accountData.body[0].faPaymentType){
						$("#renterFinancialWay").val(i);
						$("#renter2FinancialWay").val(i);
					}	
				}
				changeWay("renter",data.rcoCheckoutAccount);
				changeWay("renter2",data.rcoCheckoutAccount);
			});
		}
		//如果“未办理手续”,租客账号无需填写,直接禁止输入,有内容的不能修改!
		changeProcedures();
		//维修表
		console.log("dsff==--"+data.rcoRepairNote);
		if (data.rcoRepairNote != undefined && data.rcoRepairNote != '') {
			$('#repairDg').datagrid('loadData', JSON.parse(data.rcoRepairNote.getRealJsonStr()));
		} else {
			$('#repairDg').datagrid('loadData', []);
		}
		//只有正办理退房时才去执行的操作
		if (data.rcoCheckOutTheState == '正办理退房') {
			//欠结款、预存款只显示一个
			if (row.hrBase == 0) {
				$("#qianjie").show();
				$("#yucun").hide();
				$("#renterCheckout_rcoOtherChargesInTotal").val(0);//欠结款
				$("#renterCheckout_rcoLicenceFee").val(0);//预存款
			} else if (row.hrBase > 0) {
				$("#qianjie").show();
				$("#yucun").hide();
				$("#renterCheckout_rcoOtherChargesInTotal").val(row.hrBase);
				$("#renterCheckout_rcoLicenceFee").val(0);
			} else {
				$("#qianjie").hide();
				$("#yucun").show();
				$("#renterCheckout_rcoOtherChargesInTotal").val(0);
				$("#renterCheckout_rcoLicenceFee").val(Math.abs(row.hrBase));
			}
			//计算超期天数
			checkoutRenterDay();
			//水电抄表，每次去未租查最新读数
			$.post("../selectMeterReadingScheme.action", {
				hrId : row.hrId,
			}, function(data1) {
				if (data1.code < 0) {
					myTips(data1.msg, 'error');
					return;
				}
				data1 = data1.body;
				//有抄表记录取抄表记录的值，没抄表记录默认填0
				//只填上次读数和计费方案
				if(data1[0].hsMeterReadingRecord != null && data1[0].hsMeterReadingRecord != '' ){
					var meterReadingRecord = eval('(' + data1[0].hsMeterReadingRecord.getRealJsonStr() + ')');//读数记录
					var waterLast = meterReadingRecord.water.lastReading;//上次水读数
					var electritLast = meterReadingRecord.electrit.lastReading;//上次电读数
					var gasLast = meterReadingRecord.gas.lastReading;//上次气读数

					var hotwaterLast = 0;//上次热水读数
					if(meterReadingRecord.hotwater != undefined){
						hotwaterLast = meterReadingRecord.hotwater.lastReading;//上次热水读数
					}

					var hotairLast = 0;//上次暖气读数
					if(meterReadingRecord.hotwater != undefined) {
						hotairLast = meterReadingRecord.hotair.lastReading;//上次暖气读数
					}

					$("#renterCheckout_rcoLastWaterBase").val(waterLast);
					$("#renterCheckout_rcoWaterPlan").html(data1[0].water);
					$("#renterCheckout_rcoLastElectricityBase").val(electritLast);
					$("#renterCheckout_rcoElectricityPlan").html(data1[0].electrit);
					$("#renterCheckout_rcoGasBaseLast").val(gasLast);
					$("#renterCheckout_rcoGasPlan").html(data1[0].gas);
					$("#renterCheckout_rcoHotWaterBaseLast").val(hotwaterLast);
					$("#renterCheckout_rcoHotWaterPlan").html(data1[0].hotWater);
					$("#renterCheckout_rcoHotAirBaseLast").val(hotairLast);
					$("#renterCheckout_rcoHotAirPlan").html(data1[0].hotAir);
				}else{
					$("#renterCheckout_rcoLastWaterBase").val(0);
					$("#renterCheckout_rcoWaterPlan").html(data1[0].water);
					$("#renterCheckout_rcoLastElectricityBase").val(0);
					$("#renterCheckout_rcoElectricityPlan").html(data1[0].electrit);
					$("#renterCheckout_rcoGasBaseLast").val(0);
					$("#renterCheckout_rcoGasPlan").html(data1[0].gas);
					$("#renterCheckout_rcoHotWaterBaseLast").val(0);
					$("#renterCheckout_rcoHotWaterPlan").html(data1[0].hotWater);
					$("#renterCheckout_rcoHotAirBaseLast").val(0);
					$("#renterCheckout_rcoHotAirPlan").html(data1[0].hotAir);
				}
				//计算水电读数差值
				calwegdiff();
			});
		}
		//操作记录
		var operatorArray = [];
		if (data.rcoOperationRecords != null) {
			operatorArray = JSON.parse('[' + data.rcoOperationRecords.getRealJsonStr() + ']');
			for (var i=0;i<operatorArray.length;i++) {
				if (operatorArray[i].remarks != '') {
					operatorArray[i].content = operatorArray[i].operate + operatorArray[i].result + ',备注：' + operatorArray[i].remarks;
				} else {
					operatorArray[i].content = operatorArray[i].operate + operatorArray[i].result;
				}
				
			}
		}
		$(".renterOperatorDg").datagrid();
		$(".renterOperatorDg").datagrid('loadData', operatorArray);
	});
	//按钮的显示和隐藏
	if(row.hrState=='正办理退房'){
		//所有框不允许修改
		$('[data-read="1"]').attr("disabled",true);
		gotoStep('renterCheckOut', 1);
	}else if(row.hrState=='退房待审核'){
		$(".renterCheckoutOne").show();//审核
		$(".renterCheckoutTwo").hide();//复核
		$(".renterRefundAccount").hide();//公司收付款账户
		gotoStep('renterCheckOut', 3);
	}else if(row.hrState=='退房待复核'){
		$(".renterCheckoutOne").hide();//审核
		$(".renterCheckoutTwo").show();//复核
		$(".renterRefundAccount").show();//公司收付款账户
		gotoStep('renterCheckOut', 3);
	}else if(row.hrState=='退房待出账'){
		$(".recoveryRenterCheckOut").show();//恢复为正办理退房
		$(".renterCheckoutPrint").show();//打印出账申请单
		$(".renterCheckoutFinancial").show();//出账
		gotoStep('renterCheckOut', 4);
	}else if(row.hrState=='退房完成'){
		$(".recoveryRenterCheckOut").hide();//恢复为正办理退房
		$(".renterCheckoutPrint").show();//打印出账申请单
		$(".renterCheckoutFinancial").hide();//出账
		gotoStep('renterCheckOut', 4);
	}
	
	$('#renterCheckOutDlg').dialog('open');
	energy1();
}

//下一步
function nextStep(){
	if (!validateStep('renterCheckOut', 2)) {
		return;
	}
	//维保记录
	var rows = $('#repairDg').datagrid('getRows');
	$('#repairDg').datagrid('loadData', rows);
	if ($('#renterCheckout_rcoSave').val() != '暂存') {
		reflashRenter();
	}
}


//计算租客超期天数
function checkoutRenterDay(){
	$('.rcoCheckOutTime').html($('#renterCheckout_rcoCheckOutTime').html());
	$('.rcoCheckOutActualTime').html($('#renterCheckout_rcoCheckOutActualTime').val());
	if($('#renterCheckout_rcoCheckOutTime').html()==''||$('#renterCheckout_rcoCheckOutActualTime').val()==''){
		$("#renterCheckout_rcoDaysOverdue").html('');
		$('.rcoDaysOverdue').html('');
		return;
	}
	var beforeTime = new Date($('#renterCheckout_rcoCheckOutTime').html().replace(/-/g, "/"));
	var afterTime = new Date($('#renterCheckout_rcoCheckOutActualTime').val().replace(/-/g, "/"));
	
	var days = afterTime.getTime() - beforeTime.getTime();
	var subTime = parseInt(days / (1000 * 60 * 60 * 24));
	if(subTime>0){
		$('#renterCheckout_rcoDaysOverdue').html(subTime);
		$('.rcoDaysOverdue').html(subTime);
	}else{
		$("#renterCheckout_rcoDaysOverdue").html(0);
		$(".rcoDaysOverdue").html(0);
	}
	clearJieSuan();
}

// 计算水电、超期管理费、超期服务费、租金、维保费
function calVarietyCharge(){
	var row = $('#renterCheckOutDg').datagrid('getSelected');
	
	energy1();
	
	//计算水电
	var waterLast = $("#renterCheckout_rcoLastWaterBase").val();//上次水读数
	var waterThis = $("#renterCheckout_rcoWaterBase").val();//本次水读数
	var electritLast = $("#renterCheckout_rcoLastElectricityBase").val();//上次电读数
	var electritThis = $("#renterCheckout_rcoElectricityBase").val();//本次电读数
	var gasLast = $("#renterCheckout_rcoGasBaseLast").val();//上次气读数
	var gasThis = $("#renterCheckout_rcoGasBaseNumber").val();//本次气读数
	var hotwaterLast = $("#renterCheckout_rcoHotWaterBaseLast").val();//上次热水读数
	var hotwaterThis = $("#renterCheckout_rcoHotWaterBaseNumber").val();//本次热水读数
	var hotairLast = $("#renterCheckout_rcoHotAirBaseLast").val();//上次暖气读数
	var hotairThis = $("#renterCheckout_rcoHotAirBaseNumber").val();//本次暖气读数
	
	var waterNum = $("#renterCheckout_rcoWaterPrice").html();//水差额
	var electritNum = $("#renterCheckout_rcoElectricityPrice").html();//电差额
	var gasNum = $("#renterCheckout_rcoGasPrice").html();//气差额
	var hotwaterNum = $("#renterCheckout_rcoHotWaterPrice").html();//热水差额
	var hotairNum = $("#renterCheckout_rcoHotAirPrice").html();//暖气差额
	
	var waterMoney = 0;
	var electritMoney = 0;
	var gasMoney = 0;
	var hotwaterMoney = 0;
	var hotairMoney = 0;
	
	if (waterLast === '' ||
		waterThis === '' ||
		electritLast === '' ||
		electritThis === '' ||
		gasLast === '' ||
		gasThis === '' ||
		hotwaterLast === '' ||
		hotwaterThis === '' ||
		hotairThis === '' ||
		hotwaterThis === '' ||
		
		waterNum === '' ||
		electritNum === '' ||
		gasNum === '' ||
		hotwaterNum === '' ||
		hotairNum === '' ||
		
		isNaN(waterLast) ||
		isNaN(waterThis) ||
		isNaN(electritLast) ||
		isNaN(electritThis) ||
		isNaN(gasLast) ||
		isNaN(gasThis) ||
		
		isNaN(hotwaterLast) ||
		isNaN(hotwaterThis) ||
		isNaN(hotairLast) ||
		isNaN(hotairThis) ||
		
		isNaN(hotwaterNum) ||
		isNaN(hotairNum) ||
		isNaN(waterNum) ||
		isNaN(electritNum) ||
		isNaN(gasNum)) {
		myTips('抄表读数未填完整', 'error');
		$("#renterCheckout_rcoWaterCombined").val(0.00);
		$("#renterCheckout_rcoElectricityCombined").val(0.00);
		$("#renterCheckout_rcoGasCombined").val(0.00);
		$("#renterCheckout_rcoHotWaterCombined").val(0.00);
		$("#renterCheckout_rcoHotAirCombined").val(0.00);
		return;
	}
	//查计费方案并计算水电费
	$.post("../selectMeterReadingScheme.action", {
		hrId : row.hrId,
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, 'error');
		}
		data = data.body[0];
		if (waterNum > 0) {
			waterMoney = powerCalculate(data.waterPlan!=''?data.waterPlan.getRealJsonStr():'',waterNum);//水费
		} else {
			waterMoney = -powerCalculate(data.waterPlan!=''?data.waterPlan.getRealJsonStr():'',-waterNum);//水费
		}
		if (electritNum > 0) {
			electritMoney = powerCalculate(data.electritPlan!=''?data.electritPlan.getRealJsonStr():'',electritNum);//电费
		} else {
			electritMoney = -powerCalculate(data.electritPlan!=''?data.electritPlan.getRealJsonStr():'',-electritNum);//电费
		}
		if (gasNum > 0) {
			gasMoney = powerCalculate(data.gasPlan!=''?data.gasPlan.getRealJsonStr():'',gasNum);//气费
		} else {
			gasMoney = -powerCalculate(data.gasPlan!=''?data.gasPlan.getRealJsonStr():'',-gasNum);//气费
		}
		if (hotwaterNum > 0) {
			hotwaterMoney = powerCalculate(data.hotWaterPlan!=''?data.hotWaterPlan.getRealJsonStr():'',hotwaterNum);//热水费
		} else {
			hotwaterMoney = -powerCalculate(data.hotWaterPlan!=''?data.hotWaterPlan.getRealJsonStr():'',-hotwaterNum);//热水费
		}
		if (hotairNum > 0) {
			hotairMoney = powerCalculate(data.hotAirPlan!=''?data.hotAirPlan.getRealJsonStr():'',hotairNum);//暖气费
		} else {
			hotairMoney = -powerCalculate(data.hotAirPlan!=''?data.hotAirPlan.getRealJsonStr():'',-hotairNum);//暖气费
		}
		
		$("#renterCheckout_rcoWaterCombined").val(waterMoney);
		$("#renterCheckout_rcoSysWater").val(waterMoney);
		$("#renterCheckout_rcoElectricityCombined").val(electritMoney);
		$("#renterCheckout_rcoSysElectricity").val(electritMoney);
		$("#renterCheckout_rcoGasCombined").val(gasMoney);
		$("#renterCheckout_rcoSysGas").val(gasMoney);
		$("#renterCheckout_rcoHotWaterCombined").val(hotwaterMoney);
		$("#renterCheckout_rcoSysHotWater").val(hotwaterMoney);
		$("#renterCheckout_rcoHotAirCombined").val(hotairMoney);
		$("#renterCheckout_rcoSysHotAir	").val(hotairMoney);
		
	});
	//计算租金
	var rcoCheckOutActualTime = $("#renterCheckout_rcoCheckOutActualTime").val();//实际退房时间
	$.post('../basicData.action', {
		rcoRentId: row.hrId,
		rcoCheckOutActualTime:rcoCheckOutActualTime,
		rcoJrrEndTime:row.jrrEndTime,
		rcoJrrMoney:row.jrrMoney
	}, function(data){
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		data = data.body[0];
		$("#renterCheckout_rcoBeyondTheRent").val(data.rcoBeyondTheRent);
	});
	var day = parseInt($('#renterCheckout_rcoDaysOverdue').html());
	//超期管理费
	var rcoPropertyCostsInTotal = day / 30 * row.jrrManageCost;
	$("#renterCheckout_rcoPropertyCostsInTotal").val(rcoPropertyCostsInTotal.toFixed(2));
	//超期服务费
	var rcoServerCost = day / 30 * row.jrrServerCost;
	$("#renterCheckout_rcoServerCost").val(rcoServerCost.toFixed(2));
	//维保费用
	var row2 = $('#repairDg').datagrid('getRows');
	var rcoRepairDamages = 0;
	for (var i in row2) {
		rcoRepairDamages = mySum(rcoRepairDamages, row2[i].repTollRp);
	}
	$("#renterCheckout_rcoRepairDamages").val(rcoRepairDamages);
}
//计算水电读数差值
function calwegdiff(){
	//水
	var wt = $('#renterCheckout_rcoWaterBase').val();
	var wl = $('#renterCheckout_rcoLastWaterBase').val();
	if (wt != '' && wl != '') {
		$('#renterCheckout_rcoWaterPrice').html(accSub(wt,wl));
	} else {
		$('#renterCheckout_rcoWaterPrice').html('');
	}
	//电
	var et = $('#renterCheckout_rcoElectricityBase').val();
	var el = $('#renterCheckout_rcoLastElectricityBase').val();
	if (et != '' && el != '') {
		$('#renterCheckout_rcoElectricityPrice').html(accSub(et,el));
	} else {
		$('#renterCheckout_rcoElectricityPrice').html('');
	}
	//气
	var gt = $('#renterCheckout_rcoGasBaseNumber').val();
	var gl = $('#renterCheckout_rcoGasBaseLast').val();
	if (gt != '' && gl != '') {
		$('#renterCheckout_rcoGasPrice').html(accSub(gt,gl));
	} else {
		$('#renterCheckout_rcoGasPrice').html('');
	}
	//热水
	var hwt = $('#renterCheckout_rcoHotWaterBaseNumber').val();
	var hwl = $('#renterCheckout_rcoHotWaterBaseLast').val();
	if (hwt != '' && hwl != '') {
		$('#renterCheckout_rcoHotWaterPrice').html(accSub(hwt,hwl));
	} else {
		$('#renterCheckout_rcoHotWaterPrice').html('');
	}
	//暖气
	var hat = $('#renterCheckout_rcoHotAirBaseNumber').val();
	var hal = $('#renterCheckout_rcoHotAirBaseLast').val();
	if (hat != '' && hal != '') {
		$('#renterCheckout_rcoHotAirPrice').html(accSub(hat,hal));
	} else {
		$('#renterCheckout_rcoHotAirPrice').html('');
	}
}
//计算总费用并生成明细
function calTotalCharge(){
	var shuibenci = $('#renterCheckout_rcoWaterBase').val();
	var shuishangci = $('#renterCheckout_rcoLastWaterBase').val();
	var shuichazhi = $('#renterCheckout_rcoWaterPrice').html();
	var dianbenci = $('#renterCheckout_rcoElectricityBase').val();
	var dianshangci = $('#renterCheckout_rcoLastElectricityBase').val();
	var dianchazhi = $('#renterCheckout_rcoElectricityPrice').html();
	var qibenci = $('#renterCheckout_rcoGasBaseNumber').val();
	var qishangci = $('#renterCheckout_rcoGasBaseLast').val();
	var qichazhi = $('#renterCheckout_rcoGasPrice').html();
	var hotwaterbenci = $('#renterCheckout_rcoHotWaterBaseNumber').val();
	var hotwatershangci = $('#renterCheckout_rcoHotWaterBaseLast').val();
	var hotwaterchazhi = $('#renterCheckout_rcoHotWaterPrice').html();
	var hotairbenci = $('#renterCheckout_rcoHotAirBaseNumber').val();
	var hotairshangci = $('#renterCheckout_rcoHotAirBaseLast').val();
	var hotairchazhi = $('#renterCheckout_rcoHotAirPrice').html();

	var shuifei = $('#renterCheckout_rcoWaterCombined').val();//水费
	var dianfei = $('#renterCheckout_rcoElectricityCombined').val();//电费
	var qifei = $('#renterCheckout_rcoGasCombined').val();//气费
	var hotwatercost = $('#renterCheckout_rcoHotWaterCombined').val();//热水费
	var hotaircost = $('#renterCheckout_rcoHotAirCombined').val();//暖气费
	
	var qianjiekuan = $('#renterCheckout_rcoOtherChargesInTotal').val();//欠结款
	var guanlifei = $('#renterCheckout_rcoPropertyCostsInTotal').val();//物管费
	var fuwufei = $('#renterCheckout_rcoServerCost').val();//服务费
	var wangluofei = $('#renterCheckout_rcoWifiCost').val();//网络费
	var dianshifei = $('#renterCheckout_rcoTvCost').val();//电视费
	var chaoqifangzu = $('#renterCheckout_rcoBeyondTheRent').val();//超期租金
	var weibaofei = $('#renterCheckout_rcoRepairDamages').val();//维保费
	var weiyuejin = $('#renterCheckout_rcoBreachOfContract').val();//违约金
	var weiyuemingxi = $('#renterCheckout_rcoBreachDetail').val();//违约明细
	var fangwuyajin = $('#renterCheckout_rcoReturnDeposit').val();//房屋押金
	var shuidianyajin = $('#renterCheckout_rcoReturnPowerDeposit').val();//水电押金
	var menkayajin = $('#renterCheckout_rcoReturnDoorDeposit').val();//门卡押金
	var qitayajin = $('#renterCheckout_rcoReturnOtherDeposit').val();//其它押金
	var yucunkuan = $('#renterCheckout_rcoLicenceFee').val();//预存款
	var totalCharge = 0;//总应收
	var totalReturn = 0;//总应退
	var yingjiao = "";//应收明细
	var yingtui = "";//应退明细
	
	if (shuifei != '' && shuifei > 0) {
		totalCharge = mySum(totalCharge, shuifei);
		yingjiao += '水费：' + shuibenci + ' - ' + shuishangci + ' = ' + shuichazhi + '立方 * 计费方案 = ' + shuifei + '元；\n';
		yingjiao += '\n';
	} else if (shuifei != '' && shuifei < 0) {
		shuifei = Math.abs(shuifei);
		totalReturn = mySum(totalReturn, shuifei);
		yingtui += '水费：' + shuibenci + ' - ' + shuishangci + ' = ' + shuichazhi + '立方 * 计费方案 = ' + shuifei + '元；\n';
		yingtui += '\n';
	}
	if (dianfei != '' && dianfei > 0) {
		totalCharge = mySum(totalCharge, dianfei);
		yingjiao += '电费：' + dianbenci + ' - ' + dianshangci + ' = ' + dianchazhi + '度 * 计费方案 = ' + dianfei + '元；\n';
		yingjiao += '\n';
	} else if (dianfei != '' && dianfei < 0) {
		dianfei = Math.abs(dianfei);
		totalReturn = mySum(totalReturn, dianfei);
		yingtui += '电费：' + dianbenci + ' - ' + dianshangci + ' = ' + dianchazhi + '度 * 计费方案 = ' + dianfei + '元；\n';
		yingtui += '\n';
	}
	if (qifei != '' && qifei > 0) {
		totalCharge = mySum(totalCharge, qifei);
		yingjiao += '气费：' + qibenci + ' - ' + qishangci + ' = ' + qichazhi + '立方 * 计费方案 = ' + qifei + '元；\n';
		yingjiao += '\n';
	} else if (qifei != '' && qifei < 0) {
		qifei = Math.abs(qifei);
		totalReturn = mySum(totalReturn, qifei);
		yingtui += '气费：' + qibenci + ' - ' + qishangci + ' = ' + qichazhi + '立方 * 计费方案 = ' + qifei + '元；\n';
		yingtui += '\n';
	}
	if (hotwatercost != '' && hotwatercost > 0) {
		totalCharge = mySum(totalCharge, hotwatercost);
		yingjiao += '热水费：' + hotwaterbenci + ' - ' + hotwatershangci + ' = ' + hotwaterchazhi + '立方 * 计费方案 = ' + hotwatercost + '元；\n';
		yingjiao += '\n';
	} else if (qifei != '' && qifei < 0) {
		hotwatercost = Math.abs(hotwatercost);
		totalReturn = mySum(totalReturn, hotwatercost);
		yingtui += '热水费：' + hotwaterbenci + ' - ' + hotwatershangci + ' = ' + hotwaterchazhi + '立方 * 计费方案 = ' + hotwatercost + '元；\n';
		yingtui += '\n';
	}
	if (hotaircost != '' && hotaircost > 0) {
		totalCharge = mySum(totalCharge, hotaircost);
		yingjiao += '暖气费：' + hotairbenci + ' - ' + hotairshangci + ' = ' + hotairchazhi + '度 * 计费方案 = ' + hotaircost + '元；\n';
		yingjiao += '\n';
	} else if (hotaircost != '' && hotaircost < 0) {
		hotaircost = Math.abs(hotaircost);
		totalReturn = mySum(totalReturn, hotaircost);
		yingtui += '暖气费：' + hotairbenci + ' - ' + hotairshangci + ' = ' + hotairchazhi + '度 * 计费方案 = ' + hotaircost + '元；\n';
		yingtui += '\n';
	}
	if (chaoqifangzu != '' && chaoqifangzu > 0) {
		totalCharge = mySum(totalCharge, chaoqifangzu);
		yingjiao += '租金：' + chaoqifangzu + '元；\n';
		yingjiao += '\n';
	} else if (chaoqifangzu != '' && chaoqifangzu < 0) {
		chaoqifangzu = Math.abs(chaoqifangzu);
		totalReturn = mySum(totalReturn, chaoqifangzu);
		yingtui += '租金：' + chaoqifangzu + '元；\n';
		yingtui += '\n';
	}
	if (guanlifei != '' && guanlifei > 0) {
		totalCharge = mySum(totalCharge, guanlifei);
		yingjiao += '管理费：' + guanlifei + '元；\n';
		yingjiao += '\n';
	} else if (guanlifei != '' && guanlifei < 0) {
		guanlifei = Math.abs(guanlifei);
		totalReturn = mySum(totalReturn, guanlifei);
		yingtui += '管理费：' + guanlifei + '元；\n';
		yingtui += '\n';
	}
	if (fuwufei != '' && fuwufei > 0) {
		totalCharge = mySum(totalCharge, fuwufei);
		yingjiao += '服务费：' + fuwufei + '元；\n';
		yingjiao += '\n';
	} else if (fuwufei != '' && fuwufei < 0) {
		fuwufei = Math.abs(fuwufei);
		totalReturn = mySum(totalReturn, fuwufei);
		yingtui += '服务费：' + fuwufei + '元；\n';
		yingtui += '\n';
	}
	if (wangluofei != '' && wangluofei > 0) {
		totalCharge = mySum(totalCharge, wangluofei);
		yingjiao += '网络费：' + wangluofei + '元；\n';
		yingjiao += '\n';
	} else if (wangluofei != '' && wangluofei < 0) {
		wangluofei = Math.abs(wangluofei);
		totalReturn = mySum(totalReturn, wangluofei);
		yingtui += '网络费：' + wangluofei + '元；\n';
		yingtui += '\n';
	}
	if (dianshifei != '' && dianshifei > 0) {
		totalCharge = mySum(totalCharge, dianshifei);
		yingjiao += '电视费：' + dianshifei + '元；\n';
		yingjiao += '\n';
	} else if (dianshifei != '' && dianshifei < 0) {
		dianshifei = Math.abs(dianshifei);
		totalReturn = mySum(totalReturn, dianshifei);
		yingtui += '电视费：' + dianshifei + '元；\n';
		yingtui += '\n';
	}
	if (weibaofei != '' && weibaofei > 0) {
		totalCharge = mySum(totalCharge, weibaofei);
		yingjiao += '维保费：' + weibaofei + '元；\n';
		yingjiao += '\n';
	} else if (weibaofei != '' && weibaofei < 0) {
		weibaofei = Math.abs(weibaofei);
		totalReturn = mySum(totalReturn, weibaofei);
		yingtui += '维保费：' + weibaofei + '元；\n';
		yingtui += '\n';
	}
	if (weiyuejin != '' && weiyuejin > 0) {
		totalCharge = mySum(totalCharge, weiyuejin);
		yingjiao += '违约金：' + weiyuejin + '元；明细：' + weiyuemingxi + '；\n';
		yingjiao += '\n';
	} else if (weiyuejin != '' && weiyuejin < 0) {
		weiyuejin = Math.abs(weiyuejin);
		totalReturn = mySum(totalReturn, weiyuejin);
		yingtui += '违约金：' + weiyuejin + '元；明细：' + weiyuemingxi + '；\n';
		yingtui += '\n';
	}
	//欠结款只能是应收款
	if (qianjiekuan != 0) {
		qianjiekuan = Math.abs(qianjiekuan);
		totalCharge = mySum(totalCharge, qianjiekuan);
		yingjiao += '欠结款：' + qianjiekuan + '元；\n';
		yingjiao += '\n';
	}
	//预存款、押金只能是应退款
	if (yucunkuan != 0) {
		yucunkuan = Math.abs(yucunkuan);
		totalReturn = mySum(totalReturn, yucunkuan);
		yingtui += '预存款：' + yucunkuan + '元；\n';
		yingtui += '\n';
	}
	if (fangwuyajin != 0) {
		fangwuyajin = Math.abs(fangwuyajin);
		totalReturn = mySum(totalReturn, fangwuyajin);
		yingtui += '房屋押金：' + fangwuyajin + '元；\n';
		yingtui += '\n';
	}
	if (shuidianyajin != 0) {
		shuidianyajin = Math.abs(shuidianyajin);
		totalReturn = mySum(totalReturn, shuidianyajin);
		yingtui += '水电押金：' + shuidianyajin + '元；\n';
		yingtui += '\n';
	}
	if (menkayajin != 0) {
		menkayajin = Math.abs(menkayajin);
		totalReturn = mySum(totalReturn, menkayajin);
		yingtui += '门卡押金：' + menkayajin + '元；\n';
		yingtui += '\n';
	}
	if (qitayajin != 0) {
		qitayajin = Math.abs(qitayajin);
		totalReturn = mySum(totalReturn, qitayajin);
		yingtui += '其他押金：' + qitayajin + '元；\n';
		yingtui += '\n';
	}
	yingjiao = '租客合计应缴费用：' + totalCharge + '元；\n' + '\n' + yingjiao;
	yingtui = '公寓合计应退费用：' + totalReturn + '元；\n' + '\n' + yingtui;
	
	$('#renterCheckout_rcoDeductionCombined').val(totalCharge);
	$('.rcoDeductionCombined').html(totalCharge);
	$('#renterCheckout_rcoPayNote').val(yingjiao);
	
	$('#renterCheckout_rcoTotalShouldBeReturned').val(totalReturn);
	$('.rcoTotalShouldBeReturned').html(totalReturn);
	$('#renterCheckout_rcoReturnNote').val(yingtui);
	
	//返回合计应退
	var jiesuan = mySub(totalReturn, totalCharge);
	return jiesuan;
}
//计算应退款/应收款
function calActualRefund(data){
	var actualRefund = accSub(data.rcoTotalShouldBeReturned, data.rcoDeductionCombined);//应退款 = 应退合计 - 应缴合计
	if (actualRefund >= 0) {
		$('.shijijiesuan').html('应退款：');
		$(".rcoActualReceiptsDiv").hide();
		$('.rcoActualReceipts').val('0');
	} else {
		actualRefund = Math.abs(actualRefund);
		$('.shijijiesuan').html('应收款：');
		$(".rcoActualReceiptsDiv").show();
		$('.rcoActualReceipts').val(data.rcoActualReceipts);
	}
	$('#jiesuan').html(actualRefund);
	$('.actualRefund').html(actualRefund);
	$('.actualRefund2').html(convertCurrency(actualRefund));
}
//计算出账申请单上的汇总金额
function calTotalRentPrint(data){
	var powerAllMoney = 0.00;//能源合计
	var rentAllMoney = 0.00;//租金合计
	var oweAllMoney = 0.00;//违约金和滞纳金合计
	var otherAllMoney = 0.00;//其他扣费合计
	
	powerAllMoney = powerAllMoney.add(data.rcoWaterCombined);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.rcoElectricityCombined);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.rcoGasCombined);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.rcoPropertyCostsInTotal);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.rcoServerCost);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.rcoWifiCost);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.rcoTvCost);
	
	rentAllMoney = rentAllMoney.add(data.rcoRemainingRent);
	rentAllMoney = parseFloat(rentAllMoney);
	rentAllMoney = rentAllMoney.add(data.rcoBeyondTheRent);
	
	oweAllMoney = oweAllMoney.add(data.rcoBreachOfContract);
	oweAllMoney = parseFloat(oweAllMoney);
	oweAllMoney = oweAllMoney.add(data.rcoLateFee);
	
	otherAllMoney = otherAllMoney.add(data.rcoRepairDamages);
	otherAllMoney = parseFloat(otherAllMoney);
	otherAllMoney = otherAllMoney.add(data.rcoOtherChargesInTotal);
	$('.powerAllMoney').html(powerAllMoney);
	$('.rentAllMoney').html(rentAllMoney);
	$('.oweAllMoney').html(oweAllMoney);
	$('.otherAllMoney').html(otherAllMoney);
}
//添加维保
function addRepair() {
	$("#addRepairDlg").dialog({
		title : "添加维保",
		top : getTop(220),
		left : getLeft(370),
		width : 370,
		height : 240,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addRepairDlg [clear="clear"]').val('');
			$('#addRepairDlg [clear="clear"]').html('');
			$('#addRepairDlg [choose="choose"]').val('');
			$('#addRepairDlg [require="require"]').css('border', '1px solid #a9a9a9');
			
		}
	});
	$("#addRepairDlg").dialog('open');
}
//删除维保
function deleteRepair(value, row, index) {
	return "<a href='#' onclick=\"myDeleteRows('"+row.random+"','random','repairDg',0);clearJieSuan();calRepair();\">删除</a>";
}

//添加维保到列表
function addToDataGrid() {
	var row = $('#renterCheckOutDg').datagrid('getSelected');
	var sendMsg =$("#shorMessageRemind").is(':checked');
	
	var checkFlag = 0;
	$('#addRepairDlg').each(function(){
		if ($('#doRepairShowUserInfo').val() == '') {
			$('#doRepairShowUserInfo').css('border-color','red');
			
			checkFlag++;
		} 
		if ($('#repTollRp').val() == '') {
			$('#repTollRp').css('border-color','red');
			
			checkFlag++;
		} 
		if ($('#repEventRp').val() == '') {
			$('#repEventRp').css('border-color','red');
			
			checkFlag++;
		} 
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	
	var dataJson = {};
	dataJson.repHouse4rentId = row.hrId;
	dataJson.repHouse4storeId = row.hrHouse4storeId;
	dataJson.repHouseId = row.hrHouseId;
	dataJson.repResponsibility = '客户付费';
	//dataJson.repEventRp =row.detailAddress+"  "+ $('#repEventRp').val();
	dataJson.repEventRp =$('#repEventRp').val();
	dataJson.repHopeTime = '尽快';
	dataJson.repRepairPeopleId = $('#doRepairGetUserId').val();//负责人
	dataJson.repUserId = _loginUserId;
	dataJson.repTypeRp = '退房维修';
	dataJson.repDepartment = _loginDepartment;
	dataJson.repStorefront = _loginStore;
	dataJson.repTaskTime = formatTime(getNowFormatDate(), 2);
	dataJson.repTollRp = $('#repTollRp').val();
	dataJson.repNumber = randomNumber();
	var random = parseInt((Math.random()*9+1)*10000000);
	dataJson.random = random;
	dataJson.sendMsg=sendMsg;
	$('#repairDg').datagrid('insertRow', {
		index: 0,
		row: dataJson
	});
	$("#addRepairDlg").dialog('close');
	//清空结算
	clearJieSuan();
	//计算维保费
	calRepair();
}

/*
	刷新
	填入押金、欠结、管理费、违约金
	计算水电、未缴、超期、维保
	所有框不允许修改
	清空结算内容
*/
function reflashRenter(){
	var row = $('#renterCheckOutDg').datagrid('getSelected');
	//填入押金、管理费
	$('#renterCheckout_rcoReturnDeposit').val(row.hrHouseDeposit);
	$('#renterCheckout_rcoReturnPowerDeposit').val(row.hrPowerDeposit);
	$('#renterCheckout_rcoReturnDoorDeposit').val(row.hrDoorDeposit);
	$('#renterCheckout_rcoReturnOtherDeposit').val(row.hrOtherDeposit);
	$('#renterCheckout_rcoPropertyCostsInTotal').val(row.jrrManageCost);
	$('#renterCheckout_rcoServerCost').val(row.jrrServerCost);
	$('#renterCheckout_rcoWifiCost').val(row.hrWifiCharge);
	$('#renterCheckout_rcoTvCost').val(row.hrTvCharge);
	// 计算水电、租金、维保费
	calVarietyCharge();
	//所有框不允许修改
	$('[data-read="1"]').attr("disabled",true);
	//清空结算内容
	clearJieSuan();
}

/*
	修正
	所有框允许修改
	清空结算内容
*/
function updateRenter(){
	//所有框允许修改
	$('[data-read="1"]').attr("disabled",false);
	//清空结算内容
	clearJieSuan();
}

//清空结算内容
function clearJieSuan(){
	$('#renterCheckout_rcoDeductionCombined').val('');
	$('#renterCheckout_rcoTotalShouldBeReturned').val('');
	$('#jiesuan').html('');
	$('#renterCheckout_rcoPayNote').val('');
	$('#renterCheckout_rcoReturnNote').val('');
}

/*
	结算
	所有框不允许修改
	拼接描述
*/
function jiesuan(){
	//所有框不允许修改
	$('[data-read="1"]').attr("disabled",true);
	//计算总费用
	var totalCharge = calTotalCharge();
	if (totalCharge >= 0) {
		$('.shijijiesuan').html('应退款：');
		$('#jiesuan').html(totalCharge);
	} else {
		totalCharge = Math.abs(totalCharge);
		$('.shijijiesuan').html('应收款：');
		$('#jiesuan').html(totalCharge);
	}
	
}
//如果“未办理手续”,租客账号无需填写,直接禁止输入,有内容的不能修改!
function changeProcedures(){
	var rcoProcedures = $('#renterCheckout_rcoProcedures').val();
	if (rcoProcedures == '未办手续') {
		$('#renterCheckout_rcoRefundTheUserName').attr('disabled', true);
		$('#renterCheckout_rcoRefundBank').attr('disabled', true);
		$('#renterCheckout_rcoRefundAccount').attr('disabled', true);
	} else {
		$('#renterCheckout_rcoRefundTheUserName').attr('disabled', false);
		$('#renterCheckout_rcoRefundBank').attr('disabled', false);
		$('#renterCheckout_rcoRefundAccount').attr('disabled', false);
	}
}
//计算维保费
function calRepair(){
	var repairRows = $('#repairDg').datagrid('getRows');
	var repTollRp = 0;
	for (var i in repairRows) {
		repTollRp = mySum(repTollRp, repairRows[i].repTollRp);
	}
	$("#renterCheckout_rcoRepairDamages").val(repTollRp);
}
/**
 * 获取设备读数
 */
function getWegNum(){
	var row = $('#renterCheckOutDg').datagrid('getSelected');
	var hsId = row.hrHouse4storeId;
	$.post('../queryWegNum.action',{
		hsId	: hsId
	},function(data){
		if(data.code < 0){
			myTips(data.msg,"error");
			return;
		}
		data = data.body[0];
		for(var i in data){
			$("#renterCheckOutDlg input#renterCheckout_rco"+i).val(data[i]);
		}
	});
}