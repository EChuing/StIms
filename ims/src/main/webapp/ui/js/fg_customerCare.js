_ShortMessageTemplate = [];
_systemSetting = [];
$(function () {
    $("#careDataGrid").datagrid({
        onDblClickRow : function(rowIndex, rowData) {
            $("#queryCareDlg").dialog({
                title: "详情",
                top: getTop(220),
                left: getLeft(400),
                width: 400,
                height: 220,
                closed: true,
                cache: false,
                modal: true,
                onClose: function () {}
            });
            $("#time").val(rowData.jcSendingTime);
            $("#user").val(rowData.username);
            $("#mode").val(rowData.caringMode == '短信关怀' ? '1':'2');
            $("#content").val(rowData.jcCaringContent);
            $("#queryCareDlg").dialog("open");
        }
    })

    queryCare(1, 0);
    queryShortMessageTemplate();
    querySystemSetting();
})

function querySystemSetting() {
    $.post("../querySystemSetting.action",{

    },function (data) {
        if (data.code < 0){
            myTips(data.msg, 'error');
            return;
        }
        _systemSetting = data.body;
    })
}

function queryShortMessageTemplate() {
    $.post("../queryShortMessageTemplate.action",{
        jstSort : 1
    },function (data) {
        if (data.code < 0){
            myTips(data.msg, 'error');
            return;
        }
        _ShortMessageTemplate = data.body;
        for(var i in _ShortMessageTemplate){
            $("#template").append("<option value='"+i+"'>"+_ShortMessageTemplate[i].jstTitle+"</option>")
        }
    });
}

//分页统计总条数
function getcarePageCount(page){
    var pageSize = 20;
    var jcSendingTime = $("#searchSendingTime").val();
    var jcCaringMode = $("#searchCaringMode").val();
    var jcUsername = $("#searchRegisterGetUserId").val();
    $.post("../queryCare.action", {
        jcSendingTime: jcSendingTime,
        jcUsername: jcUsername,
        jcCaringMode: jcCaringMode,
    }, function (data) {
        if (data.code < 0 || data.body[0].totalNum == 0){
            var countJson = {
                totalNum:0,
            };
            getCountData(0,countJson,pageSize,page,"care",0);
        } else {
            data=data.body;
            var countJson = {
                totalNum: data[0].totalNum,
            };
            getCountData(1,countJson,pageSize,page,"care",0);
        }
    });
}

//关怀列表
function queryCare(page, type) {
    var startNum = (parseInt(page) - 1) * 20;
    var endNum = 20;
    var jcSendingTime = $("#searchSendingTime").val();
    var jcCaringMode = $("#searchCaringMode").val();
    var jcUsername = $("#searchRegisterGetUserId").val();
    showLoading();
    $.post("../queryCare.action", {
        startNum: startNum,
        endNum: endNum,
        jcSendingTime: jcSendingTime,
        jcUsername: jcUsername,
        jcCaringMode: jcCaringMode,
    }, function (data) {
        hideLoading();
        if (data.code < 0) {
            // sourcePage(0, 0, 0);
            $('#careDataGrid').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
            if(page==1){
                notCountPage(0, 0 ,"queryCare","care");
            }else{
                notCountPage(page, 0 ,"queryCare","care");
            }
            return;
        }
        data = data.body;
        for (var i in data) {
            data[i].caringMode = data[i].jcCaringMode == 1 ? '短信关怀' : '微信关怀';
        }
        // if (page == 1 && type == 0) {
        //     _indexNum[0] = 0;
        //     sourcePage(data[0].totalNum, page, 0);
        // }
        if(data.length<endNum){
            notCountPage(page, 2 , "queryCare","care");
        }else{
            notCountPage(page, 1 , "queryCare","care");
        }
        $("#careDataGrid").datagrid("loadData", data);
    })
}

//分页操作
function sourcePage(totalNum, page, type) {
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 0) {
        pageNum = Math.ceil(totalNum / 20);
        $("#carePage").remove();
        $("#carePageDiv")
            .append(
                "<div class='tcdPageCode' id='carePage' style='text-align:center;'></div>");
        $("#carePage").createPage({
            onePageNums: 20,
            totalNum: totalNum,
            pageCount: pageNum,
            current: 1,
            backFn: function (p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0] = 0;
                    queryCare(p, 1);
                }
            }
        });
    }

}

