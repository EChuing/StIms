<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>房屋生态统计表</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/highcharts.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.houseFinancialEcology.js"></script>
	<style>
		.totalRusult {
			display: inline-block;
			width: 90px;
			margin: 7px 0;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div id="searchTrusteeship" style="padding:10px 0 0 5px">
		<div style="padding:0 0 5px 31px;color:black;font-size:13px;float:left;display:none">
			城市：<select id="searchCity" onchange="queryHouseCity()" style="width:80px">
			</select>
		</div> 
		<div style="padding:0 0 5px 31px;color:black;font-size:13px;float:left;">
			城区：<select id="searchDistrict" onchange="queryEcology(1)" style="width:100px">
				<option></option>
			</select>
		</div>
		<div style="padding:0 0 5px 5px;color:black;font-size:13px;float:left;display:none">
			片区：<select id="searchZone" onchange="queryEcology(1)" style="width:100px">
				<option></option>
			</select>
		</div>
		<div style="padding:0 0 5px 10px;color:black;font-size:13px;float:left;">
			楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryEcology(1)')" style="width:100px">
		</div>
		<div style="padding:0 0 5px 31px;color:black;font-size:13px;float:left;">
			楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryEcology(1)')" style="width:100px">
		</div>
		<div style="padding:0 0 5px 18px;color:black;font-size:13px;float:left;">
			门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryEcology(1)')" style="width:100px">
		</div>
		<div style="padding:0 0 5px 5px;color:black;float:left;">
			时间段：<input id="searchTimeStart"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryEcology(1)})"
				style="width:80px"> 至：<input id="searchTimeEnd"
				onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryEcology(1)})"
				style="width:80px">
		</div>
		<div style="margin:-2px 0 5px 5px;color:black;float:left;">
			<a class="easyui-linkbutton" plain="false" onclick="getTotalResult()">结果汇总</a> 
		</div>
	</div>
	<table id="ecologyDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
		data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
		<thead>
			<tr>
				<th field="feHsAddDistrict" width="10" align="center">城区</th>
				<th field="detailAddress" width="20" align="center">详细地址</th>
				<th field="totalVacancyDay" width="10" align="center">空置天数</th>
				<th field="totalVacancyCost" width="10" align="center">空置成本</th>
				<th field="feHsTransactionPrice" width="10" align="center">最新成交价</th>
				<th field="feHsInPrice" width="10" align="center">收房成本价</th>
				<th field="feHsOutPrice" width="10" align="center">出房价</th>
				<th field="feLandlordDeposit" width="10" align="center">房东当期押金</th>
				<th field="feRenterDeposit" width="10" align="center">租客当期押金</th>
				<th field="totalIncome" width="10" align="center">总收入</th>
				<th field="totalExpenditure" width="10" align="center">总支出</th>
				<th field="totalDifference" width="10" align="center">总差额</th>
			</tr>
		</thead>
	</table>
	<div id="ecologyPageDiv" style="width:100%;text-align:center;"></div>
	<!-- 房屋生态统计 -->
	<div id="ecologyDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<!-- <table id="ecologyBigTypeDg" style="width:100%;height:302px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="bigType" width="20" align="center">大分类</th>
					<th field="income" width="10" align="center">收入</th>
					<th field="expenditure" width="10" align="center">支出</th>
					<th field="difference" width="10" align="center">差额</th>
				</tr>
			</thead>
		</table> -->
		<div style="float:left;width:48%;">
			<table id="ecologyBigTypeDg" class="easyui-datagrid" style="width:100%;height:450px;table-layout:fixed;overflow:hidden;"
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
		<div style="float:left;width:48%;margin-left:4%">
			<table id="ecologySmallTypeDg" class="easyui-datagrid" style="width:100%;height:450px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="smallType" width="20" align="center">小分类</th>
						<th field="income" width="10" align="center">收入</th>
						<th field="expenditure" width="10" align="center">支出</th>
						<th field="difference" width="10" align="center">差额</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
	<div id="totalEcologyDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<table class="maintable hsInfo" style="margin-top:5px; width:600px">
			<center>
				<tbody>
					<tr>
						<td>总套数：</td>
						<td><span id="totalHouseNum"></span></td>
						<td>平均收房价：</td>
						<td><span id="avgInPrice"></span></td>
						<td>平均出房价：</td>
						<td><span id="avgOutPrice"></span></td>
					</tr>
					<tr>
						<td>总空置天数：</td>
						<td><span id="totalVacancyDay"></span></td>
						<td>平均空置天数：</td>
						<td><span id="avgVacancyDay"></span></td>
						<td>最小空置天数：</td>
						<td><span id="minVacancyDay"></span></td>
					</tr>
					<tr>
						<td>最大空置天数：</td>
						<td><span id="maxVacancyDay"></span></td>
						<td>总空置成本：</td>
						<td><span id="totalVacancyCost"></span></td>
						<td>平均空置成本：</td>
						<td><span id="avgVacancyCost"></span></td>
					</tr>
					<tr>
						<td>最小空置成本：</td>
						<td><span id="minVacancyCost"></span></td>
						<td>最大空置成本：</td>
						<td><span id="maxVacancyCost"></span></td>
						<td>房东总押金：</td>
						<td><span id="totalLandlordDeposit"></span></td>
					</tr>
					<tr>
						<td>租客总押金：</td>
						<td><span id="totalRenterDeposit"></span></td>
						<td>总收入：</td>
						<td><span id="totalIncome"></span></td>
						<td>总支出：</td>
						<td><span id="totalExpenditure"></span></td>
					</tr>
					<tr>
						<td>总差额：</td>
						<td><span id="totalDifference"></span></td>
						<td></td>
						<td><span></span></td>
						<td></td>
						<td><span></span></td>
					</tr>
				</tbody>
			</center>
		</table>
	</div>
</body>
</html>