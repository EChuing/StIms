<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/config.js"></script>
	<script type="text/javascript" src="js/fg.public.js"></script>
	<script type="text/javascript" src="js/mogo_house.js"></script>
</head>
<body>
 	<div style="margin:5px 0 5px 15px;font-size:13px;float:left;">
		选择时间区域：<input id="startTime" style="width:80px" class="Wdate"
			type="text"
			onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:show()})" >&nbsp;到
		&nbsp;<input id="endTime" style="width:80px" class="Wdate"
			type="text"
			onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:show()})" >
	</div>
	<div style="clear:both;"></div>
	<div id= 'main1' style='margin:50px 0 0 0;width:100%;height:auto;display:none'>
		<div id="container_0" style="width:33%;height:auto;float:left;"></div>
		<div id="container_1" style="width:33%;height:auto;float:left;"></div>
		<div id="container_2" style="width:33%;height:auto;float:left;"></div>
	</div>
	<div id='main2' style='text-align:center;margin:50px 0 0 0;display:none;'>没有数据！</div>
</body>
</html>