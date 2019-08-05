_accountId = _shortRentAccount;
_closeWay = "";

var authType=["现场授权","授权卡","远程授权"];

//有折扣权限的全部人员信息
var _allDiscountAuthInfo=[];

hsIdList = [];

//钟点房入住时间
var hour_time =["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];

//【短租房屋列表】
house_list_arr = []
//短租订单事件
event_list = []
//短租设置信息
setUp = {};
//渠道信息(打开下单窗口时赋值)
channelInfo = [];

_title_address = "";

//快速退房
var _quickList=[]
//快速入住
var _quickCheckIn=[]
//快速随机入住
var _checkInRoom=[]
//保留办理
var _retainHandle=[]

var suDiscountAuthPassword ='';

var planPackage = [];

//折扣授权单信息
var authOrder=[];

$(function () {
	for(var i =0; i < authType.length;i++){
		var type =authType[i];
		$("#authType").append("<option value='" + type + "'>"+type+"</option>");
	}

	getSetUpInfo();
	getChannelInfo();
	//设置日历的宽度
	set_cal_size($(window).width(), $(window).height());
	setTimeout(function () {
		initDlgAndSelect();
		initFinancialAccount();
		querySourceInfo();
		queryNewOrder();
		queryHouseDevice(0);
		queryHouseDevice(1);
	}, 1000);
	listPopCustomer();
	initInfo();
	//实时刷新时间单位为毫秒
	setInterval('queryNewOrder()', 12000);
	setInterval('queryHouseDevice(0)', 180000);//更新房间状态
	setInterval('queryHouseDevice(1)', 30000);//更新设备操作状态

	$.post("../selectAllDiscountAuth.action", {}, function (data) {
		var body = data.body;
		var suName = [];
		var authPsd = {};
		var suId ={};
		for (var index in body) {
			var dataObj = body[index];
			var suStaffName = dataObj.suStaffName;
			var suPsd = dataObj.suDiscountAuthPassword;
			var userId =dataObj.user;
			suName.push(suStaffName);
			authPsd[suStaffName] =suPsd;
			suId[suStaffName] =dataObj.userId;
		}
		_allDiscountAuthInfo.push(suName);
		_allDiscountAuthInfo.push(authPsd);
		_allDiscountAuthInfo.push(suId);
		for(var i =0; i < _allDiscountAuthInfo[0].length;i++){
			var suName =_allDiscountAuthInfo[0][i];
			$("#application").append("<option value='" + suName + "'>"+suName+"</option>");
		}
	});

	$.post("../queryUserById.action", {
		userId : _loginUserId,
	}, function(data) {
		suDiscountAuthPassword =data.body[0].suDiscountAuthPassword;
	}, "json");
    //初始化折扣订单
    getAuthOrder();
});

//初始化折扣订单
function getAuthOrder(){

    $.post("../selectBySelective.action",{
        jtoTakingStatus:0,
        jtoStatus:"不同意"
    },function (result) {

        if(result.body !=null ){
            var data =result.body;
            authOrder =data;
            console.log(data);
        }
    });
}



function roundingHundred(num){
    num = parseFloat(num).toFixed(2);
    num /= 100;
    num += 0.5;
    num = Math.round(num);
    num *= 100;
    return num;
}

function initDlgAndSelect(){
    $('#followDg').datagrid({
        onDblClickRow : function(rowIndex, rowData){
            for(var i in rowData){
                $('#' + i).val(rowData[i]);
            }
            openFollow(rowData);
        }
    });
    $("#doorLockFollowTable").datagrid({
        onDblClickRow : function(rowIndex, rowData) {
        }
    });
    $("#lockInfoDg").datagrid({
        onDblClickRow : function(rowIndex, rowData) {
        }
    });
    $('#remind').datagrid({
        onDblClickRow : function(rowIndex, rowData){
            for(var n in rowData){
                $('#' + n).val(rowData[n]);
            }
            var state=$("#state").val();
            if(state=='已提醒'){
                $("#functionHeid").hide();
            }else{
                $("#functionHeid").show();
            }
            openremind();
        }
    });

    $('#doorCardTable').datagrid({
        onDblClickRow : function(rowIndex, rowData){
            openDoorLockFollow();
        }
    })

    $('#customerInfoTable').datagrid({
        onDblClickRow : function(rowIndex, rowData){
            if(rowData['popIdcardJson'] != null && rowData['popIdcardJson'] != ""){
                var row = JSON.parse(rowData['popIdcardJson']).Certificate;
                $("#popCustomerNameTable").val(rowData.popName);
                $("#popNameRemarkTable").val(rowData.popNameRemark);
                $("#popTelephoneTable").val(rowData.popTelephone);
                $("#popIdcardTable").val(rowData.popIdcard);
                $("#popBirthTable").val(row.Birthday);
                $("#popIdcardAddressTable").val(rowData.popIdcardAddress);
                $("#popNationTable").val(rowData.popNation);
                $("#popImg").attr("src","data:image/png;base64,"+row.Base64Photo);
            }
        }
    });

    //维修类型下拉列表
    for (var i in _eventType) {
        $(".repair_type_rp").append(
            "<option value = '" + i + "'>" + _eventType[i] + "</option>");
    }
    //归属费用下拉列表
    for (var i in _repResponsibility) {
        $(".repair_responsibility").append("<option value = '" + i + "'>" + _repResponsibility[i]+ "</option>");
        $("#newAttribution").append("<option value = '" + i + "'>" + _repResponsibility[i]+ "</option>");
    }
}
var dlg;
function queryNewOrder(){
    $.post("../queryNewOrder.action",{
        jsrcOrderState	:	0
    },function(data){
        if(data.code == -1){
            return;
        }else if(data.code == -2){
            myTips(data.msg, 'error');
            return;
        }else{
            data = data.body;
            var address = data[0].hsAddCommunity+' '+data[0].hsAddBuilding+' '+data[0].hsAddDoorplateno;
            dlg = $.messager.show({
                title:'微信新下单通知',
                msg:address+'有新的订单，请及时刷新查看'+'<div style="text-align:center;width:100%;margin:0 0 0 0"><button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:60px;" onclick="getListContract()">刷新</button></div>',
                timeout:9000,
                height:130,
                showType:'slide'
            });
        }
    });
}

//查询电子门牌状态
var dlg1,dlg2;
function queryHouseDevice(type){
	var jsonArray = ["41","3"]
	$.post("../queryAllDevice.action", {
		jsonArray:JSON.stringify(jsonArray)
	}, function (result) {
		result=result.body
        console.log(result)
		var array = [];
		var addRepairs = [];
		var jsrcHsIdList=[];
		if(_loginCompany != "hz"){
			for(var i in result){
				if(result[i].devFirstType==19 && result[i].devSecondType==19){
					var zz = {};
					zz.sns =result[i].devAuthId;
					zz.co =_loginCompany;
					$.ajaxSettings.async = false;
					$.post('http://www.fangzhizun.com/device/Interface/QueryDeviceStatus', zz, function(data) {
						if(data.code == 0){
							var houseStatus;
							data = data.body
							if(data[0].status=="F010"){//需要清洁
								houseStatus = 1;
							}else{
                                houseStatus = 0;
                            }
							var jsrcHsId=data[0].place.substring(3,data[0].place.length)
							var obj = {};
							obj.hsId = jsrcHsId;
							obj.hsDirtyHouse = houseStatus;
							array.push(obj)
							//维保任务
							var repEventRp ="需要清洁，请尽快处理";
							var addTaskObj = {
								repHouse4storeId: jsrcHsId,
								repResponsibility : "负责人",
								repEventRp : repEventRp,
								repHopeTime : "尽快",
								repRepairPeopleId : _loginUserId,
								repUserId : _loginUserId,
								repReportingTime : new Date().format("yyyy-MM-dd hh:mm:ss"),
								repTypeRp : "租务维修",
								repDepartment : _loginDepartment,
								repStorefront : _loginStore,
								repTaskTime : new Date().format("yyyy-MM-dd"),
								type:"维保"
							}
							addRepairs.push(addTaskObj)
							jsrcHsIdList.push(jsrcHsId)
							
							if(data[0].status == "F040" || data[0].status=="F010"){
								if(data[0].status != $('#status1').val()){
									openWindow(1,data[0].status,jsrcHsId);
								}
							}
						}
					});
				}
				if(result[i].devFirstType==18 && result[i].devSecondType==18){
					var zz = {};
					zz.sns =result[i].devAuthId;
					zz.co =_loginCompany;
					console.log(zz)
					$.post('http://www.fangzhizun.com/device/Interface/QueryDeviceStatus', zz, function(data) {
						if(data.code == 0){
							data = data.body
							var jsrcHsId=data[0].place.substring(3,data[0].place.length)
							var status = data[0].status.substring(11,15);

                            //插卡取电，订单详细页面
                            if(status == "1000"){
                                $("#"+jsrcHsId).css("color","green");
                            }else{
                                $("#"+jsrcHsId).css("color","black");
                            }
							if(status != $('#status2').val()){
								if((status == "1010" && $('#status2').val()=="1000") || status == "1000"){
									openWindow(2,status,jsrcHsId)
								}
							}
						}
					});
				}
			}
			if(type == 0){//执行修改房间状态
                $.ajax({
                    type:"post",
                    url:"../updateDirtyHouse.action",
                    data:{
                        jsonArray:JSON.stringify(array),
                        addRepairs:JSON.stringify(addRepairs),
                        jsrcHsIdList:jsrcHsIdList,
                    },
                    dataType:"json",
                    success:function(data){
                        if(data.code > 0){
                            initInfo()
                        }
                    }
                })
			}
			$.ajaxSettings.async = true;
		}
	});
}

function openWindow(type,status,hsId){
	var msg = "";
	for(var i in house_list_arr){
		if(hsId == house_list_arr[i].hsId){
			msg = house_list_arr[i].hsRoomType+" "+house_list_arr[i].hsAddDoorplateno+" 操作了 ";
		}
	}
	if(type == 1){//电子门牌操作提示框
		$("#status1").val(status);
		msg += status=="F010"?'"请即保洁"':'"请莫打扰"';
		dlg1 = $.messager.show({
			title:"客户操作",
			msg:msg+'<div style="text-align:center;width:100%;margin:20px 0 0 0"><button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:60px;" onclick="closeWindow(1)">确定</button></div>',
			timeout:60000,
			height:135,
			showType:'slide'
		});
	}else{//插卡提示窗
		$("#status2").val(status);
		msg += status=='1000'?'"插卡"':'"拔卡"';
		dlg2 = $.messager.show({
			title:"客户操作",
			msg:msg+'<div style="text-align:center;width:100%;margin:20px 0 0 0"><button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:60px;" onclick="closeWindow(2)">确定</button></div>',
			timeout:60000,
			height:135,
			showType:'slide'
		});
	}
}

function closeWindow(type){
	if(type == 1){
		dlg1.window("close");
	}else{
		dlg2.window("close");
	}
}

//入住办理
function handle1(){
    $('#handle1').dialog({
        title : "快速入住",
        top : getTop(280),
        left : getLeft(650),
        width : 650,
        height :280,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#handle1 [clear="clear"]').val('');//清空input内容
            $('#checkInRoomNum').html('');
        }
    });
    quickCheckInt();
    $('#handle1').dialog('open');
}

//快速入住
function quickCheckInt(){
    var houseList = JSON.parse(JSON.stringify(house_list_arr)); //房屋信息
    var eventList = JSON.parse(JSON.stringify(event_list));		//订单信息
    var htmls = "";
    //获取房间门牌号信息
    for(var i in houseList){
        var hsAddCommunity=houseList[i].hsAddCommunity
        var hsAddBuilding=houseList[i].hsAddBuilding;
        var hsAddDoorplateno=houseList[i].hsAddDoorplateno;
        var hsRoomType=houseList[i].hsRoomType;
        var houSing=hsAddCommunity+" "+hsRoomType+" "+hsAddBuilding+hsAddDoorplateno;
        //获取订单信息
        for(var j in eventList){
            if(eventList[j].jsrcHsId==houseList[i].hsId){
                if(eventList[j].jsrcState=="保留" || eventList[j].jsrcState=="预定"){
                    //获取当天时间
                    var date = new Date().format("yyyy-MM-dd");
                    //合约预约时间转化date格式
                    var jsrcBeginTime=new Date(eventList[j].jsrcBeginTime).format("yyyy-MM-dd");
                    var jsrcEndTime=new Date(eventList[j].jsrcEndTime).format("yyyy-MM-dd");
                    //判断预约时间等于今天时间
                    if(jsrcBeginTime<=date && jsrcEndTime>date){
                        var popPeople=eventList[j].jsrcPeople;
                        if(popPeople !="" && popPeople!=null){
                            //获取客户电话号码
                            var newPopPeople = JSON.parse(popPeople.getRealJsonStr());
                            var popPeople=newPopPeople[0].popTelephone;
                        }
                        var obj = eventList[j];
                        obj._title_address = houSing;
                        _quickCheckIn.push(obj);
                        htmls += '<option label="'+popPeople+'" value="'+houSing+'" />'
                    }
                    //判断结束
                }
            }
        }
    }
    $("#checkInList").html(htmls)
}

//打开快速入住窗口
function checkInKey(){
    //获取输入框的内容
    var quickCheckIn=$('#quickCheckIn').val();
    for(var i in _quickCheckIn){
        if(_quickCheckIn[i]._title_address==quickCheckIn){

            //获取标题
            _title_address=_quickCheckIn[i]._title_address;
            var obj = _quickCheckIn[i];
            openCheckOut(obj);
            openCheckIn();
        }
    }
    $('#quickCheckIn').val("");
    $('#handle1').dialog('close');
}

//退房办理
function handle2(){
    $('#handle2').dialog({
        title : "快速办理",
        top : getTop(280),
        left : getLeft(650),
        width : 650,
        height :300,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
        }
    });
    quickCheckOut();
    $('#handle2').dialog('open');
}

//快速退房
function quickCheckOut(){
    _quickList = [];
    var houseList = JSON.parse(JSON.stringify(house_list_arr)); //房屋信息
    var eventList = JSON.parse(JSON.stringify(event_list));		//订单信息
    var html = "";
    //获取房间门牌号信息
    for(var i in houseList){
        var hsAddCommunity=houseList[i].hsAddCommunity
        var hsAddBuilding=houseList[i].hsAddBuilding;
        var hsAddDoorplateno=houseList[i].hsAddDoorplateno;
        var hsRoomType=houseList[i].hsRoomType;
        var houSing=hsAddCommunity+" "+hsRoomType+" "+hsAddBuilding+hsAddDoorplateno;
        //获取订单信息并且判断房间id等于订单房间id、已住状态
        for(var j in eventList){
            if(eventList[j].jsrcHsId==houseList[i].hsId && eventList[j].jsrcState=="已住"){
                //获取当天时间
                var date = new Date().format("yyyy-MM-dd");
                //合约结束时间转化date格式
                var jsrcEndTime=new Date(eventList[j].jsrcEndTime).format("yyyy-MM-dd");

                //判断合约结束时间大于等于今天时间
                if(jsrcEndTime>=date){
                    if(jsrcEndTime==date){
                        var handlingState="退房状态"
                    }else{
                        var handlingState="提前搬离状态";
                    }
                    var popJson=eventList[j].popJson;
                    if(popJson !=""&& popJson!=null){
                        //获取客户电话号码
                        var newPopJson = JSON.parse(popJson.getRealJsonStr());
                        var popPhone=newPopJson[0].popTelephone;
                    }
                    var obj = eventList[j];
                    obj.handlingState=handlingState;
                    obj._title_address = houSing;
                    _quickList.push(obj);
                    html += '<option label="'+popPhone+'" value="'+houSing+'" />'
                }
                //判断结束
            }
        }
    }
    $("#eventList").html(html)
}

//打开退房窗口或者搬离
function eventKey(){
    //获取输入框的内容
    var quickCheckOut=$('#quickCheckOut').val();
    if(quickCheckOut == ""){
        myTips("请选择需要退房的合约","error")
    }
    for(var i in _quickList){
        if(_quickList[i]._title_address==quickCheckOut){
            //获取订单状态
            var handlingState=_quickList[i].handlingState;
            //获取标题
            _title_address=_quickList[i]._title_address;
            if(handlingState=='退房状态'){
                var obj = _quickList[i];
                openCheckOut(obj);
                openCleanA(0);
            }
            else if(handlingState=='提前搬离状态'){
                var obj = _quickList[i];
                openCheckOut(obj);
                openCleanA(1);
            }
        }
    }
    $('#quickCheckOut').val('');
    $('#handle2').dialog('close');

}

//清除房间类型内容
function clickClear(){
    var quickCheckIn=$("#quickCheckIn").val();
    if(quickCheckIn!=""){
        $("#quickCheckIn1").val("");
        $('#checkInRoomNum').html("");
        getSetUpInfo();
        $("#keyButtonId").attr("onclick","checkInKey()");
    }
}

//keydown键盘按下事件
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var noCashOpen = $("#openCashDlg").parent().is(":hidden");
    var noKuaiSuTuiFang = $('#handle2').parent().is(":hidden");
    var noKuaiSuRuZhu = $('#handle1').parent().is(":hidden");
    switch (e && e.keyCode){
        case 13:
            if(!noKuaiSuTuiFang){
                eventKey();
            }

            if(!noKuaiSuRuZhu){
                var quickCheckIn=$("#quickCheckIn").val();
                var quickCheckIn1=$("#quickCheckIn1").val();
                if(quickCheckIn != ""){
                    checkInKey();
                }else if(quickCheckIn1 != ""){
                    checkInKey1();
                }
            }

            if(!noCashOpen){
                var payType = $("#payType").attr("onclick");
                eval(payType);
            }
            break;
        case 119:
            f8Key();
            break;
        case 120:
            f9Key();
            break;
        case 121:
            f10key();
            break;
    }
};

function f8Key(){
    $(".openCashBtn1").each(function(){
        var thisFaShow = $(this).parent().is(":hidden");
        var thisShow = $(this).is(":hidden");
        if(!thisShow && !thisFaShow){
            var fun = $(this).attr("onclick");
            eval(fun);
        }
    })
}

function f9Key(){
    $(".openCashBtn2").each(function(){
        var thisFaShow = $(this).parent().is(":hidden");
        var thisShow = $(this).is(":hidden");
        if(!thisShow && !thisFaShow){
            var fun = $(this).attr("onclick");
            eval(fun);
        }
    })
}

function f10key(){
    $(".openCashBtn3").each(function(){
        var thisFaShow = $(this).parent().is(":hidden");
        var thisShow = $(this).is(":hidden");
        if(!thisShow && !thisFaShow){
            var fun = $(this).attr("onclick");
            eval(fun);
        }
    })
}

//保留办理
function handle3(){
    $('#handle3').dialog({
        title : "保留办理",
        top : getTop(280),
        left : getLeft(650),
        width : 650,
        height :280,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#handle3 [clear="clear"]').val('');//清空input内容
            $('#retainRoomNum').html("");		//显示空房数量
        }
    });
    quickCheckInt();
    $('#handle3').dialog('open');
}
//房间类型筛选保留办理
function checkInRoom(){
    var retainList=[];
    var houseList=JSON.parse(JSON.stringify(house_list_arr));	//获取房间信息
    var tRoomSatTime=$('#tRoomSatTime').val();					//获取预约时间
    var tRoomEndTime=$('#tRoomEndTime').val();					//获取退房时间
    var tRoomType=$('#tRoomType').val();						//获取选择房间类型

    if(tRoomSatTime=="" || tRoomEndTime==""){
        myTips("请选择时间","error");
        return;
    }else{
        for(var i in houseList){
            var hsRoomType=houseList[i].hsRoomType;			//获取房间类型
            var hsId=houseList[i].hsId;						//获取未租房间Id
            if(hsRoomType == tRoomType){
                if(checkTime(hsId,tRoomSatTime,tRoomEndTime,0)){//调用查询空房间Id
                    var obj=houseList[i];
                    retainList.push(obj);
                }
            }
        }
        _retainHandle=retainList;
        $('#retainRoomNum').html("空房数量:"+retainList.length);		//显示空房数量
        $('#numSetBerInput').val(retainList.length)			 		//将空房数量隐藏起来
    }
}

//判断输入套数是否大于空房数量
function numSetBer(){
    var numSetBer=$('#numSetBer').val();					//套数
    var numSetBerInput=$("#numSetBerInput").val();			//空房数量
    if(numSetBer - numSetBerInput > 0){
        myTips("需求数量超过空房间数量，请重新输入","error");
        $('#numSetBer').val("");
        return;
    }
}

//批量保留
function retainHandle(){
    var handleList=[];
    var rentAry = [];
    var numSetBer=$('#numSetBer').val();								//套数
    var retainHandle=JSON.parse(JSON.stringify(_retainHandle));			//符合条件房型房间信息

    var personnelName=$('.personnelName').val();						//获取客人姓名
    var personnelPhone=$('.personnelPhone').val();						//获取手机号码
    var personnelIdcard=$('.personnelIdcard').val();					//获取身份证信息
    var tRoomSatTime=$('#tRoomSatTime').val();							//获取预约时间
    var tRoomEndTime=$('#tRoomEndTime').val();							//获取退房时间
    var remarkstwo=$('.Remarkstwo').val();								//备注
    var registrationTime=new Date().format("yyyy-MM-dd hh:mm:ss");		//登记时间
    var days = getDay(tRoomSatTime,tRoomEndTime);						//总天数
    var tRoomType=$('#tRoomType').val();						//获取选择房间类型

    if(personnelName.length == 0 ||personnelPhone.length == 0 ||personnelIdcard.length == 0){
        myTips("住户的信息未填完整","error");
        return;
    }
    if(tRoomSatTime.length==0 || tRoomEndTime.length==0){
        myTips("请选择时间","error");
        return;
    }
    if(tRoomType==""){
        myTips("请选择房间类型","error");
        return;
    }
    if(numSetBer.length==0){
        myTips("请选择套数","error");
        return;
    }
    var rentObj = {									//预约人信息
        popShortRent :1,
        popUser : _loginUserId,
        popInnerCreditLevel : 80,
        popOuterCreditLevel : 80,
        popName:personnelName,
        popIdcard:personnelIdcard,
        popTelephone:personnelPhone
    }
    rentAry.push(rentObj);

    for(var i=0;i<numSetBer;i++){
        var hsId=retainHandle[i].hsId;					//未租房间Id
        var dailyRent=retainHandle[i].hsDailyRent;		//日单价
        var amountPayable=dailyRent*days;				//总房价
        var totalPrice=dailyRent*days;					//实付金额
        var text = ""
        text = "给 "+personnelName+" 预约" +retainHandle[i].hsAddCommunity + retainHandle[i].hsAddBuilding + retainHandle[i].hsAddDoorplateno +" 的房间";
        var jsrcFollow = creatFollow(text);				//跟进记录json

        //押金
        var jsrcDeposit = "";
        if(setUp.jsrsuDepositSetType != ""){
            var jsrsuDepositSetType = JSON.parse(setUp.jsrsuDepositSetType);
            if(jsrsuDepositSetType.type == 0){
                jsrcDeposit = Math.round((dailyRent/100)+0.49)*100;	//押金
                jsrcDeposit = jsrcDeposit.toFixed(2)
            }else{
                jsrcDeposit = jsrsuDepositSetType.depositMoney
            }
        }

        var obj={
            jsrcUserId:_loginUserId,				//登记人ID
            jsrcBeginTime:tRoomSatTime,				//预约时间
            jsrcEndTime:tRoomEndTime,				//退房时间
            jsrcRemarks:remarkstwo,					//备注
            jsrcRegistrationTime:registrationTime,	//登记时间
            jsrcTotalDays:days,						//总天数
            jsrcState:"保留",							//状态
            jsrcPeople:rentAry,						//预约人信息
            jsrcOrderState:1						//接单状态（0为需要接单，1为已接单）
        }
        obj.jsrcHsId=hsId;									 //未租房间Id
        obj.jsrcDailyPrice=dailyRent.toFixed(2);			 //日单价
        obj.jsrcDeposit=jsrcDeposit;						 //押金
        obj.jsrcTotalPrice=totalPrice.toFixed(2);			 //实付金额
        obj.jsrcAmountPayable=amountPayable.toFixed(2);		 //总房价
        obj.jsrcFollow=jsrcFollow;							 //跟进记录JSON
        handleList.push(obj);

    }

    $.ajax({
        url:"../inserRetainHandle.action",
        type:"post",
        data:{
            handle:JSON.stringify(handleList),
        },
        success:function(result){
            if(result.code==1){
                myTips("保留成功","success");
                $('#handle3 [clear="clear"]').val('');//清空input内容
                $('#retainRoomNum').html("");		//显示空房数量
                $('#handle3').dialog('close');		//关闭批量保留办理窗口
                refash();					//重新加载订单
            }else{
                myTips(result.msg,"error");
            }
        }
    })
}
//改变钟点房选择时间范围
function changeHourEndTimes() {

   var beginTime = Number($("#hourStartSelect option:selected").val().split(":")[0]);
    var length = hour_time.length;
    var jsrsuHourRoom=setUp.jsrsuHourRoom;
    var hourRoom=Number(JSON.parse(jsrsuHourRoom).hourRoom);
    var min =beginTime;
    $("#hourEndSelect").empty();
    for(var i = 0;i<=length-1;i++){
        var max =Number(hour_time[length-1].split(":")[0]);
         min +=hourRoom;
        if( min <= max && min >beginTime ){
            var endTime =min+":00";
            $("#hourEndSelect").append("<option value='" + endTime + "'>"+endTime+"</option>");
            console.log(endTime);
        }
    }
}


//钟点房
function typeOccupancy(){
    var hsTimePrice=($('#stoTimePrice').val()*1.0).toFixed(2);	//获取钟点房价格
    var typeOccupancy=$('#typeOccupancy').val();				//获取入住类型
    var jsrsuHourRoom=setUp.jsrsuHourRoom;						//获取钟点房间规则
    var hourRoom=Number(JSON.parse(jsrsuHourRoom).hourRoom);				//获取钟点房时间
    var actualOccupancyTime=$('#actualOccupancyTime').val()		//获取实际入住时间
    var roomType =$(".hsRoomType").val();
    var jppPrice =channelInfo[0].jppPlanPackage.getRealJsonStr();
    jppPrice =JSON.parse("["+jppPrice+"]");
    if(typeOccupancy=="钟点客房"){
        $("#hourOccupancyTimeBox").css("display","block");
        $(".actualOccupancyTime").css("display","none");
        $(".endDate").css("display","none");
        $(".hourEndDate").css("display","block");
        //判断入住类型等于钟点房
        console.log(roomType);
        console.log(channelInfo);
        var hourPrice;
        for(var i in jppPrice){
            if(roomType == jppPrice[i].roomType){
                hourPrice =jppPrice[i].hourPrice;
            }
        }
        console.log(jppPrice);
        $('#totalDay').val(0);									//给总天数设置为0
        var totalHourPrice =Number(hourPrice)*hourRoom;
        $('#dayPrice').val( hourPrice);	//赋值给日均价格
        $('#totalHousingPrice').val(totalHourPrice);				//赋值给总房价
        //押金
        var deposit = $("#houseDeposit").val() == "" ? 0 : $("#houseDeposit").val();
        //实付金额
        var amountPayable =(parseFloat(deposit) + parseFloat(totalHourPrice)).toFixed(2);

        $('#amountPayable').val(amountPayable);				//应付金额
        $('#totalPrice').val(amountPayable);				//折后金额
        $('#moneyText').html(amountPayable);				//金额显示
        $('#payMoneyText').val(amountPayable);
        //显示选择周末
        $('#fontTitle1').html(" ")
    }else if(typeOccupancy!="钟点客房"){
        $("#hourOccupancyTimeBox").css("display","none");
        $(".actualOccupancyTime").css("display","block");
        $(".endDate").css("display","block");
        $(".hourEndDate").css("display","none");
        var startTime =$("#actualOccupancyTime").val();
        var endTime =$("#endDate").val();
        var days = getDay(startTime,endTime);
        $("#totalDay").val(days);
        calculatedMoney(jppPrice,0);
        // timechData();
    }
}
//房间配置
$('#houseInfoDlg button').click(function(){
    if ($(this).hasClass('btn-default')) {
        $(this).removeClass('btn-default');
        $(this).addClass('btn-success');
    } else {
        $(this).removeClass('btn-success');
        $(this).addClass('btn-default');
    }
});

//按钮点击变色和查询
$('.shortRentState button').click(function(){
    $('#searchButtonState').val($(this).val());
    $(this).removeClass('btn-success');
    $(this).addClass('btn-info');
    $(this).siblings().removeClass('btn-info').addClass('btn-success');
    $('#cal_ims [clear="clear"]').val('');
    queryHouseTable($(this).val());
});
//条件查询结果的总数量
function querySourceInfo(){
    var houseList = JSON.parse(JSON.stringify(house_list_arr));
    var eventList = JSON.parse(JSON.stringify(event_list));
    var vacantclean = 0, vacantbaojie = 0, leaveHouse=0, todayRetain=0, repair=0, arrive=0, arrears=0, reserve=0,
        retain=0, ordinaryRoom=0, hourRoom=0, freeRoom=0;
    var checkOutToday = new Date().format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");

    checkOutToday = new Date(checkOutToday).getTime();
    var today = new Date().format("yyyy-MM-dd " + setUp.jsrsuCheckInTime +":00");
    today = new Date(today).getTime();
    var tomorrow = new Date(today).getTime()+1000*60*60*24;
    tomorrow = new Date(tomorrow).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
    var yesterday = new Date(today).getTime()-1000*60*60*24;
    yesterday = new Date(yesterday).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
    for(var i in houseList){
        var checkTime1 = checkTime(houseList[i].hsId,today,tomorrow,1);
        var checkTime2 = checkTime(houseList[i].hsId,yesterday,today,1);

        if(checkTime1.flag){
            if(houseList[i].hsDirtyHouse == 0){//查询空置干净的数量
                vacantclean++
            }
            if(houseList[i].hsDirtyHouse == 1){//空置保洁的房间的数量
                vacantbaojie++
            }
            if(houseList[i].hsDirtyHouse == 2){//查询空置维修房间的数量
                repair++
            }
        }
        //查询当天预留房间的数量
        if(!checkTime1.flag){
            if(checkTime1.event.jsrcState =='保留'){
                todayRetain++
            }
        }
        //查询今天要离开房间的数量
        if(!checkTime2.flag){
            if(checkTime2.event.jsrcState =='已住'){
                if(!checkTime2.flag && checkTime2.event.jsrcState =='已住'){
                    var endTime = new Date(checkTime2.event.jsrcEndTime).getTime();
                    if(checkOutToday == endTime){
                        leaveHouse++
                    }
                }
            }
        }
    }
    for(var j in eventList){
        var jsrcBeginTime = new Date(eventList[j].jsrcBeginTime).format("yyyy-MM-dd ");
        var jsrcActualOccupancyTime = new Date(eventList[j].jsrcActualOccupancyTime).format("yyyy-MM-dd ");
        //当天抵达的数量
        if(eventList[j].jsrcState == '已住' && jsrcBeginTime == jsrcActualOccupancyTime){
            arrive++
        }
        //查询欠费客房数量
        if(eventList[j].jsrcArrears != 0  && eventList[j].jsrcState == '已住'){
            arrears++
        }
        //查询预定客房
        if(eventList[j].jsrcState =='预定' ){
            reserve++
        }
        //查询保留房客
        if(eventList[j].jsrcState =='保留' ){
            retain++
        }
        //查询普通客房
        if(eventList[j].jsrcTypeOccupancy =='普通客房' ){
            ordinaryRoom++
        }
        //查询钟点客房
        if(eventList[j].jsrcTypeOccupancy =='钟点客房' ){
            hourRoom++
        }
        //查询免费客房
        if(eventList[j].jsrcTypeOccupancy =='免费客房' ){
            freeRoom++
        }
    }

    $('.shortRentState .totalNum0').html('（' + houseList.length + '）');
    $('.shortRentState .totalNum2').html('（' + vacantclean + '）');
    $('.shortRentState .totalNum3').html('（' + vacantbaojie + '）');
    $('.shortRentState .totalNum4').html('（' + repair + '）');
    $('.shortRentState .totalNum5').html('（' + arrive + '）');
    $('.shortRentState .totalNum6').html('（' + leaveHouse + '）');
    $('.shortRentState .totalNum7').html('（' + todayRetain + '）');
    $('.shortRentState .totalNum8').html('（' + arrears + '）');
    $('.shortRentState .totalNum9').html('（' + reserve + '）');
    $('.shortRentState .totalNum10').html('（' + retain + '）');
    $('.shortRentState .totalNum13').html('（' + ordinaryRoom + '）');
    $('.shortRentState .totalNum14').html('（' + hourRoom + '）');
    $('.shortRentState .totalNum15').html('（' + freeRoom + '）');
}
//筛选查询短租房列表
function queryHouseTable(value){
    var houseList = JSON.parse(JSON.stringify(house_list_arr));
    var eventList = JSON.parse(JSON.stringify(event_list));
    var checkOutToday = new Date().format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
    checkOutToday = new Date(checkOutToday).getTime();
    var today = new Date().format("yyyy-MM-dd " + setUp.jsrsuCheckInTime +":00");
    today = new Date(today).getTime();
    var tomorrow = new Date(today).getTime()+1000*60*60*24;
    tomorrow = new Date(tomorrow).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
    var yesterday = new Date(today).getTime()-1000*60*60*24;
    yesterday = new Date(yesterday).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
    var house_save_list = [], event_save_list = [];
    for(var i in houseList){
        var checktime1 = checkTime(houseList[i].hsId,today,tomorrow,1);
        var checktime2 = checkTime(houseList[i].hsId,yesterday,today,1);
        //查询所有房间的列表
        if(value== '所有'){
            house_save_list.push(houseList[i]);
        }
        //查询房间状态
        if(checktime1.flag){//检查当天是否订单
            if(value== '空置干净' && houseList[i].hsDirtyHouse == 0){//干净房
                house_save_list.push(houseList[i]);
            }
            if(value== '空置保洁' && houseList[i].hsDirtyHouse == 1){//未保洁房
                house_save_list.push(houseList[i]);
            }
            if(value== '空置维修' && houseList[i].hsDirtyHouse == 2){//维修房
                house_save_list.push(houseList[i]);
            }
        }
        //查询当天预留的列表
        if(!checktime1.flag && checktime1.event.jsrcState =='保留'){
            if(value== '当天预订'){
                house_save_list.push(houseList[i]);
            }

        }
        //查询预离房间的列表
        if(!checktime2.flag && checktime2.event.jsrcState =='已住'){
            var endTime = new Date(checktime2.event.jsrcEndTime).getTime();
            if(checkOutToday == endTime){
                if(value== '当天预离'){
                    house_save_list.push(houseList[i]);
                }
            }
        }
    }
    for(var k in houseList){
        for(var j in eventList){
            if(eventList[j].jsrcHsId == houseList[k].hsId){
                //当天抵达的订单
                if(value== '当天抵达'){
                    if(eventList[j].jsrcState == '已住'){
                        var jsrcBeginTime = new Date(eventList[j].jsrcBeginTime).format("yyyy-MM-dd ");
                        var jsrcActualOccupancyTime = new Date(eventList[j].jsrcActualOccupancyTime).format("yyyy-MM-dd ");
                        if(jsrcBeginTime == jsrcActualOccupancyTime){
                            house_save_list.push(houseList[k]);
                        }
                    }
                }
                //查询欠费客房
                if(value== '欠款单客房' && eventList[j].jsrcState == '已住'){
                    if(eventList[j].jsrcArrears != 0 ){
                        house_save_list.push(houseList[k]);
                    }
                }
                //查询预定客房
                if(value== '预订客房'){
                    if(eventList[j].jsrcState =='预定' ){
                        house_save_list.push(houseList[k]);
                    }
                }
                //查询保留客房
                if(value== '保留客房'){
                    if(eventList[j].jsrcState =='保留' ){
                        house_save_list.push(houseList[k]);
                    }
                }
                //查询普通客房
                if(value== '普通客房'){
                    if(eventList[j].jsrcTypeOccupancy =='普通客房' ){
                        house_save_list.push(houseList[k]);
                    }
                }
                //查询钟点客房
                if(value== '钟点客房'){
                    if(eventList[j].jsrcTypeOccupancy =='钟点客房' ){
                        house_save_list.push(houseList[k]);
                    }
                }
                //查询免费客房
                if(value== '免费客房'){
                    if(eventList[j].jsrcTypeOccupancy =='免费客房' ){
                        house_save_list.push(houseList[k]);
                    }
                }
            }
        }
    }
    //对日历右侧的格子进行绘图
    draw_right_col(house_save_list)
    //对日历左侧房屋列表进行绘图
    draw_left_col(house_save_list)
    //加载短租订单到日历中显示
    load_events(event_list)
}
//刷新筛选操作
function reflashList(){
    $('.shortRentState .shortRent').removeClass('btn-info').addClass('btn-success');
    initInfo();
}

