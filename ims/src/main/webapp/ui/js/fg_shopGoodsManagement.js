var _goodsList = []
var shopCashAccount;
$(function(){
	listGoods(_pageNum[0],0);
	listSearchGoods();
	getSetUp();
	
	$("#goodsDetail_index").val(0);
	getGoodsType("searchCategoryName",'',0);
	$("#goodsDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$("#goodsDetail_index").val(rowIndex);
			openGoodsDetail(rowData);
		},
		onRowContextMenu : function(e, rowIndex, rowData){ 
			e.preventDefault();//阻止向上冒泡
			$(this).datagrid('unselectAll');
	        $(this).datagrid('selectRow',rowIndex);
	        $('#menu').menu('show',{
	            left : e.pageX,
	            top : e.pageY,
	            hideOnUnhover : false
	        });
		}
	});
	
	$("#addSnTable").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
		}
	});
	
	$("#discountDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			openDiscountOpreation(2,rowData);
		}
	});
	
	$("#purchaseOrderDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$("#purchaseOrderDetail_index").val(rowIndex);
			openPurchaseOrderDetail(rowData);
		}
	});
	
	$("#purchaseGoodsDg").datagrid({
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
				field:'newCgCostPrice',
				title:'采购价',
				width:10,
				align:'center',
				formatter: function(val,row,index){
					 row.newCgCostPrice = (row.totalPrice / row.num).toFixed(3)
					 return row.newCgCostPrice;
				}
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
				editor : {
					type : "numberbox",
					options : {
						precision : 2
					}
				},
				formatter: function(val,row,index){
					if(row.totalPrice == null || row.totalPrice == ''){
						row.totalPrice = 0;
						return row.totalPrice;
					}else{
						row.totalPrice = val;
						return row.totalPrice;
					}
				}
			},
			{	
				field:'remark',
				title:'备注',
				width:10,
				align:'center',
				editor : "textbox",
			},
			{	
				field:'sn',
				title:'SN',
				width:10,
				align:'center',
				formatter: function(val,row,index){
					var obj = {};
					obj.row = row;
					obj.index = index;
					if(row.cgSn == 1){
						return "<button onclick='openAddSN("+index+")'>添加SN</button>";
					}else{
						return;
					}
				}
			},
			{	
				field:'delect',
				title:'删除',
				width:10,
				align:'center',
				formatter: function(val,row,index){
					return "<button onclick='delect("+index+")'>删除</button>";
				}
			},
			
		]],
		onClickCell : onClickCell1,//点击一个单元格的时候触发
		
	});
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
	if ($('#purchaseGoodsDg').datagrid('validateRow', editIndex1)) {
		$('#purchaseGoodsDg').datagrid('endEdit', editIndex1);
		sumTotalPrice()
		editIndex1 = undefined;
		return true;
	} else {
		return false;
	}
}

function onClickCell1(index, field) {
	if (endEditing1()) {
		$('#purchaseGoodsDg').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex1 = index;
	}
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


function doPurchase(){
	var cgpSupplierName = $("#supplier").val();
	if(cgpSupplierName == ""){
		myTips("供货商不能为空","error");
		return ;
	}
	
	var rows = $("#purchaseGoodsDg").datagrid("getData").rows;
	
	console.log(rows)
	
	if(rows.length < 1){
		myTips("商品不能为空","error");
		return ;
	}
	
	var cgpSupplierId = $("#supplier").attr("data-id");
	
	var orderMoney = $("#purchaseTotalPrice").val();
	
	var purchaseGoodsJson = JSON.stringify(rows);
	
	var jsonString = {
			cgpSupplierId : cgpSupplierId,
			cgpOperatorId : _loginUserId,
			cgpTotalMoney : orderMoney,
			cgpGoodsJson : purchaseGoodsJson,
	}
		
	jsonString = JSON.stringify(jsonString);
	showLoading();
	$.ajax({
		type:"post",
		url:"../purchaseGoods.action",
		data:{
			jsonString:jsonString
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			if(data.code == 1){
				console.log(shopCashAccount)
				var closeWay = "";
				$.ajax({
					type:"post",
					url:"../selectFinancialAccount.action",
					data:{
						faId : shopCashAccount
					},
					async:false,
					dataType:"json",
					success:function(data){
						if (data.code < 0) {
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
					jfTicketNumber : jfTicketNumber,
					jfAccountingWhy : $("#supplier").attr("data-param"),
					jfHouseId:cgpSupplierId,
					jfTheOwnershipType : "其他类",
					jfBelongingToTheName : cgpSupplierName
				}
				
				var jfFinanNote = "向供货商： "+cgpSupplierName+" 采购商品，流水号："+jfTicketNumber;
				jfObj.jfPayType = "现钞";
				jfObj.jfAccountingSpecies = "商品采购";
				jfObj.jfBigType = "商超类";
				jfObj.jfNatureOfThe = "支出";
				jfObj.jfClosedWay = closeWay;
				jfObj.jfAccountId = shopCashAccount;
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
						  console.log(data)
						  if(data.code == 1){
						  	myTips("进货成功","success");
							$('#goodsPurchaseDlg').dialog("close");
							listGoods(_pageNum[0],0);
							$('#purchaseGoodsDg').datagrid('loadData', { total: 0, rows: [] });
						  }else{
							 myTips(data.msg,"error");
						  }
					  }
				})
			}else{
				myTips("进货失败","error")
			}
		}
	});
}


function openGoodsPurchase(rowData){
	
	$('#goodsPurchaseDlg').dialog({
		title : "采购入库",
		top : getTop(600),
		left : getLeft(1000),
		width : 1000,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#purchaseGoodsDg").datagrid('loadData', { total: 0, rows: [] });
			$("#goodsPurchaseDlg .clean").val("");
		},
	});
	$("#purchaseDate").val(new Date().format("yyyy-MM-dd"))
	$('#goodsPurchaseDlg').dialog('open');
	
	$('#searchInput').focus();
}

function openGoodsDetail(rowData){
	for(var i in rowData){
		$('#d' +i).val(rowData[i])
	}
	
	$('#goodsDetailDlg').dialog({
		title : "商品详情",
		top : getTop(230),
		left : getLeft(640),
		width : 640,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			clearAttachment();
			closeUpdateGoods();
		}
	});
	$('#goodsDetailDlg').dialog('open');
}

function listGoods(page, type){
	_pageNum[0] = page;
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var cgName = $("#searchGoodsName").val();
	var cgcCategoryName = $("#searchCategoryName").find("option:selected").text();
	var cgState = $("#searchGoodsState").find("option:selected").val();
	var cgPreferential = $("#searchGoodsPreferentail").find("option:selected").val();
	var cgSellWell = $("#searchGoodsSellWell").find("option:selected").val();
	
	$.ajax({
		type:"post",
		url:"../listGoods.action",
		data:{
			cgName:cgName,
			cgcCategoryName:cgcCategoryName,
			cgState:cgState,
			cgPreferential:cgPreferential,
			cgSellWell:cgSellWell,
			startNum : startNum,
			endNum : endNum,
			splitFlag : 1,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0) {
				$('#goodsDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
				if(page==1){
					notCountPage(0, 0 ,"listGoods","goods");
				}else{
					notCountPage(page, 0 ,"listGoods","goods");
				}
			} else {
				data=data.body;
				if(data.length<pageNum){
					notCountPage(page, 2 , "listGoods","goods");
				}else{
					notCountPage(page, 1 , "listGoods","goods");
				}
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
					data[i].cgSellWell = changeNumToFont(data[i].cgSellWell);
					data[i].cgPreferential = changeNumToFont(data[i].cgPreferential);
					data[i].cgState = changeNumToFont(data[i].cgState);
				}
				$("#goodsDg").datagrid("loadData", data);
				$("#goodsDg").datagrid("selectRow", $("#goodsDetail_index").val());
			}
		}
	});
}


