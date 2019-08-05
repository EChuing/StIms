<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>民宿房态</title>
    <link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
    <link href="css/icon.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script src="js/config.js"></script>

    <link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
    <link href="css/upload.css" rel="stylesheet">
    <link href="css/contextMenu.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>


    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
            font-size: 14px;
            padding-left:10px;
        }

        #calendar {
            max-width: 100%;
            /* margin: 50px auto; */
        }
    </style>
    <style>
        * {font-size: 12px}
        #cal_ims {
            width:1200px;
            height:800px;
            border: 1px #ddd solid;
            padding-bottom: 3px;
            background-color: #eee ;
            text-align:center;
            cursor: pointer;
            overflow:overlay;
            overflow-x:scroll;
        }

        #cal_left {
            float:left;
            width:304px;
            background-color: white;
            margin-right: 4px;
            font-weight: bold
        }

        .cal_left_col {
            float:left;
            width:90px;
            height:23px;
            border-right:1px #ddd solid;
            border-bottom:1px #ddd solid;
            background-color: white;
        }

        #cal_right {
            float:left;
            width:920px;
            background-color: white;
        }

        .cal_right_row {
            width:1300px;
            clear: both;
            font-weight: bold;
            background-color: white;
        }

        .cal_right_day {
            float:left;
            width:42px;
            height:23px;
            border-right:1px #ddd solid;
            border-bottom:1px #ddd solid;
        }

        /*正在进行的订单事件*/
        .cal_right_event {
            margin-left: 20px;
            border-radius:5px;
            z-index:999;
            overflow: hidden;
            float:left;
            border-right:#3a87ad;
            border-bottom: #3a87ad;
            width:120px;
            height:20px;
            color:rgb(240, 255, 255);
            background-color: #6caac9;
            position: relative;
        }

        /*过期的订单事件*/
        .cal_right_event_olded {
            margin-left: 20px;
            border-radius:5px;
            z-index:999;
            overflow: hidden;
            float:left;
            border-right:#92914e;
            border-bottom: #92914e;
            width:120px;
            height:20px;
            color:rgb(240, 255, 255);
            background-color: #c9c76c;
            position: relative;
        }
        /*欠费金额不为0事件*/
        .cal_right_event_arrears {
            margin-left: 20px;
            border-radius:5px;
            z-index:999;
            overflow: hidden;
            float:left;
            border-right:#92914e;
            border-bottom: #92914e;
            width:120px;
            height:20px;
            color:rgb(240, 255, 255);
            background-color: #f40707;
            position: relative;
        }

        /*下订的订单事件*/
        .cal_right_event_booked {
            margin-left: 20px;
            border-radius:5px;
            z-index:999;
            overflow: hidden;
            float:left;
            border-right:#54924e;
            border-bottom: #54924e;
            width:120px;
            height:20px;
            color:rgb(240, 255, 255);
            background-color: #82c96c;
            position: relative;
        }
        /*未接单的订单事件*/
        .cal_right_event_new_booked {
            margin-left: 20px;
            border-radius:5px;
            z-index:999;
            overflow: hidden;
            float:left;
            border-right:#54924e;
            border-bottom: #54924e;
            width:120px;
            height:20px;
            color:rgb(240, 255, 255);
            background-color: #FFCA1F;
            position: relative;
        }

        .cal_right_event_auth{
            margin-left: 20px;
            border-radius:5px;
            z-index:999;
            overflow: hidden;
            float:left;
            border-right:#54924e;
            border-bottom: #54924e;
            width:120px;
            height:20px;
            color:rgb(240, 255, 255);
            background-color: #9b9b9b;
            position: relative;

        }

        .weekend_day {
            background-color: rgb(220, 245, 241)
        }

        .today_day {
            background-color: rgb(252, 248, 229)
        }

        .day_selected{
            background-color: #33CCCC
        }

        .row_on_select{
            background-color: red
        }

        .cal_right_order_event{
            margin-left: 20px;
            border-radius:5px;
            z-index:999;
            overflow: hidden;
            float:left;
            border-right:#54924e;
            border-bottom: #54924e;
            width:120px;
            height:20px;
            color:rgb(240, 255, 255);
            background-color: #FFCA1F;
            position: relative;
        }

        /* .hsDirtyHouse:before {content:url(images/broom.png);height:16px;width:16px} */

    </style>
</head>
<body oncontextmenu='return false' ondragstart='return false' onselectstart ='return false' oncopy='document.selection.empty()' onbeforecopy='return false' >
<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>

<input id="status1" type="hidden" />
<input id="status2" type="hidden" />

<input id="house" type="hidden" />

<input id="payMoneyText" type="hidden">

<datalist id="eventList">
</datalist>
<datalist id="checkInList">
</datalist>
<datalist id="checkInList1">
</datalist>

<div style="padding-top:10px;display:flex">
    <div>
        <a class="easyui-linkbutton" iconCls="icon-ruzhubanli1" plain="true"   onclick="handle1()">快速入住</a>
    </div>
    <div>
        <a class="easyui-linkbutton" iconCls="icon-tuifangbanli1" plain="true"   onclick="handle2()">快速退房</a>
    </div>
    <div>
        <a class="easyui-linkbutton" iconCls="icon-baoliushezhi1" plain="true"  onclick="handle3()">保留办理</a>
    </div>
    <div>
        <a class="easyui-linkbutton" iconCls="icon-shezhibaojie" plain="true" onclick="openClean(1)">设置保洁</a>
    </div>
    <div>
        <a class="easyui-linkbutton" iconCls="icon-tianjiaweixiu" plain="true" onclick="openRepair()">添加维修</a>
    </div>
    <div>
        <a class="easyui-linkbutton" iconCls="icon-tianjiaweixiu" plain="true" onclick="cleanAll()">批量完成维保</a>
    </div>
    <div>
        <a class="easyui-linkbutton" iconCls="icon-menkaguanli1" plain="true" onclick="openDoorCard()">授权管理</a>
    </div>
    <div>
        <a class="easyui-linkbutton" iconCls="icon-temp" plain="true" onclick="takingOrder()">取单</a>
    </div>
    <!-- <div>
        <a class="easyui-linkbutton" iconCls="icon-huanfangbanli1" plain="true" >换房办理</a>
    </div> -->
</div>
<div style="clear:both"></div>
<div class="shortRentState" style="margin:10px 0 5px 0;color:black;font-size:13px;float:left;">
    <input id="searchButtonState" type="hidden" value="">
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="所有">所有客房<span class="totalNum0"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="空置未查">空置未查<span class="totalNum1"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="空置干净">空置干净<span class="totalNum2"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="空置保洁">空置保洁<span class="totalNum3"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="空置维修">空置维修<span class="totalNum4"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="当天抵达">当天抵达<span class="totalNum5"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="当天预离">当天预离<span class="totalNum6"></span></button>
    <div style="clear:both"></div>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="当天预订">当天预订<span class="totalNum7"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="欠款单客房">欠款单客房<span class="totalNum8"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="预订客房">预订客房<span class="totalNum9"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="保留客房">保留客房<span class="totalNum10"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="停用客房">停用客房<span class="totalNum11"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="内部客房">内部客房<span class="totalNum12"></span></button>
    <button type="button" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="普通客房">普通客房<span class="totalNum13"></span></button>
</div>
<div style="margin:52px 0 0 10px;fload:left">
    <a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="reflashList()" ></a>
</div>
<div style="clear:both"></div>
<div style="margin:5px 0 0 15px;float:left;">
    门店：<input id="searchHsAddCommunity" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;initInfo()')" />
</div>
<div style="margin:5px 0 0 15px;float:left;">
    客房类型：<select id="searchHouseType" onchange="initInfo()">
</select>
</div>
<div style="margin:5px 0 0 15px;float:left;">
    房号：<input id="searchHsAddDoorplateno" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;initInfo()')" />
</div>
<div style="margin:5px 0 0 15px;padding:0 0 5px 17px;color:black;float:left;">
    入住时间：<input id="searchHouseStart" style="margin:0 5px 0 0;width:100px" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchHouseEnd\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:searchData()})">
    到 <input id="searchHouseEnd" style="margin:0 0 0 5px;width:100px" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchHouseStart\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:searchData()})">
    <input style="width:0px;hight:0px;border:none">
</div>
<div style="clear:both"></div>

<div style="width:11px;height:25px;background-color:white;position:absolute;left:0;top:169px;z-index:2998"></div>

<!-- 下面是插件主要框架体-->
<div id="cal_ims" style="margin-top:10px;float:left;">
    <div id="cal_left" ></div>
    <div id="cal_right"></div>
    <div style="clear:both"></div>
</div>
<!-- 上面是插件主要框架体-->

