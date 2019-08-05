/*var _token;*/
//查询本工作区已绑定的设备
function queryOfficeInfo(){
	var row = $('#virtualDataGrid').datagrid('getSelected');
	var hsId = row.hsId;
	var jhdHsDeviceId='';
	$.post("../selectThisHouseDeviceID.action",{
		jhdHsId: hsId,

	},function(data){
		if (data.code < 0) {
			$('#deviceInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			var devStatus;
			for (var i in data) {
				//console.log(data[i]);
				var devJson = data[i];
				var eleAmount;
				var cmdCount;
				var signalQuality;
				if(devJson.devBrandId==10){
					$.post("http://www.fangzhizun.com/device/api",{
						brandId 	: devJson.devBrandId,
						instruction : "读取状态",
						appKey		: devJson.devAuthId,
						secret		: devJson.devAuthSecret,
						code		: devJson.devSpare2,
					},function (data1) {
						//console.log(data);
						if(data1.code==1){
							//电量
							eleAmount = data1.body.eleAmount;
							//开门次数
							cmdCount = data1.body.cmdCount;
							//信号质量
							signalQuality = data1.body.signalQuality;

							devStatus = eleAmount;
							//console.log(data[i].devStatus);
							data[i].devStatus = "<div style='float:left;margin:0 0 0 10px;'><img src='img/battery.png' width='18px' style='float:left;margin:0 0 0 10px;'>"+"<span style='float:left;'>"+eleAmount+"%</span></div>"
							+"<div style='float:left;margin:0 0 0 10px;'><img src='img/signal.png' width='18px' style='float:left; margin:0 0 0 10px;'><span style='float:left;'>"+signalQuality+"格</span></div>"
							+"<div style='float:left;margin:0 0 0 10px;'><img src='img/frequency.png' width='18px' style='float:left; margin:0 0 0 10px;'><span style='float:left;'>"+cmdCount+"次</span></div>"
							+"<div style='float:left;margin:0 0 0 0;><img></div>";
							$("#deviceInfoTable").datagrid("loadData", data);
						}else{
							data[i].devStatus = "暂无数据";
							$("#deviceInfoTable").datagrid("loadData", data);
						}

					})
				}else if (devJson.devBrandId == 20 && devJson.devFirstType == 16 && devJson.devSecondType == 16)  {//云海电箱
					$.post("../queryDeviceStatus.action", {
						devAuthId: devJson.devAuthId,
						devId: devJson.id
					}, function (data1) {
						for (var j in data) {
							if(data1.body==null || data1.body==''){
								continue;
							}
							if (data[j].devAuthId == data1.body[0].sn) {
								if (data1.code == 1) {
									//状态码
									var status = data1.body[0].status.slice(6);
									var len = status.length / 10;
									var devStatus = '';
									var online = data1.body[0].online;
									var devState = '';
									var h = 0 + (data[j].jhdSubDeviceNumber - 1) * 10;
									var subStatus = parseInt(status.slice(h, h + 2), 16).toString(2).slice(1, 2);
									if (subStatus == 1) {
										devStatus += '闭合';
									} else {
										devStatus += '断开';
									}
									if (online) {
										devState += '在线';
									} else {
										devState += '离线';
									}
									data[j].len = len;
									data[j].devStatus = devStatus;
									data[j].devState = devState;
									data[j].subStatus = status;
									$("#deviceInfoTable").datagrid("loadData", data);
								} else {
									data[j].devStatus = "暂无数据";
									$("#deviceInfoTable").datagrid("loadData", data);
								}
							}
						}
					});
				}else{
					data[i].devStatus = "暂无数据";
					$("#deviceInfoTable").datagrid("loadData", data);
				}
				if (devJson.devBrandId == 20)  {//云海
					$.post("../queryDeviceStatus.action", {
						devAuthId: devJson.devAuthId,
						devId : devJson.id
					}, function (data1) {
						for (var j in data) {
							if(data1.body==null || data1.body==''){
								continue;
							}
							if (data[j].devAuthId == data1.body[0].sn) {
								if (data1.code == 1) {
									//状态码
									var online = data1.body[0].online;
									var devState = '';
									if (online) {
										devState += '在线';
									} else {
										devState += '离线';
									}
									data[j].devState = devState;
									$("#deviceInfoTable").datagrid("loadData", data);
								} else {
									data[j].devState = "暂无数据";
									$("#deviceInfoTable").datagrid("loadData", data);
								}
							}
						}
					});
				}else if (devJson.devBrandId == 10 && devJson.devFirstType == 3 && devJson.devSecondType == 3) {
					data[i].devState = "在线";
					$("#deviceInfoTable").datagrid("loadData", data);
				} else if (devJson.devBrandId == 23 && devJson.devFirstType == 16 && devJson.devSecondType == 16) {
					$.post("http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus", {
						projectCode: devJson.devId,
						mac: devJson.devSn,
					}, function (data1) {
						console.log(data1);
						if (data1.code == 0) {
							data1 = data1.body;
							for (var k in data) {
								for (var j in data1) {
									if (data1[j].mac == data[k].devSn && data1[j].addr == data[k].devRoad) {
										var devState = '';
										if (data1[j].online) {
											devState = '在线';
										} else {
											devState = '离线';
										}
										data[k].devState = devState;
										$("#deviceInfoTable").datagrid("loadData", data);
									}
								}
							}
						}
					});
					$("#deviceInfoTable").datagrid("loadData", data);
				} else {
					data[i].devState = "暂无数据";
					$("#deviceInfoTable").datagrid("loadData", data);
				}
			}
			$("#deviceInfoTable").datagrid("loadData", data);
		}
	});
}


function refreshDevice(){
	var deviceArr =[];
	deviceArr = $("#deviceInfoTable").datagrid('getRows');
	console.log(deviceArr);
	for (var i in deviceArr){

	}


}
/*function formatterStatus(value, row, index) {
	var _details;
		var devJson = row;
		var eleAmount;
		var cmdCount;
		var signalQuality;
		if(devJson.devBrandId==10){
			$.post("http://www.fangzhizun.com/device/api",{
				brandId 	: devJson.devBrandId,
				instruction : "读取状态",
				appKey		: devJson.devAuthId,
				secret		: devJson.devAuthSecret,
				code		: devJson.devSpare2,
			},function (data) {
				//console.log(data);
				if(data.code==1){
					//电量
					eleAmount = data.body.eleAmount;
					//开门次数
					cmdCount = data.body.cmdCount;
					//信号质量
					signalQuality = data.body.signalQuality;

					_details = eleAmount;
					console.log(_details);
				}else{
					_details = "暂无数据";
				}
			})
		}else{
			_details = "暂无数据";
		}
	}

	var details = dataDetails(row).then(function(val){
		details = val;
		console.log(val);
		console.log("aa");
		return details;
	});
	return details;
	console.log("bb");
	console.log("1");
	const details = await dataDetails(row);
	console.log(_details);
	console.log("2");



	return _details;
}

function dataDetails(row){
	var devJson = row;
	var eleAmount;
	var cmdCount;
	var signalQuality;
	if(devJson.devBrandId==10){
		$.post("http://www.fangzhizun.com/device/api",{
			brandId 	: devJson.devBrandId,
			instruction : "读取状态",
			appKey		: devJson.devAuthId,
			secret		: devJson.devAuthSecret,
			code		: devJson.devSpare2,
		},function (data) {
			//console.log(data);
			if(data.code==1){
				//电量
				eleAmount = data.body.eleAmount;
				//开门次数
				cmdCount = data.body.cmdCount;
				//信号质量
				signalQuality = data.body.signalQuality;

				_details = eleAmount;

			}else{
				_details = "暂无数据";
			}
		})
	}else{
		_details = "暂无数据";
	}
}
*/

//添加新设备选择品牌显示不同的录入项
function changeBrandAddDevice(){
	var brandId = Number($('#addDeviceGetBrandId').val());
	var a1 = [1,2,3,4,5,6,7,8,9];
	var a2 = [10,11];
	var a3 = [12,13];
	var a4 = [19];
	var a5 = [20];
	$('#addDeviceDiv').show();
	if (a1.indexOf(brandId) > -1) {
		$('#deviceUserNameDiv').show();
		$('#devicePasswardDiv').show();
		$('#deviceAuthIdDiv').hide();
		$('#deviceAuthSecretDiv').hide();
		$('#deviceAuthIdDivOne').hide();

		$('#deviceAppkeyDiv').hide();
		$('#deviceSecretDiv').hide();
	} else if (a2.indexOf(brandId) > -1) {
		$('#deviceUserNameDiv').show();
		$('#devicePasswardDiv').show();
		$('#deviceAuthIdDiv').show();
		$('#deviceAuthSecretDiv').show();
		$('#deviceAuthIdDivOne').hide();

		$('#deviceAppkeyDiv').hide();
		$('#deviceSecretDiv').hide();
	} else if (a3.indexOf(brandId) > -1) {
		$('#deviceUserNameDiv').hide();
		$('#devicePasswardDiv').hide();
		$('#deviceAuthIdDiv').hide();
		$('#deviceAuthSecretDiv').hide();
		$('#deviceAuthIdDivOne').show();

		$('#deviceAppkeyDiv').hide();
		$('#deviceSecretDiv').hide();
	}else if (a4.indexOf(brandId) > -1) {
		$('#deviceUserNameDiv').show();
		$('#devicePasswardDiv').show();
		$('#deviceAppkeyDiv').show();
		$('#deviceSecretDiv').show();

		$('#deviceAuthIdDiv').hide();
		$('#deviceAuthSecretDiv').hide();
		$('#deviceAuthIdDivOne').hide();
	}else if(a5.indexOf(brandId)>-1){
		$('#deviceUserNameDiv').show();
		$('#devicePasswardDiv').show();
		$('#deviceAppkeyDiv').hide();
		$('#deviceSecretDiv').hide();
		$('#deviceAuthIdDiv').hide();
		$('#deviceAuthSecretDiv').hide();
		$('#deviceAuthIdDivOne').hide();

	}else{
		$('#deviceUserNameDiv').hide();
		$('#devicePasswardDiv').hide();
		$('#deviceAuthIdDiv').hide();
		$('#deviceAuthSecretDiv').hide();
		$('#deviceAuthIdDivOne').hide();

		$('#deviceAppkeyDiv').hide();
		$('#deviceSecretDiv').hide();
	}
	$('#deviceUserName').val('');
	$('#devicePassward').val('');
	$('#deviceAuthId').val('');
	$('#deviceAuthSecret').val('');
}
//打开添加新设备对话框
function addDeviceDlg(){
	$('#addDeviceDlg').dialog({
		title : '添加新设备',
		top : getTop(240),
		left : getLeft(540),
		width : 540,
		height : 240,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addDeviceDlg input').val("");
			$('#addDeviceDiv').hide();
		}
	});
	$('#addDeviceDlg').dialog("open");
}
//执行添加新设备
function doAddDevice(){
	var brandId = Number($('#addDeviceGetBrandId').val());
	var username = $('#deviceUserName').val() ;
	var password = $('#devicePassward').val() ;
	var authId = $('#deviceAuthId').val() ;
	var	authId2 =$('#deviceAuthId2').val() ;
	var	deviceAppkeyId =$('#deviceAppkeyId').val() ;
	var	deviceSecretId =$('#deviceSecretId').val() ;
	var authSecret = $('#deviceAuthSecret').val() ;

	var postUrl = "http://www.fangzhizun.com/device/api";
//	var postUrl = "http://localhost/device/api";
	var postJson = {};

	if (brandId == 0) {
		myTips('信息填写不完整', 'error');
		return;
	}

	switch (brandId) {
		/*case 1: //云猫-门锁
			if (username == '' || password == '') {
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				  coId			:	_loginCoId,
				  brandId		:	brandId,
				  instruction	:	'查询设备列表',
				  username		:	username,
				  password		: 	password,
			};
			break;
		case 2://飞雪-门锁
			if (authId == '' || authSecret == '') {
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				  coId			:	_loginCoId,
				  brandId		:	brandId,
				  instruction	:	'查询设备列表',
				  authId		:	authId,
				  authSecret	: 	authSecret,
			};
			break;
		case 9://云海物联-所有设备
			if (username == '' || password == '') {
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				  coId			:	_loginCoId,
				  brandId		:	brandId,
				  instruction	:	'查询设备列表1',
				  username		:	username,
				  password		: 	password,
				  authId		:	authId,
				  authSecret	: 	authSecret,
			};
			break;*/
		case 10://电易-门锁
			if ((username == '' || password == '' || authId == '' || authSecret == '') && devFirstType == 3 && devSecondType == 3) {
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				  coId			:	_loginCoId,
				  brandId		:	brandId,
				  instruction	:	'查询设备列表',
				  username		:	username,
				  password		: 	password,
				  authId		:	authId,
				  authSecret	: 	authSecret,
			};
			break;
		case 11://电易-网关
			if ((username == '' || password == '' || authId == '' || authSecret == '')&& devFirstType == 1 && devSecondType == 1) {
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				  coId			:	_loginCoId,
				  brandId		:	brandId,
				  instruction	:	'查询设备列表',
				  username		:	username,
				  password		: 	password,
				  authId		:	authId,
				  authSecret	: 	authSecret,
			};
			break;
		case 12://电易-电表
			if (authId2 == '') {
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				  coId			:	_loginCoId,
				  brandId		:	brandId,
				  instruction	:	'查询电表列表',
				  username		:	username,
				  password		: 	password,
				  authId		:	authId2,
				  authSecret	: 	authSecret,
			};
			break;
		case 13://电易-水表
			if (authId == '') {
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				  coId			:	_loginCoId,
				  brandId		:	brandId,
				  instruction	:	'查询电表列表',
				  username		:	username,
				  password		: 	password,
				  authId		:	authId,
				  authSecret	: 	authSecret,
			};
			break;
		case 19://电易-通用批量
			if (deviceAppkeyId == ''&&deviceSecretId == ''&&username == ''&&password == ''){
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				  coId			:	_loginCoId,
				  brandId		:   brandId,
				  app_key		:	deviceAppkeyId,
				  secret		:	deviceSecretId,
				  mobile		:	username,
				  password		: 	password,
				  instruction   : 	"批量获取设备",
			};
			break;

		case 20://新云海-通用批量
			if(username == ''&&password == ''){
				myTips('信息填写不完整', 'error');
				return;
			}
			postJson = {
				coid		:	_loginCoId,
				brandId		:	brandId,
				instruction	:	"批量获取设备",
				username	:	username,
				password	:	password,
				/*token		:	"_token",*/
			};
			break;
	}
	showLoading();

	$.post(postUrl, postJson, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg,"error");
			return;
		} else {
			myTips("添加成功！", "success");
			queryDeviceList(1);
			$('#addDeviceDlg').dialog("close");
		}
	});
}


