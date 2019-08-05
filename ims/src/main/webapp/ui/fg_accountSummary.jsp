<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<%
	SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo");
%>
<div id="collectionAccountDlg" class="easyui-dialog"
	data-options="closed:true">
	<div class="bodyLoadingOver"></div>
	<input id="loginPurview" type="hidden"
		value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="padding: 5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-add-account" plain="true"
				onclick="addAccount()">添加账户</a> <a class="easyui-linkbutton"
				iconCls="icon-edit-number" plain="true" onclick="updateAccount()">修改账户</a>
			<a class="easyui-linkbutton" iconCls="icon-zijintiaopei" plain="true"
				onclick="moveAccount()">资金调配</a> <a class="easyui-linkbutton"
				iconCls="icon-chongxin" plain="true" onclick="reload()">重新统计账户余额</a>
		</div>
		<div
			style="margin: 5px 0 5px 15px; height: 20px; line-height: 20px; font-size: 13px; color: black; float: left;">
			记账日期：
			<button id="oneWeek" class="choose" data-cur="false"
				onclick="within1weeks()">1周内</button>
			&emsp;
			<button id="oneMonth" class="choose" data-cur="false"
				onclick="within1months()">1个月内</button>
			&emsp;
			<button id="threeMonths" class="choose" data-cur="false"
				onclick="within3months()">3个月内</button>
			&emsp;
		</div>
		<div
			style="margin: 8px 0 5px 15px; color: black; font-size: 13px; float: left;">
			记账日期 从： <input id="searchBillingDateFrom" style="width: 80px"
				type="text"
				onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchBillingDateTo\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:query()})">
			到 <input id="searchBillingDateTo" style="width: 80px" type="text"
				onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchBillingDateFrom\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:query()})">
		</div>
		<div style="clear: both"></div>
		<div
			style="margin: 8px 0 5px 15px; color: black; font-size: 13px; float: left;">
			账户类型： <select id="searchFaPaymentType" style="width: 80px"
				onchange="queryAccount(1,0)">
				<option></option>
			</select>
		</div>
		<div
			style="margin: 8px 0 5px 15px; color: black; font-size: 13px; float: left;">
			账户状态： <select id="searchFaState" style="width: 80px"
				onchange="queryAccount(1,0)">
			</select>
		</div>
		<div
				style="margin: 8px 0 5px 15px; color: black; font-size: 13px; float: left;">
			优先级： <select id="searchPriority" style="width: 80px"
				onchange="queryAccount(1,0)">
			<option></option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
		</select>
		</div>

		<div
			style="margin: 8px 0 5px 30px; height: 20px; line-height: 20px; color: black; float: left;">
			<span>查询账户总余额：</span> <span id="allCountSummary" style="color: blue;"></span>元
		</div>
		<div style="clear: both"></div>
	</div>
	<!--账户列表-->
	<div id="DataGridAccount" style="width: 100%;">
		<table id="accountDg"
			style="width: 100%; height: 402px; table-layout: fixed; overflow: hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				fitColumns:true,
				scrollbarSize:0,
				checkOnSelect: false,
				selectOnCheck: false">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th field="faPaymentType" width="10" align="center">账户类型</th>
					<th field="faUserName" width="30" align="center">账户名称</th>
					<th field="faBelonging" width="20" align="center">账户归属</th>
					<th field="faAccount" width="20" align="center">账户号码</th>
					<th field="faDescribe" width="20" align="center">账户描述</th>
					<th field="faTheInitialAmount" width="15" align="center">期初金额</th>
					<!-- <th field="faCalibrationAmount" width="15" align="center">校准金额</th> -->
					<th field="faTheBalanceOf" width="15" align="center">账户余额</th>
					<th field="financialSummary" width="15" align="center">收支统计</th>
					<th field="faState" width="10" align="center">账户状态</th>
				</tr>
			</thead>
		</table>
		<div id="accountPageDiv" style="width: 100%; text-align: center;"></div>
		<center style="margin:15px 0 15px 0 ">
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="javascript:$('#collectionAccountDlg').dialog('close')">关闭</a>
		</center>
	</div>
