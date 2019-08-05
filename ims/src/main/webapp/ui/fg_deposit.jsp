<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>定金管理</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link href="css/upload.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'> 
	<div>
		<div class="tenant" style="margin:0 0 0 15px;color:#50B4D2;font-family:'微软雅黑';font-size:18px;height:20px;">
				定金管理
		</div>
		<div id="contractTypeDiv" style="margin:10px 0px 10px 15px">
			下定类型：
			 <select id="depositType" style="width:88px;" onchange="queryAllDeposit(1)">
					<option value="">全部</option>
				 	<option value="有效">有效定金</option>
					<option value="客户定金">客户定金</option>
					<option value="意向预订">意向预订</option>
			</select>
		</div>
		<div id="depositSortDiv" style="padding:3px 0 5px 30px;color:black;margin-left: 14%;margin-top: -3%; width:72px;">
			<div id="showTheSortButton" class="showTheSortButton" onclick="showDepositSortDlg()" >排序方式<span id="showTheSortjia" class="showTheSortjia">+</span></div>
            <div class="theSortDlg" id="theDepositSortDlg" style="height:100px;">
                <div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
                <div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse"  searchVal="2">倒序</div>
                <input type="hidden" id="theSortContraryInput"  value="2">
                <div class="theSortTerm" id="theSortTermSortRepGrade" searchVal="2">下定时间</div>
                <div class="theSortTerm theSortTermSelect" id="theSortTermhsRegisterTime" searchVal="3">登记时间</div>
            <%--<div class="theSortTerm" id="theSortTermSortFinishTime" searchVal="3">完成时间</div>--%>
                <input type="hidden" id="theSortTermInput" value="2">
            </div>
		</div>
	</div>
	<div id="managementTenant" style="width:99%;height:90%;">
		<table id="depositDg" style="width:auto;height:402px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,fitColumns:true,scrollbarSize:0">
        <thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th field="jemCustomer" width="10" align="center">下定人姓名</th>
					<th field="jemIntermediator" width="10" align="center">经手人</th>
					<th field="jemAddress" width="15" align="center">房屋地址</th>
					<th field="jemRegisterTime" width="10" align="center">下定时间</th>
					<th field="jemDepositType" width="10" align="center">下定类型</th>
					<th field="jemStartTime" width="10" align="center">开始时间</th>
					<th field="jemEndTime" width="10" align="center">到期时间</th>
					<th field="jemPayWay" width="10" align="center">缴费方式</th>
					<th field="jemRegisterTime" width="10" align="center">登记时间</th>
					<th field="jemState" width="10" align="center">下定状态</th>
				</tr>
			</thead>
		</table>
		<!-- 分页 -->
		<div id="mydepositPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
	<!-- 下定详情 -->
	 <div id="detailsOfDepositDlg" style="padding:6px;text-align:center;width: 450px;left: 380px; top:100px;" class="easyui-dialog" data-options="closed:true">
         <div style="clear:both"> </div>
         <div style='margin:0 0 0 11px;float: left;'>
             房间地址：<input readonly='readonly' id="jem_address" style="width:290px">
         </div>
         <div style="clear:both"> </div>
         <div style='margin:10px 0 0 22px;float: left;'>
             经手人：<input readonly='readonly' id="jemIntermediator" style="width:100px">
         </div>
         <div style='margin:10px 0 0 55px;float: left;'>
             状态：<input readonly='readonly' id="jemState" style="width:100px">
         </div>
         <div style="clear:both"> </div>
         <div style='margin:10px 0 0 22px;float: left;'>
             预订人：<input readonly='readonly' id="jemCustomer" style="width:100px">
         </div>
         <div style='margin:10px 0 0 31px;float: left;'>
             联系电话：<input readonly='readonly' id="jemCustomerPhone" style="width:100px">
         </div>
         <div style="clear:both"> </div>
         <div style='margin:10px 0 0 13px;float: left;'>
             金额(元)：<input readonly='readonly' id="jemSum" style="width:100px">
         </div>
         <div style='margin:10px 0 0 31px;float: left;'>
             下定时间：<input readonly='readonly' id="jemRegisterTime" style="width:100px">
         </div>
         <div style="clear:both"> </div>
         <div style='margin:10px 0 0 11px;float: left;'>
             开始时间：<input readonly='readonly' id="jemStartTime" style="width:100px">
         </div>
         <div style='margin:10px 0 0 30px;float: left;'>
             有效时间：<input readonly='readonly' id="jemEndTime" style="width:100px">
         </div>
         <div style="clear:both"> </div>
         <div style='margin:10px 0 0 11px;float: left;'>
             合同开始：<input readonly='readonly' id="jemContractBegin" style="width:100px">
         </div>
         <div style='margin:10px 0 0 30px;float: left;'>
             合同结束：<input readonly='readonly' id="jemContractEnd" style="width:100px">
         </div>
         <div style="clear:both"> </div>
		 <div style='margin:10px 0 0 11px;float: left;'>
			 支付方式：<input readonly='readonly' id="jemPayWay" style="width:100px">
		 </div>
		 <div style='margin:10px 0 0 30px;float: left;'>
			 合同票据：<input readonly='readonly' id="jemDepositBillNumber" style="width:100px">
		 </div>
		 <div style="clear:both"> </div>
		 <center>
			 <div style="margin-top: 15px;">
				 <a class="easyui-linkbutton l-btn l-btn-small" onclick="updateDeposit()" id="updateDepositSaveButton" style="display: none" group="" ><span>取消下定</span></a>
				 <%--<input type="button" onclick="updateDeposit()" id="cancleButton" value="取消下定"class="easyui- linkbutton l-btn l-btn-small">--%>
			 </div>
		 </center>
    </div>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.deposit.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>