<!-- 入住办理 -->
<div id="handle1" class="easyui-dialog" data-options="closed:true">
    <div style="font-size: 14px;width:100%;margin:20px 0 0 0;text-align:center">
        <input id="quickCheckIn" onchange="clickClear()" list="checkInList" clear="clear" style="width:400px;height:35px;border-radius:5px"
               clear="clear" placeholder="  请输入   保留/预定房间号   预定手机号码" />
    </div>
    <div style="font-size: 14px;text-align:center;width:100%;margin:20px 0 0 0;">
        <div>
            <select id="fastCheckInHomeType" onchange="checkInRoomNum()"style="height:35px;border-radius:5px" clear="clear">
            </select>
            <input id="quickCheckIn1" list="checkInList1" clear="clear" style="margin:0 0 0 5px;width:290px;height:35px;border-radius:5px" placeholder="  无保留/预约订单  请选择房间类型" />
        </div>
    </div>

    <div id="checkInRoomNum" style="margin:0 0 0 0;text-align:center;width:100%;font-size:14px;margin-top:10px;"></div>

    <div style="font-size: 14px;text-align:center;width:100%;margin:40px 0 0 0">
        <button id="keyButtonId" type="button" onclick="checkInKey()" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;">快速入住</button>
    </div>

</div>
<!-- 入住办理结束 -->
<!-- 退房办理 -->
<div id="handle2" class="easyui-dialog" data-options="closed:true">
    <div style="float:left;margin:95px 0 0 42px;color:black;font-size: 14px;">
        <input id="quickCheckOut" list="eventList" clear="clear" style="width:400px;height:35px;border-radius:5px" placeholder="  请输入   房间号 / 手机号码" />
        <button type="button" onclick="eventKey()" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;">退房办理</button>
        <!-- <button type="button" class="bth" style="text-align:center;width:100px;height:25px;color: #fff;background-color: #5cb85c;border-color: #4cae4c;border-radius:5px;" onclick="checkInKey()">快速入住</button> -->
    </div>
</div>
<!-- 退房办理结束 -->

<!-- 保留办理 -->
<div id="handle3" class="easyui-dialog" data-options="closed:true">
    <div style="float:left;margin:0 0 0 42px;color:black;font-size: 14px;">
        <!-- 第一列 -->
        <div class="personnel" style="float:left">
            <div style="float:left;margin:20px 0 0 5px">
                客人姓名：<input class="personnelName" style="width:100px;" clear="clear" require="require"/>
            </div>
            <div style="float:left;margin:20px 0 0 35px">
                手机号：<input class="personnelPhone"  type="number" style="width:100px;" clear="clear" require="require"/>
            </div>
            <div style="float:left;margin:20px 0 0 35px">
                身份证：<input class="personnelIdcard"  style="width:120px;" clear="clear" require="require"/>
            </div>
        </div>
        <!-- 第二列 -->
        <div class="tRoom" style="float:left">
            <div style="float:left;margin:15px 0 0 5px">
                预约时间：<input id="tRoomSatTime"  style="width:100px;" clear="clear" readonly="readonly"
                            onfocus="WdatePicker({minDate:'%y-%M-{%d+1}',maxDate:'#F{$dp.$D(\'tRoomEndTime\',{d:-1});}',dateFmt:'yyyy-MM-dd ' + setUp.jsrsuCheckInTime+':00',autoPickDate:true,})">
            </div>
            <div style="float:left;margin:15px 0 0 23px">
                退房时间：<input id="tRoomEndTime"  style="width:100px;" clear="clear" readonly="readonly"
                            onfocus="WdatePicker({minDate:'#F{$dp.$D(\'tRoomSatTime\',{d:1});}',dateFmt:'yyyy-MM-dd '+setUp.jsrsuCheckOutTime+':00',autoPickDate:true,})">
            </div>
            <div style="float:left;margin:15px 0 0 23px">
                客房类型：<select id="tRoomType" onchange="checkInRoom()" style="width:120px;" clear="clear">
            </select>
            </div>
        </div>
        <!-- 第三列 -->
        <div style="float:left;margin:15px 0 0 29px">
            备注：<input class="Remarkstwo"  style="width:486px;" clear="clear" require="require"/>
        </div>
        <!-- 第四列 -->
        <div class="numSet" style="float:left">
            <div style="float:left;margin:15px 0 0 29px">
                <input type="hidden" id="numSetBerInput">
                套数：<input id="numSetBer" type="number"  style="width:120px;" clear="clear" require="require" onchange="numSetBer()"/>
            </div>
            <div id="retainRoomNum" style="margin:15px 0 0 10px;float:right;width:200px;font-size:14px;">
                <!-- 空房数量：5 -->
            </div>
        </div>
        <!-- 保留办理按钮 -->
        <div style="float:left;font-size: 14px;text-align:center;width:100%;margin:0 0 0 0">
            <button type="button" onclick="retainHandle()" class="btn btn-success" style="margin:35px 0 0 0;width:140px;">保留办理</button>
        </div>
    </div>
</div>
<!-- 保留办理结束 -->

