<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>数据日历</title>
	<link href="css/fullcalendar.min.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script	src="js/moment.min.js"></script>
	<script src="js/fullcalendar.min.js"></script>
	<script src="js/config.js"></script>
	<style type="text/css">
		body {
			color:black;
			padding : 10px
		}
		#calendar {
			width: 95%;
			margin: 10px auto 10px auto;
			padding: 10px;
			border:1px solid #d2d2d2;
		}
		.fc-day-grid-event .fc-content {
		    white-space: normal;
		    overflow: visible;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div id="calendar"></div>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.bossCalendar.js"></script>
</body>
</html>

