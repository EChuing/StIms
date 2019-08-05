var jrrMoney;
var jrrEndTime;
var jrrManageCost;
var jrrServerCost;
var dataList;
var hrDataList;
var jsonArrays;

$(function() {
	console.log($("#hrId").val());
	console.log($("#hsId").val());
	console.log($("#houseId").val());
	console.log($("#renterId").val());
	console.log($("#landlordId").val());
	console.log($("#loginDepartment").val());
	console.log($("#loginStore").val());
	//监听是否长时间不进行操作
	// 监听页面点击操作，刷新倒计时
	$(document).click(function() {
		window.parent.parent.sec = 600;
	});
	// 监听键盘输入操作，刷新倒计时
	$(document).keyup(function() {
		window.parent.parent.sec = 600;
	});
	//点击导航栏跳转
	$('#exchangeHousesDlg .process-bar .process').on('click', function(){
		if ($(this).hasClass('active')) {
			var step = $(this).attr('data-step');
			gotoStep('exchangeHouses', step);
		}
	});
	
	doSkipToChild();
	$("#handlerShowUserInfo").val(parent._loginUserName);
	
	$(".detailAddress").html($("#address").val());
	$(".renterPopName").html($("#renterName").val());
	$(".renterPopTelephone").html($("#renterTel").val());
	$(".renterPopIdcard").html($("#renterPopIdcard").val());
	//延迟加载
	setTimeout(function() {
		$('#exchangeHouses_rcoApplyUserName').html(parent._loginUserName);
		$('#exchangeHouses_rcoCheckOutTime').html(parent.formatDate(parent.getNowFormatDate()));
		$('#renterCheckout_rcoCheckOutActualTime').val(parent.formatDate(parent.getNowFormatDate()));
		checkoutRenterDay()
	}, 1000);

	for (var i in _acountType) {
		$('.add_financial_way').append("<option value='" + i + "'>" + _acountType[i] + "</option>");
	}
	for (var i in _payType) {
		$('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
	}
	
	var hrId = $("#hrId").val();
	var renterId = $("#renterId").val();
	
	$.post("../queryExchangeHouses.action", {
		hrId : hrId,
		hrRenterId : renterId
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		data = data.body[0];
		for (var i in data) {
			if (data[i] == null) {
				data[i] = '';
			}
			$("."+i).html(data[i]);
		}
		dataList = data;
		jrrMoney = data.jrrMoney;
		jrrEndTime = data.jrrEndTime;
		jrrServerCost = data.jrrServerCost;
		jrrManageCost = data.jrrManageCost;
		console.log("正确的换房操作");
		$.post("../queryMeterReadingScheme.action",{
			hrId : hrId,
		},function(data2){
			if(data2.code<0){
				myTips(data.msg, 'error');
				return;
			}
			data2 = data2.body[0];
			hrDataList = data2;
			for(var j in data2){
				$("#"+j).html(data2[j]);
			}
			var meterReadingRecordStr = data2.hsMeterReadingRecord.getRealJsonStr();
			var jsonData = eval('(' + meterReadingRecordStr + ')');
			
			var waterLast = jsonData.water.lastReading;//上次水读数
			var waterThis = waterLast;//本次水读数
			if(jsonData.water.thisReading.length != 0){
				waterThis = jsonData.water.thisReading[jsonData.water.thisReading.length-1];
			}
			var electritLast = jsonData.electrit.lastReading;//上次电读数
			var electritThis = electritLast;//本次电读数
			if(jsonData.electrit.thisReading.length != 0){
				electritThis = jsonData.electrit.thisReading[jsonData.electrit.thisReading.length-1];
			}
			var gasLast = jsonData.gas.lastReading;//上次气读数
			var gasThis = gasLast;//本次气读数
			if(jsonData.gas.thisReading.length != 0){
				gasThis = jsonData.gas.thisReading[jsonData.gas.thisReading.length-1];
			}
			
			if(jsonData.hotwater){
				var hotWaterLast = jsonData.hotwater.lastReading;//上次热水读数
				var hotWaterThis = hotWaterLast;//本次热水读数
				if(jsonData.hotwater.thisReading.length != 0){
					hotWaterThis = jsonData.hotwater.thisReading[jsonData.hotwater.thisReading.length-1];
				}
				$("#renterCheckout_rcoHotWaterBaseLast").val(hotWaterLast);
				$("#renterCheckout_rcoHotWaterBaseNumber").val(hotWaterThis);
			}
			if(jsonData.hotair){
				var hotAirLast = jsonData.hotair.lastReading;//上次暖气读数
				var hotAirThis = hotAirLast;//本次暖气读数
				if(jsonData.hotair.thisReading.length != 0){
					hotAirThis = jsonData.hotair.thisReading[jsonData.hotair.thisReading.length-1];
				}
				$("#renterCheckout_rcoHotAirBaseLast").val(hotAirLast);
				$("#renterCheckout_rcoHotAirBaseNumber").val(hotAirThis);
			}
			
			$("#renterCheckout_rcoLastWaterBase").val(waterLast);
			$("#renterCheckout_rcoWaterBase").val(waterThis);
			$("#renterCheckout_rcoLastElectricityBase").val(electritLast);
			$("#renterCheckout_rcoElectricityBase").val(electritThis);
			$("#renterCheckout_rcoGasBaseLast").val(gasLast);
			$("#renterCheckout_rcoGasBaseNumber").val(gasThis);
			
			calwegdiff();
			
			//欠结款、预存款只显示一个
			if (data2.hrBase == 0) {
				$("#qianjie").show();
				$("#yucun").hide();
				$("#renterCheckout_rcoOtherChargesInTotal").val(0); //欠结款
				$("#renterCheckout_rcoLicenceFee").val(0); //预存款
			} else if (data2.hrBase > 0) {
				$("#qianjie").show();
				$("#yucun").hide();
				$("#renterCheckout_rcoOtherChargesInTotal").val(data2.hrBase);
				$("#renterCheckout_rcoLicenceFee").val(0);
			} else {
				$("#qianjie").hide();
				$("#yucun").show();
				$("#renterCheckout_rcoOtherChargesInTotal").val(0);
				$("#renterCheckout_rcoLicenceFee").val(Math.abs(data2.hrBase));
			}
			//按钮的显示和隐藏
			//所有框不允许修改
			$('[data-read="1"]').attr("disabled", true);
			gotoStep('exchangeHouses', 1);
			energy2();
		});
	});
});
function energy2(){
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

//下一步
function nextStep() {
	if (!validateStep('exchangeHouses', 2)) {
		return;
	}
	
	//维保记录
	/*var rows = $('#repairDg').datagrid('getRows');
	$('#repairDg').datagrid('loadData', rows);*/
	reflashRenter();
}


//计算租客超期天数
function checkoutRenterDay() {
	$('.rcoCheckOutTime').html($('#exchangeHouses_rcoCheckOutTime').html());
	$('.rcoCheckOutActualTime').html($('#renterCheckout_rcoCheckOutActualTime').val());
	if ($('#exchangeHouses_rcoCheckOutTime').html() == '' || $('#renterCheckout_rcoCheckOutActualTime').val() == '') {
		$("#renterCheckout_rcoDaysOverdue").html('');
		$('.rcoDaysOverdue').html('');
		return;
	}
	var beforeTime = new Date($('#exchangeHouses_rcoCheckOutTime').html().replace(/-/g, "/"));
	var afterTime = new Date($('#renterCheckout_rcoCheckOutActualTime').val().replace(/-/g, "/"));

	var days = afterTime.getTime() - beforeTime.getTime();
	var subTime = parseInt(days / (1000 * 60 * 60 * 24));
	if (subTime > 0) {
		$('#renterCheckout_rcoDaysOverdue').html(subTime);
		$('.rcoDaysOverdue').html(subTime);
	} else {
		$("#renterCheckout_rcoDaysOverdue").html(0);
		$(".rcoDaysOverdue").html(0);
	}
	clearJieSuan();
}

// 计算水电、超期管理费、超期服务费、租金、维保费
function calVarietyCharge() {
	//var row = $('#renterCheckOutDg').datagrid('getSelected');
	//计算水电
	var waterLast = $("#renterCheckout_rcoLastWaterBase").val(); //上次水读数
	var waterThis = $("#renterCheckout_rcoWaterBase").val(); //本次水读数
	var electritLast = $("#renterCheckout_rcoLastElectricityBase").val(); //上次电读数
	var electritThis = $("#renterCheckout_rcoElectricityBase").val(); //本次电读数
	var gasLast = $("#renterCheckout_rcoGasBaseLast").val(); //上次气读数
	var gasThis = $("#renterCheckout_rcoGasBaseNumber").val(); //本次气读数
	
	var hotWaterLast = $("#renterCheckout_rcoHotWaterBaseLast").val(); //上次气读数
	var hotWaterThis = $("#renterCheckout_rcoHotWaterBaseNumber").val(); //本次气读数
	
	var hotAirLast = $("#renterCheckout_rcoHotAirBaseLast").val(); //上次气读数
	var hotAirThis = $("#renterCheckout_rcoHotAirBaseNumber").val(); //本次气读数
	
	
	var waterNum = $("#renterCheckout_rcoWaterPrice").html(); //水差额
	var electritNum = $("#renterCheckout_rcoElectricityPrice").html(); //电差额
	var gasNum = $("#renterCheckout_rcoGasPrice").html(); //气差额
	
	var HotWaterNum = $("#renterCheckout_rcoHotWaterPrice").html(); //气差额
	var HotAirNum = $("#renterCheckout_rcoHotAirPrice").html(); //气差额
	
	
	var waterMoney = 0;
	var electritMoney = 0;
	var gasMoney = 0;
	
	var HotWaterMoney = 0;
	var HotAirMoney = 0;
	if (waterLast === '' ||
		waterThis === '' ||
		electritLast === '' ||
		electritThis === '' ||
		gasLast === '' ||
		gasThis === '' ||
		
		hotWaterLast === '' ||
		hotWaterThis === '' ||
		hotAirLast === '' ||
		hotAirThis === '' ||
		
		waterNum === '' ||
		electritNum === '' ||
		gasNum === '' ||
		
		HotWaterNum === '' ||
		HotAirNum === '' ||
		
		isNaN(waterLast) ||
		isNaN(waterThis) ||
		isNaN(electritLast) ||
		isNaN(electritThis) ||
		isNaN(gasLast) ||
		isNaN(gasThis) ||
		
		isNaN(hotWaterLast) ||
		isNaN(hotWaterThis) ||
		isNaN(hotAirLast) ||
		isNaN(hotAirThis) ||
		
		
		isNaN(waterNum) ||
		isNaN(electritNum) ||
		
		isNaN(HotWaterNum) ||
		isNaN(HotAirNum) ||
		
		isNaN(gasNum)) {
		myTips('抄表读数未填完整', 'error');
		$("#renterCheckout_rcoWaterCombined").val(0.00);
		$("#renterCheckout_rcoElectricityCombined").val(0.00);
		$("#renterCheckout_rcoGasCombined").val(0.00);
		
		$("#renterCheckout_rcoHotWaterCombined").val(0.00);
		$("#renterCheckout_rcoHotAirCombined").val(0.00);
		
		return;
	}
	var hrId = $("#hrId").val();
	//查计费方案并计算水电费
	$.post("../selectMeterReadingScheme.action", {
		hrId : hrId,
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, 'error');
		}
		data = data.body[0];
		if (waterNum > 0) {
			waterMoney = powerCalculate(data.waterPlan!=''?data.waterPlan.getRealJsonStr():'', waterNum); //水费
		} else {
			waterMoney = -powerCalculate(data.waterPlan!=''?data.waterPlan.getRealJsonStr():'', -waterNum); //水费
		}
		if (electritNum > 0) {
			electritMoney = powerCalculate(data.electritPlan!=''?data.electritPlan.getRealJsonStr():'', electritNum); //电费
		} else {
			electritMoney = -powerCalculate(data.electritPlan!=''?data.electritPlan.getRealJsonStr():'', -electritNum); //电费
		}
		if (gasNum > 0) {
			gasMoney = powerCalculate(data.gasPlan!=''?data.gasPlan.getRealJsonStr():'', gasNum); //气费
		} else {
			gasMoney = -powerCalculate(data.gasPlan!=''?data.gasPlan.getRealJsonStr():'', -gasNum); //气费
		}
		if (HotWaterNum > 0) {
			HotWaterMoney = powerCalculate(data.hotWaterPlan!=''?data.hotWaterPlan.getRealJsonStr():'', HotWaterNum); //热水费
		} else {
			HotWaterMoney = -powerCalculate(data.hotWaterPlan!=''?data.hotWaterPlan.getRealJsonStr():'', -HotWaterNum); //暖气费
		}
		if (HotAirNum > 0) {
			HotAirMoney = powerCalculate(data.hotAirPlan!=''?data.hotAirPlan.getRealJsonStr():'', HotAirNum); //暖气费
		} else {
			HotAirMoney = -powerCalculate(data.hotAirPlan!=''?data.hotAirPlan.getRealJsonStr():'', -HotAirNum); //暖气费
		}
		
		$("#renterCheckout_rcoWaterCombined").val(waterMoney);
		$("#renterCheckout_rcoSysWater").val(waterMoney);
		$("#renterCheckout_rcoElectricityCombined").val(electritMoney);
		$("#renterCheckout_rcoSysElectricity").val(electritMoney);
		$("#renterCheckout_rcoGasCombined").val(gasMoney);
		$("#renterCheckout_rcoSysGas").val(gasMoney);
		
		$("#renterCheckout_rcoHotWaterCombined").val(HotWaterMoney);
		$("#renterCheckout_rcoSysHotWater").val(HotWaterMoney);
		
		$("#renterCheckout_rcoHotAirCombined").val(HotAirMoney);
		$("#renterCheckout_rcoSysHotAir").val(HotAirMoney);
		
	});
	//计算租金
	var rcoCheckOutActualTime = $("#renterCheckout_rcoCheckOutActualTime").val(); //实际退房时间
	$.post('../basicData.action', {
		rcoRentId : hrId,
		rcoCheckOutActualTime : rcoCheckOutActualTime,
		rcoJrrEndTime : jrrEndTime,
		rcoJrrMoney : jrrMoney
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		data = data.body[0];
		$("#renterCheckout_rcoBeyondTheRent").val(data.rcoBeyondTheRent);
	});
	var day = parseInt($('#renterCheckout_rcoDaysOverdue').html());
	//超期管理费
	var rcoPropertyCostsInTotal = day / 30 * jrrManageCost;
	$("#renterCheckout_rcoPropertyCostsInTotal").val(rcoPropertyCostsInTotal.toFixed(2));
	//超期服务费
	var rcoServerCost = day / 30 * parseFloat(jrrServerCost);
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
function calwegdiff() {
	//水
	var wt = $('#renterCheckout_rcoWaterBase').val();
	var wl = $('#renterCheckout_rcoLastWaterBase').val();
	if (wt != '' && wl != '') {
		$('#renterCheckout_rcoWaterPrice').html(accSub(wt, wl));
	} else {
		$('#renterCheckout_rcoWaterPrice').html('');
	}
	//电
	var et = $('#renterCheckout_rcoElectricityBase').val();
	var el = $('#renterCheckout_rcoLastElectricityBase').val();
	if (et != '' && el != '') {
		$('#renterCheckout_rcoElectricityPrice').html(accSub(et, el));
	} else {
		$('#renterCheckout_rcoElectricityPrice').html('');
	}
	//气
	var gt = $('#renterCheckout_rcoGasBaseNumber').val();
	var gl = $('#renterCheckout_rcoGasBaseLast').val();
	if (gt != '' && gl != '') {
		$('#renterCheckout_rcoGasPrice').html(accSub(gt, gl));
	} else {
		$('#renterCheckout_rcoGasPrice').html('');
	}
	
	//热水
	var hwt = $('#renterCheckout_rcoHotWaterBaseNumber').val();
	var hwl = $('#renterCheckout_rcoHotWaterBaseLast').val();
	if (hwt != '' && hwl != '') {
		$('#renterCheckout_rcoHotWaterPrice').html(accSub(hwt, hwl));
	} else {
		$('#renterCheckout_rcoHotWaterPrice').html('');
	}
	//暖气
	var hat = $('#renterCheckout_rcoHotAirBaseNumber').val();
	var hal = $('#renterCheckout_rcoHotAirBaseLast').val();
	if (hat != '' && hal != '') {
		$('#renterCheckout_rcoHotAirPrice	').html(accSub(hat, hal));
	} else {
		$('#renterCheckout_rcoHotAirPrice	').html('');
	}
}
//计算总费用并生成明细
function calTotalCharge() {
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
	
	
	
	var shuifei = $('#renterCheckout_rcoWaterCombined').val(); //水费
	var dianfei = $('#renterCheckout_rcoElectricityCombined').val(); //电费
	var qifei = $('#renterCheckout_rcoGasCombined').val(); //气费
	
	var hotwaterfei = $('#renterCheckout_rcoHotWaterCombined').val(); //热水费
	var hotairfei = $('#renterCheckout_rcoHotAirCombined').val(); //暖气费
	
	
	var qianjiekuan = $('#renterCheckout_rcoOtherChargesInTotal').val(); //欠结款
	var guanlifei = $('#renterCheckout_rcoPropertyCostsInTotal').val(); //物管费
	var fuwufei = $('#renterCheckout_rcoServerCost').val(); //服务费
	var wangluofei = $('#renterCheckout_rcoWifiCost').val(); //网络费
	var dianshifei = $('#renterCheckout_rcoTvCost').val(); //电视费
	var chaoqifangzu = $('#renterCheckout_rcoBeyondTheRent').val(); //超期租金
	var weibaofei = $('#renterCheckout_rcoRepairDamages').val(); //维保费
	var weiyuejin = $('#renterCheckout_rcoBreachOfContract').val(); //违约金
	var weiyuemingxi = $('#renterCheckout_rcoBreachDetail').val(); //违约明细
	var fangwuyajin = $('#renterCheckout_rcoReturnDeposit').val(); //房屋押金
	var shuidianyajin = $('#renterCheckout_rcoReturnPowerDeposit').val(); //水电押金
	var menkayajin = $('#renterCheckout_rcoReturnDoorDeposit').val(); //门卡押金
	var qitayajin = $('#renterCheckout_rcoReturnOtherDeposit').val(); //其它押金
	var yucunkuan = $('#renterCheckout_rcoLicenceFee').val(); //预存款
	var totalCharge = 0; //总应收
	var totalReturn = 0; //总应退
	var yingjiao = ""; //应收明细
	var yingtui = ""; //应退明细

	if (shuifei != '' && shuifei > 0) {
		totalCharge = mySum(totalCharge, shuifei);
		yingjiao += '水费：' + shuibenci + ' - ' + shuishangci + ' = ' + shuichazhi + '立方 * 计费方案 = ' + shuifei + '元；\n';
	} else if (shuifei != '' && shuifei < 0) {
		shuifei = Math.abs(shuifei);
		totalReturn = mySum(totalReturn, shuifei);
		yingtui += '水费：' + shuibenci + ' - ' + shuishangci + ' = ' + shuichazhi + '立方 * 计费方案 = ' + shuifei + '元；\n';
	}
	if (dianfei != '' && dianfei > 0) {
		totalCharge = mySum(totalCharge, dianfei);
		yingjiao += '电费：' + dianbenci + ' - ' + dianshangci + ' = ' + dianchazhi + '度 * 计费方案 = ' + dianfei + '元；\n';
	} else if (dianfei != '' && dianfei < 0) {
		dianfei = Math.abs(dianfei);
		totalReturn = mySum(totalReturn, dianfei);
		yingtui += '电费：' + dianbenci + ' - ' + dianshangci + ' = ' + dianchazhi + '度 * 计费方案 = ' + dianfei + '元；\n';
	}
	if (qifei != '' && qifei > 0) {
		totalCharge = mySum(totalCharge, qifei);
		yingjiao += '气费：' + qibenci + ' - ' + qishangci + ' = ' + qichazhi + '立方 * 计费方案 = ' + qifei + '元；\n';
	} else if (qifei != '' && qifei < 0) {
		qifei = Math.abs(qifei);
		totalReturn = mySum(totalReturn, qifei);
		yingtui += '气费：' + qibenci + ' - ' + qishangci + ' = ' + qichazhi + '立方 * 计费方案 = ' + qifei + '元；\n';
	}
	
	if (hotwaterfei != '' && hotwaterfei > 0) {
		totalCharge = mySum(totalCharge, hotwaterfei);
		yingjiao += '热水费：' + hotwaterbenci + ' - ' + hotwatershangci + ' = ' + hotwaterchazhi + '立方 * 计费方案 = ' + hotwaterfei + '元；\n';
	} else if (hotwaterfei != '' && hotwaterfei < 0) {
		hotwaterfei = Math.abs(hotwaterfei);
		totalReturn = mySum(totalReturn, hotwaterfei);
		yingtui += '热水费：' + hotwaterbenci + ' - ' + hotwatershangci + ' = ' + hotwaterchazhi + '立方 * 计费方案 = ' + hotwaterfei + '元；\n';
	}
	
	if (hotairfei != '' && hotairfei > 0) {
		totalCharge = mySum(totalCharge, hotairfei);
		yingjiao += '暖气费：' + hotairbenci + ' - ' + hotairshangci + ' = ' + hotairchazhi + '度 * 计费方案 = ' + hotairfei + '元；\n';
	} else if (hotairfei != '' && hotairfei < 0) {
		hotairfei = Math.abs(hotairfei);
		totalReturn = mySum(totalReturn, hotairfei);
		yingtui += '暖气费：' + hotairbenci + ' - ' + hotairshangci + ' = ' + hotairchazhi + '度 * 计费方案 = ' + hotairfei + '元；\n';
	}
	
	if (chaoqifangzu != '' && chaoqifangzu > 0) {
		totalCharge = mySum(totalCharge, chaoqifangzu);
		yingjiao += '租金：' + chaoqifangzu + '元；\n';
	} else if (chaoqifangzu != '' && chaoqifangzu < 0) {
		chaoqifangzu = Math.abs(chaoqifangzu);
		totalReturn = mySum(totalReturn, chaoqifangzu);
		yingtui += '租金：' + chaoqifangzu + '元；\n';
	}
	if (guanlifei != '' && guanlifei > 0) {
		totalCharge = mySum(totalCharge, guanlifei);
		yingjiao += '管理费：' + guanlifei + '元；\n';
	} else if (guanlifei != '' && guanlifei < 0) {
		guanlifei = Math.abs(guanlifei);
		totalReturn = mySum(totalReturn, guanlifei);
		yingtui += '管理费：' + guanlifei + '元；\n';
	}
	if (fuwufei != '' && fuwufei > 0) {
		totalCharge = mySum(totalCharge, fuwufei);
		yingjiao += '服务费：' + fuwufei + '元；\n';
	} else if (fuwufei != '' && fuwufei < 0) {
		fuwufei = Math.abs(fuwufei);
		totalReturn = mySum(totalReturn, fuwufei);
		yingtui += '服务费：' + fuwufei + '元；\n';
	}
	if (wangluofei != '' && wangluofei > 0) {
		totalCharge = mySum(totalCharge, wangluofei);
		yingjiao += '网络费：' + wangluofei + '元；\n';
	} else if (wangluofei != '' && wangluofei < 0) {
		wangluofei = Math.abs(wangluofei);
		totalReturn = mySum(totalReturn, wangluofei);
		yingtui += '网络费：' + wangluofei + '元；\n';
	}
	if (dianshifei != '' && dianshifei > 0) {
		totalCharge = mySum(totalCharge, dianshifei);
		yingjiao += '电视费：' + dianshifei + '元；\n';
	} else if (dianshifei != '' && dianshifei < 0) {
		dianshifei = Math.abs(dianshifei);
		totalReturn = mySum(totalReturn, dianshifei);
		yingtui += '电视费：' + dianshifei + '元；\n';
	}
	if (weibaofei != '' && weibaofei > 0) {
		totalCharge = mySum(totalCharge, weibaofei);
		yingjiao += '维保费：' + weibaofei + '元；\n';
	} else if (weibaofei != '' && weibaofei < 0) {
		weibaofei = Math.abs(weibaofei);
		totalReturn = mySum(totalReturn, weibaofei);
		yingtui += '维保费：' + weibaofei + '元；\n';
	}
	if (weiyuejin != '' && weiyuejin > 0) {
		totalCharge = mySum(totalCharge, weiyuejin);
		yingjiao += '违约金：' + weiyuejin + '元；明细：' + weiyuemingxi + '；\n';
	} else if (weiyuejin != '' && weiyuejin < 0) {
		weiyuejin = Math.abs(weiyuejin);
		totalReturn = mySum(totalReturn, weiyuejin);
		yingtui += '违约金：' + weiyuejin + '元；明细：' + weiyuemingxi + '；\n';
	}
	//欠结款只能是应收款
	if (qianjiekuan != 0) {
		qianjiekuan = Math.abs(qianjiekuan);
		totalCharge = mySum(totalCharge, qianjiekuan);
		yingjiao += '欠结款：' + qianjiekuan + '元；\n';
	}
	//预存款、押金只能是应退款
	if (yucunkuan != 0) {
		yucunkuan = Math.abs(yucunkuan);
		totalReturn = mySum(totalReturn, yucunkuan);
		yingtui += '预存款：' + yucunkuan + '元；\n';
	}
	if (fangwuyajin != 0) {
		fangwuyajin = Math.abs(fangwuyajin);
		totalReturn = mySum(totalReturn, fangwuyajin);
		yingtui += '房屋押金：' + fangwuyajin + '元；\n';
	}
	if (shuidianyajin != 0) {
		shuidianyajin = Math.abs(shuidianyajin);
		totalReturn = mySum(totalReturn, shuidianyajin);
		yingtui += '水电押金：' + shuidianyajin + '元；\n';
	}
	if (menkayajin != 0) {
		menkayajin = Math.abs(menkayajin);
		totalReturn = mySum(totalReturn, menkayajin);
		yingtui += '门卡押金：' + menkayajin + '元；\n';
	}
	if (qitayajin != 0) {
		qitayajin = Math.abs(qitayajin);
		totalReturn = mySum(totalReturn, qitayajin);
		yingtui += '其他押金：' + qitayajin + '元；\n';
	}
	yingjiao = '租客合计应缴费用：' + totalCharge + '元；\n' + yingjiao;
	yingtui = '公寓合计应退费用：' + totalReturn + '元；\n' + yingtui;

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
function calActualRefund(totalReturn,totalCharge) {
	var actualRefund = accSub(totalReturn, totalCharge); //应退款 = 应退合计 - 应缴合计
	if (actualRefund >= 0) {
		$('.shijijiesuan').html('原房应退款：');
		$(".rcoActualReceiptsDiv").hide();
		$('.rcoActualReceipts').val('0');
	} else {
		actualRefund = Math.abs(actualRefund);
		$('.shijijiesuan').html('原房应收款：');
		$(".rcoActualReceiptsDiv").show();
		//$('.rcoActualReceipts').val(data.rcoActualReceipts);
	}
	$('#jiesuan').html(actualRefund);
	$('.actualRefund').html(actualRefund);
	$('.actualRefund2').html(convertCurrency(actualRefund));
}
//计算出账申请单上的汇总金额
function calTotalRentPrint(data) {
	var powerAllMoney = 0.00; //能源合计
	var rentAllMoney = 0.00; //租金合计
	var oweAllMoney = 0.00; //违约金和滞纳金合计
	var otherAllMoney = 0.00; //其他扣费合计

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
		height : 220,
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
	return "<a href='#' onclick=\"myDeleteRows('" + row.random + "','random','repairDg',0);clearJieSuan();calRepair();\">删除</a>";
}
//添加维保到列表
function addToDataGrid1() {
	var checkFlag = 0;
	$('#addRepairDlg [require="require"]').each(function() {
		if ($(this).val() == '') {
			$(this).css('border-color', 'red');
			checkFlag++;
		} else {
			$(this).css('border-color', '#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!', 'error');
		return;
	}
	var dataJson = {};
	dataJson.repHouse4rentId = $("#hrId").val();
	dataJson.repHouse4storeId = $("#hsId").val();
	dataJson.repHouseId = $("#houseId").val();
	dataJson.repResponsibility = '客户付费';
	dataJson.repEventRp = $('#repEventRp').val();
	dataJson.repHopeTime = '尽快';
	dataJson.repRepairPeopleId = $('#doRepairGetUserId').val(); //负责人
	dataJson.repUserId = parent._loginUserId;
	dataJson.repTypeRp = '退房维修';
	dataJson.repDepartment = parent._loginDepartment;
	dataJson.repStorefront = parent._loginStore;
	dataJson.repTaskTime = formatTime(getNowFormatDate(), 2);
	dataJson.repTollRp = $('#repTollRp').val();
	dataJson.repNumber = randomNumber();
	var random = parseInt((Math.random() * 9 + 1) * 10000000);
	dataJson.random = random;
	$('#repairDg').datagrid('insertRow', {
		index : 0,
		row : dataJson
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
function reflashRenter() {
	//填入押金、管理费
	$('#renterCheckout_rcoReturnDeposit').val(dataList.hrHouseDeposit);
	$('#renterCheckout_rcoReturnPowerDeposit').val(dataList.hrPowerDeposit);
	$('#renterCheckout_rcoReturnDoorDeposit').val(dataList.hrDoorDeposit);
	$('#renterCheckout_rcoReturnOtherDeposit').val(dataList.hrOtherDeposit);
	$('#renterCheckout_rcoPropertyCostsInTotal').val(dataList.jrrManageCost);
	$('#renterCheckout_rcoServerCost').val(dataList.jrrServerCost);
	$('#renterCheckout_rcoWifiCost').val(dataList.hrWifiCharge);
	$('#renterCheckout_rcoTvCost').val(dataList.hrTvCharge);
	// 计算水电、租金、维保费
	calVarietyCharge();
	//所有框不允许修改
	$('[data-read="1"]').attr("disabled", true);
	//清空结算内容
	clearJieSuan();
}

/*
	修正
	所有框允许修改
	清空结算内容
*/
function updateRenter() {
	//所有框允许修改
	$('[data-read="1"]').attr("disabled", false);
	//清空结算内容
	clearJieSuan();
}

//清空结算内容
function clearJieSuan() {
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
function jiesuan() {
	//所有框不允许修改
	$('[data-read="1"]').attr("disabled", true);
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
//计算维保费
function calRepair() {
	var repairRows = $('#repairDg').datagrid('getRows');
	var repTollRp = 0;
	for (var i in repairRows) {
		repTollRp = mySum(repTollRp, repairRows[i].repTollRp);
	}
	$("#renterCheckout_rcoRepairDamages").val(repTollRp);
}
//分页操作
function sourcePage(totalNum,page,type){
	var pageNum = Math.ceil(totalNum /10);
	if(type==0){
		pageNum = Math.ceil(totalNum /20);
		$("#sourcePage").remove();
		$("#sourcePageDiv").append("<div class='tcdPageCode' id='sourcePage' style='text-align:center;'></div>");
		$("#sourcePage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				_pageNum[0] = p;
				_indexNum[0] = 0;
				if(p<=pageNum){
					querySourceInfo(p,1);
				}
			}
		});
	}
	if(type==1){
		pageNum = Math.ceil(totalNum /10);
		$("#choseHousePage").remove();
		$("#choseHousePageDiv").append("<div class='tcdPageCode' id='choseHousePage' style='text-align:center;'></div>");
		$("#choseHousePage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				if(p<=pageNum){
					query4StoreInfo(p,1);
				}
			}
		});
	}
	if(type==2){
		pageNum = Math.ceil(totalNum /10);
		$("#choseRenterPage").remove();
		$("#choseRenterPageDiv").append("<div class='tcdPageCode' id='choseRenterPage' style='text-align:center;'></div>");
		$("#choseRenterPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				if(p<=pageNum){
					queryRenter(p,1);
				}
			}
		});
	}
	if(type==3){
		pageNum = Math.ceil(totalNum /6);
		$("#followPage").remove();
		$("#followPageDiv").append("<div class='tcdPageCode' id='followPage' style='text-align:center;'></div>");
		$("#followPage").createPage({
			onePageNums:6,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				if(p<=pageNum){
					var row = $('#sourceInfoDg').datagrid('getSelected');
					queryFollow(row,p,1);
				}
			}
		});
	}
	if (type == 4) {
		pageNum = Math.ceil(totalNum /7);
		$("#followPage1").remove();
		$("#followPageDiv1").append("<div class='tcdPageCode' id='followPage1' style='text-align:center;'></div>");
		$("#followPage1").createPage({
			onePageNums:7,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				if(p<=pageNum){
					var row = $('#sourceInfoDg').datagrid('getSelected');
					queryFollow1(row,p,1);
				}
			}
		});
	}
	if(type==7){
		pageNum = Math.ceil(totalNum /10);
		$("#choseRenterPage1").remove();
		$("#choseRenterPageDiv1").append("<div class='tcdPageCode' id='choseRenterPage1' style='text-align:center;'></div>");
		$("#choseRenterPage1").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				if(p<=pageNum){
					queryRenter(p,1);
				}
			}
		});
	}
	if (type == 8) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseSourcePage").remove();
		$("#choseSourcePageDiv").append("<div class='tcdPageCode' id='choseSourcePage' style='text-align:center;'></div>");
		$("#choseSourcePage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					relationDate(p, 1);
				}
			}
		});
	}
	
	if (type == 9) {
		pageNum = Math.ceil(totalNum / 10);
		$("#chosePopPage").remove();
		$("#chosePopPageDiv").append("<div class='tcdPageCode' id='chosePopPage' style='text-align:center;'></div>");
		$("#chosePopPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryPop(p, 1);
				}
			}
		});
	}
	
}
//先验证结算再下一步
function validateStep2(describe, step){
	var checkFlag = 0;
	var thisStep = step - 1;
	if (thisStep > 0) {
		$('#' + describe + 'Dlg' + ' .' + describe + 'Steps' + ' .' + describe + 'Step' + thisStep + ' textarea[require="require"]').each(function(){
			if($(this).val()==''){
				$(this).css('border', '1px solid red');
				checkFlag++;
			}else{
				$(this).css('border', '1px solid #a9a9a9');
			}
		});
		if(checkFlag!=0){
			myTips("请先点击结算再下一步!","error");
			return false;
		}
	}
	
	gotoStep(describe, step);
	return true;
}

