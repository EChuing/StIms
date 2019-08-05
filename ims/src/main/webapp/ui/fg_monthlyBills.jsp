<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>租客账单</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
    <script src="js/fg.monthlyBills.js"></script>
    <script src="js/fg.monthlyBills.financial.js"></script>
</head>
<body style="overflow :auto;">
<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<div>
	<div style="padding:5px 0 5px 5px">
		<a class="easyui-linkbutton" plain="true" iconCls="icon-xinzengshouzhi" id="nuwAddFinancialButton" onclick="generatingATemporaryBill()">添加临时账单</a>
		<a class="easyui-linkbutton" plain="true" iconcls="icon-lishipiaojudayin" id="weChatPayBillInquiryButton" onclick="weChatPayBillInquiry()">查询微信支付账单</a>
	</div>
	<div id="searchInstallment" style="padding:0 0 0 5px">
		<div style="padding:0 0 5px 5px;color:black;float:left;">
			楼盘名称：<input id="searchAddCommunity" onkeyup="searchOnkeyup(this.id, 'monthlyBills()')"
						style="width:100px">
		</div>
		<div style="padding:0 0 5px 29px;color:black;float:left;">
			楼栋：<input id="searchAddBuilding" onkeyup="searchOnkeyup(this.id, 'monthlyBills()')"
					  style="width:100px">
		</div>
		<div style="padding:0 0 5px 17px;color:black;float:left;">
			门牌号：<input id="searchAddDoorplateno" onkeyup="searchOnkeyup(this.id, 'monthlyBills()')"
					   style="width:100px">
		</div>
		<div style="padding:0 0 5px 17px;color:black;float:left;">
			交租日：<input id="searchPayRentDayStart" style="width:100px"
					   onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchPayRentDayEnd\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryMonthlyBills(1, 0,1)})">
			到 <input id="searchPayRentDayEnd" style="width:100px"
					 onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchPayRentDayStart\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryMonthlyBills(1, 0,1)})">
		</div>
		<div style="clear:both"></div>
		<div style="padding:0 0 5px 5px;color:black;float:left;">
			收租状态：<select id="searchJciState" onchange="queryMonthlyBills(1,0,1)"
						 style="width:100px">
			<option value="">全部</option>
			<option value="待收">待收</option>
			<option value="已收">已收</option>
		</select>
		</div>
		<div style="padding:0 0 5px 5px;color:black;float:left;">
			通知状态：<select id="searchMsgState" onchange="queryMonthlyBills(1,0,1)"
						 style="width:100px">
			<option value="">全部</option>
			<option value="已通知">已通知</option>
			<option value="未通知">未通知</option>
		</select>
		</div>
		<div style="padding:0 0 5px 5px;color:black;float:left;">
			管理状态：<select id="searchHouseState" onchange="queryMonthlyBills(1,0,1)"
						 style="width:100px">
			<option value="管理中">管理中</option>
			<option value="已退房">已退房</option>
			<option value="">全部</option>
		</select>
		</div>
		<div style="padding:0 0 5px 17px;height:20px;line-height:20px;color:black;float:left;">
			<span>总租金：</span> <span id="totalMoney" style="color:blue;"></span> 元
		</div>
		<div style="padding:0 0 5px 5px;height:20px;line-height:20px;color:black;float:left;">
			<span>总金额：</span> <span id="allTotalMoney" style="color:blue;"></span> 元
		</div>
		<div style="clear:both"></div>
	</div>
	<div class="timeOutDiv" style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
		<input id="timeOut" type="hidden" value="0">
		<button type="button" class="btn btn-success timeOutBtn" style="margin:0 0 5px 5px;width:140px;" value="1">逾期账单<span class="totalNum1"></span></button>
		<button type="button" class="btn btn-success timeOutBtn" style="margin:0 0 5px 5px;width:140px;" value="2">今日账单<span class="totalNum2"></span></button>
		<button type="button" class="btn btn-success timeOutBtn" style="margin:0 0 5px 5px;width:140px;" value="3">七日账单<span class="totalNum3"></span></button>
	</div>
	<div style="margin:2px 0 5px 5px;color:black;font-size:13px;float:left;">
		<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="reflashList()" ></a>
	</div>
	<div style="clear:both"></div>