<div id="checkOutDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div style="padding:3px;width:86px;height:98%;float:left;"><!-- background-color: #E0ECFF; -->
        <center id="checkOutDlgButton" style="margin:5px 0 0 2px;float:left;width:80px;height:98%;background-color: white;">
            <div style="margin:10px 0 0 0px;">
                <a id="clearA"  style="display:none;" class="easyui-linkbutton buttonState" plain="true"
                   onclick="cancel(0)"><img style="height:40px;width:40px" src="img/cancel.png" /><br>取消保留</a>
            </div>
            <div style="margin:20px 0 0 0px;">
                <a id="orderTaking"  class="easyui-linkbutton buttonState" plain="true" style="display:none;"
                   onclick="openOrderTaking()"><img style="height:40px;width:40px" src="img/orderTaking.png" /><br>接单</a>
            </div>
            <div style="margin:10px 0 0 0px;">
                <a id="cancelA"  style="display:none;" class="easyui-linkbutton buttonState" plain="true"
                   onclick="cancel(1)"><img style="height:40px;width:40px" src="img/tuifangbanli.png" /><br>退定</a>
            </div>
            <div style="margin:20px 0 0 0px;">
                <a id="checkOut" style="display:none;" class="easyui-linkbutton buttonState" plain="true"
                   onclick="checkOut()"><img style="height:40px;width:40px" src="img/tuifangbanli.png" /><br>办理退房</a>
            </div>
            <div style="margin:20px 0 0 0px;" class="renewA">
                <a id="renewA"  style="display:none;" class="easyui-linkbutton buttonState" plain="true"
                   onclick="openRenew()"><img style="height:40px;width:40px" src="img/continued.png" /><br>续住</a>
            </div>
            <div style="margin:20px 0 0 0px;">
                <a id="changeHouse"  style="display:none;" class="easyui-linkbutton buttonState" plain="true"
                   onclick="openChangeHouse(1)"><img style="height:40px;width:40px" src="img/change.png" /><br>换房</a>
            </div>
            <div style="margin:20px 0 0 0px;">
                <a id="checkInA"  style="display:none;" class="easyui-linkbutton buttonState" plain="true"
                   onclick="openCheckIn()"><img style="height:40px;width:40px" src="img/checkin.png" /><br>入住办理</a>
            </div>
            <div style="margin:20px 0 0 0px;">
                <a id="unsubscribe"  class="easyui-linkbutton buttonState" plain="true" style="display:none;"
                   onclick="openUnsubscribe()"><img style="height:40px;width:40px" src="img/tuiding.png" /><br>退定审批</a>
            </div>
            <div style="margin:20px 0 0 0px;">
                <a id="followUp"  class="easyui-linkbutton buttonState" plain="true"
                   onclick="openFollowUp()"><img style="height:40px;width:40px" src="img/followUp.png" /><br>写跟进</a>
            </div>
            <div style="margin:20px 0 0 0px;">
                <a id="oorCard"  class="easyui-linkbutton buttonState" plain="true"
                   onclick="doorCardManagement()"><img style="height:40px;width:40px" src="img/doorCard.png" /><br>授权管理</a>
            </div>
            <div style="margin:20px 0 0 0px;">
                <a id="purchaseHistory"  class="easyui-linkbutton buttonState" plain="true" style="display:none;"
                   onclick="openPurchaseHistory()"><img style="height:40px;width:40px" src="img/purchaseHistory.png" /><br>消费记录</a>
            </div>
        </center>
    </div>

    <div style="background-color: #E0ECFF; height:100%;width:5px;float:left"></div>

    <div style="float:left">
        <!-- <fieldset>
            <legend>客户信息</legend> -->
        <div id="customerInfo" style="margin:10px 0 0 10px;float:left">
            <input id="jsrcHsId" type="hidden" clear="clear"/>
            <input id="jsrcArrears" type="hidden" clear="clear"/>
            <input id="jsrcId" type="hidden" clear="clear"/>
            <input id="jsrcState" type="hidden" clear="clear"/>
            <input id="jsrcRenterId" type="hidden" clear="clear"/>
            <input id="jsrcFollow" type="hidden" clear="clear"/>
            <input id="popName" type="hidden" clear="clear"/>
            <input id="jsrcAdditionalDescription" type="hidden" clear="clear"/>
            <input id="jsrcAdditionalCost" type="hidden" clear="clear"/>
            <input class="hsRoomType" type="hidden" clear="clear"/>
            <input id="jsrcOrderNum" type="hidden" clear="clear"/>
            <input id="jsrcFirstPay" type="hidden" clear="clear"/>
            <input id="jsrcTotalPrice" type="hidden" clear="clear"/>
            <input id="jsrcDepositPayType" type="hidden" clear="clear"/>
            <input id="jsrcSaleNo" type="hidden" clear="clear"/>
            <input id="popId" type="hidden" clear="clear"/>
            <input id="jppPlanPackage" type="hidden" clear="clear"/>
            <div style="margin:5px 5px 0 0;float:left">
                客户姓名：<input id="popCustomerName" readonly="readonly" style="width:100px" clear="clear">
            </div>
            <div style="margin:5px 5px 0 11px;float:left;">
                手机号：<input id="popTelephone" readonly="readonly" style="width:100px" clear="clear">
            </div>
            <div style="margin:5px 0 0 24px;float: left;">
                备注：<input id="popNameRemarks" readonly="readonly" style="width:100px" clear="clear">
            </div>
            <div style="clear:both;"></div>
            <div style="margin:10px 4px 0 0;float:left;">
                证件号码：<input id="popIdCard" readonly="readonly" style="width:100px" clear="clear">
            </div>
            <div style='margin:10px 0 0 0;float: left;'>
                证件类型：<input id="popIdcardType"  style="" choose="choose">

            </div>
            <div style='margin:10px 0 0 29px;float: left;'>
                生日：<input id="popBirth" style="width:100px;" readonly="readonly"  clear="clear">
            </div>
            <div style="clear:both;"></div>
            <div style='margin:10px 0 0 0;float: left;'>
                户籍地址：<input id="popIdcardAddress" readonly="readonly" style="width:264px" clear="clear">
            </div>
            <div style='margin:10px 0 0 29px;float: left;'>
                民族：<input id="popNation" readonly="readonly" style="width:100px" clear="clear">
            </div>
            <div style="clear:both;"></div>
            <div style='margin:10px 0 0 0;float: left;'>
                入住次数：<input id="checkInNum1" readonly="readonly" style="width:100px" clear="clear">
            </div>
            <%--<div id="cusType" style="margin:6px 0 0 5px;float: left;">
                <div style="margin:5px 0 0 0;float: left;" >渠道类型：</div>
                <div style="margin:5px 0 0 5px;float: left;">
                    <input type="radio" readonly="readonly" name="customerType"  data-type="门店" class="userType" value="门店">门店</input>
                </div>
                <div style="margin:5px 0 0 5px;float: left;">
                    <input type="radio" readonly="readonly" name="customerType"  data-type="会员" class="userType" value="会员">会员</input>
                </div>
                <div style="margin:5px 0 0 5px;float: left;">
                    <input type="radio" readonly="readonly" name="customerType"  data-type="协议单位" class="userType" value="协议单位">协议单位</input>
                </div>
            </div>
            <div style='margin:10px 0 0 11px;float:left;'>
                群体分类：<input id="popGroupType" readonly="readonly" clear="clear" require="require">
                </select>
            </div>
             <div style="clear:both;"></div>
            <div style='margin:10px 0 0 0;float:left;'>
                价格方案：<input id="popPricePlan" style="width:264px;text-align:center;" clear="clear" readonly="readonly">
            </div>
            <div style='margin:10px 0 0 5px;float:left;'>
                允许挂账：<input id="popAllowCredit" style="width:100px" clear="clear" readonly="readonly" />
            </div>
            <div style="clear:both;"></div>
            <div id="popMaxCreditDiv" style='margin:10px 0 0 0;float:left;'>
                挂账额度：<input id="popMaxCredit" readonly="readonly" clear="clear">
            </div>
            <div class="popMemberLevelDiv" style='margin:10px 0 0 5px;float:left;'>
                会员级别：<input id="popMemberLevel" style="text-align: center;" readonly="readonly" clear="clear">
            </div>--%>
        </div>
        <div style="margin:15px 0 0 5px;float: left;">
            <img width="108px" height="126px" src="images/userImage.png;" style="margin-left:5px" id="id_img_pers" clear="clear">
        </div><!-- images/userImage.png -->
        <!-- </fieldset> -->

        <div style="clear:both;"></div>
        <div style="float:left">
            <!-- <fieldset>
                <legend>合约信息</legend> -->
            <div style="margin:25px 0 0 10px;float:left;">
                <div style="clear:both"></div>
                <div style="float: left;margin:0 5px 5px 0">
                    预订时间：<input readonly="readonly"  id="jsrcBeginTime"  style="width:100px;" clear="clear"/>
                </div>
                <div style="float: left;margin:0 15px 5px 0">
                    退房时间：<input readonly="readonly"  id="jsrcEndTime"  style="width:100px;" clear="clear"/>
                </div>
                <div style="float: left;margin:0 0 5px 0">
                    总天数：<input readonly="readonly"  id="jsrcTotalDays"  style="width:100px;" clear="clear"/>
                </div>

                <div style="clear:both"></div>

                <div style="float: left;margin:5px 5px 0 0">
                    日均价格：<input readonly="readonly"  id="jsrcDailyPrice"  style="width:100px;" clear="clear"/>
                </div>
                <div style="float: left;margin:5px 3px 0 0">
                    客房押金：<input readonly="readonly" id="jsrcDeposit"  style="width:100px;" clear="clear"/>
                </div>
                <div style="float: left;margin:5px 0 0 0">
                    订单来源：<input  style="width:100px;" id="jsrcOrderSource"clear="clear"/>
                </div>
                <div style="clear:both"></div>
                <div style="float: left;margin:10px 5px 0 0">
                    付款方式：<input readonly="readonly" id="jsrcPaymentMethod" style="width:100px;" clear="clear"/>
                </div>
                <div style="float: left;margin:10px 3px 0 0">
                    入住时间：<input readonly="readonly" id="jsrcActualOccupancyTime" style="width:100px;" clear="clear"/>
                </div>
                <div style="float: left;margin:10px 0 0 0">
                    退房时间：<input readonly="readonly" id="jsrcActualDepartureTime" style="width:100px;" clear="clear"/>
                </div>
                <div style="clear:both"></div>
                <div style="float: left;margin:10px 4px 0 12px">
                    总房价：<input readonly="readonly" id="jsrcAmountPayable"  style="width:100px;" clear="clear"/>
                </div>
                <div style="float: left;margin:10px 4px 0 0">
                    总共金额：<input readonly="readonly" id="totalPrice1" style="width:100px;" clear="clear"/>
                </div>
                <div style="float: left;margin:10px 0 0 0">
                    折后金额：<input readonly="readonly" id="amountOfDiscount" style="width:100px;" clear="clear"/>
                </div>
                <div style="clear:both"></div>
                <div style="margin:10px 4px 0 0px;float:left;">
                    入住类型：<input readonly="readonly" id="jsrcTypeOccupancy" style="width:100px;" clear="clear"/>
                </div>

                <div style="float: left;margin:10px 0 0 0px">
                    订单备注：<input readonly="readonly" id="jsrcRemarks" style="width:264px;" clear="clear"/>
                </div>
            </div>
            <!-- </fieldset> -->
        </div>
        <div style="clear:both"></div>
        <div style="margin:50px 10px 0 10px;">
            <table id="followDg" style="width:100%;height:177px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
                <thead>
                <tr>
                    <th field="registrantName" width="10" align="center">操作人</th>
                    <th field="type" width="15" align="center">类型</th>
                    <th field="time" width="20" align="center">时间</th>
                    <th field="text" width="55" align="center">操作</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>

    <div style="background-color: #E0ECFF; height:100%;width:5px;float:left;margin:0 0 0 6px;"></div>
    <div style="float:left;width:300px">
        <div style="clear:both"></div>
        <div style="margin:0 0 0 7px;">
            <table id="customerInformation" style="width:100%;height:177px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
                <thead>
                <tr>
                    <th field="popName" width="10" align="center" clear="clear">同住人姓名</th>
                    <th field="popIdcard" width="15" align="center" clear="clear">证件号码</th>
                </tr>
                </thead>
            </table>
        </div>

        <div style="background-color: #E0ECFF; height:5px;width:100%;float:left;margin:10px 0 0 0;"></div>

        <div style="margin:10px 0 0 18px;float:left;" id="deviceDiv ">
            <center id="checkOutDlgButton1" style="margin:5px 0 0 2px;float:left;background-color: white;">

                <div style="margin:0 0 0 0;float:left;" id="airconditionDiv" title="该房尚未绑定相关设备">
                    <a id="aircondition" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/ic_dt_aircondition_icon_gray.png"/></a>
                </div>
                <div style="margin:0 0 0 10px;float:left;" id="doorLockDiv" title="该房尚未绑定相关设备">
                    <a id="doorLock" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/doorLock_gray.png" /></a>
                </div>
                <div style="margin:0 0 0 10px;float:left;"id="doorCardDiv" title="该房尚未绑定相关设备">
                    <a id="doorCardState" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/baka.png" /></a>
                </div>
                <div style="margin:10px 0 0 0;float:left;"id="curtainDiv" title="该房尚未绑定相关设备">
                    <a id="curtain" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/ic_dt_curtain_icon_gray.png" /></a>
                </div>
                <div style="margin:10px 0 0 10px;float:left;" id="sosDiv" title="该房尚未绑定相关设备">
                    <a id="sos" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/ic_dt_safe_sos_icon_gray.png" /></a>
                </div>
                <div style="margin:10px 0 0 10px;float:left;"id="safeDoorbellDiv" title="该房尚未绑定相关设备">
                    <a id="safeDoorbell" class="easyui-linkbutton" plain="true" ><img style="height:70px;width:70px" src="img/ic_dt_safe_doorbell_icon_gray.png" /></a>
                </div>
            </center>
        </div>
        <div style="background-color: #E0ECFF; height:5px;width:100%;float:left;"></div>
        <div style="font-size:32px;text-align:center">客户提醒服务</div>
        <div style="clear:both"></div>
        <div style="margin:0 0 0 7px;">
            <table id="remind" style="width:100%;height:177px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
                <thead>
                <tr>
                    <th field="remindTime" width="15" align="center">提醒时间</th>
                    <th field="remindContent" width="25" align="center">提醒内容</th>
                    <th field="state" width="10" align="center">状态</th>

                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<div id="changeHouseDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
    <div style="float:left;margin:10px 0 0 12px">
        现住客房：<input readonly="readonly"  id="nowHouse" style="width:150px;text-align:center"/>
    </div>
    <div style="float:left;margin:10px 0 0 12px">
        换房原因：<input  id="Reason" style="width:150px;text-align:center" clear="clear"/>
    </div>
    <div style="clear:both"></div>

    <div style="float:left;margin:10px 0 0 12px">
        可选房型：<select id="choiceHouseType" style="width:150px;text-align:center" onchange="choiceHouseType()">
    </select>
    </div>
    <div style="float:left;margin:10px 0 0 12px">
        可换客房：<select id="canChangeHouseList"  style="width:150px;text-align:center" onchange="changeHouseMoney()" >
    </select>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 12px">
        补房差价：<input  id="changeHouseMoney" onblur="checkChangeHouseMoney()" type="number" value="0" style="width:150px;text-align:center" clear="clear"/>
    </div>
    <div style="clear:both"></div>
    <center class="hiddenClass" id="repayMoneyChangeHouseOpenClean" style="margin:25px 0 0 0;display:none;">
        <a  class="easyui-linkbutton" iconcls="icon-save" onclick="openClean(0,0)">确认</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#changeHouseDlg').dialog('close')">关闭</a>
    </center>
    <center class="hiddenClass" id="repayMoneyChangeHouse" style="margin:25px 0 0 0;display:none;">
        <a  class="easyui-linkbutton" iconcls="icon-save" onclick="doChangeHouse(0)">确认</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#changeHouseDlg').dialog('close')">关闭</a>
    </center>

    <div class="hiddenClass" id="changHouseOpenClean" style="display:none;text-align:center">
        <button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:20px 0 5px 30px;width:120px;" onclick="openCash(1,6,1)">现金收银</button>
        <button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:20px 0 5px 20px;width:120px;" onclick="openCash(2,6,1)">扫码收银</button>
        <button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:20px 0 5px 20px;width:120px;" onclick="openCash(3,6,1)">台卡收银</button>
    </div>
    <div class="hiddenClass" id="directChangeHouse" style="display:none;text-align:center">
        <button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:20px 0 5px 30px;width:120px;" onclick="openCash(1,7,1)">现金收银</button>
        <button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:20px 0 5px 20px;width:120px;" onclick="openCash(2,7,1)">扫码收银</button>
        <button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:20px 0 5px 20px;width:120px;" onclick="openCash(3,7,1)">台卡收银</button>
    </div>
