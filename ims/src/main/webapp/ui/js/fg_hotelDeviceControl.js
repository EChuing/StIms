$(function () {
    $("#deviceDataGrid").datagrid({})
    $("#tt").panel({
        title:"智能设备控制面板",
    });
    $("#tt").tabs({
        tabPosition:'left',
        tabWidth:70,
        headerWidth:70,
        border:true,
    });
    queryHotelDevice(6);
})

//公区设备列表
function queryHotelDevice(type){
    var community = $("#searchCommunity").val();
    var building = $("#searchBuilding").val();
    var doorplateno = $("#searchDoorplateno").val();
    var deviceType = null;
    if(type!=''){
        var community = "";
        var building = "";
        var doorplateno = "";
    }

    if (type == 6){
        deviceType = "全部灯";
    }else if (type == 10){
        deviceType = "空调";
    }else if (type == 12){
        deviceType = "窗帘";
    }

    $.post("../queryOfficeAreaDevice.action",{
        hsAddCommunity  :   community,
        hsAddBuilding   :   building,
        hsAddDoorplateno:   doorplateno,
        hsLeaseState    :   '短租房',
        deviceType      :   deviceType
    },function (data) {
        if(data.code < 0){
            $('#deviceDataGrid').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
            return;
        }
        data = data.body;
        for (var i in data){
            data[i].detailedAddress = data[i].hsAddCommunity+' '+data[i].hsAddBuilding+' '+data[i].hsAddDoorplateno;
            if(data[i].devId == 3){
                if(data[i].devAuthId.slice(0,6) == '035255'){
                    data.splice(i,1);
                    i--;
                    continue;
                }
            }
            $.post("../queryDeviceStatus.action",{
                devAuthId   :   data[i].devAuthId,
                devId       :   data[i].id
            },function (data2) {
                if(data2.code == 1){
                    data2 = data2.body;
                    var sn = data2[0].sn;
                    var online = data2[0].online ? '在线':'离线';
                    var status = data2[0].status;//状态码
                    var switchingState;
                    var switchingCode;
                    if(data2[0].type == 35){
                        switchingCode = parseInt(status, 16).toString(2).slice(15);
                        switchingState = switchingCode == 1? '开':'关';
                    }else if(data2[0].type == 16){
                        switchingState = status == 'E080' ? '开':'关';
                    }else if(data2[0].type == 3){
                        switchingState = status == 'C080' ? '开':'关';
                    }
                    for(var j in data){
                        if(data[j].devAuthId == sn){
                            data[j].devStatus = online;
                            data[j].devInformation = data2[0];
                            data[j].switchingState = switchingState;
                        }
                    }
                    $("#deviceDataGrid").datagrid("loadData",data);
                }else if(data2.code == -2){
                    myTips("系统异常","error");
                }
            })
        }
        $("#deviceDataGrid").datagrid("loadData",data);
    })
}
//设备控制窗口
function deviceControlDlg() {
    var row = $("#deviceDataGrid").datagrid("getChecked");
    if(row.length == 0) {
        myTips("请选择至少一个设备！", "error");
        return;
    }
    $("#deviceControlDlg").dialog({
        title : "控制设备",
        top : getTop(100),
        left : getLeft(300),
        width : 300,
        height : 100,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('.xwtable span').text('');
        }
    });
    $("#deviceControlDlg").dialog("open");
}
//设备控制
function deviceControl(type) {
    var row = $("#deviceDataGrid").datagrid("getChecked");
    console.log(row);
    var jsonData = [];
    for (var i in row) {
        jsonData.push({hsId : row[i].hsId});
    }
    console.log(jsonData)
    $.post("../selectHotel.action",{
        jsonArray    : JSON.stringify(jsonData)
    },function (data) {
        if(data.code < 0){
            myTips("系统异常","error");
        }
        var data = data.body;
        if(data > 0){
            $.messager.confirm('确认框','所选客房中有已住客房，要继续操作设备吗？',function(r){
                if (r){
                    for (var i in row){
                        var zz = {};
                        zz.sn = row[i].devAuthId;
                        zz.mac = row[i].devAuthSecret;
                        if(row[i].devStatus){
                            if(row[i].devStatus == '离线'){
                                continue;
                            }
                        }else {
                            continue;
                        }
                        if(row[i].devId == '10'){
                            var devInformation = row[i].devInformation;
                            zz.type = devInformation.type;
                            zz.code = parseInt((devInformation.status.slice(4,6)+devInformation.status.slice(2,4)), 16);//码组号
                            if(type == 0){
                                zz.isOn = true;//开
                                row[i].switchingState = '开';
                            }else{
                                zz.isOn = false;//关
                                row[i].switchingState = '关';
                            }
                            zz.temp = parseInt(devInformation.status.slice(8,10), 16) + 16;//温度
                            zz.mode = devInformation.status.slice(6,8);//模式
                            zz.speed = devInformation.status.slice(10,12);//风量（风速）
                            zz.codeType = 0;

                            $.post('http://www.fangzhizun.com/device/vanhi/AirControl', zz, function(data) {
                                if (data.code == 0 && data.body[0].resultCode == 0) {
                                    //alert(data.body[0].resultMsg);
                                } else {
                                    alert(data.body[0].resultMsg);
                                }
                            });
                        }else{
                            zz.isNeedCache = "false";
                            if(type == 0){//开
                                if(row[i].devId == '3'){
                                    zz.status = 8080;
                                }else if(row[i].devId == '35'){
                                    zz.status = 81;
                                }else if(row[i].devId == '16'){
                                    zz.status = 8080;
                                }
                                row[i].switchingState = '开';
                            }else if(type == 1){//关
                                if(row[i].devId == '3'){
                                    zz.status = 8000;
                                }else if(row[i].devId == '35'){
                                    zz.status = 80;
                                }else if(row[i].devId == '16'){
                                    zz.status = 4040;
                                }
                                row[i].switchingState = '关';
                            }
                            $.post('http://www.fangzhizun.com/device/vanhi/YHDeviceControlServlet', zz, function(data) {
                                console.log(data);
                                if (data.code == 0 && data.body[0].resultCode == 0) {
                                    //alert(data.body[0].resultMsg);
                                } else {
                                    alert(data.body[0].resultMsg);
                                }
                            });
                        }
                        var index = $("#deviceDataGrid").datagrid("getRowIndex",row[i]);
                        var rowData = {
                            index:index,
                            row:row[i]
                        }
                        $("#deviceDataGrid").datagrid("updateRow",rowData);
                    }
                }
            });
        }else{
            for (var i in row){
                var zz = {};
                zz.sn = row[i].devAuthId;
                zz.mac = row[i].devAuthSecret;
                if(row[i].devStatus){
                    if(row[i].devStatus == '离线'){
                        continue;
                    }
                }else {
                    continue;
                }
                if(row[i].devId == '10'){
                    var devInformation = row[i].devInformation;
                    zz.type = devInformation.type;
                    zz.code = parseInt((devInformation.status.slice(4,6)+devInformation.status.slice(2,4)), 16);//码组号
                    if(type == 0){
                        zz.isOn = true;//开
                        row[i].switchingState = '开';
                    }else{
                        zz.isOn = false;//关
                        row[i].switchingState = '关';
                    }
                    zz.temp = parseInt(devInformation.status.slice(8,10), 16) + 16;//温度
                    zz.mode = devInformation.status.slice(6,8);//模式
                    zz.speed = devInformation.status.slice(10,12);//风量（风速）
                    zz.codeType = 0;

                    $.post('http://www.fangzhizun.com/device/vanhi/AirControl', zz, function(data) {
                        if (data.code == 0 && data.body[0].resultCode == 0) {
                            //alert(data.body[0].resultMsg);
                        } else {
                            alert(data.body[0].resultMsg);
                        }
                    });
                }else{
                    zz.isNeedCache = "false";
                    if(type == 0){//开
                        if(row[i].devId == '3'){
                            zz.status = 8080;
                        }else if(row[i].devId == '35'){
                            zz.status = 81;
                        }else if(row[i].devId == '16'){
                            zz.status = 8080;
                        }
                        row[i].switchingState = '开';
                    }else if(type == 1){//关
                        if(row[i].devId == '3'){
                            zz.status = 8000;
                        }else if(row[i].devId == '35'){
                            zz.status = 80;
                        }else if(row[i].devId == '16'){
                            zz.status = 4040;
                        }
                        row[i].switchingState = '关';
                    }
                    $.post('http://www.fangzhizun.com/device/vanhi/YHDeviceControlServlet', zz, function(data) {
                        console.log(data)
                        if (data.code == 0 && data.body[0].resultCode == 0) {
                            //alert(data.body[0].resultMsg);
                        } else {
                            alert(data.body[0].resultMsg);
                        }
                    });
                }
                var index = $("#deviceDataGrid").datagrid("getRowIndex",row[i]);
                var rowData = {
                    index:index,
                    row:row[i]
                }
                $("#deviceDataGrid").datagrid("updateRow",rowData);
            }
        }

    });
}

//控制按钮
$(".buttonCls").dblclick(function () {
    var row = $("#deviceDataGrid").datagrid("getChecked");
    if (row.length<=0){
        myTips("请勾选房间","error");
        return ;
    }
    $(".chooseCls").removeClass("chooseCls");
    $(this).addClass("chooseCls");
    var type=$(this).attr('ctlType');
    deviceControl(type);
});

//根据控制类型查询
$(function () {
    $("#tt").tabs({
        onSelect:function (title,index) {
            $(".chooseCls").removeClass("chooseCls");
            if (index==0){//灯光控制
                queryHotelDevice(6);
            } else if (index==1){//空调控制
                queryHotelDevice(10);
            } else if (index==2){//窗帘控制
                queryHotelDevice(12);
            }
        }
    });
})