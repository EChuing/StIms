$(function() {
	advancedScreening(0);
	$("#searchEndTime").val(formatTime(getNowFormatDate(), 2));
	if(_handlerIf==1){
		if(_publisher==1){
			for(var j in _userInfoData){
				if(_loginUserId == _userInfoData[j].userId){
					$("#searchPublisherGetUserId").val(_userInfoData[j].userId);
					$("#searchPublisherShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
				}
			}
		}
	}else{
		for(var j in _userInfoData){
			if(_loginUserId == _userInfoData[j].userId){
				$("#searchHandlerGetUserId").val(_userInfoData[j].userId);
				$("#searchHandlerShowUserInfo").val(_userInfoData[j].storefrontName+" "+_userInfoData[j].departmentName+" "+_userInfoData[j].suStaffName);
			}
		}
	}
	$("#eventDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$("#event_index").val(rowIndex);
			seeEvent();
		}
	});
	showFinancilTypeSearch('financilAdd','');
	for (var i in _acountType) {
		$('.add_financial_way').append("<option value='" + i + "'>" + _acountType[i] + "</option>");
	}
	for (var i in _eventApprovalType) {
		$('#eventType').append("<option value='" + _eventApprovalType[i] + "'>" + _eventApprovalType[i] + "</option>");
		$('#searchEventType').append("<option value='" + _eventApprovalType[i] + "'>" + _eventApprovalType[i] + "</option>");
	}
	for (var i in _payType) {
		$('.financial_payType').append("<option value='" + _payType[i] + "'>" + _payType[i] + "</option>");
	}
	for (var i in _loginCompanyRentDistrict) {
		$("#searchDistrict").append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
		$("#searchAddDistrict").append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');	
	}
	queryEvent(_pageNum[0], 0);
	
});

//高级筛选
function advancedScreening(num){
	if(num == 0){//普通筛选
		$('.advancedScreening').css({
			"height" : "30px",
			"width"  : '965px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "28px",
		})
		$('.advanced2').css({
			"height" : "0px",
		})
		$('.advanced3').css({
			"height" : "0px",
		})
		$('#screening').attr('onclick','advancedScreening(1)');
	}else if(num == 1){//高级筛选
		$('.advancedScreening').css({
			"height" : "100px",
			"width"  : '100%',
		})
		$('.advanced1').css({
			"height" : "28px",
		})
		$('.advanced2').css({
			"height" : "28px",
		})
		$('.advanced3').css({
			"height" : "35px",
		})
		$('#screening').attr('onclick','advancedScreening(0)');
	}
}

