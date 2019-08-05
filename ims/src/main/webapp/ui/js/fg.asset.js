//@ sourceURL=fg.asset.js
$(function() {
	advancedScreening(0);
	loadSelectList();
	queryDept();

	$('#assetDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			_indexNum[0] = rowIndex;
			queryFollow();
		},
		onDblClickRow : function(rowIndex, rowData) {
			$("#assetInfo_index").val(rowIndex);
			$('#assetInfoTabs').tabs({
				plain : true,
				fit : true,
				border : false,
				onSelect : function(title, index) {
					// 获得点击选项卡的列数，调用表格初始化
					initTable(index);
				}
			});
			$("#assetInfoTabs").tabs("select", 0);
			openAssetInfo();
		}
	});
});

// 高级筛选
function advancedScreening(num) {
	if (num == 0) {
		$('.advancedScreening').css({
			"height" : "25px",
			"width" : '850px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('.advanced2').css({
			"height" : "0px",
		})
		$('.advanced3').css({
			"height" : "0px",
		})
		$('#screening').attr('onclick', 'advancedScreening(1)');
	} else if (num == 1) {
		$('.advancedScreening').css({
			"height" : "80px",
			"width" : '100%',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('.advanced2').css({
			"height" : "28px",
		})
		$('.advanced3').css({
			"height" : "28px",
		})
		$('#screening').attr('onclick', 'advancedScreening(0)');
	}
	queryAsset(1);
}

/**
 * 格式化"使用情况"列
 */
function formatterSaUse(value, row, index) {
	if (row.saUse == '使用中') {
		return "<a style='text-decoration:none;color:green;'>" + row.saUse
				+ "<a>";
	} else if (row.saUse == '未使用') {
		return "<a style='text-decoration:none;color:blue;'>" + row.saUse
				+ "<a>";
	} else if (row.saUse == '已报废') {
		return "<a style='text-decoration:none;color:gray;'>" + row.saUse
				+ "<a>";
	} else {
		return "<a style='text-decoration:none;'>" + row.saUse + "<a>";
	}
}

//分页统计总条数
function getassetPageCount(page){
	var pageSize = 15;
	var searchDistrict = $('#searchDistrict').val();
	var searchCommunity = $('#searchCommunity').val();
	var searchBuilding = $('#searchBuilding').val();
	var searchDoorplateno = $('#searchDoorplateno').val();
	var searchVirtualType = $('#searchVirtualType').val();
	var searchVirtualName = $('#searchVirtualName').val();
	var saType = $('#searchSaType').val();
	var saUse = $('#searchSaUse').val();
	var saStatus = $('#searchSaState').val();
	var saName = $('#searchSaName').val();
	var saBrand = $('#searchSaBrand').val();
	var saModel = $('#searchSaModel').val();
	var saNumber = $('#searchSaNumber').val();
	var saClassify = $('#searchSaClassify').val();

	$.post("../queryAssets.action", {
			addDistrict : searchDistrict,
			addCommunity : searchCommunity,
			addBuilding : searchBuilding,
			addDoorplateno : searchDoorplateno,
			virtualType : searchVirtualType,
			keyAdministrator : searchVirtualName,
			saUse : saUse,
			saName : saName,
			saBrand : saBrand,
			saModel : saModel,
			saType : saType,
			saStatus : saStatus,
			saNumber : saNumber,
			saClassify : saClassify,
		},
		function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"asset",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"asset",0);
		}
	});
}

/**
 * 查询资产 注：城市不能作为查询条件，因为这里不光查资料房，还要查项目
 */
function queryAsset(page) {
	var onePageNums = 15;
	var startNum = (parseInt(page) - 1) * onePageNums;
	var searchDistrict = $('#searchDistrict').val();
	var searchCommunity = $('#searchCommunity').val();
	var searchBuilding = $('#searchBuilding').val();
	var searchDoorplateno = $('#searchDoorplateno').val();
	var searchVirtualType = $('#searchVirtualType').val();
	var searchVirtualName = $('#searchVirtualName').val();
	var saType = $('#searchSaType').val();
	var saUse = $('#searchSaUse').val();
	var saStatus = $('#searchSaState').val();
	var saName = $('#searchSaName').val();
	var saBrand = $('#searchSaBrand').val();
	var saModel = $('#searchSaModel').val();
	var saNumber = $('#searchSaNumber').val();
	var saClassify = $('#searchSaClassify').val();

	$.post("../queryAssets.action", {
				startNum : startNum,
				endNum : onePageNums,
				addDistrict : searchDistrict,
				addCommunity : searchCommunity,
				addBuilding : searchBuilding,
				addDoorplateno : searchDoorplateno,
				virtualType : searchVirtualType,
				keyAdministrator : searchVirtualName,
				saUse : saUse,
				saName : saName,
				saBrand : saBrand,
				saModel : saModel,
				saType : saType,
				saStatus : saStatus,
				saNumber : saNumber,
				saClassify : saClassify,
			},
			function(data) {
				if (data.code < 0) {
					// initPage(0, onePageNums, 0);
					$('#assetDg').datagrid({
						data : [],
						view : myview,
						emptyMsg : data.msg
					});
					if(page==1){
						notCountPage(0, 0 ,"queryAsset","asset");
					}else{
						notCountPage(page, 0 ,"queryAsset","asset");
					}
				} else {
					// if (page == 1) {
					// 	initPage(data.body[0].totalNum, onePageNums, 0);
					// }
					if(data.body.length<onePageNums){
						notCountPage(page, 2 , "queryAsset","asset");
					}else{
						notCountPage(page, 1 , "queryAsset","asset");
					}
					for ( var i in data.body) {
						if (data.body[i].innerVirtualRoom == 1
								|| data.body[i].outerVirtualRoom == 1
								|| data.body[i].nonCostVirtualRoom == 1
								|| data.body[i].addCity == '库房'
								|| data.body[i].addCity == '公区'
								|| data.body[i].addCity == '供应商') {
							data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
						} else {
							data.body[i].saDetailedAddress = data.body[i].addCommunity
									+ ' '
									+ data.body[i].addBuilding
									+ ' ' + data.body[i].addDoorplateno;
						}
					}
					$("#assetDg").datagrid("loadData", data.body);
					$('#assetDg').datagrid("selectRow", _indexNum[0]);
					queryFollow();
					queryAssetFollow();
				}
			});

}
/**
 * 分页初始化
 */
