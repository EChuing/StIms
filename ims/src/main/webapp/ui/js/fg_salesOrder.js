var _goodsList = [];
var _goodsList2 = [];
var daxiao = "video/tts.mp3";
var daxiao = new Audio(daxiao);
var _checkDoCheck = false;
var shopAccount;
var shopCashAccount;
$(function(){
	listNewOrder(1,0);
	
	listUndoneOrder(1,0);
	
	listGoods();
	SNListGoods();
	
	getSetUp();
	
	$("#orderDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$("#orderDetail_index").val(rowIndex);
			openOrderDetail(rowData);
		}
	});
	
	$("#newOrderDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			for(var i in rowData){
	    		$('#p'+i).val(rowData[i])
	    	}
			$('#cocId').val(rowData.cgbCocId);
			listOrderGoods(1,0,rowData['id']);
			matchButtun(rowData['cgbState'],rowData['orderType']);
		}
	});
	
	$("#undoneOrderDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			for(var i in rowData){
	    		$('#p'+i).val(rowData[i])
	    	}
			listOrderGoods(1,0,rowData['id']);
			matchButtun(rowData['cgbState'],rowData['orderType'])
		}
	});
	$("#orderGoodsDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			if(rowData.cgSn == 1 && rowData.cgbState == '已接单'){
				openAddSN(rowIndex);
			}
			if(rowData.cgSn == 1 && rowData.cgbState == '配送中'){
				openGoodsSN(rowIndex,0);
			}
		}
	});
	$("#salesGoodsDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			if(rowData.cgSn == 1){
				openGoodsSN(rowIndex,1);
			}
		}
	});
	
	$("#sceneGoodsDg").datagrid({
		columns:[[
//			{	
//				field:'Lid',
//				title:'序号',
//				width:10,
//				formatter: function(val,rec,index){
//					   var op = $('#sceneGoodsDg').datagrid('options');
//					   return op.pageSize * (op.pageNumber - 1) + (index + 1);
//				}
//			},
			{	
				field:'cgCode',
				title:'商品编码',
				width:10,
				align:'center'
			},
			{	
				field:'cgName',
				title:'商品名称',
				width:10,
				align:'center'
			},
			{	
				field:'cgOriginalPrice',
				title:'原价',
				width:10,
				align:'center'
			},
			{	
				field:'cgCurrentPrice',
				title:'现价',
				width:10,
				align:'center'
			},
			{	
				field:'num',
				title:'数量',
				width:10,
				align:'center',
				editor : {
					type : "numberbox",
					options : {
						precision : 0
					}
				},
				formatter: function(val,row,index){
				    row.num = parseInt(val);
					return row.num;
				}
			},
			{	
				field:'totalPrice',
				title:'小计',
				width:10,
				align:'center',
				formatter: function(val,row,index){
				   row.totalPrice = row.cgCurrentPrice * row.num;
				   return (row.cgCurrentPrice * row.num).toFixed(2);
				}
			},
			{
				field : 'deleteAdd',
				title : '删除',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' onclick=\"myDeleteRows('"+row.id+"','id','sceneGoodsDg',0);sumTotalPrice();\">删除</a>";
				}
			}
			
		]],
		onDblClickRow : function(rowIndex, rowData) {
			for(var i in rowData){
	    		$('#p'+i).val(rowData[i])
	    	}
			listOrderGoods(1,0,rowData['id']);
			matchButtun(rowData['cgbState'],rowData['orderType'])
		},
		onClickCell : onClickCell1,//点击一个单元格的时候触发
	});
	
	$("#addGoodsSnTable").datagrid(
			{
				columns : [[
					{
						field : 'sn',
						title : 'SN码',
						width : 35,
						align : 'center'
					},
					{
						field : 'delect',
						title : '删除',
						width : 15,
						align : 'center',
						formatter : function(value, row, index) {
							return "<a href='#' onclick=\"myDeleteRows('"+row.sn+"','sn','addGoodsSnTable',0);sumTotalPrice2();\">删除</a>";
						}
					}
				]],
				width : '100%',
				height : '100%',
				singleSelect : true,
				autoRowHeight : false,
				pagination : false,
				pageSize : 10,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
	});
	$("#checkGoodsSnTable").datagrid(
			{
				columns : [[
					{
						field : 'sn',
						title : 'SN码',
						width : 100,
						align : 'center'
					},
					]],
					width : '100%',
					height : '100%',
					singleSelect : true,
					autoRowHeight : false,
					pagination : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
			});
	$("#goodsSellDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			if(rowData.cgSn == 1){
				openGoodsSN(rowIndex,2);
			}
		}
	});
	$("#choseCustomerTable").datagrid({
		columns:[[
			{	
				field:'cocContacts',
				title:'联系人',
				width:15,
				align:'center'
			},
			{	
				field:'cocPhone',
				title:'电话号码',
				width:20,
				align:'center'
			},
			{	
				field:'cocCompany',
				title:'公司名称',
				width:20,
				align:'center'
			},
			{	
				field:'cocFixedTelephone',
				title:'固定电话',
				width:10,
				align:'center'
			},
			{	
				field:'cocGrade',
				title:'客户等级',
				width:10,
				align:'center',
				
			},
			{	
				field:'cocType',
				title:'类型',
				width:10,
				align:'center',
			},
			{
				field : 'cocAddress',
				title : '收货地址',
				width : 20,
				align : 'center',
			},
			{
				field : 'cocRelation',
				title : '关系',
				width : 15,
				align : 'center',
			},
			{
				field : 'cocState',
				title : '状态',
				width : 10,
				align : 'center',
			}
		]],
		width : '100%',
		height : '95%',
		singleSelect : true,
		autoRowHeight : false,
		pagination : false,
		pageSize : 10,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		onDblClickRow : function(rowIndex, rowData) {
			$('#orderCustomer').val(rowData.cocCompany);
			$('#orderContacts').val(rowData.cocContacts);
			$('#customerId').val(rowData.cocId);
			$('#address').val(rowData.cocAddress);
			$('#choseCustomerDlg').dialog('close');
		},
	});
	//实时刷新时间单位为毫秒
	setInterval('listNewOrder(1,0)',10000);
	
	$("#searchSN").hide();
})

