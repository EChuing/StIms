_title_address = "";
//【短租房屋列表】
house_list_arr = []
//短租设置信息
setUp = {};
$(function() {
	_loginCompanyRentDistrict = $('#loginCompanyRentDistrict', parent.parent.document).val();//城区
	_loginCompanyRentDistrict =JSON.parse(_loginCompanyRentDistrict);
	$('#shortRentHouseTable').datagrid({
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			openHouseInfo(rowData);
		}
	});
	$("#lockInfoDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
		},
	});
	for (var i in _loginCompanyRentDistrict) {
		$('#addShortRentDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	    $('#searchHsAddDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	    $("#addNoTrusteeshipBuildingName").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	for (var i = 0; i < _sectionType.length; i++) {//户型
		$(".sectionType").append("<option value = '" + _sectionType[i] + "'>" + _sectionType[i] + "</option>");
	}
	getSetUpInfo();
	queryTrusteeship(1, 0);
});
//房间详情用的刷新
function refash(){
	queryTrusteeship(1,0);
}
// 托管房源查询
function queryTrusteeship(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var searchHsAddDistrict = $('#searchHsAddDistrict').val();
	var searchHsAddCommunity = $('#searchHsAddCommunity').val();
	var searchHsAddDoorplateno = $('#searchHsAddDoorplateno').val();
	var searchHsRoomType = $('#searchHsRoomType').val();
	var searchHsMicronetIdentification=$('#searchHsMicronetIdentification').val();
	var searchHsRoomStatusType=$('#searchHsRoomStatusType').val();
	console.log(searchHsRoomStatusType)
	$.post("../queryHouseStoreState.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		hsLeaseState		: "短租房",
		hsAddDistrict		: searchHsAddDistrict,
		hsAddCommunity		: searchHsAddCommunity,
		hsAddDoorplateno	: searchHsAddDoorplateno,
		hsRoomType			: searchHsRoomType,
		jsrcState			: searchHsRoomStatusType,
		hsMicronetIdentification:searchHsMicronetIdentification,
		splitFlag: 1
	}, function(data) {
		if (data.code<0) {
			$('#shortRentHouseTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryTrusteeship","shortRentHouse");
			}else{
				notCountPage(page, 0 ,"queryTrusteeship","shortRentHouse");
			}
		} else {
			data=data.body;
			house_list_arr = data;
			if(data.length<endNum){
				notCountPage(page, 2 , "queryTrusteeship","shortRentHouse");
			}else{
				notCountPage(page, 1 , "queryTrusteeship","shortRentHouse");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].houseShortState = (data[i].hsLeaseType == 1 || data[i].hsLeaseType == 3)  ? "正常" : "注销";
				
				data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
				
				data[i].hsMicronetIdentifica=data[i].hsMicronetIdentification==1?"未发布":"已发布";
				if(data[i].jsrcState==""){
					data[i].jsrcState="空房"
				}
			}
			if(searchHsRoomStatusType!=""){
				var popList = [];
				for (var i in data) {
					if(data[i].jsrcState==searchHsRoomStatusType){
						popList.push(data[i]);
					}
				}
				$("#shortRentHouseTable").datagrid("loadData", popList);
				
			}else{
				$("#shortRentHouseTable").datagrid("loadData", data);
			}
			}
	}, "json");
}
var shortRentRoomType=[];
//查询短租房型
function getSetUpInfo(){
	$.ajax({
		url:"../getSetUpInfo.action",
		type:"post",
		data:{
			jsrsuId : 1,
		},
		success:function(result){
			if(result.code == 1){
				var data = JSON.parse(result.body);
				data = data[0];
				var html="";
				var html1="";
				setUp = data;
				//将对象里面字符串转化为对象
				var newdata=JSON.parse(data.jsrsuRoomType);
				shortRentRoomType = newdata;
				html1 = '<option value="">'+'全部'+'</option>';
				for(var i in newdata){
					html += '<option value='+newdata[i].roomType+'>'+newdata[i].roomType;+'</option>';
					html1 += '<option value='+newdata[i].roomType+'>'+newdata[i].roomType;+'</option>';
				}
				$("#addShortHouseType").html(html);
				$("#shortHouseType").html(html);
				$("#searchHsRoomType").html(html1);
			}else{
				myTips(result.msg,"error")
			}
			
		}
	})
}
//分页统计总条数
function getshortRentHousePageCount(page){
	var pageSize = 20;
	var searchHsAddDistrict = $('#searchHsAddDistrict').val();
	var searchHsAddCommunity = $('#searchHsAddCommunity').val();
	var searchHsAddDoorplateno = $('#searchHsAddDoorplateno').val();
	var searchHsRoomType = $('#searchHsRoomType').val();
	var searchHsMicronetIdentification=$('#searchHsMicronetIdentification').val();
	var searchHsRoomStatusType=$('#searchHsRoomStatusType').val();
	
	$.post("../queryHouseStoreState.action", {
		hsLeaseState		: "短租房",
		hsAddDistrict		: searchHsAddDistrict,
		hsAddCommunity		: searchHsAddCommunity,
		hsAddDoorplateno	: searchHsAddDoorplateno,
		hsRoomType			: searchHsRoomType,
		jsrcState			: searchHsRoomStatusType,
		hsMicronetIdentification:searchHsMicronetIdentification,
		splitFlag: 0,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"shortRentHouse",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"shortRentHouse",0);
		}
	});
}
//添加房客窗口
function addshortHouse(){
	$('#addGuestRoomsDlg').dialog({
		title : "添加客房",
		top : getTop(310),
		left : getLeft(800),
		width : 820,
		height : 310,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addGuestRoomsDlg [clear="clear"]').val('');
			$('#addGuestRoomsDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$("#add_room_configuration .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
		}
	});
	$('#houseInfoDlg [clear="clear1"]').attr("disabled","disabled");
	$('#shortRentCity').val(_loginCompanyRentCity);
	$('#shortRentProvince').val(_loginCompanyRentProvince);
	$('#addGuestRoomsDlg').dialog('open');

	getSetUpInfo();
}
//房间配置
$('.configuration button').click(function(){
	if ($(this).hasClass('btn-default')) {
		$(this).removeClass('btn-default');
		$(this).addClass('btn-success');
	} else {
		$(this).removeClass('btn-success');
		$(this).addClass('btn-default');
	}
});
//确认设置短租房
function changeShortRent(type){
	var roomConfiguration= '';
	$("#add_room_configuration .btn").each(function(){
		if($(this).hasClass('btn-success')){
			roomConfiguration += $(this).val();
			roomConfiguration += ' ';
		}
	});
}
//添加短租房
function addShortRentHouse(){
	//获取房间配置
	var roomConfiguration= '';
	$("#add_room_configuration .btn").each(function(){
		if($(this).hasClass('btn-success')){
			roomConfiguration += $(this).val();
			roomConfiguration += ' ';
		}
	});

	var shortRentProvince = $('#shortRentProvince').val();
	var shortRentCity = $('#shortRentCity').val();
	var addShortRentDistrict = $('#addShortRentDistrict').find("option:selected").text();
	var buildingName = $('#buildingName').val();
	var addShortRentDoorplateno = $('#addShortRentDoorplateno').val();
	var addHsDailyRent = $('#addHsDailyRent').val();
	var addHsHotDailyRent = $('#addHsHotDailyRent').val();
	var addHsResidentiality = $('#addHsResidentiality').val();
	var addShortHouseType = $('#addShortHouseType').val();
	var addHsTimePrice=$('#addHsTimePrice').val();
	var hsSectionType=$('#addHsSectionType').find("option:selected").val();
	showLoading();
	$.post("../shortRentHouse.action", {
		hsUserId 			: _loginUserId,
		hsDepartment 		: _loginDepartment,
		hsStorefront 		: _loginStore,
		hsAddProvince		: shortRentProvince,
		hsAddCity			: shortRentCity,
		hsAddDistrict		: addShortRentDistrict,
		hsAddCommunity		: buildingName,
		hsAddDoorplateno	: addShortRentDoorplateno,
		hsFurnitureConfig	: roomConfiguration,
		hsDailyRent			: addHsDailyRent,
		hsHotDailyRent		: addHsHotDailyRent,
		hsRoomType			: addShortHouseType,
		hsTimePrice			: addHsTimePrice,
		hsResidentiality	: addHsResidentiality,
		hsSectionType       : hsSectionType,
		hsLeaseType			: 3,
	},function(data) {
		hideLoading();
		isSave = true;
		if(data.code<0){
			if(data.code < 0){
				myTips(data.msg,"error");
			}
			hideLoading();
			return;
		}
		queryTrusteeship(_pageNum[0], 0);
		myTips('添加成功', 'success');
		$('#addGuestRoomsDlg').dialog('close');
	});
}

