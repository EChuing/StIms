<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>教室管理</title>
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
	<script src="js/school_classroom.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="margin:5px 0 0 0; float:left;">
			<a class="easyui-linkbutton" iconCls="icon-add-house"
			plain="true" id="addVirtualButton" onclick="addVirtual()">添加教室</a>
		</div>
		<div style="margin:5px 0 0 0; float:left;">
			<a class="easyui-linkbutton" iconCls="icon-house-edit"
			plain="true" id="updateVirtualButton" onclick="updateVirtual()">修改教室</a>
		</div>
		<div style="margin:5px 0 0 5px; float:left;">
			<a class="easyui-linkbutton" iconCls="icon-zukeyixiangrenguanli"
			   plain="true" id="associatedPersonnelButton" onclick="officeAssociatedUsers(1)">教师授权</a>
		</div>
		<div style="margin:5px 0 0 5px; float:left;">
			<a class="easyui-linkbutton" iconCls="icon-add"
			   plain="true" id="addScenarioButton" onclick="openSceneWindow(1)">添加情景</a>
		</div>
		<%--<div style="margin:5px 0 0 0; float:left;">
			<a class="easyui-linkbutton" iconCls="icon-add-house"
			plain="true" id="OfficeAssociateHrButton" onclick="officeAssociateHr()">关联房间</a>
		</div>--%>
		<div style="clear:both"></div>
		<div style="margin:5px 0 5px 5px; float:left; color:black;">
			<label for="searchVirtualName">教室名称</label>
			<input style="width:100px;" id="searchVirtualName" onkeyup="searchOnkeyup(this.id, 'queryOffice(1, 0)')">
		</div>
		<div style="margin:5px 0 5px 5px; float:left; color:black;">
			<label for="searchVirtualDoorplateno">备注描述</label>
			<input style="width:100px;" id="searchVirtualDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryOffice(1, 0)')">
		</div>
		<div style="margin:5px 0 5px 5px; float:left; color:black;">
			<label for="searchVirtualContact">联系人</label>
			<input style="width:100px;" id="searchVirtualContact" onkeyup="searchOnkeyup(this.id, 'queryOffice(1, 0)')">
		</div>
		<div style="margin:5px 0 5px 5px; float:left; color:black;">
			<label for="searchVirtualState">教室状态</label>
			<select style="width:104px;" id="searchVirtualState" onchange="queryOffice(1,0)" >
				<option value=""></option>
				<option value="正常" selected>正常</option>
<%--				<option value="停用">停用</option>--%>
				<option value="注销">注销</option>
			</select>
		</div>
		<div style="clear:both"></div>
	</div>
	
	<!-- 办公区列表 -->
	<div style="width:100%;">
		<table id="virtualDataGrid" style="width:100%; height:527px; table-layout:fixed; overflow:hidden;"
			data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="keyAdministrator" width="15" align="center">教室名称</th>
					<th field="addDoorplateno" width="15" align="center">备注描述</th>
					<th field="keyNumber" width="10" align="center">联系人</th>
					<th field="houseEntrust4rent" width="10" align="center">联系电话</th>
					<th field="houseEntrust4sell" width="10" align="center">状态</th>
				</tr>
			</thead>
		</table>
		<div id="virtualPageDiv" style="text-align:center;"></div>
	</div>
	<!-- 办公区详细信息窗口 -->
	<div id="internalOperationOfStoreroom" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div id="operationWindow" class="easyui-tabs">
			<div title="教室详细" tabindex="0">
				<center>
					<table class="xwtable1" style="width:100%;margin-top:10px;">
						<tbody>
							<tr>
								<td>教室名称：</td>
								<td ><span id="readOnlyVirtualkeyAdministrator"></span></td>
								<td>分类：</td>
								<td><span id="readOnlyVirtualaddCity"></span></td>
								<td>状态：</td>
								<td ><span id="readOnlyVirtualhouseEntrust4sell"></span></td>
							</tr>
							<tr>
								<td>联系人：</td>
								<td><span id="readOnlyVirtualkeyNumber"></span></td>
								<td>联系人电话：</td>
								<td><span id="readOnlyVirtualhouseEntrust4rent"></span></td>
								<td>教室创建人：</td>
								<td><span id="readOnlyVirtualuserName"></span></td>
							</tr>
							<tr>
								<td>备注：</td>
								<td colspan="5"><span id="readOnlyVirtualaddDoorplateno"></span></td>
							</tr>
						</tbody>
					</table>
				</center>
			</div>
			<!-- 智能设备 -->
			<div title="智能设备" id="detailDeviceInfo" tabindex="6" style="padding:5px 0 0 12px;">
				<div class="clearfix">
