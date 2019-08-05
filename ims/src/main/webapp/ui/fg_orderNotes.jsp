<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>销售开单</title>
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
	<div style="margin:5px 0 0 10px;" >
		<a class="easyui-linkbutton" iconCls="icon-xianchanxiaoshou" plain="true"  onclick="openSceneSell()">销售开单</a>
	</div>

	<div style="display:flex;padding:15px 0 5px 5px;"> 
		<div style="margin:0 0 0 5px">
			订单号：<input id="searchOrderNum" style="width:100px" onkeyup="searchOnkeyup(this.id, 'listOrder(1,0)')"/>
		</div>
		<div style="margin:0 0 0 5px">
			支付方式：<select id="searchOrderPayType" onchange="listOrder(1,0)">
				<option></option>
				<option>现金收银</option>
				<option>扫码收银</option>
				<option>在线支付</option>
				<option>台卡收银</option>
				<option>转账</option>
			</select>
		</div>
		<div style="margin:0 0 0 5px">
			状态：<select id="searchOrderStatus" onchange="listOrder(1,0)">
				<option></option>
				<option>配货中</option>
				<option>待自取</option>
				<option>待发货</option>
				<option>配送中</option>
				<option>已完成</option>
			</select>
		</div>
		<div style="margin:0 0 0 5px">
			付款状况：<select id="searchOrderPaymentStatus" onchange="listOrder(1,0)">
				<option></option>
				<option>未付款</option>
				<option>待回款</option>
				<option>已付款</option>
				<option>已退款</option>
			</select>
		</div>
		<div style="color:black;font-size:13px;float:left;margin:0 0 0 5px">
			下单时间： <input id="searchOrderStartTime" style="width:80px" type="text"
				onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchOrderEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:listOrder(1,0)})">
			到 <input id="searchOrderEndTime" style="width:80px" type="text"
				onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchOrderStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:listOrder(1,0)})">
		</div>
		<div style="margin:0 0 0 5px">
			联系人：<input id="searchCustomerName1" style="width:100px;display:none;" onkeyup="listOrder(1,0)"/>
			<input id="searchCustomerName2" style="width:100px" onkeyup="onlistOrder(1,0)"/>
			
		</div>
	</div>
	<div id="orderDataGrid" style="width:100%;height:80%;margin:10px 0 0 0">
		<table id="orderDg" style="width:100%;height:530px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="cgbOrderNum" width="20" align="center">订单号</th>
					<th field="cocContacts" width="10" align="center">联系人</th>
					<th field="cgbActualSpending" width="10" align="center">实付金额</th>
					<th field="cgbTotalSpending" width="10" align="center">商品总额</th>
					<th field="cgbShippingFee" width="10" align="center">配送费</th>
					<th field="cgbReduceFee" width="10" align="center">减免费</th>
					<th field="cgbReduceReason" width="15" align="center">减免原因</th>
					<th field="cgbPayType" width="10" align="center">支付方式</th>
					<th field="cgbState" width="10" align="center" >状态</th>
					<th field="cgbPaymentStatus" width="20" align="center" >付款状况</th>
					<th field="cgbRegistrationTime" width="15" align="center">下单时间</th>
					<th field="cgbAcceptTime" width="15" align="center">接单时间</th>
					<th field="cgbSendTime" width="15" align="center">配送时间</th>
					<th field="cgbOverTime" width="15" align="center">完成时间</th>
				</tr>
			</thead>
		</table>
		<div id="orderPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
	<!-- 订单详情-->
	<div id="orderDetailDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<input id="orderDetail_index" type="hidden" />
		<input id="did" type="hidden">
		<div style='margin:5px 0 0 20px;float: left;'>
			订单状态：<input id="dcgbState" style="width:120px" clear="clear" require="require">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			付款状况：<input id="cgbPaymentStatus" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			订单号码：<input id="dcgbOrderNum" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			下单时间：<input id="dcgbRegistrationTime" style="width:120px" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 20px;float: left;'>
			商品总额：<input id="dcgbTotalSpending" style="width:120px" clear="clear" require="require">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			配送费用：<input id="dcgbShippingFee" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			商品减免：<input id="dcgbReduceFee" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			实付金额：<input id="dcgbActualSpending" style="width:120px" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 20px;float: left;'>
			运输方式：<input id="transportationMethods2" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			定金比率：<input id="earnestMoneyRatio2" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			支付方式：<input id="dcgbPayType" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			发货日期：<input id="deliveryDate2" style="width:120px" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 20px;float: left;'>
			公司名称：<input id="cocCompany" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			收货姓名：<input id="dname" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			收货电话：<input id="dphone" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			收货地址：<input id="dlocation" style="width:120px" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 20px;float: left;'>
			订单类型：<input id="dorderType" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 20px;float: left;'>
			客户等级：<input id="cocGrade" style="width:120px" clear="clear">
		</div>
		<div style='margin:5px 0 0 20px;float: left;'>
			欠款金额：<input id="amountOfArrears" style="width:120px" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div class="mailOrder" style='margin:5px 0 0 20px;float: left;'>
			快递公司：<input id="dcgbMailName" style="width:312px" clear="clear" require="require">
		</div>
		<div class="mailOrder" style='margin:5px 0 0 12px;float: left;'>
			快递单号：<input id="dcgbMailNum" style="width:312px" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 20px;float: left;'>
			订单备注：<input id="dcgbRemark" style="width:312px" clear="clear" require="require">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			减免原因：<input id="dcgbReduceReason" style="width:312px" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div id="orderGoodsDataGrid" style="width:97%;height:150px;margin:10px 10px 0 10px" >
			<table id="salesGoodsDg" style="width:100%;height:150px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="cgsGoodsName" width="20" align="center">货物</th>
						<th field="cgsSellNum" width="10" align="center">数量</th>
						<th field="cgsRemainingNum" width="10" align="center">剩余数量</th>
						<th field="cgsOriginalPrice" width="10" align="center">原价</th>
						<th field="cgsCurrentPrice" width="10" align="center">现价</th>
						<th field="preferential" width="10" align="center">优惠标签</th>
						<th field="sellWell" width="10" align="center">热销标签</th>
						<th field="cgSnType" width="10" align="center">SN类商品</th>
					</tr>
				</thead>
			</table>
		</div>
			
		<center style="margin:5px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-up" id="distribution" onclick="distribution(1)">配货</a>
			<a class="easyui-linkbutton" iconcls="icon-up" id="finish" onclick="distribution(2)">结单</a>
			<a class="easyui-linkbutton" iconcls="icon-up" id="deliverGoods" onclick="distribution(3)">发货</a>
			<a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'orderDetail_index', 'orderDg', 'orderDetailDlg', 'openOrderDetail(row)')">上一条</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#orderDetailDlg').dialog('close')">关闭</a>
			<a id="refundOrder" class="easyui-linkbutton" iconcls="icon-tuikuan" style="display:none" onclick="refundOrder()">退单</a>
			<a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'orderDetail_index', 'orderDg', 'orderDetailDlg', 'openOrderDetail(row)')">下一条</a>
			<a class="easyui-linkbutton" iconcls="icon-up" id="orderPayment" onclick="orderPayment()">付款</a>
		</center>
	</div>
	
	<datalist id="goodsList">
	</datalist>
	<datalist id="SNGoodsList"></datalist>
	
	<div id="sceneSellDlg" class="easyui-dialog" data-options="closed:true">
		<div style="width:95% ; margin: 0 auto;">
			<div style="margin:8px 0 0 0;float:left">
				<lable style="display:inline-block;width:70px;">日期：</lable>
				<input id="orderDate" style="width:140px" require="require" readonly="readonly" disabled="disabled">
			</div>
			<div style="margin:8px 0 0 10px;float:left">
				<lable style="display:inline-block;width:70px;">发货日期：</lable>
				<input id="deliveryDate" style="width:140px" onfocus="WdatePicker({autoPickDate:true})" readonly="readonly" disabled="disabled">
			</div>
			<div style="margin:8px 0 0 10px;float:left">
				<lable style="display:inline-block;width:70px;">销售人员：</lable>
				<input id="orderUserId" style="width:140px" readonly="readonly" disabled="disabled">
			</div>
			<div style="clear:both"></div>
			<div style="margin:8px 0 0 0;float:left">
				<lable style="display:inline-block;width:70px;">客户：</lable>
				<input id="orderCustomer" style="width:140px;cursor: pointer;" require="require" readonly="readonly" onclick="choseCustomer()">
				<input id="customerId" hidden="hidden" >
			</div>
			<div style="margin:8px 0 0 10px;float:left">
				<lable style="display:inline-block;width:70px;">联系号码：</lable>
				<input id="orderContactsPhone" style="width:140px" require="require" readonly="readonly">
			</div>
			<div style="margin:8px 0 0 10px;float:left">
				<span style="display:inline-block;width:70px;">运输方式：</span>
				<select id = "transportationMethods" style="width:140px" require="require" onchange="selectTransportationMethods()">
					<option value="自取" selected="selected">自取</option>
					<option value="快递">快递</option>
				</select>
			</div>
			<div style="margin:8px 0 0 10px;float:left">
				<lable style="display:inline-block;width:70px;">收货地址：</lable>
				<input id="address" style="width:180px" require="require" readonly="readonly">
			</div>
			<div style="clear:both"></div>
			<div style="margin:8px 0 0 0;float:left">
				<span style="display:inline-block;width:70px;">付款方式：</span>
				<select id = "paymentMethod" style="width:140px" require="require">
					<option value="现场支付" selected="selected">现场支付</option>
					<option value="转账">转账</option>
				</select>
			</div>
			<div style="margin:8px 0 0 10px;float:left">
				<lable style="display:inline-block;width:70px;">金额：</lable>
				<input id="totalSum" style="width:140px" require="require" readonly="readonly">
			</div>
			<div style="margin:8px 0 0 10px;float:left">
				<lable style="display:inline-block;width:70px;">定金比率：</lable>
				<input id="earnestMoneyRatio" style="width:140px" placeholder="百分比（%）" require="require" onkeyup="searchOnkeyup(this.id, 'earnestMoneyCalculation()')">
			</div>
			<div style="margin:8px 0 0 10px;float:left">
				<lable style="display:inline-block;width:70px;">预付定金：</lable>
				<input id="paymentEarnestMoney" style="width:140px" require="require" disabled="disabled">
			</div>
			<div style="clear:both"></div>
			<div style="margin:8px 0 0 0;float:left">
				<lable style="display:inline-block;width:70px;">备注：</lable>
				<textarea rows="2" cols="132" id="note"></textarea>
			</div>
		</div>
		<!-- <div style="float:left;margin:2% 0 0 10%">
			<select id="selectType" style="width:150px;height:35px;border-radius:5px" choose="choose" require="require" onchange="selectType()">
				<option value="0" selected="selected">商品编号/商品名称</option>
				<option value="1">商品SN码</option>
			</select>
		</div> -->
		<!-- <div style="float:left;margin:2% 0 0 2%" id="searchSN">
			<input id="searchSNInput" list="SNGoodsList" style="width:480px;height:35px;border-radius:5px" placeholder="请输入 商品SN码" />
		</div> -->
		<div style="float:left;margin:2% 0 0 20%" id="search">
			<input id="searchInput" list="goodsList" style="width:480px;height:35px;border-radius:5px" placeholder="请输入 商品编号/商品名称" />
		</div>
		<div style="float:left;margin:2% 0 0 2%">
			<button type="button" onclick="addGoods()" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;">添加</button>
		</div>
		<div style="clear:both"></div>
		<div id="sceneGoodsDataGrid" style="width:90%;margin:1% 0 0 5%" >
			<table id="sceneGoodsDg" style="width:100%;height:300px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<!-- <th field="Lid" width="10" align="center">序号</th> -->
						<th field="cgCode" width="20" align="center">商品编码</th>
						<th field="cgName" width="20" align="center">商品名称</th>
						<th field="cgOriginalPrice" width="10" align="center">原价</th>
						<th field="cgCurrentPrice" width="10" align="center">现价</th>
						<th field="num" width="10" align="center">数量</th>
						<th field="totalPrice" width="10" align="center">小计</th>
					</tr>
				</thead>
			</table>
		</div>
		<div style="clear:both"></div>
		<div style="margin:2% 0 0 30%;text-align:center">
			<div style="float:left;margin:2% 0 0 2%">
				<div style="font-size:30px;float:left">合计：</div>
				<div id="money" style="font-size:30px;float:left">0.00</div>
				<div style="font-size:30px;float:left">元</div>
			</div>
			<div style="float:left;margin:3% 0 0 4%">
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="selectMode()">保存订单</button>
			</div>
		</div>
		
	</div>
	<!--添加sn码窗口-->
	<div id="addGoodsSNDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true" style="text-align:center">
		
		<input id="goodsSNIndex2" type="hidden" />
		
		<div style="text-align:center;">
			SN码：<input id="addGoodsSnInput" list="SNGoodsList"/>
			<button type="button" onclick="addSNToTable()" class="btn btn-success" style="margin:0 0 5px 5px;width:80px;">添加</button>
		</div>
		<div id="addGoodsSnDataGrid" style="width:100%;height:220px;">
			<table id="addGoodsSnTable">
			</table>
		</div>
		<div style="text-align: center;width:100%">
			还差<span id="snTotalNum"></span>个商品
		</div>
		<center style="margin:20px 0 0 0;">
			<a id="saveDiscountButton"  class="easyui-linkbutton" iconcls="icon-save" onclick="saveSNs()">保存</a>
		</center>
	</div>
	<div id="openCashDlg" class="easyui-dialog" data-options="closed:true" style="text-align:center">
		<div class="cash qrCodeCustomer" style="margin:10% 0 0 27%">
			<div style="font-size:25px;float:left">应收：</div>
			<div id="orderMoney" style="font-size:25px;float:left"></div>
			<div style="font-size:25px;float:left">元</div>	
		</div>
		<div style="clear:both"></div>
		<div class="cash qrCode" style="margin:5% 0 5% 0">
			<input id="moneyInput" type="number" onblur="changMoney()" style="width:300px;height:35px;border-radius:5px;font-size:20px;text-align:center" placeholder="" />
		</div>
		<div style="clear:both"></div>
		<div class="cash" style="margin:0 0 0 27%">
			<div style="font-size:25px;float:left">找零：</div>
			<div id="changeMoney" style="font-size:25px;float:left">0.00</div>
			<div style="font-size:25px;float:left">元</div>
		</div>
		<div id="cashButton" class="cash" style="margin:23% 0 0 0" >
			<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="doCash(1)">现金收银</button>
		</div>
		<div id="qrcodeButton" class="qrCode" style="margin:23% 0 0 0" >
			<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="doCash(2)">扫码收银</button>
		</div>
		<div id="cardButton" class="qrCodeCustomer" style="margin:23% 0 0 0" >
			<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="doCash(3)">台卡收银</button>
		</div>
	</div>
	<!-- 选择收银方式 -->
	<div style="text-align:center;" class="easyui-dialog" data-options="closed:true" id = "selectMode">
		<div style="float:left;margin:5% 0 0 10%">
			<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="openCash(1)">现金收银</button>
		</div>
		<div style="float:left;margin:5% 0 0 2%">
			<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="openCash(2)">扫码收银</button>
		</div>
		<div style="float:left;margin:5% 0 0 2%">
			<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="openCash(3)">台卡收银</button>
		</div>
	</div>
	<!-- 选择客户 -->
	<div id="choseCustomerDlg" class="easyui-dialog" data-options="closed:true" style="text-align:center">
		<div style="margin: 5px 0 0 0"></div>
		<div class="advancedScreening" style="margin: 5px 0 0 0">
			<div style="margin:0 0 5px 5px;float:left;">
				姓名：<input id="searchCustomerName" onkeyup="searchOnkeyup(this.id, 'queryCustomer(1, 0)')"
					style="width:80px">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				电话：<input id="searchCustomerPhone" onkeyup="searchOnkeyup(this.id, 'queryCustomer(1, 0)')"
					style="width:80px">
			</div>
			<div style="margin:0 0 5px 5px;float:left">
				状态：<select id="searchCustomerState" style="width:100px;" onchange="queryCustomer(1,0)">
					<option value="">全部</option>
					<option value="潜在客户">潜在客户</option>
					<option value="意向客户">意向客户</option>
					<option value="暂缓">暂缓</option>
					<option value="报备">报备</option>
					<option value="无效">无效</option>
				</select>
			</div>
			<div style="padding:0 0 5px 5px;float:left;">
				登记人：<input id="searchRegisterShowUserInfo" class="choose_user_button" doFlag="searchRegister" doFun="queryCustomer(1,0)"
					style="width:150px;cursor:pointer;" readonly="readonly" clear="clear" require="require" >
				<input id="searchRegisterGetUserStoreId" type="hidden">
				<input id="searchRegisterGetUserDetId" type="hidden">
				<input id="searchRegisterGetUserId" type="hidden">
				<div id="searchRegisterShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-yixiangren" onclick="addCustomer()" id="addCustomerButton">添加客户</a> 
			</div>
			
		</div>
		<div id="choseCustomerGrid" style="width:100%;height:89%">
			<div id="choseCustomerDiv" style="width:98%;height:100%;margin:10px auto;">
				<table id="choseCustomerTable">
				</table>
				<div id="choseCustomerPageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
	<!-- 配货窗口 -->
	<div id="addGoodsSn" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input id="relationIndex" hidden="hidden">
		<div style="padding:6px;padding:5px 0 0 0;">
			<div style="padding:10px 5px 0 5px;width:48%;float: left;">
				<table id="orderGoods" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
		           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
		           <thead>
			        <tr>
			            <th field="cgsGoodsName" width="20" align="center">货物</th>
			            <th field="cgsSellNum" width="16" align="center">数量</th>
			            <th field="cgSnType" width="16" align="center">SN类商品</th>
			        </tr>
			        </thead>
				</table>
			</div>
			<div style="padding:10px 0 0 5px;width:48%;float: left;">
				<div style="text-align:center;">
					SN码：<input id="addSnInput" list="SNGoodsList" style="width:150px;"/>
					<button type="button" onclick="addSNToTable()" class="btn btn-success" style="margin:0 0 5px 5px;width:80px;height: 30px">添加</button>
				</div>
				<table id="addSn" style="width:100%;height:330px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
		           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
		           <thead>
			        <tr>
			        	<th field="cgsGoodsName" width="15" align="center">货物</th>
			            <th field="cgSn" width="20" align="center">SN</th>
			        </tr>
			        </thead>
				</table>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="saveSN()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addGoodsSn').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 查看sn码窗口 -->
	<dvi id="checkGoodsSNDlg" class="easyui-dialog" data-options="closed:true" style="text-align:center">
		<div id="checkGoodsSnDataGrid" style="width:100%;height:220px;">
			<table id="checkGoodsSnTable"></table>
		</div>
	</dvi>
	<!-- 付款 -->
	<div id="paymentDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input id="paymentIndex" hidden="hidden">
		<div style='margin:5px 0 0 10px;float: left;'>
		记账日期：<input style="width:70px" id="setEveryFinancialDoTime" require="require"
			onclick="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})">
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			经手人：<input id="jfHandlersShowUserInfo" class="choose_user_button" doFlag="jfHandlers" doFun="" 
				style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
			<input id="jfHandlersGetUserStoreId" type="hidden" clear="clear">
			<input id="jfHandlersGetUserDetId" type="hidden" clear="clear">
			<input id="jfHandlersGetUserId" type="hidden" clear="clear">
			<div id="jfHandlersShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			收款金额：<input id="amountCollected" style="width:150px" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 10px;float: left;'>
			账户类型：<select style="width:150px" onchange="changeWay(2)" id="setEveryFinancialWay" require="require">
				<option></option>
			</select>
		</div>
		<div style='margin:10px 0 0 10px;float: left;'>
			账户名称：<select style="width:150px" id="setEveryFinancialAccountName" require="require" onchange="getAccountId(1)">
				<option></option>
			</select>
		</div>
		<div style='margin:10px 0 0 10px;float: left;'>
			收支方式：<select style="width:88px" class="financial_payType" id="everyFinancialPayType" require="require">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 10px;float: left;'>
			账户号码：<input style="width:150px" disabled id="setEveryFinancialAccountNums" require="require"> 
			<input style="display:none" id="setEveryFinancialBankNums" require="require">
		</div>
		<div style='margin:10px 0 0 10px;float: left;'>
			账户归属：<input style="width:150px" disabled id="setEveryFinancialAccountBelong" require="require">
		</div>
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 10px;float:left">
			备注：<textarea rows="2" cols="80" id="financialNote"></textarea>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="saveReceivables()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#paymentDlg').dialog('close')">取消</a>
		</div>
	</div>
	
	<!-- 添加客户 -->
	<div id="addCustomerDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		
		<div style="margin:8px 0 0 34px;float:left">
			姓名：<input id="addpopName" style="width:80px" require="require">
		</div>
		<div style="margin:8px 0 0 40px;float:left">
			电话：<input id="addpopPhone" style="width:100px" require="require">
		</div>
		<div style="margin:8px 0 0 24px;float:left;position:relative;">
			联系人岗位：<select id="contactsPost" style="width:90px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 29px;float:left;position:relative;">
			来源：<select id="source" style="width:90px;">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			公司名称：<input id="company" style="width:110px;">
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			简称：<input id="abbreviation" style="width:100px;">
		</div>
		<div style="margin:8px 0 0 35px;float:left">
			上级客户：<input id="superior" style="width:110px;" disabled="disabled">
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			状态：<select id="addCocState" style="width:90px;" needs="1">
				<option></option>
				<option value="潜在客户">潜在客户</option>
				<option value="意向客户">意向客户</option>
				<option value="报备">报备</option>
				<option value="无效">无效</option>
			</select>
		</div>
		
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			客户等级：<select id="grade" style="width:100px;">
				<option></option>
				<option value="普通客户">普通客户</option>
				<option value="代理商">代理商</option>
				<option value="经销商">经销商</option>
			</select>
		</div>
		<div style="margin:8px 0 0 20px;float:left">
			关系：<select id="relation" style="width:100px;">
				<option value="一般" selected="selected">一般</option>
				<option value="密切">密切</option>
				<option value="较好">较好</option>
				<option value="较差">较差</option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			类型：<select id="type" style="width:100px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			规模：<select id="scale" style="width:100px;">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			固定电话：<input id="fixedTelephone" style="width:100px;">
		</div>
		<div style="margin:5px 0 0 20px;float:left">
			网址：<input id="url" style="width:100px;">
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			邮箱：<input id="email" style="width:100px;">
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			地址：<input id="addCustomerAddress" style="width:150px;" require="require">
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			登记时间：<input id="addRegistrationTime" style="width:100px;" disabled="disabled">
		</div>
		<div style="margin:8px 0 0 12px;float:left">
			登记人：<input id="addCocUsername" style="width:90px;" disabled="disabled">
			<input id="addipUserId" style="display:none">
		</div>
		<div style="margin:8px 0 0 12px;float:left">
			<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="">附件</a>
		</div>
		<div style="clear:both"></div>
		<center>
			<div style="height:20px;"></div>
			<a id="addSaveButton" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddCustomer()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addCustomerDlg').dialog('close')">取消</a>
		</center>
	</div>
	<!-- 发货操作窗口 -->
	<div id="sendMailDlg" class="easyui-dialog" data-options="closed:true" style="text-align:center">
		<div id="tt" class="easyui-tabs" style="width:556px;height:334px;">
		    <div title="快递发货" style="padding:20px;">
				<div style="margin:5% 0 5% 0;text-align:center">
					<input id="mailNameInput" style="margin: 0 auto;width:300px;height:35px;border-radius:5px;font-size:20px;text-align:center" placeholder="快递公司" />
				</div>
				<div style="margin:5% 0 5% 0;text-align:center">
					<input id="mailNumInput" style="margin: 0 auto;width:300px;height:35px;border-radius:5px;font-size:20px;text-align:center" placeholder="快递单号" />
				</div>
				<div style="float:left;margin:2% 0 0 33%">
					<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="operating(5)">发货</button>
				</div>
		    </div>
		    <div title="自家配送" style="padding:40px;">
				<div style="color:black;margin:5% 0 5% 0;text-align:center;">
					<input id="searchOrderManagerShowUserInfo" class="choose_user_button" doFlag="searchOrderManager" doFun="" readonly="readonly" clear="clear"
							style="width:300px;height:35px;border-radius:5px;cursor: pointer;font-size:20px;text-align:center" type="text" require="require" placeholder="配送人">
						<input id="searchOrderManagerGetUserStoreId" type="hidden" clear="clear">
						<input id="searchOrderManagerGetUserDetId" type="hidden" clear="clear">
						<input id="searchOrderManagerGetUserId" type="hidden" clear="clear">
						<div id="searchOrderManagerShowUserInfoDiv" style="display:none;" clear="clear"></div>
				</div>
				<div  style="float:left;margin:2% 0 0 33%">
					<button type="button" class="btn btn-success"  style="margin:0 0 5px 5px;width:140px;" onclick="dealWithOrder(2)">配送</button>
				</div>
		    </div>
		</div>
	</div>
	<script src="js/fg.public.js"></script>
	<script src="js/fg_orderNotes.js"></script>
</body>
</html>