//查询审批列表
function queryEvent(page, type){
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var eventState = $("#searchEventState").find("option:selected").text();
	var eventType = $("#searchEventType").find("option:selected").text();
	var publisher = $("#searchPublisherGetUserId").val();
    var departmentId=$("#searchPublisherGetUserDetId").val();//申请人部门
    var storefrontId = $("#searchPublisherGetUserStoreId").val();//申请人区域

	var handler = $("#searchHandlerGetUserId").val();
    var handlerDetId=$("#searchHandlerGetUserDetId").val();//审批人部门
    var handlerStoreId = $("#searchHandlerGetUserStoreId").val();//审批人区域

	var startTime = $("#searchStartTime").val();
	var endTime = $("#searchEndTime").val();
	
	var payStartTime = $("#searchPayStartTime").val();
	var payEndTime = $("#searchPayEndTime").val();
	
	var addCity = $("#searchCity").find("option:selected").text();
	var addDistrict = $("#searchDistrict").find("option:selected").text();
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#searchBuilding").val();
	var addDoorplateno = $("#searchDoorplateno").val();
	var eaHomeType = $("#searcheaHomeType").val();
	var eaEventContent = $("#searcheaEventContent").val();
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime = formatDate(endTime);
	$.post("../selectEvent.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		eaEventState 		: eventState,
		eaEventType 		: eventType,
		eaEventPublisher 	: publisher,
		departmentId      : departmentId,
		storefrontId    : storefrontId,
		eaEventHandler 		: handler,
        handlerDetId        : handlerDetId,
        handlerStoreId      : handlerStoreId,
		startTime 			: startTime,
		endTime 			: endTime,
		addCity 			: addCity,
		addDistrict 		: addDistrict,
		addCommunity 		: addCommunity,
		addBuilding 		: addBuilding,
		addDoorplateno 		: addDoorplateno,
		eaHomeType			: eaHomeType,
		eaEventContent		: eaEventContent,
		splitFlag			: 1,
		payStartTime        : payStartTime,
		payEndTime          : payEndTime,

	}, function(data) {
		console.log("11111111111111");
		console.log(data);
		
		if (data.code<0) {
			$('#eventDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryEvent","event");
			}else{
				notCountPage(page, 0 ,"queryEvent","event");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryEvent","event");
			}else{
				notCountPage(page, 1 , "queryEvent","event");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].totalPage = taskCostTime(data[i].eaReleaseTime,data[i].eaUseTime);
				if ((data[i].eaRentId != null && data[i].eaRentId != '')||(data[i].eaStoreId != null && data[i].eaStoreId != '')||(data[i].eaHouseId != null && data[i].eaHouseId != '')) {
					data[i].detailAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
				} else {
					if(data[i].eaHomeType == "客户审批"){
						data[i].detailAddress = data[i].cocContacts;
					}else{
					data[i].detailAddress = '无归属审批';}
				}
				if(data[i].eaHomeType == "其他审批" || data[i].eaHomeType == "日常事务" || data[i].eaHomeType == "项目事务"){
					data[i].detailAddress = data[i].keyAdministrator;
				}
				
			}
			$("#eventDg").datagrid("loadData", data);
		}
	}, "json");
}
//分页统计数据eaHomeType
function geteventPageCount(page){
	var pageNum = 20;
	
	var eventState = $("#searchEventState").find("option:selected").text();
	var eventType = $("#searchEventType").find("option:selected").text();
	var publisher = $("#searchPublisherGetUserId").val();
	var handler = $("#searchHandlerGetUserId").val();
	var startTime = $("#searchStartTime").val();
	var endTime = $("#searchEndTime").val();
	var addCity = $("#searchCity").find("option:selected").text();
	var addDistrict = $("#searchDistrict").find("option:selected").text();
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#searchBuilding").val();
	var addDoorplateno = $("#searchDoorplateno").val();
	var eaHomeType = $("#searcheaHomeType").val();
	var eaEventContent = $("#searcheaEventContent").val();
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime = formatDate(endTime);
	$.post("../selectEvent.action", {
		eaEventState 		: eventState,
		eaEventType 		: eventType,
		eaEventPublisher 	: publisher,
		eaEventHandler 		: handler,
		startTime 			: startTime,
		endTime 			: endTime,
		addCity 			: addCity,
		addDistrict 		: addDistrict,
		addCommunity 		: addCommunity,
		addBuilding 		: addBuilding,
		addDoorplateno 		: addDoorplateno,
		eaHomeType			: eaHomeType,
		eaEventContent		: eaEventContent,
		splitFlag			: 0,
	}, function(data) {
		if (data.code<0 ||data.body[0].totalNum==0) {
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"event",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"event",0);
		}
	}, "json");
}
//分页操作
function eventPage(totalNum, page) {
	var pageNum = Math.ceil(totalNum / 20);
	$("#eventPage").remove();
	$("#eventPageDiv").append("<div class='tcdPageCode' id='eventPage' style='text-align:center;'></div>");
	$("#eventPage").createPage({
		onePageNums:20,
		totalNum:totalNum,
		pageCount : pageNum,
		current : 1,
		backFn : function(p) {
			if (p <= pageNum) {
				_pageNum[0] = p;
				queryEvent(p, 1);
			}
		}
	});
}
function clear(){
	$("#token").val("");
	$("#att").val("");
	$("#co").val("");
	$("#eaId").val("");
	$("#handlerId").val("");
	$("#handlerName").val("");
	$('#eaApprovalNumber').val('');
	$('#eaApprovalNumber1').html('');
	$('#doEventShowUserInfo').val('');
}
//添加审批
function addEvent(){
	$('#addEventDlg').dialog({
		title : "添加审批",
		top : getTop(340),
		left : getLeft(640),
		width : 640,
        height : 360,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addEventDlg [clear="clear"]').val('');
			$('#addEventDlg [clear="clear"]').html('');
			$('#addEventDlg [choose="choose"]').val('');
			$('#addEventDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#shorMessageRemind1').prop({checked:false});
			$('#ifSpeed').prop({checked:false});
			clearAttachment();
		}
	});
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$('#eaApprovalNumber').val(approvalNumber());
	$("#shorMessageRemind1").prop("checked", false);
	$('#ifSpeed').prop({checked:false});
	$('#amountInvolved').val(0);
	$('#payBankInfo').hide();
	$('#accountId').hide();
	$('#fujian').show();
	$('#doAddEventBtn').show();
	$('#doUpdateEventBtn').hide();
	$('#addEventDlg').dialog('open');
}
//执行添加审批
function doAddEvent(){
	var rentId = $("#hrId").val();
	var storeId = $("#hsId").val();
	var houseId = $("#hpId").val();
	var customerId = $("#customerId").val();
	var houseType = $("#houseHomeType").val();
	var amountInvolved = $("#amountInvolved").val();
	var eventType = $("#eventType").find("option:selected").text();
	var handler = $("#doEventGetUserId").val();
	var eventDescribe = $("#eventDescribe").val();
	var houseAddress = $("#addHouseAddress").val();
	var eaApprovalNumber = $("#eaApprovalNumber").val();
	var eaBankName = $('#eaBankName').val();
	var eaBankUsername = $('#eaBankUsername').val();
	var subordinateTrip = $('#subordinateTrip').val();
	var accountDescription = $('#accountDescription').val();
	var eaBankAccountNumber = $('#eaBankAccountNumber').val();
	var subordinateTrip = $('#subordinateTrip').val();
	var accountDescription = $('#accountDescription').val();
	console.log(subordinateTrip);
	console.log(accountDescription);
	var att = $("#att").val();
	
	
	if (amountInvolved == 0) {
		eaBankName = '';
		eaBankUsername = '';
		eaBankAccountNumber = '';
	}
	if($('#ifSpeed').prop("checked")){
		eventDescribe = "【优先处理】"+eventDescribe;
	}
	if(amountInvolved != 0 && amountInvolved != '' && houseAddress == ''){
		myTips("涉及金额，请选择审批归属！","error");
		return;
	}
	var jhfFollowRemark = getNowFormatDate()+' '+ _loginUserName+' 添加的'+houseType+':'+eventDescribe;
	if(amountInvolved != 0 && amountInvolved != '' && (eaBankName == '' || eaBankUsername == '' || eaBankAccountNumber == '')){
		$.messager.defaults.ok = '添加账户';
		$.messager.defaults.cancel = '提交审批';
		$.messager.confirm('提示','收款账户为空，是否添加账户？',function(r){   
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
		    		eaCocId   : customerId,
		    		eaEventPublisher : _loginUserId,
		    		eaEventHandler : handler,
		    		eaHomeType : houseType,
		    		eaEventType : eventType,
		    	    eaEventState : "处理中",
		    	    eaWhetherGenerateRecord : "否",
		    	    eaAmountInvolved : amountInvolved,
		    	    eaEventContent : eventDescribe,
		    	    eaApprovalNumber: eaApprovalNumber,
		    	    eaBankName: eaBankName,
		    	    eaBankUsername: eaBankUsername,
		    	    eaBankAccountNumber: eaBankAccountNumber,
                    eaSubordinateBranch: subordinateTrip,
                    eaBankAccountDescription: accountDescription,
		    	    att : att
		    	}, function(data) {
		    		hideLoading();
		    		if (data.code<0) {
		    			myTips("添加失败！", "error");
		    			return;
		    		}
		    		isSave = true;
//		    		$.post("../insertHousingFollow.action",{
//		    			jhfHouseId        : houseId,
//		    			jhfHouse4rentId   : rentId,
//		    			jhfHouse4storeId  : storeId,
//		    			jhfFollowRemark   : jhfFollowRemark,
//		    			jhfUserId         : _loginUserId,
//		    			jhfDepartment     : _loginDepartment,
//		    			jhfStorefront     : _loginStore,
//		    			jhfPaymentWay     : '系统跟进',
//		    			jhfFollowResult   : '跟进成功',
//		    		}, function(fData){
//		    			
//		    		})
		    		doSendMessage();
		    		/*console.log("77777777777777");
		    		$.post("../queryCsAccountReceipt.action",{
		    			csAccountName   : eaBankUsername,
		    			csBank          : eaBankName,
		    			csAccountUmber  : eaBankAccountNumber
		    		},  function(data) {
		    			if (data.code>0) {
		    				console.log("99999999999999");
		    			} else {
		    				$.post("../insertCsAccountReceipt.action",{
		    					csAccountName   : eaBankUsername,
		    		    		csBank          : eaBankName,
		    		    		csAccountUmber  : eaBankAccountNumber
		    				}, function(data){}),"json";
		    			}
		    			
		    		}, "json");*/
		    		myTips("添加成功！", "success");
		    	});
		    }
		});  
	} else {
		showLoading();
		console.log("esle");
		$.post("../insertEventApproval.action", {
			eaRentId : rentId,
			eaStoreId : storeId,
			eaHouseId : houseId,
			eaCocId   : customerId,
			eaEventPublisher : _loginUserId,
			eaEventHandler : handler,
			eaHomeType : houseType,
			eaEventType : eventType,
		    eaEventState : "处理中",
		    eaWhetherGenerateRecord : "否",
		    eaAmountInvolved : amountInvolved,
		    eaEventContent : eventDescribe,
		    eaApprovalNumber: eaApprovalNumber,
		    eaBankName: eaBankName,
		    eaBankUsername: eaBankUsername,
		    eaBankAccountNumber: eaBankAccountNumber,
            eaSubordinateBranch: subordinateTrip,
            eaBankAccountDescription: accountDescription,
		    att : att
		}, function(data) {
			hideLoading();
			isSave = true;
			if (data.code<0) {
				myTips("添加失败！", "error");
				return;
			}
//			$.post("../insertHousingFollow.action",{
//    			jhfHouseId        : houseId,
//    			jhfHouse4rentId   : rentId,
//    			jhfHouse4storeId  : storeId,
//    			jhfFollowRemark   : jhfFollowRemark,
//    			jhfUserId         : _loginUserId,
//    			jhfDepartment     : _loginDepartment,
//    			jhfStorefront     : _loginStore,
//    			jhfPaymentWay     : '系统跟进',
//    			jhfFollowResult   : '跟进成功',
//    		}, function(fData){
//    			
//    		})
			doSendMessage();
			$.post("../queryCsAccountReceipt.action",{
    			csAccountName   : eaBankUsername,
    			csBank          : eaBankName,
    			csAccountUmber  : eaBankAccountNumber
    			
    		},  function(data) {
    			if (data.code>0) {
    				
    			} else {
    				$.post("../insertCsAccountReceipt.action",{
    					csAccountName   : eaBankUsername,
    		    		csBank          : eaBankName,
    		    		csAccountUmber  : eaBankAccountNumber,
    		    		csSubordinateBranch : subordinateTrip,
    	    			csAccountDescription : accountDescription
    				}, function(data){}),"json";
    			}
    			
    		}, "json");
			myTips("添加成功！", "success");
		});
	}
		
}
//添加审批执行发送短信
function doSendMessage(){
	if($('#shorMessageRemind1').prop("checked")){
		if($('#ifSpeed').prop("checked")){
			
		}
		var userId = $('#doEventGetUserId').val();
				
		var evenTypeRp = $('#eventType').val();
		var evenDescribe = "发布人："+_loginUserName+"-"+$('#eventDescribe').val();
		var evenAdd = $('#addHouseAddress').val();
		var houseType = $('#houseHomeType').val();
		var amountInvolved = $('#amountInvolved').val();
		if($('#ifSpeed').prop("checked")){
			evenDescribe = "【优先处理】"+evenDescribe;
		}
		if(amountInvolved == '' || amountInvolved == null || amountInvolved ==0){
			amountInvolved = 0;
		}
	
		var rentId = $('#hrId').val();	
		var storeId = $('#hsId').val();	
	
		var evenApprovalJson= {
			smUserId : userId,
			smRentId :rentId,
			smNotRentId :storeId,
			evenType : evenTypeRp,
			addCommunity : evenAdd,
			houseType : houseType,
			smMoney : amountInvolved,
			handleStatus : '处理中',
			repairDescribe : evenDescribe,
		};
		$.post("../massage/sendEventApprovalMsg.action",evenApprovalJson ,function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
			}
			$('#addEventDlg').dialog('close');
			queryEvent(_pageNum[0], 0);
		});								
	}else{
		$('#addEventDlg').dialog('close');
		queryEvent(_pageNum[0], 0);
		return;
	}
}
//处理时发送短信
function handleSendMessage(){
	if($('#shorMessageRemind2').prop("checked")){
		var row = $("#eventDg").datagrid("getSelected");
		
		var handleStatus = $('#choseEventState').find("option:selected").text();
		var smUserId = '';
		
		if(handleStatus == '处理中'){
			smUserId = $('#doNextEventGetUserId').val();
		}else{
			smUserId = row.eaEventPublisher;
		}
		
		var handleOpinion = $('#handleAdvise').val();

		var evenType = row.eaEventType;
		var evenDescribe = row.eaEventContent
		var evenAdd = row.detailAddress;
		var houseType = row.eaHomeType;
		var amountInvolved = row.eaAmountInvolved;
		
		if(amountInvolved == '' || amountInvolved == null || amountInvolved ==0){
			amountInvolved = 0;
		}
				
		var rentId = $('#rentId').val();	
		var storeId = $('#storeId').val();	
		var evenApprovalJson= {
			smUserId : smUserId,
			smRentId :rentId,
			smNotRentId :storeId,
			evenType : evenType,
			addCommunity : evenAdd,
			houseType : houseType,
			smMoney : amountInvolved,
			repairDescribe : evenDescribe,
			handleStatus : handleStatus,
			handleOpinion : handleOpinion,
		};
		$.post("../massage/sendEventApprovalMsg.action",evenApprovalJson ,function(data) {
			if(data.code<0){
				myTips(data.msg,"error");
			}
			$("#handleAdviseDlg").dialog('close');
			$("#seeEventDlg").dialog('close');
			queryEvent(_pageNum[0],0);
		});									
	}else{
		$("#handleAdviseDlg").dialog('close');
		$("#seeEventDlg").dialog('close');
		queryEvent(_pageNum[0],0);
		return;
	}

}

