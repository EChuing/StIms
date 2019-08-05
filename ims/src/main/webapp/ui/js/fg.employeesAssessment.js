$(function() {
	$.post("../queryStorefront.action", function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$(".add_theStore").append(
					"<option value='" + data[i].storefrontId + "'>"
							+ data[i].storefrontName + "</option>");
		}
		choseStore('add_department_theStore', 'addTheDepartment');
	});
	$('#employeesDg').datagrid({
		onClickRow : function(index, data) {
			queryPerformanceOverview();
			queryPerfDetail(1, 0);
		}
	})
})

//周期
var timeType = {
	0 :　"本月",
	1 :　"上月",
	2 :　"本季",
	3 :　"本年",
	4 :　"累计",
}

// 选择门店
function choseStore(storeId, deptId) {
	var store = $('#' + storeId);
	var dept = $('#' + deptId);
	dept.empty();
	dept.append("<option></option>");
	var storefront = store.val();
	if (storefront == '') {
		queryUserTable(1, 0);
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
			dept.append("<option value = '" + data.body[i].departmentId + "'>"
					+ data.body[i].departmentName + "</option>");
		}
		queryUserTable(1, 0);
	}, "json");
}

// 选择部门/查询用户列表
function queryUserTable(page, type) {
	var suStoreId = $('#add_department_theStore').val();
	var suDepartmentId = $('#addTheDepartment').val();
	var startNum = (parseInt(page) - 1) * 19;
	var endNum = 19;
	$.post("../queryUserById.action", {
		suStoreId : suStoreId,
		suDepartmentId : suDepartmentId,
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data < 0) {
			sourcePage(0, 0, 0);
			var noData = [];
			$('#employeesDg').datagrid({
				data : noData,
				view : myview,
				width : '100%',
				emptyMsg : data.msg
			});
			// $('#container1').html(
			// "<div
			// style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>暂无数据！</div>");
			// $('#container2').html(
			// "<div
			// style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>暂无数据！</div>");
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 0);
			}
			$('#employeesDg').datagrid({
				"onLoadSuccess" : function(data) {
					$(this).datagrid('selectRow', 0);
				}
			}).datagrid("loadData", data);
			queryPerformanceOverview();
			queryPerfDetail(1, 0)
		}
	});
}

// 业绩概况
function queryPerformanceOverview() {
	var row = $('#employeesDg').datagrid('getSelected');
	$.post("../employeesSelectMonthlyPerformanceStatistics.action", {
		mpsStaffId : row.userId,
		mpsType : timeType[$('#timeSelect').val()]
	}, function(data) {
		if (data < 0 || data == '' || data.length == 0) {
			var noData = [];
			$('#performanceDg').datagrid({
				data : noData,
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
		} else {
			$("#performanceDg").datagrid("loadData", data);
		}
	}, "json");
}

// 业绩明细
function queryPerfDetail(page, type) {
	var startNum = (parseInt(page) - 1) * 14;
	var endNum = 14;
	var timeInterval = getInterval();
	var row = $('#employeesDg').datagrid('getSelected');
	$.post("../getPerfDetail.action", {
		jpdUserId : row.userId,
		startDate :timeInterval[0],
		endDate :timeInterval[1],
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data < 0 || data == '' || data.length == 0) {
			sourcePage(0, 0, 1);
			var noData = [];
			$('#perfDetailDg').datagrid({
				data : noData,
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 1);
			}
			for(var i in data){
				data[i].jpdTime = data[i].jpdTime.split(' ')[0];
			}
			$("#perfDetailDg").datagrid("loadData", data);
		}
	}, "json");
}

//业绩明细时间
function getInterval(){
	var month = $('#chooseMonth').val();
	if(month == '' || month == null){
		return ['',''];
	}else{
		var t = month.split('-');
		var begin = new Date(parseInt(t[0]),parseInt(t[1]),1).toLocaleDateString();
		var end = new Date(parseInt(t[0]),parseInt(t[1])+1,0).toLocaleDateString();
		return [begin, end];
	}
}

// 分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 19);
		$("#employeesPage").remove();
		$("#employeesPageDiv")
				.append(
						"<div class='tcdPageCode' id='employeesPage' style='text-align:center;'></div>");
		$("#employeesPage").createPage({
			onePageNums : 19,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryUserTable(p, 1);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 14);
		$("#perfDetailPage").remove();
		$("#perfDetailPageDiv")
				.append(
						"<div class='tcdPageCode' id='perfDetailPage' style='text-align:center;'></div>");
		$("#perfDetailPage").createPage({
			onePageNums : 14,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryPerfDetail(p, 1);
				}
			}
		});
	}
}