//入住办理下拉列表
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
                var htmls="<option value='全部'>全部</option>";
                var html="";
                var choiceHouseType = "";
                var tRoomType = "<option value=''>无</option>";
                var fastCheckInHomeTypeHtml = "<option value=''>请选择房型</option>";
                var planNumber = [];
                for(var i in newdata){
                    choiceHouseType += '<option value='+newdata[i].roomType+'>'+newdata[i].roomType;+'</option>';
                    htmls += '<option value='+newdata[i].roomType+'>'+newdata[i].roomType;+'</option>';
                    html += '<div style="margin: 10px 0 0 0px"><input class=jsrsuRoomTypeItem value='+newdata[i].roomType+' style="width:280px;" /><img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -5px 10px" /></div>';
                    tRoomType += '<option value='+newdata[i].roomType+'>'+newdata[i].roomType;+'</option>';
                    fastCheckInHomeTypeHtml += '<option value='+newdata[i].roomType+'>'+newdata[i].roomType;+'</option>';
                    planNumber.push(newdata[i].jsrrtpPlanNumber);
                }
                $('#choiceHouseType').html(choiceHouseType);
                $("#searchHouseType").html(htmls);
                $("#jsrsuRoomType").html(html);
                $("#tRoomType").html(tRoomType);
                $("#fastCheckInHomeType").html(fastCheckInHomeTypeHtml);
            }else{
                myTips(result.msg,"error")
            }

        }
    })
}

//查询所有渠道信息
function getChannelInfo(id,type){
    var channelType = $('#'+id+' .channelType').find('option:selected').val();
    $('#sceneButton .openCashBtn4').hide();
    $('.memberLevelDiv').hide();
    if(channelType == '会员'){
        $('.memberLevelDiv').show();
    }else if(channelType == '协议单位'){
        $('#sceneButton .openCashBtn4').show();
    }
    $.ajax({
        url:"../queryJourChannelUnit.action",
        type:"post",
        data:{
            jcuType:channelType,
        },
        success:function(data){
            if(data.code == 1){
                channelInfo = data.body;
                console.log(channelInfo);
                var html = '<option value=""></option>';
                var array = [];
                for(var i in channelInfo){
                    if(array.indexOf(channelInfo[i].jcuGroupType) == -1){
                        html += '<option value="'+channelInfo[i].jcuGroupType+'">'+channelInfo[i].jcuGroupType+'</option>'
                    }
                    array.push(channelInfo[i].jcuGroupType)
                }
                $('.groupType').html(html);
            }else{
                $('.groupType').html("<option></option>");
            }
        }
    });
}

/*
 * 检测重复的时间点，若有重复按优先级高的价格来存
 * 存储格式[{time:"2019-01-01",hotDailyPrice:"1.00"},{}...]
 **/
/*function changePlanPackage(data){
	data = JSON.parse(data)
	var planPackage = [], allDays = [];
	var oldMoney = "";
	for(var i in data){
		var beginTime = new Date(data[i].beginTime).format("yyyy-MM-dd 00:00:00");
		var endTime = new Date(data[i].endTime).format("yyyy-MM-dd 00:00:00");
		var hotDailyPrice = data[i].hotDailyPrice;
		while(beginTime<=endTime){
			var obj = {};
			var index = allDays.indexOf(beginTime);
			obj.time = beginTime;
			if(index == -1){
				obj.hotDailyPrice = hotDailyPrice;
				planPackage.push(obj)
				allDays.push(beginTime)
			}else{
				hotDailyPrice = oldMoney<=hotDailyPrice?hotDailyPrice:oldMoney
				obj.hotDailyPrice = hotDailyPrice;
				planPackage[index] = obj;
			}
			beginTime = getNextDate(beginTime,1);
		}
		oldMoney = hotDailyPrice;
	}
	return planPackage;
}*/

//选择房型显示空房数量，快速随机入住
function checkInRoomNum(){
    //获取选择的房型内容
    var fastCheckInHomeType=$('#fastCheckInHomeType').val();
    var roomList=[];											//定义一个数组
    var houseList = JSON.parse(JSON.stringify(house_list_arr)); //房屋信息
    var eventList = JSON.parse(JSON.stringify(event_list));		//订单信息
    var htmls="";
    for(var i in houseList){
        var hsRoomType=houseList[i].hsRoomType;			//获取房间类型
        if(houseList[i].hsDirtyHouse==0){			//房间为干净房
            var hsId=houseList[i].hsId;					//获取未租房间Id
            var startTime = new Date().format("yyyy-MM-dd");//今天时间
            var endTime=new Date().getTime()+ 24*60*60*1000;//明天时间
            endTime=new Date(endTime).format("yyyy-MM-dd");	//格式明天时间为Date格式
            var room=checkTime(hsId,startTime,endTime,0);	//调用查询空房间Id
            if(room){
                var hsAddCommunity=houseList[i].hsAddCommunity
                var hsAddBuilding=houseList[i].hsAddBuilding;
                var hsAddDoorplateno=houseList[i].hsAddDoorplateno;
                var obj={};
                if(hsRoomType==fastCheckInHomeType && fastCheckInHomeType != ""){//选择类型等于房间类型
                    var houSing=hsAddCommunity+" "+hsAddBuilding+" "+hsAddDoorplateno;	//获取筛选框标题
                    obj=houseList[i];
                    obj.houSing=houSing;
                    roomList.push(obj);
                    htmls += '<option label="'+fastCheckInHomeType+'" value="'+houSing+'" />'
                }
            }

        }
    }
    _checkInRoom =roomList;				//把适合房间放进去全局变量
    if(fastCheckInHomeType != ""){
        $('#checkInRoomNum').html("空房数量："+roomList.length);		//显示空房数量
    }else{
        $('#quickCheckIn1').val('');
        $('#checkInRoomNum').html("");		//显示空房数量
    }
    var n=parseInt(Math.random()*roomList.length);
    $("#checkInList1").html(htmls);

    if(roomList.length>0){
        var randomCommunity=roomList[n].hsAddCommunity
        var randomBuilding=roomList[n].hsAddBuilding;
        var randomDoorplateno=roomList[n].hsAddDoorplateno;
        var randomSing=randomCommunity+" "+randomBuilding+ " "+randomDoorplateno;
        if(fastCheckInHomeType != ''){
            $('#quickCheckIn1').val(randomSing);
        }else{
            $('#quickCheckIn1').val('');
        }
    }
    $('#quickCheckIn').val("");										//清空快速入住input内容
    $("#keyButtonId").attr("onclick","checkInKey1()");				//顶替onclick的内容

}
//快速随机选择入住
function checkInKey1(){
    //获取输入框的内容
    var quickCheckIn1=$('#quickCheckIn1').val();
    var obj  = {};
    for(var i in _checkInRoom){
        if(_checkInRoom[i].houSing==quickCheckIn1){
            var hsAddCommunity=_checkInRoom[i].hsAddCommunity;
            var hsAddBuilding=_checkInRoom[i].hsAddBuilding;
            var hsAddDoorplateno=_checkInRoom[i].hsAddDoorplateno;
            var hsRoomType=_checkInRoom[i].hsRoomType;
            //获取办理入住的标题
            _title_address=hsAddCommunity+" "+hsRoomType+" "+hsAddBuilding+" "+hsAddDoorplateno;
            obj = _checkInRoom[i];
        }
    }

    var startTime = new Date().format("yyyy-MM-dd"+" "+setUp.jsrsuCheckInTime);//今天时间
    var endTime=new Date().getTime()+ 24*60*60*1000;//明天时间
    endTime=new Date(endTime).format("yyyy-MM-dd "+" "+setUp.jsrsuCheckOutTime);	//格式明天时间为Date格式
    openAddShortRent(obj,startTime,endTime);		//调用办理入住方法
    $('#fastCheckInHomeType').val("");
    $('#quickCheckIn1').val("");
    $('#handle1').dialog('close');
}

function initFinancialAccount(){
    $.ajax({
        type:"post",
        url:"../selectFinancialAccount.action",
        data:{
            faId : _accountId
        },
        dataType:"json",
        success:function(data){
            if (data.code < 0) {
                myTips(data.msg, 'error');
            } else {
                _closeWay = data.body[0].faPaymentType;
            }
        }
    });
}

//短租下订单获取时间
var oldTime = "";
function timechData(){

    var dayPrice=parseFloat($('#dayPrice').val());
    var houseDeposit=parseFloat($('#houseDeposit').val());
    var typeOccupancy=$('#typeOccupancy').val();
    var jsrcHsId = $("#jsrcHsIdtwo").val();
    var resObj = getHouseData(jsrcHsId);

    var actualOccupancyTime = $('#actualOccupancyTime').val();
    var endDate = $('#endDate').val();
    oldTime = oldTime==""?endDate:oldTime;
    if(!checkTime(jsrcHsId,actualOccupancyTime,endDate,0) && oldTime != endDate){//所选时间段内有订单
        oldTime = endDate;
        myTips("所选时间段内已有订单")
    }

    if(typeOccupancy!="钟点客房"){
        var startTime = $("#startDate").val();
        var endTime = $("#endDate").val();

        var day = "", amountPayable = "", averagePrice = "";//day总天数   amountPayable总房价    averagePrice日均价
        if(endTime == ""){
            day = 0;
            amountPayable = 0;
            averagePrice = 0;
        }else{
            day = getDay(startTime,endTime);
            //计算周末
            // var weekdayResult = checkWeekend(startTime,endTime);
            // var weekday = weekdayResult.weekDays;
            // var ordinaryDay = day - weekday;
            //计算总价格
            // amountPayable = (ordinaryDay * resObj.hsDailyRent + weekday * resObj.hsHotDailyRent).toFixed(2);
            amountPayable = (dayPrice*day).toFixed(2);
            //计算日均价格
            averagePrice = (amountPayable / day).toFixed(2);
            // averagePrice = (dayPrice).toFixed(2);
            //显示选择周末
            // $('#fontTitle1').html("<div style='margin:5px 0 0 0'>所选时间段内含有"+weekday+"天周末，建议日均价格为"+averagePrice+"</div>");
        }
        $('#totalHousingPrice').val(amountPayable);	//总房价
        $('#totalDay').val(day);				//总天数
        $('#dayPrice').val(dayPrice);

        var deposit = $("#houseDeposit").val() == "" ? 0 : $("#houseDeposit").val();
        deposit = parseFloat(deposit).toFixed(2);
        var totalPrice = (parseFloat(deposit)  + parseFloat(amountPayable)).toFixed(2);
        var state = $("#jsrcState").val();
        if(state == "保留" || state == null || state == ""){
            //总房价
            $('#totalPrice').val(totalPrice);
            //应付付款金额
            $('#amountPayable').val(totalPrice);
            //金额显示
            $('#moneyText').html(totalPrice);
            $('#payMoneyText').val(totalPrice);
        }else if(state == "预定"){
            var accountPaid = $('#accountPaid').val();
            var money = (parseFloat(amountPayable) - parseFloat(accountPaid) + parseFloat(deposit)).toFixed(2);
            $('#amountPayable').val(money);
            $('#totalPrice').val(money);
            //金额显示
            $('#moneyText').html($('#amountPayable').val());
            $('#payMoneyText').val($('#amountPayable').val());
        }
    }else if(typeOccupancy=="钟点客房"){
        //押金
        var deposit = $("#houseDeposit").val() == "" ? 0 : $("#houseDeposit").val();
        var totalHousingPrice=$('#totalHousingPrice').val();		//获取总的房间价格
        //实付金额
        var amountPayable =(parseFloat(deposit) + parseFloat(totalHousingPrice)).toFixed(2);
        $('#amountPayable').val(amountPayable);				//应付金额
        $('#totalPrice').val(amountPayable);				//折后金额
        $('#payMoneyText').val(amountPayable);				//应退金额
        $('#moneyText').html(amountPayable);				//金额显示
    }
}

function timechData2(){
    var startTime = $("#startDate2").val();
    var endTime = $("#endDate2").val();
    if(startTime!="" && endTime != ""){
        //计算总的天数
        var day = getDay(startTime,endTime);
        $('#totalDay2').val(day);
        //计算总价格
        var jsrcHsId = $("#jsrcHsIdtwo").val();
        var resObj = getHouseData(jsrcHsId);
        //计算周末
        var weekdayResult = checkWeekend(startTime,endTime);
        var weekday = weekdayResult.weekDays;

        var ordinaryDay = day - weekday;

        var amountPayable = ordinaryDay * resObj.hsDailyRent + weekday * resObj.hsHotDailyRent;

        var totalPrice = parseFloat(amountPayable).toFixed(2);

        //获取实际入住时间
        var date = new Date();
        var actualOccupancyTime = date.format("yyyy-MM-dd hh:mm:ss");

        $('#actualOccupancyTime2').val(actualOccupancyTime);
        //实际付款金额
        $('#actualPayment2').val(totalPrice);
        //应付付款金额
        $('#amountPayable2').val(totalPrice);
        //总房价
        $('#totalPrice2').val(amountPayable);
        //计算日均价格
        var averagePrice = (amountPayable / day).toFixed(2);
        $('#dayPrice2').val(averagePrice);
        //显示选择周末
        $('#fontTitle').html("<div style='margin:10px 0 0 10px'>所选时间段内含有"+weekday+"天周末，建议日均价格为"+averagePrice+"</div>")
    }
}

/*
 * 	判断高峰时间段
 * 	 返回高峰时间的总价格和总天数
 * */
/*function checkHotDays(roomType,startDate,endDate){
	startDate = new Date(startDate).format("yyyy-MM-dd 00:00:00");
	endDate = new Date(endDate).format("yyyy-MM-dd 00:00:00");
	endDate = getNextDate(endDate, -1)
	var money = 0, hotDays = 0;;
	for(var i in planInfo){
		var planPackage = planInfo[i].jsrrtpPlanPackage
		if(roomType == planInfo[i].roomType){
			var allHotDays = [];
			while(startDate <= endDate){
				for(var j in planPackage){
					var time = planPackage[j].time
					if(startDate == time){
						hotDays++
						money = parseFloat(money) + parseFloat(planPackage[j].hotDailyPrice)
					}
					allHotDays.push(time)
				}
				startDate = getNextDate(startDate, 1)
			}
		}
	}

	var result = {
		totalDays:hotDays,
		totalMoney:money
	}

	return result;
}*/

//判断日期是不是周末
//返回共有周末多少天 和 是周末的日期
function checkWeekend(startDate,endDate) {
    var result = {};

    //计算周末日子需要换算成相同时分秒计算才准确
    startDate = new Date(startDate).format("yyyy-MM-dd 00:00:00");
    endDate = new Date(endDate).format("yyyy-MM-dd 00:00:00");

    var weekDaysArray = [];

    var weekDays = 0;// 开始日期和结束日期之间相隔的周末天数
    var count = 0;// 循环次数
    if(startDate <= endDate) {// 开始日期必须小于结束日期，防止死循环
        var nextDate = startDate;
        while(nextDate != endDate) {
            // 判断nextDate是否是周末，如果是周末则减去
            var day = new Date(nextDate).getDay();//5-周五，6-周六
            if(day==5 || day==6) {
                weekDays++;
                weekDaysArray.push(nextDate);
            }

            count++;
            if(count>=180) {// 防止死循环
                break;
            }

            nextDate = getNextDate(nextDate,1);
        }
    }
    result.weekDays = weekDays;
    result.weekDaysArray = weekDaysArray;

    return result;
}

/**
 * 获取输入时间 前 day 天 或者 后 day 天
 * 格式为yyyy-MM-dd hh:mm:ss
 */
function getNextDate(time,day){
    var date = new Date(time).getTime() + day * 1000 * 60 * 60 * 24;
    var newDate = new Date(date).format("yyyy-MM-dd hh:mm:ss");
    return newDate;
}

/**
 * 检查新订单时间内是否已经有其他订单
 * 传入未租房id，开始时间，结束时间
 * type=0返回 boolean类型 符合规则为true 不符为false
 * type=1返回 对象 flag符合规则为true 不符为false 并将不符合规则的合约对象返回
 */
function checkTime(hsId,startTime,endTime,type){
    var flag = true;
    var event = null;
    startTime = new Date(startTime).format("yyyy-MM-dd");
    endTime = getNextDate(endTime,-1);
    endTime = new Date(endTime).format("yyyy-MM-dd");
    startTime = new Date(startTime).getTime();
    endTime = new Date(endTime).getTime();
    
    for(var i in event_list){
        if(event_list[i].jsrcHsId == hsId){
            var data = event_list[i];
            var orderStartTime = new Date(data.jsrcBeginTime).format("yyyy-MM-dd");
            orderStartTime = new Date(orderStartTime).getTime();
            //因为退房当天也是可以租出去的
            var orderEndTime = new Date(data.jsrcEndTime).format("yyyy-MM-dd");
            orderEndTime = new Date(orderEndTime).getTime()- 24*60*60*1000;

            if(data.jsrcState == "退房" || data.jsrcState == "退定" || data.jsrcState == "取消保留"){
                continue;
            }

            if(startTime >= orderStartTime && startTime <= orderEndTime){
                //这是 查询结束时间 在订单的开始时间和结束时间内的
                flag = false;
                event = event_list[i];
                break;
            }

            if(endTime >= orderStartTime && endTime <= orderEndTime){
                //这是 查询开始时间 在订单的开始时间和结束时间内的
                flag = false;
                event = event_list[i];
                break;
            }

            if(startTime <= orderStartTime && endTime >= orderEndTime){
                //这是 查询时间包含订单时间的情况
                flag = false;
                event = event_list[i];
                break;
            }

        }
    }

    if(type == 0){
        return flag;
    }
    if(type == 1){
        var result = {};
        result.flag = flag;
        result.event = event;
        return result;
    }

}

function getDay(startDate,endDate){
    //之所以格式化后再转date是为了去掉后面 时分秒
    var start = new Date(formatDate(startDate)).getTime();
    var end = new Date(formatDate(endDate)).getTime();
    var zhi = start - end;
    var day = Math.abs(zhi / (1000 * 60 * 60 * 24));
    return day;
}
function becomeVip(){
	if($("#becomeVip").is(":checked")){
		$("#channelType").removeAttr("disabled");
		$("#groupType ").removeAttr("disabled");
	}else{
		if($("#channelType").val() == "门店"){
			$("#channelType").val("门店");
			getChannelInfo('checkInDlg1',0);
			setTimeout(function() {
				$("#groupType").val("散客");
		    	getHighestLevelPlan("checkInDlg1",0);
			}, 100)
		}
		$("#channelType").attr("disabled","disabled");
		$("#groupType ").attr("disabled","disabled");
	}
}

//授权单打开窗口
function authorizeOrder(resObj,jtoId){
    $('#house').val(JSON.stringify(resObj));
	$('.maxCreditDiv').hide();
    $('.memberLevelDiv').hide();
    $(".hsRoomType").val(resObj.hsRoomType);
    $("#jsrcHsIdtwo").val(resObj.hsId);
    
    $("#becomeVip").attr("checked",false);
    $(".channelType").attr("disabled","disabled");
    $(".groupType").attr("disabled","disabled");
    
    $('#moneyDiv').show();
    $('#endDate').removeAttr("disabled")
	$("#sceneButton").show();
    $(".clientCardReading").show();
    
    $.post("../selectBySelective.action",{
		jtoId:jtoId
	},function (result) {
        if(result.body == null){
            console.log("沒有查询到数据");
            document.getElementById("discountApplication").style.display="block";
            document.getElementById("cancleOrder").style.display="none";
            return;
        }else{
            var body =result.body[0];
            var data =body.jtoShortInfo;
            data =data.getRealJsonStr();
            var shortInfo =JSON.parse(data);
            
            if(shortInfo.channelType != "" && shortInfo.groupType != ""){
            	$("#channelType").val(shortInfo.channelType);
                getChannelInfo('checkInDlg1',0);
                setTimeout(function() {
                	$("#groupType").val(shortInfo.groupType);
                	getHighestLevelPlan("checkInDlg1",0,0);
                }, 100)
            }else{
            	$("#channelType").val("门店");
                getChannelInfo('checkInDlg1',0);
                setTimeout(function() {
                	$("#groupType").val("散客");
                	getHighestLevelPlan("checkInDlg1",0,0);
                }, 100)
            }
            
            $("#actualOccupancyTime").val(shortInfo.startDate);
            $("#endDate").val(shortInfo.endDate);
            $("#pricePlan").val(shortInfo.pricePlan);
            $("#allowCredit").val(shortInfo.allowCredit);
            $("#maxCredit").val(shortInfo.maxCredit);
            $("#memberLevel").val(shortInfo.memberLevel);
            $("#popCustomerNameTable").val(shortInfo.popCustomerNameTable);
            $("#popTelephoneTable").val(shortInfo.popTelephoneTable);
            $("#popNameRemarkTable").val(shortInfo.popNameRemarkTable);
            $("#popIdcardTable").val(shortInfo.popIdcardTable);
            $("#pop_idcard_type").val(shortInfo.pop_idcard_type);
            $("#popBirthTable").val(shortInfo.popBirthTable);
            $("#popIdcardAddressTable").val(shortInfo.popIdcardAddressTable);
            $("#popNationTable").val(shortInfo.popNationTable);
            $("#checkInNum").val(shortInfo.checkInNum);
            $("#totalDay").val(shortInfo.totalDay);
            $("#dayPrice").val(shortInfo.dayPrice);
            $("#houseDeposit").val(shortInfo.houseDeposit);
            $("#orderSource").val(shortInfo.orderSource);
            $("#totalHousingPrice").val(shortInfo.totalHousingPrice);
            $("#amountPayable").val(shortInfo.amountPayable);
            $("#accountPaid").val(shortInfo.accountPaid);
            $("#typeOccupancy ").val(shortInfo.typeOccupancy);
            $("#orderRemarks").val(shortInfo.orderRemarks);

            $('#payMoneyText').val(shortInfo.amountPayable);
            $("#orderMoney").html(shortInfo.amountPayable);

            if(body.jtoTakingStatus ==1){
                $("#totalPrice").val(body.jtoDiscountPrice);
                $("#moneyText").html(body.jtoDiscountPrice);
                $("#orderMoney").html(body.jtoDiscountPrice);
                $('#payMoneyText').val(shortInfo.amountPayable);
            }else{
                $("#moneyText").html(shortInfo.amountPayable);
                document.getElementById("discountApplication").style.display="none";
                document.getElementById("cancleOrder").style.display="block";
            }

        }
    });
	$('#checkInDlg1').dialog({
        title : _title_address + " 办理入住",
        top : getTop(520),
        left : getLeft(985),
        width : 985,
        height : 520,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#checkInDlg1 [clear="clear"]').val('');
            $('#addShortRentDlg [clear="clear"]').val('');
            $('#checkInDlg1 [clean="clean"]').html('');
            $('#checkInDlg1 [require]').css('border', '1px solid #a9a9a9');
            $("#sceneButton").hide();
            $("#retainButton").hide();
            $(".clientCardReading").hide();
            $("#addLiveMan").hide();
            $("#moneyText").html("")
            $("#popImg").attr("src","images/userImage.png");
            $('#houseDeposit').val('');
            $('#pop_idcard_type').val('身份证/临时身份证/户口本');
            $("#customerInfoTable").datagrid("loadData", { total: 0, rows: [] });
            $("#typeOccupancy").val("普通客房");
            document.getElementById("discountApplication").style.display="block";
            document.getElementById("cancleOrder").style.display="none";
            $("#hourOccupancyTimeBox").css("display","none");
            $(".actualOccupancyTime").css("display","block");
            $(".endDate").css("display","block");
            $(".hourEndDate").css("display","none");

            $("#checkInDlg1 [clear=clear]").each(function () {
                $(this).removeAttr("disabled");
            });
            $("#becomeVip").removeAttr("disabled");
        }
    });
    $('#checkInDlg1').dialog('open');
}

function openAddShortRent(resObj,startDate,endDate){
	/*	var nowDate = formatDate(new Date());
	$("#"+resObj.hsId+nowDate).empty();*/
    var currentTime =formatDate(new Date());
    console.log(currentTime);
    $("#hourOccupancyTime").val(currentTime);
    $("#hourEndDate").val(currentTime);
    var jsrsuHourRoom=setUp.jsrsuHourRoom;						//获取钟点房间规则
    var hourRoom=Number(JSON.parse(jsrsuHourRoom).hourRoom);				//获取钟点房时间
    var length = hour_time.length;
    var endTime =Number(hour_time[0].split(":")[0])+hourRoom+":00";
    $("#hourEndSelect").append("<option value='" + endTime + "'>"+endTime+"</option>");
    for(var i=0;i<length-1;i++){
        var max =Number(hour_time[length-1].split(":")[0]);
        var min =Number(hour_time[i].split(":")[0])+hourRoom;
        var beginTime =Number(hour_time[i].split(":")[0])+":00";
        if(min <=max){
            var beginTime = hour_time[i];
            $("#hourStartSelect").append("<option value='" + beginTime + "'>"+beginTime+"</option>")
        }
    };

	$("#hsAddCommunity").val(resObj.hsAddCommunity);
    $('.maxCreditDiv').hide();
    $('.memberLevelDiv').hide();
    $(".hsRoomType").val(resObj.hsRoomType);
    $("#jsrcHsIdtwo").val(resObj.hsId);
    var timestamp=new Date().format("yyyy-MM-dd");//当前时间
    var date=new Date(startDate).format("yyyy-MM-dd");//获取startDate转换格式
    var todayTime=new Date(timestamp).getTime();
    var yesterdayTime=todayTime-24*60*60*1000;
    var startTime=new Date(date).getTime();
    
    $("#becomeVip").attr("checked",false);
    $(".channelType").attr("disabled","disabled");
    $(".groupType").attr("disabled","disabled");
    
//	var hotDaysInfo = checkHotDays(resObj.hsRoomType,startDate,endDate);
    //订单时间包括今天或昨天，下入住单
    if(yesterdayTime == startTime ||todayTime==startTime){
    	$("#checkInDlg1 .channelType").val("门店");
        getChannelInfo('checkInDlg1',0);
        setTimeout(function() {
        	$("#checkInDlg1 .groupType").val("散客");
        	getHighestLevelPlan("checkInDlg1",0);
        }, 100)

        $('#moneyDiv').show();
        $('#endDate').removeAttr("disabled")

        $('#startDate').val(startDate);
        $('#endDate').val(endDate);
        $('#retainEndTime').val(endDate);

        var days = getDay(startDate,endDate);
        $('#totalDay').val(days);

        $('#house').val(JSON.stringify(resObj));
        /*var weekdayResult = checkWeekend(startDate,endDate);

		var weekday = weekdayResult.weekDays;

		var ordinaryDay = days - weekday;

		var totalHousingPrice = (ordinaryDay * resObj.hsDailyRent + weekday * resObj.hsHotDailyRent).toFixed(2); //总房价
		var averagePrice = (totalHousingPrice / days).toFixed(2);	//日均价

		//押金
		var deposit = "";
		if(setUp.jsrsuDepositSetType != ""){
			var jsrsuDepositSetType = JSON.parse(setUp.jsrsuDepositSetType);
			if(jsrsuDepositSetType.type == 0){
				deposit = (((averagePrice/100)+0.49)*100).toFixed(2);	//押金
			}else{
				deposit = jsrsuDepositSetType.depositMoney
			}
		}

		var amountPayable = (parseFloat(totalHousingPrice) + parseFloat(deposit)).toFixed(2);	//实际应付

		//押金显示
		$("#houseDeposit").val(deposit);
		$('#dayPrice').val(averagePrice);
		$('#totalPrice').val(amountPayable);
		$('#amountPayable').val(amountPayable);
		$('#totalHousingPrice').val(totalHousingPrice);
		$('#accountPaid').val('0.00');
		//金额显示
		$('#moneyText').html(amountPayable);
		$('#payMoneyText').val(amountPayable);*/
        //获取实际入住时间
        var actualOccupancyTime = new Date(startDate).format("yyyy-MM-dd hh:mm:ss");
        $('#actualOccupancyTime').val(actualOccupancyTime);
        //将钟点房价格存起来
        $('#stoTimePrice').val(resObj.hsTimePrice);
        $("#sceneButton").show();
        $(".clientCardReading").show();
        $('#checkInDlg1').dialog({
            title : _title_address + " 办理入住",
            top : getTop(520),
            left : getLeft(985),
            width : 985,
            height : 520,
            closed : true,
            cache : false,
            modal : true,
            onClose : function() {
                $('#checkInDlg1 [clear="clear"]').val('');
                $('#addShortRentDlg [clear="clear"]').val('');
                $('#checkInDlg1 [clean="clean"]').html('');
                $('#checkInDlg1 [require]').css('border', '1px solid #a9a9a9');
                $("#sceneButton").hide();
                $("#retainButton").hide();
                $(".clientCardReading").hide();
                $("#addLiveMan").hide();
                $("#moneyText").html("")
                $("#popImg").attr("src","images/userImage.png");
                $('#houseDeposit').val('');
                $('#pop_idcard_type').val('身份证/临时身份证/户口本');
                $("#customerInfoTable").datagrid("loadData", { total: 0, rows: [] });
                $('#doorCardJson').val('');
                $("#typeOccupancy").val("普通客房");
                $("#orderSource").val("上门客户");
                $("#hourOccupancyTimeBox").css("display","none");
                $(".actualOccupancyTime").css("display","block");
                $(".endDate").css("display","block");
                $(".hourEndDate").css("display","none");

                $("#checkInDlg1 [clear=clear]").each(function () {
                    $(this).removeAttr("disabled");
                });
                $("#becomeVip").removeAttr("disabled");
            }
        });
        $('#checkInDlg1').dialog('open');
    }
    //保留订单
    else{
    	$("#addShortRentDlg .channelType").val("门店");
        getChannelInfo('addShortRentDlg',1);
        setTimeout(function() {
        	$("#addShortRentDlg .groupType").val("散客");
        	getHighestLevelPlan("addShortRentDlg",1);
        }, 100)
        $('#startDate2').val(startDate);
        $('#endDate2').val(endDate);

        var days = getDay(startDate,endDate);
        $('#totalDay2').val(days);

        $('#house').val(JSON.stringify(resObj));

        /*var weekdayResult = checkWeekend(startDate,endDate);

		var weekday = weekdayResult.weekDays;

		var ordinaryDay = days - weekday;

		var amountPayable = (ordinaryDay * resObj.hsDailyRent + weekday * resObj.hsHotDailyRent).toFixed(2);

		var averagePrice = (amountPayable / days).toFixed(2);*/

        //获取实际入住时间
        var date = new Date();
        var actualOccupancyTime = date.format("yyyy-MM-dd hh:mm:ss");

        /*$('#dayPrice2').val(averagePrice);
		$('#totalPrice2').val(amountPayable);
		$('#amountPayable2').val(amountPayable);*/

//		$('#fontTitle').html("<div style='margin:10px 0 0 10px'>所选时间段内含有"+weekday+"天节假日，建议日均价格为"+averagePrice+"</div>")

        $('#addShortRentDlg').dialog({
            title : _title_address + " 下保留订单",
            top : getTop(270),
            left : getLeft(560),
            width : 560,
            height : 270,
            closed : true,
            cache : false,
            modal : true,
            onClose : function() {
                $('#checkInDlg1 [clear="clear"]').val('');
                $('#addShortRentDlg [clear="clear"]').val('');
                $('#addShortRentDlg [clean="clean"]').html('');
                $('#addShortRentDlg [require]').css('border', '1px solid #a9a9a9');

                $('#houseDeposit').val('');
            }
        });
        $('#addShortRentDlg').dialog('open');
    }
}

