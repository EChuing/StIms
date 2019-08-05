var in_Html='';
var in_Html2='';
var _title_address=''
var event_list=[];
var hsidList = [];
var floor=[];
var ALL=[];
var clean=[];
var Clean='';
var Dirty='';
var dirty=[];
var Repair='';
var repair=[];
var retain=[];
var Retain='';
var Book=[];
var Arrears='';
var arrears=[];
var Arrive ='';
var arrive =[];
var Leave='';
var leave=[];
var ArrivedNow=[];
var arrivedNow='';
$(function () {
    $('body').css('overflow','hidden');
    queryDiagram();
    setInterval('queryDiagram()',180000);
    setInterval('refreshDiagram()',1000);
})
function refreshDiagram(){
    if(sessionStorage.refreshDiagram == 0){
        sessionStorage.refreshDiagram = 1;
        queryDiagram();
    }
}

//查询拼接房态图
function queryDiagram(){
    var in_Html='';
    var in_Html2='';
    var in_Html3='';
    var jsrcBeginTime = GetDateStr(-10);
    var jsrcEndTime = GetDateStr(20);
    $.ajax({//获取订单信息中的房间
        url:"../selectJourShortRentContract.action",
        type:"post",
        data:{
            hsLeaseState	: "短租房",
            contractState	: "未结束订单",
            jsrcBeginTime	: jsrcBeginTime,
            jsrcEndTime	: jsrcEndTime,
        },
        success:function(result){
            if(result.code > 0){
                result=result.body
                for(var i=0;i<result.length-1;i++){
                    var jsrcBeginTime=new Date(result[i].jsrcBeginTime).format("MM月dd日");
                    var jsrcEndTime=new Date(result[i].jsrcEndTime).format("MM月dd日");
                    var taDay=new Date().format("yyyy-MM-dd hh:mm:ss");
                    var hsAddDoorplateno=result[i].hsAddDoorplateno;
                    var jsrcPeople=JSON.parse(result[i].jsrcPeople);
                    var hsAddCommunity=result[i].hsAddCommunity;
                    var popJson=JSON.parse(result[i].popJson);
                    var TaDay=new Date().format("MM月dd日");
                    var hsRoomType=result[i].hsRoomType;
                    var hsAddFloor=result[i].hsAddFloor;
                    var renterName=result[i].renterName;
                    var jsrcState=result[i].jsrcState;
                    var jsrcHsId=result[i].jsrcHsId;
                    var jsrcId=result[i].jsrcId;
                    var jsrcArrears=result[i].jsrcArrears

                    if (popJson!=null) {//获取入住人数
                        var popjson=popJson.length
                    }
                    for( var a in jsrcPeople){//获取登记人名字
                        var popName=jsrcPeople[a].popName
                    }
                    if(jsrcState=="已住"){//判定住房状态
                        var _title_address= result[i].hsAddCommunity +" " + result[i].hsRoomType +" " + hsAddDoorplateno
                        hsidList.push(jsrcHsId);
                        event_list.push(result[i])
                        if(jsrcArrears>0){ //判定是否到期欠费
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1"style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)" onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:red;"><span  class="state" id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')"onMouseOver="mouseOver('+jsrcId+',4)">'+"欠"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+renterName+'</span></div><div class="box_5"><span class="time">'+'预离:'+jsrcEndTime+'</span> </div><div class="box_6" ><span class="population">'+'共'+popjson+'人'+'</span> </div></div></div>';
                            Arrears+='<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1"style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:red;"><span  class="state" id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')"onMouseOver="mouseOver('+jsrcId+',4)">'+"欠"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+renterName+'</span></div><div class="box_5"><span class="time">'+'预离:'+jsrcEndTime+'</span> </div><div class="box_6" ><span class="population">'+'共'+popjson+'人'+'</span> </div></div></div>';
                            arrears.push(Arrears)
                        }else if(jsrcEndTime==TaDay){
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1"style=" background: #FF9900;"><div class="MPH"><span class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#0099FF;"><span  class="state" id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')"onMouseOver="mouseOver('+jsrcId+',4)">'+"住"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+renterName+'</span></div><div class="box_5"><span class="time">'+'今日预离'+'</span> </div><div class="box_6" ><span class="population">'+'共'+popjson+'人'+'</span> </div></div></div>';
                            Leave+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1"style=" background: #FF9900;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#0099FF;"><span  class="state" id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')"onMouseOver="mouseOver('+jsrcId+',4)">'+"住"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+renterName+'</span></div><div class="box_5"><span class="time">'+'今日预离'+'</span> </div><div class="box_6" ><span class="population">'+'共'+popjson+'人'+'</span> </div></div></div>';
                            leave.push(Leave)
                        }else{
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1"style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#0099FF;"><span  class="state" id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')"onMouseOver="mouseOver('+jsrcId+',4)">'+"住"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+renterName+'</span></div><div class="box_5"><span class="time">'+'预离:'+jsrcEndTime+'</span> </div><div class="box_6" ><span class="population">'+'共'+popjson+'人'+'</span> </div></div></div>';
                        }
                        ALL.push(in_Html)
                    }else if(jsrcState=="保留"){
                        var _title_address= result[i].hsAddCommunity +" " + result[i].hsRoomType +" " + hsAddDoorplateno
                        hsidList.push(jsrcHsId);
                        event_list.push(result[i])

                        if(jsrcBeginTime<TaDay){
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span   id="'+jsrcId+jsrcId+'"class="state"  onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time"style="color:red">'+'过期未到'+'</span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                            Retain+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span   id="'+jsrcId+jsrcId+'"class="state"  onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time"style="color:red">'+'过期未到'+'</span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                            retain.push(in_Html)
                        }else if(jsrcBeginTime==TaDay){
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span   id="'+jsrcId+jsrcId+'"class="state" onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'即将到达'+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                            Arrive+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span   id="'+jsrcId+jsrcId+'"class="state" onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'即将到达'+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                            arrive.push(Arrive)
                            arrivedNow+='<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span   id="'+jsrcId+jsrcId+'"class="state" onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'即将到达'+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                            ArrivedNow.push(arrivedNow)
                            Retain+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span   id="'+jsrcId+jsrcId+'"class="state" onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'即将到达'+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                            retain.push(in_Html)
                        }else {
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span   id="'+jsrcId+jsrcId+'"class="state" onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'预达:'+jsrcBeginTime+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                            Retain+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span  id="'+jsrcId+jsrcId+'"class="state" onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'预达:'+jsrcBeginTime+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                            retain.push(in_Html)
                        }
                        ALL.push(in_Html)

                    }else if(jsrcState=="预定"){
                        var _title_address= result[i].hsAddCommunity +" " + result[i].hsRoomType +" " + hsAddDoorplateno
                        hsidList.push(jsrcHsId);
                        event_list.push(result[i])
                        if(jsrcBeginTime<TaDay){
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span  class="state"onMouseOver="mouseOver('+jsrcId+',2)" >'+"预"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time"style="color:red">'+'过期未到'+'</span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                        }else if(jsrcBeginTime==TaDay){
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span  class="state" onMouseOver="mouseOver('+jsrcId+',2)">'+"预"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'即将到达'+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                        }else{
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;"id="'+jsrcId+'"  onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span  class="state"onMouseOver="mouseOver('+jsrcId+',2)" >'+"预"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'预达:'+jsrcBeginTime+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                        }
                        ALL.push(in_Html)
                        Book.push(in_Html)
                    }
                }
            }
            $.ajax({//获取空房间以及脏修房间
                type:"post",
                url:"../selectShortRentHouse.action",
                data:{
                    hsLeaseState	: "短租房",
                    contractState	:"未结束订单",
                    jsrcBeginTime	:jsrcBeginTime,
                    jsrcEndTime	:jsrcEndTime,
                },
                dataType:"json",
                success:function(data){
                    var body = data.body;
                    for(var j=0; j<body.length;j++){
                        var hsAddDoorplateno=body[j].hsAddDoorplateno;
                        var hsHotDailyRent=body[j].hsHotDailyRent;
                        var hsDirtyHouse=body[j].hsDirtyHouse;
                        var hsAddFloor=body[j].hsAddFloor;
                        var hsRoomType=body[j].hsRoomType;
                        var floordoor=body[j].hsAddFloor;
                        var hsId=body[j].hsId;

                        if (floor.indexOf(floordoor) == -1&&floordoor!=""&&floordoor!=null) {
                            floor.push(floordoor);
                        }
                        floor.sort(function(a,b){//将楼层进行排序
                            return a-b;
                        });
                        if(hsDirtyHouse==0){//判定空房的状态0干净空房，1脏房，2维修房最后一个是装修房
                            if(hsidList.indexOf(hsId) == -1){
                                in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:green;"><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#00FF33;" id="'+hsId+'" onclick="selectionTime(id)"><span id="'+hsId+hsId+'" class="state"onMouseOver="mouseOver('+hsId+hsId+',2)">'+"空"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family: 黑体;">'+hsHotDailyRent+'元/晚'+'</span></div><div class="box_5"><span class="time">'+"无预定"+'</span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                                ALL.push(in_Html)
                                Clean+='<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:green;"><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#00FF33;" id="'+hsId+'" onclick="selectionTime(id)"><span id="'+hsId+hsId+'" class="state"onMouseOver="mouseOver('+hsId+hsId+',2)">'+"空"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family: 黑体;">'+hsHotDailyRent+'元/晚'+'</span></div><div class="box_5"><span class="time">'+"无预定"+'</span> </div><div class="box_6"><span class="population"></span></div></div></div>';
                                clean.push(Clean)
                            }
                        }else if(hsDirtyHouse==1){
                            in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:#C0C0C0;"><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div id="'+hsId+hsId+'" class="circle"style="background:#909090;"><span  class="state" onMouseOver="mouseOver('+hsId+hsId+',3)">'+"脏"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family: 黑体;">'+"脏"+'</span></div><div class="box_5"><span class="time"></span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                            ALL.push(in_Html)
                            Dirty+='<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:#C0C0C0;"><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div id="'+hsId+hsId+'"class="circle"style="background:#909090;"><span  class="state" onMouseOver="mouseOver('+hsId+hsId+',3)">'+"脏"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family: 黑体;">'+"脏"+'</span></div><div class="box_5"><span class="time"></span> </div><div class="box_6"><span class="population"></span></div></div></div>';
                            dirty.push(Dirty)
                        }else if(hsDirtyHouse==2){
                            if(hsidList.indexOf(hsId) == -1){
                                in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:#888888;"><div class="MPH"><span  class="address" id="'+hsId+'"onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div id="'+hsId+hsId+'"class="circle"style="background:#909090;"><span  class="state"onMouseOver="mouseOver('+hsId+hsId+',3)">'+"维"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family: 黑体">'+"维修中"+'</span></div><div class="box_5"><span class="time"></span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                                ALL.push(in_Html)
                                Repair+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:#888888;"><div class="MPH"><span  class="address" id="'+hsId+'"onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div id="'+hsId+hsId+'"class="circle"style="background:#909090;"><span  class="state"onMouseOver="mouseOver('+hsId+hsId+',3)">'+"维"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family:黑体;">'+"维修中"+'</span></div><div class="box_5"><span class="time"></span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                                repair.push(Repair)
                            }
                        }else{
                            if(hsidList.indexOf(hsId) == -1){
                                in_Html+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:#888888;"><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div id="'+hsId+hsId+'"class="circle"style="background:#909090;"><span  class="state"onMouseOver="mouseOver('+hsId+hsId+',3)">'+"修"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype"></span></div><div class="box_4"><span class="Name"style="font-family: 黑体;">'+"装修中"+'</span></div><div class="box_5"><span class="time"></span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                                ALL.push(in_Html)
                            }
                        }
                    }
                    //将楼层弄到顶部显示
                    in_Html2+='<div class="head" id="ALL" onclick="selectDoorId(id)" onmouseover="mouseOver(id,2)" onmouseout="mouseOut(id,2)" ><span class="floor" >全部</span></div>'
                    $(".Head").html(in_Html2)
                    console.log(floor)
                    for (var k in floor){
                        in_Html2+='<div class="head" id="'+floor[k]+'" onclick="selectDoorId(id)"  onmouseover="mouseOver(id,2)" onmouseout="mouseOut(id,2)" ><button type="button" class="floor">F'+floor[k]+'</div>'
                        $(".Head").html(in_Html2)
                    }
                    $(".BOX_1").html(in_Html)
                }
            })
            $(".BOX_1").html(in_Html)

        }
    })
}
//楼层筛选
function selectDoorId(id){//id为楼层号
    $(' #'+id+' .floor').css("background","#5bc0de")
    var jsrcBeginTime = GetDateStr(-10);
    var jsrcEndTime = GetDateStr(20);
    var in_Html3='';
    if(id=="ALL"){

        for(var i in ALL){
            $(".BOX_1").html(ALL[i])
        }return;
    }
    $.post("../selectShortRentHouse.action", {//获取楼层号跟id相同的空房间
        hsLeaseState	: "短租房",
        hsAddFloor		: id,

    }, function(data) {
        var data=data.body
        for(var i in data){
            var hsAddDoorplateno=data[i].hsAddDoorplateno;
            var hsHotDailyRent=data[i].hsHotDailyRent;
            var hsDirtyHouse=data[i].hsDirtyHouse;
            var hsRoomType=data[i].hsRoomType;
            var hsAddFloor=data[i].hsAddFloor;
            var hsId=data[i].hsId;
            var _title_address= data.hsAddCommunity +" " + data.hsAddBuilding +" " + hsAddDoorplateno
            if(id==hsAddFloor && hsAddFloor!=null){
                if(hsDirtyHouse==0){
                    if(hsidList.indexOf(hsId) == -1){
                        in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:green;" ><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#00FF33;" id="'+hsId+'" onclick="selectionTime(id)"><span id="'+hsId+hsId+'" class="state"onMouseOver="mouseOver('+hsId+hsId+',2)">'+"空"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family: 黑体">'+hsHotDailyRent+'元/晚'+'</span></div><div class="box_5"><span class="time">'+"无预定"+'</span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                    }
                }else if(hsDirtyHouse==1){
                    in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:#C0C0C0;"><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#909090;"><span id="'+hsId+hsId+'" class="state"onMouseOver="mouseOver('+hsId+hsId+',3)" >'+"脏"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family:黑体">'+"脏"+'</span></div><div class="box_5"><span class="time"></span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                }else if(hsDirtyHouse==2){
                    if(hsidList.indexOf(hsId) == -1){
                        in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:#888888;"><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#909090;"><span id="'+hsId+hsId+'" class="state"onMouseOver="mouseOver('+hsId+hsId+',3)">'+"维"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name"style="font-family:黑体">'+"维修中"+'</span></div><div class="box_5"><span class="time"></span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                    }
                }else{
                    if(hsidList.indexOf(hsId) == -1){
                        in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><div class="box_1"style="background:#888888;"><div class="MPH"><span  class="address" id="'+hsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+hsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#909090;"><span id="'+hsId+hsId+'" class="state"onMouseOver="mouseOver('+hsId+hsId+',3)">'+"修"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype"></span></div><div class="box_4"><span class="Name" style="font-family:黑体;">'+"装修中"+'</span></div><div class="box_5"><span class="time"></span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                    }
                }
                $(".BOX_1").html(in_Html3)
            }
        }
    });
    id = id=="ALL"?"":id;
    $.ajax({//获取楼层号跟id相同的已住房间
        url:"../selectJourShortRentContract.action",
        type:"post",
        data:{
            hsLeaseState	:"短租房",
            hsAddFloor		: id,
            jsrcBeginTime	:jsrcBeginTime,
            jsrcEndTime	:jsrcEndTime,
        },
        success:function(result){
            result=result.body
            if(result != "" && result != null){
                for(var i=0;i<result.length;i++){
                    var jsrcBeginTime=new Date(result[i].jsrcBeginTime).format("MM月dd日");
                    var jsrcEndTime=new Date(result[i].jsrcEndTime).format("MM月dd日");
                    var hsAddDoorplateno=result[i].hsAddDoorplateno;
                    var jsrcPeople=JSON.parse(result[i].jsrcPeople);
                    var hsAddCommunity=result[i].hsAddCommunity;
                    var popJson=JSON.parse(result[i].popJson);
                    var TaDay=new Date().format("MM月dd日");
                    var hsRoomType=result[i].hsRoomType;
                    var hsAddFloor=result[i].hsAddFloor;
                    var renterName=result[i].renterName;
                    var jsrcState=result[i].jsrcState;
                    var jsrcHsId=result[i].jsrcHsId;
                    var jsrcId=result[i].jsrcId;
                    var jsrcArrears=result[i].jsrcArrears
                    if (popJson!=null) {
                        var popjson=popJson.length;
                    }
                    for( var a in jsrcPeople){
                        var popName=jsrcPeople[a].popName;
                    }
                    if(hsAddFloor!=null){
                        if(jsrcState=="已住"){
                            var _title_address= result[i].hsAddCoHmmunity +" " + result[i].hsRoomType +" " + hsAddDoorplateno
                            if(jsrcArrears>0){
                                in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1"style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:red;"><span  class="state"id="'+jsrcId+'" onclick="diagramCheckOutDlg('+jsrcId+')"onMouseOver="mouseOver('+jsrcHsId+',4)">'+"欠"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+renterName+'</span></div><div class="box_5"><span class="time">'+'预离:'+jsrcEndTime+'</span> </div><div class="box_6" ><span class="population">'+'共'+popjson+'人'+'</span> </div></div></div>';
                            }else if(jsrcEndTime==TaDay){
                                in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1"style=" background: #FF9900;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#0099FF;"><span  class="state"id="'+jsrcId+'" onclick="diagramCheckOutDlg('+jsrcId+')"onMouseOver="mouseOver('+jsrcHsId+',4)">'+"住"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+renterName+'</span></div><div class="box_5"><span class="time">'+'今日预离'+'</span> </div><div class="box_6" ><span class="population">'+'共'+popjson+'人'+'</span> </div></div></div>';
                            }else{
                                in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1"style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#0099FF;"><span  class="state"id="'+jsrcId+'" onclick="diagramCheckOutDlg('+jsrcId+')"onMouseOver="mouseOver('+jsrcHsId+',4)">'+"住"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+renterName+'</span></div><div class="box_5"><span class="time">'+'预离:'+jsrcEndTime+'</span> </div><div class="box_6" ><span class="population">'+'共'+popjson+'人'+'</span> </div></div></div>';
                            }
                        }
                        if(jsrcState=="保留"||jsrcState=="预定"){
                            var _title_address= result[i].hsAddCommunity +" " + result[i].hsRoomType +" " + hsAddDoorplateno
                            if(jsrcBeginTime<TaDay){
                                in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'"  onclick="houseInfo(id)" onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;" id="'+jsrcId+'" onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span id="'+jsrcId+jsrcId+'"  class="state"onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time"style="color:red">'+'过期未到'+'</span> </div><div class="box_6"><span class="population"></span> </div></div></div>';
                            }else if(jsrcBeginTime==TaDay){
                                in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"></div><span  class="address" id="'+jsrcHsId+'"  onclick="houseInfo(id)" onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;" id="'+jsrcId+'" onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span id="'+jsrcId+jsrcId+'"  class="state"onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'即将到达'+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                            }else{
                                in_Html3+= '<div class="BOX"id="'+hsAddFloor+'"><input id="fullDetail" type="hidden"value="'+result[i]+'"><div class="box_1" style=" background: #0099CC;"><div class="MPH"><span  class="address" id="'+jsrcHsId+'" onclick="houseInfo(id)"onMouseOver="mouseOver('+jsrcHsId+',1)">'+hsAddDoorplateno+'</span></div></div><div class="box_2"> <div class="circle"style="background:#fd5200;" id="'+jsrcId+'" onclick="diagramCheckOutDlg('+jsrcId+')" value="'+_title_address+'"><span id="'+jsrcId+jsrcId+'"  class="state"onMouseOver="mouseOver('+jsrcId+jsrcId+',2)">'+"留"+'</span></div></div><div class="BOX_2"><div class="box_3"><span class="Roomtype">'+hsRoomType+'</span></div><div class="box_4"><span class="Name">'+popName+'</span></div><div class="box_5"><span class="time">'+'预达:'+jsrcBeginTime+'</span> </div><div class="box_6"><span class="population">'+'共1人'+'</span> </div></div></div>';
                            }
                        }
                        $(".BOX_1").html(in_Html3)
                    }
                }
            }
        }
    })
}
//类别筛选
function category(type){

    if(type==0){

        $(".BOX_1").html(Clean)

    }

    if(type==1){

        $(".BOX_1").html(Dirty)

    }

    if(type==2){

        $(".BOX_1").html(Repair)

    }
    if(type==4){
        $(".BOX_1").html("")
    }
    if(type==5){
        $(".BOX_1").html(Arrive)
    }

    if(type==6){

        $(".BOX_1").html(Leave)

    }

    if(type==7){

        $(".BOX_1").html(arrivedNow)

    }

    if(type==8){
        $(".BOX_1").html(Arrears)
    }

    if(type==9){
        $(".BOX_1").html("")
    }

    if(type==10){


        $(".BOX_1").html(Retain)

    }

    if(type==11){
        $(".BOX_1").html("")
    }

    if(type==12){
        $(".BOX_1").html("")
    }

    if(type==13){
        $(".BOX_1").html("")
    }

    if(type==14){
        $(".BOX_1").html("")
    }

    if(type==15){
        $(".BOX_1").html("")
    }
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
}
function houseInfo(id){
    var data = {}
    data = getHouseData(id);
    openHouseInfo(data)
}

var sid;
function selectionTime(id){
    varsid="";
    sid=id;
    $('#timeChoice').dialog({
        title 	: "入住时间选择",
        top		: getTop(180),
        left	: getLeft(650),
        width	: 400,
        height  : 180,
        closed  : true,
        cache	: false,
        modal	: true,
        onClose : function() {
            $('#timeChoice [clear="clear"]').val('');
        }
    })
    $('#timeChoice').dialog('open')
}

function transfer(){
    var begin_Time= $('#begin_Time').val()
    var end_Time=$('#end_Time').val()
    date_selected_for_rent(begin_Time,end_Time,sid)
}

function mouseOver(id,type){

    if(type==1){
        layer.tips('点击查看客房详情', '#'+id,{
            time: 2000
        })
    }
    if(type==2){
        layer.tips('点击可办理入住', '#'+id,{
            time: 1000
        })

    }

    if(type==3){
        layer.tips('脏房请点击门牌操作', '#'+id,{
            time: 1000
        })

    }
    if(type==4){
        layer.tips('点击查看客户信息', '#'+id,{
            time: 1000
        })

    }
    if(type==2){
        $(' #'+id+' .floor').css("background","#398439")
    }

}
function mouseOut(id,type){
    if(type==2) {
        $(' #' + id + ' .floor').css("background", "#5cb85c")
    }

}
function show(type){
    $(".Num0").html('('+ALL.length+')')
    $(".Num2").html('('+clean.length+')')
    $(".Num3").html('('+dirty.length+')')
    $(".Num4").html('('+repair.length+')')
    $(".Num5").html('('+arrive.length+')')
    $(".Num6").html('('+leave.length+')')
    $(".Num7").html('('+ArrivedNow.length+')')
    $(".Num8").html('('+arrears.length+')')
    $(".Num9").html('('+Book.length+')')
    $(".Num10").html('('+retain.length+')')
    $(".Num11").html('(0)')
    $(".Num12").html('(0)')
    $(".Num13").html('(0)')
    $(".Num14").html('(0)')
    $(".Num15").html('(0)')

    if(type==1){
        $("#show1").css("color","#808080")
        $("#show2").css("color","#59acff")
        $("#show1").css("border-bottom-color","white")
        $("#show1").css("border-top-color","#c0c0c0")
        $("#show1").css("border-right-color","#c0c0c0")
        $("#show1").css("border-left-color","#c0c0c0")
        $("#show2").css("border-top-color","white")
        $("#show2").css("border-right-color","white")
        $("#show2").css("border-left-color","white")
        $("#show2").css("border-bottom-color","#c0c0c0")
        $(".Head2").hide()
        $(".Head").show()
    }
    if(type==2){
        $("#show2").css("color","#808080")
        $("#show1").css("color","#59acff")
        $("#show2").css("border-bottom-color","white")
        $("#show2").css("border-top-color","#c0c0c0")
        $("#show2").css("border-right-color","#c0c0c0")
        $("#show2").css("border-left-color","#c0c0c0")
        $("#show1").css("border-top-color","white")
        $("#show1").css("border-right-color","white")
        $("#show1").css("border-left-color","white")
        $("#show1").css("border-bottom-color","#c0c0c0")
        $(".Head").hide()
        $(".Head2").show()
    }

}
