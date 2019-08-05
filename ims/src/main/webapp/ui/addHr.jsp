<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!-- 添加出租房 -->
<!DOCTYPE html>	
<html lang="zh-cmn-Hans">
	<head>
		<meta charset="utf-8">
		<title>添加出租房</title>
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
		<script src="js/baseISSObject.js"></script>
		<script src="js/baseISSOnline.js"></script>
		<script src="js/common.js"></script>
	</head>
<body>
<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<input type="hidden" id="homeState" clear="clear" value="${param.homeState}"><!-- 未租状态 -->
<div id="addHrDlg">
	<div class="process-bar" style="padding:0 10px">
		<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.选房选客</span>
		<span class="process arrow-in arrow-out step2" data-step="2"><span class="process-require">*</span>2.合同信息</span>
		<span class="process arrow-in arrow-out step3" data-step="3"><span class="process-require">*</span>3.账单信息</span>
		<span class="process arrow-in arrow-out step4" data-step="4">4.资产信息</span>
		<span class="process arrow-in arrow-out step5" data-step="5">5.其他信息</span>
	</div>
	<hr color=#95b8e7 size=1 style="margin:3px">
	<div class="addHrSteps">
		<div class="step addHrStep1">
			<div style="min-height:390px;padding:5px 0 0 0;">
				<fieldset>
					<legend>房源</legend>
					<div style="margin:5px 0 0 0;">
						<a id="choseHome1" class="easyui-linkbutton" style="margin:0 5px;" onclick="chooseHouseForStore();">选择房源</a>
						<input type="hidden" id="addHrHsId" clear="clear" require="require"><!-- 未租id -->
						<input type="hidden" id="addHrHouseId" clear="clear"> <!-- 盘源id -->
						<input type="hidden" id="addHrHouseDictId" clear="clear"> <!-- 字典id -->
						<input type="hidden" id="addHrLandlordId" clear="clear"><!-- 房东id -->
						<input type="hidden" id="addHrLandlordCheckEnd" clear="clear"><!-- 托管到期时间 -->
						<input type="hidden" id="addHrGuidePrice" clear="clear" value="${param.hsGuidePrice}"><!-- 房间指导价格 -->
						<input type="hidden" id="addHrIdentifier" clear="clear"><!-- 合租房门牌号前缀 -->
						<input type="hidden" id="addHrFlatShareLogo" clear="clear"><!-- 拆分标识0,1 -->
						<input type="hidden" id="addHrManagerUserId" clear="clear"><!-- 房管员id -->
						<input type="hidden" id="addHrManagerUserDept" clear="clear"><!-- 房管员部门 -->
						<input type="hidden" id="addHrManagerUserStore" clear="clear"><!-- 房管员门店 -->
						<input type="hidden" id="contractRiskControl" clear="clear"><!-- 合同风控开关 -->
						<input type="hidden" id="hsDownDeposit" clear="clear"><!-- 下定转状态 -->
					</div>
					<table class="maintable hsInfo" style="margin-top:5px; width:400px">
						<center>
							<tbody>
								<tr>
									<td>地址：</td>
									<td colspan="3">
										<span class="hsAddCommunity" clear="clear"></span>
										<span class="hsAddBuilding" clear="clear"></span> 
										<span class="hsAddDoorplateno" clear="clear"></span> 
									</td>
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
									<td><span class="popName" clear="clear"></span></td>
									<td>电话：</td>
									<td><span class="popTelephone" clear="clear"></span></td>
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
				<fieldset>
					<legend>租客</legend>
					<div style="margin:5px 0 0 0;">
						<a class="easyui-linkbutton" style="margin:0 5px;" onclick="chooseRenter()">选择租客</a>
						<a id="addTenantID" class="easyui-linkbutton" style="margin:0 5px;" onclick="new Device().startFun(this.id)">读取身份证</a>
						<!-- 意向人id -->
						<input id="addHrIntendedRenterId" type="hidden" clear="clear">
						<input id="addHrDepositPopId" type="hidden" clear="clear">
					</div>
					<div style="margin:5px 0 0 0;">
						<input id="identityInformation" type="hidden" clear="clear"/>
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>姓名：</lable>
						<input id="addHrRenterName" style="width:100px;" clear="clear" require="require">
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>备注：</lable>
						<input id="addHrRenterNameRemark" style="width:180px;" clear="clear" onKeyUp="chineseNumerals(this.id);" >
						<div id="addHrBenZhu" style="width: 50%;float: right;"></div>
					</div>
					<div style="margin:5px 0 0 0;">
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>电话：</lable>
						<input id="addHrRenterPhone" style="width:100px;" clear="clear" require="require">
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>身份证：</lable>
						<input id="addHrRenterIDCard" style="width:180px;" clear="clear" require="require">
						<input id="addHrRenterBirth" style="display: none;">
						<input id="addHrRenterSex" style="display: none;">
						<input id="addHrRenterNation" style="display: none;">
						<input id="addHrRenterIdcardAddress" style="display: none;">
					</div>
					
					<div id="addHrDepositInfoDiv" style="display:none">
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
					</div>
				</fieldset>
			</div>
			<div class="btn-bar" style="margin:10px 10px 0 10px;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="nestStep2()">下一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addRentDlg').dialog('close');">取消</a>
			</div>
		</div>
		<div class="step addHrStep2">
			<div style="min-height:390px;padding:5px 0 0 0;">
				<div>
					<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">上传合同附件</a>
					<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
				</div>
				<fieldset>
					<legend>期限</legend>
					<div style="margin:0px 0 0 0;">
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>合同期限：</lable>
						<input class="Wdate" id="addHrBegin" style="width:80px" clear="clear" require="require"
							onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'addHrEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeAddHrContDate()});acquisitionOfRentDay(1);">
						-
						<input class="Wdate" id="addHrEnd" style="width:80px" clear="clear" require="require" onchange="wdateEnd();"
							onfocus="WdatePicker({minDate:'#F{$dp.$D(\'addHrBegin\',{d:1});}',dateFmt:'yyyy-MM-dd'});">
						<button class="easyui-linkbutton" onclick="javacript:threeMonth();changeAddHrContDate();acquisitionOfRentDay(1);">3个月</button>&emsp;
						<button class="easyui-linkbutton" onclick="javacript:halfYear();changeAddHrContDate();acquisitionOfRentDay(1);" style="margin-left: -12px">半年</button>
						<button class="easyui-linkbutton" onclick="javacript:oneYear();changeAddHrContDate();acquisitionOfRentDay(1);">一年</button>
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
						<span>
							发送电子合同 <input type="checkbox" id="shorContractMessage2" ><%--显示是否勾选电子合同
						</span>--%>
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
						&nbsp;固定每月的 <input id="addHrInAdvancePay" type="number" style="width:25px" clear="clear" require="require" onBlur="timescope(this)"> 号收
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
						<input type="number" style="width:80px;" id="addHrRentPrice" class="payment" clear="clear" require="require" onblur="numberRisk()" mType="租金" bigType="主营类"  onchange="countTotalFee()">元/月
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>物管费：</lable>
						<select class="add_payment_type" id="addHrManagePayment" style="width:80px;" choose="choose" require="require" tabindex="1"  >
							<option></option>
						</select>
						<input type="number" style="width:80px;" id="addHrManageCost" class="payment" clear="clear" require="require" mType="物管费" bigType="能源类" onchange="countTotalFee()">元/月
					</div>
					<div style="margin:5px 0 0 0;">
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>服务费：</lable>
						<select class="add_payment_type" id="addHrServerPayment" style="width:80px;" choose="choose" require="require" tabindex="1">
							<option></option>
						</select>
						<input type="number" style="width:80px;" id="addHrServerCost" class="payment" clear="clear" require="require" mType="服务费" bigType="主营类" onchange="countTotalFee()">元/月
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>网络费：</lable>
						<select class="add_payment_type" id="addHrWifiChargePayment" style="width:80px;" choose="choose" require="require" tabindex="1">
							<option></option>
						</select>
						<input type="number" style="width:80px;" id="addHrWifiCharge" class="payment" clear="clear" mType="网络费"  bigType="能源类" onchange="countTotalFee()">元/月
					</div>
					<div style="margin:5px 0 0 0;">
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>电视费：</lable>
						<select class="add_payment_type" id="addHrTvChargePayment" style="width:80px;" choose="choose" require="require" tabindex="1">
							<option></option>
						</select>
						<input type="number" style="width:80px;" id="addHrTvCharge" class="payment" clear="clear" mType="电视费" bigType="能源类" onchange="countTotalFee()">元/月
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>其他费：</lable>
						<select class="add_payment_type" id="addHrOtherPayment" style="width:80px;" choose="choose" require="require" tabindex="1">
							<option></option>
						</select>
						<input type="number" style="width:80px;" id="addHrOtherPay" class="payment" clear="clear" mType="其他费" bigType="主营类" onchange="countTotalFee()">元/月
					</div>
				</fieldset>
				<fieldset class="setRenterNewFinancialDiv">
					<legend>收款信息</legend>
					<div style="margin:0px 0 0 0;">
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>房屋押金：</lable>
						<input id="addHrHouseDeposit" type="number" style="width:80px;" clear="clear" require="require" mType="房屋押金" bigType="押金类" onchange="countTotalFee()">元
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>门卡押金：</lable>
						<input id="addHrDoorDeposit" type="number" style="width:80px;" clear="clear" require="require" mType="门卡押金" bigType="押金类" onchange="countTotalFee()">元
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>水电押金：</lable>
						<input id="addHrPowerDeposit" type="number" style="width:80px;" clear="clear" require="require" mType="水电押金" bigType="押金类" onchange="countTotalFee()">元
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>其他押金：</lable>
						<input id="addHrOtherDeposit" type="number" style="width:80px;" clear="clear" require="require" mType="其他押金" bigType="押金类" onchange="countTotalFee()">元
					</div>
					<div style="margin:5px 0 0 0;" >
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>门卡工本：</lable>
						<input id="addHrDoorTrendFee" type="number" style="width:80px;" clear="clear" require="require" mType="门卡工本" bigType="主营类" onchange="countTotalFee()">元
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>佣金服务：</lable>
						<input id="addHrComServiceFee" type="number" style="width:80px;" clear="clear" require="require" mType="佣金服务" bigType="主营类" onchange="countTotalFee()">元
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>换锁费用：</lable>
						<input id="addHrLockFee" type="number" style="width:80px;" clear="clear" require="require" mType="换锁费用" bigType="维修类" onchange="countTotalFee()">元
						<lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>其他费用：</lable>
						<input id="addHrOtherFee" type="number" style="width:80px;" clear="clear" require="require" mType="其他费用" bigType="主营类" onchange="countTotalFee()">元
					</div>
					<div id="addFee" style="margin:5px 0 0 0;" >
                        <div class="refundDeposit" style="float: left">
                            <lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>退还定金：</lable>
							<input id="refundDeposit" value="0" type="number" style="width:80px;" clear="clear" mType="退还定金" bigType="押金类" onchange="countTotalFee()" disabled><span style="margin-right:3px">元</span>
                        </div>
                        <div id="totalFeeDiv" style="float: left" >
						    <lable style="display:inline-block;width:80px;"><span class="require v-hide">*</span>费用总额：</lable>
						    <input id="totalFee"  type="number" style="width:80px;" clear="clear" require="require" disabled>元
                        </div>
						<%--<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="financilSearchButton" style="margin-left: 10px" onclick="">添加费用项</a>--%>

					</div>
				</fieldset>
				<fieldset>
					<legend>抄表</legend>
					<div style="margin:0px 0 0 0; " class="water">
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
						<select id="addhrHotwaterPlan" style="width:150px" choose="choose">
							<option></option>
						</select>
					</div>
					<div style="margin:5px 0 0 0;" class="hotair">
						<lable style="display:inline-block;width:80px;"><span class="require">*</span>暖气底数：</lable>
						<input id="addHrHotAir" type="number" style="width:80px" clear="clear" require="require" class="inputHide">
						<select id="addhrHotairPlan" style="width:150px" choose="choose">
							<option></option>
						</select>
					</div>
					<a class="easyui-linkbutton" iconCls="icon-edit" onclick="readingsModification();" style="margin:-6px 0 0 0;float:right;" id="aShowHide">修改读数</a>
				</fieldset>
			</div>
			<div class="btn-bar" style="margin:10px 10px 0 10px;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addHr', 1);">上一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="nextStep();">下一步</a>
				<!-- <a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddHr();">保存</a> -->
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addRentDlg').dialog('close');">取消</a>
			</div>
		</div>
		
		<div class="step addHrStep3">
			<div style="padding:10px 0 0 5px;width:98%;">
				<table id="preGeneratingBillTable" class="easyui-datagrid" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,onClickCell:onClickCell,">
					<thead>
						<tr>
							<th width="10" align="center" field="jciPeriods">期数</th>
							<th width="10" align="center" field="jciBeginPeriods">开始周期</th>
							<th width="10" align="center" field="jciEndPeriods">结束周期</th>
							<th width="10" align="center" field="jciNature">收支性质</th>
							<th width="10" align="center" field="jciType">账单类型</th>
							<th width="10" align="center" field="jciMoney" editor="{type:'numberbox',options:{precision:2}}">金额</th>
							<th width="10" align="center" field="jciState">状态</th>
							<th width="10" align="center" field="jciFukuanri">收款日</th>
						</tr>
					</thead>
				</table>
			</div>
			
			<div class="btn-bar" style="margin:10px 10px 0 10px;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addHr', 2);">上一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="validateStep('addHr', 4);queryAsset2(1,0);">下一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddHr1();">保存</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addRentDlg').dialog('close');">取消</a>
			</div>
		</div>
		
		<div class="step addHrStep4">
			<div style="min-height:390px;padding:5px 0 0 0;">
				<div class="clearfix" style="margin:0 0 5px 10px;">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-qianru" onclick="moveInAssets(2)">迁入资产</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-qianchu" onclick="moveOutAssets(2)">迁出资产</a>
				</div>
				<div style="padding:0 5px 0 5px;width:98%;">
					<table id="assetsInfoTable2" class="easyui-datagrid" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
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
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addHr', 3);">上一步</a> 
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="validateStep('addHr', 5);">下一步</a> 
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddHr1();">保存</a> 
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addRentDlg').dialog('close');">取消</a>
			</div>
		</div>
		<div class="step addHrStep5">
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
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addHr', 4);">上一步</a> 
				<!-- <a class="easyui-linkbutton" style="margin:0 5px;visibility:hidden">下一步</a>  -->
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddHr1();">保存</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addRentDlg').dialog('close');">取消</a>
			</div>
		</div>
	</div>