</div>
<div>
	<table id="monthlyBillsDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
		   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
		<thead>
		<tr>
			<th field="detailedAddress" width="30" align="center">地址</th>
			<th field="renterPopName" width="15" align="center">租客</th>
			<th field="renterPopNameRemark" width="15" align="center">备注</th>
			<th field="jciMoney" width="15" align="center" formatter="formatJciMoney">金额</th>
			<th field="meterReadingRecordRemark" width="10" align="center" formatter="formatterMeterReadingRecord">抄表情况</th>
			<th field="jciLabelType" width="10" align="center" formatter="formatjciLabelType">类型</th>
			<th field="jciState" width="10" align="center" formatter="formatState">收租状态</th>
			<th field="jciFukuanri" width="10" align="center">交租日</th>
			<th field="overdueDays" width="10" align="center">超期天数</th>
			<th field="jciMessageTime" width="10" align="center" formatter="formatJciMessageTime">通知时间</th>
			<th field="hsAutoSendMsg" width="10" align="center" formatter="AutoSendMsgMatter">短信发送</th>
			<th field="jciPaymentVoucher" width="10" align="center" formatter="formatPaymentVoucher3">付款凭证</th>
			<th field="jciRead" width="10" align="center">租客阅览</th>
			<th field="console" width="10" align="center" formatter="formatConsole">操作</th>
		</tr>
		</thead>
	</table>
	<div id="monthlyBillsPageDiv" style="width:100%;text-align:center;"></div>
	<div style="margin:10px 0 0 0;text-align: center;">
		本页数据总租金筛选：<input id="searchMoneyMin" type="number" style="width:120px" onkeyup="countMoneyMax()">
		到 <input id="searchMoneyMax" type="number" style="width:120px" onkeyup="if(event.keyCode == 13){queryMoney();}">
		<a class="easyui-linkbutton" style="margin:-3px 0 0 0;" iconcls="icon-search" onclick="queryMoney()">筛选</a>
	</div>
</div>

