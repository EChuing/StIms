$(function() {
	$("#searchEndTime").val(formatTime(getNowFormatDate(), 2));
	queryPopulation(_pageNum[0], 0);
	$('#populationDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$('#population_index').val(rowIndex);
			populationDetailedDlg(rowData);
		}
	});
	$("#houseDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			housePopulationDlg();
		}
	});
	$("#followUpInformationTable").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			followInfoDlg(rowData);
		}
	});
	//条件查找联动
	for (var i in _loginCompanyRentDistrict) {
		$("#searchAddDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
});
var _popRow ='';
//人口详细窗口
function populationDetailedDlg(row){
	console.log(row)
	_popRow = row;
	$('#pop_name').val(row.popName);
	$('#pop_telephone').val(row.popTelephone);
	$('#pop_idcard_type').val(row.popIdcardType);
	$('#pop_idcard').val(row.popIdcard);
	$('#pop_sex').val(row.popSex);
	$('#pop_nation').val(row.popNation);
	$('#pop_marriage_state').val(row.popMarriageState);
	console.log(row.popIdcardAddress);
	$('#pop_idcard_address').val(row.popIdcardAddress);
	$('#pop_occupation').val(row.popOccupation);
	$('#pop_birth').val(row.popBirth);
	$('#pop_degree_education').val(row.popDegreeEducation);
	$('#pop_inner_credit_level').val(row.popInnerCreditLevel);
	$('#pop_outer_credit_level').val(row.popOuterCreditLevel);
	$('#pop_name_remark').val(row.popNameRemark);
	
	if(row.popIdcardJson !=''){
		var identityInformation = row.popIdcardJson;
		identityInformation=identityInformation.getRealJsonStr(identityInformation);
		identityInformation=JSON.parse(identityInformation);
		//console.log(identityInformation);		
		var imgData =identityInformation.Certificate.Base64Photo;
		$("#id_img_pers_open").attr("src","data:image/jpg;base64,"+imgData);
		$("#pop_idcard_type").val("身份证/临时身份证/户口本");
		$("#pop_sex").val(identityInformation.Certificate.Sex);
		$("#pop_nation").val(identityInformation.Certificate.Nation);
		// $("#pop_idcard_address").val(identityInformation.Certificate.IDIssued);
		$("#pop_birth").val(identityInformation.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
	}
	
	$('#populationDetailedDlg input').attr('disabled', 'disabled');
	$('#populationDetailedDlg select').attr('disabled', 'disabled');
	$('#updateButton').show();
	$('#doUpdateButton').hide();
	if(row.popResident==1){
		$('#updateLivingMenButton').show();
	}else{
		$('#updateLivingMenButton').hide();
	}
	queryPopulationHouse();
	if (row.popModifyTheRecord != '') {
		$('#followUpInformationTable').datagrid('loadData', JSON.parse(row.popModifyTheRecord.getRealJsonStr()).reverse());
	} else {
		$('#followUpInformationTable').datagrid('loadData', []);
	}
	$('#populationDetailedDlg').dialog({
		title : '客户信息',
		top : getTop(630),
		left : getLeft(750),
		width : 750,
		height : 630,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#populationDetailedDlg [clear="clear"]').val('');
			$("#houseDg").datagrid("loadData", []);
			$("#id_img_pers_open").attr("src","images/userImage.png");
			$("#pop_idcard_type").val();
			$("#pop_sex").val();
			$("#pop_nation").val();
			$("#pop_idcard_address").val();
			$("#pop_birth").val();
			$("#openUpdateID").hide();
		},
	});
	$('#populationDetailedDlg').dialog("open");
}

//分页统计总条数
function getpopulationPageCount(page){
	var pageSize = 15;
	var popLandlord = '';
	var popRenter = '';
	var popResident = '';
	var typeName = '';
	$("#populationType input[type='checkbox']").each(function(){
		if($(this).prop('checked')){
			typeName += $(this).attr("fwpz")+"##";
		}
	});
	var strList = typeName.split('##');
	if(strList[0] == '业主'){
		popLandlord = 1;
	}else if(strList[0] == '承租人'){
		popRenter = 1;
	}else if(strList[0] == '住户'){
		popResident = 1;
	}
	if(strList[1] == '业主'){
		popLandlord = 1;
	}else if(strList[1] == '承租人'){
		popRenter = 1;
	}else if(strList[1] == '住户'){
		popResident = 1;
	}
	if(strList[2] == '业主'){
		popLandlord = 1;
	}else if(strList[2] == '承租人'){
		popRenter = 1;
	}else if(strList[2] == '住户'){
		popResident = 1;
	}
	var popName = $("#searchPopulationName").val();
	var popTelephone = $("#searchPopulationPhone").val();
	var popIdcard = $("#searchPopulationIdCard").val();
	var popUser = $("#searchRegisterGetUserId").val();
	// 客户信息表导入数据
	$.post("../selectPopulation.action", {
		popLandlord : popLandlord,
		popRenter : popRenter,
		popResident : popResident,
		popName : popName,
		popTelephone : popTelephone,
		popIdcard : popIdcard,
		popUser : popUser,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"population",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"population",0);
		}
	});
}