function getSetUp(){
	$.ajax({
		type:"post",
		url:"../selectShopSetUp.action",
		data:{
			cgsuId:1
		},
		async:false,
		dataType:"json",
		success:function(result){
			if (result.code < 0) {
				myTips(result.msg, 'error');
			} else {
				var data = result.body[0];
				shopCashAccount = data.cgsuCashAccount;
				shopAccount = data.cgsuShopAccount;
			}
		}
	});
	
}

//单元格单击编辑
//新增收支单元格编辑
var editIndex1 = undefined;
function endEditing1() {
	if (editIndex1 == undefined) {
		return true
	}
	if ($('#sceneGoodsDg').datagrid('validateRow', editIndex1)) {
		$('#sceneGoodsDg').datagrid('endEdit', editIndex1);
		sumTotalPrice();
		editIndex1 = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell1(index, field) {
	if (endEditing1()) {
		$('#sceneGoodsDg').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex1 = index;
	}
}

function sumTotalPrice(){
	var rows = $("#sceneGoodsDg").datagrid("getData").rows;
	var totalPirce = 0.00;
	for(var i in rows){
		totalPirce += rows[i].totalPrice;
	}
	$("#money").html(totalPirce.toFixed(2));
	$("#totalSum").val(totalPirce.toFixed(2));
	earnestMoneyCalculation();
}

function matchButtun(state,orderType){
	$("#accept").hide();
	$("#send").hide();
	$("#finish").hide();
	$("#retreat").hide();
	$("#sendMail").hide();
	$("#mailInfo").hide();
	
	if(state == "未接单"){
		$("#accept").show();
		$("#retreat").show();
	}else if(state == "已接单"){
		$("#send").show();
		$("#retreat").show();
		if(orderType == "邮递订单"){
			$("#sendMail").show();
			$("#send").hide();
		}
	}else if(state == "配送中"){
		$("#finish").show();
		$("#retreat").show();
		if(orderType == "邮递订单"){
			$("#mailInfo").show();
		}
	}
}


function dealWithOrder(type){
	if(type == 3){
		$.messager.confirm("操作提示", "确定要退单吗？", function(data) {
			if (data) {
				operating(type);
			}else{
				
			}
		});
	}else if(type == 5){
		openSendMail();
	}else{
		operating(type);
	}
}

/**
 * type 1 为接单 2 为配送 3 为退单 4为结单 5为发货
 */
function operating(type){
	
	var cgsOrderId = $('#pid').val();
	var info = $("#orderGoodsDg").datagrid("getData");
	var rows = $("#orderGoodsDg").datagrid("getRows");
	var orderGoodsJson = JSON.stringify(info.rows);
	
	var data = {
		type : type,
		id : cgsOrderId,
		cgbOperatorId:_loginUserId,
	}
	
	if(type == 2){
		if($('#searchOrderManagerGetUserId').val() == "" || $('#searchOrderManagerGetUserId').val() == null){
			myTips("配送员不能为空",'error');
			return;
		}
		data.cgbSendId = $('#searchOrderManagerGetUserId').val();
		data.goodsRows = JSON.stringify(rows);
	}
	
	if(type == 3){
		data.orderGoodsJson = orderGoodsJson;
	}
	
	if(type == 5){
		if($('#mailNameInput').val() == "" || $('#mailNameInput').val() == null){
			myTips("快递公司不能为空",'error');
			return;
		}
		if($('#mailNumInput').val() == "" || $('#mailNumInput').val() == null){
			myTips("快递单号不能为空",'error');
			return;
		}
		data.cgbMailName = $('#mailNameInput').val();
		data.cgbMailNum = $('#mailNumInput').val();
	}
	showLoading();
	$.ajax({
		type:"post",
		url:"../operatingOrder.action",
		data:data,
		dataType:"json",
		success:function(data){
			hideLoading();
			if(type == 5){
				$('#sendMailDlg').dialog("close");
			}
			if (data.code < 0) {
				myTips(data.msg, 'error');
			} else {
				for(var i in data.body[0]){
					$('#p'+i).val(data.body[0][i])
				}
				if(data.body[0]['cgbType'] == '3'){
					matchButtun(data.body[0]['cgbState'],"邮递订单");
				}else{
					matchButtun(data.body[0]['cgbState'],"0");
				}
				
				myTips(data.msg, 'success');
				listUndoneOrder(1,0);
				listNewOrder(1,0);
				if (type == 1){
					savePrint();
					$.messager.confirm('确认框','接单成功,要打印订单票据吗?',function(r){
						printPaper();
					});
				}
			}
		}
	});
	SNListGoods();
}

function refundOrder(){
	$.messager.confirm("警告", "确定要退单？", function(data) {
		if (data) {
			var cgsOrderId = $('#did').val();
			var info = $("#salesGoodsDg").datagrid("getData");
			var orderGoodsJson = JSON.stringify(info.rows);
			var data = {
					type : 3,
					id : cgsOrderId,
					cgbOperatorId:_loginUserId,
					orderGoodsJson:orderGoodsJson
			}
			showLoading();
			$.ajax({
				type:"post",
				url:"../operatingOrder.action",
				data:data,
				dataType:"json",
				success:function(data){
					hideLoading();
					if (data.code < 0) {
						myTips(data.msg, 'error');
					} else {
						for(var i in data.body[0]){
							$('#d'+i).val(data.body[0][i])
						}
						$("#refundOrder").hide();
						listOrder(1,0);
						myTips(data.msg, 'success');
					}
				}
			});
		}
	});
	
}


function listOrderGoods(page, type,orderId){
	
	$.ajax({
		type:"post",
		url:"../listCsGoodsSell.action",
		data:{
			splitFlag : 2,
			cgsOrderId:orderId,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0) {
				$('#orderGoodsDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				console.log(data);
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
					data[i].preferential = data[i].cgsPreferential == 1 ? "是" : "否";
					data[i].sellWell = data[i].cgsSellWell == 1 ? "是" : "否";
					data[i].cgSnType = data[i].cgSn == 1 ? "是" : "否";
					var cgsSn = data[i].cgsGoodsSn.getRealJsonStr();
					
					if(data[i].cgSn == 1){
						if(data[i].cgsGoodsSn == null || data[i].cgsGoodsSn == '' || JSON.parse(cgsSn).length == 0 ){
							data[i].addGoodsNum = "差"+data[i].cgsSellNum+"件";
						}else if(JSON.parse(cgsSn).length == data[i].cgsSellNum){
							data[i].addGoodsNum = "已够";
						}else{
							data[i].addGoodsNum = "差"+data[i].cgsSellNum - JSON.parse(cgsSn).length +"件";
						}
					}
				}
				if(type == 0){
					$("#orderGoodsDg").datagrid("loadData", data);
				}else if(type ==1){
					$("#salesGoodsDg").datagrid("loadData", data);
				}
				
			}
		}
	});
}

function listNewOrder(page, type){
	
	$.ajax({
		type:"post",
		url:"../listOrder.action",
		data:{
			splitFlag: 2,
			cgbState : "未接单",
		},
		dataType:"json",
		success:function(data){
			if (data.code<0) {
//				$('#newOrderDg').datagrid({
//					data : [],
//					view : myview,
//					emptyMsg : data.msg
//				});
				$('#newOrderDg').datagrid('loadData', []);
				
			} else {
				data=data.body;
				
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
					data[i].cgbRegistrationTime = data[i].cgbRegistrationTime.substring(5, 16);
					
					var location = "";
					var phone = "";
					var name = "";
					var orderType = "";
					if(data[i].cgbType == 1){
						location = data[i].address;
						phone = data[i].popTelephone;
						orderType = "租客订单";
					}else if(data[i].cgbType == 2){
						if(data[i].cocAddress != ""){
							let add = JSON.parse(data[i].cocAddress.getRealJsonStr());
							location = add.community +" "+ add.address;
						}
						name = data[i].cocContacts;
						phone = data[i].cocPhone;
						orderType = "顾客订单";
					}else if(data[i].cgbType == 3){
						if(data[i].cocMailData != ""){
							let info = JSON.parse(data[i].cocMailData.getRealJsonStr());
							location = info.address;
							phone = info.phone;
							name = info.name;
						}
						orderType = "邮递订单";
					}
					
					data[i].location = location;
					data[i].phone = phone;
					data[i].name = name;
					data[i].orderType = orderType;
				}
				$("#newOrderDg").datagrid("loadData", data);
				daxiao.play();
			}
		},
		error : function(){
			parent.alertAgainLogin();
		}
	});
}