//添加关怀窗口
function addCare() {
    $("#addCareDlg").dialog({
        title: "添加关怀",
        top: getTop(260),
        left: getLeft(400),
        width: 400,
        height: 260,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#addCareDlg input").val('');
            $("#addCareDlg textarea").val('');
            $("#addCareDlg input[require='require']").each(function () {
                $(this).css("border", "1px solid #A9A9A9");
            });
            $("#addCareDlg textarea[require='require']").each(function () {
                $(this).css("border", "1px solid #A9A9A9");
            });
            $("#cocId").val('');
        }
    });
    $("#username").val(_loginUserName);
    $("#caringMode").val(1);
    $("#addCareDlg").dialog("open");
}

//执行添加关怀
function doAddCare() {
    var checkFlag = 0;
    $("#addCareDlg input[require='require']").each(function () {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).css("border", "1px solid red");
            checkFlag++;
        } else {
            $(this).css("border", "1px solid #A9A9A9");
        }
    });
    $("#addCareDlg textarea[require='require']").each(function () {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).css("border", "1px solid red");
            checkFlag++;
        } else {
            $(this).css("border", "1px solid #A9A9A9");
        }
    });
    $("#addCareDlg select[require='require']").each(function () {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).css("border", "1px solid red");
            checkFlag++;
        } else {
            $(this).css("border", "1px solid #A9A9A9");
        }
    });
    if (checkFlag != 0) {
        myTips("有必填项未填写!");
        return;
    }

    var sendingTime = $("#sendingTime").val();
    var username = _loginUserId;
    var caringMode = $("#caringMode").val();
    var caringContent = template;
    var cocId = $("#cocId").val();
    $.post("../insertCare.action", {
        jcSendingTime: sendingTime,
        jcUsername: username,
        jcCaringMode: caringMode,
        jcCaringContent: caringContent,
        jcCustomerId: cocId
    }, function (data) {
        if (data.code < 0) {
            myTips(data.msg, 'error');
            return;
        }
        myTips("添加成功！", "success");
        queryCare(1, 0);
        $("#addCareDlg").dialog('close');
    });
}

function updateCare() {
    var row = $("#careDataGrid").datagrid("getSelected");
    if(!row){
        myTips('请选择要修改的记录', 'error');
        return;
    }
    $("#addCareDlg").dialog({
        title: "修改信息",
        top: getTop(240),
        left: getLeft(400),
        width: 400,
        height: 240,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#addCareDlg input").val('');
            $("#addCareDlg textarea").val('');
            $("#addCareDlg input[require='require']").each(function () {
                $(this).css("border", "1px solid #A9A9A9");
            });
            $("#addCareDlg textarea[require='require']").each(function () {
                $(this).css("border", "1px solid #A9A9A9");
            });
            $("#doUpdateCare").hide();
            $("#doAddCare").show();
            $("#updateCare").hide();
            $("#addCare").show();
        }
    });
    $("#sendingTime").val(row.jcSendingTime);
    $("#username").val(row.username);
    $("#caringMode").val(row.caringMode == '短信关怀' ? '1':'2');
    $("#caringContent").val(row.jcCaringContent);
    $("#doUpdateCare").show();
    $("#doAddCare").hide();
    $("#updateCare").show();
    $("#addCare").hide();
    $("#addCareDlg").dialog("open");
}

function doUpdateCare() {
    var row = $("#careDataGrid").datagrid("getSelected");
    var checkFlag = 0;
    $("#addCareDlg input[require='require']").each(function () {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).css("border", "1px solid red");
            checkFlag++;
        } else {
            $(this).css("border", "1px solid #A9A9A9");
        }
    });
    $("#addCareDlg textarea[require='require']").each(function () {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).css("border", "1px solid red");
            checkFlag++;
        } else {
            $(this).css("border", "1px solid #A9A9A9");
        }
    });
    $("#addCareDlg select[require='require']").each(function () {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).css("border", "1px solid red");
            checkFlag++;
        } else {
            $(this).css("border", "1px solid #A9A9A9");
        }
    });
    if (checkFlag != 0) {
        myTips("有必填项未填写!");
        return;
    }
    var sendingTime = $("#sendingTime").val();
    var caringMode = $("#caringMode").val();
    var caringContent = $("#caringContent").val();
    $.post("../updateCare.action", {
        jcId         :  row.jcId,
        jcSendingTime: sendingTime,
        jcCaringMode: caringMode,
        jcCaringContent: caringContent
    }, function (data) {
        if (data.code < 0) {
            myTips(data.msg, 'error');
            return;
        }
        myTips("修改成功！", "success");
        queryCare(1, 0);
        $("#addCareDlg").dialog('close');
    });
}