//商品分页统计数据
function getgoodsPageCount(page, type) {
	var pageNum = 20;
	var cgName = $("#searchGoodsName").val();
	var cgcCategoryName = $("#searchCategoryName").find("option:selected").text();
	var cgState = $("#searchGoodsState").find("option:selected").val();
	var cgPreferential = $("#searchGoodsPreferentail").find("option:selected").val();
	var cgSellWell = $("#searchGoodsSellWell").find("option:selected").val();

	$.ajax({
		type:"post",
		url:"../listGoods.action",
		data:{
			cgName:cgName,
			cgcCategoryName:cgcCategoryName,
			cgState:cgState,
			cgPreferential:cgPreferential,
			cgSellWell:cgSellWell,
			splitFlag : 0,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0 ||data.body[0].totalNum==0) {
				var countJson = {
						totalNum:0,
				};
				getCountData(0,countJson,pageNum,page,"goods",0);
			} else {
				data=data.body;
				var countJson = {
						totalNum	: data[0].totalNum,
				};
				getCountData(1,countJson,pageNum,page,"goods",0);
			}
		}
	});
}

function getGoodsType(selectId,goodsTypeId,type){
	
	$.ajax({
		type:"post",
		data:{
			
		},
		url:"../listCsGoodsCategory.action",
		dataType:"json",
		success:function(data){
			if(data.code < 0){
				myTips(data.msg,"error");
			}else{
				body = data.body;
				var html = '';
				for(var i in body){
					if(goodsTypeId == undefined || goodsTypeId == ''){
						html += '<option value="'+body[i].id+'" data-num='+body[i].cgcNum+'>'+body[i].cgcCategoryName+'</option>'
					}else{
						//有传进来goodsTypeId 就是修改商品窗口请求这个方法 需要把商品对应的分类选中
						if(body[i].id == goodsTypeId){
							html += '<option selected="true" value="'+body[i].id+'" data-num='+body[i].cgcNum+'>'+body[i].cgcCategoryName+'</option>'
						}else{
							html += '<option value="'+body[i].id+'" data-num='+body[i].cgcNum+'>'+body[i].cgcCategoryName+'</option>'
						}
					}
				}
				//type 0 是商品类型搜索框  只需要往后添加 
				if(type == 0){
					$('#' + selectId).append(html);
				}else{
					$('#' + selectId).html(html);
				}
			}
		}
		
	})
}

//添加商品
function addGoods(){
	getGoodsType("goodsType");
	$('#addGoodsDlg').dialog({
		title : "添加商品",
		top : getTop(230),
		left : getLeft(450),
		width : 450,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			clearAttachment();
			$('#addGoodsDlg [clear="clear"]').val("");
			$("#goodsSN").val('0');
		}
	});
	
	$('#addGoodsDlg').dialog('open');
}

/**
 * 添加商品类型
 */
function addGoodsType(){
	getGoodsType("allCategory")
	$('#addGoodsTypeDlg').dialog({
		title : "添加商品类型",
		top : getTop(480),
		left : getLeft(450),
		width : 450,
		height : 480,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			cleanAddAndEdit()
		}
	});
	
	$('#addGoodsTypeDlg').dialog('open');
}

function doAddGoodsType(){
	showLoading();
	var goodsType = $('#goodsTypeName').val();
	$.ajax({
		type:"post",
		data:{
			cgcCategoryName:goodsType
		},
		url:'../insertCsGoodsCategory.action',
		dataType:"json",
		success:function(data){
			hideLoading();
			if(data.code < 0){
				myTips(data.msg,"error");
			}else{
				myTips("添加商品类型成功","success");
				getGoodsType("allCategory");
				cleanAddAndEdit();
			}
		}
	})
}
//执行添加商品
function doAddGoods(){
	var att = $("#att").val();
	showLoading();
	$.ajax({
		type:"post",
		data:{
			cgCategoryId : $("#goodsType option:selected").val(),
			cgName : $('#goodsName').val(),
			cgPreferential : $("#goodsPreferentialType option:selected").val(),
			cgSellWell : $("#goodsSellWellType option:selected").val(),
			cgParameter : $('#goodsParameter').val(),
			cgcNum : $("#goodsType option:selected").attr("data-num"),
			cgCode:$('#goodsCode').val(),
			cgSn:$('#goodsSN').val(),
			att:att,
		},
		url:'../insertGoods.action',
		dataType:"json",
		success:function(data){
			hideLoading();
			if(data.code < 0){
				myTips(data.msg,"error");
			}else{
				isSave = true;
				myTips("添加商品成功","success");
				listGoods(_pageNum[0],0);
				listSearchGoods();
				$('#addGoodsDlg').dialog('close');
			}
			
		}
	})
}

function doChangeOnSale(row){
	var id = row.id;
	var cgState = row.cgState;
	showLoading();
	$.ajax({
		type:"post",
		url:"../updateGoods.action",
		data:{
			id:id,
			cgState:cgState,
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			if(data.code == 1){
				myTips(row.font+"成功","success");
				listGoods(_pageNum[0],0)
			}else{
				myTips(data.msg,"success")
			}
		}
	});
}

function changeOnSale(type){
	var font,state;
	if(type == 1){
		font = "上架";
		state = "是";
	}else if(type == 0){
		font = "下架";
		state = "否";
	}
	var row = $('#goodsDg').datagrid('getSelected');
	if(row == null){
		myTips("请选中商品来进行"+font,"error");
		return;
	}
	
	if(row.cgState == state){
		myTips("该商品已经是"+font+"状态","error");
		return;
	}
	
	row.cgState = type;
	row.font = font;
	doChangeOnSale(row);
}

function openInventory(){
	$('#goodsInventoryDlg').dialog({
		title : "商品盘点",
		top : getTop(300),
		left : getLeft(640),
		width : 640,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#goodsInventoryDlg [clear="clear"]').val("");
			$("#rcgNum").html("");
		}
	});
	$('#goodsInventoryDlg').dialog('open');
	
}

function doInventory(){
	var cgiUpdateNum = $('#cgiUpdateNum').val();
	
	if(cgiUpdateNum == "" || cgiUpdateNum == null){
		myTips("盘点数量不能为空！","error");
		return;
	}
	
	var cgiOperationId = _loginUserId;
	var cgiBeforeNum = $('#rcgNum').val();
	
	var cgiRemark = $('#cgiRemark').val();
	var cgiGoodsId = $('#rid').val();
	var id = cgiGoodsId;
	
	var jsonString = {
		cgiOperationId : cgiOperationId,
		cgiBeforeNum : cgiBeforeNum,
		cgiUpdateNum : cgiUpdateNum,
		cgiRemark : cgiRemark,
		cgiGoodsId : cgiGoodsId,
	}
	jsonString = JSON.stringify(jsonString);
	showLoading();
	$.ajax({
		type:"post",
		url:"../inventoryGoods.action",
		data:{
			id:id,
			cgNum : cgiUpdateNum,
			jsonString:jsonString,
		},
		dataType:"json",
		success:function(data){
			hideLoading();
			if(data.code == 1){
				$('#goodsInventoryDlg [clear="clear"]').val("");
				$("#rcgNum").html("");
				$("#inventorySearchGoods").focus();
				myTips("盘点成功","success");
				listGoods(_pageNum[0],0);
			}else{
				myTips("盘点失败","error")
			}
		}
	});
}