//写跟进
function openFollowUp(){

    $('#followUpDlg').dialog({
        title : _title_address + " 写跟进",
        top : getTop(280),
        left : getLeft(300),
        width : 400,
        height : 230,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#followUpType').val('手动跟进');
            $("#Record").val("");
            $("#reminderTime").val("");
            $("#reminderContent").val("");
        }
    });
    $('#RecordDiv').show();
    $('#reminderTimeDiv').hide();
    $('#reminderContentDiv').hide();
    $('#followUpDlg').dialog('open');

}
//选择操作类型
function followUpType(){
    var manualFollowUp=$('#followUpType').val();
    if(manualFollowUp=='手动跟进'){
        $('#RecordDiv').show();
        $('#reminderTimeDiv').hide();
        $('#reminderContentDiv').hide();
    }else {
        $('#RecordDiv').hide();
        $('#reminderTimeDiv').show();
        $('#reminderContentDiv').show();
    }
}

//确认跟进记录
function operation(){
    var manualFollowUp=$('#followUpType').val();

    if(manualFollowUp=='手动跟进'){
        var text=$("#Record").val();
    }else{
        var time=$('#reminderTime').val();
        var content=$("#reminderContent").val();
        var notReminded='未提醒';
        var text='{"remindTime":"'+time+'",'+'"remindContent":"'+content+'",'+'"state":"'+notReminded+'"}';
    }
    var type=$("#followUpType").val();
    var follow = {
        text : text,
        time : new Date().format("yyyy-MM-dd hh:mm:ss"),
        type: type,
        registrantName : _loginUserName
    }
    var oldjsrcFollow = $('#jsrcFollow').val();
    var rows = JSON.parse(oldjsrcFollow.substring(1, oldjsrcFollow.length-1));

    if(rows.length == 0){
        follow = "["+JSON.stringify(follow)+"]";
    }else{
        rows.push(follow);
        follow =JSON.stringify(rows);
    }
    var jsrcFollow=follow;

    var jsrcId = $('#jsrcId').val();
    $.ajax({
        type:"post",
        url:"../updateShortRent.action",
        data:{
            jsrcId:jsrcId,
            jsrcFollow:jsrcFollow
        },
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
                myTips("写进成功","success");
                $('#followUpDlg').dialog('close');
                var newFollow = JSON.parse(follow);
                newFollow.reverse();
                jsrcFollow = '"'+jsrcFollow+'"'
                $('#jsrcFollow').val(jsrcFollow);
                $('#followDg').datagrid('loadData', newFollow);
            }else{
                myTips(data.msg,"error");
            }
        }
    })
}

function openCheckIn(){
    $('.maxCreditDiv').hide();
    $('.memberLevelDiv').hide();
    $("#checkInDlg1 .channelType").val("门店");
    getChannelInfo('checkInDlg1',0);
    setTimeout(function() {
    	$("#checkInDlg1 .groupType").val("散客");
    	getHighestLevelPlan("checkInDlg1",0);
    }, 100)
    
    var date = new Date().format("yyyy-MM-dd hh:mm:ss");
    var state = $("#jsrcState").val();
    if(state == "预定" || state == "保留"){
        $("#actualOccupancyTime").val($('#jsrcBeginTime').val());
    }else{
        $("#actualOccupancyTime").val(date);
    }

    var amountOfDiscount = $("#amountOfDiscount").val();
    $("#startDate").val($("#jsrcBeginTime").val());
    $("#endDate").val($("#jsrcEndTime").val());
    $("#totalDay").val($("#jsrcTotalDays").val());
    $("#dayPrice").val($("#jsrcDailyPrice").val());

    var jsrcDeposit = $("#jsrcDeposit").val();
    if(jsrcDeposit == ""){
        $("#houseDeposit").val("0.00");
    }else{
        $("#houseDeposit").val(jsrcDeposit);
    }

    $("#totalHousingPrice").val($("#jsrcAmountPayable").val());

    $("#jsrcHsIdtwo").val($("#jsrcHsId").val());
    $("#startDate").attr("onfocus","");

    var money = "0.00";
    var totalPrice = $('#totalPrice1').val();
    var jsrcDepositPayType = $('#jsrcDepositPayType').val(); //押金支付方式 type=0为线上 type=1为现场
    if(state == "预定"){
        $('#endDate').attr("disabled",true)
        var firstPay = $('#jsrcFirstPay').val();
        $("#accountPaid").val(firstPay);
        if(jsrcDepositPayType == 1){
            money = (parseFloat(totalPrice)-parseFloat(firstPay)).toFixed(2);
            $("#retainButton").show();
        }else{
            $('#moneyDiv').hide();
            $('#checkIn').show();
        }
    }else{
        $('#endDate').removeAttr("disabled")
        $("#accountPaid").val('0.00');
        $("#payMoneyText").val(parseFloat(amountOfDiscount).toFixed(2));
        $("#retainButton").show();
        $('#moneyDiv').show();
        $('#checkIn').hide();
        money = parseFloat(totalPrice).toFixed(2);
    }
    $("#amountPayable").val(totalPrice);
    $("#totalPrice").val(totalPrice);
    $("#moneyText").html(money);
    $("#payMoneyText").val(money);

    $(".clientCardReading").show();

    var jsrcState = $("#jsrcState").val();

    $('#checkInDlg1').dialog({
        title : _title_address + " 办理入住",
        top : getTop(520),
        left : getLeft(985),
        width : 985,
        height : 520,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#checkInDlg1 [clear="clear"]').val('');
            $('#addShortRentDlg [clear="clear"]').val('');
            $('#checkInDlg1 [clean="clean"]').html('');
            $('#checkInDlg1 [require]').css('border', '1px solid #a9a9a9');
            $("#sceneButton").hide();
            $("#retainButton").hide();
            $("#checkIn").hide();
            $(".clientCardReading").hide();
            $("#addLiveMan").hide();
            $("#moneyText").html("");
            $('#houseDeposit').val('');
            $("#popImg").attr("src","images/userImage.png");
            $('#pop_idcard_type').val('身份证/临时身份证/户口本');
            $("#customerInfoTable").datagrid("loadData", { total: 0, rows: [] });
            $('#doorCardJson').val('');
        },
    });
    $('#checkInDlg1').dialog('open');

}

//type为付款方式 : 1为现金收银; 2为扫码收银; 3为台卡收银; 4为直接办理入住； 5为挂账入住
function doCheckIn(type,cut){
    var hsId = $('#jsrcHsId').val();
    var house = getHouseData(hsId);
    if(house.hsDirtyHouse == 1){
        myTips("该房间尚未清洁，不能入住","error");
        return;
    }
    if(house.hsDirtyHouse == 2){
        myTips("房间正在维修，请选择别的房间","error");
        return;
    }
    var address = house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno;

    var rentData = $("#customerInfoTable").datagrid("getRows"); //同住人列表信息
    var popName = $('#popCustomerNameTable').val();
    var popTelephone = $('#popTelephoneTable').val();
    var popIdcard = $('#popIdcardTable').val();
    var popNameRemark = $('#popNameRemarkTable').val();
    var popBirth = $('#popBirthTable').val();
    var popNation = $('#popNationTable').val();
    var popIdcardAddress = $('#popIdcardAddressTable').val();
    var popIdcardJson = $("#checkInDlg1").find(".clientPopIdcardJson").val();
    var jsrrVipLevel = $("#checkInDlg1").find(".memberLevel").val();
    var jsrrChannelId = $("#checkInDlg1").find(".jcuId").val();

    var renterName="";
    var obj = {
        popName : popName,
        popNameRemark : popNameRemark,
        popIdcard : popIdcard,
        popTelephone : popTelephone,
        popBirth : popBirth,
        popNation : popNation,
        popIdcardAddress : popIdcardAddress,
        popIdcardJson : popIdcardJson,
        popUser : _loginUserId,
    }
    if(popName != "" && popTelephone != "" && popIdcard !=""){
        if(rentData.length != 0){
            for(var i in rentData){
                if(popIdcard != rentData[i].popIdcard){
                    rentData.push(obj);
                }
            }
            //跟进和收支中的归属人
            renterName = rentData[rentData.length -1].popName;
        }else{
            rentData.push(obj);
            renterName = popName;
        }
    }else{
        if(rentData.length==0){
            if(popName == ""){
                myTips("名字不能为空","error");
                return;
            }
            if(popTelephone ==""){
                myTips("手机号不能为空","error");
                return;
            }
            if(popIdcard == ""){
                myTips("身份证不能为空","error");
                return;
            }
        }
    }
    /*var renterName = "";
    if(popName != "" && popTelephone != "" && popIdcard !=""){
        var obj = {
            popName 		: popName,
            popNameRemark 	: popNameRemark,
            popIdcard 		: popIdcard,
            popTelephone 	: popTelephone,
            popBirth 		: popBirth,
            popNation 		: popNation,
            popIdcardAddress: popIdcardAddress,
            popIdcardJson 	: popIdcardJson,
            popUser 		: _loginUserId,
            jsrrVipLevel 	: jsrrVipLevel,
            jsrrChannelId 	: jsrrChannelId,
            
        }
        rentData.push(obj);
    }else{
        if(rentData.length == 0){
            if(popName == ""){
                myTips("名字不能为空","error");
                return;
            }
            if(popPhone ==""){
                myTips("手机号不能为空","error");
                return;
            }
            if(popIdcard == ""){
                myTips("身份证不能为空","error");
                return;
            }
            renterName = popName;
        }else{
            //跟进和收支中的归属人
            renterName = rentData[rentData.length -1].popName;
        }
    }*/
    var rentAry = JSON.stringify(rentData);

    var jsrcDeposit = $('#houseDeposit').val();
    if(jsrcDeposit == null || jsrcDeposit == ""){
        myTips("房屋押金不能为空","error");
        return;
    }

    var moneyInput = $('#moneyInput').val();
    var totalPrice = $('#moneyText').text();
    if(type == 1){
        if(moneyInput == ""){
            myTips("请输入收款金额","error");
            return;
        }
    }

    var jsrcId = $('#jsrcId').val();
    var jsrcHsId = house.hsId;

    var jsrcState = "已住";
    var jsrcUserId = _loginUserId;
    var jrscTotalDays=$("#jsrcTotalDays").val();
    var jsrcEndTime=$("#jsrcEndTime").val();
    var sumMoney = $('#totalHousingPrice').val();
    var jsrcActualOccupancyTime=new Date().format('yyyy-MM-dd hh:mm:ss');
    var jsrcOrderSource = $('#orderSource').find('option:selected').val();

    var jsrcTypeOccupancy=$('#typeOccupancy').val();						//入住类型

    //var text = "给 "+nameList +" 办理 " +address+" 房间的入住";
    //客户【姓名】办理入住【地址】房间，预离时间：【预离时间】，总天数：【总天数】，缴纳押金：【房间押金】。
    var text ="客户 "+renterName+" 办理 " +address+"房间"+","+"预离时间:"+jsrcEndTime+","+"总天数:"+jrscTotalDays+","+"缴纳押金:"+jsrcDeposit;

    var jsrcFollow = creatFollow(text,1);


    var oldjsrcFollow = $('#jsrcFollow').val();
    if(oldjsrcFollow != ""){
        var follow = JSON.parse(oldjsrcFollow.substring(1, oldjsrcFollow.length-1));

        follow.push(jsrcFollow);

        jsrcFollow = JSON.stringify(follow);
    }else{
        jsrcFollow = creatFollow(text);
    }

    var jsrrCustomerType = $("#customerSelect option:selected").val();

    var totalHousingPrice = $('#totalHousingPrice').val();
    var jsrcTotalPrice = (parseFloat(jsrcDeposit) + parseFloat(totalHousingPrice)).toFixed(2); //实付金额（首次支付和后续支付 总金额）
    var data = {
        jsrcId:jsrcId,
        jsrcHsId:jsrcHsId,
        jsrcDeposit:jsrcDeposit,
        jsrcTotalPrice:jsrcTotalPrice,
        jsrcState:jsrcState,
        rentJson:rentAry,
        jsrcUserId:jsrcUserId,
        departmentId : _loginDepartment,
        jsrcTypeOccupancy:jsrcTypeOccupancy,	//入住类型
        storeId:_loginStore,
        jsrcFollow:jsrcFollow,
        jsrcActualOccupancyTime:jsrcActualOccupancyTime,
        jsrrCustomerType:jsrrCustomerType,
        jsrcOrderSource:jsrcOrderSource,
        type:type,
        jsrcOrderState:1,
        doorCardJson:$("#doorCardJson").val() 	//发卡信息
    }

    if(type == 2){
        data.authCode = moneyInput;
        data.wxpayBody = "扫码支付";
        data.totalPrice = parseFloat(totalPrice).toFixed(2);
    }

    showLoading();
    $.ajax({
        url:"../retainCheckIn.action",
        data:data,
        type:"post",
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
            	sessionStorage.refreshDiagram = 0;
                if(type != 4){
                    var renterID = data.body;
                    var jfBelongToChannel = $('#checkInDlg1 .jcuId').val();
                    var jfPricePlan = $('#checkInDlg1 .jcuPricePlanId').val();
                    var	jfSettlementMethod = type==5?"挂账":"现结";
                    var jfCreditSituation = type==5?1:0;

                    var jfAry = [];
                    //收支
                    var jfObj = {
                        department : _loginDepartment,
                        storefront : _loginStore,
                        jfTheCashierPeople : _loginUserId,
                        jfBillingDate : new Date().format("yyyy-MM-dd hh:mm:ss"),
                        jfHandlers : _loginUserId,
                        jfHouseId : house.hsHouseId,
                        jfHouse4storeId : house.hsId,
                        jfLandlordId : house.hsLandlordId,
                        jfTheOwnershipType : "租客",
                        jfBelongingToTheName : renterName,
                        jfOperationRecords : "("+ new Date().format("yyyy-MM-dd hh:mm:ss") + ",添加收支记录)*",
                        jfFinancialCoding : new Date().format("yyyyMMddhhmmss")+ parseInt(Math.random() * 10) +  parseInt(Math.random() * 10) + parseInt(Math.random() * 10),
                        jfStartCycle : new Date().format("yyyy-MM-dd"),
                        jfEndCycle : getNextMonth(new Date().format("yyyy-MM-dd")),
                        jfAccountingWhy :  house.hsAddDistrict+ house.hsAddZone+ house.hsAddStreet+ house.hsAddCommunity+ house.hsAddBuilding+ house.hsAddDoorplateno,
                        jfRenterId : renterID,
                        jfJsrcId : jsrcId,
                        jfBelongToChannel : jfBelongToChannel,
                        jfPricePlan : jfPricePlan,
                        jfSettlementMethod : jfSettlementMethod,
                        jfCreditSituation : jfCreditSituation
                    }

                    var jfFinanNote =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行入住办理,获得押金";
                    jfObj.jfPayType = "现钞";
                    jfObj.jfAccountingSpecies = "房屋押金";
                    jfObj.jfBigType = "押金类";
                    jfObj.jfNatureOfThe = "收入";
                    jfObj.jfClosedWay = _closeWay;
                    jfObj.jfAccountId = (type == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
                    jfObj.jfSumMoney = jsrcDeposit;
                    jfObj.jfFinanNote = jfFinanNote;

                    var jfObj1 = JSON.parse(JSON.stringify(jfObj));
                    jfFinanNote =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行入住办理,获得租金";
                    jfObj1.jfPayType = "现钞";
                    jfObj1.jfAccountingSpecies = "租金";
                    jfObj1.jfBigType = "主营类";
                    jfObj1.jfNatureOfThe = "收入";
                    jfObj1.jfClosedWay = _closeWay;
                    jfObj1.jfAccountId = (type == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
                    jfObj1.jfSumMoney = parseFloat(sumMoney).toFixed(2);
                    jfObj1.jfFinanNote = jfFinanNote;

                    jfAry.push(jfObj);
                    jfAry.push(jfObj1);

                    jfAry = JSON.stringify(jfAry);

                    $.ajax({
                        url:"../insertFinancialAll.action",
                        data:{
                            jsonArray : jfAry
                        },
                        type:"post",
                        dataType:"json",
                        success:function(result){
                            if(result.code == 1){
                                myTips("办理入住成功","success");
                                $('#checkOutDlg').dialog("close");
                                $('#checkInDlg1').dialog("close");
                                $('#openCashDlg').dialog("close");
                                if(cut==2){
                                    queryDiagram()
                                }
                                getListContract();


                                return;
                            }else{
                                myTips(result.msg,"error");
                                return;
                            }
                        }
                    });
                }
                myTips("办理入住成功","success");
                $('#checkOutDlg').dialog("close");
                $('#checkInDlg1').dialog("close");
                $('#openCashDlg').dialog("close");
                if(cut==2){
                    queryDiagram()
                }
                getListContract();
            }else{
                myTips(data.msg,"error");
            }
        }
    })
}

//读取身份证点击事件
$("#checkInDlg1").delegate(".clientCardReading","click",function(){
    $this = $(this);
    var className = $(this).attr('class');

    new Device().startFun(className);
    setTimeout(function() {
        var popIdcard = $('#popIdcardTable').val();
        for(var i in renterInfo){
            var infoPopulation = renterInfo[i].infoPopulation;
            if(popIdcard != "" && infoPopulation.popIdcard == popIdcard){
                $('#popTelephoneTable').val(infoPopulation.popTelephone);
                $('#popNameRemarkTable').val(infoPopulation.popNameRemark);
                $('#checkInNum').val(renterInfo[i].jsrrCheckInNum);
                var jcuType = renterInfo[i].jcuType;
                var jcuGroupType = renterInfo[i].jcuGroupType;
                //加载群体分类下拉列表 顺序不能换！！！
            	$('#checkInDlg1 .groupType').val("");
                if(renterInfo[i].jcuType != undefined && renterInfo[i].jcuGroupType != undefined 
                		&& renterInfo[i].jcuType != null && renterInfo[i].jcuGroupType != null ){
                	$('#checkInDlg1 .channelType').val(renterInfo[i].jcuType);
                	getChannelInfo('checkInDlg1',0);
                    $('#checkInDlg1 .groupType').val(renterInfo[i].jcuGroupType);
                    console.log($('#checkInDlg1 .groupType').val())
                }else{
                	$('#checkInDlg1 .channelType').val("门店");
                	getChannelInfo('checkInDlg1',0);
                    $('#checkInDlg1 .groupType').val("散客");
                }
                getHighestLevelPlan("checkInDlg1",0);
            }
        }
    }, 1000);
});


$("#addLiveMan").click(function(){
    var popIdcard = $("#checkInDlg1").find(".clientIdcard").val();
    var popPhone = $("#checkInDlg1").find(".clientPhone").val();


    if(popIdcard == ""){
        myTips("身份证不能为空","error");
        return;
    }
    if(popPhone ==""){
        myTips("手机号不能为空","error");
        return;
    }

    if(popName == ""){
        myTips("名字不能为空","error");
        return;
    }

    var rows = $("#customerInfoTable").datagrid("getRows");
    if(rows.length > 0){
        for(var i in rows){
            var	old=rows[i].popIdcard;
            if(old==popIdcard){
                myTips("该客人已经存在","error");
                return;
            }
        }
    }

    var obj = {};
    var popName = $("#checkInDlg1").find(".clientName").val();
    var popNameRemark = $("#checkInDlg1").find(".clientNameRemarks").val();

    var popTelephone = $("#checkInDlg1").find(".clientPhone").val();
    var popBirth = $("#checkInDlg1").find(".clientBirth").val();
    var popSex = $("#checkInDlg1").find(".clientSex").val();
    var popNation = $("#checkInDlg1").find(".clientNation").val();
    var popIdcardAddress = $("#checkInDlg1").find(".clientIdcardAddress").val();
    var popIdcardJson = $("#checkInDlg1").find(".clientPopIdcardJson").val();
    var jsrrVipLevel = $("#checkInDlg1").find(".memberLevel").val();
    var jsrrChannelId = $("#checkInDlg1").find(".jcuPricePlanId").val();

    obj.popName = popName;
    obj.popNameRemark = popNameRemark;
    obj.popIdcard = popIdcard;
    obj.popTelephone = popTelephone;
    obj.popBirth = popBirth;
    obj.popSex = popSex;
    obj.popNation = popNation;
    obj.popIdcardAddress = popIdcardAddress;
    obj.popIdcardJson = popIdcardJson;
    obj.popRemove='删除';
    obj.popUser = _loginUserId;
    if(rows.length == 0){
        obj.jsrrVipLevel = jsrrVipLevel;
        obj.jsrrChannelId = jsrrChannelId;
    }

    rows.push(obj);
    $("#popImg").attr("src","images/userImage.png");
    $('#customerInfoTable').datagrid('loadData', rows);
    $('#renterInfo [clear="clear"]').val('');
    $(".clientCardReading").show();
    $("#addLiveMan").hide();
    //判定居住人数
    var titleAddress=_title_address;

    var houseList = house_list_arr; //房屋信息
    //获取房间门牌号信息
    for(var i in houseList){
        var hsAddCommunity=houseList[i].hsAddCommunity
        var hsRoomType=houseList[i].hsRoomType;
        var hsAddDoorplateno=houseList[i].hsAddDoorplateno;
        var hsResidentiality=houseList[i].hsResidentiality;
        var houseAddressName=hsAddCommunity+" "+hsRoomType+" "+hsAddDoorplateno;
        if(houseAddressName==titleAddress){
            break;
        }
    }

    var rows = $("#customerInfoTable").datagrid("getRows");
    if(rows.length>hsResidentiality){

        myTips("入住人数超过房间可居住人数","error");
        return;
    }
});

//查询渠道信息 	type=0为办理入住窗口 ; type=1为保留窗口 ; authorize为授权单
function getHighestLevelPlan(id,type,authorize){
    var	channelType = $('#'+id+' .channelType').find('option:selected').val();
    var	groupType = $('#'+id+' .groupType').find('option:selected').val();
    console.log(channelType)
    if(channelType == ""){
        myTips("请先选择类型","error");
        $('#groupType').val("");
        return;
    }
    if(groupType == ""){
        $('#groupType').val("");
        return;
    }

    $.ajax({
        url:"../queryHighestLevelPlan.action",
        type:"post",
        data:{
            jcuType:channelType,
            jcuGroupType:groupType,
        },
        success:function(data){
            if(data.code == 1){
                data = data.body;

                //因为只会查询出一条优先级最高的方案，所以不用循环遍历
                $('#'+id+' .jcuPricePlanId').val(data[0].jcuPricePlanId);
                $('#'+id+' .jcuId').val(data[0].jcuId);
                $('#'+id+' .channelType').val(data[0].jcuType);
                $('#'+id+' .groupType').val(data[0].jcuGroupType);
                $('#'+id+' .maxCredit').val(data[0].jcuMaxCredit);
                $('#'+id+' .pricePlan').val(data[0].jppPlanName);
                $('#'+id+' .memberLevel').val(data[0].jcuMemberLevel);
            	if(data[0].jcuAllowCredit == 1){
                    $('#'+id+' .allowCredit').val('是');
                    $('#'+id+' .maxCreditDiv').show();
                }else{
                    $('#'+id+' .allowCredit').val('否');
                    $('#'+id+' .maxCreditDiv').hide();
                }
                planPackage = JSON.parse(data[0].jppPlanPackage);
                if(authorize != ""){
                	 calculatedMoney(planPackage,type);
                }
            }else{
                myTips(data.msg,"error")
                return;
            }
        }
    });
}

//计算金额
function calculatedMoney(data,type){
    var hsRoomType = $('.hsRoomType').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var typeOccupancy =$("#typeOccupancy").val();
    for(var i in data){
        if(data[i].roomType == hsRoomType){

            if(type == 0){

                if(typeOccupancy =="普通客房"){

                    var totalDay = $('#totalDay').val();
                    //总房价
                    var totalHousingPrice = data[i].price*totalDay;
                    //日均价格
                    var averagePrice = (totalHousingPrice / totalDay).toFixed(2);
                    //押金
                    var deposit = "";
                    if(setUp.jsrsuDepositSetType != ""){
                        var jsrsuDepositSetType = JSON.parse(setUp.jsrsuDepositSetType);
                        if(jsrsuDepositSetType.type == 0){
                            deposit = (((averagePrice/100)+0.49)*100).toFixed(2);
                        }else{
                            deposit = jsrsuDepositSetType.depositMoney
                        }
                    }
                    deposit = parseFloat(deposit)
                    //应付金额   押金+总房价
                    var amountPayable = parseFloat(totalHousingPrice + deposit).toFixed(2);

                    //押金显示
                    $("#houseDeposit").val(deposit);
                    $('#dayPrice').val(averagePrice);
                    $('#totalPrice').val(amountPayable);
                    $('#amountPayable').val(amountPayable);
                    $('#totalHousingPrice').val(totalHousingPrice);
                    $('#accountPaid').val('0.00');
                    //金额显示
                    $('#moneyText').html(amountPayable);
                    $('#payMoneyText').val(amountPayable);

                }else{

                    var jsrsuHourRoom=setUp.jsrsuHourRoom;						//获取钟点房间规则
                    var hourRoom=Number(JSON.parse(jsrsuHourRoom).hourRoom);
                    var dayPrice =data[i].price;
                    var totalPrice =Number(dayPrice)*hourRoom;

                    $('#dayPrice').val( dayPrice);	//赋值给日均价格
                    $('#totalHousingPrice').val(totalPrice);//赋值给总房价
                    //押金
                    var deposit = $("#houseDeposit").val() == "" ? 0 : $("#houseDeposit").val();
                    //实付金额
                    var amountPayable =(parseFloat(deposit) + parseFloat(totalPrice)).toFixed(2);

                    $('#amountPayable').val(amountPayable);				//应付金额
                    $('#totalPrice').val(amountPayable);				//折后金额
                    $('#moneyText').html(amountPayable);				//金额显示
                    $('#payMoneyText').val(amountPayable);
                    //显示选择周末
                    $('#fontTitle1').html(" ")
                }

            }else{
                var totalDay = $('#totalDay2').val();
                //总房价
                var totalHousingPrice = data[i].price*totalDay;
                //日均价格
                var averagePrice = (totalHousingPrice / totalDay).toFixed(2);

                $('#dayPrice2').val(averagePrice);
                $('#totalPrice2').val(totalHousingPrice);
                $('#amountPayable2').val(totalHousingPrice);

            }
//			$('#fontTitle1').html("<div style='margin:5px 0 0 0'>所选时间段内含有"+weekday+"天周末，建议日均价格为"+averagePrice+"</div>")
        }
    }
}

function populationJudging(){
    //判定居住人数
    var titleAddress=_title_address;

    var houseList = house_list_arr; //房屋信息
    //获取房间门牌号信息
    for(var i in houseList){
        var hsAddCommunity=houseList[i].hsAddCommunity
        var hsRoomType=houseList[i].hsRoomType;
        var hsAddDoorplateno=houseList[i].hsAddDoorplateno;
        var hsResidentiality=houseList[i].hsResidentiality;
        var houseAddressName=hsAddCommunity+" "+hsRoomType+" "+hsAddDoorplateno;
        if(houseAddressName==titleAddress){
            break;
        }
    }

    var rows = $("#customerInfoTable").datagrid("getRows");
    console.log($("#customerInfoTable").datagrid("getRows"));
    if(rows.length>=hsResidentiality){

        myTips("入住人数超过房间可居住人数","error");
        return;
    }
    console.log($("#customerInfoTable").datagrid("getRows"));
}

/**
 * id 为遍历的外部div id 不同的住户遍历由这个区分
 * type 代表是否校验住户信息 1不校验 0校验
 * 返回值 data对象 有nameList 所有住户的名字 rentAry住户的信息数组
 * 如果有校验 校验失败 则返回-1
 */
function getRentData(id,type){
    //客人们的资料
    var rentAry = [];
    //跟进中的名字串

    var name = "";
    var flag = true;
    
    var jcuId = $('#addShortRentDlg .jcuId').val();
    $("#"+id+" .client").each(function(){
        var rentObj = {
            popShortRent :1,
            popUser : _loginUserId,
            popInnerCreditLevel : 80,
            popOuterCreditLevel : 80
        }
        var popName = $(this).find(".clientName").val();
        var popIdcard = $(this).find(".clientIdcard").val();
        var popTelephone = $(this).find(".clientPhone").val();
        var popBirth = $(this).find(".clientBirth").val();
        var popSex = $(this).find(".clientSex").val();
        var popNation = $(this).find(".clientNation").val();
        var popIdcardAddress = $(this).find(".clientIdcardAddress").val();
        var popIdcardJson = $(this).find(".clientPopIdcardJson").val();
        if(type == 0){
            if(popName == null || popName == "" || popName == undefined ||
                popIdcard == null || popIdcard == "" || popIdcard == undefined ||
                popTelephone == null || popTelephone == "" || popTelephone == undefined ){
                flag=false;
                return;
            }
        }
        if(type == 1){
            if(popName == null || popName == "" || popName == undefined ||
                popTelephone == null || popTelephone == "" || popTelephone == undefined ){
                flag=false;
                return;
            }
        }
        rentObj.popName = popName;
        rentObj.popIdcard = popIdcard;
        rentObj.popTelephone = popTelephone;
        rentObj.popIdcardJson = popIdcardJson;
        rentObj.popBirth = popBirth;
        rentObj.popSex = popSex;
        rentObj.popNation = popNation;
        rentObj.popIdcardAddress = popIdcardAddress;
        rentObj.jcuId = jcuId;
        rentObj.pricePlan = channelInfo[0].jppPlanPackage;
        rentAry.push(rentObj);
		name += rentObj.popName;
    })



    if(flag){
        var data ={};
        data.name = name;
        data.rentAry = rentAry;
        return data;
    }else{
        return -1;
    }
}


