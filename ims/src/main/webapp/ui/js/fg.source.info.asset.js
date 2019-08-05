//资产列表信息导入
function queryAsset2(page, type) {
	var startNum = (parseInt(page) - 1) * 8;
	var endNum = 8;
	$.post('../assetsInRentDb.action', {
		startNum : startNum,
		endNum : endNum,
		saHouseStoreId : _houseStoreCoding
	}, function(data){
		$('#assetsInfoTable2').datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				$("#assetInfo_index").val(rowIndex);
				$('#assetInfoTabs').tabs({
					plain : true,
					fit : true,
					border	: false,
					onSelect : function(title, index) {
						// 获得点击选项卡的列数，调用表格初始化
						initAssetTable2(index);
					}
				});
				$("#assetInfoTabs").tabs("select", 0);
				openAssetInfo2();
			}
		});
		if (data.code < 0) {
			dbSourcePage(0, 0, 21);
			$('#assetsInfoTable2').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum, page, 21);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$('#assetsInfoTable2').datagrid('loadData', data.body);
		}
	});
}

//未租房，资产迁入
function moveInAssets2(){
	$("#moveInAssetsDlg").dialog({
		title : '迁入资产',
		top : getTop(670),
		left : getLeft(900),
		width : 900,
		height : 670,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveInAssetsDlg [clear="clear"]').val('');
			$('#moveInAssetsDlg [choose="choose"]').val('');
		}
	});
	if ($('#assetsListTable').hasClass('datagrid-f')) {

	} else {
		$('#assetsListTable').	datagrid({
			columns : [ [
			{
				field : 'saDetailedAddress',
				title : '地址/项目',
				width : 30,
				align : 'center'
			},
			{
				field : 'saType',
				title : '所属',
				width : 10,
				align : 'center'
			},	
			{
				field : 'saClassify',
				title : '类型',
				width : 10,
				align : 'center'
			},
			{
				field : 'saName',
				title : '名称',
				width : 20,
				align : 'center'
			},
			{
				field : 'saBrand',
				title : '品牌',
				width : 10,
				align : 'center'
			},
			{
				field : 'saModel',
				title : '型号',
				width : 10,
				align : 'center'
			},
			{
				field : 'saStatus',
				title : '状态',
				width : 10,
				align : 'center'
			},
			{
				field : 'saUse',
				title : '使用情况',
				width : 10,
				align : 'center'
			},
			{
				field : 'do',
				title : '添加',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' style='color:blue' onclick=\"addOneToNeedTo2("+ index +")\" >添加</a>";
				}
			} ] ],
			width : '100%',
			height : '152px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			rowStyler : function(index, row) {
				return 'color:#000;';
			},
		});
	}
	
	if ($('#assetsMoveInTable').hasClass('datagrid-f')) {

	} else {
		$('#assetsMoveInTable').datagrid({
			columns : [ [
			{
				field : 'saDetailedAddress',
				title : '地址/项目',
				width : 30,
				align : 'center'
			},
			{
				field : 'saType',
				title : '所属',
				width : 10,
				align : 'center'
			},	
			{
				field : 'saClassify',
				title : '类型',
				width : 10,
				align : 'center'
			},
			{
				field : 'saName',
				title : '名称',
				width : 20,
				align : 'center'
			},
			{
				field : 'saBrand',
				title : '品牌',
				width : 10,
				align : 'center'
			},
			{
				field : 'saModel',
				title : '型号',
				width : 10,
				align : 'center'
			},
			{
				field : 'saStatus',
				title : '状态',
				width : 10,
				align : 'center'
			},
			{
				field : 'saUse',
				title : '使用情况',
				width : 10,
				align : 'center'
			},
			{
				field : 'do',
				title : '取消',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' style='color:red' onclick=\"myDeleteRows('"+row.saId+"','saId','assetsMoveInTable','0')\">删除</a>";
				}
			} ] ],
			width : '100%',
			height : '152px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			rowStyler : function(index, row) {
				return 'color:#000;';
			},
		});
	}
	$("#assetsMoveInTable").datagrid("loadData", []);
	$("#moveInAssetsDlg").dialog('open');
	queryAssetsList2(1, 0);
}
//资产导入信息
function queryAssetsList2(page, type) {
	var startNum = (parseInt(page) - 1) * 5;
	var endNum = 5;
	var searchCommunity = $('#searchCommunity_asset').val();
	var searchBuilding = $('#searchBuilding_asset').val();
	var searchDoorplateno = $('#searchDoorplateno_asset').val();
	var searchVirtualType = $('#searchVirtualType_asset').val();
	var searchVirtualName = $('#searchVirtualName_asset').val();
	var saType = $('#searchSaType').val();
//	var saUse = $('#searchSaUse').val();
	var saNumber = $('#searchSaNumber').val();
	var saName = $('#searchSaName').val();
	var saBrand = $('#searchSaBrand').val();
	var saModel = $('#searchSaModel').val();

	$.post("../assetsInRentDb.action", {
		startNum: startNum,
		endNum : endNum,
		addCommunity: searchCommunity,
		addBuilding: searchBuilding,
		addDoorplateno: searchDoorplateno,
		virtualType: searchVirtualType,
		keyAdministrator: searchVirtualName,
		saType: saType,
//		saUse: saUse,
		saNumber: saNumber,
		saName: saName,
		saBrand: saBrand,
		saModel: saModel,
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 20);
			$('#assetsListTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum, page, 20);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$("#assetsListTable").datagrid("loadData", data.body);
		}
	});
}
//添加一条资产到需要迁入的资产列表里
function addOneToNeedTo2(index){
	var row = $('#assetsListTable').datagrid('getData').rows[index];
	var rows = $('#assetsMoveInTable').datagrid('getRows');
	var rows2 = $('#assetsInfoTable2').datagrid('getRows');
	for (var i in rows) {
		if (rows[i].saId == row.saId) {
			myTips('此条资产已经添加到下方列表！','error');
			return;
		}
	}
	for (var i in rows2) {
		if (rows2[i].saId == row.saId) {
			myTips('该资产已在该房内，无需迁移！','error');
			return;
		}
	}
	$('#assetsMoveInTable').datagrid('insertRow', {
		index : 0,
		row : row
	});
}
//执行迁入资产
/*function doMoveInAssets(){
	var rows = $("#assetsMoveInTable").datagrid('getRows');	
	if (rows.length == 0) {
		myTips('请先将待迁入的资产添加到下方列表！', 'error');
		return;
	}
	var checkFlag = 0;
	$('#moveInAssetsDlg [must="must"]').each(function(){
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
	var agentName = $('#move_in_asset_staff option:selected').text();
	var moveReason = $('#move_in_asset_reason').val();
	var jsonArray = [];
	for (var i in rows) {
		var jsonObject = {
			registrantName: _loginUserName,
			saRegistrant: _loginUserId,
			department: _loginDepartment,
			storefront: _loginStore,
			agentName: agentName,
			moveReason: moveReason,
			saId: rows[i].saId,
			saHouseStoreId: _houseStoreCoding,
			saHouseId: _houseCoding,
			saMoveFrom: rows[i].saDetailedAddress,
			saMoveTo: _hrAddCommunity + " " + _hrAddBuilding + " " + _hrAddDoorplateno
		};
		jsonArray[i] = jsonObject;
	}
	showLoading();
	$.post('../moveAssets.action', {
		saId: rows[0].saId,
		jsonArray: JSON.stringify(jsonArray),
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#moveInAssetsDlg').dialog('close');
			myTips('迁移成功！', 'success');
			queryAsset2(1, 0);
		}
	});	
}*/
/**
* 迁出资产
*/
function moveOutAssets2(){
	var row = $('#assetsInfoTable2').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#move_from_assets_choseHouse').val(_hrAddCommunity + ' ' + _hrAddBuilding + ' ' + _hrAddDoorplateno);
	$('#moveOutAssetsDlg').dialog({
		title : '迁移资产',
		top : getTop(250),
		left : getLeft(540),
		width : 540,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveOutAssetsDlg [clear="clear"]').val('');
			$('#moveOutAssetsDlg [choose="choose"]').val('');
		}
	});
	$('#doMoveOutAssetsButton').hide();
	$('#doMoveOutAssetsButton2').show();
	$('#moveOutAssetsDlg').dialog('open');
}
/**
* 执行迁出资产
*/
function doMoveOutAssets2(){
	var row = $('#assetsInfoTable2').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var saHouseStoreId = $('#move_to_assets_houseStoreCoding').val();
	var saHouseId = $('#move_to_assets_houseCoding').val();
	var saMoveFrom = $('#move_from_assets_choseHouse').val();
	var saMoveTo = $('#move_to_assets_choseHouse').val();
	var agentName = $('#move_to_asset_staff option:selected').text();
	var moveReason = $('#move_to_asset_reason').val();
	var checkFlag = 0;
	$('#moveOutAssetsDlg [must="must"]').each(function(){
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
	if (saHouseStoreId == row.saHouseStoreId && saHouseId == row.saHouseId) {
		myTips('该资产无须迁移','error');
		return;
	}
	
	var jsonArray = [];
	var jsonObject = {
		registrantName: _loginUserName,
		saRegistrant: _loginUserId,
		department: _loginDepartment,
		storefront: _loginStore,
		agentName: agentName,
		moveReason: moveReason,
		saId: row.saId,
		saHouseStoreId: saHouseStoreId,
		saHouseId: saHouseId,
		saMoveFrom: saMoveFrom,
		saMoveTo: saMoveTo,
		saNumber: row.saNumber,
	};
	jsonArray[0] = jsonObject;
	showLoading();
	$.post('../moveAssets.action', {
		saId: row.saId,
		jsonArray: JSON.stringify(jsonArray),
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#moveOutAssetsDlg').dialog('close');
			myTips('迁移成功！', 'success');
			queryAsset2(1);
		}
	});
}
/**
 * 选择房源
 */
function choseHouseAsset() {
	$('#choseHouseAssetDlg').dialog({
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
	relationDataGridAsset();
	$('#choseHouseAssetDlg').dialog('open');
}
/**
 * 选择房源-显示列表
 */
function relationDataGridAsset() {
	var relationType = $('#searchBelongTypeAsset').find('option:selected').text();
	if (relationType == '房源列表') {
		$('#choseHouseSelectAsset').show();
		$('#virtualRelationSelectAsset').hide();
		$('#choseTrusteeshipAsset').show();
		$('#choseVirtualHouseAsset').hide();
		if ($('#choseTrusteeshipAssetTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipAssetTable').datagrid(
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
						var row = $('#choseTrusteeshipAssetTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#move_to_assets_houseStoreCoding').val(row.hsId);
							$('#move_to_assets_houseCoding').val(row.hsHouseId);
							$('#move_to_assets_choseHouse').val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
							$('#choseHouseAssetDlg').dialog('close');
						}
					}
				});
		}
	}
	if (relationType == '项目列表') {
		$('#choseHouseSelectAsset').hide();
		$('#virtualRelationSelectAsset').show();
		$('#choseTrusteeshipAsset').hide();
		$('#choseVirtualHouseAsset').show();
		if ($('#choseVirtualHouseAssetTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualHouseAssetTable').datagrid(
				{
					columns : [ [ {
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
						var row = $('#choseVirtualHouseAssetTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#move_to_assets_houseStoreCoding').val('');
							$('#move_to_assets_houseCoding').val(row.houseCoding);
							$('#move_to_assets_choseHouse').val(row.keyAdministrator);
							$('#choseHouseAssetDlg').dialog('close');
						}
					}
				});
		}
	}
	choseHouseDataAsset(1);
}
/**
 * 选择房源-显示列表-查数据
 */
function choseHouseDataAsset(page) {
	var relation = $('#searchBelongTypeAsset').val();
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var qhAddCity = $('#searchAddCity').find('option:selected').text();
	var qhAddDistrict = $('#searchAddDistrictAsset').find('option:selected').text();
	var qhAddZone = $('#searchAddZone').find('option:selected').text();
	var qhAddCommunity = $('#searchAddCommunityAsset').val();
	var qhAddBuilding = $('#searchAddBuildingAsset').val();
	var qhAddDoorplateno = $('#searchAddDoorplatenoAsset').val();
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
				initPage(0, onePageNums, 0);
				$('#choseTrusteeshipAssetTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1) {
					initPage(data[0].totalNum, onePageNums, 0);
				}
				$("#choseTrusteeshipAssetTable").datagrid("loadData", data);
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
				initPage(0, onePageNums, 1);
				$('#choseVirtualHouseAssetTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				if (page == 1) {
					initPage(data.body[0].totalNum, onePageNums, 1);
				}
				$("#choseVirtualHouseAssetTable").datagrid("loadData", data.body);
			}
		});
	}
}

