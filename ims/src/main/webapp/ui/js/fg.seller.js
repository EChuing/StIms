$(function() {
	querySeller(1,0);
	$('#sellerDg').datagrid({
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			var row = $("#sellerDg").datagrid("getSelected");
			seeSeller(rowData);
		}
	});
});
//查询供应商信息
function querySeller(page,type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	// 供应商表导入数据
	$.post("../selectsupplier.action", {
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data.length == 0) {
			sourcePage(0, 0, 0);
			var noData = [];
			$('#sellerDg').datagrid({
				data : noData,
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 0);
			}
		}
		$("#sellerDg").datagrid("loadData", data);
	}, "json");
}
//分页
function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#sellerPage").remove();
		$("#sellerPageDiv")
				.append(
						"<div class='tcdPageCode' id='sellerPage' style='text-align:center;'></div>");
		$("#sellerPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					querySeller(p, 1);
				}
			}
		});
	}
}
//添加商家对话框
function addSeller() {
	$("#addSellerlg").dialog({
		title : '添加商家',
		top : getTop(225),
		left : getLeft(460),
		width : 460,
		height : 225,
		closed : true,
		cache : false,
		modal : true,
		onClose:function(){
			
		}
	});
	$(".add_seller_userName").val(_loginUserName);
	$(".add_seller_userId").val(_loginUserId);
	$("#addSellerlg").dialog('open');
}
//执行添加
function doAddSeller(){
	var slSupplierName = $(".addSlSupplierName").val();
	var slBusinessAddress = $(".addSlBusinessAddress").val();
	var slTheContactName = $(".addSlTheContactName").val();
	var slPhone = $(".addSlPhone").val();
	var slMobilePhone = $(".addSlMobilePhone").val();
	var slStatus = $(".addSlStatus").val();
	var slPriority = $(".addSlPriority").val();
	var slUserId = $(".add_seller_userId").val();
	if (slSupplierName == "") {
		myTips('有必填项没有输入，请输入!', 'error');
		return;
	}
	var p ={
			slSupplierName : slSupplierName,
			slBusinessAddress : slBusinessAddress,
			slTheContactName : slTheContactName,
			slPhone : slPhone,
			slMobilePhone : slMobilePhone,
			slStatus : slStatus,
			slPriority : slPriority,
			slUserId : slUserId
		};
	$.post("../insertsupplier.action",p,
		function(data) {
			if(data<0||data==''){
				myTips('添加失败！', 'error');
				return;
			}
			if (data >0) {
				$('#addSellerlg').dialog('close');
				myTips('添加成功！', 'success');
				querySeller(1, 0);
			} 
		});
}
function updateSeller(){
	var rowData = $("#sellerDg").datagrid("getSelected");
	if(rowData == null){
		myTips('请选中需要修改的行！', 'error');
		return;
	}
	$(".updateSlSupplierName").val(rowData.slSupplierName);
	$(".updateSlBusinessAddress").val(rowData.slBusinessAddress);
	$(".updateSlTheContactName").val(rowData.slTheContactName);
	$(".updateSlPhone").val(rowData.slPhone);
	$(".updateSlMobilePhone").val(rowData.slMobilePhone);
	$(".updateSlStatus").val(rowData.slStatus);
	$(".updateSlPriority").val(rowData.slPriority);
	$(".updateUserName").val(rowData.userName);
	$(".update_seller_userName").val(_loginUserName);
	$(".update_seller_userId").val(_loginUserId);
	$("#updateSellerlg").dialog({
		title : '修改商家',
		top : getTop(225),
		left : getLeft(460),
		width : 460,
		height : 225,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$("#updateSellerlg").dialog('open');
}
function doUpdateSeller(){
	var rowData = $("#sellerDg").datagrid("getSelected");
	var slId = rowData.slId;
	var slSupplierName = $(".updateSlSupplierName").val();
	var slBusinessAddress = $(".updateSlBusinessAddress").val();
	var slTheContactName = $(".updateSlTheContactName").val();
	var slPhone = $(".updateSlPhone").val();
	var slMobilePhone = $(".updateSlMobilePhone").val();
	var slStatus = $(".updateSlStatus").val();
	var slPriority = $(".updateSlPriority").val();
	var slUserId = $(".update_seller_userId").val();
	if (slSupplierName == "") {
		myTips('有必填项没有输入，请输入!', 'error');
		return;
	}
	var p ={
			slId : slId,
			slSupplierName : slSupplierName,
			slBusinessAddress : slBusinessAddress,
			slTheContactName : slTheContactName,
			slPhone : slPhone,
			slMobilePhone : slMobilePhone,
			slStatus : slStatus,
			slPriority : slPriority,
			slUserId : slUserId
		};
	$.post("../updatasupplier.action",p,
		function(data) {
			if (data <0||data=='') {
				myTips('添加失败！', 'error');
			} else {
				$('#updateSellerlg').dialog('close');
				myTips('添加成功！', 'success');
				querySeller(1, 0);
			}
		});
}
function seeSeller(rowData){
	$(".seeSlSupplierName").val(rowData.slSupplierName);
	$(".seeSlBusinessAddress").val(rowData.slBusinessAddress);
	$(".seeSlTheContactName").val(rowData.slTheContactName);
	$(".seeSlPhone").val(rowData.slPhone);
	$(".seeSlMobilePhone").val(rowData.slMobilePhone);
	$(".seeSlStatus").val(rowData.slStatus);
	$(".seeSlPriority").val(rowData.slPriority);
	$(".seeUserName").val(rowData.userName);
	
	$("#seeSellerlg").dialog({
		title : '查看商家',
		top : getTop(190),
		left : getLeft(460),
		width : 460,
		height : 190,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$("#seeSellerlg").dialog('open');
}
//城市联动
function cityLink() {
	$.post("../queryForHouseDictAddress.action", function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		_city = data;
		for (var i in data) {
			$(".add_saveHouse_city").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
			$("#searchCity").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
	});
}
// 城区联动
function districtLink() {
	$(".add_saveHouse_district").empty();
	$(".add_saveHouse_district").append("<option></option>");
	var cityText = $(".add_saveHouse_city").find("option:selected").text();
	for(var i = 0;i<4;i++){
		_locationNeeds[i] =''; 
	}
	_locationNeeds[0] = cityText; 
	var str ='';
	for(var i in _locationNeeds){
		str += _locationNeeds[i];
	}
	$('.add_location_needs').val(str);
	$("#addCity").val($(".add_saveHouse_city").find("option:selected").text());
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$(".add_saveHouse_district").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
	});
}
// 片区联动
function zoneLink() {
	$(".add_saveHouse_zone").empty();
	$(".add_saveHouse_zone").append("<option></option>");
	var cityText = $(".add_saveHouse_city").find("option:selected").text();
	var districtText = $(".add_saveHouse_district").find("option:selected")
			.text();
	for(var i = 0;i<4;i++){
		_locationNeeds[i] =''; 
	}
	_locationNeeds[0] = cityText; 
	_locationNeeds[1] = districtText; 
	var str ='';
	for(var i in _locationNeeds){
		str += _locationNeeds[i];
	}
	$('.add_location_needs').val(str);
	$("#addDistrict").val($(".add_saveHouse_district").find("option:selected").text());
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText,
		hdDistrict : districtText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$(".add_saveHouse_zone").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
	});
}
// 楼盘名称联动
function buildNameLink() {
	$(".add_saveHouse_buildingName").empty();
	$(".add_saveHouse_buildingName").append("<option></option>");
	var cityText = $(".add_saveHouse_city").find("option:selected").text();
	var districtText = $(".add_saveHouse_district").find("option:selected")
			.text();
	var zoneText = $(".add_saveHouse_zone").find("option:selected").text();
	for(var i = 0;i<4;i++){
		_locationNeeds[i] =''; 
	}
	_locationNeeds[0] = cityText; 
	_locationNeeds[1] = districtText; 
	_locationNeeds[2] = zoneText; 
	var str ='';
	for(var i in _locationNeeds){
		str += _locationNeeds[i];
	}
	$('.add_location_needs').val(str);
	$("#addZone").val($(".add_saveHouse_zone").find("option:selected").text());
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText,
		hdDistrict : districtText,
		hdZone : zoneText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$(".add_saveHouse_buildingName").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
	});
}
// 地址联动
function streeLink() {
	$(".add_saveHouse_stree").val('');
	var cityText = $(".add_saveHouse_city").find("option:selected").text();
	var districtText = $(".add_saveHouse_district").find("option:selected")
			.text();
	var zoneText = $(".add_saveHouse_zone").find("option:selected").text();
	var buildNameText = $(".add_saveHouse_buildingName")
			.find("option:selected").text();
	for(var i = 0;i<4;i++){
		_locationNeeds[i] =''; 
	}
	_locationNeeds[0] = cityText; 
	_locationNeeds[1] = districtText; 
	_locationNeeds[2] = zoneText;
	_locationNeeds[3] = buildNameText; 
	var str ='';
	for(var i in _locationNeeds){
		str += _locationNeeds[i];
	}
	$('.add_location_needs').val(str);
	$("#addCommunity").val($(".add_saveHouse_buildingName").find("option:selected").text());
	$.post("../queryAllHouseDict.action", {
		hdCity : cityText,
		hdDistrict : districtText,
		hdZone : zoneText,
		hdCommunity : buildNameText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		$(".add_saveHouse_stree").val(data[0].hdRoad);
		$(".add_saveHouse_buildingId").val(data[0].hdId);
		$("#addStreet").val(data[0].hdRoad);
	});
}
