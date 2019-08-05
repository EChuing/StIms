<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>退房办理</title>
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
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.checkOut.js"></script>
	<script src="js/renterCheckOut.js"></script>
	<script src="js/landlordCheckOut.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div class="easyui-tabs" id="tabs">
		<div title="租客退房" id="renterCheckoutSection">
			<div class="clearfix">
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					城市：<select id="sourceCity" onchange="queryHouseCity()"
						style="width:80px;">
						<option></option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					城区：<select id="sourceDistrict" onchange="querySourceInfo(1,0)"
						style="width:80px">
						<option></option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					片区：<select id="sourceZone" onchange="querySourceInfo(1,0)"
						style="width:80px">
						<option></option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="sourceCommunity"
						onkeyup="searchOnkeyup(this.id, 'querySourceInfo(1, 0)')" style="width:80px">
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="sourceBuilding" onkeyup="searchOnkeyup(this.id, 'querySourceInfo(1, 0)')"
						style="width:80px">
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="sourceDoorplateno"
						onkeyup="searchOnkeyup(this.id, 'querySourceInfo(1, 0)')" style="width:80px">
				</div>
			</div>
			<div class="renterCheckOutState">
				<input id="searchState" type="hidden" value="正办理退房">
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="未办手续">未办手续<span class="totalNum4"></span></button>
				<button type="button" class="btn btn-info" style="margin:0 0 5px 5px;width:140px;" value="正办理退房">办理中<span class="totalNum0"></span></button>
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="退房待审核">待审核<span class="totalNum1"></span></button>
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="退房待复核">待复核<span class="totalNum2"></span></button>
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="退房待出账">待出账<span class="totalNum3"></span></button>
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;" value="退房完成">完成</button>
			</div>
			<table id="renterCheckOutDg" class="easyui-datagrid" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="detailAddress" width="30" align="center">房屋地址</th>
						<th field="renterPopName" width="20" align="center">租客</th>
						<th field="renterPopNameRemark" width="20" align="center">备注</th>
						<th field="jrrBeginTime" width="20" align="center">租赁开始</th>
						<th field="jrrEndTime" width="20" align="center">租赁到期</th>
						<th field="rcoCheckOutTime" width="20" align="center">预约时间</th>
						<th field="rcoARefundOfTime" width="20" align="center">结算时间</th>
						<!-- <th field="hrLeaseState" width="20" align="center">租赁状态</th> -->
					</tr>
				</thead>
			</table>
			<div id="renterCheckOutPageDiv" style="width:100%;text-align:center;"></div>
			<!-- 租客即将到期合同 -->
			<div id="renterContractSection">
				<div class="module_top">
					<span style="margin:0 0 0 5px;color:#50B4D2;font-family:'微软雅黑';font-size:15px;font-weight:normal;">即将到期合同(租客)</span>
					<div class="contract_top_btn_d">
						<div id="rent_contract_15" class="contract_top_btn"
							divflag="0" onclick="rent_contract_click(this)">15天内</div>
						<div id="rent_contract_30" class="contract_top_btn"
							divflag="0" onclick="rent_contract_click(this)">30天内</div>
						<div id="rent_contract_60" class="contract_top_btn"
							divflag="0" onclick="rent_contract_click(this)">60天内</div>
					</div>
				</div>
				<table id="rentContractDg" class="easyui-datagrid" style="width:100%;height:152px"
					data-options="rownumbers:false,singleSelect:true,autoRowHeight:false,fitColumns:true,scrollbarSize:0">
					<thead>
						<tr>
							<th field="addCommunity" width="10" align="center">楼盘名称</th>
							<th field="addBuilding" width="10" align="center">楼栋</th>
							<th field="addDoorplateno" width="10" align="center">门牌号</th>
							<th field="renterName" width="10" align="center">租客</th>
							<th field="renterPhone" width="10" align="center">联系方式</th>
							<th field="maxtime" width="10" align="center">到期时间</th>
						</tr>
					</thead>
				</table>
				<div id="rentContractPageDiv" style="text-align:center;"></div>
			</div>
		</div>
		<div title="业主退房" id="landlordCheckoutSection">
			<div class="clearfix">
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					城市：<select id="searchCity" onchange="queryHouseCity()"
						style="width:80px">
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					城区：<select id="searchDistrict" onchange="queryTrusteeship(1,0)"
						style="width:80px">
						<option></option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					片区：<select id="searchZone" onchange="queryTrusteeship(1,0)"
						style="width:80px">
						<option></option>
					</select>
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="searchCommunity"
						onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0)')" style="width:80px">
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0)')"
						style="width:80px">
				</div>
				<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchDoorplateno"
						onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0)')" style="width:80px">
				</div>
			</div>
			<div class="landlordCheckOutState">
				<input id="searchState1" type="hidden" value="正办理退房">
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="未办手续">未办手续<span class="totalNum4"></span></button>
				<button type="button" class="btn btn-info" style="margin:0 0 5px 5px;width:140px;" value="正办理退房">办理中<span class="totalNum0"></span></button>
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="退房待审核">待审核<span class="totalNum1"></span></button>
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="退房待复核">待复核<span class="totalNum2"></span></button>
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="退房待出账">待出账<span class="totalNum3"></span></button>
				<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;" value="退房完成">完成</button>
			</div>
			<table id="landlordCheckOutDg" class="easyui-datagrid" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="detailAddress" width="30" align="center">房屋地址</th>
						<th field="popName" width="20" align="center">业主</th>
						<th field="popNameRemark" width="20" align="center">备注</th>
						<th field="jrlBeginTime" width="20" align="center">开始日期</th>
						<th field="jrlEndTime" width="20" align="center">结束日期</th>
						<th field="jrlTheTerm" width="20" align="center">合同期限</th>
						<th field="hsState" width="20" align="center">退房状态</th>
					</tr>
				</thead>
			</table>
			<div id="landlordCheckOutPageDiv" style="width:100%;text-align:center;"></div>
			<!-- 业主即将到期合同 -->
			<div id="landlordContractSection">
				<div class="module_top">
					<span style="margin:0 0 0 5px;color:#50B4D2;font-family:'微软雅黑';font-size:15px;font-weight:normal;">即将到期合同(业主)</span>
					<div class="contract_top_btn_d">
						<div id="proprietor_contract_15" class="contract_top_btn"
							divflag="0" onclick="proprietor_contract_click(this)">15天内</div>
						<div id="proprietor_contract_30" class="contract_top_btn"
							divflag="0" onclick="proprietor_contract_click(this)">30天内</div>
						<div id="proprietor_contract_60" class="contract_top_btn"
							divflag="0" onclick="proprietor_contract_click(this)">60天内</div>
					</div><br>
				</div>
				<table id="landLordContractDg" class="easyui-datagrid" style="width:100%;height:152px"
					data-options="rownumbers:false,singleSelect:true,autoRowHeight:false,fitColumns:true,scrollbarSize:0">
					<thead>
						<tr>
							<th field="addCommunity" width="10" align="center">楼盘名称</th>
							<th field="addBuilding" width="10" align="center">楼栋</th>
							<th field="addDoorplateno" width="10" align="center">门牌号</th>
							<th field="landlordName" width="10" align="center">业主</th>
							<th field="landlordPhone" width="10" align="center">联系方式</th>
							<th field="maxtime" width="10" align="center">到期时间</th>
						</tr>
					</thead>
				</table>
				<div id="landLordContractPageDiv" style="text-align:center;"></div>
			</div>
		</div>
	</div>
	<div id="financialDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div style="width:99%;height:85%">
			<!-- 用于打印的收支信息列表 -->
			<table id="financialTable" ></table>
		</div>
		<br>
		<center>
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doRenterUpdateCheckout(5, '出账')" id="doRenterFinancialButton">出账</a> 
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doLandlordUpdateCheckout(5, '出账')" id="doLandlordFinancialButton">出账</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#financialDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<div id="checkRenterCheckoutDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 15px;'>
			是否通过：<select id="renterCheckIf" style="width:150px">
				<option value="通过">通过</option>
				<option value="不通过">不通过</option>
			</select>
		</div>
		<div class="clearfix">
			<div style='margin:5px 0 0 10px;float: left;'>备注/原因：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea id="renterCheckNote" style="width:150px;height:50px"></textarea>
			</div>
		</div>
		<center style="margin: 10px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-ok" id="doCheckRenterCheckoutOne" onclick="doCheckRenterCheckout(0)">提交</a> <!-- 审核 -->
			<a class="easyui-linkbutton" iconcls="icon-ok" id="doCheckRenterCheckoutTwo" onclick="doCheckRenterCheckout(1)">提交</a> <!-- 复核 -->
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#checkRenterCheckoutDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<div id="checkLandlordCheckoutDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 15px;'>
			是否通过：<select id="landlordCheckIf" style="width:150px">
				<option value="通过">通过</option>
				<option value="不通过">不通过</option>
			</select>
		</div>
		<div class="clearfix">
			<div style='margin:5px 0 0 11px;float: left;'>备注/原因：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea id="landlordCheckNote" style="width:150px;height:50px"></textarea>
			</div>
		</div>
		<center style="margin: 10px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-ok" id="doCheckLandlordCheckoutOne" onclick="doCheckLandlordCheckout(0)">提交</a> <!-- 审核 -->
			<a class="easyui-linkbutton" iconcls="icon-ok" id="doCheckLandlordCheckoutTwo" onclick="doCheckLandlordCheckout(1)">提交</a> <!-- 复核 -->
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#checkLandlordCheckoutDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<jsp:include page="/ui/renterCheckOut.jsp"></jsp:include>
	<jsp:include page="/ui/landlordCheckOut.jsp"></jsp:include>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/upload.js"></script>
</body>
</html>