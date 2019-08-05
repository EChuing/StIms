// 定义一个房源编号变量
var video;
var _houseRentCoding = "";
var cols;
var colsCombo = {};
var _contractNumsArry1 = [];// 未租续签使用
var _hsDatarow;// 未租数据
var _houseRentData;// 已租数据
var _jciJhpId;// 票据打印表id
$(function() {
	querySourceInfo(_pageNum[0], 0);
	// 高级筛选
	advancedScreening(0);
	// 初始化列表
	console.log("Revision:" + Revision2);

	$('#sourceInfoDg').datagrid({
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			if (Revision2 == 0) {
				// 表格行双击事件
				myTips("无查看页面权限！", "error");
				return;
			}
			$("#hsHouseSort_index").val(rowIndex);
			$("#hrHouseRent_index").val(rowIndex);
			_indexNum[0] = rowIndex;

			var row = $('#sourceInfoDg').datagrid('getSelected');
			// 打开详细信息对话框
			$('#roomInfoDlg').dialog({
				title : '<span id="detailedAddress"></span> 已租详细信息',
				top : getTop(600),
				left : getLeft(1150),
				width : 1150,
				height : 600,
				closed : true,
				cache : false,
				modal : true,
				onClose : function() {
					$("#roomInfoDlg input").val('');
					$('#roomInfoDlg textarea').val('');
					$('#roomInfoDlg infoFollowType1').val('');
					$('#roomInfoDlg infoFollowType').val('');
					$('#roomInfoDlg searchLaJciState').val('已付');
					$('#roomInfoDlg searchJciState').val('已收');
				},
			});
			$('#detailedAddress').html(rowData.detailedAddress);
			$('#roomInfoDlg').dialog('open');
			initExistsTable();
		},
		onRowContextMenu : function(e, rowIndex, rowData) {
			e.preventDefault();// 阻止向上冒泡
			$(this).datagrid('unselectAll');
			$(this).datagrid('selectRow', rowIndex);
			$('#menu').menu('show', {
				left : e.pageX,
				top : e.pageY,
				hideOnUnhover : false
			});
		}
	});
	cols = $("#sourceInfoDg").datagrid('getColumnFields');
	// 整租管理--显示/隐藏列--维护列的隐藏
	// colsCombo数据格式: fieldName,"show"
	for ( var i in cols) {
		colsCombo[cols[i]] = "show";
	}

	// 设置默认隐藏的列 当列隐藏的时候 将隐藏的列的名字对应的属性改为hide
	for ( var i in _hrHideCols) {
		$('#sourceInfoDg').datagrid('hideColumn', _hrHideCols[i]);
		for ( var j in colsCombo) {
			if (j == _hrHideCols[i]) {
				colsCombo[j] = "hide";
			}
		}
	}
	// 排序点击事件
	$(document).click(function(e) {
		var clickId = $(e.target).attr('id');
		if (!clickId) {
			$("#theSortDlg").fadeOut();
			return;
		}
		if (clickId == "showTheSortButton" || clickId == "showTheSortjia") {

		} else if (clickId.indexOf("theSortTerm") > -1) {
			var alltheSortTerm = $('.theSortTerm');
			$('.theSortTerm').each(function() {
				$(this).removeClass("theSortTermSelect");
			});
			$("#" + clickId).addClass("theSortTermSelect");
			$('#theSortTermInput').val($("#" + clickId).attr("searchVal"));
			querySourceInfo(1, 0);
		} else if (clickId.indexOf("theSortContrary") > -1) {
			var alltheSortContrary = $('.theSortContrary');
			$('.theSortContrary').each(function() {
				$(this).removeClass("theSortContrarySelect");
			});
			$("#" + clickId).addClass("theSortContrarySelect");
			$('#theSortContraryInput').val($("#" + clickId).attr("searchVal"));
			querySourceInfo(1, 0);
		} else {
			$("#theSortDlg").fadeOut();
		}
	});

	// 整租管理--显示/隐藏列--监听全选
	$("#AllColumns").click(
		function() {
			if ($("#AllColumns").prop('checked')) {
				$("#columnsCheckBox input[type='checkbox']").prop(
					"checked", true);
				$("#AllColumns").prop("checked", true);
			} else {
				$("#columnsCheckBox input[type='checkbox']").prop(
					"checked", false);
				$("#AllColumns").prop("checked", false);
			}
		});
	// 整租管理--显示/隐藏列--监听房屋基本信息全选
	$("#AllHouseSourceColumns").click(
		function() {
			if ($("#AllHouseSourceColumns").prop('checked')) {
				$("#houseSourceColumns input[type='checkbox']").prop(
					"checked", true);
				$("#AllHouseSourceColumns").prop("checked", true);
			} else {
				$("#houseSourceColumns input[type='checkbox']").prop(
					"checked", false);
				$("#AllHouseSourceColumns").prop("checked", false);
			}
		});
	// 整租管理--显示/隐藏列--监听托管信息全选
	$("#AllCustodyColumns").click(function() {
		if ($("#AllCustodyColumns").prop('checked')) {
			$("#custodyColumns input[type='checkbox']").prop("checked", true);
			$("#AllCustodyColumns").prop("checked", true);
		} else {
			$("#custodyColumns input[type='checkbox']").prop("checked", false);
			$("#AllCustodyColumns").prop("checked", false);
		}
	});
	// 整租管理--显示/隐藏列--监听租客信息全选
	$("#AllRenterColumns").click(function() {
		if ($("#AllRenterColumns").prop('checked')) {
			$("#renterColumns input[type='checkbox']").prop("checked", true);
			$("#AllRenterColumns").prop("checked", true);
		} else {
			$("#renterColumns input[type='checkbox']").prop("checked", false);
			$("#AllRenterColumns").prop("checked", false);
		}
	});
	// 增加/修改房源--监听添加钥匙按钮
	$(".add_key_button a").click(
		function() {
			$(".fgsource_house_key").val(
				$(".fgsource_house_key").val() + " " + $(this).text());
		});

	$('.repair_hope_select').on('change', function() {
		hopeTimeVal($(this).val())
	});
	// 按钮点击变色和查询
	$('.houseRentState button').click(function() {
		$('#searchButtonState').val($(this).val());
		$(this).removeClass('btn-success');
		$(this).addClass('btn-info');
		$(this).siblings().removeClass('btn-info').addClass('btn-success');
		$('#searchSource [clear="clear"]').val('');
		querySourceInfo(1, 0);
	});

	// 延迟加载
	setTimeout(function() {
		// 加载下拉列表
		loadSelectList();
		// .select-dept 查部门
		queryDept();
		showFinancilTypeSearch('financilSearch', 'queryFinancial(1,0)');

		// $('#assetsInfoTable').datagrid();
		// $('#assetsInfoTable2').datagrid();
		// $('#preGeneratingBillTable').datagrid();
		$("#sendMessageTable").datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				$(".message_index").val(rowIndex);
				readonlyMessageDlg(rowData);
			}
		});
		for ( var k in _customerType) {
			$('#sendMessageManType').append(
				"<option value = '" + _customerType[k] + "'>"
				+ _customerType[k] + "</option>")
		}
		initDialog('columnsCheckBox');
		initDialog('addSourceInfo');
		initDialog('choseHouse');
		initDialog('choseRenter');
		initDialog('addRepairDlg');
		initDialog('addvirtualRepair');
		initDialog('renterCheckoutDlg');
		initDialog('checkCheckoutDlg');
		initDialog('writeFollowDlg');
		initDialog('showFollowUpImg');
		initDialog('renterRenewDlg');
		initDialog('downFollowInfo');
		initDialog('addTrusteeshipDlg');
		// initDialog('addCheckoutWegDlg');
		// initDialog('addWegDlg');
		// initDialog('addResidentDlg');
		initDialog('addIntendedDlg');
		initDialog('sendMessageDlg');
		initDialog('previewSendMessageDlg');
		initDialog('updateManagerUserDlg');
		initDialog('addEventDlg');
		initDialog('attachmentDlg');
		// initDialog('roomInfoDlg');
		initDialog('readonlyMessageDlg');
		initDialog('moveInAssetsDlg');
		initDialog('assetInfoDlg');
		initDialog('moveOutAssetsDlg');
		initDialog('choseHouseAssetDlg');
		initDialog('addResidentDbDlg');
		initDialog('attachmentDlgHandle');
		initDialog('addCardDlg');
		initDialog('repairInfoDlg');
		initDialog('energyBillDlg');
		initDialog('financialInfoDlg');
		initDialog('seeEventDlg');
		initDialog('handleInfo');
		initDialog('landlordRenewDlg');
		initDialog('sendMessageDlg1');
		// initDialog('depositManagerDlg');
		// initDialog('choseRenter1');
		initDialog('bindDeviceDlg');
		initDialog('operateDeviceDlg');
		initDialog('addDeviceDlg');
		initDialog('generatingATemporaryBillDlg');
		initDialog('pushingCardDlg');
		initDialog('pushingCardDlg1');
	}, 1000);

});
$(".hrefTitle").click(function() {
	var rowIndex = $("#sourceInfoDg").datagrid("getRowIndex",
		$("#sourceInfoDg").datagrid("getSelected"));
	console.log(rowIndex)
	$("#hsHouseSort_index").val(rowIndex);
	$("#hrHouseRent_index").val(rowIndex);
	_indexNum[0] = rowIndex;
	// 打开详细信息对话框
	$('#roomInfoDlg').dialog({
		title : '<span id="detailedAddress"></span> 已租详细信息2',
		top : getTop(600),
		left : getLeft(1150),
		width : 1150,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#roomInfoDlg input").val('');
			$('#roomInfoDlg textarea').val('');
			$('#roomInfoDlg infoFollowType1').val('');
			$('#roomInfoDlg infoFollowType').val('');
			$('#roomInfoDlg searchLaJciState').val('已付');
			$('#roomInfoDlg searchJciState').val('已收');
		},
	});
	$('#detailedAddress')
		.html(
			$("#sourceInfoDg").datagrid("getSelected").detailedAddress);
	$('#roomInfoDlg').dialog('open');
	initExistsTable();
	$("#roomInfoTab").tabs("select",$(this).text().trim());

})
function initExistsTable() {
	// 初始化选项卡
	$('#roomInfoTab').tabs({
		height : 564,
		tabWidth : 70,
		headerWidth : 70,
		tabPosition : 'left',
		onSelect : function(title, index) {
			// 获得点击选项卡的列数，调用表格初始化
			initTable(title);
		}
	});
	/*if($("#roomInfoTab").tabs('exists','已租详情')){
		initTable("已租详情");
		$("#roomInfoTab").tabs("select","已租详情")
	} else */
	if ($('#roomInfoTab').tabs('exists', '租客信息')) {
		initTable('租客信息');
		$("#roomInfoTab").tabs("select", '租客信息');
	} else if ($('#roomInfoTab').tabs('exists', '业主信息')) {
		initTable('业主信息');
		$("#roomInfoTab").tabs("select", '业主信息');
	} else if ($('#roomInfoTab').tabs('exists', '房屋收支')) {
		initTable('房屋收支');
		$("#roomInfoTab").tabs("select", '房屋收支');
	} else if ($('#roomInfoTab').tabs('exists', '业主账单')) {
		initTable('业主账单');
		$("#roomInfoTab").tabs("select", '业主账单');
	} else if ($('#roomInfoTab').tabs('exists', '租客账单')) {
		initTable('租客账单');
		$("#roomInfoTab").tabs("select", '租客账单');
	} else if ($('#roomInfoTab').tabs('exists', '客户信息')) {
		initTable('客户信息');
		$("#roomInfoTab").tabs("select", '客户信息');
	} else if ($('#roomInfoTab').tabs('exists', '家私电器')) {
		initTable('家私电器');
		$("#roomInfoTab").tabs("select", '家私电器');
	} else if ($('#roomInfoTab').tabs('exists', '合约记录')) {
		initTable('合约记录');
		$("#roomInfoTab").tabs("select", '合约记录');
	} else if ($('#roomInfoTab').tabs('exists', '短信记录')) {
		initTable('短信记录');
		$("#roomInfoTab").tabs("select", '短信记录');
	} else if ($('#roomInfoTab').tabs('exists', '房间照片')) {
		initTable('房间照片');
		$("#roomInfoTab").tabs("select", '房间照片');
	} else if ($('#roomInfoTab').tabs('exists', '能源卡号')) {
		initTable('能源卡号');
		$("#roomInfoTab").tabs("select", '能源卡号');
	} else if ($('#roomInfoTab').tabs('exists', '维保记录')) {
		initTable('维保记录');
		$("#roomInfoTab").tabs("select", '维保记录');
	} else if ($('#roomInfoTab').tabs('exists', '审批记录')) {
		initTable('审批记录');
		$("#roomInfoTab").tabs("select", '审批记录');
	} else if ($('#roomInfoTab').tabs('exists', '任务记录')) {
		initTable('任务记录');
		$("#roomInfoTab").tabs("select", '任务记录');
	} else if ($('#roomInfoTab').tabs('exists', '门上管理')) {
		initTable('门上管理');
		$("#roomInfoTab").tabs("select", '门上管理');
	}
}

function selectNum() {
	$.post("../selectButtonNumAll.action", {
	}, function(data) {
		if (data.code > 0) {
			data = data.body;
			$('.houseRentState .totalNum0').html(
				'（' + data[0].kuaidaoqiNum + '）');
			$('.houseRentState .totalNum1').html(
				'（' + data[0].zhuanzuNum + '）');
			$('.houseRentState .totalNum2').html(
				'（' + data[0].daoqiNum + '）');
			$('.houseRentState .totalNum3').html(
				'（' + data[0].weibaoNum + '）');
			$('.houseRentState .totalNum4').html(
				'（' + data[0].yuqiNum + '）');
		}
	});
}
// 加载下拉列表
function loadSelectList() {
	for ( var i in _loginCompanyRentDistrict) {
		$("#sourceDistrict").append(
			"<option value = '" + _loginCompanyRentDistrict[i] + "'>"
			+ _loginCompanyRentDistrict[i] + "</option>");
		$('#choseDistrict').append(
			'<option value="' + _loginCompanyRentDistrict[i] + '">'
			+ _loginCompanyRentDistrict[i] + '</option>');
	}
	$("#taskAffairsRepairResponsibility").append(
		"<option value = '负责人'>负责人</option>");
	for ( var i in _payType) {
		$('.financial_payType').append(
			"<option value='" + _payType[i] + "'>" + _payType[i]
			+ "</option>");
	}
	for ( var i in _taskType) {
		$("#taskrepairTypeRp").append(
			"<option value = '" + _taskType[i] + "'>" + _taskType[i]
			+ "</option>");
		$("#repairTypeRp").append(
			"<option value = '" + i + "'>" + _taskType[i] + "</option>");
	}
	$("#repairResponsibility").append("<option value = '负责人'>负责人</option>");
	for (var i = 0; i < _househrState.length; i++) {
		$(".add_source_state")
			.append(
				"<option value = '" + i + "'>" + _househrState[i]
				+ "</option>");
		$(".add_trusteeship_state")
			.append(
				"<option value = '" + i + "'>" + _househrState[i]
				+ "</option>");
	}
	for (var i = 0; i < _sectionType.length; i++) {
		$(".add_source_sectionType").append(
			"<option value = '" + i + "'>" + _sectionType[i] + "</option>");
		$(".add_trusteeship_sectionType").append(
			"<option value = '" + i + "'>" + _sectionType[i] + "</option>");
	}
	for (var i = 0; i < _houseType.length; i++) {
		$(".add_source_houseType").append(
			"<option value = '" + i + "'>" + _houseType[i] + "</option>");
		$(".add_trusteeship_houseType").append(
			"<option value = '" + i + "'>" + _houseType[i] + "</option>");
	}
	for (var i = 0; i < _contractType.length; i++) {
		$(".add_source_contract_type").append(
			"<option value = '" + _contractType[i] + "'>"
			+ _contractType[i] + "</option>");
		$(".add_trusteeship_contract_type").append(
			"<option value = '" + _contractType[i] + "'>"
			+ _contractType[i] + "</option>");
		$("#addHrContractType").append(
			"<option value = '" + _contractType[i] + "'>"
			+ _contractType[i] + "</option>");
	}
	for (var i = 0; i < _hrPaymentType.length; i++) {
		$(".add_payment_type").append(
			"<option value = '" + _hrPaymentType[i] + "'>"
			+ _hrPaymentType[i] + "</option>");
	}
	for ( var i in _eventApprovalType) {
		$('.eventType').append(
			"<option value='" + _eventApprovalType[i] + "'>"
			+ _eventApprovalType[i] + "</option>");
		$('#searchEventType').append(
			"<option value='" + _eventApprovalType[i] + "'>"
			+ _eventApprovalType[i] + "</option>");
	}
	for (var i = 0; i < _bankType.length; i++) {
		$(".add_source_bank_type").append(
			"<option value = '" + i + "'>" + _bankType[i] + "</option>");
		$(".add_trusteeship_bank_type").append(
			"<option value = '" + i + "'>" + _bankType[i] + "</option>");
	}
	for (var i = 0; i < _repHopeTime.length; i++) {
		$(".repair_hope_select").append(
			"<option value = '" + _repHopeTime[i] + "'>" + _repHopeTime[i]
			+ "</option>");
	}
	for (var i = 0; i < _repResponsibility.length; i++) {
		$("#maRepairResponsibility").append(
			"<option value = '" + _repResponsibility[i] + "'>"
			+ _repResponsibility[i] + "</option>");
		$(".repair_responsibility").append(
			"<option value = '" + i + "'>" + _repResponsibility[i]
			+ "</option>");
	}
	for (var i = 0; i < _eventType.length; i++) {
		$("#marepairTypeRp").append(
			"<option value = '" + _eventType[i] + "'>" + _eventType[i]
			+ "</option>");
		$(".repair_type_rp").append(
			"<option value = '" + i + "'>" + _eventType[i] + "</option>");
	}
	for (var i = 0; i < _renterCheckoutNature.length; i++) {
		$("#checkout_checkoutNature").append(
			"<option value = '" + i + "'>" + _renterCheckoutNature[i]
			+ "</option>");
		$("#renterCheckoutWhy").append(
			"<option value = '" + i + "'>" + _renterCheckoutNature[i]
			+ "</option>");
	}
	for ( var i in _acountType) {
		$('.add_financial_way').append(
			"<option value='" + i + "'>" + _acountType[i] + "</option>");
	}
	for (var i = 0; i < _direction.length; i++) {
		$(".add_trusteeship_direction").append(
			"<option value = '" + i + "'>" + _direction[i] + "</option>");
	}
	for (var i = 0; i < _followWay.length; i++) {
		$(".follow_way").append(
			"<option value = '" + i + "'>" + _followWay[i] + "</option>");
	}
	for ( var i in _theOwnershipType) {
		$('#searchJfTheOwnershipType').append(
			"<option value='" + i + "'>" + _theOwnershipType[i]
			+ "</option>");
	}
	for ( var i in _saUse) {
		$('#searchSaUse').append(
			"<option value='" + i + "'>" + _saUse[i] + "</option>");
	}
	for ( var i in _saType) {
		$('#searchSaType').append(
			"<option value='" + _saType[i] + "'>" + _saType[i]
			+ "</option>");
	}
	for ( var i in _saType) {
		$('#add_asset_type').append(
			'<option value="' + _saType[i] + '">' + _saType[i]
			+ '</option>');
	}
	for ( var i in _assetsType) {
		$('#add_asset_classify').append(
			'<option value="' + _assetsType[i].type + '">'
			+ _assetsType[i].type + '</option>');
	}
	for ( var i in _saUse) {
		$('#add_asset_use').append(
			'<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
	}
	for ( var i in _saStatus) {
		$('#add_asset_status').append(
			'<option value="' + _saStatus[i] + '">' + _saStatus[i]
			+ '</option>');
	}
}

// 高级筛选
function advancedScreening(num) {
	if (num == 0) {// 普通筛选
		$('.advancedScreening').css({
			"height" : "25px",
			"width" : '750px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('.advanced2').css({
			"height" : "0px",
		})
		$('#screening').attr('onclick', 'advancedScreening(1)');
	} else if (num == 1) {// 高级筛选
		$('.advancedScreening').css({
			"height" : "60px",
			"width" : '100%',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('.advanced2').css({
			"height" : "28px",
		})
		$('#screening').attr('onclick', 'advancedScreening(0)');
	}
}

// 房屋状态联动
function querySourceInfoState(type) {
	querySourceInfo(1, 0);
}

// 添加任务窗口
function addvirtualRepair() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	$("#addvirtualRepair").dialog(
		{
			title : "添加任务",
			top : getTop(330),
			left : getLeft(480),
			width : 380,
			height : 330,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#addvirtualRepair [clear="clear"]').val('');
				$('#addvirtualRepair [clean="clean"]').html('');
				$('#addvirtualRepair [noos="noos"]').val('');
				$('#addvirtualRepair [require]').css('border',
					'1px solid #a9a9a9');
				$(".errMsg1").val('');
				clearAttachment();
			},
			onOpen : function() {
				$("#repairName").removeAttr("require");
				$("#repairPhone").removeAttr("require");
				$("#repairHopeTime").val("尽快");
			}
		});
	$('.do_overDiv').hide();
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	var myDate = getNowFormatDate();
	$("#repairReportingTime").val(myDate);
	$("#repairUserId").val(_loginUserId);
	$("#repairUserName").val(_loginUserName);
	$("#repHouse4rentId").val(_houseRentCoding);
	$("#repairHouseStoreCoding").val(_houseStoreCoding);
	$("#repairHouseCoding").val(_houseCoding);
	$("#repairName").val(row.renterPopName);
	$("#repairPhone").val(row.renterPopTelephone);
	$("#repairHouseType").val('已租任务');
	$("#addvirtualRepair").dialog('open');
}
// 添加任务
function doAddvirtualRepair(type) {
	$('.do_overDiv').show();
	var houseRentCoding, houseStoreCoding, houseCoding, repTime, repName, repPhone, repHopeTime, repRespon, repUserId, repEvent, repTypeRp, repRepairPeopleId, repTaskTime, att;
	if (type == 0) {
		houseRentCoding = $("#repHouse4rentId").val();
		houseStoreCoding = $("#repairHouseStoreCoding").val();
		houseCoding = $("#repairHouseCoding").val();
		repTime = $("#repairReportingTime").val();
		repName = $("#repairName").val();
		repPhone = $("#repairPhone").val();
		repHopeTime = $("#repairHopeTime").val();
		repRespon = $("#repairResponsibility").find("option:selected").text();
		repUserId = $("#repairUserId").val();
		repEvent = $("#repairEventRp").val();
		repTypeRp = $("#repairTypeRp").find("option:selected").text();
		repRepairPeopleId = $("#doTaskGetUserId").val();
		repTaskTime = getTaskTime();
		att = $("#att").val();
		repUserId = _loginUserId;
		type = "任务";
	}
	if (type == 1) {
		var row = $('#sourceInfoDg').datagrid('getSelected');
		var adminFlagState = $("#adminFlagState").val();
		if (adminFlagState == 1) {
			houseRentCoding = row.hrId;
		} else {
			houseRentCoding = null;
		}
		houseStoreCoding = row.hrHouse4storeId;
		houseCoding = row.hrHouseId;
		repName = $('#taskAffairsrepairName').val();
		repPhone = $('#taskAffairsrepairPhone').val();
		repRespon = $('#taskAffairsRepairResponsibility').val();
		repEvent = $('#writeFollowNote').val();
		repHopeTime = $("#repair_hope_time4").val();
		repRepairPeopleId = $("#taskAffairsGetUserId").val();
		repUserId = _loginUserId;
		repTime = getNowFormatDate();
		repTypeRp = $('#taskrepairTypeRp').val();
		repTaskTime = getTaskTime();
		att = '';
		repUserId = _loginUserId;
		type = "任务";
	}

	/*
	 * if(repTypeRp == ""){ myTips("请选择任务类型！", "error");
	 * $('.do_overDiv').hide(); return; } if(repRepairPeopleId == ""){
	 * myTips("请选择负责人！", "error"); $('.do_overDiv').hide(); return; }
	 * if(repHopeTime == ""){ myTips("请填写期望时间！", "error");
	 * $('.do_overDiv').hide(); return; } if(repEvent == ""){ myTips("请填写任务描述！",
	 * "error"); $('.do_overDiv').hide(); return; }
	 */
	$.post("../insertRepair.action", {
		repHouse4rentId : houseRentCoding,
		repHouse4storeId : houseStoreCoding,
		repHouseId : houseCoding,
		repContacts : repName,
		repContactsPhone : repPhone,
		repResponsibility : repRespon,
		repEventRp : repEvent,
		repHopeTime : repHopeTime,
		repRepairPeopleId : repRepairPeopleId,
		repUserId : repUserId,
		repReportingTime : repTime,
		repTypeRp : repTypeRp,
		repDepartment : _loginDepartment,
		repStorefront : _loginStore,
		repTaskTime : repTaskTime,
		att : att,
		type : type,
	}, function(data) {
		if (data.code < 0) {
			myTips("添加失败！", "error");
			$('.do_overDiv').hide();
			return;
		}
		isSave = true;
		sendTaskSMS(type);
		if (type == 0) {
			myTips("添加成功！", "success");
		} else {
			myTips("跟进成功！", "success");
		}
		$('.do_overDiv').hide();
	});
}
// 任务短信发送
function sendTaskSMS(type) {
	if ($('#sendTaskMessageRemind').prop("checked")) {// ||
		// $('#taskAffairsshorMessage').prop("checked")
		var row = $('#sourceInfoDg').datagrid('getSelected');
		var repairUserId, repTypeRp1, smNotRentId, address, addCommunity, popName, popTel, repHopeTime, repairDescribe, repairJson, smRentId;
		address = '' + _hrAddCommunity + _hrAddBuilding + _hrAddDoorplateno;
		addCommunity = '';
		if (address == '' || address == null) {
			address = '无归属任务';
		}
		if (type == 0) {
			repairUserId = $('#move_add_asset_staff').val();
			repTypeRp1 = $("#repairTypeRp").find("option:selected").text();
			smRentId = $('#repHouse4rentId').val();
			smNotRentId = $('#repairHouseStoreCoding').val();
			popName = $('#repairName').val();
			popTel = $('#repairPhone').val();
			repHopeTime = $('#repairHopeTime').val();
			repairDescribe = $('#repairEventRp').val() + "负责人："
				+ _loginUserName;
		}
		if (type == 1) {
			var adminFlagState = $("#adminFlagState").val();
			if (adminFlagState == 1) {
				smRentId = row.hrId;
				smNotRentId = row.hrHouse4storeId;
			} else {
				smRentId = null;
				smNotRentId = row.hrHouse4storeId;
			}
			repairUserId = $('#taskAffairsGetUserId').val();
			repTypeRp1 = $("#taskrepairTypeRp").val();
			popName = $('#taskAffairsrepairName').val();
			popTel = $('#taskAffairsrepairPhone').val();
			repHopeTime = $('.repair_hope_time').val();
			repairDescribe = $('#writeFollowNote').val() + "负责人："
				+ _loginUserName;
		}

		repairJson = {
			smUserId : repairUserId,
			smRentId : smRentId,
			smNotRentId : smNotRentId,
			repairEvenType : repTypeRp1,
			addCommunity : address,
			popName : popName,
			popTelephone : popTel,
			hopeTime : repHopeTime,
			repairDescribe : repairDescribe,
		};
		$.post("../massage/sendRepairMsg.action", repairJson, function(data) {
			if (data.code) {
				// myTips("短信发送失败!","error");
				$("#addvirtualRepair").dialog('close');
				$("#writeFollowDlg").dialog('close');
				virtualRepair(1, 0);
				return;
			}
			$("#addvirtualRepair").dialog('close');
			$("#writeFollowDlg").dialog('close');
			virtualRepair(1, 0);
		});
	} else {
		$("#addvirtualRepair").dialog('close');
		$("#writeFollowDlg").dialog('close');
		virtualRepair(1, 0);
		return;
	}
}

$('#doorCardFeeCheck').click(function() {
	$('#doorCardFeeDeposit').val('');
	$('#doorCardMaterialFee').val('');
	$('#doorCardFee').toggle();
})

$('#sendDoorCardCheck').click(function() {
	$('#doorCardFeeDeposit1').val('');
	$('#doorCardMaterialFee1').val('');
	$('#sendDoorCard').toggle();
})

$('#doorCardFeeCheck1').click(function() {
	$('#doorCardFeeDeposit1').val('');
	$('#doorCardMaterialFee1').val('');
	$('#doorCardFee1').toggle();
})
function danji() {
	console.log($(".deviceName2[type='checkbox']").is(':checked'));
	if($(".deviceName2[type='checkbox']").is(':checked')){
		console.log("========="+$("#photoUpload").text());
		$("#photoUpload").css('display','block');
		$("#photoDlgs").css('display','block');
		console.log("_loginCoId"+_loginCoId);
	}else{
		$("#photoUpload").css('display','none');
		$("#photoDlgs").css('display','none');
	}
}



/**
 * 发卡
 */

function pushingCard(type) {
	var hsId = _houseStoreCoding;
	chaDevice(hsId, type);
}

$("#selectRentan").change(
	function() {
		if ($("#selectRentan option:selected").val() != "") {
			var row = $("#sourceInfoDg").datagrid("getSelected")
			var hrId = row.hrId;
			var jdcPopId = $("#selectRentan option:selected").val();
			$.ajax({
				type : "post",
				url : "../listDoorCard.action",
				data : {
					jdcPopId : jdcPopId,
					jdcHrId	 : hrId
				},
				dataType : "json",
				success : function(result) {
					if (result.code == 1) {
						var data = result.body;
						for ( var a in data) {
							data[a].houseAddrss = data[a].hrAddCommunity
								+ data[a].hrAddBuilding
								+ data[a].hrAddDoorplateno;
						}
						$("#populationDoorLockDg").datagrid("loadData",data);
					} else {
						$('#populationDoorLockDg').datagrid({
							data : [],
							view : myview,
							emptyMsg : result.msg
						});
					}
				}
			});
		} else {
			$("#populationDoorLockDg").datagrid("loadData", {
				total : 0,
				rows : []
			});
		}
	});

function selectRentan() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	var hrId = row.hrId;
	$.ajax({
		type : "post",
		url : "../selectPopulationByHrId.action",
		data : {
			hrId : hrId
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 1) {
				var data = result.body;
				var html = '<option value=""></option>';
				for ( var a in data) {
					if (data[a].popRenter == 1 || data[a].popResident == 1) {
						html += '<option value="' + data[a].popId + '">' + data[a].popName + '</option>';
					}
				}
				$('#selectRentan').html(html);
			} else {
				myTips(result.msg, "error");
			}
		}
	});
}

function chaDevice(hsId, type) {
	$.ajax({
		type : "post",
		url : "../selectThisHouseDeviceID.action",
		data : {
			jhdHsId : hsId
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 1) {
				var data = result.body;
				console.log(data);
				var doorLock = [];
				for ( var i in data) {
					var brandType = data[i].brandType;
					console.log(brandType);
					if (brandType == "门锁" || brandType == "智能卡锁" || brandType == "门禁锁") {
						doorLock.push(data[i]);
					} else if (data[i].devBrandId == 20 && data[i].devFirstType == 3
						&& (data[i].devSecondType ==22 || data[i].devSecondType ==23 || data[i].devSecondType ==24 || data[i].devSecondType == 40 )) {
						doorLock.push(data[i]);
					}
				}
				if (doorLock.length == 0) {
					$.messager.alert("", "该房间没有符合发卡的智能设备");
				} else {
					var html = "";
					for ( var i in doorLock) {
						console.log(doorLock[i]);
						if(doorLock[i].devSecondType == 33){
							html += doorLock[i].devNickname+":"
								+ '<input name="lock" class="deviceName2" style="margin:0 10px 0 0" onclick="danji()"type="checkbox"  value=\''
								+ JSON.stringify(doorLock[i])
								+ '\'  />';
							if (i == 1) {
								html += '<div style="clear:both" ></div>';
							}
						}else{
							html += doorLock[i].devNickname+":"
								+ '<input name="lock" style="margin:0 10px 0 0" type="checkbox"  value=\''
								+ JSON.stringify(doorLock[i])
								+ '\'  /><div style="clear:both" ></div>';
							if (i == 1) {
								html += '<div style="clear:both" ></div>';
							}
						}

					}
					if (type == 1) {
						$('#pushingCardSelect').html(html);
						openPushingCard();
					} else if (type == 2) {
						$('#pushingCardSelect1').html(html);
						$("#pushingCardDlg1").dialog('open');
					}

				}

			} else {
				myTips(result.msg, "error");
			}
		}
	});
}

function openPushingCard() {
	$("#pushingCardDlg").dialog({
		title : '授权',
		top : getTop(230),
		left : getLeft(400),
		width : 400,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#pushingCardDlg input").val('');
			$("#pushingCardDlg textarea").val('');
			$("#pushingCardDlg select").val('');

		}
	});
	var row = $('#sourceInfoDg').datagrid('getSelected');
	$('#pushingTime').val(row.hrEndTime);
	$("#pushingCardDlg").dialog('open');
	$("#cardId").focus();
}
//储存视频音频
var MediaStreamTrack;
//拍照上传
function new_page( ) {
	$("#photoDlg").dialog({
		title : '拍照',
		top : getTop(600),
		left : getLeft(700),
		width : 700,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			//循环关闭音频视频
			MediaStreamTrack.forEach(function (Track) {
				Track.stop();
			});

		}
	});
	console.log("进来了?")
	/**
	 * 调用摄像头
	 */
		//设置摄相机宽高
	var opt = {
			audio: true,
			video: {
				//摄像宽高
				width: 150,
				height: 200
			}
		};
	//调用摄像机
	var Devicestate = navigator.mediaDevices.getUserMedia(opt);
	Devicestate.then(function(mediaStream) {
		MediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks();
		video = document.querySelector('video');
		video.srcObject = mediaStream;
		video.onloadedmetadata = function(e) {
			video.play();
		};
	});
	//用户拒绝使用,或者没有摄像头
	Devicestate.catch(function(err) {
		$("#RepeatedWarnings").text("用户拒绝使用摄像头,或者没有摄像头!");
		$("#RepeatedWarnings").show();
		var err = err.name;
		console.log(err);
	});
	$("#photoDlg").dialog("open");
}