function queryCheckOut(type){
	if (type == 1){
		
		$("#renter2FinancialWay option:selected").text($("#renterFinancialWay option:selected").text());
		$("#renter2FinancialAccountName option:selected").text($("#renterFinancialAccountName option:selected").text());
		$(".rcoPayType").html($("#renterCheckout_rcoPayType option:selected").text());
		$("#renter2FinancialAccountBelong").val($("#renterFinancialAccountBelong").val());
		$("#renter2FinancialAccountNums").val($("#renterFinancialAccountNums").val());
	}
	$(".rcoCheckOutNature").html($("#exchangeHouses_rcoCheckOutNature").html());
	$(".rcoProcedures").html('正常');
	$(".rcoCheckOutActualTime").html($("#renterCheckout_rcoCheckOutActualTime").val());
	$(".rcoARefundOfTime").html($("#renterCheckout_rcoARefundOfTime").val());
	$(".rcoPayNote").val($("#renterCheckout_rcoPayNote").val());
	$(".rcoReturnNote").val($("#renterCheckout_rcoReturnNote").val());
	$(".rcoCheckOutReason").html($("#exchangeHouses_rcoCheckOutReason").val());
	$(".rcoApplyUserName").html($("#handlerShowUserInfo").val());
	//计算应退款/应收款
	//calActualRefund($("#jiesuan").html());
	$(".rcoNumber").html(randomNumber());
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
	
	if($("#renterFinancialAccountName").find("option:selected").text() != null && $("#renterFinancialAccountName").find("option:selected").text() != ''){
		exchangeHousesContrast();
		//计算应退款/应收款
		calActualRefund($("#renterCheckout_rcoTotalShouldBeReturned").val(),$("#renterCheckout_rcoDeductionCombined").val());
	}
	total($("#setRenterNewFinancialMoneyTotal").html(),$('.actualRefund').html())
}
//获取收支方式
function financialMode(){
	if($("#renterCheckout_rcoPayType").find("option:selected").text() != null && $("#renterCheckout_rcoPayType").find("option:selected").text() != ''){
		exchangeHousesContrast();
		//计算应退款/应收款
		calActualRefund($("#renterCheckout_rcoTotalShouldBeReturned").val(),$("#renterCheckout_rcoDeductionCombined").val());
	}
}

