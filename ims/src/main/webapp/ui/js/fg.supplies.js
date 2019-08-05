$(function(){
	loadSelectList();
	querySupplies(1);
	$('#suppliesDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			_indexNum[0] = rowIndex;
			queryFollow();
		},
		onDblClickRow : function(rowIndex, rowData) {
			$("#suppliesInfo_index").val(rowIndex);
			$('#suppliesInfoTabs').tabs({
				plain : true,
				fit : true,
				border	: false,
				onSelect : function(title, index) {
					// 获得点击选项卡的列数，调用表格初始化
					initTable(index);
				}
			});
			$("#suppliesInfoTabs").tabs("select", 0);
			openSuppliesInfo();
		}
	});
});
/**
 * 查询耗材
 */
function querySupplies(page) {
	var onePageNums = 15;
	var startNum = (parseInt(page) - 1) * onePageNums;
	var searchVirtualType = $('#searchVirtualType').val();
	var searchVirtualName = $('#searchVirtualName').val();
	var supType = $('#searchSupType').val();
	var supName = $('#searchSupName').val();
	var supBrand = $('#searchSupBrand').val();
	var supModel = $('#searchSupModel').val();
	$.post("../querySupplies.action", {
		startNum			: startNum,
		endNum 				: onePageNums,
		virtualType			: searchVirtualType,
		keyAdministrator	: searchVirtualName,
		supType				: supType,
		supName				: supName,
		supBrand			: supBrand,
		supModel			: supModel,
	}, function(data) {
		if (data.code < 0) {
			initPage(0, onePageNums, 0);
			$('#suppliesDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1) {
				initPage(data.body[0].totalNum, onePageNums, 0);
			}
			for (var i in data.body) {
				data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
			}
			$("#suppliesDg").datagrid("loadData", data.body);
			$('#suppliesDg').datagrid("selectRow", _indexNum[0]);
			queryFollow();
		}
	});
}
/**
 * 分页初始化
 */
function initPage(totalNum, onePageNums, type) {
	var pageCount = Math.ceil(totalNum / onePageNums);
	if (type == 0) {
		$("#suppliesPage").remove();
		$("#suppliesPageDiv").append("<div class='tcdPageCode' id='suppliesPage' style='text-align:center;'></div>");
		$("#suppliesPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					_pageNum[0] = p;
					_indexNum[0] = 0;
					querySupplies(p);
				}
			}
		});
	}
	if (type == 1) {
		$("#choseTrusteeshipPage").remove();
		$("#choseTrusteeshipPageDiv").append("<div class='tcdPageCode' id='choseTrusteeshipPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseHouseData(p);
				}
			}
		});
	}
	if (type == 2) {
		$("#choseVirtualHousePage").remove();
		$("#choseVirtualHousePageDiv").append("<div class='tcdPageCode' id='choseVirtualHousePage' style='text-align:center;'></div>");
		$("#choseVirtualHousePage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseHouseData(p);
				}
			}
		});
	}
	if (type == 3) {
		$("#choseProjectPage").remove();
		$("#choseProjectPageDiv").append("<div class='tcdPageCode' id='choseProjectPage' style='text-align:center;'></div>");
		$("#choseProjectPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseProjectData(p);
				}
			}
		});
	}
}
/**
 * 加载下拉列表
 */
function loadSelectList() {
	for (var i in _supType) {
		$('#searchSupType').append('<option value="' + _supType[i] + '">' + _supType[i] + '</option>');
		$('#add_supplies_type').append('<option value="' + _supType[i] + '">' + _supType[i] + '</option>');
		$('#update_supplies_type').append('<option value="' + _supType[i] + '">' + _supType[i] + '</option>');
	}
}
/**
 * 添加耗材
 */
function addSupplies() {
	$('#addSuppliesDlg').dialog({
		title : '添加耗材',
		top : getTop(310),
		left : getLeft(650),
		width : 650,
		height : 310,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addSuppliesDlg [clear="clear"]').val('');
			$('#addSuppliesDlg [choose="choose"]').val('');
		}
	});
	$('#addSuppliesDlg').dialog('open');
}
/**
 * 执行添加耗材
 */