function listUndoneOrder(page, type){
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	$.ajax({
		type:"post",
		url:"../listOrder.action",
		data:{
			startNum : startNum,
			endNum : endNum,
			splitFlag : 1,
			cgbOperatorId:_loginUserId,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0) {
				$('#undoneOrderDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
				if(page==1){
					notCountPage(0, 0 ,"listUndoneOrder","undoneOrder");
				}else{
					notCountPage(page, 0 ,"listUndoneOrder","undoneOrder");
				}
			} else {
				data=data.body;
				if(data.length<pageNum){
					notCountPage(page, 2 , "listUndoneOrder","undoneOrder");
				}else{
					notCountPage(page, 1 , "listUndoneOrder","undoneOrder");
				}
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
					var location = "";
					var phone = "";
					var name = "";
					var orderType = "";
					if(data[i].cgbType == 1){
						location = data[i].address;
						phone = data[i].popTelephone;
						orderType = "租客订单";
					}else if(data[i].cgbType == 2){
						if(data[i].cocAddress != ""){
							let add = JSON.parse(data[i].cocAddress.getRealJsonStr());
							location = add.community +" "+ add.address;
						}
						phone = data[i].cocPhone;
						orderType = "顾客订单";
					}else if(data[i].cgbType == 3){
						if(data[i].cocMailData != ""){
							let info = JSON.parse(data[i].cocMailData.getRealJsonStr());
							location = info.address;
							phone = info.phone;
							name = info.name;
						}
						orderType = "邮递订单";
					}
					
					data[i].location = location;
					data[i].phone = phone;
					data[i].name = name;
					data[i].orderType = orderType;
				}
				$("#undoneOrderDg").datagrid("loadData", data);
			}
		}
	});
}

//货物分页统计数据
function getundoneOrderPageCount(page, type) {
	var pageNum = 20;
	
	$.ajax({
		type:"post",
		url:"../listOrder.action",
		data:{
			splitFlag : 0,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0 ||data.body[0].totalNum==0) {
				var countJson = {
						totalNum:0,
				};
				getCountData(0,countJson,pageNum,page,"undoneOrder",0);
			} else {
				data=data.body;
				var countJson = {
						totalNum	: data[0].totalNum,
				};
				getCountData(1,countJson,pageNum,page,"undoneOrder",0);
			}
		}
	});
}

function openSceneSell(){
	
	$('#sceneSellDlg').dialog({
		title : "现场销售",
		top : getTop(600),
		left : getLeft(1000),
		width : 1000,
		height : 630,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#sceneGoodsDg').datagrid('loadData', { total: 0, rows: [] });
			$("#money").html("0.00");
			$("#searchInput").val("");
			$("#sceneSellDlg input").val("");
		},
	});
	
	$('#sceneSellDlg').dialog('open');
	$('#orderDate').val(formatDate(parent.getNowFormatDate()));
	$('#orderUserId').val(_loginUserName);
	$('#earnestMoneyRatio').val('100%');
	$('#searchInput').focus();
	$('#searchSNInput').focus();
}

