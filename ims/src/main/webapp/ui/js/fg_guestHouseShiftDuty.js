//用户Id信息
var loginUserId =$("#loginUserId").val();

//用来保存不同支付的数据
var payByCash =[];//现金支付
var payByWX =[];//微信支付

var shiftData={};//交班数据

$(function () {
    for ( var i =0 ;i< _userInfoData.length;i++) {
        $("#startWorker").append("<option value='" + _userInfoData[i].suStaffName + "'>"+_userInfoData[i].suStaffName+"</option>");
    }
    console.log(112121);
    getAllShortRentShiftDuty(1,0);
    /* $('#shiftWorkDg').datagrid({
         onDblClickRow : function(rowIndex, data){
             /!*showShiftDutyDetailInfo(data);
             //初始化交接金额的构成显示
             showOnlineDespoitDetail();*!/
         }
     });*/
    getShiftRecordInfo();
});

//初始化数据
function getAllShortRentShiftDuty(page,type) {
    _pageNum[0]=page;
    var pageNum = 15;
    var startNum =(parseInt(page)-1)*pageNum;
    var endNum =pageNum;
    $.ajax({
            url: "../selectShiftRecord.action",
            type: "post",
            data: {
                jarStatus :1,
                startNum :startNum,
                endNum:endNum,
            },
            success:function(result){
                if (result.code<0) {
                    srShiftDutySourcePage(0, 0, 0,"shiftWorkDiv","shiftWorkPage");
                    $('#shiftWorkDg').datagrid({
                        data : [],
                        view : myview,
                        emptyMsg : result.msg
                    });
                } else {
                    var data=result.body;
                    if (page == 1 && type == 0) {
                        _indexNum[0] = 0;
                        srShiftDutySourcePage(data[0].totalNum, page, 0,"shiftWorkDiv","shiftWorkPage");
                    }

                    for(var i in data){
                        data[i].jsrStartTime =  new Date(data[i].jsrStartTime).format("yyyy-MM-dd hh:mm:ss");
                        data[i].jsrEndTime = new Date(data[i].jsrEndTime).format("yyyy-MM-dd hh:mm:ss");
                    }


                    $("#shiftWorkDg").datagrid("loadData", data);
                }

            }
        }

    );

}

//分页操作
function srShiftDutySourcePage(totalNum, page, type,table,pageDiv) {
    console.log(table);
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 0) {
        pageNum = Math.ceil(pageNum / 15);
        $("#"+pageDiv).remove();
        $("#"+table)
            .append(
                "<div class='tcdPageCode' id="+"'"+pageDiv+"'"+"style='text-align:center;'></div>");
        $("#"+pageDiv).createPage({
            onePageNums:15,
            totalNum:totalNum,
            pageCount : pageNum,
            current : 1,
            backFn : function(p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0]=0;
                    if(table =='shiftRecordDiv'){
                        srSerachShiftWork(1,p,1);
                    }else{
                        getAllShortRentShiftDuty(p, 1);
                    }

                }
            }
        });
    }
}


//显示已交班信息
function  showShiftDutyDetailInfo(data) {

    var startTime =data.jarWorkTime+" "+data.jarWork1;
    var endTime =data.jarWorkTime+" "+data.jarOffwork1;
    var jarName =data.jarName;
    CalculateShiftDetail(jarName,startTime,endTime);

    $("#shiftDutyDetailDlg").dialog({
        title:"交班管理",
        top:getTop(670),
        left:getLeft(990),
        width:990,
        height:670,
        closed:true,
        cache:false,
        modal:true,
        onClose:function () {
            $("#shiftDutyDetailDlg [clear=clear]").val('');
        }

    });

    console.log(endTime);

    $("#shiftDutyDetailDlg").dialog("open");

}

