<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>资产管理</title>
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
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.asset.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-peizhi" id="addAssetButton" onclick="addAsset()">添加资产</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateAssetButton" onclick="updateAsset()">修改资产</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateUse" onclick="updateUse()">修改使用情况</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateState" onclick="updateState()">修改资产状态</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-qianyi" id="moveAssetButton" onclick="moveAsset()">迁移资产</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-dayin" id="printAssetButton" onclick="printAsset()">打印勾选资产标识卡</a>
			<a class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="advancedScreening(1)" id="screening">高级筛选</a>
		</div>
		<div class="advancedScreening">
			<div class="clearfix advanced1">
				<div style="display:none">
					城市：<select id="searchCity" onchange="queryDistrict()" style="width:100px">
						<option></option>
					</select>
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryAsset(1)')" style="width:100px">
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					&emsp;&emsp;楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryAsset(1)')" style="width:100px">
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					&emsp;门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryAsset(1)')" style="width:100px">
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					资产名称：<input id="searchSaName" onkeyup="searchOnkeyup(this.id, 'queryAsset(1)')" style="width:100px"></input>
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					使用情况：<select id="searchSaUse" onchange="queryAsset(1)" style="width:100px">
						<option></option>
						<option value="正常">正常</option>
						
					</select>
				</div>
				<!-- <div style="padding:0 0 5px 5px;color:black;float:left;">
					项目分类：<select id="searchVirtualType" onchange="queryAsset(1)" style="width:100px;">
						<option value="0"></option>
						<option value="1">内部项目</option>
						<option value="2">外部项目</option>
						<option value="3">非成本项目</option>
					</select>
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					项目名称：<input id="searchVirtualName" onkeyup="queryOnkeyup(this.id,5,0)" style="width:100px;" >
				</div> -->
			</div>
			<div class="clearfix advanced2">
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					&emsp;&emsp;城区：<select id="searchDistrict" onchange="queryAsset(1)" style="width:100px">
						<option></option>
					</select>
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					资产所属：<select id="searchSaType" onchange="queryAsset(1)" style="width:100px">
						<option></option>
					</select>
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					资产状态：<select id="searchSaState" onchange="queryAsset(1)" style="width:100px">
						<option></option>
					</select>
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					资产编号：<input id="searchSaNumber" onkeyup="searchOnkeyup(this.id, 'queryAsset(1)')" style="width:100px"></input>
				</div>
			</div>
			<div class="clearfix advanced3">
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					资产类型：<select id="searchSaClassify" onchange="queryAsset(1)" style="width:100px">
						<option></option>
					</select>
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					&emsp;&emsp;品牌：<input id="searchSaBrand" onkeyup="searchOnkeyup(this.id, 'queryAsset(1)')" style="width:100px"></input>
				</div>
				<div style="padding:0 0 5px 5px;color:black;float:left;">
					&emsp;&emsp;型号：<input id="searchSaModel" onkeyup="searchOnkeyup(this.id, 'queryAsset(1)')" style="width:100px"></input>
				</div>
			</div>
		</div>
	</div>
	<!--资产管理列表-->
	<div>
		<table id="assetDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0, checkOnSelect: false, selectOnCheck: false,">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th width="15" align="center" field="saNumber">资产编号</th>
					<th width="20" align="center" field="saDetailedAddress">房屋地址/项目名称</th>
					<th width="10" align="center" field="saType">所属</th>
					<th width="10" align="center" field="saClassify">类型</th>
					<th width="10" align="center" field="saName">名称</th>
					<th width="10" align="center" field="saBrand">品牌</th>
					<th width="10" align="center" field="saModel">型号</th>
					<th width="10" align="center" field="saPrice">价格</th>
                    <th width="10" align="center" field="saDepreciationPrice">折旧价格</th>
					<th width="10" align="center" field="saStatus">状态</th>
					<th width="10" align="center" field="saUse" formatter="formatterSaUse">使用情况</th>
					<th width="10" align="center" field="saRemarks">备注</th>
					<th width="10" align="center" field="saPhotosNum">图片</th>
					<th width="10" align="center" field="registrantName">登记人</th>
					<th width="10" align="center" field="saRegistrationTime">登记时间</th>
				</tr>
			</thead>
		</table>
		<div id="assetPageDiv" style="width:100%;text-align:center;"></div>
		<table id="followTable"></table>
	</div>
	<!-- 添加资产 -->
	<div id="addAssetDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">		
		<fieldset>
			<legend>资产归属</legend>
			<div style="margin:0 0 5px 5px;">
				资产归属：<input id="assets_choseHouse" readonly="readonly" onclick="choseHouse(0)" 
					style="width:520px" placeholder="单击选择房屋或项目，必选" clear="clear" must="must"> 
				<input type="hidden" id="assets_houseStoreCoding" clear="clear">
				<input type="hidden" id="assets_houseCoding" clear="clear">
			</div>
		</fieldset>
		<fieldset>
			<legend>资产信息</legend>
			<div style="margin:0 0 5px 5px;float:left;">
				资产所属：<select id="add_asset_type" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				使用情况：<select id="add_asset_use" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				资产状态：<select id="add_asset_status" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;价格：<input id="add_asset_price" style="width:130px;" clear="clear" must="must" placeholder="必填" placeholder="必填"
					onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
					onfocus="if (value =='0.00') {value = ''}">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				资产类型：<select id="add_asset_classify" style="width:130px;" choose="choose" must="must" onchange="changeAssetsType('add_asset_')">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;名称：<select id="add_asset_name" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;品牌：<input id="add_asset_brand" style="width:130px;" clear="clear">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;型号：<input id="add_asset_model" style="width:130px;" clear="clear">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
			<div style="margin:0 0 5px 0;float:left;">
				<textarea id="add_asset_remark" style="width:325px;height:50px;" clear="clear"></textarea>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;供应商：<input id="assets_changeSupplier" readonly="readonly" onclick="choseSupplier(0)" 
					style="width:325px" placeholder="单击选择供应商，可选" clear="clear">
				<input type="hidden" id="assets_supplier_id" clear="clear">
			</div>
			<div style="margin:3px 0 5px 5px;float:left;">
				&emsp;&emsp;数量：<input id="add_asset_number" style="width:130px;" clear="clear" must="must" placeholder="必填"
					onkeyup="this.value=this.value.replace(/\D/g,'')" 
					onafterpaste="this.value=this.value.replace(/\D/g,'')">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				<a class="easyui-linkbutton" iconcls="icon-add" onclick="addToDataGrid()">添加</a>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="cleanDataGrid()">清除</a>
			</div>
		</fieldset>	
		<div id="addAssetTableDiv" style="margin:5px 0 5px 0;">
			<table id="addAssetTable"></table>
		</div>
		<center style="margin:10px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddAsset()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addAssetDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 归属关联列表显示  -->
	<div id="choseHouseDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input type="hidden" id="choseHouseType">
		<div style="margin:5px 0 0 5px;color:black;font-size:13px;float:left;">
			选择列表：<select id="searchBelongType" onchange="relationDataGrid()" style="width:100px">
				<option value="1">房源列表</option>
				<option value="2">库房/公区</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="choseHouseSelect">
			<div style="margin:0 0 10px 0;">
				<div style="display:none">
					城市：<select id="searchAddCity" onchange="queryDistrict2()" style="width:100px;">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					&emsp;&emsp;城区：<select id="searchAddDistrict" onchange="choseHouseData(1)" style="width:100px;">
						<option></option>
					</select>
				</div>
				<div style="display:none">
					片区：<select id="searchAddZone" onchange="choseHouseData(1)" style="width:100px;">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="searchAddCommunity" onkeyup="searchOnkeyup(this.id, 'choseHouseData(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuilding" onkeyup="searchOnkeyup(this.id, 'choseHouseData(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplateno" onkeyup="searchOnkeyup(this.id, 'choseHouseData(1)')" style="width:100px;">
				</div>
			</div>
		</div>
		<div id="virtualRelationSelect" style="display:none;">
			<div style="margin:0 0 10px 0;">
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目分类：<select id="searchVirtualType2" onchange="choseHouseData(1)" style="width:100px;">
						<option value="1"></option>
						<option value="2">库房</option>
						<option value="3">公区</option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目名称：<input id="searchVirtualName2" onkeyup="searchOnkeyup(this.id, 'choseHouseData(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目联系人：<input id="searchVirtualContact2" onkeyup="searchOnkeyup(this.id, 'choseHouseData(1)')" style="width:100px;">
				</div>
			</div>
		</div>
		<div style="width:100%;height:89%">
			<!-- 选择未租列表 -->
			<div id="choseTrusteeship" style="width:100%;height:100%;display:none;">
				<table id="choseTrusteeshipTable"></table>
				<div id="choseTrusteeshipPageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<!-- 选择项目列表 -->
			<div id="choseVirtualHouse" style="width:100%;height:100%;display:none;">
				<table id="choseVirtualHouseTable"></table>
				<div id="choseVirtualHousePageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
	<!-- 供应商归属关联列表显示  -->
	<div id="choseSupplierDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 10px 0;">
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				项目分类：<select style="width:100px;" id="searchVirtualSupplierType" onchange="choseSupplierData(1)">
					<option value="0"></option>
					<option value="1">内部项目</option>
					<option value="2">外部项目</option>
					<option value="3">非成本项目</option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				项目名称：<input id="searchSupplierName" onkeyup="searchOnkeyup(this.id, 'choseSupplierData(1)')" style="width:100px;">
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				项目联系人：<input id="searchSupplierVirtualContact" onkeyup="searchOnkeyup(this.id, 'choseSupplierData(1)')" style="width:100px;">
			</div>
		</div>
		<div id="choseSupplier" style="width:100%;height:95%;">
			<table id="choseSupplierTable"></table>
			<div id="choseSupplierPageDiv" style="width:99%;text-align:center;"></div>
		</div>
	</div>
	<!-- 资产详情 -->
	<div id="assetInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div id="assetInfoTabs" class="easyui-tabs">
			<div title="详细信息" tabindex="0" style="padding:6px;">
				<input type="hidden" id='assetInfo_index'>
				<fieldset>
					<legend>资产归属</legend>
					<div style="margin:0 0 5px 5px;">
						资产归属：<input id="query_asset_choseHouse" readonly="readonly" style="width:520px" clear="clear"> 
					</div>
				</fieldset>
				<fieldset>
					<legend>资产信息</legend>
					<div style="margin:0 0 5px 5px;float:left;">
						资产所属：<input id="query_asset_type" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						使用情况：<input id="query_asset_use" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						资产状态：<input id="query_asset_status" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;价格：<input id="query_asset_price" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						资产类型：<input id="query_asset_classify" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;名称：<input id="query_asset_name" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;品牌：<input id="query_asset_brand" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;型号：<input id="query_asset_model" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="clear:both;"></div>
					<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
					<div style="margin:0 0 5px 0;float:left;">
						<textarea id="query_asset_remark" readonly="readonly" style="width:325px;height:50px;" clear="clear"></textarea>
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;供应商：<input id="query_asset_changeSupplier" readonly="readonly" style="width:325px" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						资产编号：<input id="query_asset_number" readonly="readonly" style="width:130px;" clear="clear">
					</div>
                    <div style="margin:0 0 5px 5px;float:left;">
                                                                        折旧价格：<input id="query_asset_depreciation_price" readonly="readonly" style="width:130px;" clear="clear">
                    </div>
				</fieldset>
				<div style="padding:10px 0 0 0;">
					<table id="assetFollowTable"></table>
				</div>
				<center style="margin:20px 0 0 0;">
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)">上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)">下一条</a>
				</center>
			</div>
			<div title="图片信息" tabindex="1">		
				<div style="padding:5px 0 0 10px;">
					<a class="easyui-linkbutton" iconCls="icon-upload" 	  plain="true" onclick="upload_asset_img()">上传</a>
					<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="remove_asset_img()">选择删除</a>
					<a class="easyui-linkbutton" iconCls="icon-shuaxin" 		  plain="true" onclick="refresh_asset_img()">刷新</a>
					<span id="_asset_imgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
				</div>
				<div id="_asset_title" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
				<div style="clear:both"></div>
				<left>
					<div id="_asset_btn" style="margin:10px 0 0 10px;display:none;">
						<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemove_asset_img()">删除</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel_asset_img()">取消</a>
					</div>
				</left>
				<div id="_asset_imgWrapper" style="margin:10px 0 0 10px;"></div>
				
			</div>
		</div>
	</div>
	<!-- 修改资产 -->
	<div id="updateAssetDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">		
		<fieldset>
			<legend>资产归属</legend>
			<div style="margin:0 0 5px 5px;">
				资产归属：<input id="update_asset_choseHouse" disabled="disabled"
					style="width:520px" clear="clear"> 
			</div>
		</fieldset>
		<fieldset>
			<legend>资产信息</legend>
			<div style="margin:0 0 5px 5px;float:left;">
				资产所属：<select id="update_asset_type" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
				<div style="margin:0 0 5px 5px;float:left;">
					使用情况：<select id="update_asset_use" style="width:130px;" choose="choose" must="must">
						<option></option>
					</select>
				</div>
			<div style="margin:0 0 5px 5px;float:left;">
				资产状态：<select id="update_asset_status" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;价格：<input id="update_asset_price" style="width:130px;" clear="clear" must="must" placeholder="必填"
					onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
					onfocus="if (value =='0.00') {value = ''}">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				资产类型：<select id="update_asset_classify" style="width:130px;" choose="choose" must="must" onchange="changeAssetsType('update_asset_')">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;名称：<select id="update_asset_name" style="width:130px;" choose="choose" must="must" >
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;品牌：<input id="update_asset_brand" style="width:130px;" clear="clear">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;型号：<input id="update_asset_model" style="width:130px;" clear="clear">
			</div>
			<div style="clear:both;"></div>
			<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
			<div style="margin:0 0 5px 0;float:left;">
				<textarea id="update_asset_remark" style="width:325px;height:50px;" clear="clear"></textarea>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;供应商：<input id="update_asset_changeSupplier" readonly="readonly" onclick="choseSupplier(1)" 
					style="width:325px" placeholder="单击选择供应商，可选" clear="clear">
				<input type="hidden" id="update_asset_supplier_id" clear="clear">
			</div>
		</fieldset>
		<center style="margin:10px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateAsset()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateAssetDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 修改使用情况 -->
	<div id="updateAssetDlg1" style="padding:6px" class="easyui-dialog" data-options="closed:true">		
		<fieldset style="border: 0">
			<div style="margin:0 0 5px 5px;float:left;">
				使用情况：<select id="update_asset_use1" style="width:130px;" choose="choose" must="must">
					<option value="使用中">使用中</option>
					<option value="未使用">未使用</option>
					<option value="已报废">已报废</option>
				</select>
			</div>
		</fieldset>
		<center style="margin:10px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateUse()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateAssetDlg1').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 修改资产状态 -->
	<div id="updateAssetDlg2" style="padding:6px" class="easyui-dialog" data-options="closed:true">		
		<fieldset style="border: 0">
			<div style="margin:0 0 5px 5px;float:left;">
				资产状态：<select id="update_asset_state" style="width:130px;" choose="choose" must="must">
					<option value="正常">正常</option>
					<option value="损坏">损坏</option>
					<option value="丢失">丢失</option>
					<option value="注销">注销</option>
				</select>
			</div>
		</fieldset>
		<center style="margin:10px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateState()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateAssetDlg2').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 跟进详情 -->
	<div id="downFollowInfo" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>跟进时间：</td>
						<td colspan="3"><span id="readDownFollowtime"></span></td>
					</tr>
					<tr>
						<td>跟进人：</td>
						<td><span id="readDownFollowregistrantName"></span></td>
						<td>经手人：</td>
						<td><span id="readDownFollowagentName"></span></td>
					</tr>
					<tr>
						<td>跟进内容：</td>
						<td colspan="3" style="text-align:left"><span id="readDownFollowtext"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<!-- 迁移资产 -->
	<div id="moveAssetDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 5px 5px;">
			迁出地址/项目：<input id="move_from_asset_choseHouse" disabled="disabled"
				style="width:400px" clear="clear"> 
		</div>
		<div style="margin:10px 0 5px 5px;">
			迁入地址/项目：<input id="move_to_asset_choseHouse" readonly="readonly" onclick="choseHouse(1)" 
				style="width:400px" placeholder="单击选择房屋或项目，必选" clear="clear" must="must">
			<input type="hidden" id="move_to_asset_houseStoreCoding" clear="clear">
			<input type="hidden" id="move_to_asset_houseCoding" clear="clear">
		</div>
		<div style="margin:10px 0 5px 46px;">
			&emsp;经手人：<input id="pickassetShowUserInfo" style="width:200px;cursor: pointer;" 
			readonly="readonly" class="choose_user_button" doFlag="pickasset" doFun="" value="" must="must">
				<input id="pickassetGetUserStoreId" type="hidden">
				<input id="pickassetGetUserDetId" type="hidden">
				<input id="pickassetGetUserId" type="hidden">
				<div id="pickassetShowUserInfoDiv" style="display:none;"></div>
		</div>
        <div class="clearfix">
            <div style="margin:5px 0 5px 34px;float:left;">迁移原因：</div>
            <div style="margin:5px 0 5px 0;float:left;">
                <textarea id="move_asset_reason" style="width:400px;height:50px;" 
                    clear="clear" placeholder="可选"></textarea>
            </div>
        </div>
		<center style="margin:15px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveAsset()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moveAssetDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/upload.js"></script>
</body>
</html>