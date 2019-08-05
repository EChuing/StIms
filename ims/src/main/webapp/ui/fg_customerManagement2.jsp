<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>客户信息</title>
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
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
  	<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
  	<link href="css/upload.css" rel="stylesheet">
  	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="padding:5px 0 5px 5px">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-yixiangren" onclick="addCustomer()" id="addCustomerButton">添加客户</a> 
			<a class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="advancedScreening(1)" id="screening">高级筛选</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateCustomerButton" onclick="updateCustomer()">修改客户信息</a>
		</div>
	</div>
	<div class="advancedScreening">
		<div class="advanced1"style="margin: 0 0 0 5px">
			<div style="margin:0 0 5px 5px;float:left;">
				姓名：<input id="searchCustomerName" onkeyup="searchOnkeyup(this.id, 'queryCustomer(1, 0)')"
					style="width:80px">
			</div>
			<div style="margin:0 0 5px 10px;float:left;">
				电话：<input id="searchCustomerPhone" onkeyup="searchOnkeyup(this.id, 'queryCustomer(1, 0)')"
					style="width:80px">
			</div>
			<div style="margin:0 0 5px 10px;float:left">
				状态：<select id="searchCustomerState" style="width:100px;" onchange="queryCustomer(1,0)">
					<option value="">全部</option>
					<option value="潜在客户">潜在客户</option>
					<option value="意向客户">意向客户</option>
					<option value="暂缓">暂缓</option>
					<option value="报备">报备</option>
					<option value="无效">无效</option>
				</select>
			</div>
			<div style="padding:0 0 5px 10px;float:left;">
				登记人：<input id="searchRegisterShowUserInfo" class="choose_user_button" doFlag="searchRegister" doFun="queryCustomer(1,0)"
					style="width:150px;cursor:pointer;" readonly="readonly" clear="clear" require="require" >
				<input id="searchRegisterGetUserStoreId" type="hidden">
				<input id="searchRegisterGetUserDetId" type="hidden">
				<input id="searchRegisterGetUserId" type="hidden">
				<div id="searchRegisterShowUserInfoDiv" style="display:none;"></div>
			</div>
			<!-- <div style="margin:0 0 5px 5px;float:left;">
				时间段：<input id="searchTimeStart"
					onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryIntended(1,0)})"
					style="width:80px"> 至：<input id="searchTimeEnd"
					onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryIntended(1,0)})"
					style="width:80px">
			</div> -->
		</div>
	</div>
	<div id="intended_index" style="display:none"></div>
	<!--客户信息列表-->
	<div id="DataGridCustomer" style="width:100%;height:90%;">
		<input hidden="hidden" id="index">
		<table id="customerDg" style="width:100%;height:503px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			
			<thead>
				<tr>
					<th field="cocContacts" width="15" align="center">联系人</th>
					<th field="cocPhone" width="20" align="center">电话号码</th>
					<th field="cocCompany" width="20" align="center">公司名称</th>
					<th field="cocFixedTelephone" width="10" align="center">固定电话</th>
					<th field="cocGrade" width="10" align="center">客户等级</th>
					<th field="cocType" width="10" align="center">类型</th>
					<th field="address" width="20" align="center">收货地址</th>
					<th field="cocRelation" width="15" align="center">关系</th>
					<th field="cocSource" width="20" align="center">来源</th>
					<th field="cocRegisterTime" width="16" align="center">登记日期</th>
					<th field="cocUsername" width="10" align="center">登记人</th>
				</tr>
			</thead>
		</table>
		<!-- 客户列表分页 -->
		<div id="customerPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
	<!-- 添加客户 -->
	<div id="addCustomerDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		
		<div style="margin:8px 0 0 34px;float:left">
			姓名：<input id="addpopName" style="width:80px" require="require">
		</div>
		<div style="margin:8px 0 0 40px;float:left">
			电话：<input id="addpopPhone" style="width:100px" require="require">
		</div>
		<div style="margin:8px 0 0 24px;float:left;position:relative;">
			联系人岗位：<select id="contactsPost" style="width:90px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 29px;float:left;position:relative;">
			来源：<select id="source" style="width:90px;">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			公司名称：<input id="company" style="width:110px;">
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			简称：<input id="abbreviation" style="width:100px;">
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			网址：<input id="url" style="width:100px;">
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			状态：<select id="addCocState" style="width:140px;" needs="1">
				<option></option>
				<option value="潜在客户">潜在客户</option>
				<option value="意向客户">意向客户</option>
				<option value="报备">报备</option>
				<option value="无效">无效</option>
			</select>
		</div>
		
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			客户等级：<select id="grade" style="width:100px;">
				<option></option>
				<option value="普通客户">普通客户</option>
				<option value="代理商">代理商</option>
				<option value="经销商">经销商</option>
			</select>
		</div>
		<div style="margin:8px 0 0 20px;float:left">
			关系：<select id="relation" style="width:100px;">
				<option value="一般" selected="selected">一般</option>
				<option value="密切">密切</option>
				<option value="较好">较好</option>
				<option value="较差">较差</option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			类型：<select id="type" style="width:100px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			规模：<select id="scale" style="width:140px;">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			固定电话：<input id="fixedTelephone" style="width:100px;">
		</div>
		<div style="margin:5px 0 0 20px;float:left">
			邮箱：<input id="email" style="width:100px;">
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			地区：<input id="community" style="width:100px;" require="require">
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			地址：<input id="detailedAddress" style="width:140px;" require="require" placeholder="如：xx街道10号楼5层503室">
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			登记时间：<input id="addRegistrationTime" style="width:100px;" disabled="disabled">
		</div>
		<div style="margin:8px 0 0 12px;float:left">
			登记人：<input id="addCocUsername" style="width:90px;" disabled="disabled">
			<input id="addipUserId" style="display:none">
		</div>
		<div style="margin:8px 0 0 12px;float:left">
			<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="">附件</a>
		</div>
		<div style="clear:both"></div>
		<center>
			<div style="height:20px;"></div>
			<a id="addSaveButton" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddCustomer()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addCustomerDlg').dialog('close')">取消</a>
		</center>
	</div>
	
	<div id="customerInformation" class="easyui-dialog" data-options="closed:true">
		<input style="display:none" class='customr_index'>
		<div id='u1' style='margin:20px 0 0 5px;'>
			<div id='u1_div1' style='margin:0 0 0 12px;float: left;'>
				客户状态：<select class="add_u1_text1_state" disabled="disabled"style="width:110px;">
				</select>
			</div>
			<div id='u1_div2' style='margin:0 0 0 42px;float: left;'>
				客户来源：<select class="add_u1_text2_state" disabled="disabled"style="width:110px;">
				</select>
			</div>
			<div id='u1_div3' style='margin:0 0 0 20px;float: left;'>
				上级客户：<input type="text" id="u1_txt3" disabled="disabled"style="width: 295px;" >
			</div>
      	</div>
      	<div style="clear: both;"></div>
      	<div id='u2' style='margin:10px 0 0 5px;'>
			<div id='u2_div1' style='margin:0 0 0 12px;float: left;'>
				公司名称：<input type="text" id="u2_txt1" disabled="disabled"style="width: 322px;" >
			</div>
			<div id='u2_div2' style='margin:0 0 0 20px;float: left;'>
				公司简称：<input type="text" id="u2_txt2" disabled="disabled"style="width: 107px;" >
			</div>
			<div id='u2_div3' style='margin:0 0 0 20px;float: left;'>
				客户等级：<select class="add_u2_text3_state" disabled="disabled"style="width:107px;">
				</select>
			</div>
      	</div>
      	<div style="clear: both;"></div>
      	<div id='u3' style='margin:10px 0 0 5px;'>
			<div id='u3_div1' style='margin:0 0 0 12px;float: left;'>
				信用代码：<input type="text" id="u3_txt1" disabled="disabled"style="width: 322px;" >
			</div>
			<div id='u3_div2' style='margin:0 0 0 20px;float: left;'>
				客户类型：<select class="add_u3_text2_state"disabled="disabled" style="width:107px;">
				</select>
			</div>
			<div id='u3_div3' style='margin:0 0 0 20px;float: left;'>
				客户规模：<select class="add_u3_text3_state" disabled="disabled"style="width:107px;">
				</select>
			</div>
      	</div>
      	<div style="clear: both;"></div>
      	<div id='u4' style='margin:10px 0 0 5px;'>
			<div id='u4_div1' style='margin:0 0 0 12px;float: left;'>
				联系地址：<input type="text" id="u4_txt1" disabled="disabled"style="width: 509px;" >
			</div>
			<div id='u4_div2' style='margin:0 0 0 20px;float: left;'>
				客户欠结：<input type="text" id="u4_txt2" disabled="disabled"style="width:107px;">
			</div>
      	</div>
      	<div style="clear: both;"></div>
      	<div id='u9' style='margin:10px 0 0 5px;'>
			<div id='u9_div1' style='margin:0 0 0 12px;float: left;'>
				备注信息：<textarea type="text" id="u5_txt1" disabled="disabled"style="width: 322px;height: 43px;" >
					</textarea>
			</div>
			<div id='u9_div2' style='margin:0 0 0 20px;float: left;'>
				最后订单：<input type="text" id="u5_txt2" disabled="disabled"style="width:107px;">
			</div>
			<div id='u9_div3' style='margin:0 0 0 20px;float: left;'>
				关系程度：<input type="text" id="u5_txt3" disabled="disabled"style="width:107px;">
			</div>
			<div id='u9_div4' style='margin:3px 0 0 20px;float: left;'>
				添加时间：<input type="text" id="u5_txt4" disabled="disabled"style="width:107px;">
			</div>
			<div id='u9_div5' style='margin:3px 0 0 32px;float: left;'>
				登记人：<input type="text" id="u5_txt5" disabled="disabled"style="width:107px;">
			</div>
      	</div>
      	<div style="clear: both;"></div>
      	<div id='u5' style='margin:10px 0 0 5px;'>
			<div id='u5_div1' style='margin:0 0 0 12px;float: left;'>
				<a class="easyui-linkbutton" plain="true" iconcls="icon-fangdongheyue" onclick="">报价记录</a>
			</div>
			<div id='u5_div2' style='margin:0 0 0 20px;float: left;'>
				<a class="easyui-linkbutton" plain="true" iconcls="icon-changguikuaijibiao" onclick="addContract()">添加合同</a>
			</div>
			<div id='u5_div3' style='margin:0 0 0 20px;float: left;'>
				<a class="easyui-linkbutton" plain="true" iconcls="icon-chengbenhesuanbiao" onclick="skipToCheckHouse()">订单记录</a>
			</div>
			<div id='u5_div4' style='margin:0 0 0 20px;float: left;'>
				<a class="easyui-linkbutton" plain="true" iconcls="icon-renkouguanli" onclick="">客户关怀</a>
			</div>
			<div id='u5_div5' style='margin:0 0 0 20px;float: left;'>
				<a class="easyui-linkbutton" plain="true" id="addProgressButton" iconcls="icon-follow-up" onclick="addProgressCustomer()">写跟进</a>
			</div>
			<div id='u5_div6' style='margin:0 0 0 20px;float: left;'>
				<a class="easyui-linkbutton" plain="true" id="u6_button" iconcls="icon-yizufangyuedu" onclick="addEvent()">添加审批</a>
			</div>
			<div id='u5_div7' style='margin:0 0 0 20px;float: left;'>
				<a class="easyui-linkbutton" plain="true" id="u7_button" iconcls="icon-shengchenggongzibiao" onclick="addRepair()">添加任务</a>
			</div>
			<div id='u5_div8' style='margin:0 0 0 20px;float: left;'>
				<a class="easyui-linkbutton" plain="true" id="u8_button" iconcls="icon-changguikuaijibiao" onclick="contractManagement()">合同管理</a>
			</div>
      	</div>
      	<div style="clear: both;"></div>
     	<div id='u6' style='margin:12px 12px 12px 12px;'>
     		<table id="uuw" class="easyui-datagrid" style="width:100%;height:160px;table-layout:fixed;overflow:hidden;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
     			<thead>
					<tr>
						<th width="10" align="center" field="proTime">跟进时间</th>
						<th width="10" align="center" field="proUserName">跟进人</th>
						<th width="10" align="center" field="proType">跟进类型</th>
						<th width="10" align="center" field="proMark">跟进内容</th>
					</tr>
				</thead>
     		</table>
		</div>
		<div style="clear: both;"></div>
      	<div id='u7' style='margin:10px 0 0 5px;text-align: center;'>
			
				<a class="easyui-linkbutton" plain="false" iconcls="icon-up" onclick="laterOrNext(0)">上一条</a>
			

				<!-- <a class="easyui-linkbutton" plain="false" iconcls="icon-jiaobanjiaojie" onclick="">看客户</a> -->
			
		
				<a class="easyui-linkbutton" plain="false" iconcls="icon-cancel" onclick="$('#customerInformation').dialog('close')" >关闭</a>
			
			
				<a class="easyui-linkbutton" plain="false" iconcls="icon-down" onclick="laterOrNext(1)">下一条</a>
			
      	</div>
	</div>
	<!-- 写跟进对话框  -->
	<div id="u8Progress" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 0;float: left;'>
		进展时间：<input readonly='readonly' class="add_pro_time" style="width:246px">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'	>
			跟进类型：<select class="add_u8_text2_state" style="width:107px;">
						<option></option>
						<option value="业务跟进">业务跟进</option>
						<option value="系统跟进">系统跟进</option>
				</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'>跟进内容：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea class="add_pro_mark" style="width:246px;height:60px" require="require"></textarea>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddProgressCustomer()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#u8Progress').dialog('close')">取消</a>
		</div>
	</div>
	</div>
	<!-- 跟进详细对话框 -->
	<div id="downFollowInfo1" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>跟进时间：</td>
						<td colspan="3"><span id="readDownFollowtime1"style=""></span></td>
					</tr>
					<tr>
						<td>跟进人：</td>
						<td><span id="readDownFollowname1"></span></td>
					</tr>
					<tr>
						<td>跟进类型：</td>
						<td><span id="readDownFolloType1"></span></td>
					</tr>
					<tr>
						<td>跟进内容：</td>
						<td><span id="readDownFolloMark1"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<!-- 添加审批 -->
	<div id="addApproval" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>归属客户</legend>
			<div style='margin:5px 0 0 0;'>
				审批归属：<input id="addCustomerApproval" style="width:524px;cursor:pointer;"clear="clear" require="require"disabled="disabled">
			</div>
		</fieldset>
		<fieldset>
			<legend>审批信息</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				审批类型：<select id="customerType" style="width:100px;" choose="choose" require="require">
					<option></option>
					<option value="协助">协助</option>
					<option value="报销">报销</option>
					<option value="汇报">汇报</option>
					<option value="付款">付款</option>
					<option value="采购">采购</option>
					<option value="公文">公文</option>
					<option value="请假">请假</option>
					<option value="其他">其他</option>
					<option value="申请">申请</option>
					<option value="投诉">投诉</option>
					<option value="到期续约办理">到期续约办理</option>
				</select>
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				审批人：&emsp;<input id="doEventShowUserInfo" style="width:120px;cursor: pointer;" type="text" 
					readonly="readonly" clear="clear" require="require" class="choose_user_button"  doFlag="doEvent" doFun="">
				<input id="doEventGetUserStoreId" type="hidden" clear="clear">
				<input id="doEventGetUserDetId" type="hidden" clear="clear">
				<input id="doEventGetUserId" type="hidden" clear="clear">
				<div id="doEventShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div id="fujian" style='margin:5px 0 0 12px;float: left;'>
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件</a>
				<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0px;float: left;'>
				审批编号：<input id="customerNumber" style="width:100px" readonly="readonly" clear="clear" require="require">
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				涉及金额：<input id="customerInvolved" type="number" style="width:120px" clear="clear"
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
				<div style='margin:5px 0 0 0px;float: left;'>
					账号名称：<input id="eaBankUsername" style="width:100px" clear="clear">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					开户银行：<input id="eaBankName" style="width:120px" clear="clear">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					银行账号：<input id="eaBankAccountNumber" style="width:160px" clear="clear">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 0px;float: left;'>
					所属之行：<input id="subordinateTrip" style="width:100px" clear="clear">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					账号描述：<input id="accountDescription" style="width:120px" clear="clear">
					</div>
					<div id="accountId2" style='margin:5px 0 0px 12px;float: left;'>
			 		<a class="easyui-linkbutton" iconCls="" plain="false" onclick="addAccount2()">选择账号</a>
				</div>
				<div style="clear:both"></div>
			</div>
			<div style='margin:5px 0 0 0;float: left;'>审批内容：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea id="customerDescribe" style="width:524px;height:80px" clear="clear" require="require"></textarea>
			</div>
		</fieldset>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a id="doAddEventBtn" class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addApproval')){doAddEvent()}">保存</a>
			<a id="doUpdateEventBtn" class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateEvent()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addApproval').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 添加任务对话框 -->
	<div id="addTask" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 12px;float:left;'>
			任务归属：<input class="repair_choseHouse" id="taskAssignment" readonly="readonly" disabled="disabled" style="width:166px;cursor: pointer;" clear="clear" require="require">
			<input id="cocId" style="display:none" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			任务类型：<select id="repair_type_rp" style="width:100px;" clear="clear" require="require">
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
			客户电话：<input class="repair_phone" style="width:100px" clear="clear" >
			<input class="repair_phone2" type="hidden" clear="clear">
			<input class="repair_phone3" type="hidden" clear="clear">
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

	<!-- 银行账号 -->
	<div id="bankAccount2" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div id="bankAccount_div1" style="margin:0 0 0px 12px;">
			<div style="margin:0 0 5px 12px;color:black;font-size:13px;float:left;">
					<label for="bankAccount_div1_bank">账号名称</label> 
					<input style="width:100px;" id="bankAccount_div1_bank" onkeyup="selectAccountReceipt(1,0)">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					<label for="bankAccount_div1_user">开户银行</label> 
					<input style="width:100px;" id="bankAccount_div1_user" onkeyup="selectAccountReceipt(1,0)">
				</div>
		</div>
		<div id="bankAccount_div2"  style="margin:0 0 0px 12px;">
			<table id="bankAccountTable2" style="width:100%;height:240px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="csAccountName" width="15" align="center">账号名称</th>
					<th field="csBank" width="10" align="center">开户银行</th>
					<th field="csAccountUmber" width="10" align="center">银行账号</th>
					<th field="csSubordinateBranch" width="10" align="center">所属账号</th>
					<th field="csAccountDescription" width="10" align="center">账号描述</th>
					
				</tr>
			</thead>
		</table>
			<div id="bankAccountTablePageDiv" style="width:99%;text-align:center;"></div>
		</div>
	</div>

	<div id="updateCustomerDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:20px 0 0 5px;'>
				<label style="display:inline-block;width:70px;text-align: right">客户姓名：</label><input require="require" type="text" id="cocContacts" style="width: 110px">
				<label style="display:inline-block;width:70px;text-align: right">电话号码：</label><input require="require" type="text" id="cocPhone" style="width: 110px">
				<label style="display:inline-block;width:70px;text-align: right">客户岗位：</label><select id="cocContactsPost" style="width: 110px">
					<option></option></select>
				<label style="display:inline-block;width:70px;text-align: right">客户来源：</label><select id="cocSource" style="width: 110px">
					<option></option></select>
		</div>
		<div style='margin:10px 0 0 5px;'>
				<label style="display:inline-block;width:70px;text-align: right">公司名称：</label><input type="text" id="cocCompany" style="width: 294px">
				<label style="display:inline-block;width:70px;text-align: right">公司简称：</label><input type="text" id="cocAbbreviation" style="width: 110px">
				<label style="display:inline-block;width:70px;text-align: right">公司网址：</label><input type="text" id="cocUrl" style="width: 110px">
		</div>
		<div style='margin:10px 0 0 5px;'>
			<label style="display:inline-block;width:70px;text-align: right">固定电话：</label><input type="text" id="cocFixedTelephone" style="width: 110px">
			<label style="display:inline-block;width:70px;text-align: right">公司邮箱：</label><input type="text" id="cocEmail" style="width: 110px">
			<label style="display:inline-block;width:70px;text-align: right">客户状态：</label><select id="cocState" style="width: 110px">
			<option></option>
			<option value="潜在客户">潜在客户</option>
			<option value="意向客户">意向客户</option>
			<option value="报备">报备</option>
			<option value="无效">无效</option>
			</select>
			<label style="display:inline-block;width:70px;text-align: right">客户类型：</label><select id="cocType" style="width: 110px">
			<option></option></select>
		</div>
		<div style='margin:10px 0 0 5px;'>
			<label style="display:inline-block;width:70px;text-align: right">
				联系地址：
			</label><input require="require" type="text" id="cocCommunity" style="width: 200px;text-align: center" placeholder="省-市-区"><input require="require" type="text" id="cocCompanyAbbreviation" style="width: 277px;text-align: center" placeholder="xx街道10号楼5层503室">
			<label style="display:inline-block;width:70px;text-align: right">客户规模：</label><select id="cocScale" style="width: 110px">
			<option></option></select>
		</div>
		<div style='margin:10px 0 0 5px;'>
			<div style="float: left">
				<label style="display:inline-block;width:70px;text-align: right">备注信息：</label><textarea type="text" id="cocNotes" style="width: 294px;height: 53px;" >
				</textarea>
			</div>
			<div style="float: left;margin: 0 0 10px 3px">
				<label style="display:inline-block;width:70px;text-align: right">关系程度：</label><select id="cocRelation" style="width:110px;">
				<option value="一般" selected="selected">一般</option>
				<option value="密切">密切</option>
				<option value="较好">较好</option>
				<option value="较差">较差</option>
				</select>
				<label style="display:inline-block;width:70px;text-align: right">客户等级：</label><select id="cocGrade" style="width:110px;">
				<option></option>
				<option value="普通客户">普通客户</option>
				<option value="代理商">代理商</option>
				<option value="经销商">经销商</option>
				</select>
			</div>
			<div style="float: left;margin: 0 0 0 3px">
				<label style="display:inline-block;width:70px;text-align: right">上级客户：</label><input type="text" id="cocSuperior" disabled="disabled" style="width: 110px">
				<label style="display:inline-block;width:70px;text-align: right">客户欠结：</label><input type="text" id="cocArrears" disabled="disabled" style="width: 110px">
			</div>
		</div>
		<div style="height: 20px;clear: both"></div>
		<div style="margin:0 auto;text-align: center">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateCustomer()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateCustomerDlg').dialog('close')">取消</a>
		</div>
	</div>
	<div id="contract" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 12px;float: left;'>
			合同类型：<select id="contract_type_rp" style="width:100px;" clear="clear" require="require">
				<option value="纸质合同">纸质合同</option>
				<option value="电子合同">电子合同</option>
			</select>
		</div>
		<div style="height: 10px;clear: both"></div>
		<div style='margin:5px 0 0 12px;float: left;'> 
			<a class="easyui-linkbutton" iconCls="icon-chakantupian"plain="false" onclick="openAttachment('private')">
				附件上传
			</a> 
			<span class="attachmentNum"style="vertical-align: middle; line-height: 26px; color: #444;"></span>
		</div>
		<div style="height: 10px;clear: both"></div>
		<fieldset>
			<legend>合同</legend>
			<div style="margin: 5px 0 0 0;">
				<div style="margin:0 0 5px 12px;color:black;font-size:13px;float:left;">
					合同期限：<input class="Wdate" id="addHsBegin" style="width: 100px"clear="clear" require="require"
				onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'addHsEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeAddHsDate()})">
				- 
				<input class="Wdate" id="addHsEnd" style="width: 100px"clear="clear" require="require"
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'addHsBegin\',{d:1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeAddHsDate()})">
				
				</div>
				<div style="margin:0 0 5px 30px;color:black;font-size:13px;float:left;">
					签约时间：<input class="Wdate" id="addHsSigned" style="width: 120px"
					clear="clear" require="require"
					onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeAddHsDate()})">
				</div>
			</div>
			<div style="height: 10px;clear: both"></div>
			<div style="margin: 5px 0 0 0;">
				<div style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;">
					签约人：<input style="width:100px;" id="bankAccount_name">
				</div>
				<div style="margin:0 0 5px 62px;color:black;font-size:13px;float:left;">
					身份证号：<input style="width:200px;" id="bankAccount_remarks" onkeyup="">
				</div>
			</div>
			<div style="height: 10px;clear: both"></div>
			<div style="margin: 5px 0 0 0;">
				<div style="margin:0 0 5px 12px;color:black;font-size:13px;float:left;">
					电话号码：<input style="width:100px;" id="bankAccount_phone">
				</div>
				<div style="margin:0 0 5px 62px;color:black;font-size:13px;float:left;">
					合同编号：<input id="contractNum" style="width: 200px;" clear="clear"
						onkeyup="$(this).val($(this).val().toUpperCase());if(event.keyCode==13){contractNumCheckout(0);}"
						onblur="contractNumCheckout(0)"> 
						<span id="contractNumTips" style="height: 20px; color: red;"clear="clear"></span> 
						<span style="display: inline-block; vertical-align: bottom;"id="usedContractNum" clear="clear"></span>
				</div>
				<!-- <div style="margin:0 0 5px 50px;color:black;font-size:13px;float:left;">
					备注：<input style="width:200px;" id="bankAccount_remarks" onkeyup="">
				</div> -->
			</div>
		</fieldset>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doContract()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#contract').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 合同管理 -->
	<div id="contractManagement" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin: 5px 0 0 8px;" >
			合同类型：
			<select id="contract_management_type_rp" style="width:150px;" onchange="InquiryContract()">
				<option></option>
				<option value="纸质合同">纸质合同</option>
				<option value="电子合同">电子合同</option>
			</select>
		</div>
		<div id="contractManagement2"  style="margin:10px 0 0px 8px;">
			<table id="contractManagementTable" style="width:100%;height:390px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="csName" width="10" align="center">签约人</th>
					<th field="csSigningTime" width="10" align="center">签约时间</th>
					<th field="csCreationTime" width="10" align="center">开始时间</th>
					<th field="csCancellationTime" width="10" align="center">结束时间</th>
					<th field="csContractType" width="10" align="center">签约方式</th>
				</tr>
			</thead>
		</table>
			<div id="contractManagementTablePageDiv" style="width:99%;text-align:center;"></div>
		</div>
	</div>
	<!-- 合约详情 -->
	 <div id="detailsOfTenantContractDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		<input style="display:none" class='detailsOfTenantContract_index'>
		<div style="padding:5px 0 0 10px;">
			<span id="followUpImgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div id="followUpImgWrapper" style="margin:10px 0 0 10px;"></div>
		
	<div>
	<jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/renterContImgDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/fg_customerManagement2.js"></script>
	<script src="js/contractPhotos.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>