</div>

<div id="followDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
    <div style="float:left;margin:10px 0 0 12px">
        操作类型：<input class="Wdate" id="type" readonly="readonly" style="width:200px;text-align:center" >
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 25px">
        操作人：<input readonly="readonly"  id="registrantName" readonly="readonly"  style="width:200px;text-align:center"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 12px">
        操作时间：<input   id="time" readonly="readonly"  style="width:200px;text-align:center"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 12px">
        操作记录：<textarea id="text" style="height:90px;width:200px" readonly="readonly"></textarea>
    </div>
    <div style="clear:both"></div>
    <center style="margin:25px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#followDlg').dialog('close')">关闭</a>
    </center>
</div>

<div id="addShortRentDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div id="clientDiv" style="float:left;">
        <div class="client" style="float:left">
            <div style="float:left;margin:5px 0 0 5px">
                客人姓名：<input class="clientName" style="width:100px;" clear="clear" require="require"/>
            </div>
            <div style="float:left;margin:5px 0 0 22px">
                手机号：<input class="clientPhone"  style="width:100px;" clear="clear" require="require"/>
            </div>
            <div style="float:left;margin:5px 0 0 22px">
                身份证：<input class="clientIdcard"  style="width:100px;" clear="clear" require="require"/>
            </div>
        </div>
    </div>
    <!-- 保留预定房间 -->
    <div style="clear:both"></div>

    <div style="float:left;margin:10px 0 0 5px">
        <div id="reservation" style="float:left;">
            预订时间：
        </div>
        <div style="float:left;">
            <input readonly="readonly" id="startDate2"  style="width:100px;" clear="clear" />
        </div>
    </div>
    <div style="float:left;margin:10px 0 0 10px">
        退房时间：<input readonly="readonly"  id="endDate2"  style="width:100px;" clear="clear" />
    </div>
    <div style="float:left;margin:10px 0 0 22px">
        总天数：<input readonly="readonly"  id="totalDay2"  style="width:100px;" clear="clear"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 5px">
        日均价格：<input id="dayPrice2"  style="width:100px;" clear="clear"/>
    </div>
    <div style="float:left;margin:10px 0 0 10px">
        应付金额：<input readonly="readonly" id="amountPayable2"  style="width:100px;" clear="clear"/>
    </div>
    <div style="float:left;margin:10px 0 0 10px">
        实付金额：<input readonly="readonly" id="totalPrice2"  style="width:100px;" clear="clear"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 29px">
        备注：<input id="remarks"  style="width:269px;" clear="clear"/>
    </div>
    <div style="clear:both"></div>
    <div id="fontTitle" style="text-align:center"></div>
    <center style="margin:25px 0 0 0;">
        <a id="doAddEventBtn" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddShortRent()">确定</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addShortRentDlg').dialog('close')">取消</a>
    </center>
</div>

<div id="cleanDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
    保洁人员：<input id="searchCleanManagerShowUserInfo" class="choose_user_button" doFlag="searchCleanManager" doFun=""
                style="width:120px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
    <input id="searchCleanManagerGetUserStoreId" type="hidden" clear="clear">
    <input id="searchCleanManagerGetUserDetId" type="hidden" clear="clear">
    <input id="searchCleanManagerGetUserId" type="hidden" clear="clear">
    <div id="searchCleanManagerShowUserInfoDiv" style="display:none;" clear="clear"></div>
    <div style="clear:both"></div>
    <!--  <div id="hopeTime" style="margin:10px 0 0 0;margin-left:-1px;">
         期望时间：<select class="repair_hope_select" style="width:120px;" onChange="hopeTimeVal()" choose="choose">
                    <option></option>
                </select>
         <input id="repair_hope_time" style="margin-left:-124px;width:100px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;" clear="clear" require="require">
     </div> -->
    <div id="hopeTime" style="margin:10px 0 0 0;">
        期望时间：<input id="cleanRepHopeTime" style="width:120px" clear="clear" require="require"
                    onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchHouseEnd\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,})">
    </div>
    <center style="margin:25px 0 0 0;">
        <a id="doChangeHouse" class="easyui-linkbutton" iconcls="icon-save" onclick="doChangeHouse(1)">确认</a>
        <a id="doSetDirtyRoom" class="easyui-linkbutton" iconcls="icon-save" onclick="batchAddition(1)" style="display: none">确认</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#cleanDlg').dialog('close')">取消</a>
    </center>
</div>

