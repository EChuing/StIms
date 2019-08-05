_thisPurview = {a:0};//本页面权限
_thisPurview2 = {a:0};//超级权限
Revision = 0;
Revision2 = 0;
$(function(){
	doPurview();
})
function doPurview() {
	var jsp = getJspName();
	//权限选择从input框读取而不是从变量中读取是防止“专业人士”修改变量的值，导致权限被破解
	var loginPurview = $('#loginPurview').val();
	if (loginPurview == undefined) {
		loginPurview = $('#loginPurview', parent.document).val();
	}
	var loginPurview2 = $('#loginAuthoritySwitch').val();
	if (loginPurview2 == undefined) {
		loginPurview2 = $('#loginAuthoritySwitch', parent.document).val();
	}
	if (loginPurview2 == undefined) {//临时账单等三级嵌套页面
		loginPurview2 = $('#loginAuthoritySwitch', parent.parent.document).val();
	}
	if (loginPurview == undefined || loginPurview2 == undefined) {//不允许子页面在新标签中打开
		if (jsp != "fg_management2") {
			$('body').remove();
		}
		return;
	}

	if (jsp == "fg_main") {
		_thisPurview = getModelPurview('M?0', loginPurview);//无业主模式
		_thisPurview2 = getModelPurview('M?0', loginPurview2);//无业主模式
		if (_thisPurview.a != 0 && _thisPurview2.a != 0) {
			_repResponsibility.splice($.inArray('业主付费', _repResponsibility), 1);
			_taskType.splice($.inArray('业主事务', _taskType), 1);
			_ownerShipType.splice($.inArray('业主', _ownerShipType), 1);
			_customerType.splice($.inArray('业主', _customerType), 1);
			_billType.splice($.inArray('业主退房出账', _billType), 1);
			_billType.splice($.inArray('业主退房审批', _billType), 1);
			_billType.splice($.inArray('业主应付款申请单', _billType), 1);
			_saType.splice($.inArray('业主', _saType), 1);
			_NoOwner = 1;
		}
		_thisPurview = getModelPurview('G?0', loginPurview);//工作台
		_thisPurview2 = getModelPurview('G?0', loginPurview2);//工作台
		if (_thisPurview.a == 1 && _thisPurview2.a == 1) {
			addTab('工作台', 'taskboard_boss.jsp', 'icon-gongzuotai', true);
			$('#tabs').tabs('getTab', '工作台').panel('options', {closable: false});
		}
		_thisPurview = getModelPurview('G?1', loginPurview);//数据日历
		_thisPurview2 = getModelPurview('G?1', loginPurview2);//数据日历
		if (_thisPurview.a == 1 && _thisPurview2.a == 1) {
			addTab("数据日历", "fg_bossCalendar.jsp", "icon icon-laobandarili");
		}
		_thisPurview = getModelPurview('C?1', loginPurview);//维保
		_thisPurview2 = getModelPurview('C?1', loginPurview2);//维保
		if (_thisPurview.a == 0 || _thisPurview2.a == 0) {
			$("#mainRepairHeader").remove();
		}
		_thisPurview = getModelPurview('C?2', loginPurview);//审批
		_thisPurview2 = getModelPurview('C?2', loginPurview2);//审批
		if (_thisPurview.a == 0 || _thisPurview2.a == 0) {
			$("#mainEventHeader").remove();
		}
		_thisPurview = getModelPurview('C?3', loginPurview);//任务
		_thisPurview2 = getModelPurview('C?3', loginPurview2);//任务
		if (_thisPurview.a == 0 || _thisPurview2.a == 0) {
			$("#mainTaskHeader").remove();
		}
		_thisPurview = getModelPurview('D?3', loginPurview);//考勤
		_thisPurview2 = getModelPurview('D?3', loginPurview2);//考勤
		if (_thisPurview.a == 0 || _thisPurview2.a == 0) {
			$("#punchCard").remove();
		}
		_thisPurview = getModelPurview('L?0', loginPurview);//服务
		_thisPurview2 = getModelPurview('L?0', loginPurview2);//服务
		if (_thisPurview.a == 0 || _thisPurview2.a == 0) {
			$("#helpDoc").remove();
		}
	} else if (jsp == "taskboard_boss") {
		_thisPurview = getModelPurview('G?0', loginPurview);//工作台
		_thisPurview2 = getModelPurview('G?0', loginPurview2);//工作台
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//老板工作台
			$('#tab1').remove();
			$('#taskboard-boss').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//业务任务版
			$('#tab2').remove();
			$('#taskboard-business').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//综合任务版
			$('#tab3').remove();
			$('#taskboard-overall').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[6] == 0 || _thisPurview.c[6] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[6] == 0 || _thisPurview2.c[6] == undefined) {//商超工作台
			$('#tab20').remove();
			$('#taskboard-shop').remove();
		}
		$('#firstNav li:first').addClass("active");
		$('.taskboard').children('div:first').addClass("in");
		$('.taskboard').children('div:first').addClass("active");
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//新增公告
			$('[href="#addNotice"]').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//编辑公告
			$('[href="#editNotice"]').remove();
		}
	} else if (jsp == 'fg_dataHouse') {
		_thisPurview = getModelPurview('A?0', loginPurview);//房源资料
		_thisPurview2 = getModelPurview('A?0', loginPurview2);//房源资料
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加房源资料
			$('#addDataHouseButton').remove();
			//$('#numsAddSaveHouse1').remove();//导入
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改房源资料
			$('#canUpdateDataHouse').remove();
			$('#saveUpdateDataHouse').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//锁盘、解锁
			$('#setStateOwnedButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//关注房源
			$('#firstFollowButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//写跟进
			$('#writeFollowButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[6] == 0 || _thisPurview.c[6] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[6] == 0 || _thisPurview2.c[6] == undefined) {//查看业主联系方式
			$('#lookLandlordButton').remove();
		}
	} else if (jsp == 'fg_trusteeship') {
		_thisPurview = getModelPurview('U?0', loginPurview);//品牌模式
		_thisPurview2 = getModelPurview('U?0', loginPurview2);//品牌模式
		if (_thisPurview.a != 0 || _thisPurview2.a != 0) {
			if ($("#deviceInfoTable").datagrid().length > 0) {
				$("#deviceInfoTable").datagrid('showColumn', 'brandName');
			}
			if ($("#deviceInfoOfficeTable").datagrid().length > 0) {
				$("#deviceInfoOfficeTable").datagrid('showColumn', 'brandName');
			}
		}
		_thisPurview = getModelPurview('M?0', loginPurview);//无业主模式
		_thisPurview2 = getModelPurview('M?0', loginPurview2);//无业主模式
		if (_thisPurview.a != 0 && _thisPurview2.a != 0) {
			$('#readonlyTabs').tabs('close', '业主信息');
			$('#readonlyTabs').tabs('close', '业主账单');
			$('#detailLandlordInfoRow').remove();
			$('#detailLandlordBillInfoRow').remove();
		}
		_thisPurview = getModelPurview('A?1', loginPurview);
		_thisPurview2 = getModelPurview('A?1', loginPurview2);
		for (var i = 6; i < _thisPurview.b.length; i++) {
			if (_thisPurview.b[i] == 1) {
				Revision = 1;
			}
		}
		if (_thisPurview.a == 0 || _thisPurview.b[6] == 0 || _thisPurview.b[6] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[6] == 0 || _thisPurview2.b[6] == undefined) {//查看业主信息
//			$('#detailLandlordInfo').remove();
			$('#detailLandlordInfoRow').remove();
			//另一种处理方式：$('#readonlyTabs').tabs('getTab', '业主信息').panel('options').tab.hide();
			$('#readonlyTabs').tabs('close', '业主信息');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[7] == 0 || _thisPurview.b[7] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[7] == 0 || _thisPurview2.b[7] == undefined) {//查看房屋收支
//			$('#detailFinancialInfo').remove();
			$('#detailFinancialInfoRow').remove();
			$('#readonlyTabs').tabs('close', '房屋收支');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[8] == 0 || _thisPurview.b[8] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[8] == 0 || _thisPurview2.b[8] == undefined) {//查看业主账单
//			$('#detailLandlordBillInfo').remove();
			$('#detailLandlordBillInfoRow').remove();
			$('#readonlyTabs').tabs('close', '业主账单');

		}
		if (_thisPurview.a == 0 || _thisPurview.b[9] == 0 || _thisPurview.b[9] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[9] == 0 || _thisPurview2.b[9] == undefined) {//查看家私电器
//			$('#detailAssetsInfo').remove();
			$('#detailAssetsInfoRow').remove();
			$('#readonlyTabs').tabs('close', '家私电器');

		}
		if (_thisPurview.a == 0 || _thisPurview.b[10] == 0 || _thisPurview.b[10] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[10] == 0 || _thisPurview2.b[10] == undefined) {//查看合约记录
//			$('#detailContInfo').remove();
			$('#detailContInfoRow').remove();
			$('#readonlyTabs').tabs('close', '合约记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[11] == 0 || _thisPurview.b[11] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[11] == 0 || _thisPurview2.b[11] == undefined) {//查看短信记录
//			$('#detailMessageInfo').remove();
			$('#detailMessageInfoRow').remove();
			$('#readonlyTabs').tabs('close', '短信记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[12] == 0 || _thisPurview.b[12] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[12] == 0 || _thisPurview2.b[12] == undefined) {//查看房间照片
//			$('#detailHsPicInfo').remove();
			$('#detailHsPicInfoRow').remove();
			$('#readonlyTabs').tabs('close', '房间照片');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[13] == 0 || _thisPurview.b[13] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[13] == 0 || _thisPurview2.b[13] == undefined) {//查看能源卡号
//			$('#detailEnergyInfo').remove();
			$('#detailEnergyInfoRow').remove();
			$('#readonlyTabs').tabs('close', '能源卡号');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[14] == 0 || _thisPurview.b[14] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[14] == 0 || _thisPurview2.b[14] == undefined) {//查看维保记录
//			$('#detailRepairInfo').remove();
			$('#detailRepairInfoRow').remove();
			$('#readonlyTabs').tabs('close', '维保记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[15] == 0 || _thisPurview.b[15] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[15] == 0 || _thisPurview2.b[15] == undefined) {//查看审批记录
//			$('#detailEventInfo').remove();
			$('#detailEventInfoRow').remove();
			$('#readonlyTabs').tabs('close', '审批记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[16] == 0 || _thisPurview.b[16] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[16] == 0 || _thisPurview2.b[16] == undefined) {//查看任务记录
//			$('#detailTaskInfo').remove();
			$('#detailTaskInfoRow').remove();
			$('#readonlyTabs').tabs('close', '任务记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[17] == 0 || _thisPurview.b[17] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[17] == 0 || _thisPurview2.b[17] == undefined) {//查看智能设备
//			$('#detailDeviceInfo').remove();
			$('#detailDeviceInfoRow').remove();
			$('#readonlyTabs').tabs('close', '智能设备');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[18] == 0 || _thisPurview.b[18] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[18] == 0 || _thisPurview2.b[18] == undefined) {//授权管理
			$('#detailAuthorizeInfoRow').remove();
			$('#readonlyTabs').tabs('close', '授权管理');
		}
		console.log(_thisPurview.b[19])
		console.log(_thisPurview2.b[19])
		if (_thisPurview.a == 0 || _thisPurview.b[19] == 0 || _thisPurview.b[19] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[19] == 0 || _thisPurview2.b[19] == undefined) {//能源读数
			$('#detailEnergyReadingsInfoRow').remove();
			$('#readonlyTabs').tabs('close', '能源读数');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加未租
			$('#addTrusteeshipButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//设置集中房
			$('#setCentralizedApartmentButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//设置合租房
			$('#splitFlatShareButton').remove();
			$('#splitFlatShareButton2').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//业主续签
			$('#landlordRenewButton').remove();
			$('#landlordRenewButton2').remove();
			$('#landlordRenewButton3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//业主退房
			$('#checkoutUpdate').remove();
			$('#checkoutUpdate2').remove();
			$('#checkoutUpdate3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[6] == 0 || _thisPurview.c[6] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[6] == 0 || _thisPurview2.c[6] == undefined) {//设置房管员
			$('#updateManagerUserButton').remove();
			$('#updateManagerUserButton2').remove();
			$('#updateManagerUserButton3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[7] == 0 || _thisPurview.c[7] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[7] == 0 || _thisPurview2.c[7] == undefined) {//设置指导价
			$('#guidePriceButton').remove();
			$('#guidePriceButton2').remove();
			$('#guidePriceButton3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[8] == 0 || _thisPurview.c[8] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[8] == 0 || _thisPurview2.c[8] == undefined) {//客户下定
			$('#depositManagerButton').remove();
			$('#depositManagerButton2').remove();
			$('#depositManagerButton3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[9] == 0 || _thisPurview.c[9] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[9] == 0 || _thisPurview2.c[9] == undefined) {//发送短信
			$('#sendMessageButton').remove();
			$('#sendMessageButton2').remove();
			$('#sendMessageButton3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[10] == 0 || _thisPurview.c[10] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[10] == 0 || _thisPurview2.c[10] == undefined) {//设置日租房
			$('#changeShortRent').remove();
			$('#sepUpShortRenButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[11] == 0 || _thisPurview.c[11] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[11] == 0 || _thisPurview2.c[11] == undefined) {//打印二维码
			$('#printAssetButton1').remove();
			$('#printAssetButton2').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[12] == 0 || _thisPurview.c[12] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[12] == 0 || _thisPurview2.c[12] == undefined) {//批量添加房间
			$('#centralizedApartmentButton').remove();
		}

	} else if (jsp == 'fg_sourceInfo') {
		_thisPurview = getModelPurview('M?0', loginPurview);//无业主模式
		_thisPurview2 = getModelPurview('M?0', loginPurview2);//物业在模式
		if (_thisPurview.a != 0 && _thisPurview2.a != 0) {
			$('#roomInfoTab').tabs('close', '业主信息');
			$('#roomInfoTab').tabs('close', '业主账单');
//		 	_customerType.splice($.inArray('业主',_customerType),1);
			$('#detailLandlordInfoRow').remove();
			$('#detailLandlordBillInfoRow').remove();

		}
		_thisPurview = getModelPurview('A?2', loginPurview);
		_thisPurview2 = getModelPurview('A?2', loginPurview2);
		for (var i = 6; i < _thisPurview.b.length; i++) {
			if (_thisPurview.b[i] == 1) {
				Revision2 = 1;
			}
		}
		if (_thisPurview.a == 0 || _thisPurview.b[6] == 0 || _thisPurview.b[6] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[6] == 0 || _thisPurview2.b[6] == undefined) {//查看租客信息
//			$('#detailRenterInfo').remove();
			$('#detailRenterInfoRow').remove();
			$('#roomInfoTab').tabs('close', '租客信息');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[7] == 0 || _thisPurview.b[7] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[7] == 0 || _thisPurview2.b[7] == undefined) {//查看业主信息
//			$('#detailLandlordInfo').remove();
			$('#detailLandlordInfoRow').remove();
			$('#roomInfoTab').tabs('close', '业主信息');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[8] == 0 || _thisPurview.b[8] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[8] == 0 || _thisPurview2.b[8] == undefined) {//查看房屋收支
//			$('#detailFinancialInfo').remove();
			$('#detailFinancialInfoRow').remove();
			$('#roomInfoTab').tabs('close', '房屋收支');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[9] == 0 || _thisPurview.b[9] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[9] == 0 || _thisPurview2.b[9] == undefined) {//查看业主账单
//			$('#detailLandlordBillInfo').remove();
			$('#detailLandlordBillInfoRow').remove();
			$('#roomInfoTab').tabs('close', '业主账单');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[10] == 0 || _thisPurview.b[10] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[10] == 0 || _thisPurview2.b[10] == undefined) {//查看租客账单
//			$('#detailRenterBillInfo').remove();
			$('#detailRenterBillInfoRow').remove();
			$('#roomInfoTab').tabs('close', '租客账单');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[11] == 0 || _thisPurview.b[11] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[11] == 0 || _thisPurview2.b[11] == undefined) {//查看客户信息
//			$('#detailPopulationInfo').remove();
			$('#detailPopulationInfoRow').remove();
			$('#roomInfoTab').tabs('close', '客户信息');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[12] == 0 || _thisPurview.b[12] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[12] == 0 || _thisPurview2.b[12] == undefined) {//查看家私电器
//			$('#detailAssetsInfo').remove();
			$('#detailAssetsInfoRow').remove();
			$('#roomInfoTab').tabs('close', '家私电器');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[13] == 0 || _thisPurview.b[13] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[13] == 0 || _thisPurview2.b[13] == undefined) {//查看合约记录
//			$('#detailContInfo').remove();
			$('#detailContInfoRow').remove();
			$('#roomInfoTab').tabs('close', '合约记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[14] == 0 || _thisPurview.b[14] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[14] == 0 || _thisPurview2.b[14] == undefined) {//查看短信记录
//			$('#detailMessageInfo').remove();
			$('#detailMessageInfoRow').remove();
			$('#roomInfoTab').tabs('close', '短信记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[15] == 0 || _thisPurview.b[15] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[15] == 0 || _thisPurview2.b[15] == undefined) {//查看房间照片
//			$('#detailHrPicInfo').remove();
			$('#detailHrPicInfoRow').remove();
			$('#roomInfoTab').tabs('close', '房间照片');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[16] == 0 || _thisPurview.b[16] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[16] == 0 || _thisPurview2.b[16] == undefined) {//查看能源卡号
//			$('#detailEnergyInfo').remove();
			$('#detailEnergyInfoRow').remove();
			$('#roomInfoTab').tabs('close', '能源卡号');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[17] == 0 || _thisPurview.b[17] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[17] == 0 || _thisPurview2.b[17] == undefined) {//查看维保记录
//			$('#detailRepairInfo').remove();
			$('#detailRepairInfoRow').remove();
			$('#roomInfoTab').tabs('close', '维保记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[18] == 0 || _thisPurview.b[18] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[18] == 0 || _thisPurview2.b[18] == undefined) {//查看审批记录
//			$('#detailEventInfo').remove();
			$('#detailEventInfoRow').remove();
			$('#roomInfoTab').tabs('close', '审批记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[19] == 0 || _thisPurview.b[19] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[19] == 0 || _thisPurview2.b[19] == undefined) {//查看任务记录
//			$('#detailTaskInfo').remove();
			$('#detailTaskInfoRow').remove();
			$('#roomInfoTab').tabs('close', '任务记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[20] == 0 || _thisPurview.b[20] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[20] == 0 || _thisPurview2.b[20] == undefined) {//门卡管理
			$('#detailDeviceInfoRow').remove();
			$('#roomInfoTab').tabs('close', '门卡管理');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加出租
			$('#addSourceButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//业主续签
			$('#landlordRenewButton').remove();
			$('#landlordRenewButton2').remove();
			$('#landlordRenewButton3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//租客续签
			$('#renterRenewButton').remove();
			$('#renterRenewButton2').remove();
			$('#renterRenewButton3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//租客退房
			$('#renterCheckoutButton').remove();
			$('#renterCheckoutButton2').remove();
			$('#renterCheckoutButton3').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//设置房管员
			$('#updateManagerUserButton').remove();
			$('#updateManagerUserButton2').remove();
			$('#updateManagerUserButton3').remove();
			$('#updateManagerUserButton4').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[6] == 0 || _thisPurview.c[6] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[6] == 0 || _thisPurview2.c[6] == undefined) {//发送短信
			$('#sendMessageButton').remove();
			$('#sendMessageButton2').remove();
			$('#sendMessageButton3').remove();
			$('#sendMessageButton4').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[7] == 0 || _thisPurview.c[7] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[7] == 0 || _thisPurview2.c[7] == undefined) {//添加临时账单
			$('#nuwAddFinancialButton').remove();
		}
	} else if (jsp == 'fg_checkOut') {
		_thisPurview = getModelPurview('M?0', loginPurview);//无业主模式
		_thisPurview2 = getModelPurview('M?0', loginPurview2);//无业主模式
		if (_thisPurview.a != 0 && _thisPurview2.a != 0) {
			$('#tabs').tabs('close', '业主退房');
		}
		_thisPurview = getModelPurview('A?3', loginPurview);
		_thisPurview2 = getModelPurview('A?3', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.b[1] == 0 || _thisPurview.b[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[1] == 0 || _thisPurview2.b[1] == undefined) {//租客退房
			$('#tabs').tabs('close', '租客退房');
		}
		if (_thisPurview.a == 0 || _thisPurview.b[2] == 0 || _thisPurview.b[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.b[2] == 0 || _thisPurview2.b[2] == undefined) {//业主退房
			$('#tabs').tabs('close', '业主退房');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//审核
			$('#renterCheckoutAudit').remove();
			$('#landlordCheckoutAudit').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//复核
			$('#renterCheckoutReview').remove();
			$('#landlordCheckoutReview').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//出账
			$('#renterCheckoutFinancial').remove();
			$('#landlordCheckoutFinancial').remove();
		}
	} else if (jsp == 'fg_goout') {
		_thisPurview = getModelPurview('A?4', loginPurview);
		_thisPurview2 = getModelPurview('A?4', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//外出登记
			$('#goOutButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//回来签到
			$('#goBackButton').remove();
		}
	} else if (jsp == 'fg_intended') {
		_thisPurview = getModelPurview('A?5', loginPurview);
		_thisPurview2 = getModelPurview('A?5', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加意向客户
			$('#addIntendedButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//带客看房
			$('#lookHouseBotton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//写跟进
			$('#writeFollowButton').remove();
		}
	} else if (jsp == 'fg_population') {
		_thisPurview = getModelPurview('M?0', loginPurview);//无业主模式
		_thisPurview2 = getModelPurview('M?0', loginPurview2);//无业主模式
		if (_thisPurview.a != 0 && _thisPurview2.a != 0) {
			$('#owner').remove();
			$('#ownerCheckbox').remove();
		}
		_thisPurview = getModelPurview('A?6', loginPurview);
		_thisPurview2 = getModelPurview('A?6', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//修改
			$('#updateButton').remove();
		}
	} else if (jsp == 'fg_financial') {
		_thisPurview = getModelPurview('B?0', loginPurview);
		_thisPurview2 = getModelPurview('B?0', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//新增收支
			$('#addFinancialButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//新增欠结补结
			$('#addDebtButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//账单收款
			$('#setRenterEveryFinancialButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//新签收款
			$('#setRenterNewFinancialButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//凭证管理
			$('#certificateNumberButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[6] == 0 || _thisPurview.c[6] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[6] == 0 || _thisPurview2.c[6] == undefined) {//冲账
			$('#doStrike').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[7] == 0 || _thisPurview.c[7] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[7] == 0 || _thisPurview2.c[7] == undefined) {//审核
			$('#doAuditOne').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[8] == 0 || _thisPurview.c[8] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[8] == 0 || _thisPurview2.c[8] == undefined) {//复合
			$('#doAuditTwo').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[9] == 0 || _thisPurview.c[9] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[9] == 0 || _thisPurview2.c[9] == undefined) {//收款账户
//			$('#').remove();
		}
	} else if (jsp == 'fg_accountSummary') {

	} else if (jsp == 'fg_payableToLandlord') {
		_thisPurview = getModelPurview('B?2', loginPurview);
		_thisPurview2 = getModelPurview('B?2', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//审核
			$('#doAuditOne').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//复核
			$('#doAuditTwo').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//付款
			$('#doAuditThree').remove();
		}
	} else if (jsp == 'fg_monthlyBills') {
		_thisPurview = getModelPurview('B?3', loginPurview);
		_thisPurview2 = getModelPurview('B?3', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//保存账单
			$('#saveBillButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//保存并通知租客
			$('#saveAndNoticeButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//查看付款凭证
			$('#showPaymentVoucherButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//查看微信付款凭证
			$('#weChatPayBillInquiryButton').remove();
		}
	} else if (jsp == 'fg_historyPrint') {

		_thisPurview = getModelPurview('B?4', loginPurview);
		_thisPurview2 = getModelPurview('B?4', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//打印
			$('#printButton').remove();
		}
	} else if (jsp == 'fg_contractNum') {
		_thisPurview = getModelPurview('B?5', loginPurview);
		_thisPurview2 = getModelPurview('B?5', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//生成
			$('#addContractNumButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//领用
			$('#getContractNumButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//注销
			$('#updateContractNumButton').remove();
		}
	} else if (jsp == 'fg_comprehensiveModification') {	//综合修改
		_thisPurview = getModelPurview('M?0', loginPurview);//无业主模式
		_thisPurview2 = getModelPurview('M?0', loginPurview2);//无业主模式
		if (_thisPurview.a != 0 && _thisPurview2.a != 0) {
			$('#readonlyTabs').tabs('close', '业主账单');
			$('#customerTabs').tabs('close', '业主信息');
		}
		_thisPurview = getModelPurview('B?6', loginPurview);
		_thisPurview2 = getModelPurview('B?6', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//已租信息
			$('#readonlyTabs').tabs('close', '已租信息');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//未租信息
			$('#readonlyTabs').tabs('close', '未租信息');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//租客账单
			$('#readonlyTabs').tabs('close', '租客账单');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//业主账单
			$('#readonlyTabs').tabs('close', '业主账单');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//合约记录
			$('#readonlyTabs').tabs('close', '合约记录');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[6] == 0 || _thisPurview.c[6] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[6] == 0 || _thisPurview2.c[6] == undefined) {//客户信息
			$('#readonlyTabs').tabs('close', '客户信息');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[8] == 0 || _thisPurview.c[8] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[8] == 0 || _thisPurview2.c[8] == undefined) {//能源卡号
			$('#readonlyTabs').tabs('close', '能源卡号');
		}
		if (_thisPurview.a == 0 || _thisPurview.c[9] == 0 || _thisPurview.c[9] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[9] == 0 || _thisPurview2.c[9] == undefined) {//自动发送短信
			$('#hsAutoSendMsgButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[10] == 0 || _thisPurview.c[10] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[10] == 0 || _thisPurview2.c[10] == undefined) {//手动发送短信
			$('#hsManualSendMsgButton').remove();
		}
	} else if (jsp == 'fg_asset') {
		_thisPurview = getModelPurview('C?0', loginPurview);
		_thisPurview2 = getModelPurview('C?0', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加资产
			$('#addAssetButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改资产
			$('#updateAssetButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//迁移资产
			$('#moveAssetButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//打印资产标示卡
			$('#printAssetButton').remove();
		}
	} else if (jsp == 'fg_repair') {
		_thisPurview = getModelPurview('C?1', loginPurview);
		_thisPurview2 = getModelPurview('C?1', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加维保
			$('#addRepairButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//添加进展
			$('#addProgressButton').remove();
			$('#doProgressButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//领取维保任务
//			$('#').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//修改负责人
			$('#updateRepairPeopleButton').remove();
		}

	} else if (jsp == 'fg_eventApproval') {
		_thisPurview = getModelPurview('C?2', loginPurview);
		_thisPurview2 = getModelPurview('C?2', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//审批
			$('#approvalButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//增加
			$('#addEventButton').remove();
		}
	} else if (jsp == 'fg_task') {
		_thisPurview = getModelPurview('C?3', loginPurview);
		_thisPurview2 = getModelPurview('C?3', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加任务
			$('#addRepairButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//添加进展
			$('#addProgressButton').remove();
			$('#writeProgress').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//领取任务
//			$('#').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//修改负责人
			$('#updateRepairPeopleButton').remove();
		}
		// console.log(_thisPurview.a);
		// console.log(_thisPurview.c[5]);
		// console.log(_thisPurview2.a);
		// console.log(_thisPurview2.c[5]);s


		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//修改复核
			$('#doReturningButton').remove();
		}
	} else if (jsp == 'fg_virtual') {
		_thisPurview = getModelPurview('C?4', loginPurview);
		_thisPurview2 = getModelPurview('C?4', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//录入项目
			$('#addVirtualButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改项目
			$('#updateVirtualButton').remove();
		}
	} else if (jsp == 'fg_meter') {
		_thisPurview = getModelPurview('C?5', loginPurview);
		_thisPurview2 = getModelPurview('C?5', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加抄表
			$('#addWegButton').remove();
		}
	} else if (jsp == 'fg_notice') {
		_thisPurview = getModelPurview('C?6', loginPurview);
		_thisPurview2 = getModelPurview('C?6', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加公告
			$('#addNotifButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改公告
			$('#updateNotcefButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//删除公告
			$('#removeNoticeButton').remove();
		}
	} else if (jsp == 'fg_file') {
		_thisPurview = getModelPurview('C?7', loginPurview);
		_thisPurview2 = getModelPurview('C?7', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//上传文件
			$('#pcUploadButton').remove();
			$('#qrUploadButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改文件
//			$('#').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//删除文件
//			$('#').remove();
		}
	} else if (jsp == 'fg_warehouseManagement') {
		_thisPurview = getModelPurview('C?8', loginPurview);
		_thisPurview2 = getModelPurview('C?8', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加库房
			$('#addVirtualButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改库房
			$('#updateVirtualButton').remove();
		}
	} else if (jsp == 'fg_projectSupplier') {
		_thisPurview = getModelPurview('C?9', loginPurview);
		_thisPurview2 = getModelPurview('C?9', loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加商家
			$('#addVirtualButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改商家
			$('#updateVirtualButton').remove();
		}

	}else if(jsp=='fg_officeAreaManagement') {
		_thisPurview = getModelPurview('U?0', loginPurview);//品牌模式
		_thisPurview2 = getModelPurview('U?0', loginPurview2);//品牌模式
		if (_thisPurview.a != 0 || _thisPurview2.a != 0) {
			if ($("#deviceInfoTable").datagrid().length > 0) {
				$("#deviceInfoTable").datagrid('showColumn', 'brandName');
			}
		}


		_thisPurview = getModelPurview('C?10',loginPurview);
		_thisPurview2 = getModelPurview('C?10',loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加办公区
			$('#addVirtualButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改办公区
			$('#updateVirtualButton').remove();
		}
	}else if(jsp=='fg_user'){
		_thisPurview = getModelPurview('D?0',loginPurview);
		_thisPurview2 = getModelPurview('D?0',loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//新增区域
			$('#addStorefrontButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//新增部门
			$('#addDepartmentButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//新增用户
			$('#addUserButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//用户离职
			$('#quitUserButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//业务员离职交接
			$('#outUserButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[6] == 0 || _thisPurview.c[6] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[6] == 0 || _thisPurview2.c[6] == undefined) {//部门调换
			$('#deptTransfer').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[7] == 0 || _thisPurview.c[7] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[7] == 0 || _thisPurview2.c[7] == undefined) {//修改用户资料
			$('#saveUpdateUserDiv').remove();
		}
        if (_thisPurview.a == 0 || _thisPurview.c[8] == 0 || _thisPurview.c[8] == undefined ||
            _thisPurview2.a == 0 || _thisPurview2.c[8] == 0 || _thisPurview2.c[8] == undefined) {//用户折扣权限
            $('#discountAuthBtn').remove();
            $('#authFlag').val('0');
        }

	}else if(jsp=='fg_purview'){
		_thisPurview = getModelPurview('D?2',loginPurview);
		_thisPurview2 = getModelPurview('D?2',loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//增加
			$('#addPurviewButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改
			$('#updatePurviewButton').remove();
		}
	}else if(jsp=='fg_houseDic'){
		_thisPurview = getModelPurview('E?0',loginPurview);
		_thisPurview2 = getModelPurview('E?0',loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//增加
			$('#addHouseDicButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改
			$('#updateHouseDic').remove();
		}
	}else if(jsp=='fg_planTable'){
		_thisPurview = getModelPurview('E?1',loginPurview);
		_thisPurview2 = getModelPurview('E?1',loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//增加
			$('#addPlanButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改
			$('#updatePlanButton').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//删除
//			$('#').remove();
		}
	}else if(jsp=='fg_variable'){
		_thisPurview = getModelPurview('E?2',loginPurview);
		_thisPurview2 = getModelPurview('E?2',loginPurview2);

		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//修改
//			$('#').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined || 
		    _thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//基础设置
		        $('#tab1').remove();
		        $('#ttab1').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined || 
		    _thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//公寓设置
		        $('#tab2').remove();
		        $('#ttab2').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined || 
		    _thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//旅业设置
		        $('#tab3').remove();
		        $('#ttab3').remove()
		}
		if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined || 
		    _thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//企业设置
		        $('#tab4').remove();
		        $('#ttab4').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[6] == 0 || _thisPurview.c[6] == undefined || 
		    _thisPurview2.a == 0 || _thisPurview2.c[6] == 0 || _thisPurview2.c[6] == undefined) {//设备设置
		        $('#tab5').remove();
		        $('#ttab5').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[7] == 0 || _thisPurview.c[7] == undefined || 
		    _thisPurview2.a == 0 || _thisPurview2.c[7] == 0 || _thisPurview2.c[7] == undefined) {//商超设置
		        $('#tab6').remove();
		        $('#ttab6').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[8] == 0 || _thisPurview.c[8] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[8] == 0 || _thisPurview2.c[8] == undefined) {//酒店设置
			$('#tab7').remove();
			$('#ttab7').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[9] == 0 || _thisPurview.c[9] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[9] == 0 || _thisPurview2.c[9] == undefined) {//民宿设置
			$('#tab8').remove();
			$('#ttab8').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[10] == 0 || _thisPurview.c[10] == undefined ||
			_thisPurview2.a == 0 || _thisPurview2.c[10] == 0 || _thisPurview2.c[10] == undefined) {//校园设置
			$('#tab9').remove();
			$('#ttab9').remove();
		}
		$('#firstNav li:first').addClass("active");
		$('.variableboard').children('div:first').addClass("in");
		$('.variableboard').children('div:first').addClass("active");
	}else if(jsp=='fg_achievementData'){
//		_thisPurview = getModelPurview('F?0',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_houseFinancialEcology'){
//		_thisPurview = getModelPurview('F?1',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_financialDailyData'){
//		_thisPurview = getModelPurview('F?2',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_companyCost'){
//		_thisPurview = getModelPurview('F?3',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_housePriceStatistics'){
//		_thisPurview = getModelPurview('F?4',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_landFreeEarnings'){
//		_thisPurview = getModelPurview('F?5',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_vacantCost'){
//		_thisPurview = getModelPurview('F?6',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_shortMessage'){
//		_thisPurview = getModelPurview('F?7',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_assistance'){
		_thisPurview = getModelPurview('F?8',loginPurview);
		_thisPurview2 = getModelPurview('F?8',loginPurview2);
		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//添加受益人
			$('#').remove();
		}
		if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined || 
				_thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//修改收益人
			$('#').remove();
		}
	}else if(jsp=='fg_customerSourceStatistics'){
//		_thisPurview = getModelPurview('F?9',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_rentCheckout'){
//		_thisPurview = getModelPurview('F?10',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}else if(jsp=='fg_bossCalendar'){//数据日历
//		_thisPurview = getModelPurview('F?11',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
	}
//	else if(jsp==''){
//		_thisPurview = getModelPurview('?',loginPurview);
//		if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || ) {//
//			$('#').remove();
//		}
//	}
	else if(jsp=='fg_help'){//服务
		_thisPurview = getModelPurview('L?0',loginPurview);
		_thisPurview2 = getModelPurview('L?0',loginPurview2);
		 if (_thisPurview.a == 0 || _thisPurview.c[1] == 0 || _thisPurview.c[1] == undefined || 
            _thisPurview2.a == 0 || _thisPurview2.c[1] == 0 || _thisPurview2.c[1] == undefined) {//视频帮助
                $('#tab1').remove();
                $('#spbz').remove();
	    }
		 if (_thisPurview.a == 0 || _thisPurview.c[2] == 0 || _thisPurview.c[2] == undefined || 
	        _thisPurview2.a == 0 || _thisPurview2.c[2] == 0 || _thisPurview2.c[2] == undefined) {//旗舰版
	            $('#tab2').remove();
	            $('#ttab2').remove();
	    }
	    if (_thisPurview.a == 0 || _thisPurview.c[3] == 0 || _thisPurview.c[3] == undefined || 
	        _thisPurview2.a == 0 || _thisPurview2.c[3] == 0 || _thisPurview2.c[3] == undefined) {//尊享版
	            $('#tab4').remove();
	            $('#ttab4').remove();
	    }
	    if (_thisPurview.a == 0 || _thisPurview.c[4] == 0 || _thisPurview.c[4] == undefined || 
	        _thisPurview2.a == 0 || _thisPurview2.c[4] == 0 || _thisPurview2.c[4] == undefined) {//基础版
	            $('#tab5').remove();
	            $('#ttab5').remove();
	    }
	    if (_thisPurview.a == 0 || _thisPurview.c[5] == 0 || _thisPurview.c[5] == undefined || 
	        _thisPurview2.a == 0 || _thisPurview2.c[5] == 0 || _thisPurview2.c[5] == undefined) {//资料下载
	            $('#tab3').remove();
	            $('#ttab3').remove();
	    }
		$('#firstNav li:first').addClass("active");
		$('.helpboard').children('div:first').addClass("in");
		$('.helpboard').children('div:first').addClass("active");
	}
	else if(jsp=='fg_intelligence') {
		_thisPurview = getModelPurview('U?0',loginPurview);//品牌模式
		_thisPurview2 = getModelPurview('U?0',loginPurview2);//品牌模式
		if(_thisPurview.a != 0 || _thisPurview2.a != 0){
			if($("#deviceInfoTable").datagrid().length>0){
				$("#deviceInfoTable").datagrid('showColumn','brandName');
				var col = $("#deviceInfoTable").datagrid('getColumnOption','brandName');//获取你刚showColumn
				col.width ='110' ;//宽度根据需要可以是值也可以是百分比
				$("#deviceInfoTable").datagrid();//渲染一下[/b]
			}
		}
	}
	else if(jsp=='school_office') {
		_thisPurview = getModelPurview('U?0',loginPurview);//品牌模式
		_thisPurview2 = getModelPurview('U?0',loginPurview2);//品牌模式
		if(_thisPurview.a != 0 || _thisPurview2.a != 0){
			if($("#deviceInfoTable").datagrid().length>0){
				$("#deviceInfoTable").datagrid('showColumn','brandName');
			}
		}
	}
	else if(jsp=='school_classroom') {
		_thisPurview = getModelPurview('U?0',loginPurview);//品牌模式
		_thisPurview2 = getModelPurview('U?0',loginPurview2);//品牌模式
		if(_thisPurview.a != 0 || _thisPurview2.a != 0){
			if($("#deviceInfoTable").datagrid().length>0){
				$("#deviceInfoTable").datagrid('showColumn','brandName');
			}
		}
	}
	else if(jsp=='shool_commonAreaManagement') {
		_thisPurview = getModelPurview('U?0',loginPurview);//品牌模式
		_thisPurview2 = getModelPurview('U?0',loginPurview2);//品牌模式
		if(_thisPurview.a != 0 || _thisPurview2.a != 0){
			if($("#deviceInfoTable").datagrid().length>0){
				$("#deviceInfoTable").datagrid('showColumn','brandName');
			}
		}
	}


}