function listGoods(){
	$.ajax({
		type:"post",
		url:"../listGoods.action",
		data:{
			splitFlag : 2,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0) {
			} else {
				data=data.body;
				var html = "";
				for(var i=0;i<data.length;i++){
					if(data[i].cgSn == 1){
						data.splice(i, 1);
						i--;
						continue;
					}
					if(data[i].cgNum != 0){
						html += '<option label="'+data[i].cgName+'" value="'+data[i].cgCode+'" />'
					}
				}
				_goodsList = data;
				$("#goodsList").html(html)
			}
		}
	});
}
function SNListGoods(){
	$.ajax({
		type:"post",
		url:"../snListGoods.action",
		data:{},
		dataType:"json",
		success:function(data){
			if (data.code<0) {
			} else {
				data=data.body;
				_goodsList2 = data;
				var html = "";
				for(var i in data){
					html += '<option value="'+data[i].cgdrSn+'" />'
				}
				$("#SNGoodsList").html(html)
			}
		}
	});
}
//选择搜索类型
function selectType(){
	if($("#selectType").val() == 1){
		$("#searchSN").show();
		$("#search").hide();
	}else{
		$("#searchSN").hide();
		$("#search").show();
	}
}
//添加SN码
function openAddSN(index){
	var row = $("#orderGoodsDg").datagrid("getRows");
	console.log(row);
	if(row[index].sn != undefined && row[index].sn != null && row[index].sn != ""){
		$("#addGoodsSnTable").datagrid("loadData",row[index].sn);
	}
	/*var cgsSn = row[index].cgsGoodsSn.getRealJsonStr();
	if(cgsSn != undefined && cgsSn != null && cgsSn != ""){
		var json = JSON.parse(cgsSn);
		$("#addGoodsSnTable").datagrid("loadData",json);
	}*/
	var Snrows = $("#addGoodsSnTable").datagrid("getRows");
	
	$("#snTotalNum").html(row[index].cgsSellNum-Snrows.length);
	$("#goodsSNIndex2").val(index);
	$('#addGoodsSNDlg').dialog({
		title : "添加SN码",
		top : getTop(400),
		left : getLeft(350),
		width : 350,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addGoodsSnInput").val('');
			$("#addGoodsSnTable").datagrid("loadData",[]);
		}
	});
	$('#addGoodsSNDlg').dialog('open');
	$("#addGoodsSnInput").focus();
}
//查看SN码
function openGoodsSN(index,type){
	if(type == 0){
		var row = $("#orderGoodsDg").datagrid("getRows");
	}else if(type == 2){
		var row = $("#goodsSellDg").datagrid("getRows");
	}else if(type == 1){
		var row = $("#salesGoodsDg").datagrid("getRows");
	}
	var cgsSn = row[index].cgsGoodsSn.getRealJsonStr();
	if(cgsSn != undefined && cgsSn != null && cgsSn != ""){
		var json = JSON.parse(cgsSn);
		$("#checkGoodsSnTable").datagrid("loadData",json);
	}
	$('#checkGoodsSNDlg').dialog({
		title : "查看SN码",
		top : getTop(400),
		left : getLeft(350),
		width : 350,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#checkGoodsSnTable").datagrid("loadData",[]);
		}
	});
	$('#checkGoodsSNDlg').dialog('open');
}

function addSNToTable(){
	var index = $("#goodsSNIndex2").val();
	var sn = $("#addGoodsSnInput").val();
	var flag = true;
	$("#addGoodsSnInput").val('');
	if(sn == ""){
		myTips("sn码不能为空","error");
		return;
	}
	for(var i in _goodsList2){
		if(_goodsList2[i].cgdrSn == sn){
			_goodsList2[i].num = 1;
			_goodsList2[i].totalPrice = _goodsList2[i].num * _goodsList2[i].cgCurrentPrice;
			flag = false;
			break;
		}
	}
	if(flag){
		myTips("商店中没有这个商品","error")
		return;
	}
	var Snrows = $("#addGoodsSnTable").datagrid("getRows");
	var rows = $("#orderGoodsDg").datagrid("getRows");
	if(Snrows.length >= rows[index].cgsSellNum){
		myTips("添加的sn类商品与满足订单所需数量，请勿多添加","error");
		return;
	}
	for(var i in Snrows){
		if(sn == Snrows[i].sn){
			myTips("sn码不能重复录入","error");
			return;
		}
	}
	var obj = {}
	obj.sn = sn;
	Snrows.push(obj);
	
	$("#snTotalNum").html(rows[index].cgsSellNum-Snrows.length);
	
	$("#addGoodsSnTable").datagrid("loadData",Snrows);
	$("#addGoodsSnInput").focus();
}
function sumTotalPrice2(){
	var index = $("#goodsSNIndex2").val();
	var rows = $("#orderGoodsDg").datagrid("getRows");
	var Snrows = $("#addGoodsSnTable").datagrid("getRows");
	$("#snTotalNum").html(rows[index].cgsSellNum-Snrows.length);
}
//保存添加商品SN
function saveSNs(){
	var index = $("#goodsSNIndex2").val();
	var snRows = $("#addGoodsSnTable").datagrid("getRows");
	var rows = $("#orderGoodsDg").datagrid("getRows");
	rows[index].sn = snRows;
	var cgsSellNum;
	if(snRows.length < rows[index].cgsSellNum){
		if(snRows.length == 0){
			cgsSellNum = '差'+rows[index].cgsSellNum+'件';
		}else{
			cgsSellNum = '差'+rows[index].cgsSellNum - snRows.length +'件';
		}
	}else{
		cgsSellNum = '已够';
	}
	rows[index].addGoodsNum = cgsSellNum;
	$("#orderGoodsDg").datagrid("loadData",rows);
	$('#addGoodsSNDlg').dialog('close');
}