/**
 * 分页初始化
 */
/*
function initPage(totalNum, onePageNums, type) {
	var pageCount = Math.ceil(totalNum / onePageNums);
	if (type == 0) {
		$("#choseTrusteeshipAssetPage").remove();
		$("#choseTrusteeshipAssetPageDiv").append("<div class='tcdPageCode' id='choseTrusteeshipAssetPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipAssetPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseHouseDataAsset(p);
				}
			}
		});
	}
	if (type == 1) {
		$("#choseVirtualHouseAssetPage").remove();
		$("#choseVirtualHouseAssetPageDiv").append("<div class='tcdPageCode' id='choseVirtualHouseAssetPage' style='text-align:center;'></div>");
		$("#choseVirtualHouseAssetPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseHouseDataAsset(p);
				}
			}
		});
	}
}*/
/**
 * 查看资产详情
 */
function openAssetInfo2(){
	$('#assetInfoDlg').dialog({
		title : '资产详细信息',
		top : getTop(400),
		left : getLeft(850),
		width : 850,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function(){
			$('#assetInfoTabs').tabs('select', 0);
		},
		onClose : function() {
			$('#assetInfoDlg [clear="clear"]').val('');
		},
	});
	seeAsset2();
	$('#assetInfoDlg').dialog('open');
}
/**
 * 加载资产详情数据
 */
