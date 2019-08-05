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
	$('#tt  .tabs-scroller-left').hide()
	$('#tt  .tabs-scroller-right').hide()
	$('#tt  .tabs-wrap').css('margin-left','0')
	$('#tt  .tabs-wrap').css('margin-right','0')
    $("#unRelatedDeviceDg").datagrid({
    	onClickRow : function(rowIndex, rowData){
    		console.log("已关联用户信息");
    		console.log(rowData);
    		queryUserlated2(rowData);
    	}
    });
    queryOfficeAreaDevice(1);
    $("#searchVirtualName").attr("onkeyup","queryOfficeAreaDevice(1)")
})

//公区设备列表
function queryOfficeAreaDevice(type){
	// console.log(type)
    var hsAddCity = '公区';
    var virtualName = $("#searchVirtualName").val();
	var deviceType = null;
    // console.log(virtualName)
    if(type!=''){
        var community = "";
        var building = "";
        var doorplateno = "";
    }
console.log(type)
	if (type == 1){
		deviceType = "全部灯";
	}else if (type == 2){
		deviceType = "插座";
	}else if (type == 3){
		deviceType = "调节灯";
	}else if (type == 4){
		deviceType = "空调";
	}else if (type == 6){
		deviceType = "窗帘";
	}

    $.post("../queryOfficeAreaDevice.action",{
        hsAddCity       :   hsAddCity,
        hsAddCommunity  :   virtualName,
		type			:	'公区',
		deviceType      :   deviceType,
		hsState			: 	"注销"

    },function (data) {
    	// console.log(data);
        if(data.code < 0){
            // console.log("55555555");
            $('#deviceDataGrid').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
            return;
		}
			data = data.body;
			for (var i in data) {
				data[i].detailedAddress = data[i].hsAddCommunity + ' ' + data[i].hsAddBuilding + ' ' + data[i].hsAddDoorplateno;
				if (data[i].devId == 3) {
					if (data[i].devAuthId.slice(0, 6) == '035255') {
						data.splice(i, 1);
						i--;
						continue;
					}
				}
				$.post("../queryDeviceStatus.action", {
					devAuthId: data[i].devAuthId,
					devId: data[i].id
				}, function (data2) {
					if (data2.code == 1) {
						data2 = data2.body;
						// console.log(data2);
						var sn = data2[0].sn;
						var online = data2[0].online ? '在线' : '离线';
						var status = data2[0].status;//状态码
						var switchingState;
						var switchingCode;
						if (data2[0].type == 35) {//插座
							// switchingCode = parseInt(status, 16).toString(2).slice(15)
							switchingCode=parseInt(status.slice(8,12), 16).toString(2);
							if (switchingCode.length<16){
								switchingCode="00"+switchingCode;
							}
							switchingCode=switchingCode.slice(0,1);
							switchingState = switchingCode == 1 ? '通电' : '断电';
                            switchingState="："+ switchingState;
						}else if ( data2[0].type ==1) {//插座
                            switchingState =status == '8080' ? '通电' : '断电';
                            switchingState="："+ switchingState;
                        }else if (data2[0].type == 16) {//窗帘
							switchingState = status == 'E080' ? '已开' : '已关';
                            switchingState="："+ switchingState;
						}else if ( data2[0].type ==30) {//百分比窗帘
                            switchingCode = status.slice(8,12);
                            switchingState =switchingCode == 'E040' ? '已关' : '已开';
                            switchingState="："+ switchingState;
                        } else if (data2[0].type ==3) {
							switchingState = status == '8080' ? '开灯' : '关灯';
                            switchingState="："+ switchingState;
						}else if (data2[0].type == 4) {
							switchingCode = status.slice(0, 2);
							switchingState = switchingCode == '80' ? '开灯' : '关灯';
							var brightness="";
							if (parseInt(parseInt(status.slice(2,4), 16)*6.6)=="0"){
								brightness=' ; 亮度：'+'1%';
							}else{
								brightness=' ; 亮度：'+  parseInt(parseInt(status.slice(2,4), 16)*6.6)+'%';
							}
							if(switchingState=='开灯'){
								switchingState='：'+switchingState+brightness;//总显示
							}else{
								switchingState='：'+switchingState;//总显示
							}
						}
						else if (data2[0].type == 13) {
							switchingCode = status.slice(0, 2);
							switchingState = switchingCode == '80' ? '开灯' : '关灯';
                            var brightness="";
                            var colorTemperature="";
                            if (parseInt(parseInt(status.slice(2,4), 16)*6.6)=="0"){
                                brightness=' ; 亮度：'+'1%';
                                colorTemperature=' ; 色温：'+'1%';
                            }else{
                                brightness=' ; 亮度：'+  parseInt(parseInt(status.slice(2,4), 16)*6.6)+'%';
                                colorTemperature=' ; 色温：'+ parseInt(parseInt(status.slice(4,6), 16)/1.27)+'%';
                            }
                            if(switchingState=='开灯'){
                                switchingState='：'+switchingState+brightness+colorTemperature;//总显示
                            }else{
                                switchingState='：'+switchingState;//总显示
                            }
						}else if (data2[0].type == 10 || data2[0].type == 5) {//空调
                            switchingCode = status.slice(26, 28);
                            var mode="";//模式
                            var speed="";//风速
                            switchingState = switchingCode == '21' ? '开' : '关';
                            var roomTemperature=' ; 室温：'+parseInt(status.slice(0,2), 16)+' °c';//室温
                            var temperature=' ; 温度：'+parseInt(parseInt(status.slice(8,10))+parseInt(16))+' °c';//温度
                            if (status.slice(6,8)=='00'){
                                mode=' ; 模式：'+'自动';//自动模式
                            }else if(status.slice(6,8)=='01'){
                                mode=' ; 模式：'+'制冷';//制冷模式
                            }else if(status.slice(6,8)=='02'){
                                mode=' ; 模式：'+'除湿';//除湿模式
                            }else if(status.slice(6,8)=='03'){
                                mode=' ; 模式：'+'送分';//送分模式
                            }else if(status.slice(6,8)=='04'){
                                mode=' ; 模式：'+'制热';//制热模式
                            }
                            if(status.slice(10, 12)=='00'){
                                speed=' ; 风速：'+'自动';//自动风速
                            }else if(status.slice(10, 12)=='01'){
                                speed=' ; 风速：'+'低';//低风速
                            }
                            else if(status.slice(10, 12)=='02'){
                                speed=' ; 风速：'+'中';//中风速
                            }
                            else if(status.slice(10, 12)=='03'){
                                speed=' ; 风速：'+'高';//高风速
                            }
                            if(switchingState=='开'){
                                switchingState='：'+switchingState+roomTemperature+temperature+mode;//总显示
                            }else{
                                switchingState='：'+switchingState+roomTemperature;//总显示
                            }
                        }
						for (var j in data) {
							if (data[j].devAuthId == sn) {
							    if (online=='在线'){
                                    data[j].devStatus = '状态'+switchingState;
                                }else{
							        data[j].devStatus =online;
                                }
								data[j].devInformation = data2[0];
							}
						}
						$("#deviceDataGrid").datagrid("loadData", data);
					} else if (data2.code == -2) {
						myTips("系统异常", "error");
					}
				});
			}
		$("#deviceDataGrid").datagrid("loadData", data);
    })
}

