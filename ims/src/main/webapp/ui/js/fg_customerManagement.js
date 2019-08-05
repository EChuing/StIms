var contractType='';
function laterOrNext(type) {
	var dataIndex =  $(".customr_index").val();
	var changeData = {};
//	console.log("index="+dataIndex);
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".customr_index").val(num);
			changeData = $('#customerDg').datagrid('getData').rows[num];
			$('#customerDg').datagrid('selectRow',num);
			
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else if(type==1){
		var size = $("#customerDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".customr_index").val(num);
			changeData = $('#customerDg').datagrid('getData').rows[num];
			$('#customerDg').datagrid('selectRow',num);
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

	}
	$('#u2_txt1').val(changeData.cocCompany);
	$('#u5_txt5').val(changeData.cocUsername);
	$('.add_u2_text3_state').html("<option>"+changeData.cocGrade+"</option>");
	$('#u5_txt3').val(changeData.cocRelation);
	$('#u5_txt4').val(changeData.cocRegisterTime);
	$('.add_u3_text2_state').html("<option>"+changeData.cocType+"</option>");
	$('#u2_txt2').val(changeData.cocCompanyAbbreviation);
	$('.add_u1_text1_state').html("<option>"+changeData.cocState+"</option>");
	$('.add_u1_text2_state').html("<option>"+changeData.cocSource+"</option>");
	$('#u1_txt3').val(changeData.cocSuperior);
	$('#u4_txt1').val(changeData.cocAddress);
	$('#u5_txt1').val(changeData.cocNotes);
	$('.add_u3_text3_state').html("<option>"+changeData.cocScale+"</option>");
	var cocFollowUp = changeData.cocFollowUp.getRealJsonStr();
	if(cocFollowUp.length == 0){
		var jsonData = [];
	}else{
		var jsonData = eval('(' + cocFollowUp + ')');
	}
	$("#uuw").datagrid("loadData",jsonData);
	
}
$(function(){
	_contractNumsArry = [];
	advancedScreening(0);
	queryCustomer(1, 0);
	$('#contractManagementTable').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			var row = $('#contractManagementTable').datagrid('getSelected');
			console.log(row);
			selectCustomerImg(row.csContractId);
	}});
	$('#customerDg').datagrid({
		
		onDblClickRow : function(rowIndex, rowData) {
			$("#index").val(rowIndex);
			console.log("1111");
			var row = $('#customerDg').datagrid('getSelected');
			console.log(row);
			if (row) {
				for (var i in row) {
					if (row[i] == null) {
						row[i] = '';
					}
				}}
			
			$(".customr_index").val(rowIndex);
			$('#customerInformation').dialog({
				title : '客户信息列表',
				top : getTop(600),
				left : getLeft(1000),
				width : 800,
				height : 500,
				closed : true,
				cache : false,
				modal : true,
				onClose : function() {
					$("#uuw").datagrid("loadData", []);
				},
			});
			
			$('#customerInformation').dialog('open');
			$('#u2_txt1').val(row.cocCompany);
			$('#u5_txt5').val(row.cocUsername);
			$('.add_u2_text3_state').html("<option>"+row.cocGrade+"</option>");
			$('#u5_txt3').val(row.cocRelation);
			$('#u5_txt4').val(row.cocRegisterTime);
			$('.add_u3_text2_state').html("<option>"+row.cocType+"</option>");
			$('#u2_txt2').val(row.cocCompanyAbbreviation);
			$('.add_u1_text1_state').html("<option>"+row.cocState+"</option>");
			$('.add_u1_text2_state').html("<option>"+row.cocSource+"</option>");
			$('#u1_txt3').val(row.cocSuperior);
			$('#u4_txt1').val(row.address);
			$('#u5_txt1').val(row.cocNotes);
			$('.add_u3_text3_state').html("<option>"+row.cocScale+"</option>");
//			console.log(rowData.cocFollowUp);
			var cocFollowUp = rowData.cocFollowUp.getRealJsonStr();
			if(cocFollowUp.length == 0){
				var jsonData = [];
			}else{
				var jsonData = eval('(' + cocFollowUp + ')');
			}
			$("#uuw").datagrid("loadData",jsonData);
		}
	});
	for (var i in _outsideCustomerContactsPost) {
		$("#contactsPost").append("<option value = '" + i + "'>" + _outsideCustomerContactsPost[i] + "</option>");
		$("#cocContactsPost").append("<option value = '" + _outsideCustomerContactsPost[i] + "'>" + _outsideCustomerContactsPost[i] + "</option>");
	}
	for (var i in _outsideCustomerScale) {
		$("#scale").append("<option value = '" + i + "'>" + _outsideCustomerScale[i] + "</option>");
		$("#cocScale").append("<option value = '" + _outsideCustomerScale[i] + "'>" + _outsideCustomerScale[i] + "</option>");
	}
	for (var i in _outsideCustomerType) {
		$("#type").append("<option value = '" + i + "'>" + _outsideCustomerType[i] + "</option>");
		$("#cocType").append("<option value = '" + _outsideCustomerType[i] + "'>" + _outsideCustomerType[i] + "</option>");
	}
	for (var i in _outsideCustomerSource) {
		$("#source").append("<option value = '" + i + "'>" + _outsideCustomerSource[i] + "</option>");
		$("#cocSource").append("<option value = '" + _outsideCustomerSource[i] + "'>" + _outsideCustomerSource[i] + "</option>");
	}
});

