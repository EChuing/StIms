<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="renterCheckOutDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
	<div class="process-bar" style="padding:0 10px">
		<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.能源计算</span>
		<span class="process arrow-in arrow-out step2" data-step="2"><span class="process-require">*</span>2.常规计算</span>
		<span class="process arrow-in arrow-out step3" data-step="3"><span class="process-require">*</span>3.退房审核</span>
		<span class="process arrow-in arrow-out step4" data-step="4"><span class="process-require">*</span>4.出款信息</span>
	</div>
	<hr color=#95b8e7 size=1 style="margin:3px">
	<div class="renterCheckOutSteps">
		<div class="step renterCheckOutStep1">
			<input id="renterCheckout_rcoSave" type="hidden">
			<div style="min-height:390px;padding:5px 0 0 0;" class="clearfix">
				<legend>相关信息</legend>
				<table class="showtable w16">
					<tbody>
						<tr>
							<td>房屋地址</td>
							<td colspan="2">
								<span class="detailAddress" clear="clear"></span>
							</td>
							<td>合同周期</td>
							<td colspan="2">
								<span class="jrrBeginTime" clear="clear"></span>
								至
								<span class="jrrEndTime" clear="clear"></span>
							</td>
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
							<td>房屋备注</td>
							<td colspan="3"><span class="hrHouseNote" clear="clear"></span></td>
						</tr>
						<tr>
							<td>预约时间</td>
							<td><span id="renterCheckout_rcoCheckOutTime" clear="clear"></span></td>
							<td>超期天数</td>
							<td><span id="renterCheckout_rcoDaysOverdue" clear="clear"></span>天</td>
							<td>退房性质</td>
							<td><span id="renterCheckout_rcoCheckOutNature" clear="clear"></span></td>
						</tr>
						<tr>
							<td>申请人</td>
							<td><span id="renterCheckout_rcoApplyUserName" clear="clear"></span></td>
							<td>退房备注</td>
							<td colspan="3" style="padding:0px;">
								<textarea id="renterCheckout_rcoCheckOutReason" clear="clear"
									style="display: block;width:100%;height:38px;border: 1px solid #95B8E7;"></textarea>
							</td>
						</tr>
					</tbody>
				</table>
				<legend style="margin:5px 0 3px 0;float: left">能源抄表</legend>
				<div style="margin:2px 0 2px 5px;float: left">
					<a class="easyui-linkbutton" iconCls="icon-add-chaobiao" plain="true"  onclick="getWegNum()">获取读数</a>
				</div>
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
							<td style="padding:0px;">
								<input id="renterCheckout_rcoWaterBase" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;" 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoLastWaterBase" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoWaterPrice" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoWaterPlan" clear="clear"></span>
							</td>
						</tr>
						<tr class="elect">
							<td style="padding:0px;">电表</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoElectricityBase" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoLastElectricityBase" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoElectricityPrice" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoElectricityPlan" clear="clear"></span>
							</td>
						</tr>
						<tr class="gas">
							<td style="padding:0px;">燃气表</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoGasBaseNumber" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoGasBaseLast" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoGasPrice" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoGasPlan" clear="clear"></span>
							</td>
						</tr>
						
						
						<tr class="hotwater">
							<td style="padding:0px;">热水表</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoHotWaterBaseNumber" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoHotWaterBaseLast" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoHotWaterPrice" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoHotWaterPlan" clear="clear"></span>
							</td>
						</tr>
						<tr class="hotair">
							<td style="padding:0px;">暖气表</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoHotAirBaseNumber" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input id="renterCheckout_rcoHotAirBaseLast" type="number" data-type="money" data-fn-blur="calwegdiff();" 
									style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoHotAirPrice" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<span id="renterCheckout_rcoHotAirPlan" clear="clear"></span>
							</td>
						</tr>
						
					</tbody>
				</table>
				<legend>退房信息</legend>
				<div class="clearfix">
					<div style="margin:5px 0 0 12px;float:left;">
						手续状态：<select id="renterCheckout_rcoProcedures" style="width:100px;" 
							onchange="changeProcedures()" choose="choose" require="require"> 
						    <option></option>
						</select>
					</div>
					<div style="margin:5px 0 0 24px;float:left;">
						经办人：<input id="handlerShowUserInfo" class="choose_user_button"  doFlag="handler" doFun=""
							style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
						<input id="handlerGetUserStoreId" type="hidden">
						<input id="handlerGetUserDetId" type="hidden">
						<input id="handlerGetUserId" type="hidden">
						<div id="handlerShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="margin:5px 0 0 12px;float:left;">
						办理时间：<input id="renterCheckout_rcoCheckOutActualTime" style="width:100px;" clear="clear" require="require"
							class="Wdate" onfocus="WdatePicker({autoPickDate:true,dchanging:checkoutRenterDay()})" >
					</div>
					<div style="margin:5px 0 0 12px;float:left;">
						退款时间：<input id="renterCheckout_rcoARefundOfTime" style="width:100px;" clear="clear" require="require"
							class="Wdate" onfocus="WdatePicker({autoPickDate:true})" >
					</div>
				</div>
				<div class="clearfix">
					<div style="margin:5px 0 0 24px;float:left;">
						违约金：<input id="renterCheckout_rcoBreachOfContract" type="number" data-type="money" data-fn-blur="clearJieSuan();" 
						 	style="width:100px;" clear="clear" require="require">
					</div>
					<div style="margin:5px 0 0 12px;float:left;">
						<div style='float: left;'>违约明细：</div>
						<div style='float: left;'>
							<input style="width:494px;" clear="clear" placeholder="请填写违约金明细"
								id="renterCheckout_rcoBreachDetail" >
						</div>
					</div>
				</div>
				<legend>租客退款账户</legend>
				<div class="clearfix">
					<div style='margin:5px 0 0 24px;float:left;'>
						开户名：<input style="width:100px;" clear="clear"
								id="renterCheckout_rcoRefundTheUserName">
					</div>
					<div style='margin:5px 0 0 12px;float:left;'>
						收款银行：<input style="width:150px;" clear="clear"
								id="renterCheckout_rcoRefundBank">
					</div>
					<div style='margin:5px 0 0 12px;float:left;'>
						收款账号：<input style="width:272px;" clear="clear"
								id="renterCheckout_rcoRefundAccount">
					</div>
				</div>
			</div>
			<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
				<a class="easyui-linkbutton revokeRenterCheckOut" style="margin:0 5px;" onclick="revokeRenterCheckOut()">撤销退房</a>
				<a class="easyui-linkbutton" style="margin:0 5px;"
					onclick="open_common_img_dialog('private', 'renterCheckOut', 'renterCheckOutDg', 'rcoId', 'rcoImgPath', 'selectInfoHaveRentCheckOut', 'deleteRenterCheckoutPic')">退房照片</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doRenterUpdateCheckout(0)">暂存</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="nextStep()">下一步</a>
			</div>
		</div>
	</div>
	<div class="renterCheckOutSteps">
		<div class="step renterCheckOutStep2">
			<div style="min-height:390px;padding:5px 0 0 0;">
				<div style="margin:0 0 0 0;">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" onclick="addRepair()">添加维保</a>
				</div>
				<div style="clear:both;"></div>
				<input type="hidden" id="renterCheckout_rcoRepairNote">
				<div style="margin:10px 0 0 ;">
					<table id="repairDg" style="width:824px;height:127px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="doRepairGetUserId" hidden="true" align="center">负责人</th>
								<th field="repEventRp" width="624" align="center">维保描述</th>
								<th field="repTollRp" width="100" align="center">费用</th>
								<th field="repTollRp2" width="100" align="center" formatter="deleteRepair" >操作</th>
								<th field="sendMsg" hidden="true" align="center" >发送信息</th>
							</tr>
						</thead>
					</table>
				</div>
				<div style="margin:5px 0 0 0;">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-shuaxin" onclick="reflashRenter()">刷新</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" onclick="updateRenter()">修正</a>
				</div>
				<div class="clearfix">
					<div style="margin: 0 0 10px 0;" class="clearfix">
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							房屋押金：<input type="number" style="width:80px;" id="renterCheckout_rcoReturnDeposit"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							水电押金：<input type="number" style="width:80px;" id="renterCheckout_rcoReturnPowerDeposit"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							门卡押金：<input type="number" style="width:80px;" id="renterCheckout_rcoReturnDoorDeposit"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							其他押金：<input type="number" style="width:80px;" id="renterCheckout_rcoReturnOtherDeposit"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="water">
							水费：<input type="number" style="width:80px;" id="renterCheckout_rcoWaterCombined"
								data-type="money" clear="clear" require="require" data-read="1">
								<input id="renterCheckout_rcoSysWater" type="hidden">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="elect">
							电费：<input type="number" style="width:80px;" id="renterCheckout_rcoElectricityCombined"
								data-type="money" clear="clear" require="require" data-read="1">
								<input id="renterCheckout_rcoSysElectricity" type="hidden">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="gas">
							燃气费：<input type="number" style="width:80px;" id="renterCheckout_rcoGasCombined"
								data-type="money" clear="clear" require="require" data-read="1">
								<input id="renterCheckout_rcoSysGas" type="hidden">
						</div>
						
						
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="hotwater">
							热水费：<input type="number" style="width:80px;" id="renterCheckout_rcoHotWaterCombined"
								data-type="money" clear="clear" require="require" data-read="1">
								<input id="renterCheckout_rcoSysHotWater" type="hidden">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="hotair">
							暖气费：<input type="number" style="width:80px;" id="renterCheckout_rcoHotAirCombined"
								data-type="money" clear="clear" require="require" data-read="1">
								<input id="renterCheckout_rcoSysHotAir" type="hidden">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							租金：<input type="number" style="width:80px;" id="renterCheckout_rcoBeyondTheRent"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							管理费：<input type="number" style="width:80px;" id="renterCheckout_rcoPropertyCostsInTotal"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							服务费：<input type="number" style="width:80px;" id="renterCheckout_rcoServerCost"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							网络费：<input type="number" style="width:80px;" id="renterCheckout_rcoWifiCost"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							电视费：<input type="number" style="width:80px;" id="renterCheckout_rcoTvCost"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							维保费用：<input type="number" style="width:80px;" id="renterCheckout_rcoRepairDamages"
								data-type="money" clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' id="yucun">
							预存款：<input type="number" style="width:80px;" id="renterCheckout_rcoLicenceFee"
								disabled="disabled" clear="clear">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' id="qianjie">
							欠结款：<input type="number" style="width:80px;" id="renterCheckout_rcoOtherChargesInTotal" 
								disabled="disabled" clear="clear">
						</div>
					</div>
					<input id="renterCheckout_rcoDeductionCombined" style="display:none;" clear="clear"><!-- 合计应缴 -->
					<input id="renterCheckout_rcoTotalShouldBeReturned" style="display:none;" clear="clear"><!-- 合计应退 -->
				</div>
				<div style="margin: 5px 0 0 0px;" class="clearfix">
					<div style="float:left;">
						<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" onclick="jiesuan()">结算</a>
					</div>
					<div style="float:right;">
						<span class="shijijiesuan">应退款：</span><span id="jiesuan" style="color:red;" clear="clear"></span>元
					</div>
				</div>
				<div style="margin: 5px 0 0 0px;" class="clearfix">
					<!-- 应缴-->
					<textarea id="renterCheckout_rcoPayNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;" readonly clear="clear" require="require"></textarea>
					<!-- 应退 -->
					<textarea id="renterCheckout_rcoReturnNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;margin:0 0 0 1%;" readonly clear="clear" require="require"></textarea>
				</div>
			</div>
			<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('renterCheckOut', 1);">上一步</a>
				<a class="easyui-linkbutton revokeRenterCheckOut" style="margin:0 5px;" onclick="revokeRenterCheckOut()">撤销退房</a>
				<a class="easyui-linkbutton" style="margin:0 5px;"
					onclick="open_common_img_dialog('private', 'renterCheckOut', 'renterCheckOutDg', 'rcoId', 'rcoImgPath', 'selectInfoHaveRentCheckOut', 'deleteRenterCheckoutPic')">退房照片</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doRenterUpdateCheckout(0)">暂存</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doRenterUpdateCheckout(1)">提交</a>
			</div>
		</div>
	</div>
	<div class="renterCheckOutSteps">
		<div class="step renterCheckOutStep3">
			<div style="min-height:390px;padding:5px 0 0 0;" class="clearfix">
				<div style="margin: 0 0 3px 0;">
					<div style="margin: 0 0 0 5px;">
						<span style="font-size: 15px;" >房屋地址：</span>
						<span style="font-size: 15px;" class="detailAddress" clear="clear"></span>
					</div>
					<div style="float: left;margin: 0 0 0 5px;">
						<span style="font-size: 15px;" >租客名称：</span>
						<span style="font-size: 15px;" class="renterPopName" clear="clear"></span>
					</div>
					<div style="float: right;margin: 0 0 0 0;">
						<span style="font-size: 15px;" >退房编号：</span>
						<span style="font-size: 15px;color: red;" class="rcoNumber" clear="clear"></span>
					</div>
				</div>
				<table class="showtable w16">
					<tbody>
						<tr>
							<td style="width: 16.6%;">退房性质</td>
							<td style="width: 18.6%;"><span class="rcoCheckOutNature" clear="clear"></span></td>
							<td style="width: 14.6%;">退房手续</td>
							<td style="width: 16.6%;"><span class="rcoProcedures" clear="clear"></span></td>
							<td style="width: 16.6%;">经办人</td>
							<td style="width: 16.6%;"><span class="rcoApplyUserName" clear="clear"></span></td>
						</tr>
						<tr>
							<td style="width: 16.6%;">合同周期</td>
							<td style="width: 18.6%;">
								<span class="jrrBeginTime" clear="clear"></span>
								至
								<span class="jrrEndTime" clear="clear"></span>
							</td>
							<td style="width: 14.6%;" >退房时间</td>
							<td style="width: 16.6%;" ><span class="rcoCheckOutActualTime" clear="clear"></span></td>
							<td style="width: 16.6%;" >退款时间</td>
							<td style="width: 16.6%;" ><span class="rcoARefundOfTime" clear="clear"></span></td>
						</tr>
					</tbody>
				</table>
				<div style="margin: 5px 0 0 0px;" class="clearfix">
					<!-- 应缴-->
					<textarea class="rcoPayNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;" readonly clear="clear"></textarea>
					<!-- 应退 -->
					<textarea class="rcoReturnNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;margin:0 0 0 2%;" readonly clear="clear"></textarea>
				</div>
				<div style="float: right;margin: 3px 0 3px 0;font-size:15px;">
					<span class="shijijiesuan" style="font-size:15px;">应退款：</span>
					<span style="color: red;font-size:15px;">
						<span class="actualRefund" style="color: red;font-size:15px;" clear="clear"></span>元
						(大写 : <span class="actualRefund2" style="color: red;font-size:15px;" clear="clear"></span>)
					</span>
				</div>
				<table class="showtable" style="margin: 1% 0 0 0 ;">
					<tbody>
						<tr>
							<td style="width: 16.6%;">租客账户</td>
							<td style="width: 83.4%;" colspan="5">
								<span class="rcoRefundBank" clear="clear"></span> - 
								<span class="rcoRefundTheUserName" clear="clear"></span> - 
								<span class="rcoRefundAccount" clear="clear"></span>
							</td>
						</tr>
						<tr class="renterRefundAccount">
							<td style="width: 16.6%;">公司结算账户</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 1px solid #95B8E7;" 
									id="renterFinancialWay" class="add_financial_way" 
									onchange="changeWay('renter',0)" choose="choose">
									<option></option>
								</select>
							</td>
							<td style="width: 16.6%;">账户名称</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 1px solid #95B8E7;"
									id="renterFinancialAccountName" onchange="getAccountId('renter')" choose="choose">
									<option></option>
								</select>
							</td>
							<td style="width: 16.6%;">收支方式</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 1px solid #95B8E7;"
									id="renterCheckout_rcoPayType" class="financial_payType" choose="choose">
									<option></option>
								</select>
							</td>
						</tr>
						<tr class="renterRefundAccount">
							<td style="width: 16.6%;">账户归属</td>
							<td style="width: 16.6%;padding:0px;">
								<input style="width: 100%;height: 27px;border: 0;padding-left:5px;" readonly="readonly" 
									id="renterFinancialAccountBelong" clear="clear">
							</td>
							<td style="width: 16.6%;">账户号码</td>
							<td style="padding:0px;" colspan="3">
								<input style="width: 100%;height: 27px;border: 0;padding-left:5px;" readonly="readonly" 
									id="renterFinancialAccountNums" clear="clear"> 
								<input id="renterFinancialBankNums" style="display:none" clear="clear">
							</td>
						</tr>
						<tr>
							<td style="width: 16.6%;">退房备注</td>
							<td style="width: 83.4%;padding:0px;text-align: left;" colspan="5">
								<span class="rcoCheckOutReason" clear="clear"></span>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="renterOperatorDg" style="width:100%;height:102px;table-layout:fixed;overflow:hidden;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
					<thead>
						<tr>
							<th field="operator" width="17" align="center">经手人</th>
							<th field="content" width="67" align="center">意见/内容</th>
							<th field="time" width="16" align="center">时间</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;"
					onclick="open_common_img_dialog('private', 'renterCheckOut', 'renterCheckOutDg', 'rcoId', 'rcoImgPath', 'selectInfoHaveRentCheckOut', 'deleteRenterCheckoutPic')">退房照片</a>
				<a class="easyui-linkbutton renterCheckoutOne" style="margin:0 5px;" id="renterCheckoutAudit" onclick="checkRenterCheckoutDlg(0)">审核</a>
				<a class="easyui-linkbutton renterCheckoutTwo" style="margin:0 5px;" id="renterCheckoutReview" onclick="checkRenterCheckoutDlg(1)">复核</a>
			</div>
		</div>
	</div>
	<div class="renterCheckOutSteps">
		<div class="step renterCheckOutStep4">
			<div style="min-height:390px;padding:5px 0 0 0;" class="clearfix">
				<div style="margin: 0 0 3px 0;">
					<div style="margin: 0 0 0 5px;">
						<span style="font-size: 15px;" >房屋地址：</span>
						<span style="font-size: 15px;" class="detailAddress" clear="clear"></span>
					</div>
					<div style="float: left;margin: 0 0 0 5px;">
						<span style="font-size: 15px;" >租客名称：</span>
						<span style="font-size: 15px;" class="renterPopName" clear="clear"></span>
					</div>
					<div style="float: right;margin: 0 0 0 0;">
						<span style="font-size: 15px;" >退房编号：</span>
						<span style="font-size: 15px;color: red;" class="rcoNumber" clear="clear"></span>
					</div>
				</div>
				<div class="rentPrint" style="display:none;"><!-- 打印相关 有些是旧的申请单上的，新的已废弃 -->
					<span class="rcoNumber" rent-print="tuifangbianhao"></span>
					<span class="rcoApplyUserName" rent-print="jingbanren"></span>
					<span class="rcoProcedures" rent-print="tuifangshouxu"></span>
					<span class="rcoCheckOutActualTime" rent-print="tuifangshijian"></span>
					<span class="rcoARefundOfTime" rent-print="tuikuanshijian"></span>
					<span class="rcoPayNote" rent-print="yingjiaofeiyong"></span>
					<span class="rcoReturnNote" rent-print="yingtuifeiyong"></span>
					<span class="" rent-print="yezhuzuke">租客</span>
					<span class="shijijiesuan" rent-print="shijijiesuan"></span>
					<span class="actualRefund" rent-print="shijiyingtuikuan"></span>
					<span class="actualRefund2" rent-print="shijiyingtuikuandaxie"></span>
					
					<span class="renterPopName" rent-print="name"></span>
					<span class="adminName" rent-print="fangguanyuan"></span>
					<span class="renterPopTelephone" rent-print="tel"></span>
					<span class="renterPopIdcard" rent-print="idcard"></span>
					<span class="detailAddress" rent-print="wuyedizhi"></span>
					<span class="jrrBeginTime" rent-print="qizuri"></span>
					<span class="jrrEndTime" rent-print="jiesuri"></span>
					<span class="jrrSignedTime" rent-print="qianyueri"></span>
					<span class="jrrTheTerm" rent-print="heyueqixian"></span>
					<span class="jrrPaymentMethod" rent-print="fukuanzhouqi"></span>
					<span class="jrrInAdvancePay" rent-print="tiqianjiaozu"></span>
					<span class="jrrContractType" rent-print="heyueleixing"></span>
					<span class="jrrMoney" rent-print="zujin"></span>
					<span class="rcoReturnDeposit" rent-print="fangwuyajin"></span>
					<span class="rcoReturnDoorDeposit" rent-print="menkayajin"></span>
					<span class="rcoReturnPowerDeposit" rent-print="shuidianyajin"></span>
					<span class="rcoReturnOtherDeposit" rent-print="qitayajin"></span>
					<span class="rcoCheckOutNature" rent-print="tuifangxingzhi"></span>
					<span class="rcoCheckOutReason" rent-print="tuifangyuanyin"></span>
					<span class="rcoBreachDetail" rent-print="weiyuejinmiaoshu"></span>
					<span class="rcoLateFeeDetail" rent-print="zhinajinmiaoshu"></span>
					<span class="rcoCheckOutTime" rent-print="yuyuetuifangshijian"></span>
					<span class="rcoCheckOutActualTime" rent-print="shijituifangshijian"></span>
					<span class="rcoRefundTheUserName" rent-print="shoukuanren"></span>
					<span class="rcoRefundBank" rent-print="yinhangmingcheng"></span>
					<span class="rcoRefundAccount" rent-print="zhanghuhaoma"></span>
					<span class="rcoWaterBase" rent-print="shuituifang"></span>
					<span class="rcoLastWaterBase" rent-print="shuijieqing"></span>
					<span class="rcoWaterPrice" rent-print="shuichazhi"></span>
					<span class="rcoWaterPlan" rent-print="shuijifeifangan"></span>
					<span class="rcoElectricityBase" rent-print="diantuifang"></span>
					<span class="rcoLastElectricityBase" rent-print="dianjieqing"></span>
					<span class="rcoElectricityPrice" rent-print="dianchazhi"></span>
					<span class="rcoElectricityPlan" rent-print="dianjifeifangan"></span>
					<span class="rcoGasBaseNumber" rent-print="qituifang"></span>
					<span class="rcoGasBaseLast" rent-print="qijieqing"></span>
					<span class="rcoGasPrice" rent-print="qichazhi"></span>
					<span class="rcoGasPlan" rent-print="qijifeifangan"></span>
					<span class="rcoWaterCombined" rent-print="shuifei"></span>
					<span class="rcoElectricityCombined" rent-print="dianfei"></span>
					<span class="rcoGasCombined" rent-print="qifei"></span>
					<span class="rcoSysWater" rent-print="sysshuifei"></span>
					<span class="rcoSysElectricity" rent-print="sysdianfei"></span>
					<span class="rcoSysGas" rent-print="sysqifei"></span>
					<span class="rcoTvCost" rent-print="dianshifei"></span>
					<span class="rcoPropertyCostsInTotal" rent-print="wuguanfei"></span>
					<span class="rcoWifiCost" rent-print="wangfei"></span>
					<span class="rcoServerCost" rent-print="zulinfuwufei"></span>
					<span class="rcoLicenceFee" rent-print="yucunfeiyong"></span>
					<span class="rcoRemainingRent" rent-print="weijiaozujin"></span>
					<span class="rcoDaysOverdue" rent-print="chaoqitianshu"></span>
					<span class="rcoBeyondTheRent" rent-print="chaoqifangzu"></span>
					<span class="rcoBreachOfContract" rent-print="weiyuejin"></span>
					<span class="rcoLateFee" rent-print="zhinajin"></span>
					<span class="rcoRepairDamages" rent-print="weixiupeichang"></span>
					<span class="rcoOtherChargesInTotal" rent-print="leijiqiankuan"></span>
					<span class="powerAllMoney" rent-print="nengyuanzongfeiyong"></span>
					<span class="rcoTotalShouldBeReturned" rent-print="yajinzongji"></span>
					<span class="rentAllMoney" rent-print="zujinjiesuan"></span>
					<span class="oweAllMoney" rent-print="weiyuejinhezhinajin"></span>
					<span class="otherAllMoney" rent-print="qitakoukuan"></span>
					<span class="actualRefund" rent-print="hejiyingtuihuan"></span>
				</div>
				<table class="showtable w16">
					<tbody>
						<tr>
							<td style="width: 16.6%;">退房性质</td>
							<td style="width: 18.6%;"><span class="rcoCheckOutNature" clear="clear"></span></td>
							<td style="width: 14.6%;">退房手续</td>
							<td style="width: 16.6%;"><span class="rcoProcedures" clear="clear"></span></td>
							<td style="width: 16.6%;">经办人</td>
							<td style="width: 16.6%;"><span class="rcoApplyUserName" clear="clear"></span></td>
						</tr>
						<tr>
							<td style="width: 16.6%;">合同周期</td>
							<td style="width: 18.6%;">
								<span class="jrrBeginTime" clear="clear"></span>
								至
								<span class="jrrEndTime" clear="clear"></span>
							</td>
							<td style="width: 14.6%;" >退房时间</td>
							<td style="width: 16.6%;" ><span class="rcoCheckOutActualTime" clear="clear"></span></td>
							<td style="width: 16.6%;" >退款时间</td>
							<td style="width: 16.6%;" ><span class="rcoARefundOfTime" clear="clear"></span></td>
						</tr>
					</tbody>
				</table>
				<div style="margin: 5px 0 0 0px;" class="clearfix">
					<!-- 应缴-->
					<textarea class="rcoPayNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;" readonly clear="clear"></textarea>
					<!-- 应退 -->
					<textarea class="rcoReturnNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;margin:0 0 0 2%;" readonly clear="clear"></textarea>
				</div>
				<div class="clearfix">
					<div style="float: right;margin: 3px 0 3px 0;font-size:15px;">
						<div>
							<span class="shijijiesuan" style="font-size:15px;">应退款：</span>
							<span style="color: red;font-size:15px;">
								<span class="actualRefund" style="color: red;font-size:15px;" clear="clear"></span>元
								(大写 : <span class="actualRefund2" style="color: red;font-size:15px;" clear="clear"></span>)
							</span>
						</div>
						<div class="rcoActualReceiptsDiv">
							<span class="" style="font-size:15px;">实收款：</span>
							<input class="rcoActualReceipts" data-type="money" clear="clear">
						</div>
					</div>
				</div>
				<table class="showtable" style="margin: 5px 0 0 0 ;">
					<tbody>
						<tr>
							<td style="width: 16.6%;">租客账户</td>
							<td style="width: 83.4%;" colspan="5">
								<span class="rcoRefundBank" clear="clear"></span> - 
								<span class="rcoRefundTheUserName" clear="clear"></span> - 
								<span class="rcoRefundAccount" clear="clear"></span>
							</td>
						</tr>
						<tr>
							<td style="width: 16.6%;">公司结算账户</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 0;-moz-appearance: none;-webkit-appearance: none;appearance: none;" 
									disabled="disabled" id="renter2FinancialWay" class="add_financial_way" choose="choose">
									<option></option>
								</select>
							</td>
							<td style="width: 16.6%;">账户名称</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 0;-moz-appearance: none;-webkit-appearance: none;appearance: none;" 
									disabled="disabled" id="renter2FinancialAccountName" choose="choose">
									<option></option>
								</select>
							</td>
							<td style="width: 16.6%;">收支方式</td>
							<td style="width: 16.6%;padding:0px;">
								<span class="rcoPayType" clear="clear"></span>
							</td>
						</tr>
						<tr>
							<td style="width: 16.6%;">账户归属</td>
							<td style="width: 16.6%;padding:0px;">
								<input style="width: 100%;height: 27px;border: 0;padding-left:5px;" readonly="readonly" 
									id="renter2FinancialAccountBelong" clear="clear">
							</td>
							<td style="width: 16.6%;">账户号码</td>
							<td style="padding:0px;" colspan="3">
								<input style="width: 100%;height: 27px;border: 0;padding-left:5px;" readonly="readonly" 
									id="renter2FinancialAccountNums" clear="clear"> 
								<input id="renter2FinancialBankNums" style="display:none" clear="clear">
							</td>
						</tr>
						<tr>
							<td style="width: 16.6%;">退房备注</td>
							<td style="width: 83.4%;padding:0px;text-align: left;" colspan="5">
								<span class="rcoCheckOutReason" clear="clear"></span>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="renterOperatorDg" style="width:100%;height:102px;table-layout:fixed;overflow:hidden;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
					<thead>
						<tr>
							<th field="operator" width="17" align="center">经手人</th>
							<th field="content" width="67" align="center">意见/内容</th>
							<th field="time" width="16" align="center">时间</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
				<a class="easyui-linkbutton recoveryRenterCheckOut" style="margin:0 5px;" onclick="recoveryRenterCheckOut()">恢复为正办理退房</a>
				<a class="easyui-linkbutton" style="margin:0 5px;"
					onclick="open_common_img_dialog('private', 'renterCheckOut', 'renterCheckOutDg', 'rcoId', 'rcoImgPath', 'selectInfoHaveRentCheckOut', 'deleteRenterCheckoutPic')">退房照片</a>
				<a class="easyui-linkbutton renterCheckoutPrint" style="margin:0 5px;" onclick="doPrint()">打印出账申请单</a> 
				<a class="easyui-linkbutton renterCheckoutFinancial" style="margin:0 5px;" id="renterCheckoutFinancial" onclick="showFinancial(0)">出账</a>
			</div>
		</div>
	</div>
