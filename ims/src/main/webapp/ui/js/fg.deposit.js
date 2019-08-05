$(function () {
    //查询所有下定
    queryAllDeposit(1);
    $("#depositDg").datagrid({
        width:auto,
    });
    //获取下定详情双击事件
    $("#depositDg").datagrid({
        onDblClickRow : function(rowIndex, rowData) {
            var row = $("#depositDg").datagrid("getSelected");
            $("#detailsOfDepositDlg").dialog({
                title : "下定信息",
                top : getTop(200),
                left : getLeft(480),
                width : 420,
                height : 300,
                closed : true,
                cache : false,
                modal : true,
                onClose : function() {
                    $("#detailsOfDepositDlg input").val('');
                    $("#detailsOfDepositDlg textarea").val('');
                }
            });
            if(row.jemState=="有效"){
                $("#updateDepositSaveButton").show()
            }
            queryDepositInfo(row);
        }
    });
});


//分页统计总条数
function getmydepositPageCount(page){
    var pageSize = 15;
    var jemDepositType=$("#depositType  option:selected").val();
    var jemState="";
    if(jemDepositType=="有效"){
        jemState="有效";
        jemDepositType="";
    }
    console.log(jemState+"=="+jemDepositType);
    //排序
    var theSortTerm = $('#theSortTermInput').val();
    var theSortContrary = $('#theSortContraryInput').val();
    // console.log("sort "+theSortTerm);
    // console.log("con "+theSortContrary);
    // console.log("startNum "+startNum);
    // console.log("endNum"+endNum);
    $.post("../selectJourEarnestmoneyList.action",{
        jemDepositType:jemDepositType,
        splitFlag:0,
        jemState:jemState,
        theSortTerm:theSortTerm,
        theSortContrary:theSortContrary
    },function(data){
        if (data.code < 0 || data.body[0].totalNum == 0){
            var countJson = {
                totalNum:0,
            };
            getCountData(0,countJson,pageSize,page,"mydeposit",0);
        } else {
            data=data.body;
            var countJson = {
                totalNum: data[0].totalNum,
            };
            getCountData(1,countJson,pageSize,page,"mydeposit",0);
        }
    });
}

//查找所有下定
function queryAllDeposit(page){
    var pageNum=15;
    var startNum = (parseInt(page) - 1) * pageNum;
    var endNum = pageNum;
    var jemDepositType=$("#depositType  option:selected").val();
    var jemState="";
    if(jemDepositType=="有效"){
        jemState="有效";
        jemDepositType="";
    }
    console.log(jemState+"=="+jemDepositType);
    //排序
    var theSortTerm = $('#theSortTermInput').val();
    var theSortContrary = $('#theSortContraryInput').val();
    // console.log("sort "+theSortTerm);
    // console.log("con "+theSortContrary);
    // console.log("startNum "+startNum);
    // console.log("endNum"+endNum);
    $.post("../selectJourEarnestmoneyList.action",{
        jemDepositType:jemDepositType,
        startNum:startNum,
        endNum:endNum,
        splitFlag:1,
        jemState:jemState,
        theSortTerm:theSortTerm,
        theSortContrary:theSortContrary
    },function(data){
        if(data.code<0){
            if(page==1){
                notCountPage(0, 0 ,"queryAllDeposit","mydeposit");
            }else{
                notCountPage(page, 1 ,"queryAllDeposit","mydeposit");
            }
            $('#depositDg').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
        }else{
            data=data.body;
            // for (var i in data){
            //     console.log(data[i]);
            // }
            if(data==null){//查询结果为空
                $('#depositDg').datagrid({
                    data : [],
                    view : myview,
                    emptyMsg :"未查询到数据"
                });
                return ;
            }
            //分页
            // pageSort(data.length,pageNum,page);
            if(data.length<endNum){
                notCountPage(page, 2 , "queryAllDeposit","mydeposit");
            }else{
                notCountPage(page, 1 , "queryAllDeposit","mydeposit");
            }
            $("#depositDg").datagrid("loadData", data);
        }
    },"json");
}