/**
 * 展示发卡
 */
function showAddDoorCart() {
	$("#pushingCardDlg1").dialog({
		title : '授权',
		top : getTop(430),
		left : getLeft(380),
		width : 380,
		height : 430,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#pushingCardDlg1 input").val('');
			$("#pushingCardDlg1 textarea").val('');
			$("#pushingCardDlg1 select").val('');
			$("#photoUpload").css('display','none');
			$("#photoDlgs").css('display','none');
			//清空摄像头残留的照片
			$("#imgwrap ul li").remove();
			//隐藏警告语句
			$("#RepeatedWarnings").css('display','none');
			$("#populationDoorLockDg").datagrid("loadData",[]);

			assistingAffairs1(-1);
			$('#SmartDoor').val(0);
			$('#PasswordDoor').val(0);
			$('#UnlockingTimes').val(0);
			$('#UnlockingPeriod').val(0);
		}
	});
	var row = $('#sourceInfoDg').datagrid('getSelected');
	$('#pushingTime1').val(row.hrEndTime);
	$('#pushingTime2').val(row.hrEndTime);

	$('#SmartDoor').val(0);
	$('#PasswordDoor').val(0);
	$('#UnlockingTimes').val(0);
	$('#UnlockingPeriod').val(0);

	pushingCard(2);
	selectRentan();

}

//yzs授权方式处理
function assistingAffairs1(type){
	if(type == 0){//授权开锁次数
		$('#PasswordDoor').val(0);
		$('#UnlockingPeriod').val(0);
		$('#UnlockingTimes').val(0);
		var num = $('#SmartDoor').val();
		if(num == 0){
			$('#PasswordDoor').prop("checked",false);
			$('#UnlockingTimes').prop("checked",false);
			$('#UnlockingPeriod').prop("checked",false);
			$('#doorCardFeeCheck1Div').show();
			$('#cardId1Div').show();
			$('#pushingTimeDiv').show();
			$('#doorCardNum1Div').show();

			$('#pwdUnlockSelect').hide();
			$('#MaxNumber').hide();
			$('#DeadlineTimeDiv').hide();
			$('#SmartDoor').val(1);

			$('#cardId1').val("");
			$('#doorCardNum1').val("");
			$('#authorizeTimes').val("");

			$('#pushingCardDlg1').dialog({
				height:"440"
			}).dialog("open");
		}else{
			$('#pwdUnlockSelect').hide();
			$('#MaxNumber').hide();
			$('#DeadlineTimeDiv').hide();
			$('#cardId1Div').hide();
			$('#pushingTimeDiv').hide();
			$('#doorCardNum1Div').hide();
			$('#SmartDoor').val(0);
			$('#cardId1').val("");
			$('#doorCardNum1').val("");
			$('#pushingCardDlg1').dialog({
				height:"400"
			}).dialog("open");
		}
	}else if(type == 1){
		//密码授权
		$('#SmartDoor').val(0);
		$('#UnlockingPeriod').val(0);
		$('#UnlockingTimes').val(0);
		var num = $('#PasswordDoor').val();
		if(num == 0){
			$('#SmartDoor').prop("checked",false);
			$('#UnlockingTimes').prop("checked",false);
			$('#UnlockingPeriod').prop("checked",false);
			$('#doorCardFeeCheck1Div').hide();
			$('#cardId1Div').hide();
			$('#pushingTimeDiv').hide();
			$('#doorCardNum1Div').hide();
			$('#pwdUnlockSelect').show();

			$('#PasswordDoor').val(1);
			$('#cardId1').val("");
			$('#doorCardNum1').val("");
			$('#authorizeTimes').val("");
			$('#pushingCardDlg1').dialog({
				height:"440"
			}).dialog("open");
		}else{
			$('#doorCardFeeCheck1Div').hide();
			$('#pwdUnlockSelect').hide();
			$('#MaxNumber').hide();
			$('#DeadlineTimeDiv').hide();
			$('#UnlockingTimes').prop("checked",false);
			$('#UnlockingPeriod').prop("checked",false);

			$('#PasswordDoor').val(0);
			$('#cardId1').val("");
			$('#doorCardNum1').val("");
			$('#authorizeTimes').val("");
			$('#pushingCardDlg1').dialog({
				height:"400"
			}).dialog("open");
		}
	}else if(type == 2){
		//授权开锁次数
		$('#UnlockingPeriod').val(0);
		var num = $('#UnlockingTimes').val();
		if(num == 0){
			$('#UnlockingPeriod').prop("checked",false);
			$('#MaxNumber').show();
			$('#DeadlineTimeDiv').hide();
			$('#UnlockingTimes').val(1);
			$('#pushingCardDlg1').dialog({
				height:"480"
			}).dialog("open");
		}else{
			$('#MaxNumber').hide();
			$('#DeadlineTimeDiv').hide();
			$('#UnlockingTimes').val(0);
			$('#authorizeTimes').val("");
			$('#pushingCardDlg1').dialog({
				height:"440"
			}).dialog("open");
		}

	}else if(type == 3){
		//授权开锁期限
		$('#UnlockingTimes').val(0);
		var num = $('#UnlockingPeriod').val();
		if(num == 0){
			$('#UnlockingTimes').prop("checked",false);
			$('#MaxNumber').hide();
			$('#DeadlineTimeDiv').show();
			$('#UnlockingPeriod').val(1);
			$('#authorizeTimes').val("");
			$('#pushingCardDlg1').dialog({
				height:"480"
			}).dialog("open");
		}else{
			$('#MaxNumber').hide();
			$('#DeadlineTimeDiv').hide();
			$('#UnlockingPeriod').val(0);
			$('#pushingCardDlg1').dialog({
				height:"440"
			}).dialog("open");
		}
	}else{
		$('#SmartDoor').prop("checked",false);
		$('#PasswordDoor').prop("checked",false);
		$('#UnlockingTimes').prop("checked",false);
		$('#UnlockingPeriod').prop("checked",false);
		$('#cardId1Div').hide();
		$('#pwdUnlockSelect').hide();
		$('#MaxNumber').hide();
		$('#DeadlineTimeDiv').hide();
		$('#pushingTimeDiv').hide();
		$('#doorCardNum1Div').hide();
		$('#doorCardFeeCheck1Div').hide();
		$('#cardId1').val("");
		$('#doorCardNum1').val("");
		$('#authorizeTimes').val("");
	}
}
function watchInput() {
	if ($('#cardId').val() != "") {
		$('#shouquan').show();
	} else {
		$('#shouquan').hide();
	}
}

// 执行发卡
function doPushingCard1() {
    var att = $("#att").val();
    var img='';
    if(typeof($("#imgwrap img:eq(0)").attr("src")) != "undefined" && ($("#imgwrap img:eq(0)").attr("src")) !='') {
        img = img+($("#imgwrap img:eq(0)").attr("src"));
    }
    if(typeof($("#imgwrap img:eq(1)").attr("src")) != "undefined" && ($("#imgwrap img:eq(1)").attr("src")) !='') {
        img = img+"-"+($("#imgwrap img:eq(1)").attr("src"));
    }
    if(typeof($("#imgwrap img:eq(2)").attr("src")) != "undefined" && ($("#imgwrap img:eq(2)").attr("src")) !='') {
        img = img+"-"+($("#imgwrap img:eq(2)").attr("src"));
    }
    console.log(img);
    var obj = document.getElementsByName("lock");
    console.log(obj);
    var lockArray = [];
    var lockName = " ";
    for (k in obj) {
        if (obj[k].checked) {
            lockArray.push(JSON.parse(obj[k].value))
            lockName += JSON.parse(obj[k].value).devNickname;
            lockName += " "
        }
    }
	if(lockName==" "){
		myTips("请选择门锁", "error");
	}
    var row = $('#sourceInfoDg').datagrid('getSelected');
    var jdcHsId = row.hrHouse4storeId;
    var popId = row.popId;
    var hrId = row.hrId;
    var renterId = row.hrRenterId;
    var popId = $("#selectRentan option:selected").val();//租客
    if (popId == null || popId == "") {
        myTips("请选择发卡人", "error");
        return;
    }

    var landlordId = row.hrLandlordId;
    var cardId = $('#cardId1').val();//授权
    var jdcDeadlineTime = $('#pushingTime1').val();//期限
    var doorCardNum = $('#doorCardNum1').val();//卡号


    var doorCardFeeDeposit = $('#doorCardFeeDeposit1').val();//
    var doorCardMaterialFee = $('#doorCardMaterialFee1').val();

    var doorCardFeeDepositText = doorCardFeeDeposit > 0 ? "门卡押金"
        + doorCardFeeDeposit + "," : '';
    var doorCardMaterialFeeText = doorCardMaterialFee > 0 ? "门卡工本费"
        + doorCardMaterialFee : '';
    var popName = $("#selectRentan option:selected").text();
    var operatingRecording = {
        text : "门卡授权：为客户 " + popName + " 发放" + lockName + "的门卡，卡号"
            + doorCardNum + "，有效期至：" + jdcDeadlineTime + "，收取费用"
            + doorCardFeeDepositText + doorCardMaterialFeeText + "。",
        time : new Date().format("yyyy-MM-dd hh:mm:ss"),
        type : "系统跟进",
        registrantName : _loginUserName
    }
    //智能锁数据
	var jdcOperatingRecording = "[" + JSON.stringify(operatingRecording) + "]";
	var inseratData = {
		personType : "租客",
		img : img,
		popId :popId,
		att :att,
		popName : popName,
		coid : _loginCoId,
		jdcHrId : hrId,
		jdcHsId : jdcHsId,
		departmentId : _loginDepartment,
		storefrontId : _loginStore,
		registerPeopleId : _loginUserId,
		landlordId : landlordId,
		renterId : renterId,
		jdcPopId : popId,
		jdcState : '使用中',
		jdcCardId : cardId,
		jdcDeadlineTime : jdcDeadlineTime,
		jdcCardNum : doorCardNum,
		doorCardFeeDeposit : doorCardFeeDeposit > 0 ? doorCardFeeDeposit : 0,
		doorCardMaterialFee : doorCardMaterialFee > 0 ? doorCardMaterialFee : 0,
		jdcOperatingRecording : jdcOperatingRecording,
	}
	/*----------------------------------------------*/
	//yzs密码锁信息    密码锁不收费用  密码随机生成8位数
	//密码锁数据
	var dataMsg ={};
	//var jdcDeviceId;
	var coId =_loginCoId;
	var devId,brandId ,devUsername,devPassword,devAuthId,devAuthSecret,devFirstType,devSecondType;
	var authorizeTimes = $('#authorizeTimes').val();//次数
	var pushingTime2 = $('#pushingTime2').val();//期限
	/*----------------------------------------------*/

	var doorCardJson = "";
	for ( var i in lockArray) {
		inseratData.jdcDeviceId = lockArray[i].id;
		//jdcDeviceId = lockArray[i].id;
		devId =lockArray[i].id;
		brandId =lockArray[i].devBrandId;
		devUsername =lockArray[i].devUsername;
		devPassword =lockArray[i].devPassword;
		devAuthId =lockArray[i].devAuthId;
		devAuthSecret =lockArray[i].devAuthSecret;
		devFirstType =lockArray[i].devFirstType;
		devSecondType =lockArray[i].devSecondType;
		if (lockArray[i].devAuthNum != null && lockArray[i].devAuthNum != '') {
			inseratData.jdcAuthNum = lockArray[i].devAuthNum
		}
		if (i == 0) {
			doorCardJson += JSON.stringify(inseratData);
		} else {
			doorCardJson += "," + JSON.stringify(inseratData);
		}
	}
    //如果选中密码锁
    if($("#PasswordDoor").is(":checked")){
		var smPopId = $("#selectRentan option:selected").val();
		var doorPwd="";//随机生成8位数密码
		for(var i=0; i<8; i++){
			var n = Math.round(Math.random()*10);
			doorPwd += n;
		}
		console.log(doorPwd);
		dataMsg = {
			jdcHrId : hrId,
			jdcHsId : jdcHsId,
			jdcPopId : popId,
			jdcDeviceId :devId,
			jdcState : '使用中',
			jdcPassword: doorPwd,
			jdcOperatingRecording : jdcOperatingRecording
		}
		var giveRenterJson= {
			smPopId 	: smPopId, //接收人id 人口id
			smrentId	: renterId,//租客id
			smRentId	: hrId, //已租房id
			smNotRentId	: jdcHsId, //未租房id
			password    : doorPwd,
			messageType	: 18,
			smUserId    : _loginUserId,
		};
        if($("#UnlockingTimes").is(":checked")){
			//pushingTime2=null;
			dataMsg.jdcUnlockingTimes=authorizeTimes;//限次
			giveRenterJson.unlockingTimes=authorizeTimes;
			operatingRecording = {
				text : "密码授权：为客户 " + popName + " 发放" + lockName + "的密码，密码为"
					+ doorPwd + "，有效次数为：" + authorizeTimes + "。",
				time : new Date().format("yyyy-MM-dd hh:mm:ss"),
				type : "系统跟进",
				registrantName : _loginUserName
			}
        }else if($("#UnlockingPeriod").is(":checked")){
			dataMsg.jdcDeadlineTime=pushingTime2;//限时
			giveRenterJson.deadline=pushingTime2;
			operatingRecording = {
				text : "密码授权：为客户 " + popName + " 发放" + lockName + "的密码，密码为"
					+ doorPwd + "，有效期至：" + jdcDeadlineTime +  "。",
				time : new Date().format("yyyy-MM-dd hh:mm:ss"),
				type : "系统跟进",
				registrantName : _loginUserName
			}
        }else {
            myTips("请选择密码授权类型（次数/期限）", "error");
            return;
        }

		var jdcOperatingRecording = "[" + JSON.stringify(operatingRecording) + "]";
		dataMsg.jdcOperatingRecording=jdcOperatingRecording;
		showLoading();
		//给设备发密码  成功后在新增门锁数据
		//发三条请求 1：给设备添加密码 2：在jour_door_card新增一条 3：发短信
		var postJson = {
			coId:coId,
			devId: devId,
			brandId: brandId,
			devUsername: devUsername,
			devPassword: devPassword,
			devAuthId: devAuthId,
			devAuthSecret: devAuthSecret,
		};
		if (brandId == 20 && devFirstType == 3 && (devSecondType == 23 || devSecondType == 40)) {
			var doorPwd1 = doorPwd.split('');
			var psw2 = '';
			for (var i = 0; i < doorPwd1.length; i++) {
				doorPwd1[i] = Number(doorPwd1[i]);
				psw2 += doorPwd1[i];
			}
			postJson.sn = devAuthId;
			postJson.mac = "";
			if (devSecondType == 40){
				postJson.isNeedCache = "false";
			} else {
				postJson.isNeedCache = "true";
			}
			postJson.password=psw2;
			postJson.status = "用户密码注册" ;
			postJson.instruction = "控制设备-门锁";
			postJson = JSON.stringify(postJson);


			$.post("../doDevicConsoleAll.action",
				{
					postJson: postJson,
				},function(data){
					if(data.code<0){
						myTips(data.msg, "error");
						return;
					}else{
						myTips("成功", "success");
						console.log(smPopId);
						//发送短信
						$.post("../massage/sendOutsideMessage.action",giveRenterJson ,function(data) {
							if(data.code<0){
								myTips(data.msg,"error");
							}else {
								myTips("发送成功!","success");
							}
						});
						//插入数据
						$.ajax({
							type : "post",
							url : "../insertJustDoorCard.action",
							data : dataMsg,
							dataType : "json",
							success : function(result) {
								hideLoading();
								if (result.code == 1) {
									myTips("成功", "success");
									$("#pushingCardDlg1").dialog('close');
									queryLock();
								} else {
									myTips(result.msg, "error");
									return;
								}
							}
						});
					}
				});
		}else {
			myTips('该门锁暂不支持密码功能', 'error');
			hideLoading();
			return;
		}
    }else if($("#SmartDoor").is(":checked")){
    	//智能门锁

		var doorCardJson = "[" + doorCardJson + "]";
		showLoading();
		$.ajax({
			type : "post",
			url : "../inseartDoorCard.action",
			data : {
				doorCardJson : doorCardJson
			},
			dataType : "json",
			success : function(result) {
				hideLoading();
				if (result.code == 1) {
					myTips("成功", "success");
					$("#pushingCardDlg1").dialog('close');
					queryLock();
				} else {
					myTips(result.msg, "error");

				}

			}
		});

	}else{
		myTips("请选择授权方式", "error");
		return;
	}

}

function doPushingCard() {
	var obj = document.getElementsByName("lock");
	var lockArray = [];
	var lockName = " ";
	for (k in obj) {
		if (obj[k].checked) {
			lockArray.push(JSON.parse(obj[k].value))
			lockName += JSON.parse(obj[k].value).devNickname;
			lockName += " "
		}
	}

	var row = $('#sourceInfoDg').datagrid('getSelected');
	var row1 = $('#populationDg').datagrid('getSelected');

	var jdcHsId = row.hrHouse4storeId;
	var hrId = row.hrId;
	var popId = row1.popId;
	var landlordId = row.hrLandlordId;
	var renterId = row.hrRenterId;
	var cardId = $('#cardId').val();
	var jdcDeadlineTime = $('#pushingTime').val();
	var doorCardNum = $('#doorCardNum').val();

	var doorCardFeeDeposit = $('#doorCardFeeDeposit').val();
	var doorCardMaterialFee = $('#doorCardMaterialFee').val();

	var doorCardFeeDepositText = doorCardFeeDeposit > 0 ? "门卡押金"
		+ doorCardFeeDeposit + "," : '';
	var doorCardMaterialFeeText = doorCardMaterialFee > 0 ? "门卡工本费"
		+ doorCardMaterialFee : '';

	var operatingRecording = {
		text : "门卡授权：为客户 " + row1.popName + " 发放" + lockName + "的门卡，卡号"
			+ doorCardNum + "，有效期至" + jdcDeadlineTime + "，收取费用"
			+ doorCardFeeDepositText + doorCardMaterialFeeText + "。",
		time : new Date().format("yyyy-MM-dd hh:mm:ss"),
		type : "系统跟进",
		registrantName : _loginUserName
	}

	var jdcOperatingRecording = "[" + JSON.stringify(operatingRecording) + "]";

	var inseratData = {
		jdcHrId : hrId,
		jdcHsId : jdcHsId,
		departmentId : _loginDepartment,
		storefrontId : _loginStore,
		registerPeopleId : _loginUserId,
		landlordId : landlordId,
		renterId : renterId,
		jdcPopId : popId,
		jdcState : '使用中',
		jdcCardId : cardId,
		jdcDeadlineTime : jdcDeadlineTime,
		jdcCardNum : doorCardNum,
		doorCardFeeDeposit : doorCardFeeDeposit > 0 ? doorCardFeeDeposit : 0,
		doorCardMaterialFee : doorCardMaterialFee > 0 ? doorCardMaterialFee : 0,
		jdcOperatingRecording : jdcOperatingRecording,
	}

	var doorCardJson = "";

	for ( var i in lockArray) {
		inseratData.jdcDeviceId = lockArray[i].id;
		if (lockArray[i].devAuthNum != null && lockArray[i].devAuthNum != '') {
			inseratData.jdcAuthNum = lockArray[i].devAuthNum
		}
		if (i == 0) {
			doorCardJson += JSON.stringify(inseratData);
		} else {
			doorCardJson += "," + JSON.stringify(inseratData);
		}
	}

	doorCardJson = "[" + doorCardJson + "]";
	$.ajax({
		type : "post",
		url : "../inseartDoorCard.action",
		data : {
			doorCardJson : doorCardJson
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 1) {
				myTips("成功", "success");
				$("#pushingCardDlg").dialog('close');
			} else {
				myTips(result.msg, "error");
			}
		}
	});
}

$("#stateSelect").change(function() {
	queryLock();
});
function SelectDoorCardState(data){
	console.log(data)
	for(var i in data){
		var DeadlineTime=data[i].jdcDeadlineTime
		var date = new Date(DeadlineTime).format("yyyy-MM-dd");
		EndtDate= date.replace(new RegExp("-","gm"),"/");
		var endtDate = (new Date(EndtDate)).getTime(); //得到毫秒数
		var nowDate= new Date().format("yyyy-MM-dd");
		nowStartDate= nowDate.replace(new RegExp("-","gm"),"/");
		var nowstartDateM = (new Date(nowStartDate)).getTime();//得到当前时间毫秒
		if( nowstartDateM > endtDate){
			var jdcDeviceId= data[i].jdcDeviceId
			var popId= data[i].jdcPopId
			var id=data[i].id
			var jdcState="过期"
			console.log(popId)
			$.post("../updateDoorCard.action", {
				jdcState : jdcState,
				id : id,
			})
			$.post("../selectGuid.action", {
				popId : popId,

			},function(result){
				if(result.code==1){
					var data=result.body
					$.post("http://www.fangzhizun.com/device/wo/UpdatePersonInformation", {
						guid : data,

					})
					$.post("http://www.fangzhizun.com/device/wo/UpdatePhotoInformation", {
						guid : data,

					})
				}

			})
		}
	}
}
/**
 * 查询锁
 */
function queryLock(page, type) {
	var row = $('#sourceInfoDg').datagrid('getSelected');

	var state = $("#stateSelect").find("option:selected").text();
	var hrId = row.hrId;
	console.log(hrId)
	var data = {
		jdcHrId : hrId,
		jdcState : state,
	}
	if (state == "全部") {
		data.state = "";
		data.stateFlag = 1;
	}

	$.ajax({
		type : "post",
		url : "../listDoorCard.action",
		data : data,
		dataType : "json",
		success : function(result) {
			if (result.code == 1) {
				var data = result.body;
				SelectDoorCardState(data)
				$("#doorLockTable").datagrid("loadData", data);
			} else {
				$('#doorLockTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : result.msg
				});
			}
		}
	});
}

function seeLockFollow() {
	var row = $('#doorLockTable').datagrid('getSelected');
	var data = JSON.parse(row.jdcOperatingRecording.substring(1,
		row.jdcOperatingRecording.length - 1));
	$("#doorLockFollowTable").datagrid("loadData", data);
}

/**
 * 注销/退卡
 */
function logoutDoorCart(type) {
	var row = $('#doorLockTable').datagrid('getSelected');
	console.log(row)
	if (row == null) {
		myTips("请选中一条门卡记录", "error");
	} else {
		var jdcState = "";
		if (type == 1) {
			jdcState = "注销"
		} else if (type == 2) {
			jdcState = "退卡"
		} else if (type == 3) {
			jdcState = "续期"
		}
		var id = row.id;
		if (row.jdcState == "使用中") {
			$.messager.confirm('注意', '确定要' + jdcState + '?', function(r) {
				if (r) {
					if (type == 1 || type == 2) {
						doDealWithDoorLock(jdcState, type);
					} else if (type == 3) {
						renewDoorCart(jdcState, type);
					}
				}
			});
		} else {
			myTips("不能修改，该卡的状态为" + row.jdcState, "error");
		}
	}
}

function renewDoorCart(jdcState, type) {
	console.log(jdcState)
	var row = $('#sourceInfoDg').datagrid('getSelected');
	var row1 = $('#doorLockTable').datagrid('getSelected');

	if (row.hrEndTime == row1.jdcDeadlineTime.substring(0, 10)) {
		myTips("卡的截止时间已经跟租期一样", "error");
	} else {
		var id = row1.id;
		console.log();
		var jdcOperatingRecording = JSON.parse(row1.jdcOperatingRecording
			.substring(1, row1.jdcOperatingRecording.length - 1));

		var operatingRecording = {
			text : "门卡" + jdcState + "：为客户 " + row1.popName + jdcState + ","
				+ row1.devNickname + "的门卡.卡号为" + row1.jdcCardNum + ".",
			time : new Date().format("yyyy-MM-dd hh:mm:ss"),
			type : "系统跟进",
			registrantName : _loginUserName
		}
		jdcOperatingRecording.push(operatingRecording);
		jdcOperatingRecording = JSON.stringify(jdcOperatingRecording);
		$.ajax({
			type : "post",
			url : "../updateDoorCard.action",
			data : {
				id : id,
				jdcDeviceId:row1.devId,
				jdcDeadlineTime : row.hrEndTime,
				jdcOperatingRecording : jdcOperatingRecording,
				type : type
			},
			dataType : "json",
			success : function(result) {
				if (result.code == 1) {
					myTips("成功", "success");
					queryLock();
				} else {
					myTips(result.msg, "error");
				}
			}
		});
	}
}

/**
 * 执行 注销/退卡
 */
function doDealWithDoorLock(jdcState, type) {
	var row = $('#doorLockTable').datagrid('getSelected');
	console.log(row);
	var id = row.id;
	var popId = row.jdcPopId;
	var jdcCardId = row.jdcCardId;
	var jdcEquipmentType = row.jdcEquipmentType;
	//2019-7-19 处理注销密码锁
	var jdcPassword = row.jdcPassword;
	var devFirstType = row.devFirstType;
	var devSecondType = row.devSecondType;

	var jdcOperatingRecording = JSON.parse(row.jdcOperatingRecording.substring(
		1, row.jdcOperatingRecording.length - 1));

	var operatingRecording = {
		text : "门卡" + jdcState + "：为客户 " + row.popName + jdcState + ","
			+ row.devNickname + "的门卡.卡号为" + row.jdcCardNum + ".",
		time : new Date().format("yyyy-MM-dd hh:mm:ss"),
		type : "系统跟进",
		registrantName : _loginUserName
	}

	// yzs注销密码锁  清空密码锁的密码 以及修改数据库智能门锁状态 "注销"
	if((jdcCardId==null||jdcCardId=="")&&jdcPassword!=null&&devFirstType==3&&devSecondType==23){
		operatingRecording = {
			text : "密码" + jdcState + "：为客户 " + row.popName + jdcState + ","
				+ row.devNickname + "的门锁.密码为" + row.jdcPassword + ".",
			time : new Date().format("yyyy-MM-dd hh:mm:ss"),
			type : "系统跟进",
			registrantName : _loginUserName
		}
	}
	//return;
	jdcOperatingRecording.push(operatingRecording);
	jdcOperatingRecording = JSON.stringify(jdcOperatingRecording);

	$.ajax({
		type : "post",
		url : "../updateDoorCard.action",
		data : {
			jdcEquipmentType:jdcEquipmentType,
			popId :popId,
			id : id,
			jdcState : jdcState,
			jdcOperatingRecording : jdcOperatingRecording,
			jdcCardId : jdcCardId,
			jdcDeviceId : row.jdcDeviceId,
			jdcPassword:jdcPassword,
			type : type
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 1) {
				myTips("成功", "success");
				queryLock();
			} else {
				myTips(result.msg, "error");
			}
		}
	});
}

// 任务详细信息窗口
function repairInfoDlg(row) {
	$("#repairInfoDlg").dialog({
		title : "任务信息",
		top : getTop(420),
		left : getLeft(660),
		width : 660,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#repairInfoDlg input").val('');
			$("#repairInfoDlg textarea").val('');
		}
	});
	if (row.keyAdministrator == '') {
		$("#repairAddress").val(
			row.addCommunity + row.addBuilding + row.addDoorplateno);
	} else {
		$("#repairAddress").val(row.keyAdministrator);
	}
	if ((row.repHouse4rentId != null && row.repHouse4rentId != '')
		&& (row.repHouse4storeId != null && row.repHouse4storeId != '')
		&& (row.repHouseId != null && row.repHouseId != '')) {
		$("#repairHouseType1").val('已租任务');
	} else if ((row.repHouse4rentId == null || row.repHouse4rentId == '')
		&& (row.repHouse4storeId != null && row.repHouse4storeId != '')
		&& (row.repHouseId != null && row.repHouseId != '')) {
		$("#repairHouseType1").val('未租任务');
	} else if ((row.repHouse4rentId == null || row.repHouse4rentId == '')
		&& (row.repHouse4storeId == null || row.repHouse4storeId == '')
		&& (row.repHouseId != null && row.repHouseId != '')) {
		$("#repairHouseType1").val('项目任务');
	} else {
		$("#repairHouseType1").val('无关联任务');
	}
	$("#repairId").val(row.repId);
	$("#repairTime").val(row.repReportingTime);
	$("#repairUserName1").val(row.repUserName);
	$("#repairUserId1").val(row.repUserId);
	$("#repairContacis").val(row.repContacts);
	$("#repairContacisPhone").val(row.repContactsPhone);
	$("#repairResponsibility1").val(row.repResponsibility);
	$("#repairHopeTime1").val(row.repHopeTime);
	$("#repairReceive").val(row.repToReceive);
	$("#repairType").val(row.repTypeRp);
	$("#repairEvent").val(row.repEventRp);
	$("#repairProgressRp").val(row.repProgressRp);
	$("#repairPeopleName").val(row.repRepairman);
	$("#repairPeopleId").val(row.repRepairPeopleId);
	$("#repairState").val(row.repState);
	// $(".repair_toll_rp").val(row.repTollRp + "元");
	$('.do_overDiv').hide();
	$("#repairInfoDlg").dialog('open');
	if ($('#showProgressTable').hasClass('datagrid-f')) {
	} else {
		$('#showProgressTable').datagrid(
			{
				columns : [ [
					{
						field : 'proTime',
						title : '进展时间',
						width : 10,
						align : 'center'
					},
					{
						field : 'userName',
						title : '负责人',
						width : 10,
						align : 'center'
					},
					{
						field : 'proState',
						title : '进展状态',
						width : 10,
						align : 'center'
					},
					{
						field : 'proRemark',
						title : '备注',
						width : 45,
						align : 'center',
						formatter : function(value, row, index) {
							return "<span title='" + row.proRemark
								+ "'>" + row.proRemark + "</span>";
						}
					} ] ],
				width : '100%',
				height : '100%',
				singleSelect : true,
				autoRowHeight : false,
				pagination : false,
				pageSize : 10,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				onDblClickRow : function(rowIndex, rowData) {
					var row = $('#showProgressTable').datagrid(
						'getSelected');
					if (row) {
						for ( var i in row) {
							$("#readShowProgress" + i).html(row[i]);
						}
						$('#showProgressDlg').dialog({
							title : '进展详情',
							top : getTop(230),
							left : getLeft(420),
							width : 420,
							height : 230,
							closed : true,
							cache : false,
							modal : true,
							onClose : function() {
								$('.xwtable span').text('');
							}
						});
						$('#showProgressDlg').dialog('open');
					}
				}
			});
	}
	$('#showProgressTable').datagrid({
		data : [],
	});
	queryRepairProgress1(row.repId);
}
// 事件详细进展列表导入数据
function queryRepairProgress1(repId) {
	$.post("../queryAllRepairProgress.action", {
		proRepairId : repId
	}, function(data) {
		if (data.code < 0) {
			$('#showProgressTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			for ( var i in data) {
				data[i].proTime = formatTime(data[i].proTime, 1);
			}
			$('#showProgressTable').datagrid("loadData", data);
		}
	}, "json");
}
// 任务详细窗口的上一条下一条
function repairLaterOrNext(type) {
	var dataIndex = $(".repair_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".repair_index").val(num);
			changeData = $('#virtualRepairTable').datagrid('getData').rows[num];
			$('#virtualRepairTable').datagrid('selectRow', num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#virtualRepairTable").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".repair_index").val(num);
			changeData = $('#virtualRepairTable').datagrid('getData').rows[num];
			$('#virtualRepairTable').datagrid('selectRow', num);
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	if (changeData.length != 0) {
		for ( var i in changeData) {
			if (changeData[i] == null) {
				changeData[i] = '';
			}
		}
		repairInfoDlg(changeData);
	}
}
function reflashList() {
	$('#searchSource [clear="clear"]').val('');
	$('.houseRentState button').removeClass('btn-info').addClass('btn-success');
	$('#searchButtonState').val('');
	$('#searchLeaseState').val('在租');
	querySourceInfo(1, 0);
}
function cleanButtonValue() {
	$('.houseRentState button').removeClass('btn-info').addClass('btn-success');
	$('#searchButtonState').val('');
}

//分页统计总条数
function getsourcePageCount(page){
	var pageSize = 20;
	var qDistrict = $("#sourceDistrict").find("option:selected").text();
	var qCommunity = $("#sourceCommunity").val();
	var qBuilding = $("#sourceBuilding").val();
	var qDoorplateno = $("#sourceDoorplateno").val();
	var hrLeaseState = $("#searchLeaseState").val();
	var hrFlatShareLogo = $("#searchhrFlatShareLogo").val();
	var hrManagerUserId = $("#searchHrManagerGetUserId").val();
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	var renterPopName = $('#sourceRenterName').val();
	var landlordPopName = $('#sourceLandlordPopName').val();
	var searchButtonState = $("#searchButtonState").val();
	// selectNum();
	if (searchButtonState == '正在维保' || searchButtonState == '逾期房间') {
		$.post("../selectRepairOrOverdueAll.action", {
			theSortTerm : theSortTerm,
			theSortContrary : theSortContrary,
			hrAddDistrict : qDistrict,
			hrAddCommunity : qCommunity,
			hrAddBuilding : qBuilding,
			hrAddDoorplateno : qDoorplateno,
			hrLeaseState : hrLeaseState,
			hrFlatShareLogo : hrFlatShareLogo,
			hrManagerUserId : hrManagerUserId,
			renterPopName : renterPopName,
			landlordPopName : landlordPopName,
			searchButtonState : searchButtonState,
		}, function(data) {
			if (data.code < 0) {
				var countJson = {
					totalNum:0,
				};
				getCountData(0,countJson,pageSize,page,"source",0);
			} else {
				data = data.body;
				var countJson = {
					totalNum: data[0].totalNum,
				};
				getCountData(1,countJson,pageSize,page,"source",0);
			}
		}, "json");
		return;
	}

	$.post("../queryHouseRent.action", {
		theSortTerm : theSortTerm,
		theSortContrary : theSortContrary,
		hrAddDistrict : qDistrict,
		hrAddCommunity : qCommunity,
		hrAddBuilding : qBuilding,
		hrAddDoorplateno : qDoorplateno,
		hrLeaseState : hrLeaseState,
		hrFlatShareLogo : hrFlatShareLogo,
		hrManagerUserId : hrManagerUserId,
		renterPopName : renterPopName,
		landlordPopName : landlordPopName,
		searchButtonState : searchButtonState,
		splitFlag	: 0,
	}, function(data) {
		if (data.code < 0) {
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"source",0);
		} else {
			data = data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"source",0);
		}
	}, "json");
}

