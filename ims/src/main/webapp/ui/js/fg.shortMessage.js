$(function(){
	queryMessage(1, 0);
	internalQueryMessage(1, 0);
	$("#messageDg").datagrid({
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			$(".message_index").val(rowIndex);
			readonlyTruDlg(rowData);
		}
	});
	$("#internal_messageDg").datagrid({
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			$(".internal_message_index").val(rowIndex);
			internalReadonlyTruDlg(rowData);
		}
	});
	for (var i in _smType) {
		$('#searchMessageSmType').append(
				"<option value='" + _smType[i] + "'>" + _smType[i] + "</option>");
	}

});
//外部短信查看
function readonlyTruDlg(data){
	var row = $('#messageDg').datagrid('getSelected');
	$('#readonlyMessageDlg').dialog({
		title : '短信详细信息',
		top : getTop(300),
		left : getLeft(850),
		width : 850,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#readonlyMessageDlg input').val('');
			$('#readonlyMessageDlg textarea').val('');
		},
	});
	if(row.smType == '接收' && row.smTreatmentStatus == '未读'){
		$('#readStatus [iconcls="icon-ok"]').css('display','');
	}else{
		$('#readStatus [iconcls="icon-ok"]').css('display','none');
	}
	$('.messageId').val(row.smId);
	$('.messageType').val(row.smType);
	$('.messageStatus').val(row.smState);
	$('.messageCount').val(row.smCount);
	$('.messageTreatmentStatus').val(row.smTreatmentStatus);
	$('.messageName').val(row.popName);
	$('.messagePhone').val(row.popTelephone);
	$('.messageTime').val(row.smDataTime);
	$('.messageContent').val(row.smNote);
	$('.messageField').val(row.smField);
	$('#readonlyMessageDlg').dialog('open');
}
//内部短信查看
function internalReadonlyTruDlg(data){
	var row = $('#internal_messageDg').datagrid('getSelected');
	$('#internal_readonlyMessageDlg').dialog({
		title : '短信详细信息',
		top : getTop(500),
		left : getLeft(850),
		width : 850,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#internal_readonlyMessageDlg input').val('');
			$('#internal_readonlyMessageDlg textarea').val('');
		},
	});
	
	$('.internal_messageId').val(row.smId);
	$('.internal_messageType').val(row.smType);
	$('.internal_messageStatus').val(row.smState);
	$('.internal_messageCount').val(row.smCount);
	$('.internal_messageName').val(row.suStaffName);
	$('.internal_messagePhone').val(row.smUserContacts);
	$('.internal_messageTime').val(row.smDataTime);
	$('.internal_messageNote').val(row.smNote);
	$('.internal_messageContent').val(row.smContent);
	$('.internal_messageField').val(row.smField);
	$('#internal_readonlyMessageDlg').dialog('open');
}
function updateShotMessage(){
	var row = $('#messageDg').datagrid('getSelected');
	var smId = row.smId;
	$.post("../massage/updateShortMessage.action", {
		smId : smId,
		smTreatmentStatus : '已读'
	}, function(data) {
		if (data <0 || data == '' || data.length == 0) {
			myTips('读取失败！', 'error');
			return;
		} 
		$('#readonlyMessageDlg').dialog('close');
		queryMessage(1, 0);
	}, "json");
}
// 外部、短信表导入信息
function queryMessage (page, type) {
	var pageNum = 15;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var popName = $('#searchMessageUser').val();
	var popTelephone = $('#searchMessagePhone').val();
	var smType = $('#searchMessageSmType').find("option:selected").text();
	var smNote = $('#searchMessageNote').val();
	
	$.post("../massage/selectShortMessageSplit.action", {
		startNum 		: startNum,
		endNum 			: endNum,
		popName 		: popName,
		popTelephone 	: popTelephone,
		smType 			: smType,
		splitFlag		: 1,
		smNote			: smNote,
	}, function(data) {
		if (data.code<0) {
			$('#messageDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryMessage","message");
			}else{
				notCountPage(page, 0 ,"queryMessage","message");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryMessage","message");
			}else{
				notCountPage(page, 1 , "queryMessage","message");
			}
			$("#messageDg").datagrid("loadData", data);
		}
	}, "json");
}
//外部、短信表导入信息数据统计
function getmessagePageCount(page, type) {

	var pageNum = 15;
	var popName = $('#searchMessageUser').val();
	var popTelephone = $('#searchMessagePhone').val();
	var smType = $('#searchMessageSmType').find("option:selected").text();
	var smContent = $('#searchMessageNote1').val();
	$.post("../massage/selectShortMessageSplit.action", {
		popName 		: popName,
		popTelephone 	: popTelephone,
		smType 			: smType,
		splitFlag		: 0,
		smContent		: smContent,
	}, function(data) {
		if (data.code<0 ||data.body[0].totalNum==0) {
			var countJson = {
					totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"message",0);
		} else {
			data=data.body;
			var countJson = {
					totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"message",0);
		}
	}, "json");
}
//内部、短信表导入信息
function internalQueryMessage (page, type) {
	var pageNum = 15;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var suStaffName = $('#internalSearchMessageUser').val();
	var smUserContacts = $('#internalSearchMessagePhone').val();
	var smContent = $('#searchMessageNote1').val();
	
	
	$.post("../massage/selectShortMessageAdministrativeSplit.action", {
		
		startNum 		: startNum,
		endNum 			: endNum,
		suStaffName 	: suStaffName,
		smUserContacts 	: smUserContacts,
		smContent       : smContent, 
		splitFlag		: 1,
	}, function(data) {
		if (data.code < 0) {
			$('#internal_messageDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"internalQueryMessage","internal_message");
			}else{
				notCountPage(page, 0 ,"internalQueryMessage","internal_message");
			}
		} else {
			data = data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "internalQueryMessage","internal_message");
			}else{
				notCountPage(page, 1 , "internalQueryMessage","internal_message");
			}
			$("#internal_messageDg").datagrid("loadData", data);
		}
	}, "json");
}
//内部、短信表导入信息数据统计
function getinternal_messagePageCount (page) {
	var pageNum = 15;
	
	var suStaffName = $('#internalSearchMessageUser').val();
	var smUserContacts = $('#internalSearchMessagePhone').val();
	

	$.post("../massage/selectShortMessageAdministrativeSplit.action", {
		suStaffName 	: suStaffName,
		smUserContacts 	: smUserContacts,
		splitFlag		: 0,
	}, function(data) {
		if (data.code<0) {
			var countJson = {
					totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"internal_message",0);
		} else {
			var countJson = {
					totalNum	: data.body[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"internal_message",0);
		}
	}, "json");
}
//外部、修改信息
function updateMessage(){
	var row = $("#messageDg").datagrid("getSelected");
	if(row){
		$(".updateMessageId").val(row.smId);
		$(".updateMessageCount").val(row.smCount);
		$(".updateMessageName").val(row.popName);
		$(".updateMessagePhone").val(row.popTelephone);
		$(".updateMessageTime").val(row.smDataTime);

		$(".updateMessageStatus").val(row.smState);
		$(".updateMessageType").val(row.smType);
		$(".updateTreatmentStatus").val(row.smTreatmentStatus);
		$(".updateMessageContent").val(row.smNote);
		
		$("#updateMessageDlg").dialog({
			title : '修改信息',
			top : getTop(360),
			left : getLeft(470),
			width : 590,
			height : 380,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#updateMessageDlg input').val('');
				$('#updateMessageDlg select').val('');
				$('#updateMessageDlg textarea').val('');
			}
		});
		$("#updateMessageDlg").dialog('open');
		
	}else{
		myTips('请选中需要修改的行！', 'error');
	}
}
//修改内部信息
function internalUpdateMessage(){
	var row = $("#internal_messageDg").datagrid("getSelected");
	if(row){
		$(".internal_updateMessageId").val(row.smId);
		$(".internal_updateMessageCount").val(row.smCount);
		$(".internal_updateMessageName").val(row.suStaffName);
		$(".internal_updateMessagePhone").val(row.smUserContacts);
		$(".internal_updateMessageTime").val(row.smDataTime);

		$(".internal_updateMessageStatus").val(row.smState);
		$(".internal_updateMessageType").val(row.smType);
		$(".internal_updateTreatmentStatus").val(row.smTreatmentStatus);
		$(".internal_updateMessageContent").val(row.smContent);
		
		$("#internal_updateMessageDlg").dialog({
			title : '修改信息',
			top : getTop(360),
			left : getLeft(470),
			width : 590,
			height : 410,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$('#internal_updateMessageDlg input').val('');
				$('#internal_updateMessageDlg select').val('');
				$('#internal_updateMessageDlg textarea').val('');
			}
		});
		$("#internal_updateMessageDlg").dialog('open');
		
	}else{
		myTips('请选中需要修改的行！', 'error');
	}
}
//执行修改外部信息
function doUpdateMessage(){	
	var row = $("#messageDg").datagrid("getSelected");
	// 短信Id
	var smId= row.smId;
	
	var smTreatmentStatus = $('.updateTreatmentStatus').find('option:selected').text();

	
	if (smTreatmentStatus == '') {
		myTips('短信不完整！请完善后再进行保存！', "error");
		return;
	}
	$.post("../massage/updateShortMessage.action",{
		smId : smId,
		smTreatmentStatus : smTreatmentStatus
	},
	function(data) {
		if (data <0 || data=='') {
			myTips('修改失败！', 'error');
			return;
		} else {
			$('#updateMessageDlg').dialog('close');
			myTips('修改成功！', 'success');
			queryMessage(1, 0);
			
		}
	});	
}
//执行修改内部信息
function doInternalUpdateMessage(){	
	var row = $("#internal_messageDg").datagrid("getSelected");
	// 短信Id
	var smId= row.smId;
	
	var smTreatmentStatus = $('.internal_updateTreatmentStatus').find('option:selected').text();

	
	if (smTreatmentStatus == '') {
		myTips('短信不完整！请完善后再进行保存！', "error");
		return;
	}
	$.post("../massage/internalUpdateShortMessage.action",{
		smId : smId,
		smTreatmentStatus : smTreatmentStatus
	},
	function(data) {
		if (data <0 || data=='') {
			myTips('修改失败！', 'error');
			return;
		} else {
			$('#internal_updateMessageDlg').dialog('close');
			myTips('修改成功！', 'success');
			internalQueryMessage(1, 0);
			
		}
	});	
}
//外部短信、上一条下一条
function laterOrNext(type) {
	$('#messageDg').datagrid('clearChecked');
	var dataIndex = $(".message_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".message_index").val(num);
			changeData = $('#messageDg').datagrid('getData').rows[num];
			$('#messageDg').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#messageDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".message_index").val(num);
			changeData = $('#messageDg').datagrid('getData').rows[num];
			$('#messageDg').datagrid('selectRow',num);
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
		readonlyTruDlg(changeData);
	}
}
//内部短信、上一条下一条
function internalLaterOrNext(type) {
	$('#internal_messageDg').datagrid('clearChecked');
	var dataIndex = $(".internal_message_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".internal_message_index").val(num);
			changeData = $('#internal_messageDg').datagrid('getData').rows[num];
			$('#internal_messageDg').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#internal_messageDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".internal_message_index").val(num);
			changeData = $('#internal_messageDg').datagrid('getData').rows[num];
			$('#internal_messageDg').datagrid('selectRow',num);
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
		internalReadonlyTruDlg(changeData);
	}
}
//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#messagePage").remove();
		$("#messagePageDiv")
				.append(
						"<div class='tcdPageCode' id='messagePage' style='text-align:center;'></div>");
		$("#messagePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryMessage(p, 1);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 15);
		$("#internal_messagePage").remove();
		$("#internal_messagePageDiv")
				.append(
						"<div class='tcdPageCode' id='internal_messagePage' style='text-align:center;'></div>");
		$("#internal_messagePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					internalQueryMessage(p, 1);
				}
			}
		});
	}	
}
//发送状态显示列格式
function formatterSmState(value, row, index){
	if (row.smState =='发送成功') {
		return "<a style='text-decoration:none;color:green;'>"+row.smState+"<a>";
	}else if (row.smState =='推送成功'){
		return "<a style='text-decoration:none;color:orange;'>"+row.smState+"<a>";
	}else if (row.smState =='发送失败'){
		return "<a style='text-decoration:none;color:red;'>"+row.smState+"<a>";
	}else if (row.smState =='推送失败'){
		return "<a style='text-decoration:none;color:red;'>"+row.smState+"<a>";
	}else if (row.smState =='推送中'){
		return "<a style='text-decoration:none;'>"+row.smState+"<a>";
	}else if (row.smState =='余额不足'){
		return "<a style='text-decoration:none;color:blue;'>"+row.smState+"<a>";
	}else if (row.smState =='回复信息'){
		return "<a style='text-decoration:none;color:brown;'>"+row.smState+"<a>";
	}
}
