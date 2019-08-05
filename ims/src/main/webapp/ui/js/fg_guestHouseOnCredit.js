accountInfo = [];
//短租设置信息
var setUp = {};


$(function() {
    $('#onCreditTable').datagrid({
        onDblClickRow : function(rowIndex, rowData) {
            $(".financialInfo_index").val(rowIndex);
            openClearCreditDlg(0,rowData);
        }
    });
    getSetUpInfo();
    getChannelInfo();
    queryFinancial(1);
});

//查询渠道单位表信息
function getChannelInfo(){
    $.ajax({
        url:"../queryJourChannelUnit.action",
        type:"post",
        data:{
        },
        success:function(data){
            if(data.code == 1){
                channelInfo = data.body;
                var html = '<option></option>';
                for(var i in channelInfo){
                    if(channelInfo[i].jcuType == "协议单位"){
                        html += '<option value="'+channelInfo[i].jcuId+'">'+channelInfo[i].jcuGroupType+'</option>'
                    }
                }
                $('#jfBelongToChannel').html(html);
            }
        }
    });
}

//收支记录表导入信息
function queryFinancial(page) {
    _pageNum[0] = page;
    var pageNum = 20;
    var startNum = (parseInt(page) - 1) * pageNum;
    var endNum = pageNum;

    var jfBelongToChannel = $('#jfBelongToChannel').val();
    var jfCreditSituation = $('#jfCreditSituation').val();
    var jfCertificateNumber = $('#searchJfCertificateNumber').val();
    var jfFinancialCoding = $('#searchJfFinancialCoding').val();
    var jfTicketNumber = $('#searchJfTicketNumber').val();

    var jfAuditState= $('#searchJfAuditState').val();
    var jfStrikeABalanceStatus= $('#searchJfStrikeAbalanceStatus').find('option:selected').text();
    var jfTheOwnershipType= $('#searchJfTheOwnershipType').find('option:selected').text();

    var jfNatureOfThe= $('#financilSearchJfNatureOfThe').val();
    var jfBigType= $('#financilSearchJfBigType').val();
    var jfAccountingSpecies= $('#financilSearchJfAccountingSpecies').val();

    var startTime =  $('#searchJfCheckInTimeStart').val();
    var endTime =  $('#searchJfCheckInTimeEnd').val();
    var jfAccountId =  $('#searchAccountName').val();
    var jfPayType =  $('#searchPayType').val();

    var addCity= $("#searchCity").find("option:selected").text();
    var addDistrict= $("#searchDistrict").find("option:selected").text();
    var addZone= $("#searchZone").find("option:selected").text();
    var addCommunity= $("#searchCommunity").val();
    var addBuilding= $("#sourceBuilding").val();
    var addDoorplateno= $("#sourceDoorplateno").val();
    var theSortTerm = $('#theSortTermInput').val();
    var theSortContrary = $('#theSortContraryInput').val();
    if(endTime!=''){
        endTime = new Date(endTime);
        endTime.setDate(endTime.getDate() + 1);
        endTime =  formatDate(endTime);
    }
    $.post("../queryFinancial.action", {
        startNum 				: startNum,
        endNum 					: endNum,
        theSortTerm 			: theSortTerm,
        theSortContrary 		: theSortContrary,
        jfCertificateNumber		: jfCertificateNumber,
        jfFinancialCoding		: jfFinancialCoding,
        jfTicketNumber			: jfTicketNumber,
        jfAuditState			: jfAuditState,
        jfStrikeABalanceStatus	: jfStrikeABalanceStatus,
        jfTheOwnershipType		: jfTheOwnershipType,
        jfNatureOfThe			: jfNatureOfThe,
        jfBigType				: jfBigType,
        jfAccountingSpecies		: jfAccountingSpecies,
        startTime				: startTime,
        endTime					: endTime,
        jfAccountId				: jfAccountId,
        addDistrict				: addDistrict,
        addZone					: addZone,
        addCommunity			: addCommunity,
        addBuilding				: addBuilding,
        addDoorplateno			: addDoorplateno,
        jfPayType				: jfPayType,
        jfSettlementMethod		: "挂账",
        jfBelongToChannel		: jfBelongToChannel,
        jfCreditSituation		: jfCreditSituation,
        splitFlag				: 1,
    }, function(data) {
        if (data.code<0) {
            $('#onCreditTable').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
            if(page==1){
                notCountPage(0, 0 ,"queryFinancial","onCreditTable");
            }else{
                notCountPage(page, 0 ,"queryFinancial","onCreditTable");
            }
        } else {
            data=data.body;
            if(data.length<20){
                notCountPage(page, 2 , "queryFinancial","onCreditTable");
            }else{
                notCountPage(page, 1 , "queryFinancial","onCreditTable");
            }
            console.log(data)
            $("#onCreditTable").datagrid("loadData", data);
        }
    }, "json");
}