</div>
<!-- 添加维保对话框 -->
<div id="addRepairDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<div style="margin:5px 0 0 0px;">
		负责人：<input id="doRepairShowUserInfo" class="choose_user_button"  doFlag="doRepair" doFun=""
			style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
		<input id="doRepairGetUserStoreId" type="hidden">
		<input id="doRepairGetUserDetId" type="hidden">
		<input id="doRepairGetUserId" type="hidden">
		<div id="doRepairShowUserInfoDiv" style="display:none;"></div>
	</div>
	<div style='margin:5px 0 0 12px;'>
		费用：<input id="repTollRp" type="number" data-type="money" style="width:150px" clear="clear" require="require">
	</div>
	<div style='margin:5px 0 0 12px;float: left;'>描述：</div>
	<div style='margin:5px 0 0 0;float: left;'>
		<textarea id="repEventRp" style="width:280px;height:70px" clear="clear" require="require"></textarea>
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 48px;float: left;'>
			<span style="vertical-align: middle;">短信提醒：</span>
			<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="shorMessageRemind">
	</div>
	<div style="clear:both"></div>
	<div id="addRepairSave" style="margin:10px 0 0 0;text-align:center;">
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="addToDataGrid()">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRepairDlg').dialog('close')">取消</a>
	</div>
</div>