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
	<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script	src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="js/vue.min.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/config.js"></script>
	<style>
		.right-table {
			width: 98%;
			border-collapse: collapse;
			color: black;
			margin:0 1% 0 1%
		}
		
		.right-table th {
			width: 25%;
			height: 24px;
			border: 1px #95B8E7 solid;
			text-align: center;
		}
		
		.right-table td {
			width: 25%;
			height: 24px;
			border: 1px #95B8E7 solid;
			text-align: center;
		}
		
		#price {
			width: 24%;
			text-align: right;
			padding-right: 1%;
		}
		
		.hidden {
			display:none
		}
		
		.title {
			width:100%;
			height:30px;
			font-size:18px;
			font-weight:bold;
			margin-top:5px
		}
		#tbtn{
			width:99.5%;
			height:30px;
			border:1px #ddd solid;
			margin-bottom:5px;
			text-align:center;
			line-height:30px;
			cursor:default;
			font-size:18px;
			font-weight:bold;
			-moz-border-radius: 10px;
		    -webkit-border-radius: 10px;
		    border-radius:10px;
		    background-Color:#7CB5EC;
			color:white;
		}
		
		.shadow{
			box-shadow: 1px 1px 1px 1px #4680b7;
		}
		
		.his{
			overflow:auto;
			margin:0 1% 0 1%
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style='padding-top:10px'>
		<div style="float:left;width:26%;height:auto;margin-right:0.5%;color:#7CB5EC;">
			<div id="tbtn" class="tbtn" v-bind:class="{'shadow': btnState}" v-on:click="changeTable" onmouseover="javascript:btnOver()" onmouseout="javascript:btnOut()">{{text}}</div>
			<table id="profitSpaceDg" class="easyui-datagrid"
				style="width:100%;height:480px;table-layout:fixed;overflow:hidden;"
				data-options="rownumbers:false,singleSelect:true,autoRowHeight:false,pageSize:9,fitColumns:true,scrollbarSize:0">
				<thead>
					<tr>
						<th field="caTime" width="15" align="center">统计日期</th>
						<th field="caName" width="20" align="center">报表名称</th>
						<th field="caType" width="10" align="center">周期</th>
						<th field="caCheckbox" width="" align="center" checkbox="true" hidden="true"></th>
					</tr>
				</thead>
			</table>
			<!-- 列表分页 -->
			<div id="profitSpacePageDiv" style="width:100%;text-align:center;"></div>
		</div>
		<div id="lirunkongjian" class="hidden"
			style="float:left;width:72%;height:540px;overflow:auto;color:black;border:1px #95B8E7 solid ;padding:2px;">
			<div class="title">押金类收支对比</div>
			<div id="yajin" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="deposit" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>房屋押金</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositHouse)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDepositHouse)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositHouse-ipsExpendDepositHouse)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>水电押金</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositWaterEle)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDepositWaterEle)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositWaterEle-ipsExpendDepositWaterEle)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>门卡押金</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositDoorCard)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDepositDoorCard)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositDoorCard-ipsExpendDepositDoorCard)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>车卡押金</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositCarCard)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDepositCarCard)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositCarCard-ipsExpendDepositCarCard)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>业主/租户退房押金</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositLandlord)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDepositRenter)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositLandlord-ipsExpendDepositRenter)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>订金</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositDeposit)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDepositDeposit)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositDeposit-ipsExpendDepositDeposit)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>装修押金</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositDecorate)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDepositDecorate)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDepositDecorate-ipsExpendDepositDecorate)).toFixed(2)}}</td>
				</tr>
			</table>
			<div class="title">能源类收支对比</div>
			<div id="nengyuan" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="energy" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>水费</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyWater)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendEnergyWater)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyWater-ipsExpendEnergyWater)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>电费</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyElectricity)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendEnergyElectricity)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyElectricity-ipsExpendEnergyElectricity)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>燃气费</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyGas)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendEnergyGas)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyGas-ipsExpendEnergyGas)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>网络费</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyNetwork)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendEnergyNetwork)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyNetwork-ipsExpendEnergyNetwork)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>电视</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyTv)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendEnergyTv)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyTv-ipsExpendEnergyTv)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>物业管理费</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyManagement)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendEnergyManagement)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyManagement-ipsExpendEnergyManagement)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>余款结算</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyBalance)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendEnergyBalance)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergyBalance-ipsExpendEnergyBalance)).toFixed(2)}}</td>
				</tr>
			</table>
			<div class="title">主营类收支对比</div>
			<div id="zhuying" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="main" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>租金</td>
					<td id='price'>{{parseFloat((ipsIncomeMainRental)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMainRental)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMainRental-ipsExpendMainRental)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>佣金服务费</td>
					<td id='price'>{{parseFloat((ipsIncomeMainCommission)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMainCommission)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMainCommission-ipsExpendMainCommission)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>车位租金</td>
					<td id='price'>{{parseFloat((ipsIncomeMainCarRental)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMainCarRental)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMainCarRental-ipsExpendMainCarRental)).toFixed(2)}}</td>
				</tr>
			</table>
			<div class="title">维修类收支对比</div>
			<div id="weixiu" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="maintenance" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>材料费</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenanceMaterial)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMaintenanceMaterial)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenanceMaterial-ipsExpendMaintenanceMaterial)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>人工费</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenanceArtificial)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMaintenanceArtificial)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenanceArtificial-ipsExpendMaintenanceArtificial)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>保洁费</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenanceClean)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMaintenanceClean)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenanceClean-ipsExpendMaintenanceClean)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>换锁</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenanceLock)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMaintenanceLock)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenanceLock-ipsExpendMaintenanceLock)).toFixed(2)}}</td>
				</tr>
			</table>
			<div class="title">财务类收支对比</div>
			<div id="caiwu" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="financial" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>税费</td>
					<td id='price'>{{parseFloat((ipsIncomeFinancialTaxes)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendFinancialTaxes)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeFinancialTaxes-ipsExpendFinancialTaxes)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>POS手续费/运营费</td>
					<td id='price'>{{parseFloat((ipsIncomeFinancialPos)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendFinancialPos)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeFinancialPos-ipsExpendFinancialPos)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>财务费用</td>
					<td id='price'>{{parseFloat((ipsIncomeFinancialFinancial)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendFinancialFinancial)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeFinancialFinancial-ipsExpendFinancialFinancial)).toFixed(2)}}</td>
				</tr>
			</table>
			<div class="title">其他类收支对比</div>
			<div id="qita" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="other" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>代缴费用</td>
					<td id='price'>{{parseFloat((ipsIncomeOtherBehalf)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendOtherBehalf)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeOtherBehalf-ipsExpendOtherBehalf)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>转账</td>
					<td id='price'>{{parseFloat((ipsIncomeOtherTransfer)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendOtherTransfer)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeOtherTransfer-ipsExpendOtherTransfer)).toFixed(2)}}</td>
				</tr>
			</table>
			<div class="title">债务债权类收支对比</div>
			<div id="zhaiwuzhaiquan" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="debt" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>借入款/贷出款</td>
					<td id='price'>{{parseFloat((ipsIncomeDebtBorrowed)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendCreditorLoan)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDebtBorrowed-ipsExpendCreditorLoan)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>应收/应还利息款</td>
					<td id='price'>{{parseFloat((ipsIncomeCreditorInterest)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDebtInterest)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeCreditorInterest-ipsExpendDebtInterest)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>应收/应还贷款</td>
					<td id='price'>{{parseFloat((ipsIncomeCreditorLoan)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDebtReimbursement)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeCreditorLoan-ipsExpendDebtReimbursement)).toFixed(2)}}</td>
				</tr>
			</table>
			<div class="title">违约类收支对比</div>
			<div id="weiyue" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="default" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>违约金</td>
					<td id='price'>{{parseFloat((ipsIncomeDefaultPenalty)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDefaultPenalty)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDefaultPenalty-ipsExpendDefaultPenalty)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>滞纳金</td>
					<td id='price'>{{parseFloat((ipsIncomeDefaultOverdue)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDefaultOverdue)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDefaultOverdue-ipsExpendDefaultOverdue)).toFixed(2)}}</td>
				</tr>
			</table>
			<div class="title">各类收支对比</div>
			<div id="heji" class="his">
				<my-component v-bind:list="list" v-bind:big-style="bigStyle"
					v-bind:item-style="itemStyle" v-bind:x-axis-style="xAxisStyle"
					v-bind:his-height="hisHeight" v-bind:style-income="styleIncome"
					v-bind:style-pay="stylePay" v-bind:style-none="styleNone"></my-component>
			</div>
			<table id="all" class="right-table">
				<tr>
					<th>项目</th>
					<th id='price'>收入</th>
					<th id='price'>支出</th>
					<th id='price'>收支差额</th>
				</tr>
				<tr>
					<td>押金类收支合计</td>
					<td id='price'>{{parseFloat((ipsIncomeDeposit)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDeposit)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDeposit-ipsExpendDeposit)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>能源类收支合计</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergy)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendEnergy)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeEnergy-ipsExpendEnergy)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>主营类收支合计</td>
					<td id='price'>{{parseFloat((ipsIncomeMain)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMain)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMain-ipsExpendMain)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>维修类收支合计</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenance)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendMaintenance)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeMaintenance-ipsExpendMaintenance)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>财务类收支合计</td>
					<td id='price'>{{parseFloat((ipsIncomeFinancial)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendFinancial)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeFinancial-ipsExpendFinancial)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>其他类收支合计</td>
					<td id='price'>{{parseFloat((ipsIncomeOther)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendOther)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeOther-ipsExpendOther)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>债权债务类收支合计</td>
					<td id='price'>{{parseFloat((ipsIncomeDebtCreditor)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDebtCreditor)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDebtCreditor-ipsExpendDebtCreditor)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>违约类收支合计</td>
					<td id='price'>{{parseFloat((ipsIncomeDefault)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpendDefault)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncomeDefault-ipsExpendDefault)).toFixed(2)}}</td>
				</tr>
				<tr>
					<td>总收支合计</td>
					<td id='price'>{{parseFloat((ipsIncome)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsExpend)).toFixed(2)}}</td>
					<td id='price'>{{parseFloat((ipsIncome-ipsExpend)).toFixed(2)}}</td>
				</tr>
			</table>
		</div>

	</div>
	<!-- 柱状图模板 -->
	<script type="text/template" id="tpl">
		<div :style="bigStyle">
		<div v-bind:style="itemStyle" v-for="item in list" style="border-bottom:1px #cdcdcd solid">
			<div style="width:60px;margin:0 auto">
				<template v-if="item.income>=item.pay && item.income!= 0">
				<div id="shou" style="width:50%;float:left">
					<div v-bind:style="[styleIncome,{height:hisHeight+'px'}]"></div>
				</div>
				<div id="zhi" style="width:50%;float:left">
					<div v-bind:style="[styleNone,{height:(1-item.pay/item.income)*hisHeight+'px'}]"></div>
					<div v-bind:style="[stylePay,{height:(item.pay/item.income)*hisHeight+'px'}]"></div>
				</div>
				</template>
				<template v-if="item.income < item.pay">
				<div id="shou" style="width:50%;float:left">
					<div v-bind:style="[styleNone,{height:(1-item.income/item.pay)*hisHeight+'px'}]"></div>
					<div v-bind:style="[styleIncome,{height:(item.income/item.pay)*hisHeight+'px'}]"></div>
				</div>
				<div id="zhi" style="width:50%;float:left">
					<div v-bind:style="[stylePay,{height:hisHeight+'px'}]"></div>
				</div>
				</template>
				<template v-if="item.income == 0 && item.pay == 0">
				<div id="shou" style="width:50%;float:left">
					<div v-bind:style="[styleNone,{height:hisHeight+'px'}]"></div>
				</div>
				<div id="zhi" style="width:50%;float:left">
					<div v-bind:style="[styleNone,{height:hisHeight+'px'}]"></div>
				</div>
				</template>
			</div>
		</div>
		<div v-bind:style="xAxisStyle" v-for="item in list">{{item.name}}</div>
		</div>
	</script>
	<script src="js/fg.profitSpace.js"></script>
</body>
</html>