<div id="checkOutDiv" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
    <!-- <div style="border:dashed 1px #95b8e7;width: 100%;height:100px;"> -->
    <div style="width:200px;padding:10px 10px 10px 0;">
        保洁人员：<input id="searchgerShowUserInfo" class="choose_user_button" doFlag="searchger" doFun=""
                    style="width:120px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
        <input id="searchgerGetUserStoreId" type="hidden" clear="clear">
        <input id="searchgerGetUserDetId" type="hidden" clear="clear">
        <input id="searchgerGetUserId" type="hidden" clear="clear">
        <div id="searchgerShowUserInfoDiv" style="display:none;" clear="clear"></div>
    </div>
    <!-- </div> -->
    <div style="clear:both"></div>

    <div style="border:dashed 1px #95b8e7;width: 100%;height:70px;margin-top:20px;">
        <input id="oldRefundedMoney" type="hidden" clear="clear" />
        <input id="doMoveOutType" type="hidden" clear="clear" />
        <div id="additionalDescriptionDiv" style="float:left;margin:10px 0 0 8px">
            附加消费： <select id="additionalDescription" style="width:100px;"onclick="openService()">
        </select>
        </div>
        <div id="additionalCostDiv"  style="float:left;margin:10px 0 0 8px">
            附加单价：<input id="additionalCost"style="width:100px;" clear="clear" readonly="readonly"/>
        </div>

        <div style="float:left;margin:8px 0 0 20px">
            <a class="easyui-linkbutton" iconcls="icon-add" onclick="addService1()">添加</a>
        </div>

        <div style="clear:both"></div>

        <div id="amountOfArrearsDiv"  style="float:left;margin:5px 0 0 11px;color:#f40707;">
            欠费金额：<input id="amountOfArrears" onkeyup="computeCheckOutFee()" type="number" style="width:100px; color:#f40707;" clear="clear"/>
        </div>
        <div id="additionalSumDiv"  style="float:left;margin:5px 0 0 8px">
            附加金额：<input id="additionalSum" style="width:100px;" value="0" readonly="readonly" clear="clear"/>
        </div>
        <div id="totalSumDiv"  style="float:left;margin:5px 0 0 20px">
            消费金额：<input id="totaSum"style=" width:100px;" clear="clear" readonly="readonly"/>
        </div>
    </div>
    <div style="clear:both"></div>
    <div style="border:dashed 1px #95b8e7;width: 100%;height:40px;margin-top:20px;">
        <div id="checkOutDepositDiv" style="float:left;margin:10px 0 0 8px">
            客房押金： <input id="checkOutDeposit" style="width:100px;" clear="clear" readonly="readonly">
        </div>
        <div id="refundedRentMoneyDiv" style="float:left;margin:10px 0 0 8px">
            应退房费： <input id="refundedRentMoney" style="width:100px;" clear="clear" readonly="readonly">
        </div>
        <div id="refundedMoneyDiv"  style="float:left;margin:10px 0 0 8px">
            应退金额：<input id="refundedMoney"style="width:100px;" clear="clear" readonly="readonly"/>
        </div>
    </div>
    <div style="clear:both"></div>
    <div style="margin-top:20px;">
        <table style="margin:30px 0 0 20px"  id="serviceCharge1"></table>
    </div>
    <!-- <div style="text-align:center;margin:20px 0 0 0;">
        <a id="doCheckoutShortRent" class="easyui-linkbutton" iconCls="icon-save" onclick="openCheckOutBill()">确定</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#checkOutBill').dialog('close')">取消</a>
    </div> -->
    <center id="refundType0" style="display:none;text-align:center;margin:10px 0 0 0;" class="hiddenButton">
        <button id="normalCheckout0" class="btn btn-success hiddenButton" type="button" style="display:none" onclick="checkOutShortRent(0,5,1)">现金退款</button>
        <button id="normalCheckout1" class="btn btn-success hiddenButton" type="button" style="display:none" onclick="checkOutShortRent(0,4,1)">原路返还</button>
    </center>
    <center id="refundType1" style="text-align:center;display:none;margin:10px 0 0 0" class="hiddenButton">
        <button id="advanceCheckoutType0" class="btn btn-success hiddenButton" type="button" style="display:none" onclick="checkOutShortRent(1,5,1)">现金退款</button>
        <button id="advanceCheckoutType1" class="btn btn-success hiddenButton" type="button" style="display:none" onclick="checkOutShortRent(1,4,1)">原路返还</button>
    </center>
    <div id="doMoveOut0" style="dispaly:none;text-align:center" class="hiddenButton">
        <button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:10px 0 5px 75px;width:120px;" onclick="openCash(1,3,1)">现金收银</button>
        <button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCash(2,3,1)">扫码收银</button>
        <button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCash(3,3,1)">台卡收银</button>
    </div>
    <div id="doMoveOut1" style="dispaly:none;text-align:center" class="hiddenButton">
        <button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:10px 0 5px 75px;width:120px;" onclick="openCash(1,4,1)">现金收银</button>
        <button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCash(2,4,1)">扫码收银</button>
        <button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCash(3,4,1)">台卡收银</button>
    </div>
</div>


<div id="renewDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
    <div style="float:left;margin:10px 0 0 10px">
        退房时间 ： <input readonly="readonly"  id="oldEndTime"  style="width:120px;"/>
    </div>
    <div style="float:left;margin:10px 0 0 10px">
        新退房时间 ： <input class="Wdate" id="newEndTime" style="width:120px" clear="clear" require="require" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'jsrcEndTime\',{d:1});}',dateFmt:'yyyy-MM-dd ' + setUp.jsrsuCheckOutTime+':00',autoPickDate:true,dchanging:changeEndTime()})">
    </div>
    <div style="clear:both"></div>
    <div id="description"></div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 10px">
        总共天数 ： <input readonly="readonly"  id="newTotalDay"  style="width:120px;"/>
    </div>
    <div style="float:left;margin:10px 0 0 22px">
        日均价格 ： <input onblur="changPrice()"  id="jsrcDailyPrice1" style="width:120px;"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 10px">
        客房费用 ： <input readonly="readonly" id="sunMoney"  style="width:120px;"/>
    </div>
    <div style="float:left;margin:10px 0 0 22px">
        应付金额 ： <input readonly="readonly" id="payableMoney"  style="width:120px;"/>
    </div>
    <div style="clear:both"></div>
    <!-- <center style="margin:25px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doRenew()">确认</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#renewDlg').dialog('close')">取消</a>
    </center> -->
    <div id="doRenew" style="dispaly:flex;text-align:center">
        <button type="button" class="openCashBtn1 btn btn-success" style="margin:20px 10px 0 0px;width:120px;" onclick="openCash(1,5,1)">现金收银</button>
        <button type="button" class="openCashBtn2 btn btn-success" style="margin:20px 10px 0 0px;width:120px;" onclick="openCash(2,5,1)">扫码收银</button>
        <button type="button" class="openCashBtn3 btn btn-success" style="margin:20px 10px 0 0px;width:120px;" onclick="openCash(3,5,1)">台卡收银</button>
    </div>
</div>


<!-- 写跟进 -->
<div id="followUpDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">

    <div style="float:left;margin:5px 0 0 35px">
        类型：<select id="followUpType" onclick="followUpType()">
        <option>手动跟进</option>
        <option>客服提醒</option>
    </select>
    </div>
    <div style="clear:both"></div>

    <div style="float:left;margin:5px 0 0 0" id="RecordDiv">
        <div style='margin:5px 0 0 35px;float: left;'>操作：</div>
        <textarea id="Record" style="width:250px;height:60px"></textarea>
    </div>
    <div style="float:left;margin:5px 0 0 11px" id="reminderTimeDiv">
        提醒时间：<input id="reminderTime" type="text" class="Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
    </div>
    <div style="float:left;margin:5px 0 0 11px" id="reminderContentDiv">
        <div style='margin:5px 0 0 0;float: left;'>提醒内容：</div>
        <textarea id="reminderContent" style="width:250px;height:60px"></textarea>
    </div>

    <div style="clear:both"></div>
    <center style="margin:25px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="operation()">确认</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#followUpDlg').dialog('close')">取消</a>
    </center>
</div>

<!-- 旧的跟进记录数据 -->
<input id="oldreminder" type="hidden"  readonly="readonly" style="width:200px;text-align:center"/>
<div id="customerService" style="padding:6px;text-align:center;"  class="easyui-dialog" data-options="closed:true">
    <div style="float:left;margin:10px 0 0 35px">
        类型：<input id="typetwo" clano="clano" readonly="readonly" style="width:200px;text-align:center"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 25px">
        操作人：<input id="operator" clano="clano" readonly="readonly" style="width:200px;text-align:center"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 35px">
        状态：<input id="state" clano="clano" readonly="readonly"  style="width:200px;text-align:center" />
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 12px">
        提醒时间：<input  id="remindTime" clano="clano" readonly="readonly"  style="width:200px;text-align:center"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 12px">
        提醒内容：<textarea id="remindContent" clano="clano" readonly="readonly" style="height:90px;width:200px"></textarea>
    </div>

    <div style="clear:both"></div>
    <center style="margin:25px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-edit" id="functionHeid" onclick="reminderFunction()">提醒</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#customerService').dialog('close')">关闭</a>
    </center>
