<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>客账查询</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="js/config.js"></script>
	<script src="js/jquery.selectseach.min.js"></script>
	<style rel="stylesheet">
	.choose {
		height: 20px;
		line-height: 17px;
		vertical-align: 2px;
		font-size: 12px;
		font-weight: 400;
		font-family: \5b8b\4f53;
		border: 1px solid #ccc;
		background-color: #ccc;
		color: #333;
		padding: 0 10px;
		display: inline-block;
		background: url(images/button.png) 0 -300px repeat-x;
		cursor: pointer;
		outline: 0;
		overflow: visible;
		border-radius: 2px;
		-webkit-tap-highlight-color: rgba(0, 0, 0, .3);
	}
	
	.choose-cur {
		background-position: 0 0;
		border-color: #95b8e7;
	}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<!--收支管理工具-->
		<div>
			<div style="padding:5px 0 5px 5px;">
				<!-- <a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="addFinancialButton" onclick="addFinancial(0)">新增收支</a> 
				<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="addDebtButton" onclick="addFinancial(1)">新增欠结补结</a> 
				<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="newAddFinancialButton" onclick="addFinancial(2)">新增代缴记录</a> 
				<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="setRenterEveryFinancialButton" onclick="setRenterEveryFinancial()">账单收款</a> 
				<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="setRenterNewFinancialButton" onclick="setRenterNewFinancial()">新签收款</a>
				<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="addCertificateNumberDlg()">生成凭证号</a> 
				<a class="easyui-linkbutton" iconCls="icon-pingzhenghao-guanli" plain="true" id="certificateNumberButton" onclick="certificateNumberDlg()">凭证管理</a>
				<a class="easyui-linkbutton" iconCls="icon-shouzhizhanghuguanli" plain="true" id="collectionAccountButton" onclick="collectionAccount()">收款账户</a> -->
				<a class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="advancedScreening(1)" id="screening">高级筛选</a>
			</div>
			<div id="searchfinancial" style="padding:0 0 0 5px" class="advancedScreening">
				<div class="advanced1">
					<div
						style="padding:5px 0 5px 5px;color:black;float:left;display:none">
						城市：<select id="searchCity" onchange="queryHouseCity()"
							style="width:80px">
						</select>
					</div>
					<div
						style="padding:5px 0 5px 17px;color:black;float:left;display:none">
						片区：<select id="searchZone" onchange="queryFinancial(1,0)"
							style="width:80px">
							<option></option>
						</select>
					</div>
					<div
						style="padding:5px 0 5px 5px;color:black;float:left;">
						楼盘名称：<input id="searchCommunity"
							onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')" style="width:80px">
					</div>
					<div
						style="padding:5px 0 5px 29px;color:black;float:left;">
						楼栋：<input id="sourceBuilding" onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')"
							style="width:80px">
					</div>
					<div
						style="padding:5px 0 5px 17px;color:black;float:left;">
						门牌号：<input id="sourceDoorplateno"
							onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')" style="width:80px">
					</div>
					<div style="padding:3px 0 5px 5px;color:black;float:left;">
						审核状态：<select id="searchJfAuditState" onchange="queryFinancial(1,0)"
							style="width:80px">
							<option value="">全部</option>
							<option value="未审核">未审核</option>
							<option value="已审核">已审核</option>
							<option value="已复核">已复核</option>
							<option value="审核不通过">审核不通过</option>
							<option value="复核不通过">复核不通过</option>
							<option value="被冲账">被冲账</option>
							<option value="无效">无效</option>
						</select>
					</div>
					<!-- <div style="padding:3px 0 5px 10px;color:black;float:left;">
						<a class="easyui-linkbutton" iconcls="icon-search" id="financilSearchButton" >分类查询</a>
						<div id="financilSearchDiv">
							
						</div>
					</div> -->
					<input id="financilSearchJfNatureOfThe" style="display:none">
					<input id="financilSearchJfBigType" style="display:none">
					<input id="financilSearchJfAccountingSpecies" style="display:none">
					<div style="padding:0 0 5px 10px;color:black;float:left;">
						<a class="easyui-linkbutton" iconcls="icon-yingchang" id="dgShowOrHideButton"  onclick="dgShowOrHideDlg()">显示/隐藏列</a>
					</div>
					<div style="padding:0 0 5px 10px;color:black;float:left;">
						<div id="showTheSortButton" class="showTheSortButton" onclick="showTheSortDlg()" >排序方式<span id="showTheSortjia" class="showTheSortjia">+</span></div>
						<div class="theSortDlg" id="theSortDlg" style="height:75px;">
							<div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
							<div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse"  searchVal="2">倒序</div>
							<input type="hidden" id="theSortContraryInput"  value="2">
							<div class="theSortTerm theSortTermSelect" id="theSortTermjfCheckInTime" searchVal="1">登记日期</div>
							<div class="theSortTerm" id="theSortTermjfBillingDate" searchVal="2">记账日期</div>
							<input type="hidden" id="theSortTermInput" value="1">
						</div>
					</div>
				</div>
				<div class="advanced2">
					<div style="clear:both"></div>
					<div style="padding:0 0 5px 29px;color:black;float:left;">
						城区：<select id="searchDistrict" onchange="queryFinancial(1,0)"
							style="width:80px">
							<option></option>
						</select>
					</div>
					<div style="padding:0 0 5px 5px;color:black;float:left;">
						冲账状态：<select id="searchJfStrikeAbalanceStatus"
							onchange="queryFinancial(1,0)" style="width:80px">
							<option></option>
						</select>
					</div>
					<div style="padding:0 0 5px 5px;color:black;float:left;">
						归属类型：<select id="searchJfTheOwnershipType"
							onchange="queryFinancial(1,0)" style="width:80px">
							<option></option>
						</select>
					</div>
					<div style="padding:0 0 5px 5px;color:black;float:left;">
						账户类型：<select style="width:80px" onchange="changeWay(0)"
							id="searchWay">
							<option></option>
						</select>
					</div>
					<div style="padding:0 0 5px 5px;color:black;float:left;">
						账户名称：<select style="width:140px" id="searchAccountName"
							onchange="queryFinancial(1,0)">
							<option></option>
						</select>
					</div>
					<div style="padding:0 0 5px 5px;color:black;float:left;">
						收支方式：<select style="width:60px" class="financial_payType" id="searchPayType"
							onchange="queryFinancial(1,0)">
							<option></option>
						</select>
					</div>
				</div>
				<div class="advanced3">
					<div style="clear:both"></div>
					<div style="padding:3px 0 5px 17px;color:black;float:left;">
						凭证号：<input id="searchJfCertificateNumber"
							onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')" style="width:80px">
					</div>
					<div style="padding:3px 0 5px 17px;color:black;float:left;display：none">
						流水号：<input id="searchJfFinancialCoding"
							onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')" style="width:80px">
					</div>
					<div style="padding:3px 0 5px 5px;color:black;float:left;">
						票据编号：<input id="searchJfTicketNumber"
							onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')" style="width:80px">
					</div>
					<div style="padding:3px 0 5px 5px;color:black;float:left;">
						登记时间段：<input id="searchJfCheckInTimeStart"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
							style="width:80px"> 至：<input id="searchJfCheckInTimeEnd"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
							style="width:80px">
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--收支管理列表-->
	<div id="DataGridFinancial" style="width:100%;height:80%;">
		<table id="financialDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" 
			data-options="rownumbers:false,singleSelect:true,autoRowHeight:false,pageSize:10,fitColumns:true,scrollbarSize:0">
			<thead>
				<tr>
					<th field="jfAuditState" width="10" align="center" formatter="formatJfAuditState">财务状态</th>
					<th field="jfCertificateNumber" width="15" align="center" sortable="true">凭证号</th>
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
					<th field="jfFinanNote" width="10" align="center" sortable="true">收支原因</th>
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
		<div id="financialPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<div id="financialInfoDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
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
				<font style='font-size: 12px;font-family: ' 微软雅黑';' color='#50B4D2'>其它信息</font>
			</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				财务状态：<input style="width:80px" readonly="readonly"
					class="financialInfo_jfAuditState">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				冲账状态：<input style="width:80px" readonly="readonly"
					class="financialInfo_jfStrikeAbalanceStatus">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>
				经手人：<input style="width:80px" readonly='readonly'
					class="financialInfo_handlersName">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				记账人：<input style="width:80px" readonly="readonly"
					class="financialInfo_cashierPeopleName">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				审核人：<input style="width:80px" readonly="readonly"
					class="financialInfo_reviewerName">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				复核人：<input style="width:80px" readonly="readonly"
					class="financialInfo_reviewOneName">
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<div style='margin:10px 0 0 0;width:100%'>
			<center>
				<a  class="easyui-linkbutton"
					iconcls="icon-chongzhang" id="doStrike"
					onclick="updateFinancial(0)"> 冲账</a> <a 
					class="easyui-linkbutton" iconcls="icon-shenhe" id="doAuditOne"
					onclick="updateFinancial(1)"> 审核</a> <a 
					class="easyui-linkbutton" iconcls="icon-fuhe" id="doAuditTwo"
					onclick="updateFinancial(2)"> 复核</a> <a 
					class="easyui-linkbutton" iconcls="icon-up"
					onclick="laterOrNext(0)"> 上一条</a> <a 
					class="easyui-linkbutton"
					onclick="$('#financialInfoDlg').dialog('close')"
					iconcls="icon-cancel" onclick="">关闭</a> <a
					 class="easyui-linkbutton"
					iconcls="icon-down" onclick="laterOrNext(1)"> 下一条</a>
			</center>
		</div>
	</div>
	<div id="checkFinancial" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div id="strikeDiv" style="display:none">
			<div style='margin:5px 0 0 0;float: left;'>冲账原因：</div>
			<div style='margin:5px 0 10px 0;float: left;'>
				<textarea style="width:300px;height:70px"
					class="add_jfStrikeABalanceReason"></textarea>
			</div>
			<div style="clear:both"></div>
			<center>
				<a  class="easyui-linkbutton"
					iconcls="icon-save" onclick="doCheck(0)">保存</a> <a
					 class="easyui-linkbutton"
					onclick="$('#checkFinancial').dialog('close')"
					iconcls="icon-cancel">关闭</a>
			</center>
		</div>
		<div id="reviewerOneDiv" style="display:none">
			<div style='margin:5px 0 0 5px;float: left;'>
				是否通过：<select class="add_reviewerOneYesOrNo" style="width:100px;">
					<option value="0">通过</option>
					<option value="1">不通过</option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 10px 0;float: left;'>备注/原因：</div>
			<div style='margin:5px 0 10px 0;float: left;'>
				<textarea style="width:300px;height:40px"
					class="add_reviewerOneNote"></textarea>
			</div>
			<center>
				<a  class="easyui-linkbutton"
					iconcls="icon-save" onclick="doCheck(1)">保存</a> <a
					 class="easyui-linkbutton"
					onclick="$('#checkFinancial').dialog('close')"
					iconcls="icon-cancel">关闭</a>
			</center>
		</div>
		<div id="reviewerTwoDiv" style="display:none">
			<div style='margin:5px 0 0 5px;float: left;'>
				是否通过：<select class="add_reviewerTwoYesOrNo" style="width:100px;">
					<option value="0">通过</option>
					<option value="1">不通过</option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 10px 0;float: left;'>备注/原因：</div>
			<div style='margin:5px 0 10px 0;float: left;'>
				<textarea style="width:300px;height:40px"
					class="add_reviewerTwoNote"></textarea>
			</div>
			<center>
				<a  class="easyui-linkbutton"
					iconcls="icon-save" onclick="doCheck(2)">保存</a> <a
					 class="easyui-linkbutton"
					onclick="$('#checkFinancial').dialog('close')"
					iconcls="icon-cancel">关闭</a>
			</center>
		</div>
	</div>
	<!-- 选择隐藏列对话框 -->
	<div id="dgShowOrHideDlg" class="easyui-dialog"
		data-options="closed:true,
						title : '显示/隐藏列',
						width :400,
						height:180,
						cache : false,
						top   :100,
						modal : true">
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>选择列(勾选需要显示的列)</font>
			</legend>
			<div style="width:100%;height:85%;">
				<div style="margin:5px 0 0 10px;float:left">
					<input type="checkbox" id="allColumns" value="allColumns" onclick="dgShowOrHideSelectAll()"/>
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>全选</label>
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 10px;float:left">
						<input type="checkbox" value="jfCertificateNumber" id="dgShowOrHidejfCertificateNumber" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>凭证号</label>
				</div>
				<div style="margin:5px 0 0 22px;float:left">
						<input type="checkbox" value="jfClosedWay" id="dgShowOrHidejfClosedWay" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>账户类型</label>
				</div>
				<div style="margin:5px 0 0 10px;float:left">
						<input type="checkbox" value="jfPayType" id="dgShowOrHidejfPayType" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>收支方式</label>
				</div>
				<div style="margin:5px 0 0 10px;float:left">
						<input type="checkbox" value="jfFinanNote" id="dgShowOrHidejfFinanNote" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>收支原因</label>
				</div>   
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 10px;float:left">
						<input type="checkbox" value="handlersName" id="dgShowOrHidehandlersName" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>经手人</label>
				</div>
				<div style="margin:5px 0 0 22px;float:left">
						<input type="checkbox" value="jfCheckInTime" id="dgShowOrHidejfCheckInTime" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>登记日期</label>
				</div>
				<div style="clear:both"></div>
				<br>
				<center>
					<a class="easyui-linkbutton" iconcls="icon-save" onclick="doDgShowOrHide('financialDg')">保存</a> 
					<a class="easyui-linkbutton" onclick="$('#dgShowOrHideDlg').dialog('close')" iconcls="icon-cancel" >关闭</a>
				</center>
			</div>
	</div>
	<div id="paymentVoucherDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>查看付款凭证</legend>
			<div id="imgWrapper" class="clearfix"></div>
			<p>描述:</p>
			<p class="" id="describe"></p>
			<center>
				<a class="easyui-linkbutton" onclick="$('#paymentVoucherDlg').dialog('close')" iconcls="icon-cancel" >关闭</a>
			</center>
		</fieldset>
	</div>
	<!-- fg.public.js 要在 fg.financial.js之后加载，不然公司成本统计跳转过来，归属类型不能选中“其他类”-->
	<script src="js/fg_shotRentBudget.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.accountSummary.js"></script>
	<jsp:include page="/ui/fg_accountSummary.jsp"></jsp:include>
</body>
</html>