// 已租房源信息表导入数据
function querySourceInfo(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var qDistrict = $("#sourceDistrict").find("option:selected").text();
	var qCommunity = $("#sourceCommunity").val();
	var qBuilding = $("#sourceBuilding").val();
	var qDoorplateno = $("#sourceDoorplateno").val();
	var hrLeaseState = $("#searchLeaseState").val();
	var hrFlatShareLogo = $("#searchhrFlatShareLogo").val();
	var hrManagerUserId = $("#searchHrManagerGetUserId").val();
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	var renterPopName = $('#sourceRenterName').val();
	var landlordPopName = $('#sourceLandlordPopName').val();
	var searchButtonState = $("#searchButtonState").val();
	selectNum();
	if (searchButtonState == '正在维保' || searchButtonState == '逾期房间') {
		$.post("../selectRepairOrOverdueAll.action", {
			startNum : startNum,
			endNum : endNum,
			theSortTerm : theSortTerm,
			theSortContrary : theSortContrary,
			hrAddDistrict : qDistrict,
			hrAddCommunity : qCommunity,
			hrAddBuilding : qBuilding,
			hrAddDoorplateno : qDoorplateno,
			hrLeaseState : hrLeaseState,
			hrFlatShareLogo : hrFlatShareLogo,
			hrManagerUserId : hrManagerUserId,
			renterPopName : renterPopName,
			landlordPopName : landlordPopName,
			searchButtonState : searchButtonState,
		}, function(data) {
			if (data.code < 0) {
				//sourcePage(0, 0, 0);
				$('#sourceInfoDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
				if(page==1){
					notCountPage(0, 0 ,"querySourceInfo","source");
				}else{
					notCountPage(page, 0 ,"querySourceInfo","source");
				}
			} else {
				data = data.body;
				for ( var i in data) {
					for ( var j in data[i]) {
						if (data[i][j] == null) {
							data[i][j] = '';
						}
						if (data[i][j] == '不可看') {
							data[i][j] = '******';
						}
						if (data[i][j] == '123456789') {
							data[i][j] = '不可看';
						}
						data[i].detailedAddress = data[i].hrAddCommunity + ' '
							+ data[i].hrAddBuilding + ' '
							+ data[i].hrAddDoorplateno;
					}
				}
				// if (page == 1 && type == 0) {
					_indexNum[0] = 0;
					// sourcePage(data[0].totalNum, page, 0);
				if(data.length<endNum){
					notCountPage(page, 2 , "querySourceInfo","source");
				}else{
					notCountPage(page, 1 , "querySourceInfo","source");
				}
				// }
				$("#sourceInfoDg").datagrid("loadData", data);
				$('#sourceInfoDg').datagrid("selectRow", _indexNum[0]);
			}
		}, "json");
		return;
	}

	$.post("../queryHouseRent.action", {
		startNum : startNum,
		endNum : endNum,
		theSortTerm : theSortTerm,
		theSortContrary : theSortContrary,
		hrAddDistrict : qDistrict,
		hrAddCommunity : qCommunity,
		hrAddBuilding : qBuilding,
		hrAddDoorplateno : qDoorplateno,
		hrLeaseState : hrLeaseState,
		hrFlatShareLogo : hrFlatShareLogo,
		hrManagerUserId : hrManagerUserId,
		renterPopName : renterPopName,
		landlordPopName : landlordPopName,
		searchButtonState : searchButtonState,
		splitFlag	: 1,
	}, function(data) {
		if (data.code < 0) {
			// sourcePage(0, 0, 0);
			$('#sourceInfoDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"querySourceInfo","source");
			}else{
				notCountPage(page, 0 ,"querySourceInfo","source");
			}
		} else {
			data = data.body;
			for ( var i in data) {
				for ( var j in data[i]) {
					if (data[i][j] == null) {
						data[i][j] = '';
					}
					if (data[i][j] == '不可看') {
						data[i][j] = '******';
					}
					if (data[i][j] == '123456789') {
						data[i][j] = '不可看';
					}
					data[i].detailedAddress = data[i].hrAddCommunity + ' '
						+ data[i].hrAddBuilding + ' '
						+ data[i].hrAddDoorplateno;
				}
			}
			// if (page == 1 && type == 0) {
				_indexNum[0] = 0;
			// 	sourcePage(data[0].totalNum, page, 0);
			if(data.length<endNum){
				notCountPage(page, 2 , "querySourceInfo","source");
			}else{
				notCountPage(page, 1 , "querySourceInfo","source");
			}
			// }
			$("#sourceInfoDg").datagrid("loadData", data);
			$('#sourceInfoDg').datagrid("selectRow", _indexNum[0]);
		}
	}, "json");
}

// 未租房跟进记录导入数据
function queryFollow(row, page, type) {
	var startNum = (parseInt(page) - 1) * 6;
	var endNum = 6;
	var jhfPaymentWay = $('#infoFollowType').val();
	// 跟进记录表取数据
	console.log(row.hrHouse4storeId);
	$.post("../queryAllHousingFollow.action", {
		// jhfHouse4storeId : row.hrHouse4storeId,
		jhfHouseId : row.hrHouseId,
		jhfPaymentWay : jhfPaymentWay,
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 3);
			var noData = [];
			$('#followInfoTable').datagrid({
				data : noData,
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 3);
			}
			$("#followInfoTable").datagrid();
			$("#followInfoTable").datagrid("loadData", data);
		}
	}, "json");
}
// 分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#sourcePage").remove();
		$("#sourcePageDiv")
			.append(
				"<div class='tcdPageCode' id='sourcePage' style='text-align:center;'></div>");
		$("#sourcePage").createPage({
			onePageNums : 20,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				_pageNum[0] = p;
				_indexNum[0] = 0;
				if (p <= pageNum) {
					querySourceInfo(p, 1);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseHousePage").remove();
		$("#choseHousePageDiv")
			.append(
				"<div class='tcdPageCode' id='choseHousePage' style='text-align:center;'></div>");
		$("#choseHousePage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					query4StoreInfo(p, 1);
				}
			}
		});
	}
	if (type == 2) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseRenterPage").remove();
		$("#choseRenterPageDiv")
			.append(
				"<div class='tcdPageCode' id='choseRenterPage' style='text-align:center;'></div>");
		$("#choseRenterPage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenter(p, 1);
				}
			}
		});
	}
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 6);
		$("#followPage").remove();
		$("#followPageDiv")
			.append(
				"<div class='tcdPageCode' id='followPage' style='text-align:center;'></div>");
		$("#followPage").createPage({
			onePageNums : 6,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					var row = $('#sourceInfoDg').datagrid('getSelected');
					queryFollow(row, p, 1);
				}
			}
		});
	}
	if (type == 4) {
		pageNum = Math.ceil(totalNum / 7);
		$("#followPage1").remove();
		$("#followPageDiv1")
			.append(
				"<div class='tcdPageCode' id='followPage1' style='text-align:center;'></div>");
		$("#followPage1").createPage({
			onePageNums : 7,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					var row = $('#sourceInfoDg').datagrid('getSelected');
					queryFollow1(row, p, 1);
				}
			}
		});
	}
	if (type == 7) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseRenterPage1").remove();
		$("#choseRenterPageDiv1")
			.append(
				"<div class='tcdPageCode' id='choseRenterPage1' style='text-align:center;'></div>");
		$("#choseRenterPage1").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenter(p, 1);
				}
			}
		});
	}
	if (type == 8) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseSourcePage").remove();
		$("#choseSourcePageDiv")
			.append(
				"<div class='tcdPageCode' id='choseSourcePage' style='text-align:center;'></div>");
		$("#choseSourcePage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					relationDate(p, 1);
				}
			}
		});
	}

	if (type == 9) {
		pageNum = Math.ceil(totalNum / 10);
		$("#chosePopPage").remove();
		$("#chosePopPageDiv")
			.append(
				"<div class='tcdPageCode' id='chosePopPage' style='text-align:center;'></div>");
		$("#chosePopPage").createPage({
			onePageNums : 10,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryPop(p, 1);
				}
			}
		});
	}

}
// 显示/隐藏列对话框
function columnsCheck() {
	// 判断隐藏的列 并将对应的checkbox勾选
	for ( var j in colsCombo) {
		if (colsCombo[j] == "hide") {
			$("#" + j).prop("checked", false);
		}
		if (colsCombo[j] == "show") {
			$("#" + j).prop("checked", true);
		}
	}
	$('#columnsCheckBox').dialog(
		{
			title : '显示/隐藏列',
			top : getTop(270),
			left : getLeft(400),
			width : 400,
			height : 270,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				// 关闭对话框撤销选择
				$("#columnsCheckBox input[type='checkbox']").prop(
					'checked', false);
			},
		});
	$('#columnsCheckBox').dialog('open');
}
// 显示或隐藏列
function displayCols() {
	var colBox = $("#columnsCheckBox input[type='checkbox']");
	var onChecked = "";
	var unChecked = "";
	for (var i = 0; i < colBox.length; i++) {
		if (colBox[i].checked) {
			if (onChecked.length > 0) {
				onChecked += "," + colBox[i].value;
			} else {
				onChecked = colBox[i].value;
			}
		}
		if (!colBox[i].checked) {
			if (unChecked.length > 0) {
				unChecked += "," + colBox[i].value;
			} else {
				unChecked = colBox[i].value;
			}
		}
	}
	var onCheckeds = [];
	var unCheckeds = [];
	onCheckeds = onChecked.split(',');
	unCheckeds = unChecked.split(',');
	if (onChecked != null && onChecked != "") {
		for (var i = 0; i < onCheckeds.length; i++) {
			if (onCheckeds[i] != "all") {
				$('#sourceInfoDg').datagrid('showColumn', onCheckeds[i]);
				for ( var j in colsCombo) {
					if (j == onCheckeds[i]) {
						colsCombo[j] = "show";

					}
				}
			}
		}
	}
	if (unChecked != null && unChecked != "") {
		for (var i = 0; i < unCheckeds.length; i++) {
			if (unCheckeds[i] != "all") {
				$('#sourceInfoDg').datagrid('hideColumn', unCheckeds[i]);
				for ( var j in colsCombo) {
					if (j == unCheckeds[i]) {
						colsCombo[j] = "hide";
					}
				}
			}
		}
	}
	$('#columnsCheckBox').dialog('close');
}

// 协助事务生成处理
function assistingAffairs(type) {
	// 维修
	if (type == 0) {
		$('#adminFlagTask').val(0);
		var num = $('#adminFlagRepair').val();
		if (num == 0) {
			$('#maintenance').show();
			$('#taskAffairs').hide();
			$('#adminFlagRepair').val(1);
			$('#writeFollowDlg').dialog({
				height : "370",
				onOpen : function() {

					$("#repair_hope_time3").val("尽快");
				}
			});
			$('#writeFollowDlg').dialog("open");
		} else {
			$('#maintenance').hide();
			$('#taskAffairs').hide();
			$('#adminFlagRepair').val(0);
			$('#writeFollowDlg').dialog({
				height : "250"
			}).dialog("open");
		}
	} else {
		// 任务
		$('#adminFlagRepair').val(0);
		var num = $('#adminFlagTask').val();
		if (num == 0) {
			$('#maintenance').hide();
			$('#taskAffairs').show();
			$('#adminFlagTask').val(1);
			$('#writeFollowDlg').dialog({
				height : "370",
				onOpen : function() {
					$("#taskAffairsrepairName").removeAttr("require");
					$("#taskAffairsrepairPhone").removeAttr("require");
					$("#repair_hope_time4").val("尽快");
				}
			});
			$('#writeFollowDlg').dialog("open");
		} else {
			$('#maintenance').hide();
			$('#taskAffairs').hide();
			$('#adminFlagTask').val(0);
			$('#writeFollowDlg').dialog({
				height : "250"
			}).dialog("open");
		}
	}
}

// 写跟进对话框
function writeFollowDlg(num) {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	$('.attachmentNum').html('（图片0张    文件0个）');
	if (!row) {
		myTips("请选择一套房源进行跟进！", "error");
		return;
	}
	$("#writeFollowDlg").dialog({
		title : "写跟进",
		top : getTop(250),
		left : getLeft(480),
		width : 480,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#writeFollowDlg input").val('');
			$("#writeFollowDlg select").val('');
			$("#writeFollowDlg textarea").val('');
			$('#att').val('');
			$('#maintenance').hide();
			$('#taskAffairs').hide();
			$('#adminFlagRepair').attr("checked", false);
			$('#adminFlagTask').attr("checked", false);
			$('#adminFlagState').val('');
			$('#writeFollowDlg [clear="clear"]').val('');
			$('#writeFollowDlg [clean="clean"]').html('');
			$('#writeFollowDlg [require]').css('border', '1px solid #a9a9a9');
		}
	});
	if (num == 0) {
		$('#hrwriteFollow').show();
		$('#hrSource').show();
		$('#hswriteFollow').hide();
		$('#hsTrusteeship').hide();
	} else if (num == 1) {
		$('#hrwriteFollow').hide();
		$('#hrSource').hide();
		$('#hswriteFollow').show();
		$('#hsTrusteeship').show();
	}

	$("#writeFollowRemind").prop("checked", false);
	$("#writeFollowDlg").dialog('open');
	// 设置为单选
	$("#writeFollowDlg input[name='adminFlag']:checkbox").click(function() {
		var flag = $(this).is(':checked');
		if (flag) {
			$(this).siblings("input").attr("checked", false);
		}
	});
	$('#adminFlagRepair').val(0);
	$('#adminFlagTask').val(0);
	if (num == 0) {
		$('#marepairName').val(row.renterPopName);
		$('#marepairPhone').val(row.renterPopTelephone);
		$('#taskAffairsrepairName').val(row.renterPopName);
		$('#taskAffairsrepairPhone').val(row.renterPopTelephone);
		$('#adminFlagState').val(1);
	} else {
		$('#marepairName').val(row.landlordPopName);
		$('#marepairPhone').val(row.landlordPopTelephone);
		$('#taskAffairsrepairName').val(row.landlordPopName);
		$('#taskAffairsrepairPhone').val(row.landlordPopTelephone);
		$('#adminFlagState').val(2);
	}
}
// 已租写跟进
function followSource(type) {

	console.log('followSource')
	var adminFlagRepair, adminFlagTask;
	adminFlagRepair = $('#adminFlagRepair').val();
	adminFlagTask = $('#adminFlagTask').val();

	var row = $('#sourceInfoDg').datagrid('getSelected');
	var addHouseId = $(".add_source_houseId").val();
	var addHouse4rent = $(".add_source_hrId").val();
	var addHouse4store = $(".add_source_hsId").val();
	var follow_mark = $(".follow_mark").val();
	var followWay = $("#writeFollowWay").find('option:selected').text();
	var jhfRemind = '否';
	if ($("#writeFollowRemind1").prop("checked")) {
		jhfRemind = '是';
	}
	var jhfPaymentWay = $("#writeFollowType1").find('option:selected').text();
	var jhfFollowBelong = $("#writeFollowBelong1").find('option:selected')
		.text();

	if (type == 0) {
		addHouseId = row.hrHouseId;
		addHouse4rent = row.hrId;
		addHouse4store = row.hrHouse4storeId;
		if (followWay != '') {
			followWay = "【" + followWay + "】";
		}
		follow_mark = followWay + $("#writeFollowNote").val();
		if ($("#writeFollowRemind").prop("checked")) {
			jhfRemind = '是';
		}
		jhfPaymentWay = $("#writeFollowType").find('option:selected').text();
		jhfFollowBelong = $("#writeFollowBelong").find('option:selected')
			.text();
	}
	var checkFlag = 0;
	$('#writeFollowDlg [require="hr"]').each(function() {
		if ($(this).val() == '') {
			$(this).css('border', '1px solid red');
			checkFlag++;
		} else {
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if (checkFlag != 0) {
		myTips("有必填项未填写!", "error");
		return;
	}
	if (adminFlagTask == 1) {
		console.log(adminFlagTask == 1)
		var checkFlag = 0;
		$('#writeFollowDlg [require="task"]').each(function() {
			if ($(this).val() == '') {
				$(this).css('border', '1px solid red');
				checkFlag++;
			} else {
				$(this).css('border', '1px solid #a9a9a9');
			}
		});
		if (checkFlag != 0) {
			myTips("有必填项未填写!", "error");
			return;
		}
	}
	if (adminFlagRepair == 1) {
		console.log(adminFlagRepair == 1)
		var checkFlag = 0;
		$('#writeFollowDlg [require="repair"]').each(function() {
			if ($(this).val() == '') {
				$(this).css('border', '1px solid red');
				checkFlag++;
			} else {
				$(this).css('border', '1px solid #a9a9a9');
			}
		});
		if (checkFlag != 0) {
			myTips("有必填项未填写!", "error");
			return;
		}
	}

	var att = $('#att').val();
	$.post("../insertHousingFollow.action", {
		jhfHouseId : addHouseId,
		jhfHouse4rentId : addHouse4rent,
		jhfHouse4storeId : addHouse4store,
		jhfFollowRemark : follow_mark,
		jhfRemind : jhfRemind,
		jhfFollowResult : '跟进成功',
		jhfFollowBelong : jhfFollowBelong,
		jhfPaymentWay : jhfPaymentWay,
		jhfUserId : _loginUserId,
		jhfDepartment : _loginDepartment,
		jhfStorefront : _loginStore,
		att : att,
	}, function(data) {
		if (data.code < 0) {
			myTips("跟进失败！", "error");
			return;
		}
		// 是否添加维修
		if (adminFlagRepair == 1) {
			doAddRepair(1)
			$('.follow_mark').val('');
			queryFollow1(row, 1, 0);
		} else if (adminFlagTask == 1) {
			// 是否添加任务
			doAddvirtualRepair(1)
			$('.follow_mark').val('');
			queryFollow1(row, 1, 0);
		} else {
			$('.follow_mark').val('');
			myTips("跟进成功！", "success");
			queryFollow1(row, 1, 0);
			if (type == 0) {
				$("#writeFollowDlg").dialog('close');
			}
		}
	});
}
// 未租写跟进
function followTrusteeship(type) {
	console.log('followTrusteeship')
	var adminFlagRepair, adminFlagTask;
	adminFlagRepair = $('#adminFlagRepair').val();
	adminFlagTask = $('#adminFlagTask').val();
	var row = $('#sourceInfoDg').datagrid('getSelected');
	var addHouse4store = $(".add_trusteeship_houseStoreCoding").val();
	var addHouseCoding = $(".add_trusteeship_houseCoding").val();
	var follow_mark = $(".follow_mark").val();
	var followWay = $("#writeFollowWay").find('option:selected').text();
	var jhfRemind = '否';
	if ($("#writeFollowRemind1").prop("checked")) {
		jhfRemind = '是';
	}
	var jhfPaymentWay = $("#writeFollowType1").find('option:selected').text();
	var jhfFollowBelong = $("#writeFollowBelong1").find('option:selected')
		.text();
	if (type == 0) {
		addHouse4store = row.hrHouse4storeId;
		addHouseCoding = row.hrHouseId;
		if (followWay != '') {
			followWay = "【" + followWay + "】";
		}
		follow_mark = followWay + $("#writeFollowNote").val();
		if ($("#writeFollowRemind").prop("checked")) {
			jhfRemind = '是';
		}
		jhfPaymentWay = $("#writeFollowType").find('option:selected').text();
		jhfFollowBelong = $("#writeFollowBelong1").find('option:selected')
			.text();
	}
	var checkFlag = 0;
	$('#writeFollowDlg [require="hs"]').each(function() {
		if ($(this).val() == '') {
			$(this).css('border', '1px solid red');
			checkFlag++;
		} else {
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if (checkFlag != 0) {
		myTips("有必填项未填写!", "error");
		return;
	}
	if (adminFlagTask == 1) {
		console.log(adminFlagTask == 1)
		var checkFlag = 0;
		$('#writeFollowDlg [require="task"]').each(function() {
			if ($(this).val() == '') {
				$(this).css('border', '1px solid red');
				checkFlag++;
			} else {
				$(this).css('border', '1px solid #a9a9a9');
			}
		});
		if (checkFlag != 0) {
			myTips("有必填项未填写!", "error");
			return;
		}
	}
	if (adminFlagRepair == 1) {
		console.log(adminFlagRepair == 1)
		var checkFlag = 0;
		$('#writeFollowDlg [require="repair"]').each(function() {
			if ($(this).val() == '') {
				$(this).css('border', '1px solid red');
				checkFlag++;
			} else {
				$(this).css('border', '1px solid #a9a9a9');
			}
		});
		if (checkFlag != 0) {
			myTips("有必填项未填写!", "error");
			return;
		}
	}

	var att = $('#att').val();
	$.post("../insertHousingFollow.action", {
		jhfHouse4storeId : addHouse4store,
		jhfHouseId : addHouseCoding,
		jhfFollowRemark : follow_mark,
		jhfRemind : jhfRemind,
		jhfFollowResult : '跟进成功',
		jhfFollowBelong : jhfFollowBelong,
		jhfPaymentWay : jhfPaymentWay,
		jhfUserId : _loginUserId,
		jhfDepartment : _loginDepartment,
		jhfStorefront : _loginStore,
		att : att,
	}, function(data) {
		if (data.code < 0) {
			myTips("跟进失败！", "error");
			return;
		}
		// 是否添加维修
		if (adminFlagRepair == 1) {
			doAddRepair(1)
			$('.follow_mark').val('');
			queryFollow(row, 1, 0);
		} else if (adminFlagTask == 1) {
			// 是否添加任务
			doAddvirtualRepair(1)
			$('.follow_mark').val('');
			queryFollow(row, 1, 0);
		} else {
			$('.follow_mark').val('');
			queryFollow(row, 1, 0);
			myTips("跟进成功！", "success");
			$("#writeFollowDlg").dialog('close');
		}
	});
}

/** ***************************维修信息处理********************************* */
// 添加维修事件窗口
function addRepair() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		myTips("请选择一条信息！", "error");
		return;
	}
	$("#addRepairDlg").dialog({
		title : "添加维修",
		top : getTop(340),
		left : getLeft(380),
		width : 380,
		height : 340,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addRepairDlg [clear="clear"]').val('');
			$('#addRepairDlg [clean="clean"]').html('');
			$('#addRepairDlg [require]').css('border', '1px solid #a9a9a9');
			clearAttachment();
		},
		onOpen : function() {

			$("#repair_hope_time").val("尽快");
		}
	});
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$(".repair_houseRentCoding").val(row.hrId);
	$(".repair_houseStoreCoding").val(row.hrHouse4storeId);
	$(".repair_houseCoding").val(row.hrHouseId);
	$(".repair_name").val(row.renterPopName);
	$(".repair_phone").val(row.renterPopTelephone);
	var myDate = getNowFormatDate();
	$(".repair_reporting_time").val(myDate);
	$('.repair_userName').val(_loginUserName);
	$('.repair_userId').val(_loginUserId);
	$("#addRepairDlg").dialog('open');
}
// 添加维修事件
function doAddRepair(type) {
	showLoading();
	var houseRentCoding, houseStoreCoding, houseCoding, repTime, repName, repPhone, repHopeTime, repRespon, repUserId, repEvent, repTypeRp, repRepairPeopleId, repTaskTime, att, repNumber;
	if (type == 0) {
		houseRentCoding = $(".repair_houseRentCoding").val();
		houseStoreCoding = $(".repair_houseStoreCoding").val();
		houseCoding = $(".repair_houseCoding").val();
		repTime = $(".repair_reporting_time").val();
		repName = $(".repair_name").val();
		repPhone = $(".repair_phone").val();
		repHopeTime = $("#repair_hope_time").val();
		repRespon = $(".repair_responsibility").find("option:selected").text();
		repUserId = $(".repair_userId").val();
		repEvent = $(".repair_event_rp").val();
		repTypeRp = $(".repair_type_rp").find("option:selected").text();
		repRepairPeopleId = $("#doRepairGetUserId").val();
		repTaskTime = getTaskTime();
		att = $('#att').val();
		repNumber = randomNumber();
		repUserId = _loginUserId;
		type = "维保";
	}
	if (type == 1) {
		var row = $('#sourceInfoDg').datagrid('getSelected');
		var adminFlagState = $("#adminFlagState").val();
		if (adminFlagState == 1) {
			houseRentCoding = row.hrId;
		} else {
			houseRentCoding = null;
		}
		houseStoreCoding = row.hrHouse4storeId;
		houseCoding = row.hrHouseId;
		repTime = getNowFormatDate();
		repName = $('#marepairName').val();
		repPhone = $('#marepairPhone').val();
		repHopeTime = $("#repair_hope_time3").val();
		repRespon = $('#maRepairResponsibility').val();
		repUserId = _loginUserId;
		repEvent = $('#writeFollowNote').val();
		repTypeRp = $('#marepairTypeRp').val();
		repRepairPeopleId = $("#maintenanceGetUserId").val();
		repTaskTime = getTaskTime();
		att = '';
		repNumber = randomNumber();
		repUserId = _loginUserId;
		type = "维保";
	}
	$.post("../insertRepair.action", {
		repHouse4rentId : houseRentCoding,
		repHouse4storeId : houseStoreCoding,
		repHouseId : houseCoding,
		repContacts : repName,
		repContactsPhone : repPhone,
		repResponsibility : repRespon,
		repEventRp : repEvent,
		repHopeTime : repHopeTime,
		repRepairPeopleId : repRepairPeopleId,
		repUserId : repUserId,
		repReportingTime : repTime,
		repTypeRp : repTypeRp,
		repTaskTime : repTaskTime,
		repDepartment : _loginDepartment,
		repStorefront : _loginStore,
		att : att,
		repNumber : repNumber,
		type : type,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, "error");
			return;
		}
		isSave = true;
		doSendMessageRepair(type);
		if (type == 0) {
			myTips("添加维修成功！", "success");
		} else {
			myTips("跟进成功！", "success");
		}
	});
}
// 执行维修发送短信
function doSendMessageRepair(type) {
	if ($('#shorMessageRemind').prop("checked")) {// ||
		// $('#mashorMessage').prop("checked")
		var repairUserId, repTypeRp, smRentId, smNotRentId, address, addCommunity, popName, popTel, repHopeTime, repairDescribe, repairJson;
		var row = $('#sourceInfoDg').datagrid('getSelected');
		smNotRentId = row.hrHouse4storeId;
		address = row.hrAddCommunity + row.hrAddBuilding + row.hrAddDoorplateno;
		addCommunity = '';
		if (address == '' || address == null) {
			address = '无归属维修';
		}
		if (type == 0) {
			smRentId = row.hrId;
			repairUserId = $('#doRepairGetUserId').val();
			repTypeRp = $('.repair_type_rp').find("option:selected").text();
			popName = $('.repair_name').val();
			popTel = $('.repair_phone').val();
			repHopeTime = $('.repair_hope_time').val();
			repairDescribe = $('.repair_event_rp').val() + "。指派人："
				+ _loginUserName;
		} else {
			var adminFlagState = $("#adminFlagState").val();
			if (adminFlagState == 1) {
				smRentId = row.hrId;
			} else {
				smRentId = null;
			}
			repairUserId = $("#maintenanceGetUserId").val();
			repTypeRp = $('#marepairTypeRp').val();
			popName = $('#marepairName').val();
			popTel = $('#marepairPhone').val();
			repHopeTime = $(".repair_hope_time").val();
			repairDescribe = $('#writeFollowNote').val();
			+"。指派人：" + _loginUserName;
		}
		repairJson = {
			smUserId : repairUserId,
			smRentId : smRentId,
			smNotRentId : smNotRentId,
			repairEvenType : repTypeRp,
			addCommunity : address,
			popName : popName,
			popTelephone : popTel,
			hopeTime : repHopeTime,
			repairDescribe : repairDescribe,
		};
		showLoading();
		$.post("../massage/sendRepairMsg.action", repairJson, function(data) {
			if (data.code < 0) {
				hideLoading();
				// myTips("维修发送短信失败！","success");
			}
			hideLoading();
			queryRepair(1, 0);
			$("#addRepairDlg").dialog('close');
			$("#writeFollowDlg").dialog('close');
		});

	} else {
		hideLoading();
		queryRepair(1, 0);
		$("#addRepairDlg").dialog('close');
		$("#writeFollowDlg").dialog('close');
		return;
	}
}
/** *****************************维修end******************************** */

function hopeTimeVal(select, input) {
	var hopeSelect = $('#' + select).val();
	if (hopeSelect == "尽快" || hopeSelect == "电话联系") {
		$('#' + input).val(hopeSelect);
	}
	if (hopeSelect == "今天") {
		$('#' + input).val(formatTime(getNowFormatDate(), 2) + " ");
	}
	if (hopeSelect == "明天") {
		var d = formatTime(getNowFormatDate(), 2)
		var tomorrow = new Date(d);
		var sDay = 1;
		tomorrow.setDate(tomorrow.getDate() + sDay);
		$('#' + input).val(formatDate(tomorrow));
	}
	if (hopeSelect == "后天") {
		var d = formatTime(getNowFormatDate(), 2)
		var afterTomorrow = new Date(d);
		var sDay = 2;
		afterTomorrow.setDate(afterTomorrow.getDate() + sDay);
		$('#' + input).val(formatDate(afterTomorrow));
	}
	if (hopeSelect == "本周末") {
		var now = new Date;
		var day = now.getDay();
		var week = "1234567";
		var Saturday = 5 - week.indexOf(day);
		var satur = new Date;
		satur.setDate(satur.getDate() + Saturday);
		var sunday = 6 - week.indexOf(day);
		var sun = new Date;
		sun.setDate(sun.getDate() + sunday);
		$('#' + input).val(formatDate(satur) + "或" + formatDate(sun));
	}
}

function getTaskTime() {
	var taskTime = formatTime(getNowFormatDate(), 2);
	var hopeSelect = $('.repair_hope_select').find('option:selected').text()
	if (hopeSelect == "尽快" || hopeSelect == "今天" || hopeSelect == "电话联系"
		|| hopeSelect == "") {

	} else if (hopeSelect == "明天") {
		var tomorrow = new Date(taskTime);
		var sDay = 1;
		taskTime = formatDate(tomorrow.setDate(tomorrow.getDate() + sDay));
	} else if (hopeSelect == "后天") {
		var afterTomorrow = new Date(taskTime);
		var sDay = 2;
		taskTime = formatDate(afterTomorrow.setDate(afterTomorrow.getDate()
			+ sDay));
	} else if (hopeSelect == "本周末") {
		var now = new Date;
		var day = now.getDay();
		var week = "1234567";
		var Saturday = 5 - week.indexOf(day);
		var satur = new Date;
		satur.setDate(satur.getDate() + Saturday);
		var sunday = 6 - week.indexOf(day);
		var sun = new Date;
		sun.setDate(sun.getDate() + sunday);
		taskTime = formatDate(sun);
	}
	return taskTime;
}
/*
 * //维修期望时间 function hopeTimeVal(hopeSelect) { if (hopeSelect == "尽快" ||
 * hopeSelect == "电话联系") { $('.repair_hope_time').val(hopeSelect); } if
 * (hopeSelect == "今天") {
 * $('.repair_hope_time').val(formatTime(getNowFormatDate(), 2)+" "); } if
 * (hopeSelect == "明天") { var d = formatTime(getNowFormatDate(), 2); var
 * tomorrow = new Date(d); var sDay = 1;
 * tomorrow.setDate(tomorrow.getDate()+sDay);
 * $('.repair_hope_time').val(formatDate(tomorrow)); } if (hopeSelect == "后天") {
 * var d = formatTime(getNowFormatDate(), 2); var afterTomorrow = new Date(d);
 * var sDay = 2; afterTomorrow.setDate(afterTomorrow.getDate()+sDay);
 * $('.repair_hope_time').val(formatDate(afterTomorrow)); } if (hopeSelect ==
 * "本周末") { var now = new Date; var day = now.getDay (); var week = "1234567";
 * var Saturday = 5 - week.indexOf (day); var satur = new Date; satur.setDate
 * (satur.getDate () + Saturday); var sunday = 6 - week.indexOf (day); var sun =
 * new Date; sun.setDate (sun.getDate () + sunday);
 * $('.repair_hope_time').val(formatDate(satur)+"或"+formatDate(sun)); } }
 * //任务期望时间 function hopeTimeVal1() { var hopeSelect =
 * $('#repairHopeSelect').find('option:selected').text() if (hopeSelect == "尽快" ||
 * hopeSelect == "电话联系") { $('#repairHopeTime').val(hopeSelect); } if
 * (hopeSelect == "今天") {
 * $('#repairHopeTime').val(formatTime(getNowFormatDate(), 2)+" "); } if
 * (hopeSelect == "明天") { var d = formatTime(getNowFormatDate(), 2); var
 * tomorrow = new Date(d); var sDay = 1;
 * tomorrow.setDate(tomorrow.getDate()+sDay);
 * $('#repairHopeTime').val(formatDate(tomorrow)); } if (hopeSelect == "后天") {
 * var d = formatTime(getNowFormatDate(), 2); var afterTomorrow = new Date(d);
 * var sDay = 2; afterTomorrow.setDate(afterTomorrow.getDate()+sDay);
 * $('#repairHopeTime').val(formatDate(afterTomorrow)); } if (hopeSelect ==
 * "本周末") { var now = new Date; var day = now.getDay (); var week = "1234567";
 * var Saturday = 5 - week.indexOf (day); var satur = new Date; satur.setDate
 * (satur.getDate () + Saturday); var sunday = 6 - week.indexOf (day); var sun =
 * new Date; sun.setDate (sun.getDate () + sunday);
 * $('#repairHopeTime').val(formatDate(satur)+"或"+formatDate(sun)); } }
 */
/*
 * function getTaskTime(){ var taskTime = formatTime(getNowFormatDate(), 2); var
 * hopeSelect = $('.repair_hope_select').find('option:selected').text() if
 * (hopeSelect == "尽快" || hopeSelect == "今天" ||hopeSelect == "电话联系"||hopeSelect ==
 * "") {
 *
 * }else if (hopeSelect == "明天") { var tomorrow = new Date(taskTime); var sDay =
 * 1; taskTime = formatDate(tomorrow.setDate(tomorrow.getDate()+sDay)); }else if
 * (hopeSelect == "后天") { var afterTomorrow = new Date(taskTime); var sDay = 2;
 * taskTime = formatDate(afterTomorrow.setDate(afterTomorrow.getDate()+sDay));
 * }else if (hopeSelect == "本周末") { var now = new Date; var day = now.getDay ();
 * var week = "1234567"; var Saturday = 5 - week.indexOf (day); var satur = new
 * Date; satur.setDate (satur.getDate () + Saturday); var sunday = 6 -
 * week.indexOf (day); var sun = new Date; sun.setDate (sun.getDate () +
 * sunday); taskTime = formatDate(sun); } return taskTime; }
 */
// 到期时间根据开始时间及合同期限改变而改变
function changeDate(type) {
	var endCheck = "";
	var landlordCheck = "";
	if (type == 0) {
		if ($("#add_source_begin").val() == '') {
			return;
		}
		// 当期限其中一项不为0时进行验证
		if ($(".add_source_term_year").val() != 0
			|| $(".add_source_term_month").val() != 0
			|| $(".add_source_term_day").val() != 0) {
			var sMonth = (parseInt($(".add_source_term_month").val()) + parseInt($(
				".add_source_term_year").val()) * 12);
			var sDay = parseInt($(".add_source_term_day").val() - 1);
			var beginDate = new Date($("#add_source_begin").val());
			beginDate.setMonth(beginDate.getMonth() + sMonth);
			beginDate.setDate(beginDate.getDate() + sDay);
			$("#add_source_end").val(formatDate(beginDate));
		}
		// 当无选择时到期时间为空
		else if (($(".add_source_term_year").val() == 0
			&& $(".add_source_term_month").val() == 0 && $(
				".add_source_term_day").val() == 0)) {
			$("#add_source_end").val("");
		}
		endCheck = $("#add_source_end").val();
		landlordCheck = $("#landlordCheckEnd").val();
	} else {
		// 当期限其中一项不为0时进行验证
		if ($("#renterRenewTermYear").val() != 0
			|| $("#renterRenewTermMonth").val() != 0
			|| $("#renterRenewTermDay").val() != 0) {
			var sMonth = (parseInt($("#renterRenewTermMonth").val()) + parseInt($(
				"#renterRenewTermYear").val()) * 12);
			var sDay = parseInt($("#renterRenewTermDay").val() - 1);
			var beginDate = new Date($("#renterRenewBegin").val());
			beginDate.setMonth(beginDate.getMonth() + sMonth);
			beginDate.setDate(beginDate.getDate() + sDay);
			$("#renterRenewEnd").val(formatDate(beginDate));
		}
		// 当无选择时到期时间为空
		else if (($("#renterRenewTermYear").val() == 0
			&& $("#renterRenewTermMonth").val() == 0 && $(
				"#renterRenewTermDay").val() == 0)) {
			$("#renterRenewEnd").val("");
		}
		endCheck = $("#renterRenewEnd").val();
		landlordCheck = $("#landlordCheckEnd1").val();
	}
	if (endCheck != "") {
		var endSplit = endCheck.split("-");
		if (endCheck > landlordCheck) {
			$.messager.confirm("操作提示", "租客合同期限超出了本房源当前的托管期限：" + landlordCheck
				+ ",是否继续操作？", function(data) {
				if (!data) {
					$("#add_source_end").val("");
					$("#renterRenewEnd").val("");
				}
			});
		} else if (endSplit[1] == "01" || endSplit[1] == "02") {
			$.messager.confirm("操作提示", "租客合同到期时间为春节市场冷淡期,建议延期。",
				function(data) {

				});
		} else if (endSplit[1] == "05"
			&& (endSplit[2] == "01" || endSplit[2] == "02" || endSplit[2] == "03")) {
			$.messager.confirm("操作提示", "租客合同到期时间为五一劳动节长假期间,建议延期！", function(
				data) {

			});
		} else if (endSplit[1] == "10"
			&& (endSplit[2] == "01" || endSplit[2] == "02"
				|| endSplit[2] == "03" || endSplit[2] == "04"
				|| endSplit[2] == "05" || endSplit[2] == "06" || endSplit[2] == "07")) {
			$.messager.confirm("操作提示", "租客合同到期时间为十一国庆节长假期间,建议延期！", function(
				data) {

			});
		}
	}
}
// 日期格式化
function formatDate(strTime) {
	var date = new Date(strTime);
	var fYear = date.getFullYear();
	var fMonth;
	if ((date.getMonth() + 1) <= 9) {
		fMonth = date.getMonth() + 1;
		fMonth = "0" + fMonth;
	} else {
		fMonth = date.getMonth() + 1;
	}
	var fDay;
	if (date.getDate() <= 9) {
		fDay = "0" + date.getDate();
	} else {
		fDay = date.getDate();
	}
	return fYear + "-" + fMonth + "-" + fDay;
}

// 打开申请租客退房对话框
function renterCheckout() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	for ( var i in row) {
		if (row[i] == null) {
			row[i] = '';
		}
	}
	if (!row) {
		myTips("请选择一条信息！", "error");
		return;
	} else if (row.hrState == '正常') {
		$('#renterCheckoutDlg').dialog(
			{
				title : '申请租客退房',
				top : getTop(220),
				left : getLeft(430),
				width : 430,
				height : 220,
				closed : true,
				cache : false,
				modal : true,
				onClose : function() {
					$("#renterCheckoutDlg input").val('');
					$("#renterCheckoutDlg select").val('');
					$("#renterCheckoutDlg textarea").val('');
					$('#renterCheckoutDlg [clear="clear"]').val('');
					$('#renterCheckoutDlg [clean="clean"]').html('');
					$('#renterCheckoutDlg [require]').css('border',
						'1px solid #a9a9a9');
				},
			});
		$('#renterCheckoutPrintDiv').hide();
		$('#renterCheckoutPrint').prop("checked", false);
		$('#renterCheckoutMsg').prop("checked", true);
		$('#renterCheckoutTips').html('');
		$('#renterCheckoutDlg').dialog('open');
	} else {
		myTips("此已租房已经申请过租客退房！", "success");
		return;
	}
}
// 租客退房性质事件
function renterCheckoutSelect() {
	var renterCheckoutWhy = $('#renterCheckoutWhy').find("option:selected")
		.text();
	if (renterCheckoutWhy == '') {
		$('#renterCheckoutPrintDiv').hide();
		$('#renterCheckoutPrint').prop("checked", false);
	} else if (renterCheckoutWhy == '到期不续' || renterCheckoutWhy == '正常退房') {
		$('#renterCheckoutPrintDiv').hide();
		$('#renterCheckoutPrint').prop("checked", false);
	} else if (renterCheckoutWhy == '租客转租') {
		$('#renterCheckoutPrintDiv').show();
		$('#renterCheckoutPrint').prop("checked", true);
	} else if (renterCheckoutWhy == '租客毁约') {
		$('#renterCheckoutPrintDiv').hide();
		$('#renterCheckoutPrint').prop("checked", false);
	} else if (renterCheckoutWhy == '公司毁约') {
		$('#renterCheckoutPrintDiv').hide();
		$('#renterCheckoutPrint').prop("checked", false);
	}
}
// 执行申请租客退房
function doRenterCheckout() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	for ( var i in row) {
		if (row[i] == null) {
			row[i] = '';
		}
	}
	var renterCheckoutTime = $('#renterCheckoutTime').val();// 预约退房时间
	var renterCheckoutWhy = $('#renterCheckoutWhy').find("option:selected")
		.text();// 退房性质
	var renterCheckoutReason = $('#renterCheckoutReason').val();// 退房原因
	$('#renterCheckoutTips').html('');
	/*
	 * if(renterCheckoutTime==''){ $('#renterCheckoutTips').html('预约退房时间不能为空！');
	 * return; } if(renterCheckoutWhy==''){
	 * $('#renterCheckoutTips').html('退房性质不能为空！'); return; }
	 */
	$.messager.confirm("操作提示", row.hrAddDistrict + " " + row.detailedAddress
		+ "</br>确定申请租客退房吗？", function(data) {
		if (data) {
			showLoading();
			$.post("../insertInfoHaveRentCheckOut.action", {
				rcoRentId : row.hrId,
				rcoRenterId : row.hrRenterId,
				rcoLandlordId : row.hrLandlordId,
				rcoStoreId : row.hrHouse4storeId,
				rcoCheckOutNature : renterCheckoutWhy,
				rcoCheckOutTime : renterCheckoutTime,
				rcoCheckOutReason : renterCheckoutReason,
				rcoApplyUser : _loginUserId,
				rcoNumber : randomNumber()
			}, function(insertData) {
				hideLoading();
				if (insertData.code < 0) {
					myTips(insertData.msg, "error");
					return;
				}
				if (renterCheckoutWhy == '到期不续') {

				} else if (renterCheckoutWhy == '租客转租') {
					if ($('#renterCheckoutPrint').prop("checked") == true) {
						var renterName = row.renterPopName;
						var idcard = row.renterPopIdcard;
						var houseAddress = row.hrAddCommunity
							+ row.hrAddBuilding + row.hrAddDoorplateno;
						$.post("../selectNewest.action", {
							jrrHouse4rentId : row.hrId,
							jrrRenterId : row.hrRenterId,
							jrrHouse4storeId : row.hrHouse4storeId,
						}, function(newData) {
							newData = newData.body;
							var jrrBeginTime = newData[0].jrrBeginTime
								.split("-");
							var jrrEndTime = newData[0].jrrEndTime.split("-");

							var jhpHouseId = row.hrHouseId;
							var jhpHouse4rentId = row.hrId;
							var jhpHouse4storeId = row.hrHouse4storeId;
							var jhpRenterId = row.hrRenterId;
							var jhpLandlordId = row.hrLandlordId;
							var printArray = {
								renterName : renterName,
								idcard : idcard,
								houseAddress : houseAddress,
								beginYear : jrrBeginTime[0],
								beginMonth : jrrBeginTime[1],
								beginDay : jrrBeginTime[2],
								endYear : jrrEndTime[0],
								endMonth : jrrEndTime[1],
								endDay : jrrEndTime[2],
								companyName : _loginCompanyName
							}
							printArray = JSON.stringify(printArray);
							$.post("../insertHistoryPrint.action", {
								jhpJson : printArray,
								jhpType : "租客转租协议",
								jhpTitle : getNowFormatDate() + " 租客转租协议",
								jhpHouse4rentId : jhpHouse4rentId,
								jhpHouse4storeId : jhpHouse4storeId,
								jhpHouseId : jhpHouseId,
								jhpRenterId : jhpRenterId,
								jhpLandlordId : jhpLandlordId,
								jhpUserId : _loginUserId,
							}, function(data) {
								parent.doPrintInExe(printArray, 5);
							});
						});
					}
				} else if (renterCheckoutWhy == '租客毁约') {

				} else if (renterCheckoutWhy == '公司毁约') {

				}
				/// yzs 发送注销请求
				$.ajax({
					type: "post",
					url: "../listDoorCard.action",
					data: {jdcHrId : row.hrId,jdcState : "使用中"},
					dataType: "json",
					success: function (result) {
						if (result.code == 1) {
							var data = result.body;
							//doDealWithDoorLock("注销",1);
							//popId=data.jdcPopId;
							for(var i in data) {
								var jdcDeviceId = data[i].jdcDeviceId;
								var type = 1;
								var jdcState = "注销";
								var id = data[i].id;
								var popId = data[i].jdcPopId;
								var jdcCardId = data[i].jdcCardId;
								var jdcPassword = data[i].jdcPassword;
								var jdcEquipmentType = data[i].jdcEquipmentType;
								var jdcOperatingRecording = JSON.parse(data[i].jdcOperatingRecording.substring(
									1, data[i].jdcOperatingRecording.length - 1));
								var operatingRecording = {
									text: "门卡" + jdcState + "：为客户 " + data[i].popName + jdcState + ","
										+ data[i].devNickname + "的门卡.卡号为" + data[i].jdcCardNum + ".",
									time: new Date().format("yyyy-MM-dd hh:mm:ss"),
									type: "系统跟进",
									registrantName: _loginUserName
								};
								if((jdcCardId==null||jdcCardId=="")&&jdcPassword!=null){
									operatingRecording = {
										text : "密码" + jdcState + "：为客户 " + row.popName + jdcState + ","
											+ row.devNickname + "的门锁.密码为" + row.jdcPassword + ".",
										time : new Date().format("yyyy-MM-dd hh:mm:ss"),
										type : "系统跟进",
										registrantName : _loginUserName
									}
								}
								jdcOperatingRecording.push(operatingRecording);
								jdcOperatingRecording = JSON.stringify(jdcOperatingRecording);
								//发送注销门卡请求
								$.ajax({
									type: "post",
									url: "../updateDoorCard.action",
									data: {
										jdcEquipmentType: jdcEquipmentType,
										popId: popId,
										id: id,
										jdcState: jdcState,
										jdcOperatingRecording: jdcOperatingRecording,
										jdcCardId: jdcCardId,
										jdcDeviceId: jdcDeviceId,
										jdcPassword:jdcPassword,
										type: type,
									},
									dataType: "json",
									success: function (result) {
										if (result.code == 1) {
											myTips("成功注销门卡", "success");
										} else {
											myTips(result.msg, "error");
										}
									}
								});
							}
						}
					}
				});

				$('#renterCheckoutDlg').dialog('close');
				querySourceInfo(_pageNum[0], 0);
				myTips("退房成功！", "success");
			});
		}
	});
}
// 账户类型和账号联动
function changeWay(type) {
	var faPaymentType = $(".add_financial_way").find("option:selected").text();
	if (faPaymentType == '') {
		$(".add_financial_bankNums").empty();
		$(".add_financial_accountName").val('');
		$(".add_financial_accountBelong").val('');
		$(".add_financial_accountNums").val('');
		$(".add_financial_bankNums").val('');
		return;
	}
	$(".add_financial_bankNums").empty();
	$(".add_financial_bankNums").append("<option></option>");
	$.post("../selectNamePublic.action", {
		faPaymentType : faPaymentType,
	}, function(data) {
		$(".add_financial_accountName").empty();
		$(".add_financial_accountName").append("<option></option>");
		for ( var i in data.body) {
			$(".add_financial_accountName").append(
				"<option value='" + data.body[i].faId + "*#*"
				+ data.body[i].faBelonging + "*#*"
				+ data.body[i].faAccount + "'>"
				+ data.body[i].faUserName + "</option>");
		}
		if (type != 0) {
			for ( var i in data.body) {
				if (data.body[i].faId == type) {
					$(".add_financial_accountName").val(
						data.body[i].faId + "*#*"
						+ data.body[i].faBelonging + "*#*"
						+ data.body[i].faAccount);
					getAccountId();
				}
			}
		}
	});
}
function getAccountId() {
	if ($(".add_financial_accountName").val() == '') {
		return;
	}
	$(".add_financial_bankNums").val(
		$(".add_financial_accountName").val().split("*#*")[0]);
	$(".add_financial_accountNums").val(
		$(".add_financial_accountName").val().split("*#*")[2]);
	$(".add_financial_accountBelong").val(
		$(".add_financial_accountName").val().split("*#*")[1]);
}
function insertFinancial(jfSumMoney, jfAccountingSpecies, jfBigType,
						 jfNatureOfThe, jfFinanNote) {
	if (jfSumMoney == null || jfSumMoney == '') {
		jfSumMoney = 0;
	}
	var jsonString = '"jfSumMoney":"' + jfSumMoney + '"' + ","
		+ '"jfAccountingSpecies":"' + jfAccountingSpecies + '"' + ","
		+ '"jfBigType":"' + jfBigType + '"' + "," + '"jfNatureOfThe":"'
		+ jfNatureOfThe + '"' + "," + '"jfFinanNote":"' + jfFinanNote + '"'
		+ ",";
	return jsonString;
}

