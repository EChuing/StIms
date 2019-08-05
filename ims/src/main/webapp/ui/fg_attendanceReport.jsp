<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
<meta charset="utf-8">
<title>考勤报表</title>
<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
<link href="css/icon.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
<script src="js/config.js"></script>
<script src="js/fg.public.js"></script>
<script src="js/fg_attendanceReport.js"></script>
</head>

<body style="overflow-y: hidden">
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!-- 用easyui表格呈现 -->
	<div>
		<div style="margin:5px 0 0 5px;" id="openSetting">
			<a class="easyui-linkbutton" onclick="openAttendanceSetting()" iconCls="icon-attendanceSting" plain="true">考勤设置</a>
		</div>
		
		<div style="margin:10px 0 0 12px;float: left;">
			姓名：<input id="doRepairShowUserInfo" style="width:120px; cursor: pointer;" class="choose_user_button" doFlag="doRepair" doFun="checkAttendance(1,0)" readonly="readonly">
			<input id="doRepairGetUserStoreId" type="hidden">
			<input id="doRepairGetUserDetId" type="hidden">
			<input id="doRepairGetUserId" type="hidden">
			<div id="doRepairShowUserInfoDiv" style="display:none;"></div>
			<!-- <input style="width:90px;" id="jarName" onblur="inputOnblur()"> -->
		</div>
		<div style="margin:10px 0 0 5px;float: left;">
			日期筛选：<input id="jarStartTime" style="width:80px" class="Wdate" type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:checkAttendance(1,0)})">到
				  <input id="jarEndTime" style="width:80px" class="Wdate" type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:checkAttendance(1,0)})">
		</div>
		
	</div>
	<div style="clear:both"></div>
	<div style="width:100%">
		<div id="attendanceTableDg" style='margin:5px 0 5px 5px;width:99%;height:600px;'>
			<table id="attendanceTable">
			</table>
			<div id="attendanceTablePageDiv" style="width:100%;text-align:center;"></div>
		</div>
	</div>
	<span></span>
	<div id="updateAttendanceSetting" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="width:100%;text-align: center; " >
		<div id="updateAttendanceDiv" style='margin:5px 0 5px 5px;width:99%;height:150px;'>
			<div style="margin:15px 0 0 30px;float: left;">
				班次1 ：
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				上班时间：<input id="on1"  class="easyui-timespinner" style="width:90px;">
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				下班时间：<input id="off1" class="easyui-timespinner" style="width:90px;">
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				是否启用：<input id="status1" type="checkbox">
			</div>
			<div style="clear:both"></div>
			
			<div style="margin:15px 0 0 30px;float: left;">
				班次2 ：
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				上班时间：<input id="on2" class="easyui-timespinner" style="width:90px;">
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				下班时间：<input id="off2" class="easyui-timespinner" style="width:90px;">
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				是否启用：<input id="status2" type="checkbox" checked onchange="">
			</div>
			<div style="clear:both"></div>
			
			<div style="margin:15px 0 0 30px;float: left;">
				班次3 ：
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				上班时间：<input id="on3" class="easyui-timespinner" style="width:90px;">
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				下班时间：<input id="off3" class="easyui-timespinner" style="width:90px;">
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				是否启用：<input id="status3" type="checkbox" checked onchange="">
			</div>
			<div style="clear:both"></div>
			
			<div style="margin:15px 0 0 30px;float: left;">
				班次4 ：
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				上班时间：<input id="on4" class="easyui-timespinner" style="width:90px;">
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				下班时间：<input id="off4" class="easyui-timespinner" style="width:90px;">
			</div>
			<div style="margin:15px 0 0 30px;float: left;">
				是否启用：<input id="status4" type="checkbox" checked onchange="">
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="text-align: center; margin:30px 0 0 0">
		
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="attendanceShiftSetting()">保存</a>
		
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateAttendanceSetting').dialog('close')">关闭</a>
		
		</div>
	</div>
	<div id="modifyAttendanceData"  style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin:15px 0 0 30px;float: left;">
			区域：<input id="storefront" disabled="disabled" style="width:90px;">
		</div>
		<div style="margin:15px 0 0 30px;float: left;">
			部门：<input id="department" disabled="disabled" style="width:90px;">
		</div>
		<div style="margin:15px 0 0 30px;float: left;">
			姓名：<input id="workName" disabled="disabled" style="width:90px;">
		</div>
		<div style="margin:15px 0 0 30px;float: left;">
			日期：<input id="workTime" disabled="disabled" style="width:90px;">
		</div>
		<div style="margin:15px 0 0 30px;float: left;">
			<a style="height: 20px"class="easyui-linkbutton" onclick="openPersonInfomationDiv()">识别记录</a>
		</div>
		<div style="clear:both;margin:0 0 20px 0;"></div>
		<table class="showtable w18">
			<tr>
				<td >所属班次</td>
				<td class="cOn1">上班1</td>
				<td class="cOff1">下班1</td>
				<td class="cOn2">上班2</td>
				<td class="cOff2">下班2</td>
				<td class="cOn3">上班3</td>
				<td class="cOff3">下班3</td>
				<td class="cOn4">上班4</td>
				<td class="cOff4">下班4</td>
			</tr>
			<tr>
				<td>打卡时间</td>
				<td class="cOn1" id="hOn1"></td>
				<td class="cOff1" id="hOff1"></td>
				<td class="cOn2" id="hOn2"></td>
				<td class="cOff2" id="hOff2"></td>
				<td class="cOn3" id="hOn3"></td>
				<td class="cOff3" id="hOff3"></td>
				<td class="cOn4" id="hOn4"></td>
				<td class="cOff4" id="hOff4"></td>
			</tr>
			<tr>
				<td>电脑名称</td>
				<td class="cOn1"></td>
				<td class="cOff1"></td>
				<td class="cOn2"></td>
				<td class="cOff2"></td>
				<td class="cOn3"></td>
				<td class="cOff3"></td>
				<td class="cOn4"></td>
				<td class="cOff4"></td>
			</tr>
			<tr>
				<td>MAC地址</td>
				<td class="cOn1"><!--ae:12:wd:1d:12--></td>
				<td class="cOff1"><!--ae:12:wd:1d:12--></td>
				<td class="cOn2"><!--ae:12:wd:1d:12--></td>
				<td class="cOff2"><!--ae:12:wd:1d:12--></td>
				<td class="cOn3"><!--ae:12:wd:1d:12--></td>
				<td class="cOff3"><!--ae:12:wd:1d:12--></td>
				<td class="cOn4"><!--ae:12:wd:1d:12--></td>
				<td class="cOff4"><!--ae:12:wd:1d:12--></td>
			</tr>
			<tr>
				<td class="">电脑标识</td>
				<td class="cOn1"><!--内部电脑--></td>
				<td class="cOff1"><!--内部电脑--></td>
				<td class="cOn2"><!--内部电脑--></td>
				<td class="cOff2"><!--内部电脑--></td>
				<td class="cOn3"><!--内部电脑--></td>
				<td class="cOff3"><!--内部电脑--></td>
				<td class="cOn4"><!--内部电脑--></td>
				<td class="cOff4"><!--内部电脑--></td>
			</tr>
			<tr>
				<td>外网IP</td>
				<td class="cOn1"><!--120.1.1.1--></td>
				<td class="cOff1"><!--120.1.1.1--></td>
				<td class="cOn2"><!--120.1.1.1--></td>
				<td class="cOff2"><!--120.1.1.1--></td>
				<td class="cOn3"><!--120.1.1.1--></td>
				<td class="cOff3"><!--120.1.1.1--></td>
				<td class="cOn4"><!--120.1.1.1--></td>
				<td class="cOff4"><!--120.1.1.1--></td>
			</tr>
		</table>
		<div style="clear:both"></div>
		<div style="margin: 20px 0 20px 0">
			<div style="margin:0 0 0 30px;float: left;">考勤备注：</div>
			<textarea id="workRemarks" style="width:700px;height:50px;float: left;"></textarea>
		<div>
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 0; text-align:center;">
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="modifyAttendanceDataSave()">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#modifyAttendanceData').dialog('close')">关闭</a>
		</div>
	</div>
		</div>
	</div>
	</div>
	<div id="personInfomationDiv" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin: 5px 0 0 8px;" >
			<div style="float: left;margin-left: 20px;">
				人员：
				<input id="userName" type="text" readonly="readonly" style="width:150px;"onkeyup="selectIonInformation(1,3)">
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
	<div id="personPhotoDiv" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<img id='img' src="" style='width: 100%;height: 96%;'>
		<%--<a id="al" style="position: absolute;left: 42%;top: 93%;" target="_blank">查看原图</a>--%>
	</div>
</body>
</html>