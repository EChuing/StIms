
var _DefaultEarlyWarning = true;
$(function(){
    initValid();
    acsQueryAlarmRecord();
    queryAlarmRecord();
    unprocessedAlarm();
    selectNumber();
    equipmentCondition();
    selectJourTellphone();
    setInterval("addTime()",1000);
    setInterval("acsQueryAlarmRecord()",1000);
    setInterval("selectNumber()",1000*60)
    setInterval("queryAlarmRecord()",1000);
    setInterval("loadData()",1000*60);
    setInterval("equipmentCondition()",1000*60);
    setInterval("loadData2()",1000*60);
    setInterval("unprocessedAlarm()",1000);
  $('#tabs div').click(function(e) {
       e.preventDefault();                
       $('#tabs li').removeClass("current").removeClass("hoverItem");
       $(this).parent().addClass("current");
       $("#content div").removeClass("show");
       $('#' + $(this).attr('title')).addClass('show');
      // alert($(this).attr('title'));
       if($(this).attr('title')=="tab1"){
               //这边是打开第一页时候可以添加一些操作
           loadData();
       }
       if($(this).attr('title')=="tab2"){
             //这边是打开第二页时候可以添加一些操作
       }
       if($(this).attr('title')=="tab3"){
             //这边是打开第三页时候可以添加一些操作
           loadData2();
       }
  });
  $('#tabs a').hover(function(){
     if(!$(this).parent().hasClass("current")){
       $(this).parent().addClass("hoverItem");
     }
  },function(){
     $(this).parent().removeClass("hoverItem");
  });
});
$(function(){
    $('#right_btn').on('click', function(){
        // $('#box').scrollLeft(600);//是把 scrollLeft 设置为600
        $('#box').scrollLeft($('#box').scrollLeft() + 530);
    });

    $('#left_btn').on('click', function(){
        $('#box').scrollLeft($('#box').scrollLeft() - 530 )
    })
    $('#addProgressDlg2').on('hide.bs.modal',function () {
        $(".noticeAlert").hide();
        $('#progressDescribe').val('');
        $("#form").data('bootstrapValidator').destroy();
        $("#form").data('bootstrapValidator', null);
        initValid();
    })
});

function initValid() {
    $("#form").bootstrapValidator({
        message: 'This value is not valid',
        live: 'submitted',
        submitButtons: 'button[type="submit"]',
        fields: {
            content: {
                validators: {
                    notEmpty: {
                        message: '进展描述不能为空'
                    }
                }
            }
        }
    });
}

