//短租设置信息
setUp = {};
//价格方案信息
pricePlanInfo = {};
//渠道信息
channelInfo = {};

$(function () {
    $('#pricePlanTable').datagrid({
        // 表格行双击事件
        onDblClickRow : function(rowIndex, rowData) {
            openPricePlan(1,rowData);
        }
    });

    $('#channelTable').datagrid({
        // 表格行双击事件
        onDblClickRow : function(rowIndex, rowData) {
            openChannelDlg(1,rowData);
        }
    });
    msgetDeviceInfo();

    msgetMsSetUpInfo();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if(e.target.hash=='#ttab8'){
            msgetMsSetUpInfo();
        }

        e.target // newly activated tab
        e.relatedTarget // previous active tab
    })
});
//查询服务
function msgetMsSetUpInfo(){
    console.log("进来了")
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
                var info = data;
                console.log(info)
                for(var i in info){
                    $("#" + i).val(info[i])
                    if(i=='jsrsuShopAccount' || i == 'jsrsuCashAccount'){
                        var fa = $("#ms" + i);
                        fa.find('.accountType').append('<option></option>');
                        fa.find('.accountName').append('<option></option>');
                        for (var j in _acountType) {
                            fa.find('.accountType').append("<option value='" + _acountType[j] + "'>" + _acountType[j] + "</option>");
                        }
                        var accountId = info[i];
                        $.ajax({
                            type:"post",
                            url:"../selectNamePublic.action",
                            data:{
                                faId :accountId
                            },
                            dataType:"json",
                            async:false,
                            success:function(account){
                                fa.find(".accountName").empty();
                                fa.find(".accountType").val(account.body[0].faPaymentType);
                                //为了查出该种类的其他数据
                                $.ajax({
                                    type:"post",
                                    url:"../selectNamePublic.action",
                                    data:{
                                        faPaymentType: account.body[0].faPaymentType,
                                    },
                                    dataType:"json",
                                    async:false,
                                    success:function(result){
                                        for (var k in result.body) {
                                            if(result.body[k].faId == accountId){
                                                fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "' selected='selected'>" + result.body[k].faUserName + "</option>");
                                                fa.find(".accountId").val(result.body[k].faId);
                                                fa.find(".accountNum").val(result.body[k].faAccount);
                                                fa.find(".accountBelong").val(result.body[k].faBelonging);
                                            }else{
                                                fa.find(".accountName").append("<option value='" +  result.body[k].faId+"*#*"+  result.body[k].faBelonging +"*#*"+ result.body[k].faAccount + "'>" + result.body[k].faUserName + "</option>");
                                            }
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
                setUp = data;
                jsrsuRoomTypeList = JSON.parse(data.jsrsuRoomType);
                //将对象里面字符串转化为对象
                var newdata=JSON.parse(data.jsrsuRoomType);
                var html="";
                for(var i in newdata){
                    var index = parseInt(i) + 1;
                    html += '<div class="jsrsu" style="margin: 10px 0 0 0px"><input id="msconfigurationInfo'+index+'" value="'+newdata[i].configurationInfo+'" type="hidden">房型: <input class="jsrsuRoomTypeItem" value="'+newdata[i].roomType+'" style="width:100px;margin-right:20px" />'
                        +'<img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -7px 0" /></div>';
                }
                $("#msjsrsuRoomType").html(html);
                //押金支付方式
                $('#msonlineDepositPrcent').val(data.jsrsuRoomChargePercent);
                if(data.jsrsuDepositRules == 0){//线上支付
                    console.log(data)
                    $('#msdepositPayOnline').attr("checked", "true");
                    $('#msonlineDepositPrcent').attr("readOnly","true");
                }else{							//现场支付
                    $('#msdepositPayScene').attr("checked", "true");
                    $('#msonlineDepositPrcent').attr("readOnly","false");
                }
                $(":checkbox").click(function(){
                    var flag = $(this).is(':checked');
                    if (flag) {
                        $(this).siblings("input").attr("checked", false);
                    }
                });

                //押金设置规则
                if(data.jsrsuDepositSetType != null){
                    var jsrsuDepositSetType = JSON.parse(data.jsrsuDepositSetType)
                    if(jsrsuDepositSetType.type == 1){
                        $('#msdepositMoney').val(jsrsuDepositSetType.depositMoney);
                        $('#msdepositSetType').attr("checked", "true");
                        $('#msdepositMoney').attr("readOnly",false);
                    }else{
                        $('#msdepositMoney').val("0.00");
                        $('#msdepositSetType').attr("checked", false);
                        $('#msdepositMoney').attr("readOnly", "true");
                    }
                }
            }
            msopenMsSetUp();
        }
    })
}

function msgetDeviceInfo(){
    $.ajax({
        type:"post",
        url:"../queryDevice.action",
        data:{
            devId:"41",
            devBrandId:20
        },
        dataType:"json",
        async:false,
        success:function(data){
        }
    });
}
function msopenMsSetUp(){
    console.log(setUp)
    //动态加载短租设置信息
    for(var i in setUp){
        $("#ms" + i).val(setUp[i]);
    }
    if(setUp.jsrsuTradingRules != null && setUp.jsrsuTradingRules != ""){
        //动态加载公众号交易规则
        var newjsrsuTradingRules=JSON.parse(setUp.jsrsuTradingRules);
        for(var j in newjsrsuTradingRules){
            $("#ms" + j).val(newjsrsuTradingRules[j]);
        }
    }
    $('#msserviceCharge').datagrid({
        columns : [ [
            {
                field : 'popservice',
                title : '服务',
                width : 50,
                align : 'center',
                editor : 'textbox'
            },
            {
                field : 'popcharge',
                title : '金额',
                width : 30,
                align : 'center',
                editor : 'textbox'
            },
            {
                field : 'deleteAdd',
                title : '删除',
                width : 20,
                align : 'center',
                formatter : function(value, row, index) {
                    return "<a href='#' onclick=\"myDeleteRows('"+row.popservice+"','popservice','msserviceCharge',0)\">删除</a>";
                }
            } ] ],
        width : '99%',
        height : '100%',
        singleSelect : true,
        autoRowHeight : false,
        scrollbarSize : 0,
        showPageList : false,
        fitColumns : true,

    });
    //field加载服务消费
    if(setUp.jsrsuServiceCharge!="" && setUp.jsrsuServiceCharge!=null){
        var newjsrsuServiceCharge=JSON.parse(setUp.jsrsuServiceCharge);
        $('#msserviceCharge').datagrid('loadData',newjsrsuServiceCharge);
    }

    //加载钟点房使用规则
    var jsrsuHourRoom=JSON.parse(setUp.jsrsuHourRoom);
    for(var r in jsrsuHourRoom){
        $("#ms" + r).val(jsrsuHourRoom[r]);
    }

    //电子门牌设置
    var jsrsuElectronicDoorplateno = JSON.parse(setUp.jsrsuElectronicDoorplateno);
    for(var k in jsrsuElectronicDoorplateno){
        if(k == jsrsuElectronicDoorplateno[k].keyNumber){
            $('#mskey'+k).val(jsrsuElectronicDoorplateno[k].keyName);
            if($('#mskey'+k).val() == "已入住"){
                var e = $('#mskey'+k).parent().next();
                e.show();
                if(jsrsuElectronicDoorplateno[k].msscenarioMode == 0){
                    e.children().attr("checked", false);
                }else{
                    e.children().attr("checked", "true");
                }
            }
        }
    }
}

function msonClickCell1(index, field) {
    if (endEditing1(field)) {
        $('#msserviceCharge').datagrid('selectRow', index).datagrid(
            'editCell', {
                index : index,
                field : field
            });
        editIndex1 = index;
    }
}

function msgetInputItem(id){
    var array = [];
    $("#"+id+" .jsrsu").each(function (index){
        var item = {};
        var num = index+1;
        item["roomType"] = $(this).children(".jsrsuRoomTypeItem").val();
        item["configurationInfo"] = $(this).children("#configurationInfo"+num+"").val();
//		item["jsrrtpPlanNumber"] = index;
        array.push(item);
    });
    return JSON.stringify(array);
}
//打开添加服务消费窗口
function msaddService(){
    $('#msaddServiceDlg').dialog({
        title : "添加服务",
        top : getTop(-250),
        left : getLeft(-120),
//		top :  400,
//		left : 620,
        width : 300,
        height : 200,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#msservice').val('');
            $('#mscharge').val('');
        }
    });
    /*var input =document.getElementById("charge");
    var regex = /^[0-9A-F]+$/;
    if(!regex.test(input.value)){
    }*/
    $('#msaddServiceDlg').dialog('open');
}

//保存添加服务消费窗口
function msdoservice(){
    var service=$('#msservice').val();
    var charge=$('#mscharge').val();
    if(service !="" && charge !=""){
        var rows=$('#msserviceCharge').datagrid("getRows");
    }
    obj={};
    obj.popservice=service;
    obj.popcharge=charge;
    rows.push(obj);
    $('#msserviceCharge').datagrid('loadData',rows);
    $('#msaddServiceDlg').dialog('close');
}

//短租设置保存
function msdoSetUp(){
    var jsrsuCheckInTime = $("#msjsrsuCheckInTime").val();
    var jsrsuCheckOutTime = $("#msjsrsuCheckOutTime").val();
    var jsrsuWxgzhTitle = $("#msjsrsuWxgzhTitle").val();
    var jsrsuState = $("#msjsrsuState").val();
    var jsrsuRefundRoomCharge = $("#msjsrsuRefundRoomCharge").val();
    var jsrsuRefundRoomChargeTime = $("#msjsrsuRefundRoomChargeTime").val();
    var jsrsuAdImgs = $("#msjsrsuAdImgs").val();
    var jsrsuTelphone = $("#msjsrsuTelphone").val();
    var jsrsuGrogshopIntroduce = $("#msjsrsuGrogshopIntroduce").val();
    var jsrsuLongestBookingDays =$("#msjsrsuLongestBookingDays").val();//最长订房天数
    var jsrsuFutureBookingDays =$("#msjsrsuFutureBookingDays").val();//未来多少天可以预定
    var jsrsuRoomType = getInputItem('msjsrsuRoomType');
    //公众号交易规则
    var jsrsuPredeterminedMode=$("#msjsrsuPredeterminedMode").val();
    var jsrsuCheckInMode=$("#msjsrsuCheckInMode").val();
    var jsrsuOnlineDepositRatio=$("#msjsrsuOnlineDepositRatio").val();
    var jsrsuOtherExpenses=$("#msjsrsuOtherExpenses").val();
    var jsrsuTradingDeposit=$("#msjsrsuTradingDeposit").val();
    var jsrsuAddGuest=$("#msjsrsuAddGuest").val();
    var jsrsuInstructionsForAdmission=$("#msjsrsuInstructionsForAdmission").val();
    var rows=$('#msserviceCharge').datagrid("getRows");
    var serviceData=JSON.stringify(rows);

    var obj={}
    obj.jsrsuPredeterminedMode=jsrsuPredeterminedMode;
    obj.jsrsuCheckInMode=jsrsuCheckInMode;
    obj.jsrsuOnlineDepositRatio=jsrsuOnlineDepositRatio;		//在线订金比
    obj.jsrsuOtherExpenses=jsrsuOtherExpenses;
    obj.jsrsuTradingDeposit=jsrsuTradingDeposit;
    obj.jsrsuAddGuest=jsrsuAddGuest;
    obj.jsrsuInstructionsForAdmission=jsrsuInstructionsForAdmission;
    var jsrsuTradingRules =JSON.stringify(obj);

    //钟点房使用规则
    /*/!*var hourRoomStartTime=$('#msHourRoomStartTime').val();
    var hourRoomEndTime=$('#msHourRoomEndTime').val();
    var hourRoom=$('#msHourRoom').val();*!/
    var objRoom={}
    objRoom.hourRoomStartTime=hourRoomStartTime;
    objRoom.hourRoomEndTime=hourRoomEndTime;
    objRoom.hourRoom=hourRoom;
    var jsrsuHourRoom =JSON.stringify(objRoom);*/

    //押金支付方式 0为线上支付；1为现场支付
    var jsrsuDepositRules = "";
    $("input[name='depositPay']:checkbox").each(function() {
        if($(this).is(":checked")) {
            jsrsuDepositRules = $(this).val();
        }
    });

    //押金设置规则
    var depositSetType = {};
    var depositMoney = "";
    if($('#msdepositSetType').is(":checked")) {
        depositSetType.type = 1;
        depositMoney = $('#msdepositMoney').val()
    }else{
        depositSetType.type = 0;
        depositMoney = 0.00;
    }
    depositSetType.depositMoney = parseFloat(depositMoney).toFixed(2);

    //在线定金比
    var onlineDepositPrcent = $('#msonlineDepositPrcent').val();

    //电子门牌设置
    var jsrsuElectronicDoorplateno = [];
    $(".mselectronicDoorplateno").each(function (index){
        var item = {};
        item["keyNumber"] = index;
        item["keyName"] = $(this).children('.mskey').find("option:selected").val();
        item["msscenarioMode"] = $(this).next().children().is(":checked")?1:0;
        jsrsuElectronicDoorplateno.push(item);
    });

    //客房密码设置(天猫精灵密码)
    var jsrsuTmPassword = $('#msjsrsuTmPassword').val();
    jsrsuTmPassword = jsrsuTmPassword==''?"fzz123":jsrsuTmPassword;

    $.ajax({
        url:"../updateSetUp.action",
        type:"post",
        data:{
            jsrsuId : 1,
            jsrsuCheckInTime : jsrsuCheckInTime,
            jsrsuCheckOutTime : jsrsuCheckOutTime,
            jsrsuWxgzhTitle : jsrsuWxgzhTitle,
            jsrsuState:jsrsuState,
            jsrsuAdImgs:jsrsuAdImgs,
            jsrsuRoomType:jsrsuRoomType,
            jsrsuTelphone:jsrsuTelphone,
            jsrsuTradingRules:jsrsuTradingRules,
            jsrsuServiceCharge:serviceData,
            jsrsuHourRoom:jsrsuHourRoom,
            jsrsuDepositRules:jsrsuDepositRules,
            jsrsuRoomChargePercent:onlineDepositPrcent,
            jsrsuRefundRoomCharge:jsrsuRefundRoomCharge,
            jsrsuRefundRoomChargeTime:jsrsuRefundRoomChargeTime,
            jsrsuGrogshopIntroduce:jsrsuGrogshopIntroduce,
            jsrsuLongestBookingDays:jsrsuLongestBookingDays,
            jsrsuFutureBookingDays:jsrsuFutureBookingDays,
            jsrsuDepositSetType:JSON.stringify(depositSetType),
            jsrsuElectronicDoorplateno:JSON.stringify(jsrsuElectronicDoorplateno)
        },
        success:function(result){
            if(result.code == 1){
                myTips("成功","success");
                $("#msroomConfiguration").dialog('close');
                getSetUpInfo();
                //			ergodicInputItem(info.cgsuCommunity,'jsrsuRoomType');
            }else{
                myTips("修改失败","error");
            }
        }
    })
}
//添加房型字段
function msaddInput(id){
    var num = $('#msjsrsuRoomType .jsrsu').length+1;
    var html = '<div class="jsrsu" style="margin: 10px 0 0 0px"><input id="msconfigurationInfo'+num+'" type="hidden">房型: <input class="jsrsuRoomTypeItem" style="width:100px;margin-right:20px" />'
        +'<img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -7px 0" /></div>';

    $("#" + id).append(html);
}
//删除房型字段
$("#msjsrsuRoomType,#msaddress").delegate(".cleanItem","click",function(){
    $(this).parent().remove();
})

//type==0 开始时间  type==1结束时间
function mscalendar(type,num){
    $("#msaddPlanDiv .setRoomTypePlan").each(function (index){
        if(num==index){
            var beginTimeId = "jsrsuBeginTime"+num;
            var endTimeId = "jsrsuEndTime"+num;
            if(type==0){
                WdatePicker({minDate:'%y-%M-01',maxDate:"#F{$dp.$D(\'"+endTimeId+"\',{d:-1});}",dateFmt:"yyyy-MM-dd",autoPickDate:true});
            }
            if(type==1){
                WdatePicker({minDate:"#F{$dp.$D(\'"+beginTimeId+"\',{d:0});}",maxDate:"%y-%M-%ld",dateFmt:"yyyy-MM-dd",autoPickDate:true});
            }
        }
    });
}

/***********************************************************短租广告图片上传start****************************************************************/
//电脑上传
function msuploadPic(){
    $('#uploadDlg input[clear=true]').val('');
    var att = randomn(9);
    $("#msjsrsuId").val(1);

    $('#uploadDlg').dialog({
        title : '上传',
        top : getTop(464),
        left : getLeft(600),
        width : 600,
        height : 464,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            closeUploader();
            $('#msqrcode').empty();
            msrefresh();
        }
    });
    mscreatQr();
    $.post("../pubupload/getUpTokenCallback.action",function(data){
        var token = data.split("#####")[0];
        var co = data.split("#####")[1];

        $("#token").val(token);
        $("#co").val(co);

        initUploader();
        msdoCancel();
        $('#uploadDlg').dialog('open');
    });
}

//手机上传
function mscreatQr(){
    $.post("../pubupload/getMobUploadUrl.action",{
        jsrsuId : $("#msjsrsuId").val()
    },function(data){
        $('#msqrcode').qrcode({
            width:120,
            height:120,
            text:data
        });
        msdoCancel();
    });
}

//查看图片
function mscheckPic(type) {
    if(type==0){
        $('#msjsrsu_room_type').val("");
    }else{
        $('#msjsrsuRoomType .jsrsu').each(function(index){
            if(type == (index+1)){
                $('#msjsrsu_room_type').val($(this).children('.jsrsuRoomTypeItem').val());
            }
        })
    }

    msdoCancel();
    msshowPic();
}
//删除图片
function msremovePic(){
    var photos = $('.contFile');
    if(photos.length == 0){
        $.messager.alert('消息','没有图片可以删除',"error");
    }else{
        $('#msremovePicture').html('请选择要删除的图片').show();
        $('.picturecheck').show();
        $('#msdoRemovePic').show();
    }
}
//执行删除图片
function msdoRemovePic(){
    var arr = 0;
    var path = '';
    var chk = $('.picturecheck');
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            arr++;
        }
    }
    if(arr > 0){
        $("#msimgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
            path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
            $(this).parent("div").remove();  // 删除包含当前图片的那个div
        });
        $("#msimgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
            path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
            $(this).parent("div").remove();  // 删除包含当前图片的那个div
        });
        path = path.substring(0,path.length-1);//去掉最后一个逗号
        $.post("../deleteShortRentAdImg.action",{
            jsrsuId : 1,
            jsrsuAdImgs : path
        }, function(data) {
            if (data.code < 0) {
                myTips(data.msg, 'error');
                return;
            } else {
                myTips('删除成功！', 'success');
                msshowPic();
            }
        });
        msdoCancel();
    }else{
        $.messager.alert('消息','未选中任何图片',"error");
    }
}
//取消删除图片
function msdoCancel(){
    $('#msremovePicture').hide();
    $('.picturecheck').hide().removeAttr('checked');
    $('#msdoRemovePic').hide();
}
function msshowPic(){
    $('#msadImgDlg').dialog({
        title : '查看图片',
        top : getTop(500),
        left : getLeft(720),
        width : 720,
        height : 550,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#msimgWrapper").empty();
        },
    });
    $("#msimgWrapper").empty();
    $.post("../getSetUpInfo.action",{
        jsrsuId:1
    }, function(data) {
        if(data.code < 0){
            $("#msimgWrapper").append("<p>" + data.msg + "</p>");
            return;
        }
        data=JSON.parse(data.body);
        var path = data[0].jsrsuAdImgs;
        $('#msadImgDlg').dialog('open');
        if (path == null) {
            return;
        }
        var img = eval('([' + path + '])');
        var imgNum = 0;
        var fileNum = 0;
        for(var i in img){
            var strs = img[i].path.split(".");
            var ext = strs[strs.length-1];
            if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
                if(fileNum == 0){
                    $('#msimgWrapper').append('<ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
                }
                $('#msimgWrapper .fileList').append('<li>' +
                    '<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
                    '<a href="'+img[i].path+'" class="contFile" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
                    '</li>');
                fileNum++;

            }
        }
        for(var i in img){
            var strs = img[i].path.split(".");
            var ext = strs[strs.length-1];
            var j = parseInt(i) + parseInt(img.length);
            if(ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png"){
                if(imgNum == 0){
                    $('#msimgWrapper').append('<ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
                }
                $('#msimgWrapper .imageList').append('<li style="float:left;position:relative;">' +
                    '<img title="'+img[i].name+'" class="adImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
                    '<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
                    '<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
                    '</li>');
                imgNum++;
            }
        }
        $(".adImg").colorbox({
            rel:'adImg',
            transition:"none",
            width:"60%",
            height:"90%"
        });
    });
}
//刷新
function msrefresh(){
    msdoCancel();
    msshowPic();
}
/***********************************************************短租广告图片上传end****************************************************************/

