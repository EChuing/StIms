<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>房态图</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
</head>
	<style>
		html{
			overflow-y:hidden;
		}
		.BOX_1{
			margin-top:5px;
			width: 100%;
			height: 100%;;
			text-align: center;
			float: left;
			overflow: auto;

		}
		.BOX{
			margin-top:5px;
			margin-left:8px;
			overflow:hidden;
			border: 1px solid #666666;
			width: 175px;
			height: 230px;
			text-align: center;
			float: left;
			background: white;

		}
		.box_1{
			font-size:40px;
			font-family:"黑体";
			color:white;
		   	width:350px;
		    height: 120px;
		    border-radius: 0 0 50% 50%/0 0 100% 100% ;
		
		 	margin-left: -85px;
		  	margin-top: -60px;
		}


		.box_3 span{
			width: 175px;
			height: 40px;
			font-size: 20px;
			background: white;
			font-family: "黑体";
			font-weight: bold;
	
		
		}
		.box_5 span{
			width:175px;
			height: 40px;
			font-size:23px;
			background: white;
			font-weight:bold;
			color: #E63F00 ;
			font-family: "黑体";
		}
		.box_6 span{
			width: 175px;
			height: 40px;
			font-size: 20px;
			background: white;
			color: 	#666666;
		
		}
		.box_4 span{
			width:175px;
			height: 40px;
			font-size:20px;
			background: white;
			font-weight:bold;
			color: #E63F00 ;
			font-family: "黑体";
		}
		.circle{
			width: 40px;
			height: 40px;
			border-radius: 25px;
			margin-left: 70px;
			margin-top: -22px;
		}	
		.circle span{
			display:block;
			font-family:"黑体";
			font-size: 30px;
			text-align: center;
			color: white;
			padding-top: 2px;
		}
		.MPH{
			padding-top: 60px;
		}
		.MPH span{
			font-size: 35px;
		}
		.BOX_2 div{
	
			margin-top: 8px;
		}

		.Head{
			width: 100%;
			height: 80px;
			background: #F8F8F8;
		}
		.floor{
			text-align:center;
			font-size:20px;
			color:white;
			margin-left:7px;
			margin-top:5px;
			width:85px;
			height:30px;
			float: left;
			border:none;
			background:#5cb85c;
			border-radius: 6px 6px 6px 6px;
		}
	</style>