function initPage(totalNum, onePageNums, type) {
	var pageCount = Math.ceil(totalNum / onePageNums);
	if (type == 0) {
		$("#assetPage").remove();
		$("#assetPageDiv")
				.append(
						"<div class='tcdPageCode' id='assetPage' style='text-align:center;'></div>");
		$("#assetPage").createPage({
			onePageNums : onePageNums,
			totalNum : totalNum,
			pageCount : pageCount,
			current : 1,
			backFn : function(p) {
				if (p <= pageCount) {
					_pageNum[0] = p;
					_indexNum[0] = 0;
					queryAsset(p);
				}
			}
		});
	}
	if (type == 1) {
		$("#choseTrusteeshipPage").remove();
		$("#choseTrusteeshipPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseTrusteeshipPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipPage").createPage({
			onePageNums : onePageNums,
			totalNum : totalNum,
			pageCount : pageCount,
			current : 1,
			backFn : function(p) {
				if (p <= pageCount) {
					choseHouseData(p);
				}
			}
		});
	}
	if (type == 2) {
		$("#choseVirtualHousePage").remove();
		$("#choseVirtualHousePageDiv")
				.append(
						"<div class='tcdPageCode' id='choseVirtualHousePage' style='text-align:center;'></div>");
		$("#choseVirtualHousePage").createPage({
			onePageNums : onePageNums,
			totalNum : totalNum,
			pageCount : pageCount,
			current : 1,
			backFn : function(p) {
				if (p <= pageCount) {
					choseHouseData(p);
				}
			}
		});
	}
	if (type == 3) {
		$("#choseSupplierPage").remove();
		$("#choseSupplierPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseSupplierPage' style='text-align:center;'></div>");
		$("#choseSupplierPage").createPage({
			onePageNums : onePageNums,
			totalNum : totalNum,
			pageCount : pageCount,
			current : 1,
			backFn : function(p) {
				if (p <= pageCount) {
					choseSupplierData(p);
				}
			}
		});
	}
}
/**
 * 加载下拉列表
 */