function creatFollow(text,type){

    var follow = {
        text : text,
        time : new Date().format("yyyy-MM-dd hh:mm:ss"),
        type: "系统跟进",
        registrantName : _loginUserName
    }

    if(type == 1){
        return follow;
    }

    follow = "["+JSON.stringify(follow)+"]";
    return follow;


}

//执行入住时先判断是该合约时间内否存在订单，若存在则提示换房。
function canCheckIn(type,cut){
	//防止下入住单时与微信订单冲突
	var house = JSON.parse($('#house').val());
	console.log("更换房间前的房间id：                "+house.hsId)
	
	if(house.hsDirtyHouse == 1){
        myTips("该房间尚未清洁，不能出租","error");
        return;
    }
    if(house.hsDirtyHouse == 2||house.hsDirtyHouse == 3){
        myTips("该房间正在维修，不能住人","error");
        return;
    }
    
    var startTime =  new Date($('#actualOccupancyTime').val()).getTime();
    var endTime = new Date($('#endDate').val()).getTime();
    console.log(!checkTime(house.hsId,startTime,endTime,0))
    if(!checkTime(house.hsId,startTime,endTime,0)){
    	$.messager.confirm("操作提示", "所选时间段已有订单,是否随机分配至同房型？",  function(data) {
            if(data){
            	var houseList = house_list_arr;
                for(var i in houseList){
                	if(houseList[i].hsRoomType == house.hsRoomType && houseList[i].hsId != house.hsId){
                		if(houseList[i].hsDirtyHouse == 0){
                			house = houseList[i];
                			console.log("换房后的房间id             "+house.hsId);
                			doSceneCheckIn(type,house);
                			break;
                		}else{
                			myTips("error","没有干净相同房型的房，请及时清洁。");
                			return;
                		}
                	}else{
                		myTips("error","没有可更换的相同房型，如需更换请重新选择。");
                		return;
                	}
                }
            }
        });
    }else{
    	doSceneCheckIn(type,house);
    }
}

function doSceneCheckIn(type,house){
    var jsrcOrderNum = $('#jsrcOrderNum').val();
    var moneyInput = $('#moneyInput').val();
    var totalPrice = $('#payMoneyText').val();
    var jsrcDeposit = parseFloat($('#houseDeposit').val()).toFixed(2);
    
    var rentData = $("#customerInfoTable").datagrid("getRows");
    var jsrrCustomerType=$('#customerSelect').find("option:selected").val();
    var jsrcOrderSource=$('#orderSource').find("option:selected").val();

    var popName = $('#popCustomerNameTable').val();
    var popTelephone = $('#popTelephoneTable').val();
    var popIdcard = $('#popIdcardTable').val();
    var popNameRemark = $('#popNameRemarkTable').val();
    var popBirth = $('#popBirthTable').val();
    var popNation = $('#popNationTable').val();
    var popIdcardAddress = $('#popIdcardAddressTable').val();
    var popIdcardJson = $("#checkInDlg1").find(".clientPopIdcardJson").val();
    var jsrrChannelId = $('#checkInDlg1 .jcuId').val();
    var jsrrVipLevel = $('#checkInDlg1 .memberLevel').val();

    var renterName="";
    var obj = {
        popName : popName,
        popNameRemark : popNameRemark,
        popIdcard : popIdcard,
        popTelephone : popTelephone,
        popBirth : popBirth,
        popNation : popNation,
        popIdcardAddress : popIdcardAddress,
        popIdcardJson : popIdcardJson,
        popUser : _loginUserId,
        jsrrVipLevel : jsrrVipLevel,
    	jsrrChannelId : jsrrChannelId,
    }
    if(popName != "" && popTelephone != "" && popIdcard !=""){
        if(rentData.length != 0){
            for(var i in rentData){
                if(popIdcard != rentData[i].popIdcard){
                    rentData.push(obj);
                }
            }
            //跟进和收支中的归属人
            renterName = rentData[rentData.length -1].popName;
        }else{
            rentData.push(obj);
            renterName = popName;
        }
    }else{
        if(rentData.length==0){
            if(popName == ""){
                myTips("名字不能为空","error");
                return;
            }
            if(popTelephone ==""){
                myTips("手机号不能为空","error");
                return;
            }
            if(popIdcard == ""){
                myTips("身份证不能为空","error");
                return;
            }
        }
    }
    var rentAry = JSON.stringify(rentData);
   
    var channelType = $('#checkInDlg1 .channelType').find('option:selected').text();
    var groupType = $('#checkInDlg1 .groupType').find('option:selected').text();
    if(channelType == "" || groupType==""){
        myTips("请选择渠道类型","error");
        return;
    }

    var jsrcPaymentMethod = "";


    var jsrcHsId = house.hsId;
    var jsrcUserId = _loginUserId;
    var jsrcTotalDays = $('#totalDay').val();
    var jsrcDailyPrice = $('#dayPrice').val();
    var jsrcTotalPrice = $('#totalPrice').val();
    var jsrcAmountPayable = $('#totalHousingPrice').val();
    var jsrcTypeOccupancy=$('#typeOccupancy').val();						//入住类型
    var jsrcRemarks=$('#orderRemarks').val();								//备注
    var jsrcActualOccupancyTime;
    var jsrcEndTime;
    console.log("sdsadsadsa");
    if(jsrcTypeOccupancy =="钟点客房"){
        var hourStartSelect = $("#hourStartSelect option:selected").val();
        var hourEndSelect = $("#hourEndSelect option:selected").val();
        jsrcActualOccupancyTime =$("#hourOccupancyTime").val()+" "+hourStartSelect;
        jsrcEndTime=$("#hourEndDate").val()+" "+hourEndSelect;
    }else{
         jsrcActualOccupancyTime=new Date().format('yyyy-MM-dd hh:mm:ss');	//实际入住时间
         jsrcEndTime = $('#endDate').val();									//合约结束时间
    }

//	var rentData = $("#popCustomerNameTable").val();

    var text = "";
    var jsrcState = "已住";
    //text = "给 "+nameList +" 开 " +house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno +" 的房间";
    //客户【姓名】办理入住【地址】房间，预离时间：【预离时间】，总天数：【总天数】，缴纳押金：【房间押金】。
    var text ="客户 "+renterName+" 办理 " +house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno +"房间"+","+"预离时间:"+jsrcEndTime+","+"总天数:"+jsrcTotalDays+","+"缴纳押金:"+jsrcDeposit;


    var jsrcFollow = creatFollow(text);
    var jsrcSaleNo = randomNumber();
    var jsrcData = {
        jsrcHsId:jsrcHsId,
        jsrcUserId:jsrcUserId,
        jsrcTotalDays:jsrcTotalDays,
        jsrcDailyPrice:jsrcDailyPrice,
        jsrcDeposit:jsrcDeposit,
        jsrcOrderSource:jsrcOrderSource,
        jsrcTotalPrice:jsrcTotalPrice,
        jsrcBeginTime:jsrcActualOccupancyTime,
        jsrcEndTime:jsrcEndTime,
        jsrcState:jsrcState,
        rentJson:rentAry,
        jsrcAmountPayable:jsrcAmountPayable,			   //应付金额
        jsrcRemarks:jsrcRemarks,						  //备注
        jsrcActualOccupancyTime:jsrcActualOccupancyTime, //实际入住时间
        jsrcTypeOccupancy:jsrcTypeOccupancy,			//入住类型
        departmentId : _loginDepartment,
        storeId:_loginStore,
        jsrcFollow:jsrcFollow,
        type:type,
        jsrrCustomerType:jsrrCustomerType,
        jsrcOrderNum:jsrcOrderNum,
        jsrcFirstPay:jsrcTotalPrice,
        jsrcSaleNo:jsrcSaleNo,
        jsrcOrderState:1,
        coId:_loginCoId,
        doorCardJson:$("#doorCardJson").val() 	//发卡信息
    };

    if(type == 2){
        jsrcData.authCode = moneyInput;
        jsrcData.wxpayBody = "扫码支付";
        jsrcData.totalPrice =parseFloat(totalPrice).toFixed(2);
    }


    //打印账单所需数据
    var paymentMthod = "";
    if(type==1){
        paymentMthod = "现金收银"
        var money=$("#moneyInput").val()
        var orderMoney=$("#orderMoney").html()
        console.log(money+"+++++++++"+orderMoney)
        if(money==""||money==null){
            myTips('金额不能为空','error');
            return;
        }
        if (money<orderMoney||money>orderMoney+100){
            myTips('金额有误，请重新输入','error');
            return;
        }
    }else if(type==2){
        paymentMthod = "微信支付"
    }else{
        paymentMthod = "台卡收银"
    }
    var roomNo = house.hsRoomType + house.hsAddDoorplateno;
    var printData = {
        time:jsrcActualOccupancyTime,
        saleNo:jsrcSaleNo,
        customer:renterName,
        roomNo:roomNo,
        arrival:jsrcActualOccupancyTime,
        leave:jsrcEndTime,
        totalSum:jsrcTotalPrice,
        paymentMthod:paymentMthod,
        price:jsrcAmountPayable,
        deposit:jsrcDeposit,
        jsrcHsId:jsrcHsId,
        setUpCheckOutTime:setUp.jsrsuCheckOutTime
    }

    showLoading();
    $.ajax({
        url:"../sceneCheckIn.action",
        data:jsrcData,
        type:"post",
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
            	sessionStorage.refreshDiagram = 0;
                if(jsrcTypeOccupancy=="免费客房"){
                    myTips("下单成功","success");
                    $('#checkInDlg1').dialog("close");
                    $('#timeChoice').dialog("close");
                    $('#takingOrderDlg').dialog("close");
                    $('#houseDeposit').val('');
                    listPopCustomer();
                    getListContract();
                    return;
                }
                var id = data.body.split(",");
                var renterID = id[0];
                var jsrcId = id[1];
                printData.renterID = id[0];

                var jfBelongToChannel = $('#checkInDlg1 .jcuId').val();
                var jfPricePlan = $('#checkInDlg1 .jcuPricePlanId').val();
                var	jfSettlementMethod = type==5?"挂账":"现结";
                var jfCreditSituation = type==5?1:0;
                var jfAry = [];
                //收支
                var jfObj = {
                    department : _loginDepartment,
                    storefront : _loginStore,
                    jfTheCashierPeople : _loginUserId,
                    jfBillingDate : new Date().format("yyyy-MM-dd hh:mm:ss"),
                    jfHandlers : _loginUserId,
                    jfHouseId : house.hsHouseId,
                    jfHouse4storeId : house.hsId,
                    jfLandlordId : house.hsLandlordId,
                    jfTheOwnershipType : "租客",
                    jfBelongingToTheName : renterName,
                    jfOperationRecords : "("+ new Date().format("yyyy-MM-dd hh:mm:ss") + ",添加收支记录)*",
                    jfFinancialCoding : new Date().format("yyyyMMddhhmmss")+ parseInt(Math.random() * 10) +  parseInt(Math.random() * 10) + parseInt(Math.random() * 10),
                    jfStartCycle : new Date().format("yyyy-MM-dd"),
                    jfEndCycle : getNextMonth(new Date().format("yyyy-MM-dd")),
                    jfAccountingWhy :  house.hsAddDistrict+ house.hsAddZone+ house.hsAddStreet+ house.hsAddCommunity+ house.hsAddBuilding+ house.hsAddDoorplateno,
                    jfRenterId : renterID,
                    jfJsrcId : jsrcId,
                    jsrcOrderSource:jsrcOrderSource,
                    jfBelongToChannel : jfBelongToChannel,
                    jfPricePlan : jfPricePlan,
                    jfSettlementMethod : jfSettlementMethod,
                    jfCreditSituation : jfCreditSituation
                }

                var jfFinanNote =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行租房操作,获得租金";
                jfObj.jfPayType = "现钞";
                jfObj.jfAccountingSpecies = "租金";
                jfObj.jfBigType = "主营类";
                jfObj.jfNatureOfThe = "收入";
                jfObj.jfClosedWay = _closeWay;
                jfObj.jfAccountId = (type == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
                jfObj.jfSumMoney = jsrcTotalPrice;
                jfObj.jfFinanNote = jfFinanNote;
                jfAry.push(jfObj);

                var jfObj1 = JSON.parse(JSON.stringify(jfObj));
                var jfFinanNote =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行租房操作,获得押金";
                jfObj1.jfPayType = "现钞";
                jfObj1.jfAccountingSpecies = "房屋押金";
                jfObj1.jfBigType = "押金类";
                jfObj1.jfNatureOfThe = "收入";
                jfObj1.jfClosedWay = _closeWay;
                jfObj1.jfAccountId = (type == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
                jfObj1.jfSumMoney = jsrcDeposit;
                jfObj1.jfFinanNote = jfFinanNote;

                jfAry.push(jfObj1);

                jfAry = JSON.stringify(jfAry);

                $.ajax({
                    url:"../insertFinancialAll.action",
                    data:{
                        jsonArray : jfAry
                    },
                    type:"post",
                    dataType:"json",
                    success:function(result){
                        if(result.code == 1){
                            myTips("下单成功","success");
                            $('#checkInDlg1').dialog("close");
                            $('#openCashDlg').dialog("close");
                            $('#houseDeposit').val('');
                            $('#timeChoice').dialog("close")
                            $('#takingOrderDlg').dialog("close");
                            getListContract();
                            listPopCustomer();
                            savePrint(0,printData);
                        }else{
                            myTips(result.msg,"error");
                        }
                    }
                })
            }else{
                myTips(data.msg,"error");
            }
        }
    })
}

function getRootPath() {

    //获取当前网址，如： http://localhost:9527/zdss-web/login/login.do

    var curWwwPath = window.document.location.href;

    //   console.log("当前网址：" + curWwwPath);

    //获取主机地址之后的目录，如：zdss-web/login/login.do
    var pathName = window.document.location.pathname;

    //  console.log("当前路径：" + pathName);

    var pos = curWwwPath.indexOf(pathName);

    //   console.log("路径位置：" + pos);

    //获取主机地址，如： http://localhost:9527

    var localhostPath = curWwwPath.substring(0, pos);

    //获取带"/"的项目名，如：/zdss-web

    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

    return localhostPath+projectName;

}

//通过未租id获取设备并判定
function getDevice(jsrcHsId){
    var house = JSON.parse($('#house').val());
    console.log(house)
    var jsrcHsId = house.hsId;
    var jhdHsId=jsrcHsId;
    console.log(jsrcHsId);
    $.ajax({
        url:"../selectThisHouseDeviceID.action",
        data:{
            jhdHsId : jhdHsId
        },
        type:"post",
        dataType:"json",
        success:function(data){
            var body = data.body;
            if(data.code>0){
                for(var i in body){
                    var devJson = body[i];
                    if(devJson.devBrandId==20&&devJson.devFirstType==3&&devJson.devSecondType==22){
                        doorCardManagement()
                    }else{
                        $('#checkOutDlg').dialog("close");
                        $('#checkInDlg1').dialog("close");
                        $('#openCashDlg').dialog("close");
                    }
                }
            }
        }
    })
}

function doAddShortRent(){
    var house = JSON.parse($('#house').val());

    var jsrcHsId = house.hsId;
    var jsrcUserId = _loginUserId;
    var jsrcTotalDays = $('#totalDay2').val();
    var jsrcDailyPrice = parseFloat($('#dayPrice2').val()).toFixed(2);
    var jsrcTotalPrice = parseFloat($('#totalPrice2').val()).toFixed(2);
    var jsrcAmountPayable=parseFloat($('#amountPayable2').val()).toFixed(2);//应该付金额
    //押金
    var jsrcDeposit = "";
    if(setUp.jsrsuDepositSetType != ""){
        var jsrsuDepositSetType = JSON.parse(setUp.jsrsuDepositSetType);
        if(jsrsuDepositSetType.type == 0){
            jsrcDeposit = Math.round((jsrcDailyPrice/100)+0.49)*100;	//押金
            jsrcDeposit = jsrcDeposit.toFixed(2)
        }else{
            jsrcDeposit = jsrsuDepositSetType.depositMoney
        }
    }
    var jsrcEndTime = $('#endDate2').val();
    var jsrcStartTime = $('#startDate2').val();
    var jsrcRemarks=$('#remarks').val();//备注
    var jsrcState = "";

    var rentData = getRentData("clientDiv",1);
    if(rentData == -1){
        myTips("住户的信息未填完整","error");
        return;
    }
    if(!checkTime(jsrcHsId,jsrcStartTime,jsrcEndTime,0)){
        myTips("该时间段存在订单","error");
        return;
    }

    //客人们的资料
    var rentAry = rentData.rentAry;
    //跟进中的名字串
    var nameList = rentData.name;

    var renterName = nameList.split(",")[0];
    rentAry = JSON.stringify(rentAry);
    var text = ""
    jsrcState = "保留";
    text = "给 "+nameList +" 预约" +house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno +" 的房间";
    var jsrcFollow = creatFollow(text);

    showLoading();
    $.ajax({
        url:"../insertShortRent.action",
        data:{
            jsrcHsId:jsrcHsId,
            jsrcUserId:jsrcUserId,
            jsrcTotalDays:jsrcTotalDays,
            jsrcDailyPrice:jsrcDailyPrice,
            jsrcTotalPrice:jsrcTotalPrice,
            jsrcDeposit:jsrcDeposit,
            jsrcBeginTime:jsrcStartTime,
            jsrcEndTime:jsrcEndTime,
            jsrcState:jsrcState,
            rentJson:rentAry,
            jsrcAmountPayable:jsrcAmountPayable,//应付金额
            jsrcRemarks:jsrcRemarks,//备注
            departmentId : _loginDepartment,
            storeId:_loginStore,
            jsrcFollow:jsrcFollow,
            jsrcOrderState:1,
            jsrcSaleNo:randomNumber()
        },
        type:"post",
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
                myTips("下单成功","success");
                getListContract();
                $('#addShortRentDlg').dialog("close");
                $('#houseDeposit').val('');
                $('#timeChoice').dialog("close")
                return;
            }else{
                myTips(data.msg,"error");
            }

        }
    })

}


function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}


//获得本月的开始日期
function getMonthStartDate(){
    var date = new Date();
    var monthStartDate = new Date(date.getFullYear(), date.getMonth(), 1);
    return new Date(monthStartDate).format("yyyy-MM-dd hh:mm:ss");
}

//获得本月的结束日期
function getMonthEndDate(){
    var date = new Date();
    var monthEndDate = new Date(date.getFullYear(),date.getMonth(), getMonthDays(date.getMonth()));
    return new Date(monthEndDate).format("yyyy-MM-dd hh:mm:ss");
}

//获得某月的天数
function getMonthDays(myMonth){
    var date = new Date();
    var monthStartDate = new Date(date.getFullYear(), myMonth, 1);
    var monthEndDate = new Date(date.getFullYear(), myMonth + 2, 1);
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
    return days;
}


function convertDateFromString(s) {
    s = s.replace(/(\.\d+)?/g,"");
    var date = new Date(s);
    return date;
}

function evaluation(type,data){
    //渠道信息
	var cusType = "";
    for(var i in channelInfo){
		if(data.jsrrChannelId == channelInfo[i].jcuId){
			cusType = channelInfo[i].jcuType
			var jcuAllowCredit = channelInfo[i].jcuAllowCredit=="0"?"否":"是";
			$('#popGroupType').val(channelInfo[i].jcuGroupType);
			$('#popPricePlan').val(channelInfo[i].jppPlanName);
			$('#popAllowCredit').val(jcuAllowCredit);
			$('#popMemberLevel').val();
			if(channelInfo[i].jcuAllowCredit == "1"){
			$('#popMaxCredit').val(channelInfo[i].jcuMaxCredit);
			}else{
				$('#popMaxCredit').val("0.00");
			}
			$("#cusType .userType").each(function(){
		    	var userType = $(this).val();
				if(userType == cusType){
					$(this).attr("checked",'true')
					$(".userType").attr("disabled",true);
				}
			});
			break;
	    }
    }
    
    //入住次数
    $("#checkInNum1").val(data.jsrrCheckInNum);

    //读取身份证 type = 0
    if(type == 0){
        $("#popCustomerName").val(data.Name);
        $("#popTelephone").val(data.Telephone);
        $("#popIdCard").val(data.IDNumber);
        $("#popBirth").val(data.Birthday);
        $("#popIdcardAddress").val(data.Address);
        $("#popNation").val(data.Nation);
        $("#id_img_pers").attr("src","data:image/png;base64,"+data.Base64Photo);
        $("#id_img_perstwo").attr("src","data:image/png;base64,"+data.Base64Photo);
    }
    if(type == 1){
        $("#popCustomerName").val(data.popName);
        $("#popTelephone").val(data.popTelephone);
        $("#popIdCard").val(data.popIdcard);
        $("#popBirth").val(data.popBirth);
        $("#popIdcardAddress").val(data.popIdcardAddress);
        $("#popNation").val(data.popNation);
        //	$("#id_img_pers").attr("src","images/userImage.png");
    }
}

//订单详细信息
function openCheckOut(data){
    console.log(data);
    $(".hsRoomType").val(data.hsRoomType);
    var popIdcardJson = {};

    if(data.jsrcTypeOccupancy =="钟点客房"){
        $(".renewA").hide();
    }
    //客户表格双击事件
    $('#customerInformation').datagrid({
        onDblClickRow : function(rowIndex, rowData){
            if(data.jsrcState == "保留" || data.jsrcState == "预定" || data.jsrcState == "退定中"){
                evaluation(1,rowData)
            }
            if(data.jsrcState == "已住" || data.jsrcState == "退房"){
                if(rowData['popIdcardJson'] != null && rowData['popIdcardJson'] != ""){
                    var row = JSON.parse(rowData['popIdcardJson']).Certificate;
                    row.Telephone = rowData.popTelephone ;
                    evaluation(0,row);

                }else{
                    evaluation(1,rowData);
                }
            }
        }
    });
    //已经入住的
    if(data.jsrcState == "已住" || data.jsrcState == "退房"){
        var pop = JSON.parse(data['popJson'].substring(1, data['popJson'].length-1));
    	console.log(pop)
        if(pop[0]['popIdcardJson'] != null && pop[0]['popIdcardJson'] != ""){
            var row = JSON.parse(pop[0]['popIdcardJson']).Certificate;
            row.Telephone = pop[0].popTelephone ;
            evaluation(0,row);
        }else{
            evaluation(1,pop[0]);
        }
    	console.log(pop[0])
        $("#jppPlanPackage").val(pop[0].jppPlanPackage);
        if(data.jsrcState == "退房"){
            $('#purchaseHistory').show();
        }
        $('#oorCard').show();
        $('#jsrcOrderNum').val(data.jsrcOrderNum);
        $('#customerInformation').datagrid('loadData', pop);
        $('#popName').val(pop[0].popName);
        $('#popId').val(pop[0].popId);
    }

    //保留状态中的
    if(data.jsrcState == "保留" || data.jsrcState == "预定" || data.jsrcState == "退定中"){
        if(data.jsrcPeople != null && data.jsrcPeople != ''){
            var pop = JSON.parse(data.jsrcPeople.substring(1, data.jsrcPeople.length-1));
            evaluation(1,pop[0])
            $('#customerInformation').datagrid('loadData', pop);
            $('#popName').val(pop[0].popName);
            console.log(pop)
            if(data.jsrcState == "保留"){
            	$("#jppPlanPackage").val(pop[0].pricePlan);
            }else{
            	$("#jppPlanPackage").val(pop[0].jppPlanPackage);
            }
        }
        if(data.jsrcState == "保留" || data.jsrcState == "预定"){
            $('#checkInA').show();
            $('#changeHouse').show();
            $('#followUp').show();
            $('#oorCard').hide();
            $('#checkOut').hide();
            if(data.jsrcState == "保留"){
                $('#clearA').show();
            }else{
                $('#cancelA').show();
            }
        }else{
            $('#unsubscribe').show();
            $('#followUp').show();
            $('#oorCard').hide();
        }
    }else if(data.jsrcState == "已住"){
        $('#checkOut').show();
        $('#renewA').show();
        $('#changeHouse').show();
        $('#followUp').show();
        $('#oorCard').show();
    }
    if(data.jsrcOrderState == 0){
        $('#orderTaking').show();
    }else{
        $('#orderTaking').hide();
    }
    console.log(data)
    //合约信息
    for(var i in data){
        $('#' + i).val(data[i])
    }
    var jsrcBeginTime = new Date(data.jsrcBeginTime).format('yyyy-MM-dd hh:mm:ss');
    var jsrcEndTime = new Date(data.jsrcEndTime).format('yyyy-MM-dd hh:mm:ss');
    var jsrcActualOccupancyTime = data.jsrcActualOccupancyTime==""?"":new Date(data.jsrcActualOccupancyTime).format('yyyy-MM-dd hh:mm:ss');
    $('#jsrcBeginTime').val(jsrcBeginTime);
    $('#jsrcEndTime').val(jsrcEndTime);
    $('#jsrcActualOccupancyTime').val(jsrcActualOccupancyTime);
    $("#oldreminder").val(data.jsrcFollow);

    if(data.jsrcFollow != undefined && data.jsrcFollow != ""){
        var follow = JSON.parse(data.jsrcFollow.substring(1, data.jsrcFollow.length-1));
        //讲系统跟进，人工跟进，客户数据提醒分类
        var customerData = [];		//定义客服提醒数组
        var otherData = [];			//定义系统跟进、人工跟进数组
        for(var j in follow){
            if(follow[j].type == '客服提醒'){
                customerData.push(follow[j]);
            }else{
                otherData.push(follow[j]);
            }
        }
        for(var v in customerData){
            var textData=customerData[v].text;
            var remindData=JSON.parse(textData);
            remindData.remindTime;
            remindData.remindContent;
            remindData.state;
            customerData[v].remindTime = remindData.remindTime;
            customerData[v].remindContent = remindData.remindContent;
            customerData[v].state = remindData.state;
            customerData[v].typetwo=customerData[v].type;
            customerData[v].registrantName=customerData[v].registrantName;
        }
        $('#remind').datagrid('loadData', customerData);


        otherData.reverse();
        $('#followDg').datagrid('loadData', otherData);
    }

    //查询设备信息
    var jhdHsId=data.jsrcHsId;
    if(data.jsrcState == "已住"){
        $.ajax({
            type:"post",
            url:"../selectDeviceStatus.action",
            data:{
                jsrcHsId:jhdHsId,
            },
            dataType:"json",
            success:function(result){
                if(result.length != 0){
                    console.log(result)
                    for(var i in result){
                        var type=result[i].type;
                        var name=result[i].name;
                        var online=result[i].online; //boolean类型

                        if(online){
                            online="在线"
                        }else{
                            online="不在线"
                        }

                        if(type==10){
                            var ROOM_TMP = result[i].status.slice(0,2);//室温
                            var ADR_MODE = result[i].status.slice(6,8);//模式
                            var ADR_TMP = result[i].status.slice(8,10);//温度

                            var ROOM_TMP1 = parseInt(ROOM_TMP,16);//室温
                            var ADR_TMP1 =parseInt(ADR_TMP,16)+16;//温度

                            if(result[i].status.slice(11,12)==0){
                                var ADR_FANLEV="自动"
                            }
                            if(result[i].status.slice(11,12)==1){
                                var ADR_FANLEV="低"
                            }
                            if(result[i].status.slice(11,12)==2){
                                var ADR_FANLEV="中"
                            }if(result[i].status.slice(11,12)==3){
                                var ADR_FANLEV="高"
                            }
                            if(online=="在线"&&type==10){
                                $('#aircondition img').attr('src','img/ic_dt_aircondition_icon.png');
                            }
                            //空调
                            var title1="设备名称："+name+"\n"+"设备状态："+online+"\n"+"室内温度："+ROOM_TMP1+"\n"+"空调温度："+ADR_TMP1+"\n"+"空调风速："+ADR_FANLEV;
                            $('#airconditionDiv').attr('title',title1);
                        }

                        if(type==25) {
                            if (online == "在线") {
                                $('#doorLock img').attr('src', 'img/doorLock.png');
                            }
                            //门锁
                            var title2 = "设备名称：" + name + "\n" + "设备状态：" + online;
                            $('#doorLockDiv').attr('title', title2);
                        }

                        //插卡取电
                        if(type == 41 && online == "在线"){
                            $("#doorCardState img").attr("src","img/chaka.png");
                            var title3="设备名称："+name+"\n"+"设备状态："+"插卡";
                            $('#doorCardDiv').attr('title',title3);
                        }

                        if(type==16){
                            if(result[i].status.slice(0,4)=="E080"){
                                var  curtainAction="窗帘开";
                            }
                            if(result[i].status.slice(0,4)=="E040"){
                                var  curtainAction="窗帘关";
                            }
                            if(result[i].status.slice(0,4)=="E020"){
                                var  curtainAction="窗帘停";
                            }
                            if(online=="在线"){
                                $('#curtain img').attr('src','img/ic_dt_curtain_icon.png');
                            }
                            //窗帘
                            var title4="设备名称："+name+"\n"+"设备状态："+online+"\n"+"开关状态："+curtainAction;
                            $('#curtainDiv').attr('title',title4);
                        }

                        if(type==44){
                            //sos
                            var sos = result[i].status.slice(12,16);//紧急状态
                            var callSos="正常";
                            if(sos==8080){
                                callSos=" 紧急呼叫报警"
                            }
                            if(online=="在线"){
                                $('#sos img').attr('src','img/ic_dt_safe_sos_icon.png');
                            }
                            var title5="设备名称："+name+"\n"+"设备状态："+online+"\n"+"报警状态："+callSos;
                            $('#sosDiv').attr('title',title5);
                        }

                        /*if(type == 47){
                            if(online=="在线"){
                                $('#safeDoorbell img').attr('src','img/ic_dt_safe_doorbell_icon.png');
                            }
                            //门铃
                            var title6="设备名称："+name+"\n"+"设备状态："+online;

                            $('#safeDoorbellDiv').attr('title',title6);
                        }*/
                        if(type == 3 && result[i].sn.slice(5,6) == "5"){
                            if(online == "在线" && result[i].status == "F040"){
                                $('#safeDoorbell img').attr('src','img/ic_dt_safe_doorbell_icon.png');
                            }
                            var title6="设备名称："+name+"\n"+"设备状态：请勿打扰";
                            $('#safeDoorbellDiv').attr('title',title6);
                        }
                    }
                }
            }
        })
    }

    $('#checkOutDlg').dialog({
        title : _title_address + " 订单详情 " + data.jsrcState,
        top : getTop(650),
        left : getLeft(1060),
        width : 1060,
        height : 650,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#remind").datagrid("loadData", { total: 0, rows: [] });
            $("#customerInformation").datagrid("loadData", { total: 0, rows: [] });
            $(".renewA").show();
            $('#jsrcHsId').val("");
            $('#checkOutDlg [clear="clear"]').val('');
            $("#id_img_pers").attr("src","images/userImage.png");
            $("#id_img_perstwo").attr("src","images/userImage.png");
            $("#checkOutDlgButton1 .buttonState").hide();
            $("#checkOutDlgButton .buttonState").hide();
            $('#airconditionDiv').attr('title',"该房尚未绑定相关设备");
            $('#doorLockDiv').attr('title',"该房尚未绑定相关设备");
            $('#doorCardDiv').attr('title',"该房尚未绑定相关设备");
            $('#curtainDiv').attr('title',"该房尚未绑定相关设备");
            $('#sosDiv').attr('title',"该房尚未绑定相关设备");
            $('#safeDoorbellDiv').attr('title',"该房尚未绑定相关设备");

            $('#aircondition img').attr('src','img/ic_dt_aircondition_icon_gray.png');
            $('#doorLock img').attr('src','img/doorLock_gray.png');
            $("#doorCardState img").attr("src",'img/baka.png');
            $('#curtain img').attr('src','img/ic_dt_curtain_icon_gray.png');
            $('#sos img').attr('src','img/ic_dt_safe_sos_icon_gray.png');
            $('#safeDoorbell img').attr('src','img/ic_dt_safe_doorbell_icon_gray.png');
        }
    });
    if(pop != undefined){
        $('#customerInformation').datagrid('loadData', pop);
    }
    //总共金额 押金+总房价
    $('#totalPrice1').val(data.jsrcDeposit + data.jsrcAmountPayable);
    //折后金额
    $('#amountOfDiscount').val(data.jsrcDeposit + data.jsrcAmountPayable);

    $('#popIdcardType').val('身份证/临时身份证/户口本');
    $('#checkOutDlg').dialog('open');
}