function chooseOperateDlg() {
	var row = $("#deviceInfoTable").datagrid('getSelected');
	if (!row) {
		myTips('请先选择一个设备', 'error');
		return;
	}
	if(row.devBrandId == 22){
		faceControl();
	}else{

		$('#chooseOperateDlg').dialog({
			title: '选择操作',
			top: getTop(200),
			left: getLeft(600),
			width: 600,
			height: 200,
			closed: true,
			cache: false,
			modal: true,
			onClose: function () {
				$('#chooseOperateDlg input').val("");
				$("#BrightnessDiv").hide();
				$("#ColorTemperatureDiv").hide();
			}
		});
		var devAuthId = row.devAuthId;

		$('#chooseOperateDlg a[data-brand]').each(
			function () {
				/*
                 * if(row.devBrandId==20&&row.devId!=25){
                 * $(this).hide(); }else{ $(this).show(); }
                 */
				var brands = $(this).attr('data-brand').split(',');
				if (brands.indexOf(row.devBrandId.toString()) < 0) {
					$(this).hide();
				} else {
					$(this).show();
					if (row.devBrandId == 20) {
						var brand = $(this).attr('data-brand').split(',');
						console.log("brandFlag="+brand.indexOf(row.devBrandId.toString()) != -1)
						if (brand.indexOf(row.devBrandId.toString()) != -1) {
							if(typeof ($(this).attr('data-devSecondType'))!="undefined"){
								var devSecondTypes=$(this).attr('data-devSecondType').split(',')
								var devSecondType=row.devSecondType.toString();
								// console.log("second="+devSecondTypes);
								// console.log($.inArray(row.devSecondType.toString(),devSecondTypes));
								if($.inArray(devSecondType,devSecondTypes)<0){
									$(this).hide();
								}else {
									// devId==3为灯
									if (row.devFirstType == 1) {
										var csRoad;
										$.post("../queryCodeStorage.action", {
												devAuthId: devAuthId,
											},
											function (data) {
												if (data.code < 0) {
													$('#OnLampRoad1').hide();
													$('#OnLampRoad2').hide();
													$('#OnLampRoad3').hide();
													$('#OnLampRoad4').hide();
													$('#OnLampRoad5').hide();
													$('#OnLampRoad6').hide();
													$('#OnLampRoad7').hide();
													$('#OnLampRoad8').hide();

													$('#OffLampRoad1').hide();
													$('#OffLampRoad2').hide();
													$('#OffLampRoad3').hide();
													$('#OffLampRoad4').hide();
													$('#OffLampRoad5').hide();
													$('#OffLampRoad6').hide();
													$('#OffLampRoad7').hide();
													$('#OffLampRoad8').hide();
												} else {
													$('#OnLampRoad1').hide();
													$('#OnLampRoad2').hide();
													$('#OnLampRoad3').hide();
													$('#OnLampRoad4').hide();
													$('#OnLampRoad5').hide();
													$('#OnLampRoad6').hide();
													$('#OnLampRoad7').hide();
													$('#OnLampRoad8').hide();

													$('#OffLampRoad1').hide();
													$('#OffLampRoad2').hide();
													$('#OffLampRoad3').hide();
													$('#OffLampRoad4').hide();
													$('#OffLampRoad5').hide();
													$('#OffLampRoad6').hide();
													$('#OffLampRoad7').hide();
													$('#OffLampRoad8').hide();
													data = data.body;
													csRoad = data[0].csRoad;
													// 可以得到csRoad=2
													for (var i = 1; i <= csRoad; i++) {
														for (var j = 1; j < 9; j++) {
															if (i == $('#OffLampRoad' + j).attr('data-devRoad')) {
																$('#OffLampRoad' + j).show()
															}
															if (i == $('#OnLampRoad' + j).attr('data-devRoad')) {
																$('#OnLampRoad' + j).show()
															}
														}
													}
												}
											});
									}else if(row.devFirstType == 23) {
										//读取2.4G冷暖灯状态
										$.post("../queryDeviceStatus.action", {
												devId:row.id,
												devAuthId: devAuthId,
											},
											function (data) {
												// console.log(data)
												if (data.code == 1) {
													//读取2.4G冷暖灯开关状态
													$('#LightingStatus').val(data.body[0].status.slice(0,2));
													//读取2.4G冷暖灯色温状态
													var brightness =parseInt(parseInt(data.body[0].status.slice(2,4),16)*6.6);
													//读取2.4G冷暖灯色温状态
													var colorTemperature=parseInt(parseInt(data.body[0].status.slice(4,6),16)/1.27);
													//赋值亮度色温
													$("#BrightnessStatus").val(data.body[0].status.slice(2,4));
													$("#ColorTemperatureStatus").val(data.body[0].status.slice(4,6));

													$('#Brightness').slider(
														'setValue',brightness
													);
													$('#ColorTemperature').slider(
														'setValue',colorTemperature
													);
												}else{
													//赋值亮度色温
													// $("#Brightness").html('<input id="BrightnessStatus" hidden="hidden"  statvalue="07">亮度：<input id="Brightness" value="07" class="easyui-slider" data-options="showTip:false,onChange: function(value){\n' + '\t\t\t\toperateDeviceDlg(61);}" data-options="min:10,max:90,step:1" style="width:300px;" data-brand="20" data-devType="13" data-devSecondType="31">');
													// $("#ColorTemperatureStatus").html('<input id="ColorTemperatureStatus" hidden="hidden"   value="64">色温：<input id="ColorTemperature" value="64" class="easyui-slider"data-options="showTip:false,onChange: function(value){\n' + 'operateDeviceDlg(62);}" data-options="min:10,max:90,step:1" style="width:300px" data-brand="20" data-devType="13" data-devSecondType="31">');
													//
													// $("#BrightnessDiv").css("display","true");
													// $("#ColorTemperatureDiv").css("display","true");
													//
													//
													// $("#BrightnessStatus").val("07");
													// $("#ColorTemperatureStatus").val("64");
													// 赋值亮度色温
													$("#BrightnessStatus").val("07");
													$("#ColorTemperatureStatus").val("64");
													$('#Brightness').slider(
														'setValue','07'
													);
													$('#ColorTemperature').slider(
														'setValue','64'
													);
												}
												$("#BrightnessDiv").show();
												$("#ColorTemperatureDiv").show();
											})
									}
									else {
										$(this).show();
									}
								}
							}


						} else {
							$(this).show();
						}
					}
				}
			});

		// $('#chooseOperateDlg a[data-devSecondType]').each(
		//     function () {
		//         if(typeof ($(this).attr('data-devSecondType'))!="undefined"){
		//             var devSecondTypes=$(this).attr('data-devSecondType').split(',')
		//             var devSecondType=row.devSecondType.toString();
		//             console.log("second="+devSecondTypes);
		//             console.log($.inArray(row.devSecondType.toString(),devSecondTypes));
		//             if($.inArray(devSecondType,devSecondTypes)<0){
		//                 $(this).hide();
		//             }
		//         }
		//     });
		$('#chooseOperateDlg').dialog("open");
	}
}
// 打开操作设备对话框
function operateDeviceDlg(type) {
	var row = $("#deviceInfoTable").datagrid('getSelected');
	$('#operateDeviceDlg').dialog({
		title: '操作设备',
		top: getTop(300),
		left: getLeft(600),
		width: 600,
		height: 300,
		closed: true,
		cache: false,
		modal: true,
		onClose: function () {
			$('#operateDeviceDlg [clear="clear"]').val('');
			// $('#operateDeviceDlg [choose="choose"]').val('');
		}
	});

	switch (type) {
		case 1: // 设置限时密码
			if (row.devBrandId == "1") {
				$("#passwordType").hide();
				$("#passwordTime").show();
			}
			if (row.devBrandId == "2") {
				$("#passwordType").show();
				$("#passwordTime").hide();
			}
			break;
		case 2: // 获取密码列表
			$('#operateDeviceDlg').dialog({
				title: '密码列表 '
			});
			$('#brandAllDeviceDg').datagrid("loadData", []);
			operateDevice(type);
			break;
		case 3: // 清空密码
			$('#operateDeviceDlg').dialog({
				title: '清空密码 '
			});
			if (row.devBrandId == "1") {
				myTips("云猫门锁暂无此功能", "error");
				return;
			}
			operateDevice(type);
			break;
		case 4: // 获取开锁记录
			$('#operateDeviceDlg').dialog({
				title: '密码列表 '
			});
			$('#deviceOpenRecordDg').datagrid("loadData", []);
			break;
		case 5: // 远程开锁
			// 加一个验证登录密码的窗口
			operateDevice(type);
			return;// 加return之后不打开operateDeviceDlg
			break;
		case 6: // 设置随机密码
			break;
		case 7: // 设置自定义密码
			if ($('#limitTimePassword7').val() == 0) {
				var aRandom = parseInt(Math.random() * 100000000);
				$('#limitTimePassword7').val(aRandom);
			} else {
				$('#limitTimePassword7').val();
			}
			break;
		case 10: // 查询读数
			operateDevice(type);
			return;
			break;

		case 11: // 控制水电表断开
			operateDevice(type);
			return;
			break;

		case 12: // 控制水电表闭合
			operateDevice(type);
			return;
			break;

		case 13:// 控制新云海1路灯开
			operateDevice(type);
			return;
			break;

		case 14:// 控制新云海2路灯开
			operateDevice(type);
			return;
			break;

		case 15:// 控制新云海3路灯开
			operateDevice(type);
			return;
			break;

		case 16:// 控制新云海4路灯开
			operateDevice(type);
			return;
			break;

		case 17:// 控制新云海5路灯开
			operateDevice(type);
			return;
			break;

		case 18:// 控制新云海6路灯开
			operateDevice(type);
			return;
			break;

		case 19:// 控制新云海7路灯开
			operateDevice(type);
			return;
			break;

		case 20:// 控制新云海8路灯开
			operateDevice(type);
			return;
			break;

		case 21:// 控制新云海1路灯关
			operateDevice(type);
			return;
			break;

		case 22:// 控制新云海2路灯关
			operateDevice(type);
			return;
			break;

		case 23:// 控制新云海3路灯关
			operateDevice(type);
			return;
			break;

		case 24:// 控制新云海4路灯关
			operateDevice(type);
			return;
			break;

		case 25:// 控制新云海5路灯关
			operateDevice(type);
			return;
			break;

		case 26:// 控制新云海6路灯关
			operateDevice(type);
			return;
			break;

		case 27:// 控制新云海7路灯关
			operateDevice(type);
			return;
			break;

		case 28:// 控制新云海8路灯关
			operateDevice(type);
			return;
			break;
		case 29://控制新云海悠悠电箱1路开
			operateElectricBox(type);
			return;
			break;
		case 30://控制新云海悠悠电箱2路开
			operateElectricBox(type);
			return;
			break;
		case 31://控制新云海悠悠电箱3路开
			operateElectricBox(type);
			return;
			break;
		case 32://控制新云海悠悠电箱4路开
			operateElectricBox(type);
			return;
			break;
		case 33://控制新云海悠悠电箱5路开
			operateElectricBox(type);
			return;
			break;
		case 34://控制新云海悠悠电箱6路开
			operateElectricBox(type);
			return;
			break;
		case 35://控制新云海悠悠电箱7路开
			operateElectricBox(type);
			return;
			break;
		case 36://控制新云海悠悠电箱8路开
			operateElectricBox(type);
			return;
			break;
		case 37://控制新云海悠悠电箱9路开
			operateElectricBox(type);
			return;
			break;
		case 38://控制新云海悠悠电箱10路开
			operateElectricBox(type);
			return;
			break;
		case 39://控制新云海悠悠电箱1路关
			operateElectricBox(type);
			return;
			break;
		case 40://控制新云海悠悠电箱2路关
			operateElectricBox(type);
			return;
			break;
		case 41://控制新云海悠悠电箱3路关
			operateElectricBox(type);
			return;
			break;
		case 42://控制新云海悠悠电箱4路关
			operateElectricBox(type);
			return;
			break;
		case 43://控制新云海悠悠电箱5路关
			operateElectricBox(type);
			return;
			break;
		case 44://控制新云海悠悠电箱6路关
			operateElectricBox(type);
			return;
			break;
		case 45://控制新云海悠悠电箱7路关
			operateElectricBox(type);
			return;
			break;
		case 46://控制新云海悠悠电箱8路关
			operateElectricBox(type);
			return;
			break;
		case 47://控制新云海悠悠电箱9路关
			operateElectricBox(type);
			return;
			break;
		case 48://控制新云海悠悠电箱10路关
			operateElectricBox(type);
			return;
			break;
		case 50:// 控制超仪表开阀
			operateDevice(type);
			return;
			break;
		case 51:// 控制超仪表关阀
			operateDevice(type);
			return;
			break;
		case 52: //添加密码
			break;
		case 53: //清空密码
			operateDevice(type);
			return;
			break;
		case 54: //启用密码
			operateDevice(type);
			return;
			break;
		case 55: //禁用密码
			operateDevice(type);
			return;
			break;
		case 56: //获取开锁记录
			queryDeviceRecordDlg(type);
			return;
			break;
		case 57: //插座通电
			operateDevice(type);
			return;
			break;
		case 58: //插座断电
			operateDevice(type);
			return;
			break;
		case 59: //2.4G冷暖灯通电
			operateDevice(type);
			return;
			break;
		case 60: //2.4G冷暖灯短电
			operateDevice(type);
			return;
			break;
		case 61: //2.4G冷暖灯亮度
			operateDevice(type);
			return;
			break;
		case 62: //2.4G冷暖灯色温
			operateDevice(type);
			return;
			break;
		case 63: //窗帘开
			operateDevice(type);
			return;
			break;
		case 64: //窗帘关
			operateDevice(type);
			return;
			break;
		case 65: //外出布防
			operateDevice(type);
			return;
			break;
		case 66: //在家布防
			operateDevice(type);
			return;
			break;
		case 67: //撤防
			operateDevice(type);
			return;
			break;
	}
	// 打开执行操作设备对话框
	console.log("operateDevice="+type)
	// 打开执行操作设备对话框
	$('#operateDeviceDlg div[operate]').hide();
	$('#operateDevice' + type).show();
	$('#operateDeviceDlg').dialog("open");
}