function addGoods(){
	var gooods = "";
	var flag = true;
	var code;
	var obj = {};
	
	
	//Snrows.push(obj);
	if($("#selectType").val() == 1){
		var text = $("#searchSNInput").val();
		
		if(text == "" || text == null){
			return ;
		}
		for(var i in _goodsList2){
			if(_goodsList2[i].cgdrSn == text){
				var list = [];
				_goodsList2[i].num = 1;
				_goodsList2[i].totalPrice = _goodsList2[i].num * _goodsList2[i].cgCurrentPrice;
				obj.sn = text;
				list.push(obj);
				gooods = JSON.parse(JSON.stringify(_goodsList2[i]));
				gooods.cgdrSn = list;
				code = _goodsList2[i].cgCode;
				flag = false;
				break;
			}
		}
	}else{
		var text = $("#searchInput").val();
		
		if(text == "" || text == null){
			return ;
		}
		
		for(var i in _goodsList){
			if(_goodsList[i].cgCode == text){
				_goodsList[i].num = 1;
				_goodsList[i].totalPrice = _goodsList[i].num * _goodsList[i].cgCurrentPrice;
				gooods = _goodsList[i];
				flag = false;
				break;
			}
		}
	}
	
	if(flag){
		myTips("商店中没有这个商品","error")
		return;
	}
	
	var rows = $("#sceneGoodsDg").datagrid("getData").rows;
	var isHas = false;
	for(var i in rows){
		if(rows[i].cgCode == text){
			isHas = true;
			rows[i].num += 1;
			$("#sceneGoodsDg").datagrid("loadData",rows);
			break;
		}
		for(var j in rows[i].cgdrSn){
			if(rows[i].cgdrSn[j].sn == text){
				myTips("请勿添加重复SN码商品","error")
				return;
			}
		}
		if(rows[i].cgCode == code){
			isHas = true;
			rows[i].num += 1;
			rows[i].cgdrSn.push(obj);
			$("#sceneGoodsDg").datagrid("loadData",rows);
			break;
		}
	}
	
	if(!isHas){
		
		$('#sceneGoodsDg').datagrid('insertRow',{
			index: 0,	// 索引从0开始
			row: JSON.parse(JSON.stringify(gooods)) //因为js的对象赋值是地址引用 这里需要转字符串再转对象操作
		});
	}
	
	sumTotalPrice();
	$("#searchInput").val("");
	$("#searchSNInput").val("");
}

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];

　	switch (e && e.keyCode){
　　　　case 13:
　　　　　　enterKey()//addGoods();
　　　　　　break;
	 case 119:
		 f8Key();
		break;
	 case 120:
		 f9Key();
		break;
	 case 121:
　		 f10key();
　		 break;
　　　　}
　	 
    
}; 

function f8Key(){
	var isSceneSellOpen = $("#sceneSellDlg").parent().is(":hidden");
	if(isSceneSellOpen){
	}else{
		openCash(1);
	}
}

function f9Key(){
	var isSceneSellOpen = $("#sceneSellDlg").parent().is(":hidden");
	if(isSceneSellOpen){
	}else{
		openCash(2);
	}
}

function f10key(){
	var isSceneSellOpen = $("#sceneSellDlg").parent().is(":hidden");
	if(isSceneSellOpen){
	}else{
		openCash(3);
	}
}

function enterKey(){
	var noSceneSellOpen = $("#sceneSellDlg").parent().is(":hidden");
	var noCashOpen = $("#openCashDlg").parent().is(":hidden");
	var noCash = $("#cashButton").is(":hidden");
	var noQrcode = $("#qrcodeButton").is(":hidden");
	var noCard = $("#cardButton").is(":hidden");
	
	if(noSceneSellOpen){
	}else{
		if(noCashOpen){
			//这是现场销售窗口打开 收款的小窗口没打开的情况下
			addGoods();
		}else{
			if(!noCash){
				//这是现金收银的情况下
				doCash(1)
			}else if(!noQrcode){
				//这是扫码收银的情况下
				doCash(2)
			}else if(!noCard){
				//这是台卡收银的情况下
				doCash(3)
			}
		}
	}
}

function openSendMail(){
	
	$('#sendMailDlg').dialog({
		title : "发送快递",
		top : getTop(280),
		left : getLeft(400),
		width : 400,
		height : 280,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		},
	});
	
	$('#sendMailDlg').dialog('open');
}

function openCash(type){
	let title = "";
	if(type == 1){
		$("#openCashDlg .qrCode").css("display","none");
		$("#openCashDlg .qrCodeCustomer").css("display","none");
		$("#openCashDlg .cash").css("display","block");
		$("#openCashDlg #moneyInput").attr("onkeyup","changMoney()");
		title = "现金收银";
	}else if(type == 2){
		$("#openCashDlg .cash").css("display","none");
		$("#openCashDlg .qrCodeCustomer").css("display","none");
		$("#openCashDlg .qrCode").css("display","block");
		$("#openCashDlg #moneyInput").removeAttr("onkeyup");
		title = "扫码收银";
	}else if(type == 3){
		$("#openCashDlg .cash").css("display","none");
		$("#openCashDlg .qrCode").css("display","none");
		$("#openCashDlg .qrCodeCustomer").css("display","block");
		$("#openCashDlg #moneyInput").removeAttr("onkeyup");
		title = "台牌收款";
	}
	var money = $("#paymentEarnestMoney").val();
	$("#orderMoney").html(money);
	$("#moneyInput").val("");
	$("#changeMoney").html("0.00");
	
	
	$('#openCashDlg').dialog({
		title : title,
		top : getTop(300),
		left : getLeft(350),
		width : 350,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		},
	});
	
	$('#openCashDlg').dialog('open');
	
	$('#moneyInput').focus();
}

function changMoney(){
	var orderMoney = parseFloat($("#orderMoney").text());
	var moneyInput = $('#moneyInput').val();
	
	var changeMoney = moneyInput - orderMoney;
	if(moneyInput > orderMoney){
		$.messager.alert("操作提示", "当前为“现金收银”模式，请检查收款金额是否正确。如需进入 扫码收银 模式请按F9");
	}
	
	$('#changeMoney').html(changeMoney.toFixed(2));
	
}