//分页统计总条数
function getonCreditTablePageCount(page){
    var pageSize = 20;
    var jfBelongToChannel = $('#jfBelongToChannel').val();
    var jfCreditSituation = $('#jfCreditSituation').val();

    $.post("../queryFinancial.action", {
        jfBelongToChannel	: jfBelongToChannel,
        jfCreditSituation	: jfCreditSituation,
        splitFlag: 0,
    }, function(data) {
        if (data.code < 0 || data.body[0].totalNum == 0){
            var countJson = {
                totalNum:0,
            };
            getCountData(0,countJson,pageSize,page,"onCreditTable",0);
        } else {
            data=data.body;
            var countJson = {
                totalNum: data[0].totalNum,
            };
            getCountData(1,countJson,pageSize,page,"onCreditTable",0);
        }
    });
}

//冲账状态列格式
function formatJfStrikeAbalanceStatus(value, row, index) {
    if (row.jfStrikeABalanceStatus == '冲账') {
        return "<a style='text-decoration:none;color:green;'>" + row.jfStrikeABalanceStatus + "</a>";
    } else if (row.jfStrikeABalanceStatus == '被冲账') {
        return "<a style='text-decoration:none;color:red;'>" + row.jfStrikeABalanceStatus + "</a>";
    } else if (row.jfStrikeABalanceStatus == '正常') {
        return "<a style='text-decoration:none;color:blue;'>" + row.jfStrikeABalanceStatus + "</a>";
    }
}
//收支金额列格式
function formatJfSumMoney(value, row, index) {
    if (row.jfNatureOfThe == '收入') {
        return "<a>" + row.jfSumMoney + "</a>";
    } else if (row.jfNatureOfThe == '支出') {
        return "<a>-" + row.jfSumMoney + "</a>";
    } else if (row.jfNatureOfThe == '冲账') {
        return row.jfSumMoney;
    }
}
//结清挂账格式
function formatJfCreditSituation(value, row, index){
    if (row.jfCreditSituation == 0) {
        return "<a>是 </a>";
    } else {
        return "<a>否 </a>";
    }
}
//财务状态列格式
function formatJfAuditState(value, row) {
    if (row.jfAuditState == '无效' ||row.jfAuditState == '被冲账' || row.jfAuditState == '审核不通过' || row.jfAuditState == '复核不通过') {
        return row.jfAuditState;
    } else if (row.jfAuditState == '已复核') {
        return "<a style='text-decoration:none;color:blue;'>" + row.jfAuditState + "</a>";
    } else if (row.jfAuditState == '已审核') {
        return "<a style='text-decoration:none;color:green;'>" + row.jfAuditState + "</a>";
    }else if (row.jfAuditState == '未审核'){
        return "<a style='text-decoration:none;color:red;'>" + row.jfAuditState + "</a>";
    }
}