</div>

<!--折扣申请窗口-->
<div id="discountApplicationDlg" class="easyui-dialog" data-options="closed:true">
    <div style="margin:25px 0 0 10px;float: left">
        应付金额：<input  id="totalRoomPrice" readonly="readonly" style="width: 150px;height: 35px" clear="clear"/>
    </div>
    <div style="margin:25px 0 0 10px;float: left">
        折扣比例：<input  id="discount" placeholder="请输入1-10之间的折扣率"style="width: 260px;height: 35px" onblur="getDiscountPrice()" clear="clear"/>
    </div>
    <div style="margin:25px 0 0 10px;float: left">
        折后金额：<input  id="discountPrice" readonly="readonly" style="width: 150px;height: 35px" clear="clear"/>
    </div>
    <div style="clear: both"></div>
    <div style="margin:50px 0 0 22px;float: left">
        授权人：<select id='application' style="width: 150px;height: 35px;">
    </select>
    </div>
    <div style="margin:50px 0 0 10px;float: left">
        授权方式：<select id='authType' style="width: 260px;height: 35px" onchange="authApplication()">
    </select>
    </div>

    <div style="margin:50px 0 0 10px;float: left" id="authPsdBox">
        <input  type="password" style="width:0px;hight:0px;border:none;display: none">
        授权密码：<input  id="authPaword" type="password" style="width: 150px;;height: 35px" clear="clear"/>
    </div>

    <div style="margin:50px 0 0 10px;display: none;float: left" id="remarkBox">
        折扣原因：<input style="width: 150px;height: 35px" id="remark" clear="clear" >
    </div>
    <div style="clear: both"></div>


    <div style="text-align: center;margin:100px 0 0 0px">
        <button  type="button" style="width: 150px;height: 40px" class="btn btn-success" onclick="authSubmit()" >确认</button>
    </div>

</div>

<datalist id="listPopCustomer">
</datalist>

<!-- 办理入住详情窗口 -->
<div id="checkInDlg1" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true,buttons:'#bottomButton'">
    <div id="bottomButton">
        <a class="easyui-linkbutton" onclick="authorizationManagement()" iconcls="icon-save">授权管理</a>
    </div>
    <input id="jsrcHsIdtwo" type="hidden" />
    <input id="retainEndTime" type="hidden" />
    <input class="hsRoomType" type="hidden" />
    <input id="hsAddCommunity" type="hidden"/>
    <ipput id="doorCardJson" type="hidden"/>
    <div style="float:left">
        <!-- 客人信息 -->
        <div id="renterInfo" style="float:left;margin:5px 0 0 10px">
            <div>
                <input class="clientSex" style="display: none;" clear="clear">
                <input class="clientPopIdcardJson" type="hidden" clear="clear">
            </div>
            <div style="margin:5px 10px 0 0;float:left">
                客户姓名：<input id="popCustomerNameTable" onchange="changeRenterInfo()" list="listPopCustomer" class="clientName" style="width:100px" clear="clear">
            </div>
            <div style="margin:5px 10px 0 11px;float:left;">
                手机号：<input id="popTelephoneTable" class="clientPhone" style="width:100px" clear="clear" type="number">
            </div>
            <div style="margin:5px 0 0 24px;float: left;">
                备注：<input id="popNameRemarkTable" id="popNameRemarkTable" class="clientNameRemarks" style="width:100px" clear="clear">
            </div>
            <div style="clear:both;"></div>
            <div style="margin:10px 9px 0 0;float:left;">
                证件号码：<input onblur="manualInput()" id="popIdcardTable" class="clientIdcard" style="width:100px" clear="clear">
            </div>
            <div style='margin:10px 0 0 0;float: left;'>
                证件类型：<select id="pop_idcard_type" style="" choose="choose" clear="clear">
                    <option value="身份证/临时身份证/户口本">身份证/临时身份证/户口本</option>
                    <option value="回乡证/护照">回乡证/护照</option>
                    <option value="其他">其他</option>
                </select>
            </div>
            <div style='margin:10px 0 0 34px;float: left;'>
                生日：<input id="popBirthTable" class="clientBirth" style="width:100px;" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
            </div>
            <div style="clear:both;"></div>
            <div style='margin:10px 0 0 0;float: left;'>
                户籍地址：<input id="popIdcardAddressTable" class="clientIdcardAddress" style="width:269px" clear="clear">
            </div>
            <div style='margin:10px 0 0 34px;float: left;'>
                民族：<input id="popNationTable" class="clientNation" style="width:100px" clear="clear">
            </div>
            <div style="clear:both;"></div>
            <div style='margin:10px 0 0 0;float: left;'>
                入住次数：<input id="checkInNum" clear="clear" readonly="readonly">
            </div>
            <a style="float:left;margin:10px 0 0 33px;display:none" class="clientCardReading">
                <button class="easyui-linkbutton" iconcls="icon-add" class="idCardRead">读取身份证</button>
            </a>
            <a id="addLiveMan" style="float:left;margin:10px 0 0 33px;display:none">
                <button class="easyui-linkbutton" iconcls="icon-add">添加同住人</button>
            </a>
        </div>
        <div style="margin:10px 5px 0 0;float: left;">
            <img width="108px" height="126px" src="images/userImage.png" style="margin-left:5px" id="popImg">
        </div>
        <!-- 客人合约 -->
        <div style="clear:both;"></div>
        <div style="float:left;margin:25px 0 20px 10px;position: relative">
            <input id="stoTimePrice" type="hidden" />
            <div style="float:left;">
                <div style="clear:both"></div>
                <div style="float: left;margin:0 10px 5px 0;display:none;">
                    入住时间：<input readonly="readonly" id="startDate"  style="width:100px;"  clear="clear"
                                onfocus="WdatePicker({minDate:'%y-%M-{%d-1}',maxDate:'#F{$dp.$D(\'endDate\',{d:-1});}',dateFmt:'yyyy-MM-dd ' + setUp.jsrsuCheckInTime +':00',autoPickDate:true,dchanging:timechData()})"/>
                </div>
                <div style="float: left;margin:0 10px 5px 0;" class="actualOccupancyTime">
                    入住时间：<input readonly="readonly"  id="actualOccupancyTime"  style="width:110px;"  clear="clear"/>
                </div>
                <div style="float: left;margin:0 10px 5px 0;display: none" id="hourOccupancyTimeBox">
                    入住时间：<input readonly="readonly"  id="hourOccupancyTime"  style="width:110px;"  clear="clear" value="2019-06-19"/>
                    <select id="hourStartSelect" onchange="changeHourEndTimes()" style="width: 36px;border:none; -moz-appearance:none;
  -webkit-appearance:none; appearance:none;position:absolute;right: 351px;top:0px" >
                    </select>
                </div>
                <div style="float: left;margin:0 22px 5px 0;" class="endDate">
                    退房时间：<input id="endDate"  style="width:110px;"  clear="clear"
                                onfocus="WdatePicker({minDate:'#F{$dp.$D(\'startDate\',{d:1});}',dateFmt:'yyyy-MM-dd ' + setUp.jsrsuCheckOutTime +':00',autoPickDate:true,dchanging:timechData()})"/>
                </div>
                <div style="float: left;margin:0 22px 5px 0;display: none" class="hourEndDate">
                    退房时间：<input id="hourEndDate"  style="width:110px;"  clear="clear"
                                value="2019-06-19"/>
                    <select id="hourEndSelect" style="width: 36px;border:none;position:absolute;right: 172px;top:0px; appearance:none; -moz-appearance:none;
  -webkit-appearance:none;text-align: center;" disabled >
                    </select>
                </div>
                <div style="float: left;margin:0 0 8px 0">
                    总天数：<input readonly="readonly"  id="totalDay"  style="width:100px;" clear="clear"/>
                </div>
                <div style="clear:both"></div>
                <div style="float: left;margin:5px 10px 0 0">
                    日均价格：<input readonly="readonly" id="dayPrice"  style="width:110px;" clear="clear"/>
                </div>
                <div style="float: left;margin:5px 10px 0 0">
                    客房押金：<input id="houseDeposit" style="width:110px;" clear="clear" readonly="readonly"/>
                </div>
                <div style='margin:5px 0 0 0;float: left;'>
                    订单来源：<select id="orderSource"  style="width:100px" choose="choose" clear="clear" >
                        <option value="上门客户">上门客户</option>
                        <option value="官微订单">官微订单</option>
                        <option value="携程网">携程网</option>
                        <option value="去哪儿">去哪儿</option>
                        <option value="住哪网">住哪网</option>
                        <option value="美团网">美团网</option>
                        <option value="飞猪网">飞猪网</option>
                        <option value="途牛网">途牛网</option>
                        <option value="驴妈妈">驴妈妈</option>
                        <option value="爱彼迎">爱彼迎</option>
                        <option value="途家网">途家网</option>
                        <option value="游天下">游天下</option>
                        <option value="全球名宿">全球名宿</option>
                        <option value="榛果民宿">榛果民宿</option>
                        <option value="小猪短租">小猪短租</option>
                        <option value="蚂蚁短租">蚂蚁短租</option>
                        <option value="木鸟短租">木鸟短租</option>
                    </select>
                </div>
                <div style="clear:both"></div>
                <div style="float: left;margin:10px 10px 0 12px">
                    总房价：<input readonly="readonly" id="totalHousingPrice"  style="width:110px;" clear="clear"/>
                </div>
                <div style="float: left;margin:10px 10px 0 0">
                    应付金额：<input readonly="readonly" id="amountPayable" style="width:110px;" clear="clear"/>
                </div>
                <div style="float: left;margin:10px 0 0 0">
                    折后金额：<input readonly="readonly" id="totalPrice" style="width:100px;" clear="clear"/>
                </div>
                <div style="clear:both"></div>
                <div style="float: left;margin:10px 10px 0 0">
                    已付金额：<input readonly="readonly" id="accountPaid" style="width:110px;" clear="clear"/>
                </div>
                <div style='margin:10px 0 0 0;float: left;'>
                    入住类型：<input style="width:110px;"id="typeOccupancy" value="普通客房" />
                </div>
                <div style="margin:2px 4px 0 0px;float:left;display: block" id="discountApplication">
                    <a style="float:left;margin:10px 0 0 33px;" class="discountApplication">
                        <button class="easyui-linkbutton" iconcls="icon-add"  onclick="discountApplication()">折扣申请</button>
                    </a>
                </div>
                <div style="margin:2px 4px 0 0px;float:left;display: none" id="cancleOrder">
                    <a style="float:left;margin:10px 0 0 33px;" class="discountApplication">
                        <button class="easyui-linkbutton" iconcls="icon-cancel" onclick="cancelTakingOrder()">取消挂单</button>
                    </a>
                </div>

                <div style="clear:both"></div>
                <div style="float: left;margin:10px 0 0 0">
                    订单备注：<input id="orderRemarks" style="width:461px;height:40px;" clear="clear" />
                </div>

            </div>
        </div>
        <div style="clear:both"></div>
        <div id="fontTitle1"></div>
    </div>
    <div style="background-color: #E0ECFF; height:100%;width:5px;float:left;"></div>
    <div style="float:left;width:320px">
        <div style="clear:both"></div>
        <div style="margin:0 0 0 7px;">
            <table id="customerInfoTable" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
                <thead>
                    <tr>
                        <th field="popName" width="10" align="center" clear="clear">同住人姓名</th>
                        <th field="popIdcard" width="15" align="center" clear="clear">证件号码</th>
                        <th field="popRemove" width="10" align="center" clear="clear" formatter="popRemove">删除</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div style="background-color: #E0ECFF; height:5px;width:100%;"></div>

        <div style="margin:20px 0 0 0;">
            <div id="moneyDiv" style="float:left;width:62%;">
                <div style="margin:0 0 0 7px;text-align: left;font-weight:bold;">实付金额：</div>
                <div id="moneyText" style="margin:28px 0 0 0;font-size:48px;text-align:center;letter-spacing:-1.5px;"></div>
            </div>
            <div id="checkIn" style="float:left;width:38%;display:none;text-align:center">
                <button type="button" class="openCashBtn1 btn btn-success" style="margin:60px 0 0 110px;width:120px;" onclick="doCheckIn(4,1)">办理入住</button>
            </div>
            <div id="sceneButton" style="float:left;width:38%;display:none;text-align:center">
                <button type="button" class="openCashBtn1 btn btn-success" style="margin:5px 0 5px 0px;width:120px;" onclick="openCash(1,1,1)">现金收银</button>
                <button type="button" class="openCashBtn2 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="openCash(2,1,1)">扫码收银</button>
                <button type="button" class="openCashBtn3 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="openCash(3,1,1)">台卡收银</button>
                <%--<button type="button" class="openCashBtn4 btn btn-success" style="margin:10px 0 5px 0px;width:120px;display:none" onclick="canCheckIn(5,1)">挂账入住</button>--%>
            </div>
            <!-- openCash -->
            <div id="retainButton" style="float:left;width:38%;display:none;text-align:center">
                <button type="button" class="openCashBtn1 btn btn-success" style="margin:5px 0 5px 0px;width:120px;" onclick="openCash(1,2,1)">现金收银</button>
                <button type="button" class="openCashBtn2 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="openCash(2,2,1)">扫码收银</button>
                <button type="button" class="openCashBtn3 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="openCash(3,2,1)">台卡收银</button>
                <%--<button type="button" class="openCashBtn4 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="doCheckIn(5,1)">挂账入住</button>--%>
            </div>
            <div id="creditButton" style="float:left;margin-left:62%;width:38%;text-align:center">

            </div>
        </div>
    </div>