<%--					<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="bindDevice_office()">绑定设备</a>--%>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="deviceControl" onclick="chooseOperateDlg()">操作设备</a>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="deviceInfoTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="brandName" width="20" align="center" hidden="hidden">设备品牌</th>
								<th field="brandType" width="10" align="center">设备类型</th>
								<th field="brandModel" width="20" align="center">设备型号</th>
								<th field="devNickname" width="30" align="center">设备名称</th>
								<th field="devState" width="30" align="center" >在线状态</th>
								<th field="devStatus" width="30" align="center" >设备状态</th>
							</tr>
						</thead>
					</table>
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
				地址/库房名：<input readonly='readonly' id="repairAddress" style="width:295px"> 
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
						<td colspan="3" style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue" id="readShowProgressproRemark"></span></td>
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
			<!-- <div class="errMsg" style="box-sizing:border-box;height:20px;color:red;"></div> -->
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
				<table id="followTable"></table>
				<center style="margin:10px 0 0 0;">
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)">上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)">下一条</a>
				</center>
			</div>
			<div title="图片信息" tabindex="1">		
				<div style="padding:5px 0 0 10px;">
					<a class="easyui-linkbutton" iconCls="icon-upload" 	  plain="true" onclick="upload_supplies_img()">上传</a>
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
	<!-- 耗材跟进详情 -->
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
	
	<!-- 录入/修改办公区 -->
	<div id="addVirtualDlg" class="easyui-dialog" style="padding:6px;" data-options="closed:true">
		<fieldset>
			<legend>
				<span style="font-size:12px; font-family:'Microsoft YaHei'; color:#50B4D2;">教室信息</span>
			</legend>
			<div style="margin:5px 0 0 26px; float:left; color:black;" id="virtualTypeDiv">
				<label for="virtualState">状态</label>
				<select style="width:300px;" id="virtualState">
					<option value=""></option>
					<option value="正常">正常</option>