//批量结算收支(生成一条总的收支)
function createNewFinancial(){
    var rows = $('#onCreditTable').datagrid('getChecked');
    if(rows.length <= 0){
        myTips("请选择需要结算的账单","error");
        return;
    }

    var jsonArray = [];//收支
    var channelArray = [];//检测是否有不同的渠道
    var totalPrice = 0.00;

    for(var i in rows){
        if(rows[i].jfCreditSituation == 0){
            myTips("勾选的挂账单中掺杂有已结清的收支","error");
            return;
        }

        if(channelArray.indexOf(rows[i].jfBelongToChannel) == -1 && i != 0){
            myTips("勾选了不同渠道的单位","error");
            return;
        }
        channelArray.push(rows[i].jfBelongToChannel);
        var obj = {
            jfId				: rows[i].jfId,
            jfCreditSituation 	: 0,
            jfOperationRecords 	: rows[i].jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"进行结清挂账"+"<br>",
        }
        jsonArray.push(obj);

        totalPrice += rows[i].jfSumMoney;
    }
    //新增收支信息
    var data = {
        jfHouseId:rows[0].hsHouseId,
        jfCreditSituation:1,
        jfSettlementMethod:"现结",
        jfPayType:"现钞",
        jfNowBalance:accountInfo.faTheBalanceOf,
        cashierPeopleName:rows[0].cashierPeopleName,
        handlersName:_loginUserName,
        jfStrikeABalanceStatus:"正常",
        jfAuditState:"未审核",
//		jfCertificateNumber:rows[0].jfCertificateNumber,
        jfPricePlan:rows[0].jfPricePlan,
        jfBillingDate:new Date().format("yyyy-MM-dd hh:mm:ss"),
        jfTheOwnershipType:"协议单位",
        jfBelongingToTheName:rows[0].jcuGroupType,
        jfClosedWay:accountInfo.faPaymentType,
        jfNatureOfThe:"收入",
        jfAccountingSpecies:"挂账金额",
        jfSumMoney:totalPrice,
        jfFinanNote:"结算"+rows[0].jfBelongingToTheName+"的挂账单，获得挂账金额",
        jfFinancialCoding:new Date().format("yyyyMMddhhmmss")+ parseInt(Math.random() * 10) +  parseInt(Math.random() * 10) + parseInt(Math.random() * 10),
        jfStartCycle:new Date().format("yyyy-MM-dd"),
        jfEndCycle:getNextMonth(new Date().format("yyyy-MM-dd")),
        jfAccountingWhy:rows[0].jcuGroupType,
        jfAccountId:accountInfo.faId,
        jfBelongToChannel:rows[0].jfBelongToChannel,
        jsonArray:JSON.stringify(jsonArray)
    }
    $('#batchClearCreditData').val(JSON.stringify(data));
    openClearCreditDlg(1,data);
}