</div>

<!-- 迁入资产对话框 -->
	<div id="moveInAssetsDlg" style="padding:6px;"class="easyui-dialog" data-options="closed:true"><!--  class="easyui-dialog" data-options="closed:true" -->
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
	<!-- 迁出资产 -->
	<div id="moveOutAssetsDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
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
	<div id="choseHouseAssetDlg" style="padding:6px;"class="easyui-dialog" data-options="closed:true"><!--  class="easyui-dialog" data-options="closed:true" -->
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
	
	
		<!-- 资产详情 -->
	<div id="assetInfoDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div id="assetInfoTabs" class="easyui-tabs">
			<div title="详细信息" tabindex="0" style="padding:6px;">
				<input type="hidden" id='assetInfo_index'>
				<fieldset>
					<legend>资产归属</legend>
					<div style="margin:0 0 5px 5px;">
						资产归属：<input id="query_asset_choseHouse" readonly="readonly" style="width:520px" clear="clear"> 
					</div>
				</fieldset>
				<fieldset>
					<legend>资产信息</legend>
					<div style="margin:0 0 5px 5px;float:left;">
						资产所属：<input id="query_asset_type" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						使用情况：<input id="query_asset_use" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						资产状态：<input id="query_asset_status" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;价格：<input id="query_asset_price" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						资产类型：<input id="query_asset_classify" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;名称：<input id="query_asset_name" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;品牌：<input id="query_asset_brand" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;型号：<input id="query_asset_model" readonly="readonly" style="width:130px;" clear="clear">
					</div>
					<div style="clear:both;"></div>
					<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
					<div style="margin:0 0 5px 0;float:left;">
						<textarea id="query_asset_remark" readonly="readonly" style="width:325px;height:50px;" clear="clear"></textarea>
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;供应商：<input id="query_asset_changeSupplier" readonly="readonly" style="width:325px" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						资产编号：<input id="query_asset_number" readonly="readonly" style="width:130px;" clear="clear">
					</div>
                    <div style="margin:0 0 5px 5px;float:left;">
						折旧价格：<input id="query_asset_depreciation_price" readonly="readonly" style="width:130px;" clear="clear">
                    </div>
				</fieldset>
				<div style="padding:10px 0 0 0;">
					<table id="assetFollowTable"></table>
				</div>
			</div>
			<div title="图片信息" tabindex="1">		
				<div style="padding:5px 0 0 10px;">
					<a class="easyui-linkbutton" iconCls="icon-diannao" 	  plain="true" onclick="upload_asset_img()">上传</a>
					<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="remove_asset_img()">选择删除</a>
					<a class="easyui-linkbutton" iconCls="icon-shuaxin" 		  plain="true" onclick="refresh_asset_img()">刷新</a>
					<span id="_asset_imgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
				</div>
				<div id="_asset_title" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
				<div style="clear:both"></div>
				<left>
					<div id="_asset_btn" style="margin:10px 0 0 10px;display:none;">
						<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemove_asset_img()">删除</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel_asset_img()">取消</a>
					</div>
				</left>
				<div id="_asset_imgWrapper" style="margin:10px 0 0 10px;"></div>
				
			</div>
		</div>
	</div>