//交接班管理对话框
function showShiftDlg() {

    $.ajax({
        url:"../checkAttendance.action",
        type:"post",
        dataType:"json",
        data:{jarUserId: _loginUserId},
        success:function (data) {
            var dataBody =data.body;
            console.log(dataBody);
            if(dataBody == null || dataBody[0].jarStatus == 0){
                myTips("请打考勤卡","error");
                return;
            }
            if(data.code ==1){

                $("#shiftDutyDetailDlg").dialog({
                    title:"交班管理",
                    top:getTop(670),
                    left:getLeft(990),
                    width:990,
                    height:670,
                    closed:true,
                    cache:false,
                    modal:true,
                    onClose:function () {
                        $("#shiftDutyDetailDlg [clear=clear]").val('');
                    }

                });

                var startTime =dataBody[0].jarWorkTime+" "+dataBody[0].jarWork1;
                var endTime =dataBody[0].jarWorkTime+" "+dataBody[0].jarOffwork1;
                var jarName =dataBody[0].jarName;

                $("#shiftStartTime").val(startTime);
                $("#shiftEndTime").val(endTime);
                $("#endWorker").val(jarName);

                //保存交接班数据
                shiftData.jsrStartTime=startTime;
                shiftData.jsrEndTime = endTime;
                shiftData.jsrEndWorker=jarName;

                //调用计算交接班金额方法
                CalculateShiftDetail(jarName,startTime,endTime);

                $("#shiftDutyDetailDlg").dialog("open");
                showOnlineDespoitDetail();
            }
        }
    });

}

//将交接班数据插入数据库
function submitShift() {

    var jsrTime =localTime();
    var jsrPettyCash =$("#pettyCash").val();
    var jsrWorkBalance =$("#workBalance").val();
    var jsrHandInAmount =$("#handInAmount").val();
    var jsrTransferAmount=$("#transferAmount").val();
    var jsrRemark=$("#shiftRemark").val();
    var startWorker = $("#startWorker").val();
    shiftData.jsrPettyCash=jsrPettyCash;
    shiftData.jsrWorkBalance=jsrWorkBalance;
    shiftData.jsrHandInAmount=jsrHandInAmount;
    shiftData.jsrTransferAmount=jsrTransferAmount;
    shiftData.jsrRemark=jsrRemark;
    shiftData.jsrStartWorker=startWorker;
    shiftData.jsrTime=jsrTime;
    console.log(shiftData);
    $.ajax({
        url:"../insertShiftRecord.action",
        type:"post",
        data:shiftData,
        dataType:"json",
        success:function (result) {
            if(result.code ==1){
                myTips("交班成功","success");
                $("#shiftDutyDetailDlg").dialog("close");
                getAllShortRentShiftDuty(1,0);
            }

        }

    });


}



