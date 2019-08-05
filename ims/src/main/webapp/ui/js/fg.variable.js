$(function() {
	console.log(_acountType);
	console.log(_eventApprovalType);
	var _updateNewFinancial = null;
	$("#intendedSourceDiv").append('<select id="intendedSourceSelect"  size="' + _intendedSource.length + '"  style="height: 300px;width: 150px;"></select>');
	$("#bankTypeDiv").append('<select id="bankTypeSelect"  size="' + _bankType.length + '"  style="height: 300px;width: 150px;"></select>');
	$("#eventApprovalTypeDiv").append('<select id="eventApprovalTypeSelect"  size="' + _eventApprovalType.length + '"  style="height: 300px;width: 150px;"></select>');
	$("#acountTypeDiv").append('<select id="acountTypeSelect"  size="' + _acountType.length + '"  style="height: 300px;width: 150px;"></select>');
	$("#taskTypeDiv").append('<select id="taskTypeSelect"  size="'+_taskType.length+'"  style="height: 300px;width: 150px;"></select>');
	$("#userTypeDiv").append('<select id="userTypeSelect"  size="' + _userType.length + '"  style="height: 300px;width: 150px;"></select>');
	$("#outsideCustomerSourceDiv").append('<select id="outsideCustomerSourceSelect" size="' + _outsideCustomerSource.length + '"  style="height: 300px;width: 150px;"></select>');
	$("#outsideCustomerTypeDiv").append('<select id="outsideCustomerTypeSelect" size="' + _outsideCustomerType.length + '"  style="height: 300px;width: 150px;"></select>');
	$("#outsideCustomerScaleDiv").append('<select id="outsideCustomerScaleSelect" size="' + _outsideCustomerScale.length + '"  style="height: 300px;width: 150px;"></select>');
	$("#outsideCustomerContactsPostDiv").append('<select id="outsideCustomerContactsPostSelect" size="' + _outsideCustomerContactsPost.length + '"  style="height: 300px;width: 150px;"></select>');
	
	$("#newFinancialNatureDiv").append('<span>收支性质</span><br><select id="newFinancialNatureSelect"  size="20"  style="height: 300px;width: 150px;" onchange="selectFinancial(0);selectFinancial(1);"></select>');
	$("#newFinancialBigTypeDiv").append('<span>收支分类</span><br><select id="newFinancialBigTypeSelect"  size="20"  style="height: 300px;width: 150px;" onchange="selectFinancial(1)"></select>');
	$("#newFinancialTypeDiv").append('<span>收支种类</span><br><select id="newFinancialTypeSelect"  size="20"  style="height: 300px;width: 150px;" onchange="selectFinancial(2)"></select>');
	
	$("#assetsTypeDiv").append('<span>资产类别</span><br><select id="assetsTypeSelect"  size="20"  style="height: 300px;width: 150px;" onchange="selectAssetsType()"></select>');
	$("#assetsNameDiv").append('<span>资产名称</span><br><select id="assetsNameSelect"  size="20"  style="height: 300px;width: 150px;" ></select>');
	
	$("#suppliesTypeDiv").append('<span>耗材类别</span><br><select id="suppliesTypeSelect"  size="20"  style="height: 300px;width: 150px;" onchange="selectSuppliesType()"></select>');
	$("#suppliesNameDiv").append('<span>耗材名称</span><br><select id="suppliesNameSelect"  size="20"  style="height: 300px;width: 150px;" ></select>');
	
	$("#speedLeftMenuAllDiv").append('<span>所有菜单</span><br><select id="speedLeftMenuAllSelect"  size="20"  style="height: 300px;width: 150px;"></select>');
	$("#speedLeftMenuDiv").append('<span>权限名：<select id="puriviewSelect" onchange="setSpeedLeftSelect()"></select></span><br><select id="speedLeftMenuSelect"  size="20"  style="height: 300px;width: 150px;"></select>');
	
	$("#storefrontDiv").append('<span>所有区域</span><br><select id="storefrontSelect" onchange="setAccount()"  size="20"  style="height: 300px;width: 150px;"></select>');
	selectSysVariables();

	selectStorefront();		//区域查询

});

_updateNewFinancial = _newFinancial;
_updateAssetsType = _assetsType;
_updateSuppliesType = _suppliesType;


//收租日期范围正则校验
function verify(type){
	var v=$(type).val();
	var reg=/^[-+]?\d*$/;
	if(!reg.test(v)){
		$(type).val("");
	}else{
		if(v>31){
			$(type).val("");
		}
	}
}

//收租日期开关按钮
function timeOnAndOff(){
	if($("#timeOnAndOff").is(':checked')){
		$("#scope").show();
	}else{
		$("#scope").hide();
	}
	
}
//门锁二次授权开关按钮
function doorLockAuthorization() {
	console.log(11111)
	if($("#doorLockAuthorization").is(':checked')){
		$.messager.confirm("操作提示", "是否进行短信收费？", function(data) {
			if (data) {
				$("#authorizedFee").val("1")
			}else{
				$("#authorizedFee").val("2")
				return;
			}
		});
	}
	else{
		$("#authorizedFee").val("2")
	}
}

//查询账号信息
function setAccount(){
	
	var storefrontAccountId=$("#storefrontSelect option:selected").val();
	var fa = $("#storeAcoountDiv");
	fa.find('.accountType option').remove();
	selectNamePublic(storefrontAccountId,fa);

}

//区域查询
function selectStorefront(){
	$.post("../queryStorefront.action", {

	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '查询失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for(var i in data){
			$("#storefrontSelect").append("<option id='"+data[i].storefrontId+"' value='" + data[i].storefrontAccountId + "'>" + data[i].storefrontName + "</option>");
		}
		var accountId = data[0].storefrontAccountId;
		var fa = $("#storeAcoountDiv");
		selectNamePublic(accountId,fa);

	});
}
//封装查询账户方法
function selectNamePublic(accountId,fa){

	fa.find('.accountType').append('<option></option>');
	fa.find('.accountName').append('<option></option>');
	for (var j in _acountType) {
		fa.find('.accountType').append("<option value='" + _acountType[j] + "'>" + _acountType[j] + "</option>");
	}

	if(accountId != null && accountId != ""){
		$.ajax({
			type:"post",
			url:"../selectNamePublic.action",
			data:{
				faId :accountId
			},
			dataType:"json",
			async:false,
			success:function(account){
				fa.find(".accountName").empty();
				fa.find(".accountType").val(account.body[0].faPaymentType);
				//为了查出该种类的其他数据
				$.ajax({
					type:"post",
					url:"../selectNamePublic.action",
					data:{
						faPaymentType: account.body[0].faPaymentType
					},
					dataType:"json",
					async:false,
					success:function(result){
						for (var k in result.body) {
							if(result.body[k].faId == accountId){
								fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "' selected='selected'>" + result.body[k].faUserName + "</option>");
								fa.find('.accountType').val(result.body[k].faPaymentType);
								fa.find(".accountId").val(result.body[k].faId);
								fa.find(".accountNum").val(result.body[k].faAccount);
								fa.find(".accountBelong").val(result.body[k].faBelonging);
							}else{
								fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "'>" + result.body[k].faUserName + "</option>");
							}
						}
					}
				})
			}
		})
	}
}
//区域 账号保存
function doSaveAccount(evet){
	var storefrontSelect =  $("#storefrontSelect").find("option:selected").text();
	if(storefrontSelect==''||storefrontSelect==null){
		$("#storefrontSelectTips").html("请选择一个区域进行修改！");
		return;
	}
	$("#storefrontSelectTips").html("");
	//获取区域ID
	var storefrontId=$("#storefrontSelect option:selected").attr("id")
	//获取账号ID
	var faId=$("#faId").val()
	$.post("../updateStorefront.action",{
		storefrontAccountId     : faId,
		storefrontId 			: storefrontId
		},function(data) {
			if (data.code < 0) {
				$.messager.alert('通知', '保存失败！原因：' + data.msg, 'error');
				return;
			}
			myTips("修改成功！","success");
	})

}