//提醒功能按钮
function reminderFunction(){
    var row = $('#remind').datagrid('getSelected');
    var jsrcId = $('#jsrcId').val();
    var oldreminder=$("#oldreminder").val();
    var follow = JSON.parse(oldreminder.substring(1, oldreminder.length-1));
    for(var i in follow){
        var oldTime=follow[i].time;
        if(oldTime==row.time){
            var oldText=JSON.parse(follow[i].text);
            oldText.state="已提醒";
            var newText=JSON.stringify(oldText);
            follow[i].text=newText;
        }
    }
    var jsrcFollow=JSON.stringify(follow);
    $.ajax({
        type:"post",
        url:"../updateShortRent.action",
        data:{
            jsrcId:jsrcId,
            jsrcFollow:jsrcFollow
        },
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
                myTips("修改成功","success");
                getListContract();
                var eventData = null;
                for(var i in event_list){
                    if(event_list[i].jsrcId == jsrcId){
                        eventData = event_list[i];
                    }
                }

                $('#customerService').dialog('close');
                openCheckOut(eventData);
            }else{
                myTips(data.msg,"error");
            }
        }
    })


}

//客服提醒详情记录
function openremind(){
    $('#customerService').dialog({
        title : _title_address + " 提醒记录",
        top : getTop(350),
        left : getLeft(360),
        width : 360,
        height : 350,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#customerService [clano=clano]').html('');
        }
    });
    $('#customerService').dialog('open');
}
//系统详情记录
function openFollow(data){
    $('#followDlg').dialog({
        title : _title_address + " 跟进记录",
        top : getTop(320),
        left : getLeft(400),
        width : 400,
        height : 320,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
        }
    });

    $('#followDlg').dialog('open');
}

//分页操作
function sourcePage(totalNum, page, type) {
    if (type ==0) {
        var pageNum = Math.ceil(totalNum / 10);
        $("#shortRentHousePage").remove();
        $("#shortRentHousePageDiv")
            .append(
                "<div class='tcdPageCode' id='shortRentHousePage' style='text-align:center;'></div>");
        $("#shortRentHousePage").createPage({
            onePageNums:10,
            totalNum:totalNum,
            pageCount : pageNum,
            current : 1,
            backFn : function(p) {
                if (p <= pageNum) {
                    _pageNum[0] = p;
                    _indexNum[0]=0;
                    getDoorCard(p);
                }
            }
        });
    }
}

//退定审批
function openUnsubscribe(){
    $('#unsubscribeDlg').dialog({
        title : _title_address + "退定审批",
        top : getTop(100),
        left : getLeft(250),
        width : 250,
        height : 100,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
        }
    });

    $('#unsubscribeDlg').dialog('open');
}
function unsubscribe(type){
    var jsrcState = "";
    if(type == 0){
        $.messager.confirm("操作提示", "确定允许顾客退定吗？", function(data) {
            if (data) {
                doCancelOrder(1);
            }else{
                return;
            }
        });
    }
    if(type == 1){
        $.messager.confirm("操作提示", "确定取消顾客退定吗？", function(data) {
            if (data) {
                doCancelOrder(2);
            }else{
                return;
            }
        });
    }
}

//type=0取消保留/type=1退定
function cancel(type){
    if(type == 0){
        $.messager.confirm("操作提示", "确定取消吗？", function(data) {
            if (data) {
                doCancelOrder(0);
            }else{
                return;
            }
        });
    }
    if(type == 1){
        $.messager.confirm("操作提示", "确定退定吗？", function(data) {
            if (data) {
                doCancelOrder(1);
            }else{
                return;
            }
        });
    }
}
//执行取消保留type=0/退定type=1 或 执行退定审批(type=1允许；type=2不允许)
function doCancelOrder(type){
    var jsrcHsId = $('#jsrcHsId').val();
    var jsrcId = $('#jsrcId').val();

    var popName = $('#popName').val();

    var house = getHouseData(jsrcHsId);

    var oldState = $('#jsrcState').val();

    showLoading();
    var jsrcState = "";
    var state = "";
    if(type == 0){
        var text = "取消给 "+popName +" 保留的 " +house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno +" 房间";
        jsrcState="取消保留" ;
        state = "取消保留" ;
    }
    if(type == 1){
        var text ="客户 "+popName +" 办理退订手续"+","+"退订房间地址:"+house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno;
        jsrcState="退定" ;
        state = "退定" ;
        var jsrcOrderNum = $('#jsrcOrderNum').val(); //订单号
        var payType = "4";	//退款
        var jsrcPaymentMethod = "在线支付";
    }
    if(type == 2){//不允许退定
        var text ="取消客户 "+popName +" 办理的退定手续"+","+"被取消的退定房间地址:"+house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno;
        jsrcState="预定"
        state = "取消退定" ;
    }

    var jsrcFollow = creatFollow(text,1);
    var oldFollow = $('#jsrcFollow').val();

    if(oldFollow != ""){
        var follow = "";
        follow = JSON.parse(oldFollow.substring(1, oldFollow.length-1));
        follow.push(jsrcFollow);
        jsrcFollow = JSON.stringify(follow);
    }

    var jsrcFirstPay = $('#jsrcFirstPay').val(); //预定时支付金额

    $.ajax({
        type:"post",
        url:"../updateShortRent.action",
        data:{
            jsrcId:jsrcId,
            jsrcState:jsrcState,
            jsrcFollow:jsrcFollow,
            jsrcOrderNum:jsrcOrderNum,
            jsrcPaymentMethod:jsrcPaymentMethod,
            refundPrice:jsrcFirstPay,
            totalPrice:jsrcFirstPay,
            type:payType
        },
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
                myTips(state+"成功","success");
                $('#checkOutDlg').dialog('close');
                $('#unsubscribeDlg').dialog('close');
                getListContract();
            }else{
                myTips(data.msg,"error");
            }
        }
    })

}

//type=0正常退房       type=1提前搬离
//payType  1现金   2扫码  3台卡 4原路退款 5现金退款
function checkOutShortRent(type,payType,cut){
	var cleanUserId = $('#searchgerGetUserId').val();
    if(cleanUserId == ""){
    	myTips("请选择清洁人员","error");
    	return;
    }
    var jsrcSaleNo = $("#jsrcSaleNo").val();
    var jsrcId = $('#jsrcId').val();
    var jsrcOrderNum = $('#jsrcOrderNum').val();
    var jsrcEndTime = $('#jsrcEndTime').val();
    jsrcEndTime = new Date(jsrcEndTime).format("yyyy-MM-dd hh:mm:ss");
    //获取实际退房搬离时间
    var jsrcActualDepartureTime = new Date().format("yyyy-MM-dd hh:mm:ss");
    var jsrcDeposit = parseFloat($('#jsrcDeposit').val()).toFixed(2);

    var jsrcHsId = $('#jsrcHsId').val();
    var house = getHouseData(jsrcHsId);

    var popName = $('#popName').val();
    var additionalSum = $('#additionalSum').val(); //附加消费
    var amountOfArrears = $('#amountOfArrears').val(); //欠费金额
    if(type == 1){//提前搬离
        var calculateMoney1 = calculateMoney();	//计算提前搬离应退款的方法
        var refundment = calculateMoney1.refundment; //应退房费
    }
    console.log(calculateMoney1)
//    return;
    var jfAryObj = {
        additionalSum:additionalSum,
        amountOfArrears:amountOfArrears,
        refundment:refundment
    }
    var jfAry = jourFinancial(house,jfAryObj,payType,type)
    var address = house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno;
    //跟进记录
    if(type == 0){//正常退房
        var text ="客户 "+popName +"办理退房手续"+","+"退房地址:"+ address;
    }else{//提前搬离
        var text ="客户 "+popName +" 办理提前搬离手续"+","+" 原预离时间:"+jsrcEndTime+"提前至:"+jsrcActualDepartureTime+"搬离"+","
            +"搬离地址:"+address;
    }
    var jsrcFollow = creatFollow(text,1);
    var follow = JSON.parse($('#jsrcFollow').val().getRealJsonStr());
    follow.push(jsrcFollow);
    jsrcFollow = JSON.stringify(follow);

    //生成保洁
    var repEventRp = address +"需要清洁，请尽快处理"

    var addTaskObj = {
        repHouse4storeId: house.hsId,
        repResponsibility : "负责人",
        repEventRp : repEventRp,
        repHopeTime : "尽快",
        repRepairPeopleId : cleanUserId,
        repUserId : _loginUserId,
        repReportingTime : new Date().format("yyyy-MM-dd hh:mm:ss"),
        repTypeRp : "租务维修",
        repDepartment : _loginDepartment,
        repStorefront : _loginStore,
        repTaskTime : new Date().format("yyyy-MM-dd"),
        type:"维保"
    }

    var moneyInput = $('#moneyInput').val();
    var payTotalMoney = parseFloat($("#totaSum").val());
    var wxpayBody = "扫码付款";
    var authCode = moneyInput;

    //合约表数据
    var rows=$('#serviceCharge1').datagrid("getRows");
    var serviceData=JSON.stringify(rows);//附加描述

    var jsrcFirstPay = parseFloat($('#jsrcFirstPay').val());
    var refundPrice = (jsrcFirstPay - payTotalMoney).toFixed(2);

    var jsrcPaymentMethod = $('#jsrcPaymentMethod').val();

    var jsrrPopId = $('#popId').val();

    var data = {
        jsrcHsId:jsrcHsId,
        jsrcId:jsrcId,
        jsrcState:"退房",
        jsrcActualDepartureTime:jsrcActualDepartureTime,//实际搬离时间
        jsrcFollow:jsrcFollow,
        jsrcAdditionalCost:additionalSum,	//附加费用总金额
        jsrcAdditionalDescription:serviceData, //附加描述
        jsrcArrears:amountOfArrears, //欠费金额
        jsonArray:jfAry,
        jsrcOrderNum:jsrcOrderNum,
        jsrcPaymentMethod:jsrcPaymentMethod,
        addTaskObj:JSON.stringify(addTaskObj),
        type:payType,
        wxpayBody:wxpayBody,
        totalPrice:jsrcFirstPay,
        refundPrice:refundPrice,
        authCode:authCode,
        jsrrPopId:jsrrPopId,
        userName:_loginUserName
    }

    if(type == 1){//提前搬离
        data.jsrcEndTime = calculateMoney1.endTime
        data.jsrcTotalDays = calculateMoney1.totalDays
        data.jsrcAmountPayable=calculateMoney1.jsrcAmountPayable
        data.jsrcTotalPrice=calculateMoney1.jsrcTotalPrice
        data.jsrcDailyPrice=calculateMoney1.jsrcDailyPrice
    }

    //打印退房账单所需数据
    var jsrcBeginTime = $('#jsrcBeginTime').val();
    var totalSum = $('#totaSum').val();//客户应缴费用
    var houseRent = $('#refundedRentMoney').val();
    var refund = parseFloat(jsrcDeposit)+parseFloat(houseRent);//酒店应退总费用
    var paymentMthod = "";
    if(payType==1){
        paymentMthod = "现金收银"
    }else if(payType==2){
        paymentMthod = "微信支付"
    }else if(payType==3){
        paymentMthod = "台卡收银"
    }else if(payType==4){
        paymentMthod = "微信退款"
    }else if(payType==5){
        paymentMthod = "现金退款"
    }
    var roomNo = house.hsRoomType + house.hsAddDoorplateno;
    var printData = {
        time:jsrcActualDepartureTime,
        saleNo:randomNumber(),
        customer:popName,
        roomNo:roomNo,
        arrival:jsrcBeginTime,
        leave:jsrcEndTime,
        totalSum:parseFloat(totalSum).toFixed(2),
        additionalSum:parseFloat(additionalSum).toFixed(2),
        arrears:amountOfArrears = amountOfArrears==""?0.00:parseFloat(amountOfArrears).toFixed(2),
        refund:refund.toFixed(2),
        deposit:jsrcDeposit,
        houseRent:houseRent,
        paymentMthod:paymentMthod,
        jsrcHsId:jsrcHsId,
        moneyInput:moneyInput==""?Math.abs(refund - totalSum).toFixed(2):moneyInput,
        setUpCheckOutTime:setUp.jsrsuCheckOutTime
    }

    showLoading();
    $.ajax({
        type:"post",
        url:"../checkOutShortRent.action",
        data:data,
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
                myTips("退房成功", "success");
                savePrint(1,printData);
                refash();
                if(cut==2){
                    queryDiagram()
                }

                $('#checkOutDlg').dialog('close');
                $('#cleanDlg').dialog('close')
                $('#checkOutDiv').dialog('close');
                $('#checkOutBill').dialog('close');
                $('#openCashDlg').dialog('close');
            }else{
                myTips(data.msg,"error");
            }
        }
    });
}
//保存打印 type=0入住账单	type=1退房账单
function savePrint(type,printData){
	console.log(printData)
    var json = '',jhpType = '',jhpTitle = '';
    printData.arrival = new Date(printData.arrival).format("yyyy-MM-dd hh:mm");
    printData.leave = new Date(printData.leave).format("yyyy-MM-dd hh:mm");
    var checkInDlg1IsOpen = $("#checkInDlg1").parent().is(":hidden")
    json = "time" + ':"' + printData.time + '",' + "saleNo" + ':"' + printData.saleNo + '",' + "customer" + ':"' + printData.customer + '",'
        + "roomNo" + ':"' + printData.roomNo + '",' + "arrival" + ':"' + printData.arrival + '",' + "leave" + ':"' + printData.leave + '",'
        + "userName" + ':"' + _loginUserName + '",'	+ "telphone" + ':"' + setUp.jsrsuTelphone + '",'+ "jsrsuWxgzhTitle" + ':"' + setUp.jsrsuWxgzhTitle + '",' + "wxgzhImgPath" + ':"' + _wxgzhImgPath + '",'
        + "paymentMthod" + ':"' + printData.paymentMthod + '",' + "setUpCheckOutTime" + ':"' + printData.setUpCheckOutTime + '",'
//	json += "wxMerchantName" + ':"' + _wxMerchantName + '",'
    if(type == 1){
        var totalSum = Math.abs(printData.refund - printData.totalSum).toFixed(2);
        json += "price" + ':"' + printData.totalSum + '",' 				//消费金额
        json += "additionalSum" + ':"' + printData.additionalSum + '",' //附加消费
        json += "arrears" + ':"' + printData.arrears + '",' 			//欠费金额
        json += "refund" + ':"' + printData.refund + '",'				//应退金额
        json += "houseRent" + ':"' + printData.houseRent + '",'			//应退房费
        json += "deposit" + ':"' + printData.deposit + '",'				//应退押金
        json += "totalSum" + ':"' + totalSum + '",'						//实际应收款 or 实际应退款
        json += "moneyInput" + ':"' + printData.moneyInput + '"'		//租客支付金额

        jhpType = "租客退房账单";
        jhpTitle = " 租客退房账单打印小票"
    }else{
        json += "totalSum" + ':"' + printData.totalSum + '",'	//总金额
        json += "price" + ':"' + printData.price + '",'			//房价
        json += "deposit" + ':"' + printData.deposit + '",'		//押金

        jhpType = "租客入住账单";
        jhpTitle = " 租客入住账单打印小票"
    }
    json = '{' + json.replace(/[\r\n]/g,"") + '}';
    $.post("../insertHistoryPrint.action",{
        jhpJson 			: json,
        jhpType 			: jhpType,
        jhpTitle			: getNowFormatDate()+jhpTitle,
        jhpHouse4storeId	: printData.jsrcHsId,
        jhpUserId			: _loginUserId,
        jhpSpecialNumber	: printData.saleNo
    }, function(data) {
        if(data.code<0){
            myTips(data.msg, 'error');
        }else{
            if(type == 0){
                $.messager.confirm("操作提示", "需要打印顾客入住账单吗？",function(data){
                    if(data){
                        printPreview(0,printData.saleNo);
                    }
                });
            }else if(type == 1){
                $.messager.confirm("操作提示", "需要打印顾客退房账单吗？",function(data){
                    if(data){
                        printPreview(1,printData.saleNo);
                    }
                });
            }
        }
    });
}

//打开预览对话框	type=0 入住账单		type=1退房账单
function printPreview(type,saleNo){
    $('#printDlg').dialog({
        top 	: getTop(650),
        left 	: getLeft(260),
        title 	: 	'打印预览',
        closed	:	true,
        width	:	260,
        height	:	650,
        cache 	: 	false,
        modal 	: 	true,
        onClose : 	function() {

        }
    });

    $('#printFrame').empty();
    var	iframes ='';
    $.post("../selectHistoryPrint.action",{
        jhpSpecialNumber	: saleNo,
        splitFlag			: 1,
    }, function(data) {
        if (data.code>=0) {
            var jhpData = data.body
            var printArray = jhpData[0].jhpJson.getRealJsonStr();
            if(type==0){//入住账单
                iframes ='<!DOCTYPE html><html><head><meta charset="UTF-8" /><style> table{ width:48mm; table-layout:fixed;}   img{height:100px;width:100px}table td {border-top: none; word-wrap:break-word; font-size: 10px; }h1{font-size: 18px;text-align:center}h2{font-size: 10px;text-align:center}#body{}#body .other_fee{border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script> </head><body style="background-color:#fff;width:48mm;margin-left:2mm"><div id="body" style="width:48mm"><div class="other_fee"><div class="title"><h1>{{body.jsrsuWxgzhTitle}}<br>入住单</h1><table><tbody><tr><td>订单号/No {{body.saleNo}}</td></tr><tr><td>入住/Arrival {{body.arrival}}</td></tr><tr><td>客人/Customer {{body.customer}}</td></tr><tr><td>房号/RoomNo {{body.roomNo}}</td></tr><tr><td>预离/Leave {{body.leave}}</td></tr></tbody></table></div></div><div class="other_fee"><div class="paymentVoucher"><h2>付款信息/PaymentVoucher</h2><table style="width: 100%;"><tbody><tr><td>房价/Price ￥{{body.price}}</td></tr><tr><td>押金/Deposit ￥{{body.deposit}}</td></tr><tr><td>总金额/TotalSum ￥{{body.totalSum}}</td></tr><tr><td>付款方式/PayMthod {{body.paymentMthod}}</td></tr></tbody></table></div></div><div><div class="guestInstructions"><h2>宾客须知/GuestInstructions</h2></div><div style="font-size:10px ">1. 每日最后退房时间为中午{{body.setUpCheckOutTime}},如超过{{body.setUpCheckOutTime}}时，须加收超钟房费。</div><div style="font-size:10px;margin-top:5px">2.服务电话 {{body.telphone}}</div><div style="text-align:center;"><h2>欢迎下次光临</h2><div id="wxgzhImgPath" style="text-align:center;"></div></div><div><h2>扫码关注微信公众号支持在线定房，让您行程无忧。WeChat scan QR code，Support online booking Let your journey be free from worry。</h2></div> </div></div><script> var body2='+printArray+';document.getElementById("wxgzhImgPath").innerHTML="<img src="+body2.wxgzhImgPath+" />";</script><script>  var vm;    vm = new Vue({    el: "#body",    data: {   body:{       }    }  });  vm.body = body2;    function print() { document.execCommand("print") }</script></body></html>';
            }else if(type==1){//退房账单
                iframes ='<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>	table{ width:48mm; table-layout:fixed;}	  img{height:100px;width:100px}table td {border-top: none; word-wrap:break-word; font-size: 10px;	}h1{font-size: 18px;text-align:center}h2{font-size: 10px;text-align:center}#body{}#body .other_fee{border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script> </head><body style="background-color:#fff;width:48mm;margin-left:5mm"><div id="body" style="width:48mm"><div class="other_fee"> <div class="title"> <h1>{{body.jsrsuWxgzhTitle}}<br>退房单</h1> <table> <tbody><tr> <td>订单号/No {{body.saleNo}}</td> </tr> <tr><tr> <td>入住/Arrival {{body.arrival}}</td> </tr> <td>客人/Customer {{body.customer}}</td> </tr> <tr> <td>房号/RoomNo {{body.roomNo}}</td> </tr> <tr> <td>预离/Leave {{body.leave}}</td> </tr></tbody> </table> </div></div><div class="other_fee"> <div class="actualVoucher"> <h2 id="getOrRefundMoney"></h2> <table id="table1"></table> </div></div><div> <!--<div class="guestInstructions"> <h2>宾客须知/GuestInstructions</h2> </div> <div style="font-size:10px">1. 每日最后退房时间为中午{{body.setUpCheckInTime}},如超过{{body.setUpCheckOutTime}}时，须加收超钟房费。 </div> <div style="font-size:10px;margin-top:5px">2. 服务电话  {{body.telphone}} </div> --><div style="text-align:center"> <h2>欢迎下次光临</h2><div id="wxgzhImgPath" style="text-align:center;"></div></div> <div> <h2>扫码关注微信公众号支持在线定房，让您行程无忧。WeChat scan QR code，Support online booking Let your journey be free from worry。</h2> </div> </div></div><script> var body2='+printArray+';document.getElementById("wxgzhImgPath").innerHTML="<img src="+body2.wxgzhImgPath+" />";if(body2.paymentMthod == "现金退款" || body2.paymentMthod == "微信退款"){document.getElementById("getOrRefundMoney").innerHTML="退款信息/RefundInformation";document.getElementById("table1").innerHTML="<tbody><tr><td>总金额/TotalSum ￥"+body2.totalSum+"</td></tr><tr><td>支付方式/PayMthod  "+body2.paymentMthod+"</td></tr></tbody>";}else{var giveChange = parseFloat(body2.moneyInput) - parseFloat(body2.totalSum);document.getElementById("getOrRefundMoney").innerHTML="缴费信息/PaymentInformation";document.getElementById("table1").innerHTML="<tbody><tr><td>应收/Receivables ￥"+body2.totalSum+"</td></tr>		  	  <tr><td>实收/ActualReceipts ￥"+body2.moneyInput+"</td></tr><tr><td>找零/GiveChange ￥"+giveChange.toFixed(2)+"</td></tr><tr><td>支付方式/PayMthod  "+body2.paymentMthod+"</td>      </tr></tbody>";}</script><script>		var vm;				vm = new Vue({		  el: "#body",		  data: {			body:{							}		  }		});		vm.body = body2;			 function print() { document.execCommand("print") }</script></body></html>';
            }
            var iframesObj = document.getElementById('printFrame').contentDocument;
            iframesObj.open();
            iframesObj.write(iframes);
        }
    }, "json");
    $('#printDlg').dialog("open");
}

/**
 * 	提前搬离时的操作 返回一个对象moneyObj
 *  totaSum（附加消费的总金额）
 *	refundment（退还租金）
 *  refundmentTotalPrice（退还总金额）
 *	totalDays（已住时间总天数）
 *	endTime（提前搬离时间）
 *	jsrcAmountPayable（所住时间的总房价）
 *	jsrcDailyPrice（所住时间段的日均价格）
 *	jsrcTotalPrice（所住时间的总价格  押金+总房价）
 */
function calculateMoney(){
    var moneyObj={};
    var jsrcHsId = $('#jsrcHsId').val();
    var house = getHouseData(jsrcHsId);
    //日租价格、高峰价格
//    var hsDailyRent = house.hsDailyRent;
//    var hsHotDailyRent = house.hsHotDailyRent;
    var price = 0.0;
    var jppPlanPackage = JSON.parse($("#jppPlanPackage").val());
    var hsRoomType = $("#checkOutDlg .hsRoomType").val();
    for(var i in jppPlanPackage){
    	if(hsRoomType == jppPlanPackage[i].roomType){
    		price = jppPlanPackage[i].price;
    	}
    }
    console.log(price)

    var totaSum=$('#totaSum').val();
    totaSum=parseFloat(totaSum)

    var jsrcBeginTime = $('#jsrcBeginTime').val();
    jsrcBeginTime = new Date(jsrcBeginTime).getTime();
    var jsrcDeposit = $('#jsrcDeposit').val();
    jsrcDeposit = parseFloat(jsrcDeposit)

    var jsrcDailyPrice = parseFloat($('#jsrcDailyPrice').val());
    //获取退房费的时间规则
    var setUpTime = "";
    if(setUp.jsrsuRefundRoomChargeTime != ""){
        setUpTime = new Date().format("yyyy-MM-dd " + setUp.jsrsuRefundRoomChargeTime +":00");
    }else{
        setUpTime = new Date().format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
    }
    setUpTime = new Date(setUpTime).getTime();

    //当前时间
    var today = new Date().getTime();

    //获取当前时间后一天（明天）的退房时间
    var tomorrow = today+1000*60*60*24;
    tomorrow = new Date(tomorrow).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
    tomorrow = new Date(tomorrow).getTime();

    //先判断需要退房的订单是否为未来订单，防止今天之后的在住单退房时计算时间错误
    if(today >= jsrcBeginTime){
        if(today > setUpTime){
            var totalDays = getDay(jsrcBeginTime,tomorrow);
            var weekendDays = checkWeekend(jsrcBeginTime,tomorrow).weekDays;
            var endTime = new Date(tomorrow).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");

        }
        //提前退房时间小于设置的入住时间，按今天算
        if(today <= setUpTime){
            today = new Date(today).getTime();
            var totalDays = getDay(jsrcBeginTime,today);
            var weekendDays = checkWeekend(jsrcBeginTime,today).weekDays;
            var endTime = new Date(today).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
        }
        //计算所住时间的总房价
//      var jsrcAmountPayable = parseFloat(hsDailyRent*(totalDays-weekendDays) + weekendDays*hsHotDailyRent).toFixed(2);
        var jsrcAmountPayable = parseFloat(totalDays*price).toFixed(2);
        
        //计算所住时间的总价格  押金+总房价
//      var jsrcTotalPrice = parseFloat(jsrcAmountPayable+jsrcDeposit).toFixed(2);
        var jsrcTotalPrice = parseFloat(jsrcAmountPayable+jsrcDeposit).toFixed(2);
        
        //计算所住时间段的日均价格
        if(totalDays != 0){
            var jsrcDailyPrice = parseFloat(jsrcAmountPayable/totalDays).toFixed(2);
        }else{
            var jsrcDailyPrice=0;
        }
        //计算退还金额
        var totalPrice = $('#jsrcAmountPayable').val() * 1.0;
        var refundment = setUp.jsrsuRefundRoomCharge == 1 ? totalPrice - jsrcAmountPayable : 0;
    }else{
        var jsrcEndTime = $('#jsrcEndTime').val();
        jsrcEndTime = new Date(jsrcEndTime).getTime();
        var totalDays = $('#jsrcTotalDays').val();
        var weekendDays = checkWeekend(jsrcBeginTime,jsrcEndTime).weekDays;
        var endTime = new Date(jsrcEndTime).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");

        //计算所住时间的总房价
        var jsrcAmountPayable = parseFloat($('#jsrcAmountPayable').val());
        //计算所住时间的总价格  押金+总房价
        var jsrcTotalPrice = jsrcAmountPayable+jsrcDeposit;
        //计算所住时间段的日均价格
        var jsrcDailyPrice = $('#jsrcDailyPrice').val();;
        //计算退还金额
        var refundment = parseFloat($('#jsrcAmountPayable').val());
    }
    var refundmentTotalPrice = (refundment+jsrcDeposit-totaSum).toFixed(2);
    
    moneyObj = {
        refundment				: refundment,
        totalDays				: totalDays,
        endTime					: endTime,
        jsrcAmountPayable		: jsrcAmountPayable,
        jsrcDailyPrice			: jsrcDailyPrice,
        jsrcTotalPrice			: jsrcTotalPrice,
        refundmentTotalPrice	: refundmentTotalPrice,
        totaSum					: totaSum,
    }

    return moneyObj;
}
/**
 * house 房屋信息
 * jfAryObj {refundment退还剩余租金；additionalSum附加消费}
 * payType 收银类型
 * type=1提前搬离 type=0正常退房
 */
