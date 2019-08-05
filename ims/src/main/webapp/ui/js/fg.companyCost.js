$(function(){
	var start = new Date();
	var end = new Date();
	start.setMonth(start.getMonth() - 1);
	$("#searchTimeStart").val(start.format('yyyy-MM-dd'));
	$("#searchTimeEnd").val(end.format('yyyy-MM-dd'));
	$('#projectDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			projectDlg(rowData);
		}
	});
	$('#projectBigTypeDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			skipToFinancial(rowData);
		}
	});
	queryProject();
});
//查项目
function queryProject() {
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	$.get('../getCompanyCost.action', {
		startTime	: startTime,
		endTime		: endTime
	}, function(data){
		if(data.code < 0){
			$('#projectDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			var data = data.body;
			//汇总结果
			var hpIds = data[0].hpIds;
			var result = [];
			var bigType = [];
			//查大分类
			for (var i in data) {
				if (bigType.indexOf(data[i].jfBigType) < 0) {
					bigType.push(data[i].jfBigType);
				}
			}
			//初始化数据格式
			for (var i in hpIds) {
				var item = {};
				item.hpId = hpIds[i];
				item.totalIncome = 0.00;
				item.totalExpenditure = 0.00;
				item.totalDifference = 0.00;
				item.bigType = [];
				for (var i in bigType) {
					var obj = {};
					obj.bigType = bigType[i];
					obj.income = 0.00;
					obj.expenditure = 0.00;
					obj.difference = 0.00;
					item.bigType.push(obj);
				}
				result.push(item);
			}
			//计算汇总
			for (var i in result) {
				for (var j in data) {
					if (data[j].jfSumMoney == undefined) {
						data[j].jfSumMoney = 0.00;
					}
					if (result[i].hpId == data[j].jfHouseId) {
						result[i].hpName = data[j].keyAdministrator;
						result[i].hpType = data[j].addCity;
						if (data[j].jfNatureOfThe == '收入') {
							result[i].totalIncome = mySum(result[i].totalIncome, data[j].jfSumMoney);
							for (var k in result[i].bigType) {
								if (result[i].bigType[k].bigType == data[j].jfBigType) {
									result[i].bigType[k].income = mySum(result[i].bigType[k].income, data[j].jfSumMoney);
									result[i].bigType[k].difference = mySub(result[i].bigType[k].income, result[i].bigType[k].expenditure);
								}
							}
						} else if (data[j].jfNatureOfThe == '支出') {
							result[i].totalExpenditure = mySum(result[i].totalExpenditure, data[j].jfSumMoney);
							for (var k in result[i].bigType) {
								if (result[i].bigType[k].bigType == data[j].jfBigType) {
									result[i].bigType[k].expenditure = mySum(result[i].bigType[k].expenditure, data[j].jfSumMoney);
									result[i].bigType[k].difference = mySub(result[i].bigType[k].income, result[i].bigType[k].expenditure);
								}
							}
						}
						result[i].totalDifference = mySub(result[i].totalIncome, result[i].totalExpenditure);
					}
				}
			}
			var totalIncome = 0.00;
			var totalExpenditure = 0.00;
			var totalDifference = 0.00;
			for (var i = 0; i < result.length; i++) {
				totalIncome = mySum(totalIncome, result[i].totalIncome);
				totalExpenditure = mySum(totalExpenditure, result[i].totalExpenditure);
				totalDifference = mySub(totalIncome, totalExpenditure);
				if (result[i].hpName == undefined) {
					result.splice(i--, 1);
				}
			}
			$('#totalIncome').html(totalIncome);
			$('#totalExpenditure').html(totalExpenditure);
			$('#totalDifference').html(totalDifference);
			$('#projectDg').datagrid('loadData', result);
		}
	});	
}
//详细信息
function projectDlg(rowData) {
	$('#projectDlg').dialog({
		title : '成本统计',
		top : getTop(350),
		left : getLeft(600),
		width : 600,
		height : 350,
		closed : true,
		cache : false,
		modal : true,
		onclose : function () {
			
		}
	});
	$('#projectBigTypeDg').datagrid('loadData', rowData.bigType);
	$('#projectDlg').dialog('open');
}
//跳转查看收支记录
function skipToFinancial(rowData){
	var skipJspName = '收支管理';
	var skipJspUrl = 'fg_financial';
	var skipJspIcon = 'shouzhiluru';
	var skipInputId = [];
	var skipInputVal = [];
	var skipSelectId = [];
	var skipSelectVal = [];
	
	skipInputId.push('searchJfCheckInTimeStart');
	skipInputVal.push($('#searchTimeStart').val());
	
	skipInputId.push('searchJfCheckInTimeEnd');
	skipInputVal.push($('#searchTimeEnd').val());
	
	skipInputId.push('financilSearchJfBigType');
	skipInputVal.push(rowData.bigType);
	
	skipSelectId.push('searchJfTheOwnershipType');
	skipSelectVal.push(3);
	
	for (var i in skipInputVal) {
		parent._skipToChildJson.push({
			target:"i",
			id:skipInputId[i],
			jsonVal:skipInputVal[i],
		});
	}
	for (var i in skipSelectVal) {
		parent._skipToChildJson.push({
			target:"s",
			id:skipSelectId[i],
			jsonVal:skipSelectVal[i],
		});
	}
	
	window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
}