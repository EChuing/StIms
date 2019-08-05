//短租设置信息
setUp = {};
//价格方案信息
pricePlanInfo = [];
$(function () {
    $('#pricePlanTable').datagrid({
        // 表格行双击事件
        onDblClickRow : function(rowIndex, rowData) {
            openAddPricePlan(1,rowData);
        }
    });

    $('#channelTable').datagrid({
        // 表格行双击事件
        onDblClickRow : function(rowIndex, rowData) {
            openChannelDlg(1,rowData);
        }
    });

    $('#signingPeopleTable').datagrid({
        // 表格行双击事件
        onDblClickRow : function(rowIndex, rowData) {
            signingPeopleInfoDlg(1,rowData);
        }
    });

    $('#channelState').val('正常')

    getSetUpInfo();
    getPricePlanInfo(1);
    getChannelInfo(1);
});

//查询渠道单位表信息
function getChannelInfo(page){
    _pageNum[0] = page;
    var pageNum = 20;
    var startNum = (parseInt(page) - 1) * pageNum;
    var endNum = pageNum;

    var jcuState = $('#channelState').val();
    var jcuType = $('#channelType').val();
    var jcuGroupType = $('#groupType').val();
    $.ajax({
        url:"../queryJourChannelUnit.action",
        type:"post",
        data:{
            jcuType		 : jcuType,
            jcuGroupType : jcuGroupType,
            jcuState	 : jcuState,
            startNum	 : startNum,
            endNum		 : endNum
        },
        success:function(data){
            if(data.code == 1){
                channelInfo = data.body;
                console.log(channelInfo);
                var html = '<option></option>';
                for(var i in channelInfo){
                    channelInfo[i].jcuAllowCredit = channelInfo[i].jcuAllowCredit=="0"?"否":"是";
                    channelInfo[i].jcuIsSupportPricePlan = channelInfo[i].jcuIsSupportPricePlan=="0"?"否":"是";
                    if(channelInfo[i].jcuType == "协议单位"){
                        html += '<option value="'+channelInfo[i].jcuId+'">'+channelInfo[i].jcuGroupType+'</option>'
                    }
                }
                if(page == 1){
                    _indexNum[0] = 0;
                    sourcePage(channelInfo[0].totalNum, page, 1);
                }
                $('#jspAgreementUnit').html(html);
                $('#channelTable').datagrid('loadData', channelInfo);
            }else{
                sourcePage(0, 0, 1);
                $('#channelTable').datagrid({
                    data : [],
                    view : myview,
                    emptyMsg : data.msg
                });
            }
        }
    });
}

//查询价格方案
function getPricePlanInfo(page){
    _pageNum[0] = page;
    var pageNum = 9;
    var startNum = (parseInt(page) - 1) * pageNum;
    var endNum = pageNum;

    var jppPlanName = $('#pricePlanName').val();
    var jppState = $('#pricePlanState').val();
    if(jppState != ""){
        jppState = jppState=="正常"?1:2;
    }
    $.ajax({
        url:"../queryJourPricePlan.action",
        type:"post",
        data:{
            startNum:startNum,
            endNum:endNum,
            jppPlanName:jppPlanName,
            jppState:jppState
        },
        success:function(data){
            if(data.code == 1){
                data = data.body;
                pricePlanInfo = data;
                var html = '<option></option>';
                for(var i in pricePlanInfo){
                    html += '<option value='+pricePlanInfo[i].jppId+'>'+pricePlanInfo[i].jppPlanName+'</option>';
                    var jppPlanPackage = JSON.parse(pricePlanInfo[i].jppPlanPackage);
                    var planPackage = "";
                    for(var j in jppPlanPackage){
                        planPackage += jppPlanPackage[j].roomType+':'+jppPlanPackage[j].price+'元/天+; '
                    }
                    pricePlanInfo[i].planPackage = planPackage;
                }
                if(page == 1){
                    _indexNum[0] = 0;
                    sourcePage(data[0].totalNum, page, 0);
                }
                $('#jcuPricePlanId').html(html);
                $('#pricePlanTable').datagrid('loadData', pricePlanInfo);
            }else{
                sourcePage(0, 0, 0);
                $('#pricePlanTable').datagrid({
                    data : [],
                    view : myview,
                    emptyMsg : data.msg
                });
            }
        }
    });
}