//交班报表打印预览
function ShiftprintPreview(){

    $("#shiftPrintDlg").dialog({
        title:"交班报表预览",
        top:getTop(500),
        left:getLeft(800),
        width:800,
        height:500,
        closed:true,
        model:true,
        cache:false
    });
    var shiftEndTime =$("#shiftEndTime").val(); //交班时间
    var endWorker =$("#endWorker").val(); //交班账号
    var startWorker =$("#startWorker").val(); //接班账号
    var workBalance =$("#workBalance").val();//上班结余
    var otherIncome = $("#otherIncome").val();//其他收入
    var otherPay =$("#otherPay").val();//其他支出
    var pettyCash = $("#pettyCash").val();//备用金
    var handInAmount = $("#handInAmount").val();//上交金额
    var transferAmount = $("#transferAmount").val();//交接金额
    var shiftRemark = $("#shiftRemark").val();//备注
    var onAccountDeposit = $("#onAccountDeposit").val();//入账押金
    var outAccountDeposit =$("#outAccountDeposit").val();//出账押金
    var cashList =getPrintAccountDetail(payByCash);
    var wxList =getPrintAccountDetail(payByWX);
    shiftEndTime =formatFigure(Number(shiftEndTime));
    startWorker =formatFigure(Number(startWorker));
    workBalance =formatFigure(Number(workBalance));
    otherIncome =formatFigure(Number(otherIncome));
    otherPay =formatFigure(Number(otherPay));
    pettyCash =formatFigure(Number(pettyCash));
    handInAmount =formatFigure(Number(handInAmount));
    transferAmount =formatFigure(Number(transferAmount));
    onAccountDeposit =formatFigure(Number(onAccountDeposit));

    console.log(outAccountDeposit);

    //var printTime =getNowFormatDate();
    var printArray=[{
        shiftEndTime:shiftEndTime,endWorker:endWorker,startWorker:startWorker,
        workBalance:workBalance ,otherIncome:otherIncome,otherPay:otherPay,pettyCash:pettyCash,
        handInAmount:handInAmount,transferAmount:transferAmount,shiftRemark:shiftRemark ,onAccountDeposit:onAccountDeposit,
        outAccountDeposit:outAccountDeposit
    },cashList,wxList];
    printArray =JSON.stringify(printArray);
    console.log(printArray);
    var iframes="<!DOCTYPE html> <html lang=\"en\"> <head>     <meta charset=\"UTF-8\" />     <title>Title</title>     <script type=\"text/javascript\" src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script>  </head> <body>      <div id=\"body\" style=\"height: 100%;width: 700px;font-size: 18px;\" >              <div>                 <h1 style=\"margin-left: 200px\">酒店交班资料单</h1>             </div>              <div style=\"margin: 10px 0 20px 10px\">                 <div>                     <div style=\"float: left;margin: 10px 0 0 10px;width: 270px\">                         <span id=\"shiftEndTime\" style=\"font-weight: bolder\">交班时间:</span>                         <span>{{body[0].shiftEndTime}}</span>                     </div>                     <div style=\"float: left;margin: 10px 0 0 0px;width: 180px\">                         <span id=\"shiftAccount\" style=\"font-weight: bolder\">交班账号:</span>                         <span>{{body[0].endWorker}}</span>                     </div>                      <div style=\"float: left;margin: 10px 0 0 50px\">                         <span id=\"takeOverAccount\" style=\"font-weight: bolder\">接班账号:</span>                         <span>{{body[0].startWorker}}</span>                     </div>                 </div>                  <div style=\"clear: both\">                     <div style=\"float: left;margin: 10px 0 0 10px;width: 270px\">                         <span id=\"workingBalance\" style=\"font-weight: bolder\">上班结余:</span>                         <span>{{body[0].workBalance}}</span>                     </div>                     <div style=\"float: left;margin: 10px 0 0 0px;width: 180px\">                         <span id=\"bookedTheDeposit\" style=\"font-weight: bolder\">入账押金:</span>                         <span>{{body[0].onAccountDeposit}}</span>                     </div>                     <div style=\"float: left;margin: 10px 0 0 50px\">                         <span id=\"spendingDeposit\" style=\"font-weight: bolder\">出账押金:</span>                         <span>{{body[0].outAccountDeposit}}</span>                     </div>                 </div>                 <div style=\"clear: both\">                     <div style=\"float: left;margin: 10px 0 0 10px;width: 270px\">                         <span id=\"otherIncome\" style=\"font-weight: bolder;\">其他收入:</span>                         <span>{{body[0].otherIncome}}</span>                     </div>                     <div style=\"float: left;margin: 10px 0 0 0px;width: 180px\">                         <span id=\"otherPay\" style=\"font-weight: bolder\">其他支出:</span>                         <span>{{body[0].otherPay}}</span>                     </div>                     <div style=\"float: left;margin: 10px 0 0 50px\">                         <span id=\"pettyCash\" style=\"font-weight: bolder\">备用金:</span>                         <span>{{body[0].pettyCash}}</span>                     </div>                  </div>                  <div style=\"clear: both\">                     <div style=\"float: left;margin: 10px 0 0 10px;width: 270px\">     <span id=\"handInAccount\" style=\"font-weight: bolder\">上交金额:</span>                         <span>{{body[0].handInAmount}}</span>                     </div>                     <div style=\"float: left;margin: 10px 0 0 0px;width: 180px\">                         <span id=\"shiftAcount\" style=\"font-weight: bolder\">交接金额:</span>                         <span>{{body[0].transferAmount}}</span>                     </div>                     <div style=\"float: left;margin: 10px 0 0 50px\">                         <span id=\"shiftRemark\" style=\"font-weight: bolder\">备注:</span>                         <span>{{body[0].shiftRemark}}</span>                     </div>                 </div>          </div>          <div style=\"clear: both;\"></div>         <div style=\"border:1px solid #A9A9A9;margin: 20px 0 0 0\"></div>         <div style=\"margin: 20px 0 0px 10px;\">             <table border=\"1\" cellspacing=\"0\" >                 <thead>                 <tr height=\"20px\" >                     <th width=\"100px\">项目</th>                     <th width=\"100px\">收押金额</th>                     <th width=\"100px\">退押金额</th>                     <th width=\"100px\">结账金额</th>                     <th width=\"100px\">挂账金额</th>                     <th width=\"100px\">收入金额</th>                     <th width=\"100px\">支出金额</th>                 </tr>                 </thead>                 <tbody>                 <tr height=\"40px\"  align=\"center\">                     <th>现金</th>                     <td>{{body[1].recriveDeposit}}</td>                     <td>{{body[1].returnDeposit}}</td>                     <td>{{body[1].settlementAmount}}</td>                     <td>{{body[1].onAccount}}</td>                     <td>{{body[1].income}}</td>                     <td>{{body[1].pay}}</td>                 </tr>                 <tr height=\"40px\"  align=\"center\">                     <th>微信</th>                     <td>{{body[2].recriveDeposit}}</td>                     <td>{{body[2].returnDeposit}}</td>                     <td>{{body[2].settlementAmount}}</td>                     <td>{{body[2].onAccount}}</td>                     <td>{{body[2].income}}</td>                     <td>{{body[2].pay}}</td>                 </tr>                 </tbody>             </table>         </div>         <div style=\"border:1px solid #A9A9A9;margin: 20px 0 0 0\"></div>          <div style=\"margin-top: 30px\">              <div style=\"float: left;margin-left: 20px\">                 <span id=\"HandoverSignature\" style=\"font-weight: bold;float: left\">交班人签名:</span>                 <div style=\"border:1px solid ;width: 170px;float: left;margin-top: 20px\"></div>             </div>             <div style=\"float: left;margin-left: 80px\">                 <span id=\"watingWorkSignature\" style=\"font-weight: bold;float: left\">接班人签名:</span>                 <div style=\"border:1px solid ;width: 170px;float: left;margin-top: 20px\"></div>             </div>          </div>     </div>  <script>     var body2="+printArray+"; </script> <script>     var vm; vm = new Vue({\t el: \"#body\",\tdata: {\t\tbody:{\t\t}\t }\t\t}); vm.body = body2; function print() { document.execCommand(\"print\") } console.log(vm.body); </script> </body> </html>";
    var iframesObj = document.getElementById('printFrame').contentDocument;
    iframesObj.open();
    iframesObj.write(iframes);

    $("#shiftPrintDlg").dialog("open");

}

