$(function() {
	queryDic(1,0);
	$('#houseDicDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			updateDic();
		}
	});
	//城区
	for (var i in _loginCompanyRentDistrict) {
		$("#searchDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	//门牌规则
	for (var i in _doorplatenoType) {//value=i
		$(".doorplateno_type").append("<option value = '" + i + "'>" + _doorplatenoType[i] + "</option>");
	}
});

//分页统计总条数
function gethouseDicPageCount(page){
	var pageSize = 20;
	var	qDistrict = $("#searchDistrict").find("option:selected").val();
	var	qZone = $("#searchZone").val();
	var	qRoad = $("#searchRoad").val();
	var	qCommunity = $("#searchCommunity").val();
	$.post("../queryHouseDict.action", {
//		hdProvince: _loginCompanyRentProvince,
//		hdCity: _loginCompanyRentCity,
		hdDistrict: qDistrict,
		hdZone: qZone,
		hdRoad: qRoad,
		hdCommunity: qCommunity,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"houseDic",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"houseDic",0);
		}
	});
}

//查询房屋字典
function queryDic(page,type){
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var	qDistrict = $("#searchDistrict").find("option:selected").val();
	var	qZone = $("#searchZone").val();
	var	qRoad = $("#searchRoad").val();
	var	qCommunity = $("#searchCommunity").val();
	$.post("../queryHouseDict.action", {
		startNum: startNum,
		endNum: endNum,
//		hdProvince: _loginCompanyRentProvince,
//		hdCity: _loginCompanyRentCity,
		hdDistrict: qDistrict,
		hdZone: qZone,
		hdRoad: qRoad,
		hdCommunity: qCommunity,
	}, function(data) {
		if (data.code < 0) {
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryDic","houseDic");
			}else{
				notCountPage(page, 0 ,"queryDic","houseDic");
			}
			$('#houseDicDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			// if (page == 1 && type == 0) {
			// 	sourcePage(data.body[0].totalNum, page, 0);
			// }
			if(data.body.length<endNum){
				notCountPage(page, 2 , "queryDic","houseDic");
			}else{
				notCountPage(page, 1 , "queryDic","houseDic");
			}
			$("#houseDicDg").datagrid("loadData", data.body);
		}
	});
}	
//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#houseDicPage").remove();
		$("#houseDicPageDiv").append("<div class='tcdPageCode' id='houseDicPage' style='text-align:center;'></div>");
		$("#houseDicPage").createPage({
			onePageNums: 30,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function(p) {
				if (p <= pageNum) {
					queryDic(p, 1);
				}
			}
		});
	}
}
//添加房屋字典
function addHouseDic(){
	$('#houseDicInfoDlg').dialog({
		title : '添加字典',
		top : getTop(250),
		left : getLeft(600),
		width : 600,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#houseDicInfoDlg input').val("");
			$('#houseDicInfoDlg textarea').val("");
//			$('#houseDicInfoDlg [clear="clear"]').val('');
//			$('#houseDicInfoDlg [clean="clean"]').html('');
			$('#houseDicInfoDlg [choose="choose"]').val('');
			$('#houseDicInfoDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#houseDicInfoDlg [require="add"]').css('border', '1px solid #a9a9a9');
		}
	});
	$('#saveHouseDic').show();
	$('#updateHouseDic').hide();
	//初始化省市
	$('#distpicker').distpicker('destroy');
	$('#distpicker').distpicker({
		province: _loginCompanyRentProvince,
		city: _loginCompanyRentCity,
		district: '---- 所在区 ----'
	});
	$("#houseDicInfoDlg").dialog('open');
}
//执行添加字典
function doAddHouseDic(){
	var checkFlag = 0;
	$('#houseDicInfoDlg [require="require"], #houseDicInfoDlg [require="add"]').each(function(){
		if($(this).val()==''){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	var hdProvince = $(".houseDic_province").val();
	var hdCity = $(".houseDic_city").val();
	var hdDistrict = $(".houseDic_district").val();
	var hdZone = $(".houseDic_zone").val();
	var hdRoad = $(".houseDic_road").val();
	var hdBaiduLongitudeX = $(".houseDic_baidu_x").val();
	var hdCommunity = $("#houseDicCommunity").val();
	var hdPinyin = $("#houseDicPinyin").val();
	var hdBaiduLatitudeY = $(".houseDic_baidu_y").val();
	var hdBuildingForm = $(".houseDic_form").val();
	var hdPropertyType = $(".houseDic_type").val();
	var hdBeCompletedTime = $(".houseDic_time").val();
	var hdBuildingDevelopers = $(".houseDic_developers").val();
	var hdItemFeatures = $(".houseDic_features").val();
	var hdLoopPosition = $(".houseDic_position").val();
	var hdPlotRatio = $(".houseDic_plot_ratio").val();
	var hdAfforestationRate = $(".houseDic_afforestation_rate").val();
	var hdPropertyFee = $(".houseDic_property_free").val();
	var hdPropertyCompany = $(".houseDic_property_company").val();
	var hdAdditionalInformation = $(".houseDic_property_note").val();
	var hdCoversAnAreaOf = $(".houseDic_covers_area").val();
	var hdFloorArea = $(".houseDic_floor_area").val();
	var hdSumHouseholds = $(".houseDic_sum_households").val();
	var hdParkingSpaceTop = $(".houseDic_space_top").val();
	var hdParkingSpaceNuder = $(".houseDic_space_nude").val();
	var hdTheCurrentNumber  = $(".houseDic_current_number").val();
	var hdZoneBitIntroduce = $(".houseDic_introduce").val();
	var hdDoorplatenoRelus = $(".hd_doorplateno_relus").val();
	showLoading();
	$.post("../insertHouseDict.action", {
		 hdProvince: hdProvince,
		 hdCity: hdCity,
		 hdDistrict: hdDistrict,
		 hdZone: hdZone,
		 hdRoad: hdRoad,
		 hdBaiduLongitudeX: hdBaiduLongitudeX,
		 hdCommunity: hdCommunity,
		 hdPinyin: hdPinyin,
		 hdBaiduLatitudeY: hdBaiduLatitudeY,
		 hdBuildingForm: hdBuildingForm,
		 hdPropertyType: hdPropertyType,
		 hdBeCompletedTime: hdBeCompletedTime,
		 hdBuildingDevelopers: hdBuildingDevelopers,
		 hdItemFeatures: hdItemFeatures,
		 hdLoopPosition: hdLoopPosition,
		 hdPlotRatio: hdPlotRatio,
		 hdAfforestationRate: hdAfforestationRate,
		 hdPropertyFee: hdPropertyFee,
		 hdPropertyCompany: hdPropertyCompany,
		 hdAdditionalInformation: hdAdditionalInformation,
		 hdCoversAnAreaOf: hdCoversAnAreaOf,
		 hdFloorArea: hdFloorArea,
		 hdSumHouseholds: hdSumHouseholds,
		 hdParkingSpaceTop: hdParkingSpaceTop,
		 hdParkingSpaceNuder: hdParkingSpaceNuder,
		 hdTheCurrentNumber: hdTheCurrentNumber,
		 hdZoneBitIntroduce: hdZoneBitIntroduce,
		 hdDoorplatenoRelus: hdDoorplatenoRelus,
	}, function(data) {
		hideLoading();
		if(data.code < 0){
			myTips(data.msg, "error");
		}else{
			myTips("添加成功", "success");
			queryDic(1,0);
			//更新登录时缓存的城区列表
			updateLoginCompanyRentDistrict();
			$("#houseDicInfoDlg").dialog('close');
		}
	});
	
}
//修改房屋字典
function updateDic(){
	var row = $('#houseDicDg').datagrid('getSelected');
	$('#houseDicInfoDlg').dialog({
		title : '修改字典',
		top : getTop(250),
		left : getLeft(600),
		width : 600,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#houseDicInfoDlg input').val("");
			$('#houseDicInfoDlg textarea').val("");
//			$('#houseDicInfoDlg [clear="clear"]').val('');
//			$('#houseDicInfoDlg [clean="clean"]').html('');
			$('#houseDicInfoDlg [choose="choose"]').val('');
			$('#houseDicInfoDlg [require="require"]').css('border', '1px solid #a9a9a9');
		}
	});
	$('#saveHouseDic').hide();
	$('#updateHouseDic').show();
	//初始化省市区
	$('#distpicker').distpicker('destroy');
	$('#distpicker').distpicker({
		province: row.hdProvince,
		city: row.hdCity,
		district: row.hdDistrict
	});
	$(".houseDic_zone").val(row.hdZone);
	$(".houseDic_road").val(row.hdRoad);
	$(".houseDic_baidu_x").val(row.hdBaiduLongitudeX);
	$("#houseDicCommunity").val(row.hdCommunity);
	$(".houseDic_baidu_y").val(row.hdBaiduLatitudeY);
	$(".houseDic_form").val(row.hdBuildingForm);
	$(".houseDic_type").val(row.hdPropertyType);
	$(".houseDic_time").val(row.hdBeCompletedTime);
	$(".houseDic_developers").val(row.hdBuildingDevelopers);
	$(".houseDic_features").val(row.hdItemFeatures);
	$(".houseDic_position").val(row.hdLoopPosition);
	$(".houseDic_plot_ratio").val(row.hdPlotRatio);
	$(".houseDic_afforestation_rate").val(row.hdAfforestationRate);
	$(".houseDic_property_free").val(row.hdPropertyFee);
	$(".houseDic_property_company").val(row.hdPropertyCompany);
	$(".houseDic_property_note").val(row.hdAdditionalInformation);
	$(".houseDic_covers_area").val(row.hdCoversAnAreaOf);
	$(".houseDic_floor_area").val(row.hdFloorArea);
	$(".houseDic_sum_households").val(row.hdSumHouseholds);
	$(".houseDic_space_top").val(row.hdParkingSpaceTop);
	$(".houseDic_space_nude").val(row.hdParkingSpaceNuder);
	$(".houseDic_current_number").val(row.hdTheCurrentNumber);
	$(".houseDic_introduce").val(row.hdZoneBitIntroduce);
	var relus = row.hdDoorplatenoRelus.split(',');
	$('#doorplatenoType1').val(relus[0]);
	$('#doorplatenoType2').val(relus[1]);
	$('#doorplatenoType3').val(relus[2]);
	$('.hd_doorplateno_relus').val(row.hdDoorplatenoRelus);
	$("#houseDicInfoDlg").dialog('open');
}
//执行修改房屋字典
function doUpdateHouseDic(){
	var checkFlag = 0;
	$('#houseDicInfoDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	var row = $('#houseDicDg').datagrid('getSelected');
	var hdId = row.hdId;
	var hdProvince = $(".houseDic_province").val();
	var hdCity = $(".houseDic_city").val();
	var hdDistrict = $(".houseDic_district").val();
	var hdZone = $(".houseDic_zone").val();
	var hdRoad = $(".houseDic_road").val();
	var hdBaiduLongitudeX = $(".houseDic_baidu_x").val();
	var hdCommunity = $("#houseDicCommunity").val();
	var hdPinyin = $("#houseDicPinyin").val();
	var hdBaiduLatitudeY = $(".houseDic_baidu_y").val();
	var hdBuildingForm = $(".houseDic_form").val();
	var hdPropertyType = $(".houseDic_type").val();
	var hdBeCompletedTime = $(".houseDic_time").val();
	var hdBuildingDevelopers = $(".houseDic_developers").val();
	var hdItemFeatures = $(".houseDic_features").val();
	var hdLoopPosition = $(".houseDic_position").val();
	var hdPlotRatio = $(".houseDic_plot_ratio").val();
	var hdAfforestationRate = $(".houseDic_afforestation_rate").val();
	var hdPropertyFee = $(".houseDic_property_free").val();
	var hdPropertyCompany = $(".houseDic_property_company").val();
	var hdAdditionalInformation = $(".houseDic_property_note").val();
	var hdCoversAnAreaOf = $(".houseDic_covers_area").val();
	var hdFloorArea = $(".houseDic_floor_area").val();
	var hdSumHouseholds = $(".houseDic_sum_households").val();
	var hdParkingSpaceTop = $(".houseDic_space_top").val();
	var hdParkingSpaceNuder = $(".houseDic_space_nude").val();
	var hdTheCurrentNumber  = $(".houseDic_current_number").val();
	var hdZoneBitIntroduce = $(".houseDic_introduce").val();
	var hdDoorplatenoRelus = $(".hd_doorplateno_relus").val();
	showLoading();
	$.post("../updateHouseDict.action", {
		 hdId: hdId,
		 hdProvince: hdProvince,
		 hdCity: hdCity,
		 hdDistrict: hdDistrict,
		 hdZone: hdZone,
		 hdRoad: hdRoad,
		 hdBaiduLongitudeX: hdBaiduLongitudeX,
		 hdCommunity: hdCommunity,
		 hdPinyin: hdPinyin,
		 hdBaiduLatitudeY: hdBaiduLatitudeY,
		 hdBuildingForm: hdBuildingForm,
		 hdPropertyType: hdPropertyType,
		 hdBeCompletedTime: hdBeCompletedTime,
		 hdBuildingDevelopers: hdBuildingDevelopers,
		 hdItemFeatures: hdItemFeatures,
		 hdLoopPosition: hdLoopPosition,
		 hdPlotRatio: hdPlotRatio,
		 hdAfforestationRate: hdAfforestationRate,
		 hdPropertyFee: hdPropertyFee,
		 hdPropertyCompany: hdPropertyCompany,
		 hdAdditionalInformation: hdAdditionalInformation,
		 hdCoversAnAreaOf: hdCoversAnAreaOf,
		 hdFloorArea: hdFloorArea,
		 hdSumHouseholds: hdSumHouseholds,
		 hdParkingSpaceTop: hdParkingSpaceTop,
		 hdParkingSpaceNuder: hdParkingSpaceNuder,
		 hdTheCurrentNumber: hdTheCurrentNumber,
		 hdZoneBitIntroduce: hdZoneBitIntroduce,
		 hdDoorplatenoRelus: hdDoorplatenoRelus,
	}, function(data) {
		hideLoading();
		if(data.code < 0){
			myTips(data.msg, "error");
		}else{
			myTips("修改成功", "success");
			queryDic(1,0);
			//更新登录时缓存的城区列表
			updateLoginCompanyRentDistrict();
			$("#houseDicInfoDlg").dialog('close');
		}
	});
}
//设置门牌规则
function doorplatenoSelect() {
	$(".hd_doorplateno_relus").val($("#doorplatenoType1").val() + ',' + $("#doorplatenoType2").val() + ',' + $("#doorplatenoType3").val());
}
//更新登录时缓存的城区列表
function updateLoginCompanyRentDistrict(){
	$.post('../queryForHouseDictAddress.action', {
		hdCity: _loginCompanyRentCity
	}, function(data){
		if (data.code > 0) {
			data = data.body;
			_loginCompanyRentDistrict = data;
			parent._loginCompanyRentDistrict = _loginCompanyRentDistrict;
			$('#loginCompanyRentDistrict', parent.document).val(JSON.stringify(data));
			$("#searchDistrict").empty();
			$("#searchDistrict").append('<option></option>');
			for (var i in _loginCompanyRentDistrict) {
				$("#searchDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
			}
		}
	});
}
