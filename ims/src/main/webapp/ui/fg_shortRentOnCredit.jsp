<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>挂账管理</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="js/config.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="margin:5px 0 0 5px;">
		<a class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="createNewFinancial()" id="screening">批量结清挂账</a>
	</div>
	<div style="margin:5px 0 0 5px">
		<div style="float:left;">
			渠道类型：<select id="jfBelongToChannel" onchange="queryFinancial(1)" >
			<select>
		</div>
		<div style="float:left;">
			结清挂账：<select id="jfCreditSituation" onchange="queryFinancial(1)" >
				<option value="1">否</option>
				<option value="0">是</option>
				<option value="">全部</option>
			<select>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div id="onCreditInfoDiv" style="margin-top:10px;width:100%;height:80%;">
		<table id="onCreditTable" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th field="jfAuditState" width="10" align="center" formatter="formatJfAuditState">财务状态</th>
					<th field="jfBillingDate" width="11" align="center">记账日期</th>
					<th field="jfTheOwnershipType" width="10" align="center">归属类型</th>
					<th field="jfBelongingToTheName" width="15" align="center">归属名称</th>
					<th field="jfClosedWay" width="10" align="center">账户类型</th>
					<th field="jfPayType" width="10" align="center" sortable="true">收支方式</th>
					<th field="jfNatureOfThe" width="10" align="center">收支性质</th>
					<th field="jfBigType" width="10" align="center">收支分类</th>
					<th field="jfAccountingSpecies" width="10" align="center" >收支种类</th>
					<th field="jfSumMoney" width="10" align="center" formatter="formatJfSumMoney">收支金额</th>
					<th field="jfSettlementMethod" width="10" align="center">结算方式</th> 
					<th field="jfCreditSituation" width="10" align="center" formatter="formatJfCreditSituation">结清挂账</th>
					<th field="jfNowBalance" width="10" align="center">账户余额</th> 
					<th field="handlersName" width="10" align="center">经手人</th>
					<th field="jfCheckInTime" width="20" align="center">登记日期</th>
					<th field="cashierPeopleName" width="10" align="center">记账人</th>
					<th field="reviewerName" width="10" align="center">审核人</th>
					<th field="reviewOneName" width="10" align="center">复核人</th>
					<th field="jfStrikeABalanceStatus" width="10" align="center" formatter="formatJfStrikeAbalanceStatus">冲账状态</th>
				</tr>
			</thead>
		</table>
		<!-- 收支分页 -->
		<div id="onCreditTablePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<div id="reconciliationDlg" class="easyui-dialog" data-options="closed:true">
		<input id="jfAccountId" type="hidden">
		<input id="batchClearCreditData" type="hidden">
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>收支归属</font>
			</legend>
			<div style='margin:5px 0 0 12px;float: left;'>
				流水号：<input style="width:126px" readonly="readonly"
						class="financialInfo_jfFinancialCoding">
			</div>
			<div style='margin:5px 0 0 0;float: left;display:none'>
				费用关联：<input style="width:60px" readonly='readonly'
					class="financialInfo_houseCoding"> <input
					style="display:none" class='financialInfo_jfId'><input
					style="display:none" class='financialInfo_jfStrikeBalanceEncoding'>
				<input style="display:none" class='financialInfo_index'>
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				归属类型：<input style="width:80px" readonly='readonly'
					class="financialInfo_jfTheOwnershipType">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				归属名称：<input style="width:80px" readonly="readonly"
					class="financialInfo_jfBelongingToTheName"> <input
					style="display:none" class="financialInfo_belongId">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				记账日期：<input style="width:70px" class="financialInfo_jfBillingDate"
					readonly='readonly'>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				费用归属：<input style="width:338px" readonly='readonly'
					class="financialInfo_jfAccountingWhy">
					<a  class="easyui-linkbutton" iconcls="icon-search" id="skipToCheckHouse" onclick="skipToCheckHouse()"> 查看客房</a>
			</div>
		</fieldset>
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>收支信息</font>
			</legend>
			<div style='margin:5px 0 0 0px;float: left;'>
				账户类型：<input readonly="readonly" style="width:90px"
					class="financialInfo_jfClosedWay">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户名称：<input readonly="readonly" style="width:130px"
					class="financialInfo_bankName">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户号码：<input readonly="readonly" style="width:180px"
					class="financialInfo_bankNums">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				收支性质：<input readonly="readonly" style="width:90px"
					class="financialInfo_jfNatureOfThe">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支种类：<input readonly="readonly"
					class="financialInfo_jfAccountingSpecies" style="width:130px">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户归属：<input readonly="readonly" style="width:180px"
					class="financialInfo_bankBelong">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				收支金额：<input readonly="readonly" style="width:90px"
					class="financialInfo_jfSumMoney">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支方式：<input readonly="readonly" style="width:130px"
					class="financialInfo_payType">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				归属周期：<input readonly="readonly" class='financialInfo_belongBegin'
					style="width:80px"> 到 <input readonly="readonly"
					class='financialInfo_belongEnd' style="width:80px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				账户余额：<input readonly="readonly" style="width:90px"
					class="financialInfo_nowBalance">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				票据编号：<input readonly="readonly" style="width:130px"
					class="financialInfo_nums">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				凭证号：<input style="width:180px" readonly="readonly"
					class="financialInfo_jfCertificateNumber">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>收支原因：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea readonly="readonly" style="width:540px;height:47px;"
					class="financialInfo_jfFinanNote"></textarea>
			</div>
			<div style="clear:both"></div>
			<div id="jfOperationRecordsDiv">
				<div style='margin:5px 0 0 0;float: left;'>操作记录：</div>
				<div style='margin:5px 0 0 0;float: left;'>
					<textarea style="width:540px;height:50px" readonly="readonly"
						class="financialInfo_jfOperationRecords"></textarea>
				</div>
			</div>
			<!-- <div id="jfStrikeABalanceReasonDiv" style="display:none">
				<div style='margin:5px 0 0 10px;float: left;'>冲账原因：</div>
				<div style='margin:5px 0 0 0;float: left;'>
					<textarea style="width:180px;height:50px" readonly="readonly"
						class="financialInfo_jfStrikeABalanceReason"></textarea>
				</div>
			</div> -->
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>其它信息</font>
			</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				财务状态：<input style="width:80px" readonly="readonly" class="financialInfo_jfAuditState">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				冲账状态：<input style="width:80px" readonly="readonly" class="financialInfo_jfStrikeAbalanceStatus">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				结算方式：<input style="width:80px" readonly="readonly" class="financialInfo_jfSettlementMethod">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				结清挂账：<input style="width:80px" readonly="readonly" class="financialInfo_jfCreditSituation">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>
				经手人：<input style="width:80px" readonly='readonly' class="financialInfo_handlersName">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				记账人：<input style="width:80px" readonly="readonly" class="financialInfo_cashierPeopleName">
			</div>
			<!-- <div style='margin:5px 0 0 10px;float: left;'>
				审核人：<input style="width:80px" readonly="readonly" class="financialInfo_reviewerName">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				复核人：<input style="width:80px" readonly="readonly" class="financialInfo_reviewOneName">
			</div> -->
			<div style="clear:both"></div>
		</fieldset>
		<div id="settleAccounts" style="margin:10px 0 0 40px;">
			<button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:10px 0 5px 75px;width:120px;" onclick="openCashDlg(1,0)">现金收银</button>
			<button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCashDlg(2,0)">扫码收银</button>
			<button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCashDlg(3,0)">台卡收银</button>
		</div>
		<div id="batchSettleAccounts" style="margin:10px 0 0 40px;">
			<button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:10px 0 5px 75px;width:120px;" onclick="openCashDlg(1,1)">现金收银</button>
			<button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCashDlg(2,1)">扫码收银</button>
			<button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCashDlg(3,1)">台卡收银</button>
		</div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 0;width:100%'>
			<center>
				<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)"> 上一条</a> 
				<a class="easyui-linkbutton" onclick="$('#financialInfoDlg').dialog('close')" iconcls="icon-cancel" onclick="">关闭</a> 
				<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)"> 下一条</a>
			</center>
		</div>
	</div>
	
	<!-- 对账结算窗口 -->
	<div id="openCashDlg" class="easyui-dialog" data-options="closed:true" style="text-align:center">
		<div class="cash qrCodeCustomer" style="margin:10% 0 0 27%">
			<div id="receivables" style="font-size:25px;float:left;">应收：</div>
			<div id="orderMoney" style="font-size:25px;float:left"></div>
			<div style="font-size:25px;float:left">元</div>	
		</div>
		<div style="clear:both"></div>
		<div class="cash qrCode" style="margin:5% 0 5% 0">
			<input id="moneyInput" type="number" style="width:300px;height:35px;border-radius:5px;font-size:20px;text-align:center" placeholder="" />
		</div>
		<div style="clear:both"></div>
		<div class="cash" style="margin:0 0 0 27%">
			<div style="font-size:25px;float:left">找零：</div>
			<div id="changeMoney" style="font-size:25px;float:left">0.00</div>
			<div style="font-size:25px;float:left">元</div>
		</div>
		<div style="margin:23% 0 0 0" >
			<button id="payType" type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="doCash(1)">现金收银</button>
		</div>
	</div>
	
	<script src="js/fg.public.js"></script>
	<script src="js/fg_shortRentOnCredit.js"></script>
</body>
</html>