function selectSysVariables(){
	$("select").empty();
	$("#mskey1").append('<option></option>' +
		'<option >请勿打扰</option>' +
		'<option >保洁服务</option>'+
		'<option >已入住</option>' );
	$("#mskey2").append('<option></option>' +
		'<option >请勿打扰</option>' +
		'<option >保洁服务</option>'+
		'<option >已入住</option>' );
	$("#mskey0").append('<option></option>' +
		'<option >请勿打扰</option>' +
		'<option >保洁服务</option>'+
		'<option >已入住</option>' );
	$("#msjsrsuRefundRoomCharge").append('<option></option>' +
		'<option value="1">允许</option>' +
		'<option value="0">不允许</option>' );
	$("#msjsrsuState").append('<option></option>' +
		'<option value="1">是</option>' +
		'<option value="0">否</option>' );
	$("#mshourRoom").append('<option></option>' +
		'<option value="1">1小时</option>' +
		'<option value="2">2小时</option>' +
		'<option value="3">3小时</option>' +
		'<option value="4">4小时</option>' +
		'<option value="5">5小时</option>'+
		'<option value="6">6小时</option>' );
	$("#key1").append('<option></option>' +
		'<option >请勿打扰</option>' +
		'<option >保洁服务</option>'+
		'<option >已入住</option>' );
	$("#key2").append('<option></option>' +
		'<option >请勿打扰</option>' +
		'<option >保洁服务</option>'+
		'<option >已入住</option>' );
	$("#key0").append('<option></option>' +
		'<option >请勿打扰</option>' +
		'<option >保洁服务</option>'+
		'<option >已入住</option>' );
	$("#jsrsuRefundRoomCharge").append('<option></option>' +
		'<option value="1">允许</option>' +
		'<option value="0">不允许</option>' );
	$("#jsrsuState").append('<option></option>' +
		'<option value="1">是</option>' +
		'<option value="0">否</option>' );
	$("#hourRoom").append('<option></option>' +
		'<option value="1">1小时</option>' +
		'<option value="2">2小时</option>' +
		'<option value="3">3小时</option>' +
		'<option value="4">4小时</option>' +
		'<option value="5">5小时</option>'+
		'<option value="6">6小时</option>' );
	$("#doorCardSystem1").append('<option></option>' +
		'<option value="2">2</option>' +
		'<option value="4">4</option>' +
		'<option value="8">8</option>' +
		'<option value="10">10</option>' +
		'<option value="16">16</option>');
	var userId;
	$.post("../selectSysVariables.action", {
		variablesId:1
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		console.log(data)
		var timeScope=eval('(' + data[0].timeScope+ ')');
		timeScope = eval('(' +timeScope+ ')');
		$("#daymin").val(timeScope.daymin);
		$("#daymax").val(timeScope.daymax);
		if(data[0].timeOnAndOff == 1){
			$("#timeOnAndOff").attr("checked",true);
		}else{
			$("#timeOnAndOff").attr("checked",false);
		}
		_timeScope = timeScope;
		_timeOnAndOff = data[0].timeOnAndOff;
		timeOnAndOff();
		for(var i in data[0]){

			if(i=='contractNums'){
				data[0][i]==1 ? $("#contractNums").prop('checked', true) :$("#contractNums").prop('checked', false);
			}else if(i=='billNum'){
				data[0][i]==1 ? $("#billNum").prop('checked', true) :$("#billNum").prop('checked', false);
			}else if(i=='comfirmNum'){
				data[0][i]==1 ? $("#comfirmNum").prop('checked', true) :$("#comfirmNum").prop('checked', false);
			}else if(i=='doorplateno'){
				data[0][i]==1 ? $("#doorplateno").prop('checked', true) :$("#doorplateno").prop('checked', false);
			}else if(i=='contractRiskControl'){
				data[0][i]==1 ? $("#contractRiskControl").prop('checked', true) :$("#contractRiskControl").prop('checked', false);
			}

			else if(i=='forcedFollowupSwitch'){
				data[0][i]==1 ? $("#forcedFollowupSwitch").prop('checked', true) :$("#forcedFollowupSwitch").prop('checked', false);
			}else if(i=='forcedFollowupValues'){
				$("#forcedFollowupValues").val(
					data[0][i]);
			}



			else if(i=='moneySwitch'){
				data[0][i]==1 ? $("#moneySwitch").prop('checked', true) :$("#moneySwitch").prop('checked', false);
			}else if(i=='moneyValues'){
				$("#moneyValues").val(
					data[0][i]);
			}




			else if(i=='campusMessageSwitch'){
				data[0][i]==1 ? $("#campusMessageSwitch").prop('checked', true) :$("#campusMessageSwitch").prop('checked', false);
			}else if(i=='autoSendMessage'){
				data[0][i]==1 ? $("#autoSendMessage").prop('checked', true) :$("#autoSendMessage").prop('checked', false);
			}else if(i=='autoSendMessageDays'){
				$("#autoSendMessageDays").val(data[0][i]);
			}else if(i=='maxOverdue'){
				data[0][i]==1 ? $("#maxOverdue").prop('checked', true) :$("#maxOverdue").prop('checked', false);
			}else if(i=='maxOverdueDays'){
				$("#maxOverdueDays").val(data[0][i]);
			}else if(i=='doorLockAuthorization'){
				data[0][i]==1 ? $("#doorLockAuthorization").prop('checked', true) :$("#doorLockAuthorization").prop('checked', false);
			} else if(i=='authorizedFee'){
				$("#authorizedFee").val(data[0][i]);
			}else if(i=='waterDailyVariable'){
				$("#waterDailyVariable").val(data[0][i]);
			}else if(i=='waterContinuityVariable'){
				$("#waterContinuityVariable").val(data[0][i]);
			}else if(i=='doorCardSystem'){
				$("#doorCardSystem1").find("option:selected").text(data[0][i])
            }else if(i=='meterReadingSwitch'){
				data[0][i]==1 ? $("#meterReadingSwitch").prop('checked', true) :$("#meterReadingSwitch").prop('checked', false);
			}else if(i=='meterReadingTimes'){
				$("#meterReadingTimes").val(data[0][i]);
			}else if(i=='newFinancial'){
				_updateNewFinancial = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _updateNewFinancial) {
					$("#newFinancialNatureSelect").append("<option value='" + i + "'>" + _updateNewFinancial[i].nature + "</option>");
				}
				$("#newFinancialNatureSelect").val(0);
				selectFinancial(0);
				selectFinancial(1);
			}else if(i=='taskType'){
				_taskType = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _taskType) {
					$("#taskTypeSelect").append("<option value='" + _taskType[i].variable+ "'>" + _taskType[i].variable+ "</option>");
				}
				$("#taskTypeSelect").val(0);

			}else if(i=='userType'){
				_userType = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _userType) {

					$("#userTypeSelect").append("<option value='" + _userType[i].variable+ "'>" + _userType[i].variable+ "</option>");
				}
				$("#userTypeSelect").val(0);
			}else if(i=='outsideCustomerSource'){
				_outsideCustomerSource = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _outsideCustomerSource) {

					$("#outsideCustomerSourceSelect").append("<option value='" + _outsideCustomerSource[i].variable+ "'>" + _outsideCustomerSource[i].variable+ "</option>");
				}
				$("#outsideCustomerSourceSelect").val(0);
			}else if(i=='outsideCustomerType'){
				_outsideCustomerType = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _outsideCustomerType) {

					$("#outsideCustomerTypeSelect").append("<option value='" + _outsideCustomerType[i].variable+ "'>" + _outsideCustomerType[i].variable+ "</option>");
				}
				$("#outsideCustomerTypeSelect").val(0);
			}else if(i=='outsideCustomerScale'){
				_outsideCustomerScale = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _outsideCustomerScale) {

					$("#outsideCustomerScaleSelect").append("<option value='" + _outsideCustomerScale[i].variable+ "'>" + _outsideCustomerScale[i].variable+ "</option>");
				}
				$("#outsideCustomerScaleSelect").val(0);
			}else if(i=='outsideCustomerContactsPost'){
				_outsideCustomerContactsPost = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _outsideCustomerContactsPost) {

					$("#outsideCustomerContactsPostSelect").append("<option value='" + _outsideCustomerContactsPost[i].variable+ "'>" + _outsideCustomerContactsPost[i].variable+ "</option>");
				}
				$("#outsideCustomerContactsPostSelect").val(0);
			}else if(i=="assetsType"){
				_updateAssetsType = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _updateAssetsType) {
					$("#assetsTypeSelect").append("<option value='" + i + "'>" + _updateAssetsType[i].type + "</option>");
				}
				$("#assetsTypeSelect").val(0);
				selectAssetsType();
			}else if(i=="suppliesType"){
				_suppliesType = eval('(' + data[0][i].getRealJsonStr() + ')');
				for(var i in _updateAssetsType) {
					$("#suppliesTypeSelect").append("<option value='" + i + "'>" + _updateAssetsType[i].type + "</option>");
				}
				$("#suppliesTypeSelect").val(0);
				selectSuppliesType();
			}else if(i=='onDutyRepairer'){
				userId = data[0][i];
				for(var j in _userInfoData){
					if(userId == _userInfoData[j].userId){
						$("#repairShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
						$("#repairGetUserStoreId").val(_userInfoData[j].suStoreId);
						$("#repairGetUserDetId").val(_userInfoData[j].suDepartmentId);
						$("#repairGetUserId").val(_userInfoData[j].userId);
					}
				}
			}else if(i=='wxpayAccount' || i=='shortRentAccount' || i=='shopAccount' || i == 'shopCashAccount'){
				var fa = $("#" + i);

				fa.find('.accountType').append('<option></option>');
				fa.find('.accountName').append('<option></option>');
				for (var j in _acountType) {
					fa.find('.accountType').append("<option value='" + _acountType[j] + "'>" + _acountType[j] + "</option>");
				}
				var accountId = data[0][i];
				if(data[0][i] != null && data[0][i] != ""){
					$.ajax({
						type:"post",
						url:"../selectNamePublic.action",
						data:{
							faId:accountId
						},
						dataType:"json",
						async:false,
						success:function(account){
							fa.find(".accountName").empty();
							fa.find(".accountType").val(account.body[0].faPaymentType);
							//为了查出该种类的其他数据
							c(account.body[0].faPaymentType)
							$.ajax({
								type:"post",
								url:"../selectNamePublic.action",
								data:{
									faPaymentType: account.body[0].faPaymentType,
								},
								dataType:"json",
								async:false,
								success:function(result){
									for (var k in result.body) {
										if(result.body[k].faId == accountId){
											fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "' selected='selected'>" + result.body[k].faUserName + "</option>");
											fa.find('.accountType').val(result.body[k].faPaymentType);
											fa.find(".accountId").val(result.body[k].faId);
											fa.find(".accountNum").val(result.body[k].faAccount);
											fa.find(".accountBelong").val(result.body[k].faBelonging);
										}else{
											fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "'>" + result.body[k].faUserName + "</option>");
										}
									}
								}
							})
						}
					})
				}
			}else if(i=='gzhAd'){
				var gzhAd = data[0][i].getRealJsonStr();
				if(gzhAd!=null && gzhAd!='' ){
					var ad = JSON.parse(gzhAd);
					$('#img1').val(ad.img1);
					$('#img2').val(ad.img2);
					$('#img3').val(ad.img3);
					$('#img4').val(ad.img4);
					$('#img5').val(ad.img5);
					$('#img6').val(ad.img6);
					$('#a1').val(ad.a1);
					$('#a2').val(ad.a2);
					$('#a3').val(ad.a3);
					$('#a4').val(ad.a4);
					$('#a5').val(ad.a5);
					$('#a6').val(ad.a6);
				}
			}else if(i=='imgPath'){

			}else if(i=='chargePercentage'){
				$('#chargePercentage').val(data[0][i]);
			}else if(i=='chargeReminder'){
				$('#chargeReminder').val(data[0][i]);
			}else if(i=='intendedSource' || i=='eventApprovalType' || i=='bankType'||i=='acountType'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				var variableArray = [];
				for(var j in variableJson){
					variableArray.push(variableJson[j].variable)
				}
				for(var j in variableArray) {
					$("#"+i+"Select").append("<option value='" + j + "'>" + variableArray[j] + "</option>");
				}
			}else if(i =="companyAbbreviation"){
				$('#companyAbbreviation').val(data[0][i]);
			}else if(i =="customerServiceTel"){
				$('#customerServiceTel').val(data[0][i]);
			}else if(i=='lateFeeRate'){
				$('#lateFeeRate').val(data[0][i]);
			}else{
				//其他变量不处理
				//contractTemplateNumber
				//variablesId
				//defaultContact
				//console.log(i);
			}
			/*else if(i!="defaultContact"){
				var variableJson = eval('(' + data[0][i] + ')');
				var variableArray = [];
				for(var j in variableJson){
					variableArray.push(variableJson[j].variable)
				}
				for(var j in variableArray) {
					$("#"+i+"Select").append("<option value='" + j + "'>" + variableArray[j] + "</option>");
				}
			}*/
		}
	});
	for(var i in _speedMenusAll){
		$("#speedLeftMenuAllSelect").append("<option value='" + i + "'>" + _speedMenusAll[i].tabname + "</option>");
	}
	$.post("../selectPurvuceAll.action", {

	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		console.log(data);
		for(var i in data){
			$("#puriviewSelect").append("<option value='" + data[i].spId + "########" +data[i].spSpeedLeft.getRealJsonStr() + "'>" + data[i].spName + "</option>");
		}
		setSpeedLeftSelect();
	}, "json");
}