//调节灯
function operateDeviceDlg(value,type) {
	var row = $("#deviceDataGrid").datagrid("getChecked");
	if(row.length == 0) {
		myTips("请选择至少一个设备！", "error");
		return;
	}
	console.log(row);
	for(var i in row){
		var zz = {};
		zz.sn = row[i].devAuthId;
		zz.mac = row[i].devAuthSecret;
		zz.isNeedCache = "false";
		// if(row[i].devStatus){
		// 	if(row[i].devStatus == '离线'){
		// 		continue;
		// 	}
		// }else {
		// 	continue;
		// }
		if(row[i].devFirstType == 23 && row[i].devSecondType == 31 ){
			row[i].switchingState = '开';
			//0:控制亮度，控制色温
			if (type==0){//控制亮度
				var colorTemperatureStatus=$("#colorTemperatureStatus").val();//当前的色温
				var brightness = parseInt(value / 6.6);
				brightness="0"+parseInt(brightness).toString(16);//调节亮度
				$("#brightnessStatus").val(brightness);
				zz.status = "80"+brightness+colorTemperatureStatus+"07";
			}else if (type==1) {//色温
				var brightnessStatus=$("#brightnessStatus").val();//当前的亮度
				var colorTemperature = parseInt(value *1.27);
				if (colorTemperature<16){
					colorTemperature="0"+parseInt(colorTemperature).toString(16);
				}else{
					colorTemperature=parseInt(colorTemperature).toString(16);
				}
				$("#colorTemperatureStatus").val(colorTemperature);
				zz.status = "80"+brightnessStatus+colorTemperature+"07";
			}
		}
		if(row[i].devFirstType == 23 && row[i].devSecondType == 36 ){
			row[i].switchingState = '开';
			//0:控制亮度，控制色温
			if (type==0){//控制亮度
				var brightness = parseInt(value / 6.6);
				brightness="0"+parseInt(brightness).toString(16);//调节亮度
				$("#brightnessStatus").val(brightness);
				zz.status = "80"+brightness+"0707";
			}
			if (type==1){//控制亮度
				continue;
			}
		}
		for (var i=0;i<3;i++){
			console.log(i)
			$.post('http://www.fangzhizun.com/device/vanhi/YHDeviceControlServlet', zz, function(data) {
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
    console.log(row)
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
        if(row[i].devFirstType == 4 && row[i].devSecondType == 4){
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
			for (var j=0;j<3;j++){
				$.post('http://www.fangzhizun.com/device/vanhi/AirControl', zz, function(data) {
					if (data.code == 0 && data.body[0].resultCode == 0) {
						//alert(data.body[0].resultMsg);
					} else {
						alert(data.body[0].resultMsg);
					}
				});
			}

        }else{
            zz.isNeedCache = "false";
            if(type == 0){//开
                if(row[i].devFirstType == 1 && row[i].devSecondType == 1 ){
                    zz.status = '8080';
                }else if(row[i].devFirstType == 2 && row[i].devSecondType == 25){
                    zz.status = '81';
                }else if(row[i].devFirstType ==2  && row[i].devSecondType == 37){
                    zz.status = '8080';
                }else if(row[i].devFirstType == 6 && row[i].devSecondType == 6 || row[i].devFirstType == 6 && row[i].devSecondType == 41){
                    zz.status = '8080';
                }else if(row[i].devFirstType == 6 && row[i].devSecondType == 38){
                    zz.status = '000200018080';
                }else if(row[i].devFirstType ==23  && row[i].devSecondType == 31 || row[i].devFirstType ==23  && row[i].devSecondType == 36){
					zz.status = '80070707';
				}
                row[i].switchingState = '开';
            }else if(type == 1){//关
				console.log("进来了")
                if(row[i].devFirstType == 1 && row[i].devSecondType == 1){
                    zz.status = '8000';
                }else if(row[i].devFirstType == 2 && row[i].devSecondType == 25){
                    zz.status = '80';
                }else if(row[i].devFirstType ==2  && row[i].devSecondType == 37){
                    zz.status = '8000';
                }else if(row[i].devFirstType == 6 && row[i].devSecondType == 6 || row[i].devFirstType == 6 && row[i].devSecondType == 41){
                    zz.status = '4040';
                }else if(row[i].devFirstType == 6 && row[i].devSecondType == 38){
                    zz.status = '000200014040';
                }else if(row[i].devFirstType ==23  && row[i].devSecondType == 31 || row[i].devFirstType ==23  && row[i].devSecondType == 36){
					zz.status = '00070707';
				}
                row[i].switchingState = '关';
            }
            console.log(zz)
			for (var l=0;l<3;l++){
				$.post('http://www.fangzhizun.com/device/vanhi/YHDeviceControlServlet', zz, function(data) {
					console.log(data)
					if (data.code == 0 && data.body[0].resultCode == 0) {
						//alert(data.body[0].resultMsg);
					} else {
						alert(data.body[0].resultMsg);
					}
				});
			}
        }
        var index = $("#deviceDataGrid").datagrid("getRowIndex",row[i]);
        var rowData = {
            index:index,
            row:row[i]
        }
        $("#deviceDataGrid").datagrid("updateRow",rowData);
    }
}

//控制按钮
$(function () {
	$(".buttonCls").dblclick(function () {
		console.log("aaaaaaaa");
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
});


//根据控制类型查询
$(function () {
    $("#tt").tabs({
        onSelect:function (title,index) {
            $(".chooseCls").removeClass("chooseCls");
            if (index==0){//灯光控制
                queryOfficeAreaDevice(1);
                $("#searchVirtualName").attr("onkeyup","queryOfficeAreaDevice(1)")
            } else if (index==1){//灯光调节
                queryOfficeAreaDevice(3);
                $("#searchVirtualName").attr("onkeyup","queryOfficeAreaDevice(3)")
            }else if (index==2){//空调控制
				queryOfficeAreaDevice(4);
                $("#searchVirtualName").attr("onkeyup","queryOfficeAreaDevice(4)")
			} else if (index==3){//窗帘控制
                queryOfficeAreaDevice(6);
                $("#searchVirtualName").attr("onkeyup","queryOfficeAreaDevice(6)")
            } else if (index==4){//插座控制
				queryOfficeAreaDevice(2);
                $("#searchVirtualName").attr("onkeyup","queryOfficeAreaDevice(2)")
			}
        }
    });
})
//关联用户
function officeAssociatedUsers(){
	var row = $('#deviceDataGrid').datagrid('getChecked');
	$('#officeAssociatedUsersDig').dialog({
		title 	: '关联用户',
		top		: getTop(305),
		left	: getLeft(1000),
		width	: 980,
		height	: 500,
		closed	: true,
		cache	: false,
		modal	: true,
		onClose	: function(){
			$('#userName').val('');
			$("#unRelatedRoomDg").datagrid("loadData", []);
			$("#unRelatedDeviceDg").datagrid("loadData", []);
			$("#existingRelationDeviceDg").datagrid("loadData", []);
			$("#existingRelationRoomDg").datagrid("loadData", []);
		}
	});
	queryUserlated(1);
	$('#officeAssociatedUsersDig').dialog('open');
}
//查询已关联用户
function queryUserlated2(data){
//	var row = $('#existingRelationDeviceDg').datagrid('getChecked');
	var departmentName=$("#departmentName").val()
	var userName=$("#suStaffName").val()
	console.log("id"+data.id);
	$.post("../selectRelatedUser.action", {
		judDeviceId	:data.id,
	},function(data){
		console.log("78987");
		console.log(data);
		if(data<0){
			//sourcePage(0, 0, 0);
			$('#existingRelationRoomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			if(data!=null){
				console.log(data);
				$("#existingRelationRoomDg").datagrid("loadData", data);
			}else{
				$("#existingRelationRoomDg").datagrid("loadData", []);
			}
		}
	},"json");
//	$.post("../selectRelatedDevice.action", {
//		JhoOfficeId	:row.hsId,
//	},function(data){
//		if(data<0){
//			//sourcePage(0, 0, 0);
//			$('#unRelatedRoomDg').datagrid({
//				data : [],
//				view : myview,
//				emptyMsg : data.msg
//			});
//		}else{
//			data=data.body;
//			for(i in data){
//				console.log(data[i]);
//			}
//			if (page == 1 ) {
//				_indexNum[0] = 0;
//				//sourcePage(data[0].totalNum, page, 0);
//			}
//			for (var i in data) {
//				for(var j in data[i]){
//					if(data[i][j]==null){
//						data[i][j]='';
//					}
//				}
//			}
//			if(data!=null){
//				$("#existingRelationDeviceDg").datagrid("loadData", data);
//			}else{
//				$("#existingRelationDeviceDg").datagrid("loadData", []);
//			}
//		}
//	},"json");
}
//查询未关联用户和设备
function queryUserlated(pate){
	var departmentName = $("#departmentName").val();
	var userName = $("#userName").val();
	var installationAddress = $("#installationAddress").val();
	var pageSize=15;
	var row = $('#deviceDataGrid').datagrid('getChecked');
	$.post("../selectUserPicDig.action",{
		departmentName : departmentName,
		suStaffName	: userName,
		judDeviceId	:pate.id,
	},function(data){
		console.log("用户");
		console.log(data);
		if(data<0){
			sourcePage(0, 0, 0);
			$('#unRelatedRoomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			
			
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			if(data!=null){
				$("#unRelatedRoomDg").datagrid("loadData", data);
			}else{
				$("#unRelatedRoomDg").datagrid("loadData", []);
			}
		}
	
	},"json");
	$.post("../selectNoRelationdevice.action",{
		hsAddCommunity : installationAddress
	},function(data){
		if(data<0){
			$('#unRelatedRoomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			if(data!=null){
				$("#unRelatedDeviceDg").datagrid("loadData", data);
			}else{
				$("#unRelatedDeviceDg").datagrid("loadData", []);
			}
		}
	},"json");
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
	var row = $('#deviceDataGrid').datagrid('getRows');
	console.log(row);
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
						/*judId 	:    hsRows[j].judId,*/
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