function getHouseData(hsId){
	var house;
	for(var i in house_list_arr){
		if(house_list_arr[i].hsId == hsId){
			house = JSON.parse(JSON.stringify(house_list_arr[i]));
			break;
		}
	}
	return house;
}
//选城区查楼盘
function noZoneLink() {
	$("#addShortRentZone").empty();
	$("#addNoTrusteeshipBuildingName").empty('');
	$("#addShortRentStreet").val('');
	$("#infoDoorplatenoRelus").text('');
	$("#addNoTrusteeshipBuildingId").val('');
	$("#addShortRentZone").append("<option></option>");
	var cityText = '';
	var districtText = '';
	$("#addNoTrusteeshipBuildingName").empty('');
	$("#buildingName").val('');
	cityText = $("#shortRentCity").val();
	districtText = $("#addShortRentDistrict").find("option:selected").text();
	if (districtText == '') {
		filteroption("addNoTrusteeshipBuildingName");
		return;
	}
	$.post("../queryForHouseDictAddress.action", {
	    hdCity : cityText,
		hdDistrict : districtText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		$("#addNoTrusteeshipBuildingName").append("<option></option>");
		for (var i in data) {
			$("#addNoTrusteeshipBuildingName").append("<option value = '" + i + "'>" + data[i] + "</option>");
		}
		filteroption("addNoTrusteeshipBuildingName");
	});
}
//选楼盘查门牌规则
function noStreeLink() {
	$("#addShortRentStreet").val('');
	$("#addNoTrusteeshipBuildingId").val('');
	$("#infoDoorplatenoRelus").text('');
	var cityText = '';
	var districtText = '';
	var zoneText = '';
	var buildNameText = '';
	cityText = $("#shortRentCity").val();
	districtText = $("#addShortRentDistrict").find("option:selected").text();
	zoneText = $("#addShortRentZone").find("option:selected").text();
	buildNameText = $("#addNoTrusteeshipBuildingName").find("option:selected").text()
	if (buildNameText == '') {
		return;
	}
	choseSelectVal("buildingName", "addNoTrusteeshipBuildingName" ,"buildingNameDiv");
	$.post("../queryAllHouseDict.action",{
		hdCity : cityText,
		hdDistrict : districtText,
		hdZone : zoneText,
		hdCommunity : buildNameText
	},function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		$("#addShortRentStreet").val(data[0].hdRoad);
		$("#addNoTrusteeshipBuildingId").val(data[0].hdId);
		$("#addHsHouseDictId").val(data[0].hdId);
		$("#addShortRentZone").val(data[0].hdZone);
/*		$(".hd_doorplateno_relus").val(data[0].hdDoorplatenoRelus);
		var relusVal = data[0].hdDoorplatenoRelus;
		if(_doorplateno == 1){
			if (relusVal.split(',').length != 3) {//没有规则
				$("#doornoMsg").html('暂无门牌规则');
			}
		}
		doorplatenoRelusPush(relusVal, 0);
		$("#infoDoorplatenoRelus").text(doorplatenoShow(relusVal));*/
	});
}

