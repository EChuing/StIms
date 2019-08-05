$(function(){
	var start = new Date();
	var end = new Date();
	start.setDate(start.getDate() - 1);
	$("#searchTimeStart").val(start.format('yyyy-MM-dd'));
	$("#searchTimeEnd").val(end.format('yyyy-MM-dd'));
	$('#ecologyDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			ecologyDlg(rowData);
		}
	});
	$('#ecologySmallTypeDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			skipToFinancial(rowData);
		}
	});
	$("#searchCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$("#searchCity").val(0);
	queryEcology(1);
	for (var i in _loginCompanyRentDistrict) {
	    $('#searchDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
})

//分页统计总条数
function getecologyPageCount(page){
	var pageSize = 15;
	var qCity = $("#searchCity").find("option:selected").text();
	var qDistrict = $("#searchDistrict").find("option:selected").text();
	var qZone = $("#searchZone").find("option:selected").text();
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	$.get('../queryFinancialEcologyByDate.action', {
		feHsAddCity			: qCity,
		feHsAddDistrict		: qDistrict,
		feHsAddZone			: qZone,
		feHsAddCommunity	: qCommunity,
		feHsAddBuilding		: qBuilding,
		feHsAddDoorplateno	: qDoorplateno,
		startTime			: startTime,
		endTime				: endTime
	}, function(data){
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"ecology",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"ecology",0);
		}
	});
}

function queryEcology(page){
	var onePageNums = 15;
	var startNum = (parseInt(page) - 1) * onePageNums;
	var qCity = $("#searchCity").find("option:selected").text();
	var qDistrict = $("#searchDistrict").find("option:selected").text();
	var qZone = $("#searchZone").find("option:selected").text();
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	showLoading();
	$.get('../queryFinancialEcologyByDate.action', {
		startNum			: startNum,
		endNum 				: onePageNums,
		feHsAddCity			: qCity,
		feHsAddDistrict		: qDistrict,
		feHsAddZone			: qZone,
		feHsAddCommunity	: qCommunity,
		feHsAddBuilding		: qBuilding,
		feHsAddDoorplateno	: qDoorplateno,
		startTime			: startTime,
		endTime				: endTime
	}, function(data){
		hideLoading();
		if(data.code < 0){
			// initPage(0, onePageNums, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryEcology","ecology");
			}else{
				notCountPage(page, 0 ,"queryEcology","ecology");
			}
			$('#ecologyDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			// if (page == 1) {
			// 	initPage(data.body[0].totalNum, onePageNums, 0);
			// }
			if(data.body.length<endNum){
				notCountPage(page, 2 , "queryEcology","ecology");
			}else{
				notCountPage(page, 1 , "queryEcology","ecology");
			}
			var list = [];
			for (var i in data.body) {
				var ecology = data.body[i];
				ecology.detailAddress = ecology.feHsAddCommunity + ' ' + ecology.feHsAddBuilding + ' ' + ecology.feHsAddDoorplateno;
				list.push(ecology);
			}
			$('#ecologyDg').datagrid('loadData', list);
		}
	});	
}