function setSpeedLeftSelect(){
	if(typeof($("#puriviewSelect").val()) != "undefined"){
		var puriviewSelect = null;
		puriviewSelect = $("#puriviewSelect").val().split("########")[1];
		$("#speedLeftMenuSelect").empty();
		if(puriviewSelect!=null && puriviewSelect!=''){
			puriviewSelect = eval(puriviewSelect);
			for(var i in puriviewSelect){
				$("#speedLeftMenuSelect").append("<option value='" + i + "'>" + puriviewSelect[i].tabname + "</option>");
			}
		}
	}

}
function addSpeedLeftSelect(){
	var speedLeftMenuAllSelect =  $("#speedLeftMenuAllSelect").find("option:selected").text();
	if(speedLeftMenuAllSelect==''||speedLeftMenuAllSelect==null){
		$("#speedLeftMenuTips").html("请选择一个菜单用于添加！");
		return;
	}
	var speedLeftMenuSelect =  $("#speedLeftMenuSelect option");
	var speedLeftMenuSelectNums =  $("#speedLeftMenuSelect option").length;
	var checkFlag = 0;
	for(var i in speedLeftMenuSelect){
		if(getInnerText(speedLeftMenuSelect[i])==speedLeftMenuAllSelect){
			checkFlag++;
		}
	}
	if(checkFlag!=0){
		$("#speedLeftMenuTips").html("已有此菜单，不能重复添加！");
		return;
	}
	$("#speedLeftMenuSelect").append("<option value='" + speedLeftMenuSelectNums + "'>" + speedLeftMenuAllSelect + "</option>");
	$("#speedLeftMenuSelect").val(speedLeftMenuSelectNums);
	$("#speedLeftMenuTips").html("");
}

/*--------电话无跟进模块--------
*修改 forcedFollowupValues 和 suFollowupValue
* doSaveVariable()   修改不了sys_users 的su_followup_value 字段
* */
function suVollowupValue() {
	var a =$("#forcedFollowupValues").val();
	$.post("../updateUserFollowupValue.action", {suFollowupValue:a}, function(data) {
		if(data.code < 0){
			myTips(data.msg, "error");
			return;

		}
		myTips("修改成功", "success");
		doSaveVariable('forcedFollowupValues');
	});
}



