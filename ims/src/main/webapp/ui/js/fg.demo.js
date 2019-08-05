$(function() {
	queryHouse(1, 0);
	$('#houseDg').datagrid({
		onDblClickRow: function(rowIndex, rowData) {
			updateHouseDlg();
		}
	});
	for (var i in _loginCompanyRentDistrict) {
	    $('.district').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
});
//查询房源列表
function queryHouse(page, type){
	var pageSize = 1;
	var startPage = (parseInt(page) - 1) * pageSize;
	var searchDistrict = $('#searchDistrict').val();
	var searchCommunity = $('#searchCommunity').val();
	var searchBuilding = $('#searchBuilding').val();
	var searchDoorplateno = $('#searchDoorplateno').val();
	var searchRentGetUserId = $('#searchRentGetUserId').val();
	var searchSaleGetUserId = $('#searchSaleGetUserId').val();
	$.post("../queryHousePaper.action", {
		startNum: startPage,
		endNum: pageSize,
		addDistrict: searchDistrict,
		addCommunity: searchCommunity,
		addBuilding: searchBuilding,
		addDoorplateno: searchDoorplateno,
		housePeople4rent : searchRentGetUserId,
		housePeople4sell : searchSaleGetUserId,
	}, function(data) {
		if (data.code < 0) {
			initPage(0, pageSize, 'housePageDiv', 'housePage', 'queryHouse', 1);
			$('#houseDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data=data.body;
		if (page == 1) {
			initPage(data[0].totalNum, pageSize, 'housePageDiv', 'housePage', 'queryHouse', 1);
		}
		$("#houseDg").datagrid("loadData", data);
	});
}
//打开添加房源窗口
function addHouseDlg(){
	$('#addHouseDlg').dialog({
		title : '添加房源',
		top : getTop(180),
		left : getLeft(500),
		width : 500,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addHouseDlg [clear="clear"]').val('');
			$('#addHouseDlg [clean="clean"]').html('');
			$('#addHouseDlg [choose="choose"]').val('');
			$('#addHouseDlg [require="require"]').css('border', '1px solid #a9a9a9');
		},
	});
	$('#addHouseDlg').dialog('open');
}
//执行添加房源
function doAddHouse(){
	var addHouseDistrict = $('#addHouseDistrict').val();
	var addHouseCommunity = $('#addHouseCommunity').val();
	var addHouseBuilding = $('#addHouseBuilding').val();
	var addHouseDoorplateno = $('#addHouseDoorplateno').val();
	var addHouseRentGetUserId = $('#addHouseRentGetUserId').val();
	var addHouseSaleGetUserId = $('#addHouseSaleGetUserId').val();
	showLoading();
	$.post("../insertHouse.action", {
		addDistrict : addHouseDistrict,
		addCommunity : addHouseCommunity,
		addBuilding : addHouseBuilding,
		addDoorplateno : addHouseDoorplateno,
		housePeople4rent : addHouseRentGetUserId,
		housePeople4sell : addHouseSaleGetUserId,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, "error");
			return;
		}
		queryHouse(1, 0);
		myTips('添加成功', 'success');
		$('#addHouseDlg').dialog('close');
	});
}

//打开修改房源窗口
function updateHouseDlg(){
	var row = $('#houseDg').datagrid('getSelected');
	if (!row) {
		myTips('请选择一条记录', 'error');
		return;
	}
	$('#updateHouseDlg').dialog({
		title : '修改房源',
		top : getTop(180),
		left : getLeft(500),
		width : 500,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateHouseDlg [clear="clear"]').val('');
			$('#updateHouseDlg [clean="clean"]').html('');
			$('#updateHouseDlg [choose="choose"]').val('');
			$('#updateHouseDlg [require="require"]').css('border', '1px solid #a9a9a9');
		},
	});
	$('#updateHouseDlg').dialog('open');
	$('#updateHouseDistrict').val(row.addDistrict);
	$('#updateHouseCommunity').val(row.addCommunity);
	$('#updateHouseBuilding').val(row.addBuilding);
	$('#updateHouseDoorplateno').val(row.addDoorplateno);
	for(var j in _userInfoData){
		if(row.housePeople4rent == _userInfoData[j].userId){
			$("#updateHouseRentGetUserId").val(_userInfoData[j].userId);
			$("#updateHouseRentShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
		if(row.housePeople4sell == _userInfoData[j].userId){
			$("#updateHouseSaleGetUserId").val(_userInfoData[j].userId);
			$("#updateHouseSaleShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
		}
	}
}
//执行修改房源
function doUpdateHouse(){
	var row = $('#houseDg').datagrid('getSelected');
	var updateHouseDistrict = $('#updateHouseDistrict').val();
	var updateHouseCommunity = $('#updateHouseCommunity').val();
	var updateHouseBuilding = $('#updateHouseBuilding').val();
	var updateHouseDoorplateno = $('#updateHouseDoorplateno').val();
	var updateHouseRentGetUserId = $('#updateHouseRentGetUserId').val();
	var updateHouseSaleGetUserId = $('#updateHouseSaleGetUserId').val();
	showLoading();
	$.post("../updateHouse.action", {
		houseCoding : row.houseCoding,
		addDistrict : updateHouseDistrict,
		addCommunity : updateHouseCommunity,
		addBuilding : updateHouseBuilding,
		addDoorplateno : updateHouseDoorplateno,
		housePeople4rent : updateHouseRentGetUserId,
		housePeople4sell : updateHouseSaleGetUserId,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, "error");
			return;
		}
		queryHouse(1, 0);
		myTips('修改成功', 'success');
		$('#updateHouseDlg').dialog('close');
	});
}
/**
 *  分页
 *  parameter totalNum 总条数
 *  parameter pageSize 单页总条数
 *  parameter pageDiv 分页的id
 *  parameter pageName 页码的id
 *  parameter fun 查询函数
 *  parameter type 分页刷新类型（1.重新加载数据，2.重新加载数据并选中刷新前选中的数据）
 */
function initPage(totalNum, pageSize, pageDiv, pageName, fun, type){
	var pageNum = Math.ceil(totalNum / pageSize);
	if(type == 1){
		$("#"+pageName).remove();
		$("#"+pageDiv).append("<div class='tcdPageCode' id='"+pageName+"' style='text-align:center;'></div>");
		$("#"+pageName).createPage({
			onePageNums : pageSize,
			totalNum    : totalNum,
			pageCount   : pageNum,
			current     : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					eval(fun+'('+p+')');
				}
			}
		});
	}else if(type == 2){
		
	}
}