//选择房源
function choseHouse() {
	$('#choseHouseDlg').dialog({
		title : '选择房源',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#searchBelongType').val('1');
		}
	});
	relationDataGrid();
	$('#choseHouseDlg').dialog('open');
}
function relationDataGrid() {
	var relationType = $('#searchBelongType').find('option:selected').text();
	var clear = function(){
		$("#hrId").val('');
		$("#hsId").val('');
		$("#hpId").val('');
		$("#houseHomeType").val('');
		$("#addHouseAddress").val('');
	}
	if (relationType == '已租列表') {
		$('#choseSource').show();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').hide();		
		$('#choseVirtual1').hide();
		$('#relationSelect').show();
		$('#virtualRelationSelect').hide();
		$('#customerListSelect').hide();
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
					title : '租客',
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
					var row = $('#choseSourceTable').datagrid('getSelected');
					if (row) {
						for (var i in row) {
							if (row[i] == null) {
								row[i] = '';
							}
						}
						clear();
						$("#hrId").val(row.hrId);
						$("#hsId").val(row.hrHouse4storeId);
						$("#hpId").val(row.hrHouseId);
						$("#houseHomeType").val('已租审批');
						$("#addHouseAddress").val(row.hrAddCommunity + ' ' + row.hrAddBuilding + ' ' + row.hrAddDoorplateno);
						$('#choseHouseDlg').dialog('close');
					}
				}
			});
		}
	}
	if (relationType == '未租列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').show();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').hide();
		$('#choseVirtual1').hide();

		$('#relationSelect').show();
		$('#virtualRelationSelect').hide();
		$('#customerListSelect').hide();
		if ($('#choseTrusteeshipTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipTable').datagrid(
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
				}, {
					field : 'laPopName',
					title : '业主',
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
						clear();
						$("#hsId").val(row.hsId);
						$("#hpId").val(row.hsHouseId);
						$("#houseHomeType").val('未租审批');
						$("#addHouseAddress").val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
						$('#choseHouseDlg').dialog('close');
					}
				}
			});
		}
	}
	if (relationType == '盘源列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').show();
		$('#choseVirtual').hide();
		$('#choseVirtual1').hide();

		$('#relationSelect').show();
		$('#virtualRelationSelect').hide();
		$('#customerListSelect').hide();
		if ($('#choseSaveHouseTable').hasClass('datagrid-f')) {

		} else {
			$('#choseSaveHouseTable').datagrid(
			{
				columns : [ [ {
					field : 'addDistrict',
					title : '城区',
					width : 20,
					align : 'center'
				}, {
					field : 'addZone',
					title : '片区',
					width : 20,
					align : 'center'
				}, {
					field : 'addCommunity',
					title : '楼盘名称',
					width : 30,
					align : 'center'
				}, {
					field : 'addBuilding',
					title : '楼栋',
					width : 10,
					align : 'center'
				}, {
					field : 'addDoorplateno',
					title : '门牌号',
					width : 10,
					align : 'center'
				}, {
					field : 'houseState',
					title : '状态',
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
					var row = $('#choseSaveHouseTable').datagrid('getSelected');
					if (row) {
						for (var i in row) {
							if (row[i] == null) {
								row[i] = '';
							}
						}
						clear();
						$("#hpId").val(row.houseCoding);
						$("#houseHomeType").val('盘源审批');
						$("#addHouseAddress").val(row.addCommunity + ' ' + row.addBuilding + ' ' + row.addDoorplateno);
						$('#choseHouseDlg').dialog('close');
					}
				}
			});
		}
	}
	if (relationType == '其他列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').show();
		$('#choseVirtual1').hide();
		$('#relationSelect').hide();
		$('#virtualRelationSelect').show();
		$('#customerListSelect').hide();
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
							clear();
							$("#hpId").val(row.houseCoding);
							$("#houseHomeType").val('其他审批');
							$("#addHouseAddress").val(row.keyAdministrator);
							$('#choseHouseDlg').dialog('close');
						}
					}
				});
		}
	}
//	
	if (relationType == '客户列表') {
		$('#choseSource').hide();
		$('#choseTrusteeship').hide();
		$('#choseSaveHouse').hide();
		$('#choseVirtual').hide();
		$('#choseVirtual1').show();
		$('#relationSelect').hide();
		$('#virtualRelationSelect').hide();
		$('#customerListSelect').show();
		if ($('#chosecustomerTable').hasClass('datagrid-f')) {

		} else {
			$('#chosecustomerTable').datagrid(
				{
					columns : [ [ {
						field : 'cocContacts',
						title : '联系人',
						width : 10,
						align : 'center'
					}, {
						field : 'cocPhone',
						title : '电话号码',
						width : 10,
						align : 'center'
					}, {
						field : 'cocCompanyAbbreviation',
						title : '公司名称',
						width : 10,
						align : 'center'
					}, {
						field : 'cocGrade',
						title : '客户等级',
						width : 10,
						align : 'center'
					}, {
						field : 'cocAddress',
						title : '收货地址',
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
						var row = $('#chosecustomerTable').datagrid(
								'getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							clear();
							$("#hpId").val(row.houseCoding);
							$("#customerId").val(row.cocId);
							$("#houseHomeType").val('客户审批');
							$("#addHouseAddress").val(row.cocContacts);
							$('#choseHouseDlg').dialog('close');
						}
					}
				});
		}
	}
	queryAddCity(1);
}
function choseHouseData(page, type) {
	var relation = $('#searchBelongType').val();
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();
	var hrLeaseState = $("#searchHrLeaseState").val();
	
	//项目
	//var virtualType = $("#searchVirtualType").val();
	var searchVirtualName = $("#searchVirtualName").val();
	var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
	var searchVirtualContact = $("#searchVirtualContact").val();
	//客户
	var searchVirtualName1 = $("#searchVirtualName1").val();
	var searchVirtualDoorplateno1 = $("#searchVirtualDoorplateno1").val();
	
	$("#searchHrLeaseStateDiv").hide();
	if (relation == 1) {
		$("#searchHrLeaseStateDiv").show();
		$.post("../queryHouseRentCommon.action", {
			startNum : startNum,
			endNum : endNum,
			hrAddCity : qhAddCity,
			hrAddDistrict : qhAddDistrict,
			hrAddZone : qhAddZone,
			hrAddCommunity : qhAddCommunity,
			hrAddBuilding : qhAddBuilding,
			hrAddDoorplateno : qhAddDoorplateno,
			hrLeaseState	:hrLeaseState,
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 1);
				$('#choseSourceTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data = data.body;
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
			hsLeaseState	:'所有未租',
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 2);
				$('#choseTrusteeshipTable').datagrid({
					data : [],
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
			houseSignedState:'未托管',
		}, function(data) {
			if (data.code <0) {
				sourcePage(0, 0, 3);
				$('#choseSaveHouseTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				if (page == 1 && type == 0) {
					sourcePage(data.body[0].totalNum, page, 3);
				}
			}
			$("#choseSaveHouseTable").datagrid("loadData", data.body);
		}, "json");
	}
	if (relation == 4) {
		$.post("../queryVirtualFinancial.action", {
			startNum : startNum,
			endNum : endNum,
			virtualType : '4',
			keyAdministrator : searchVirtualName,
			addDoorplateno : searchVirtualDoorplateno,
			keyNumber : searchVirtualContact,
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 4);
				$('#choseVirtualTable').datagrid({
					data : [],
					view : myview,
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
	if (relation == 5) {
		$.post("../queryCustomer.action", {
			startNum : startNum,
			endNum : endNum,
			cocContacts : searchVirtualName1,
			/*addDoorplateno : searchVirtualDoorplateno1,*/
		}, function(data) {
			if (data.code<0) {
				sourcePage(0, 0, 5);
				$('#chosecustomerTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				if (page == 1 && type == 0) {
					sourcePage(data.body[0].totalNum, page, 5);
				}
				$("#chosecustomerTable").datagrid("loadData", data.body);
			}
		}, "json");
	}
}
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
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
					choseHouseData(p, 1);
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
					choseHouseData(p, 1);
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
					choseHouseData(p, 1);
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
					choseHouseData(p, 1);
				}
			}
		});
	}
	if (type == 5) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseCostomerPage").remove();
		$("#choseCustomerPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseCostomerPage' style='text-align:center;'></div>");
		$("#choseCostomerPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					choseHouseData(p, 1);
				}
			}
		});
	}
	if (type == 6) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseCostomerPage").remove();
		$("#choseCustomerPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseCostomerPage' style='text-align:center;'></div>");
		$("#choseCostomerPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					choseHouseData(p, 1);
				}
			}
		});
	}
}
//条件查找联动
function queryAddCity(type) {
	if(type==0){
			queryEvent(_pageNum[0], 0);
			return;
	}else if(type==1){
			choseHouseData(1, 0);
			return;
	}
}
/*function queryAddCity(type) {
	var cityText = '';
	if(type==0){
		$("#searchDistrict").empty();
		$("#searchZone").empty();
		$("#searchDistrict").append("<option></option>");
		cityText = $("#searchCity").find("option:selected").text();
		if (cityText == '') {
			queryEvent(_pageNum[0], 0);
			return;
		}
	}else if(type==1){
		$("#searchAddDistrict").empty();
		$("#searchAddZone").empty();
		$("#searchAddDistrict").append("<option></option>");
		cityText = $("#searchAddCity").find("option:selected").text();
		if (cityText == '') {
			choseHouseData(1, 0);
			return;
		}
	}
	
	
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		if(type==0){
			for (var i in data) {
				$("#searchDistrict").append(
						"<option value = '" + i + "'>" + data[i] + "</option>");
			}
			queryEvent(_pageNum[0],0);
		}else if(type==1){
			for (var i in data) {
				$("#searchAddDistrict").append(
						"<option value = '" + i + "'>" + data[i] + "</option>");
			}
			choseHouseData(1, 0);
		}
	});
}*/


/*function queryAddDistrict() {
	$("#searchAddZone").empty();
	$("#searchAddZone").append("<option></option>");
	var cityText = $("#searchAddCity").find("option:selected").text();
	var districtText = $("#searchAddDistrict").find("option:selected").text();
	if (districtText == '') {
		choseHouseData(1, 0);
		return;
	}
	
	
		choseHouseData(1, 0);
}*/


