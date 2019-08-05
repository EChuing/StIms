$(function() {
	querySalaries(1,0);
	queryStore();
	$("#salariesDg").datagrid(
			{
				onDblClickRow : function(rowIndex, rowData) {
					var row = $('#salariesDg').datagrid('getSelected');
					if (row) {
						
					}
				}
			});
});
function querySalaries(page, type) {
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var suStoreId = $('#handlerStore').val();
	var suDepartmentId = $('#handlerDept').val();
	var userId = $('#handler').val();
	var suStaffName = $('#handlerName').val();
	
	$.post("../queryUserById.action",{
		startNum : startNum,
		endNum : endNum,
		suStoreId:suStoreId,
		suDepartmentId:suDepartmentId,
		userId:userId,
		suStaffName:suStaffName,
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0, 0, 0);
			var noData = [];
			$('#salariesDg').datagrid({
				data : noData,
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 0);
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].suBasePay = accAdd(0,data[i].suBasePay);
				data[i].suMeritPay = accAdd(0,data[i].suMeritPay);
				data[i].suWageLosses = accAdd(0,data[i].suWageLosses);
			}
		}
		$("#salariesDg").datagrid("loadData", data);
	}, "json");
}
function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#salariesPage").remove();
		$("#salariesPageDiv")
				.append(
						"<div class='tcdPageCode' id='salariesPage' style='text-align:center;'></div>");
		$("#salariesPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					querySalaries(p, 1);
				}
			}
		});
	}
}

function setSalaries() {
	var row = $('#salariesDg').datagrid('getSelected');
	if(!row){
		myTips("请选择一位用户进行工资设置！","error");
		return;
	}
	$('#setSalariesDlg').dialog({
		title : '工资设置',
		top : getTop(250),
		left : getLeft(600),
		width : 600,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#setSalariesDlg input').val("");
			$('#setSalariesDlg textarea').val("");
			$("#setSalariesDlg input[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
		}
	});
	$("#setSalariesStore").val(row.storefrontName);
	$("#setSalariesDept").val(row.departmentName);
	$("#setSalariesUserName").val(row.suStaffName);
	$("#addSuBasePay").val(row.suBasePay);
	$("#addSuMeritPay").val(row.suMeritPay);
	$("#addSuWageLosses").val(row.suWageLosses);
	$("#setSalariesUserId").val(row.userId);
	$(".do_overDiv").hide();
	$('#setSalariesDlg').dialog('open');
}
function doSetSalaries(){
	$(".do_overDiv").show();
	var userId = $("#setSalariesUserId").val();
	var suBasePay = $("#addSuBasePay").val();
	var suMeritPay = $("#addSuMeritPay").val();
	var suWageLosses = $("#addSuWageLosses").val();
	var checkFlag = 0;
	$("#setSalariesDlg input[needs=1]").each(function(){
		if($(this).val()==''||$(this).val()=='单击选择房屋'){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		$("#setSalariesTips").html("任一工资不能为空！");
		$('.do_overDiv').hide();
		return;
	}
	$("#setSalariesTips").html("");
	$.post('../updateUser.action', {
		userId : userId,
		suBasePay:suBasePay,
		suMeritPay:suMeritPay,
		suWageLosses:suWageLosses,
	}, function(data) {
		if (data.code < 0) {
			myTips(data.msg, 'error');
			$(".do_overDiv").hide();
			return;
		}
		querySalaries(1,0);
		myTips('修改成功！', 'success');
		$("#setSalariesDlg").dialog('close');
		$(".do_overDiv").hide();
	});
}
//查询门店
function queryStore(){
	$.post("../queryStorefront.action", function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$("#handlerStore").append("<option value = '" + data[i].storefrontId + "'>" + data[i].storefrontName + "</option>");
		}
		for (var i in data) {
			$("#nextHandlerStore").append("<option value = '" + data[i].storefrontId + "'>" + data[i].storefrontName + "</option>");
		}
	}, "json");
}
//选择门店
function choseStore(storeId,deptId,staffId){
	var store = $('#' + storeId);
	var dept = $('#' + deptId);
	var staff = $('#' + staffId);
	dept.empty();
	staff.empty();
	dept.append("<option></option>");
	staff.append("<option></option>");
	var storefront = store.val();
	if(storefront == ''){
		querySalaries(1,0);
		return;
	}
	$.post("../queryDepartment.action", {
		departmentStorefrontId : storefront,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for (var i in data.body) {
			dept.append("<option value = '" + data.body[i].departmentId + "'>" + data.body[i].departmentName + "</option>");
		}
		querySalaries(1,0);
	});
}
//选择部门
function choseDept(deptId, staffId) {
	var dept = $('#' + deptId);
	var staff = $('#' + staffId);
	staff.empty();
	staff.append("<option></option>");
	var deptment = dept.val();
	if (deptment == '') {
		querySalaries(1,0);
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
		for (var i in data) {
			staff.append("<option value = '" + data[i].userId + "'>" + data[i].suStaffName + "</option>");
		}
		querySalaries(1,0);
	});
}