function doAddSupplies() {
	var supUserId =  _loginUserId;
	var supDepartment = _loginDepartment;
	var supStorefront = _loginStore;
	var supHouseId = $('#supplies_houseCoding').val();
	var supType = $('#add_supplies_type').val();
	var supName = $('#add_supplies_name').val();
	var supBrand = $('#add_supplies_brand').val();
	var supModel = $('#add_supplies_model').val();
	var supPrice = $('#add_supplies_price').val();
	var supNum = $('#add_supplies_number').val();
	var supRemark = $('#add_supplies_remark').val();
	
	var checkFlag = 0;
	$('#addSuppliesDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}

	showLoading();
	$.post('../insertSupplies.action', {
		supUserId: supUserId,
		supDepartment: supDepartment,
		supStorefront: supStorefront,
		supHouseId: supHouseId,
		supType: supType,
		supName: supName,
		supBrand: supBrand,
		supModel: supModel,
		supPrice: supPrice,
		supNum: supNum,
		supRemark: supRemark,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '添加失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#addSuppliesDlg').dialog('close');
			myTips('添加成功！', 'success');
			querySupplies(1);
		}
	});	
}
/**
 * 选择项目
 */
function choseProject(type) {
	$('#choseProjectDlg').dialog({
		title : '选择项目',
		top : getTop(550),
		left : getLeft(750),
		width : 750,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	relationProjectGrid(type);
	$('#choseProjectDlg').dialog('open');
}
/**
 * 选择项目-显示列表
 */
function relationProjectGrid(type) {
	if ($('#choseProjectTable').hasClass('datagrid-f')) {

	}else{
		$('#choseProjectTable').datagrid({
			columns : [ [{
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
				title : '备注描述',
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
			width : '100%',
			height : '84%',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#choseProjectTable').datagrid('getSelected');
				if (row) {
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					if (type == 0) {
						$('#supplies_choseHouse').val(row.keyAdministrator);
						$('#supplies_houseCoding').val(row.houseCoding);
					} else if (type == 1) {
						$('#move_to_supplies_choseHouse').val(row.keyAdministrator);
						$('#move_to_supplies_houseCoding').val(row.houseCoding);
					}
					$('#choseProjectDlg').dialog('close');
				}
			}
		});
	}
	choseProjectData(1);
}
/**
 * 选择项目-显示列表-查数据
 */
function choseProjectData(page) {
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var virtualType = $("#searchProjectType").val();
	var searchProjectName = $("#searchProjectName").val();
	var searchProjectContact = $("#searchProjectContact").val();
	$.post("../virtualProperty.action", {
		startNum : startNum,
		endNum : onePageNums,
		virtualType : virtualType,
		keyAdministrator : searchProjectName,
		keyNumber : searchProjectContact,
	}, function(data) {
		if (data.code<0) {
			initPage(0, onePageNums, 3);
			$('#choseProjectTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1) {
				initPage(data.body[0].totalNum, onePageNums, 3);
			}
			$("#choseProjectTable").datagrid("loadData", data.body);
		}
	});
}
/**
 * 查询耗材的跟进记录
 */
function queryFollow() {
	if ($('#followTable').hasClass('datagrid-f')) {

	} else {
		$('#followTable').datagrid({
			columns : [ [ {
				field : 'time',
				title : '跟进时间',
				width : '20%',
				align : 'center'
			}, {
				field : 'name',
				title : '跟进人',
				width : '10%',
				align : 'center'
			}, /*{
				field : 'type',
				title : '跟进类型',
				width : '10%',
				align : 'center'
			},*/ {
				field : 'text',
				title : '跟进内容',
				width : '70%',
				align : 'center'
			} ] ],
			width : '100%',
			height : '277px',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#followTable').datagrid('getSelected');
				downFollowInfo(row);
			}
		});
	}
	var row = $('#suppliesDg').datagrid('getSelected');
	var data = [];
	if (row.supFollowUp != null && row.supFollowUp != '') {
		var str = row.supFollowUp.getRealJsonStr();
		data = JSON.parse(str);
	}
	$('#followTable').datagrid('loadData', data.reverse());
}
/**
 * 列表下方跟进的详细界面
 */
function downFollowInfo(row){
	$('#downFollowInfo').dialog({
		title : '跟进详细信息',
		top : getTop(200),
		left : getLeft(450),
		width : 450,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#downFollowInfo span').text('');
		},
	});
	for(var i in row){
		$('#readDownFollow'+i).html(row[i]);
	}
	$('#downFollowInfo').dialog('open');
}
/**
 * 修改耗材
 */
function updateSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	} 
	$('#updateSuppliesDlg').dialog({
		title : '修改耗材',
		top : getTop(280),
		left : getLeft(650),
		width : 650,
		height : 280,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateSuppliesDlg [clear="clear"]').val('');
			$('#updateSuppliesDlg [choose="choose"]').val('');
		}
	});
	$('#update_supplies_choseHouse').val(row.keyAdministrator);
	$('#update_supplies_type').val(row.supType);
	$('#update_supplies_name').val(row.supName);
	$('#update_supplies_brand').val(row.supBrand);
	$('#update_supplies_model').val(row.supModel);
	$('#update_supplies_price').val(row.supPrice);
