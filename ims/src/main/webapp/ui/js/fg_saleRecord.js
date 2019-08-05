$(function () {
    listGoodsSell(1,0);
});

//分页统计总条数
function getgoodsSellPageCount(page){
    var pageSize = 20;
    var cgsGoodsName = $("#searchSalesGoodsName").val();
    var startTime = $("#searchSalesGoodsStartTime").val();
    var endTime = $("#searchSalesGoodsEndTime").val();

    $.ajax({
        type:"post",
        url:"../listCsGoodsSell.action",
        data:{
            cgsGoodsName:cgsGoodsName,
            startTime:startTime,
            endTime:endTime,
            splitFlag : 0,
        },
        dataType:"json",
        success:function(data) {
            if (data.code < 0 || data.body[0].totalNum == 0) {
                var countJson = {
                    totalNum: 0,
                };
                getCountData(0, countJson, pageSize, page, "goodsSell", 0);
            } else {
                data = data.body;
                var countJson = {
                    totalNum: data[0].totalNum,
                };
                getCountData(1, countJson, pageSize, page, "goodsSell", 0);
            }
        }
    });
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