//根据传入支付类型得到打印所需要的数据
function getPrintAccountDetail(payTypeList){
    var recriveDeposit =0;//收押金额
    var returnDeposit =0;//退押金额
    var settlementAmount=0;//结算金额
    var onAccount=0;//挂账金额
    var income=0;//收入金额
    var pay=0;//支出金额
    var otherIncome =0;//其他收入

    for(var d in payTypeList) {
        var dataObj =payTypeList[d];
        recriveDeposit +=dataObj.jsrcDeposit;
        settlementAmount +=dataObj.jsrcTotalPrice;
        onAccount +=dataObj.jsrcArrears;
        otherIncome +=dataObj.jsrcAdditionalCost;
        if( new Date(dataObj.jsrcEndTime).getTime() <  new Date().getTime()) {
            returnDeposit +=dataObj.jsrcDeposit;
        }
    }
    recriveDeposit=formatFigure(recriveDeposit);
    returnDeposit=formatFigure(returnDeposit);
    settlementAmount=formatFigure(settlementAmount);
    onAccount=formatFigure(onAccount);
    income =formatFigure(recriveDeposit+otherIncome+onAccount+settlementAmount);
    pay =formatFigure(returnDeposit);


    var list ={
        recriveDeposit:recriveDeposit,returnDeposit:returnDeposit,settlementAmount:settlementAmount,onAccount:onAccount,
        income:income,pay:pay
    };
    return list;

}


