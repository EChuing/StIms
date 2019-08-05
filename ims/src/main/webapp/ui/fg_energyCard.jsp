<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>能源卡号</title>
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
	<script src="js/fg.energyCard.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="margin:5px 0 0 0;float:left;">
			<a class="easyui-linkbutton" iconCls="icon-add-notice" plain="true" onclick="addCard()">添加卡号</a>
			<a class="easyui-linkbutton" iconCls="icon-edit-number" plain="true" onclick="updateCard()">修改卡号</a>
		</div>
		<div style="clear:both"></div>
		<div id="searchContract" style="margin:0 0 0 5px">
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				城区：<input id="searchDistrict" onkeyup="searchOnkeyup(this.id, 'queryCard(1, 0)')" style="width:120px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				小区：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryCard(1, 0)')" style="width:120px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryCard(1, 0)')" style="width:120px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryCard(1, 0)')" style="width:120px">
			</div>
			<div style="clear:both"></div>
		</div>
	</div>
	<div id="DataGridCard" style="width:100%;height:90%;">
		<table id="cardDg" class="easyui-datagrid"
			style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:10,
				fitColumns:true,
				scrollbarSize:0">
			<thead>
				<tr>
					<th field="addCommunity" width="20" align="center">详细地址</th>
					<th field="jdcnCardName" width="10" align="center">卡名</th>
					<th field="jdcnCardNumber" width="15" align="center">卡号</th>
					<th field="jdcnMeterNumber" width="15" align="center">表号</th>
					<th field="jdcnBelongingToPeople" width="10" align="center">归属人</th>
					<th field="jdcnIdCard" width="10" align="center">身份证</th>
					<th field="jdcnTelephone" width="10" align="center">电话</th>
					<th field="jdcnBankName" width="10" align="center">银行</th>
					<th field="jdcnBankCard" width="10" align="center">银行卡号</th>
					<th field="jdcnRemarks" width="10" align="center">备注</th>
					<th field="jdcnRecordTime" width="10" align="center">登记时间</th>
				</tr>
			</thead>
		</table>
		<div id="cardPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<div id="addCardDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>
				卡号归属
			</legend>
			<div style='margin:5px 0 0 2px;float: left;'>
				选择房源：
				<input style="width:100px" readonly='readonly'
					onclick="relationDlg()" id="addHouseCoding" value="单击选择房源">
				<input style="display:none" id='addHouseStoreId'>
				<input style="display:none" id='jdcnId'>
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				详细地址：
				<input style="width:200px" id="addAddress" readonly>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 2px;float: left;' id='landNameDiv'>
				房东姓名：
				<input style="width:100px" id="landName" readonly>
			</div>
			<div style='margin:5px 0 0 2px;float: left;' id='landIdCardDiv'>
				身份证号：
				<input style="width:200px" id="landIdCard" readonly>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 2px;float: left;' id='landTelDiv'>
				房东电话：
				<input style="width:100px" id="landTel" readonly>
			</div>
		</fieldset>
		<fieldset>
			<legend>
				卡号信息
			</legend>
			<div style="margin:5px 0 0 2px;float:left;position:relative;">
				&emsp;&emsp;卡名：
				<select id="from" style="width:100px;" clear="clear" require="require"
					onChange="javascript:document.getElementById('').value=document.getElementById('from').options[document.getElementById('from').selectedIndex].value;">
					<option value="" style="color:#c2c2c2;">---请选择---</option>
					<option value="水卡">水卡</option>
					<option value="电卡">电卡</option>
					<option value="气卡">气卡</option>
					<option value="电视卡">电视卡</option>
				</select><input type="text" id="cardName"
					style="position:absolute;left:64px;width:80px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;">
			</div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardNum">&emsp;&emsp;卡号：</label>
				<input style="width:200px;" id="cardNum" clear="clear" require="require">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardPeople">&emsp;归属人：</label>
				<input style="width:100px;" id="cardPeople">
			</div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardPeopleId">身份证号：</label>
				<input style="width:200px;" id="cardPeopleId">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardTel">联系电话：</label>
				<input style="width:100px;" id="cardTel">
			</div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardRemark">&emsp;&emsp;表号：</label>
				<input style="width:200px;" id="jdcnMeterNumber">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardBankName">银行名称：</label>
				<input style="width:100px;" id="cardBankName">
			</div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardBank">银行卡号：</label>
				<input style="width:200px;" id="cardBank">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardRemark">&emsp;&emsp;备注：</label>
				<input style="width:366px;" id="cardRemark">
			</div>
			
		</fieldset>
		<center style="margin-top:10px">
			<div id="errorMsg" style="height:20px;color:red;"></div>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addCardDlg')){doAddCard()}" id="addCardButton">确认</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addCardDlg')){doUpdateCard()}" id="updateCardButton">确认</a>
			<!-- <a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddCard()" id="addCardButton">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateCard()" id="updateCardButton">保存</a> -->
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addCardDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 费用关联列表显示  -->
	<div id="relationDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div id="relationSelect" style='margin:5px 0 5px 0;'>
			<div
				style="margin:0 0 5px 0;color:black;font-size:13px;float:left;display:none">
				城市：<select id="searchAddCity" onchange="queryAddCity()"
					style="width:80px">
				</select>
			</div>
			<div
				style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				城区：<select id="searchAddDistrict" onchange="relationDate(1,0)"
					style="width:100px">
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
				小区：<input id="searchAddCommunity"
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
			<div style="clear:both;"></div>
		</div>
		<div id="relationDataGrid" style="width:100%;height:89%">
			<div id="choseTrusteeship" style="width:100%;height:100%;">
				<table id="choseTrusteeshipTable"></table>
				<div id="choseTrusteeshipPageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
</body>
</html>