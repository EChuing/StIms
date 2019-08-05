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
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.seller.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!-- 商家信息工具栏 -->
	<div>
		<div style="margin:5px 0 5px 5px;float:left;">
			<a class="easyui-linkbutton" iconCls="icon-add" plain="true"
				id="addSllerButton" onclick="addSeller()">添加商家</a>
		</div>
		<div style="margin:5px 0 5px 5px;float:left;">
			<a class="easyui-linkbutton" iconCls="icon-edit" plain="true"
				id="updateSllerButton" onclick="updateSeller()">修改商家</a>
		</div>
	</div>
	<!--商家列表-->
	<div id="DataGridSeller" style="width:100%;height:85%;">
		<table id="sellerDg"
			style="width:100%;height:100%;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				fitColumns:true,
				scrollbarSize:0">
			<thead>
				<tr>
					<th field="slId" width="10" align="center">编号</th>
					<th field="slSupplierName" width="20" align="center">名称</th>
					<th field="slBusinessAddress" width="40" align="center">地址</th>
					<th field="slTheContactName" width="20" align="center">联系人</th>
					<th field="slPhone" width="20" align="center">电话</th>
					<th field="slMobilePhone" width="20" align="center">手机</th>
					<th field="slStatus" width="20" align="center">状态</th>
					<th field="slPriority" width="20" align="center">优先级</th>
					<th field="userName" width="20" align="center">登记人</th>
			</thead>
		</table>
	</div>
	<div id="sellerPageDiv" style="width:100%;text-align:center;"></div>
	<!-- 添加商家 -->
	<div id="addSellerlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>商家信息</font>
			</legend>
			<div style="margin:5px 0 0 2px;float:left">
				名&emsp;&emsp;称：<input class="addSlSupplierName" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				地&emsp;&emsp;址：<input class="addSlBusinessAddress" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				联&ensp;系&ensp;人：<input class="addSlTheContactName" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				电&emsp;&emsp;话：<input class="addSlPhone" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				手&emsp;&emsp;机：<input class="addSlMobilePhone" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				状&emsp;&emsp;态：<input class="addSlStatus" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				优&ensp;先&ensp;级：<input class="addSlPriority" style="width:130px">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				登&ensp;记&ensp;人：<input class="add_seller_userName" style="width:130px;"
					disabled='disabled' readonly='readonly' /><input
					class="add_seller_userId" style="display:none" />
			</div>
		</fieldset>
		<div id="addSellerSave" style="margin:10px 0 10px 0;">
			<center>
				<a id="addSaveButton" 
					class="easyui-linkbutton" iconcls="icon-save"
					onclick="doAddSeller()">保存</a> <a 
					class="easyui-linkbutton" iconcls="icon-cancel"
					onclick="$('#addSellerlg').dialog('close')">取消</a>
			</center>
		</div>
	</div>
	<!-- 修改商家 -->
	<div id="updateSellerlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>商家信息</font>
			</legend>
			<div style="margin:5px 0 0 2px;float:left">
				名&emsp;&emsp;称：<input class="updateSlSupplierName" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				地&emsp;&emsp;址：<input class="updateSlBusinessAddress" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				联&ensp;系&ensp;人：<input class="updateSlTheContactName" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				电&emsp;&emsp;话：<input class="updateSlPhone" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				手&emsp;&emsp;机：<input class="updateSlMobilePhone" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				状&emsp;&emsp;态：<input class="updateSlStatus" style="width:130px">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				优&ensp;先&ensp;级：<input class="updateSlPriority" style="width:130px">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				登&ensp;记&ensp;人：<input class="update_seller_userName" style="width:130px;"
					disabled='disabled' readonly='readonly' /><input
					class="update_seller_userId" style="display:none" />
			</div>
		</fieldset>
		<div id="updateSellerSave" style="margin:10px 0 10px 0;">
			<center>
				<a id="updateSaveButton" 
					class="easyui-linkbutton" iconcls="icon-save"
					onclick="doUpdateSeller()">保存</a> <a 
					class="easyui-linkbutton" iconcls="icon-cancel"
					onclick="$('#updateSellerlg').dialog('close')">取消</a>
			</center>
		</div>
	</div>
	<!-- 查看商家 -->
	<div id="seeSellerlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>商家信息</font>
			</legend>
			<div style="margin:5px 0 0 2px;float:left">
				名&emsp;&emsp;称：<input class="seeSlSupplierName" style="width:130px" readonly="readonly">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				地&emsp;&emsp;址：<input class="seeSlBusinessAddress" style="width:130px" readonly="readonly">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				联&ensp;系&ensp;人：<input class="seeSlTheContactName" style="width:130px" readonly="readonly">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				电&emsp;&emsp;话：<input class="seeSlPhone" style="width:130px" readonly="readonly">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				手&emsp;&emsp;机：<input class="seeSlMobilePhone" style="width:130px" readonly="readonly">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				状&emsp;&emsp;态：<input class="seeSlStatus" style="width:130px" readonly="readonly">
			</div>
			<div style="margin:5px 0 0 2px;float:left">
				优&ensp;先&ensp;级：<input class="seeSlPriority" style="width:130px" readonly="readonly">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				登&ensp;记&ensp;人：<input class="seeUserName" style="width:130px" readonly="readonly">
			</div>
		</fieldset>
	</div>
</body>
</html>