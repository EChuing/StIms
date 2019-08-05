<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>初始设置</title>
	<link rel="stylesheet" href="https://pic-static.fangzhizun.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/css/webuploader.css">
	<link rel="stylesheet" href="css/upload.css">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
    <script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.variable.js"></script>
	<link href="css/contextMenu.css" rel="stylesheet">
	<style>
		.url {
			display: inline-block;
			width: 110px;
		}
	</style>
    <style>
    	::-webkit-scrollbar{width:6px;height:6px}
		::-webkit-scrollbar-thumb{border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#c3c3c3}
		::-webkit-scrollbar-track{background-color:transparent}

		.variableboard {
			margin-top: 20px;
		}
	</style>
	<style>
		.roomTypePhoto{
			background-color: #4CAF50;
			border: none;
			color: white;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			-webkit-transition-duration: 0.4s;
			transition-duration: 0.4s;
			cursor: pointer;
			background-color: white;
			color: black;
			border: 2px solid #e7e7e7;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div class ="container-fluid" style="padding-top: 15px;" id="app">
		<ul class="nav nav-tabs" role="tablist" id="firstNav">
			<li id="tab1" role="presentation" class="active"><a href="#ttab1" aria-controls="ttab1" role="tab" data-toggle="tab">基础设置</a></li>
			<li id="tab2" role="presentation"><a href="#ttab2" aria-controls="ttab2" role="tab" data-toggle="tab">公寓设置</a></li>
			<li id="tab3" role="presentation"><a href="#ttab3" aria-controls="ttab3" role="tab" data-toggle="tab">旅业设置</a></li>
			<li id="tab4" role="presentation"><a href="#ttab4" aria-controls="ttab4" role="tab" data-toggle="tab">企业设置</a></li>
			<li id="tab5" role="presentation"><a href="#ttab5" aria-controls="ttab5" role="tab" data-toggle="tab">设备设置</a></li>
			<li id="tab6" role="presentation"><a href="#ttab6" aria-controls="ttab6" role="tab" data-toggle="tab">商超设置</a></li>
			<li id="tab7" role="presentation"><a href="#ttab7" aria-controls="ttab7" role="tab" data-toggle="tab">酒店设置</a></li>
			<li id="tab8" role="presentation"><a href="#ttab8" aria-controls="ttab8" role="tab" data-toggle="tab">民宿设置</a></li>
			<li id="tab9" role="presentation"><a href="#ttab9" aria-controls="ttab9" role="tab" data-toggle="tab">校园设置</a></li>
		</ul>
		<div class="tab-content variableboard " style="margin:20px;">
			<!-- 基础设置 -->
			<div role="tabpanel" class="tab-pane active" id="ttab1">
				<div style="width:100%;height: 100%;">
					<span style="color:red;font-size:15px">注意：改动变量后请按F5进行刷新页面后才能生效，自定义左侧快捷菜单需要重新登录才能生效。</span>
					<div style="clear:both"></div>
					<fieldset class="clearfix" id="wxpayAccount" style="width:30%;float:left">
						<legend>
							默认微信收款银行账户
						</legend>
						<div  class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
							<input style="display:none" class="accountId">
							<div style="margin:5px 0 0 5px;float:left;">
								收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
								</select>
							</div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
								</select>
							</div>
							<div style="clear:both"></div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户号码：<input style="width:150px" class="accountNum" readonly>
							</div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户归属：<input style="width:150px" class="accountBelong" readonly>
							</div>
						</div>
						<div style="margin:20px 0 5px 100px;color:black;font-size:13px;">
							<input type="button" value="保存" onclick="doSaveVariable('wxpayAccount',this)">
						</div>
					</fieldset>
					<div style="clear:both"></div>
					<div style="width: 33%;color:black;float:left;">
						<fieldset>
							<legend>
								意向人来源
							</legend>
							<div style="width: 100%;height:400px;color:black;float:left;">
								<div id="intendedSourceDiv" style="float:left; margin: 0 0 0 20px" >

								</div>
								<div style="float:left;margin:0 0 0 50px">
									<input type="button" value="添加" onclick="ctrlSelect('intendedSource',0,0)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('intendedSource',2,0)">
									<input id="intendedSourceUpdateIndex" style="width:150px;display: none;" type="text">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('intendedSource',4,0)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('intendedSource',5,0)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('intendedSource',6,0)"><br><br>
									<input type="button" value="预览" onclick="ctrlSelect('intendedSource',7,0)">
								</div>
								<div style="clear: both;"></div>
								<div style="float:left;width:300px;margin:0 0 20px 0">
									<center>
										<br>
										<div style="height: 25px;">
											<input id="intendedSourceAdd" style="width:150px;display: none;" type="text">
											<input id="intendedSourceAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('intendedSource',1,0)">
											<input id="intendedSourceUpdate" style="width:150px;display: none;" type="text">
											<input id="intendedSourceUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('intendedSource',3,0)">
											<select id="intendedSourceShow" style="display: none;width: 150px;"></select>
										</div>
										<div id="intendedSourceTips" style="color:red;font-size: 13px;height: 20px;"></div>
										<input type="button" value="保存" onclick="doSaveVariable('intendedSource')">
										<input type="button" value="恢复初始" onclick="recoveryVariable('intendedSource')">
									</center>
								</div>
							</div>
						</fieldset>
					</div>
					<div style="width: 33%;color:black;float:left;">
						<fieldset>
							<legend>
								银行类别
							</legend>
							<div style="width: 100%;height:400px;color:black;float:left;">
								<div id="bankTypeDiv" style="float:left; margin: 0 0 0 20px">

								</div>
								<div style="float:left;margin:0 0 0 50px">
									<input type="button" value="添加" onclick="ctrlSelect('bankType',0,0)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('bankType',2,0)">
									<input id="bankTypeUpdateIndex" style="width:150px;display: none;" type="text">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('bankType',4,0)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('bankType',5,0)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('bankType',6,0)"><br><br>
									<input type="button" value="预览" onclick="ctrlSelect('bankType',7,0)">
								</div>
								<div style="clear: both;"></div>
								<div style="float:left;width:300px">
									<center>
										<br>
										<div style="height: 25px;">
											<input id="bankTypeAdd" style="width:150px;display: none;" type="text"> <input id="bankTypeAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('bankType',1,0)">
											<input id="bankTypeUpdate" style="width:150px;display: none;" type="text"> <input id="bankTypeUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('bankType',3,0)">
											<select id="bankTypeShow" style="display: none;width: 150px;"></select>
										</div>
										<div id="bankTypeTips" style="color:red;font-size: 13px;height: 20px;"></div>
										<input type="button" value="保存" onclick="doSaveVariable('bankType')">
										<input type="button" value="恢复初始" onclick="recoveryVariable('bankType')">
									</center>
								</div>
							</div>
						</fieldset>
					</div>
					<div style="width: 34%;color:black;float:left;">
						<fieldset>
							<legend>
								事务审批类型
							</legend>
							<div style="width: 100%;height:400px;color:black;float:left;">
								<div id="eventApprovalTypeDiv" style="float:left; margin: 0 0 0 20px">

								</div>
								<div style="float:left;margin:0 0 0 50px">
									<input type="button" value="添加" onclick="ctrlSelect('eventApprovalType',0,0)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('eventApprovalType',2,0)">
									<input id="eventApprovalTypeUpdateIndex" style="width:150px;display: none;" type="text">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('eventApprovalType',4,0)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('eventApprovalType',5,0)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('eventApprovalType',6,0)"><br><br>
									<input type="button" value="预览" onclick="ctrlSelect('eventApprovalType',7,0)">
									<br><br>
								</div>
								<div style="clear: both;"></div>
								<div style="float:left;width:300px">
									<center>
										<br>
										<div style="height: 25px;">
											<input id="eventApprovalTypeAdd" style="width:150px;display: none;" type="text"> <input id="eventApprovalTypeAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('eventApprovalType',1,0)">
											<input id="eventApprovalTypeUpdate" style="width:150px;display: none;" type="text"> <input id="eventApprovalTypeUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('eventApprovalType',3,0)">
											<select id="eventApprovalTypeShow" style="display: none;width: 150px;"></select>
										</div>
										<div id="eventApprovalTypeTips" style="color:red;font-size: 13px;height: 20px;"></div>
										<input type="button" value="保存" onclick="doSaveVariable('eventApprovalType')">
										<input type="button" value="恢复初始" onclick="recoveryVariable('eventApprovalType')">
									</center>
								</div>
							</div>
						</fieldset>
					</div>
					<div style="width: 34%;color:black;float:left;">
						<fieldset>
							<legend>
								账户类型
							</legend>
							<div style="width: 100%;height:400px;color:black;float:left;">
								<div id="acountTypeDiv" style="float:left; margin: 0 0 0 20px">
								</div>
								<div style="float:left;margin:0 0 0 50px">
									<input type="button" value="添加" onclick="ctrlSelect('acountType',0,0)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('acountType',2,0)">
									<input id="acountTypeUpdateIndex" style="width:150px;display: none;" type="text">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('acountType',4,0)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('acountType',5,0)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('acountType',6,0)"><br><br>
									<input type="button" value="预览" onclick="ctrlSelect('acountType',7,0)">
									<br><br>

								</div>
								<div style="clear: both;"></div>
								<div style="float:left;width:300px">
									<center>
										<br>
										<div style="height: 25px;">
											<input id="acountTypeAdd" style="width:150px;display: none;" type="text"> <input id="acountTypeAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('acountType',1,0)">
											<input id="acountTypeUpdate" style="width:150px;display: none;" type="text"> <input id="acountTypeUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('acountType',3,0)">
											<select id="acountTypeShow" style="display: none;width: 150px;"></select>
										</div>
										<div id="acountTypeTips" style="color:red;font-size: 13px;height: 20px;"></div>
										<input type="button" value="保存" onclick="doSaveVariable('acountType')">
										<input type="button" value="恢复初始" onclick="recoveryVariable('acountType')">
									</center>
								</div>
							</div>
						</fieldset>
					</div>
					<div style="width: 100%;color:black;float:left;">
						<fieldset>
							<legend>
								收支类别
							</legend>
							<div style="color:black;height:330px;float:left;">
								<div id="newFinancialNatureDiv" style="float:left; margin: 0 0 0 20px">

								</div>
								<div style="float:left;margin:0 0 0 30px">
									<br><br>
									<input type="button" value="添加" onclick="ctrlSelect('newFinancialNature',0,1)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('newFinancialNature',2,1)">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('newFinancialNature',4,1)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('newFinancialNature',5,1)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('newFinancialNature',6,1)"><br><br>
									<select id="newFinancialNatureShow" style="display: none;width: 150px;"></select><br><br>
								</div>
							</div>
							<div style="color:black;height:330px;float:left;margin:0 0 0 20px">
								<div id="newFinancialBigTypeDiv" style="float:left;">

								</div>
								<div style="float:left;margin:0 0 0 30px">
									<br><br>
									<input type="button" value="添加" onclick="ctrlSelect('newFinancialBigType',0,2)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('newFinancialBigType',2,2)">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('newFinancialBigType',4,2)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('newFinancialBigType',5,2)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('newFinancialBigType',6,2)"><br><br>
									<select id="newFinancialBigTypeShow" style="display: none;width: 150px;"></select><br><br>
								</div>
							</div>
							<div style="color:black;height:330px;float:left;margin:0 0 0 20px">
								<div id="newFinancialTypeDiv" style="float:left;">

								</div>
								<div style="float:left;margin:0 0 0 30px">
									<br><br>
									<input type="button" value="添加" onclick="ctrlSelect('newFinancialType',0,3)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<input type="button" value="收支分类预览" id="financilSearchButton" onclick="ctrlSelect('newFinancialType',7,1)">
									<div id="financilSearchDiv">

									</div>
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('newFinancialType',2,3)">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('newFinancialType',4,3)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('newFinancialType',5,3)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('newFinancialType',6,3)"><br><br>
									<select id="newFinancialTypeShow" style="display: none;width: 150px;"></select><br><br>
								</div>
								<div style="clear: both;"></div>
							</div>
							<div style="clear: both;"></div>
							<div style="float:left;width:600px;margin:0 0 20px 0">
								<center>
									<div id="newFinancialDiv" style="height: 25px;">
										<input id="newFinancialNatureAdd" style="width:150px;display: none;" type="text">
										<input id="newFinancialNatureAddButton" style="display: none;" type="button" value="添加性质" onclick="ctrlSelect('newFinancialNature',1,1)">
										<input id="newFinancialNatureUpdate" style="width:150px;display: none;" type="text">
										<input id="newFinancialNatureUpdateIndex" style="width:150px;display: none;" type="text">
										<input id="newFinancialNatureUpdateButton" style="display: none;" type="button" value="修改性质" onclick="ctrlSelect('newFinancialNature',3,1)">
										<input id="newFinancialBigTypeAdd" style="width:150px;display: none;" type="text">
										<input id="newFinancialBigTypeAddButton" style="display: none;" type="button" value="添加分类" onclick="ctrlSelect('newFinancialBigType',1,2)">
										<input id="newFinancialBigTypeUpdate" style="width:150px;display: none;" type="text">
										<input id="newFinancialBigTypeUpdateIndex" style="width:150px;display: none;" type="text">
										<input id="newFinancialBigTypeUpdateButton" style="display: none;" type="button" value="修改分类" onclick="ctrlSelect('newFinancialBigType',3,2)">
										<input id="newFinancialTypeAdd" style="width:150px;display: none;" type="text">
										<input id="newFinancialTypeAddButton" style="display: none;" type="button" value="添加种类" onclick="ctrlSelect('newFinancialType',1,3)">
										<input id="newFinancialTypeUpdate" style="width:150px;display: none;" type="text">
										<input id="newFinancialTypeUpdateIndex" style="width:150px;display: none;" type="text">
										<input id="newFinancialTypeUpdateButton" style="display: none;" type="button" value="修改种类" onclick="ctrlSelect('newFinancialType',3,3)">
									</div>
									<div id="newFinancialTips" style="color:red;font-size: 13px;height: 20px;"></div>
									<input type="button" value="保存" onclick="doSaveVariable('newFinancial')">
									<input type="button" value="恢复初始" onclick="recoveryVariable('newFinancial')">
									<!-- <input type="button" value="测试数组" onclick="console.log(JSON.stringify(_updateNewFinancial));"> -->
								</center>
							</div>
						</fieldset>
					</div>
					<div style="width: 48%;color:black;float:left;">
						<fieldset>
							<legend>
								资产类别
							</legend>
							<div style="color:black;height:330px;float:left;">
								<div id="assetsTypeDiv" style="float:left; margin:  0 0 0 20px">

								</div>
								<div style="float:left;margin:0 0 0 30px">
									<br><br>
									<input type="button" value="添加" onclick="ctrlSelect('assetsType',0,4)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('assetsType',2,4)">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('assetsType',4,4)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('assetsType',5,4)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('assetsType',6,4)"><br><br>
									<select id="assetsTypeShow" style="display: none;width: 150px;"></select><br><br>
								</div>
							</div>
							<div style="color:black;height:330px;float:left;margin:0 0 0 20px">
								<div id="assetsNameDiv" style="float:left;">

								</div>
								<div style="float:left;margin:0 0 0 30px">
									<br><br>
									<input type="button" value="添加" onclick="ctrlSelect('assetsName',0,5)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('assetsName',2,5)">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('assetsName',4,5)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('assetsName',5,5)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('assetsName',6,5)"><br><br>
									<select id="assetsNameShow" style="display: none;width: 150px;"></select><br><br>
								</div>
							</div>
							<div style="clear: both;"></div>
							<div style="float:left;width:400px;margin:0 0 20px 0">
								<center>
									<div id="assetsDiv" style="height: 25px;">
										<input id="assetsTypeAdd" style="width:150px;display: none;" type="text">
										<input id="assetsTypeAddButton" style="display: none;" type="button" value="添加类别" onclick="ctrlSelect('assetsType',1,4)">
										<input id="assetsTypeUpdate" style="width:150px;display: none;" type="text">
										<input id="assetsTypeUpdateIndex" style="width:150px;display: none;" type="text">
										<input id="assetsTypeUpdateButton" style="display: none;" type="button" value="修改类别" onclick="ctrlSelect('assetsType',3,4)">
										<input id="assetsNameAdd" style="width:150px;display: none;" type="text">
										<input id="assetsNameAddButton" style="display: none;" type="button" value="添加名称" onclick="ctrlSelect('assetsName',1,5)">
										<input id="assetsNameUpdate" style="width:150px;display: none;" type="text">
										<input id="assetsNameUpdateIndex" style="width:150px;display: none;" type="text">
										<input id="assetsNameUpdateButton" style="display: none;" type="button" value="修改名称" onclick="ctrlSelect('assetsName',3,5)">
									</div>
									<div id="assetsTips" style="color:red;font-size: 13px;height: 20px;"></div>
									<input type="button" value="保存" onclick="doSaveVariable('assetsType')">
									<input type="button" value="恢复初始" onclick="recoveryVariable('assetsType')">
								</center>
							</div>
							</fieldset>
					</div>
					<div style="width: 48%;color:black;float:left;">
						<fieldset>
							<legend>
								耗材类别
							</legend>
							<div style="color:black;height:330px;float:left;">
								<div id="suppliesTypeDiv" style="float:left; margin: 0 0 0 20px">

								</div>
								<div style="float:left;margin:0 0 0 30px">
									<br><br>
									<input type="button" value="添加" onclick="ctrlSelect('suppliesType',0,4)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('suppliesType',2,4)">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('suppliesType',4,4)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('suppliesType',5,4)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('suppliesType',6,4)"><br><br>
									<select id="suppliesTypeShow" style="display: none;width: 150px;"></select><br><br>
								</div>
							</div>
							<div style="color:black;height:330px;float:left;margin:0 0 0 20px">
								<div id="suppliesNameDiv" style="float:left;">

								</div>
								<div style="float:left;margin:0 0 0 30px">
									<br><br>
									<input type="button" value="添加" onclick="ctrlSelect('suppliesName',0,5)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('suppliesName',2,5)">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('suppliesName',4,5)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('suppliesName',5,5)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('suppliesName',6,5)"><br><br>
									<select id="suppliesNameShow" style="display: none;width: 150px;"></select><br><br>
								</div>
							</div>
							<div style="clear: both;"></div>
							<div style="float:left;width:400px;margin:0 0 20px 0">
								<center>
									<div id="suppliesDiv" style="height: 25px;">
										<input id="suppliesTypeAdd" style="width:150px;display: none;" type="text">
										<input id="suppliesTypeAddButton" style="display: none;" type="button" value="添加类别" onclick="ctrlSelect('suppliesType',1,4)">
										<input id="suppliesTypeUpdate" style="width:150px;display: none;" type="text">
										<input id="suppliesTypeUpdateIndex" style="width:150px;display: none;" type="text">
										<input id="suppliesTypeUpdateButton" style="display: none;" type="button" value="修改类别" onclick="ctrlSelect('suppliesType',3,4)">
										<input id="suppliesNameAdd" style="width:150px;display: none;" type="text">
										<input id="suppliesNameAddButton" style="display: none;" type="button" value="添加名称" onclick="ctrlSelect('suppliesName',1,5)">
										<input id="suppliesNameUpdate" style="width:150px;display: none;" type="text">
										<input id="suppliesNameUpdateIndex" style="width:150px;display: none;" type="text">
										<input id="suppliesNameUpdateButton" style="display: none;" type="button" value="修改名称" onclick="ctrlSelect('suppliesName',3,5)">
									</div>
									<div id="suppliesTips" style="color:red;font-size: 13px;height: 20px;"></div>
									<input type="button" value="保存" onclick="doSaveVariable('suppliesType')">
									<input type="button" value="恢复初始" onclick="recoveryVariable('suppliesType')">
								</center>
							</div>
							</fieldset>
					</div>
					<div style="width: 48%;color:black;float:left;">
						<fieldset>
							<legend>
								自定义左侧快捷菜单
							</legend>
						<div style="color:black;height:330px;float:left;">
								<div id="speedLeftMenuAllDiv" style="float:left; margin: 0 0 0 20px">

								</div>
								<div style="float:left;margin:0 30px 0 30px">
									<br><br><br><br><br><br><br><br><br>
									<input type="button" value="添加→" onclick="addSpeedLeftSelect()"><br><br>
								</div>
						</div>
						<div style="color:black;height:330px;float:left;">
								<div id="speedLeftMenuDiv" style="float:left;">

								</div>
								<div style="float:left;margin:0 0 0 30px">
									<br><br><br><br><br><br>
									<input type="button" value="上移" onclick="ctrlSelect('speedLeftMenu',4,0)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('speedLeftMenu',5,0)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('speedLeftMenu',6,0)"><br><br>
									<input type="button" value="清空" onclick="$('#speedLeftMenuSelect').empty();"><br><br>
								</div>
						</div>
						<div style="clear: both;"></div>
						<div style="float:left;width:100%;margin:0 0 20px 0">
								<center>
									<div id="speedLeftMenuTips" style="color:red;font-size: 13px;height: 20px;"></div>
									<input type="button" value="保存" onclick="saveSpeedLeftSelect()">
								</center>
						</div>
						</fieldset>
					</div>
					<!-- 区域  账号 -->

					<div id="storeAcoountDiv" style="width: 48%;color:black;float:left;">
					<!-- 	<input style="width:150px" id="storefrontId" type="hidden"> -->
						<fieldset>
							<legend>
								区域 账号菜单
							</legend>
							<div style="color:black;height:330px;float:left;">
								<div id="storefrontDiv" style="float:left; margin:  0 0 0 20px">
								</div>
							</div>

							<fieldset class="clearfix" id="account" style="width:30%;float:left; margin:20px 0 0 5%">
								<div  class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
									<input style="display:none" class="accountId" >
									<input style="display:none" id="faId" >
									<div style="margin:5px 0 0 5px;float:left;">
										收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
										</select>
									</div>
									<div style='margin:5px 0 0 5px;float: left;'>
										账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
										</select>
									</div>
									<div style="clear:both"></div>
									<div style='margin:5px 0 0 5px;float: left;'>
										账户号码：<input style="width:150px" class="accountNum" readonly>
									</div>
									<div style='margin:5px 0 0 5px;float: left;'>
										账户归属：<input style="width:150px" class="accountBelong" readonly>
									</div>
								</div>
							</fieldset>

						<div style="clear: both;"></div>
						<div style="float:left;width:400px;margin:0 0 20px 0">
							<center>
								<div id="storefrontSelectTips" style="color:red;font-size: 13px;height: 20px;"></div>
								<input type="button" value="保存" onclick="doSaveAccount('account',this)">
							</center>
						</div>
						</fieldset>
					</div>
					<!--任务类型  -->
					<div style="clear:both"></div>
					<div style="width: 33%;color:black;float:left;">
						<fieldset>
							<legend>
								任务类型
							</legend>
							<div style="width: 100%;height:400px;color:black;float:left;">
								<div id="taskTypeDiv" style="float:left; margin: 0 0 0 20px">

								</div>
								<div style="float:left;margin:0 0 0 50px">
									<input type="button" value="添加" onclick="ctrlSelect('taskType',0,0)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('taskType',2,0)">
									<input id="taskTypeUpdateIndex" style="width:150px;display: none;" type="text">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('taskType',4,0)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('taskType',5,0)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('taskType',6,0)"><br><br>
									<input type="button" value="预览" onclick="ctrlSelect('taskType',7,0)">
								</div>
								<div style="clear: both;"></div>
								<div style="float:left;width:300px">
									<center>
										<br>
										<div style="height: 25px;">
											<input id="taskTypeAdd" style="width:150px;display: none;" type="text">
											<input id="taskTypeAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('taskType',1,0)">
											<input id="taskTypeUpdate" style="width:150px;display: none;" type="text">
											<input id="taskTypeUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('taskType',3,0)">
											<select id="taskTypeShow" style="display: none;width: 150px;"></select>
										</div>
										<div id="taskTypeTips" style="color:red;font-size: 13px;height: 20px;"></div>
										<input type="button" value="保存" onclick="doSaveVariable('taskType')">
										<input type="button" value="恢复初始" onclick="recoveryVariable('taskType')">
									</center>
								</div>
							</div>
						</fieldset>
					</div>
					<!--岗位类型  -->
					<div style="width: 33%;color:black;float:left;">
						<fieldset>
							<legend>
								岗位类型
							</legend>
							<div style="width: 100%;height:400px;color:black;float:left;">
								<div id="userTypeDiv" style="float:left; margin: 0 0 0 10px">
								</div>
								<div style="float:left;margin:0 0 0 50px">
									<input type="button" value="添加" onclick="ctrlSelect('userType',0,0)">
									<br><br>
									<input type="button" value="修改" onclick="ctrlSelect('userType',2,0)">
									<input id="userTypeUpdateIndex" style="width:150px;display: none;" type="text">
									<br><br>
									<input type="button" value="上移" onclick="ctrlSelect('userType',4,0)"><br><br>
									<input type="button" value="下移" onclick="ctrlSelect('userType',5,0)"><br><br>
									<input type="button" value="删除" onclick="ctrlSelect('userType',6,0)"><br><br>
									<input type="button" value="预览" onclick="ctrlSelect('userType',7,0)">
								</div>
								<div style="clear: both;"></div>
								<div style="float:left;width:300px">
									<center>
										<br>
										<div style="height: 25px;">
											<input id="userTypeAdd" style="width:150px;display: none;" type="text">
											<input id="userTypeAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('userType',1,0)">
											<input id="userTypeUpdate" style="width:150px;display: none;" type="text">
											<input id="userTypeUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('userType',3,0)">
											<select id="userTypeShow" style="display: none;width: 150px;"></select>
										</div>
										<div id="userTypeTips" style="color:red;font-size: 13px;height: 20px;"></div>
										<input type="button" value="保存" onclick="doSaveVariable('userType')">
										<input type="button" value="恢复初始" onclick="recoveryVariable('userType')">
									</center>
								</div>
							</div>
						</fieldset>
					</div>
					<!--商超外部顾客来源  -->
					<div style="clear:both"></div>
					<!--商超外部顾客类型  -->

					<!--商超外部顾客规模  -->

					<!--商超外部顾客联系人岗位  -->



					<div style="width: 100%;color:black;float:left;">
						<fieldset class="clearfix">
							<legend>
								微信公众号广告设置
							</legend>
							<div style='margin:5px 0 10px 0;'>
								<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic_gzh()">上传及查看图片</a>
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="img1" class="url" style="width: 160px">轮播图链接1（375*150）：</label>
								<input id="img1" style="width:700px;" placeholder="图片链接，例如：https://www.baidu.com/img/bd_logo1.png">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="a1" class="url" style="width: 160px">轮播图跳转链接一：</label>
								<input id="a1" style="width:700px;" placeholder="跳转链接，例如：https://www.baidu.com">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="img2" class="url" style="width: 160px">轮播图链接2（375*150）：</label>
								<input id="img2" style="width:700px;" placeholder="图片链接，例如：https://www.baidu.com/img/bd_logo1.png">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="a2" class="url" style="width: 160px">轮播图跳转链接二：</label>
								<input id="a2" style="width:700px;" placeholder="跳转链接，例如：https://www.baidu.com">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="img3" class="url" style="width: 160px">轮播图链接3（375*150）：</label>
								<input id="img3" style="width:700px;" placeholder="图片链接，例如：https://www.baidu.com/img/bd_logo1.png">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="a3" class="url" style="width: 160px">轮播图跳转链接三：</label>
								<input id="a3" style="width:700px;" placeholder="跳转链接，例如：https://www.baidu.com">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="img5" class="url" style="width: 160px">中部图链接（375*150）：</label>
								<input id="img5" style="width:700px;" placeholder="图片链接，例如：https://www.baidu.com/img/bd_logo1.png">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="a5" class="url" style="width: 160px">中部图跳转链接：</label>
								<input id="a5" style="width:700px;" placeholder="跳转链接，例如：https://www.baidu.com">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="img6" class="url" style="width: 160px">底部图链接（345*138）：</label>
								<input id="img6" style="width:700px;" placeholder="图片链接，例如：https://www.baidu.com/img/bd_logo1.png">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="a6" class="url" style="width: 160px">底部图跳转链接：</label>
								<input id="a6" style="width:700px;" placeholder="跳转链接，例如：https://www.baidu.com">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="img4" class="url" style="width: 160px">租金查询图片链接：</label>
								<input id="img4" style="width:700px;" placeholder="图片链接，例如：https://www.baidu.com/img/bd_logo1.png">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="a4" class="url" style="width: 160px">租金查询跳转链接：</label>
								<input id="a4" style="width:700px;" placeholder="跳转链接，例如：https://www.baidu.com">
							</div>
							<div style="margin:50px 0 10px 400px;">
								<input type="button" value="保存" onclick="doSaveVariable('gzhAd')">
							</div>
						</fieldset>
					</div>
					<div style="width: 100%;color:black;float:left;">
						<fieldset class="clearfix">
							<legend>
								微信手续费相关设置
							</legend>
							<div style="margin:10px 0 10px 34px;float:left;">
								微信手续费比例： <input type="number" data-type="money" style="width:50px" id="chargePercentage"> %
							</div>
							<div style="margin:10px 0 10px 10px;float:left;">
								<input type="button" value="保存" onclick="doSaveVariable('chargePercentage')">
							</div>
							<div style="clear:both"></div>
							<div style="margin:10px 0 10px 10px;float:left;">
								微信手续费提醒文案：
							</div>
							<div style="margin:10px 0 10px 0;float:left;">
								<textarea id="chargeReminder"  rows="10" cols="50"></textarea>
							</div>
							<div style="margin:10px 0 10px 10px;float:left;">
								<input type="button" value="保存" onclick="doSaveVariable('chargeReminder')">
							</div>
						</fieldset>
					</div>
					<div style="width: 100%;color:black;float:left;">
						<fieldset class="clearfix">
							<legend>
								公司简称和客服电话相关设置
							</legend>
							<div style="margin:0 0 10px 0;">
								<label for="companyAbbreviation" class="url">公司简称：</label>
								<input id="companyAbbreviation" style="width:700px;" placeholder="公众号下方公司简称，例如：房至尊">
							</div>
							<div style="margin:0 0 10px 0;">
								<label for="customerServiceTel" class="url">客服电话：</label>
								<input id="customerServiceTel" style="width:700px;" placeholder="公众号下方客服电话，例如：0755-25609945">
							</div>
							<div style="margin:50px 0 10px 400px;">
								<input type="button" value="保存" onclick="insertCompany()">
							</div>
						</fieldset>
					</div>
					<div style="width: 100%;color:black;float:left;">
						<fieldset class="clearfix">
							<legend>违约金 费率设置</legend>
							<div style="margin:10px 0 10px 34px;float:left;">
								账单逾期违约金费率： <input type="number" data-type="money" style="width:50px" id="lateFeeRate"> %
							</div>
							<div style="margin:10px 0 10px 10px;float:left;">
								<input type="button" value="保存" onclick="doSaveVariable('lateFeeRate')">
							</div>
						</fieldset>
					</div>
				</div>
				<div id="variablesImgDlg" style="padding:6px"
					class="easyui-dialog" data-options="closed:true">
					<div style="padding:5px 0 0 10px;">
						<a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadPic()">上传</a>
						<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removePic()">选择删除</a>
						<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refresh()">刷新</a>
					</div>
					<div id="removePicture" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
					<div id="imgWrapper" style="margin:10px 0 0 10px;"></div>
					<div style="clear:both"></div>
					<center>
						<div id='doRemovePic' style='margin:10px 0 0 10px;display:none;'>
							<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemovePic()">删除</a>
							<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel()">取消</a>
						</div>
					</center>
				</div>
			</div>
			<!--公寓设置 -->
			<div role="tabpane1" class="tab-pane " id="ttab2">
			<div style="width:100%;height: 100%;">
             <span style="color:red;font-size:15px">注意：改动变量后请按F5进行刷新页面后才能生效，自定义左侧快捷菜单需要重新登录才能生效。</span>
             <fieldset>
                 <legend>
                     各设置及检测开关
                 </legend>



				 <div id="moneySwitchDiv" style="width: 100%;color:black;float:left;">
					 定金:<input id="moneySwitch" type="checkbox" />
					 <span style="color:red;font-size:13px">用途：勾选，开启定金功能</span>
					 <br><br>
					 <input type="button" value="保存" onclick="doSaveVariable('moneySwitch')">
					 <input type="button" value="恢复初始" onclick="recoveryVariable('moneySwitch')">
					 <br><br>
				 </div>
				 <div id="moneyValuesDiv" style="width: 100%;color:black;float:left;"><%--oninput = "value=value.replace(/[^\d]/g,'')"--%>
					 定金数额：<input id="moneyValues" type="text"/>元
					 <span style="color:red;font-size:13px">用途： 设置定金数额</span>
					 <br><br>
					 <input type="button" value="保存" onclick="doSaveVariable('moneyValues')">
					 <input type="button" value="恢复初始" onclick="recoveryVariable('moneyValues')">
					 <br><br>
				 </div>


				 <div id="forcedFollowupSwitchDiv" style="width: 100%;color:black;float:left;">
					 查看业主/客户电话强写跟进功能:<input id="forcedFollowupSwitch" type="checkbox" />
					 <span style="color:red;font-size:13px">勾选，开启强写更加功能</span>
					 <br><br>
					 <input type="button" value="保存" onclick="doSaveVariable('forcedFollowupSwitch')">
					 <input type="button" value="恢复初始" onclick="recoveryVariable('forcedFollowupSwitch')">
					 <br><br>
				 </div>
				 <div id="forcedFollowupValuesDiv" style="width: 100%;color:black;float:left;">
					 设置业主查看不写更进的最大次数：<input id="forcedFollowupValues" type="text" oninput = "value=value.replace(/[^\d]/g,'')"/>
					 <span style="color:red;font-size:13px">设置查看业主/客户电话强写最大更加次数</span>
					 <br><br>
					 <input type="button" value="保存" onclick="suVollowupValue()">
					 <input type="button" value="恢复初始" onclick="recoveryVariable('forcedFollowupValues')">
					 <br><br>
				 </div>
                 <div id="settingSwitchDiv" style="width: 100%;color:black;float:left;">
                     合同编号检测开关：<input id="contractNums" type="checkbox" />
                     <span style="color:red;font-size:13px">用途：勾选后在添加托管、业主续签、添加已租、租客续签时需要进行合同编号检测</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('contractNums')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('contractNums')">
                     <br><br>
                 </div>
                 <div id="billNumDiv" style="width: 100%;color:black;float:left;">
                     票据编号检测开关：<input id="billNum" type="checkbox" />
                     <span style="color:red;font-size:13px">用途：勾选后在录入收支时需要进行票据编号检测</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('billNum')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('billNum')">
                     <br><br>
                 </div>
                 <div id="comfirmNumDiv" style="width: 100%;color:black;float:left;">
                     确认书编号检测开关：<input id="comfirmNum" type="checkbox" />
                     <span style="color:red;font-size:13px">用途：勾选后在添加维修进展时需要进行确认书编号检测</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('comfirmNum')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('comfirmNum')">
                     <br><br>
                 </div>
                 <div id="doorplatenoDiv" style="width: 100%;color:black;float:left;">
                     门牌号规则检测开关：<input id="doorplateno" type="checkbox" />
                     <span style="color:red;font-size:13px">用途：勾选后在添加资料房时需要进行门牌号规则检测</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('doorplateno')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('doorplateno')">
                     <br><br>
                 </div>
                 <div id="contractRiskControlDiv" style="width: 100%;color:black;float:left;">
                     合同风控开关：<input id="contractRiskControl" type="checkbox" />
                     <span style="color:red;font-size:13px">用途：勾选后不允许发起租期超过托管到期时间</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('contractRiskControl')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('contractRiskControl')">
                     <br><br>
                 </div>
                 <div id="autoSendMessageDiv" style="width: 100%;color:black;float:left;">
                     自动发送短信开关：<input id="autoSendMessage" type="checkbox" />
                     <span style="color:red;font-size:13px">用途：勾选后每天定时发送租客催租短信</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('autoSendMessage')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('autoSendMessage')">
                     <br><br>
                 </div>
                 <div id="autoSendMessageDaysDiv" style="width: 100%;color:black;float:left;">
                     自动发送短信提前天数：<input id="autoSendMessageDays" type="text" />
                     <span style="color:red;font-size:13px">用途：设置后提前（设置天数）天发送租客催租短信</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('autoSendMessageDays')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('autoSendMessageDays')">
                     <br><br>
                 </div>
                 <div id="maxOverdueDiv" style="width: 100%;color:black;float:left;">
                     欠费风控开关：<input id="maxOverdue" type="checkbox"/>
                     <span style="color:red;font-size:13px">用途：开启时提醒公寓设置逾期天数后执行</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('maxOverdue')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('maxOverdue')">
                     <br><br>
                 </div>
                 <div id="maxOverdueDaysDiv" style="width: 100%;color:black;float:left;">
                     欠费逾期天数：<input id="maxOverdueDays" type="text" />
                     <span style="color:red;font-size:13px">用途：欠费超过的天数（设置天数）冻结门锁使用</span>
                     <br><br>
                     <input type="button" value="保存" onclick="doSaveVariable('maxOverdueDays')">
                     <input type="button" value="恢复初始" onclick="recoveryVariable('maxOverdueDays')">
                     <br><br>
                 </div>
                 <div style="width: 100%;color:black;float:left;">
                     收租时间开关：<input id="timeOnAndOff" type="checkbox" onclick="timeOnAndOff()"/>
                     <span style="color:red;font-size:13px">用途：开启时设置已租里面的出租时间</span>
                     <br><br>
                     <div id="scope">收租时间范围：<input id="daymin"  onkeyup="verify(this)" type="text" style="width: 50px" />&nbsp—&nbsp<input id="daymax" type="text" onkeyup="verify(this)" style="width: 50px"/></div>
                     <br>
                     <input type="button" value="保存" onclick="doSaveVariable('timeScope')">
                     <br><br>
                 </div>
                 <div id="meterReadingDiv" style="width: 100%;color:black;float:left;">
                 自动抄表开关：<input id="meterReadingSwitch" type="checkbox" />
                     <span style="color:red;font-size:13px">用途：勾选后系统会在设定的时间自动进行抄表</span>
                     <br><br>
                   自动抄表时间：<input id="meterReadingTimes" type="text" oninput="value=value.replace(/[^\d]/g,'');if(value>28)value=28;if(value<1)value=1;"/> 范围：1号~28号
                     <br>
                     <input type="button" value="保存" onclick="doSaveVariable('meterReading')">
                     <br><br>
                 </div>
				 <div style="width: 100%;color:black;float:left;">
					 门锁二次授权开关：<input id="doorLockAuthorization" type="checkbox" onclick="doorLockAuthorization()"/>
					 <span style="color:red;font-size:13px">用途：可以授权他人单次限时开门密码权限</span>
					 	<input id="authorizedFee" hidden="hidden" value="2">
					 <br><br>
					 <input type="button" value="保存" onclick="doSaveVariable('doorLockAuthorization')">
					 <br><br>
				 </div>
             </fieldset>
             <fieldset class="clearfix">
                    <legend>
                        默认租务处理人员
                    </legend>
                    <div style="clear:both"></div>
                    <div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
                        维修值班人员：<input id="repairShowUserInfo" style="width:150px;cursor: pointer;" readonly="readonly"
                                        class="choose_user_button" doFlag="repair" doFun="" value="">
                        <input id="repairGetUserStoreId" type="hidden">
                        <input id="repairGetUserDetId" type="hidden">
                        <input id="repairGetUserId" type="hidden">
                        <div id="repairShowUserInfoDiv" style="display:none;">
                        </div>
                    </div>
                    <div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
                        <input type="button" value="保存" onclick="doSaveVariable('onDutyRepairer')">
                        <input type="button" value="恢复初始" onclick="recoveryVariable('onDutyRepairer')">
                    </div>
                </fieldset>
			</div>
			</div>
			<!--旅业设置 -->
			<div role="tabpanel" class="tab-pane" id="ttab3">
				<div style="width:100%;height: 100%;">
				<span style="color:red;font-size:15px">注意：改动变量后请按F5进行刷新页面后才能生效，自定义左侧快捷菜单需要重新登录才能生效。</span>
				<div style="clear:both"></div>
				<fieldset class="clearfix" id="shortRentAccount" style="width:30%;float:left">
	                <legend>
	                    短租收款银行账户
	                </legend>
	                <div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
	                    <input style="display:none" class="accountId">
	                    <div style="margin:5px 0 0 5px;float:left;">
	                        收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
	                        </select>
	                    </div>
	                    <div style='margin:5px 0 0 5px;float: left;'>
	                        账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
	                        </select>
	                    </div>
	                    <div style="clear:both"></div>
	                    <div style='margin:5px 0 0 5px;float: left;'>
	                        账户号码：<input style="width:150px" class="accountNum" readonly>
	                    </div>
	                    <div style='margin:5px 0 0 5px;float: left;'>
	                        账户归属：<input style="width:150px" class="accountBelong" readonly>
	                    </div>
	                </div>
	                <div style="margin:20px 0 5px 200px;color:black;font-size:13px;">
	                    <input type="button" value="保存" onclick="doSaveVariable('shortRentAccount',this)">
	                </div>
	            </fieldset>
	            </div>
			</div>
			<!--企业设置 -->
			<div role="tabpanel" class="tab-pane" id="ttab4">
			</div>
			<!-- 设备设置 -->
			<div role="tabpanel" class="tab-pane" id="ttab5">
                <div style="width:100%;height: 100%;">
                    <span style="color:red;font-size:15px">注意：改动变量后请按F5进行刷新页面后才能生效，自定义左侧快捷菜单需要重新登录才能生效。</span>
                    <fieldset>
                        <legend>
                            各设置及检测开关
                        </legend>
                    	<div id="waterDailyVariableDiv" style="width: 100%;color:black;float:left;">
							当日水用量高于昨日用量预警变量：<input id="waterDailyVariable" type="text" />
							<span style="color:red;font-size:13px">用途：当日用水量高于昨日用量【设置用量】立方时，进入预警提醒</span>
							<br><br>
							<input type="button" value="保存" onclick="doSaveVariable('waterDailyVariable')">
							<input type="button" value="恢复初始" onclick="recoveryVariable('waterDailyVariable')">
							<br><br>
						</div>
						<div id="waterContinuityVariableDiv" style="width: 100%;color:black;float:left;">
							连续时间（分钟）用水预警变量：<input id="waterContinuityVariable" type="text" />
							<span style="color:red;font-size:13px">用途：连续【设置时间】用水时，进入预警提醒</span>
							<br><br>
							<input type="button" value="保存" onclick="doSaveVariable('waterContinuityVariable')">
							<input type="button" value="恢复初始" onclick="recoveryVariable('waterContinuityVariable')">
							<br><br>
						</div>
						<div id="setBaseDuv" style="width: 100%;color:black;float:left;">
							门卡进制设置：
							<%--<input  style="width:150px;" id="doorCardSystem" value="16">--%>
							<select  style="width:150px;" id="doorCardSystem1">
							</select>
							<span style="color:red;font-size:13px">取值范围（2、4、8、10、16）用途：设置门卡的进制</span>
							<br><br>
							<input type="button" value="保存" onclick="doSaveVariable('doorCardSystem1')">
							<input type="button" value="恢复初始" onclick="recoveryVariable('doorCardSystem')">
							<br><br>
						</div>
                    </fieldset>

                </div>
			</div>
			<!-- 酒店设置 -->
			<div role="tabpane" class="tab-pane " id="ttab7" >
                <div id="setUpDlg" style="padding:6px;">
                    <input type="hidden" id="jsrsuAdImgs">
                    <input type="hidden" id="jsrsuId">
                    <input type="hidden" id="jsrsu_room_type">
                    <div style="float:left;margin:10px 0 0 16px">
                        入住时间：<input type="time"  id="jsrsuCheckInTime" style="width:100px;text-align:center"/>
                    </div>
                    <div style="float:left;margin:10px 0 0 12px">
                        退房时间：<input type="time"  id="jsrsuCheckOutTime" style="width:100px;text-align:center"/>
                    </div>
                    <div style="float:left;margin:10px 0 0 12px">
                        对外简称：<input type="text"  id="jsrsuWxgzhTitle" style="width:100px;text-align:center"/>
                    </div>
                    <div style="float:left;margin:10px 0 0 12px">
                        客服电话：<input type="text"  id="jsrsuTelphone" style="width:100px;text-align:center"/>
                    </div>
                    <div style="float:left;margin:10px 0 0 46px">
                        最长订房时间：<input type="text"  id="jsrsuLongestBookingDays" style="width:100px;text-align:center"/>
                    </div>
                    <div style="clear:both"></div>
                    <div style="float:left;margin:10px 0 0 15px">
                        线上下单：<select id="jsrsuState">
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                    </div>
                    <div style="float:left;margin:10px 0 0 12px">
                        提前搬离退房费：<select id="jsrsuRefundRoomCharge">
                        <option value="1">允许</option>
                        <option value="0">不允许</option>
                    </select>
                    </div>
                    <div style="float:left;margin:10px 0 0 16px">
                        提前搬离，超过<input type="time"  id="jsrsuRefundRoomChargeTime" style="width:100px;text-align:center"/>时刻，收取整天房费
                    </div>
                    <div style="float:left;margin:10px 0 0 12px">
                        未来多少天可以预定：<input type="text"  id="jsrsuFutureBookingDays" style="width:100px;text-align:center"/>
                    </div>
                    <div style="clear:both"></div>
                    <div style="float:left;margin:10px 0 0 15px">
                        酒店介绍：<textarea type="text"  id="jsrsuGrogshopIntroduce" style="width:850px;text-align:center"></textarea>
                    </div>
                    <!-- 公众号的交易 -->
                    <div style="clear:both"></div>
                    <div style="float:left;margin:0 0 0 16px;width:90%;">
                        <h3 style="font-size: 15px;color:black;">交易规则</h3>
                    </div>
                    <div style="clear:both"></div>
                    <div style="float:left;margin:0 0 0 16px">
                        预定方式：<textarea type="text"  id="jsrsuPredeterminedMode" style="height:25px;width:150px;text-align:center"/></textarea>
                    </div>
                    <div style="float:left;margin:0 0 0 12px">
                        入住天数：<textarea type="text"  id="jsrsuCheckInMode" style="height:25px;width:150px;text-align:center"/></textarea>
                    </div>

                    <div style="float:left;margin:0 0 0 20px">
                        其他费用：<textarea type="text"  id="jsrsuOtherExpenses" style="height:25px;width:150px;text-align:center"/></textarea>
                    </div>
                    <div style="float:left;margin:0 0 0 12px">
                        在线订金比: <textarea type="text"  id="jsrsuOnlineDepositRatio" style="height:25px;width:150px;text-align:center"/></textarea>
                    </div>
                    <div style="clear:both"></div>
                    <div style="float:left;margin:10px 0 0 39px">
                        押金：<textarea type="text"  id="jsrsuTradingDeposit" style="height:25px;width:150px;text-align:center"/></textarea>
                    </div>
                    <div style="float:left;margin:10px 0 0 37px">
                        加客：<textarea type="text"  id="jsrsuAddGuest" style="height:25px;width:150px;text-align:center"/></textarea>
                    </div>
                    <div style="float:left;margin:10px 0 0 20px">
                        入住须知：<textarea type="text"  id="jsrsuInstructionsForAdmission" style="height:25px;width:150px;text-align:center"/></textarea>
                    </div>
                    <div style="float:left;margin:10px 0 0 10px">
                        公众号首页顶部广告: <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic(0)">上传及查看图片</a>
                    </div>
                    <div style="clear:both"></div>
                    <div></div>
                    <!-- 钟点房规则 -->
					<div style="float:left;">
						<div style="float:left;margin:0 0 0 16px;width:90%;">
							<h4 style="font-size: 20px;color:black;font-family: 黑体 ;">钟点房使用规则</h4>
						</div>

						<div style="float:left;margin:10px 0 0 16px;clear:both">
							使用时间：<input type="time"  id="hourRoomStartTime" style="width:100px;text-align:center"/>--
							--<input type="time"  id="hourRoomEndTime" style="width:100px;text-align:center"/>
						</div>
                        <!-- <div style="float:left;margin:10px 0 0 12px">
                            退房时间：<input type="time"  id="jsrsuCheckOutTime" style="width:100px;text-align:center"/>
                        </div> -->
						<div style="float:left;margin:10px 0 0 12px">
							钟点房：<select id="hourRoom">
								<option value="1">1小时</option>
								<option value="2">2小时</option>
								<option value="3">3小时</option>
								<option value="4">4小时</option>
								<option value="5">5小时</option>
								<option value="6">6小时</option>
							</select>
						</div>
                    </div>

                    <div style="float:left;margin:0 0 0 20px">
						<div style="float:left;margin:0 0 0 16px;width:90%;">
							<h4 style="font-size: 20px;color:black;font-family: 黑体;">押金支付规则</h4>
						</div>
                        <div style='margin:0 0 0 12px' id="jsrsuDepositRules">
                            <label>支付方式:</label>
                            <input type="checkbox" class="depositRules" name="depositPay" onclick="depositPayType(0)" id="depositPayOnline" value="0">线上支付
                            <input type="checkbox" class="depositRules" name="depositPay" onclick="depositPayType(1)" id="depositPayScene" value="1">现场支付
                        </div>
                        <div style="float:left;margin:10px 0 0 12px">
                            在线订金比: <input type="number"  id="onlineDepositPrcent" style="height:20px;width:30px;text-align:center"/>% 房费
                        </div>
                        <div style="clear:both"></div>
                        <div style='margin:5px 0 0 12px' id="setDeposit ">
                            <label>押金设置:</label>
                            <input type="checkbox" onclick="depositSetType()" id="depositSetType">手动设置押金
                            押金金额: <input type="number" id="depositMoney" style="height:20px;width:80px;text-align:center;"/>
                        </div>
                    </div>
                    <div style="clear:both"></div>
                    <div style="margin:10px 0 0 20px;float:left;">
                        <div style="font-size:15px;margin:0 0 0 0">房型字段<img src="img/add.png" onclick="addInput('jsrsuRoomType')" style="height:20px;width:20px;margin: 0px 0 -4px 10px" /></div>
                        <div id="jsrsuRoomType" style="margin:0px 0 0 0 "></div>
                    </div>
                    <div style="float:left;margin-left:20px;margin-top: 20px;">
                        <fieldset class="clearfix" style="width:350px;float:left;margin:10px 0 0 20px;">
                            <legend>
                                <font style='font-size: 18px;font-family:  微软雅黑 ; color:#50B4D2;'>电子门牌设置</font>
                            </legend>
                            <div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
                                <div class="electronicDoorplateno" style="margin:5px 10px 0 5px;float:left">
                                    按键1名称：<select id="key0" class="key" style="width:150px;" onchange="checkKeyName(0)">
                                    <option></option>
                                    <option>请莫打扰</option>
                                    <option>保洁服务</option>
                                    <option>已入住</option>
                                </select>
                                </div>
                                <div style="margin:5px 0 0 0;float:left;display:none"  class="scenarioModeDiv">
                                    设为情景模式：<input type="checkbox" class="scenarioMode">
                                </div>
                                <div style="clear:both"></div>
                                <div class="electronicDoorplateno" style="margin:5px 10px 0 5px;float:left;">
                                    按键2名称：<select id="key1" class="key" style="width:150px" onchange="checkKeyName(1)">
                                    <option></option>
                                    <option>请莫打扰</option>
                                    <option>保洁服务</option>
                                    <option>已入住</option>
                                </select>
                                </div>
                                <div style="margin:5px 0 0 0;float:left;display:none"  class="scenarioModeDiv">
                                    设为情景模式：<input type="checkbox" class="scenarioMode">
                                </div>
                                <div style="clear:both"></div>
                                <div class="electronicDoorplateno" style="margin:5px 10px 0 5px;float:left;">
                                    按键3名称：<select id="key2" class="key" style="width:150px" onchange="checkKeyName(2)">
                                    <option></option>
                                    <option>请莫打扰</option>
                                    <option>保洁服务</option>
                                    <option>已入住</option>
                                </select>
                                </div>
                                <div style="margin:5px 0 0 0;float:left;display:none"  class="scenarioModeDiv">
                                    设为情景模式：<input type="checkbox" class="scenarioMode">
                                </div>
                            </div>
                        </fieldset>
                    </div>

					<div style="float:left;margin-left:20px;margin-top: 40px;">
						客房密码设置 : <input id="jsrsuTmPassword" width="120px"/>
					</div>
                </div>



                <div style="clear:both"></div>
                <div>
                    <fieldset class="clearfix" id="jsrsuShopAccount" style="width:30%;float:left;margin:10px 0 0 20px;">
                        <legend>
                            <font style='font-size: 18px;font-family: 微软雅黑 ; color:#50B4D2'>酒店平台结算账户</font>
                        </legend>
                        <div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
                            <input style="display:none" class="accountId">
                            <div style="margin:5px 0 0 5px;float:left;">
                                收款账户：<select style="width:150px;" class="accountType" onchange="jdChangeWay(this)">
                            </select>
                            </div>
                            <div style='margin:5px 0 0 5px;float: left;'>
                                账户名称：<select style="width:150px" class="accountName" onchange="jdGetAccountId(this)">
                            </select>
                            </div>
                            <div style="clear:both"></div>
                            <div style='margin:5px 0 0 5px;float: left;'>
                                账户号码：<input style="width:150px" class="accountNum" readonly>
                            </div>
                            <div style='margin:5px 0 0 5px;float: left;'>
                                账户归属：<input style="width:150px" class="accountBelong" readonly>
                            </div>
                            <center style="margin:15px 0 0 0;">
                                <a class="easyui-linkbutton" iconcls="icon-save" onclick="updateShopSetUp()">保存</a>
                            </center>
                        </div>
                    </fieldset>
                    <fieldset class="clearfix" id="jsrsuCashAccount" style="width:30%;float:left;margin:10px 0 0 100px;">
                        <legend>
                            <font style='font-size: 18px;font-family:  微软雅黑 ; color:#50B4D2'>酒店现金结算账户</font>
                        </legend>
                        <div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
                            <input style="display:none" class="accountId">
                            <div style="margin:5px 0 0 5px;float:left;">
                                收款账户：<select style="width:150px;" class="accountType" onchange="jdChangeWay(this)">
                            </select>
                            </div>
                            <div style='margin:5px 0 0 5px;float: left;'>
                                账户名称：<select style="width:150px" class="accountName" onchange="jdGetAccountId(this)">
                            </select>
                            </div>
                            <div style="clear:both"></div>
                            <div style='margin:5px 0 0 5px;float: left;'>
                                账户号码：<input style="width:150px" class="accountNum" readonly>
                            </div>
                            <div style='margin:5px 0 0 5px;float: left;'>
                                账户归属：<input style="width:150px" class="accountBelong" readonly>
                            </div>
                            <center style="margin:15px 0 0 0;">
                                <a class="easyui-linkbutton" iconcls="icon-save" onclick="updateShopSetUp()">保存</a>
                            </center>
                        </div>
                    </fieldset>
                </div>
                <div style="clear:both"></div>
                <div style="float:left;width:99%;height:300px;margin:0 0 0 10px">
                    <div style="float:left">
                        <h4 style="font-size: 14px;color:black;margin:13px 0 0 6px;">服务消费</h4>
                    </div>
                    <div style="float:left;margin:0 0 0 10px">
                        <a style="float:left;margin:10px 10px 10px 10px" class="easyui-linkbutton" iconcls="icon-add" onclick="addService()">添加</a>
                    </div>
                    <div style="clear:both"></div>
                    <table id="serviceCharge">
						<tr>
							<th field="popservice" width="40" align="center">服务</th>
							<th field="popcharge" width="40" align="center">金额</th>
							<th field="deleteAdd" width="20" align="center" onclick="myDeleteRows(deleteAdd,popservice,serviceCharge,0)">删除</th>
						</tr>
					</table>
                    <div style="clear:both"></div>
                    <center style="margin:25px 0 0 0;">
                        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doSetUp()">保存</a>
                        <%--<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#setUpDlg').dialog('close')">关闭</a>--%>
                    </center>
                </div>
                <!-- 上传及查看图片窗口 -->
                <div id="adImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
                    <div style="padding:5px 0 0 10px;">
                        <a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadJdPic()">上传</a>
                        <a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removeJdPic()">选择删除</a>
                        <a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="jdRefresh()">刷新</a>
                    </div>
                    <div id="removeJdPicture" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
                    <div style="clear:both"></div>
                    <left>
                        <div id='doRemoveJdPic' style='margin:10px 0 0 10px;display:none;'>
                            <a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemoveJdPic()">删除</a>
                            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doJdCancel()">取消</a>
                        </div>
                    </left>
                    <div id="imgJDWrapper" style="margin:10px 0 0 10px;"></div>

                </div>

                <div id="addServiceDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
                    <div  style="width:250px;margin:10px 0 0 10px;">
                        服务：<input style="width: 200px;"id="service">
                    </div>
                    <div  style="width:250px;margin:10px 0 0 10px;">
                        金额：<input style="width: 200px;" id="charge" type="number">
                    </div>
                    <div style="clear:both"></div>
                    <center style="margin:25px 0 0 0;">
                        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doservice()">保存</a>
                        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addServiceDlg').dialog('close')">关闭</a>
                    </center>
                </div>

                <!-- 房型配置窗口 -->
                <div id="roomConfiguration" class="easyui-dialog" data-options="closed:true" >
                    <div style="float:left;margin:10px 0 10px 20px">客房配置：</div>
                    <div style="clear:both"></div>
                    <div class="configuration" style="float:left;">
                        <button type="button" class="btn btn-default btn-xs" style="margin:0 0 10px 5px;width:80px;" value="热水淋浴">热水淋浴</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="无线网络">无线网络</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="空调">空调</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="电视">电视</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="门禁系统">门禁系统</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="停车位">停车位</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="热水壶">热水壶</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="有线网络">有线网络</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="电脑">电脑</button>
                        <div style="clear:both"></div>
                        <button type="button" class="btn btn-default btn-xs" style="margin:0 0 10px 5px;width:80px;" value="拖鞋">拖鞋</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="纸巾">纸巾</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="牙具">牙具</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="毛巾">毛巾</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="浴液">浴液</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="洗发水">洗发水</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="香皂">香皂</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="浴巾">浴巾</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="剃须刀">剃须刀</button>
                        <div style="clear:both"></div>
                        <button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="吹风筒">吹风筒</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="适宜儿童">适宜儿童</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="适宜老人">适宜老人</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="适宜残疾人">适宜残疾人</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="电梯">电梯</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="洗衣机">洗衣机</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="冰箱">冰箱</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="浴缸">浴缸</button>
                        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="暖气">暖气</button>
                    </div>
                    <div style="clear:both"></div>
                    <center style="margin:15px 0 0 0;">
                        <a id="doSetConfiguration" class="easyui-linkbutton" iconcls="icon-save">确定</a>
                        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#roomConfiguration').dialog('close')">关闭</a>
                    </center>
                </div>
			</div>
			<!-- 商超设置 -->
			<div role="tabpanel" class="tab-pane" id="ttab6">
				<div style="width:100%;height: 100%;">
					<span style="color:red;font-size:15px">注意：改动变量后请按F5进行刷新页面后才能生效，自定义左侧快捷菜单需要重新登录才能生效。</span>
				</div>
				<div style="width: 33%;color:black;float:left;">
					<fieldset>
						<legend>
							商超外部顾客来源
						</legend>
						<div style="width: 100%;height:400px;color:black;float:left;">
							<div id="outsideCustomerSourceDiv" style="float:left; margin: 0 0 0 20px">

							</div>
							<div style="float:left;margin:0 0 0 50px">
								<input type="button" value="添加" onclick="ctrlSelect('outsideCustomerSource',0,0)">
								<br><br>
								<input type="button" value="修改" onclick="ctrlSelect('outsideCustomerSource',2,0)">
								<input id="outsideCustomerSourceUpdateIndex" style="width:150px;display: none;" type="text">
								<br><br>
								<input type="button" value="上移" onclick="ctrlSelect('outsideCustomerSource',4,0)"><br><br>
								<input type="button" value="下移" onclick="ctrlSelect('outsideCustomerSource',5,0)"><br><br>
								<input type="button" value="删除" onclick="ctrlSelect('outsideCustomerSource',6,0)"><br><br>
								<input type="button" value="预览" onclick="ctrlSelect('outsideCustomerSource',7,0)">
							</div>
							<div style="clear: both;"></div>
							<div style="float:left;width:300px">
								<center>
									<br>
									<div style="height: 25px;">
										<input id="outsideCustomerSourceAdd" style="width:150px;display: none;" type="text">
										<input id="outsideCustomerSourceAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('outsideCustomerSource',1,0)">
										<input id="outsideCustomerSourceUpdate" style="width:150px;display: none;" type="text">
										<input id="outsideCustomerSourceUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('outsideCustomerSource',3,0)">
										<select id="outsideCustomerSourceShow" style="display: none;width: 150px;"></select>
									</div>
									<div id="outsideCustomerSourceTips" style="color:red;font-size: 13px;height: 20px;"></div>
									<input type="button" value="保存" onclick="doSaveVariable('outsideCustomerSource')">
									<input type="button" value="恢复初始" onclick="recoveryVariable('outsideCustomerSource')">
								</center>
							</div>
						</div>
					</fieldset>
				</div>
				<!--商超外部顾客类型  -->
				<div style="width: 33%;color:black;float:left;">
					<fieldset>
						<legend>
							商超外部顾客类型
						</legend>
						<div style="width: 100%;height:400px;color:black;float:left;">
							<div id="outsideCustomerTypeDiv" style="float:left; margin:  0 0 0 20px">

							</div>
							<div style="float:left;margin:0 0 0 50px">
								<input type="button" value="添加" onclick="ctrlSelect('outsideCustomerType',0,0)">
								<br><br>
								<input type="button" value="修改" onclick="ctrlSelect('outsideCustomerType',2,0)">
								<input id="outsideCustomerTypeUpdateIndex" style="width:150px;display: none;" type="text">
								<br><br>
								<input type="button" value="上移" onclick="ctrlSelect('outsideCustomerType',4,0)"><br><br>
								<input type="button" value="下移" onclick="ctrlSelect('outsideCustomerType',5,0)"><br><br>
								<input type="button" value="删除" onclick="ctrlSelect('outsideCustomerType',6,0)"><br><br>
								<input type="button" value="预览" onclick="ctrlSelect('outsideCustomerType',7,0)">
							</div>
							<div style="clear: both;"></div>
							<div style="float:left;width:300px">
								<center>
									<br>
									<div style="height: 25px;">
										<input id="outsideCustomerTypeAdd" style="width:150px;display: none;" type="text">
										<input id="outsideCustomerTypeAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('outsideCustomerType',1,0)">
										<input id="outsideCustomerTypeUpdate" style="width:150px;display: none;" type="text">
										<input id="outsideCustomerTypeUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('outsideCustomerType',3,0)">
										<select id="outsideCustomerTypeShow" style="display: none;width: 150px;"></select>
									</div>
									<div id="outsideCustomerTypeTips" style="color:red;font-size: 13px;height: 20px;"></div>
									<input type="button" value="保存" onclick="doSaveVariable('outsideCustomerType')">
									<input type="button" value="恢复初始" onclick="recoveryVariable('outsideCustomerType')">
								</center>
							</div>
						</div>
					</fieldset>
				</div>
				<!-- 商超外部顾客规模 -->
				<div style="width: 33%;color:black;float:left;">
					<fieldset>
						<legend>
							商超外部顾客规模
						</legend>
						<div style="width: 100%;height:400px;color:black;float:left;">
							<div id="outsideCustomerScaleDiv" style="float:left; margin: 0 0 0 20px">

							</div>
							<div style="float:left;margin:0 0 0 50px">
								<input type="button" value="添加" onclick="ctrlSelect('outsideCustomerScale',0,0)">
								<br><br>
								<input type="button" value="修改" onclick="ctrlSelect('outsideCustomerScale',2,0)">
								<input id="outsideCustomerScaleUpdateIndex" style="width:150px;display: none;" type="text">
								<br><br>
								<input type="button" value="上移" onclick="ctrlSelect('outsideCustomerScale',4,0)"><br><br>
								<input type="button" value="下移" onclick="ctrlSelect('outsideCustomerScale',5,0)"><br><br>
								<input type="button" value="删除" onclick="ctrlSelect('outsideCustomerScale',6,0)"><br><br>
								<input type="button" value="预览" onclick="ctrlSelect('outsideCustomerScale',7,0)">
							</div>
							<div style="clear: both;"></div>
							<div style="float:left;width:300px">
								<center>
									<br>
									<div style="height: 25px;">
										<input id="outsideCustomerScaleAdd" style="width:150px;display: none;" type="text">
										<input id="outsideCustomerScaleAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('outsideCustomerScale',1,0)">
										<input id="outsideCustomerScaleUpdate" style="width:150px;display: none;" type="text">
										<input id="outsideCustomerScaleUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('outsideCustomerScale',3,0)">
										<select id="outsideCustomerScaleShow" style="display: none;width: 150px;"></select>
									</div>
									<div id="outsideCustomerScaleTips" style="color:red;font-size: 13px;height: 20px;"></div>
									<input type="button" value="保存" onclick="doSaveVariable('outsideCustomerScale')">
									<input type="button" value="恢复初始" onclick="recoveryVariable('outsideCustomerScale')">
								</center>
							</div>
						</div>
					</fieldset>
				</div>
				<!--商超外部顾客联系人岗位  -->
				<div style="width: 33%;color:black;float:left;">
					<fieldset>
						<legend>
							商超外部顾客联系人岗位
						</legend>
						<div style="width: 100%;height:400px;color:black;float:left;">
							<div id="outsideCustomerContactsPostDiv" style="float:left; margin: 0 0 0 20px">

							</div>
							<div style="float:left;margin:0 0 0 50px">
								<input type="button" value="添加" onclick="ctrlSelect('outsideCustomerContactsPost',0,0)">
								<br><br>
								<input type="button" value="修改" onclick="ctrlSelect('outsideCustomerContactsPost',2,0)">
								<input id="outsideCustomerContactsPostUpdateIndex" style="width:150px;display: none;" type="text">
								<br><br>
								<input type="button" value="上移" onclick="ctrlSelect('outsideCustomerContactsPost',4,0)"><br><br>
								<input type="button" value="下移" onclick="ctrlSelect('outsideCustomerContactsPost',5,0)"><br><br>
								<input type="button" value="删除" onclick="ctrlSelect('outsideCustomerContactsPost',6,0)"><br><br>
								<input type="button" value="预览" onclick="ctrlSelect('outsideCustomerContactsPost',7,0)">
							</div>
							<div style="clear: both;"></div>
							<div style="float:left;width:300px">
								<center>
									<br>
									<div style="height: 25px;">
										<input id="outsideCustomerContactsPostAdd" style="width:150px;display: none;" type="text">
										<input id="outsideCustomerContactsPostAddButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('outsideCustomerContactsPost',1,0)">
										<input id="outsideCustomerContactsPostUpdate" style="width:150px;display: none;" type="text">
										<input id="outsideCustomerContactsPostUpdateButton" style="display: none;" type="button" value="提交" onclick="ctrlSelect('outsideCustomerContactsPost',3,0)">
										<select id="outsideCustomerContactsPostShow" style="display: none;width: 150px;"></select>
									</div>
									<div id="outsideCustomerContactsPostTips" style="color:red;font-size: 13px;height: 20px;"></div>
									<input type="button" value="保存" onclick="doSaveVariable('outsideCustomerContactsPost')">
									<input type="button" value="恢复初始" onclick="recoveryVariable('outsideCustomerContactsPost')">
								</center>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
			<!-- 民宿设置 -->
			<div role="tabpane" class="tab-pane " id="ttab8" >
				<div id="msSetUpDlg" style="padding:6px;">
					<input type="hidden" id="msjsrsuAdImgs">
					<input type="hidden" id="msjsrsuId">
					<input type="hidden" id="msjsrsu_room_type">
					<div style="float:left;margin:10px 0 0 16px">
						入住时间：<input type="time"  id="msjsrsuCheckInTime" style="width:100px;text-align:center"/>
					</div>
					<div style="float:left;margin:10px 0 0 12px">
						退房时间：<input type="time"  id="msjsrsuCheckOutTime" style="width:100px;text-align:center"/>
					</div>
					<div style="float:left;margin:10px 0 0 12px">
						对外简称：<input type="text"  id="msjsrsuWxgzhTitle" style="width:100px;text-align:center"/>
					</div>
					<div style="float:left;margin:10px 0 0 12px">
						客服电话：<input type="text"  id="msjsrsuTelphone" style="width:100px;text-align:center"/>
					</div>
					<div style="float:left;margin:10px 0 0 46px">
						最长订房时间：<input type="text"  id="msjsrsuLongestBookingDays" style="width:100px;text-align:center"/>
					</div>
					<div style="clear:both"></div>
					<div style="float:left;margin:10px 0 0 15px">
						线上下单：<select id="msjsrsuState">
						<option value="1">是</option>
						<option value="0">否</option>
					</select>
					</div>
					<div style="float:left;margin:10px 0 0 12px">
						提前搬离退房费：<select id="msjsrsuRefundRoomCharge">
						<option value="1">允许</option>
						<option value="0">不允许</option>
					</select>
					</div>
					<div style="float:left;margin:10px 0 0 16px">
						提前搬离，超过<input type="time"  id="msjsrsuRefundRoomChargeTime" style="width:100px;text-align:center"/>时刻，收取整天房费
					</div>
					<div style="float:left;margin:10px 0 0 12px">
						未来多少天可以预定：<input type="text"  id="msjsrsuFutureBookingDays" style="width:100px;text-align:center"/>
					</div>
					<div style="clear:both"></div>
					<div style="float:left;margin:10px 0 0 15px">
						民宿介绍：<textarea type="text"  id="msjsrsuGrogshopIntroduce" style="width:850px;text-align:center"></textarea>
					</div>
					<!-- 公众号的交易 -->
					<div style="clear:both"></div>
					<div style="float:left;margin:0 0 0 16px;width:90%;">
						<h3 style="font-size: 15px;color:black;">交易规则</h3>
					</div>
					<div style="clear:both"></div>
					<div style="float:left;margin:0 0 0 16px">
						预定方式：<textarea type="text"  id="msjsrsuPredeterminedMode" style="height:25px;width:150px;text-align:center"/></textarea>
					</div>
					<div style="float:left;margin:0 0 0 12px">
						入住天数：<textarea type="text"  id="msjsrsuCheckInMode" style="height:25px;width:150px;text-align:center"/></textarea>
					</div>

					<div style="float:left;margin:0 0 0 20px">
						其他费用：<textarea type="text"  id="msjsrsuOtherExpenses" style="height:25px;width:150px;text-align:center"/></textarea>
					</div>
					<div style="float:left;margin:0 0 0 12px">
						在线订金比: <textarea type="text"  id="msjsrsuOnlineDepositRatio" style="height:25px;width:150px;text-align:center"/></textarea>
					</div>
					<div style="clear:both"></div>
					<div style="float:left;margin:10px 0 0 39px">
						押金：<textarea type="text"  id="msjsrsuTradingDeposit" style="height:25px;width:150px;text-align:center"/></textarea>
					</div>
					<div style="float:left;margin:10px 0 0 37px">
						加客：<textarea type="text"  id="msjsrsuAddGuest" style="height:25px;width:150px;text-align:center"/></textarea>
					</div>
					<div style="float:left;margin:10px 0 0 20px">
						入住须知：<textarea type="text"  id="msjsrsuInstructionsForAdmission" style="height:25px;width:150px;text-align:center"/></textarea>
					</div>
					<div style="float:left;margin:10px 0 0 10px">
						公众号首页顶部广告: <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic(0)">上传及查看图片</a>
					</div>
					<div style="clear:both"></div>
					<div></div>

					<div style="float:left;margin:0 0 0 16px">
						<div style="float:left;width:90%;">
							<h4 style="font-size: 20px;color:black;font-family: 黑体;">押金支付规则</h4>
						</div>
						<div id="msjsrsuDepositRules">
							<label>支付方式:</label>
							<input type="checkbox" class="depositRules" name="depositPay" onclick="msdepositPayType(0)" id="msdepositPayOnline" value="0">线上支付
							<input type="checkbox" class="depositRules" name="depositPay" onclick="msdepositPayType(1)" id="msdepositPayScene" value="1">现场支付
						</div>
						<div style="float:left;margin:10px 0 0 0">
							在线订金比: <input type="number"  id="msonlineDepositPrcent" style="height:20px;width:30px;text-align:center"/>% 房费
						</div>
						<div style="clear:both"></div>
						<div style='margin:5px 0 0 0' id="mssetDeposit">
							<label>押金设置:</label>
							<input type="checkbox" onclick="msdepositSetType()" id="msdepositSetType">手动设置押金
							押金金额: <input type="number"  id="msdepositMoney" style="height:20px;width:80px;text-align:center;"/>
						</div>
					</div>

					<div style="float:left;margin-left:20px;">
						<div style="float:left;width:90%;">
							<h4 style="font-size: 20px;color:black;font-family: 黑体;">客房密码设置</h4>
						</div>
						<div style="clear:both"></div>
						<div style="float:left;">
							密码 : <input id="msjsrsuTmPassword" width="150px"/>
						</div>
					</div>
				</div>
				<div style="clear:both"></div>
				<div style="margin-top:10px">
					<fieldset class="clearfix" id="msjsrsuShopAccount" style="width:30%;float:left;margin:10px 0 0 20px;">
						<legend>
							<font style='font-size: 18px;font-family: 微软雅黑 ;color:#50B4D2'>民宿平台结算账户</font>
						</legend>
						<div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
							<input style="display:none" class="accountId">
							<div style="margin:5px 0 0 5px;float:left;">
								收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
							</select>
							</div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
							</select>
							</div>
							<div style="clear:both"></div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户号码：<input style="width:150px" class="accountNum" readonly>
							</div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户归属：<input style="width:150px" class="accountBelong" readonly>
							</div>
							<center style="margin:15px 0 0 0;">
								<a class="easyui-linkbutton" iconcls="icon-save" onclick="updateShopSetUp()">保存</a>
							</center>
						</div>
					</fieldset>
					<fieldset class="clearfix" id="msjsrsuCashAccount" style="width:30%;float:left;margin:10px 0 0 50px;">
						<legend>
							<font style='font-size: 18px;font-family: 微软雅黑 ; color:#50B4D2'>民宿现金结算账户</font>
						</legend>
						<div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
							<input style="display:none" class="accountId">
							<div style="margin:5px 0 0 5px;float:left;">
								收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
							</select>
							</div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
							</select>
							</div>
							<div style="clear:both"></div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户号码：<input style="width:150px" class="accountNum" readonly>
							</div>
							<div style='margin:5px 0 0 5px;float: left;'>
								账户归属：<input style="width:150px" class="accountBelong" readonly>
							</div>
							<center style="margin:15px 0 0 0;">
								<a class="easyui-linkbutton" iconcls="icon-save" onclick="updateShopSetUp()">保存</a>
							</center>
						</div>
					</fieldset>
				</div>
				<div style="clear:both"></div>
				<div style="float:left; width:99%; height:300px; margin:0 0 0 10px">
					<div style="float:left">
						<h4 style="font-size: 14px;color:black;margin:13px 0 0 6px;">服务消费</h4>
					</div>
					<div style="float:left;margin:0 0 0 10px">
						<a style="float:left;margin:10px 10px 10px 10px" class="easyui-linkbutton" iconcls="icon-add" onclick="msaddService()">添加</a>
					</div>
					<div style="clear:both"></div>
					<table id="msserviceCharge">
						<thead>
							<tr>
								<th field="scenePattern" width="40" align="center">服务</th>
								<th field="executionTime" width="40" align="center">金额</th>
								<th field="deleteAdd" width="20" align="center" onclick="myDeleteRows(deleteAdd,popservice,msserviceCharge,0)">删除</th>
							</tr>
						</thead>
					</table>
					<div style="clear:both"></div>
					<center style="margin:25px 0 0 0;">
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="msdoSetUp()">保存</a>
						<%--<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#mssetUpDlg').dialog('close')">关闭</a>--%>
					</center>
				</div>
				<!-- 上传及查看图片窗口 -->
				<div id="msAdImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
					<div style="padding:5px 0 0 10px;">
						<a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadMsPic()">上传</a>
						<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removeMsPic()">选择删除</a>
						<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="msRefresh()">刷新</a>
					</div>
					<div id="removeMsPicture" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
					<div style="clear:both"></div>
					<left>
						<div id='doRemoveMsPic' style='margin:10px 0 0 10px;display:none;'>
							<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemoveMsPic()">删除</a>
							<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doMsCancel()">取消</a>
						</div>
					</left>
					<div id="msimgWrapper" style="margin:10px 0 0 10px;"></div>

				</div>

				<div id="msaddServiceDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
					<div  style="width:250px;margin:10px 0 0 10px;">
						服务：<input style="width: 200px;"id="msservice">
					</div>
					<div  style="width:250px;margin:10px 0 0 10px;">
						金额：<input style="width: 200px;" id="mscharge" type="number">
					</div>
					<div style="clear:both"></div>
					<center style="margin:25px 0 0 0;">
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="msdoservice()">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#msaddServiceDlg').dialog('close')">关闭</a>
					</center>
				</div>
			</div>


			<%--短信设置--%>
			<div role="tabpane1" class="tab-pane " id="ttab9">
				<div style="width:100%;height: 100%;">
					<span style="color:red;font-size:15px">注意：改动变量后请按F5进行刷新页面后才能生效，自定义左侧快捷菜单需要重新登录才能生效。</span>
					<fieldset>
						<legend>
							各设置及检测开关
						</legend>

						<%--短信提醒功能   121qq   message_switch       --%>
						<div id="messageSwitchDiv" style="width: 100%;color:black;float:left;">
							短信提醒功能：<input id="campusMessageSwitch" type="checkbox" />
							<span style="color:red;font-size:13px">用途：勾选后开通短信提示</span>
							<br><br>
							<input type="button" value="保存" onclick="doSaveVariable('campusMessageSwitch')">
							<input type="button" value="恢复初始" onclick="recoveryVariable('campusMessageSwitch')">
							<br><br>
						</div>


					</fieldset>
				</div>
			</div>

		</div>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="https://pic-static.fangzhizun.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script src="http://pic-static.fangzhizun.com/vue/2.2.6/vue.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/html5media/1.1.8/html5media.min.js"></script>
	<script src="js/upload.js"></script>
	<script src="js/contextMenu.js"></script>
	<script src="js/fg_shortRentSetUp.js"></script>
	<script src="js/fg_guestHouseSetUp.js"></script>
</body>
</html>