var storeAndDept = [], achievementData, financialData;
$(function() {
	if($('#searchYear').val()!=''){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		$('#searchYear').val(year);
		$('#searchMonth').val(month);
	}
	queryAchievementAndFinancial();
	$('#storefrontDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			queryDepartment(storeAndDept, achievementData);
		}
	});
	$('#departmentDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			queryUser(achievementData);
		}
	});
	$('#userDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			financialDlg(rowData);
		}
	});
	$('#financialDg').datagrid();
});

//查询用户绩效数据、房屋财务数据
function queryAchievementAndFinancial(){
	var year = $("#searchYear").val();
	var month = $("#searchMonth").val();
	$.post("../queryAchievementData.action", {
		year : year,
		month : month
	}, function(data){
		if(data.code < 0){
			$('#storefrontDg').datagrid('loadData', []);
			$('#departmentDg').datagrid('loadData', []);
			$('#userDg').datagrid('loadData', []);
			$.messager.alert('通知', data.msg, 'error');
		}else{
			achievementData = data.body;
			for (var i in achievementData) {
				achievementData[i].adRentLossRate = (achievementData[i].adRentLossRate * 100).toFixed(2) + '%';
				achievementData[i].adVacantRate = (achievementData[i].adVacantRate * 100).toFixed(2) + '%';
				var item = {};
				item.adOfficeId = achievementData[i].adOfficeId;
				item.adOfficeName = achievementData[i].adOfficeName;
				item.adDeptId = achievementData[i].adDeptId;
				item.adDeptName = achievementData[i].adDeptName;
				storeAndDept.push(item);
			}
			for (var i = 0; i < storeAndDept.length; i++) {
				for (var j = 1; j < storeAndDept.length; j++) {
					if (i != j) {
						if (storeAndDept[i].adOfficeId == storeAndDept[j].adOfficeId
							&& storeAndDept[i].adOfficeName == storeAndDept[j].adOfficeName
							&& storeAndDept[i].adDeptId == storeAndDept[j].adDeptId
							&& storeAndDept[i].adDeptName == storeAndDept[j].adDeptName) {
							storeAndDept.splice(j, 1);
						}
					}
				}
			}
			var hash = {};
			var storefront = storeAndDept.reduce(function(item, next) {
			    hash[next.adOfficeId] ? '' : hash[next.adOfficeId] = true && item.push(next);
			    return item
			}, [])
			$('#storefrontDg').datagrid('loadData', storefront);
			$('#storefrontDg').datagrid('selectRow', 0);
			queryDepartment(storeAndDept, achievementData);
			
		}
	});
	$.post("../queryFinancialData.action", {
		year : year,
		month : month
	}, function(data){
		if(data.code < 0){
			$('#financialDg').datagrid('loadData', []);
			$.messager.alert('通知', data.msg, 'error');
		}else{
			financialData = data.body;
			for (var i in financialData) {
				financialData[i].fdRentLossRate = (financialData[i].fdRentLossRate * 100).toFixed(2) + '%';
				financialData[i].fdVacantRate = (financialData[i].fdVacantRate * 100).toFixed(2) + '%';
			}
		}
	});
}

function queryDepartment(storeAndDept, achievementData){
	var row = $('#storefrontDg').datagrid('getSelected');
	var department = [];
	for (var i in storeAndDept) {
		if (row.adOfficeId == storeAndDept[i].adOfficeId) {
			department.push(storeAndDept[i]);
		}
	}
	$('#departmentDg').datagrid('loadData', department);
	$('#departmentDg').datagrid('selectRow', 0);
	queryUser(achievementData);
}

function queryUser(achievementData){
	var row = $('#departmentDg').datagrid('getSelected');
	var user = [];
	for (var i in achievementData) {
		if (row.adDeptId == achievementData[i].adDeptId) {
			user.push(achievementData[i]);
		}
	}
	$('#userDg').datagrid('loadData', user);
	$('#userDg').datagrid('selectRow', 0);
}


function financialDlg(row){
	var financial = [];
	for (var i in financialData) {
		if (financialData[i].fdEmpId == row.adEmpId) {
			financial.push(financialData[i]);
		}
	}
	for (var i in financial) {
		financial[i].address = financial[i].fdAddCommunity + ' ' + financial[i].fdAddBuilding + ' ' + financial[i].fdAddDoorplateno;
	}
	$('#financialDlg').dialog({
		title : '房屋财务数据统计',
		top : getTop(500),
		left : getLeft(900),
		width : 900,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onclose : function () {
			
		}
	});
	$('#financialDg').datagrid('loadData', financial);
	$('#financialDlg').dialog('open');
}