//审批查看窗口
function seeEvent(eaId){
	var row = $("#eventDg").datagrid("getSelected");
	if (eaId != undefined) {
		var rows = $("#eventDg").datagrid("getRows");
		for (var i in rows) {
			if (rows[i].eaId == eaId) {
				row = rows[i];
			}
		}
	}
	//将信息映射到表格中
	for (var i in row) {
		$('#seeEventDlg table.eventInfo .' + i).html(row[i]);
	}
	//按钮显示/隐藏
	if(row.eaEventState == "处理中" && row.eaEventHandler == _loginUserId){
		$("#openHandleBtn").show();
		if (row.eaAmountInvolved !=0 && row.eaWhetherGenerateRecord == '否') {
			$('#account').show();
		} else {
			$('#account').hide();
		}
	}else{
		$("#openHandleBtn").hide();
		$('#account').hide();
	}
	//付款信息表格显示/隐藏
	if (row.eaWhetherGenerateRecord == '是') {
		$('.payInfo').show();
	} else {
		$('.payInfo').hide();
	}
	//收款账户显示/隐藏
	if (row.eaBankName == '' && row.eaBankUsername == '' && row.eaBankAccountNumber == '') {
		$('.shoukuanzhanghu').hide();
	} else {
		$('.shoukuanzhanghu').show();
	}
	//赋值
	$("#eaId").val(row.eaId);
	$("#handlerId").val(_loginUserId);
	$("#handlerName").val(_loginUserName);
	if(row.eaHomeType != "其他审批"){
		$(".houseAddress").html(row.detailAddress);
	}else{
		if(row.eaHomeType == "客戶审批"){
			$(".houseAddress").html(row.cocContacts);
		}else{
			$(".houseAddress").html(row.keyAdministrator);
		}
	}
	$("#rentId").val(row.eaRentId);
	$("#storeId").val(row.eaStoreId);
	$("#houseId").val(row.eaHouseId);
	$('#eaApprovalNumber1').html(row.eaApprovalNumber);
	$(".eaAmountInvolved2").html(convertCurrency(row.eaAmountInvolved));
	var eaId = $("#eaId").val();
	$.post("../selectEventApprovalById.action",{
		eaId : eaId
	},function(data){
		data=data.body[0];
		var imgNum = data.eaImgNum;
		var img = imgNum.split("/")[0];
		var file = imgNum.split("/")[1];
		$(".attachmentNumHandle").html("（图片：" + img + "张    文件：" + file + "个）");
		$('#addCity').val(data.addCity);
		$('#addCommunity').val(data.addCommunity);
	});
	if (row.eaFinancialCoding != '') {
		$.post("../queryFinancialCommon.action",{
			jfFinancialCoding : row.eaFinancialCoding,
		},function(data){
			data=data.body[0];
			for (var i in data) {
				$('#seeEventDlg table.payInfo .' + i).html(data[i]);
			}
		});
	}
	$("#seeEventDlg").dialog({
		title : "查看 " + row.eaEventType +" 审批单",
		top : getTop(500),
		left : getLeft(650),
		width : 650,
		height : 530,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#seeEventDlg [notes="notes"]').val('');
		}
	});
	$("#seeEventDlg").dialog('open');
	if ($('#showProcessTable').hasClass('datagrid-f')) {

	} else {
		$('#showProcessTable').datagrid({
			columns : [ [
				{
					field : 'node',
					title : '审批节点',
					width : 15,
					align : 'center'
				},
				{
					field : 'name',
					title : '审批人',
					width : 15,
					align : 'center'
				},
				{
					field : 'advise',
					title : '审批意见',
					width : 45,
					align : 'center'
				},
				{
					field : 'time',
					title : '审批时间',
					width : 25,
					align : 'center'
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
				var row = $('#showProcessTable').datagrid('getSelected');
				showHandleInfo(row);
			}
		});
	}
	queryEventProcess(row);
}
//查审批流程记录
function queryEventProcess(row) {
	$('#showProcessTable').datagrid({
		data : [],
	});
	if(row.eaTreatmentOpinion != null && row.eaTreatmentOpinion != ""){	
		var data = eval('(' + '[' +  row.eaTreatmentOpinion.getRealJsonStr().replace(/\n/g, "&nbsp;&nbsp;&nbsp;&nbsp;") + ']' + ')');
		var inData = "";
		if(data.length == 1){
			$('#showProcessTable').datagrid({
				data : data,
			});
		}else{
			for(var i=data.length-1;i>=0;i--){
				if(i==data.length-1){
					inData += JSON.stringify(data[i]);
				}else{
					inData += ","+JSON.stringify(data[i]);
				}
			}
			inData = eval('(' + "[" + inData + "]" + ')');
			$('#showProcessTable').datagrid({
				data : inData,
			});
		}
	}else{
		$('#showProcessTable').datagrid({
			data : [],
		});
	}
}
//审批
function openHandleAdvise(type){
	var row = $("#eventDg").datagrid("getSelected");
	if(type ==1){//处理窗口
		$(".errMsg2").text("");
		$("#eventStateDiv").show();
		$("#choseEventState").val("处理中");
		$("#choseNextHandle").show();
		$("#handleAdvise").val("");
		$("#isRemind").show();
		$("#shorMessageRemind2").prop("checked",false);
		$('#tixingshui').html('下一步审批人');
		$('#choseEaAmountInvolved').val(row.eaAmountInvolved);
		$("#handleAdviseDlg").dialog({
			title : "处理意见",
			top : getTop(320),
			left : getLeft(510),
			width : 510,
			height : 320,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#handleAdviseDlg [clear="clear"]').val('');
			}
		});
	}else if(type == 2){//跟进窗口
		$(".errMsg2").text("");
		$("#eventStateDiv").hide();
		$("#choseEventState").val("处理中");
		$("#choseNextHandle").hide();
		$("#handleAdvise").val("");
		$("#isRemind").hide();
		$("#shorMessageRemind2").prop("checked",false);
		$("#doNextEventGetUserId").val(_loginUserId);
		$("#handleAdviseDlg").dialog({
			title : "跟进意见",
			top : getTop(250),
			left : getLeft(510),
			width : 510,
			height : 350,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#handleAdviseDlg [notes="notes"]').val('');
			}
		});
	}
	$("#handleAdviseDlg").dialog('open');
}
//提交审批
function handleAdviseSave(){
	var row = $("#eventDg").datagrid("getSelected");
	var choseEaAmountInvolved = $("#choseEaAmountInvolved").val();
	//处理时间
	var handleTime = getNowFormatDate();
	//处理人
	var handlerId = _loginUserId;
	var handlerName = _loginUserName;
	//处理意见
	var handleAdvise = $("#handleAdvise").val();
	handleAdvise = handleAdvise.replace(/\n/g, "&nbsp;&nbsp;").replace(/"/g, "`").replace(/\\/g, "\\\\");
	if(choseEaAmountInvolved != row.eaAmountInvolved){
		handleAdvise = _loginUserName+' 修改了金额：'+row.eaAmountInvolved+'元 →'+choseEaAmountInvolved+'元， '+handleAdvise;
	}
	//审批状态
	var choseEventState = $("#choseEventState").val();
	//下一步处理人
	var nextHandler = $("#doNextEventGetUserId").val();
	//历史处理人(新增的部分)
	var historicalProcess = _loginUserId;
	//历史处理意见(新增的部分)
	var treatmentOpinion = 
			'{"name":"' + handlerName + '",'
			+ '"id":"' + handlerId + '",'
			+ '"advise":"' + handleAdvise + '",'
			+ '"time":"' + handleTime + '"}';
	//完成时间
	var completionTime = "";
	if(choseEventState == "已完成"){
		completionTime = handleTime;
	}
	if(choseEventState == ""){
		$(".errMsg2").text("请选择审批状态");
		return;
	}
	if(choseEventState == "处理中" && nextHandler == ""){
		$(".errMsg2").text("请选择处理人");
		return;
	}
	if(choseEventState != "已作废" && handleAdvise == ""){
		$(".errMsg2").text("请填写处理意见");
		return;
	}
	$.post("../handleEvent.action", {
		eaId                : row.eaId,
		eaEventState        : choseEventState,
		eaEventHandler      : nextHandler,
		eaHistoricalProcess : historicalProcess,
		eaTreatmentOpinion  : treatmentOpinion,
		eaCompletionTime    : completionTime,
		eaAmountInvolved    : choseEaAmountInvolved,
	}, function(data) {
		if(data.code<0){
			myTips("处理失败！","error");
		}else{
			handleSendMessage();
			myTips("处理成功！","success");
		}
	});
}
//改变审批状态时触发
function changeEventState(){
	var eventState = $("#choseEventState").find("option:selected").text();
	if(eventState == "处理中"){
		$("#choseNextHandle").show();
		$('#tixingshui').html('下一步审批人');
	}else{
		$("#choseNextHandle").hide();
		$('#tixingshui').html('发布人');
	}
}
//付款
function generateRecord(){
	var row = $("#eventDg").datagrid("getSelected");
	var money = row.eaAmountInvolved;
	if(money == 0){
		myTips('金额为零，无法生成收支！', 'error');
		return;
	}
	if (row.eaWhetherGenerateRecord == '是') {
		myTips('已付款，不可再次付款');
		return;
	}
	$("#addFinancialDlg").dialog({
		title : '新增收支',
		top : getTop(300),
		left : getLeft(700),
		width : 700,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addFinancialDlg input").val("");
			$("#addFinancialDlg select").val("");
			$("#addFinancialDlg textarea").val("");
			$(".add_financial_belongType").empty();
		}
	});
	var thingsType = row.eaHomeType;
	$(".add_financial_money").val(row.eaAmountInvolved);
	$(".add_financial_nums").val($('#eaApprovalNumber1').html());
	if(thingsType == '已租审批'){
		$(".addFinancialHouseRentId").val($("#rentId").val());
		$(".addFinancialHouseStoreId").val($("#storeId").val());
		$(".addFinancialHouseId").val($("#houseId").val());		
		$('#addFinancialBelongAddress').val(""+row.addCommunity + row.addBuilding + row.addDoorplateno);
		var hrId = $("#rentId").val();
		$('.add_houseCoding').val(hrId);
		$(".add_houseCodingType").val('已租');
		$.post("../queryHouseRentCommon.action", {
			hrId : hrId
		}, function(data) {
			data=data.body;
			if(data.length != 0){
				var RenterId = data[0].hrRenterId;
				var LandlordId = data[0].hrLandlordId;
				$(".add_financial_belongType").append("<option value='"+RenterId+"'>租客</option>");
				$(".add_financial_belongType").append("<option value='"+LandlordId+"'>业主</option>");
				$(".addFinancialRenterId").val(RenterId);
				$(".addFinancialLandlordId").val(LandlordId);
				var belongType = $('.add_financial_belongType').find("option:selected").text();
				if(belongType == '租客'){
					$(".add_financial_belongName").val(data[0].renterPopName);
					$(".add_financial_belongId").val(RenterId);
				}else if(belongType == '业主'){
					$.post("../selectlandlordName.action",{
						landlordId : LandlordId
					},function(data) {
						data=data.body;
						$(".add_financial_belongName").val(data[0].laPopName);
						$(".add_financial_belongId").val(LandlordId);
					});
				}	
			}		
		}, "json");
	}else if(thingsType == '未租审批'){
		$(".addFinancialHouseStoreId").val($("#storeId").val());
		$(".addFinancialHouseId").val($("#houseId").val());	
		$('#addFinancialBelongAddress').val(""+row.addCommunity + row.addBuilding + row.addDoorplateno);
		var hsId = $('#storeId').val();
		$('.add_houseCoding').val(hsId);
		$(".add_houseCodingType").val('未租');
		$.post("../queryHouseStoreCommon.action", {
			hsId : hsId
		}, function(data) {
			if(data.code>0){
				data=data.body;
				var LandlordId = data[0].hsLandlordId;
				$(".add_financial_belongType").append("<option value='"+LandlordId+"'>业主</option>");
				$(".addFinancialLandlordId").val(LandlordId);
				var belongType = $('.add_financial_belongType').find("option:selected").text();
				if(belongType == '业主'){
					$(".add_financial_belongName").val(data[0].laPopName);
					$(".add_financial_belongId").val(LandlordId);
				}	
			}		
		}, "json");
	}else if(thingsType == '其他审批'){
		$(".addFinancialHouseId").val($("#houseId").val());
		var houseCoding = $('#houseId').val();
		$('.add_houseCoding').val(houseCoding);
		$.post("../queryVirtualFinancial.action", {
			houseCoding : houseCoding,
		}, function(data) {
			if(data.code>0){	
				$(".add_houseCodingType").val('其他类');
				$("#addFinancialBelongAddress").val("联系人:" + data.body[0].keyNumber + "  电话:" + data.body[0].houseEntrust4rent);
				$(".add_financial_belongType").append("<option value=''>其他类</option>");
				$(".add_financial_belongName").val(data.body[0].keyAdministrator);
			}				
		}, "json");
	}else if(thingsType == '盘源审批'){
		myTips("盘源审批，不能生成账单！", "error");
		return;
	}else{
		myTips("未识别的归属房屋类型", "error");
		return;
	}
	$('.add_financial_doTime').val(formatTime(getNowFormatDate(), 2));
//	$('.add_financial_money').val($('.amountInvolved').val());
	$("#addFinancialDlg").dialog('open');	
}
//执行付款
function doAddFinancial(type){
	var row = $("#eventDg").datagrid("getSelected");
	if($('.add_financial_money').val()=='' || $('.add_financial_money').val()==0){
		myTips("金额不能为空或者0！", "error");
		return;
	}
	if (row.eaWhetherGenerateRecord == '是') {
		myTips('已付款，不可再次付款');
		return;
	}
	var jfFinanNote = '"jfFinanNote":"' + row.eaEventType + '审批生成收支，申请内容：' + row.eaEventContent.replace(/[\r\n]/g,"") + 
					";付款账户："+row.eaBankName + ' - ' +row.eaBankUsername + ' - ' + row.eaBankAccountNumber + 
					';'+ $('.add_financial_note').val() + '"';
	var jfTicketNumber = '"jfTicketNumber":"' + $('.add_financial_nums').val() + '"';
	var jfSumMoney = '"jfSumMoney":"' + $('.add_financial_money').val() + '"'; 
	var jfClosedWay = '"jfClosedWay":"' + $('.add_financial_way').find("option:selected").text() + '"';
	var jfAccountingSpecies = '"jfAccountingSpecies":"' + $('#financilAddJfAccountingSpecies').val() + '"'; 
	var jfNatureOfThe = '"jfNatureOfThe":"' + $('#financilAddJfNatureOfThe').val() + '"';
	var jfBigType = '"jfBigType":"' + $('#financilAddJfBigType').val() + '"';
	var jfStartCycle = '"jfStartCycle":"' + $('#add_financial_belongBegin').val() + '"';
	var jfEndCycle = '"jfEndCycle":"' + $('#add_financial_belongEnd').val() + '"';
	var jfPayType = '"jfPayType":"' + $('#setFinancialPayType').val() + '"';  
	var jfAccountId = '"jfAccountId":"' + $('.add_financial_bankNums').val() + '"';
	var jfAccountingWhy = '"jfAccountingWhy":"' +$('#addFinancialBelongAddress').val() + '"';
	var jfTheCashierPeople = '"jfTheCashierPeople":"' + _loginUserId + '"';  
	var jfTicketNumber = '"jfTicketNumber":"' + $('.add_financial_nums').val() + '"'; 	
	var jfOperationRecords = '"jfOperationRecords":"' + getNowFormatDate()+ ',添加收支记录"';
	var jfBelongingToTheName = '"jfBelongingToTheName":"' + $('.add_financial_belongName').val() + '"'; 
	var jfHouse4rentId = '"jfHouse4rentId":"' + $('.addFinancialHouseRentId').val() + '"'; 
	var jfHouse4storeId = '"jfHouse4storeId":"' + $('.addFinancialHouseStoreId').val() + '"'; 
	var jfHouseId = '"jfHouseId":"' + $('.addFinancialHouseId').val() + '"'; 
	var jfRenterId = '"jfRenterId":"' + $('.addFinancialRenterId').val() + '"'; 
	var jfLandlordId = '"jfLandlordId":"' + $('.addFinancialLandlordId').val() + '"'; 
	var jfBillingDate = '"jfBillingDate":"' + $('.add_financial_doTime').val() + '"'; 
	var jfHandlers = '"jfHandlers":"' + $('#addFinancialGetUserId').val() + '"';
	var jfTheOwnershipType = '"jfTheOwnershipType":"' + $('.add_financial_belongType').find("option:selected").text() + '"'; 
	var coding = formatTime(getNowFormatDate(), 3) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
	var jfFinancialCoding = '"jfFinancialCoding":"' + coding + '"';
	var storefront = '"storefront":"'+ _loginStore + '"';
	var department = '"department":"'+ _loginDepartment + '"';
	var relationBelongType = $(".add_financial_belongType").find('option:selected').text();
	var relationBelong = $(".add_houseCoding").val();
	var relationBelongName = $(".add_financial_belongName").val();
	var relationBelongId = $(".add_financial_belongId").val();
	if (relationBelongType == '' || relationBelong == ''
			|| relationBelongName == '' || ((relationBelongType =='租客'|| relationBelongType == '业主' )&&relationBelongId == '')) {
		myTips('收支归属信息不完整！请完善后再进行保存！', "error");
		return;
	}
	if ( $('#financilAddJfNatureOfThe').val() == '' || $('#financilAddJfBigType').val() == '' || $('#financilAddJfAccountingSpecies').val() == '' ||
			$('.add_financial_money').val() == '' || $('.add_financial_nums').val() == '' ||
			$('.add_financial_way').find("option:selected").text() == '' ||jfPayType=='') {
		myTips('有必填项没有输入，请输入!', 'error');
		return;
	}	 	
	var strArray = jfFinanNote + "," + jfTicketNumber + ","
	+ jfSumMoney + "," + jfClosedWay + "," + jfAccountingSpecies + "," + jfBigType + "," + jfNatureOfThe + "," + jfStartCycle + "," + jfEndCycle + ","
	+ jfAccountId + "," + jfAccountingWhy + "," + jfTheCashierPeople + "," + jfOperationRecords + "," + jfBelongingToTheName+","
	+ jfHouse4rentId + "," + jfHouse4storeId + "," + jfHouseId+"," + jfRenterId + "," + jfLandlordId + "," + jfBillingDate + "," + jfHandlers + ","
	+ jfTheOwnershipType + "," + jfFinancialCoding + "," + storefront + ","+department+ ","+ jfPayType;
	var jsonStrArry = "[{" + strArray + "}]";
	showLoading();
	$.post("../insertFinancialAll.action", {
		jsonArray : jsonStrArry
	}, function(data) {
		hideLoading();
		if(data.code < 0){
			myTips(data.msg, 'error');
			$('.do_overDiv').hide();
		}else{
			//修改审批收支相关信息
			$.post("../updateEventApproval.action", {
				eaId: row.eaId,
				eaWhetherGenerateRecord: '是',
				eaFinancialCoding: coding,
			}, function(data) {
				if(data.code < 0){
					myTips(data.msg, 'error');
					$('.do_overDiv').hide();
				}else{
					if (type == 1) {//自动审批
						//处理时间
						var handleTime = getNowFormatDate();
						//处理人
						var handlerId = _loginUserId;
						var handlerName = _loginUserName;
						//处理意见
						var handleAdvise = '已付款，审批完成';
						handleAdvise = handleAdvise.replace(/\n/g, "&nbsp;&nbsp;").replace(/"/g, "`").replace(/\\/g, "\\\\");
						//历史处理人(新增的部分)
						var historicalProcess = _loginUserId;
						//历史处理意见(新增的部分)
						var treatmentOpinion = 
							'{"name":"' + handlerName + '",'
							+ '"id":"' + handlerId + '",'
							+ '"advise":"' + handleAdvise + '",'
							+ '"time":"' + handleTime + '"}';
						//完成时间
						var completionTime = handleTime;
						$.post("../handleEvent.action", {
							eaId : row.eaId,
							eaEventState : "已完成",
							eaHistoricalProcess : historicalProcess,
							eaTreatmentOpinion : treatmentOpinion,
							eaCompletionTime : completionTime,
						}, function(data) {
							if(data.code<0){
								myTips(data.msg, "error");
							}else{
								myTips("审批完成！","success");
								$('#addFinancialDlg').dialog('close');
								$('#seeEventDlg').dialog('close');
								queryEvent(_pageNum[0], 0);
							}
						});
					} else {
						//付款时间
						var eaPayTime = getNowFormatDate();
						$.post("../handleEvent.action", {
							eaId : row.eaId,
							eaPayTime:eaPayTime
						}, function(data) {
							if(data.code<0){
								myTips(data.msg, "error");
							}else{
								$('#addFinancialDlg').dialog('close');
								$('#seeEventDlg').dialog('close');
								queryEvent(_pageNum[0], 0);
							}
						});
						myTips('账单已生成！', 'success');
						var dataIndex = $("#event_index").val();
						reloadEvent(_pageNum[0],0,dataIndex);
						$('#addFinancialDlg').dialog('close');
					}
				}
			});	
		}
	});	
}

