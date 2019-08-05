<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<%
	SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo");
%>

<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>租客换房</title>
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
	<div id="exchangeHousesDlg">
		<div class="process-bar" style="padding:0 10px">
			<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.能源计算</span> 
			<span class="process arrow-in arrow-out step2" data-step="2"><span class="process-require">*</span>2.常规计算</span> 
			<span class="process arrow-in arrow-out step3" data-step="3"><span class="process-require">*</span>3.选房选客</span> 
			<span class="process arrow-in arrow-out step4" data-step="4"><span class="process-require">*</span>4.合同信息</span> 
			<span class="process arrow-in arrow-out step5" data-step="5"><span class="process-require">*</span>5.账单信息</span> 
			<span class="process arrow-in arrow-out step6" data-step="6">6.资产信息</span>
			<span class="process arrow-in arrow-out step7" data-step="7">7.其他信息</span>
			<span class="process arrow-in arrow-out step8" data-step="8"><span class="process-require">*</span>8.换房合计</span>
		</div>
		<hr color=#95b8e7 size=1 style="margin:3px">
		<div class="exchangeHousesSteps">
			<div class="step exchangeHousesStep1">
				<input id="renterCheckout_rcoSave" type="hidden">
				<input id="address" type="hidden" value="${param.address}">
				<input id="renterName" type="hidden" value="${param.renterName}">
				<input id="renterTel" type="hidden" value="${param.renterTel}">
				<input id="renterPopIdcard" type="hidden" value="${param.renterPopIdcard}">
				<div style="min-height:390px;padding:5px 0 0 0;" class="clearfix">
					<legend>相关信息</legend>
					<table class="showtable w16">
						<tbody>
							<tr>
								<td>房屋地址</td>
								<td colspan="2"><span class="detailAddress" clear="clear"></span>
								</td>
								<td>合同周期</td>
								<td colspan="2"><span class="jrrBeginTime" clear="clear"></span>
									至 <span class="jrrEndTime" clear="clear"></span></td>
							</tr>
							<tr>
								<td>租客名称</td>
								<td><span class="renterPopName" clear="clear"></span></td>
								<td>联系方式</td>
								<td><span class="renterPopTelephone" clear="clear"></span></td>
								<td>证件号码</td>
								<td><span class="renterPopIdcard" clear="clear"></span></td>
							</tr>
							<tr>
								<td>租金</td>
								<td><span class="jrrMoney" clear="clear"></span>元/月</td>
								<td>管理费</td>
								<td><span class="jrrManageCost" clear="clear"></span>元/月</td>
								<td>服务费</td>
								<td><span class="jrrServerCost" clear="clear"></span>元/月</td>
							</tr>
							<tr>
								<td>网络费</td>
								<td><span class="hrWifiCharge" clear="clear"></span>元/月</td>
								<td>电视费</td>
								<td><span class="hrTvCharge" clear="clear"></span>元/月</td>
								<td>其他费</td>
								<td><span class="hrOtherPay" clear="clear"></span>元/月</td>
							</tr>
							<tr>
								<td>房屋押金</td>
								<td><span class="hrHouseDeposit" clear="clear"></span>元</td>
								<td>水电押金</td>
								<td><span class="hrPowerDeposit" clear="clear"></span>元</td>
								<td>门卡押金</td>
								<td><span class="hrDoorDeposit" clear="clear"></span>元</td>
							</tr>
							<tr>
								<td>其他押金</td>
								<td><span class="hrOtherDeposit" clear="clear"></span>元</td>
								<td>超期天数</td>
								<td><span id="renterCheckout_rcoDaysOverdue" clear="clear"></span>天</td>
								<td>房屋备注</td>
								<td colspan="3"><span class="hrHouseNote" clear="clear"></span></td>
							</tr>
							<tr>
								<td>预约时间</td>
								<td><span id="exchangeHouses_rcoCheckOutTime" clear="clear"></span></td>
								<td>退房性质</td>
								<td><span id="exchangeHouses_rcoCheckOutNature"
									clear="clear">租客换房</span></td>
							</tr>
							<tr>
								<td>申请人</td>
								<td><span id="exchangeHouses_rcoApplyUserName"
									clear="clear"></span></td>
								<td>退房备注</td>
								<td colspan="3" style="padding:0px;"><textarea
										id="exchangeHouses_rcoCheckOutReason" clear="clear"
										style="display: block;width:100%;height:38px;border: 1px solid #95B8E7;"></textarea>
								</td>
							</tr>
						</tbody>
					</table>
					<legend>能源抄表</legend>
					<table class="showtable w16">
						<tbody>
							<tr>
								<td style="width:16.6%">仪表</td>
								<td style="width:16.6%">退房抄表</td>
								<td style="width:16.6%">上次结清</td>
								<td style="width:16.6%">差值</td>
								<td style="width:33.6%">计费方案</td>
							</tr>
							<tr class="water">
								<td style="padding:0px;">水表</td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoWaterBase" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoLastWaterBase" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><span
									id="renterCheckout_rcoWaterPrice" clear="clear"></span></td>
								<td style="padding:0px;"><span id="water" clear="clear"></span>
								</td>
							</tr>
							<tr class="elect">
								<td style="padding:0px;">电表</td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoElectricityBase" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoLastElectricityBase" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><span
									id="renterCheckout_rcoElectricityPrice" clear="clear"></span></td>
								<td style="padding:0px;"><span id="electrit" clear="clear"></span>
								</td>
							</tr>
							<tr class="gas">
								<td style="padding:0px;">燃气表</td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoGasBaseNumber" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoGasBaseLast" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><span
									id="renterCheckout_rcoGasPrice" clear="clear"></span></td>
								<td style="padding:0px;"><span id="gas" clear="clear"></span>
								</td>
							</tr>
							
							<tr class="hotwater">
								<td style="padding:0px;">热水表</td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoHotWaterBaseNumber" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoHotWaterBaseLast" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><span
									id="renterCheckout_rcoHotWaterPrice" clear="clear"></span></td>
								<td style="padding:0px;"><span id="hotWater" clear="clear"></span>
								</td>
							</tr>
							
							<tr class="hotair">
								<td style="padding:0px;">暖气表</td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoHotAirBaseNumber" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><input
									id="renterCheckout_rcoHotAirBaseLast" type="number"
									data-type="money" data-fn-blur="calwegdiff();"
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require"></td>
								<td style="padding:0px;"><span
									id="renterCheckout_rcoHotAirPrice" clear="clear"></span></td>
								<td style="padding:0px;"><span id="hotAir" clear="clear"></span>
								</td>
							</tr>
						</tbody>
					</table>
					<legend>退房信息</legend>
					<div class="clearfix">
						<div style="margin:5px 0 0 12px;float:left;">
							手续状态：<select id="renterCheckout_rcoProcedures"
								style="width:100px;" onchange="changeProcedures()"
								choose="choose" require="require">
								<option>正常</option>
							</select>
						</div>
						<div style="margin:5px 0 0 24px;float:left;">
							经办人：<input id="handlerShowUserInfo" class="choose_user_button"
								doFlag="handler" doFun="" style="width:150px;cursor: pointer;"
								type="text" readonly="readonly" clear="clear" require="require">
							<input id="handlerGetUserStoreId" type="hidden"> <input
								id="handlerGetUserDetId" type="hidden"> <input
								id="handlerGetUserId" type="hidden">
							<div id="handlerShowUserInfoDiv" style="display:none;"></div>
						</div>
						<div style="margin:5px 0 0 12px;float:left;">
							办理时间：<input id="renterCheckout_rcoCheckOutActualTime"
								style="width:100px;" clear="clear" require="require"
								class="Wdate" readonly="readonly" ><!-- onfocus="WdatePicker({autoPickDate:true,dchanging:checkoutRenterDay()})" -->
						</div>
						<div style="margin:5px 0 0 12px;float:left;">
						退款时间：<input id="renterCheckout_rcoARefundOfTime" style="width:100px;" clear="clear" require="require"
							class="Wdate" onfocus="WdatePicker({autoPickDate:true})" >
					</div>
					</div>
					<br> <br>
				</div>
				<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment2('private')">退房照片</a>
					<a class="easyui-linkbutton" style="margin:0 5px;"
						onclick="nextStep()">下一步</a>
				</div>
			</div>
		</div>
		<div class="exchangeHousesSteps">
			<div class="step exchangeHousesStep2">
				<div style="min-height:390px;padding:5px 0 0 0;">
					<div style="margin:0 0 0 0;">
						<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event"
							onclick="addRepair()">添加维保</a>
					</div>
					<input type="hidden" id="renterCheckout_rcoRepairNote">
					<div style="margin:10px 0 0 0;">
						<table id="repairDg"
							style="width:924px;height:127px;table-layout:fixed;overflow:hidden;"
							class="easyui-datagrid"
							data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
							<thead>
								<tr>
									<th field="repEventRp" width="624" align="center">维保描述</th>
									<th field="repTollRp" width="100" align="center">费用</th>
									<th field="repTollRp2" width="100" align="center"
										formatter="deleteRepair">操作</th>
								</tr>
							</thead>
						</table>
					</div>
					<div style="margin:5px 0 0 0;">
						<a class="easyui-linkbutton" plain="true" iconCls="icon-shuaxin"
							onclick="reflashRenter()">刷新</a> <a class="easyui-linkbutton"
							plain="true" iconCls="icon-add-event" onclick="updateRenter()">修正</a>
					</div>
					<div class="clearfix">
						<div style="margin: 0 0 10px 0;" class="clearfix">
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								房屋押金：<input type="number" style="width:80px;"
									id="renterCheckout_rcoReturnDeposit" data-type="money"
									clear="clear" require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								水电押金：<input type="number" style="width:80px;"
									id="renterCheckout_rcoReturnPowerDeposit" data-type="money"
									clear="clear" require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								门卡押金：<input type="number" style="width:80px;"
									id="renterCheckout_rcoReturnDoorDeposit" data-type="money"
									clear="clear" require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								其他押金：<input type="number" style="width:80px;"
									id="renterCheckout_rcoReturnOtherDeposit" data-type="money"
									clear="clear" require="require" data-read="1">
							</div>
							<div class="water"
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								水费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoWaterCombined" data-type="money"
									clear="clear" require="require" data-read="1"> <input
									id="renterCheckout_rcoSysWater" type="hidden">
							</div>
							<div class="elect"
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								电费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoElectricityCombined" data-type="money"
									clear="clear" require="require" data-read="1"> <input
									id="renterCheckout_rcoSysElectricity" type="hidden">
							</div>
							<div class="gas"
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								燃气费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoGasCombined" data-type="money"
									clear="clear" require="require" data-read="1"> <input
									id="renterCheckout_rcoSysGas" type="hidden">
							</div>
							
							
							<div class="hotwater"
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								热水费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoHotWaterCombined" data-type="money"
									clear="clear" require="require" data-read="1"> <input
									id="renterCheckout_rcoSysHotWater" type="hidden">
							</div>
							<div class="hotair"
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								暖气费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoHotAirCombined" data-type="money"
									clear="clear" require="require" data-read="1"> <input
									id="renterCheckout_rcoSysHotAir" type="hidden">
							</div>
							
							
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								租金：<input type="number" style="width:80px;"
									id="renterCheckout_rcoBeyondTheRent" data-type="money"
									clear="clear" require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								管理费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoPropertyCostsInTotal" data-type="money"
									clear="clear" require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								服务费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoServerCost" data-type="money"
									clear="clear" require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								网络费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoWifiCost" data-type="money" clear="clear"
									require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								电视费：<input type="number" style="width:80px;"
									id="renterCheckout_rcoTvCost" data-type="money" clear="clear"
									require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
								维保费用：<input type="number" style="width:80px;"
									id="renterCheckout_rcoRepairDamages" data-type="money"
									clear="clear" require="require" data-read="1">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'
								id="yucun">
								预存款：<input type="number" style="width:80px;"
									id="renterCheckout_rcoLicenceFee" disabled="disabled"
									clear="clear">
							</div>
							<div
								style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'
								id="qianjie">
								欠结款：<input type="number" style="width:80px;"
									id="renterCheckout_rcoOtherChargesInTotal" disabled="disabled"
									clear="clear">
							</div>
						</div>
						<input id="renterCheckout_rcoDeductionCombined"
							style="display:none;" clear="clear">
						<!-- 合计应缴 -->
						<input id="renterCheckout_rcoTotalShouldBeReturned"
							style="display:none;" clear="clear">
						<!-- 合计应退 -->
					</div>
					<div style="margin: 5px 0 0 0px;" class="clearfix">
						<div style="float:left;">
							<a class="easyui-linkbutton" plain="true"
								iconCls="icon-add-event" onclick="jiesuan()">结算</a>
						</div>
						<div style="float:right;">
							<span class="shijijiesuan">应退款：</span><span id="jiesuan"
								style="color:red;" clear="clear"></span>元
						</div>
					</div>
					<div style="margin: 5px 0 0 0px;" class="clearfix">
						<!-- 应缴-->
						<textarea id="renterCheckout_rcoPayNote"
							style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;"
							readonly clear="clear" require="require"></textarea>
						<!-- 应退 -->
						<textarea id="renterCheckout_rcoReturnNote"
							style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;margin:0 0 0 1%;"
							readonly clear="clear" require="require"></textarea>
					</div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;"
						onclick="gotoStep('exchangeHouses', 1);">上一步</a> <a
						class="easyui-linkbutton" style="margin:0 5px;"
						onclick="validateStep2('exchangeHouses', 3);">下一步</a>
				</div>
			</div>
		</div>
		<div class="exchangeHousesSteps">
			<div class="step exchangeHousesStep3">
				<div style="min-height:390px;padding:5px 0 0 0;">
					<fieldset>
						<legend>房源</legend>
						<div style="margin:5px 0 0 0;">
							<a class="easyui-linkbutton" style="margin:0 5px;"
								onclick="chooseHouseForStore();">选择房源</a> <input type="hidden"
								id="addHrHsId" clear="clear" require="require">
							<!-- 未租id -->
							<input type="hidden" id="addHrHouseId" clear="clear">
							<!-- 盘源id -->
							<input type="hidden" id="addHrHouseDictId" clear="clear">
							<!-- 字典id -->
							<input type="hidden" id="addHrLandlordId" clear="clear">
							<!-- 房东id -->
							<input type="hidden" id="addHrLandlordCheckEnd" clear="clear">
							<!-- 托管到期时间 -->
							<input type="hidden" id="addHrIdentifier" clear="clear">
							<!-- 合租房门牌号前缀 -->
							<input type="hidden" id="addHrFlatShareLogo" clear="clear">
							<!-- 拆分标识0,1 -->
							<input type="hidden" id="addHrManagerUserId" clear="clear">
							<!-- 房管员id -->
							<input type="hidden" id="addHrManagerUserDept" clear="clear">
							<!-- 房管员部门 -->
							<input type="hidden" id="addHrManagerUserStore" clear="clear">
							<!-- 房管员门店 -->
						</div>
						<table class="maintable hsInfo"
							style="margin-top:5px; width:400px">
							<center>
								<tbody>
									<tr>
										<td>地址：</td>
										<td colspan="3"><span class="hsAddCommunity"
											clear="clear"></span> <span class="hsAddBuilding"
											clear="clear"></span> <span class="hsAddDoorplateno"
											clear="clear"></span></td>
									</tr>
									<tr>
										<td>户型：</td>
										<td><span class="hsSectionType" clear="clear"></span></td>
										<td>朝向：</td>
										<td><span class="hsHouseDirection" clear="clear"></span></td>
									</tr>
									<tr>
										<td>面积：</td>
										<td><span class="hsHouseSquare" clear="clear"></span><span>m²</span></td>
										<td>用途：</td>
										<td><span class="hsHouseOwner" clear="clear"></span></td>
									</tr>
									<tr>
										<td>房东：</td>
										<td><span class="laPopName" clear="clear"></span></td>
										<td>电话：</td>
										<td><span class="laPopTelephone" clear="clear"></span></td>
									</tr>
									<tr style="display:none;">
										<td>城市：</td>
										<td><span class="hsAddCity" clear="clear"></span></td>
										<td>城区：</td>
										<td><span class="hsAddDistrict" clear="clear"></span></td>
									</tr>
									<tr style="display:none;">
										<td>片区：</td>
										<td><span class="hsAddZone" clear="clear"></span></td>
										<td>地址：</td>
										<td><span class="hsAddStreet" clear="clear"></span></td>
									</tr>
									<tr style="display:none;">
										<td>楼盘名称：</td>
										<td><span class="hsAddCommunity" clear="clear"></span></td>
										<td>座栋：</td>
										<td><span class="hsAddBuilding" clear="clear"></span></td>
									</tr>
									<tr style="display:none;">
										<td>门牌号：</td>
										<td><span class="hsAddDoorplateno" clear="clear"></span></td>
										<td></td>
										<td><span class="" clear="clear"></span></td>
									</tr>
								</tbody>
							</center>
						</table>
					</fieldset>
					<br>
					<fieldset>
						<legend>租客</legend>
						<div style="margin:5px 0 0 0;">
							<input id="identityInformation" type="hidden" clear="clear" />
							<lable style="display:inline-block;width:80px;">
							<span class="require">*</span>姓名：</lable>
							<input id="addHrRenterName" style="width:100px;" clear="clear"
								require="require" disabled="disabled" value="${param.renterName }">
							<lable style="display:inline-block;width:80px;">
							<span class="require v-hide">*</span>备注：</lable>
							<input id="addHrRenterNameRemark" style="width:100px;"
								clear="clear" onKeyUp="chineseNumerals(this.id);">
						</div>
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;">
							<span class="require">*</span>电话：</lable>
							<input id="addHrRenterPhone" style="width:100px;" clear="clear"
								require="require" disabled="disabled" value="${param.renterTel }">
							<lable style="display:inline-block;width:80px;">
							<span class="require">*</span>身份证：</lable>
							<input id="addHrRenterIDCard" style="width:180px;" clear="clear"
								require="require" disabled="disabled" value="${param.renterPopIdcard }"> <input id="addHrRenterBirth"
								style="display: none;"> <input id="addHrRenterSex"
								style="display: none;"> <input id="addHrRenterNation"
								style="display: none;"> <input
								id="addHrRenterIdcardAddress" style="display: none;">
						</div>
						
						<!-- <div id="addHrDepositInfoDiv" style="display:none">
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>定金：</lable>
							<input id="addHrDeposit" style="width:100px" disabled="disabled" clear="clear">
							<input id="addHrDepositRenterId" type="hidden" clear="clear">
							<input id="addHrDepositFollowUserId" type="hidden" clear="clear">
							<input id="addHrDepositRenterName" type="hidden" clear="clear">
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>经手人：</lable>
							<input id="addHrDepositUserName" style="width:180px" disabled="disabled" clear="clear">
						</div>
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>开始时间：</lable>
							<input id="addHrDepositDateBegin" style="width:100px" disabled="disabled" clear="clear">
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>到期时间：</lable>
							<input id="addHrDepositDateEnd" style="width:180px" disabled="disabled" clear="clear">
						</div>
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>退还账户：</lable>
							<select style="width:100px" onchange="changeWay1(0)" class="add_financial_way" 
								id="depositFinancialWay" choose="choose">
								<option></option>
							</select>
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>账户名称：</lable>
							<select style="width:180px" id="depositAccountName" onchange="getAccountId1()" choose="choose">
								<option></option>
							</select>
						</div>
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>账户归属：</lable>
							<input style="width:100px" readonly="readonly" id="depositFinancialAccountBelong" clear="clear">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>账户号码：</lable>
							<input style="width:180px" readonly="readonly" id="depositFinancialAccountNums" clear="clear"> 
							<input id="depositFinancialBankNums" type="hidden" clear="clear">
						</div> 
					</div>-->
					</fieldset>
				</div>
				<div class="btn-bar"
					style="margin:10px 10px 0 10px;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('exchangeHouses', 2);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="validateStep('exchangeHouses', 4);">下一步</a> 
				</div>
			</div>
		</div>
		<div class="exchangeHousesSteps">
			<div class="step exchangeHousesStep4">
				<div style="min-height:390px;padding:5px 0 0 0;">
					<div>
						<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">合同附件上传</a>
						<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
					</div>
					<fieldset>
						<legend>期限</legend>
						<div style="margin:0px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>合同期限：</lable>
							<input class="Wdate" id="addHrBegin" style="width:80px" clear="clear" require="require"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeAddHrContDate()});acquisitionOfRentDay(1);">
							-
							<input class="Wdate" id="addHrEnd" style="width:80px" clear="clear" require="require"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeAddHrContDate()})">
							<span id="addHrTerm" clear="clear"></span>
						</div>
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>签约时间：</lable>
							<input class="Wdate" id="addHrSigned" style="width:80px" clear="clear" require="require"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})">
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>合同编号：</lable>
							<input id="addHrContractNum" clear="clear"
								onkeyup="$(this).val($(this).val().toUpperCase());$('#addHrContractNumCheckoutIf').val('');$('#addHrContractNumTips').html('');"
								onblur="contractNumCheckout('addHrContractNum','addHrContractNumCheckoutIf','addHrContractNumTips')"><!-- 合同编号 -->
							<input id="addHrContractNumCheckoutIf" type="hidden" clear="clear"><!-- 合同编号id -->
							<span id="addHrContractNumTips" clear="clear"></span><!-- 验证后的文字描述 -->
						</div>
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>合同性质：</lable>
							<select id="addHrContractType" style="width:80px;" choose="choose" require="require" tabindex="1">
								<option></option>
							</select>
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>收租方式：</lable>
							按<select id="advanceMode" style="width:60px;" require="require" tabindex="1" onchange="acquisitionOfRentDay(1);">
								<option value="1">自然月</option>
								<option value="2">整月</option>
							</select> 方式
							&nbsp;固定每月的 <input id="addHrInAdvancePay" type="number" style="width:25px" clear="clear" require="require"> 号收
							<select id="numberMode" style="width:50px;" tabindex="1">
								<option value="1">本月</option>
								<option value="2">次月</option>
							</select>租金
						</div>
					</fieldset>
					<fieldset class="setRenterNewFinancialDiv input">
						<legend>费用</legend>
						<div style="margin:0px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>租金：</lable>
							<select class="add_payment_type" id="addHrRentPaymentType" style="width:80px;" choose="choose" require="require" tabindex="1" >
								<option></option>
							</select>
							<input type="number" style="width:80px;" id="addHrRentPrice" class="payment" clear="clear" require="require" mType="租金" bigType="主营类"  onchange="countTotalFee()"/>元/月
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>物管费：</lable>
							<select class="add_payment_type" id="addHrManagePayment" style="width:80px;" choose="choose" require="require" tabindex="1"  >
								<option></option>
							</select>
							<input type="number" style="width:80px;" id="addHrManageCost" class="payment" clear="clear" require="require" mType="物管费" bigType="能源类" onchange="countTotalFee()"/>元/月
						</div>
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>服务费：</lable>
							<select class="add_payment_type" id="addHrServerPayment" style="width:80px;" choose="choose" require="require" tabindex="1">
								<option></option>
							</select>
							<input type="number" style="width:80px;" id="addHrServerCost" class="payment" clear="clear" require="require" mType="服务费" bigType="主营类" onchange="countTotalFee()"/>元/月
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>网络费：</lable>
							<select class="add_payment_type" id="addHrWifiChargePayment" style="width:80px;" choose="choose" require="require" tabindex="1">
								<option></option>
							</select>
							<input type="number" style="width:80px;" id="addHrWifiCharge" class="payment" clear="clear" mType="网络费"  bigType="能源类" onchange="countTotalFee()"/>元/月
						</div>
						<div style="margin:5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>电视费：</lable>
							<select class="add_payment_type" id="addHrTvChargePayment" style="width:80px;" choose="choose" require="require" tabindex="1">
								<option></option>
							</select>
							<input type="number" style="width:80px;" id="addHrTvCharge" class="payment" clear="clear" mType="电视费" bigType="能源类" onchange="countTotalFee()"/>元/月
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>其他费：</lable>
							<select class="add_payment_type" id="addHrOtherPayment" style="width:80px;" choose="choose" require="require" tabindex="1">
								<option></option>
							</select>
							<input type="number" style="width:80px;" id="addHrOtherPay" class="payment" clear="clear" mType="其他费" bigType="主营类" onchange="countTotalFee()"/>元/月
						</div>
					</fieldset>
					<fieldset class="setRenterNewFinancialDiv">
						<legend>收款信息</legend>
						<div style="margin:0px 0 0 0;">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>房屋押金：</lable>
							<input id="addHrHouseDeposit" type="number" style="width:80px;" clear="clear" require="require" mType="房屋押金" bigType="押金类" onchange="countTotalFee()"/>元
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>门卡押金：</lable>
							<input id="addHrDoorDeposit" type="number" style="width:80px;" clear="clear" require="require" mType="门卡押金" bigType="押金类" onchange="countTotalFee()"/>元
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>水电押金：</lable>
							<input id="addHrPowerDeposit" type="number" style="width:80px;" clear="clear" require="require" mType="水电押金" bigType="押金类" onchange="countTotalFee()"/>元
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>其他押金：</lable>
							<input id="addHrOtherDeposit" type="number" style="width:80px;" clear="clear" require="require" mType="其他押金" bigType="押金类" onchange="countTotalFee()"/>元
						</div>
						<div style="margin:5px 0 0 0;" >
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>门卡工本：</lable>
							<input id="addHrDoorTrendFee" type="number" style="width:80px;" clear="clear" require="require" mType="门卡工本" bigType="主营类" onchange="countTotalFee()"/>元
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>佣金服务：</lable>
							<input id="addHrComServiceFee" type="number" style="width:80px;" clear="clear" require="require" mType="佣金服务" bigType="主营类" onchange="countTotalFee()"/>元
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>换锁费用：</lable>
							<input id="addHrLockFee" type="number" style="width:80px;" clear="clear" require="require" mType="换锁费用" bigType="维修类" onchange="countTotalFee()"/>元
							<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>其他费用：</lable>
							<input id="addHrOtherFee" type="number" style="width:80px;" clear="clear" require="require" mType="其他费用" bigType="主营类" onchange="countTotalFee()"/>元
						</div>
						<div id="addFee" style="margin:5px 0 0 0;" >
							<div id="totalFeeDiv" style="float: left" >
								<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>费用总额：</lable>
								<input id="totalFee"  type="number" style="width:80px;" clear="clear" require="require" disabled />元
							</div>
						</div>
					</fieldset>
					<fieldset>
						<legend>抄表</legend>
						<div style="margin:0px 0 0 0;" class="water">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>水底数：</lable>
							<input id="addHrWater" type="number" style="width:80px" clear="clear" require="require" class="inputHide">
							<select id="addHrWaterPlan" style="width:150px" choose="choose">
								<option></option>
							</select>
						</div>
						<div style="margin:5px 0 0 0;" class="elect">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>电底数：</lable>
							<input id="addHrElect" type="number" style="width:80px" clear="clear" require="require" class="inputHide">
							<select id="addHrElectPlan" style="width:150px" choose="choose">
								<option></option>
							</select>
						</div>
						<div style="margin:5px 0 0 0;" class="gas">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>气底数：</lable>
							<input id="addHrGas" type="number" style="width:80px" clear="clear" require="require" class="inputHide">
							<select id="addHrGasPlan" style="width:150px" choose="choose">
								<option></option>
							</select>
							
						</div>
						<div style="margin:5px 0 0 0;" class="hotwater">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>热水底数：</lable>
							<input id="addHrHotWater" type="number" style="width:80px" clear="clear" require="require" class="inputHide">
							<select id="addHrHotWaterPlan" style="width:150px" choose="choose">
								<option></option>
							</select>
							
						</div>
						<div style="margin:5px 0 0 0;" class="hotair">
							<lable style="display:inline-block;width:80px;"><span class="require">*</span>暖气底数：</lable>
							<input id="addHrHotAir" type="number" style="width:80px" clear="clear" require="require" class="inputHide">
							<select id="addHrHotAirPlan" style="width:150px" choose="choose">
								<option></option>
							</select>
						</div>
						<a class="easyui-linkbutton" iconCls="icon-edit" onclick="readingsModification();" style="margin:-6px 0 0 0;float:right;" id="aShowHide">修改读数</a>
					</fieldset>
				</div>
				<div class="btn-bar" style="margin:10px 10px 0 10px;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('exchangeHouses', 3);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="addNextStep();">下一步</a>
					<!-- <a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddHr();">保存</a> -->
				</div>
			</div>
		</div>
		<div class="exchangeHousesSteps">
			<div class="step exchangeHousesStep5">
				<div style="padding:10px 0 0 5px;width:98%;">
					<table class="easyui-datagrid" id="preGeneratingBillTable" style="width:100%;height:327px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,onClickCell:onClickCell">
						<thead>
							<tr>
								<th width="10" align="center" field="jciPeriods">期数</th>
								<th width="10" align="center" field="jciBeginPeriods">开始周期</th>
								<th width="10" align="center" field="jciEndPeriods">结束周期</th>
								<th width="10" align="center" field="jciNature">收支性质</th>
								<th width="10" align="center" field="jciType">类别</th>
								<th width="10" align="center" field="jciMoney" editor="{type:'numberbox',options:{precision:2}}">金额</th>
								<th width="10" align="center" field="jciState">状态</th>
								<th width="10" align="center" field="jciFukuanri">收款日</th>
							</tr>
						</thead>
					</table>
				</div>
				
				<div class="btn-bar" style="margin:10px 10px 0 10px;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('exchangeHouses', 4);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="validateStep('exchangeHouses', 6);queryAsset2(1,0);">下一步</a>
					<!-- <a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddHr();">保存</a> -->
				</div>
			</div>
		</div>
		<div class="exchangeHousesSteps">
			<div class="step exchangeHousesStep6">
				<div style="min-height:390px;padding:5px 0 0 0;">
					<div class="clearfix" style="margin:0 0 5px 10px;">
						<a class="easyui-linkbutton" plain="true" iconCls="icon-qianru" onclick="moveInAssets(2)">迁入资产</a>
						<a class="easyui-linkbutton" plain="true" iconCls="icon-qianchu" onclick="moveOutAssets(2)">迁出资产</a>
					</div>
					<div style="padding:0 5px 0 5px;width:98%;">
						<table class="easyui-datagrid" id="assetsInfoTable2" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
							data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
							<thead>
								<tr>
									<th width="10" align="center" field="saType">所属</th>
									<th width="10" align="center" field="saClassify">类型</th>
									<th width="10" align="center" field="saName">名称</th>
									<th width="10" align="center" field="saBrand">品牌</th>
									<th width="10" align="center" field="saModel">型号</th>
									<th width="10" align="center" field="saStatus">状态</th>
									<th width="10" align="center" field="saUse">使用情况</th>
									<th width="10" align="center" field="saRemarks">备注</th>
								</tr>
							</thead>
						</table>
						<div id="assetsPageDiv2" style="width:100%;height:30px;text-align:center;"></div>
					</div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 0 10px;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('exchangeHouses', 5);">上一步</a> 
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="validateStep('exchangeHouses', 7);">下一步</a> 
					<!-- <a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddHr();">保存</a>  -->
				</div>
			</div>
		</div>
		<div class="exchangeHousesSteps">
			<div class="step exchangeHousesStep7">
				<div style="min-height:390px;padding:5px 0 0 0;">
					<div id="addHrSalesmanDiv" style='margin:5px 0 0 0;'>
						<lable style="display:inline-block;width:100px;"><span class="require v-hide">*</span>业务员：</lable>
						<input id="addHrSalesmanShowUserInfo" class="choose_user_button" doFlag="addHrSalesman" doFun="changeSalesman(\'#addHrSalesmanAllProfit\',\'addProfit\',\'addHrSalesman\')"
							style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
						<input id="addHrSalesmanGetUserStoreId" type="hidden" clear="clear">
						<input id="addHrSalesmanGetUserDetId" type="hidden" clear="clear">
						<input id="addHrSalesmanGetUserId" type="hidden" clear="clear">
						<div id="addHrSalesmanShowUserInfoDiv" style="display:none;"></div>
						<input id="addHrSalesmanAllProfit" type="checkbox" checked="checked" style="vertical-align:sub;" onchange="checkProfit('#addHrSalesmanAllProfit', 'addProfit', 'addHrSalesman')">
						<label>业务员100%收益</label>
					</div>
					<div id="addProfitDiv" clear="clear"></div>
					<div style="margin:5px 0 0 0;">
						<lable style="display:inline-block;width:100px;vertical-align:top;"><span class="require v-hide">*</span>备注：</lable>
						<textarea id="addHrHouseNote" style="height:65px;width:400px" clear="clear"></textarea>
					</div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 0 10px;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('exchangeHouses', 6);">上一步</a> 
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('exchangeHouses', 8);queryCheckOut();">下一步</a> 
					<!-- <a class="easyui-linkbutton" style="margin:0 5px;visibility:hidden">下一步</a>  -->
					<!-- <a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddHr();">保存</a> -->
				</div>
			</div>
		</div>
		<div class="exchangeHousesSteps">
			<div class="step exchangeHousesStep8">
				<div style="min-height:390px;padding:5px 0 0 0;" class="clearfix">
					<div style="margin: 0 0 3px 0;">
						<div style="float: left;margin: 0 0 0 5px;">
							<span style="font-size: 15px;">抵扣方式：</span> 
							<input type="radio" name="deductionMethod" id="fullAmount" checked="checked" value="0" onclick="fullAmount();"/>
							<label style="font-size: 15px;" for="fullAmount">全额抵扣</label>
							<input type="radio" name="deductionMethod" id="depositRent" value="1" onclick="fullAmount();"/>
							<label style="font-size: 15px;" for="depositRent">押金+第一期租金</label>
							<input type="radio" name="deductionMethod" id="deposit" value="2" onclick="fullAmount();"/>
							<label style="font-size: 15px;" for="deposit">抵扣押金</label>
						</div>
						<div style="float: right;margin: 0 0 0 0;">
							<span style="font-size: 15px;">退房编号：</span> <span
								style="font-size: 15px;color: red;" class="rcoNumber"
								clear="clear"></span>
						</div>
					</div>
					<table class="showtable" style="margin: 1% 0 0 0 ;">
						<tbody>
							<tr class="renterRefundAccount">
								<td style="width: 16.6%;">公司结算账户</td>
								<td style="width: 16.6%;padding:0px;"><select
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;"
									id="renterFinancialWay" class="add_financial_way"
									onchange="changeWay('renter',0)" choose="choose" require="require">
										<option></option>
								</select></td>
								<td style="width: 16.6%;">账户名称</td>
								<td style="width: 16.6%;padding:0px;"><select
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;"
									id="renterFinancialAccountName"
									onchange="getAccountId('renter')" choose="choose" require="require">
										<option></option>
								</select></td>
								<td style="width: 16.6%;">收支方式</td>
								<td style="width: 16.6%;padding:0px;"><select
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;"
									id="renterCheckout_rcoPayType" class="financial_payType"
									onchange="financialMode()" choose="choose" require="require">
										<option></option>
								</select></td>
							</tr>
							<tr class="renterRefundAccount">
								<td style="width: 16.6%;">账户归属</td>
								<td style="width: 16.6%;padding:0px;"><input
									style="width: 100%;height: 27px;border: 0;padding-left:5px;"
									readonly="readonly" id="renterFinancialAccountBelong"
									clear="clear"></td>
								<td style="width: 16.6%;">账户号码</td>
								<td style="padding:0px;" colspan="3"><input
									style="width: 100%;height: 27px;border: 0;padding-left:5px;"
									readonly="readonly" id="renterFinancialAccountNums"
									clear="clear"> <input id="renterFinancialBankNums"
									style="display:none" clear="clear"></td>
							</tr>
							<tr>
								<td style="width: 16.6%;">退房备注</td>
								<td style="width: 83.4%;padding:0px;text-align: left;"
									colspan="5"><span class="rcoCheckOutReason" clear="clear"></span>
								</td>
							</tr>
						</tbody>
					</table>
					<br>
					<div style="padding:0 5px 0 5px;width:98%;">
						<table class="easyui-datagrid" id="checkOutDetails" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
							data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
							<thead>
								<tr>
									<th width="30" align="center" field="jfAccountingWhy">收支目标</th>
									<th width="10" align="center" field="jfTheOwnershipType">归属类型</th>
									<th width="10" align="center" field="jfBelongingToTheName">归属名字</th>
									<th width="10" align="center" field="jfNatureOfThe">收支性质</th>
									<th width="20" align="center" field="jfBigType">收支大类</th>
									<th width="20" align="center" field="jfAccountingSpecies">收支种类</th>
									<th width="10" align="center" field="jfSumMoney">收支金额</th>
									<th width="10" align="center" field="jfClosedWay">账户类型</th>
								</tr>
							</thead>
						</table>
					</div>
					<div style="float: right;margin: 3px 0 3px 0;font-size:15px;">
						<div>
							<span id="shijijiesuan" class="shijijiesuan" style="font-size:15px;">原房应退款：</span>
							<span style="color: red;font-size:15px;"> 
							<span class="actualRefund" style="color: red;font-size:15px;" clear="clear"></span>元 (大写 : <span class="actualRefund2"
								style="color: red;font-size:15px;" clear="clear"></span>)
							</span>
						</div>
					</div>
					<div style="padding:0 5px 0 5px;width:98%;">
						<table class="easyui-datagrid" id="setRenterNewFinancialTable" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
							data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
							<thead>
								<tr>
									<th width="25" align="center" field="jfAccountingWhy">收支目标</th>
									<th width="10" align="center" field="jfTheOwnershipType">归属类型</th>
									<th width="10" align="center" field="jfBelongingToTheName">归属名字</th>
									<th width="10" align="center" field="jfNatureOfThe">收支性质</th>
									<th width="10" align="center" field="jfAccountingSpecies">收支种类</th>
									<th width="10" align="center" field="jfSumMoney">收支金额</th>
									<th width="10" align="center" field="jfTicketNumber">票据编号</th>
									<th width="15" align="center" field="jfFinanNote">备注</th>
								</tr>
							</thead>
							<div style='margin:5px 0 5px 10px;'>
								<a  class="easyui-linkbutton" iconcls="icon-zhangdan" onclick="setNewFinancialMoney()"> 新签收款</a>
							</div>
						</table>
					</div>
					
					<div class="clearfix">
						<div style="float: right;margin: 3px 0 3px 0;font-size:15px;">
							<div>
								<span style="font-size:15px;">新房应收款：</span> <span
									style="color: red;font-size:15px;"> <span id="setRenterNewFinancialMoneyTotal"
									 style="color: red;font-size:15px;"
									clear="clear"></span>元 (大写 : <span class="setRenterNewFinancialMoneyTotal"
									style="color: red;font-size:15px;" clear="clear"></span>)
								</span>
							</div>
						</div>
					</div>
					<div style="padding:0 5px 0 5px;width:98%;">
						<table class="easyui-datagrid" id="settotalNewFinancialTable" style="width:100%;height:55px;table-layout:fixed;overflow:hidden;"
							data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
							<thead>
								<tr>
									<th width="25" align="center" field="jfAccountingWhy">收支目标</th>
									<th width="10" align="center" field="jfTheOwnershipType">归属类型</th>
									<th width="10" align="center" field="jfBelongingToTheName">归属名字</th>
									<th width="10" align="center" field="jfNatureOfThe">收支性质</th>
									<th width="10" align="center" field="jfAccountingSpecies">收支种类</th>
									<th width="10" align="center" field="jfSumMoney">收支金额</th>
									<th width="10" align="center" field="jfTicketNumber">票据编号</th>
									<th width="15" align="center" field="jfFinanNote">备注</th>
								</tr>
							</thead>
						</table>
					</div>
					<table class="showtable" style="margin: 1% 0 0 0 ;">
						<tbody>
							<tr class="renterRefundAccount">
								<td style="width: 40%;" id="totalTitle">合计差额应收款</td>
								<td style="width: 60%;padding:0px;text-align: center;"><span style="color: red;font-size:15px;" class="total" clear="clear"></span>
								</td>
							</tr>
						</tbody>
					</table>
					
				</div>
				<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
					<a class="easyui-linkbutton recoveryRenterCheckOut"
						style="margin:0 5px;" onclick="gotoStep('exchangeHouses', 7);">上一步</a>
					<a class="easyui-linkbutton renterCheckoutPrint"
						style="margin:0 5px;" onclick="doPrint()">打印出账申请单</a> <a
						class="easyui-linkbutton renterCheckoutFinancial"
						style="margin:0 5px;" id="renterCheckoutFinancial"
						onclick="validateStep3('exchangeHouses', 9);">确定换房</a><!-- showFinancial(0) -->
				</div>
			</div>
		</div>
	</div>
	<!-- 生成新签租客收支-填写金额明细对话框 -->
	<div id="setNewFinancialMoneyDlg" style="padding:6px"
		class="easyui-dialog" data-options="closed:true">
		<input id="setNewFinancialMoneyBegin" style="display:none"> <input
			id="setNewFinancialMoneyEnd" style="display:none">
		<div id="writeSetNewFinancialMoney">
			<fieldset class="setNewFinancialMoneeyDiv">
				<legend>
					金额明细
				</legend>
				<div style='margin:5px 0 10px 24px;float: left;'>
					租金：<input style="width:80px" id="setNewFinancialMoneyRent"
						type="number" data-type="money" mType="租金"
						mNote="新签租客-租金：" bigType="主营类">
				</div>
				<div style='margin:5px 0 10px 36px;float: left;'>
					管理费：<input style="width:80px" id="setNewFinancialMoneyManage"
							   type="number" data-type="money" mType="物业管理费"
							   mNote="新签租客-物业管理费：" bigType="能源类">
				</div>
				<div style='margin:5px 0 10px 12px;float: left;'>
					租赁服务费：<input style="width:80px"
								 id="setNewFinancialMoneyManageServer"
								 type="number" data-type="money" mType="租赁管理服务费"
								 mNote="新签租客-租赁管理服务费：" bigType="主营类">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 10px 12px;float: left;'>
					网络费：<input style="width:80px" id="setNewFinancialMoneyNet"
							   type="number" data-type="money" mType="网络费"
							   mNote="新签租客-网络费：" bigType="能源类">
				</div>
				<div style='margin:5px 0 10px 36px;float: left;'>
					电视费：<input style="width:80px" id="setNewFinancialMoneyTv"
							   type="number" data-type="money" mType="电视"
							   mNote="新签租客-电视费：" bigType="能源类">
				</div>
				<div style='margin:5px 0 10px 36px;float: left;'>
					其它费：<input style="width:80px"
							   id="setNewFinancialMoneyOtherpay"
							   type="number" data-type="money" mType="其它费"
							   mNote="新签租客-其它费：" bigType="主营类">
				</div>
				<div style="clear:both"></div>

				<div style='margin:5px 0 10px 0;float: left;'>
					房屋押金：<input style="width:80px" id="setNewFinancialMoneyRoom"
						type="number" data-type="money" mType="房屋押金"
						mNote="新签租客-房屋押金：" bigType="押金类">
				</div>
				<div style='margin:5px 0 10px 24px;float: left;'>
					水电押金：<input style="width:80px" id="setNewFinancialMoneyPower"
						type="number" data-type="money" mType="水电押金"
						mNote="新签租客-水电押金：" bigType="押金类">
				</div>
				<div style='margin:5px 0 10px 24px;float: left;'>
					门卡押金：<input style="width:80px" id="setNewFinancialMoneyDoor"
						type="number" data-type="money" mType="门卡押金"
						mNote="新签租客-门卡押金：" bigType="押金类">
				</div>
				<div style="clear:both"></div>

				<div style='margin:5px 0 10px 0;float: left;'>
					其他押金：<input style="width:80px" id="setNewFinancialMoneyOther"
						type="number" data-type="money" mType="其他押金"
						mNote="新签租客-其他押金：" bigType="押金类">
				</div>
				<div style='margin:5px 0 10px 12px;float: left;'>
					门卡工本费：<input style="width:80px" id="setNewFinancialMoneyDoorPrice"
						type="number" data-type="money" mType="门卡工本费"
						mNote="新签租客-门卡工本费：" bigType="主营类">
				</div>
				<div style='margin:5px 0 10px 48px;float: left;'>
					佣金：<input style="width:80px" id="setNewFinancialMoneyServer"
							  type="number" data-type="money" mType="佣金服务费"
							  mNote="新签租客-佣金服务费：" bigType="主营类">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 10px 0px;float: left;'>
					换锁费用：<input style="width:80px" id="setNewFinancialChange"
						type="number" data-type="money" mType="换锁费"
						mNote="新签租客-换锁费：" bigType="维修类">
				</div>
				<div style='margin:5px 0 10px 24px;float: left;'>
					其它费用：<input style="width:80px"
								id="setNewFinancialMoneyOtherFee"
								type="number" data-type="money" mType="其它费用"
								mNote="新签租客-其它费用：" bigType="主营类">
				</div>
			</fieldset>
		</div>
		<div style="clear:both"></div>
		<center>
			<div id="setNewFinancialMoneyTips" style="height:20px;color:red;"></div>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="addSetRenterNewFinancial()">保存</a> 
			<a class="easyui-linkbutton" onclick="$('#setNewFinancialMoneyDlg').dialog('close')" iconcls="icon-cancel" onclick="">关闭</a>
		</center>
	</div>
	<!-- 添加维保对话框 -->
	<div id="addRepairDlg" style="padding:6px" class="easyui-dialog"
		data-options="closed:true">
		<div style="margin:5px 0 0 0px;">
			负责人：<input id="doRepairShowUserInfo" class="choose_user_button"
				doFlag="doRepair" doFun="" style="width:150px;cursor: pointer;"
				type="text" readonly="readonly" clear="clear" require="require">
			<input id="doRepairGetUserStoreId" type="hidden"> <input
				id="doRepairGetUserDetId" type="hidden"> <input
				id="doRepairGetUserId" type="hidden">
			<div id="doRepairShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style='margin:5px 0 0 12px;'>
			费用：<input id="repTollRp" type="number" data-type="money"
				style="width:150px" clear="clear" require="require">
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>描述：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea id="repEventRp" style="width:280px;height:70px"
				clear="clear" require="require"></textarea>
		</div>
		<div style="clear:both"></div>
		<div id="addRepairSave" style="margin:10px 0 0 0;text-align:center;">
			<a class="easyui-linkbutton" iconcls="icon-save"
				onclick="addToDataGrid1()">保存</a> <a class="easyui-linkbutton"
				iconcls="icon-cancel" onclick="$('#addRepairDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 选择房屋对话框 -->
	<div id="choseHouse" style="padding:6px;" class="easyui-dialog" data-options="closed:true"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div id="search4Store" style="margin:0 0 0 5px">
			<div
				style="margin:5px 0 5px 0;color:black;font-size:13px;float:left;display:none">
				城市：<select id="choseCity" onchange="choseHouseCity()"
					style="width:80px">
				</select>
			</div>
			<div
				style="margin:5px 0 5px 0;color:black;font-size:13px;float:left;">
				城区：<select id="choseDistrict" onchange="query4StoreInfo(1,0)"
					style="width:100px">
					<option></option>
				</select>
			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
				片区：<select id="choseZone" onchange="query4StoreInfo(1,0)"
					style="width:100px">
					<option></option>
				</select>
			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼盘/小区：<input id="choseCommunity" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')"
					style="width:80px">
			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼栋：<input id="choseBuilding" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')"
					style="width:80px">
			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				门牌号：<input id="choseDoorplateno" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')"
					style="width:80px">
			</div>
		</div>
		<!-- 选择房屋列表 -->
		<table id="choseHouseTable"></table>
		<div id="choseHousePageDiv" style="width:99%"></div>
	</div>
	<!-- 迁入资产对话框 -->
	<div id="moveInAssetsDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div class="clearfix">
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				楼盘名称：<input id="searchCommunity_asset" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryAssetsList(1,0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;&emsp;楼栋：<input id="searchBuilding_asset" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryAssetsList(1,0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;门牌号：<input id="searchDoorplateno_asset" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryAssetsList(1,0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				项目分类：<select id="searchVirtualType_asset" onchange="queryAssetsList(1, 0)" style="width:100px;">
					<option value="0"></option>
					<option value="1">内部项目</option>
					<option value="2">外部项目</option>
					<option value="3">非成本项目</option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				项目名称：<input id="searchVirtualName_asset" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryAssetsList(1,0)')" style="width:100px;" >
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				资产所属：<select id="searchSaType" onchange="queryAssetsList(1, 0)" style="width:100px">
					<option></option>
				</select>
			</div>
			<!-- <div style="margin:0 0 5px 5px;color:black;float:left;">
				使用情况：<select id="searchSaUse" onchange="queryAssetsList(1, 0)" style="width:100px">
					<option></option>
				</select>
			</div> -->
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				资产编号：<input id="searchSaNumber" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryAssetsList(1,0)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				资产名称：<input id="searchSaName" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryAssetsList(1,0)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;&emsp;品牌：<input id="searchSaBrand" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryAssetsList(1,0)')" style="width:100px"></input>
			</div>
			<div style="margin:0 0 5px 5px;color:black;float:left;">
				&emsp;&emsp;型号：<input id="searchSaModel" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryAssetsList(1,0)')" style="width:100px"></input>
			</div>
		</div>
		<fieldset>
			<legend>家私电器</legend>
			<div style="width:99%;height:38%">
				<table id="assetsListTable"></table>
				<div id="assetsListTablePageDiv" style="width:100%;text-align:center;"></div>
			</div>
		</fieldset>
		<fieldset>
			<legend>待迁入的资产</legend>
			<div style="width:99%;height:35%">
				<table id="assetsMoveInTable"></table>
			</div>
		</fieldset>
		<fieldset>
			<legend>迁移相关</legend>
			<div style="margin:10px 0 5px 5px;">
				&emsp;经手人：<input id="pickHtManagerinShowUserInfo" style="width:200px;cursor: pointer;" must="must"
					readonly="readonly" class="choose_user_button" doFlag="pickHtManagerin" doFun="" value="">
				<input id="pickHtManagerinGetUserStoreId" type="hidden">
				<input id="pickHtManagerinGetUserDetId" type="hidden">
				<input id="pickHtManagerinGetUserId" type="hidden">
				<div id="pickHtManagerinShowUserInfoDiv" style="display:none;"></div>
			</div>
	           <div class="clearfix">
	               <div style="margin:5px 0 5px 5px;float:left;">迁移原因：</div>
	               <div style="margin:5px 0 5px 0;float:left;">
	                   <textarea id="move_in_asset_reason" style="width:400px;height:50px;" 
	                       clear="clear" placeholder="可选"></textarea>
	               </div>
	           </div>
		</fieldset>
		<center style="margin:20px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveInAssets(1)" id="doMoveInAssetsButton1">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveInAssets(2)" id="doMoveInAssetsButton2">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moveInAssetsDlg').dialog('close')">取消</a>
		</center>
	</div>
	<div id="detailAssetsInfo" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div class="clearfix" style="margin:5px 0 5px 10px;">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-qianru" onclick="moveInAssets(1)">迁入资产</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-qianchu" onclick="moveOutAssets(1)">迁出资产</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-peizhi" onclick="addAsset()">添加资产</a>
		</div>
		<div style="padding:0 0 5px 10px;width:98%; height:80%">
			<table class="easyui-datagrid" id="assetsInfoTable" style="width:995px;height:327px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th width="10" align="center" field="saNumber">资产编号</th>
						<th width="10" align="center" field="saType">归属</th>
						<th width="10" align="center" field="saName">名称</th>
						<th width="10" align="center" field="saBrand">品牌</th>
						<th width="10" align="center" field="saModel">型号</th>
						<th width="10" align="center" field="saStatus">状态</th>
						<th width="10" align="center" field="saUse">使用情况</th>
						<th width="10" align="center" field="saGmtModified">更新时间</th>
					</tr>
				</thead>
			</table>
			<div id="assetsPageDiv" style="width:100%;height:30px;text-align:center;"></div>
		</div>
	</div>
	<!-- 迁出资产 -->
	<div id="moveOutAssetsDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style="margin:5px 0 5px 5px;">
			迁出地址/项目：<input id="move_from_assets_choseHouse" disabled="disabled"
				style="width:400px" clear="clear"> 
		</div>
		<div style="margin:10px 0 5px 5px;">
			迁入地址/项目：<input id="move_to_assets_choseHouse" readonly="readonly" onclick="choseHouseAsset()" 
				style="width:400px" placeholder="单击选择房屋或项目，必选" clear="clear" must="must">
			<input type="hidden" id="move_to_assets_houseStoreCoding" clear="clear">
			<input type="hidden" id="move_to_assets_houseCoding" clear="clear">
		</div>
		<div style="margin:10px 0 5px 46px;">
			经手人：<input id="pickHtManagertShowUserInfo" style="width:200px;cursor: pointer;" must="must"
			 readonly="readonly" class="choose_user_button" doFlag="pickHtManagert" doFun="" value="">
				<input id="pickHtManagertGetUserStoreId" type="hidden">
				<input id="pickHtManagertGetUserDetId" type="hidden">
				<input id="pickHtManagertGetUserId" type="hidden">
				<div id="pickHtManagertShowUserInfoDiv" style="display:none;"></div>
		</div>
        <div class="clearfix">
            <div style="margin:5px 0 5px 34px;float:left;">迁移原因：</div>
            <div style="margin:5px 0 5px 0;float:left;">
                <textarea id="move_to_asset_reason" style="width:400px;height:50px;" 
                    clear="clear" placeholder="可选"></textarea>
            </div>
        </div>
		<center style="margin:15px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveOutAssets(1)" id="doMoveOutAssetsButton">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveOutAssets(2)" id="doMoveOutAssetsButton2">保存</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moveOutAssetsDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 归属关联列表显示  -->
	<div id="choseHouseAssetDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true"><!--  class="easyui-dialog" data-options="closed:true" -->
		<input type="hidden" id="choseHouseType">
		<div style="margin:5px 0 0 5px;color:black;font-size:13px;float:left;">
			选择列表：<select id="searchBelongTypeAsset" onchange="relationDataGridAsset()" style="width:100px">
				<option value="1">房源列表</option>
				<option value="2">项目列表</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="choseHouseSelectAsset">
			<div style="margin:0 0 10px 0;">
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					&emsp;&emsp;城区：<select id="searchAddDistrictAsset" onchange="choseHouseDataAsset(1)" style="width:100px;">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="searchAddCommunityAsset" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuildingAsset" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplatenoAsset" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:100px;">
				</div>
			</div>
		</div>
		<div id="virtualRelationSelectAsset" style="display:none;">
			<div style="margin:0 0 10px 0;">
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目分类：<select id="searchVirtualType2" onchange="choseHouseDataAsset(1)" style="width:100px;">
						<option value="0"></option>
						<option value="1">内部项目</option>
						<option value="2">外部项目</option>
						<option value="3">非成本项目</option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目名称：<input id="searchVirtualName2" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目联系人：<input id="searchVirtualContact2" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:100px;">
				</div>
			</div>
		</div>
		<div style="width:100%;height:89%">
			<!-- 选择未租列表 -->
			<div id="choseTrusteeshipAsset" style="width:100%;height:100%;display:none;">
				<table id="choseTrusteeshipAssetTable"></table>
				<div id="choseTrusteeshipAssetPageDiv" style="width:99%;text-align:center;"></div>
			</div>
			<!-- 选择项目列表 -->
			<div id="choseVirtualHouseAsset" style="width:100%;height:100%;display:none;">
				<table id="choseVirtualHouseAssetTable"></table>
				<div id="choseVirtualHouseAssetPageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
	<!-- 需要的参数 -->
	<input id="hrId" type="hidden" value="${param.hrId}">
	<input id="hsId" type="hidden" value="${param.hsId}">
	<input id="houseId" type="hidden" value="${param.houseId}">
	<input id="renterId" type="hidden" value="${param.renterId}">
	<input id="landlordId" type="hidden" value="${param.landlordId}">
	<input id="loginCompanyRentDistrict" type="hidden" value='<%=session.getAttribute("companyRentDistrict")%>'>
	<input id="loginDepartment" type="hidden" value='<%=user.getSuDepartmentId()%>'>
	<input id="loginStore" type="hidden" value='<%=user.getSuStoreId()%>'>
	<input id="loginUserId" type="hidden" value='<%=user.getUserId()%>'>

	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<!-- public.js要在exchangHouses.js前加载 ,否则在该页面无法重新进行600秒倒计时重置-->
	<script src="js/fg.public.js"></script>
	<script src="js/upload.js"></script>
	<script src="js/exchangHouses.js"></script>
	<script src="js/exchangHousesAddHr.js"></script>
	<!-- <script src="js/fg.source.infoDb.js"></script> -->
</body>
</html>
