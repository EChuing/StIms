<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>用户考核表</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script src="js/vue.min.js"></script>
	<script src="js/fg.public.js"></script>
	<script type="text/javascript" src="js/config.js"></script>
	<style>
		#container {
			padding-top: 10px;
		}
		
		#title {
			width: 100%;
			height: 25px;
			line-height: 25px;
			font-weight: bold;
			font-size: 15px
		}
		
		#right-t {
			width: 100% ;
			height: 76px;
			border: 1px #95B8E7 solid;
		}
		
		#right-b {
			width: 100% ;
			margin-top: 5px;
			height: 418px;
			border: 1px #95B8E7 solid;
		}
		
		#right .panel-body {
		    border-top-width: 1px;
		    border-right-width: 0px;
		    border-bottom-width: 0px;
		    border-left-width: 0px;
		    border-style: solid;
		    border-top-style: solid;
		    border-right-style: solid;
		    border-bottom-style: solid;
		    border-left-style: solid;
		}
	</style>
</head>
<body style="min-width:800px">
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div id="container">
		<div id="top" style="margin-bottom:2px;color:black">
			<div style='margin:0 0 0 10px;float: left;'>
				区域：<select style="width:100px" id="add_department_theStore"
					onchange="choseStore('add_department_theStore','addTheDepartment')"
					class="add_theStore">
					<option></option>
				</select>
			</div>
			<div style='margin:0 0 0 10px;float: left;'>
				部门：<select style="width:100px" id="addTheDepartment"
					onchange="queryUserTable(1, 0)" class="add_theDepartment">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="float:left;width:25%;height:auto;margin-right:0.5%;">
			<table id="employeesDg" class="easyui-datagrid"
				style="width:100%;height:502px;table-layout:fixed;overflow:hidden;"
				data-options="rownumbers:false,singleSelect:true,autoRowHeight:false,pageSize:9,fitColumns:true,scrollbarSize:0">
				<thead>
					<tr>
						<th field="storefrontName" width="15" align="center">区域</th>
						<th field="departmentName" width="15" align="center">部门</th>
						<th field="suStaffName" width="15" align="center">用户姓名</th>
						<th field="userId" width="15" align="center" hidden="true">用户id</th>
					</tr>
				</thead>
			</table>
			<!-- 列表分页 -->
			<div id="employeesPageDiv" style="width:100%;text-align:center;"></div>
		</div>
		<div id="right" style="float:left;width:73%;height:522px;color:black;">
			<div id="right-t">
				<div id="title">业绩概况
					<div style="float:right;font-weight:normal">选择周期:
						<select id="timeSelect" style="width: 80px;" onchange="queryPerformanceOverview()">
						<option value="0">本月</option>
						<option value="1">上月</option>
						<option value="2">本季</option>
						<option value="3">本年</option>
						<option value="4">累计</option>
						</select>		
					</div>
				</div>
				<table id="performanceDg" class="easyui-datagrid"
					style="width:100%;height:51px;"
					data-options="rownumbers:false,singleSelect:true,autoRowHeight:false,pageSize:5,fitColumns:true,scrollbarSize:0">
					<thead>
						<tr>
							<th field="mpsIntentionalNumber" width="10" align="center">意向人数</th>
							<th field="mpsFollowUpNumber" width="10" align="center">跟进数</th>
							<th field="mpsWithGuestHouseNumber" width="10" align="center">带客看房数</th>
							<th field="mpsLookNumberRoom" width="10" align="center">看业主房数</th>
							<th field="mpsHouseNumber" width="10" align="center">出房数</th>
							<th field="mpsRoomNumber" width="10" align="center">收房数</th>
						</tr>
					</thead>
				</table>
			</div>
			<div id="right-b">
				<div id="title">业绩明细
					<div style="float:right;font-weight:normal">选择月份:
						<input id="chooseMonth" type="text" style="width: 80px;" runat="server" onfocus="WdatePicker({dateFmt : 'yyyy-MM',isShowToday : false,isShowClear : true,dchanging:queryPerfDetail(1,0)})" />
					</div>
				</div>
				<div style="width:100%;height:393px">
				<table id="perfDetailDg" class="easyui-datagrid"
					style="width:100%;height:393px;"
					data-options="rownumbers:false,singleSelect:true,autoRowHeight:false,pageSize:5,fitColumns:false,scrollbarSize:0,overflow:true">
					<thead>
						<tr>
							<th field="jpdTime" width="100px" align="center">录入时间</th>
							<th field="jpdPerfType" width="100px" align="center">业绩类型</th>
							<th field="jpdSum" width="100px" align="center">业绩总额</th>
							<th field="jpdAsstType" width="100px" align="center">协助类型</th>
							<th field="jpdAsstPro" width="100px" align="center">协助比例</th>
							<th field="jpdAddress" width="150px" align="center">详细地址</th>
							<th field="jpdFreeDays" width="100px" align="center">免租期收益天数</th>
							<th field="jpdFreeMoney" width="100px" align="center">免租期收益金额</th>
							<th field="jpdVacantDays" width="100px" align="center">空置天数</th>
							<th field="jpdVacantMoney" width="100px" align="center">空置成本</th>
							<th field="jpdTenantRent" width="100px" align="center">租客租金</th>
							<th field="jpdLandlordRent" width="100px" align="center">房东租金</th>
							<th field="jpdComm" width="100px" align="center">佣金</th>
							<th field="jpdFurn" width="100px" align="center">家私家电成本</th>
							<th field="jpdClean" width="100px" align="center">维护保洁</th>
							<th field="jpdDiff" width="100px" align="center">租金亏损差值</th>
							<th field="jpdPeriod" width="100px" align="center">租客合约周期数</th>
							<th field="jpdLosses" width="100px" align="center">租金亏损总额</th>
							<th field="jpdGains" width="100px" align="center">房租差价</th>
							<th field="jpdDeposit" width="100px" align="center">定金</th>
							<th field="jpdRemarks" width="100px" align="center">备注</th>
						</tr>
					</thead>
				</table>
				</div>
			</div>
			<!-- 列表分页 -->
			<div id="perfDetailPageDiv" style="width:100%;text-align:center;"></div>
		</div>
	</div>
	<script src="js/fg.employeesAssessment.js"></script>
</body>
</html>