<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="landlordCheckOutDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
	<div class="process-bar" style="padding:0 10px">
		<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.能源计算</span>
		<span class="process arrow-in arrow-out step2" data-step="2"><span class="process-require">*</span>2.常规计算</span>
		<span class="process arrow-in arrow-out step3" data-step="3"><span class="process-require">*</span>3.退房审核</span>
		<span class="process arrow-in arrow-out step4" data-step="4"><span class="process-require">*</span>4.结算信息</span>
	</div>
	<hr color=#95b8e7 size=1 style="margin:3px">
	<div class="landlordCheckOutSteps">
		<div class="step landlordCheckOutStep1">
			<input id="landlordCheckout_nrcSave" type="hidden">
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
								<span class="jrlBeginTime" clear="clear"></span>
								至
								<span class="jrlEndTime" clear="clear"></span>
							</td>
						</tr>
						<tr>
							<td>业主名称</td>
							<td><span class="popName" clear="clear"></span></td>
							<td>联系方式</td>
							<td><span class="popTelephone" clear="clear"></span></td>
							<td>当期租金</td>
							<td><span class="hsInPrice" clear="clear"></span>元/月</td>
						</tr>
						<tr>
							<td>业主押金</td> 
							<td><span class="hsHouseDeposit" clear="clear"></span>元</td>
							<td>房屋备注</td>
							<td colspan="3"><span class="hsHouseNote" clear="clear"></span></td>
						</tr>
						<tr>
							<td>退房性质</td>
							<td><span id="landlordCheckout_nrcCheckOutNature" clear="clear"></span></td>
							<td>退房备注</td>
							<td colspan="3" style="padding:0px;">
								<textarea id="landlordCheckout_nrcCheckOutReason" clear="clear"
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
							<td style="width:16.6%">计费单价</td>
							<td style="width:16.6%">结算金额</td>
						</tr>
						<tr class="water">
							<td style="padding:0px;">水表</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcWaterVolFirst" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();"	
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcWaterVolLast" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();"									 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="landlordCheckout_nrcWaterDiff" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcWaterUnitPrice" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegpriceLand();"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span class="nrcWaterCombined" clear="clear"></span>
							</td>
						</tr>
						<tr class="elect">
							<td style="padding:0px;">电表</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcElectritVolFirst" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"									
									data-fn-blur="calwegdiffLand();calwegpriceLand();"								 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcElectritVolLast" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();"									
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="landlordCheckout_nrcElectritDiff" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcElectritUnitPrice" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegpriceLand();"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span class="nrcElectricityCombined" clear="clear"></span>
							</td>
						</tr>
						<tr class="gas">
							<td style="padding:0px;">燃气表</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcGasVolFirst" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcGasVolLast" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();" 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="landlordCheckout_nrcGasDiff" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcGasUnitPrice" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegpriceLand();" 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span class="nrcGasCombined" clear="clear"></span>
							</td>
						</tr>
						
						<tr class="hotwater">
							<td style="padding:0px;">热水表</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcHotWaterVolFirst" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcHotWaterVolLast" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();" 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="landlordCheckout_nrcHotWaterDiff" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcHotWaterUnitPrice" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegpriceLand();" 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span class="nrcHotWaterCombined" clear="clear"></span>
							</td>
						</tr>
						
						<tr class="hotair">
							<td style="padding:0px;">暖气表</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcHotAirVolFirst" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();"
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcHotAirVolLast" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegdiffLand();calwegpriceLand();" 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span id="landlordCheckout_nrcHotAirDiff" clear="clear"></span>
							</td>
							<td style="padding:0px;">
								<input type="number" data-type="money" id="landlordCheckout_nrcHotAirUnitPrice" style="width: 100%;height: 27px;border: 1px solid #95B8E7;padding-left:5px;"
									data-fn-blur="calwegpriceLand();" 
									clear="clear" require="require">
							</td>
							<td style="padding:0px;">
								<span class="nrcHotAirCombined" clear="clear"></span>
							</td>
						</tr>
					</tbody>
				</table>
				<legend>退房信息</legend>
				<div class="clearfix">
					<div style="margin:5px 0 0 12px;float:left;">
						手续状态：<select id="landlordCheckout_nrcProcedures" style="width:100px;" 
							onchange="changeNrcProcedures()" choose="choose" require="require"> 
						    <option></option>
						</select>
					</div>
					<div style="margin:5px 0 0 24px;float:left;">
						经办人：<input id="landHandlerShowUserInfo" class="choose_user_button"  doFlag="landHandler" doFun=""
							style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
						<input id="landHandlerGetUserStoreId" type="hidden">
						<input id="landHandlerGetUserDetId" type="hidden">
						<input id="landHandlerGetUserId" type="hidden">
						<div id="landHandlerShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="margin:5px 0 0 12px;float:left;">
						办理时间：<input id="landlordCheckout_nrcActualCheckOutTime" style="width:100px;" clear="clear" require="require"
							class="Wdate" onfocus="WdatePicker({autoPickDate:true})" >
					</div>
					<div style="margin:5px 0 0 12px;float:left;">
						结算时间：<input id="landlordCheckout_nrcARefundOfTime" style="width:100px;" clear="clear" require="require"
							class="Wdate" onfocus="WdatePicker({autoPickDate:true})" >
					</div>
				</div>
				<div class="clearfix">
					<div style="margin:5px 0 0 24px;float:left;">
						违约金：<input type="number" data-type="money" style="width:100px;" id="landlordCheckout_nrcBreachOfContract" 
							data-fn-blur="clearJieSuanLand()"
							clear="clear" require="require">
					</div>
					<div style="margin:5px 0 0 12px;float:left;">
						<div style='float: left;'>违约明细：</div>
						<div style='float: left;'>
							<input style="width:494px;" clear="clear" placeholder="请填写违约金明细"
								id="landlordCheckout_nrcBreachOfContractNote" >
						</div>
					</div>
				</div>
				<legend>业主结算账户</legend>
				<div class="clearfix">
					<div style='margin:5px 0 0 24px;float:left;'>
						开户名：<input style="width:100px;" clear="clear"
								id="landlordCheckout_nrcRefundTheUserName">
					</div>
					<div style='margin:5px 0 0 12px;float:left;'>
						收款银行：<input style="width:150px;" clear="clear"
								id="landlordCheckout_nrcRefundBank">
					</div>
					<div style='margin:5px 0 0 12px;float:left;'>
						收款账号：<input style="width:272px;" clear="clear"
								id="landlordCheckout_nrcRefundAccount">
					</div>
				</div>
			</div>
			<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="revokeLandlordCheckOut()">撤销退房</a>
				<a class="easyui-linkbutton" style="margin:0 5px;"
					onclick="open_common_img_dialog('private', 'landlordCheckOut', 'landlordCheckOutDg', 'nrcId', 'nrcImgPath', 'selectNotRentCheckOut', 'deleteLandlordCheckoutPic')">退房照片</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doLandlordUpdateCheckout(0)">暂存</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="landNextStep()">下一步</a>
			</div>
		</div>
	</div>
	<div class="landlordCheckOutSteps">
		<div class="step landlordCheckOutStep2">
			<div style="min-height:390px;padding:5px 0 0 0;">
				<div style="margin:0 0 0 0;">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" onclick="addRepairLand()">添加维保</a>
				</div>
				<input type="hidden" id="landlordCheckout_nrcRepairNote">
				<div style="margin:10px 0 0 0;">
					<table id="repairLandlordDg" style="width:824px;height:127px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="doRepairGetUserId" hidden="true" align="center">负责人</th>
								<th field="repEventRp" width="624" align="center">维保描述</th>
								<th field="repTollRp" width="100" align="center">费用</th>
								<th field="repTollRp2" width="100" align="center" formatter="deleteRepairLand" >操作</th>
								<th field="sendMsg" hidden="true" align="center" >发送信息</th>
							</tr>
						</thead>
					</table>
				</div>
				<div style="margin:5px 0 0 0;">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-shuaxin" onclick="reflashLandlord()">刷新</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" onclick="updateLandlord()">修正</a>
				</div>
				<div class="clearfix">
					<div style="margin: 0 0 10px 0;" class="clearfix">
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							房屋押金：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcHouseDeposit"
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="water">
							水费结算：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcWaterCombined"								 
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="elect">
							电费结算：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcElectricityCombined"								  
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="gas">
							气费结算：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcGasCombined"								  
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="hotwater">
							热水结算：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcHotWaterCombined"								  
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' class="hotair">
							暖气结算：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcHotAirCombined"								  
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							租金：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcRemainingRental"								  
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							管理费：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcContentCanalFee"								  
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							电视费：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcTvCost"								  
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;'>
							维保结算：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_nrcMaintenanceCompensation"								 
								clear="clear" require="require" data-read="1">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' id="yezhuyucun">
							预存款：<input type="number" data-type="money" style="width:80px;" id="landlordCheckout_savingsAccount"
								disabled="disabled" clear="clear">
						</div>
						<div style='width:24%;padding:10px 0 0 5px;float: left;text-align: right;' id="yezhuqianjie">
							欠结款：<input style="width:80px;" id="landlordCheckout_arrears" 
								disabled="disabled" clear="clear">
						</div>
					</div>
					<div class="clearfix">
					<input type="number" data-type="money" id="landlordCheckout_nrcDeductTheAmount" style="display:none;" clear="clear"><!-- 合计应缴 -->
					<input id="landlordCheckout_nrcRefundTheAmount" style="display:none;" clear="clear"><!-- 合计应退 -->
				</div>
				<div style="margin: 5px 0 0 0px;" class="clearfix">
					<div style="float:left;">
						<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" onclick="yezhujiesuan()">结算</a>
					</div>
					<div style="float:right;">
						<span class="yezhushijijiesuan">实际应退款：</span><span id="yezhujiesuan" style="color:red;" clear="clear"></span>元
					</div>
				</div>
				<div style="margin: 5px 0 0 0px;" class="clearfix">
					<!-- 应缴-->
					<textarea id="landlordCheckout_nrcPayNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;" readonly clear="clear" require="require"></textarea>
					<!-- 应退 -->
					<textarea id="landlordCheckout_nrcReturnNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;margin:0 0 0 1%;" readonly clear="clear" require="require"></textarea>
				</div>
			</div>
			<div class="btn-bar" style="margin:10px 10px 0 0;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('landlordCheckOut', 1);">上一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="revokeLandlordCheckOut()">撤销退房</a>
				<a class="easyui-linkbutton" style="margin:0 5px;"
					onclick="open_common_img_dialog('private', 'landlordCheckOut', 'landlordCheckOutDg', 'nrcId', 'nrcImgPath', 'selectNotRentCheckOut', 'deleteLandlordCheckoutPic')">退房照片</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doLandlordUpdateCheckout(0)">暂存</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doLandlordUpdateCheckout(1)">提交</a>
			</div>
		</div>
	</div>
	<div class="landlordCheckOutSteps">
		<div class="step landlordCheckOutStep3">
			<div style="min-height:390px;padding:5px 0 0 0;" class="clearfix">
				<div style="margin: 0 0 3px 0;">
					<div style="margin: 0 0 0 5px;">
						<span style="font-size: 15px;" >房屋地址：</span>
						<span style="font-size: 15px;" class="detailAddress" clear="clear"></span>
					</div>
					<div style="float: left;margin: 0 0 0 5px;">
						<span style="font-size: 15px;" >业主名称：</span>
						<span style="font-size: 15px;" class="popName" clear="clear"></span>
					</div>
					<div style="float: right;margin: 0 0 0 0;">
						<span style="font-size: 15px;" >退房编号：</span>
						<span style="font-size: 15px;color: red;" class="nrcNumber" clear="clear"></span>
					</div>
				</div>
				<table class="showtable w16">
					<tbody>
						<tr>
							<td style="width: 16.6%;">退房性质</td>
							<td style="width: 18.6%;"><span class="nrcCheckOutNature" clear="clear"></span></td>
							<td style="width: 14.6%;">退房手续</td>
							<td style="width: 16.6%;"><span class="nrcProcedures" clear="clear"></span></td>
							<td style="width: 16.6%;">经办人</td>
							<td style="width: 16.6%;"><span class="nrcHandlerName" clear="clear"></span></td>
						</tr>
						<tr>
							<td style="width: 16.6%;">合同周期</td>
							<td style="width: 18.6%;">
								<span class="jrlBeginTime" clear="clear"></span>
								至
								<span class="jrlEndTime" clear="clear"></span>
							</td>
							<td style="width: 14.6%;" >退房时间</td>
							<td style="width: 16.6%;" ><span class="nrcActualCheckOutTime" clear="clear"></span></td>
							<td style="width: 16.6%;" >退款时间</td>
							<td style="width: 16.6%;" ><span class="nrcARefundOfTime" clear="clear"></span></td>
						</tr>
					</tbody>
				</table>
				<div style="margin: 5px 0 0 0px;" class="clearfix">
					<!-- 应缴-->
					<textarea class="nrcPayNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;" readonly clear="clear"></textarea>
					<!-- 应退 -->
					<textarea class="nrcReturnNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;margin:0 0 0 2%;" readonly clear="clear"></textarea>
				</div>
				<div style="float: right;margin: 3px 0 3px 0;font-size:15px;">
					<span class="yezhushijijiesuan" style="font-size:15px;">实际应退款：</span>
					<span style="color: red;font-size:15px;">
						<span class="yezhuactualRefund" style="color: red;font-size:15px;" clear="clear"></span>元
						(大写 : <span class="yezhuactualRefund2" style="color: red;font-size:15px;" clear="clear"></span>)
					</span>
				</div>
				<table class="showtable" style="margin: 1% 0 0 0 ;">
					<tbody>
						<tr>
							<td style="width: 16.6%;">业主账户</td>
							<td style="width: 83.4%;" colspan="5">
								<span class="nrcRefundBank" clear="clear"></span> - 
								<span class="nrcRefundTheUserName" clear="clear"></span> - 
								<span class="nrcRefundAccount" clear="clear"></span>
							</td>
						</tr>
						<tr class="landlordRefundAccount">
							<td style="width: 16.6%;">公司结算账户</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 1px solid #95B8E7;" 
									id="landlordFinancialWay" class="add_financial_way" 
									onchange="changeWay('landlord',0)" choose="choose">
									<option></option>
								</select>
							</td>
							<td style="width: 16.6%;">账户名称</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 1px solid #95B8E7;"
									id="landlordFinancialAccountName" onchange="getAccountId('landlord')" choose="choose">
									<option></option>
								</select>
							</td>
							<td style="width: 16.6%;">收支方式</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 1px solid #95B8E7;"
									id="landlordCheckout_nrcPayType" class="financial_payType" choose="choose">
									<option></option>
								</select>
							</td>
						</tr>
						<tr class="landlordRefundAccount">
							<td style="width: 16.6%;">账户归属</td>
							<td style="width: 16.6%;padding:0px;">
								<input style="width: 100%;height: 27px;border: 0;padding-left:5px;" readonly="readonly" 
									id="landlordFinancialAccountBelong" clear="clear">
							</td>
							<td style="width: 16.6%;">账户号码</td>
							<td style="padding:0px;" colspan="3">
								<input style="width: 100%;height: 27px;border: 0;padding-left:5px;" readonly="readonly" 
									id="landlordFinancialAccountNums" clear="clear">
								<input id="landlordFinancialBankNums" style="display:none" clear="clear">
							</td>
						</tr>
						<tr>
							<td style="width: 16.6%;">退房备注</td>
							<td style="width: 83.4%;padding:0px;text-align: left;" colspan="5">
								<span class="nrcCheckOutReason" clear="clear"></span>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="landlordOperatorDg" style="width:100%;height:102px;table-layout:fixed;overflow:hidden;"
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
					onclick="open_common_img_dialog('private', 'landlordCheckOut', 'landlordCheckOutDg', 'nrcId', 'nrcImgPath', 'selectNotRentCheckOut', 'deleteLandlordCheckoutPic')">退房照片</a>
				<a class="easyui-linkbutton landlordCheckoutOne" style="margin:0 5px;" id="landlordCheckoutAudit" onclick="checkLandlordCheckoutDlg(0)">审核</a>
				<a class="easyui-linkbutton landlordCheckoutTwo" style="margin:0 5px;" id="landlordCheckoutReview" onclick="checkLandlordCheckoutDlg(1)">复核</a>
			</div>
		</div>
	</div>
	<div class="landlordCheckOutSteps">
		<div class="step landlordCheckOutStep4">
			<div style="min-height:390px;padding:5px 0 0 0;" class="clearfix">
				<div style="margin: 0 0 3px 0;">
					<div style="margin: 0 0 0 5px;">
						<span style="font-size: 15px;" >房屋地址：</span>
						<span style="font-size: 15px;" class="detailAddress" clear="clear"></span>
					</div>
					<div style="float: left;margin: 0 0 0 5px;">
						<span style="font-size: 15px;" >业主名称：</span>
						<span style="font-size: 15px;" class="popName" clear="clear"></span>
					</div>
					<div style="float: right;margin: 0 0 0 0;">
						<span style="font-size: 15px;" >退房编号：</span>
						<span style="font-size: 15px;color: red;" class="nrcNumber" clear="clear"></span>
					</div>
				</div>
				<div class="landPrint" style="display:none;"><!-- 打印相关 -->
					<span class="nrcNumber" land-print="tuifangbianhao"></span>
					<span class="nrcHandlerName" land-print="jingbanren"></span>
					<span class="nrcProcedures" land-print="tuifangshouxu"></span>
					<span class="nrcActualCheckOutTime" land-print="tuifangshijian"></span>
					<span class="nrcARefundOfTime" land-print="tuikuanshijian"></span>
					<span class="nrcPayNote" land-print="yingjiaofeiyong"></span>
					<span class="nrcReturnNote" land-print="yingtuifeiyong"></span>
					<span class="" land-print="yezhuzuke">业主</span>
					<span class="yezhushijijiesuan" land-print="shijijiesuan"></span>
					<span class="yezhuactualRefund" land-print="shijiyingtuikuan"></span>
					<span class="yezhuactualRefund2" land-print="shijiyingtuikuandaxie"></span>
					
					<span class="popName" land-print="name"></span>
					<span class="popTelephone" land-print="tel"></span>
					<span class="popIdcard" land-print="idcard"></span>
					<span class="detailAddress" land-print="wuyedizhi"></span>
					<span class="jrlBeginTime" land-print="qizuri"></span>
					<span class="jrlEndTime" land-print="jiesuri"></span>
					<span class="jrlSignedTime" land-print="qianyueriqi"></span>
					<span class="jrlTheTerm" land-print="heyueqixian"></span>
					<span class="nrcHouseDeposit" land-print="shouhuiyajin"></span>
					<span class="nrcCheckOutNature" land-print="tuifangxingzhi"></span>
					<span class="nrcCheckOutReason" land-print="tuifangyuanyin"></span>
					<span class="nrcBreachOfContractNote" land-print="weiyuejinmiaoshu"></span>
					<span class="nrcActualCheckOutTime" land-print="shijituifangshijian"></span>
					<span class="nrcRefundTheUserName" land-print="shoukuanren"></span>
					<span class="nrcRefundBank" land-print="yinhangmingcheng"></span>
					<span class="nrcRefundAccount" land-print="zhanghuhaoma"></span>
					<span class="nrcWaterVolFirst" land-print="shuituifang"></span>
					<span class="nrcWaterVolLast" land-print="shuijieqing"></span>
					<span class="nrcWaterDiff" land-print="shuichazhi"></span>
					<span class="nrcWaterUnitPrice" land-print="shuijifeifangan"></span>
					<span class="nrcElectritVolFirst" land-print="diantuifang"></span>
					<span class="nrcElectritVolLast" land-print="dianjieqing"></span>
					<span class="nrcElectritDiff" land-print="dianchazhi"></span>
					<span class="nrcElectritUnitPrice" land-print="dianjifeifangan"></span>
					<span class="nrcGasVolFirst" land-print="qituifang"></span>
					<span class="nrcGasVolLast" land-print="qijieqing"></span>
					<span class="nrcGasDiff" land-print="qichazhi"></span>
					<span class="nrcGasUnitPrice" land-print="qijifeifangan"></span>
					<span class="nrcWaterCombined" land-print="shuifei"></span>
					<span class="nrcElectricityCombined" land-print="dianfei"></span>
					<span class="nrcGasCombined" land-print="qifei"></span>
					<span class="rcoSysWater" land-print="sysshuifei"></span>
					<span class="rcoSysElectricity" land-print="sysdianfei"></span>
					<span class="rcoSysGas" land-print="sysqifei"></span>
					<span class="nrcTvCost" land-print="dianshifei"></span>
					<span class="nrcContentCanalFee" land-print="wuguanfei"></span>
					<span class="nrcRemainingRental" land-print="weifuzujin"></span>
					<span class="nrcBreachOfContract" land-print="weiyuejin"></span>
					<span class="nrcMaintenanceCompensation" land-print="weixiupeichang"></span>
					<span class="powerAll" land-print="nengyuanzongfeiyong"></span>
					<span class="oweAll" land-print="qitakoukuan"></span>
					<span class="yezhuactualRefund" land-print="hejiyingtuihuan"></span>
				</div>
				<table class="showtable w16">
					<tbody>
						<tr>
							<td style="width: 16.6%;">退房性质</td>
							<td style="width: 18.6%;"><span class="nrcCheckOutNature" clear="clear"></span></td>
							<td style="width: 14.6%;">退房手续</td>
							<td style="width: 16.6%;"><span class="nrcProcedures" clear="clear"></span></td>
							<td style="width: 16.6%;">经办人</td>
							<td style="width: 16.6%;"><span class="nrcHandlerName" clear="clear"></span></td>
						</tr>
						<tr>
							<td style="width: 16.6%;">合同周期</td>
							<td style="width: 18.6%;">
								<span class="jrlBeginTime" clear="clear"></span>
								至
								<span class="jrlEndTime" clear="clear"></span>
							</td>
							<td style="width: 14.6%;" >退房时间</td>
							<td style="width: 16.6%;" ><span class="nrcActualCheckOutTime" clear="clear"></span></td>
							<td style="width: 16.6%;" >退款时间</td>
							<td style="width: 16.6%;" ><span class="nrcARefundOfTime" clear="clear"></span></td>
						</tr>
					</tbody>
				</table>
				<div style="margin: 5px 0 0 0px;" class="clearfix">
					<!-- 应缴-->
					<textarea class="nrcPayNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;" readonly clear="clear"></textarea>
					<!-- 应退 -->
					<textarea class="nrcReturnNote" style="width:49%;height:150px;float:left;border:1px solid #a9a9a9;margin:0 0 0 2%;" readonly clear="clear"></textarea>
				</div>
				<div style="float: right;margin: 3px 0 3px 0;font-size:15px;">
					<span class="yezhushijijiesuan" style="font-size:15px;">实际应退款：</span>
					<span style="color: red;font-size:15px;">
						<span class="yezhuactualRefund" style="color: red;font-size:15px;" clear="clear"></span>元
						(大写 : <span class="yezhuactualRefund2" style="color: red;font-size:15px;" clear="clear"></span>)
					</span>
				</div>
				<table class="showtable" style="margin: 5px 0 0 0 ;">
					<tbody>
						<tr>
							<td style="width: 16.6%;">业主账户</td>
							<td style="width: 83.4%;" colspan="5">
								<span class="nrcRefundBank" clear="clear"></span> - 
								<span class="nrcRefundTheUserName" clear="clear"></span> - 
								<span class="nrcRefundAccount" clear="clear"></span>
							</td>
						</tr>
						<tr>
							<td style="width: 16.6%;">公司结算账户</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 0;-moz-appearance: none;-webkit-appearance: none;appearance: none;" 
									disabled="disabled" id="landlord2FinancialWay" class="add_financial_way" choose="choose">
									<option></option>
								</select>
							</td>
							<td style="width: 16.6%;">账户名称</td>
							<td style="width: 16.6%;padding:0px;">
								<select style="width: 100%;height: 27px;border: 0;-moz-appearance: none;-webkit-appearance: none;appearance: none;" 
									disabled="disabled" id="landlord2FinancialAccountName" choose="choose">
									<option></option>
								</select>
							</td>
							<td style="width: 16.6%;">收支方式</td>
							<td style="width: 16.6%;padding:0px;">
								<span class="nrcPayType" clear="clear"></span>
							</td>
						</tr>
						<tr>
							<td style="width: 16.6%;">账户归属</td>
							<td style="width: 16.6%;padding:0px;">
								<input style="width: 100%;height: 27px;border: 0;padding-left:5px;" readonly="readonly" 
									id="landlord2FinancialAccountBelong" clear="clear">
							</td>
							<td style="width: 16.6%;">账户号码</td>
							<td style="padding:0px;" colspan="3">
								<input style="width: 100%;height: 27px;border: 0;padding-left:5px;" readonly="readonly" 
									id="landlord2FinancialAccountNums" clear="clear"> 
								<input id="landlord2FinancialBankNums" style="display:none" clear="clear">
							</td>
						</tr>
						<tr>
							<td style="width: 16.6%;">退房备注</td>
							<td style="width: 83.4%;padding:0px;text-align: left;" colspan="5">
								<span class="nrcCheckOutReason" clear="clear"></span>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="landlordOperatorDg" style="width:100%;height:102px;table-layout:fixed;overflow:hidden;"
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
				<a class="easyui-linkbutton recoveryLandlordCheckOut" style="margin:0 5px;" onclick="doLandlordUpdateCheckout(6)">恢复为正办理退房</a>
				<a class="easyui-linkbutton" style="margin:0 5px;"
					onclick="open_common_img_dialog('private', 'landlordCheckOut', 'landlordCheckOutDg', 'nrcId', 'nrcImgPath', 'selectNotRentCheckOut', 'deleteLandlordCheckoutPic')">退房照片</a>
				<a class="easyui-linkbutton landlordCheckoutPrint" style="margin:0 5px;" onclick="doPrint2()">打印出账申请单</a> 
				<a class="easyui-linkbutton landlordCheckoutFinancial" style="margin:0 5px;" id="landlordCheckoutFinancial" onclick="showFinancial(1)">出账</a>
			</div>
		</div>
	</div>