function doUpdateGoods(){
	let row = $('#goodsDg').datagrid('getSelected');
	console.log(row)
	
	let oldCgCategoryId = row.cgCategoryId;
	let oldCgcNum = row.cgcNum;
	let cgCategoryId = $("#updateCategory").find("option:selected").val();
	
	let cgName = $('#dcgName').val();
	let cgPreferential = $("#updatePreferential").find("option:selected").val();
	let cgSellWell = $("#updateSellWell").find("option:selected").val();
	let updateState = $("#updateState").find("option:selected").val();
	let cgParameter = $('#dcgParameter').val();
	let cgcNum = $("#updateCategory").find("option:selected").attr("data-num");
	let cgCode= $('#dcgCode').val();
	let id = $('#did').val();
	let cgOriginalPrice = $('#dcgOriginalPrice').val();
	let cgCurrentPrice = $('#dcgCurrentPrice').val();
	
	let data = {
		cgName:cgName,
		cgOriginalPrice:cgOriginalPrice,
		cgCurrentPrice:cgCurrentPrice,
		cgPreferential:cgPreferential,
		cgSellWell:cgSellWell,
		cgState:updateState,
		cgParameter:cgParameter,
		cgcNum:cgcNum,
		cgCode:cgCode,	
		cgCategoryId:cgCategoryId,
		id:id,
	}
	
	if(oldCgCategoryId != cgCategoryId){
		data.oldCgCategoryId = oldCgCategoryId;
		data.oldCgcNum = oldCgcNum;
		//type 为serviceImpl 判断操作类型
		data.type=1;
	}
	showLoading();
	$.ajax({
		type:"post",
		url:"../updateGoods.action",
		data:data,
		dataType:"json",
		success:function(result){
			hideLoading();
			if(result.code == 1){
				myTips("修改成功","success");
				listGoods(_pageNum[0],0);
				console.log(result.body)
				var data = result.body[0];
				for(var i in data){
					$("#d" + i).val(data[i])
				}
				$("#dcgPreferential").val(data.cgPreferential == 1 ? "是" : "否");
				$("#dcgSellWell").val(data.dcgSellWell  == 1 ? "是" : "否");
				$("#dcgState").val(data.dcgState  == 1 ? "是" : "否");
				closeUpdateGoods();
			}else{
				myTips("修改失败","error")
			}
		}
	})
}

function openDeleteGoods(){
	var row = $('#goodsDg').datagrid('getSelected');
	if(row == null){
		myTips("请选中商品来进行修改","error");
		return;
	}
	
	$.messager.confirm("操作提示", "确定要删除吗？", function(data) {
		if (data) {
			doDelete();
		}else{
			return;
		}
	});
}

function doDelete(){
	var row = $('#goodsDg').datagrid('getSelected');
	
	var data = {
		cgDeleteState : 1,
		id: row.id,
		cgCategoryId : row.cgCategoryId,
		cgcNum : row.cgcNum,
		//type 为serviceImpl 判断操作类型
		type:2
	}
	$.ajax({
		type:"post",
		url:"../updateGoods.action",
		data:data,
		dataType:"json",
		success:function(result){
			if(result.code == 1){
				myTips("删除成功","success");
				listGoods(1,0);
			}else{
				myTips("删除失败","error")
			}
		}
	})
}

function listSearchGoods(){
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
				for(var i in data){
					data[i].remark = "";
					if(data[i].cgCostPrice == "" || data[i].cgCostPrice == null){
						data[i].cgCostPrice = 0;
					}
					data[i].newcgPreferential = data[i].cgPreferential == 1 ? '是' : '否';
					data[i].newcgState = data[i].cgState == 1 ? '是' : '否';
					data[i].newcgSellWell = data[i].cgSellWell == 1 ? '是' : '否';
					
					data[i].newCgCostPrice = data[i].cgCostPrice;
					html += '<option label="'+data[i].cgName+'" value="'+data[i].cgCode+'" />'
				}
				_goodsList = data;
				$("#goodsList").html(html)
			}
		}
	});
}

function addGoodsPurchase(){
	var text = $("#searchInput").val();
	
	if(text == "" || text == null){
		return ;
	}

	var gooods = "";
	var flag = true;
	for(var i in _goodsList){
		if(_goodsList[i].cgCode == text){
			_goodsList[i].num = 1;
			_goodsList[i].totalPrice = _goodsList[i].num * _goodsList[i].cgCostPrice;
			gooods = _goodsList[i];
			flag = false;
			break;
		}
	}
	
	if(flag){
		myTips("商店中没有这个商品","error")
		return;
	}
	
	var rows = $("#purchaseGoodsDg").datagrid("getData").rows;
	var isHas = false;
	for(var i in rows){
		if(rows[i].cgCode == text){
			isHas = true;
			myTips("请双击商品数量改变进货量","error")
			break;
		}  
	}
	
	if(!isHas){
		$('#purchaseGoodsDg').datagrid('insertRow',{
			index: 0,	// 索引从0开始
			row: JSON.parse(JSON.stringify(gooods)) //因为js的对象赋值是地址引用 这里需要转字符串再转对象操作
		});
	}
	
	$("#searchInput").val("");
	sumTotalPrice()
}

function sumTotalPrice(){
	var rows = $("#purchaseGoodsDg").datagrid("getData").rows;
	var totalPirce = 0.00;
	for(var i in rows){
		totalPirce += rows[i].totalPrice * 1;
	}
	totalPirce = totalPirce.toFixed(3);
	$("#purchaseTotalPrice").val(totalPirce)
	var Snrows = $("#addSnTable").datagrid("getData").rows;
	$("#snTotalNum").html(Snrows.length)
}

//选择房源
function choseHouse() {
	$('#choseHouseDlg').dialog({
		title : '选择供应商',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	relationDataGrid();
	choseHouseData(1,0);
	
	$('#choseHouseDlg').dialog('open');
}

function relationDataGrid(){
	$('#choseVirtualTable').datagrid(
		{
			columns : [ [ {
				field : 'addCommunity',
				title : '分类',
				width : 10,
				align : 'center'
			}, {
				field : 'keyAdministrator',
				title : '名称',
				width : 10,
				align : 'center'
			}, {
				field : 'addDoorplateno',
				title : '编号',
				width : 10,
				align : 'center'
			}, {
				field : 'keyNumber',
				title : '联系人',
				width : 10,
				align : 'center'
			}, {
				field : 'houseEntrust4rent',
				title : '联系电话',
				width : 10,
				align : 'center'
			} ] ],
			width : '98%',
			height : '84%',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#choseVirtualTable').datagrid('getSelected');
				if (row) {
					console.log(row)
					$('#supplier').val(row.keyAdministrator);
					$('#supplier').attr("data-id",row.houseCoding);
					$('#supplier').attr("data-param","联系人：" + row.keyNumber);
					$('#choseHouseDlg').dialog('close');
				}
			}
		});
}

function choseHouseData(page, type) {
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	
	//项目
	//var virtualType = $("#searchVirtualType").val();
	var searchVirtualName = $("#searchVirtualName").val();
	var searchVirtualDoorplateno = $("#searchVirtualDoorplateno").val();
	var searchVirtualContact = $("#searchVirtualContact").val();
	
	$("#searchHrLeaseStateDiv").hide();
	$.post("../queryVirtualFinancial.action", {
		startNum : startNum,
		endNum : endNum,
		virtualType : '5',
		keyAdministrator : searchVirtualName,
		addDoorplateno : searchVirtualDoorplateno,
		keyNumber : searchVirtualContact,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0);
			$('#choseVirtualTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data.body[0].totalNum, page);
			}
			$("#choseVirtualTable").datagrid("loadData", data.body);
		}
	}, "json");
}

