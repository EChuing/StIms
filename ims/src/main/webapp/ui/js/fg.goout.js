$(function() {
	queryGoout(1,0);
	$("#gooutDg").datagrid(
			{
				onDblClickRow : function(rowIndex, rowData) {
					var row = $('#gooutDg').datagrid('getSelected');
					if (row) {
						readonlyGooutDlg(row);
					}
				}
			});
	for (var i = 0; i < _bankType.length; i++) {
		$(".add_la_bank_type").append(
				"<option value = '" + i + "'>" + _bankType[i] + "</option>");
	}
	for (var i = 0; i < _itemType.length; i++) {
		$("#additemType").append(
				"<option value = '" + i + "'>" + _itemType[i] + "</option>");
	}
	for (var i in _loginCompanyRentDistrict) {
		$("#searchAddDistrict").append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
	
});

//分页统计总条数
function getgooutPageCount(page){
	var pageSize = 15;
	var goOutUser = $('#searchGoOutUserGetUserId').val();
	$.post("../selectGoToRegister.action",{
		gotoUserId : goOutUser
	}, function(data) {if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"goout",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"goout",0);
		}
	});
}

function queryGoout(page, type) {
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var goOutUser = $('#searchGoOutUserGetUserId').val();
	$.post("../selectGoToRegister.action",{
		startNum : startNum,
		endNum : endNum,
		gotoUserId : goOutUser
	}, function(data) {
		if (data.code<0) {
			//sourcePage(0, 0, 0);
			$('#gooutDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryGoout","goout");
			}else{
				notCountPage(page, 0 ,"queryGoout","goout");
			}
		} else {
			data=data.body;
			for (var i in data) {
				for (var j in data[i]) {
					if (data[i][j] == null) {
						data[i][j] = '';
					}
				}
				if(data[i].gotoAddressType.indexOf("项目")>-1){
					data[i].totalPage = data[i].keyAdministrator;
				}else{
					data[i].totalPage= data[i].addDistrict+" "
					+data[i].addZone+" "
					+data[i].addStreet+" "
					+data[i].addCommunity+" "
					+data[i].addBuilding+data[i].addDoorplateno;
				}
			}
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryGoout","goout");
			}else{
				notCountPage(page, 1 , "queryGoout","goout");
			}
			$("#gooutDg").datagrid("loadData", data);
		}
	}, "json");
}
function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#gooutPage").remove();
		$("#gooutPageDiv")
				.append(
						"<div class='tcdPageCode' id='gooutPage' style='text-align:center;'></div>");
		$("#gooutPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryGoout(p, 1);
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
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseSaveHousePage").remove();
		$("#choseSaveHousePageDiv")
				.append(
						"<div class='tcdPageCode' id='choseSaveHousePage' style='text-align:center;'></div>");
		$("#choseSaveHousePage").createPage({
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
	if (type == 4) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseVirtualPage").remove();
		$("#choseVirtualPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseVirtualPage' style='text-align:center;'></div>");
		$("#choseVirtualPage").createPage({
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
function addGooutDlg() {
	$('#gooutDlg').dialog({
		title : '外出登记',
		top : getTop(220),
		left : getLeft(420),
		width : 420,
		height : 220,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#gooutDlg input').val("");
			$('#gooutDlg select').val("");
			$('#gooutDlg textarea').val("");
		}
	});
	$('#addButton').show();
	$('#updateButton').hide();
	$('#adduserName').val(_loginUserName);
	$('#gooutDlg').dialog('open');
}
function doAddGoout() {
	showLoading();
	var choseHouseId = $("#choseHouseId").val();
	var gotoRentId = '';
	var gotoStoreId = '';
	var gotoHouseId = '';
	
	var gotoAddressType = $("#choseHouseType").val();
	if(gotoAddressType=='已租房'){
		gotoRentId = choseHouseId;
	}else if(gotoAddressType=='未租房'){
		gotoStoreId = choseHouseId;
	}else if(gotoAddressType.indexOf('项目')>-1||gotoAddressType=='盘源'){
		gotoHouseId = choseHouseId;
	}
	var gotoItemType = $("#additemType").find("option:selected").text();
	var gotoNote = $("#addNote").val();
	
	// 添加外出登记
	$.post("../insertGoToRegister.action", {
		gotoRentId 			: gotoRentId,
		gotoStoreId			: gotoStoreId,
		gotoHouseId			: gotoHouseId,
		gotoUserId			: _loginUserId,
		gotoDepartmentId	: _loginDepartment,
		gotoStorefrontId	: _loginStore,
		gotoItemType		: gotoItemType,
		gotoAddressType		: gotoAddressType,
		gotoNote			: gotoNote,
	},function(data){
		if (data.code<0) {
			myTips(data.msg, "error");
			hideLoading();
			return;
		} else {
			myTips("添加成功！", "success");
			hideLoading();
			queryGoout(1,0);
			$('#gooutDlg').dialog('close');
		}
	});
}
//回来签到
function doUpdateGoout() {
	showLoading();
	$.post("../comeBackSignIn.action", {
		
	},function(data){
		if (data.code<0) {
			myTips(data.msg, "error");
			hideLoading();
			return;
		} else {
			myTips("签到成功！", "success");
			hideLoading();
			queryGoout(1,0);
			$('#gooutDlg').dialog('close');
		}
	});
}
function relationDlg() {
	$('#relationDlg').dialog({
		title : '选择外出地点',
		top : getTop(450),
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
function relationDataGrid() {
	var relationType = $('#searchBelongType').find('option:selected').text();
	$("#searchVirtualType").val(0);
	$("#searchVirtualName").val("");
	$("#searchVirtualDoorplateno").val("");
	$("#searchVirtualContact").val("");
	
	if (relationType == '已租列表') {
		$('#choseSource').show();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').hide();
		$('#relationSelect').show();
		$('#virtualRelationSelect').hide();
		if ($('#choseSourceTable').hasClass('datagrid-f')) {

		} else {
			$('#choseSourceTable').datagrid(
				{
					columns : [ [ {
						field : 'hrAddDistrict',
						title : '城区',
						width : 10,
						align : 'center'
					}, {
						field : 'hrAddZone',
						title : '片区',
						width : 10,
						align : 'center'
					}, {
						field : 'hrAddCommunity',
						title : '楼盘名称',
						width : 20,
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
						title : '租客',
						width : 10,
						align : 'center'
					} ] ],
					width : '98%',
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
							$("#choseHouseId").val(row.hrId);
							$("#choseHouseType").val('已租房');
							$("#choseHouse").val(
									row.totalPage + row.hrAddZone
											+ row.hrAddStreet
											+ row.hrAddCommunity
											+ row.hrAddBuilding
											+ row.hrAddDoorplateno);
							$('#relationDlg').dialog('close')
						}
					}
				});
		}
		relationDate(1, 0);
	}
	if (relationType == '未租列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').show();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').hide();
		$('#relationSelect').show();
		$('#virtualRelationSelect').hide();
		if ($('#choseTrusteeshipTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipTable').datagrid(
				{
					columns : [ [  {
						field : 'hsAddDistrict',
						title : '城区',
						width : 10,
						align : 'center'
					}, {
						field : 'hsAddZone',
						title : '片区',
						width : 10,
						align : 'center'
					}, {
						field : 'hsAddCommunity',
						title : '楼盘名称',
						width : 20,
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
						field : 'landlordName',
						title : '业主',
						width : 10,
						align : 'center'
					} ] ],
					width : '98%',
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
							$("#choseHouseId").val(row.hsId);
							$("#choseHouseType").val('未租房');
							$("#choseHouse").val(
									row.hsAddDistrict
											+ row.hsAddZone
											+ row.hsAddStreet
											+ row.hsAddCommunity
											+ row.hsAddBuilding
											+ row.hsAddDoorplateno);
							$('#relationDlg').dialog('close')
						}
					}
				});
		}
		relationDate(1, 0);
	}
	if (relationType == '盘源列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').show();
		$('#choseVirtual').hide();
		$('#relationSelect').show();
		$('#virtualRelationSelect').hide();
		if ($('#choseSaveHouseTable').hasClass('datagrid-f')) {

		} else {
			$('#choseSaveHouseTable').datagrid(
				{
					columns : [ [  {
						field : 'addDistrict',
						title : '城区',
						width : 10,
						align : 'center'
					}, {
						field : 'addZone',
						title : '片区',
						width : 10,
						align : 'center'
					}, {
						field : 'addCommunity',
						title : '楼盘名称',
						width : 20,
						align : 'center'
					}, {
						field : 'addBuilding',
						title : '楼栋',
						width : 10,
						align : 'center'
					}, {
						field : 'addDoorplateno',
						title : '门牌',
						width : 10,
						align : 'center'
					}, {
						field : 'landlordName',
						title : '业主',
						width : 10,
						align : 'center'
					} ] ],
					width : '98%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseSaveHouseTable')
								.datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$("#choseHouseId").val(row.houseCoding);
							$("#choseHouseType").val('盘源');
							$("#choseHouse").val(
									row.addDistrict
											+ row.addZone
											+ row.addStreet
											+ row.addCommunity
											+ row.addBuilding
											+ row.addDoorplateno);
							$('#relationDlg').dialog('close')
						}
					}
				});
		}
		relationDate(1, 0);
	}
	if (relationType == '项目列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').show();
		$('#relationSelect').hide();
		$('#virtualRelationSelect').show();
		if ($('#choseVirtualTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualTable').datagrid(
				{
					columns : [ [ {
						field : 'addCommunity',
						title : '分类',
						width : 10,
						align : 'center'
					}, {
						field : 'keyAdministrator',
						title : '名称',
						width : 10,
						align : 'center'
					}, {
						field : 'addDoorplateno',
						title : '编号',
						width : 10,
						align : 'center'
					}, {
						field : 'keyNumber',
						title : '联系人',
						width : 10,
						align : 'center'
					}, {
						field : 'houseEntrust4rent',
						title : '联系电话',
						width : 10,
						align : 'center'
					} ] ],
					width : '98%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseVirtualTable').datagrid(
								'getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$("#choseHouseId").val(row.houseCoding);
							$("#choseHouse").val(
									"名称："+ row.keyAdministrator + 
									"\n联系人：" + row.keyNumber +  
									"  电话：" + row.houseEntrust4rent
							);
							if(row.innerVirtualRoom == "1"){
								$("#choseHouseType").val('内部项目');
							}else if(row.outerVirtualRoom == "1"){
								$("#choseHouseType").val('外部项目');
							}else if(row.nonCostVirtualRoom == "1"){
								$("#choseHouseType").val('非成本项目');
							}
							$('#relationDlg').dialog('close');
						}
					}
				});
		}
		relationDate(1, 0);
	}
}
function relationDate(page, type) {
	var relation = $('#searchBelongType').val();
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();
	
	//项目
	var virtualType = $("#searchVirtualType").val();
	var searchVirtualName = $("#searchVirtualName").val();
	var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
	var searchVirtualContact = $("#searchVirtualContact").val();
	if (relation == 1) {
		$.post("../queryHouseRentCommon.action", {
			startNum : startNum,
			endNum : endNum,
			hrAddCity : qhAddCity,
			hrAddDistrict : qhAddDistrict,
			hrAddZone : qhAddZone,
			hrAddCommunity : qhAddCommunity,
			hrAddBuilding : qhAddBuilding,
			hrAddDoorplateno : qhAddDoorplateno
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
	if (relation == 2) {
		$.post("../queryHouseStoreCommon.action", {
			startNum : startNum,
			endNum : endNum,
			hsAddCity : qhAddCity,
			hsAddDistrict : qhAddDistrict,
			hsAddZone : qhAddZone,
			hsAddCommunity : qhAddCommunity,
			hsAddBuilding : qhAddBuilding,
			hsAddDoorplateno : qhAddDoorplateno,
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 2);
				var noData = [];
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
				$("#choseTrusteeshipTable").datagrid("loadData", data);
			}
		}, "json");
	}
	if (relation == 3) {
		$.post("../queryHousePaperCommon.action", {
			startNum : startNum,
			endNum : endNum,
			addCity : qhAddCity,
			addDistrict : qhAddDistrict,
			addZone : qhAddZone,
			addCommunity : qhAddCommunity,
			addBuilding : qhAddBuilding,
			addDoorplateno : qhAddDoorplateno,
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 3);
				$('#choseVirtualTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data = data.body;
				if (page == 1 && type == 0) {
					sourcePage(data[0].totalNum, page, 3);
				}
				$("#choseSaveHouseTable").datagrid("loadData", data);
			}
		}, "json");
	}
	if (relation == 4) {
		$.post("../queryVirtualFinancial.action", {
			startNum : startNum,
			endNum : endNum,
			virtualType : virtualType,
			keyAdministrator : searchVirtualName,
			addDoorplateno : searchVirtualDoorplateno,
			keyNumber : searchVirtualContact,
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 4);
				$('#choseVirtualTable').datagrid({
					data : noData,
					view : [],
					emptyMsg : data.msg
				});
			} else {
				if (page == 1 && type == 0) {
					sourcePage(data.body[0].totalNum, page, 4);
				}
				$("#choseVirtualTable").datagrid("loadData", data.body);
			}
		}, "json");
	}
}