function doCash(type){
	if(_checkDoCheck){
		return;
	}
	if(type == 4){
		var orderGoodsJson = JSON.stringify($("#sceneGoodsDg").datagrid("getData").rows);
		var cgbOperatorId = _loginUserId;
		var cgbCocId = $("#customerId").val();//客户id
		var cgbSendTime = $("#deliveryDate").val();//发货时间
		var cgbPrepayRatio = $("#earnestMoneyRatio").val();//预付比率
		var cgbRemark = $("#note").val();//备注
		var cgbTransportationMethods = $("#transportationMethods").val();//运输方式
		if(cgbTransportationMethods == '自取'){
			cgbSendTime = '';
		}
		var orderMoney = parseFloat($("#paymentEarnestMoney").val());//预付金额
		var money = parseFloat($("#money").text());//总金额
		var paymentStatus = '';
		if(money == orderMoney){
			paymentStatus = '待转账（全款）';
		}else{
			var num = (money - orderMoney).toFixed(2);
			paymentStatus = '待转账（预付）'+ num + '元';
		}
		
		var data = {
			orderGoodsJson:orderGoodsJson,
			cgbOperatorId:cgbOperatorId,
			cgbTotalSpending:money,
			type:type,
			goodsBody : "产品采购",
			cgbCocId	:	cgbCocId,
			cgbPaymentStatus	:	paymentStatus,
			cgbSendTime	:	cgbSendTime,
			cgbPrepayRatio	:	cgbPrepayRatio,
			cgbRemark	:	cgbRemark,
			cgbTransportationMethods	:	cgbTransportationMethods,
		}
	}else{
		var orderMoney = parseFloat($("#paymentEarnestMoney").val());
		var money = parseFloat($("#money").text());
		var paymentStatus = '';
		if(money == orderMoney){
			paymentStatus = '已付全款';
		}else{
			var num = (money - orderMoney).toFixed(2);
			paymentStatus = '待回款'+ num + '元';
		}
		var moneyInput = $('#moneyInput').val();
		
		if(type == 1 && orderMoney > moneyInput){
			myTips("实付金额不能少于应付金额","error");
			return;
		}
		var orderGoodsJson = JSON.stringify($("#sceneGoodsDg").datagrid("getData").rows);
		
		var cgbOperatorId = _loginUserId;
		var cgbCocId = $("#customerId").val();//客户id
		var cgbSendTime = $("#deliveryDate").val();//发货时间
		var cgbPrepayRatio = $("#earnestMoneyRatio").val();//预付比率
		var cgbRemark = $("#note").val();//备注
		var cgbTransportationMethods = $("#transportationMethods").val();//运输方式
		
		var data = {
			orderGoodsJson:orderGoodsJson,
			cgbOperatorId:cgbOperatorId,
			cgbActualSpending:orderMoney,//实付金额
			cgbTotalSpending:money,
			type:type,
			goodsBody : "产品采购",
			cgbCocId	:	cgbCocId,
			cgbPaymentStatus	:	paymentStatus,
			cgbSendTime	:	cgbSendTime,
			cgbPrepayRatio	:	cgbPrepayRatio,
			cgbRemark	:	cgbRemark,
			cgbTransportationMethods	:	cgbTransportationMethods,
		}
	}
	if(type == 2){
		data.authCode = moneyInput;
	}
	_checkDoCheck = true;
	showLoading();
	$.ajax({
		type:"post",
		url:"../createPurchaseBill.action",
		data:data,
		dataType:"json",
		success:function(data){
			if (data.code < 0) {
				hideLoading();
				myTips(data.msg, 'error');
				_checkDoCheck = false;
			} else {
				var closeWay = "";
				var account = (type == 1 ? shopCashAccount:shopAccount);
				$.ajax({
					type:"post",
					url:"../selectFinancialAccount.action",
					data:{
						faId : account
					},
					async:false,
					dataType:"json",
					success:function(data){
						if (data.code < 0) {
							hideLoading();
							_checkDoCheck = false;
							myTips(data.msg, 'error');
						} else {
							closeWay = data.body[0].faPaymentType; 
						}
					}
				});
				
				var jfTicketNumber = data.body;
				
				var jfAry = [];
				//收支
				var jfObj = {
					department : _loginDepartment,
					storefront : _loginStore,
					jfTheCashierPeople : _loginUserId,
					jfBillingDate : new Date().format("yyyy-MM-dd hh:mm:ss"),
					jfHandlers : _loginUserId,
					jfOperationRecords : "("+ new Date().format("yyyy-MM-dd hh:mm:ss") + ",添加收支记录)*",
					jfFinancialCoding : new Date().format("yyyyMMddhhmmss")+ parseInt(Math.random() * 10) +  parseInt(Math.random() * 10) + parseInt(Math.random() * 10),
					jfStartCycle : new Date().format("yyyy-MM-dd"),
					jfEndCycle : getNextMonth(new Date().format("yyyy-MM-dd")),
					jfTicketNumber : jfTicketNumber
				}
				let text = "";
				switch (type){
					case 1:
					text = "现金收银";
					break;
					case 2:
					text = "扫码收银";
					break;
					case 3:
					text = "台卡收银";
					break;
				}
				var jfFinanNote = "现场销售，" + text;
				jfObj.jfPayType = "现钞";
				jfObj.jfAccountingSpecies = "商品采购";
				jfObj.jfBigType = "商超类";
				jfObj.jfNatureOfThe = "收入";
				jfObj.jfClosedWay = closeWay;
				jfObj.jfAccountId = account;
				jfObj.jfSumMoney = orderMoney;
				jfObj.jfFinanNote = jfFinanNote;
				
				jfAry.push(jfObj);
					
				jfAry = JSON.stringify(jfAry);
				
				$.ajax({
					  url:"../insertFinancialAll.action",
					  data:{
						jsonArray : jfAry
					  },
					  type:"post",
					  dataType:"json",
					  success:function(data){
						  SNListGoods();
						  hideLoading();
						  _checkDoCheck = false;
						  if(data.code == 1){
							  listGoods();
							  myTips("收款成功！","success");
							  $('#openCashDlg').dialog("close");
							  $('#selectMode').dialog("close");
							  $('#money').html("0.00");
							  $('#sceneGoodsDg').datagrid('loadData', { total: 0, rows: [] });
							  $('#sceneSellDlg input[require="require"]').val('');
							  $('#orderDate').val(formatDate(parent.getNowFormatDate()));
						  }else{
							 myTips(data.msg,"error");
						  }
						  
					  }
					  
				})
			}
		}
	});
}

function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