function saveSpeedLeftSelect(){
	var speedLeftMenuSelect =  $("#speedLeftMenuSelect option");
	var spId = $("#puriviewSelect").val().split("########")[0];
	var spSpeedLeft = [];
	for(var j in speedLeftMenuSelect){
		for(var i in _speedMenusAll){
			if(_speedMenusAll[i].tabname==getInnerText(speedLeftMenuSelect[j])){
				spSpeedLeft.push(_speedMenusAll[i]);

			}
		}
	}
	spSpeedLeft = JSON.stringify(spSpeedLeft);
	showLoading();
	$.post("../updateLeftMenuPurview.action", {
		spId:spId,
		spSpeedLeft:spSpeedLeft,
	}, function(upData) {
		hideLoading();
		if (upData.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + upData.msg, 'error');
			return;
		}
		upData = upData.body;
		$.post("../selectPurvuceAll.action", {
			spId:spId,
		}, function(data) {
			if (data.code < 0) {
				$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
				return;
			}
			data = data.body;
			if(data){
				$("#puriviewSelect").empty();
				for(var i in data){
					if(data[i].spId == spId ){
						$("#puriviewSelect").append("<option selected = 'selected'  value='" + data[i].spId + "########" +data[i].spSpeedLeft.getRealJsonStr() + "'>" + data[i].spName + "</option>");
					}else{
						$("#puriviewSelect").append("<option value='" + data[i].spId + "########" +data[i].spSpeedLeft.getRealJsonStr() + "'>" + data[i].spName + "</option>");
					}
				}
				setSpeedLeftSelect();
				myTips("修改成功！","success");
			}
		}, "json");
	}, "json");
}