/*function queryAddDistrict(){
	$("#searchAddZone").empty();
	$("#searchAddZone").append("<option></option>");
	var cityText = $("#searchAddCity").find("option:selected").text();
	var districtText = $("#searchAddDistrict").find("option:selected").text();
	if (districtText == ''){
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
}*/
function readonlyGooutDlg(row){
	$('#readonlyGooutDlg').dialog({
		title : '外出信息',
		top : $(window).height()*0.1,
		left : getLeft(500),
		width : 500,
		height : 240,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#readonlyGooutDlg span').text('');
		}
	});
	$('#readonlyAddress').text(row.totalPage);
	$('#readonlyAddressType').text(row.gotoAddressType);
	$('#readonlyItemType').text(row.gotoItemType);
	$('#readonlyName').text(row.storefrontName+" "+row.departmentName+" "+row.username);
	$('#readonlyOutTime').text(row.gotoOutOfTime);
	if(row.gotoComeBackTime==''||row.gotoComeBackTime==null){
		$('#readonlyInTime').text('外出中');
		$('#readonlyInTime').css({color:"red"});
	}else{
		$('#readonlyInTime').text(row.gotoComeBackTime);
		$('#readonlyInTime').css({color:"#666666"});
	}
	$('#readonlyNote').text(row.gotoNote);
	$('#readonlyGooutDlg').dialog('open');
}
function formatGotoComeBackTime(value, row, index) {
	if (row.gotoComeBackTime == '' ) {
		return "<a style='text-decoration:none;color:red;'>外出中<a>";
	} else{
		return row.gotoComeBackTime ;
	}
}
function formatSuWhetherGoOut(value, row, index){
	if (row.suWhetherGoOut == '是' ) {
		return "<a style='text-decoration:none;color:red;'>外出中<a>";
	} else{
		return "<a style='text-decoration:none;color:blue;'>未外出<a>";
	}
}