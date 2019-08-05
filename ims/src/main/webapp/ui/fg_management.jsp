<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>设备预警</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.SuperSlide.2.1.2.js"></script>
	<script src="js/highcharts.js"></script>
	<script src="js/config.js"></script>
	<style type="text/css">
		.box{
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: flex-start;
				align-items: flex-start;
				align-content: flex-start;
				width:100%;
			}
		.notice {
		 width: 97%;/*单行显示，超出隐藏*/
		 height: 300px;/*固定公告栏显示区域的高度*/
		 overflow: hidden;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="clear:both;margin:10px 0 0 10px;"></div>
	<div class="box">
		<!--当前警示-->
	 	<div style="width:350px;height:300px;float:left;margin:0 0 0 20px;border:1px solid #337ab7;border-radius:5px">
	 		<audio src="video/warningTone.mp3" id="music" controls="controls"loop="loop" style="display: none;"></audio>
	        <div style="background-color: #337ab7;height:40px">
				<div style="color:#ffffff;padding:10px 0 0 15px;font-size:15px">
					当前警情
				</div>
			</div>
			<div class="wrap">
			    <div class="notice">
			        <ul>
			        </ul>
			    </div>
			</div>
	    </div>
	    
		<!--设备情况 -->
		<!-- <div style="width:1400px;height:230px; margin:25px 0 5px 5px;float: right;border:2px #95B8E7 solid;padding:10px;"> -->
		<div class="bodyLoadingOver" ></div>
		<div style="width:80%;height:300px;float:left;margin:0 15px 0 20px;border:1px solid #337ab7;border-radius:5px">
			<div style="height:100%;width:100%;">
				<div id="thisYear"></div>
			</div>
		</div>
	</div>
	<!-- 	</div> -->
	<!-- 搜索框 -->
	<div class="clearfix" style="margin-top: 10px">
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;" class="search">
			楼盘名称：<input id="addCommunity" onkeyup="searchOnkeyup(this.id, 'queryAlarmRecord(1, 0)')" style="width:100px;">
		</div>
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;" class="search">
			楼栋：<input id="addBuilding" onkeyup="searchOnkeyup(this.id, 'queryAlarmRecord(1, 0)')" style="width:100px">
		</div>
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;" class="search">
			门牌号：<input id="addDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryAlarmRecord(1, 0)')" style="width:100px">
		</div>
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;" class="search">
			公区：<input id="publicArea" onkeyup="searchOnkeyup(this.id, 'queryAlarmRecord(1, 0)')" style="width:100px">
		</div>
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;">
			设备类型：<select id="deviceType" onchange="queryAlarmRecord(1, 0)" style="width:100px">
				<option value="">全部</option>
				<option value="9">烟感报警器</option>
				<option value="14">公寓水表</option>
			</select>
		</div>	
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;">
			<input type="checkbox" name="merge" value="Bike" id="merge"  onclick="alarmMerge()"/><span style="color:black;font-size:13px;">将十分钟内重复报警的合并</span>
		</div>	
	</div>

<!-- 添加进展对话框 -->
<div id="addProgressDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true" >
	<div style='margin:5px 0 0 0;float: left;'>
		进展时间：<input readonly='readonly' class="add_pro_time" style="width:246px">
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

<div id="handleAlarmDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
	<input id="index" hidden="hidden">
	<div style='margin:0 0 5px 10px;float: left;'>
		<a class="easyui-linkbutton" iconcls="icon-follow-up" plain="true" id="writeProgress" onclick="addProgress()">写进展</a>
	</div>
	<div style="clear:both"></div>
	<div style='margin:10px 0 0 5px;width:99%;height:260px;'>
		<table id="showProgressTable" class="easyui-datagrid" style="width:100%;height:250px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0"> 
			<thead>
				<tr>
					<th width="20" align="center" field="proTime">进展时间</th>
					<th width="20" align="center" field="proUserName">跟进人</th>
					<th width="40" align="center" field="proMark">跟进内容</th>
				</tr>
			</thead>
		</table>
	</div>
	
</div>
	
<!--设备列表-->
<div id="DataGridAlarm" style="width:100%;">
    <table id="AlarmDg" style="width:100%;height:450px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
        <thead>
        <tr>
            <th data-options="field:'ck',checkbox:true"></th>
            <th field="hsAddDistrict" width="10" align="center">城区</th>
            <th field="detailedAddress" width="15" align="center">设备安装地址</th>
            <th field="hsLeaseState" width="10" align="center">租赁状态</th>
            <th field="devNickname" width="10" align="center">设备类型</th>
            <th field="jdwSn" width="10" align="center">设备SN码</th>
            <th field="jdwWarningTime" width="10" align="center">报警时间</th>
            <th field="jdwHandleResult" width="25" align="center" formatter = "newestHandleResult">最新处理结果</th>
            <th field="jdwHandleStatus" width="10" align="center">处理状态</th>
        </tr>
        </thead>
    </table>
    	<!--分页 -->
		<div id="alarmPageDiv" style="width:100%;text-align:center;"></div>
</div>

	<jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/renterContImgDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.management.js"></script>
</body>
</html>