//挂账窗口 type=1为批量
function openClearCreditDlg(type,row){
    var height = 520;
    if(row.jfCreditSituation > 0){
        if(type == 0){
            $('#settleAccounts').show();
            $('#batchSettleAccounts').hide();
        }else{
            $('#settleAccounts').hide();
            $('#batchSettleAccounts').show();
        }
        height = 560;
    }else{
        $('#settleAccounts').hide();
        $('#batchSettleAccounts').hide();
    }
    var jfCreditSituation = row.jfCreditSituation==0?"是":"否"
    $(".financialInfo_jfCreditSituation").val(jfCreditSituation);
    $(".financialInfo_jfSettlementMethod").val(row.jfSettlementMethod);
    $(".financialInfo_payType").val(row.jfPayType);
    $(".financialInfo_nowBalance").val(row.jfNowBalance);
    $(".financialInfo_cashierPeopleName").val(row.cashierPeopleName);
//	$(".financialInfo_reviewOneName").val(row.reviewOneName);
//	$(".financialInfo_reviewerName").val(row.reviewerName);
    $(".financialInfo_handlersName").val(row.handlersName);
    $(".financialInfo_jfStrikeAbalanceStatus").val(row.jfStrikeABalanceStatus);
    $(".financialInfo_jfAuditState").val(row.jfAuditState);
    $(".financialInfo_jfCertificateNumber").val(row.jfCertificateNumber);
    $(".financialInfo_jfBillingDate").val(row.jfBillingDate);
    $(".financialInfo_jfTheOwnershipType").val(row.jfTheOwnershipType);
    $(".financialInfo_jfBelongingToTheName").val(row.jfBelongingToTheName);
    $(".financialInfo_jfClosedWay").val(row.jfClosedWay);
    $(".financialInfo_jfNatureOfThe").val(row.jfNatureOfThe);
    $(".financialInfo_jfAccountingSpecies").val(row.jfAccountingSpecies);
    $(".financialInfo_jfSumMoney").val(row.jfSumMoney);
    $(".financialInfo_jfFinanNote").val(row.jfFinanNote);
    $(".financialInfo_jfFinancialCoding").val(row.jfFinancialCoding);
    $(".financialInfo_belongBegin").val(row.jfStartCycle);
    $(".financialInfo_belongEnd").val(row.jfEndCycle);
    $(".financialInfo_jfClosedWay").val(row.jfClosedWay);
    $(".financialInfo_bankName").val('无');
    $(".financialInfo_bankNums").val('无');
    $(".financialInfo_bankBelong").val('无');
    if(!(row.jfAccountId==null||row.jfAccountId=='')){
        $("#jfAccountId").val(row.jfAccountId);
        $.post("../selectNamePublic.action", {
            faId:row.jfAccountId
        }, function(data) {
            $(".financialInfo_bankName").val(data.body[0].faUserName);
            $(".financialInfo_bankNums").val(data.body[0].faAccount);
            $(".financialInfo_bankBelong").val(data.body[0].faBelonging);
        });
    }
    $(".financialInfo_nums").val(row.jfTicketNumber);
    if(row.jfAccountingWhy!=null&&row.jfAccountingWhy!=""){
        $(".financialInfo_jfAccountingWhy").val(row.jfAccountingWhy);
    }else{
        $(".financialInfo_jfAccountingWhy").val(row.addCommunity+row.addBuilding+row.addDoorplateno);
    }

    if (row.jfHouse4rentId != null && row.jfHouse4rentId != '') {
        $(".financialInfo_houseCoding").val(row.jfHouse4rentId);
        $(".financialInfo_belongId").val(row.jfRenterId);
    }
    if ((row.jfHouse4rentId == null || row.jfHouse4rentId == '') && row.jfHouse4storeId != null && row.jfHouse4storeId != '') {
        $(".financialInfo_houseCoding").val(row.jfHouse4storeId);
        $(".financialInfo_belongId").val(row.jfLandlordId);
    }
    if ((row.jfHouse4storeId == null || row.jfHouse4storeId == '') && row.jfHouseId != null&& row.jfHouseId != '') {
        $(".financialInfo_houseCoding").val(row.jfHouseId);
    }

    $("#reconciliationDlg").dialog({
        title : '挂账信息窗口',
        top : getTop(height),
        left : getLeft(650),
        width : 650,
        height : height,
        closed : true,
        cache : false,
        modal : true
    });
    $(".financialInfo_jfId").val(row.jfId);
    $(".financialInfo_jfStrikeBalanceEncoding").val(row.jfStrikeBalanceEncoding);
    $(".financialInfo_jfBelongingToTheName").val(row.jfBelongingToTheName);
    var jfOperationRecords = row.jfOperationRecords;
    var reg=new RegExp("＜br＞","g");
    if(jfOperationRecords!=null&&jfOperationRecords!=''){
        jfOperationRecords= jfOperationRecords.replace(reg,"\r\n");
    }else{
        jfOperationRecords='暂无操作记录。'
    }
    $(".financialInfo_jfOperationRecords").val(jfOperationRecords);
    $("#reconciliationDlg").dialog('open');
}