//账户类型和账号联动
function mschangeWay(evet) {
    var fa = $(evet).parent().parent();
    var faPaymentType = fa.find(".accountType1").find("option:selected").text();

    fa.find(".accountName").empty();
    fa.find(".accountName").append("<option></option>");
    fa.find(".accountId").val("");
    fa.find(".accountNum").val("");
    fa.find(".accountBelong").val("");
    if(faPaymentType == ""){
        return;
    }
    $.post("../selectNamePublic.action", {
        faPaymentType:faPaymentType,
    }, function(data) {
        fa.find(".accountName").empty();
        fa.find(".accountName").append("<option></option>");
        for (var i in data.body) {
            fa.find(".accountName").append("<option value='" +  data.body[i].faId+"*#*"+  data.body[i].faBelonging +"*#*"+ data.body[i].faAccount + "'>" + data.body[i].faUserName + "</option>");
        }
    });
}
function msgetAccountId(evet) {
    var fa = $(evet).parent().parent();
    var data = fa.find(".accountName").val();
    if(data == ''){
        fa.find(".accountId").val("");
        fa.find(".accountBelong").val("");
        fa.find(".accountNum").val("");
    }else{
        fa.find(".accountId").val(data.split("*#*")[0])
        fa.find(".accountBelong").val(data.split("*#*")[1])
        fa.find(".accountNum").val(data.split("*#*")[2])
    }
}