// 操作设备
function operateDevice(type) {
	var row = $("#deviceInfoTable").datagrid('getSelected');
	//  console.log(row)
	var rowIndex = $("#deviceInfoTable").datagrid('getRowIndex', row);
	var devId = row.id;
	var brandId = row.devBrandId;
	var devFirstType = row.devFirstType;
	var devSecondType = row.devSecondType;
	var devUsername = row.devUsername;
	var devPassword = row.devPassword;
	var devAuthId = row.devAuthId;
	var devAuthSecret = row.devAuthSecret;
	var sn = "";
	var isNeedCache = "";
	var currentOn = "";
	var mac = "";
	var coId =_loginCoId;
	console.log("coId="+coId);
	console.log("devId="+devId);
	var postJson = {
		coId:coId,
		devId: devId,
		brandId: brandId,
		devUsername: devUsername,
		devPassword: devPassword,
		devAuthId: devAuthId,
		devAuthSecret: devAuthSecret,
	};
	switch (type) {
		case 1: // 设置限时密码
			var password = $("#limitTimePassword").val();
			var timeEnd = $("#limitTimeEnd").val();
			var passwordType = $("#limitPasswordType").val();
			if (brandId == 1) {
				postJson = '{';
				postJson += 'instruction:"限时密码",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'userName:"' + devUsername + '",';
				postJson += 'hashedPassword:"' + devPassword + '",';
				postJson += 'devID:"' + devId + '",';
				postJson += 'keyPass:"' + password + '",';
				postJson += 'remark:"' + password + '",';
				postJson += 'timeEnd:"' + timeEnd + '"';
				postJson += '}';
			}
			if (brandId == 2) {
				postJson = '{';
				postJson += 'instruction:"限时密码",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'authId:"' + devAuthId + '",';
				postJson += 'authToken:"' + devAuthSecret + '",';
				postJson += 'deviceId:"' + devId + '",';
				postJson += 'lockPwd:"' + password + '",';
				postJson += 'pwdIndex:"' + passwordType + '"';
				postJson += '}';
			}
			break;
		case 2: // 获取密码列表
			if (brandId == 1) {
				postJson = '{';
				postJson += 'instruction:"查询密码列表",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'userName:"' + devUsername + '",';
				postJson += 'hashedPassword:"' + devPassword + '",';
				postJson += 'devID:"' + devId + '"';
				postJson += '}';
			}
			if (brandId == 2) {
				postJson = '{';
				postJson += 'instruction:"查询密码列表",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'authId:"' + devAuthId + '",';
				postJson += 'authToken:"' + devAuthSecret + '",';
				postJson += 'deviceId:"' + devId + '"';
				postJson += ']';
			}
			break;
		case 3: // 清空密码
			if (brandId == "1") {
				myTips("云猫门锁暂无此功能", "error");
				return;
			}
			if (brandId == 2) {
				postJson = '{';
				postJson += 'instruction:"清空密码",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'authId:"' + devAuthId + '",';
				postJson += 'authToken:"' + devAuthSecret + '",';
				postJson += 'deviceId:"' + devId + '"';
				postJson += '}';
			}
			break;
		case 4: // 获取开锁记录
			if (brandId == 1) {
				var startTime = $("#consoleTimeStart").val();
				postJson = '{';
				postJson += 'instruction:"查询开锁记录",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'userName:"' + devUsername + '",';
				postJson += 'hashedPassword:"' + devPassword + '",';
				postJson += 'startTime:"' + startTime + '",';
				postJson += 'devID:"' + devId + '"';
				postJson += '}';
			}
			if (brandId == 2) {
				var startTime = $("#consoleTimeStart").val();
				postJson = '{';
				postJson += 'instruction:"查询开锁记录",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'authId:"' + devAuthId + '",';
				postJson += 'authToken:"' + devAuthSecret + '",';
				postJson += 'startTime:"' + startTime + '",';
				postJson += 'deviceId:"' + devId + '"';
				postJson += '}';
			}
			break;
		case 5: // 远程开锁
			if (brandId == 2) {
				postJson = '{';
				postJson += 'instruction:"远程开锁",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'authId:"' + devAuthId + '",';
				postJson += 'authToken:"' + devAuthSecret + '",';
				postJson += 'deviceId:"' + devId + '"';
				postJson += '}';
			} else if (brandId == 10 && devFirstType == 3 && devSecondType == 3) {
				if (devId == '') {
					postJson = '{';
					postJson += 'instruction:"远程开锁2",';
					postJson += 'brandId:"' + brandId + '",';
					postJson += 'devAuthId:"' + devAuthId + '",';
					postJson += 'devSpare2:"' + row.devSpare2 + '",';
					postJson += 'devAuthSecret:"' + row.devAuthSecret + '"';
					postJson += '}';
					break;
				} else {
					postJson.instruction = "远程开锁";
					postJson = JSON.stringify(postJson);
				}
			} else if (brandId == 20) {
				if (devFirstType == 3 && (devSecondType == 22 || devSecondType == 24)) {
					postJson.sn = devAuthId;
					postJson.mac = "";
					postJson.isNeedCache = "false";
					postJson.status = "开锁";
					postJson.instruction = "控制设备-门锁";
					postJson.brandId = brandId;
					postJson = JSON.stringify(postJson);
				} else if (devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
					postJson.sn = devAuthId;
					postJson.mac = "";
					postJson.isNeedCache = "false";
					postJson.status = "开锁";
					postJson.instruction = "控制设备-门锁";
					postJson.brandId = brandId;
					postJson = JSON.stringify(postJson);
				}
			}
			break;
		case 6: // 设置随机密码
			var startDate = $('#limitTimeStart6').val();
			var endDate = $('#limitTimeEnd6').val();
			var cardType = $('#limitPasswordType6').val();
			if (startDate == '' || endDate == '' || cardType == '') {
				myTips('信息填写不完整', 'error');
				return;
			}
			if (brandId == 10 && devFirstType == 3 && devSecondType == 3) {
				postJson.instruction = "单临密码";
				postJson.appKey = row.devAuthId;
				postJson.secret = row.devAuthSecret;
				postJson.code = row.devSpare2;
				postJson.startTime = startDate;
				postJson.endTime = endDate;
				postJson.pwdType = cardType;
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 7: // 设置自定义密码
			var startDate = $('#limitTimeStart7').val();
			var endDate = $('#limitTimeEnd7').val();
			var operateType = $('#limitOperateType7').val();
			var password = $('#limitTimePassword7').val();
			var cardType = 2;
			if (startDate == '' || endDate == '' || operateType == ''
				|| password == '') {
				myTips('信息填写不完整', 'error');
				return;
			}
			if (brandId == 10 && devFirstType == 3 && devSecondType == 3) {
				if (devId == '') {
					postJson.instruction = "添加门锁密码";
					postJson.mobile = row.devUsername;
					postJson.password = row.devPassword;
					postJson.app_key = row.devAuthId;
					postJson.secret = row.devAuthSecret;
					postJson.pwdType = operateType;
					postJson.pwd = password;
					postJson.startTime = startDate;
					postJson.endTime = endDate;
					postJson.code = row.devSpare2;
					postJson = JSON.stringify(postJson);
				} else {
					postJson.instruction = "自定义密码";
					postJson.operateType = operateType;
					postJson.cardType = cardType;
					postJson.password = password;
					postJson.startDate = startDate;
					postJson.endDate = endDate;
					postJson = JSON.stringify(postJson);
				}
			}
			break;
		case 10: // 获取读数
			if (brandId == 3) {
				postJson = '{';
				postJson += 'instruction:"查询电表读数",';
				postJson += 'brandId:"' + brandId + '",';
				postJson += 'authId:"' + devAuthId + '",';
				postJson += 'authToken:"' + devAuthSecret + '",';
				postJson += 'deviceId:"' + devId + '"';
				postJson += '}';
			}
			if (brandId == 12 && devFirstType == 15 && devSecondType == 15) {
				postJson.instruction = "查询电表详情";
				postJson.code = row.devSpare2;
				postJson.app_key = row.devAuthId;
				postJson.secret = row.devAuthSecret;
				postJson = JSON.stringify(postJson);
			}
			if (brandId == 13 && devFirstType == 14 && devSecondType == 14) {
				postJson.instruction = "查询水表详情";
				postJson.code = row.devSpare2;
				postJson.app_key = row.devAuthId;
				postJson.secret = row.devAuthSecret;
				postJson = JSON.stringify(postJson);
			}
			if (brandId == 20 && row.devType == "智能云配电系统") {
				postJson.instruction = "查询设备详情";
				postJson.sns = row.devAuthId;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 11: // 水电表断开
			if (brandId == 12 && devFirstType==15 && devSecondType==15) {
				postJson.instruction = "控制电表";
				postJson.state = 1;
				postJson.code = row.devSpare2;
				postJson.app_key = row.devAuthId;
				postJson.secret = row.devAuthSecret;
				postJson = JSON.stringify(postJson);
			}
			if (brandId == 13 && devFirstType == 14 && devSecondType == 14) {
				postJson.instruction = "控制水表";
				postJson.state = 1;
				postJson.code = row.devSpare2;
				postJson.app_key = row.devAuthId;
				postJson.secret = row.devAuthSecret;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 12: // 水电表闭合
			if (brandId == 12 && devFirstType==15 && devSecondType==15) {
				postJson.instruction = "控制电表";
				postJson.state = 2;
				postJson.code = row.devSpare2;
				postJson.app_key = row.devAuthId;
				postJson.secret = row.devAuthSecret;
				postJson = JSON.stringify(postJson);
			}
			if (brandId == 13 && devFirstType == 14 && devSecondType == 14) {
				postJson.instruction = "控制水表";
				postJson.state = 2;
				postJson.code = row.devSpare2;
				postJson.app_key = row.devAuthId;
				postJson.secret = row.devAuthSecret;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 13://控制新云海1路灯开
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 0;
				currentOn = "true";
			}
			break;

		case 14://控制新云海2路灯开
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 1;
				currentOn = "true";
			}
			break;

		case 15://控制新云海3路灯开
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 2;
				currentOn = "true";
			}
			break;

		case 16://控制新云海4路灯开
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 3;
				currentOn = "true";
			}
			break;

		case 17://控制新云海5路灯开
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 4;
				currentOn = "true";
			}
			break;

		case 18://控制新云海6路灯开
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 5;
				currentOn = "true";
			}
			break;

		case 19://控制新云海7路灯开
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 6;
				currentOn = "true";
			}
			break;

		case 20://控制新云海8路灯开
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 7;
				currentOn = "true";
			}
			break;
		case 21://控制新云海1路灯关
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 0;
				currentOn = "false";
			}
			break;

		case 22://控制新云海2路灯关
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 1;
				currentOn = "false";
			}
			break;

		case 23://控制新云海3路灯关
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 2;
				currentOn = "false";
			}
			break;

		case 24://控制新云海4路灯关
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 3;
				currentOn = "false";
			}
			break;

		case 25://控制新云海5路灯关
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 4;
				currentOn = "false";
			}
			break;

		case 26://控制新云海6路灯关
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 5;
				currentOn = "false";
			}
			break;

		case 27://控制新云海7路灯关
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 6;
				currentOn = "false";
			}
			break;

		case 28://控制新云海8路灯关
			if (brandId == 20) {
				brandId = brandId;
				sn = devAuthId;
				isNeedCache = "false";
				mac = (row.devAuthSecret != null && row.devAuthSecret != '' && row.devAuthSecret.length == 14) ? row.devAuthSecret.substring(2, row.devAuthSecret.length) : '';
				currentRoad = 7;
				currentOn = "false";
			}
			break;

		case 50://控制超仪表开阀
			if (brandId == 21) {
				action = 1;
				meterNo = devAuthId;
			}
			break;

		case 51://控制超仪表关阀
			if (brandId == 21) {
				action = 0;
				meterNo = devAuthId;
			}
			break;

		case 52://添加密码
			if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
				var psw = $('#password52').val();
				psw = psw.split('');
				var psw2 = '';
				for (var i = 0; i < psw.length; i++) {
					psw[i] = Number(psw[i]) + 30;
					psw2 += psw[i];
				}
				postJson.sn = devAuthId;
				postJson.mac = "";
				if (devSecondType == 23){
					postJson.isNeedCache = "true";
				}else if (devSecondType == 40){
					postJson.isNeedCache = "false";
				}
				postJson.password=psw2;
				postJson.status = "用户密码注册" ;
				postJson.instruction = "控制设备-门锁";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			} else {
				myTips('该门锁暂不支持密码功能', 'error');
				return;
			}
			break;
		case 53://清空密码
			if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
				postJson.sn = devAuthId;
				postJson.mac = "";
				if (devSecondType == 23){
					postJson.isNeedCache = "true";
				}else if (devSecondType == 40){
					postJson.isNeedCache = "false";
				}
				postJson.status = "注销所有用户密码";
				postJson.instruction = "控制设备-门锁";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			} else {
				myTips('该门锁暂不支持密码功能', 'error');
				return;
			}
			break;
		case 54://启用密码
			if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
				postJson.sn = devAuthId;
				postJson.mac = "";
				if (devSecondType == 23){
					postJson.isNeedCache = "true";
				}else if (devSecondType == 40){
					postJson.isNeedCache = "false";
				}
				postJson.status = "启用本地用户密码";
				postJson.instruction = "控制设备-门锁";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			} else {
				myTips('该门锁暂不支持密码功能', 'error');
				return;
			}
			break;
		case 55://禁用密码
			if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
				postJson.sn = devAuthId;
				postJson.mac = "";
				if (devSecondType == 23){
					postJson.isNeedCache = "true";
				}else if (devSecondType == 40){
					postJson.isNeedCache = "false";
				}
				postJson.status = "禁用本地用户密码";
				postJson.instruction = "控制设备-门锁";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			} else {
				myTips('该门锁暂不支持密码功能', 'error');
				return;
			}
			break;
		case 57://插座通电
			if (brandId == 20 && devFirstType == 2 && devSecondType == 25) {
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.status = "开";
				postJson.instruction = "控制设备-插座";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 58://插座断电
			if (brandId == 20 && devFirstType == 2 && devSecondType == 25) {
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.status = "关";
				postJson.instruction = "控制设备-插座";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			break;

		case 59://2.4G冷暖灯开灯
			if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
				var BrightnessStatus=$("#BrightnessStatus").val();
				var ColorTemperatureStatus=$("#ColorTemperatureStatus").val();
				// status="80"+BrightnessStatus+ColorTemperatureStatus+"07";
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.brightness=BrightnessStatus;
				postJson.color=ColorTemperatureStatus;
				postJson.model="07";
				postJson.status = "开灯";
				postJson.instruction = "控制设备-冷暖灯";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			$("#LightingStatus").val("80");
			break;
		case 60://2.4G冷暖灯关灯
			if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
				var BrightnessStatus=$("#BrightnessStatus").val();
				var ColorTemperatureStatus=$("#ColorTemperatureStatus").val();
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.brightness=BrightnessStatus;
				postJson.color=ColorTemperatureStatus;
				postJson.model="07";
				postJson.status = "关灯";
				postJson.instruction = "控制设备-冷暖灯";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			$("#LightingStatus").val("00");
			break;
		case 61://2.4G冷暖灯亮度
			var Brightness=$("#Brightness").val();
			console.log(Brightness)
			Brightness=parseInt(Brightness/6.6);
			if (Brightness<10){
				Brightness="0"+Brightness;
			}
			if (Brightness==0){
				Brightness="0"+1;
			}
			var LightingStatus=$("#LightingStatus").val();
			var ColorTemperatureStatus=$("#ColorTemperatureStatus").val();
			var status="";
			if (LightingStatus==80){
				if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
					// status="80"+Brightness+ColorTemperatureStatus+"07";
					postJson.sn = devAuthId;
					postJson.mac = devAuthSecret;
					postJson.isNeedCache = "false";
					postJson.brightness=Brightness;
					postJson.color=ColorTemperatureStatus;
					postJson.model="07";
					postJson.status = "开灯";
					postJson.instruction = "控制设备-冷暖灯";
					postJson.brandId = brandId;
					postJson = JSON.stringify(postJson);
				}
			}else{
				if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
					// status="00"+Brightness+ColorTemperatureStatus+"07";
					postJson.sn = devAuthId;
					postJson.mac = devAuthSecret;
					postJson.isNeedCache = "false";
					postJson.brightness=Brightness;
					postJson.color=ColorTemperatureStatus;
					postJson.model="07";
					postJson.status = "关灯";
					postJson.instruction = "控制设备-冷暖灯";
					postJson.brandId = brandId;
					postJson = JSON.stringify(postJson);
				}
			}
			$("#BrightnessStatus").val(Brightness);
			break;
		case 62://2.4G冷暖灯色温
			//当前亮度
			var BrightnessStatus=$("#BrightnessStatus").val();
			//改变色温的值
			var ColorTemperature=$("#ColorTemperature").val();
			console.log("111"+ColorTemperature);
			ColorTemperature=parseInt(ColorTemperature*1.27).toString(16)
			if (ColorTemperature<10){
				ColorTemperature="0"+ColorTemperature;
			}
			if (ColorTemperature==0){
				ColorTemperature="01";
			}
			//灯光当前开关状态
			var LightingStatus=$("#LightingStatus").val();

			var status="";
			if (LightingStatus==80){
				if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
					// status="80"+BrightnessStatus+ColorTemperature+"07";
					postJson.sn = devAuthId;
					postJson.mac = devAuthSecret;
					postJson.isNeedCache = "false";
					postJson.brightness=BrightnessStatus;
					postJson.color=ColorTemperature;
					postJson.model="07";
					postJson.status = "开灯";
					postJson.instruction = "控制设备-冷暖灯";
					postJson.brandId = brandId;
					postJson = JSON.stringify(postJson);
				}
			}else{
				if (brandId == 20 && devFirstType == 23 && devSecondType == 31) {
					// status="00"+BrightnessStatus+ColorTemperature+"07";
					postJson.sn = devAuthId;
					postJson.mac = devAuthSecret;
					postJson.isNeedCache = "false";
					postJson.brightness=BrightnessStatus;
					postJson.color=ColorTemperature;
					postJson.model="07";
					postJson.status = "关灯";
					postJson.instruction = "控制设备-冷暖灯";
					postJson.brandId = brandId;
					postJson = JSON.stringify(postJson);
				}
			}
			$("#ColorTemperatureStatus").val(ColorTemperature);
			break;
		case 63://开窗帘
			if (brandId == 20 && devFirstType == 6 && devSecondType == 6) {
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.status = "开";
				postJson.instruction = "控制设备-窗帘";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 64://关窗帘
			if (brandId == 20 && devFirstType == 6 && devSecondType == 6) {
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.status = "关";
				postJson.instruction = "控制设备-窗帘";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 65://外出布防
			if (brandId == 20 && devFirstType == 8 && devSecondType == 8) {
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.status = "外出布防";
				postJson.instruction = "控制设备-安防网关";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 66://在家布防
			if (brandId == 20 && devFirstType == 8 && devSecondType == 8) {
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.status = "在家布防";
				postJson.instruction = "控制设备-安防网关";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			break;
		case 67://撤防
			if (brandId == 20 && devFirstType == 8 && devSecondType == 8) {
				postJson.sn = devAuthId;
				postJson.mac = devAuthSecret;
				postJson.isNeedCache = "false";
				postJson.status = "撤防";
				postJson.instruction = "控制设备-安防网关";
				postJson.brandId = brandId;
				postJson = JSON.stringify(postJson);
			}
			break;
	}
	showLoading();

	var array = new Array(100);
	var n = 0;
	for (var m = 13; m < 29; m++) {
		array[m] = true;
	}

	if (array[type] == true) {
		$.post('http://www.fangzhizun.com/device/vanhi/RoadControl', {
			brandId: brandId,
			sn: sn,
			isNeedCache: isNeedCache,
			mac: mac,
			currentRoad: currentRoad,
			currentOn: currentOn
		}, function (data) {
			hideLoading();
			if (data.code < 0) {
				myTips(data.msg, "error");
				return;
			}
			switch (type) {
				case 13: // 1路灯开
					myTips(data.msg, "success");
					break;

				case 14: // 2路灯开
					myTips(data.msg, "success");
					break;

				case 15: // 3路灯开
					myTips(data.msg, "success");
					break;

				case 16: // 4路灯开
					myTips(data.msg, "success");
					break;

				case 17: // 5路灯开
					myTips(data.msg, "success");
					break;

				case 18: // 6路灯开
					myTips(data.msg, "success");
					break;

				case 19: // 7路灯开
					myTips(data.msg, "success");
					break;

				case 20: // 8路灯开
					myTips(data.msg, "success");
					break;

				case 21: // 1路灯关
					myTips(data.msg, "success");
					break;

				case 22: // 2路灯关
					myTips(data.msg, "success");
					break;

				case 23: // 3路灯关
					myTips(data.msg, "success");
					break;

				case 24: // 4路灯关
					myTips(data.msg, "success");
					break;

				case 25: // 5路灯关
					myTips(data.msg, "success");
					break;

				case 26: // 6路灯关
					myTips(data.msg, "success");
					break;

				case 27: // 7路灯关
					myTips(data.msg, "success");
					break;

				case 28: // 8路灯关
					myTips(data.msg, "success");
					break;
			}
		});

	} else {
		if (type == 50) {
			$.post('http://www.fangzhizun.com/device/joy/ControlDeviceValve', {
				meterNo: row.devAuthId,
				action: 1
			}, function (data) {
				hideLoading();
				if (data.status == 1) {
					myTips(data.msg, "success");
					$('#chooseOperateDlg').dialog("close");
					return;
				} else {
					myTips(data.body[0].resultMsg, "error");
				}
			})

		} else if (type == 51) {
			$.post('http://www.fangzhizun.com/device/joy/ControlDeviceValve', {
				/*brandId: brandId,
                instruction: "控制设备阀",*/
				meterNo: row.devAuthId,
				action: 0
			}, function (data) {
				hideLoading();
				if (data.status == 1) {
					myTips(data.msg, "success");
					$('#chooseOperateDlg').dialog("close");
					return;
				} else {
					myTips(data.body[0].resultMsg, "error");
				}
			})
		} else {
			$.post("../doDevicConsoleAll.action",
				{
					postJson: postJson,
				},
				function (data) {
					hideLoading();
					if (data.code < 0) {
						myTips(data.msg, "error");
						return;
					}

					if (data.code == 0 && (data.body[0].code == 0 || data.body[0].resultCode == 0 || data.body[0].resultCode == 128)) {
						if (type != 61 && type != 62) {
							// myTips(data.msg, "success");
						}
						// return;
					} else {
						myTips(data.body[0].resultMsg, "error");
					}
					switch (type) {
						case 1: // 设置限时密码
							myTips(data.msg, "success");
							setTimeout(function () {
								$('#operateDeviceDlg').dialog("close");
							}, 2000);
							break;
						case 2: // 获取密码列表
							$('#brandAllDeviceDg').datagrid("loadData",
								data.body.keys);
							break;
						case 3: // 清空密码
							myTips(data.msg, "success");
							setTimeout(function () {
								$('#operateDeviceDlg').dialog("close");
							}, 2000);
							break;
						case 4: // 获取开锁记录
							$('#brandAllDeviceDg').datagrid("loadData",
								data.body.records);
							break;
						case 5: // 远程开锁
							break;
						case 6: // 设置随机密码
							// console.log(data.body);
							// myTips(data.body,"success");
							$.messager.alert('消息',
								"<span style='font-size:18px;'>密码："
								+ data.body + '</span>',
								'info');
							setTimeout(function () {
								$('#operateDeviceDlg').dialog("close");
							}, 2000);
							break;
						case 7: // 设置自定义密码
							// console.log(data.body);
							myTips(data.msg, "success");
							setTimeout(function () {
								$('#operateDeviceDlg').dialog("close");
							}, 2000);
							break;
						case 10: // 查询水单表详情
							// console.log('这里是水表'+data.body.data.reading);
							// console.log('这里是电表'+data.body.data.currentNumber);
							if (data.body.data.reading != ''
								&& data.body.data.reading != undefined) {
								// console.log(123);
								$.messager
									.alert(
										"查询水表读数",
										row.devFirstType
										+ "读数为："
										+ data.body.data.reading,
										'info');
							} else if (data.body.data.currentNumber != ''
								&& data.body.data.currentNumber != undefined) {
								// console.log(234);
								$.messager
									.alert(
										"查询电表读数",
										row.devFirstType
										+ "当前读数为："
										+ data.body.data.currentNumber
										+ "<br>电压："
										+ data.body.data.voltage
										+ "<br>电流："
										+ data.body.data.intensity
										+ '<br><div style="margin-left: 42px;">功率：'
										+ data.body.data.power
										+ '</div>',
										'info');
							} else if (data.code == 0
								&& data.data != null) {
								var arr = JSON.parse(data.data);
								var status = arr[0].status;
								var reading = status.substring(8, 16);
								reading = parseInt(reading, 16);
								$.messager.alert("查询电表读数",
									row.devFirstType + "读数为："
									+ reading * 0.01,
									'info');
							} else if (data.body.data.currentNumber != ''
								&& data.body.data.currentNumber != undefined) {
								// console.log(234);
								$.messager
									.alert(
										"查询电表读数",
										row.devFirstType
										+ "当前读数为："
										+ data.body.data.currentNumber
										+ "<br>电压："
										+ data.body.data.voltage
										+ "<br>电流："
										+ data.body.data.intensity
										+ '<br><div style="margin-left: 42px;">功率：'
										+ data.body.data.power
										+ '</div>',
										'info');
							} else if (data.code == 0
								&& data.data != null) {
								var arr = JSON.parse(data.data);
								var status = arr[0].status;
								var reading = status.substring(8, 16);
								reading = parseInt(reading, 16);
								$.messager.alert("查询电表读数",
									row.devFirstType + "读数为："
									+ reading * 0.01,
									'info');
							}
							break;

						case 11: // 控制水电表断开
							// $.messager.alert("",
							// row.devFirstType+"读数为："+data.body.meterNum,
							// 'info');
							myTips(data.msg, "success");
							break;

						case 12: // 控制水电表闭合
							// $.messager.alert("查询读数",
							// row.devFirstType+"读数为："+data.body.meterNum,
							// 'info');
							myTips(data.msg, "success");
							break;
						default:
							myTips(data.msg, "success");
							setTimeout(function () {
								$('#operateDeviceDlg').dialog("close");
							}, 2000);
					}
				});
		}
		return;
	}
}

//点击绑定设备(办公区)
function bindDevice_office(){
	$("#bindDeviceDlg").dialog({
		title : '绑定设备',
		top : getTop(530),
		left : getLeft(900),
		width : 900,
		height : 530,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#bindDeviceDlg [clear="clear"]').val('');
			$('#bindDeviceDlg [choose="choose"]').val('');
		}
	});
	$('#deviceListTable').datagrid({
		columns : [ [
		{
			field : 'brandName',
			title : '设备品牌',
			width : 20,
			align : 'center'
		},
		{
			field : 'brandType',
			title : '设备类型',
			width : 10,
			align : 'center'
		},
		{
			field : 'brandModel',
			title : '设备型号',
			width : 20,
			align : 'center'
		},
		{
			field : 'devNickname',
			title : '设备名称',
			width : 30,
			align : 'center'
		},
		{
			field : 'do',
			title : '添加',
			width : 10,
			align : 'center',
			formatter : function(value, row, index) {
				return "<a href='#' style='color:blue' onclick=\"addOneToNeedToDevice("+ index +")\" >添加</a>";
			}
		} ] ],
		width : '100%',
		height : '152px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
	});
	$('#bindDeviceTable').datagrid({
		columns : [ [
		{
			field : 'brandName',
			title : '设备品牌',
			width : 20,
			align : 'center'
		},
		{
			field : 'brandType',
			title : '设备类型',
			width : 10,
			align : 'center'
		},
		{
			field : 'brandModel',
			title : '设备型号',
			width : 20,
			align : 'center'
		},
		{
			field : 'devNickname',
			title : '设备名称',
			width : 30,
			align : 'center'
		},
		{
			field : 'do',
			title : '删除',
			width : 10,
			align : 'center',
			formatter : function(value, row, index) {
				return "<a href='#' style='color:red' onclick=\"myDeleteRows('"+row.id+"','id','bindDeviceTable','0')\">删除</a>";
			}
		} ] ],
		width : '100%',
		height : '152px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
	});
	$("#bindDeviceTable").datagrid("loadData", []);
	$("#bindDeviceDlg").dialog('open');
	queryDeviceList(1);
}
//导入全部设备信息
function queryDeviceList(page) {
	var pageSize = 5;
	var startPage = (parseInt(page) - 1) * pageSize;
	var devBrandId = $('#searchBrandGetBrandId').val();
	var devNickname = $('#searchDevNickname').val();

	$.post("../queryDevice.action", {
		startNum: startPage,
		endNum: pageSize,
		devBrandId: devBrandId,
		devNickname: devNickname,
		splitFlag: 1
	}, function(data) {
		if (data.code < 0) {
			$('#deviceListTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryDeviceList","deviceListTable");
			}else{
				notCountPage(page, 0 ,"queryDeviceList","deviceListTable");
			}
		} else {
			data=data.body;
			if(data.length<pageSize){
				notCountPage(page, 2 , "queryDeviceList","deviceListTable");
			}else{
				notCountPage(page, 1 , "queryDeviceList","deviceListTable");
			}
			$("#deviceListTable").datagrid("loadData", data);
		}
	});
}
//添加一个设备到需要绑定的未租房里
function addOneToNeedToDevice(index){
	var row = $('#deviceListTable').datagrid('getData').rows[index];
	var rows = $('#bindDeviceTable').datagrid('getRows');
	var rows2 = $('#deviceInfoTable').datagrid('getRows');
	for (var i in rows) {
		if (rows[i].id == row.id ) {
			myTips('此设备已经添加到下方列表！','error');
			return;
		}
	}
	for (var i in rows2) {
		if (rows2[i].id == row.id) {
			myTips('该设备已在该房内，无需绑定！','error');
			return;
		}
	}
	$('#bindDeviceTable').datagrid('insertRow', {
		index : 0,
		row : row
	});
}


//执行绑定设备
function doBindDevice(){
	var row = $("#virtualDataGrid").datagrid("getSelected");
	var rows = $("#bindDeviceTable").datagrid('getRows');
	if (rows.length == 0) {
		myTips('请先将待绑定的设备添加到下方列表！', 'error');
		return;
	}
	var jhdDeviceIdJson = [];
	for (var i in rows) {
		jhdDeviceIdJson.push({
			jhdHsId 			: row.hsId,
			jhdDeviceId 		: rows[i].id,
			jhdSubDeviceNumber	: rows[i].jhdSubDeviceNumber
		});
	}
	showLoading();
	$.post('../insertHsDevice.action', {
		jhdDeviceIdJson	: JSON.stringify(jhdDeviceIdJson),
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '绑定失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#bindDeviceDlg').dialog('close');
			myTips('绑定成功！', 'success');
			queryOfficeInfo();
			//调用queryDeviceInfo()因异步查询得不到想要的结果，使用替代方案更新表格数据
			for (var i in rows) {
				$('#deviceInfoTable').datagrid('insertRow', {
					row : rows[i]
				});
			}
		}
	});
}
//分页统计总条数
function getdeviceListTablePageCount(page){
	var pageSize = 5;
	var devBrandId = $('#searchBrandGetBrandId').val();
	var devNickname = $('#searchDevNickname').val();

	$.post("../queryDevice.action", {
		devBrandId: devBrandId,
		devNickname: devNickname,
		splitFlag: 0,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"deviceListTable",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"deviceListTable",0);
		}
	});
}
//从本房源中移除此设备
function removeHsDevice(){
	var row = $("#deviceInfoTable").datagrid('getSelected');
	var rowIndex = $("#deviceInfoTable").datagrid('getRowIndex', row);
	$('#deviceInfoTable').datagrid('deleteRow', rowIndex);
	var hs = $('#virtualDataGrid').datagrid('getSelected');
	var devices = $('#deviceInfoTable').datagrid('getRows');
	var hsDeviceJson = [];
	for (var i in devices) {
		hsDeviceJson.push(devices[i].id);
	}
	$.post("../updateHouseForStore.action", {
		hsId			: hs.hsId,
		hsDeviceJson	: hsDeviceJson.join(','),
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, "error");
			$('#deviceInfoTable').datagrid('insertRow', {index: rowIndex, row: row});
		} else {
			myTips("移除成功", "success");
			queryOfficeInfo();
			$('#chooseOperateDlg').dialog("close");
		}
	});
}