//高级筛选
function advancedScreening(num){
	if(num == 0){
		$('.advancedScreening').css({
			"height" : "25px",
			"width"  : '500px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('#screening').attr('onclick','advancedScreening(1)');
	}else if(num == 1){
		$('.advancedScreening').css({
			"height" : "25px",
			"width"  : '100%',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('#screening').attr('onclick','advancedScreening(0)');
	}
}

//分页统计总条数
function getcustomerPageCount(page){
	var pageSize = 20;
	var cocContacts = $("#searchCustomerName").val();
	var cocPhone = $("#searchCustomerPhone").val();
	var cocUsername = $("#searchRegisterGetUserId").val();
	var cocState = $("#searchCustomerState").val();
	$.post("../queryCustomer.action",{
		cocContacts	:	cocContacts,
		cocPhone	:	cocPhone,
		cocUsername	:	cocUsername,
		cocState	:	cocState,
	},function(data){
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"customer",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"customer",0);
		}
	});
}

function queryCustomer(page, type){
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var cocContacts = $("#searchCustomerName").val();
	var cocPhone = $("#searchCustomerPhone").val();
	var cocUsername = $("#searchRegisterGetUserId").val();
	var cocState = $("#searchCustomerState").val();
	showLoading();
	$.post("../queryCustomer.action",{
		startNum	:	startNum,
		endNum		:	endNum,
		cocContacts	:	cocContacts,
		cocPhone	:	cocPhone,
		cocUsername	:	cocUsername,
		cocState	:	cocState,
	},function(data){
		hideLoading();
		if(data.code < 0){
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryCustomer","customer");
			}else{
				notCountPage(page, 0 ,"queryCustomer","customer");
			}
			$('#customerDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data = data.body;
		for (var i in data) {
			for ( var j in data[i]) {
				if (data[i][j] == null) {
					data[i][j] = '';
				}
			}
			if(data[i].cocAddress.getRealJsonStr().indexOf('{') == -1){
				data[i].address = data[i].cocAddress;
			}else{
				var address = JSON.parse(data[i].cocAddress.getRealJsonStr());
				data[i].address = address.community + address.address;
			}
			if(data[i].cocContacts == null || data[i].cocContacts == "" || data[i].cocPhone == null || data[i].cocPhone == ""){
				data.splice(i,1);
				i--;
				data[0].totalNum--;
			}
		}
		// if (page == 1 && type == 0) {
		// 	_indexNum[0] = 0;
		// 	sourcePage(data[0].totalNum, page, 0);
		// }
		if(data.length<endNum){
			notCountPage(page, 2 , "queryCustomer","customer");
		}else{
			notCountPage(page, 1 , "queryCustomer","customer");
		}
		$("#customerDg").datagrid("loadData",data);
	});
}

//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#customerPage").remove();
		$("#customerPageDiv")
				.append(
						"<div class='tcdPageCode' id='customerPage' style='text-align:center;'></div>");
		$("#customerPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					queryCustomer(p, 1);
				}
			}
		});
	}
	if(type == 1){
		pageNum = Math.ceil(totalNum / 15);
		$("#choseCustomerPage").remove();
		$("#contractManagementTablePageDiv")
				.append(
						"<div class='tcdPageCode' id='choseCustomerPage' style='text-align:center;'></div>");
		$("#choseCustomerPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					queryCustomer(p, 0); 
				}
			}
		});
	}
	
}

function addCustomer(){
	$("#addCustomerDlg").dialog({
		title : '添加客户',
		top : getTop(258),
		left : getLeft(700),
		width : 700,
		height : 280,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addCustomerDlg input").val('');
			$("#addCustomerDlg textarea").val('');
			$("#addCustomerDlg select").val('');
			$("#addCustomerDlg input[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
            $("#addCustomerDlg input[require='require']").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
		}
	});
	$("#relation").val("一般");
	$('#addRegistrationTime').val(formatDate(getNowFormatDate()));
	$("#addCocUsername").val(_loginUserName);
	$("#addipUserId").val(_loginUserId);

	$("#addCustomerDlg").dialog('open');
}

