$(function() {
	queryAssistance(1,0);
	$('#assistanceDg').datagrid({
		onDblClickRow : function(rowIndex, rowData){
			updateAssistance();
		}
	});
	$.post("../queryDepartment.action", {
		departmentStorefrontId : _loginStore,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for (var i in data.body) {
			$(".addSlUserId").append(
					"<option value = '" + data.body[i].departmentId + "'>" + data.body[i].departmentName + "</option>");
			_depadepartment[i] = data.body[i].departmentId;
		}
	}, "json");
});

//分页统计总条数
function getassistancePageCount(page){
	var pageSize = 20;
	var assistType = $("#searchAssistType").find("option:selected").text();
	var addCommunity = $("#searchAddCommunity").val();
	var addBuilding = $("#searchAddBuilding").val();
	var addDoorplateno = $("#searchAddDoorplateno").val();
	var assistUserId = $("#searchAssistUserName").val();
	// 导入协助表数据
	$.post("../queryAssistor.action", {
		assistType:assistType,
		addCommunity:addCommunity,
		addBuilding:addBuilding,
		addDoorplateno:addDoorplateno,
		assistUserId:assistUserId,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"assistance",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"assistance",0);
		}
	});
}

//查询交易协助表
function queryAssistance(page,type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var assistType = $("#searchAssistType").find("option:selected").text();
	var addCommunity = $("#searchAddCommunity").val();
	var addBuilding = $("#searchAddBuilding").val();
	var addDoorplateno = $("#searchAddDoorplateno").val();
	var assistUserId = $("#searchAssistUserName").val();
	// 导入协助表数据
	$.post("../queryAssistor.action", {
		startNum : startNum,
		endNum : endNum,
		assistType:assistType,
		addCommunity:addCommunity,
		addBuilding:addBuilding,
		addDoorplateno:addDoorplateno,	
		assistUserId:assistUserId,
	}, function(data) {
		if (data.code<0) {
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryAssistance","assistance");
			}else{
				notCountPage(page, 0 ,"queryAssistance","assistance");
			}
			$('#assistanceDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryAssistance","assistance");
			}else{
				notCountPage(page, 1 , "queryAssistance","assistance");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].addCommunity = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}
			$("#assistanceDg").datagrid("loadData", data);
		}
	}, "json");
}
//分页
function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#assistancePage").remove();
		$("#assistancePageDiv")
				.append(
						"<div class='tcdPageCode' id='assistancePage' style='text-align:center;'></div>");
		$("#assistancePage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAssistance(p, 1);
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
}
function clear(){
	$(".addAssistType").val("");
	$(".addAssistAddress").val("");
	$("#rentId").val("");
	$("#storeId").val("");
	$("#addAssistanceDept").val("");
	$("#addAssistanceStaff").val("");
	$(".addAssistBonus").val("");
	$('#searchBelongType').val("");
	$('.errorMsg').html("");
}
//添加业绩受益人
function addAssistance(){
	$("#addAssistanceDlg").dialog({
		title : "添加业绩受益人",
		top : getTop(430),
		left : getLeft(650),
		width : 650,
		height : 430,
		closed : true,
		cache : false,
		modal : true,
		onClose:function(){
			$('#addAssistanceDlg [clear="clear"]').val('');
			$('#addAssistanceDlg [clean="clean"]').html('');
			$('#addAssistanceDlg [require]').css('border', '1px solid #a9a9a9');
		}
	});
	clear();
	$(".add_installment_userName").val(_loginUserName);
	$(".add_installment_userId").val(_loginUserId);
	$(".addAssistType").attr("disabled",false);
	$(".choseHouse").show();
	$("#addBtn").show();
	$("#updateBtn").hide();
	$("#addAssistanceDlg").dialog('open');
	if ($('#addAssistanceTable').hasClass('datagrid-f')) {
		
	} else {
		
		$('#addAssistanceTable')
				.datagrid(
						{
							columns : [ [					
									{
										field : 'assistAddress',
										title : '地址',
										width : 40,
										align : 'center',
									},
									{
										field : 'assistPeople',
										title : '业绩受益人',
										width : 20,
										align : 'center',
									},
									{
										field : 'assistType',
										title : '类型',
										width : 20,
										align : 'center',
									},
									{
										field : 'assistBonus',
										title : '比例',
										width : 20,
										align : 'center',
										editor : 'textbox'
									},
									{
										field : 'deleteAdd',
										title : '删除',
										width : 10,
										align : 'center',
										formatter : 
											function(value, row, index) {
												return "<a href='#' onclick=\"$('#addAssistanceTable').datagrid('deleteRow',"
														+ index + ")\">删除</a>";
											}
									} ] ],
							width : '100%',
							height : '100%',
							singleSelect : true,
							autoRowHeight : false,
							scrollbarSize : 0,
							showPageList : false,
							fitColumns : true,
//							onClickCell : onClickCell,//单击触发编辑
//							enableCellEdit : true,// 表示是否开启单元格编辑功能
//							rowStyler : function(index, row) {
//								return 'color:#000;';
//							},
						});
	}
}
///单元格单击编辑
var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#addAssistanceTable').datagrid('validateRow', editIndex)) {
		$('#addAssistanceTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field) {
	if (endEditing()) {
		$('#addAssistanceTable').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex = index;
	}
	relationDate(1, 0);
}
//条件查找联动
function queryAddCity() {
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
}
function queryAddDistrict() {
	$("#searchAddZone").empty();
	$("#searchAddZone").append("<option></option>");
	var cityText = $("#searchAddCity").find("option:selected").text();
	var districtText = $("#searchAddDistrict").find("option:selected").text();
	if (districtText == '') {
		relationDate(1, 0);
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
		for (var i in data) {
			$("#searchAddZone").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
		relationDate(1, 0);
	});
}
// 城市联动
function cityLink() {
	$.post("../queryForHouseDictAddress.action", function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		_city = data;
		$("#searchAddCity").append("<option></option>");
		for (var i in data) {
			$("#searchAddCity").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
	});
}
//查询关联
function relationDate(page, type) {
	var relation = $('#searchBelongType').val();
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhCommunity = $("#searchCommunity").val();
	var qhBuilding = $("#searchBuilding").val();
	var qhDoorplateno = $("#searchDoorplateno").val();
	if (relation == "已租列表") {
		$.post("../queryNoAssistRent.action", {
			startNum : startNum,
			endNum : endNum,
			hrAddCity : qhAddCity,
			hrAddDistrict : qhAddDistrict,
			hrAddZone : qhAddZone,
			hrAddCommunity : qhCommunity,
			hrAddBuilding : qhBuilding,
			hrAddDoorplateno : qhDoorplateno
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 1);
				$('#choseSourceTable').datagrid({
					data :  [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1 && type == 0) {
					sourcePage(data[0].totalNum, page, 1);
				}
				// 已租列表
				$("#choseSourceTable").datagrid("loadData", data);
			}
		}, "json");
	}
	if (relation == "未租列表") {
		$.post("../queryNoAssistStore.action", {
			startNum : startNum,
			endNum : endNum,
			hsAddCity : qhAddCity,
			hsAddDistrict : qhAddDistrict,
			hsAddZone : qhAddZone,
			hsAddCommunity : qhCommunity,
			hsAddBuilding : qhBuilding,
			hsAddDoorplateno : qhDoorplateno
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 2);
				$('#choseTrusteeshipTable').datagrid({
					data : noData,
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1 && type == 0) {
					sourcePage(data[0].totalNum, page, 2);
				}
				// 未租列表
				$("#choseTrusteeshipTable").datagrid("loadData", data);
			}
		}, "json");
	}
}
//协助关联列表对话框
function relationDlg() {
	$('#relationDlg').dialog({
		title : '协助关联',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			// $('#searchBelongType').val(1);
			// relationDataGrid();
		}
	});
	relationDataGrid();
}
//协助关联选择列表
function relationDataGrid() {
	var relationType = $('#searchBelongType').val();
	$('#relationSelect select').empty();
	$('#searchCommunity').val("");
	$('#searchDoorplateno').val("");
	cityLink();
	if (relationType == '已租列表') {
		$('#relationDlg').dialog('open');
		$('#choseSaveHouse').hide();
		$('#choseTrusteeship').hide();
		$('#choseSource').show();
		$('#choseSourceTable').datagrid(
				{
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
					} ] ],
					width : '100%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseSourceTable').datagrid(
								'getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$("#rentId").val(row.hrId);
							$("#storeId").val(row.hrHouse4storeId);
							$(".addAssistAddress").val(
									row.hrAddCommunity
									+ row.hrAddBuilding
									+ row.hrAddDoorplateno);
							$('#relationDlg').dialog('close');
						}
					}
				});
		relationDate(1, 0);
	}
	if (relationType == '未租列表') {
		$('#relationDlg').dialog('open');
		$('#choseSource').hide();
		$('#choseSaveHouse').hide();
		$('#choseTrusteeship').show();
		$('#choseTrusteeshipTable')
				.datagrid(
						{
							columns : [ [ {
								field : 'hsAddDistrict',
								title : '城区',
								width : 20,
								align : 'center'
							}, {
								field : 'hsAddZone',
								title : '片区',
								width : 20,
								align : 'center'
							}, {
								field : 'hsAddCommunity',
								title : '楼盘名称',
								width : 30,
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
							} ] ],
							width : '100%',
							height : '84%',
							singleSelect : true,
							autoRowHeight : false,
							pageSize : 10,
							scrollbarSize : 0,
							showPageList : false,
							fitColumns : true,
							onDblClickRow : function(rowIndex, rowData) {
								var row = $('#choseTrusteeshipTable')
										.datagrid('getSelected');
								if (row) {
									for (var i in row) {
										if (row[i] == null) {
											row[i] = '';
										}
									}
									$("#rentId").val("");
									$("#storeId").val(row.hsId);
									$(".addAssistAddress").val(
											row.hsAddCommunity
											+ row.hsAddBuilding
											+ row.hsAddDoorplateno);
									$('#relationDlg').dialog('close');
								}
							}
						});
		relationDate(1, 0);
	}
	if (relationType == '') {
		$('#choseSource').hide();
		$('#choseSaveHouse').hide();
		$('#choseTrusteeship').hide();
		$.messager.alert('操作提示', '请选择协助类型');
	}
}
//添加一条
function addToDataGrid() {
	//业绩受益人姓名
	var assistPeople = $('#addAssistanceStaffShowUserInfo').val().split(' ')[$('#addAssistanceStaffShowUserInfo').val().split(' ').length-1];
	//var assistPeople = $('#addAssistanceStaff').find('option:selected').text();
	//业绩受益人ID
	var assistUserId = $('#addAssistanceStaff').val();
	//已租ID
	var assistHouse4rent = $('#rentId').val();
	//未租ID
	var assistHouse4store = $('#storeId').val();
	//详细地址
	var assistAddress = $('.addAssistAddress').val();
	//类型
	var assistType = $('.addAssistType').find('option:selected').text();
	//比例
	var assistBonus = $('.addAssistBonus').val();
	//console.log(assistHouse4rent+"---"+assistHouse4store);

	var dataJson = {
		assistPeople : assistPeople,
		assistUserId : assistUserId,
		assistHouse4rent : assistHouse4rent,
		assistHouse4store : assistHouse4store,
		assistAddress : assistAddress,
		assistType : assistType,
		assistBonus : assistBonus
	};
	var rows = $("#addAssistanceTable").datagrid("getRows");
	if(percentValidate(rows,assistBonus,assistType,assistHouse4rent,assistHouse4store,assistUserId)){
		$('#addAssistanceTable').datagrid('insertRow', {
			index : 0,
			row : dataJson
		});
	}
}
//验证比例是否合法
function percentValidate(rows,assistBonus,assistType,assistHouse4rent,assistHouse4store,assistUserId){
	var a = 0;
	if(assistBonus <= 0 || assistBonus > 100){
		$(".errorMsg").html("比例错误");
		return false;
	}
	if(rows.length > 0){
		for(var i in rows){
			if(assistType=="存房"){
				if(rows[i].assistHouse4store==assistHouse4store){
					a += rows[i].assistBonus*1;
					if(rows[i].assistUserId == assistUserId){
						$(".errorMsg").html("业绩受益人重复");
						return false;
					}
				}
			}else{
				if(rows[i].assistHouse4rent==assistHouse4rent){
					a += rows[i].assistBonus*1;
					if(rows[i].assistUserId == assistUserId){
						$(".errorMsg").html("业绩受益人重复");
						return false;
					}
				}
			}
		}
		if(a+assistBonus*1>100){
			$(".errorMsg").html("比例错误");
			return false;
		}
	}
	$(".errorMsg").html("");
	return true;
}