//	$('#update_supplies_number').val(row.supNum);
	$('#update_supplies_remark').val(row.supRemark);
	$('#updateSuppliesDlg').dialog('open');
}
/**
 * 执行修改耗材
 */
function doUpdateSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var supType = $('#update_supplies_type').val();
	var supName = $('#update_supplies_name').val();
	var supBrand = $('#update_supplies_brand').val();
	var supModel = $('#update_supplies_model').val();
	var supPrice = $('#update_supplies_price').val();
//	var supNum = $('#update_supplies_number').val();
	var supRemark = $('#update_supplies_remark').val();
	
	var checkFlag = 0;
	$('#updateSuppliesDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}

	showLoading();
	$.post('../updateSupplies.action', {
		userName: _loginUserName,
		supId: row.supId,
		supType: supType,
		supName: supName,
		supBrand: supBrand,
		supModel: supModel,
		supPrice: supPrice,
//		supNum: supNum,
		supRemark: supRemark,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#updateSuppliesDlg').dialog('close');
			myTips('修改成功！', 'success');
			querySupplies(1);
		}
	});	
}
/**
 * 迁移耗材
 */
function moveSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#move_from_supplies_choseHouse').val(row.keyAdministrator);
	$('#moveSuppliesDlg').dialog({
		title : '迁移耗材',
		top : getTop(180),
		left : getLeft(510),
		width : 510,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveSuppliesDlg [clear="clear"]').val('');
		}
	});
	$('#moveSuppliesDlg').dialog('open');
}
/**
 * 执行迁移耗材
 */
function doMoveSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var supHouseId = $('#move_to_supplies_houseCoding').val();
	var supMoveFrom = $('#move_from_supplies_choseHouse').val();
	var supMoveTo = $('#move_to_supplies_choseHouse').val();
	var supNum = $('#move_supplies_number').val();
	
	var checkFlag = 0;
	$('#moveSuppliesDlg [must="must"]').each(function(){
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
	if (supHouseId == row.supHouseId) {
		myTips('该耗材无须迁移','error');
		return;
	}
	if (supNum > row.supNum || supNum <= 0) {
		myTips('数量填写错误','error');
		return;
	}

	showLoading();
	$.post('../moveSupplies.action', {
		userName: _loginUserName,
		supUserId: _loginUserId,
		supDepartment: _loginDepartment,
		supStorefront: _loginStore,
		supId: row.supId,
		supHouseId: supHouseId,
		supMoveFrom: supMoveFrom,
		supMoveTo: supMoveTo,
		supNum: supNum,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#moveSuppliesDlg').dialog('close');
			myTips('迁移成功！', 'success');
			querySupplies(1);
		}
	});
}
/**
 * 使用耗材
 */
function useSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#useSuppliesDlg').dialog({
		title : '使用耗材',
		top : getTop(225),
		left : getLeft(510),
		width : 510,
		height : 225,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#useSuppliesDlg [clear="clear"]').val('');
		}
	});
	$('#useSuppliesDlg').dialog('open');
}
/**
 * 执行使用耗材
 */
function doUseSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var useAddress = $('#use_supplies_choseHouse').val();
	var supNum = $('#use_supplies_number').val();
	var useReason = $('#use_supplies_reason').val();
	
	var checkFlag = 0;
	$('#useSuppliesDlg [must="must"]').each(function(){
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
	if (supNum > row.supNum || supNum <= 0) {
		myTips('数量填写错误','error');
		return;
	}

	showLoading();
	$.post('../useSupplies.action', {
		userName: _loginUserName,
		supId: row.supId,
		useAddress: useAddress,
		supNum: supNum,
		useReason: useReason,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '使用失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#useSuppliesDlg').dialog('close');
			myTips('使用成功！', 'success');
			querySupplies(1);
		}
	});
}
/**
 * 增减耗材数量
 */
function purchaseSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	} 
	$('#purchaseSuppliesDlg').dialog({
		title : '增减耗材数量',
		top : getTop(200),
		left : getLeft(430),
		width : 430,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#purchaseSuppliesDlg [clear="clear"]').val('');
			$('#purchaseSuppliesDlg [choose="choose"]').val('');
		}
	});
	$('#current_supplies_number').val(row.supNum);
	$('#purchaseSuppliesDlg').dialog('open');
}
/**
 * 执行增减耗材数量
 */
function doPurchaseSupplies(){
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var supNum = $('#purchase_supplies_number').val();
	var supRemark = $('#purchase_supplies_remark').val();
	var checkFlag = 0;
	$('#purchaseSuppliesDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	if (supNum == 0) {
		myTips('数量填写错误!','error');
		return;
	}
	showLoading();
	$.post('../purchaseSupplies.action', {
		userName: _loginUserName,
		supId: row.supId,
		supNum: supNum,
		supRemark: supRemark,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#purchaseSuppliesDlg').dialog('close');
			myTips('修改成功！', 'success');
			querySupplies(1);
		}
	});	
}
/**
 * 选择房源
 */