//设置集中式公寓对话框
function centralizedApartment(){
	var row = $('#shortRentHouseTable').datagrid('getSelected');
	if(!row){
		$.messager.alert("提示", "请选择一个短租房进行设置！","info");
		return;
	}
	$('#centralizedApartmentDlg').dialog({
		title : '批量添加客房',
		top : getTop(470),
		left : getLeft(700),
		width : 700,
		height : 470,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			if ($('#centralizedApartmentRuleDg2').hasClass('datagrid-f')) {
				$('#centralizedApartmentRuleDg2').datagrid("loadData", []);
			}
			if ($('#centralizedApartmentRoomDg2').hasClass('datagrid-f')) {
				$('#centralizedApartmentRoomDg2').datagrid("loadData", []);
			}
		},
	});
	$('#centralizedApartmentDlg').dialog("open");
	var nameplan = [{
		planId: 1,
		plan: '数字楼层+数字房号'
	}, {
		planId: 2,
		plan: '数字楼层+字母房号'
	}, {
		planId: 3,
		plan: '楼层减一加A+数字房号'
	}, {
		planId: 4,
		plan: '楼层减一加A+字母房号'
	}, {
		planId: 5,
		plan: '楼层减一加A+数字房号减一加A'
	}, {
		planId: 6,
		plan: '数字楼层+数字房号减一加A'
	}];
	if ($('#centralizedApartmentRuleDg2').hasClass('datagrid-f')) {

	} else {
		$('#centralizedApartmentRuleDg2').datagrid({
			columns : [ [
			{
				field : 'community',
				title : '门店',
				width : '20%',
				align : 'center',
				editor: {
					type:'textbox',
					options:{
						required:true,
					}
				}
			},
			{
				field : 'building',
				title : '单栋',
				width : '10%',
				align : 'center',
				editor: {
					type:'textbox',
					options:{
						required:true,
					}
				}
			},
			{
				field : 'beginFloor',
				title : '开始层数',
				width : '10%',
				align : 'center',
				editor: {
					type:'numberbox',
					options:{
						precision:0,
						required:true,
					}
				}
			},
			{
				field : 'endFloor',
				title : '结束层数',
				width : '10%',
				align : 'center',
				editor: {
					type:'numberbox',
					options:{
						precision:0,
						required:true,
					}
				}
			},
			{
				field : 'startRoomNum',
				title : '开始房间号',
				width : '10%',
				align : 'center',
				editor: {
					type:'numberbox',
					options:{
						precision:0,
						required:true,
					}
				}
			},
			{
				field : 'endRoomNum',
				title : '结束房间号',
				width : '10%',
				align : 'center',
				editor: {
					type:'numberbox',
					options:{
						precision:0,
						required:true,
					}
				}
			},
			{
				field : 'namePlan',
				title : '房号命名方案',
				width : '20%',
				align : 'center',
				formatter:function(value){
					for(var i=0; i<nameplan.length; i++){
						if (nameplan[i].planId == value) return nameplan[i].plan;
					}
					return value;
				},
				editor:{
					type:'combobox',
					options:{
						valueField:'planId',
						textField:'plan',
						data:nameplan,
						required:true,
						editable:false
					}
				}
			} , {
				field : 'roomNumPrefix',
				title : '房号前缀',
				width : '10%',
				align : 'center',
				editor: {
					type:'textbox'
				}
			} ] ],
			width : '100%',
			height : '306px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			toolbar : '#centralizedApartmentRuleTB2',
			onClickRow : onClickRow4
		});
	}
	gotoStep('centralizedApartment', 1);
}
//下一步step=2/保存step=3
function centralizedNextStep(step) {
	if (step == 2) {
		var house = newCentralizedApartment('setCentralized');
		if (house == undefined || house == []) {
			return;
		}
		if(!validateStep('centralizedApartment', 2)){
			return;
		}
		var sectionType = [{value:''}];
		for (var i in _sectionType) {
			var item = {};
			item.value = _sectionType[i];
			sectionType.push(item);
		}
		var direction = [{value:''}];
		for (var i in _direction) {
			var item = {};
			item.value = _direction[i];
			direction.push(item);
		}
		if ($('#centralizedApartmentRoomDg2').hasClass('datagrid-f')) {

		} else {
			$('#centralizedApartmentRoomDg2').datagrid({
				columns : [ [
				{
					field : 'community',
					title : '小区名',
					width : '136',
					align : 'center',
					editor: {
						type:'textbox',
						options:{
							required:true,
						}
					}
				},
				{
					field : 'building',
					title : '栋/单元',
					width : '12%',
					align : 'center',
					editor: {
						type:'textbox',
						options:{
							required:true,
						}
					}
				},
				{
					field : 'doorplateno',
					title : '门牌号',
					width : '12%',
					align : 'center',
					editor: {
						type:'textbox',
						options:{
							required:true,
						}
					}
				},
				{
					field : 'maxPeople',
					title : '可居住人数',
					width : '12%',
					align : 'center',
					editor: {
						type:'numberbox',
						options:{
							precision:0,
							required:true,
						}
					}
				},
				{
					field : 'sectionType',
					title : '户型',
					width : '12%',
					align : 'center',
					formatter:function(value){
						for(var i=0; i<sectionType.length; i++){
							if (sectionType[i].value == value) return sectionType[i].value;
						}
						return value;
					},
					editor:{
						type:'combobox',
						options:{
							valueField:'value',
							textField:'value',
							data:sectionType,
//							required:true,
							editable:false
						}
					}
				},

				{
					field : 'roomType',
					title : '房间房型',
					width : '25%',
					align : 'center',
					formatter:function(value){
						for(var i=0; i<shortRentRoomType.length; i++){
								if (shortRentRoomType[i].roomType == value) return shortRentRoomType[i].roomType;
							}
						return value;
					},
					editor:{
						type:'combobox',
						options:{
							valueField:'roomType',
							textField:'roomType',
							data:shortRentRoomType,
							required:true,
							editable:false
						}
					}
				}, 
				] ],
				width : '100%',
				height : '306px',
				singleSelect : true,
				autoRowHeight : false,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				toolbar : '#centralizedApartmentRoomTB2',
				onClickRow : onClickRow5
			});
		}
		$('#centralizedApartmentRoomDg2').datagrid('loadData', house);
	} else if (step == 3) {
		var result = accept5();
		if (result == 'error') {
			return;
		}
		doSetCentralized();
	}
}
//执行批量添加客房
function doSetCentralized(){
	var row = $('#shortRentHouseTable').datagrid('getSelected');
	var rows = $('#centralizedApartmentRoomDg2').datagrid('getRows');
	if (rows.length == 0) {
		myTips('请添加房间', 'error');
		return;
	}
	var jsonArray = [];
	for(var i = 0;i < rows.length; i++){
		jsonArray.push({
			hsUserId 			: _loginUserId,
			hsDepartment 		: _loginDepartment,
			hsStorefront 		: _loginStore,
			hsAddProvince		: row.hsAddProvince,
			hsAddCity			: row.hsAddCity,
			hsAddDistrict		: row.hsAddDistrict,
			hsFurnitureConfig	: row.hsFurnitureConfig,
			hsAddCommunity		: rows[i].community,
			hsAddBuilding		: rows[i].building,
			hsAddDoorplateno	: rows[i].doorplateno,
			hsSectionType		: rows[i].sectionType,
			hsDailyRent			: rows[i].dailyRent,
			hsHotDailyRent		: rows[i].hotDailyRent,
			hsRoomType			: rows[i].roomType,
			hsResidentiality	: rows[i].maxPeople,
			hsLeaseType			: 3,
		});
	}
	showLoading();
	$.post("../insertHouseList.action", {
			jsonArray	: JSON.stringify(jsonArray)
	},function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		queryTrusteeship(_pageNum[0], 0);
		myTips('添加成功', 'success');
		$('#centralizedApartmentDlg').dialog('close');
	});
}
//集中式公寓预生成
function newCentralizedApartment(type){
	if(type=='setCentralized'){
		var result = accept4();
		if (result == 'error') {
			return;
		}
		var rows = $('#centralizedApartmentRuleDg2').datagrid('getRows');
		if (rows.length == 0) {
			myTips('请添加规则', 'error');
			return;
		}
	}
	
	var house = [];
	for (var i in rows) {
		var community = rows[i].community;
		var building = rows[i].building;
		var floor = rows[i].beginFloor;
		var floorNums = rows[i].endFloor - rows[i].beginFloor + 1;
		var roomNums = rows[i].endRoomNum - rows[i].startRoomNum + 1;
		var namePlan = rows[i].namePlan;
		var roomNumPrefix = rows[i].roomNumPrefix;
		var roomType = rows[i].roomType; 
		var dailyRent = rows[i].dailyRent;
		var hotDailyRent = rows[i].hotDailyRent;
		if(namePlan == 2 && roomNums > 26){
			myTips('字母房号每层最多26间', 'error');
			return;
		}
		if(namePlan == 4 && roomNums > 26){
			myTips('字母房号每层最多26间', 'error');
			return;
		}
		if(floorNums<1){
			myTips('楼层设置错误', 'error');
			return;
		}
		var room = rows[i].startRoomNum;
		var word = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for(var j=1;j<parseInt(floorNums)*parseInt(roomNums)+1;j++){
			var item = {};
			item.community = community;
			item.building = building;
			item.floor = floor;
			item.room = room;
			if(namePlan==1){//数字楼层+数字房号
				var doorplateno = "";
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				if(floor<10){
					doorplateno += "0" + floor;
				}else{
					doorplateno += floor;
				}
				if(room<10){
					doorplateno += "0" + room;
				}else{
					doorplateno += room;
				}
				item.doorplateno = doorplateno;
			}
			if(namePlan==2){//数字楼层+字母房号
				var doorplateno = "";
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				if(floor<10){
					doorplateno += "0" + floor;
				}else{
					doorplateno += floor;
				}
				doorplateno += word[parseInt(room) - 1];
				item.doorplateno = doorplateno;
			}
			if(namePlan == 3){//楼层减一加A，数字房号
				var doorplateno = "";
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				if(floor<10){
					doorplateno += "0" + floor - 1 + "A";
				}else{
					doorplateno += floor - 1 + "A";
				}
				if(room<10){
					doorplateno += "0" + room;
				}else{
					doorplateno += room;
				}
				item.doorplateno = doorplateno;
			}
			if(namePlan == 4){//楼层减一加A，字母房号
				var doorplateno = "";
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				if(floor<10){
					doorplateno += "0" + floor - 1 + "A";
				}else{
					doorplateno += floor - 1 + "A";
				}
				doorplateno += word[parseInt(room) - 1];
				item.doorplateno = doorplateno;
			}
			if(namePlan == 5){//楼层减一加A+数字房号减一加A
				var doorplateno = "";
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				if(floor<10){
					doorplateno += "0" + floor - 1 + "A";
				}else{
					doorplateno += floor - 1 + "A";
				}
				if(room<10){
					doorplateno += "0" + room - 1 + "A";
				}else{
					doorplateno += room - 1 + "A";
				}
				item.doorplateno = doorplateno;
			}
			if(namePlan == 6){//数字楼层+数字房号减一加A
				var doorplateno = "";
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				if(floor<10){
					doorplateno += "0" + floor;
				}else{
					doorplateno += floor;
				}
				if(room<10){
					doorplateno += "0" + room - 1 + "A";
				}else{
					doorplateno += room - 1 + "A";
				}
				item.doorplateno = doorplateno;
			}
			item.roomType = roomType;
			item.dailyRent = dailyRent;
			item.hotDailyRent = hotDailyRent;
			house.push(item);
			room++;
			if(room>rows[i].endRoomNum){
				room=rows[i].startRoomNum;
				floor++;
			}
		}
	}
	return house;
}
//点击一行触发
function onClickRow4(index) {
	if (editIndex4 != index){
		if (endEditing4()) {
			$('#centralizedApartmentRuleDg2').datagrid('selectRow', index).datagrid('beginEdit', index);
			editIndex4 = index;
		} else {
			$('#centralizedApartmentRuleDg2').datagrid('selectRow', editIndex4);
		}
	}
}
//设置集中房，设置门牌规则
var editIndex4 = undefined;
function endEditing4() {
	if (editIndex4 == undefined) {
		return true;
	}
	if ($('#centralizedApartmentRuleDg2').datagrid('validateRow', editIndex4)) {
		$('#centralizedApartmentRuleDg2').datagrid('endEdit', editIndex4);
		editIndex4 = undefined;
		return true;
	} else {
		return false;
	}
}
//添加
function append4(){
	if (endEditing4()){
		var row = $('#shortRentHouseTable').datagrid('getSelected');
		var addCommunity = row.hsAddCommunity;
		var addBuilding = row.hsAddBuilding;
		$('#centralizedApartmentRuleDg2').datagrid('appendRow', {community:addCommunity,building:addBuilding});
		editIndex4 = $('#centralizedApartmentRuleDg2').datagrid('getRows').length-1;
		$('#centralizedApartmentRuleDg2').datagrid('selectRow', editIndex4).datagrid('beginEdit', editIndex4);
	} else {
		myTips('数据不完整', 'error');
	}
}
//删除
function removeit4(){
	if (editIndex4 == undefined){
		myTips('请选择一条记录', 'error');
		return
	}
	$('#centralizedApartmentRuleDg2').datagrid('cancelEdit', editIndex4).datagrid('deleteRow', editIndex4);
	editIndex4 = undefined;
}
//保存
function accept4(){
	if (endEditing4()){
		$('#centralizedApartmentRuleDg2').datagrid('acceptChanges');
		return 'success';
	} else {
		myTips('数据不完整', 'error');
		return 'error';
	}
}
//点击一行触发
function onClickRow5(index) {
	if (editIndex5 != index){
		if (endEditing5()) {
			$('#centralizedApartmentRoomDg2').datagrid('selectRow', index).datagrid('beginEdit', index);
			editIndex5 = index;
		} else {
			$('#centralizedApartmentRoomDg2').datagrid('selectRow', editIndex5);
		}
	}
}
//添加集中房，保存集中房
var editIndex5 = undefined;
function endEditing5() {
	if (editIndex5 == undefined) {
		return true;
	}
	if ($('#centralizedApartmentRoomDg2').datagrid('validateRow', editIndex5)) {
		$('#centralizedApartmentRoomDg2').datagrid('endEdit', editIndex5);
		editIndex5 = undefined;
		return true;
	} else {
		return false;
	}
}
//添加
function append5(){
	if (endEditing5()){
		var row = $('#shortRentHouseTable').datagrid('getSelected');
		var addCommunity = row.hsAddCommunity;
		var addBuilding = row.hsAddBuilding;
		$('#centralizedApartmentRoomDg2').datagrid('appendRow', {community:addCommunity,building:addBuilding});
		editIndex5 = $('#centralizedApartmentRoomDg2').datagrid('getRows').length-1;
		$('#centralizedApartmentRoomDg2').datagrid('selectRow', editIndex5).datagrid('beginEdit', editIndex5);
	} else {
		myTips('数据不完整', 'error');
	}
}

