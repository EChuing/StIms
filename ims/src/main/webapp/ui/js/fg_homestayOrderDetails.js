var _closeWay = "";
_accountId = _shortRentAccount;

$(function(){
	$('#orderFllowDg').datagrid({
		onDblClickRow : function(rowIndex, data){
			downFollowInfo(data);
		}
	});
	$("#shortRentOrderDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$("#orderDetail_index").val(rowIndex);
			openOrderDetail(rowData);
		}
	});
})

function openOrderDetail(rowData){
	_title_address = rowData.hsAddCommunity +" " + rowData.hsAddBuilding +" " + rowData.hsAddDoorplateno;
	for(var i in rowData){
		if(i == 'jsrcTypeOccupancy' && rowData[i]==null){
			$('#djsrcTypeOccupancy').val('未入住');
		}else{
			$('#d' +i).val(rowData[i]);
		}
	}
	if(rowData.jsrcFollow != null && rowData.jsrcFollow != ""){
		var jsrcFollow = JSON.parse(rowData.jsrcFollow);console.log(jsrcFollow)
		$("#orderFllowDg").datagrid("loadData", jsrcFollow.reverse());
	}
	$("#refundOrder").hide();
	if(rowData.jsrcState == "预定" || rowData.jsrcState == "退定中"){
		$("#refundOrder").show();
	}
	if(rowData.popJson != null && rowData.popJson != ""){
		if(rowData.jsrcState == "在住" || rowData.jsrcState == "退房"){
			var pops = JSON.parse(rowData.popJson);
			var htmls = "";
			for(var p in pops){
				var html = '<div style=\'margin:5px 0 0 15px;float: left;\'>'+
				'				住户姓名：<input  readonly="readonly" value="'+pops[p].popName+'"  style="width:130px" clear="clear" >'+
				'			</div>'+
				'			<div style=\'margin:5px 0 0 12px;float: left;\'>'+
				'				住户手机：<input  readonly="readonly" value="'+pops[p].popTelephone+'" style="width:130px" clear="clear" >'+
				'			</div>'+
				'			<div style=\'margin:5px 0 0 12px;float: left;\'>'+
				'				住户身份：<input readonly="readonly" value="'+pops[p].popIdcard+'" style="width:130px" clear="clear">'+
				'			</div>'+
				'			<div style="clear:both"></div>';
				htmls += html;
			}
			$("#popInfo").html(htmls);
		}
	}
	
	$('#orderDetailDlg').dialog({
		title : "订单详情",
		top : getTop(400),
		left : getLeft(640),
		width : 640,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#orderDetailDlg [clear="clear"]').val('');
			$("#popInfo").html('');
		}
	
	});
	$("#hidePurchaseHistory").hide();
	$('#orderDetailDlg').dialog('open');
	
}
	
	
//列表下方跟进的详细界面
function downFollowInfo(data){
	$('#downFollowInfo').css('display','block');
	$('#downFollowInfo').dialog({
		title :' 订单跟进详细信息',
		top : getTop(250),
		left : getLeft(450),
		width : 450,
		height : 220,
		closed : true,
		cache : false,
		modal : true,
		onClose : function(){
			$('#downFollowInfo [clano=clano]').html('');
		},
	});
	for(var i in data){
		if(i=='jhfFollowRemark'){
			$('#readDownFollow'+i).html("&nbsp;&nbsp;&nbsp;&nbsp;"+data[i].replace(/\n/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;"));
		}else{
			$('#readDownFollow'+i).html(data[i]);
		}
	}
	$('#downFollowInfo').dialog('open');
}
//消费记录窗口
function openPurchaseHistory(){
	$('#purchaseHistoryDlg').dialog({
		title : "消费记录详情",
		top : getTop(326),
		left : getLeft(360),
		width : 360,
		height : 326,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#purchaseHistoryDlg [clear="clear"]').val("")
		}
	});
	$('#purchaseHistoryDlg').dialog('open');
	
	var jsrcAdditionalCost = $('#djsrcAdditionalCost').val();
	console.log(jsrcAdditionalCost)
	$('#totalMoney').val(jsrcAdditionalCost);
	var jsrcAdditionalDescription = $('#djsrcAdditionalDescription').val();
	if(jsrcAdditionalDescription != "" && jsrcAdditionalDescription != null){
		var sevicelist = JSON.parse(jsrcAdditionalDescription);
		$('#purchaseHistoryTable').datagrid('loadData',sevicelist);
	}
}
//分页操作
/*function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#shortRentOrderPage").remove();
		$("#shortRentOrderPageDiv")
				.append(
						"<div class='tcdPageCode' id='shortRentOrderPage' style='text-align:center;'></div>");
		$("#shortRentOrderPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					getAllShortRentOrder(p, 1);
				}
			}
		});
	}
}*/

function refundOrder(){
	var row = $('#shortRentOrderDg').datagrid('getSelected');
	console.log(row)
	var drenterName = $('#drenterName').val();
	var jsrcOrderNum = row.jsrcOrderNum; //订单号
	var jsrcFirstPay = $('#djsrcFirstPay').val(); //预定时支付金额
	
	var follow = {
			text : "客户 "+drenterName +" 办理退订手续"+","+"退订房间地址:"+row.address,
			time : new Date().format("yyyy-MM-dd hh:mm:ss"),
			type: "系统跟进",
			registrantName : _loginUserName	
	}
	var jsrcFollow = $('#djsrcFollow').val();
	if(jsrcFollow != ""){
		jsrcFollow = JSON.parse(jsrcFollow);
		jsrcFollow.push(follow);
	}else{
		jsrcFollow = "["+follow+"]";
	}
	
	var jfAry = [];
	var jfObj = {
			department : _loginDepartment,
			storefront : _loginStore,
			jfTheCashierPeople : _loginUserId,
			jfBillingDate : new Date().format("yyyy-MM-dd hh:mm:ss"),
			jfHandlers : _loginUserId,
			jfHouse4storeId : row.jsrcHsId,
			jfTheOwnershipType : "租客",
			jfBelongingToTheName : row.renterName,
			jfOperationRecords : "("+ new Date().format("yyyy-MM-dd hh:mm:ss") + ",添加收支记录)*",
			jfFinancialCoding : new Date().format("yyyyMMddhhmmss")+ parseInt(Math.random() * 10) +  parseInt(Math.random() * 10) + parseInt(Math.random() * 10),
			jfStartCycle : new Date().format("yyyy-MM-dd"),
			jfEndCycle : getNextMonth(new Date().format("yyyy-MM-dd")),
			jfAccountingWhy :  row.hsAddDistrict+row.address,
			jfRenterId : row.jsrcRenterId,
			jfJsrcId : row.jsrcId
	}
	if(jsrcFirstPay != "0"){
		if(row.jsrcDepositPayType == 0){//退还押金
			var jfFinanNote =  row.address + "房进行退房操作,退还押金";
			jfObj.jfAccountingSpecies = "房屋押金";
			jfObj.jfBigType = "押金类";
			jfObj.jfNatureOfThe = "支出";
			jfObj.jfClosedWay = _closeWay;
			jfObj.jfAccountId = _accountId;
			jfObj.jfSumMoney = row.jsrcDeposit;
			jfObj.jfFinanNote = jfFinanNote;
			jfAry.push(jfObj);
		}
		//退还租金
		var jfObj1 = JSON.parse(JSON.stringify(jfObj));
		var refundRentMoney = row.jsrcAmountPayable*row.jsrcRoomChargePercent*0.01;
		var jfFinanNote1 =  row.address + "房进行提前搬离操作,退还租金";
		jfObj1.jfAccountingSpecies = "退还租金";
		jfObj1.jfBigType = "主营类";
		jfObj1.jfNatureOfThe = "支出";
		jfObj1.jfClosedWay = _closeWay;
		jfObj1.jfAccountId = _accountId;
		jfObj1.jfSumMoney = refundRentMoney;
		jfObj1.jfFinanNote = jfFinanNote1;
		jfAry.push(jfObj1);
	}
	
	$.messager.confirm("操作提示", "是否对该订单进行退定？",  function(data) {
		if(data){
			showLoading();
			$.ajax({
				url:"../updateShortRent.action",
				data:{
					jsrcId				: row.jsrcId,
					jsrcState			: "退定",
					jsrcFollow			: follow,
					jsrcOrderNum		: jsrcOrderNum,
					refundPrice			: jsrcFirstPay,
					totalPrice			: jsrcFirstPay,
					jsrcPaymentMethod	: "在线支付",
					jsonArray			: jfAry,
					type				: 4 //4为原路退款
				},
				dataType:"json",
				success:function(data){
					hideLoading();
					if(data.code == 1){
						myTips("退定成功","success");
						$('#orderDetailDlg').dialog('close');
						getAllShortRentOrder(1,0);
					}else{
						myTips(data.msg,"error");
					}
				}
			});
		}
	});
}

//退定审批
function openUnsubscribe(){
	$('#unsubscribeDlg').dialog({
		title : _title_address + "退定审批",
		top : getTop(100),
		left : getLeft(250),
		width : 250,
		height : 100,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	
	$('#unsubscribeDlg').dialog('open');
}
function unsubscribe(type){
	var jsrcState = "";
	if(type == 0){
		$.messager.confirm("操作提示", "确定允许顾客退定吗？", function(data) {
			if (data) {
				refundOrder();
			}
		});
	}
	if(type == 1){
		$.messager.confirm("操作提示", "确定取消顾客退定吗？", function(data) {
			if (data) {
				showLoading();
				$.ajax({
					url:"../updateShortRent.action",
					data:{
						jsrcId				: row.jsrcId,
						jsrcState			: "预订",
					},
					dataType:"json",
					success:function(data){
						hideLoading();
						if(data.code == 1){
							myTips("取消退定成功","success");
							$('#orderDetailDlg').dialog('close');
							getAllShortRentOrder(1,0);
						}else{
							myTips(data.msg,"error");
						}
					}
				});
			}
		});
	}
}

function initFinancialAccount(){
	$.ajax({
		type:"post",
		url:"../selectFinancialAccount.action",
		data:{
			faId : _accountId
		},
		dataType:"json",
		success:function(data){
			if (data.code < 0) {
				myTips(data.msg, 'error');
			} else {
				_closeWay = data.body[0].faPaymentType; 
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