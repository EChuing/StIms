var loginCompanyRentDistrict;
var loginDepartment;
var loginStore;
var loginUserId;
$(function(){
	$('#addHrBegin').val(formatTime(getNowFormatDate(), 2));
	//延迟加载
	setTimeout(function() {
		loadSelectList();
	},1000);
	
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$(".inputHide").prop({disabled:true});
	$('#aShowHide').show();
	checkProfit('#addHrSalesmanAllProfit', 'addProfit', 'addHrSalesman');//收益人
});

function loadSelectList(){
	loginCompanyRentDistrict = $("#loginCompanyRentDistrict").val();
	loginCompanyRentDistrict = JSON.parse(loginCompanyRentDistrict != undefined ? loginCompanyRentDistrict : '[]');
	loginDepartment = $("#loginDepartment").val();
	loginStore = $("#loginStore").val();
	loginUserId = $("#loginUserId").val();
	for (var i in loginCompanyRentDistrict) {
		$('#choseDistrict').append('<option value="' + loginCompanyRentDistrict[i] + '">' + loginCompanyRentDistrict[i] + '</option>');
	}
	for (var i = 0; i < _contractType.length; i++) {
		$("#addHrContractType").append("<option value = '" + _contractType[i] + "'>" + _contractType[i] + "</option>");
	}
	for (var i = 0; i < _hrPaymentType.length; i++) {
		$(".add_payment_type").append("<option value = '" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
	}
	for (var i in _saType) {
		$('#searchSaType').append("<option value='" + _saType[i] + "'>" + _saType[i] + "</option>");
	}
	
	//默认设置
	//合同开始日期为今天
	$('#addHrContractType').val('换房合同');
	$('#addHrInAdvancePay').val(1);//提前收租天数
	$('#addHrRentPaymentType').val('月付');//租金
	$('#addHrManagePayment').val('月付');//物管费
	$('#addHrServerPayment').val('月付');//服务费
	$('#addHrWifiChargePayment').val('月付');//网络费
	$('#addHrTvChargePayment').val('月付');//电视费
	$('#addHrOtherPayment').val('月付');//其他费
	$("#addHrManageCost").val(0);//物管费
	$("#addHrServerCost").val(0);//服务费
	$("#addHrWifiCharge").val(0);//网络费
	$("#addHrTvCharge").val(0);//电视费
	$("#addHrOtherPay").val(0);//其他费
	$("#addHrHouseDeposit").val(0);//房屋押金
	$("#addHrDoorDeposit").val(0);//门卡押金
	$("#addHrPowerDeposit").val(0);//水电押金
	$("#addHrOtherDeposit").val(0);//其他押金
	$("#totalFee").val(0);
	$('#addHrDoorTrendFee').val(0);
	$('#addHrComServiceFee').val(0);
	$('#addHrLockFee').val(0);
	$('#addHrOtherFee').val(0);
	$('#addHrDepositInfoDiv').hide();//定金
	for(var j in _userInfoData){//业务员
		if(loginUserId == _userInfoData[j].userId){
			$('#addHrSalesmanAllProfit').prop('checked', true);
			$("#addHrSalesmanGetUserId").val(loginUserId);
			$("#addHrSalesmanGetUserDetId").val(loginDepartment);
			$("#addHrSalesmanGetUserStoreId").val(loginStore);
			$("#addHrSalesmanShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}
	checkProfit('#addHrSalesmanAllProfit', 'addProfit', 'addHrSalesman');//收益人
	
}
//添加出租
function addHrDlg() {
	
	console.log("添加出租");
	$('#addHrDlg').dialog({
		title : '添加出租',
		top : getTop(575),
		left : getLeft(630),
		width : 630,
		height : 575,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$(".inputHide").prop({disabled:true});
			$('#aShowHide').show();
			$('#addHrDlg [clear="clear"]').val('');
			$('#addHrDlg [clear="clear"]').html('');
			$('#addHrDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#advanceMode').val(1);
			$('#numberMode').val(1);
			clearAttachment();
		}
	});
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$(".inputHide").prop({disabled:true});
	$('#aShowHide').show();
	//点击导航栏跳转
	$('#addHrDlg .process-bar .process').on('click', function(){
		if ($(this).hasClass('active')) {
			var step = $(this).attr('data-step');
			gotoStep('addHr', step);
		}
	});

	//默认设置
	//合同开始日期为今天
	$('#addHrContractType').val('新签合同');
	$('#addHrInAdvancePay').val(1);//提前收租天数
	$('#addHrRentPaymentType').val('月付');//租金
	$('#addHrManagePayment').val('月付');//物管费
	$('#addHrServerPayment').val('月付');//服务费
	$("#addHrManageCost").val(0);//物管费
	$("#addHrServerCost").val(0);//服务费
	$("#addHrWifiCharge").val(0);//网络费
	$("#addHrTvCharge").val(0);//电视费
	$("#addHrOtherPay").val(0);//其他费
	$("#addHrHouseDeposit").val(0);//房屋押金
	$("#addHrDoorDeposit").val(0);//门卡押金
	$("#addHrPowerDeposit").val(0);//水电押金
	$("#addHrOtherDeposit").val(0);//其他押金
	$("#totalFee").val(0);
	$('#addHrDoorTrendFee').val(0);
	$('#addHrComServiceFee').val(0);
	$('#addHrLockFee').val(0);
	$('#addHrOtherFee').val(0);
	$('#addHrDepositInfoDiv').hide();//定金
	for(var j in _userInfoData){//业务员
		if(_loginUserId == _userInfoData[j].userId){
			$('#addHrSalesmanAllProfit').prop('checked', true);
			$("#addHrSalesmanGetUserId").val(_loginUserId);
			$("#addHrSalesmanGetUserDetId").val(_loginDepartment);
			$("#addHrSalesmanGetUserStoreId").val(_loginStore);
			$("#addHrSalesmanShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}
	checkProfit('#addHrSalesmanAllProfit', 'addProfit', 'addHrSalesman');//收益人
	
	//显示第一步的界面
	gotoStep('addHr', 1);
	$('#addHrDlg').dialog('open');
	energy3();
}
function energy3(){
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
//添加已租-选择未租房
function chooseHouseForStore() {
	$('#choseHouse').dialog({
		title : '选择房源',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true
	});
	
	if ($('#choseHouseTable').hasClass('datagrid-f')) {

	} else {
		$('#choseHouseTable').datagrid({
			columns : [ [ {
				field : 'hsAddDistrict',
				title : '城区',
				width : 20,
				align : 'center'
			}, {
				field : 'hsAddCommunity',
				title : '楼盘名称',
				width : 26,
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
				field : 'hsSectionType',
				title : '房型',
				width : 15,
				align : 'center'
			}, {
				field : 'hsRegisterTime',
				title : '登记时间',
				width : 19,
				align : 'center'
			} ] ],
			width : '100%',
			height : '277px',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#choseHouseTable').datagrid('getSelected');
				if (row) {
					console.log("双击打开未租");
					$("#addHrHsId").val(row.hsId);//未租id
					$("#addHrHouseId").val(row.hsHouseId);//盘源id
					$("#addHrHouseDictId").val(row.hsHouseDictId);//字典id
					$("#addHrLandlordId").val(row.hsLandlordId);//房东id
					$("#addHrLandlordCheckEnd").val(row.hsEndTime);//托管到期时间
					$("#addHrIdentifier").val(row.hsSplitIdentifier);//合租房门牌号前缀
					//0!='' 相当于  false！=false 返回false
					if(row.hsPrimitiveMother!=''&&row.hsPrimitiveMother!=null){
						$("#addHrFlatShareLogo").val(1);//拆分标识0,1
					}else{
						$("#addHrFlatShareLogo").val(0);
					}
					$("#addHrWater").val(row.hsWaterVolFirst);//水底数
					$("#addHrElect").val(row.hsElectritVolFirst);//电底数
					$("#addHrGas").val(row.hsGasVolFirst);//气底数
					$("#addHrHotWater").val(row.hsHotWaterVolFirst);//热水底数
					$("#addHrHotAir").val(row.hsHotAirVolFirst);//暖气底数
					
					
					//将房屋信息映射到表格中
					for (var i in row) {
						$('.exchangeHousesSteps table.hsInfo .' + i).html(row[i]);
					}
					//房管员
					if(row.hsManagerUserId!=''&&row.hsManagerUserId!=null){
						for(var j in _userInfoData){
							if(row.hsManagerUserId == _userInfoData[j].userId){
								$("#addHrManagerUserId").val(row.hsManagerUserId);
								$("#addHrManagerUserDept").val(row.hsDepartment);
								$("#addHrManagerUserStore").val(row.hsStorefront);
							}
						}
					}else{
						$("#addHrManagerUserId").val('');
						$("#addHrManagerUserDept").val("");
						$("#addHrManagerUserStore").val("");
					}
					
					//查计费方案
					$.post("../selectPlanTableRentStore.action", {
						planHdId	:row.hsHouseDictId,
					}, function(data) {
						data=data.body;
						$("#addHrWaterPlan").empty();
						$("#addHrElectPlan").empty();
						$("#addHrGasPlan").empty();
						$("#addHrHotWaterPlan").empty();
						$("#addHrHotAirPlan").empty();
						for(var i in data){
							if(data[i].planType=='水'){
								$("#addHrWaterPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
							}else if(data[i].planType=='电'){
								$("#addHrElectPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
							}else if(data[i].planType=='气'){
								$("#addHrGasPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
							}else if(data[i].planType=='热水'){
								$("#addHrHotWaterPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
							}else if(data[i].planType=='暖气'){
								$("#addHrHotAirPlan").append("<option value='"+data[i].planId+"'>"+data[i].planName+"</option>");
							}
						}
					});
					//意向人及定金
					if(row.hsIntentionalId!='' && row.hsIntentionalId!=null){
						$.post("../selectIntendedPerson.action", {
							ipId:row.hsIntentionalId
						}, function(data) {
							data=data.body;
							$("#addHrRenterName").val(data[0].ipName);
							$("#addHrDepositRenterName").val(data[0].ipName);
							$("#addHrIntendedRenterId").val(data[0].ipId);
							$("#addHrRenterPhone").val(data[0].ipTel);
						});
						$('#addHrDeposit').val(row.hsDepositAmount);
						$('#addHrDepositDateBegin').val(row.hsStartDate);
						$('#addHrDepositDateEnd').val(row.hsEndDate);
						$('#addHrDepositRenterId').val(row.hsIntentionalId);
						$("#depositPopId").val('');
						$('#addHrDepositFollowUserId').val(row.hsSalesmanId);		
						
						$.post("../queryUserByDepartmentID.action", {
							userId : row.hsSalesmanId
						}, function(data) {
							if (data.code < 0) {
								return;
							}
							data = data.body;
							$("#addHrDepositUserName").val(data[0].suStaffName);
						});
						$('#addHrDepositInfoDiv').show();
					}else if(row.hsPopId != '' && row.hsPopId != null){
						//客户
						$.post("../selectPopulationCommon.action", {
							popId  : row.hsPopId,
						}, function(data) {
							data=data.body;
							$("#addHrRenterName").val(data[0].popName);
							$("#addHrDepositRenterName").val(data[0].popName);
							$("#addHrDepositPopId").val(data[0].popId);
							$('#addHrIntendedRenterId').val('');
							$("#addHrRenterPhone").val(data[0].popTelephone);
							$("#addHrRenterIDCard").val(data[0].popIdcard);
						});
						$('#addHrDeposit').val(row.hsDepositAmount);
						$('#addHrDepositDateBegin').val(row.hsStartDate);
						$('#addHrDepositDateEnd').val(row.hsEndDate);
						$('#addHrDepositRenterId').val(row.hsIntentionalId);
						$('#addHrDepositFollowUserId').val(row.hsSalesmanId);		
						$.post("../queryUserByDepartmentID.action", {
							userId : row.hsSalesmanId
						}, function(data) {
							if (data.code < 0) {
								return;
							}
							data = data.body;
							$("#addHrDepositUserName").val(data[0].suStaffName);
						});
						$('#addHrDepositInfoDiv').show();
					}else{
						$('#addHrDeposit').val('');
						$('#addHrDepositDateBegin').val('');
						$('#addHrDepositDateEnd').val('');
						$('#addHrDepositUserName').val('');
						$('#addHrDepositInfoDiv').hide();
					}
					//资产 - 每次选择房源会清除之前缓存的迁移数据
					_houseStoreCoding = row.hsId;
					_houseCoding = row.hsHouseId;
					_hrAddCommunity = row.hsAddCommunity;
					_hrAddBuilding = row.hsAddBuilding;
					_hrAddDoorplateno = row.hsAddDoorplateno;
					_moveSaId = 0;
					_moveAsset = [];
					$('#choseHouse').dialog('close');
				}
			}
		});
	}
	query4StoreInfo(1,0);
	
	$('#choseHouse').dialog('open');
}

//选择托管房源表导入数据
function query4StoreInfo(page,type){
	var startNum = (parseInt(page)-1)*10;
	var endNum = 10;
	var qCity = $("#choseCity").find("option:selected").text();
	var qDistrict = $("#choseDistrict").find("option:selected").text();
	var qZone = $("#choseZone").find("option:selected").text();
	var qCommunity = $("#choseCommunity").val();
	var qBuilding = $("#choseBuilding").val();
	var qDoorplateno = $("#choseDoorplateno").val();
	$.post("../queryHouseStoreCommon.action", {
		startNum : startNum,
		endNum : endNum,
		hsAddCity:qCity,
		hsAddDistrict:qDistrict,
		hsAddZone:qZone,
		hsAddCommunity:qCommunity,
		hsAddBuilding:qBuilding,
		hsAddDoorplateno:qDoorplateno,
		hsLeaseState:'所有未租',
		hsPrimitiveMother:4,
		hsDownDeposit:'否',
	},function(data) {
		if(data.code<0){
			sourcePage(0,0,1); 
			$('#choseHouseTable').datagrid({
	             data: [],
	             view: myview,
	             emptyMsg: '没有查询到符合条件的记录！'
	        });
		}else{
			data=data.body;
			if(page==1 && type ==0){
				sourcePage(data[0].totalNum,page,1);
			}
			$("#choseHouseTable").datagrid("loadData", data);
		}
	}, "json");
}


//选择租客表导入数据
function queryRenter(page,type){
	var startNum = (parseInt(page)-1)*10;
	var endNum = 10;
	var renterName = $("#searchRenterName").val();;
	var renterPhone = $("#searchRenterPhone").val();;
	var searchRenterType = $('#searchRenterType').val();
	if(searchRenterType=='意向人'){
		$('#choseRenterTable').datagrid('hideColumn', 'renterPopName');
		$('#choseRenterTable').datagrid('hideColumn', 'renterPopTelephone');
		$('#choseRenterTable').datagrid('hideColumn', 'renterPopIdcard');
		$('#choseRenterTable').datagrid('showColumn', 'ipName');
		$('#choseRenterTable').datagrid('showColumn', 'ipTel');
		$('#choseRenterTable').datagrid('showColumn', 'popIdcard');
		$.post("../selectIntendedPerson.action", {
			startNum : startNum,
			endNum : endNum,
			ipName : renterName,
			ipTel  : renterPhone,
		}, function(data) {
			if(data.code<0){
				sourcePage(0,0,2);
				 $('#choseRenterTable').datagrid({
		             data: [],
		             view: myview,
		             emptyMsg: data.msg
		        });
			}else{
				data=data.body;
				if(page==1 && type ==0){
					sourcePage(data[0].totalNum,page,2);
				}
				$("#choseRenterTable").datagrid("loadData", data);
			}
		}, "json");
	}else if(searchRenterType=='已有租客'){
		$('#choseRenterTable').datagrid('showColumn', 'renterPopName');
		$('#choseRenterTable').datagrid('showColumn', 'renterPopTelephone');
		$('#choseRenterTable').datagrid('showColumn', 'renterPopIdcard');
		$('#choseRenterTable').datagrid('hideColumn', 'ipName');
		$('#choseRenterTable').datagrid('hideColumn', 'ipTel');
		$('#choseRenterTable').datagrid('hideColumn', 'popIdcard');
		$.post("../selectHouseRentName.action", {
			startNum : startNum,
			endNum : endNum,
			renterPopName : renterName,
			renterPopTelephone : renterPhone,
		}, function(data) {
			if(data.code<0){
				sourcePage(0,0,2);
				 $('#choseRenterTable').datagrid({
		             data: [],
		             view: myview,
		             emptyMsg: data.msg
		        });
			}else{
				data=data.body;
				if(page==1 && type ==0){
					sourcePage(data[0].totalNum,page,2);
				}
				$("#choseRenterTable").datagrid("loadData", data);
			}
		}, "json");
	}
}


//预生成账单
function preGeneratingBill(){
	// 合同
	var addSourceBegin=$('#addHrBegin').val();
	var addEnd=$('#addHrEnd').val();
	var term = getYearMonthDay(addSourceBegin, addEnd);
	var addSourceTerm = term[0]+'年'+term[1]+'月'+term[2]+'日';
	var addSigned=$('#addHrSigned').val();
	var inAdvancePay = $("#addHrInAdvancePay").val();//收款日期
	var addContractType=$('#addHrContractType').find("option:selected").text();
	// 费用
	var addPrice=$('#addHrRentPrice').val();
	var jrrPaymentMethod = $("#addHrRentPaymentType").find("option:selected").text();
	var jrrManageCost=$('#addHrManageCost').val();
	var jrrManagePayment=$('#addHrManagePayment').find("option:selected").text();
	var jrrServerCost=$('#addHrServerCost').val();
	var jrrServerPayment=$('#addHrServerPayment').find("option:selected").text();
	var hsId=$("#addHrHsId").val();
	var addLandlordId = $("#addHrLandlordId").val()
	var jrrRenewalCoding = $('#addHrContractNum').val();
	var jcdId = $('#addHrContractNumCheckoutIf').val();
	//业务员
	var addFollowUserId = $('#addHrSalesmanGetUserId').val();
	var addBuildingName=$("#addHrDlg .hsAddCommunity").eq(0).html();
	var addAddBuilding=$("#addHrDlg .hsAddBuilding").eq(0).html();
	var addAddDoorplateno=$("#addHrDlg .hsAddDoorplateno").eq(0).html();
	var jcdHouseAddress = addBuildingName+" "+addAddBuilding+" "+addAddDoorplateno;
	//提前交租方式
	var advanceMode = $('#advanceMode').val();
	var numberMode = $('#numberMode').val();

	var totalFee = $('#totalFee').val();//签约账单总金额
	if($("#advanceMode").val() == 2) {
		var exceptRentAndRefund = mySub(totalFee, countBugMonth(addSourceBegin, 3));//除租金其他费用
	}else{
		var exceptRentAndRefund = mySub(totalFee, addPrice);//除租金其他费用
	}

	$.post("../preGeneratingBill.action",{
		jrrHouse4storeId	: hsId,
		jrrLandlordId		: addLandlordId,
		jrrSignedTime 		: addSigned,
		jrrBeginTime 		: addSourceBegin,
		jrrEndTime 			: addEnd,
		jrrUserId 			: _loginUserId,
		jrrDepartment		: _loginDepartment,
		jrrStorefront		: _loginStore,
		jrrContractType 	: addContractType,
		jrrTheTerm 			: addSourceTerm,
		jrrInAdvancePay 	: inAdvancePay, //收款日期
		jrrPaymentMethod 	: jrrPaymentMethod,
		jrrMoney 			: addPrice,
		jrrRenewalCoding	: jrrRenewalCoding,
		//jcdId				: jcdId,
		//adminUser			: addFollowUserId,
		//jcdHouseAddress	: jcdHouseAddress,
		jrrManageCost		: jrrManageCost,
		jrrServerCost		: jrrServerCost,
		jrrManagePayment	: jrrManagePayment,
		jrrServerPayment	: jrrServerPayment,
		advanceMode         : advanceMode,
		numberMode          : numberMode,
		contractBillTotal: Math.abs(totalFee).toFixed(2),
		exceptRentAndRefund: exceptRentAndRefund,
	},function(data){
		if (data.code<0) {
			$('#preGeneratingBillTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data = data.body;
		$("#preGeneratingBillTable").datagrid("loadData", data);
	});
}

//计算合同期限
function changeAddHrContDate(){
	var begin = $('#addHrBegin').val();
	var end = $('#addHrEnd').val();
	if (begin == '' || end == '') {
		$('#addHrTerm').html('');
	} else {
		var term = getYearMonthDay(begin, end);
		$('#addHrTerm').html('（' + term[0] + '年' + term[1] + '月' + term[2] + '日' + '）');
	}
}
//获取交租日当月是多少号
function acquisitionOfRentDay(type){
	console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
	var timeBegin, advanceMode, str;
	if(type == 1){//新签
		timeBegin = $('#addHrBegin').val()
		advanceMode = $('#advanceMode').val();
		str = timeBegin.split('-')
		if(str != ''){
			if(advanceMode == 1){
				$("#totalFee").val(countBugMonth(timeBegin, 1));
				$('#totalFeeDiv').show();
				$('#addHrInAdvancePay').val(str[2]);
			}else{
				console.log(countBugMonth(timeBegin, 2));
				$("#totalFee").val(countBugMonth(timeBegin, 2));
				$('#addHrInAdvancePay').val(1);
			}
		}else{
			$('#addHrInAdvancePay').val(1);
		}
	}else if(type == 2){//续签
		timeBegin = $('#renterRenewBegin').val()
		advanceMode = $('#advanceMode1').val();
		str = timeBegin.split('-')
		if(str != ''){
			if(advanceMode == 1){
				$('#renterRenewAdvancePay').val(str[2]);
			}else{
				$('#renterRenewAdvancePay').val(1);
			}
		}else{
			$('#renterRenewAdvancePay').val(1);
		}
	}
}
//读卡操作
function readIDCard(){
	//获取这个id对应的父窗口
	var identityInformation= $("#id_card_reader_text_box", parent.document).val();
	//var identityInformation = '{"ret":0,"Certificate":{"Name":"王冲","Sex":"男","Nation":"汉","Birthday":"19910527","Address":"湖北省宜昌市伍家岗区中南一路9号14栋1单元1406室","IDNumber":"42058319910527003X","IDIssued":"宜昌市公安局伍家岗分局","IssuedData":"20180817","ValidDate":"20380817","Other":"","CardNumber":"","PhotoName":"C:/Program Files (x86)/ZKIDROnline/bin/zp.bmp","Base64Photo":"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","ImageName":"","Base64Image":"(null)","fp_feature1":"QwEREgELSgAAAAAAAAAAAAAAABoBmmTMAP///////60flPwaI8j8hi2d/O43N/4bPRb8IFHP/FRNuvyiUEX+R1MI/FNfuvyLZZ38loSc/MSeOv43vfL8U8Xr/AvM/fxp2jD+K99G/EjjC/5f4xn+buwk/ljzHP7tAS7/dwly/ScVHP9XS3L9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABo=","fp_feature2":"QwEREgEQUwAAAAAAAAAAAAAAABYBmpjsAP///////4lpFPwhceT8dXDZ/GmLJfyZjRL8vrJU/om3FvyBziL8u9A+/kTaQvyP2hL8r904/p7yFP6a9QD+pvUi/qAFCP9PFQj/HiL2/Sw9/P1cSEz9OFVD/UZbO/0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACM="}}';
	if(identityInformation==''){
		myTips("读卡器无数据，请检测读卡器是否连接!","error");
	}else{
		identityInformation = JSON.parse(identityInformation);	//JSON.parse() 方法用于将一个 JSON 字符串转换为对象
		//姓名
		$("#addHrRenterName").val(identityInformation.Certificate.Name);
		$("#addHrRenterIDCard").val(identityInformation.Certificate.IDNumber);
	}
}
//检测租客合约编号
function contractNumCheckout(numId,ifId,tipsId){
	if(_contractNums != 1){
		return;
	}
	var detectionContract = $("#"+numId).val();
	if(detectionContract==''){
		$("#"+tipsId).html("");//编号不能为空！
		return;
	}
	$.post("../contractNumberdetection.action", {
		detectionContract : detectionContract,
	},function(data){
		if(data.code<0){
			$("#"+tipsId).html(data.msg);
			$("#"+tipsId).css("color", "red");
			return;
		}else{
			data=data.body;
			$("#"+tipsId).html("编号正确");
			$("#"+tipsId).css("color", "green");
			$("#"+ifId).val(data[0].jcdId);
		}
	});
}

function readingsModification(){
	$.messager.confirm('交房抄表', '如果只是录入 合约 尚未 交房 ，则不需要填写读数！', function(r){
		if (r){
			$(".inputHide").prop({disabled:false});
			$('#aShowHide').hide();
		}
	});
}

//单元格单击编辑
var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#preGeneratingBillTable').datagrid('validateRow', editIndex)) {
		$('#preGeneratingBillTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field) {
	if (endEditing()) {
		$('#preGeneratingBillTable').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex = index;
	}
}
function addNextStep(){
	if(validateStep('exchangeHouses', 5)){
		preGeneratingBill();
	}
}
//账户类型和账号联动
function changeWay1(type) {
	var faPaymentType = $("#depositFinancialWay").find("option:selected").text();
	$("#depositFinancialBankNums").val('');
	$("#depositFinancialAccountNums").val('');
	$("#depositFinancialAccountBelong").val('');
	$("#depositAccountName").empty();
	$("#depositAccountName").append("<option></option>");
	if(faPaymentType==''){
		return;
	}
	$.post("../selectNamePublic.action", {
		faPaymentType:faPaymentType,
	}, function(data) {
		$("#depositAccountName").empty();
		$("#depositAccountName").append("<option></option>");
		for (var i in data.body) {
			$("#depositAccountName").append(
					"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
		}
		if(type!=0){
			for (var i in data.body) {
				if(data.body[i].faId==type){
					$("#depositAccountName").val(data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount);
					getAccountId1();
				}
			}
		}
	});
}
function getAccountId1() {
	if($("#depositAccountName").val()==''){
		return;
	}
	$("#depositFinancialBankNums").val($("#depositAccountName").val().split("*#*")[0]);
	$("#depositFinancialAccountNums").val($("#depositAccountName").val().split("*#*")[2]);
	$("#depositFinancialAccountBelong").val($("#depositAccountName").val().split("*#*")[1]);
}

//添加已租，资产列表信息导入
function queryAsset2(page, type) {
//	var startNum = (parseInt(page) - 1) * 10;
//	var endNum = 10;
	var rows = $("#assetsInfoTable2").datagrid("getRows");
	console.log(rows);
	if(rows.length>0){
		return;
	}
	$.post('../assetsInRentDb.action', {
		// startNum : startNum,
		// endNum : endNum,
		saHouseStoreId : _houseStoreCoding
	}, function(data){
		if (data.code < 0) {
			dbSourcePage(0, 0, 21);
			$('#assetsInfoTable2').datagrid('loadData', []);
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum, page, 21);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$('#assetsInfoTable2').datagrid('loadData', data.body);
		}
	});
}
function dbSourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 15);
		$("#financialPage").remove();
		$("#financialPageDiv").append("<div class='tcdPageCode' id='financialPage' style='text-align:center;'></div>");
		$("#financialPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryFinancial(p, 1);
				}
			}
		});
	}
	if (type == 4) {
		pageNum = Math.ceil(totalNum / 15);
		$("#eventInfoPage").remove();
		$("#eventInfoPageDiv").append("<div class='tcdPageCode' id='eventInfoPage' style='text-align:center;'></div>");
		$("#eventInfoPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryEvent(p, 1);
				}
			}
		});
	}
	if (type == 5) {
		pageNum = Math.ceil(totalNum / 14);
		$("#followDbPage").remove();
		$("#followDbPageDiv").append("<div class='tcdPageCode' id='followDbPage' style='text-align:center;'></div>");
		$("#followDbPage").createPage({
			onePageNums : 14,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryFollowDb(p, 1);
				}
			}
		});
	}
	if (type == 11) {
		pageNum = Math.ceil(totalNum / 15);
		$("#payableInfoPage").remove();
		$("#payableInfoPageDiv").append("<div class='tcdPageCode' id='payableInfoPage' style='text-align:center;'></div>");
		$("#payableInfoPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryPayable(p, 1);
				}
			}
		});
	}
	if (type == 12) {
		pageNum = Math.ceil(totalNum / 15);
		$("#receivableInfoPage").remove();
		$("#receivableInfoPageDiv").append("<div class='tcdPageCode' id='receivableInfoPage' style='text-align:center;'></div>");
		$("#receivableInfoPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					$('#monthlyBills_index').val(0);
					queryInstallment(p, 1);
				}
			}
		});
	}
	if (type == 14) {
		pageNum = Math.ceil(totalNum / 12);
		$("#assetPage").remove();
		$("#assetsPageDiv").append("<div class='tcdPageCode' id='assetPage' style='text-align:center;'></div>");
		$("#assetPage").createPage({
			onePageNums:12,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAsset(p, 1);
				}
			}
		});
	}
	if (type == 15) {
		pageNum = Math.ceil(totalNum / 10);
		$("#accountReceivablePage").remove();
		$("#accountReceivablePageDiv").append("<div class='tcdPageCode' id='accountReceivablePage' style='text-align:center;'></div>");
		$("#accountReceivablePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAccountReceivable(p, 0);
				}
			}
		});
	}
	if (type == 16) {
		pageNum = Math.ceil(totalNum / 4);
		$("#RenterContinuePage").remove();
		$("#RenterContinuePageDiv").append("<div class='tcdPageCode' id='RenterContinuePage' style='text-align:center;'></div>");
		$("#RenterContinuePage").createPage({
			onePageNums:4,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenterContinue(p, 0);
				}
			}
		});
	}
	if (type == 17) {
		pageNum = Math.ceil(totalNum / 4);
		$("#landlordContinuePage").remove();
		$("#landlordContinuePageDiv").append("<div class='tcdPageCode' id='landlordContinuePage' style='text-align:center;'></div>");
		$("#landlordContinuePage").createPage({
			onePageNums:4,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryLandlordContinue(p, 0);
				}
			}
		});
	}
	if (type == 18) {
		pageNum = Math.ceil(totalNum / 4);
		$("#renterHisContinuePage").remove();
		$("#renterHisContinuePageDiv").append("<div class='tcdPageCode' id='renterHisContinuePage' style='text-align:center;'></div>");
		$("#renterHisContinuePage").createPage({
			onePageNums:4,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenterHisContinue(p, 0);
				}
			}
		});
	}
	if (type == 19) {
		pageNum = Math.ceil(totalNum / 15);
		$("#sendMessagePage").remove();
		$("#sendMessagePageDiv").append( "<div class='tcdPageCode' id='sendMessagePage' style='text-align:center;'></div>");
		$("#sendMessagePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					querySendMessage(p, 0);
				}
			}
		});
	}	
	if (type == 20) {
		pageNum = Math.ceil(totalNum / 5);
		$("#assetsListTablePage").remove();
		$("#assetsListTablePageDiv") .append( "<div class='tcdPageCode' id='assetsListTablePage' style='text-align:center;'></div>");
		$("#assetsListTablePage").createPage({
			onePageNums:5,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAssetsList(p, 0);
				}
			}
		});
	}
	if (type == 21) {
		pageNum = Math.ceil(totalNum / 10);
		$("#assetPage2").remove();
//		$("#assetsPageDiv2").append("<div class='tcdPageCode' id='assetPage2' style='text-align:center;'></div>");
		$("#assetPage2").createPage({
//			onePageNums:8,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAsset2(p, 1);
				}
			}
		});
	}
	
}