//分页操作
function sourcePage(totalNum, page, type) {
    console.log(totalNum);
    var pageNum = Math.ceil(totalNum / 10);
    if (type == 0) {
        pageNum = Math.ceil(pageNum / 9);
        $("#pricePlanPage").remove();
        $("#pricePlanPageDiv")
            .append(
                "<div class='tcdPageCode' id='pricePlanPage' style='text-align:center;'></div>");
        $("#pricePlanPage").createPage({
            onePageNums:20,
            totalNum:totalNum,
            pageCount : pageNum,
            current : 1,
            backFn : function(p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0]=0;
                    getPricePlanInfo(p);
                }
            }
        });
    }
    if (type == 1) {
        pageNum = Math.ceil(pageNum / 9);
        $("#channelPage").remove();
        $("#channelPageDiv")
            .append(
                "<div class='tcdPageCode' id='channelPage' style='text-align:center;'></div>");
        $("#channelPage").createPage({
            onePageNums:20,
            totalNum:totalNum,
            pageCount : pageNum,
            current : 1,
            backFn : function(p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0]=0;
                    getChannelInfo(p);
                }
            }
        });
    }
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
                data = data[0];
                setUp = data;
                //将对象里面字符串转化为对象
                var newdata=JSON.parse(data.jsrsuRoomType);
            }else{
                myTips(result.msg,"error")
            }

        }
    })
}

//方案管理窗口
function openPricePlan(){
    $('#pricePlanDlg').dialog({
        title : '方案详细信息窗口',
        top : getTop(380),
        left : getLeft(750),
        width : 750,
        height : 380,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#pricePlanInfoDlg [clear="clear"]').val("");
            $('#priorityLevel').html("");
        },
    });
    $('#pricePlanState').val("正常");
    $('#pricePlanDlg').dialog('open');
}

//添加/修改方案窗口 type=0为添加； type=1为修改
function openAddPricePlan(type,data){
    var html = "";
    var roomInfo = JSON.parse(setUp.jsrsuRoomType);
    for(var i in roomInfo){
        var price = "";
        var hourPrice="";
        if(type == 1){
            var jppPlanPackage = JSON.parse(data.jppPlanPackage);
            for(var j in jppPlanPackage){
                if(jppPlanPackage[j].roomType == roomInfo[i].roomType){
                    price = jppPlanPackage[j].price;
                    hourPrice =jppPlanPackage[j].hourPrice;
                }
            }
        }
        html += '<div class="pricePlan" style="margin:10px 0 0 5px">房型名称: <input class="roomType" readonly="readonly" style="margin:0 15px 0 0" value="'+roomInfo[i].roomType+'">'
            +'价格: <input type="number" class="price" require="require" style="width:78.79px;margin:0 15px 0 0" value="'+price+'">'+'钟点房价：<input type="number" require="require" class="hourPrice" style="width:78.79px" value="'+hourPrice+'"></div>';
    }
    $('#planPackage').html(html);

    var optionHtml = "";
    for(var i=1;i<10;i++){
        optionHtml += '<option style="text-align: center;" value="'+i+'">'+i+'</option>'
    }
    $('#priorityLevel').append(optionHtml);

    //动态设置窗口高度
    var height = 120+(roomInfo.length+1)*30;

    if(type == 0){ //添加方案
        $('#doAddPricePlan').show();
        $('#updatePricePlan').hide();
    }else{	//修改方案
        $('#planName').val(data.jppPlanName);
        $('#priorityLevel').val(data.jppPriorityLevel);
        $('#doAddPricePlan').hide();
        $('#updatePricePlan').show();
    }

    var title = type==0?"添加":"修改";
    $('#pricePlanInfoDlg').dialog({
        title : title+'方案窗口',
        top : getTop(height),
        left : getLeft(475),
        width : 475,
        height : height,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#pricePlanInfoDlg [clear="clear"]').val("");
            $('#pricePlanInfoDlg [require="require"]').css('border', '1px solid #a9a9a9');
            $('#priorityLevel').html("");
        },
    });
    $('#pricePlanInfoDlg').dialog('open');
}

//执行添加方案 type=0为添加方案 type=1为修改方案
function doSavePricePlan(type){
    var planName = $('#planName').val();	//方案名
    var priorityLevel = $('#priorityLevel').val();	//优先级

    //执行修改时,获取方案id
    var jppId = "";
    if(type == 1){
        var row = $('#pricePlanTable').datagrid('getSelected');
        if(row != "" && row != null){
            jppId = row.jppId;
        }
    }

    //方案内容
    var planPackage = [];
    $("#planPackage .pricePlan").each(function (index){
        var item = {};
        item["roomType"] = $(this).children(".roomType").val();
        item["price"] = parseFloat($(this).children(".price").val()).toFixed(2);
        item["hourPrice"] = parseFloat($(this).children(".hourPrice").val()).toFixed(2);
        planPackage.push(item);
    });

    $.post("../savePricePlan.action",{
        jppId			: jppId,
        jppPlanName		: planName,
        jppPlanPackage	: JSON.stringify(planPackage),
        jppPriorityLevel: priorityLevel,
    },function(data){
        if(data.code == 1){
            myTips(data.msg,"success");
            $('#pricePlanInfoDlg').dialog('close');
            getPricePlanInfo(1);
        }else{
            myTips(data.msg,"error");
            return;
        }
    });
}

