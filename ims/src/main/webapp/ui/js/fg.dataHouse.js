var departmentName = '';
var _updateHousePaper = [];
var _updateLandlord = [];

var _keyAdministrator = '';
var _housePeople4rent ='';
var _housePeople4sell ='';

var _rowData=[];
$(function() {
	// 房源信息表导入数据
	advancedScreening(0);
	queryHousePaper(_pageNum[0], 0);
	// 页面空白处点击隐藏小区列表、排序
	$(document).click(function(e) {
		choseSelectHide('buildingNameDiv',2);
		if($(e.target).attr('id')=="buildingName"){
			choseSelectHide('buildingNameDiv',1);
		}
		choseSelectHide('buildingNamesDiv',2);
		if($(e.target).attr('id')=="addSaveHouseBuildingName"){
			choseSelectHide('buildingNamesDiv',1);
		}
		
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
			queryHousePaper(1, 0);
		}else if(clickId.indexOf("theSortContrary")>-1){
			var alltheSortContrary = $('.theSortContrary');
			$('.theSortContrary').each(function(){
				$(this).removeClass("theSortContrarySelect");
			});
			$("#"+clickId).addClass("theSortContrarySelect");
			$('#theSortContraryInput').val($("#"+clickId).attr("searchVal"));
			queryHousePaper(1, 0);
		}else{
			$("#theSortDlg").fadeOut();
		}
	});
	// 初始化列表
	$('#housePaperDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			_rowData=rowData;
			openHousePaperDlg();
		}, rowStyler:function(index,row){   
	        if (row.firstFollow==1){   
	            return {'class':'datagrid-row-firstFollow'};   
	        }   
	    }   
	});
	// 下拉框添加
	for (var i in _loginCompanyRentDistrict) {
		$(".companyRentDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	for (var i = 0; i < _househrState.length; i++) {
		$(".add_saveHouse_state").append("<option value = '" + i + "'>" + _househrState[i]+ "</option>");
	}
	for (var i = 0; i < _sectionType.length; i++) {
		$(".add_saveHouse_sectionType").append("<option value = '" + i + "'>" + _sectionType[i] + "</option>");
	}
	for (var i = 0; i < _houseType.length; i++) {
		$(".add_saveHouse_houseType").append("<option value = '" + i + "'>" + _houseType[i] + "</option>");
	}
	for (var i = 0; i < _bankType.length; i++) {
		$(".add_la_bank_type").append("<option value = '" + i + "'>" + _bankType[i] + "</option>");
	}
	for (var i = 0; i < _furnitureConfig.length; i++) {
		$(".fgsource_furniture_config").append("<option value = '" + i + "'>" + _furnitureConfig[i]+ "</option>");
	}
	for (var i = 0; i < _saveHouseState.length; i++) {
		$(".add_saveHouse_house_state").append("<option value = '" + i + "'>" + _saveHouseState[i]+ "</option>");
		$("#addSaveHouseHouseState").append("<option value = '" + i + "'>" + _saveHouseState[i]+ "</option>");
		$("#searchHouseState").append("<option value = '" + _saveHouseState[i] + "'>" + _saveHouseState[i] + "</option>");
	}
	for (var i = 0; i < _houseSources.length; i++) {
		$(".add_saveHouse_source").append("<option value = '" + i + "'>" + _houseSources[i]+ "</option>");
	}
	for (var i = 0; i < _houseProperty.length; i++) {
		$(".add_saveHouse_property").append("<option value = '" + i + "'>" + _houseProperty[i] + "</option>");
	}
	for (var i in _direction) {
		$(".add_saveHouse_direction").append("<option value = '" + i + "'>" + _direction[i] + "</option>");
	}
	for (var i in _doorplatenoType) {
		if (i > 0) {$("#doorplatenoType1").append("<option value = '" + i + "'>" + _doorplatenoType[i] + "</option>");}
	}
	for (var i in _doorplatenoType) {
		$("#doorplatenoType2").append("<option value = '" + i + "'>" + _doorplatenoType[i] + "</option>");
	}
	for (var i in _doorplatenoType) {
		$("#doorplatenoType3").append("<option value = '" + i + "'>" + _doorplatenoType[i] + "</option>");
	}
	for (var i in _sectionType) {
		$("#searchSectionType").append("<option value = '" + _sectionType[i] + "'>" + _sectionType[i] + "</option>");
	}
	$.post("../queryDepartment.action", {
		departmentStorefrontId : _loginStore,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for(var i in data.body){
			for(var j in data.body[i]){
				if(data.body[i][j]==null){
					data.body[i][j]='';
				}
			}
		}
		for (var i in data.body) {
			$(".add_saveHouse_theStore").append("<option value = '" + data.body[i].departmentId + "'>"+ data.body[i].departmentName + "</option>");
			_depadepartment[i] = data.body[i].departmentId;
			if(data.body[i].departmentId == _loginDepartment){
				departmentName = data.body[i].departmentName;
			}
		}
	}, "json");
});
/** *** CSV文件上传 ***** */
$(function() {
	// 异步提交表单
	$("#ajaxSubmit").on("click", function() {
		var choseFileName = $("input[name='infoHouseExpand.myFile']").val();
		if (choseFileName == null || choseFileName == '') {
			myTips('请先选择一个.csv格式的文件!');
			return;
		}
		if (!choseFileName.indexOf('.')) {
			myTips('请先选择一个正确的文件!');
			return;
		}
		var choseFileNameArry = choseFileName.split(".");
		if (choseFileNameArry[choseFileNameArry.length - 1] != 'csv') {
			myTips('文件格式不正确，请选择.csv格式的文件!');
			return;
		}
		$("#formToUpdate").ajaxSubmit({
			type : 'post',
			url : '../insertMany.action',
			success : function(data) {
				if (data == '-1') {
					$.messager.alert("错误提示", "导入失败，请检查文件内容。");
				} else if (data == '-2') {
					$.messager.alert("错误提示", "文件类型错误");
				} else if (data != '-1' && data != '-2') {
					var tips = data.split("-");
					var showTips = '';
					for (var i in tips) {
						if (i == 0) {
							showTips += "成功添加" + tips[i] + "条资料房源记录！";
						}
						if (tips.length > 2 && i > 0 && i < tips.length - 1) {
							if (i == 1) {
								showTips += "其中第";
							}
							if (i != tips.length - 2) {
								showTips += tips[i] + "、";
							} else {
								showTips += tips[i];
							}
						}
						if (tips.length > 2 && i > 0 && i == tips.length - 1) {
							showTips += "行数据格式错误。";
						}
					}
					$.messager.alert("成功提示", "导入成功。" + showTips);
				}
			},
			error : function(XmlHttpRequest, textStatus, errorThrown) {

			}
		});
	});
	// 异步提交表单
	$("#ajaxSubmit1").on("click", function() {
		var choseFileName = $("input[name='importAttr.myFile']").val();
		if (choseFileName == null || choseFileName == '') {
			myTips('请先选择一个.csv格式的文件!');
			return;
		}
		if (!choseFileName.indexOf('.')) {
			myTips('请先选择一个正确的文件!');
			return;
		}
		var choseFileNameArry = choseFileName.split(".");
		if (choseFileNameArry[choseFileNameArry.length - 1] != 'csv') {
			myTips('文件格式不正确，请选择.csv格式的文件!');
			return;
		}
		showLoading();
		$("#formToUpdate1").ajaxSubmit({
			type : 'post',
			url : '../csvupload.action',
			success : function(data) {
				hideLoading();
				if (data == -1) {
					$.messager.alert("错误提示", "导入失败，请检查文件内容。");
				} else if (data == -2) {
					$.messager.alert("错误提示", "文件类型错误");
				} else if (data != -1 && data != -2) {
					var tips = data.split("-");
					var showTips = '';
					for (var i in tips) {
						if (i == 0) {
							showTips += "成功添加" + tips[i] + "条资料房源记录！";
						}
						if (tips.length > 2 && i > 0 && i < tips.length - 1) {
							if (i == 1) {
								showTips += "其中第";
							}
							if (i != tips.length - 2) {
								showTips += tips[i] + "、";
							} else {
								showTips += tips[i];
							}
						}
						if (tips.length > 2 && i > 0 && i == tips.length - 1) {
							showTips += "行数据格式错误。";
						}
					}
					$.messager.alert("成功提示", "导入成功。" + showTips);
				}
			},
			error : function(XmlHttpRequest, textStatus, errorThrown) {
				hideLoading();
			}
		});
	});
});

//高级筛选
function advancedScreening(num){
	if(num == 0){
		$('.advancedScreening').css({
			"height" : "25px",
			"width"  : '700px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('.advanced2').css({
			"height" : "0px",
		})
		$('#screening').attr('onclick','advancedScreening(1)');
	}else if(num == 1){
		$('.advancedScreening').css({
			"height" : "60px",
			"width"  : '100%',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('.advanced2').css({
			"height" : "28px",
		})
		$('#screening').attr('onclick','advancedScreening(0)');
	}
}
//分页统计总条数
function getdataHousePageCount(page){
	var pageSize = 20;
	var qDistrict = $("#searchDistrict").find("option:selected").text();
	var qZone = $("#searchZone").find("option:selected").text();
	var qRoad = $("#searchRoad").val();
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var qZone = $("#searchZone").find("option:selected").text();
	var qHouseState = $("#searchHouseState").val();
	var houseSignedState = $("#searchSignedState").find("option:selected").text();
	var stateOwned = $("#searchStateOwned").val();
	var lipLandlordPhone = $("#searchLandlordPhone").val();
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	var qHouseType = $('#searchSectionType').val();
	var qKey = $('#searchKey').val();
	$.post("../queryHousePaper.action", {
		theSortTerm 		: theSortTerm,
		theSortContrary 	: theSortContrary,
		addDistrict 		: qDistrict,
		addZone 			: qZone,
		addStreet 			: qRoad,
		addCommunity 		: qCommunity,
		addBuilding 		: qBuilding,
		addDoorplateno 		: qDoorplateno,
		houseState 			: qHouseState,
		stateOwned			: stateOwned,
		lipLandlordPhone	: lipLandlordPhone,
		houseSignedState	: houseSignedState,
		sectionType			: qHouseType,
		key					: qKey,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"dataHouse",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"dataHouse",0);
		}
	});
}