function ctrlSelect(id, t, f) {
	if(f == 0) {
		$("#" + id + "Tips").html("");
		$("#" + id + "Show").hide();
	} else if(f==1 || f==2 || f==3 ) {
		$("#newFinancialTips").html("");
		if(t != 1 && t != 3) {
			$("#newFinancialDiv input").hide();
		}
	}else if(f==4 || f==5 ) {
		$("#assetsTips").html("");
		if(t != 1 && t != 3) {
			$("#assetsDiv input").hide();
		}
	}
	if(t == 0) { //打开添加
		if(f == 3) {
			if(!($("#newFinancialBigTypeSelect").val())) {
				$("#newFinancialTips").html("请先选择一个可用收支分类！");
				return;
			}
		}
		$("#" + id + "Add").val("");
		$("#" + id + "Add").show();
		$("#" + id + "AddButton").show()
		$("#" + id + "Update").val("");
		$("#" + id + "UpdateIndex").val("");
		$("#" + id + "Update").hide();
		$("#" + id + "UpdateButton").hide();
	} else if(t == 1) { //执行添加
		var obj = document.getElementById(id + "Select");
		var options = obj.options;
		var addValIndex = obj.options.length;
		var addVal = $("#" + id + "Add").val();
		if(addVal == '') {
			if(f == 0) {
				$("#" + id + "Tips").html("不能添加空值！");
			} else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("不能添加空值！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("不能添加空值！");
			}
			return;
		}
		var checkFlag = 0;
		for(var i in options){
			if(addVal==options[i].text){
				checkFlag++;
			}
		}
		if(checkFlag != 0) {
			if(f == 0) {
				$("#" + id + "Tips").html("已经有相同的值，不能重复添加！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("已经有相同的值，不能重复添加！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("已经有相同的值，不能重复添加！");
			}
			return;
		}
		$("#" + id + "Select").append("<option value='" + addValIndex + "'>" + addVal + "</option>");
		$("#" + id + "Add").hide();
		$("#" + id + "AddButton").hide();
		$("#" + id + "Update").val("");
		$("#" + id + "UpdateIndex").val("");
		$("#" + id + "Update").hide();
		$("#" + id + "UpdateButton").hide();
		$("#" + id + "Select").val(addValIndex);

		var nature = $("#newFinancialNatureSelect").find("option:selected").text();
		var bigType = $("#newFinancialBigTypeSelect").find("option:selected").text();
		var type = $("#newFinancialTypeSelect").find("option:selected").text();
		if(f == 1) {
			_updateNewFinancial.push({
				nature: addVal,
				types: []
			});
			selectFinancial(0);
			selectFinancial(1);
		} else if(f == 2) {
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					_updateNewFinancial[i].types.push({
						bigType: addVal,
						type: []
					});
				}
			}
			selectFinancial(1);
		} else if(f == 3) {
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(bigType == _updateNewFinancial[i].types[j].bigType) {
							_updateNewFinancial[i].types[j].type.push(addVal);
						}
					}
				}
			}
		}

		var assetsType = $("#assetsTypeSelect").find("option:selected").text();
		var assetsName = $("#assetsNameSelect").find("option:selected").text();
		if(f == 4) {
			_updateAssetsType.push({
				type: addVal,
				name: []
			});
			selectAssetsType();
		} else if(f == 5) {
			for(var i in _updateAssetsType) {
				if(assetsType == _updateAssetsType[i].type) {
					_updateAssetsType[i].name.push(addVal);
				}
			}
		}
	} else if(t == 2) { //打开修改
		var selectVal = $("#" + id + "Select").val();
		var selectText = $("#" + id + "Select").find("option:selected").text();
		if(!selectText || selectText == '') {
			if(f == 0) {
				$("#" + id + "Tips").html("请选择一个值进行修改！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("请选择一个值进行修改！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("请选择一个值进行修改！");
			}
			return;
		}
		$("#" + id + "Update").val(selectText);
		$("#" + id + "UpdateIndex").val(selectVal);
		$("#" + id + "Update").show();
		$("#" + id + "UpdateButton").show()
		$("#" + id + "Add").val("");
		$("#" + id + "Add").hide();
		$("#" + id + "AddButton").hide();
	} else if(t == 3) { //执行修改
		var nature = $("#newFinancialNatureSelect").find("option:selected").text();
		var natureVal = $("#newFinancialNatureSelect").val();

		var bigType = $("#newFinancialBigTypeSelect").find("option:selected").text();
		var bigVal = $("#newFinancialBigTypeSelect").val();

		var type = $("#newFinancialTypeSelect").find("option:selected").text();
		var typeVal = $("#newFinancialTypeSelect").val();

		var assetsType =    $("#assetsTypeSelect").find("option:selected").text();
		var assetsTypeVal = $("#assetsTypeSelect").val();

		var assetsName = $("#assetsNameSelect").find("option:selected").text();
		var assetsNameVal = $("#assetsNameSelect").val();

		var inputText = $("#" + id + "Update").val();
		var inputIndex = $("#" + id + "UpdateIndex").val();
		if(inputText == '') {
			if(f == 0) {
				$("#" + id + "Tips").html("不能设置空值！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("不能设置空值！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("不能设置空值！");
			}
			return;
		}
		var obj = document.getElementById(id + "Select");
		var options = obj.options;
		var newArray = [];
		var checkFlag = 0;
		for(var i = 0, len = options.length; i < len; i++) {
			if(inputText==options[i].text && inputIndex!=i){
				checkFlag++;
			}
		}
		if(checkFlag != 0) {
			if(f == 0) {
				$("#" + id + "Tips").html("已经有相同的值，不能重复添加！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("已经有相同的值，不能重复添加！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("已经有相同的值，不能重复添加！");
			}
			return;
		}
		for(var i = 0, len = options.length; i < len; i++) {
			if(i == inputIndex) {
				newArray.push(inputText)
			} else {
				newArray.push(options[i].text)
			}
		}
		$("#" + id + "Select").empty();
		for(var i in newArray) {
			$("#" + id + "Select").append("<option value='" + i + "'>" + newArray[i] + "</option>");
		}
		$("#" + id + "Update").hide();
		$("#" + id + "UpdateButton").hide();
		$("#" + id + "Add").hide();
		$("#" + id + "AddButton").hide();

		if(f == 1) {
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					_updateNewFinancial[i].nature = inputText;
				}
			}
			$("#" + id + "Select").val(natureVal);
		} else if(f == 2) {
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(bigType == _updateNewFinancial[i].types[j].bigType) {
							_updateNewFinancial[i].types[j].bigType = inputText;
						}
					}
				}
			}
			$("#" + id + "Select").val(bigVal);
		} else if(f == 3) {
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(bigType == _updateNewFinancial[i].types[j].bigType) {
							for(var k in _updateNewFinancial[i].types[j].type) {
								if(type == _updateNewFinancial[i].types[j].type[k]) {
									_updateNewFinancial[i].types[j].type[k] = inputText;
								}
							}
						}
					}
				}
			}
			$("#" + id + "Select").val(typeVal);
		}

		if(f == 4) {
			for(var i in _updateAssetsType) {
				if(assetsType == _updateAssetsType[i].type) {
					_updateAssetsType[i].type = inputText;
				}
			}
			$("#" + id + "Select").val(assetsTypeVal);
		} else if(f == 5) {
			for(var i in _updateAssetsType) {
				if(assetsType == _updateAssetsType[i].type) {
					for(var j in _updateAssetsType[i].name){
						if(assetsName == _updateAssetsType[i].name[j]) {
							_updateAssetsType[i].name[j] = inputText;
						}
					}
				}
			}
			$("#" + id + "Select").val(assetsNameVal);
		}
	} else if(t == 4) { //上移
		var nature = $("#newFinancialNatureSelect").find("option:selected").text();
		var natureVal = $("#newFinancialNatureSelect").val();

		var bigType = $("#newFinancialBigTypeSelect").find("option:selected").text();
		var bigVal = $("#newFinancialBigTypeSelect").val();

		var type = $("#newFinancialTypeSelect").find("option:selected").text();
		var typeVal = $("#newFinancialTypeSelect").val();

		var assetsType =    $("#assetsTypeSelect").find("option:selected").text();
		var assetsTypeVal = $("#assetsTypeSelect").val();

		var assetsName = $("#assetsNameSelect").find("option:selected").text();
		var assetsNameVal = $("#assetsNameSelect").val();

		var selectVal = $("#" + id + "Select").val();
		var selectText = $("#" + id + "Select").find("option:selected").text();
		if(!selectText || selectText == '') {
			if(f == 0) {
				$("#" + id + "Tips").html("请选择一个值进行上移！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("请选择一个值进行上移！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("请选择一个值进行上移！");
			}
			return;
		}
		if(selectVal == 0) {
			if(f == 0) {
				$("#" + id + "Tips").html("这是第一个值，不能上移！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("这是第一个值，不能上移！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("这是第一个值，不能上移！");
			}
			return;
		}
		var obj = document.getElementById(id + "Select");
		var options = obj.options;
		var newArray = [];
		for(var i = 0, len = options.length; i < len; i++) {
			if(i == (selectVal - 1)) {
				newArray.push(options[selectVal].text);
			} else if(i == selectVal) {
				newArray.push(options[parseInt(selectVal) - 1].text);
			} else {
				newArray.push(options[i].text);
			}
		}
		$("#" + id + "Select").empty();
		for(var i in newArray) {
			$("#" + id + "Select").append("<option value='" + i + "'>" + newArray[i] + "</option>");
		}
		$("#" + id + "Select").val(parseInt(selectVal) - 1);
		$("#" + id + "Update").hide();
		$("#" + id + "UpdateButton").hide();
		$("#" + id + "Add").hide();
		$("#" + id + "AddButton").hide();
		if(f == 1) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(i == (selectVal - 1)) {
					newArray.push(_updateNewFinancial[selectVal]);
				} else if(i == selectVal) {
					newArray.push(_updateNewFinancial[parseInt(selectVal) - 1]);
				} else {
					newArray.push(_updateNewFinancial[i]);
				}
			}
			_updateNewFinancial = newArray;
			$("#" + id + "Select").val(parseInt(selectVal) - 1);
		} else if(f == 2) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(j == (selectVal - 1)) {
							newArray.push(_updateNewFinancial[i].types[selectVal]);
						} else if(j == selectVal) {
							newArray.push(_updateNewFinancial[i].types[parseInt(selectVal) - 1]);
						} else {
							newArray.push(_updateNewFinancial[i].types[j]);
						}
					}
					_updateNewFinancial[i].types = newArray;
				}
			}

			$("#" + id + "Select").val(parseInt(selectVal) - 1);
		} else if(f == 3) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(bigType == _updateNewFinancial[i].types[j].bigType) {
							for(var k in _updateNewFinancial[i].types[j].type) {
								if(k == (selectVal - 1)) {
									newArray.push(_updateNewFinancial[i].types[j].type[selectVal]);
								} else if(k == selectVal) {
									newArray.push(_updateNewFinancial[i].types[j].type[parseInt(selectVal) - 1]);
								} else {
									newArray.push(_updateNewFinancial[i].types[j].type[k]);
								}
							}
							_updateNewFinancial[i].types[j].type = newArray;
						}
					}
				}
			}
			$("#" + id + "Select").val(parseInt(selectVal) - 1);
		}


		if(f == 4) {
			newArray = [];
			for(var i in _updateAssetsType) {
				if(i == (selectVal - 1)) {
					newArray.push(_updateAssetsType[selectVal]);
				} else if(i == selectVal) {
					newArray.push(_updateAssetsType[parseInt(selectVal) - 1]);
				} else {
					newArray.push(_updateAssetsType[i]);
				}
			}
			_updateAssetsType = newArray;
			$("#" + id + "Select").val(parseInt(selectVal) - 1);

		} else if(f == 5) {
			newArray = [];
			for(var i in _updateAssetsType) {
				if(assetsType == _updateAssetsType[i].type) {
					for(var j in _updateAssetsType[i].name) {
						if(j == (selectVal - 1)) {
							newArray.push(_updateAssetsType[i].name[selectVal]);
						} else if(j == selectVal) {
							newArray.push(_updateAssetsType[i].name[parseInt(selectVal) - 1]);
						} else {
							newArray.push(_updateAssetsType[i].name[j]);
						}
					}
					_updateAssetsType[i].name = newArray;
				}
			}
			$("#" + id + "Select").val(parseInt(selectVal) - 1);
		}
	} else if(t == 5) { //下移
		var nature = $("#newFinancialNatureSelect").find("option:selected").text();
		var natureVal = $("#newFinancialNatureSelect").val();

		var bigType = $("#newFinancialBigTypeSelect").find("option:selected").text();
		var bigVal = $("#newFinancialBigTypeSelect").val();

		var type = $("#newFinancialTypeSelect").find("option:selected").text();
		var typeVal = $("#newFinancialTypeSelect").val();

		var assetsType =    $("#assetsTypeSelect").find("option:selected").text();
		var assetsTypeVal = $("#assetsTypeSelect").val();

		var assetsName = $("#assetsNameSelect").find("option:selected").text();
		var assetsNameVal = $("#assetsNameSelect").val();

		var selectVal = $("#" + id + "Select").val();
		var selectText = $("#" + id + "Select").find("option:selected").text();
		if(!selectText || selectText == '') {
			if(f == 0) {
				$("#" + id + "Tips").html("请选择一个值进行下移！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("请选择一个值进行下移！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("请选择一个值进行下移！");
			}
			return;
		}
		var obj = document.getElementById(id + "Select");
		var options = obj.options;
		if(selectVal == (options.length - 1)) {
			if(f == 0) {
				$("#" + id + "Tips").html("这是最后一个值，不能下移！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("这是最后一个值，不能下移！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("这是最后一个值，不能下移！");
			}
			return;
		}
		var newArray = [];
		for(var i = 0, len = options.length; i < len; i++) {
			if(i == selectVal) {
				newArray.push(options[parseInt(selectVal) + 1].text);
			} else if(i == (parseInt(selectVal) + 1)) {
				newArray.push(options[selectVal].text);
			} else {
				newArray.push(options[i].text)
			}
		}
		$("#" + id + "Select").empty();
		for(var i in newArray) {
			$("#" + id + "Select").append("<option value='" + i + "'>" + newArray[i] + "</option>");
		}
		$("#" + id + "Select").val(parseInt(selectVal) + 1);
		$("#" + id + "Update").hide();
		$("#" + id + "UpdateButton").hide();
		$("#" + id + "Add").hide();
		$("#" + id + "AddButton").hide();
		if(f == 1) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(i == selectVal) {
					newArray.push(_updateNewFinancial[parseInt(selectVal) + 1]);
				}else if(i == (parseInt(selectVal) + 1)) {
					newArray.push(_updateNewFinancial[parseInt(selectVal)]);
				}  else {
					newArray.push(_updateNewFinancial[i]);
				}
			}
			_updateNewFinancial = newArray;
			$("#" + id + "Select").val((parseInt(selectVal) + 1));
		} else if(f == 2) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(j == selectVal) {
							newArray.push(_updateNewFinancial[i].types[parseInt(selectVal) + 1]);
						} else if(j == (parseInt(selectVal) + 1)) {
							newArray.push(_updateNewFinancial[i].types[selectVal]);
						} else {
							newArray.push(_updateNewFinancial[i].types[j]);
						}
					}
					_updateNewFinancial[i].types = newArray;
				}
			}

			$("#" + id + "Select").val((parseInt(selectVal) + 1));
		} else if(f == 3) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(bigType == _updateNewFinancial[i].types[j].bigType) {
							for(var k in _updateNewFinancial[i].types[j].type) {
								if(k == selectVal) {
									newArray.push(_updateNewFinancial[i].types[j].type[parseInt(selectVal) + 1]);
								} else if(k == (parseInt(selectVal) + 1)) {
									newArray.push(_updateNewFinancial[i].types[j].type[selectVal]);
								} else {
									newArray.push(_updateNewFinancial[i].types[j].type[k]);
								}
							}
							_updateNewFinancial[i].types[j].type = newArray;
						}
					}
				}
			}
			$("#" + id + "Select").val((parseInt(selectVal) + 1));
		}

		if(f == 4) {
			newArray = [];
			for(var i in _updateAssetsType) {
				if(i == selectVal) {
					newArray.push(_updateAssetsType[parseInt(selectVal) + 1]);
				}else if(i == (parseInt(selectVal) + 1)) {
					newArray.push(_updateAssetsType[parseInt(selectVal)]);
				}  else {
					newArray.push(_updateAssetsType[i]);
				}
			}
			_updateAssetsType = newArray;
			$("#" + id + "Select").val(parseInt(selectVal) + 1);

		} else if(f == 5) {
			newArray = [];
			for(var i in _updateAssetsType) {
				if(assetsType == _updateAssetsType[i].type) {
					for(var j in _updateAssetsType[i].name) {
						if(j == selectVal) {
							newArray.push(_updateAssetsType[i].types[parseInt(selectVal) + 1]);
						} else if(j == (parseInt(selectVal) + 1)) {
							newArray.push(_updateAssetsType[i].types[selectVal]);
						} else {
							newArray.push(_updateAssetsType[i].types[j]);
						}
					}
					_updateAssetsType[i].name = newArray;
				}
			}
			$("#" + id + "Select").val(parseInt(selectVal) + 1);
		}
	} else if(t == 6) { //删除
		var nature = $("#newFinancialNatureSelect").find("option:selected").text();
		var natureVal = $("#newFinancialNatureSelect").val();

		var bigType = $("#newFinancialBigTypeSelect").find("option:selected").text();
		var bigVal = $("#newFinancialBigTypeSelect").val();

		var type = $("#newFinancialTypeSelect").find("option:selected").text();
		var typeVal = $("#newFinancialTypeSelect").val();

		var assetsType =    $("#assetsTypeSelect").find("option:selected").text();
		var assetsTypeVal = $("#assetsTypeSelect").val();

		var assetsName = $("#assetsNameSelect").find("option:selected").text();
		var assetsNameVal = $("#assetsNameSelect").val();

		var selectVal = $("#" + id + "Select").val();
		var selectText = $("#" + id + "Select").find("option:selected").text();
		if(!selectText || selectText == '') {
			if(f == 0) {
				$("#" + id + "Tips").html("请选择一个值进行删除！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("请选择一个值进行删除！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("请选择一个值进行删除！");
			}
			return;
		}
		var obj = document.getElementById(id + "Select");
		var options = obj.options;
		if(options.length == 1) {
			if(f == 0) {
				$("#" + id + "Tips").html("最少为一个！");
			}else if(f==1 || f==2 || f==3 ) {
				$("#newFinancialTips").html("最少为一个！");
			}else if(f==4 || f==5 ) {
				$("#assetsTips").html("最少为一个！");
			}
			return;
		}
		var newArray = [];
		for(var i = 0, len = options.length; i < len; i++) {
			if(i != selectVal) {
				newArray.push(options[i].text)
			}
		}
		$("#" + id + "Select").empty();
		for(var i in newArray) {
			$("#" + id + "Select").append("<option value='" + i + "'>" + newArray[i] + "</option>");
		}
		$("#" + id + "Update").hide();
		$("#" + id + "UpdateButton").hide();
		$("#" + id + "Add").hide();
		$("#" + id + "AddButton").hide();
		if(f == 1) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(i != selectVal) {
					newArray.push(_updateNewFinancial[i]);
				}
			}
			_updateNewFinancial = newArray;
			$("#" + id + "Select").val(0);
			selectFinancial(0);
			selectFinancial(1);
		} else if(f == 2) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(j != selectVal) {
							newArray.push(_updateNewFinancial[i].types[j]);
						}
					}
					_updateNewFinancial[i].types = newArray;
				}
			}
			$("#" + id + "Select").val(0);
			selectFinancial(1);
		} else if(f == 3) {
			newArray = [];
			for(var i in _updateNewFinancial) {
				if(nature == _updateNewFinancial[i].nature) {
					for(var j in _updateNewFinancial[i].types) {
						if(bigType == _updateNewFinancial[i].types[j].bigType) {
							for(var k in _updateNewFinancial[i].types[j].type) {
								if(k != selectVal) {
									newArray.push(_updateNewFinancial[i].types[j].type[k]);
								}
							}
							_updateNewFinancial[i].types[j].type = newArray;
						}
					}
				}
			}
			$("#" + id + "Select").val(0);
		}

		if(f == 4) {
			newArray = [];
			for(var i in _updateAssetsType) {
				if(i != selectVal) {
					newArray.push(_updateAssetsType[i]);
				}
			}
			_updateAssetsType = newArray;
			$("#" + id + "Select").val(0);
			selectAssetsType();
		} else if(f == 5) {
			newArray = [];
			for(var i in _updateAssetsType) {
				if(assetsType == _updateAssetsType[i].type) {
					for(var j in _updateAssetsType[i].name) {
						if(j != selectVal) {
							newArray.push(_updateAssetsType[i].name[j]);
						}
					}
					_updateAssetsType[i].name = newArray;
				}
			}
			$("#" + id + "Select").val(0);
		}
	} else if(t == 7) { //预览
		if(f==0){
			var obj = document.getElementById(id + "Select");
			var options = obj.options;
			$("#" + id + "Show").empty();
			for(var i = 0, len = options.length; i < len; i++) {
				$("#" + id + "Show").append("<option value='" + i + "'>" + options[i].text + "</option>");
			}
			$("#" + id + "Show").show();
		}else if(f == 1) {
			$("#financilSearchMenu").remove();
			financilTypeInVariables();
		}
	}
}