<body scroll="no">
	<input id="house" type="hidden" />
	<input id="payMoneyText" type="hidden">
	<datalist id="eventList">
	</datalist>
	<datalist id="checkInList">
	</datalist>
	<datalist id="checkInList1">
	</datalist>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'> 
	<div class="ShowCatalog" style="margin-left:5px;height: 26px">
	<a id="show1"  onclick="show(1)" style="margin:5px 0px 5px 0px;width:90px;font-size: 15px;" value="楼层">楼层筛选</a>
	<a id="show2"  onclick="show(2)" style="margin:5px 0px 5px 0px;width:90px;font-size: 15px;" value="其他筛选">其他筛选</a>
	
	</div>
	<div class="Head" ></div>
	<div class="Head2" style="display: none" >
	<div class="shortRentState" style="margin:10px 10px 5px 0;color:black;font-size:13px;float:left;">
		<input id="searchButtonState" type="hidden" value="">
		<button type="button" onclick="selectDoorId('ALL')" class="btn btn-success shortRentHouseDetails" style="margin:0 0 5px 5px;width:120px;" value="所有">所有客房<span class="Num0"></span></button>
		<button type="button" onclick="category(4)" class="btn btn-success shortRentHouseDetails" style="margin:0 0 5px 5px;width:120px;" value="空置未查">空置未查<span class="Num1"></span></button>
		<button type="button" onclick="category(0)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="干净空房">干净空房<span class="Num2"></span></button>
		<button type="button" onclick="category(1)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="保洁房间">保洁房间<span class="Num3"></span></button>
		<button type="button" onclick="category(2)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="维修房间">维修房间<span class="Num4"></span></button>
		<button type="button" onclick="category(5)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="当天抵达">当天抵达<span class="Num5"></span></button>
		<button type="button" onclick="category(6)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="当天预离">当天预离<span class="Num6"></span></button>
		<button type="button" onclick="category(7)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="当天预订">当天预订<span class="Num7"></span></button>
		<div style="clear:both"></div>
		<button type="button" onclick="category(8)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="欠款单客房">欠款单客房<span class="Num8"></span></button>
		<button type="button" onclick="category(9)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="预订客房">预订客房<span class="Num9"></span></button>
		<button type="button" onclick="category(10)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="保留客房">保留客房<span class="Num10"></span></button>
		<button type="button" onclick="category(11)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="停用客房">停用客房<span class="Num11"></span></button>
		<button type="button" onclick="category(12)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="内部客房">内部客房<span class="Num12"></span></button>
		<button type="button" onclick="category(13)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="普通客房">普通客房<span class="Num13"></span></button>
		<button type="button" onclick="category(14)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="钟点客房">钟点客房<span class="Num14"></span></button>
		<button type="button" onclick="category(15)" class="btn btn-success shortRent" style="margin:0 0 5px 5px;width:120px;" value="免费客房">免费客房<span class="Num15"></span></button>
	</div>
	</div>
	
	<div class="BOX_1" style="height:86%">

	</div>
		<!-- 点击事件触发框 -->
	<div id="checkOutDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="padding:3px;width:86px;height:98%;float:left;"><!-- background-color: #E0ECFF; -->
			<center id="checkOutDlgButton" style="margin:5px 0 0 2px;float:left;width:80px;height:98%;background-color: white;">
				<div style="margin:10px 0 0 0px;">
					<a id="clearA"  style="display:none;" class="easyui-linkbutton buttonState" plain="true" 
					onclick="cancel(0)"><img style="height:40px;width:40px" src="img/cancel.png" /><br>取消保留</a>
				</div>
				<div style="margin:20px 0 0 0px;">
			    	<a id="orderTaking"  class="easyui-linkbutton buttonState" plain="true" style="display:none;"
			    	onclick="openOrderTaking()"><img style="height:40px;width:40px" src="img/orderTaking.png" /><br>接单</a>
				</div>
				<div style="margin:10px 0 0 0px;">
					<a id="cancelA"  style="display:none;" class="easyui-linkbutton buttonState" plain="true" 
					onclick="cancel(1)"><img style="height:40px;width:40px" src="img/tuifangbanli.png" /><br>退定</a>
				</div>
				<div style="margin:20px 0 0 0px;">
					<a id="checkOut" style="display:none;" class="easyui-linkbutton buttonState" plain="true" 
					onclick="checkOut()"><img style="height:40px;width:40px" src="img/tuifangbanli.png" /><br>办理退房</a>
			    </div>
			    <div style="margin:20px 0 0 0px;">
			    	<a id="renewA"  style="display:none;" class="easyui-linkbutton buttonState" plain="true" 
			    	onclick="openRenew()"><img style="height:40px;width:40px" src="img/continued.png" /><br>续住</a>
			    </div>
			    <div style="margin:20px 0 0 0px;">
			    	<a id="changeHouse" style="display:none;" class="easyui-linkbutton buttonState" plain="true" 
			    	onclick="openChangeHouse(1)"><img style="height:40px;width:40px" src="img/change.png" /><br>换房</a>
			    </div>
			    <div style="margin:20px 0 0 0px;">
			    	<a id="checkInA"  style="display:none;" class="easyui-linkbutton buttonState" plain="true" 
			    	onclick="openCheckIn()"><img style="height:40px;width:40px" src="img/checkin.png" /><br>入住办理</a>
				</div>
				<div style="margin:20px 0 0 0px;">
			    	<a id="unsubscribe"  class="easyui-linkbutton buttonState" plain="true" style="display:none;"
			    	onclick="openUnsubscribe()"><img style="height:40px;width:40px" src="img/tuiding.png" /><br>退定审批</a>
				</div>
				 <div style="margin:20px 0 0 0px;">
			    	<a id="followUp"  class="easyui-linkbutton buttonState" plain="true" 
			    	onclick="openFollowUp()"><img style="height:40px;width:40px" src="img/followUp.png" /><br>写跟进</a>
				</div>
				<div style="margin:20px 0 0 0px;">
			    	<a id="oorCard"  class="easyui-linkbutton buttonState" plain="true" 
			    	onclick="doorCardManagement()"><img style="height:40px;width:40px" src="img/doorCard.png" /><br>门卡管理</a>
				</div>
				<div style="margin:20px 0 0 0px;">
			    	<a id="purchaseHistory"  class="easyui-linkbutton buttonState" plain="true" style="display:none;"
			    	onclick="openPurchaseHistory()"><img style="height:40px;width:40px" src="img/purchaseHistory.png" /><br>消费记录</a>
				</div>
			</center>
		</div>
		
		<div style="background-color: #E0ECFF; height:100%;width:5px;float:left"></div>
		<div style="float:left">
			<!-- <fieldset>
				<legend>客户信息</legend> -->
			<div id="customerInfo" style="margin:10px 0 0 10px;float:left">
				<input id="jsrcHsId" type="hidden" clear="clear"/>
				<input id="jsrcArrears" type="hidden" clear="clear"/>
				<input id="jsrcId" type="hidden" clear="clear"/>
				<input id="jsrcState" type="hidden" clear="clear"/>
				<input id="jsrcRenterId" type="hidden" clear="clear"/>
				<input id="jsrcFollow" type="hidden" clear="clear"/>
				<input id="popName" type="hidden" clear="clear"/>
				<input id="jsrcAdditionalDescription" type="hidden" clear="clear"/>
				<input id="jsrcAdditionalCost" type="hidden" clear="clear"/>
				<input class="hsRoomType" type="hidden" clear="clear"/>
				<input id="jsrcOrderNum" type="hidden" clear="clear"/>
				<input id="jsrcFirstPay" type="hidden" clear="clear"/>
				<input id="jsrcTotalPrice" type="hidden" clear="clear"/>
				<input id="jsrcDepositPayType" type="hidden" clear="clear"/>
				<input id="jsrcSaleNo" type="hidden" clear="clear"/>
				<input id="popId" type="hidden" clear="clear"/>
				<input id="jppPlanPackage" type="hidden" clear="clear"/>
				<div style="margin:5px 5px 0 0;float:left">
					客户姓名：<input id="popCustomerName" readonly="readonly" style="width:100px" clear="clear">
				</div>
				<div style="margin:5px 5px 0 11px;float:left;">
					手机号：<input id="popTelephone" readonly="readonly" style="width:100px" clear="clear">
				</div>
				<div style="margin:5px 0 0 24px;float: left;">
					备注：<input id="popNameRemarks" readonly="readonly" style="width:100px" clear="clear">
				</div>
				<div style="clear:both;"></div>
				<div style="margin:10px 4px 0 0;float:left;">
					证件号码：<input id="popIdCard" readonly="readonly" style="width:100px" clear="clear">
				</div>
				<div style='margin:10px 0 0 0;float: left;'>
					证件类型：<input id="popIdcardType"  style="" choose="choose">

				</div>
				<div style='margin:10px 0 0 29px;float: left;'>
					生日：<input id="popBirth" style="width:100px;" readonly="readonly"  clear="clear">
				</div>
				<div style="clear:both;"></div>
				<div style='margin:10px 0 0 0;float: left;'>
					户籍地址：<input id="popIdcardAddress" readonly="readonly" style="width:264px" clear="clear">
				</div>
				<div style='margin:10px 0 0 29px;float: left;'>
					民族：<input id="popNation" readonly="readonly" style="width:100px" clear="clear">
				</div>
				<div style="clear:both;"></div>
				<div style='margin:10px 0 0 0;float: left;'>
					入住次数：<input id="checkInNum1" readonly="readonly" style="width:43px" clear="clear">
				</div>
				<div id="cusType" style="margin:6px 0 0 5px;float: left;">
					<div style="margin:5px 0 0 0;float: left;" >渠道类型：</div>
					<div style="margin:5px 0 0 5px;float: left;">
						<input type="radio" readonly="readonly" name="customerType"  data-type="门店" class="userType" value="门店">门店</input>
					</div>
					<div style="margin:5px 0 0 5px;float: left;">
						<input type="radio" readonly="readonly" name="customerType"  data-type="会员" class="userType" value="会员">会员</input>
					</div>
					<div style="margin:5px 0 0 5px;float: left;">
						<input type="radio" readonly="readonly" name="customerType"  data-type="协议单位" class="userType" value="协议单位">协议单位</input>
					</div>
				</div>
				<div style='margin:10px 0 0 11px;float:left;'>
					群体分类：<input id="popGroupType" readonly="readonly" clear="clear" require="require">
					</select>
				</div>
				<div style="clear:both;"></div>
				<div style='margin:10px 0 0 0;float:left;'>
					价格方案：<input id="popPricePlan" style="width:264px;text-align:center;" clear="clear" readonly="readonly">
				</div>
				<div style='margin:10px 0 0 5px;float:left;'>
					允许挂账：<input id="popAllowCredit" style="width:100px" clear="clear" readonly="readonly" />
				</div>
				<div style="clear:both;"></div>
				<div id="popMaxCreditDiv" style='margin:10px 0 0 0;float:left;'>
					挂账额度：<input id="popMaxCredit" readonly="readonly" clear="clear">
				</div>
				<div class="popMemberLevelDiv" style='margin:10px 0 0 5px;float:left;'>
					会员级别：<input id="popMemberLevel" style="text-align: center;" readonly="readonly" clear="clear">
				</div>
			</div>
				<div style="margin:15px 0 0 5px;float: left;">
					<img width="108px" height="126px" src="images/userImage.png;" style="margin-left:5px" id="id_img_pers" clear="clear">
				</div><!-- images/userImage.png -->
			<!-- </fieldset> -->
			
			<div style="clear:both;"></div>
			<div style="float:left">
				<!-- <fieldset>
					<legend>合约信息</legend> -->
						<div style="margin:25px 0 0 10px;float:left;">
							<div style="clear:both"></div>
							<div style="float: left;margin:0 5px 5px 0">
								预订时间：<input readonly="readonly"  id="jsrcBeginTime"  style="width:100px;" clear="clear"/>
							</div>
							<div style="float: left;margin:0 15px 5px 0">
								退房时间：<input readonly="readonly"  id="jsrcEndTime"  style="width:100px;" clear="clear"/>
							</div>
							<div style="float: left;margin:0 0 5px 0">
								总天数：<input readonly="readonly"  id="jsrcTotalDays"  style="width:100px;" clear="clear"/>
							</div>
							<div style="clear:both"></div>
							<div style="float: left;margin:5px 5px 0 0">
								日均价格：<input readonly="readonly"  id="jsrcDailyPrice"  style="width:100px;" clear="clear"/>
							</div>
							<div style="float: left;margin:5px 3px 0 0">
								客房押金：<input readonly="readonly" id="jsrcDeposit"  style="width:100px;" clear="clear"/>
							</div>
							<div style="float: left;margin:5px 0 0 0">
								订单来源：<input  style="width:100px;" id="jsrcOrderSource"clear="clear"/>
							</div>
							<div style="clear:both"></div>
							<div style="float: left;margin:10px 5px 0 0">
								付款方式：<input readonly="readonly" id="jsrcPaymentMethod" style="width:100px;" clear="clear"/>
							</div>
							<div style="float: left;margin:10px 3px 0 0">
								入住时间：<input readonly="readonly" id="jsrcActualOccupancyTime" style="width:100px;" clear="clear"/>
							</div>
							<div style="float: left;margin:10px 0 0 0">
								退房时间：<input readonly="readonly" id="jsrcActualDepartureTime" style="width:100px;" clear="clear"/>
							</div>
							<div style="clear:both"></div>
							<div style="float: left;margin:10px 4px 0 12px">
								总房价：<input readonly="readonly" id="jsrcAmountPayable"  style="width:100px;" clear="clear"/>
							</div>
							<div style="float: left;margin:10px 4px 0 0">
								总共金额：<input readonly="readonly" id="totalPrice1" style="width:100px;" clear="clear"/>
							</div>
							<div style="float: left;margin:10px 0 0 0">
								折后金额：<input readonly="readonly" id="amountOfDiscount" style="width:100px;" clear="clear"/>
							</div>
							<div style="clear:both"></div>
							<div style="margin:10px 4px 0 0px;float:left;">
								入住类型：<input readonly="readonly" id="jsrcTypeOccupancy" style="width:100px;" clear="clear"/>
							</div>
							<div style="margin:10px 4px 0 0px;float:left;">
								<a style="float:left;margin:10px 0 0 33px;display:none" class="discountApplication">
									<button class="easyui-linkbutton" iconcls="icon-add">折扣申请</button>
								</a>
							</div>
							<div style="float: left;margin:10px 0 0 0px">
								订单备注：<input readonly="readonly" id="jsrcRemarks" style="width:264px;" clear="clear"/>
							</div>
						</div>
				<!-- </fieldset> -->
			</div>
			<div style="clear:both"></div>
			<div style="margin:50px 10px 0 10px;">
				<table id="followDg" style="width:100%;height:177px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
					<thead>
						<tr>
							<th field="registrantName" width="10" align="center">操作人</th>
							<th field="type" width="10" align="center">类型</th>
							<th field="time" width="20" align="center">时间</th>
							<th field="text" width="40" align="center">操作</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		
		<div style="background-color: #E0ECFF; height:100%;width:5px;float:left;margin:0 0 0 6px;"></div>
		<div style="float:left;width:300px">
			<div style="clear:both"></div>
			<div style="margin:0 0 0 7px;">
				<table id="customerInformation" style="width:100%;height:177px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
					<thead>
						<tr>
							<th field="popName" width="10" align="center" clear="clear">同住人姓名</th>
							<th field="popIdcard" width="15" align="center" clear="clear">证件号码</th>
						</tr>
					</thead>
				</table>
			</div>
			
			<div style="background-color: #E0ECFF; height:5px;width:100%;float:left;margin:10px 0 0 0;"></div>
			<div style="margin:10px 0 0 18px;float:left;" id="deviceDiv ">
				<center id="checkOutDlgButton" style="margin:5px 0 0 2px;float:left;background-color: white;">

					<div style="margin:0 0 0 0;float:left;" id="airconditionDiv" title="该房尚未绑定相关设备">
						<a id="aircondition" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/ic_dt_aircondition_icon_gray.png"/></a>
					</div>
					<div style="margin:0 0 0 10px;float:left;" id="doorLockDiv" title="该房尚未绑定相关设备">
						<a id="doorLock" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/doorLock_gray.png" /></a>
					</div>
					<div style="margin:0 0 0 10px;float:left;"id="doorCardDiv" title="该房尚未绑定相关设备">
						<a id="doorCardState" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/baka.png" /></a>
					</div>
					<div style="margin:10px 0 0 0;float:left;"id="curtainDiv" title="该房尚未绑定相关设备">
						<a id="curtain" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/ic_dt_curtain_icon_gray.png" /></a>
					</div>
					<div style="margin:10px 0 0 10px;float:left;" id="sosDiv" title="该房尚未绑定相关设备">
						<a id="sos" class="easyui-linkbutton" plain="true"><img style="height:70px;width:70px" src="img/ic_dt_safe_sos_icon_gray.png" /></a>
					</div>
					<div style="margin:10px 0 0 10px;float:left;"id="safeDoorbellDiv" title="该房尚未绑定相关设备">
						<a id="safeDoorbell" class="easyui-linkbutton" plain="true" ><img style="height:70px;width:70px" src="img/ic_dt_safe_doorbell_icon_gray.png" /></a>
					</div>
			</center>
			</div>
			<div style="background-color: #E0ECFF; height:5px;width:100%;float:left;"></div>
			<div style="font-size:32px;text-align:center">客户提醒服务</div> 
			<div style="clear:both"></div>
			<div style="margin:0 0 0 7px;">
				<table id="remind" style="width:100%;height:177px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
					<thead>
						<tr>
							<th field="remindTime" width="15" align="center">提醒时间</th>
							<th field="remindContent" width="25" align="center">提醒内容</th>
							<th field="state" width="10" align="center">状态</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
	<!-- 退房 -->
	<div id="checkOutDiv" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		<!-- <div style="border:dashed 1px #95b8e7;width: 100%;height:100px;"> -->
			<div style="width:200px;padding:10px 10px 10px 0;">
			保洁人员：<input id="searchgerShowUserInfo" class="choose_user_button" doFlag="searchger" doFun=""
				style="width:120px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
				<input id="searchgerGetUserStoreId" type="hidden" clear="clear">
				<input id="searchgerGetUserDetId" type="hidden" clear="clear">
				<input id="searchgerGetUserId" type="hidden" clear="clear">
				<div id="searchgerShowUserInfoDiv" style="display:none;" clear="clear"></div>
			</div>
		<!-- </div> -->
		<div style="clear:both"></div>
		
		<div style="border:dashed 1px #95b8e7;width: 100%;height:70px;margin-top:20px;">
			<input id="oldRefundedMoney" type="hidden" clear="clear" />
			<input id="doMoveOutType" type="hidden" clear="clear" />
			<div id="additionalDescriptionDiv" style="float:left;margin:10px 0 0 8px">
				附加消费： <select id="additionalDescription" style="width:100px;"onclick="openService()">
						</select>
			</div>
			<div id="additionalCostDiv"  style="float:left;margin:10px 0 0 8px">
				附加单价：<input id="additionalCost"style="width:100px;" clear="clear" readonly="readonly"/>		
			</div>
			
			<div style="float:left;margin:8px 0 0 20px">
				<a class="easyui-linkbutton" iconcls="icon-add" onclick="addService1()">添加</a>
			</div>
			<div style="clear:both"></div>
			<div id="amountOfArrearsDiv"  style="float:left;margin:5px 0 0 11px;color:#f40707;">
				欠费金额：<input id="amountOfArrears" onkeyup="computeCheckOutFee()" type="number" style="width:100px; color:#f40707;" clear="clear"/>		
			</div>
			<div id="additionalSumDiv"  style="float:left;margin:5px 0 0 8px">
				附加金额：<input id="additionalSum" style="width:100px;" value="0" readonly="readonly" clear="clear"/>		
			</div>
			<div id="totalSumDiv"  style="float:left;margin:5px 0 0 20px">
				消费金额：<input id="totaSum"style=" width:100px;" clear="clear" readonly="readonly"/>	
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="border:dashed 1px #95b8e7;width: 100%;height:40px;margin-top:20px;">
			<div id="checkOutDepositDiv" style="float:left;margin:10px 0 0 8px">
				客房押金： <input id="checkOutDeposit" style="width:100px;" clear="clear" readonly="readonly">
			</div>
			<div id="refundedRentMoneyDiv" style="float:left;margin:10px 0 0 8px">
				应退房费： <input id="refundedRentMoney" style="width:100px;" clear="clear" readonly="readonly">
			</div>
			<div id="refundedMoneyDiv"  style="float:left;margin:10px 0 0 8px">
				应退金额：<input id="refundedMoney"style="width:100px;" clear="clear" readonly="readonly"/>		
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="margin-top:20px;">
			<table style="margin:30px 0 0 20px"  id="serviceCharge1"></table>
		</div>
		<!-- <div style="text-align:center;margin:20px 0 0 0;">
			<a id="doCheckoutShortRent" class="easyui-linkbutton" iconCls="icon-save" onclick="openCheckOutBill()">确定</a> 
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#checkOutBill').dialog('close')">取消</a>
		</div> -->
		<center id="refundType0" style="display:none;text-align:center;margin:10px 0 0 0;" class="hiddenButton">
			<button id="normalCheckout0" class="btn btn-success hiddenButton" type="button" style="display:none" onclick="checkOutShortRent(0,5,2)">现金退款</button>
			<button id="normalCheckout1" class="btn btn-success hiddenButton" type="button" style="display:none" onclick="checkOutShortRent(0,4,2)">原路返还</button>
		</center>
		<center id="refundType1" style="text-align:center;display:none;margin:10px 0 0 0" class="hiddenButton">
			<button id="advanceCheckoutType0" class="btn btn-success hiddenButton" type="button" style="display:none" onclick="checkOutShortRent(1,5,2)">现金退款</button>
			<button id="advanceCheckoutType1" class="btn btn-success hiddenButton" type="button" style="display:none" onclick="checkOutShortRent(1,4,2)">原路返还</button>
		</center>
		<div id="doMoveOut0" style="dispaly:none;text-align:center" class="hiddenButton">
			<button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:10px 0 5px 75px;width:120px;" onclick="openCash(1,3,2)">现金收银</button>
			<button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCash(2,3,2)">扫码收银</button>
			<button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCash(3,3,2)">台卡收银</button>
		</div>
		<div id="doMoveOut1" style="dispaly:none;text-align:center" class="hiddenButton">
			<button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:10px 0 5px 75px;width:120px;" onclick="openCash(1,4,2)">现金收银</button>
			<button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCash(2,4,2)">扫码收银</button>
			<button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:10px 0 5px 20px;width:120px;" onclick="openCash(3,4,2)">台卡收银</button>
		</div>
	</div>
	<div id="printDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div id="dlg-toolbar">
			<input type="hidden" id="print_index">
			<table cellpadding="0" cellspacing="0" style="width:100%">
				<tr>
					<td>
						<a href="#" class="easyui-linkbutton" iconCls="icon-print" plain="true" onclick="window.printFrame.print()">打印票据</a>
						<a href="#" class="easyui-linkbutton" iconCls="icon-up" plain="true" onclick="laterOrNext(0)">上一条</a>
						<a href="#" class="easyui-linkbutton" iconCls="icon-down" plain="true" onclick="laterOrNext(1)">下一条</a>
					</td>
				</tr>
			</table>
			<iframe id="printFrame" name="printFrame" style="width:100%;height:570px">
			</iframe>
		</div>
	</div>
	<!-- 换房 -->
	<div id="changeHouseDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		<div style="float:left;margin:10px 0 0 12px">
			现住客房：<input readonly="readonly"  id="nowHouse" style="width:150px;text-align:center"/>
		</div>
		<div style="float:left;margin:10px 0 0 12px">
			换房原因：<input  id="Reason" style="width:150px;text-align:center" clear="clear"/>
		</div>
		<div style="clear:both"></div>
		
		<div style="float:left;margin:10px 0 0 12px">
			可选房型：<select id="choiceHouseType" style="width:150px;text-align:center" onchange="choiceHouseType()">
			</select>
		</div>
		<div style="float:left;margin:10px 0 0 12px">
			可换客房：<select id="canChangeHouseList"  style="width:150px;text-align:center" onchange="changeHouseMoney()" >
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 12px">
			补房差价：<input  id="changeHouseMoney" onblur="checkChangeHouseMoney()" type="number" value="0" style="width:150px;text-align:center" clear="clear"/>
		</div>
		<div style="clear:both"></div>
		<center class="hiddenClass" id="repayMoneyChangeHouseOpenClean" style="margin:25px 0 0 0;display:none;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="openClean(0,0)">确认</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#changeHouseDlg').dialog('close')">关闭</a>
		</center>
		<center class="hiddenClass" id="repayMoneyChangeHouse" style="margin:25px 0 0 0;display:none;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doChangeHouse(0)">确认</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#changeHouseDlg').dialog('close')">关闭</a>
		</center>
		
		<div class="hiddenClass" id="changHouseOpenClean" style="display:none;text-align:center">
			<button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:20px 0 5px 30px;width:120px;" onclick="openCash(1,6,2)">现金收银</button>
			<button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:20px 0 5px 20px;width:120px;" onclick="openCash(2,6,2)">扫码收银</button>
			<button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:20px 0 5px 20px;width:120px;" onclick="openCash(3,6,2)">台卡收银</button>
		</div>
		<div class="hiddenClass" id="directChangeHouse" style="display:none;text-align:center">
			<button type="button" class="openCashBtn1 btn btn-success" style="float:left;margin:20px 0 5px 30px;width:120px;" onclick="openCash(1,7,2)">现金收银</button>
			<button type="button" class="openCashBtn2 btn btn-success" style="float:left;margin:20px 0 5px 20px;width:120px;" onclick="openCash(2,7,2)">扫码收银</button>
			<button type="button" class="openCashBtn3 btn btn-success" style="float:left;margin:20px 0 5px 20px;width:120px;" onclick="openCash(3,7,2)">台卡收银</button>
		</div> 
	</div>
	
	<!-- 写跟进 -->
	<div id="followUpDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		<div style="float:left;margin:5px 0 0 35px">
			类型：<select id="followUpType" onclick="followUpType()">
			<option>手动跟进</option>
			<option>客服提醒</option>
			</select>
		</div>	
		<div style="clear:both"></div>
		<div style="float:left;margin:5px 0 0 0" id="RecordDiv">
		<div style='margin:5px 0 0 35px;float: left;'>操作：</div>
			<textarea id="Record" style="width:250px;height:60px"></textarea>
		</div>
		<div style="float:left;margin:5px 0 0 11px" id="reminderTimeDiv">
			提醒时间：<input id="reminderTime" type="text" class="Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
		</div>
		<div style="float:left;margin:5px 0 0 11px" id="reminderContentDiv">
		<div style='margin:5px 0 0 0;float: left;'>提醒内容：</div>
			<textarea id="reminderContent" style="width:250px;height:60px"></textarea>
		</div>
		
		<div style="clear:both"></div>
		<center style="margin:25px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="operation()">确认</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#followUpDlg').dialog('close')">取消</a>
		</center>
	</div>
	
	<!-- 旧的跟进记录数据 -->
	<input id="oldreminder" type="hidden"  readonly="readonly" style="width:200px;text-align:center"/>
	<div id="customerService" style="padding:6px;text-align:center;"  class="easyui-dialog" data-options="closed:true">
		<div style="float:left;margin:10px 0 0 35px">
			类型：<input id="typetwo" clano="clano" readonly="readonly" style="width:200px;text-align:center"/>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 25px">
			操作人：<input id="operator" clano="clano" readonly="readonly" style="width:200px;text-align:center"/>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 35px">
			状态：<input id="state" clano="clano" readonly="readonly"  style="width:200px;text-align:center" />
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 12px">
			提醒时间：<input  id="remindTime" clano="clano" readonly="readonly"  style="width:200px;text-align:center"/>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 12px">
			提醒内容：<textarea id="remindContent" clano="clano" readonly="readonly" style="height:90px;width:200px"></textarea>
		</div>
		<div style="clear:both"></div>
		<center style="margin:25px 0 0 0;">
		<a class="easyui-linkbutton" iconcls="icon-edit" id="functionHeid" onclick="reminderFunction()">提醒</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#customerService').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 续住 -->
	<div id="renewDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		<div style="float:left;margin:10px 0 0 10px">
			退房时间 ： <input readonly="readonly"  id="oldEndTime"  style="width:120px;"/>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			新退房时间 ： <input class="Wdate" id="newEndTime" style="width:120px" clear="clear" require="require" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'jsrcEndTime\',{d:1});}',dateFmt:'yyyy-MM-dd ' + setUp.jsrsuCheckOutTime+':00',autoPickDate:true,dchanging:changeEndTime()})">
		</div>
		<div style="clear:both"></div>
		<div id="description"></div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 10px">
			总共天数 ： <input readonly="readonly"  id="newTotalDay"  style="width:120px;"/>
		</div>
		<div style="float:left;margin:10px 0 0 22px">
			日均价格 ： <input onblur="changPrice()"  id="jsrcDailyPrice1" style="width:120px;"/>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 10px">
			客房费用 ： <input readonly="readonly" id="sunMoney"  style="width:120px;"/>
		</div>
		<div style="float:left;margin:10px 0 0 22px">
			应付金额 ： <input readonly="readonly" id="payableMoney"  style="width:120px;"/>
		</div>
		<div style="clear:both"></div>
		<!-- <center style="margin:25px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doRenew()">确认</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#renewDlg').dialog('close')">取消</a>
		</center> -->
		<div id="doRenew" style="dispaly:flex;text-align:center">
			<button type="button" class="openCashBtn1 btn btn-success" style="margin:20px 10px 0 0px;width:120px;" onclick="openCash(1,5,2)">现金收银</button>
			<button type="button" class="openCashBtn2 btn btn-success" style="margin:20px 10px 0 0px;width:120px;" onclick="openCash(2,5,2)">扫码收银</button>
			<button type="button" class="openCashBtn3 btn btn-success" style="margin:20px 10px 0 0px;width:120px;" onclick="openCash(3,5,2)">台卡收银</button>
		</div>
	</div>
	<!-- 收款页面 -->
		<div id="openCashDlg" class="easyui-dialog" data-options="closed:true" style="text-align:center">
		<div class="cash qrCodeCustomer" style="margin:10% 0 0 27%">
			<div id="receivables" style="font-size:25px;float:left;">应收：</div>
			<div id="orderMoney" style="font-size:25px;float:left"></div>
			<div style="font-size:25px;float:left">元</div>	
		</div>
		<div style="clear:both"></div>
		<div class="cash qrCode" style="margin:5% 0 5% 0">
			<input id="moneyInput" type="number" onkeyup="changMoney()" style="width:300px;height:35px;border-radius:5px;font-size:20px;text-align:center" placeholder="" />
		</div>
		<div style="clear:both"></div>
		<div class="cash" style="margin:0 0 0 27%">
			<div style="font-size:25px;float:left">找零：</div>
			<div id="changeMoney" style="font-size:25px;float:left">0.00</div>
			<div style="font-size:25px;float:left">元</div>
		</div>
		<div style="margin:23% 0 0 0" >
			<button id="payType" type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" onclick="doCash(1)">现金收银</button>
		</div>
	</div>
	<!-- 保洁 -->
	<div id="cleanDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		保洁人员：<input id="searchCleanManagerShowUserInfo" class="choose_user_button" doFlag="searchCleanManager" doFun=""
			style="width:120px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
		<input id="searchCleanManagerGetUserStoreId" type="hidden" clear="clear">
		<input id="searchCleanManagerGetUserDetId" type="hidden" clear="clear">
		<input id="searchCleanManagerGetUserId" type="hidden" clear="clear">
		<div id="searchCleanManagerShowUserInfoDiv" style="display:none;" clear="clear"></div>
		<div style="clear:both"></div>
		<!-- <div id="hopeTime" style="margin:10px 0 0 0;margin-left:-1px;">
		期望时间：<select class="repair_hope_select" style="width:120px;" onChange="hopeTimeVal()" choose="choose">
				<option></option>
			</select>
			<input id="repair_hope_time" style="margin-left:-124px;width:100px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;" clear="clear" require="require">
		</div> -->
		<div id="hopeTime" style="margin:10px 0 0 0;">
			期望时间：<input id="cleanRepHopeTime" style="width:120px" clear="clear" require="require"
					onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchHouseEnd\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,})">
		</div>
		<center style="margin:25px 0 0 0;">
			<a id="doChangeHouse" class="easyui-linkbutton" iconcls="icon-save" onclick="doChangeHouse(1)">确认</a>
			<a id="doSetDirtyRoom" class="easyui-linkbutton" iconcls="icon-save" onclick="batchAddition(1)" style="display: none">确认</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#cleanDlg').dialog('close')">取消</a>
		</center>
	</div>
	 <!-- 快速入住 -->
    <div id="handle1" class="easyui-dialog" data-options="closed:true">
		<div style="font-size: 14px;width:100%;margin:20px 0 0 0;text-align:center">
			<input id="quickCheckIn" onchange="clickClear()" list="checkInList" clear="clear" style="width:400px;height:35px;border-radius:5px" 
			clear="clear" placeholder="  请输入   保留/预定房间号   预定手机号码" />
		</div>
		<div style="font-size: 14px;text-align:center;width:100%;margin:20px 0 0 0;">
			<div>
				<select id="fastCheckInHomeType" onchange="checkInRoomNum()"style="height:35px;border-radius:5px" clear="clear">
				</select>
				<input id="quickCheckIn1" list="checkInList1" clear="clear" style="margin:0 0 0 5px;width:290px;height:35px;border-radius:5px" placeholder="  无保留/预约订单  请选择房间类型" />
			</div>
		</div>
		
		<div id="checkInRoomNum" style="margin:0 0 0 0;text-align:center;width:100%;font-size:14px;margin-top:10px;"></div>
		<div style="font-size: 14px;text-align:center;width:100%;margin:40px 0 0 0">
			<button id="keyButtonId" type="button" onclick="checkInKey()" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;">快速入住</button>
		</div>
		
	</div>
	<!-- 办理入住详情窗口 -->
	<div id="checkInDlg1" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true,buttons:'#bottomButton'">
		<div id="bottomButton">
			<a class="easyui-linkbutton" onclick="authorizationManagement()" iconcls="icon-save">授权管理</a>
		</div>
		<input id="jsrcHsIdtwo" type="hidden" />
		<input id="retainEndTime" type="hidden" />
		<input class="hsRoomType" type="hidden" />
		<input class="jcuId" type="hidden" />
		<input id="hsAddCommunity" type="hidden"/>
		<input class="jcuPricePlanId" type="hidden" />
		<ipput id="doorCardJson" type="hidden"/>
		<div style="float:left">
			<div style="margin:5px 0 0 10px;float:left;">
				渠道类型：<select style="width:100px;" class="channelType" id="channelType" disabled="disabled"
							 onchange="getChannelInfo('checkInDlg1',0)" clear="clear" require="require">
				<option></option>
				<option>会员</option>
				<option>门店</option>
				<option>协议单位</option>
			</select>
			</div>
			<div style='margin:5px 0 0 10px;float:left;'>
				群体分类：<select class="groupType" id="groupType" disabled="disabled"
							 onchange="getHighestLevelPlan('checkInDlg1',0)" clear="clear" require="require">
			</select>
			</div>
			<div style='margin:5px 0 0 10px;float:left;'>
				价格方案：<input class="pricePlan" id="pricePlan" style="width:208px;text-align:center;" clear="clear" readonly="readonly">
			</div>
			<div style="clear:both"></div>
			<div style='margin:10px 0 0 10px;float:left;'>
				允许挂账：<input class="allowCredit" id="allowCredit" style="width:100px" clear="clear" readonly="readonly" />
			</div>
			<div class="maxCreditDiv" style='margin:10px 0 0 10px;float:left;'>
				挂账额度：<input class="maxCredit" id="maxCredit" data-type="money" readonly="readonly">
			</div>
			<div class="memberLevelDiv" style='margin:10px 0 0 10px;float:left;display:none'>
				会员级别：<input class="memberLevel" id="memberLevel" style="text-align: center;" readonly="readonly" clear="clear">
			</div>
			<div class="becomeVipDiv" style='margin:10px 0 0 10px;float:left'>
				<input type="checkbox" onclick="becomeVip()" id="becomeVip">成为会员
			</div>
			<div style="clear:both;"></div>
			<!-- 客人信息 -->
			<div id="renterInfo" style="float:left;margin:5px 0 0 10px">
				<div>
					<input class="clientSex" style="display: none;" clear="clear">
					<input class="clientPopIdcardJson" type="hidden" clear="clear">
				</div>
				<div style="margin:5px 10px 0 0;float:left">
					客户姓名：<input id="popCustomerNameTable" onchange="changeRenterInfo()" list="listPopCustomer" class="clientName" style="width:100px" clear="clear">
				</div>
				<div style="margin:5px 10px 0 11px;float:left;">
					手机号：<input id="popTelephoneTable" class="clientPhone" style="width:100px" clear="clear" type="number">
				</div>
				<div style="margin:5px 0 0 24px;float: left;">
					备注：<input id="popNameRemarkTable" id="popNameRemarkTable" class="clientNameRemarks" style="width:100px" clear="clear">
				</div>
				<div style="clear:both;"></div>
				<div style="margin:10px 9px 0 0;float:left;">
					证件号码：<input onblur="manualInput()" id="popIdcardTable" class="clientIdcard" style="width:100px" clear="clear">
				</div>
				<div style='margin:10px 0 0 0;float: left;'>
					证件类型：<select id="pop_idcard_type" style="" choose="choose" clear="clear">
					<option value="身份证/临时身份证/户口本">身份证/临时身份证/户口本</option>
					<option value="回乡证/护照">回乡证/护照</option>
					<option value="其他">其他</option>
				</select>
				</div>
				<div style='margin:10px 0 0 34px;float: left;'>
					生日：<input id="popBirthTable" class="clientBirth" style="width:100px;" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
				</div>
				<div style="clear:both;"></div>
				<div style='margin:10px 0 0 0;float: left;'>
					户籍地址：<input id="popIdcardAddressTable" class="clientIdcardAddress" style="width:269px" clear="clear">
				</div>
				<div style='margin:10px 0 0 34px;float: left;'>
					民族：<input id="popNationTable" class="clientNation" style="width:100px" clear="clear">
				</div>
				<div style="clear:both;"></div>
				<div style='margin:10px 0 0 0;float: left;'>
					入住次数：<input id="checkInNum" clear="clear" readonly="readonly">
				</div>
				<a style="float:left;margin:10px 0 0 33px;display:none" class="clientCardReading">
					<button class="easyui-linkbutton" iconcls="icon-add">读取身份证</button>
				</a>
				<a id="addLiveMan" style="float:left;margin:10px 0 0 33px;display:none">
					<button class="easyui-linkbutton" iconcls="icon-add">添加同住人</button>
				</a>
			</div>
			<div style="margin:10px 5px 0 0;float: left;">
				<img width="108px" height="126px" src="images/userImage.png" style="margin-left:5px" id="popImg">
			</div>

			<!-- 客人合约 -->
			<div style="clear:both;"></div>
			<div style="float:left;margin:25px 0 20px 10px;">
				<input id="stoTimePrice" type="hidden" />
				<div style="float:left;">
					<div style="clear:both"></div>
					<div style="float: left;margin:0 10px 5px 0;display:none;">
						入住时间：<input readonly="readonly" id="startDate"  style="width:100px;"  clear="clear"
									onfocus="WdatePicker({minDate:'%y-%M-{%d-1}',maxDate:'#F{$dp.$D(\'endDate\',{d:-1});}',dateFmt:'yyyy-MM-dd ' + setUp.jsrsuCheckInTime +':00',autoPickDate:true,dchanging:timechData()})"/>
					</div>
					<div style="float: left;margin:0 10px 5px 0;">
						入住时间：<input readonly="readonly"  id="actualOccupancyTime"  style="width:100px;"  clear="clear"/>
					</div>
					<div style="float: left;margin:0 22px 5px 0">
						退房时间：<input id="endDate"  style="width:100px;"  clear="clear"
									onfocus="WdatePicker({minDate:'#F{$dp.$D(\'startDate\',{d:1});}',dateFmt:'yyyy-MM-dd ' + setUp.jsrsuCheckOutTime +':00',autoPickDate:true,dchanging:timechData()})"/>
					</div>
					<div style="float: left;margin:0 0 8px 0">
						总天数：<input readonly="readonly"  id="totalDay"  style="width:100px;" clear="clear"/>
					</div>
					<div style="clear:both"></div>
					<div style="float: left;margin:5px 10px 0 0">
						日均价格：<input readonly="readonly" id="dayPrice"  style="width:100px;" clear="clear"/>
					</div>
					<div style="float: left;margin:5px 10px 0 0">
						客房押金：<input id="houseDeposit" style="width:100px;" clear="clear" readonly="readonly"/>
					</div>
					<div style='margin:5px 0 0 0;float: left;'>
						订单来源：<select id="orderSource"  style="width:100px" choose="choose" >
						<option value="上门客户">上门客户</option>
						<option value="官微订单">官微订单</option>
						<option value="携程网">携程网</option>
						<option value="去哪儿">去哪儿</option>
						<option value="住哪网">住哪网</option>
						<option value="美团网">美团网</option>
						<option value="飞猪网">飞猪网</option>
						<option value="途牛网">途牛网</option>
						<option value="驴妈妈">驴妈妈</option>
						<option value="爱彼迎">爱彼迎</option>
						<option value="途家网">途家网</option>
						<option value="游天下">游天下</option>
						<option value="全球名宿">全球名宿</option>
						<option value="榛果民宿">榛果民宿</option>
						<option value="小猪短租">小猪短租</option>
						<option value="蚂蚁短租">蚂蚁短租</option>
						<option value="木鸟短租">木鸟短租</option>
					</select>
					</div>
					<div style="clear:both"></div>
					<div style="float: left;margin:10px 10px 0 12px">
						总房价：<input readonly="readonly" id="totalHousingPrice"  style="width:100px;" clear="clear"/>
					</div>
					<div style="float: left;margin:10px 10px 0 0">
						应付金额：<input readonly="readonly" id="amountPayable" style="width:100px;" clear="clear"/>
					</div>
					<div style="float: left;margin:10px 0 0 0">
						折后金额：<input readonly="readonly" id="totalPrice" style="width:100px;" clear="clear"/>
					</div>
					<div style="clear:both"></div>
					<div style="float: left;margin:10px 10px 0 0">
						已付金额：<input readonly="readonly" id="accountPaid" style="width:100px;" clear="clear"/>
					</div>
					<div style='margin:10px 0 0 0;float: left;'>
						入住类型：<select style="width:100px;"id="typeOccupancy" onchange="typeOccupancy()">
						<option>普通客房</option>
						<option>钟点客房</option>
						<option>免费客房</option>
					</select>
					</div>
					<div style="margin:2px 4px 0 0px;float:left;display: block" id="discountApplication">
						<a style="float:left;margin:10px 0 0 33px;" class="discountApplication">
							<button class="easyui-linkbutton" iconcls="icon-add"  onclick="discountApplication()">折扣申请</button>
						</a>
					</div>
					<div style="margin:2px 4px 0 0px;float:left;display: none" id="cancleOrder">
						<a style="float:left;margin:10px 0 0 33px;" class="discountApplication">
							<button class="easyui-linkbutton" iconcls="icon-cancel" onclick="cancelTakingOrder()">取消挂单</button>
						</a>
					</div>

					<div style="clear:both"></div>
					<div style="float: left;margin:10px 0 0 0">
						订单备注：<input id="orderRemarks" style="width:439px;height:40px;" clear="clear" />
					</div>

				</div>
			</div>
			<div style="clear:both"></div>
			<div id="fontTitle1"></div>
		</div>
		<div style="background-color: #E0ECFF; height:100%;width:5px;float:left;"></div>
		<div style="float:left;width:320px">
			<div style="clear:both"></div>
			<div style="margin:0 0 0 7px;">
				<table id="customerInfoTable" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
					<thead>
					<tr>
						<th field="popName" width="10" align="center" clear="clear">同住人姓名</th>
						<th field="popIdcard" width="15" align="center" clear="clear">证件号码</th>
						<th field="popRemove" width="10" align="center" clear="clear" formatter="popRemove">删除</th>
					</tr>
					</thead>
				</table>
			</div>
			<div style="background-color: #E0ECFF; height:5px;width:100%;"></div>

			<div style="margin:20px 0 0 0;">
				<div id="moneyDiv" style="float:left;width:62%;">
					<div style="margin:0 0 0 7px;text-align: left;font-weight:bold;">实付金额：</div>
					<div id="moneyText" style="margin:28px 0 0 0;font-size:48px;text-align:center;letter-spacing:-1.5px;"></div>
				</div>
				<div id="checkIn" style="float:left;width:38%;display:none;text-align:center">
					<button type="button" class="openCashBtn1 btn btn-success" style="margin:60px 0 0 110px;width:120px;" onclick="doCheckIn(4,2)">办理入住</button>
				</div>
				<div id="sceneButton" style="float:left;width:38%;display:none;text-align:center">
					<button type="button" class="openCashBtn1 btn btn-success" style="margin:5px 0 5px 0px;width:120px;" onclick="openCash(1,1,2)">现金收银</button>
					<button type="button" class="openCashBtn2 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="openCash(2,1,2)">扫码收银</button>
					<button type="button" class="openCashBtn3 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="openCash(3,1,2)">台卡收银</button>
					<button type="button" class="openCashBtn4 btn btn-success" style="margin:10px 0 5px 0px;width:120px;display:none" onclick="canCheckIn(5,2)">挂账入住</button>
				</div>
				<!-- openCash -->
				<div id="retainButton" style="float:left;width:38%;display:none;text-align:center">
					<button type="button" class="openCashBtn1 btn btn-success" style="margin:5px 0 5px 0px;width:120px;" onclick="openCash(1,2,2)">现金收银</button>
					<button type="button" class="openCashBtn2 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="openCash(2,2,2)">扫码收银</button>
					<button type="button" class="openCashBtn3 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="openCash(3,2,2)">台卡收银</button>
					<button type="button" class="openCashBtn4 btn btn-success" style="margin:10px 0 5px 0px;width:120px;" onclick="doCheckIn(5,2)">挂账入住</button>
				</div>
				<div id="creditButton" style="float:left;margin-left:62%;width:38%;text-align:center">

				</div>
			</div>
		</div>
	</div>
	
	<div id="addShortRentDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 0 29px;float:left;">
			类型：<select style="width:100px;" class="channelType" onchange="getChannelInfo('addShortRentDlg',1)" clear="clear" require="require">
				<option></option>
				<option>会员</option>
				<option>门店</option>
				<option>协议单位</option>
			</select>
		</div>
		<div style='margin:5px 0 0 10px;float:left;'>
			群体分类：<select class="groupType" onchange="getHighestLevelPlan('addShortRentDlg',1)" clear="clear" require="require">
			</select>
		</div>
		<div style='margin:5px 0 0 10px;float:left;'>
			价格方案：<input class="pricePlan" style="width:100px;text-align:center;" clear="clear" readonly="readonly">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			允许挂账：<input class="allowCredit" style="width:100px" clear="clear" readonly="readonly" />
		</div>
		<div class="maxCreditDiv" style='margin:5px 0 0 10px;float:left;'>
			挂账额度：<input class="maxCredit" data-type="money" clear="clear" readonly="readonly">
		</div>
		<div style="clear:both;"></div>
		<div id="clientDiv" style="float:left;">
			<div class="client" style="float:left">
				<div style="float:left;margin:5px 0 0 5px">
					客人姓名：<input class="clientName" style="width:100px;" clear="clear" require="require"/>
				</div>
				<div style="float:left;margin:5px 0 0 22px">
					手机号：<input class="clientPhone"  style="width:100px;" clear="clear" require="require"/>
				</div>
				<div style="float:left;margin:5px 0 0 22px">
					身份证：<input class="clientIdcard"  style="width:100px;" clear="clear" require="require"/>
				</div>
			</div>
		</div>
		<!-- 保留预定房间 -->
		<div style="clear:both"></div>
		
		<div style="float:left;margin:10px 0 0 5px">
			<div id="reservation" style="float:left;">
				预订时间：
			</div>
			<div style="float:left;">
				<input readonly="readonly" id="startDate2"  style="width:100px;" clear="clear" />
			</div>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			退房时间：<input readonly="readonly"  id="endDate2"  style="width:100px;" clear="clear" />
		</div>
		<div style="float:left;margin:10px 0 0 22px">
			总天数：<input readonly="readonly"  id="totalDay2"  style="width:100px;" clear="clear"/>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 5px">
			日均价格：<input id="dayPrice2"  style="width:100px;" clear="clear"/>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			应付金额：<input readonly="readonly" id="amountPayable2"  style="width:100px;" clear="clear"/>
		</div>
		<div style="float:left;margin:10px 0 0 10px">
			实付金额：<input readonly="readonly" id="totalPrice2"  style="width:100px;" clear="clear"/>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 29px">
			备注：<input id="remarks"  style="width:269px;" clear="clear"/>
		</div>
		<div style="clear:both"></div>
		<div id="fontTitle"></div>
		<center style="margin:25px 0 0 0;">
			<a id="doAddEventBtn" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddShortRent()">确定</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addShortRentDlg').dialog('close')">取消</a>
		</center>
	<div id="timeChoice" class="easyui-dialog" data-options="closed:true">
		<div style="float:left;margin:15px 0 0 23px">
			入住时间：<input id="begin_Time"  style="width:100px;" clear="clear" readonly="readonly"
			onfocus="WdatePicker({minDate:'%y-%M-%d-%H-%m-%s',maxDate:'%y-{%M+1}-%d-%H-%m-%s'})">
		</div>
		<div style="float:left;margin:15px 0 0 23px">
			退房时间：<input id="end_Time"  style="width:100px;" clear="clear" readonly="readonly"
			onfocus="WdatePicker({minDate:'#F{$dp.$D(\'begin_Time\',{d:+1})}',maxDate:'%y-{%M+1}-%d-%H-%m-%s'})">
		</div>
		<button type="button" class="btn btn-success shortRent" onclick="transfer(id)" style="margin:30px 0 0 130px;width:120px;" value="下一步">下一步<span class="totalNum2"></span></button>
	<div>
	
	</div>
	<!--取单窗口信息-->

	<div id="takingOrderDlg" class="easyui-dialog" data-options="closed:true" style="margin: 10px 10px 0 10px">
		<table id="takingOrderTable" style="width:98%;height:95%;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			   data-options="rownumbers:true,singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
			<thead>
			<tr>
				<th  field="jtoApplicant" width="10" align="center">申请人</th>
				<th  field="jtoAddress" width="10" align="center">房客地址</th>
				<th  field="jtoRoomType" width="10" align="center">房客房型</th>
				<th  field="jtoTotalHousingPrice" width="10" align="center">订单总价</th>
				<th  field="jtoDayPrice" width="10" align="center">日均房价</th>
				<th  field="jtoDiscount" width="10" align="center">折扣率</th>
				<th  field="jtoDiscountPrice" width="10" align="center">折扣后总价</th>
				<th  field="jtoAveragePrice" width="10" align="center">折扣后均价</th>
				<th  field="jtoRemark" width="10" align="center">折扣原因</th>
				<th	 field="jtoStatus"  width="10" align="center">授权状态</th>
				<th  field="takeOrder" formatter="formatReceiveOrder" width="10" align="center"></th>
			</tr>
			</thead>
		</table>

		<%--<div style="text-align: center;margin: 20px  0 0 0 ">
			<button  type="button" style="width: 50px;height: 35px" class="btn btn-success" onclick="takingSubmit()" >确认</button>
		</div>--%>
	</div>
	<!--折扣申请窗口-->
	<div id="discountApplicationDlg" class="easyui-dialog" data-options="closed:true">
		<div style="margin:25px 0 0 10px;float: left">
			应付金额：<input  id="totalRoomPrice" readonly="readonly" style="width: 150px;height: 35px" clear="clear"/>
		</div>
		<div style="margin:25px 0 0 10px;float: left">
			折扣比例：<input  id="discount" placeholder="请输入1-10之间的折扣率"style="width: 260px;height: 35px" onblur="getDiscountPrice()" clear="clear"/>
		</div>
		<div style="margin:25px 0 0 10px;float: left">
			折后金额：<input  id="discountPrice" readonly="readonly" style="width: 150px;height: 35px" clear="clear"/>
		</div>
		<div style="clear: both"></div>
		<div style="margin:50px 0 0 22px;float: left">
			授权人：<select id='application' style="width: 150px;height: 35px;">
					</select>
		</div>
		<div style="margin:50px 0 0 10px;float: left">
			授权方式：<select id='authType' style="width: 260px;height: 35px" onchange="authApplication()">
			</select>
		</div>

		<div style="margin:50px 0 0 10px;float: left" id="authPsdBox">
			授权密码：<input  id="authPaword" style="width: 150px;;height: 35px" clear="clear"/>
		</div>

		<div style="margin:50px 0 0 10px;display: none;float: left" id="remarkBox">
			折扣原因: <input style="width: 150px;height: 35px" id="remark" >
		</div>
		<div style="clear: both"></div>


		<div style="text-align: center;margin:100px 0 0 0px">
			<button  type="button" style="width: 50px;height: 35px" class="btn btn-success" onclick="authSubmit()" >确认</button>
		</div>

	</div>
	<div id="menu" class="easyui-menu" style="width:130px;">
	<div id="setClean"><a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="openClean(1)">设置保洁</a></div>
	<div id="Maintenance"><a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="openRepair()">添加维修</a></div>
	</div>
	<datalist id="listPopCustomer">
	</datalist>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<jsp:include page="/ui/fg_shortRentHouseDetails.jsp"></jsp:include> 
	<script src="js/fg_shortRentHouseDetails.js"></script>
	<script src="js/fg_shortRentDiagram.js"></script>
	<script src="js/fg_shortRent.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/baseISSObject.js"></script>
	<script src="js/baseISSOnline.js"></script>
	<script src="js/common.js"></script>
	<script src="js/config.js"></script>
	<script src="js/layer/layer.js"></script>

</body>
</html>