function exchangeHousesContrast(){
	
	//水电
	var rcoWaterBase = $("#renterCheckout_rcoWaterBase").val();//退房水读数
	var rcoElectricityBase = $("#renterCheckout_rcoElectricityBase").val();//退房电读数
	var rcoGasBaseNumber = $("#renterCheckout_rcoGasBaseNumber").val();//退房燃气读数
	
	var rcoHotWaterBaseNumber = $("#renterCheckout_rcoHotWaterBaseNumber").val();//退房燃气读数
	var rcoHotAirBaseNumber = $("#renterCheckout_rcoHotAirBaseNumber").val();//退房燃气读数
	
	
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
	
	var rcoHotWaterCombined = $("#renterCheckout_rcoHotWaterCombined").val();//燃气费
	var rcoHotAirCombined = $("#renterCheckout_rcoHotAirCombined").val();//燃气费
	
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
	var jfPayType = $("#renterCheckout_rcoPayType").find("option:selected").text();//收支方式
	var jfTicketNumber = $('.rcoNumber').html();//票据编号
	
	//欠结
	var yingjiao = $('#renterCheckout_rcoDeductionCombined').val();
	var yingtui = $('#renterCheckout_rcoTotalShouldBeReturned').val();
	var shishoukuan = $('.rcoActualReceipts').val();
	var yingtuikuan = mySum(shishoukuan, yingtui);//应退=实收+应退-应缴
	yingtuikuan = mySub(yingtuikuan, yingjiao);
	
	//房屋基本信息
	var address = $("#address").val();
	var addBuildingName=$("#exchangeHousesDlg .hsAddCommunity").eq(0).html();
	var addAddBuilding=$("#exchangeHousesDlg .hsAddBuilding").eq(0).html();
	var addAddDoorplateno=$("#exchangeHousesDlg .hsAddDoorplateno").eq(0).html();
	
	jfPayType = '"jfPayType":"' + jfPayType + '"';
	jfTicketNumber = '"jfTicketNumber":"' + jfTicketNumber + '"';
	var belongId = '"jfRenterId":"' + hrDataList.hrRenterId + '",'
	+'"jfLandlordId":"' + hrDataList.hrLandlordId + '"';
	var belongConding  = '"jfHouse4rentId":"' + hrDataList.hrId  + '",'
	+'"jfHouse4storeId":"' + hrDataList.hrHouse4storeId + '",'
	+'"jfHouseId":"' + hrDataList.hrHouseId + '"';
	var jfTheCashierPeople = '"jfTheCashierPeople":"' + parent._loginUserId + '"';
	var jfBillingDate = '"jfBillingDate":"' + formatTime(getNowFormatDate(), 2) + '"';
	var jfHandlers = '"jfHandlers":"' + parent._loginUserId + '"';
	var jfTheOwnershipType = '"jfTheOwnershipType":"' + '租客' + '"';
	var jfRenterId = '"jfRenterId":"' + hrDataList.hrRenterId + '"';
	var jfBelongingToTheName = '"jfBelongingToTheName":"' + dataList.renterName + '"';
	var jfFinancialCoding = '"jfFinancialCoding":"'
		+ formatTime(getNowFormatDate(), 3)
		+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
		+ Math.floor(Math.random() * 10) + '"';
	var jfStartCycle = '"jfStartCycle":"' + formatTime(getNowFormatDate(), 2) + '"';
	var jfEndCycle = '"jfEndCycle":"' + formatTime(getNowFormatDate(), 2) + '"';
	var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ',添加收支记录"';
	var jfClosedWay = '"jfClosedWay":"' + $('#renterFinancialWay').find('option:selected').text()+ '"';
	var jfAccountId = '"jfAccountId":"'+  rcoCheckoutAccount + '"';
	var department = '"department":"'+ parent._loginDepartment + '"';
	var storefront = '"storefront":"'+ parent._loginStore + '"';
	var jfAccountingWhy = '"jfAccountingWhy":"'
		+ hrDataList.hrAddDistrict 
		+ hrDataList.hrAddZone
		+ hrDataList.hrAddStreet
		+ hrDataList.hrAddCommunity
		+ hrDataList.hrAddBuilding
		+ hrDataList.hrAddDoorplateno + '"';
	var strArray = jfAccountId + "," + jfAccountingWhy + "," + jfClosedWay + ","
	+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfEndCycle + "," 
	+ jfStartCycle + "," + jfBelongingToTheName + ","
	+ belongConding + "," + belongId + "," + jfBillingDate + ","
	+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
	+ storefront + "," + department + "," + jfPayType + "," + jfTicketNumber;
	var jsonStrArry = '';
	//押金、预存款只能支出
	if(rcoReturnDeposit>0){
		jsonStrArry += "{"+insertFinancial(rcoReturnDeposit,'房屋押金','押金类','支出','退房结算：退还房屋押金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoReturnDeposit<0){
		jsonStrArry += "{"+insertFinancial(-rcoReturnDeposit,'房屋押金','押金类','支出','退房结算：退还房屋押金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoReturnDoorDeposit>0){
		jsonStrArry += "{"+insertFinancial(rcoReturnDoorDeposit,'门卡押金','押金类','支出','退房结算：退还门卡押金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoReturnDoorDeposit<0){
		jsonStrArry += "{"+insertFinancial(-rcoReturnDoorDeposit,'门卡押金','押金类','支出','退房结算：退还门卡押金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoReturnPowerDeposit>0){
		jsonStrArry += "{"+insertFinancial(rcoReturnPowerDeposit,'水电押金','押金类','支出','退房结算：退还水电押金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoReturnPowerDeposit<0){
		jsonStrArry += "{"+insertFinancial(-rcoReturnPowerDeposit,'水电押金','押金类','支出','退房结算：退还水电押金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoReturnOtherDeposit>0){
		jsonStrArry += "{"+insertFinancial(rcoReturnOtherDeposit,'其他押金','押金类','支出','退房结算：退还其他押金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoReturnOtherDeposit<0){
		jsonStrArry += "{"+insertFinancial(-rcoReturnOtherDeposit,'其他押金','押金类','支出','退房结算：退还其他押金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoLicenceFee>0){
		jsonStrArry += "{"+insertFinancial(rcoLicenceFee,'余款结算','能源类','支出','退房结算：退还租客预存款(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoLicenceFee<0){
		jsonStrArry += "{"+insertFinancial(-rcoLicenceFee,'余款结算','能源类','支出','退房结算：退还租客预存款(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	//欠结款只能收回
	if(rcoOtherChargesInTotal>0){
		jsonStrArry += "{"+insertFinancial(rcoOtherChargesInTotal,'租客还欠结款','欠结类','收入','退房结算：收取租客还欠结款(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoOtherChargesInTotal<0){
		jsonStrArry += "{"+insertFinancial(-rcoOtherChargesInTotal,'租客还欠结款','欠结类','收入','退房结算：收取租客还欠结款(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	//其他可收可支
	if(rcoWaterCombined>0){
		jsonStrArry += "{"+insertFinancial(rcoWaterCombined,'水费','能源类','收入','交清底数'+rcoWaterBase+'立方,退房结算-收取结算水费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoWaterCombined<0){
		jsonStrArry += "{"+insertFinancial(-rcoWaterCombined,'水费','能源类','支出','交清底数'+rcoWaterBase+'立方,退房结算-退还结算水费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoElectricityCombined>0){
		jsonStrArry += "{"+insertFinancial(rcoElectricityCombined,'电费','能源类','收入','交清底数'+rcoElectricityBase+'度,退房结算-收取结算电费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoElectricityCombined<0){
		jsonStrArry += "{"+insertFinancial(-rcoElectricityCombined,'电费','能源类','支出','交清底数'+rcoElectricityBase+'度,退房结算-退还结算电费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoGasCombined>0){
		jsonStrArry += "{"+insertFinancial(rcoGasCombined,'燃气费','能源类','收入','交清底数'+rcoGasBaseNumber+'立方,退房结算-收取结算燃气费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoGasCombined<0){
		jsonStrArry += "{"+insertFinancial(-rcoGasCombined,'燃气费','能源类','支出','交清底数'+rcoGasBaseNumber+'立方,退房结算-退还结算燃气费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	
	
	if(rcoHotWaterCombined>0){
		jsonStrArry += "{"+insertFinancial(rcoHotWaterCombined,'热水费','能源类','收入','交清底数'+rcoHotWaterBaseNumber+'立方,退房结算-收取结算燃气费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoHotWaterCombined<0){
		jsonStrArry += "{"+insertFinancial(-rcoHotWaterCombined,'热水费','能源类','支出','交清底数'+rcoHotWaterBaseNumber+'立方,退房结算-退还结算燃气费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoHotAirCombined>0){
		jsonStrArry += "{"+insertFinancial(rcoHotAirCombined,'暖气费','能源类','收入','交清底数'+rcoHotAirBaseNumber+'立方,退房结算-收取结算燃气费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoHotWaterCombined<0){
		jsonStrArry += "{"+insertFinancial(-rcoHotAirCombined,'暖气费','能源类','支出','交清底数'+rcoHotAirBaseNumber+'立方,退房结算-退还结算燃气费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	
	
	if(rcoPropertyCostsInTotal>0){
		jsonStrArry += "{"+insertFinancial(rcoPropertyCostsInTotal,'物业管理费','能源类','收入','退房结算：收取结算物管费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoPropertyCostsInTotal<0){
		jsonStrArry += "{"+insertFinancial(-rcoPropertyCostsInTotal,'物业管理费','能源类','支出','退房结算：退还结算物管费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoServerCost>0){
		jsonStrArry += "{"+insertFinancial(rcoServerCost,'租赁管理服务费','主营类','收入','退房结算：收取租赁管理服务费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoServerCost<0){
		jsonStrArry += "{"+insertFinancial(-rcoServerCost,'租赁管理服务费','主营类','支出','退房结算：退还租赁管理服务费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoWifiCost>0){
		jsonStrArry += "{"+insertFinancial(rcoWifiCost,'网络费','能源类','收入','退房结算：收取网络费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoWifiCost<0){
		jsonStrArry += "{"+insertFinancial(-rcoWifiCost,'网络费','能源类','支出','退房结算：退还网络费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoTvCost>0){
		jsonStrArry += "{"+insertFinancial(rcoTvCost,'电视费','能源类','收入','退房结算：收取电视费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoTvCost<0){
		jsonStrArry += "{"+insertFinancial(-rcoTvCost,'电视费','能源类','支出','退房结算：退还电视费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoBeyondTheRent>0){
		jsonStrArry += "{"+insertFinancial(rcoBeyondTheRent,'租金','主营类','收入','退房结算：退租超期，收取超期房租费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoBeyondTheRent<0){
		jsonStrArry += "{"+insertFinancial(-rcoBeyondTheRent,'租金','主营类','支出','退房结算：退还剩余多收租金(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	if(rcoBreachOfContract>0){
		jsonStrArry += "{"+insertFinancial(rcoBreachOfContract,'退房-违约金','违约类','收入','退房结算：租客违约，收取租客违约金。违约金明细：'+rcoBreachDetail)+strArray+"},";
	}else if(rcoBreachOfContract<0){
		jsonStrArry += "{"+insertFinancial(-rcoBreachOfContract,'退房-违约金','违约类','支出','退房结算：公司违约，付给租客违约金。违约金明细：'+rcoBreachDetail)+strArray+"},";
	}
	if(rcoRepairDamages>0){
		jsonStrArry += "{"+insertFinancial(rcoRepairDamages,'退房-材料费','维修类','收入','退房结算：收取维修赔偿费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}else if(rcoRepairDamages<0){
		jsonStrArry += "{"+insertFinancial(-rcoRepairDamages,'材料费','维修类','支出','退房结算：退还维修赔偿费(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
	}
	//实际应退<0，说明租客欠钱，应该生成欠结款
	if(yingtuikuan < 0){
		jsonStrArry += "{"+insertFinancial(-yingtuikuan,'应收款','财务类','支出','退房结算：垫付租客应收款(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
		jsonStrArry += "{"+insertFinancial(-yingtuikuan,'租客欠结款','欠结类','支出','退房结算：租客欠结款(租客换房：'+address+'->'+addBuildingName+' '+addAddBuilding+' '+addAddDoorplateno+')')+strArray+"},";
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
	jsonArrays=jsonStrArry;
	$("#checkOutDetails").datagrid("loadData", jsonStrArry);
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

//租客新签收支 生成收支
function setNewFinancialMoney(){
	$("#setNewFinancialMoneyDlg").dialog({
		title : '新签收款',
		top : getTop(270),
		left : getLeft(550),
		width : 550,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	$("#setNewFinancialMoneyBegin").val($("#addHrBegin").val());
	$("#setNewFinancialMoneyEnd").val($("#addHrEnd").val());

	var addSourceBegin=$('#addHrBegin').val();
	var inputArray = $(".setRenterNewFinancialDiv input");
	var setInputArray = $(".setNewFinancialMoneeyDiv input");
	for(var i = 0;i < inputArray.length -1;i++){
		if(inputArray[i].className.indexOf('payment') > -1) {
			if ($("#advanceMode").val() == 1) {
				$("#" + setInputArray[i].id).val($("#" + inputArray[i].id).val());
			} else {
				var wholeMonth = simpleCountBugMonth(addSourceBegin, parseFloat($("#" + inputArray[i].id).val()));
				$("#" + setInputArray[i].id).val(wholeMonth);
				console.log($("#" + setInputArray[i].id).val());
			}
		}else{
			$("#" + setInputArray[i].id).val($("#" + inputArray[i].id).val());
		}
	}
	$("#setNewFinancialMoneyDlg").dialog('open');
		
}
//新签租客收款 - 添加到列表
function addSetRenterNewFinancial(){
	var address = $("#address").val();
	var addDistrict=$("#exchangeHousesDlg .hsAddDistrict").eq(0).html();
	var addZone= $("#exchangeHousesDlg .hsAddZone").eq(0).html();
	var addSteet= $("#exchangeHousesDlg .hsAddStreet").eq(0).html();
	var addBuildingName=$("#exchangeHousesDlg .hsAddCommunity").eq(0).html();
	var addAddBuilding=$("#exchangeHousesDlg .hsAddBuilding").eq(0).html();
	var addAddDoorplateno=$("#exchangeHousesDlg .hsAddDoorplateno").eq(0).html();
	var jfBelongingToTheName = dataList.renterName ;
	var jfTheOwnershipType = '租客';
	var jfAccountingWhy = addDistrict
		+ addZone
		+ addSteet
		+ addBuildingName
		+ addAddBuilding
		+ addAddDoorplateno;
	var inputArry = $("#writeSetNewFinancialMoney input");
	var dataJson = [];
	var totalMoney= 0;
	for(var i=0;i<inputArry.length;i++){
		if($("#"+inputArry[i].id).val()==''){
			$("#"+inputArry[i].id).val(0.00);
		}
		if($("#"+inputArry[i].id).val()!=0){
			dataJson.push({
				jfAccountId			:	$("#renterFinancialBankNums").val(),
				jfClosedWay			:	$('#renterFinancialWay').find('option:selected').text(),
				department			:	parent._loginDepartment,
				storefront			:	parent._loginStore,
				jfAccountingWhy		:	jfAccountingWhy,
				jfTheOwnershipType	:	jfTheOwnershipType,
				jfBelongingToTheName:	jfBelongingToTheName,
				jfFinanNote 		: 	$("#"+inputArry[i].id).attr("mNote")+$("#"+inputArry[i].id).val()+"元。(租客换房："+address+"->"+addBuildingName+" "+addAddBuilding+" "+addAddDoorplateno+")",
				jfTicketNumber 		: 	'',
				jfSumMoney 			: 	$("#"+inputArry[i].id).val(),
				jfAccountingSpecies : 	$("#"+inputArry[i].id).attr("mType"),
				jfNatureOfThe		: 	'收入',
				jfPayType			:	$("#renterCheckout_rcoPayType").find("option:selected").text(),
				jfBigType			:	$("#"+inputArry[i].id).attr("bigType"),
				jfStartCycle		:	$("#setNewFinancialMoneyBegin").val(),
				jfEndCycle			:	$("#setNewFinancialMoneyEnd").val(),
				jfTheCashierPeople	:	parent._loginUserId ,
				jfRenterId			:	hrDataList.hrRenterId,
				jfBillingDate		:	formatTime(getNowFormatDate(), 2),
				jfHouse4storeId		:	$("#addHrHsId").val(),
				jfHouse4rentId		:	'',
				jfHandlers			:	parent._loginUserId,
				jfHouseId			:	$("#addHrHouseId").val(),
				jfLandlordId		:	$("#addHrLandlordId").val(),
				jfRenterId			:	hrDataList.hrRenterId,
				jfFinancialCoding	:	formatTime(getNowFormatDate(), 3)+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)+ Math.floor(Math.random() * 10),
				jfOperationRecords	:	getNowFormatDate() +parent._loginUserName+ ',添加收支记录',
			});
			
			totalMoney = accAdd(totalMoney,$("#"+inputArry[i].id).val());
		}
	}
	$("#setRenterNewFinancialMoneyTotal").html(totalMoney);
	$('.setRenterNewFinancialMoneyTotal').html(convertCurrency(totalMoney));
	$("#setRenterNewFinancialMoneyGet").val(totalMoney);
	$("#setRenterNewFinancialTable").datagrid("loadData",dataJson);
	//sumDataGrid(3);
	total(totalMoney,$('.actualRefund').html());
	$("#setNewFinancialMoneyDlg").dialog('close');
}
//选择抵扣方式
function fullAmount(){
	total($("#setRenterNewFinancialMoneyTotal").html(),$('.actualRefund').html());
}

//合计对比差额应退款/应收款
function total(newTotal,usedTotal) {
	var nature;
	if($(".shijijiesuan").html() == '原房应收款：'){
        usedTotal = -usedTotal;
    }
	if($("input[type='radio']:checked").val() == 0){
		var actualRefund = accSub(newTotal, usedTotal); // = 新房合计 - 旧房合计
		if (actualRefund >= 0) {
			$('#totalTitle').html('全额抵扣-合计差额应收款');
			nature = '收入';
		} else {
			actualRefund = Math.abs(actualRefund);
			$('#totalTitle').html('全额抵扣-合计差额应退款');
			nature = '支出';
		}
	}
	$('.total').html(actualRefund);
	var address = $("#address").val();
	var addDistrict=$("#exchangeHousesDlg .hsAddDistrict").eq(0).html();
	var addZone= $("#exchangeHousesDlg .hsAddZone").eq(0).html();
	var addSteet= $("#exchangeHousesDlg .hsAddStreet").eq(0).html();
	var addBuildingName=$("#exchangeHousesDlg .hsAddCommunity").eq(0).html();
	var addAddBuilding=$("#exchangeHousesDlg .hsAddBuilding").eq(0).html();
	var addAddDoorplateno=$("#exchangeHousesDlg .hsAddDoorplateno").eq(0).html();
	var jfBelongingToTheName = dataList.renterName ;
	var jfTheOwnershipType = '租客';
	var jfAccountingWhy = addDistrict
		+ addZone
		+ addSteet
		+ addBuildingName
		+ addAddBuilding
		+ addAddDoorplateno;
	var dataJson = [];
			dataJson.push({
				jfAccountId			:	$("#renterFinancialBankNums").val(),
				jfClosedWay			:	$('#renterFinancialWay').find('option:selected').text(),
				department			:	parent._loginDepartment,
				storefront			:	parent._loginStore,
				jfAccountingWhy		:	jfAccountingWhy,
				jfTheOwnershipType	:	jfTheOwnershipType,
				jfBelongingToTheName:	jfBelongingToTheName,
				jfFinanNote 		: 	"换房："+$('#totalTitle').html()+$('.total').html()+"元。(租客换房："+address+"->"+addBuildingName+" "+addAddBuilding+" "+addAddDoorplateno+")",
				jfTicketNumber 		: 	'',
				jfSumMoney 			: 	$('.total').html(),
				jfAccountingSpecies : 	'租金',
				jfNatureOfThe		: 	nature,
				jfPayType			:	$("#renterCheckout_rcoPayType").find("option:selected").text(),
				jfBigType			:	'主营类',
				jfStartCycle		:	formatTime(getNowFormatDate(), 2),
				jfEndCycle			:	formatTime(getNowFormatDate(), 2),
				jfTheCashierPeople	:	parent._loginUserId,
				jfRenterId			:	hrDataList.hrRenterId,
				jfBillingDate		:	formatTime(getNowFormatDate(), 2),
				jfHouse4storeId		:	$("#addHrHsId").val(),
				jfHouse4rentId		:	'',
				jfHandlers			:	parent._loginUserId,
				jfHouseId			:	$("#addHrHouseId").val(),
				jfLandlordId		:	$("#addHrLandlordId").val(),
				jfRenterId			:	hrDataList.hrRenterId,
				jfFinancialCoding	:	formatTime(getNowFormatDate(), 3)+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)+ Math.floor(Math.random() * 10),
				jfOperationRecords	:	getNowFormatDate() +parent._loginUserName+ ',添加收支记录',
			});
			
	$("#settotalNewFinancialTable").datagrid("loadData",dataJson);
}

//先验证再下一步
function validateStep3(describe, step){
	var checkFlag = 0;
	var thisStep = step - 1;
	if (thisStep > 0) {
		$('#' + describe + 'Dlg' + ' .' + describe + 'Steps' + ' .' + describe + 'Step' + thisStep + ' select[require="require"]').each(function(){
			if($(this).val()==''||$(this).val()==null){
				$(this).css('border', '1px solid red');
				checkFlag++;
			}else{
				$(this).css('border', '1px solid #a9a9a9');
			}
		});
		if(checkFlag!=0){
			myTips("有必填项未填写!","error");
			return false;
		}
	}
	
	doExchangeHouses();
}

//执行换房
function doExchangeHouses() {
	var checkFlag = 0;
	$('#addHrDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	var jrrRenewalCoding = $('#addHrContractNum').val();
	var jcdId = $('#addHrContractNumCheckoutIf').val();
	if(_contractNums==1){
		if(jcdId==""){
			$('#addHrContractNum').css('border', '1px solid red');
			myTips("请填写合同编号!","error");
			return;
		}else{
			$('#addHrContractNum').css('border', '1px solid #a9a9a9');
		}
	}
	var rcoCheckOutTheState = '退房完成';
	//退房信息
	var rcohouseId = $("#houseId").val();//房源id
	var rcoCheckOutTime = $("#exchangeHouses_rcoCheckOutTime").html();//预约退房时间
	var rcoCheckOutActualTime = $("#renterCheckout_rcoCheckOutActualTime").val();//办理时间
	var rcoARefundOfTime = $("#renterCheckout_rcoARefundOfTime").val();//退款时间
	var rcoCheckOutNature= $('#exchangeHouses_rcoCheckOutNature').html();//退房性质
	var rcoProcedures = $("#renterCheckout_rcoProcedures").val();//手续状态
	var rcoDaysOverdue = $("#renterCheckout_rcoDaysOverdue").html();//超期天数
	var rcoCheckOutReason = $("#rcoCheckOutReason").html();//退房备注
	var rcoHandler;
	if($('#handlerGetUserId').val() !='' && $('#handlerGetUserId').val() != null){
		rcoHandler = $('#handlerGetUserId').val();//经办人
	}else{
		rcoHandler = parent._loginUserId;//经办人
	}
	
	//抄表处理
	var rcoWaterBase = $("#renterCheckout_rcoWaterBase").val();//退房水读数
	var rcoLastWaterBase = $("#renterCheckout_rcoLastWaterBase").val();//结清水读数
	var rcoWaterPrice = $("#renterCheckout_rcoWaterPrice").html();//水差额
	var rcoWaterPlan = $("#water").html();//水计费方案

	var rcoElectricityBase = $("#renterCheckout_rcoElectricityBase").val();//退房电读数
	var rcoLastElectricityBase = $("#renterCheckout_rcoLastElectricityBase").val();//结清电读数
	var rcoElectricityPrice = $("#renterCheckout_rcoElectricityPrice").html();//电差额
	var rcoElectricityPlan = $("#electrit").html();//电计费方案
	
	var rcoGasBaseNumber = $("#renterCheckout_rcoGasBaseNumber").val();//退房燃气读数
	var rcoGasBaseLast = $("#renterCheckout_rcoGasBaseLast").val();//结清燃气读数
	var rcoGasPrice = $("#renterCheckout_rcoGasPrice").html();//燃气差额
	var rcoGasPlan = $("#gas").html();//燃气计费方案
	
	var rcoHotWaterBaseNumber = $("#renterCheckout_rcoHotWaterBaseNumber").val();//退房热水读数
	var rcoHotWaterBaseLast = $("#renterCheckout_rcoHotWaterBaseLast").val();//结清热水读数
	var rcoHotWaterPrice = $("#renterCheckout_rcoHotWaterPrice").html();//热水差额
	var rcoHotWaterPlan = $("#hotWater").html();//热水计费方案
	
	var rcoHotAirBaseNumber = $("#renterCheckout_rcoHotAirBaseNumber").val();//退房暖气读数
	var rcoHotAirBaseLast = $("#renterCheckout_rcoHotAirBaseLast").val();//结清暖气读数
	var rcoHotAirPrice = $("#renterCheckout_rcoHotAirPrice	").html();//暖气差额
	var rcoHotAirPlan = $("#hotAir").html();//暖气计费方案
	
	
	var rcoSysWater = $("#renterCheckout_rcoSysWater").val();//系统计算水费
	var rcoSysElectricity = $("#renterCheckout_rcoSysElectricity").val();//系统计算电费
	var rcoSysGas = $("#renterCheckout_rcoSysGas").val();//系统计算燃气费
	
	var rcoSysHotWater = $("#renterCheckout_rcoSysHotWater").val();//系统计算热水费
	var rcoSysHotAir = $("#renterCheckout_rcoSysHotAir").val();//系统计算暖气费
	
	//应缴费用
	var rcoWaterCombined = $("#renterCheckout_rcoWaterCombined").val();//水费
	var rcoElectricityCombined = $("#renterCheckout_rcoElectricityCombined").val();//电费
	var rcoGasCombined = $("#renterCheckout_rcoGasCombined").val();//燃气费
	
	var rcoHotWaterCombined = $("#renterCheckout_rcoHotWaterCombined").val();//燃气费
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
	var rcoPayType = $("#renterCheckout_rcoPayType").find("option:selected").text();//收支方式
	var rcoNumber = $('.rcoNumber').html();//票据编号
	
	//应缴、应退描述
	var yingjiao = $('#renterCheckout_rcoPayNote').val();
	var yingtui = $('#renterCheckout_rcoReturnNote').val();
	
	//维保记录
	var repairRows = $('#repairDg').datagrid('getRows');
	var rcoRepairNote = JSON.stringify(repairRows);
	
	// 房屋基本信息
	var hsId=$("#addHrHsId").val();
	var addHouseId=$("#addHrHouseId").val();
	var addHouseDictId=$("#addHrHouseDictId").val();
	var addLandlordId = $("#addHrLandlordId").val();
	var intentionalId = $("#addHrIntendedRenterId").val();
	var addSectionType=$("#exchangeHousesDlg .hsSectionType").eq(0).html();
	var addHouseOwner = $("#exchangeHousesDlg .hsHouseOwner").eq(0).html();
	var addSquare=$("#exchangeHousesDlg .hsHouseSquare").eq(0).html();
	var addDirection=$('#exchangeHousesDlg .hsHouseDirection').eq(0).html();
	var hrSplitIdentifier=$("#addHrIdentifier").val();
	var hrFlatShareLogo =  $("#addHrFlatShareLogo").val();
	var addHrHouseNote=$('#addHrHouseNote').val();
	// 地址
	var addCity= $("#exchangeHousesDlg .hsAddCity").eq(0).html();
	var addDistrict=$("#exchangeHousesDlg .hsAddDistrict").eq(0).html();
	var addZone= $("#exchangeHousesDlg .hsAddZone").eq(0).html();
	var addSteet= $("#exchangeHousesDlg .hsAddStreet").eq(0).html();
	var addBuildingName=$("#exchangeHousesDlg .hsAddCommunity").eq(0).html();
	var addAddBuilding=$("#exchangeHousesDlg .hsAddBuilding").eq(0).html();
	var addAddDoorplateno=$("#exchangeHousesDlg .hsAddDoorplateno").eq(0).html();
	
	//退房操作记录
	var operationRecords = new Object();
	operationRecords.time = getNowFormatDate();
	operationRecords.operator = parent._loginUserName;
	operationRecords.operate = "通过";
	operationRecords.result = '';
	operationRecords.remarks = ("租客换房至"+addCity+addDistrict+addZone+addSteet+addBuildingName+addAddBuilding+addAddDoorplateno).replace(/\n/g,' ');
	
	// 水电气
	var addWater=$("#addHrWater").val();
	var addCtrit=$("#addHrElect").val();
	var addGas=$("#addHrGas").val();	
	var addHotWater=$("#addHrHotWater").val();
	var addHotAir=$("#addHrHotAir").val();	

	var hrWaterPlan = $("#addHrWaterPlan").val();
	var hrElectritPlan = $("#addHrElectPlan").val();
	var hrGasPlan = $("#addHrGasPlan").val();
	var hrHotWaterPlan = $("#addHrHotWaterPlan").val();
	var hrHotAirPlan = $("#addHrHotAirPlan").val();
	// 合同
	var addSourceBegin=$('#addHrBegin').val();
	var addEnd=$('#addHrEnd').val();
	var term = getYearMonthDay(addSourceBegin, addEnd);
	var addSourceTerm = term[0]+'年'+term[1]+'月'+term[2]+'日';
	var addSigned=$('#addHrSigned').val();
	var inAdvancePay = $("#addHrInAdvancePay").val();
	var addContractType=$('#addHrContractType').find("option:selected").text();
	// 费用
	var addPrice=$('#addHrRentPrice').val();
	var jrrPaymentMethod = $("#addHrRentPaymentType").find("option:selected").text();
	var jrrManageCost=$('#addHrManageCost').val();
	var jrrManagePayment=$('#addHrManagePayment').find("option:selected").text();
	var jrrServerCost=$('#addHrServerCost').val();
	var jrrServerPayment=$('#addHrServerPayment').find("option:selected").text();
	var hrWifiCharge=$('#addHrWifiCharge').val();
	var hrTvCharge=$('#addHrTvCharge').val();
	var hrOtherPay=$('#addHrOtherPay').val();
	//押金
	var addDeposit = $('#addHrHouseDeposit').val();
	var hrDoorDeposit = $('#addHrDoorDeposit').val();
	var hrPowerDeposit = $('#addHrPowerDeposit').val();
	var hrOtherDeposit = $('#addHrOtherDeposit').val();
	//业务员
	var addFollowUserId = $('#addHrSalesmanGetUserId').val();
	var hrManagerUserId = $("#addHrManagerUserId").val();
	var hrDepartment =  $("#addHrManagerUserDept").val();
	var hrStorefront =  $("#addHrManagerUserStore").val();
	//租客
	var popIdcardJson = JSON.stringify(parent.popIdcardJson1);
	var renterName = $("#addHrRenterName").val();
	var renterPhone = $("#addHrRenterPhone").val();
	var renterIdcard = $("#addHrRenterIDCard").val();
	var popNameRemark = $("#addHrRenterNameRemark").val();
	var renterBirth = $("#addHrRenterBirth").val();
	var renterSex = $("#addHrRenterSex").val();
	var renterNation = $("#addHrRenterNation").val();
	var renterIdcardAddress = $("#addHrRenterIdcardAddress").val();
	//身份证种类
	//var popIdcardType = 身份证json
//	var identityInformation= $("#identityInformation").val();
//	if(identityInformation!=''){
//		var popIdcardJson = identityInformation;
//	}
	//定金部分
	var hsDepositAmount = $('#addHrDeposit').val();
	var hsIntentionalId = $('#addHrDepositRenterId').val();
	var hsStartDate = $('#addHrDepositDateBegin').val();
	var hsEndDate = $('#addHrDepositDateEnd').val();
	var hsDespositAccount = $('#depositFinancialBankNums').val();
	var hsSalesmanId = $('#addHrDepositFollowUserId').val();
	var advanceMode = $('#advanceMode').val();
	//业绩受益人部分
	var profitData= getProfitData('addProfit', '出房');
	
	//收支部分
	var financialRow = $('#checkOutDetails').datagrid('getRows');
	var row3 = $('#setRenterNewFinancialTable').datagrid('getRows');
	var row4 = $('#settotalNewFinancialTable').datagrid('getRows');
	
	for(var i in row3){
		financialRow.push(row3[i]);
	}
	financialRow.push(row4[0]);
	for(var i in financialRow){
		if(!financialRow[i].jfHouseId){
			financialRow[i].jfHouseId = null;
		}
	}
	console.log(financialRow);
	var financialJsonStrArry =  JSON.stringify(financialRow);
	
	var assJson = '';
	if (profitData.code < 0) {
		myTips(profitData.msg, 'error');
		hideLoading();
		return;
	} else {
		assJson = profitData.body;
	}
	//定金
	if(hsDepositAmount != '' && hsDespositAccount == ''){
		myTips('定金未设置退款账户', 'error');
		hideLoading();
		return;
	}
	var datas = $('#preGeneratingBillTable').datagrid('getRows');


	var inputArray = $(".setRenterNewFinancialDiv input");
	var jciBillJson = "";
	var paymentType = "";
	var jciMoneyTem = 0.00;
	for (var i = 0; i < inputArray.length - 1; i++) {
		if ($("#" + inputArray[i].id).val() == 0 || $("#" + inputArray[i].id).val() == "") {
			continue;
		}
		if (inputArray[i].className.indexOf('payment') > -1) {
			paymentType = '"paymentType":"' + jrrPaymentMethod + '"';
			if($("#advanceMode").val() == 2) {
				jciMoneyTem = simpleCountBugMonth(addSourceBegin, parseFloat($("#" + inputArray[i].id).val()));
			}else{
				jciMoneyTem = parseFloat($("#" + inputArray[i].id).val());
			}
			var jciMoney = '"jciMoney":"' + jciMoneyTem + '"';//收支金额
		} else {
			paymentType = '"paymentType":""';
			jciMoneyTem = $("#" + inputArray[i].id).val();
			var jciMoney = '"jciMoney":"' + jciMoneyTem + '"';//收支金额
		}
		var classification = '"classification":"' + $("#" + inputArray[i].id).attr("bigType") + '"';//收支分类
		var species = '"species":"' + $("#" + inputArray[i].id).attr("mType") + '"';//收支种类
		var jciRegisterPeople = '"jciRegisterPeople":"' + parent._loginUserId + '"';//登记人id
		var jciDepartment = '"jciDepartment":"' + parent._loginDepartment + '"';//部门id
		var jciStorefront = '"jciStorefront":"' + parent._loginStore + '"';//门店id
		var jciHouse4storeId = '"jciHouse4storeId":"' + $("#hsId").val() + '"';//未租id
		var jciHouse4rentId = '"jciHouse4storeId":"' + $("#hrId").val() + '"';//已租id
		var jciLandlordId = '"jciLandlordId":"' + $("#landlordId").val() + '"';//业主id
		var jciRenterId = '"jciRenterId":"' + $('#renterId').val() + '"';//租客id
		var jciFukuanri = '"jciFukuanri":"' + $('#addHrBegin').val() + '"';//付款日
		var jciLabelType = '"jciLabelType":"3"';//临时账单分类
		var random = '"random":"' + parseInt((Math.random() * 9 + 1) * 10000000) + '"';//随机数
		if (inputArray[i].id == "refundDeposit") {
			var jciNature = '"jciNature":"应付"';//账单性质
			var jciType = '"jciType":"租客租金"';//账单类型
			var jciState = '"jciState":"待付"';//账单状态
			var nature = '"nature":"支出"';//收支性质
		} else {
			var jciNature = '"jciNature":"应收"';//账单性质
			var jciType = '"jciType":"租客租金"';//账单类型
			var jciState = '"jciState":"待收"';//账单状态
			var nature = '"nature":"收入"';//收支性质
		}
		strArray = jciRegisterPeople + "," + jciDepartment + "," + jciStorefront + "," + jciHouse4rentId +","
			+ jciHouse4storeId + "," + jciLandlordId + "," + jciRenterId + "," + jciNature + ","
			+ jciType + "," + jciMoney + "," + jciState + "," + jciFukuanri + "," + paymentType + ","
			+ nature + "," + classification + "," + species + "," + jciLabelType + "," + random;
		jciBillJson += '{' + strArray + '},';
	}
	jciBillJson = '[' + jciBillJson.substring(0, jciBillJson.length - 1) + ']';

	var yesNo = 0;
	var taskTimeConsumingJson = JSON.stringify(datas);
	for(var i in datas){
		if(datas[i].jciMoney != addPrice){
			yesNo = 1;
			break
		}
	}
	if(yesNo == 1){
		$.messager.defaults = { ok: "继续添加", cancel: "返回检查" };
		$.messager.confirm("账单信息提示", "某期账单金额与租金不相等，继续添加或者返回检查？（当合同期限非整月时，最后一期账单金额与租金不等属正常情况）", function (dataMe) {
			$.messager.defaults = { ok: "确定", cancel: "取消" };
			if(dataMe){
				showLoading();
				$.post("../doExchangeHouses.action", {
					//新增已租部分 数据
					hrHouse4storeId 	:hsId,
					hrHouseId			:addHouseId,
					hrHouseDictId 		:addHouseDictId,
					hrLandlordId		:addLandlordId,
					hrSectionType		:addSectionType,
					hrHouseOwner		:addHouseOwner,
					hrHouseSquare		:addSquare,
					hrHouseDirection	:addDirection,
					hrSplitIdentifier	:hrSplitIdentifier,
					hrAddCity			:addCity,
					hrAddDistrict 		:addDistrict,
					hrAddZone			:addZone,
					hrAddStreet			:addSteet,
					hrAddCommunity		:addBuildingName,
					hrAddBuilding 		:addAddBuilding,
					hrAddDoorplateno 	:addAddDoorplateno,
					hrWaterVolFirst		:addWater,
					hrElectritVolFirst 	:addCtrit,
					hrGasVolFirst 		:addGas,
					
					hrHotWaterVolFirst 	:addHotWater,
					hrHotAirVolFirst 	:addHotAir,
					
					hrBeginTime			:addSourceBegin,
					hrTheTerm			:addSourceTerm,
					hrEndTime			:addEnd,
					hrHousePrice		:addPrice,
					hrHouseDeposit		:addDeposit,
					hrDoorDeposit 		:hrDoorDeposit,
					hrPowerDeposit		:hrPowerDeposit,
					hrOtherDeposit		:hrOtherDeposit,
					hrPaymentType 		:jrrPaymentMethod,
					hrUserId			:parent._loginUserId,
					hrAdminUserId 		:addFollowUserId,
					hrHouseNote			:addHrHouseNote,
					hrStorefront		:hrStorefront,
					hrDepartment		:hrDepartment,
					hrWaterPlan			:hrWaterPlan,
				    hrElectritPlan		:hrElectritPlan,
				    hrGasPlan			:hrGasPlan,
				    
				    hrHotWaterPlan		:hrHotWaterPlan,
				    hrHotAirPlan		:hrHotAirPlan,
				    
				    
				    hrWifiCharge		:hrWifiCharge,
				    hrTvCharge			:hrTvCharge,
				    hrOtherPay			:hrOtherPay,
				    hrManagerUserId		:hrManagerUserId,
				    hrFlatShareLogo		:hrFlatShareLogo,
				    //新增租客部分 数据
				    renterPopName 		: renterName,
					renterPopTelephone 	: renterPhone,
					renterPopIdcard 	: renterIdcard,
					renterUserId		: parent._loginUserId,
					renterDepartment	: parent._loginDepartment,
					renterStorefront	: parent._loginStore,
					popNameRemark       : popNameRemark,
					popBirth			: renterBirth,
					popNation			: renterNation,
					popIdcardAddress	: renterIdcardAddress,
					popSex				: renterSex,
					popIdcardJson		: popIdcardJson,
					//新增租客合约部分 数据
					jrrHouse4storeId	: hsId,
					jrrLandlordId		: addLandlordId,
					jrrSignedTime 		: addSigned,
					jrrBeginTime 		: addSourceBegin,
					jrrEndTime 			: addEnd,
					jrrUserId 			: parent._loginUserId,
					jrrDepartment		: parent._loginDepartment,
					jrrStorefront		: parent._loginStore,
					jrrContractType 	: addContractType,
					jrrTheTerm 			: addSourceTerm,
					jrrInAdvancePay 	: inAdvancePay,
					jrrPaymentMethod 	: jrrPaymentMethod,
					jrrMoney 			: addPrice,
					jrrRenewalCoding	: jrrRenewalCoding,
					jcdId				: jcdId,
					adminUser			: addFollowUserId,
					jrrManageCost		: jrrManageCost,
					jrrServerCost		: jrrServerCost,
					jrrManagePayment	: jrrManagePayment,
					jrrServerPayment	: jrrServerPayment,
					taskTimeConsumingJson : taskTimeConsumingJson,
					advanceMode         : advanceMode,
					jrrTypeOfContract	: 1,
					//意向人修改
					ipId				: intentionalId,
					//已租房业绩受益人
					jsonArray			: assJson,
					//资产
					moveSaId			: _moveSaId,
					moveAsset			: JSON.stringify(_moveAsset),
					att					: $("#att").val(),
					att2					: $("#att2").val(),
					
					jhfDepartment			:parent._loginDepartment,
					jhfStorefront			:parent._loginStore,
					jhfHouse4storeId 		: hsId,
					jhfHouseId				: addHouseId,
					jhfFollowResult 		: '签约成功',
					jhfPaymentWay 			: '系统跟进',
					jhfUserId 				: parent._loginUserId,
					
					rcoRentId				:hrDataList.hrId,
					rcoStoreId				:hrDataList.hrHouse4storeId,
					rcohouseId				:rcohouseId,
					rcoRenterId				:hrDataList.hrRenterId,
					rcoLandlordId			:hrDataList.hrLandlordId,
					rcoApplyUser			: parent._loginUserId,
					rcoNumber				:rcoNumber,
					rcoCheckOutTime			:rcoCheckOutTime,
					rcoCheckoutAccount		: rcoCheckoutAccount,
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
					rcoOperationRecords		:JSON.stringify(operationRecords),
					rcoPayType				:rcoPayType,
					jsonStrArry				:financialJsonStrArry,
					jciBillJson				:jciBillJson,
				},function(data){
					if(data.code<0){
						if(data.code < 0){
							myTips(data.msg,"error");
						}
						hideLoading();
						return;
					}
					else{
						_indexNum[0] = 0;
						parent.querySourceInfo(1,0);
						myTips("换房成功！","success");

						//yzs 写条查询语句返回主键id
						$.post("../selectRentByTJ.action", {
							hrHouse4storeId:hsId,
							hrRenterId:hrDataList.hrRenterId,
							hrLandlordId:addLandlordId,
							hrLeaseState:'在租'
						}, function(data) {
							if(data.code<0){
								console.log("查询失败");
							}else{
								///yzs 注销原有房卡  hs未租选中的id赋给hrid   hr已租是数据库返回的id
								doCancelMK(hrDataList.hrId);
							}
						});
						hideLoading();
						//延迟加载
						setTimeout(function() {
							parent.$('#exchangeHousesDlg').dialog('close');
						}, 1000);
					}
				});
			}else {
				hideLoading();
				return;
			}
		});
	}else{
		showLoading();
		$.post("../doExchangeHouses.action", {
			//新增已租部分 数据
			hrHouse4storeId 	:hsId,
			hrHouseId			:addHouseId,
			hrHouseDictId 		:addHouseDictId,
			hrLandlordId		:addLandlordId,
			hrSectionType		:addSectionType,
			hrHouseOwner		:addHouseOwner,
			hrHouseSquare		:addSquare,
			hrHouseDirection	:addDirection,
			hrSplitIdentifier	:hrSplitIdentifier,
			hrAddCity			:addCity,
			hrAddDistrict 		:addDistrict,
			hrAddZone			:addZone,
			hrAddStreet			:addSteet,
			hrAddCommunity		:addBuildingName,
			hrAddBuilding 		:addAddBuilding,
			hrAddDoorplateno 	:addAddDoorplateno,
			hrWaterVolFirst		:addWater,
			hrElectritVolFirst 	:addCtrit,
			hrGasVolFirst 		:addGas,
			
			hrHotWaterVolFirst 	:addHotWater,
			hrHotAirVolFirst 	:addHotAir,
			
			
			hrBeginTime			:addSourceBegin,
			hrTheTerm			:addSourceTerm,
			hrEndTime			:addEnd,
			hrHousePrice		:addPrice,
			hrHouseDeposit		:addDeposit,
			hrDoorDeposit 		:hrDoorDeposit,
			hrPowerDeposit		:hrPowerDeposit,
			hrOtherDeposit		:hrOtherDeposit,
			hrPaymentType 		:jrrPaymentMethod,
			hrUserId			:parent._loginUserId,
			hrAdminUserId 		:addFollowUserId,
			hrHouseNote			:addHrHouseNote,
			hrStorefront		:hrStorefront,
			hrDepartment		:hrDepartment,
			hrWaterPlan			:hrWaterPlan,
		    hrElectritPlan		:hrElectritPlan,
		    hrGasPlan			:hrGasPlan,
		    
		    hrHotWaterPlan		:hrHotWaterPlan,
		    hrHotAirPlan		:hrHotAirPlan,
		    
		    hrWifiCharge		:hrWifiCharge,
		    hrTvCharge			:hrTvCharge,
		    hrOtherPay			:hrOtherPay,
		    hrManagerUserId		:hrManagerUserId,
		    hrFlatShareLogo		:hrFlatShareLogo,
		    //新增租客部分 数据
		    renterPopName 		: renterName,
			renterPopTelephone 	: renterPhone,
			renterPopIdcard 	: renterIdcard,
			renterUserId		: parent._loginUserId,
			renterDepartment	: parent._loginDepartment,
			renterStorefront	: parent._loginStore,
			popNameRemark       : popNameRemark,
			popBirth			: renterBirth,
			popNation			: renterNation,
			popIdcardAddress	: renterIdcardAddress,
			popSex				: renterSex,
			popIdcardJson		: popIdcardJson,
			//新增租客合约部分 数据
			jrrHouse4storeId	: hsId,
			jrrLandlordId		: addLandlordId,
			jrrSignedTime 		: addSigned,
			jrrBeginTime 		: addSourceBegin,
			jrrEndTime 			: addEnd,
			jrrUserId 			: parent._loginUserId,
			jrrDepartment		: parent._loginDepartment,
			jrrStorefront		: parent._loginStore,
			jrrContractType 	: addContractType,
			jrrTheTerm 			: addSourceTerm,
			jrrInAdvancePay 	: inAdvancePay,
			jrrPaymentMethod 	: jrrPaymentMethod,
			jrrMoney 			: addPrice,
			jrrRenewalCoding	: jrrRenewalCoding,
			jcdId				: jcdId,
			adminUser			: addFollowUserId,
			jrrManageCost		: jrrManageCost,
			jrrServerCost		: jrrServerCost,
			jrrManagePayment	: jrrManagePayment,
			jrrServerPayment	: jrrServerPayment,
			taskTimeConsumingJson : taskTimeConsumingJson,
			advanceMode         : advanceMode,
			jrrTypeOfContract	: 1,
			//意向人修改
			ipId				: intentionalId,
			//已租房业绩受益人
			jsonArray			: assJson,
			//资产
			moveSaId			: _moveSaId,
			moveAsset			: JSON.stringify(_moveAsset),
			att					: $("#att").val(),
			att2					: $("#att2").val(),
			
			jhfDepartment			:parent._loginDepartment,
			jhfStorefront			:parent._loginStore,
			jhfHouse4storeId 		: hsId,
			jhfHouseId				: addHouseId,
			jhfFollowResult 		: '签约成功',
			jhfPaymentWay 			: '系统跟进',
			jhfUserId 				: parent._loginUserId,
			
			rcoRentId				:hrDataList.hrId,
			rcoStoreId				:hrDataList.hrHouse4storeId,
			rcoRenterId				:hrDataList.hrRenterId,
			rcoLandlordId			:hrDataList.hrLandlordId,
			rcoApplyUser			: parent._loginUserId,
			rcoNumber				:rcoNumber,
			rcoCheckOutTime			:rcoCheckOutTime,
			rcoCheckoutAccount		: rcoCheckoutAccount,
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
			
			rcoHotWaterCombined		:rcoHotWaterCombined,
			rcoHotAirCombined		:rcoHotAirCombined,
			
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
			rcoOperationRecords		:JSON.stringify(operationRecords),
			rcoPayType				:rcoPayType,
			jsonStrArry				:financialJsonStrArry,
			jciBillJson				:jciBillJson,
		},function(data){
			if(data.code<0){
				if(data.code < 0){
					myTips(data.msg,"error");
				}
				hideLoading();
				return;
			}
			else{
				_indexNum[0] = 0;
				parent.querySourceInfo(1,0);
				myTips("换房成功！","success");

				//yzs 写条查询语句返回主键id
				$.post("../selectRentByTJ.action", {
					hrHouse4storeId:hsId,
					hrRenterId:hrDataList.hrRenterId,
					hrLandlordId:addLandlordId,
					hrLeaseState:'在租'
				}, function(data) {
					if(data.code<0){
						console.log("查询失败");
					}else{
						///yzs 注销原有房卡  hs未租选中的id赋给hrid   hr已租是数据库返回的id
						doCancelMK(hrDataList.hrId);
					}
				});
				hideLoading();
				//延迟加载
				setTimeout(function() {
					parent.$('#exchangeHousesDlg').dialog('close');
				}, 1000);
			}
		});
	}
}


/**
 *  yzs 执行 注销/退卡
 */
function doCancelMK(jdcHrId) {
	////yzs 所需参数
	//1.找到hr_id查找出 智能门卡doorCar表的信息    测试租户 504
	//2.注销门卡

	var hrId = jdcHrId;
	var data = {
		jdcHrId : hrId,
		jdcState : "使用中",
	};

	$.ajax({
		type : "post",
		url : "../listDoorCard.action",
		data : data,
		dataType : "json",
		success : function(result) {
			if (result.code == 1) {
				var data = result.body;

				//popId=data.jdcPopId;
				for(var i in data){
					var jdcDeviceId = data[i].jdcDeviceId;
					var type = 1;
					var jdcState = "注销";
					var id = data[i].id;
					var popId = data[i].jdcPopId;
					var jdcCardId = data[i].jdcCardId;
					var jdcPassword = data[i].jdcPassword;
					var jdcEquipmentType = data[i].jdcEquipmentType;
					var jdcOperatingRecording = JSON.parse(data[i].jdcOperatingRecording.substring(
						1, data[i].jdcOperatingRecording.length - 1));
					var operatingRecording = {
						text : "门卡" + jdcState + "：为客户 " + data[i].popName + jdcState + ","
							+ data[i].devNickname + "的门卡.卡号为" + data[i].jdcCardNum + ".",
						time : new Date().format("yyyy-MM-dd hh:mm:ss"),
						type : "系统跟进",
						registrantName : _loginUserName
					};
					if((jdcCardId==null||jdcCardId=="")&&jdcPassword!=null){
						operatingRecording = {
							text : "密码" + jdcState + "：为客户 " + row.popName + jdcState + ","
								+ row.devNickname + "的门锁.密码为" + row.jdcPassword + ".",
							time : new Date().format("yyyy-MM-dd hh:mm:ss"),
							type : "系统跟进",
							registrantName : _loginUserName
						}
					}
					jdcOperatingRecording.push(operatingRecording);
					jdcOperatingRecording = JSON.stringify(jdcOperatingRecording);
					//发送注销门卡请求
					$.ajax({
						type : "post",
						url : "../updateDoorCard.action",
						data : {
							jdcEquipmentType:jdcEquipmentType,
							popId :popId,
							id : id,
							jdcState : jdcState,
							jdcOperatingRecording : jdcOperatingRecording,
							jdcCardId : jdcCardId,
							jdcDeviceId : jdcDeviceId,
							jdcPassword:jdcPassword,
							type : type
						},
						dataType : "json",
						success : function(result) {
							if (result.code == 1) {
								myTips("成功注销门卡", "success");
							} else {
								myTips(result.msg, "error");
							}
						}
					});
					/////////////////**//////////////////////
				}
			} else {
				//没有门锁卡
				console.log(result.msg);
			}
		}
	});
}

function doPrint(){
	var hsId=$("#addHrHsId").val();
	var addHouseId=$("#addHrHouseId").val();
	var addLandlordId = $("#addHrLandlordId").val();
	// var printArray = '{' + jsonArrays.replace(/[\r\n]/g,"") + '}';
	var printArray2 =JSON.stringify(jsonArrays);
	console.log(printArray2);
	var printArray="";
	var wuyedizhi=$('.hsAddCommunity').html()+" "+$('.hsAddBuilding').html()+" "+$('.hsAddDoorplateno').html();
	printArray +=  'yezhuzuke'+':"'+ ""+'",';//业主租客
    printArray += 'wuyedizhi'+':"'+ wuyedizhi+'",';
	printArray +=  'tuifangbianhao' + ':"' + $('.rcoNumber').html()+ '",';//换房编号
	printArray +=  'name'+':"'+ $('#addHrRenterName').val()+'",';//
	printArray +=  'jingbanren' + ':"' +$('#handlerShowUserInfo').val()+ '",';
	printArray +=  'tuifangxingzhi' + ':"' + "租客换房"+ '",';//换房性质
	printArray +=  'tuifangshouxu'+':"'+ "正常"+'",';
	printArray +=  'tuifangshijian' + ':"' + $('#renterCheckout_rcoARefundOfTime').val()+ '",';
	printArray +=  'qizuri' + ':"' + $('#addHrBegin').val()+ '",';
	printArray +=  'jiesuri'+':"'+ $('#addHrEnd').val()+'",';
	printArray +=  'tuikuanshijian' + ':"' + $('#renterCheckout_rcoARefundOfTime').val()+ '",';
	if($('#shijijiesuan').html()=="原房应退款："){
		printArray +='yingtuifeiyong' +':"'+$('.actualRefund').html()+ '",';
        printArray +=  'yingjiaofeiyong' + ':"' + $('#setRenterNewFinancialMoneyTotal').html()+ '",';
    }else{
        printArray +='yingtuifeiyong' +':"'+0+ '",';
        var yingjiaofeiyong =parseFloat($('#setRenterNewFinancialMoneyTotal').html())+parseFloat($('.actualRefund').html());
        printArray +=  'yingjiaofeiyong' + ':"' + yingjiaofeiyong + '",';
    }
	printArray +=  'shoukuanren'+':"'+ ""+'",';
	printArray +=  'zhanghuhaoma' + ':"' + ""+ '",';

	printArray +=  'shijiyingtuikuan'+':"'+ $('.total').html()+'",';
	printArray +=  'shijiyingtuikuandaxie' + ':"' + convertCurrency(parseFloat($('.total').html()))+ '",';
	printArray='{'+printArray+'}';
	//生成历史票据
	$.post("../insertHistoryPrint.action", {
		jhpJson : printArray,
		jhpType : "租客换房账单",
		jhpTitle : getNowFormatDate() + " 租客换房账单",
		jhpHouse4rentId : hrDataList.hrId,
		jhpHouse4storeId : hsId,
		jhpHouseId : addHouseId,
		jhpRenterId : hrDataList.hrRenterId,
		jhpLandlordId : addLandlordId,
		jhpUserId : _loginUserId,
	}, function(data) {
		doPrintInExeFor(printArray,3);
	});

}


function doPrintInExeFor(printArray,t){
	// alert(printArray);
	console.log("print==="+printArray);
	var myWindow = window.open();
	if (myWindow == null) {
		$.messager.alert('提示', '打印失败，原因：浏览器阻止了弹出式窗口，请设置浏览器为允许弹出式窗口', 'warning');
		return;
	}
	if(t==3){
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>换房出账申请单</title><style>        	table td {            	border: 1px solid #888;            border-top:none;            white-space: nowrap;            padding: 1px 0 0 0;			font-size: 12px;        }                table {                        table-layout: fixed;            width: 770px;            font-size: 12px;            margin: 0 10px        }                #body {            border: 1px solid black;            width: 790px;            height: 450px        }                #title {            font-size: 18px;            text-align: center;            font-weight: bold        }                #header {            font-size: 16px;            text-align: center;            margin: 10px;            font-weight: bold        }                #footer {            margin: 20px 20px        }                #footer div {            float: left;            width: 20%;            font-weight: bold        }</style><script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script></head><body><div id=\"body\" style=\"\"><div id=\"title\" style=\"\">    {{body.yezhuzuke}}换房出账审批单</div><div style=\"text-align:right;font-size: 14px;margin:0 20px 0 0;\">    换房编号：{{body.tuifangbianhao}}</div><table align=\"center\" cellspacing=\"0\" style=\"margin-top:2px;border-top: 1px solid #888;\"><tbody><tr align=\"center\"><td>房屋地址</td><td>姓名</td><td>经办人</td></tr><tr align=\"center\"><td>{{body.wuyedizhi}}</td><td>{{body.name}}</td><td>{{body.jingbanren}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>换房性质</td><td>换房手续</td><td>换房时间</td></tr><tr align=\"center\"><td>{{body.tuifangxingzhi}}</td><td>{{body.tuifangshouxu}}</td><td>{{body.tuifangshijian}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>合约开始日</td><td>合约结束日</td><td>退款时间</td></tr><tr align=\"center\"><td>{{body.qizuri}}</td><td>{{body.jiesuri}}</td><td>{{body.tuikuanshijian}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>应缴费用(元)</td><td>应退费用(元)</td></tr><tr align=\"center\"><td style=\"white-space: normal;\">{{body.yingjiaofeiyong}}</td><td style=\"white-space: normal;\">{{body.yingtuifeiyong}}</td></tr> 	</tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td style=\"width:33%\">{{body.yezhuzuke}}结算账户</td><td style=\"width:66%\">{{body.yinhangmingcheng}} - {{body.shoukuanren}} - {{body.zhanghuhaoma}}</td></tr><tr align=\"center\"><td style=\"width:33%\">实际结算(元)</td><td style=\"width:66%;font-weight: bold\">{{body.shijiyingtuikuan}}(大写 :{{body.shijiyingtuikuandaxie}})</td></tr> 	</tbody></table><div style=\"margin: 3px 20px\"><span style=\"font-size: 14px\">换房处理人：</span><span style=\"font-size: 14px; margin-left: 100px\">审核人：</span><span style=\"font-size: 14px; margin-left: 100px\">复核人：</span><span style=\"font-size: 14px; margin-left: 100px\">同意出账人：</span></div></div><script>		var body2="+printArray+"	</script><script>		var vm;				vm = new Vue({		  el: \"#body\",		  data: {			body:{							}		  }		});		vm.body = body2;		Vue.nextTick(print);		function print() { document.execCommand(\"print\") }</script></body></html>')");
	}

}