function jourFinancial(house,jfAryObj,payType,type){
    var jsrcId = $('#jsrcId').val();
    var renterId = $('#jsrcRenterId').val();
    var popName = $('#popName').val();
    var jsrcDeposit = parseFloat($('#jsrcDeposit').val()).toFixed(2);
    //附加消费
    var rows=$('#serviceCharge1').datagrid("getRows");

    var serviceData=JSON.stringify(rows);

    //欠费金额
    var amountOfArrears=parseFloat($('#amountOfArrears').val()).toFixed(2);
    var jfAry = [];
    //收支
    var jfBelongToChannel = $('#checkInDlg1 .jcuId').val();
    var jfPricePlan = $('#checkInDlg1 .jcuPricePlanId').val();
    var jfObj = {
        department : _loginDepartment,
        storefront : _loginStore,
        jfTheCashierPeople : _loginUserId,
        jfBillingDate : new Date().format("yyyy-MM-dd hh:mm:ss"),
        jfHandlers : _loginUserId,
        jfHouseId : house.hsHouseId,
        jfHouse4storeId : house.hsId,
        jfLandlordId : house.hsLandlordId,
        jfTheOwnershipType : "租客",
        jfBelongingToTheName : popName,
        jfOperationRecords : "("+ new Date().format("yyyy-MM-dd hh:mm:ss") + ",添加收支记录)*",
        jfFinancialCoding : new Date().format("yyyyMMddhhmmss")+ parseInt(Math.random() * 10) +  parseInt(Math.random() * 10) + parseInt(Math.random() * 10),
        jfStartCycle : new Date().format("yyyy-MM-dd"),
        jfEndCycle : getNextMonth(new Date().format("yyyy-MM-dd")),
        jfAccountingWhy :  house.hsAddDistrict+ house.hsAddZone+ house.hsAddStreet+ house.hsAddCommunity+ house.hsAddBuilding+ house.hsAddDoorplateno,
        jfRenterId : renterId,
        jfJsrcId : jsrcId,
        jfBelongToChannel:jfBelongToChannel,
        jfPricePlan:jfPricePlan,
        jfSettlementMethod:"现结",
        jfCreditSituation:0
    }
    //现金收款
    if(payType == 1){
        jfObj.jfPayType = "现钞";
    }else{
        jfObj.jfPayType = "转账";
    }
    //退还押金
    var jfFinanNote =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行退房操作,退还押金";
    jfObj.jfAccountingSpecies = "房屋押金";
    jfObj.jfBigType = "押金类";
    jfObj.jfNatureOfThe = "支出";
    jfObj.jfClosedWay = _closeWay;
    jfObj.jfAccountId = (payType == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
    jfObj.jfSumMoney = jsrcDeposit;
    jfObj.jfFinanNote = jfFinanNote;
    jfAry.push(jfObj);

    //退还租金（提前搬离）
    if(type==1 && setUp.jsrsuRefundRoomCharge == 1){

        var jfObj1 = JSON.parse(JSON.stringify(jfObj));
        var jfFinanNote1 =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行提前搬离操作,退还租金";
        jfObj1.jfAccountingSpecies = "退还租金";
        jfObj1.jfBigType = "主营类";
        jfObj1.jfNatureOfThe = "支出";
        jfObj1.jfClosedWay = _closeWay;
        jfObj1.jfAccountId = (payType == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
        jfObj1.jfSumMoney = jfAryObj.refundment;
        jfObj1.jfFinanNote = jfFinanNote1;
        jfAry.push(jfObj1);
    }

    //附加消费
    var additionalSum = jfAryObj.additionalSum;
    if(additionalSum != 0 && additionalSum != "" && additionalSum != null){
        var jfObj2 = JSON.parse(JSON.stringify(jfObj));
        var jfFinanNote2 =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行办理退房,附加消费收入";
        jfObj2.jfAccountingSpecies = "商品消费";
        jfObj2.jfBigType = "商超类";
        jfObj2.jfNatureOfThe = "收入";
        jfObj2.jfClosedWay = _closeWay;
        jfObj2.jfAccountId = (payType == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
        jfObj2.jfSumMoney = additionalSum;
        jfObj2.jfFinanNote = jfFinanNote2;
        jfAry.push(jfObj2);
    }

    //欠费金额
    if(amountOfArrears!=0 && additionalSum != ""){
        var arrearsObj = JSON.parse(JSON.stringify(jfObj));
        var jfFinanNote3 =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行办理退房,退房时间超过限期，补交房价费用";
        arrearsObj.jfAccountingSpecies = "补交租金";
        arrearsObj.jfBigType = "主营类";
        arrearsObj.jfNatureOfThe = "收入";
        arrearsObj.jfClosedWay = _closeWay;
        arrearsObj.jfAccountId = (payType == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
        arrearsObj.jfSumMoney = amountOfArrears;
        arrearsObj.jfFinanNote = jfFinanNote3;
        jfAry.push(arrearsObj);
    }

    jfAry = JSON.stringify(jfAry);

    return jfAry;
}

//办理退房
function checkOut(){
    //获取当天时间
    var date = new Date().format("yyyy-MM-dd");
    //合约结束时间转化date格式
    var EndTime = $('#jsrcEndTime').val();
    var jsrcEndTime=new Date(EndTime).format("yyyy-MM-dd");
    //判断退房时间等于今天时间
    if(date<jsrcEndTime){
        //退房type：0 提前办理type：1
        $.messager.confirm("温馨提示", "未到预离时间,确定提前退房？", function(data) {
            if (data) {
                openCleanA(1);
            }else{
                return;
            }
        });
    }else{
        openCleanA(0);
    }
}

//退房
function openCleanA(type){
    $('#doMoveOutType').val(type);
    $('#checkOutDiv').dialog({
        title : _title_address+"办理退房",
        top : getTop(520),
        left : getLeft(600),
        width : 600,
        height : 520,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#checkOutDiv [clear="clear"]').val("");
            //清空table数据
            var data = [];
            $('#serviceCharge1').datagrid('loadData',data);
        }
    });
    //创建服务消费表格
    $('#serviceCharge1').datagrid({
        columns : [ [
            {
                field : 'popservice',
                title : '服务',
                width : 10,
                align : 'center',
                editor : 'textbox'
            },
            {
                field : 'popcharge',
                title : '金额',
                width : 5,
                align : 'center',
                editor : 'textbox'
            },
            {
                field : 'deleteAdd',
                title : '删除',
                width : 5,
                align : 'center',
                formatter : function(value, row, index) {
                    return "<a href='#' onclick=\"myDeleteRows('"+row.popservice+"','popservice','serviceCharge1',0);computeDeleteMoney()\">删除</a>";
                }
            } ] ],
        width : '573px',
        height : '200px',
        singleSelect : true,
        autoRowHeight : false,
        scrollbarSize : 0,
        showPageList : false,
        fitColumns : true,
    });
    var	outJsrcHsId=$('#jsrcHsId').val();
    $('#checkOutDiv').dialog('open');

    //加载设置表服务类型
    var setUpObj=JSON.parse(JSON.stringify(setUp));
    var jsrsuServiceCharge=setUpObj.jsrsuServiceCharge;
    var popType=JSON.parse(jsrsuServiceCharge);
    var htmls="<option></option>"
    var serviceType="";
    for(var i in popType){
        serviceType=popType[i].popservice;
        htmls +='<option>'+popType[i].popservice+'</option>';
    }
    $("#additionalDescription").html(htmls);

    //欠费金额
    var jsrcArrears=$("#jsrcArrears").val();
    $('#amountOfArrears').val(jsrcArrears);
    $('#totaSum').val(jsrcArrears);

    //房间押金
    var jsrcDeposit = parseFloat($('#jsrcDeposit').val());
    $("#checkOutDeposit").val(jsrcDeposit);
    //应退金额
    $('#refundedRentMoneyDiv').hide();
    console.log(type)
    if(type == 1){//提前搬离
        var calculate = calculateMoney();
        console.log(calculate)
        //setUp.jsrsuRefundRoomCharge == 1允许退房费 且 jsrcArrears == 0 没有逾期
        if(setUp.jsrsuRefundRoomCharge == 1 && jsrcArrears == 0){
            $('#refundedRentMoneyDiv').show();
            $('#refundedRentMoney').val((calculate.refundment).toFixed(2));
        }else{
            $('#refundedRentMoney').val(0.00);
        }

        $('#refundedMoney').val(calculate.refundmentTotalPrice);
    }else{//正常退房
        var totaSum = parseFloat($('#totaSum').val());
        $('#refundedRentMoney').val('0.00');
        $('#refundedMoney').val(jsrcDeposit-totaSum);
    }
    $("#payMoneyText").val($('#refundedMoney').val());
    changeButton(type);
}

function computeDeleteMoney(){
    var amountOfArrears=$('#amountOfArrears').val();
    var row=$('#serviceCharge1').datagrid("getRows");
    //计算总价格
    var num=0;
    var sum=0;
    for(var i in row){
        sum += parseFloat(row[i].popcharge);
    }
    $('#additionalSum').val(parseFloat(sum).toFixed(2));
    var totaSum= (parseFloat(sum)+parseFloat(amountOfArrears)).toFixed(2);
    $('#totaSum').val(parseFloat(totaSum).toFixed(2));

    var refundedMoney = $("#checkOutDeposit").val() * 1.0 + $("#refundedRentMoney").val() * 1.0;
    var refundTotaSum = (parseFloat(refundedMoney)-parseFloat(totaSum)).toFixed(2);
    $("#refundedMoney").val(refundTotaSum);

    var type = $("#doMoveOutType").val();
    changeButton(type);
}

//选择服务显示价格
function openService(){
    var newadditional=$("#additionalDescription").val();

    var typeList=JSON.parse(JSON.stringify(setUp));
    var jsrsuServiceCharge=typeList.jsrsuServiceCharge;
    var popType=JSON.parse(jsrsuServiceCharge);
    var serviceType="";
    if(newadditional != ''){
        for(var i in popType){
            serviceType=popType[i].popservice;
            if(newadditional==serviceType){
                $('#additionalCost').val(popType[i].popcharge);
            }
        }
    }else{
        $('#additionalCost').val(0);
    }
}

//添加附加类型、附加费用进表格
function addService1(){
    var additionalDescription=$("#additionalDescription").val();
    var additionalCost=$('#additionalCost').val();
    var amountOfArrears=$('#amountOfArrears').val();
    var row=[];
    if(additionalDescription !="" && additionalCost !=""){
        row=$('#serviceCharge1').datagrid("getRows");
        var obj={};
        obj.popservice=additionalDescription;
        obj.popcharge=additionalCost;
        row.push(obj);
    }
    if(row.length > 0 ){
        $('#serviceCharge1').datagrid('loadData',row);
    }else{
        myTips("请选择附加消费","error");
        return;
    }

    //计算总价格
    var num=0;
    var sum=0;
    for(var i in row){
        sum += parseFloat(row[i].popcharge);
    }
    $('#additionalSum').val(sum.toFixed(2));
    var totaSum= parseFloat(sum)+parseFloat(amountOfArrears);
    $('#totaSum').val(parseFloat(totaSum).toFixed(2));
//	$("#payMoneyText").val(parseFloat(totaSum).toFixed(2));

    var refundedMoney = $("#checkOutDeposit").val() * 1.0 + $("#refundedRentMoney").val() * 1.0;
    var refundTotaSum = (parseFloat(refundedMoney)-parseFloat(totaSum)).toFixed(2)
    $("#refundedMoney").val(refundTotaSum);
    $("#payMoneyText").val(Math.abs(refundTotaSum));

    var type = $("#doMoveOutType").val();
    changeButton(type);
}

function computeCheckOutFee(){
    var additionalSum = $("#additionalSum").val();
    var amountOfArrears = $("#amountOfArrears").val();

    additionalSum = additionalSum == "" ? 0 : additionalSum;
    amountOfArrears = amountOfArrears == "" ? 0 : amountOfArrears;

    var sum = parseFloat(additionalSum)+parseFloat(amountOfArrears);
    $("#totaSum").val(sum)
    var refundedMoney = $("#checkOutDeposit").val() * 1.0 + $("#refundedRentMoney").val() * 1.0;
    refundedMoney = (parseFloat(refundedMoney)-parseFloat(sum)).toFixed(2)
    $("#refundedMoney").val(refundedMoney);
    $("#payMoneyText").val(Math.abs(refundedMoney));

    var type = $("#doMoveOutType").val();
    changeButton(type);
}

/*
 * 退房type=0 提前办理type=1
 * refundedMoney >= 0 支出
 * refundedMoney < 0 收入
 * */
function changeButton(type){
    var jsrcPaymentMethod = $('#jsrcPaymentMethod').val();
    var refundedMoney = parseFloat($('#refundedMoney').val());
    //type=4时，应退金额大于0；退还金额
    var jsrcFirstPay = parseFloat($('#jsrcFirstPay').val())
    var isOnlineRefund = jsrcFirstPay >= refundedMoney;
    $(".hiddenButton").hide();

    if(type == 0){	//正常退房
        if(refundedMoney >= 0){	//退款
            $("#refundType0").show();
            $("#normalCheckout0").show();
            if(isOnlineRefund && (jsrcPaymentMethod == '扫码支付' || jsrcPaymentMethod == '在线支付')){	//满足原路退还
                $("#normalCheckout1").show();
            }
        }else{	//收款
            $("#doMoveOut0").show();
        }
    }else{	//提前搬离
        if(refundedMoney >= 0){	//退款
            $("#refundType1").show();
            $("#advanceCheckoutType0").show();
            if(isOnlineRefund && (jsrcPaymentMethod == "扫码收款" || jsrcPaymentMethod == "在线支付")){	//满足原路退还
                $("#advanceCheckoutType1").show();
            }
        }else{	//收款
            $("#doMoveOut1").show();
        }
    }
}

function openClean(type,payType){
    $('#cleanDlg').dialog({
        title : "选择保洁人员",
        top : getTop(150),
        left : getLeft(300),
        width : 300,
        height : 150,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#cleanDlg [clear="clear"]').val("");
        }
    });

    if(type == 1){//批量设置保洁
        $('#doChangeHouse').hide();//隐藏换房的确定
        $('#doSetDirtyRoom').show();//显示设置脏房的确定
        $('#hopeTime').show();//显示input框 期望时间
        //判断是否勾选房间
        var text = "";
        var check = 0;
        $(".oneCheckBox").each(function () {
            if ($(this).is(":checked")) {
                var house = getHouseData($(this).attr("jsrcHsId"));
                if(house.hsDirtyHouse == 0){
                    check = 1;
                }
                if(house.hsDirtyHouse == 1){
                    check = 2;
                    text="所选房间有保洁任务未完成";
                }
                if(house.hsDirtyHouse == 2){
                    check = 2;
                    text="所选房间有维修任务未完成";
                }
                if(house.hsDirtyHouse == 3){
                    check = 2;
                    text="所选房间有装修任务未完成";
                }
            }
        });
        if(check == 2 && text != "" || check == 1 && text != ""){
            myTips(text,"error");
            return;
        }
        if(check == 0 && text == ""){
            myTips("请勾选房间","error");
            return;
        }
        if(check == 1 && text == ""){
            $('#cleanDlg').dialog('open');
            return;
        }
    }else{
        $('#doChangeHouse').attr("onclick","doChangeHouse("+payType+")");
    }
    $('#cleanDlg').dialog('open');
}


function openRenew(){
    var endTime = new Date($('#jsrcEndTime').val()).format("yyyy-MM-dd hh:mm:ss");
    $('#oldEndTime').val(endTime);

    $('#renewDlg').dialog({
        title : _title_address + " 办理续住",
        top : getTop(240),
        left : getLeft(445),
        width : 445,
        height : 240,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#newEndTime').val('');
            $('#newTotalDay').val('');
            $('#sunMoney').val('');
            $('#jsrcDailyPrice1').val('');
        }
    });

    $('#renewDlg').dialog('open');
}
function doRenew(type){
    var oldEndTime = new Date($('#oldEndTime').val()).getTime();
    var newEndTime = new Date($('#newEndTime').val()).getTime();

    var jsrcHsId = $('#jsrcHsId').val();

    if(!checkTime(jsrcHsId,oldEndTime,newEndTime,0)){
        myTips("新续住的时间段内已有其他订单","error");
        return;
    }
    if($('#newEndTime').val() == null || $('#newEndTime').val() == ""){
        myTips("新退房时间不能为空","error");
        return;
    }

    var jsrcId = $('#jsrcId').val();
    var renterId = $('#jsrcRenterId').val();

    var sunMoney = parseFloat($('#sunMoney').val()).toFixed(2);

    var popName = $('#popName').val();

    var house = getHouseData(jsrcHsId);


    var jfAry = [];
    //收支
    var jfObj = {
        department : _loginDepartment,
        storefront : _loginStore,
        jfTheCashierPeople : _loginUserId,
        jfBillingDate : new Date().format("yyyy-MM-dd hh:mm:ss"),
        jfHandlers : _loginUserId,
        jfHouseId : house.hsHouseId,
        jfHouse4storeId : house.hsId,
        jfLandlordId : house.hsLandlordId,
        jfTheOwnershipType : "租客",
        jfBelongingToTheName : popName,
        jfOperationRecords : "("+ new Date().format("yyyy-MM-dd hh:mm:ss") + ",添加收支记录)*",
        jfFinancialCoding : new Date().format("yyyyMMddhhmmss")+ parseInt(Math.random() * 10) +  parseInt(Math.random() * 10) + parseInt(Math.random() * 10),
        jfStartCycle : new Date().format("yyyy-MM-dd"),
        jfEndCycle : getNextMonth(new Date().format("yyyy-MM-dd")),
        jfAccountingWhy :  house.hsAddDistrict+ house.hsAddZone+ house.hsAddStreet+ house.hsAddCommunity+ house.hsAddBuilding+ house.hsAddDoorplateno,
        jfRenterId : renterId,
        jfJsrcId : jsrcId,
    }

    var jfFinanNote =  house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno + "房进行租房操作,获得租金";
    jfObj.jfPayType = "现钞";
    jfObj.jfAccountingSpecies = "租金";
    jfObj.jfBigType = "主营类";
    jfObj.jfNatureOfThe = "收入";
    jfObj.jfClosedWay = _closeWay;
    jfObj.jfAccountId = (type == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount);
    jfObj.jfSumMoney = sunMoney;
    jfObj.jfFinanNote = jfFinanNote;

    jfAry.push(jfObj);

    jfAry = JSON.stringify(jfAry);
    showLoading();
    $.ajax({
        url:"../insertFinancialAll.action",
        data:{
            jsonArray : jfAry
        },
        type:"post",
        dataType:"json",
        success:function(data){
            if(data.code == 1){
                updateShortRent(house,type);
            }else{
                myTips(data.msg,"error");
            }
        }

    })
}
//type 为付款方式 1 为现金收银 2 为扫码收银 3 为台卡收银
function updateShortRent(house,type){
    var jsrcId = $('#jsrcId').val();
    var newEndTime = $('#newEndTime').val();
    var oldEndTime = $('#oldEndTime').val();
    var newPrice = $('#jsrcDailyPrice1').val();
    var newTotalPrice = $('#sunMoney').val();

    var oldTotalPrice = $('#jsrcAmountPayable').val();

    var newDay = $('#newTotalDay').val();
    var oldDay = $('#jsrcTotalDays').val();
    var allDay =  parseInt(newDay) + parseInt(oldDay);
    var popName = $('#popName').val();
    var oldAmountOfDiscount=$('#amountOfDiscount').val();//折后价格,实付的价格
    var newjsrcTotalPrice=(parseFloat(newTotalPrice)+parseFloat(oldAmountOfDiscount)).toFixed(2);

    var totalPrice = parseFloat(newTotalPrice) + parseFloat(oldTotalPrice);
    var aveDailyPrice = (totalPrice / allDay).toFixed(2);

    var text = "给 "+popName +" 办理 " +house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno +" 房间从 "+oldEndTime+" 到 "+newEndTime+" 的续住,日均价"+newPrice+"共"+newDay+"天,总价:"+newTotalPrice;

    var jsrcFollow = creatFollow(text,1);

    var follow = JSON.parse($('#jsrcFollow').val().substring(1, $('#jsrcFollow').val().length-1));

    follow.push(jsrcFollow);

    jsrcFollow = JSON.stringify(follow);

    var moneyInput = $('#moneyInput').val();
    var payableMoney = parseFloat($('#sunMoney').val()).toFixed(2);

    $.ajax({
        url:"../updateShortRent.action",
        data:{
            jsrcId:jsrcId,
            jsrcEndTime:newEndTime,
            jsrcTotalDays:allDay,
            jsrcTotalPrice:newjsrcTotalPrice,
            jsrcAmountPayable:totalPrice,
            jsrcDailyPrice:aveDailyPrice,
            jsrcFollow:jsrcFollow,
            type:type,
            authCode:moneyInput,
            wxpayBody:"扫码支付",
            totalPrice:payableMoney
        },
        type:"post",
        dataType:"json",
        success:function(data){
            hideLoading();
            if(data.code == 1){
                myTips(data.msg,"success");
                $('#checkOutDlg').dialog('close');
                $('#renewDlg').dialog('close');
                $('#openCashDlg').dialog('close');
                getListContract();
            }else{
                myTips(data.msg,"error");
            }
        }
    })
}

function manualInput(){
    var idCard = $("#checkInDlg1 .clientIdcard").val();
    if(idCard != ""){
        $(".clientCardReading").hide();
        $("#addLiveMan").show();

    }

}

function changeEndTime(){
	var planPackage = JSON.parse($('#jppPlanPackage').val());
	var price = 0.0;
	for(var i in planPackage){
		if(planPackage[i].roomType == $('.hsRoomType').val()){
			price = planPackage[i].price;
		}
	}
    
    var newEndTime = $('#newEndTime').val();

    var oldEndTime = $('#oldEndTime').val();

    if(newEndTime == ""){
        return;
    }
    if(newEndTime!=''){
        var hsId = $('#jsrcHsId').val();
        var house = getHouseData(hsId);

        newEndTime = new Date(newEndTime).format("yyyy-MM-dd hh:mm:ss");
        var day = getDay(oldEndTime,newEndTime);

        /*var weekdayResult = checkWeekend(oldEndTime,newEndTime);
        var weekday = weekdayResult.weekDays;

        var ordinaryDay = day - weekday;

        var totalPrice = ordinaryDay * house.hsDailyRent + weekday * house.hsHotDailyRent;
        var averagePrice = (totalPrice / day).toFixed(2);
        totalPrice = totalPrice.toFixed(2);*/
        var totalPrice = parseFloat(day*price).toFixed(2);
        var averagePrice = (totalPrice / day).toFixed(2);
        
        $('#jsrcDailyPrice1').val(averagePrice);
        $('#sunMoney').val(totalPrice);
        $('#payableMoney').val(totalPrice);
        $('#payMoneyText').val(totalPrice);
        $('#payableMoney').val(totalPrice);

//        $('#description').html("<div style='margin:10px 0 0 10px'>(时间段内含有"+weekday+"天周末，建议日均价格为"+averagePrice+")</div>")

        $('#newTotalDay').val(day);

    }

}

function changPrice(){
    var price = $('#jsrcDailyPrice1').val();
    var newEndTime=$('#newEndTime').val();
    var day =  $('#newTotalDay').val();
    if(price!='' && newEndTime!=''){
        var totalPrice = parseFloat(price) * parseInt(day);
        $('#sunMoney').val(totalPrice);
        $('#payableMoney').val(totalPrice);
    }

}

function getHouseData(hsId){
    var house;
    for(var i in house_list_arr){
        if(house_list_arr[i].hsId == hsId){
            house = JSON.parse(JSON.stringify(house_list_arr[i]));
            break;
        }
    }
    return house;
}

function getListContract(){
    var jsrcBeginTime = GetDateStr(-10);
    var jsrcEndTime = GetDateStr(20);
    $.ajax({
        type:"post",
        url:"../listShortRentContract.action",
        data:{
            hsIdListStr:hsIdList,
            contractState:"未结束订单",
            jsrcBeginTime:jsrcBeginTime,
            jsrcEndTime:jsrcEndTime
        },
        dataType:"json",
        success:function(result){
            if(result.code > 0){
                var data = result.body;
                var event_save_list = [];
                for(var i in data){
                    if(data[i].jsrcState != "取消保留" && data[i].jsrcState != "退定" ){//&& data[i].jsrcState != "退房"
                        var num = 0;
                        if(data[i].popJson != "" && data[i].popJson != null){
                            num = JSON.parse(data[i].popJson.getRealJsonStr()).length;
                        }
                        data[i].begin_time = data[i].jsrcBeginTime;
                        data[i].end_time = data[i].jsrcEndTime;
                        data[i].event_id = data[i].jsrcId;
                        data[i].jsrcHsId = data[i].jsrcHsId;
                        data[i].status = data[i].jsrcState;
                        data[i].total_money = data[i].jsrcTotalPrice;
                        data[i].total_days = data[i].jsrcTotalDays;
                        data[i].total_people = num;
                        event_save_list.push(data[i]);
                    }
                }
                event_list = event_save_list;

                //对日历右侧的格子进行绘图
                draw_right_col(house_list_arr)
                //加载短租订单到日历中显示
                load_events(event_list)
                //条件查询结果的总数量
                querySourceInfo()
            }
        }
    })

}
function refash(){
    initInfo();
}

function getHouseInfo(){
    $.ajax({
        type:"post",
        url:"../selectShortRentHouse.action",
        data:{
            hsLeaseState		: "短租房",
        },
        dataType:"json",
        success:function(data){
            var body = data.body;
            var idList = [];
            for(var a in body){
                for(var j in body[a]){
                    body[a][j] = body[a][j] == null ? "" : body[a][j];
                }
                body[a].roomName = body[a].hsAddBuilding + body[a].hsAddDoorplateno;
                idList.push(body[a].hsId)
            }
            hsIdList = idList;
            if(hsIdList.length == 0){
                myTips("没有符合条件的房源","error");
                return;
            }
            hsIdList = JSON.stringify(hsIdList);
            house_list_arr = body;
        }

    })
    //对日历左侧房屋列表进行绘图
    draw_left_col(house_list_arr)
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
}

function initInfo(){
	var searchHsAddDoorplateno = $("#searchHsAddDoorplateno").val();
	var searchHsAddCommunity = $("#searchHsAddCommunity").val();
    var searchHouseType = $("#searchHouseType option:selected").val();
    searchHouseType = searchHouseType=="全部"?"":searchHouseType;
	$.ajax({
		type:"post",
		url:"../selectShortRentHouse.action",
		data:{
			hsAddCommunity			: searchHsAddCommunity,
			hsAddDoorplateno		: searchHsAddDoorplateno,
            hsRoomType              : searchHouseType,
			hsLeaseState			: "短租房",
		},
		dataType:"json",
		success:function(data){
			var body = data.body;
			var idList = [];
			for(var i in body){
				for(var j in body[i]){
					body[i][j] = body[i][j] == null ? "" : body[i][j];
				}
				body[i].roomName = body[i].hsAddBuilding + body[i].hsAddDoorplateno;
				idList.push(body[i].hsId)
			}
			hsIdList = idList;

            hsIdList = JSON.stringify(hsIdList);
            house_list_arr = body;

            //对日历左侧房屋列表进行绘图
            draw_left_col(house_list_arr)
            //对日历右侧的格子进行绘图
            draw_right_col(house_list_arr)

            if(hsIdList.length == 0){
                myTips("没有符合条件的房源","error");
                return;
            }

            var jsrcBeginTime = GetDateStr(-10);
            var jsrcEndTime = GetDateStr(20);
            $.ajax({
                type:"post",
                url:"../listShortRentContract.action",
                data:{
                    hsIdListStr:hsIdList,
                    contractState:"未结束订单",
                    jsrcBeginTime:jsrcBeginTime,
                    jsrcEndTime:jsrcEndTime
                },
                dataType:"json",
                success:function(result){
                    if(result.code > 0){
                        var data = result.body;
                        var event_save_list = [];
                        for(var i in data){
                            if(data[i].jsrcState != "取消保留" && data[i].jsrcState != "退定" ){//&& data[i].jsrcState != "退房"
                                var num = 0;
                                if(data[i].popJson != "" && data[i].popJson != null){
                                    num = JSON.parse(data[i].popJson.getRealJsonStr()).length;
                                }
                                data[i].begin_time = data[i].jsrcBeginTime;
                                data[i].end_time = data[i].jsrcEndTime;
                                data[i].event_id = data[i].jsrcId;
                                data[i].jsrcHsId = data[i].jsrcHsId;
                                data[i].status = data[i].jsrcState;
                                data[i].total_money = data[i].jsrcTotalPrice;
                                data[i].total_days = data[i].jsrcTotalDays;
                                data[i].total_people = num;
                                event_save_list.push(data[i]);
                            }
                        }

                        event_list = event_save_list;
                        //加载短租订单到日历中显示
                        load_events(event_list)
                    }
                }
            })
        }
    })

}

function searchData(){
    var searchHouseType = $("#searchHouseType option:selected").val();

    var searchHouseList = JSON.parse(JSON.stringify(house_list_arr));

    var temporaryList = [];
    if(searchHouseType != "全部"){

        for(var i in searchHouseList){
            if(searchHouseList[i].hsRoomType == searchHouseType){
                temporaryList.push(searchHouseList[i])
            }
        }
        searchHouseList = temporaryList;
    }

    var searchHouseStart =$("#searchHouseStart").val();
    var searchHouseEnd = $("#searchHouseEnd").val();

    var eventList=[];
    if(searchHouseStart != "" && searchHouseEnd != ""){
        var temporaryList = [];
        var startTime = new Date($("#searchHouseStart").val()).format('yyyy-MM-dd ' + setUp.jsrsuCheckInTime +':00');
        startTime = new Date(startTime).getTime();
        var endTime = new Date($("#searchHouseEnd").val()).format("yyyy-MM-dd " + setUp.jsrsuCheckOutTime +":00");
        endTime = new Date(endTime).getTime();
        for(var i in searchHouseList){
            var check = checkTime(searchHouseList[i].hsId, startTime, endTime,1);
            if(!check.flag){
                eventList.push(check.event)
                temporaryList.push(searchHouseList[i])
            }
        }
        searchHouseList = temporaryList;
    }else{
        eventList = event_list;
    }

    //对日历右侧的格子进行绘图
    draw_right_col(searchHouseList)
    //对日历左侧房屋列表进行绘图
    draw_left_col(searchHouseList)
    //加载短租订单到日历中显示
    load_events(eventList)
}

function openChangeHouse(){
    $('#changeHouseDlg').dialog({
        title : _title_address + " 更换房间",
        top : getTop(250),
        left : getLeft(500),
        width : 500,
        height : 250,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#changeHouseDlg [clear="clear"]').val("");
            $(".hiddenClass").hide();
        }
    });
    var hsRoomType = $('.hsRoomType').val();
    $('#choiceHouseType').val(hsRoomType);

    //判断订单状态

    var jsrcState=$('#jsrcState').val();
    if(jsrcState!='已住'){
        $("#repayMoneyChangeHouse").show();
    }else{
        $("#repayMoneyChangeHouseOpenClean").show();
    }
    choiceHouseType();
    $("#payMoneyText").val(0.00);
    $("#changeHouseMoney").val(0);
    $('#changeHouseDlg').dialog('open');
}

function checkChangeHouseMoney(){
    var money = $("#changeHouseMoney").val();
    money = parseFloat(money).toFixed(2);
    var jsrcState = $("#jsrcState").val();
    $(".hiddenClass").hide();
    if(money <= 0 || $("#changeHouseMoney").val() == ""){
        if(jsrcState == "已住"){
            $("#repayMoneyChangeHouseOpenClean").show();
        }else{
            $("#repayMoneyChangeHouse").show();
        }
    }else{
        if(jsrcState == "已住"){
            $("#changHouseOpenClean").show();
        }else{
            $("#directChangeHouse").show();
        }
    }
    $("#changeHouseMoney").val(money);
    $("#payMoneyText").val(money);
}

function choiceHouseType(){
    var choiceHouseType = $('#choiceHouseType').val();

    var startTime = $("#jsrcBeginTime").val();
    var endTime = $("#jsrcEndTime").val();

    var nowHsId = $("#jsrcHsId").val();
    //现居住的房子
    var nowHouse = {};

    var house = [];
    var houseList = JSON.parse(JSON.stringify(house_list_arr));
    for(var i in houseList){
        if(houseList[i].hsId == nowHsId){
            nowHouse = houseList[i];
        }
        if(checkTime(houseList[i].hsId, startTime, endTime, 0)){
            if(houseList[i].hsDirtyHouse==0){
                house.push(houseList[i]);
            }

        }
    }
    $("#nowHouse").val(nowHouse.hsAddCommunity + nowHouse.hsAddBuilding+ nowHouse.hsAddDoorplateno);

    var htmls = "<option></option>";
    for(var i in house){
        if(house[i].hsRoomType == choiceHouseType){
            var add = house[i].hsAddCommunity + house[i].hsAddBuilding+ house[i].hsAddDoorplateno;
            htmls += '<option data-id="'+house[i].hsId+'">'+add+'</option>';
        }
    }

    $("#canChangeHouseList").html(htmls);
}

//补差价
function changeHouseMoney(){
	//获取所换房型的价格 price
    var jppPlanPackage = JSON.parse($('#jppPlanPackage').val());
    var choiceHouseType = $('#choiceHouseType').find('option:selected').val();	//新选择的房型
    var jsrcTypeOccupancy =$("#jsrcTypeOccupancy").val();
    console.log(jsrcTypeOccupancy);
    var price = 0.0;
    for(var i in jppPlanPackage){
    	if(jppPlanPackage[i].roomType == choiceHouseType){

    	    if(jsrcTypeOccupancy == "钟点客房"){
                price = jppPlanPackage[i].hourPrice;
            }else{
                price = jppPlanPackage[i].price;
            }

    	}
    }
    
    /* ************************ 开始计算差价 ************************/

    var oldTotalPrice = parseFloat($('#amountOfDiscount').val());	//原客房的支付的总金额
    //押金
    var deposit = parseFloat($('#jsrcDeposit').val());
    var totalDays =Number($("#jsrcTotalDays").val());
    var newTotalPrice =0.00;
    if(jsrcTypeOccupancy =="普通客房"){

        if(setUp.jsrsuDepositSetType != ""){
            var jsrsuDepositSetType = JSON.parse(setUp.jsrsuDepositSetType);
            /*
             * 判断的押金规则，计算换房后的总金额
             * type=0时按照日均价计算，此时需要根据不同房型重新计算押金
             * type=1时按照设置的押金规则来，此时不需要再而外计算押金
             * */
            if(jsrsuDepositSetType.type == 0){//按照日均价计算，此时需要根据不同房型重新计算押金
                deposit = Math.round((dailyRent/100)+0.49)*100;
                deposit = deposit.toFixed(2);

                newTotalPrice = parseFloat(totalDays*price) + parseFloat(deposit);
            }else{
                newTotalPrice = parseFloat(totalDays*price) + parseFloat(jsrsuDepositSetType.depositMoney);
            }
        }else{
            newTotalPrice = parseFloat(totalDays*price);
        }
    }else{

        var jsrsuHourRoom=setUp.jsrsuHourRoom;						//获取钟点房间规则
        var hourRoom=Number(JSON.parse(jsrsuHourRoom).hourRoom);				//获取钟点房时间
        newTotalPrice = parseFloat(hourRoom*price) + parseFloat(deposit);

    }


    //差价 大于0时才进行补差价，若小于或者等于0则不需补差价也不需要退钱
    var priceDifference = newTotalPrice-oldTotalPrice > 0 ? parseFloat(newTotalPrice - oldTotalPrice).toFixed(2) : 0.00;
    
    var money = parseFloat(priceDifference).toFixed(2);
    var jsrcState = $("#jsrcState").val();
    $(".hiddenClass").hide();
    if(money <= 0 || $("#changeHouseMoney").val() == ""){
        if(jsrcState == "已住"){
            $("#repayMoneyChangeHouseOpenClean").show();
        }else{
            $("#repayMoneyChangeHouse").show();
        }
    }else{
        if(jsrcState == "已住"){
            $("#changHouseOpenClean").show();
        }else{
            $("#directChangeHouse").show();
        }
    }
    $("#changeHouseMoney").val(money);
    $("#payMoneyText").val(money);
}

