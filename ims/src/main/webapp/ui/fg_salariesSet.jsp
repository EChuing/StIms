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
	<script src="js/fg.salariesSet.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!--工资设置管理工具-->
	<div>
		<div style="margin:5px 0 0 5px;display:none;">
			<a class="easyui-linkbutton" onclick="()" iconCls="icon-add"
				plain="true">添加</a>
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
					onchange="querySalariesSet(1,0)">
					<option></option>
				</select>
			</div>
			<div
				style='margin:5px 0 5px 12px;color:black;font-size:13px;float: left;'>
				时间：<input id="searchTimeStart" class="Wdate"
					onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchTimeEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:querySalariesSet(1,0)})"
					style="width:80px"> 至：<input id="searchTimeEnd"
					class="Wdate"
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchTimeStart\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:querySalariesSet(1,0)})"
					style="width:80px">
			</div>
		</div>
		<div id="DataGridSalariesSet" style="width:100%;height:90%;">
			<table id="salariesSetDg"
				style="width:100%;height:90%;table-layout:fixed;overflow:hidden;"
				data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:10,
				fitColumns:true,
				scrollbarSize:0">
				<thead>
					<tr>
						<th field="storefrontname" width="20" align="center">所属区域</th>
						<th field="departmentname" width="20" align="center">所属部门</th>
						<th field="staffname" width="20" align="center">用户姓名</th>
						<th field="ssaBasicSalary" width="10" align="center">基本工资</th>
						<th field="ssaPayForPerformance" width="10" align="center">应发表现金</th>
						<th field="ssaRealWages" width="10" align="center">实发表现金</th>
						<th field="ssaSalaryShouldBeMade" width="10" align="center">应发提成金</th>
						<th field="ssaRealWageEarnings" width="10" align="center">实发提成金</th>
						<th field="ssaShouldThePostDays" width="10" align="center">应在岗天数</th>
						<th field="ssaNumberOfDays" width="10" align="center">实在岗天数</th>
						<th field="ssaDeductionOfWages" width="10" align="center">应扣工资</th>
						<th field="ssaWageLosses" width="10" align="center">挂账工资</th>
						<th field="ssaPaymentStatus" width="10" align="center">支付状态</th>
						<th field="ssaMonthlySalary" width="10" align="center">工资时间</th>
						<th field="ssaPaymentTime" width="10" align="center">支付时间</th>
						<th field="ssaRegisterTime" width="10" align="center">登记时间</th>
						<th field="ssaState" width="10" align="center">工资状态</th>
					</tr>
				</thead>
			</table>
			<!-- 工资设置分页 -->
			<div id="salariesSetPageDiv" style="width:100%;text-align:center;">
			</div>
		</div>
	</div>
</body>
</html>