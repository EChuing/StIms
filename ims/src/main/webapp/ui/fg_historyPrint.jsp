<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>票据打印</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.historyPrint.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!--业主管理工具-->
	<div>
		<div style="padding:5px 0 5px 5px">
			<a class="easyui-linkbutton" onclick="doHistoryPrint()" id="printButton" iconCls="icon-print" plain="true">打印</a>
			<!--  <span style="padding:5px 0 5px 10px;color:red;font-size:10px;display:inline-block;vertical-align:middle;">
			（ 温馨提示：搜索 业主应付款申请单 时，楼盘名称、楼栋、门牌号必须全部填写完整 ）
			</span>-->
		</div>
	</div>
	<div class="clearfix">
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;" class="search">
			楼盘名称：<input id="addCommunity" onkeyup="queryOnkeyup(this.id,5,0)"
				style="width:100px;">
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;" class="search">
			楼栋：<input id="addBuilding" onkeyup="queryOnkeyup(this.id,3,0)" style="width:100px">
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;" class="search">
			门牌号：<input id="addDoorplateno" onkeyup="queryOnkeyup(this.id,3,0)" style="width:100px">
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;" class="search">
			票据标题：<input id="searchTitle" onkeyup="queryOnkeyup(this.id,3,0)" style="width:100px">
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;" class="special">
			特殊编号：<input id="jhpSpecialNumber" onkeyup="queryOnkeyup(this.id,3,0)" style="width:150px">
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			票据类型：<select id="searchType" onchange="queryOnkeyup(this.id,3,0)" style="width:100px">
				<option value="">全部</option>
				
			</select>
		</div>
	</div>
	<div id="DataGridHistoryPrint">
		<table id="historyPrintDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" data-options="rownumbers:false,
				singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="totalPage" width="40" align="center">票据关联地址/特殊编号</th>
					<th field="jhpType" width="10" align="center">票据类型</th>
					<th field="jhpTitle" width="20" align="center">标题</th>
					<th field="jhpRegisterTime" width="10" align="center">登记时间</th>
					<th field="username" width="10" align="center">登记人</th>
				</tr>
			</thead>
		</table>
		<!-- 历史票据分页 -->
		<div id="historyPrintPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<div id="printDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div id="dlg-toolbar">
		<input type="hidden" id="print_index">
		<table cellpadding="0" cellspacing="0" style="width:100%">
			<tr>
				<td>
					<a href="#" class="easyui-linkbutton" iconCls="icon-print" plain="true" onclick="window.printFrame.print()">打印票据</a>
					<a href="#" class="easyui-linkbutton" iconCls="icon-up" plain="true" onclick="laterOrNext(0)">上一条</a>
					<a href="#" class="easyui-linkbutton" iconCls="icon-down" plain="true" onclick="laterOrNext(1)">下一条</a>
				</td>
			</tr>
		</table>
		<iframe id="printFrame" name="printFrame" style="width:100%;height:500px;">
			
		</iframe>
	</div>
	</div>
</body>
</html>