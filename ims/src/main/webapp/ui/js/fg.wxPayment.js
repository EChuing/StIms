$(function() {
	queryWxPayment(1,0);
	$('#wxPaymenDg').datagrid({
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			var row = $("#wxPaymenDg").datagrid("getSelected");
			if(row){
				$(".wxPayment_index").val(rowIndex);
				readonlyWxPament(row);
			}
		}
	});
});

// 查询微信账单记录
function queryWxPayment(page, type) {
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();
	
	$.post("../selectWxPayment.action", {
		startNum			: startNum,
		endNum 				: endNum,
		addCommunity		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		splitFlag			: 1,
	}, function(data) {
		if (data.code<0) {
			$('#wxPaymenDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryWxPayment","wxPaymen");
			}else{
				notCountPage(page, 0 ,"queryWxPayment","wxPaymen");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryWxPayment","wxPaymen");
			}else{
				notCountPage(page, 1 , "queryWxPayment","wxPaymen");
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]=='';
					}
				}
				data[i].addCommunity = data[i].addCommunity+ " " + data[i].addBuilding+ " " +data[i].addDoorplateno ;
			}
			$("#wxPaymenDg").datagrid("loadData", data);
		}
	}, "json");
}
//分页统计数据
function getwxPaymenPageCount(page, type) {
	var pageNum = 20;
	
	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();
	
	$.post("../queryLivingfeeRecordsCommon.action", {
		addCommunity		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		splitFlag			: 0,
	}, function(data) {
		if (data.code<0 ||data.body[0].totalNum==0) {
			var countJson = {
					totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"wxPaymen",0);
		} else {
			data=data.body;
			var countJson = {
					totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"wxPaymen",0);
		}
	}, "json");
}

function readonlyWxPament(row){
	$("#wxPaymenDlg").dialog({
		title : '微信支付详情',
		top : getTop(400),
		left : getLeft(660),
		width : 660,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$(".xwtable3 span").text("");
	for(var i in row){
		$("#read"+i).text(row[i]);
		if(i=="wxpTotalFee"){
			$("#readwxpTotalFee").text(accDiv(row[i],100)+"元");
		}
		if(i=="wxpState"){
			if(row[i]=="未支付"){
				$("#readwxpState").css("color","red");
			}else if(row[i]=="已支付"){
				$("#readwxpState").css("color","blue");
			}
		}
	}
	var wxpExpenseRecord = eval("("+row.wxpExpenseRecord.getRealJsonStr()+")");
	for(var i in wxpExpenseRecord){
		$("#read"+i).text(wxpExpenseRecord[i]);
	}
	var waterSub = accSub(wxpExpenseRecord.waterNum,wxpExpenseRecord.lastwater);
	var ectricitySub = accSub(wxpExpenseRecord.electritNum,wxpExpenseRecord.lastelectrit);
	var gasSub = accSub(wxpExpenseRecord.gasNum,wxpExpenseRecord.lastgas);
	
	waterSub = waterSub<0 ? 0 : waterSub;
	ectricitySub = ectricitySub<0 ? 0 :ectricitySub;
	gasSub = gasSub<0 ? 0 :gasSub;
	
	$("#readwaterSub").text(waterSub);
	$("#readelectricitySub").text(ectricitySub);
	$("#readgasSub").text(gasSub);
	
	$("#wxPaymenDlg").dialog("open");
}
//上一条下一条
function laterOrNext(type) {
	var dataIndex = $(".wxPayment_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".wxPayment_index").val(num);
			changeData = $('#wxPaymenDg').datagrid('getData').rows[num];
			$('#wxPaymenDg').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#wxPaymenDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".wxPayment_index").val(num);
			changeData = $('#wxPaymenDg').datagrid('getData').rows[num];
			$('#wxPaymenDg').datagrid('selectRow',num);
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
		readonlyWxPament(changeData);
	}
}
function formatwxpTotalFee(value, row, index){
	if (row.wxpState =="已支付") {
		return "<a style='text-decoration:none;color:blue;'>" + accDiv(row.wxpTotalFee,100) + "<a>";
	} else if (row.wxpState ="未支付") {
		return "<a style='text-decoration:none;color:red;'>" + accDiv(row.wxpTotalFee,100)+ "<a>";
	}
}
function formatwxpState(value, row, index){
	if (row.wxpState =="已支付") {
		return "<a style='text-decoration:none;color:blue;'>" + row.wxpState + "<a>";
	} else if (row.wxpState ="未支付") {
		return "<a style='text-decoration:none;color:red;'>" + row.wxpState + "<a>";
	}
}