$(function(){
	//设置初始搜索框日期为最近一个月
	var start = new Date();
	var end = new Date();
	start.setMonth(start.getMonth() - 1);
	$("#searchTimeStart").val(start.format('yyyy-MM-dd'));
	$("#searchTimeEnd").val(end.format('yyyy-MM-dd'));
	//初始化表格
	var frozenColumns = [ {
		field : 'fddDate',
		title : '日期',
		width : '100',
		align : 'center'
	}, {
		field : 'fddIncome',
		title : '总收入',
		width : '100',
		align : 'center'
	}, {
		field : 'fddExpenditure',
		title : '总支出',
		width : '100',
		align : 'center'
	},  {
		field : 'fddDifference',
		title : '总盈亏',
		width : '100',
		align : 'center'
	}];
	$('#financialDg').datagrid({
		frozenColumns : [ frozenColumns ],//这些列固定在表格最左边，其他列动态生成
		width : '100%',
		height : '408px',
		singleSelect : true,
		autoRowHeight : false,
		fitColumns : true,
		pageSize : 10,
		scrollbarSize : 0,
		showPageList : false,
		onDblClickRow : function(rowIndex, rowData) {
			financialDlg(rowData);
		}
	});
	$('#financialSmallTypeDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			skipToFinancial(rowData);
		}
	});
	queryFinancial(1);
})

//分页统计总条数
function getfinancialPageCount(page){
	var pageSize = 15;
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	$.get('../queryFinancialDailyData.action', {
		startTime	: startTime,
		endTime		: endTime
	}, function(data){
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"financial",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"financial",0);
		}
	});
}

//查数据
function queryFinancial(page){
	var pageSize = 15;
	var pageNum = (parseInt(page) - 1) * pageSize;
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	$.get('../queryFinancialDailyData.action', {
		startNum	: pageNum,
		endNum 		: pageSize,
		startTime	: startTime,
		endTime		: endTime
	}, function(data){
		if(data.code < 0){
			// initPage(0, pageSize, 0);
			$('#financialDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryFinancial","financial");
			}else{
				notCountPage(page, 0 ,"queryFinancial","financial");
			}
		}else{
			var data = data.body;
			//加载第一页数据时进行分页初始化
			// if (page == 1) {
			// 	initPage(data[0].totalNum, pageSize, 0);
			// }
			if(data.length<pageSize){
				notCountPage(page, 2 , "queryFinancial","financial");
			}else{
				notCountPage(page, 1 , "queryFinancial","financial");
			}
			//动态生成各财务大类盈亏列
			var financial = JSON.parse(data[0].fddDetail.getRealJsonStr());
			var bigType = [];
			for (var i in financial) {
				if (financial[i].smallType == undefined) {
					bigType.push(financial[i]);
				}
			}
			var columns = [];
			for(var i in bigType){
				var column = {};
				column.field = 'bigType' + i;
				column.title = bigType[i].bigType + '盈亏';
				column.width = '100';
				column.align = 'center';
				columns.push(column);
			}
			$('#financialDg').datagrid({
				columns: [columns]
			});
			//将各财务大类的盈亏映射到对应的列中
			for (var i in data) {
				financial = JSON.parse(data[i].fddDetail.getRealJsonStr());
				bigType = [];
				for (var j in financial) {
					if (financial[j].smallType == undefined) {
						bigType.push(financial[j]);
					}
				}
				for (var k in bigType) {
					var key = 'bigType' + k;
					data[i][key] = bigType[k].difference;
				}
			}
			$('#financialDg').datagrid('loadData', data);
		}
	});	
}

//双击弹窗
function financialDlg(row){
	var detail = JSON.parse(row.fddDetail.getRealJsonStr());
	//加载数据和打开对话框
	loadDataOpenDlg(detail);
}
//加载数据和打开对话框
function loadDataOpenDlg(detail) {
	//拆分财务大类、小类
	var bigType = [];
	var smallType = [];
	for (var i in detail) {
		if (detail[i].smallType == undefined) {
			bigType.push(detail[i]);
		} else {
			smallType.push(detail[i]);
		}
	}
	//对话框初始化
	$('#financialDlg').dialog({
		title : '企业盈亏',
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
	$('#financialBigTypeDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			smallTypeDg(rowData.bigType, detail);
		}
	});
	var financial = {};
	financial.income = 0.00;
	financial.expenditure = 0.00;
	financial.difference = 0.00;
	for (var i in bigType) {//多天的数据
		financial.income += bigType[i].income;
		financial.expenditure += bigType[i].expenditure;
		financial.difference += bigType[i].difference;
		//保留两位小数
		financial.income = Number(financial.income.toFixed(2));
		financial.expenditure = Number(financial.expenditure.toFixed(2));
		financial.difference = Number(financial.difference.toFixed(2));
	}
	var total = {
		bigType: '合计',
		income: financial.income,
		expenditure: financial.expenditure,
		difference: financial.difference
	};
	bigType.push(total);
	$('#financialBigTypeDg').datagrid('loadData', bigType);
	$('#financialBigTypeDg').datagrid('selectRow', 0);
	if (detail[0] != undefined) {
		smallTypeDg(detail[0].bigType, detail);
	}
	$('#financialDlg').dialog('open');
}
//小类
function smallTypeDg(bigType, detail) {
	var smallType = [];
	for (var i in detail) {
		if (detail[i].bigType == bigType && detail[i].smallType != undefined) {
			smallType.push(detail[i]);
		}
	}
	$('#financialSmallTypeDg').datagrid('loadData', smallType);
}

