<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title></title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script	src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.salaries.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!--工资表管理工具-->
	<div>
		<div style="margin:5px 0 5px 5px">
			<a class="easyui-linkbutton" onclick="setSalaries()"
				iconCls="icon-shezhigongzi" plain="true">设置工资</a>
			<div style="margin:5px 0 5px 5px"></div>
		</div>
		<div style="height:auto">
			<div
				style='margin:5px 0 5px 12px;color:black;font-size:13px;float: left;'>
				区域：<select id='handlerStore' style="width:100px;"
					onchange="choseStore('handlerStore','handlerDept','handler')">
					<option></option>
				</select> 部门：<select id='handlerDept' style="width:100px;"
					onchange="choseDept('handlerDept','handler')">
					<option></option>
				</select> 用户：<select id='handler' style="width:100px;"
					onchange="querySalaries(1,0)">
					<option></option>
				</select>
				 姓名：<input id='handlerName' style="width:100px;"
					onkeyup="searchOnkeyup(this.id, 'querySalaries(1,0)')">
			</div>
		</div>
	</div>
	<div id="DataGridSalaries" style="width:100%;height:90%;">
		<table id="salariesDg"
			style="width:100%;height:auto;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:10,
				fitColumns:true,
				scrollbarSize:0">
			<thead>
				<tr>
					<th field="storefrontName" width="20" align="center">所属区域</th>
					<th field="departmentName" width="20" align="center">所属部门</th>
					<th field="suStaffName" width="10" align="center">用户姓名</th>
					<th field="suState" width="10" align="center">用户状态</th>
					<th field="suBasePay" width="10" align="center">基本工资</th>
					<th field="suMeritPay" width="10" align="center">表现金</th>
					<th field="suWageLosses" width="10" align="center">挂账工资</th>
					<th field="suBankType" width="20" align="center">银行名称</th>
					<th field="suBankCardNum" width="20" align="center">银行卡号</th>
				</tr>
			</thead>
		</table>
		<!-- 工资表分页 -->
		<div id="salariesPageDiv" style="width:100%;text-align:center;">
		</div>
	</div>
	</div>

	<div id="setSalariesDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div class="do_overDiv"></div>
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>用户信息</font>
			</legend>
			<div style='margin:5px 0 5px 36px;float: left;'>
				区域：<input style="width:100px" id="setSalariesStore"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 5px 36px;float: left;'>
				部门：<input style="width:100px" id="setSalariesDept"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 5px 36px;float: left;'>
				姓名：<input style="width:100px" id="setSalariesUserName"
					disabled="disabled"> <input style="display:none"
					id="setSalariesUserId">
			</div>
		</fieldset>
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>工资设置</font>
			</legend>
			<div style='margin:5px 0 5px 12px;float: left;'>
				基本工资：<input style="width:100px" id="addSuBasePay"
					onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
					onfocus="if (value =='0.00'){value =''}" needs="1">
			</div>
			<div style='margin:5px 0 5px 12px;float: left;'>
				表现金：<input style="width:100px" id="addSuMeritPay"
					onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
					onfocus="if (value =='0.00'){value =''}" needs="1">
			</div>
			<div style='margin:5px 0 5px 12px;float: left;'>
				挂账工资：<input style="width:100px" id="addSuWageLosses"
					onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
					onfocus="if (value =='0.00'){value =''}" needs="1">
			</div>
		</fieldset>
		<div style="clear:both"></div>
		</br>
		<div id="setSalariesTips" style="height:20px;width:100%;"></div>
		<center>
			<a  class="easyui-linkbutton"
				iconcls="icon-save" onclick="doSetSalaries()">保存</a> <a
				 class="easyui-linkbutton"
				onclick="$('#setSalariesDlg').dialog('close')" iconcls="icon-cancel">
				关闭</a>
		</center>
	</div>
</body>
</html>