//计算交班详情
function CalculateShiftDetail(jarName,startTime,endTime) {

    startTime ='2019-04-30 09:24:03';
    endTime=getNowFormatDate();
    $.ajax({
        url:"../selectJourShortRentContract.action",
        type:"post",
        dataType:"json",
        data:{
            suStaffName:jarName,
            jarStartTime:startTime,
            jarEndTime : endTime
        },
        success:function (result) {
            console.log(result);
            if (result.body == null){
                payByCash=[];
                payByWX=[];
                $("#operatingConditionsTable").datagrid({
                    data:[],
                    view:myview,
                    emptyMsg:result.msg
                });

                $("#cashRegisterDetailsTable").datagrid({
                    data:[],
                    view:myview,
                    emptyMsg:result.msg
                });

                $("#residentDepositTable").datagrid({
                    data : [],
                    view : myview,
                    emptyMsg : result.msg
                });
                $("#commodityConsumptionRecordTable").datagrid({
                    data:[],
                    view:myview,
                    emptyMsg:result.msg
                });
                $("#spendingDetailTable").datagrid({
                    data:[],
                    view:myview,
                    emptyMsg:result.msg
                });
                $("#depositRecordTable").datagrid({
                    data:[],
                    view:myview,
                    emptyMsg:result.msg
                });
                myTips("获取数据失败","error");
                return;
            }
            console.log(result.body.length);
            var recreiveDeposit =0; //收取押金金额
            var onlinePay =0;//线上支付金额
            var onAccount =0;//挂账金额
            var returnDeposit =0;//退押金额
            var totalDepositAccount =0;//入住总押金
            var totalIncome =0; //总收入
            var checkInNum =result.body.length;//开房数
            var checkOutNum =0;//退房数
            var settlementAmount =0; //收取的房费
            var realIncome =0;//实际收入
            var commodityConsumption =0; //商品消费
            var membersCardPay =0 ; //会员卡支付
            var operatingAveragePrice=0;//平均房价
            var depositInResidence =0;//在住押金
            var recordedDepositAmount =0; //入账押金额
            var otherIncome =0; //其他收入
            var returnDepositAmount =0;//退还押金额
            var otherPay =0; //其他支出

            var residentDepositList =[];   //在住押金构成
            var residentDepositType1={};
            var residentDepositType2 ={};
            var moneyType1 =0;
            var moneyType2 =0;

            var dataList =result.body;
            for( var d in dataList){
                var dataObj = dataList[d];
                recreiveDeposit +=dataObj.jsrcDeposit;
                onlinePay +=dataObj.jsrcDepositPayType;
                onAccount +=dataObj.jsrcArrears;
                commodityConsumption +=dataObj.jsrcAdditionalCost;
                totalDepositAccount +=dataObj.jsrcDeposit;
                settlementAmount +=dataObj.jsrcTotalPrice;
                dataObj.spending =0;
                if(new Date(dataObj.jsrcEndTime).getTime() < new Date().getTime()){
                    returnDeposit +=dataObj.jsrcDeposit;
                    checkOutNum +=1;
                }
                if(dataObj.jsrcDepositPayType ==0) {
                    dataObj.jsrcDepositPayType ='线上支付';
                }else{
                    dataObj.jsrcDepositPayType ='现场支付';
                }

                if(new Date(dataObj.jsrcEndTime).getTime()>new Date().getTime()) {
                    depositInResidence += dataObj.jsrcDeposit;


                }
                if(dataObj.jsrcDepositPayType ==0){
                    residentDepositType1.jsrcDepositPayType='微信';
                    moneyType1 +=dataObj.jsrcDeposit;
                }else {
                    residentDepositType2.jsrcDepositPayType='现金';
                    moneyType2 +=dataObj.jsrcDeposit;
                }

                if(dataObj.jsrcPaymentMethod =='台卡收款'){
                    membersCardPay +=dataObj.jsrcTotalPrice;
                    payByWX.push(dataObj);
                }else{
                    payByCash.push(dataObj);
                }


            }
            moneyType1 = formatFigure(moneyType1);
            moneyType2 = formatFigure(moneyType2);

            residentDepositType1.jsrcDeposit =moneyType1;
            residentDepositType2.jsrcDeposit =moneyType2;

            switch(true){
                case residentDepositType2.jsrcDepositPayType == undefined:
                    residentDepositList.push(residentDepositType1);
                    break;
                case residentDepositType1.jsrcDepositPayType == undefined:
                    residentDepositList.push(residentDepositType2);
                    break;
                default:
                    residentDepositList.push(residentDepositType1);
                    residentDepositList.push(residentDepositType2);
                    break;
            }

            console.log(residentDepositList);


            /*     实际收入=总收入-赊账-退房押金  所有订单
            *      总收入=总房价+押金+商品消费（所有订单）
            *
            * */
            totalDepositAccount =formatFigure(totalDepositAccount);
            totalIncome =formatFigure(settlementAmount+commodityConsumption+totalDepositAccount);
            realIncome =formatFigure(totalIncome-onAccount-returnDeposit);
            returnDepositAmount =formatFigure(returnDeposit);
            recordedDepositAmount =formatFigure(recordedDepositAmount);
            recreiveDeposit =formatFigure(recreiveDeposit);
            returnDeposit =formatFigure(returnDeposit);
            operatingAveragePrice = formatFigure(settlementAmount/checkInNum);
            recordedDepositAmount =depositInResidence;//入账押金额
            otherIncome =commodityConsumption; //其他收入

            $("#onAccountDeposit").val(recreiveDeposit);//入账押金
            $("#outAccountDeposit").val(returnDeposit);//出账押金
            $("#onlinePay").val(onlinePay);
            $("#onAccount").val(onAccount);
            $("#totalDepositAccount").val(totalDepositAccount);
            $("#totalIncome").val(totalIncome);
            $("#checkInNum").val(checkInNum);
            $("#checkOutNum").val(checkOutNum);
            $("#realIncome").val(realIncome);
            $("#commodityConsumption").val(commodityConsumption);
            $("#membersCardPay").val( membersCardPay);
            $("#recordedDepositAmount").val(recordedDepositAmount);
            $("#otherIncome").val(otherIncome);
            $("#returnDepositAmount").val(returnDepositAmount);
            $("#otherPay").val(otherPay);

            dataList.operatingCheckInRooms=checkInNum;
            dataList.operatingReturnRooms =checkOutNum;
            dataList.operatingAveragePrice =operatingAveragePrice;
            dataList.depositInResidence =returnDeposit;


            //保存交接班数据
            shiftData.jsrRecordedDepositAmount=onAccountDeposit; //入账押金额
            shiftData.jsrOnAccount=onAccount; //挂账金额
            shiftData.jsrTotalIncome=totalIncome;//总收入
            shiftData.jsrCheckInNums=checkInNum;//开房数
            shiftData.jsrCheckOutNums=checkOutNum;//退房数
            shiftData.jsrRealIncome=realIncome;//实际收入
            shiftData.jsrCommodityConsumption=commodityConsumption;//商品消费
            shiftData.jsrMembersCardPay=membersCardPay;//会员卡支付
            shiftData.jsrRecordedDepositAmount=recordedDepositAmount;//入住押金额
            shiftData.jsrOtherIncome=otherIncome;//其他收入
            shiftData.jsrReturnDepositAmount=returnDepositAmount;//退还押金额
            shiftData.jsrOtherPay=otherPay;//其他支出
            shiftData.jsrDepositInResidence=depositInResidence;//在住押金
            console.log(shiftData);

            console.log(dataList);
            showOperatingConditionsTable(dataList);
            //展示收银明细数据
            $("#cashRegisterDetailsTable").datagrid("loadData",dataList);
            $("#spendingDetailTable").datagrid("loadData", dataList);
            $("#depositRecordTable").datagrid("loadData", dataList);
            $("#commodityConsumptionRecordTable").datagrid("loadData", dataList);
            $("#residentDepositTable").datagrid("loadData",residentDepositList);

        },
        error:function () {
            myTips("网络错误","error");
            return;
        }
    });

}


