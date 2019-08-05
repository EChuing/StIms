<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>维保</title>
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
	<script	src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="js/config.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!-- 维保工具栏 -->
	<div>
		<div style="padding:3px 0 0 5px">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" id="addRepairButton" onclick="addRepair()">添加维保</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-follow-up" id="addProgressButton" onclick="addProgress(0)">添加进展</a> 
			<a class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="advancedScreening(1)" id="screening">高级筛选</a>
		</div>
		<div id="searchSaveHouse" style="padding:5px 0 0 5px" class="advancedScreening">
			<div class="advanced1">
				<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryRepair(1, 0)')"
						style="width:80px">
				</div>
				<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryRepair(1, 0)')"
						style="width:80px">
				</div>
				<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchDoorplateno"
						onkeyup="searchOnkeyup(this.id, 'queryRepair(1, 0)')" style="width:80px">
				</div>
				<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
					登记时间：<input id="searchStartTime" style="width:80px" class="Wdate"
						onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryRepair(1,0)})">到
					<input id="searchEndTime" style="width:80px" class="Wdate"
						onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryRepair(1,0)})">
				</div>
				<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
					维保状态：<select id="searchState" onchange="queryRepair(1,0)"
						style="width:100px">
						<option value="">全部</option>
						<option value="未完成">未完成</option>
						<option value="未领取">未领取</option>
						<option value="跟进中">跟进中</option>
						<option value="事件完成">事件完成</option>
						<option value="回访完成">回访完成</option>
					</select>
				</div>
			</div>
			<div class="advanced2">
				<div style="clear:both"></div>
				<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;" id="getUserQuery">
					负责人：<input id="searchFollowShowUserInfo" style="width:150px;cursor: pointer;" readonly="readonly"
						class="choose_user_button"  doFlag="searchFollow" doFun="queryRepair(1,0)" value="">
					<input id="searchFollowGetUserStoreId" type="hidden">
					<input id="searchFollowGetUserDetId" type="hidden">
					<input id="searchFollowGetUserId" type="hidden">
					<div id="searchFollowShowUserInfoDiv" style="display:none;"></div>
				</div>
				<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;" id="setUserQuery">
					登记人：<input id="searchRegistShowUserInfo" style="width:150px;cursor: pointer;" readonly="readonly" 
						class="choose_user_button"  doFlag="searchRegist" doFun="queryRepair(1,0)" value="">
					<input id="searchRegistGetUserStoreId" type="hidden">
					<input id="searchRegistGetUserDetId" type="hidden">
					<input id="searchRegistGetUserId" type="hidden">
					<div id="searchRegistShowUserInfoDiv" style="display:none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- 维保列表 -->
	<div id="DataGridRepair" style="width:100%;height:65%;">
		<table id="repairDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true,autoRowHeight:false,fitColumns:true,scrollbarSize:0">
			<thead>
				<tr>
					<th field="repState" width="10" align="center" formatter="formatState">维保状态</th>
					<th field="repTypeRp" width="10" align="center">维保类型</th>
					<th field="startNum" width="25" align="center">归属地址</th>
					<th field="repEventRp" width="30" align="center" formatter="formatEventRp">维保描述</th>
					<th field="repImgNum" width="10" align="center">图片数量</th>
					<th field="repResponsibility" width="10" align="center">费用归属</th>
					<th field="repContactsPhone" width="15" align="center">客户电话</th>
					<th field="repReportingTime" width="15" align="center" formatter="formatOperRepTime">登记时间</th>
					<th field="totalPage" width="15" align="center">维保耗时</th>
					<th field="repProgressRp" width="25" align="center" formatter="formatProgressRp">进展</th>
					<th field="repTollRp" width="10" align="center">收费</th>
					<th field="repFinancialIf" width="15" align="center">是否生成收支</th>
					<th field="repRepairman" width="10" align="center">负责人</th>
					<th field="repToReceive" width="15" align="center" formatter="formatReceive">领取</th>
					<th field="repReturningRp" width="10" align="center" formatter="formatReturningRp">回访结果</th>
				</tr>
			</thead>
		</table>
		<div id="repairPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 维保详细对话框 -->
	<div id="repairInfoDlg" class="easyui-dialog" style="padding:6px" data-options="closed:true">
		<div style="float:left;">
			<a class="easyui-linkbutton" plain="true" iconcls="icon-follow-up" id="doProgressButton" onclick="addProgress(1)">写进展</a>
			<a class="easyui-linkbutton" plain="true" iconcls="icon-huifang" id="doReturningButton" onclick="addReturningRp($('.repair_index').val(),1)">写回访</a>
			<a class="easyui-linkbutton" plain="true" iconcls="icon-panyuanguanli" onclick="skipToCheckHouse()">查看房源</a>
			<a class="easyui-linkbutton" plain="true" iconcls="icon-user-edit" id="updateRepairPeopleButton" onclick="updateRepairMan()">修改负责人</a>
			<a class="easyui-linkbutton" plain="true" iconcls="icon-edit-number" id="responsibilityAttribution" onclick="changeOfResponsibilityAttribution()">费用归属更改</a>
		</div>
		<div style="float:right;margin:4px 10px 0 10px;font-size:14px;">
			维保编号：<span id="repair_number" style="color:red;"></span>
		</div>
		<div style="clear:both;"></div>
		<fieldset>
			<legend>维保信息</legend>
			<div style='margin:5px 0 0 5px;float: left;'>
				归属地址：<input readonly='readonly' class="repair_address"
					style="width:295px"> <input class="repair_id"
					style="display:none"> <input class="repair_index"
					style="display:none">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				维保类型：<input readonly='readonly' class="repair_type"
					style="width:100px">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				维保分类：<input readonly='readonly' class="repair_houseType" 
					style="width:100px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>
				客户姓名：<input readonly='readonly' class="repair_contacis"
					style="width:100px">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				客户电话：<input readonly='readonly' class="repair_contacisPhone"
					style="width:130px">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				费用归属：<input readonly='readonly' id="repair_responsibility"
					style="width:100px">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				维保状态：<input readonly='readonly' class="repair_state"
					style="width:100px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>
				登记人：&emsp;<input readonly='readonly' class="repair_userName"
					style="width:100px"> <input class="repair_userId"
					style="display:none">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				登记时间：<input readonly='readonly' class="repair_time"
					style="width:130px">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				期望时间：<input readonly='readonly' class="repair_hope_time" 
					style="width:100px">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				收取费用：<input readonly='readonly' class="repair_toll_rp"
					style="width:100px">
			</div> 
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>
				负责人：&emsp;<input readonly='readonly' class="repair_peopleName"
					style="width:100px"> <input class="repair_peopleId"
					style="display:none">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				领取时间：<input readonly='readonly' class="repair_receive"
					style="width:130px">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				回访结果：<input readonly='readonly' class="repair_returnning"
					style="width:100px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>维保描述：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea readonly='readonly' class="repair_event" style="width:625px;height:40px"></textarea>
			</div>
			<div style="clear:both"></div>
			<div style='float: right;'>
				<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'repair', 'repairDg', 'repId', 'repImgPath', 'queryRepairById', 'deleteRepairPic')">附件</a>
				<span class="checImageNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<div style='margin:5px 0 0 3px;width:99%;height:127px;'>
			<table id="showProgressTable"></table>
		</div>
		<div style='margin:5px 0 0 3px;width:99%;height:77px;'>
			<table id="showReturningTable"></table>
		</div>
		<div class="clearfix" style="margin:5px 0 0 0;">
			<center>
				<a  class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)">上一条</a>
				<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)">下一条</a>
			</center>
		</div>
	</div>
	
	<!-- 添加维保对话框 -->
	<div id="addRepairDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 12px;float: left;'>
			选择房源：<input class="repair_choseHouse" readonly="readonly" style="width:167px;cursor: pointer;" onclick="choseHouse()" clear="clear" require="require"> 
				<input class="repair_houseRentCoding" style="display:none" clear="clear"> 
				<input class="repair_houseStoreCoding" style="display:none" clear="clear"> 
				<input class="repair_houseCoding" style="display:none" clear="clear"> 
				<input class="repair_houseType" style="width:100px;" clear="clear" disabled="disabled">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			维保类型：<select class="repair_type_rp" style="width:100px;" choose="choose" require="require">
				<option></option>
			</select>
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			费用归属：<select class="repair_responsibility" style="width:100px;" choose="choose" require="require">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			客户姓名：<input class="repair_name" style="width:100px" clear="clear" require="require">
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			客户电话：<input class="repair_phone" style="width:100px" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 24px;float: left;'>
			负责人：<input id="doRepairShowUserInfo" style="width:270px; cursor: pointer;" readonly="readonly"
				class="choose_user_button" doFlag="doRepair" doFun="" value="" clear="clear" require="require">
			<input id="doRepairGetUserStoreId" type="hidden" clear="clear">
			<input id="doRepairGetUserDetId" type="hidden" clear="clear">
			<input id="doRepairGetUserId" type="hidden" clear="clear">
			<div id="doRepairShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 12px;float:left;position:relative;">
			期望时间：<select class="repair_hope_select" style="width:270px;" onChange="hopeTimeVal()" choose="choose">
				<option></option>
			</select>
			<input id="repair_hope_time" style="margin-left:-273px; left:36px;width:250px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>维保描述：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea class="repair_event_rp" style="width:270px;height:60px" clear="clear" require="require"></textarea>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<sapn style="color:red">客户可在微信公众号看到此描述，注意语言规范。</sapn>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 10px;float: left;'>
			<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			<span style="vertical-align: middle;">短信提醒：</span>
			<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="shorMessageRemind">
			<span style="vertical-align: middle;">公众号提醒：</span>
			<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="shorMessageTemplateRemind">
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addRepairDlg')){doAddRepair()}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRepairDlg').dialog('close')">取消</a>
		</div>
	</div>
	
	<!-- 添加进展对话框 -->
	<div id="addProgressDlg" class="easyui-dialog" style="padding:6px" data-options="closed:true">
		<a class="easyui-linkbutton" plain="true" iconcls="icon-shiyonghaocai" id="querySuppliesButton" onclick="querySupplies(1)">使用耗材</a>
		<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'repair', 'repairDg', 'repId', 'repImgPath', 'queryRepairById', 'deleteRepairPic')">上传及查看图片</a>
		<span class="checImageNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		<fieldset>
			<legend>添加进展</legend>
			<input type="hidden" class="add_pro_time" clear="clear">
			<input type="hidden" class="add_pro_repairId" clear="clear">
			<div style='margin:5px 0 0 5px;float: left;'>
				进展状态：<select class="add_proType" style="width:80px" choose="choose" must="must"
						onchange="changeProgressType()">
					<option></option>
				</select>
			</div>
			<div class="complete" style='margin:5px 0 0 5px;float: left;'>
				确认书编号：<input id="confirmNumber" clear="clear" 
					onkeyup="$(this).val($(this).val().toUpperCase());$('#confirmNumberCheckoutIf').val('');$('#confirmNumberTips').html('');"
					onblur="confirmNumberCheckout('confirmNumber','confirmNumberCheckoutIf','confirmNumberTips')"><!-- 确认书编号 -->
				<input id="confirmNumberCheckoutIf" type="hidden" clear="clear"><!-- 确认书编号id -->
				<span id="confirmNumberTips" clear="clear"></span><!-- 验证后的文字描述 -->
			</div>
			<div style="clear:both"></div>
			<div class="complete">
				<div style='display:none;'>
					收款：<input type="hidden" class="add_pro_tollRp" clear="clear">
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>
					结算情况：<select class="add_billing_info" style="width:80px" choose="choose" must="must2" onchange="changeBilling()">
						<option></option>
					</select>
				</div>
				<div style='margin:5px 0 0 17px;float: left;'>
					&emsp;人工费：<input class="add_pro_man_money" style="width:100px" clear="clear" must="must2"
							onKeyUp="moneyKeyupFomat(this)"
							onBlur="moneyBlurFomat(this)"
							onfocus="if (value =='0.00'){value =''}"> 元
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>
					&emsp;材料费：<input class="add_pro_use_money" style="width:100px" clear="clear" must="must2"
							onKeyUp="moneyKeyupFomat(this)"
							onBlur="moneyBlurFomat(this)"
							onfocus="if (value =='0.00'){value =''}"> 元
				</div>
				<div style="clear:both"></div>
				<div id="repairAccountDiv">
					<div style='margin:5px 0 0 5px;float: left;'>
						账户类型：<select style="width:80px" onchange="changeWay1()" class="add_financial_way" id="repairFinancialWay" choose="choose" must="must4">
						<option></option>
						</select>
					</div>
					<div style='margin:5px 0 0 17px;float: left;'>
						账户名称：<select style="width:150px" id="repairAccountName" choose="choose" must="must4" onchange="getAccountId1()">
						<option></option>
						</select>
					</div>
					<div style='margin:5px 0 0 5px;float: left;'>
						收支方式：<select style="width:80px" must="must4" class="financial_payType" id="repairPayType">
						</select>
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 5px;float: left;'>
						账户归属：<input style="width:80px" readonly="readonly" id="repairFinancialAccountBelong" clear="clear">
					</div>
					<div style='margin:5px 0 0 17px;float: left;'>
						账户号码：<input style="width:150px" readonly="readonly" id="repairFinancialAccountNums" clear="clear">
						<input style="display:none" id="repairFinancialBankNums" clear="clear">
					</div>
				</div>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>进展描述：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea class="add_pro_mark" style="width:438px;height:60px" clear="clear" must="must" placeholder="必填" ></textarea>
			</div>
			<div class="complete">
				<div style='margin:5px 0 0 5px;float: left;'>生成审批：</div>
				<div style='margin:5px 0 0 0;float: left;'>
					<input type="checkbox" id="createEventApproval" onclick="createEventApproval()">
				</div>
				<div class="eventApproval" style='margin:5px 0 0 12px;float: left;'>短信提醒：</div>
				<div class="eventApproval" style='margin:5px 0 0 0;float: left;'>
					<input type="checkbox" id="shorMessageRemind1">
				</div>
				<div class="eventApproval" style='margin:5px 0 0 5px;float: left;color:red;'>审批内容为维保和当前进展描述</div>
				<div style="clear:both"></div>
				<div class="eventApproval">
					<div style='margin:5px 0 0 5px;float: left;'>
						涉及金额：<input id="amountInvolved" style="width:80px" clear="clear" must="must3"
							onKeyUp="moneyKeyupFomat(this);" >
					</div>
					<div style='margin:5px 0 0 17px;float: left;'>
						审批人：<input id="doEventShowUserInfo" class="choose_user_button"  doFlag="doEvent" doFun=""
							style="width:146px;cursor: pointer;" type="text" readonly="readonly" clear="clear" must="must3">
						<input id="doEventGetUserStoreId" type="hidden" clear="clear">
						<input id="doEventGetUserDetId" type="hidden" clear="clear">
						<input id="doEventGetUserId" type="hidden" clear="clear">
						<div id="doEventShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 17px;float: left;'>
						开户名：<input id="eaBankUsername" style="width:80px" clear="clear">
					</div>
					<div style='margin:5px 0 0 5px;float: left;'>
						收款银行：<input id="eaBankName" style="width:80px" clear="clear">
					</div>
					<div style='margin:5px 0 0 5px;float: left;'>
						收款账号：<input id="eaBankAccountNumber" style="width:160px" clear="clear">
					</div>
				</div>
			</div>
		</fieldset>
		<center style="margin:10px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="choseIfFinancila()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addProgressDlg').dialog('close')">取消</a>
		</center>
	</div>
	
	<!-- 添加回访对话框 -->
	<div id="addReturningDlg" class="easyui-dialog" style="padding:6px"
		data-options="closed:true">
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>添加回访</font>
			</legend>
			<div style='margin:0 0 0 10px;float: left;'>
				回访情况：<select readonly='readonly' class="add_return_resultState"
					style="width:100px" needs="1" onchange="changeReturnResult()">
					<option></option>
					<option value="回访成功">回访成功</option>
					<option value="回访未成功">回访未成功</option>
				</select>
			</div>
			<div style='margin:0 0 0 14px;float: left;' id="addReturnResultDiv">
				回访结果：<select class="add_return_result" style="width:80px" needs="1">
					<option></option>
				</select>
			</div>
			<div style='margin:0 0 0 22px;float: left;'>
				回访时间：<input readonly='readonly' class="add_return_time"
					style="width:130px">
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<div id="addReturningInfo">
			<fieldset>
				<legend>
					<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>回访内容</font>
				</legend>
				<div style='margin:5px 0 0 10px;float: left;'>
					服务态度：<select class="add_return_attitude" style="width:80px" needs="1">
						<option></option>
					</select>
				</div>
				<div style='margin:5px 0 0 10px;float: left;'>
					是否按时完成：<select class="add_return_quality" style="width:80px" needs="1">
						<option></option>
						<option>是</option>
						<option>否</option>
					</select>
				</div>
				<div style='margin:5px 0 0 34px;float: left;'>
					回访人：<input readonly='readonly' class="add_return_userName"
						style="width:80px"> <input class="add_return_repairId"
						style="display:none"><input class="add_return_userId"
						style="display:none">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 10px;float: left;'>
					是否签单：<select class="add_return_shopping" style="width:80px" needs="1">
						<option></option>
						<option>是</option>
						<option>否</option>
					</select>
				</div>
				<div style='margin:5px 0 0 34px;float: left;'>
					实际费用：<input class="add_return_getpay" style="width:80px" needs="1" onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
							onfocus="if (value =='0.00'){value =''}">元
				</div>
				<div style='margin:5px 0 0 10px;float: left;'>
					上报费用：<input class="add_return_pay" readonly="readonly"
						style="width:80px">元
				</div>
			</fieldset>
		</div>
		<fieldset>
			<legend>跟进</legend>
			<div style='margin:5px 0 0 34px;float: left;'>跟进：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea class="add_return_mark" style="width:300px;height:50px;"></textarea>
			</div>
		</fieldset>
		<div style="margin:10px 0 0 0;">
			<center>
				<a class="easyui-linkbutton" iconcls="icon-save"
					onclick="doAddReturning()">保存</a> <a 
					class="easyui-linkbutton" iconcls="icon-cancel"
					onclick="javascript:$('#addReturningDlg').dialog('close')">取消</a>
			</center>
		</div>
	</div>
	<!-- 选择房源  -->
	<div id="choseHouseDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 0 0;color:black;font-size:13px;float:left;">
			关联类型：<select id="searchBelongType" onchange="relationDataGrid()" style="width:80px">
				<option value='1'>已租列表</option>
				<option value='2'>未租列表</option>
				<!-- <option value='3'>盘源列表</option> -->
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="choseHouseSelect">
			<div style='margin:0 0 10px 0;'>
				<div
					style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;display:none">
					城市：<select id="searchAddCity" onchange="queryAddCity()"
						style="width:80px">
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					城区：<select id="searchAddDistrict" onchange="choseHouseData(1,0)"
						style="width:100px">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					片区：<select id="searchAddZone" onchange="choseHouseData(1,0)"
						style="width:100px">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="searchAddCommunity"
						onkeyup="searchOnkeyup(this.id, 'choseHouseData(1, 0)')" style="width:80px">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuilding"
						onkeyup="searchOnkeyup(this.id, 'choseHouseData(1, 0)')" style="width:60px">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplateno"
						onkeyup="searchOnkeyup(this.id, 'choseHouseData(1, 0)')" style="width:60px">
				</div>
				<div style="margin:0 0 0 5px;color:black;font-size:13px;float:left;" id="searchHrStateDiv">
					租赁状态：<select id="searchHrLeaseState" onchange="choseHouseData(1,0)"
						style="width:80px">
						<option value='在租'>在租</option>
						<option value='正办退房'>正办退房</option>
					</select>
				</div>
			</div>
		</div>
		<div id="choseHouseDataGrid" style="width:100%;height:89%">
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
				<div id="choseSaveHousePageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
	<!-- 修改负责人 -->
	<div id="updateRepairManDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 0;float: left;'>
			原负责人：<input style="width:200px;" readonly="readonly"id="updateRepairManOld">
		</div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 0;float: left;'>
			新负责人：<input id="newRepairShowUserInfo" style="width:200px;cursor: pointer;" readonly="readonly" class="choose_user_button" 
					doFlag="newRepair" doFun="" value="">
				<input id="newRepairGetUserStoreId" type="hidden">
				<input id="newRepairGetUserDetId" type="hidden">
				<input id="newRepairGetUserId" type="hidden">
				<div id="newRepairShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 0;float: left;'>
			是否短信提醒：
		</div>
		<div style='margin:10px 0 0 0;float: left;'>
			<input type="checkbox" id="shorMessageRemind" checked=true>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateRepairMan()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateRepairManDlg').dialog('close')">取消</a>
		</div>
	</div>
	
	<!-- 修改费用归属 -->
	<div id="attributionChange" style="padding:6px" data-options="closed:true" class="easyui-dialog"> 
		<div style='margin:5px 0 0 0;float: left;'>
			原归属：<input style="width:150px;" readonly="readonly" id="originalOwnership" claer="claer">
		</div>
		<input id="attributionRepId" style="display:none" claer="claer">
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'>
			新归属：<select id="newAttribution" style="width:150px;" claer="claer">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<center style="margin:15px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="addAttribution()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#attributionChange').dialog('close')">关闭</a>
		</center>
	</div>
	<div id="lookAssInfoDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<table id="lookAssInfoTable"></table>
	</div>
	
	<!-- 生成维保账单 -->
	<div id="setRepairFinancialDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>租方信息</font>
			</legend>
			<input style="display:none" id='setHouseCodingType'> <input
				style="display:none" id='setFinancialHouseId'> <input
				style="display:none" id='setFinancialHouseStoreId'> <input
				style="display:none" id='setFinancialHouseRentId'> <input
				style="display:none" id='setFinancialRepId'>
			<div style='margin:5px 0 0 0px;float: left;'>
				归属类型：<input style="width:110px" id="setFinancialBelongType"
					readonly="readonly">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				归属名称：<input style="width:80px" readonly="readonly"
					id="setFinancialBelongName"> <input style="display:none"
					id="setFinancialBelongId">
			</div>
			<div style='margin:5px 0 0 8px;float: left;'>
				记账日期：<input style="width:70px" id="setFinancialDoTime"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				费用归属：<input style="width:338px" readonly='readonly'
					id="setFinancialBelongAddress">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				经手人：<select class="add_source_theStore" id="setFinancialDept"
					onchange="deptStaffChose('setFinancialDept','setFinancialStaff',0)"
					style="width:75px">
					<option></option>
				</select> <select id="setFinancialStaff" style="width:65px">
					<option></option>
				</select>
			</div>
		</fieldset>
		<fieldset>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>其他信息</font>
			</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				账户类型：<select style="width:150px" onchange="changeWay(0)"
					id="setFinancialWay">
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户名称：<select style="width:150px" id="setFinancialAccountName"
					onchange="getAccountId(0)">
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支方式：<select style="width:60px" class="financial_payType" id="setFinancialPayType">
					</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:8px 0 0 0;float: left;'>
				账户号码：<input style="width:150px" disabled="disabled"
					id="setFinancialAccountNums"> <input style="display:none"
					id="setFinancialBankNums">
			</div>
			<div style='margin:8px 0 0 10px;float: left;'>
				账户归属：<input style="width:150px" disabled="disabled"
					id="setFinancialAccountBelong">
			</div>
		</fieldset>
		<div id="">
			<div id="setFinancialDiv"
				style='margin:10px 0 10px 5px;width:99%;height:302px;float: left;'>
				<table id="setFinancialTable">
				</table>
			</div>
			<div style="clear:both"></div>
			<center>
				<div id="setFinancialTips" style="height:20px;color:red;"></div>
				<div style="clear:both"></div>
				</br>
				<div>
					<a  class="easyui-linkbutton"
						iconcls="icon-save" onclick="doSetFinancial()">保存</a> <a
						 class="easyui-linkbutton"
						onclick="$('#setFinancialDlg').dialog('close')"
						iconcls="icon-cancel" onclick="">关闭</a>

				</div>
			</center>
		</div>
	</div>
	<!-- 回访详情 -->
	<div id="showReturningDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>回访时间：</td>
						<td colspan="3"><span style="color:blue" id="readShowReturningretTime"></span></td>
					</tr>
					<tr>
						<td>处理人：</td>
						<td ><span style="color:blue" id="readShowReturninguserName"></span></td>
						<td>回访结果：</td>
						<td><span style="color:blue" id="readShowReturningretResult"></span></td>
					</tr>
					<tr>
						<td>备注：</td>
						<td colspan="3" style="text-align:left"><span
							id="readShowReturningrteRemark"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<!-- 进展详情 -->
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
						<td>结算情况：</td>
						<td ><span style="color:blue" id="readShowProgressproBillingInfo"></span></td>
						<td>人工费：</td>
						<td><span style="color:blue" id="readShowProgressproManMoney"></span></td>
					</tr>
					<tr>
						<td>材料费：</td>
						<td ><span style="color:blue" id="readShowProgressproUseMoney"></span></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>备注：</td>
						<td colspan="3" style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue" id="readShowProgressproRemark"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<!-- 耗材列表 -->
	<div id="querySuppliesDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 5px 0;">
			<a class="easyui-linkbutton" plain="true" iconcls="icon-shiyonghaocai" id="useSuppliesButton" onclick="useSupplies()">使用耗材</a>
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
				项目名称：<input id="searchVirtualName" onkeyup="searchOnkeyup(this.id, 'querySupplies(1)')" style="width:100px;">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				耗材类型：<select id="searchSupType" onchange="querySupplies(1)" style="width:100px">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				耗材名称：<input id="searchSupName" onkeyup="searchOnkeyup(this.id, 'querySupplies(1)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;&emsp;品牌：<input id="searchSupBrand" onkeyup="searchOnkeyup(this.id, 'querySupplies(1)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;&emsp;型号：<input id="searchSupModel" onkeyup="searchOnkeyup(this.id, 'querySupplies(1)')" style="width:100px"></input>
			</div>
		</div>
		<table id="suppliesDg" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
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
				</tr>
			</thead>
		</table>
		<div id="suppliesPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 使用耗材 -->
	<div id="useSuppliesDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:10px 0 5px 5px;">
			使用地址：<input id="use_supplies_choseHouse" disabled="disabled" style="width:400px" clear="clear">
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
	<!-- 资产列表 -->
	<div id="queryAssetsDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 5px 0;">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-qianru" onclick="moveInAssets()">迁入资产</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-qianchu" onclick="moveOutAssets()">迁出资产</a>
		</div>
		<table id="assetsInfoTable" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th width="10" align="center" field="saId">编号</th>
					<th width="10" align="center" field="saType">所属</th>
					<th width="10" align="center" field="saClassify">类型</th>
					<th width="10" align="center" field="saName">名称</th>
					<th width="10" align="center" field="saBrand">品牌</th>
					<th width="10" align="center" field="saModel">型号</th>
					<th width="10" align="center" field="saPrice">价格</th>
					<th width="10" align="center" field="saStatus">状态</th>
					<th width="10" align="center" field="saUse">使用情况</th>
					<th width="10" align="center" field="saRemarks">备注</th>
					<th width="10" align="center" field="registrantName">登记人</th>
					<th width="10" align="center" field="saRegistrationTime">登记时间</th>
				</tr>
			</thead>
		</table>
		<div id="assetsPageDiv" style="text-align:center;"></div>
	</div>
	<!-- 迁入资产对话框 -->
	<div id="moveInAssetsDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div class="clearfix">
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				楼盘名称：<input id="searchCommunity_asset" onkeyup="searchOnkeyup(this.id, 'queryAssetsList(1, 0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;&emsp;楼栋：<input id="searchBuilding_asset" onkeyup="searchOnkeyup(this.id, 'queryAssetsList(1, 0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;门牌号：<input id="searchDoorplateno_asset" onkeyup="searchOnkeyup(this.id, 'queryAssetsList(1, 0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				项目分类：<select id="searchVirtualType_asset" onchange="queryAssetsList(1, 0)" style="width:100px;">
					<option value="0"></option>
					<option value="1">内部项目</option>
					<option value="2">外部项目</option>
					<option value="3">非成本项目</option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				项目名称：<input id="searchVirtualName_asset" onkeyup="searchOnkeyup(this.id, 'queryAssetsList(1, 0)')" style="width:100px;" >
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				资产所属：<select id="searchSaType" onchange="queryAssetsList(1, 0)" style="width:100px">
					<option></option>
				</select>
			</div>
			<!-- <div style="margin:0 0 5px 5px;color:black;float:left;">
				使用情况：<select id="searchSaUse" onchange="queryAssetsList(1, 0)" style="width:100px">
					<option></option>
				</select>
			</div> -->
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				资产编号：<input id="searchSaNumber" onkeyup="searchOnkeyup(this.id, 'queryAssetsList(1, 0)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				资产名称：<input id="searchSaName" onkeyup="searchOnkeyup(this.id, 'queryAssetsList(1, 0)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;&emsp;品牌：<input id="searchSaBrand" onkeyup="searchOnkeyup(this.id, 'queryAssetsList(1, 0)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;&emsp;型号：<input id="searchSaModel" onkeyup="searchOnkeyup(this.id, 'queryAssetsList(1, 0)')" style="width:100px"></input>
			</div>
		</div>
		<fieldset>
			<legend>资产列表</legend>
			<div style="width:99%;height:38%">
				<table id="assetsListTable"></table>
				<div id="assetsListTablePageDiv" style="text-align:center;"></div>
			</div>
		</fieldset>
		<fieldset>
			<legend>待迁入的资产</legend>
			<div style="width:99%;height:35%">
				<table id="assetsMoveInTable"></table>
			</div>
		</fieldset>
		<fieldset>
			<legend>迁移相关</legend>
			<div style="margin:10px 0 5px 5px;">
				&emsp;经手人：<select class="select-dept" id="move_in_asset_dept" style="width:90px" choose="choose" must="must"
					onchange="deptStaffChose('move_in_asset_dept','move_in_asset_staff',0)">
					<option></option>
				</select> <select id="move_in_asset_staff" style="width:90px" choose="choose" must="must">
					<option></option>
				</select>
			</div>
	        <div class="clearfix">
	            <div style="margin:5px 0 5px 5px;float:left;">迁移原因：</div>
	            <div style="margin:5px 0 5px 0;float:left;">
	                <textarea id="move_in_asset_reason" style="width:400px;height:50px;" 
	                    clear="clear" placeholder="可选"></textarea>
	            </div>
	        </div>
		</fieldset>
		<center style="margin:20px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveInAssets()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moveInAssetsDlg').dialog('close')">取消</a>
		</center>
	</div>
	<!-- 迁出资产 -->
	<div id="moveOutAssetsDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 5px 5px;">
			迁出地址/项目：<input id="move_from_assets_choseHouse" disabled="disabled"
				style="width:400px" clear="clear"> 
		</div>
		<div style="margin:10px 0 5px 5px;">
			迁入地址/项目：<input id="move_to_assets_choseHouse" readonly="readonly" onclick="choseHouseAsset()" 
				style="width:400px" placeholder="单击选择房屋或项目，必选" clear="clear" must="must">
			<input type="hidden" id="move_to_assets_houseStoreCoding" clear="clear">
			<input type="hidden" id="move_to_assets_houseCoding" clear="clear">
		</div>
		<div style="margin:10px 0 5px 46px;">
			经手人：<select class="select-dept" id="move_to_asset_dept" style="width:90px" choose="choose" must="must"
				onchange="deptStaffChose('move_to_asset_dept','move_to_asset_staff',0)">
				<option></option>
			</select> <select id="move_to_asset_staff" style="width:90px" choose="choose" must="must">
				<option></option>
			</select>
		</div>
        <div class="clearfix">
            <div style="margin:5px 0 5px 34px;float:left;">迁移原因：</div>
            <div style="margin:5px 0 5px 0;float:left;">
                <textarea id="move_to_asset_reason" style="width:400px;height:50px;" 
                    clear="clear" placeholder="可选"></textarea>
            </div>
        </div>
		<center style="margin:15px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveOutAssets()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moveOutAssetsDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 归属关联列表显示  -->
	<div id="choseHouseAssetDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input type="hidden" id="choseHouseType">
		<div style="margin:5px 0 0 5px;color:black;font-size:13px;float:left;">
			选择列表：<select id="searchBelongTypeAsset" onchange="relationDataGridAsset()" style="width:100px">
				<option value="1">房源列表</option>
				<option value="2">项目列表</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="choseHouseSelectAsset">
			<div style="margin:0 0 10px 0;">
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					&emsp;&emsp;城区：<select id="searchAddDistrictAsset" onchange="choseHouseDataAsset(1)" style="width:100px;">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="searchAddCommunityAsset" onkeyup="searchOnkeyup(this.id, 'choseHouseDataAsset(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuildingAsset" onkeyup="searchOnkeyup(this.id, 'choseHouseDataAsset(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplatenoAsset" onkeyup="searchOnkeyup(this.id, 'choseHouseDataAsset(1)')" style="width:100px;">
				</div>
			</div>
		</div>
		<div id="virtualRelationSelectAsset" style="display:none;">
			<div style="margin:0 0 10px 0;">
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目分类：<select id="searchVirtualType2" onchange="choseHouseDataAsset(1)" style="width:100px;">
						<option value="0"></option>
						<option value="1">内部项目</option>
						<option value="2">外部项目</option>
						<option value="3">非成本项目</option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目名称：<input id="searchVirtualName2" onkeyup="searchOnkeyup(this.id, 'choseHouseDataAsset(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目联系人：<input id="searchVirtualContact2" onkeyup="searchOnkeyup(this.id, 'choseHouseDataAsset(1)')" style="width:100px;">
				</div>
			</div>
		</div>
		<div style="width:100%;height:89%">
			<!-- 选择未租列表 -->
			<div id="choseTrusteeshipAsset" style="width:100%;height:100%;display:none;">
				<table id="choseTrusteeshipAssetTable"></table>
				<div id="choseTrusteeshipAssetPageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<!-- 选择项目列表 -->
			<div id="choseVirtualHouseAsset" style="width:100%;height:100%;display:none;">
				<table id="choseVirtualHouseAssetTable"></table>
				<div id="choseVirtualHouseAssetPageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
	<!-- 进展记录对话框 -->
	<div id="progressDlg" style="padding:6px">
		<table id="progressTable"></table>
	</div>
	<!-- 回访记录对话框 -->
	<div id="returningDlg" style="padding:6px">
		<table id="returningTable"></table>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.repair.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>