function doSaveVariable(id,evet) {
	var updateJson = {};
	if (id == 'contractNums') {
		var contractNums = $("#contractNums").prop('checked') ? 1 : 2;
		updateJson = {contractNums: contractNums};
	}
	else if (id == 'timeScope') {
		var timeOnAndOff = $("#timeOnAndOff").prop('checked') ? 1 : 2;
		var daymin = $("#daymin").val();
		var daymax = $("#daymax").val();
		var timeScope = "{daymin:"+daymin+",daymax:"+daymax+"}";
		updateJson = {
				timeOnAndOff: timeOnAndOff,
				timeScope : timeScope
				};
		//sonsole.log(JSON.stringify(updateJson));
	}
	else if (id=='doorLockAuthorization'){
		var doorLockAuthorization = $("#doorLockAuthorization").prop('checked') ? 1 : 2;
		var authorizedFee = $("#authorizedFee").val();
		updateJson = {
			doorLockAuthorization: doorLockAuthorization,
			authorizedFee : authorizedFee
		};
	}
/*--------查看业主/客户电话强写跟进功能----------*/
	else if(id == 'forcedFollowupSwitch'){

		var forcedFollowupSwitch = $("#forcedFollowupSwitch").prop('checked')? 1 : 2 ;
		console.log(forcedFollowupSwitch);
			if( forcedFollowupSwitch  == 1){
				$.messager.confirm("操作提示", "开启，请设置最大天数");
			}
			updateJson = {forcedFollowupSwitch :forcedFollowupSwitch};
	}else if(id == 'forcedFollowupValues') {
		var forcedFollowupValues = $("#forcedFollowupValues").val();
		updateJson = {forcedFollowupValues: forcedFollowupValues};
	}
/*-----------客户短信提醒------------------------*/
	else if(id == 'campusMessageSwitch') {
		var campusMessageSwitch = $("#campusMessageSwitch").prop('checked')? 1 : 2 ;
		updateJson = {campusMessageSwitch: campusMessageSwitch};
	}
/*-----------------定金-----------------------*/
	else if(id == 'moneySwitch'){

		var moneySwitch = $("#moneySwitch").prop('checked')? 1 : 2 ;
		console.log(moneySwitch);
		if( moneySwitch  == 1){
			$.messager.confirm("操作提示", "开启，请设置最大天数");
		}
		updateJson = {moneySwitch :moneySwitch};
	}else if(id == 'moneyValues') {
		var moneyValues = $("#moneyValues").val();
		updateJson = {moneyValues: moneyValues};
	}



	  else if (id == 'billNum') {
		var billNum = $("#billNum").prop('checked') ? 1 : 2;
		updateJson = {billNum: billNum};
	} else if (id == 'comfirmNum') {
		var comfirmNum = $("#comfirmNum").prop('checked') ? 1 : 2;
		updateJson = {comfirmNum: comfirmNum};
	} else if (id == 'doorplateno') {
		var doorplateno = $("#doorplateno").prop('checked') ? 1 : 2;
		updateJson = {doorplateno: doorplateno};
	}else if (id == 'contractRiskControl') {
		var contractRiskControl = $("#contractRiskControl").prop('checked') ? 1 : 2;
		updateJson = {contractRiskControl: contractRiskControl};
	}else if(id == 'autoSendMessage'){
		$.messager.confirm("操作提示", "开启，设置逾期时间");
		var autoSendMessage = $("#autoSendMessage").prop('checked')? 1 : 2 ;
		updateJson = {autoSendMessage :autoSendMessage};
	}else if(id == 'autoSendMessageDays'){
		var autoSendMessageDays = $("#autoSendMessageDays").val();
		updateJson = {autoSendMessageDays: autoSendMessageDays};
	}else if(id == 'maxOverdue'){
		var maxOverdue = $("#maxOverdue").prop('checked')? 1 : 2 ;
		updateJson = {maxOverdue :maxOverdue};
	}else if(id == 'maxOverdueDays'){
		var maxOverdueDays = $("#maxOverdueDays").val();
		updateJson = {maxOverdueDays: maxOverdueDays};
	}else if(id == 'waterDailyVariable'){
		var waterDailyVariable = $("#waterDailyVariable").val();
		updateJson = {waterDailyVariable: waterDailyVariable};
	}else if(id == 'waterContinuityVariable'){
		var waterContinuityVariable = $("#waterContinuityVariable").val();
		updateJson = {waterContinuityVariable: waterContinuityVariable};
	}else if(id == 'doorCardSystem1'){
	    var doorCardSystem = $("#doorCardSystem1").val();
	    console.log(doorCardSystem);
	    updateJson = {doorCardSystem : doorCardSystem};
    }else if(id == 'meterReading'){
		var meterReadingTimes = $("#meterReadingTimes").val();
		var meterReadingSwitch = $("#meterReadingSwitch").prop('checked')? 1 : 2 ;
		updateJson = {
				meterReadingTimes: meterReadingTimes,
				meterReadingSwitch: meterReadingSwitch
				};
	}
	else if (id == 'newFinancial') {
		updateJson = {newFinancial: JSON.stringify(_updateNewFinancial)};
	} else if (id == 'assetsType') {
		updateJson = {assetsType: JSON.stringify(_updateAssetsType)};
	} else if (id == 'onDutyRepairer') {
		var repairGetUserId = $('#repairGetUserId').val();
		if (repairGetUserId == '') {
			myTips('未设置维修人员', 'error');
			return;
		}
		updateJson = {onDutyRepairer: repairGetUserId};
	} else if(id == 'wxpayAccount') {

		var account = $(evet).parent().parent().find(".accountId").val();
		if (account == '') {
			myTips('未设置收款账户', 'error');
			return;
		}

		updateJson = {wxpayAccount: account};
	} else if(id == 'shopAccount') {

		var account = $(evet).parent().parent().find(".accountId").val();
		if (account == '') {
			myTips('未设置收款账户', 'error');
			return;
		}

		updateJson = {shopAccount: account};
	}else if(id == 'shopCashAccount') {

		var account = $(evet).parent().parent().find(".accountId").val();
		if (account == '') {
			myTips('未设置收款账户', 'error');
			return;
		}

		updateJson = {shopCashAccount: account};
	} else if(id == 'shortRentAccount') {

		var account = $(evet).parent().parent().find(".accountId").val();
		if (account == '') {
			myTips('未设置收款账户', 'error');
			return;
		}

		updateJson = {shortRentAccount: account};
	} else if (id == 'gzhAd') {
		var ad = {
			img1: $('#img1').val(),
			img2: $('#img2').val(),
			img3: $('#img3').val(),
			img4: $('#img4').val(),
			img5: $('#img5').val(),
			img6: $('#img6').val(),
			a1: $('#a1').val(),
			a2: $('#a2').val(),
			a3: $('#a3').val(),
			a4: $('#a4').val(),
			a5: $('#a5').val(),
			a6: $('#a6').val()
		};
		updateJson = {gzhAd: JSON.stringify(ad)};
	} else if (id == 'chargePercentage') {
		updateJson = {chargePercentage: $('#chargePercentage').val()};
	} else if (id == 'chargeReminder') {
		updateJson = {chargeReminder: $('#chargeReminder').val()};
	} else if (id == 'lateFeeRate') {
		updateJson = {lateFeeRate: $('#lateFeeRate').val()};
	} else {
		var obj = document.getElementById(id + "Select");
		var options = obj.options;
		var variables = [];
		for(var i = 0; i < options.length; i++) {
			var item = {variable: options[i].text};
			variables.push(item);
		}
		updateJson[id] = JSON.stringify(variables);

	}
	console.log(updateJson);
	$.post("../updateSysVariables.action", updateJson, function(data) {
		if(data.code < 0){
			myTips(data.msg, "error");
			return;
		}
		myTips("修改成功", "success");
	});
}
/*function maxOverdue(){
//	console.log($('#maxOverdue').prop("checkbox",true));
	if($('#maxOverdue').prop("checked",false)){
		$.messager.confirm("操作提示", "开启，设置逾期时间");
//		$('#maxOverdue').prop("checked",true);
	}else{
		$('#maxOverdue').prop("checked",false);
	}
}*/
//恢复初始值
function recoveryVariable(id){
	$.messager.confirm("操作提示", "确定恢复初始值吗？", function(data) {
		if (data) {
			var updateJson = "{" + id + ":'1'}";
			updateJson = eval('(' + updateJson + ')');
			console.log(updateJson);
			$.post("../recoveryFirstVariables.action", updateJson, function(data) {
				if(data.code < 0){
					myTips(data.msg, "error");
					return;
				}
				/*用于强写 恢复su_followup_value数据 */
				if(id=="forcedFollowupValues"){ suVollowupValue(); }


				selectSysVariables();
				myTips("恢复成功", "success");

			});
		}else{
			return;
		}
	});
}
function selectFinancial(t) {
	$("#newFinancialDiv input").hide();
	var nature = $("#newFinancialNatureSelect").find("option:selected").text();
	var bigType = $("#newFinancialBigTypeSelect").find("option:selected").text();
	var type = $("#newFinancialTypeSelect").find("option:selected").text();
	if(t == 0) {
		for(var i in _updateNewFinancial) {
			if(nature == _updateNewFinancial[i].nature) {
				$("#newFinancialBigTypeSelect").empty();
				for(var j in _updateNewFinancial[i].types) {
					$("#newFinancialBigTypeSelect").append("<option value='" + j + "'>" + _updateNewFinancial[i].types[j].bigType + "</option>");
				}
			}
		}
		$("#newFinancialBigTypeSelect").val(0);
	} else if(t == 1) {
		if(!bigType) {
			$("#newFinancialTypeSelect").empty();
			return;
		}
		for(var i in _updateNewFinancial) {
			if(nature == _updateNewFinancial[i].nature) {
				for(var j in _updateNewFinancial[i].types) {
					if(bigType == _updateNewFinancial[i].types[j].bigType) {
						$("#newFinancialTypeSelect").empty();
						for(var k in _updateNewFinancial[i].types[j].type) {
							$("#newFinancialTypeSelect").append("<option value='" + k + "'>" + _updateNewFinancial[i].types[j].type[k] + "</option>");
						}
					}
				}
			}
		}
		$("#newFinancialTypeSelect").val(0);
	} else if(t == 2) {

	}
}
function selectAssetsType() {
	$("#assetsDiv input").hide();
	var assetsType = $("#assetsTypeSelect").find("option:selected").text();
	var assetsName = $("#assetsNameSelect").find("option:selected").text();
	for(var i in _assetsType) {
		if(assetsType == _assetsType[i].type) {
			$("#assetsNameSelect").empty();
			for(var j in _assetsType[i].name) {
				$("#assetsNameSelect").append("<option value='" + j + "'>" + _assetsType[i].name[j] + "</option>");
			}
		}
	}
	$("#assetsNameSelect").val(0);
}
function selectSuppliesType() {
	$("#suppliesDiv input").hide();
	var suppliesType = $("#suppliesTypeSelect").find("option:selected").text();
	var suppliesName = $("#suppliesNameSelect").find("option:selected").text();
	for(var i in _suppliesType) {
		if(suppliesType == _suppliesType[i].type) {
			$("#suppliesNameSelect").empty();
			for(var j in _suppliesType[i].name) {
				$("#suppliesNameSelect").append("<option value='" + j + "'>" + _suppliesType[i].name[j] + "</option>");
			}
		}
	}
	$("#suppliesNameSelect").val(0);
}
function financilTypeInVariables(){
	var str = "<div id='financilSearchMenu' class='easyui-menu' style='width:120px;'>";
	for(var i in _updateNewFinancial) {
		str += "<div>";
		str += "<span>" + _updateNewFinancial[i].nature + "</span>";
		str += "<div style='width:150px;'>";
		for(var j in _updateNewFinancial[i].types) {
			str += "<div>";
			str += "<span>" + _updateNewFinancial[i].types[j].bigType + "</span>";
			str += "<div style='width:120px;'>";
			for(var k in _updateNewFinancial[i].types[j].type) {
				str += "<div>" + _updateNewFinancial[i].types[j].type[k] + "</div>";
			}
			str += "</div></div>";
		}
			str += "</div></div>";
	}
	str += "</div>";
	$("#financilSearchDiv").append(str);
	var buttonLeft = $("#financilSearchButton").position().left;
	var buttonTop = $("#financilSearchButton").position().top;
	$("#financilSearchMenu").menu({
		onClick: function(item) {

		},
		hideOnUnhover: false,
	});
	$("#financilSearchMenu").menu('show', {
		left: buttonLeft-30,
		top: buttonTop,
	});
}
//查询门店
function queryStore(){
	$.post("../queryStorefront.action", function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$("#repairerStore").append("<option value = '" + data[i].storefrontId + "'>" + data[i].storefrontName + "</option>");
		}
	}, "json");
}
//选择门店
function choseStore(storeId,deptId,staffId){
	var store = $('#' + storeId);
	var dept = $('#' + deptId);
	var staff = $('#' + staffId);
	dept.empty();
	staff.empty();
	dept.append("<option></option>");
	staff.append("<option></option>");
	var storefront = store.val();
	if(storefront == ''){
		return;
	}
	$.post("../queryDepartment.action", {
		departmentStorefrontId : storefront,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for (var i in data.body) {
			dept.append("<option value = '" + data.body[i].departmentId + "'>" + data.body[i].departmentName + "</option>");
		}
	}, "json");
}
//选择部门
function choseDept(deptId, staffId) {
	var dept = $('#' + deptId);
	var staff = $('#' + staffId);
	staff.empty();
	staff.append("<option></option>");
	var deptment = dept.val();
	if (deptment == '') {
		return;
	}
	$.post("../queryUserByDepartmentID.action", {
		suDepartmentId : deptment
	}, function(data) {
		if (data.code < 0) {
//			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			staff.append("<option value = '" + data[i].userId + "'>" + data[i].suStaffName + "</option>");
		}
	});
}
//账户类型和账号联动
function changeWay(evet) {
	var fa = $(evet).parent().parent();
	var faPaymentType = fa.find(".accountType").find("option:selected").text();
	fa.find(".accountName").empty();
	fa.find(".accountName").append("<option></option>");
	fa.find(".accountId").val("");
	fa.find(".accountNum").val("");
	fa.find(".accountBelong").val("");
	if(faPaymentType == ""){
		return;
	}
	$.post("../selectNamePublic.action", {
		faPaymentType:faPaymentType,
	}, function(data) {
		fa.find(".accountName").empty();
		fa.find(".accountName").append("<option></option>");
		for (var i in data.body) {
			fa.find(".accountName").append("<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
			$("#faUserName").val(data.body[i].faId);
		}
	});
}
function getAccountId(evet) {
	var fa = $(evet).parent().parent();
	
	var data = fa.find(".accountName").val();
	if(data == ''){
		fa.find(".accountId").val("");
		fa.find(".accountBelong").val("");
		fa.find(".accountNum").val("");
	}else{
		fa.find(".accountId").val(data.split("*#*")[0])
		$("#faId").val(fa.find(".accountId").val());
		fa.find(".accountBelong").val(data.split("*#*")[1])
		fa.find(".accountNum").val(data.split("*#*")[2])
	}
}

/***********************************************************公众号广告图片上传start****************************************************************/
//电脑上传
function uploadPic(){
	$('#uploadDlg').dialog({
		title : '上传',
		top : getTop(464),
		left : getLeft(600),
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refresh();
		}
	});
	creatQr();
	$.post("../pubupload/getUpTokenCallback.action",function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$('#uploadDlg input[clear=true]').val('');
		$("#token").val(token);
		$("#co").val(co);
		$("#variablesId").val("1");
		initUploader();
		doCancel();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creatQr(){
	$.post("../pubupload/getMobUploadUrl.action",{
		variablesId : 1
	},function(data){
		console.log(data);
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel();
	});
}

//查看图片
function checkPic_gzh() {
	doCancel();
	showPic();
}
//删除图片
function removePic(){
	var photos = $('.contFile');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePicture').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemovePic').show();
	}
}
//执行删除图片
function doRemovePic(){
	var arr = 0;
	var path = '';
	var chk = $('.picturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		$.post("../deleteVariablesPic.action",{
			variablesId : 1,
			imgPath : path
		}, function(data) {
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				showPic();
			}
		});
		doCancel();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