//分页
function pageSort(dataSize,pageNum,page){
    var theSortTerm = $('#theSortTermInput').val();
    var theSortContrary = $('#theSortContraryInput').val();
    var jemDepositType=$("#depositType  option:selected").val();
    var jemState="";
    if(jemDepositType=="有效"){
        jemState="有效";
        jemDepositType="";
    }
    // if(dataSize<pageNum){//只有一页
    //     notCountPage(page, 2, "queryAllDeposit", "mydeposit");
    // }else{  //查询总数用于分页
        $.post("../selectJourEarnestmoneyList.action",{
            jemDepositType:jemDepositType,
            jemState:jemState,
            splitFlag:0,
            theSortTerm:theSortTerm,
            theSortContrary:theSortContrary
        },function(data){
            if (page == 1){
                _indexNum[0] = 0;
                data=data.body;
                sourcePage(data[0].totalNum);
            }
        });
    // }
}

//分页操作
function sourcePage(totalNum) {
    // console.log(totalNum);
    pageNum = Math.ceil(totalNum / 15);
    $("#mydepositPage").remove();
    $(".tcdPageCode").remove();
    $("#mydepositPageDiv")
        .append(
            "<div class='tcdPageCode' id='mydepositPage' style='text-align:center;'></div>");
    $("#mydepositPage").createPage({
        onePageNums:15,
        totalNum:totalNum,
        pageCount : pageNum,
        current : 1,
        backFn : function(p) {
            if (p <= pageNum) {
                _pageNum[0] = p;
                _indexNum[0]=0;
                queryAllDeposit(p);
            }
        }
    });
}

//显示排序窗口
function showDepositSortDlg(){
    $("#theDepositSortDlg").show();
}

//排序点击时事件
$(document).click(function(e) {
    var clickId = $(e.target).attr('id');
    if(!clickId){
        $("#theDepositSortDlg").fadeOut();
        return;
    }
    if(clickId=="showTenantSortButton" || clickId=="showTenantSortjia"){

    }else if(clickId.indexOf("theSortTerm")>-1){
        var alltheSortTerm = $('.theSortTerm');
        $('.theSortTerm').each(function(){
            $(this).removeClass("theSortTermSelect");
        });
        $("#"+clickId).addClass("theSortTermSelect");
        $('#theSortTermInput').val($("#"+clickId).attr("searchVal"));
        queryAllDeposit(1);
    }else if(clickId.indexOf("theSortContrary")>-1){
        var alltheSortContrary = $('.theSortContrary');
        $('.theSortContrary').each(function(){
            $(this).removeClass("theSortContrarySelect");
        });
        $("#"+clickId).addClass("theSortContrarySelect");
        $('#theSortContraryInput').val($("#"+clickId).attr("searchVal"));
        queryAllDeposit(1);
    }
});


//双击查看详情
function queryDepositInfo(row){
    $("#jem_address").val(row.jemAddress);
    $("#jemIntermediator").val(row.jemIntermediator);
    $("#jemState").val(row.jemState);
    $("#jemCustomerPhone").val(row.jemCustomerPhone);
    $("#jemCustomer").val(row.jemCustomer);
    $("#jemSum").val(row.jemSum);
    $("#jemRegisterTime").val(row.jemRegisterTime);
    $("#jemStartTime").val(row.jemStartTime);
    $("#jemEndTime").val(row.jemEndTime);
    $("#jemContractBegin").val(row.jemContractBegin);
    $("#jemContractEnd").val(row.jemContractEnd);
    $("#jemPayWay").val(row.jemPayWay);
    $("#jemDepositBillNumber").val(row.jemDepositBillNumber);
    $("#detailsOfDepositDlg").dialog('open');
}

//取消下定
function updateDeposit(){
    var row = $("#depositDg").datagrid("getSelected");
    $.post("../clearDeposit.action",{
        hsId:row.jemHsId
    },function(data){
        if(data<0){
            myTips(data.msg,"error");
        }else{
            myTips("取消成功","success");
            queryAllDeposit(1);
            $("#detailsOfDepositDlg").dialog('close');
        }
    });
}