//执行添加客户
function doAddCustomer(){
	var checkFlag = 0;
	$("#addCustomerDlg input[require='require']").each(function(){
		if($(this).val()==''||$(this).val()==null){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag != 0){
		myTips("有必填项未填写!");
		return;
	}
	var cocContacts = $("#addpopName").val();
	var cocPhone = $("#addpopPhone").val();
	var cocContactsPost = $("#contactsPost").find("option:selected").text();
	var cocSource = $("#source").find("option:selected").text();
	var cocCompany = $("#company").val();
	var cocCompanyAbbreviation = $("#abbreviation").val();
	var cocSuperior = $("#superior").val();
	var cocState = $("#addCocState").val();
	var cocGrade = $("#grade").val();
	var cocRelation = $("#relation").val();
	var cocType = $("#type").find("option:selected").text();
	var cocScale = $("#scale").find("option:selected").text();
	var cocFixedTelephone = $("#fixedTelephone").val();
	var cocUrl = $("#url").val();
	var cocEmail = $("#email").val();

	var community = $("#community").val();
	var detailedAddress = $("#detailedAddress").val();
	var cocAddress = {
		address		:	detailedAddress,
		community	:	community
	}
	showLoading();
	$.post("../insertSelectiveCustomer.action",{
		cocContacts		:	cocContacts,
		cocPhone		:	cocPhone,
		cocContactsPost	:	cocContactsPost,
		cocSource		:	cocSource,
		cocCompany		:	cocCompany,
		cocCompanyAbbreviation	:	cocCompanyAbbreviation,
		cocSuperior		:	cocSuperior,
		cocState		:	cocState,
		cocGrade		:	cocGrade,
		cocRelation		:	cocRelation,
		cocType			:	cocType,
		cocScale		:	cocScale,
		cocFixedTelephone	:	cocFixedTelephone,
		cocUrl			:	cocUrl,
		cocEmail		:	cocEmail,
		cocAddress		:	JSON.stringify(cocAddress),
		cocUsername		:	_loginUserId,
	},function(data){
		hideLoading();
		if(data.code < 0){
			myTips(data.msg, 'error');
			return;
		}
		myTips("添加成功！", "success");
		queryCustomer(1, 0);
		$("#addCustomerDlg").dialog('close');
	});
}
//打开进展对话框
function addProgressCustomer() {
	$('#u8Progress').dialog({
		title : '写跟进',
		top : getTop(200),
		left : getLeft(350),
		height : 200,
		width : 350,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#u8Progress input").val('');
			$("#u8Progress textarea").val('');
		}
	});
	$(".add_pro_time").val(getNowFormatDate());
	$("#u8Progress").dialog('open');
}
//执行添加进展
function doAddProgressCustomer() {
	var row = $("#customerDg").datagrid("getRows");
	var index = $("#index").val();

	var proTime = $(".add_pro_time").val();
	var proType = $(".add_u8_text2_state").val();
	var proUserName = _loginUserName;
	var proMark = $(".add_pro_mark").val();
	var json = {
		proTime	:	proTime,
		proType :   proType,
		proUserName	:	proUserName,
		proMark	:	proMark
	};
	var jsonStr = JSON.stringify(json);
	$.post("../addProgressCustomer.action",{
		cocId	:	row[index].cocId,
		csOutsideCustomerJson	:	jsonStr
	},function(data){
		if (proMark == '') {
			myTips("跟进内容为空！", "error");
			return;
		}
		if(data.code<0){
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		myTips("保存成功","success");
		queryCustomer(_pageNum[0], 0);
		$("#uuw").datagrid("appendRow",json);
		$('#u8Progress').dialog('close');
	
	});
}
$(function(){
	advancedScreening(0);
	queryCustomer(1, 0);
	$('#uuw').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			downFollowInfo(rowData);
		}
	}
	);
});
function downFollowInfo(row){
	$('#downFollowInfo1').dialog({
		title : '跟进详细信息',
		top : getTop(250),
		left : getLeft(450),
		width : 450,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#downFollowInfo1 span').text('');
		},
	});
//	console.log(row);
	$('#readDownFollowtime1').html(row.proTime);
	$('#readDownFollowname1').html(row.proUserName);
	$('#readDownFolloMark1').html(row.proMark);
	$('#readDownFolloType1').html(row.proType);
	$('#downFollowInfo1').dialog('open');
}
//添加审批
function addEvent(){
	var row = $("#customerDg").datagrid("getRows");
	var index = $("#index").val();
	$('#addApproval').dialog({
		title : "添加审批",
		top : getTop(340),
		left : getLeft(640),
		width : 640,
		height : 360,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addApproval [clear="clear"]').val('');
			$('#addApproval [clear="clear"]').html('');
			$('#addApproval [choose="choose"]').val('');
			$('#addApproval [require="require"]').css('border', '1px solid #a9a9a9');
			$('#shorMessageRemind1').prop({checked:false});
			$('#ifSpeed').prop({checked:false});
			clearAttachment();
		}
	});
	$("#att").val('');
	$("#addCustomerApproval").val(row[index].cocContacts);
	
	$('.attachmentNum').html('（图片0张    文件0个）');
	$('#customerNumber').val(approvalNumber());
	$("#shorMessageRemind1").prop("checked", false);
	$('#ifSpeed').prop({checked:false});
	$('#amountInvolved').val(0);
	$('#payBankInfo').hide();
	$('#accountId2').hide();
	$('#fujian').show();
	$('#doAddEventBtn').show();
	$('#doUpdateEventBtn').hide();
	$('#addApproval').dialog('open');
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
		$('#accountId2').show();
	} else {
		$('#payBankInfo').hide();
		$('#accountId2').hide();
	}
}
//执行添加审批
function doAddEvent(){
	var row = $("#customerDg").datagrid("getRows");
	var index = $("#index").val();
	var amountInvolved = $("#amountInvolved").val();
	var eventType = $("#customerType").find("option:selected").text();
	var handler = $("#doEventGetUserId").val();
	var eventDescribe = $("#customerDescribe").val();
	var houseAddress = $("#addCustomerApproval").val();
	var eaApprovalNumber = $("#customerNumber").val();
	var eaBankName = $('#eaBankName').val();
	var eaBankUsername = $('#eaBankUsername').val();
	var eaBankAccountNumber = $('#eaBankAccountNumber').val();
	var subordinateTrip = $('#subordinateTrip').val();
	var accountDescription = $('#accountDescription').val();

	var eaCocId = row[index].cocId;
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
	var jhfFollowRemark = getNowFormatDate()+' '+ _loginUserName+' 添加的'+':'+eventDescribe;
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
		    		eaEventPublisher : _loginUserId,
		    		eaEventHandler : handler,
		    		
		    		eaCocId     : eaCocId,
		    		eaHomeType  : "客户审批",
		    		eaEventType : eventType,
		    	    eaEventState : "处理中",
		    	    eaWhetherGenerateRecord : "否",
		    	    eaAmountInvolved : amountInvolved,
		    	    eaEventContent : eventDescribe,
		    	    eaApprovalNumber: eaApprovalNumber,
		    	    eaBankName: eaBankName,
		    	    eaBankUsername: eaBankUsername,
		    	    eaBankAccountNumber: eaBankAccountNumber,
		    	    att : att
		    	}, function(data) {
		    		hideLoading();
		    		if (data.code<0) {
		    			myTips("添加失败！", "error");
		    			return;
		    		}
		    		isSave = true;
		    		doSendMessage();
		    		myTips("添加成功！", "success");
		    	});
		    }
		});  
	} else {
		showLoading();
		$.post("../insertEventApproval.action", {
			eaEventPublisher : _loginUserId,
			eaEventHandler : handler,
			
			eaCocId     : eaCocId,
			eaHomeType  : "客户审批",
			eaEventType : eventType,
		    eaEventState : "处理中",
		    eaWhetherGenerateRecord : "否",
		    eaAmountInvolved : amountInvolved,
		    eaEventContent : eventDescribe,
		    eaApprovalNumber: eaApprovalNumber,
		    eaBankName: eaBankName,
		    eaBankUsername: eaBankUsername,
		    eaBankAccountNumber: eaBankAccountNumber,
		    att : att
		}, function(data) {
			hideLoading();
			isSave = true;
			if (data.code<0) {
				myTips("添加失败！", "error");
				return;
			}

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
			$('#addApproval').dialog('close');
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
			$('#addApproval').dialog('close');
			
		});								
	}else{
		$('#addApproval').dialog('close');
		
		return;
	}
}
//添加任务
function addRepair(){
	var row = $("#customerDg").datagrid("getRows");
	var index = $("#index").val();
	$("#addTask").dialog({
		title : "添加任务",
		top   : getTop(340),
		left  : getLeft(380),
		width : 380,
		height: 360,
		closed: true,
		cache : false,
		modal : true,
		onClose: function(){
			$('#addTask [clear="clear"]').val('');
			$('#addTask [clean="clean"]').html('');
			$('#addTask [require="require"]').css('border', '1px solid #a9a9a9');
			$('#addTask').prop({
				checked : true
			});
			clearAttachment();
		},
		onOpen : function() {
			$("#addTask .repair_hope_time").val("尽快");
		}
	});
	$("#taskAssignment").val(row[index].cocContacts);
	$("#cocId").val(row[index].cocId);
	$(".repair_grade").val('3');
	$(".repair_name").val(row[index].cocContacts);
	$(".repair_responsibility").val('负责人')
	$("#att").val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	$("#addTask").dialog('open');
}
//查任务类型
	for (var k = 0; k < _taskType.length; k++) {
		$('#repair_type_rp').append("<option value = '" + _taskType[k] + "'>" + _taskType[k] + "</option>");
		$('#searchType').append("<option value = '" + _taskType[k] + "'>" + _taskType[k] + "</option>");
	}
	$(".repair_responsibility").append("<option value = '负责人'>负责人</option>");