function showHandleInfo(row){
	$('#handleInfo').dialog({
		title : '详细处理信息',
		top : getTop(300),
		left : getLeft(600),
		width : 600,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#handleInfo span').text('');
		},
	});
	for(var i in row){
		if(i == "advise"){
			$('#readHandle_'+i).html(row[i].replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "<br/>"));
		}else{
			$('#readHandle_'+i).html(row[i]);
		}
	}
	$('#handleInfo').dialog('open');
}
//上一条下一条
function laterOrNext(type) {
	var dataIndex = $("#event_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$("#event_index").val(num);
			changeData = $('#eventDg').datagrid('getData').rows[num];
			$('#eventDg').datagrid('selectRow',num); 
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#eventDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#event_index").val(num);
			changeData = $('#eventDg').datagrid('getData').rows[num];
			$('#eventDg').datagrid('selectRow',num);
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
		seeEvent();
	}
}
//审核状态列格式
function formatEaEventStatus(value, row, index) {
	if (row.eaEventState == '处理中') {
		return "<a style='text-decoration:none;color:blue;'>" + row.eaEventState + "<a>";
	} else if (row.eaEventState == '已完成' || row.eaEventState == '已作废'){
		return "<a style='text-decoration:none;color:gray;'>" + row.eaEventState + "<a>";
	} else {
		return row.eaEventState;
	}
}
function belongTypeChange(){
	$(".add_financial_belongName").val('');
	$(".add_financial_belongId").val('');
	var belongType = $('.add_financial_belongType').find("option:selected").text();
	var belongTypeId = $('.add_financial_belongType').val();
	if(belongType=='租客'){
		$.post("../selectHouseRentName.action", {
			renterId : belongTypeId,
		}, function(data) {
			data=data.body;
			$(".add_financial_belongName").val(data[0].renterPopName);
			$(".add_financial_belongId").val(belongTypeId);
		});
	}else if(belongType=='业主'){
		$.post("../selectlandlordName.action",{
			landlordId : belongTypeId
		},function(data) {
			data=data.body;
			$(".add_financial_belongName").val(data[0].laPopName);
			$(".add_financial_belongId").val(belongTypeId);
		});
	}
	
}
//到期时间根据开始时间及合同期限改变而改变
function changeDate() {
	if ($("#add_financial_belongBegin").val() != '') {
		var beginDate = new Date($("#add_financial_belongBegin").val());
		beginDate.setMonth(beginDate.getMonth() + 1);
		beginDate.setDate(beginDate.getDate() - 1);
		$("#add_financial_belongEnd").val(formatDate(beginDate));
	}
}
//部门用户联动（1）
function deptStaffChose(deptId, staffId, selectId) {
	var deptment = $('#' + deptId).val();
	if (deptment == '') {
		$('#' + staffId).empty();
		$('#' + staffId).append("<option></option>");
		if(deptId=="searchPublisherDept" || deptId=="searchHandlerDept"){
			queryEvent(_pageNum[0], 0);
		}
		return;
	}
	$.post("../queryUserByDepartmentID.action", {
		suDepartmentId : deptment
	}, function(data) {
		if (data.code < 0) {
//			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		_deptStaff = [ {
			"deptment" : deptment,
			"staff" : data
		} ];
		theStoreStaff(deptId, staffId, selectId);
		if(deptId=="searchPublisherDept" || deptId=="searchHandlerDept"){
			queryEvent(_pageNum[0], 0);
		}
	});
}
// 部门用户联动（2）
function theStoreStaff(deptId, staffId, selectId) {
	var code = $("#" + deptId).val();
	var jsonData = _deptStaff[0].staff;
	var selC = $("#" + staffId);
	selC.empty();
	if (jsonData != null) {
		selC.append("<option></option>");
		for (var i = 0; i < jsonData.length; i++) {
			var item = jsonData[i];
			selC.append("<option value = '" + item.userId + "'>"
					+ item.suStaffName + "</option>");
		}
		if (selectId != 0) {
			selC.val(selectId);
		}
	} else {
		selC.empty();
		queryEvent(_pageNum[0], 0);
	}
}
//账户类型和账号联动
function changeWay(type) {
	if(type==0){
		var faPaymentType = $("#searchWay").find("option:selected").text();
		$("#searchAccountName").empty();
		$("#searchAccountName").append("<option></option>");
		if(faPaymentType == ""){
			return;
		}
		$.post("../selectNamePublic.action", {
			faPaymentType:faPaymentType,
		}, function(data) {
			for (var i in data.body) {
				$("#searchAccountName").append(
						"<option value='" +  data.body[i].faId + "'>" + data.body[i].faUserName + "</option>");
			}
		});
	}else{
		var faPaymentType = $(".add_financial_way").find("option:selected").text();
		$(".add_financial_bankNums").val('');
		$(".add_financial_accountNums").val('');
		$(".add_financial_accountBelong").val('');
		$(".add_financial_accountName").empty();
		$(".add_financial_accountName").append("<option></option>");
		if(faPaymentType == ""){
			return;
		}
		$.post("../selectFinancialAccountInFinancial.action", {
			startNum : 0,
			endNum : 1000,
			faPaymentType:faPaymentType,
		}, function(data) {
			$(".add_financial_accountName").empty();
			$(".add_financial_accountName").append("<option></option>");
			for (var i in data.body) {
				$(".add_financial_accountName").append(
						"<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
			}
		});
	}
}
function getAccountId() {
	if($(".add_financial_accountName").val()==''){
		$(".add_financial_bankNums").val("");
		$(".add_financial_accountBelong").val("");
		$(".add_financial_accountNums").val("");
	}else{
		$(".add_financial_bankNums").val($(".add_financial_accountName").val().split("*#*")[0]);
		$(".add_financial_accountBelong").val($(".add_financial_accountName").val().split("*#*")[1]);
		$(".add_financial_accountNums").val($(".add_financial_accountName").val().split("*#*")[2]);
	}
}
//收支性质与收支种类联动
function financialLink(stateId,typeId) {
	var state = $("#"+stateId).find("option:selected").text();
	var type = _financial.get;
	if (state == '支出') {
		type = _financial.pay;
	}else if (state == '结余') {
		type = _financial.other;
	}
	$("#"+typeId).empty();
	if (state == '') {
		$("#"+typeId).empty();
	}else{
		for (var i in type) {
			if(state == '结余'){
				if(i==0){
					$("#"+typeId).append(
							"<option></option>");
				}
				if(stateId=='searchJfNatureOfThe'){
					$("#"+typeId).append(
							"<option value = '" + i + "'>" + type[i] + "</option>");
				}else{
					if(i==2||i==3){
						$("#"+typeId).append(
								"<option value = '" + i + "'>" + type[i] + "</option>");
					}
				}
			}else{
				if(i==0){
					$("#"+typeId).append(
							"<option></option>");
				}
				$("#"+typeId).append(
						"<option value = '" + i + "'>" + type[i] + "</option>");
			}
		}
	}

}
//获取收支大分类 押金类等
function getFinancialBigType(smallId,bigId){
	var financialBigType = 1;
	var smallType = $("#"+smallId).find('option:selected').text();;
	if(smallType==''){
		$("#"+bigId).val('');
	}else if(smallType.split("-")[0]=="押金类"){
		$("#"+bigId).val('押金类');
	}else if(smallType.split("-")[0]=="能源类"){
		$("#"+bigId).val('能源类');
	}else if(smallType.split("-")[0]=="主营类"){
		$("#"+bigId).val('主营类');
	}else if(smallType.split("-")[0]=="维修类"){
		$("#"+bigId).val('维修类');
	}else if(smallType.split("-")[0]=="违约类"){
		$("#"+bigId).val('违约类');
	}else if(smallType.split("-")[0]=="其他类"){
		$("#"+bigId).val('其他类');
	}else if(smallType.split("-")[0]=="财务类"){
		$("#"+bigId).val('财务类');
	}else if(smallType.split("-")[0]=="薪酬福利类"){
		$("#"+bigId).val('薪酬福利类');
	}else if(smallType.split("-")[0]=="办公成本类"){
		$("#"+bigId).val('办公成本类');
	}else if(smallType.split("-")[0]=="设备采购类"){
		$("#"+bigId).val('设备采购类');
	}else if(smallType.split("-")[0]=="债权类"){
		$("#"+bigId).val('债权类');
	}else if(smallType.split("-")[0]=="债务类"){
		$("#"+bigId).val('债务类');
	}else if(smallType=="结余结算"){
		$("#"+bigId).val('结余');
	}else if(smallType=="欠款结算"){
		$("#"+bigId).val('结余');
	}
}

/***********************************************************处理审批附件上传start****************************************************************/
//电脑上传
function uploadAttachmentHandle(){
	var row = $("#eventDg").datagrid("getSelected");
	$('#uploadDlg').dialog({
		title : '上传图片',
		top : $(document).scrollTop() + ($(window).height() - 464) * 0.5,
		left : $(document).scrollLeft() + ($(window).width() - 600) * 0.5,
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refreshHandle();
		}
	});
	creatQrHandle();
	$.post("../upload/getUpTokenCallback.action",function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$("#uploadDlg input[clear=true]").val("");
		$("#token").val(token);
		$("#co").val(co);
		$("#eaId").val(row.eaId);
		$("#handlerId").val(_loginUserId);
		$("#handlerName").val(_loginUserName);
		initUploader();
		$('#uploadDlg').dialog('open');
	});
}
//手机上传
function creatQrHandle(){
	$.post("../upload/getMobUploadUrl.action",{
		eaId : $("#eaId").val(),
		handlerId : $("#handlerId").val(),
		handlerName : $("#handlerName").val(),
	},function(data){
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
	});
}