function doChangeHouse(payType){

    var jsrcId = $("#jsrcId").val();
    var hsId = $("#canChangeHouseList option:selected").attr("data-id");

    if(hsId == ""){
        myTips("请先选择房间进行换房","error");
        return;
    }

    var oldAdd = $("#nowHouse").val();
    var newAdd = $("#canChangeHouseList option:selected").text();
    var popCustomerName=$("#popCustomerName").val();
    var Reason=$("#Reason").val();

    var text ="客户 "+popCustomerName+" 因 " +Reason+"原因"+","+"从"+oldAdd+"办理换房手续"+","+"新房间:"+newAdd;

    var jsrcFollow = creatFollow(text,1);

    var follow = $("#jsrcFollow").val();

    var cleanUserId = $('#searchCleanManagerGetUserId').val();

    var jsrcHsId = $('#jsrcHsId').val();

    var jsrcState = $('#jsrcState').val();

    var changeHouseMoney = $("#changeHouseMoney").val();

    if(cleanUserId == "" &&jsrcState=='已住'){
        myTips("请选择清洁人员","error");
        return;
    }

    if(follow != ""){
        follow = JSON.parse(follow.getRealJsonStr());
        follow.push(jsrcFollow);
        jsrcFollow = JSON.stringify(follow);
    }

    var sendData = {
        jsrcId:jsrcId,
        jsrcHsId:hsId,
        laoHsId:jsrcHsId,
        jsrcFollow:jsrcFollow,
        jsrcState:jsrcState,
    };

    if(payType == 2){
        var moneyInput = $('#moneyInput').val();
        sendData.authCode = moneyInput;
        sendData.wxpayBody = "酒店支付";
        sendData.totalPrice = changeHouseMoney;
    }

    if(jsrcState=='已住'){
        var repEventRp = oldAdd +"需要清洁，请尽快处理";

        var addTaskObj = {
            repHouse4storeId: jsrcHsId,
            repResponsibility : "负责人",
            repEventRp : repEventRp,
            repHopeTime : "尽快",
            repRepairPeopleId : cleanUserId,
            repUserId : _loginUserId,
            repReportingTime : new Date().format("yyyy-MM-dd hh:mm:ss"),
            repTypeRp : "租务维修",
            repDepartment : _loginDepartment,
            repStorefront : _loginStore,
            repTaskTime : new Date().format("yyyy-MM-dd"),
            type:"维保"
        };

        addTaskObj = JSON.stringify(addTaskObj);
        sendData.addTaskObj = addTaskObj;
    }

    var house = getHouseData(hsId);

    var renterName = $("#popCustomerName").val();
    var jsrcRenterId = $("#jsrcRenterId").val();

    if(changeHouseMoney != 0){
        var jfAry = [];
        //收支2
        var jfObj = {
            department : _loginDepartment,
            storefront : _loginStore,
            jfTheCashierPeople : _loginUserId,
            jfBillingDate : new Date().format("yyyy-MM-dd hh:mm:ss"),
            jfHandlers : _loginUserId,
            jfHouseId : house.hsHouseId,
            jfHouse4storeId : hsId,
            jfLandlordId : house.hsLandlordId,
            jfTheOwnershipType : "租客",
            jfBelongingToTheName : renterName,
            jfOperationRecords : "("+ new Date().format("yyyy-MM-dd hh:mm:ss") + ",添加收支记录)*",
            jfFinancialCoding : new Date().format("yyyyMMddhhmmss")+ parseInt(Math.random() * 10) +  parseInt(Math.random() * 10) + parseInt(Math.random() * 10),
            jfStartCycle : new Date().format("yyyy-MM-dd"),
            jfEndCycle : getNextMonth(new Date().format("yyyy-MM-dd")),
            jfAccountingWhy :  house.hsAddDistrict+ house.hsAddZone+ house.hsAddStreet+ house.hsAddCommunity+ house.hsAddBuilding+ house.hsAddDoorplateno,
            jfRenterId : jsrcRenterId,
            jfJsrcId : jsrcId,
            jfClosedWay:_closeWay,
            jfAccountId:(payType == 2 ? setUp.jsrsuShopAccount : setUp.jsrsuCashAccount)
        };
        if(changeHouseMoney > 0){
            var jfFinanNote =  text + ",补房费差价";
            jfObj.jfPayType = "现钞";
            jfObj.jfAccountingSpecies = "租金";
            jfObj.jfBigType = "主营类";
            jfObj.jfNatureOfThe = "收入";
            jfObj.jfSumMoney = changeHouseMoney;
            jfObj.jfFinanNote = jfFinanNote;
        }else if(changeHouseMoney < 0){
            var jfFinanNote =  text + ",还房费差价";
            jfObj.jfPayType = "现钞";
            jfObj.jfAccountingSpecies = "租金";
            jfObj.jfBigType = "主营类";
            jfObj.jfNatureOfThe = "支出";
            jfObj.jfSumMoney = Math.abs(changeHouseMoney);
            jfObj.jfFinanNote = jfFinanNote;
        }

        jfAry.push(jfObj);
        var jsonArray = JSON.stringify(jfAry);
        sendData.jsonArray = jsonArray;
    }

    showLoading();
    $.ajax({
        url:"../changeShortRentHouse.action",
        type:"post",
        data : sendData,
        dataType:"json",
        success:function(result){
            hideLoading();
            if(result.code > 0){
                myTips("换房成功", "success");
                $('#changeHouseDlg').dialog('close');
                $('#cleanDlg').dialog('close')
                $('#checkOutDlg').dialog('close');
                $('#openCashDlg').dialog('close');
                refash();
            }else{
                myTips(result.msg,"error");
            }
        }
    })
}

function getDoorCard(page){
    var startNum = (parseInt(page) - 1) * 10;
    var endNum = 10;
    var doorCardPopName = $('#doorCardPopName').val();
    var doorCardAddCommunity = $('#doorCardAddCommunity').val();
    var doorCardAddDoorplateno = $('#doorCardAddDoorplateno').val();
    var doorCardLockName = $('#doorCardLockName').val();
    var doorCardLockState = $('#doorCardLockState').find('option:selected').text();
    var doorCardNum = $('#doorCardNum').val();
    var jdcPopId = $('#jdcPopId').val();
    $.ajax({
        url:"../listDoorCard.action",
        type:"post",
        data:{
            startNum 		 : startNum,
            endNum 			 : endNum,
            popName			 : doorCardPopName,
            hsAddCommunity 	 : doorCardAddCommunity,
            hsAddDoorplateno : doorCardAddDoorplateno,
            devNickname 	 : doorCardLockName,
            jdcState 		 : doorCardLockState,
            jdcCardNum 		 : doorCardNum,
            jdcPopId         : jdcPopId,
            hsLeaseState	 : "短租房",
        },
        success:function(result){
            if(result.code == 1){
                var data = result.body;
                for (var i in data) {
                    data[i].shortHouseAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
                }
                if(page == 1){
                    _indexNum[0] = 0;
                    sourcePage(data[0].totalNum, page, 0);
                }
                $("#doorCardTable").datagrid("loadData",data);
            }else{
                myTips('没有查询到数据','error');
                return;
            }
        }
    })
}

//新增收支单元格编辑
var editIndex1 = undefined;
function endEditing1() {
    if ($('#serviceCharge').datagrid('validateRow', editIndex1)) {
        $('#serviceCharge').datagrid('endEdit', editIndex1);
        editIndex1 = undefined;
        return true;
    }

}
function onClickCell1(index, field) {
    if (endEditing1()) {
        $('#serviceCharge').datagrid('selectRow', index).datagrid(
            'editCell', {
                index : index,
                field : field
            });
        editIndex1 = index;
    }
}

//添加房型字段
function addInput(id){
    var html = '<div style="margin: 10px 0 0 0px"><input class="'+id+'Item" value="" style="width:280px;" /><img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -5px 10px" /></div>';

    $("#" + id).append(html);
}
//删除房型字段
$("#jsrsuRoomType,#address").delegate(".cleanItem","click",function(){
    $(this).parent().remove();
})

function getInputItem(id){
    var array = [];

    $("#"+id+" ."+id+"Item").each(function (){
        var item = {};
        item["roomType"] = $(this).val();
        array.push(item);
    })

    return JSON.stringify(array)
}
//打开添加服务消费窗口
function addService(){
    $('#addServiceDlg').dialog({
        title : "添加服务",
        top : getTop(200),
        left : getLeft(300),
        width : 300,
        height : 200,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#service').val('');
            $('#charge').val('');
        }
    });
    $('#addServiceDlg').dialog('open');
}


//保存添加服务消费窗口
function doservice(){
    var service=$('#service').val();
    var charge=$('#charge').val();

    if(service !="" && charge !=""){
        var rows=$('#serviceCharge').datagrid("getRows");
    }
    obj={};
    obj.popservice=service;
    obj.popcharge=charge;
    rows.push(obj);
    $('#serviceCharge').datagrid('loadData',rows);
    $('#addServiceDlg').dialog('close');
}

/**
 * type 为付款方式 1 为现金收银 2 为扫码收银 3 为台卡收银
 * orderType 为订单类型 1为现场入住 2为保留订单入住 3为退房退钱 4为提前搬离退钱 5为续住
 */
function openCash(type,orderType,cut){
    var title = "";
    $("#moneyInput").val("");
    $("#changeMoney").html("0.00");
    $("#openCashDlg .cash").css("display","none");
    $("#openCashDlg .qrCode").css("display","none");
    $("#openCashDlg .qrCodeCustomer").css("display","none");
    if(type == 1){
        $("#openCashDlg .cash").css("display","block");
        $("#openCashDlg #moneyInput").attr("onkeyup","changMoney()");
        title = "现金收银";
    }else if(type == 2){
        $("#openCashDlg .qrCode").css("display","block");
        title = "扫码收银";
    }else if(type == 3){
        $("#openCashDlg .qrCodeCustomer").css("display","block");
        title = "台卡收款";
    }

    if(orderType == 1){
        $("#payType").attr("onclick","canCheckIn("+type+","+cut+")").html(title);
    }else if(orderType == 2){
        $("#payType").attr("onclick","doCheckIn("+type+","+cut+")").html(title);
    }else if(orderType == 3){
        $("#payType").attr("onclick","checkOutShortRent(0,"+type+","+cut+")").html(title);
    }else if(orderType == 4){
        $("#payType").attr("onclick","checkOutShortRent(1,"+type+","+cut+")").html(title);
    }else if(orderType == 5){
        $("#payType").attr("onclick","doRenew("+type+")").html(title);
    }else if(orderType == 6){
        $("#payType").attr("onclick","openClean(0,"+type+")").html(title);
    }else if(orderType == 7){
        $("#payType").attr("onclick","doChangeHouse("+type+")").html(title);
    }

    var money = $("#payMoneyText").val();
    var totalPrice =$("#totalPrice").val();
    if(totalPrice !=null && totalPrice != ''){
        $("#orderMoney").html(totalPrice);
    }else{
        $("#orderMoney").html(money);
    }


    $('#openCashDlg').dialog({
        title : title,
        top : getTop(300),
        left : getLeft(350),
        width : 350,
        height : 300,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#openCashDlg #moneyInput").removeAttr("onkeyup");
        },
    });

    $('#openCashDlg').dialog('open');

    $('#moneyInput').focus();
}


var renterInfo = [];
var listPopCustomerHtml = "";
//查询短租顾客
function listPopCustomer(){
    $.ajax({
        type:"post",
        url:"../listLivingCustomer.action",
        data:{
            splitFlag : 1
        },
        dataType:"json",
        success:function(data){
            if (data.code<0) {
            } else {
                data=data.body;
                renterInfo = data;
                for(var i in data){
                    if(data[i].infoPopulation != undefined){
                        var infoPopulation = data[i].infoPopulation;
                        listPopCustomerHtml += '<option label="'+infoPopulation.popIdcard+'" value="'+infoPopulation.popName+'" />'
                    }
                }
                $("#listPopCustomer").html(listPopCustomerHtml);
            }
        }
    });
}

//下拉列表点击事件
function changeRenterInfo(){
    console.log($("#customerInfoTable").datagrid("getRows"));
    var popCustomerNameTable = $('#popCustomerNameTable').val();
    if(popCustomerNameTable != ""){
        for(var i in renterInfo){
            var infoPopulation = renterInfo[i].infoPopulation;
            if(infoPopulation.popName != undefined){
                if(infoPopulation.popName == popCustomerNameTable){
                    for(var j in infoPopulation){
                        $('#'+j+'Table').val(infoPopulation[j])
                    }
                    $('#checkInNum').val(renterInfo[i].jsrrCheckInNum)
                    $('#customerSelect').val(renterInfo[i].jsrrCustomerType);
                    if(infoPopulation.popIdcardType != undefined){
                        $('#pop_idcard_type').val(infoPopulation.popIdcardType);
                    }
                    var jcuType = renterInfo[i].jcuType;
                    var jcuGroupType = renterInfo[i].jcuGroupType;
                    console.log(jcuType+"    "+jcuGroupType)
                	//加载群体分类下拉列表 顺序不能换！！！
                    if(jcuType != null && jcuGroupType != null ){
                    	$('#checkInDlg1 .channelType').val(jcuType);
                    	getChannelInfo('checkInDlg1',0);
                    	setTimeout(function() {
                    		 $('#checkInDlg1 .groupType').val(jcuGroupType);
                            getHighestLevelPlan("checkInDlg1",0);
                    	}, 100)
                    }else{
                    	$('#checkInDlg1 .channelType').val("门店");
                    	getChannelInfo('checkInDlg1',0);
                    	setTimeout(function() {
                            $('#checkInDlg1 .groupType').val("散客");
                            getHighestLevelPlan("checkInDlg1",0);
                    	}, 100)
                    }
                    break;
                }
            }
        }
    }
    populationJudging();
}

