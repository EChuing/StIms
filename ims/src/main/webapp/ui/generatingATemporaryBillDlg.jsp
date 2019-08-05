<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>添加临时账单</title>
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
	<script src="js/fg.public.js"></script><!-- js/iframePublic.js -->
	<script src="js/config.js"></script>
	<!-- public.js要在generatingATemporaryBillDlg.js前加载 ,否则在该页面无法重新进行600秒倒计时重置-->
	<script src="js/generatingATemporaryBillDlg.js"></script>
</head>
<body>
	<div class="bodyLoadingOver"></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="padding:5px;" id="creatingATemporaryBillDlg">
		<div style="margin:10px 0 0 10px;float: left;">
			费用归属：<input style="width:250px;cursor: pointer;" placeholder="点击选择房屋" readonly="readonly" 
				id="selectionAddress" onclick="houseSelection()" must="must" require="require" value="${param.address}">
		</div>
		<div style="margin:10px 0 0 34px;float: left;">
			类型：<select id="selectionLabelType" style="width:90px" must="must" require="require">
				<option></option>
				<option value="1" selected="selected">临时账单</option> 
				<option value="2">金融账单</option>
			</select>
		</div>
		<div style="margin:10px 0 0 22px;float: left;">
			收款日：<input style="width:90px;cursor: pointer;" id="selectionReceiptDay" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})" must="must" require="require">
		</div>
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 10px;float: left;">
			客户姓名：<input style="width:90px;" readonly="readonly" id="selectionCustomerName" require="require" value="${param.renterName}">
		</div>
		<div style="margin:10px 0 0 10px;float: left;">
			联系方式：<input style="width:90px;" readonly="readonly" id="selectionContactInformation" require="require" value="${param.renterTel}">
		</div>
		<div style="margin:10px 0 0 22px;float: left;">
			登记人：<input style="width:90px;" readonly="readonly" id="selectionRegistrant" >
		</div>
		<div style="margin:10px 0 0 10px;float: left;">
			登记时间：<input style="width:90px;" readonly="readonly" id="selectionRegistrationTime" >
		</div>
		<div style="clear:both"></div>
		
		<fieldset>
			<legend>单笔添加（如账单有多笔财务科目，请分别添加）</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				收支性质：<input style="width:90px;" id="financilSearchJfNatureOfThe" disabled="disabled" clean="clean" require="require">
			</div>
			<div style='margin:5px 0 0 10px;float: left;' >
				收支分类：<input style="width:90px;" id="financilSearchJfBigType"  disabled="disabled" clean="clean" require="require">
			</div>
			<div style='margin:5px 0 0 10px;float: left;' >
				收支种类：<input style="width:90px;" id="financilSearchJfAccountingSpecies"  disabled="disabled" clean="clean" require="require">
			</div>
			<div style="margin:2.5px 0 0 20px;color:black;float:left;">
			<a class="easyui-linkbutton" iconcls="icon-search" id="financilSearchButton" >选择收支分类</a>
				<div id="financilSearchDiv"></div>
			</div>
			<div style="clear:both"></div>
			<div style="margin:12px 0 0 0px;float: left;">
				单笔金额：<input type="number" data-type="money" style="width:160px; height:30px" id="selectionAmountOfMoney" must="must" require="require"/>&nbsp;元
			</div>
			
			<div style='margin:10px 42px 0 0px;float:right;'>
				收支原因：<textarea style="width:240px;"  must="must" id="selectionRemarks" require="require"></textarea>
			</div>
			<div style="clear:both"></div>
			<div style='text-align: center; margin-top: 8px'>
				<a  class="easyui-linkbutton" iconcls="icon-add" id='addFinancialButton' style=""onclick="addTemporaryBill()"> 添加</a>
			</div>
		</fieldset>
		<div style="width:100%">
			<div id="addFinancialTableDiv" style='margin:5px 0 5px 5px;width:99%;height:170px;'>
				<table id="addTemporaryOBill">
				</table>
				<div style="display:none">
					<table id="replacedFinancialTable" style="display:none">
					</table>
				</div>
			</div>
		</div>
		<div style='text-align: center; margin-top: 12px;margin-bottom: 12px'>
			合计账单金额：<input style="width:80px" id="replacedFinancialTotal" clean="clean" type="text" disabled="disabled"/>
		</div>
		<div style="clear:both"></div>
		<div style="text-align: center;">
			<center>
				<a id="addHouseSaveButton" class="easyui-linkbutton" iconcls="icon-save" onclick="generatingBill()">生成账单</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="parent.$('#generatingATemporaryBillDlg').dialog('close')">取消</a>	
			</center>
		</div>
	</div>
	
	<!-- 房源选择窗口 -->	
	<div id="houseSelectionDlg" style="padding:6px;display:none;">
		<div style="margin:0 0 5px 10px;color:black;font-size:13px;float:left;">
			城区：<select id="selectionCity" style="width:80px" clear="clear" onchange="loadHouseData(1, 1)">
				<option></option>
			</select>
		</div>
		<div style="margin:0 0 5px 10px;color:black;font-size:13px;float:left;">
			楼盘名称：<input id="selectionCommunity" onkeyup="searchOnkeyup(this.id, 'loadHouseData(1, 1)')" style="width:120px;" clear="clear">
		</div>
		<div style="margin:0 0 5px 10px;color:black;font-size:13px;float:left;">
			楼栋：<input id="selectionBuilding" onkeyup="searchOnkeyup(this.id, 'loadHouseData(1, 1)')" style="width:80px" clear="clear">
		</div>
		<div style="margin:0 0 5px 10px;color:black;font-size:13px;float:left;">
			门牌号：<input id="selectionDoorplateno" onkeyup=";searchOnkeyup(this.id, 'loadHouseData(1, 1)')" style="width:80px" clear="clear">
		</div>
		<table id="houseSelectionDg" class="easyui-datagrid" style="width:100%;height:202px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="addDistrict" width="25" align="center">城区</th>
					<th field="addCommunity" width="25" align="center">楼盘名称</th>
					<th field="addBuilding" width="25" align="center">楼栋</th>
					<th field="addDoorplateno" width="25" align="center">门牌</th>
					<th field="addPopName" width="25" align="center">客户姓名</th>
				</tr>
			</thead>
		</table>
		<div id="houseSelectionPageDiv" style="width:99%;text-align:center;"></div>
	</div>
	
	<!-- 需要的参数 -->
	<input id="hrId" type="hidden" value="${param.hrId}">
	<input id="hsId" type="hidden" value="${param.hsId}">
	<input id="houseId" type="hidden" value="${param.houseId}">
	<input id="renterId" type="hidden" value="${param.renterId}">
	<input id="landlordId" type="hidden" value="${param.landlordId}">
	
</body>
</html>