//查看图片
function showAttachmentHandle(type) {
	doCancelHandle();
	initAttachmentDlgHandle(type)
}

//删除图片
function removeAttachmentHandle(){
	var photos = $('.attachmentHandle');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePictureHandle').html('请选择要删除的图片').show();
		$('.picturecheckHandle').show();
		$('#doRemovePicHandle').show();
	}
}
//执行删除图片
function doRemoveHandle(){
	var arr = 0;
	var path = '';
	var name = '';
	var chk = $('.picturecheckHandle');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapperHandle input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			name += $(this).parent().children("img").attr('title') + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapperHandle input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			name += $(this).parent().children("a").html() + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		name = name.substring(0,name.length-1);
		$.post("../deleteEventApprovalPic.action",{
			eaId : $("#eaId").val(),
			eaImgPath : path
		}, function(data) {
			if (data <0 || data=='') {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				showPictureHandle();
			}
		});
		var row = $("#eventDg").datagrid("getSelected");
		//处理时间
		var handleTime = getNowFormatDate();
		//处理人
		var handlerId = _loginUserId;
		var handlerName = _loginUserName;
		//处理意见
		var handleAdvise = '删除了文件《'+name+'》';
		//历史处理人(新增的部分)
		var historicalProcess = _loginUserId;
		//历史处理意见(新增的部分)
		var treatmentOpinion = 
			'{"name":"' + handlerName + '",'
			+ '"id":"' + handlerId + '",'
			+ '"advise":"' + handleAdvise + '",'
			+ '"time":"' + handleTime + '"}';
		$.post("../handleEvent.action", {
			eaId : row.eaId,
			eaHistoricalProcess : historicalProcess,
			eaTreatmentOpinion : treatmentOpinion,
		}, function(data) {});
		doCancelHandle();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
//取消删除图片
function doCancelHandle(){
	$('#removePictureHandle').hide();
	$('.picturecheckHandle').hide().removeAttr('checked');
	$('#doRemovePicHandle').hide();
}
//初始化附件窗口
function initAttachmentDlgHandle(type){
	$('#attachmentDlgHandle').dialog({
		title : '附件',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapperHandle").empty();
			if(type == 0){//详情窗口上传后可以看到最新的上传跟进，审批、付款中上传后直接关闭详情窗口，不需要同步
				var dataIndex = $("#event_index").val();
				reloadEvent(_pageNum[0],0,dataIndex);
			}
		},
	});
	showPictureHandle();
}
//显示图片
function showPictureHandle() {
	$("#imgWrapperHandle").empty();
	$('#attachmentDlgHandle').dialog('open');
	var eaId = $("#eaId").val();
	$.post("../selectEventApprovalById.action",{
		eaId : eaId
	}, function(data) {
		if (data.code<0) {
			$('#imageNumHandle').html("（图片：0张    文件：0个）");
			$(".attachmentNumHandle").html("（图片：0张    文件：0个）");
			return;
		}
		data=data.body[0];
		var path = data.eaImgPath.getRealJsonStr();
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
						$('#imgWrapperHandle').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#imgWrapperHandle .fileList').append('<li>' +
						'<input name="other" class="picturecheckHandle" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+newUrls[i]+'" class="attachmentHandle" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
						'</li>');
					fileNum++;
				}
			}
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				var j = parseInt(i) + parseInt(img.length);
				if(ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png"){
					if(imgNum == 0){
						$('#imgWrapperHandle').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#imgWrapperHandle .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="attachmentImg attachmentHandle" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="picturecheckHandle" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#imageNumHandle').html("（图片：" + imgNum + "张    文件：" + fileNum + "个）");
			$(".attachmentNumHandle").html("（图片：" + imgNum + "张    文件：" + fileNum + "个）");
			$(".attachmentImg").colorbox({
				rel : 'attachmentImg',
				transition : "none",
				width : "60%",
				height : "90%"
			});
		});
	}); 
}
//刷新
function refreshHandle(){
	doCancelHandle();
	showPictureHandle();
}
/***********************************************************处理审批附件上传end****************************************************************/

