<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>任务</title>
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
	<script src="js/fg.task.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!-- 任务工具栏 -->
	<div>
		<div style="padding:5px 0 0 5px">
			<a class="easyui-linkbutton" onclick="addRepair()" iconCls="icon-add-event" id="addRepairButton" plain="true">添加任务</a>
			<a class="easyui-linkbutton" onclick="addProgress(0)" iconCls="icon-follow-up" id="addProgressButton" plain="true">添加进展</a>
			<a class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="advancedScreening(1)" id="screening">高级筛选</a>
		</div>
		<!-- <div style="clear:both"></div> -->
		<div id="searchSaveHouse" style="padding:0 0 0 0" class="advancedScreening">
			<div class="advanced1" style="width:100%">
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					日常分类：<select id="dailyClassification" onchange="dailyClassification(1,0)" style="width:80px">
					</select>
					任务描述：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryRepair(1, 0)')" style="width:80px">
				</div>
				<div id="projectDailyTreatment" style="display:none;float:left;">
					<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
						归属地址/类型：<input id="searchKeyAdministrator" onkeyup="searchOnkeyup(this.id, 'queryRepair(1, 0)')" style="width:80px">
					</div>
				</div>
				<div id="otherDailyHandling" style="display:block;float:left;">
					<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
						楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryRepair(1, 0)')" style="width:80px">
					</div>
					<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
						楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryRepair(1, 0)')" style="width:80px">
					</div>
					<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
						门牌号：<input id="searchDoorplateno1" onkeyup="searchOnkeyup(this.id, 'queryRepair(1, 0)')" style="width:50px">
					</div>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					登记时间：<input id="searchStartTime" style="width:80px" class="Wdate"
						type="text"
						onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchEndTime\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryRepair(1,0)})">到
					<input id="searchEndTime" style="width:80px" class="Wdate"
						type="text"
						onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchStartTime\',{d:1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryRepair(1,0)})">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					任务类型：<select id="searchType" onchange="queryRepair(1,0)" style="width:80px">
						<option ></option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					任务状态：<select id="searchState" onchange="queryRepair(1,0)" style="width:80px">
						<option value=""></option>
						<option value="未完成">未完成</option>
						<option value="未领取">未领取</option>
						<option value="跟进中">跟进中</option>
						<option value="事件完成">事件完成</option>
						<option value="已复核">已复核</option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					任务等级：<select id="searchGrade" onchange="queryRepair(1,0)" style="width:90px">
						<option value="">全部</option>
						<option value="1">任务等级：1</option>
						<option value="2">任务等级：2</option>
						<option value="3">任务等级：3</option>
					</select>
				</div>
			</div>
			<div class="advanced2">
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					负责人：<input id="searchFollowShowUserInfo" style="width:150px;cursor: pointer;" readonly="readonly"
							    class="choose_user_button"  doFlag="searchFollow" doFun="queryRepair(1,0)" value="">
						<input id="searchFollowGetUserStoreId" type="hidden">
						<input id="searchFollowGetUserDetId" type="hidden">
						<input id="searchFollowGetUserId" type="hidden" needs="1">
						<div id="searchFollowShowUserInfoDiv" style="display:none;"></div>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					登记人：<input id="searchRegistShowUserInfo" style="width:150px;cursor: pointer;" readonly="readonly" class="choose_user_button"  doFlag="searchRegist" doFun="queryRepair(1,0)" value="">
						<input id="searchRegistGetUserStoreId" type="hidden">
						<input id="searchRegistGetUserDetId" type="hidden">
						<input id="searchRegistGetUserId" type="hidden" needs="1">
						<div id="searchRegistShowUserInfoDiv" style="display:none;"></div>
				</div>
				<div	style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					<div id="showTheSortButton" class="showTheSortButton" onclick="showTheSortDlg()" >排序方式
						<span id="showTheSortjia" class="showTheSortjia">+</span></div>
					<div class="theSortDlg" id="theSortDlg" style="height:100px;">
						<div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
						<div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse"  searchVal="2">倒序</div>
							<input type="hidden" id="theSortContraryInput"  value="2">
							<div class="theSortTerm theSortTermSelect" id="theSortTermhsRegisterTime" searchVal="1">登记时间</div>
							<div class="theSortTerm " id="theSortTermSortRepGrade" searchVal="2">任务等级</div>
							<div class="theSortTerm" id="theSortTermSortFinishTime" searchVal="3">完成时间</div>
							<input type="hidden" id="theSortTermInput" value="1">
						</div>
					</div>
			</div>
		</div>
	</div>
	<!-- 任务列表 -->
	<div id="DataGridRepair" style="width:100%;height:83%;">
		<table id="repairDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden; " data-options="rownumbers:false,
				singleSelect:true,autoRowHeight:false,pageSize:10,fitColumns:true,pagination:false,scrollbarSize:0">
			<thead>
				<tr>
					<th field="repState" width="10" align="center" formatter="formatState">任务状态</th>
					<th field="repTypeRp" width="10" align="center">任务类型</th>
					<th field="keyAdministrator" width="25" align="center">归属类型/地址</th>
					<th field="repReportingTime" width="15" align="center" formatter="formatOperRepTime">登记时间</th>
					<th field="repFinishTime" width="15" align="center" >完成时间</th>
					<th field="repGrade" width="10"  align="center" formatter="formatRepGrade"  >任务等级</th>
					<th field="repEventRp" width="30"  align="center" formatter="formatEventRp">任务描述</th>
					<!-- <th field="repResponsibility" width="10" align="center">责任归属</th> -->
					<th field="repContactsPhone" width="15" align="center">客户电话</th>
					<th field="repRepairman" width="10" align="center">负责人</th>
					<th field="repUseTime" width="15" align="center">任务耗时</th>
					<th field="repToReceive" width="15" align="center" formatter="formatReceive">领取</th>
					<th field="repProgressRp" width="30" align="center" formatter="formatProgressRp">进展</th>
					<th field="repImgNum" width="10" align="center">图片数量</th>
					<!-- <th field="repTollRp" width="10" align="center">收费</th> -->
					<th field="repReturningRp" width="10" align="center" formatter="formatReturningRp">复核结果</th>
				</tr>
			</thead>
		</table>
		<div id="repairPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 任务详细对话框 -->
	<div id="repairInfoDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style='margin:0 0 5px 10px;float: left;'>
			<a class="easyui-linkbutton" iconcls="icon-follow-up" plain="true" id="writeProgress" onclick="addProgress(1)">写进展</a>
			<a class="easyui-linkbutton" plain="true" iconcls="icon-huifang" id="doReturningButton" onclick="addReturningRp($('.repair_index').val(),1)">复核</a>
			<a class="easyui-linkbutton" plain="true" iconcls="icon-user-edit" id="updateRepairPeopleButton" onclick="updateRepairMan()">修改负责人</a>
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'repair', 'repairDg', 'repId', 'repImgPath', 'queryRepairById', 'deleteRepairPic')">附件</a>
		</div>
		<div style="clear:both"></div>
			<div style='margin:0 0 0 11px;float: left;'>
				地址/项目名：<input readonly='readonly' id="deposit_address" style="width:295px">
				<input class="repair_id" style="display:none">
				<input class="repair_index" style="display:none">
			</div>
			<div style='margin:0 0 0 34px;float: left;'>
				任务类型：<input readonly='readonly' class="repair_type" style="width:80px">
				<input disabled='disabled' class="repair_houseType" style="width:80px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>
				任务状态：<input readonly='readonly' class="repair_state" style="width:100px">
			</div>
			<div style='margin:5px 0 0 47px;float: left;'>
				负责人：<input readonly='readonly' class="repair_peopleName" style="width:100px">
					<input class="repair_peopleId" style="display:none">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				领取时间：<input readonly='readonly' class="repair_receive" style="width:164px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>
				任务等级：<input readonly='readonly' class="repair_grade" style="width:100px">
			</div>
			<div style='margin:5px 0 0 47px;float: left;'>
				登记人：<input readonly='readonly' class="repair_userName" style="width:100px">
				<input class="repair_userId" style="display:none">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				登记时间：<input readonly='readonly' class="repair_time" style="width:164px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>
				客户姓名：<input readonly='readonly' class="repair_contacis" style="width:100px">
			</div>
			<div style='margin:5px 0 0 35px;float: left;'>
				客户电话：<input readonly='readonly' class="repair_contacisPhone" style="width:100px">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				期望时间：<input readonly='readonly' class="repair_hope_time" style="width:164px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>任务描述：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea readonly='readonly' class="repair_event" style="width:553px;height:45px;resize:both;"></textarea>
			</div>
			<div style="clear:both"></div>
		<div style="clear:both"></div>
		<div style='margin:20px 0 0 5px;width:99%;height:127px;'>
			<table id="showProgressTable"> </table>
		</div>
		<div style='margin:5px 0 0 5px;width:99%;height:77px;'>
			<table id="showReturningTable" class="easyui-datagrid" style="width:100%;height:77px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th width="20" align="center" field="retTime">复核时间</th>
						<th width="20" align="center" field="userName">负责人</th>
						<th width="20" align="center" field="retResult">复核结果</th>
						<th width="40" align="center" field="rteRemark">备注</th>
					</tr>
				</thead>
			</table>
		</div>
		<div style='margin:8px 0 0 0;text-align:center;'>
			<a  class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)">上一条</a>
			<a  class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)">下一条</a>
		</div>
	</div>
	<!-- 任务详情查看跟进信息 -->
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
	<!-- 复核详情查看跟进信息 -->
	<div id="showCheckDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin: 0 auto">
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>复核时间：</td>
						<td colspan="3"><span style="color:blue" id="readShowCheckretTime"></span></td>
					</tr>
					<tr>
						<td>处理人：</td>
						<td ><span style="color:blue" id="readShowCheckuserName"></span></td>
						<td>复核结果：</td>
						<td><span style="color:blue" id="readShowCheckretResult"></span></td>
					</tr>
					<tr>
						<td>备注：</td>
						<td colspan="3" style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue" id="readShowCheckrteRemark"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- 添加任务对话框 -->
	<div id="addRepairDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 12px;float: left;'>
			任务归属：<input class="repair_choseHouse" readonly="readonly" style="width:167px;cursor: pointer;" onclick="choseHouse()" clear="clear" require="require">
				<input class="repair_houseRentCoding" style="display:none" clear="clear">
				<input class="repair_houseStoreCoding" style="display:none" clear="clear">
				<input class="repair_houseCoding" style="display:none" clear="clear">
				<input id="cocId" style="display:none" clear="clear">
				<input class="add_repair_houseType" style="width:100px;" clear="clear" disabled="disabled">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			任务类型：<select id="repair_type_rp" style="width:100px;" clear="clear" require="require" onchange="checkContact()">
				<option></option>
			</select>
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			责任归属：<select class="repair_responsibility" style="width:100px;" clear="clear" require="require">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			任务等级：<select class="repair_grade" style="width:100px;" clear="clear" require="require">
				<option value="1" title="紧急任务">1</option>
				<option value="2" title="正常情况任务">2</option>
				<option value="3" title="较宽松任务" selected="selected">3</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			客户姓名：<input class="repair_name" style="width:100px" clear="clear" >
			<input class="repair_name2" type="hidden" clear="clear">
			<input class="repair_name3" type="hidden" clear="clear">
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			客户电话：<input id="repair_phone" class="repair_phone" style="width:100px" clear="clear" >
			<input id="repair_phone2" class="repair_phone2" type="hidden" clear="clear">
			<input id="repair_phone3" class="repair_phone3" type="hidden" clear="clear">
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
		<div style='margin:5px 0 0 12px;float: left;position:relative;'>
			期望时间：<select class="repair_hope_select" style="width:270px;" onchange="hopeTimeVal()" clear="clear">
				<option></option>
			</select>
			<input class="repair_hope_time" id="repair_hopetime" style="margin-left:-273px; left:36px;width:250px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>任务描述：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea class="repair_event_rp" style="width:270px;height:60px" clear="clear" require="require"></textarea>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 10px;float: left;'>
			<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div style="clear:both;"></div>
		<div style='margin:5px 0 0 10px;float: left;'>
			<span style="vertical-align: middle;">短信提醒：</span>
			<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="shorMessageRemind">
			<span style="vertical-align: middle;">公众号提醒：</span>
			<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="shorMessageTemplateRemind">
		</div>

		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<!-- <div class="errMsg" style="box-sizing:border-box;height:5px;color:red;"></div> -->
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addRepairDlg')){doAddRepair()}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRepairDlg').dialog('close')">取消</a>
		</div>
	</div>
	
	<!-- 添加进展对话框 -->
	<div id="addProgressDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true" >
		<div style='margin:5px 0 0 0;float: left;'>
			进展时间：<input readonly='readonly' class="add_pro_time" style="width:246px">
			<input class="add_pro_repairId" style="display:none">
			<input class="add_pro_userId" style="display:none">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'>
			进展状态：<select class="add_proType" style="width:246px" require="require">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'>进展描述：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea class="add_pro_mark" style="width:246px;height:60px" require="require"></textarea>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addProgressDlg')){doAddProgress()}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addProgressDlg').dialog('close')">取消</a>
		</div>
	</div>
	
	<!-- 负责人修改 -->
	<div id="updateRepairManDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 0;float: left;'>
			原负责人：<input style="width:200px;" readonly="readonly" id="updateRepairManOld" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 0;float: left;'>
			新负责人：<input id="newRepairShowUserInfo" style="width:200px;cursor: pointer;" readonly="readonly" class="choose_user_button" doFlag="newRepair" doFun="" value="" clear="clear" require="require">
				<input id="newRepairGetUserStoreId" type="hidden" clear="clear" require="require">
				<input id="newRepairGetUserDetId" type="hidden" clear="clear" require="require">
				<input id="newRepairGetUserId" type="hidden" clear="clear" require="require">
				<div id="newRepairShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="clear:both"></div>
		<div>
			<div style='margin:10px 0 0 0;float: left;'>最新进展：</div>
			<div style='margin:10px 0 0 0;float: left;'>
				<textarea id="updateRepairProgress" style="width:200px;height:45px" clear="clear"></textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 0;float: left;'>
			是否短信提醒：
		</div>
		<div style='margin:10px 0 0 0;float: left;'>
			<input type="checkbox" id="shorMessageRemind2" checked=true>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateRepairMan()">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateRepairManDlg').dialog('close')">取消</a>
		</div>
	</div>
	<div id="choseHouseDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div style="margin:5px 0 0 5px;color:black;font-size:13px;float:left;">
			类型：<select style="width:100px;" id="searchVirtualType" onchange="relationDataGrid()" >

				<option value="1">已租列表</option>
				<option value='2'>未租列表</option>
				<option value='3'>盘源列表</option>
				<option value='4'>客户列表</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="choseHouseSelect">
			<div style='margin:0 0 10px 0;'>
				<div
					style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;display:none">
					城市：<select id="searchAddCity" onchange="queryAddCity()" style="width:80px" clone="clone">
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					城区：<select id="searchAddDistrict" onchange="choseHouseData(1,0)"
						style="width:100px" clone="clone">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					片区：<select id="searchAddZone" onchange="choseHouseData(1,0)"
						style="width:100px" clone="clone">
						<option></option>
					</select>
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="searchAddCommunity"
						onkeyup="searchOnkeyup(this.id, 'choseHouseData(1, 0)')" style="width:80px" clone="clone">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuilding"
						onkeyup="searchOnkeyup(this.id, 'choseHouseData(1, 0)')" style="width:60px" clone="clone">
				</div>
				<div
					style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplateno"
						onkeyup="searchOnkeyup(this.id, 'choseHouseData(1, 0)')" style="width:60px" clone="clone">
				</div>
				<div style="margin:0 0 0 5px;color:black;font-size:13px;float:left;" id="searchHrStateDiv">
					租赁状态：<select id="searchHrLeaseState" onchange="choseHouseData(1,0)"
						style="width:60px" clone="clone">
						<option value='在租'>在租</option>
						<option value='正办退房'>正办退房</option>
					</select>
				</div>
			</div>
		</div>
		<div id="virtualRelationSelect" style="display:none;">
			<div style='margin:0 0 10px 0;'>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualName">名称：</label>
					<input style="width:100px;" id="searchVirtualName" onkeyup="choseHouseData(1,0)" clsso="clsso">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualDoorplateno">任务描述：</label>
					<input style="width:100px;" id="searchVirtualDoorplateno" onkeyup="choseHouseData(1,0)" clsso="clsso">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualContact">联系人：</label>
					<input style="width:100px;" id="searchVirtualContact" onkeyup="choseHouseData(1,0)" clsso="clsso">
				</div>
			</div>
		</div>
		<div id="customerSelect" style="display:none;">
			<div style='margin:0 0 10px 0;'>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="searchVirtualContact">联系人：</label>
					<input style="width:100px;" id="customerContact" onkeyup="choseHouseData(1,0)" clsso="clsso">
				</div>
			</div>
		</div>
		<div id="choseHouseDataGrid" style="width:100%;height:89%">
			<div id="choseSource" style="width:100%;height:100%;">
				<!-- 选择已租列表 -->
				<table id="choseSourceTable"></table>
				<div id="choseSourcePageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<div id="choseTrusteeship" style="width:100%;height:100%;display:none;">
				<!-- 选择未租列表 -->
				<table id="choseTrusteeshipTable"></table>
				<div id="choseTrusteeshipPageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<div id="choseSaveHouse" style="width:100%;height:100%;display:none;">
				<!-- 选择房屋列表 -->
				<table id="choseSaveHouseTable"></table>
				<div id="choseSaveHousePageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<div id="choseVirtual" style="width:100%;height:100%;display:none;">
				<!-- 选择项目列表 -->
				<table id="choseVirtualTable"></table>
				<div id="choseVirtualPageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<div id="choseCustomer" style="width:100%;height:100%;display:none;">
				<!-- 选择客户列表 -->
				<table id="choseCustomerTable"></table>
				<div id="choseCustomerPageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
	<!-- 添加复核 -->
	<div id="addReturningDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 26px;'>
			复核人：<input readonly='readonly' class="add_return_userName"
				style="width:80px"> <input class="add_return_repairId"
				style="display:none"><input class="add_return_userId"
				style="display:none">
		</div>
		<div style='margin:5px 0 0 14px;'>
			复核结果：<select id="addReturnResult" style="width:150px">
				<option value="合格">合格</option>
				<option value="不合格">不合格</option>
			</select>
		</div>
		<div class="clearfix">
			<div style='margin:5px 0 0 10px;float: left;'>备注/原因：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea id="addReturnMark" style="width:300px;height:50px"></textarea>
			</div>
		</div>
		<center style="margin: 10px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-ok" id="doCheckRenterCheckoutOne" onclick="doAddReturning()">保存</a> <!-- 审核 -->
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addReturningDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 进展记录对话框 -->
	<div id="progressDlg" style="padding:6px">
		<table id="progressTable"></table>
	</div>
	<!-- 复核记录对话框 -->
	<div id="returningDlg" style="padding:6px">
		<table id="returningTable"></table>
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
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/upload.js"></script>
</body>
</html>