function loadSelectList() {
	for ( var i in _loginCompanyRentDistrict) {
		$('#searchDistrict').append(
				'<option value="' + _loginCompanyRentDistrict[i] + '">'
						+ _loginCompanyRentDistrict[i] + '</option>');
		$('#searchAddDistrict').append(
				'<option value="' + _loginCompanyRentDistrict[i] + '">'
						+ _loginCompanyRentDistrict[i] + '</option>');
	}
	for ( var i in _saType) {
		$('#searchSaType').append(
				'<option value="' + _saType[i] + '">' + _saType[i]
						+ '</option>');
		$('#add_asset_type').append(
				'<option value="' + _saType[i] + '">' + _saType[i]
						+ '</option>');
		$('#update_asset_type').append(
				'<option value="' + _saType[i] + '">' + _saType[i]
						+ '</option>');
	}
	for ( var i in _assetsType) {
		$('#searchSaClassify').append(
				'<option value="' + _assetsType[i].type + '">'
						+ _assetsType[i].type + '</option>');
		$('#add_asset_classify').append(
				'<option value="' + _assetsType[i].type + '">'
						+ _assetsType[i].type + '</option>');
		$('#update_asset_classify').append(
				'<option value="' + _assetsType[i].type + '">'
						+ _assetsType[i].type + '</option>');
	}
	for ( var i in _saUse) {
		$('#searchSaUse').append(
				'<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
		$('#add_asset_use').append(
				'<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
		$('#update_asset_use').append(
				'<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
	}
	for ( var i in _saStatus) {
		$('#searchSaState').append(
				'<option value="' + _saStatus[i] + '">' + _saStatus[i]
						+ '</option>');
		$('#add_asset_status').append(
				'<option value="' + _saStatus[i] + '">' + _saStatus[i]
						+ '</option>');
		$('#update_asset_status').append(
				'<option value="' + _saStatus[i] + '">' + _saStatus[i]
						+ '</option>');
	}
}
/**
 * 添加资产
 */
function addAsset() {
	$('#addAssetDlg').dialog({
		title : '添加资产',
		top : getTop(485),
		left : getLeft(850),
		width : 850,
		height : 485,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addAssetDlg [clear="clear"]').val('');
			$('#addAssetDlg [choose="choose"]').val('');
			$("#addAssetTable").datagrid({
				data : []
			});
		}
	});
	$('#addAssetDlg').dialog('open');
	if ($('#addAssetTable').hasClass('datagrid-f')) {

	} else {
		$('#addAssetTable')
				.datagrid(
						{
							columns : [ [
									{
										field : 'saHouseAddress',
										title : '地址/项目',
										width : 30,
										align : 'center',
									},
									{
										field : 'saType',
										title : '所属',
										width : 10,
										align : 'center',
									},
									{
										field : 'saClassify',
										title : '类型',
										width : 10,
										align : 'center',
									},
									{
										field : 'saUse',
										title : '使用',
										width : 10,
										align : 'center',
									},
									{
										field : 'saStatus',
										title : '状态',
										width : 10,
										align : 'center',
									},
									{
										field : 'saName',
										title : '名称',
										width : 20,
										align : 'center',
									},
									{
										field : 'saBrand',
										title : '品牌',
										width : 20,
										align : 'center',
									},
									{
										field : 'saModel',
										title : '型号',
										width : 20,
										align : 'center',
									},
									{
										field : 'saPrice',
										title : '价值',
										width : 20,
										align : 'center',
									},
									{
										field : 'saRemarks',
										title : '备注',
										width : 20,
										align : 'center',
									},
									{
										field : 'saSupplierName',
										title : '供应商',
										width : 20,
										align : 'center',
									},
									{
										field : 'deleteAdd',
										title : '删除',
										width : 10,
										align : 'center',
										formatter : function(value, row, index) {
											return "<a href='#' onclick=\"myDeleteRows('"
													+ row.random
													+ "','random','addAssetTable',0);\">删除</a>";
										}
									} ] ],
							width : '100%',
							height : '202px',
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
}
/**
 * 选择房源
 */
function choseHouse(type) {
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
			$('#choseHouseType').val('');
		}
	});
	$('#choseHouseType').val(type);
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
			$('#choseTrusteeshipTable')
					.datagrid(
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
									var row = $('#choseTrusteeshipTable')
											.datagrid('getSelected');
									if (row) {
										for ( var i in row) {
											if (row[i] == null) {
												row[i] = '';
											}
										}
										var type = $('#choseHouseType').val();
										if (type == 0) {
											$('#assets_houseStoreCoding').val(
													row.hsId);
											$('#assets_houseCoding').val(
													row.hsHouseId);
											$('#assets_choseHouse')
													.val(
															row.hsAddCommunity
																	+ ' '
																	+ row.hsAddBuilding
																	+ ' '
																	+ row.hsAddDoorplateno);
										} else if (type == 1) {
											$('#move_to_asset_houseStoreCoding')
													.val(row.hsId);
											$('#move_to_asset_houseCoding')
													.val(row.hsHouseId);
											$('#move_to_asset_choseHouse')
													.val(
															row.hsAddCommunity
																	+ ' '
																	+ row.hsAddBuilding
																	+ ' '
																	+ row.hsAddDoorplateno);
										}
										$('#choseHouseDlg').dialog('close');
									}
								}
							});
		}
	}
	if (relationType == '库房/公区') {
		$('#choseHouseSelect').hide();
		$('#virtualRelationSelect').show();
		$('#choseTrusteeship').hide();
		$('#choseVirtualHouse').show();
		if ($('#choseVirtualHouseTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualHouseTable').datagrid(
					{
						columns : [ [ /*
										 * { field : 'houseCoding', title :
										 * '盘源编号', width : 10, align : 'center' },
										 */{
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
							var row = $('#choseVirtualHouseTable').datagrid(
									'getSelected');
							if (row) {
								for ( var i in row) {
									if (row[i] == null) {
										row[i] = '';
									}
								}
								var type = $('#choseHouseType').val();
								if (type == 0) {
									$('#assets_houseStoreCoding').val('');
									$('#assets_houseCoding').val(
											row.houseCoding);
									$('#assets_choseHouse').val(
											row.keyAdministrator);
								} else if (type == 1) {
									$('#move_to_asset_houseStoreCoding')
											.val('');
									$('#move_to_asset_houseCoding').val(
											row.houseCoding);
									$('#move_to_asset_choseHouse').val(
											row.keyAdministrator);
								}
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
	var qhAddDistrict = $('#searchAddDistrict').find('option:selected').text();
	var qhAddCommunity = $('#searchAddCommunity').val();
	var qhAddBuilding = $('#searchAddBuilding').val();
	var qhAddDoorplateno = $('#searchAddDoorplateno').val();
	var virtualType = $('#searchVirtualType2').val();
	var searchVirtualName = $('#searchVirtualName2').val();
	var searchVirtualContact = $('#searchVirtualContact2').val();
	if (relation == 1) {
		$.post('../queryHouseStoreCommon.action', {
			startNum : startNum,
			endNum : onePageNums,
			hsAddDistrict : qhAddDistrict,
			hsAddCommunity : qhAddCommunity,
			hsAddBuilding : qhAddBuilding,
			hsAddDoorplateno : qhAddDoorplateno,
		}, function(data) {
			if (data.code < 0) {
				initPage(0, onePageNums, 1);
				$('#choseTrusteeshipTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data = data.body;
				if (page == 1) {
					initPage(data[0].totalNum, onePageNums, 1);
				}
				$("#choseTrusteeshipTable").datagrid("loadData", data);
			}
		});
	}
	if (relation == 2) {
		$.post("../virtualProperty.action", {
			startNum : startNum,
			endNum : onePageNums,
			virtualType : virtualType,
			keyAdministrator : searchVirtualName,
			keyNumber : searchVirtualContact,
		}, function(data) {
			if (data.code < 0) {
				initPage(0, onePageNums, 2);
				$('#choseVirtualHouseTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
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
 * 选择供应商
 */
function choseSupplier(type) {
	$('#choseSupplierDlg').dialog({
		title : '选择供应商',
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
	relationSupplierGrid(type);
	$('#choseSupplierDlg').dialog('open');
}
/**
 * 选择供应商-显示列表
 */
function relationSupplierGrid(type) {
	if ($('#choseSupplierTable').hasClass('datagrid-f')) {

	} else {
		$('#choseSupplierTable').datagrid(
				{
					columns : [ [ {
						field : 'addCity',
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
						var row = $('#choseSupplierTable').datagrid(
								'getSelected');
						if (row) {
							for ( var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							if (type == 0) {
								$('#assets_changeSupplier').val(
										row.keyAdministrator);
								$('#assets_supplier_id').val(row.houseCoding);
							} else if (type == 1) {
								$('#update_asset_changeSupplier').val(
										row.keyAdministrator);
								$('#update_asset_supplier_id').val(
										row.houseCoding);
							}
							$('#choseSupplierDlg').dialog('close');
						}
					}
				});
	}
	choseSupplierData(1);
}
/**
 * 选择供应商-显示列表-查数据
 */
function choseSupplierData(page) {
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var virtualType = $("#searchVirtualSupplierType").val();
	var searchVirtualName = $("#searchSupplierName").val();
	var searchVirtualContact = $("#searchSupplierVirtualContact").val();
	var addCity = '供应商';
	$.post("../virtualProperty.action", {
		startNum : startNum,
		endNum : onePageNums,
		virtualType : virtualType,
		addCity : addCity,
		keyAdministrator : searchVirtualName,
		keyNumber : searchVirtualContact,
	}, function(data) {
		if (data.code < 0) {
			initPage(0, onePageNums, 3);
			$('#choseSupplierTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1) {
				initPage(data.body[0].totalNum, onePageNums, 3);
			}
			$("#choseSupplierTable").datagrid("loadData", data.body);
		}
	});
}
/**
 * 添加资产到列表
 */
function addToDataGrid() {
	var saRegistrant = _loginUserId;
	var department = _loginDepartment;
	var storefront = _loginStore;
	var saHouseAddress = $('#assets_choseHouse').val();
	var saHouseStoreId = $('#assets_houseStoreCoding').val();
	var saHouseId = $('#assets_houseCoding').val();
	var saType = $('#add_asset_type').val();
	var saClassify = $('#add_asset_classify').val();
	var saUse = $('#add_asset_use').val();
	var saStatus = $('#add_asset_status').val();
	var assetName = $('#add_asset_name').val();
	var assetBrand = $('#add_asset_brand').val();
	var assetModel = $('#add_asset_model').val();
	var assetPrice = $('#add_asset_price').val();
	var assetNumber = $('#add_asset_number').val();
	var saSupplierName = $('#assets_changeSupplier').val();
	var saSupplier = $('#assets_supplier_id').val();
	var assetRemarks = $('#add_asset_remark').val();

	var checkFlag = 0;
	$('#addAssetDlg [must="must"]').each(function() {
		if ($(this).val() == '') {
			$(this).css('border-color', 'red');
			checkFlag++;
		} else {
			$(this).css('border-color', '#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!', 'error');
		return;
	}

	for (var i = 0; i < assetNumber; i++) {
		var dataJson = {
			saRegistrant : saRegistrant,
			department : department,
			storefront : storefront,
			saHouseAddress : saHouseAddress,
			saHouseStoreId : saHouseStoreId,
			saHouseId : saHouseId,
			saType : saType,
			saClassify : saClassify,
			saUse : saUse,
			saStatus : saStatus,
			saName : assetName,
			saBrand : assetBrand,
			saModel : assetModel,
			saPrice : assetPrice,
			saSupplierName : saSupplierName,
			saSupplier : saSupplier,
			saRemarks : assetRemarks,
		};
		var random = parseInt((Math.random() * 9 + 1) * 10000000);
		dataJson.random = random;
		$('#addAssetTable').datagrid('insertRow', {
			index : 0,
			row : dataJson
		});
	}
}
/**
 * 清空添加资产input值
 */
function cleanDataGrid() {
	$('#addAssetDlg [clear="clear"]').val('');
	$('#addAssetDlg [choose="choose"]').val('');
}
/**
 * 执行添加资产
 */
function doAddAsset() {
	var rows = $('#addAssetTable').datagrid('getRows');
	if (rows.length == 0) {
		myTips('没有可用于添加的数据', 'error');
		return;
	}
	showLoading();
	$.post('../insertAssets.action', {
		jsonArray : JSON.stringify(rows)
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '添加失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#addAssetDlg').dialog('close');
			myTips('添加成功！', 'success');
			queryAsset(1);
		}
	});
}
/**
 * 修改资产
 */
function updateAsset() {
	var row = $('#assetDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#updateAssetDlg').dialog({
		title : '修改资产',
		top : getTop(280),
		left : getLeft(850),
		width : 850,
		height : 280,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateAssetDlg [clear="clear"]').val('');
			$('#updateAssetDlg [choose="choose"]').val('');
		}
	});
	$('#update_asset_choseHouse').val(row.saDetailedAddress);
	$('#update_asset_type').val(row.saType);
	$('#update_asset_classify').val(row.saClassify);
	changeAssetsType('update_asset_');
	$('#update_asset_use').val(row.saUse);
	$('#update_asset_status').val(row.saStatus);
	$('#update_asset_name').val(row.saName);
	$('#update_asset_brand').val(row.saBrand);
	$('#update_asset_model').val(row.saModel);
	$('#update_asset_price').val(row.saPrice);
	$('#update_asset_remark').val(row.saRemarks);
	$('#update_asset_supplier_id').val(row.saSupplier);
	$('#update_asset_changeSupplier').val(row.saSupplierName);
	$('#updateAssetDlg').dialog('open');
}
/**
 * 修改使用情况
 */
function updateUse() {
	var row = $('#assetDg').datagrid('getSelected');
	var row1 = $('#assetDg').datagrid('getChecked');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	if (row1.length > 0) {
		$('#updateAssetDlg1').dialog({
			title : '修改使用情况',
			top : getTop(280),
			left : getLeft(650),
			width : 400,
			height : 160,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
			}
		});
		$('#updateAssetDlg1').dialog('open');
	} else {
		$('#updateAssetDlg1').dialog({
			title : '修改使用情况',
			top : getTop(280),
			left : getLeft(650),
			width : 400,
			height : 160,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {

			}

		});
		$('#updateAssetDlg1').dialog('open');
	}

}
/**
 * 修改资产状态
 */
function updateState() {
	var row = $('#assetDg').datagrid('getSelected');
	var row1 = $('#assetDg').datagrid('getChecked');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	if (row1.length > 0) {
		$('#updateAssetDlg2').dialog({
			title : '修改资产状态',
			top : getTop(280),
			left : getLeft(650),
			width : 400,
			height : 160,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
			}
		});
		$('#updateAssetDlg2').dialog('open');
	} else {
		$('#updateAssetDlg2').dialog({
			title : '修改资产状态',
			top : getTop(280),
			left : getLeft(650),
			width : 400,
			height : 160,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {

			}

		});
		$('#updateAssetDlg2').dialog('open');
	}

}
/**
 * 执行修改资产状态
 */
function doUpdateState() {
	var row = $('#assetDg').datagrid('getSelected');
	var row1 = $('#assetDg').datagrid('getChecked');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var mask = true;
	if (row1.length > 0) {
		var saStatus = $('#update_asset_state').val();
		showLoading();
		for ( var i in row1) {
			$.post('../updateAssets.action', {
				registrantName : _loginUserName,
				saId : row1[i].saId,
				saStatus : saStatus

			}, function(data) {
				hideLoading();
				if (data.code < 0) {
					$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
					return;
				} else {
					$('#updateAssetDlg2').dialog('close');
					queryAsset(1);
					if (mask) {
						myTips('修改成功！', 'success');
						mask = false;
					}

				}
			});
		}
	} else {

		var saStatus = $('#update_asset_state').val();

		showLoading();
		$.post('../updateAssets.action', {
			registrantName : _loginUserName,
			saId : row.saId,
			saStatus : saStatus

		}, function(data) {
			hideLoading();
			if (data.code < 0) {
				$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
				return;
			} else {
				$('#updateAssetDlg2').dialog('close');
				myTips('修改成功！', 'success');
				queryAsset(1);
			}
		});
	}
}
/**
 * 执行修改使用情况
 */
function doUpdateUse() {
	var row = $('#assetDg').datagrid('getSelected');
	var row1 = $('#assetDg').datagrid('getChecked');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var mask = true;
	if (row1.length > 0) {
		var saUse = $('#update_asset_use1').val();
		showLoading();
		for ( var i in row1) {
			$.post('../updateAssets.action', {
				registrantName : _loginUserName,
				saId : row1[i].saId,
				saUse : saUse,

			}, function(data) {
				hideLoading();
				if (data.code < 0) {
					$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
					return;
				} else {
					$('#updateAssetDlg1').dialog('close');
					queryAsset(1);
					if (mask) {
						myTips('修改成功！', 'success');
						mask = false;
					}

				}
			});
		}
	} else {

		var saUse = $('#update_asset_use1').val();

		showLoading();
		$.post('../updateAssets.action', {
			registrantName : _loginUserName,
			saId : row.saId,

			saUse : saUse,

		}, function(data) {
			hideLoading();
			if (data.code < 0) {
				$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
				return;
			} else {
				$('#updateAssetDlg1').dialog('close');
				myTips('修改成功！', 'success');
				queryAsset(1);
			}
		});
	}

}
// //
/**
 * 执行修改资产
 */
function doUpdateAsset() {
	var row = $('#assetDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var saType = $('#update_asset_type').val();
	var saClassify = $('#update_asset_classify').val();
	var saUse = $('#update_asset_use').val();
	var saStatus = $('#update_asset_status').val();
	var assetName = $('#update_asset_name').val();
	var assetBrand = $('#update_asset_brand').val();
	var assetModel = $('#update_asset_model').val();
	var assetPrice = $('#update_asset_price').val();
	var saSupplierName = $('#update_asset_changeSupplier').val();
	var saSupplier = $('#update_asset_supplier_id').val();
	var assetRemarks = $('#update_asset_remark').val();

	var checkFlag = 0;
	$('#updateAssetDlg [must="must"]').each(function() {
		if ($(this).val() == '') {
			$(this).css('border-color', 'red');
			checkFlag++;
		} else {
			$(this).css('border-color', '#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!', 'error');
		return;
	}

	showLoading();
	$.post('../updateAssets.action', {
		registrantName : _loginUserName,
		saId : row.saId,
		saType : saType,
		saClassify : saClassify,
		saUse : saUse,
		saStatus : saStatus,
		saName : assetName,
		saBrand : assetBrand,
		saModel : assetModel,
		saPrice : assetPrice,
		saSupplierName : saSupplierName,
		saSupplier : saSupplier,
		saRemarks : assetRemarks,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '修改失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#updateAssetDlg').dialog('close');
			myTips('修改成功！', 'success');
			queryAsset(1);
		}
	});
}

/**
 * 查询资产的跟进记录
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
				field : 'registrantName',
				title : '跟进人',
				width : '10%',
				align : 'center'
			}, {
				field : 'agentName',
				title : '经手人',
				width : '10%',
				align : 'center'
			}, {
				field : 'text',
				title : '跟进内容',
				width : '60%',
				align : 'center'
			} ] ],
			width : '100%',
			height : '202px',
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
	var row = $('#assetDg').datagrid('getSelected');
	var data = [];
	if (row.saFollowUp != null && row.saFollowUp != '') {
		var str = row.saFollowUp.getRealJsonStr();
		data = JSON.parse(str);
	}
	$('#followTable').datagrid('loadData', data.reverse());
}
/**
 * 列表下方跟进的详细界面
 */
function downFollowInfo(row) {
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
	for ( var i in row) {
		$('#readDownFollow' + i).html(row[i]);
	}
	$('#downFollowInfo').dialog('open');
}
/**
 * 迁移资产
 */
function moveAsset() {
	var row = $('#assetDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#move_from_asset_choseHouse').val(row.saDetailedAddress);
	$('#moveAssetDlg').dialog({
		title : '迁移资产',
		top : getTop(250),
		left : getLeft(540),
		width : 540,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveAssetDlg [clear="clear"]').val('');
			$('#moveAssetDlg [choose="choose"]').val('');
		}
	});
	$('#moveAssetDlg').dialog('open');
}
/**
 * 执行迁移资产
 */
function doMoveAsset() {
	var row = $('#assetDg').datagrid('getSelected');
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var saHouseStoreId = $('#move_to_asset_houseStoreCoding').val();
	var saHouseId = $('#move_to_asset_houseCoding').val();
	var saMoveFrom = $('#move_from_asset_choseHouse').val();
	var saMoveTo = $('#move_to_asset_choseHouse').val();
	var agentName = $('#pickassetShowUserInfo').val().split(' ')[$(
			'#pickassetShowUserInfo').val().split(' ').length - 1];// 获取第三个的名字
	// var agentName = $('#move_to_asset_staff option:selected').text();
	var moveReason = $('#move_asset_reason').val();
	var checkFlag = 0;
	$('#moveAssetDlg [must="must"]').each(function() {
		if ($(this).val() == '') {
			$(this).css('border-color', 'red');
			checkFlag++;
			return;
		} else {
			$(this).css('border-color', '#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!', 'error');
		return;
	}
	if (saHouseStoreId == row.saHouseStoreId && saHouseId == row.saHouseId) {
		myTips('该资产无须迁移', 'error');
		return;
	}

	var jsonArray = [];
	var jsonObject = {
		registrantName : _loginUserName,
		saRegistrant : _loginUserId,
		department : _loginDepartment,
		storefront : _loginStore,
		agentName : agentName,
		moveReason : moveReason,
		saId : row.saId,
		saHouseStoreId : saHouseStoreId,
		saHouseId : saHouseId,
		saMoveFrom : saMoveFrom,
		saMoveTo : saMoveTo,
		saNumber : row.saNumber,
	};
	jsonArray[0] = jsonObject;
	showLoading();
	$.post('../moveAssets.action', {
		saId : row.saId,
		jsonArray : JSON.stringify(jsonArray),
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#moveAssetDlg').dialog('close');
			myTips('迁移成功！', 'success');
			var aa=$(".current").text();
			aa = aa.substring(0,1);
			queryAsset(aa);
		}
	});
}
/**
 * 查看资产详情
 */
function openAssetInfo() {
	$('#assetInfoDlg').dialog({
		title : '资产详细信息',
		top : getTop(500),
		left : getLeft(850),
		width : 850,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function() {
			$('#assetInfoTabs').tabs('select', 0);
		},
		onClose : function() {
			$('#assetInfoDlg [clear="clear"]').val('');
		},
	});
	seeAsset();
	queryAssetFollow();
	$('#assetInfoDlg').dialog('open');
}
/**
 * 加载资产详情数据
 */
function seeAsset() {
	var row = $('#assetDg').datagrid('getSelected');
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
 * 上一条下一条
 */
function laterOrNext(type) {
	$('#assetDg').datagrid('clearChecked');
	var dataIndex = $("#assetInfo_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$("#assetInfo_index").val(num);
			changeData = $('#assetDg').datagrid('getData').rows[num];
			$('#assetDg').datagrid('selectRow', num);
			_indexNum[0] = num;
			queryFollow();
			queryAssetFollow();
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#assetDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#assetInfo_index").val(num);
			changeData = $('#assetDg').datagrid('getData').rows[num];
			$('#assetDg').datagrid('selectRow', num);
			_indexNum[0] = num;
			queryFollow();
			queryAssetFollow();
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	seeAsset();
}
/**
 * 初始化tab
 */
function initTable(index) {
	if (index == '0') {
		seeAsset();
	}
	if (index == '1') {
		check_asset_img();
	}
}
/** *********************************************************资产附件上传start*************************************************************** */
// 电脑上传
function upload_asset_img() {
	var row = $('#assetDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息', '请选择一条记录', 'info');
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
			refresh_asset_img();
		}
	});
	creat_asset_qr();
	$.post('../upload/getUpTokenCallback.action', function(data) {
		var token = data.split('#####')[0];
		var co = data.split('#####')[1];
		$('#uploadDlg input[clear=true]').val('');
		$('#token').val(token);
		$('#co').val(co);
		$('#saId').val(row.saId);
		$('#userName').val(_loginUserName);
		initUploader();
		doCancel_asset_img();
		$('#uploadDlg').dialog('open');
	});
}

// 手机上传
function creat_asset_qr() {
	var row = $('#assetDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息', '请选择一条记录', "info");
		return;
	}
	$.post("../upload/getMobUploadUrl.action", {
		saId : row.saId,
		userName : _loginUserName,
	}, function(data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width : 120,
			height : 120,
			text : data
		});
		doCancel_asset_img();
	});
}

// 查看图片
function check_asset_img() {
	var row = $('#assetDg').datagrid('getSelected');
	if (row) {
		doCancel_asset_img();
		show_asset_img(row.saId);
	} else {
		$.messager.alert('消息', '请选择一条记录', "info");
	}
}
// 删除图片
function remove_asset_img() {
	var file = $('._asset_file');
	if (file.length == 0) {
		$.messager.alert('消息', '没有图片可以删除', "error");
	} else {
		$('#_asset_title').html('请选择要删除的图片').show();
		$('._asset_checkbox').show();
		$('#_asset_btn').show();
	}
}
// 取消删除图片
function doCancel_asset_img() {
	$('#_asset_title').hide();
	$('._asset_checkbox').hide().removeAttr('checked');
	$('#_asset_btn').hide();
}
// 执行删除图片
function doRemove_asset_img() {
	var row = $("#assetDg").datagrid("getSelected");
	var arr = 0;
	var path = '';
	var chk = $('._asset_checkbox');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if (arr > 0) {
		$("#_asset_imgWrapper input[name='image']:checked").each(
				function() { // 遍历选中的checkbox
					path += $(this).parent().children("img").attr('src').split(
							"?")[0]
							+ ',';
					$(this).parent("div").remove(); // 删除包含当前图片的那个div
				});
		$("#_asset_imgWrapper input[name='other']:checked").each(
				function() { // 遍历选中的checkbox
					path += $(this).parent().children("a").attr('href').split(
							"?")[0]
							+ ',';
					$(this).parent("div").remove(); // 删除包含当前图片的那个div
				});
		path = path.substring(0, path.length - 1);// 去掉最后一个逗号
		$.post("../deleteAssetsPic.action", {
			saId : row.saId,
			saPhotos : path,
			registrantName : _loginUserName,
		}, function(data) {
			if (data < 0 || data == '') {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				show_asset_img(row.saId);
			}
		});
		doCancel_asset_img();
	} else {
		$.messager.alert('消息', '未选中任何图片', "error");
	}
}
function show_asset_img(saId) {
	$("#_asset_imgWrapper").empty();
	$
			.post(
					"../queryAssetsCommon.action",
					{
						saId : saId
					},
					function(data) {
						if (data.code < 0) {
							$("#_asset_imgWrapper").append(
									"<p>" + data.msg + "</p>");
							return;
						}
						var path = data.body[0].saPhotos;
						if (path == '' || path == null) {
							$('#_asset_imgNum').html('');
							return;
						}
						path = path.substring(1, path.length - 1);
						var img = eval('([' + path + '])');
						var imgNum = 0;
						var fileNum = 0;
						var urls = "";
						for ( var i in img) {
							if (i == 0) {
								urls += img[i].path;
							} else {
								urls += "," + img[i].path;
							}
						}
						$
								.post(
										"../upload/getDownloadUrl.action",
										{
											baseUrls : urls
										},
										function(data) {
											var newUrls = data.split(",");
											for ( var i in img) {
												var strs = img[i].path
														.split(".");
												var ext = strs[strs.length - 1];
												if (ext.toLocaleLowerCase() != "gif"
														&& ext
																.toLocaleLowerCase() != "jpg"
														&& ext
																.toLocaleLowerCase() != "jpeg"
														&& ext
																.toLocaleLowerCase() != "bmp"
														&& ext
																.toLocaleLowerCase() != "png") {
													if (fileNum == 0) {
														$('#_asset_imgWrapper')
																.append(
																		'<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
													}
													$(
															'#_asset_imgWrapper .fileList')
															.append(
																	'<li>'
																			+ '<input name="other" class="_asset_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">'
																			+ '<a href="'
																			+ newUrls[i]
																			+ '" class="_asset_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'
																			+ img[i].name
																			+ '</a>'
																			+ '</li>');
													fileNum++;

												}
											}
											for ( var i in img) {
												var strs = img[i].path
														.split(".");
												var ext = strs[strs.length - 1];
												var j = parseInt(i)
														+ parseInt(img.length);
												if (ext.toLocaleLowerCase() == "gif"
														|| ext
																.toLocaleLowerCase() == "jpg"
														|| ext
																.toLocaleLowerCase() == "jpeg"
														|| ext
																.toLocaleLowerCase() == "bmp"
														|| ext
																.toLocaleLowerCase() == "png") {
													if (imgNum == 0) {
														$('#_asset_imgWrapper')
																.append(
																		'<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
													}
													$(
															'#_asset_imgWrapper .imageList')
															.append(
																	'<li style="float:left;position:relative;">'
																			+ '<img title="'
																			+ img[i].name
																			+ '" class="_asset_group _asset_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'
																			+ newUrls[i]
																			+ '" src="'
																			+ newUrls[j]
																			+ '">'
																			+ '<input name="image" class="_asset_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">'
																			+ '<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">'
																			+ img[i].name
																			+ '</p>'
																			+ '</li>');
													imgNum++;
												}
											}
											$('#_asset_imgNum').html(
													"图片：" + imgNum + "张    文件："
															+ fileNum + "个");
											$("._asset_group").colorbox({
												rel : '_asset_group',
												transition : "none",
												width : "60%",
												height : "90%"
											});
										});
					});
}
// 刷新
function refresh_asset_img() {
	var row = $("#assetDg").datagrid("getSelected");
	if (row) {
		doCancel_asset_img();
		show_asset_img(row.saId);
	}
}
/** *********************************************************资产附件上传end*************************************************************** */

// 打印资产标识卡
function printAsset() {
	var selRows = $('#assetDg').datagrid('getChecked');
	if (selRows.length == 0) {
		myTips('请勾选需要打印的资产！', 'error');
		return;
	}
	var printArray = [];
	var saIdStr = "";
	for ( var i in selRows) {
		saIdStr += i == 0 ? selRows[i].saId : "," + selRows[i].saId;
		var dizhi = selRows[i].innerVirtualRoom == 0 ? selRows[i].addCommunity
				+ selRows[i].addBuilding + selRows[i].addDoorplateno
				: selRows[i].keyAdministrator;
		printArray.push({
			name : selRows[i].saName,
			pinpai : selRows[i].saBrand == "" ? "定制" : selRows[i].saBrand,
			xinghao : selRows[i].saModel,
			dizhi : dizhi,
			zhuangtai : selRows[i].saStatus,
			nums : selRows[i].saNumber,
			qrcode : "http://fzz1.cn/b?c=" + _loginCompany + "&a="
					+ selRows[i].saId,
		});
	}
	$.post("../printAssetFollow.action", {
		jsonArray : saIdStr
	}, function(data) {

	});
	printArray = JSON.stringify(printArray);
	parent.doPrintInExe(printArray, 7);
}
function changeAssetsType(prefix) {
	var assetsType = $("#" + prefix + "classify").val();
	$("#" + prefix + "name").empty();
	if (assetsType == "") {
		return;
	}
	for ( var i in _assetsType) {
		if (assetsType == _assetsType[i].type) {
			for ( var j in _assetsType[i].name) {
				$("#" + prefix + "name").append(
						'<option value="' + _assetsType[i].name[j] + '">'
								+ _assetsType[i].name[j] + '</option>');
			}
		}
	}
}

function assetFollowInfoDlg(row){
	$('#assetFollowInfoDlg').dialog({
		title : '跟进详细信息',
		top : getTop(200),
		left : getLeft(450),
		width : 450,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#assetFollowInfoDlg span').text('');
		},
	});
	for(var i in row){
		$('#readDownFollow'+i).html(row[i]);
	}
	$('#assetFollowInfoDlg').dialog('open');
}

function queryAssetFollow() {
	$('#assetFollowTable').datagrid({
		columns : [ [ {
			field : 'time',
			title : '跟进时间',
			width : '20%',
			align : 'center'
		}, {
			field : 'registrantName',
			title : '跟进人',
			width : '10%',
			align : 'center'
		}, {
			field : 'agentName',
			title : '经手人',
			width : '10%',
			align : 'center'
		}, {
			field : 'text',
			title : '跟进内容',
			width : '60%',
			align : 'center'
		} ] ],
		width : '100%',
		height : '152px',
		singleSelect : true,
		autoRowHeight : false,
		pageSize : 10,
		scrollbarSize : 0,
		showPageList : false,
		onDblClickRow : function(rowIndex, rowData) {
			var row = $('#assetFollowTable').datagrid('getSelected');
			assetFollowInfoDlg(row);
		}
	});
	var row = $('#assetDg').datagrid('getSelected');
	var data = [];
	if (row.saFollowUp != null && row.saFollowUp != '') {
		var str = row.saFollowUp.getRealJsonStr();
		data = JSON.parse(str);
	}
	$('#assetFollowTable').datagrid('loadData', data.reverse());
}