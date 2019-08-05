<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>合同票据编号</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.contractNum.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<!--合约管理工具-->
		<div>
			<div style="padding:5px 0 5px 5px;">
				<a class="easyui-linkbutton" iconCls="icon-heyuebianhao" plain="true" 
					onclick="addContractNum()" id="addContractNumButton">生成</a>
				<a class="easyui-linkbutton" iconCls="icon-lingqubianhao" plain="true"
					onclick="getContractNum()" id="getContractNumButton">领用</a>
				<a class="easyui-linkbutton" iconCls="icon-bianhaozhuxiao" plain="true"
					onclick="doUpdateContractNum()" id="updateContractNumButton">注销</a>
			</div>
			<div id="searchContract" style="margin:0 0 0 5px">
				<div style="margin:0 0 5px 5px;color:black;float:left;">
					编号：<input id="searchNumPrefix" onkeyup="searchOnkeyup(this.id, 'queryContractNum(1, 0)')"
						style="width:60px"> <input id="searchNum"
						onkeyup="searchOnkeyup(this.id, 'queryContractNum(1, 0)')" style="width:80px">
				</div>
				<div style="margin:0 0 5px 5px;color:black;float:left;">
					领用人：<input id="searchJcdRecipientShowUserInfo" class="choose_user_button" doFlag="searchJcdRecipient" doFun="queryContractNum(1, 0);"
							style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" needs="1">
					<input id="searchJcdRecipientGetUserStoreId" type="hidden" clear="clear">
					<input id="searchJcdRecipientGetUserDetId" type="hidden" clear="clear">
					<input id="searchJcdRecipientGetUserId" type="hidden" clear="clear">
					<div id="searchJcdRecipientShowUserInfoDiv" style="display:none;" clear="clear"></div>
				</div>
				<div style="margin:0 0 5px 5px;color:black;float:left;">
					使用地址：<input id="searchJcdHouseAddress" onkeyup="searchOnkeyup(this.id, 'queryContractNum(1, 0)')" style="width:80px">
				</div>
				<div style="margin:0 0 5px 5px;color:black;float:left;">
					类型：<select id="searchJcdUsedType" style="width:120px"
						onchange="queryContractNum(1,0)">
						<option></option>
						<option value="出租">出租</option>
						<option value="托管">托管</option>
						<option value="票据">票据</option>
						<option value="确认书">确认书</option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;float:left;">
					编号状态：<select id="searchNumState" style="width:120px"
						onchange="queryContractNum(1,0)">
						<option></option>
						<option value="未使用">未使用</option>
						<option value="已领取">已领取</option>
						<option value="已签约">已签约</option>
						<option value="注销">注销</option>
					</select>
				</div>
				<div style="clear:both"></div>
			</div>
		</div>
	</div>
	<!--合同票据列表-->
	<div id="DataGridContractNum" style="width:100%;height:90%;">
		<table id="contractNumDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="jcdUsedType" width="10" align="center">类型</th>
					<th field="totalPage" width="15" align="center">编号</th>
					<th field="jcdUseState" width="10" align="center">状态</th>
					<th field="bornAdultName" width="10" align="center">添加人</th>
					<th field="jcdGenerationTime" width="15" align="center">生成时间</th>
					<th field="recipientName" width="10" align="center">领用人</th>
					<th field="jcdCollectionTime" width="10" align="center">领用时间</th>
					<th field="contractName" width="10" align="center">使用人</th>
					<th field="jcdSigningTime" width="10" align="center">使用时间</th>
					<th field="jcdHouseAddress" width="30" align="center">使用地址</th>
					<th field="cancellationName" width="10" align="center">注销人</th>
					<th field="jcdCancellationTime" width="10" align="center">注销时间</th>
				</tr>
			</thead>
		</table>
		<!-- 合同票据编号分页 -->
		<div id="contractNumPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 生成合同票据编号-->
	<div id="addContractNumDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div style="margin:0 0 5px 41px;height:20px;color:red;">注：编号前缀为纯英文,最多5位,也可以为空;后缀为纯数字．</div>
		<div style="clear:both"></div>
		<div id="settingTips"
			style="margin:0 0 5px 29px;height:20px;color:blue;">示例：1</div>
		<div style="clear:both"></div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			编号前缀：<input id="contractBefor" style="width:120px" needs="1"
				onkeyup="contractShow(0)" maxlength="5" >
		</div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			后缀位数：<select id="contractNums" style="width:120px" needs="1"
				onchange="contractShow(1)">
				<option valie="1">1</option>
				<option valie="2">2</option>
				<option valie="3">3</option>
				<option valie="4">4</option>
				<option valie="5">5</option>
				<option valie="6">6</option>
				<option valie="7">7</option>
				<option valie="8">8</option>
				<option valie="9">9</option>
				<option valie="10">10</option>
			</select>
		</div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			编号用途：<select id="contractJcdNote" style="width:120px" needs="1">
				<option valie=""></option>
				<option valie="出租">出租</option>
				<option valie="托管">托管</option>
				<option valie="票据">票据</option>
				<option valie="确认书">确认书</option>
				</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 5px 5px;color:black;float:left;">
			开始编号：<input id="contractStartNum" style="width:120px" needs="1"
				onkeyup="contractNumLimit(0)" onblur="numberPositiveFomat(this)" >
		</div>
		<div style="margin:5px 0 5px 5px;color:black;float:left;">
			结束编号：<input id="contractEndNum" style="width:120px" needs="1"
				onkeyup="contractNumLimit(1)"onblur="numberPositiveFomat(this)" >
		</div>
		<div style="margin:2px 0 5px 5px;color:black;float:left;">
			<a class="easyui-linkbutton" iconcls="icon-add" onclick="readyShowContractNum();" id="readyContractNum"> 预生成</a>
		</div>
		<div style="margin:5px 0 5px 5px;color:blue;float:left;" id="contractNumNums">
			
		</div>
		<div style="clear:both"></div>
		<div id="readyDiv" style="height:260px">
			<fieldset>
				<legend>
					合同票据编号预生成
				</legend>
				<div id="readyShowDiv" style="height:260px;overflow-x: hidden;overflow-y: auto ;">
				</div>
			</fieldset>
		</div>
		<div style="clear:both"></div>
		<center style="margin-top:30px">
			<div id="settingAddTips" style="height:20px;color:red;"></div>
			<a  class="easyui-linkbutton"
				iconcls="icon-add" onclick="doAddContractNum();"
				id="doAddContractNum">保存</a><a 
				class="easyui-linkbutton"
				onclick="$('#addContractNumDlg').dialog('close')"
				iconcls="icon-cancel">关闭</a>
		</center>

	</div>
	<!-- 领取合同票据编号-->
	<div id="getContractNumDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			开始编号：<input id="getContractStartNum" style="width:150px" needs="1" disabled="disabled" >
		</div>
		<div style="clear:both"></div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			结束编号：<input id="getContractEndNumPrefix" style="width:45px" disabled="disabled" > 
			<input id="getContractEndNumSuffix" onkeyup="numberPositiveFomat(this)" onblur="numberPositiveFomat(this)" style="width:102px" needs="1">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 17px;float: left;'>
			领用人：<input id="getNumStaffShowUserInfo" class="choose_user_button" doFlag="getNumStaff" doFun=""
					style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" needs="1">
			<input id="getNumStaffGetUserStoreId" type="hidden" clear="clear">
			<input id="getNumStaffGetUserDetId" type="hidden" clear="clear">
			<input id="getNumStaffGetUserId" type="hidden" clear="clear">
			<div id="getNumStaffShowUserInfoDiv" style="display:none;" clear="clear"></div>
		</div>
		<div style="clear:both"></div>
		<center style="margin-top:10px">
			<div id="settingGetTips" style="height:20px;color:red;"></div>
			<a class="easyui-linkbutton" iconcls="icon-lingqubianhao" onclick="doGetContractNum();" id="doGetContractNum">领取</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#getContractNumDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 注销功能 -->
	<div id="logout" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div>
			确定注销此合同票据编号吗？请输入注销原因。
		</div>
		<div style="margin: 5px 0 20px 0" class="clearfix">
			<div style="float:left">
				注销原因 : 
			</div>
			<div style="float:left">
			    <textarea id="jcdCancellationReason" style="width:300px;height:80px" clear="clear"></textarea>
			</div>
		</div>
		<div>
			<center>
				<a class="easyui-linkbutton" iconcls="icon-save" id="housingReleaseSettings" onclick="updateContractNumState()">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#logout').dialog('close')">取消</a>
			</center>
		</div>
	</div>
	<!-- 编号详情界面 -->
	<div id="detailDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:0 0 5px 26px;color:black;float:left;" >
			类 型：<input id="pjcdUsedType" style="width:125px" readonly="readonly" clear="clear">
		</div>
		<input class="detail_index" style="display:none">
		<div style="margin:0 0 5px 25px;color:black;float:left;">
			编 号：<input id="ptotalPage" style="width:125px" readonly="readonly" clear="clear">
		</div>
		<div style="margin:0 0 5px 25px;color:black;float:left;">
			状 态：<input id="pjcdUseState" style="width:125px" readonly="readonly" clear="clear">
		</div>
		
		<div style="clear:both; height: 0; line-height: 0; font-size: 0"></div>
		
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			添加用户：<input id="pbornAdultName" style="width:125px" readonly="readonly" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			生成时间：<input id="pjcdGenerationTime" style="width:125px" readonly="readonly" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			领用用户：<input id="precipientName" style="width:125px" readonly="readonly" clear="clear">
		</div>
		
		<div style="clear:both; height: 0; line-height: 0; font-size: 0"></div>
		
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			领取时间：<input id="pjcdCollectionTime" style="width:125px" readonly="readonly" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			使用用户：<input id="pcontractName" style="width:125px" readonly="readonly" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			使用时间：<input id="pjcdSigningTime" style="width:125px" readonly="readonly" clear="clear">
		</div>
		
		<div style="clear:both; height: 0; line-height: 0; font-size: 0"></div>
		
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			使用地址：<input id="pjcdHouseAddress" style="width:125px" readonly="readonly" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			注销用户：<input id="pcancellationName" style="width:125px" readonly="readonly" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			注销时间：<input id="pjcdCancellationTime" style="width:125px" readonly="readonly" clear="clear">
		</div>
		
		<div style="clear:both; height: 0; line-height: 0; font-size: 0"></div>
		
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			<div style="float:left">注销原因：</div>
			<textarea id="pjcdCancellationReason" style="width:505px;height:60px"></textarea>
		</div>
		<div style='margin:20px 0 0 0;text-align:center;'>
			<a  class="easyui-linkbutton" iconcls="icon-up" onclick="detailLaterOrNext(0)">上一条</a>
			<a  class="easyui-linkbutton" iconcls="icon-down" onclick="detailLaterOrNext(1)">下一条</a>
		</div>
	</div>
</body>
</html>