/*
 * 	执行对账结算
 * 	payType=1为"现金收银";payType=2为"扫码收银";payType=2为"台卡收款";
 *  type=0为单笔账单结算;type=1为批量结算
 * */
function openCashDlg(payType,type){
    let title = "";
    $("#moneyInput").val("");
    $("#changeMoney").html("0.00");
    $("#openCashDlg .cash").css("display","none");
    $("#openCashDlg .qrCode").css("display","none");
    $("#openCashDlg .qrCodeCustomer").css("display","none");
    if(payType == 1){
        $("#openCashDlg .cash").css("display","block");
        $("#openCashDlg #moneyInput").attr("onkeyup","changMoney()");
        title = "现金收银";
    }else if(payType == 2){
        $("#openCashDlg .qrCode").css("display","block");
        title = "扫码收银";
    }else if(payType == 3){
        $("#openCashDlg .qrCodeCustomer").css("display","block");
        title = "台卡收款";
    }

    if(type == 0){
        $("#payType").attr("onclick","doReceivables("+payType+")").html(title);
    }else{
        $("#payType").attr("onclick","doBatchClearCredit("+payType+")").html(title);
    }

    var orderMoney = parseFloat($('.financialInfo_jfSumMoney').val()).toFixed(2);
    $('#orderMoney').html(orderMoney);
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
            $("#openCashDlg #moneyInput").removeAttr("onkeyup");
        },
    });

    $('#openCashDlg').dialog('open');
    $('#moneyInput').focus();
}

//执行批量挂账收银
function doBatchClearCredit(type){
    var data = $('#batchClearCreditData').val();
    data = JSON.parse(data);

    if(type == 2){
        var moneyInput = $('#moneyInput').val();
        data.authCode = moneyInput;
        data.wxpayBody = "扫码支付";
    }
    data.payType = type;

    showLoading();
    $.ajax({
        url:"../batchClearCredit.action",
        data:data,
        type:"post",
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
                myTips(data.msg,"success")
                $('#openCashDlg').dialog('close');
                $("#reconciliationDlg").dialog('close');
                queryFinancial(1);
            }else{
                myTips(data.msg,"error")
            }
        }
    })
}

//执行单笔挂账收银
function doReceivables(type){
    var totalPrice = parseFloat($('.financialInfo_jfSumMoney').val()).toFixed(2);
    var moneyInput = $('#moneyInput').val();
    var jfOperationRecords = $('.financialInfo_jfOperationRecords').val();
    var jfId = $(".financialInfo_jfId").val();
    var jfAccountId = $("#jfAccountId").val();
    var jfData = {
        jfId				: jfId,
        jfAccountId			: jfAccountId,
        jfCreditSituation 	: 0,
        jfOperationRecords 	: jfOperationRecords+getNowFormatDate()+"，"+_loginUserName+"进行结清挂账"+"<br>",
        jfSumMoney			: totalPrice
    }
    showLoading();
    $.ajax({
        url:"../clearCreditMoney.action",
        data:jfData,
        type:"post",
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
                myTips(data.msg,"success")
                $('#openCashDlg').dialog('close');
                $("#reconciliationDlg").dialog('close');
                queryFinancial(1);
            }else{
                myTips(data.msg,"error")
            }
        }
    });

    if(type == 2){
        jfData.authCode = moneyInput;
        jfData.wxpayBody = "扫码支付";
        jfData.totalPrice =parseFloat(totalPrice).toFixed(2);
    }
}