//删除
function removeit5(){
	if (editIndex5 == undefined){
		myTips('请选择一条记录', 'error');
		return
	}
	$('#centralizedApartmentRoomDg2').datagrid('cancelEdit', editIndex5).datagrid('deleteRow', editIndex5);
	editIndex5 = undefined;
}
//保存
function accept5(){
	if (endEditing5()){
		$('#centralizedApartmentRoomDg2').datagrid('acceptChanges');
		return 'success';
	} else {
		myTips('数据不完整', 'error');
		return 'error';
	}
}


//type=0为批量上架   type=1为批量下架 type=2为批量注销
function batchShelves(type){
	var rows = $('#shortRentHouseTable').datagrid('getChecked');
	if(rows.length == 0){
		myTips('请选中需要设置的房间！', 'error');
		return;
	}
	console.log(rows)
	var changeStateList = [];
	var jhfFollowList = [];
	for(var i in rows){
		var jhfFollowRemark = "";
		var obj={};
		var followObj={};
		
		if(type == 0){//设为上架
			obj.hsMicronetIdentification = 2;
			jhfFollowRemark = rows[i].detailedAddress +"设置为发布状态"
		}
		if(type == 1){//设为下架
			obj.hsMicronetIdentification = 1;
			jhfFollowRemark = rows[i].detailedAddress +"设置为下架状态"
		}
		if(type == 2){//注销房间
			if(rows[i].hsLeaseType == 1){
				obj.hsLeaseType = 2;
				jhfFollowRemark = rows[i].detailedAddress +"设置为长租房"
			}else if(rows[i].hsLeaseType == 3){
				obj.hsLeaseType = 4;
				jhfFollowRemark = rows[i].detailedAddress +"设置为注销房间"
			}else{
				myTips(rows[i].detailedAddress +"不能注销","error")
				return;
			}
			
		}
		if(type == 3){//启用房间
			if(rows[i].hsLeaseType == 4){
				obj.hsLeaseType = 3;
				jhfFollowRemark = rows[i].detailedAddress +"重新启用"
			}else{
				myTips(rows[i].detailedAddress +"不能启用","error")
				return;
			}
		}
		
		
		obj.hsId = rows[i].hsId;
		var jhfHouse4storeId = rows[i].hsId;
		
		var nowTime = new Date().format("yyyy-MM-dd hh:mm:ss");
		followObj = {
			jhfUserId 		: _loginUserId,
			jhfDepartment	: _loginDepartment,
			jhfStorefront	: _loginStore,
			jhfHouse4storeId: jhfHouse4storeId,
			jhfFollowTime	: nowTime,
			jhfFollowRemark	: jhfFollowRemark,
			jhfPaymentWay	: "系统跟进",
			jhfFollowResult	: "新增成功",
			jhfFollowBelong	: "其他",
			jhfRemind		: "否"
		}
		
		changeStateList.push(obj);
		jhfFollowList.push(followObj);
	}
	
	$.messager.confirm("操作提示", "是否修改房间的状态",  function(data) {
		if(data){
			showLoading();
			$.post("../updateDirtyHouse.action", {
				jsonArray 	: JSON.stringify(changeStateList),
				followArray	: JSON.stringify(jhfFollowList)
				},function(data) {
				hideLoading();
				if(data.code < 0){
					myTips("修改失败","error");
					return;
				}
				myTips("设置成功", "success");
				queryTrusteeship(1, 0)
			});
		}
	});
}



//门店管理对话框
function houseDict(){
	$('#houseDict').dialog({
		title : '门店管理',
		top : getTop(545),
		left : getLeft(700),
		width : 700,
		height : 545,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#searchHouseDic [clear="clear"]').val('');
		},
	});
	queryDic(1,0);
	$("#houseDict").dialog('open');
}

//打开批量添加未租独立页面
function batchAdditionSRH() {
	$('#batchAdditionShortRentHouseDlg').dialog({
		title : '集中式添加',
		top : getTop(510),
		left : getLeft(1100),
		width : 1100,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function(){
			$('#batchAdditionShortRentHouseBill').attr("src","");
		}
	});
	$('#batchAdditionShortRentHouseBill').attr('src','batchAdditionShortRentHouse.jsp');
	$('#batchAdditionShortRentHouseDlg').dialog('open');
	
}