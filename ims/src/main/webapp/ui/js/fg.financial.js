$(function() {
	advancedScreening(0);
	$("#searchJfCheckInTimeEnd").val(formatTime(getNowFormatDate(), 2));
	$("#searchJfCheckInTimeStart").val(DecDays(7));
	showFinancilTypeSearch('financilSearch','queryFinancial(1,0)');
	showAddFinancilTypeSearch('financilAdd','');
	showReFinancilTypeSearch('financilReplaced','');
	showOweFinancilTypeSearch('financilOwe','');
	$('#numberFinancialTable').datagrid();
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
	//显示隐藏列初始化
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
			queryFinancial(1, 0);
		}else if(clickId.indexOf("theSortContrary")>-1){
			var alltheSortContrary = $('.theSortContrary');
			$('.theSortContrary').each(function(){
				$(this).removeClass("theSortContrarySelect");
			});
			$("#"+clickId).addClass("theSortContrarySelect");
			$('#theSortContraryInput').val($("#"+clickId).attr("searchVal"));
			queryFinancial(1, 0);
		}else{
			$("#theSortDlg").fadeOut();
		}
	});
	//分期账单单击事件
	$("#renterInstallmentDg").datagrid({
		   onClickRow: function (rowIndex, field, value) {
			   var row = $('#renterInstallmentDg').datagrid('getSelected');
			   var hrId = $("#setRenterEveryFinancialHouseRentId").val();
			   var hrHouse4storeId = $("#setRenterEveryFinancialHouseStoreId").val();
			   $("#ifCheckMoney").val('已变更');
			   if (IsCheckFlag==rowIndex) {//不选择账单，只去未租房查水电读数
				   $.post("../selectMeterReadingScheme.action", {
						hrId : hrId,
						hrHouse4storeId : hrHouse4storeId,
					},function(data){
						data=data.body;
						if( data[0].hsMeterReadingRecord!=null && data[0].hsMeterReadingRecord!='' ){
							var meterReadingRecord = eval('(' + data[0].hsMeterReadingRecord.getRealJsonStr() + ')');//读数记录
							console.log("meterReadingRecord ="+meterReadingRecord);
							var waterLast = meterReadingRecord.water.lastReading;//上次水读数
							var waterThis = waterLast;//本次水读数
							if(meterReadingRecord.water.thisReading.length!=0){
								waterThis = meterReadingRecord.water.thisReading[meterReadingRecord.water.thisReading.length-1];
							}
							
							var electritLast = meterReadingRecord.electrit.lastReading;//上次电读数  0
							var electritThis = electritLast;//本次电读数 0
							if(meterReadingRecord.electrit.thisReading.length !=0){
								if(meterReadingRecord.electrit.thisReading.length >1){
									
									electritThis = meterReadingRecord.electrit.thisReading[meterReadingRecord.electrit.thisReading.length-1];
									electritLast = meterReadingRecord.electrit.thisReading[meterReadingRecord.electrit.thisReading.length-2];
									
					
								}else if(meterReadingRecord.electrit.thisReading.length ==1){
									electritThis = meterReadingRecord.electrit.thisReading[meterReadingRecord.electrit.thisReading.length-1];
								}
							}
							
							
							var gasLast = meterReadingRecord.gas.lastReading;//上次气读数
							var gasThis = gasLast;//本次气读数
							if(meterReadingRecord.gas.thisReading.length!=0){

								if(meterReadingRecord.gas.thisReading.length >1){
									
									gasThis = meterReadingRecord.gas.thisReading[meterReadingRecord.gas.thisReading.length-1];
									gasLast = meterReadingRecord.gas.thisReading[meterReadingRecord.gas.thisReading.length-2];
									
					
								}else if(meterReadingRecord.gas.thisReading.length ==1){
									gasThis = meterReadingRecord.gas.thisReading[meterReadingRecord.gas.thisReading.length-1];
								}
								
							}

							var hotwaterLast = 0;//上次热水读数
							var hotwaterThis = 0;//本次热水读数
							if(meterReadingRecord.hotwater != undefined){
								hotwaterLast = meterReadingRecord.hotwater.lastReading;//上次热水读数
								hotwaterThis = hotwaterLast;//本次热水读数
								if(meterReadingRecord.hotwater.thisReading.length!=0){
									if(meterReadingRecord.hotwater.thisReading.length >1){
										
										hotwaterThis = meterReadingRecord.hotwater.thisReading[meterReadingRecord.hotwater.thisReading.length-1];
										hotwaterLast = meterReadingRecord.hotwater.thisReading[meterReadingRecord.hotwater.thisReading.length-2];
										
						
									}else if(meterReadingRecord.hotwater.thisReading.length ==1){
										hotwaterThis = meterReadingRecord.hotwater.thisReading[meterReadingRecord.hotwater.thisReading.length-1];
									}
				
								}
							}

							var hotairLast = 0;//上次暖气读数
							var hotairThis = 0;//本次暖气读数
							if(meterReadingRecord.hotair != undefined) {
								hotairLast = meterReadingRecord.hotair.lastReading;//上次暖气读数
								hotairThis = hotairLast;//本次暖气读数
								if (meterReadingRecord.hotair.thisReading.length != 0) {
									if(meterReadingRecord.hotair.thisReading.length!=0){
										if(meterReadingRecord.hotair.thisReading.length >1){
											
											hotairThis = meterReadingRecord.hotair.thisReading[meterReadingRecord.hotair.thisReading.length-1];
											hotairLast = meterReadingRecord.hotair.thisReading[meterReadingRecord.hotair.thisReading.length-2];
											
							
										}else if(meterReadingRecord.hotair.thisReading.length ==1){
											hotairThis = meterReadingRecord.hotair.thisReading[meterReadingRecord.hotair.thisReading.length-1];
										}
					
									}
								
								}
							}
							
							var waterNum = accSub(waterThis,waterLast);//水差额
							var electritNum = accSub(electritThis,electritLast);//电差额
							var gasNum = accSub(gasThis,gasLast);//气差额
							var hotwaterNum = accSub(hotwaterThis,hotwaterLast);//热水差额
							var hotairNum = accSub(hotairThis,hotairLast);//暖气差额

							var waterMoney = powerCalculate(data[0].waterPlan!=''?data[0].waterPlan.getRealJsonStr():'',waterNum);//水费
							var electritMoney = powerCalculate(data[0].electritPlan!=''?data[0].electritPlan.getRealJsonStr():'',electritNum);//电费
							var gasMoney = powerCalculate(data[0].gasPlan!=''?data[0].gasPlan.getRealJsonStr():'',gasNum);//气费
							var hotwaterMoney = powerCalculate(data[0].hotWaterPlan!=''?data[0].hotWaterPlan.getRealJsonStr():'',hotwaterNum);//热水费
							var hotairMoney = powerCalculate(data[0].hotAirPlan!=''?data[0].hotAirPlan.getRealJsonStr():'',hotairNum);//暖气费

							$("#srefWaterThis").val(waterThis);
							$("#srefWaterLast").val(waterLast);
							$("#srefWaterNum").val(waterNum);
							$("#srefWaterPlan").val(data[0].water);
							$("#srefWaterMoney").val(waterMoney);
							$("#srefWaterMoney").attr("mhistorys",waterLast+","+waterThis);
							
							$("#srefElectritThis").val(electritThis);
							$("#srefElectritLast").val(electritLast);
							$("#srefElectritNum").val(electritNum);
							$("#srefElectritPlan").val(data[0].electrit);
							$("#srefElectritMoney").val(electritMoney);
							$("#srefElectritMoney").attr("mhistorys",electritLast+","+electritThis);
							
							$("#srefGasThis").val(gasThis);
							$("#srefGasLast").val(gasLast);
							$("#srefGasNum").val(gasNum);
							$("#srefGasPlan").val(data[0].gas);
							$("#srefGasMoney").val(gasMoney);
							$("#srefGasMoney").attr("mhistorys",gasLast+","+gasThis);
							
							/*tzl*/
							$("#srefHotWaterThis").val(hotwaterThis);
							$("#srefHotWaterLast").val(hotwaterLast);
							$("#srefHotWaterNum").val(hotwaterNum);
							$("#srefHotWaterPlan").val(data[0].hotWater);
							$("#srefHotWaterMoney").val(hotwaterMoney);
							$("#srefHotWaterMoney").attr("mhistorys",hotwaterLast+","+hotwaterThis);
							
							$("#srefHotAirThis").val(hotairThis);
							$("#srefHotAirLast").val(hotairLast);
							$("#srefHotAirNum").val(hotairNum);
							$("#srefHotAirPlan").val(data[0].hotAir);
							$("#srefHotAirMoney").val(hotairMoney);
							$("#srefHotAirMoney").attr("mhistorys",hotairLast+","+hotairThis);
							
							
							//$("#srefManageMoney").val(data[0].hrManageCost);
							//$("#srefServerMoney").val(data[0].hrServerCost);
							
							$("#srefManageMoney").val(0);
							$("#srefServerMoney").val(0);
							
							$("#srefTvMoney").val(data[0].hrTvCharge);
							$("#srefWifiMoney").val(data[0].hrWifiCharge);
							if(data[0].hrBase>0){
								$("#everyHisOwe").show();
								$("#srefHisOwe").val(accSub(data[0].hrBase,0));
								
								$("#everyHisSave").hide();
								$("#srefHisSave").val(0.00);
							}else{
								$("#everyHisSave").show();
								$("#srefHisSave").val(accSub(0,data[0].hrBase));
								
								$("#everyHisOwe").hide();
								$("#srefHisOwe").val(0.00);
							}
							$("#srefPastOwe").val(accSub(data[0].hrBase,0));
							
							
							$("#srefOtherMoney").val(data[0].hrOtherPay);
							
							$("#srefWaterMoneySys").val(waterMoney);
							$("#srefElectritMoneySys").val(electritMoney);
							$("#srefGasMoneySys").val(gasMoney);
							
							$("#srefHotWaterMoneySys").val(hotwaterMoney);
							$("#srefHotAirMoneySys").val(hotairMoney);
							
							$("#srefTvMoneySys").val(data[0].hrTvCharge);
							$("#srefWifiMoneySys").val(data[0].hrWifiCharge);
							//$("#srefManageMoneySys").val(data[0].hrManageCost);
							//$("#srefServerMoneySys").val(data[0].hrServerCost);
							$("#srefManageMoneySys").val(0);
							$("#srefServerMoneySys").val(0);
							$("#srefOtherSys").val(data[0].hrOtherPay);
							
							$('#renterInstallmentDg').datagrid("clearSelections");
							IsCheckFlag = -1;
							$('#srefShouldDay').val('无应付租金');//缴租时间
							$('#srefNotDays').val(0);//滞纳天数
							$('#srefDamages').val(0);//滞纳金
							$('#srefRentMoney').val(0);//房屋租金
							$("#renterInstallmentId").val('');
							   
							$('#srefWaterMoneyMsg').val(0);
							$('#srefElectritMoneyMsg').val(0);
							$('#srefGasMoneyMsg').val(0);
							
							$('#srefHotWaterMoneyMsg').val(0);
							$('#srefHotAirMoneyMsg').val(0);
							
							$('#srefTvMoneyMsg').val(0);
							$('#srefManageMoneyMsg').val(0);
							$('#srefWifiMoneyMsg').val(0);
							$('#srefServerMoneyMsg').val(0);
							$('#srefOtherMsg').val(0);
							   
							$('#srefWaterMoney').val($('#srefWaterMoneySys').val());
							$('#srefElectritMoney').val($('#srefElectritMoneySys').val());
							$('#srefGasMoney').val($('#srefGasMoneySys').val());
							
							$('#srefHotWaterMoney').val($('#srefHotWaterMoneySys').val());
							$('#srefHotAirMoney').val($('#srefHotAirMoneySys').val());
							
							$('#srefTvMoney').val($('#srefTvMoneySys').val());
							$('#srefManageMoney').val($('#srefManageMoneySys').val());
							$('#srefWifiMoney').val($('#srefWifiMoneySys').val());
							$('#srefServerMoney').val($('#srefServerMoneySys').val());
							$('#srefOtherMoney').val($('#srefOtherSys').val());
						}
					});
				   
			   }else{//选择账单，读取短信的金额
				   IsCheckFlag = rowIndex;
				   if(row.jciState=="待收"){
					   $('#srefShouldDay').val(row.jciFukuanri);
					   $('#srefRentMoney').val(row.jciMoney);
					   $("#renterInstallmentId").val(row.jciId);
					   $("#srefManageMoneySys").val((row.jciManageCost!=null && row.jciManageCost !="")?row.jciManageCost:0.00);
					   $("#srefServerMoneySys").val((row.jciServerCost!=null && row.jciServerCost !="")?row.jciServerCost:0.00);
				   }else{
					   $('#srefShouldDay').val('无应付租金');
					   $('#srefNotDays').val(0);
					   $('#srefDamages').val(0);
					   $('#srefRentMoney').val(0);
					   $("#renterInstallmentId").val('');
					   $("#srefManageMoneySys").val(0);
					   $("#srefServerMoneySys").val(0);
				   }
				   if(row.jciMessageNote != ''&&row.jciMessageNote != null){
					   var json = eval('('+row.jciMessageNote.getRealJsonStr()+')');
					   $('#srefWaterLast').val(json.waterLast);
					   $('#srefWaterThis').val(json.waterThis);
					   $('#srefWaterNum').val(accSub(json.waterThis,json.waterLast));
					   
					   $('#srefElectritLast').val(json.electLast);
					   $('#srefElectritThis').val(json.electThis);
					   $('#srefElectritNum').val(accSub(json.electThis,json.electLast));
					   
					   $('#srefGasLast').val(json.gasLast);
					   $('#srefGasThis').val(json.gasThis);
					   $('#srefGasNum').val(accSub(json.gasThis,json.gasLast));
					   /*tzl*/
					   $('#srefHotWaterLast').val(json.hotWaterLast);
					   $('#srefHotWaterThis').val(json.hotWaterThis);
					   $('#srefHotWaterNum').val(accSub(json.hotWaterThis,json.hotWaterLast));
					   
					   $('#srefHotAirLast').val(json.hotAirLast);
					   $('#srefHotAirThis').val(json.hotAirThis);
					   $('#srefHotAirNum').val(accSub(json.hotAirThis,json.hotAirLast));
					   
					   $('#srefWaterMoneySys').val(json.sys.water);
					   $('#srefElectritMoneySys').val(json.sys.elect);
					   $('#srefGasMoneySys').val(json.sys.gas);
					   
					   $('#srefHotWaterMoneySys').val(json.sys.hotWater);
					   $('#srefHotAirMoneySys').val(json.sys.hotAir);
					   
					   $('#srefTvMoneySys').val(json.sys.tv);
					   $('#srefManageMoneySys').val(json.sys.manager);
					   $('#srefWifiMoneySys').val(json.sys.wifi);
					   $('#srefServerMoneySys').val(json.sys.server);
					   $('#srefOtherSys').val(json.sys.other);
					   
					   $('#srefWaterMoneyMsg').val(json.msg.water);
					   $('#srefElectritMoneyMsg').val(json.msg.elect);
					   $('#srefGasMoneyMsg').val(json.msg.gas);
					   
					   $('#srefHotWaterMoneyMsg').val(json.msg.hotWater);
					   $('#srefHotAirMoneyMsg').val(json.msg.hotAir);
					   
					   $('#srefTvMoneyMsg').val(json.msg.tv);
					   $('#srefManageMoneyMsg').val(json.msg.manager);
					   $('#srefWifiMoneyMsg').val(json.msg.wifi);
					   $('#srefServerMoneyMsg').val(json.msg.server);
					   $('#srefOtherMsg').val(json.msg.other);
					   
					   $('#srefWaterMoney').val($('#srefWaterMoneyMsg').val());
					   $('#srefElectritMoney').val($('#srefElectritMoneyMsg').val());
					   $('#srefGasMoney').val($('#srefGasMoneyMsg').val());
					   
					   $('#srefHotWaterMoney').val($('#srefHotWaterMoneyMsg').val());
					   $('#srefHotAirMoney').val($('#srefHotAirMoneyMsg').val());
					   
					   $('#srefTvMoney').val($('#srefTvMoneyMsg').val());
					   $('#srefManageMoney').val($('#srefManageMoneyMsg').val());
					   $('#srefWifiMoney').val($('#srefWifiMoneyMsg').val());
					   $('#srefServerMoney').val($('#srefServerMoneyMsg').val());
					   $('#srefOtherMoney').val($('#srefOtherMsg').val());
					   
					   
					   $("#srefWaterMoney").attr("mhistorys",json.waterLast+","+json.waterThis);
					   
					   $("#srefElectritMoney").attr("mhistorys",json.electLast+","+json.electThis);
					   
					   $("#srefGasMoney").attr("mhistorys",json.gasLast+","+json.gasThis);
					   
					   $("#srefHotWaterMoney").attr("mhistorys",json.hotWaterLast+","+json.hotWaterThis);
					   $("#srefHotAirMoney").attr("mhistorys",json.hotAirLast+","+json.hotAirThis);
					   
				   }else{
					   $('#srefWaterMoneyMsg').val(0);
					   $('#srefElectritMoneyMsg').val(0);
					   $('#srefGasMoneyMsg').val(0);
					   
					   $('#srefHotWaterMoneyMsg').val(0);
					   $('#srefHotAirMoneyMsg').val(0);
					   
					   $('#srefTvMoneyMsg').val(0);
					   $('#srefManageMoneyMsg').val(0);
					   $('#srefWifiMoneyMsg').val(0);
					   $('#srefServerMoneyMsg').val(0);
					   $('#srefOtherMsg').val(0);
					   
					   $('#srefWaterMoney').val($('#srefWaterMoneySys').val());
					   $('#srefElectritMoney').val($('#srefElectritMoneySys').val());
					   $('#srefGasMoney').val($('#srefGasMoneySys').val());
					   
					   $('#srefHotWaterMoney').val($('#srefHotWaterMoneySys').val());
					   $('#srefHotAirMoney').val($('#srefHotAirMoneySys').val());
					   
					   $('#srefTvMoney').val($('#srefTvMoneySys').val());
					   $('#srefManageMoney').val($('#srefManageMoneySys').val());
					   $('#srefWifiMoney').val($('#srefWifiMoneySys').val());
					   $('#srefServerMoney').val($('#srefServerMoneySys').val());
					   $('#srefOtherMoney').val($('#srefOtherSys').val());
					   
					   $("#srefWaterMoney").attr("mhistorys",$('#srefWaterLast').val()+","+$('#srefWaterThis').val());
					   $("#srefElectritMoney").attr("mhistorys",$('#srefElectritLast').val()+","+$('#srefElectritThis').val());
					   $("#srefGasMoney").attr("mhistorys",$('#srefGasLast').val()+","+$('#srefGasThis').val());
					   
					   $("#srefHotWaterMoney").attr("mhistorys",$('#srefHotWaterLast').val()+","+$('#srefHotWaterThis').val());
					   $("#srefHotAirMoney").attr("mhistorys",$('#srefHotAirLast').val()+","+$('#srefHotAirThis').val());
				   }
				   if(row){
						var money = 0;
						var powerMoneyArry = $('#srefPowerDiv input');//所有能源输入框
						for(var i = 0;i<powerMoneyArry.length;i++){
							money = accAdd(money,$("#"+powerMoneyArry[i].id).val());
						}
						money = accAdd(money,row.jciMoney);
						var today = new Date(formatTime(getNowFormatDate(), 2));
					    var fukuanri = new Date(row.jciFukuanri);
					    if(today<=fukuanri||row.jciState=="已收"){
					    	$('#srefNotDays').val(0);
						    $('#srefDamages').val(0);
					    }else{
						    var notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
						    $('#srefNotDays').val(notDays);
						    $('#srefDamages').val(accAdd(0,money*notDays*_lateFeeRate*0.01));
					    }
					}else{
						$('#srefNotDays').val(0);
					    $('#srefDamages').val(0);
					}
			   }
			   checkMoney(0);
	       }
	});
	// 添加收支对话框实际金额改变触发事件
	$('.add_financial_moneyGet').keyup(function() {
				$('.add_financial_moneySum').val(
						accSub($('.add_financial_moneyTotal').val(),$('.add_financial_moneyGet').val()));
			
	});
	// 生成租客每期收支对话框实际金额改变触发事件
	$('#setRenterEveryFinancialMoneyGet').keyup(
			function() {
				$('#setRenterEveryFinancialMoneySum').val(//欠结金额
						accSub($('#setRenterEveryFinancialMoneyTotal').val(),$('#setRenterEveryFinancialMoneyGet').val() ));
				$('#srefThisOwe').val(//本期欠结
						accSub($('#setRenterEveryFinancialMoneyTotal').val(),$('#setRenterEveryFinancialMoneyGet').val() ));
				$('#srefRealPay').val(//实交金额
						$(this).val());
				$("#srefAllOwe").val(//总欠结
						accAdd($("#srefPastOwe").val(),$("#srefThisOwe").val() ));
	});
	// 生成租客新签收支对话框实际金额改变触发事件
	$('#setRenterNewFinancialMoneyGet').keyup(
			function() {
				$('#setRenterNewFinancialMoneySum').val(
						accSub( $('#setRenterNewFinancialMoneyTotal').val(),$('#setRenterNewFinancialMoneyGet').val()));
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

	for (var i in _payType) {
		$('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
	}
	for(var k in _ownerShipType){
		$('#add_financial_belongType').append("<option value = '"+_ownerShipType[k]+"'>"+_ownerShipType[k]+"</option>")
	}
	for (var i in _ownerShipType) {
		$('#searchJfTheOwnershipType').append(
				"<option value = '"+_ownerShipType[i]+"'>"+_ownerShipType[i]+"</option>")
	}
	$("#searchCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$("#searchCity").val(0);
	$("#searchAddCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$("#searchAddCity").val(0);
	queryFinancial(1,0);
});

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
// 添加一条
function addToDataGrid() {
	var houseCoding = $('.add_houseCoding').val();
	var belongType = $('.add_financial_belongType').find('option:selected').text();
	var belongName = $('.add_financial_belongName').val();
	var doTime = $('.add_financial_doTime').val();
	var belongAddress = $('.add_financial_belongAddress').val();
	var userId = $('#addFinancialHandlerGetUserId').val();
	
	var jfNatureOfThe = $('#financilAddJfNatureOfThe').val();
	var jfBigType = $('#financilAddJfBigType').val();
	var jfAccountingSpecies = $('#financilAddJfAccountingSpecies').val();
	
	var jfClosedWay = $('.add_financial_way').find('option:selected').text();
	var jfSumMoney = $('.add_financial_money').val();
	var jfTicketNumber = $('.add_financial_nums').val();
	var belongBegin = $('.add_financial_belongBegin').val();
	var belongEnd = $('.add_financial_belongEnd').val();
	var jfFinanNote = $('.add_financial_note').val();
	var jfStartCycle = $("#add_financial_belongBegin").val();
    var jfEndCycle = $("#add_financial_belongEnd").val();
    var jfPayType = $("#addFinancialPayType").val();
    
    var checkFlag = 0;
	$('#addFinancialDlg [require="require"]').each(function(){
		if($(this).val()=='' || $(this).val()==null){
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
	if(belongType!="租客"){
		if(jfAccountingSpecies=="租客欠结款"){
			myTips('归属类型为租客才可以添加收支种类为"租客欠结款"的账单!', 'error');
			return;
		}
		if(jfAccountingSpecies=="租客预存款"){
			myTips('归属类型为租客才可以添加收支种类为"租客预存款"的账单!', 'error');
			return;
		}
		if(jfAccountingSpecies=="还租客预存款"){
			myTips('归属类型为租客才可以添加收支种类为"还租客预存款"的账单!', 'error');
			return;
		}
		if(jfAccountingSpecies=="租客还欠结款"){
			myTips('归属类型为租客才可以添加收支种类为"租客还欠结款"的账单!', 'error');
			return;
		}
	}
	if(belongType!="业主"){
		if(jfAccountingSpecies=="房东欠结款"){
			myTips('归属类型为业主才可以添加收支种类为"房东欠结款"的账单!', 'error');
			return;
		}
		if(jfAccountingSpecies=="待付房东款"){
			myTips('归属类型为业主才可以添加收支种类为"待付房东款"的账单!', 'error');
			return;
		}
		if(jfAccountingSpecies=="房东还欠结款"){
			myTips('归属类型为业主才可以添加收支种类为"房东还欠结款"的账单!', 'error');
			return;
		}
		if(jfAccountingSpecies=="支付房东待付款"){
			myTips('归属类型为业主才可以添加收支种类为"支付房东待付款"的账单!', 'error');
			return;
		}
	}
	var dataJson = {
		jfFinanNote 		: jfFinanNote,
		jfTicketNumber 		: jfTicketNumber,
		jfSumMoney 			: jfSumMoney,
		//jfClosedWay 		: jfClosedWay,
		jfAccountingSpecies : jfAccountingSpecies,
		jfBigType			: jfBigType,
		jfNatureOfThe 		: jfNatureOfThe,
		jfStartCycle		: jfStartCycle,
		jfEndCycle			: jfEndCycle
	};
	var rows = $("#addFinancialTable").datagrid("getRows");
	var dataFlag = 0;
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].jfNatureOfThe == jfNatureOfThe
				&& rows[i].jfAccountingSpecies == jfAccountingSpecies) {
			if (dataFlag == 0) {
				dataFlag++;
				$.messager.confirm("操作提示", "有相同收支种类的数据存在,是否继续添加？", function(
						data) {
					if (!data) {
						return;
					} else {
						dataFlag = 0;
						toDataGrid(dataJson, dataFlag);
						return;
					}
				});
			}
		} else if (rows[i].jfSumMoney == jfSumMoney) {
			if (dataFlag == 0) {
				dataFlag++;
				$.messager.confirm("操作提示", "有相同数额的收支金额的数据存在,是否继续添加？", function(
						data) {
					if (!data) {
						return;
					} else {
						dataFlag = 0;
						toDataGrid(dataJson, dataFlag);
						return;
					}
				});
			}
		}
	}
	toDataGrid(dataJson, dataFlag)
}
// 将收支信息添加到表格
function toDataGrid(data, dataFlag) {
	if (dataFlag != 0) {
		return;
	}
	$('#addFinancialTable').datagrid('insertRow', {
		index : 0,
		row : data
	});
//	financialLink('add_financial_state','add_financial_type','addFinancialBigType');
	$('#financilAddJfNatureOfThe').val('');
	$('#financilAddJfBigType').val('');
	$('#financilAddJfAccountingSpecies').val('');
	$('#selectinputnameadd_financial_type').val('');
	$('#add_financial_belongBegin').val('');
	$('#add_financial_belongEnd').val('');
	$('.add_financial_money').val('');
	$('.add_financial_nums').val('');
	$('.add_financial_note').val('');
	sumDataGrid(1);
}
// 对表格金额进行计算
function sumDataGrid(type) {
	var moneyTotal = 0;
	if(type==1){
		var dataJson = $("#addFinancialTable").datagrid("getRows");
		if(dataJson.length>0){
			var oweMoney=0.00;//新增代支出  总金额
			var doOwePayMoney=0.00;//新增欠结补结 欠结金额
			var doOweGetMoney=0.00;//新增欠结补结 补结金额
			for (var i = 0; i < dataJson.length; i++) {
				if (dataJson[i].jfNatureOfThe == '收入') {
					moneyTotal = accAdd(moneyTotal, dataJson[i].jfSumMoney);
					if(dataJson[i].jfAccountingSpecies=='租客还欠结款'
						|| dataJson[i].jfAccountingSpecies=='租客预存款'
						|| dataJson[i].jfAccountingSpecies=='房东还欠结款'
						|| dataJson[i].jfAccountingSpecies=='待付房东款'){
						doOweGetMoney =  accAdd(doOweGetMoney, dataJson[i].jfSumMoney);
					}
				} else if(dataJson[i].jfNatureOfThe == '支出'){
					moneyTotal = accSub(moneyTotal, dataJson[i].jfSumMoney);
					if(dataJson[i].jfAccountingSpecies=='租客欠结款' 
						|| dataJson[i].jfAccountingSpecies=='还租客预存款'
						|| dataJson[i].jfAccountingSpecies=='房东欠结款'
						|| dataJson[i].jfAccountingSpecies=='支付房东待付款'){
						doOwePayMoney =  accAdd(doOwePayMoney, dataJson[i].jfSumMoney);
					}
					
				} else if(dataJson[i].jfNatureOfThe == '代支出'){
					oweMoney = accAdd(oweMoney, dataJson[i].jfSumMoney);
				}
			}
			if(doOwePayMoney!=0 || doOweGetMoney!=0){
				$('#owePayFinancialMoney').val(doOwePayMoney);
				$('#oweGetFinancialMoney').val(doOweGetMoney);
				return;
			}
			if(oweMoney!=0){
				$('#replacedFinancialTotal').val(oweMoney);
				$('#replacedFinancialEd').val(oweMoney);
				$('#replacedFinancialTotalOwe').val(oweMoney);
				return;
			}
			if ($('.add_financial_moneyGet').val() == '0.00' || $('.add_financial_moneyGet').val() == $('.add_financial_moneyTotal').val()) {
				$('.add_financial_moneyGet').val(moneyTotal);
			}
			$('.add_financial_moneyTotal').val(moneyTotal);
			$('.add_financial_moneySum').val(accSub( moneyTotal,$('.add_financial_moneyGet').val()));
		}else{
			$('.add_financial_moneyGet').val(0.00);
			$('.add_financial_moneyTotal').val(0.00);
			$('.add_financial_moneySum').val(0.00);
			$('#replacedFinancialTotal').val(0.00);
			$('#replacedFinancialEd').val(0.00);
			$('#replacedFinancialTotalOwe').val(0.00);
		}
	}else if(type==2){
//		var dataJson = $("#setRenterEveryFinancialTable").datagrid("getRows");
//		if(dataJson.length>0){
//			for (var i = 0; i < dataJson.length; i++) {
//				if (dataJson[i].jfNatureOfThe == '收入') {
//					if(dataJson[i].jfBigType !="欠结类" && dataJson[i].jfAccountingSpecies !="应收款"){
//						moneyTotal = accAdd(moneyTotal, dataJson[i].jfSumMoney);
//					}
//				} else if(dataJson[i].jfNatureOfThe == '支出'){
//					if(dataJson[i].jfBigType !="欠结类" && dataJson[i].jfAccountingSpecies !="应收款"){
//						moneyTotal = accSub(moneyTotal, dataJson[i].jfSumMoney);
//					}
//				} else if(dataJson[i].jfNatureOfThe == '欠结'){
//					if(dataJson[i].jfAccountingSpecies=='租客欠结'){
//						moneyTotal = accSub(moneyTotal, dataJson[i].jfSumMoney);
//					}else if(dataJson[i].jfAccountingSpecies=='租客补结'){
//						moneyTotal = accAdd(moneyTotal, dataJson[i].jfSumMoney);
//					}
//				}
//			}
////			if ($('#setRenterEveryFinancialMoneyGet').val() == '0.00'
////					|| $('#setRenterEveryFinancialMoneyGet').val() == $(
////							'#setRenterEveryFinancialMoneyTotal').val()) {
////				$('#setRenterEveryFinancialMoneyGet').val(moneyTotal);
////			}
//			$('#setRenterEveryFinancialMoneyTotal').val(moneyTotal);
//			$('#setRenterEveryFinancialMoneySum').val(accSub(moneyTotal,$('#setRenterEveryFinancialMoneyGet').val()));
//		}else{
//			$('#setRenterEveryFinancialMoneyTotal').val(0.00)
//			$('#setRenterEveryFinancialMoneyGet').val(0.00);
//			$('#setRenterEveryFinancialMoneySum').val(0.00);
//		}
	}
	else if(type==3){
		var dataJson = $("#setRenterNewFinancialTable").datagrid("getRows");
		if(dataJson.length>0){
			for (var i = 0; i < dataJson.length; i++) {
				if (dataJson[i].jfNatureOfThe == '收入') {
					moneyTotal = accAdd(moneyTotal, dataJson[i].jfSumMoney);
				} else if(dataJson[i].jfNatureOfThe == '支出'){
					moneyTotal = accSub(moneyTotal, dataJson[i].jfSumMoney);
				} else if(dataJson[i].jfNatureOfThe == '欠结'){
					if(dataJson[i].jfAccountingSpecies=='租客欠结'){
						moneyTotal = accSub(moneyTotal, dataJson[i].jfSumMoney);
					}else if(dataJson[i].jfAccountingSpecies=='租客补结'){
						moneyTotal = accAdd(moneyTotal, dataJson[i].jfSumMoney);
					}
				}
			}
//			if ($('#setRenterNewFinancialMoneyGet').val() == '0.00'
//					|| $('#setRenterNewFinancialMoneyGet').val() == $(
//							'#setRenterNewFinancialMoneyTotal').val()) {
//				$('#setRenterNewFinancialMoneyGet').val(moneyTotal);
//			}
			$('#setRenterNewFinancialMoneyTotal').val(moneyTotal);
			$('#setRenterNewFinancialMoneySum').val(
					accSub( moneyTotal,$('#setRenterNewFinancialMoneyGet').val()));
		}else{
			$('#setRenterNewFinancialMoneyTotal').val(0.00)
			$('#setRenterNewFinancialMoneyGet').val(0.00);
			$('#setRenterNewFinancialMoneySum').val(0.00);
		}
	}
}
//收款账户
var sum = 0.00;
function collectionAccount() {
	$("#collectionAccountDlg").dialog({
		title : '收款账户',
		top : getTop(520),
		left : getLeft(1100),
		width : 1100,
		heigth : 520,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#searchBillingDateFrom").val('');
			$("#searchBillingDateTo").val('');
			$("#searchFaPaymentType").val('');
			sum = 0.00;
		}
	});
	queryAccount(_pageNum[0], 0);
	$('#collectionAccountDlg').dialog('open');
}


// 新增收支对话框
function addFinancial(type) {
	if(type==0){
		$("#addFinancialDlg").dialog({
			title : '新增收支',
			top : getTop(540),
			left : getLeft(660),
			width : 660,
			height : 550,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				var data = [];
				$("#addFinancialTable").datagrid("loadData", data);
				$("#addFinancialSaveDiv").hide();
				$("#addToFinancialButton").hide();
				$('#addFinancialDlg [clean="clean"]').html('');
				$('#addFinancialDlg [clear="clear"]').val('');
				$('#addFinancialDlg [choose="choose"]').val('');
				$('#addFinancialDlg [require="require"]').css('border', '1px solid #a9a9a9');
			}
		});
		$("#addFinancialSaveDiv").show();
		$("#addToFinancialButton").show();
		
		$("#financilAddTypeDiv").show();
		$("#financilOweTypeDiv").hide();
		$("#financilReplacedTypeDiv").hide();
		
		$("#doAddFinancialButton").show();
		$("#doOweFinancialButton").hide();
		$("#doReplacedFinancialButton").hide();
		
		$("#addFinancialMoneyDiv").show();
		$("#oweFinancialMoneyDiv").hide();
		$("#replacedFinancialMoneyDiv").hide();
	}else if(type==1){
		$("#addFinancialDlg").dialog({
			title : '新增欠结补结',
			top : getTop(540),
			left : getLeft(660),
			width : 660,
			height : 550,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				var data = [];
				$("#addFinancialTable").datagrid("loadData", data);
				$("#addFinancialSaveDiv").hide();
				$("#addToFinancialButton").hide();
				$('#addFinancialDlg [clean="clean"]').html('');
				$('#addFinancialDlg [clear="clear"]').val('');
				$('#addFinancialDlg [choose="choose"]').val('');
				$('#addFinancialDlg [require="require"]').css('border', '1px solid #a9a9a9');
			}
		});
		$('#owePayFinancialMoney').val(0.00);
		$('#oweGetFinancialMoney').val(0.00);
		
		$("#addFinancialSaveDiv").show();
		$("#addToFinancialButton").show();
		
		$("#financilAddTypeDiv").hide();
		$("#financilOweTypeDiv").show();
		$("#financilReplacedTypeDiv").hide();
		
		$("#doAddFinancialButton").hide();
		$("#doOweFinancialButton").show();
		$("#doReplacedFinancialButton").hide();
		
		$("#addFinancialMoneyDiv").hide();
		$("#oweFinancialMoneyDiv").show();
		$("#replacedFinancialMoneyDiv").hide();
	}else if(type==2){
		$("#addFinancialDlg").dialog({
			title : '新增代缴记录(租客)',
			top : getTop(540),
			left : getLeft(660),
			width : 660,
			height : 550,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				var data = [];
				$("#addFinancialTable").datagrid("loadData", data);
				$("#addFinancialSaveDiv").hide();
				$("#addToFinancialButton").hide();
				$('#addFinancialDlg [clean="clean"]').html('');
				$('#addFinancialDlg [clear="clear"]').val('');
				$('#addFinancialDlg [choose="choose"]').val('');
				$('#addFinancialDlg [require="require"]').css('border', '1px solid #a9a9a9');
			}
		});
		$('#replacedFinancialTotal').val(0.00);
		$('#replacedFinancialEd').val(0.00);
		$('#replacedFinancialTotalOwe').val(0.00);
		
		$("#addFinancialSaveDiv").show();
		$("#addToFinancialButton").show();
		
		$("#financilAddTypeDiv").hide();
		$("#financilOweTypeDiv").hide();
		$("#financilReplacedTypeDiv").show();
		
		$("#doAddFinancialButton").hide();
		$("#doOweFinancialButton").hide();
		$("#doReplacedFinancialButton").show();
		
		$("#addFinancialMoneyDiv").hide();
		$("#oweFinancialMoneyDiv").hide();
		$("#replacedFinancialMoneyDiv").show();
	}
	
	for(var j in _userInfoData){
		if(_loginUserId == _userInfoData[j].userId){
			$("#addFinancialHandlerGetUserId").val(_userInfoData[j].userId);
			$("#addFinancialHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}
	$('.add_financial_doTime').val(formatTime(getNowFormatDate(), 2));
	$('.add_financial_moneyTotal').val('0.00');
	$('.add_financial_moneyGet').val('0.00');
	$('.add_financial_moneySum').val('0.00');
	
	$("#renterBaseMoneyDiv").hide();
	$("#landlordBaseMoneyDiv").hide();
	$("#renterBaseMoneyInput").val(0);
	$("#landlordBaseMoneyInput").val(0);
	
	$("#addFinancialDlg").dialog('open');
	$('#financilAddJfNatureOfThe').val('');
	$('#financilAddJfBigType').val('');
	$('#financilAddJfAccountingSpecies').val('');
	$('#replacedFinancialTable').datagrid();
	
	if ($('#addFinancialTable').hasClass('datagrid-f')) {

	} else {
		$('#addFinancialTable')
				.datagrid(
						{
							columns : [ [
									{
										field : 'jfNatureOfThe',
										title : '收支性质',
										width : 20,
										align : 'center'
									},
									{
										field : 'jfAccountingSpecies',
										title : '收支种类',
										width : 20,
										align : 'center'
									},
									{
										field : 'jfSumMoney',
										title : '收支金额',
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
										field : 'jfTicketNumber',
										title : '票据编号',
										width : 20,
										align : 'center',
										editor : 'textbox'
									},
									{
										field : 'jfFinanNote',
										title : '备注',
										width : 20,
										align : 'center',
										editor : 'textbox'
									},
									{
										field : 'deleteAdd',
										title : '删除',
										width : 10,
										align : 'center',
										formatter : function(value, row, index) {
											return "<a href='#' onclick=\"myDeleteRows('"+row.jfAccountingSpecies+"','jfAccountingSpecies','addFinancialTable',0);sumDataGrid(1);\">删除</a>";
										}
									} ] ],
							width : '100%',
							height : '100%',
							singleSelect : true,
							autoRowHeight : false,
							scrollbarSize : 0,
							showPageList : false,
							fitColumns : true,
							onClickCell : onClickCell1,//点击一个单元格的时候触发
						});
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
			hideLoading();
			myTips('冲账原因必填!','error');
//			var note = jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"进行冲账"+"<br>";
		}else{
			var note = jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"进行冲账"+" 备注："+jfStrikeABalanceReason+"<br>";
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
						updatePageInfo();
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
						updatePageInfo();
					}
				});
			}
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
					updatePageInfo();
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
					updatePageInfo();
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
					updatePageInfo();
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
					updatePageInfo();
				}
			});
		}
	}
}
function updatePageInfo(){
	queryFinancial(_pageNum[0],0);
	$("#checkFinancial").dialog('close');
	$("#financialInfoDlg").dialog('close');
}