$("#jcuType").change(function(){
    var jcuType = $("#jcuType").val()
    if(jcuType == "协议单位"){
        $("#allowCredit").val("1");
        $("#allowCredit").removeAttr("disabled");
        $("#jcuMaxCredit").removeAttr("readonly");
    }else{
        $("#allowCredit").val(0);
        $("#jcuMaxCredit").val(0.00);
        $("#jcuMaxCredit").attr("readonly","readonly");
        $("#allowCredit").attr("disabled","disabled");
    }
});

//渠道类型选择事件
function selectJcuType(){
    $('#jcuMaxCredit').val(0.00);
    var jcuType = $('#jcuType').find('option:selected').val();
    var height = 210; //窗口高度
    if(jcuType != "协议单位"){
        $('#vipHidden').hide();
        $('#vipHidden input').removeAttr("require");
        height = 190;
    }else{
        $('#vipHidden').show();
        $('#vipHidden input').attr("require","require");
    }

    $('#channelDlg').dialog({
        height : height
    }).dialog("open");
};

//渠道信息的窗口
function openChannelDlg(type,data){
    $("#allowCredit").val(0);
    $('#jcuMaxCredit').val("0.00");
    $("#allowCredit").attr("disabled","disabled");
    $("#jcuMaxCredit").attr("readonly","readonly");
    $('#memberLevelDiv').hide();
    var html = '<option></option>'
    for(var i=1;i<6;i++){
        html += '<option value="'+i+'">'+i+'</option>'
    }
    $('#jcuMemberLevel').html(html)
    var height = 210; //窗口高度
    if(type == 1){
        var jcuAllowCredit = data.jcuAllowCredit=="是"?1:0;
        var jcuIsSupportPricePlan = data.jcuIsSupportPricePlan=="是"?1:0;
        for(var i in data){
            $('#'+i).val(data[i])
        }
        if(data.jcuType != '协议单位'){
            if(data.jcuType == '会员'){
                $('#memberLevelDiv').show();
            }
            $('#vipHidden').hide();
            height = 190;
            $('#jcuMemberLevel').val(data.jcuMemberLevel)
            $("#jcuMaxCredit").attr("readonly","readonly");
            $("#allowCredit").attr("disabled","disabled");
        }else{
            $('#jcuMemberLevel').val("")
            $('#vipHidden').show();
            $("#allowCredit").removeAttr("disabled");
            $("#jcuMaxCredit").removeAttr("readonly");

        }
        $('#allowCredit').val(jcuAllowCredit);
        $('#supportPricePlan').val(jcuIsSupportPricePlan);
        if(data.jcuWxReserve == "1"){
            $('#userWx').attr("checked","true")
        }else{
            $('#userWx').attr("checked",false);
        }

        $('#doAddChannel').hide();
        $('#doUpdateChannel').show();
    }else{
        $('#doAddChannel').show();
        $('#doUpdateChannel').hide();
    }
    $('#channelDlg').dialog({
        title : '渠道信息',
        top : getTop(height),
        left : getLeft(510),
        width : 510,
        height : height,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#channelDlg [clear="clear"]').val("");
            $('#checkInDlg1 [require]').css('border', '1px solid #a9a9a9');
        },
    });
    $('#channelDlg').dialog('open');
}
//执行添加渠道 type=0为添加 ; type=1为修改
function saveChannel(type){
    var channelType = $("#jcuType").find("option:selected").text();
    var groupType = $("#jcuGroupType").val();
    var selectPricePlan = $("#jcuPricePlanId").val(); //value为id,text为名称
    var contactsPeople = $("#jcuContactsPeople").val();
    var contactsTelephone = $("#jcuTelephone").val();
    var maxCredit = $("#jcuMaxCredit").val();
    var describe = $("#jcuGroupDescribe").val();
    var allowCredit = $("#allowCredit").val();
    var supportPricePlan = $("#supportPricePlan").val();
    var jcuState = $("#jcuState").find("option:selected").text();
    var userWx = $('#userWx').is(":checked")?1:0;
    var memberLevel = $("#jcuMemberLevel").find("option:selected").text();

    var data = {
        jcuType:channelType,
        jcuGroupType:groupType,
        jcuPricePlanId:selectPricePlan,
        jcuContactsPeople:contactsPeople,
        jcuTelephone:contactsTelephone,
        jcuMaxCredit:maxCredit,
        jcuGroupDescribe:describe,
        jcuAllowCredit:allowCredit,
        jcuIsSupportPricePlan:supportPricePlan,
        jcuState:jcuState,
        jcuWxReserve:userWx,
        jcuMemberLevel:memberLevel,
        type:type //type=0添加,type=1修改
    }
    //type=1 修改渠道信息
    if(type == 1){
        var jcuId = $('#jcuId').val();
        data.jcuId = jcuId;
    }else{
        data.jcuAccountBalance=maxCredit;
    }
    $.ajax({
        type:"post",
        url:"../saveChannelUnit.action",
        data:data,
        dataType:"json",
        success:function(result){
            if(result.code == 1){
                myTips("修改成功","success");
                $('#channelDlg').dialog('close');
                getChannelInfo(1);
            }else{
                myTips("修改失败","error");
                return;
            }
        }
    });
}

