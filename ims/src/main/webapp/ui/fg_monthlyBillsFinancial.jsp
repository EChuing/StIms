<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 临时、金融账单窗口 -->
<div id="temporaryFinancialBillsDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<div style='margin:5px 0 0 10px;float: left;'>
		记账日期：<input style="width:70px" id="billsFinancialDoTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})" require="require">
	</div>
	<div style='margin:5px 0 0 10px;float: left;'>
		经手人：<input id="billsShowUserInfo" class="choose_user_button" doFlag="bills" doFun="" 
			style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
		<input id="billsGetUserStoreId" type="hidden" clear="clear">
		<input id="billsGetUserDetId" type="hidden" clear="clear">
		<input id="billsGetUserId" type="hidden" clear="clear">
		<div id="billsShowUserInfoDiv" style="display:none;"></div>
	</div>
	<div style='margin:5px 0 0 10px;float: left;'>
		归属周期：<input class='Wdate' style="width:80px" id="billsFinanciaBegin" disabled="disabled" require="require"
			onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'billsFinanciaEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})">
		到 
		<input class='Wdate' style="width:80px" id="billsFinanciaEnd" disabled="disabled" require="require"
			onfocus="WdatePicker({minDate:'#F{$dp.$D(\'billsFinanciaBegin\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})">
	</div>
	<div style="clear:both"></div>
	<div style='margin:10px 0 0 10px;float: left;'>
		账户类型：<select style="width:150px" onchange="changeWay(4)" id="billsFinancialWay" require="require">
			<option></option>
		</select>
	</div>
	<div style='margin:10px 0 0 10px;float: left;'>
		账户名称：<select style="width:150px" id="billsFinancialAccountName" onchange="getAccountId(3)" require="require">
			<option></option>
		</select>
	</div>
	<div style='margin:10px 0 0 10px;float: left;'>
		收支方式：<select style="width:88px" class="financial_payType" id="billsFinancialPayType" require="require">
			<option></option>
		</select>
	</div>
	<div style="clear:both"></div>
	<div style='margin:10px 0 0 10px;float: left;'>
		账户号码：<input style="width:150px" disabled id="billsFinancialAccountNums">
		<input style="display:none" id="billsFinancialBankNums">
	</div>
	<div style='margin:10px 0 0 10px;float: left;'>
		账户归属：<input style="width:150px" disabled id="billsFinancialAccountBelong">
	</div>
	<div style="clear:both"></div>
	<div style="width:100%">
		<div id="" style='margin:5px 0 5px 5px;width:99%;height:170px;'>
			<table id="addAuspiciousBill">
			</table>
			<div style="display:none">
				<table id="replacedFinancialTable" style="display:none">
				</table>
			</div>
		</div>
	</div>
	<div style="clear:both"></div>
	<div style='margin:10px 0 0 34px;float: left;'>
		金额：<input style="width:80px" id="billsjfSumMoney" disabled="disabled">
	</div>
	<div style='margin:10px 0 0 29px;float: left;'>
		收款日：<input style="width:80px" disabled="disabled" id="billsMonthlyBillsDate">
	</div>
	<div style='margin:10px 0 0 10px;float: left;'>
		超期天数：<input style="width:80px" id="billsNotDays" disabled="disabled">
	</div>
	<div style='margin:10px 0 0 22px;float: left;'>
		滞纳金：<input style="width:80px" id="billsLateFee" data-fn-blur="calNewOwe()" data-type="money" require="require">
	</div>
	<div style="clear:both"></div>
	<div style='margin:10px 0 10px 10px;float: left;'>
		<span id="hrbase"></span><input style="width:80px" id="billsFinancialMoneyhistory" disabled>
	</div>
	<div style='margin:10px 0 10px 17px;float: left;'>
		应收金额：<input style="width:80px" id="billsFinancialMoneyTotal" disabled>
	</div>	
	<div id="billsOweDiv" style='margin:10px 0 10px 10px;float: left;'>
		最新欠结：<input style="width:80px" id="billsEveryOwe" disabled >
	</div>
	<div id="billsSaveDiv" style='margin:10px 0 10px 10px;float: left;display:none'>
		最新余额：<input style="width:80px" id="billsEverySave" disabled>
	</div>
	<div style='margin:10px 0 10px 10px;float: left;'>
		实收金额：<input style="width:80px" id="billsFinancialMoneyGet" data-fn-blur="calNewOwe()" data-type="money" require="require">
	</div>
	<div style="clear:both"></div>
	<!-- <div style='margin:10px 0 10px 10px;float: left;'>
		是否发送短信：<input type="checkbox" id="billsFinancialIfMsg">
	</div> -->
	<div style="clear:both"></div>
	<div style="text-align: center;">
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="addTemporaryBillGeneration()">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#temporaryFinancialBillsDlg').dialog('close')">关闭</a>
	</div>