function queryDeviceRecordDlg(type) {
	$('#queryDeviceRecordDlg').dialog({
		title: '开锁记录',
		top: getTop(240),
		left: getLeft(540),
		width: 640,
		height: 340,
		closed: true,
		cache: false,
		modal: true,
		onClose: function () {
			var data = [];
			$('#queryDeviceRecordTable').datagrid("loadData",data)
		}
	});
	queryDeviceRecord(1,0);
	$('#queryDeviceRecordDlg').dialog("open");
}

//获取开锁记录
function queryDeviceRecord(page,type) {
	var row = $("#deviceInfoTable").datagrid("getSelected");
	console.log(row)
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	$.post("../queryDeviceRecord.action",{
		startNum        : startNum,
		endNum          : endNum,
		jglrBrandId     : row.devBrandId,
		jglrSn          : row.devAuthId
	},function (data) {
		if (data.code < 0) {
			sourcePage(0, 0, 13);
			$('#queryDeviceRecordTable').datagrid({
				data: [],
				view: myview,
				emptyMsg: data.msg
			});
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 13);
			}
			for (var i = 0; i < data.length; i++) {
				data[i].jglrBrand = data[i].jglrBrandId == 20 ? '云海物联' : '';
			}
			$("#queryDeviceRecordTable").datagrid("loadData", data);
		}
	})
}