// 查询电子合同记录
function queryConstract(page, type) {
	var pageNum = 13;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;

	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();
	var ectStatus = $("#searcElectronState option:selected").val();
	ectStatus = ectStatus == "未签约" ? "未使用" : ectStatus;
	ectStatus = ectStatus == "已签约" ? "已使用" : ectStatus;
	$.post("../listContract.action", {
		startNum : startNum,
		endNum : endNum,
		addCommunity : addCommunity,
		addBuilding : addBuilding,
		addDoorplateno : addDoorplateno,
		ectStatus : ectStatus,
		splitFlag : 1,
	}, function(data) {
		if (data.code < 0) {
			$('#contractInfoDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if (page == 1) {
				notCountPage(0, 0, "queryConstract", "contract");
			} else {
				notCountPage(page, 0, "queryConstract", "contract");
			}
		} else {
			data = data.body;
			if (data.length < pageNum) {
				notCountPage(page, 2, "queryConstract", "contract");
			} else {
				notCountPage(page, 1, "queryConstract", "contract");
			}
			for ( var i in data) {
				for ( var j in data[i]) {
					if (data[i][j] == null) {
						data[i][j] == '';
					}
				}
				data[i].totalPage = data[i].addCommunity + " "
					+ data[i].addBuilding + " " + data[i].addDoorplateno;
				if (data[i].ectStatus == "已使用") {
					data[i].ectStatus = "已签约"
				} else if (data[i].ectStatus == "未使用") {
					data[i].ectStatus = "未签约"
				}
			}

			$("#contractInfoDg").datagrid("loadData", data);
		}
	}, "json");
}

function cancellationContract() {
	var row = $('#contractInfoDg').datagrid('getSelected');

	if (row == null) {
		myTips("请选择一条合同记录进行注销", "error");
		return;
	}

	if (row.ectStatus != "未签约") {
		myTips("无法注销，该合同的状态为" + row.ectStatus, "error");
		return;
	}

	$.messager.confirm('注意', '确定要注销该合同?', function(r) {
		if (r) {
			doCancellationContract(row);
		}
	});
}

function doCancellationContract(data) {
	var ectId = data.ectId;
	var ectStatus = "注销";

	$.post("../updateContract.action", {
		ectId : ectId,
		ectStatus : ectStatus,
	}, function(result) {
		if (result.code < 0) {
			myTips(result.msg, "error");
		} else {
			queryConstract(1, 0);
			myTips("注销成功", "success");
		}
	}, "json");
}

// 电子合同信息窗口
function showElectronicContract() {
	$("#contractInfoTableDlg").dialog({
		title : '电子合同信息',
		top : getTop(270),
		left : getLeft(1000),
		width : 1000,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	queryConstract(1, 0);
	$("#toolbarDiv").show();
	$("#wxPaymenPageDiv").show();
	$("#contractInfoTableDlg").dialog('open');
}

// 电子合同分页统计数据
function getcontractPageCount(page, type) {
	var pageNum = 20;

	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();

	$.post("../listContract.action", {
		addCommunity : addCommunity,
		addBuilding : addBuilding,
		addDoorplateno : addDoorplateno,
		splitFlag : 0,
	}, function(data) {
		console.log(data)
		if (data.code < 0 || data.body[0].totalNum == 0) {
			var countJson = {
				totalNum : 0,
			};
			getCountData(0, countJson, pageNum, page, "contract", 0);
		} else {
			data = data.body;
			var countJson = {
				totalNum : data[0].totalNum,
			};
			getCountData(1, countJson, pageNum, page, "contract", 0);
		}
	}, "json");
}

// 租客续签对话框
function renterRenew() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		myTips("请选择一套房源进行租客续签操作！", "error");
		return;
	}
	$('#renterRenewDlg').dialog({
		title : '租客续签',
		top : getTop(445),
		left : getLeft(620),
		width : 620,
		height : 445,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#renterRenewDlg input').val('');
			$('#renterRenewDlg select').val('');
			$('#contractNumTips1').html('');
			$('#numberMode1').val(1);
			$('#advanceMode1').val(1);
			$("#renterRenewDlg input[needs=1]").each(function() {
				$(this).css("border", "1px solid #A9A9A9");
			});
			$("#renterRenewDlg select[needs=1]").each(function() {
				$(this).css("border", "1px solid #A9A9A9");
			});
		},
	});

	$('#contractNum1').removeAttr();
	$('#renterRenewTermYear').val(0);
	$('#renterRenewTermMonth').val(0);
	$('#renterRenewTermDay').val(0);
	for ( var i in row) {
		if (row[i] == null) {
			row[i] = '';
		}
	}
	$('#renterRenewAddress').val(
		row.hrAddCity + row.hrAddDistrict + row.hrAddZone + row.hrAddStreet
		+ row.hrAddCommunity + row.hrAddBuilding
		+ row.hrAddDoorplateno);
	$('#renterRenewRenterName').val(row.renterPopName);
	$('#renterRenewPhone').val(row.renterPopTelephone);
	$('#renterRenewDespoit').val(row.hrHouseDeposit);

	$.post("../rentedRenewalInquiry.action", {
		jrrHouse4rentId : row.hrId,
	}, function(data) {
		data = data.body;
		for (var i = 0; i < data.length; i++) {
			if (data[i].jrrRentalType == '作废') {
				data.splice(i--, 1);
			}
		}
		$('#renterRenewNums').val(data.length);
		$('#renterRenewLastBegin').val(data[0].jrrBeginTime);
		$('#renterRenewLastEnd').val(data[0].jrrEndTime);
		$('#renterRenewLastTerm').val(data[0].jrrTheTerm);
		$('#renterRenewLastPrice').val(data[0].jrrMoney);
		$('#renterRenewLastContractType').val(data[0].jrrContractType);
		var sumDate = new Date(data[0].jrrEndTime);
		sumDate.setDate(sumDate.getDate() + 1);
		$('#renterRenewBegin').val(formatDate(sumDate));
		if ($('#numberMode1').val() == 1) {
			$('#renterRenewAdvancePay').val(formatDate(sumDate).split('-')[2]);
		} else {
			$('#renterRenewAdvancePay').val(1);
		}
	});
	$.post("../queryHouseStoreCommon.action", {
		hsId : row.hrHouse4storeId,
	}, function(data) {
		data = data.body;
		$('#landlordCheckEnd1').val(data[0].hsEndTime);
	});
	$('#renterRenewUser').val(_loginUserName);
	$('#renterRenewContractType').val('续签合同');
	$('#renterRenewDlg').dialog('open');
}
// 判断是否租客续签是否电子签约
// $("#shorContractMessage").change(function() {
// if($('#shorContractMessage').prop("checked")){
// $("#isElectronicsContract").show();
// $("#jrrTypeOfContract").val("2");
// }else{
// $("#isElectronicsContract").hide();
// $("#jrrTypeOfContract").val("1");
// }
// });

// 执行租客续签
function doRenterRenew() {
	console.log('执行租客续签');
	var jrrRenewalCoding = $('#contractNum1').val();
	var jcdId = $('#contractNumCheckoutIf1').val();
	var adminUser = $("#doRebterRenewGetUserId").val();
	var checkFlag = 0;
	var row = $('#sourceInfoDg').datagrid('getSelected');
	// var jrrTypeOfContract=$("#jrrTypeOfContract").val();
	console.log(row);
	// console.log(jrrTypeOfContract);
	$("#renterRenewDlg input[needs=1]").each(function() {
		if ($(this).val() == '' || $(this).val() == '单击选择房屋') {
			$(this).css("border", "1px solid red");
			checkFlag++;
		} else {
			$(this).css("border", "1px solid #A9A9A9");
		}
	});
	$("#renterRenewDlg select[needs=1]").each(function() {
		if ($(this).val() == '' || $(this).val() == null) {
			$(this).css("border", "1px solid red");
			checkFlag++;
		} else {
			$(this).css("border", "1px solid #A9A9A9");
		}
	});
	if (checkFlag != 0) {
		myTips("有必填项未填写!", "error");
		return;
	}
	if($("#renterRenewDespoit").val() > $("#renterRenewAddDeposit").val()){
		myTips("新房屋押金不能小于原房屋押金!","error")
		return;
	}

	if (_contractNums == 1 && !$('#shorContractMessage').prop("checked")) {
		if (jcdId == "") {
			$('#contractNum1').css("border", "1px solid red");
			myTips("请填写合同编号!", "error");
			return;
		} else {
			$('#contractNum1').css("border", "1px solid #A9A9A9");
		}
	}
	if (adminUser == "") {
		myTips("请正确选择主单人!", "error");
		return;
	}
	showLoading();

	var jrrSignedTime = $('#renterRenewSignedTime').val();
	var jrrBeginTime = $('#renterRenewBegin').val();
	var jrrEndTime = $('#renterRenewEnd').val();
	var jrrTheTerm = $('#renterRenewTermYear').val() + "年"
		+ $('#renterRenewTermMonth').val() + "月"
		+ $('#renterRenewTermDay').val() + "日";
	var jrrInAdvancePay = $('#renterRenewAdvancePay').val();
	var jrrPaymentMethod = $('#renterRenewPayment').val();
	var jrrMoney = $('#renterRenewPrice').val();
	var jrrTheContract = '续签';
	var jrrManageCost = $('#renterRenewjrrManageCost').val();
	var jrrServerCost = $('#renterRenewjrrServerCost').val();
	var jrrManagePayment = $('#renterRenewjrrManagePayment').find(
		"option:selected").text();
	var jrrServerPayment = $('#renterRenewjrrServerPayment').find(
		"option:selected").text();
	var addDeposit = $('#renterRenewAddDeposit').val();
	var advanceMode = $('#advanceMode1').val();
	var numberMode = $('#numberMode1').val();

	if (!$('#shorContractMessage').prop("checked")) {
		$.post("../renewRenterContract.action", {
			jrrHouse4rentId : parseInt(row.hrId),
			jrrHouse4storeId : row.hrHouse4storeId,
			jrrLandlordId : row.hrLandlordId,
			jrrRenterId : row.hrRenterId,
			jrrSignedTime : jrrSignedTime,
			jrrBeginTime : jrrBeginTime,
			jrrEndTime : jrrEndTime,
			jrrUserId : _loginUserId,
			jrrDepartment : _loginDepartment,
			jrrStorefront : _loginStore,
			jrrContractType : '续签合同',
			jrrTheTerm : jrrTheTerm,
			jrrInAdvancePay : jrrInAdvancePay,
			jrrPaymentMethod : jrrPaymentMethod,
			jrrMoney : jrrMoney,
			jrrTheContract : jrrTheContract,
			jrrRenewalCoding : jrrRenewalCoding,
			jcdId : jcdId,
			adminUser : adminUser,
			jcdHouseAddress : row.hdCommunity + ' ' + row.hrAddBuilding + ' '
				+ row.hrAddDoorplateno,
			jrrManageCost : jrrManageCost,
			jrrServerCost : jrrServerCost,
			jrrManagePayment : jrrManagePayment,
			jrrServerPayment : jrrServerPayment,
			jrrTypeOfContract : 1,
			hrHouseDeposit : addDeposit,
			advanceMode : advanceMode,
			numberMode : numberMode,
		}, function(renewaldata) {
			hideLoading();
			if (renewaldata.code < 0) {

				myTips(renewaldata.msg, "error");
				return;
			} else {
				renewaldata = renewaldata.body;
				myTips("续签成功！", "success");
				querySourceInfo(_pageNum[0], 0);
				$('#renterRenewDlg').dialog('close');
			}
		});
	} else {
		var isHasEC = false;
		// 电子续签前先判断是否还存在未签约电子合同
		$.ajax({
			url : "../listContract.action",
			type : "post",
			data : {
				ectHsId : row.hrHouse4storeId,
				ectStatus : "未使用"
			},
			async : false,
			success : function(result) {
				// 存在的情况
				if (result.code == 1) {
					isHasEC = true;
					return;
				}
			}
		})

		if (isHasEC) {
			myTips("该房间已经存在未签约的合同", "error");
			hideLoading();
			return;
		}

		var ectUserCode = md5(row.renterPopIdcard);
		console.log(ectUserCode);
		var ectIdCard = row.renterPopIdcard;
		var ectTelphone = row.renterPopTelephone;
		var ectName = row.renterPopName;
		var remark = $("#contractRemark").val();

		var renant = ectName;
		var idcard = ectIdCard;
		var telphone = ectTelphone;
		var beginDate = jrrBeginTime;
		var endDate = jrrEndTime;
		var lowercaseAmount = jrrMoney;
		var capitalAmount = convertCurrency(lowercaseAmount);
		var serviceFee = jrrServerCost == '' ? 0 : jrrServerCost;
		var signingDate = jrrSignedTime;
		var paymentDate = jrrInAdvancePay;
		var rentalAddress = row.hdCommunity + ' ' + row.hrAddBuilding + ' '
			+ row.hrAddDoorplateno;
		var squareMeter = row.hrHouseSquare == 0 ? '' : row.hrHouseSquare;
		var houseType = row.hrSectionType;
		var deliveryDay = beginDate;
		var waterNum = row.hrWaterVolFirst;
		var electricityNum = row.hrElectritVolFirst;
		var gasNum = row.hrGasVolFirst;
		var Truce1 = 1;
		var Truce2 = 0;
		var salesman = _loginUserName;

		var idcardType = checkIDCard(ectIdCard);

		var insertData = {
			jrrHouse4rentId : parseInt(row.hrId),
			jrrHouse4storeId : row.hrHouse4storeId,
			jrrLandlordId : row.hrLandlordId,
			jrrRenterId : row.hrRenterId,
			jrrSignedTime : jrrSignedTime,
			jrrBeginTime : jrrBeginTime,
			jrrEndTime : jrrEndTime,
			jrrUserId : _loginUserId,
			jrrDepartment : _loginDepartment,
			jrrStorefront : _loginStore,
			jrrContractType : '续签合同',
			jrrTheTerm : jrrTheTerm,
			jrrInAdvancePay : jrrInAdvancePay,
			jrrPaymentMethod : jrrPaymentMethod,
			jrrMoney : jrrMoney,
			jrrTheContract : jrrTheContract,
			jrrRenewalCoding : jrrRenewalCoding,
			jcdId : jcdId,
			adminUser : adminUser,
			jcdHouseAddress : row.hdCommunity + ' ' + row.hrAddBuilding + ' '
				+ row.hrAddDoorplateno,
			jrrManageCost : jrrManageCost,
			jrrServerCost : jrrServerCost,
			jrrManagePayment : jrrManagePayment,
			jrrServerPayment : jrrServerPayment,
			jrrTypeOfContract : 2,
			hrHouseDeposit : addDeposit,
			advanceMode : advanceMode,
			numberMode : numberMode,
			houseId : row.hrHouseId,
			idcardType : idcardType,
		}
		console.log(insertData);
		var insertDataStr = JSON.stringify(insertData);
		// var ectTemplateFillValue = "{'jsonVal':[{'1':'"+renant
		// +"','2':'','3':'"+idcard+"','4':'"+telphone+"','5':'','6':'','7':'"+rentalAddress+"','8':'"+squareMeter+"','9':'"+houseType+"','10':'"+beginDate+"','11':'"+endDate+"','12':'"+capitalAmount+"','13':'"+lowercaseAmount+"','14':'"+
		// jrrServerCost+"','15':'"+paymentDate+"','16':'"+deliveryDay+"','17':'"+waterNum+"','18':'"+electricityNum+"','19':'"+gasNum+"','20':'','Signer2':'','Signer1':'','21':'"
		// +signingDate+"'}],'insertData':"+insertDataStr+"}";

		// 拼凑好合同数据
		var ectTemplateFillValue = "{'jsonVal':[{'contractNo':'','idcard':'"
			+ idcard + "','renant':'" + renant
			+ "','agent':'','mailingAddress':'','rentalAddress':'"
			+ rentalAddress + "','capitalAmount':'" + capitalAmount
			+ "','telphone':'" + telphone + "','email':'','squareMeter':'"
			+ squareMeter + "','houseType':'" + houseType
			+ "','beginDate':'" + beginDate + "','endDate':'" + endDate
			+ "','lowercaseAmount':'" + lowercaseAmount
			+ "','serviceFee':'" + serviceFee + "','rentType':'"
			+ jrrPaymentMethod + "','paymentDate':'" + paymentDate
			+ "','deliveryDay':'" + deliveryDay + "','Truce1':'" + Truce1
			+ "','Truce2':'" + Truce2 + "','waterNum':'" + waterNum
			+ "','electricityNum':'" + electricityNum + "','gasNum':'"
			+ gasNum + "','remark':'" + remark
			+ "','Signer1':'','salesman':'" + salesman
			+ "','signingDate':'" + signingDate
			+ "','Signer2':''}],'insertData':" + insertDataStr
			+ ",'lastHouseDeposit':" + row.hrHouseDeposit
			+ ",'wxgzhImgPath':''}";

		$.ajax({
			type : "post",
			url : "../signContract.action",
			data : {
				ectOperatingId : _loginUserId,
				ectHsId : row.hrHouse4storeId,
				ectHrId : row.hrId,
				ectHrRenterId : row.hrRenterId,
				ectUserCode : ectUserCode,
				ectIdCard : ectIdCard,
				popId : row.popId,
				hrUserId : row.hrUserId,
				ectName : ectName,
				ectTelphone : ectTelphone,
				ectTemplateFillValue : ectTemplateFillValue,
			},
			dataType : "json",
			success : function(data) {
				hideLoading();
				if (data.code < 0) {
					console.log('没发送到信息');

					myTips(data.msg, "error");

					return;
				} else {
					console.log('发送成功');
					hideLoading();
					$.messager.alert('通知', '已发送短信，请提醒租客注意查收短信', 'success');
					querySourceInfo(_pageNum[0], 0);
					$('#renterRenewDlg').dialog('close');
				}
			}
		});
		}

}
function choosePopulation() {
	$('#chosePopulationDlg').show();
	$('#chosePopulationDlg').dialog({
		title : '选择新租客',
		top : getTop(420),
		left : getLeft(700),
		width : 700,
		height : 420,
		closed : true,
		cache : false,
		modal : true
	});

	$('#chosePopTable').datagrid({
		columns : [ [ {
			field : 'popName',
			title : '姓名',
			width : "20%",
			align : 'center'
		}, {
			field : 'popTelephone',
			title : '电话',
			width : "30%",
			align : 'center'
		}, {
			field : 'popIdcard',
			title : '身份证',
			width : "46%",
			align : 'center'
		} ] ],
		width : '99%',
		height : '75%',
		singleSelect : true,
		autoRowHeight : false,
		pageSize : 10,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		onDblClickRow : function(rowIndex, rowData) {
			var row = $('#chosePopTable').datagrid('getSelected');
			$('#newrenterPopName').val(row.popName);
			$('#newrenterPopTelephone').val(row.popTelephone);
			$('#newrenterPopIdcard').val(row.popIdcard);
			$('#newrenterPopId').val(row.popId);
			$('#newpopResident').val(row.popRenter);

			$('#chosePopulationDlg').dialog('close');

		}
	});
	queryPop(1, 0);
	$('#chosePopulationDlg').dialog('open');
}
// 选择人口表导入数据
function queryPop(page, type) {
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var renterName = $("#searchPopName").val();
	var renterPhone = $("#searchPopPhone").val();
	var popIdcard = $('#searchPopIdcard').val();

	$.post("../selectPopulationCommon.action", {
		startNum : startNum,
		endNum : endNum,
		popName : renterName,
		popTelephone : renterPhone,
		popIdcard : popIdcard
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 9);
			$('#chosePopTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 9);
			}
			$("#chosePopTable").datagrid("loadData", data);
		}
	}, "json");
}
// 更换租客对话框
function renterChange() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		myTips("请选择一套房源进行更换租客操作！", "error");
		return;
	}
	console.log(row)
	for ( var i in row) {
		if (row[i] == null) {
			row[i] = "";
		}
		$('#old' + i).val(row[i]);
	}
	$('#renterChangeDlg').show();
	$('#renterChangeDlg').dialog({
		title : '更换租客',
		top : getTop(250),
		left : getLeft(500),
		width : 500,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#renterChangeDlg input').val('');
		},
	});
	$('#renterChangeDlg').dialog('open');
}

