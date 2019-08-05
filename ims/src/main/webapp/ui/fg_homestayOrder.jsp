<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>订单查询</title>
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
	
	<!--短租订单管理工具-->
	<div>
		<div style="padding:10px 0 10px 5px;display:flex;">
			<div style="margin:0 0 0 10px">
				门店:<input id="searchHsAddCommunity" onkeyup="getAllShortRentOrder(1,0)" style="width:100px" />
			</div>
			<div style="margin:0 0 0 10px">
				门牌号:<input id="searchHsAddDoorplateno" onkeyup="getAllShortRentOrder(1,0)" style="width:100px" />
			</div>
			<div style="margin:0 0 0 10px">
				租客姓名:<input id="searchRenterName" onkeyup="getAllShortRentOrder(1,0)" style="width:100px" />
			</div>
			<div style="margin:0 0 0 10px">
				合约时间： <input id="searchOrderStartTime" style="width:80px" type="text"
					onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchOrderEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:getAllShortRentOrder(1,0)})">
				到 <input id="searchOrderEndTime" style="width:80px" type="text"
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchOrderStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:getAllShortRentOrder(1,0)})">
			</div>
			<div style="margin:0 0 0 10px;float:left;">
				入住类型：<select id="searchHouseType" onChange="getAllShortRentOrder(1,0)">
				<option value="">全部</option>
				<option value="普通客房">普通客房</option>
				<option value="钟点客房">钟点客房</option>
				<option value="免费客房">免费客房</option>
				<option value="未入住">未入住</option>
				</select>
			</div>
			<div style="margin:0 0 0 10px">
				订单状态: <select id="searchOrderState" onChange="getAllShortRentOrder(1,0)" style="width:100px;">
					<option value="">全部</option>
					<option value="在住">在住</option>
					<option value="退房">退房</option>
					<option value="保留">保留</option>
					<option value="预定">预定</option>
					<option value="退定中">退定中</option>
					<option value="退定">退定</option>
					<option value="取消保留">取消保留</option>					
				</select>
			</div>
		</div>
	</div>
	
	<div id="shortRentOrderGrid" style="width:98%;height:80%;margin:0 15px 0 15px;">
		<table id="shortRentOrderDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="hsRoomType" width="15" align="center">房型</th>
					<th field="address" width="15" align="center">地址</th>
					<th field="renterName" width="15" align="center">租客</th>
					<th field="jsrcTotalDays" width="15" align="center">总天数</th>
					<th field="jsrcDailyPrice" width="15" align="center">日单价</th>
					<th field="jsrcTotalPrice" width="10" align="center">总价</th>
					<th field="jsrcDeposit" width="10" align="center">押金</th>
					<th field="jsrcBeginTime" width="10" align="center">入住时间</th>
					<th field="jsrcEndTime" width="10" align="center">退房时间</th>
					<th field="jsrcState" width="15" align="center">状态</th>
					<th field="suStaffName" width="15" align="center">登记人</th>
					<th field="jsrcRegistrationTime" width="15" align="center">登记时间</th>
				</tr>
			</thead>
		</table>
		<div id="shortRentOrderPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
	<div id="downFollowInfo" style="padding:6px;display:none;">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>跟进时间：</td>
						<td colspan="3"><span id="readDownFollowtime" clano="clano"></span></td>
					</tr>
					<tr>
						<td>操作人：</td>
						<td><span id="readDownFollowregistrantName" clano="clano"></span></td>
						<td>跟进类型：</td>
						<td><span id="readDownFollowtype" clano="clano"></span></td>
					</tr>
					<tr>
						<td>操作记录：</td>
						<td colspan="3" style="text-align:left"><span id="readDownFollowtext" clano="clano"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	
	<jsp:include page="/ui/fg_homestayOrderDetails.jsp"></jsp:include> 
	<script src="js/fg.public.js"></script>
	<script src="js/fg_homestayOrder.js"></script>
</body>
</html>