</div>
<div id="accountDbDlg" style="padding: 6px" class="easyui-dialog"
	data-options="closed:true">
	<div
		style="margin: 8px 0 5px 5px; height: 20px; line-height: 20px; color: black;">
		<span>收支总额：</span> <span id="summary" style="color: blue;"></span>
		元&emsp; <span>总收入：</span> <span id="income" style="color: blue;"></span>
		元&emsp; <span>总支出：</span> <span id="expenditure" style="color: blue;"></span>
		元&emsp; <span>总冲账：</span> <span id="strike" style="color: blue;"></span>
		元&emsp; <span>周期 从：</span>
		<!--<span id="startTime" style="color:blue;"></span> <span>到</span>
			<span id="endTime" style="color:blue;"></span>-->
		<input id="searchBillingDateFrom1" style="width: 80px" type="text"
			onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchBillingDateTo1\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial1(0,1,0)})">
		到 <input id="searchBillingDateTo1" style="width: 80px" type="text"
			onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchBillingDateFrom1\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial1(0,1,0)})">
		收支性质：<select id="searchNature" onchange="queryFinancial1(0,1,0)">
		<option></option>
		<option>收入</option>
		<option>支出</option>
		<option>冲账</option>
	</select>
	</div>
	<!--账户收支流水-->
	<div id="DataGridFinancial" style="width: 100%;">
		<table id="paymentInfoTable" class="easyui-datagrid"
			style="width: 1300px; height: 402px; table-layout: fixed; overflow: hidden;"
			data-options="rownumbers:false,
					singleSelect:true,
					autoRowHeight:false,
					pageSize:10,
					fitColumns:true,
					scrollbarSize:0">
			<thead>
				<tr>
					<th field="jfAuditState" width="10" align="center">财务状态</th>
					<!-- <th field="jfFinancialCoding" width="15" align="center">流水号</th> -->
					<th field="jfCertificateNumber" width="15" align="center">凭证号</th>
					<th field="jfBillingDate" width="11" align="center">记账日期</th>
					<th field="jfTheOwnershipType" width="10" align="center">归属类型</th>
					<th field="jfBelongingToTheName" width="15" align="center">归属名称</th>
					<th field="jfClosedWay" width="10" align="center">账户类型</th>
					<th field="jfNatureOfThe" width="10" align="center">收支性质</th>
					<th field="jfBigType" width="10" align="center">收支分类</th>
					<th field="jfAccountingSpecies" width="20" align="center">收支种类</th>
					<th field="jfSumMoney" width="10" align="center">收支金额</th>
					<th field="jfNowBalance" width="10" align="center">账户余额</th>
					<th field="jfFinanNote" width="10" align="center">收支原因</th>
					<th field="handlersName" width="10" align="center">经手人</th>
					<th field="jfCheckInTime" width="11" align="center">登记日期</th>
					<th field="cashierPeopleName" width="10" align="center">记账人</th>
					<th field="reviewerName" width="10" align="center">审核人</th>
					<th field="reviewOneName" width="10" align="center">复核人</th>
					<th field="jfStrikeABalanceStatus" width="10" align="center">冲账状态</th>
				</tr>
			</thead>
		</table>
		<!-- 收支分页 -->
		<div id="financialDetailPageDiv" style="width: 100%; text-align: center;"></div>
	</div>