<!-- 详细信息查看 -->
<input style="display:none" class='monthlyBillsAddress_index'>
<div id="readonlyMonthlyBillsDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<div style="margin: 0 0 5px 5px;">
		<a class="easyui-linkbutton" iconcls="icon-yulan" onclick="previewSendMessage()">短信预览</a>
		<a class="easyui-linkbutton" iconcls="icon-baocun" id="saveBillButton" onclick="doSendMessage(1)">保存账单</a>
		<a class="easyui-linkbutton" iconcls="icon-send" id="saveAndNoticeButton" onclick="doSendMessage(2)" id="sendMessageButton">保存并通知租客</a>
		<a class="easyui-linkbutton" iconcls="icon-send" id="saveAndTMNoticeButton" onclick="doSendTemplateMessage()" id="sendTemplateMessageButton">保存并微信通知租客</a>
		<a class="easyui-linkbutton" iconcls="icon-chakantupian" id="showPaymentVoucherButton" onclick="showPaymentVoucher2()">查看付款凭证</a>
		<a class="easyui-linkbutton" iconcls="icon-fangyuancaiwushengtaitongji" onclick="showPaymentInfoTable()">查看微信支付账单信息</a>
	</div>
	<fieldset>
		<legend>
			基本信息
		</legend>
		<div style='margin:0 0 0 24px;float: left;'>
			地址：<input style="width:225px" readonly='readonly' class="monthlyBillsAddress">
			<input style="display:none" class='monthlyBillsAddress_index'>
		</div>
		<div style='margin:0 0 0 10px;float: left;'>
			<span id="timeSpanName"></span><input style="width:100px" readonly='readonly' class="monthlyBillsDate">
		</div>
		<div style='margin:0 0 0 19px;float: left;'>
			超期天数：<input style="width:100px" readonly='readonly' id="notDays">
		</div>
		<div style='clear:both;'></div>
		<div style="margin:5px 0 0 0;float:left">
			客户类型：<select id="sendMessageManType" onchange="changeSendMan()" style="width:80px">
			<option value="租客">租客</option>
			<option value="住户">住户</option>
		</select>
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			租客：<select id="sendMessageName" onchange="getResidentInfo()" style="width:100px">
		</select><input style="width:100px" readonly='readonly' id="monthlyBillsRenter" class="monthlyBillsRenter">
			<input id="sendMessagePopId" style="display:none">
			<input id="sendMessageRenterId" style="display:none">
			<input id="sendMessageHouseRentId" style="display:none">
			<input id="sendMessageHouseStoreId" style="display:none">
		</div>
		<div style='margin:5px 0 0 21px;float: left;'>
			备注：<input style="width:100px" readonly='readonly' id="addHrRenterNameRemark">
		</div>
		<div style='margin:5px 0 0 43px;float: left;'>
			电话：<input style="width:100px" readonly='readonly' class="monthlyBillsPhone">
		</div>
	</fieldset>
	<div style="display:none" id="meterReadingCost">
		<fieldset>
			<legend>
				抄表情况
			</legend>
			<div class="water"><div style='margin:0 0 0 24px;float: left;'>
				水表： 本次读数：<input style="width:80px" disabled="disabled"
								class="monthlyBillsThisWater">
			</div>
				<div style='margin:0 0 0 15px;float: left;'>
					上次读数：<input style="width:80px" disabled="disabled"
								class="monthlyBillsLastWater">
				</div>
				<div style='margin:0 0 0 15px;float: left;'>
					差值：<input style="width:80px" disabled="disabled"
							  class="monthlyBillsWaterDiff">
				</div>
				<div style='margin:0 0 0 15px;float: left;'>
					计费方案：<input style="width:150px" disabled="disabled"
								class="monthlyBillsfWaterPlan">
				</div></div>
			<div style='clear:both;'></div>
			<div class="elect"><div style='margin:5px 0 0 24px;float: left;'>
				电表： 本次读数：<input style="width:80px" disabled="disabled"
								class="monthlyBillsThisElectrit">
			</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					上次读数：<input style="width:80px" disabled="disabled"
								class="monthlyBillsLastElectrit">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					差值：<input style="width:80px" disabled="disabled"
							  class="monthlyBillsElectritDiff">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					计费方案：<input style="width:150px" disabled="disabled"
								class="monthlyBillsfElectritPlan">
				</div></div>
			<div style="clear:both"></div>
			<div class="gas"><div style='margin:5px 0 0 24px;float: left;'>
				气表： 本次读数：<input style="width:80px" disabled="disabled" class="monthlyBillsThisGas">
			</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					上次读数：<input style="width:80px" class="monthlyBillsLastGas" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					差值：<input style="width:80px" class="monthlyBillsDiffGas" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					计费方案：<input style="width:150px" class="monthlyBillsfGasPlan"
								disabled="disabled">
				</div></div>
			<!-- tzl -->
			<div class="hotwater"><div style='margin:5px 0 0 24px;float: left;'>
				热水： 本次读数：<input style="width:80px" disabled="disabled" class="monthlyBillsThisHotwater">
			</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					上次读数：<input style="width:80px" class="monthlyBillsLastHotwater" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					差值：<input style="width:80px" class="monthlyBillsDiffHotwater" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					计费方案：<input style="width:150px" class="monthlyBillsfHotwaterPlan"
								disabled="disabled">
				</div></div>
			<div class="hotair"><div style='margin:5px 0 0 24px;float: left;'>
				暖气： 本次读数：<input style="width:80px" disabled="disabled" class="monthlyBillsThisHotAir">
			</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					上次读数：<input style="width:80px" class="monthlyBillsLastHotAir" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					差值：<input style="width:80px" class="monthlyBillsDiffHotAir" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					计费方案：<input style="width:150px" class="monthlyBillsfHotAirPlan"
								disabled="disabled">
				</div></div>
			<input type="hidden" id="waterDate"><!-- 本次水读数的抄表日期 -->
			<input type="hidden" id="electDate"><!-- 本次电读数的抄表日期 -->
			<input type="hidden" id="gasDate"><!-- 本次气读数的抄表日期 -->
			<input type="hidden" id="hotWaterDate"><!-- 本次热水读数的抄表日期 -->
			<input type="hidden" id="hotAirDate"><!-- 本次暖气读数的抄表日期 -->
			<div style="clear:both"></div>
		</fieldset>
	</div>
	<div style="display:none" id="detailsOfEnergyCharges">
		<input type="hidden" id="oldTotalAmout">
		<fieldset>
			<legend>计算能源收费明细</legend>
			<div id="sendMessageDivOne">
				<table  style="width: 800px" id="costTable1" class="costTableClass"><tr>
					<td width="160px">
						<div style="margin:5px 0 0 0;float: right;">
							租金：<input id="sysRentMoney" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									  onfocus="if (value =='0.00'){value =''}" moneyType="租金" name='flag'>
						</div>
					</td>
					<td width="160px">
						<div style="margin:5px 0 0 0;float: right;">
							物管费：<input id="sysRentManage" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)"
									   onBlur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneyType="物管费" name='flag'>
						</div>
					</td>
					<td width="160px">
						<div style='margin:5px 0 0 0;float: right;'>
							租赁服务费：<input id="sysServer" style="width:70px;" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
										 onfocus="if (value =='0.00'){value =''}" moneyType="服务费" name='flag'>
						</div>
					</td>
					<td width="160px">
						<div style="margin:5px 0 0 0;float: right;">
							电视费：<input id="sysRentTV" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									   onfocus="if (value =='0.00'){value =''}" moneyType="电视费" name='flag'>
						</div>
					</td>
					<td width="160px">
						<div style="margin:5px 0 0 0;float: right;">
							网费：<input id="sysRentWifi" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									  onfocus="if (value =='0.00'){value =''}" moneyType="网费" name='flag'>
						</div>
					</td>
				</tr></table>

				<table  style="width: 800px" id="costTable2" class="costTableClass"><tr>
					<td width="160px">
						<div style='margin:5px 0 0 0;float: right;'>
							其他：<input id="sysOther" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									  onfocus="if (value =='0.00'){value =''}" moneyType="其他费用" name='flag'>
						</div>
					</td>
					<td width="160px">
						<div style="margin:5px 0 0 0;float: right;">
							滞纳金：<input id="sysRentDamages" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									   onfocus="if (value =='0.00'){value =''}" moneyType="延时费" name='flag'>
						</div>
					</td>
					<td width="160px">
						<div style="margin:5px 0 0 0;float: right;">
							正常费用：<input id="sysPower" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
										onfocus="if (value =='0.00'){value =''}" moneyType="正常费用" name='flag'>
						</div>
					</td>
					<td width="160px">
						<div style="margin:5px 0 0 0;float: right;">
							历史欠结：<input id="sysRentOwe" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)"
										onBlur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneyType="历史欠结" name='flag'>
						</div>
					</td>
					<td width="160px">
						<div style="margin:5px 0 0 0;float: right;">
							总金额：<input id="sysPirce" style="width:70px" disabled="disabled">
						</div>
					</td>
				</tr></table>

				<table  style="width: 800px" class="costTable"><tr>
					<td width="160px" class="water">
						<div style="margin:5px 0 0 0;float: right;">
							水费：<input id="sysRentWater" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onblur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneytype="水费" name="flag">
						</div>
					</td>
					<td width="160px" class="elect">
						<div style="margin:5px 0 0 0;float: right;">
							电费：<input id="sysRentEcl" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onblur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneytype="电费" name="flag">
						</div>
					</td>
					<td width="160px" class="gas">
						<div style="margin:5px 0 0 0;float: right;">
							燃气费：<input id="sysRentGas" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onblur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneytype="燃气费" name="flag">
						</div>
					</td>
					<td width="160px" class="hotwater">
						<div style="margin:5px 0 0 0;float: right;">
							热水费：<input id="sysRentHotWater" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onblur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneytype="热水费" name="flag">
						</div>
					</td>
					<td width="160px" class="hotair">
						<div style="margin:5px 0 0 0;float: right;">
							暖气费：<input id="sysRentHotAir" style="width:70px" disabled="disabled" onkeyup="changeSendPrice(this)" onblur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneytype="暖气费" name="flag">
						</div>
					</td>
				</tr></table>
				<div style="clear:both"></div>
				<div style="margin:4px 0 0 66px;float: right;">
					<a class="easyui-linkbutton" iconCls="icon-shuaxin" onclick="readonlyMonthlyBills(1);" id="reloadMoneyButton"> 重新计算金额</a>
				</div>
				<div style="clear:both"></div>
			</div>
		</fieldset>
	</div>
	<fieldset>
		<legend>短信通知金额明细</legend>
		<div id="sendMessageDivTwo">
			<div id="sendTable" style="margin-left:2px;"></div>
			<table style="width: 800px" id="messageTable1" class="messageTable"><tr>
				<td width="160px" id="sendMessageRentMoneyTd" class="hideTd">
					<div style="margin:5px 0 0 0;float: right;">
						<span id="rentNameSpan"></span><input id="sendMessageRentMoney" style="width:80px"
							  onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
							  onfocus="if (value =='0.00'){value =''}" moneyType="租金" name='flag'>
					</div>
				</td>
				<td width="160px" id="sendMessageRentManageTd" class="hideTd">
					<div style="margin:5px 0 0 0;float: right;">
						物管费：<input id="sendMessageRentManage" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
								   onfocus="if (value =='0.00'){value =''}" moneyType="物管费" name='flag'>
					</div>
				</td>
				<td width="160px" id="monthlyBillsServerTd" class="hideTd">
					<div style='margin:5px 0 0 0;float: right;'>
						租赁服务费：<input id="monthlyBillsServer" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									 onfocus="if (value =='0.00'){value =''}" moneyType="服务费" name='flag'>
					</div>
				</td>
				<td width="160px" id="sendMessageRentTVTd" class="hideTd">
					<div style="margin:5px 0 0 0;float: right;">
						电视费：<input id="sendMessageRentTV" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
								   onfocus="if (value =='0.00'){value =''}" moneyType="电视费" name='flag'>
					</div>
				</td>
				<td width="160px" id="sendMessageRentWifiTd" class="hideTd">
					<div style="margin:5px 0 0 0;float: right;">
						网费：<input id="sendMessageRentWifi" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
								  onfocus="if (value =='0.00'){value =''}" moneyType="网费" name='flag'>
					</div>
				</td>
			</tr></table>
			<table style="width: 800px" class="messageTable"><tr>
				<td width="160px" id="sendMessageRentOtherTd" class="hideTd">
					<div style='margin:5px 0 0 0;float: right;'>
						其他：<input id="sendMessageRentOther" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
								  onfocus="if (value =='0.00'){value =''}" moneyType="其他费用" name='flag'>
					</div>
				</td>
				<td width="160px" id="sendMessageRentDamagesTd" class="hideTd">
					<div style="margin:5px 0 0 0;float: right;">
						滞纳金：<input id="sendMessageRentDamages" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
								   onfocus="if (value =='0.00'){value =''}" moneyType="延时费" name='flag'>
					</div>
				</td>
				<td width="160px" id="sendMessagePowerTd" class="hideTd">
					<div style="margin:5px 0 0 0;float: right;">
						正常费用：<input id="sendMessagePower" style="width:80px" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									onfocus="if (value =='0.00'){value =''}" moneyType="正常费用" name='flag'>
					</div>
				</td>
				<td width="160px" id="sendMessageRentOweTd" class="hideTd">
					<div style="margin:5px 0 0 0;float: right;">
						历史欠结：<input id="sendMessageRentOwe" style="width:80px" disabled="disabled" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									onfocus="if (value =='0.00'){value =''}" moneyType="历史欠结" name='flag'>
					</div>
				</td>
				<td width="160px" id="sendMessagePirceTd" class="hideTd">
					<div style="margin:5px 0 0 0;float: right;">
						总金额：<input id="sendMessagePirce" style="width:80px" disabled="disabled">
					</div>
				</td>
			</tr></table>

			<table style="width: 800px" class="costTable">
				<tr>
					<td width="160px" class="water">
						<div style="margin:5px 0 0 0;float: right;" class="hiddenLabel">
							水费：<input id="sendMessageRentWater" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									  onfocus="if (value =='0.00'){value =''}" moneyType="水费" name='flag'>
						</div>
					</td>
					<td width="160px" class="elect">
						<div style="margin:5px 0 0 0;float: right;" class="hiddenLabel">
							电费：<input id="sendMessageRentEcl" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									  onfocus="if (value =='0.00'){value =''}" moneyType="电费" name='flag'>
						</div>
					</td>
					<td width="160px" class="gas">
						<div style="margin:5px 0 0 0;float: right;" class="hiddenLabel">
							燃气费：<input id="sendMessageRentGas" style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"
									   onfocus="if (value =='0.00'){value =''}" moneyType="燃气费" name='flag'>
						</div>
					</td>
					<td width="160px" class="hotwater">
						<div style="margin:5px 0 0 0;float: right;" class="hiddenLabel">
							热水费：<input id="sendMessageRentHotWater" style="width:80px"  onkeyup="changeSendPrice(this)" onblur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneytype="热水费" name="flag">
						</div>
					</td>
					<td width="160px" class="hotair">
						<div style="margin:5px 0 0 0;float: right;" class="hiddenLabel">
							暖气费：<input id="sendMessageRentHotAir" style="width:80px"  onkeyup="changeSendPrice(this)" onblur="moneyBlurFomat(this)" onfocus="if (value =='0.00'){value =''}" moneytype="暖气费" name="flag">
						</div>
					</td>
				</tr>
			</table>
			<div style="clear:both"></div>
			<div style="width:100%" id="temporaryBillingForm">
				<div id="addFinancialTableDiv" style='margin:5px 0 5px 5px;width:99%;height:170px;'>
					<table id="addTemporaryOBill"></table>
					<div style="display:none">
						<table id="replacedFinancialTable" style="display:none"></table>
					</div>
				</div>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 18px;float:left">短信备注：</div>
			<div style="margin:5px 0 0 0;float:left">
				<textarea id="sendMessageNote" style="width:400px;height:40px"></textarea>
			</div>
		</div>
	</fieldset>
	<div style="clear:both"></div>
	<center id='readStatus'>
		<div id="sendMessageTips" style="height:20px;color:red;"></div>
		<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNextTenant(0)"> 上一条</a>
		<a class="easyui-linkbutton" onclick="$('#readonlyMonthlyBillsDlg').dialog('close')" iconcls="icon-cancel">关闭</a>
		<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNextTenant(1)"> 下一条</a>
	</center>
