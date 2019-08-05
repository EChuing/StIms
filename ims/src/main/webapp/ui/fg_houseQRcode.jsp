<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>未租房二维码</title>
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
	
	<!--托管房源列表-->
	<div id="DataGridTrusteeship" style="width:100%;">
		<table id="trusteeshipDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:false"></th>
					<th field="hsAddDistrict" width="15" align="center">城区</th>
					<th field="detailedAddress" width="30" align="center">房屋地址</th>
					<th field="hsSectionType" width="10" align="center">户型</th>
					<th field="hsHouseSquare" width="10" align="center">面积</th>
					<th field="hsHouseDirection" width="10" align="center">朝向</th>
					<th field="hsInPrice" width="10" align="center">当期成本价</th>
					<!-- <th field="hsOutPrice" width="10" align="center">出房价</th> -->
					<th field="hsGuidePrice" width="10" align="center">指导价</th>
					<th field="hsTransactionPrice" width="10" align="center">最新成交价</th>
					<th field="hsVacancyDay" width="10" align="center">空置天数</th>
					<th field="hsEndTime" width="10" align="center">托管到期</th>
					<th field="hsLeaseState" width="10" align="center">空置状态</th>
					<!-- <th field="hsEndTime1" width="16" align="center">发布招租</th> -->
					<th field="hsManagerUserName" width="10" align="center">房管员</th>
					<th field="hsDownDeposit" width="10" align="center" formatter="depositStateFormatter">下定状态</th>
					<th field="hsState" width="10" align="center">管理状态</th>
				</tr>
			</thead>
		</table>
		<div id="trusteeshipPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<script src="js/fg.public.js"></script>
	<script src="js/fg_houseQRcode.js"></script>
</body>
</html>