//刷新列表，再打开详细信息窗口，更新处理意见列表
function reloadEvent(page, type, index){
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var eventState = $("#searchEventState").find("option:selected").text();
	var eventType = $("#searchEventType").find("option:selected").text();
	var publisher = $("#searchPublisherGetUserId").val();
	var handler = $("#searchHandlerGetUserId").val();
	var startTime = $("#searchStartTime").val();
	var endTime = $("#searchEndTime").val();
	var addCity = $("#searchCity").find("option:selected").text();
	var addDistrict = $("#searchDistrict").find("option:selected").text();
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#searchBuilding").val();
	var addDoorplateno = $("#searchDoorplateno").val();
	var eaHomeType = $("#searcheaHomeType").val();
	var eaEventContent = $("#searcheaEventContent").val();
	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime = formatDate(endTime);
	$.post("../selectEvent.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		eaEventState 		: eventState,
		eaEventType 		: eventType,
		eaEventPublisher 	: publisher,
		eaEventHandler 		: handler,
		startTime 			: startTime,
		endTime 			: endTime,
		addCity 			: addCity,
		addDistrict 		: addDistrict,
		addCommunity 		: addCommunity,
		addBuilding 		: addBuilding,
		addDoorplateno 		: addDoorplateno,
		eaHomeType			: eaHomeType,
		eaEventContent		: eaEventContent,
		splitFlag			: 1,
	}, function(data) {
		if (data.code<0) {
			$('#eventDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryEvent","event");
			}else{
				notCountPage(page, 0 ,"queryEvent","event");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryEvent","event");
			}else{
				notCountPage(page, 1 , "queryEvent","event");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].totalPage = taskCostTime(data[i].eaReleaseTime,data[i].eaUseTime);
				
				if ((data[i].eaRentId != null && data[i].eaRentId != '')||(data[i].eaStoreId != null && data[i].eaStoreId != '')||(data[i].eaHouseId != null && data[i].eaHouseId != '')) {
					data[i].detailAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
				} else {
					data[i].detailAddress = '';
				}
				if(data[i].eaHomeType == "其他审批" || data[i].eaHomeType == "日常事务" || data[i].eaHomeType == "项目事务"){
					data[i].detailAddress = data[i].keyAdministrator;
				}
				if(data[i].eaHomeType == "客戶审批"){
					data[i].detailAddress = data[i].cocContacts;
				}
			}
			$("#eventDg").datagrid("loadData", data);
			$('#eventDg').datagrid("selectRow",index);
			seeEvent();
		}
	}, "json");
}
//跳转查看房源
function skipToCheckHouse(){
	var row = $('#eventDg').datagrid('getSelected');
	var skipJspName = '';
	var skipJspUrl = '';
	var skipJspIcon = '';
	var skipInputId = ['','',''];
	var skipInputVal = ['','',''];
	if(row.eaHomeType==''){
		myTips("无地址审批无法查看房源！","error");
		return;
	}
	if(row.eaHomeType=='已租审批'){
		skipJspName = '已租房间';
		skipJspUrl = 'fg_sourceInfo';
		skipJspIcon = 'yizuguanli';
		skipInputId[0] = 'sourceCommunity';
		skipInputId[1] = 'sourceBuilding';
		skipInputId[2] = 'sourceDoorplateno';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
	} 
	if(row.eaHomeType=='未租审批'){
		skipJspName = '未租房间';
		skipJspUrl = 'fg_trusteeship';
		skipJspIcon = 'weizuguanli';
		skipInputId[0] = 'searchCommunity';
		skipInputId[1] = 'searchBuilding';
		skipInputId[2] = 'searchDoorplateno';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
	}
	if(row.eaHomeType=='盘源审批'){
		skipJspName = '房源资料';
		skipJspUrl = 'fg_dataHouse';
		skipJspIcon = 'panyuanguanli';
		skipInputId[0] = 'searchCommunity';
		skipInputId[1] = 'searchBuilding';
		skipInputId[2] = 'searchDoorplateno';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
	}
	if(row.eaHomeType=='其他审批'){
		var addCity = row.addCity;
		if(addCity == '项目'){
			skipJspName = '项目';
			skipJspUrl = 'fg_virtual';
			skipJspIcon = 'xiangmuguanli';
		}else if(addCity == '库房'){
			skipJspName = '库房管理';
			skipJspUrl = 'fg_warehouseManagement';
			skipJspIcon = 'haocaiguanli';
		}else if(addCity == '公区'){
			skipJspName = '公区域管理';
			skipJspUrl = 'fg_officeAreaManagement';
			skipJspIcon = 'haocaiguanli';
		}else if(addCity == '供应商'){
			skipJspName = '供应商管理';
			skipJspUrl = 'fg_projectSupplier';
			skipJspIcon = 'gongyingshangguanli';
		}
		skipInputId[0] = 'searchVirtualName';
		skipInputId[1] = 'searchVirtualDoorplateno';
		skipInputId[2] = 'searchVirtualContact';
		skipInputVal[0] = row.keyAdministrator;
		skipInputVal[1] = row.addDoorplateno;
		skipInputVal[2] = '';
	}
	if(row.eaHomeType=='客户事务'){
		skipJspUrl = '';
	}
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[0],
		jsonVal:skipInputVal[0],
	});
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[1],
		jsonVal:skipInputVal[1],
	});
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[2],
		jsonVal:skipInputVal[2],
	});
	window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
}

//生成审批编号
function approvalNumber(){
	var strNumber = '';	
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	var day = myDate.getDate();
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	var rnd="";
    for(var i=0;i<6;i++){
        rnd+=Math.floor(Math.random()*10);
    }
    var yearStr = year.toString().substring(2,4);
	strNumber = yearStr+month+day+rnd;
	return strNumber;
}