<!-- 选择房屋对话框 -->
<div id="choseHouse" style="padding:6px;"class="easyui-dialog" data-options="closed:true">
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
	<div id="choseHouseTable" ></div>
	<div id="choseHousePageDiv" style="width:99%"></div>
</div>
<!-- 选择租客对话框 -->
<div id="choseRenter" style="padding:6px;"class="easyui-dialog" data-options="closed:true">
	<div style='margin:0 0 10px 10px;'>
		<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			租客类型：<select id="searchRenterType" onchange="queryRenter(1,0)" style="width:80px">
				<option values="意向人">意向人</option>
				<option values="已有租客">已有租客</option>
			</select>
		</div>
		<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			租客姓名：<input id="searchRenterName"
				onkeyup="searchOnkeyup(this.id, 'queryRenter(1, 0)')" style="width:80px">
		</div>
		<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			租客电话：<input id="searchRenterPhone"
				onkeyup="searchOnkeyup(this.id, 'queryRenter(1, 0)')" style="width:100px">
		</div>
		<div style="margin:2px 0 0 5px;color:black;font-size:13px;float:left;">
			<a class="easyui-linkbutton" onclick="addIntended()"
				iconCls="icon-yixiangren" plain="true" id="addIntendedButton">添加租客意向人</a>
		</div>
	</div>
	<!-- 选择租客列表 -->
	<table id="choseRenterTable"></table>
	<div id="choseRenterPageDiv" style="width:99%"></div>
</div>

	<div id="addIntendedDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>人口信息</legend>
			<div style="margin:0 0 0 24px;float:left">
				姓名：<input id="intendedPopName" style="width:100px" require="require">
			</div>
			<div style="margin:0 0 0 34px;float:left">
				电话：<input id="intendedPopPhone" style="width:100px" require="require">
			</div>
		</fieldset>
		</br>
		<center>
			<a id="updateSaveButton" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddIntended()" id="saveAddIntended">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addIntendedDlg').dialog('close')">取消</a>
		</center>
	</div>
	<input id="addHrManageCostHide" type="text" style="display: none">
	<input id="addHrServerCostHide" type="text" style="display: none">

	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/addHr.js"></script>	
	<script src="js/upload.js"></script>
</body>
</html>