//双击弹窗
function ecologyDlg(row){
	//对话框初始化
	$('#ecologyDlg').dialog({
		title : '房屋生态统计',
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
	$('#ecologyDlg').dialog('open');
	var detail = JSON.parse(row.feEcology.getRealJsonStr());
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	$.get('../queryFinancialEcology.action', {
		feHsId		: row.feHsId,
		startTime	: startTime,
		endTime		: endTime
	}, function(data){
		if(data.code < 0){
			$('#ecologyBigTypeDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			var allEcology = [];
			for (var i in data.body) {
				var ecology = JSON.parse(data.body[i].feEcology.getRealJsonStr());
				for (var j in ecology) {
					allEcology.push(ecology[j]);

				}
			}
			//提取收支分类
			var financialTypes = extractFinancialType(allEcology);
			//model包含所有的收支大小分类
			var model = financialTypes;
			for (var i in model) {
				model[i].income = 0;
				model[i].expenditure = 0;
				model[i].difference = 0;
			}
			//将一个时间段内的所有数据汇总到model
			for (var i in allEcology) {
				for (var j in model) {
					if (allEcology[i].bigType == model[j].bigType && allEcology[i].smallType == model[j].smallType) {
						model[j].income += allEcology[i].income;
						model[j].expenditure += allEcology[i].expenditure;
						model[j].difference += allEcology[i].difference;
					}
				}
			}
			$('#ecologyBigTypeDg').datagrid({
				onClickRow : function(rowIndex, rowData) {
					smallTypeDg(rowData.bigType, model);
				}
			});
			var bigType = [];
			var smallType = [];
			for (var i in model) {
				if (model[i].smallType == undefined) {
					bigType.push(model[i]);
				} else {
					smallType.push(model[i]);
				}
			}
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
			$('#ecologyBigTypeDg').datagrid('loadData', bigType);
			$('#ecologyBigTypeDg').datagrid('selectRow', 0);
			if (model[0] != undefined) {
				smallTypeDg(model[0].bigType, model);
			}
			$('#ecologyBigTypeDg').datagrid('loadData', bigType);
		}
	});
}
//小类
function smallTypeDg(bigType, model) {
	var smallType = [];
	for (var i in model) {
		if (model[i].bigType == bigType && model[i].smallType != undefined) {
			smallType.push(model[i]);
		}
	}
	$('#ecologySmallTypeDg').datagrid('loadData', smallType);
}
//提取收支分类
function extractFinancialType(financial){
	var list = [];
	var bigList = [];
	var smallList = [];
	for (var i in financial) {
		if (financial[i].smallType == undefined) {
			var bigType = financial[i].bigType;
			bigList.push(bigType);
		} else {
			var bigType = financial[i].bigType;
			var smallType = financial[i].smallType;
			var type = [];
			type[0] = bigType;
			type[1] = smallType;
			smallList.push(type);
		}
	}
	//大分类去重
	var bigTypes = [];
	for (var i in bigList) {
		if (bigTypes.indexOf(bigList[i]) == -1) {
			bigTypes.push(bigList[i]);
		}
	}
	//小分类去重
	var smallTypes = [];
	var hash = {};
	for (var i in smallList) {
		if (!hash[smallList[i]]) {
			smallTypes.push(smallList[i]);
			hash[smallList[i]] = true;
		}
	}
	//大小分类数组转对象
	var bigTypesJsonArr = [];
	for(var i in bigTypes){
		var bigTypesJsonObj = {};
		bigTypesJsonObj.bigType = bigTypes[i];
		bigTypesJsonArr.push(bigTypesJsonObj);
	}
	var smallTypesJsonArr = [];
	for(var i in smallTypes){
		var smallTypesJsonObj = {};
		smallTypesJsonObj.bigType = smallTypes[i][0];
		smallTypesJsonObj.smallType = smallTypes[i][1];
		smallTypesJsonArr.push(smallTypesJsonObj);
	}
	list = bigTypesJsonArr.concat(smallTypesJsonArr);
	return list;
}
/*
//双击弹窗
function ecologyDlg(row){
	$('#ecologyDlg').dialog({
		title : '房屋生态统计',
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
	var bigType = [];
	var financial = JSON.parse(row.feEcology.getRealJsonStr());
	for (var i in financial) {
		bigType.push(financial[i]);
	}
	//初始化
	for (var i in bigType) {
		bigType[i].income = 0;
		bigType[i].expenditure = 0;
		bigType[i].difference = 0;
	}
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	$.get('../queryFinancialEcology.action', {
		feHsId		: row.feHsId,
		startTime	: startTime,
		endTime		: endTime
	}, function(data){
		if(data.code < 0){
			$('#ecologyBigTypeDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			for (var i in data.body) {
				var ecology = JSON.parse(data.body[i].feEcology.getRealJsonStr());
				for (var j in ecology) {
					for (var k in bigType) {
						if (bigType[k].bigType == ecology[j].bigType) {
							bigType[k].income += ecology[j].income;
							bigType[k].expenditure += ecology[j].expenditure;
							bigType[k].difference += ecology[j].difference;
						}
					}
				}
			}
			for (var i in bigType) {
				bigType[i].income = Number(bigType[i].income.toFixed(2));
				bigType[i].expenditure = Number(bigType[i].expenditure.toFixed(2));
				bigType[i].difference = Number(bigType[i].difference.toFixed(2));
			}
			$('#ecologyBigTypeDg').datagrid('loadData', bigType);
		}
		$('#ecologyDlg').dialog('open');
	});
}*/
//点击按钮结果汇总
function getTotalResult() {
	var qCity = $("#searchCity").find("option:selected").text();
	var qDistrict = $("#searchDistrict").find("option:selected").text();
	var qZone = $("#searchZone").find("option:selected").text();
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	$.get('../queryTotalFinancialEcologyByDate.action', {
		startTime			: startTime,
		endTime				: endTime, 
		feHsAddCity			: qCity,
		feHsAddDistrict		: qDistrict,
		feHsAddZone			: qZone,
		feHsAddCommunity	: qCommunity,
		feHsAddBuilding		: qBuilding,
		feHsAddDoorplateno	: qDoorplateno
	}, function(data){
		if(data.code < 0){
			$('#totalEcologyDlg').html(data.msg);
		}else{
			$('#totalEcologyDlg').dialog({
				title : '结果汇总',
				top : getTop(250),
				left : getLeft(650),
				width : 650,
				height : 250,
				closed : true,
				cache : false,
				modal : true,
				onclose : function () {
					
				}
			});
			for (var i in data.body[0]) {
				$('#'+i).html(data.body[0][i]);
			}
			$('#totalEcologyDlg').dialog('open');
		}
	});
}

/**
 * 分页初始化
 */
function initPage(totalNum, onePageNums, type) {
	var pageCount = Math.ceil(totalNum / onePageNums);
	if (type == 0) {
		$("#ecologyPage").remove();
		$("#ecologyPageDiv").append("<div class='tcdPageCode' id='ecologyPage' style='text-align:center;'></div>");
		$("#ecologyPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					queryEcology(p);
				}
			}
		});
	}
}
//跳转查看收支记录
function skipToFinancial(rowData){
	var row = $('#ecologyDg').datagrid('getSelected');
	var skipJspName = '收支管理';
	var skipJspUrl = 'fg_financial';
	var skipJspIcon = 'shouzhiluru';
	var skipInputId = [];
	var skipInputVal = [];
	
	skipInputId.push('searchCommunity');
	skipInputVal.push(row.feHsAddCommunity);
	
	skipInputId.push('sourceBuilding');
	skipInputVal.push(row.feHsAddBuilding);
	
	skipInputId.push('sourceDoorplateno');
	skipInputVal.push(row.feHsAddDoorplateno);
	
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