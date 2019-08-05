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
	<!-- 微信账单工具栏 -->
	<div style="height:auto">
		<div style="margin:10px 0 10px 5px;color:black;font-size:13px;float:left">
			楼盘名称：<input id="searcAddCommunity" style="width:80px;" onkeyup="queryWxPayment(1,0)">
		</div>
		<div style="margin:10px 0 5px 5px;color:black;font-size:13px;float:left">
			楼栋：<input id="searcAddBuilding" style="width:80px;" onkeyup="queryWxPayment(1,0)">
		</div>
		<div style="margin:10px 0 5px 5px;color:black;font-size:13px;float:left">
			门牌号：<input id="searcAddDoorplateno" style="width:80px;" onkeyup="queryWxPayment(1,0)">
		</div>
		<div style="clear:both"></div>
	</div>
	<!--微信账单列表-->
	<div id="DataGridWxPaymen" style="width:100%;height:85%;">
		<table id="wxPaymenDg"
			style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				fitColumns:true,
				scrollbarSize:0">
			<thead>
				<tr>
					<th field="addCommunity" width="40" align="center">楼盘名称</th>
					<th field="jciPeriods" width="10" align="center">账单期数</th>
					<th field="popName" width="10" align="center">付款人姓名</th>
					<th field="wxpDescribe" width="20" align="center">支付描述</th>
					<th field="wxpTradeNo" width="30" align="center">订单号</th>
					<th field="wxpTotalFee" width="12" align="center" formatter="formatwxpTotalFee">总金额</th>
					<th field="wxpState" width="10" align="center" formatter="formatwxpState">支付状态</th>
					<th field="wxpGmtCreate" width="20" align="center">订单生成时间</th>
				</tr>
			</thead>
		</table>
		<div id="wxPaymenPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<div id="wxPaymenDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input class="wxPayment_index" type="hidden">
		<center>
				<table class="xwtable3" style="margin-top:10px;">
					<tbody>
						<tr>
							<td>楼盘名称:</td>
							<td colspan="3"><span id="readaddCommunity"></span></td>
							<td>支付状态:</td>
							<td colspan="2"><span id="readwxpState"></span></td>
						</tr>
						<tr>
							<td>订单生成时间:</td>
							<td colspan="2"><span id="readwxpGmtCreate"></span></td>
							<td>实际付款时间:</td>
							<td colspan="2"><span id="readwxpGmtPay"></span></td>
						</tr>
						<tr>
							<td>订单号:</td>
							<td colspan="3"><span id="readwxpTradeNo"></span></td>
							<td>总金额:</td>
							<td><span id="readwxpTotalFee"></span></td>
						</tr>
						<tr>
							<td>付款人姓名:</td>
							<td><span id="readpopName"></span></td>
							<td>付款人联系电话:</td>
							<td><span id="readpopTelephone"></span></td>
							<td>账单期数:</td>
							<td><span id="readjciPeriods"></span></td>
						</tr>
						<tr>
							<td>支付描述:</td>
							<td colspan="5"><span id="readwxpDescribe"></span></td>
						</tr>
						<tr>
							<td>水表:</td>
							<td colspan="5">
								<div style="display:block;float:left;color:#666666;" >上次读数：</div><span style="display:block;width:80px;float:left" id="readlastwater"></span>
								<div style="display:block;float:left;color:#666666;">本次读数：</div><span style="display:block;width:80px;float:left" id="readwaterNum"></span>
								<div style="display:block;float:left;color:#666666;">差值：</div><span style="display:block;width:80px;float:left" id="readwaterSub"></span>
								<div style="display:block;float:left;color:#666666;">金额：</div><span style="display:block;width:80px;float:left" id="readchargeForWater"></span>
							</td>
						</tr>
						<tr>
							<td>电表:</td>
							<td colspan="5">
								<div style="display:block;float:left;color:#666666;" >上次读数：</div><span style="display:block;width:80px;float:left" id="readlastelectrit"></span>
								<div style="display:block;float:left;color:#666666;">本次读数：</div><span style="display:block;width:80px;float:left" id="readelectritNum"></span>
								<div style="display:block;float:left;color:#666666;">差值：</div><span style="display:block;width:80px;float:left" id="readelectricitySub"></span>
								<div style="display:block;float:left;color:#666666;">金额：</div><span style="display:block;width:80px;float:left" id="readelectricityFees"></span>
							</td>
						</tr>
						<tr>
							<td>燃气表:</td>
							<td colspan="5">
								<div style="display:block;float:left;color:#666666;" >上次读数：</div><span style="display:block;width:80px;float:left" id="readlastgas"></span>
								<div style="display:block;float:left;color:#666666;">本次读数：</div><span style="display:block;width:80px;float:left" id="readgasNum"></span>
								<div style="display:block;float:left;color:#666666;">差值：</div><span style="display:block;width:80px;float:left" id="readgasSub"></span>
								<div style="display:block;float:left;color:#666666;">金额：</div><span style="display:block;width:80px;float:left" id="readgasFee"></span>
							</td>
						</tr>
						<tr>
							<td>租金:</td>
							<td><span id="readhouseRent"></span></td>
							<td>管理费:</td>
							<td><span id="readhrManageCost"></span></td>
							<td>欠结金额:</td>
							<td><span id="readhrBase"></span></td>
						</tr>
						<tr>
							<td>电视费:</td>
							<td><span id="readhrTvCharge"></span></td>
							<td>网络费:</td>
							<td><span id="readhrWifiCharge"></span></td>
							<td>服务费:</td>
							<td><span id="readhrServerCost"></span></td>
						</tr>
						<tr>
							<td>其他费用:</td>
							<td><span id="readhrOtherPay"></span></td>
							<td>滞纳金:</td>
							<td><span id="readlateFee"></span></td>
							<td colspan="2"></td>
						</tr>
						</tr>
						<tr>
							<td>缴费归属周期:</td>
							<td colspan="5"><span style="display:block;float:left;margin-left:170px" id="readjciBeginPeriods"></span> <div style="display:block;float:left;color:blue;" >&nbsp;&nbsp;至&nbsp;&nbsp;</div> <span  style="display:block;float:left;" id="readjciEndPeriods"></span></td>
						</tr>
					</tbody>
				</table>
				<a  class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)"> 上一条</a> 
				<a  class="easyui-linkbutton" onclick="$('#wxPaymenDlg').dialog('close')" iconcls="icon-cancel">关闭</a> 
				<a  class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)"> 下一条</a>
		</center>
	</div>
	
	<script src="js/fg.public.js"></script>
	<script src="js/fg.wxPayment.js"></script>
</body>
</html>