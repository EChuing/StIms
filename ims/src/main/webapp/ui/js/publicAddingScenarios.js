//弹出批量设置情景指令窗口
function openSceneWindow(type) {
    gotoStep('addScenWindow', 1);	//显示第一步的界面
    $("#addScenWindowDlg").dialog({
        title : '情景设置',
        top : getTop(460),
        left : getLeft(900),
        width : 900,
        height : 630,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            editIndex = undefined;
        }
    });
    $('#choseRoomsTable').datagrid({//未租设备信息
    });
    $("#addScenWindowDlg").dialog('open');
    sceneMode();			//查询情景模式名称信息
    queryRoom(1,type);//查询未租房间信息
}
//查询情景模式名称信息
function sceneMode() {
    $.post("../querySceneMode.action", {
    }, function(data) {
        if (data.code < 0){
        } else {
            data=data.body;
            var html ="";
            for(var i in data){
                html +='<option id="'+data[i].spdId+'" value="'+data[i].spdId+'" data-id="'+data[i].spdNumber+'">'+data[i].spdDescribe+'</option>';
            }
            $('#selectSituationalType1').html(html);//情景设置:情景类型
        }
    });
}
// //查询设备安装地址信息
// function queryInstallRoom(type) {
//
//     var addCity='';
//     var houseEntrust4sell='';
//     var keyAdministrator='';
//     houseEntrust4sell=$('#houseEntrust4sell').val();
//     keyAdministrator=$('#deviceInstallationAddress').val();
//     if (type==1){
//         addCity='教室';
//     }else if(type==2){
//         addCity='办公室';
//     }else if (type==3){
//         addCity='公区';
//     }
//     $.post("../queryOffice.action", {
//         startNum : 0,
//         endNum : 20,
//         keyAdministrator :keyAdministrator,//公区名称
//         addDoorplateno : '',//备注描述
//         keyNumber : '',//联系人
//         houseEntrust4sell:houseEntrust4sell,//公区状态
//         addCity:addCity,
//     },function(data) {
//         if (data.code<0) {
//             $('#choseRoomsTable').datagrid({
//                 data : [],
//                 view : myview,
//                 emptyMsg : data.msg
//             });
//         } else {
//             $("#choseRoomsTable").datagrid("loadData", data.body);
//         }
//     }, "json");
// }

//查询未租房间信息
function queryRoom(page,type) {
    var hsAddCity='';
    if (type==1){
        hsAddCity='教室';
    }else if(type==2){
        hsAddCity='办公室';
    }else if (type==3){
        hsAddCity='公区';
    }
    var startNum = (parseInt(page) - 1) * 15;
    var onePageNums = 15;
    var qhAddDistrict = $('#searchAddDistrict').find('option:selected').text();
    var qhAddZone = $('#searchAddZone').find('option:selected').text();
    var qhAddCommunity = $('#searchAddCommunity').val();
    var qhAddBuilding = $('#searchAddBuilding').val();
    var qhAddDoorplateno = $('#searchAddDoorplateno').val();
    var leaseType = $('#addPanelWindowDlg').is(':hidden')?$('#leaseType').val():$('#addPanelLeaseType').val();
    var devAddress = $('#addPanelWindowDlg').is(':hidden')?$('#devAddress').val():$('#addPanelDevAddress').val();
    $.post("../queryRooms.action", {
        startNum : startNum,
        endNum : onePageNums,
        splitFlag : 1,
        hsLeaseState:"已租",
        hsAddCity : hsAddCity,
        hsAddDistrict : qhAddDistrict,
        hsAddZone : qhAddZone,
        hsAddCommunity : qhAddCommunity,
        hsAddBuilding : qhAddBuilding,
        hsAddDoorplateno : qhAddDoorplateno,
        leaseType : leaseType,
        address:devAddress
    }, function(data) {
        if (data.code < 0){
            $('#choseRoomsTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: '没有查询到符合记录的条件'
            });
        }
        else {
            data=data.body;
            if(data.length<onePageNums){
                notCountPage(page, 2 , "queryRoom","choseRoomsTable");
            }else{
                notCountPage(page, 1 , "queryRoom","choseRoomsTable");
            }
            for(var i in data){
                data[i].hsLeaseType = data[i].hsLeaseType == 4?"注销":"正常";
                var hsAddCommunity = data[i].hsAddCommunity==null?"":data[i].hsAddCommunity;
                var hsAddBuilding = data[i].hsAddBuilding==null?"":data[i].hsAddBuilding;
                var hsAddDoorplateno = data[i].hsAddDoorplateno==null?"":data[i].hsAddDoorplateno;
                data[i].address = hsAddCommunity+" "+hsAddBuilding+" "+hsAddDoorplateno;
            }
            $("#choseRoomsTable").datagrid("loadData",data);
        }
    });
}