//查询一周报警次数
function loadData() {
    $.get("../getDeviceWarning.action", function(data) {
        if (data.code<0) {
        } else {
            data = data.body;
            weekChart(data);
        }
    }, "json");
}
//查询一月报警次数
function loadData2() {
    $.get("../getDeviceWarning2.action", function(data) {
        if (data.code<0) {
        } else {
            data = data.body;
            monthChart(data);
        }
    }, "json");
}
/*得到当天的时间*/
function getDay(day){
    var today = new Date();
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    // var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tMonth+"-"+tDate;
}
/*是否加零*/
function doHandleMonth(month){
    var m = month;
    if(month.toString().length == 1){
        // m = "0" + month;
    }
    return m;
}
/*一周的二维图*/
function weekChart(data){
    var hours = [getDay(-6),getDay(-5),getDay(-4),getDay(-3),getDay(-2),getDay(-1),getDay(-0)];
    var Offline = [];
    var Online = [];
    var Warning = [];
    for (var i=1;i<=data.length;i++){
        Online.push(parseInt(data[data.length-i].sdwOnline));//在线
        Offline.push(parseInt(data[data.length-i].sdwOffline));//离线
        Warning.push(parseInt(data[data.length-i].sdwWarning));//警报
    }
    // 路径配置
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });

    // 使用
    require(
        [
            'echarts',
            'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
            'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('weekEchart')); 
            option = {
                backgroundColor:"#0B1F38",
                title : {//标题
                    text: '近七天预警',
                    // subtext: '纯属虚构',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['报警个数','在线个数','离线个数'],
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                toolbox: {//工具栏
                    show : true,
                    color:['#ffffff','#ffffff','#ffffff','#ffffff'],
                    feature : {
                        saveAsImage : {show: true},
                        restore : {show: true},
                        // mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['bar', 'line']},
                    },
                },
                calculable : true,
                xAxis : [//X轴
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : hours,
                        axisLine:{
                            lineStyle:{
                                color:'#FFF000',
                                width:2
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['#ffffff'],
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ],
                yAxis : [//y轴
                    {
                        type : 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#FFF000',
                                width:2
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['#ffffff'],
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'报警个数',
                        type:'line',
                        data:Warning,
                        markPoint : {
                            data : [
                            ]
                        },
                        itemStyle:{
                            normal:{
                                label:{
                                    show: true,
                                    color: '#000000',//气泡中字体颜色
                                }
                            }
                        },
                        markLine : {
                            data : [
                                // {type : 'average', name : '平均值'}
                            ]
                        }
                    },
                    {
                        name:'在线个数',
                        type:'line',
                        data:Online,
                        markPoint : {
                            data : [
                            ]
                        },
                        itemStyle:{
                            normal:{
                                label:{
                                    show: true,
                                    color: '#000000',//气泡中字体颜色
                                }
                            }
                        },
                        markLine : {
                            data : [
                                // {type : 'average', name : '平均值'}
                            ]
                        }
                    },
                    {
                        name:'离线个数',
                        type:'line',
                        data:Offline,
                        markPoint : {
                            data : [
                            ]
                        },
                        itemStyle:{
                            normal:{
                                label:{
                                    show: true,
                                    color: '#000000',//气泡中字体颜色
                                }
                            }
                        },
                        markLine : {
                            data : [
                                // {type : 'average', name : '平均值'}
                            ]
                        }
                    }
                ]
            };
            // 为echarts对象加载数据
            myChart.setOption(option,true);
            myChart.resize();
        });
}
/*一个月的二维图*/
function monthChart(data){
    var hours = [];
    for(var i=-29;i<1;i++){
        hours.push(getDay(i));
    }
    var Offline = [];
    var Online = [];
    var Warning = [];
    for (var i=1;i<=data.length;i++){
        Online.push(parseInt(data[data.length-i].sdwOnline));//在线
        Offline.push(parseInt(data[data.length-i].sdwOffline));//离线
        Warning.push(parseInt(data[data.length-i].sdwWarning));//警报
    }
        // 路径配置
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
                'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart1 = ec.init(document.getElementById('monthEchart'));
                option1 = {
                    backgroundColor:"#0B1F38",
                    title : {//标题
                        text: '近30天预警',
                        // subtext: '纯属虚构',
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['报警个数','在线个数','离线个数'],
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    toolbox: {//工具栏
                        show : true,
                        color:['#ffffff','#ffffff','#ffffff','#ffffff'],
                        feature : {
                            saveAsImage : {show: true},
                            restore : {show: true},
                            // mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                        },
                    },
                    calculable : true,
                    xAxis : [//X轴
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : hours,
                            axisLine:{
                                lineStyle:{
                                    color:'#FFF000',
                                    width:2,
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle:{
                                    color: ['#ffffff'],
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                },
                                interval:0,
                                rotate: 50,
                            }
                        }
                    ],
                    yAxis : [//y轴
                        {
                            type : 'value',
                            axisLine:{
                                lineStyle:{
                                    color:'#FFF000',
                                    width:2
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle:{
                                    color: ['#ffffff'],
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'报警个数',
                            type:'line',
                            data:Warning,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]

                            },
                            markLine : {
                                data : [
                                    // {type : 'average', name: '平均值'}
                                ],
                            }
                        },
                        {
                            name:'在线个数',
                            type:'line',
                            data:Online,
                            markPoint : {
                                data : [
                                    // {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine : {
                                data : [
                                    // {type : 'average', name : '平均值'}
                                ]
                            }
                        },
                        {
                            name:'离线个数',
                            type:'line',
                            data:Offline,
                            markPoint : {
                                data : [
                                    // {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine : {
                                data : [
                                    // {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                };
                myChart1.setOption(option1,true);
                myChart1.resize();
            }
        );
}
/*查询所有用户*/
function selectNumber(){
    $.post("../selectPopulationAllUsers.action",{

    },function(data){
        data = data.body;
        $("#actualPopNum").text('');
        $("#actualPopNum").text(data[0].numberAll);
    });
}
/*查询报警信息生成报警记录*/
function acsQueryAlarmRecord(){
    $.post("../acsQueryAlarmRecord.action",{
    },function(data){
        if(data.code<0){
            myTips(data.msg);
        }
    });
}
/*报警记录和次数*/
function queryAlarmRecord(){
    $.post("../queryAlarmRecordCount.action",{
    },function(data) {
        if(data.code>0){
            data=data.body;
            console.log(data)
            $("#contentDivInfofaction").html("");
            for (var i in data) {
                data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
                if(data[i].jdwWarningTime == '' || data[i].jdwWarningTime == null){
                    data[i].jdwWarningTime = data[i].jdwTime;
                }
            }
            for(var i=0;i<data.length;i++){
                if(data[i].jdwHandleStatus=="未处理"){

                }
                $("#contentDivInfofaction").append("<div ondblclick='handleResult2("+data[i].jdwDevId+")'>"+data[i].detailedAddress +"-" +"<span style='color: yellow'>"+ data[i].devNickname +"</span>"+":<span style='color: yellow'>"+ data[i].countSum +"</span>次"+"</div>"+"</br></br>");
            }
        }else{
        }
    }, "json");
}
//处理预警
function doHandle(id){
    $.post("../handleAlarm.action",{
        jdwId: id,
    },function(data){
        if(data.code<0){
            $.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
            return;
        }else{
            _DefaultEarlyWarning = true;
            unprocessedAlarm();
            $("#alertDg").text('');
        }
    })
}
function CurentTime()
{
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    // var hh = now.getHours();
    // var mm = now.getMinutes();

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    // if(hh < 10)
    //     clock += "0";
    //
    // clock += hh + ":";
    // if (mm < 10) clock += '0';
    // clock += mm;
    return(clock);
}
function CurentTimeDate()
{
    var now = new Date();

    // var year = now.getFullYear();
    // var month = now.getMonth() + 1;
    // var day = now.getDate();

    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();

     var clock = '';
    //
    // if(month < 10)
    //     clock += "0";
    //
    // clock += month + "-";
    //
    // if(day < 10)
    //     clock += "0";
    //
    // clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm+":";
    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}
function unprocessedAlarm(){
    var audio = $("#music")[0];
    $.post("../unprocessedAlarm.action",{
    },function(data) {
        if (data.code<0){
            var dataTime = CurentTime();
            var dtatTimeData = CurentTimeDate();
            $("#contentDivId").text('');
            $("#alertDg").html("<div id=\"clock\">\n" +
                "    <p class=\"date\">"+dataTime+"</p>\n" +
                "    <p class=\"time\">"+dtatTimeData+"</p>\n" +
                "</div>");
            audio.pause();
        }else{
            data = data.body;
             $('#contentDivId div').remove();
            if (data.length == 0){
                audio.pause();
            } else{
                audio.play();
            }

            for (var i in data) {
                var hsAddCommunity = data[i].hsAddCommunity != undefined ? data[i].hsAddCommunity : "";
                var hsAddBuilding = data[i].hsAddBuilding != undefined ? data[i].hsAddBuilding : "";
                var hsAddDoorplateno = data[i].hsAddDoorplateno != undefined ? data[i].hsAddDoorplateno : "";
                data[i].detailedAddress = hsAddCommunity + " " + hsAddBuilding + " " + hsAddDoorplateno;
                //data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
                var url;
                var text1;
                var text2;
                var text3;
                var text4='';
                // if(data[i].hsLeaseState == "空置未租" || data[i].hsLeaseState == "正在转租" || data[i].hsLeaseState == "到期不续" || data[i].hsLeaseState == "毁约待租"){
                //     text1 = data[i].hsLeaseState;
                // }else if (data[i].hsLeaseState == "短租房"){
                //     if(data[i].residentCount){
                //         data[i].residentCount = parseInt(data[i].residentCount) + 1;
                //         text1 = data[i].renterPopName+'</span>&nbsp:&nbsp<span style="font-size:16px;">'+data[i].renterPopTelephone;
                //     }else{
                //         text1 = '空置短租房';
                //     }
                // }else{
                    data[i].residentCount = parseInt(data[i].residentCount) + 1;
                    text1 = data[i].renterPopName;
                    text4 = data[i].renterPopTelephone;
                // }
                // if(data[i].jdwType == 0){
                    text2 = '今天报警&nbsp:&nbsp<span style="font-size:14px;">'+data[i].count+'</span>次'
                // }else if(data[i].jdwType == 1){
                //     url = "img/waterMeter.png";
                //     text2 = '当日用水量高于昨日用水量<span style="font-size:14px;">'+data[i].waterDailyVariable+'</span>立方';
                // }else if(data[i].jdwType == 2){
                //     url = "img/waterMeter.png";
                //     text2 = '连续用水时间超过设定时间<span style="font-size:14px;"></span>';
                // }else{
                //     url="img/dianxiang.png";
                //     var waring = data[i].jdwFailureCause;
                //     text2 = '故障原因：<span style="font-size:14px;">'+waring+'</span>';
                // }
                if (typeof(text1) == "undefined") {
                    text1 = "";
                }
                if (typeof(text4) == "undefined") {
                    text4 = "";
                }
                if (typeof(data[0].renterPopName) == "undefined") {
                    data[0].renterPopName = "";
                }
                if (typeof(data[0].renterPopTelephone) == "undefined") {
                    data[0].renterPopTelephone = "";
                }
                if(!data[i].residentCount){
                    data[i].residentCount = 0;
                }
                var waring = data[i].jdwFailureCause == undefined ? "":data[i].jdwFailureCause;

                if (_DefaultEarlyWarning){
                    _DefaultEarlyWarning = false;
                    $("#alertDg").html(
                        '<div id="alertTitle" style="width: 60%; float: left; padding-top:5%;  margin-left:5%; color:#FFF000; font-size: 2vw;" >'+data[0].devNickname+'</div>\n' +
                        '<div id="alertTime" style="width: 30%;float: left;padding-top: 5%;margin-left: 5%;font-size: 2vw;font-family: Conv_Digit;" class="preTime"></div>\n' +
                        '<HR align=center width=90%; color=#FFF000 SIZE=3>\n' +
                        '<div id="alertDetail">\n' +
                        '<div style="float: left;width: 69%; margin-left: 5%;">\n' +
                        '<div>\n' +
                        '<div class="iconAddress" style="width: 5%;height: 5%;float: left;"><img src="img/address.png" height="100%" width="100%"></div>\n' +
                        '<div id="alertAddress" class="commonTabText" >'+data[0].detailedAddress+'</div>\n' +
                        '</div>\n' +
                        '<div style="clear: both"></div>\n' +
                        '<div>\n' +
                        '<div class="alertBegin" style="width: 5%;height: 5%;float: left;"><img src="img/time.png" height="100%" width="100%"></div>\n' +
                        '<div id="alertBegin"  class="commonTabText">'+data[0].jdwWarningTime+'</div>\n' +
                        '</div>\n' +
                        '<div style="clear: both"></div>\n' +
                        '<div>\n' +
                        '<div class="alert24hTimes" style="width: 5%;height: 5%;float: left;"><img src="img/history.png" height="100%" width="100%"></div>\n' +
                        '<div id="alert24hTimes"  class="commonTabText">'+data[0].count+'</div>\n' +
                        '</div>\n' +
                        '<div style="clear: both"></div>\n' +
                        '<div>\n' +
                        '<div class="alertPop" style="width: 5%;height: 5%;  float: left; "><img src="img/pople.png" height="100%" width="100%"></div>\n' +
                        '<div id="alertPop"  class="commonTabText">'+data[0].renterPopName+'</div>\n' +
                        '</div>\n' +
                        '<div style="clear: both"></div>\n' +
                        '<div>\n' +
                        '<div class="alertPoPhone" style="width: 5%;height: 5%; float: left;"><img src="img/phone.png" height="100%" width="100%"></div>\n' +
                        '<div id="alertPoPhone"  class="commonTabText">'+data[0].renterPopTelephone+'</div>\n' +
                        '</div>\n' +
                        '<div style="clear: both"></div>\n' +
                        '<div>\n' +
                        '<div class="alertInformation" style="width: 5%;height: 5%; float: left;"><img src="img/information.png" height="100%" width="100%"></div>\n' +
                        '<div id="alertInformation"  class="commonTabText">'+waring+'</div>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '<div style="float: left; width:20%; ">\n' +
                        '<div id="alerPopNum" class="AlertingPopDigit" >'+data[0].residentCount+'</div>\n' +
                        '<div class="AlertingPopText">人</div>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '<div style="clear: both;"></div>\n' +
                        '<button id="alertHandle" value="'+data[0].id+'" style="margin-left: 40%;border-top-width: 0px;\n' +
                        '    border-left-width: 0px;\n' +
                        '    border-bottom-width: 0px;\n' +
                        '    border-right-width: 0px;  " onclick="doHandle($(this).val())">\n' +
                        '<span style="margin-top: 4%;margin-left: 36%; float:left; font-size: 16px;">处理</span>\n' +
                        '</button>'
                    );
                }
                $("#contentDivId").append(
                    "<div style=\" height:2%; background-color:#001221;font-size: 1vw;\"></div>\n" +
                    "<div id='waitHandleId"+i+"' class=\"waitHandle\" onclick=\"headShow(this.id)\">\n" +
                    "<div class=\"waitDevice\">"+data[i].devNickname+"</div>\n" +
                    "<div class=\"preTimeText\">处理耗时</div>\n" +
                        "<div class=\"preTime\"></div>\n" +
                    "<div class=\"warnLine\"></div>\n" +
                    "<div class=\"preDetail\">\n" +
                    "<div class=\"preWarnAddress\">"+data[i].detailedAddress+"</div>\n" +
                    "<div class=\"preWarnTime\">"+data[i].jdwWarningTime+"</div>\n" +
                    "<div class=\"preWarnCount\">"+text2+"</div>\n" +
                    "</div>\n" +
                    "<div class=\"prePop\">\n" +
                    "<div class=\"prePopDigt\">"+data[i].residentCount+"</div>\n" +
                    "<div class=\"preText\"  >人</div>\n" +
                    "<div class=\"userName\" style='display: none'>"+text1+"</div>"+
                    "<div class=\"phone\" style='display: none'>"+text4+"</div>"+
                    "<div class=\"datagrid2\" style='display: none'>"+data[i].id+"</div>"+
                    "<div class=\"failureCause\" style='display: none'>"+waring+"</div>"+
                    "</div>\n" +
                    "<div style=\"clear: both;\"></div>\n" +
                    "</div>"
                );
                addTime();

            }
        }
    });



}
$(".waitHandle").click(function(){
    $("#alertDg").html($(this).html());
});
/*把毫秒值转换成时分秒 */
function timeFilter (seconds){
    var ss = parseInt(seconds/1000)// 秒
    var mm = 0// 分
    var hh = 0// 小时
    if (ss > 60) {
        mm = parseInt(ss / 60)
        ss = parseInt(ss % 60)
    }
    if (mm > 60) {
        hh = parseInt(mm / 60)
        mm = parseInt(mm % 60)
    }
    var result1 = ('00' + parseInt(ss)).slice(-2)
    if (mm > 0) {
        result1 = ('00' + parseInt(mm)).slice(-2) + ':' + result1
    } else {
        result1 = '00:' + result1
    }
    if (hh > 0) {
        result1 = parseInt(hh) + ':' + result1
    }
    return result1
}
function addTime(){
    $("#contentDivId .waitHandle").each(function () {
        var date = $(this).children(".preDetail").children(".preWarnTime").html();
        date = new Date(date).getTime();
        var time = new Date().getTime();
        var consuming = time-date;
        var pratime = timeFilter(consuming);
        $(this).children(".preTime").html(pratime);

    })
    var date = $("#alertBegin").html();
    date = new Date(date).getTime();
    var time = new Date().getTime();
    var consuming = time-date;
    var pratime = timeFilter(consuming);
    $("#alertTime").html(pratime);
}
function headShow(id){
    $("#alertDg").html(
        '<div id="alertTitle" style="width: 60%; float: left; padding-top:5%;  margin-left:5%; color:#FFF000; font-size: 2vw;" >'+$("#"+id).children(".waitDevice").html()+'</div>\n' +
        '<div id="alertTime" style="width: 30%;float: left;padding-top: 5%;margin-left: 5%;font-size: 2vw;font-family: Conv_Digit;" class="preTime">'+$("#"+id).children(".preTime").html()+'</div>\n' +
        '<HR align=center width=90%; color=#FFF000 SIZE=3>\n' +
        '<div id="alertDetail">\n' +
        '<div style="float: left;width: 69%; margin-left: 5%;">\n' +
        '<div>\n' +
        '<div class="iconAddress" style="width: 5%;height: 5%;float: left;"><img src="img/address.png" height="100%" width="100%"></div>\n' +
        '<div id="alertAddress" class="commonTabText" >'+$("#"+id).children(".preDetail").children(".preWarnAddress").html()+'</div>\n' +
        '</div>\n' +
        '<div style="clear: both"></div>\n' +
        '<div>\n' +
        '<div class="alertBegin" style="width: 5%;height: 5%;float: left;"><img src="img/time.png" height="100%" width="100%"></div>\n' +
        '<div id="alertBegin"  class="commonTabText">'+$("#"+id).children(".preDetail").children(".preWarnTime").html()+'</div>\n' +
        '</div>\n' +
        '<div style="clear: both"></div>\n' +
        '<div>\n' +
        '<div class="alert24hTimes" style="width: 5%;height: 5%;float: left;"><img src="img/history.png" height="100%" width="100%"></div>\n' +
        '<div id="alert24hTimes"  class="commonTabText">'+$("#"+id).children(".preDetail").children(".preWarnCount").html()+'</div>\n' +
        '</div>\n' +
        '<div style="clear: both"></div>\n' +
        '<div>\n' +
        '<div class="alertPop" style="width: 5%;height: 5%;  float: left; "><img src="img/pople.png" height="100%" width="100%"></div>\n' +
        '<div id="alertPop"  class="commonTabText">'+$("#"+id).children(".prePop").children(".userName").html()+'</div>\n' +
        '</div>\n' +
        '<div style="clear: both"></div>\n' +
        '<div>\n' +
        '<div class="alertPoPhone" style="width: 5%;height: 5%; float: left;"><img src="img/phone.png" height="100%" width="100%"></div>\n' +
        '<div id="alertPoPhone"  class="commonTabText">'+$("#"+id).children(".prePop").children(".phone").html()+'</div>\n' +
        '</div>\n' +
        '<div style="clear: both"></div>\n' +
        '<div>\n' +
        '<div class="alertInformation" style="width: 5%;height: 5%; float: left;"><img src="img/information.png" height="100%" width="100%"></div>\n' +
        '<div id="alertInformation"  class="commonTabText">'+$("#"+id).children(".prePop").children(".failureCause").html()+'</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div style="float: left; width:20%; ">\n' +
        '<div id="alerPopNum" class="AlertingPopDigit" >'+$("#"+id).children(".prePop").children(".prePopDigt").html()+'</div>\n' +
        '<div class="AlertingPopText">人</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div style="clear: both;"></div>\n' +
        '<button id="alertHandle" value="'+$("#"+id).children(".prePop").children(".datagrid2").html()+'" style="margin-left: 40%;border-top-width: 0px;\n' +
        '    border-left-width: 0px;\n' +
        '    border-bottom-width: 0px;\n' +
        '    border-right-width: 0px;  " onclick="doHandle($(this).val())">\n' +
        '<span style="margin-top: 4%;margin-left: 36%; float:left; font-size: 16px;">处理</span>\n' +
        '</button>'
    );
}
/*实时设备情况*/
function equipmentCondition(){
    $.post("../equipmentCondition.action",{
    },function(data){
        if(data.code>0){
            data = data.body;
            $(".boxDiv").remove();
            for(var i in data){
                if(data[i].count !=0){
                    $("#boxWrapperId").append(
                        "<div class=\"boxDiv\">\n" +
                        "<div style=\"margin-top: 10%;margin-bottom:10%; \">"+data[i].deviceName+"</div>\n" +
                        "<div class=\"actualDivceNum\">"+data[i].count+"</div>\n" +
                        "<div class=\"actualDivceDetail\">预警"+data[i].sdwWarning+"个</div>\n" +
                        "<div class=\"actualDivceDetail2\">离线"+data[i].sdwOffline+"个</div>\n" +
                        "</div>"
                    );
                }
            }
        }
    });
}
function addJourCallDlg(){
    $("#addJourCallDlg").dialog({
        title : '修改报警信息',
        top : getTop(200),
        left : getLeft(350),
        height : 220,
        width : 450,
        closed : true,
        cache : false,
        modal : true,
        onClose:function(){
            $("#addJourCallDivid1").val('');
            $("#addJourCallDivid2").val('');
        }
    });
    selectJourCallTephone();
    $("#addJourCallDlg").dialog("open");
}
function addJourCallDlg1(){
    // $("#addJourCallDlg").dialog({
    //     title : '修改报警信息',
    //     top : getTop(200),
    //     left : getLeft(350),
    //     height : 220,
    //     width : 450,
    //     closed : true,
    //     cache : false,
    //     modal : true,
    //     onClose:function(){
    //         $("#addJourCallDivid1").val('');
    //         $("#addJourCallDivid2").val('');
    //     }
    // });
    // selectJourCallTephone();
    // $("#addJourCallDlg").dialog("open");
    selectJourCallTephone();
    $('#addJourCallDlg').show();
}
function selectJourCallTephone(){
    $.post("../selectJourCall2.action",{
    },function(data){
        if(data.code>0){
            $("#rightTopdiv").text('');
            data = data.body;
            for(var i in data){
                $("#rightTopdiv").append("<div style='margin:5px 0 0 0;float: left;'>\n" +
                    "紧急联系人：<input class=\"addJourCallDividclass\" value='"+data[i].jourContacts+"' style=\"margin:0 0 0 0;width:90px\" disabled=\"disabled\">\n" +
                    "</div>\n" +
                    "<div style='margin:5px 0 0 12px;float: left;'>\n" +
                    "联系电话：<input class=\"addJourCallDividclass\" value='"+data[i].jourTelephone+"' style=\"margin:0 0 0 0;width:90px\" disabled=\"disabled\">\n" +
                    "</div>\n" +
                    "<div style=\"margin:5px 0 0 5px;float: left;>\n" +
                    "<a id='alickButton1' onclick=\"deleteJourTellphone("+data[i].jourId+")\" style=\"margin:0 0 0 5px;height: 20px;\"></a>"+
                    "<a id='alickButton2' onclick=\"deleteJourTellphone("+data[i].jourId+")\" style=\"margin:0 0 0 0;height: 20px;\">删除</a>"+
                    "</div>"+
                    "<div style='clear: both'></div>"
                )
            }
        }
    })
}
function selectJourTellphone(){
    $.post("../selectJourCall2.action",{
    },function(data){
        $("#contentDiv1").text('');
        $("#contentDiv2").text('');
        if(data.code>0){
            data = data.body;
            for(var i in data){
                $("#contentDiv1").append(
                    "<div>\n" +
                    "<div class=\"commonTitle1\" style=\"margin-right: 10px;\">"+data[i].jourContacts+":</div>\n"
                )
                $("#contentDiv2").append("<div id=\"policemam\"class='policemanClass'>"+data[i].jourTelephone+"</div>\n" +
                    "<div id=\"policemamId\" style='display: none' >"+data[i].jourId+"</div>\n" +
                    "<div style=\"clear: both;\"></div>\n" +
                    "</div>")
            }
            // $("#policemam").html(data[0].jourPoliceStation);
            // $("#fire").html(data[0].jourFireAlarm);
            // $("#aid").html(data[0].jourFirstAid);
            // $("#elevator").html(data[0].jourElevatorCompany);
            // $("#repair").html(data[0].jourHydropower);
        }
    })
}
function insertJourTellphone() {
    var addJourCallDivid1 = $("#addJourCallDivid1").val().trim();
    var addJourCallDivid2 = $("#addJourCallDivid2").val().trim();
    if (addJourCallDivid1 != "" && addJourCallDivid2 != "") {
        $.post("../selectJourCall2.action", function (data) {
            data = data.body
            if (data.length > 0) {
                for (var i in data) {
                    if (data[i].jourContacts == addJourCallDivid1 && data[i].jourTelephone == addJourCallDivid2) {
                        $.messager.alert("通知", "已有此联系人！", "error");
                        break;
                    } else if (i == data.length - 1) {
                        $.post("../insertJourCall2.action", {
                            jourContacts: addJourCallDivid1,
                            jourTelephone: addJourCallDivid2
                        }, function (data) {
                            if (data.code > 0) {
                                data = data.body;
                                selectJourTellphone();
                                selectJourCallTephone();
                            }
                        })
                    }
                }
                $("#addJourCallDivid1").val('');
                $("#addJourCallDivid2").val('');
            } else {
                $.post("../insertJourCall2.action", {
                    jourContacts: addJourCallDivid1,
                    jourTelephone: addJourCallDivid2
                }, function (data) {
                    if (data.code > 0) {
                        data = data.body;
                        selectJourTellphone();
                        selectJourCallTephone();
                        $("#addJourCallDivid1").val('');
                        $("#addJourCallDivid2").val('');
                    }
                })
            }
        })
    } else {
        $.messager.alert("通知", "输入内容不能为空", "error");
    }
}
function deleteJourTellphone(jourId){
    $.post("../deleteJourTellphone.action",{
        jourId  : jourId
    },function(data){
        selectJourCallTephone();
        selectJourTellphone();
    })
}
var _dataId = "";
/*添加进展*/
function handleResult(rowData){
    _dataId = rowData;
    console.log(rowData)
    $('#handleAlarmDlg').dialog({
        title : '预警跟进',
        top : getTop(240),
        left : getLeft(540),
        width : 680,
        height : 350,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#showProgressTable").datagrid("loadData", []);
        }
    });
    var jdwId = rowData;
    $.post("../selectJourEws.action",{
        jourId	: jdwId,
    },function(data){
        if(data.code<0){
            $('#showProgressTable').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
            return;
        }
        data = data.body;
        $("#showProgressTable").datagrid("loadData",data);
    });
    $('#handleAlarmDlg').dialog("open");
}

function addProgress(){

    $("#addProgressDlg").dialog({
        title : '添加进展',
        top : getTop(200),
        left : getLeft(350),
        height : 200,
        width : 350,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#addProgressDlg input").val('');
            $("#addProgressDlg textarea").val('');
        }
    });
    $(".add_pro_time").val(getNowFormatDate());
    $("#addProgressDlg").dialog('open');
}

//执行添加进展bs
function doAddProgress2() {
    var proTime = $(".add_pro_time").val();
    var proUserName = $("#loginUserName").val();
    var proMark = $(".add_pro_mark").val();
    $.post("../insertJourEws.action",{
        jourId	:	_dataId,
        jourProTime	:	proTime,
        jourProUserName : proUserName,
        jourProMark :proMark
    },function(data){
        if(data.code<0){
            alert('操作失败！原因：' + data.msg);
            return;
        }
        handleResult2(_dataId);
    });
    $('#addProgressDlg2').modal('hide');
}
function valid(){
    if(!$('#progressDescribe').val()=="") {
        doAddProgress2();
    }else{
        $(".noticeAlert").show();
    }
}
function handleResult2(rowData) {
    _dataId = rowData;
    $('#handleAlarmDlg2').modal('show');
    var jdwId = rowData;
    $('#table').bootstrapTable('destroy');
    $('#table').bootstrapTable({
        url: '../selectJourEws.action',
        queryParamsType: 'undefined',
        queryParams: function queryParams(params) {   // 设置查询参数
            console.log(params.pageNumber);
            console.log(params.pageSize);
            var param = {
                startNum: (params.pageNumber - 1) * params.pageSize,
                endNum: params.pageSize,
                jourId	: jdwId
            };
            return param;
        },
        cache: false,//不缓存
        pagination: true,//开启分页
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        sidePagination: 'server',
        pageList: [],
        pageNumber: 1,//页码
        pageSize: 10,//每页条数
        toolbar: '#form-performance',//功能框
    });
}

//