//点击按钮结果汇总
function getTotalResult() {
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	showLoading();
	$.get('../queryFinancialDailyData.action', {
		startTime	: startTime,
		endTime		: endTime
	}, function(data){
		if(data.code < 0){
			hideLoading();
			myTips(data.msg, 'error');
		}else{
			//计算汇总后的结果
			var financial = sumFinancial(data);
			var detail = financial.fddDetail;
//			var total = {
//				bigType: '合计',
//				income: financial.fddIncome,
//				expenditure: financial.fddExpenditure,
//				difference: financial.fddDifference
//			};
//			detail.push(total);
			//加载数据和打开对话框
			loadDataOpenDlg(detail);
			hideLoading();
		}
	});
}
//计算汇总后的结果
function sumFinancial(data) {
	data = data.body;
	//数据初始化
	var financial = {};
	financial.fddIncome = 0.00;
	financial.fddExpenditure = 0.00;
	financial.fddDifference = 0.00;
	financial.fddDetail = JSON.parse(data[0].fddDetail.getRealJsonStr());
	for (var i in financial.fddDetail) {
		financial.fddDetail[i].income = 0.00;
		financial.fddDetail[i].expenditure = 0.00;
		financial.fddDetail[i].difference = 0.00;
	}
	for (var i in data) {
		data[i].fddDetail = JSON.parse(data[i].fddDetail.getRealJsonStr());
	}
	//数据合并汇总
	for (var i in data) {//多天的数据
		financial.fddIncome += data[i].fddIncome;
		financial.fddExpenditure += data[i].fddExpenditure;
		financial.fddDifference += data[i].fddDifference;
		//保留两位小数
		financial.fddIncome = Number(financial.fddIncome.toFixed(2));
		financial.fddExpenditure = Number(financial.fddExpenditure.toFixed(2));
		financial.fddDifference = Number(financial.fddDifference.toFixed(2));
		nextType:
		for (var j in financial.fddDetail) {//汇总后的财务详情
			for (var k in data[i].fddDetail) {//一天的财务详情
				if (financial.fddDetail[j].bigType == data[i].fddDetail[k].bigType 
					&& financial.fddDetail[j].smallType == data[i].fddDetail[k].smallType) {
					financial.fddDetail[j].income += data[i].fddDetail[k].income;
					financial.fddDetail[j].expenditure += data[i].fddDetail[k].expenditure;
					financial.fddDetail[j].difference += data[i].fddDetail[k].difference;
					//保留两位小数
					financial.fddDetail[j].income = Number(financial.fddDetail[j].income.toFixed(2));
					financial.fddDetail[j].expenditure = Number(financial.fddDetail[j].expenditure.toFixed(2));
					financial.fddDetail[j].difference = Number(financial.fddDetail[j].difference.toFixed(2));
					continue nextType;
				}
			}
		}
	}
	return financial;
}

/**
 * 分页初始化
 */
function initPage(totalNum, onePageNums, type) {
	var pageCount = Math.ceil(totalNum / onePageNums);
	if (type == 0) {
		$("#financialPage").remove();
		$("#financialPageDiv").append("<div class='tcdPageCode' id='financialPage' style='text-align:center;'></div>");
		$("#financialPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					queryFinancial(p);
				}
			}
		});
	}
}
//跳转查看收支记录
function skipToFinancial(rowData){
	var row = $('#financialSmallTypeDg').datagrid('getSelected');
	var skipJspName = '收支管理';
	var skipJspUrl = 'fg_financial';
	var skipJspIcon = 'shouzhiluru';
	var skipInputId = [];
	var skipInputVal = [];
	
	skipInputId.push('searchJfCheckInTimeStart');
	skipInputVal.push($('#searchTimeStart').val());
	
	skipInputId.push('searchJfCheckInTimeEnd');
	skipInputVal.push($('#searchTimeEnd').val());
	
	skipInputId.push('financilSearchJfBigType');
	skipInputVal.push(rowData.bigType);
	
	skipInputId.push('financilSearchJfAccountingSpecies');
	skipInputVal.push(rowData.smallType);
	
	for (var i in skipInputVal) {
		parent._skipToChildJson.push({
			target:"i",
			id:skipInputId[i],
			jsonVal:skipInputVal[i],
		});
	}
	
	window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
}