function openOrderDetail(rowData){
	for(var i in rowData){
		$("#d" + i ).val(rowData[i]);
	}
	if(rowData.cgbType == 3){
		$("#orderDetailDlg .mailOrder").show();
	}else{
		$("#orderDetailDlg .mailOrder").hide();
	}
	listOrderGoods(1,1,rowData['id']);
	if(rowData.cgbState != "退单完成"){
		$("#refundOrder").show();
	}
	$('#orderDetailDlg').dialog({
		title : "订单详情",
		top : getTop(400),
		left : getLeft(750),
		width : 750,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#orderGoodsDg').datagrid('loadData', { total: 0, rows: [] });
			$("#refundOrder").hide();
		},
	});
	
	$('#orderDetailDlg').dialog('open');
}

function getorderPageCount(page, type) {
	var pageNum = 20;
	
	$.ajax({
		type:"post",
		url:"../listOrder.action",
		data:{
			splitFlag : 3,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0 ||data.body[0].totalNum==0) {
				var countJson = {
						totalNum:0,
				};
				getCountData(0,countJson,pageNum,page,"order",0);
			} else {
				data=data.body;
				var countJson = {
						totalNum	: data[0].totalNum,
				};
				getCountData(1,countJson,pageNum,page,"order",0);
			}
		}
	});
}

function listOrder(page, type){
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var cgbPayType = $("#searchOrderPayType").find("option:selected").text();
	var startTime = $("#searchOrderStartTime").val();
	var endTime = $("#searchOrderEndTime").val();
	var cgbOrderNum = $("#searchOrderNum").val();
	
	$.ajax({
		type:"post",
		url:"../listOrder.action",
		data:{
			startNum:startNum,
			endNum:endNum,
			cgbPayType:cgbPayType,
			cgbOrderNum:cgbOrderNum,
			startTime:startTime,
			endTime:endTime,
			splitFlag: 4,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0) {
				$('#orderDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
				if(page==1){
					notCountPage(0, 0 ,"listOrder","order");
				}else{
					notCountPage(page, 0 ,"listOrder","order");
				}
			} else {
				data=data.body;
				if(data.length<pageNum){
					notCountPage(page, 2 , "listOrder","order");
				}else{
					notCountPage(page, 1 , "listOrder","order");
				}
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
					var location = "";
					var phone = "";
					var name = "";
					var orderType = "";
					if(data[i].cgbType == 1){
						location = data[i].address;
						phone = data[i].popTelephone;
						orderType = "租客订单";
					}else if(data[i].cgbType == 2){
						if(data[i].cocAddress != ""){
							let add = JSON.parse(data[i].cocAddress.getRealJsonStr());
							location = add.community +" "+ add.address;
						}
						phone = data[i].cocPhone;
						orderType = "顾客订单";
					}else if(data[i].cgbType == 3){
						if(data[i].cocMailData != ""){
							let info = JSON.parse(data[i].cocMailData.getRealJsonStr());
							location = info.address;
							phone = info.phone;
							name = info.name;
						}
						orderType = "邮递订单";
					}
					
					data[i].location = location;
					data[i].phone = phone;
					data[i].name = name;
					data[i].orderType = orderType;
				}
				$("#orderDg").datagrid("loadData", data);
			}
		}
	});
	getMoneyTotal();
}


function openSalesRecords(){
	listOrder(1,0);
	$('#salesRecords').dialog({
		title : "订单记录",
		top : getTop(600),
		left : getLeft(1000),
		width : 1000,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		},
	});
	
	$('#salesRecords').dialog('open');
}

function getMoneyTotal(){
	var startTime = $("#searchOrderStartTime").val();
	var endTime = $("#searchOrderEndTime").val();
	$.ajax({
		type:"post",
		url:"../getShopMoney.action",
		data:{
			startTime:startTime,
			endTime:endTime
		},
		dataType:"json",
		success:function(data){
			if(data.code == 1){
				$("#cashTotalMoney").val(data.body[0].cashMoneyTotal);
				$("#otherTotalMoney").val(data.body[0].otherMoneyTotal);
				$("#moneyTotal").val(data.body[0].moneyTotal);
			  }else{
			  	$("#cashTotalMoney").val("");
				$("#otherTotalMoney").val("");
				$("#moneyTotal").val("");
			  }
		}
	});
}

function openSalesGoodsRecords(){
	listGoodsSell(1,0);
	$('#salesGoodsRecords').dialog({
		title : "销售记录",
		top : getTop(600),
		left : getLeft(1000),
		width : 1000,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		},
	});
	
	$('#salesGoodsRecords').dialog('open');
}

/**
 * 判断数据库里的值 1 返回 ‘是’  0 返回 ‘否’
 */
function changeNumToFont(num){
	if(num == 1){
		return "是"
	}else{
		return "否"
	}
}

function listGoodsSell(page, type){
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var cgsGoodsName = $("#searchSalesGoodsName").val();
	var startTime = $("#searchSalesGoodsStartTime").val();
	var endTime = $("#searchSalesGoodsEndTime").val();
	
	$.ajax({
		type:"post",
		url:"../listCsGoodsSell.action",
		data:{
			startNum : startNum,
			endNum : endNum,
			cgsGoodsName:cgsGoodsName,
			startTime:startTime,
			endTime:endTime,
			splitFlag : 1,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0) {
				$('#goodsSellDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
				if(page==1){
					notCountPage(0, 0 ,"listGoodsSell","goodsSell");
				}else{
					notCountPage(page, 0 ,"listGoodsSell","goodsSell");
				}
			} else {
				data=data.body;
				if(data.length<pageNum){
					notCountPage(page, 2 , "listGoodsSell","goodsSell");
				}else{
					notCountPage(page, 1 , "listGoodsSell","goodsSell");
				}
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
					data[i].preferential = changeNumToFont(data[i].cgsPreferential);
					data[i].sellWell = changeNumToFont(data[i].cgsSellWell);
					data[i].cgSnType = data[i].cgSn == 1 ? "是" : "否";
				}
				console.log(data);
				$("#goodsSellDg").datagrid("loadData", data);
			}
		}
	});
	
	getProfit();
}