//上一条下一条
function laterOrNext(type) {
    var dataIndex = $(".financialInfo_index").val();
    var changeData = {};
    if (type == 0) {
        if (dataIndex != 0) {
            var num = parseInt(dataIndex) - 1;
            $(".financialInfo_index").val(num);
            changeData = $('#onCreditTable').datagrid('getData').rows[num];
            $('#onCreditTable').datagrid('selectRow',num);
        } else {
            $.messager.alert('操作提示', '这是本页的第一条!');
            return false;
        }
    } else {
        var size = $("#onCreditTable").datagrid("getData").total;
        if (dataIndex != parseInt(size) - 1) {
            var num = parseInt(dataIndex) + 1;
            $(".financialInfo_index").val(num);
            changeData = $('#onCreditTable').datagrid('getData').rows[num];
            $('#onCreditTable').datagrid('selectRow',num);
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
        openClearCreditDlg(changeData);
    }
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

//跳转查看房源
function skipToCheckHouse(){
    var row = $('#onCreditTable').datagrid('getSelected');
    var skipJspName = '';
    var skipJspUrl = '';
    var skipJspIcon = '';
    var skipInputId = ['','',''];
    var skipInputVal = ['','',''];
    if((row.jfTheOwnershipType=="租客" && row.jfJsrcId!=null && row.jfJsrcId!='') || (row.jfTheOwnershipType=="业主" && row.jfJsrcId!=null && row.jfJsrcId!='') ){
        skipJspName = '客房管理';
        skipJspUrl = 'fg_shortRentHouse';
        skipJspIcon = 'fangjianguanli';
        skipInputId[0] = 'searchHsAddCommunity';
        skipInputId[1] = 'searchHsAddBuilding';
        skipInputId[2] = 'searchHsAddDoorplateno';
        skipInputVal[0] = row.addCommunity;
        skipInputVal[1] = row.addBuilding;
        skipInputVal[2] = row.addDoorplateno;
    }

    parent._skipToChildJson.push({
        target:"i",
        id:skipInputId[0],
        jsonVal:skipInputVal[0],
    });
    parent._skipToChildJson.push({
        target:"i",
        id:skipInputId[1],
        jsonVal:skipInputVal[1],
    });
    parent._skipToChildJson.push({
        target:"i",
        id:skipInputId[2],
        jsonVal:skipInputVal[2],
    });
    window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
}

//查询短租设置信息
function getSetUpInfo(){
    $.ajax({
        url:"../getSetUpInfo.action",
        type:"post",
        data:{
            jsrsuId : 1,
        },
        success:function(result){
            if(result.code == 1){
                var data = JSON.parse(result.body);
                setUp = data[0];
                initFinancialAccount(setUp.jsrsuCashAccount);
            }else{
                myTips(result.msg,"error")
            }

        }
    })
}

//查询收支账户
function initFinancialAccount(jfId){
    $.ajax({
        type:"post",
        url:"../selectFinancialAccount.action",
        data:{
            jfId:jfId
        },
        dataType:"json",
        success:function(data){
            if (data.code < 0) {
                myTips(data.msg, 'error');
            } else {
                data = data.body;
                accountInfo=data[0];
                console.log(accountInfo)
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
    var noCashOpen = $("#openCashDlg").parent().is(":hidden");
    switch (e && e.keyCode){
        case 13:
            if(!noCashOpen){
                var payType = $("#payType").attr("onclick");
                eval(payType);
            }
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
    $(".openCashBtn1").each(function(){
        var thisFaShow = $(this).parent().is(":hidden");
        var thisShow = $(this).is(":hidden");
        if(!thisShow && !thisFaShow){
            var fun = $(this).attr("onclick");
            eval(fun);
        }
    })
}

function f9Key(){
    $(".openCashBtn2").each(function(){
        var thisFaShow = $(this).parent().is(":hidden");
        var thisShow = $(this).is(":hidden");
        if(!thisShow && !thisFaShow){
            var fun = $(this).attr("onclick");
            eval(fun);
        }
    })
}

function f10key(){
    $(".openCashBtn3").each(function(){
        var thisFaShow = $(this).parent().is(":hidden");
        var thisShow = $(this).is(":hidden");
        if(!thisShow && !thisFaShow){
            var fun = $(this).attr("onclick");
            eval(fun);
        }
    })
}