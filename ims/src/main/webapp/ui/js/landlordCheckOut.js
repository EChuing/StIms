function energy(){
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
//打开业主退房窗口
function landlordCheckOutDlg(){
	$('#landlordCheckOutDlg').dialog({
		title : '业主退房',
		top : getTop(660),
		left : getLeft(850),
		width : 850,
		height : 660,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#landlordCheckOutDlg [clear="clear"]').val('');
			$('#landlordCheckOutDlg [clear="clear"]').html('');
			$('#landlordCheckOutDlg [choose="choose"]').val('');
			$('#landlordCheckOutDlg [require="require"]').css('border', '1px solid #a9a9a9');
		}
	});
	
	//导入未租房信息
	var row = $('#landlordCheckOutDg').datagrid('getSelected');
	for(var i in row){
		if(row[i]==null){
			row[i]='';
		}
		$("#landlordCheckOutDlg span."+i).html(row[i]);
	}
	
	//查退房表数据并展示到相应表格中
	$.post("../selectNotRentCheckOut.action", {
		nrcStoreId :row.hsId
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		data = data.body[0];
		for(var i in data){
			$("#landlordCheckOutDlg span#landlordCheckout_"+i).html(data[i]);
			$("#landlordCheckOutDlg input#landlordCheckout_"+i).val(data[i]);
			$("#landlordCheckOutDlg select#landlordCheckout_"+i).val(data[i]);
			$("#landlordCheckOutDlg textarea#landlordCheckout_"+i).val(data[i]);
			$("#landlordCheckOutDlg span."+i).html(data[i]);
			$("#landlordCheckOutDlg textarea."+i).val(data[i]);
		}
		//经办人
		$('#landHandlerShowUserInfo').val(data.nrcHandlerName);
		//计算实际退款金额
		calActualRefundLandlord(data);
		//计算出账申请单上的汇总金额
		calTotalRentPrint(data);
		//公司收付款账号
		if(data.nrcFinancialAccountTable!=null && data.nrcFinancialAccountTable!=""){
			$.post("../selectNamePublic.action", {
				faId:data.nrcFinancialAccountTable,
			}, function(accountData) {
				for(var i in _acountType){
					if(_acountType[i]==accountData.body[0].faPaymentType){
						$("#landlordFinancialWay").val(i);
						$("#landlord2FinancialWay").val(i);
					}	
				}
				changeWay("landlord",data.nrcFinancialAccountTable);
				changeWay("landlord2",data.nrcFinancialAccountTable);
			});
		}
		//如果“未办理手续”,业主账号无需填写,直接禁止输入,有内容的不能修改!
		changeNrcProcedures();
		//维修表
		if (data.nrcRepairNote != undefined && data.nrcRepairNote != '') {
			$('#repairLandlordDg').datagrid('loadData', JSON.parse(data.nrcRepairNote.getRealJsonStr()));
		} else {
			$('#repairLandlordDg').datagrid('loadData', []);
		}
//		if (data.rcoRepairNote != undefined && data.rcoRepairNote != '') {
//			$('#repairDg').datagrid('loadData', JSON.parse(data.rcoRepairNote.getRealJsonStr()));
//		} else {
//			$('#repairDg').datagrid('loadData', []);
//		}
		//只有正办理退房时才去执行的操作
		if (data.nrcCheckOutTheState == '正办理退房') {
			//欠结款、预存款只显示一个
			if (row.hsBase == 0) {
				$("#yezhuqianjie").show();
				$("#yezhuyucun").hide();
				$("#landlordCheckout_arrears").val(0);//欠结款
				$("#landlordCheckout_savingsAccount").val(0);//预存款
			} else if (row.hrBase > 0) {
				$("#yezhuqianjie").show();
				$("#yezhuyucun").hide();
				$("#landlordCheckout_arrears").val(row.hsBase);
				$("#landlordCheckout_savingsAccount").val(0);
			} else {
				$("#yezhuqianjie").hide();
				$("#yezhuyucun").show();
				$("#landlordCheckout_arrears").val(0);
				$("#landlordCheckout_savingsAccount").val(Math.abs(row.hsBase));
			}
			//没有暂存的打开自动刷新
			if (data.nrcSave != '暂存') {
				//水电抄表，没有暂存时去未租查最新读数
				//有抄表记录取抄表记录的值，没抄表记录默认填0
				//只填上次读数
				if(row.hsMeterReadingRecord != null && row.hsMeterReadingRecord != '' ){
					var meterReadingRecord = eval('(' + row.hsMeterReadingRecord.getRealJsonStr() + ')');//读数记录
					var waterLast = meterReadingRecord.water.lastReading;//上次水读数
					var electritLast = meterReadingRecord.electrit.lastReading;//上次电读数
					var gasLast = meterReadingRecord.gas.lastReading;//上次气读数
					var hotwaterLast = 0;
					if(meterReadingRecord.hotwater != undefined) {
						hotwaterLast = meterReadingRecord.hotwater.lastReading;//上次热水读数
					}
					var hotairLast = 0;
					if(meterReadingRecord.hotwater != undefined) {
						hotairLast = meterReadingRecord.hotair.lastReading;//上次暖气读数
					}
					$("#landlordCheckout_nrcWaterVolLast").val(waterLast);
					$("#landlordCheckout_nrcElectritVolLast").val(electritLast);
					$("#landlordCheckout_nrcGasVolLast").val(gasLast);
					$("#landlordCheckout_nrcHotWaterVolLast").val(hotwaterLast);
					$("#landlordCheckout_nrcHotAirVolLast").val(hotairLast);
					
					//计算水电读数差值
					calwegdiffLand();
				}else{
					$("#landlordCheckout_nrcWaterVolLast").val(0);
					$("#landlordCheckout_nrcElectritVolLast").val(0);
					$("#landlordCheckout_nrcGasVolLast").val(0);
					$("#landlordCheckout_nrcHotWaterVolLast").val(0);
					$("#landlordCheckout_nrcHotAirVolLast").val(0);
					//计算水电读数差值
					calwegdiffLand();
				}
				//自动刷新
//				reflashLandlord();
			}
			//业主结算-自动刷新计算的租金还没算出来，没法结算
//			yezhujiesuan();
		}
		//操作记录
		var operatorArray = [];
		if (data.nrcOperationRecords != null) {
			operatorArray = JSON.parse('[' + data.nrcOperationRecords.getRealJsonStr() + ']');
			for (var i=0;i<operatorArray.length;i++) {
				if (operatorArray[i].remarks != '') {
					operatorArray[i].content = operatorArray[i].operate + operatorArray[i].result + ',备注：' + operatorArray[i].remarks;
				} else {
					operatorArray[i].content = operatorArray[i].operate + operatorArray[i].result;
				}
				
			}
		}
		$(".landlordOperatorDg").datagrid();
		$(".landlordOperatorDg").datagrid('loadData', operatorArray);
	});
	//按钮的显示和隐藏
	if(row.hsState=='正办理退房'){
		//所有框不允许修改
		$('[data-read="1"]').attr("disabled",true);
		gotoStep('landlordCheckOut', 1);
	}else if(row.hsState=='退房待审核'){
		$(".landlordCheckoutOne").show();//审核
		$(".landlordCheckoutTwo").hide();//复核
		$(".landlordRefundAccount").hide();//公司收付款账户
		gotoStep('landlordCheckOut', 3);
	}else if(row.hsState=='退房待复核'){
		$(".landlordCheckoutOne").hide();//审核
		$(".landlordCheckoutTwo").show();//复核
		$(".landlordRefundAccount").show();//公司收付款账户
		gotoStep('landlordCheckOut', 3);
	}else if(row.hsState=='退房待出账'){
		$(".recoveryLandlordCheckOut").show();//恢复为正办理退房
		$(".landlordCheckoutPrint").show();//打印出账申请单
		$(".landlordCheckoutFinancial").show();//出账
		gotoStep('landlordCheckOut', 4);
	}else if(row.hsState=='退房完成'){
		$(".recoveryLandlordCheckOut").hide();//恢复为正办理退房
		$(".landlordCheckoutPrint").show();//打印出账申请单
		$(".landlordCheckoutFinancial").hide();//出账
		gotoStep('landlordCheckOut', 4);
	}
	
	$('#landlordCheckOutDlg').dialog('open');
	energy();
}