//商品分页统计数据
function getgoodsSellPageCount(page, type) {
	var pageNum = 20;
	
	$.ajax({
		type:"post",
		url:"../listCsGoodsSell.action",
		data:{
			splitFlag : 0,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0 ||data.body[0].totalNum==0) {
				var countJson = {
						totalNum:0,
				};
				getCountData(0,countJson,pageNum,page,"goodsSell",0);
			} else {
				data=data.body;
				var countJson = {
						totalNum	: data[0].totalNum,
				};
				getCountData(1,countJson,pageNum,page,"goodsSell",0);
			}
		}
	});
}

function getProfit(){
	var startTime = $("#searchSalesGoodsStartTime").val();
	var endTime = $("#searchSalesGoodsEndTime").val();
	$.ajax({
		type:"post",
		url:"../getProfit.action",
		data:{
			startTime:startTime,
			endTime:endTime
		},
		dataType:"json",
		success:function(data){
			if(data.code == 1){
				$("#profit").val(data.body[0].totalProfit);
			  }else{
				$("#profit").val("");
			  }
		}
	});
}

function choseCustomer(){
	$('#choseCustomerDlg').dialog({
		title : "选择客户",
		top : getTop(470),
		left : getLeft(870),
		width : 900,
		height : 470,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#searchCustomerName").val('');
			$("#searchCustomerPhone").val('');
			$("#searchRegisterShowUserInfo").val('');
			$("#searchCustomerState").val('');
		},
	});
	queryCustomer(1,0);
	$('#choseCustomerDlg').dialog('open');
}
function queryCustomer(page, type){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
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
			sourcePage(0, 0, 0);
			$('#choseCustomerTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data = data.body;
		if (page == 1 && type == 0) {
			_indexNum[0] = 0;
			sourcePage(data[0].totalNum, page, 0);
		}
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
		$("#choseCustomerTable").datagrid("loadData",data);
	});
}
//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#choseCustomerPage").remove();
		$("#choseCustomerPageDiv")
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
					queryCustomer(p, 1);
				}
			}
		});
	}
	
}

function earnestMoneyCalculation(){
	var totalSum = $("#totalSum").val();
	var earnestMoneyRatio = $("#earnestMoneyRatio").val();
	if(totalSum == null || totalSum == ''){
		return;
	}
	if(earnestMoneyRatio == null || earnestMoneyRatio == ''){
		return;
	}
	var state = false;
	for (var i = 0 ; i<earnestMoneyRatio.length;i++){
		if(earnestMoneyRatio[i] == '%'){
			state = true;
		}
	}
	if(state){
		earnestMoneyRatio = earnestMoneyRatio.substring(0,earnestMoneyRatio.length-1);
	}
	var paymentEarnestMoney = parseInt(totalSum) * parseInt(earnestMoneyRatio) /100;
	$("#paymentEarnestMoney").val(paymentEarnestMoney);
}

function selectMode(){
	var row = $("#sceneGoodsDg").datagrid("getRows");
	if(row.length == 0){
		myTips("请选择要销售的商品!");
		return;
	}
	var checkFlag = 0;
	$("#sceneSellDlg input[require='require']").each(function(){
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
	var mode = $("#paymentMethod").val();
	if(mode == '现场支付'){
		$('#selectMode').dialog({
			title : "选择付款方式",
			top : getTop(170),
			left : getLeft(570),
			width : 600,
			height : 150,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
			},
		});
		$('#selectMode').dialog('open');
	}else if(mode == '转账'){
		doCash(4);
	}
}

function selectTransportationMethods(){
	if($("#transportationMethods").val() == '自取'){
		$("#deliveryDate").val('');
		$("#deliveryDate").attr("readonly","readonly");
		$("#deliveryDate").attr("disabled","disabled");
		$("#deliveryDate").removeAttr("require");
	}else{
		$("#deliveryDate").removeAttr("readonly");
		$("#deliveryDate").removeAttr("disabled");
		$("#deliveryDate").attr("require","require");
	}
}

function savePrint() {
	var json = getPrintData();
	var cocId = $("#cocId").val();
	var jhpType = '线上订单票据';
	$.post("../insertHistoryPrint.action",{
		jhpCocId			: cocId,
		jhpJson 			: json,
		jhpType 			: jhpType,
		jhpTitle			: getNowFormatDate()+ ' ' + jhpType,
		jhpUserId			: _loginUserId,
	}, function(data) {

	});
}

//获取打印数据
function getPrintData(){
	var rows = $('#orderGoodsDg').datagrid('getRows');
	var json = {};
	json.gongsi = _loginCompanyName;
	json.kehumingcheng = $('#pname').val();
	json.xiadanshijian = $('#pcgbRegistrationTime').val();
	json.lianxihaoma = $('#pphone').val();
	json.dingdanhao = $('#pcgbOrderNum').val();
	json.dingdanleixing = $('#porderType').val();
	json.zhifufangshi = $('#pcgbPayType').val();
	json.shouhuodizhi = $('#plocation').val();
	json.shifujine = $('#pcgbActualSpending').val();

	json.jianmianyuanyin = $('#pcgbReduceReason').val();
	json.shangpinjianmian = $('#pcgbReduceFee').val();
	json.peisongfeiyong = $('#pcgbShippingFee').val();
	json.beizhu = $('#pcgbRemark').val();
	json.zongjine = $('#pcgbTotalSpending').val();
	json.jiedanrenyuan = _loginUserName;

	json.goods = [];
	for (var i in rows) {
		var item = {};
		item.shangpinmingcheng = rows[i].cgsGoodsName;
		item.yuanjia = rows[i].cgsOriginalPrice;
		item.xianjia = rows[i].cgsCurrentPrice;
		item.shuliang = rows[i].cgsSellNum;
		item.youhuibiaoqian = rows[i].preferential;
		item.rexiaobiaoqian = rows[i].sellWell;
		json.goods.push(item);
	}
	json = JSON.stringify(json);
	return json;
}
//打印审批单
function printPaper(){
	var printArray = getPrintData();
	parent.doPrintInExe(printArray, 13);
}