function choseHouse() {
	$('#choseHouseDlg').dialog({
		title : '选择房源',
		top : getTop(550),
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
	$('#choseHouseDlg').dialog('open');
}
/**
 * 选择房源-显示列表
 */
function relationDataGrid() {
	var relationType = $('#searchBelongType').find('option:selected').text();
	if (relationType == '房源列表') {
		$('#choseHouseSelect').show();
		$('#virtualRelationSelect').hide();
		$('#choseTrusteeship').show();
		$('#choseVirtualHouse').hide();
		if ($('#choseTrusteeshipTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipTable').datagrid(
				{
					columns : [ [ {
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
						var row = $('#choseTrusteeshipTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#use_supplies_houseCoding').val(row.hsHouseId);
							$('#use_supplies_choseHouse').val(
								row.hsAddCommunity + ' ' 
								+ row.hsAddBuilding + ' ' 
								+ row.hsAddDoorplateno);
							$('#choseHouseDlg').dialog('close');
						}
					}
				});
		}
	}
	if (relationType == '项目列表') {
		$('#choseHouseSelect').hide();
		$('#virtualRelationSelect').show();
		$('#choseTrusteeship').hide();
		$('#choseVirtualHouse').show();
		if ($('#choseVirtualHouseTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualHouseTable').datagrid(
				{
					columns : [ [ /*{
						field : 'houseCoding',
						title : '盘源编号',
						width : 10,
						align : 'center'
					}, */{
						field : 'addCommunity',
						title : '分类',
						width : 10,
						align : 'center'
					}, {
						field : 'keyAdministrator',
						title : '名称',
						width : 20,
						align : 'center'
					}, {
						field : 'addDoorplateno',
						title : '备注描述',
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
					width : '100%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseVirtualHouseTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#use_supplies_houseCoding').val(row.houseCoding);
							$('#use_supplies_choseHouse').val(row.keyAdministrator);
							$('#choseHouseDlg').dialog('close');
						}
					}
				});
		}
	}
	choseHouseData(1);
}
/**
 * 选择房源-显示列表-查数据
 */
function choseHouseData(page) {
	var relation = $('#searchBelongType').val();
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var qhAddCity = $('#searchAddCity').find('option:selected').text();
	var qhAddDistrict = $('#searchAddDistrict').find('option:selected').text();
	var qhAddZone = $('#searchAddZone').find('option:selected').text();
	var qhAddCommunity = $('#searchAddCommunity').val();
	var qhAddBuilding = $('#searchAddBuilding').val();
	var qhAddDoorplateno = $('#searchAddDoorplateno').val();
	var virtualType = $('#searchVirtualType2').val();
	var searchVirtualName = $('#searchVirtualName2').val();
	var searchVirtualContact = $('#searchVirtualContact2').val();
	if (relation == 1) {
		$.post('../queryHouseStoreCommon.action', {
			startNum: startNum,
			endNum: onePageNums,
			hsAddCity: qhAddCity,
			hsAddDistrict: qhAddDistrict,
			hsAddZone: qhAddZone,
			hsAddCommunity: qhAddCommunity,
			hsAddBuilding: qhAddBuilding,
			hsAddDoorplateno: qhAddDoorplateno,
		}, function(data) {
			if (data.code<0) {
				initPage(0, onePageNums, 1);
				$('#choseTrusteeshipTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1) {
					initPage(data[0].totalNum, onePageNums, 1);
				}
				$("#choseTrusteeshipTable").datagrid("loadData", data);
			}
		});
	}
	if (relation == 2) {
		$.post("../virtualProperty.action", {
			startNum: startNum,
			endNum: onePageNums,
			virtualType: virtualType,
			keyAdministrator: searchVirtualName,
			keyNumber: searchVirtualContact,
		}, function(data) {
			if (data.code<0) {
				initPage(0, onePageNums, 2);
				$('#choseVirtualHouseTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : '没有查询到符合条件的记录！'
				});
			} else {
				if (page == 1) {
					initPage(data.body[0].totalNum, onePageNums, 2);
				}
				$("#choseVirtualHouseTable").datagrid("loadData", data.body);
			}
		});
	}
}
/**
 * 查看耗材详情
 */
function openSuppliesInfo(){
	$('#suppliesInfoDlg').dialog({
		title : '耗材详细信息',
		top : getTop(500),
		left : getLeft(660),
		width : 660,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function(){
			$('#suppliesInfoTabs').tabs('select',0);
		},
		onClose : function() {
			$('#suppliesInfoDlg [clear="clear"]').val('');
		},
	});
	seeSupplies();
	$('#suppliesInfoDlg').dialog('open');
}
/**
 * 加载耗材详情数据
 */
function seeSupplies() {
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		return;
	}
	$('#query_supplies_choseHouse').val(row.keyAdministrator);
	$('#query_supplies_type').val(row.supType);
	$('#query_supplies_name').val(row.supName);
	$('#query_supplies_brand').val(row.supBrand);
	$('#query_supplies_model').val(row.supModel);
	$('#query_supplies_price').val(row.supPrice);
	$('#query_supplies_number').val(row.supNum);
	$('#query_supplies_remark').val(row.supRemark);
}
/**
 * 上一条下一条
 */
function laterOrNext(type) {
	$('#suppliesDg').datagrid('clearChecked');
	var dataIndex = $("#suppliesInfo_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$("#suppliesInfo_index").val(num);
			changeData = $('#suppliesDg').datagrid('getData').rows[num];
			$('#suppliesDg').datagrid('selectRow',num);
			_indexNum[0] = num;
			queryFollow();
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#suppliesDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#suppliesInfo_index").val(num);
			changeData = $('#suppliesDg').datagrid('getData').rows[num];
			$('#suppliesDg').datagrid('selectRow',num);
			_indexNum[0] = num;
			queryFollow();
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	seeSupplies();
}
/**
 * 初始化tab
 */
function initTable(index){
	if(index=='0'){
		seeSupplies();
	}
	if(index=='1'){
		check_supplies_img();
	}
}
/***********************************************************耗材图片上传start****************************************************************/
//电脑上传
function upload_supplies_img() {
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录','info');
		return;
	}
	$('#uploadDlg').dialog({
		title : '上传图片',
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
			refresh_supplies_img();
		}
	});
	creat_supplies_qr();
	$.post('../upload/getUpTokenCallback.action', function (data) {
		var token = data.split('#####')[0];
		var co = data.split('#####')[1];
		$('#uploadDlg input[clear=true]').val('');
		$('#token').val(token);
		$('#co').val(co);
		$('#supId').val(row.supId);
		$('#userName').val(_loginUserName);
		initUploader();
		doCancel_supplies_img();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creat_supplies_qr() {
	var row = $('#suppliesDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录',"info");
		return;
	}
	$.post("../upload/getMobUploadUrl.action", {
		supId : row.supId,
		userName : _loginUserName,
	}, function (data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel_supplies_img();
	});
}

//查看图片
function check_supplies_img() {
	var row = $('#suppliesDg').datagrid('getSelected');
	if (row) {
		doCancel_supplies_img();
		show_supplies_img(row.supId);
	} else {
		$.messager.alert('消息','请选择一条记录',"info");
	}
}
//删除图片
function remove_supplies_img() {
	var file = $('._supplies_file');
	if (file.length == 0) {
		$.messager.alert('消息','没有图片可以删除',"error");
	} else {
		$('#_supplies_title').html('请选择要删除的图片').show();
		$('._supplies_checkbox').show();
		$('#_supplies_btn').show();
	}
}
//取消删除图片
function doCancel_supplies_img(){
	$('#_supplies_title').hide();
	$('._supplies_checkbox').hide().removeAttr('checked');
	$('#_supplies_btn').hide();
}
//执行删除图片
function doRemove_supplies_img() {
	var row = $("#suppliesDg").datagrid("getSelected");
	var arr = 0;
	var path = '';
	var chk = $('._supplies_checkbox');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#_supplies_imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#_supplies_imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0, path.length-1);//去掉最后一个逗号
		$.post("../deleteSuppliesPic.action",{
			supId : row.supId,
			supImgPath : path,
			userName : _loginUserName,
		}, function(data) {
			if (data < 0 || data == '') {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				show_supplies_img(row.supId);
			}
		});
		doCancel_supplies_img();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
function show_supplies_img(supId){
	$("#_supplies_imgWrapper").empty();
	$.post("../querySupplies.action",{
		supId : supId
	}, function(data) {
		if (data.code < 0) {
			$("#_supplies_imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		var path = data.body[0].supImgPath.getRealJsonStr();
		if(path == '' || path == null){
			$('#_supplies_imgNum').html('');
			return;
		}
		var img = eval('([' + path + '])');
		var imgNum = 0;
		var fileNum = 0;
		var urls = "";
		for(var i in img){
			if(i==0){
				urls += img[i].path;
			}else{
				urls += ","+img[i].path;
			}
		}
		$.post("../upload/getDownloadUrl.action",{
			baseUrls : urls
		},function(data){
			var newUrls = data.split(",");
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
					if(fileNum == 0){
						$('#_supplies_imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#_supplies_imgWrapper .fileList').append('<li>' +
							'<input name="other" class="_supplies_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
							'<a href="'+newUrls[i]+'" class="_supplies_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
							'</li>');
					fileNum++;
					
				}
			}
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				var j = parseInt(i) + parseInt(img.length);
				if (ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png") {
					if (imgNum == 0) {
						$('#_supplies_imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#_supplies_imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="_supplies_group _supplies_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="_supplies_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#_supplies_imgNum').html("图片：" + imgNum + "张    文件：" + fileNum + "个");
			$("._supplies_group").colorbox({
				rel:'_supplies_group', 
				transition:"none", 
				width:"60%", 
				height:"90%"
			});
		});
	});
}
//刷新
function refresh_supplies_img(){
	var row = $("#suppliesDg").datagrid("getSelected");
	if (row){
		doCancel_supplies_img();
		show_supplies_img(row.supId);
	}
}
/***********************************************************耗材图片上传end****************************************************************/








