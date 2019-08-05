<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>客户来源表</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="js/highcharts.js"></script>
	<script src="js/vue.min.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/config.js"></script>
	<style>
		#container {
			padding-top: 10px;
		}
		
		#title{
			width: 100%;
			height: 25px;
			line-height: 25px;
			font-weight: bold;
			font-size: 15px
		}
		
		#right-t{
		    width:100%;
			height:255px;
			border-bottom:1px #95B8E7 solid;
		}
		
		#right-b{
			width:100%;
		}
	</style>
</head>
<body style="min-width:800px">
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div id="container">
		<div style="float:left;width:26%;height:auto;margin-right:0.5%;">
			<table id="customerSourceStatisticsDg" class="easyui-datagrid"
				style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
				data-options="rownumbers:false,singleSelect:true,autoRowHeight:false,pageSize:9,fitColumns:true,scrollbarSize:0">
				<thead>
					<tr>
						<th field="cssTime" width="15" align="center">统计日期</th>
						<th field="cssName" width="20" align="center">报表名称</th>
						<th field="cssType" width="10" align="center">周期</th>
					</tr>
				</thead>
			</table>
			<!-- 列表分页 -->
			<%--<div id="customerSourceStatisticsDiv" style="width:100%;text-align:center;"></div>--%>
			<div id="customerSourceStatisticsPageDiv" style="width:100%;text-align:center;"></div>
		</div>
		<div id="right"
			style="float:left;width:72%;height:542px;color:black;border:1px #95B8E7 solid;overflow:auto;padding:4px">
			<div id="right-t">
				<div>客户来源分布</div>
				<div id="containerAll" style="width:100%;height:230px;float:left"></div>
			</div>
			<div id="right-b">
				<div>各类来源客户转化率</div>
				<div id="containerSort">
					<div id="container1" style="float:left;width:33%;height:240px;margin-top:10px"></div>
					<div id="container2" style="height:262px"></div>
				</div>
			</div>
		</div>
	</div>
	<script src="js/fg.customerSourceStatistics.js"></script>
</body>
</html>