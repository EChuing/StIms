<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>合同管理</title>
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
		<div style="padding:5px 0 5px 5px;">
			<a id="tenantContract" class="easyui-linkbutton" style="display:none;" onclick="contractTo('tenant');" iconCls="icon-qiehuan" plain="true">切换到租客合约</a>
			<a id="ownersContract" class="easyui-linkbutton" onclick="contractTo('owners');" iconCls="icon-qiehuan" plain="true">切换到业主合约</a>
		</div>
		<div class="tenant" style="margin:0 0 0 15px;color:#50B4D2;font-family:'微软雅黑';font-size:18px;height:20px;">
				租客合约
		</div>
		 <div class="owners" style="margin:0 0 15px 15px;color:#50B4D2;font-family:'微软雅黑';font-size:18px;height:20px;">
				业主合约
		</div>
		<div id="contractTypeDiv" style="margin:10px 0px 10px 15px">
			合同类型：
			 <select id="contractType" style="width:88px;" onchange="queryTenant(1,0)">
					<option value="">全部</option>
					<option value="1">纸质合同</option>
					<option value="2">电子签约</option>
			</select>
		</div>
		<div id="contractSortDiv" style="padding:3px 0 5px 10px;color:black;margin-left: 14%;margin-top: -3%">
			<div id="showTheSortButton" class="showTheSortButton" onclick="showTheSortDlg()" >排序方式<span id="showTheSortjia" class="showTheSortjia">+</span></div>
			<div class="theSortDlg" id="theSortDlg" style="height:75px;">
				<div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
				<div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse"  searchVal="2">倒序</div>
				<input type="hidden" id="theSortContraryInput"  value="2">
				<div class="theSortTerm theSortTermSelect" id="theSortTermjfCheckInTime" searchVal="1">登记日期</div>
				<div class="theSortTerm" id="theSortTermjfBillingDate" searchVal="2">签约日期</div>
				<input type="hidden" id="theSortTermInput" value="1">
			</div>
		</div>
		<div id="tenantSortDiv" style="padding:3px 0 5px 10px;color:black;margin-left: 14%;margin-top: -3%">
			<div id="showTheSortButton2" class="showTheSortButton" onclick="tenantTheSortDlg()" >排序方式<span id="showTheSortjia2" class="showTheSortjia">+</span></div>
			<div class="theSortDlg" id="tenantSortDlg" style="height:75px;">
				<div class="theSortContrary" id="theSortContraryPositive2" searchVal="1">正序</div>
				<div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse2"  searchVal="2">倒序</div>
				<input type="hidden" id="theSortContraryInput2"  value="2">
				<div class="theSortTerm theSortTermSelect" id="theSortTermjfCheckInTime2" searchVal="1">登记日期</div>
				<div class="theSortTerm" id="theSortTermjfBillingDate2" searchVal="2">签约日期</div>
				<input type="hidden" id="theSortTermInput2" value="1">
			</div>
		</div>
	</div>
	<div id="managementTenant" style="width:100%;height:90%;">
	
		<table id="tenantDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
        <thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th field="popName" width="10" align="center">租客姓名</th>
					<th field="houseAddress" width="15" align="center">房屋地址</th>
					
					<th field="jrrSignedTime" width="10" align="center">签约时间</th>
					<th field="jrrContractType" width="10" align="center">合同性质</th>
					<th field="jrrBeginTime" width="10" align="center">开始时间</th>
					<th field="jrrEndTime" width="10" align="center">到期时间</th>
					<th field="jrrTheTerm" width="10" align="center">合同期限</th>
					
					<th field="jrrTypeOfContract" width="10" align="center">签约方式</th>
					
					<th field="jrrPaymentMethod" width="10" align="center">缴费方式</th>
					<th field="jrrRegistrationTime" width="10" align="center">登记时间</th>
					<!-- <th field="jrrImgNum" width="10" align="center">图片文件</th> -->
				</tr>
			</thead>
		</table>
		<!-- 租客合约分页 -->
		<div id="tenantPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
		<div id="managementOwner" style="width:100%;height:90%;">
			<table id="ownerDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
	        <thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th field="popName" width="10" align="center">业主姓名</th>
					<th field="houseAddress" width="15" align="center">房屋地址</th>
					
					<th field="jrlSignedTime" width="10" align="center">签约时间</th>
					<th field="jrlContractType" width="10" align="center">合同性质</th>
					<th field="jrlBeginTime" width="10" align="center">开始时间</th>
					<th field="jrlEndTime" width="10" align="center">到期时间</th>
					<th field="jrlTheTerm" width="10" align="center">合同期限</th>
					
					<th field="jrlPaymentMethod" width="10" align="center">缴费方式</th>
					<th field="jrlRegistrationTime" width="10" align="center">登记时间</th>
					<th field="jrlRentFreeDays" width="10" align="center">免租天数</th>
					<th field="jrlImgNum" width="10" align="center">图片文件</th>
				</tr>
			</thead>
		</table>
		<!-- 业主合约分页 -->
		<div id="ownerPageDiv" style="width:100%;text-align:center;"></div>	
	</div>
	
	<!-- 合约详情 -->
	 <div id="detailsOfTenantContractDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		<input style="display:none" class='detailsOfTenantContract_index'>
		<div style="padding:5px 0 0 10px;">
			<span id="followUpImgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div id="followUpImgWrapper" style="margin:10px 0 0 10px;"></div>
		
	<div>
	<jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/renterContImgDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.contract.js"></script>
	<script src="js/contractImg.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>