</div>
<!-- 添加维保对话框 -->
<div id="addRepairLandDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<div style="margin:5px 0 0 0px;">
		负责人：<input id="doRepairLandShowUserInfo" class="choose_user_button"  doFlag="doRepairLand" doFun=""
			style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
		<input id="doRepairLandGetUserStoreId" type="hidden">
		<input id="doRepairLandGetUserDetId" type="hidden">
		<input id="doRepairLandGetUserId" type="hidden">
		<div id="doRepairLandShowUserInfoDiv" style="display:none;"></div>
	</div>
	<div style='margin:5px 0 0 12px;'>
		费用：<input id="repTollRpLand" style="width:150px" clear="clear" require="require"
				onKeyUp="moneyKeyupFomat(this);"
				onBlur="moneyBlurFomat(this);"
				onfocus="if (value =='0.00'){value =''}"  >
	</div>
	<div style='margin:5px 0 0 12px;float: left;'>描述：</div>
	<div style='margin:5px 0 0 0;float: left;'>
		<textarea id="repEventRpLand" style="width:280px;height:70px" clear="clear" require="require"></textarea>
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 48px;float: left;'>
			<span style="vertical-align: middle;">短信提醒：</span>
			<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="laMessageRemind">
	</div>
	<div style="clear:both"></div>
	<div id="addRepairLandSave" style="margin:10px 0 0 0;text-align:center;">
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="addToDataGridLand()">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRepairLandDlg').dialog('close')">取消</a>
	</div>
</div>