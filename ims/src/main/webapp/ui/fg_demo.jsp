<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>房源管理</title>
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
	<div style="padding:5px 0 5px 5px">
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addHouseButton" onclick="addHouseDlg()">添加房源</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateHouseButton" onclick="updateHouseDlg()">修改房源</a>
	</div>
	<div class="clearfix">
		<div style="margin:0 0 5px 10px;float:left;">
			城区：<select class="district" id="searchDistrict" onchange="queryHouse(1,0)" style="width:100px">
				<option></option>
			</select>
		</div>
		<div style="margin:0 0 5px 10px;float:left;">
			楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryHouse(1, 0)')" style="width:100px">
		</div>
		<div style="margin:0 0 5px 10px;float:left;">
			楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryHouse(1, 0)')" style="width:100px">
		</div>
		<div style="margin:0 0 5px 10px;float:left;">
			门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryHouse(1, 0)')" style="width:100px">
		</div>
		<div style="padding:0 0 5px 10px;float:left;">
			租方：<input id="searchRentShowUserInfo" class="choose_user_button" doFlag="searchRent" doFun="queryHouse(1,0)"
				style="width:150px;cursor:pointer;" readonly="readonly">
			<input id="searchRentGetUserStoreId" type="hidden">
			<input id="searchRentGetUserDetId" type="hidden">
			<input id="searchRentGetUserId" type="hidden">
			<div id="searchRentShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="padding:0 0 5px 10px;float:left;">
			售方：<input id="searchSaleShowUserInfo" class="choose_user_button" doFlag="searchSale" doFun="queryHouse(1,0)"
				style="width:150px;cursor:pointer;" readonly="readonly">
			<input id="searchSaleGetUserStoreId" type="hidden">
			<input id="searchSaleGetUserDetId" type="hidden">
			<input id="searchSaleGetUserId" type="hidden">
			<div id="searchSaleShowUserInfoDiv" style="display:none;"></div>
		</div>
	</div>
	<div>
		<table id="houseDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" 
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="addDistrict" width="10" align="center">城区</th>
					<th field="addCommunity" width="10" align="center">楼盘名称</th>
					<th field="addBuilding" width="10" align="center">楼栋</th>
					<th field="addDoorplateno" width="10" align="center">门牌号</th>
					<th field="tenantName" width="10" align="center">租方</th>
					<th field="whilePeopleName" width="10" align="center">售方</th>
				</tr>
			</thead>
		</table>
		<div id="housePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<div id="addHouseDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 5px 10px;float:left;">
			城区：<select class="district" id="addHouseDistrict" style="width:150px" choose="choose" require="require">
				<option></option>
			</select>
		</div>
		<div style="margin:0 0 5px 10px;float:left;">
			楼盘名称：<input id="addHouseCommunity" style="width:150px" clear="clear" require="require">
		</div>
		<div style="clear:both;"></div>
		<div style="margin:0 0 5px 10px;float:left;">
			楼栋：<input id="addHouseBuilding" style="width:150px" clear="clear" require="require">
		</div>
		<div style="margin:0 0 5px 22px;float:left;">
			门牌号：<input id="addHouseDoorplateno" style="width:150px" clear="clear" require="require">
		</div>
		<div style="clear:both;"></div>
		<div style="padding:0 0 5px 10px;float:left;">
			租方：<input id="addHouseRentShowUserInfo" class="choose_user_button" doFlag="addHouseRent" doFun=""
				style="width:150px;cursor:pointer;" readonly="readonly" clear="clear" require="require">
			<input id="addHouseRentGetUserStoreId" type="hidden" clear="clear">
			<input id="addHouseRentGetUserDetId" type="hidden" clear="clear">
			<input id="addHouseRentGetUserId" type="hidden" clear="clear">
			<div id="addHouseRentShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="padding:0 0 5px 34px;float:left;">
			售方：<input id="addHouseSaleShowUserInfo" class="choose_user_button" doFlag="addHouseSale" doFun=""
				style="width:150px;cursor:pointer;" readonly="readonly" clear="clear" require="require">
			<input id="addHouseSaleGetUserStoreId" type="hidden" clear="clear">
			<input id="addHouseSaleGetUserDetId" type="hidden" clear="clear">
			<input id="addHouseSaleGetUserId" type="hidden" clear="clear">
			<div id="addHouseSaleShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addHouseDlg')){doAddHouse()}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addHouseDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<div id="updateHouseDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 5px 10px;float:left;">
			城区：<select class="district" id="updateHouseDistrict" style="width:150px" choose="choose" require="require">
				<option></option>
			</select>
		</div>
		<div style="margin:0 0 5px 10px;float:left;">
			楼盘名称：<input id="updateHouseCommunity" style="width:150px" clear="clear" require="require">
		</div>
		<div style="clear:both;"></div>
		<div style="margin:0 0 5px 10px;float:left;">
			楼栋：<input id="updateHouseBuilding" style="width:150px" clear="clear" require="require">
		</div>
		<div style="margin:0 0 5px 22px;float:left;">
			门牌号：<input id="updateHouseDoorplateno" style="width:150px" clear="clear" require="require">
		</div>
		<div style="clear:both;"></div>
		<div style="padding:0 0 5px 10px;float:left;">
			租方：<input id="updateHouseRentShowUserInfo" class="choose_user_button" doFlag="updateHouseRent" doFun=""
				style="width:150px;cursor:pointer;" readonly="readonly" clear="clear" require="require">
			<input id="updateHouseRentGetUserStoreId" type="hidden" clear="clear">
			<input id="updateHouseRentGetUserDetId" type="hidden" clear="clear">
			<input id="updateHouseRentGetUserId" type="hidden" clear="clear">
			<div id="updateHouseRentShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="padding:0 0 5px 34px;float:left;">
			售方：<input id="updateHouseSaleShowUserInfo" class="choose_user_button" doFlag="updateHouseSale" doFun=""
				style="width:150px;cursor:pointer;" readonly="readonly" clear="clear" require="require">
			<input id="updateHouseSaleGetUserStoreId" type="hidden" clear="clear">
			<input id="updateHouseSaleGetUserDetId" type="hidden" clear="clear">
			<input id="updateHouseSaleGetUserId" type="hidden" clear="clear">
			<div id="updateHouseSaleShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('updateHouseDlg')){doUpdateHouse()}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateHouseDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/upload.js"></script>
	<script src="js/fg.demo.js"></script>
</body>
</html>