<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>收支管理</title>
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
				<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="addFinancialButton" onclick="addFinancial(0)">新增收支</a> 
				<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="addDebtButton" onclick="addFinancial(1)">新增欠结补结</a> 
				<!-- <a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="newAddFinancialButton" onclick="addFinancial(2)">新增代缴记录</a>  -->
				<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="setRenterEveryFinancialButton" onclick="setRenterEveryFinancial()">账单收款</a> 
				<%--<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" id="setRenterNewFinancialButton" onclick="setRenterNewFinancial()">新签收款</a>--%>
				<!--<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="addCertificateNumberDlg()">生成凭证号</a>  -->
				<a class="easyui-linkbutton" iconCls="icon-pingzhenghao-guanli" plain="true" id="certificateNumberButton" onclick="certificateNumberDlg()">凭证管理</a>
				<a class="easyui-linkbutton" iconCls="icon-shouzhizhanghuguanli" plain="true" id="collectionAccountButton" onclick="collectionAccount()">收款账户</a>
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
					<div style="padding:3px 0 5px 10px;color:black;float:left;">
						<a class="easyui-linkbutton" iconcls="icon-search" id="financilSearchButton" >分类查询</a>
						<div id="financilSearchDiv">
						</div>
					</div>
					<input id="financilSearchJfNatureOfThe" style="display:none">
					<input id="financilSearchJfBigType" style="display:none">
					<input id="financilSearchJfAccountingSpecies" style="display:none">
					<div style="padding:3px 0 5px 10px;color:black;float:left;">
						<a class="easyui-linkbutton" iconcls="icon-yingchang" id="dgShowOrHideButton"  onclick="dgShowOrHideDlg()">显示/隐藏列</a>
					</div>
					<div style="padding:3px 0 5px 10px;color:black;float:left;">
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
					<div style="padding:5px 0 5px 29px;color:black;float:left;">
						城区：<select id="searchDistrict" onchange="queryFinancial(1,0)"
							style="width:80px">
							<option></option>
						</select>
					</div>
					<div style="padding:3px 0 5px 5px;color:black;float:left;">
						冲账状态：<select id="searchJfStrikeAbalanceStatus"
							onchange="queryFinancial(1,0)" style="width:80px">
							<option></option>
						</select>
					</div>
					<div style="padding:3px 0 5px 5px;color:black;float:left;">
						归属类型：<select id="searchJfTheOwnershipType"
							onchange="queryFinancial(1,0)" style="width:80px">
							<option></option>
						</select>
					</div>
					<div style="padding:3px 0 5px 5px;color:black;float:left;">
						账户类型：<select style="width:80px" onchange="changeWay(0)"
							id="searchWay">
							<option></option>
						</select>
					</div>
					<div style="padding:3px 0 5px 5px;color:black;float:left;">
						账户名称：<select style="width:140px" id="searchAccountName"
							onchange="queryFinancial(1,0)">
							<option></option>
						</select>
					</div>
					<div style="padding:3px 0 5px 5px;color:black;float:left;">
						收支方式：<select style="width:60px" class="financial_payType" id="searchPayType"
							onchange="queryFinancial(1,0)">
							<option></option>
						</select>
					</div>
				</div>
				<div class="advanced3">
					<div style="clear:both"></div>
					<div style="padding:0 0 5px 17px;color:black;float:left;">
						凭证号：<input id="searchJfCertificateNumber"
							onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')" style="width:80px">
					</div>
					<div style="padding:0 0 5px 17px;color:black;float:left;display:none">
						流水号：<input id="searchJfFinancialCoding"
							onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')" style="width:80px">
					</div>
					<div style="padding:0 0 5px 5px;color:black;float:left;">
						票据编号：<input id="searchJfTicketNumber"
							onkeyup="searchOnkeyup(this.id, 'queryFinancial(1, 0)')" style="width:80px">
					</div>
					<div style="padding:0 0 5px 5px;color:black;float:left;">
						登记时间段：<input id="searchJfCheckInTimeStart"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
							style="width:80px"> 至：<input id="searchJfCheckInTimeEnd"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
							style="width:80px">
						<button id="oneWk" class="choose" data-cur="false" onclick="oneWeeks()">1周内</button>
						&emsp;
						<button id="oneMon" class="choose" data-cur="false" onclick="oneMonths()">1个月内</button>
						&emsp;
						<button id="threeMon" class="choose" data-cur="false" onclick="threeMonths()">3个月内</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--收支管理列表-->
	<div id="DataGridFinancial" style="width:100%;height:80%;">
		<table id="financialDg"
			style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:10,
				fitColumns:true,
				scrollbarSize:0">
			<thead>
				<tr>
					<th field="jfAuditState" width="10" align="center" formatter="formatJfAuditState">财务状态</th>
					<th field="jfCertificateNumber" width="15" align="center" sortable="true">凭证号</th>
					<th field="jfFinancialCoding" width="10" align="center" sortable="true">流水号</th>
					<th field="jfTicketNumber" width="10" align="center" sortable="true">票据编号</th>  
					<th field="jfBillingDate" width="11" align="center">记账日期</th>
					<th field="jfAccountingWhy" width="20" align="center" sortable="true">归属地址</th>
					<th field="jfTheOwnershipType" width="10" align="center">归属类型</th>
					<th field="jfBelongingToTheName" width="15" align="center">归属名称</th>
					<th field="managerUserName" width="15" align="center">房管员</th>
					<th field="jfClosedWay" width="10" align="center">账户类型</th>
					<th field="jfPayType" width="10" align="center" sortable="true">收支方式</th>
					<th field="jfNatureOfThe" width="10" align="center">收支性质</th>
					<th field="jfBigType" width="10" align="center">收支分类</th>
					<th field="jfAccountingSpecies" width="10" align="center" >收支种类</th>
					<th field="jfSumMoney" width="10" align="center" formatter="formatJfSumMoney">收支金额</th> 
					<th field="jfNowBalance" width="10" align="center">账户余额</th> 
					<th field="faBelonging" width="10" align="center" sortable="true">账户归属</th>
					<th field="jfFinanNote" width="10" align="center" sortable="true">收支原因</th>
					<th field="handlersName" width="10" align="center">经手人</th>
					<th field="cashierPeopleName" width="10" align="center">记账人</th>
					<th field="reviewerName" width="10" align="center">审核人</th>
					<th field="reviewOneName" width="10" align="center">复核人</th>
					<th field="jfStrikeABalanceStatus" width="10" align="center" formatter="formatJfStrikeAbalanceStatus">冲账状态</th>
					<th field="jfCheckInTime" width="20" align="center">登记日期</th>
					
				
				</tr>
			</thead>
		</table>
		<!-- 收支分页 -->
		<div id="financialPageDiv" style="width:100%;text-align:center;">
		</div>
	</div>
	<!-- 新增收支 -->
	<div id="addFinancialDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true,modal : true">
		<fieldset>
			<legend>收支归属</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				费用归属：<input style="width:312px;cursor:pointer;" readonly='readonly' class="add_financial_belongAddress" require="require" clear="clear" onclick="relationDlg(0)">
				<input style="display:none" class="add_houseCoding" clear="clear">
				<input style="display:none" class='add_houseCodingType' clear="clear">
				<input style="display:none" class='addFinancialHouseId' clear="clear">
				<input style="display:none" class='addFinancialHouseStoreId' clear="clear">
				<input style="display:none" class='addFinancialHouseRentId' clear="clear">
				<input style="display:none" class='addFinancialManagerUserId' clear="clear">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				经手人：<input id="addFinancialHandlerShowUserInfo" class="choose_user_button" doFlag="addFinancialHandler" doFun=""
						style="width:150px;cursor:pointer;" readonly="readonly" require="require" clear="clear">
					<input id="addFinancialHandlerGetUserStoreId" type="hidden" clear="clear">
					<input id="addFinancialHandlerGetUserDetId" type="hidden" clear="clear">
					<input id="addFinancialHandlerGetUserId" type="hidden" clear="clear">
					<div id="addFinancialHandlerShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				归属类型： 
				<select id="add_financial_belongType" class="add_financial_belongType"  style="width:100px;" clear="clear" require="require" onchange="belongTypeChange()">
					<option></option>
				</select>
				<input style="display:none" class='addFinancialRenterId' clear="clear">
				<input style="display:none" class='addFinancialLandlordId' clear="clear">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				归属名称：<input style="width:150px" readonly="readonly" class="add_financial_belongName" require="require" clear="clear"> 
					<input style="display:none" class="add_financial_belongId" clear="clear">
					<input style="display:none" class="add_financial_popId" clear="clear">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				记账日期：<input style="width:80px" class="add_financial_doTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})" require="require" clear="clear">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				账户类型：<select style="width:150px" onchange="changeWay(1)" class="add_financial_way" require="require" choose="choose">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户名称：<select style="width:150px" class="add_financial_accountName" onchange="getAccountId(0)" require="require" choose="choose">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支方式：<select style="width:80px" class="financial_payType" id="addFinancialPayType" require="require" choose="choose">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				账户号码：<input style="width:150px" disabled="disabled" class="add_financial_accountNums" clear="clear">
				<input style="display:none" class="add_financial_bankNums" clear="clear">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户归属：<input style="width:150px" disabled="disabled" class="add_financial_accountBelong" clear="clear">
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>收支信息</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				收支性质：<input style="width:60px" id="financilAddJfNatureOfThe" disabled="disable" require="require" clear="clear">
			</div>
			<div style='margin:5px 0 0 10px;float: left;' >
				收支分类：<input style="width:80px" id="financilAddJfBigType"  disabled="disable" require="require" clear="clear">
			</div>
			<div style='margin:5px 0 0 10px;float: left;' >
				收支种类：<input style="width:80px" id="financilAddJfAccountingSpecies"  disabled="disable" require="require" clear="clear">
			</div>
			<div style="margin:2px 0 0 10px;color:black;float:left;display:none" id="financilAddTypeDiv">
				<a class="easyui-linkbutton" iconcls="icon-search" id="financilAddButton" >选择分类</a>
				<div id="financilAddDiv"></div>
			</div>
			<div style="margin:2px 0 0 10px;color:black;float:left;display:none" id="financilOweTypeDiv">
				<a class="easyui-linkbutton" iconcls="icon-search" id="financilOweButton" >选择分类</a>
				<div id="financilOweDiv"></div>
			</div>
			<div style="margin:2px 0 0 10px;color:black;float:left;display:none" id="financilReplacedTypeDiv">
				<a class="easyui-linkbutton" iconcls="icon-search" id="financilReplacedButton" >选择分类</a>
				<div id="financilReplacedDiv"></div>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				收支金额：<input style="width:60px" class="add_financial_money" type="number" data-type="money" require="require" clear="clear">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				票据编号：<input style="width:143px" class="add_financial_nums" require="require" clear="clear">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				归属周期：<input class='Wdate'
					onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'add_financial_belongEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeDate(0)})"
					style="width:80px" id="add_financial_belongBegin" require="require" clear="clear"> 到 
					<input class='Wdate'
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'add_financial_belongBegin\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})"
					style="width:80px" id="add_financial_belongEnd" require="require" clear="clear">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>收支原因：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea style="width:273px;heigh:60px;" class="add_financial_note" clear="clear"></textarea>
			</div>
			<div style='margin:7px 0 0 20px;float: left;'>
				<a class="easyui-linkbutton" iconcls="icon-add" style="display:none;"
					id="addToFinancialButton" onclick="addToDataGrid()">添加</a>
			</div>
		</fieldset>
		<div id="addFinancialSaveDiv" style="display:none">
			<div id="addFinancialTableDiv"
				style='margin:5px 0 5px 5px;width:99%;height:170px;'>
				<table id="addFinancialTable"></table>
				<div style="display:none">
					<table id="replacedFinancialTable" style="display:none"></table>
				</div>
			</div>
			<div>
				<div style='float: left;width:170px;height:25px;'>
					<div style='margin:5px 0 5px 0px;float: left;display:none;' id="renterBaseMoneyDiv">
						<span id="renterBaseMoneyInputSpan">租客历史欠结：</span>
						<input style="width:80px" disabled="disabled" id="renterBaseMoneyInputShow">
						<input style="width:80px" type="hidden" id="renterBaseMoneyInput">
					</div>
					<div style='margin:5px 0 5px 0px;float: left;display:none;' id="landlordBaseMoneyDiv">
						<span id="landlordBaseMoneyInputSpan">业主历史欠结：</span>
						<input style="width:80px" disabled="disabled" id="landlordBaseMoneyInputShow">
						<input style="width:80px" type="hidden" id="landlordBaseMoneyInput">
					</div>
				</div>
				<div id="addFinancialMoneyDiv">
					<div style='margin:5px 0 5px 10px;float: left;'>
						合计金额：<input style="width:80px" readonly="readonly" class="add_financial_moneyTotal" clear="clear">
					</div>
					<div style='margin:5px 0 5px 10px;float: left;'>
						实际金额：<input style="width:80px" type="number" data-type="money"
							class="add_financial_moneyGet" clear="clear">
					</div>
					<div style='margin:5px 0 5px 10px;float: left;'>
						欠结金额：<input style="width:80px" readonly="readonly" class="add_financial_moneySum" clear="clear">
					</div>
				</div>
				<div id="replacedFinancialMoneyDiv">
					<div style='margin:5px 0 5px 5px;float: left;'>
						合计金额：<input style="width:80px" id="replacedFinancialTotal" clear="clear">
					</div>
					<div style='margin:5px 0 5px 5px;float: left;'>
						代缴金额：<input style="width:80px" id="replacedFinancialEd" clear="clear">
					</div>
					<div style='margin:5px 0 5px 5px;float: left;'>
						租客欠结金额：<input style="width:80px" id="replacedFinancialTotalOwe" clear="clear">
					</div>
				</div>
				<div id="oweFinancialMoneyDiv">
					<div style='margin:5px 0 5px 12px;float: left;'>
						欠结金额：<input style="width:80px" id="owePayFinancialMoney" disabled="disabled" clear="clear">
					</div>
					<div style='margin:5px 0 5px 12px;float: left;'>
						补结金额：<input style="width:80px" id="oweGetFinancialMoney" disabled="disabled" clear="clear">
					</div>
				</div>
			</div>
			<div style="clear:both"></div>
			<center>
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddFinancial()" id="doAddFinancialButton">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doOweFinancial()" id="doOweFinancialButton">保存</a> 
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doReplacedFinancial()" id="doReplacedFinancialButton">保存</a> 
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addFinancialDlg').dialog('close')">关闭</a>
			</center>
		</div>
		<div id="updateFinancialSaveDiv" style="display:none;margin-top:10px;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateFinancial()">保存</a> 
			<a class="easyui-linkbutton"iconcls="icon-cancel"  onclick="$('#addFinancialDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<!-- 费用关联列表显示  -->
	<div id="relationDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div style="margin:5px 0 0 0;color:black;font-size:13px;float:left;"
			id="relationTypeDiv">
			关联类型：<select id="searchBelongType" onchange="relationDataGrid()"
				style="width:100px">
				<option value='1'>已租列表</option>
				<option value='2'>未租列表</option>
				<option value='3'>其他列表</option>
			</select> <input style="display:none" id="relationType">
		</div>
		<div style="clear:both"></div>
		<div id="relationSelect">
			<div style='margin:0 0 10px 0;'>
				<div
					style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;display:none">
					城市：<select id="searchAddCity" onchange="queryAddCity()"
						style="width:80px">
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					城区：<select id="searchAddDistrict" onchange="relationDate(1,0)"
						style="width:100px">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					片区：<select id="searchAddZone" onchange="relationDate(1,0)"
						style="width:100px">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘/小区：<input id="searchAddCommunity"
						onkeyup="searchOnkeyup(this.id, 'relationDate(1, 0)')" style="width:80px">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuilding"
						onkeyup="searchOnkeyup(this.id, 'relationDate(1, 0)')" style="width:60px">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplateno"
						onkeyup="searchOnkeyup(this.id, 'relationDate(1, 0)')" style="width:60px">
				</div>
				<!-- <div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;"t id="searchLeaseStateDiv" >
					房屋状态：<select id="searchState" onchange="relationDate(1,0)"
						style="width:90px">
					</select>
				</div> -->
			</div>
		</div>
		<div id="virtualRelationSelect" style="display:none;">
			<div style='margin:0 0 10px 0;'>
				<!-- <div style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualType">分类</label> <select
						style="width:104px;" id="searchVirtualType"
						onchange="relationDate(1,0)">
						<option value="0"></option>
						<option value="1">内部项目</option>
						<option value="2">外部项目</option>
						<option value="3">非成本项目</option>
					</select>
				</div> -->
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualName">名称</label> <input
						style="width:100px;" id="searchVirtualName"
						onkeyup="searchOnkeyup(this.id, 'relationDate(1, 0)')">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualDoorplateno">编号</label> <input
						style="width:100px;" id="searchVirtualDoorplateno"
						onkeyup="searchOnkeyup(this.id, 'relationDate(1, 0)')">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualContact">联系人</label> <input
						style="width:100px;" id="searchVirtualContact"
						onkeyup="searchOnkeyup(this.id, 'relationDate(1, 0)')">
				</div>
			</div>
		</div>
		<div id="relationDataGrid" style="width:100%;height:89%">
			<div id="choseSource" style="width:100%;height:100%;display:none;">
				<!-- 选择已租列表 -->
				<table id="choseSourceTable">
				</table>
				<div id="choseSourcePageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<div id="choseTrusteeship"
				style="width:100%;height:100%;display:none;">
				<!-- 选择未租列表 -->
				<table id="choseTrusteeshipTable">
				</table>
				<div id="choseTrusteeshipPageDiv"
					style="width:99%;text-align:center;"></div>
			</div>
			<div id="choseSaveHouse" style="width:100%;height:100%;display:none;">
				<!-- 选择房屋列表 -->
				<table id="choseSaveHouseTable">
				</table>
				<div id="choseSaveHousePageDiv" style="width:99%;text-align:center;">
				</div>
			</div>
			<!-- 选择项目列表 -->
			<div id="choseVirtual" style="width:100%;height:100%;display:none;">
				<table id="choseVirtualTable"></table>
				<div id="choseVirtualPageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
	<div id="financialInfoDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<fieldset>
			<legend>
				收支归属
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
					<a  class="easyui-linkbutton" iconcls="icon-search" id="skipToCheckHouse" onclick="skipToCheckHouse()"> 查看房源</a>
			</div>
		</fieldset>
		<fieldset>
			<legend>
				收支信息
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
				其它信息
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
	<!-- 凭证管理对话框  -->
	<div id="certificateNumberDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="addCertificateNumberDlg()">生成凭证号</a>
		<div style='margin:5px 0 0 5px;float: left;'>
			凭证类型：<select id="financialjfNatureOfThe1"
				onchange="queryCertificateNumber(1,0)" style="width:100px">
				<option value="收入">收入</option>
				<option value="支出">支出</option>
			</select>
		</div>
		<div
			style="margin:5px 0 0 5px;color:black;font-size:13px;float:left;">
			录入时间段：<input id="searchStartTime1" style="width:80px" class="Wdate"
				type="text"
				onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchEndTime\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryCertificateNumber(1,0)})">到
			<input id="searchEndTime1" style="width:70px" class="Wdate"
				type="text"
				onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchStartTime\',{d:1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryCertificateNumber(1,0)})">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			周期选择：<select id="financialTurn1" onchange="queryCertificateNumber(1,0)"style="width:80px">
				<option></option>
				<option value="本周">本周</option>
				<option value="上周">上周</option>
				<option value="本月">本月</option>
				<option value="上月">上月</option>
				<option value="本季度">本季度</option>
				<option value="上季度">上季度</option>
				<option value="本年">本年</option>
				<option value="去年">去年</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 5px 13px;color:black;font-size:13px;float:left;">
		凭证号：<input id="financialNumber" style="width:100px"
				onkeyup="searchOnkeyup(this.id, 'queryCertificateNumber(1, 0)')">
		</div>
		<div
			style="margin:5px 0 0 18px;color:black;font-size:13px;float:left;">
			楼盘名称：<input id="searchCCommunity1" style="width:80px"
				onkeyup="searchOnkeyup(this.id, 'queryCertificateNumber(1, 0)')">
		</div>
		<div
			style="margin:5px 0 0 5px;color:black;font-size:13px;float:left;">
			楼栋：<input id="searchBuilding1" style="width:50px"
				onkeyup="searchOnkeyup(this.id, 'queryCertificateNumber(1, 0)')">
		</div>
		<div
			style="margin:5px 0 0 6px;color:black;font-size:13px;float:left;">
			门牌号：<input id="searchDoorplateno1" style="width:80px"
				onkeyup="searchOnkeyup(this.id, 'queryCertificateNumber(1, 0)')">
		</div>
		<div style="clear:both"></div>
		<div style="width:99%;height:85%">
			<!-- 凭证信息列表 -->
			<table id="certificateNumberTable">
			</table>
			<!-- 凭证信息分页 -->
			<div id="certificateNumberPageDiv"
				style="width:100%;text-align:center;"></div>
		</div>
	</div>
	<div id="numberFinancialDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div style="width:99%;height:80%">
			<!-- 用于打印的收支信息列表 -->
			<table id="numberFinancialTable"
			style="width:100%;height:227px;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:10,
				fitColumns:true,
				scrollbarSize:0">
			<thead>
				<tr>
					<th field="jfCertificateNumber" width="18" align="center">凭证号</th>
					<th field="jfTheOwnershipType" width="10" align="center">归属类型</th>
					<th field="jfBelongingToTheName" width="15" align="center">归属名称</th>
					<th field="jfClosedWay" width="10" align="center">账户类型</th>
					<th field="jfNatureOfThe" width="10" align="center">收支性质</th>
					<th field="jfBigType" width="10" align="center">收支分类</th>
					<th field="jfAccountingSpecies" width="20" align="center">收支种类</th>
					<th field="jfSumMoney" width="10" align="center">收支金额</th>
				</tr>
			</thead>
		</table>
		</div>
		<br>
		<center>
				<a  class="easyui-linkbutton"
					iconcls="icon-print" onclick="doSetNumberAndPrint(1)"> 打印凭证</a> <a
					 class="easyui-linkbutton"
					onclick="$('#numberFinancialDlg').dialog('close')"
					iconcls="icon-cancel">关闭</a>
		</center>
	</div>
	<!-- 生成凭证对话框 -->
	<div id="addCertificateNumberDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 5px 5px;float: left;'>
			凭证类型：<select id="financialjfNatureOfThe"
				onchange="documentQueryChangeType(1,0)">
				<option value="收入">收入</option>
				<option value="支出">支出</option>
			</select>
		</div>
		<div
			style="margin:5px 0 5px 17px;color:black;font-size:13px;float:left;">
			楼盘名称：<input id="searchCCommunity" style="width:80px"
				onkeyup="searchOnkeyup(this.id, 'documentQuery(1, 0)')">
		</div>
		<div
			style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			楼栋：<input id="searchBuilding" style="width:50px"
				onkeyup="searchOnkeyup(this.id, 'documentQuery(1, 0)')">
		</div>
		<div
			style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			门牌号：<input id="searchDoorplateno" style="width:50px"
				onkeyup="searchOnkeyup(this.id, 'documentQuery(1, 0)')">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 5px 5px;float: left;'>
			周期选择：<select id="financialTurn" onchange="documentQuery(1,0)">
				<option></option>
				<option value="本周">本周</option>
				<option value="上周">上周</option>
				<option value="本月">本月</option>
				<option value="上月">上月</option>
				<option value="本季度">本季度</option>
				<option value="上季度">上季度</option>
				<option value="本年">本年</option>
				<option value="去年">去年</option>
			</select>
		</div>
		<div
			style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			录入时间段：<input id="searchStartTime" style="width:70px" class="Wdate"
				type="text"
				onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchEndTime\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:documentQuery(1,0)})">到
			<input id="searchEndTime" style="width:70px" class="Wdate"
				type="text"
				onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchStartTime\',{d:1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:documentQuery(1,0)})">
		</div>
		<div style="clear:both"></div>
		<fieldset>
			<legend>
				可生成凭证号的收支列表
			</legend>
			<div style="width:99%;height:34%">
				<!-- 需要生成凭证的收支信息列表 -->
				<table id="needToAddNumberTable">
				</table>
				<!-- 需要生成凭证的收支信息分页 -->
				<div id="needToAddNumberPageDiv"
					style="width:100%;text-align:center;"></div>
			</div>
		</fieldset>
		<fieldset>
			<legend>
				需要生成凭证号的收支列表
			</legend>
			<div style="width:99%;height:36%">
				<!-- 选择好生成凭证的收支信息列表 -->
				<table id="doNeedToAddNumberTable">
				</table>
				<div
					style='margin:10px 0 0 20px;float:left;color:blue;font-size:15px;'>
					<span style='color:blue;font-size:15px;' id="needToAddNums">0</span>
					条待生成凭证的收支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					当前凭证类型：&nbsp;&nbsp;<span style='color:blue;font-size:15px;'
						id="needToAddType"> 收入</span>凭证
				</div>
				<div style='margin:5px 20px 0 0;float:right;'>
					<a  class="easyui-linkbutton"
						iconcls="icon-add" id="doSetNumber"
						onclick="doSetNumberAndPrint(0)">仅生成凭证号</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
						 class="easyui-linkbutton"
						iconcls="icon-print" id="doSetNumberAndPrinting"
						onclick="doSetNumberAndPrint(2)">生成凭证号并打印</a>
				</div>
			</div>
		</fieldset>
	</div>
	<!-- 生成租客每期收支对话框 -->
	<div id="setRenterEveryFinancialDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>租方信息</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				费用归属：<input style="width:312px;cursor:pointer;" readonly='readonly' id="setRenterEveryFinancialBelongAddress" onclick="relationDlg(1)">
				<input style="display:none" id="setRenterEveryHouseCoding"> 
				<input style="display:none" id='setRenterEveryHouseCodingType'> 
				<input style="display:none" id='setRenterEveryFinancialHouseId'> 
				<input style="display:none" id='setRenterEveryFinancialHouseStoreId'>
				<input style="display:none" id='setRenterEveryFinancialHouseRentId'>
				<input style="display:none" id='setRenterEveryFinancialManagerUserId'>
				<input style="display:none" id='setRenterEveryFinancialManage'>
				<input style="display:none" id='setRenterEveryFinancialTv'> 
				<input style="display:none" id='setRenterEveryFinancialNet'> 
				<input style="display:none" id='renterInstallmentId'> 
				<input style="display:none" id='setRenterEveryFinancialBegin1'>
				<input style="display:none" id='setRenterEveryFinancialEnd1'> 
				<input style="display:none" id='setRenterEveryFinancialBegi2'> 
				<input style="display:none" id='setRenterEveryFinancialEnd2'>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				经手人：<input id="setRenterEveryFinancialHandlerShowUserInfo" class="choose_user_button" doFlag="setRenterEveryFinancialHandler" doFun=""
						style="width:150px;cursor:pointer;" readonly="readonly">
					<input id="setRenterEveryFinancialHandlerGetUserStoreId" type="hidden">
					<input id="setRenterEveryFinancialHandlerGetUserDetId" type="hidden">
					<input id="setRenterEveryFinancialHandlerGetUserId" type="hidden">
					<div id="setRenterEveryFinancialHandlerShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				归属类型：<input style="width:150px"
					id="setRenterEveryFinancialBelongType" readonly="readonly">
				<input style="display:none" id='setRenterEveryFinancialRenterId'>
				<input style="display:none" id='setRenterEveryFinancialLandlordId'>
				<input style="display:none" id='setRenterEveryFinancialPopId'>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				归属名称：<input style="width:150px" readonly="readonly"
					id="setRenterEveryFinancialBelongName"> <input
					style="display:none" id="setRenterEveryFinancialBelongId">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				记账日期：<input style="width:80px" id="setRenterEveryFinancialDoTime"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})">
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>
				其他信息
			</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				归属周期：<input class='Wdate'
					onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'setRenterEveryFinanciaEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeDate(1)})"
					style="width:80px" id="setRenterEveryFinanciaBegin"> 到 <input
					class='Wdate'
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'setRenterEveryFinanciaBegin\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})"
					style="width:80px" id="setRenterEveryFinanciaEnd">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				账户类型：<select style="width:150px" onchange="changeWay(2)"
					id="setRenterEveryFinancialWay">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户名称：<select style="width:150px"
					id="setRenterEveryFinancialAccountName" onchange="getAccountId(1)">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支方式：<select style="width:80px" class="financial_payType" id="everyFinancialPayType">
						<option></option>
					</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:8px 0 0 0;float: left;'>
				账户号码：<input style="width:150px" disabled="disabled"
					id="setRenterEveryFinancialAccountNums"> <input
					style="display:none" id="setRenterEveryFinancialBankNums">
			</div>
			<div style='margin:8px 0 0 10px;float: left;'>
				账户归属：<input style="width:150px" disabled="disabled"
					id="setRenterEveryFinancialAccountBelong">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				<a  class="easyui-linkbutton"
					iconcls="icon-zhangdan" onclick="choseConstractInstallment()">
					选择账单</a>
			</div>
		</fieldset>
		<div id="">
			<div id="setRenterEveryFinancialDiv"
				style='margin:10px 0 10px 5px;width:99%;height:227px;float: left;'>
				<table id="setRenterEveryFinancialTable">
				</table>
			</div>
			<div style='margin:5px 0 10px 38px;float: left;'>
				总应收金额：<input style="width:80px" readonly="readonly"
					id="setRenterEveryFinancialMoneyTotal">
			</div>
			<div style='margin:5px 0 10px 12px;float: left;'>
				实际金额：<input style="width:80px" type="number" type-data="money"
					id="setRenterEveryFinancialMoneyGet" readonly="readonly">
			</div>
			<div style='margin:5px 0 10px 12px;float: left;'>
				是否发送短信：<input type="checkbox" id="setRenterEveryFinancialIfMsg">
			</div>
			<div id="setRenterEveryOweDiv" style='margin:5px 0 10px 12px;float: left;display:none'>
				最新欠结：<input style="width:80px" readonly="readonly"
					id="setRenterEveryOwe">
			</div>
			<div id="setRenterEverySaveDiv" style='margin:5px 0 10px 12px;float: left;display:none'>
				最新余额：<input style="width:80px" readonly="readonly"
					id="setRenterEverySave">
			</div>
			<div style='margin:5px 0 10px 12px;float: left;display:none'>
				欠结金额：<input style="width:80px" readonly="readonly"
					id="setRenterEveryFinancialMoneySum">
			</div>
			<div style="clear:both"></div>
			<center>
				<a  class="easyui-linkbutton"
					iconcls="icon-save" onclick="doSetRenterEveryFinancial()">保存</a> <a
					 class="easyui-linkbutton"
					onclick="$('#setRenterEveryFinancialDlg').dialog('close')"
					iconcls="icon-cancel" onclick="">关闭</a>
			</center>
		</div>
	</div>
	<!-- 打印收据 -->
	<div id="printShoujuDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 10px 0;float: left;'>收据备注：</div>
		<div style='margin:5px 0 10px 0;float: left;'>
			<textarea style="width:300px;height:80px" id="shoujubeizhu"></textarea>
			<input type="hidden" id="billNoGet">
		</div>
		<center>
			<a class="easyui-linkbutton"
				iconcls="icon-print" onclick="doPrintShouju()"> 打印收据</a> <a
				 class="easyui-linkbutton"
				onclick="$('#printShoujuDlg').dialog('close')"
				iconcls="icon-cancel" onclick="">关闭</a>
		</center>
	</div>
	<!-- 选择账单对话框 -->
	<div id="choseConstractInstallmentDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<div style="float:left;width:37%;">
			<fieldset>
				<legend>分期账单</legend>
				<div style="margin:0 0 5px 5px;color:black;float:left;">
					状态：<select id="searchJciState"
						onchange="queryRenterInstallment(1,0)" style="width:80px">
						<option value="">全部</option>
						<option value="待收">待收</option>
						<option value="已收">已收</option>
					</select>
				</div>
				<table id="renterInstallmentDg"
					style="width:100%;height:auto;table-layout:fixed;overflow:hidden;"
					data-options="rownumbers:false,
						showPageList : false,
						singleSelect:true,
						fitColumns:true,
						scrollbarSize:0">
					<thead>
						<tr>
							<th field="jciPeriods" width="10" align="center">期数</th>
							<th field="jciBeginPeriods" width="20" align="center">开始周期</th>
							<th field="jciEndPeriods" width="20" align="center">结束周期</th>
							<th field="jciMoney" width="15" align="center">金额</th>
							<th field="jciState" width="10" align="center" formatter="formatRenterState">状态</th>
							<th field="jciPaymentVoucher" width="20" align="center" formatter="formatPaymentVoucher">付款凭证</th>
						</tr>
					</thead>
				</table>
				<!-- 租客账单分页 -->
				<div id="renterInstallmentPageDiv"
					style="width:99%;text-align:center;"></div>
			</fieldset>
		</div>
		<div style="margin:0 0 0 5px;float:left;width:62%;">
			<fieldset>
				<legend>
					抄表情况
				</legend>
				<div class="water">
					<div style='margin:10px 0 0 17px;float: left;'>
					水表： 本次读数：<input style="width:70px" id="srefWaterThis"
						disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						上次读数：<input style="width:70px" id="srefWaterLast"
							disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						差值：<input style="width:60px" id="srefWaterNum" disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						计费方案：<input style="width:100px" id="srefWaterPlan"
							disabled="disabled">
					</div>
				</div>
				
				<div style="clear:both"></div>
				<div class="elect">
					<div style='margin:10px 0 0 17px;float: left;'>
					电表： 本次读数：<input style="width:70px" id="srefElectritThis"
						disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						上次读数：<input style="width:70px" id="srefElectritLast"
							disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						差值：<input style="width:60px" id="srefElectritNum"
							disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						计费方案：<input style="width:100px" id="srefElectritPlan"
							disabled="disabled">
					</div>
				</div>
				
				
				<div style="clear:both"></div>
				<div class="gas">
					<div style='margin:10px 0 0 17px;float: left;'>
					气表： 本次读数：<input style="width:70px" id="srefGasThis"
						disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						上次读数：<input style="width:70px" id="srefGasLast" disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						差值：<input style="width:60px" id="srefGasNum" disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						计费方案：<input style="width:100px" id="srefGasPlan"
							disabled="disabled">
					</div>
				</div>
				
				
				<div style="clear:both"></div>
				<div class="hotwater">
					<div style='margin:10px 0 0 5px;float: left;'>
					热水表： 本次读数：<input style="width:70px" id="srefHotWaterThis"
						disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						上次读数：<input style="width:70px" id="srefHotWaterLast" disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						差值：<input style="width:60px" id="srefHotWaterNum" disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						计费方案：<input style="width:100px" id="srefHotWaterPlan"
							disabled="disabled">
					</div>
				</div>
				
				
				<div style="clear:both"></div>
				
				<div class="hotair">
					<div style='margin:10px 0 0 5px;float: left;'>
					暖气表： 本次读数：<input style="width:70px" id="srefHotAirThis"
						disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						上次读数：<input style="width:70px" id="srefHotAirLast" disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						差值：<input style="width:60px" id="srefHotAirNum" disabled="disabled">
					</div>
					<div style='margin:10px 0 0 5px;float: left;'>
						计费方案：<input style="width:100px" id="srefHotAirPlan"
							disabled="disabled">
					</div>
				</div>
				
				<div style="clear:both"></div>
			</fieldset>
			<fieldset>
				<legend>
					能源收费明细（系统计算）
				</legend>
				<div id="srefPowerDiv1">
					<div style='margin:10px 0 0 36px;float: left;' class="water">
						水费：<input style="width:70px" id="srefWaterMoneySys" disabled>
					</div>
					<div style='margin:10px 0 0 36px;float: left;' class="elect">
						电费：<input style="width:70px" id="srefElectritMoneySys" disabled>
					</div>
					<div style='margin:10px 0 0 36px;float: left;' class="gas">
						气费：<input style="width:70px" id="srefGasMoneySys" disabled>
					</div>
					<div style='margin:10px 0 0 24px;float: left;' class="hotwater">
						热水费：<input style="width:70px" id="srefHotWaterMoneySys" disabled>
					</div>
					<div style='margin:10px 0 0 24px;float: left;' class="hotair">
						暖气费：<input style="width:70px" id="srefHotAirMoneySys" disabled>
					</div>
					<div style='margin:10px 0 0 24px;float: left;'>
						电视费：<input style="width:70px" id="srefTvMoneySys" disabled>
					</div>
					<div style="clear:both"></div>
					<div style='margin:10px 0 0 0;float: left;'>
						物业管理费：<input style="width:70px" id="srefManageMoneySys" disabled>
					</div>
					<div style='margin:10px 0 0 24px;float: left;'>
						网络费：<input style="width:70px" id="srefWifiMoneySys" disabled>
					</div>
					<div style='margin:10px 0 0 0;float: left;'>
						租赁服务费：<input style="width:70px" id="srefServerMoneySys" disabled>
					</div>
					<div style='margin:10px 0 0 36px;float: left;'>
						其他：<input style="width:70px" id="srefOtherSys" disabled>
					</div>
					<div style="clear:both"></div>
				</div>
			</fieldset>
			<fieldset>
				<legend>
					能源收费明细（短信通知）
				</legend>
				<div id="srefPowerDiv2">
					<div style='margin:10px 0 0 36px;float: left;' class="water">
						水费：<input style="width:70px" id="srefWaterMoneyMsg" disabled>
					</div>
					<div style='margin:10px 0 0 36px;float: left;' class="elect">
						电费：<input style="width:70px" id="srefElectritMoneyMsg" disabled>
					</div>
					<div style='margin:10px 0 0 36px;float: left;' class="gas">
						气费：<input style="width:70px" id="srefGasMoneyMsg" disabled>
					</div>
					
					<div style='margin:10px 0 0 24px;float: left;' class="hotwater">
						热水费：<input style="width:70px" id="srefHotWaterMoneyMsg" disabled>
					</div>
					<div style='margin:10px 0 0 24px;float: left;' class="hotair">
						暖气费：<input style="width:70px" id="srefHotAirMoneyMsg" disabled>
					</div>
					
					<div style='margin:10px 0 0 24px;float: left;'>
						电视费：<input style="width:70px" id="srefTvMoneyMsg" disabled>
					</div>
					<div style="clear:both"></div>
					<div style='margin:10px 0 0 0;float: left;'>
						物业管理费：<input style="width:70px" id="srefManageMoneyMsg" disabled>
					</div>
					<div style='margin:10px 0 0 24px;float: left;'>
						网络费：<input style="width:70px" id="srefWifiMoneyMsg" disabled>
					</div>
					<div style='margin:10px 0 0 0;float: left;'>
						租赁服务费：<input style="width:70px" id="srefServerMoneyMsg" disabled>
					</div>
					<div style='margin:10px 0 0 36px;float: left;'>
						其他：<input style="width:70px" id="srefOtherMsg" disabled>
					</div>
					<div style="clear:both"></div>
				</div>
			</fieldset>
			<fieldset>
				<legend>
					能源收费明细
				</legend>
				<div id="srefPowerDiv">
					<div style='margin:10px 0 0 36px;float: left;' class="water">
						水费：<input style="width:70px" id="srefWaterMoney"
							type="number" data-type="money" mType="水费" mNote=""
							mhistorys="" bigType="能源类"  >
					</div>
					<div style='margin:10px 0 0 36px;float: left;' class="elect">
						电费：<input style="width:70px" id="srefElectritMoney"
							type="number" data-type="money" mType="电费" mNote=""
							bigType="能源类">
					</div>
					<div style='margin:10px 0 0 36px;float: left;' class="gas">
						气费：<input style="width:70px" id="srefGasMoney"
							type="number" data-type="money" mType="燃气费" mNote=""
							bigType="能源类">
					</div>
					
					<div style='margin:10px 0 0 24px;float: left;' class="hotwater">
						热水费：<input style="width:70px" id="srefHotWaterMoney"
							type="number" data-type="money" mType="热水费" mNote=""
							bigType="能源类">
					</div>
					<div style='margin:10px 0 0 24px;float: left;' class="hotair">
						暖气费：<input style="width:70px" id="srefHotAirMoney"
							type="number" data-type="money" mType="暖气费" mNote=""
							bigType="能源类">
					</div>
					
					
					<div style='margin:10px 0 0 24px;float: left;'>
						电视费：<input style="width:70px" id="srefTvMoney"
							type="number" data-type="money" mType="电视" mNote="电视费："
							bigType="能源类">
					</div>
					<div style="clear:both"></div>
					<div style='margin:10px 0 0 0;float: left;'>
						物业管理费：<input style="width:70px" id="srefManageMoney"
							type="number" data-type="money" mType="物业管理费"
							mNote="物业管理费：" bigType="能源类">
					</div>
					<div style='margin:10px 0 0 24px;float: left;'>
						网络费：<input style="width:70px" id="srefWifiMoney"
							type="number" data-type="money" mType="网络费" mNote="网络费："
							bigType="能源类">
					</div>
					<div style='margin:10px 0 0 0;float: left;'>
						租赁服务费：<input style="width:70px" id="srefServerMoney"
							type="number" data-type="money" mType="租赁管理服务费"
							mNote="租赁管理服务费：" bigType="主营类">
					</div>
					<div style='margin:10px 0 0 36px;float: left;'>
						其他：<input style="width:70px" id="srefOtherMoney" 
							type="number" data-type="money" mType="代缴费用"
							mNote="其他费用：" bigType="其他类">
					</div>
					<div style='margin:4px 0 0 12px;float: left;'>
						<a  class="easyui-linkbutton"
							iconcls="icon-edit"
							onclick="$('#srefPowerDiv input').val('0.00');"> 清空能源明细</a> 
					</div>
					<div style="clear:both"></div>
				</div>
			</fieldset>
			<fieldset>
				<legend>
					违约欠费明细
				</legend>
				<div style='margin:10px 0 0 0;float: left;'>
					缴租时间：<input style="width:80px" id="srefShouldDay"
						disabled="disabled">
				</div>
				<div style='margin:10px 0 0 5px;float: left;'>
					房屋租金：<input style="width:80px" id="srefRentMoney"
						disabled="disabled" mType="租金" mNote="房屋租金：" bigType="主营类">
				</div>
				<div style='margin:10px 0 0 5px;float: left;'>
					滞纳天数：<input style="width:80px" id="srefNotDays" disabled="disabled">
				</div>
				<div style='margin:10px 0 0 17px;float: left;'>
					滞纳金：<input style="width:80px" id="srefDamages" type="number" data-type="money"
						data-fn-keyup="$('#ifCheckMoney').val('已变更');"
						mType="违约金" mNote="违约金："
						bigType="违约类">
				</div>
				<div style="clear:both"></div>
			</fieldset>
			<fieldset>
				<legend>
					总缴费核对
				</legend>
				<div style='margin:5px 0 0 0px;float: left;'>
					能源杂费：<input style="width:80px" id="srefPowerMoney" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 5px;float: left;' id="everyHisOwe">
					历史欠结：<input style="width:80px" id="srefHisOwe" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 5px;float: left;display:none' id="everyHisSave">
					历史余额：<input style="width:80px" id="srefHisSave" disabled="disabled">
				</div>
				<input id="srefPastOwe" type="hidden">
				<div style='margin:5px 0 0 5px;float: left;'>
					应收金额：<input style="width:80px" id="srefShouldPay" disabled="disabled">
				</div>
				<div style="clear:both"></div>
				<div style='margin:10px 0 0 0;float: left;'>
					实收金额：<input style="width:80px" id="srefRealPay" type="number" data-type="money"
						data-fn-keyup="$('#ifCheckMoney').val('已变更');"
						>
				</div>
				<div style='margin:10px 0 10px 5px;float: left;' id="everyNewOwe">
					最新欠结：<input style="width:80px" id="srefNewOwe" disabled="disabled">
				</div>
				<div style='margin:10px 0 10px 5px;float: left;display:none' id="everyNewSave">
					最新余额：<input style="width:80px" id="srefNewSave" disabled="disabled">
				</div>
				<input id="srefAllOwe" type="hidden">
				<div style='margin:4px 0 0 12px;float: left;'>
					<a  class="easyui-linkbutton"
						iconcls="icon-search" onclick="checkMoney(1)"> 核算费用</a> <input
						style="display:none" id="ifCheckMoney">
				</div>
				<div style="clear:both"></div>
			</fieldset>
		</div>
		<div style="clear:both"></div>
		<center>
			<div id="setRenterEveryFinancialTips" style="height:20px;color:red;"></div>
			<a  class="easyui-linkbutton"
				iconcls="icon-add" onclick="addSetRenterEveryFinancial()"> 生成收支</a>
			<a  class="easyui-linkbutton"
				onclick="$('#choseConstractInstallmentDlg').dialog('close')"
				iconcls="icon-cancel" onclick="">关闭</a>
		</center>
	</div>
	<!-- 生成新签租客收支对话框 -->
	<div id="setRenterNewFinancialDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>租方信息</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				费用归属：<input style="width:312px;cursor:pointer;" readonly='readonly' id="setRenterNewFinancialBelongAddress" onclick="relationDlg(2)">
				<input style="display:none" id="setRenterNewHouseCoding">
				<input style="display:none" id='setRenterNewHouseCodingType'> 
				<input style="display:none" id='setRenterNewFinancialHouseId'> 
				<input style="display:none" id='setRenterNewFinancialHouseStoreId'>
				<input style="display:none" id='setRenterNewFinancialHouseRentId'>
				<input style="display:none" id='setRenterNewFinancialManagerUserId'>
				<input style="display:none" id='setRenterNewFinancialManage'>
				<input style="display:none" id='setRenterNewFinancialTv'> 
				<input style="display:none" id='setRenterNewFinancialNet'> 
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				经手人：<input id="setRenterNewFinancialHandlerShowUserInfo" class="choose_user_button" doFlag="setRenterNewFinancialHandler" doFun=""
						style="width:150px;cursor:pointer;" readonly="readonly">
					<input id="setRenterNewFinancialHandlerGetUserStoreId" type="hidden">
					<input id="setRenterNewFinancialHandlerGetUserDetId" type="hidden">
					<input id="setRenterNewFinancialHandlerGetUserId" type="hidden">
					<div id="setRenterNewFinancialHandlerShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				归属类型：<input style="width:150px" id="setRenterNewFinancialBelongType"
					readonly="readonly"> <input style="display:none"
					id='setRenterNewFinancialRenterId'> <input
					style="display:none" id='setRenterNewFinancialLandlordId'>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				归属名称：<input style="width:150px" readonly="readonly"
					id="setRenterNewFinancialBelongName"> <input
					style="display:none" id="setRenterNewFinancialBelongId">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				记账日期：<input style="width:80px" id="setRenterNewFinancialDoTime"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})">
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>其他信息</legend>
			</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				账户类型：<select style="width:150px" onchange="changeWay(3)"
					id="setRenterNewFinancialWay">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户名称：<select style="width:150px"
					id="setRenterNewFinancialAccountName" onchange="getAccountId(2)">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支方式：<select style="width:80px" class="financial_payType" id="newFinancialPayType">
						<option></option>
					</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:8px 0 0 0;float: left;'>
				账户号码：<input style="width:150px" disabled="disabled"
					id="setRenterNewFinancialAccountNums"> <input
					style="display:none" id="setRenterNewFinancialBankNums">
			</div>
			<div style='margin:8px 0 0 10px;float: left;'>
				账户归属：<input style="width:150px" disabled="disabled"
					id="setRenterNewFinancialAccountBelong">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				<a  class="easyui-linkbutton"
					iconcls="icon-zhangdan" onclick="setNewFinancialMoney()"> 金额明细</a>
			</div>
		</fieldset>
		<div>
			<div id="setRenterNewFinancialDiv"
				style='margin:10px 0 10px 5px;width:99%;height:302px;float: left;'>
				<table id="setRenterNewFinancialTable">
				</table>
			</div>
			<div style='margin:5px 0 10px 50px;float: left;'>
				合计金额：<input style="width:80px" disabled="disabled"
					id="setRenterNewFinancialMoneyTotal">
			</div>
			<div style='margin:5px 0 10px 12px;float: left;'>
				实际金额：<input style="width:80px" type="number" data-type="money"
					id="setRenterNewFinancialMoneyGet">
			</div>
			<div style='margin:5px 0 10px 12px;float: left;'>
				欠结金额：<input style="width:80px" disabled="disabled"
					id="setRenterNewFinancialMoneySum">
			</div>
			<div style="clear:both"></div>
			<center>
				<a  class="easyui-linkbutton"
					iconcls="icon-save" onclick="doSetRenterNewFinancial()">保存</a> <a
					 class="easyui-linkbutton"
					onclick="$('#setRenterNewFinancialDlg').dialog('close')"
					iconcls="icon-cancel" onclick="">关闭</a>
			</center>
		</div>
	</div>
	<!-- 生成新签租客收支-填写金额明细对话框 -->
	<div id="setNewFinancialMoneyDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<input id="setNewFinancialMoneyBegin" style="display:none"> <input
			id="setNewFinancialMoneyEnd" style="display:none">
		<div id="writeSetNewFinancialMoney">
			<fieldset>
				<legend>
					金额明细
				</legend>
				<div style='margin:5px 0 10px 24px;float: left;'>
					租金：<input style="width:80px" id="setNewFinancialMoneyRent"
						type="number" data-type="money" mType="租金"
						mNote="新签租客-租金：" bigType="主营类">
				</div>
				<div style='margin:5px 0 10px 36px;float: left;'>
					佣金：<input style="width:80px" id="setNewFinancialMoneyServer"
						type="number" data-type="money" mType="佣金服务费"
						mNote="新签租客-佣金服务费：" bigType="主营类">
				</div>
				<div style='margin:5px 0 10px 36px;float: left;'>
					管理费：<input style="width:80px" id="setNewFinancialMoneyManage"
						type="number" data-type="money" mType="物业管理费"
						mNote="新签租客-物业管理费：" bigType="能源类">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 10px 0;float: left;'>
					房屋押金：<input style="width:80px" id="setNewFinancialMoneyRoom"
						type="number" data-type="money" mType="房屋押金"
						mNote="新签租客-房屋押金：" bigType="押金类">
				</div>
				<div style='margin:5px 0 10px 12px;float: left;'>
					水电押金：<input style="width:80px" id="setNewFinancialMoneyPower"
						type="number" data-type="money" mType="水电押金"
						mNote="新签租客-水电押金：" bigType="押金类">
				</div>
				<div style='margin:5px 0 10px 24px;float: left;'>
					门卡押金：<input style="width:80px" id="setNewFinancialMoneyDoor"
						type="number" data-type="money" mType="门卡押金"
						mNote="新签租客-门卡押金：" bigType="押金类">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 10px 0;float: left;'>
					其他押金：<input style="width:80px" id="setNewFinancialMoneyOther"
						type="number" data-type="money" mType="其他押金"
						mNote="新签租客-其他押金：" bigType="押金类">
				</div>
				<div style='margin:5px 0 10px 24px;float: left;'>
					电视费：<input style="width:80px" id="setNewFinancialMoneyTv"
						type="number" data-type="money" mType="电视"
						mNote="新签租客-电视费：" bigType="能源类">
				</div>
				<div style='margin:5px 0 10px 12px;float: left;'>
					门卡工本费：<input style="width:80px" id="setNewFinancialMoneyDoorPrice"
						type="number" data-type="money" mType="门卡工本费"
						mNote="新签租客-门卡工本费：" bigType="主营类">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 10px 12px;float: left;'>
					网络费：<input style="width:80px" id="setNewFinancialMoneyNet"
						type="number" data-type="money" mType="网络费"
						mNote="新签租客-网络费：" bigType="能源类">
				</div>
				<div style='margin:5px 0 10px 12px;float: left;'>
					换锁费用：<input style="width:80px" id="setNewFinancialChange"
						type="number" data-type="money" mType="换锁费"
						mNote="新签租客-换锁费：" bigType="维修类">
				</div>
				<div style='margin:5px 0 10px 12px;float: left;'>
					租赁服务费：<input style="width:80px"
						id="setNewFinancialMoneyManageServer"
						type="number" data-type="money" mType="租赁管理服务费"
						mNote="新签租客-租赁管理服务费：" bigType="主营类">
				</div>
			</fieldset>
		</div>
		<div style="clear:both"></div>
		<center>
			<div id="setNewFinancialMoneyTips" style="height:20px;color:red;"></div>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="addSetRenterNewFinancial()">保存</a> 
			<a class="easyui-linkbutton" onclick="$('#setNewFinancialMoneyDlg').dialog('close')" iconcls="icon-cancel" onclick="">关闭</a>
		</center>
	</div>
	<!-- 选择隐藏列对话框 -->
	<div id="dgShowOrHideDlg" class="easyui-dialog"
		data-options="closed:true,
						title : '显示/隐藏列',
						width :400,
						height:200,
						cache : false,
						top   :100,
						modal : true">
		<fieldset>
			<legend>
				选择列(勾选需要显示的列)
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
				<div style="margin:5px 0 0 10px;float:left">
						<input type="checkbox" value="jfFinancialCoding" id="dgShowOrHidejfFinancialCoding" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>流水号</label>
				</div>
				<div style="margin:5px 0 0 22px;float:left">
						<input type="checkbox" value="jfAccountingWhy" id="dgShowOrHidejfAccountingWhy" />
				</div>
				<div style="margin:5px 0 0 2px">
					<label>归属地址</label>
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 10px;float:left">
						<input type="checkbox" value="jfTicketNumber" id="dgShowOrHidejfTicketNumber" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>票据编号</label>
				</div>
				<div style="margin:5px 0 0 10px;float:left">
						<input type="checkbox" value="faBelonging" id="dgShowOrHidefaBelonging" />
				</div>
				<div style="margin:5px 0 0 2px;float:left">
					<label>账户归属</label>
				</div>
				<div style="clear:both"></div>
				<br>
				<center>
					<a class="easyui-linkbutton" iconcls="icon-save" onclick="doDgShowOrHide('financialDg')">保存</a> 
					<a class="easyui-linkbutton" onclick="$('#dgShowOrHideDlg').dialog('close')" iconcls="icon-cancel" >关闭</a>
				</center>
			</div>
		</fieldset>
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
	<jsp:include page="/ui/fg_accountSummary.jsp"></jsp:include>
	<!-- fg.public.js 要在 fg.financial.js之后加载，不然公司成本统计跳转过来，归属类型不能选中“其他类”-->
	<script src="js/fg.financial.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.accountSummary.js"></script>
</body>
</html>