function doChangeRenter() {
	var popResident = $('#newpopResident').val();
	var popId = $('#newrenterPopId').val();
	var renterPopTelephone = $('#newrenterPopTelephone').val();
	var renterPopName = $('#newrenterPopName').val();
	var renterPopIdcard = $('#newrenterPopIdcard').val();
	var hrId = $('#oldhrId').val();
	var oldhrRenterId = $('#oldhrRenterId').val();
	var renterUserId = _loginUserId;
	var renterDepartment = _loginDepartment;
	var renterStorefront = _loginStore;
	var hrHouse4storeId = $('#oldhrHouse4storeId').val();
	var hrHouseId = $('#oldhrHouseId').val();
	// 存为原租客的名字 后来写跟进用
	var renterPopNameRemark = $('#oldrenterPopName').val();
	// 存为原租客的popid 后来写跟进用
	var jciId = $('#oldpopId').val();

	if (jciId == popId) {
		myTips("原租客跟新租客不能是同一人！", "error");
		return;
	}

	var userName = _loginUserName;

	var jcdHouseAddress = $('#olddetailedAddress').val();

	$.ajax({
		type : 'post',
		url : '../changeRenter.action',
		data : {
			popResident : popResident,
			popId : popId,
			renterPopTelephone : renterPopTelephone,
			renterPopName : renterPopName,
			renterPopIdcard : renterPopIdcard,
			jrrRenterId : oldhrRenterId,
			hrId : hrId,
			renterUserId : renterUserId,
			renterDepartment : renterDepartment,
			renterStorefront : renterStorefront,
			hrHouse4storeId : hrHouse4storeId,
			hrHouseId : hrHouseId,
			renterPopNameRemark : renterPopNameRemark,
			jciId : jciId,
			userName : userName,
			jcdHouseAddress : jcdHouseAddress,
		},
		success : function(result) {
			if (result.code == 1) {
				myTips("更换租客成功!", "success");
				$('#renterChangeDlg').dialog('close');
				$('#chosePopulationDlg').dialog('close');
				$('#roomInfoDlg').dialog('close');

				querySourceInfo(_pageNum[0], 0);
			} else {
				myTips("更换租客失败!", "error");
			}
		}
	});
}

// 列表下方跟进的详细界面
function downFollowInfo(row) {
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
			$('#downFollowInfo [clano=clano]').text('');
		},
	});
	for ( var i in row) {
		if (i == 'jhfFollowRemark') {
			$('#readDownFollow' + i).html(
				"&nbsp;&nbsp;&nbsp;&nbsp;"
				+ row[i].replace(/\n/g,
				"<br>&nbsp;&nbsp;&nbsp;&nbsp;"));
		} else {
			$('#readDownFollow' + i).html(row[i]);
		}

	}

	$('#downFollowInfo').dialog('open');
}

function rentMetter() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		myTips("请选择一套房源进行添加抄表！", "error");
		return;
	}
	if (row.hrLeaseState == "在租") {
		$("#addWegDlg").dialog({
			title : '添加抄表',
			top : getTop(260),
			left : getLeft(500),
			width : 500,
			height : 280,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$("#addWegDlg input").val('');
				$("#addWegDlg select").val('');
			}
		});
		queryWegInfo(row);
		$("#addWegDlg").dialog('open');
	} else if (row.hrLeaseState == "退租") {
		$("#addCheckoutWegDlg").dialog({
			title : '添加抄表',
			top : getTop(160),
			left : getLeft(400),
			width : 400,
			height : 200,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$("#addCheckoutWegDlg input").val('');
			}
		});
		if (row.hrMeterReadingRecord != null && row.hrMeterReadingRecord != "") {
			var hrMeterReadingRecord = eval('('
				+ row.hrMeterReadingRecord.getRealJsonStr() + ')');
			$("#checkout_weg_waterLastNums").val(
				hrMeterReadingRecord.water.lastReading);
			$("#checkout_weg_ctritLastNums").val(
				hrMeterReadingRecord.electrit.lastReading);
			$("#checkout_weg_gasLastNums").val(
				hrMeterReadingRecord.gas.lastReading);

			if (hrMeterReadingRecord.water.thisReading.length > 0) {
				$("#checkout_weg_waterThisNums")
					.val(
						hrMeterReadingRecord.water.thisReading[hrMeterReadingRecord.water.thisReading.length - 1]);
			} else {
				$("#checkout_weg_waterThisNums").val(
					hrMeterReadingRecord.water.lastReading);
			}
			if (hrMeterReadingRecord.electrit.thisReading.length > 0) {
				$("#checkout_weg_ctritThisNums")
					.val(
						hrMeterReadingRecord.electrit.thisReading[hrMeterReadingRecord.electrit.thisReading.length - 1]);
			} else {
				$("#checkout_weg_ctritThisNums").val(
					hrMeterReadingRecord.electrit.lastReading);
			}
			if (hrMeterReadingRecord.gas.thisReading.length > 0) {
				$("#checkout_weg_gasThisNums")
					.val(
						hrMeterReadingRecord.gas.thisReading[hrMeterReadingRecord.gas.thisReading.length - 1]);
			} else {
				$("#checkout_weg_gasThisNums").val(
					hrMeterReadingRecord.gas.lastReading);
			}
		} else {
			$("#checkout_weg_waterLastNums").val(0);
			$("#checkout_weg_waterThisNums").val(0);
			$("#checkout_weg_ctritLastNums").val(0);
			$("#checkout_weg_ctritThisNums").val(0);
			$("#checkout_weg_gasLastNums").val(0);
			$("#checkout_weg_gasThisNums").val(0);
		}
		$("#checkoutWegTips").text("");
		$("#addCheckoutWegDlg").dialog('open');
	}
}
function queryWegInfo(row) {
	$("#add_weg_address").val(
		row.hrAddCity + row.hrAddDistrict + row.hrAddZone + row.hrAddStreet
		+ row.hrAddCommunity + row.hrAddBuilding
		+ row.hrAddDoorplateno);
	$.post("../selectWegReadingAll.action", {
		wegrdHouse4storeId : row.hrHouse4storeId
	}, function(data) {
		if (data.code < 0) {

		} else {
			data = data.body;
			var waterFlag = 0;
			var ctritFlag = 0;
			var gasFlag = 0;
			for ( var i in data) {
				for ( var j in data[i]) {
					if (data[i][j] == null) {
						data[i][j] = '';
					}
				}
				if (data[i].wegrdType == '水表') {
					if (waterFlag == 0) {
						$("#add_weg_waterLastNums").val(data[i].wegrdNums);
						$("#add_weg_waterLastDate").val(
							data[i].wegrdMonth.split('T')[0]);
						waterFlag++;
					}
				} else if (data[i].wegrdType == '电表') {
					if (ctritFlag == 0) {
						$("#add_weg_ctritLastNums").val(data[i].wegrdNums);
						$("#add_weg_ctritLastDate").val(
							data[i].wegrdMonth.split('T')[0]);
						ctritFlag++;
					}
				} else if (data[i].wegrdType == '燃气表') {
					if (gasFlag == 0) {
						$("#add_weg_gasLastNums").val(data[i].wegrdNums);
						$("#add_weg_gasLastDate").val(
							data[i].wegrdMonth.split('T')[0]);
						gasFlag++;
					}
				}
			}
		}
	}, "json");
}
function doAddWegReading() {
	var row = $('#sourceInfoDg').datagrid('getSelected');

	var wegrdWaterNums = $("#add_weg_waterNums").val();
	var wegrdCtritNums = $("#add_weg_ctritNums").val();
	var wegrdGasNums = $("#add_weg_gasNums").val();

	var wegrdMonth = $("#add_weg_date").val();
	var wegrdDoUserId = $("#doWegGetUserId").val();
	if (wegrdWaterNums == '') {
		wegrdWaterNums = 0;
	}
	if (wegrdCtritNums == '') {
		wegrdCtritNums = 0;
	}
	if (wegrdGasNums == '') {
		wegrdGasNums = 0;
	}
	$.post("../insertWegReadingInRent.action", {
		wegrdRenterId : row.hrRenterId,
		wegrdHouse4rentId : row.hrId,
		wegrdHouse4storeId : row.hrHouse4storeId,
		wegrdUserId : _loginUserId,
		wegrdDoUserId : wegrdDoUserId,
		wegrdDepartment : _loginDepartment,
		wegrdStorefront : _loginStore,
		// wegrdType : '水表',
		wegrdMonth : wegrdMonth,
		wegrdNature : '正常抄表',
		waterReading : wegrdWaterNums,
		electricReading : wegrdCtritNums,
		gasReading : wegrdGasNums,
	}, function(data) {
		if (data.code < 0) {
			myTips("抄表失败！", "error");
		} else {
			myTips("抄表成功！", "success");
		}
	});
}

// 添加租客意向人
function addIntended() {
	$("#addIntendedDlg").dialog({
		title : '添加意向人',
		top : getTop(150),
		left : getLeft(600),
		width : 600,
		height : 150,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addIntendedDlg input").val('');
		}
	});
	$("#addIntendedDlg").dialog('open');
}
function doAddIntended() {
	var ipName = $("#intendedPopName").val();
	var ipTel = $("#intendedPopPhone").val();
	$.post("../insertIntendedPerson.action", {
		ipName : ipName,
		ipTel : ipTel,
		ipUserId : _loginUserId,
		ipDepartmentId : _loginDepartment,
		ipStorefrontId : _loginStore,
		ipState : '待定',
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, "error");
		} else {
			myTips("添加成功！", "success");
			queryRenter(1, 0);
			// queryRenter1(1,0);
			$("#addIntendedDlg").dialog('close');
		}
	});
}
// 账户类型和账号联动
function changeWay1(type) {
	var faPaymentType = $("#depositFinancialWay").find("option:selected").text();
	$("#depositFinancialBankNums").val('');
	$("#depositFinancialAccountNums").val('');
	$("#depositFinancialAccountBelong").val('');
	$("#depositAccountName").empty();
	$("#depositAccountName").append("<option></option>");
	if (faPaymentType == '') {
		return;
	}
	$.post("../selectNamePublic.action", {
		faPaymentType : faPaymentType,
	}, function(data) {
		$("#depositAccountName").empty();
		$("#depositAccountName").append("<option></option>");
		for ( var i in data.body) {
			$("#depositAccountName").append(
				"<option value='" + data.body[i].faId + "*#*"
				+ data.body[i].faBelonging + "*#*"
				+ data.body[i].faAccount + "'>"
				+ data.body[i].faUserName + "</option>");
		}
		if (type != 0) {
			for ( var i in data.body) {
				if (data.body[i].faId == type) {
					$("#depositAccountName").val(
						data.body[i].faId + "*#*"
						+ data.body[i].faBelonging + "*#*"
						+ data.body[i].faAccount);
					getAccountId1();
				}
			}
		}
	});
}

function getAccountId1() {
	if ($("#depositAccountName").val() == '') {
		return;
	}
	$("#depositFinancialBankNums").val($("#depositAccountName").val().split("*#*")[0]);
	$("#depositFinancialAccountNums").val($("#depositAccountName").val().split("*#*")[2]);
	$("#depositFinancialAccountBelong").val($("#depositAccountName").val().split("*#*")[1]);
}

/** ****************************租客短信发送处理******************************** */
// 打开发送短信对话框
function sendMessageDlg() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		myTips("请选择一套房源进行发送短信操作！", "error");
		return;
	}
	$("#sendMessageDlg").dialog(
		{
			title : '发送短信',
			top : getTop(150),
			left : getLeft(600),
			width : 600,
			height : 210,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$("#sendMessageDlg input").val('');
				$("#sendMessageDlg select").val('');
				$("#sendMessageDlg textarea").val('');
				$('#sendMessageDlg [clear="clear"]').val('');
				$('#sendMessageDlg [clear="clear"]').html('');
				$('#sendMessageDlg [require="require"]').css('border',
					'1px solid #a9a9a9');
				clearAttachment();
			}
		});

	$("#sendMessageRenterId").val(row.hrRenterId);
	$("#sendMessageLandlordId").val(row.hrLandlordId);
	$("#sendMessageHouseRentId").val(row.hrId);
	$("#sendMessageHouseStoreId").val(row.hrHouse4storeId);
	$("#sendMessageRoomAddress").val(
		row.hrAddCommunity + row.hrAddBuilding + row.hrAddDoorplateno);

	$("#sendMessageSendInfo").hide();
	$("#sendMessageDlg").dialog('open');
}
// 选择短信类型 改变发送界面
function resizeSendMessage() {
	var sendType = $("#sendMessageType").val();
	if (sendType == '') {
		$("#sendMessageSendInfo").hide();
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 210
		});
		return;
	}
	$("#sendMessageSendInfo").show();
	$("#sendMessageTips").html("");
	if (sendType == 1) {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 320
		});
		$("#sendMessageDivOne").show();
		$("#sendMessageDivTwo").hide();
		$("#sendMessageDivThree").hide();
	} else if (sendType == 2) {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 260
		});
		$("#sendMessageGoOnMoneyDiv").hide();
		$("#sendMessageCSPhoneDiv").show();
		$("#sendMessageAddressDiv").hide();
		$("#sendMessageDivOne").hide();
		$("#sendMessageDivTwo").show();
		$("#sendMessageDivThree").hide();
	} else if (sendType == 3 || sendType == 6) {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 270
		});
		$("#sendMessageGoOnMoneyDiv").hide();
		$("#sendMessageCSPhoneDiv").show();
		$("#sendMessageAddressDiv").show();
		$("#sendMessageDivOne").hide();
		$("#sendMessageDivTwo").show();
		$("#sendMessageDivThree").hide();
	} else if (sendType == 4 || sendType == '') {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 210
		});
		$("#sendMessageSendInfo").hide();
		$("#sendMessageDivOne").hide();
		$("#sendMessageDivTwo").hide();
		$("#sendMessageDivThree").hide();
	} else if (sendType == 5) {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 255
		});
		$("#sendMessageGoOnMoneyDiv").show();
		$("#sendMessageCSPhoneDiv").hide();
		$("#sendMessageAddressDiv").hide();
		$("#sendMessageDivOne").hide();
		$("#sendMessageDivTwo").show();
		$("#sendMessageDivThree").hide();
	} else if (sendType == 7) {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 305
		});
		$("#sendMessageDivOne").hide();
		$("#sendMessageDivTwo").hide();
		$("#sendMessageDivThree").show();
		$("#sendMessageDeadlineDiv").hide();
		$("#sendMessageUnpaidmMoneyDiv").show();
		$("#sendMessageUnpaidmNoteDiv1").show();
		$("#sendMessageUnpaidmNoteDiv2").show();
	} else if (sendType == 8) {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 265
		});
		$("#sendMessageDivOne").hide();
		$("#sendMessageDivTwo").hide();
		$("#sendMessageDivThree").show();
		$("#sendMessageDeadlineDiv").show();
		$("#sendMessageUnpaidmMoneyDiv").hide();
		$("#sendMessageUnpaidmNoteDiv1").hide();
		$("#sendMessageUnpaidmNoteDiv2").hide();
	} else if (sendType == 9) {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 210
		});
		$("#sendMessageSendInfo").hide();
		$("#sendMessageDivOne").hide();
		$("#sendMessageDivTwo").hide();
		$("#sendMessageDivThree").hide();
		$("#sendMessageDeadlineDiv").hide();
		$("#sendMessageUnpaidmMoneyDiv").hide();
		$("#sendMessageUnpaidmNoteDiv1").hide();
		$("#sendMessageUnpaidmNoteDiv2").hide();
	} else if (sendType == 10) {
		$("#sendMessageDlg").dialog('resize', {
			width : 600,
			height : 210
		});
		$("#sendMessageSendInfo").hide();
		$("#sendMessageDivOne").hide();
		$("#sendMessageDivTwo").hide();
		$("#sendMessageDivThree").hide();
		$("#sendMessageDeadlineDiv").hide();
		$("#sendMessageUnpaidmMoneyDiv").hide();
		$("#sendMessageUnpaidmNoteDiv1").hide();
		$("#sendMessageUnpaidmNoteDiv2").hide();
	}
}
// 发送短信金额
function changeSendPrice(obj) {
	var regStrs = [ [ '^0(\\d+)$', '$1' ], // 禁止录入整数部分两位以上，但首位为0
		[ '[^\\d\\.]+$', '' ], // 禁止录入任何非数字和点
		[ '\\.(\\d?)\\.+', '.$1' ], // 禁止录入两个以上的点
		[ '^(\\d+\\.\\d{2}).+', '$1' ] // 禁止录入小数点后两位以上
	];
	for (i = 0; i < regStrs.length; i++) {
		var reg = new RegExp(regStrs[i][0]);
		obj.value = obj.value.replace(reg, regStrs[i][1]);
	}
	var oneInput = $("#sendMessageDivOne input");
	var money = 0;
	var note = '其中包含';
	for ( var i in oneInput) {
		if (oneInput[i].id != 'sendMessagePirce') {
			if ($("#" + oneInput[i].id).val() == '') {
				money += 0;
			} else {
				money = accAdd(money, $("#" + oneInput[i].id).val());
			}
			if ($("#" + oneInput[i].id).val() != ''
				&& $("#" + oneInput[i].id).val() != 0
				&& $("#" + oneInput[i].id).val() != '.'
				&& $("#" + oneInput[i].id).attr('moneyType')) {
				note += $("#" + oneInput[i].id).attr('moneyType') + "、";
			}
		}
	}
	note = note.substring(0, note.length - 1);
	note += "。";
	if (note == "其中包。") {
		note = "无";
	}

	$("#sendMessageNote").val(note);
	$("#sendMessagePirce").val(money);
}
// 执行发送短信
function doSendMessage() {
	if (doCheckSendMessage() == 0) {
		return;
	}
	var row = 				$('#sourceInfoDg').datagrid('getSelected');
	var smPopId = 			$("#sendMessagePopId").val();
	var smlandId = 			$("#sendMessageLandlordId").val();
	var smrentId = 			$("#sendMessageRenterId").val();
	var smMoney = 			$("#sendMessagePirce").val();
	var smNote = 			$("#sendMessageNote").val();
	var smRentId = 			$("#sendMessageHouseRentId").val();
	var smNotRentId = 		$("#sendMessageHouseStoreId").val();
	var serviceTelephone = 	$("#sendMessageCSPhone").val();
	var companyAddress = 	$("#sendMessageAddress").val();
	var goOnMoney = 		$("#sendMessageGoOnMoney").val();
	var unpaidmMoney = 		$("#sendMessageUnpaidmMoney").val();
	var deadline = 			$("#sendMessageDeadline").val();
	var unpaidmNote = 		$("#sendMessageUnpaidmNote").val();
	var type = 				$("#sendMessageType").val();
	var sendType = 			$("#sendMessageManType").val();
	// var followMark = $("#sendMessageNote").val();
	var sendMessageUnpaidmMoney = $("#sendMessageUnpaidmMoney").val();

	var att = $("att").val();
	var followMark = "";

	switch (type) {
		case "1":
			followMark = followMark + "【发送短信】：租金提醒：" + smNote;
			break;
		case "2":
			followMark = followMark + "【发送短信】：合同到期提醒" + smNote;
			break;
		case "3":
			followMark = followMark + "【发送短信】：合同即将到期续签提醒";
			break;
		case "4":
			followMark = followMark + "【发送短信】：合同到期不做出租提醒";
			break;
		case "5":
			followMark = followMark + "【发送短信】：合同续租确认提醒：续租金额："+goOnMoney;
			break;
		case "6":
			followMark = followMark + "【发送短信】：合同已经到期续签提醒";
			break;
		case "7":
			followMark = followMark + "【发送短信】：欠费提醒：欠费金额：" + sendMessageUnpaidmMoney;
			break;
		case "8":
			followMark = followMark + "【发送短信】：欠费日期截止提醒：欠费日期截止："+deadline;
			break;
		case "9":
			followMark = followMark + "【发送短信】：微信关注提醒";
			break;
	}
	$.post("../insertHousingFollow.action", {
		jhfHouseId 			: row.hrHouseId,
		jhfHouse4rentId 	: row.hrId,
		jhfHouse4storeId 	: row.hrHouse4storeId,
		jhfFollowRemark 	: followMark,
		jhfFollowResult 	: "跟进成功",
		jhfFollowBelong 	: "其他",
		jhfPaymentWay 		: "系统跟进",
		jhfUserId 			: _loginUserId,
		jhfDepartment 		: _loginDepartment,
		jhfStorefront 		: _loginStore,
		arr : att,
	}, function(data2) {

	});
	if (type == 1) {
		// 租客催租短信JSON
		var renterRentJson = {
			smPopId : smPopId,
			smrentId : smrentId,
			smMoney : smMoney,
			smNote : smNote,
			smRentId : smRentId,
			smNotRentId : smNotRentId,
			messageType : 7,
			smUserId : _loginUserId,
		};

		$.post("../massage/sendOutsideMessage.action", renterRentJson,
			function(data) {
				if (data.code < 0) {
					myTips(data.msg, "error");
					hideLoading();
					return;
				}
				if (data != -1 && data != '') {
					myTips("发送成功!", "success");
					$("#sendMessageDlg").dialog('close');
					hideLoading();
					$("#sendMessageTips").html("");
				}
			});
		queryFollow1(row, 1, 0);
	} else if (type == 2 || type == 3 || type == 4 || type == 5 || type == 6) {
		type--;
		// 租客合同类提醒短信
		var contractJson = {
			smPopId : smPopId,
			smrentId : smrentId,
			smRentId : smRentId,
			smNotRentId : smNotRentId,
			messageType : type,
			serviceTelephone : serviceTelephone,
			companyAddress : companyAddress,
			smMoney : goOnMoney,
			smUserId : _loginUserId,
		};
		$.post("../massage/sendOutsideMessage.action", contractJson, function(
			data) {
			if (data.code < 0) {
				myTips(data.msg, "error");
				hideLoading();
				return;
			}

			myTips("发送成功!", "success");
			$("#sendMessageDlg").dialog('close');
			queryFollow1(row, 1, 0);
			hideLoading();
			$("#sendMessageTips").html("");
		});
		queryFollow1(row, 1, 0);
	} else if (type == 7 || type == 8) {
		type = parseInt(type) + 1;
		console.log(type);
		// 租客欠费提醒短信JSON
		var renterMoneyJson = {
			smPopId : smPopId,
			smrentId : smrentId,
			smMoney : unpaidmMoney,
			smNote : unpaidmNote,
			deadline : deadline,
			smRentId : smRentId,
			smNotRentId : smNotRentId,
			messageType : type,
			smUserId : _loginUserId,
		};
		$.post("../massage/sendOutsideMessage.action", renterMoneyJson,
			function(data) {
				if (data.code < 0) {
					myTips(data.msg, "error");
					hideLoading();
					return;
				}
				myTips("发送成功!", "success");
				$("#sendMessageDlg").dialog('close');
				hideLoading();
				$("#sendMessageTips").html("");
			});
		queryFollow1(row, 1, 0);
	} else if (type == 9) {
		var renterJson = {
			smPopId : smPopId,
			smrentId : smrentId,
			smRentId : smRentId,
			smNotRentId : smNotRentId,
			messageType : 6,
			smUserId : _loginUserId,
		};
		$.post("../massage/sendOutsideMessage.action", renterJson, function(
			data) {
			if (data.code < 0) {
				myTips(data.msg, "error");
				hideLoading();
				return;
			}
			myTips("发送成功!", "success");
			$("#sendMessageDlg").dialog('close');
			hideLoading();
			$("#sendMessageTips").html("");
		});
		queryFollow1(row, 1, 0);

	}
	//写入跟进



}