// 查询资料房
function queryHousePaper(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var qDistrict = $("#searchDistrict").find("option:selected").text();
	var qZone = $("#searchZone").find("option:selected").text();
	var qRoad = $("#searchRoad").val();
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var qZone = $("#searchZone").find("option:selected").text();
	var qHouseState = $("#searchHouseState").val();
	var houseSignedState = $("#searchSignedState").find("option:selected").text();
	var stateOwned = $("#searchStateOwned").val();
	var lipLandlordPhone = $("#searchLandlordPhone").val();
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	var qHouseType = $('#searchSectionType').val();
	var qKey = $('#searchKey').val();
	$.post("../queryHousePaper.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		theSortTerm 		: theSortTerm,
		theSortContrary 	: theSortContrary,
		addDistrict 		: qDistrict,
		addZone 			: qZone,
		addStreet 			: qRoad,
		addCommunity 		: qCommunity,
		addBuilding 		: qBuilding,
		addDoorplateno 		: qDoorplateno,
		houseState 			: qHouseState,
		stateOwned			: stateOwned,
		lipLandlordPhone	: lipLandlordPhone,
		houseSignedState	: houseSignedState,
		sectionType			: qHouseType,
		key					: qKey,
	}, function(data) {
		if (data.code<0) {
			//sourcePage(0, 0, 0);
			$('#housePaperDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryHousePaper","dataHouse");
			}else{
				notCountPage(page, 0 ,"queryHousePaper","dataHouse");
			}
		} else {
			data= data.body;
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			//if (page == 1 && type == 0) {
				if(data.length<endNum){
					notCountPage(page, 2 , "queryHousePaper","dataHouse");
				}else{
					notCountPage(page, 1 , "queryHousePaper","dataHouse");
				}
			//}

			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].detailedAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}
			$("#housePaperDg").datagrid("loadData", data);
		}
	}, "json");
}
// 上一条下一条
function laterOrNext(type) {
	var dataIndex = $(".add_saveHouse_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".add_saveHouse_index").val(num);
			changeData = $('#housePaperDg').datagrid('getData').rows[num];
			$('#housePaperDg').datagrid('selectRow', num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#housePaperDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".add_saveHouse_index").val(num);
			changeData = $('#housePaperDg').datagrid('getData').rows[num];
			$('#housePaperDg').datagrid('selectRow', num);
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
		_updateHousePaper = changeData;
		_houseCoding = changeData.houseCoding;
		setHousePaperInfo(changeData);
	}
	$("#landlordInfo").hide();
	$("#lookLandlordButton").show();
	readAndWrite(3);
	$("#housePaperDlg").dialog('resize', {
		width : 675,
		height : 455
	});
	_updateLandlord = [];
}
// 分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#housePaperPage").remove();
		$("#housePaperPageDiv").append("<div class='tcdPageCode' id='housePaperPage' style='text-align:center;'></div>");
		$("#housePaperPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					queryHousePaper(p, 1);
				}
			}
		});
	}
}
//查看房源资料
function openHousePaperDlg(){
	var row = $('#housePaperDg').datagrid('getSelected');
	console.log("1111="+row);
	console.log("1111="+rowIndex);
	if (row) {
		for (var i in row) {
			if (row[i] == null) {
				row[i] = '';
			}
		}

		var rowIndex = $('#housePaperDg').datagrid('getRowIndex', $("#housePaperDg").datagrid('getSelected'));
		$(".add_saveHouse_index").val(rowIndex);
		$('#housePaperDlg') .dialog( {
			title : "查看房源",
			top : getTop(455),
			left : getLeft(675),
			width : 675,
			height : 455,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#housePaperDlg input').val("");
				$('#housePaperDlg select').val("");
				$('#housePaperDlg textarea').val("");
				$("#addSaveHouseForm").form("clear");
				$('#updateDataHouse').hide();
				$("#addDataHouse").show();
				$("#followNote").hide();
				$("#addLandlordInfo").hide();
				$("#infoDoorplatenoRelus").text('');
				$("#housePaperDlg input[require]").each(function(){
					$(this).css("border","1px solid #A9A9A9");
				});
			}
		});
		$('#housePaperDlg').dialog('open');
		if ($('#infoFollowTable').hasClass('datagrid-f')) {
			
		} else {
			$('#infoFollowTable').datagrid({
				columns : [ [ {
					field : 'jhfFollowTime',
					title : '跟进时间',
					width : '15%',
					align : 'center',
					formatter : function(value, row, index) {
						return formatTime(row.jhfFollowTime, 2);
					}
				}, {
					field : 'jhfUserName',
					title : '跟进人',
					width : '15%',
					align : 'center'
				}, {
					field : 'jhfPaymentWay',
					title : '跟进类型',
					width : '15%',
					align : 'center'
				},{
					field : 'jhfFollowBelong',
					title : '跟进归属',
					width : '15%',
					align : 'center'
				}, {
					field : 'jhfFollowRemark',
					title : '跟进内容',
					width : '40%',
					align : 'center'
				} ] ],
				width : '100%',
				height : '129px',
				singleSelect : true,
				autoRowHeight : false,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				onDblClickRow : function(rowIndex, rowData) {
					downFollowInfo(rowData);
				}
			});
		}
		_updateLandlord = [];
		_updateHousePaper = row;
		$('.add_saveHouse_house_state').val(0);
		$("#updateDataHouse").show();
		$("#addDataHouse").hide();
		$("#followNote").show();
		$("#doorplatenoDlgButton").hide();
		$('#doornoMsg').html('');
		$("#followInfoDiv").show();
		$("#landlordInfo").hide();
		$("#lookLandlordButton").show();
		readAndWrite(3);
		setHousePaperInfo(row);
	} else {
		myTips("请先选择一条记录","error");
	}
}
// 房源详细信息获取
function setHousePaperInfo(row) {
	showLoading();
	$("#addSaveHouseForm").form("clear");
	$("#infoDoorplatenoRelus").text('');
	$('#housePaperDlg input').val("");
	$('#housePaperDlg select').val("");
	$('#housePaperDlg textarea').val("");
	$("#housePaperDlg input[require]").each(function(){
		$(this).css("border","1px solid #A9A9A9");
	});
	$(".add_saveHouse_houseCoding").val(row.houseCoding);
	for (var i in _sectionType) {
		if (_sectionType[i] == row.sectionType) {
			$(".add_saveHouse_sectionType").val(i);
		}
	}
	for (var i in _houseType) {
		if (_houseType[i] == row.houseType) {
			$(".add_saveHouse_houseType").val(i);
		}
	}
	for (var i in _househrState) {
		if (_househrState[i] == row.houseOwner) {
			$(".add_saveHouse_state").val(i);
		}
	}
	for (var i in _saveHouseState) {
		if (_saveHouseState[i] == row.houseState) {
			$(".add_saveHouse_house_state").val(i);
		}
	}
	for (var i in _furnitureConfig) {
		if (_furnitureConfig[i] == row.furnitureConfig) {
			$(".fgsource_furniture_config").val(i);
		}
	}
	$('.add_saveHouse_register_time').val(row.registerTime.substring(0,10));
	$("#add_saveHouse_district").val(row.addDistrict);
	$("#detailedAddress").val(row.detailedAddress);
	$("#AddrssName").val(row.addCommunity);
	$("#add_saveHouse_buildingId").val(row.houseDictId);
	$("#add_saveHouse_zone1").val(row.addZone);
	$("#add_saveHouse_stree").val(row.addStreet);
	$(".add_saveHouse_addBuilding").val(row.addBuilding);
	$(".add_saveHouse_addDoorplateno").val(row.addDoorplateno);
	$(".add_saveHouse_square").val(row.storeSquare);
	$(".add_saveHouse_userName").val(row.userName);
	$(".add_saveHouse_userId").val(row.userId);
	$(".add_saveHouse_laId").val(row.houseLipId);
	$(".add_landlord_name").val(row.contactsPeople);
	$(".add_la_phone_num").val(row.contactInformation);
	$(".add_saveHouse_rentPriceTotal").val(row.housePrice);
	for (var i in _direction) {
		if (_direction[i] == row.houseDirection) {
			$(".add_saveHouse_direction").val(i);
		}
	}
	$(".add_saveHouse_rentPrice").val(row.unitPriceRent);
	$(".add_saveHouse_house_remake").val(row.houseRemake);
	if(row.housePeople4rent!=null&&row.housePeople4rent!=''){
		for(var j in _userInfoData){
			if(row.housePeople4rent == _userInfoData[j].userId){
				_housePeople4rent = _userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName;
				$("#rentManGetUserId").val(row.housePeople4rent);
				$("#rentManShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
			}
		}
	}else{
		_housePeople4rent = "无";
	}
	if(row.housePeople4sell!=null&&row.housePeople4sell!=''){
		for(var j in _userInfoData){
			if(row.housePeople4sell == _userInfoData[j].userId){
				_housePeople4sell = _userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName;
				$("#saleManGetUserId").val(row.housePeople4sell);
				$("#saleManShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
			}
		}
	}else{
		_housePeople4sell = "无";
	}
	
	if(row.keyAdministrator!=null&&row.keyAdministrator!=''){
		for(var j in _userInfoData){
			if(row.keyAdministrator == _userInfoData[j].userId){
				_keyAdministrator = _userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName;
				$("#keyManGetUserId").val(row.keyAdministrator);
				$("#keyManShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
			}
		}
	}else{
		_keyAdministrator = "无";
	}
	
	$(".add_saveHouse_salePriceTotal").val(row.houseSellingPrice);
	$(".add_saveHouse_salePrice").val(row.unitPriceSell);
	$(".add_saveHouse_keyNums").val(row.keyNumber);
	for (var i in _yesOrNo) {
		if (_yesOrNo[i] == row.houseEntrust4rent) {
			$(".add_saveHouse_entrust4rent").val(i);
		}
	}
	for (var i in _yesOrNo) {
		if (_yesOrNo[i] == row.houseEntrust4sell) {
			$(".add_saveHouse_entrust4sell").val(i);
		}
	}
	for (var i in _houseSources) {
		if (_houseSources[i] == row.houseSource) {
			$(".add_saveHouse_source").val(i);
		}
	}
	for (var i in _houseProperty) {
		if (_houseProperty[i] == row.houseProperty) {
			$(".add_saveHouse_property").val(i);
		}
	}
	$(".add_saveHouse_buyTime").val(row.house4buyTime);
	infoFollowInfo(row.houseCoding);
	hideLoading();
}
// 房源详细信息跟进列表取数据
function infoFollowInfo(houseCoding) {
	if(houseCoding=="A"){//选择跟进类型
		houseCoding = $(".add_saveHouse_houseCoding").val();
	}
	var jhfPaymentWay = $("#infoFollowType").val();
	// 跟进记录表取数据
	$.post("../queryAllHousingFollow.action", {
		jhfHouseId : houseCoding,
		jhfPaymentWay:jhfPaymentWay,
	}, function(data) {
		if (data.code < 0) {
			$('#infoFollowTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].detailedAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}
			$("#infoFollowTable").datagrid("loadData", data);
		}
	}, "json");
}

//修改资料盘时读写分离
function readAndWrite(type) {
	if (type == 1) {//添加
		$('#addSaveHouseDiv input').removeAttr("disabled","disabled");
		$('#addSaveHouseDiv select').removeAttr("disabled","disabled");
		$('#addSaveHouseDiv textarea').removeAttr("disabled","disabled");
		$('.add_saveHouse_userName').attr("disabled","disabled");
		
		$('#addrssBuilding').show();
		$('#buildingNameAddrss').hide();
		
		$('#canUpdateDataHouse').hide();
		$('#saveUpdateDataHouse').show();
		
		$('#detailedAddressDiv').hide();
		$('#divSelect').show();
		$('#addDoorplatenoDiv').show();
	} else if(type == 2) {//修改
		if ($(".add_saveHouse_landlordName").val() == '') {
			myTips("尚未查看业主,不能修改房源!","error");
			return;
		}
		$('#addSaveHouseDiv input').removeAttr("disabled","disabled");
		$('#addSaveHouseDiv select').removeAttr("disabled","disabled");
		$('#addSaveHouseDiv textarea').removeAttr("disabled","disabled");
		$('.add_saveHouse_userName').attr("disabled","disabled");
		
		$('#addrssBuilding').hide();
		$('#buildingNameAddrss').hide();
		
		$('#canUpdateDataHouse').hide();
		$('#saveUpdateDataHouse').show();
		
		$('#detailedAddressDiv').show();
		$('#divSelect').hide();
		$('#addDoorplatenoDiv').hide();

		$('.add_saveHouse_register_time').attr("disabled","disabled");
		$('#add_saveHouse_district').attr("disabled","disabled");
		$('#buildingName').attr("disabled","disabled");
		$('#inputSelect').attr("disabled","disabled");
		$('.add_saveHouse_addDoorplateno').attr("disabled","disabled");
		$('#AddrssName').attr("disabled","disabled");
		$('#detailedAddress').attr("disabled","disabled");
	} else if (type == 3) {//查看
		$('#addSaveHouseDiv input').attr("disabled","disabled");
		$('#addSaveHouseDiv select').attr("disabled","disabled");
		$('#addSaveHouseDiv textarea').attr("disabled","disabled");
		
		$('#addrssBuilding').hide();
		$('#buildingNameAddrss').hide();
		
		$('#canUpdateDataHouse').show();
		$('#saveUpdateDataHouse').hide();
		$('#infoFollowType').removeAttr("disabled","disabled");
		
		$('#detailedAddressDiv').show();
		$('#divSelect').hide();
		$('#addDoorplatenoDiv').hide();
	}
}
//验证门牌规则
function validateDoorno(){
	var check = '';
	if(_doorplateno == 1){
		var hdDoorplatenoRelus = $('.hd_doorplateno_relus').val().split(',');
		if (hdDoorplatenoRelus.length == 3) {
			for (var i in hdDoorplatenoRelus) {
				check += _doorplatenoTypeRegular[hdDoorplatenoRelus[i]];
			}
		}
		if (check != '') {
			eval("var reg = \/^" + check + "\$\/;");
			var addDoorplateno = $('.add_saveHouse_addDoorplateno').val();
			if (reg.test(addDoorplateno)) {
				$("#doornoMsg").html('');
				return true;
			} else {
				$("#doornoMsg").html('不符合门牌规则'+doorplatenoShow($('.hd_doorplateno_relus').val()));
				return false;
			}
		}
	}
	return true;
}

/************************************添加资料房源*******************************************/
// 打开添加资料房源对话框
function addSaveHouse() {
	$('#housePaperDlg').dialog({
		title : "添加房源",
		top : getTop(410),
		left : getLeft(680),
		width : 680,
		height : 410,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#housePaperDlg input').val("");
			$('#housePaperDlg textarea').val("");
			$('#housePaperDlg select').val("");
			$('#doornoMsg').html("");
			$("#housePaperDlg").form("clear");
			$("#updateDataHouse").show();
			$("#addDataHouse").hide();
			$("#followNote").show();
			$("#infoDoorplatenoRelus").text('');
			$("#selectBuilding").hide();
			$("#housePaperDlg [require]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
			$('#saveHouse_register_time').show();
		},
		onOpen : function() {
			$('.add_saveHouse_house_state').val(0);
			$("#updateDataHouse").hide();
			$("#addDataHouse").show();
			$("#addLandlordInfo").hide();
			$("#followNote").hide();
			$("#lookLandlordButton").show();
			$('#saveHouse_register_time').hide();
		},
	});
	$(".add_saveHouse_square").val(0);
	$(".add_saveHouse_rentPrice").val(0);
	$(".add_saveHouse_rentPriceTotal").val(0);
	$(".add_saveHouse_salePrice").val(0);
	$(".add_saveHouse_salePriceTotal").val(0);
	$("#landlordInfo").show();
	$("#followInfoDiv").hide();
	$('#addSaveHouseForm').form('clear');
	$(".add_saveHouse_userName").val(_loginUserName);
	$(".add_saveHouse_userId").val(_loginUserId);
	readAndWrite(1);
	$('#housePaperDlg').dialog('open');
}
//执行添加资料房源
function doAddSaveHouse() {
	var checkFlag = 0;
	$('#housePaperDlg [require="add"]').each(function(){
		if($(this).val()==''){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写","error");
		return;
	}
	if(!validateDoorno()){
		myTips("门牌规则验证失败","error");
		return;
	}
	showLoading();
	var dataIndex = $(".add_saveHouse_index").val();
	var addSectionType = $(".add_saveHouse_sectionType").find("option:selected").text();
	var addHouseType = $(".add_saveHouse_houseType").find("option:selected").text();
	var addHouseOwner = $(".add_saveHouse_state").find("option:selected").text();
	var addHouseState =  $(".add_saveHouse_house_state").find("option:selected").text();
	var addProvince = _loginCompanyRentProvince;
	var addCity = _loginCompanyRentCity;
	var addDistrict = $("#add_saveHouse_district").find("option:selected").text();
	var addZone = $("#add_saveHouse_zone1").val();
	var addStreet = $("#add_saveHouse_stree").val();
	var addBuildingName = $("#buildingName").find("option:selected").text();
	var addHouseDicId = $("#add_saveHouse_buildingId").val();
	var addAddBuilding = $(".add_saveHouse_addBuilding").val();
	var addAddDoorplateno = $(".add_saveHouse_addDoorplateno").val();
	var hdDoorplatenoRelus = $(".hd_doorplateno_relus").val();
	var addSquare = $(".add_saveHouse_square").val();
	var fgsourceFurnitureConfig = $(".fgsource_furniture_config").find("option:selected").text();
	var addUserId = $(".add_saveHouse_userId").val();
	var addPriceRentTotal = parseFloat($(".add_saveHouse_rentPriceTotal").val());
	if ($(".add_saveHouse_rentPriceTotal").val() == '') {
		addPriceRentTotal = 0;
	}
	var addDirection = $(".add_saveHouse_direction").find("option:selected")
			.text();
	var addPriceRent = $(".add_saveHouse_rentPrice").val();
	if ($(".add_saveHouse_rentPrice").val() == '') {
		addPriceRent = 0;
	}
	var people4rent = $("#rentManGetUserId").val();
	var keyAdministrator = $("#keyManGetUserId").val();
	var addPriceSaleTotal = $(".add_saveHouse_salePriceTotal").val();
	if ($(".add_saveHouse_salePriceTotal").val() == '') {
		addPriceSlaeTotal = 0;
	}
	var addPriceSale = $(".add_saveHouse_salePrice").val();
	if ($(".add_saveHouse_salePrice").val() == '') {
		addPriceSlae = 0;
	}
	var people4sell = $("#saleManGetUserId").val();
	var keyNums = $(".add_saveHouse_keyNums").val();
	var entrust4rent = $(".add_saveHouse_entrust4rent").find("option:selected").text();
	var entrust4sell = $(".add_saveHouse_entrust4sell").find("option:selected").text();
	var houseSource = $(".add_saveHouse_source").find("option:selected").text();
	var houseProperty = $(".add_saveHouse_property").find("option:selected") .text();
	var house4buyTime = $(".add_saveHouse_buyTime").val();
	var houseRemake = $(".add_saveHouse_house_remake").val();
	var landlordName = $(".add_saveHouse_landlordName").val();
	var landlordPhone = $(".add_saveHouse_landlordPhone").val();
	var landlordOtherContact = $(".add_saveHouse_landlordOther").val();
	var addContactsPeople = $(".add_saveHouse_contacts_people").val();
	var addContactsinfomation = $(".add_saveHouse_contacts_infomation").val();
	var otherContactInfo = $(".add_saveHouse_other_contact_info").val();
	var theAgent = $(".add_saveHouse_the_agent").val();
	var agentPhone = $(".add_saveHouse_agent_phone").val();
	var agentOtherContact = $(".add_saveHouse_agent_other_contact").val();

	$.post("../insertHouse.action", {
		sectionType : addSectionType,
		houseType : addHouseType,
		houseOwner : addHouseOwner,
		houseState : addHouseState,
		addProvince : addProvince,
		addCity : addCity,
		addDistrict : addDistrict,
		addZone : addZone,
		addStreet : addStreet,
		addCommunity : addBuildingName,
		houseDictId : addHouseDicId,
		addBuilding : addAddBuilding,
		addDoorplateno : addAddDoorplateno,
		storeSquare : addSquare,
		housePrice : addPriceRentTotal,
		furnitureConfig : fgsourceFurnitureConfig,
		userId : addUserId,
		houseDirection : addDirection,
		unitPriceRent : addPriceRent,
		housePeople4rent : people4rent,
		housePeople4sell : people4sell,
		keyAdministrator : keyAdministrator,
		houseSellingPrice : addPriceSaleTotal,
		unitPriceSell : addPriceSale,
		keyNumber : keyNums,
		houseEntrust4rent : entrust4rent,
		houseEntrust4sell : entrust4sell,
		houseSource : houseSource,
		houseProperty : houseProperty,
		house4buyTime : house4buyTime,
		houseRemake : houseRemake,
		storefront : _loginStore,
		department : _loginDepartment,
	}, function(data) {
		if(data.code <0){
			myTips(data.msg, "error");
			hideLoading();
			return;
		}else{
			var followNote = departmentName +' '+ _loginUserName +', '+ getNowFormatDate()+' 添加房源资料。 ';
			var followType = "系统跟进";
			var followResult = "新增成功";
			var dataFollowJson = {
				jhfHouseId : parseInt(data.body[0].houseCoding),
				jhfFollowRemark : followNote,
				jhfFollowResult : followResult,
				jhfPaymentWay : followType,
				jhfUserId : _loginUserId,
				jhfDepartment :_loginDepartment,
				jhfStorefront :_loginStore,
			};
			$.post("../insertHousingFollow.action", dataFollowJson);
			
			$.post("../insertLandlordIntentionPerson.action", {
				lipLandlordName			: landlordName,
				lipLandlordPhone		: landlordPhone,
				lipLandlordOtherContact : landlordOtherContact,
				lipContactsPeople 		: addContactsPeople,
				lipContactInformation 	: addContactsinfomation,
				lipOtherContactInfo 	: otherContactInfo,
				lipTheAgent 			: theAgent,
				lipAgentPhone 			: agentPhone,
				lipAgentOtherContact 	: agentOtherContact,
				lipRegistrar			: _loginUserId,
			}, function(landlordData) {
				if(landlordData.code<0){
					hideLoading();
					return;
				}
				landlordData=landlordData.body;
				$.post("../updateHouse.action", {
					addProvince : addProvince,
					addCity : addCity,
					addDistrict : addDistrict,
					addZone : addZone,
					addCommunity : addBuildingName,
					addBuilding : addAddBuilding,
					addDoorplateno : addAddDoorplateno,
					houseCoding : parseInt(data.body[0].houseCoding),
					houseLipId: parseInt(landlordData[0].lipId),
				}, function(updateData) {
					console.log("000000000"+updateData.code)
					console.log("000000000"+JSON.stringify(updateData))

					if(updateData.code<0){
						hideLoading();
						return;
					}
					console.log(11111)
					queryHousePaper(_pageNum[0], 0);
					console.log(22222)
					hideLoading();
					console.log(33333)
					myTips("添加成功！", "success");
					console.log(44444)
					$('#housePaperDlg').dialog('close');
					console.log(55555)
				});
				
			});
		}
	});
}

// 打开批量添加对话框
function numsAddSaveHouse() {
	$('#numsAddDataHouse').dialog({
		title : '批量添加房源',
		top : getTop(230),
		left : getLeft(450),
		width : 450,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		},
		onOpen : function() {

		},
	});
	$('#formToUpdate').form('clear');
	$('#formToUpdate input').val('');
	$('#formToUpdate select').val('');
	$('.add_saveHouse_user_id').val(_loginUserId);
	$('#numsAddDataHouse').dialog('open');
}

/*********************************添加资料房源end***********************************/


//打开数据导入对话框
function numsAddSaveHouse1() {
	$('#numsAddDataHouse1').dialog({
		title : '数据导入',
		top : getTop(230),
		left : getLeft(450),
		width : 450,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		},
		onOpen : function() {

		},
	});
	$('#formToUpdate1').form('clear');
	$('#formToUpdate1 input').val('');
	$('#formToUpdate1 select').val('');
	$('.add_saveHouse_user_id').val(_loginUserId);
	$('#numsAddDataHouse1').dialog('open');
}

// 修改资料盘
function doUpdateSaveHouse() {
	var checkFlag = 0;
	$('#housePaperDlg [require="require"]').each(function(){
		if($(this).val()==''){
			console.log($(this))
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写","error");
		return;
	}
	showLoading();
	var dataIndex = $(".add_saveHouse_index").val();
	var addHouseCoding = $(".add_saveHouse_houseCoding").val();
	var addSectionType = $(".add_saveHouse_sectionType").find("option:selected").text();
	var addHouseType = $(".add_saveHouse_houseType").find("option:selected").text();
	var addHouseOwner = $(".add_saveHouse_state").find("option:selected").text();
	var addHouseState = $(".add_saveHouse_house_state").find("option:selected").text();
	var addContactsPeople = $(".add_saveHouse_contacts_people").val();
	var addContactsinfomation = $(".add_saveHouse_contacts_infomation").val();
	// 房屋字典相关
	var addCity = _loginCompanyRentCity;
	var addDistrict = $("#add_saveHouse_district").find("option:selected").text();
	var addZone = $("#add_saveHouse_zone1").val();
	var addStreet = $("#add_saveHouse_stree").val();
	var addBuildingName = $("#add_saveHouse_buildingName").find("option:selected").text();
	var addHouseDicId = $("#add_saveHouse_buildingId").val();
	var addAddBuilding = $(".add_saveHouse_addBuilding").val();
	var addAddDoorplateno = $(".add_saveHouse_addDoorplateno").val();
	var addSquare = $(".add_saveHouse_square").val() != '' ? parseFloat($(".add_saveHouse_square").val()) : 0;
	var fgsourceFurnitureConfig = $(".fgsource_furniture_config").find("option:selected").text();
	var addUserId = $(".add_saveHouse_userId").val();
	var addDirection = $(".add_saveHouse_direction").find("option:selected").text();
	var addPriceRentTotal = $(".add_saveHouse_rentPriceTotal").val() != '' ? parseFloat($(".add_saveHouse_rentPriceTotal").val()) : 0;
	var addPriceRent = $(".add_saveHouse_rentPrice").val() != '' ? parseFloat($(".add_saveHouse_rentPrice").val()) : 0;
	var people4rent = $("#rentManGetUserId").val();
	var keyAdministrator = $("#keyManGetUserId").val();
	var addPriceSaleTotal = $(".add_saveHouse_salePriceTotal").val() != '' ? parseFloat($(".add_saveHouse_salePriceTotal").val()) : 0;
	var addPriceSale = $(".add_saveHouse_salePrice").val() != '' ? parseFloat($(".add_saveHouse_salePrice").val()) : 0;
	var people4sell = $("#saleManGetUserId").val();
	var keyNums = $(".add_saveHouse_keyNums").val();
	var entrust4rent = $(".add_saveHouse_entrust4rent").find("option:selected").text();
	var entrust4sell = $(".add_saveHouse_entrust4sell").find("option:selected").text();
	var houseSource = $(".add_saveHouse_source").find("option:selected").text();
	var houseProperty = $(".add_saveHouse_property").find("option:selected").text();
	var house4buyTime = $(".add_saveHouse_buyTime").val();
	var otherContactInfo = $(".add_saveHouse_other_contact_info").val();
	var theAgent = $(".add_saveHouse_the_agent").val();
	var agentPhone = $(".add_saveHouse_agent_phone").val();
	var agentOtherContact = $(".add_saveHouse_agent_other_contact").val();
	var houseRemake = $(".add_saveHouse_house_remake").val();
	
	// 业主相关
	var laId = $(".add_saveHouse_laId").val();
	var landlordName = $(".add_saveHouse_landlordName").val();
	var landlordPhone = $(".add_saveHouse_landlordPhone").val();
	var landlordOtherContact = $(".add_saveHouse_landlordOther").val();
	var updateData = '';
	var follow_mark = $(".follow_mark").val();
	var hdDoorplatenoRelus = $(".hd_doorplateno_relus").val();
	
	if (follow_mark != '' && follow_mark != null) {
		updateData += "跟进备注：" + follow_mark + " ; ";
	}
	if (_updateHousePaper.sectionType != addSectionType) {
		updateData += "户型：" + _updateHousePaper.sectionType + "→" + addSectionType + " ; ";
	}
	if (_updateHousePaper.houseType != addHouseType) {
		updateData += "房型：" + _updateHousePaper.houseType + "→" + addHouseType
				+ " ; ";
	}
	if (_updateHousePaper.houseState != addHouseState) {
		updateData += "状态：" + _updateHousePaper.houseState + "→" + addHouseState
				+ " ; ";
	}
	if (_updateHousePaper.houseOwner != addHouseOwner) {
		updateData += "用途：" + _updateHousePaper.houseOwner + "→" + addHouseOwner
				+ " ; ";
	}
//	if (_updateHousePaper.addCity != addCity) {
//		updateData += "城市：" + _updateHousePaper.addCity + "→" + addCity + " ; ";
//	}
//	if (_updateHousePaper.addDistrict != addDistrict) {
//		updateData += "城区：" + _updateHousePaper.addDistrict + "→" + addDistrict
//				+ " ; ";
//	}
//	if (_updateHousePaper.addZone != addZone) {
//		updateData += "片区：" + _updateHousePaper.addZone + "→" + addZone + " ; ";
//	}
//	if (_updateHousePaper.addCommunity != addBuildingName) {
//		updateData += "楼盘：" + _updateHousePaper.addCommunity + "→"
//				+ addBuildingName + " ; ";
//	}
//	if (_updateHousePaper.addStreet != addStreet) {
//		updateData += "地址：" + _updateHousePaper.addStreet + "→" + addStreet
//				+ " ; ";
//	}
//	if (_updateHousePaper.addBuilding != addAddBuilding) {
//		updateData += "座栋：" + _updateHousePaper.addBuilding + "→"
//				+ addAddBuilding + " ; ";
//	}
//	if (_updateHousePaper.addDoorplateno != addAddDoorplateno) {
//		updateData += "门牌号：" + _updateHousePaper.addDoorplateno + "→"
//				+ addAddDoorplateno + " ; ";
//	}
	if (_updateHousePaper.storeSquare != addSquare) {
		updateData += "面积：" + _updateHousePaper.storeSquare + "→" + addSquare
				+ " ; ";
	}
	if (_updateHousePaper.housePrice != addPriceRentTotal) {
		updateData += "租价：" + _updateHousePaper.housePrice + "→"
				+ addPriceRentTotal + " ; ";
	}
	if (_updateHousePaper.furnitureConfig != fgsourceFurnitureConfig) {
		updateData += "房屋配置：" + _updateHousePaper.furnitureConfig + "→"
				+ fgsourceFurnitureConfig + " ; ";
	}
	if (_updateHousePaper.houseDirection != addDirection) {
		updateData += "朝向：" + _updateHousePaper.houseDirection + "→"
				+ addDirection + " ; ";
	}
	if (_updateHousePaper.unitPriceRent != addPriceRent) {
		updateData += "租单价：" + _updateHousePaper.unitPriceRent + "→"
				+ addPriceRent + " ; ";
	}
	if (_updateHousePaper.housePeople4rent != people4rent) {
		updateData += "租方：" + _housePeople4rent + "→"
				+ $("#rentManShowUserInfo").val() + " ; ";
	}
	if (_updateHousePaper.keyAdministrator != keyAdministrator) {
		updateData += "钥匙方：" + _keyAdministrator + "→"
				+ $("#keyManShowUserInfo").val() + " ; ";
	}
	if (_updateHousePaper.houseSellingPrice != addPriceSaleTotal) {
		updateData += "售价：" + _updateHousePaper.houseSellingPrice + "→"
				+ addPriceSaleTotal + " ; ";
	}
	if (_updateHousePaper.unitPriceSell != addPriceSale) {
		updateData += "售单价：" + _updateHousePaper.unitPriceSell + "→"
				+ addPriceSale + " ; ";
	}
	if (_updateHousePaper.housePeople4sell != people4sell) {
		updateData += "售方：" + _housePeople4sell + "→"
				+ $("#saleManShowUserInfo").val() + " ; ";
	}
	if (_updateHousePaper.keyNumber != keyNums) {
		updateData += "钥匙编号：" + _updateHousePaper.keyNumber + "→" + keyNums
				+ " ; ";
	}
	if (_updateHousePaper.houseEntrust4rent != entrust4rent) {
		updateData += "租委托：" + _updateHousePaper.houseEntrust4rent + "→"
				+ entrust4rent + " ; ";
	}
	if (_updateHousePaper.houseEntrust4sell != entrust4sell) {
		updateData += "售委托：" + _updateHousePaper.houseEntrust4sell + "→"
				+ entrust4sell + " ; ";
	}
	if (_updateHousePaper.houseSource != houseSource) {
		updateData += "来源：" + _updateHousePaper.houseSource + "→" + houseSource
				+ " ; ";
	}
	if (_updateHousePaper.houseProperty != houseProperty) {
		updateData += "产权：" + _updateHousePaper.houseProperty + "→"
				+ houseProperty + " ; ";
	}
	if (_updateHousePaper.house4buyTime != house4buyTime) {
		updateData += "购房日期：" + _updateHousePaper.house4buyTime + "→"
				+ house4buyTime + " ; ";
	}
	if (_updateHousePaper.houseRemake != houseRemake) {
		updateData += "备注：" + _updateHousePaper.houseRemake + "→" + houseRemake
				+ " ; ";
	}
	if(_updateLandlord.length!=0){
		//业主部分信息修改
		if (_updateLandlord.lipLandlordName != landlordName) {
			updateData += "业主：" + _updateLandlord.lipLandlordName + "→" + landlordName
					+ " ; ";
		}
		if (_updateLandlord.lipLandlordPhone != landlordPhone) {
			updateData += "业主手机号码：" + _updateLandlord.lipLandlordPhone + "→" + landlordPhone
					+ " ; ";
		}
		if (_updateLandlord.lipLandlordOtherContact != landlordOtherContact) {
			updateData += "业主其他联系方式：" + _updateLandlord.lipLandlordOtherContact + "→" + landlordOtherContact
					+ " ; ";
		}
		if (_updateLandlord.lipContactsPeople != addContactsPeople) {
			updateData += "联系人：" + _updateLandlord.lipContactsPeople + "→" + addContactsPeople
					+ " ; ";
		}
		if (_updateLandlord.lipContactInformation != addContactsinfomation) {
			updateData += "联系人手机号码：" + _updateLandlord.lipContactInformation + "→" + addContactsinfomation
					+ " ; ";
		}
		if (_updateLandlord.lipOtherContactInfo != otherContactInfo) {
			updateData += "联系人其他联系方式：" + _updateLandlord.lipOtherContactInfo + "→" + otherContactInfo
					+ " ; ";
		}
		if (_updateLandlord.lipTheAgent != theAgent) {
			updateData += "代理人：" + _updateLandlord.lipTheAgent + "→" + theAgent
					+ " ; ";
		}
		if (_updateLandlord.lipAgentPhone != agentPhone) {
			updateData += "代理人手机号码：" + _updateLandlord.lipAgentPhone + "→" + agentPhone
					+ " ; ";
		}
		if (_updateLandlord.lipAgentOtherContact != agentOtherContact) {
			updateData += "代理人其他联系方式：" + _updateLandlord.lipAgentOtherContact + "→" + agentOtherContact
					+ " ; ";
		}
	}
	var saveHouseJson = {
		houseCoding : addHouseCoding,
		sectionType : addSectionType,
		houseType : addHouseType,
		houseOwner : addHouseOwner,
		houseState : addHouseState,
//		contactsPeople : addContactsPeople,
//		contactInformation : addContactsinfomation,
//		addCity : addCity,
//		addDistrict : addDistrict,
		addZone : addZone,
//		addStreet : addStreet,
//		addCommunity : addBuildingName,
//		houseDictId : addHouseDicId,
//		addBuilding : addAddBuilding,
//		addDoorplateno : addAddDoorplateno,
		storeSquare : addSquare,
		housePrice : addPriceRentTotal,
		furnitureConfig : fgsourceFurnitureConfig,
		userId : addUserId,
		houseDirection : addDirection,
		unitPriceRent : addPriceRent,
		housePeople4rent : people4rent == '' ? 0 : people4rent,
		housePeople4sell : people4sell == '' ? 0 : people4sell,
		keyAdministrator : keyAdministrator,
		houseSellingPrice : addPriceSaleTotal,
		unitPriceSell : addPriceSale,
		keyNumber : keyNums,
		houseEntrust4rent : entrust4rent,
		houseEntrust4sell : entrust4sell,
		houseSource : houseSource,
		houseProperty : houseProperty,
		house4buyTime : house4buyTime,
//		otherContactInfo : otherContactInfo,
//		theAgent : theAgent,
//		agentPhone : agentPhone,
//		agentOtherContact : agentOtherContact,
		houseRemake : houseRemake,
//		landlordName : landlordName,
//		landlordPhone : landlordPhone,
//		landlordOtherContact : landlordOtherContact,
	}
	updateData  = updateData.replace(/null/g, " ");
	updateData  = updateData.replace(/undefined/g, " ");
	if (updateData != '') {
		$.post("../updateHouse.action", saveHouseJson, function(data) {
			if (data.code <0) {
				myTips(data.msg, "error");
				hideLoading();
				return;
			}
			var followNote = '';
			var followType = '';
			var followResult = '';
			var dataFollowJson = {};
			if (_updateHousePaper.houseState == '传闻' && (addHouseState != '传闻' || addHouseState != '无效')) {
				followNote = _loginUserName + " 修改资料房源。修改内容： " + updateData;
				followType = "系统跟进";
				followResult = "修改成功";
				dataFollowJson = {
					jhfHouseId : addHouseCoding,
					jhfFollowRemark : followNote,
					jhfFollowResult : followResult,
					jhfPaymentWay : followType,
					jhfUserId : _loginUserId,
					jhfDepartment :_loginDepartment,
					jhfStorefront :_loginStore,
				};
				$.post("../insertHousingFollow.action", dataFollowJson);
			} else {
				followNote = _loginUserName + " 修改资料房源。修改内容： " + updateData;
				followType = "系统跟进";
				followResult = "修改成功";
				dataFollowJson = {
					jhfHouseId : addHouseCoding,
					jhfFollowRemark : followNote,
					jhfFollowResult : followResult,
					jhfPaymentWay : followType,
					jhfUserId : _loginUserId,
					jhfDepartment :_loginDepartment,
					jhfStorefront :_loginStore,
				};
				$.post("../insertHousingFollow.action", dataFollowJson);
			}
			if(_updateLandlord.length!=0){
				if(_updateHousePaper.houseLipId==''){
					$.post("../insertLandlordIntentionPerson.action", {
						lipLandlordName			: landlordName,
						lipLandlordPhone		: landlordPhone,
						lipLandlordOtherContact : landlordOtherContact,
						lipContactsPeople 		: addContactsPeople,
						lipContactInformation 	: addContactsinfomation,
						lipOtherContactInfo 	: otherContactInfo,
						lipTheAgent 			: theAgent,
						lipAgentPhone 			: agentPhone,
						lipAgentOtherContact 	: agentOtherContact,
						lipRegistrar			: _loginUserId,
					}, function(landlordData) {
						if(landlordData.code<0){
							hideLoading();
							return;
						}
						landlordData=landlordData.body;
						$.post("../updateHouse.action", {
							houseCoding : parseInt(addHouseCoding),
							houseLipId: parseInt(landlordData.lipId)
						}, function(updateData) {
							
						});
					});
				}else{
					$.post("../updataLandlordIntentionPerson.action", {
						lipId 					: laId,
						lipLandlordName			: landlordName,
						lipLandlordPhone		: landlordPhone,
						lipLandlordOtherContact : landlordOtherContact,
						lipContactsPeople 		: addContactsPeople,
						lipContactInformation 	: addContactsinfomation,
						lipOtherContactInfo 	: otherContactInfo,
						lipTheAgent 			: theAgent,
						lipAgentPhone 			: agentPhone,
						lipAgentOtherContact 	: agentOtherContact,
					}, function(landlordData) {
						
					});
				}
			}
			dataFollowJson = {
				jhfHouseId : addHouseCoding,
				jhfFollowRemark : followNote,
				jhfFollowResult : followResult,
				jhfPaymentWay : followType,
				jhfUserId : _loginUserId,
				jhfUserName : _loginUserName,
				jhfFollowTime : getNowFormatDate(),
			};
			hideLoading();
			myTips("修改成功！", "success");
			queryHousePaper(_pageNum[0], 0);
			infoFollowInfo(addHouseCoding);
			$('#housePaperDlg').dialog('close');
		});
	}else{
		hideLoading();
		myTips("修改成功！", "success");
		return;
	}
}

// 打开写跟进对话框
function writeFollow() {
	$('#writeFollow').dialog({
		title : '写跟进',
		top : getTop(160),
		left : getLeft(340),
		width : 340,
		height : 190,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$(".follow_mark").val('');
		},
		onOpen : function() {
			$(".follow_mark").val('');
		},
	});
	$("#writeFollowRemind").prop("checked", false);
	$('#writeFollow').dialog('open');
}
// 执行写跟进
function followSaveHouse() {
	var addHouseCoding = $(".add_saveHouse_houseCoding").val();
	var follow_mark = $(".follow_mark").val();
	var jhfFollowBelong = $("#writeFollowBelong").find('option:selected').text();
	if (follow_mark == '') {
		myTips("跟进内容为空！", "error");
		return;
	}
	var jhfRemind = '否';
	if( $("#writeFollowRemind").prop("checked")){
		jhfRemind = '是';
	}
	showLoading();
	$.post("../insertHousingFollow.action", {
		jhfHouseId : addHouseCoding,
		jhfFollowRemark : follow_mark,
		jhfRemind:jhfRemind,
		jhfFollowResult : '跟进成功',
		jhfFollowBelong : jhfFollowBelong,
		jhfPaymentWay : '业务跟进',
		jhfUserId : _loginUserId,
		jhfDepartment :_loginDepartment,
		jhfStorefront :_loginStore,
	}, function(data) {
		if (data.code<0) {
			myTips("写跟进失败！","error");
			hideLoading();
			return;
		}
		$('.follow_mark').val('');
		var row = $('#housePaperDg').datagrid('getSelected');
		//queryFollow(addHouseCoding, 1, 0);
		infoFollowInfo(addHouseCoding);
		myTips("写跟进成功！","success");
		$('#writeFollow').dialog('close');
		hideLoading();
	});
}

// 门牌规则显示
function doorplatenoShow(relus) {
	var doorRelus = '(该小区门牌号规则：';
	var doorNums = relus.split(',');
	if (doorNums.length != 3 || doorNums[0] == '' || doorNums[1] == '' || doorNums[2] == '') {
		doorRelus = "(暂无门牌规则，请在定义规则后再输入门牌号！)"
		$("#doorplatenoDlgButton").show();
	} else {
		$("#doorplatenoDlgButton").hide();
		var relusRuslt = '';
		for (var i in doorNums) {
			if (i != 0 && doorNums[i] != 0) {
				doorRelus += " + ";
			}
			if (doorNums[i] == 0) {

			}
			if (doorNums[i] == 1) {
				doorRelus += '一位数字';
			}
			if (doorNums[i] == 2) {
				doorRelus += '两位数字';
			}
			if (doorNums[i] == 3) {
				doorRelus += '三位数字';
			}
			if (doorNums[i] == 4) {
				doorRelus += '字母';
			}
			if (i == 0) {
				doorRelus += "楼层";
			}
			if (i == 1) {
				doorRelus += "房号";
			}
			if (i == 2) {
				doorRelus += ')';
			}
		}
	}
	return doorRelus;
}
// 门牌规则赋值以及限制输入框输入
function doorplatenoRelusPush(relusVal, type) {
	var relusGroup = relusVal.split(',');
	var numsLength = 1;
	var inputId = '';
	if (type == 0) {
		inputId = 'addDoorplateno';
	} else {
		inputId = 'doorplatenoInput';
	}
	if (relusGroup.length == 3) {
		for (var i in relusGroup) {
			if (relusGroup[i] == 0) {
				numsLength = 0;
			}
			if (relusGroup[i] == 2) {
				numsLength = 2;
			}
			if (relusGroup[i] == 3) {
				numsLength = 3;
			}
			if (relusGroup[i] == 1 || relusGroup[i] == 4) {
				numsLength = 1;
			}
			$("#" + inputId + (parseInt(i) + 1)).attr({
				maxlength : numsLength
			});
			if (relusGroup[i] == 4) {
				$("#" + inputId + (parseInt(i) + 1)).unbind('keypress');
				$("#" + inputId + (parseInt(i) + 1)).onlyAlpha();
			} else {
				$("#" + inputId + (parseInt(i) + 1)).unbind('keypress');
				$("#" + inputId + (parseInt(i) + 1)).numeral();
			}
		}

	} else {
		$(".hd_doorplateno_relus").val('');
		$("#doorplatenoTypeSelect").val('');
	}
	$("#infoDoorplatenoRelus").text(doorplatenoShow(relusVal));
}

// 片区联动
function zoneLink(type) {
	$("#add_saveHouse_zone1").val('');
	$("#buildingName").empty('');
	$(".add_saveHouse_stree").val('');
	$("#infoDoorplatenoRelus").text('');
	
	$(".add_saveHouse_zone1").val('');
	
	$(".add_saveHouse_buildingId").val('');
	$(".add_saveHouse_zone").append("<option></option>");
	var cityText = '';
	var districtText = '';
	if (type == 0) {
		$("#add_saveHouse_buildingName").empty();
		$("#buildingName").val('');
		cityText = _loginCompanyRentCity
		districtText = $("#add_saveHouse_district").find("option:selected").text();
	}else{
		$("#saveHouse_buildingName").empty();
		$("#addSaveHouseBuildingName").val('');
		cityText = _loginCompanyRentCity
		districtText = $("#addSaveHouseDistrict").find("option:selected").text();
	}
	if (districtText == '') {
		if (type == 0) {
			filteroption("add_saveHouse_buildingName");
		}else{
			filteroption("saveHouse_buildingName");
		}
		return;
	}
	$("#addDistrict").val(districtText);
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText,
		hdDistrict : districtText,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		$("#buildingName").append("<option>--请选择--</option>");
		if(type==0){
			for (var i in data) {
				$("#buildingName").append("<option value = '" + i + "'>" + data[i] + "</option>");
			}
		}else{
			for (var i in data) {
				$("#buildingName").append("<option value = '" + i + "'>" + data[i] + "</option>");
			}
		}
	});
}
//添加资料房  地址联动
function streeLink(type) {
	$(".add_saveHouse_stree").val('');
	$(".add_saveHouse_buildingId").val('');
	$("#infoDoorplatenoRelus").text('');
	var cityText = '';
	var districtText = '';
	var zoneText = '';
	var buildNameText = '';
	if (type == 0) {
		cityText = _loginCompanyRentCity
		districtText = $("#add_saveHouse_district").find("option:selected").text();
		zoneText = $("#add_saveHouse_zone").find("option:selected").text();
		buildNameText = $("#add_saveHouse_buildingName").find("option:selected").text()
	} else {
		cityText = _loginCompanyRentCity
		districtText = $("#addSaveHouseDistrict").find("option:selected").text();
		zoneText = $("#addSaveHouseZone").find("option:selected").text();
		buildNameText = $("#saveHouse_buildingName").find("option:selected").text()
	}
	if (buildNameText == '') {
		return;
	}
	if(type==0){
		choseSelectVal("buildingName", "add_saveHouse_buildingName" ,"buildingNameDiv");
	}else{
		choseSelectVal("addSaveHouseBuildingName", "saveHouse_buildingName" ,"buildingNamesDiv");
	}
	$("#addCommunity").val(buildNameText);
	$.post("../queryAllHouseDict.action",{
		hdCity : cityText,
		hdDistrict : districtText,
		hdZone : zoneText,
		hdCommunity : buildNameText,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		if(type==0){
			$("#add_saveHouse_stree").val(data[0].hdRoad);
			$("#add_saveHouse_buildingId").val(data[0].hdId);
			$("#add_saveHouse_zone1").val(data[0].hdZone);
			$("#add_saveHouse_zone").val(data[0].hdZone);
			$("#addSaveHouseStree").val(data[0].hdRoad);
			$("#houseDictId").val(data[0].hdId);
			$("#addStreet").val(data[0].hdRoad);
			$(".hd_doorplateno_relus").val(data[0].hdDoorplatenoRelus);
			var relusVal = data[0].hdDoorplatenoRelus;
			if(_doorplateno == 1){
				if (relusVal.split(',').length != 3) {
					$("#doornoMsg").html('暂无门牌规则');
				} else {
					$("#doornoMsg").html(doorplatenoShow($('.hd_doorplateno_relus').val()));
				}
			}
			doorplatenoRelusPush(relusVal, 0);
			$("#infoDoorplatenoRelus").text(doorplatenoShow(relusVal));
		}else{
			$("#addCity").val(data[0].hdCity);
			$("#addDistrict").val(data[0].hdDistrict);
			$("#addZone").val(data[0].hdZone);
			$("#addCommunity").val(data[0].hdCommunity);
			$("#addStreet").val(data[0].hdRoad);
			$("#houseDictId").val(data[0].hdId);
		}
		
	});
}

function exchangeZone() {
	$("#add_saveHouse_zone1").val('');
	var cityText = _loginCompanyRentCity;
	var districtText = $("#add_saveHouse_district").find("option:selected").text();
	var buildNameText = $("#buildingName").find("option:selected").text();
	var zoneText = $("#add_saveHouse_zone").find("option:selected").text();
	if(buildNameText == '--请选择--'){
		buildNameText='';
	}
	$.post("../queryAllHouseDict.action",{
		hdCity : cityText,
		hdDistrict : districtText,
		hdZone : zoneText,
		hdCommunity : buildNameText,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		$("#add_saveHouse_zone1").val(data[0].hdZone);
	});
}

//列表下方跟进的详细界面
function downFollowInfo(row){
	$('#downFollowInfo').dialog({
		title : '跟进详细信息',
		top : getTop(250),
		left : getLeft(450),
		width : 450,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#downFollowInfo span').text('');
		},
	});
	for(var i in row){
		if(i=='jhfFollowRemark'){
			$('#readDownFollow'+i).html("&nbsp;&nbsp;&nbsp;&nbsp;"+row[i].replace(/\n/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;"));
		}else{
			$('#readDownFollow'+i).html(row[i]);
		}
		
	}
	
	$('#downFollowInfo').dialog('open');
}
//私盘关注
function setFirstFollow(){
	var row = $('#housePaperDg').datagrid('getSelected');
	if(!row){
		myTips("请选择一个盘源设置关注！","error");
		return;
	}
	if(row.firstFollow==0||row.firstFollow==null||row.firstFollow==''){
		$.messager.confirm("操作提示", "确定设置此盘源优先关注吗？", function(data) {
			if (data) {
				$.post("../firstFollowOfMine.action", {
					houseCoding:row.houseCoding,
					firstFollow:parseInt(1),
				},function(data) {
					if(data.code<0){
						myTips(data.msg,"error");
						return;
					}
					myTips("设置优先关注成功！","success");
					queryHousePaper(_pageNum[0], 0);
				});
			}else{
				return;
			}
		});
		return;
	}else if(row.firstFollow==1){
		$.messager.confirm("操作提示", "确定取消此盘源关注吗？", function(data) {
			if (data) {
				$.post("../firstFollowOfMine.action", {
					houseCoding:row.houseCoding,
					firstFollow:parseInt(0),
				},function(data) {
					if(data.code<0){
						myTips(data.msg,"error");
						return;
					}
					myTips("取消优先成功！","success");
					queryHousePaper(_pageNum[0], 0);
				});
			}else{
				return;
			}
		});
		return;
	}
}
//打开查询所有跟进对话框
function queryFollowInfoDlg(){
	$('#queryFollowInfoDlg').dialog({
		title : '查询跟进',
		top : getTop(450),
		left : getLeft(800),
		width : 800,
		height : 450,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		},
	});
	$("#searchEndTime").val(formatTime(getNowFormatDate(), 2));
	if ($('#followInfoTable').hasClass('datagrid-f')) {

	} else {
		$('#followInfoTable').datagrid({
			columns : [ [ {
				field : 'jhfFollowTime',
				title : '跟进时间',
				width : '16%',
				align : 'center'
			}, {
				field : 'jhfUserName',
				title : '跟进人',
				width : '8%',
				align : 'center'
			}, {
				field : 'jhfPaymentWay',
				title : '跟进类型',
				width : '7%',
				align : 'center'
			}, {
				field : 'jhfFollowBelong',
				title : '跟进归属',
				width : '7%',
				align : 'center'
			},  {
				field : 'detailedAddress',
				title : '跟进地址',
				width : '25%',
				align : 'center'
			}, {
				field : 'jhfFollowRemark',
				title : '跟进内容',
				width : '30%',
				align : 'center'
			} ] ],
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			// 表格行双击事件
			onDblClickRow : function(rowIndex, rowData) {
				downFollowInfo(rowData);
			}
		});
	}
	queryFollowInfo(1,0)
	$('#queryFollowInfoDlg').dialog('open');
}
//查询所有跟进
function queryFollowInfo(page,type){
	var pageNum = 10;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var jhfUserId = $('#searchFollowGetUserId').val();
	var followTurn = $('#followTurn').val();
	/*var jhfDepartment = $('#followUserDept').val();*/
	var jhfPaymentWay = $('#followTypeSearch').val();
	var signedState = $('#searchFollowSignedState').val();
	if (followTurn!='') {
		var starDay = '';
		var endDay = '';
		var now = new Date(); 
		var nowTime = now.getTime() ; 
		var day = now.getDay();
		var nowDay = now.getDate();
		var nowMonth = now.getMonth()+1;
		var nowYear  = now.getYear();
		nowYear += (nowYear < 2000) ? 1900 : 0;
		if(followTurn=='本周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day-1)*oneDayLong  ; 
			var SundayTime =  nowTime + (7-day)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(followTurn=='上周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day+6)*oneDayLong  ; 
			var SundayTime =  nowTime + (day-2)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(followTurn=='本月'){
			now.setDate(1);
			starDay = now ;
			var endDay = new Date(now);
			endDay.setMonth(now.getMonth()+1);
			endDay.setDate(0);
		}else if(followTurn=='上月'){
			starDay = new Date(now);	
			starDay.setMonth(now.getMonth()-1);
			starDay.setDate(1);
			endDay = new Date(now);
			endDay.setMonth(now.getMonth());
			endDay.setDate(0);
		}else if(followTurn=='本季度'||followTurn=='上季度'){
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
			if(followTurn=='本季度'){
				starDay = new Date(nowYear, quarterStartMonth, 1); 
				endDay = new Date(nowYear, quarterEndMonth, 1); 
			}else{
				starDay = new Date(nowYear, quarterStartMonth-3, 1); 
				endDay = new Date(nowYear, quarterEndMonth-3, 1); 
			}
			endDay.setDate(0);
		}else  if(followTurn=='本年'){
			starDay = new Date(nowYear, 0, 1);
			endDay = new Date(nowYear, 12,0);
		}else  if(followTurn=='去年'){
			starDay = new Date(nowYear-1, 0, 1);
			endDay = new Date(nowYear-1, 12,0);
		}
		$('#searchStartTime').val(formatDate(starDay));
		$('#searchEndTime').val(formatDate(endDay));
	}
	var fromTime = $('#searchStartTime').val();
	var toTime = $('#searchEndTime').val();
	if(fromTime==''){
		fromTime ='1980-01-01';
	}
	toTime = new Date(toTime);
	toTime.setDate(toTime.getDate() + 1);
	toTime =  formatDate(toTime);
	// 跟进记录表取数据
	$.post("../selectHouseFollow.action", {
		startNum 		: startNum,
		endNum 			: endNum,
		jhfUserId		: jhfUserId,
		fromTime		: fromTime,
		toTime			: toTime,
		jhfPaymentWay	: jhfPaymentWay,
		/*jhfDepartment	: jhfDepartment,*/
		houseSignedState: signedState,
		splitFlag		: 1,
	}, function(data) {
		if (data.code<0) {
			$('#followInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryFollowInfo","followInfo");
			}else{
				notCountPage(page, 0 ,"queryFollowInfo","followInfo");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryFollowInfo","followInfo");
			}else{
				notCountPage(page, 1 , "queryFollowInfo","followInfo");
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].detailedAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}
			$("#followInfoTable").datagrid("loadData", data);
		}
	}, "json");
}
//查询所有跟进-统计总条数
function getfollowInfoPageCount(page,type){
	var pageNum = 10;
	
	var jhfUserId = $('#followUserStaff').val();
	var followTurn = $('#followTurn').val();
	var jhfDepartment = $('#followUserDept').val();
	var jhfPaymentWay = $('#followTypeSearch').val();
	var signedState = $('#searchFollowSignedState').val();
	if (followTurn!='') {
		var starDay = '';
		var endDay = '';
		var now = new Date(); 
		var nowTime = now.getTime() ; 
		var day = now.getDay();
		var nowDay = now.getDate();
		var nowMonth = now.getMonth()+1;
		var nowYear  = now.getYear();
		nowYear += (nowYear < 2000) ? 1900 : 0;
		if(followTurn=='本周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day-1)*oneDayLong  ; 
			var SundayTime =  nowTime + (7-day)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(followTurn=='上周'){
			var oneDayLong = 24*60*60*1000 ; 
			var MondayTime = nowTime - (day+6)*oneDayLong  ; 
			var SundayTime =  nowTime + (day-2)*oneDayLong ; 
			starDay = new Date(MondayTime);
			endDay = new Date(SundayTime);
		}else if(followTurn=='本月'){
			now.setDate(1);
			starDay = now ;
			var endDay = new Date(now);
			endDay.setMonth(now.getMonth()+1);
			endDay.setDate(0);
		}else if(followTurn=='上月'){
			starDay = new Date(now);	
			starDay.setMonth(now.getMonth()-1);
			starDay.setDate(1);
			endDay = new Date(now);
			endDay.setMonth(now.getMonth());
			endDay.setDate(0);
		}else if(followTurn=='本季度'||followTurn=='上季度'){
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
			if(followTurn=='本季度'){
				starDay = new Date(nowYear, quarterStartMonth, 1); 
				endDay = new Date(nowYear, quarterEndMonth, 1); 
			}else{
				starDay = new Date(nowYear, quarterStartMonth-3, 1); 
				endDay = new Date(nowYear, quarterEndMonth-3, 1); 
			}
			endDay.setDate(0);
		}else  if(followTurn=='本年'){
			starDay = new Date(nowYear, 0, 1);
			endDay = new Date(nowYear, 12,0);
		}else  if(followTurn=='去年'){
			starDay = new Date(nowYear-1, 0, 1);
			endDay = new Date(nowYear-1, 12,0);
		}
		$('#searchStartTime').val(formatDate(starDay));
		$('#searchEndTime').val(formatDate(endDay));
	}
	var fromTime = $('#searchStartTime').val();
	var toTime = $('#searchEndTime').val();
	if(fromTime==''){
		fromTime ='1980-01-01';
	}
	toTime = new Date(toTime);
	toTime.setDate(toTime.getDate() + 1);
	toTime =  formatDate(toTime);
	// 跟进记录表取数据
	$.post("../selectHouseFollow.action", {
		jhfUserId		: jhfUserId,
		fromTime		: fromTime,
		toTime			: toTime,
		jhfPaymentWay	: jhfPaymentWay,
		jhfDepartment	: jhfDepartment,
		houseSignedState: signedState,
		splitFlag		: 0,
	}, function(data) {
		if (data.code<0 ||data.body[0].totalNum==0) {
			var countJson = {
					totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"followInfo",0);
		} else {
			data=data.body;
			var countJson = {
					totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"followInfo",0);
		}
	}, "json");
}
//信息列表租方显示列格式
function ifPublicHouseRent(value, row, index){
	if (row.tenantName == null||row.tenantName=='') {
		return "<a style='text-decoration:none;color:red;'>无<a>";
	}else{
		return "<a style='text-decoration:none;color:blue;'>"+row.tenantName+"<a>";
	}
}
//信息列表售方显示列格式
function ifPublicHouseSale(value, row, index) {
	if (row.whilePeopleName == null||row.whilePeopleName=='') {
		return "<a style='text-decoration:none;color:red;'>无<a>";
	}else{
		return "<a style='text-decoration:none;color:blue;'>"+row.whilePeopleName+"<a>";
	}
}
//信息列表钥匙管理人显示列格式
function ifPublickeyPeopleName(value, row, index) {
	if (row.keyPeopleName == null||row.keyPeopleName=='') {
		return "<a style='text-decoration:none;color:red;'>无<a>";
	}else{
		return "<a style='text-decoration:none;color:blue;'>"+row.keyPeopleName+"<a>";
	}
}

//添加房源 面积 租价 租单价 售价 售单价onkeyup
function changePriceForSquare(thisClass){
	var square = $(".add_saveHouse_square").val()!='' ? $(".add_saveHouse_square").val() : 0.00;
	var rentPrice = $(".add_saveHouse_rentPrice").val()!='' ? $(".add_saveHouse_rentPrice").val() : 0.00;
	var rentPriceTotal = $(".add_saveHouse_rentPriceTotal").val()!='' ? $(".add_saveHouse_rentPriceTotal").val() : 0.00;
	var salePrice = $(".add_saveHouse_salePrice").val()!='' ? $(".add_saveHouse_salePrice").val() : 0.00;
	var salePriceTotal = $(".add_saveHouse_salePriceTotal").val()!='' ? $(".add_saveHouse_salePriceTotal").val() : 0.00;
	if(thisClass=="add_saveHouse_square"){
		if(rentPriceTotal !="" && rentPriceTotal!=0){
			$(".add_saveHouse_rentPrice").val(accDiv(rentPriceTotal,square));
		}else if(rentPrice !="" && rentPrice!=0){
			$(".add_saveHouse_rentPriceTotal").val(accMul(square,rentPrice));
		}
		if(salePriceTotal !="" && salePriceTotal!=0){
			$(".add_saveHouse_salePrice").val(accDiv(salePriceTotal,square));
		}else if(salePrice !="" && salePrice!=0){
			$(".add_saveHouse_salePriceTotal").val(accMul(square,salePrice));
		}
	}
	if(square==''||square==0){
		return;
	}
	if(thisClass=="add_saveHouse_rentPrice"){
		if(rentPrice !="" && rentPrice!=0 && square !="" && square!=0){
			$(".add_saveHouse_rentPriceTotal").val(accMul(square,rentPrice));
		}
	}
	if(thisClass=="add_saveHouse_rentPriceTotal"){
		if(rentPriceTotal !="" && rentPriceTotal!=0 && square !="" && square!=0){
			$(".add_saveHouse_rentPrice").val(accDiv(rentPriceTotal,square));
		}
	}
	if(thisClass=="add_saveHouse_salePrice"){
		if(salePrice !="" && salePrice!=0 && square !="" && square!=0){
			$(".add_saveHouse_salePriceTotal").val(accMul(square,salePrice));
		}
	}
	if(thisClass=="add_saveHouse_salePriceTotal"){
		if(salePriceTotal !="" && salePriceTotal!=0 && square !="" && square!=0){
			$(".add_saveHouse_salePrice").val(accDiv(salePriceTotal ,square));
		}
	}
}
// 打开写跟进对话框
function writeFollow2() {
	$('#writeFollow2').dialog({
		title : '强写跟进',
		top : getTop(305),
		left : getLeft(408),
		width : 340,
		height : 190,
		closable : false,
		cache : false,
		modal : true,
		onClose : function() {
			$(".follow_mark2").val('');
		},
		onOpen : function() {
			$(".follow_mark2").val('');
		},
	});
	$("#writeFollowRemind2").prop("checked", false);
	$('#writeFollow2').dialog('open');
}

// 执行写跟进
function followSaveHouse2() {
	var addHouseCoding = $(".add_saveHouse_houseCoding").val();
	var follow_mark = $(".follow_mark2").val();
	var jhfFollowBelong = $("#writeFollowBelong2").find('option:selected').text();
	console.log(follow_mark);
	if (follow_mark.length<3) {
		myTips("跟进内容应该大于3个字符！", "error");
		return;
	}
	var jhfRemind = '否';
	if( $("#writeFollowRemind2").prop("checked")){
		jhfRemind = '是';
	}
	showLoading();
	$.post("../insertHousingFollow.action", {
		jhfHouseId : addHouseCoding,
		jhfFollowRemark : follow_mark,
		jhfRemind:jhfRemind,
		jhfFollowResult : '跟进成功',
		jhfFollowBelong : jhfFollowBelong,
		jhfPaymentWay : '业务跟进',
		jhfUserId : _loginUserId,
		jhfDepartment :_loginDepartment,
		jhfStorefront :_loginStore,
	}, function(data) {
		if (data.code<0) {
			myTips("写跟进失败！","error");
			hideLoading();
			return;
		}
		$('.follow_mark2').val('');
		var row = $('#housePaperDg').datagrid('getSelected');
		//queryFollow(addHouseCoding, 1, 0);
		infoFollowInfo(addHouseCoding);
		myTips("写跟进成功！","success");
		//发送请求修改+1
		$.post("../updateSuFollowupValueUser.action",{suFollowupValue : 1},function(data){
			if(data.code == 1){
				console.log(data.code);
				//hideLoading();
			}else {
				myTips(data.msg,"error");
				return;
			}
		});
		$('#writeFollow2').dialog('close');
		hideLoading();
	});
}


////////////
function lookLandlord(){
	var follow_mark = departmentName +' '+ _loginUserName +', '+ getNowFormatDate()+' 查看业主资料。 ';
	//1.查询变量表的forced_followup_ switch看需不需要跟进
	$.post('../selectSysVariables.action',{variablesId : 1},function(data){

		data=data.body;
		var ffs = data[0].forcedFollowupSwitch;//1开，2关 强跟进
		//console.log(ffs);
		//检查是否冻结
		$.post('../checkSuFrozenUser.action',function(data){
			data=data.body;
			console.log(data);
			if(data==0){
				myTips('抱歉，您已被系统冻结相关权限，请联系上级解冻。','error');
				return;
			}else{
				//打开跟进窗口
				if(ffs==1){
					writeFollow2();
					//发送请求suFollowupValue修改-1
					$.post('../updateSuFollowupValueUser.action',{suFollowupValue : -1},function(data){
						if(data.code == 1){
							console.log(data.code);
							//hideLoading();
						}else {
							myTips(data.msg,'error');
							return;
						}
					});
				}
				showLoading();
				var row = $('#housePaperDg').datagrid('getSelected');
				console.log(row)
				$.post('../queryLandlordIntentionPersonInHouse.action', {
					lipId 			: row.houseLipId,
					lipRegistrar	: _loginUserId
				}, function(data) {
					hideLoading();
					if(data.code<0){
						myTips(data.msg,'error');
						return;
					}
					data=data.body;
					_updateLandlord = data[0];
					$('.add_saveHouse_landlordName').val(data[0].lipLandlordName);
					$('.add_saveHouse_landlordPhone').val(data[0].lipLandlordPhone);
					$('.add_saveHouse_landlordOther').val(data[0].lipLandlordOtherContact);
					$('.add_saveHouse_contacts_people').val(data[0].lipContactsPeople);
					$('.add_saveHouse_contacts_infomation').val(data[0].lipContactInformation);
					$('.add_saveHouse_other_contact_info').val(data[0].lipOtherContactInfo);
					$('.add_saveHouse_the_agent').val(data[0].lipTheAgent);
					$('.add_saveHouse_agent_phone').val(data[0].lipAgentPhone);
					$('.add_saveHouse_agent_other_contact').val(data[0].lipAgentOtherContact);

					$('#housePaperDlg').dialog('resize', {
						width : 675,
						height : 550
					});
					$('#landlordInfo').show();
					$('#lookLandlordButton').hide();
				});
			}
		});



		//myTips("尚未查看业主,不能修改房源!","error");
	});

}
//锁盘/解锁
function setStateOwned(){
	var row = $('#housePaperDg').datagrid('getSelected');
	if(!row){
		myTips("请选择一个盘源设置锁盘！","error");
		return;
	}
	if((row.housePeople4rent==null||row.housePeople4rent=='')&&(row.housePeople4sell==null||row.housePeople4sell=='')){
		$.messager.alert("提示", "请设置租方跟进人或者售方跟进人后再设置为私盘！", "error");
		return;
	}
	if(row.stateOwned=="私盘"){
		$.messager.confirm("设为公盘", "确定还原此私盘为公盘吗？", function(data) {
			if (data) {
				$.post("../updateStateOwned.action", {
					houseCoding:row.houseCoding,
					stateOwned:"公盘",
				},function(data) {
					if(data.code<0){
						myTips(data.msg,"error");
						return;
					}
					myTips("还原公盘成功！","success");
					queryHousePaper(_pageNum[0], 0);
				});
			}else{
				return;
			}
		});
	}
	if(row.stateOwned=="公盘"){
		$.messager.confirm("设为私盘", "确定将此公盘设为私盘吗？<br>设为私盘后，再次点击“锁盘/解锁”，可还原为公盘。 ", function(data) {
			if (data) {
				$.post("../updateStateOwned.action", {
					houseCoding:row.houseCoding,
					stateOwned:"私盘",
				},function(data) {
					if(data.code<0){
						myTips(data.msg,"error");
						return;
					}
					myTips("设置私盘成功！","success");
					queryHousePaper(_pageNum[0], 0);
				});
			}else{
				return;
			}
		});
	}
}