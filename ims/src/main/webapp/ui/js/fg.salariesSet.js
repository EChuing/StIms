$(function() {
	querySalariesSet(1,0);
	queryStore();
	$("#salariesSetDg").datagrid(
			{
				onDblClickRow : function(rowIndex, rowData) {
					var row = $('#salariesSetDg').datagrid('getSelected');
					if (row) {
						
					}
				}
			});
});
function querySalariesSet(page, type) {
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var ssaStorefront = $('#handlerStore').val();
	var ssaDepartment = $('#handlerDept').val();
	var ssaEmployeeId = $('#handler').val();
	var startTime = $('#searchTimeStart').val();
	var endTime = $('#searchTimeEnd').val();
	
	$.post("../selectStaffSalaries.action",{
		startNum : startNum,
		endNum : endNum,
		ssaStorefront:ssaStorefront,
		ssaDepartment:ssaDepartment,
		ssaEmployeeId:ssaEmployeeId,
		startTime:startTime,
		endTime:endTime,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 0);
			$('#salariesSetDg').datagrid({
				data : [],
				view : myview,
				height:"100px",
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 0);
			}
			$('#salariesSetDg').datagrid({
				height:"auto",
			});
			$("#salariesSetDg").datagrid("loadData", data);
		}
	}, "json");
}
function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#salariesSetPage").remove();
		$("#salariesSetPageDiv")
				.append(
						"<div class='tcdPageCode' id='salariesSetPage' style='text-align:center;'></div>");
		$("#salariesSetPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					querySalariesSet(p, 1);
				}
			}
		});
	}
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
		querySalariesSet(1,0);
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
		querySalariesSet(1,0);
	}, "json");
}
//选择部门
function choseDept(deptId, staffId) {
	var dept = $('#' + deptId);
	var staff = $('#' + staffId);
	staff.empty();
	staff.append("<option></option>");
	var deptment = dept.val();
	if (deptment == '') {
		querySalariesSet(1,0);
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
		querySalariesSet(1,0);
	});
}

