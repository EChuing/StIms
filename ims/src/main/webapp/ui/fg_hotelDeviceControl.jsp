<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<html>
<head>
    <meta charset="utf-8">
    <title>酒店集控</title>
    <link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
    <link href="css/icon.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/upload.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
    <script src="js/config.js"></script>
    <script src="js/fg.public.js"></script>

    <style>
        .controllerCls{
            width: 35%;
            height: 30px;
            float:left;
            text-align: center;
            line-height:30px;
            border-radius: 6px;
            cursor:pointer;
        }
        .buttonCls{
            width: 98%;
            height: 98%;
            background-color:#00c900;
            font-size: 1.1vw;
            font-weight: bold;
            color: #ffffff;
            border: 0px;
            border-radius: 4px;
            cursor:pointer;
        }
        .chooseCls{
            background-color: #32AED6;
        }
    </style>
</head>

<body>
<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<div>
    <div style="margin:5px 0 0 5px; float:left;">
        <a class="easyui-linkbutton" iconCls="icon-deviceManagement"
           plain="true" id="deviceManagementButton" onclick="deviceControlDlg()">设备控制</a>
    </div>
    <div style="clear:both"></div>
    <div style="margin:5px 0 5px 5px;color:black;float:left;">
        <label for="searchCommunity">楼盘名称：</label>
        <input id="searchCommunity" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHotelDevice()')" style="width:100px">
    </div>
    <div style="margin:5px 0 5px 5px;color:black;float:left;">
        <label for="searchBuilding">楼栋：</label>
        <input id="searchBuilding" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHotelDevice()')" style="width:100px">
    </div>
    <div style="margin:5px 0 5px 5px;color:black;float:left;">
        <label for="searchDoorplateno">门牌号：</label>
        <input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHotelDevice()')" style="width:100px">
    </div>
    <div style="clear:both"></div>
</div>

<!-- 酒店设备列表 -->
<div style='margin:5px 0 0 5px;width:99%;float:left;'>
    <div  style='width:69%;float:left;'>
        <table id="deviceDataGrid" style="width:100%; height:550px; table-layout:fixed; overflow:hidden; float: left;"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
            <thead>
            <tr>
                <th id="checkAll" data-options="field:'ck',checkbox:true"></th>
                <th field="detailedAddress" width="15" align="center">设备安装地址</th>
                <th field="devNickname" width="15" align="center">设备名称</th>
                <th field="idftName" width="10" align="center">一级名称</th>
                <th field="idstName" width="10" align="center">二级名称</th>
                <th field="devAuthId" width="10" align="center">设备SN</th>
                <th field="devStatus" width="10" align="center">设备在线状态</th>
                <th field="switchingState" width="10" align="center">开关状态</th>
            </tr>
            </thead>
        </table>
        <div id="devicePageDiv" style="text-align:center; "></div>
    </div>
    <div id="deviceType" style='margin-left: 10px; width:30%; height:523px;float:left;'  >
        <div id="tt" class="easyui-tabs" style="width:100%;height:523px;float:left;" data-options="closable:false">
            <div title="灯光控制" id="lightingControllerDiv" style="padding:20px;width: 50px; float:left;">
                <div class="controllerCls">
                    <input class="buttonCls"  id="openAllLight" type="button" ctlType="0" value="全部打开"  >
                </div>
                <div class="controllerCls">
                    <input class="buttonCls"  id="closeAllLight"  type="button" ctlType="1"  value="全部关闭"  style="margin-left: 20px;" >
                </div>
            </div>
            <div title="空调控制" id="AirController" style="padding:20px;width: 50px; float:left;">
                <div class="controllerCls">
                    <input class="buttonCls"  id="openAllAir" type="button" ctlType="0" value="全部打开"  >
                </div>
                <div class="controllerCls">
                    <input class="buttonCls"  id="closeAllAir"  type="button"  ctlType="1"  value="全部关闭"  style="margin-left: 20px;" >
                </div>
            </div>
            <div title="窗帘控制" id="curtainContrller" style="padding:20px;width: 50px; float:left;">
                <div class="controllerCls">
                    <input class="buttonCls"  id="openAllcurtain" type="button" ctlType="0" value="全部打开"  >
                </div>
                <div class="controllerCls">
                    <input class="buttonCls"  id="closeAllcurtain"  type="button" ctlType="1" value="全部关闭" style="margin-left: 20px;" >
                </div>
            </div>

        </div>
    </div>
</div>


<!-- 控制设备 -->
<div id="deviceControlDlg" class="easyui-dialog" data-options="closed:true" style="text-align: center">
    <a class="easyui-linkbutton" style="margin:15px 10px 0 10px;width: 50px;"
       plain="false" onclick="deviceControl(0)" data-brand="10">开</a>
    <a class="easyui-linkbutton" style="margin:15px 0 0 10px;width: 50px;"
       plain="false" onclick="deviceControl(1)" data-brand="10">关</a>
</div>
</body>
<script src="js/fg_hotelDeviceControl.js"></script>
</html>
