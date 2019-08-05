$(function(){
	queryContractNum(1,0);
	$("#contractNumDg").datagrid({
		onDblClickRow : function(rowIndex, rowData){
			$('.detail_index').val(rowIndex);
			for(var i in rowData){
	    		$('#p'+i).val(rowData[i])
	    	}
			$('#detailDlg').dialog({
				title : '详细信息',
				top : getTop(300),
				left : getLeft(620),
				width : 620,
				height : 300,
				closed : true,
				cache : false,
				modal : true,
				onClose : function() {
					$('#detailDlg [clear="clear"]').val('');
					$('#detailDlg [clear="clear"]').html('');
				}
			});
			$('#detailDlg').dialog('open');
		}
	});
	//下拉框添加
	for(var i in _contractType){
		$(".jrrContractType").append("<option value='" + _contractType[i] + "'>" + _contractType[i] + "</option>");
	}
	for(var i in _hrPaymentType){
		$(".jrrPaymentMethod").append("<option value='" + _hrPaymentType[i] + "'>" + _hrPaymentType[i] + "</option>");
	}
	$("#contractBefor").onlyAlpha();
	$.post("../queryDepartment.action", {
		departmentStorefrontId : _loginStore,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for(var i in data.body){
			for(var j in data.body[i]){
				if(data.body[i][j]==null){
					data.body[i][j]='';
				}
			}
		}
		for (var i in data.body) {
			$(".add_saveHouse_theStore").append(
					"<option value = '" + data.body[i].departmentId + "'>"
							+ data.body[i].departmentName + "</option>");
		}
	}, "json");
	
});

function detailLaterOrNext(type){
	var index = $('.detail_index').val();
	var changeData = {};
	if(type == 0){
		if(index != 0){
			var num = parseInt(index) - 1;
			$(".detail_index").val(num);
			changeData = $('#contractNumDg').datagrid('getData').rows[num];
			$('#contractNumDg').datagrid('selectRow', num);
		}else{
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	}else{
		var size = $("#contractNumDg").datagrid("getData").total;
		if(index != size-1){
			var num = parseInt(index) + 1;
			$(".detail_index").val(num);
			changeData = $('#contractNumDg').datagrid('getData').rows[num];
			$('#contractNumDg').datagrid('selectRow', num);
		}else{
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
		for(var i in changeData){
    		$('#p'+i).val(changeData[i])
    	}
	}
}

//分页统计总条数
function getcontractNumPageCount(page){
	var pageSize = 20;
	var jcdContractPrefix = $("#searchNumPrefix").val();
	var jcdContractNumber = $("#searchNum").val();
	var jcdUseState = $("#searchNumState").val();
	var jcdRecipient = $("#searchJcdRecipientGetUserId").val();
	var jcdHouseAddress = $("#searchJcdHouseAddress").val();
	var jcdUsedType = $("#searchJcdUsedType").val();
	$.post("../selectContractDatabase.action", {
		jcdUseState:jcdUseState,
		jcdContractPrefix:jcdContractPrefix,
		jcdContractNumber:jcdContractNumber,
		jcdRecipient:jcdRecipient,
		jcdHouseAddress:jcdHouseAddress,
		jcdUsedType:jcdUsedType,
	},function(data){
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"contractNum",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"contractNum",0);
		}
	});
}