// 查询客户信息
function queryPopulation(page, type) {
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var popLandlord = '';
	var popRenter = '';
	var popResident = '';
	var typeName = '';
	$("#populationType input[type='checkbox']").each(function(){
		if($(this).prop('checked')){
			typeName += $(this).attr("fwpz")+"##";
		}
	});
	var strList = typeName.split('##');
	if(strList[0] == '业主'){
		popLandlord = 1;
	}else if(strList[0] == '承租人'){
		popRenter = 1;
	}else if(strList[0] == '住户'){
		popResident = 1;
	}
	if(strList[1] == '业主'){
		popLandlord = 1;
	}else if(strList[1] == '承租人'){
		popRenter = 1;
	}else if(strList[1] == '住户'){
		popResident = 1;
	}
	if(strList[2] == '业主'){
		popLandlord = 1;
	}else if(strList[2] == '承租人'){
		popRenter = 1;
	}else if(strList[2] == '住户'){
		popResident = 1;
	}
	var popName = $("#searchPopulationName").val();
	var popTelephone = $("#searchPopulationPhone").val();
	var popIdcard = $("#searchPopulationIdCard").val();
	var popUser = $("#searchRegisterGetUserId").val();
	// 客户信息表导入数据
	$.post("../selectPopulation.action", {
		startNum : startNum,
		endNum : endNum,
		popLandlord : popLandlord,
		popRenter : popRenter,
		popResident : popResident,
		popName : popName,
		popTelephone : popTelephone,
		popIdcard : popIdcard,
		popUser : popUser,
	}, function(data) {
		if (data.code<0) {
			//sourcePage(0, 0, 0);
			$('#populationDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryPopulation","population");
			}else{
				notCountPage(page, 0 ,"queryPopulation","population");
			}
		} else {
			data=data.body;
			for (var i in data) {
				for ( var j in data[i]) {
					if (data[i][j] == null) {
						data[i][j] = '';
					}
				}
			}
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryPopulation","population");
			}else{
				notCountPage(page, 1 , "queryPopulation","population");
			}
			$("#populationDg").datagrid("loadData", data);
		}
	}, "json");
}
function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#populationPage").remove();
		$("#populationPageDiv")
				.append(
						"<div class='tcdPageCode' id='populationPage' style='text-align:center;'></div>");
		$("#populationPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				_pageNum[0] = p;
				if (p <= pageNum) {
					queryPopulation(p, 1);
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
}

//更改承租人、住户、业主：是、否 标识的颜色
function formatLandlord(value, row, index) {
	if (row.popLandlord != 1) {
		return '<sa style="color: red;">否</sa>';
	} else {
		return '<sa style="color: green;">是</sa>';
	}
}
function formatRenter(value, row, index) {
	if (row.popRenter != 1) {
		return '<sa style="color: red;">否</sa>';
	} else {
		return '<sa style="color: green;">是</sa>';
	}
}
function formatResident(value, row, index) {
	if (row.popResident != 1) {
		return '<sa style="color: red;">否</sa>';
	} else {
		return '<sa style="color: green;">是</sa>';
	}
}
//查询人头下所有的房屋
function queryPopulationHouse() {
	var row = $("#populationDg").datagrid("getSelected");
	var popId = row.popId;
	$.post("../selectPopulationHouse.action",{
		popId  : popId,
	}, function(data) {
		if (data.code<0) {
			$('#houseDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data=data.body;
		for (var i in data) {
			data[i].detailedAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
		}
		$("#houseDg").datagrid("loadData", data);
	});
}

//查询房屋下所有的人头
function housePopulationDlg() {
	var row = $("#houseDg").datagrid("getSelected");
	$('#housePopulationDlg').dialog({
		title : '房屋相关人员',
		top : getTop(330),
		left : getLeft(600),
		width : 600,
		height : 330,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#housePopulationDg").datagrid("loadData", []);
		},
	});
	$.post("../selectHousePopulation.action",{
		hsId  : row.hsId,
	}, function(data) {
		if (data.code<0) {
			$('#housePopulationDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data=data.body;
		$("#housePopulationDg").datagrid("loadData", data);
	});
	$('#housePopulationDlg').dialog('open');
}

//允许修改客户信息
function openUpdate(){
	$('#populationDetailedDlg input').attr('disabled', false);
	$('#populationDetailedDlg select').attr('disabled', false);
	$('#updateButton').hide();
	$('#doUpdateButton').show();
	$('#openUpdateID').show();



}
//执行修改客户信息
function doUpdatePopulation(type){
	var popIdcardJson = JSON.stringify(popIdcardJson1);
	var row = $("#populationDg").datagrid("getSelected");
	var popName = $('#pop_name').val();
	var popTelephone = $('#pop_telephone').val();
	var popIdcardType = $('#pop_idcard_type').val();
	var popIdcard = $('#pop_idcard').val();
	var popSex = $('#pop_sex').val();
	var popNation = $('#pop_nation').val();
	var popMarriageState = $('#pop_marriage_state').val();
	var popIdcardAddress = $('#pop_idcard_address').val();
	var popOccupation = $('#pop_occupation').val();
	var popBirth = $('#pop_birth').val();
	var popDegreeEducation = $('#pop_degree_education').val();
	var popInnerCreditLevel = $('#pop_inner_credit_level').val();
	var popOuterCreditLevel = $('#pop_outer_credit_level').val();
	var popNameRemark = $('#pop_name_remark').val();
	var popPassword;
	if(type==1){//重置密码
		popPassword= $('#pop_telephone').val();
	}
	
	showLoading();
	$.post("../updatePopulation.action", {
		popId 					: row.popId,
		popName 				: popName,
		popTelephone 			: popTelephone,
		popIdcardType           : popIdcardType,
		popIdcard 				: popIdcard,
		popSex                  : popSex,
		popNation               : popNation,
		popMarriageState        : popMarriageState,
		popIdcardAddress        : popIdcardAddress,
		popOccupation           : popOccupation,
		popBirth                : popBirth,
		popDegreeEducation      : popDegreeEducation,
		popInnerCreditLevel     : popInnerCreditLevel,
		popOuterCreditLevel     : popOuterCreditLevel,
		popNameRemark			: popNameRemark,
		registrantName			: _loginUserName,
		popIdcardJson			: popIdcardJson,
		popPassword			:popPassword
	}, function(data) {
		hideLoading();
		if(data.code<0){
			if(data.code==-21){
				myTips("身份证已存在，已存在身份证的人口姓名与本次填写的姓名不一致！","error");
			} else {
				myTips(data.msg,"error");
			}
			return;
		}
		myTips("修改成功","success");
		queryPopulation(_pageNum[0],0);
		$('#populationDetailedDlg').dialog('close');
	});
}
//跟进详情
function followInfoDlg(row){
	$('#followInfoDlg').dialog({
		title : '跟进详细信息',
		top : getTop(300),
		left : getLeft(500),
		width : 500,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#followInfoDlg span').text('');
		},
	});
	for(var i in row){
		$('#follow'+i).html(row[i]);
	}
	$('#followInfoDlg').dialog('open');
}
/*//跟进列表
function followUpInformation(str){
	if(str != null && str != ""){	
		var data = eval('([' +str.getRealJsonStr()+ '])');
		var inData = "";
		if(data.length == 1){
			$('#followUpInformationTable').datagrid({
				data : data,
			});
		}else{
			for(var i=data.length-1;i>=0;i--){
				if(i==data.length-1){
					inData += JSON.stringify(data[i]);
				}else{
					inData += ","+JSON.stringify(data[i]);
				}
			}
			inData = eval('(' + "[" + inData + "]" + ')');
			$('#followUpInformationTable').datagrid({
				data : inData,
			});
		}
	}else{
		$('#followUpInformationTable').datagrid({
			data : [],
		});
	}
}*/
//查询住户信息
function queryResident() {
	var row = $("#populationDg").datagrid("getSelected");
	var rtPlId = row.popId;
	$.post("../selectResidentTable.action", {
		rtPlId : rtPlId,
	}, function(data) {
		if (data.code<0) {
			myTips("未查询到相关住户信息！","error");
			return;
		}
		data=data.body;
		$('#updateLivingMenHrAddressNew').val(''+data[0].addCommunity + data[0].addBuilding + data[0].addDoorplateno);
		$('#updateLivingMenHrAddressOld').val(''+data[0].addCommunity + data[0].addBuilding + data[0].addDoorplateno);
		$("#updateLivingMenRtId").val(data[0].rtId);
		$("#updateLivingMenRtHrIdNew").val(data[0].rtHrId);
		$("#updateLivingMenRtHrIdOld").val(data[0].rtHrId);
		$('#updateLivingMenRtTypeNew').val(data[0].rtType);
		$('#updateLivingMenRtTypeOld').val(data[0].rtType);
	});
}
//修改住户
function updateLivingMen(){
	$('#updateLivingMenDlg').dialog({
		title : '修改住户',
		top : getTop(200),
		left : getLeft(410),
		width : 410,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateLivingMenDlg [clear="clear"]').val('');
			$('#updateLivingMenDlg [clear="clear"]').html('');
			$('#updateLivingMenDlg [choose="choose"]').val('');
			$('#updateLivingMenDlg [require="require"]').css('border', '1px solid #a9a9a9');
		}
	});
	queryResident();
	$('#updateLivingMenDlg').dialog("open");
}
//执行修改住户
function doUpdateLivingMen() {
	var row = $("#populationDg").datagrid("getSelected");
	var rtPlId = row.popId;
	var rtId = $("#updateLivingMenRtId").val();
	var rtTypeNew = $('#updateLivingMenRtTypeNew').val();
	var rtTypeOld = $('#updateLivingMenRtTypeOld').val();
	var rtHrIdNew = $("#updateLivingMenRtHrIdNew").val();
	var rtHrIdOld = $("#updateLivingMenRtHrIdOld").val();
	var hrAddressNew = $('#updateLivingMenHrAddressNew').val();
	var hrAddressOld = $('#updateLivingMenHrAddressOld').val();
	if(rtTypeNew == rtTypeOld && rtHrIdNew == rtHrIdOld){
		$('#updateLivingMenDlg').dialog('close');
		return;
	}
	var checkFlag = 0;
	$('#updateLivingMenDlg [require="require"]').each(function(){
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
	var follow = '修改住户，';
	if(rtTypeNew != rtTypeOld){
		follow += '状态：' + rtTypeOld + ' → ' + rtTypeNew + ';';
	}
	if(rtHrIdNew != rtHrIdOld){
		follow += '入住房：' + hrAddressOld + ' → ' + hrAddressNew + ';';
	}
	showLoading();
	$.post("../updateResident.action", {
		rtId : rtId,
		rtPlId : rtPlId,
		rtType : rtTypeNew,
		rtHrId : rtHrIdNew,
		popModifyTheRecord:follow,
		registrantName:_loginUserName,
	}, function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		myTips("修改成功","success");
		queryPopulation(_pageNum[0],0);
		$('#updateLivingMenDlg').dialog('close');
		$('#populationDetailedDlg').dialog('close');
	});
}
//住户选择入住房
function relationDlg() {
	$('#relationDlg').dialog({
		title : '选择入住房',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	relationDataGrid();
	$('#relationDlg').dialog('open');
}
//住户选择入住房-初始化已租列表
function relationDataGrid() {
	if ($('#choseSourceTable').hasClass('datagrid-f')) {
	} else {
		$('#choseSourceTable').datagrid({
			columns : [ [ {
				field : 'hrAddDistrict',
				title : '城区',
				width : 20,
				align : 'center'
			}, {
				field : 'hrAddZone',
				title : '片区',
				width : 20,
				align : 'center'
			}, {
				field : 'hrAddCommunity',
				title : '楼盘名称',
				width : 30,
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
				title : '承租人',
				width : 10,
				align : 'center'
			} ] ],
			width : '100%',
			height: '277px',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#choseSourceTable').datagrid('getSelected');
				if (row) {
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					$("#updateLivingMenRtHrIdNew").val(row.hrId);
					$("#updateLivingMenHrAddressNew").val(''+row.hrAddCommunity + row.hrAddBuilding + row.hrAddDoorplateno);
					$('#relationDlg').dialog('close')
				}
			}
		});
	}
	relationDate(1, 0);
}
//住户选择入住房-查询已租列表
function relationDate(page, type) {
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();
	$.post("../queryHouseRentCommon.action", {
		startNum 		: startNum,
		endNum 			: endNum,
		hrAddCity 		: qhAddCity,
		hrAddDistrict 	: qhAddDistrict,
		hrAddZone 		: qhAddZone,
		hrAddCommunity 	: qhAddCommunity,
		hrAddBuilding 	: qhAddBuilding,
		hrAddDoorplateno: qhAddDoorplateno,
		hrLeaseState	: "在租"
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 1);
			$('#choseSourceTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 1);
			}
			$("#choseSourceTable").datagrid("loadData", data);
		}
	}, "json");
}
/*function queryAddCity() {
	$("#searchAddDistrict").empty();
	$("#searchAddZone").empty();
	$("#searchAddDistrict").append("<option></option>");
	var cityText = $("#searchAddCity").find("option:selected").text();
	if (cityText == '') {
		relationDate(1, 0);
		return;
	}
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$("#searchAddDistrict").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
		relationDate(1, 0);
	});
}*/