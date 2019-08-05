<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>受益归属（业绩受益人）</title>
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
	<script src="js/fg.assistance.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="margin:5px 0 5px 5px;float:left;">
			<a class="easyui-linkbutton" iconCls="icon-add-xiezhuren" plain="true" onclick="addAssistance()">添加业绩受益人</a>
		</div>
		<div style="margin:5px 0 5px 5px;float:left;">
			<a class="easyui-linkbutton" iconCls="icon-xiezhuren" plain="true" onclick="updateAssistance()">修改业绩受益人</a>
		</div>
		<div style="clear:both"></div>
		<div id="searchAssistance" style="margin:0 0 0 5px">
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				类型：<select id="searchAssistType" onchange="queryAssistance(1,0)" style="width:80px">
						<option></option>
						<option>存房</option>
						<option>出房</option>
					</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				楼盘名称：<input id="searchAddCommunity"
					onkeyup="searchOnkeyup(this.id, 'queryAssistance(1, 0)')" style="width:120px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				楼栋：<input id="searchAddBuilding"
					onkeyup="searchOnkeyup(this.id, 'queryAssistance(1, 0)')" style="width:120px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				门牌号：<input id="searchAddDoorplateno"
					onkeyup="searchOnkeyup(this.id, 'queryAssistance(1, 0)')" style="width:120px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				业绩受益人：<select style="width:80px" class="addSlUserId" id="searchAssistUserDep"
					onchange="deptStaffChose('searchAssistUserDep','searchAssistUserName',0)">
					<option></option>
				</select>
				<select id="searchAssistUserName" style="width:80px" onchange="queryAssistance(1,0)">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
		</div>
	</div>
	<!--业绩受益人列表-->
	<div id="DataGridAssistance" style="width:100%;height:85%;">
		<table id="assistanceDg" class="easyui-datagrid"
			style="width:100%;height:100%;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				fitColumns:true,
				scrollbarSize:0">
			<thead>
				<tr>
					<th field="addCommunity" width="20" align="center">详细地址</th>
					<th field="assistType" width="10" align="center">类型</th>
					<th field="assistPeople" width="10" align="center">业绩受益人</th>
					<th field="assistBonus" width="10" align="center">比例（%）</th>
					<th field="assistState" width="10" align="center">状态</th>
					<th field="registerPeople" width="10" align="center">登记人</th>
					<th field="assistRegisterTime" width="10" align="center">登记时间</th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="assistancePageDiv" style="width:100%;text-align:center;"></div>
	<!-- 添加/修改业绩受益人 -->
	<div id="addAssistanceDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<fieldset>
			<legend>
				房源信息
			</legend>
			<div style='margin:5px 0 0 2px;float: left;'>
				协助类型：<select class="addAssistType" onchange="changeAssistType()" style="width:130px" require="require">
					<option></option>
					<option value="存房">存房</option>
					<option value="出房">出房</option>
				</select>
			</div>
			<div class="choseHouse" style='margin:5px 0 0 2px;float: left;'>
				选择房源：<input style="width:130px" readonly='readonly'
				onclick="relationDlg()" class="add_houseCoding" value="单击选择房源" >
				<input id="rentId" style="display:none;">
				<input id="storeId" style="display:none;">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 2px;float:left">
				详细地址：<input class="addAssistAddress" style="width:322px" readonly="readonly" require="require" >
			</div>
		</fieldset>
		<fieldset>
			<legend>
				业绩受益人信息
			</legend>
			<div style="margin:15px 0 5px 10px;">
				&emsp;业绩受益人：<input id="addAssistanceStaffShowUserInfo" style="width:200px;cursor: pointer;" 
				readonly="readonly" class="choose_user_button" doFlag="addAssistanceStaff" doFun="" value="">
					<input id="addAssistanceStaffGetUserStoreId" type="hidden">
					<input id="addAssistanceStaffGetUserDetId" type="hidden">
					<input id="addAssistanceStaffGetUserId" type="hidden">
					<div id="addAssistanceStaffShowUserInfoDiv" style="display:none;"></div>
			</div>
			<!-- <div style='margin:5px 0 0 2px;float: left;'>
				&emsp;业绩受益人：<select style="width:80px" class="addSlUserId" id="addAssistanceDept" require="require"
					onchange="deptStaffChose('addAssistanceDept','addAssistanceStaff',0)">
					<option></option>
				</select>
				<select id="addAssistanceStaff" style="width:80px" require="require">
					<option></option>
				</select>
			</div> -->
			<div style="margin:6px 8px 0 2px;float:left">
				&emsp;&emsp;&emsp;&emsp;&emsp;比例：<input class="addAssistBonus" style="width:96px" type="number" min="1" max="100" require="require">%
			</div>
			<div style='margin:5px 0 0 2px;float: left;display:none;'>
				&emsp;录入人：<input class="add_installment_userName" style="width:130px;" />
				<input class="add_installment_userId" />
			</div>
			<div style='margin:2px 0 0 2px;float: left;'>
				<a class="easyui-linkbutton" iconcls="icon-xiezhuren" id='addAssistanceButton' onclick="if(validateRequire('addAssistanceDlg')){addToDataGrid()}"> 添加</a>
			</div>
		</fieldset>
		<div id="addAssistanceSaveDiv" >
			<div id="addAssistanceTableDiv" style='margin:5px 0 5px 2px;width:99%;height:185px;'>
				<table id="addAssistanceTable"></table>
			</div>
			<center>
				<div class="errorMsg" style="height:20px;color:red;"></div>
				<a id="addBtn" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddAssistance()">保存</a>
				<a id="updateBtn" class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateAssistance()">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addAssistanceDlg').dialog('close')">关闭</a>
			</center>
		</div>
	</div>
	<!-- 归属关联列表显示  -->
	<div id="relationDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div style="margin:5px 0 0 0;color:black;font-size:13px;float:left;">
			关联类型：<input id="searchBelongType" readonly="readonly" style="width:80px" value="">
		</div>
		<div style="clear:both"></div>
		<div id="relationSelect">
			<div style='margin:0 0 10px 0;'>
				<div
					style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;">
					城市：<select id="searchAddCity" onchange="queryAddCity()"
						style="width:80px">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					城区：<select id="searchAddDistrict" onchange="queryAddDistrict()"
						style="width:100px">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					片区：<select id="searchAddZone" onchange="relationDate(1,0)"
						style="width:100px">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘/小区：<input id="searchCommunity" onkeyup="relationDate(1,0)"
						style="width:80px">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchDoorplateno" onkeyup="relationDate(1,0)"
						style="width:60px">
				</div>
			</div>
		</div>
		<div id="relationDataGrid" style="width:100%;height:89%">
			<div id="choseSource" style="width:100%;height:100%;display:none;">
				<!-- 选择已租列表 -->
				<table id="choseSourceTable"></table>
				<div id="choseSourcePageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<div id="choseTrusteeship" style="width:100%;height:100%;display:none;">
				<!-- 选择未租列表 -->
				<table id="choseTrusteeshipTable"></table>
				<div id="choseTrusteeshipPageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
</body>
</html>