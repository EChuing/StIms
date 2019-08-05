<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>外出登记</title>
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
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="padding:5px 0 0 5px">
		<a class="easyui-linkbutton" id="goOutButton" onclick="addGooutDlg()" iconCls="icon-dengji" plain="true">外出登记</a>
		<a class="easyui-linkbutton" id="goBackButton" onclick="doUpdateGoout()" iconCls="icon-huilai" plain="true">回来签到</a>
	</div>
	<div class="clearfix">
		<div style="padding:0 0 5px 10px;color:black;font-size:13px;float:left;">
			外出人员：<input id="searchGoOutUserShowUserInfo" class="choose_user_button" doFlag="searchGoOutUser" doFun="queryGoout(1,0)"
				style="width:150px;cursor:pointer;" readonly="readonly">
			<input id="searchGoOutUserGetUserStoreId" type="hidden">
			<input id="searchGoOutUserGetUserDetId" type="hidden">
			<input id="searchGoOutUserGetUserId" type="hidden">
			<div id="searchGoOutUserShowUserInfoDiv" style="display:none;"></div>
		</div>
	</div>
	<div id="DataGridGoout" style="width:100%;height:90%;">
		<table id="gooutDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" 
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="totalPage" width="30" align="center">外出地点</th>
					<th field="gotoAddressType" width="10" align="center">地点类型</th>
					<th field="gotoItemType" width="10" align="center">事件类型</th>
					<th field="username" width="10" align="center">外出人员</th>
					<th field="gotoOutOfTime" width="15" align="center">外出时间</th>
					<th field="gotoComeBackTime" formatter="formatGotoComeBackTime" width="15" align="center">回来时间</th>
				</tr>
			</thead>
		</table>
		<!-- 外出分页 -->
		<div id="gooutPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 外出登记对话框 -->
	<div id="gooutDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style='margin:0 0 0 10px;float: left;'>外出地点：</div>
		<div style='margin:0 0 0 0;float: left;'>
			<input id="choseHouse" style="width:300px;cursor: pointer;" readonly="readonly" onclick="relationDlg()">
			<input style="display:none" id='choseHouseId' readonly='readonly'>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 10px;float: left;'>
			地点类型：<input style="width:100px" readonly='readonly'
				disabled="disabled" id="choseHouseType">
		</div>
		<div style='margin:5px 0 0 40px;float: left;'>
			外出人员：<input style="width:100px" readonly='readonly'
				disabled="disabled" id="adduserName">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 10px;float: left;'>
			事件类型：<select style="width:100px" readonly='readonly'
				id="additemType">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 34px;float: left;'>备注：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea style="width:300px;height:50px" id="addNote"></textarea>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;">
			<center>
				<a id="updateButton" class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdateGoout()">保存</a>
				<a id="addButton" class="easyui-linkbutton" iconcls="icon-ok" onclick="doAddGoout()">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="javascript:$('#gooutDlg').dialog('close')">取消</a>
			</center>
		</div>
	</div>
	<!-- 选择外出地点 -->
	<div id="relationDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div style="margin:5px 0 0 0;color:black;font-size:13px;float:left;">
			地点类型：<select id="searchBelongType" onchange="relationDataGrid()"
				style="width:100px">
				<option value='1'>已租列表</option>
				<option value='2'>未租列表</option>
				<option value='3'>盘源列表</option>
				<option value='4'>项目列表</option>
			</select>
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
					楼盘/小区：<input id="searchAddCommunity" onkeyup="relationDate(1,0)"
						style="width:80px">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuilding" onkeyup="relationDate(1,0)"
						style="width:60px">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplateno" onkeyup="relationDate(1,0)"
						style="width:60px">
				</div>
			</div>
		</div>
		<div id="virtualRelationSelect" style="display:none;">
			<div style='margin:0 0 10px 0;'>
				<div
					style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualType">分类</label> <select
						style="width:104px;" id="searchVirtualType"
						onchange="relationDate(1,0)">
						<option value="0"></option>
						<option value="1">内部项目</option>
						<option value="2">外部项目</option>
						<option value="3">非成本项目</option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualName">名称</label> <input
						style="width:100px;" id="searchVirtualName"
						onkeyup="relationDate(1,0)">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualDoorplateno">编号</label> <input
						style="width:100px;" id="searchVirtualDoorplateno"
						onkeyup="relationDate(1,0)">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualContact">联系人</label> <input
						style="width:100px;" id="searchVirtualContact"
						onkeyup="relationDate(1,0)">
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
	<div id="readonlyGooutDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>外出地点：</td>
						<td  colspan="3"><span id="readonlyAddress"></span></td>
					</tr>
					<tr>
						<td>地点类型：</td>
						<td><span id="readonlyAddressType"></span></td>
						<td>事件类型：</td>
						<td><span id="readonlyItemType"></span></td>
					</tr>
					<tr>
						<td>外出人员：</td>
						<td  colspan="3"><span id="readonlyName"></span></td>
					</tr>
					<tr>
						<td>外出时间：</td>
						<td  colspan="3"><span id="readonlyOutTime"></span></td>
					</tr>
					<tr>
						<td>回来时间：</td>
						<td  colspan="3"><span id="readonlyInTime"></span></td>
					</tr>
					<tr>
						<td>备注：</td>
						<td  colspan="3"><span id="readonlyNote"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.goout.js"></script>
</body>
</html>