</div>
<div id="addAccountDlg" style="padding: 6px" class="easyui-dialog"
	data-options="closed:true">
	<fieldset>
		<legend>
			账户信息
		</legend>
		<div style='margin: 5px 0 0 0; display: none' id="add_faState">
			账户状态：<select class="add_faState" style="width: 100px;">
			</select> <input class="add_faId" style="display: none">
		</div>
		<div style='margin: 5px 0 0 0;'>
			账户类型：<select class="add_faPaymentType" style="width: 100px;"
				needs="1">
				<option></option>
			</select>
			优先级：<select class="add_faRank" style="width: 47px;">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
		</div>
		<div style='margin: 5px 0 0 0;'>
			账户名称：<input class="add_faUserName" style="width: 200px;" needs="1">
		</div>
		<div style='margin: 5px 0 0 0;'>
			账户号码：<input class="add_faAccount" style="width: 200px;" needs="1">
		</div>
		<div style='margin: 5px 0 0 0;'>
			账户归属：<input class="add_faBelonging" style="width: 200px;" needs="1">
		</div>
		<div style='margin: 5px 0 0 0; float: left'>
			期初金额：<input type="number" data-type="money"
				id="add_faTheInitialAmount" style="width: 68px;">

		</div>
		<div style='margin: 5px 0 0 10px; float: left' id="updateButtionDiv">
			<a class="easyui-linkbutton"
				onclick="ifDisabled('add_faTheInitialAmount',1)"> 修改期初金额</a>
		</div>
		<!-- <div style='margin:5px 0 0 0;display:none' >
				校准金额：<input class="add_faCalibrationAmount" style="width:68px;" >
				<div style='margin:0 0 0 50px;float:left' >
					<a  class="easyui-linkbutton"
						onclick="ifDisabled('add_faCalibrationAmount',0)" > 修改校准金额</a>
				</div>
			</div> -->
		<div style='clear: both;'></div>
		<div style='margin: 5px 0 0 0; display: none' id="add_faTheBalanceOf">
			账户余额：<input class="add_faTheBalanceOf" style="width: 100px;"
				disabled="disabled">
		</div>
		<div style='margin: 5px 0 0 0; float: left;'>账户描述：</div>
		<div style='margin: 5px 0 0 0; float: left;'>
			<textarea class="add_faDescribe" style="width: 200px; height: 60px"></textarea>
		</div>
	</fieldset>
	<div id="addAccountSave" style="margin: 10px 0 10px 0;">
		<center>
			<a id="addSaveButton" class="easyui-linkbutton" iconcls="icon-save"
				onclick="doAddAccount()">保存</a> <a class="easyui-linkbutton"
				iconcls="icon-cancel"
				onclick="javascript:$('#addAccountDlg').dialog('close')">取消</a>
		</center>
	</div>
	<div id="updateAccountSave" style="margin: 10px 0 10px 0;">
		<center>
			<a class="easyui-linkbutton"
				iconcls="icon-save" onclick="doUpdateAccount()"
				id="saveUpdateAccount">保存</a> 
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="javascript:$('#addAccountDlg').dialog('close')">取消</a>
		</center>
	</div>
</div>
<!-- 资金调配 -->
<div id="moveAccountDlg" style="padding: 6px" class="easyui-dialog"
	data-options="closed:true">
	<div style='width: 49%; float: left'>
		<fieldset>
			<legend>
				转出账户
			</legend>
			<div style='margin: 5px 0 0 12px;'>
				账户类型：<input id="moveOutfaType" style="width: 200px;" needs="1" require="require"
					disabled="disabled">
			</div>
			<div style='margin: 5px 0 0 12px;'>
				账户名称：<input id="moveOutfaName" style="width: 200px;" needs="1" require="require"
					disabled="disabled">
			</div>
			<div style='margin: 5px 0 0 12px;'>
				账户号码：<input id="moveOutfaNum" style="width: 200px;" needs="1" require="require"
					disabled="disabled">
			</div>
			<div style='margin: 5px 0 0 12px;'>
				账户归属：<input id="moveOutfaBelong" style="width: 200px;"
					disabled="disabled"> <input id="moveOutfaId"
					style="display: none">
			</div>
			<div style='margin: 5px 0 0 12px;'>
				账户余额：<input id="moveOutfaMoney" style="width: 200px;"
					disabled="disabled">
			</div>
			<div style='margin: 5px 0 0 12px;'>
				金额变化：<span style="color: red; font-size: 14px;"> -</span><span
					id="moveOutfaChange" style="color: red; font-size: 14px;"></span> 元
			</div>
		</fieldset>
	</div>
	<div style='width: 49%; float: left'>
		<fieldset>
			<legend>
				转入账户
			</legend>
			<div style='margin: 5px 0 0 12px;'>
				账户类型：<select id="moveInfaType" style="width: 200px;"
					onchange="getAccountName()">
					<option></option>
				</select>
			</div>
			<div style='margin: 5px 0 0 12px;'>
				账户名称：<select id="moveInfaName" style="width: 200px;"
					onchange="getAccountAll()">
					<option></option>
				</select>
			</div>
			<div style='margin: 5px 0 0 12px;'>
				账户号码：<input id="moveInfaNum" style="width: 200px;"
					disabled="disabled">
			</div>
			<div style='margin: 5px 0 0 12px;'>
				账户归属：<input id="moveInfaBelong" style="width: 200px;"
					disabled="disabled"> <input id="moveInfaId"
					style="display: none">
			</div>
			<div style='margin: 5px 0 0 12px;'>
				账户余额：<input id="moveInfaMoney" style="width: 200px;"
					disabled="disabled">
			</div>
			<div style='margin: 5px 0 0 12px;'>
				金额变化：<span style="color: green; font-size: 14px;"> +</span><span
					id="moveInfaChange" style="color: green; font-size: 14px;"></span>
				元
			</div>
		</fieldset>
	</div>
	<div style='clear: both;'></div>
	<br>
	<center>
		<br> 调配金额：<input id="changeMoney" style="width: 100px;"
			type="number" data-type="money" onkeyup="changeMoney()"> <br>
		<br> <a class="easyui-linkbutton"
			iconcls="icon-save" onclick="doMoveAccount()" id="saveMoveAccount">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel"
			onclick="javascript:$('#moveAccountDlg').dialog('close')">取消</a>
	</center>