</div>

<div id="delete" class="easyui-menu" style="width:100px;">
    <div style="width:100%"  onclick="doDelete()"><a id="deleteCustomer">删除客户信息</a></div>
</div>

<!-- 消费记录对话框 -->
<div id="purchaseHistoryDlg" class="easyui-dialog" data-options="closed:true">
    <div style="margin:10px 0 0 5px">
        总金额：<input readonly="readonly" id="totalMoney" style="width:100px;text-align:center"/>元
    </div>
    <div  style="margin:10px 0 0 0">
        <table id="purchaseHistoryTable" style="width:100%;height:250px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
            <thead>
                <tr>
                    <th field="popservice" width="10" align="center">服务类型</th>
                    <th field="popcharge" width="10" align="center">服务金额</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
<div id="addRepairDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style='margin:5px 0 0 12px;float: left;'>
        维保类型：<select class="repair_type_rp" style="width:100px;" clear="clear" require="require">
        <option></option>
    </select>
    </div>
    <div style='margin:5px 0 0 10px;float: left;'>
        费用归属：<select class="repair_responsibility" style="width:100px;" clear="clear" require="require">
        <option></option>
    </select>
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 24px;float: left;'>
        负责人：<input id="doRepairShowUserInfo" style="width:270px; cursor: pointer;" readonly="readonly"
                   class="choose_user_button" doFlag="doRepair" doFun="" value="" clear="clear" require="require">
        <input id="doRepairGetUserStoreId" type="hidden" clear="clear">
        <input id="doRepairGetUserDetId" type="hidden" clear="clear">
        <input id="doRepairGetUserId" type="hidden" clear="clear">
        <div id="doRepairShowUserInfoDiv" style="display:none;"></div>
    </div>
    <div style="clear:both"></div>
    <!-- <div style="margin:5px 0 0 12px;float:left;position:relative;">
        期望时间：<select class="repair_hope_select" style="width:270px;" onChange="hopeTimeVal()" choose="choose">
            <option></option>
        </select>
        <input id="repair_hope_time" style="margin-left:-273px; left:36px;width:250px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;" clear="clear" require="require">
    </div> -->
    <div style="margin:5px 0 0 12px;">
        期望时间：<input id="repairRepHopeTime" style="width:270px" clear="clear" require="require"
                    onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchHouseEnd\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,})">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 12px;float: left;'>维保描述：</div>
    <div style='margin:5px 0 0 0;float: left;'>
        <textarea class="repair_event_rp" style="width:270px;height:60px" clear="clear" require="require"></textarea>
    </div>
    <div style="clear:both;"></div>
    <div style="margin:15px 0 0 0;text-align: center;">
        <a id="repair" class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addRepairDlg')){batchAddition(2)}">确定</a><!-- doAddRepair() -->
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRepairDlg').dialog('close')">取消</a>
    </div>
</div>
<!-- 门卡管理对话框 -->
<div id="doorCardDlg" class="easyui-dialog" data-options="closed:true">
    <div style="width:100%;">
        <div style='margin:10px 0 0 5px;float: left;'>
            门店：<input id="doorCardAddCommunity" style="width:95px;" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;getDoorCard(1)')" clear="clear">
        </div>
        <div style='margin:10px 0 0 5px;float: left;'>
            门牌号：<input id="doorCardAddDoorplateno" style="width:95px;" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;getDoorCard(1)')" clear="clear">
        </div>
        <div style='margin:10px 0 0 5px;float: left;'>
            持卡人：<input id="doorCardPopName" style="width:95px;" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;getDoorCard(1)')" clear="clear">
        </div>
        <div style='margin:10px 0 0 5px;float: left;'>
            门锁名称：<input id="doorCardLockName" style="width:95px;" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;getDoorCard(1)')" clear="clear">
        </div>
        <div style='margin:10px 0 5px 5px;float: left;'>
            状态：<select id="doorCardLockState" style="width:95px;" onchange="getDoorCard(1)" clear="clear">
                <option></option>
                <option>已使用</option>
                <option>未使用</option>
                <option>已过期</option>
                <option>错误超限</option>
                <option>授权到期</option>
                <option>注销</option>
                <option>退卡</option>
            </select>
        </div>
        <div style='margin:10px 0 5px 5px;float: left;'>
            卡号：<input id="doorCardNum" class="clientBirth" style="width:95px;" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;getDoorCard(1)')" clear="clear">
        </div>
        <table id="doorCardTable" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
            <thead>
            <tr>
                <th field="shortHouseAddress" width="25" align="center">客房地址</th>
                <th field="devNickname" width="15" align="center">门锁名称</th>
                <th field="popName" width="15" align="center">持卡人</th>
                <th field="jdcCardNum" width="15" align="center">卡号</th>
                <th field="jdcDeadlineTime" width="15" align="center">有效期限</th>
                <th field="jdcState" width="10" align="center">状态</th>
            </tr>
            </thead>
        </table>
        <div id="shortRentHousePageDiv" style="width:100%;text-align:center;"></div>
    </div>