//格式化数字小数为2
function formatFigure(figure) {

    return parseFloat(figure.toFixed(2));
}


//显示开房数的详细信息
function showCheckInNumDetail() {
    var shiftStartTime =$("#shiftStartTime").val();
    var shiftEndTime =$("#shiftEndTime").val();
    var suStaffName =$("#endWorker").val();

    console.log(shiftStartTime);

    $("#roomsNumDetailDlg").dialog({
        title:"详细信息",
        top:getTop(600),
        left:getLeft(800),
        width:800,
        height:600,
        closed:true,
        model:true,
        cache:false
    });

    $.ajax({
        url:"../selectJourShortRentContract.action",
        Type:"post",
        dataType:"json",
        data:{
            jarStartTime:'2019-04-24 09:24:03',
            jarEndTime:shiftEndTime,
            suStaffName:suStaffName
        },
        success:function (result) {
            if(result.body ==null) {
                $("#roomsNumTable").datagrid({
                    data : [],
                    view : myview,
                    emptyMsg : result.msg
                });
                return;
            }
            console.log(result.body);
            var dataList =result.body;
            var jsrcTotalPrice =0;
            for (var i in dataList){
                var data = dataList[i];
                jsrcTotalPrice += data.jsrcTotalPrice;
            }

            jsrcTotalPrice  =parseFloat(jsrcTotalPrice.toFixed(2));
            dataList.push({jsrcSaleNo:'合计',jsrcTotalPrice:jsrcTotalPrice});
            console.log(dataList);
            $("#roomsNumTable").datagrid("loadData",dataList);
        }


    });

    $("#roomsNumDetailDlg").dialog("open");
}

