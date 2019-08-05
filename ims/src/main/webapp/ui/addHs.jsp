<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<%
	SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo");
%>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>添加未租</title>
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
	<script src="js/jQuery.Hz2Py-min.js"></script>
	<script src="js/baseISSObject.js"></script>
	<script src="js/baseISSOnline.js"></script>
	<script src="js/common.js"></script>
</head>
<body>
	<div class="bodyLoadingOver"></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<input id="action" type="hidden" value="${param.action}">
	<div id="addHsDlg" style="padding: 6px;">
		<div class="process-bar" style="padding: 0 10px">
			<span class="process arrow-in arrow-out step1" data-step="1" id="gotoNav1"><span class="process-require">*</span>1.房源信息</span>
			<span class="process arrow-in arrow-out step2" data-step="2" id="gotoNav2"><span class="process-require">*</span>2.合同信息</span>
			<span class="process arrow-in arrow-out step3" data-step="3" id="gotoNav3"><span class="process-require">*</span>3.账单信息</span>
			<span class="process arrow-in arrow-out step4" data-step="4" id="gotoNav4">4.家私电器</span>
			<span class="process arrow-in arrow-out step5" data-step="5" id="gotoNav5">5.其他设置</span> 
			<span class="process arrow-in arrow-out step6" data-step="6" id="gotoNav6"><span class="process-require">*</span>4.生成集中房</span> 
			<span class="process arrow-in arrow-out step7" data-step="7" id="gotoNav7"><span class="process-require">*</span>5.预览房间</span>
			<span class="process arrow-in arrow-out step8" data-step="8" id="gotoNav8"><span class="process-require">*</span>2.生成集中房</span>
			<span class="process arrow-in arrow-out step9" data-step="9" id="gotoNav9"><span class="process-require">*</span>3.参数设置</span>
			<span class="process arrow-in arrow-out step10" data-step="10" id="gotoNav10"><span class="process-require">*</span>4.预览房间</span>
		</div>
		<hr color=#95b8e7 size=1 style="margin: 3px">


		<div class="addHsSteps">
			<div class="step addHsStep1" >
				<div style="min-height: 320px; padding: 5px 0 0 0;">
					<fieldset>
						<legend>合约方式</legend>
						<div style="margin: 5px 0 0 10px;float: left">
							<input type="radio" name="contractMode" id="oneOnOne" checked="checked" value="0" onclick="selectContract()"/>
							<label style="font-size: 15px;" for="oneOnOne">一约一房</label>
						</div>
						<div style="margin: 5px 0 0 20px;float: left">
							<input type="radio" name="contractMode" id="oneToMany" value="1" onclick="selectContract()"/>
							<label style="font-size: 15px;" for="oneToMany">一约多房</label>
						</div>
					</fieldset>
					<fieldset id="house">
						<legend>房源</legend>
						<div class="chooseHouseButton">
							<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="chooseHousePaper();">有资料房</a> 
							<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="noHousePaper();">无资料房</a> 
							<input type="hidden" id="addHsHouseType" clear="clear">
							<!-- 录入类型:1.有资料房 2.无资料房 -->
							<input type="hidden" id="addHsHouseId" clear="clear">
							<!-- 盘源id -->
							<input type="hidden" id="addHsHouseDictId" clear="clear">
							<!-- 字典id -->
						</div>
						<div class="hsFieldset">
							<div id="addHsHasPaper" style="display: none">
								<div style="margin: 5px 0 0 0;">
									<lable style="display:inline-block;width:80px;"> <span class="require">*</span>地址：</lable>
									<input id="addHsDetailAddresss" style="width: 338px; cursor: pointer;" onclick="chooseHousePaper();" clear="clear" readonly="readonly"> 
										<input type="hidden" class="addCity" clear="clear"> 
										<input type="hidden" class="addDistrict" clear="clear"> 
										<input type="hidden" class="addZone" clear="clear"> 
										<input type="hidden" class="addStreet" clear="clear"> 
										<input type="hidden" class="addCommunity" clear="clear"> 
										<input type="hidden" class="addBuilding" clear="clear"> 
										<input type="hidden" class="addDoorplateno" clear="clear">
								</div>
							</div>
							<div id="addHsNoPaper" style="display: none">
								<div style='display: none;'>
									<lable style="display:inline-block;width:80px;"> <span class="require">*</span>城市：</lable>
									<select id="addNoTrusteeshipCity" style="width: 100px;" disabled="disabled"></select>
								</div>
								<div style='margin: 5px 0 0 0;'>
									<lable style="display:inline-block;width:80px;">
									 	<span class="require">*</span>城区：
									 </lable>
									<select id="addNoTrusteeshipDistrict" style="width: 100px;"
										onchange="noZoneLink()">
										<option></option>
									</select> 

									<input type="hidden" id="addNoTrusteeshipZone" clear="clear">
									<input type="hidden" id="addNoTrusteeshipStreet" clear="clear">
									<lable style="display:inline-block;width:80px;"> <span
										class="require">*</span>楼盘名称：</lable>
									<input type="text" id="buildingName" style="width: 150px;"
										clear="clear"
										onkeyup='resetOption("buildingName", "addNoTrusteeshipBuildingName" ,"buildingNameDiv")'
										onclick='resetOption("buildingName", "addNoTrusteeshipBuildingName" ,"buildingNameDiv")'
										onfocus='resetOption("buildingName", "addNoTrusteeshipBuildingName" ,"buildingNameDiv")'>
									<div id="buildingNameDiv"
										style="margin-left: 271px; height: 150px; width: 150px; display: none; position: absolute; z-index: -1; background-color: #fff">
										<select id="addNoTrusteeshipBuildingName" multiple="multiple"
											style="height: 150px; width: 150px;" onchange="noStreeLink()">
											<option></option>
										</select>
									</div>
								</div>
								<div style='margin: 5px 0 0 0;'>
									<div id="divSelect">
										<lable style="display:inline-block;width:80px;"> <span
											class="require">*</span>楼栋：</lable>
										<input style="width: 100px" id="inputSelect"
											class="add_saveHouse_addBuilding" clear="clear"> <input
											id="buildingDefinitionyVal" readonly="readonly"
											style="display: none">

										<lable style="display:inline-block;width:80px;"> <span
											class="require">*</span>门牌号：</lable>
										<input class="add_saveHouse_addDoorplateno2"
											style="width: 150px" clear="clear"
											onblur="$(this).val($(this).val().toUpperCase());validateDoorno()">
										<span id="doornoMsg" style="color: red;" clear="clear"></span>
										<input type="hidden" class='hd_doorplateno_relus'>
									</div>
									<!-- 选择楼栋 -->
									<div id="selectBuilding"
										style="border-radius: 10px 10px 10px 10px; margin: 3px 0 0 0; height: 110px; width: 310px; border: 1px solid #A9A9AA; display: none; position: absolute; z-index: -1; background-color: #fff">
										<div
											style="border-radius: 9px 9px 0 0; width: 100%; height: 28px; background-color: #96D2FF;">
											<div style="margin: 3px 0 0 15px; float: left;">
												<span
													style="font-size: 15px; font-family: '微软雅黑'; color: #000;">选择楼栋</span>
											</div>
											<div style="margin: 1px 5px 0 0; float: right;">
												<a class="easyui-linkbutton" plain="true"
													iconcls="icon-cancel"
													onclick="$('#selectBuilding').hide();"></a>
											</div>
											<div style="clear: both;"></div>
										</div>
										<div
											style="width: 100%; height: 80px; font-size: 12px; padding: 5px; color: #000;">
											<div style="margin: 0 0 0 39px; float: left;">
												字母： <select id="buildingLetter" style="width: 70px;">
													<option></option>
												</select>
											</div>
											<div style="margin: 0 0 0 39px; float: left;">
												数字： <select id="buildingNum" style="width: 70px;">
													<option></option>
												</select>
											</div>
											<div style="clear: both"></div>
											<div style="margin: 5px 0 0 6px; float: left;">
												字母+数字： <select id="buildingGroupOne" style="width: 70px;">
													<option></option>
												</select>
											</div>
											<div style="margin: 5px 0 0 2px; float: left;">
												数字+字母 ： <select id="buildingGroupTwo" style="width: 70px;">
													<option></option>
												</select>
											</div>
											<div style="clear: both"></div>
											<div style="margin: 5px 0 0 27px; float: left;">
												自定义： <input id="buildingDefinitiony" style="width: 70px;">
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="details1" style="margin: 5px 0 0 0;">
								<lable style="display:inline-block;width:80px;"> <span
									class="require v-hide">*</span>用途：</lable>
								<select class="houseOwner" style="width: 100px;" choose="choose">
									<option></option>
								</select>
								<lable style="display:inline-block;width:80px;"> <span
									class="require v-hide">*</span>户型：</lable>
								<select class="sectionType" style="width: 150px;"
									choose="choose">
									<option></option>
								</select>
							</div>
							<div id="details2" style="margin: 5px 0 0 0;">
								<lable style="display:inline-block;width:80px;"> <span
									class="require v-hide">*</span>朝向：</lable>
								<select class="houseDirection" style="width: 100px;"
									choose="choose">
									<option></option>
								</select>
								<lable style="display:inline-block;width:80px;"> <span
									class="require v-hide">*</span>面积：</lable>
								<input type="number" class="storeSquare" style="width: 150px;"
									clear="clear">
							</div>
						</div>
					</fieldset>
					<fieldset>
						<legend>业主</legend>
						<div style="margin: 5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>姓名：</lable>
							<input id="addHsLandlordName" style="width: 100px;" clear="clear"
								require="require">
							<lable style="display:inline-block;width:80px;"> <span
								class="require v-hide">*</span>备注：</lable>
							<input id="addHrRenterNameRemark" style="width: 150px;"
								clear="clear" onKeyUp="chineseNumerals(this.id);">
						</div>
						<div style="margin: 5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>电话：</lable>
							<input id="addHsLandlordPhoneNum" style="width: 100px;"
								clear="clear" require="require">
							<!-- <lable style="display:inline-block;width:80px;"><span class="require">*</span>证件类型：</lable>
						<select class="" id="" style="width:100px;" choose="choose" require="require">
							<option></option>
						</select> -->
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>证件号码：</lable>
							<input id="addHsLandlordIdcard" style="width: 150px;"
								clear="clear" require="require">
						</div>
						<div style="margin: 5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require v-hide">*</span>联系人：</lable>
							<input id="addHsContacts" style="width: 100px;" clear="clear">
							<lable style="display:inline-block;width:80px;"> <span
								class="require v-hide">*</span>联系电话：</lable>
							<input id="addHsContactsPhone" style="width: 150px;"
								clear="clear">
						</div>
					</fieldset>
					<fieldset>
						<legend>收款账户</legend>
						<div style="margin: 5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>银行名称：</lable>
							<select class="bankType" id="addHsBankType" style="width: 100px;"
								choose="choose" require="require">
								<option></option>
							</select>
							<!-- <lable style="display:inline-block;width:80px;"><span class="require v-hide"">*</span>支行名称：</lable>
						<input id="addHs" style="width:100px;" clear="clear"> -->
						</div>
						<div style="margin: 5px 0 0 0;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>银行户名：</lable>
							<input id="addHsBankName" style="width: 100px;" clear="clear"
								require="require">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>银行卡号：</lable>
							<input id="addHsBankNum" style="width: 150px;" clear="clear"
								require="require">
						</div>
					</fieldset>
				</div>
				<div class="btn-bar"
					style="margin: 10px 10px 10px 0; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="nextStep(2);">下一步</a>
					<!-- linshi(); -->
					<a class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		
		<div class="addHsSteps">
			<div class="step addHsStep2">
				<div style="min-height: 320px; padding: 5px 0 0 0;">
					<div>
						<a class="easyui-linkbutton" iconCls="icon-chakantupian"
							plain="false" onclick="openAttachment('private')">上传合同附件</a> <span
							class="attachmentNum"
							style="vertical-align: middle; line-height: 26px; color: #444;"></span>
					</div>
					<fieldset>
						<legend>合同</legend>
						<div style="margin: 5px 0 0 0;">
							<lable style="display:inline-block;width:90px;"> <span
								class="require">*</span>合同期限：</lable>
							<input class="Wdate" id="addHsBegin" style="width: 80px"
								clear="clear" require="require"
								onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'addHsEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeAddHsDate()})">
							- <input class="Wdate" id="addHsEnd" style="width: 80px"
								clear="clear" require="require"
								onfocus="WdatePicker({minDate:'#F{$dp.$D(\'addHsBegin\',{d:1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeAddHsDate()})">
							<span id="addHsTerm" clear="clear"></span>
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>签约时间：</lable>
							<input class="Wdate" id="addHsSigned" style="width: 80px"
								clear="clear" require="require"
								onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})">
						</div>
						<div style="margin: 5px 0 0 0;">
							<lable style="display:inline-block;width:90px;"> <span
								class="require">*</span>合同性质：</lable>
							<select class="contractType" id="addHsContractType"
								style="width: 80px;" choose="choose" require="require">
								<option></option>
							</select>
							<lable style="display:inline-block;width:80px;margin:0 0 0 12px;">
							<span class="require">*</span>付租方式：</lable>
							<select class="paymentType" id="addHsPaymentType"
								style="width: 80px;" choose="choose" require="require">
								<option></option>
							</select>
							<lable style="display:inline-block;width:76px;"> <span
								class="require">*</span>提前：</lable>
							<input id="addHsInAdvancePay" type="number" style="width: 80px"
								clear="clear" require="require">天交租
						</div>
						<div style="margin: 5px 0 0 0;">
							<lable style="display:inline-block;width:90px;"> <span
								class="require">*</span>押金：</lable>
							<input id="addHsDeposit" style="width: 80px;" type="number"
								clear="clear" require="require">元
							<lable style="display:inline-block;width:80px;"> <span
								class="require v-hide">*</span>合同编号：</lable>
							<input id="contractNum" style="width: 80px;" clear="clear"
								onkeyup="$(this).val($(this).val().toUpperCase());if(event.keyCode==13){contractNumCheckout(0);}"
								onblur="contractNumCheckout(0)"> <span
								id="contractNumTips" style="height: 20px; color: red;"
								clear="clear"></span> <span
								style="display: inline-block; vertical-align: bottom;"
								id="usedContractNum" clear="clear"></span>
							<lable style="display:inline-block;width:80px;"> <span
									class="require v-hide">*</span>结算方式：</lable>
							<select id="annualMethod" style="width: 80px;" type="number"
								   clear="clear" require="require" onchange="changeAddHsDate()">
								<option selected>自然年度</option>
								<option>合约年度</option>
							</select>
						</div>
						<div style="margin: 5px 0 0 0;">
							<input id="outerFreeDaysBox" type="checkbox" style="margin: -2px 0 0 0;">
							<lable style="display:inline-block;">外置装修/免租期</lable>
							<span id="outerFreeDays">： 
							<input id="addHsFreeDaysDecoration" style="width: 53px;" type="number" clear="clear">天 </span>
						</div>
						<%--<div style='margin:5px 0 0 0;float: left;'>--%>
							<%--<input type="checkbox" id="shorContractMessage" >--%>
						<%--</div>--%>
						<%--<div style='margin:5px 0 0 0;float: left;'>
							<div style='margin:0 0 0 0;float: left;'>发送电子合同</div>
							<div style="clear:both"></div>
						</div>--%>
						<div style="margin: 5px 0 0 0; display: none;">
							<div style='margin: 5px 0 0 0'>
								价格阶梯：<input style="width: 400px;" class="jrlPriceLadder"
									clear="clear">
							</div>
							<div style='margin: 5px 0 0 0'>
								免租期时段：<input style="width: 400px;" class="jrlRentFreeSegment"
									clear="clear">
							</div>
						</div>
					</fieldset>
					<div id="priceLadder">
						<fieldset>
							<legend>合同期内，免租期及阶梯价</legend>
							<div id="priceLadderDiv"></div>
						</fieldset>
					</div>
					<fieldset id="meterReading">
						<legend>抄表</legend>
						<div class="water" style="width: 180px; float: left;margin-top: 10px;">
							<lable style="display:inline-block;width:90px;"><span class="require">*</span>水底数：</lable>
							<input id="addHsWater" type="number" style="width:80px" clear="clear" require="require">
						</div>
						<div class="elect" style="width: 180px; float: left;margin-top: 10px;">
							<lable style="display:inline-block;width:90px;"><span class="require">*</span>电底数：</lable>
							<input id="addHsElect" type="number" style="width:80px" clear="clear" require="require">
						</div>
						<div class="gas" style="width: 180px; float: left; margin-top: 10px;">
							<lable style="display:inline-block;width:90px;"><span class="require">*</span>气底数：</lable>
							<input id="addHsGas" type="number" style="width:80px" clear="clear" require="require">
						</div>
						<div class="hotwater" style="width: 180px; float: left; margin-top: 10px;">
							<lable style="display:inline-block;width:90px;"><span class="require">*</span>热水底数：</lable>
							<input id="addHsHotWater" type="number" style="width:80px" clear="clear" require="require">
						</div>
						<div class="hotair" style="width: 180px; float: left; margin-top: 10px;">
							<lable style="display:inline-block;width:90px;"><span class="require">*</span>暖气底数：</lable>
							<input id="addHsHotAir" type="number" style="width:80px" clear="clear" require="require">
						</div>
					</fieldset>
				</div>
				<div class="btn-bar"
					style="margin: 10px 10px 10px 0; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="gotoStep('addHs', 1);">上一步</a>
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="nextStep(3);">下一步</a>
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
	
	
		<div class="addHsSteps">
			<div class="step addHsStep3">
				<div style="padding:10px 0 0 5px;width:98%;">
					<table id="preGeneratingBillTable" class="easyui-datagrid" style="width:100%;height:327px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,onClickCell:onClickCell,">
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

				<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
                    <%--<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="preGeneratingBill()">首末调换</a>--%>
                    <a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addHs', 2);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="validateStep('addHs', 4);" id="gotoStep4">下一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="nextStep(6)" id="gotoStep6">下一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doAddTrusteeship();" id="saveStep3">保存</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>

		<div class="addHsSteps">
			<div class="step addHsStep4">
				<div style="min-height: 320px; padding: 5px 0 0 0;">
					<!-- <fieldset>
					<legend>资产归属</legend>
					<div style="margin:0 0 5px 5px;">
						资产归属：<input id="assets_choseHouse" readonly="readonly" onclick="choseHouse(0)" 
							style="width:520px" placeholder="单击选择房屋或项目，必选" clear="clear" must="must"> 
						<input type="hidden" id="assets_houseStoreCoding" clear="clear">
						<input type="hidden" id="assets_houseCoding" clear="clear">
					</div>
				</fieldset> -->
					<fieldset>
						<legend>资产信息</legend>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>资产所属：</lable>
							<select id="add_asset_type" style="width: 130px;" choose="choose"
								must="must">
								<option></option>
							</select>
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>使用情况：</lable>
							<select id="add_asset_use" style="width: 130px;" choose="choose"
								must="must">
								<option></option>
							</select>
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>资产状态：</lable>
							<select id="add_asset_status" style="width: 130px;"
								choose="choose" must="must">
								<option></option>
							</select>
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>价格：</lable>
							<input id="add_asset_price" style="width: 130px;" clear="clear"
								must="must" placeholder="必填" type="number" data-type="money">
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>资产类型：</lable>
							<select id="add_asset_classify" style="width: 130px;"
								choose="choose" must="must"
								onchange="changeAssetsType('add_asset_')">
								<option></option>
							</select>
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>名称：</lable>
							<select id="add_asset_name" style="width: 130px;" choose="choose"
								must="must">
								<option></option>
							</select>
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require v-hide">*</span>品牌：</lable>
							<input id="add_asset_brand" style="width: 130px;" clear="clear">
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> <span
								class="require v-hide">*</span>型号：</lable>
							<input id="add_asset_model" style="width: 130px;" clear="clear">
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<lable style="display:inline-block;width:80px;"> 
							<span class="require">*</span>数量：</lable>
							<input id="add_asset_number" style="width: 130px;" clear="clear"
								must="must" placeholder="必填" type="number"
								data-type="number-positive"
								data-fn-keyup="this.value=this.value.replace(/\D/g,'')"
								data-fn-afterpaste="this.value=this.value.replace(/\D/g,'')">
						</div>
						<div style="clear: both;"></div>
						<lable style="display:inline-block;width:80px;margin:0 0 5px 5px;float:left;">
						<span class="require v-hide">*</span>备注：</lable>
						<div style="margin: 0 0 5px 3px; float: left;">
							<textarea id="add_asset_remark"
								style="width: 350px; height: 50px;" clear="clear"></textarea>
						</div>
						<!-- <div style="margin:0 0 5px 5px;float:left;">
						&emsp;供应商：<input id="assets_changeSupplier" readonly="readonly" onclick="choseSupplier(0)" 
							style="width:325px" placeholder="单击选择供应商，可选" clear="clear">
						<input type="hidden" id="assets_supplier_id" clear="clear">
					</div> -->
						
						<div style="margin: 0 0 5px 5px; float: left;">
							<a class="easyui-linkbutton" iconcls="icon-add" onclick="addToDataGrid()">添加</a>
						</div>
						<div style="margin: 0 0 5px 5px; float: left;">
							<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="cleanDataGrid()">清除</a>
						</div>
					</fieldset>
					<!-- 原始 -->
					<div id='addAssetTableDiv' style="margin: 5px 0 5px 0;">
						<table id="addAssetTable" data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						
						</table>
					</div>
				</div>
				<div class="btn-bar"
					style="margin: 10px 10px 0 0; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="gotoStep('addHs', 3);">上一步</a> <a
						class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="validateStep('addHs', 5);">下一步</a> <a
						class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="doAddTrusteeship();">保存</a> <a class="easyui-linkbutton"
						style="margin: 0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="addHsSteps">
			<div class="step addHsStep5">
				<div style="min-height: 320px; padding: 5px 0 0 0;">
					<div id="addHsManageDiv" style='margin: 5px 0 0 0;'>
						<lable style="display:inline-block;width:100px;"> <span
							class="require v-hide">*</span>房管员：</lable>
						<input id="addHsManageShowUserInfo" class="choose_user_button"
							doFlag="addHsManage" doFun=""
							style="width: 150px; cursor: pointer;" type="text"
							readonly="readonly" clear="clear" require="require"> 
						<input id="addHsManageGetUserStoreId" type="hidden" clear="clear">
						<input id="addHsManageGetUserDetId" type="hidden" clear="clear">
						<input id="addHsManageGetUserId" type="hidden" clear="clear">
						<div id="addHsManageShowUserInfoDiv" style="display: none;"></div>
					</div>
					<div id="addHsSalesmanDiv" style='margin: 5px 0 0 0;'>
						<lable style="display:inline-block;width:100px;"> <span
							class="require v-hide">*</span>业务员：</lable>
						<input id="addHsSalesmanShowUserInfo" class="choose_user_button"
							doFlag="addHsSalesman"
							doFun="changeSalesman(\'#addHsSalesmanAllProfit\', \'addProfit\', \'addHsSalesman\')"
							style="width: 150px; cursor: pointer;" type="text"
							readonly="readonly" clear="clear" require="require"> 
						<input id="addHsSalesmanGetUserStoreId" type="hidden" clear="clear">
						<input id="addHsSalesmanGetUserDetId" type="hidden" clear="clear">
						<input id="addHsSalesmanGetUserId" type="hidden" clear="clear">
						<div id="addHsSalesmanShowUserInfoDiv" style="display: none;"></div>
						<input id="addHsSalesmanAllProfit" type="checkbox"
							checked="checked" style="vertical-align: sub;"
							onchange="checkProfit('#addHsSalesmanAllProfit', 'addProfit', 'addHsSalesman');">
						<label>业务员100%收益</label>
					</div>
					<div id="addProfitDiv" clear="clear"></div>
					<div style="margin: 5px 0 0 0;">
						<lable
							style="display:inline-block;width:100px;vertical-align:top;">
						<span class="require v-hide">*</span>备注：</lable>
						<textarea id="addHsHouseNote" style="height: 65px; width: 400px"
							clear="clear"></textarea>
					</div>
				</div>
				<div class="btn-bar"
					style="margin: 10px 10px 10px 0; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="gotoStep('addHs', 4);">上一步</a> <a
						class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="doAddTrusteeship();">保存</a> <a class="easyui-linkbutton"
						style="margin: 0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="addHsSteps">
			<div class="step addHsStep6">
				<div style="min-height: 320px; padding: 5px 0 0 0;">
					<div style="padding: 10px 0 0 5px; width: 98%;">
						<table id="centralizedApartmentRuleDg"></table>
						<div id="centralizedApartmentRuleTB">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true"
								onclick="append2()">新增规则</a> <a class="easyui-linkbutton"
								iconCls="icon-remove" plain="true" onclick="removeit2()">删除规则</a>
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true"
								onclick="accept2()">保存规则</a>
						</div>
					</div>
				</div>
				<div class="btn-bar"
					style="margin: 10px 10px 10px 0; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="gotoStep('addHs', 3);">上一步</a> <a
						class="easyui-linkbutton" style="margin: 0 5px;"
						onclick="nextStep(7)">下一步</a> <a class="easyui-linkbutton"
						style="margin: 0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="addHsSteps">
			<div class="step addHsStep7">
				<div style="min-height: 320px; padding: 5px 0 0 0;">
					<div style="padding: 10px 0 0 5px; width: 98%;">
						<table id="centralizedApartmentRoomDg"></table>
						<div id="centralizedApartmentRoomTB">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true"
								onclick="append3()">新增房间</a> <a class="easyui-linkbutton"
								iconCls="icon-remove" plain="true" onclick="removeit3()">删除房间</a>
							
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true"
								onclick="accept3()">保存房间</a>
						</div>
					</div>
					<div style="clear: both"></div>
				</div>
				<div class="btn-bar" style="margin: 10px 10px 10px 0; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="gotoStep('addHs', 6);">上一步</a> 
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="nextStep(8)">保存</a> 
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="addHsSteps">
			<div class="step addHsStep8">
				<div style="min-height:320px;padding:5px 0 0 0;">
					<div style="padding:10px 0 0 5px;width:98%;">
						<table id="centralizedApartmentRuleDg2"></table>
						<div id="centralizedApartmentRuleTB2">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="append4()">新增规则</a>
							<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeit4()">删除规则</a>
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="accept4()">保存规则</a>
							<span style="margin: 0 0 0 5px;"><input type="checkbox" name="vehicle" value="ckFloor" id="ckFloor"/>楼层小于10不补0</span>
							<span style="margin: 0 0 0 5px;"><input type="checkbox" name="vehicle" value="ckRoom" id="ckRoom"/>房号小于10不补0</span>
						</div>
					</div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addHs', 2);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="nextStep(9)">下一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="addHsSteps">
			<div class="step addHsStep9">
				<div style="padding:5px 0 0 0;">
					<div style="padding:10px 0 0 5px;width:98%;">
						<table id="centralizedApartmentParameterDg2"></table>
						<div id="centralizedApartmentParameterTB2">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="appendParameter()">新增参数</a>
							<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeitParameter()">删除参数</a>
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="acceptParameter()">保存参数</a>
						</div>
					</div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addHs', 8);$('#centralizedApartmentParameterDg2').datagrid('loadData',[]);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="nextStep(10)">下一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
        <div class="addHsSteps">
            <div class="step addHsStep10">
                <div style="min-height:320px;padding:5px 0 0 0;">
                    <div style="padding:10px 0 0 5px;width:98%;">
                        <table id="centralizedApartmentRoomDg2"></table>
                        <div id="centralizedApartmentRoomTB2">
                            <a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="append5()">新增房间</a>
                            <a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeit5()">删除房间</a>
                            <a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="accept5()">保存房间</a>
                        </div>
                    </div>
                    <div style="clear:both"></div>
                </div>
                <div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
                    <a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('addHs', 9);">上一步</a>
                    <a class="easyui-linkbutton" style="margin:0 5px;" onclick="nextStep(11)">保存</a>
                    <a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#addHomeDlg').dialog('close');">取消</a>
                </div>
            </div>
        </div>
	</div>
	<div id="choseHouse" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div
			style="margin:5px 0 5px 17px;color:black;font-size:13px;float:left;">
			城区：<select id="searchAddDistrict" onchange="queryHouse(1,0)"
				style="width:100px">
				<option></option>
			</select>
		</div>
		<div
			style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			楼盘/小区：<input id="searchAddCommunity"
				onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHouse(1,0)')" style="width:80px">
		</div>
		<div
			style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			楼栋：<input id="searchAddBuilding" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHouse(1,0)')"
				style="width:60px">
		</div>
		<div
			style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			门牌号：<input id="searchAddDoorplateno"
				onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHouse(1,0)')" style="width:60px">
		</div>
		<div id="choseHouseTable" ></div>
		<div id="choseHousePageDiv" style="width:99%"></div>
	</div>

    <div id="addRelationRoom" style="padding:6px" class="easyui-dialog" data-options="closed:true">
        <input id="relationIndex" hidden="hidden">
        <div class="search">
            <div style="margin:5px 0 5px 5px;float:left;">
                小区：<select id="searchCommunity2" onchange="queryCentralizedApartmentRoom()" style="width:100px">
            </select>
            </div>
            <div style="margin:5px 0 5px 10px;float:left;">
                楼栋：<select id="searchBuilding2" onchange="queryCentralizedApartmentRoom()" style="width:100px">
            </select>
            </div>
            <div style="margin:5px 0 5px 10px;float:left;">
                楼层：<input id="searchFloor2" onkeyup="searchOnkeyup(this.id, 'queryCentralizedApartmentRoom()')"
                          style="width:100px">
            </div>
            <div style="margin:5px 0 5px 10px;float:left;">
                房间号：<input id="searchDoorplateno2" placeholder="请输入房间号" onkeyup="searchOnkeyup(this.id, 'queryCentralizedApartmentRoom()')"
                           style="width:110px">
            </div>
            <div style="margin:5px 0 5px 10px;float:left;">
                楼层前缀：<select id="searchFloorNumPrefix" onchange="queryCentralizedApartmentRoom()" style="width:100px">
            </select>
            </div>
            <div style="margin:5px 0 5px 10px;float:left;">
                房号前缀：<select id="searchRoomNumPrefix" onchange="queryCentralizedApartmentRoom()" style="width:100px">
            </select>
            </div>
        </div>
        <div style="clear: none;"></div>
        <div style="padding:6px;padding:5px 0 0 0;">
            <div style="padding:10px 5px 0 5px;width:45%;float: left;">
                <table id="addRelationRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                       data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
                    <thead>
                    <tr>
                        <th data-options="field:'ck',checkbox:true"></th>
                        <th field="community" width="20" align="center">小区</th>
                        <th field="building" width="16" align="center">栋/单元</th>
                        <th field="floor" width="16" align="center">楼层</th>
                        <th field="roomNumber" width="16" align="center">房间号</th>
                        <th field="floorNumPrefix" width="16" align="center">楼层前缀</th>
                        <th field="roomNumPrefix" width="16" align="center">房号前缀</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div style="margin:165px 5px 5px 5px;float: left;">
                <a class="easyui-linkbutton" iconCls="icon-add1" plain="true" onclick="addRelation()">添加</a>
                <br>
                <a class="easyui-linkbutton" iconCls="icon-remove1" plain="true" onclick="removeRelation()">移除</a>
            </div>
            <div style="padding:10px 0 0 5px;width:45%;float: left;">
                <table id="existingRelationRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                       data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
                    <thead>
                    <tr>
                        <th data-options="field:'ck',checkbox:true"></th>
                        <th field="community" width="20" align="center">小区</th>
                        <th field="building" width="16" align="center">栋/单元</th>
                        <th field="floor" width="16" align="center">楼层</th>
                        <th field="roomNumber" width="16" align="center">房间号</th>
                        <th field="floorNumPrefix" width="16" align="center">楼层前缀</th>
                        <th field="roomNumPrefix" width="16" align="center">房号前缀</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div style="clear:both;"></div>
        <div style="margin:10px 0 0 0;text-align: center;">
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddRelationRoom()">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRelationRoom').dialog('close')">取消</a>
        </div>
    </div>

	<!--设置成本价窗口开始-->
	<div style="margin: 5px 0 0 0; display: none;">
		<div style='margin: 5px 0 0 0'>
			价格阶梯：<input style="width: 400px;" class="jrlHsCostPrice"
						clear="clear">
		</div>
	</div>
	<div id="addCostPriceDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input id="costPriceIndex" hidden="hidden">

		<div id="addCostPrice">
			<fieldset>
				<legend>合同期内，成本阶梯价</legend>
				<div id="addCostPriceDiv"></div>
			</fieldset>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a id="doAddCostPrice" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddCostPrice()">保存</a>
			<a id="doUpdataCostPrice"  class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdataCostPrice()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addCostPriceDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!--设置成本价窗口结束-->

	<!--修改设置成本价窗口开始-->
	<div style="margin: 5px 0 0 0; display: none;">
		<div style='margin: 5px 0 0 0'>
			价格阶梯：<input style="width: 400px;" class="jctCostPrice"
						clear="clear">
		</div>
	</div>
	<div id="updataCostPriceDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input id="jctCostPriceIndex" hidden="hidden">

		<div id="updataCostPrice">
			<fieldset>
				<legend>合同期内，成本阶梯价</legend>
				<div id="updataCostPriceDiv"></div>
			</fieldset>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdataCostPrice()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updataCostPriceDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!--修改设置成本价窗口结束-->

	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/addHs.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>