//涉及金额时可填写收款账户
function changeMoney(){
	if ($('#amountInvolved').val() != 0) {
		$('#payBankInfo').show();
		$('#accountId').show();
	} else {
		$('#payBankInfo').hide();
		$('#accountId').hide();
	}
}
//获取打印数据
function getPrintData(){
	var row = $('#eventDg').datagrid('getSelected');
	var rows = $('#showProcessTable').datagrid('getRows');
	var json = {};
	json.gongsi = _loginCompanyName;
	json.guishudizhi = $('.houseAddress').html();
	json.shenpileixing = row.eaEventType;
	json.shenpibianhao = $('#eaApprovalNumber1').html();
	json.shenqingren = $('.publisherName').html();
	json.shengqingshijian = $('.eaReleaseTime').html();
	json.shenqingneirong = $('.eaEventContent').html();
	json.shenpi = [];
	for (var i = 0; i < 5; i++) {
		var item = {};
		item.shenpijibie = '-';
		item.shenpiren = '';
		item.shenpiyijian = '';
		item.shenpishijian = '';
		json.shenpi.push(item);
	}
	for (var i in rows) {
		if (i < 5) {
			json.shenpi[i].shenpijibie = rows[i].node;
			json.shenpi[i].shenpiren = rows[i].name;
			json.shenpi[i].shenpiyijian = rows[i].advise;
			json.shenpi[i].shenpishijian = rows[i].time;
		} else {
			var item = {};
			item.shenpijibie = rows[i].node;
			item.shenpiren = rows[i].name;
			item.shenpiyijian = rows[i].advise;
			item.shenpishijian = rows[i].time;
			json.shenpi.push(item);
		}
	}
	if (row.eaAmountInvolved != 0) {//涉及金额
		json.shejijine = $('.eaAmountInvolved').html();
		json.daxieshejijine = convertCurrency($('.eaAmountInvolved').html());
		json.yinhangmingcheng = $('.eaBankName').html();
		json.yinhanghuming = $('.eaBankUsername').html();
		json.yinhangzhanghao = $('.eaBankAccountNumber').html();
		json.yinhangzhihang = $('.eaSubordinateBranch').html();
            json.yinhangbeizhu = $('.eaBankAccountDescription').html();
		json.caozuoren = $('.cashierPeopleName').html();
		json.fukuanjine = $('.jfSumMoney').html();
		json.caiwuliushuihao = $('.jfFinancialCoding').html();
		json.fukuanshijian = $('.jfCheckInTime').html();
		json.fukuanzhanghu = $('.jfClosedWay').html() + ' - ' + $('.faUserName').html() + ' - ' + $('.faBelonging').html() + ' - ' + $('.account').html();
		json = JSON.stringify(json);
	} else {//不涉及金额
		json = JSON.stringify(json);
	}
	return json;
}
//打印审批单
function printPaper(){
	var printArray = getPrintData();
	var row = $('#eventDg').datagrid('getSelected');
	console.log(row);
	if (row.eaAmountInvolved != 0) {//涉及金额
		parent.doPrintInExe(printArray, 8);
	} else {//不涉及金额
		parent.doPrintInExe(printArray, 9);
	}
}
//保存审批单到历史票据打印表
function savePrint(){
	var json = getPrintData();
	var row = $('#eventDg').datagrid('getSelected');
	var jhpHouse4rentId = row.eaRentId;
	var jhpHouse4storeId = row.eaStoreId;
	var jhpHouseId = row.eaHouseId;
	var jhpType = '';
	if (row.eaAmountInvolved != 0) {
		jhpType = '审批单涉及金额';
	} else {
		jhpType = '审批单不涉及金额';
	}
	$.post("../insertHistoryPrint.action",{
		jhpJson 			: json,
		jhpType 			: jhpType,
		jhpTitle			: getNowFormatDate()+ ' ' + jhpType,
		jhpHouse4rentId		: jhpHouse4rentId,
		jhpHouse4storeId	: jhpHouse4storeId,
		jhpHouseId			: jhpHouseId,
		jhpUserId			: _loginUserId,
	}, function(data) {
		
	});	
}
//修改审批
function updateEvent(){
	var row = $("#eventDg").datagrid("getSelected");
	if (!row) {
		myTips('请选择一条记录', 'error');
		return;
	}
	if (row.eaEventState != '处理中') {
		myTips('该审批不可修改', 'error');
		return;
	}
	if (row.eaEventPublisher != _loginUserId || row.eaEventHandler != _loginUserId) {
		myTips('只有申请人可以修改审批，并且申请人在处理状态', 'error');
		return;
	}
	$('#addEventDlg').dialog({
		title : "修改审批",
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
			$('#addEventDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#shorMessageRemind1').prop({checked:false});
			$('#ifSpeed').prop({checked:false});
		}
	});
	//赋值
	$('#addHouseAddress').val(row.detailAddress);
	$('#hrId').val(row.eaRentId);
	$('#hsId').val(row.eaStoreId);
	$('#hpId').val(row.eaHouseId);
	$('#houseHomeType').val(row.eaHomeType);
	$('#eventType').val(row.eaEventType);
	$('#doEventShowUserInfo').val('');
	$('#doEventGetUserStoreId').val('');
	$('#doEventGetUserDetId').val('');
	$('#doEventGetUserId').val('');
	$('#eaApprovalNumber').val(row.eaApprovalNumber);
	$('#amountInvolved').val(row.eaAmountInvolved);
	$('#eaBankName').val(row.eaBankName);
	$('#eaBankUsername').val(row.eaBankUsername);
	$('#eaBankAccountNumber').val(row.eaBankAccountNumber);
	$('#eventDescribe').val(row.eaEventContent);
	$("#shorMessageRemind1").prop("checked", false);
	$('#ifSpeed').prop({checked:false});
	$('#payBankInfo').show();
	$('#fujian').hide();
	$('#doAddEventBtn').hide();
	$('#doUpdateEventBtn').show();
	
	$('#addEventDlg').dialog('open');
}
//执行修改
function doUpdateEvent(){
	var checkFlag = 0;
	$('#addEventDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	var row = $("#eventDg").datagrid("getSelected");
	var rentId = $("#hrId").val();
	var storeId = $("#hsId").val();
	var houseId = $("#hpId").val();
	var houseType = $("#houseHomeType").val();
	var amountInvolved = $("#amountInvolved").val();
	var eventType = $("#eventType").find("option:selected").text();
	var handler = $("#doEventGetUserId").val();
	var eventDescribe = $("#eventDescribe").val();
	var houseAddress = $("#addHouseAddress").val();
	var eaApprovalNumber = $("#eaApprovalNumber").val();
	var eaBankName = $('#eaBankName').val();
	var eaBankUsername = $('#eaBankUsername').val();
	var eaBankAccountNumber = $('#eaBankAccountNumber').val();
    var subordinateTrip = $('#subordinateTrip').val();
    var accountDescription = $('#accountDescription').val();
	if (amountInvolved == 0) {
		eaBankName = '';
		eaBankUsername = '';
		eaBankAccountNumber = '';
	}
	if($('#ifSpeed').prop("checked")){
		eventDescribe = "【优先处理】"+eventDescribe;
	}
	if(amountInvolved != 0 && amountInvolved != '' && (houseAddress == null || houseAddress == '')){
		myTips("涉及金额，请选择审批归属！","error");
		return;
	}
	//处理时间
	var handleTime = getNowFormatDate();
	//处理人
	var handlerId = _loginUserId;
	var handlerName = _loginUserName;
	//处理意见
	var handleAdvise = '修改审批';
	//历史处理人(新增的部分)
	var historicalProcess = _loginUserId;
	//历史处理意见(新增的部分)
	var treatmentOpinion = 
		'{"name":"' + handlerName + '",'
		+ '"id":"' + handlerId + '",'
		+ '"advise":"' + handleAdvise + '",'
		+ '"time":"' + handleTime + '"}';
	showLoading();
	$.post("../handleEvent.action", {
		eaId : row.eaId,
		eaRentId : rentId,
		eaStoreId : storeId,
		eaHouseId : houseId,
		eaEventPublisher : _loginUserId,
		eaEventHandler : handler,
		eaHomeType : houseType,
		eaEventType : eventType,
	    eaEventState : "处理中",
	    eaAmountInvolved : amountInvolved,
	    eaEventContent : eventDescribe,
	    eaApprovalNumber: eaApprovalNumber,
	    eaBankName: eaBankName,
	    eaBankUsername: eaBankUsername,
	    eaBankAccountNumber: eaBankAccountNumber,
        eaSubordinateBranch: subordinateTrip,
        eaBankAccountDescription: accountDescription,
		eaHistoricalProcess : historicalProcess,
		eaTreatmentOpinion : treatmentOpinion,
	}, function(data) {
		hideLoading();
		if (data.code<0) {
			myTips("修改失败！", "error");
			return;
		}
		doSendMessage();
		myTips("修改成功！", "success");
	});
}
function addAccount(){
	$('#bankAccount').dialog({
		title : "银行账号",
		top : getTop(340),
		left : getLeft(640),
		width : 740,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#bankAccount').prop({checked:false});
		}
	});
	$('#bankAccount').dialog('open');
	$('#bankAccountTable').datagrid(
			{
				/*columns : [ [ {
					field : 'csAccountName',
					title : '户名',
					width : 10,
					align : 'center'
				}, {
					field : 'csBank',
					title : '银行',
					width : 10,
					align : 'center'
				}, {
					field : 'csAccountUmber',
					title : '账号',
					width : 10,
					align : 'center'
				} ] ],
				width : '98%',
				height : '84%',*/
				singleSelect : true,
				autoRowHeight : false,
				pageSize : 10,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				onDblClickRow : function(rowIndex, rowData) {
					var row = $('#bankAccountTable').datagrid(
							'getSelected');
					if (row) {
						for (var i in row) {
							if (row[i] == null) {
								row[i] = '';
							}
						}
						$("#eaBankUsername").val(row.csAccountName);
						$("#eaBankName").val(row.csBank);
						$("#eaBankAccountNumber").val(row.csAccountUmber);
						$("#subordinateTrip").val(row.csSubordinateBranch);
						$("#accountDescription").val(row.csAccountDescription);
						
						$('#bankAccount').dialog('close');
						selectAccountReceipt(1,0);
					}
				}
			});
	selectAccountReceipt(1,0);
}
function selectAccountReceipt(page,type){
	var pageNum = 10;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var relation = $('#searchBelongType').val();
	$("#bankAccountTablePageDiv").show();
	$.post("../queryCsAccountReceipt.action",{
		startNum 	   : startNum,
		endNum 		   : endNum,
		splitFlag	   : 1,
		csAccountName  : $('#bankAccount_div1_bank').val(),
		csBank         : $('#bankAccount_div1_user').val(),
	},function(data) {
		
		if (data.code<0) {
			
			$('#bankAccountTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			var totalNum=data.body.length;
			console.log("11111111");
			console.log(totalNum);
			if(data.length<pageNum){
				notCountPage(page, 2 , "selectAccountReceipt","event");
			}else{
				notCountPage(page, 1 , "selectAccountReceipt","event");
			}
			if (page == 1 && type == 0) {
				
			}
			data = data.body;
			/*	totalNum: data[0].totalNum,
			getCountData(1,countJson,pageNum,page,"event",0);*/
			/*if (page == 1 && type == 0) {
				var pageNum = Math.ceil(totalNum / 10);
					
			}*/
			/*$("#accountPage").remove();*/
			$("#bankAccountTable").datagrid("loadData", data);
			eventPage1(totalNum, page);
		}
		
	}, "json");
}
function eventPage1(totalNum, page) {
	var pageNum = Math.ceil(totalNum / 20);
	$("#eventPage").remove();
	$("#bankAccountTablePageDiv").append("<div class='tcdPageCode' id='eventPage' style='text-align:center;'></div>");
	$("#eventPage").createPage({
		onePageNums:20,
		totalNum:totalNum,
		pageCount : pageNum,
		current : 1,
		backFn : function(p) {
			if (p <= pageNum) {
				_pageNum[0] = p;
				selectAccountReceipt(p, 1);
			}
		}
	});
}