// 选择接收人类型
function changeSendMan() {
	var sendType = $("#sendMessageManType").val();
	$("#sendMessageTips").html("");
	$("#sendMessageName").empty();
	$("#sendMessagePhone").val('');
	$("#sendMessagePopId").val('');
	if (sendType == '租客') {
		var renterId = $("#sendMessageRenterId").val();
		// 租客信息
		$.post("../queryAllRenter.action", {
			renterId : renterId
		}, function(data) {
			if (data.code < 0) {
				return;
			}
			data = data.body;
			for ( var i in data[0]) {
				if (data[0][i] == null) {
					data[0][i] = '';
				}
			}
			$("#sendMessageName").append(
				"<option value='" + data[0].renterPopulationId + "'>"
				+ data[0].renterPopName + "</option>");
			$("#sendMessageName").val(data[0].renterPopulationId);
			$("#sendMessagePhone").val(data[0].renterPopTelephone);
			$("#sendMessagePopId").val(data[0].renterPopulationId);
			$('#hrRenterNameRemark').val(data[0].popNameRemark);
		});
	} else if (sendType == '住户') {

		var rtHrId = $("#sendMessageHouseRentId").val();
		// 住户信息
		$.post("../selectResidentTable.action", {
			rtHrId : rtHrId,
			rtType : '在住',
		}, function(data) {
			if (data.code < 0) {
				$("#sendMessageTips").html("此已租房暂无住户！");
				$("#sendMessageName").append("<option></option>");
				$("#sendMessageName").empty();
				$("#sendMessageManType").val('');
				return;
			}
			data = data.body;
			for ( var i in data) {
				for ( var j in data[i]) {
					if (data[i][j] == null) {
						data[i][j] = '';
					}
				}
				$("#sendMessageName").append(
					"<option value='" + data[i].rtPlId + "#"
					+ data[i].popTelephone + "#"
					+ data[i].rPopNameRemark + "'>"
					+ data[i].popName + "</option>");
			}
			$("#sendMessagePopId").val(
				$("#sendMessageName").val().split("#")[0]);
			$("#sendMessagePhone").val(
				$("#sendMessageName").val().split("#")[1]);
			$('#hrRenterNameRemark').val(
				$("#sendMessageName").val().split("#")[2]);
		});
	} else if (sendType == '业主') {
		var landlordId = $("#sendMessageLandlordId").val();
		// 业主信息
		$.post("../queryByHouse4rentOfLandlordId.action", {
			landlordId : landlordId
		}, function(data) {
			data = data.body;
			for ( var i in data[0]) {
				if (data[0][i] == null) {
					data[0][i] = '';
				}
			}
			$("#sendMessageName").append(
				"<option value='" + data[0].laPopulationId + "'>"
				+ data[0].laPopName + "</option>");
			$("#sendMessageName").val(data[0].laPopulationId);
			$("#sendMessagePhone").val(data[0].laPopTelephone);
			$("#sendMessagePopId").val(data[0].laPopulationId);
			$('#hrRenterNameRemark').val(data[0].popNameRemark);
		});
	} else if (sendType == '') {
		$("#sendMessagePhone").val('');
		$("#sendMessagePopId").val('');
	}
}
// 短信预览
function previewSendMessage() {

	if (doCheckSendMessage() == 0) {
		return;
	}
	var smPopId = $("#sendMessagePopId").val();
	var reciveManName = $("#sendMessageName").find("option:selected").text();
	var smlandId = $("#sendMessageLandlordId").val();
	var smrentId = $("#sendMessageRenterId").val();
	var smMoney = $("#sendMessagePirce").val();
	var smNote = $("#sendMessageNote").val();
	var smRentId = $("#sendMessageHouseRentId").val();
	var smNotRentId = $("#sendMessageHouseStoreId").val();
	var serviceTelephone = $("#sendMessageCSPhone").val();
	var companyAddress = $("#sendMessageAddress").val();
	var goOnMoney = $("#sendMessageGoOnMoney").val();
	var unpaidmMoney = $("#sendMessageUnpaidmMoney").val();
	var deadline = $("#sendMessageDeadline").val();
	var unpaidmNote = $("#sendMessageUnpaidmNote").val();
	var type = $("#sendMessageType").val();
	var sendType = $("#sendMessageManType").val();
	var roomAddress = $("#sendMessageRoomAddress").val();

	if (type == 1) {
		note = '【房至尊】尊敬的 ' + reciveManName + ' 租户，您好。您的租房 ' + roomAddress
			+ ' ，本期租金等费用为' + smMoney + '（备注：' + smNote
			+ '），交租日为2000-01-01，请您按时交租，过了期将产生滞纳金，感谢支持。';
	} else if (type == 2) {
		note = '【房至尊】尊敬的' + reciveManName + ' 租户，您好。您的租房 ' + roomAddress
			+ ' ，本期合同将于2000-01-01到期，续租详情请尽快联系客服，电话' + serviceTelephone
			+ '，谢谢配合！';
	} else if (type == 3) {
		note = '【房至尊】尊敬的 ' + reciveManName + ' 租户，您好。您的租房 ' + roomAddress
			+ ' ，本期合同即将到期，请尽快办理续签手续，我司办公地址：' + companyAddress + '，客服：'
			+ serviceTelephone + '，感谢支持！';
	} else if (type == 4) {
		note = '【房至尊】尊敬的 ' + reciveManName + ' 租户，您好。您的租房 ' + roomAddress
			+ ' ，合同将于2000-01-01期满，期满后我司暂不作出租安排，请您准时搬离并做退房手续!';
	} else if (type == 5) {
		note = '【房至尊】尊敬的 ' + reciveManName + ' 租户，您好。您的租房 ' + roomAddress
			+ ' ，本期合同将于2000-01-01到期，续签租金' + goOnMoney
			+ '，如确认以上续租信息，请务必回复“是”。谢谢！';
	} else if (type == 6) {
		note = '【房至尊】尊敬的 ' + reciveManName + ' 租户，您好。您的租房 ' + roomAddress
			+ ' ，本期合同已经过期，请尽快办理续签手续，我司办公地址：' + companyAddress + '，客服：'
			+ serviceTelephone + '，感谢支持！';
	} else if (type == 7) {
		note = '【房至尊】尊敬的 ' + reciveManName + ' 租户，您好。您的租房 ' + roomAddress
			+ ' ，本期费用有' + unpaidmMoney + '尚未结清（备注：' + unpaidmNote
			+ '），请及时缴纳，感谢支持。';
	} else if (type == 8) {
		note = '【房至尊】尊敬的 ' + reciveManName + ' 租户，您好。您的租房 ' + roomAddress
			+ ' 欠费已久，请在' + deadline + '前交清相关费用，过了期将按合同条款进行收房处理！谢谢配合。';
	} else if (type == 9) {
		note = '【华兆资产】尊敬的客户，您可通过搜索微信公众号：hz4000616414或扫描租赁合同头部二维码添加我司公众号，点击底部“用户中心”即可操作：微信缴费、费用查询、自助报修等！首次登陆需输入身份证、手机号码进行验证。'
	}
	$("#previewSendMessageDlg").dialog({
		title : '发送短信',
		top : getTop(150),
		left : getLeft(420),
		width : 420,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#previewSendMessageDlg textarea").val('');
		}
	});
	$("#previewSendMessageType").val(
		$("#sendMessageType").find("option:selected").text());
	$("#previewSendMessageNote").val(note);
	$("#previewSendMessageDlg").dialog("open");
}
// 发送短信验证
function doCheckSendMessage() {

	var smPopId = $("#sendMessagePopId").val();
	var smlandId = $("#sendMessageLandlordId").val();
	var smrentId = $("#sendMessageRenterId").val();
	var smMoney = $("#sendMessagePirce").val();
	var smNote = $("#sendMessageNote").val();
	var smRentId = $("#sendMessageHouseRentId").val();
	var smNotRentId = $("#sendMessageHouseStoreId").val();
	var serviceTelephone = $("#sendMessageCSPhone").val();
	var companyAddress = $("#sendMessageAddress").val();
	var goOnMoney = $("#sendMessageGoOnMoney").val();
	var unpaidmMoney = $("#sendMessageUnpaidmMoney").val();
	var deadline = $("#sendMessageDeadline").val();
	var unpaidmNote = $("#sendMessageUnpaidmNote").val();
	var type = $("#sendMessageType").val();
	var sendType = $("#sendMessageManType").val();
	var sendMessagePhone = $("#sendMessagePhone").val();

	if (sendType == '业主') {
		$("#sendMessageTips").html("暂不支持对业主发送！");
		return 0;
	}
	if (type == 1) {
		if (smMoney == '' || smMoney == '0.00' || smMoney == '0.0'
			|| smMoney == '0') {
			$("#sendMessageTips").html("至少有一项缴费金额不为0！");
			return 0;
		}
	} else if (type == 2) {
		if (serviceTelephone == '') {
			$("#sendMessageTips").html("客服电话不能为空！");
			return 0;
		}
	} else if (type == 3) {
		if (serviceTelephone == '') {
			$("#sendMessageTips").html("客服电话不能为空！");
			return 0;
		} else if (companyAddress == '') {
			$("#sendMessageTips").html("公司地址不能为空！");
			return 0;
		}
	} else if (type == 5) {
		if (goOnMoney == '') {
			$("#sendMessageTips").html("续签租金不能为空！");
			return 0;
		}
	} else if (type == 6) {
		if (serviceTelephone == '') {
			$("#sendMessageTips").html("客服电话不能为空！");
			return 0;
		} else if (companyAddress == '') {
			$("#sendMessageTips").html("公司地址不能为空！");
			return 0;
		}
	} else if (type == 7) {
		if (unpaidmMoney == '') {
			$("#sendMessageTips").html("欠费金额不能为空！");
			return 0;
		}
	} else if (type == 8) {
		if (deadline == '') {
			$("#sendMessageTips").html("截止日期不能为空！");
			return 0;
		}
	}
	$("#sendMessageTips").html("");
	return 1;
}
/** *********************************短信发送end*********************************** */
// 检测租客合约编号
function contractNumCheckout(numId, ifId, tipsId) {
	if (_contractNums != 1) {
		return;
	}
	var detectionContract = $("#" + numId).val();
	if (detectionContract == '') {
		$("#" + tipsId).html("");// 编号不能为空！
		return;
	}
	$.post("../contractNumberdetection.action", {
		detectionContract : detectionContract,
	}, function(data) {
		if (data.code < 0) {
			$("#" + tipsId).html(data.msg);
			$("#" + tipsId).css("color", "red");
			return;
		} else {
			data = data.body;
			$("#" + tipsId).html("编号正确");
			$("#" + tipsId).css("color", "green");
			$("#" + ifId).val(data[0].jcdId);
		}
	});
}
// 已租房跟进列表取数据
function infoFollowInfo(type) {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (type == 0) {
		if (row) {
			queryFollow(row, 1, 0);
		} else {
			row = $('#sourceInfoDg').datagrid('getData').rows[0];
			queryFollow(row, 1, 0);
		}
	}
	if (type == 1) {
		queryFollow1(row, 1, 0);
	}
}
// 设置房管员
function updateManagerUser() {
	var row1 = $('#sourceInfoDg').datagrid('getSelected');
	var row = $('#sourceInfoDg').datagrid('getChecked');
	console.log(row1);
	console.log(row);
	if (!row) {
		myTips("请选择一个已租房进行房管员设置！", "error");
		return;
	}
	if(row.length>0){
		$('#updateManagerUserDlg').dialog({
			title : '设置房管员',
			top : getTop(260),
			left : getLeft(570),
			width : 570,
			height : 160,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#updateManagerUserDlg input').val('');
				$('#updateManagerUserDlg1').css('display','block');
			},
		});
		$('#updateManagerUserDlg').dialog('open');
		$('#updateManagerUserDlg1').css('display','none');
	}else {
		$('#updateManagerUserDlg').dialog({
			title: '设置房管员',
			top: getTop(260),
			left: getLeft(570),
			width: 570,
			height: 260,
			closed: true,
			cache: false,
			modal: true,
			onClose: function () {
				$('#updateManagerUserDlg input').val('');
			},
		});
		if (row1.hrManagerUserId != '' && row1.hrManagerUserId != null) {
			for ( var j in _userInfoData) {
				if (row1.hrManagerUserId == _userInfoData[j].userId) {
					$("#turnoverStore").val(
						_userInfoData[j].storefrontName + " "
						+ _userInfoData[j].departmentName + " "
						+ _userInfoData[j].suStaffName);
					$("#pickHrManagerShowUserInfo").val(
						_userInfoData[j].storefrontName + " "
						+ _userInfoData[j].departmentName + " "
						+ _userInfoData[j].suStaffName);
					$("#pickHrManagerGetUserStoreId").val(
						_userInfoData[j].suStoreId);
					$("#pickHrManagerGetUserDetId").val(
						_userInfoData[j].suDepartmentId);
					$("#pickHrManagerGetUserId").val(_userInfoData[j].userId);
				}
			}
		} else {
			$('#turnoverStore').val('暂无');
		}
		$('#turnoverAddress').val(row1.detailedAddress);
		$('#updateManagerUserDlg').dialog('open');
	}

}
// 选择门店
function choseStore(storeId, deptId, staffId) {
	var store = $('#' + storeId);
	var dept = $('#' + deptId);
	var staff = $('#' + staffId);
	dept.empty();
	staff.empty();
	dept.append("<option></option>");
	staff.append("<option></option>");
	var storefront = store.val();
	if (storefront == '') {
		return;
	}
	$.post("../queryDepartment.action", {
		departmentStorefrontId : storefront,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for ( var i in data.body) {
			dept.append("<option value = '" + data.body[i].departmentId + "'>"
				+ data.body[i].departmentName + "</option>");
		}
	}, "json");
}
// 选择部门
function choseDept(deptId, staffId) {
	var dept = $('#' + deptId);
	var staff = $('#' + staffId);
	staff.empty();
	staff.append("<option></option>");
	var deptment = dept.val();
	if (deptment == '') {
		return;
	}
	$.post("../queryUserByDepartmentID.action", {
		suDepartmentId : deptment
	}, function(data) {
		if (data.code < 0) {
			// $.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for ( var i in data) {
			staff.append("<option value = '" + data[i].userId + "'>"
				+ data[i].suStaffName + "</option>");
		}
	});
}
// 设置房管员
function doUpdateManagerUser() {
	var userId = $("#pickHrManagerGetUserId").val();
	var hrDepartment = $("#pickHrManagerGetUserDetId").val();
	var hrStorefront = $("#pickHrManagerGetUserStoreId").val();
	var row1 = $('#sourceInfoDg').datagrid('getSelected');
	var row = $('#sourceInfoDg').datagrid('getChecked');
	if (userId == '') {
		myTips("请选择一个新的房管员！", "error");
		return;
	}
	console.log(row1.hrHouse4storeId);
	console.log(row.length);
	if(row.length<1) {
		$.post('../updateHouseManager.action', {
			hrManagerUserId: userId,
			hrHouse4storeId: row1.hrHouse4storeId,
			hrDepartment: hrDepartment,
			hrStorefront: hrStorefront,
		}, function (data) {
			hideLoading();
			if (data.code < 0) {
				myTips(data.msg, "error");
				return;
			}
			myTips("设置成功！", "success");
			querySourceInfo(_pageNum[0], 0);
			$("#updateManagerUserDlg").dialog('close');
		});
	}else{
		for(var i in row){
			$.post('../updateHouseManager.action', {
				hrManagerUserId: userId,
				hrHouse4storeId: row[i].hrHouse4storeId,
				hrDepartment: hrDepartment,
				hrStorefront: hrStorefront,
			}, function (data) {
				hideLoading();
				if (data.code < 0) {
					myTips(data.msg, "error");
					return;
				}
				myTips("设置成功！", "success");
				querySourceInfo(_pageNum[0], 0);
				$("#updateManagerUserDlg").dialog('close');
			});
		}
	}
}
function addEvent() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		myTips("请选择一条记录", "error");
		return;
	}
	$("#addEventDlg").dialog(
		{
			title : "添加审批",
			top : getTop(340),
			left : getLeft(640),
			width : 640,
			height : 340,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#addEventDlg [clear="clear"]').val('');
				$('#addEventDlg [clear="clear"]').html('');
				$('#addEventDlg [choose="choose"]').val('');
				$('#addEventDlg [require="require"]').css('border',
					'1px solid #a9a9a9');
				$('#shorMessageRemind1').prop({
					checked : false
				});
				$('#ifSpeed').prop({
					checked : false
				});
				clearAttachment();
			}
		});
	clear();
	$('#payBankInfo').hide();
	$('#eaApprovalNumber').val(approvalNumber());
	$('.rentId').val(row.hrId);
	$('.storeId').val(row.hrHouse4storeId);
	$('.houseId').val(row.hrHouseId);
	$('.houseType').val('已租审批');
	$('.houseAddress').val(
		row.hrAddCommunity + row.hrAddBuilding + row.hrAddDoorplateno);

	$("#shorMessageRemind1").prop("checked", false);
	$('.amountInvolved').val(0);
	$('#ifSpeed').prop({
		checked : false
	});
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$("#addEventDlg").dialog('open');
}
// 生成审批编号
function approvalNumber() {
	var strNumber = '';
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	var day = myDate.getDate();
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	var rnd = "";
	for (var i = 0; i < 6; i++) {
		rnd += Math.floor(Math.random() * 10);
	}
	var yearStr = year.toString().substring(2, 4);
	strNumber = yearStr + month + day + rnd;
	return strNumber;
}

function clear() {
	$(".choseHouse").val("单击选择房源");
	$(".rentId").val("");
	$(".storeId").val("");
	$(".houseId").val("");
	$(".houseType").val("");
	$(".houseAddress").val("");
	$(".amountInvolved").val("");
	$(".amountType").val("");
	$(".eventType").val("");
	$("#eventHandlerDept").val("");

	$("#doEventShowUserInfo").val("");
	$("#doEventGetUserStoreId").val("");
	$("#doEventGetUserDetId").val("");
	$("#doEventGetUserId").val("");
	$("#eaApprovalNumber").val("");

	$("#eaBankName").val("");
	$("#eaBankUsername").val("");
	$("#eaBankAccountNumber").val("");

	$(".eventDescribe").val("");
	$(".errMsg").text("");

	$(".publisher").val("");
	$(".curHandler").val("");
	$("#token").val("");
	$("#att").val("");
	$("#co").val("");
	$("#eaId").val("");
	$("#handlerId").val("");
	$("#handlerName").val("");
}
// 添加审批
function doAddEvent() {
	var rentId = $(".rentId").val();
	var storeId = $(".storeId").val();
	var houseId = $(".houseId").val();
	var houseType = $(".houseType").val();
	var amountInvolved = $(".amountInvolved").val();
	var eventType = $(".eventType").find("option:selected").text();
	var handler = $("#doEventGetUserId").val();
	var eventDescribe = $(".eventDescribe").val();
	var houseAddress = $(".houseAddress").val();
	var eaApprovalNumber = $("#eaApprovalNumber").val();
	var eaBankName = $('#eaBankName').val();
	var eaBankUsername = $('#eaBankUsername').val();
	var eaBankAccountNumber = $('#eaBankAccountNumber').val();
	var att = $("#att").val();
	if (amountInvolved == 0) {
		eaBankName = '';
		eaBankUsername = '';
		eaBankAccountNumber = '';
	}
	if ($('#ifSpeed').prop("checked")) {
		eventDescribe = "【优先处理】" + eventDescribe;
	}
	if (amountInvolved != 0 && amountInvolved != ''
		&& (houseAddress == null || houseAddress == '')) {
		$(".errMsg").text("涉及金额，请绑定房源！");
		return;
	}
	var jhfFollowRemark = getNowFormatDate() + ' ' + _loginUserName + ' 添加的'
		+ houseType + ':' + eventDescribe;
	if (amountInvolved != 0
		&& amountInvolved != ''
		&& (eaBankName == '' || eaBankUsername == '' || eaBankAccountNumber == '')) {
		$.messager.defaults.ok = '添加账户';
		$.messager.defaults.cancel = '提交审批';
		$.messager.confirm('提示', '收款账户为空，是否添加账户？', function(r) {
			$.messager.defaults.ok = '确定';
			$.messager.defaults.cancel = '取消';
			if (r) {
				return;
			} else {
				showLoading();
				$.post("../insertEventApproval.action", {
					eaRentId : rentId,
					eaStoreId : storeId,
					eaHouseId : houseId,
					eaEventPublisher : _loginUserId,
					eaEventHandler : handler,
					eaHomeType : houseType,
					eaEventType : eventType,
					eaEventState : "处理中",
					eaWhetherGenerateRecord : "否",
					eaAmountInvolved : amountInvolved,
					eaEventContent : eventDescribe,
					eaApprovalNumber : eaApprovalNumber,
					eaBankName : eaBankName,
					eaBankUsername : eaBankUsername,
					eaBankAccountNumber : eaBankAccountNumber,
					att : att
				}, function(data) {
					hideLoading();
					if (data.code < 0) {
						myTips("添加失败！", "error");
						return;
					}
					isSave = true;
					$.post("../insertHousingFollow.action", {
						jhfHouseId : houseId,
						jhfHouse4rentId : rentId,
						jhfHouse4storeId : storeId,
						jhfFollowRemark : jhfFollowRemark,
						jhfUserId : _loginUserId,
						jhfDepartment : _loginDepartment,
						jhfStorefront : _loginStore,
						jhfPaymentWay : '系统跟进',
						jhfFollowResult : '跟进成功',
					}, function(fData) {

					})
					doSendEventMessage();
					myTips("添加成功！", "success");
				});
			}
		});
	} else {
		showLoading();
		$.post("../insertEventApproval.action", {
			eaRentId : rentId,
			eaStoreId : storeId,
			eaHouseId : houseId,
			eaEventPublisher : _loginUserId,
			eaEventHandler : handler,
			eaHomeType : houseType,
			eaEventType : eventType,
			eaEventState : "处理中",
			eaWhetherGenerateRecord : "否",
			eaAmountInvolved : amountInvolved,
			eaEventContent : eventDescribe,
			eaApprovalNumber : eaApprovalNumber,
			eaBankName : eaBankName,
			eaBankUsername : eaBankUsername,
			eaBankAccountNumber : eaBankAccountNumber,
			att : att
		}, function(data) {
			hideLoading();
			if (data.code < 0) {
				myTips("添加失败！", "error");
				return;
			}
			isSave = true;
			$.post("../insertHousingFollow.action", {
				jhfHouseId : houseId,
				jhfHouse4rentId : rentId,
				jhfHouse4storeId : storeId,
				jhfFollowRemark : jhfFollowRemark,
				jhfUserId : _loginUserId,
				jhfDepartment : _loginDepartment,
				jhfStorefront : _loginStore,
				jhfPaymentWay : '系统跟进',
				jhfFollowResult : '跟进成功',
			}, function(fData) {

			})
			doSendEventMessage();
			myTips("添加成功！", "success");
		});
	}
}
// 审批涉及金额时可填写收款账户
function changeMoney() {
	if ($('.amountInvolved').val() != 0 && $('.amountInvolved').val() != '') {
		$('#payBankInfo').show();
	} else {
		$('#payBankInfo').hide();
	}
}

// 添加事务执行发送短信
function doSendEventMessage() {
	if ($('#shorMessageRemind1').prop("checked")) {
		var userId = $('#doEventGetUserId').val();
		var evenTypeRp = $('.eventType').val();
		var evenDescribe = "发布人：" + _loginUserName + "-"
			+ $('.eventDescribe').val();
		var evenAdd = $('.houseAddress').val();
		var houseType = $('.houseType').val();
		var amountInvolved = $('.amountInvolved').val();
		if ($('#ifSpeed').prop("checked")) {
			evenDescribe = "【优先处理】" + evenDescribe;
		}
		if (amountInvolved == '' || amountInvolved == null
			|| amountInvolved == 0) {
			amountInvolved = 0;
		}

		var rentId = $('.rentId').val();
		var storeId = $('.storeId').val();

		var evenApprovalJson = {
			smUserId : userId,
			smRentId : rentId,
			smNotRentId : storeId,
			evenType : evenTypeRp,
			addCommunity : evenAdd,
			houseType : houseType,
			smMoney : amountInvolved,
			handleStatus : '处理中',
			repairDescribe : evenDescribe,
		};
		$.post("../massage/sendEventApprovalMsg.action", evenApprovalJson,
			function(data) {
				if (data.code < 0) {
					myTips(data.msg, "error");
				}
				queryEvent(1, 0)
				$("#addEventDlg").dialog('close');
			});
	} else {
		queryEvent(1, 0);
		$("#addEventDlg").dialog('close');
		return;
	}
}
function formatoverplusTime(value, row, index) {
	if (row.overplusTime > 0 && row.overplusTime < 31) {
		return "<span style='color:blue;'>" + row.overplusTime + "</span>";
	} else if (row.overplusTime <= 0) {
		return "<span style='color:red;'>已到期</span>";
	} else if (row.overplusTime > 0) {
		return "<span style=''>" + row.overplusTime + "</span>";
	}
}
function formatwxOpenidIf(value, row, index) {
	if (row.wxOpenid != null && row.wxOpenid != "" && row.wxOpenid != "0") {
		return "<span style='color:blue;'>是</span>";
	} else {
		return "<span style='color:red;'>否</span>";
	}
}

/** *********************************************************未租房图片上传start*************************************************************** */
// 电脑上传
function upload_hs_img() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息', '请选择一条记录', "info");
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
			refresh_hs_img();
		}
	});
	creat_hs_qr();
	$.post("../pubupload/getUpTokenCallback.action", function(data) {
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$('#uploadDlg input[clear=true]').val('');
		$("#token").val(token);
		$("#co").val(co);
		$("#hsId").val(row.hrHouse4storeId);
		initUploader();
		doCancel_hs_img();
		$('#uploadDlg').dialog('open');
	});
}

// 手机上传
function creat_hs_qr() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息', '请选择一条记录', "info");
		return;
	}
	$.post("../pubupload/getMobUploadUrl.action", {
		hsId : row.hrHouse4storeId
	}, function(data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width : 120,
			height : 120,
			text : data
		});
		doCancel_hs_img();
	});
}

// 查看图片
function check_hs_img() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (row) {
		doCancel_hs_img();
		show_hs_img(row.hrHouse4storeId);
	} else {
		$.messager.alert('消息', '请选择一条记录', "info");
	}
}
// 删除图片
function remove_hs_img() {
	var file = $('._hs_file');
	if (file.length == 0) {
		$.messager.alert('消息', '没有图片可以删除', "error");
	} else {
		$('#_hs_title').html('请选择要删除的图片').show();
		$('._hs_checkbox').show();
		$('#_hs_btn').show();
	}
}
// 取消删除图片
function doCancel_hs_img() {
	$('#_hs_title').hide();
	$('._hs_checkbox').hide().removeAttr('checked');
	$('#_hs_btn').hide();
}
// 执行删除图片
function doRemove_hs_img() {
	var row = $("#sourceInfoDg").datagrid("getSelected");
	var arr = 0;
	var path = '';
	var chk = $('._hs_checkbox');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if (arr > 0) {
		$("#_hs_imgWrapper input[name='image']:checked").each(
			function() { // 遍历选中的checkbox
				path += $(this).parent().children("img").attr('src').split(
					"?")[0]
					+ ',';
				$(this).parent("div").remove(); // 删除包含当前图片的那个div
			});
		$("#_hs_imgWrapper input[name='other']:checked").each(
			function() { // 遍历选中的checkbox
				path += $(this).parent().children("a").attr('href').split(
					"?")[0]
					+ ',';
				$(this).parent("div").remove(); // 删除包含当前图片的那个div
			});
		path = path.substring(0, path.length - 1);// 去掉最后一个逗号
		$.post("../deleteHsPic.action", {
			hsId : row.hrHouse4storeId,
			hsOtherImg : path
		}, function(data) {
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				show_hs_img(row.hrHouse4storeId);
			}
		});
		doCancel_hs_img();
	} else {
		$.messager.alert('消息', '未选中任何图片', "error");
	}
}
function show_hs_img(hsId) {
	$('#_hs_imgDlg').dialog({
		title : '查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#_hs_imgWrapper").empty();
		},
	});
	$("#_hs_imgWrapper").empty();
	$
		.post(
			"../queryHouseForStoreById.action",
			{
				hsId : hsId
			},
			function(data) {
				data = data.body;
				if (data.length == 0) {
					$("#_hs_imgWrapper").append("<p>未查询到信息</p>");
					return;
				}
				$('#_hs_imgDlg').dialog('open');
				var path = data[0].hsOtherImg == null ? null
					: data[0].hsOtherImg.getRealJsonStr();
				if (path == '' || path == null) {
					$('#_hs_imgNum').html('');
					return;
				}
				var img = eval('([' + path + '])');
				var imgNum = 0;
				var fileNum = 0;
				for ( var i in img) {
					var strs = img[i].path.split(".");
					var ext = strs[strs.length - 1];
					if (ext.toLocaleLowerCase() != "gif"
						&& ext.toLocaleLowerCase() != "jpg"
						&& ext.toLocaleLowerCase() != "jpeg"
						&& ext.toLocaleLowerCase() != "bmp"
						&& ext.toLocaleLowerCase() != "png") {
						if (fileNum == 0) {
							$('#_hs_imgWrapper')
								.append(
									'<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
						}
						$('#_hs_imgWrapper .fileList')
							.append(
								'<li>'
								+ '<input name="other" class="_hs_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">'
								+ '<a href="'
								+ img[i].path
								+ '" class="_hs_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'
								+ img[i].name + '</a>'
								+ '</li>');
						fileNum++;

					}
				}
				for ( var i in img) {
					var strs = img[i].path.split(".");
					var ext = strs[strs.length - 1];
					var j = parseInt(i) + parseInt(img.length);
					if (ext.toLocaleLowerCase() == "gif"
						|| ext.toLocaleLowerCase() == "jpg"
						|| ext.toLocaleLowerCase() == "jpeg"
						|| ext.toLocaleLowerCase() == "bmp"
						|| ext.toLocaleLowerCase() == "png") {
						if (imgNum == 0) {
							$('#_hs_imgWrapper')
								.append(
									'<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
						}
						$('#_hs_imgWrapper .imageList')
							.append(
								'<li style="float:left;position:relative;">'
								+ '<img title="'
								+ img[i].name
								+ '" class="_hs_group _hs_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'
								+ img[i].path
								+ '" src="'
								+ img[i].path
								+ '">'
								+ '<input name="image" class="_hs_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">'
								+ '<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">'
								+ img[i].name + '</p>'
								+ '</li>');
						imgNum++;
					}
				}
				$('#_hs_imgNum').html(
					"图片：" + imgNum + "张    文件：" + fileNum + "个");
				$("._hs_group").colorbox({
					rel : '_hs_group',
					transition : "none",
					width : "60%",
					height : "90%"
				});
			});
}
// 刷新
function refresh_hs_img() {
	var row = $("#sourceInfoDg").datagrid("getSelected");
	if (row) {
		doCancel_hs_img();
		show_hs_img(row.hrHouse4storeId);
	}
}
/** *********************************************************未租房图片上传end*************************************************************** */

// 跟进查看图片
function showFollowUpImg(num) {
	$('#showFollowUpImg').dialog({
		title : '跟进图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#followUpImgWrapper").empty();
		},
	});
	$("#followUpImgWrapper").empty();
	$('#showFollowUpImg').dialog('open');
	var row;
	if (num == 0) {
		row = $('#followInfoTable').datagrid('getSelected');
	} else if (num == 1) {
		row = $('#followInfoTable1').datagrid('getSelected');
	}
	var jhfId = row.jhfId;
	$
		.post(
			"../followUpThePictureQuery.action",
			{
				jhfId : jhfId,
			},
			function(data) {
				if (data.code < 0) {
					$("#followUpImgWrapper").append(
						"<p>" + data.msg + "</p>");
					return;
				}
				var path = data.body[0].jhfImgPath;
				if (path == "" || path == null) {
					$("#followUpImgNum").html("（图片：0 张    文件：0 个）");
					return;
				}
				var img = eval('([' + path.getRealJsonStr() + '])');
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
							var imgNum = 0;
							var fileNum = 0;
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
										$('#followUpImgWrapper')
											.append(
												'<ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
									}
									$(
										'#followUpImgWrapper .fileList')
										.append(
											'<li>'
											+ '<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">'
											+ '<a href="'
											+ newUrls[i]
											+ '" class="attachment" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'
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
										$('#followUpImgWrapper')
											.append(
												'<ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
									}
									$(
										'#followUpImgWrapper .imageList')
										.append(
											'<li style="float:left;position:relative;">'
											+ '<img title="'
											+ img[i].name
											+ '" class="attachmentImg attachment" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'
											+ newUrls[i]
											+ '" src="'
											+ newUrls[j]
											+ '">'
											+ '<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">'
											+ '<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">'
											+ img[i].name
											+ '</p>'
											+ '</li>');
									imgNum++;
								}
							}
							$('#followUpImgNum').html(
								"（图片：" + imgNum + "张 ） ");
							$(".attachmentImg").colorbox({
								rel : 'attachmentImg',
								transition : "none",
								width : "60%",
								height : "90%"
							});
						});
			});
}


// 租客信息处理
function rentedInformationWindow() {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	$('#followInfoTable1').datagrid({
		columns : [ [ {
			field : 'jhfFollowTime',
			title : '跟进时间',
			width : '20%',
			align : 'center'
		}, {
			field : 'jhfUserName',
			title : '跟进人',
			width : '15%',
			align : 'center'
		}, {
			field : 'jhfPaymentWay',
			title : '跟进类型',
			width : '10%',
			align : 'center'
		}, {
			field : 'jhfFollowBelong',
			title : '跟进归属',
			width : '10%',
			align : 'center'
		}, {
			field : 'jhfFollowRemark',
			title : '跟进内容',
			width : '45%',
			align : 'center'
		} ] ],
		width : '100%',
		height : '202px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			$('#followPicture1').show();
			$('#followPicture').hide();
			downFollowInfo(rowData);
		},
		onClose : function() {
			$("#followInfoTable1 input").val('');
		}
	});
	rentedDataLoading(row);
	queryFollow1(row, 1, 0);
}

