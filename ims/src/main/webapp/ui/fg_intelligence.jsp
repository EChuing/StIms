<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>设备列表</title>
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
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
	<style>
		table td {
			border: 1px solid #888;
			border-top: none;
			white-space: nowrap;
			padding: 2px;
			font-size: 14px;
			height: 30px;
		}
		#chooseOperateDlg span.l-btn-left{
			height: 42px;
			width: 108px;
			background: -webkit-linear-gradient(#3c9cff, #75C2F7);
			background: -o-linear-gradient(#3c9cff, #75C2F7);
			background: -moz-linear-gradient(#3c9cff, #75C2F7);
			background: linear-gradient(#3c9cff, #75C2F7);
		}
		#chooseOperateDlg span.l-btn-text{
			font-size: 20px;
			line-height: 42px;
			color: #ffff
		}
		#FaceDeviceDlg span.l-btn-left{
			height: 42px;
			width: 108px;
			background: -webkit-linear-gradient(#3c9cff, #75C2F7);
			background: -o-linear-gradient(#3c9cff, #75C2F7);
			background: -moz-linear-gradient(#3c9cff, #75C2F7);
			background: linear-gradient(#3c9cff, #75C2F7);
		}
		#FaceDeviceDlg span.l-btn-text{
			font-size: 20px;
			line-height: 42px;
			color: #ffff;
			text-overflow: ellipsis;
			height: 42px;
			white-space: nowrap;
			overflow: hidden;
			width: 108px;
		}
		#mdElectricBoxDlg span.l-btn-left{
			height: 42px;
			width: 108px;
			background: -webkit-linear-gradient(#3c9cff, #75C2F7);
			background: -o-linear-gradient(#3c9cff, #75C2F7);
			background: -moz-linear-gradient(#3c9cff, #75C2F7);
			background: linear-gradient(#3c9cff, #75C2F7);
		}
		#mdElectricBoxDlg span.l-btn-text{
			font-size: 20px;
			line-height: 42px;
			color: #ffff;
			text-overflow: ellipsis;
			height: 42px;
			white-space: nowrap;
			overflow: hidden;
			width: 108px;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div class="clearfix" style="padding:3px 0 0 5px;">
		<%--<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="bindDevice" onclick="bindDevice()">绑定设备</a>--%>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="bindDevice" onclick="bindDevice()">绑定设备</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="deviceControl" onclick="chooseOperateDlg()">操作设备</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addDeviceButton" onclick="addDeviceDlg()">添加新设备</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="pushCard()">批量发卡</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="setSence()">设置安装位置（情景专用）</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="updateDev()">修改设备类型</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-shuaxin" onclick="queryDeviceInfo(1)">状态刷新</a>
		<!--<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="addFace()">添加新人脸设备</a>-->
	</div>
	
	<!-- 新增人脸设备对话框
	<div id="addFaceDlg"style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div id="addFace" style='margin:10px 0 0 20px;'>
			<div style='margin:10px 0 0 20px;'>
			设备序列号：<input id="DeviceKey" style="width:400px;">
			</div>
			<div style='margin:10px 0 0 33px;'>
			设备名称：<input id="Name" style="width:400px;">
			</div>
			<input style="width:0px;hight:0px;border:none">
		</div>
		<div style="margin:10px 0 0 0;text-align: center;">
		<a id="doAddFace" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddFace()">确定</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addFaceDlg').dialog('close')">取消</a>
		</div>
	</div> -->
	<!-- 重启人脸设备对话框 -->
	<%--<div id="reStartDlg"style="padding:6px;" class="easyui-dialog" data-options="closed:true">--%>
		<%--<div id="reStart" style='margin:10px 0 0 20px;'>--%>
			<%--设备序列号：<input id="DeviceKey" style="width:400px">--%>
			<%--<input style="width:0px;hight:0px;border:none">--%>
		<%--</div>--%>
		<%--<div style="margin:10px 0 0 0;text-align: center;">--%>
		<%--<a id="doRestart" class="easyui-linkbutton" iconcls="icon-save" onclick="doRestart()">确定</a>--%>
		<%--<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#reStartDlg').dialog('close')">取消</a>--%>
		<%--</div>--%>
	<%--</div>--%>
	<div style="margin:10px 0 0 5px;">
			<%--设备品牌：
			<input id="searchBrandShowBrandInfo" class="choose_brand_button" doFlag="searchBrand" doFun="queryDeviceInfo(1)"
				style="width:150px;cursor: pointer;" type="text" readonly="readonly">
			<div id="searchBrandShowBrandInfoDiv" style="display:none;"></div>
			<input id="searchBrandGetBrandName" type="hidden">
			<input id="searchBrandGetBrandType" type="hidden">
			<input id="searchBrandGetBrandId" type="hidden">--%>
			<label for="searchDevTypeShowDeviceType">设备类型：</label>
			<input id="searchDevTypeShowDeviceType" class="choose_device_type_button" doFlag="searchDevType" doFun="queryDeviceInfo(1)"
				   style="width:100px;cursor: pointer;" type="text" readonly="readonly">
			<input id="searchDevTypeGetDeviceName" type="hidden">
			<input id="searchDevTypeGetDeviceOneId" type="hidden">
			<input id="searchDevTypeGetDeviceType" type="hidden">
			<input id="searchDevTypeGetDeviceTwoId" type="hidden">
			<div id="searchDevTypeShowDeviceTypeDiv" style="display:none;"></div>
			设备名称：<input id="searchDevTypeName" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">
			设备SN：<input id="searchDevSnCode" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">
			<%--楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">--%>
			<%--楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">--%>
			<%--门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">--%>
			设备安装地址：<input id="searchDeviceAddress" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">
			<input style="width:0px;hight:0px;border:none"><%--此input用来处理chrome浏览器自动填充用户名的--%>
	</div>
	<div style="padding:5px 0 0 0;">
		<table id="deviceInfoTable" style="width:100%;height:498px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0 ,checkOnSelect: false, selectOnCheck: false,">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th field="brandName" width="15" align="center" hidden="hidden">设备品牌</th>
					<th field="devFirstType" width="10" align="center" formatter="formatBrandType">设备类型</th>
					<th field="devSecondType" width="10" align="center" formatter="formatBrandType2">设备型号</th>
					<th field="idstName" width="10" align="center" >安装位置(情景专用)</th>
					<th field="devNickname" width="10" align="center">设备名称</th>
					<th field="detailedAddress" width="20" align="center">设备安装地址</th>
					<th field="devSn" width="15" align="center">设备SN</th>
					<th field="devState" width="25" align="center" >设备状态</th>
					<%--<th field="devStatus" width="0" align="center" ></th>--%>
				</tr>
			</thead>
		</table>
		<div id="deviceInfoTablePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	</div>

	<!-- 发卡对话框 -->
	<div id="pushCardDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
			<div style="margin:10px 0 0 5px;">
				授权：<input id="cardId" type="password" style="width:120px;" clear="clear">
				卡号：<input id="cardNum" style="width:120px;"  clear="clear" >
			</div>
			<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doPushingCard()">发卡</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#pushCardDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<!-- 设置情景对话框 -->
	<div id="setSenceDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin:10px 0 0 5px;">
			安装位置：<select id="setPlace" style="width:270px;"  clear="clear">
			<option></option>
		</select>
			<div style="clear:both;margin-top: 10px;"></div>
			设备类型：<select id="ftDevType" class="repair_hope_select" style="width:270px;"  clear="clear">
			<option></option>
		</select>
		</div>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doSetSence()">保存情景</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#setSenceDlg').dialog('close')">关闭</a>
		</div>
	</div>

	<!-- 绑定设备对话框 -->
	<div id="bindDeviceDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<fieldset>
		<legend>选择房源表</legend>
			<div style="margin:5px 0 5px 0;color:black;font-size:13px;float:left;display:none">
				城市：<select id="choseCity" onchange="choseHouseCity()" style="width:80px">
				</select>
			</div>
			<div style="margin:5px 0 5px 0;color:black;font-size:13px;float:left;">
				城区：<select id="choseDistrict" onchange="query4StoreInfo(1,0)" style="width:100px">
					<option></option>
				</select>
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
				片区：<select id="choseZone" onchange="query4StoreInfo(1,0)" style="width:100px">
					<option></option>
				</select>
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼盘/小区：<input id="choseCommunity" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼栋：<input id="choseBuilding" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				门牌号：<input id="choseDoorplateno" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:80px">
			</div>
			<!-- 房屋列表 -->
			<table id="choseHouseTable"></table>
			<!-- 房源分页 -->
			<div id="choseHousePageDiv" style="width:99%"></div>
		</fieldset>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a id="dobindDevice1" class="easyui-linkbutton" iconcls="icon-save" onclick="dobindDevice()">确定</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#bindDeviceDlg').dialog('close')">取消</a>
		</div>
	</div>



	<!-- 添加新设备对话框 -->
	<div id="addDeviceDlg" style="padding:6px;"   class="easyui-dialog" data-options="closed:true">
		<div style="margin:10px 0 0 20px;">
			设备品牌：<input id="addDeviceShowBrandInfo" class="choose_brand_button" doFlag="addDevice" doFun="changeBrandAddDevice()"
				style="width:400px;cursor: pointer;" type="text" readonly="readonly">
			<input id="addDeviceGetBrandName" type="hidden">
			<input id="addDeviceGetBrandType" type="hidden">
			<input id="addDeviceGetBrandId" type="hidden">
			<div id="addDeviceShowBrandInfoDiv" style="display:none;"></div>
		</div>
		<div id="addDeviceDiv" style="display:none;">
			<div id="deviceUserNameDiv" style='margin:10px 0 0 20px;'>
				设备账号：<input id="deviceUserName" style="width:400px">
			</div>
			<div id="devicePasswardDiv" style='margin:10px 0 0 20px;'>
				设备密码：<input id="devicePassward" style="width:400px">
			</div>
			<div id="deviceAuthIdDiv" style='margin:10px 0 0 35px;'>
				APPID：<input id="deviceAuthId" style="width:400px">
			</div>
			<div id="deviceAuthSecretDiv" style='margin:10px 0 0 44px;'>
				秘钥：<input id="deviceAuthSecret" style="width:400px">
			</div>
			<div id="deviceAuthIdDivOne" style='margin:10px 0 0 13px;'>
				网关S/N码：<input id="deviceAuthId2" style="width:400px">
			</div>
			<div id="deviceAppkeyDiv" style='margin:10px 0 0 24px;'>
				app_key：<input id="deviceAppkeyId" style="width:400px">
			</div>
			<div id="deviceSecretDiv" style='margin:10px 0 0 37px;'>
				secret：<input id="deviceSecretId" style="width:400px">
			</div>
			<div id="hsIdDiv" style='margin:10px 0 0 19px;'>
				选择房间：<input id="hsId" style="width:400px"onclick="bindDevice1()">
			</div>
			<div id="queryDeviceDiv" style="margin:10px 0 0 19px;">
				获取设备：<input id="queryDevice" style="width:400px"onclick="queryDeviceDlg()" readonly="readonly">
				<input id="projectCode" type="text" hidden="hidden">
			</div>
			<div id="subDeviceNumerDiv" style="margin:10px 0 0 19px;">
				线路（子设备）个数：<input id="subDeviceNumer" style="width:340px" type="text">
			</div>
			<div id="antQueryDeviceDiv" style="margin:10px 0 0 19px;">
				获取设备：<input id="antQueryDevice" style="width:400px"onclick="antQueryDeviceDlg()" readonly="readonly">
			</div>
		</div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" id="doAddDevice" iconcls="icon-save" onclick="doAddDevice()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addDeviceDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!--超仪水电表控制窗口-->
	<div id="hydrometerDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
		<div style="width: 550px;height: 80px;">
			<div style="margin: 5px 0 0 10px">
				<button require="require" onclick="operateDeviceDlg(50)" id="joyOpen" type="button" class="btn btn-default" style="margin:0 0 5px 0;"></button>
				<button require="require" onclick="operateDeviceDlg(51)" id="joyOff" type="button" class="btn btn-default" style="margin:0 0 5px 0;"></button>
				<span id="hydrometerStateDlg" style="font-size: 18px;margin-left: 20px"></span>
			</div>
			<div style="float: left;margin-top: 5px">
				<%--<a id="switchset" class="easyui-linkbutton" style="	margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(3)">功率限定和线路名称修改</a>--%>
				<%--<a id="SETAUTOLEAK" class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(4)">漏电自检</a>--%>
				<%--<a id="SETWIRELESS" class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(6)">WiFi设置</a>--%>
				<%--<a class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(7)">实时数据</a>--%>
			</div>
		</div>
	</div>

	<%--云海电箱操作窗口--%>
	<div id="subDeviceDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
		<div style="width: 400px;height: 70px;margin: 10px 0 0 0">
			<div style="float: left">
				<div style="width: 180px;height: 30px;text-align: center;font-size: 18px"><span id="electricQuantity" style="font-size: 18px"></span></div>
			</div>
			<div style="float: left">
				<div>
					<button require="require" onclick="operateDeviceDlg(29)" id="open" type="button" class="btn btn-default" style="margin:0 0 5px 0;">通电</button>
					<button require="require" onclick="operateDeviceDlg(39)" id="off" type="button" class="btn btn-default" style="margin:0 0 5px 0;">断电</button>
					<button require="require" onclick="moduleManagementDlg()" id="moduleManagement" type="button" class="btn btn-default" style="margin:0 0 5px 0;">模块管理</button>
				</div>
			</div>
		</div>
	</div>
	<%--云海电箱模块管理--%>
	<div id="moduleManagementDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin-bottom: 10px">
			<span>电箱模块数量：</span>
			<select id="numer" onchange="moduleManagement()">
				<option value="0"></option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
			</select>
		</div>
		<table id="moduleManagementTable">
		</table>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doBindElectricBox()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moduleManagementDlg').dialog('close')">取消</a>
		</div>
	</div>
	<%--曼顿（md）电箱操作窗口--%>
	<div id="mdElectricBoxDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
		<div style="width: 550px;height: 80px;">
			<div style="margin: 5px 0 0 10px">
				<button require="require" onclick="MDElectricBoxControl(1)" id="mdOpen" type="button" class="btn btn-default" style="margin:0 0 5px 0;">通电</button>
				<button require="require" onclick="MDElectricBoxControl(2)" id="mdOff" type="button" class="btn btn-default" style="margin:0 0 5px 0;">断电</button>
				<span id="mdElectricQuantity" style="font-size: 18px;margin-left: 20px"></span>
			</div>
			<div style="float: left;margin-top: 5px">
				<a id="switchset" class="easyui-linkbutton" style="	margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(3)">功率修改</a>
				<a id="SETAUTOLEAK" class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(4)">漏电自检</a>
				<%--<a id="SETLOGINPWD" class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(5)">密码设置</a>--%>
				<a id="SETWIRELESS" class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(6)">WiFi设置</a>
				<a class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(7)">实时数据</a>
				<%--<a class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(8)">告警数据</a>--%>
				<%--<a class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(9)">已设置定时</a>--%>
				<%--<a class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(10)">获取漏电自检</a>--%>
				<%--<a class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(11)">在线记录</a>
				<a class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(12)">统计电量</a>--%>
			</div>
		</div>
	</div>
	<%--曼顿（md）电箱操作输入窗口--%>
	<div id="MDElectricBoxControlDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
		<div style="width: 98%;height: 75%;margin: 10px 0 20px 20px">
			<div id="switchsetControl">
				<div style="margin: 0 0 10px 0">
					<label for="lineName" style="width: 150px;display:inline-block;">线路名称</label><input type="text" id="lineName" readonly="readonly">
				</div>
				<div style="margin: 0 0 10px 0">
					<label for="maximumPower" style="width: 150px;display:inline-block;">最大功率（单位W）</label><input type="number" id="maximumPower">
				</div>
				<div style="margin: 0 0 10px 0">
					<label for="overflowThreshold" style="width: 150px;display:inline-block;">过流门限值（单位0.01A）</label><input type="number" id="overflowThreshold">
				</div>
			</div>
			<div id="SETAUTOLEAKControl">
				<div style="margin: 0 0 10px 0">
					启用漏电自检 <input type="checkbox" id="startUsing">
				</div>
				<div style="margin: 0 0 10px 0">
					日：<input id="day" style="width:100px" type="text" onfocus="WdatePicker({dateFmt:'dd',autoPickDate:true})">
				</div>
				<div style="margin: 0 0 10px 0">
					时：<input id="hour" style="width:100px" type="text" onfocus="WdatePicker({dateFmt:'HH',autoPickDate:true})">
				</div>
				<div style="margin: 0 0 10px 0">
					分：<input id="minute" style="width:100px" type="text" onfocus="WdatePicker({dateFmt:'mm',autoPickDate:true})">
				</div>
				<div style="margin: 5px 0 5px 0">
					<span style="color: red">注：</span>该功能启用后，在执行时会导致该线路短暂停电，建议设置时间为07:00。
				</div>
				<div>
					当前<span id="enableCheck" style="color: #1E9FFF"></span>漏电自检功能，上次自检时间为：<span id="lastCheckDate" style="color: #1E9FFF"></span>。
				</div>
			</div>
			<div id="SETLOGINPWDControl">
				<div style="margin: 0 0 10px 0">
					原设备密码：<input type="number" id="usedPassword">
				</div>
				<div style="margin: 0 0 10px 0">
					新设备密码：<input type="number" id="newPassword">
				</div>
			</div>
			<div id="SETWIRELESSControl">
				<div style="margin: 0 0 10px 0">
					原来的WiFi名称：<input type="number" id="used_ssid">
				</div>
				<div style="margin: 0 0 10px 0">
					原来的WiFi密码：<input type="number" id="used_ssidPassword">
				</div>
				<div style="margin: 0 0 10px 11px">
					新的WiFi名称：<input type="number" id="new_ssid">
				</div>
				<div style="margin: 0 0 10px 11px">
					新的WiFi密码：<input type="number" id="new_ssidPassword">
				</div>
				<div style="margin: 5px 0 5px 0">
					<span style="color: red">注：</span>WiFi名称只能为英文或数字组成，不能为中文名称。
				</div>
			</div>

			<div id="ElectricBoxStatus">
				<table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;width: 100%;table-layout: fixed;font-size: 12px;">
					<tbody>
					<tr align="center">
						<td width="17%">电箱编号</td>
						<td width="17%"><span id="smac"></span></td>
						<td width="16%">线路地址</td>
						<td width="16%"><span id="saddr"></span></td>
						<td width="17%">线路名称</td>
						<td width="17%"><span id="stitle"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">线路有效性</td>
						<td width="17%"><span id="svalidity"></span></td>
						<td width="16%">线路开关状态</td>
						<td width="16%"><span id="soc"></span></td>
						<td width="17%">远程控制合闸分闸</td>
						<td width="17%"><span id="senableNetCtrl"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">在线状态</td>
						<td width="17%"><span id="sonline"></span></td>
						<td width="16%">当前电量</td>
						<td width="16%"><span id="spower"></span></td>
						<td width="17%">过功门限值</td>
						<td width="17%"><span id="smxgg"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">过流门限值</td>
						<td width="17%"><span id="smxgl"></span></td>
						<td width="16%">类型</td>
						<td width="16%"><span id="slineType"></span></td>
						<td width="17%">告警状态</td>
						<td width="17%"><span id="salarm"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">线路规格</td>
						<td width="17%"><span id="sspecification"></span></td>
						<td width="16%">控制标记</td>
						<td width="16%"><span id="scontrol"></span></td>
						<td width="17%">显示标记</td>
						<td width="17%"><span id="svisibility"></span></td>
					</tr>
					<tr align="center">
						<td width="25%">总线标记</td>
						<td width="15%"><span id="smainLine"></span></td>
						<td width="15%">漏电流</td>
						<td width="15%"><span id="saLd"></span></td>
						<td width="15%">电流</td>
						<td width="15%"><span id="saA"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">温度</td>
						<td width="17%"><span id="saT"></span></td>
						<td width="16%">电压</td>
						<td width="16%"><span id="saV"></span></td>
						<td width="17%">功率</td>
						<td width="17%"><span id="saW"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">功率因素</td>
						<td width="17%"><span id="saPF"></span></td>
						<td width="16%">平均电流</td>
						<td width="16%"><span id="sgA"></span></td>
						<td width="17%">壳温度</td>
						<td width="17%"><span id="sgT"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">平均电压</td>
						<td width="17%"><span id="sgV"></span></td>
						<td width="16%">功率和值</td>
						<td width="16%"><span id="sgW"></span></td>
						<td width="17%">更新时间</td>
						<td width="17%"><span id="supdateTime"></span></td>
					</tr>

					</tbody>
				</table>
			</div>
			<div id="GET_BOX_ALARM" style="width: 98%;height: 100%">
				<div style="margin:0 0 5px 7px;color:black;float:left;">
					时间范围：<input id="searchBillingDateFrom" style="width:100px" type="text"
								onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchBillingDateTo\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm',autoPickDate:true,dchanging:getBoxAlarm(1,0)})"> 到
					<input id="searchBillingDateTo" style="width:100px" type="text"
						   onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchBillingDateFrom\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm',autoPickDate:true,dchanging:getBoxAlarm(1,0)})">
				</div>
				<table id="getBoxAlarmTable" style="width:100%;height:90%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
					<thead>
					<tr>
						<th field="auto_id" width="10" align="center">记录ID</th>
						<th field="addr" width="15" align="center">设备线路地址</th>
						<th field="node" width="20" align="center">线路名称</th>
						<th field="type" width="15" align="center">告警类型</th>
						<th field="time" width="15" align="center">告警时间</th>
						<th field="info" width="20" align="center">告警信息内容</th>
					</tr>
					</thead>
				</table>
				<div id="getBoxAlarmPageDiv" style="width:100%;text-align:center;"></div>
			</div>
			<div id="GET_CFG_TIMER" style="width: 98%;height: 100%">
				<table id="getCfgTimerTable" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
					<thead>
					<tr>
						<th field="autoid" width="10" align="center">记录号</th>
						<th field="channel" width="15" align="center">设备线路地址</th>
						<th field="weekday" width="20" align="center">星期列表</th>
						<th field="time" width="15" align="center">定时时间</th>
						<th field="status" width="15" align="center">定时操作</th>
					</tr>
					</thead>
				</table>
			</div>
			<%--<div id="GET_CFG_LKICHK">
				<div style="margin: 0 0 10px 11px">
					启用漏电自检（true:是/false:否）：<input style="width: 120px;" type="text" id="enableCheck" readonly="readonly">
				</div>
				<div style="margin: 0 0 10px 11px">
					上一次执行自检的时间：<input style="width: 120px;" type="text" id="lastCheckDate" readonly="readonly">
				</div>
				<div style="margin: 0 0 10px 11px">
					自检配置时间，格式: 日,时,分：<input style="width: 120px;" type="text" id="checkDateCfg" readonly="readonly">
				</div>
			</div>--%>
			<div id="GET_BOX_ONLINE_HISTORY" style="width: 98%;height: 100%">
				<div style="margin:0 0 5px 7px;color:black;float:left;">
					时间范围：<input id="startTime" style="width:100px" type="text"
								onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchBillingDateTo\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm',autoPickDate:true,dchanging:getBoxOnlineHistory(1,0)})"> 到
					<input id="endTime" style="width:100px" type="text"
						   onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchBillingDateFrom\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm',autoPickDate:true,dchanging:getBoxOnlineHistory(1,0)})">
				</div>
				<table id="getBoxOnlineHistoryTable" style="width:100%;height:90%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
					<thead>
					<tr>
						<th field="mac" width="10" align="center">设备号</th>
						<th field="status" width="15" align="center">在线状态</th>
						<th field="time" width="20" align="center">采集时间</th>
					</tr>
					</thead>
				</table>
				<div id="getBoxOnlineHistoryPageDiv" style="width:100%;text-align:center;"></div>
			</div>
			<div id="statisticalElectricity">
				<div style="margin-bottom: 10px">
					<div style="margin:0 0 5px 7px;color:black;float:left;">
						年份：<input id="searchYear" onkeyup="searchOnkeyup(this.id, 'getstatisticalElectricity()')" style="width:100px">
					</div>
					<div style="margin:0 0 5px 7px;color:black;float:left;">
						月份：<input id="searchMonth" onkeyup="searchOnkeyup(this.id, 'getstatisticalElectricity()')" style="width:100px">
					</div>
					<div style="margin:0 0 5px 7px;color:black;float:left;">
						日：<input id="searchDay" onkeyup="searchOnkeyup(this.id, 'getstatisticalElectricity()')" style="width:100px">
					</div>
					<div style="margin:0 0 5px 7px;color:black;float:left;">
						小时：<input id="searchHour" onkeyup="searchOnkeyup(this.id, 'getstatisticalElectricity()')" style="width:100px">
					</div>
				</div>

				<div id="monthElectricity" style="width: 100%;height: 100%">
					<table id="monthElectricityTable"></table>
				</div>
			</div>
		</div>
		<div style="margin:10px 0 0 0;text-align: center;" id="button">
			<a id="submit" class="easyui-linkbutton" iconcls="icon-save" onclick="MDElectricBoxControl(3)">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#MDElectricBoxControlDlg').dialog('close')">取消</a>
		</div>
	</div>

	<%-- 蚂蚁平台设备操作 --%>
	<div id="antOperateDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<a style="font-size: 18px;color: #00c900;" id="antReading" data-brand="25" data-devType="10000002,10000003" data-devSecondType="14,15"></a>
		<br>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(1)" data-brand="25" data-devType="10000001,10000002,10000003" data-devSecondType="3,14,15">查询基本信息</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(2)" data-brand="25" data-devType="10000001,10000002,10000003" data-devSecondType="3,14,15">查询记录</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(3)" data-brand="25" data-devType="10000001" data-devSecondType="3">查询密码列表</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(4)" data-brand="25" data-devType="10000001" data-devSecondType="3">创建密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(5)" data-brand="25" data-devType="10000001" data-devSecondType="3">修改密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(6)" data-brand="25" data-devType="10000001" data-devSecondType="3">密码管理</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(7)" data-brand="25" data-devType="10000003" data-devSecondType="15">通电</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(8)" data-brand="25" data-devType="10000003" data-devSecondType="15">断电</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="antOperateDlg(9)" data-brand="25" data-devType="10000002,10000003" data-devSecondType="14,15">查询读数</a>
	</div>
	<%-- 蚂蚁平台设备操作窗口 --%>
	<div id="antOperateControlDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
		<div style="width: 98%;height: 91%;margin: 10px 0 20px 10px">
			<div id="antDeviceInformation">
				<table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;width: 100%;table-layout: fixed;font-size: 12px;">
					<tbody>
					<tr align="center">
						<td width="17%">设备标识</td>
						<td width="17%"><span id="antDeviceId"></span></td>
						<td width="16%">设备安装地址</td>
						<td width="16%"><span id="settleAddress"></span></td>
						<td width="17%">设备序列号</td>
						<td width="17%"><span id="deviceSn"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">设备mac地址</td>
						<td width="17%"><span id="mac"></span></td>
						<td width="16%">设备型号</td>
						<td width="16%"><span id="deviceModel"></span></td>
						<td width="17%">系统版本</td>
						<td width="17%"><span id="systemVersion"></span></td>
					</tr>
					<tr align="center">
						<td width="17%">通信方式</td>
						<td width="17%"><span id="communicateMode"></span></td>
						<td width="16%">联网状态</td>
						<td width="16%"><span id="networkStatus"></span></td>
						<td width="17%">电池电量</td>
						<td width="17%"><span id="rb"></span></td>
					</tr>
					</tbody>
				</table>
			</div>
			<div id="antRecord" style="width: 98%;height: 96%">
				<div style="margin:0 0 5px 7px;color:black;float:left;">
					<select id="operationType" onchange="getoperationType()">
						<option value="1">异常记录</option>
						<option value="2">操作记录</option>
						<option value="3">行为记录</option>
					</select>
				</div>
				<div style="margin:0 0 5px 7px;color:black;float:left;">
					时间范围：<input id="searchBillingDateFrom2" style="width:120px" type="text"
								onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchBillingDateTo2\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true,dchanging:getAntRecord()})"> 到
					<input id="searchBillingDateTo2" style="width:120px" type="text"
						   onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchBillingDateFrom2\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true,dchanging:getAntRecord()})">
				</div>
				<div id="abnormalRecord" style="width:100%;height:95%;">
					<!-- 异常记录 -->
					<table id="abnormalRecordTable"></table>
				</div>
				<div id="operationRecord" style="width:100%;height:95%;">
					<!-- 操作记录 -->
					<table id="operationRecordTable"></table>
				</div>
				<div id="actionRecord" style="width:100%;height:95%;">
					<!-- 行为记录 -->
					<table id="actionRecordTable"></table>
				</div>
			</div>
			<div id="passwordList" style="width: 100%;height: 100%">
				<table id="passwordListTable" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
					<thead>
					<tr>
						<th field="passwordId" width="15" align="center">密码标识</th>
						<th field="passwordType" width="15" align="center">密码类型</th>
						<th field="userName" width="15" align="center">用户姓名</th>
						<th field="phoneNumber" width="15" align="center">用户手机号</th>
						<th field="validStartTime" width="15" align="center">有效期开始时间</th>
						<th field="validEndTime" width="15" align="center">有效期截止时间</th>
						<th field="createTime" width="15" align="center">创建时间</th>
						<th field="passwordStatus" width="15" align="center">密码状态</th>
						<th field="latestOperationFlowId" width="15" align="center">最后一次操作流水号</th>
						<th field="latestOperationType" width="15" align="center">最后一次操作类型</th>
						<th field="latestOperationStatus" width="15" align="center">最后一次操作状态</th>
					</tr>
					</thead>
				</table>
			</div>
			<div id="antReadingList" style="width: 100%;height: 100%">
				<div style="margin:0 0 5px 7px;color:black;float:left;">
					时间范围：<input id="searchBillingDateFrom3" style="width:120px" type="text"
								onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchBillingDateTo3\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true,dchanging:queryAntReading()})"> 到
					<input id="searchBillingDateTo3" style="width:120px" type="text"
						   onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchBillingDateFrom3\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true,dchanging:queryAntReading()})">
				</div>
				<table id="antReadingListTable" style="width:100%;height:95%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="rownumbers: true,singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
					<thead>
					<tr>
						<th field="meterReading" width="15" align="center">读数</th>
						<th field="timePoint" width="15" align="center">数据上报时间</th>
					</tr>
					</thead>
				</table>
			</div>
			<div id="createPassword" style="width: 100%;height: 99%">
				<div style="margin:0 0 5px 7px;color:black;" id="createPasswordType">
					密码类型：<select id="antPasswordType" onchange="selectPasswordType()">
						<option value="1">普通密码</option>
						<option value="2">激活码密码</option>
						<option value="3">离线密码</option>
						<option value="4">一次性密码</option>
					</select>
				</div>
				<div style="margin:0 0 5px 7px;color:black;" id="changePasswordType">
					操作类型：<select id="antOperationType" onchange="selectModifyType()">
						<option value="1">更改密码</option>
						<option value="2">更改密码有效期</option>
					</select>
				</div>
				<div style="margin:0 0 5px 7px;color:black;" id="managePasswordType">
					操作类型：<select id="antManageType">
						<option value="1">冻结密码</option>
						<option value="2">解冻密码</option>
						<option value="3">删除密码</option>
					</select>
				</div>
				<div id="antPasswordInput">
					<div style="margin:0 0 5px 7px;" id="validStartTimeDlg">
						<label for="validStartTime">有效期开始时间：</label><input onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'validEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" style="width:120px" type="text" id="validStartTime">
					</div>
					<div style="margin:0 0 5px 7px;" id="validEndTimeDlg">
						<label for="validEndTime">有效期截止时间：</label><input onfocus="WdatePicker({minDate:'#F{$dp.$D(\'validStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" style="width:120px" type="text" id="validEndTime">
					</div>
					<div style="margin:0 0 5px 55px;">
						<label for="antUserName">用户名：</label><input style="width:120px" type="text" id="antUserName" readonly="readonly"> <a id="selectPopulation" class="easyui-linkbutton" style="margin:0 0 0 10px;" plain="false" onclick="getHousePopulationDlg()">选择住户</a><a id="selectPassword" class="easyui-linkbutton" style="margin:0 0 0 10px;" plain="false" onclick="selectPasswordDlg()">选择密码</a>
					</div>
					<div style="margin:0 0 5px 43px;">
						<label for="antPhoneNumber">电话号码：</label><input style="width:120px" type="text" id="antPhoneNumber" readonly="readonly">
					</div>
					<div style="margin:0 0 5px 43px;">
						<label for="antRoomName">房间名称：</label><input style="width:120px" type="text" id="antRoomName" readonly="readonly">
					</div>
					<div style="margin:0 0 5px 67px;" id="passwordDlg">
						<label for="password">密码：</label><input style="width:120px" type="text" id="password">
					</div>
					<input id="popId" type="text" hidden="hidden">
					<input id="japId" type="text" hidden="hidden">
					<input id="japPasswordId" type="text" hidden="hidden">
				</div>
				<div style="margin:10px 0 0 0;text-align: center;">
					<a id="antOperationButton" class="easyui-linkbutton" iconcls="icon-save" onclick="antCreatePassword(1)">提交</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#antOperateControlDlg').dialog('close')">取消</a>
				</div>
			</div>
		</div>
	</div>
	<%--房屋人员--%>
	<div id="getHousePopulationDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
		<div id="housePopulation" style="width: 100%;height: 100%">
			<table id="housePopulationTable" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
				<thead>
				<tr>
					<th field="popName" width="15" align="center">姓名</th>
					<th field="popTelephone" width="15" align="center">手机号</th>
					<th field="popRelation" width="15" align="center">类型</th>
				</tr>
				</thead>
			</table>
		</div>
	</div>
	<%--密码列表--%>
	<div id="selectPasswordDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
		<div id="selectPasswordList" style="width: 100%;height: 92%">
			<table id="selectPasswordTable" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
				<thead>
				<tr>
					<th field="popName" width="15" align="center">姓名</th>
					<th field="popTelephone" width="15" align="center">手机号</th>
					<th field="japPasswordType" width="15" align="center">密码类型</th>
					<th field="japStartTime" width="15" align="center">有效期开始时间</th>
					<th field="japEndTime" width="15" align="center">有效期截止时间</th>
					<th field="japPasswordStatus" width="15" align="center">密码状态</th>
					<th field="japRegistrationTime" width="15" align="center">创建时间</th>
				</tr>
				</thead>
			</table>
		</div>
		<div id="selectPasswordTablePageDiv" style="width:99%"></div>
	</div>

	<%-- 智能衣架操作框 --%>
	<div id="intelligentHangerDiv" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div>
			<div id="electricMachineryDiv" style="margin:10px 0 0 32px;float: left;">
				电机：<input type="radio" name="dianji" value="01" checked="checked" onclick="openintelligentHanger()"/>上行
				<input type="radio" name="dianji" value="10" onclick="openintelligentHanger()"/>下行
				<input type="radio" name="dianji" value="00" onclick="openintelligentHanger()"/>停止
			</div>
			<div id="clothesPoleDiv" style="margin:10px 0 0 20px;float: left;">
				衣杆位置：<input type="radio" name="yiganweizhi" value="00" checked="checked" onclick="openintelligentHanger()"/>其他
				<input type="radio" name="yiganweizhi" value="01" onclick="openintelligentHanger()"/>上限
				<input type="radio" name="yiganweizhi" value="02" onclick="openintelligentHanger()"/>下限
			</div>

			<div style="clear:both"></div>
			<div id="anionDiv" style="margin:10px 0 0 20px;float: left;">
				负离子：<input type="radio" name="fulizi" value="1" onclick="openintelligentHanger()"/>开 &nbsp;<input type="radio" name="fulizi" value="0"checked="checked" onclick="openintelligentHanger()"/>关
			</div>
			<div id="dryDiv" style="margin:10px 0 0 32px;float:left;">
				烘干：<input type="radio" name="honggan" onclick="radioFunction()" value="1"/>开 &nbsp;<input type="radio" onclick="radioFunction()"name="honggan" value="0"checked="checked"/>关
			</div>
			<div id="hunganTime" style="margin:10px 0 0 10px;float: left;">
				烘干时间：<input type="text" style="width:40px" value="0"/>分钟
			</div>
			<div id="hunganButton" style="margin:10px 0 0 10px;float: left;">
				<button onclick="openintelligentHanger()"  type="button" style="">确定</button>
			</div>
			<div style="clear:both"></div>
			<div id="voiceDiv" style="margin:10px 0 0 32px;float: left;">
				语音：<input type="radio" name="yuyin" value="1" onclick="openintelligentHanger()"/>开 &nbsp;<input type="radio" name="yuyin" value="0"checked="checked" onclick="openintelligentHanger()"/>关
			</div>
			<div id="disinfectionDiv" style="margin:10px 0 0 32px;float: left;">
				消毒：<input type="radio" name="xiaotu" value="1" onclick="radioFunction()"/>开 &nbsp;<input type="radio" name="xiaotu" value="0" onclick="radioFunction()" checked="checked"/>关
			</div>
			<div id="xiaotuTime" style="margin:10px 0 0 10px;float: left;">
				消毒时间：<input type="text" style="width:40px" value="0"/>分钟
			</div>
			<div id="xiaotuButton" style="margin:10px 0 0 10px;float: left;">
				<button onclick="openintelligentHanger()"  type="button" style="">确定</button>
			</div>
			<div style="clear:both"></div>
			<div id="lightingDiv" style="margin:10px 0 0 32px;float: left;">
				照明：<input type="radio" name="zhaoming" value="1" onclick="openintelligentHanger()"/>开 &nbsp;<input type="radio" name="zhaoming" value="0"checked="checked" onclick="openintelligentHanger()"/>关
			</div>
			<div id="airDryingDiv" style="margin:10px 0 0 32px;float: left;">
				风干：<input type="radio" name="fengan" value="1" onclick="radioFunction()"/>开 &nbsp;<input type="radio" name="fengan" value="0" onclick="radioFunction()" checked="checked"/>关
			</div>
			<div id="fenganTime" style="margin:10px 0 0 10px;float: left;">
				风干时间：<input type="text" style="width:40px" value="0"/>分钟
			</div>
			<div id="fenganButton" style="margin:10px 0 0 10px;float: left;">
				<button onclick="openintelligentHanger()"  type="button" style="">确定</button>
			</div>
			<div style="clear:both"></div>
			<div id = "dianyuanId" style="margin:10px 0 0 32px;float: left;display: none">
				电源：<input type="radio" name="dianyuan" value="1" onclick="openintelligentHanger()"/>开 &nbsp;<input type="radio" name="dianyuan" value="0"checked="checked" onclick="openintelligentHanger()"/>关
			</div>
			<div style="clear:both"></div>
			<div id="intelligentHangerRowindez" style="display: none" value=""></div>
			<%--<div style="margin:10px 0 0 0;text-align: center;">
                <div id="errorId" style="margin:10px 0 0 20px;color:red; display: none">时间中含有中文！</div>
				<div style="margin:10px 0 0 20px;color:red;">
					<a class="easyui-linkbutton" iconcls="icon-save" onclick="openintelligentHanger()">提交</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#intelligentHangerDiv').dialog('close')">取消</a>
				</div>
			</div>--%>

		</div>
	</div>

	<%--选择设备为人脸识别对话框--%>
	<div id="FaceDeviceDlg"style="display: none;">
		<div style="margin:20px 5px 15px 20px;float: left">
			<a class="easyui-linkbutton" onclick="openPersonInfomationDiv()">识别记录</a>
		</div>
		<div style="margin:20px 5px 15px 20px;float: left">
			<a class="easyui-linkbutton" onclick="deleteFace()">刪除</a>
		</div>
		<div style="margin:20px 5px 15px 20px;float: left">
			<a class="easyui-linkbutton" onclick="doRestart()" >重启</a>
		</div>
		<div style="margin:20px 5px 15px 20px;float: left">
			<a class="easyui-linkbutton" onclick="doRemoteOpen()">一键开门</a>
		</div>
        <div style="margin:20px 5px 15px 20px;float: left">
            <a class="easyui-linkbutton" onclick="Unbound()">解除绑定</a>
        </div>
		<div style="margin:20px 5px 15px 20px"type="hidden">
			<input type="hidden" id="value">
		</div>
		<div style="clear: both"></div>
	</div>
	<div id="personInfomationDiv" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin: 5px 0 0 8px;" >
			<div style="float: left;margin-left: 20px;">
				人员：
				<input id="userName" type="text" style="width:150px;"onkeyup="selectIonInformation(1,3)">
			</div>
			<div style="float: left;margin-left: 20px;">
				时间：<input id="searchFaceStart" style="margin:0 5px 0 0;width:100px" onfocus="WdatePicker({maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:selectIonInformation(1,3)})">
					到<input id="searchFaceEnd" style="margin:0 5px 0 0;width:100px" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchFaceStart\',{d:0});}',maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:selectIonInformation(1,3)})">

			</div>
			<div><input style="display: none;"id="sj"></div>
			<div style="clear:both"></div>
		</div>
		<div id="personInfomationDivDlg" style="margin: 5px 0 0 8px;">
			<table id="personInfomationDivTable" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
				<thead>
				<tr>
					<th field="jftiPasernType" width="10" align="center">人员类型</th>
					<th field="jftiPersonName" width="10" align="center">人员</th>
					<th field="detailedAddress" width="15" align="center">设备地址</th>
				<%--<th field="jftiRecMode" width="10" align="center">识别模式</th>--%>
					<th field="jftiRecMode" width="10" align="center">识别类型</th>
				<%--<th field="jftiGuid" width="10" align="center">识别guid</th>--%>
					<th field="jfriShowTime" width="20" align="center">识别记录时间</th>
					<th field="jftiType" width="7" align="center">识别结果</th>
				</tr>
				</thead>
			</table>
			<%--分页--%>
		</div>
		<div id="personInfomationFenYe" style="width:99%"></div>
	</div>
	<%--图片窗口--%>
	<div id="personPhotoDiv" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<img id='img' src="" style='width: 100%;height: 96%;'>
		<%--<a id="al" style="position: absolute;left: 42%;top: 93%;" target="_blank">查看原图</a>--%>
	</div>
	<!-- 选择设备操作对话框 -->
	<div id="chooseOperateDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(6)" data-brand="10">设置随机密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(7)" data-brand="10">设置自定义密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(1)" data-brand="1,2">设置限时密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(2)" data-brand="1,2">获取密码列表</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(3)" data-brand="2">清空密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(4)" data-brand="1,2">获取开锁记录</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(5)"  data-brand="2,10,17,20,22"  data-devType="25,49" data-devSecondType="22,23,24,40">远程开锁</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="queryDeviceRecordDlg2()"  data-brand="2,10,17,20,22"  data-devType="25,49" data-devSecondType="22,24">开锁记录</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(52)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">添加密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(53)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">清空密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(54)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">启用密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(55)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">禁用密码</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(56)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">获取开锁记录</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(10)" data-brand="3,12,13" >查看详情</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(11)" data-brand="12,13" >断开</a>
		<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(12)" data-brand="12,13">闭合</a>
		<a id="OnValve" class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(50)" data-brand="21">开阀</a>
		<a id="OffValve" class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(51)" data-brand="21">关阀</a>

		<!-- 控制灯开关 -->
		<a id="OnLampRoad1" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(13)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="1">开灯（1路）</a>
		<a id="OnLampRoad2" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(14)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="2">开灯（2路）</a>
		<a id="OnLampRoad3" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(15)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="3">开灯（3路）</a>
		<a id="OnLampRoad4" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(16)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="4">开灯（4路）</a>
		<a id="OnLampRoad5" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(17)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="5">开灯（5路）</a>
		<a id="OnLampRoad6" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(18)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="6">开灯（6路）</a>
		<a id="OnLampRoad7" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(19)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="7">开灯（7路）</a>
		<a id="OnLampRoad8" class="easyui-linkbutton" style="margin:15px 0 0 10px;" data-devSecondType="1"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(20)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="8">开灯（8路）</a>
			
		<a id="OffLampRoad1" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(21)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="1">关灯（1路）</a>
		<a id="OffLampRoad2" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(22)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="2">关灯（2路）</a>
		<a id="OffLampRoad3" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(23)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="3">关灯（3路）</a>
		<a id="OffLampRoad4" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(24)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="4">关灯（4路）</a>
		<a id="OffLampRoad5" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(25)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="5">关灯（5路）</a>
		<a id="OffLampRoad6" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(26)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="6">关灯（6路）</a>
		<a id="OffLampRoad7" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(27)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="7">关灯（7路）</a>
		<a id="OffLampRoad8" class="easyui-linkbutton" style="margin:15px 0 0 10px;"hidden="hidden"
			plain="false" onclick="operateDeviceDlg(28)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="8">关灯（8路）</a>
		
		<!-- <a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="removeHsDevice()">移除设备</a> -->


		<!-- 控制插座 -->
		<a id="OnSocket" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(57)" data-brand="20" data-devType="35" data-devSecondType="25">通电</a>
		<a id="OffSocket" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(58)" data-brand="20" data-devType="35" data-devSecondType="25">断电</a>
		<a id="OffSocket1" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(577)" data-brand="20" data-devType="35" data-devSecondType="25">过热警报开</a>
		<a id="OffSocket1" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(588)" data-brand="20" data-devType="35" data-devSecondType="25">过热警报关</a>
		<a id="Temperature" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="Temperature()" data-brand="20" data-devType="35" data-devSecondType="25">设置警报温度</a>

		<!-- 冷暖灯控制 -->
		<a id="Electrify" class="easyui-linkbutton" style="margin:15px 0 0 10px;float: left"
		   plain="false" onclick="operateDeviceDlg(59)" data-brand="20" data-devType="13" data-devSecondType="31">开灯</a>
		<div id="BrightnessDiv" style="margin:5px 0 0 35px;display: none;float: left" >
			<input id="BrightnessStatus" hidden="hidden" value="01">
			亮度：<input id="Brightness" value="00" class="easyui-slider" data-options="showTip:false,onSlideEnd: function(value){
				operateDeviceDlg(61);}" data-options="min:10,max:90,step:1" style="width:300px;" data-brand="20" data-devType="13" data-devSecondType="31">
		</div>
		<div style="clear:both"></div>
		<a id="PowerFailure" class="easyui-linkbutton" style="margin:15px 0 0 10px;float:left;"
		   plain="false" onclick="operateDeviceDlg(60)" data-brand="20" data-devType="13" data-devSecondType="31">关灯</a>
		<div id="ColorTemperatureDiv" style="margin:5px 0 0 35px; display: none;float:left;">
			<input id="ColorTemperatureStatus" hidden="hidden"  value="00">
			色温：<input id="ColorTemperature" value="00" class="easyui-slider"data-options="showTip:false,onSlideEnd: function(value){
				operateDeviceDlg(62);}" data-options="min:10,max:90,step:1" style="width:300px" data-brand="20" data-devType="13" data-devSecondType="31">
		</div>
		<input id="LightingStatus"  hidden="hidden" value="00">
		<%--	<div class="easyui-slider" data-options="min:10,max:90,step:10" style="width:300px"></div>--%>

		<!-- 窗帘插座 -->
		<a id="OnCurtain" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(63)" data-brand="20" data-devType="16" data-devSecondType="6">开</a>
		<a id="OffCurtain" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(64)" data-brand="20" data-devType="16" data-devSecondType="6">关</a>

		<!-- 安防网关 -->
		<a id="outsideSG" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(65)" data-brand="20" data-devType="45" data-devSecondType="8">外出布防</a>
		<a id="insideSG" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(66)" data-brand="20" data-devType="45" data-devSecondType="8">在家布防</a>
		<a id="cancelSG" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(67)" data-brand="20" data-devType="45" data-devSecondType="8">撤防</a>

		<!-- 百分比窗帘插座 -->
		<a id="percentageCurtainOpen" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(68)" data-brand="20" data-devType="30" data-devSecondType="38">开</a>
		<a id="percentageCurtainClosure" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(69)" data-brand="20" data-devType="30" data-devSecondType="38">关</a>

		<!-- 2.4G插座 -->
		<a id="electricityOfSocket" class="easyui-linkbutton" style="margin:15px 0 0 10px;float:left;"
		   plain="false" onclick="operateDeviceDlg(70)" data-brand="20" data-devType="1" data-devSecondType="37">通电</a>
		<a id="outageOfSocket" class="easyui-linkbutton" style="margin:15px 0 0 10px;float:left;"
		   plain="false" onclick="operateDeviceDlg(71)" data-brand="20" data-devType="1" data-devSecondType="37">断电</a>

		<!-- 空调插座 -->
		<input id="airConditioningStatus"  hidden="hidden">
		<a id="onAirConditioning" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(72)" data-brand="20" data-devType="10" data-devSecondType="4">开</a>
		<a id="offAirConditioning" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(73)" data-brand="20" data-devType="10" data-devSecondType="4">关</a>

		<!-- 调节灯控制 -->
		<a id="adjustingLamp" class="easyui-linkbutton" style="margin:15px 0 0 10px;float: left"
		   plain="false" onclick="operateDeviceDlg(74)" data-brand="20" data-devType="13" data-devSecondType="36">开灯</a>

		<div id="adjustBrightnessDiv" style="margin:5px 0 0 35px;display: none;float: left" >
			<input id="adjustBrightnessStatus" hidden="hidden" value="01">
			亮度：<input id="adjustBrightness" value="00" class="easyui-slider" data-options="showTip:false,onSlideEnd: function(value){
				operateDeviceDlg(76);}" data-options="min:10,max:90,step:1" style="width:300px;" data-brand="20" data-devType="4" data-devSecondType="36">
		</div>

		<div style="clear:both"></div>
		<a id="PowerFailure" class="easyui-linkbutton" style="margin:15px 0 0 10px;float:left;"
		   plain="false" onclick="operateDeviceDlg(75)" data-brand="20" data-devType="4" data-devSecondType="36">关灯</a>
		<input id="adjustSwitchStatus" hidden="hidden" value="00">

		<!-- 电机正反控制盒插座 -->
		<a id="motorProsAndConsOpen" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(77)" data-brand="20" data-devType="16" data-devSecondType="41">开</a>
		<a id="motorProsAndConsClosure" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(78)" data-brand="20" data-devType="16" data-devSecondType="41">关</a>

		<!-- 智能空调遥控器 -->
		<input id="IntelligentAirConditioningStatus"  hidden="hidden">
		<a id="IntelligentAirConditioningOpen" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(79)" data-brand="20" data-devType="5" data-devSecondType="42">开</a>
		<a id="IntelligentAirConditioningClosure" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
		   plain="false" onclick="operateDeviceDlg(80)" data-brand="20" data-devType="5" data-devSecondType="42">关</a>

	</div>
	<!-- 执行操作设备对话框 -->
	<div id="operateDeviceDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<!-- 设置限时密码-->
		<div id="operateDevice1" operate>
			<div style="margin:10px 0 20px 150px;float:left;">
				限时密码：<input id="limitTimePassword" style="width:200px" clear="clear">
			</div>
			<div style="clear:both"></div>
			<div style="margin:10px 0 20px 150px;float:left;"id="passwordTime">
				到期时间：<input id="limitTimeEnd" class="Wdate" style="width:200px" clear="clear"
					onfocus="WdatePicker({minDate:'%y-%M-%d-%H-%m',dateFmt:'yyyy-MM-dd HH:MM',autoPickDate:true})" >
			</div>
			<div style="margin:10px 0 20px 150px;float:left;" id="passwordType">
				密码类型：<select id="limitPasswordType" style="width:120px">
					<option value="2">普通用户密码</option>
					<option value="1">管理员密码</option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style="text-align:center;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="operateDevice(1)">提交</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#operateDeviceDlg').dialog('close')">取消</a>
			</div>
		</div>
		<!-- 远程开门框-->
		<div id="RemoteOpenDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
			<div style="margin-left: 70px;">
			设备序列号：<input id="RemoteDeviceKey" style="width:200px;">
			</div>
			<input style="width:0px;hight:0px;border:none">

			<div style="margin:10px 0 0 0;text-align: center;">
				<a id="doRemoteOpen" class="easyui-linkbutton" iconcls="icon-save" onclick="doRemoteOpen()">确定</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#RemoteOpenDlg').dialog('close')">取消</a>
			</div>
		</div>
        <!-- 插座过热温度设定-->
        <div id="TemperatureDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
            <div style="margin-left: 70px;">
                温度：<input id="Centigrade" onmouseout="mouseout()" style="width:200px;">
            </div>
            <input style="width:0px;hight:0px;border:none"id="none">

            <div style="margin:10px 0 0 0;text-align: center;">
                <a id="doTemperature" class="easyui-linkbutton" iconcls="icon-save" onclick="operateDeviceDlg(589)">确定</a>
                <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#TemperatureDlg').dialog('close')">取消</a>
            </div>
        </div>
		<!-- 获取密码列表-->
		<div id="operatedevice" operate>
			<span style="color:red">设置临时密码后,可能会因为门锁服务商方面的问题,密码列表查询会有延迟的情况。</span>
			<table id="brandAllDeviceDg" style="width:98%;height:300px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="keyPass" width="40" align="center">密码</th>
						<th field="timeEnd" width="20" align="center">到期时间</th>
					</tr>
				</thead>
			</table>
		</div>
		<!-- 清空密码-->
		<div id="operateDevice3" operate>

		</div>
		<!-- 获取开锁记录-->
		<div id="operateDevice4" operate>
			<div style="margin:10px 0 10px 50px;float:left;">
				查询从 <input id="consoleTimeStart" class="Wdate" style="width:200px" pattern="单击选择时间" clear="clear"
					onfocus="WdatePicker({maxDate:'%y-%M-%d-%H-%m',dateFmt:'yyyy-MM-dd HH:MM',autoPickDate:true})" >开始到现在的开锁记录
				<a class="easyui-linkbutton" iconcls="icon-search" onclick="operateDevice(4)">查询</a>
			</div>
			<table id="deviceOpenRecordDg" style="width:98%;height:300px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="createTime" width="40" align="center">开锁时间</th>
					</tr>
				</thead>
			</table>
		</div>
		<!-- 远程开锁-->
		<div id="operateDevice5" operate>

		</div>
		<!-- 设置随机密码-->
		<div id="operateDevice6" operate>
			<div style="margin:10px 0 20px 150px;">
				密码类型：<select id="limitPasswordType6" style="width:200px" choose="choose">
					<option value="0">单次密码</option>
					<option value="1">限时密码</option>
					<!--<option value="2">永久密码</option>
					<option value="3">清空密码</option>-->
				</select>
			</div>
			<div style="margin:10px 0 20px 150px;">
				开始时间：<input id="limitTimeStart6" class="Wdate" style="width:200px" clear="clear"
					onfocus="WdatePicker({minDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'limitTimeEnd6\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" >
			</div>
			<div style="margin:10px 0 20px 150px;">
				到期时间：<input id="limitTimeEnd6" class="Wdate" style="width:200px" clear="clear"
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'limitTimeStart6\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" >
			</div>
			<div style="text-align:center;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="operateDevice(6)">提交</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#operateDeviceDlg').dialog('close')">取消</a>
			</div>
		</div>
		<!-- 设置自定义密码-->
		<div id="operateDevice7" operate>
			<div style="margin:10px 0 20px 174px;">
				操作：<select id="limitOperateType7" style="width:200px" choose="choose">
					<!-- <option value="0">随机密码</option>
					<option value="1">限时密码</option>-->
					<option value="2">固定密码</option>
					<option value="3">清空密码</option>
				</select>
			</div>
			<div style="margin:10px 0 20px 138px;">
				自定义密码：<input id="limitTimePassword7" style="width:200px" clear="clear">
			</div>
			<div style="margin:10px 0 20px 150px;">
				开始时间：<input id="limitTimeStart7" class="Wdate" style="width:200px" clear="clear"
					onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'limitTimeEnd7\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" >
			</div>
			<div style="margin:10px 0 20px 150px;">
				到期时间：<input id="limitTimeEnd7" class="Wdate" style="width:200px" clear="clear"
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'limitTimeStart7\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" >
			</div>
			<div style="text-align:center;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="operateDevice(7)">提交</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#operateDeviceDlg').dialog('close')">取消</a>
			</div>
		</div>
		<!-- 获取读数-->
		<div id="operateDevice10" operate>
		</div>
		<!-- 设置限时密码-->
		<div id="operateDevice52" operate>
			<div style="margin:10px 0 20px 150px;float:left;">
				密码：<input id="password52" style="width:200px" clear="clear" maxlength="10" data-type="number-positive">
				<span>（6-10位数字）</span>
			</div>
			<div style="clear:both"></div>
			<div style="text-align:center;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validate52()){operateDevice(52)}">提交</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#operateDeviceDlg').dialog('close')">取消</a>
			</div>
		</div>
	</div>


	<%--开锁记录窗口--%>
	<div id="queryDeviceRecordDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="width:100%;">
			<!-- 开锁记录列表 -->
			<table id="queryDeviceRecordTable" style="width:100%;height:260px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
				<thead>
				<tr>
					<th field="jglrBrand" width="15" align="center">品牌</th>
					<th field="jglrSn" width="15" align="center">设备SN</th>
					<th field="jglrRecordType" width="20" align="center">上报信息类型</th>
					<th field="popName" width="10" align="center">人口</th>
					<th field="suName" width="10" align="center">用户</th>
					<th field="jglrTime" width="20" align="center">时间</th>
				</tr>
				</thead>
			</table>
			<!-- 分页 -->
			<div id="queryDeviceRecordPageDiv" style="width:99%"></div>
		</div>
	</div>

	<%--新增开锁记录--%>
	<div id="queryDeviceRecordDlg2" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="width:100%;">
			<!-- 开锁记录列表 -->
			<table id="queryDeviceRecordTable2" style="width:100%;height:260px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
				<thead>
				<tr>
					<th field="jurOpenPeople" width="15" align="center">人员</th>
					<th field="devNickname" width="15" align="center">设备名称</th>
					<th field="hsAddCommunity" width="20" align="center">设备安装地址</th>
					<th field="jurOpenType" width="10" align="center">开锁类型</th>
					<th field="jurResult" width="10" align="center">开锁结果</th>
					<th field="jurOpenTime" width="20" align="center">开锁时间</th>
				</tr>
				</thead>
			</table>
			<!-- 分页 -->
			<div id="queryDeviceRecordPageDiv2" style="width:99%"></div>
		</div>
	</div>

	<!-- 修改设备类型 -->
	<div id="updateDevTypeDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<fieldset style="border: 0">
			<div style="margin:0 0 5px 5px;float:left;">
				一级类型：<select id="update_dev_first" style="width:130px;" onchange="change()">
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				二级类型：<select id="update_dev_second" style="width:130px;">
				</select>
			</div>
		</fieldset>
		<center style="margin:10px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateDev()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateDevTypeDlg').dialog('close')">关闭</a>
		</center>
	</div>

	<div id="queryDeviceDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<table id="queryDeviceTable" style="width:100%;height:400px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
			<thead>
			<tr>
				<th field="mac" width="20" align="center">设备号</th>
				<th field="build" width="15" align="center">楼栋</th>
				<th field="unit" width="20" align="center">单元</th>
				<th field="room" width="10" align="center">房号</th>
				<th field="name" width="10" align="center">联系人</th>
				<th field="phone" width="20" align="center">联系电话</th>
			</tr>
			</thead>
		</table>
	</div>
	<%--领虎设备--%>
	<div id="antQueryDeviceDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<legend>智能设备列表</legend>
		<div>
			<table id="antQueryDeviceTable" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
				<thead>
				<tr>
					<th field="devAntDeviceId" width="20" align="center">设备标识</th>
					<th field="devId" width="15" align="center">设备类型</th>
					<th field="devSn" width="20" align="center">设备序列号</th>
					<th field="devNickname" width="15" align="center">设备名称</th>
					<th field="operation" width="15" align="center" formatter="antAddFormatter">添加</th>
				</tr>
				</thead>
			</table>
		</div>
		<legend>待锁定设备列表</legend>
		<div>
			<table id="toBeLockedDeviceTable" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
				<thead>
				<tr>
					<th field="devAntDeviceId" width="20" align="center">设备标识</th>
					<th field="devId" width="15" align="center">设备类型</th>
					<th field="devSn" width="20" align="center">设备序列号</th>
					<th field="devNickname" width="15" align="center">设备名称</th>
					<th field="operation" width="15" align="center" formatter="antDeleteFormatter">删除</th>
				</tr>
				</thead>
			</table>
		</div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddDevice()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#antQueryDeviceDlg').dialog('close')">取消</a>
		</div>
	</div>

	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.intelligence.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/upload.js"></script>

</body>
</html>