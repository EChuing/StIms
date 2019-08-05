<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>商家管理</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg_projectSupplier.js"></script>
	<style rel="stylesheet">
		.choose{
			height: 20px;
			line-height: 17px;
			vertical-align: 2px;
			font-size: 12px;
			font-weight: 400;
			font-family: \5b8b\4f53;
			border:1px solid #ccc;
			background-color: #ccc;
			color: #333;
			padding: 0 10px;
			display: inline-block;
			background: url(images/button.png) 0 -300px repeat-x;
			cursor: pointer;
			outline: 0;
			overflow: visible;
			border-radius: 2px;
			-webkit-tap-highlight-color: rgba(0,0,0,.3);
		}
		.choose-cur{
			background-position: 0 0;
			border-color:#95b8e7;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="margin:5px 0 0 0; float:left;">
			<a class="easyui-linkbutton" iconCls="icon-add-house"
			plain="true" id="addVirtualButton" onclick="addVirtual()">添加商家</a>
		</div>
		<div style="margin:5px 0 0 0; float:left;">
			<a class="easyui-linkbutton" iconCls="icon-house-edit"
			plain="true" id="updateVirtualButton" onclick="updateVirtual()">修改商家</a>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:5px 0 5px 5px; float:left; color:black;">
			<label for="searchVirtualName">商家名称</label>
			<input style="width:100px;" id="searchVirtualName" onkeyup="searchOnkeyup(this.id, 'queryVirtual(1, 0)')">
		</div>
		<div style="margin:5px 0 5px 5px; float:left; color:black;">
			<label for="searchVirtualDoorplateno">备注描述</label>
			<input style="width:100px;" id="searchVirtualDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryVirtual(1, 0)')">
		</div>
		<div style="margin:5px 0 5px 5px; float:left; color:black;">
			<label for="searchVirtualContact">联系人</label>
			<input style="width:100px;" id="searchVirtualContact" onkeyup="searchOnkeyup(this.id, 'queryVirtual(1, 0)')">
		</div>
		<div style="margin:5px 0 5px 5px; float:left; color:black;">
			<label for="searchVirtualState">商家状态</label>
			<select style="width:104px;" id="searchVirtualState" onchange="queryVirtual(1,0)" >
				<option value=""></option>
				<option value="正常" selected>正常</option>
				<option value="停用">停用</option>
				<option value="注销">注销</option>
			</select>
		</div>
		<div style="clear:both"></div>
	</div>
	<!-- 商家列表 -->
	<div style="width:100%;">
		<table id="virtualDataGrid" style="width:100%; height:277px; table-layout:fixed; overflow:hidden;"
			data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="keyAdministrator" width="15" align="center">商家名称</th>
					<th field="addDoorplateno" width="15" align="center">备注描述</th>
					<th field="keyNumber" width="10" align="center">联系人</th>
					<th field="houseEntrust4rent" width="10" align="center">联系电话</th>
					<th field="houseEntrust4sell" width="10" align="center">状态</th>
				</tr>
			</thead>
		</table>
		<div id="virtualPageDiv" style="text-align:center;"></div>
		<table id="followTable" style="height:277px;"></table>
		<div id="followPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
	<!-- 录入/修改 商家 -->
	<div id="addVirtualDlg" class="easyui-dialog" style="padding:6px;" data-options="closed:true">
		<fieldset>
			<legend>
				<span style="font-size:12px; font-family:'Microsoft YaHei'; color:#50B4D2;">商家信息</span>
			</legend>
			<div style="margin:5px 0 0 2px; float:left; color:black;" id="virtualTypeDiv">
				<label for="virtualState">商家状态</label>
				<select style="width:300px;" id="virtualState">
					<option value=""></option>
					<option value="正常">正常</option>
					<option value="停用">停用</option>
					<option value="注销">注销</option>
				</select>
		    </div>
		    <div style="clear:both"></div>
			<div style="margin:5px 0 0 14px; float:left;display:none;">
				<label for="virtualType">&emsp;分类</label>
				<input style="width:300px;" id="virtualType" value="供应商" readonly='readonly'></input>
			</div>
			<div style="margin:5px 0 0 26px; float:left;">
				<label for="virtualName">名称</label>
				<input style="width:300px;" id="virtualName" placeholder="必填" require="require">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 14px; float:left;">
				<label for="virtualContact">联系人</label>
				<input style="width:300px;" id="virtualContact">
			</div>
			<div style="margin:5px 0 0 26px; float:left;">
				<label for="virtualTel">电话</label>
				<input style="width:300px;" id="virtualTel">
			</div>
			<!-- 隐藏的信息 -->
			<div style="display:none;">
				盘源ID<input id="houseCoding">
				市<input id="virtualCity">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 3px; float:left;">
				<label for="virtualDoorplateno">备注描述</label>
			</div>
			<div style="margin:5px 0 0 3px; float:left;">
				<textarea style="width:300px;height:60px" id="virtualDoorplateno"></textarea>
			</div>
		</fieldset>
		<div style="padding:5px 0; text-align:center;">
			<input id="error" style="width:100%; border:0; color:red; text-align:center; font-size:14px;" readonly>
		</div>
		<div id="saveAdd" style="text-align:center;">
			<a id="saveAddVirtual" class="easyui-linkbutton" iconCls="icon-save" onclick="if(validateRequire('addVirtualDlg')){validate(0)}">保存</a>
			<a id="cancelAddVirtual" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#addVirtualDlg').dialog('close')">取消</a>
		</div>
		<div id="saveUpdate" style="text-align:center;">
			<a id="saveUpdateVirtual" class="easyui-linkbutton" iconCls="icon-save" onclick="if(validateRequire('addVirtualDlg')){validate(1)}">保存</a>
			<a id="cancelUpdateVirtual" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#addVirtualDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 双击选项卡div -->
	<div id="readonlyVirtualDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div id="readonlyTabs" class="easyui-tabs">
			<div title="商家详细" tabindex="0">
				<center>
					<table class="xwtable1" style="width:100%;margin-top:10px;">
						<tbody>
							<tr>
								<td>状态：</td>
								<td ><span id="readOnlyVirtualhouseEntrust4sell"></span></td>
								<td>分类：</td>
								<td><span id="readOnlyVirtualaddCity"></span></td>
								<td>商家名称：</td>
								<td ><span id="readOnlyVirtualkeyAdministrator"></span></td>
							</tr>
							<tr>
								<td>联系人：</td>
								<td><span id="readOnlyVirtualkeyNumber"></span></td>
								<td>联系人电话：</td>
								<td><span id="readOnlyVirtualhouseEntrust4rent"></span></td>
								<td>商家创建人：</td>
								<td><span id="readOnlyVirtualuserName"></span></td>
							</tr>
							<tr>
								<td>备注：</td>
								<td colspan="5"><span
									id="readOnlyVirtualaddDoorplateno"></span></td>
							</tr>
						</tbody>
					</table>
				</center>
			</div>
			<div title="审批记录" id="detailEventInfo" tabindex="10" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" id="addEventButton" onclick="addEvent()">添加审批</a>
					<a class="easyui-linkbutton" iconCls="icon-fujian" plain="true" onclick="showAttachmentHandle()">查看附件</a>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="eventInfoTable" style="width:98%;"></table>
					<div id="eventInfoPageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="任务记录" id="detailTaskInfo" tabindex="12" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addTaskButton" onclick="addTask()">添加任务</a> 
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="taskInfoTable" style="width:98%;height:402px"></table>
					<div id="taskInfoPageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="商家收支" tabindex="3">
				<div style="margin:8px 0 5px 5px;height:20px;line-height:20px;color:black;float:left;">
					记账日期： 
					<button id="oneWeek" class="choose" data-cur="false" onclick="within1weeks()"> 1周内</button>&emsp;
					<button id="oneMonth" class="choose" data-cur="false" onclick="within1months()"> 1个月内</button>&emsp;
					<button id="threeMonths" class="choose" data-cur="false" onclick="within3months()"> 3个月内</button>&emsp;
				</div>
				<div style="margin:8px 0 5px 15px;color:black;font-size:13px;float:left;">
					记账日期 从：
					<input id="searchBillingDateFrom" style="width:80px" type="text"
						onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchBillingDateTo\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:query()})"> 到
					<input id="searchBillingDateTo" style="width:80px" type="text"
						onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchBillingDateFrom\',{d:1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:query()})">
				</div>
				<div style="clear:both"></div><!--收支管理列表-->
				<div id="DataGridFinancial" style="width:100%;">
					<table id="financialDg" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="jfAuditState" width="10" align="center">财务状态</th>
								<th field="jfClosedWay" width="10" align="center">账户类型</th>
								<th field="jfNatureOfThe" width="10" align="center">收支性质</th>
								<th field="jfAccountingSpecies" width="20" align="center">收支种类</th>
								<th field="jfSumMoney" width="10" align="center">收支金额</th>
								<th field="handlersName" width="10" align="center">经手人</th>
								<th field="jfCheckInTime" width="10" align="center">登记日期</th>
								<th field="cashierPeopleName" width="10" align="center">出纳</th>
								<th field="reviewerName" width="10" align="center">会计</th>
								<th field="reviewOneName" width="10" align="center">复核人</th>
								<th field="jfStrikeABalanceStatus" width="10" align="center">冲账状态</th>
							</tr>
						</thead>
					</table>
					<!-- 收支分页 -->
					<div id="financialPageDiv" style="width:97%;text-align:center;"></div>
				</div>
			</div>
	</div>
	</div>
	<!-- 添加任务窗口 -->
	<div id="addvirtualRepair" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div class="do_overDiv"></div>
		<fieldset>
			<legend>任务信息</legend>
			<input id="repairHouseStoreCoding" style="display:none" noos="noos">
			<input id="repairHouseCoding" style="display:none" noos="noos">
			<input id="repairHouseType" style="display:none" noos="noos">
			<div style='margin:5px 0 0 0px;float:left;display:none'>
				登记时间：<input id="repairReportingTime"  style="width:130px" readonly noos="noos">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 16px;float: left;'>
				负 责 人  : <input id="doTaskShowUserInfo" style="width:100px;cursor: pointer;" require="require"
				readonly="readonly" class="choose_user_button" doFlag="doTask" doFun="" value="">
				<input id="doTaskGetUserStoreId" type="hidden">
				<input id="doTaskGetUserDetId" type="hidden">
				<input id="doTaskGetUserId" type="hidden">
				<div id="doTaskShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				任务类型：<select id="repairTypeRp" style="width:100px;" noos="noos" require="require">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>
				客户姓名：<input id="repairName" style="width:100px" noos="noos" require="require">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				客户电话：<input id="repairPhone" style="width:100px" noos="noos" require="require">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 12px;float:left;position:relative;">
				期望时间：<select class="repair_hope_select" id="repairHopeSelect" style="width:270px;" require="require"
				 onChange="hopeTimeVal('repairHopeSelect', 'repairHopeTime')" choose="choose">
					<option></option>
				</select>
				<input id="repairHopeTime" style="margin-left:-273px; left:36px;width:250px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;" clear="clear" require="require">
			</div>
			<div style="clear:both"></div>
			<!-- <div style='margin:5px 0 0 12px;float: left;'>
				责任归属：<select id="repairResponsibility" style="width:100px;" noos="noos">
					<option></option>
				</select>
			</div> -->
			<div style='margin:5px 0 0 22px;float: left;display:none'>
				登记人：<input id="repairUserName" style="width:100px" readonly disabled noos="noos">
					 <input id="repairUserId" style="display:none" noos="noos">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>任务描述：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea id="repairEventRp" style="width:270px;height:60px" noos="noos" require="require"></textarea>
			</div>
			<div style='margin:5px 0 0 15px;float: left;'>
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件</a>
				<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
				<span style="vertical-align: middle;">短信提醒：</span>
				<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="sendTaskMessageRemind" checked=true>
			</div>
		</fieldset>
		<div style="margin:10px 0 0 0;text-align: center;">
			<div class="errMsg1" style="box-sizing:border-box;height:5px;color:red;"></div>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addvirtualRepair')){doAddvirtualRepair(0)}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addvirtualRepair').dialog('close')">取消</a>
		</div>
	</div>
	
	<!-- 任务详细信息窗口 -->
	<div id="repairInfoDlg" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 5px 10px;float: left;'>
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'repair2', 'taskInfoTable', 'repId', 'repImgPath', 'queryRepairById', 'deleteRepairPic')">上传及查看图片</a>
		</div>
		<div style="clear:both"></div>
			<div style='margin:0 0 0 10px;float: left;'>
				商家名称：<input readonly='readonly' id="repairAddress" style="width:295px">
				<input id="repairId" style="display:none">
				<input class="repair_index" style="display:none">
			</div>
			<div style='margin:0 0 0 34px;float: left;'>
				任务类型：<input readonly='readonly' id="repairType" style="width:68px">
				<input disabled='disabled' id="repairHouseType1" style="width:69px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>
				任务状态：<input readonly='readonly' id="repairState" style="width:100px">
			</div>
			<div style='margin:5px 0 0 47px;float: left;'>
				负责人：<input readonly='readonly' id="repairPeopleName" style="width:100px">
					<input id="repairPeopleId" style="display:none">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				领取时间：<input readonly='readonly' id="repairReceive" style="width:140px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>
				客户姓名：<input readonly='readonly' id="repairContacis" style="width:100px">
			</div>
			<div style='margin:5px 0 0 35px;float: left;'>
				客户电话：<input readonly='readonly' id="repairContacisPhone" style="width:100px">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				期望时间：<input readonly='readonly' id="repairHopeTime1" style="width:140px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>任务描述：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea readonly='readonly' id="repairEvent" style="width:295px;height:45px"></textarea>
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				登 记 人 ：<input readonly='readonly' id="repairUserName1" style="width:140px">
				<input id="repairUserId1" style="display:none">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				登记时间：<input readonly='readonly' id="repairTime" style="width:140px">
			</div>
			<div style="clear:both"></div>
		<div style='margin:20px 0 0 5px;width:99%;height:25%;'>
			<table id="showProgressTable"> </table>
		</div>
		<div style='margin:8px 0 0 0;text-align:center;'>
			<a  class="easyui-linkbutton" iconcls="icon-up" onclick="repairLaterOrNext(0)">上一条</a>
			<a  class="easyui-linkbutton" iconcls="icon-down" onclick="repairLaterOrNext(1)">下一条</a>
		</div>
	</div>
	<!-- 任务跟进详细显示窗口 -->
	<div id="showProgressDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>进展时间：</td>
						<td colspan="3"><span style="color:blue" id="readShowProgressproTime"></span></td>
					</tr>
					<tr>
						<td>处理人：</td>
						<td ><span style="color:blue" id="readShowProgressuserName"></span></td>
						<td>进展状态：</td>
						<td><span style="color:blue" id="readShowProgressproState"></span></td>
					</tr>
					<tr>
						<td>备注：</td>
						<td colspan="3" style="text-align:left"><span style="color:blue" id="readShowProgressproRemark"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<!-- 审批图片列表 -->
	<div id="attachmentDlgHandle" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="padding:5px 0 0 10px;">
			<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refreshHandle()">刷新</a> 
		</div>
		<div id="imgWrapperHandle" style="margin:10px 0 0 10px;"></div>
		<div style="clear:both"></div>
	</div>
	
	<!-- 审批详情 -->
	<div id="seeEventDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<input id="event_index" type="hidden">
		<input id="rentId" type="hidden" notes="notes"><!-- 已租id： -->
		<input id="storeId" type="hidden" notes="notes"><!-- 未租id： -->
		<input id="houseId" type="hidden" notes="notes"><!-- 盘源/项目id： -->
		<input id="addCity" type="hidden" notes="notes">
		<input id="addCommunity" type="hidden" notes="notes">
		<div class="clearfix">
			<div style='margin:5px 0 0 5px;float: left;'>
				归属地址：<span class="houseAddress" readonly style="width:200px;" clear="clear"></span>
			</div>
			<div style='margin:5px 20px 0 0;float: right;'>
				审批编号：<span id="eaApprovalNumber1" style="width:120px" clear="clear"></span>
			</div>
		</div>
		<table class="maintable eventInfo" style="margin:5px 2px 0 2px;width:620px;">
			<center>
				<tbody>
					<tr>
						<td>申请人</td>
						<td><span class="publisherName" clear="clear"></span></td>
						<td>申请时间</td>
						<td><span class="eaReleaseTime" clear="clear"></span> </td>
					</tr>
					<tr>
						<td>申请内容</td>
						<td colspan="3" style="text-align: left;"><span class="eaEventContent" clear="clear"></span></td>
					</tr>
					<tr>
						<td>涉及金额</td>
						<td colspan="3">￥ : <span class="eaAmountInvolved" clear="clear"></span>元（大写 :<span class="eaAmountInvolved2" clear="clear"></span>）</td>
					</tr>
					<tr class="shoukuanzhanghu">
						<td>收款账户</td>
						<td><span class="eaBankName" clear="clear"></span></td>
						<td><span class="eaBankUsername" clear="clear"></span></td>
						<td><span class="eaBankAccountNumber" clear="clear"></span></td>
					</tr>
				</tbody>
			</center>
		</table>
		<div class="clearfix" style='margin:2px 0 2px 0;'>
			<div style="float:right;">
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="true" onclick="showAttachmentHandle()">附件</a> 
				<span class="attachmentNumHandle" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
			</div>
		</div>
		<div style='box-sizing:border-box;padding:5px 2px 0 2px;width:100%;height:35%;'>
			<table id="showProcessTable"></table>
		</div>
		<table class="maintable payInfo" style="margin:5px 2px 0 2px;width:620px">
			<center>
				<tbody>
					<tr>
						<td>操作人</td>
						<td><span class="cashierPeopleName" clear="clear"></span></td>
						<td>付款金额</td>
						<td>￥ : <span class="jfSumMoney" clear="clear"></span>元</td>
						<td>财务流水号</td>
						<td><span class="jfFinancialCoding" clear="clear"></span></td>
					</tr>
					<tr>
						<td>付款时间</td>
						<td><span class="jfCheckInTime" clear="clear"></span></td>
						<td>付款账户</td>
						<td colspan="3">
							<span class="jfClosedWay" clear="clear"></span> - 
							<span class="faUserName" clear="clear"></span> - 
							<span class="faBelonging" clear="clear"></span> - 
							<span class="account" clear="clear"></span>
						</td>
					</tr>
				</tbody>
			</center>
		</table>
		<div id="seeEventSave" style="margin:15px 0 0 0;text-align:center;">
			<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext2(0)">上一条</a>
			<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext2(1)">下一条</a>
		</div>
	</div>
	<!-- 添加审批窗口 -->
	<div id="addEventDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>归属房源</legend>
			<div style='margin:5px 0 0 0;'>
				审批归属：<input class="houseAddress" style="width:524px" readonly>
				<input class="rentId" style="display:none;"><!-- 已租id： -->
				<input class="storeId" style="display:none;"><!-- 未租id： -->
				<input class="houseId" style="display:none;"><!-- 盘源/项目id： -->
				<input class="houseType" style="display:none;"><!-- 归属类型 -->
			</div>
		</fieldset>
		<fieldset>
			<legend>审批信息</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				事务类型：<select class="eventType" style="width:100px;" choose="choose" require="require">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				审批人：&emsp;<input id="doEventShowUserInfo" style="width:120px;cursor: pointer;" type="text" 
					readonly="readonly" clear="clear" require="require" class="choose_user_button" doFlag="doEvent" doFun="">
				<input id="doEventGetUserStoreId" type="hidden">
				<input id="doEventGetUserDetId" type="hidden">
				<input id="doEventGetUserId" type="hidden">
				<div id="doEventShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件</a>
				<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0px;float: left;'>
				审批编号：<input id="eaApprovalNumber" style="width:100px" readonly="readonly" clear="clear" require="require">
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				涉及金额：<input class="amountInvolved" type="number" style="width:120px" clear="clear"
					onKeyUp="moneyKeyupFomat(this);changeMoney();" >
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>短信提醒：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<input type="checkbox" id="shorMessageRemind1">
			</div>
			<div style='margin:5px 0 0 10px;float: left;color:red'>优先处理：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<input type="checkbox" id="ifSpeed">
			</div>
			<div style="clear:both"></div>
			<div id="payBankInfo">
				<div style='margin:5px 0 0 12px;float: left;'>
					开户名：<input id="eaBankUsername" style="width:100px" clear="clear">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					收款银行：<input id="eaBankName" style="width:120px" clear="clear">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					收款账号：<input id="eaBankAccountNumber" style="width:160px" clear="clear">
				</div>
				<div style="clear:both"></div>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>审批内容：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea class="eventDescribe" style="width:524px;height:80px" clear="clear" require="require"></textarea>
			</div>
		</fieldset>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addEventDlg')){doAddEvent()}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addEventDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 审批详情 -->
	<div id="handleInfo" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="maintable" style="margin-top:10px;">
				<tbody>
					<tr class="tr1">
						<td class="td1">审批时间：</td>
						<td class="td2"><span id="readHandle_time"></span></td>
						<td class="td3">审批人：</td>
						<td class="td4"><span id="readHandle_name"></span></td>
					</tr>
					<tr>
						<td>审批意见：</td>
						<td colspan="3" class="adviseTd"><span id="readHandle_advise"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	
	<div id="readonlyPaymentInfoTable" style="padding:6px;" class="easyui-dialog"
		data-options="closed:true,
					title : '收支详细',
					width:700,
					height:450,
					cache : false,
					modal : true">
		<center>
			<table class="maintable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>楼盘名称：</td>
						<td colspan="5"><span id="financialDgaddCommunity"></span>-<span id="financialDgaddBuilding"></span>-<span id="financialDgaddDoorplateno"></span></td>
					</tr>
					<tr>
						<td>财务状态：</td>
						<td><span id="financialDgjfAuditState"></span></td>
						<td>冲账状态：</td>
						<td><span id="financialDgjfStrikeABalanceStatus"></span></td>
						<td>经手人：</td>
						<td><span id="financialDghandlersName"></span></td>
					</tr>
					<tr>
						<td>归属类型：</td>
						<td><span id="financialDgjfTheOwnershipType"></span></td>
						<td>归属名称：</td>
						<td><span id="financialDgjfBelongingToTheName"></span></td>
						<td>记账日期：</td>
						<td><span id="financialDgjfBillingDate"></span></td>
					</tr>
					<tr>
						<td>账户类型：</td>
						<td colspan="2"><span id="financialDgjfClosedWay"></span></td>
						<td>账户名称：</td>
						<td colspan="2"><span id="financialDgfaUserName"></span></td>
					</tr>
					<tr>
						<td>账户号码：</td>
						<td colspan="2"><span id="financialDgfaAccount"></span></td>
						<td>账户归属：</td>
						<td colspan="2"><span id="financialDgfaBelonging"></span></td>
					</tr>
					<tr>
						<td>收支性质：</td>
						<td><span id="financialDgjfNatureOfThe"></span></td>
						<td>收支类别：</td>
						<td><span id="financialDgjfBigType"></span></td>
						<td>收支种类：</td>
						<td><span id="financialDgjfAccountingSpecies"></span></td>
					</tr>
					<tr>
						<td>收支金额：</td>
						<td><span id="financialDgjfSumMoney"></span></td>
						<td>归属周期：</td>
						<td colspan="3"><span id="financialDgjfStartCycle"></span> 到 <span id="financialDgjfEndCycle"></span></td>
					</tr>
					<tr>
						<td>票据编号：</td>
						<td><span id="financialDgjfTicketNumber"></span></td>
						<td>流水号：</td>
						<td><span id="financialDgjfFinancialCoding"></span></td>
						<td>凭证号：</td>
						<td><span id="financialDgjfCertificateNumber"></span></td>
					</tr>
					<tr>
						<td>收支原因：</td>
						<td colspan="5"><span id="financialDgjfFinanNote"></span></td>
					</tr>
					<tr>
						<td>操作记录：</td>
						<td colspan="5"><span id="financialDgjfOperationRecords"></span></td>
					</tr>
					<tr>
						<td>记账人：</td>
						<td><span id="financialDgcashierPeopleName"></span></td>
						<td>审核人：</td>
						<td><span id="financialDgreviewerName"></span></td>
						<td>复核人：</td>
						<td><span id="financialDgreviewOneName"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	
	<div id="downFollowInfo" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<center>
			<table class="maintable xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>跟进时间：</td>
						<td colspan="3"><span id="readDownFollowjhfFollowTime"></span></td>
					</tr>
					<tr>
						<td>跟进人：</td>
						<td><span id="readDownFollowjhfUserName"></span></td>
						<td>跟进类型：</td>
						<td><span id="readDownFollowjhfPaymentWay"></span></td>
					</tr>
					<tr>
						<td>跟进内容：</td>
						<td colspan="3" style="text-align:left"><span id="readDownFollowjhfFollowRemark"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
</body>
</html>