</div>

<div id="openCashDlg" class="easyui-dialog" data-options="closed:true" style="text-align:center">
    <div class="cash qrCodeCustomer" style="margin:10% 0 0 27%">
        <div id="receivables" style="font-size:25px;float:left;">应收：</div>
        <div id="orderMoney" style="font-size:25px;float:left"></div>
        <div style="font-size:25px;float:left">元</div>
    </div>
    <div style="clear:both"></div>
    <div class="cash qrCode" style="margin:5% 0 5% 0">
        <input id="moneyInput" type="number" style="width:300px;height:35px;border-radius:5px;font-size:20px;text-align:center" placeholder="" />
    </div>
    <div style="clear:both"></div>
    <div class="cash" style="margin:0 0 0 27%">
        <div style="font-size:25px;float:left">找零：</div>
        <div id="changeMoney" style="font-size:25px;float:left">0.00</div>
        <div style="font-size:25px;float:left">元</div>
    </div>
    <div style="margin:23% 0 0 0" >
        <button id="payType" type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="doCash(1)">现金收银</button>
    </div>
</div>

<!-- 门卡管理跟进信息 -->
<div id="doorLockFollow" class="easyui-dialog" data-options="closed:true">
    <table id="doorLockFollowTable" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
        <thead>
            <tr>
                <th field="registrantName" width="10" align="center">跟进人</th>
                <th field="type" width="15" align="center">跟进类型</th>
                <th field="time" width="15" align="center">跟进时间</th>
                <th field="text" width="50" align="center">跟进记录</th>
            </tr>
        </thead>
    </table>
</div>

<!-- 退定中审批窗口 -->
<div id="unsubscribeDlg" class="easyui-dialog" data-options="closed:true">
    <center>
        <a id="allowUnsubscribe" class="easyui-linkbutton" style="margin:18px 10px 0 0;" iconcls="icon-ok" onclick="unsubscribe(0)">允许退定</a>
        <a id="notAllowUnsubscribe" class="easyui-linkbutton" style="margin:18px 10px 0 0;" iconcls="icon-no" onclick="unsubscribe(1)">退定取消</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" style="margin:18px 0 0 0;" onclick="$('#unsubscribeDlg').dialog('close')">取消</a>
    </center>
</div>

<!-- 账单打印窗口 -->
<div id="printDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div id="dlg-toolbar">
        <input type="hidden" id="print_index">
        <table cellpadding="0" cellspacing="0" style="width:100%">
            <tr>
                <td>
                    <a href="#" class="easyui-linkbutton" iconCls="icon-print" plain="true" onclick="window.printFrame.print()">打印票据</a>
                    <a href="#" class="easyui-linkbutton" iconCls="icon-up" plain="true" onclick="laterOrNext(0)">上一条</a>
                    <a href="#" class="easyui-linkbutton" iconCls="icon-down" plain="true" onclick="laterOrNext(1)">下一条</a>
                </td>
            </tr>
        </table>
        <iframe id="printFrame" name="printFrame" style="width:100%;height:570px">

        </iframe>
    </div>
</div>

<!--取单窗口信息-->

<div id="takingOrderDlg" class="easyui-dialog" data-options="closed:true" style="width:100%;height:100%">

    <div style="margin: 5px 0 10px 5px">
        <button class="btn btn-success" onclick=" selectAllTemporaryOrder()">刷新</button>
    </div>

    <div style="margin: 0 1% 0 1%;width:98%;">

        <table id="takingOrderTable" style="width:100%;height:400px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="rownumbers:false,singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
            <thead>
            <tr>
                <th  field="jtoApplicant" width="10" align="center">申请人</th>
                <th  field="jtoAddress" width="20" align="center">房客地址</th>
                <th  field="jtoRoomType" width="10" align="center">房客房型</th>
                <th  field="jtoTotalHousingPrice" width="10" align="center">订单总价</th>
                <th  field="jtoDayPrice" width="10" align="center">日均房价</th>
                <th  field="jtoDiscount" width="10" align="center">折扣率</th>
                <th  field="jtoDiscountPrice" width="10" align="center">折扣后总价</th>
                <th  field="jtoAveragePrice" width="10" align="center">折扣后均价</th>
                <th  field="jtoRemark" width="10" align="center">折扣原因</th>
                <th	 field="jtoStatus" width="10" align="center">授权状态</th>
                <th  field="takeOrder" formatter="formatReceiveOrder" width="20" align="center">操作</th>
                <%-- <th  field="takeOrder" formatter="formatReceiveCancel" width="10" align="center"></th>
                 <th  field="takeOrder" formatter="formatReceiveCancel" width="10" align="center"></th>--%>
            </tr>
            </thead>
        </table>

    </div>
    <%--<div style="text-align: center;margin: 20px  0 0 0 ">
        <button  type="button" style="width: 50px;height: 35px" class="btn btn-success" onclick="takingSubmit()" >确认</button>
    </div>--%>
</div>

<!-- 授权管理窗口  -->
<div id="authorizationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true" style="text-align:center">
    <div id="authDeviceSelectDiv" style='margin:0 0 0 15px;float:left;'></div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;'>
        租客：<select id="authSelectRenter" style="width:120px" choose="choose">
    </select>
    </div>
    <div id="authPhotoUploadDiv"style='margin:5px 0 0 15px;height:20px; float: left;'>
        <a id="authPhotoUpload" class="easyui-linkbutton" style='height:20px;display:none'iconCls="icon-upload" plain="false" onclick="openAttachment('private')">相片上传</a>
    </div>
    <div style='margin:5px 0 0 5px;height:20px; float: left;'>
        <a id="authPhotoDlgs" class="easyui-linkbutton" style='height:20px;display:none'iconCls="icon-upload" plain="false" onclick="new_page()">拍照上传</a>
    </div>
    <div style="clear:both"></div>
    <div style='margin:10px 0 0 9px;float: left;'>
        <input type="password" style="width:2px;hight:0px;border:none;">
        授权：<input id="authCardId" style="width:120px;" autocomplete="off" type="text" onfocus="this.type='password'" clear="clear">
    </div>
    <div style='margin:10px 0 0 17px;float: left;'>
        期限：<input id="authPushingTime" style="width:120px;"  clear="clear" readonly="readonly">
    </div>
    <div style='margin:10px 0 0 15px;float: left;'>
        卡号：<input id="authDoorCardNum" style="width:120px;"  clear="clear">
    </div>
    <!-- <div style='margin:10px 0 0 17px;float: left;'>
        收费：<input type="checkbox" id="authDoorCardFeeCheck" value="all" />
    </div>
    <div style="clear:both"></div>
    <div id="doorCardFee" style="display:none">
        <div style='margin:10px 0 0 15px;float: left;'>
            押金：<input id="authDoorCardFeeDeposit" style="width:120px"  clear="clear">
        </div>
        <div style='margin:10px 0 0 5px;float: left;'>
            工本费：<input id="authDoorCardMaterialFee" style="width:120px;"  clear="clear">
        </div>
    </div> -->
    <div style="clear:both"></div>
    <div style="text-align:center;">
        <a id="saveAuthorizationInfo" class="easyui-linkbutton" style="margin:20px 5px 0  0;" iconcls="icon-save" onclick="saveAuthorizationInfo()">授权</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" style="margin:20px 0 0 5px;" onclick="$('#authorizationDlg').dialog('close')">关闭</a>
    </div>
</div>

<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
<jsp:include page="/ui/fg_guestHouseHouseDetails.jsp"></jsp:include>
<jsp:include page="/ui/public/photoDlg.jsp"></jsp:include>
<jsp:include page="/ui/public/renterContImgDlg.jsp"></jsp:include>
<script src="js/upload.js"></script>
<script src="js/contextMenu.js"></script>
<script src="js/fg.public.js"></script>
<script src="js/fg_guestHouse.js"></script>
<script src="js/layer/layer.js"></script>
<script src="js/baseISSObject.js"></script>
<script src="js/baseISSOnline.js"></script>
<script src="js/common.js"></script>
<script src="js/config.js"></script>
<script src="js/contUpload.js"></script>
</body>
</html>