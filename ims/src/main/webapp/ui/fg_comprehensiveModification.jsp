<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
	<head>
		<meta charset="utf-8">
		<title>综合修改</title>
		<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
		<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
		<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
		<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
		<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
		<link href="css/icon.css" rel="stylesheet">
		<link href="css/style.css" rel="stylesheet">
		<link href="css/upload.css" rel="stylesheet">
		<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
		<script	src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
		<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
		<script	src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
		<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
		<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
		<script	src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
		<script	src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
		<script src="js/config.js"></script>
		<script src="js/fg.public.js"></script>
		<script src="js/fg_comprehensiveModification.js"></script>
	</head>
	<body>
		<div class="bodyLoadingOver" ></div>
		<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
		<div class="clearfix">
			<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" id="hsAutoSendMsgButton" onclick="hsAutoSendMsg()">自动发送短信</a>
			</div>
			<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" id="hsManualSendMsgButton" onclick="hsManualSendMsg()">手动发送短信</a>
			</div>
		</div>
		<div>
			<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				城区：<select id="searchDistrict" onchange="queryTrusteeship(1,0)" style="width:100px">
					<option></option>
				</select>
			</div>
			<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼盘/小区：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0, 0)')" style="width:80px">
			</div>
			<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0, 0)')" style="width:80px">
			</div>
			<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				租赁状态：<select id="searchLeaseState" onchange="queryTrusteeship(1,0)" style="width:80px">
					<option value="">全部</option>
					<option value="所有未租">所有未租</option>
					<option value="空置未租">空置未租</option>
					<option value="正在转租">正在转租</option>
					<option value="到期不续">到期不续</option>
					<option value="毁约待租">毁约待租</option>
					<option value="已租" selected='selected'>已租</option>
				</select>
			</div>
			<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				房屋状态：<select id="searchState" onchange="queryTrusteeship(1,0)" style="width:100px">
					<option value="正常" selected='selected'>正常</option>
					<option value="正办理退房">正办理退房</option>
					<option value="退房待审核">退房待审核</option>
					<option value="退房待复核">退房待复核</option>
					<option value="退房完成">退房完成</option>
				</select>
			</div>
			<div style="padding:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				下定状态：<select id="searchHsDownDeposit" onchange="queryTrusteeship(1,0)" style="width:80px">
					<option value="">全部</option>
					<option value="是">已定</option>
					<option value="否">未定</option>
				</select>
			</div>
			
		</div>
		<!--托管房源列表-->
		<div id="DataGridTrusteeship"  style="width:100%;height:90%;">
			<table id="trusteeshipDg"  class="easyui-datagrid" style="width:100%;height:402px;table-layout:fixed;
				overflow:hidden;" data-options="rownumbers:false,singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0, checkOnSelect: false, selectOnCheck: false,">
				<thead> 
					<tr >
						<th data-options="field:'ck',checkbox:true"></th>
						<th field="addDistrict" width="15" align="center">城区</th>
						<th field="totalPage" width="20" align="center">详细地址</th>
						<!-- <th field="hsSectionType" width="12" align="center">户型</th>
						<th field="hsHouseSquare" width="10" align="center">面积</th> -->
						<th field="hsGuidePrice" width="10" align="center">指导价</th>
						<th field="hsVacancyDay" width="10" align="center">空置天数</th>
						<th field="hsEndTime" width="16" align="center">托管到期</th>
						<th field="hsLeaseState" width="10" align="center" formatter="hsLeaseStateFormatter">租赁状态</th>
						<%--<th field="hsEndTime1" width="16" align="center">发布招租</th>--%>
						<%--<th field="hsDownDeposit" width="10" align="center" formatter="depositStateFormatter">下定状态</th>--%>
						<th field="hsState" width="10" align="center">房屋状态</th>
						<th field="hsAutoSendMsg" width ='10' align ="center" formatter = "hsAutoSendMsgmatter">短信发送</th>
					</tr>
				</thead>
			</table>
			<!-- 房源分页 -->
			<div id="trusteeshipPageDiv" style="width:100%;text-align:center;"></div>
			<!-- 跟进信息列表 -->
			<table id="followInfoTable"></table>
			<!-- 跟进分页 -->
			<div id="followPageDiv" style="width:100%;text-align:center;"></div>
		</div>
		<div id="readonlyTruDlg" class="easyui-dialog" data-options="closed:true">
			<div id="readonlyTabs" class="easyui-tabs" data-options="tabPosition:'left'">
				<div title="已租信息">
					<input id="updateRhrId" style="display:none">
					<input style="display:none" id="updateRhsId">
					<input style="display:none" id="updateRhsHouseId">
					<div style="margin:10px 0 0 15px;float: left;">
						租赁状态：<input style="width:100px;" disabled="disabled" id="updateRhrLeaseState">
					</div>
					<div style="margin:10px 0 0 31px;float: left;">
						物业地址：<input style="width:247px;" disabled="disabled" id="updateRtotalPage">
					</div>
					<div style="margin:10px 0 0 44px;float: left;">
						面积：<input style="width:100px;" id="updateRhrHouseSquare">
					</div>
					<div style="margin:10px 0 0 56px;float: left;">
						户型：<select style="width:90px;" id="updateRhrSectionType">
							<option></option>
						</select>
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 15px;float: left;">
						用途类型：<select style="width:100px;" id="updateRhrHouseOwner">
							<option></option>
						</select>
					</div>
					<div style="margin:5px 0 0 55px;float: left;">
						朝向：<select id="updateRhrHouseDirection" style="width:80px">
							<option></option>
						</select>
					</div>
					<div style="margin:5px 0 0 27px;float: left;">
						微信绑定：<input style="width:80px;" disabled="disabled" id="updateRwxOpen">
					</div>
					<div style="margin:5px 0 0 32px;float: left;">
						房管员：<input id="updateRhrShowUserInfo" class="choose_user_button" doFlag="updateRhr" doFun="" style="width:100px;cursor: pointer;" readonly="readonly">
						<input id="updateRhrGetUserStoreId" type="hidden">
						<input id="updateRhrGetUserDetId" type="hidden">
						<input id="updateRhrGetUserId" type="hidden">
						<div id="updateRhrShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="margin:5px 0 0 20px;float: left;" id="updateRhrBaseTd">
						租客欠结款：<input style="width:90px;" id="updateRhrBase" data-type="money" >
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 15px;float: left;">
						剩余租期：<input style="width:100px;" disabled="disabled" id="updateRoverplus">
					</div>
					<div style="margin:5px 0 0 19px;float: left;">
						业绩受益人：<input id="updateRRassInfo" style="width:247px;cursor: pointer;" readonly="readonly" onclick="beneficiariesOfPerformance(1)">
					</div>
					<div style="margin:5px 0 0 32px;float: left;">
						业务员：<input id="AdminUserShowUserInfo" class="choose_user_button" doFlag="AdminUser" doFun="" style="width:100px;cursor: pointer;" readonly="readonly">
						<input id="AdminUserGetUserStoreId" type="hidden">
						<input id="AdminUserGetUserDetId" type="hidden">
						<input id="AdminUserGetUserId" type="hidden">
						<div id="AdminUserShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="margin:5px 0 0 44px;float: left;">
						录入人：<input style="width:90px;" disabled="disabled" id="updateRhrUser">
					</div>
					<div style="clear:both"></div>
					<div style="width:98%;height:130px;margin:5px 0 0 10px;">
						<div style="float:left;width:47%;height:100%;">
							<fieldset>
								<legend>租客信息</legend>
								<div style="margin:5px 0 0 12px;float: left;">
									承租人：<input style="width:70px;" disabled="disabled" id="updateRrenName">
									<input style="width:90px;" disabled="disabled" id="updateRrenTelephone" >
									<input style="width:149px;" disabled="disabled" id="updateRrenIdcard" >
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 24px;float: left;">
									备注：<input style="width:316px;" disabled="disabled" id="updateRrenNameRemark">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 12px;float: left;">
									联系人：<input style="width:70px;" disabled="disabled" id="updateRrenterSecondContacts">
									<input style="width:90px;" disabled="disabled" id="updateRrenterSecondPhone">
									<input style="width:149px;" disabled="disabled" id="updateR">
								</div>
								<div style="clear:both"></div>
								<!-- <div style="margin:5px 0 0 12px;float: left;">
									代理人：<input style="width:70px;" disabled="disabled" id="updateR">
									<input style="width:90px;" disabled="disabled" id="updateR">
									<input style="width:149px;" disabled="disabled" id="updateR">
								</div>
								<div style="clear:both"></div> -->
								<div style="margin:5px 0 0 0px;float: left;">
									房间备注：<input style="width:316px;" id="updateRhrHouseNote">
								</div>
							</fieldset>
						</div>
						<div style="float:left;width:52%;height:100%;">
							<fieldset>
								<legend>其它信息</legend>
								<div style="margin:5px 0 0 14px;float: left;" class="water">
									水底数：<input style="width:50px;" id="updateRhrWaterVolFirst" data-type="money">立方
								</div>
								<div style="margin:5px 0 0 15px;float: left;" class="elect">
									电底数：<input style="width:50px;" id="updateRhrElectritVolFirst" data-type="money">度
								</div>
								<div style="margin:5px 0 0 35px;float: left;" class="gas">
									气底数：<input style="width:50px;" id="updateRhrGasVolFirst" data-type="money">立方
								</div>
								<div style="margin:5px 0 0 5px;float: left;" class="hotwater">
									热水底数：<input style="width:50px;" id="updateRhrHotWaterVolFirst" data-type="money">立方
								</div>
								<div style="margin:5px 0 0 5px;float: left;" class="hotair">
									暖气底数：<input style="width:50px;" id="updateRhrHotAirVolFirst" data-type="money">立方
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 2px;float: left;">
									房屋押金：<input style="width:50px;" id="updateRhrHouseDeposit" data-type="money">元
								</div>
								<div style="margin:5px 0 0 15px;float: left;">
									水电押金：<input style="width:50px;" id="updateRhrPowerDeposit" data-type="money">元
								</div>
								<div style="margin:5px 0 0 23px;float: left;">
									门卡押金：<input style="width:50px;" id="updateRhrDoorDeposit" data-type="money">元
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 2px;float: left;">
									其它押金：<input style="width:50px;" id="updateRhrOtherDeposit" data-type="money">元
								</div>
								<div style="margin:5px 0 0 27px;float: left;">
									网络费：<input style="width:50px;" id="updateRhrWifiCharge" data-type="money">元/月
								</div>
								<div style="margin:5px 0 0 18px;float: left;">
									电视费：<input style="width:50px;" id="updateRhrTvCharge" data-type="money">元/月
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 14px;float: left;">
									其他费：<input style="width:50px;" id="updateRhrOtherPay" data-type="money">元/月
								</div>
							</fieldset>
						</div>
					</div>
					<div style="width:97%;margin:5px 0 0 10px;">
						<fieldset>
							<legend>水电气计费方案</legend>
							<div id="qupdateRhrWaterPlan" style='margin:5px 0 0 33px;float: left;' class="water">
								水计费：<select id="updateRhrWaterPlan" style="width:120px" needs="0">
									<option></option>
								</select>
							</div>
							<div id="qupdateRhrElectritPlan"  style='margin:5px 0 0 21px;float: left;' class="elect">
								电计费：<select id="updateRhrElectritPlan" style="width:120px" needs="0">
									<option></option>
								</select>
							</div>
							<div id="qupdateRhrGasPlan" style='margin:5px 0 0 21px;float: left;' class="gas">
								气计费：<select id="updateRhrGasPlan" style="width:120px" needs="0">
									<option></option>
								</select>
							</div>
							<div id="qupdateRhrHotWaterPlan" style='margin:5px 0 0 21px;float: left;' class="hotwater">
								热水计费：<select id="updateRhrHotWaterPlan" style="width:120px" needs="0">
									<option></option>
								</select>
							</div>
							<div id="qupdateRhrHotAirPlan" style='margin:5px 0 0 21px;float: left;' class="hotair">
								暖气计费：<select id="updateRhrHotAirPlan" style="width:120px" needs="0">
									<option></option>
								</select>
							</div>
						</fieldset>
					</div>
					<div style="clear:both"></div>
					<div style="height:15px;"></div>
					<center>
						<a  class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateSourceInfo()">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="javascript:$('#readonlyTruDlg').dialog('close')">关闭</a>
					</center>
					
				</div>
				<div title="未租信息">
					<input style="display:none" id="updateThsId">
					<input style="display:none" id="updateT">
					<input style="display:none" id="updateThsHouseId">
					<div style="margin:10px 0 0 15px;float: left;">
						租赁状态：<input style="width:100px;" disabled="disabled" id="updateThsLeaseState">
					</div>
					<div style="margin:10px 0 0 31px;float: left;">
						物业地址：<input style="width:247px;" disabled="disabled" id="updateThsAddress">
					</div>
					<div style="margin:10px 0 0 44px;float: left;">
						面积：<input type="number" style="width:100px;" id="updateThsHouseSquare">
					</div>
					<div style="margin:10px 0 0 56px;float: left;">
						户型：<select style="width:90px;" id="updateThsSectionType">
							<option></option>
						</select>
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 15px;float: left;">
						用途类型：<select style="width:100px;" id="updateThsHouseOwner">
							<option></option>
						</select>
					</div>
					<div style="margin:5px 0 0 55px;float: left;">
						朝向：<select style="width:80px;" id="updateThsHouseDirection">
							<option></option>
						</select>
					</div>
					<div style="margin:5px 0 0 15px;float: left;">
						出房指导价：<input style="width:80px;" id="updateThsGuidePrice" data-type="money">
					</div>
					<div style="margin:5px 0 0 20px;float: left;">
						业主押金：<input style="width:100px;" id="updateThsHouseDeposit" data-type="money">
					</div>
					<div style="margin:5px 0 0 20px;float: left;" id="updateThsBaseTd">
						业主欠结款：<input style="width:90px;" id="updateThsBase" data-type="money">
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 15px;float: left;">
						空置天数：<input style="width:100px;" disabled="disabled" id="updateThsVacancyDay">
					</div>
					<div style="margin:5px 0 0 19px;float: left;">
						业绩受益人：<input id="updateThsAssist" style="width:247px;cursor: pointer;" readonly="readonly" onclick="beneficiariesOfPerformance(2)">
					</div>
					<div style="margin:5px 0 0 32px;float: left;">
						业务员：<input id="updateThsShowUserInfo" class="choose_user_button" doFlag="updateThs" doFun="" style="width:100px;cursor: pointer;" readonly="readonly">
						<input id="updateThsGetUserStoreId" type="hidden">
						<input id="updateThsGetUserDetId" type="hidden">
						<input id="updateThsGetUserId" type="hidden">
						<div id="updateThsShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="margin:5px 0 0 44px;float: left;">
						录入人：<input style="width:90px;" disabled="disabled" id="updateThsUserName">
					</div>
					<div style="clear:both"></div>
						<div style="margin:5px 0 0 15px;float: left;">
							外置装修/免租期：<input type="number" style="width:59px;" id="updateThsDecorationHoliday">
						</div>
					<div style="clear:both"></div>
					<div style="width:96%;height:150px;margin:5px 0 0 10px;">
						<div style="float:left;width:48%;height:100%;">
							<fieldset>
								<legend>业主信息</legend>
								<div style="margin:5px 0 0 0;float: left;">
									业主信息：<input style="width:70px;" disabled="disabled" id="updateTlaName">
									<input style="width:90px;" disabled="disabled" id="updateTlaTelephone">
									<input style="width:149px;" disabled="disabled" id="updateTlaIdcard">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 24px;float: left;">
									备注：<input style="width:316px;" disabled="disabled" id="updateTlaNameRemark">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 12px;float: left;">
									联系人：<input style="width:70px;" disabled="disabled" id="updateTlaSecondContacts">
									<input style="width:90px;" disabled="disabled" id="updateTlaSecondPhone">
									<input style="width:149px;" disabled="disabled">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 0;float: left;">
									收款账户：<input style="width:70px;" id="updateThsBankName">
									<select style="width:90px;" id="updateThsBankType">
										<option></option>
									</select>
									<input style="width:149px;" id="updateThsBankNum">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 0px;float: left;">
									房间备注：<input style="width:316px;" id="updateThsHouseNote">
								</div>
							</fieldset>
						</div>
						<div style="float:left;width:52%;height:100%;">
							<fieldset>
								<legend>其它信息</legend>
								<div style="height:125px;">
									<div style="margin:5px 0 0 17px;float: left;" class="water">
										水底数：<input style="width:50px;" id="updateThsWaterVolFirst" data-type="money">立方
									</div>
									<div style="margin:5px 0 0 17px;float: left;" class="elect">
										电底数：<input style="width:50px;" id="updateThsElectritVolFirst" data-type="money">度
									</div>
									<div style="margin:5px 0 0 17px;float: left;" class="gas">
										气底数：<input style="width:50px;" id="updateThsGasVolFirst" data-type="money">立方
									</div>
									
									<div style="margin:5px 0 0 5px;float: left;" class="hotwater">
										热水底数：<input style="width:50px;" id="updateThsHotWaterVolFirst" data-type="money">立方
									</div>
									<div style="margin:5px 0 0 5px;float: left;" class="hotair">
										暖气底数：<input style="width:50px;" id="updateThsHotAirVolFirst" data-type="money">立方
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					<div style="clear:both"></div>
					<div style="height:15px;"></div>
					<center>
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateTrusteeship();">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="javascript:$('#readonlyTruDlg').dialog('close')">关闭</a>
					</center>
				</div   >
				<div title="租客账单">
					<!-- <div style="padding:5px 0 0 10px;">
						<a class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="updateInstallment(0)">修改账单</a>
					</div> -->
					<div style="padding:5px 0 0 10px;width:98%; height:auto;">
						<table id="renterPaymentTable" class="easyui-datagrid" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
							data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
							<thead>
								<tr>
									<th field="renterName" width="10" align="center">租客</th>
									<th field="jciPeriods" width="10" align="center">账单期数</th>
									<th field="jciBeginPeriods" width="10" align="center">开始周期</th>
									<th field="jciEndPeriods" width="10" align="center">结束周期</th>
									<th field="jciNature" width="10" align="center">性质</th>
									<th field="jciType" width="10" align="center">类别</th>
									<th field="jciMoney" width="10" align="center">金额</th>
									<th field="jciState" width="10" align="center" formatter="formatRenterState">状态</th>
									<th field="jciFukuanri" width="10" align="center">收租日</th>
									<th field="registerPeople" width="10" align="center">登记人</th>
									<th field="jciRegisterTime" width="20" align="center">登记时间</th>
								</tr>
							</thead>
						</table>
					</div>
					<!-- 租客账单分页 -->
					<div id="renterPageDiv" style="width:100%;text-align:center;"></div>
				</div>
				<div title="业主账单">
					<!-- <div style="padding:5px 0 0 10px;">
						<a class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="updateInstallment(1)">修改账单</a>
					</div> -->
					<div style="padding:5px 0 0 10px;width:98%; height:auto;">
						<table id="landlordPaymentTable" class="easyui-datagrid" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
							data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
							<thead>
								<tr>
									<th field="landlordName" width="10" align="center">房东</th>
									<th field="jciPeriods" width="10" align="center">账单期数</th>
									<th field="jciBeginPeriods" width="10" align="center">开始周期</th>
									<th field="jciEndPeriods" width="10" align="center">结束周期</th>
									<th field="jciNature" width="10" align="center">性质</th>
									<th field="jciType" width="10" align="center">类别</th>
									<th field="jciMoney" width="10" align="center">金额</th>
									<th field="jciState" width="10" align="center" formatter="formatLandlordState">状态</th>
									<th field="jciFukuanri" width="10" align="center">付租日</th>
									<th field="registerPeople" width="10" align="center">登记人</th>
									<th field="jciRegisterTime" width="20" align="center">登记时间</th>
								</tr>
							</thead>
						</table>
					</div>
					<!-- 业主账单分页 -->
					<div id="landlordPageDiv" style="width:100%;text-align:center;"></div>
				</div>
				<div title="合约记录">
					<div id="renewalContinueDiv">
						<legend style="margin:3px 0 0 10px;">租客合约</legend>
						<div style="margin:0 0 0 10px;">
							<a class="easyui-linkbutton" iconCls="icon-edit-number" plain="true" onclick="updateRenterRenewal()">修改合约</a>
							<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'renterContract', 'renewalContinueTable', 'jrrId', 'jrrImgPath', 'renewalRenterInRentDb', 'deleteRentContPic')">上传及查看图片</a>
							<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="abrogateRenterContract()">废除合约</a>
						</div>
						<div style="clear:both"></div>
						<div style="width:98%;margin:0 0 0 10px;">
							<table id="renewalContinueTable" class="easyui-datagrid" style="width:100%;height:127px;table-layout:fixed;overflow:hidden;"
								data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
								<thead>
									<tr>
										<th field="jrrRentalType" width="10" align="center">合约状态</th>
										<th field="jrrSignedTime" width="10" align="center">签约时间</th>
										<th field="jrrContractType" width="10" align="center">合同性质</th>
										<th field="jrrBeginTime" width="10" align="center">开始时间</th>
										<th field="jrrEndTime" width="10" align="center">到期时间</th>
										<th field="jrrTheTerm" width="10" align="center">合同期限</th>
										<th field="jrrMoney" width="10" align="center">房屋租金</th>
										<th field="jrrPaymentMethod" width="10" align="center">缴费方式</th>
										<th field="jrrImgNum" width="10" align="center">图片/文件</th>
										<th field="jrrRegistrationTime" width="10" align="center">登记时间</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<div id="landlordContinueDiv">
						<legend style="margin:10px 0 0 10px;">业主合约</legend>
						<div style="padding:0 0 0 10px;">
							<a class="easyui-linkbutton" iconCls="icon-edit-number" plain="true" onclick="updateLandlordRenewal()">修改合约</a>
							<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'landlordContract', 'landlordContinueTable', 'jrlId', 'jrlImgPath', 'renewalLandlordInRentDb', 'deleteLandContPic')">上传及查看图片</a>
							<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="abrogateLandlordContract()">废除合约</a>
						</div>
						<div style="clear:both"></div>
						<div style="margin:0 0 0 10px;width:98%;">
							<table id="landlordContinueTable" class="easyui-datagrid" style="width:100%;height:127px;table-layout:fixed;overflow:hidden;"
								data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
								<thead>
									<tr>
										<th field="jrlRentalType" width="10" align="center">合约状态</th>
										<th field="jrlSignedTime" width="14" align="center">签约时间</th>
										<th field="jrlContractType" width="10" align="center">合同性质</th>
										<th field="jrlBeginTime" width="14" align="center">开始时间</th>
										<th field="jrlEndTime" width="14" align="center">到期时间</th>
										<th field="jrlTheTerm" width="14" align="center">合同期限</th>
										<th field="jrlPaymentMethod" width="10" align="center">缴费方式</th>
										<th field="jrlImgNum" width="10" align="center">图片/文件</th>
										<th field="jrlRegistrationTime" width="14" align="center">登记时间</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
				<div title="客户信息">
				<div id="customerTabs" class="easyui-tabs">
						<div title="租客信息">
							<div id="popClassdiv">
								<input style="display:none" id="popId">
								<div style='margin:10px 0 0 35px;float: left;'>
									姓名：<input id="popName" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									备注：<input id="popNameRemark" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									证件类型：<select id="popIdcardType" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="身份证/临时身份证/户口本">身份证/临时身份证/户口本</option>
										<option value="回乡证/护照">回乡证/护照</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									证件号码：<input id="popIdcard" style="width:200px" clear="clear">
								</div>
								<div style="clear:both"></div>
								<div style='margin:10px 0 0 35px;float: left;'>
									电话：<input id="popTelephone" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									性别：<select id="popSex" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="男">男</option>
										<option value="女">女</option>
									</select>
								</div>
								<div style='margin:10px 0 0 59px;float: left;'>
									民族：<input id="popNation" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									户籍地址：<input id="popIdcardAddress" style="width:200px" clear="clear">
								</div>
								<div style="clear:both"></div>
								<div style='margin:10px 0 0 35px;float: left;'>
									生日：<input id="popBirth" style="width:100px;" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
								</div>
								<div style='margin:10px 0 0 11px;float: left;'>
									婚姻状况：<select id="popMarriageState" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="已婚">已婚</option>
										<option value="未婚">未婚</option>
										<option value="离异">离异</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									来自地区：<input id="popFromArea" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									现住地址：<input id="popPresentAddress" style="width:200px" clear="clear">
								</div>
								<div style="clear:both"></div>
								<div style='margin:10px 0 0 35px;float: left;'>
									职业：<select id="popOccupation" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="工人">工人</option>
										<option value="公务员">公务员</option>
										<option value="职员">职员</option>
										<option value="农民">农民</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 11px;float: left;'>
									文化程度：<select id="popDegreeEducation" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="博士">博士</option>
										<option value="硕士">硕士</option>
										<option value="本科">本科</option>
										<option value="大专">大专</option>
										<option value="高中">高中</option>
										<option value="初中">初中</option>
										<option value="小学">小学</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									处所类型：<input id="popResidenceType" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									服务处所：<input id="popUnitService" style="width:200px" clear="clear">
								</div>
								<div style="clear:both"></div>
								<div style='margin:10px 0 0 11px;float: left;'>
									居住事由：<select id="popResidenceCause" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="务工">务工</option>
										<option value="经商">经商</option>
										<option value="投靠亲友">投靠亲友</option>
										<option value="旅游观光">旅游观光</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 11px;float: left;'>
									入住时间：<input id="popCheckinTime" style="width:100px" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
								</div>
								<div style='margin:10px 0 0 11px;float: left;'>
									与承租人关系：<select id="popRelation" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="亲人">亲人</option>
										<option value="朋友">朋友</option>
										<option value="同事">同事</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 31px;float: left;'>
									内/外信用：<input id="popInnerCreditLevel" style="width:98px;" clear="clear">
									<input id="popOuterCreditLevel" style="width:98px;" clear="clear">
								</div>
							</div>
							<div style="clear:both"></div>
							<center style="margin-top:40px">
								<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdatePopulation(0);">保存</a>
								<a class="easyui-linkbutton" onclick="$('#readonlyTruDlg').dialog('close')" iconcls="icon-cancel">关闭</a>
							</center>						
						</div>
						<div title="业主信息">
							<div id="popClassdiv1">
								<input style="display:none" id="popId1">
								<div style='margin:10px 0 0 35px;float: left;'>
									姓名：<input id="popName1" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									备注：<input id="popNameRemark1" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									证件类型：<select id="popIdcardType1" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="身份证/临时身份证/户口本">身份证/临时身份证/户口本</option>
										<option value="回乡证/护照">回乡证/护照</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									证件号码：<input id="popIdcard1" style="width:200px" clear="clear">
								</div>
								<div style="clear:both"></div>
								<div style='margin:10px 0 0 35px;float: left;'>
									电话：<input id="popTelephone1" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									性别：<select id="popSex1" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="男">男</option>
										<option value="女">女</option>
									</select>
								</div>
								<div style='margin:10px 0 0 59px;float: left;'>
									民族：<input id="popNation1" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									户籍地址：<input id="popIdcardAddress1" style="width:200px" clear="clear">
								</div>
								<div style="clear:both"></div>
								<div style='margin:10px 0 0 35px;float: left;'>
									生日：<input id="popBirth1" style="width:100px;" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
								</div>
								<div style='margin:10px 0 0 11px;float: left;'>
									婚姻状况：<select id="popMarriageState1" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="已婚">已婚</option>
										<option value="未婚">未婚</option>
										<option value="离异">离异</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									来自地区：<input id="popFromArea1" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									现住地址：<input id="popPresentAddress1" style="width:200px" clear="clear">
								</div>
								<div style="clear:both"></div>
								<div style='margin:10px 0 0 35px;float: left;'>
									职业：<select id="popOccupation1" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="工人">工人</option>
										<option value="公务员">公务员</option>
										<option value="职员">职员</option>
										<option value="农民">农民</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 11px;float: left;'>
									文化程度：<select id="popDegreeEducation1" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="博士">博士</option>
										<option value="硕士">硕士</option>
										<option value="本科">本科</option>
										<option value="大专">大专</option>
										<option value="高中">高中</option>
										<option value="初中">初中</option>
										<option value="小学">小学</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									处所类型：<input id="popResidenceType1" style="width:100px" clear="clear">
								</div>
								<div style='margin:10px 0 0 35px;float: left;'>
									服务处所：<input id="popUnitService1" style="width:200px" clear="clear">
								</div>
								<div style="clear:both"></div>
								<div style='margin:10px 0 0 11px;float: left;'>
									居住事由：<select id="popResidenceCause1" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="务工">务工</option>
										<option value="经商">经商</option>
										<option value="投靠亲友">投靠亲友</option>
										<option value="旅游观光">旅游观光</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 11px;float: left;'>
									入住时间：<input id="popCheckinTime1" style="width:100px" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
								</div>
								<div style='margin:10px 0 0 11px;float: left;'>
									与承租人关系：<select id="popRelation1" style="width:100px" choose="choose">
										<option value=""></option>
										<option value="亲人">亲人</option>
										<option value="朋友">朋友</option>
										<option value="同事">同事</option>
										<option value="其他">其他</option>
									</select>
								</div>
								<div style='margin:10px 0 0 31px;float: left;'>
									内/外信用：<input id="popInnerCreditLevel1" style="width:98px;" clear="clear">
									<input id="popOuterCreditLevel1" style="width:98px;" clear="clear">
								</div>
							</div>
							<div style="clear:both"></div>
							<center style="margin-top:40px">
								<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdatePopulation(1)">保存</a>
								<a class="easyui-linkbutton" onclick="$('#readonlyTruDlg').dialog('close')" iconcls="icon-cancel">关闭</a>
							</center>
						</div>
					</div>
				</div>
				<div title="能源卡号">
					<div class="clearfix" style="margin:5px 0 5px 10px;">
						<a class="easyui-linkbutton" plain="true" iconCls="icon-add-notice" onclick="addCard()">添加卡号</a>
						<a class="easyui-linkbutton" plain="true" iconCls="icon-edit-number" onclick="updateCard()">修改卡号</a>
						<a class="easyui-linkbutton" plain="true" iconCls="icon-edit-number" onclick="readingWindow()">修改抄表读数</a>
					</div>
					<legend style="padding:5px 0 0 10px;">能源卡号列表</legend>
					<div style="padding:5px 0 0 10px;width: 98%;">
						<table id="energyCardInfoTable"></table>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 抄表读数修改窗口 -->
		<div id="readingWindowDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true" >
			<input id="updateThsMeterReadingRecord" style="display:none">
			<div class="water">
					<div style='margin:10px 0 0 10px;float: left;'>
					<label>水读数：</label>
					上次结清：<input id="updateThsWaterVolLast" needs="1" style="width:80px">
					</div>
					<div style='margin:10px 0 0 10px;float: left;' >
						最新读数：<input id="updateThsWaterVolNew" needs="1" style="width:80px"  >
					</div>
			</div>
			
			<div style="clear:both"></div>
			
			<div class="elect">
				<div style='margin:10px 0 0 10px;float: left;'>
					<label>电读数：</label>
					上次结清：<input id="updateThsElectritVolLast" needs="1" style="width:80px">
				</div>
				<div style='margin:10px 0 0 10px;float: left;'>
					最新读数：<input id="updateThsElectritVolNew" needs="1" style="width:80px"  >
				</div>
			</div>
			
			<div style="clear:both"></div>
			
			<div class="gas">
				<div style='margin:10px 0 0 10px;float: left;'>
				<label>气读数：</label>
				上次结清：<input id="updateThsGasVolLast" needs="1" style="width:80px">
				</div>
				<div style='margin:10px 0 0 10px;float: left;'>
					最新读数：<input id="updateThsGasVolNew" needs="1" style="width:80px"  >
				</div>
			</div>
			
			<div class="hotwater">
				<div style='margin:10px 0 0 10px;float: left;'>
					<label>热水读数：</label>
					上次结清：<input id="updateThsHotWaterVolLast" needs="1" style="width:80px">
				</div>
				<div style='margin:10px 0 0 10px;float: left;'>
					最新读数：<input id="updateThsHotWaterVolNew" needs="1" style="width:80px"  >
				</div>
			</div>
			
			<div class="hotair">
				<div style='margin:10px 0 0 10px;float: left;'>
					<label>暖气读数：</label>
					上次结清：<input id="updateThsHotAirVolLast" needs="1" style="width:80px">
				</div>
				<div style='margin:10px 0 0 10px;float: left;'>
					最新读数：<input id="updateThsHotAirVolNew" needs="1" style="width:80px"  >
				</div>
			</div>
			
			<div style="clear:both"></div>
			<center style="margin-top:10px">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doCheckUpPower()">保存</a>
			</center>
		</div>
		
		<!-- 能源卡号的添加, 修改 -->
		<div id="addCardDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true" >
			<fieldset>
				<legend>卡号归属</legend>
				<input style="display:none" id='jdcnId'>
				<div style='margin:5px 0 0 2px;float: left;'>
					详细地址：
					<input style="width:200px" id="addAddress" readonly>
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 2px;float: left;' id='landNameDiv'>
					业主姓名：
					<input style="width:100px" id="landName" readonly>
				</div>
				<div style='margin:5px 0 0 2px;float: left;' id='landIdCardDiv'>
					身份证号：
					<input style="width:200px" id="landIdCard" readonly>
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 2px;float: left;' id='landTelDiv'>
					业主电话：
					<input style="width:100px" id="landTel" readonly>
				</div>
			</fieldset>
			<fieldset>
				<legend>卡号信息</legend>
				<div style="margin:5px 0 0 2px;float:left;position:relative;">
					&emsp;&emsp;类型：
					<select id="from" style="width:100px;" 
						onChange="javascript:document.getElementById('cardName').value=document.getElementById('from').options[document.getElementById('from').selectedIndex].value;">
						<option value="" style="color:#c2c2c2;">---请选择---</option>
						<option value="水卡">水卡</option>
						<option value="电卡">电卡</option>
						<option value="气卡">气卡</option>
						<option value="电视卡">电视卡</option>
					</select><input type="text" id="cardName" require="require"
						style="position:absolute;left:63px;width:80px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;">
				</div>
				<div style="margin:5px 0 0 2px; float:left;">
					<label for="cardNum">用户编号：</label>
					<input style="width:200px;" id="cardNum" require="require">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 2px; float:left;">
					<label for="cardPeople">&emsp;归属人：</label>
					<input style="width:100px;" id="cardPeople">
				</div>
				<div style="margin:5px 0 0 2px; float:left;">
					<label for="cardPeopleId">证件号码：</label>
					<input style="width:200px;" id="cardPeopleId">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 2px; float:left;">
					<label for="cardTel">&emsp;&emsp;电话：</label>
					<input style="width:100px;" id="cardTel">
				</div>
				<div style="margin:5px 0 0 2px; float:left;">
					<label for="jdcnMeterNumber">&emsp;&emsp;表号：</label>
					<input style="width:200px;" id="jdcnMeterNumber" require="require" >
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 2px; float:left;">
					<label for="cardBankName">银行名称：</label>
					<input style="width:100px;" id="cardBankName">
				</div>
				<div style="margin:5px 0 0 2px; float:left;">
					<label for="cardBank">银行卡号：</label>
					<input style="width:200px;" id="cardBank">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 2px; float:left;">
					<label for="cardRemark">&emsp;&emsp;备注：</label>
					<input style="width:366px;" id="cardRemark">
				</div>
			</fieldset>
			<center style="margin-top:10px">
				<div id="errorMsg" style="height:20px;color:red;"></div>
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addCardDlg')){doAddCard();$('#addCardDlg').dialog('open')}" id="addCardButton">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addCardDlg')){doUpdateCard()}" id="updateCardButton">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addCardDlg').dialog('close')">关闭</a>
			</center>
		</div>
		
		<!-- 修改业主合约 -->
		<div id="updateLandlordContractInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
			<fieldset>
				<legend>合约信息</legend>
				<div style="display:none;">
					<div style='margin:5px 0 0 2px;float: left;'>
						合约编号：<input style="width:80px;" class="jrlRenewalCoding">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						未租房源ID：<input style="width:80px;" class="jrlHouse4storeId">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						房东ID：<input style="width:80px;" class="jrlLandlordId">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						登记人ID：<input style="width:80px;" class="jrlUserId">
					</div>
					<div style='margin:5px 0 0 14px;float: left;'>
						部门ID：<input style="width:80px;" class="jrlDepartment">
					</div>
					<div style='margin:5px 0 0 14px;float: left;'>
						区域ID：<input style="width:80px;" class="jrlStorefront">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						合同性质：<select style="width:80px;" class="jrlContractType">
							<option></option>
						</select>
					</div>
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					合同期限：<select class="jrlTheTermYear" style="width:40px;"
						onchange="changeDate(1)">
						<%
							for (int i = 0; i < 11; ++i) {
								out.println("<option value='" + i + "'>" + i + "</option>");
							}
						%>
					</select> 年 <select class="jrlTheTermMonth" style="width:40px;"
						onchange="changeDate(1)">
						<%
							for (int i = 0; i < 12; ++i) {
								out.println("<option value='" + i + "'>" + i + "</option>");
							}
						%>
					</select> 月 <select class="jrlTheTermDay" style="width:40px;"
						onchange="changeDate(1)">
						<%
							for (int i = 0; i < 31; ++i) {
								out.println("<option value='" + i + "'>" + i + "</option>");
							}
						%>
					</select> 日
				</div>
				<div style='margin:5px 0 0 2px;float: left;display:none;'>
					合同期限：<input style="width:80px;" class="jrlTheTerm">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					开始时间：<input style="width:80px;" class="jrlBeginTime" onfocus="WdatePicker({dchanging:changeDate(1)})" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					到期时间：<input style="width:80px;" class="jrlEndTime" readonly="readonly"> <input style="display:none;" class="yifuEndTime">
				</div>
				<div style="clear:both;"></div>
				<div style='margin:5px 0 0 2px;float: left;'>
					缴费方式：<select style="width:60px;" class="jrlPaymentMethod">
						<option></option>
					</select>
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					签约时间：<input style="width:80px;" class="jrlSignedTime" onfocus="WdatePicker()">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					提前缴租天数：<input style="width:40px;" class="jrlInAdvancePay" type="number" min="0" max="99">
				</div>
				<!-- <div style='margin:5px 0 0 2px;float: left;'>
					免租天数：<input style="width:48px;" class="jrlRentFreeDays" type="number" min="0" max="99" onchange="clearRentFreeSegment();">
				</div> -->
				<div style="clear:both;"></div>
				<div style='margin:5px 0 0 2px;float: left;display:none;'>
					价格阶梯：<input style="width:250px;" class="jrlPriceLadder">
				</div>
				<div style='margin:5px 0 0 2px;float: left;display:none;'>
					免租期时段：<input style="width:250px;" class="jrlRentFreeSegment">
				</div>
			</fieldset>
			<div id="priceLadder">
				<fieldset>
					<legend>租金设置</legend>
					<div class="priceLadderDiv"></div>
				</fieldset>
				<fieldset>
					<legend>免租期设置</legend>
					<div class="rentFreeSegmentDiv"></div>
				</fieldset>
			</div>
			<center style="margin-top:10px">
				<div id="settingTips" style="height:20px;color:red;"></div>
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="checkSetting()">保存</a>
				<a class="easyui-linkbutton" onclick="$('#updateLandlordContractInfoDlg').dialog('close')" iconcls="icon-cancel">关闭</a>
			</center>
		</div>
		
		<!-- 修改租客合约 -->
		<div id="updateRenterContractInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
			<fieldset>
				<legend>合约信息</legend>
				<div style="display:none;">
					<div style='margin:5px 0 0 2px;float: left;'>
						合约编号：<input style="width:80px;" class="jrrRenewalCoding">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						已租房源ID：<input style="width:80px;" class="jrrHouse4rentId">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						未租房源ID：<input style="width:80px;" class="jrrHouse4storeId">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						租客ID：<input style="width:80px;" class="jrrRenterId">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						房东ID：<input style="width:80px;" class="jrrLandlordId">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						登记人ID：<input style="width:80px;" class="jrrUserId">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						部门ID：<input style="width:80px;" class="jrrDepartment">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						区域ID：<input style="width:80px;" class="jrrStorefront">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						合同性质：<select style="width:80px;" class="jrrContractType">
							<option></option>
						</select>
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						合同续约：<input style="width:80px;" class="jrrTheContract">
					</div>
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					合同期限：<select class="jrrTheTermYear" style="width:40px;"
						onchange="changeDate(0)">
						<%
							for (int i = 0; i < 11; ++i) {
								out.println("<option value='" + i + "'>" + i + "</option>");
							}
						%>
					</select> 年 <select class="jrrTheTermMonth" style="width:40px;"
						onchange="changeDate(0)">
						<%
							for (int i = 0; i < 12; ++i) {
								out.println("<option value='" + i + "'>" + i + "</option>");
							}
						%>
					</select> 月 <select class="jrrTheTermDay" style="width:40px;"
						onchange="changeDate(0)">
						<%
							for (int i = 0; i < 31; ++i) {
								out.println("<option value='" + i + "'>" + i + "</option>");
							}
						%>
					</select> 日
				</div>
				<div style='margin:5px 0 0 2px;float: left;display:none;'>
					合同期限：<input style="width:80px;" class="jrrTheTerm">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					开始时间：<input style="width:80px;" class="jrrBeginTime" onfocus="WdatePicker();" onchange="changeDate(0)" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					到期时间：<input style="width:80px;" class="jrrEndTime" readonly="readonly">
					<input style="display:none;" class="yishouEndTime">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 26px;float: left;">
					租金：<input style="width:80px;" class="jrrMoney" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">元/月
				</div>
				<div style='margin:5px 0 0 14px;float: left;'>
					租金缴费方式：<select style="width:60px;" class="jrrPaymentMethod">
						<option></option>
					</select>
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					签约时间：<input style="width:80px;" class="jrrSignedTime" onfocus="WdatePicker();">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 14px;float: left;">
					物管费：<input style="width:80px;" class="jrrManageCost" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">元/月
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					物管费缴费方式：<select style="width:60px;" class="jrrManagePayment">
						<option></option>
					</select>
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 14px;float: left;">
					服务费：<input style="width:80px;" class="jrrServerCost" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">元/月
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					服务费缴费方式：<select style="width:60px;" class="jrrServerPayment">
						<option></option>
					</select>
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 2px;float: left;'>
					<!-- 提前缴租天数：<input style="width:60px;" class="jrrInAdvancePay" type="number" min="0" max="99"> -->
					收租方式：按<select id="advanceMode" style="width:60px;" onchange="acquisitionOfRentDay();">
								<option value="1">自然月</option>
								<option value="2">整月</option>
							</select> 方式
							&nbsp;固定每月的 <input id="jrrInAdvancePay" type="number" style="width:25px" > 号收
							<select id="numberMode" style="width:50px;" >
								<option value="1">本月</option>
								<option value="2">次月</option>
							</select> 租金
				</div>
				<div style="clear:both"></div>
			</fieldset>
			<center style="margin-top:10px">
				<div id="settingRenterTips" style="height:20px;color:red;"></div>
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateRenterContract();">保存</a>
				<a class="easyui-linkbutton" onclick="$('#updateRenterContractInfoDlg').dialog('close')" iconcls="icon-cancel">关闭</a>
			</center>
		</div>
		
		<!-- 业主账单修改窗口 -->
		<div id="updateLandlordPaymentDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
			<div style='margin:5px 0 0 2px;float: left;'>
				金额：<input style="width:80px;" id="landlordJciMoney" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				状态：<select style="width:80px;" id="landlordJciState">
					<option value="待付">待付</option>
					<option value="已付">已付</option>
				</select>
			</div>
			<div style="clear:both"></div>
			<center style="margin-top:20px">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdatePayment(1)">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateLandlordPaymentDlg').dialog('close')">关闭</a>
			</center>
		</div>
		<!-- 租客账单修改窗口 -->
		<div id="updateRenterPaymentDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
			<div style='margin:5px 0 0 14px;float: left;'>
				租金：<input style="width:80px;" id="renterJciMoney" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">
			</div>
			<div style='margin:5px 0 0 38px;float: left;'>
				状态：<select style="width:80px;" id="renterJciState">
					<option value="待收">待收</option>
					<option value="已收">已收</option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 2px;float: left;'>
				物管费：<input style="width:80px;" id="renterJciManageCost" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				租赁服务费：<input style="width:80px;" id="renterJciServerCost" onkeyup="moneyKeyupFomat(this)" onblur="moneyBlurFomat(this)">
			</div>
			<div style="clear:both"></div>
			<center style="margin-top:20px">
				<a  class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdatePayment(0)">保存</a>
				<a  class="easyui-linkbutton" iconcls="icon-cancel"	onclick="$('#updateRenterPaymentDlg').dialog('close')">关闭</a>
			</center>
		</div>
		
		<!-- 跟进详细对话框 -->
		<div id="downFollowInfo" style="padding:6px" class="easyui-dialog" data-options="closed:true">
			<center>
				<table class="xwtable" style="margin-top:10px;">
					<tbody>
						<tr>
							<td>跟进时间：</td>
							<td colspan="3"><span id="readDownFollowjhfFollowTime"></span></td>
						</tr>
						<tr>
							<td>跟进人：</td>
							<td><span id="readDownFollowjhfUserName"></span></td>
							<td>跟进类型：</td>
							<td><span id="readDownFollowjhfPaymentWay"></span></td>
						</tr>
						<tr>
							<td>跟进归属：</td>
							<td colspan="3"><span id="readDownFollowjhfFollowBelong"></span></td>
						</tr>
						<tr>
							<td>跟进内容：</td>
							<td colspan="3" style="text-align:left"><span
								id="readDownFollowjhfFollowRemark"></span></td>
						</tr>
					</tbody>
				</table>
			</center>
		</div>
		
		<!-- 业绩受益人显示窗口 -->
		<div id="beneficiariesOfPerformanceDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
			<div id="rentAssTableDlv" style="width:100%;height:80%;">
				<div style="margin:0 0 5px 5px;float:left;">
					<a class="easyui-linkbutton" iconCls="icon-add-xiezhuren" plain="true" onclick="addAssistance(0)">添加出房业绩受益人</a>
				</div>
				<div style="margin:0 0 5px 5px;float:left;">
					<a class="easyui-linkbutton" iconCls="icon-xiezhuren" plain="true" onclick="updateAssistance(0)">修改出房业绩受益人</a>
				</div>
				<!--出房业绩受益人列表-->
				<table id="rentassistanceDg" class="easyui-datagrid" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
					<thead>
						<tr>
							<th field="assistType" width="10" align="center">类型</th>
							<th field="assistPeople" width="15" align="center">业绩受益人</th>
							<th field="assistBonus" width="10" align="center">比例（%）</th>
							<th field="assistState" width="10" align="center">状态</th>
							<th field="registerPeople" width="15" align="center">登记人</th>
							<th field="assistRegisterTime" width="20" align="center">登记时间</th>
						</tr>
					</thead>
				</table>
			</div>
			<div id="storeAssTableDlv" style="width:100%;height:80%;">
				<div style="margin:0 0 5px 5px;float:left;">
					<a class="easyui-linkbutton" iconCls="icon-add-xiezhuren" plain="true" onclick="addAssistance(1)">添加存房业绩受益人</a>
				</div>
				<div style="margin:0 0 5px 5px;float:left;">
					<a class="easyui-linkbutton" iconCls="icon-xiezhuren" plain="true" onclick="updateAssistance(1)">修改存房业绩受益人</a>
				</div>
				<!--存房业绩受益人列表-->
				<table id="storeassistanceDg" class="easyui-datagrid" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
					<thead>
						<tr>
							<th field="assistType" width="10" align="center">类型</th>
							<th field="assistPeople" width="15" align="center">业绩受益人</th>
							<th field="assistBonus" width="10" align="center">比例（%）</th>
							<th field="assistState" width="10" align="center">状态</th>
							<th field="registerPeople" width="15" align="center">登记人</th>
							<th field="assistRegisterTime" width="20" align="center">登记时间</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		
		<!-- 添加/修改业绩受益人 -->
		<div id="addAssistanceDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
			<fieldset>
				<legend>房源信息</legend>
				<div style='margin:5px 0 0 2px;float: left;'>
					协助类型：<input id="addAssistType" style="width:80px" disabled="disabled">
				</div>
				<input id="rentId" style="display:none;">
				<input id="storeId" style="display:none;">
				<div style="margin:5px 0 0 2px;float:left">
					详细地址：<input id="addAssistAddress" style="width:390px" readonly="readonly">
				</div>
			</fieldset>
			<fieldset>
				<legend>业绩受益人信息</legend>
				<div style="margin:10px 0 5px 10px;">
					&emsp;业绩受益人：<input id="addAssistanceStaffShowUserInfo" style="width:200px;cursor: pointer;" 
					readonly="readonly" class="choose_user_button" doFlag="addAssistanceStaff" doFun="" value="">
						<input id="addAssistanceStaffGetUserStoreId" type="hidden">
						<input id="addAssistanceStaffGetUserDetId" type="hidden">
						<input id="addAssistanceStaffGetUserId" type="hidden">
						<div id="addAssistanceStaffShowUserInfoDiv" style="display:none;"></div>
				</div>
				<!-- <div style='margin:5px 0 0 2px;float: left;'>
					&emsp;业绩受益人：<select style="width:80px" class="select-dept" id="addAssistanceDept" onchange="deptStaffChose('addAssistanceDept','addAssistanceStaff',0)">
						<option></option>
					</select>
					<select id="addAssistanceStaff" style="width:80px" onchange="getStore('addAssistanceStaff','addAssistanceStore')">
						<option></option>
					</select>
					<input id="addAssistanceStore" style="display:none">
				</div> -->
				<div style="margin:5px 8px 0 2px;float:left">
					&emsp;&emsp;比例：<input id="addAssistBonus" style="width:96px" type="number" min="1" max="100">%
				</div>
				<div style='margin:5px 0 0 2px;float: left;display:none;'>
					&emsp;录入人：<input class="add_installment_userName" style="width:130px;" />
					<input class="add_installment_userId" />
				</div>
				<div style='margin:2px 0 0 2px;float: left;'>
					<a class="easyui-linkbutton" iconcls="icon-xiezhuren" id='addAssistanceButton' onclick="addToDataGrid()"> 添加</a>
				</div>
			</fieldset>
			<div id="addAssistanceSaveDiv">
				<div id="addAssistanceTableDiv" style='margin:5px 0 5px 2px;width:99%;height:200px;'>
					<table id="addAssistanceTable"></table>
				</div>
				<center>
					<div class="errorMsg" style="height:20px;color:red;"></div>
					<a id="addBtn" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddAssistance()">保存</a>
					<a id="updateBtn" class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateAssistance()">保存</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addAssistanceDlg').dialog('close')">关闭</a>
				</center>
			</div>
		</div>
		
		<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
		<jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
		<script src="js/upload.js"></script>
	</body>
</html>