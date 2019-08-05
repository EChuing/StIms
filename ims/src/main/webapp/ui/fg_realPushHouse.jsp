<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>精选房源发布</title>
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
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="padding:5px 0 0 5px;">
		<a class="easyui-linkbutton" iconCls="icon-fabu" plain="true" id="" onclick="">发布房源</a>
		<a class="easyui-linkbutton" iconCls="icon-bianji" plain="true" id="" onclick="">修改并重新发布</a>
		<a class="easyui-linkbutton" iconCls="icon-shangjia" plain="true" id="" onclick="">上架/下架</a>
		<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="">刷新</a>
		<a class="easyui-linkbutton" iconCls="icon-bangding" plain="true" onclick="">账号绑定</a>
	</div>
	<img src="img/58同城-双核保真业务开通流程.png" style="width:100%;">
	<script src="js/fg.public.js"></script>
</body>
</html>