</div>

<!-- 生成租客每期收支对话框 -->
<div id="setRenterEveryFinancialDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<input style="display:none" id='renterInstallmentId'>
	<input style="display:none" id="setRenterEveryHouseCoding">
	<input style="display:none" id='setRenterEveryHouseCodingType'> 
	<input style="display:none" id='setRenterEveryFinancialHouseId'> 
	<input style="display:none" id='setRenterEveryFinancialHouseStoreId'>
	<input style="display:none" id='setRenterEveryFinancialHouseRentId'>
	<input style="display:none" id="setRenterEveryFinancialBelongType"><!-- 归属类型 -->
	<input style="display:none" id='setRenterEveryFinancialRenterId'>
	<input style="display:none" id='setRenterEveryFinancialLandlordId'>
	<input style="display:none" id='setRenterEveryFinancialPopId'><!-- 租客的人口ID，用于发送短信 -->
	<input style="display:none" id="setRenterEveryFinancialBelongName"><!-- 归属名称 -->
	<input style="display:none" id="setRenterEveryFinancialBelongId">
	<input style="display:none" id="setRenterEveryFinancialBelongAddress"><!-- 费用归属 -->
	<input style="display:none" id="setRenterEveryFinancialHrFollow"><!-- 费用改动后的跟进记录 -->
	
	<input style="display:none" id="setWaterDate">
	<input style="display:none" id="setElectDate">
	<input style="display:none" id="setGasDate">
	<input style="display:none" id="setHotWaterDate">
	<input style="display:none" id="setHotAirDate">
	
	<div style='margin:5px 0 0 10px;float: left;'>
		记账日期：<input style="width:70px" id="setRenterEveryFinancialDoTime"
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
		归属周期：<input class='Wdate' style="width:80px" id="setRenterEveryFinanciaBegin"
			onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'setRenterEveryFinanciaEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:changeDate(1)})"> 
		到 
		<input class='Wdate' style="width:80px" id="setRenterEveryFinanciaEnd"
			onfocus="WdatePicker({minDate:'#F{$dp.$D(\'setRenterEveryFinanciaBegin\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})">
	</div>
	<div style="clear:both"></div>
	<div style='margin:10px 0 0 10px;float: left;'>
		账户类型：<select style="width:150px" onchange="changeWay(2)" id="setRenterEveryFinancialWay">
			<option></option>
		</select>
	</div>
	<div style='margin:10px 0 0 10px;float: left;'>
		账户名称：<select style="width:150px" id="setRenterEveryFinancialAccountName" onchange="getAccountId(1)">
			<option></option>
		</select>
	</div>
	<div style='margin:10px 0 0 10px;float: left;'>
		收支方式：<select style="width:88px" class="financial_payType" id="everyFinancialPayType">
			<option></option>
		</select>
	</div>
	<div style="clear:both"></div>
	<div style='margin:10px 0 0 10px;float: left;'>
		账户号码：<input style="width:150px" disabled id="setRenterEveryFinancialAccountNums"> 
		<input style="display:none" id="setRenterEveryFinancialBankNums">
	</div>
	<div style='margin:10px 0 0 10px;float: left;'>
		账户归属：<input style="width:150px" disabled id="setRenterEveryFinancialAccountBelong">
	</div>
	<div style="clear:both"></div>
	<div id="setRenterEveryFinancialDiv" style='margin:10px 0 10px 0;'>
		<table id="setRenterEveryFinancialTable" style="width:100%;height:227px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0, onClickCell:onClickCell2">
			<thead>
				<tr>
					<th field="jfNatureOfThe" width="15" align="center">收支性质</th>
					<th field="jfAccountingSpecies" width="15" align="center">收支种类</th>
					<th field="jfSumMoney" width="20" align="center">收支金额</th>
					<th field="jfFinanNote" width="30" align="center" editor="textbox">收支原因</th>
					<th field="note" width="20" align="center" editor="textbox">备注</th>
				</tr>
			</thead>
		</table>
	</div>
	<div style='margin:5px 0 10px 38px;float: left;'>
		总应收金额：<input style="width:80px" id="setRenterEveryFinancialMoneyTotal" disabled>
	</div>
	<div style='margin:5px 0 10px 12px;float: left;'>
		实际金额：<input style="width:80px" id="setRenterEveryFinancialMoneyGet" disabled>
	</div>
	<div style='margin:5px 0 10px 12px;float: left;'>
		是否发送短信：<input type="checkbox" id="setRenterEveryFinancialIfMsg">
	</div>
	<div id="setRenterEveryOweDiv" style='margin:5px 0 10px 12px;float: left;display:none'>
		最新欠结：<input style="width:80px" id="setRenterEveryOwe" disabled>
	</div>
	<div id="setRenterEverySaveDiv" style='margin:5px 0 10px 12px;float: left;display:none'>
		最新余额：<input style="width:80px" id="setRenterEverySave" disabled>
	</div>
	<div style='margin:5px 0 10px 12px;float: left;display:none'>
		欠结金额：<input style="width:80px" id="setRenterEveryFinancialMoneySum" disabled>
	</div>
	<div style="clear:both"></div>
	<div style="text-align: center;">
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="doSetRenterEveryFinancial()">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#setRenterEveryFinancialDlg').dialog('close')">关闭</a>
	</div>