function msupdateShopSetUp(){
    var jsrsuShopAccount = $("#msjsrsuShopAccount").find(".accountId").val();
    var jsrsuCashAccount = $("#msjsrsuCashAccount").find(".accountId").val();
    $.ajax({
        type:"post",
        url:"../updateSetUp.action",
        data:{
            jsrsuId : 1,
            jsrsuShopAccount:jsrsuShopAccount,
            jsrsuCashAccount:jsrsuCashAccount
        },
        dataType:"json",
        success:function(data){
            if(data.code == 1){
                myTips("修改成功","success");
            }else{
                myTips("修改失败","error");
            }
        }
    });
}

//押金支付方式
function msdepositPayType(type){
    $(":checkbox").click(function(){
        var flag = $(this).is(':checked');
        if (flag) {
            $(this).siblings("input").attr("checked", false);
        }
    });
    if(type == 0){
        $('#msonlineDepositPrcent').val('100');
        $('#msonlineDepositPrcent').attr("readOnly","true");
    }else{
        $('#msonlineDepositPrcent').attr("readOnly",false);
    }
}

//押金设置规则
function msdepositSetType(){
    $(":checkbox").click(function(){
        var flag = $(this).is(':checked');
        if (flag) {
            $('#msdepositMoney').attr("readOnly",false);
        }else{
            $('#msdepositMoney').attr("readOnly","true");
        }
    });
}

function mscheckKeyName(type){
    $('.mselectronicDoorplateno').each(function(index){
        if(type == index){
            var keyName = $("#mskey"+index).find("option:selected").val();
            var e = $("#mskey"+index).parent().next();
            if(keyName == "已入住"){
                e.show();
            }else{
                e.children().attr("checked",false);
                e.hide();
            }
            return false;
        }
    })
}
/**
 * 获取输入时间 前 day 天 或者 后 day 天
 * 格式为yyyy-MM-dd hh:mm:ss
 */
function msgetNextDate(time,day){
    var date = new Date(time).getTime() + day * 1000 * 60 * 60 * 24;
    var newDate = new Date(date).format("yyyy-MM-dd");
    return newDate;
}