//电箱详情
function subDevice() {
	$('#subDeviceDlg').dialog({
		title: '电箱控制',
		top: getTop(150),
		left: getLeft(600),
		width: 600,
		height: 150,
		closed: true,
		cache: false,
		modal: true,
		onClose: function () {
			$("#subDeviceDlg [require='require']").each(function () {
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#subDeviceDlg .btn").each(function () {
				$(this).removeAttr('disabled');
			});
		}
	});
	queryElectricBoxStatus();
	$('#subDeviceDlg').dialog("open")
}

//获取电箱状态
function queryElectricBoxStatus() {
	var row = $("#deviceInfoTable").datagrid("getSelected");
	var devRoad = row.devRoad;
	var type1 = devRoad == 1 ? 29 : devRoad == 2 ? 30 : devRoad == 3 ? 31 : devRoad == 4 ? 32 : devRoad == 5 ? 33 : devRoad == 6 ? 34 : devRoad == 7 ? 35 : devRoad == 8 ? 36 : 37;
	var type2 = devRoad == 1 ? 39 : devRoad == 2 ? 40 : devRoad == 3 ? 41 : devRoad == 4 ? 42 : devRoad == 5 ? 43 : devRoad == 6 ? 44 : devRoad == 7 ? 45 : devRoad == 8 ? 46 : 47;
	$("#open").attr("onclick", "operateDeviceDlg(" + type1 + ")");
	$("#off").attr("onclick", "operateDeviceDlg(" + type2 + ")");
	var index = $("#deviceInfoTable").datagrid("getRowIndex", row);
	$.post("../queryDeviceStatus.action", {
		devAuthId: row.devAuthId,
		devId: row.id
	}, function (data) {
		if (data.code == 1) {
			if (data.body[0].online) {
				var subDevice = parseInt(data.body[0].status.slice(4, 6));
				if (subDevice > 0) {
					//状态码
					var status = data.body[0].status.slice(6);
					row.subStatus = status;
					row.len = subDevice;
					var devStatus = '';
					var h = (devRoad - 1) * 10;
					var num = 0.001 * parseInt(status.substring(h + 6, h + 10));
					if (num || num >= 0) {
						$("#electricQuantity").html("用电量：" + (Math.round(num * 1000) / 1000) + "kwh");
					}
					var subStatus = parseInt(status.slice(h, h + 2), 16).toString(2).slice(1, 2);
					if (subStatus == 1) {
						$("#open").removeClass('btn-default');
						$("#open").addClass('btn-success');
						$("#off").removeClass('btn-success');
						$("#off").addClass('btn-default');
					} else if (subStatus == 0) {
						$("#off").removeClass('btn-default');
						$("#off").addClass('btn-success');
						$("#open").removeClass('btn-success');
						$("#open").addClass('btn-default');
					}
					var rowData = {
						index: index,
						row: row
					}
					$("#deviceInfoTable").datagrid("updateRow", rowData);

				}
			} else {//设备不在线
				$("#electricQuantity").html('<span style="color: red;font-size: 18px">设备不在线！</span>');
			}
		} else {
			$("#electricQuantity").html('<span style="color: red;font-size: 18px">获取不到设备状态！</span>');
		}
	});
}