// 租客跟进记录导入数据
function queryFollow1(row, page, type) {
	var startNum = (parseInt(page) - 1) * 7;
	var endNum = 7;
	var jhfPaymentWay = $('#infoFollowType1').val();
	// 跟进记录表取数据
	$.post("../queryAllHousingFollow.action", {
		jhfHouse4storeId : row.hrHouse4storeId,
		// jhfHouse4rentId : row.hrId,
		jhfPaymentWay : jhfPaymentWay,
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 4);
			var noData = [];
			$('#followInfoTable1').datagrid({
				data : noData,
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 4);
			}
			$("#followInfoTables").datagrid("loadData", data);
			$("#followInfoTable1").datagrid("loadData", data);

		}
	}, "json");
}
// 租客数据加载
function rentedDataLoading(row) {
	// changeBaseShowFont("infoReadhrBaseTd","infoReadhrBase",1);
	// 已租基础信息
	$.post("../queryHouseForRentById.action",
		{
			hrId : row.hrId
		},
		function(data) {
			data = data.body;
			if (data == null) {
				data = [];
			}
			for ( var i in data[0]) {
				if (data[0][i] == null) {
					data[0][i] = '';
				}
				_houseRentData = data[0];
				$("#infoRead" + i).val(data[0][i]);
				if (i == 'hrBase') {
					if (data[0][i] < 0) {
						$('#infoReadhrBaseTd')
							.html("预存款："+ '<input style="width:100px;color:red;" disabled="disabled" id="infoReadhrBase">')
						$('#infoReadhrBase').val(-data[0][i]);
					} else {
						$('#infoReadhrBaseTd')
							.html("欠结款："+ '<input style="width:100px;color:red;" disabled="disabled" id="infoReadhrBase">')
						$('#infoReadhrBase').val(data[0][i]);
						$('#infoReadhrBase1').val(data[0][i]);
					}
				}
				$('#infoReadhrAddress').val(
					data[0].hrAddDistrict + " "
					+ data[0].hrAddZone + " "
					+ data[0].hrAddCommunity + " "
					+ data[0].hrAddBuilding + " "
					+ data[0].hrAddDoorplateno);
				$('#infoReadhrAddress1').val(
					data[0].hrAddDistrict + " "
					+ data[0].hrAddZone + " "
					+ data[0].hrAddCommunity + " "
					+ data[0].hrAddBuilding + " "
					+ data[0].hrAddDoorplateno);
				$('#infoReadhrLeaseState1').val(data[0].hrLeaseState);
				$('#infoReadhrHouseDirection1').val(data[0].hrHouseDirection);
				$('#infoReadhrHouseSquare1').val(data[0].hrHouseSquare);
				$('#infoReadhrHouseOwner1').val(data[0].hrHouseOwner);
				$('#infoReadhrSectionType1').val(data[0].hrSectionType);
			}
		});

	// 业务员
	$.post("../queryUserByDepartmentID.action", {
		userId : row.hrAdminUserId
	}, function(userData) {
		if (userData.code < 0) {
			return;
		}
		userData = userData.body;
		if (userData == null) {
			userData = [];
		}
		$("#infoReadhrAdminUser").val(userData[0].suStaffName);
		$("#infoReadhrAdminUser1").val(userData[0].suStaffName);
	});
	// 录入人
	$.post("../queryUserByDepartmentID.action", {
		userId : row.hrUserId
	}, function(userData1) {
		if (userData1.code < 0) {
			return;
		}
		userData1 = userData1.body;
		if (userData1 == null) {
			userData1 = [];
		}
		$("#infoReadhrUser").val(userData1[0].suStaffName);
		$("#infoReadhrUser1").val(userData1[0].suStaffName);
	});
	// 房管员
	$.post("../queryUserByDepartmentID.action", {
		userId : row.hrManagerUserId
	}, function(userData2) {
		if (userData2.code < 0) {
			return;
		}
		userData2 = userData2.body;
		if (userData2 == null) {
			userData2 = [];
		}
		$("#infoReadhrManagerUser").val(userData2[0].suStaffName);
		$("#infoReadhrManagerUser1").val(userData2[0].suStaffName);
	});

	// 业绩受益人
	$.post("../queryAllTransactionAssistance.action", {
		assistHouse4rent : row.hrId,
		assistType : '出房'
	}, function(assdata) {
		if (assdata.code < 0) {
			return;
		} else {
			assdata = assdata.body;
			if (assdata == null) {
				assdata = [];
			}
			var assInfo = '';
			for ( var i in assdata) {
				assInfo += assdata[i].assistPeople + "："
					+ assdata[i].assistBonus + "%；";
			}
			$("#infoReadRassInfo").val(assInfo);
			$("#infoReadRassInfo1").val(assInfo);
		}
	});
	// 合约
	$.post("../queryTheCurrentDataInformation.action", {
		jciHouse4rentId : row.hrId,
		jciFukuanri : formatDate(getNowFormatDate()),
	}, function(data) {
		if (data.code < 0) {
			return;
		}
		data = data.body
		if (data == null) {
			data = [];
		}
		console.log(data[0]);
		$('#cdfjciMoney').val(data[0].jrrMoney);
		$('#cdfjciServerCost').val(data[0].jrrServerCost);
		$('#cdfjciManageCost').val(data[0].jrrManageCost);
	});
	// 剩余租期
	if (row.overplusTime > 0 && row.overplusTime < 31) {
		$('#infoReadoverplus').val(row.overplusTime);
	} else if (row.overplusTime <= 0) {
		$('#infoReadoverplus').val('已到期');
	} else if (row.overplusTime > 0) {
		$('#infoReadoverplus').val(row.overplusTime);
	}
	// 微信绑定
	if (row.wxOpenid != null && row.wxOpenid != "" && row.wxOpenid != "0") {
		$('#infoReadwxOpen').val('是');
		$('#infoReadwxOpen1').val('是');
	} else {
		$('#infoReadwxOpen').val('否');
		$('#infoReadwxOpen1').val('否');
	}
	// 结清读数
	$.post("../queryHouseForStoreById.action",
		{
			hsId : row.hrHouse4storeId,
		},
		function(data) {
			if (data.code < 0) {
				return;
			} else {
				data = data.body;
				if (data == null) {
					data = [];
				}
				_hsDatarow = data[0];
				var json = eval('('
					+ data[0].hsMeterReadingRecord
						.getRealJsonStr() + ')');
				var chargingPlan = parent._chargingPlan;
				if (chargingPlan.water.state) {
					$('#infoReadwLast').val(
						'水读数：' + json.water.lastReading + '立方');
				} else {
					$('#infoReadwLast').hide();
				}
				if (chargingPlan.elect.state) {
					$('#infoReadeLast').val(
						'电读数：' + json.electrit.lastReading
						+ '度');
				} else {
					$('#infoReadeLast').hide();
				}
				if (chargingPlan.gas.state) {
					$('#infoReadgLast').val(
						'气读数：' + json.gas.lastReading + '立方');
				} else {
					$('#infoReadgLast').hide();
				}
				if (chargingPlan.hotwater.state) {
					$('#infoReadhwLast')
						.val('热水读数：'+ (json.hotwater != undefined ? json.hotwater.lastReading
							: 0) + '立方');
				} else {
					$('#infoReadhwLast').hide();
				}
				if (chargingPlan.hotair.state) {
					$('#infoReadhaLast')
						.val('暖气读数：'+ (json.hotair != undefined ? json.hotair.lastReading
							: 0) + '立方');
				} else {
					$('#infoReadhaLast').hide();
				}
				if (chargingPlan.water.state == false
					&& chargingPlan.elect.state == false
					&& chargingPlan.gas.state == false
					&& chargingPlan.hotair.state == false
					|| chargingPlan.water.state == false) {
					$('#info').hide();
				}
			}
		});
}
// 查看业主账单信息
function seePayable(row) {
	$("#payableInfoDlg").dialog({
		title : '查看业主账单',
		top : getTop(500),
		left : getLeft(600),
		width : 600,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#payableInfoDlg input').val('');
			$('#payableInfoDlg select').val('');
		}
	});
	$("#landlordName1").val(row.landlordName);
	$("#address1").val(
		'' + row.addCity + row.addDistrict + row.addZone + row.addCommunity
		+ row.addBuilding + row.addDoorplateno);
	$("#jciPeriods1").val(row.jciPeriods);
	$("#jciBeginPeriods1").val(row.jciBeginPeriods);
	$("#jciEndPeriods1").val(row.jciEndPeriods);
	$("#jciState1").val(row.jciState);
	$('#jciSpecialNumber1').val(row.jciSpecialNumber);
	if (row.auditStatus == "未审核" || row.auditStatus == "重新核验") {
		$("#jciMoney1").val(accAdd(row.jciMoney, 0));
		$("#hsBaseMoney1").val(accAdd(row.hsBase, 0));
		if (row.hsBase > row.jciMoney) {
			$("#shouldPayMoney1").val(0.00);
		} else {
			$("#shouldPayMoney1").val(accSub(row.jciMoney, row.hsBase));
		}
		// 业主账号
		$.post("../landlordCard.action", {
			jciId : row.jciId
		}, function(data) {
			if (data.code > 0) {
				data = data.body;
				$("#bankName1").val(data[0].hsBankName);
				$("#bankType1").val(data[0].hsBankType);
				$("#bankNum1").val(data[0].hsBankNum);
			}
		});
		$("#paymentAccountType1").val(row.paymentAccountType);
		// 付款账号
		if (row.paymentAccountType != null && row.paymentAccountType != "") {
			$.post("../selectNamePublic.action", {
				faPaymentType : row.paymentAccountType,
			}, function(data) {
				$("#paymentAccountName1").empty();
				for ( var i in data.body) {
					if (data.body[i].faId == row.paymentAccountId) {
						$("#paymentAccountName1")
							.append(
								"<option value='" + data.body[i].faId
								+ "*#*"
								+ data.body[i].faBelonging
								+ "*#*"
								+ data.body[i].faAccount
								+ "' selected='selected'>"
								+ data.body[i].faUserName
								+ "</option>");
						$("#paymentAccountId1").val(data.body[i].faId);
						$("#paymentAccountNum1").val(data.body[i].faAccount);
						$("#paymentAccountBelong1").val(
							data.body[i].faBelonging);
					} else {
						$("#paymentAccountName1")
							.append(
								"<option value='" + data.body[i].faId
								+ "*#*"
								+ data.body[i].faBelonging
								+ "*#*"
								+ data.body[i].faAccount + "'>"
								+ data.body[i].faUserName
								+ "</option>");
					}
				}
			});
		}
		$("#paymentMethod1").val(row.paymentMethod);
		$("#auditStatus1").val(row.auditStatus);
		$("#auditName1").val(row.auditName);
		$("#reviewName1").val(row.reviewName);
	} else {
		$("#jciMoney1").val(row.accountPayable);
		$("#hsBaseMoney1").val(row.debt);
		$("#shouldPayMoney1").val(row.actualPayment);
		$("#bankName1").val(row.landAccountName);
		$("#bankType1").val(row.landAccountBank);
		$("#bankNum1").val(row.landAccountNum);
		$("#paymentAccountId1").val(row.paymentAccountId);
		$("#paymentAccountType1").val(row.paymentAccountType);
		$("#paymentAccountName1").append(
			"<option value='' selected='selected'>"
			+ row.paymentAccountName + "</option>");
		$("#paymentAccountNum1").val(row.paymentAccountNum);
		$("#paymentAccountBelong1").val(row.paymentAccountBelong);
		$("#paymentMethod1").val(row.paymentMethod);
		$("#auditStatus1").val(row.auditStatus);
		$("#auditName1").val(row.auditName);
		$("#reviewName1").val(row.reviewName);
	}
	if (row.auditStatus == "未审核") {
		$("#account-info").hide();
	} else if (row.auditStatus == "已审核") {
		$("#account-info").hide();
	} else if (row.auditStatus == "待付款") {
		$("#account-info").show();
		$("#sentMsgDiv1").show();
		$("#paymentAccountType1").attr("disabled", false);
		$("#paymentAccountName1").attr("disabled", false);
		$("#paymentMethod1").attr("disabled", false);
	} else if (row.auditStatus == "重新核验") {
		$("#account-info").hide();
	} else {
		$("#account-info").show();
		$("#sentMsgDiv1").hide();
		$("#paymentAccountType1").attr("disabled", true);
		$("#paymentAccountName1").attr("disabled", true);
		$("#paymentMethod1").attr("disabled", true);
	}
	$("#payableInfoDlg").dialog("open");
}
// 业主查看打印账单
function lookatThePrintBill() {
	var row = $("#payableInfoTable").datagrid("getSelected");
	jciSpecialNumber = row.jciSpecialNumber
	if (jciSpecialNumber == '') {
		myTips("没有打印特殊编号！", "error");
		return;
	}
	var skipJspName = '票据打印';
	var skipJspUrl = 'fg_historyPrint';
	var skipJspIcon = 'lishipiaojudayin';
	parent._skipToChildJson.push({
		target : "s",
		id : 'searchType',
		jsonVal : '业主应付款申请单',
	});
	parent._skipToChildJson.push({
		target : "i",
		id : 'jhpSpecialNumber',
		jsonVal : row.jciSpecialNumber,
	});
	window.parent.addTab(skipJspName, skipJspUrl + ".jsp", "icon icon-"
		+ skipJspIcon);
}

// 维修详细信息获取
function queryRepairInfo(row) {
	if ((row.repHouse4rentId != null && row.repHouse4rentId != '')
		|| (row.repHouse4storeId != null && row.repHouse4storeId != '')
		|| (row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_address2").val(row.startNum);
	} else {
		$(".repair_address2").val('无地址维修');
	}
	if ((row.repHouse4rentId != null && row.repHouse4rentId != '')
		&& (row.repHouse4storeId != null && row.repHouse4storeId != '')
		&& (row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_houseType2").val('已租维修');
	} else if ((row.repHouse4rentId == null || row.repHouse4rentId == '')
		&& (row.repHouse4storeId != null && row.repHouse4storeId != '')
		&& (row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_houseType2").val('未租维修');
	} else if ((row.repHouse4rentId == null || row.repHouse4rentId == '')
		&& (row.repHouse4storeId == null || row.repHouse4storeId == '')
		&& (row.repHouseId != null && row.repHouseId != '')) {
		$(".repair_houseType2").val('盘源维修');
	} else {
		$(".repair_houseType2").val('无关联维修');
	}
	$(".repair_id2").val(row.repId);
	$(".repair_time2").val(row.repReportingTime);
	$(".repair_userName2").val(row.repUserName);
	$(".repair_userId2").val(row.repUserId);
	$(".repair_contacis2").val(row.repContacts);
	$(".repair_contacisPhone2").val(row.repContactsPhone);
	$("#repair_responsibility2").val(row.repResponsibility);
	$(".repair_hope_time2").val(row.repHopeTime);
	$(".repair_receive2").val(row.repToReceive);
	$(".repair_type2").val(row.repTypeRp);
	$(".repair_event2").val(row.repEventRp);
	$(".repair_progress_rp2").val(row.repProgressRp);
	$(".repair_peopleName2").val(row.repRepairman);
	$(".repair_peopleId2").val(row.repRepairPeopleId);
	$(".repair_state2").val(row.repState);
	$(".repair_returnning2").val(row.repReturningRp);
	$(".rep_number2").val(row.repNumber);
	$(".repair_toll_rp2").val(row.repTollRp + "元");
	queryRepairReturning(row.repId);
	queryRepairProgress(row.repId);
}
// 维修详细回访列表导入数据
function queryRepairReturning(repId) {
	$.post("../queryAllRepairReturning.action", {
		retRepairId : repId
	}, function(data) {
		if (data.code < 0) {
			$('#showReturningTable2').datagrid("loadData", []);
		} else {
			data = data.body;
			for ( var i in data) {
				data[i].retTime = formatTime(data[i].retTime, 1);
			}
			$('#showReturningTable2').datagrid("loadData", data);
		}
	});
}
// 维修详细进展列表导入数据
function queryRepairProgress(repId) {
	$.post("../queryAllRepairProgress.action", {
		proRepairId : repId
	}, function(data) {
		if (data.code < 0) {
			$('#showProgressTable2').datagrid("loadData", []);
		} else {
			data = data.body;
			for ( var i in data) {
				data[i].proTime = formatTime(data[i].proTime, 1);
			}
			$('#showProgressTable2').datagrid("loadData", data);
		}
	});
}

/** ************************************业主续签处理***************************************************** */
// 业主续签对话框
function landlordRenewData(num) {
	var rowdata = $("#sourceInfoDg").datagrid("getSelected");
	if (num == 1) {
		$.post("../queryHouseStoreCommon.action", {
			hsId : rowdata.hrHouse4storeId,
		}, function(data) {
			if (data.code < 0) {
				myTips("未查询到未租房", "error");
			} else {
				data = data.body;
				if (data[0].hsPrimitiveMother == 0) {
					landlordRenew(_hsDatarow)
				} else {
					myTips("只有整租房、母房才能续签", "error");
				}
			}

		});
	} else if (num == 0) {
		$.post("../queryHouseStoreCommon.action", {
			hsId : rowdata.hrHouse4storeId,
		}, function(data) {
			if (data.code < 0) {
				myTips("未查询到未租房", "error");
			} else {
				data = data.body;
				if (data[0].hsPrimitiveMother == 0) {
					_hsDatarow = data[0];
					landlordRenew(_hsDatarow);
				} else {
					myTips("只有整租房、母房才能续签", "error");
				}
			}

		});
	}
}
function landlordRenew(row) {
	if (!row) {
		myTips("未找到业主房源，无法进行续签操作！", "error");
		return;
	} else {
		$('#landlordRenewDlg').dialog({
			title : '业主续签',
			top : getTop(500),
			left : getLeft(620),
			width : 620,
			height : 500,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#landlordRenewDlg input').val('');
				$('#landlordRenewDlg select').val('');
				$('#landlordRenewUsedContractNum').empty();
				$('.lrpriceLadderDiv').empty();
				$('.lrrentFreeSegmentDiv').empty();
				$('#landlordRenewContractNumTips').html("");
				$("#landlordRenewDlg input").each(function() {
					$(this).css("border", "1px solid #A9A9A9");
				});
				$("#landlordRenewDlg select").each(function() {
					$(this).css("border", "1px solid #A9A9A9");
				});
			},
		});
		$('#landlordRenewTermYear').val(0);
		$('#landlordRenewTermMonth').val(0);
		$('#landlordRenewTermDay').val(0);
		for ( var i in row) {
			if (row[i] == null) {
				row[i] = '';
			}
		}
		_contractNumsArry1 = [];
		$('#lrpriceLadder').hide();
		$('#landlordRenewAddress').val(
			'' + row.hsAddCity + row.hsAddDistrict + row.hsAddZone
			+ row.hsAddStreet + row.hsAddCommunity
			+ row.hsAddBuilding + row.hsAddDoorplateno);
		$.post("../queryByHouse4rentOfLandlordId.action", {
			landlordId : row.hsLandlordId
		}, function(data) {
			data = data.body;
			// console.log(data);
			$('#landlordRenewLandlordName').val(data[0].laPopName);
			$('#landlordRenewPhone').val(data[0].laPopTelephone);
		});
		$.post("../queryAllRenewalLandlord.action", {
			jrlHouse4storeId : row.hsId,
		}, function(data) {
			data = data.body;
			if (data == null) {
				data = [];
			}
			$('#landlordRenewNums').val(data.length);
			$('#landlordRenewLastBegin').val(data[0].jrlBeginTime);
			$('#landlordRenewLastEnd').val(data[0].jrlEndTime);
			$('#landlordRenewLastTerm').val(data[0].jrlTheTerm);
			var lrpayWay = '';
			if (data[0].jrlPaymentMethod == '月付') {
				lrpayWay = '元/月';
			} else if (data[0].jrlPaymentMethod == '季付') {
				lrpayWay = '元/季';
			} else if (data[0].jrlPaymentMethod == '年付') {
				lrpayWay = '元/年';
			} else if (data[0].jrlPaymentMethod == '半年付') {
				lrpayWay = '元/半年';
			}
			var jrlPriceLadder = data[0].jrlPriceLadder.split(',');
			$('#landlordRenewLastPrice').val(
				jrlPriceLadder[jrlPriceLadder.length - 2]);
			$('#landlordRenewLastContractType').val(data[0].jrlContractType);
			// $('#landlordRenewLastFreeDays').val(data[0].jrlRentFreeDays+"天");

			var sumDate = new Date(data[0].jrlEndTime);
			sumDate.setDate(sumDate.getDate() + 1);
			$('#landlordRenewBegin').val(formatDate(sumDate));
		});
		$('#landlordRenewDespoit').val(row.hsHouseDeposit);
		$('#landlordRenewUser').val(_loginUserName);
		$('#landlordRenewContractType').val('续签合同');
		$('#landlordRenewDlg').dialog('open');
	}
}
function lrChangeDate() {
	// 当期限不都为0时进行计算
	if (!($("#landlordRenewTermYear").val() == 0
		&& $("#landlordRenewTermMonth").val() == 0 && $(
			"#landlordRenewTermDay").val() == 0)) {
		var sMonth = (parseInt($("#landlordRenewTermMonth").val()) + parseInt($(
			"#landlordRenewTermYear").val()) * 12);
		var sDay = parseInt($("#landlordRenewTermDay").val() - 1);
		var beginDate = new Date($("#landlordRenewBegin").val());
		beginDate.setMonth(beginDate.getMonth() + sMonth);
		beginDate.setDate(beginDate.getDate() + sDay);
		$("#landlordRenewEnd").val(formatDate(beginDate));
	} else {// 全为0则结束时间设空
		$("#landlordRenewEnd").val("");
	}
	$("#lrjrlPriceLadder").val("");
	$("#lrjrlRentFreeSegment").val("");
	lrSettingPriceLadder();
}
function lrSettingPriceLadder() {
	var year = $("#landlordRenewTermYear").val();
	var month = $("#landlordRenewTermMonth").val();
	var day = $("#landlordRenewTermDay").val();
	if (year == '' || year == null) {
		year = 0;
	}
	if (month == '' || month == null) {
		month = 0;
	}
	if (day == '' || day == null) {
		day = 0;
	}
	$("#landlordRenewTips").html('');
	$('.lrpriceLadderDiv').empty();
	$('.lrrentFreeSegmentDiv').empty();
	$('#lrpriceLadder').hide();
	if ((year == 0 && month == 0 && day == 0)) {
		return;
	}
	var isWholeYear = 1;// 1表示整年，0表示非整年
	if (month != 0 || day != 0) {
		isWholeYear = 0;
	}
	var beginTime = $("#landlordRenewBegin").val();
	var priceLadderArray = $('#lrjrlPriceLadder').val().split(",");
	var rentFreeSegment = $('#lrjrlRentFreeSegment').val().split(",");
	var rentFreeSegment2 = new Array();
	for (var i = 0; i < rentFreeSegment.length; i++) {
		rentFreeSegment2[i] = rentFreeSegment[i].split("#");
	}
	if (isWholeYear == 1) {
		$('#lrpriceLadder').show();
		for (var i = 1; i < parseInt(year) + 1; i++) {
			$('.lrpriceLadderDiv')
				.append(
					'<div style="margin:5px 20px 0 2px;float: left;">'
					+ '第'
					+ i
					+ '年租金：<input style="width:80px;" class="lrupdatePriceLadder">元/月'
					+ '</div>');
			$('.lrrentFreeSegmentDiv')
				.append(
					'<div style="margin:5px 30px 0 2px;float: left;">'
					+ '第'
					+ i
					+ '年： 年前<input style="display:none;width:80px;" id="lrHolidaySettingA'
					+ i
					+ '" class="lrrentFreeSegmentIndex">'
					+ '<input style="display:none;" id="lrHolidaySettingB'
					+ i
					+ '">'
					+ '<input style="width:80px;" id="lrHolidaySumBefor'
					+ i
					+ '" type="number" min="0" max="100" onchange="lrChangeRentFreeSegment('
					+ i
					+ ',0)">天'
					+ '&emsp;年后<input style="display:none;" id="lrHolidaySettingC'
					+ i
					+ '">'
					+ '<input style="display:none;" id="lrHolidaySettingD'
					+ i
					+ '">'
					+ '<input style="width:80px;" id="lrHolidaySumAfter'
					+ i
					+ '" type="number" min="0" max="100" onchange="lrChangeRentFreeSegment('
					+ i + ',1)">天' + '</div>');
			$('#lrHolidaySettingA' + i).val(renewalDate(beginTime, i, 0));
			$('#lrHolidaySettingD' + i).val(renewalDate(beginTime, i, 1));
			if ($('#lrjrlPriceLadder').val() != "") {
				$('.lrupdatePriceLadder:eq(' + (i - 1) + ')').val(
					priceLadderArray[i - 1]);
			}
			if ($('#lrjrlRentFreeSegment').val() != "") {
				$('#lrHolidaySettingB' + i).val(rentFreeSegment2[i - 1][1]);
				$('#lrHolidaySettingC' + i).val(rentFreeSegment2[i - 1][2]);
				changeHoliday(i, 0);
				changeHoliday(i, 1);
			}
		}
	} else {
		$('#lrpriceLadder').show();
		for (var i = 1; i < parseInt(year) + 2; i++) {
			$('.lrpriceLadderDiv')
				.append(
					'<div style="margin:5px 20px 0 2px;float: left;">'
					+ '第'
					+ i
					+ '年租金：<input style="width:80px;" class="lrupdatePriceLadder">元/月'
					+ '</div>');
			$('.lrrentFreeSegmentDiv')
				.append(
					'<div style="margin:5px 30px 0 2px;float: left;">'
					+ '第'
					+ i
					+ '年： 年前<input style="display:none;" id="lrHolidaySettingA'
					+ i
					+ '" class="lrrentFreeSegmentIndex">'
					+ '<input style="display:none;" id="lrHolidaySettingB'
					+ i
					+ '">'
					+ '<input style="width:80px;" id="lrHolidaySumBefor'
					+ i
					+ '" type="number" min="0" max="100" onchange="lrChangeRentFreeSegment('
					+ i
					+ ',0)">天'
					+ '&emsp;年后<input style="display:none;" id="lrHolidaySettingC'
					+ i
					+ '">'
					+ '<input style="display:none;" id="lrHolidaySettingD'
					+ i
					+ '">'
					+ '<input style="width:80px;" id="lrHolidaySumAfter'
					+ i
					+ '" type="number" min="0" max="100" onchange="lrChangeRentFreeSegment('
					+ i + ',1)">天' + '</div>');
			$('#lrHolidaySettingA' + i).val(renewalDate(beginTime, i, 0));
			if (i < parseInt(year) + 1) {
				$('#lrHolidaySettingD' + i).val(renewalDate(beginTime, i, 1));
			} else {// 最后一年
				var numsDate = year + "*" + month + "*" + day;
				$('#lrHolidaySettingD' + i).val(
					renewalDate(beginTime, numsDate, 2));
			}
			if ($('#lrjrlPriceLadder').val() != "") {
				$('.lrupdatePriceLadder:eq(' + (i - 1) + ')').val(
					priceLadderArray[i - 1]);
			}
			if ($('#lrjrlRentFreeSegment').val() != "") {
				$('#lrHolidaySettingB' + i).val(rentFreeSegment2[i - 1][1]);
				$('#lrHolidaySettingC' + i).val(rentFreeSegment2[i - 1][2]);
				changeHoliday(i, 0);
				changeHoliday(i, 1);
			}
		}
	}
}
// 删除业主续签合同编号
function deleteThisDiv(id, type) {
	if (type == 0) {

	} else {
		var nums = id.split("lrcontractNumsShow")[1];
		for ( var i in _contractNumsArry1) {
			if (_contractNumsArry1[i].number == nums) {
				_contractNumsArry1.splice(i, 1);
			}
		}
		$("#lrcontractNumsShow" + nums).remove();
	}
}
// 业主续签合同编号检测
function contractNumCheckoutHs(type) {
	if (_contractNums != 1) {
		return;
	}
	if (type == 0) {

	} else if (type == 1) {
		var detectionContract = $("#landlordRenewContractNum").val();
		for ( var i in _contractNumsArry1) {
			if (_contractNumsArry1[i].number == detectionContract) {
				$("#landlordRenewContractNumTips").html("编号正确");
				$("#landlordRenewContractNumTips").css("color", "green");
				return;
			}
		}
		if (detectionContract == '') {
			$("#landlordRenewContractNumTips").html("");// 编号不能为空！
			return;
		}
		$
			.post(
				"../contractNumberdetection.action",
				{
					detectionContract : detectionContract,
				},
				function(data) {
					if (data.code < 0) {
						$("#landlordRenewContractNumTips").html(
							data.msg);
						$("#landlordRenewContractNumTips").css("color",
							"red");
						return;
					} else {
						data = data.body;
						$("#landlordRenewContractNumTips").html("编号正确");
						$("#landlordRenewContractNumTips").css("color",
							"green");
						$("#landlordRenewUsedContractNum")
							.append(
								'<div class="selectShow" onclick="deleteThisDiv(this.id,1)" id="lrcontractNumsShow'
								+ detectionContract
								+ '"><div style="float: left;" >'
								+ detectionContract
								+ '</div><div class="selectShow-x" style="float: right;"></div></div>');
						_contractNumsArry1.push({
							number : detectionContract,
							jcdId : parseInt(data[0].jcdId),
							jcdHouseAddress : "",
							adminUser : ''
						});
					}
				});
	}
}
// 业主续签检测
function lrCheckSetting() {
	var checkFlag = 0;
	$("#landlordRenewDlg input[needs=1]").each(function() {
		if ($(this).val() == '' || $(this).val() == '单击选择房屋') {
			$(this).css("border", "1px solid red");
			checkFlag++;
		} else {
			$(this).css("border", "1px solid #A9A9A9");
		}
	});
	$("#landlordRenewDlg select[needs=1]").each(function() {
		if ($(this).val() == '') {
			$(this).css("border", "1px solid red");
			checkFlag++;
		} else {
			$(this).css("border", "1px solid #A9A9A9");
		}
	});
	var year = $("#landlordRenewTermYear").val();
	var month = $("#landlordRenewTermMonth").val();
	var day = $("#landlordRenewTermDay").val();
	if (year == 0 && month == 0 && day == 0) {
		$("#landlordRenewTermYear").css("border", "1px solid red");
		$("#landlordRenewTermMonth").css("border", "1px solid red");
		$("#landlordRenewTermDay").css("border", "1px solid red");
		checkFlag++;
	} else {
		$("#landlordRenewTermYear").css("border", "1px solid #A9A9A9");
		$("#landlordRenewTermMonth").css("border", "1px solid #A9A9A9");
		$("#landlordRenewTermDay").css("border", "1px solid #A9A9A9");
	}
	if (checkFlag != 0) {
		$("#landlordRenewTips").html("有必填项未填写!");
		return;
	}
	if (_contractNums == 1) {
		if (_contractNumsArry1.length == 0) {
			$('#landlordRenewContractNum').css("border", "1px solid red");
			$("#landlordRenewTips").html("请使用至少一个合约编号!");
			return;
		} else {
			$('#landlordRenewContractNum').css("border", "1px solid #A9A9A9");
		}
	}
	var isWholeYear = 1;// 1表示整年，0表示非整年
	if (month != 0 || day != 0) {
		isWholeYear = 0;
	}
	var settingArrs = $('#lrpriceLadder input');
	var priceArrs = [];
	var holidayArrs = [];

	/*
	 * indexOF indexOf()
	 * 方法返回某个指定的字符串值在字符串中首次出现的位置（从左向右）。没有匹配的则返回-1，否则返回首次出现位置的字符串的下标值。 var
	 * src="images/off_1.png"; alert(src.indexOf('t')); alert(src.indexOf('i'));
	 * alert(src.indexOf('g')); 弹出值依次为：-1,0,3
	 *
	 * push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
	 */

	// settingArrs.length 是#priceLadder中所有input的个数
	for (var i = 0; i < settingArrs.length; i++) {
		if (settingArrs[i].className.indexOf('lrupdatePriceLadder') > -1) {
			// console.log("settingArrs[i]="+settingArrs[i]);
			// 获取租金阶梯价的input
			priceArrs.push(settingArrs[i]);
		} else if (settingArrs[i].id.indexOf('lrHolidaySetting') > -1) {
			// 获取id=holidaySettingA、B、C、D的input
			holidayArrs.push(settingArrs[i]);
		}
	}
	for (var i = 0; i < priceArrs.length; i++) {
		if (priceArrs[i].value == '' || priceArrs[i].value == '0.00') {
			$("#landlordRenewTips").html('第' + (parseInt(i) + 1) + '年租金设置错误！');
			return;
		}
	}
	var number = holidayArrs.length / 4;
	for (var i = 0; i < number; i++) {
		var holidayNums = parseInt(i) + 1;
		var holidayA = $('#lrHolidaySettingA' + holidayNums).val();
		var holidayB = $('#lrHolidaySettingB' + holidayNums).val();
		var holidayC = $('#lrHolidaySettingC' + holidayNums).val();
		var holidayD = $('#lrHolidaySettingD' + holidayNums).val();
		// var holiday = $('#landlordRenewFreedDays').val();
		var sumBefor = $('#lrHolidaySumBefor' + holidayNums).val();
		var sumAfter = $('#lrHolidaySumAfter' + holidayNums).val();
		if (sumBefor == "" || sumAfter == "") {
			$("#landlordRenewTips").html('请设置第' + holidayNums + '年免租期天数');
			return;
		}
		if (sumBefor < 0 || sumAfter < 0) {
			$("#landlordRenewTips").html('第' + holidayNums + '年免租期错误');
			return;
		}
		if ((sumBefor >= 1 && sumBefor < 2) || (sumAfter >= 1 && sumAfter < 2)) {
			$("#landlordRenewTips").html(
				"第" + holidayNums + "年免租期错误，系统暂不支持年前1天或年后1天此特殊情况");
			return;
		}
		/*
		 * if(isWholeYear == 1 || i < number-1){//整年每年验证 非整年的最后一年免验证
		 * if(parseInt(sumBefor)+parseInt(sumAfter)!=holiday){
		 * $("#landlordRenewTips").html('第' + holidayNums + '年免租期错误'); return; }
		 * if (renewalHolidaySum(holidayA, holidayB, holidayC, holidayD,
		 * holiday)) { $("#landlordRenewTips").html('第' + holidayNums +
		 * '年免租期年前加年后不等于' + holiday + '天！'); return; } }
		 */
	}
	var i = 0;
	var updatePriceLadderArray = new Array();
	$(".lrupdatePriceLadder").each(function() {
		updatePriceLadderArray[i] = parseFloat($(this).val());
		i++;
	});
	var updatePriceLadder = updatePriceLadderArray.join(",");
	var updateRentFreeSegmentArray = new Array();
	i = 0;
	$(".lrrentFreeSegmentIndex").each(
		function() {
			updateRentFreeSegmentArray[i] = $(
				"#lrHolidaySettingA" + (i + 1)).val()
				+ "#"
				+ $("#lrHolidaySettingB" + (i + 1)).val()
				+ "#"
				+ $("#lrHolidaySettingC" + (i + 1)).val()
				+ "#"
				+ $("#lrHolidaySettingD" + (i + 1)).val();
			i++;
		});
	var updateRentFreeSegment = updateRentFreeSegmentArray.join(",");
	$("#lrjrlPriceLadder").val(updatePriceLadder);
	$("#lrjrlRentFreeSegment").val(updateRentFreeSegment);
	$("#landlordRenewTips").html('');
	dolandlordRenew(updatePriceLadder, updateRentFreeSegment);
}
// 执行业主续签
function dolandlordRenew(updatePriceLadder, updateRentFreeSegment) {
	var row = _hsDatarow;
	var jrlSignedTime = $('#landlordRenewSignedTime').val();
	var jrlBeginTime = $('#landlordRenewBegin').val();
	var jrlEndTime = $('#landlordRenewEnd').val();
	var jrlTheTerm = $('#landlordRenewTermYear').val() + "年"
		+ $('#landlordRenewTermMonth').val() + "月"
		+ $('#landlordRenewTermDay').val() + "日";
	var jrlInAdvancePay = $('#landlordRenewAdvancePay').val();
	var jrlPaymentMethod = $('#landlordRenewPayment').val();
	var jrlRentFreeDays = $('#landlordRenewFreedDays').val();
	var addFollowUserId = $('#doLandlordRenewGetUserId').val();
	var jcdHouseAddress = row.hsAddCommunity + " " + row.hsAddBuilding + " "
		+ row.hsAddDoorplateno;
	var addDeposit = $('#landlordRenewAddDeposit').val();
	if (_contractNumsArry1.length > 0) {
		for ( var i in _contractNumsArry1) {
			_contractNumsArry1[i].jcdHouseAddress = jcdHouseAddress;
			_contractNumsArry1[i].adminUser = addFollowUserId;
		}
	}
	var jrlRenewalCoding = JSON.stringify(_contractNumsArry1);
	if (_contractNums != 1) {
		if (jrlRenewalCoding == "[]") {
			jrlRenewalCoding = '';
		}
	}
	if (addFollowUserId == "") {
		myTips("请正确选择主单人!", "error");
		return;
	}
	showLoading();
	$.post("../insertRenewalLandlord.action", {
		jrlHouse4storeId : parseInt(row.hsId),
		jrlLandlordId : parseInt(row.hsLandlordId),
		jrlSignedTime : jrlSignedTime,
		jrlBeginTime : jrlBeginTime,
		jrlEndTime : jrlEndTime,
		jrlUserId : _loginUserId,
		jrlDepartment : _loginDepartment,
		jrlStorefront : _loginStore,
		jrlContractType : '续签合同',
		jrlTheTerm : jrlTheTerm,
		jrlInAdvancePay : jrlInAdvancePay,
		jrlRentFreeDays : jrlRentFreeDays,
		jrlPaymentMethod : jrlPaymentMethod,
		jrlRentFreeSegment : updateRentFreeSegment,
		jrlPriceLadder : updatePriceLadder,
		jrlRenewalCoding : jrlRenewalCoding,
		adminUser : addFollowUserId,
		hsHouseDeposit : addDeposit,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, "error");
			return;
		} else {
			data = data.body;
			$('#readonlyTruDlg').dialog('close');
			$('#landlordRenewDlg').dialog('close');
			myTips("续签成功！", "success");
			var sourcerow = $('#sourceInfoDg').datagrid('getSelected');
			infoDlg(sourcerow);
			queryFollow(sourcerow, 1, 0);
		}
	});
}
function lrChangeRentFreeSegment(i, type) {
	if (type == 0) {
		var beginTime = $("#lrHolidaySettingA" + i).val();
		var days = $("#lrHolidaySumBefor" + i).val();
		$("#lrHolidaySettingB" + i).val(renewalDate(beginTime, days, 3));
	} else if (type == 1) {
		var endTime = $("#lrHolidaySettingD" + i).val();
		var days = $("#lrHolidaySumAfter" + i).val();
		$("#lrHolidaySettingC" + i).val(renewalDate(endTime, days, 4));
	}
}

