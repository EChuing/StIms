<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>集控设置</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>

	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div class="clearfix" style="padding:3px 0 0 5px;">
		<%--<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="openSingleControlWindow()">设备单控</a>--%>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add"  onclick="openSceneWindow()">批量设置情景模式</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="openPanelWindow()">批量设置情景面板</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="openSettingTypeWindow()">设置情景模式类型</a>
	</div>

	<div style="margin:5px 0 0 10px;float:left">
		情景归属地址 : <input id="address" onkeyup="searchOnkeyup(this.id,'querySituationalPatterns(1)')"/>
	</div>
	<div style="clear:both"></div>
	<!--主页面-->
	<div style="padding:10px 0 0 0;">
		<table id="noRentTable" style="width:100%;height:528px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="address" width="40" align="center">情景归属地址</th>
					<th field="allSpdDescribe" width="60" align="center">情景模式</th>
				</tr>
			</thead>
		</table>
		<div id="noRentTablePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<div id="noRentDlg" style="padding: 6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:3px 0 10px 0;color:black;font-size:13px;float:left">
			情景类型：<select  style="width:100px;" id="selectSituationalType3" onclick="querySituationalDirectives()"></select>
		</div>
		<table id="sence" style="width:100%;height:450px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
		</table>
        <div style="margin:20px 0 0 0;text-align: center;">
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="singleSaveInstruction()">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#noRentDlg').dialog('close')">取消</a>
        </div>
	</div>

	<!--情景设置窗口开始-->
	<div id="addScenWindowDlg" style="padding:6px;overflow-y: hidden" class="easyui-dialog" data-options="closed:true">
		<div class="process-bar" style="padding: 0 10px">
			<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.房源信息</span>
			<span class="process arrow-in arrow-out step2" data-step="2"><span class="process-require">*</span>2.情景设置</span>
		</div>

		<!--情景设置窗口第一页-->
		<div class="addScenWindowSteps">
			<div class="step addScenWindowStep1" >
				<hr color=#95b8e7 size=1 style="margin:10px 3px 10px 3px">
				<div style="margin:5px 0 10px 0;color:black;font-size:13px;float:left;">
					情景归属地址 : <input id="devAddress" onkeyup="searchOnkeyup(this.id, 'queryRoom(1)')" style="width:174px;">
				</div>
				<div style="margin:5px 0 0 10px;float:left">
					状态 : <select id="leaseType" onchange="queryRoom(1)">
						<option value="正常">正常</option>
						<option value="注销">注销</option>
					</select>
				</div>


				<table id="choseRoomsTable" style="width:100%;height:402px;table-layout:fixed;overflow-y: hidden"class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
					<thead>
					<tr>
						<th data-options="field:'ck',checkbox:true"></th>
						<th field="address" width="50" align="center">情景归属地址</th>
						<th field="hsState" width="25" align="center">状态</th>
					</tr>
					</thead>
				</table>
				<div id="choseRoomsTablePageDiv" style="width:99%;text-align:center;"></div>

				<div class="btn-bar" style="position: absolute;left: 46%;top:93%; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="nextStep();">下一步</a>
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="$('#addScenWindowDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>

		<!--情景设置窗口第二页-->
		<div class="addScenWindowSteps">
			<div class="step addScenWindowStep2" >
				<div style="padding:10px 0 0 5px;width:100%;float:left">
					<div style="margin:3px 0 10px 0;color:black;font-size:13px;float:left">
						情景类型：<select  style="width:100px;" id="selectSituationalType1"></select>
					</div>
					<div style="margin:0px 0 10px 0; float:left;">
						<a class="easyui-linkbutton" iconCls="icon-deviceManagement"
						   plain="true" id="fullyOpenEquipment" onclick="equipmentSwitch(1)">设备全开</a>
					</div>
					<div style="margin:0px 0 10px 0; float:left;">
						<a class="easyui-linkbutton" iconCls="icon-deviceManagement"
						   plain="true" id="equipmentClearance" onclick="equipmentSwitch(0)">设备全关</a>
					</div>
					<div style="clear:both"></div>
					<div style="margin-top:10px">
						<table id="choseDeviceTable" style="width:98%;height:400px;table-layout:fixed;overflow:hidden;"></table>
					</div>
					<div style="clear:both;"></div>
					<div style="margin:20px 0 0 0;text-align: center;">
						<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addScenWindow', 1);">上一步</a>
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="addScene()">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addScenWindowDlg').dialog('close')">取消</a>
					</div>
				</div>
			</div>
		</div>
	<!--情景设置窗口结束-->
	</div>

	<!--面板设置窗口开始-->
	<div id="addPanelWindowDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div class="process-bar" style="padding: 0 10px">
			<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.房源信息</span>
			<span class="process arrow-in arrow-out step2" data-step="2"><span class="process-require">*</span>2.面板设置</span>
		</div>

		<hr color=#95b8e7 size=1 style="margin:10px 3px 10px 3px">

		<!--面板设置第一页开始-->
		<div class="addPanelWindowSteps">
			<div class="step addPanelWindowStep1" >
				<div style="margin:5px 0 10px 5px;color:black;float:left;">
					情景归属地址 : <input id="addPanelDevAddress" onkeyup="searchOnkeyup(this.id, 'queryRooms(1)')" style="width:174px;">
				</div>
				<div style="margin:5px 0 10px 5px;float:left">
					状态 : <select id="addPanelLeaseType" onchange="queryRooms(1)">
					<option value="正常">正常</option>
					<option value="注销">注销</option>
				</select>
				</div>

				<table id="choseRoomsTable2" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true"></th>
							<th field="address" width="50" align="center">情景归属地址</th>
							<th field="hsState" width="25" align="center">状态</th>
						</tr>
					</thead>
				</table>

				<div id="choseRoomsTable2PageDiv" style="width:99%;text-align:center;"></div>

				<div class="btn-bar" style="margin: 10px 10px 10px 0; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="nextStep2(2);">下一步</a>
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="$('#addPanelWindowDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>

		<!--面板设置窗口第二页-->
		<div class="addPanelWindowSteps">
			<div class="step addPanelWindowStep2" >
				<div style="padding:0 0 0 5px;width:100%;">
					<div style="margin:5px 0 10px 0;color:black;font-size:13px;">
						情景类型：<select  style="width:200px;cursor: pointer;" id="selectSituationalType2"></select>
					</div>
					<!--面板信息表格-->
					<table id="choseDeviceTable2" style="width:98%;height:370px;table-layout:fixed;overflow:hidden;"></table>

					<div style="clear:both;"></div>

					<div style="margin:10px 0 0 0;text-align: center;">
						<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addPanelWindow', 1);">上一步</a>
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="addPanelScenario()">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addPanelWindowDlg').dialog('close')">取消</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--修改一二级设备指令窗口-->
	<div id="updateDeviceDlg" class="easyui-dialog" data-options="closed:true">
        <div id="DeviceDetailedInfoDiv" style="margin-top:10px">
        </div>
        <div style="clear: both"></div>
        <div style="margin:10px 0 0 0;text-align: center;">
            <a id="saveButton" class="easyui-linkbutton" iconcls="icon-save">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateDeviceDlg').dialog('close')">关闭</a>
        </div>
	</div>

	<!--设置情景模式类型开始-->
	<div id="situationalTypesDlg" class="easyui-dialog" data-options="closed:true">

		<div style="float:left;margin:5px 0 10px 0">
            <a style="float:left;" class="easyui-linkbutton" plain="true" iconcls="icon-add" onclick="openAddSettingType()">添加情景模式类型</a>
			<%--<a style="float:left;" class="easyui-linkbutton" plain="true" iconcls="icon-add" onclick="append2()">添加情景模式类型</a>--%>
			<a style="float:left;" class="easyui-linkbutton" plain="true" iconcls="icon-remove" onclick="cancelEditing()">取消编辑</a>
			<a style="float:left;" class="easyui-linkbutton" plain="true" iconcls="icon-save" onclick="accept2()">保存编辑</a>
		</div>

		<table id="addSettingTypeTable" style="width:100%;height:302px;margin-top:10px;table-layout:fixed;overflow:hidden;"class="easyui-datagrid"
			   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
		</table>

		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateSituationalTypes()">修改</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#situationalTypesDlg').dialog('close')">取消</a>
		</div>
	</div>

    <%--添加情景类型--%>
    <div id="addSituationalTypesDlg" class="easyui-dialog" data-options="closed:true">
        <div style="float:left;margin:5px 0 5px 0">
            <a style="float:left;" class="easyui-linkbutton" plain="true" iconcls="icon-add" onclick="addSettingType()">添加情景模式类型</a>
        </div>
        <div style="clear:both"></div>
        <div id="addSituationalTypeDiv" style="margin-left:5px;float:left">
        </div>
        <div style="clear:both"></div>
        <div style="margin:10px 0 0 0;text-align: center;">
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddSituationalTypes()">添加</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addSituationalTypesDlg').dialog('close')">关闭</a>
        </div>
    </div>

	<script src="js/fg.public.js"></script>
	<script src="js/fg.centralizedControlSettings.js"></script>
</body>
</html>