$(function(){
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
});
/*添加优惠方案*/
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
		top : 30,
		left : 350,
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
function removeDisabled(){
	$("#discountOpreationDlg input,select,textarea").removeAttr("disabled");
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
/*保存优惠方案*/
function saveDiscount(){
	var insertData = getDiscountData();
	if(typeof insertData == "string"){
		myTips(insertData,"error");
		return;
	}
	/*showLoading();*/
	$.ajax({
		url:"../insertCsGoodsDiscount.action",
		data:insertData,
		type:"post",
		dataType:"json",
		success: function(result){
			/*hideLoading();*/
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

/*修改方案*/
function beginUpdateDiscount(){
	$("#updateDiscountButton").hide();
	$("#doUpdateDiscountButton").show();
	removeDisabled();
}
/*保存*/
function doUpdate(){
	var updateData = getDiscountData();
	if(typeof updateData == "string"){
		myTips(updateData,"error");
		return;
	}
	var cgdId = $("#cgdId").val();
	updateData.cgdId = cgdId;
	/*showLoading();*/
	$.ajax({
		url:"../updateDiscount.action",
		data:updateData,
		type:"post",
		dataType:"json",
		success: function(result){
			/*hideLoading();*/
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
/*查询数据*/
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
function checkDiscountType(id){
	var type = $("#discountType option:selected").val();
	if(type == "品类满减"){
		getGoodsType("discountCategoryId",id);
		$("#discountCategory").show();
	}else{
		$("#discountCategory").hide();
	}
	
}
function changLadder(){
	var ladder = $("#discountLadder option:selected").val();
	createLadder(ladder);
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
/*启用*/

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
			/*hideLoading();*/
			if(result.code > 0){
				myTips("操作成功","success");
				listCsGoodsDiscount();
			}else{
				myTips(result.msg,"error");
			}
		}
	})
}