function openCustomerDlg(type) {
    $("#customerDlg").dialog({
        title: "客户",
        top: getTop(620),
        left: getLeft(1000),
        width: 1000,
        height: 620,
        closed: true,
        cache: false,
        modal: true,
        onClose: function () {
            $("#customerDlg input").val('');
        }
    });
    queryCustomer(type);
    $("#customerDlg").dialog("open");
}

function queryCustomer(type) {
    var cocContacts = $("#searchCustomerName").val();
    var cocPhone = $("#searchCustomerPhone").val();
    var cocState = $("#searchCustomerState").val();
    showLoading();
    $.post("../queryCustomer.action",{
        cocContacts	:	cocContacts,
        cocPhone	:	cocPhone,
        cocState	:	cocState,
    },function(data){
        hideLoading();
        if(data.code < 0){
            $('#customerDg').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
            return;
        }
        data = data.body;
        for (var i in data) {
            for ( var j in data[i]) {
                if (data[i][j] == null) {
                    data[i][j] = '';
                }
            }
            if(data[i].cocContacts == null || data[i].cocContacts == ""){
                if(data[i].cocPhone == null || data[i].cocPhone == ""){
                    data.splice(i,1);
                    i--;
                    data[0].totalNum--;
                }
            }
            if(data[i].cocAddress.getRealJsonStr().indexOf('{') == -1){
                data[i].address = data[i].cocAddress;
            }else{
                var address = JSON.parse(data[i].cocAddress.getRealJsonStr());
                data[i].address = address.community + address.address;
            }
        }
        $("#customerDg").datagrid("loadData",data);
        var cocId = $("#cocId").val();
        if(cocId != ''){
            var data = eval(cocId);
            var rows = $("#customerDg").datagrid("getRows");
            for(var i in rows){
                for (var j in data){
                    if(rows[i].cocId == data[j]){
                        $("#customerDg").datagrid("checkRow",i);
                    }
                }
            }
        }
        if(type == 1){
            var row = $("#careDataGrid").datagrid("getSelected");
            var rows = $("#customerDg").datagrid("getRows");
            var data = eval(row.jcCustomerId.getRealJsonStr());
            for(var i in rows){
                for (var j in data){
                    if(rows[i].cocId == data[j]){
                        $("#customerDg").datagrid("checkRow",i);
                    }
                }
            }
        }
    });
}

function doSelectedCustomer() {
    var row = $("#customerDg").datagrid("getChecked");
    var cocId = [];
    for (var i in row){
        cocId.push(row[i].cocId);
    }
    $("#cocId").val(JSON.stringify(cocId));
    selectedTemplate();
    $('#customerDlg').dialog('close');
}
var template;
function selectedTemplate() {
    var templateIndex = $("#template").val();
    var cocId = $("#cocId").val();
    if(templateIndex != ''){
        if(cocId != '' && cocId != '[]'){
            var data = eval(cocId);
            var rows = $("#customerDg").datagrid("getRows");
            var name = null;//客户名字
            template = _ShortMessageTemplate[templateIndex].jstContent;//短信内容
            var ssitIdentification = _systemSetting[0].ssitIdentification;//公司签名
            for(var i in rows){
                if(rows[i].cocId == data[0]){
                    name = rows[i].cocContacts;
                    continue;
                }
            }
            var template2 = template.replace(/【签名】/g,'【'+ssitIdentification+'】');
            template2 = template2.replace(/【客户】/g,name);
            console.log(template2);
            $("#caringContent").val(template2);

        }
    }
}