</div>
<div id="readonlyPaymentInfoTable" style="padding: 6px;"
	class="easyui-dialog"
	data-options="closed:true,
						title : '收支详细',
						width:700,
						height:450,
						cache : false,
						modal : true">
	<center>
		<table class="xwtable3" style="margin-top: 10px;">
			<tbody>
				<tr>
					<td>楼盘名称：</td>
					<td colspan="5"><span id="paymentInfoTableaddCommunity"></span>-<span
						id="paymentInfoTableaddBuilding"></span>-<span
						id="paymentInfoTableaddDoorplateno"></span></td>
				</tr>
				<tr>
					<td>财务状态：</td>
					<td><span id="paymentInfoTablejfAuditState"></span></td>
					<td>冲账状态：</td>
					<td><span id="paymentInfoTablejfStrikeABalanceStatus"></span></td>
					<td>经手人：</td>
					<td><span id="paymentInfoTablehandlersName"></span></td>
				</tr>
				<tr>
					<td>归属类型：</td>
					<td><span id="paymentInfoTablejfTheOwnershipType"></span></td>
					<td>归属名称：</td>
					<td><span id="paymentInfoTablejfBelongingToTheName"></span></td>
					<td>记账日期：</td>
					<td><span id="paymentInfoTablejfBillingDate"></span></td>
				</tr>
				<tr>
					<td>账户类型：</td>
					<td colspan="2"><span id="paymentInfoTablejfClosedWay"></span></td>
					<td>账户名称：</td>
					<td colspan="2"><span id="paymentInfoTablefaUserName"></span></td>
				</tr>
				<tr>
					<td>账户号码：</td>
					<td colspan="2"><span id="paymentInfoTablefaAccount"></span></td>
					<td>账户归属：</td>
					<td colspan="2"><span id="paymentInfoTablefaBelonging"></span></td>
				</tr>
				<tr>
					<td>收支性质：</td>
					<td><span id="paymentInfoTablejfNatureOfThe"></span></td>
					<td>收支类别：</td>
					<td><span id="paymentInfoTablejfBigType"></span></td>
					<td>收支种类：</td>
					<td><span id="paymentInfoTablejfAccountingSpecies"></span></td>
				</tr>
				<tr>
					<td>收支金额：</td>
					<td><span id="paymentInfoTablejfSumMoney"></span></td>
					<td>归属周期：</td>
					<td colspan="3"><span id="paymentInfoTablejfStartCycle"></span>
							到 <span id="paymentInfoTablejfEndCycle"></span></td>
				</tr>
				<tr>
					<td>票据编号：</td>
					<td><span id="paymentInfoTablejfTicketNumber"></span></td>
					<td>流水号：</td>
					<td><span id="paymentInfoTablejfFinancialCoding"></span></td>
					<td>凭证号：</td>
					<td><span id="paymentInfoTablejfCertificateNumber"></span></td>
				</tr>
				<tr>
					<td>收支原因：</td>
					<td colspan="5"><span id="paymentInfoTablejfFinanNote"></span></td>
				</tr>
				<tr>
					<td>操作记录：</td>
					<td colspan="5"><span id="paymentInfoTablejfOperationRecords"></span></td>
				</tr>
				<tr>
					<td>记账人：</td>
					<td><span id="paymentInfoTablecashierPeopleName"></span></td>
					<td>审核人：</td>
					<td><span id="paymentInfoTablereviewerName"></span></td>
					<td>复核人：</td>
					<td><span id="paymentInfoTablereviewOneName"></span></td>
				</tr>
			</tbody>
		</table>
	</center>
</div>
