<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>公司成本统计</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.companyCost.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div id="searchProject" style="padding:10px 0 0 5px">
		<div style="padding:0 0 5px 5px;color:black;float:left;">
			时间段：<input id="searchTimeStart"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryProject()})"
				style="width:80px"> 至：<input id="searchTimeEnd"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryProject()})"
				style="width:80px">
		</div>
		<!-- <div style="margin:-2px 0 5px 5px;color:black;float:left;">
			<a class="easyui-linkbutton" plain="false" onclick="getTotalResult()">结果汇总</a> 
		</div> -->
		<div style="padding:0 0 5px 5px;color:black;float:left;">
			总收入：<span id="totalIncome" style="color:blue"></span>
			总支出：<span id="totalExpenditure" style="color:blue"></span>
			总差额：<span id="totalDifference" style="color:blue"></span>
		</div>
	</div>
	<table id="projectDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
		data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
		<thead>
			<tr>
				<th field="hpType" width="10" align="center">分类</th>
				<th field="hpName" width="10" align="center">名称</th>
				<th field="totalIncome" width="10" align="center">总收入</th>
				<th field="totalExpenditure" width="10" align="center">总支出</th>
				<th field="totalDifference" width="10" align="center">总差额</th>
			</tr>
		</thead>
	</table>
	<!-- 成本统计 -->
	<div id="projectDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<table id="projectBigTypeDg" style="width:100%;height:302px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="bigType" width="20" align="center">大分类</th>
					<th field="income" width="10" align="center">收入</th>
					<th field="expenditure" width="10" align="center">支出</th>
					<th field="difference" width="10" align="center">差额</th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="projectPageDiv" style="width:100%;text-align:center;"></div>
</body>
</html>