function changeAssistType(){
	var assistType = $(".addAssistType").find('option:selected').text();
	if(assistType == "存房"){
		$('#searchBelongType').val("未租列表");
	}else if(assistType == "出房"){
		$('#searchBelongType').val("已租列表");
	}else{
		$('#searchBelongType').val("");
	}
	$(".addAssistAddress").val("");
	$("#rentId").val("");
	$("#storeId").val("");
}
//保存时再次验证
/*
存房、未租房id、业绩受益人id  比例求和
出房、已租房id、业绩受益人id  比例求和

1.定义一个数组存各个房的比例和
1-1 获取全部未租房id，已租房id，存入storeIds[n1] rentIds[n2]
1-2 创建数组bonus[num]
1-3 遍历bonus[num]
	到idArray[num]获取对应的房id
	遍历rows匹配id 累加比例存入bonus
2.判断该数组中是否每个数都是100
*/
function percentValidateAgain(){
	var rows = $("#addAssistanceTable").datagrid("getRows");
	if (rows.length == 0) {
		$(".errorMsg").html("没有可用于添加的数据");
		return false;
	}
	for(var i in rows){
		if(rows[i].assistBonus <= 0 || rows[i].assistBonus > 100){
			$(".errorMsg").html("比例错误");
			return false;
		}
	}
	var storeIds = [];
	var rentIds = [];
	for(var i in rows){
		if(rows[i].assistType == "存房" && storeIds.indexOf(rows[i].assistHouse4store) == -1){
			storeIds.push(rows[i].assistHouse4store);
		}else if(rows[i].assistType == "出房" && rentIds.indexOf(rows[i].assistHouse4rent) == -1){
			rentIds.push(rows[i].assistHouse4rent);
		}
	}
	var storeBonus = new Array(storeIds.length);
	var rentBonus = new Array(rentIds.length);
	for(var i=0;i<storeBonus.length;i++){
		storeBonus[i] = 0;
		for(var j in rows){
			if(rows[j].assistType == "存房" && rows[j].assistHouse4store == storeIds[i]){
				storeBonus[i] += rows[j].assistBonus*1;
			}
		}
	}
	for(var i=0;i<rentBonus.length;i++){
		rentBonus[i] = 0;
		for(var j in rows){
			if(rows[j].assistType == "出房" && rows[j].assistHouse4rent == rentIds[i]){
				rentBonus[i] += rows[j].assistBonus*1;
			}
		}
	}
	for(var i in storeBonus){
		if(storeBonus[i] != 100){
			$(".errorMsg").html("比例错误");
			return false;
		}
	}
	for(var i in rentBonus){
		if(rentBonus[i] != 100){
			$(".errorMsg").html("比例错误");
			return false;
		}
	}
	return true;
}
function doAddAssistance(){
	if(!percentValidateAgain()){
		return;
	}
	var rows = $("#addAssistanceTable").datagrid("getRows");
	var assistRegisterPeople = '"assistRegisterPeople":"'+ _loginUserId + '"';
	var assistStorefront= '"assistStorefront":"' + _loginStore + '"';
	var assistDepartment = '"assistDepartment":"' + _loginDepartment + '"';
	var strArray = assistRegisterPeople + "," + assistStorefront + "," + assistDepartment;
	var jsonStrArry = '';
	for(var i in rows){
		var assistType = '"assistType":"' + rows[i].assistType + '"';
		var assistHouse4store = '';
		var assistHouse4rent = '';
		if(rows[i].assistHouse4store != null){
			assistHouse4store = '"assistHouse4store":"' + rows[i].assistHouse4store + '"';
		}else{
			assistHouse4store = '"assistHouse4store":""';
		}
		if(rows[i].assistHouse4rent != null){
			assistHouse4rent = '"assistHouse4rent":"' + rows[i].assistHouse4rent + '"';
		}else{
			assistHouse4rent = '"assistHouse4rent":""';
		}
		var assistUserId = '"assistUserId":"' + rows[i].assistUserId + '"';
		var assistBonus = '"assistBonus":"'+rows[i].assistBonus+ '"';
		if(i==0){
			jsonStrArry += "{" + strArray + "," + assistType + "," + assistHouse4store + "," + assistHouse4rent + "," + assistUserId + "," + assistBonus + "}";
		}else{
			jsonStrArry += ",{" + strArray + "," + assistType + "," + assistHouse4store + "," + assistHouse4rent + "," + assistUserId + "," + assistBonus + "}";
		}
	}
	jsonStrArry =  "[" + jsonStrArry + "]";
	
	$.post("../insertTAList.action",{
		jsonArray : jsonStrArry
	},
	function(data) {
		if (data < 0||data=='') {
			myTips('添加失败！', 'error');
			return;
		} else {
			$("#addAssistanceTable").datagrid("loadData", []);
			$('#addAssistanceDlg').dialog('close');
			myTips('添加成功！', 'success');
			queryAssistance(1, 0);
		}
	});
}