/** *******************************业主续签end************************************* */
/** *******************************业主短信处理************************************** */
// 打开发送短信对话框
function sendMessageDlg1() {
	var row = _hsDatarow;
	$("#sendMessageDlg1").dialog({
		title : '发送短信',
		top : getTop(150),
		left : getLeft(600),
		width : 600,
		height : 210,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#sendMessageDlg1 input").val('');
			$("#sendMessageDlg1 select").val('');
			$("#sendMessageDlg1 textarea").val('');
			$('#sendMessageDlg1 [clear="clear"]').val('');
			$('#sendMessageDlg1 [clean="clean"]').html('');
			$('#sendMessageDlg1 [require]').css('border', '1px solid #a9a9a9');
			clearAttachment();
		}
	});

	$("#sendMessageRenterId1").val(row.hsIntentionalId);
	$("#sendMessageLandlordId1").val(row.hsLandlordId);
	$("#sendMessageHouseStoreId1").val(row.hsId);
	$("#sendMessageRoomAddress1").val(
		row.hsAddCommunity + row.hsAddBuilding + row.hsAddDoorplateno);
	$("#sendMessageSendInfo1").hide();
	$("#sendMessageManType1").empty();
	if (row.hsIntentionalId != null && row.hsIntentionalId != '') {
		$("#sendMessageManType1").append('<option></option>');
		$("#sendMessageManType1")
			.append('<option value="租客意向人">租客意向人</option>');
		$("#sendMessageManType1").append('<option value="业主">业主</option>');
	} else {
		$("#sendMessageManType1").append('<option></option>');
		$("#sendMessageManType1").append('<option value="业主">业主</option>');
	}
	$("#sendMessageDlg1").dialog('open');
}
// 选择短信类型 改变发送界面
function resizeSendMessage1() {
	var sendType = $("#sendMessageType1").val();
	if (sendType == '') {
		$("#sendMessageSendInfo1").hide();
		$("#sendMessageDlg1").dialog('resize', {
			width : 600,
			height : 210
		});
		return;
	}
	$("#sendMessageSendInfo1").show();
	if (sendType == 1) {
		$("#sendMessageDlg1").dialog('resize', {
			width : 600,
			height : 210
		});
		$("#sendMessageSendInfo1").hide();
	} else if (sendType == 2) {
		$("#sendMessageDivOne1").show();
	}
}
function changeSendMan1() {
	var sendType = $("#sendMessageManType1").val();
	if (sendType == '租客意向人') {
		var renterId = $("#sendMessageRenterId1").val();
		// 租客信息
		$.post("../selectIntendedPerson.action", {
			ipId : renterId
		}, function(data) {
			if (data.code < 0) {
				return;
			}
			data = data.body;
			for ( var i in data[0]) {
				if (data[0][i] == null) {
					data[0][i] = '';
				}
				$("#sendMessageName1").val(data[0].ipName);
				$("#sendMessagePhone1").val(data[0].ipTel);
				$("#sendMessagePopId1").val(data[0].ipPopulationId);
			}
		});
	} else if (sendType == '业主') {
		var landlordId = $("#sendMessageLandlordId1").val();
		// 业主信息
		$.post("../queryByHouse4rentOfLandlordId.action", {
			landlordId : landlordId
		}, function(data) {
			data = data.body;
			for ( var i in data[0]) {
				if (data[0][i] == null) {
					data[0][i] = '';
				}
				$("#sendMessageName1").val(data[0].laPopName);
				$("#sendMessagePhone1").val(data[0].laPopTelephone);
				$("#sendMessagePopId1").val(data[0].laPopulationId);
			}
		});
	} else if (sendType == '') {
		$("#sendMessageName1").val('');
		$("#sendMessagePhone1").val('');
	}
}
// 业主短信预览
function previewSendMessage1() {
	if (doCheckSendMessage1() == 0) {
		return;
	}
	var row = _hsDatarow;
	var smPopId = $("#sendMessagePopId1").val();
	var reciveManName = $("#sendMessageName1").val();
	var smlandId = $("#sendMessageLandlordId1").val();
	var smrentId = $("#sendMessageRenterId1").val();
	var smMoney = $("#sendMessagePirce1").val();
	var smNote = $("#sendMessageNote1").val();
	var smNotRentId = $("#sendMessageHouseStoreId1").val();
	var serviceTelephone = $("#sendMessageCSPhone1").val();
	var companyAddress = $("#sendMessageAddress1").val();
	var goOnMoney = $("#sendMessageGoOnMoney1").val();
	var unpaidmMoney = $("#sendMessageUnpaidmMoney1").val();
	var deadline = $("#sendMessageDeadline1").val();
	var unpaidmNote = $("#sendMessageUnpaidmNote1").val();
	var type = $("#sendMessageType1").val();
	var sendType = $("#sendMessageManType1").val();
	var roomAddress = $("#sendMessageRoomAddress1").val();

	if (type == 1) {
		note = '【房至尊】尊敬的 ' + reciveManName + ' 租户，您好。您缴纳的定金为：租赁 ' + roomAddress
			+ ' 物业，您目前尚未办理相关手续，按定金收据约定！' + row.hsEndDate
			+ '前在法定工作日内携带身份证原件到我公司签署租赁合同，并交清相关费用，过了期后定金将失效，谢谢配合！';
	}
	$("#previewSendMessageDlg").dialog({
		title : '发送短信',
		top : getTop(150),
		left : getLeft(420),
		width : 420,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#previewSendMessageDlg textarea").val('');
		}
	});
	$("#previewSendMessageType").val(
		$("#sendMessageType1").find("option:selected").text());
	$("#previewSendMessageNote").val(note);
	$("#previewSendMessageDlg").dialog("open");
}
// 业主发送短信验证
function doCheckSendMessage1() {
	var row = _hsDatarow;
	var smPopId = $("#sendMessagePopId1").val();
	var smlandId = $("#sendMessageLandlordId1").val();
	var smrentId = $("#sendMessageRenterId1").val();
	var smMoney = $("#sendMessagePirce1").val();
	var smNote = $("#sendMessageNote1").val();
	var smNotRentId = $("#sendMessageHouseStoreId1").val();
	var serviceTelephone = $("#sendMessageCSPhone1").val();
	var companyAddress = $("#sendMessageAddress1").val();
	var goOnMoney = $("#sendMessageGoOnMoney1").val();
	var unpaidmMoney = $("#sendMessageUnpaidmMoney1").val();
	var deadline = $("#sendMessageDeadline1").val();
	var unpaidmNote = $("#sendMessageUnpaidmNote1").val();
	var type = $("#sendMessageType1").val();
	var sendType = $("#sendMessageManType1").val();

	/*
	 * if(type==''||type==null){ $("#sendMessageTips1").html("请选择发送的短信类型！");
	 * return 0; } if(smPopId==''||smPopId==null){
	 * $("#sendMessageTips1").html("请选择需要发送的短信接收人类型！"); return 0; }
	 */
	if (sendType == '业主') {
		$("#sendMessageTips1").html("暂不支持对业主发送！");
		return 0;
	}
	if (type == 1) {
		if (row.hsIntentionalId == null || row.hsIntentionalId == '') {
			$("#sendMessageTips1").html("此房源没有下定，无法发送定金失效短信！");
			return 0;
		}
	}
	$("#sendMessageTips1").html("");
	return 1;
}
// 执行发送短信
function doSendMessage1() {
	if (doCheckSendMessage1() == 0) {
		return;
	}
	var smPopId = $("#sendMessagePopId1").val();
	var smlandId = $("#sendMessageLandlordId1").val();
	var smrentId = $("#sendMessageRenterId1").val();
	var smMoney = $("#sendMessagePirce1").val();
	var smNote = $("#sendMessageNote1").val();
	var smRentId = $("#sendMessageHouseRentId1").val();
	var smNotRentId = $("#sendMessageHouseStoreId1").val();
	var serviceTelephone = $("#sendMessageCSPhone1").val();
	var companyAddress = $("#sendMessageAddress1").val();
	var goOnMoney = $("#sendMessageGoOnMoney1").val();
	var unpaidmMoney = $("#sendMessageUnpaidmMoney1").val();
	var deadline = $("#sendMessageDeadline1").val();
	var unpaidmNote = $("#sendMessageUnpaidmNote1").val();

	showLoading();
	var type = $("#sendMessageType1").val();
	if (type == 1) {
		// 定金失效提醒短信JSON
		var depositJson = {
			smPopId : smPopId,
			smrentId : smrentId,
			smlandId : smlandId,
			smNotRentId : smNotRentId,
			messageType : 10,
			smUserId : _loginUserId,
		};
		$.post("../massage/sendOutsideMessage.action", depositJson, function(
			data) {
			if (data.code < 0) {
				myTips(data.msg, "error");
				hideLoading();
				return;
			}
			myTips("发送成功!", "success");
			$("#sendMessageDlg1").dialog('close');
			hideLoading();
		});
	}
}
/** ******************************yezhu短信end***************************** */
/** ****************************业主定金处理***************************** */
/*
 * function depositManager(){ var row = _hsDatarow; if(row.hsDownDeposit=='是'){
 * $('#depositManagerDlg').dialog({ title : '定金管理', top : getTop(220), left :
 * getLeft(620), width : 620, height : 250, closed : true, cache : false, modal :
 * true, onClose : function() { $('#depositManagerDlg input').val('');
 * $('#depositManagerDlg select').val(''); $("#depositManagerDlg
 * input[needs=1]").each(function(){ $(this).css("border","1px solid #A9A9A9");
 * }); $("#depositManagerDlg select[needs=1]").each(function(){
 * $(this).css("border","1px solid #A9A9A9"); }); }, });
 * $('#addDeposit').hide(); $('#updateDeposit').show();
 * $('#addDepositSaveButton').hide(); $('#updateDepositSaveButton').show();
 * $('#depositGet1').val(row.hsDepositAmount);
 * $.post("../selectIntendedPerson.action", { ipId:row.hsIntentionalId },
 * function(data) { data=data.body;
 * $("#depositRenterName1").val(data[0].ipName);
 * $("#depositRenterId1").val(data[0].ipId);
 * $("#depositRenterPhone1").val(data[0].ipTel);
 * $("#depositRenterIdCard1").val(data[0].popIdcard); });
 * $.post("../queryUserByDepartmentID.action", { userId : row.hsSalesmanId },
 * function(data) { if (data.code < 0) { //$.messager.alert('通知', '操作失败！原因：' +
 * data.msg, 'error'); return; } data = data.body;
 * $("#depositFollowUserName1").val(data[0].suStaffName);
 * $("#depositUserName1").val(data[0].suStaffName);
 * $("#depositFollowUserId1").val(row.hsSalesmanId); });
 * $.post("../selectNamePublic.action", { faId :row.hsDespositAccount, },
 * function(accountData) { for(var i in _acountType){
 * if(_acountType[i]==accountData.body[0].faPaymentType){
 * $("#depositFinancialWay1").val(i); } } changeWay1(row.hsDespositAccount); });
 * $('#depositInfoDiv input').attr("disabled","disabled"); $('#depositInfoDiv
 * select').attr("disabled","disabled");
 * $('#depositDateBegin1').val(row.hsStartDate);
 * $('#depositDateEnd1').val(row.hsEndDate); }else{
 * $('#depositManagerDlg').dialog({ title : '未租房下定', top : getTop(220), left :
 * getLeft(620), width : 620, height : 250, closed : true, cache : false, modal :
 * true, onClose : function() { $('#depositManagerDlg input').val('');
 * $('#depositManagerDlg select').val(''); $('#depositFollowUserName').empty();
 * $("#depositManagerDlg input[needs=1]").each(function(){
 * $(this).css("border","1px solid #A9A9A9"); }); $("#depositManagerDlg
 * select[needs=1]").each(function(){ $(this).css("border","1px solid #A9A9A9");
 * }); }, }); $('#addDeposit').show(); $('#updateDeposit').hide();
 * $('#addDepositSaveButton').show(); $('#updateDepositSaveButton').hide();
 * $('#depositInfoDiv input').removeAttr("disabled","disabled");
 * $('#depositInfoDiv select').removeAttr("disabled","disabled"); }
 * $('#depositManagerDlg').dialog('open'); }
 */
// 选择下定意向人
/*
 * function depositRenter(){ $('#choseRenter1').dialog({ title : '选择意向人', top :
 * getTop(420), left : getLeft(700), width : 700, height : 420, closed : true,
 * cache : false, modal : true }); $('#choseRenter1').dialog('open');
 * $('#choseRenterTable1').datagrid({ columns : [ [ { field : 'ipName', title :
 * '姓名', width : 50, align : 'center' }, { field : 'ipTel', title : '电话', width :
 * 50, align : 'center' }] ], width : '99%', height : '75%', singleSelect :
 * true, autoRowHeight : false, pageSize : 10, scrollbarSize : 0, showPageList :
 * false, fitColumns : true, onDblClickRow : function(rowIndex, rowData) { var
 * row = $('#choseRenterTable1').datagrid('getSelected'); if (row) {
 * $("#depositRenterName1").val(row.ipName);
 * $("#depositRenterId1").val(row.ipId);
 * $("#depositRenterPhone1").val(row.ipTel); $('#choseRenter1').dialog('close'); } }
 * }); queryRenter1(1,0); }
 */
// 选择租客表导入数据
/*
 * function queryRenter1(page,type){ var startNum = (parseInt(page)-1)*10; var
 * endNum = 10; var renterName = $("#searchRenterName1").val();; var renterPhone =
 * $("#searchRenterPhone1").val();; $.post("../selectIntendedPerson.action", {
 * startNum : startNum, endNum : endNum, ipName : renterName, ipTel :
 * renterPhone, }, function(data) { if(data.code<0){ sourcePage(0,0,7);
 * $('#choseRenterTable1').datagrid({ data: [], view: myview, emptyMsg: data.msg
 * }); }else{ data=data.body; if(page==1 && type ==0){
 * sourcePage(data[0].totalNum,page,7); }
 * $("#choseRenterTable1").datagrid("loadData", data);
 *
 * 如果这里报错Uncaught TypeError: Cannot read property 'options' of undefined 不用管，
 * 这个跟depositManager()定金管理有关，现在这个功能注释了,先就这样，保不准以后又要启用
 *  } }, "json"); } //账户类型和账号联动 function changeWay2(type) { var faPaymentType =
 * $("#depositFinancialWay1").find("option:selected").text();
 * $("#depositFinancialBankNums1").empty(); $("#depositAccountName1").val('');
 * $("#depositFinancialAccountBelong1").val('');
 * $("#depositFinancialAccountNums1").val('');
 * $("#depositFinancialBankNums1").val(''); if(faPaymentType==''){ return; }
 * $("#depositFinancialBankNums1").empty();
 * $("#depositFinancialBankNums1").append("<option></option>");
 * $.post("../selectNamePublic.action", { faPaymentType:faPaymentType, },
 * function(data) { $("#depositAccountName1").empty();
 * $("#depositAccountName1").append("<option></option>"); for (var i in
 * data.body) { $("#depositAccountName1").append( "<option value='" +
 * data.body[i].faId+"*#*"+ data.body[i].faBelonging +"*#*"+
 * data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>"); }
 * if(type!=0){ for (var i in data.body) { if(data.body[i].faId==type){
 * $("#depositAccountName1").val(data.body[i].faId+"*#*"+
 * data.body[i].faBelonging +"*#*"+ data.body[i].faAccount); getAccountId2(); } } }
 * }); } function getAccountId2() { if($("#depositAccountName1").val()==''){
 * return; }
 * $("#depositFinancialBankNums1").val($("#depositAccountName1").val().split("*#*")[0]);
 * $("#depositFinancialAccountNums1").val($("#depositAccountName1").val().split("*#*")[2]);
 * $("#depositFinancialAccountBelong1").val($("#depositAccountName1").val().split("*#*")[1]); }
 * //定金处理 function addDeposit(){ var checkFlag = 0; $("#depositManagerDlg
 * input[needs=1]").each(function(){
 * if($(this).val()==''||$(this).val()=='单击选择房屋'){ $(this).css("border","1px
 * solid red"); checkFlag++; }else{ $(this).css("border","1px solid #A9A9A9"); }
 * }); $("#depositManagerDlg select[needs=1]").each(function(){
 * if($(this).val()==''){ $(this).css("border","1px solid red"); checkFlag++;
 * }else{ $(this).css("border","1px solid #A9A9A9"); } });
 *
 * if(checkFlag!=0){ myTips("有必填项未填写!","error"); return; } var row = _hsDatarow;
 * var hsDepositAmount = $('#depositGet1').val(); var hsIntentionalId =
 * $('#depositRenterId1').val(); var hsSalesmanId =
 * $('#depositFollowUserName1').val(); var hsStartDate =
 * $('#depositDateBegin1').val(); var hsEndDate = $('#depositDateEnd1').val();
 * var hsDespositAccount = $('#depositFinancialBankNums1').val(); var jfPayType =
 * $('#depositPayType1').val(); var depositBillNumber =
 * $('#depositBillNumber1').val(); showLoading();
 * $.post("../upDepositInterface.action", { hsId : row.hsId, hsDownDeposit :
 * '是', hsDepositAmount : hsDepositAmount, hsIntentionalId : hsIntentionalId,
 * hsSalesmanId : hsSalesmanId, hsStartDate : hsStartDate, hsEndDate :
 * hsEndDate, hsDespositAccount : hsDespositAccount, // hsDespositJson :
 * hsDespositJson, }, function(data) { if(data.code<0){
 * myTips("下定失败!","error"); hideLoading(); return; } data = data.body; var
 * jfFinanNote = row.hsAddCommunity+ row.hsAddBuilding + row.hsAddDoorplateno
 * +"房下定,定金为："+hsDepositAmount+"元。定金有效期为" +hsStartDate+" 0:00:00 到 "+hsEndDate+"
 * 23:59:59" +"。下定经手人："+$('#depositTheStore1').find('option:selected').text()+ " " +
 * $('#depositFollowUserName1').find('option:selected').text()+"。"; var
 * jsonStrArry = "[{" +'"jfPayType":"' + jfPayType + '",'
 * +'"jfAccountingSpecies":"定金",' +'"jfBigType":"押金类",' +'"jfNatureOfThe":"收入",'
 * +'"jfClosedWay":"' +
 * $('#depositFinancialWay1').find('option:selected').text()+ '",'
 * +'"jfAccountId":"'+ hsDespositAccount + '",' +'"jfRenterId":"",'
 * +'"jfLandlordId":"' + row.hsLandlordId + '",' +'"jfIntendedId":"' +
 * hsIntentionalId+ '",' +'"jfHouse4rentId":"",' +'"jfHouse4storeId":"' +
 * row.hsId +'",' +'"jfHouseId":"' + row.hsHouseId + '",'
 * +'"jfTheCashierPeople":"' + _loginUserId + '",' +'"jfBillingDate":"' +
 * formatTime(getNowFormatDate(), 2)+ '",' +'"jfHandlers":"' + hsSalesmanId +
 * '",' +'"jfTheOwnershipType":"' + '意向人'+ '",' +'"jfBelongingToTheName":"' +
 * $('#depositRenterName1').val()+ '",' +'"jfSumMoney":"'+ hsDepositAmount +
 * '",' +'"jfFinanNote":"'+ jfFinanNote + '",' +'"department":"'+
 * _loginDepartment + '",' +'"storefront":"'+ _loginStore + '",'
 * +'"jfOperationRecords":"' + getNowFormatDate()+ ','+_loginUserName +'添加收支记录<br>",'
 * +'"jfFinancialCoding":"' + formatTime(getNowFormatDate(), 3) +
 * Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) +
 * Math.floor(Math.random() * 10) + '",' +'"jfStartCycle":"'+ hsStartDate + '",'
 * +'"jfEndCycle":"' + hsEndDate+ '",' +'"jfAccountingWhy":"' +
 * row.hsAddDistrict + row.hsAddZone + row.hsAddStreet + row.hsAddCommunity +
 * row.hsAddBuilding + row.hsAddDoorplateno + '",'
 * +'"jfTicketNumber":"'+depositBillNumber+'",' +'}]';
 *
 * $.post("../insertFinancialDeposit.action",{ jsonArray : jsonStrArry
 * },function(finaData) { $.post("../intendedChangeRent.action",{ ipId :
 * hsIntentionalId, ipState : "已定", },function(ipData) { hideLoading();
 * myTips("下定成功!","success"); $('#depositManagerDlg').dialog('close'); }); });
 *
 * }); } //取消定金 function updateDeposit(){ var row = _hsDatarow;
 * $.post("../clearDeposit.action", { hsId:row.hsId, }, function(data) {
 * if(data.code<0){ myTips("取消下定失败!","error"); return; }
 * myTips("取消下定成功!","success"); $('#depositManagerDlg').dialog('close'); }); }
 */
/** *******************************yezhu定金end**************************************** */
// 单元格单击编辑
var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#preGeneratingBillTable').datagrid('validateRow', editIndex)) {
		$('#preGeneratingBillTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field) {
	if (endEditing()) {
		$('#preGeneratingBillTable').datagrid('selectRow', index).datagrid(
			'editCell', {
				index : index,
				field : field
			});
		editIndex = index;
	}
}
function nextStep() {
	if (validateStep('addHr', 3)) {
		preGeneratingBill();
	}
}
// 允许修改客户信息
function openUpdate(e) {

	$('#populationDetailedDlg input').attr('disabled', false);
	$('#populationDetailedDlg select').attr('disabled', false);
	$('#updateButton').hide();
	$('#doUpdateButton').show();

	//修改客户管理模块:身份证读取按钮
	if(e==1){
		$("#updataIdCard").css("display","block");
	}
}
// 执行修改客户信息
function doUpdatePopulation(e) {

	var row = $("#populationDg").datagrid("getSelected");
	var popName = $('#pop_name').val();
	var popTelephone = $('#pop_telephone').val();
	var popIdcardType = $('#pop_idcard_type').val();
	var popIdcard = $('#pop_idcard').val();
	var popSex = $('#pop_sex').val();
	var popNation = $('#pop_nation').val();
	var popMarriageState = $('#pop_marriage_state').val();
	var popIdcardAddress = $('#pop_idcard_address').val();
	var popOccupation = $('#pop_occupation').val();
	var popBirth = $('#pop_birth').val();
	var popDegreeEducation = $('#pop_degree_education').val();
	var popInnerCreditLevel = $('#pop_inner_credit_level').val();
	var popOuterCreditLevel = $('#pop_outer_credit_level').val();
	var popNameRemark = $('#pop_name_remark').val();
	showLoading();
	$.post("../updatePopulation.action", {
		popId : row.popId,
		popName : popName,
		popTelephone : popTelephone,
		popIdcardType : popIdcardType,
		popIdcard : popIdcard,
		popSex : popSex,
		popNation : popNation,
		popMarriageState : popMarriageState,
		popIdcardAddress : popIdcardAddress,
		popOccupation : popOccupation,
		popBirth : popBirth,
		popDegreeEducation : popDegreeEducation,
		popInnerCreditLevel : popInnerCreditLevel,
		popOuterCreditLevel : popOuterCreditLevel,
		popNameRemark : popNameRemark,
		registrantName : _loginUserName
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			if (data.code == -21) {
				myTips("身份证已存在，已存在身份证的人口姓名与本次填写的姓名不一致！", "error");
			} else {
				myTips(data.msg, "error");
			}
			return;
		}
		myTips("修改成功", "success");
		queryPopulation(_pageNum[0], 0);
		$('#populationDetailedDlg').dialog('close');
	});

	if(e==0){
		$("#userIdCard").css("display","none");
	}

}

// 跟进详情
function followInfoDlg(row) {
	$('#followInfoDlg').dialog({
		title : '跟进详细信息',
		top : getTop(300),
		left : getLeft(500),
		width : 500,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#followInfoDlg span').text('');
		},
	});
	for ( var i in row) {
		$('#follow' + i).html(row[i]);
	}
	$('#followInfoDlg').dialog('open');
}
// 查询住户信息
function queryResident() {
	var row = $("#populationDg").datagrid("getSelected");
	var rtPlId = row.popId;
	$.post("../selectResidentTable.action", {
		rtPlId : rtPlId,
	}, function(data) {
		if (data.code < 0) {
			myTips("未查询到相关住户信息！", "error");
			return;
		}
		data = data.body;
		$('#updateLivingMenHrAddressNew').val(
			'' + data[0].addCommunity + data[0].addBuilding
			+ data[0].addDoorplateno);
		$('#updateLivingMenHrAddressOld').val(
			'' + data[0].addCommunity + data[0].addBuilding
			+ data[0].addDoorplateno);
		$("#updateLivingMenRtId").val(data[0].rtId);
		$("#updateLivingMenRtHrIdNew").val(data[0].rtHrId);
		$("#updateLivingMenRtHrIdOld").val(data[0].rtHrId);
		$('#updateLivingMenRtTypeNew').val(data[0].rtType);
		$('#updateLivingMenRtTypeOld').val(data[0].rtType);
	});
}
// 修改住户
function updateLivingMen() {
	$('#updateLivingMenDlg').dialog(
		{
			title : '修改住户',
			top : getTop(200),
			left : getLeft(410),
			width : 410,
			height : 200,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#updateLivingMenDlg [clear="clear"]').val('');
				$('#updateLivingMenDlg [clear="clear"]').html('');
				$('#updateLivingMenDlg [choose="choose"]').val('');
				$('#updateLivingMenDlg [require="require"]').css('border',
					'1px solid #a9a9a9');
			}
		});
	queryResident();
	$('#updateLivingMenDlg').dialog("open");
}
// 执行修改住户
function doUpdateLivingMen() {
	var row = $("#populationDg").datagrid("getSelected");
	var rtPlId = row.popId;
	var rtId = $("#updateLivingMenRtId").val();
	var rtTypeNew = $('#updateLivingMenRtTypeNew').val();
	var rtTypeOld = $('#updateLivingMenRtTypeOld').val();
	var rtHrIdNew = $("#updateLivingMenRtHrIdNew").val();
	var rtHrIdOld = $("#updateLivingMenRtHrIdOld").val();
	var hrAddressNew = $('#updateLivingMenHrAddressNew').val();
	var hrAddressOld = $('#updateLivingMenHrAddressOld').val();
	if (rtTypeNew == rtTypeOld && rtHrIdNew == rtHrIdOld) {
		$('#updateLivingMenDlg').dialog('close');
		return;
	}
	var checkFlag = 0;
	$('#updateLivingMenDlg [require="require"]').each(function() {
		if ($(this).val() == '') {
			$(this).css('border', '1px solid red');
			checkFlag++;
		} else {
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if (checkFlag != 0) {
		myTips("有必填项未填写!", "error");
		return;
	}
	var follow = '修改住户，';
	if (rtTypeNew != rtTypeOld) {
		follow += '状态：' + rtTypeOld + ' → ' + rtTypeNew + ';';
	}
	if (rtHrIdNew != rtHrIdOld) {
		follow += '入住房：' + hrAddressOld + ' → ' + hrAddressNew + ';';
	}
	showLoading();
	$.post("../updateResident.action", {
		rtId : rtId,
		rtPlId : rtPlId,
		rtType : rtTypeNew,
		rtHrId : rtHrIdNew,
		popModifyTheRecord : follow,
		registrantName : _loginUserName,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, "error");
			return;
		}
		myTips("修改成功", "success");
		queryPopulation(_pageNum[0], 0);
		$('#updateLivingMenDlg').dialog('close');
		$('#populationDetailedDlg').dialog('close');
	});
}
// 住户选择入住房
function relationDlg() {
	$('#relationDlg').dialog({
		title : '选择入住房',
		top : getTop(420),
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
// 住户选择入住房-初始化已租列表
function relationDataGrid() {
	// cityLink();
	if ($('#choseSourceTable').hasClass('datagrid-f')) {
	} else {
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
				}, {
					field : 'renterPopName',
					title : '承租人',
					width : 10,
					align : 'center'
				} ] ],
				width : '100%',
				height : '277px',
				singleSelect : true,
				autoRowHeight : false,
				pageSize : 10,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				onDblClickRow : function(rowIndex, rowData) {
					var row = $('#choseSourceTable')
						.datagrid('getSelected');
					if (row) {
						for ( var i in row) {
							if (row[i] == null) {
								row[i] = '';
							}
						}
						$("#updateLivingMenRtHrIdNew").val(row.hrId);
						$("#updateLivingMenHrAddressNew").val(
							'' + row.hrAddCommunity + row.hrAddBuilding
							+ row.hrAddDoorplateno);
						$('#relationDlg').dialog('close')
					}
				}
			});
	}
	relationDate(1, 0);
}
// 住户选择入住房-查询已租列表
function relationDate(page, type) {
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();
	$.post("../queryHouseRentCommon.action", {
		startNum : startNum,
		endNum : endNum,
		hrAddCity : qhAddCity,
		hrAddDistrict : qhAddDistrict,
		hrAddZone : qhAddZone,
		hrAddCommunity : qhAddCommunity,
		hrAddBuilding : qhAddBuilding,
		hrAddDoorplateno : qhAddDoorplateno,
		hrLeaseState : "在租"
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 8);
			$('#choseSourceTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 8);
			}
			$("#choseSourceTable").datagrid("loadData", data);
		}
	}, "json");
}

// 选择租客表导入数据
function queryRenter(page, type) {
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var renterName = $("#searchRenterName").val();
	;
	var renterPhone = $("#searchRenterPhone").val();
	;
	var searchRenterType = $('#searchRenterType').val();
	if (searchRenterType == '意向人') {
		$('#choseRenterTable').datagrid('hideColumn', 'renterPopName');
		$('#choseRenterTable').datagrid('hideColumn', 'renterPopTelephone');
		$('#choseRenterTable').datagrid('hideColumn', 'renterPopIdcard');
		$('#choseRenterTable').datagrid('showColumn', 'ipName');
		$('#choseRenterTable').datagrid('showColumn', 'ipTel');
		$('#choseRenterTable').datagrid('showColumn', 'popIdcard');
		$.post("../selectIntendedPerson.action", {
			startNum : startNum,
			endNum : endNum,
			ipName : renterName,
			ipTel : renterPhone,
		}, function(data) {
			if (data.code < 0) {
				sourcePage(0, 0, 2);
				$('#choseRenterTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data = data.body;
				if (page == 1 && type == 0) {
					sourcePage(data[0].totalNum, page, 2);
				}
				$("#choseRenterTable").datagrid("loadData", data);
			}
		}, "json");
	} else if (searchRenterType == '已有租客') {
		$('#choseRenterTable').datagrid('showColumn', 'renterPopName');
		$('#choseRenterTable').datagrid('showColumn', 'renterPopTelephone');
		$('#choseRenterTable').datagrid('showColumn', 'renterPopIdcard');
		$('#choseRenterTable').datagrid('hideColumn', 'ipName');
		$('#choseRenterTable').datagrid('hideColumn', 'ipTel');
		$('#choseRenterTable').datagrid('hideColumn', 'popIdcard');
		$.post("../selectHouseRentName.action", {
			startNum : startNum,
			endNum : endNum,
			renterPopName : renterName,
			renterPopTelephone : renterPhone,
		}, function(data) {
			if (data.code < 0) {
				sourcePage(0, 0, 2);
				$('#choseRenterTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data = data.body;
				if (page == 1 && type == 0) {
					sourcePage(data[0].totalNum, page, 2);
				}
				$("#choseRenterTable").datagrid("loadData", data);
			}
		}, "json");
	}
}

// 已租添加出租
function addHrDlg() {
	// 迁入资产对话框太大了，900px都不够啊
	$('#addRentDlg').dialog({
		title : '添加出租',
		top : getTop(550),
		left : getLeft(980),
		width : 980,
		height : 570,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addRentBill').attr("src", "");
		}
	});

	// 显示添加界面
	$('#addRentBill').attr('src', 'addHr.jsp');
	$('#addRentDlg').dialog('open');
}
function acquisitionOfRentDay(type){
    var timeBegin, advanceMode, str;
    if (type == 1) {//新签
        timeBegin = $('#addHrBegin').val()
        advanceMode = $('#advanceMode').val();
        str = timeBegin.split('-')
        if (str != '') {
            if (advanceMode == 1) {
                $('#addHrInAdvancePay').val(str[2]);
            } else {
                $('#addHrInAdvancePay').val(1);
            }
        } else {
            $('#addHrInAdvancePay').val(1);
        }
    } else if (type == 2) {//续签
        timeBegin = $('#renterRenewBegin').val()
        advanceMode = $('#advanceMode1').val();
        str = timeBegin.split('-')
        if (str != '') {
            if (advanceMode == 1) {
                $('#renterRenewAdvancePay').val(str[2]);
            } else {
                $('#renterRenewAdvancePay').val(1);
            }
        } else {
            $('#renterRenewAdvancePay').val(1);
        }
    }
}