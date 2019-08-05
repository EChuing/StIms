<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019.4.23
  Time: 17:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<html>
<head>
    <meta charset="utf-8">
    <title>公区集控</title>
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
        <div style="margin:5px 0 0 5px; float:left;">
            <a class="easyui-linkbutton" iconCls="icon-zukeyixiangrenguanli"
               plain="true" id="associatedPersonnelButton" onclick="officeAssociatedUsers(3)">关联人员</a>
        </div>
        <div style="clear:both"></div>
        <div style="margin:5px 0 5px 5px; float:left; color:black;">
            <label for="searchVirtualName">公区名称</label>
            <input style="width:100px;" id="searchVirtualName" onkeyup="searchOnkeyup(this.id, 'queryOfficeAreaDevice()')">
        </div>
        <div style="clear:both"></div>
    </div>

    <!-- 办公区设备列表 -->
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
        <div id="deviceType" style='margin-left: 10px; width:30%; height:523px;float:left;'>
            <div id="tt" class="easyui-tabs" style="width:100%;height:523px;float:left;" data-options="closable:false" >
                <div title="灯光控制" id="lightingControllerDiv" style="padding:20px;width: 50px; float:left;">
                    <div class="controllerCls">
                        <input class="buttonCls"  id="openAllLight" type="button" ctlType="0" value="全部打开"  >
                    </div>
                    <div class="controllerCls">
                        <input class="buttonCls"  id="closeAllLight"  type="button" ctlType="1"  value="全部关闭"  style="margin-left: 20px;" >
                    </div>
                </div>
                <div title="灯光调节" id="lightingContrller" style="padding:50px;width: 50px; float:left;">
                    <div class="controllerCls" id="BrightnessDiv" style="margin:0px 0 0 25px;" >
                        <input id="brightnessStatus" hidden="hidden"  value="07">
                        <p style="margin:-5px 0 0 -40px;float: left">亮度：</p>
                        <input id="brightness" value="01" class="easyui-slider" data-options="showTip:false,onSlideEnd: function(value){
				        operateDeviceDlg(value,0);}" data-options="min:1,max:15,step:1" style="width:200px;float:left">
                    </div>
                    <div style="clear:both"></div>
                    <!--灯光色温调节-->
                    <div class="controllerCls" id="ColorTemperatureDiv" style="margin:5px 0 0 25px;">
                        <input id="colorTemperatureStatus" hidden="hidden"   value="07">
                        <p style="margin:-5px 0 0 -40px;float: left">色温：</p>
                        <input id="colorTemperature" value="00" class="easyui-slider"data-options="showTip:false,onSlideEnd: function(value){
				        operateDeviceDlg(value,1);}" data-options="min:1,max:127,step:1" style="width:200px;float:left">
                    </div>
                </div>

                <div title="空调控制" id="AirController" style="padding:25px;width: 50px; float:left;">
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

                <div title="插座控制" id="SocketContrller" style="padding:20px;width: 50px; float:left;">
                    <div class="controllerCls">
                        <input class="buttonCls"  id="openAllSocket" type="button" ctlType="0" value="全部打开"  >
                    </div>
                    <div class="controllerCls">
                        <input class="buttonCls"  id="closeAllSocket"  type="button" ctlType="1" value="全部关闭" style="margin-left: 20px;" >
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
    <!-- 关联人员 -->
    <div id="officeAssociatedUsersDig"style="padding:6px" class="easyui-dialog" data-options="closed:true">
    	<input id="relationIndex" hidden="hidden">
        <div class="search1">
            <div style="margin:5px 0 5px 5px;float:left;">
                安装地址：<input id="installationAddress" onkeyup="queryUserlated(1)" style="width:120px">
            </input>
            </div>
            <div style="margin:5px 0 5px 5px;float:left;">
                部门名称：<input id="departmentName" onkeyup="queryUserlated(1)" style="width:120px">
            </input>
            </div>
            <div style="margin:5px 0 5px 10px;float:left;">
			姓名：<input id="userName" onkeyup="queryUserlated(1)" style="width:120px">
			</input>
			</div>
    	</div>
    	<div style="clear:both;"></div>
	    <div style="padding:2px 0 0 0;">
			<div style="padding:5px 0 0 5px;width:20%;float: left;">
				<table id="unRelatedDeviceDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
		           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
		           <thead>
			        <tr>
			        	<th data-options="field:'ck',checkbox:true"></th>
			            <th field="id" width="0px" align="center" hidden="true">id</th>
			            <th field="hsAddCommunity" width="19" align="center">安装地址</th>
			            <th field="devNickname" width="24" align="center">设备名称</th>
			        </tr>
			        </thead>
				</table>
			</div>
			
			<div style="margin:165px 5px 5px 5px;float: left;">
				<a class="easyui-linkbutton"  iconCls="icon-add" plain="true" onclick="updateDeviceRelation(0)">添加</a>
				<br>
				<a class="easyui-linkbutton"  iconCls="icon-remove" plain="true" onclick="updateDeviceRelation(1)">移除</a>
			</div>
			 <div style="padding:5px 0 0 5px;width:20%;float: left;">
				<table id="existingRelationDeviceDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
		           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
		           <thead>
			        <tr>
			        	<th data-options="field:'ck',checkbox:true"></th>
			        	<th field="id" width="2" align="center" hidden="true">id</th>
			            <th field="hsAddCommunity" width="19" align="center">安装地址</th>
			            <th field="devNickname" width="24" align="center">设备名称</th>
			        </tr>
			        </thead>
				</table>
			</div>
		</div>
		<div style="padding:2px 0 0 0;">
		<div style="padding:5px 0 0 5px;width:20%;float: left;">
			<table id="unRelatedRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
	           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
	           <thead>
		        <tr>
		        	<th data-options="field:'ck',checkbox:true"></th>
		        	<th field="userId" width="2" align="center" hidden="true">userId</th>
		            <th field="departmentName" width="19" align="center">部门</th>
		            <th field="suStaffName" width="24" align="center">姓名</th>
		        </tr>
		        </thead>
			</table>
		</div>
		<div style="margin:165px 5px 5px 5px;float: left;">
			<a class="easyui-linkbutton"  iconCls="icon-add" plain="true" onclick="updateHsRelation(0)">添加</a>
			<br>
			<a class="easyui-linkbutton"  iconCls="icon-remove" plain="true" onclick="updateHsRelation(1)">移除</a>
		</div>
		<div style="padding:5px 0 0 5px;width:20%;float: left;">
			<table id="existingRelationRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
	           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
	           <thead>
		        <tr>
		        	<th data-options="field:'ck',checkbox:true"></th>
		        	<th field="userId" width="2" align="center" hidden="true">userId</th>
		            <th field="departmentName" width="19" align="center">部门</th>
		            <th field="suStaffName" width="24" align="center">姓名</th>
		        </tr>
		        </thead>
			</table>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div style="margin:10px 0 0 0;text-align: center;">
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="updateRelations()">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#officeAssociatedUsersDig').dialog('close')">取消</a>
	</div>	
    </div>
    </body>
        <script src="js/fg_officeAreaDeviceControl.js"></script>
        <script src="js/PublicEmpowerForTeacher.js"></script>
</html>