//显示退房数的详细信息
function showCheckOutDetail() {

    var shiftStartTime =$("#shiftStartTime").val();
    var shiftEndTime =$("#shiftEndTime").val();
    var suStaffName =$("#endWorker").val();

    $("#roomsNumDetailDlg").dialog({
        title:"详细信息",
        top:getTop(600),
        left:getLeft(800),
        width:800,
        height:600,
        closed:true,
        model:true,
        cache:false
    });

    $.ajax({
        url:"../selectJourShortRentContract.action",
        type:"post",
        dataType:"json",
        data:{
            jarStartTime:'2019-04-24 09:24:03',
            jarEndTime:shiftEndTime,
            suStaffName:suStaffName
        },
        success:function (result) {
            if(result.body ==null) {
                $("#roomsNumTable").datagrid({
                    data : [],
                    view : myview,
                    emptyMsg : result.msg
                });
                return;
            }
            console.log(result.body);
            var dataList =result.body;
            var newDataList =[];
            var jsrcTotalPrice =0;

            for (var i in dataList){
                var data = dataList[i];
                var jsrcEndTime = new Date(data.jsrcEndTime).getTime();
                var nowTime = new Date().getTime();
                if( jsrcEndTime < nowTime){
                    newDataList.push(data);
                    jsrcTotalPrice += data.jsrcTotalPrice;
                }
            }

            jsrcTotalPrice  =parseFloat(jsrcTotalPrice.toFixed(2));
            newDataList.push({jsrcSaleNo:'合计',jsrcTotalPrice:jsrcTotalPrice});
            console.log(newDataList);
            $("#roomsNumTable").datagrid("loadData",newDataList);
        }

    });

    $("#roomsNumDetailDlg").dialog("open");

}

//显示交接金额构成
function showOnlineDespoitDetail() {

    $("#onlineDespoitTable").datagrid({
        data:[],
        view : myview,
        emptyMsg : "没有查询到数据"
    });

}


function getShiftRecordInfo() {

    $.ajax({
        url:"../getShiftRecordInfo.action",
        type:"post",
        dataType:"json",
        success:function (result) {
            console.log(result);
        }
    });


}

function showBalance() {

    var pettyCash =$("#pettyCash").val();
    /*if (pettyCash !=null && pettyCash != '' ){
        $("#pettyCash").attr("readonly", "readonly");
    }*/

    $("#workBalance").val(pettyCash);

}

//计算交接金额
function showTransferAmount(){

    var workBalance =$("#workBalance").val();//上班结余
    var recordedDepositAmount = $("#recordedDepositAmount").val(); //入账押金额
    var pettyCash = $("#pettyCash").val();//本班备用金
    var otherIncome = $("#otherIncome").val();//其他收入
    var returnDepositAmount = $("#returnDepositAmount").val();//退还押金额
    var otherPay = $("#otherPay").val();//其他支出
    var handInAmount =$("#handInAmount").val()//上交金额
    var balanceAmount =0 ;//结余金额
    var transferAmount=0;//交接金额
    balanceAmount =formatFigure(Number(workBalance)+Number(returnDepositAmount)+Number(pettyCash)+Number(otherIncome)-Number(returnDepositAmount)-Number(otherPay));
    transferAmount =formatFigure(balanceAmount -Number(handInAmount));
    console.log(transferAmount);
    $("#transferAmount").val(transferAmount);


}

