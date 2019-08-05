<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>用户绩效数据统计</title>
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
	<script src="js/fg.public.js"></script>
	<script src="js/fg.achievementData.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div class="clearfix">
		<div style="margin:5px 0 5px 5px;color:black;float:left;">
			查询年份：<select id="searchYear" onchange="queryAchievementAndFinancial()" style="width:80px">
				<%
					Calendar cal = Calendar.getInstance();
					int year = cal.get(Calendar.YEAR);
					for (int i = year; i >= 2016; i--) {
						out.println("<option value='" + i + "'>" + i + "</option>");
					}
					/* out.println("<option value=''>全部</option>"); */
				%>
			</select>
		</div>
		<div style="margin:5px 0 5px 5px;color:black;float:left;">
			月份：<select id="searchMonth" onchange="queryAchievementAndFinancial()" style="width:80px">
				<%
					for (int i = 1; i < 13; i++) {
						out.println("<option value='" + i + "'>" + i + "</option>");
					}
					/* out.println("<option value=''>全部</option>"); */
				%>
			</select>
		</div>
	</div>
	<div id="DataGridStorefront" style="width:15%;height:90%;float:left">
		<table id="storefrontDg" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<!-- <th field="adOfficeId" width="10" align="center">区域编号</th> -->
					<th field="adOfficeName" width="25" align="center">区域</th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="DataGridDepartment" style="width:15%;height:90%;float:left">
		<table id="departmentDg" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<!-- <th field="adDeptId" width="10" align="center">部门编号</th> -->
					<th field="adDeptName" width="25" align="center">部门</th>
					</th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="DataGridUser" style="width:70%;height:90%;float:left">
		<table id="userDg" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="adEmpName" width="10" align="center">姓名</th>
					<th field="adHsNum" width="10" align="center">管房数量</th>
					<th field="adCost" width="10" align="center">月租总成本</th>
					<th field="adForecastIncome" width="10" align="center">月租预期总收入</th>
					<th field="adForecastDifference" width="10" align="center">月租预期差额</th>
					<th field="adRealIncome" width="10" align="center">月租实际总收入</th>
					<th field="adRealDifference" width="10" align="center">月租实际差额</th>
					<th field="adRentLossValue" width="10" align="center">金损值</th>
					<th field="adRentLossRate" width="10" align="center">金损率</th>
					<th field="adVacantDay" width="10" align="center">房空日次</th>
					<th field="adVacantRate" width="10" align="center">房空率</th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="financialDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<table id="financialDg" style="width:100%;height:450px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="address" width="20" align="center">地址</th>
					<th field="fdInPrice" width="10" align="center">收房价</th>
					<th field="fdTransactionPrice" width="10" align="center">最新成交价</th>
					<th field="fdDifference" width="10" align="center">差额</th>
					<th field="fdRentLossValue" width="10" align="center">金损值</th>
					<th field="fdRentLossRate" width="10" align="center">金损率</th>
					<th field="fdVacantDay" width="10" align="center">房空日次</th>
					<th field="fdVacantRate" width="10" align="center">房空率</th>
				</tr>
			</thead>
		</table>
	</div>
</body>
</html>