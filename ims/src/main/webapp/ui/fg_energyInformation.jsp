<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>能源信息</title>
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
			.select {
				background-color: #34B7FF;
				border-radius: 8px;
				color: white;
			}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="clear:both;margin:10px 0 0 10px;"></div>
	<div class="box">
		<!--能源情况-->
	 	<div style="width:350px;height:328px;float:left;margin:0 0 0 20px;border:1px solid #337ab7;border-radius:5px">
	        <div style="background-color: #337ab7;height:40px">
				<div style="color:#ffffff;padding:10px 0 0 15px;font-size:15px">
					能源情况
				</div>
			</div>
			<div class="Details">
			</div>
	    </div>
	    
		<!--设备情况 -->
		<!-- <div style="width:1400px;height:230px; margin:25px 0 5px 5px;float: right;border:2px #95B8E7 solid;padding:10px;"> -->
		<div class="bodyLoadingOver" ></div>
		<div style="width:80%;height:328px;float:left;margin:0 15px 0 20px;border:1px solid #337ab7;border-radius:5px">
			<div style="height:100%;width:100%;">
				<div style="float: right;margin: 5px 0 0 0 ;" id="selectTime">
					<a data-status="1" id="paixu1" style="cursor:pointer;height: 22px; width: 35px; display: inline-block; text-align:center; line-height: 22px;">时</a>
					<a data-status="2" id="paixu2" class="select" style="cursor:pointer;height: 22px; width: 35px; display: inline-block; text-align:center; line-height: 22px;">日</a>
					<a data-status="3" id="paixu3" style="cursor:pointer;height: 22px; width: 35px; display: inline-block; text-align:center; line-height: 22px;">月</a>
				</div>
				<div id="thisYear" style="clear:none;"></div>
			</div>
		</div>
	</div>
	<!-- 	</div> -->
	<!-- 搜索框 -->
	<div class="clearfix" style="margin-top: 10px">
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;" class="search">
			楼盘名称：<input id="addCommunity" onkeyup="searchOnkeyup(this.id, 'queryWEMHouseStore(1, 0)')" style="width:100px;">
		</div>
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;" class="search">
			楼栋：<input id="addBuilding" onkeyup="searchOnkeyup(this.id, 'queryWEMHouseStore(1, 0)')" style="width:100px">
		</div>
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;" class="search">
			门牌号：<input id="addDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryWEMHouseStore(1, 0)')" style="width:100px">
		</div>
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;" class="search">
			公区：<input id="publicArea" onkeyup="searchOnkeyup(this.id, 'queryWEMHouseStore(1, 0)')" style="width:100px">
		</div>
		<div style="margin:5px 0 5px 20px;color:black;font-size:13px;float:left;">
			设备类型：<select id="deviceType" onchange="queryWEMHouseStore(1, 0)" style="width:100px">
				<option value="">全部</option>
				<option value="15">电表</option>
				<option value="14">水表</option>
				<option value="16">电箱</option>
			</select>
		</div>	
	</div>

	<!--设备列表-->
	<div id="DataGridEnergy" style="width:100%;">
	    <table id="EnergyDg" style="width:100%;height:430px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
	           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
	        <thead>
	        <tr>
	            <th field="hsAddDistrict" width="19" align="center">城区</th>
	            <th field="detailedAddress" width="24" align="center">设备安装地址</th>
	            <th field="hsLeaseState" width="19" align="center">租赁状态</th>
	            <th field="deviceType" width="19" align="center">设备类型</th>
	            <th field="devAuthId" width="19" align="center">设备SN码</th>
	        </tr>
	        </thead>
	    </table>
	    	<!--分页 -->
			<div id="energyPageDiv" style="width:100%;text-align:center;"></div>
	</div>

	<jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/renterContImgDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.energyInformation.js"></script>
</body>
</html>