</div>

<div id="previewSendMessageDlg" style="padding:6px"
	 class="easyui-dialog" data-options="closed:true">
	<div style="margin:5px 0 0 12px;float:left">
		短信类型：<input id="previewSendMessageType" style="width:80px"
					readonly="readonly" value='租金提醒'> </input>
	</div>
	<div style="clear:both"></div>
	<div style="margin:5px 0 0 12px;float:left">短信示例：</div>
	<div style="margin:5px 0 0 0;float:left">
			<textarea id="previewSendMessageNote" style="width:300px;height:90px"
					  readonly="readonly"></textarea>
	</div>
	<div style="clear:both"></div>
	</br>
	<div style="margin: auto;text-align: center">
		<!-- <div style="height:20px;color:red;">日期为2000-01-01的时间为示例时间，实际以最终发送为准。</div> -->
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#previewSendMessageDlg').dialog('close')">关闭</a>
	</div>
</div>
<div id="paymentVoucherDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<fieldset>
		<legend>查看付款凭证</legend>
		<div id="imgWrapper" class="clearfix"></div>
		<p>描述:</p>
		<p class="" id="describe"></p>
		<center>
			<a class="easyui-linkbutton" onclick="$('#paymentVoucherDlg').dialog('close')" iconcls="icon-cancel" >关闭</a>
		</center>
	</fieldset>