//单元格单击编辑
//新增收支单元格编辑
var editIndex1 = undefined;
function endEditing1() {
	if (editIndex1 == undefined) {
		return true
	}
	if ($('#addFinancialTable').datagrid('validateRow', editIndex1)) {
		$('#addFinancialTable').datagrid('endEdit', editIndex1);
		sumDataGrid(1);
		editIndex1 = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell1(index, field) {
	if (endEditing1()) {
		$('#addFinancialTable').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex1 = index;
	}
}
/*function onClickRow1(index) {
	if (editIndex1 != index){
		if (endEditing1()) {
			$('#addFinancialTable').datagrid('selectRow', index)
								   .datagrid('beginEdit', index);
			editIndex1 = index;
		} else {
			$('#addFinancialTable').datagrid('selectRow', editIndex1);
		}
	}
}*/

var editIndex2 = undefined;
function endEditing2() {
	if (editIndex2 == undefined) {
		return true
	}
	if ($('#setRenterEveryFinancialTable').datagrid('validateRow', editIndex2)) {
		$('#setRenterEveryFinancialTable').datagrid('endEdit', editIndex2);
		sumDataGrid(2);
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

var editIndex3 = undefined;
function endEditing3() {
	if (editIndex3 == undefined) {
		return true
	}
	if ($('#setRenterNewFinancialTable').datagrid('validateRow', editIndex3)) {
		$('#setRenterNewFinancialTable').datagrid('endEdit', editIndex3);
		sumDataGrid(3);
		editIndex3 = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell3(index, field) {
	if (endEditing3()) {
		$('#setRenterNewFinancialTable').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex3 = index;
	}
}
// 执行添加收支
function doAddFinancial() {
	showLoading();
	var rows = $("#addFinancialTable").datagrid("getRows");
	if ($('#addFinancialTableDiv input').length != 0) {
		$.messager.alert('操作提示', '数据表中有未完成编辑的数据，请完成编辑后再保存！');
		hideLoading();
		return;
	}
	var moneySum = $(".add_financial_moneySum").val();
	var moneyGet = $(".add_financial_moneyGet").val();
	var moneyTotal = $(".add_financial_moneyTotal").val();
	var relationBelongType = $(".add_financial_belongType").find('option:selected').text();
	var relationBelong = $(".add_houseCoding").val();
	var relationBelongChose = $(".add_houseCodingType").val();
	var relationBelongName = $(".add_financial_belongName").val();
	var relationBelongId = $(".add_financial_belongId").val();
	
	var addFinancialHouseId = $(".addFinancialHouseId").val();
	var addFinancialHouseStoreId = $(".addFinancialHouseStoreId").val();
	var addFinancialHouseRentId = $(".addFinancialHouseRentId").val();
	var addFinancialManagerUserId = $(".addFinancialManagerUserId").val();
	var addFinancialRenterId = $(".addFinancialRenterId").val();
	var addFinancialLandlordId = $(".addFinancialLandlordId").val();
	
	var addFinancialWay = $(".add_financial_way").find('option:selected').text();
	
	if (relationBelongType == '' || relationBelong == ''|| relationBelongName == '' || relationBelongId == '') {
		myTips('收支归属信息不完整！请完善后再进行保存！', "error");
		hideLoading();return;
	} else if (rows.length == 0) {
		myTips('没有可用于添加的数据', "error");
		hideLoading();
		return;
	}
	
	if (moneySum != 0 && (relationBelongChose=='已租' || relationBelongChose=='未租')) {
		
		var jfSumMoney = $('.add_financial_moneySum').val();
		var jfNatureOfThe = '';
		var jfBigType = '欠结类';
		var jfAccountingSpecies = '';
		var jfFinanNote = '';
		var renterBaseMoney = $('#renterBaseMoneyInput').val();
		var landlordBaseMoney = $('#landlordBaseMoneyInput').val();
		var insertJson = [];
		for(var i in rows){
			jfFinanNote += rows[i].jfNatureOfThe+"-"
			+rows[i].jfAccountingSpecies+":"+rows[i].jfSumMoney+"元,";
		}
		jfFinanNote+="合计金额："+ jfSumMoney +"元,"+"实际金额："+ moneyGet +"元,";
		
		if(relationBelongType=="租客"){
			if(renterBaseMoney==0){
				if (moneySum > 0) {
					insertJson.push({
						jfSumMoney 			: moneySum,
						jfNatureOfThe 		: "支出",
						jfBigType			: "财务类",
						jfAccountingSpecies : "应收款",
						jfFinanNote 		: jfFinanNote+'应收款'+moneySum+"元。",
					});
					insertJson.push({
						jfSumMoney 			: moneySum,
						jfNatureOfThe 		: "支出",
						jfBigType			: "欠结类",
						jfAccountingSpecies : "租客欠结款",
						jfFinanNote 		: jfFinanNote+'租客欠结款'+moneySum+"元。",
					});
				} else {
					insertJson.push({
						jfSumMoney 			: accSub(0,moneySum),
						jfNatureOfThe 		: "收入",
						jfBigType			: "欠结类",
						jfAccountingSpecies : "租客预存款",
						jfFinanNote 		: jfFinanNote + '租客预存款'+moneySum+"元。",
					});
				}
			}
			if(renterBaseMoney>0){
				if (moneySum > 0) {
					insertJson.push({
						jfSumMoney 			: moneySum,
						jfNatureOfThe 		: "支出",
						jfBigType			: "财务类",
						jfAccountingSpecies : "应收款",
						jfFinanNote 		: jfFinanNote+'应收款'+moneySum+"元。",
					});
					insertJson.push({
						jfSumMoney 			: moneySum,
						jfNatureOfThe 		: "支出",
						jfBigType			: "欠结类",
						jfAccountingSpecies : "租客欠结款",
						jfFinanNote 		: jfFinanNote+'租客欠结款'+moneySum+"元。",
					});
				}else{
					if(accAdd(renterBaseMoney,moneySum)>=0 ){
						insertJson.push({
							jfSumMoney 			: accSub(0,moneySum),
							jfNatureOfThe 		: "收入",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "租客还欠结款",
							jfFinanNote 		: jfFinanNote + '租客还欠结款'+moneySum+"元。",
						});
					}else{
						insertJson.push({
							jfSumMoney 			:  accSub(0,accAdd(renterBaseMoney,moneySum)),
							jfNatureOfThe 		: "收入",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "租客预存款",
							jfFinanNote 		: jfFinanNote + '租客预存款'+ accSub(0,accAdd(renterBaseMoney,moneySum))+"元。",
						});
						insertJson.push({
							jfSumMoney 			: renterBaseMoney,
							jfNatureOfThe 		: "收入",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "租客还欠结款",
							jfFinanNote 		: jfFinanNote + '租客还欠结款'+renterBaseMoney+"元。",
						});
					}
				}
			}
			if(renterBaseMoney<0){
				if (moneySum > 0) {
					if(accAdd(renterBaseMoney,moneySum)>=0){
						insertJson.push({
							jfSumMoney 			: moneySum,
							jfNatureOfThe 		: "支出",
							jfBigType			: "财务类",
							jfAccountingSpecies : "应收款",
							jfFinanNote 		: jfFinanNote+'应收款'+moneySum+"元。",
						});
						insertJson.push({
							jfSumMoney 			:  accAdd(renterBaseMoney,moneySum),
							jfNatureOfThe 		: "支出",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "租客欠结款",
							jfFinanNote 		: jfFinanNote + '租客欠结款'+ accAdd(renterBaseMoney,moneySum) +"元。",
						});
						insertJson.push({
							jfSumMoney 			:  accSub(0,renterBaseMoney),
							jfNatureOfThe 		: "支出",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "还租客预存款",
							jfFinanNote 		: jfFinanNote + '还租客预存款'+ accSub(0,renterBaseMoney) +"元。",
						});
					}else{
						insertJson.push({
							jfSumMoney 			:  moneySum,
							jfNatureOfThe 		: "支出",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "还租客预存款",
							jfFinanNote 		: jfFinanNote + '还租客预存款'+ moneySum +"元。",
						});
					}
				}else{
					insertJson.push({
						jfSumMoney 			:  accSub(0,moneySum),
						jfNatureOfThe 		: "收入",
						jfBigType			: "欠结类",
						jfAccountingSpecies : "租客预存款",
						jfFinanNote 		: jfFinanNote + '租客预存款'+accAdd(renterBaseMoney,moneySum)+"元。",
					});
				}
			}
		}
		if(relationBelongType=="业主"){
			if(landlordBaseMoney==0){
					if (moneySum > 0) {
					insertJson.push({
						jfSumMoney 			: moneySum,
						jfNatureOfThe 		: "支出",
						jfBigType			: "财务类",
						jfAccountingSpecies : "应收款",
						jfFinanNote 		: jfFinanNote+'应收款'+moneySum+"元。",
					});
					insertJson.push({
						jfSumMoney 			: moneySum,
						jfNatureOfThe 		: "支出",
						jfBigType			: "欠结类",
						jfAccountingSpecies : "房东欠结款",
						jfFinanNote 		: jfFinanNote+'房东欠结款'+moneySum+"元。",
					});
				}else{
					insertJson.push({
						jfSumMoney 			: accSub(0,moneySum),
						jfNatureOfThe 		: "收入",
						jfBigType			: "欠结类",
						jfAccountingSpecies : "待付房东款",
						jfFinanNote 		: jfFinanNote + '待付房东款'+moneySum+"元。",
					});
				}
			}
			if(landlordBaseMoney>0){
					if (moneySum > 0) {
					insertJson.push({
						jfSumMoney 			: moneySum,
						jfNatureOfThe 		: "支出",
						jfBigType			: "财务类",
						jfAccountingSpecies : "应收款",
						jfFinanNote 		: jfFinanNote+'应收款'+moneySum+"元。",
					});
					insertJson.push({
						jfSumMoney 			: moneySum,
						jfNatureOfThe 		: "支出",
						jfBigType			: "欠结类",
						jfAccountingSpecies : "房东欠结款",
						jfFinanNote 		: jfFinanNote+'房东欠结款'+moneySum+"元。",
					});
				}else{
					if(accAdd(landlordBaseMoney,moneySum)>=0 ){
						insertJson.push({
							jfSumMoney 			: accSub(0,moneySum),
							jfNatureOfThe 		: "收入",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "房东还欠结款",
							jfFinanNote 		: jfFinanNote + '房东还欠结款'+moneySum+"元。",
						});
					}else{
						insertJson.push({
							jfSumMoney 			:  accSub(0,accAdd(landlordBaseMoney,moneySum)),
							jfNatureOfThe 		: "收入",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "待付房东款",
							jfFinanNote 		: jfFinanNote + '待付房东款'+ accSub(0,accAdd(landlordBaseMoney,moneySum))+"元。",
						});
						insertJson.push({
							jfSumMoney 			: landlordBaseMoney,
							jfNatureOfThe 		: "收入",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "房东还欠结款",
							jfFinanNote 		: jfFinanNote + '房东还欠结款'+landlordBaseMoney+"元。",
						});
					}
				}
			}
			if(landlordBaseMoney<0){
				if (moneySum > 0) {
					if(accAdd(landlordBaseMoney,moneySum)>=0){
						insertJson.push({
							jfSumMoney 			: moneySum,
							jfNatureOfThe 		: "支出",
							jfBigType			: "财务类",
							jfAccountingSpecies : "应收款",
							jfFinanNote 		: jfFinanNote+'应收款'+moneySum+"元。",
						});
						insertJson.push({
							jfSumMoney 			:  accAdd(landlordBaseMoney,moneySum),
							jfNatureOfThe 		: "支出",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "房东欠结款",
							jfFinanNote 		: jfFinanNote + '房东欠结款'+ accAdd(landlordBaseMoney,moneySum) +"元。",
						});
						insertJson.push({
							jfSumMoney 			:  accSub(0,landlordBaseMoney),
							jfNatureOfThe 		: "支出",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "支付房东待付款",
							jfFinanNote 		: jfFinanNote + '支付房东待付款'+ accSub(0,landlordBaseMoney) +"元。",
						});
					}else{
						insertJson.push({
							jfSumMoney 			:  moneySum,
							jfNatureOfThe 		: "支出",
							jfBigType			: "欠结类",
							jfAccountingSpecies : "支付房东待付款",
							jfFinanNote 		: jfFinanNote + '支付房东待付款'+ moneySum +"元。",
						});
					}
				}else{
					insertJson.push({
						jfSumMoney 			:  accSub(0,moneySum),
						jfNatureOfThe 		: "收入",
						jfBigType			: "欠结类",
						jfAccountingSpecies : "待付房东款",
						jfFinanNote 		: jfFinanNote + '待付房东款'+ accSub(0,moneySum) +"元。",
					});
				}
			}
		}
		
		var rowLength = $('#addFinancialTable').datagrid('getRows').length;
		for(var i in insertJson){
			if(insertJson[i].jfSumMoney!=0){
				$('#addFinancialTable').datagrid('insertRow', {
					index : parseInt(rowLength),
					row : insertJson[i]
				});
			}
		}
	}
	rows = $("#addFinancialTable").datagrid("getRows");
	
	
	var belongId = '"jfRenterId":"' + addFinancialRenterId + '",'+'"jfLandlordId":"' + addFinancialLandlordId + '"';
	var belongConding  = '"jfHouse4rentId":"' + addFinancialHouseRentId + '",'
						+'"jfHouse4storeId":"' + addFinancialHouseStoreId + '",'
						+'"jfHouseId":"' + addFinancialHouseId + '",'
						+'"jfManagerUserId":"' + addFinancialManagerUserId + '"';
	
	var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
	var jfBillingDate = '"jfBillingDate":"' + $(".add_financial_doTime").val() + '"';
	var jfHandlers = '"jfHandlers":"' + $("#addFinancialHandlerGetUserId").val() + '"';
	var jfTheOwnershipType = '"jfTheOwnershipType":"' + relationBelongType + '"';
	var jfBelongingToTheName = '"jfBelongingToTheName":"' + relationBelongName + '"';
	
	var jfFinancialCoding = '"jfFinancialCoding":"'
						+ formatTime(getNowFormatDate(), 3)
						+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
						+ Math.floor(Math.random() * 10) + '"';
	var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ','+_loginUserName+'添加收支记录<br>"';
	var jfAccountId = '"jfAccountId":"' + $(".add_financial_bankNums").val() + '"';
	var jfPayType = '"jfPayType":"' + $("#addFinancialPayType").val() + '"';
	var department = '"department":"' + _loginDepartment + '"';
	var jfAccountingWhy = '"jfAccountingWhy":"' + $(".add_financial_belongAddress").val() + '"';
	var storefront = '"storefront":"' + _loginStore + '"';
	var jfClosedWay = '"jfClosedWay":"' + addFinancialWay + '"';
	
	if(belongId != ""){//项目没有belongId
		strArray = jfAccountId + "," + jfAccountingWhy + ","
			+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + ","
			+ belongConding + "," + belongId + "," + jfBillingDate + ","
			+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
			+storefront+","+department+","+jfPayType+","+jfClosedWay;
	}else{
		strArray = jfAccountId + "," + jfAccountingWhy + ","
			+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + ","
			+ belongConding + "," + jfBillingDate + ","
			+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
			+storefront+","+department+","+jfPayType+","+jfClosedWay;
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
	$.post("../insertFinancialAll.action",{
		jsonArray : jsonStrArry
	},function(data) {
		if(data.code<0||data==''){
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			hideLoading();
		}else{
			if ($('#addFinancialTable').datagrid('getData').rows[0].jfNatureOfThe == '欠结') {
				$('#addFinancialTable').datagrid('deleteRow', 0);
			}
			var nullData = [];
			$("#addFinancialTable").datagrid("loadData", nullData);
			$("#addFinancialDlg input").val('');
			$(".add_financial_belongType").html('<option></option>');
			$('#financilAddJfNatureOfThe').val('');
			$('#financilAddJfBigType').val('');
			$('#financilAddJfAccountingSpecies').val('');
			$(".add_financial_accountName").empty();
			$(".add_financial_way").val('');
			$('.add_financial_moneyTotal').val('0.00');
			$('.add_financial_moneyGet').val('0.00');
			$('.add_financial_moneySum').val('0.00');
			$('#replacedFinancialTotal').val('0.00');
			$('#replacedFinancialEd').val('0.00');
			$('#replacedFinancialTotalOwe').val('0.00');
			$('#owePayFinancialMoney').val('0.00');
			$('#replacedFinancialTotalOwe').val('0.00');
			$('.add_financial_doTime').val(formatTime(getNowFormatDate(), 2));
			$('#addFinancialPayType').val('');
			for(var j in _userInfoData){
				if(_loginUserId == _userInfoData[j].userId){
					$("#addFinancialHandlerGetUserId").val(_userInfoData[j].userId);
					$("#addFinancialHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
				}
			}			
			myTips('添加成功！', 'success');
			hideLoading();
			var page=$(".current").html();
			queryFinancial(page, 0);//添加收支返回第一页
		}
	});
}
//执行添加代支出
function doReplacedFinancial() {
	showLoading();
	var rows = $("#addFinancialTable").datagrid("getRows");
	if ($('#addFinancialTableDiv input').length != 0) {
		$.messager.alert('操作提示', '数据表中有未完成编辑的数据，请完成编辑后再保存！');
		hideLoading();
		return;
	}
	var moneySum = $(".add_financial_moneySum").val();
	var moneyGet = $(".add_financial_moneyGet").val();
	var moneyTotal = $(".add_financial_moneyTotal").val();
	var relationBelongType = $(".add_financial_belongType").find('option:selected').text();
	var relationBelong = $(".add_houseCoding").val();
	var relationBelongChose = $(".add_houseCodingType").val();
	var relationBelongName = $(".add_financial_belongName").val();
	var relationBelongId = $(".add_financial_belongId").val();
	
	var addFinancialHouseId = $(".addFinancialHouseId").val();
	var addFinancialHouseStoreId = $(".addFinancialHouseStoreId").val();
	var addFinancialHouseRentId = $(".addFinancialHouseRentId").val();
	var addFinancialRenterId = $(".addFinancialRenterId").val();
	var addFinancialLandlordId = $(".addFinancialLandlordId").val();
	var addFinancialWay = $(".add_financial_way").find('option:selected').text();
	
	if (relationBelongType == '' || relationBelong == ''|| relationBelongName == '' || relationBelongId == '') {
		myTips('收支归属信息不完整！请完善后再进行保存！', "error");
		hideLoading();
		return;
	} else if (rows.length == 0) {
		myTips('没有可用于添加的数据', "error");
		hideLoading();
		return;
	}
	$("#replacedFinancialTable").datagrid("loadData",[]);
	var oweRows = [];
	var renterBaseMoney = $('#renterBaseMoneyInput').val();
	for (var i in rows) {
		if (relationBelongType == "租客") {
			rows[i].jfNatureOfThe='支出';
			var dataJson = {
					jfSumMoney 				: rows[i].jfSumMoney,
					jfAccountingSpecies 	: '租客欠结款',
					jfNatureOfThe 			: '支出',
					jfFinanNote 			: '代支出-'+rows[i].jfAccountingSpecies+'：'+rows[i].jfFinanNote+'元。租客欠结：'+rows[i].jfSumMoney+'元',
					jfBigType				: "欠结类",
					jfStartCycle			: rows[i].jfStartCycle,
					jfEndCycle				: rows[i].jfEndCycle,
					jfTicketNumber 			: rows[i].jfTicketNumber,
			};
			$('#replacedFinancialTable').datagrid('insertRow', {
				index : 0,
				row : rows[i]
			});
			$('#replacedFinancialTable').datagrid('insertRow', {
				index : 0,
				row : dataJson
			});
		}else if(relationBelongType == "业主"){
			rows[i].jfNatureOfThe='支出';
			var dataJson = {
					jfSumMoney 				: rows[i].jfSumMoney,
					jfAccountingSpecies 	: '房东欠结款',
					jfNatureOfThe 			: '支出',
					jfFinanNote 			: '代支出-'+rows[i].jfAccountingSpecies+'：'+rows[i].jfFinanNote+'元。房东欠结：'+rows[i].jfSumMoney+'元',
					jfBigType				: "欠结类",
					jfStartCycle			: rows[i].jfStartCycle,
					jfEndCycle				: rows[i].jfEndCycle,
					jfTicketNumber 			: rows[i].jfTicketNumber,
			};
			$('#replacedFinancialTable').datagrid('insertRow', {
				index : 0,
				row : rows[i]
			});
			$('#replacedFinancialTable').datagrid('insertRow', {
				index : 0,
				row : dataJson
			});
		}
	}
	var oweRows = $("#replacedFinancialTable").datagrid("getRows");
	var belongId = '"jfRenterId":"' + addFinancialRenterId + '",'+'"jfLandlordId":"' + addFinancialLandlordId + '"';
	var belongConding  = '"jfHouse4rentId":"' + addFinancialHouseRentId + '",'
						+'"jfHouse4storeId":"' + addFinancialHouseStoreId + '",'
						+'"jfHouseId":"' + addFinancialHouseId + '"';
	var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
	var jfBillingDate = '"jfBillingDate":"' + $(".add_financial_doTime").val() + '"';
	var jfHandlers = '"jfHandlers":"' + $("#addFinancialHandlerGetUserId").val() + '"';
	var jfTheOwnershipType = '"jfTheOwnershipType":"' + relationBelongType + '"';
	var jfBelongingToTheName = '"jfBelongingToTheName":"' + relationBelongName + '"';
	
	var jfFinancialCoding = '"jfFinancialCoding":"'
							+ formatTime(getNowFormatDate(), 3)
							+ Math.floor(Math.random() * 10) 
							+ Math.floor(Math.random() * 10)
							+ Math.floor(Math.random() * 10) + '"';
	var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ','+_loginUserName+'添加收支记录<br>"';
	var jfPayType = '"jfPayType":"' + $("#addFinancialPayType").val() + '"';
	var jfAccountId = '"jfAccountId":"' + $(".add_financial_bankNums").val() + '"';
	var department = '"department":"' + _loginDepartment + '"';
	var jfAccountingWhy = '"jfAccountingWhy":"' + $(".add_financial_belongAddress").val() + '"';
	var storefront = '"storefront":"' + _loginStore + '"';
	var jfClosedWay = '"jfClosedWay":"' + addFinancialWay + '"';
	if(belongId != ""){//项目没有belongId
		strArray = jfAccountId + "," + jfAccountingWhy + ","
				+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + ","
				+ belongConding + "," + belongId + "," + jfBillingDate + ","
				+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
				+storefront+","+department+","+jfPayType+","+jfClosedWay;
	}else{
		strArray = jfAccountId + "," + jfAccountingWhy + ","
				+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + ","
				+ belongConding + "," + jfBillingDate + ","
				+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
				+storefront+","+department+","+jfPayType+","+jfClosedWay;
	}
	var jsonStrArry = '';
	for (var i in oweRows) {
		if (i == 0) {
			jsonStrArry += JSON.stringify(oweRows[i]).split('}')[0] + ','
					+ strArray + '}';
		} else {
			jsonStrArry += ',' + JSON.stringify(oweRows[i]).split('}')[0] + ','
					+ strArray + '}';
		}
	}
	jsonStrArry = "[" + jsonStrArry + "]";
	$.post("../insertFinancialAll.action",{
		jsonArray : jsonStrArry
	},function(data) {
		if(data.code<0||data==''){
				myTips('添加失败！', 'error');
				hideLoading();
		}else{
			var nullData = [];
			$("#addFinancialTable").datagrid("loadData", nullData);
			$("#addFinancialDlg input").val('');
			$(".add_financial_belongType").html('<option></option>');
			$('#financilAddJfNatureOfThe').val('');
			$('#financilAddJfBigType').val('');
			$('#financilAddJfAccountingSpecies').val('');
			$(".add_financial_accountName").empty();
			$(".add_financial_way").val('');
			$('.add_financial_moneyTotal').val('0.00');
			$('.add_financial_moneyGet').val('0.00');
			$('.add_financial_moneySum').val('0.00');
			$('#replacedFinancialTotal').val('0.00');
			$('#replacedFinancialEd').val('0.00');
			$('#replacedFinancialTotalOwe').val('0.00');
			$('#owePayFinancialMoney').val('0.00');
			$('#replacedFinancialTotalOwe').val('0.00');
			$('.add_financial_doTime').val(formatTime(getNowFormatDate(), 2));
			$('#addFinancialPayType').val('');
			for(var j in _userInfoData){
				if(_loginUserId == _userInfoData[j].userId){
					$("#addFinancialHandlerGetUserId").val(_userInfoData[j].userId);
					$("#addFinancialHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
				}
			}
			myTips('添加成功！', 'success');
			hideLoading();
			queryFinancial(1, 0);//添加代支出返回第一页
		}
	});
}
//执行添加欠结补结
function doOweFinancial() {
	showLoading();
	var rows = $("#addFinancialTable").datagrid("getRows");
	if ($('#addFinancialTableDiv input').length != 0) {
		$.messager.alert('操作提示', '数据表中有未完成编辑的数据，请完成编辑后再保存！');
		hideLoading();
		return;
	}
	var giveFlag = 0;
	var giveMoney = 0.00;
	for(var i in rows){
		if(rows[i].jfAccountingSpecies.indexOf("优惠券")>-1){
			giveMoney=rows[i].jfSumMoney;
			giveFlag++;
		}
	}
	var moneySum = $(".add_financial_moneySum").val();
	var moneyGet = $(".add_financial_moneyGet").val();
	var moneyTotal = $(".add_financial_moneyTotal").val();
	var relationBelongType = $(".add_financial_belongType").find('option:selected').text();
	var relationBelong = $(".add_houseCoding").val();
	var relationBelongChose = $(".add_houseCodingType").val();
	var relationBelongName = $(".add_financial_belongName").val();
	var relationBelongId = $(".add_financial_belongId").val();
	
	var addFinancialHouseId = $(".addFinancialHouseId").val();
	var addFinancialHouseStoreId = $(".addFinancialHouseStoreId").val();
	var addFinancialHouseRentId = $(".addFinancialHouseRentId").val();
	var addFinancialManagerUserId = $(".addFinancialManagerUserId").val();
	var addFinancialRenterId = $(".addFinancialRenterId").val();
	var addFinancialLandlordId = $(".addFinancialLandlordId").val();
	var addFinancialWay = $(".add_financial_way").find('option:selected').text();
	if (relationBelongType == '' || relationBelong == ''|| relationBelongName == '' || relationBelongId == '') {
		myTips('收支归属信息不完整！请完善后再进行保存！', "error");
		hideLoading();
		return;
	} else if (rows.length == 0) {
		myTips('没有可用于添加的数据', "error");
		hideLoading();
		return;
	}
	var jfPayType = '"jfPayType":"' + $("#addFinancialPayType").val() + '"';
	var belongId = '"jfRenterId":"' + addFinancialRenterId + '",'+'"jfLandlordId":"' + addFinancialLandlordId + '"';
	var belongConding  = '"jfHouse4rentId":"' + addFinancialHouseRentId + '",'+'"jfHouse4storeId":"' + addFinancialHouseStoreId + '",'+'"jfHouseId":"' + addFinancialHouseId + '",'+'"jfManagerUserId":"' + addFinancialManagerUserId + '"';
	
	var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
	var jfBillingDate = '"jfBillingDate":"' + $(".add_financial_doTime").val()
			+ '"';
	var jfHandlers = '"jfHandlers":"' + $("#addFinancialHandlerGetUserId").val() + '"';
	var jfTheOwnershipType = '"jfTheOwnershipType":"' + relationBelongType
			+ '"';
	var jfBelongingToTheName = '"jfBelongingToTheName":"' + relationBelongName
			+ '"';
	
	var jfFinancialCoding = '"jfFinancialCoding":"'
			+ formatTime(getNowFormatDate(), 3)
			+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
			+ Math.floor(Math.random() * 10) + '"';
	var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ','+_loginUserName+'添加收支记录<br>"';
	var jfAccountId = '"jfAccountId":"' + $(".add_financial_bankNums").val() + '"';
	var department = '"department":"' + _loginDepartment + '"';
	var jfAccountingWhy = '"jfAccountingWhy":"' + $(".add_financial_belongAddress").val() + '"';
	var storefront = '"storefront":"' + _loginStore + '"';
	var jfClosedWay = '"jfClosedWay":"' + addFinancialWay + '"';
	
	if(belongId != ""){//项目没有belongId
		strArray = jfAccountId + "," + jfAccountingWhy + ","
			+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + ","
			+ belongConding + "," + belongId + "," + jfBillingDate + ","
			+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
			+storefront+","+department+","+jfPayType+","+jfClosedWay;
	}else{
		strArray = jfAccountId + "," + jfAccountingWhy + ","
			+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + ","
			+ belongConding + "," + jfBillingDate + ","
			+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
			+storefront+","+department+","+jfPayType+","+jfClosedWay;
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
	$.post("../insertFinancialAll.action",{
		jsonArray : jsonStrArry
	},function(data) {
		if(data.code<0||data==''){
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			hideLoading();
		}else{
			myTips('添加成功！', 'success');
			hideLoading();
			
			if(giveFlag>0){
				$.messager.confirm("操作提示", "是否发送短信通知租客优惠券已到账？", function(data) {
					if(data){
						//优惠券短信JSON
						var giveRenterJson= {
								smPopId 	: $(".add_financial_popId").val(),
								smrentId	: $(".add_financial_belongId").val(),
								smMoney		: giveMoney,
								smRentId	: addFinancialHouseRentId,
								smNotRentId	: addFinancialHouseStoreId,
								messageType	: 13,
								smUserId    : _loginUserId,
						};
						$.post("../massage/sendOutsideMessage.action",giveRenterJson ,function(data) {
							if(data.code<0){
								myTips(data.msg,"error");
								return;
							}
							myTips("发送成功!","success");
							var nullData = [];
							$("#addFinancialTable").datagrid("loadData", nullData);
							$("#addFinancialDlg input").val('');
							$(".add_financial_belongType").html('<option></option>');
							$('#financilAddJfNatureOfThe').val('');
							$('#financilAddJfBigType').val('');
							$('#financilAddJfAccountingSpecies').val('');
							$(".add_financial_accountName").empty();
							$(".add_financial_way").val('');
							$('.add_financial_moneyTotal').val('0.00');
							$('.add_financial_moneyGet').val('0.00');
							$('.add_financial_moneySum').val('0.00');
							$('#replacedFinancialTotal').val('0.00');
							$('#replacedFinancialEd').val('0.00');
							$('#replacedFinancialTotalOwe').val('0.00');
							$('#owePayFinancialMoney').val('0.00');
							$('#oweGetFinancialMoney').val('0.00');
							$('.add_financial_doTime').val(formatTime(getNowFormatDate(), 2));
							$('#addFinancialPayType').val('');
							for(var j in _userInfoData){
								if(_loginUserId == _userInfoData[j].userId){
									$("#addFinancialHandlerGetUserId").val(_userInfoData[j].userId);
									$("#addFinancialHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
								}
							}
							queryFinancial(1, 0);//添加欠结补结返回第一页
						});
					}else{
						var nullData = [];
						$("#addFinancialTable").datagrid("loadData", nullData);
						$("#addFinancialDlg input").val('');
						$(".add_financial_belongType").html('<option></option>');
						$('#financilAddJfNatureOfThe').val('');
						$('#financilAddJfBigType').val('');
						$('#financilAddJfAccountingSpecies').val('');
						$(".add_financial_accountName").empty();
						$(".add_financial_way").val('');
						$('.add_financial_moneyTotal').val('0.00');
						$('.add_financial_moneyGet').val('0.00');
						$('.add_financial_moneySum').val('0.00');
						$('#replacedFinancialTotal').val('0.00');
						$('#replacedFinancialEd').val('0.00');
						$('#replacedFinancialTotalOwe').val('0.00');
						$('#owePayFinancialMoney').val('0.00');
						$('#oweGetFinancialMoney').val('0.00');
						$('.add_financial_doTime').val(formatTime(getNowFormatDate(), 2));
						$('#addFinancialPayType').val('');
						for(var j in _userInfoData){
							if(_loginUserId == _userInfoData[j].userId){
								$("#addFinancialHandlerGetUserId").val(_userInfoData[j].userId);
								$("#addFinancialHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
							}
						}
						hideLoading();
						queryFinancial(1, 0);//添加欠结补结返回第一页
					}
				});
			}else{
				var nullData = [];
				$("#addFinancialTable").datagrid("loadData", nullData);
				$("#addFinancialDlg input").val('');
				$(".add_financial_belongType").html('<option></option>');
				$('#financilAddJfNatureOfThe').val('');
				$('#financilAddJfBigType').val('');
				$('#financilAddJfAccountingSpecies').val('');
				$(".add_financial_accountName").empty();
				$(".add_financial_way").val('');
				$('.add_financial_moneyTotal').val('0.00');
				$('.add_financial_moneyGet').val('0.00');
				$('.add_financial_moneySum').val('0.00');
				$('#replacedFinancialTotal').val('0.00');
				$('#replacedFinancialEd').val('0.00');
				$('#replacedFinancialTotalOwe').val('0.00');
				$('#owePayFinancialMoney').val('0.00');
				$('#oweGetFinancialMoney').val('0.00');
				$('.add_financial_doTime').val(formatTime(getNowFormatDate(), 2));
				$('#addFinancialPayType').val('');
				for(var j in _userInfoData){
					if(_loginUserId == _userInfoData[j].userId){
						$("#addFinancialHandlerGetUserId").val(_userInfoData[j].userId);
						$("#addFinancialHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
					}
				}
				hideLoading();
				queryFinancial(1, 0);//添加欠结补结返回第一页
			}
			
		}
	});
}
// 费用关联列表对话框
function relationDlg(type) {
	$('#relationType').val('');
	if(type==0){//新增收支
		$('#relationDlg').dialog({
			title : '费用关联',
			top : getTop(450),
			left : getLeft(750),
			width : 750,
			height : 420,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				
			}
		});
		$('#relationTypeDiv').show();
		$('#relationType').val(0);
	}else if(type==1){//生成租客每期收支
		$('#relationDlg').dialog({
			title : '选择已租房',
			top : getTop(450),
			left : getLeft(750),
			width : 750,
			height : 420,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				
			}
		});
		$('#relationTypeDiv').hide();
		$('#relationType').val(1);
	}else if(type==2){//生成新签租客收支
		$('#relationDlg').dialog({
			title : '选择已租房',
			top : getTop(450),
			left : getLeft(750),
			width : 750,
			height : 420,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				
			}
		});
		$('#relationTypeDiv').hide();
		$('#relationType').val(2);
	}
	$('#searchBelongType').val('1');
	relationDataGrid();
	$('#relationDlg').dialog('open');
}
// 费用关联选择列表
function relationDataGrid() {
	var relationType = $('#searchBelongType').find('option:selected').text();
	$("#searchVirtualName").val("");
	$("#searchVirtualDoorplateno").val("");
	$("#searchVirtualContact").val("");
	
	$("#searchLeaseStateDiv").hide();
	$("#renterBaseMoneyDiv").hide();
	$("#landlordBaseMoneyDiv").hide();
	$("#renterBaseMoneyInput").val(0);
	$("#landlordBaseMoneyInput").val(0);
	
	if (relationType == '已租列表') {
		$("#searchLeaseStateDiv").show();
		$('#choseSource').show();
		$('#choseTrusteeship').hide();
		$('#choseVirtual').hide();
		$('#relationSelect').show();
		$('#virtualRelationSelect').hide();
		if ($('#choseSourceTable').hasClass('datagrid-f')) {

		} else {
			$('#choseSourceTable').datagrid(
				{
					columns : [ [ {
						field : 'hrAddDistrict',
						title : '城区',
						width : 10,
						align : 'center'
					}, {
						field : 'hrAddZone',
						title : '片区',
						width : 10,
						align : 'center'
					}, {
						field : 'hrAddCommunity',
						title : '楼盘名称',
						width : 20,
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
					width : '98%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						houseDbFunction(rowData);
					}
				});
		}
		relationDate(1, 0);
	}
	if (relationType == '未租列表') {
		$("#searchLeaseStateDiv").show();
		$('#choseSource').hide();
		$('#choseTrusteeship').show();
		$('#choseVirtual').hide();
		$('#relationSelect').show();
		$('#virtualRelationSelect').hide();
		if ($('#choseTrusteeshipTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipTable').datagrid(
				{
					columns : [ [  {
						field : 'hsAddDistrict',
						title : '城区',
						width : 10,
						align : 'center'
					}, {
						field : 'hsAddZone',
						title : '片区',
						width : 10,
						align : 'center'
					}, {
						field : 'hsAddCommunity',
						title : '楼盘名称',
						width : 20,
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
					width : '98%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseTrusteeshipTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$(".add_houseCoding").val(row.hsId);
							$(".addFinancialHouseId").val(row.hsHouseId);
							$(".addFinancialHouseStoreId").val(row.hsId);
							$(".addFinancialHouseRentId").val('');
							$(".addFinancialManagerUserId").val(row.hsManagerUserId);
							$(".addFinancialRenterId").val('');
							$(".addFinancialLandlordId").val(row.hsLandlordId);
							
							$(".add_houseCodingType").val('未租');
							$(".add_financial_belongAddress").val(
											row.hsAddCommunity
											+ row.hsAddBuilding
											+ row.hsAddDoorplateno);
							$(".add_financial_belongType").empty();
							$(".add_financial_belongType").append("<option value='"+row.hsLandlordId+"'>业主</option>");
							$(".add_financial_belongId").val(row.hsLandlordId);
							$(".add_financial_belongName").val(row.laPopName);
							$("#landlordBaseMoneyDiv").show();
							$("#landlordBaseMoneyInput").val(row.hsBase);
							$("#landlordBaseMoneyInputShow").val(row.hsBase);
							changeBaseShowFont("landlordBaseMoneyInputSpan","landlordBaseMoneyInputShow",2);
							$('#relationDlg').dialog('close')
						}
					}
				});
		}
		relationDate(1, 0);
	}
	if (relationType == '其他列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').hide();
		$('#choseVirtual').show();
		$('#relationSelect').hide();
		$('#virtualRelationSelect').show();
		if ($('#choseVirtualTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualTable').datagrid(
				{
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
						title : '编号',
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
					width : '98%',
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
							$(".add_houseCoding").val(row.houseCoding);
							$(".addFinancialHouseId").val(row.houseCoding);
							$(".addFinancialHouseStoreId").val('');
							$(".addFinancialHouseRentId").val('');
							$(".addFinancialManagerUserId").val('');
							$(".addFinancialRenterId").val('');
							$(".addFinancialLandlordId").val('');
							$(".add_houseCodingType").val('项目');
							$(".add_financial_belongAddress").val(
								"联系人:" + row.keyNumber + "  电话:" + row.houseEntrust4rent
							);
							$(".add_financial_belongType").empty();
							$(".add_financial_belongType").append("<option value='"+row.hrRenterId+"'>其他类</option>");
							$(".add_financial_belongId").val(row.houseCoding);
							$(".add_financial_belongName").val(row.keyAdministrator);
							$('#relationDlg').dialog('close');
						}
					}
				});
		}
		relationDate(1, 0);
	}
}
function belongTypeChange(){
	$(".add_financial_belongName").val('');
	$(".add_financial_belongId").val('');
	var belongType = $('.add_financial_belongType').find("option:selected").text();
	var belongTypeId = $('.add_financial_belongType').val();
	if(belongType=='租客'){
		$("#renterBaseMoneyDiv").show();
		$("#landlordBaseMoneyDiv").hide();
		$.post("../selectHouseRentName.action", {
			renterId : belongTypeId,
		}, function(data) {
			data=data.body;
			$(".add_financial_belongName").val(data[0].renterPopName);
			$(".add_financial_belongId").val(belongTypeId);
			$(".add_financial_popId").val(data[0].renterPopulationId);
		});
	}else if(belongType=='业主'){
		$("#renterBaseMoneyDiv").hide();
		$("#landlordBaseMoneyDiv").show();
		$.post("../selectlandlordName.action",{
			landlordId : belongTypeId
		},function(data) {
			data=data.body;
			$(".add_financial_belongName").val(data[0].laPopName);
			$(".add_financial_belongId").val(belongTypeId);
		});
	}
	
}
// 收支记录表导入信息
function queryFinancial(page, type) {
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
	// 收支记录表导入信息 
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
			$("#financialDg").datagrid("loadData", data);
			
		}
	}, "json");
	$('#oneWk').removeClass("choose-cur");
	$('#oneMon').removeClass("choose-cur");
	$('#threeMon').removeClass("choose-cur");
}
//分页统计数据
function getfinancialPageCount(page){
	var pageNum = 20;
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
		splitFlag				: 0,
	}, function(data) {
		console.log(data);
		if (data.code<0 || data.body[0].totalNum==0) {
			var countJson = {
					totalNum:0,
					totalMoney:0,
			};
			getCountData(0,countJson,pageNum,page,"financial",1);
		} else {
			data=data.body;
			
			var countJson = {
					totalNum	: data[0].totalNum,
					totalMoney	: data[0].totalMoney,
			};
			getCountData(1,countJson,pageNum,page,"financial",1);
		}
	}, "json");
}
// 查询关联
function relationDate(page, type) {
	
	var relation = $('#searchBelongType').val();
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();
	//项目
	var virtualType = '0';
	var searchVirtualName = $("#searchVirtualName").val();
	var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
	var searchVirtualContact = $("#searchVirtualContact").val();
	if (relation == 1) {
		$.post("../queryHouseRentCommon.action", {
			startNum : startNum,
			endNum : endNum,
			hrAddCity : qhAddCity,
			hrAddDistrict : qhAddDistrict,
			hrAddZone : qhAddZone,
			hrAddCommunity : qhAddCommunity,
			hrAddBuilding : qhAddBuilding,
			hrAddDoorplateno : qhAddDoorplateno,
		}, function(data) {
			if (data.code<0) {
				sourcePages(0, 0, 1);
				$('#choseSourceTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1 && type == 0) {
					console.log('已租列表：'+data[0].totalNum+' '+page);
					sourcePages(data[0].totalNum, page, 1);
				}
				$("#choseSourceTable").datagrid("loadData", data);
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
		}, function(data) {
			if (data.code<0) {
				sourcePages(0, 0, 2);
				$('#choseTrusteeshipTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1 && type == 0) {
					console.log('未租列表：'+data[0].totalNum+' '+page);
					sourcePages(data[0].totalNum, page, 2);
				}
				$("#choseTrusteeshipTable").datagrid("loadData", data);
			}
		}, "json");
	}
	if (relation == 3) {
		$.post("../queryVirtualFinancial.action", {
			startNum : startNum,
			endNum : endNum,
			virtualType : virtualType,
			keyAdministrator : searchVirtualName,
			addDoorplateno : searchVirtualDoorplateno,
			keyNumber : searchVirtualContact,
		}, function(data) {
			if (data.code<0) {
				sourcePages(0, 0, 3);
				$('#choseVirtualTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				if (page == 1 && type == 0) {
					console.log('其他列表：'+data.body[0].totalNum+' '+page);
					sourcePages(data.body[0].totalNum,page,3);
				}
				$("#choseVirtualTable").datagrid("loadData", data.body);
			}
		}, "json");
	}
}
// 分页操作
function sourcePages(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#financialPage").remove();
		$("#financialPageDiv")
				.append(
						"<div class='tcdPageCode' id='financialPage' style='text-align:center;'></div>");
		$("#financialPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryFinancial(p, 1);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseSourcePage").remove();
		$("#choseSourcePageDiv")
				.append(
						"<div class='tcdPageCode' id='choseSourcePage' style='text-align:center;'></div>");
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
	if (type == 2) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseTrusteeshipPage").remove();
		$("#choseTrusteeshipPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseTrusteeshipPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipPage").createPage({
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
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseVirtualPage").remove();
		$("#choseVirtualPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseVirtualPage' style='text-align:center;'></div>");
		$("#choseVirtualPage").createPage({
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
	if (type == 4) {
		pageNum = Math.ceil(totalNum /5);
		$("#needToAddNumberPage").remove();
		$("#needToAddNumberPageDiv")
				.append(
						"<div class='tcdPageCode' id='needToAddNumberPage' style='text-align:center;'></div>");
		$("#needToAddNumberPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					documentQuery(p, 1);
				}
			}
		});
	}
	if (type == 5) {
		pageNum = Math.ceil(totalNum / 15);
		$("#renterInstallmentPage").remove();
		$("#renterInstallmentPageDiv")
				.append(
						"<div class='tcdPageCode' id='renterInstallmentPage' style='text-align:center;'></div>");
		$("#renterInstallmentPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			addbr:true,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenterInstallment(p, 1);
				}
			}
		});
	}
	if (type == 6) {
		pageNum = Math.ceil(totalNum / 10);
		$("#monthInstallmentPage").remove();
		$("#monthInstallmentPageDiv")
				.append(
						"<div class='tcdPageCode' id='monthInstallmentPage' style='text-align:center;'></div>");
		$("#monthInstallmentPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenterMonthInstallment(p, 1);
				}
			}
		});
	}
	if (type == 7) {
		pageNum = Math.ceil(totalNum / 10);
		$("#certificateNumberPage").remove();
		$("#certificateNumberPageDiv")
				.append(
						"<div class='tcdPageCode' id='certificateNumberPage' style='text-align:center;'></div>");
		$("#certificateNumberPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryCertificateNumber(p, 1);
				}
			}
		});
	}
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
// 到期时间根据开始时间及合同期限改变而改变
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
// 账户类型和账号联动
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
	}
}
//财务状态列格式
function formatJfAuditState(value, row, index) {
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

//生成凭证号对话框
function addCertificateNumberDlg(){
	$("#addCertificateNumberDlg").dialog({
		title : '生成凭证号',
		top : getTop(520),
		left : getLeft(900),
		width : 900,
		height : 580,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	if ($('#needToAddNumberTable').hasClass('datagrid-f')) {

	} else {
		$('#needToAddNumberTable').datagrid({
			columns : [ [  {
				field : 'totalPage',
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
			}, {
				field : 'jfNatureOfThe',
				title : '收支性质',
				width : 10,
				align : 'center'
			},{
				field : 'jfAccountingSpecies',
				title : '收支种类',
				width : 20,
				align : 'center'
			},{
				field : 'jfSumMoney',
				title : '收支金额',
				width : 10,
				align : 'center'
			} , {
				field : 'jfClosedWay',
				title : '账户类型',
				width : 10,
				align : 'center'
			}, {
				field : 'do',
				title : '添加',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' style='color:blue' onclick=\"addOneToNeedTo("+ index +")\" >添加</a>";
				}
			} ] ],
			width : '100%',
			height : '152px',
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
	if ($('#doNeedToAddNumberTable').hasClass('datagrid-f')) {

	} else {
		$('#doNeedToAddNumberTable').datagrid({
			columns : [ [ {
				field : 'totalPage',
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
			}, {
				field : 'faUserName',
				title : '取消',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {

					return "<a href='#' style='color:red' onclick=\"myDeleteRows('"+row.jfId+"','jfId','doNeedToAddNumberTable','needToAddNums')\">删除</a>";
				}
			} ] ],
			width : '100%',
			height : '180px',
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
	$("#doNeedToAddNumberTable").datagrid("loadData", []);
	$("#needToAddNums").html("0");
	$('#financialjfNatureOfThe').val('收入');
	$("#needToAddType").html('收入');
	documentQuery(1,0)
	$("#addCertificateNumberDlg").dialog('open');
}
//添加一条到需要生成的凭证号表格里
function addOneToNeedTo(index){
	var row = $("#needToAddNumberTable").datagrid('getData').rows[index];
	var rows = $("#doNeedToAddNumberTable").datagrid('getRows');
	var checkFlag = 0;
	if(rows.length!=0){
		if(rows.length==8){
			myTips("一次最多为8条收支生成凭证！","error");
			return;
		}
		for(var i in rows){
			if(rows[i].jfId==row.jfId){
				checkFlag++;
			}
		}
	}
	if(checkFlag!=0){
		myTips("此条收支已经添加到下方列表！","error");
		return;
	}else{
		$('#doNeedToAddNumberTable').datagrid('insertRow', {
			index : 0,
			row : row
		});
		$("#needToAddNums").html(rows.length);
	}
}
//未生成凭证号的收支查询--切换收支类型时
function documentQueryChangeType(){
	var financialjfNatureOfThe = $('#financialjfNatureOfThe').val();
	$("#needToAddNums").html(0);
	$("#needToAddType").html(financialjfNatureOfThe);
	$("#doNeedToAddNumberTable").datagrid("loadData", []);
	documentQuery(1,0);
}
//未生成凭证号的收支查询
function documentQuery(page,type){
	var pageNum = 5;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var financialTurn = $('#financialTurn').val();
	//var jhfUserId = $('#followUserStaff').val();
	if (financialTurn!='') {
		var starDay = '';
		var endDay = '';
		var now = new Date(); 
		var nowTime = now.getTime() ; 
		var day = now.getDay();
		var nowDay = now.getDate();
		var nowMonth = now.getMonth()+1;
		var nowYear  = now.getYear();
		nowYear += (nowYear < 2000) ? 1900 : 0;
		if(financialTurn=='本周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day-1)*oneDayLong  ; 
			var SundayTime =  nowTime + (7-day)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(financialTurn=='上周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day+6)*oneDayLong  ; 
			var SundayTime =  nowTime + (day-2)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(financialTurn=='本月'){
			now.setDate(1);
			starDay = now ;
			var endDay = new Date(now);
			endDay.setMonth(now.getMonth()+1);
			endDay.setDate(0);
		}else if(financialTurn=='上月'){
			starDay = new Date(now);	
			starDay.setMonth(now.getMonth()-1);
			starDay.setDate(1);
			endDay = new Date(now);
			endDay.setMonth(now.getMonth());
			endDay.setDate(0);
		}else if(financialTurn=='本季度'||financialTurn=='上季度'){
			var quarterStartMonth = 0; 
			var quarterEndMonth = 2; 
			if(nowMonth<4){ 
				quarterStartMonth = 0; 
				quarterEndMonth = 3; 
			} 
			if(3<nowMonth && nowMonth<7){ 
				quarterStartMonth = 3; 
				quarterEndMonth = 6; 
			} 
			if(6<nowMonth && nowMonth<10){ 
				quarterStartMonth = 6;
				quarterEndMonth = 9; 
			} 
			if(nowMonth>9){ 
				quarterStartMonth = 9;
				quarterEndMonth = 12; 
			} 
			if(financialTurn=='本季度'){
				starDay = new Date(nowYear, quarterStartMonth, 1); 
				endDay = new Date(nowYear, quarterEndMonth, 1); 
			}else{
				starDay = new Date(nowYear, quarterStartMonth-3, 1); 
				endDay = new Date(nowYear, quarterEndMonth-3, 1); 
			}
			endDay.setDate(0);
		}else  if(financialTurn=='本年'){
			starDay = new Date(nowYear, 0, 1);
			endDay = new Date(nowYear, 12,0);
		}else  if(financialTurn=='去年'){
			starDay = new Date(nowYear-1, 0, 1);
			endDay = new Date(nowYear-1, 12,0);
		}
		$('#searchStartTime').val(formatDate(starDay));
		$('#searchEndTime').val(formatDate(endDay));
	}
	var startTime = $('#searchStartTime').val();
	var endTime = $('#searchEndTime').val();
	if(startTime==''){
		startTime ='1980-01-01';
	}
	if(endTime==''){
		endTime =formatTime(getNowFormatDate(), 2);
	}
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime =  formatDate(endTime);
	
	var addCommunity = $('#searchCCommunity').val();
	var addBuilding = $('#searchBuilding').val();
	var addDoorplateno = $('#searchDoorplateno').val();
	var jfNatureOfThe  = $('#financialjfNatureOfThe').val();
	var jfCertificateNumber  = $('#financialNumber').val();
	// 凭证组取数据
	$.post("../documentQuery.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		startTime 			: startTime ,
		endTime				: endTime,
		addCommunity		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		jfNatureOfThe		: jfNatureOfThe,
		jfCertificateNumber	: jfCertificateNumber,
		splitFlag			: 1,
	}, function(data) {
		if (data.code<0) {
			$('#needToAddNumberTable').datagrid({
				data : [],
				view : myview,
				emptyMsg :data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"documentQuery","needToAddNumber");
			}else{
				notCountPage(page, 0 ,"documentQuery","needToAddNumber");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "documentQuery","needToAddNumber");
			}else{
				notCountPage(page, 1 , "documentQuery","needToAddNumber");
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				
				if(data[i].addCity.indexOf("项目")>-1){
					data[i].totalPage = data[i].jfBelongingToTheName;
				}else{
					data[i].totalPage = data[i].addCommunity+data[i].addBuilding+data[i].addDoorplateno;
				}
			}
			$("#needToAddNumberTable").datagrid("loadData", data);
		}
	}, "json");
	
}
//分页统计数据
function getneedToAddNumberPageCount(page, type) {
	var pageNum = 5;
	
	var financialTurn = $('#financialTurn').val();
	//var jhfUserId = $('#followUserStaff').val();
	if (financialTurn!='') {
		var starDay = '';
		var endDay = '';
		var now = new Date(); 
		var nowTime = now.getTime() ; 
		var day = now.getDay();
		var nowDay = now.getDate();
		var nowMonth = now.getMonth()+1;
		var nowYear  = now.getYear();
		nowYear += (nowYear < 2000) ? 1900 : 0;
		if(financialTurn=='本周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day-1)*oneDayLong  ; 
			var SundayTime =  nowTime + (7-day)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(financialTurn=='上周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day+6)*oneDayLong  ; 
			var SundayTime =  nowTime + (day-2)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(financialTurn=='本月'){
			now.setDate(1);
			starDay = now ;
			var endDay = new Date(now);
			endDay.setMonth(now.getMonth()+1);
			endDay.setDate(0);
		}else if(financialTurn=='上月'){
			starDay = new Date(now);	
			starDay.setMonth(now.getMonth()-1);
			starDay.setDate(1);
			endDay = new Date(now);
			endDay.setMonth(now.getMonth());
			endDay.setDate(0);
		}else if(financialTurn=='本季度'||financialTurn=='上季度'){
			var quarterStartMonth = 0; 
			var quarterEndMonth = 2; 
			if(nowMonth<4){ 
				quarterStartMonth = 0; 
				quarterEndMonth = 3; 
			} 
			if(3<nowMonth && nowMonth<7){ 
				quarterStartMonth = 3; 
				quarterEndMonth = 6; 
			} 
			if(6<nowMonth && nowMonth<10){ 
				quarterStartMonth = 6;
				quarterEndMonth = 9; 
			} 
			if(nowMonth>9){ 
				quarterStartMonth = 9;
				quarterEndMonth = 12; 
			} 
			if(financialTurn=='本季度'){
				starDay = new Date(nowYear, quarterStartMonth, 1); 
				endDay = new Date(nowYear, quarterEndMonth, 1); 
			}else{
				starDay = new Date(nowYear, quarterStartMonth-3, 1); 
				endDay = new Date(nowYear, quarterEndMonth-3, 1); 
			}
			endDay.setDate(0);
		}else  if(financialTurn=='本年'){
			starDay = new Date(nowYear, 0, 1);
			endDay = new Date(nowYear, 12,0);
		}else  if(financialTurn=='去年'){
			starDay = new Date(nowYear-1, 0, 1);
			endDay = new Date(nowYear-1, 12,0);
		}
		$('#searchStartTime').val(formatDate(starDay));
		$('#searchEndTime').val(formatDate(endDay));
	}
	var startTime = $('#searchStartTime').val();
	var endTime = $('#searchEndTime').val();
	if(startTime==''){
		startTime ='1980-01-01';
	}
	if(endTime==''){
		endTime =formatTime(getNowFormatDate(), 2);
	}
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime =  formatDate(endTime);
	
	var addCommunity = $('#searchCCommunity').val();
	var addBuilding = $('#searchBuilding').val();
	var addDoorplateno = $('#searchDoorplateno').val();
	var jfNatureOfThe  = $('#financialjfNatureOfThe').val();
	var jfCertificateNumber  = $('#financialNumber').val();
	// 凭证组取数据
	$.post("../documentQuery.action", {
		startTime 			: startTime ,
		endTime				: endTime,
		addCommunity		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		jfNatureOfThe		: jfNatureOfThe,
		jfCertificateNumber	: jfCertificateNumber,
		splitFlag			: 0,
	}, function(data) {
		if (data.code<0 ||data.body[0].totalNum==0) {
			var countJson = {
					totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"needToAddNumber",0);
		} else {
			data=data.body;
			var countJson = {
					totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"needToAddNumber",0);
		}
	}, "json");
	
}
//凭证号管理对话框
function certificateNumberDlg(){
	$("#certificateNumberDlg").dialog({
		title : '凭证管理',
		top : getTop(440),
		left : getLeft(900),
		width : 900,
		height : 440,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	if ($('#certificateNumberTable').hasClass('datagrid-f')) {

	} else {
		$('#certificateNumberTable').datagrid({
			columns : [ [ {
				field : 'jfCertificateNumber',
				title : '凭证号',
				width : '10%',
				align : 'center'
			}, {
				field : 'totalPage',
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
			}, {
				field : 'faUserName',
				title : '查看凭证组',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {

					return "<a href='#' style='color:red' onclick=\"numberFinancialDlg("+row.jfCertificateNumber+")\">查看凭证组</a>";
				}
			}] ],
			width : '100%',
			height : '277px',
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
	$("#searchStartTime").val('');
	$("#searchEndTime").val(formatTime(getNowFormatDate(), 2));
	queryCertificateNumber(1,0);
	$("#certificateNumberDlg").dialog('open');
}
//查询所有已生成凭证的收支
function queryCertificateNumber(page,type){
	var pageNum = 10;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var financialTurn = $('#financialTurn1').val();
	//var jhfUserId = $('#followUserStaff').val();
	if (financialTurn!='') {
		var starDay = '';
		var endDay = '';
		var now = new Date(); 
		var nowTime = now.getTime() ; 
		var day = now.getDay();
		var nowDay = now.getDate();
		var nowMonth = now.getMonth()+1;
		var nowYear  = now.getYear();
		nowYear += (nowYear < 2000) ? 1900 : 0;
		if(financialTurn=='本周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day-1)*oneDayLong  ; 
			var SundayTime =  nowTime + (7-day)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(financialTurn=='上周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day+6)*oneDayLong  ; 
			var SundayTime =  nowTime + (day-2)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(financialTurn=='本月'){
			now.setDate(1);
			starDay = now ;
			var endDay = new Date(now);
			endDay.setMonth(now.getMonth()+1);
			endDay.setDate(0);
		}else if(financialTurn=='上月'){
			starDay = new Date(now);	
			starDay.setMonth(now.getMonth()-1);
			starDay.setDate(1);
			endDay = new Date(now);
			endDay.setMonth(now.getMonth());
			endDay.setDate(0);
		}else if(financialTurn=='本季度'||financialTurn=='上季度'){
			var quarterStartMonth = 0; 
			var quarterEndMonth = 2; 
			if(nowMonth<4){ 
				quarterStartMonth = 0; 
				quarterEndMonth = 3; 
			} 
			if(3<nowMonth && nowMonth<7){ 
				quarterStartMonth = 3; 
				quarterEndMonth = 6; 
			} 
			if(6<nowMonth && nowMonth<10){ 
				quarterStartMonth = 6;
				quarterEndMonth = 9; 
			} 
			if(nowMonth>9){ 
				quarterStartMonth = 9;
				quarterEndMonth = 12; 
			} 
			if(financialTurn=='本季度'){
				starDay = new Date(nowYear, quarterStartMonth, 1); 
				endDay = new Date(nowYear, quarterEndMonth, 1); 
			}else{
				starDay = new Date(nowYear, quarterStartMonth-3, 1); 
				endDay = new Date(nowYear, quarterEndMonth-3, 1); 
			}
			endDay.setDate(0);
		}else  if(financialTurn=='本年'){
			starDay = new Date(nowYear, 0, 1);
			endDay = new Date(nowYear, 12,0);
		}else  if(financialTurn=='去年'){
			starDay = new Date(nowYear-1, 0, 1);
			endDay = new Date(nowYear-1, 12,0);
		}
		$('#searchStartTime1').val(formatDate(starDay));
		$('#searchEndTime1').val(formatDate(endDay));
	}
	var startTime = $('#searchStartTime1').val();
	var endTime = $('#searchEndTime1').val();
	if(startTime==''){
		startTime ='1980-01-01';
	}
	if(endTime==''){
		endTime =formatTime(getNowFormatDate(), 2);
	}
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime =  formatDate(endTime);
	
	var addCommunity = $('#searchCCommunity1').val();
	var addBuilding = $('#searchBuilding1').val();
	var addDoorplateno = $('#searchDoorplateno1').val();
	var jfNatureOfThe  = $('#financialjfNatureOfThe1').val();
	var jfCertificateNumber  = $('#financialNumber').val();
	
	// 凭证取数据
	$.post("../certificateDetails.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		startTime 			:startTime ,
		endTime				:endTime,
		addCommunity		:addCommunity,
		addBuilding			:addBuilding,
		addDoorplateno		:addDoorplateno,
		jfNatureOfThe		:jfNatureOfThe,
		jfCertificateNumber	:jfCertificateNumber,
		splitFlag			: 1,
	}, function(data) {
		if (data.code<0) {
			$('#certificateNumberTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryCertificateNumber","certificateNumber");
			}else{
				notCountPage(page, 0 ,"queryCertificateNumber","certificateNumber");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryCertificateNumber","certificateNumber");
			}else{
				notCountPage(page, 1 , "queryCertificateNumber","certificateNumber");
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				
				if(data[i].addCity.indexOf("项目")>-1){
					data[i].totalPage = data[i].jfBelongingToTheName;
				}else{
					data[i].totalPage = data[i].addCommunity+data[i].addBuilding+data[i].addDoorplateno;
				}
			}
			$("#certificateNumberTable").datagrid("loadData", data);
		}
	}, "json");
}
//查询所有已生成凭证的收支-分页统计数据
function getcertificateNumberPageCount(page, type) {
	var pageNum = 10;
	
	var financialTurn = $('#financialTurn1').val();
	//var jhfUserId = $('#followUserStaff').val();
	if (financialTurn!='') {
		var starDay = '';
		var endDay = '';
		var now = new Date(); 
		var nowTime = now.getTime() ; 
		var day = now.getDay();
		var nowDay = now.getDate();
		var nowMonth = now.getMonth()+1;
		var nowYear  = now.getYear();
		nowYear += (nowYear < 2000) ? 1900 : 0;
		if(financialTurn=='本周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day-1)*oneDayLong  ; 
			var SundayTime =  nowTime + (7-day)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(financialTurn=='上周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day+6)*oneDayLong  ; 
			var SundayTime =  nowTime + (day-2)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(financialTurn=='本月'){
			now.setDate(1);
			starDay = now ;
			var endDay = new Date(now);
			endDay.setMonth(now.getMonth()+1);
			endDay.setDate(0);
		}else if(financialTurn=='上月'){
			starDay = new Date(now);	
			starDay.setMonth(now.getMonth()-1);
			starDay.setDate(1);
			endDay = new Date(now);
			endDay.setMonth(now.getMonth());
			endDay.setDate(0);
		}else if(financialTurn=='本季度'||financialTurn=='上季度'){
			var quarterStartMonth = 0; 
			var quarterEndMonth = 2; 
			if(nowMonth<4){ 
				quarterStartMonth = 0; 
				quarterEndMonth = 3; 
			} 
			if(3<nowMonth && nowMonth<7){ 
				quarterStartMonth = 3; 
				quarterEndMonth = 6; 
			} 
			if(6<nowMonth && nowMonth<10){ 
				quarterStartMonth = 6;
				quarterEndMonth = 9; 
			} 
			if(nowMonth>9){ 
				quarterStartMonth = 9;
				quarterEndMonth = 12; 
			} 
			if(financialTurn=='本季度'){
				starDay = new Date(nowYear, quarterStartMonth, 1); 
				endDay = new Date(nowYear, quarterEndMonth, 1); 
			}else{
				starDay = new Date(nowYear, quarterStartMonth-3, 1); 
				endDay = new Date(nowYear, quarterEndMonth-3, 1); 
			}
			endDay.setDate(0);
		}else  if(financialTurn=='本年'){
			starDay = new Date(nowYear, 0, 1);
			endDay = new Date(nowYear, 12,0);
		}else  if(financialTurn=='去年'){
			starDay = new Date(nowYear-1, 0, 1);
			endDay = new Date(nowYear-1, 12,0);
		}
		$('#searchStartTime1').val(formatDate(starDay));
		$('#searchEndTime1').val(formatDate(endDay));
	}
	var startTime = $('#searchStartTime1').val();
	var endTime = $('#searchEndTime1').val();
	if(startTime==''){
		startTime ='1980-01-01';
	}
	if(endTime==''){
		endTime =formatTime(getNowFormatDate(), 2);
	}
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime =  formatDate(endTime);
	
	var addCommunity = $('#searchCCommunity1').val();
	var addBuilding = $('#searchBuilding1').val();
	var addDoorplateno = $('#searchDoorplateno1').val();
	var jfNatureOfThe  = $('#financialjfNatureOfThe1').val();
	var jfCertificateNumber  = $('#financialNumber').val();
	
	// 凭证取数据
	$.post("../certificateDetails.action", {
		startTime 			:startTime ,
		endTime				:endTime,
		addCommunity		:addCommunity,
		addBuilding			:addBuilding,
		addDoorplateno		:addDoorplateno,
		jfNatureOfThe		:jfNatureOfThe,
		jfCertificateNumber	:jfCertificateNumber,
		splitFlag			: 0,
	}, function(data) {
		if (data.code<0 ||data.body[0].totalNum==0) {
			var countJson = {
					totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"certificateNumber",0);
		} else {
			data=data.body;
			var countJson = {
					totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"certificateNumber",0);
		}
	}, "json");
}
//查询凭证组对话框
function numberFinancialDlg(numbers){
	$("#numberFinancialDlg").dialog({
		title : '查看凭证组收支',
		top : getTop(320),
		left : getLeft(900),
		width : 900,
		height : 320,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	queryNumberFinancia(numbers,0);
	$("#numberFinancialDlg").dialog('open');
}
//查询凭证组相关收支
function queryNumberFinancia(jfCertificateNumber,type){
	$("#numberFinancialTable").datagrid("loadData", []);
	var jfNatureOfThe  = $('#financialjfNatureOfThe').val();
	// 凭证组相关收支取数据
	$.post("../selectToDoPringt.action", {
		jfCertificateNumber:jfCertificateNumber
	}, function(data) {
		data=data.body;
		for(var i in data){
			for(var j in data[i]){
				if(data[i][j]==null){
					data[i][j]='';
				}
			}
		}
		$("#numberFinancialTable").datagrid("loadData", data);
		if(type==1){
			setTimeout(printFinancialData(jfNatureOfThe),2000);
		}
	}, "json");
}
//生成凭证号并打印
function doSetNumberAndPrint(type){
	if(type==0||type==2){
		var rows = $("#doNeedToAddNumberTable").datagrid('getRows');
		var row = $("#doNeedToAddNumberTable").datagrid('getData').rows[0];
		if(!row){
			myTips("请添加至少一条收支进行凭证生成！","error");
			return;
		}
		var jsonArray = '';
		for(var i in rows ){
			if(i==0){
				jsonArray += rows[i].jfId; 
			}else{
				jsonArray += ","+rows[i].jfId; 
			}
			
		}
		showLoading();
		$.post("../documentNumber.action", {
			jsonArray:jsonArray
		},function(data){
			if(data.code<0){
				myTips(data.msg,"error");
				hideLoading();
				return;
			}
			documentQueryChangeType();
			if(type==0){
				myTips("生成凭证号成功！","success");
				hideLoading();
			}else if(type==2){
				queryNumberFinancia(data.body,1);
			}
		});
	}else if(type==1){
		var jfNatureOfThe  = $('#financialjfNatureOfThe1').val();
		printFinancialData(jfNatureOfThe);
	}
}
function printFinancialData(type){
	var rows = $("#numberFinancialTable").datagrid('getRows');
	var row = $("#numberFinancialTable").datagrid('getData').rows[0];
	
	if(row.jfCertificateNumber==''||row.jfCertificateNumber==null){
		myTips("此组收支记录还未生成过凭证号，无法打印！","error");
		hideLoading();
		return;
	}
	var publicArrays = '';
	
	
	var year = formatTime(getNowFormatDate(), 2).split("-")[0];
	var month = formatTime(getNowFormatDate(), 2).split("-")[1];
	var day = formatTime(getNowFormatDate(), 2).split("-")[2];
	publicArrays += '{year:"'+year+'",month:"'+month+'",date:"'+day+'",';
	var nullArrsys = '{piaojuhao:"",zhaiyao:"",guanliankemu:"",guishukemu:"",zongzhangkemu:"",jine:0}';
	
	var printArray ='';
	var flag = 0;
	var sumFlag = 0.00;
	for(var i in rows){
		if(i==0){
			printArray += publicArrays;
			printArray += 'year_month:"'+rows[i].jfCertificateNumber.substr(0,4)
			+'",date_uid:"'+rows[i].jfCertificateNumber.substr(4,8)
			+'",type:"'+type
			+'",journal_arr:[';
		}
		if(rows[i].addCity.indexOf("项目")>-1){
			rows[i].jfBelongingToTheName;
			printArray += '{piaojuhao:"'+rows[i].jfTicketNumber+'",'
			  +'zhaiyao:"'+rows[i].jfFinanNote+'",'
			  +'guanliankemu:"'+rows[i].jfBelongingToTheName+'",'
			  +'guishukemu:"'+rows[i].jfTheOwnershipType+'",'
			  +'zongzhangkemu:"'+rows[i].jfAccountingSpecies+'",'
			  +'zhanghu:"'+rows[i].faUserName+'",';
		}else{
			printArray += '{piaojuhao:"'+rows[i].jfTicketNumber+'",'
			  +'zhaiyao:"'+rows[i].jfFinanNote+'",'
			  +'guanliankemu:"'+rows[i].addCommunity+rows[i].addBuilding+rows[i].addDoorplateno+'",'
			  +'guishukemu:"'+rows[i].jfBelongingToTheName+'('+rows[i].jfTheOwnershipType+')'+'",'
			  +'zongzhangkemu:"'+rows[i].jfAccountingSpecies+'",'
			  +'zhanghu:"'+rows[i].faUserName+'",';
		}
		printArray += 'jine:'+rows[i].jfSumMoney+'},';
		sumFlag = accAdd(sumFlag,rows[i].jfSumMoney);
		if(i==(rows.length-1)){

			if(rows.length==8){
				
			}else{
				var subFlag= 8-rows.length;
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
	var jsUrl = window.location.host;
	hideLoading();
	parent.doPrintInExe(printArray,0);
}
//生成租客每期收支
function setRenterEveryFinancial(){
	$("#setRenterEveryFinancialDlg").dialog({
		title : '生成租客每期收支',
		top : getTop(560),
		left : getLeft(650),
		width : 650,
		height : 560,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#setRenterEveryFinancialDlg input').val('');
			$('#setRenterEveryFinancialDlg select').val('');
			$('#setRenterEveryFinancialAccountName').empty();
			var data = [];
			$("#setRenterEveryFinancialTable").datagrid("loadData", data);
			clearChoseConstract();
		}
	});
	$("#setRenterEveryFinancialDlg").dialog("open");
	$('#setRenterEveryFinancialDoTime').val(formatTime(getNowFormatDate(), 2));
	$('#setRenterEveryFinancialMoneyTotal').val('0.00');
	$('#setRenterEveryFinancialMoneyGet').val('0.00');
	$('#setRenterEveryFinancialMoneySum').val('0.00');
	$('#setRenterEveryFinancialIfMsg').prop("checked", false);
	for(var j in _userInfoData){
		if(_loginUserId == _userInfoData[j].userId){
			$("#setRenterEveryFinancialHandlerGetUserId").val(_userInfoData[j].userId);
			$("#setRenterEveryFinancialHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}

	if ($('#setRenterEveryFinancialTable').hasClass('datagrid-f')) {
		
	} else {
		$('#setRenterEveryFinancialTable').datagrid({
			columns : [ [
				{
					field : 'jfNatureOfThe',
					title : '收支性质',
					width : 20,
					align : 'center'
				},
				{
					field : 'jfAccountingSpecies',
					title : '收支种类',
					width : 20,
					align : 'center'
				},
				{
					field : 'jfSumMoney',
					title : '收支金额',
					width : 20,
					align : 'center',
				},
				{
					field : 'jfFinanNote',
					title : '收支原因',
					width : 30,
					align : 'center',
					editor : 'textbox'
				},
				{
					field : 'note',
					title : '备注',
					width : 20,
					align : 'center',
					editor : 'textbox'
				}] ],
			width : '100%',
			height : '100%',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onClickCell : onClickCell2,
			enableCellEdit : true,// 表示是否开启单元格编辑功能
			rowStyler : function(index, row) {
				return 'color:#000;';
			},
		});
	}
}
//每期收支能源金额变化
function changeSendPrice(obj){
	var row = $('#renterInstallmentDg').datagrid('getSelected');
	var regStrs =  [
	                ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
	                ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
	                ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
	                ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
	            ];
	for (i = 0; i < regStrs.length; i++) {
		var reg = new RegExp(regStrs[i][0]);
		obj.value = obj.value.replace(reg, regStrs[i][1]);
	}
	$('#ifCheckMoney').val('已变更');
	var oneInput = $("#srefPowerDiv input");
	var money = 0;
	for(var i in oneInput){
		if($("#"+oneInput[i].id).val()==''){
			money+=0;
		}else{
			money=accAdd(money,$("#"+oneInput[i].id).val());
		}	
	}
	//修改违约金以外的金额时重新计算违约金
	if(row&&row.jciState=="待收"){
		var today = new Date(formatTime(getNowFormatDate(), 2));
	    var fukuanri = new Date(row.jciFukuanri);
	    if(today<=fukuanri){
		    $('#srefDamages').val(0);
	    }else{
	    	money = accAdd(row.jciMoney,money)
		    var notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
		    $('#srefDamages').val(accAdd(0,money*notDays*_lateFeeRate*0.01));
	    }
	}
	
}
console.log("账单列表");
function energy(){
	//控制非选中能源项隐藏
	var chargingPlan=parent._chargingPlan;
	for(var i in chargingPlan){
		if(!chargingPlan[i]["state"]){
			$("."+i).hide();
		}
	}
}



//打开选择账单列表
function choseConstractInstallment(){
	energy();
	var hrId = $("#setRenterEveryFinancialHouseRentId").val();
	var hrHouse4storeId = $("#setRenterEveryFinancialHouseStoreId").val();
	
	var jciRenterId = $("#setRenterEveryFinancialRenterId").val();
	if(hrId==''||hrHouse4storeId ==''||jciRenterId==''){
		myTips("请先选择一个已租房！","error");
		return;
	}
	$("#choseConstractInstallmentDlg").dialog({
		title : '选择账单',
		top : getTop(500),
		left : getLeft(1030),
		width : 1030,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	if($("#srefServerMoney").val()==''){//首次打开，租赁服务费无值，第二次打开，里面一定有值
		$('#srefShouldDay').val('无应付租金');
		$('#srefNotDays').val(0);
		$('#srefDamages').val(0);
		$('#srefRentMoney').val(0);
		
		$("#everyHisSave").show();
		$("#srefHisSave").val(0.00);
		$("#everyHisOwe").hide();
		$("#srefHisOwe").val(0.00);
		
		$("#everyNewSave").show();
		$("#srefNewSave").val(0.00);
		$("#everyNewOwe").hide();
		$("#srefNewOwe").val(0.00);
		
		$.post("../selectMeterReadingScheme.action", {
			hrId : hrId,
			hrHouse4storeId : hrHouse4storeId,
		},function(data){
			data=data.body;
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

				var hotwaterLast = 0;//上次热水读数
				var hotwaterThis = 0;//本次热水读数
				if(meterReadingRecord.hotwater != undefined){
					hotwaterLast = meterReadingRecord.hotwater.lastReading;//上次热水读数
					hotwaterThis = hotwaterLast;//本次热水读数
					if(meterReadingRecord.hotwater.thisReading.length!=0){
						hotwaterThis = meterReadingRecord.hotwater.thisReading[meterReadingRecord.hotwater.thisReading.length-1];
					}
				}

				var hotairLast = meterReadingRecord.hotair.lastReading;//上次热水读数
				var hotairThis = hotairLast;//本次热水读数
				if(meterReadingRecord.hotair != undefined){
					hotairLast = meterReadingRecord.hotair.lastReading;//上次热水读数
					hotairThis = hotairLast;//本次热水读数
					if(meterReadingRecord.hotair.thisReading.length!=0) {
						hotairThis = meterReadingRecord.hotair.thisReading[meterReadingRecord.hotair.thisReading.length - 1];
					}
				}

				var waterNum = accSub(waterThis,waterLast);//水差额
				var electritNum = accSub(electritThis,electritLast);//电差额
				var gasNum = accSub(gasThis,gasLast);//气差额
				var hotwaterNum = accSub(hotwaterThis,hotwaterLast);//热水差额
				var hotairNum = accSub(hotairThis,hotairLast);//暖气差额
				
				var waterMoney = powerCalculate(data[0].waterPlan!=''?data[0].waterPlan.getRealJsonStr():'',waterNum);//水费
				var electritMoney = powerCalculate(data[0].electritPlan!=''?data[0].electritPlan.getRealJsonStr():'',electritNum);//电费
				var gasMoney = powerCalculate(data[0].gasPlan!=''?data[0].gasPlan.getRealJsonStr():'',gasNum);//气费
				var hotwaterMoney = powerCalculate(data[0].hotWaterPlan!=''?data[0].hotWaterPlan.getRealJsonStr():'',hotwaterNum);//热水费
				var hotairMoney = powerCalculate(data[0].hotAirPlan!=''?data[0].hotAirPlan.getRealJsonStr():'',hotairNum);//暖气费

				$("#srefWaterThis").val(waterThis);
				$("#srefWaterLast").val(waterLast);
				$("#srefWaterNum").val(waterNum);
				$("#srefWaterPlan").val(data[0].water);
				$("#srefWaterMoney").val(waterMoney);
				$("#srefWaterMoney").attr("mhistorys",waterLast+","+waterThis)
				
				$("#srefElectritThis").val(electritThis);
				$("#srefElectritLast").val(electritLast);
				$("#srefElectritNum").val(electritNum);
				$("#srefElectritPlan").val(data[0].electrit);
				$("#srefElectritMoney").val(electritMoney);
				$("#srefElectritMoney").attr("mhistorys",electritLast+","+electritThis)
				
				$("#srefGasThis").val(gasThis);
				$("#srefGasLast").val(gasLast);
				$("#srefGasNum").val(gasNum);
				$("#srefGasPlan").val(data[0].gas);
				$("#srefGasMoney").val(gasMoney);
				$("#srefGasMoney").attr("mhistorys",gasLast+","+gasThis)
				
				$("#srefHotAirThis").val(hotairThis);
				$("#srefHotAirLast").val(hotairLast);
				$("#srefHotAirNum").val(hotairNum);
				$("#srefHotAirPlan").val(data[0].hotAir);
				$("#srefHotAirMoney").val(hotairMoney);
				$("#srefHotAirMoney").attr("mhistorys",hotairLast+","+hotairThis)

				$("#srefHotWaterThis").val(hotwaterThis);
				$("#srefHotWaterLast").val(hotwaterLast);
				$("#srefHotWaterNum").val(hotwaterNum);
				$("#srefHotWaterPlan").val(data[0].hotWater);
				$("#srefHotWaterMoney").val(hotwaterMoney);
				$("#srefHotWaterMoney").attr("mhistorys",hotwaterLast+","+hotwaterThis)

				$("#srefManageMoney").val(0);
				$("#srefServerMoney").val(0);
				$("#srefTvMoney").val(data[0].hrTvCharge);
				$("#srefWifiMoney").val(data[0].hrWifiCharge);
				$("#srefOtherMoney").val(data[0].hrOtherPay);
				if(data[0].hrBase>0){
					$("#everyHisOwe").show();
					$("#srefHisOwe").val(accSub(data[0].hrBase,0));
					
					$("#everyHisSave").hide();
					$("#srefHisSave").val(0.00);
				}else{
					$("#everyHisSave").show();
					$("#srefHisSave").val(accSub(0,data[0].hrBase));
					
					$("#everyHisOwe").hide();
					$("#srefHisOwe").val(0.00);
				}
				$("#srefPastOwe").val(accSub(data[0].hrBase,0));
				
				$("#srefWaterMoneySys").val(waterMoney);
				$("#srefElectritMoneySys").val(electritMoney);
				$("#srefGasMoneySys").val(gasMoney);
				$("#srefHotWaterMoneySys").val(hotwaterMoney);
				$("#srefHotAirMoneySys").val(hotairMoney);
				
				$("#srefTvMoneySys").val(data[0].hrTvCharge);
				$("#srefWifiMoneySys").val(data[0].hrWifiCharge);
				$("#srefManageMoneySys").val(0);
				$("#srefServerMoneySys").val(0);
				$("#srefOtherSys").val(data[0].hrOtherPay);
				
			}else{
				$("#srefWaterThis").val(0);
				$("#srefWaterLast").val(0);
				$("#srefWaterNum").val(0);
				$("#srefWaterPlan").val(data[0].water);
				$("#srefWaterMoney").val(0);
				$("#srefWaterMoney").attr("mhistorys",0+","+0)
				
				$("#srefElectritThis").val(0);
				$("#srefElectritLast").val(0);
				$("#srefElectritNum").val(0);
				$("#srefElectritPlan").val(data[0].electrit);
				$("#srefElectritMoney").val(0);
				$("#srefElectritMoney").attr("mhistorys",0+","+0)
				
				$("#srefGasThis").val(0);
				$("#srefGasLast").val(0);
				$("#srefGasNum").val(0);
				$("#srefGasPlan").val(data[0].gas);
				$("#srefGasMoney").val(0);
				$("#srefGasMoney").attr("mhistorys",0+","+0)
				
				/*tzl*/
				$("#srefHotWaterThis").val(0);
				$("#srefHotWaterLast").val(0);
				$("#srefHotWaterNum").val(0);
				$("#srefHotWaterPlan").val(data[0].hotWater);
				$("#srefHotWaterMoney").val(0);
				$("#srefHotWaterMoney").attr("mhistorys",0+","+0)
				
				$("#srefHotAirThis").val(0);
				$("#srefHotAirLast").val(0);
				$("#srefHotAirNum").val(0);
				$("#srefHotAirPlan").val(data[0].hotAir);
				$("#srefHotAirMoney").val(0);
				$("#srefHotAirMoney").attr("mhistorys",0+","+0)
				
				$("#srefTvMoney").val(data[0].hrTvCharge);
				
				$("#srefWifiMoney").val(data[0].hrWifiCharge);
				if(data[0].hrBase>0){
					$("#everyHisOwe").show();
					$("#srefHisOwe").val(accSub(data[0].hrBase,0));
					
					$("#everyHisSave").hide();
					$("#srefHisSave").val(0.00);
				}else{
					$("#everyHisSave").show();
					$("#srefHisSave").val(accSub(0,data[0].hrBase));
					
					$("#everyHisOwe").hide();
					$("#srefHisOwe").val(0.00);
				}
				$("#srefPastOwe").val(accSub(data[0].hrBase,0));
				//$("#srefServerMoney").val(data[0].hrServerCost);
				//$("#srefManageMoney").val(data[0].hrManageCost);
				$("#srefManageMoney").val(0);
				$("#srefServerMoney").val(0);
				
				$("#srefOtherMoney").val(0);
			}
		});
		IsCheckFlag = -1;
		queryRenterInstallment(1,0);
	}
	$("#choseConstractInstallmentDlg").dialog('open');
}
//查询租客账单
function queryRenterInstallment(page,type){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var jciState = $("#searchJciState").val();
	var jciHouse4rentId = $("#setRenterEveryFinancialHouseRentId").val();
	var jciRenterId = $("#setRenterEveryFinancialRenterId").val();
	$.post("../queryAllContractInstallment.action", {
		startNum : startNum,
		endNum : endNum,
		contractType : "renter",
		jciState : jciState,
		jciHouse4rentId:jciHouse4rentId,
		sort:2,
		jciRenterId:jciRenterId,
		temporaryAuspiciousBill :1,
	},function(data){
		if(data.code<0){
			sourcePages(0,0,5);
			var noData = [];
			$('#renterInstallmentDg').datagrid({
				data : noData,
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if(page == 1 && type == 0){
				sourcePages(data[0].totalNum,page,5);
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
//清空账单对话框所有相关信息
function clearChoseConstract(){
	$("#renterInstallmentDg").datagrid("loadData",[]);
	$("#choseConstractInstallmentDlg input").val('');
}
//根据选择的分期账单和月度账单生成收支
function addSetRenterEveryFinancial(){
	
	if($("#ifCheckMoney").val()==""){
		$('#setRenterEveryFinancialTips').html("请核算费用！");
		return;
	}
	$("#choseConstractInstallmentDlg input")
	if($("#ifCheckMoney").val()=="已变更"){
		$('#setRenterEveryFinancialTips').html("费用已经发生变化，请重新核算费用！");
		return;
	}
	var rowRenter = $('#renterInstallmentDg').datagrid('getSelected');
	
	$('#setRenterEveryFinancialTips').html("");
	var dataJson = [];
	$("#setRenterEveryFinancialTable").datagrid("loadData",dataJson);
	
	var shouldPay = $("#srefShouldPay").val();//应收金额
	var realPay = $("#srefRealPay").val();//实收金额
	
	var newOwe = $("#srefNewOwe").val();//最新欠结
	var newSave = $("#srefNewSave").val();//最新余额
	
	var thisOwe = $("#srefAllOwe").val();//本期欠结或余额
	
	var inputArry = $("#choseConstractInstallmentDlg input");
	
	var mytype="";
	for(var i=0;i<inputArry.length;i++){
		console.log(inputArry[i].id);
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
				}
				
				else if($("#"+inputArry[i].id).attr("mType")=="热水费"){
					waterElectricalIdentification = '热水';
					jfFinanNote+=" 立方,"+$("#"+inputArry[i].id).val()+"元。";
				
				}else if($("#"+inputArry[i].id).attr("mType")=="暖气费"){
					waterElectricalIdentification = '暖气';
					jfFinanNote+=" 度,"+$("#"+inputArry[i].id).val()+"元。";
				}
				
				
				else if($("#"+inputArry[i].id).attr("mType")=="租金"&&rowRenter!=null){
					jfFinanNote ="收租周期：从"+rowRenter.jciBeginPeriods +" 至 "+ rowRenter.jciEndPeriods 
					+" 房屋租金："+$("#"+inputArry[i].id).val()+"元。";
					note ="从 "+rowRenter.jciBeginPeriods +" 至 "+ rowRenter.jciEndPeriods;
				}else if($("#"+inputArry[i].id).attr("mType")=="违约金"&&rowRenter!=null){
					jfFinanNote +="违约天数"+$("#srefNotDays").val()+"天。";
				}else if($("#"+inputArry[i].id).attr("mType")=="物业管理费"&&rowRenter!=null){
					note ="从 "+rowRenter.jciBeginPeriods +" 至 "+ rowRenter.jciEndPeriods;
				}else if($("#"+inputArry[i].id).attr("mType")=="租赁管理服务费"&&rowRenter!=null){
					note ="从 "+rowRenter.jciBeginPeriods +" 至 "+ rowRenter.jciEndPeriods;
				}
				
				console.log($("#"+inputArry[i].id).attr("mType"));
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
	
	if(rowRenter){
		$("#setRenterEveryFinanciaBegin").val(rowRenter.jciBeginPeriods);
		$("#setRenterEveryFinanciaEnd").val(rowRenter.jciEndPeriods);
	}
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
	
	var rows = $("#setRenterEveryFinancialTable").datagrid("getRows");
	var renterBaseMoney = $("#srefPastOwe").val();
	var moneySum = $("#setRenterEveryFinancialMoneySum").val();
	
	var hisOwe = $('#srefHisOwe').val();//历史欠结
	var hisSave = $('#srefHisSave').val();//历史余额
	var newOwe = $('#srefNewOwe').val();//最新欠结
	var NewSave = $('srefNewSave').val();//最新余额
	if (hisOwe != 0 || hisSave != 0 || newOwe!=0 || NewSave != 0) {
		var jfAccountingSpecies = '';
		var jfFinanNote = '';
		var insertJson = [];
		
		var shouldGet =  $('#srefShouldPay').val();
		var realGet =  $('#srefRealPay').val();
		var getSum = accSub(realGet,shouldGet);
		if(hisOwe==0 && hisSave==0 && newOwe ==0 && NewSave != 0){
			insertJson.push({
				jfSumMoney 			: getSum,
				jfNatureOfThe 		: "收入",
				jfBigType			: "欠结类",
				jfAccountingSpecies : "租客预存款",
				jfFinanNote 		: '租客预存款'+getSum+"元。",
			});
		}
		if(hisOwe==0 && hisSave==0 && newOwe!=0){
			if(getSum>0){
				insertJson.push({
					jfSumMoney 			: getSum,
					jfNatureOfThe 		: "收入",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客预存款",
					jfFinanNote 		: '租客预存款'+getSum+"元。",
				});
			}
			if(getSum<0){
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
		if(hisOwe!=0 && hisSave==0){
			insertJson.push({
				jfSumMoney 			: hisOwe,
				jfNatureOfThe 		: "收入",
				jfBigType			: "欠结类",
				jfAccountingSpecies : "租客还欠结款",
				jfFinanNote 		: '租客还欠结款'+hisOwe+"元。",
			});
			if(getSum>0){
				insertJson.push({
					jfSumMoney 			: getSum,
					jfNatureOfThe 		: "收入",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客预存款",
					jfFinanNote 		: '租客预存款'+getSum+"元。",
				});
			}
			if(getSum<0){
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
		if(hisOwe==0 && hisSave!=0){
			insertJson.push({
				jfSumMoney 			:  hisSave,
				jfNatureOfThe 		: "支出",
				jfBigType			: "欠结类",
				jfAccountingSpecies : "还租客预存款",
				jfFinanNote 		: '还租客预存款'+ hisSave +"元。",
			});
			if(getSum>0){
				insertJson.push({
					jfSumMoney 			: getSum,
					jfNatureOfThe 		: "收入",
					jfBigType			: "欠结类",
					jfAccountingSpecies : "租客预存款",
					jfFinanNote 		: '租客预存款'+getSum+"元。",
				});
			}
			if(getSum<0){
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
		var rowLength = $('#setRenterEveryFinancialTable').datagrid('getRows').length;
		for(var i in insertJson){
			if(insertJson[i].jfSumMoney!=0){
				$('#setRenterEveryFinancialTable').datagrid('insertRow', {
					index : parseInt(rowLength),
					row : insertJson[i]
				});
			}
		}
	}
	$("#choseConstractInstallmentDlg").dialog('close');
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

//执行生成租客每期收支账单
function doSetRenterEveryFinancial(){
	showLoading();
	var rows = $("#setRenterEveryFinancialTable").datagrid("getRows");
	if ($('#setRenterEveryFinancialDiv input').length != 0) {
		$.messager.alert('操作提示', '数据表中有未完成编辑的数据，请完成编辑后再保存！');
		hideLoading();
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
	var jfPayType= $("#everyFinancialPayType").val();
	if (relationBelongName == '') {
		myTips('收支归属信息不完整！请完善后再进行保存！', "error");
		hideLoading();
		return;
	} else if (rows.length == 0) {
		myTips('没有可用于添加的数据', "error");
		hideLoading();
		return;
	}else if($("#setRenterEveryFinanciaBegin").val()==''||$("#setRenterEveryFinanciaEnd").val()==''){
		myTips('归属周期不可为空！', "error");
		hideLoading();
		return;
	}else if($("#setRenterEveryFinancialBankNums").val()==''){
		myTips('请选择收支账户！', "error");
		hideLoading();
		return;
	}else if(jfPayType ==''){
		myTips('请选择收支方式！', "error");
		hideLoading();
		return;
	}
	
	jfPayType = '"jfPayType":"' + jfPayType + '"';
	var belongId = '"jfRenterId":"' + addFinancialRenterId + '",'+'"jfLandlordId":"' + addFinancialLandlordId + '"';
	var belongConding  = '"jfHouse4rentId":"' + addFinancialHouseRentId + '",'+'"jfHouse4storeId":"' + addFinancialHouseStoreId + '",'+'"jfHouseId":"' + addFinancialHouseId + '"';
	
	var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
	var jfBillingDate = '"jfBillingDate":"' + $("#setRenterEveryFinancialDoTime").val() + '"';
	var jfHandlers = '"jfHandlers":"' + $("#setRenterEveryFinancialHandlerGetUserId").val() + '"';
	var jfTheOwnershipType = '"jfTheOwnershipType":"' + relationBelongType + '"';
	var jfBelongingToTheName = '"jfBelongingToTheName":"' + relationBelongName + '"';
	var jfClosedWay =  '"jfClosedWay":"' + $("#setRenterEveryFinancialWay").find("option:selected").text()+ '"';
	var jfFinancialCoding = '"jfFinancialCoding":"'
			+ formatTime(getNowFormatDate(), 3)
			+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
			+ Math.floor(Math.random() * 10) + '"';
	
	var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ','+_loginUserName+'添加收支记录<br>"';
	var jfAccountId = '"jfAccountId":"' + $("#setRenterEveryFinancialBankNums").val() + '"';
	var department = '"department":"' 	+ _loginDepartment + '"';
	var jfAccountingWhy = '"jfAccountingWhy":"' + $("#setRenterEveryFinancialBelongAddress").val() + '"';
	var storefront = '"storefront":"' + _loginStore + '"';
	var jfStartCycle = '"jfStartCycle":"'+ jfStartCycle1 + '"';
	var jfEndCycle	= '"jfEndCycle":"'+ jfEndCycle1 + '"';
	
	strArray = jfAccountId + "," + jfAccountingWhy + "," + belongId + ","
		+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + "," + jfClosedWay + ","
		+ belongConding + "," + jfBillingDate + "," 
		+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","+jfStartCycle+","+jfEndCycle+","
		+storefront+","+department+","+jfPayType;
	var jmarWaterDiff = $("#srefWaterNum").val();
	var jmarWaterMoney  = $("#srefWaterMoney").val();
	var jmarElectricDiff = $("#srefElectritNum").val();
	var jmarElectricMoney = $("#srefElectritMoney").val();
	var jmarGasDiff = $("#srefGasNum").val();
	var jmarGasMoney = $("#srefGasMoney").val();
	
	var jmarHotWaterDiff = $("#srefHotWaterNum").val();
	var jmarHotWaterMoney = $("#srefHotWaterMoney").val();
	var jmarHotAirDiff = $("#srefHotAirNum").val();
	var jmarHotAirMoney = $("#srefHotAirMoney").val();
	
	var jmarManageCharge = $("#srefManageMoney").val();
	var jmarServerCharge = $("#srefServerMoney").val();
	var jmarWifiCharge = $("#srefWifiMoney").val();
	var jmarTvCharge = $("#srefTvMoney").val();
	var jmarLiquidatedDamages = $("#srefDamages").val();
	var jmarThisArrears = $("#srefThisOwe").val();
	var jmarCumulativeArrears = $("#srefAllOwe").val();
	var ifPower= 0;
	var giveMoney = 0.00;
	//生成已租跟进相关数据
	var rentNote= '收取租客每期租金，收取明细：';
	var rentSum = 0.00;
	var readlySum = 0.00;
	console.log("打印明细");
	for(var i in rows){
		if(rows[i].jfAccountingSpecies=="水费"||rows[i].jfAccountingSpecies=="电费"||rows[i].jfAccountingSpecies=="燃气费"||rows[i].jfAccountingSpecies=="热水费"||rows[i].jfAccountingSpecies=="暖气费"){
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
	
	$.post("../getBillNoWhenPrint.action",{
	},function(printData){
		if (printData.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + printData.msg, 'error');
			return;
		}
		printData = printData.body;
		$('#billNoGet').val(printData);
		var printRow = $('#setRenterEveryFinancialTable').datagrid('getRows');
		var noteArray= {water:"",electrit:"",gas:"",hotwater:"",hotair:"",tv:"",wifi:"",manager:"",server:"",rent:"",owe:"",other:""};
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
				if(printRow[i].jfAccountingSpecies=="违约金"){
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
			jciId               : jciId,
		}, function(data) {
			
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
				jsonStrArry += JSON.stringify(rows[i]).split('}')[0] + ','
						+ strArray + '}';
			} else {
				jsonStrArry += ',' + JSON.stringify(rows[i]).split('}')[0] + ','
						+ strArray + '}';
			}
		}
		jsonStrArry = "[" + jsonStrArry + "]";
		if(ifPower==0){//如果不包含水电气收支
			$.post("../rentEachPayment.action",{
				jsonArray 				: jsonStrArry,
				jciId 					: jciId,
			},function(data) {
				if(data<0||data==''){
					myTips('添加失败！', 'error');
					hideLoading();
					return;
				}else{
					if($("#setRenterEveryFinancialIfMsg").prop('checked')){
						//每期收支短信JSON
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
					myTips('添加成功！', 'success');
					hideLoading();
					printShouju();
					//savePrintShouju();
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
				}
			});
		}else{
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
				
				jmarHotWaterDiff		: jmarHotWaterDiff,
				jmarHotWaterMoney		: jmarHotWaterMoney,
				jmarHotAirDiff			: jmarHotAirDiff,
				jmarHotAirMoney			: jmarHotAirMoney,
				
				
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
				if(data.code<0){
					myTips('添加失败！', 'error');
					hideLoading();
					return;
				}else{
	//				if ($('#setRenterEveryFinancialTable').datagrid('getData').rows[0].jfNatureOfThe == '欠结') {
	//					$('#setRenterEveryFinancialTable').datagrid('deleteRow', 0);
	//				}
					if($("#setRenterEveryFinancialIfMsg").prop('checked')){
						//每期收支短信JSON
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
					myTips('添加成功！', 'success');
					hideLoading();
					printShouju();
					//savePrintShouju();
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
				}
			});
		}
	});
	
}
//生成新签租客收支
function setRenterNewFinancial(){
	$("#setRenterNewFinancialDlg").dialog({
		title : '生成新签租客收支',
		top : getTop(600),
		left : getLeft(650),
		width : 650,
		height : 620,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#setNewFinancialMoneyDlg input').val('');
			$('#setRenterNewFinancialDlg input').val('');
			$('#setRenterNewFinancialDlg select').val('');
			$('#setRenterNewFinancialAccountName').empty();
			var data = [];
			$("#setRenterNewFinancialTable").datagrid("loadData", data);
		}
	});
	$("#setRenterNewFinancialDlg").dialog("open");
	$('#setRenterNewFinancialDoTime').val(formatTime(getNowFormatDate(), 2));
	$('#setRenterNewFinancialMoneyTotal').val('0.00');
	$('#setRenterNewFinancialMoneyGet').val('0.00');
	$('#setRenterNewFinancialMoneySum').val('0.00');
	for(var j in _userInfoData){
		if(_loginUserId == _userInfoData[j].userId){
			$("#setRenterNewFinancialHandlerGetUserId").val(_userInfoData[j].userId);
			$("#setRenterNewFinancialHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}
	if ($('#setRenterNewFinancialTable').hasClass('datagrid-f')) {
		
	} else {
		$('#setRenterNewFinancialTable').datagrid({
			columns : [ [
						{
							field : 'jfNatureOfThe',
							title : '收支性质',
							width : 20,
							align : 'center'
						},
						{
							field : 'jfAccountingSpecies',
							title : '收支种类',
							width : 20,
							align : 'center'
						},
						{
							field : 'jfSumMoney',
							title : '收支金额',
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
							field : 'jfTicketNumber',
							title : '票据编号',
							width : 20,
							align : 'center',
							editor : 'textbox'
						},
						{
							field : 'jfFinanNote',
							title : '备注',
							width : 30,
							align : 'center',
							editor : 'textbox'
						}/*,
						{
							field : 'deleteAdd',
							title : '删除',
							width : 10,
							align : 'center',
							formatter : function(value, row, index) {

								return "<a href='#' onclick=\"myDeleteRows('"+row.jfAccountingSpecies+"','jfAccountingSpecies','setRenterNewFinancialTable','');sumDataGrid(3);\">删除</a>";
								
							}
						} */] ],
						width : '100%',
						height : '100%',
						singleSelect : true,
						autoRowHeight : false,
						scrollbarSize : 0,
						showPageList : false,
						fitColumns : true,
						onClickCell : onClickCell3,
						enableCellEdit : true,// 表示是否开启单元格编辑功能
						rowStyler : function(index, row) {
							return 'color:#000;';
						},
		});
	}
}
//租客新签收支 生成收支
function setNewFinancialMoney(){
	var jciHouse4rentId = $("#setRenterNewFinancialHouseRentId").val();
	var jciRenterId = $("#setRenterNewFinancialRenterId").val();
	if(jciHouse4rentId==''||jciRenterId==''){
		myTips("请先选择一个已租房！","error");
		return;
	}
	$("#setNewFinancialMoneyDlg").dialog({
		title : '金额明细',
		top : getTop(270),
		left : getLeft(550),
		width : 550,
		height : 270,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	$.post("../queryNewTenantContractInformation.action", {
		startNum : 0,
		endNum : 1,
		contractType : "renter",
		jciHouse4rentId:jciHouse4rentId,
		jciPeriods:1,
	},function(data){
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		data = data.body;
		if(data[0].jciRemark=='已生成'){
			myTips("此租客已经生成过新签收支","error");
			return;
		}
		$("#setNewFinancialMoneyBegin").val(data[0].jciBeginPeriods);
		$("#setNewFinancialMoneyEnd").val(data[0].jciEndPeriods);
		$("#setNewFinancialMoneyRent").val(data[0].jciMoney);
		
		$("#setNewFinancialMoneyManage").val((data[0].jciManageCost!=null && data[0].jciManageCost !="")?data[0].jciManageCost:0.00);
		$("#setNewFinancialMoneyManageServer").val((data[0].jciServerCost!=null && data[0].jciServerCost !="")?data[0].jciServerCost:0.00);
		
		$("#setNewFinancialMoneyDlg").dialog('open');
		
	});
}
//新签租客收款 - 添加到列表
function addSetRenterNewFinancial(){
	var inputArry = $("#writeSetNewFinancialMoney input");//获取所有费用的输入
	var dataJson = [];
	var totalMoney= 0;
	for(var i=0;i<inputArry.length;i++){
		if($("#"+inputArry[i].id).val()==''){
			$("#"+inputArry[i].id).val(0.00);
		}
		if($("#"+inputArry[i].id).val()!=0){
			dataJson.push({
				jfFinanNote 		: 	$("#"+inputArry[i].id).attr("mNote")+$("#"+inputArry[i].id).val()+"元。",
				jfTicketNumber 		: 	'',
				jfSumMoney 			: 	$("#"+inputArry[i].id).val(),
				jfAccountingSpecies : 	$("#"+inputArry[i].id).attr("mType"),
				jfNatureOfThe		: 	'收入',
				jfBigType			:	$("#"+inputArry[i].id).attr("bigType"),
				jfStartCycle		:	$("#setNewFinancialMoneyBegin").val(),
				jfEndCycle			:	$("#setNewFinancialMoneyEnd").val(),
			});
			totalMoney = accAdd(totalMoney,$("#"+inputArry[i].id).val());
		}
	}
	$("#setRenterNewFinancialMoneyTotal").val(totalMoney);
	$("#setRenterNewFinancialMoneyGet").val(totalMoney);
	$("#setRenterNewFinancialTable").datagrid("loadData",dataJson);
	sumDataGrid(3);
	$("#setNewFinancialMoneyDlg").dialog('close');
}
//执行添加租客新签
function doSetRenterNewFinancial(){
	var rows = $("#setRenterNewFinancialTable").datagrid("getRows");
	if ($('#setRenterNewFinancialDiv input').length != 0) {
		$.messager.alert('操作提示', '数据表中有未完成编辑的数据，请完成编辑后再保存！');
		return;
	}
	var moneySum = $("#setRenterNewFinancialMoneySum").val();//欠结金额
	var moneyGet = $("#setRenterNewFinancialMoneyGet").val();//实际金额
	var moneyTotal = $("#setRenterNewFinancialMoneyTotal").val();//合计金额
	var relationBelongType = $("#setRenterNewFinancialBelongType").val();
	var relationBelong = $("#setRenterEveryHouseCoding").val();
	var relationBelongChose = $("#setRenterEveryHouseCodingType").val();
	var relationBelongName = $("#setRenterNewFinancialBelongName").val();
	var relationBelongId = $("#setRenterNewFinancialBelongId").val();
	
	var addFinancialHouseId = $("#setRenterNewFinancialHouseId").val();
	var addFinancialHouseStoreId = $("#setRenterNewFinancialHouseStoreId").val();
	var addFinancialHouseRentId = $("#setRenterNewFinancialHouseRentId").val();
	var addFinancialManagerUserId = $("#setRenterNewFinancialManagerUserId").val();
	var addFinancialRenterId = $("#setRenterNewFinancialRenterId").val();
	var addFinancialLandlordId = $("#setRenterNewFinancialLandlordId").val();
	var jfPayType = $("#newFinancialPayType").val();
	if (relationBelongName == '' ) {
		myTips('收支归属信息不完整！请完善后再进行保存！', "error");
		return;
	} else if (rows.length == 0) {
		myTips('没有可用于添加的数据', "error");
		return;
	}else if($("#setRenterNewFinancialBankNums").val()==''){
		myTips('请选择收支账户！', "error");
		return;
	}else if(jfPayType==''){
		myTips('请选择收支方式！', "error");
		return;
	}else if(_billNum==1){
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].jfTicketNumber == '') {
				myTips('票据编号未填写', 'error');
				return;
			}
		}
	}
	if (moneySum != 0) {//欠结不为0时要往表格里额外添加欠结收支
		var jfFinanNote = '';
		var insertJson = [];
		for(var i in rows){
			jfFinanNote += "新签租客-"+rows[i].jfNatureOfThe+"-"
			+rows[i].jfAccountingSpecies+":"+rows[i].jfSumMoney+"元,"; 
		}
		jfFinanNote+="合计金额："+ moneyTotal +"元,"+"实际金额："+ moneyGet +"元,"
		
		if (moneySum > 0) {//欠结
			insertJson.push({
				jfSumMoney 			: moneySum,
				jfNatureOfThe 		: "支出",
				jfBigType			: "财务类",
				jfAccountingSpecies : "应收款",
				jfFinanNote 		: jfFinanNote+'应收款'+moneySum+"元。",
			});
			insertJson.push({
				jfSumMoney 			: moneySum,
				jfNatureOfThe 		: "支出",
				jfBigType			: "欠结类",
				jfAccountingSpecies : "租客欠结款",
				jfFinanNote 		: jfFinanNote+'租客欠结款'+moneySum+"元。",
			});
		} else {//预存
			insertJson.push({
				jfSumMoney 			: accSub(0,moneySum),
				jfNatureOfThe 		: "收入",
				jfBigType			: "欠结类",
				jfAccountingSpecies : "租客预存款",
				jfFinanNote 		: jfFinanNote + '租客预存款'+accSub(0,moneySum)+"元。",
			});
		}
		
		var rowLength = $('#setRenterNewFinancialTable').datagrid('getRows').length;
		for(var i in insertJson){
			if(insertJson[i].jfSumMoney!=0){
				$('#setRenterNewFinancialTable').datagrid('insertRow', {
					index : parseInt(rowLength),
					row : insertJson[i]
				});
			}
		}
	}
	jfPayType = '"jfPayType":"' + jfPayType + '"';
	var belongId = '"jfRenterId":"' + addFinancialRenterId + '",'+'"jfLandlordId":"' + addFinancialLandlordId + '"';
	var belongConding  = '"jfHouse4rentId":"' + addFinancialHouseRentId + '",'+'"jfHouse4storeId":"' + addFinancialHouseStoreId + '",'+'"jfHouseId":"' + addFinancialHouseId + '",'+'"jfManagerUserId":"' + addFinancialManagerUserId + '"';
	
	var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';
	var jfBillingDate = '"jfBillingDate":"' + $("#setRenterNewFinancialDoTime").val() + '"';
	var jfHandlers = '"jfHandlers":"' + $("#setRenterNewFinancialHandlerGetUserId").val() + '"';
	var jfTheOwnershipType = '"jfTheOwnershipType":"' + relationBelongType + '"';
	var jfBelongingToTheName = '"jfBelongingToTheName":"' + relationBelongName + '"';
	var jfClosedWay =  '"jfClosedWay":"' + $("#setRenterNewFinancialWay").find("option:selected").text()+ '"';
	var jfFinancialCoding = '"jfFinancialCoding":"'
			+ formatTime(getNowFormatDate(), 3)
			+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
			+ Math.floor(Math.random() * 10) + '"';
	var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate() + ','+_loginUserName+'添加收支记录<br>"';
	var jfAccountId = '"jfAccountId":"' + $("#setRenterNewFinancialBankNums").val() + '"';
	var department = '"department":"' + _loginDepartment + '"';
	var jfAccountingWhy = '"jfAccountingWhy":"' + $("#setRenterNewFinancialBelongAddress").val() + '"';
	var storefront = '"storefront":"' + _loginStore + '"';
	strArray = jfAccountId + "," + jfAccountingWhy + "," + belongId + ","
		+ jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName + "," + jfClosedWay + ","
		+ belongConding + "," + jfBillingDate + "," 
		+ jfHandlers + "," + jfTheOwnershipType + "," + jfFinancialCoding+","
		+storefront+","+department+","+jfPayType;
	var jsonStrArry = '';
	for (var i in rows) {
		if (i == 0) {
			jsonStrArry += JSON.stringify(rows[i]).split('}')[0] + ',' + strArray + '}';
		} else {
			jsonStrArry += ',' + JSON.stringify(rows[i]).split('}')[0] + ',' + strArray + '}';
		}
	}
	jsonStrArry = "[" + jsonStrArry + "]";
	//生成已租跟进相关数据
	var rentNote= '收取新签租客金额，收取明细：';
	var rentSum = 0.00;
	var readlySum = 0.00;
	for(var i in rows){
		if(rows[i].jfAccountingSpecies!="租客欠结"&&rows[i].jfAccountingSpecies!="租客补结"){
			rentNote+=rows[i].jfAccountingSpecies+"： "+rows[i].jfSumMoney+" 元;";
			rentSum = accAdd(rows[i].jfSumMoney,rentSum);
		}else if(rows[i].jfAccountingSpecies=="租客欠结"){
			readlySum = accSub(0,rows[i].jfSumMoney);
		}else if(rows[i].jfAccountingSpecies=="租客补结"){
			readlySum = rows[i].jfSumMoney;
		}
	}
	readlySum = accAdd(rentSum,readlySum);
	rentNote+="应交金额："+ rentSum +" 元;实际金额："+readlySum+" 元。";
	showLoading();
	$.post("../newSigningIncome.action",{
		jsonArray : jsonStrArry
	},function(data) {
		if(data.code<0||data==''){
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			hideLoading();
		}else{
			if ($('#setRenterNewFinancialTable').datagrid('getData').rows[0].jfNatureOfThe == '欠结') {
				$('#setRenterNewFinancialTable').datagrid('deleteRow', 0);
			}
			var nullData = [];
			$("#setRenterNewFinancialTable").datagrid("loadData", nullData);
			$("#setRenterNewFinancialDlg input").val('');
			$("#setRenterNewFinancialBelongType").val('');
			$("#setRenterNewFinancialAccountName").empty();
			$("#setRenterNewFinancialWay").val('');
			$("#newFinancialPayType").val('');
			$('#setRenterNewFinancialMoneyTotal').val('0.00');
			$('#setRenterNewFinancialMoneyGet').val('0.00');
			$('#setRenterNewFinancialMoneySum').val('0.00');
			$('#setRenterNewFinancialDoTime').val(formatTime(getNowFormatDate(), 2));
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
			queryFinancial(1, 0);
		}
	});
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
			clearChoseConstract();
			var page=$(".current").html();
			queryFinancial(page, 0);
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
			
			// if(row[i].jfAccountingSpecies=="热水费"){
			// 	noteArray.hotwater = row[i].note;
			// }
			// if(row[i].jfAccountingSpecies=="暖气费"){
			// 	noteArray.hotair = row[i].note;
			// }
			
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
			if(row[i].jfAccountingSpecies=="违约金"){
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
	
	
	// var shoufeixiangmu_hw = '热水费';
	// var benqidushu_hw = $("#srefHotWaterThis").val();
	// var shangqidushu_hw = $("#srefHotWaterLast").val();
	// var shiyongliang_hw = $("#srefHotWaterNum").val();
	// var jifeifangan_hw = $("#srefHotWaterPlan").val();
	// var jine_hw = $("#srefHotWaterMoney").val();
	// var hotwater = '{shoufeixiangmu:"' + shoufeixiangmu_hw
	// 	+ '",benqidushu:"' + benqidushu_hw
	// 	+ '",shangqidushu:"' + shangqidushu_hw
	// 	+ '",shiyongliang:"' + shiyongliang_hw
	// 	+ '",jifeifangan:"' + jifeifangan_hw
	// 	+ '",jine:"' + jine_hw
	// 	+ '",beizhu:"' + noteArray.hotwater
	// 	+ '"},';
	//
	// var shoufeixiangmu_ha = '暖气费';
	// var benqidushu_ha = $("#srefHotAirThis").val();
	// var shangqidushu_ha = $("#srefHotAirLast").val();
	// var shiyongliang_ha = $("#srefHotAirNum").val();
	// var jifeifangan_ha = $("#srefHotAirPlan").val();
	// var jine_ha = $("#srefHotAirMoney").val();
	// var hotair = '{shoufeixiangmu:"' + shoufeixiangmu_ha
	// 	+ '",benqidushu:"' + benqidushu_ha
	// 	+ '",shangqidushu:"' + shangqidushu_ha
	// 	+ '",shiyongliang:"' + shiyongliang_ha
	// 	+ '",jifeifangan:"' + jifeifangan_ha
	// 	+ '",jine:"' + jine_ha
	// 	+ '",beizhu:"' + noteArray.hotair
	// 	+ '"},';
	
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
	// if(jine_hw != 0){
	// 	energy_arr += hotwater;
	// }
	// if(jine_ha != 0){
	// 	energy_arr += hotair;
	// }
	
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
	parent.doPrintInExe(printArray,2);
}
//跳转查看房源
function skipToCheckHouse(){
	var row = $('#financialDg').datagrid('getSelected');
	var skipJspName = '';
	var skipJspUrl = '';
	var skipJspIcon = '';
	var skipInputId = ['','',''];
	var skipInputVal = ['','',''];
	if((row.jfTheOwnershipType=="租客" && row.jfHouse4rentId!=null && row.jfHouse4rentId!='')|| (row.jfTheOwnershipType=="业主" && row.jfHouse4rentId!=null && row.jfHouse4rentId!='') ){
		skipJspName = '已租房间';
		skipJspUrl = 'fg_sourceInfo';
		skipJspIcon = 'yizuguanli';
		skipInputId[0] = 'sourceCommunity';
		skipInputId[1] = 'sourceBuilding';
		skipInputId[2] = 'sourceDoorplateno';
		skipInputId[3] = 'searchLeaseState';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
		skipInputVal[3] = '';
	}else if(row.jfTheOwnershipType=="业主" && (row.jfHouse4rentId!=null || row.jfHouse4rentId!='')){
		skipJspName = '未租房间';
		skipJspUrl = 'fg_trusteeship';
		skipJspIcon = 'weizuguanli';
		skipInputId[0] = 'searchCommunity';
		skipInputId[1] = 'searchBuilding';
		skipInputId[2] = 'searchDoorplateno';
		skipInputId[3] = 'searchHsPrimitiveMother';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
		skipInputVal[3] = 0;
	}
	else if((row.jfTheOwnershipType=="租客" && row.jfJsrcId!=null && row.jfJsrcId!='') || (row.jfTheOwnershipType=="业主" && row.jfJsrcId!=null && row.jfJsrcId!='') ){
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
	else{
		skipJspName = '项目';
		skipJspUrl = 'fg_virtual';
		skipJspIcon = 'xiangmuguanli';
		skipInputId[0] = 'searchVirtualName';
		skipInputId[1] = 'searchVirtualDoorplateno';
		skipInputId[2] = 'searchVirtualContact';
		skipInputVal[0] = row.jfBelongingToTheName;
		skipInputVal[1] = row.addDoorplateno;
		skipInputVal[2] = '';
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
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[3],
		jsonVal:skipInputVal[3],
	});
	window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
//	parent._skipToChildJson=[];
}
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
//费用关联已租列表双击操作
function houseDbFunction(row){
	var getValType = $('#relationType').val();
	if (row) {
		for (var i in row) {
			if (row[i] == null) {
				row[i] = '';
			}
		}
		$("#renterBaseMoneyInput").val(row.hrBase);
		$("#renterBaseMoneyInputShow").val(row.hrBase);
		changeBaseShowFont("renterBaseMoneyInputSpan","renterBaseMoneyInputShow",0);
		$.post("../queryHouseStoreCommon.action",{
			hsId : row.hrHouse4storeId,
		},function(data){
			data=data.body;
			$("#landlordBaseMoneyInput").val(data[0].hsBase);
			$("#landlordBaseMoneyInputShow").val(data[0].hsBase);
			changeBaseShowFont("landlordBaseMoneyInputSpan","landlordBaseMoneyInputShow",2);
		});
		console.log('getValType='+getValType);
		if(getValType==0){//新增收支
			$(".add_houseCoding").val(row.hrId);
			$(".addFinancialHouseId").val(row.hrHouseId);
			$(".addFinancialHouseStoreId").val(row.hrHouse4storeId);
			$(".addFinancialHouseRentId").val(row.hrId);
			$(".addFinancialManagerUserId").val(row.hrManagerUserId);
			$(".addFinancialRenterId").val(row.hrRenterId);
			$(".addFinancialLandlordId").val(row.hrLandlordId);
			
			$(".add_houseCodingType").val('已租');
			$(".add_financial_belongAddress").val(
								row.hrAddCommunity
								+ row.hrAddBuilding
								+ row.hrAddDoorplateno);
			$(".add_financial_belongType").empty();
			$(".add_financial_belongType").append("<option value='"+row.hrRenterId+"'>租客</option>");
			$(".add_financial_belongType").append("<option value='"+row.hrLandlordId+"'>业主</option>");
			$(".add_financial_belongId").val('');
			$(".add_financial_belongName").val('');
			
		}else if(getValType==1){//生成租客每期收支
			clearChoseConstract();
			$("#setRenterEveryHouseCoding").val(row.hrId);
			$("#setRenterEveryFinancialHouseId").val(row.hrHouseId);
			$("#setRenterEveryFinancialHouseStoreId").val(row.hrHouse4storeId);
			$("#setRenterEveryFinancialHouseRentId").val(row.hrId);
			$("#setRenterEveryFinancialManagerUserId").val(row.hrManagerUserId);
			$("#setRenterEveryFinancialRenterId").val(row.hrRenterId);
			$.post("../selectHouseRentName.action", {
				renterId : row.hrRenterId,
			}, function(data) {
				data=data.body;
				$("#setRenterEveryFinancialPopId").val(data[0].renterPopulationId);
			});
			
			
			$("#setRenterEveryFinancialLandlordId").val(row.hrLandlordId);
			$("#setRenterEveryFinancialBelongType").val('租客');
			$("#setRenterEveryFinancialManage").val(row.hrManageCost);
			$("#setRenterEveryFinancialTv").val(row.hrTvCharge);
			$("#setRenterEveryFinancialNet").val(row.hrWifiCharge);
			
			
			$("#setRenterEveryHouseCodingType").val('已租');
			$("#setRenterEveryFinancialBelongAddress").val(
								row.hrAddCommunity
								+ row.hrAddBuilding
								+ row.hrAddDoorplateno);
			$("#setRenterEveryFinancialBelongId").val(row.hrRenterId);
			$("#setRenterEveryFinancialBelongName").val(row.renterPopName);
		}else if(getValType==2){//生成新签租客收支
			var getFinancia= $('#financialDg').datagrid("getRows");
			var houseName=row.hrAddCommunity+ row.hrAddBuilding+ row.hrAddDoorplateno;
			console.log(getFinancia)
			for(var i in getFinancia){
				if(getFinancia[i].jfAccountingWhy==houseName&&getFinancia[i].jfBelongingToTheName==row.renterPopName){
					myTips("不能重复添加","error");
					return;
				}
			}
			$("#setRenterNewHouseCoding").val(row.hrId);
			$("#setRenterNewFinancialHouseId").val(row.hrHouseId);
			$("#setRenterNewFinancialHouseStoreId").val(row.hrHouse4storeId);
			$("#setRenterNewFinancialHouseRentId").val(row.hrId);
			$("#setRenterNewFinancialManagerUserId").val(row.hrManagerUserId);
			$("#setRenterNewFinancialRenterId").val(row.hrRenterId);
			$("#setRenterNewFinancialLandlordId").val(row.hrLandlordId);
			$("#setRenterNewFinancialBelongType").val('租客');
			$("#setNewFinancialMoneyTv").val(row.hrTvCharge);
			$("#setNewFinancialMoneyNet").val(row.hrWifiCharge);
			$("#setNewFinancialMoneyRoom").val(row.hrHouseDeposit);
			$("#setNewFinancialMoneyPower").val(row.hrPowerDeposit);
			$("#setNewFinancialMoneyDoor").val(row.hrDoorDeposit);
			$("#setNewFinancialMoneyOther").val(row.hrOtherDeposit);
			$("#setNewFinancialMoneyServer").val(0);
			$("#setNewFinancialMoneyDoorPrice").val(0);
			$("#setNewFinancialChange").val(0);
			$("#setRenterNewHouseCodingType").val('已租');
			$("#setRenterNewFinancialBelongAddress").val(houseName);
		
			$("#setRenterNewFinancialBelongId").val(row.hrRenterId);
			$("#setRenterNewFinancialBelongName").val(row.renterPopName);
			
		}
		belongTypeChange();
		$('#relationDlg').dialog('close');
	
	}

}
function DecDays(dayIn) {
	var date=new Date();
	var myDate=new Date(date.getTime()-dayIn*24*60*60*1000);
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
function oneWeeks(){
	$("#searchJfCheckInTimeEnd").val(formatTime(getNowFormatDate(), 2));
	$("#searchJfCheckInTimeStart").val(DecDays(7));
	$('#oneWk').addClass("choose-cur");
	$('#oneMon').removeClass("choose-cur");
	$('#threeMon').removeClass("choose-cur");
}
function oneMonths(){
	$("#searchJfCheckInTimeEnd").val(formatTime(getNowFormatDate(), 2));
	$("#searchJfCheckInTimeStart").val(DecDays(30));
	$('#oneWk').removeClass("choose-cur");
	$('#oneMon').addClass("choose-cur");
	$('#threeMon').removeClass("choose-cur");
}
function threeMonths(){
	$("#searchJfCheckInTimeEnd").val(formatTime(getNowFormatDate(), 2));
	$("#searchJfCheckInTimeStart").val(DecDays(30*3));
	$('#oneWk').removeClass("choose-cur");
	$('#oneMon').removeClass("choose-cur");
	$('#threeMon').addClass("choose-cur");
}