function operateElectricBox(type) {
	var row = $("#deviceInfoTable").datagrid('getSelected');
	var zz = {};
	zz.coId = _loginCoId;
	zz.devId = row.id;
	zz.brandId = row.devBrandId;
	zz.instruction = "控制设备-电箱";
	zz.number = row.devRoad;
	var status = '';
	$.post("../queryDeviceStatus.action", {
		devAuthId: row.devAuthId,
		devId: row.id
	}, function (data) {
		if (data.code == 1) {
			if (data.body[0].online) {
			} else {//设备不在线
				myTips("设备不在线！", "error");
				return;
			}
		} else {
			myTips("获取不到设备状态！", "error");
			return;
		}
	});

	if (29 <= type && type < 39){
		$.messager.confirm('确认框','在进行通电前请确保电路正常，没人在进行电路维修，是否继续通电操作？',function(r){
			if (r){
				status = '开';
				$("#open").removeClass('btn-default');
				$("#open").addClass('btn-success');
				$("#off").removeClass('btn-success');
				$("#off").addClass('btn-default');
				zz.status = status;
				$.post('http://www.fangzhizun.com/device/api', zz, function (data) {
					if (data.code == 0 && data.body[0].resultCode == 0) {
						myTips(data.body[0].resultMsg, 'success');
					} else {
						myTips(data.msg, 'error');
					}
				});
			}
		});
	} else if (39 <= type && type < 49){
		$.messager.confirm('确认框','在断电前请确认没人在使用电器，否则可能会造成一定的影响，是否继续断电操作？',function(r){
			if (r){
				status = '关';
				$("#open").removeClass('btn-success');
				$("#open").addClass('btn-default');
				$("#off").removeClass('btn-default');
				$("#off").addClass('btn-success');
				zz.status = status;
				$.post('http://www.fangzhizun.com/device/api', zz, function (data) {
					if (data.code == 0 && data.body[0].resultCode == 0) {
						myTips(data.body[0].resultMsg, 'success');
					} else {
						myTips(data.msg, 'error');
					}
				});
			}
		});
	}
}

//获取曼顿电箱
function queryDeviceDlg() {
	$("#queryDeviceDlg").dialog({
		title: '选择设备',
		top: getTop(460),
		left: getLeft(650),
		width: 650,
		height: 460,
		closed: true,
		cache: false,
		modal: true,
		onClose: function () {
		}
	});
	queryDevice();
	$("#queryDeviceDlg").dialog("open");
}

function queryDevice() {
	console.log(_loginCompany)
	$.post('http://www.fangzhizun.com/device/mandun/MDRequestProject', {}, function (data) {
		if (data.code < 0) {
			$.messager.alert('通知', '获取项目失败！原因：' + data.msg, 'error');
			return;
		} else {
			data = data.body;
			console.log(data)
			var projectCode = "";
			for (var i in data) {
				var index = data[i].projectName.indexOf("/");
				var str = data[i].projectName.substring(index + 1);
				if (str == _loginCompany) {
					projectCode = data[i].projectCode;
					$("#projectCode").val(projectCode);
				}
			}
			$.post('http://www.fangzhizun.com/device/mandun/MDRequestProjectElectricBox', {
				projectCode: projectCode
			}, function (data2) {
				if (data2.code < 0) {
					$.messager.alert('通知', '获取项目失败！原因：' + data.msg, 'error');
					return;
				}
				data2 = data2.body;
				$('#queryDeviceTable').datagrid("loadData", data2)
			});
		}
	});
}

