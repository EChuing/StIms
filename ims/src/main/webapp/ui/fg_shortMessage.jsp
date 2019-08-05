<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title></title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="js/config.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="margin:5px 0 0 1%;width:49%;height:auto;float:left;">
			<legend>
				<font style='font-size: 16px;font-family: ' 微软雅黑 ';' color='#50B4D2'>客户短信表</font>
			</legend>
			<div id="DataGridStorefront">
				<div>
					<!--短信工具栏-->
					<div style="height:auto">
						<div id="searchAsset" style="margin:5px 0 0 5px">
							<div style="margin:0 0 5px 61px;color:black;float:left;">
								姓名：<input id="searchMessageUser"
									onkeyup="searchOnkeyup(this.id, 'queryMessage(1, 0)')" style="width:80px">
							</div>
							<div style="margin:0 0 5px 5px;color:black;float:left;">
								电话：<input id="searchMessagePhone"
									onkeyup="searchOnkeyup(this.id, 'queryMessage(1, 0)')" style="width:150px">
								</input>
							</div>
							<div style="margin:0 0 5px 5px;color:black;float:left;">
								类别: <select id="searchMessageSmType" onchange="queryMessage(1,0)"
									style="width:70px">
									<option></option>
								</select>
							</div>
							<div style="clear:both"></div>
							<div style="margin:0 0 5px 5px;color:black;float:left;">
								内容关键字查询: <input id="searchMessageNote" onkeyup="searchOnkeyup(this.id, 'queryMessage(1, 0)')" style="width:80px">
							</div>
							<div style="clear:both"></div>
						</div>
					</div>
				</div>
				<!--短信列表-->
				<div id="DataGridMessage" style="width:100%;height:auto;">
					<table id="messageDg"
						style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
						data-options="rownumbers:false,
								singleSelect:true,
								autoRowHeight:false,
								pageSize:10,
								fitColumns:true,
								scrollbarSize:0">
							<thead>
								<tr>
									<!-- <th field="smId" width="10" align="center">短信编号</th> -->
									<th field="popName" width="10" align="center">姓名</th>		
									<th field="popTelephone" width="10" align="center">电话</th>
									<th field="smState" width="10" align="center" formatter="formatterSmState">发送状态</th>
									<th field="smType" width="10" align="center">类别</th>
									<th field="smTreatmentStatus" width="10" align="center">处理状态</th>
									<th field="smDataTime" width="20" align="center">发送时间</th>
									<th field="smCount" width="10" align="center">短信条数</th>
								</tr>
							</thead>
					</table>
					<!-- 短信分页 -->
					<div id="messagePageDiv" style="width:100%;text-align:center;"></div>
				</div>
			</div>
	</div>
	<div style="margin:5px 0 0 1%;width:49%;height:auto;float:left">
			<legend>
				<font style='font-size: 16px;font-family: ' 微软雅黑 ';' color='#50B4D2'>内部工作短信表</font>
			</legend>
			<!-- 内部短信表 -->
			<div id="internal">
				<div>
					<!--短信工具栏-->
					<div style="height:auto">
						<div id="internal_searchAsset" style="margin:5px 0 0 5px">
							<div style="margin:0 0 5px 61px;color:black;float:left;">
								姓名：<input id="internalSearchMessageUser" onkeyup="searchOnkeyup(this.id, 'internalQueryMessage(1, 0)')"
									style="width:80px">
								</input>
							</div>
							<div style="margin:0 0 5px 5px;color:black;float:left;">
								电话：<input id="internalSearchMessagePhone" onkeyup="searchOnkeyup(this.id, 'internalQueryMessage(1, 0)')"
									style="width:150px">
								</input>
							</div>
							<div style="clear:both"></div>
							<div style="margin:0 0 5px 5px;color:black;float:left;">
								内容关键字查询: <input id="searchMessageNote1" onkeyup="searchOnkeyup(this.id, 'internalQueryMessage(1, 0)')" style="width:80px">
							</div>
							<div style="clear:both"></div>
						</div>
						<div style="clear:both"></div>
					</div>
				</div>
			</div>
			<!--短信列表-->
			<div id="internal_DataGridMessage" style="width:100%;height:auto;">
				<table id="internal_messageDg"
					style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
					data-options="rownumbers:false,
						singleSelect:true,
						autoRowHeight:false,
						pageSize:10,
						fitColumns:true,
						scrollbarSize:0">
					<thead>
						<tr>
							<!-- <th field="smId" width="10" align="center">短信编号</th> -->
							<th field="suStaffName" width="10" align="center">姓名</th>		
							<th field="smUserContacts" width="10" align="center">电话</th>
							<th field="smState" width="10" align="center" formatter="formatterSmState">发送状态</th>
							<th field="smType" width="10" align="center">类别</th>
							<th field="smDataTime" width="20" align="center">发送时间</th>
							<th field="smCount" width="10" align="center">短信条数</th>
						</tr>
					</thead>
				</table>
				<!-- 内部短信分页 -->
				<div id="internal_messagePageDiv" style="width:100%;text-align:center;"></div>
			</div>
	</div>
	<!-- 外部短信查看 -->
	<div id="readonlyMessageDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<fieldset style='margin:0 0 10px 0;'>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>短信信息</font>
			</legend>
			<div style='margin:5px 0 0 2px;float: left;'>
				短信编号：<input style="width:130px" readonly='readonly'
					class="messageId"> <input style="display:none"
					class='message_index'>
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				类&emsp;&emsp;别：<input style="width:130px" readonly='readonly'
					class="messageType">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				发送状态：<input style="width:130px" readonly='readonly'
					class="messageStatus">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				短信条数：<input style="width:130px" readonly='readonly'
					class="messageCount">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				处理状态：<input style="width:130px" readonly='readonly'
					class="messageTreatmentStatus">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				姓&emsp;&emsp;名：<input style="width:130px" readonly='readonly'
					class="messageName">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				电&emsp;&emsp;话：<input style="width:130px" readonly='readonly'
					class="messagePhone">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				发送时间：<input style="width:130px" readonly='readonly'
					class="messageTime">
			</div>
			<div style='clear:both;'>
				<div style='margin:5px 0 0 2px;float: left;'>短信内容：</div>
				<div style='margin:5px 0 0 1px;float: left;'>
					<textarea style="width:325px;height:100px;" readonly='readonly'
						class="messageContent"></textarea>
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>接口返回：</div>
				<div style='margin:5px 0 0 1px;float: left;'>
					<textarea style="width:326px;height:100px;" readonly='readonly'
						class="messageField"></textarea>
				</div>
		</fieldset>
		<div style="clear:both"></div>
		<center id='readStatus'>
			<a  class="easyui-linkbutton"
			iconcls="icon-up" onclick="laterOrNext(0)"> 上一条</a> <a
			 class="easyui-linkbutton"
			onclick="$('#readonlyMessageDlg').dialog('close')"
			iconcls="icon-cancel" onclick="">关闭</a> <a display="none"
			 class="easyui-linkbutton"
			iconcls="icon-ok" onclick="updateShotMessage()">已读</a><a
			 class="easyui-linkbutton"
			iconcls="icon-down" onclick="laterOrNext(1)"> 下一条</a>
		</center>
	</div>
	<!-- 内部短信查看 -->
	<div id="internal_readonlyMessageDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<fieldset style='margin:0 0 10px 0;'>
			<legend>
				<font style='font-size: 12px;font-family: ' 微软雅黑 ';' color='#50B4D2'>短信信息</font>
			</legend>
			<div style='margin:5px 0 0 2px;float: left;'>
				短信编号：<input style="width:130px" readonly='readonly'
					class="internal_messageId"> <input style="display:none"
					class='internal_message_index'>
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				类&emsp;&emsp;别：<input style="width:130px" readonly='readonly'
					class="internal_messageType">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				发送状态：<input style="width:130px" readonly='readonly'
					class="internal_messageStatus">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				短信条数：<input style="width:130px" readonly='readonly'
					class="internal_messageCount">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				姓&emsp;&emsp;名：<input style="width:130px" readonly='readonly'
					class="internal_messageName">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				电&emsp;&emsp;话：<input style="width:130px" readonly='readonly'
					class="internal_messagePhone">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				发送时间：<input style="width:130px" readonly='readonly'
					class="internal_messageTime">
			</div>
			<div style='clear:both;'>
				<div style='margin:5px 0 0 2px;float: left;'>短信内容：</div>
				<div style='margin:5px 0 0 1px;float: left;'>
					<textarea style="width:325px;height:100px;" readonly='readonly'
						class="internal_messageContent"></textarea>
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>接口返回：</div>
				<div style='margin:5px 0 0 1px;float: left;'>
					<textarea style="width:326px;height:100px;" readonly='readonly'
						class="internal_messageField"></textarea>
				</div>
		</fieldset>
		<div style="clear:both"></div>
		<center>
			<a  class="easyui-linkbutton"
				iconcls="icon-up" onclick="internalLaterOrNext(0)"> 上一条</a> <a
				 class="easyui-linkbutton"
				onclick="$('#internal_readonlyMessageDlg').dialog('close')"
				iconcls="icon-cancel" onclick="">关闭</a> <a
				 class="easyui-linkbutton"
				iconcls="icon-down" onclick="internalLaterOrNext(1)"> 下一条</a>
		</center>
	</div>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.shortMessage.js"></script>
</body>
</html>