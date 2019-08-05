
$(function () {
    $("#unRelatedDeviceDg").datagrid({
        onClickRow : function(rowIndex, rowData){
            queryUserlated2(rowData);
        }
    });
    $("#existingRelationDeviceDg").datagrid({

    });
    $("#unRelatedRoomDg").datagrid({

    });
    $("#existingRelationRoomDg").datagrid({

    });

})

//关联用户
function officeAssociatedUsers(type){

    $('#officeAssociatedUsersDig').dialog({
        title 	: '关联用户',
        top		: getTop(305),
        left	: getLeft(1500),
        width	: 1150,
        height	: 500,
        closed	: true,
        cache	: false,
        modal	: true,
        onClose	: function(){
            //2019-7-4 16：04：40 吴冬加
            $('#userName').val('');
            $("#unRelatedRoomDg").datagrid("loadData", []);
            $("#unRelatedDeviceDg").datagrid("loadData", []);
            $("#existingRelationDeviceDg").datagrid("loadData", []);
            $("#existingRelationRoomDg").datagrid("loadData", []);
        }
    });

    $('#officeAssociatedUsersDig').dialog('open');
    queryUserlated(1,type);
}
//查询左边数过来第一个框和第三个框
function queryUserlated(pate,type) {
    console.log(type)
    var departmentName = $("#departmentName").val();
    var userName = $("#userName").val();
    var installationAddress = $("#installationAddress").val();
    var suState="正常";
    if(type==1){
    var hsAddCity="教室"
    }else if(type==2){
        var hsAddCity="办公室"
    }else if(type==3){
        var hsAddCity="公区"
    }else{
        var hsAddCity=""
    }

    $.post("../selectNoRelationdevice.action", {//查询设备安装信息
        hsAddCommunity: installationAddress,
        hsAddCity:hsAddCity,
    }, function (data) {
        if (data.code > 0 && data.body != null) {
            data=data.body;
            $("#unRelatedDeviceDg").datagrid("loadData",data);
        } else {
            $('#unRelatedRoomDg').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        }
    });
    $.post("../selectUserPicDig.action", {//查询部门信息
        departmentName: departmentName,
        suStaffName: userName,
        suState:suState,
    }, function (data) {
        if (data.code > 0 && data.body != null) {
            data = data.body;
            console.log(data)
            $("#unRelatedRoomDg").datagrid("loadData", data);
        } else {
            sourcePage(0, 0, 0);
            $('#unRelatedRoomDg').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        }
    });
}
//查询已关联用户
function queryUserlated2(data) {
    var departmentName = $("#departmentName").val()
    var userName = $("#suStaffName").val()
    $.post("../selectRelatedUser.action", {
        judDeviceId: data.id,
    }, function (data) {
        if (data.code > 0 && data.body) {
            data=data.body
            $("#existingRelationRoomDg").datagrid("loadData", data);
        } else {
            $('#existingRelationRoomDg').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        }
    });
}
//设备 更新关联(左右移动)
function updateDeviceRelation(type){
    if(type==0){//添加关联
        var rows =$("#unRelatedDeviceDg").datagrid('getChecked');
        if(rows==0){
            myTips("请选择要关联的房","error");
            return;
        }
        var relatedRrows = $('#existingRelationDeviceDg').datagrid("getRows");
        for (var i in relatedRrows){
            for(var j in rows){
                if(relatedRrows[i].id == rows[j].id){
                    $.messager.alert('Warning',rows[j].devType+"(类型) "+rows[j].devNickname+"设备 "+"已关联，请勿重复关联！");
                    return;
                }
            }
        }
        for(var i in rows){
            $("#existingRelationDeviceDg").datagrid('appendRow',rows[i]);
            var index = $("#unRelatedDeviceDg").datagrid("getRowIndex",rows[i]);
            $("#unRelatedDeviceDg").datagrid('deleteRow',index);
        }
        $("#unRelatedDeviceDg").datagrid('clearChecked');

    }
    if(type==1){//移除关联
        var row = $("#existingRelationDeviceDg").datagrid("getChecked");
        if(row.length == 0){
            myTips("请选择要取消关联的设备","error");
            return;
        }
        for(var i in row){
            var index = $("#existingRelationDeviceDg").datagrid("getRowIndex",row[i]);
            $("#existingRelationDeviceDg").datagrid('deleteRow',index);
            if(row[i].judId==''||row[i].judId==null){
                $("#unRelatedDeviceDg").datagrid('appendRow',row[i]);
            }
        }
        $("#existingRelationDeviceDg").datagrid('clearChecked');
    }
}
//用户更新关联(左右移动)
function updateHsRelation(type){
    if(type==0){//添加关联
        var rows =$("#unRelatedRoomDg").datagrid('getChecked');
        if(rows==0){
            myTips("请选择要关联的用户","error");
            return;
        }
        var relatedRrows = $('#existingRelationRoomDg').datagrid("getRows");
        for (var i in relatedRrows){
            for(var j in rows){
                if(relatedRrows[i].userId == rows[j].userId){
                    $.messager.alert('Warning',rows[j].departmentName+rows[j].suBankCardNum+"用户 "+"已关联，请勿重复关联！");
                    return;
                }
            }
        }
        var addRelation=[];//计数器
        for(var i in rows){
            $("#existingRelationRoomDg").datagrid('appendRow',rows[i]);
            var index = $("#unRelatedRoomDg").datagrid("getRowIndex",rows[i]);
            $("#unRelatedRoomDg").datagrid('deleteRow',index);
        }
        $("#unRelatedRoomDg").datagrid('clearChecked');
    }
    if(type==1){//移除关联
        var row = $("#existingRelationRoomDg").datagrid("getChecked");
        if(row.length == 0){
            myTips("请选择要取消关联的房","error");
            return;
        }
        for(var i in row){
            var index = $("#existingRelationRoomDg").datagrid("getRowIndex",row[i]);
            $("#existingRelationRoomDg").datagrid('deleteRow',index);
            if(row[i].judId==''||row[i].judId==null){

                $("#unRelatedRoomDg").datagrid('appendRow',row[i]);
            }
        }
        $("#existingRelationRoomDg").datagrid('clearChecked');
    }
}
//更新关联用户
function updateRelations(){
    var hsRows = $('#existingRelationRoomDg').datagrid('getRows');
    var dvRows = $('#existingRelationDeviceDg').datagrid('getRows')
    var devRows=$('#unRelatedDeviceDg').datagrid('getSelected');
    var data = [];
    var jsonArray = [];
    console.log("hsRows.length"+hsRows.length);
    if (hsRows.length == 0) {
        jsonArray.push({
            judId 	: hsRows.judId,
            judDeviceId : dvRows.id,
            judUserId 		: 0
        });
    }else{	for(var i in dvRows){
        for (var j in hsRows) {
            console.log(hsRows[j].userId);
            jsonArray.push({
                judDeviceId		: dvRows[i].id,
                judUserId		: hsRows[j].userId
            });
        }
    }
    }
    var splitJson = JSON.stringify(jsonArray);

    $.post("../updateUserDevice.action", {jhoIdJson : splitJson}, function(data) {

        if(data.code<0){
            myTips(data.msg,"error");
            return;
        }else{
            myTips(data.msg,"success");
        }
    });
}