</div>

<!-- 微信账单窗口 -->
<div id="paymentInfoTableDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<div style="height:auto" id="toolbarDiv">
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
	<table id="paymentInfoDg" class="easyui-datagrid"
		   style="width:100%;height:350px;table-layout:fixed;overflow:hidden;"
		   data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:10,
				fitColumns:true,
				scrollbarSize:0">
		<thead>
		<tr>
			<th field="detailedAddress" width="40" align="center">地址</th>
			<th field="jciPeriods" width="10" align="center">账单期数</th>
			<th field="popName" width="10" align="center">付款人姓名</th>
			<th field="wxpDescribe" width="10" align="center">支付描述</th>
			<th field="wxpTradeNo" width="30" align="center">订单号</th>
			<th field="wxpTotalFee" width="12" align="center" formatter="formatwxpTotalFee">总金额</th>
			<th field="wxpState" width="10" align="center" formatter="formatwxpState">支付状态</th>
			<th field="wxpGmtCreate" width="20" align="center">订单生成时间</th>
		</tr>
		</thead>
	</table>
	<div id="wxPaymenPageDiv" style="width:100%;text-align:center;"></div>
</div>
<!-- 微信窗口双击页 -->
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
<!-- 生成临时账单窗口 -->
<div id="generatingATemporaryBillDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<iframe id="generatingATemporaryBill" src="" style="width:100%;height:99%;boder:0px;"frameborder="0" scrolling="auto">
	</iframe>
</div>
<jsp:include page="/ui/fg_monthlyBillsFinancial.jsp"></jsp:include>
</body>
</html>