function sourcePage(totalNum, page) {
	var pageNum = Math.ceil(totalNum / 10);
	pageNum = Math.ceil(totalNum / 10);
	$("#choseVirtualPage").remove();
	$("#choseVirtualPageDiv") .append( "<div class='tcdPageCode' id='choseVirtualPage' style='text-align:center;'></div>");
	$("#choseVirtualPage").createPage({
		onePageNums:10,
		totalNum:totalNum,
		pageCount : pageNum,
		current : 1,
		backFn : function(p) {
			if (p <= pageNum) {
				choseHouseData(p, 1);
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
//keydown键盘按下事件
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];

　	switch (e && e.keyCode){
　　　　case 13:
　　　　　　enterKey();
　　　　　　break;
　	}    
}; 

function enterKey(){
	var isPurchaseDlgOpen = $("#goodsPurchaseDlg").parent().is(":hidden");
	var isInventoryDlgOpen = $("#goodsInventoryDlg").parent().is(":hidden");
	var isaddSNDlgOpen = $("#addSNDlg").parent().is(":hidden");
	
	if(!isPurchaseDlgOpen){
		if(!isaddSNDlgOpen){
			addSNToTable();
		}else{
			addGoodsPurchase();
		}
	}
	
	if(!isInventoryDlgOpen){
		if(document.activeElement.id == "inventorySearchGoods"){
			goodsInventorySearch();
		}else if(document.activeElement.id == "cgiUpdateNum"){
			doInventory();
		}
	}
	
	
}

function goodsInventorySearch(){
	var text = $("#inventorySearchGoods").val();
	
	if(text == "" || text == null){
		return ;
	}

	var gooods = "";
	var flag = true;
	for(var i in _goodsList){
		if(_goodsList[i].cgCode == text){
			_goodsList[i].num = 1;
			_goodsList[i].totalPrice = _goodsList[i].num * _goodsList[i].cgCurrentPrice;
			gooods = _goodsList[i];
			flag = false;
			break;
		}
	}
	if(flag){
		myTips("商店中没有这个商品","error")
		return;
	}
	
	$('#goodsInventoryDlg [clear="clear"]').val("");
	
	for(var i in gooods){
		$("#r" + i).val(gooods[i]);
	}
	$("#rcgNum").html(gooods.cgNum);
	$("#cgiRemark").val("常规盘点");
	$("#cgiUpdateNum").focus();
}

function openPurchaseOrder(){
	listPurchaseOrder(1,0);
	$('#purchaseOrderDlg').dialog({
		title : '采购流水',
		top : getTop(500),
		left : getLeft(750),
		width : 750,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	
	$('#purchaseOrderDlg').dialog('open');
}

function listPurchaseOrder(page, type){
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var cgpNumbers = $("#searchPurchaseNumber").val();
	var supplierName =  $("#searchSupplier").val();
	var startTime = $("#searchPurchaseStartTime").val();
	var endTime = $("#searchPurchaseEndTime").val();
	
	$.ajax({
		type:"post",
		url:"../listPurchaseOrder.action",
		dataType:"json",
		data:{
			startNum : startNum,
			endNum : endNum,
			splitFlag : 1,
			cgpNumbers: cgpNumbers,
			supplierName:supplierName,
			startTime:startTime,
			endTime:endTime
		},
		success:function(data){
			if (data.code<0) {
				$('#purchaseOrderDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
				if(page==1){
					notCountPage(0, 0 ,"listPurchaseOrder","purchaseOrder");
				}else{
					notCountPage(page, 0 ,"listPurchaseOrder","purchaseOrder");
				}
			} else {
				data=data.body;
				if(data.length<pageNum){
					notCountPage(page, 2 , "listPurchaseOrder","purchaseOrder");
				}else{
					notCountPage(page, 1 , "listPurchaseOrder","purchaseOrder");
				}
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
				}
				$("#purchaseOrderDg").datagrid("loadData", data);
			}
		}
		
	})
	getPurchaseMoney();
}

function getpurchaseOrderPageCount(page, type) {
	var pageNum = 20;
	
	$.ajax({
		type:"post",
		url:"../listPurchaseOrder.action",
		data:{
			splitFlag : 0,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0 ||data.body[0].totalNum==0) {
				var countJson = {
						totalNum:0,
				};
				getCountData(0,countJson,pageNum,page,"purchaseOrder",0);
			} else {
				data=data.body;
				var countJson = {
						totalNum	: data[0].totalNum,
				};
				getCountData(1,countJson,pageNum,page,"purchaseOrder",0);
			}
		}
	});
}

function openPurchaseOrderDetail(row){
	
	var goodss = JSON.parse(row.cgpGoodsJson.getRealJsonStr());
	$("#purchaseOrderDetailDg").datagrid('loadData',goodss);
	
	for(var i in row){
		$("#q" + i).val(row[i])
	}
	
	$('#purchaseOrderDetailDlg').dialog({
		title : '订单详情',
		top : getTop(400),
		left : getLeft(750),
		width : 750,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	
	$('#purchaseOrderDetailDlg').dialog('open');
}

function openCheckGoods(){
	listCheckGoods(1,0);
	$('#checkGoodsDlg').dialog({
		title : '盘点记录',
		top : getTop(500),
		left : getLeft(750),
		width : 750,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	
	$('#checkGoodsDlg').dialog('open');
}

function listCheckGoods(page,type){
	var pageNum = 10;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var cgName = $('#searchCheckGoodsName').val();
	var cgCode = $('#searchCheckGoodsCode').val();
	
	
	var startTime = $('#searchCheckGoodsStartTime').val();
	var endTime = $('#searchCheckGoodsEndTime').val();
	
	$.ajax({
		type:"post",
		url:"../listCsGoodsInventory.action",
		dataType:"json",
		data:{
			startNum : startNum,
			endNum : endNum,
			splitFlag : 1,
			cgName:cgName,
			cgCode:cgCode,
			startTime:startTime,
			endTime:endTime
			
		},
		success:function(data){
			if (data.code<0) {
				$('#checkGoodsDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
				if(page==1){
					notCountPage(0, 0 ,"listCheckGoods","checkGoods");
				}else{
					notCountPage(page, 0 ,"listCheckGoods","checkGoods");
				}
			} else {
				data=data.body;
				if(data.length<pageNum){
					notCountPage(page, 2 , "listCheckGoods","checkGoods");
				}else{
					notCountPage(page, 1 , "listCheckGoods","checkGoods");
				}
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
				}
				$("#checkGoodsDg").datagrid("loadData", data);
			}
		}
		
	})
}

function getcheckGoodsPageCount(page, type) {
	var pageNum = 10;
	
	$.ajax({
		type:"post",
		url:"../listCsGoodsInventory.action",
		data:{
			splitFlag : 0,
		},
		dataType:"json",
		success:function(data){
			if (data.code<0 ||data.body[0].totalNum==0) {
				var countJson = {
						totalNum:0,
				};
				getCountData(0,countJson,pageNum,page,"checkGoods",0);
			} else {
				data=data.body;
				var countJson = {
						totalNum	: data[0].totalNum,
				};
				getCountData(1,countJson,pageNum,page,"checkGoods",0);
			}
		}
	});
}

function beginUpdateGoods(){
	
	$("#updatePreferential").val($("#dcgPreferential").val() == "是" ? 1 : 0);
	$("#updateSellWell").val($("#dcgSellWell").val()  == "是" ? 1 : 0);
	$("#updateState").val($("#dcgState").val()  == "是" ? 1 : 0);
	
	getGoodsType("updateCategory",$("#dcgCategoryId").val());
	
	$("#goodsDetailDlg [clear='clear']").removeAttr("disabled");
	$("#goodsDetailDlg .update").show();
	$("#goodsDetailDlg .updateNone").hide();
}

function closeUpdateGoods(){
	$("#goodsDetailDlg [clear='clear']").attr("disabled","disabled");
	$("#goodsDetailDlg .update").hide();
	$("#goodsDetailDlg .updateNone").show();
}

function formatImgState(value,row,index){
	if(row.cgImgPath == "" || row.cgImgPath == null){
		return "<span style='color:red;'>无</span>";
	}else{
		return "<span>有</span>";
	}
}

function openShopSetUp(){
	getShopSetUp();
	$('#shopSetUpDlg').dialog({
		title : '商店设置',
		top : getTop(500),
		left : getLeft(750),
		width : 750,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	
	$('#shopSetUpDlg').dialog('open');
}

function getShopSetUp(){
	$.ajax({
		type:"post",
		url:"../selectShopSetUp.action",
		data:{
			cgsuId:1
		},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.code == 1){
				let info = data.body[0];
				console.log(info)
				for(let i in info){
					$("#" + i).val(info[i])
					if(i=='cgsuShopAccount' || i == 'cgsuCashAccount'){
						var fa = $("#" + i);
						fa.find('.accountType').append('<option></option>');
						fa.find('.accountName').append('<option></option>');
						for (var j in _acountType) {
							fa.find('.accountType').append("<option value='" + _acountType[j] + "'>" + _acountType[j] + "</option>");
						}
						var accountId = info[i];
						if(info[i] != null && info[i] != ""){
							$.ajax({
								type:"post",
								url:"../selectNamePublic.action",
								data:{
									faId :accountId
								},
								dataType:"json",
								async:false,
								success:function(account){
									fa.find(".accountName").empty();
									fa.find(".accountType").val(account.body[0].faPaymentType);
									//为了查出该种类的其他数据
									$.ajax({
										type:"post",
										url:"../selectNamePublic.action",
										data:{
											faPaymentType: account.body[0].faPaymentType,
										},
										dataType:"json",
										async:false,
										success:function(result){
											for (var k in result.body) {
												if(result.body[k].faId == accountId){
													fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "' selected='selected'>" + result.body[k].faUserName + "</option>");
													fa.find(".accountId").val(result.body[k].faId);
													fa.find(".accountNum").val(result.body[k].faAccount);
													fa.find(".accountBelong").val(result.body[k].faBelonging);
												}else{
													fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "'>" + result.body[k].faUserName + "</option>");
												}
											}
										}
									})
								}
							})
						}
					}
				}
				ergodicInputItem(info.cgsuAdFont,'ad');
				ergodicInputItem(info.cgsuCommunity,'address');
			}else{
				myTips("查询商超设置表失败","error");
			}
		}
	});
}

function CompareDate(t1,t2){
	var date = new Date();
	var a = t1.split(":");
	var b = t2.split(":");
	return date.setHours(a[0],a[1]) > date.setHours(b[0],b[1]);
}

function updateShopSetUp(){
	var cgsuShippingFee = $("#cgsuShippingFee").val();
	var cgsuOweState = $("#cgsuOweState").find("option:selected").val();
	var cgsuOweMax = $("#cgsuOweMax").val();
	var cgsuShopName = $("#cgsuShopName").val();
	var cgsuFreeShippingFeeNum = $("#cgsuFreeShippingFeeNum").val();
	var cgsuAdFont = getInputItem('ad');
	var cgsuCommunity = getInputItem('address');

	var cgsuShopAccount = $("#cgsuShopAccount").find(".accountId").val();
	var cgsuCashAccount = $("#cgsuCashAccount").find(".accountId").val();
	
	var cgsuBeginTime = $("#cgsuBeginTime").val();
	var cgsuEndTime = $("#cgsuEndTime").val();
	var cgsuState = $("#cgsuState option:selected").val();
	if(CompareDate(cgsuBeginTime,cgsuEndTime)){
		myTips("营业开始时间不能大于营业结束时间","error");
		return;
	}
	
	$.ajax({
		type:"post",
		url:"../updateShopSetUp.action",
		data:{
			cgsuShippingFee:cgsuShippingFee,
			cgsuOweState:cgsuOweState,
			cgsuOweMax:cgsuOweMax,
			cgsuShopName:cgsuShopName,
			cgsuFreeShippingFeeNum:cgsuFreeShippingFeeNum,
			cgsuAdFont:cgsuAdFont,
			cgsuCommunity:cgsuCommunity,
			cgsuId : 1,
			cgsuShopAccount:cgsuShopAccount,
			cgsuCashAccount:cgsuCashAccount,
			cgsuBeginTime:cgsuBeginTime,
			cgsuEndTime:cgsuEndTime,
			cgsuState:cgsuState
		},
		dataType:"json",
		success:function(data){
			if(data.code == 1){
				$('#shopSetUpDlg').dialog('close');
				myTips("修改成功","success");
			}else{
				myTips("修改失败","error");
			}
		}
	});
}

function ergodicInputItem(dataStr,id){
	let data = JSON.parse(dataStr.getRealJsonStr());
	var html = '<div style="margin:0 0 0 0px"><input class="'+id+'Item" value="" style="width:280px;margin:10px 0 0 0" /></div>';
	
	for(let i in data){
		if(i == 0){
			html = '<div style="margin:0 0 0 0px"><input class="'+id+'Item" value="'+data[i][id]+'" style="width:280px;margin:10px 0 0 0" /></div>'
		}else{
			html += '<div style="margin: 10px 0 0 0px"><input class="'+id+'Item" value="'+data[i][id]+'" style="width:280px;" /><img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -5px 10px" /></div>'
		}
	}
	
	$("#" +id).html(html)
}

function addInput(id){
	var html = '<div style="margin: 10px 0 0 0px"><input class="'+id+'Item" value="" style="width:280px;" /><img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -5px 10px" /></div>';
	
	$("#" + id).append(html);
}

$("#ad,#address").delegate(".cleanItem","click",function(){
	$(this).parent().remove();
})

function getInputItem(id){
	var array = [];
	
	$("#"+id+" ."+id+"Item").each(function (){
		let item = {};
		item[id] = $(this).val();
		array.push(item);
	})
	
	return JSON.stringify(array)
}



/***********************************************************商店广告图片上传start****************************************************************/
//电脑上传
function uploadPic(){
	$('#uploadDlg').dialog({
		title : '上传',
		top : getTop(464),
		left : getLeft(600),
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refresh();
		}
	});
	creatQr();
	$.post("../pubupload/getUpTokenCallback.action",function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$('#uploadDlg input[clear=true]').val('');
		$("#token").val(token);
		$("#co").val(co);
		$("#cgsuId").val("1");
		$("#type").val("1");
		initUploader();
		doCancel();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creatQr(){
	$.post("../pubupload/getMobUploadUrl.action",{
		cgsuId : 1,
		type:1
	},function(data){
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel();
	});
}

//查看图片
function checkPic() {
	doCancel();
	showPic();
}
//删除图片
function removePic(){
	var photos = $('.contFile');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePicture').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemovePic').show();
	}
}
//执行删除图片
function doRemovePic(){
	var arr = 0;
	var path = '';
	var chk = $('.picturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		$.post("../deleteShopAdImg.action",{
			cgsuId : 1,
			cgsuAdImgPath : path
		}, function(data) {
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				showPic();
			}
		});
		doCancel();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
//取消删除图片
function doCancel(){
	$('#removePicture').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic').hide();
}
function showPic(){
	$('#shopImgDlg').dialog({
		title : '查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapper").empty();
		},
	});
	$("#imgWrapper").empty();
	$.post("../selectShopSetUp.action",{
		cgsuId:1
	}, function(data) {
		if(data.code < 0){
			$("#imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		data=data.body;
		var path = data[0].cgsuAdImgPath;
		$('#shopImgDlg').dialog('open');
		if (path == null) {
			return;
		}
		var img = eval('([' + path.getRealJsonStr() + '])');
		var imgNum = 0;
		var fileNum = 0;
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapper .fileList').append('<li>' +
						'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+img[i].path+'" class="contFile" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
						'</li>');
				fileNum++;
				
			}
		}
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			var j = parseInt(i) + parseInt(img.length);
			if(ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png"){
				if(imgNum == 0){
					$('#imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="shopAdImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
		$(".shopAdImg").colorbox({
			rel:'shopAdImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//刷新
function refresh(){
	doCancel();
	showPic();
}
/***********************************************************商店广告图片上传end****************************************************************/

/***********************************************************商店执照图片上传start****************************************************************/
//电脑上传
function uploadPic1(){
	$('#uploadDlg').dialog({
		title : '上传',
		top : getTop(464),
		left : getLeft(600),
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refresh1();
		}
	});
	creatQr1();
	$.post("../pubupload/getUpTokenCallback.action",function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$('#uploadDlg input[clear=true]').val('');
		$("#token").val(token);
		$("#co").val(co);
		$("#cgsuId").val("1");
		$("#type").val("2");
		initUploader();
		doCancel1();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creatQr1(){
	$.post("../pubupload/getMobUploadUrl.action",{
		cgsuId : 1,
		type:2
	},function(data){
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel1();
	});
}

//查看图片
function checkPic1() {
	doCancel1();
	showPic1();
}
//删除图片
function removePic1(){
	var photos = $('.contFile');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePicture1').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemovePic1').show();
	}
}
//执行删除图片
function doRemovePic1(){
	var arr = 0;
	var path = '';
	var chk = $('.picturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapper1 input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapper1 input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		$.post("../deleteShopAdImg.action",{
			cgsuId : 1,
			cgsuLicenseImg : path
		}, function(data) {
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				showPic1();
			}
		});
		doCancel1();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
//取消删除图片
function doCancel1(){
	$('#removePicture1').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic1').hide();
}
function showPic1(){
	$('#shopLincenseImgDlg').dialog({
		title : '查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose: function(){
			var path = "";
			var flag = true;
			$("#shopLincenseImgDlg .shopLicenseImgDiv").each(function(){
				var url = $(this).find(".imgPath").attr("src");
				var name = $(this).find(".imgName").text();
				var title = $(this).find(".shopLicenseInput").val();
				if(title == "" || title == null){
					flag = false;
				}
				if(path == ""){
                    path = '{"path":"' + url + '","name":"' + name + '","title":"' +title+ '"}';
                }else{
                    path = path + ',{"path":"' + url + '","name":"' + name + '","title":"' + title+ '"}';
                }
			})
			if(!flag){
				myTips("有图片标题没有确定","error");
				return false;
			}else{
				$.ajax({
					type:"post",
					url:"../updateShopSetUp.action",
					data:{
						cgsuLicenseImg : path,
						cgsuId : 1
					},
					dataType:"json",
					success:function(data){
						if(data.code == 1){
						}else{
							myTips("修改失败","error");
						}
					}
				});
			}
		},
		onClose : function() {
			$("#imgWrapper1").empty();
		},
	});
	$("#imgWrapper1").empty();
	$.post("../selectShopSetUp.action",{
		cgsuId:1
	}, function(data) {
		if(data.code < 0){
			$("#imgWrapper1").append("<p>" + data.msg + "</p>");
			return;
		}
		data=data.body;
		var path = data[0].cgsuLicenseImg;
		$('#shopLincenseImgDlg').dialog('open');
		if (path == null) {
			return;
		}
		var img = eval('([' + path.getRealJsonStr() + '])');
		var imgNum = 0;
		var fileNum = 0;
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapper1').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapper1 .fileList').append('<li>' +
						'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+img[i].path+'" class="contFile" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
						'</li>');
				fileNum++;
				
			}
		}
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			var j = parseInt(i) + parseInt(img.length);
			if(ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png"){
				if(imgNum == 0){
					$('#imgWrapper1').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapper1 .imageList').append('<li style="float:left;position:relative;" class="shopLicenseImgDiv">' +
					'<img title="'+img[i].name+'" class="shopLicenseImg contFile imgPath" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p class="imgName" style="position:absolute;bottom:50px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'<div style="margin: 0 0 0 70px">标题</div>' + 
					'<div><input style="width:157px" value="'+img[i].title+'" class="shopLicenseInput" /></div>' + 
					'<div><select onchange="updateFont(this)" class="shopLicenseSelect" style="width:157px"><option></option><option>营业执照</option><option>实体店经营</option><option>商标注册证书</option><option>食品流通许可证</option><option>食品经营许可证</option><option>印刷经营许可证</option><option>道路经营许可证</option><option>出版物经营许可证</option><option>特种行业经营许可证</option></select></div>'+
					'</li>'
					);
				imgNum++;
			}
		}
		$(".shopLicenseImg").colorbox({
			rel:'shopLicenseImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//刷新
function refresh1(){
	doCancel1();
	showPic1();
}

function updateFont(that){
	$(that).parent().parent().find(".shopLicenseInput").val($(that).find("option:selected").text());
}


/***********************************************************商店执照图片上传end****************************************************************/


function showAddGoodsType(){
	$("#addGoodsCategory").show();
	$("#editGoodsCategory").hide();
}

function hideAddGoodsType(){
	$("#addGoodsCategory").hide();
}

function showEditGoodsType(){
	var goodsType = $("#allCategory option:selected").val();
	var goodsTypeText = $("#allCategory option:selected").text();
	console.log(goodsType)
	if(goodsType == "" || goodsType == null){
		myTips("请选择一种品类来修改","error");
		return;
	}
	$("#editGoodsTypeName").val(goodsTypeText);
	$("#editGoodsTypeName").attr("data-id",goodsType);
	
	$("#addGoodsCategory").hide();
	$("#editGoodsCategory").show();
}

function updateGoodsType(){
	var id = $("#editGoodsTypeName").attr("data-id");
	var cgcCategoryName = $("#editGoodsTypeName").val();
	if(cgcCategoryName =="" || cgcCategoryName == null){
		myTips("品类名称不能为空","error");
		return;
	}
	
	$.ajax({
		url:"../updateCsGoodsCategory.action",
		type:"post",
		data:{
			id:id,
			cgcCategoryName:cgcCategoryName
		},
		dataType:"json",
		success:function(result){
			if (result.code < 0) {
				myTips(result.msg, 'error');
				return;
			} else {
				myTips('修改成功！', 'success');
				getGoodsType("allCategory");
				cleanAddAndEdit();
			}
		}
	})
}

function deleteGoodsType(){
	var goodsType = $("#allCategory option:selected").val();
	var goodsTypeNum = $("#allCategory option:selected").attr("data-num");
	if(goodsType == "" || goodsType == null){
		myTips("请选择一种品类来删除","error");
		return;
	}
	if(goodsTypeNum > 0){
		myTips("该品类下面还有商品,不能删除","error");
		return;
	}
	
	$.ajax({
		url:"../updateCsGoodsCategory.action",
		type:"post",
		data:{
			id:goodsType,
			cgsDeleteState:1
		},
		dataType:"json",
		success:function(result){
			if (result.code < 0) {
				myTips(result.msg, 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				getGoodsType("allCategory");
			}
		}
	})
	
}

function openDeleteGoodsType(){
	$.messager.confirm("操作提示", "确定要删除吗？", function(data) {
		if (data) {
			deleteGoodsType();
		}else{
			return;
		}
	});
}

function cleanAddAndEdit(){
	$("#addGoodsTypeDlg .goodType").hide();
}

function cancelUpdateGoods(){
	var row = $('#goodsDg').datagrid('getSelected');
	for(var i in row){
		$("#d" + i).val(row[i])
	}
	closeUpdateGoods();
}

function getPurchaseMoney(){
	var startTime = $("#searchPurchaseStartTime").val();
	var endTime = $("#searchPurchaseEndTime").val();
	$.ajax({
		url:"../getPurchaseMoney.action",
		type:"post",
		data:{
			startTime:startTime,
			endTime:endTime
		},
		dataType:"json",
		success:function(result){
			if (result.code < 0) {
				$("#purchaseMoney").val("");
				return;
			} else {
				$("#purchaseMoney").val(result.body[0].totalPurchaseMoney)
			}
		}
	})
	
}

//账户类型和账号联动
function changeWay(evet) {
	console.log(evet)
	var fa = $(evet).parent().parent();
	var faPaymentType = fa.find(".accountType").find("option:selected").text();
	fa.find(".accountName").empty();
	fa.find(".accountName").append("<option></option>");
	fa.find(".accountId").val("");
	fa.find(".accountNum").val("");
	fa.find(".accountBelong").val("");
	if(faPaymentType == ""){
		return;
	}
	$.post("../selectNamePublic.action", {
		faPaymentType:faPaymentType,
	}, function(data) {
		fa.find(".accountName").empty();
		fa.find(".accountName").append("<option></option>");
		for (var i in data.body) {
			fa.find(".accountName").append("<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
		}
	});
}

function getAccountId(evet) {
	var fa = $(evet).parent().parent();
	
	var data = fa.find(".accountName").val();
	if(data == ''){
		fa.find(".accountId").val("");
		fa.find(".accountBelong").val("");
		fa.find(".accountNum").val("");
	}else{
		fa.find(".accountId").val(data.split("*#*")[0])
		fa.find(".accountBelong").val(data.split("*#*")[1])
		fa.find(".accountNum").val(data.split("*#*")[2])
	}
}


function openDiscount(){
	listCsGoodsDiscount()
	$('#discountDlg').dialog({
		title : '优惠方案',
		top : getTop(400),
		left : getLeft(750),
		width : 750,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	
	$('#discountDlg').dialog('open');
}

function openDiscountOpreation(type,row){
	var title = "";
	if(type == 1){
		title = '添加优惠方案';
		$("#saveDiscountButton").show();
	}else if(type == 2){
		title = '优惠详情';
		setData(row);
		$("#updateDiscountButton").show();
	}
	$('#discountOpreationDlg').dialog({
		title : title,
		top : getTop(400),
		left : getLeft(350),
		width : 350,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#discountCategory").hide();
			$("#discountOpreationDlg  [clean='clean']").val("");
			removeDisabled();
			$("#ladderDiv").empty();
			$("#updateDiscountButton").hide();
			$("#saveDiscountButton").hide();
			$("#doUpdateDiscountButton").hide();
		}
	});
	
	$('#discountOpreationDlg').dialog('open');
}

function createLadder(num,ladder){
	var html = "";
	for(var i = 0;i < num;i++){
		if(ladder == undefined){
			html += "<div class=\"item\" style=\"display:flex;margin:10px 0 0 60px\">"+
			"				<div>满</div>"+
			"				<div style=\"margin:0 10px 0 10px\"><input class=\"limitValue\" type=\"number\" style=\"width:50px;border-left:0px;border-top:0px;border-right:0px;text-align:center\" /></div>"+
			"				<div>减</div>"+
			"				<div style=\"margin:0 10px 0 10px\"><input class=\"minusValue\" type=\"number\" style=\"width:50px;border-left:0px;border-top:0px;border-right:0px;text-align:center\" /></div>"+
			"			</div>";
		}else{
			html += "<div class=\"item\" style=\"display:flex;margin:10px 0 0 60px\">"+
			"				<div>满</div>"+
			"				<div style=\"margin:0 10px 0 10px\"><input class=\"limitValue\" type=\"number\" value=\""+ladder[i].limitValue+"\" style=\"width:50px;border-left:0px;border-top:0px;border-right:0px;text-align:center\" /></div>"+
			"				<div>减</div>"+
			"				<div style=\"margin:0 10px 0 10px\"><input class=\"minusValue\" type=\"number\" value=\""+ladder[i].minusValue+"\" style=\"width:50px;border-left:0px;border-top:0px;border-right:0px;text-align:center\" /></div>"+
			"			</div>";
		}
	}
	
	$("#ladderDiv").html(html);
}

function changLadder(){
	var ladder = $("#discountLadder option:selected").val();
	createLadder(ladder);
}

function saveDiscount(){
	var insertData = getDiscountData();
	if(typeof insertData == "string"){
		myTips(insertData,"error");
		return;
	}
	showLoading();
	$.ajax({
		url:"../insertCsGoodsDiscount.action",
		data:insertData,
		type:"post",
		dataType:"json",
		success: function(result){
			hideLoading();
			if(result.code > 0){
				myTips("新增成功","success");
				$('#discountOpreationDlg').dialog('close');
				listCsGoodsDiscount();
			}else{
				myTips(result.msg,"error");
			}
		}
	})
}

function checkDiscountType(id){
	var type = $("#discountType option:selected").val();
	if(type == "品类满减"){
		getGoodsType("discountCategoryId",id);
		$("#discountCategory").show();
	}else{
		$("#discountCategory").hide();
	}
	
}

function listCsGoodsDiscount(){
	$.ajax({
		url:"../listCsGoodsDiscount.action",
		data:{},
		type:"post",
		dataType:"json",
		success: function(result){
			if(result.code > 0){
				var data = result.body;
				for(var i in data){
					data[i].state = data[i].cgdState == 1 ? "启用" : "未启用";
				}
				$("#discountDg").datagrid('loadData', data);
			}else{
			}
		}
	})
}

function setData(row){
	/*cgdType:cgdType,
	cgdDescribe:cgdDescribe,
	cgdMode:cgdMode,
	cgdState:cgdState*/
	
	$("#discountName").val(row.cgdName);
	$("#discountType").val(row.cgdType);
	$("#describe").val(row.cgdDescribe);
	$("#cgdId").val(row.cgdId);
	checkDiscountType(row.cgdCategoryId);
	
	
	var ladderData = JSON.parse(row.cgdMode.getRealJsonStr());
	var ladderNum = ladderData.length;
	$("#discountLadder").val(ladderNum);
	createLadder(ladderNum,ladderData);
	addDisabled();
}

function addDisabled(){
	$("#discountOpreationDlg input,select,textarea").attr("disabled","disabled");
}

function removeDisabled(){
	$("#discountOpreationDlg input,select,textarea").removeAttr("disabled");
}

function beginUpdateDiscount(){
	$("#updateDiscountButton").hide();
	$("#doUpdateDiscountButton").show();
	removeDisabled();
}

function doUpdate(){
	var updateData = getDiscountData();
	if(typeof updateData == "string"){
		myTips(updateData,"error");
		return;
	}
	var cgdId = $("#cgdId").val();
	updateData.cgdId = cgdId;
	showLoading();
	$.ajax({
		url:"../updateDiscount.action",
		data:updateData,
		type:"post",
		dataType:"json",
		success: function(result){
			hideLoading();
			if(result.code > 0){
				myTips("修改成功","success");
				$('#discountOpreationDlg').dialog('close');
				listCsGoodsDiscount();
			}else{
				myTips(result.msg,"error");
			}
		}
	})
}

function getDiscountData(){
	var cgdName = $("#discountName").val();
	var cgdType = $("#discountType option:selected").text();
	var cgdDescribe = $("#describe").val();
	if(cgdName == ""){
		return "方案名不能为空";
	}
	if(cgdType == ""){
		return "优惠类型不能为空";
	}
	if(cgdDescribe == ""){
		return "方案描述不能为空";
	}
	
	var ladder = [];
	var nullFalg = true;
	var valueFalg = true;
	$("#ladderDiv .item").each(function(){
		var ladderObj = {};
		ladderObj.limitValue = $(this).find(".limitValue").val();
		ladderObj.minusValue = $(this).find(".minusValue").val();
		if(ladderObj.limitValue == "" || ladderObj.minusValue == ""){
			nullFalg = false;
		}
		if(ladderObj.limitValue * 1 < ladderObj.minusValue * 1){
			valueFalg = false;
		}
		ladder.push(ladderObj);
	})
	var cgdMode = JSON.stringify(ladder);
	
	if(cgdMode == "[]"){
		return "优惠阶梯不能为空";
	}
	
	if(!nullFalg){
		return "优惠阶梯内的值不能为空";
	}
	if(!valueFalg){
		return "减去的金额不能大于满减的金额";
	}
	
	var cgdState = 0;
	
	var data = {
		cgdName:cgdName,
		cgdType:cgdType,
		cgdDescribe:cgdDescribe,
		cgdMode:cgdMode,
		cgdState:cgdState
	}
	
	//优惠类型是品类优惠的时候
	if(cgdType == "品类满减"){
		data.cgdCategoryId = $("#discountCategoryId option:selected").val();
	}else{
		data.cgdCategoryId = "";
	}
	
	return data;
}

function startAndEndPlan(state){
	var row = $("#discountDg").datagrid('getSelected');
	if(row == null){
		myTips("请选择一种方案进行操作","error");
		return;
	}
	if(state == 2){
		$.messager.confirm("警告", "确定要删除此优惠方案？", function(data) {
			if (data) {
				doOpreatePlan(state,row);
			} else {
				
			}
		});
	}else{
		if(row.cgdState == state){
			myTips("该方案的状态已经是" + row.state,"error");
		}else{
			doOpreatePlan(state,row);
		}
	}
}

function doOpreatePlan(state,row){
	
	$.ajax({
		url:"../updateDiscount.action",
		data:{
			cgdId:row.cgdId,
			cgdState:state,
			cgdType:row.cgdType
		},
		type:"post",
		dataType:"json",
		success: function(result){
			hideLoading();
			if(result.code > 0){
				myTips("操作成功","success");
				listCsGoodsDiscount();
			}else{
				myTips(result.msg,"error");
			}
		}
	})
}

function openGoodsIntroduce(){
	var row = $('#goodsDg').datagrid('getSelected');
	editor.txt.html(row.cgIntroduce);
	$('#goodsIntroduce').dialog({
		title : "商品介绍",
		top : getTop(500),
		left : getLeft(650),
		width : 650,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	
	$('#goodsIntroduce').dialog('open');
}

function updateEdit(){
	var row = $('#goodsDg').datagrid('getSelected');
	var cgIntroduce = editor.txt.html();
	
	showLoading();
	$.ajax({
		type:"post",
		url:"../updateGoods.action",
		data:{
			cgIntroduce:cgIntroduce,
			id:row.id,
		},
		dataType:"json",
		success:function(result){
			hideLoading();
			if(result.code == 1){
				myTips("修改成功","success");
				listGoods(_pageNum[0],0);
				console.log(result.body)
				var data = result.body[0];
				for(var i in data){
					$("#d" + i).val(data[i])
				}
				$("#dcgPreferential").val(data.cgPreferential == 1 ? "是" : "否");
				$("#dcgSellWell").val(data.dcgSellWell  == 1 ? "是" : "否");
				$("#dcgState").val(data.dcgState  == 1 ? "是" : "否");
				closeUpdateGoods();
			}else{
				myTips("修改失败","error")
			}
		}
	})
}

function openAddSN(index){
	var row = $("#purchaseGoodsDg").datagrid("getRows");
	if(row[index].sn != undefined && row[index].sn != null && row[index].sn != ""){
		$("#addSnTable").datagrid("loadData",row[index].sn);
	}
	
	$("#goodsSNIndex").val(index);
	$('#addSNDlg').dialog({
		title : "添加SN码",
		top : getTop(400),
		left : getLeft(350),
		width : 350,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addSnInput").val('');
			$("#addSnTable").datagrid("loadData",[]);
		}
	});
	
	$('#addSNDlg').dialog('open');
	$("#addSnInput").focus();
}

function addSNToTable(){
	var sn = $("#addSnInput").val();
	$("#addSnInput").val('');
	if(sn == ""){
		myTips("sn码不能为空","error");
		return;
	}
	var rows = $("#addSnTable").datagrid("getRows");
	for(var i in rows){
		if(sn == rows[i].sn){
			myTips("sn码不能重复录入","error");
			return;
		}
	}
	var obj = {}
	obj.sn = sn;
	rows.push(obj);
	
	$("#snTotalNum").html(rows.length)
	
	$("#addSnTable").datagrid("loadData",rows);
}

function saveSNs(){
	var index = $("#goodsSNIndex").val();
	var snRows = $("#addSnTable").datagrid("getRows");
	
	var rows = $("#purchaseGoodsDg").datagrid("getRows");
	rows[index].sn = snRows;
	rows[index].num = snRows.length;
	
	$("#purchaseGoodsDg").datagrid("loadData",rows);
	$('#addSNDlg').dialog('close');
}

function deleteSn(value, row, index){
	return "<a href='#' onclick=\"myDeleteRows('"+row.sn+"','sn','addSnTable',0);sumTotalPrice();\">删除</a>";
}

function delect(index) {
	$.messager.confirm('确认框','确定要删除该行吗?',function(r){
	    if (r){
			$("#purchaseGoodsDg").datagrid("deleteRow",index);
	    }
	});
}