function queryContractNum(page,type){
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var jcdContractPrefix = $("#searchNumPrefix").val();
	var jcdContractNumber = $("#searchNum").val();
	var jcdUseState = $("#searchNumState").val();
	var jcdRecipient = $("#searchJcdRecipientGetUserId").val();
	var jcdHouseAddress = $("#searchJcdHouseAddress").val();
	var jcdUsedType = $("#searchJcdUsedType").val();
	$.post("../selectContractDatabase.action", {
		startNum : startNum,
		endNum : endNum,
		jcdUseState:jcdUseState,
		jcdContractPrefix:jcdContractPrefix,
		jcdContractNumber:jcdContractNumber,
		jcdRecipient:jcdRecipient,
		jcdHouseAddress:jcdHouseAddress,
		jcdUsedType:jcdUsedType,
	},function(data){
		if(data.code<0){
			// sourcePage(0,0,0);
			$('#contractNumDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryContractNum","contractNum");
			}else{
				notCountPage(page, 0 ,"queryContractNum","contractNum");
			}
		}else{
			data=data.body;
			// if(page == 1 && type == 0){
			// 	sourcePage(data[0].totalNum,page,0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryContractNum","contractNum");
			}else{
				notCountPage(page, 1 , "queryContractNum","contractNum");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].totalPage = data[i].jcdContractPrefix  + data[i].jcdContractNumber;
			}
			$("#contractNumDg").datagrid("loadData",data);
		}
	}, "json");
}
//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#contractPage").remove();
		$("#contractNumPageDiv")
				.append(
						"<div class='tcdPageCode' id='contractPage' style='text-align:center;'></div>");
		$("#contractPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					queryContractNum(p, 1);
				}
			}
		});
	}
}
function addContractNum(){
	$("#addContractNumDlg").dialog({
		title : '生成合同票据编号',
		top : getTop(500),
		left : getLeft(600),
		width : 600,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addContractNumDlg input").val("");
			$("#contractNums").val(1);
			$("#addContractNumDlg input[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
			$("#addContractNumDlg select[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
		}
	});
	$("#getNumManDiv").hide();
	$("#settingAddTips").html("");
	$("#addContractNumDlg").dialog('open');
}
var _contractNums = 0;
var _contractNumsFlag = 0;
var _contractNumsArry = [];
//预生成合同票据编号
function readyShowContractNum(){
	var jcdContractPrefix = $("#contractBefor").val().toUpperCase();
	var jcdNote = $("#contractJcdNote").val().toUpperCase();
	var contractLength = $("#contractNums").val();
	var startNumberInput = $("#contractStartNum").val();
	var endNumberInput = $("#contractEndNum").val();
	
	var checkFlag = 0;
	$("#addContractNumDlg input[needs=1]").each(function(){
		if($(this).val()==''||$(this).val()==null){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	$("#addContractNumDlg select[needs=1]").each(function(){
		if($(this).val()==''||$(this).val()==null){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		$("#settingAddTips").html("有必填项未填写!");
		return;
	}
	var startNumberIndex = 0;
	var endNumberIndex = 0;
	if(startNumberIndex[0]==0){
		for(var i = 0;i<startNumberInput.length;i++){
			if(startNumberInput[i]!=0 && startNumberIndex==0){
				startNumberIndex = i;
			}
		}
		startNumberInput= startNumberInput.slice(startNumberIndex);
	}
	if(endNumberInput[0]==0){
		for(var i = 0;i<endNumberInput.length;i++){
			if(endNumberInput[i]!=0 && endNumberIndex==0){
				endNumberIndex =i;
			}
		}
		endNumberInput= endNumberInput.slice(endNumberIndex);
	}
	
	$("#contractStartNum").val(startNumberInput);
	$("#contractEndNum").val(endNumberInput);
	if(startNumberInput!=0){
		startNumberInput = startNumberInput.replace(/\b(0+)/gi,"");
	}
	if(endNumberInput!=0){
		endNumberInput = endNumberInput.replace(/\b(0+)/gi,"");
	}
	var nums = parseInt(endNumberInput)-parseInt(startNumberInput);
	if(startNumberInput==0){
		if(startNumberInput==0){
			$("#contractStartNum").val(0);
		}else if(endNumberInput==0){
			$("#contractEndNum").val(0);
		}
		$("#settingAddTips").html("编号不能为0！");
		return;
	}
	if(nums<1){
		$("#settingAddTips").html("结束编号必须大于开始编号！");
		return;
	}
	cleanContractNum();
	for(var i = startNumberInput ; i<(parseInt(endNumberInput)+1) ; i++){
		
		var jcdContractNumber = i;
		if(i.toString().length<contractLength){
			for(var j=0;j<(parseInt(contractLength)-parseInt(i.toString().length));j++){
				jcdContractNumber = "0"+jcdContractNumber;
			}
		}
		var number = jcdContractPrefix+jcdContractNumber; 
		$("#readyShowDiv").append('<div class="selectShow" onclick="deleteThisDiv(this.id,0)" id="contractNumsShow'+number+'"><div style="float: left;" >'+number
				+'</div><div class="selectShow-x" style="float: right;"></div></div>');
		
		_contractNumsArry.push({
			number				: number,
			jcdContractPrefix	: jcdContractPrefix,
			jcdContractNumber	: jcdContractNumber,
			jcdBornAdult		: _loginUserId,
			jcdUsedType			: jcdNote,
		});
		_contractNums++;
	}
	_contractNumsFlag=1;
	$("#contractNumNums").html("预生成"+_contractNums+"个合同票据编号");
}
function deleteThisDiv(id,type){
	var nums = id.split("contractNumsShow")[1];
	for(var i in _contractNumsArry){
		if(_contractNumsArry[i].number==nums){
			_contractNumsArry.splice(i,1);
		}
	}
	$("#contractNumsShow"+nums).remove();
	_contractNums--;
	$("#contractNumNums").html("预生成"+_contractNums+"个合同票据编号");
	$("#"+id).remove();
}
//清除
function cleanContractNum(){
	_contractNumsFlag=0;
	_contractNums = 0;
	_contractNumsArry = [];
	$("#contractNumNums").html('');
	$("#settingAddTips").html('');
	$("#readyShowDiv").empty();
}
function doAddContractNum(){
	if(_contractNumsFlag==0){
		$("#settingAddTips").html("请预生成合同票据编号!");
		return;
	}
	if(_contractNumsArry.length>1000){
		$("#settingAddTips").html("单次不能生成超过1000个合同票据编号!");
		return;
	}
	showLoading();
	var jsonArray = JSON.stringify(_contractNumsArry);
	$.post("../insertContractDatabase.action",{
		jsonArray:jsonArray
	},function(data){
		hideLoading();
		if(data.code<0){
			if(data.code==-7){
				data=data.body;
				data = data.split("##");
				var dataTips = "以下合同票据编号已存在，不再次进行生成：";
				for(var i in data){
					dataTips+=data[i]+" ";
				}
				$.messager.alert("操作提示", dataTips, 'warning');
				cleanContractNum();
				queryContractNum(1,0);
				$('#addContractNumDlg').dialog('close');
			
			}else{
				myTips("生成失败","error");
				return;	
			}
		}else if(data.code==1){
			myTips("生成成功","success");
			cleanContractNum();
			queryContractNum(1,0);
			$('#addContractNumDlg').dialog('close');
		}
	});
}
//打开领取合同票据编号对话框
function getContractNum(){
	var row = $("#contractNumDg").datagrid("getSelected");
	if(!row){
		myTips('请选中需要领取的合同票据编号开始编号！', 'error');
		return;
	}
	$("#getContractNumDlg").dialog({
		title : '领取合同票据编号',
		top : getTop(185),
		left : getLeft(250),
		width : 250,
		height : 185,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addContractNumDlg input").val("");
			$("#getNumDept").val("");
			$("#getContractNumDlg input[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
			$("#getContractNumDlg select[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
		}
	});
	$("#getContractStartNum").val(row.totalPage);
	$("#getContractEndNumPrefix").val(row.jcdContractPrefix);
	$("#getNumManDiv").show();
	$("#settingGetTips").html("");
	$("#getContractNumDlg").dialog('open');
}
function doGetContractNum(){
	var PrefixStartNum = $("#getContractStartNum").val();
	var PrefixEndNum = $("#getContractEndNumPrefix").val() + $("#getContractEndNumSuffix").val();
	var jcdRecipient = $("#getNumStaffGetUserId").val();
	var jcdReceiveDepartment = $("#getNumDept").val();
	var jcdReceiveStore = $("#getNumStore").val();
	
	var checkFlag = 0;
	$("#getContractNumDlg input[needs=1]").each(function(){
		if($(this).val()==''||$(this).val()==null){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	$("#getContractNumDlg select[needs=1]").each(function(){
		if($(this).val()==''||$(this).val()==null){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		$("#settingGetTips").html("有必填项未填写!");
		return;
	}
	if($('#getNumStaffGetUserId').val()==0){
		$("#settingGetTips").html("请选择领用人");
		return;
	}
	$("#settingGetTips").html("");
	showLoading();
	$.post("../getReceiveAContract.action",{
		PrefixStartNum 		: PrefixStartNum,
		PrefixEndNum 		: PrefixEndNum,
		jcdRecipient		: jcdRecipient,
		jcdReceiveDepartment: jcdReceiveDepartment,
		jcdReceiveStore		: jcdReceiveStore,
	},function(data){
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}else if(data.code==1){
			myTips("领取成功","success");
			queryContractNum(_pageNum[0],0);
			$('#getContractNumDlg').dialog('close');
		}else{
			$.messager.alert("操作提示", "存在已经领取、已签约、注销的合同票据编号："+data.body);
			return;
		}
	});
}
function doUpdateContractNum(){
	var row = $("#contractNumDg").datagrid("getSelected");
	if(row == null){
		myTips('请选中需要注销的合同票据编号！', 'error');
		return;
	}
	if(row.jcdUseState == '注销'){
		myTips('此合同票据编号已经注销，无法二次注销！', 'error');
		return;
	}
	$('#logout').dialog({
		title : '注销编号',
		top : getTop(200),
		left : getLeft(400),
		width : 400,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#logout [clear="clear"]').val('');
			$('#logout [clear="clear"]').html('');
		}
	});
	$('#logout').dialog('open');
}

function updateContractNumState(){
	var jcdCancellationReason = $("#jcdCancellationReason").val();
	if(jcdCancellationReason != ''){
		var row = $("#contractNumDg").datagrid("getSelected");
		var jcdId = row.jcdId;
		var jcdUseState = $("#updateContractNumState").val();
		showLoading();
		$.post("../updataContractDatabase.action",{
			jcdId					: jcdId,
			jcdUseState 			: '注销',
			jcdCancellationPerson	: _loginUserId,
			jcdCancellationReason   : jcdCancellationReason,
		},function(data){
			hideLoading();
			if(data.code<0){
				myTips(data.msg,"error");
				return;
			}else{
				myTips("注销成功","success");
				queryContractNum(_pageNum[0],0);
				$("#logout").dialog('close');
			}
		});
	}else{
		myTips('请填写注销原因', 'error');
		return;
	}
}

function contractShow(type){
	cleanContractNum();
	if(type==0){
		$("#contractBefor").val($("#contractBefor").val().toUpperCase());
	}
	var contractBefor = $("#contractBefor").val();
	var contractNums = $("#contractNums").val();
	var contractShow = contractBefor;
	for(var i = 0;i<contractNums;i++){
		if(i!=0){
			contractShow+="0";
		}
	}
	contractShow+="1";
	$("#settingTips").html("示例："+contractShow);
	if(type==1){
		$("#contractStartNum").val('');
		$("#contractEndNum").val('');
		$("#contractStartNum").attr("maxlength",contractNums);
		$("#contractEndNum").attr("maxlength",contractNums);
	}else if(contractNums==1){
		$("#contractStartNum").val('');
		$("#contractEndNum").val('');
		$("#contractStartNum").attr("maxlength",contractNums);
		$("#contractEndNum").attr("maxlength",contractNums);
	}
}
function contractNumLimit(type){
	cleanContractNum();
	var contractBefor = $("#contractBefor").val();
	var contractNums = $("#contractNums").val();
	var startNumber = $("#contractStartNum").val();
	var endNumber = $("#contractEndNum").val();
	if(type==0){
		if(startNumber!=''){
			$("#contractStartNum").attr("max",startNumber);
		}
	}
	if(type==1){
		if(endNumber!=''){
			$("#contractEndNum").attr("min",startNumber);
		}
	}
}

