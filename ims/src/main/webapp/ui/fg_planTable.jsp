<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>计费方案</title>
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
	<script src="js/jQuery.Hz2Py-min.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!-- 计费方案信息工具栏 -->
	<div>
		<div style="margin:5px 0 5px 5px;float:left">
			<a class="easyui-linkbutton" iconCls="icon-add-plan"
				plain="true" onclick="addPlanDlg()" id="addPlanButton">添加方案</a>
		</div>
		<div style="margin:5px 0 5px 5px;float:left">
			<a class="easyui-linkbutton" iconCls="icon-edit-number"
				plain="true" onclick="updatePlan()" id="updatePlanButton">修改方案</a>
		</div>
		<div style="margin:5px 0 5px 5px;float:left">
			<a class="easyui-linkbutton" iconCls="icon-edit-number"
				plain="true" onclick="upEnergyDlg()" id="upEnergyButton">激活能源计费项</a>
		</div>
	</div>
	<div style="clear: both;"></div>
	<!-- 搜索信息工具栏 -->
	<div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			方案类型：<select id="planType" onchange="queryPlan(1,0)" style="width:100px">
				<option  value=""></option>
			</select>
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			方案性质：<select id="planDefault" onchange="queryPlan(1,0)" style="width:100px">
				<option value=""></option>
				<option value="通用">通用</option>
				<option value="独立">独立</option>
			</select>
		</div>
		<div style="margin:0 0 5px 7px;color:black;font-size:13px;float:left;">
			楼盘名称：<input id="searchCommunity" onkeyup="queryPlan(1,0)" style="width:100px">
		</div>
		
		<div style="margin:0 0 5px 21px;color:black;font-size:13px;float:left;">
			方案名：<input id="planName" onkeyup="queryPlan(1,0)" style="width:100px">
		</div>
	</div>
	
	<!--客户列表-->
	<div id="DataGridPlan" style="width:100%;height:100%;">
		<table id="planDg"
			style="width:100%;height:auto;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				fitColumns:true,
				scrollbarSize:0">
			<thead>
				<tr>
					<th field="pageNumber" width="30" align="center">所属楼盘</th>
					<th field="planName" width="20" align="center">方案名</th>
					<th field="planType" width="10" align="center">方案类型</th>
					<th field="totalPage" width="10" align="center">方案性质</th>
					<th field="planComment" width="20" align="center">方案描述</th>
					<th field="deleteRows" formatter="formatDeleteRows" width="10"
						align="center">操作</th>
			</thead>
		</table>
		<div id="planPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 激活能源项 -->
	<div id="upEnergyDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>激活能源计费项</legend>
			<p><input id="water" name="water" class="charging_plan" type="checkbox" value="水" />水</p>
			<p><input id="elect" name="elect" class="charging_plan" type="checkbox" value="电"/>电</p>
			<p><input id="gas" name="gas" class="charging_plan" type="checkbox" value="气" />气</p>
			<p><input id="hotwater" name="hotwater" class="charging_plan" type="checkbox" value="热水" />热水</p>
			<p><input id="hotair" name="hotair" class="charging_plan" type="checkbox" value="暖气" />暖气</p>
			<div id="addEnergySave" style="margin:10px 0 0 0;text-align: center;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="saveEnergy()">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#upEnergyDlg').dialog('close')">取消</a>
			</div>
		</fieldset>
	</div>
	<div id="addPlanDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>方案信息</legend>
			<div style='margin:0 0 0 12px;float: left;display:none'>
				城市：<select class="add_saveHouse_city" id="add_saveHouse_city"
					onchange="districtLink(0)" style="width:100px;">
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 34px;float: left;'>
				城区：<select class="add_saveHouse_district" id="add_saveHouse_district" 
					onchange="zoneLink(0)" style="width:150px;" needs="1">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 34px;float: left;display:none'>
				片区：<select class="add_saveHouse_zone" id="add_saveHouse_zone"
					onchange="buildNameLink(0)" style="width:100px;">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 10px;float: left;'>
				<div>
					楼盘名称：<input type="text" id="buildingName" style="width: 150px;"
						onkeyup='resetOption("buildingName", "add_saveHouse_buildingName" ,"buildingNameDiv")'
						onclick='resetOption("buildingName", "add_saveHouse_buildingName" ,"buildingNameDiv")'
						onfocus='resetOption("buildingName", "add_saveHouse_buildingName" ,"buildingNameDiv")' />
				</div>
				<div id="buildingNameDiv"
					style="margin-left:59px;height:150px;width: 150px;border:1px solid #A9A9AA;display:none;position : absolute; z-index : -1;background-color: #fff">
					<div>
						<select class="add_saveHouse_buildingName" id="add_saveHouse_buildingName" multiple="multiple"
							style="height:150px;width: 150px;" onchange='streeLink(0)'>
							<option></option>
						</select>
					</div>
					<input class="add_saveHouse_buildingId" id="add_saveHouse_buildingId" style="display:none" needs="1">
					<input id="add_saveHouse_zone1" style="display:none"">
				</div>
			</div>
			<div style="margin:5px 0 0 10px;float:left">
				<a class="easyui-linkbutton" iconCls="icon-ziliao-fangyuan"
					plain="true" onclick="changePlanHouse()" id="changePlanButton">重新选择楼盘名称</a>
			</div>
			<input id="add_planId" style="display:none">
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 10px;float:left">
				方案名称：<input id="add_planName" style="width:180px" require="require">
			</div>
			<div style="margin:5px 0 0 10px;float:left">
				方案类型：<select id="add_planType" style="width:50px" require="require">
					<option></option>
					
				</select>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 10px;float:left">
				方案性质：<select id="add_planDefault" style="width:50px" require="require">
					<option></option>
					<option value="true">通用</option>
					<option value="false">独立</option>
				</select>
			</div>
			<div style="margin:5px 0 0 10px;float:left">
				方案阶梯数：<select id="add_planNum" style="width:48px" clear="clear" require="require"
					onchange="createPlanTable()">
					<option></option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 10px;float:left">方案描述：</div>
			<div style="margin:5px 0 0 0;float:left">
				<textarea id="add_planComment" style="width:300px"></textarea>
			</div>
		</fieldset>
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>方案内容</font>
			</legend>
			<div>
				<span style="color:red;">注意：0~100表示于等于0(包含0)、小于等于100(包含100),单位为度或立方</span>
			</div>
			<div style="margin:5px 0 0 35px;float:left">
				公摊/固定收费：<input id="baseMoney" style="width:80px"
						onKeyUp="moneyKeyupFomat(this)"
						onBlur="moneyBlurFomat(this)"
						onfocus="if (value =='0.00'){value =''}">元
			</div>
			<div style="clear:both"></div>
			<div id="planeTableSetDiv"></div>
		</fieldset>
		<center>
		<br>
			<div id="setPlanTanleTips" style="height:20px;color:red;"></div>
			<div style="clear:both"></div>
		</center>
		<div id="addRenterSave" style="margin:10px 0 10px 0;">
			<center>
				<a id="addSaveButton" 
					class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addPlanDlg')){checkPlan(0)}">
					保存</a> <a  class="easyui-linkbutton"
					iconcls="icon-cancel"
					onclick="javascript:$('#addPlanDlg').dialog('close')">取消</a>
			</center>
		</div>
		<div id="updateRenterSave" style="margin:10px 0 10px 0;">
			<center>
				<a id="updateSaveButton" 
					class="easyui-linkbutton" iconcls="icon-save"
					onclick="if(validateRequire('addPlanDlg')){checkPlan(1)}" id="saveUpdatePlan">保存</a> <a
					 class="easyui-linkbutton"
					iconcls="icon-cancel"
					onclick="javascript:$('#addPlanDlg').dialog('close')">取消</a>
			</center>
		</div>
	</div>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.planTable.js"></script>
</body>
</html>