function mdElectricBoxDlg() {
	$('#mdElectricBoxDlg').dialog({
		title: '电箱控制',
		top: getTop(150),
		left: getLeft(600),
		width: 600,
		height: 150,
		closed: true,
		cache: false,
		modal: true,
		onClose: function () {
			$("#mdElectricBoxDlg [require='require']").each(function () {
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#mdElectricBoxDlg .btn").each(function () {
				$(this).removeAttr('disabled');
			});
			$("#mdElectricQuantity").html("")
		}
	});
	MDRequestElectricBoxStatus();
	$('#mdElectricBoxDlg').dialog("open")
}
/*人脸*/
function faceControl(){
	$('#faceControl').dialog({
		title : '人脸控制',
		top:getTop(150),
		left:getLeft(600),
		width:600,
		height:200,
		colsed:true,
		cache:false,
		modal:true,
		onClose:function(){

		}
	});
	$('#faceControl').dialog("open");
}
function tenantAuthorization(){
	var row = $("#deviceInfoTable").datagrid('getSelected');
	console.log(row);
	$('#tenantAuthorization').dialog({
		title : '租客授权',
		top:getTop(150),
		left:getLeft(600),
		width:700,
		height:420,
		colsed:true,
		cache:false,
		modal:true,
		onClose:function(){
			$('#tenantAuthorizationTable').datagrid("loadData", []);
			$("#roomNumberId").val();
			$("#tenantId").val();
		}
	});
	seldectTenant(1, 1);
	$('#tenantAuthorization').dialog('open');
}
function seldectTenant(page,type){
	var row = $("#deviceInfoTable").datagrid('getSelected');
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var roomNumberId = $("#roomNumberId").val();
	var tenantId = $("#tenantId").val();
	$.post('../selecttenantAuthorization.action',{
		startNum: startNum,
		endNum: endNum,
		jhoDeviceId : row.id,
		renterPopName	:tenantId,
		hrAddDoorplateno :roomNumberId
	},function(data){
		if(data.code>0){
			data = data.body;
			console.log(data);
			if (page == 1 && type == 1) {
				sourcePage2(data[0].totalNum, page, 1);
			}
			for(var i in data){
				data[i].detailedAddress = data[i].hrAddCommunity + " " + data[i].hrAddBuilding + " " + data[i].hrAddDoorplateno;
				if(data[i].ifpPopId == ''){
					data[i].ifpPopId = "添加授权";
				}else{
					data[i].ifpPopId = "修改授权";
				}
			}
			$('#tenantAuthorizationTable').datagrid("loadData", data);
		}else{
			sourcePage2(0, 0, 1);
		}
		console.log(data)
	});
}
function formatAddPower(value, row, index) {
	if (row.ifpPopId == '添加授权') {
		return "<a href='#' style='text-decoration:none;color:red;' onclick='addJurisdiction(" + index + ","+1+")'>" + "添加授权" + "<a>";
	} else {
		return "<a href='#' style='text-decoration:none;color:green;' onclick='addJurisdiction(" + index + ","+2+")'>" + "修改授权" + "<a>";
	}
}
var _rowIndex ='';
function addJurisdiction(index,type){
	if(type == 2){
		$('#savePower').hide();
		$('#updatePower').show();
		$('#deletePower').show();
	}
	var rows = $('#tenantAuthorizationTable').datagrid('getRows');
	var row = rows[index];
	_rowIndex = row;
	console.log(row)
	$("#pushingCardDlg").dialog({
		title : '授权信息',
		top:getTop(230),
		left : getLeft(230),
		width : 230,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			// $("#equipmentAuthorizationDlg").dialog('close');
			$("#imgwrap ul li").remove();
		}
	});
	$("#selectRentan").val(row.renterPopName);
	$("#pushingCardDlg").dialog('open');
}
//执行授权
function doPushingCard() {
	var row = $("#deviceInfoTable").datagrid('getSelected');
	var att = $("#att").val();
	var img='';
	if(typeof($("#imgwrap img:eq(0)").attr("src")) != "undefined" && ($("#imgwrap img:eq(0)").attr("src")) !='') {
		img = img+($("#imgwrap img:eq(0)").attr("src"));
	}
	if(typeof($("#imgwrap img:eq(1)").attr("src")) != "undefined" && ($("#imgwrap img:eq(1)").attr("src")) !='') {
		img = img+"-"+($("#imgwrap img:eq(1)").attr("src"));
	}
	if(typeof($("#imgwrap img:eq(2)").attr("src")) != "undefined" && ($("#imgwrap img:eq(2)").attr("src")) !='') {
		img = img+"-"+($("#imgwrap img:eq(2)").attr("src"));
	}
	var obj = document.getElementsByName("lock");
	var lockArray = [];
	var lockName = " ";
	for (k in obj) {
		if (obj[k].checked) {
			lockArray.push(JSON.parse(obj[k].value))
			lockName += JSON.parse(obj[k].value).devNickname;
			lockName += " "
		}
	}
	var cardId = $('#cardId').val();//授权
	var doorCardNum = $('#cardId').val();//卡号
	var popName = $("#selectRentan").val();
	var inseratData = {
		personType : "租客",
		popId : _rowIndex.popId,
		img : img,
		att :att,
		popName : popName,
		coid : _loginCoId,
		departmentId : _loginDepartment,
		storefrontId : _loginStore,
		registerPeopleId : _loginUserId,
		jdcState : '使用中',
		jdcCardId : cardId,
		jdcCardNum : doorCardNum,
	}
	var doorCardJson = "";
	//人脸识别需要修改
	inseratData.jdcDeviceId = row.id;
	if (row.devAuthNum != null && row.devAuthNum != '') {
		inseratData.jdcAuthNum = row.devAuthNum;
	}
	doorCardJson += JSON.stringify(inseratData);
	doorCardJson = "[" + doorCardJson + "]";
	if(row.length>0){
		showLoading();
	}
	$.ajax({
		type : "post",
		url : "../insertFacePower.action",
		data : {
			doorCardJson : doorCardJson
		},
		dataType : "json",
		success : function(result) {
			hideLoading();
			console.log(result);
			if (result.code == 1) {
				myTips("添加成功", 'success');
				$("#pushingCardDlg").dialog('close');
			} else {
				myTips(result.msg, 'error');

			}
		}
	});
}

/*一键开门*/
function doRemoteOpen() {
	var row = $("#deviceInfoTable").datagrid('getSelected');
	console.log(row)
	var deviceKey = row.devSn;
	$.post("http://www.fangzhizun.com/device/wo/RemoteOpen", {
		deviceKey:deviceKey,
	}, function (data) {
		if (data.code==0) {
			$.post("../insertJourFaceInformation.action", {
				jfriDeviceKey:deviceKey,
			}, function (data) {
			});
			myTips("开门成功", "success");
		} else {
			myTips("开门失败", "error");
		}

	})
}
function openPersonInfomationDiv() {
	$('#personInfomationDiv').dialog({
		title: '识别记录',
		top: 30,
		left: 200,
		width: 750,
		height: 510,
		closed: true,
		cache: false,
		modal: true,
		onClose: function () {
			$('#userName').val("");
			$('#searchFaceStart').val("");
			$('#searchFaceEnd').val('');
		}

	});
	selectIonInformation(1, 3);
	$('#personInfomationDiv').dialog("open");
}
//识别记录导入
function selectIonInformation(page, type) {
	var row = $("#deviceInfoTable").datagrid('getSelected');
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var userName = $("#userName").val();
	var startTime = $("#searchFaceStart").val();
	var endTime = $("#searchFaceEnd").val();
	var dataTime = new Date(endTime);
	dataTime = dataTime.setDate(dataTime.getDate() + 1);
	endTime = new Date(dataTime);
	// console.log(endTime);
	if (startTime == "") {
		var startTime = "2000-01-01"
		var endTime = new Date().format("yyyy-MM-dd HH:mm:ss").toString();
	}
	var row = $("#deviceInfoTable").datagrid('getSelected');
	$.post("../selectJourFaceRecognitionInformation.action", {
		startNum: startNum,
		endNum: endNum,
		id: row.id,
		jftiPersonName: userName,
		startTime: startTime,
		endTime: endTime,
	}, function (data) {
		if(data.code<0){
			sourcePage2(0, 0, 3);
		}else{
			data = data.body;
			if (data != null) {
				if (page == 1 && type == 3) {
					sourcePage2(data[0].totalNum, page, 3);
				}
				for (var i in data) {
					data[i].detailedAddress = data[i].hsAddCommunity + " "
						+ data[i].hsAddBuilding + " "
						+ data[i].hsAddDoorplateno;
					if (data[i].jftiPersonName == "" || data[i].jftiPersonName == null) {
						var name = "陌生人";
						data[i].jftiPersonName = name;
					}
					if (data[i].jfriAliveType == 1) {
						var live = "活体认证";
						data[i].jfriAliveType = live;
					} else {
						var die = "非活体认证";
						data[i].jfriAliveType = die;
					}
					if (data[i].jftiRecMode == 1) {
						data[i].jftiRecMode = '刷脸';
					} else if (data[i].jftiRecMode == 2) {
						data[i].jftiRecMode = '刷卡';
					} else if (data[i].jftiRecMode == 3) {
						data[i].jftiRecMode = '脸&卡双重认证';
					} else if (data[i].jftiRecMode == 4) {
						data[i].jftiRecMode = '人证比对';
					} else if (data[i].jftiRecMode == 5) {
						data[i].jftiRecMode = '一键开锁';
					}
					if (data[i].jftiPasernType == '') {
						data[i].jftiPasernType = '用户'
					}
					if (data[i].jftiType == 1) {
						data[i].jftiType = '成功'
					} else {
						data[i].jftiType = '失败'
					}
				}
				$("#personInfomationDivTable").datagrid("loadData", data);
			} else {
				$("#personInfomationDivTable").datagrid("loadData", []);
			}
		}
	});
}
// 分页操作
function sourcePage2(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseHousePage").remove();
		$("#tenantAuthorizationPageDiv")
			.append("<div class='tcdPageCode' id='choseHousePage' style='text-align:center;'></div>");
		$("#choseHousePage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function (p) {
				if (p <= pageNum) {
					seldectTenant(p, 1);
				}
			}
		});
	}
	if (type == 2) {
		pageNum = Math.ceil(totalNum / 10);
		$("#queryDeviceRecordPage").remove();
		$("#queryDeviceRecordPageDiv")
			.append(
				"<div class='tcdPageCode' id='queryDeviceRecordPage' style='text-align:center;'></div>");
		$("#queryDeviceRecordPage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function (p) {
				if (p <= pageNum) {
					queryDeviceRecord(p, 1);
				}
			}
		});
	}
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 15);
		$("#queryDeviceRecordPage").remove();
		$("#personInfomationFenYe")
			.append(
				"<div class='tcdPageCode' id='queryDeviceRecordPage' style='text-align:center;'></div>");
		$("#queryDeviceRecordPage").createPage({
			onePageNums: 15,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function (p) {
				if (p <= pageNum) {
					selectIonInformation(p, 1);
				}
			}
		});
	}

}
/*删除授权*/
function deletePower(){
	var row = $("#deviceInfoTable").datagrid('getSelected');
	$.post('../deletePower.action',{
		popId	: _rowIndex.popId,
		brandId : row.devBrandId
	},function(data){
		if(data.code>0){
			myTips("删除成功！","success");
			seldectTenant(1, 1);
			$("#pushingCardDlg").dialog('close');
		}else{
			myTips("删除失败！","error")
		}
	});
}

//储存视频音频
var MediaStreamTrack;
//拍照上传
function new_page( ) {
	$("#photoDlg").dialog({
		title : '拍照',
		top : getTop(600),
		left : getLeft(700),
		width : 700,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			//循环关闭音频视频
			MediaStreamTrack.forEach(function (Track) {
				Track.stop();
			});

		}
	});
	/**
	 * 调用摄像头
	 */
		//设置摄相机宽高
	var opt = {
			audio: true,
			video: {
				//摄像宽高
				width: 150,
				height: 200
			}
		};
	//调用摄像机

	var Devicestate = navigator.mediaDevices.getUserMedia(opt);
	Devicestate.then(function(mediaStream) {
		MediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks();
		video = document.querySelector('video');
		video.srcObject = mediaStream;
		video.onloadedmetadata = function(e) {
			video.play();
		};
	});
	//用户拒绝使用,或者没有摄像头
	Devicestate.catch(function(err) {
		$("#RepeatedWarnings").text("用户拒绝使用摄像头,或者没有摄像头!");
		$("#RepeatedWarnings").show();
		var err = err.name;
		console.log(err);
	});
	$("#photoDlg").dialog("open");
}
/**/

function MDRequestElectricBoxStatus() {
	var row = $("#deviceInfoTable").datagrid("getSelected");
	$.post("http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus", {
		projectCode: row.devId,
		mac: row.devSn,
	}, function (data) {
		console.log(data);
		if (data.code == 0) {
			data = data.body;
			for (var i in data) {
				if (data[i].addr == row.devRoad) {
					if (data[i].oc) {
						$("#mdOpen").removeClass('btn-default');
						$("#mdOpen").addClass('btn-success');
						$("#mdOff").removeClass('btn-success');
						$("#mdOff").addClass('btn-default');
					} else {
						$("#mdOff").removeClass('btn-default');
						$("#mdOff").addClass('btn-success');
						$("#mdOpen").removeClass('btn-success');
						$("#mdOpen").addClass('btn-default');
					}
					$("#mdElectricQuantity").html('<span style="color: #00c900;font-size: 18px">当前电量：' + data[i].power + 'KWh</span>');
				}
			}
		} else {
			$("#mdElectricQuantity").html('<span style="color: red;font-size: 18px">获取不到设备状态！</span>');
		}
	});
}

