<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>库房管理</title>
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
	<script src="js/fg.supplies.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="margin:5px 0 5px 5px;">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-peizhi"onclick="addSupplies()">添加耗材</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="updateSupplies()">修改耗材</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-qianyi" onclick="moveSupplies()">迁移耗材</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-shiyonghaocai" onclick="useSupplies()">使用耗材</a>
            <a class="easyui-linkbutton" plain="true" iconCls="icon-zengjianhaocaishuliang" onclick="purchaseSupplies()">增减耗材数量</a>
		</div>
		<div class="clearfix">
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				项目分类：<select id="searchVirtualType" onchange="querySupplies(1)" style="width:100px;">
					<option value="0"></option>
					<option value="1">内部项目</option>
					<option value="2">外部项目</option>
					<option value="3">非成本项目</option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				项目名称：<input id="searchVirtualName" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;querySupplies(1)')" style="width:100px;">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				耗材类型：<select id="searchSupType" onchange="querySupplies(1)" style="width:100px">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				耗材名称：<input id="searchSupName" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;querySupplies(1)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				品牌：<input id="searchSupBrand" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;querySupplies(1)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				型号：<input id="searchSupModel" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;querySupplies(1)')" style="width:100px"></input>
			</div>
		</div>
	</div>
	<!--库房管理列表-->
	<div>
		<table id="suppliesDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th width="20" align="center" field="keyAdministrator">项目</th>
					<th width="10" align="center" field="supType">类型</th>
					<th width="10" align="center" field="supName">名称</th>
					<th width="10" align="center" field="supBrand">品牌</th>
					<th width="10" align="center" field="supModel">型号</th>
					<th width="10" align="center" field="supPrice">价格</th>
					<th width="10" align="center" field="supNum">数量</th>
					<th width="20" align="center" field="supRemark">备注</th>
					<th width="10" align="center" field="supImgNum">图片</th>
				</tr>
			</thead>
		</table>
		<div id="suppliesPageDiv" style="width:100%;text-align:center;"></div>
		<table id="followTable"></table>
	</div>
	<!-- 添加耗材 -->
	<div id="addSuppliesDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 5px 5px;color:red;font-size:13px;">
			温馨提示：若系统中该项目下已存在该耗材，请直接修改耗材数量，无须重复添加。
		</div>
		<fieldset>
			<legend>耗材归属</legend>
			<div style="margin:0 0 5px 5px;">
				耗材归属：<input id="supplies_choseHouse" readonly="readonly" onclick="choseProject(0)" 
					style="width:520px" placeholder="单击选择项目，必选" clear="clear" must="must"> 
				<input type="hidden" id="supplies_houseCoding" clear="clear">
			</div>
		</fieldset>
		<fieldset>
			<legend>耗材信息</legend>
			<div style="margin:0 0 5px 5px;float:left;">
				耗材类型：<select id="add_supplies_type" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;名称：<input id="add_supplies_name" style="width:130px;" clear="clear" must="must" placeholder="必填">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;品牌：<input id="add_supplies_brand" style="width:130px;" clear="clear">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;型号：<input id="add_supplies_model" style="width:130px;" clear="clear">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;价格：<input id="add_supplies_price" style="width:130px;" clear="clear" must="must" placeholder="必填" placeholder="必填"
					onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
					onfocus="if (value =='0.00') {value = ''}">
			</div>
			<div style="margin:3px 0 5px 5px;float:left;">
				&emsp;&emsp;数量：<input id="add_supplies_number" style="width:130px;" clear="clear" must="must" placeholder="必填"
					onkeyup="this.value=this.value.replace(/\D/g,'')" 
					onafterpaste="this.value=this.value.replace(/\D/g,'')">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
			<div style="margin:0 0 5px 0;float:left;">
				<textarea id="add_supplies_remark" style="width:325px;height:50px;" clear="clear"></textarea>
			</div>
		</fieldset>
		<center style="margin:10px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddSupplies()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addSuppliesDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 修改耗材 -->
	<div id="updateSuppliesDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">		
		<fieldset>
			<legend>耗材归属</legend>
			<div style="margin:0 0 5px 5px;">
				耗材归属：<input id="update_supplies_choseHouse" disabled="disabled"
					style="width:520px" clear="clear"> 
			</div>
		</fieldset>
		<fieldset>
			<legend>耗材信息</legend>
            <div class="clearfix">
				<div style="margin:0 0 5px 5px;float:left;">
					耗材类型：<select id="update_supplies_type" style="width:130px;" choose="choose" must="must">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;float:left;">
					&emsp;&emsp;名称：<input id="update_supplies_name" style="width:130px;" clear="clear" must="must" placeholder="必填">
				</div>
				<div style="margin:0 0 5px 5px;float:left;">
					&emsp;&emsp;品牌：<input id="update_supplies_brand" style="width:130px;" clear="clear">
				</div>
            </div>
            <div class="clearfix">
				<div style="margin:0 0 5px 5px;float:left;">
					&emsp;&emsp;型号：<input id="update_supplies_model" style="width:130px;" clear="clear">
				</div>
				<div style="margin:0 0 5px 5px;float:left;">
					&emsp;&emsp;价格：<input id="update_supplies_price" style="width:130px;" clear="clear" must="must" placeholder="必填"
						onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
						onfocus="if (value =='0.00') {value = ''}">
				</div>
				<!-- <div style="margin:3px 0 5px 5px;float:left;">
					&emsp;&emsp;数量：<input id="update_supplies_number" style="width:130px;" clear="clear" must="must" placeholder="必填"
						onkeyup="this.value=this.value.replace(/\D/g,'')" 
						onafterpaste="this.value=this.value.replace(/\D/g,'')">
				</div> -->
			</div>
			<div class="clearfix">
				<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
				<div style="margin:0 0 5px 0;float:left;">
					<textarea id="update_supplies_remark" style="width:325px;height:50px;" clear="clear"></textarea>
				</div>
			</div>
		</fieldset>
		<center style="margin:10px 0 0 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateSupplies()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateSuppliesDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 迁移耗材 -->
	<div id="moveSuppliesDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 5px 5px;">
			迁出项目：<input id="move_from_supplies_choseHouse" disabled="disabled"
				style="width:400px" clear="clear"> 
		</div>
		<div style="margin:10px 0 5px 5px;">
			迁入项目：<input id="move_to_supplies_choseHouse" readonly="readonly" onclick="choseProject(1)" 
				style="width:400px" placeholder="单击选择项目，必选" clear="clear" must="must">
			<input type="hidden" id="move_to_supplies_houseCoding" clear="clear">
		</div>
		<div style="margin:10px 0 5px 5px;">
			迁移数量：<input id="move_supplies_number" style="width:130px;" clear="clear" must="must" placeholder="必填"
				onkeyup="this.value=this.value.replace(/\D/g,'')" 
				onafterpaste="this.value=this.value.replace(/\D/g,'')">
		</div>
		<center style="margin:15px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveSupplies()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moveSuppliesDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 使用耗材 -->
	<div id="useSuppliesDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:10px 0 5px 5px;">
			使用地址：<input id="use_supplies_choseHouse" readonly="readonly" onclick="choseHouse()" 
				style="width:400px" placeholder="单击选择地址、项目，必选" clear="clear" must="must">
			<input type="hidden" id="use_supplies_houseCoding" clear="clear">
		</div>
		<div style="margin:10px 0 5px 5px;">
			使用数量：<input id="use_supplies_number" style="width:130px;" clear="clear" must="must" placeholder="必填"
				onkeyup="this.value=this.value.replace(/\D/g,'')" 
				onafterpaste="this.value=this.value.replace(/\D/g,'')">
		</div>
		<div class="clearfix">
			<div style="margin:10px 0 5px 5px;float:left;">使用原因：</div>
			<div style="margin:10px 0 5px 0;float:left;">
				<textarea id="use_supplies_reason" style="width:400px;height:50px;" 
					clear="clear" must="must" placeholder="必填"></textarea>
			</div>
		</div>
		<center style="margin:10px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUseSupplies()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#useSuppliesDlg').dialog('close')">关闭</a>
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
						<td><span id="readDownFollowname"></span></td>
						<td>跟进类型：</td>
						<td><span id="readDownFollowtype"></span></td>
					</tr>
					<tr>
						<td>跟进内容：</td>
						<td colspan="3" style="text-align:left"><span id="readDownFollowtext"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<!-- 耗材使用地址列表  -->
	<div id="choseHouseDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input type="hidden" id="choseHouseType">
		<div style="margin:5px 0 0 5px;color:black;font-size:13px;float:left;">
			选择列表：<select id="searchBelongType" onchange="relationDataGrid()" style="width:100px">
				<option value="1">房源列表</option>
				<option value="2">项目列表</option>
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
						<option value="0"></option>
						<option value="1">内部项目</option>
						<option value="2">外部项目</option>
						<option value="3">非成本项目</option>
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
	<!-- 耗材添加项目列表  -->
	<div id="choseProjectDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 10px 0;">
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				项目分类：<select style="width:100px;" id="searchProjectType" onchange="choseProjectData(1)">
					<option value="0"></option>
					<option value="1">内部项目</option>
					<option value="2">外部项目</option>
					<option value="3">非成本项目</option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				项目名称：<input id="searchProjectName" onkeyup="searchOnkeyup(this.id, 'choseProjectData(1)')" style="width:100px;">
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				项目联系人：<input id="searchProjectContact" onkeyup="searchOnkeyup(this.id, 'choseProjectData(1)')" style="width:100px;">
			</div>
		</div>
		<div style="width:100%;height:95%;">
			<table id="choseProjectTable"></table>
			<div id="choseProjectPageDiv" style="text-align:center;"></div>
		</div>
	</div>
	<!-- 耗材详情 -->
	<div id="suppliesInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div id="suppliesInfoTabs" class="easyui-tabs">
			<div title="详细信息" tabindex="0" style="padding:6px;">
				<input type="hidden" id='suppliesInfo_index'>
				<fieldset>
					<legend>耗材归属</legend>
					<div style="margin:0 0 5px 5px;">
						耗材归属：<input id="query_supplies_choseHouse" readonly="readonly" style="width:520px" clear="clear"> 
					</div>
				</fieldset>
				<fieldset>
					<legend>耗材信息</legend>
					<div style="margin:0 0 5px 5px;float:left;">
						耗材类型：<input id="query_supplies_type" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;名称：<input id="query_supplies_name" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;品牌：<input id="query_supplies_brand" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;型号：<input id="query_supplies_model" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;价格：<input id="query_supplies_price" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:3px 0 5px 5px;float:left;">
						&emsp;&emsp;数量：<input id="query_supplies_number" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
					<div style="margin:0 0 5px 0;float:left;">
						<textarea id="query_supplies_remark" readonly="readonly" style="width:325px;height:50px;" clear="clear"></textarea>
					</div>
				</fieldset>
				<center style="margin:20px 0 0 0;">
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)">上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)">下一条</a>
				</center>
			</div>
			<div title="图片信息" tabindex="1">		
				<div style="padding:5px 0 0 10px;">
					<a class="easyui-linkbutton" iconCls="icon-diannao" 	  plain="true" onclick="upload_supplies_img()">上传</a>
					<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="remove_supplies_img()">选择删除</a>
					<a class="easyui-linkbutton" iconCls="icon-shuaxin" 		  plain="true" onclick="refresh_supplies_img()">刷新</a>
					<span id="_supplies_imgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
				</div>
				<div id="_supplies_title" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
				<div style="clear:both"></div>
				<left>
					<div id="_supplies_btn" style="margin:10px 0 0 10px;display:none;">
						<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemove_supplies_img()">删除</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel_supplies_img()">取消</a>
					</div>
				</left>
				<div id="_supplies_imgWrapper" style="margin:10px 0 0 10px;"></div>
				
			</div>
		</div>
	</div>
	<!-- 增减耗材数量 -->
    <div id="purchaseSuppliesDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
        <div class="clearfix">
	        <div style="margin:5px 0 5px 5px;float:left;">
	                                现有数量：<input id="current_supplies_number" disabled="disabled" style="width:130px" clear="clear">
	        </div>
	        <div style="margin:5px 0 5px 5px;float:left;">
	                                增减数量：<input id="purchase_supplies_number" data-type="number" style="width:130px;" clear="clear" must="must" placeholder="可正可负">
	        </div>
        </div>
        <div class="clearfix">
            <div style="margin:10px 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
            <div style="margin:10px 0 5px 0;float:left;">
                <textarea id="purchase_supplies_remark" style="width:324px;height:50px;" 
                    clear="clear" placeholder="可选"></textarea>
            </div>
        </div>
        <center style="margin:15px 0 5px 5px;">
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doPurchaseSupplies()">保存</a> 
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#purchaseSuppliesDlg').dialog('close')">关闭</a>
        </center>
    </div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/upload.js"></script>
</body>
</html>