<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>业主账单</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link href="css/upload.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="advancedScreening(1)" id="screening">高级筛选</a>
		</div>
		<div>
			<div
				style="margin:5px 0 5px 29px;color:black;float:left;">
				城区：<select id="searchDistrict" onchange="queryPayable(1,0)"
					style="width:80px">
					<option></option>
				</select>
			</div>
			<div style="margin:5px 0 5px 5px;color:black;;float:left;">
				楼盘：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryPayable(1, 0)')"
					style="width:80px">
			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;float:left;">
				楼栋：<input id="sourceBuilding" onkeyup="searchOnkeyup(this.id, 'queryPayable(1, 0)')"
					style="width:80px">
			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;float:left;">
				门牌号：<input id="sourceDoorplateno"
					onkeyup="searchOnkeyup(this.id, 'queryPayable(1, 0)')" style="width:80px">
			</div>
			<div id="advancedScreening" style="display:none">
				<div
					style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					城市：<select id="searchCity" onchange="queryHouseCity()"
						style="width:80px">
					</select>
				</div>
				<div
					style="margin:5px 0 5px 17px;color:black;float:left;display:none">
					片区：<select id="searchZone" onchange="queryPayable(1,0)"
						style="width:80px">
						<option></option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;float:left;">
					业主：<input id="searchLandlordName"
						onkeyup="searchOnkeyup(this.id, 'queryPayable(1, 0)')" style="width:80px">
				</div>
				<div style="margin:5px 0 5px 5px;color:black;float:left;">
					金额：<input id="searchMoney"
						onkeyup="searchOnkeyup(this.id, 'queryPayable(1, 0)')" style="width:80px">
				</div>
				<div style="margin:5px 0 5px 5px;color:black;float:left;">
					托管状态：<select id="searchHsState" onchange="queryPayable(1,0)"
						style="width:80px">
						<option value="正常">正常</option>
						<option value="退房">退房</option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;float:left;">
					付款状态：<select id="searchJciState" onchange="queryPayable(1,0)"
						style="width:80px">
						<option></option>
						<option value="已付">已付款</option>
						<option value="待付">未付款</option>
					</select>
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 5px 5px;color:black;float:left;">
					审核状态：<select id="searchAuditStatus" onchange="queryPayable(1,0)"
						style="width:80px">
						<option></option>
						<option value="未审核">未审核</option>
						<option value="已审核">已审核</option>
						<option value="待付款">待付款</option>
						<option value="已付款">已付款</option>
						<option value="重新核验">重新核验</option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;float:left;">
					付款日：<input id="searchStartDate"
						onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchEndDate\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryPayable(1,0)})"
						style="width:80px"> 至：<input id="searchEndDate"
						onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchStartDate\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryPayable(1,0)})"
						style="width:80px">
				</div>
				<div style="margin:5px 0 5px 10px;color:black;float:left;">
					账单所在年份：<select id="searchYear" onchange="queryPayable(1,0)"
						style="width:80px">
						<%
							Calendar cal = Calendar.getInstance();
							int year = cal.get(Calendar.YEAR) + 1;
							for (int i = year; i >= 2016; i--) {
								out.println("<option value='" + i + "'>" + i + "</option>");
							}
							out.println("<option value=''>全部</option>");
						%>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;float:left;">
					月份：<select id="searchMonth" onchange="queryPayable(1,0)"
						style="width:80px">
						<%
							for (int i = 1; i < 13; i++) {
								out.println("<option value='" + i + "'>" + i + "</option>");
							}
							out.println("<option value=''>全部</option>");
						%>
					</select>
				</div>
			</div>
			
			<div style="margin:5px 0 5px 5px;height:20px;line-height:20px;color:black;float:left;">
				<span>总金额：</span> <span id="totalMoney" style="color:blue;width:80px;"></span> 元
			</div>
			
			<div style="margin:2px 0 5px 35px;color:black;float:left;">
				<a class="easyui-linkbutton" iconcls="icon-print" onclick="createApplication()">打印付款申请单</a>
			</div>
		</div>
	</div>
	<!--业主账单列表-->
	<div id="payableDataGrid" style="width:100%;">
		<table id="payableDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="detailedAddress" width="20" align="center">房屋地址</th>
					<th field="landlordName" width="10" align="center">业主</th>
					<th field="landlordNameRemark" width="10" align="center">备注</th>
					<th field="jciFukuanri" width="10" align="center">付款日</th>
					<th field="jciPeriods" width="10" align="center">账单期数</th>
					<th field="jciBeginPeriods" width="10" align="center">开始周期</th>
					<th field="jciEndPeriods" width="10" align="center">结束周期</th>
					<th field="jciMoney" width="10" align="center">金额</th>
					<th field="auditStatus" width="10" align="center" formatter="formatAuditStatus">审核状态</th>
					<th field="jciIfPrint" width="10" align="center" formatter="formatJciIfPrint">打印状态</th>
					<th field="auditName" width="10" align="center">审核人</th>
					<th field="reviewName" width="10" align="center">复核人</th>
					<th field="draweeName" width="10" align="center">付款人</th>
				</tr>
			</thead>
		</table>
		<div id="payablePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
	<!-- 查看业主账单信息 -->
	<div id="payableInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">		
		<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'payable', 'payableDg', 'jciId', 'jciImgPath', 'queryInstallmentById', 'deleteInstallmentPic')">上传及查看图片</a>
		<a class="easyui-linkbutton" iconCls="icon-lishipiaojudayin" plain="true" onclick="lookatThePrintBill()">查看打印账单</a>
		<fieldset>
			<legend>账单信息</legend>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;业主：<input style="width:100px;" id="landlordName"
					readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;地址：<input style="width:265px;" id="address" readonly>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;期数：<input style="width:100px;" id="jciPeriods"
					readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				开始周期：<input style="width:100px;" id="jciBeginPeriods" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				结束周期：<input style="width:100px;" id="jciEndPeriods" readonly>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 5px;float:left;">
				应付租金：<input style="width:100px;" id="jciMoney" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				欠结金额：<input style="width:100px;" id="hsBaseMoney" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				实际应付：<input style="width:100px;" id="shouldPayMoney" readonly>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 5px;float:left;">
				账单状态：<input style="width:100px;" id="jciState" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				特殊编号：<input style="width:110px;" id="jciSpecialNumber" readonly>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>业主账户</legend>
			<div style="margin:5px 0 0 5px;float:left;">
				户名：<input style="width:100px" id="bankName" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				银行：<input style="width:100px" id="bankType" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				账号：<input style="width:172px" id="bankNum" readonly>
			</div>
		</fieldset>
		<fieldset id="account-info">
			<legend>付款账户</legend>
			<input style="display:none" id="paymentAccountId">
			<div style="margin:5px 0 0 5px;float:left;">
				付款账户：<select style="width:150px;" id="paymentAccountType" onchange="changeWay()">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户名称：<select style="width:150px" id="paymentAccountName" onchange="getAccountId()">
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>
				账户号码：<input style="width:150px" id="paymentAccountNum" readonly>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户归属：<input style="width:150px" id="paymentAccountBelong" readonly>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>
				收支方式：<select style="width:150px" id="paymentMethod">
					<option></option>
				</select>
			</div>
			<div style="margin:3px 0 0 10px;float:left;position:relative;" id="sentMsgDiv">
				是否发送短信提醒业主：<input id="sentMsg" type="checkbox" checked
					style="width:14px;height:14px;margin-left:0;position:relative;top:3px;">
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>审核信息</legend>
			<input style="display:none" id='payable_index'>
			<div style="margin:5px 0 0 5px;float:left;">
				审核状态：<input style="width:100px;" id="auditStatus" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;审核人：<input style="width:100px;" id="auditName" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;复核人：<input style="width:100px;" id="reviewName" readonly>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<div style='margin:10px 0 0 0;'>
			<center>
				<div class="errorMsg" style="height:20px;color:red;"></div>
				<a class="easyui-linkbutton" iconcls="icon-shenhe" id="doAuditOne" onclick="doCheck(1)">审核</a>
				<a class="easyui-linkbutton" iconcls="icon-fuhe" id="doAuditTwo" onclick="doCheck(2)">复核</a> 
				<a class="easyui-linkbutton" iconcls="icon-fukuan" id="doAuditThree" onclick="doCheck(3)">付款</a> 
				<a class="easyui-linkbutton" iconcls="icon-chongxinheyan" id="doAuditFour" onclick="doCheck(4)">重新核验</a>
				<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)">上一条</a> 
				<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)">下一条</a>
			</center>
		</div>
	</div>
	
	<!-- 生成付款申请单窗口 -->
	<div id="applicationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div>
			<div
				style="margin:5px 0 5px 5px;color:black;float:left;">
				小区：<input id="searchCommunityApp" onkeyup="searchOnkeyup(this.id, 'queryPayableApp(1, 0)')"
					style="width:80px">
			</div>
			<div
				style="margin:5px 0 5px 29px;color:black;float:left;">
				楼栋：<input id="sourceBuildingApp" onkeyup="searchOnkeyup(this.id, 'queryPayableApp(1, 0)')"
					style="width:80px">
			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;float:left;">
				门牌号：<input id="sourceDoorplatenoApp"
					onkeyup="searchOnkeyup(this.id, 'queryPayableApp(1, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;float:left;">
				业主：<input id="searchLandlordNameApp"
					onkeyup="searchOnkeyup(this.id, 'queryPayableApp(1, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;float:left;">
				托管状态：<select id="searchHsStateApp" onchange="queryPayableApp(1,0)"
					style="width:100px">
					<option value="正常">正常</option>
					<option value="退房">退房</option>
				</select>
			</div>
			<div style="margin:5px 0 5px 10px;color:black;float:left;">
				<div id="showTheSortButton" class="showTheSortButton" onclick="showTheSortDlg()" >排序方式<span id="showTheSortjia" class="showTheSortjia">+</span></div>
				<div class="theSortDlg" id="theSortDlg" style="height:250px;">
					<div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
					<div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse"  searchVal="2">倒序</div>
					<input type="hidden" id="theSortContraryInput"  value="2">
					<div class="theSortTerm" id="theSortTermaddCommunity" searchVal="1">业主姓名</div>
					<div class="theSortTerm" id="theSortTermaddBuilding" searchVal="2">付款日</div>
					<div class="theSortTerm theSortTermSelect" id="theSortTermaddDoorplateno" searchVal="3">登记时间</div>
					<div class="theSortTerm" id="theSortTermregisterTime" searchVal="4">楼盘名称</div>
					<input type="hidden" id="theSortTermInput" value="3">
				</div>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 5px 5px;color:black;float:left;">
				金额：<input id="searchMoneyApp"
					onkeyup="searchOnkeyup(this.id, 'queryPayableApp(1, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;float:left;display:none">
				审核状态：<select id="searchAuditStatusApp" onchange="queryPayableApp(1,0)"
					style="width:80px">
					<option></option>
					<option value="未审核">未审核</option>
					<option value="已审核">已审核</option>
					<option value="待付款">待付款</option>
					<option value="重新核验">重新核验</option>
				</select>
			</div>
			<div style="margin:5px 0 5px 5px;color:black;float:left;">
				付款日：<input id="searchStartDateApp"
					onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchEndDateApp\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryPayableApp(1,0)})"
					style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;float:left;">
				&emsp;至：<input id="searchEndDateApp"
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchStartDateApp\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryPayableApp(1,0)})"
					style="width:80px">
			</div>
			<div style="clear:both"></div>
		</div>
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>业主账单列表</font>
			</legend>
			<div id="payableAppDgDiv" style="width:1015px;">
				<table id="payableAppDg" class="easyui-datagrid" style="width:100%;height:152px;table-layout:fixed;overflow:hidden;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
					<thead>
						<tr>
                            <th data-options="field:'ck',checkbox:true"></th>
							<th field="detailedAddress" width="30" align="center">房屋地址</th>
							<th field="landlordName" width="10" align="center">业主</th>
							<th field="jciFukuanri" width="10" align="center">付款日</th>
							<th field="jciPeriods" width="10" align="center">账单期数</th>
							<th field="jciBeginPeriods" width="10" align="center">开始周期</th>
							<th field="jciEndPeriods" width="10" align="center">结束周期</th>
							<th field="jciMoney" width="10" align="center">金额</th>
							<th field="auditStatus" width="10" align="center"
								formatter="formatAuditStatus">审核状态</th>
							<th field="auditName" width="10" align="center">审核人</th>
							<th field="reviewName" width="10" align="center">复核人</th>
							<th field="draweeName" width="10" align="center">付款人</th>
							<%--<th field="do" width="10" align="center" formatter="tianjia">添加</th>--%>
						</tr>
					</thead>
				</table>
				<%--<div id="payableAppPageDiv" style="text-align:center;"></div>--%>
			</div>
		</fieldset>
		<div style="width:99%;margin:7px 0 2px 0;float:left;text-align:center;">
			<a style="float:left;margin:3px 5px 0 43%;cursor:pointer;font-size:12px;color:#00c900" onclick="addOneToNeedTo()">添加</a>
            <a style="float:left;"><img style="height:25px;width:15px" src="img/down.png" /></a>
            <a style="float:left;margin-left:15px"><img style="height:25px;width:15px" src="img/up.png" /></a>
            <a style="float:left;margin:3px 0 0 5px;cursor:pointer;font-size:12px;color:red" onclick="cancelOneToNeedTo()">取消</a>
		</div>
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>需要打印的账单</font>
			</legend>
			<div id="payableAppAddDgDiv" style="width:1015px;">
				<table id="payableAppAddDg" class="easyui-datagrid" style="width:100%;height:152px;table-layout:fixed;overflow:hidden;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
					<thead>
						<tr>
                            <th data-options="field:'ck',checkbox:true"></th>
							<th field="detailedAddress" width="30" align="center">房屋地址</th>
							<th field="landlordName" width="10" align="center">业主</th>
							<th field="jciFukuanri" width="10" align="center">付款日</th>
							<th field="jciPeriods" width="10" align="center">账单期数</th>
							<th field="jciBeginPeriods" width="10" align="center">开始周期</th>
							<th field="jciEndPeriods" width="10" align="center">结束周期</th>
							<th field="jciMoney" width="10" align="center">金额</th>
							<th field="auditStatus" width="10" align="center"
								formatter="formatAuditStatus">审核状态</th>
							<th field="auditName" width="10" align="center">审核人</th>
							<th field="reviewName" width="10" align="center">复核人</th>
							<th field="draweeName" width="10" align="center">付款人</th>
							<%--<th field="do" width="10" align="center" formatter="shanchu">shanchu</th>--%>
						</tr>
					</thead>
				</table>
			</div>
		</fieldset>
		<div style="margin:12px 0 0 0;position:relative;">
			<div style='margin:2px 0 0 20px;float:left;color:blue;font-size:15px;position:absolute;'>
				<span style='color:blue;font-size:15px;' id="needToAddNums">0</span>条待打印的账单
			</div>
			<center>
				<a class="easyui-linkbutton" iconcls="icon-print" onclick="doPrint()"> 打印付款申请单</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#applicationDlg').dialog('close')">关闭</a>
			</center>
		</div>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/upload.js"></script>
	<script src="js/fg.payableToLandlord.js"></script>
</body>
</html>