//展示营业数据
function showOperatingConditionsTable(data) {

    $("#operatingCheckInRooms").val(data.operatingCheckInRooms);
    $("#operatingReturnRooms").val(data.operatingReturnRooms);
    $("#operatingAveragePrice").val(data.operatingAveragePrice);
    $("#operatingDepositInResidence").val(data.depositInResidence);

    $("#operatingConditionsTable").datagrid("loadData", data);

}


//*****************交班记录***************************************

//展示交班记录详情
function showShiftRecordDlg(){

    $("#shiftRecordDetialDlg").dialog({
        title:"交班记录",
        top:getTop(690),
        left:getLeft(955),
        width:955,
        height:690,
        model:true,
        close:true,
        cache:false
    });

    srSerachShiftWork(1,1,0);

    $("#shiftRecordDetialDlg").dialog("open");

    console.log(111111);
    //$("input[name=time]:eq(0)").prop("checked","checked");
}


function srSerachShiftWork(flag,page,type) {


    if (flag == 0) {
        var jsrStartTime = $("#sTime").val();
        var jsrEndTime = $("#eTime").val();
    }
    _pageNum[0] = 1;
    var page = page;
    var pageNum = 15;
    var startNum = (parseInt(page) - 1) * pageNum;
    var endNum = pageNum;


    console.log(jsrEndTime)
    console.log(jsrStartTime);

    $.ajax({
        url: "../selectShiftRecord.action",
        type: "post",
        dataType: "json",
        data: {
            jsrStartTime: jsrStartTime,
            jsrEndTime: jsrEndTime,
            startNum: startNum,
            endNum: endNum
        },
        success: function (result) {

            if (result.body == null) {
                myTips("没有查询到数据", "error");
                $("#shiftRecordTable").datagrid({
                    data: [],
                    view: myview,
                    emptyMsg: "没有查询到数据"
                });
                srShiftDutySourcePage(0, 0, 0, "shiftRecordDiv", "shiftRecordPage");
                $("#shiftRecordDetialDlg").dialog("open");
                return;
            }

            var record = result.body;
            console.log(record);
            console.log(record[0].totalNum);
            if (page == 1 && type == 0) {
                _indexNum[0] = 0;
                srShiftDutySourcePage(record[0].totalNum, 1, 0, "shiftRecordDiv", "shiftRecordPage");
            }

            for (var i in record) {
                record[i].jsrEndTime = new Date(record[i].jsrEndTime).format("yyyy-MM-dd hh:mm:ss");
            }
            $("#shiftRecordTable").datagrid("loadData", record);
        }
    });
}



//清空选项
function clearInfo() {

    var clearObj =$("#searchInfo [clear=clear]").val('');
    $("input[name=time]").prop("checked",false);
    showShiftRecordDlg();
    console.log(clearObj);

}
//获取当日时间
function localTime(){

    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    var dateTime =date.getFullYear()+"-"+month+"-"+strDate;
    var startTime = date.getFullYear() + "-" + month + "-" + strDate+" "+"00"+":"+"00"+":"+"00";
    var endTime = date.getFullYear() + "-" + month + "-" + strDate+" "+"23"+":"+"59"+":"+"59";

    $("#sTime").val(startTime);
    $("#eTime").val(endTime);

    return dateTime;

}

//获取当月时间
function localMonthTime() {

    var date = new Date();
    var month = date.getMonth() + 1;
    date.setMonth(month);
    date.setDate(0);
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }

    var startTime = date.getFullYear() + "-" +month+ "-" + "01"+" "+"00"+":"+"00"+":"+"00";
    var endTime = date.getFullYear() + "-" + month + "-" + strDate+" "+"23"+":"+"59"+":"+"59";

    $("#sTime").val(startTime);
    $("#eTime").val(endTime);

}