//签单人管理窗口
function openSigningPeople(){
    getSigningPeopleInfo();
    $('#signingPeopleDlg').dialog({
        title : '签单人信息',
        top : getTop(350),
        left : getLeft(600),
        width : 600,
        height : 350,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#signingPeopleDlg [clear="clear"]').val("");
        },
    });
    $('#signingPeopleDlg').dialog('open');
}

//查询签单人信息
function getSigningPeopleInfo(){
    $.ajax({
        type:"post",
        url:"../queryJourSigningPeople.action",
        data:{},
        dataType:"json",
        success:function(data){
            if(data.code == 1){
                data = data.body
                $('#signingPeopleTable').datagrid('loadData',data)
            }else{
                myTips(data.msg,"error");
                return;
            }
        }
    });
}
//添加/修改签单人信息窗口
function signingPeopleInfoDlg(type,data){
    var title = type==0?"添加":"修改";
    if(type == 0){
        $('#doAddSigningPeople').show();
        $('#updateSigningPeople').hide();
    }else{
        for(var i in data){
            $('#'+i).val(data[i]);
        }
        $('#doAddSigningPeople').hide();
        $('#updateSigningPeople').show();
    }

    $('#signingPeopleInfoDlg').dialog({
        title : title+'签单人信息',
        top : getTop(180),
        left : getLeft(350),
        width : 350,
        height : 180,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#signingPeopleInfoDlg [clear="clear"]').val("");
        },
    });
    $('#signingPeopleInfoDlg').dialog('open');
}
//执行添加或修改签单人信息
function doSaveSigningPeople(type,rowData){
    var jspAgreementUnit = $("#jspAgrementUnit").val();
    var jspName = $("#jspName").val();
    var jspTelephone = $("#jspTelephone").val();
    var jspPassword = $("#jspPassword").val();
    var jspCredit = $("#jspCredit").val();
    var jspState = $("#jspState").find('option:selected').text();

    var data={
        jspAgreementUnit:jspAgreementUnit,
        jspName:jspName,
        jspTelephone:jspTelephone,
        jspPassword:jspPassword,
        jspCredit:jspCredit,
        jspState:jspState,
        type:type
    }

    data.jspId = type==0?"":$('#jspId').val();

    $.ajax({
        type:"post",
        url:"../saveSigningPeople.action",
        data:data,
        dataType:"json",
        success:function(result){
            if(result.code == 1){
                myTips(result.msg,"success");
                $('#signingPeopleInfoDlg').dialog('close');
                getSigningPeopleInfo();
            }else{
                myTips(result.msg,"error");
                return;
            }
        }
    });
}

$('#jcuType').change(function(){
    var jcuType = $('#jcuType').find('option:selected').text();
    if(jcuType == '会员'){
        $('#memberLevelDiv').show();
    }else{
        $('#memberLevelDiv').hide();
    }
});

//批量修改方案状态 type=1为启用,type=2为注销
function doUpdateState(type){
    var rows = $('#pricePlanTable').datagrid('getChecked');
    if(rows.length == 0){
        myTips('请选中需要修改的方案！', 'error');
        return;
    }
    var array = [];
    for(var i in rows){
        var obj = {};
        obj.jppState = type;
        obj.jppId = rows[i].jppId
        array.push(obj)
    }
    var jsonArray = JSON.stringify(array)

    $.ajax({
        type:"post",
        url:"../batchUpdateJppState.action",
        data:{
            jsonArray:jsonArray
        },
        dataType:"json",
        success:function(result){
            if(result.code == 1){
                myTips(result.msg,"success");
                getPricePlanInfo(1);
            }else{
                myTips(result.msg,"error");
                return;
            }
        }
    });
}

function formatJppState(value, row, index){
    if (row.jppState == 1) {
        return "<a style='text-decoration:none'>正常</a>";
    } else {
        return "<a style='text-decoration:none'>无效</a>";
    }
}