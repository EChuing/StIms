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
});

function openOrderDetail(rowData){
    $('#jhpSpecialNumber').val(rowData.jsrcSaleNo);
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
    $("#print").hide();
    if(rowData.jsrcState == "预定" || rowData.jsrcState == "退定中"){
        $("#refundOrder").show();
    }
    if(rowData.jsrcState == "已住" || rowData.jsrcState == "退房"){
        if(rowData.popJson != null && rowData.popJson != ""){
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
        var type = rowData.jsrcState == "已住"?0:1;
        $("#print").attr("onclick","printPreview("+type+")");
        $("#print").show();
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

//打开预览对话框	type=0 入住账单		type=1退房账单
function printPreview(type){
    $.ajax({
        url:"../getSetUpInfo.action",
        type:"post",
        data:{
            jsrsuId : 1,
        },success:function(result){
            if(result.code == 1){
                var data = JSON.parse(result.body);
                console.log(data)
            }
        }
    })
    var jsrcId = $('#djsrcId').val();
    $('#printDlg').dialog({
        top 	: getTop(650),
        left 	: getLeft(260),
        title 	: 	'打印预览',
        closed	:	true,
        width	:	260,
        height	:	650,
        cache 	: 	false,
        modal 	: 	true,
        onClose : 	function() {
        }
    });

    var saleNo = $('#jhpSpecialNumber').val();
    $('#printFrame').empty();
    var	iframes ='';
    $.post("../selectHistoryPrint.action",{
        jhpSpecialNumber	: saleNo,
        splitFlag	: 1,
    }, function(data) {
        if (data.code>=0) {
            var jhpData = data.body
            console.log(jhpData)
            var printArray = jhpData[0].jhpJson.getRealJsonStr();
            console.log(printArray)
            if(type==0){//入住账单
                iframes ='<!DOCTYPE html><html><head><meta charset="UTF-8" /><style> table{ width:48mm; table-layout:fixed;}   img{height:100px;width:100px}table td {border-top: none; word-wrap:break-word; font-size: 10px; }h1{font-size: 18px;text-align:center}h2{font-size: 10px;text-align:center}#body{}#body .other_fee{border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script> </head><body style="background-color:#fff;width:48mm;margin-left:2mm"><div id="body" style="width:48mm"><div class="other_fee"><div class="title"><h1>{{body.jsrsuWxgzhTitle}}<br>入住单</h1><table><tbody><tr><td>订单号/No {{body.saleNo}}</td></tr><tr><td>入住/Arrival {{body.arrival}}</td></tr><tr><td>客人/Customer {{body.customer}}</td></tr><tr><td>房号/RoomNo {{body.roomNo}}</td></tr><tr><td>预离/Leave {{body.leave}}</td></tr></tbody></table></div></div><div class="other_fee"><div class="paymentVoucher"><h2>付款信息/PaymentVoucher</h2><table style="width: 100%;"><tbody><tr><td>房价/Price ￥{{body.price}}</td></tr><tr><td>押金/Deposit ￥{{body.deposit}}</td></tr><tr><td>总金额/TotalSum ￥{{body.totalSum}}</td></tr><tr><td>付款方式/PayMthod {{body.paymentMthod}}</td></tr></tbody></table></div></div><div><div class="guestInstructions"><h2>宾客须知/GuestInstructions</h2></div><div style="font-size:10px ">1. 每日最后退房时间为中午{{body.setUpCheckOutTime}},如超过{{body.setUpCheckOutTime}}时，须加收超钟房费。</div><div style="font-size:10px;margin-top:5px">2.服务电话 {{body.telphone}}</div><div style="text-align:center;"><h2>欢迎下次光临</h2><div id="wxgzhImgPath" style="text-align:center;"></div></div><div><h2>扫码关注微信公众号支持在线定房，让您行程无忧。WeChat scan QR code，Support online booking Let your journey be free from worry。</h2></div> </div></div><script> var body2='+printArray+';document.getElementById("wxgzhImgPath").innerHTML="<img src="+body2.wxgzhImgPath+" />";</script><script>  var vm;    vm = new Vue({    el: "#body",    data: {   body:{       }    }  });  vm.body = body2;    function print() { document.execCommand("print") }</script></body></html>';
            }else if(type==1){//退房账单
                iframes ='<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>	table{ width:48mm; table-layout:fixed;}	  img{height:100px;width:100px}table td {border-top: none; word-wrap:break-word; font-size: 10px;	}h1{font-size: 18px;text-align:center}h2{font-size: 10px;text-align:center}#body{}#body .other_fee{border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script> </head><body style="background-color:#fff;width:48mm;margin-left:5mm"><div id="body" style="width:48mm"><div class="other_fee"> <div class="title"> <h1>{{body.jsrsuWxgzhTitle}}<br>退房单</h1> <table> <tbody><tr> <td>订单号/No {{body.saleNo}}</td> </tr> <tr><tr> <td>入住/Arrival {{body.arrival}}</td> </tr> <td>客人/Customer {{body.customer}}</td> </tr> <tr> <td>房号/RoomNo {{body.roomNo}}</td> </tr> <tr> <td>预离/Leave {{body.leave}}</td> </tr></tbody> </table> </div></div><div class="other_fee"> <div class="actualVoucher"> <h2 id="getOrRefundMoney"></h2> <table id="table1"></table> </div></div><div> <!--<div class="guestInstructions"> <h2>宾客须知/GuestInstructions</h2> </div> <div style="font-size:10px">1. 每日最后退房时间为中午{{body.setUpCheckOutTime}},如超过{{body.setUpCheckOutTime}}时，须加收超钟房费。 </div> <div style="font-size:10px;margin-top:5px">2. 服务电话  {{body.telphone}} </div> --><div style="text-align:center"> <h2>欢迎下次光临</h2><div id="wxgzhImgPath" style="text-align:center;"></div></div> <div> <h2>扫码关注微信公众号支持在线定房，让您行程无忧。WeChat scan QR code，Support online booking Let your journey be free from worry。</h2> </div> </div></div><script> var body2='+printArray+';document.getElementById("wxgzhImgPath").innerHTML="<img src="+body2.wxgzhImgPath+" />";if(body2.paymentMthod == "现金退款" || body2.paymentMthod == "微信退款"){document.getElementById("getOrRefundMoney").innerHTML="退款信息/RefundInformation";document.getElementById("table1").innerHTML="<tbody><tr><td>总金额/TotalSum ￥"+body2.totalSum+"</td></tr><tr><td>支付方式/PayMthod  "+body2.paymentMthod+"</td></tr></tbody>";}else{var giveChange = parseFloat(body2.moneyInput) - parseFloat(body2.totalSum);document.getElementById("getOrRefundMoney").innerHTML="缴费信息/PaymentInformation";document.getElementById("table1").innerHTML="<tbody><tr><td>应收/Receivables ￥"+body2.totalSum+"</td></tr>		  	  <tr><td>实收/ActualReceipts ￥"+body2.moneyInput+"</td></tr><tr><td>找零/GiveChange ￥"+giveChange.toFixed(2)+"</td></tr><tr><td>支付方式/PayMthod  "+body2.paymentMthod+"</td>      </tr></tbody>";}</script><script>		var vm;				vm = new Vue({		  el: "#body",		  data: {			body:{							}		  }		});		vm.body = body2;			 function print() { document.execCommand("print") }</script></body></html>';
            }
            var iframesObj = document.getElementById('printFrame').contentDocument;
            iframesObj.open();
            iframesObj.write(iframes);
        }
    }, "json");
    $('#printDlg').dialog("open");
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