<%--					<option value="停用">停用</option>--%>
					<option value="注销">注销</option>
				</select>
		    </div>
		    <div style="clear:both"></div>
			<div style="margin:5px 0 0 14px; float:left;display:none;">
				<label for="virtualType">&emsp;分类</label>
				<input style="width:300px;" id="virtualType" value="公区" readonly="readonly"></input>
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
			<!-- <div style="margin:5px 0 0 2px; float:left;">
				<label for="initialAmount">初期金额</label>
				<input style="width:100px;" id="initialAmount" placeholder="必填"   >
			</div>
			<div style="margin:5px 0 0 6px; float:left;">
				<label for="calibrationAmount">校准金额</label>
				<input style="width:100px;" id="calibrationAmount" placeholder="必填"   >
			</div> -->
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
	
	<!-- *************************** 耗材处理界面 ********************************** -->
	<!-- 添加耗材 -->
	<div id="addSuppliesDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 5px 5px;color:red;font-size:13px;">
			温馨提示：若系统中该公区已存在该耗材，请直接修改耗材数量，无须重复添加。
		</div>
		<fieldset>
			<legend>耗材归属</legend>
			<div style="margin:0 0 5px 5px;">
				耗材归属：<input id="supplies_choseHouse" readonly="readonly" style="width:170px;" clear="clear"> 
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
			迁出公区：<input id="move_from_supplies_choseHouse" disabled="disabled"
				style="width:400px" clear="clear"> 
		</div>
		<div style="margin:10px 0 5px 5px;">
			迁入公区：<input id="move_to_supplies_choseHouse" readonly="readonly" onclick="choseProject(1)" 
				style="width:400px" placeholder="单击选择公区，必选" clear="clear" must="must">
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
	
	<!-- 耗材迁移公区列表  -->
	<div id="choseProjectDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 10px 0;">
			<!-- <div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				公区分类：<input style="width:100px;" id="searchProjectType" onchange="choseProjectData(1)">
			</div> -->
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				公区名称：<input id="searchProjectName" onkeyup="queryOnkeyup1(this.id,5,2)" style="width:100px;">
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				公区联系人：<input id="searchProjectContact" onkeyup="queryOnkeyup1(this.id,5,2)" style="width:100px;">
			</div>
		</div>
		<div style="width:100%;height:95%;">
			<table id="choseProjectTable"></table>
			<div id="choseProjectPageDiv" style="text-align:center;"></div>
		</div>
	</div>
	<!-- 使用耗材 -->
	<div id="useSuppliesDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:10px 0 5px 5px;">
			使用地址：<input id="use_supplies_choseHouse" readonly="readonly" onclick="choseHouse(0,1)" 
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
	
	<!-- 耗材使用地址列表  -->
	<div id="choseHouseDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input type="hidden" id="choseHouseType">
		<div style="margin:5px 0 0 5px;color:black;font-size:13px;float:left;">
			选择列表：<select id="searchBelongType" onchange="relationDataGrid(1)" style="width:100px">
				<option value="1">房源列表</option>
				<option value="2">公区列表</option>
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
					楼盘名称：<input id="searchAddCommunity" onkeyup="queryOnkeyup1(this.id,5,1)" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuilding" onkeyup="queryOnkeyup1(this.id,5,1)" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplateno" onkeyup="queryOnkeyup1(this.id,3,1)" style="width:100px;">
				</div>
			</div>
		</div>
		<div id="virtualRelationSelect" style="display:none;">
			<div style="margin:0 0 10px 0;">
				<!-- <div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目分类：<select id="searchVirtualType2" onchange="choseHouseData(1)" style="width:100px;">
						<option value="0"></option>
						<option value="1">内部项目</option>
						<option value="2">外部项目</option>
						<option value="3">非成本项目</option>
					</select>
				</div> -->
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					公区名称：<input id="searchVirtualName2" onkeyup="queryOnkeyup1(this.id,5,1)" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					公区联系人：<input id="searchVirtualContact2" onkeyup="queryOnkeyup1(this.id,5,1)" style="width:100px;">
				</div>
			</div>
		</div>
		<div style="width:100%;height:89%">
			<!-- 选择未租列表 -->
			<div id="choseTrusteeship" style="width:100%;height:100%;display:none;">
				<table id="choseTrusteeshipTable"></table>
				<div id="choseTrusteeshipPageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<!-- 选择公区列表 -->
			<div id="choseVirtualHouse" style="width:100%;height:100%;display:none;">
				<table id="choseVirtualHouseTable"></table>
				<div id="choseVirtualHousePageDiv" style="width:99%;text-align:center;"></div>
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
	
	<!-- ********************** 资产处理界面  **********************************-->
	<!-- 添加资产 -->
	<div id="addAssetDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">		
		<fieldset>
			<legend>资产归属</legend>
			<div style="margin:0 0 5px 5px;">
				资产归属：<input id="assets_choseHouse" readonly="readonly" style="width:520px" clear="clear" must="must"> 
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
	<!-- 迁移资产 -->
	<div id="moveAssetDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 5px 5px;">
			迁出公区地址：<input id="move_from_asset_choseHouse" disabled="disabled"
				style="width:400px" clear="clear"> 
		</div>
		<div style="margin:10px 0 5px 5px;">
			迁入公区地址：<input id="move_to_asset_choseHouse" readonly="readonly" onclick="choseHouse(1,2)" 
				style="width:400px" placeholder="单击选择公区，必选" clear="clear" must="must">
			<input type="hidden" id="move_to_asset_houseStoreCoding" clear="clear">
			<input type="hidden" id="move_to_asset_houseCoding" clear="clear">
		</div>
		<div style="margin:10px 0 5px 48px;">
			&emsp;经手人：<input id="addAssistanceStaffShowUserInfo" style="width:200px;cursor: pointer;" 
			readonly="readonly" class="choose_user_button" doFlag="addAssistanceStaff" doFun="" value="">
				<input id="addAssistanceStaffGetUserStoreId" type="hidden">
				<input id="addAssistanceStaffGetUserDetId" type="hidden">
				<input id="addAssistanceStaffGetUserId" type="hidden">
				<div id="addAssistanceStaffShowUserInfoDiv" style="display:none;"></div>
		</div>
		<!-- <div style="margin:10px 0 5px 46px;">
			经手人：<select class="select-dept" id="move_to_asset_dept" style="width:90px" choose="choose" must="must"
				onchange="deptStaffChose('move_to_asset_dept','move_to_asset_staff',0)">
				<option></option>
			</select> <select id="move_to_asset_staff" style="width:90px" choose="choose" must="must">
				<option></option>
			</select>
		</div> -->
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
				<table id="followTable1"></table>
				<center style="margin:20px 0 0 0;">
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext1(0)">上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext1(1)">下一条</a>
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
	
	<!-- 供应商归属关联列表显示  -->
	<div id="choseSupplierDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 10px 0;">
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				供应商名称：<input id="searchSupplierName" onkeyup="queryOnkeyup(this.id,5,2)" style="width:100px;">
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				联系人：<input id="searchSupplierVirtualContact" onkeyup="queryOnkeyup(this.id,5,2)" style="width:100px;">
			</div>
		</div>
		<div id="choseSupplier" style="width:100%;height:95%;">
			<table id="choseSupplierTable"></table>
			<div id="choseSupplierPageDiv" style="width:99%;text-align:center;"></div>
		</div>
	</div>
	<!-- 资产跟进详情 -->
	<div id="downFollowInfo1" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>跟进时间：</td>
						<td colspan="3"><span id="readDownFollowtime1"></span></td>
					</tr>
					<tr>
						<td>跟进人：</td>
						<td><span id="readDownFollowregistrantName1"></span></td>
						<td>经手人：</td>
						<td><span id="readDownFollowagentName1"></span></td>
					</tr>
					<tr>
						<td>跟进内容：</td>
						<td colspan="3" style="text-align:left"><span id="readDownFollowtext1"></span></td>
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
			<table class="xwtable3" style="margin-top:10px;">
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
	<!-- 关联人员 -->
	<div id="officeAssociatedUsersDig"style="width:100%;padding:6px" class="easyui-dialog" data-options="closed:true">
		<input id="relationIndex" hidden="hidden">
		<div class="search1">
			<div style="margin:5px 0 5px 5px;float:left;">
				安装地址：<input id="installationAddress" onkeyup="queryUserlated(1)" style="width:120px">
			</input>
			</div>
			<div style="margin:5px 0 5px 5px;float:left;">
				部门名称：<input id="departmentName" onkeyup="queryUserlated(1)" style="width:120px">
			</input>
			</div>
			<div style="margin:5px 0 5px 10px;float:left;">
				姓名：<input id="userName" onkeyup="queryUserlated(1)" style="width:120px">
			</input>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div style="padding:5px 0 0 5px;width:22%;float: left;display: none">
			<table id="edDeviceDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
			</table>
		</div>
		<div style="padding:2px 0 0 0;">
			<div style="margin-top:2px;padding:5px 0 0 5px;width:22%;float: left;">
				<table id="unRelatedDeviceDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
					<thead>
					<tr>
						<th data-options="field:'ck',checkbox:true"></th>
						<%--<th field="id" width="0" align="center" hidden="true">id</th>--%>
						<th field="hsAddCommunity" width="50" align="center">安装地址</th>
						<th field="devNickname" width="49" align="center">设备名称</th>
					</tr>
					</thead>
				</table>
			</div>

			<div style="margin:165px 5px 5px 5px;float: left;">
				<a class="easyui-linkbutton"  iconCls="icon-add" plain="true" onclick="updateDeviceRelation(0)">添加</a>
				<br>
				<a class="easyui-linkbutton"  iconCls="icon-remove" plain="true" onclick="updateDeviceRelation(1)">移除</a>
			</div>
			<div style="margin-top:2px;padding:5px 0 0 5px;width:22%;float: left;">
				<table id="existingRelationDeviceDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
					<thead>
					<tr>
						<th data-options="field:'ck',checkbox:true"></th>
						<th field="id" width="0" align="center" hidden="true">id</th>
						<th field="hsAddCommunity" width="49" align="center">安装地址</th>
						<th field="devNickname" width="50" align="center">设备名称</th>
					</tr>
					</thead>
				</table>
			</div>
		</div>
		<div style="padding:2px 0 0 0;">
			<div style="padding:5px 0 0 5px;width:18%;float: left;">
				<table id="unRelatedRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
					<thead>
					<tr>
						<th data-options="field:'ck',checkbox:true"></th>
						<th field="userId" width="2" align="center" hidden="true">userId</th>
						<th field="departmentName" width="19" align="center">部门</th>
						<th field="suStaffName" width="24" align="center">姓名</th>
					</tr>
					</thead>
				</table>
			</div>
			<div style="margin:165px 5px 5px 5px;float: left;">
				<a class="easyui-linkbutton"  iconCls="icon-add" plain="true" onclick="updateHsRelation(0)">添加</a>
				<br>
				<a class="easyui-linkbutton"  iconCls="icon-remove" plain="true" onclick="updateHsRelation(1)">移除</a>
			</div>
			<div style="padding:5px 0 0 5px;width:18%;float: left;">
				<table id="existingRelationRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
					<thead>
					<tr>
						<th data-options="field:'ck',checkbox:true"></th>
						<th field="userId" width="2" align="center" hidden="true">userId</th>
						<th field="departmentName" width="19" align="center">部门</th>
						<th field="suStaffName" width="24" align="center">姓名</th>
					</tr>
					</thead>
				</table>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="updateRelations()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#officeAssociatedUsersDig').dialog('close')">取消</a>
		</div>
	</div>

	<!--情景设置窗口开始-->
	<div id="addScenWindowDlg" style="padding:6px;overflow-y: hidden" class="easyui-dialog" data-options="closed:true">
		<div class="process-bar" style="padding: 0 10px">
			<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.房源信息</span>
			<span class="process arrow-in arrow-out step2" data-step="2"><span class="process-require">*</span>2.情景设置</span>
		</div>

		<!--情景设置窗口第一页-->
		<div class="addScenWindowSteps">
			<div class="step addScenWindowStep1" >
				<hr color=#95b8e7 size=1 style="margin:10px 3px 10px 3px">
				<div style="margin:5px 0 10px 0;color:black;font-size:13px;float:left;">
					情景归属地址 : <input id="devAddress" onkeyup="searchOnkeyup(this.id, 'queryRoom(1)')" style="width:174px;">
				</div>
				<div style="margin:5px 0 0 10px;float:left">
					状态 : <select id="leaseType" onchange="queryRoom(1)">
					<option value="">全部</option>
					<option value="正常">正常</option>
					<option value="注销">注销</option>
				</select>
				</div>


				<table id="choseRoomsTable" style="width:100%;height:402px;table-layout:fixed;overflow-y: hidden"class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
					<thead>
					<tr>
						<th data-options="field:'ck',checkbox:true"></th>
						<th field="address" width="50" align="center">情景归属地址</th>
						<th field="hsLeaseType" width="25" align="center">状态</th>
					</tr>
					</thead>
				</table>
				<div id="choseRoomsTablePageDiv" style="width:99%;text-align:center;"></div>

				<div class="btn-bar" style="position: absolute;left: 46%;top:93%; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="nextStep();">下一步</a>
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="$('#addScenWindowDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>

		<!--情景设置窗口第二页-->
		<div class="addScenWindowSteps">
			<div class="step addScenWindowStep2" >
				<div style="padding:10px 0 0 5px;width:100%;float:left">
					<div style="margin:3px 0 10px 0;color:black;font-size:13px;float:left">
						情景类型：<select  style="width:100px;" id="selectSituationalType1"></select>
					</div>
					<div style="margin:0px 0 10px 0; float:left;">
						<a class="easyui-linkbutton" iconCls="icon-deviceManagement"
						   plain="true" id="fullyOpenEquipment" onclick="equipmentSwitch(1)">设备全开</a>
					</div>
					<div style="margin:0px 0 10px 0; float:left;">
						<a class="easyui-linkbutton" iconCls="icon-deviceManagement"
						   plain="true" id="equipmentClearance" onclick="equipmentSwitch(0)">设备全关</a>
					</div>
					<div style="clear:both"></div>
					<div style="margin-top:10px">
						<table id="choseDeviceTable" style="width:98%;height:400px;table-layout:fixed;overflow:hidden;"></table>
					</div>
					<div style="clear:both;"></div>
					<div style="margin:20px 0 0 0;text-align: center;">
						<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addScenWindow', 1);">上一步</a>
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="addScene()">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addScenWindowDlg').dialog('close')">取消</a>
					</div>
				</div>
			</div>
		</div>
		<!--情景设置窗口结束-->
	</div>

	<!-- 设备管理窗口 -->
	<div id="deviceManagementDlg" class="easyui-dialog" data-options="closed:true">
		<iframe id="deviceManagement" src="" style="width:100%;height:99%;boder:0px;"frameborder="0" scrolling="auto">
		</iframe>
	</div>
	<jsp:include page="/ui/fg_offciceAssociateHr.jsp"></jsp:include>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
	<jsp:include page="/ui/device_office.jsp"></jsp:include>
	<script src="js/PublicEmpowerForTeacher.js"></script>
	<script src="js/publicAddingScenarios.js"></script>
	<script src="js/device_office.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>