function updateAssistance(){
	var row = $("#assistanceDg").datagrid("getSelected");
	if(row == null){
		myTips('请选中需要修改的行！', 'error');
		return;
	}
	$("#addAssistanceDlg").dialog({
		title : "修改业绩受益人",
		top : getTop(430),
		left : getLeft(650),
		width : 650,
		height : 430,
		closed : true,
		cache : false,
		modal : true,
		onClose:function(){
			$('#addAssistanceDlg [clear="clear"]').val('');
			$('#addAssistanceDlg [clean="clean"]').html('');
			$('#addAssistanceDlg [require]').css('border', '1px solid #a9a9a9');
		}
	});
	clear();
	$(".add_installment_userName").val(_loginUserName);
	$(".add_installment_userId").val(_loginUserId);
	$(".addAssistType").attr("disabled",true);
	$(".choseHouse").hide();
	$("#addBtn").hide();
	$("#updateBtn").show();
	$(".addAssistType").val(row.assistType);
	$(".addAssistAddress").val(row.addCommunity);
	$("#storeId").val(row.assistHouse4store);
	$("#rentId").val(row.assistHouse4rent);
	$("#addAssistanceDlg").dialog('open');
	if ($('#addAssistanceTable').hasClass('datagrid-f')) {
		
	} else {
		
		$('#addAssistanceTable')
				.datagrid(
						{
							columns : [ [					
									{
										field : 'assistAddress',
										title : '地址',
										width : 40,
										align : 'center',
									},
									{
										field : 'assistPeople',
										title : '业绩受益人',
										width : 20,
										align : 'center',
									},
									{
										field : 'assistType',
										title : '类型',
										width : 20,
										align : 'center',
									},
									{
										field : 'assistBonus',
										title : '比例',
										width : 20,
										align : 'center',
										editor : 'textbox'
									},
									{
										field : 'deleteAdd',
										title : '删除',
										width : 10,
										align : 'center',
										formatter : 
											function(value, row, index) {
												return "<a href='#' onclick=\"$('#addAssistanceTable').datagrid('deleteRow',"
														+ index + ")\">删除</a>";
											}
									} ] ],
							width : '100%',
							height : '100%',
							singleSelect : true,
							autoRowHeight : false,
							scrollbarSize : 0,
							showPageList : false,
							fitColumns : true,
//							onClickCell : onClickCell,//单击触发编辑
//							enableCellEdit : true,// 表示是否开启单元格编辑功能
//							rowStyler : function(index, row) {
//								return 'color:#000;';
//							},
						});
	}
}
function doUpdateAssistance(){
	if(!percentValidateAgain()){
		return;
	}
	var rows = $("#addAssistanceTable").datagrid("getRows");
	var assistRegisterPeople = '"assistRegisterPeople":"'+ _loginUserId + '"';
	var assistStorefront= '"assistStorefront":"' + _loginStore + '"';
	var assistDepartment = '"assistDepartment":"' + _loginDepartment + '"';
	var strArray = assistRegisterPeople + "," + assistStorefront + "," + assistDepartment;
	var jsonStrArry = '';
	for(var i in rows){
		var assistType = '"assistType":"' + rows[i].assistType + '"';
		var assistHouse4store = '';
		var assistHouse4rent = '';
		if(rows[i].assistHouse4store != null){
			assistHouse4store = '"assistHouse4store":"' + rows[i].assistHouse4store + '"';
		}else{
			assistHouse4store = '"assistHouse4store":""';
		}
		if(rows[i].assistHouse4rent != null){
			assistHouse4rent = '"assistHouse4rent":"' + rows[i].assistHouse4rent + '"';
		}else{
			assistHouse4rent = '"assistHouse4rent":""';
		}
		var assistUserId = '"assistUserId":"' + rows[i].assistUserId + '"';
		var assistBonus = '"assistBonus":"'+rows[i].assistBonus+ '"';
		if(i==0){
			jsonStrArry += "{" + strArray + "," + assistType + "," + assistHouse4store + "," + assistHouse4rent + "," + assistUserId + "," + assistBonus + "}";
		}else{
			jsonStrArry += ",{" + strArray + "," + assistType + "," + assistHouse4store + "," + assistHouse4rent + "," + assistUserId + "," + assistBonus + "}";
		}
	}
	jsonStrArry =  "[" + jsonStrArry + "]";
	
	$.post("../updateAssist.action",{
		jsonArray : jsonStrArry
	},
	function(data) {
		if (data < 0||data=='') {
			myTips('修改失败！', 'error');
			return;
		} else {
			$("#addAssistanceTable").datagrid("loadData", []);
			$('#addAssistanceDlg').dialog('close');
			myTips('修改成功！', 'success');
			queryAssistance(1, 0);
		}
	});
}