//消费记录
function openPurchaseHistory(){
    var jsrcAdditionalCost = parseFloat($('#jsrcAdditionalCost').val()).toFixed(2);

    $('#totalMoney').val(jsrcAdditionalCost);
    var jsrcAdditionalDescription = $('#jsrcAdditionalDescription').val();
    $('#purchaseHistoryDlg').dialog({
        title : _title_address + " 消费记录",
        top : getTop(335),
        left : getLeft(500),
        width : 500,
        height : 335,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#purchaseHistoryDlg [clear="clear"]').val('');
            $('#purchaseHistoryDlg [clean="clean"]').html('');
            $('#purchaseHistoryDlg [require]').css('border', '1px solid #a9a9a9');
        }
    });
    var sevicelist = JSON.parse(jsrcAdditionalDescription.getRealJsonStr());
    $('#purchaseHistoryTable').datagrid('loadData',sevicelist);
    $('#purchaseHistoryDlg').dialog('open');


}
//添加维保对话框
function openRepair(){
    $('#addRepairDlg').dialog({
        title : "添加维修",
        top : getTop(245),
        left : getLeft(380),
        width : 380,
        height : 245,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#addRepairDlg [clear="clear"]').val('');
            $('#addRepairDlg [clean="clean"]').html('');
            $('#addRepairDlg [require]').css('border', '1px solid #a9a9a9');
        }
    });
    //判断房间的勾选情况  check=0没勾选  check=1打开窗口 check=2有任务未完成
    var text = "";
    var check = 0;
    $(".oneCheckBox").each(function () {
        if ($(this).is(":checked")) {
            var house = getHouseData($(this).attr("jsrcHsId"));
            if(house.hsDirtyHouse == 0){
                check = 1;
            }
            if(house.hsDirtyHouse == 1){
                check = 2;
                text="所选房间有保洁任务未完成";
            }
            if(house.hsDirtyHouse == 2){
                check = 2;
                text="所选房间有维修任务未完成";
            }
            if(house.hsDirtyHouse == 3){
                check = 2;
                text="所选房间有装修任务未完成";
            }
        }
    });
    if(check == 2 && text != "" || check == 1 && text != ""){
        myTips(text,"error");
        return;
    }
    if(check == 0 && text == ""){
        myTips("请勾选房间","error");
        return;
    }
    if(check == 1 && text == ""){
        $('#addRepairDlg').dialog('open');
    }
}
//批量添加(type=1保洁  type=2维修)
function batchAddition(type){
    var addRepair=[];
    var hsIdList = [];
    var cleanPeopleId = $('#searchCleanManagerGetUserId').val();
    var repairTypeRp = $('.repair_type_rp').find('option:selected').text();
    var repResponsibility = $('.repair_responsibility').find('option:selected').text();
    var repRepairPeopleId = $("#doRepairGetUserId").val();

    var houseId = [];
    var checkHouse = [];
    var jhfFollowList = [];
    $(".oneCheckBox").each(function () {
        if ($(this).is(":checked")) {
            var obj={};
            var objDrityRoom = {};
            var houseObj= {};
            //获取房屋地址
            var house = getHouseData($(this).attr("jsrcHsId"));
            var address = house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno;
            houseId.push($(this).attr("jsrcHsId"))
            houseObj.jsrcHsId = $(this).attr("jsrcHsId");
            houseObj.jsrcHsType = house.hsRoomType;
            checkHouse.push(houseObj);
            //生成维保所需的数据
            if(type == 1){//设置保洁
                var repEventRp = address +"需要清洁，请尽快处理";
                obj.repResponsibility = "负责人";
                obj.repTypeRp = "保洁服务";
                obj.repRepairPeopleId = cleanPeopleId;
                objDrityRoom.hsDirtyHouse = 1;//保洁状态
            }
            if(type == 2){//添加维修
                var repEventRp = address +"需要"+repairTypeRp+"，请尽快处理";
                obj.repResponsibility = repResponsibility;
                obj.repTypeRp = repairTypeRp;
                obj.repRepairPeopleId = repRepairPeopleId;
                if(repairTypeRp == "装修维保"){
                    objDrityRoom.hsDirtyHouse = 3;//装修状态
                }else{
                    objDrityRoom.hsDirtyHouse = 2;//维修状态
                }
            }
            obj.repHouse4storeId = $(this).attr("jsrcHsId");
            obj.repEventRp = repEventRp;
            obj.repHopeTime = "尽快";
            obj.repUserId = _loginUserId;
            obj.repReportingTime = new Date().format("yyyy-MM-dd hh:mm:ss");
            obj.repDepartment = _loginDepartment;
            obj.repStorefront = _loginStore;
            obj.repTaskTime = new Date().format("yyyy-MM-dd");
            objDrityRoom.hsId = $(this).attr("jsrcHsId");

            //跟进
            var jhfFollowRemark = "";
            if(type == 1){
                jhfFollowRemark = "给"+ address +"添加保洁任务"
            }
            if(type == 2){
                jhfFollowRemark = "给"+address +"添加"+repairTypeRp
            }
            var followObj = {
                jhfUserId 		: _loginUserId,
                jhfDepartment	: _loginDepartment,
                jhfStorefront	: _loginStore,
                jhfHouse4storeId: $(this).attr("jsrcHsId"),
                jhfFollowTime	: new Date().format("yyyy-MM-dd hh:mm:ss"),
                jhfFollowRemark	: jhfFollowRemark,
                jhfPaymentWay	: "系统跟进",
                jhfFollowResult	: "新增成功",
                jhfFollowBelong	: "其他",
                jhfRemind		: "否"
            }

            jhfFollowList.push(followObj);//跟进的数据
            addRepair.push(obj);//生成维保的数据(维保任务表)
            hsIdList.push(objDrityRoom);//修改房间状态的数据(未租表)
        }
    });
    //判断预计完成时间内 是否有订单
    var cleanRepHopeTime =  $('#cleanRepHopeTime').val()
    var repairRepHopeTime = $('#repairRepHopeTime').val()
    var repHopeTime = "";
    if(cleanRepHopeTime == ""){//维修装修的时间
        repHopeTime = new Date(repairRepHopeTime).format('yyyy-MM-dd ' + setUp.jsrsuCheckOutTime +':00');
    }
    if(repairRepHopeTime == ""){//保洁的时间
        repHopeTime = new Date(cleanRepHopeTime).format('yyyy-MM-dd ' + setUp.jsrsuCheckOutTime +':00');
    }
    repHopeTime = new Date(repHopeTime).getTime();

    var todayTime = new Date().format('yyyy-MM-dd ' + setUp.jsrsuCheckInTime +':00');
    todayTime = new Date(todayTime).getTime();

    var sameHouseType = [];
    var changeHouse = false;//false为没有订单 ture为有订单需要换房
    var noChangeHouse = false;//需要换房但是无房可换 false为无需换房 true喂需要换房
    /**		判断选中的房子能否换房，满足条件：1、订单开始时间在预计完成任务时间内 2、该订单为已住/保留/预定状态
     * 		3、只能换到相同房型的房子 4、不能换回所勾选的房间 5、所换房间无其他相同时间的订单且为干净房
     */
    for(var i in checkHouse){//遍历选中的房子id
        for(var j in event_list){//遍历短租订单
            if(checkHouse[i].jsrcHsId == event_list[j].jsrcHsId){//获取选中房子下的所有订单(往下执行换房操作)
                var jsrcBeginTime = new Date(event_list[j].jsrcBeginTime).getTime();
                if(jsrcBeginTime < repHopeTime && todayTime <= jsrcBeginTime){//该订单是否在完成时间前
                    if(event_list[j].jsrcState == "已住" || event_list[j].jsrcState == "保留" || event_list[j].jsrcState == "预定"){
                        changeHouse = true;
                        noChangeHouse = true;
                        for(var k in house_list_arr){//遍历短租房
                            if(checkHouse[i].jsrcHsType == house_list_arr[k].hsRoomType){//筛选房型相同的房子
                                //houseId数组存的id为字符串，例如["1","2"];所以将house_list_arr[k].hsId转换为字符串，所以在后面加上+""
                                if(houseId.indexOf(house_list_arr[k].hsId+"") == -1){//限制房子不能换回选中这间
                                    var checkTime1 = checkTime(house_list_arr[k].hsId,event_list[j].jsrcBeginTime,event_list[j].jsrcEndTime,0);
                                    if(checkTime1 && house_list_arr[k].hsDirtyHouse == 0){//判断将要换的房子在该段时间内有无订单,且为干净房
                                        noChangeHouse = false;
                                        event_list[j].jsrcHsId = house_list_arr[k].hsId
                                        var obj = {};
                                        obj.jsrcHsId = house_list_arr[k].hsId;
                                        obj.jsrcId = event_list[j].jsrcId;
                                        sameHouseType.push(obj);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if(type == 1){//判断设置保洁
        if(cleanPeopleId == ""){//
            myTips("请选择清洁人员","error");
            return;
        }
    }
    if(changeHouse){
        $.messager.confirm("操作提示", "是否将该订单重新分配至同房型？",  function(data) {
            if (data) {
                if(sameHouseType.length == 0){
                    myTips("没有可换的相同房型","error");
                    return;
                }
                $('#cleanDlg').dialog('close');
                $('#addRepairDlg').dialog('close');
                exchangeHouses(sameHouseType,hsIdList,addRepair,jhfFollowList);
                if(noChangeHouse){
                    $.messager.confirm("操作提示", "有订单无法更换，如需换房请手动切换房型",  function(data) { });
                }
            }
        });
    }else{
        reviseHouseType(hsIdList,addRepair,jhfFollowList);
    }
}

//换房(批量)
function exchangeHouses(houseType,hsIdList,addRepair,jhfFollowList){
    $.post("../updateRoom.action", {
        jsonArray : JSON.stringify(houseType),
    },function(data) {
        hideLoading();
        if(data.code<0){
            myTips(data.msg,"error");
            return;
        }
        reviseHouseType(hsIdList,addRepair,jhfFollowList)
    });
}

//修改未租房中短租的状态
function reviseHouseType(hsIdList,addRepair,jhfFollowList){
    showLoading();
    $.post("../updateDirtyHouse.action", {
        jsonArray 	: JSON.stringify(hsIdList),
        followArray	: JSON.stringify(jhfFollowList)
    },function(data) {
        hideLoading();
        if(data.code < 0){
            myTips("修改未租房中短租的状态失败","error");
            return;
        }
        createRepairs(addRepair);//生成维保
    });
}
//生成维保
function createRepairs(addRepair){
    showLoading();
    $.post("../insertListRepair.action", {
        addRepairs 	: JSON.stringify(addRepair),
    }, function(data) {
        hideLoading();
        if (data.code<0) {
            myTips("设置失败！", "error");
            return;
        }
        myTips("设置成功", "success");
        $('#cleanDlg').dialog('close');
        $('#addRepairDlg').dialog('close');
        refash();
    });

}

function cleanAll(){
    var hsList = [];
    var jhfFollowList = [];
    $(".oneCheckBox").each(function () {
        if ($(this).is(":checked")) {
            var house = getHouseData($(this).attr("jsrcHsId"));
            var address = house.hsAddCommunity + house.hsAddBuilding + house.hsAddDoorplateno;

            var hsObj = {
                hsId		: $(this).attr("jsrcHsId"),
                hsDirtyHouse: 0
            };

            var followObj = {
                jhfUserId 		: _loginUserId,
                jhfDepartment	: _loginDepartment,
                jhfStorefront	: _loginStore,
                jhfHouse4storeId: $(this).attr("jsrcHsId"),
                jhfFollowTime	: new Date().format("yyyy-MM-dd hh:mm:ss"),
                jhfFollowRemark	: address +"完成维保任务",
                jhfPaymentWay	: "系统跟进",
                jhfFollowResult	: "新增成功",
                jhfFollowBelong	: "其他",
                jhfRemind		: "否"
            }

            jhfFollowList.push(followObj);//跟进的数据
            hsList.push(hsObj)
        }
    });
    if(hsList.length == 0){
        myTips("请选择需要操作的房间","error");
        return;
    }
    $.messager.confirm("操作提示", "是否执行批量完成维保",  function(data) {
        if(data){
            showLoading();
            $.post("../updateDirtyHouse.action", {
                jsonArray 	: JSON.stringify(hsList),
                followArray	: JSON.stringify(jhfFollowList)
            },function(data) {
                hideLoading();
                if(data.code < 0){
                    myTips("批量完成维保失败","error");
                    return;
                }
                myTips("设置成功", "success");
                refash();
            });
        }
    });
}

//门卡管理对话框
function openDoorCard(){
    $('#doorCardDlg').dialog({
        title : "门卡管理",
        top : getTop(420),
        left : getLeft(800),
        width : 800,
        height : 420,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#doorCardDlg [clear="clear"]').val('');
            $('#doorCardDlg [clean="clean"]').html('');
            $('#doorCardDlg [require]').css('border', '1px solid #a9a9a9');
        }
    });
    $('#doorCardDlg').dialog('open');
    getDoorCard(1);
}

function changMoney(){
    var orderMoney = parseFloat($("#orderMoney").text());
    var moneyInput = $('#moneyInput').val();

    var changeMoney = moneyInput - orderMoney;

    if(moneyInput > orderMoney+100){
        $.messager.alert("操作提示", "当前为“现金收银”模式，请检查收款金额是否正确。如需进入 扫码收银 模式请按F9");
    }
    $('#changeMoney').html(changeMoney.toFixed(2));
}


function openDoorLockFollow(){
    var row = $('#doorCardTable').datagrid('getSelected');
    if(row.jdcOperatingRecording != ""){
    	var data = JSON.parse(row.jdcOperatingRecording.substring(1, row.jdcOperatingRecording.length -1));
    	$('#doorLockFollowTable').datagrid("loadData",data);
    }
    $('#doorLockFollow').dialog({
        title : "跟进信息",
        top : getTop(340),
        left : getLeft(620),
        width : 620,
        height :340,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
        }
    });
    $('#doorLockFollow').dialog('open');
}
/* ********************************************日历插件的代码开始***********************************************/

//设置控件的宽度
function set_cal_size(width,height){
    $("#cal_ims").width(width)
    $("#cal_right").width(width-310)
    $("#cal_ims").height(height-174)
//    $("#cal_right").height(height-500)
}

//对左侧房子列表进行绘图的方法
function draw_left_col(house_list) {
    var cal_left_html =  '<div  style="width:350px;background-color:white;position:absolute;z-index:2999;left:10px;"> '+
        '           <div style="height:35px;border-left: 1px #ddd solid;border-bottom:1px #ddd solid;border-right:1px #ddd solid;float:left;width:30px;background-color:white;">'+
        '           <div style="margin: 8px 0 0 0"><input type="checkbox" class="allCheckBox" style="margin-top:6px;" /></div></div>'+
        '	        <div  class="cal_left_col" style="height:35px;width:135px"><div style="margin: 8px 0 0 0">门店</div></div>'+
        '			<div  class="cal_left_col" style="height:35px;"><div style="margin: 8px 0 0 0">房型</div></div>'+
        '	        <div  class="cal_left_col" style="height:35px;"><div style="margin: 8px 0 0 0">房号</div></div>'+
        '            <br style="clear:both">'+'</div><div style="width=100%;height:35px"></div><div id="houseDiv" style="z-index:1999;position:relative;height:100%;width:350px" >';
    for (var i in house_list) {
        var img = " ";
        if(house_list[i].hsDirtyHouse == 1){
            img = '<img src="images/broom.png" style="height:16px;width:16px;" />'
        }else if(house_list[i].hsDirtyHouse == 2){
            img = '<img src="images/repair.png" style="height:16px;width:16px;" />'
        }else if(house_list[i].hsDirtyHouse == 3){
            img = '<img src="images/zhuangxiu.png" style="height:16px;width:16px;" />'
        }
        cal_left_html += '<div class="cal_left_col" style="width:30px;"><input type="checkbox" class="oneCheckBox" jsrcHsId="' + house_list[i].hsId + '" style="margin-top:6px" /></div>';
        cal_left_html += '<div class="cal_left_col" style="width:135px;">' + house_list[i].hsAddCommunity + '</div>';
        cal_left_html += '<div class="cal_left_col">' + house_list[i].hsRoomType + '</div>';
        cal_left_html += '<div class="cal_left_col" id="'+house_list[i].hsId+'" jsrcHsId="' + house_list[i].hsId + '">' + img +
            house_list[i].roomName + '</div>'
        cal_left_html += '<br style="clear:both">'
    }
    cal_left_html += '</div>'
    $("#cal_left").html(cal_left_html)
}

//对右侧格子列表进行绘图的方法(开始时间是今天算起的前10天，然后往后数30天为结束时间，一共30天30个格子)
function draw_right_col(houseList) {
    var today_timestamp = new Date().getTime()
    var today_day_v = new Date().getDate()
    today_day_v = today_day_v < 10 ? "0" + today_day_v : today_day_v
    var tenday_ago_timestamp = new Date().getTime() - 3600 * 24 * 10 * 1000;
    var temp_timestamp = tenday_ago_timestamp

    var cal_right_col_days = []
    for (var i = 0; i < 30; i++) {
        var date = new Date();
        date.setTime(temp_timestamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;

        var date_str = y + "-" + m + "-" + d;
        var w = date.getDay()
        var w_str = ""

        switch (date.getDay()) {
            case 1:
                w_str = '星期一';
                break;
            case 2:
                w_str = '星期二';
                break;
            case 3:
                w_str = '星期三';
                break;
            case 4:
                w_str = '星期四';
                break;
            case 5:
                w_str = '星期五';
                break;
            case 6:
                w_str = '星期六';
                break;
            case 0:
                w_str = '星期日';
                break;

        }

        var date_obj = {
            date_str: date_str,
            d_str: d,
            week_str: w_str,
            week_val: w,
            show_str: m + "-" + d
        }

        cal_right_col_days.push(date_obj)

        temp_timestamp += 3600 * 24 * 1000;
    }
    var cal_right_col_html = '<div style="position:absolute;top:170px;left:319px;z-index:1000" class="cal_right_row" style="font-weight: bold">'

    for (var i in cal_right_col_days) {
        cal_right_col_html += '<div class="cal_right_day" style="height:35px;"><div style="margin:3px 0 0 0;">'+cal_right_col_days[i].show_str+'</div><div style="font-weight: lighter">'+cal_right_col_days[i].week_str+'</div></div>'
    }
    cal_right_col_html += '</div>'
    cal_right_col_html += '<div style="height:35px;width:99%" class="cal_right_row" ></div>';

    /*$.post("../selectAllTemporaryOrder.action",{
        jtoTakingStatus:1
	},function (result) {*/



    for (var i in houseList) {
        cal_right_col_html += '<div class="cal_right_row row_for_select" jsrcHsId="' + houseList[i].hsId + '">'
        for (var j in cal_right_col_days) {
            cal_right_col_html += '<div class="cal_right_day day_for_select ' +
                (cal_right_col_days[j].week_val >= 5 ? " weekend_day" : "") +
                (cal_right_col_days[j].d_str == today_day_v ? " today_day" : "") +
                '" date="' + cal_right_col_days[j].date_str +
                '" week_val="' + cal_right_col_days[j].week_val +
                '" jsrcHsId="' + houseList[i].hsId + '"id="'+houseList[i].hsId+
                ''+cal_right_col_days[j].date_str+'"></div>'
        }
        cal_right_col_html += '</div>'
    }
    $("#cal_right").html(cal_right_col_html);

}

function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}

//加载短租订单到日历中显示的方法
function load_events(events) {
	for (var i in events) {
		var arrears =events[i].jsrcArrears;

		if(events[i].total_days == 0){
			var width = 0.5 * 43
		}else{
			var width = (events[i].total_days) * 43
		}
		var event_type = ""
		if (events[i].status == "保留" || events[i].status == "预定") {
			var date = CurentTime();
			if(events[i].jsrcOrderState == 0){
				event_type = 'cal_right_event_new_booked'
			}else if(events[i].jsrcEndTime<date){
				event_type = 'cal_right_event_red'
			}else{
				event_type = 'cal_right_event_booked'
			}
		} else if (events[i].status == "已住") {
			if(events[i].jsrcArrears==0){
				event_type = ''
			}else{
				event_type = 'cal_right_event_arrears'
			}

		} else if (events[i].status == "退定中") {
			event_type = 'cal_right_event_olded'
		}

        var event_html = '<div class="cal_right_event ' + event_type + '" ' +
            'begin_time="' + events[i].begin_time +
            '" end_time="' + events[i].end_time +
            '" event_id="' + events[i].event_id +
            '" jsrcHsId="' + events[i].jsrcHsId +
            '" status="' + events[i].status +
            '" total_money="' + events[i].total_money +
            '" total_days="' + events[i].total_days +
            '" total_people="' + events[i].total_people +
            '" style="width:' + width + 'px">' + events[i].jsrcState + " " +
            events[i].total_people + '人' + events[i].total_days + '天' + events[i].total_money + '元</div>';

        $("[date=" + events[i].begin_time.substr(0, 10) + "][jsrcHsId=" + events[i].jsrcHsId + "]").html(event_html);
    }

    for(var to in  authOrder){
	    var toObj =authOrder[to];
        var data =toObj.jtoShortInfo;
        data =data.getRealJsonStr();
        var shortInfo =JSON.parse(data);
        var width = (shortInfo.totalDay)* 43;
        var event_type = "";
        event_type = 'cal_right_event_auth'
        var event_html = '<div class="cal_right_event ' + event_type + '" ' +'onclick="openTakeOrderDlg'+'('+toObj.jtoOrderId+','+toObj.jtoId+')'+
            '" style="width:' + width + 'px">' +'授权单</div>';
        $("[date=" + toObj.jtoTime.substr(0, 10) + "][jsrcHsId=" + toObj.jtoOrderId + "]").html(event_html);
    }

}

function diagramCheckOutDlg(id){
	var data = {}
	for(var i in event_list){
		if(event_list[i].jsrcId == id){
			console.log(event_list[i].jsrcId == id)
			data = event_list[i];
		}
	}
	console.log(data);
	var jsrcHsId = data.jsrcHsId;
	for(var i in house_list_arr){
		if(jsrcHsId == house_list_arr[i].hsId){
			data.hsRoomType = house_list_arr[i].hsRoomType
		}
	}
	var resObj = getHouseData(jsrcHsId);
	if(resObj != "" && resObj != undefined){
		_title_address = resObj.hsAddCommunity + " " + resObj.hsRoomType + " " + resObj.hsAddBuilding + resObj.hsAddDoorplateno;
	}
	openCheckOut(data);
}

//订单事件被点击的事件
$("#cal_ims").delegate(".cal_right_event", "click", function () {
    var event_id = $(this).attr("event_id");
    var data = {}
    if(event_id == undefined && event_id ==null){
        return;
    }
    for(var i in event_list){
        if(event_list[i].event_id == event_id){
            data = event_list[i];
        }
    }
    var jsrcHsId = data.jsrcHsId;
    for(var i in house_list_arr){
        if(jsrcHsId == house_list_arr[i].hsId){
            data.hsRoomType = house_list_arr[i].hsRoomType
        }
    }
    var resObj = {};
    resObj = getHouseData(jsrcHsId);
    console.log(resObj);
    _title_address = resObj.hsAddCommunity + " " + resObj.hsRoomType + " " + resObj.hsAddBuilding + resObj.hsAddDoorplateno;
    openCheckOut(data);
})

//房子被点击的事件
$("#cal_ims").delegate(".cal_left_col[jsrcHsId]", "click", function () {
    var hsId = $(this).attr("jsrcHsId");
    var data = {}
    data = getHouseData(hsId);
    _title_address = data.hsAddCommunity + " " + data.hsRoomType + " " + data.hsAddBuilding + data.hsAddDoorplateno;
    openHouseInfo(data)
    queryFollow(data, 1, 0);

})


//拖拽选好日子后，下单的事件
function date_selected_for_rent(begin_time, end_time, jsrcHsId) {
    //如果只选了一天，那么 begin_time 和 end_time 会相等
    var nowTime = new Date().format("yyyy-MM-dd hh:mm:ss");
    var beginTime = new Date(begin_time).getTime();

    var endTime = new Date(end_time).getTime();
    endTime = getNextDate(endTime,1);

    var lastOneDay = getNextDate(nowTime, -1);
    if(new Date(end_time).getTime() < new Date(lastOneDay).getTime()){
        myTips("不能在以前创建订单","error")
        return;
    }
    if(checkTime(jsrcHsId,beginTime,endTime,0)){
        var resObj = {};
        resObj = getHouseData(jsrcHsId);
        _title_address = resObj.hsAddCommunity + " " + resObj.hsRoomType + " " + resObj.hsAddBuilding + resObj.hsAddDoorplateno;
        openAddShortRent(resObj,begin_time,endTime);
    }else{
        myTips("所选时间段已有订单","error")
    }
}
//////////////////////////
//下面都是拖拽选日子的代码方法
//////////////////////////
$("#cal_ims").delegate(".cal_right_row .day_for_select", "mousedown", function (e) {
    if($(e.target).hasClass('cal_right_event')){
        return;
    }
    $(this).addClass("day_selected")
    $(this).parent().addClass("row_on_select")

    $(this).attr("start_select", 1)
})
//总checkbok点击事件
$("#cal_ims").delegate(".allCheckBox", "click", function () {
    if($(".allCheckBox").is(':checked')){
        $(".oneCheckBox").prop("checked",true);
    }else{
        $(".oneCheckBox").prop("checked",false);
    }
})

//ele.hover(function(){
//	layer.tips(evt.title, ele, {
//	  tips: [3, '#3595CC'],
//	  time: 2000
//	});
//},function(){});

$("#cal_ims").delegate(".cal_right_event", "mouseover", function (e) {
    layer.tips($(this).text(), this, {
        tips: [3, '#3595CC'],
        time: 2000
    });
})

$("#cal_ims").delegate(".cal_right_row .day_for_select", "mouseup", function (e) {
    if($(e.target).hasClass('cal_right_event')){
        return;
    }
    var day_selected_arr = $(".day_selected")
    var first_date = $(day_selected_arr[0]).attr("date")
    var last_date = $(day_selected_arr[day_selected_arr.length - 1]).attr("date")
    var jsrcHsId = $(this).attr("jsrcHsId")


    first_date = new Date(first_date).format('yyyy-MM-dd ' + setUp.jsrsuCheckInTime +':00')
    last_date = new Date(last_date).format('yyyy-MM-dd ' + setUp.jsrsuCheckOutTime +':00')
    date_selected_for_rent(first_date, last_date, jsrcHsId)

    $(".row_on_select").removeClass("row_on_select")
    $(".day_selected").removeClass("day_selected")
    $("[start_select=1]").removeAttr("start_select")
})

$("#cal_ims").delegate(".row_on_select .day_for_select", "mouseover", function () {
    $(this).addClass("day_selected")

    var $first_day_selected = $("[start_select=1]")
    var $last_day_selected = $(this)

    if ($last_day_selected.nextAll("[start_select=1]").length) {
        var ttmmpp;
        ttmmpp = $first_day_selected
        $first_day_selected = $last_day_selected
        $last_day_selected = ttmmpp
    }

    var anti_err = 0
    while ($first_day_selected.attr("date") != $last_day_selected.attr("date") && anti_err < 40) {
        $first_day_selected.next().addClass("day_selected")
        $first_day_selected = $first_day_selected.next()
        anti_err++
    }
})

$("#cal_ims").delegate(".row_on_select .day_for_select", "mouseout", function () {
    if ($(this).attr("start_select") == 1) {
        return
    }
    $(this).removeClass("day_selected")
})
//////////////////////////
//上面都是拖拽选日子的代码方法
//////////////////////////

$('#cal_ims').scroll(function (){
    var scrollLeft = $(this).scrollLeft();
    var left = (-scrollLeft+319)
    var left2 = (scrollLeft)
    $('.cal_right_row').css("left",left+"px")
    $('#houseDiv').css("left",left2+"px")

})

/* ********************************************日历插件的代码结束***********************************************/
//保留订单 入住办理 删除客户信息
function doDelete(){
    var row = $('#customerInfoTable').datagrid('getSelected');
    if (row) {
        var rowIndex = $('#customerInfoTable').datagrid('getRowIndex', row);
        $('#customerInfoTable').datagrid('deleteRow', rowIndex);
    }
}
//入住办理点击删除客户信息
function popRemove(value, row, index){
    return "<a href='#' onclick=\"myDeleteRows('"+row.popIdcard+"','popIdcard','customerInfoTable',0);\">删除</a>";
}
//接单
function openOrderTaking(){
    var jsrcId = $('#jsrcId').val();
    showLoading();
    $.post("../orderTakingShortRent.action",{
        jsrcId:jsrcId
    },function(data){
        hideLoading();
        if(data.code == 1){
            myTips("接单成功","success");
            $('#orderTaking').hide();
            dlg.window('close');
            getListContract();
        }else{
            myTips(data.msg,"error");
        }
    });
}

//折扣申请
function discountApplication() {

    var amountPayable =$("#amountPayable").val();
    $("#totalRoomPrice").val(amountPayable);

    $("#discountApplicationDlg").dialog({
        title:"折扣申请",
        top:getTop(400),
        left:getLeft(800),
        width:800,
        height:400,
        cache:false,
        model:true,
        onClose : function() {
            $("#discountApplicationDlg [clear=clear]").val('');
            $("#discount").css("border","1px solid #A9A9A9");
            $("#authPaword").css("border","1px solid #A9A9A9");
            $("#authType option:eq(0)").prop("selected","true");
            document.getElementById("authPsdBox").style.display="block";
            document.getElementById("remarkBox").style.display="none";
        }

    });

    $("#discountApplicationDlg").dialog("open");

}

//得到折扣价
function getDiscountPrice() {

    var amountPayable =$("#amountPayable").val();
    var num =$("#discount").val();

    if (Number(num) <1 ||  Number(num)>=10 ) {
        $("#discount").css("border","1px solid red");
        myTips("请输入1-10之间的折扣率","error");
        return;
    } else {
        $("#discount").css("border","1px solid #A9A9A9");
    }


    var discountPrice =Number(num)/10*Number(amountPayable);
    discountPrice =parseFloat(discountPrice).toFixed(2);
    console.log(discountPrice);
    $("#discountPrice").val(discountPrice);
}

//折扣确认操作
function authSubmit() {

    var num =$("#discount").val();
    var amountPayable =$("#amountPayable").val();
    if(amountPayable =='' || amountPayable == null){
        myTips("请先填写应付金额");
        return;
    }

    if (num =='') {
        $("#discount").css("border","1px solid red");
        myTips("请输入1-10之间的整数","error")
        return;
    }
    if (Number(num) <1 ||  Number(num)>=10 ) {
        $("#discount").css("border","1px solid red");
        myTips("请输入1-10之间的折扣率","error");
        return;
    }
    var authP =$("#application option:selected").val();
    console.log(authP);
    var type = $("#authType").val();

    var jsrcHsIdtwo = $("#jsrcHsIdtwo").val();

    console.log(jsrcHsIdtwo);

    if(type == "远程授权"){
        var userId =_allDiscountAuthInfo[2][authP];
        var remark = $("#remark").val();
        var totalDay =$("#totalDay").val();
        var roomType = $("#typeOccupancy option:selected").val();
        var totalHousingPrice =$("#totalHousingPrice").val();
        var dayPrice =$("#dayPrice").val();
        var discount = $("#discount").val();
        var discountPrice =$("#discountPrice").val();
        var jtoTime =getNowFormatDate();
        var disAveragePrice =Number(discountPrice)/Number(totalDay);
        disAveragePrice = parseFloat(disAveragePrice).toFixed(2);
        console.log(disAveragePrice);


        var channelType = $("#channelType").val();
        var groupType = $("#groupType option:selected").val();
        var pricePlan = $("#pricePlan").val();
        var allowCredit = $("#allowCredit").val();
        var maxCredit = $("#maxCredit").val();
        var memberLevel = $("#memberLevel").val();
        var popCustomerNameTable = $("#popCustomerNameTable").val();
        var popTelephoneTable = $("#popTelephoneTable").val();
        var popNameRemarkTable = $("#popNameRemarkTable").val();
        var popIdcardTable = $("#popIdcardTable").val();
        var pop_idcard_type = $("#pop_idcard_type option:selected").val();
        var popBirthTable = $("#popBirthTable").val();
        var popIdcardAddressTable = $("#popIdcardAddressTable").val();
        var popNationTable = $("#popNationTable").val();
        var checkInNum = $("#checkInNum").val();
        var totalDay = $("#totalDay").val();
        var dayPrice = $("#dayPrice").val();
        var houseDeposit = $("#houseDeposit").val();
        var orderSource = $("#orderSource option:selected").val();
        var totalHousingPrice = $("#totalHousingPrice").val();
        var amountPayable = $("#amountPayable").val();
        var accountPaid = $("#accountPaid").val();
        var typeOccupancy = $("#typeOccupancy option:selected").val();
        var orderRemarks = $("#orderRemarks").val();
        var actualOccupancyTime = $("#actualOccupancyTime").val();
        var endDate =$("#endDate").val();
        var hsAddCommunity =$("#hsAddCommunity").val();
        var shortInfo ={
            channelType:channelType,
            groupType:groupType,
            pricePlan:pricePlan,
            allowCredit:allowCredit,
            maxCredit:maxCredit,
            memberLevel: memberLevel,
            popCustomerNameTable:popCustomerNameTable,
            popTelephoneTable:popTelephoneTable,
            popNameRemarkTable:popNameRemarkTable,
            popIdcardTable: popIdcardTable,
            pop_idcard_type: pop_idcard_type,
            popBirthTable:popBirthTable,
            popIdcardAddressTable:popIdcardAddressTable,
            popNationTable:popNationTable,
            checkInNum:checkInNum,
            totalDay:totalDay,
            dayPrice:dayPrice,
            houseDeposit:houseDeposit,
            orderSource:orderSource,
            totalHousingPrice:totalHousingPrice,
            amountPayable:amountPayable,
            accountPaid: accountPaid,
            typeOccupancy:typeOccupancy,
            orderRemarks:orderRemarks,
            startDate:actualOccupancyTime,
            endDate:endDate,
            hsAddCommunity:hsAddCommunity
        };

        var authJson ={
            jtoOrderId:jsrcHsIdtwo,
            jtoApplicant:_loginUserName,
            jtoAddress:_title_address,
            jtoRoomType:roomType,
            jtoTotalHousingPrice:totalHousingPrice,
            jtoDayPrice:dayPrice,
            jtoDiscount:discount,
            jtoDiscountPrice:discountPrice,
            jtoAveragePrice:disAveragePrice,
            jtoRemark:remark,
            jtoStatus:"处理中",
            jtoAuthorizedPerson:authP,
            jtoTime:jtoTime,
            jtoShortInfo:JSON.stringify(shortInfo)
        };

        var jtoId;

        console.log(authJson);
        console.log(userId);
        $.ajax({
            url:"../insertTemporaryOrder.action",
            method:"post",
            data:authJson,
            success:function (result) {
                console.log(result);
                if(result.code == 1){

                    $.post("../selectBySelective.action",
                        {jtoOrderId:jsrcHsIdtwo,jtoTakingStatus:0},function (result) {

                            if(result.body != null){
                                var data = result.body[0];
                                jtoId = data.jtoId;
                                console.log(jtoId);

                                $.post("../sendTemplateMessage.action",{
                                    jtoId:jtoId,
                                    toUserId	:userId,
                                    toUserType	:"task",
                                    authJsonInfo:authJson,
                                    scene	  	: 3,
                                    firstValue	:"您好，您有新的授权请求需要处理！",
                                    keyValue1	:_loginUserName,
                                    keyValue2	:"折扣授权",
                                    remarkValue	:"请点击进行授权确认！"
                                }, function(data) {
                                    console.log(data);
                                    if (data.code < 0) {

                                        $.post("../deleteTemporaryOrderById.action", {
                                            jtoId:jtoId
                                        }, function(data) {
                                            if (data.code < 0) {
                                                console.log("删除失败");
                                            }else{
                                                console.log("删除成功");
                                            }

                                        });

                                        myTips("发送失败", "error");
                                        return;
                                    }
                                    if(data.code ==1){
                                        $.messager.alert("操作提示", "远程授权成功，授权状态请在顶部点击【取单】按键查看。");
                                        getAuthOrder();
                                        load_events(event_list);
                                        document.getElementById("discountApplication").style.display="none";
                                        document.getElementById("cancleOrder").style.display="block";
                                        $("#discountApplicationDlg").dialog("close");
                                    }

                                });


                            }else{
                                myTips("发送失败", "error");
                                return;
                            }

                        });
                }else{
                    myTips("发送失败", "error");
                    return;
                }
            }
        });

    }else{
        var authPsd =$("#authPaword").val();

        if(authPsd =='' || authPsd ==null ){
            myTips("请输入密码","error");
            return;
        }
        var authPsdStr =_allDiscountAuthInfo[1][authP].getRealJsonStr();
        authPsdStr = JSON.parse(authPsdStr);

        if(authPsdStr.authPassword !=authPsd && authPsdStr.cardPassword != authPsd){
            $("#authPaword").css("border","1px solid red");
            myTips("密码输入有误","error");
            return;
        }else{
            $("#authPaword").css("border","1px solid #A9A9A9");
        }

        console.log(111);
        var price =$("#discountPrice").val();
        price =parseFloat(price).toFixed(2);
        $("#totalPrice").val(price);
        $("#moneyText").html(price);
        $("#discountApplicationDlg").dialog("close");
    }

}

//授权方式下拉事件
function authApplication(){

    var type = $("#authType").val();
    if("远程授权" == type){
        document.getElementById("authPsdBox").style.display="none";
        document.getElementById("remarkBox").style.display="block";
    }else{
        document.getElementById("authPsdBox").style.display="block";
        document.getElementById("remarkBox").style.display="none";
    }
    console.log(type);
}

//查询所有挂单信息
function selectAllTemporaryOrder(){

    $.post("../selectAllTemporaryOrder.action",{
        jtoTakingStatus:0,
    },function (result) {

        if(result.body == null){

            $("#takingOrderTable").datagrid({
                data:[],
                view:myview,
                emptyMsg : "没有查询到数据"
            });
        }else{
            var data =result.body;

            console.log(data);
            for(var d in data){
                data[d].takeOrder="取单";
            }
            $("#takingOrderTable").datagrid("loadData",data);
        }

    },"json");

}


//取单
function takingOrder() {
    console.log(_allDiscountAuthInfo[2]);
    selectAllTemporaryOrder();
    $("#takingOrderDlg").dialog({
        title:"挂单详情",
        top:getTop(500),
        left:getLeft(960),
        width:960,
        height:500,
        cache:false,
        model:true,
    });

    $("#takingOrderDlg").dialog("open");


}



//取单格式
function formatReceiveOrder(value, row, index) {


    if (row.jtoStatus == '同意') {
        return "<a href='#' style='text-decoration:none;color:red;' onclick='toReceive("
            + row.jtoId + "," + index +","+row.jtoOrderId+")'>" + row.takeOrder + "<a>";
    }
    if(row.jtoStatus =='处理中'){
        var authP =row.jtoAuthorizedPerson
        return "<a href='#' style='text-decoration:none;color:lightslategray;' onclick='cancelTakingOrder("
            + row.jtoId + ")'>" +"取消挂单"+" | "+ "<a href='#' style='text-decoration:none;color:lightslategray;' onclick='redirectSend("
            + row.jtoId + ",\""+authP+"\")'>"+"重发请求"+"<a/>";
    }

}

// 执行取单操作
function toReceive(jtoId,index,hsId) {

    console.log(jtoId);
    var nowDate = formatDate(new Date());
    $.messager.confirm("操作提示", "确定要取单吗？", function(data) {

        if (data) {
            $.post("../updateTemporaryOrderById.action", {
                jtoId:jtoId,
                jtoTakingStatus:1
            }, function(data) {
                if (data.code < 0) {
                    myTips("领取失败", "error");
                }
                myTips("领取成功！", "success");
                console.log(11111);
                selectAllTemporaryOrder();
                openTakeOrderDlg(hsId,jtoId);
                getAuthOrder();
                initInfo();
                document.getElementById("discountApplication").style.display="none";
                document.getElementById("cancleOrder").style.display="none";
                $("#checkInDlg1 [clear=clear]").each(function () {
                    $(this).attr("disabled","disabled");
                });
                $("#becomeVip").attr("disabled","disabled");
                $(".clientCardReading").hide();
            });
        } else {

        }
    });
}

//取消挂单
function cancelTakingOrder(jtoId) {

    var jsrcHsIdtwo = $("#jsrcHsIdtwo").val();
    $.messager.confirm("操作提示", "确定要取消挂单吗？", function(data) {
        if (data) {
            $.post("../deleteTemporaryOrderById.action", {
                jtoOrderId: jsrcHsIdtwo,
                jtoTakingStatus:0,
                jtoId:jtoId
            }, function (data) {
                if (data.code < 0) {
                    myTips("取消失败", "error");
                } else {
                    myTips("取消成功！", "success");
                    var amountPayable = $("#amountPayable").val();
                    $("#totalPrice").val(amountPayable);
                    document.getElementById("discountApplication").style.display = "block";
                    document.getElementById("cancleOrder").style.display = "none";
                    selectAllTemporaryOrder();
                    getAuthOrder();
                    initInfo();
                }
            });
        }else {

        }
    });
}

//取单成功后打开短租入住窗口
function openTakeOrderDlg(hsId,jtoId){
    var startTime = new Date().format("yyyy-MM-dd"+" "+setUp.jsrsuCheckInTime);//今天时间
    var endTime=new Date().getTime()+ 24*60*60*1000;//明天时间
    endTime=new Date(endTime).format("yyyy-MM-dd "+" "+setUp.jsrsuCheckOutTime);	//格式明天时间为Date格式
    var resObj = {};
    resObj = getHouseData(hsId);
    _title_address = resObj.hsAddCommunity + " " + resObj.hsRoomType + " " + resObj.hsAddBuilding + resObj.hsAddDoorplateno;
    authorizeOrder(resObj,jtoId);
}


//重新发送授权请求
function redirectSend(jtoId,authPerson) {
    console.log(authPerson);
    var userId =_allDiscountAuthInfo[2][authPerson];
    console.log(userId);
    $.messager.confirm("操作提示", "确定要重发请求吗？", function(data) {
            if (data) {
                $.post("../sendTemplateMessage.action", {
                    jtoId: jtoId,
                    toUserId: userId,
                    toUserType: "task",
                    scene: 3,
                    firstValue: "您好，您有新的授权请求需要处理！",
                    keyValue1: _loginUserName,
                    keyValue2: "折扣授权",
                    remarkValue: "请点击进行授权确认！"
                }, function (data) {
                    console.log(data);
                    if (data.code < 0) {
                        myTips("远程授权失败", "error");
                    }

                    if (data.code == 1) {
                        setTimeout(myTips("远程授权成功，授权状态请在顶部点击【取单】按键查看。", "success"), 1000);
                        /* getAuthOrder();
                         load_events(event_list);
                         document.getElementById("discountApplication").style.display = "none";
                         document.getElementById("cancleOrder").style.display = "block";
                         $("#discountApplicationDlg").dialog("close");*/
                    }

                });
            }
        });
}

//授权管理
function authorizationManagement(){
	$("#authorizationDlg").dialog({
		title : '授权',
		top : getTop(220),
		left : getLeft(380),
		width : 380,
		height : 220,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#authorizationDlg input").val('');
			$("#authorizationDlg textarea").val('');
			$("#authorizationDlg select").val('');
			$("#authSelectRenter").html('');
			$("#photoUpload").css('display','none');
			$("#photoDlgs").css('display','none');
			//清空摄像头残留的照片
			$("#imgwrap ul li").remove();
			//隐藏警告语句
			$("#RepeatedWarnings").css('display','none');
		}
	});
	$("#authorizationDlg").dialog("open")
	$('#authPushingTime').val($('#endDate').val());
	
	var jsrcHsId = $('#jsrcHsIdtwo').val();
	getDeviceInfo(jsrcHsId);
	getRenter();
}

function getRenter(){
    var rentData = $("#customerInfoTable").datagrid("getRows"); //同住人列表信息
    var popName = $('#popCustomerNameTable').val();
    var popTelephone = $('#popTelephoneTable').val();
    var popIdcard = $('#popIdcardTable').val();
    var popNameRemark = $('#popNameRemarkTable').val();
    var popBirth = $('#popBirthTable').val();
    var popNation = $('#popNationTable').val();
    var popIdcardAddress = $('#popIdcardAddressTable').val();
    var popIdcardJson = $("#checkInDlg1").find(".clientPopIdcardJson").val();
    var jsrrVipLevel = $("#checkInDlg1").find(".memberLevel").val();
    var jsrrChannelId = $("#checkInDlg1").find(".jcuId").val();
    var renterName = "";
    if(popName != "" && popTelephone != "" && popIdcard !=""){
        var obj = {
            popName : popName,
            popNameRemark : popNameRemark,
            popIdcard : popIdcard,
            popTelephone : popTelephone,
            popBirth : popBirth,
            popNation : popNation,
            popIdcardAddress : popIdcardAddress,
            popIdcardJson : popIdcardJson,
            popUser : _loginUserId,
            jsrrVipLevel : jsrrVipLevel,
            jsrrChannelId : jsrrChannelId
        }
        rentData.push(obj);
    }
    var htmls = '<option value=""></option>';
    for(var i in rentData){
    	var rentString = JSON.stringify(rentData[i]);
    	htmls += '<option value='+rentString+'>'+rentData[i].popName+'</option>'
    }
    $('#authSelectRenter').html(htmls);
}

function getDeviceInfo(hsId){
	$.ajax({
		type : "post",
		url : "../selectThisHouseDeviceID.action",
		data : {
			jhdHsId : hsId
		},
		dataType : "json",
		success : function(result) {
			if (result.code == 1) {
				var data = result.body;
				console.log(data);
				var doorLock = [];
				for ( var i in data) {
					var brandType = data[i].brandType;
					console.log(brandType);
					if (brandType == "门锁" || brandType == "智能卡锁" || brandType == "门禁锁") {
						doorLock.push(data[i]);
					} else if (data[i].devBrandId == 20 && data[i].devFirstType == 3
						&& (data[i].devSecondType ==22 || data[i].devSecondType ==23 || data[i].devSecondType ==24 )) {
						doorLock.push(data[i]);
					}
				}
				if (doorLock.length == 0) {
					$.messager.alert("", "该房间没有符合发卡的智能设备");
				} else {
					var html = "";
					for ( var i in doorLock) {
						console.log(doorLock[i]);
						if(doorLock[i].devSecondType =33){
							html += doorLock[i].devNickname+":"
								+ '<input name="lock" class="deviceName"  onclick="danji()" style="margin:5px 10px 5px 0" type="checkbox"  value=\''
								+ JSON.stringify(doorLock[i])
								+ '\'  />';
							if (i == 1) {
								html += '<div style="clear:both" ></div>';
							}
						}else{
							html += doorLock[i].devNickname+":"
								+ '<input name="lock" style="margin:5px 10px 5px 0" type="checkbox"  value=\''
								+ JSON.stringify(doorLock[i])
								+ '\'  /><div style="clear:both" ></div>';
							if (i == 1) {
								html += '<div style="clear:both" ></div>';
							}
						}
					}
					$('#authDeviceSelectDiv').html(html);
				}
			} else {
				myTips(result.msg, "error");
			}
		}
	});
}

//保存授权信息,入住时执行授权
function saveAuthorizationInfo() {
	var att = $("#att").val();
    var img='';
    if(typeof($("#imgwrap img:eq(0)").attr("src")) != "undefined" && ($("#imgwrap img:eq(0)").attr("src")) !='') {
		img = img+($("#imgwrap img:eq(0)").attr("src"));
	}
    if(typeof($("#imgwrap img:eq(1)").attr("src")) != "undefined" && ($("#imgwrap img:eq(1)").attr("src")) !='') {
		img = img+"-"+($("#imgwrap img:eq(1)").attr("src"));
	}
    if(typeof($("#imgwrap img:eq(2)").attr("src")) != "undefined" && ($("#imgwrap img:eq(2)").attr("src")) !='') {
		img = img+"-"+($("#imgwrap img:eq(2)").attr("src"));
	}
    console.log(img);
    
	var array = [];
	var devName = "";
	$('.deviceName').each(function (){
		if($(this).is(":checked")){
			var deviceInfo = JSON.parse($(this).val());
			array.push(deviceInfo);
			devName += deviceInfo.devNickname;
		}
	});

	var jsrcHsId = $('#jsrcHsIdtwo').val();
//	var row = $('#sourceInfoDg').datagrid('getSelected');
//	var jdcHsId = row.hrHouse4storeId;
	
	if ($("#authSelectRenter option:selected").val() == "") {
		myTips("请选择需要授权的租客", "error");
		return;
	}
	var renterInfo = JSON.parse($("#authSelectRenter option:selected").val());
	
	var cardId = $('#authCardId').val();//授权
	var jdcDeadlineTime = $('#authPushingTime').val();//期限
	var doorCardNum = $('#authDoorCardNum').val();//卡号

	console.log(doorCardNum+"   "+cardId)
	//收费信息
	var doorCardFeeDeposit = $('#authDoorCardFeeDeposit').val();//
	var doorCardMaterialFee = $('#authDoorCardMaterialFee').val();
	var doorCardFeeDepositText = doorCardFeeDeposit > 0 ? "门卡押金"
		+ doorCardFeeDeposit + "," : '';
	var doorCardMaterialFeeText = doorCardMaterialFee > 0 ? "门卡工本费"
		+ doorCardMaterialFee : '';
	
	var popName = $("#authSelectRenter option:selected").text();
	var rentData = JSON.parse($("#authSelectRenter option:selected").val());
	var operatingRecording = {
		text : "门卡授权：为客户 " + popName + " 发放" + devName + "的门卡，卡号"
			+ doorCardNum + "，有效期至" + jdcDeadlineTime + "，收取费用"
			+ doorCardFeeDepositText + doorCardMaterialFeeText + "。",
		time : new Date().format("yyyy-MM-dd hh:mm:ss"),
		type : "系统跟进",
		registrantName : _loginUserName
	}

	var jdcOperatingRecording = "[" + JSON.stringify(operatingRecording) + "]";
	
	var inseratData = {
        // personType : "租客",
		img : img,
		att :att,
		coid : _loginCoId,
		popName : popName,
		popIdCard : renterInfo.popIdcard,
		jdcHsId : jsrcHsId,
		departmentId : _loginDepartment,
		storefrontId : _loginStore,
		registerPeopleId : _loginUserId,
		jdcState:'使用中',
		jdcDeadlineTime : jdcDeadlineTime,
		jdcOperatingRecording : jdcOperatingRecording,
		jdcCardId:cardId,
		jdcCardNum:doorCardNum,
        personType : "短租",
//		doorCardFeeDeposit : doorCardFeeDeposit > 0 ? doorCardFeeDeposit : 0,
//		doorCardMaterialFee : doorCardMaterialFee > 0 ? doorCardMaterialFee : 0,
	}
	
	console.log(inseratData)
	var doorCardJson = "";
	for (var i in array) {
		inseratData.jdcDeviceId = array[i].id;
		if (array[i].devAuthNum != null && array[i].devAuthNum != '') {
			inseratData.jdcAuthNum = array[i].devAuthNum
		}
		if (i == 0) {
			doorCardJson += JSON.stringify(inseratData);
		} else {
			doorCardJson += "," + JSON.stringify(inseratData);
		}
	}

	doorCardJson = "[" + doorCardJson + "]";
	$("#doorCardJson").val(doorCardJson);
	$("#authorizationDlg").dialog("close");
	/*$.ajax({
		type:"post",
		url:"../inseartDoorCard.action",
		data:{
			doorCardJson:doorCardJson
		},
		dataType:"json",
		success: function(result){
			if(result.code == 1){
				myTips("成功","success");
			}else{
				myTips(result.msg,"error");
			}
		}
	});*/
}

function danji() {
	console.log($(".deviceName[type='checkbox']").is(':checked'));
	if($(".deviceName[type='checkbox']").is(':checked')){
		console.log("========="+$("#authPhotoUpload").text());
		$("#authPhotoUpload").css('display','block');
		$("#authPhotoDlgs").css('display','block');
		console.log("_loginCoId"+_loginCoId);
	}else{
		$("#authPhotoUpload").css('display','none');
		$("#authPhotoDlgs").css('display','none');
	}
}


var MediaStreamTrack;
//拍照上传
function new_page( ) {
	$("#photoDlg").dialog({
		title : '拍照',
		top : getTop(600),
		left : getLeft(700),
		width : 700,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			//循环关闭音频视频
			MediaStreamTrack.forEach(function (Track) {
				Track.stop();
		    });

		}
	});
	/**
	 * 调用摄像头
	 */
	//设置摄相机宽高
	var opt = {
		audio: true,
		video: {
			//摄像宽高
			width: 150,
			height: 200
		}
	};
	//调用摄像机

	var Devicestate = navigator.mediaDevices.getUserMedia(opt);
	Devicestate.then(function(mediaStream) {
		MediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks();
		video = document.querySelector('video');
		video.srcObject = mediaStream;
		video.onloadedmetadata = function(e) {
			video.play();
		};
	});
  //用户拒绝使用,或者没有摄像头
	Devicestate.catch(function(err) {
		$("#RepeatedWarnings").text("用户拒绝使用摄像头,或者没有摄像头!");
		$("#RepeatedWarnings").show();
		var err = err.name;
		console.log(err);
  });
	$("#photoDlg").dialog("open");
}