//批量设置情景指令下一步
function nextStep(){
    var rows = $('#choseRoomsTable').datagrid('getChecked');
    if(rows.length == 0){
        myTips('请选择需要设置的地址');
        return;
    }
    var switchingState = [{value:'关'},{value:'开'}];
    gotoStep('addScenWindow', 2);
    $('#choseDeviceTable').datagrid({
        columns : [ [
            {
                field : 'ck',
                checkbox : true,
                width : '4%',
            },
            {
                field : 'idftName',
                title : '一级名称',
                width : '273',
                align : 'center',
            },
            {
                field : 'idstName',
                title : '二级名称',
                width : '32%',
                align : 'center',
            },
            {
                field : 'switchingState',
                title : '开关状态',
                width : '32%',
                align : 'center',
                formatter:function(value){
                    for(var i=0; i<switchingState.length; i++){
                        if (switchingState[i].planId == value) return switchingState[i].value;
                    }
                    return value;
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'value',
                        textField:'value',
                        data:switchingState,
                        editable:false,
                    }
                }
            },
        ]],
        singleSelect : true,
        autoRowHeight : false,
        scrollbarSize : 0,
        showPageList : false,
        fitColumns : true,
        selectOnCheck : false,
        checkOnSelect : false,
        onClickRow  : function(rowIndex, rowData) {
            onClickRow(rowIndex,"choseDeviceTable");
        },
        onDblClickRow : function(rowIndex, rowData) {
            updateDeviceInfo(rowIndex,rowData);
        }
    });
    queryDeviceMenu(rows,1);
}
//批量设置情景指令编辑一行触发
function onClickRow(index,id) {
    if (editIndex != index){
        if (endEditing(id)) {
            $('#'+id).datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#'+id).datagrid('selectRow', editIndex);
        }
    }
}
var editIndex = undefined;
function endEditing(id) {
    if (editIndex == undefined) {
        return true;
    }
    if ($('#'+id).datagrid('validateRow', editIndex)) {
        $('#'+id).datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
//设置空调、调节灯、冷暖灯具体参数
function updateDeviceInfo(index,data){
    var htmls = "";
    var width = 0,height = 0;
    console.log(data.devFirstType +"   "+ data.devSecondType)
    if(data.devFirstType == 4 && data.devSecondType == 4){	//空调
        htmls = '<div style="margin-left:10px;float:left"> 温度 : <input id="temperature" onkeyup="searchOnkeyup(this.id, \'_indexNum[0] = 0;checkNumber(0)\')" placeholder="请输入16-32的整数" clear="clear"/> </div> <div style="margin-left:10px;float:left"> 模式 :' +
            ' <select id="pattern"> <option value="00">自动</option> <option value="01">制冷</option> <option value="03">制热</option> <option value="04">除湿</option> <option value="05">送风</option> </select> </div> <div style="margin:10px 0 0 10px;float:left"> 风速 : <select id="windSpeed"<> <option value="00">自动</option> ' +
            ' <option value="03">高</option> <option value="02">中</option> <option value="01">低</option> </select> </div> '/*<div style="margin:10px 0 0 10px;float:left"> 扫风 : <select clear="clear"> <option>自动</option> <option>手动</option> </select> </div>*/
        width = 318; height = 140;
    }else if(data.devFirstType == 23 && data.devSecondType == 31){	//冷暖灯
        htmls = '<div style="margin-left:10px;float:left"> 亮度 : <input id="brightness" type="number" style="width:110px" onkeyup="searchOnkeyup(this.id, \'_indexNum[0] = 0;checkNumber(1)\')" placeholder="请输入1-100的整数" clear="clear"/> </div> ' +
            '<div style="margin:10px 0 0 10px;float:left"> 色温 : <input id="colorTemperature" type="number" style="width:110px" onkeyup="searchOnkeyup(this.id, \'_indexNum[0] = 0;checkNumber(2)\')" placeholder="请输入1-100的整数" clear="clear"/> ' +
            '</div>'
        width = 188; height = 140;
    }else if(data.devFirstType == 23 && data.devSecondType == 36){	//调节灯
        htmls = '<div style="margin-left:10px;float:left"> 亮度 : <input id="brightness1" type="number" style="width:110px" ' +
            'onkeyup="searchOnkeyup(this.id, \'_indexNum[0] = 0;checkNumber(3)\')" placeholder="请输入1-100的整数" clear="clear"/> </div>'
        width = 188; height = 120;
    }

    $('#DeviceDetailedInfoDiv').html(htmls);
    $('#saveButton').attr('onclick','saveDetailedInfo('+index+')');

    $("#updateDeviceDlg").dialog({
        title : data.idstName+'指令设置',
        top : getTop(height),
        left : getLeft(width),
        width : width,
        height : height,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
        }
    });

    if((data.devFirstType == 4 && data.devSecondType == 4) || (data.devFirstType == 23 && data.devSecondType == 31)
        || (data.devFirstType == 23 && data.devSecondType == 36)){
        $('#updateDeviceDlg').dialog('open');
    }else{
        myTips("该设备无需详细设置");
        return;
    }
}
function saveDetailedInfo(index){
    var rows = $('#choseDeviceTable').datagrid("getRows");
    console.log(rows)
    var row = rows[index];
    var obj = {
        temperature:"",
        pattern:"",
        windSpeed:"",
        brightness:"",
        colorTemperature:"",
    };

    if (row.devFirstType==4 && row.devSecondType==4){
        obj.temperature =($('#temperature').val());
        obj.pattern=($('#pattern').val());
        obj.windSpeed=($('#windSpeed').val());
    }
    if (row.devFirstType==23){
        var brightness="";
        if (row.devSecondType==31){
            brightness=$('#brightness').val();
            var colorTemperature = $("#colorTemperature").val();//调节色温

            // brightness = parseInt(brightness / 6.6);
            // brightness="0"+parseInt(brightness).toString(16);//冷暖灯亮度

            // colorTemperature = parseInt(colorTemperature * 1.27);
            // if (colorTemperature<16){
            // 	colorTemperature="0"+parseInt(colorTemperature).toString(16);
            // }else{
            // 	colorTemperature=parseInt(colorTemperature).toString(16);
            // }

            obj.brightness =(brightness);
            obj.colorTemperature=(colorTemperature);
        }
        if (row.devSecondType==36){
            brightness=$('#brightness1').val();
            // brightness = parseInt(brightness / 6.6);
            // brightness="0"+parseInt(brightness).toString(16);//冷暖灯亮度
            obj.brightness =(brightness);
        }
    }

    $('#choseDeviceTable').datagrid('updateRow', {
        index: index,
        row: {
            'instructions': obj
        }
    });
    $('#updateDeviceDlg').dialog('close');
}

//检查input框是否符合范围要求
function checkNumber(type){
    var number = '';
    var text = '';
    var minNumber = 0,maxNumber = 0;
    if(type == 0){ //空调温度
        number = $("#temperature").val();
        minNumber = 16;	maxNumber = 32;
        text = '请输入大于16 ，小于32的整数';
    }else{
        minNumber = 1;	maxNumber = 100;
        text = '请输入大于1 ，小于100的整数';
    }
    if(type == 1){ //冷暖灯亮度
        number = $("#brightness").val();
    }
    if(type == 2){ //冷暖灯色温
        number = $("#colorTemperature").val();
    }
    if(type == 3){ //调节灯亮度
        number = $("#brightness1").val();
    }

    var regexp = /^\d*$/
    if(regexp.test(number)){
        if(number > maxNumber || number < minNumber){
            myTips(text);
            $('#updateDeviceDlg [clear="clear"]').val('');
            return;
        }
    }else{
        myTips(text);
        $('#updateDeviceDlg [clear="clear"]').val('');
        return;
    }
}

//设备全开、全关 type 0=关 1=开
function equipmentSwitch(type) {
    var rows = $('#choseDeviceTable').datagrid('getRows')
    var switchingState = type==1?'开':'关';
    for (i = 0; i < rows.length; i++) {
        var index = $('#choseDeviceTable').datagrid('getRowIndex', rows[i]);
        console.log(index);
        $('#choseDeviceTable').datagrid('updateRow', {
            index: index,
            row: {
                'switchingState': switchingState
            }
        });
    }
}
//保存情景指令信息
function addScene() {
    $('#choseDeviceTable').datagrid('endEdit', editIndex);//结束下拉编辑状态
    var rowHouser = $("#choseRoomsTable").datagrid("getChecked");//房源信息
    var rowDevice = $("#choseDeviceTable").datagrid("getChecked");//设备信息
    var jsroPatternId=$("#selectSituationalType1").val();//情景模式名称ID
    var deviceList=[];
    var hsList=[];

    if (rowDevice.length==0){//判断是否选择设备，无选择，返回提示
        myTips("请选择需要设置的设备","error");
        return;
    }
    for (var i in rowHouser){//获取未租房间ID,并且放进一个数组
        var hsId=rowHouser[i].hsId;
        hsList.push(hsId);
    }

    for (var j in rowDevice){
        var instructions="";
        if (rowDevice[j].instructions!=undefined){
            instructions=rowDevice[j].instructions;
        }
        var devObj={
            idftId:rowDevice[j].idftId,
            idstId:rowDevice[j].idstId,
            state:rowDevice[j].switchingState,//设备开关状态
            instructions:instructions
        }
        deviceList.push(devObj);
    }
    showLoading();
    $.post("../insertScene.action", {
        hsIdList:JSON.stringify(hsList),
        jsroImsState:JSON.stringify(deviceList),
        jsroPatternId:jsroPatternId
    }, function(data) {
        hideLoading();
        if (data.code ==1){
            $('#addScenWindowDlg').dialog('close');
            querySituationalPatterns(1);
            myTips(data.msg,"success");
        }else{
            myTips(data.msg,"error");
        }
    });
}