//曼顿电箱控制
function MDElectricBoxControl(type) {
	var row = $("#deviceInfoTable").datagrid("getSelected");
	var url = "http://www.fangzhizun.com/device/mandun/MDEBControl";
	var zz = {};
	zz.projectCode = row.devId;
	zz.mac = row.devSn;
	var enableNetCtrl = true;

	$.ajax({
		type:"post",
		url:"http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus",
		data:{
			projectCode: row.devId,
			mac: row.devSn
		},
		async:false,
		dataType:"json",
		success:function(data){
			if (data.code == 0) {
				data = data.body;
				for (var i in data) {
					if (data[i].addr == row.devRoad) {
						enableNetCtrl = data[i].enableNetCtrl;
					}
				}
			}
		}
	});

	switch (type) {
		case 1:
			if (enableNetCtrl) {
				$.messager.confirm('确认框', '在进行通电前请确保电路正常，没人在进行电路维修，是否继续通电操作？', function (r) {
					if (r) {
						zz.cmd = "OCSWITCH";
						zz.value1 = "open";
						zz.value2 = row.devRoad;
						$.post(url, zz, function (data) {
							if (data.code == 0) {
								myTips(data.message, 'success');
								$("#mdOpen").removeClass('btn-default');
								$("#mdOpen").addClass('btn-success');
								$("#mdOff").removeClass('btn-success');
								$("#mdOff").addClass('btn-default');
							} else {
								myTips(data.message, 'error');
							}
						});
					}
				});
			} else {
				myTips("当前电箱状态为不可远程控制，请检查开关是否被手动分闸了！", "error");
			}
			return;
		case 2:
			if (enableNetCtrl) {
				$.messager.confirm('确认框', '在断电前请确认没人在使用电器，否则可能会造成一定的影响，是否继续断电操作？', function (r) {
					if (r) {
						zz.cmd = "OCSWITCH";
						zz.value1 = "close";
						zz.value2 = row.devRoad;
						$.post(url, zz, function (data) {
							if (data.code == 0) {
								myTips(data.message, 'success');
								$("#mdOpen").removeClass('btn-success');
								$("#mdOpen").addClass('btn-default');
								$("#mdOff").removeClass('btn-default');
								$("#mdOff").addClass('btn-success');
							} else {
								myTips(data.message, 'error');
							}
						});
					}
				});
			} else {
				myTips("当前电箱状态为不可远程控制，请检查开关是否被手动分闸了！", "error");
			}
			return;
		case 3:
			zz.cmd = "SWITCHSET";
			zz.value1 = row.devRoad;
			zz.value2 = $("#lineName").val();
			zz.value4 = $("#maximumPower").val();
			zz.value5 = $("#overflowThreshold").val();
			break;
		case 4:
			zz.cmd = "SETAUTOLEAK";
			zz.value1 = $("#startUsing").prop("checked");
			zz.value2 = $("#day").val();
			zz.value3 = $("#hour").val();
			zz.value4 = $("#minute").val();
			break;
		case 5:
			zz.cmd = "SETLOGINPWD";
			zz.value1 = $("#usedPassword").val();
			zz.value2 = $("#newPassword").val();
			break;
		case 6:
			zz.cmd = "SETWIRELESS";
			zz.value1 = $("#used_ssid").val();
			zz.value2 = $("#used_ssidPassword").val();
			zz.value3 = $("#new_ssid").val();
			zz.value5 = $("#new_ssidPassword").val();
			break;
		case 9:
			$.post("http://www.fangzhizun.com/device/mandun/MDQueryTimingData", {
				projectCode: row.devId,
				mac: row.devSn,
				autoid: 0,
			}, function (data) {
				console.log(data)
				if (data.code < 0) {
					$('#getCfgTimerTable').datagrid({
						data: [],
						view: myview,
						emptyMsg: data.msg
					});
				} else {
					data = data.body;
					$("#getCfgTimerTable").datagrid("loadData", data);
				}
			}, "json");
			return;
		case 10:
			$.post("http://www.fangzhizun.com/device/mandun/MDQueryLeakageSelfInspection", {
				projectCode: row.devId,
				mac: row.devSn,
			}, function (data) {
				if (data.code < 0) {
					myTips(data.msg, "error");
				} else {
					data = data.body;
					for (var i in data) {
						if (data[i] == true) {
							data[i] = "已启用"
						} else if (data[i] == false) {
							data[i] = "未启用"
						}
						$("#" + i).html(data[i]);
					}
				}
			}, "json");
			return;
	}
	showLoading();
	$.post(url, zz, function (data) {
		hideLoading();
		if (data.code == 0) {
			myTips(data.message, 'success');
		} else {
			myTips(data.message, 'error');
		}
	});
	$('#MDElectricBoxControlDlg').dialog('close');
}

function MDElectricBoxControlDlg(type) {
	var width = 0;
	var height = 0;
	if (type == 7 || type == 8 || type == 9 || type == 11 || type == 12) {
		width = 800;
		height = 450;
	} else {
		width = 600;
		height = 280;
	}
	$('#MDElectricBoxControlDlg').dialog({
		title: '电箱控制',
		top: getTop(height),
		left: getLeft(width),
		width: width,
		height: height,
		closed: true,
		cache: false,
		modal: true,
		onClose: function () {
			$("#MDElectricBoxControlDlg input").val('');
		}
	});
	$("#submit").attr("onclick", "MDElectricBoxControl(" + type + ")");
	$("#SETLOGINPWDControl").hide();
	$("#SETAUTOLEAKControl").hide();
	$("#switchsetControl").hide();
	$("#SETWIRELESSControl").hide();
	$("#ElectricBoxStatus").hide();
	$("#GET_BOX_ALARM").hide();
	$("#GET_CFG_TIMER").hide();
	$("#GET_CFG_LKICHK").hide();
	$("#GET_BOX_ONLINE_HISTORY").hide();
	$("#statisticalElectricity").hide();
	$("#button").hide();

	if (type == 3) {
		var row = $("#virtualDataGrid").datagrid("getSelected");
		$("#lineName").val(row.keyAdministrator);
		$("#switchsetControl").show();
		$("#button").show();
	} else if (type == 4) {
		$("#SETAUTOLEAKControl").show();
		$("#button").show();
		MDElectricBoxControl(10);
	} else if (type == 5) {
		$("#SETLOGINPWDControl").show();
		$("#button").show();
	} else if (type == 6) {
		$("#SETWIRELESSControl").show();
		$("#button").show();
	} else if (type == 7) {
		$("#ElectricBoxStatus").show();

		var row = $("#deviceInfoTable").datagrid("getSelected");
		$.post("http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus", {
			projectCode: row.devId,
			mac: row.devSn,
		}, function (data) {
			console.log(data);
			if (data.code == 0) {
				data = data.body;
				for (var i in data) {
					if (data[i].addr == row.devRoad) {
						for (var j in data[i]) {
							if (j == "oc") {
								$("#s" + j).html(data[i][j] == true ? "开" : "关");
							} else if (j == "enableNetCtrl") {
								$("#s" + j).html(data[i][j] == true ? "允许" : "不允许");
							} else if (j == "validity") {
								$("#s" + j).html(data[i][j] == true ? "有效" : "无效");
							} else if (j == "online") {
								$("#s" + j).html(data[i][j] == false ? "离线" : "在线");
							} else if (j == "lineType") {
								$("#s" + j).html(data[i][j] == "220" ? "单相" : "三相");
							} else if (j == "alarm") {
								$("#s" + j).html(data[i][j] == 0 || 128 ? "告警取消" : "存在告警");
							} else if (j == "gatherAddr") {
								$("#s" + j).html(data[i][j] == -1 ? "进线直连" : data[i][j]);
							} else if (j == "control") {
								$("#s" + j).html(data[i][j] == true ? "是" : "否");
							} else if (j == "visibility") {
								$("#s" + j).html(data[i][j] == true ? "是" : "否");
							} else if (j == "mainLine") {
								$("#s" + j).html(data[i][j] == "0" ? "非总线" : "总线");
							} else {
								$("#s" + j).html(data[i][j]);
							}
						}
					}
				}
			} else {
				myTips("获取设备数据失败！", "error");
			}
		});
	} else if (type == 8) {
		$("#GET_BOX_ALARM").show();

		var data1 = new Date().format("yyyy-MM-dd") + " 00:00";
		var data2 = new Date().format("yyyy-MM-dd hh:mm");
		$("#searchBillingDateFrom").val(data1);
		$("#searchBillingDateTo").val(data2);
		getBoxAlarm(1, 0);
	} else if (type == 9) {
		$("#GET_CFG_TIMER").show();
		MDElectricBoxControl(9);
	} else if (type == 10) {
		$("#GET_CFG_LKICHK").show();
		MDElectricBoxControl(10);
	} else if (type == 11) {
		$("#GET_BOX_ONLINE_HISTORY").show();
		var data1 = new Date().format("yyyy-MM-dd") + " 00:00";
		var data2 = new Date().format("yyyy-MM-dd hh:mm");
		$("#startTime").val(data1);
		$("#endTime").val(data2);
		getBoxOnlineHistory(1, 0);
	} else if (type == 12) {
		$("#statisticalElectricity").show();
		var data1 = new Date().format("yyyy");
		$("#searchYear").val(data1);
		getstatisticalElectricity();
	}
	$('#MDElectricBoxControlDlg').dialog("open")
}

function getBoxAlarm(page, type) {
	var start = $("#searchBillingDateFrom").val();
	var end = $("#searchBillingDateTo").val();
	var pageSize = 10;
	var alarmType = "W";
	var row = $("#deviceInfoTable").datagrid("getSelected");
	var projectCode = row.devId;
	var mac = row.devSn;

	$.post("http://www.fangzhizun.com/device/mandun/MDRequestEBWarning", {
		projectCode: projectCode,
		mac: mac,
		start: start,
		end: end,
		pageSize: pageSize,
		page: page,
		type: alarmType
	}, function (data) {
		console.log(data)
		if (data.code < 0) {
			sourcePages(0, 0, 0);
			$('#getBoxAlarmTable').datagrid({
				data: [],
				view: myview,
				emptyMsg: data.msg
			});
		} else {
			data = data.body;
			var datas = data.datas;
			if (page == 1 && type == 0) {
				sourcePages(data.total, page, 0);
			}
			$("#getBoxAlarmTable").datagrid("loadData", datas);
		}
	}, "json");
}

// 分页操作
function sourcePages(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 10);
		$("#getBoxAlarmPage").remove();
		$("#getBoxAlarmPageDiv").append("<div class='tcdPageCode' id='getBoxAlarmPage' style='text-align:center;'></div>");
		$("#getBoxAlarmPage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function (p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0] = 0;
					getBoxAlarm(p, 1);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 10);
		$("#getBoxOnlineHistoryPage").remove();
		$("#getBoxOnlineHistoryPageDiv").append("<div class='tcdPageCode' id='getBoxOnlineHistoryPage' style='text-align:center;'></div>");
		$("#getBoxOnlineHistoryPage").createPage({
			onePageNums: 10,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function (p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0] = 0;
					getBoxAlarm(p, 1);
				}
			}
		});
	}
}

function getBoxOnlineHistory(page, type) {
	var start = $("#startTime").val();
	var end = $("#endTime").val();
	var pageSize = 10;
	var row = $("#deviceInfoTable").datagrid("getSelected");
	var projectCode = row.devId;
	var mac = row.devSn;

	$.post("http://www.fangzhizun.com/device/mandun/MDQueryOnlineRecording", {
		projectCode: projectCode,
		mac: mac,
		startTime: start,
		endTime: end,
		pageSize: pageSize,
		page: page,
	}, function (data) {
		console.log(data)
		if (data.code < 0) {
			sourcePages(0, 0, 1);
			$('#getBoxOnlineHistoryTable').datagrid({
				data: [],
				view: myview,
				emptyMsg: data.msg
			});
		} else {
			data = data.body;
			var datas = data.datas;
			for (var i in datas) {
				if (datas[i].onlineStatus == 1) {
					datas[i].status = "在线";
				} else if (datas[i].onlineStatus == 0) {
					datas[i].status = "离线";
				} else if (datas[i].onlineStatus == -1) {
					datas[i].status = "脱线";
				}
			}
			if (page == 1 && type == 0) {
				sourcePages(data.total, page, 1);
			}
			$("#getBoxOnlineHistoryTable").datagrid("loadData", datas);
		}
	}, "json");
}