//取消删除图片
function doCancel(){
	$('#removePicture').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic').hide();
}
function showPic(){
	$('#variablesImgDlg').dialog({
		title : '查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapper").empty();
		},
	});
	$("#imgWrapper").empty();
	$.post("../selectSysVariables.action",{
		variablesId : 1
	}, function(data) {
		if(data.code < 0){
			$("#imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		data=data.body;
		var path = data[0].imgPath;
		$('#variablesImgDlg').dialog('open');
		if (path == null) {
			return;
		}
		var img = eval('([' + path.getRealJsonStr() + '])');
		var imgNum = 0;
		var fileNum = 0;
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapper .fileList').append('<li>' +
						'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+img[i].path+'" class="contFile" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
						'</li>');
				fileNum++;
				
			}
		}
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			var j = parseInt(i) + parseInt(img.length);
			if(ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png"){
				if(imgNum == 0){
					$('#imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="variablesImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
		$(".variablesImg").colorbox({
			rel:'variablesImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
		
		
		
	});
}
//刷新
function refresh(){
	doCancel();
	showPic();
}
/***********************************************************公众号广告图片上传end****************************************************************/
function insertCompany(){
	
	var customerServiceTel = $("#customerServiceTel").val(); 
	var companyAbbreviation = $("#companyAbbreviation").val(); 
	$.post("../updatecompany.action",{
		companyAbbreviation:companyAbbreviation,
		customerServiceTel:customerServiceTel,
	},function(data){
		if(data.code<0){
			myTips(data.msg,'error');
			return ;
			
		}
		myTips("修改成功！","success");
		
	})
}