</div>
<!-- 选择账单对话框 -->
<div id="choseConstractInstallmentDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<input id="monthlyBillsDgIndex" type="hidden">
	<div style="float:left;width:37%;">
		<legend>分期账单</legend>
		<div style="margin:0 0 5px 5px;color:black;float:left;">
			状态：<select id="searchJciState2"
				onchange="queryRenterInstallment(1,0)" style="width:80px">
				<option value="">全部</option>
				<option value="待收" selected="selected">待收</option>
				<option value="已收">已收</option>
			</select>
		</div>
		<table id="renterInstallmentDg" style="width:100%;height:227px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="jciPeriods" width="10" align="center">期数</th>
					<th field="jciBeginPeriods" width="20" align="center">开始周期</th>
					<th field="jciEndPeriods" width="20" align="center">结束周期</th>
					<th field="jciMoney" width="15" align="center">金额</th>
					<th field="jciState" width="10" align="center" formatter="formatRenterState">状态</th>
					<th field="jciPaymentVoucher" width="20" align="center" formatter="formatPaymentVoucher">付款凭证</th>
				</tr>
			</thead>
		</table>
		<!-- 租客账单分页 -->
		<div id="renterInstallmentPageDiv" style="width:99%;text-align:center;"></div>
	</div>
	<div style="margin:0 0 0 12px;float:left;width:60%;">
		<legend>抄表情况</legend>
		<div class="water">
            <div style='margin:5px 0 0 12px;float: left;'>
                水表： 本次读数：<input style="width:60px" id="srefWaterThis" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                上次读数：<input style="width:60px" id="srefWaterLast" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                差值：<input style="width:60px" id="srefWaterNum" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                计费方案：<input style="width:100px" id="srefWaterPlan" disabled>
            </div>
        </div>
		<div style="clear:both"></div>
		<div class="elect">
            <div style='margin:5px 0 0 12px;float: left;'>
                电表： 本次读数：<input style="width:60px" id="srefElectritThis" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                上次读数：<input style="width:60px" id="srefElectritLast" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                差值：<input style="width:60px" id="srefElectritNum" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                计费方案：<input style="width:100px" id="srefElectritPlan" disabled>
            </div>
        </div>
		<div style="clear:both"></div>
		<div class="gas">
            <div style='margin:5px 0 0 12px;float: left;'>
                气表： 本次读数：<input style="width:60px" id="srefGasThis" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                上次读数：<input style="width:60px" id="srefGasLast" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                差值：<input style="width:60px" id="srefGasNum" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                计费方案：<input style="width:100px" id="srefGasPlan" disabled>
            </div>
        </div>
        <div style="clear:both"></div>
		<div class="hotwater">
            <div style='margin:5px 0 0 12px;float: left;'>
                热水： 本次读数：<input style="width:60px" id="srefHotWaterThis" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                上次读数：<input style="width:60px" id="srefHotWaterLast" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                差值：<input style="width:60px" id="srefHotWaterNum" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                计费方案：<input style="width:100px" id="srefHotWaterPlan" disabled>
            </div>
        </div>
        <div style="clear:both"></div>
		<div class="hotair">
            <div style='margin:5px 0 0 12px;float: left;'>
                暖气： 本次读数：<input style="width:60px" id="srefHotAirThis" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                上次读数：<input style="width:60px" id="srefHotAirLast" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                差值：<input style="width:60px" id="srefHotAirNum" disabled>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                计费方案：<input style="width:100px" id="srefHotAirPlan" disabled>
            </div>
        </div>
		<div style="clear:both"></div>
		<legend style="margin:5px 0 0 0;display:none;">能源收费明细（系统计算）</legend>
		<div style="display:none;">
			<div style='margin:5px 0 0 36px;float: left;'>
				水费：<input style="width:70px" id="srefWaterMoneySys" disabled>
			</div>
			<div style='margin:5px 0 0 29px;float: left;'>
				电费：<input style="width:70px" id="srefElectritMoneySys" disabled>
			</div>
			<div style='margin:5px 0 0 29px;float: left;'>
				气费：<input style="width:70px" id="srefGasMoneySys" disabled>
			</div>
			<div style='margin:5px 0 0 36px;float: left;'>
				热水：<input style="width:70px" id="srefHotWaterMoneySys" disabled>
			</div>
			<div style='margin:5px 0 0 36px;float: left;'>
				暖气：<input style="width:70px" id="srefHotAirMoneySys" disabled>
			</div>
			<div style='margin:5px 0 0 29px;float: left;'>
				其他：<input style="width:70px" id="srefOtherSys" disabled>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 24px;float: left;'>
				管理费：<input style="width:70px" id="srefManageMoneySys" disabled>
			</div>
			<div style='margin:5px 0 0 17px;float: left;'>
				服务费：<input style="width:70px" id="srefServerMoneySys" disabled>
			</div>
			<div style='margin:5px 0 0 17px;float: left;'>
				电视费：<input style="width:70px" id="srefTvMoneySys" disabled>
			</div>
			<div style='margin:5px 0 0 17px;float: left;'>
				网络费：<input style="width:70px" id="srefWifiMoneySys" disabled>
			</div>
			<div style="clear:both"></div>
		</div>
		<legend style="display:none;">能源收费明细（短信通知）</legend>
		<div style="display:none;">
			<div style='margin:5px 0 0 36px;float: left;'>
				水费：<input style="width:70px" id="srefWaterMoneyMsg" disabled>
			</div>
			<div style='margin:5px 0 0 29px;float: left;'>
				电费：<input style="width:70px" id="srefElectritMoneyMsg" disabled>
			</div>
			<div style='margin:5px 0 0 29px;float: left;'>
				气费：<input style="width:70px" id="srefGasMoneyMsg" disabled>
			</div>
			<div style='margin:5px 0 0 36px;float: left;'>
				热水：<input style="width:70px" id="srefHotWaterMoneyMsg" disabled>
			</div>
			<div style='margin:5px 0 0 36px;float: left;'>
				暖气：<input style="width:70px" id="srefHotAirMoneyMsg" disabled>
			</div>
			<div style='margin:5px 0 0 29px;float: left;'>
				其他：<input style="width:70px" id="srefOtherMsg" disabled>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 24px;float: left;'>
				管理费：<input style="width:70px" id="srefManageMoneyMsg" disabled>
			</div>
			<div style='margin:5px 0 0 17px;float: left;'>
				服务费：<input style="width:70px" id="srefServerMoneyMsg" disabled>
			</div>
			<div style='margin:5px 0 0 17px;float: left;'>
				电视费：<input style="width:70px" id="srefTvMoneyMsg" disabled>
			</div>
			<div style='margin:5px 0 0 17px;float: left;'>
				网络费：<input style="width:70px" id="srefWifiMoneyMsg" disabled>
			</div>
			<div style="clear:both"></div>
		</div>
		<div style="clear:both"></div>
		<legend style="margin:5px 0 0 0;">能源收费明细</legend>
		<div id="srefPowerDiv">
			<table  style="width: 540px" ><tr>
				<td width="135px" >
					<div style='margin:5px 0 0 0;float: right;'>
						管理费：<input style="width:70px" id="srefManageMoney" disabled update="update"
								   onKeyUp="moneyKeyupFomat(this);$('#ifCheckMoney').val('已变更');"
								   onBlur="$('#srefRealPay').val(0);moneyBlurFomat(this);checkMoney();"
								   onfocus="if (value =='0.00'){value =''}" mType="物业管理费"
								   mNote="物业管理费：" bigType="能源类">
					</div>
				</td>
				<td width="135px" >
					<div style='margin:5px 0 0 0;float: right;'>
						服务费：<input style="width:70px" id="srefServerMoney" disabled update="update"
								   onKeyUp="moneyKeyupFomat(this);$('#ifCheckMoney').val('已变更');"
								   onBlur="$('#srefRealPay').val(0);moneyBlurFomat(this);checkMoney();"
								   onfocus="if (value =='0.00'){value =''}" mType="租赁管理服务费"
								   mNote="租赁管理服务费：" bigType="主营类">
					</div>
				</td>
				<td width="135px" >
					<div style='margin:5px 0 0 0;float: right;'>
						电视费：<input style="width:70px" id="srefTvMoney" disabled update="update"
								   onKeyUp="moneyKeyupFomat(this);$('#ifCheckMoney').val('已变更');"
								   onBlur="$('#srefRealPay').val(0);moneyBlurFomat(this);checkMoney();"
								   onfocus="if (value =='0.00'){value =''}" mType="电视费"
								   mNote="电视费：" bigType="能源类">
					</div>
				</td>
				<td width="135px" >
					<div style='margin:5px 0 0 0;float: right;'>
						网络费：<input style="width:70px" id="srefWifiMoney" disabled update="update"
								   onKeyUp="moneyKeyupFomat(this);$('#ifCheckMoney').val('已变更');"
								   onBlur="$('#srefRealPay').val(0);moneyBlurFomat(this);checkMoney();"
								   onfocus="if (value =='0.00'){value =''}" mType="网络费"
								   mNote="网络费：" bigType="能源类">
					</div>
				</td>
			</tr></table>
			<table  style="width: 540px" >
				<tr>
					<td width="135px" >
						<div style='margin:5px 0 0 0;float: right;'>
							其他：<input style="width:70px" id="srefOtherMoney"  disabled update="update"
								type="number" data-type="money"
								data-fn-keyup="$('#ifCheckMoney').val('已变更');"
								data-fn-blur="$('#srefRealPay').val(0);checkMoney();"
								mType="代缴费用"
								mNote="其他费用：" bigType="其他类">
						</div>
					</td>
					<td width="135px" >
						<div style='margin:5px 0 0 0;float: right;'>
							交租日：<input style="width:70px" id="srefShouldDay" not-energy-data=true disabled>
						</div>
					</td>
					<td width="135px" >
						<div style='margin:5px 0 0 0;float: right;'>
							滞纳天数：<input style="width:70px" id="srefNotDays" not-energy-data=true disabled>
						</div>
					</td>
					<td width="135px" >
						<div style='margin:5px 0 0 0;float: right;'>
							滞纳金：<input style="width:70px" id="srefDamages"
								onKeyUp="moneyKeyupFomat(this);$('#ifCheckMoney').val('已变更');"
								onBlur="$('#srefRealPay').val(0);moneyBlurFomat(this);checkMoney();"
								onfocus="if (value =='0.00'){value =''}" mType="逾期-违约金"  not-energy-data=true
								mNote="违约金：" bigType="违约类">
						</div>
					</td>
				</tr>
			</table>

			<table  style="width: 540px" id="costTable">
				<tr>
					<td width="135px" class="water">
						<div style='margin:5px 0 0 0;float: right;'>
							水费：<input style="width:70px" id="srefWaterMoney" disabled update="update"
								type="number" data-type="money"
								data-fn-keyup="$('#ifCheckMoney').val('已变更');"
								data-fn-blur="$('#srefRealPay').val(0);checkMoney();"
								mType="水费" mNote=""
								mhistorys="" bigType="能源类"  >
						</div>
					</td>
					<td width="135px" class="elect">
						<div style='margin:5px 0 0 0;float: right;'>
							电费：<input style="width:70px" id="srefElectritMoney" disabled update="update"
								type="number" data-type="money"
								data-fn-keyup="$('#ifCheckMoney').val('已变更');"
								data-fn-blur="$('#srefRealPay').val(0);checkMoney();"
								mType="电费" mNote=""
								bigType="能源类">
						</div>
					</td>
					<td width="135px" class="gas">
						<div style='margin:5px 0 0 0;float: right;' >
							气费：<input style="width:70px" id="srefGasMoney" disabled update="update"
                                type="number" data-type="money"
                                data-fn-keyup="$('#ifCheckMoney').val('已变更');"
                                data-fn-blur="$('#srefRealPay').val(0);checkMoney();"
                                mType="燃气费" mNote=""
                                bigType="能源类">
						</div>
					</td>
					<td width="135px" class="hotwater">
						<div style='margin:5px 0 0 0;float: right;'>
							热水：<input style="width:70px" id="srefHotWaterMoney" disabled update="update"
								type="number" data-type="money"
								data-fn-keyup="$('#ifCheckMoney').val('已变更');"
								data-fn-blur="$('#srefRealPay').val(0);checkMoney();"
								mType="热水费" mNote=""
								mhistorys="" bigType="能源类"  >
						</div>
					</td>
				</tr>
			</table>
			<%--暖气放上一个table外面，放里面会影响样式--%>
			<div style='margin:5px 0 0 27px;float: left;' class="hotair">
				暖气：<input style="width:70px" id="srefHotAirMoney" disabled update="update"
						  type="number" data-type="money"
						  data-fn-keyup="$('#ifCheckMoney').val('已变更');"
						  data-fn-blur="$('#srefRealPay').val(0);checkMoney();"
						  mType="暖气费" mNote=""
						  mhistorys="" bigType="能源类"  >
			</div>
		</div>
		<div style="clear:both"></div>
		<legend style="margin:5px 0 0px 0;">总缴费核对</legend>
		<div style='margin:5px 0 0 12px;float: left;'>
			房屋租金：<input style="width:70px" id="srefRentMoney" disabled mType="租金" 
				mNote="房屋租金：" bigType="主营类">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			能源杂费：<input style="width:70px" id="srefPowerMoney" disabled>
		</div>
		<div style='margin:5px 0 0 5px;float: left;' id="everyHisOwe">
			历史欠结：<input style="width:70px" id="srefHisOwe" disabled>
		</div>
		<div style='margin:5px 0 0 5px;float: left;display:none' id="everyHisSave">
			历史余额：<input style="width:70px" id="srefHisSave" disabled>
		</div>
		<input id="srefPastOwe" type="hidden">
		<div style='margin:5px 0 0 5px;float: left;'>
			应收金额：<input style="width:70px" id="srefShouldPay" disabled>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;' id="everyNewOwe">
			最新欠结：<input style="width:70px" id="srefNewOwe" disabled>
		</div>
		<div style='margin:5px 0 0 12px;float: left;display:none' id="everyNewSave">
			最新余额：<input style="width:70px" id="srefNewSave" disabled>
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			实收金额：<input style="width:70px" id="srefRealPay"
				onKeyUp="moneyKeyupFomat(this);$('#ifCheckMoney').val('已变更');"
				onBlur="moneyBlurFomat(this);checkMoney();"
				onfocus="if (value =='0.00'){value =''}">
		</div>
		<input id="srefAllOwe" type="hidden">
		<div style='margin:2px 0 0 5px;float: left;display:none;'>
			<a class="easyui-linkbutton" iconcls="icon-search" onclick="checkMoney()">核算费用</a> 
			<input style="display:none" id="ifCheckMoney"><!-- 已核算、已变更 -->
		</div>
		<div style="clear:both"></div>
	</div>
	<div style="clear:both"></div>
	<div style="text-align: center">
		<div id="setRenterEveryFinancialTips" style="height:20px;color:red;"></div>
		<a class="easyui-linkbutton" iconcls="icon-edit" onclick="updateRenterEveryFinancial()">修改</a>
		<a class="easyui-linkbutton" iconcls="icon-add" onclick="addSetRenterEveryFinancial()">生成收支</a>
		<a class="easyui-linkbutton" onclick="$('#choseConstractInstallmentDlg').dialog('close')" iconcls="icon-cancel">关闭</a>
	</div>
</div>
<!-- 打印收据 -->
<div id="printShoujuDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<div style='margin:5px 0 10px 0;float: left;'>收据备注：</div>
	<div style='margin:5px 0 10px 0;float: left;'>
		<textarea style="width:300px;height:80px" id="shoujubeizhu"></textarea>
		<input type="hidden" id="billNoGet"><!-- 票据编号 -->
	</div>
	<center>
		<a class="easyui-linkbutton"
			iconcls="icon-print" onclick="doPrintShouju()"> 打印收据</a> <a
			 class="easyui-linkbutton"
			onclick="$('#printShoujuDlg').dialog('close')"
			iconcls="icon-cancel" onclick="">关闭</a>
	</center>
</div>
<!-- 付款凭证 -->
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