//未租房，资产迁入
function moveInAssets(flag){
	$("#moveInAssetsDlg").dialog({
		title : '迁入资产',
		top : getTop(670),
		left : getLeft(900),
		width : 900,
		height : 670,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveInAssetsDlg [clear="clear"]').val('');
			$('#moveInAssetsDlg [choose="choose"]').val('');
		}
	});
	$('#assetsListTable').datagrid({
		columns : [ [
		{
			field : 'saDetailedAddress',
			title : '地址/项目',
			width : 30,
			align : 'center'
		},
		{
			field : 'saType',
			title : '所属',
			width : 10,
			align : 'center'
		},	
		{
			field : 'saClassify',
			title : '类型',
			width : 10,
			align : 'center'
		},
		{
			field : 'saName',
			title : '名称',
			width : 20,
			align : 'center'
		},
		{
			field : 'saBrand',
			title : '品牌',
			width : 10,
			align : 'center'
		},
		{
			field : 'saModel',
			title : '型号',
			width : 10,
			align : 'center'
		},
		{
			field : 'saStatus',
			title : '状态',
			width : 10,
			align : 'center'
		},
		{
			field : 'saUse',
			title : '使用情况',
			width : 10,
			align : 'center'
		},
		{
			field : 'do',
			title : '添加',
			width : 10,
			align : 'center',
			formatter : function(value, row, index) {
				return "<a href='#' style='color:blue' onclick=\"addOneToNeedTo("+ index +", "+ flag +")\" >添加</a>";
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
	
	if ($('#assetsMoveInTable').hasClass('datagrid-f')) {

	} else {
		$('#assetsMoveInTable').datagrid({
			columns : [ [
			{
				field : 'saDetailedAddress',
				title : '地址/项目',
				width : 30,
				align : 'center'
			},
			{
				field : 'saType',
				title : '所属',
				width : 10,
				align : 'center'
			},	
			{
				field : 'saClassify',
				title : '类型',
				width : 10,
				align : 'center'
			},
			{
				field : 'saName',
				title : '名称',
				width : 20,
				align : 'center'
			},
			{
				field : 'saBrand',
				title : '品牌',
				width : 10,
				align : 'center'
			},
			{
				field : 'saModel',
				title : '型号',
				width : 10,
				align : 'center'
			},
			{
				field : 'saStatus',
				title : '状态',
				width : 10,
				align : 'center'
			},
			{
				field : 'saUse',
				title : '使用情况',
				width : 10,
				align : 'center'
			},
			{
				field : 'do',
				title : '取消',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' style='color:red' onclick=\"myDeleteRows('"+row.saId+"','saId','assetsMoveInTable','0')\">删除</a>";
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
	$("#assetsMoveInTable").datagrid("loadData", []);
	if (flag == 1) {
		$('#doMoveInAssetsButton1').show();
		$('#doMoveInAssetsButton2').hide();
	} else {
		$('#doMoveInAssetsButton1').hide();
		$('#doMoveInAssetsButton2').show();
	}
	$("#moveInAssetsDlg").dialog('open');
	queryAssetsList(1, 0);
}

//执行迁入资产
function doMoveInAssets(flag){
	var rows = $("#assetsMoveInTable").datagrid('getRows');	
	if (rows.length == 0) {
		myTips('请先将待迁入的资产添加到下方列表！', 'error');
		return;
	}
	var checkFlag = 0;
	$('#moveInAssetsDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
			return;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	
	var agentName = $('#pickHtManagerinShowUserInfo').val().split(' ')[$('#pickHtManagerinShowUserInfo').val().split(' ').length-1];
//	var agentName = $('#move_in_asset_staff option:selected').text();
	var moveReason = $('#move_in_asset_reason').val();
	var jsonArray = [];
	for (var i in rows) {
		var jsonObject = {
			registrantName: _loginUserName,
			saRegistrant: _loginUserId,
			department: _loginDepartment,
			storefront: _loginStore,
			agentName: agentName,
			moveReason: moveReason,
			saId: rows[i].saId,
			saHouseStoreId: _houseStoreCoding,
			saHouseId: _houseCoding,
			saMoveFrom: rows[i].saDetailedAddress,
			saMoveTo: _hrAddCommunity + " " + _hrAddBuilding + " " + _hrAddDoorplateno,
			saNumber: rows[i].saNumber,
		};
		jsonArray[i] = jsonObject;
		if (flag == 2) {
			$('#assetsInfoTable2').datagrid('insertRow', {
				index : 0,
				row : rows[i]
			});
		}
	}
	if (flag == 1) {
		showLoading();
		$.post('../moveAssets.action', {
			saId: rows[0].saId,
			jsonArray: JSON.stringify(jsonArray),
		}, function(data) {
			hideLoading();
			if (data.code < 0) {
				$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
				return;
			} else {
				console.log(data.body);
				$('#moveInAssetsDlg').dialog('close');
				myTips('迁移成功！', 'success');
				queryAsset(1, 0);
			}
		});	
	} else {
		_moveSaId = rows[0].saId;
		_moveAsset = _moveAsset.concat(jsonArray);
		$('#moveInAssetsDlg').dialog('close');
	}
}

/**
* 查看资产详情
*/
function openAssetInfo(){
	$('#assetInfoDlg').dialog({
		title : '资产详细信息',
		top : getTop(450),
		left : getLeft(850),
		width : 850,
		height : 450,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function(){
			$('#assetInfoTabs').tabs('select', 0);
		},
		onClose : function() {
			$('#assetInfoDlg [clear="clear"]').val('');
		},
	});
	seeAsset();
	$('#assetInfoDlg').dialog('open');
}
//家私电器信息导入
function queryAsset(page, type) {
	var startNum = (parseInt(page) - 1) * 12;
	var endNum = 12;
	$.post('../assetsInRentDb.action', {
		startNum : startNum,
		endNum : endNum,
		saHouseStoreId : _houseStoreCoding
	}, function(data){
		$('#assetsInfoTable').datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				$("#assetInfo_index").val(rowIndex);
				$('#assetInfoTabs').tabs({
					plain : true,
					fit : true,
					border	: false,
					onSelect : function(title, index) {
						// 获得点击选项卡的列数，调用表格初始化
						initAssetTable(index);
					}
				});
				$("#assetInfoTabs").tabs("select", 0);
				openAssetInfo();
				queryAssetFollow();
			}
		});
		if (data.code < 0) {
			dbSourcePage(0, 0, 14);
			$('#assetsInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum, page, 14);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$('#assetsInfoTable').datagrid('loadData', data.body);
		}
	});
}

/**
* 迁出资产
*/
function moveOutAssets(flag){
	var row;
	if (flag == 1) {
		row = $('#assetsInfoTable').datagrid('getSelected');
	} else if (flag == 2) {
		row = $('#assetsInfoTable2').datagrid('getSelected');
	}
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#move_from_assets_choseHouse').val(_hrAddCommunity + ' ' + _hrAddBuilding + ' ' + _hrAddDoorplateno);
	$('#moveOutAssetsDlg').dialog({
		title : '迁移资产',
		top : getTop(250),
		left : getLeft(540),
		width : 540,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveOutAssetsDlg [clear="clear"]').val('');
			$('#moveOutAssetsDlg [choose="choose"]').val('');
		}
	});
	if (flag == 1) {
		$('#doMoveOutAssetsButton').show();
		$('#doMoveOutAssetsButton2').hide();
	} else {
		$('#doMoveOutAssetsButton').hide();
		$('#doMoveOutAssetsButton2').show();
	}
	$('#moveOutAssetsDlg').dialog('open');
}
/**
* 执行迁出资产
*/
function doMoveOutAssets(flag){

	var row;
	if (flag == 1) {
		row = $('#assetsInfoTable').datagrid('getSelected');
	} else if (flag == 2) {
		row = $('#assetsInfoTable2').datagrid('getSelected');
	}
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var saHouseStoreId = $('#move_to_assets_houseStoreCoding').val();
	var saHouseId = $('#move_to_assets_houseCoding').val();
	var saMoveFrom = $('#move_from_assets_choseHouse').val();
	var saMoveTo = $('#move_to_assets_choseHouse').val();
	var agentName = $('#pickHtManagertShowUserInfo').val().split(' ')[$('#pickHtManagertShowUserInfo').val().split(' ').length-1];
//	var agentName = $('#move_to_asset_staff option:selected').text();
	var moveReason = $('#move_to_asset_reason').val();
	var checkFlag = 0;
	$('#moveOutAssetsDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
			return;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	if (saHouseStoreId == row.saHouseStoreId && saHouseId == row.saHouseId) {
		myTips('该资产无须迁移','error');
		return;
	}
	
	var jsonArray = [];
	var jsonObject = {
		registrantName: _loginUserName,
		saRegistrant: _loginUserId,
		department: _loginDepartment,
		storefront: _loginStore,
		agentName: agentName,
		moveReason: moveReason,
		saId: row.saId,
		saHouseStoreId: saHouseStoreId,
		saHouseId: saHouseId,
		saMoveFrom: saMoveFrom,
		saMoveTo: saMoveTo,
		saNumber: row.saNumber,
	};
	jsonArray[0] = jsonObject;
	if (flag == 1) {
		showLoading();
		$.post('../moveAssets.action', {
			saId: row.saId,
			jsonArray: JSON.stringify(jsonArray),
		}, function(data) {
			hideLoading();
			if (data.code < 0) {
				$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
				return;
			} else {
				$('#moveOutAssetsDlg').dialog('close');
				myTips('迁移成功！', 'success');
				queryAsset(1);
			}
		});
	} else {
		var rowIndex = $('#assetsInfoTable2').datagrid('getRowIndex', row);
		$('#assetsInfoTable2').datagrid('deleteRow', rowIndex);
		_moveSaId = row.saId;
		_moveAsset = _moveAsset.concat(jsonArray);
		$('#moveOutAssetsDlg').dialog('close');
	}
}
//资产导入信息
function queryAssetsList(page, type) {
	var startNum = (parseInt(page) - 1) * 5;
	var endNum = 5;
	var searchCommunity = $('#searchCommunity_asset').val();
	var searchBuilding = $('#searchBuilding_asset').val();
	var searchDoorplateno = $('#searchDoorplateno_asset').val();
	var searchVirtualType = $('#searchVirtualType_asset').val();
	var searchVirtualName = $('#searchVirtualName_asset').val();
	var saType = $('#searchSaType').val();
//	var saUse = $('#searchSaUse').val();
	var saNumber = $('#searchSaNumber').val();
	var saName = $('#searchSaName').val();
	var saBrand = $('#searchSaBrand').val();
	var saModel = $('#searchSaModel').val();

	$.post("../assetsInRentDb.action", {
		startNum: startNum,
		endNum : endNum,
		addCommunity: searchCommunity,
		addBuilding: searchBuilding,
		addDoorplateno: searchDoorplateno,
		virtualType: searchVirtualType,
		keyAdministrator: searchVirtualName,
		saType: saType,
//		saUse: saUse,
		saNumber: saNumber,
		saName: saName,
		saBrand: saBrand,
		saModel: saModel,
	}, function(data) {
		if (data.code < 0) {
			dbSourcePage(0, 0, 20);
			$('#assetsListTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum, page, 20);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$("#assetsListTable").datagrid("loadData", data.body);
		}
	});
}
//添加一条资产到需要迁入的资产列表里
function addOneToNeedTo(index, flag){
	var row = $('#assetsListTable').datagrid('getData').rows[index];
	var rows = $('#assetsMoveInTable').datagrid('getRows');
	var rows2;
	if (flag == 1) {
		rows2 = $('#assetsInfoTable').datagrid('getRows');
	} else {
		rows2 = $('#assetsInfoTable2').datagrid('getRows');
	}
	for (var i in rows) {
		if (rows[i].saId == row.saId) {
			myTips('此条资产已经添加到下方列表！','error');
			return;
		}
	}
	for (var i in rows2) {
		if (rows2[i].saId == row.saId) {
			myTips('该资产已在该房内，无需迁移！','error');
			return;
		}
	}
	$('#assetsMoveInTable').datagrid('insertRow', {
		index : 0,
		row : row
	});
}
function getCurrentMonthLast(date) {
	var currentMonth = date.getMonth();
	var nextMonth = ++currentMonth;
	var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
	var oneDay = 1000 * 60 * 60 * 24;
	var lastTime = new Date(nextMonthFirstDay - oneDay);
	var month = parseInt(lastTime.getMonth() + 1);
	var day = lastTime.getDate();
	if (month < 10) {
		month = '0' + month
	}
	if (day < 10) {
		day = '0' + day
	}
	return new Date(date.getFullYear() + '-' + month + '-' + day);
}
function countTotalFee() {
	var beginTime = $('#addHrBegin').val();
	var totalFee = 0.00;
	if ($("#advanceMode").val() == 2) {//整月
		totalFee = countBugMonth(beginTime, 2);
	} else {
		totalFee = countBugMonth(beginTime, 1);
	}
	$("#totalFee").val(totalFee);
}
function countBugMonth(addSourceBegin, type) {//类型为3时，仅返回整月租金。为2时，返回整月费用总额。为1时，返回自然月费用总额
	var totalMoney = parseFloat($('#addHrRentPrice').val());
	var newDate = new Date(addSourceBegin);
	var lastDate = getCurrentMonthLast(newDate);
	lastDate = new Date(lastDate).format('yyyy-MM-dd hh:mm:ss');
	var days = (new Date(lastDate).getTime() - new Date(newDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
	var totalDate = getCurrentMonthLast(newDate).getDate();
	if (type == 3) {
		return Math.abs((totalMoney / totalDate) * days).toFixed(2);
	}
	if (type == 2) {
		totalMoney = 0.00;
		var inputArray = $('.setRenterNewFinancialDiv input');
		for (var i = 0; i < inputArray.length - 1; i++) {
			if ($("#" + inputArray[i].id).val() == "") {
				continue;
			}
			if (inputArray[i].className.indexOf('payment') > -1) {
				var temporary = (parseFloat($('#' + inputArray[i].id).val()) / totalDate) * days;
				totalMoney = mySum(totalMoney, temporary);
			} else {
				totalMoney = mySum(totalMoney, parseFloat($("#" + inputArray[i].id).val()));
			}
		}
	}
	if (type == 1) {
		totalMoney = 0.00;
		var inputArray = $('.setRenterNewFinancialDiv input');
		console.log(inputArray.length);
		for (var i = 0; i < inputArray.length - 1; i++) {
			if ($("#" + inputArray[i].id).val() == "") {
				continue;
			}
			totalMoney = mySum(parseFloat(totalMoney), parseFloat($("#" + inputArray[i].id).val()));
		}
	}
	return Math.abs(totalMoney).toFixed(2);
}

function simpleCountBugMonth(addSourceBegin, value) {
	var newDate = new Date(addSourceBegin);
	var lastDate = getCurrentMonthLast(newDate);
	lastDate = new Date(lastDate).format('yyyy-MM-dd hh:mm:ss')
	var days = (new Date(lastDate).getTime() - new Date(newDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
	var totalDate = getCurrentMonthLast(newDate).getDate();
	var totalMoney = (value / totalDate) * days;
	return Math.abs(totalMoney).toFixed(2);
}