<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>免租收益</title>
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="js/highcharts.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.landFreeEarnings.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="height:540px;padding:10px;">
		<div style="width:98%;height:48%;border:2px #95B8E7 solid;margin:1%;">
			<div id="thisYear" style="height:100%"></div>
		</div>
		<div style="width:98%;height:48%;border:2px #95B8E7 solid;margin:1%;">
			<div id="nextYear" style="height:100%;"></div>
		</div>
	</div>
</body>
</html>