//添加任务
function doAddRepair() {
	var houseRentCoding = $(".repair_houseRentCoding").val();
	var houseStoreCoding = $(".repair_houseStoreCoding").val();
	var houseCoding = $(".repair_houseCoding").val();
	var repName = $(".repair_name").val();
	var repPhone = $(".repair_phone").val();
	var repHopeTime = $("#repair_hopetime").val();
	var repRespon = $(".repair_responsibility").find("option:selected").text();
	var repEvent = $(".repair_event_rp").val();
	var repTypeRp = $("#repair_type_rp").find("option:selected").text();
	var repRepairPeopleId = $("#doRepairGetUserId").val();
	var repTaskTime = getTaskTime();   
	var att = $("#att").val();
	var jhfFollowRemark = _loginUserName + ' 添加的' + repTypeRp + ':' + repEvent;
	var type = "任务";
	var grade = $(".repair_grade").find("option:selected").text();
	var keyAdministrator=$("#repair_choseHouse").val();
	var cocId = $("#cocId").val();
	showLoading();
	$.post("../insertRepair.action", {
		repCocId : cocId,
		repHouse4rentId : houseRentCoding,
		repHouse4storeId : houseStoreCoding,
		repHouseId : houseCoding,
		repContacts : repName,
		repContactsPhone : repPhone,
		repResponsibility : repRespon,
		repEventRp : repEvent,
		repHopeTime : repHopeTime,
		repRepairPeopleId : repRepairPeopleId,
		repUserId : _loginUserId,
		repTypeRp : repTypeRp,
		repDepartment : _loginDepartment,
		repStorefront : _loginStore,
		repTaskTime : repTaskTime,
		att : att,
		type : type,
		repGrade : grade,
		keyAdministrator : keyAdministrator,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			myTips("添加失败！", "error");
			return;
		}
		//		$.post("../insertHousingFollow.action",{
		//			jhfHouseId        : houseCoding,
		//			jhfHouse4rentId   : houseRentCoding,
		//			jhfHouse4storeId  : houseStoreCoding,
		//			jhfFollowRemark   : jhfFollowRemark,
		//			jhfUserId         : _loginUserId,
		//			jhfDepartment     : _loginDepartment,
		//			jhfStorefront     : _loginStore,
		//			jhfPaymentWay     : '系统跟进',
		//			jhfFollowResult   : '跟进成功',
		//		},
		//		function(fData){
		//			console.log(fData);
		//		})
		isSave = true;
		doSendMessage();
		doSendTemplateMessage();
		myTips("添加成功！", "success");
	});
}
//执行发送短信
function doSendMessage() {
	if ($('#shorMessageRemind').prop("checked")) {
		var repairUserId = $('#doRepairGetUserId').val();
		var repTypeRp1 = $("#repair_type_rp").find("option:selected").text();
		var smRentId = $('.repair_houseRentCoding').val();
		var smNotRentId = $('.repair_houseStoreCoding').val();
		var address = $('.repair_choseHouse').val();
		var addCommunity = '';
		if (address == '' || address == null) {
			address = '无归属任务';
		}
		var popName = $('.repair_name').val();
		var popTel = $('.repair_phone').val();
		var repHopeTime = $('.repair_hope_time').val();
		var repairDescribe = $('.repair_event_rp').val() + "负责人：" + _loginUserName;
//		console.log(
//				"  repairUserId "+repairUserId+
//				"  smRentId "+smRentId+
//				"  smNotRentId "+smNotRentId+
//				"  smNotRentId "+smNotRentId+
//				"  repTypeRp1 "+repTypeRp1+
//				"  address "+address+
//				"  popName "+popName+
//				"  popTe "+popTel+
//				"  repHopeTime "+repHopeTime+
//				"  repairDescribe "+repairDescribe);
		var repairJson = {
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
		$.post("../massage/sendRepairMsg.action", repairJson,  function(data) {
			if (data.code < 0) {
				myTips(data.msg, "error");
				if (!$('#shorMessageTemplateRemind').prop("checked")) {
					$("#addRepairDlg").dialog('close');
					
				}
				return;
			}
			if (!$('#shorMessageTemplateRemind').prop("checked")) {
				$("#addRepairDlg").dialog('close');
				
			}
		});
	} else {
		if (!$('#shorMessageTemplateRemind').prop("checked")) {
			$("#addTask").dialog('close');
			
		}
		return;
	}
}

//执行发送短信
function doSendTemplateMessage() {
	if ($('#shorMessageTemplateRemind').prop("checked")) {
		var repairUserId = $('#doRepairGetUserId').val();
		var repTypeRp1 = $("#repair_type_rp").find("option:selected").text();
		var address = $('.repair_choseHouse').val();
		var popTel = $('.repair_phone').val();
		var sendTime=formatTime(getNowFormatDate(), 4);
		var popName = $('.repair_name').val();
		var popTel = $('.repair_phone').val();
		var repairDescribe = address+" "+$('.repair_event_rp').val()
//		console.log(
//			"  repairUserId "+repairUserId+
//			"  repTypeRp1 "+repTypeRp1+
//			"  address "+address+
//			"  popName "+popName+
//			"  popTe "+popTel+
//			"  repairDescribe "+repairDescribe);
//		console.log("id======"+repairUserId);
		$.post("../sendTemplateMessage.action",{
			toUserId:repairUserId,
			toUserType:"task",
			templateId : "ED7JrUrpQfsqXRvJGbj-uOJzlxSR9DsUpsU6qqMHPUU",
			firstValue:"您好，您有新的"+repTypeRp1+"！",
			keyValue1:popName,
			keyValue2:popTel,
			keyValue3:sendTime,
			keyValue4:repairDescribe,
			remarkValue:"请及时登录房至尊公众号接单确认！"
		}, function(data) {
			if (data.code < 0) {
				setTimeout(function () {
					myTips(data.msg, "error");
				}, 800);
				$("#addRepairDlg").dialog('close');
				queryRepair(1, 0);
				return;
			}
			$("#addTask").dialog('close');
			
		});
	} else {
		$("#addTask").dialog('close');
		
		return;
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
//选择账号
function addAccount2(){
	$('#bankAccount2').dialog({
		title : "银行账号",
		top : getTop(340),
		left : getLeft(640),
		width : 640,
		height : 340,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#bankAccount').prop({checked:false});
			
		}
	});
	$('#bankAccount2').dialog('open');
	$('#bankAccountTable2').datagrid(
			{
				singleSelect : true,
				autoRowHeight : false,
				pageSize : 10,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				onDblClickRow : function(rowIndex, rowData) {
					var row = $('#bankAccountTable2').datagrid(
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
						$('#bankAccount2').dialog('close');
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
	$("#bankAccountTablePageDiv").show();
	$.post("../queryCsAccountReceipt.action",{
		startNum 	   : startNum,
		endNum 		   : endNum,
		splitFlag	   : 1,
		csAccountName  : $('#bankAccount_div1_bank').val(),
		csBank         : $('#bankAccount_div1_user').val(),
	},function(data) {
		
		if (data.code<0) {
			
			$('#bankAccountTable2').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			var totalNum=data.body.length;
//			console.log("11111111");
//			console.log(totalNum);
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
			$("#bankAccountTable2").datagrid("loadData", data);
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

/*跳转页面*/
function skipToCheckHouse(){
	var row = $('#customerDg').datagrid('getSelected');
	console.log("7777");
	console.log(row);
	/*var skipJspName = '';
	var skipJspUrl = '';
	var skipJspIcon = '';
	var skipInputId = ['','',''];
	var skipInputVal = ['','',''];
	if((row.jfTheOwnershipType=="租客" && row.jfHouse4rentId!=null && row.jfHouse4rentId!='')|| (row.jfTheOwnershipType=="业主" && row.jfHouse4rentId!=null && row.jfHouse4rentId!='') ){
		skipJspName = '已租房间';
		skipJspUrl = 'fg_sourceInfo';
		skipJspIcon = 'yizuguanli';
		skipInputId[0] = 'sourceCommunity';
		skipInputId[1] = 'sourceBuilding';
		skipInputId[2] = 'sourceDoorplateno';
		skipInputId[3] = 'searchLeaseState';
		skipInputVal[0] = row.addCommunity;
		skipInputVal[1] = row.addBuilding;
		skipInputVal[2] = row.addDoorplateno;
		skipInputVal[3] = '';
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
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[3],
		jsonVal:skipInputVal[3],
	});*/
	/*window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);*/
	var skipJspName ="销售开单";
	/*
	var skipJspUrl ="fg_orderNotes";
	window.parent.addTab(skipJspName,skipJspUrl+".jsp");*/
	var skipInputId = ['',''];
	var skipInputVal = ['',''];
	skipInputId[0] = 'searchCustomerName1';
	skipInputId[1] = 'searchCustomerName2';
	skipInputVal[0] =row.cocId;
	skipInputVal[1] =row.cocContacts;
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
	console.log("888");
	console.log(_skipToChildJson);
	window.parent.addTab(skipJspName,"fg_orderNotes.jsp?cocId="+row.cocId+"=cocContacts="+row.cocContacts,"icon icon-xiaoshou");
//	$("#searchCustomerName").val=row.cocId;
//	parent._skipToChildJson=[];
}
//修改客户信息
function updateCustomer(){
	var row = $("#customerDg").datagrid("getSelected");
	if(!row){
		myTips('请选择客户', 'error');
		return;
	}
	$('#updateCustomerDlg').dialog({
		title : '修改客户信息',
		top : getTop(300),
		left : getLeft(800),
		width : 800,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
            $("#updateCustomerDlg input").val('');
            $("#updateCustomerDlg textarea").val('');
            $("#updateCustomerDlg select").val('');
            $("#updateCustomerDlg input[require='require']").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
		}
	});
    for(var i in row){
        $("#"+i).val(row[i]);
    }
    var cocAddress = JSON.parse(row.cocAddress.getRealJsonStr());
    $("#cocCompanyAbbreviation").val(cocAddress.address);
    $("#cocCommunity").val(cocAddress.community);
	$('#updateCustomerDlg').dialog('open');
}
//执行修改客户信息
function doUpdateCustomer() {
    var row = $("#customerDg").datagrid("getSelected");
    var checkFlag = 0;
    $("#updateCustomerDlg input[require='require']").each(function(){
        if($(this).val()==''||$(this).val()==null){
            $(this).css("border","1px solid red");
            checkFlag++;
        }else{
            $(this).css("border","1px solid #A9A9A9");
        }
    });
    if(checkFlag != 0){
        myTips("有必填项未填写!");
        return;
    }
    var cocId = row.cocId;
    var cocContacts = $("#cocContacts").val();
    var cocPhone = $("#cocPhone").val();
    var cocContactsPost = $("#cocContactsPost").find("option:selected").text();
    var cocSource = $("#cocSource").find("option:selected").text();
    var cocCompany = $("#cocCompany").val();
    var cocCompanyAbbreviation = $("#cocAbbreviation").val();
    var cocUrl = $("#cocUrl").val();
    var cocFixedTelephone = $("#cocFixedTelephone").val();
    var cocEmail = $("#cocEmail").val();
    var cocState = $("#cocState").val();
    var cocType = $("#cocType").find("option:selected").text();
    var cocRelation = $("#cocRelation").val();
    var cocGrade = $("#cocGrade").val();
    var cocSuperior = $("#cocSuperior").val();
    var cocScale = $("#cocScale").find("option:selected").text();
    var cocNotes = $("#cocNotes").val();
    var cocArrears = $("#cocArrears").val();//欠结,暂时没用到

    var community = $("#cocCommunity").val();
    var detailedAddress = $("#cocCompanyAbbreviation").val();
    var cocAddress = {
        address		:	detailedAddress,
        community	:	community
    }
    var json = {
        proTime	:	getNowFormatDate(),
        proType :   '系统跟进',
        proUserName	:	_loginUserName,
        proMark	:	_loginUserName+'进行客户信息更改。'
    };
    var jsonStr = JSON.stringify(json);
    showLoading();
    $.post("../updateByPrimaryKeySelective.action",{
        cocId           :   cocId,
        cocContacts		:	cocContacts,
        cocPhone		:	cocPhone,
        cocContactsPost	:	cocContactsPost,
        cocSource		:	cocSource,
        cocCompany		:	cocCompany,
        cocCompanyAbbreviation	:	cocCompanyAbbreviation,
        cocSuperior		:	cocSuperior,
        cocState		:	cocState,
        cocGrade		:	cocGrade,
        cocRelation		:	cocRelation,
        cocType			:	cocType,
        cocScale		:	cocScale,
        cocFixedTelephone	:	cocFixedTelephone,
        cocUrl			:	cocUrl,
        cocEmail		:	cocEmail,
        cocAddress		:	JSON.stringify(cocAddress),
        cocNotes        :   cocNotes,
    },function(data){
        hideLoading();
        if(data.code < 0){
            myTips(data.msg, 'error');
            return;
        }
        $.post("../addProgressCustomer.action",{//添加跟进
            cocId	:	cocId,
            csOutsideCustomerJson	:	jsonStr
        },function(data){
            if(data.code<0){
                $.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
                return;
            }
            queryCustomer(1, 0);
        });
        myTips("修改成功！", "success");
        queryCustomer(1, 0);
    });

}
/*添加合同*/
function addContract(){
	var row = $("#customerDg").datagrid("getSelected");
	$('#contract').dialog({
		title : '添加合同',
		top : getTop(300),
		left : getLeft(800),
		width : 600,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
           $('#addHsBegin').val('');
           $('#addHsEnd').val('');
           $('#addHsSigned').val('');
           $('#bankAccount_name').val('');
           $('#bankAccount_phone').val('');
           $('#bankAccount_remarks').val('');
           $('#contractNum').val('');

		}
	});
	$('#contract').dialog('open');
	$("#bankAccount_name").val(row.cocContacts);
	$("#bankAccount_remarks").val(row.cocUserCode);
	$("#bankAccount_phone").val(row.cocPhone);
}
/*设置时间*/
function changeAddHsDate(){
	if ($('#addHsBegin').val() == '' || $('#addHsEnd').val() == '') {
		$('#priceLadder').hide();
		$('#addHsTerm').html('');
		return;
	}
	$('#priceLadder').show();
	$("#settingTips").html('');
	var begin = new Date($('#addHsBegin').val());
	var end = new Date($('#addHsEnd').val());
	var date = new Date(begin);
	date.setDate(date.getDate() - 1);
	var term = getYearMonthDay($('#addHsBegin').val(), $('#addHsEnd').val());
	$('#addHsTerm').html('（' + term[0]+'年'+term[1]+'月'+term[2]+'日' + '）');
	var year = 0;//合同期限
	var isWholeYear = 1;//1表示整年，0表示非整年
	while(date < end){
		year++;
		date.setFullYear(date.getFullYear() + 1);
	}
	if (date.getTime() != end.getTime()) {
		isWholeYear = 0;
	}
	var beginTime = $("#addHsBegin").val();
	$('#priceLadderDiv').empty();
	/*for(var i=1;i<=year;i++){
		$('#priceLadderDiv').append(
			'<div style="margin:5px 0 0 0;"> ' + 
				'<lable style="display:inline-block;width:90px;"><span class="require">*</span>第'+i+'年租金：</lable> ' + 
				'<input class="updatePriceLadder" style="width:80px;" clear="clear" require="require">元/月 ' + 
				'<lable style="display:inline-block;width:104px;margin: 0 0 0 24px;"><span class="require">*</span>年内免租期：头</lable> ' + 
				'<input id="holidaySumBefor'+i+'" class="holidaySumBefor" style="width:30px;" clear="clear" type="number" onchange="changeRentFreeSegment('+i+',0)">天，尾 ' + 
				'<input id="holidaySumAfter'+i+'" class="holidaySumAfter" style="width:30px;" clear="clear" type="number" onchange="changeRentFreeSegment('+i+',1)">天 ' + 
				'<a class="easyui-linkbutton copy'+i+'" onclick="copyHolidaySum()">往下复用</a>' + 
				'<div><input style="display:none;" type="text" id="holidaySettingA'+i+'" clear="clear" class="rentFreeSegmentIndex"> ' + 
				'<input style="display:none;" type="text" id="holidaySettingB'+i+'" clear="clear"> ' + 
				'<input style="display:none;" type="text" id="holidaySettingC'+i+'" clear="clear"> ' + 
				'<input style="display:none;" type="text" id="holidaySettingD'+i+'" clear="clear"></div> ' + 
			'</div> '
		);
		$('#holidaySettingA' + i).val(renewalDate(beginTime, i, 0));
		if(isWholeYear == 1 || i < year){
			$('#holidaySettingD' + i).val(renewalDate(beginTime, i, 1));
		} else {
			$('#holidaySettingD' + i).val($('#addHsEnd').val());
		}
		if (year == 1 || i > 1) {
			$('.copy'+i).remove();
		}
	}
	$.parser.parse($('#priceLadderDiv'));*/
}
/*查找合同编号*/
function contractNumCheckout(type){
	if(_contractNums != 1){
		return;
	}
	if(type==0){
		var detectionContract = $("#contractNum").val();
		for(var i in _contractNumsArry){
			if(_contractNumsArry[i].number==detectionContract){
				$("#contractNumTips").html("编号正确");
				$("#contractNumTips").css("color", "green");
				return;
			}
		}
		if(detectionContract==''){
			$("#contractNumTips").html("");//编号不能为空！
			return;
		}
		$.post("../contractNumberdetection.action", {
			detectionContract : detectionContract,
		},function(data){
			if(data.code<0){
				$("#contractNumTips").html(data.msg);
				$("#contractNumTips").css("color", "red");
				return;
			}else{
				data=data.body;
				$("#contractNumTips").html("编号正确");
				$("#contractNumTips").css("color", "green");
				$("#usedContractNum").append('<div class="selectShow" onclick="deleteThisDiv(this.id,0)" id="contractNumsShow'+detectionContract+'"><div style="float: left;" >'+detectionContract
						+'</div><div class="selectShow-x" style="float: right;"></div></div>');
				_contractNumsArry.push({number:detectionContract,jcdId:parseInt(data[0].jcdId),jcdHouseAddress:"",adminUser:''});
			}
		});
	}else if(type==1){
		var detectionContract = $("#landlordRenewContractNum").val();
		for(var i in _contractNumsArry1){
			if(_contractNumsArry1[i].number==detectionContract){
				$("#landlordRenewContractNumTips").html("编号正确");
				$("#landlordRenewContractNumTips").css("color", "green");
				return;
			}
		}
		if(detectionContract==''){
			$("#landlordRenewContractNumTips").html("");//编号不能为空！
			return;
		}
		$.post("../contractNumberdetection.action", {
			detectionContract : detectionContract,
		},function(data){
			if(data.code<0){
				$("#landlordRenewContractNumTips").html(data.msg);
				$("#landlordRenewContractNumTips").css("color", "red");
				return;
			}else{
				data=data.body;
				$("#landlordRenewContractNumTips").html("编号正确");
				$("#landlordRenewContractNumTips").css("color", "green");
				$("#landlordRenewUsedContractNum").append('<div class="selectShow" onclick="deleteThisDiv(this.id,1)" id="lrcontractNumsShow'+detectionContract+'"><div style="float: left;" >'+detectionContract
						+'</div><div class="selectShow-x" style="float: right;"></div></div>');
				_contractNumsArry1.push({number:detectionContract,jcdId:parseInt(data[0].jcdId),jcdHouseAddress:"",adminUser:''});
			}
		});
	}
}
/*保存销售客户合同*/
function doContract(){
	var row = $("#customerDg").datagrid("getSelected");
	var addHsBegin = $("#addHsBegin").val();
	var addHsEnd = $("#addHsEnd").val();
	var addHsSigned = $("#addHsSigned").val();
	var bankAccountName = $("#bankAccount_name").val();
	var bankAccountPhone = $("#bankAccount_phone").val();
	var contractNum = $("#contractNum").val();
	var bankAccountRemarks = $("#bankAccount_remarks").val();
	var contractTypeRp = $("#contract_type_rp").val();
	var contractNumTips = $("#contractNumTips").val();
	var usedContractNum = $("usedContractNum").val();
	var csCocId = row.cocId;
	var Truce1 = 1;
    var Truce2 = 0;
	var insertData = {
    		
    }
    console.log(insertData);
    var insertDataStr = JSON.stringify(insertData);
    var ectTemplateFillValue = "{'jsonVal':[{'contractNo':'','idcard':'" + bankAccountRemarks + "','renant':'" + bankAccountName + "','agent':'','telphone':'" + bankAccountPhone + "'," +
    		"'beginDate':'" + addHsBegin + "','endDate':'" + addHsEnd + "','signingDate':'" + addHsSigned 
	    + "','deliveryDay':'" + addHsEnd + "','Truce1':'" + Truce1 + "','Truce2':'" + Truce2 
	    + "',}],'insertData':" + insertDataStr +"}";
    console.log(ectTemplateFillValue);
    if(addHsBegin==null || addHsBegin == ''){
    	$("input[id='addHsBegin']").css("border-color", "red");
		 return myTips("合同时间不能为空！");
	}else if(addHsEnd == null || addHsEnd == ''){
		return myTips("合同时间不能为空！");
	}else if(addHsSigned == null || addHsSigned == ''){
		return myTips("签约时间不能为空！");
	}else if(bankAccountName == null || bankAccountName == ''){
		return myTips("签约人不能为空！");
	}else if(bankAccountPhone == null || bankAccountPhone == ''){
    	return myTips("电话号码不能为空！");
	}else if(bankAccountRemarks == null || bankAccountRemarks == ''){
    	return myTips("身份证不能为空！");
	}else if(contractNum == null || contractNum == ''){
		return myTips("合同编号不能为空！");
	}else{
		if(contractTypeRp == "纸质合同"){
			$.post("../insertCsSalesClientContract.action",{
				csSigningTime      : addHsBegin,
				csCancellationTime : addHsEnd,
				csCreationTime     : addHsSigned,
				csName			   : bankAccountName,
				csTelphone         : bankAccountPhone,
				csContractNo	   : contractNum,
				csCocId			   : csCocId,
				csContractType	   : contractTypeRp,
				csIdCardNo		   : bankAccountRemarks,
				csStatus	       : '已使用',
				contractNumTips	   : contractNumTips,
				usedContractNum	   : usedContractNum,
				att				   : $("#att").val()

			},function(data){
				console.log(data);
				if(data.code<0){
					myTips("添加失败！");
				}else{
					myTips("添加成功！", "success");
					$('#contract').dialog('close');
				}
			}),"json";
		}else{

			$.post("../signContract1.action",{
				csSigningTime      : addHsBegin,
				csCancellationTime : addHsEnd,
				csCreationTime     : addHsSigned,
				csName			   : bankAccountName,
				csTelphone         : bankAccountPhone,
				csContractNo	   : contractNum,
				csUserCode		   : bankAccountRemarks,
				csContractType	   : contractTypeRp,
				csIdCardNo	       : bankAccountRemarks,
				csCocId			   : csCocId,
				att				   : $("#att").val(),
				csTemplateFillValue: ectTemplateFillValue

			},function(data){
				console.log(data);
				if(data.code<0){
					myTips("添加失败！");
				}else{
					myTips("添加成功！", "success");
					$('#contract').dialog('close');
				}
			}),"json";
		}
	};
}
/*合同管理*/
function contractManagement(){
//	var row = $("#customerDg").datagrid("getSelected");
//	var csCocId = row.cocId;
//	var csContractType = $('#contract_management_type_rp').val();
	var totalNum;
	var pageNum = Math.ceil(totalNum / 20);
	$('#contractManagement').dialog({
		title : '合同管理',
		top : 80,
		left : getLeft(800),
		width : 700,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#contractManagementTable").datagrid("loadData",[]);
			$('#contract_management_type_rp').val('')
			
		},
		
	});
	InquiryContract(1,0);
	
	$('#contractManagement').dialog('open');
	
}
function InquiryContract(page, type){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var row = $("#customerDg").datagrid("getSelected");
	var csCocId = row.cocId;
	var csContractType = $('#contract_management_type_rp').val();
	//var csStatus = '已使用';
		$.post("../queryCsSalesClientContract.action",{
			csCocId	: csCocId,
			csContractType	: csContractType,
			csStatus	: '已使用',
		},function(data){
			if(data.code<0){
				$("#contractManagementTable").datagrid("loadData",[]);
			}else{
				data = data.body;
				
				$("#contractManagementTable").datagrid("loadData",data);
				console.log(data[0].totalNum);
				//sourcePage(data.length, page, 1);
			}
			
		}),"json";
}
//单条查询电子签约合同照片
function selectCustomerImg(csContractId){
	console.log("csContractId"+csContractId);
	
	$.post("../queryCsSalesClientContract2.action",{
		csContractId :csContractId,
		
	},function(data){
		console.log(data.code);
		if(data.code<0){
			$('#contractManagementTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if(data[0].csContractType == '电子合同'){
                $.ajax({
                    type: "POST",
                    url: "../getContractImg.action",
                    async:false,
                    data: {
                        no : data[0].csContractNo
                    },
                    iiindex:0,
                    dataType: "json",
                    success: function(result){
                        console.log(result)
                        if(result.code == 0){
                            console.log(this.iiindex)
                            console.log( data[this.iiindex])
                            data[this.iiindex].contractImgPaths = result.body;
                            var imgNum = parseInt(data[this.iiindex].csImgNum.split("/")[0]);
                            imgNum += result.body.length;
                            var jrrImgNum = imgNum + "/" + data[this.iiindex].csImgNum.split("/")[1];
                            data[this.iiindex].csImgNum = jrrImgNum;
                            tenantImgDg(data);
                        }else{
                            myTips(result.msg,"error");
                        }
                    }
                });
			}else{
				tenantImgDg(data);
			}
		}
	},"json");
}