//下一步
function landNextStep(){
	if (!validateStep('landlordCheckOut', 2)) {
		return;
	}
	//维保记录
	var rows = $('#repairLandlordDg').datagrid('getRows');
	$('#repairLandlordDg').datagrid('loadData', rows);
	if ($('#landlordCheckout_nrcSave').val() != '暂存') {
		reflashLandlord();
	}
}

// 计算租金、维保费
function calVarietyChargeLandlord(){
	var row = $('#landlordCheckOutDg').datagrid('getSelected');
	//计算租金
	var nrcActualCheckOutTime = $("#landlordCheckout_nrcActualCheckOutTime").val();//实际退房时间
	$.post('../selectLandlordCheckoutRent.action', {
		nrcStoreId: row.hsId,
		nrcActualCheckOutTime:nrcActualCheckOutTime,
		nrcJrlEndTime:row.jrlEndTime,
		nrcHsInPrice:row.hsInPrice
	}, function(data){
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		data = data.body[0];
		$("#landlordCheckout_nrcRemainingRental").val(data.nrcRemainingRental);
	});
	//维保费用
	var row2 = $('#repairLandlordDg').datagrid('getRows');
	var nrcMaintenanceCompensation = 0;
	for (var i in row2) {
		nrcMaintenanceCompensation = mySum(nrcMaintenanceCompensation, row2[i].repTollRp);
	}
	$("#landlordCheckout_nrcMaintenanceCompensation").val(nrcMaintenanceCompensation);
}
//计算水电读数差值
function calwegdiffLand(){
	//水
	var wt = $('#landlordCheckout_nrcWaterVolFirst').val();
	var wl = $('#landlordCheckout_nrcWaterVolLast').val();
	if (wt != '' && wl != '') {
		$('#landlordCheckout_nrcWaterDiff').html(accSub(wt,wl));
	} else {
		$('#landlordCheckout_nrcWaterDiff').html('');
	}
	//电
	var et = $('#landlordCheckout_nrcElectritVolFirst').val();
	var el = $('#landlordCheckout_nrcElectritVolLast').val();
	if (et != '' && el != '') {
		$('#landlordCheckout_nrcElectritDiff').html(accSub(et,el));
	} else {
		$('#landlordCheckout_nrcElectritDiff').html('');
	}
	//气
	var gt = $('#landlordCheckout_nrcGasVolFirst').val();
	var gl = $('#landlordCheckout_nrcGasVolLast').val();
	if (gt != '' && gl != '') {
		$('#landlordCheckout_nrcGasDiff').html(accSub(gt,gl));
	} else {
		$('#landlordCheckout_nrcGasDiff').html('');
	}
	//热水
	var hwt = $('#landlordCheckout_nrcHotWaterVolFirst').val();
	var hwl = $('#landlordCheckout_nrcHotWaterVolLast').val();
	if (hwt != '' && hwl != '') {
		$('#landlordCheckout_nrcHotWaterDiff').html(accSub(hwt,hwl));
	} else {
		$('#landlordCheckout_nrcHotWaterDiff').html('');
	}
	//暖气
	var hat = $('#landlordCheckout_nrcHotAirVolFirst').val();
	var hal = $('#landlordCheckout_nrcHotAirVolLast').val();
	if (hat != '' && hal != '') {
		$('#landlordCheckout_nrcHotAirDiff').html(accSub(hat,hal));
	} else {
		$('#landlordCheckout_nrcHotAirDiff').html('');
	}
	
}
//计算水电费用
function calwegpriceLand(){
	var nrcWaterDiff = $('#landlordCheckout_nrcWaterDiff').html();
	var nrcWaterUnitPrice = $('#landlordCheckout_nrcWaterUnitPrice').val();
	if (nrcWaterDiff != '' && nrcWaterUnitPrice != '') {
		var nrcWaterCombined = -accMul(nrcWaterDiff, nrcWaterUnitPrice);
		$('#landlordCheckout_nrcWaterCombined').val(nrcWaterCombined);
		$('.nrcWaterCombined').html(nrcWaterCombined);
	}
	var nrcElectritDiff = $('#landlordCheckout_nrcElectritDiff').html();
	var nrcElectritUnitPrice = $('#landlordCheckout_nrcElectritUnitPrice').val();
	if (nrcElectritDiff != '' && nrcElectritUnitPrice != '') {
		var nrcElectricityCombined = -accMul(nrcElectritDiff, nrcElectritUnitPrice);
		$('#landlordCheckout_nrcElectricityCombined').val(nrcElectricityCombined);
		$('.nrcElectricityCombined').html(nrcElectricityCombined);
	}
	var nrcGasDiff = $('#landlordCheckout_nrcGasDiff').html();
	var nrcGasUnitPrice = $('#landlordCheckout_nrcGasUnitPrice').val();
	if (nrcGasDiff != '' && nrcGasUnitPrice != '') {
		var nrcGasCombined = -accMul(nrcGasDiff, nrcGasUnitPrice);
		$('#landlordCheckout_nrcGasCombined').val(nrcGasCombined);
		$('.nrcGasCombined').html(nrcGasCombined);
	}
	var nrcHotWaterDiff = $('#landlordCheckout_nrcHotWaterDiff').html();
	var nrcHotWaterUnitPrice = $('#landlordCheckout_nrcHotWaterUnitPrice').val();
	if (nrcHotWaterDiff != '' && nrcHotWaterUnitPrice != '') {
		var nrcHotWaterCombined = -accMul(nrcHotWaterDiff, nrcHotWaterUnitPrice);
		$('#landlordCheckout_nrcHotWaterCombined').val(nrcHotWaterCombined);
		$('.nrcHotWaterCombined').html(nrcHotWaterCombined);
	}
	var nrcHotAirDiff = $('#landlordCheckout_nrcHotAirDiff').html();
	var nrcHotAirUnitPrice = $('#landlordCheckout_nrcHotAirUnitPrice').val();
	if (nrcHotAirDiff != '' && nrcHotAirUnitPrice != '') {
		var nrcHotAirCombined = -accMul(nrcHotAirDiff, nrcHotAirUnitPrice);
		$('#landlordCheckout_nrcHotAirCombined').val(nrcHotAirCombined);
		$('.nrcHotAirCombined').html(nrcHotAirCombined);
	}
}
//计算总费用并生成明细
function calTotalChargeLand(){
	var shuibenci = $('#landlordCheckout_nrcWaterVolFirst').val();
	var shuishangci = $('#landlordCheckout_nrcWaterVolLast').val();
	var shuichazhi = $('#landlordCheckout_nrcWaterDiff').html();
	var dianbenci = $('#landlordCheckout_nrcElectritVolFirst').val();
	var dianshangci = $('#landlordCheckout_nrcElectritVolLast').val();
	var dianchazhi = $('#landlordCheckout_nrcElectritDiff').html();
	var qibenci = $('#landlordCheckout_nrcGasVolFirst').val();
	var qishangci = $('#landlordCheckout_nrcGasVolLast').val();
	var qichazhi = $('#landlordCheckout_nrcGasDiff').html();
	
	var hotwaterbenci = $('#landlordCheckout_nrcHotWaterVolFirst').val();
	var hotwatershangci = $('#landlordCheckout_nrcHotWaterVolLast').val();
	var hotwaterchazhi = $('#landlordCheckout_nrcHotWaterDiff').html();
	var hotairbenci = $('#landlordCheckout_nrcHotAirVolFirst').val();
	var hotairshangci = $('#landlordCheckout_nrcHotAirVolLast').val();
	var hotairchazhi = $('#landlordCheckout_nrcHotAirDiff').html();
	
	var shuifei = $('#landlordCheckout_nrcWaterCombined').val();//水费
	var dianfei = $('#landlordCheckout_nrcElectricityCombined').val();//电费
	var qifei = $('#landlordCheckout_nrcGasCombined').val();//气费
	var hotwatercost = $('#landlordCheckout_nrcHotWaterCombined').val();//热水费
	var hotaircost = $('#landlordCheckout_nrcHotAirCombined').val();//暖气费
	
	var qianjiekuan = $('#landlordCheckout_arrears').val();//欠结款
	var guanlifei = $('#landlordCheckout_nrcContentCanalFee').val();//物管费
	var dianshifei = $('#landlordCheckout_nrcTvCost').val();//电视费
	var chaoqifangzu = $('#landlordCheckout_nrcRemainingRental').val();//租金
	var weibaofei = $('#landlordCheckout_nrcMaintenanceCompensation').val();//维保费
	var weiyuejin = $('#landlordCheckout_nrcBreachOfContract').val();//违约金
	var weiyuemingxi = $('#landlordCheckout_nrcBreachOfContractNote').val();//违约明细
	var fangwuyajin = $('#landlordCheckout_nrcHouseDeposit').val();//房屋押金
	var yucunkuan = $('#landlordCheckout_savingsAccount').val();//预存款
	var totalCharge = 0;//总应收
	var totalReturn = 0;//总应退
	var yingjiao = "";//应收明细
	var yingtui = "";//应退明细
	
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
	if (hotwatercost != '' && hotwatercost > 0) {
		totalCharge = mySum(totalCharge, hotwatercost);
		yingjiao += '热水费：' + hotwaterbenci + ' - ' + hotwatershangci + ' = ' + hotwaterchazhi + '立方 * 计费方案 = ' + hotwatercost + '元；\n';
	} else if (hotwatercost != '' && hotwatercost < 0) {
		hotwatercost = Math.abs(hotwatercost);
		totalReturn = mySum(totalReturn, hotwatercost);
		yingtui += '热水费：' + hotwaterbenci + ' - ' + hotwatershangci + ' = ' + hotwaterchazhi + '立方 * 计费方案 = ' + hotwatercost + '元；\n';
	}
	if (hotaircost != '' && hotaircost > 0) {
		totalCharge = mySum(totalCharge, hotaircost);
		yingjiao += '暖气费：' + hotairbenci + ' - ' + hotairshangci + ' = ' + hotairchazhi + '立方 * 计费方案 = ' + hotaircost + '元；\n';
	} else if (hotaircost != '' && hotaircost < 0) {
		hotaircost = Math.abs(hotaircost);
		totalReturn = mySum(totalReturn, hotaircost);
		yingtui += '暖气费：' + hotairbenci + ' - ' + hotairshangci + ' = ' + hotairchazhi + '立方 * 计费方案 = ' + hotaircost + '元；\n';
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
	//欠结款、押金只能是应收款
	if (qianjiekuan != 0) {
		qianjiekuan = Math.abs(qianjiekuan);
		totalCharge = mySum(totalCharge, qianjiekuan);
		yingjiao += '欠结款：' + qianjiekuan + '元；\n';
	}
	if (fangwuyajin != 0) {
		fangwuyajin = Math.abs(fangwuyajin);
		totalCharge = mySum(totalCharge, fangwuyajin);
		yingjiao += '房屋押金：' + fangwuyajin + '元；\n';
	}
	//预存款只能是应退款
	if (yucunkuan != 0) {
		yucunkuan = Math.abs(yucunkuan);
		totalReturn = mySum(totalReturn, yucunkuan);
		yingtui += '预存款：' + yucunkuan + '元；\n';
	}
	yingjiao = '业主合计应缴费用：' + totalCharge + '元；\n' + yingjiao;
	yingtui = '公寓合计应退费用：' + totalReturn + '元；\n' + yingtui;
	
	$('#landlordCheckout_nrcDeductTheAmount').val(totalCharge);
	$('.nrcDeductTheAmount').html(totalCharge);
	$('#landlordCheckout_nrcPayNote').val(yingjiao);
	
	$('#landlordCheckout_nrcRefundTheAmount').val(totalReturn);
	$('.nrcRefundTheAmount').html(totalReturn);
	$('#landlordCheckout_nrcReturnNote').val(yingtui);
	
	//返回合计应退
	var jiesuan = mySub(totalReturn, totalCharge);
	return jiesuan;
}
//计算实际退款金额
function calActualRefundLandlord(data){
	var actualRefund = mySub(data.nrcRefundTheAmount, data.nrcDeductTheAmount);
	if (actualRefund >= 0) {
		$('.yezhushijijiesuan').html('实际应退款：');
	} else {
		actualRefund = Math.abs(actualRefund);
		$('.yezhushijijiesuan').html('实际应收款：');
	}
	$('#yezhujiesuan').html(actualRefund);
	$('.yezhuactualRefund').html(actualRefund);
	$('.yezhuactualRefund2').html(convertCurrency(actualRefund));
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
	powerAllMoney = powerAllMoney.add(data.nrcContentCanalFee);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.rcoServerCost);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.rcoWifiCost);
	powerAllMoney = parseFloat(powerAllMoney);
	powerAllMoney = powerAllMoney.add(data.nrcTvCost);
	
	rentAllMoney = rentAllMoney.add(data.rcoRemainingRent);
	rentAllMoney = parseFloat(rentAllMoney);
	rentAllMoney = rentAllMoney.add(data.nrcRemainingRental);
	
	oweAllMoney = oweAllMoney.add(data.nrcBreachOfContract);
	oweAllMoney = parseFloat(oweAllMoney);
	oweAllMoney = oweAllMoney.add(data.rcoLateFee);
	
	otherAllMoney = otherAllMoney.add(data.nrcMaintenanceCompensation);
	otherAllMoney = parseFloat(otherAllMoney);
	otherAllMoney = otherAllMoney.add(data.arrears);
	$('.powerAllMoney').html(powerAllMoney);
	$('.rentAllMoney').html(rentAllMoney);
	$('.oweAllMoney').html(oweAllMoney);
	$('.otherAllMoney').html(otherAllMoney);
}
//添加维保
function addRepairLand() {
	$("#addRepairLandDlg").dialog({
		title : "添加维保",
		top : getTop(220),
		left : getLeft(370),
		width : 370,
		height : 240,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addRepairLandDlg [clear="clear"]').val('');
			$('#addRepairLandDlg [clear="clear"]').html('');
			$('#addRepairLandDlg [choose="choose"]').val('');
			$('#addRepairLandDlg [require="require"]').css('border', '1px solid #a9a9a9');
		}
	});
	$("#addRepairLandDlg").dialog('open');
}
//删除维保
function deleteRepairLand(value, row, index) {
	return "<a href='#' onclick=\"myDeleteRows('"+row.random+"','random','repairLandlordDg',0);clearJieSuanLand();calLandlordRepair();\">删除</a>";
}
//添加维保到列表
function addToDataGridLand() {
	var row = $('#landlordCheckOutDg').datagrid('getSelected');
	var sendMsg =$("#laMessageRemind").is(':checked');
	var checkFlag = 0;
	$('#addRepairLandDlg [require="require"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	var dataJson = {};
	dataJson.repHouse4storeId = row.hsId;
	dataJson.repHouseId = row.hsHouseId;
	dataJson.repResponsibility = '客户付费';
	//dataJson.repEventRp =row.detailAddress+"  "+ $('#repEventRpLand').val();
	dataJson.repEventRp =$('#repEventRpLand').val();
	dataJson.repHopeTime = '尽快';
	dataJson.repRepairPeopleId = $('#doRepairLandGetUserId').val();//负责人
	dataJson.repUserId = _loginUserId;
	dataJson.repTypeRp = '退房维修';
	dataJson.repDepartment = _loginDepartment;
	dataJson.repStorefront = _loginStore;
	dataJson.repTaskTime = formatTime(getNowFormatDate(), 2);
	dataJson.repTollRp = $('#repTollRpLand').val();
	var random = parseInt((Math.random()*9+1)*10000000);
	dataJson.random = random;
	dataJson.sendMsg=sendMsg;
	$('#repairLandlordDg').datagrid('insertRow', {
		index: 0,
		row: dataJson
	});
	$("#addRepairLandDlg").dialog('close');
	//清空结算
	clearJieSuanLand();
	//计算维保费
	calLandlordRepair();
}

/*
	刷新
	填入押金、管理费、电视费
	计算水电、未缴、超期、维保
	所有框不允许修改
	清空结算内容
*/
function reflashLandlord(){
	var row = $('#landlordCheckOutDg').datagrid('getSelected');
	//填入押金、管理费、电视费
	$('#landlordCheckout_nrcHouseDeposit').val(row.hsHouseDeposit);
	$("#landlordCheckout_nrcContentCanalFee").val(0);
	$("#landlordCheckout_nrcTvCost").val(0);
	//计算租金、维保费
	calVarietyChargeLandlord();
	//所有框不允许修改
	$('[data-read="1"]').attr("disabled",true);
	//清空结算内容
	clearJieSuanLand();
}

/*
	修正
	所有框允许修改
	清空结算内容
*/
function updateLandlord(){
	//所有框允许修改
	$('[data-read="1"]').attr("disabled",false);
	//清空结算内容
	clearJieSuanLand();
}

//清空结算内容
function clearJieSuanLand(){
	$('#landlordCheckout_nrcDeductTheAmount').val('');
	$('#landlordCheckout_nrcRefundTheAmount').val('');
	$('#yezhujiesuan').html('');
	$('#landlordCheckout_nrcPayNote').val('');
	$('#landlordCheckout_nrcReturnNote').val('');
}

/*
	结算
	所有框不允许修改
	拼接描述
*/
function yezhujiesuan(){
	//所有框不允许修改
	$('[data-read="1"]').attr("disabled",true);
	//计算总费用
	var totalCharge = calTotalChargeLand();
	if (totalCharge >= 0) {
		$('.yezhushijijiesuan').html('实际应退款：');
		$('#yezhujiesuan').html(totalCharge);
	} else {
		totalCharge = Math.abs(totalCharge);
		$('.yezhushijijiesuan').html('实际应收款：');
		$('#yezhujiesuan').html(totalCharge);
	}
	
}
//如果“未办理手续”,业主账号无需填写,直接禁止输入,有内容的不能修改!
function changeNrcProcedures(){
	var nrcProcedures = $('#landlordCheckout_nrcProcedures').val();
	if (nrcProcedures == '未办手续') {
		$('#landlordCheckout_nrcRefundTheUserName').attr('disabled', true);
		$('#landlordCheckout_nrcRefundBank').attr('disabled', true);
		$('#landlordCheckout_nrcRefundAccount').attr('disabled', true);
	} else {
		$('#landlordCheckout_nrcRefundTheUserName').attr('disabled', false);
		$('#landlordCheckout_nrcRefundBank').attr('disabled', false);
		$('#landlordCheckout_nrcRefundAccount').attr('disabled', false);
	}
}
function calLandlordRepair(){
	var repairRows = $('#repairLandlordDg').datagrid('getRows');
	var repTollRp = 0;
	for (var i in repairRows) {
		repTollRp = mySum(repTollRp, repairRows[i].repTollRp);
	}
	$("#landlordCheckout_nrcMaintenanceCompensation").val(repTollRp);
}