function seeAsset2() {
	var row = $('#assetsInfoTable2').datagrid('getSelected');
	if (!row) {
		return;
	}
	$('#query_asset_choseHouse').val(row.saDetailedAddress);
	$('#query_asset_type').val(row.saType);
	$('#query_asset_classify').val(row.saClassify);
	$('#query_asset_use').val(row.saUse);
	$('#query_asset_status').val(row.saStatus);
	$('#query_asset_name').val(row.saName);
	$('#query_asset_brand').val(row.saBrand);
	$('#query_asset_model').val(row.saModel);
	$('#query_asset_price').val(row.saPrice);
	$('#query_asset_remark').val(row.saRemarks);
	$('#query_asset_changeSupplier').val(row.saSupplierName);
	$('#query_asset_number').val(row.saNumber);
	$('#query_asset_depreciation_price').val(row.saDepreciationPrice);
}
/**
 * 初始化tab
 */
function initAssetTable2(index){
	if(index=='0'){
		seeAsset2();
	}
	if(index=='1'){
		check_asset_img2();
	}
}

/***********************************************************资产图片上传start****************************************************************/
//电脑上传
function upload_asset_img2() {
	var row = $('#assetsInfoTable2').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录','info');
		return;
	}
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
			refresh_asset_img2();
		}
	});
	creat_asset_qr2();
	$.post('../upload/getUpTokenCallback.action', function (data) {
		var token = data.split('#####')[0];
		var co = data.split('#####')[1];
		$('#uploadDlg input[clear=true]').val('');
		$('#token').val(token);
		$('#co').val(co);
		$('#saId').val(row.saId);
		$('#userName').val(_loginUserName);
		initUploader();
		doCancel_asset_img2();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creat_asset_qr2() {
	var row = $('#assetsInfoTable2').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录',"info");
		return;
	}
	$.post("../upload/getMobUploadUrl.action", {
		saId : row.saId,
		userName : _loginUserName,
	}, function (data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel_asset_img2();
	});
}

//查看图片
function check_asset_img2() {
	var row = $('#assetsInfoTable2').datagrid('getSelected');
	if (row) {
		doCancel_asset_img2();
		show_asset_img2(row.saId);
	} else {
		$.messager.alert('消息','请选择一条记录',"info");
	}
}
//删除图片
function remove_asset_img2() {
	var file = $('._asset_file');
	if (file.length == 0) {
		$.messager.alert('消息','没有图片可以删除',"error");
	} else {
		$('#_asset_title').html('请选择要删除的图片').show();
		$('._asset_checkbox').show();
		$('#_asset_btn').show();
	}
}
//取消删除图片
function doCancel_asset_img2(){
	$('#_asset_title').hide();
	$('._asset_checkbox').hide().removeAttr('checked');
	$('#_asset_btn').hide();
}
//执行删除图片
function doRemove_asset_img2() {
	var row = $("#assetsInfoTable2").datagrid("getSelected");
	var arr = 0;
	var path = '';
	var chk = $('._asset_checkbox');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#_asset_imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#_asset_imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0, path.length-1);//去掉最后一个逗号
		$.post("../deleteAssetsPic.action",{
			saId : row.saId,
			saPhotos : path,
			registrantName : _loginUserName,
		}, function(data) {
			if (data < 0 || data == '') {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				show_asset_img2(row.saId);
			}
		});
		doCancel_asset_img2();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
function show_asset_img2(saId){
	$("#_asset_imgWrapper").empty();
	$.post("../queryAssetsCommon.action",{
		saId : saId
	}, function(data) {
		if (data.code < 0) {
			$("#_asset_imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		var path = data.body[0].saPhotos;
		if(path == '' || path == null){
			$('#_asset_imgNum').html('');
			return;
		}
		path = path.substring(1, path.length - 1);
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
						$('#_asset_imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#_asset_imgWrapper .fileList').append('<li>' +
							'<input name="other" class="_asset_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
							'<a href="'+newUrls[i]+'" class="_asset_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
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
						$('#_asset_imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#_asset_imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="_asset_group _asset_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="_asset_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#_asset_imgNum').html("图片：" + imgNum + "张    文件：" + fileNum + "个");
			$("._asset_group").colorbox({
				rel:'_asset_group', 
				transition:"none", 
				width:"60%", 
				height:"90%"
			});
		});
	});
}
//刷新
function refresh_asset_img2(){
	var row = $("#assetsInfoTable2").datagrid("getSelected");
	if (row){
		doCancel_asset_img2();
		show_asset_img2(row.saId);
	}
}
/***********************************************************资产图片上传end****************************************************************/
