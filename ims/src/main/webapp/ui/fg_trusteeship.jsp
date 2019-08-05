<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>未租房间</title>
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
    <style>
        .fwpz-label {
            float: left;
            margin: 3px 0 5px 4px;
            width:52px;
        }
        .fwpz-checkbox {
            float: left;
            margin: 5px 0 0 0px;
        }
		 table td {
			 border: 1px solid #888;
			 border-top: none;
			 white-space: nowrap;
			 padding: 2px;
			 font-size: 14px;
			 height: 30px;
		 }
    </style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div>
			<div style="padding:5px 0 5px 5px">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-tuoguan" id="addTrusteeshipButton" onclick="addHsDlg()">添加整租</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="centralizedApartmentButton" onclick="addBatchHsDlg()">集中式添加</a><%--批量添加房间--%>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="setCentralizedApartmentButton" onclick="centralizedApartment()">集中设置</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="splitFlatShareButton" onclick="splitFlatShare()">合租设置</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add-house" id="addSourceButton" onclick="addHrDlg('noRent')">添加出租</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" id="landlordRenewButton" onclick="landlordRenew()">业主续签</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-tuifang" id="checkoutUpdate" onclick="landlordCheckout()">业主退房</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateManagerUserButton" onclick="updateManagerUser()">设置房管员</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-zhidaojia" id="guidePriceButton" onclick="guidePrice()">设置指导价</a>
        		<a class="easyui-linkbutton" plain="true" iconCls="icon-dingjin" id="depositManagerButton" onclick="depositManager()">客户下定</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" id="sendMessageButton" onclick="sendMessageDlg()">发送短信</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-dayin" id="printAssetButton1" onclick="printQRcode()">打印二维码</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="changeShortRent" onclick="openAddShortRent()">设置日租房</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-tip" id="changeShortRent" onclick="getLastedOrder()">刷新下定状态</a>
				<%--<a class="easyui-linkbutton" plain="true" iconCls="icon-fangyuancaiwushengtaitongji" id="electronicSigning" onclick="addHrDlg('noRent')">电子签约</a>--%>
				<!-- <a class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="advancedScreening(1)" id="screening">高级筛选</a> -->
			</div>
			<input type="hidden" id="hsHouseSort_index">
			<div id="searchTrusteeship" style="margin:0 0 0 5px" class="advancedScreening">
				<div class="advanced1">
					<!-- <div style="margin:0 0 5px 31px;color:black;font-size:13px;float:left;display:none">
						城市：<select id="searchCity" onchange="queryHouseCity()" style="width:80px">
						</select>
					</div>  -->
					<div style="margin:0 0 5px 5px;color:black;float:left;display:none">
						片区：<select id="searchZone" onchange="queryTrusteeship(1,0)" style="width:100px">
							<option></option>
						</select>
					</div>
					<div style="margin:0 0 5px 7px;color:black;float:left;">
						楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;Trusteeship()')" style="width:100px">
					</div>
					<div style="margin:0 0 5px 31px;color:black;float:left;">
						楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;Trusteeship()')" style="width:100px">
					</div>
					<div style="margin:0 0 5px 21px;color:black;float:left;">
						门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;Trusteeship()')" style="width:100px">
					</div>
					<div style="margin:0 0 5px 5px;color:black;float:left;">
						业主姓名：<input id="searchLandlordName" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;Trusteeship()')" style="width:100px">
					</div>
					<div style="margin:0 0 5px 5px;color:black;float:left;">
						下定状态：<select id="searchHsDownDeposit" onchange="clearButtonState(1);queryTrusteeship(1,0);" style="width:100px">
							<option value="">全部</option>
							<option value="是">已定</option>
							<option value="否">未定</option>
						</select>
					</div>
					<div style="margin:0 0 5px 10px;color:black;float:left;">
						<div id="showTheSortButton" style="height: 20px;text-align: center;line-height: 20px;" class="showTheSortButton" onclick="showTheSortDlg()" >排序方式<span id="showTheSortjia" class="showTheSortjia">+</span></div>
						<div class="theSortDlg" id="theSortDlg" style="height:300px;">
							<div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
							<div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse"  searchVal="2">倒序</div>
							<input type="hidden" id="theSortContraryInput"  value="2">
							<div class="theSortTerm" id="theSortTermhsAddCommunity" searchVal="1">楼盘名称</div>
							<div class="theSortTerm" id="theSortTermhsAddBuilding" searchVal="2">楼栋</div>
							<div class="theSortTerm" id="theSortTermhsAddDoorplateno" searchVal="3">门牌号</div>
							<div class="theSortTerm theSortTermSelect" id="theSortTermhsRegisterTime" searchVal="4">登记时间</div>
							<div class="theSortTerm" id="theSortTermhsBeginTime" searchVal="5">托管开始时间</div>
							<div class="theSortTerm" id="theSortTermhsEndTime" searchVal="6">托管结束时间</div>
							<div class="theSortTerm" id="theSortTermhsHouseSquare" searchVal="7">建筑面积</div>
							<div class="theSortTerm" id="theSortTermhsInPrice" searchVal="8">当期成本</div>
							<!-- <div class="theSortTerm" id="theSortTermhsHostingPrice" searchVal="9">托管价格</div> -->
							<div class="theSortTerm" id="theSortTermhsVacancyDay" searchVal="10">空置天数</div>
							<div class="theSortTerm" id="theSortTermhsTransactionPrice" searchVal="11">最新成交价</div>
							<input type="hidden" id="theSortTermInput" value="4">
						</div>
					</div>
				</div>

				<div class="advanced2">
					<div style="clear:both"></div>
					<div style="margin:0 0 5px 32px;color:black;font-size:12px;float:left;">
						城区：<select id="searchDistrict" onchange="clearButtonState(0);queryTrusteeship(1,0);" style="width:100px">
							<option></option>
						</select>
					</div>
					<div style="margin:0 0 5px 7px;color:black;font-size:12px;float:left;">
						房屋类型：<select id="searchHsPrimitiveMother" onchange="_indexNum[0]=0;clearButtonState(0);queryTrusteeship(1,0);" style="width:100px">
							<option value='0'>全部</option>
							<option value='4' selected='selected'>可租房</option>
							<option value='2'>整租房</option>
							<option value='1'>合租房</option>
							<option value='5'>拆分房</option>
							<option value='3'>母房</option>
						</select>
					</div>
					<div style="margin:0 0 5px 8px;color:black;font-size:12px;float:left;" id="searchLeaseStateDiv">
						租赁状态：<select id="searchLeaseState" onchange="_indexNum[0]=0;clearButtonState(0);leaseStateChange();queryTrusteeshipState(0);" style="width:100px">
						</select>
					</div>
					<div style="margin:0 0 5px 5px;color:black;font-size:12px;float:left;">
						业主电话：<input id="searchLandlordPhone" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;Trusteeship()')" style="width:100px">
					</div>
					<div style="margin:0 0 5px 12px;color:black;font-size:13px;float:left;">
						房管员：<input id="searchHsManagerShowUserInfo" class="choose_user_button" doFlag="searchHsManager" doFun="clearButtonState(0);queryTrusteeshipState(1);"
								style="width:100px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
							<input id="searchHsManagerGetUserStoreId" type="hidden">
							<input id="searchHsManagerGetUserDetId" type="hidden">
							<input id="searchHsManagerGetUserId" type="hidden">
							<div id="searchHsManagerShowUserInfoDiv" style="display:none;"></div>
					</div>
				</div>
			</div>
			<input type="hidden" id="maintenanceSituation"/>
			<input type="hidden" id="hsVacancyDay"/>
			<input type="hidden" id="dateType"/>
			<div class="timeOutDiv" style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				<input type="hidden" id="timeOut" value="0">
				<button type="button" class="btn btn-success timeOutBtn" style="margin:0 0 5px 5px;width:160px;" value="1">业主即将到期<span class="totalNum1"></span></button>
				<button type="button" class="btn btn-success timeOutBtn" style="margin:0 0 5px 5px;width:140px;" value="2">严重空置<span class="totalNum2"></span></button>
				<button type="button" class="btn btn-success timeOutBtn" style="margin:0 0 5px 5px;width:140px;" value="3">正在维保<span class="totalNum4"></span></button>
				<button type="button" class="btn btn-success timeOutBtn" style="margin:0 0 5px 5px;width:140px;" value="4">已定房间<span class="totalNum3"></span></button>
			</div>
			<div style="margin:2px 0 5px 5px;color:black;font-size:13px;float:left;">
				<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="reflashList()" ></a>
			</div>
			<div style="margin:2px 0 5px 5px;color:black;font-size:13px;float:left;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="advancedScreening(1)" id="screening">高级筛选</a>
                <a class="easyui-linkbutton" plain="true" iconCls="icon-yingchang" onclick="columnsCheck()">显示/隐藏列</a>
			</div>
			<div style="clear:both"></div>
		</div>
	</div>
	<!--托管房源列表-->
	<div id="DataGridTrusteeship" style="width:100%;">
		<table id="trusteeshipDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false" >
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th field="hsAddDistrict" width="15" align="center">城区</th>
					<th field="hsAddZone" width="15" align="center">片区</th>
					<th field="detailedAddress" width="30" align="center">房屋地址</th>
					<th field="hsSectionType" width="10" align="center">户型</th>
					<th field="hsHouseSquare" width="10" align="center">面积</th>
					<th field="hsHouseOwner" width="10" align="center">用途</th>
					<th field="hsHouseDirection" width="10" align="center">朝向</th>
					<th field="hsInPrice" width="10" align="center">当期成本价</th>
					<th field="hsGuidePrice" width="10" align="center">指导价</th>
					<th field="hsTransactionPrice" width="10" align="center">最新成交价</th>
					<th field="hsVacancyDay" width="10" align="center">空置天数</th>
					<th field="hsEndTime" width="10" align="center">托管到期</th>
					<th field="hsLeaseState" width="10" align="center">空置状态</th>
					<th field="hsManagerUserName" width="10" align="center">房管员</th>
					<th field="hsDownDeposit" width="10" align="center" formatter="depositStateFormatter">下定状态</th>
					<%--<th field="houseShortState" width="10" align="center">短租</th>--%>
					<th field="hsState" width="10" align="center">管理状态</th>
					<%--<th field="hsAutoSendMsg" width="10" align="center" formatter ="autoSendMsg" >短信发送</th>--%>
				</tr>
			</thead>
		</table>
		<div id="trusteeshipPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<div id="choseHouse" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style='margin:0 0 10px 10px;'>
			<div
				style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
				城市：<select id="searchAddCity" onchange="queryAddCity()"
					style="width:80px">
				</select>
			</div>
			<div
				style="margin:5px 0 5px 17px;color:black;font-size:13px;float:left;">
				城区：<select id="searchAddDistrict" onchange="queryHouse(1,0)"
					style="width:100px">
					<option></option>
				</select>

			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;display:none">
				片区：<select id="searchAddZone" onchange="queryHouse(1,0)"
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
		</div>
		<!-- 选择房屋列表 -->
		<table id="choseHouseTable"></table>
		<div id="choseHousePageDiv" style="width:99%;text-align:center;"></div>
	</div>

	<div id="checkCheckoutDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style='margin:5px 0 0 15px;float: left;'>
			是否通过：<select id="check_if" style="width:80px">
				<option value=""></option>
				<option value="是">是</option>
				<option value="否">否</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 10px;float: left;'>备注/原因：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea id="check_note" style="width:90%;height:50px"></textarea>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" id="doCheckCheckoutOne" onclick="doCheckCheckout(0)">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-ok" id="doCheckCheckoutTwo" onclick="doCheckCheckout(1)">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#checkCheckoutDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<!-- 业主指导价设置 -->
	<div id="guidePriceDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style='margin:5px 0 0 10px;float: left;'>
			当期成本：<input id="guidePriceNeed" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			最新成交价：<input id="guideTransactionPrice" style="width:80px" disabled="disabled">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 10px;float: left;'>
			原指导价：<input id="guidePriceOld" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 22px;float: left;'>
			新指导价：<input type="number" data-type="money" id="guidePriceNew" style="width:80px" require="require">
		</div>
		<div style="clear:both"></div>
		<div style="width:100%;">
			</br>
			<center>
				<a class="easyui-linkbutton" iconcls="icon-ok" id="doGuidePrice" onclick="if(validateRequire('guidePriceDlg')){doGuidePrice()}"> 确定</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#guidePriceDlg').dialog('close')">关闭</a>
			</center>
		</div>
	</div>

	<!-- 未租详细信息对话框 -->
	<div id="readonlyTruDlg" class="easyui-dialog" data-options="closed:true">
		<div id="readonlyTabs" class="easyui-tabs" data-options="tabPosition:'left'">
			<!-- <div title="未租详情" id="detailHouseInfo" tabindex="-1" style="padding:5px 0 0 12px;list-style: none;">
				<div style="width:98.25%;">
					<fieldset><legend>房源信息</legend>
						<div style='margin:10px 0 0 36px;float:left'>
							<lable style="display:inline-block;"><span class="require" >*</span>城区:</lable>
							<input id="hsAddDistrict" style="width:120px;" disabled="disabled">
						</div>
						<div style='margin:10px 0 0 25px;float:left'>
							<lable style="display:inline-block;"><span class="require">*</span>面积:</lable>
							<input id="hsHouseSquare" style="width:120px;" disabled="disabled">
						</div>
						<div style='margin:10px 0 0 25px;float:left'>
							<lable style="display:inline-block;"><span class="require">*</span>朝向:</lable>
							<input id="hsHouseDirection" style="width:120px;" disabled="disabled">
						</div>
						<div style="margin:10px 50px 0 15px;float:left">
							<lable style="display:inline-block;"><span class="require">*</span>下定状态:</lable>
							<input id="hsDownDeposit" style="width:120px" disabled="disabled" >
						</div>
						<div style="margin:10px 0 0 36px;float:left">
							<lable style="display:inline-block;"> <span class="require">*</span>户型:</lable>
							<input id="hsSectionType" style="width:120px" disabled="disabled" >
						</div>
						<div style="margin:10px 0 0 25px;float:left">
							<lable style="display:inline-block;"><span class="require">*</span>用途:</lable>
							<input id="addHsResidentiality" style="width:120px;" disabled="disabled"/>
						</div>
						<div style="margin:10px 0 0 15px;float:left">
							<lable style="display:inline-block;"><span class="require">*</span>指导价:</lable>
							<input id="hsGuidePrice" type="number" style="width:120px" disabled="disabled" >
						</div>
						<div style="float:left;margin:10px 50px 0 25px">
							<lable style="display:inline-block;"><span class="require">*</span>房管员:</lable>
							<input id="hsManagerUserName" style="width:120px;" disabled="disabled"/>
						</div>
						<div style="float:left;margin:10px 0 0 0">
							<lable style="display:inline-block;"><span class="require">*</span>当期成本价:</lable>
							<input id="hsInPrice" type="number" style="width:120px;" disabled="disabled"/>
						</div>
						<div style="float:left;margin:10px 0 0 0">
							<lable style="display:inline-block;"><span class="require">*</span>托管到期:</lable>
							<input id="hsEndTime" style="width:120px;" disabled="disabled"/>
						</div>
						<div style="float:left;margin:10px 0 0 2px">
							<lable style="display:inline-block;"><span class="require">*</span>空置状态:</lable>
							<input id="hsLeaseState" style="width:120px;" disabled="disabled"/>
						</div>
						<div style="margin:10px 50px 0 2px;float:left">
							<lable style="display:inline-block;"><span class="require">*</span>最新成交价:</lable>
							<input id="hsTransactionPrice" type="number" style="width:120px;" disabled="disabled"/>
						</div>
						<div style="float:left;margin:10px 0 0 10px">
							<lable style="display:inline-block;"><span class="require">*</span>房屋地址:</lable>
							<input id="detailedAddress2" style="width:240px;" disabled="disabled"/>
						</div>
					</fieldset>
					<div style="clear:both;height: 15px"></div>
					<div style="width:100%;height:165px;margin:5px 0 0 0;">
						<div style="float:left;width:49%;height:100%;">
							<fieldset>
								<legend>家私电器</legend>
								<div style="width:100%;height:135px;overflow:scroll;" id="contractInformation">
									<table id="assetsTable" style="width:98%;height:125px;table-layout:fixed;overflow:hidden;"
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
									<div id="assetsPageDiv1" style="width:98%;text-align:center;"></div>
								</div>
							</fieldset>
						</div>
						<div style="float:left;width:50%;height:100%;margin-left: 0.5%">
								<fieldset><legend>其他配置</legend>
									<div id="add_room_configuration" class="configuration">
										<div style="clear:both"></div>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="热水淋浴">热水淋浴</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="无线网络">无线网络</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="门禁系统">门禁系统</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="停车位">停车位</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="热水壶">热水壶</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="有线网络">有线网络</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电脑">电脑</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="拖鞋">拖鞋</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="纸巾">纸巾</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="牙具">牙具</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="毛巾">毛巾</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴液">浴液</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="洗发水">洗发水</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="香皂">香皂</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴巾">浴巾</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="剃须刀">剃须刀</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="吹风筒">吹风筒</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜儿童">适宜儿童</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜老人">适宜老人</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜残疾人">适宜残疾人</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电梯">电梯</button>
										<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="暖气">暖气</button>
									</div>
									</fieldset>
						</div>
					</div>
					
				</div>
				<div style="clear:both;height: 15px"></div>
				跟进
				<div style="padding:5px 0 0 0;width:98%;">
					<table id="followInfoTable1"></table>
					<div id="followPageDiv1" style="text-align:center;"></div>
				</div>
			</div> -->
			<div title="业主信息" id="detailLandlordInfo" tabindex="0" style="padding:5px 0 0 12px;">
				<div style="margin:5px 0 0 0;float: left;">
					租赁状态：<input style="width:100px;" disabled="disabled" id="readhsLeaseState">
				</div>
				<div style="margin:5px 0 0 31px;float: left;">
					物业地址：<input style="width:247px;" disabled="disabled" id="hsAddress">
				</div>
				<div style="margin:5px 0 0 44px;float: left;">
					面积：<input style="width:100px;" disabled="disabled" id="readhsHouseSquare">
				</div>
				<div style="margin:5px 0 0 56px;float: left;">
					户型：<input style="width:100px;" disabled="disabled" id="readhsSectionType">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 0;float: left;">
					用途类型：<input style="width:100px;" disabled="disabled" id="readhsHouseOwner">
				</div>
				<div style="margin:5px 0 0 55px;float: left;">
					朝向：<input style="width:80px;" disabled="disabled" id="readhsHouseDirection">
				</div>
				<div style="margin:5px 0 0 15px;float: left;">
					出房指导价：<input style="width:80px;" disabled="disabled" id="readhsGuidePrice">
				</div>
				<div style="margin:5px 0 0 20px;float: left;">
					业主押金：<input style="width:100px;" disabled="disabled" id="readhsHouseDeposit">
				</div>
				<div style="margin:5px 0 0 20px;float: left;" id="readhsBaseTd">
					业主欠结款：<input style="width:100px;color:red;" disabled="disabled" id="readhsBase">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 0;float: left;">
					空置天数：<input style="width:100px;" disabled="disabled" id="readhsVacancyDay">
				</div>
				<div style="margin:5px 0 0 19px;float: left;">
					业绩受益人：<input style="width:247px;" disabled="disabled" id="readhsAssist">
				</div>
				<div style="margin:5px 0 0 32px;float: left;">
					业务员：<input style="width:100px;" disabled="disabled" id="readhsAdminUserName">
				</div>
				<div style="margin:5px 0 0 44px;float: left;">
					录入人：<input style="width:100px;" disabled="disabled" id="readhsUserName">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 0;float: left;">
					外置装修/免租期：<input style="width:59px;" disabled="disabled" id="readhsDecorationHoliday">
				</div>
				<div style="clear:both"></div>
				<div style="width:100%;height:165px;margin:5px 0 0 0;">
					<div style="float:left;width:49%;height:100%;">
						<fieldset>
							<legend>业主信息</legend>
							<div style="margin:5px 0 0 2px;float: left;">
								业主信息：<input style="width:80px;" disabled="disabled" id="readlaPopName">
								<input style="width:100px;" disabled="disabled" id="readlaPopTelephone">
								<input style="width:170px;" disabled="disabled" id="readlaPopIdcard">
							</div>
							<div style="clear:both"></div>
							<div style="margin:5px 0 0 26px;float: left;">
								备注：<input style="width:357px;" disabled="disabled" id="readpopNameRemark">
							</div>
							<div style="clear:both"></div>
							<div style="margin:5px 0 0 14px;float: left;">
								联系人：<input style="width:80px;" disabled="disabled" id="readlaSecondContacts">
								<input style="width:100px;" disabled="disabled" id="readlaSecondPhone">
								<input style="width:170px;" disabled="disabled">
							</div>
							<div style="clear:both"></div>
							<div style="margin:5px 0 0 2px;float: left;">
								收款账户：<input style="width:80px;" disabled="disabled" id="readhsBankName">
								<input style="width:100px;" disabled="disabled" id="readhsBankType">
								<input style="width:170px;" disabled="disabled" id="readhsBankNum">
							</div>
							<div style="clear:both"></div>
							<div style="margin:5px 0 0 2px;float: left;">
								合同备注：<input style="width:357px;" disabled="disabled" id="readhsHouseNote">
							</div>
						</fieldset>
					</div>
					<div style="float:left;width:49%;height:100%;">
						<fieldset>
							<legend>合约信息</legend>
							<div style="width:100%;height:125px;overflow:scroll;" id="contractInformation">
								<table id="contractInformationTable"></table>
							</div>
						</fieldset>
					</div>
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 5px;float:left;">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" id="landlordRenewButton2" onclick="landlordRenew()">业主续签</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-tuifang" id="checkoutUpdate2" onclick="landlordCheckout()">业主退房</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateManagerUserButton2" onclick="updateManagerUser()">设置房管员</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-zhidaojia" id="guidePriceButton2" onclick="guidePrice()">设置指导价</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-dingjin" id="depositManagerButton2" onclick="depositManager()">定金管理</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" id="sendMessageButton2" onclick="sendMessageDlg()">发送短信</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-follow-up" id="writeFollowButton" onclick="writeFollowDlg()">写跟进</a>
				</div>
				<div style="margin:7px 0 0 10px;float:left;">
					<select id="infoFollowType" onchange="infoFollowInfo()">
						<option value=''>全部跟进</option>
						<option value='系统跟进'>系统跟进</option>
						<option value='业务跟进'>业务跟进</option>
						<option value='行政跟进'>行政跟进</option>
						<option value='财务跟进'>财务跟进</option>
						<option value="房屋巡查">房屋巡查</option>
					</select>
				</div>
				<div style="clear:both"></div>
				<!-- 跟进 -->
				<div style="padding:5px 0 0 0;width:98%;">
					<table id="followInfoTable"></table>
					<div id="followPageDiv" style="text-align:center;"></div>
				</div>
				<div style="clear:both"></div>
				<div style="width:100%; margin: 5px 0 5px 0;">
					<div style="margin:0 0 5px 0;text-align: center;">
						<a class="easyui-linkbutton" iconcls="icon-up" onclick="hslaterOrNext(0)">上一条</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#readonlyTruDlg').dialog('close')">关闭</a>
						<a class="easyui-linkbutton" iconcls="icon-down" onclick="hslaterOrNext(1)">下一条</a>
					</div>
				</div>
			</div>
			
			<div title="房屋收支" id="detailFinancialInfo" tabindex="3" style="padding:5px 0 0 12px;">
				<div>
					<div style="margin:5px 0 5px 5px;color:black;float:left;">
						登记日期：<input id="searchJfCheckInTime"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
							style="width:80px">
					</div>
					<div style="margin:5px 0 5px 5px;color:black;float:left;">
						记账日期：<input id="searchJfBillingDate"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
							style="width:80px">
					</div>
					<div style="margin:5px 0 5px 5px;color:black;float:left;">
						时间段：<input id="searchJfCheckInTimeStart"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
							style="width:80px"> 至：<input id="searchJfCheckInTimeEnd"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
							style="width:80px">
					</div>
					<div style="margin:2px 0 5px 5px;color:black;float:left;">
						<a class="easyui-linkbutton" iconcls="icon-search" id="financilSearchButton" >分类查询</a>
						<div id="financilSearchDiv"></div>
					</div>
					<input id="financilSearchJfNatureOfThe" style="display:none">
					<input id="financilSearchJfBigType" style="display:none">
					<input id="financilSearchJfAccountingSpecies" style="display:none">
				</div>
				<div style="clear:both"></div>
				<div>
					<table id="paymentInfoTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="jfAuditState" width="10" align="center">财务状态</th>
								<th field="jfBillingDate" width="10" align="center">记账日期</th>
								<th field="jfNatureOfThe" width="10" align="center">收支性质</th>
								<th field="jfAccountingSpecies" width="20" align="center">收支种类</th>
								<th field="jfTheOwnershipType" width="10" align="center">归属类型</th>
								<th field="jfBelongingToTheName" width="10" align="center">归属名称</th>
								<th field="jfSumMoney" width="10" align="center">金额</th>
								<th field="jfStartCycle" width="10" align="center">开始周期</th>
								<th field="jfEndCycle" width="10" align="center">结束周期</th>
							</tr>
						</thead>
					</table>
					<div id="financialPageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="业主账单" id="detailLandlordBillInfo" tabindex="2" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<div style="margin:5px 0 5px 5px;float:left;">
						账单状态：<select id="searchLaJciState" onchange="queryPayable(1,0)" style="width:80px">
							<option value="">全部</option>
							<option value="已付">已付</option>
							<option value="待付" selected="selected">待付</option>
						</select>
					</div>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="payableInfoTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="landlordName" width="10" align="center">业主姓名</th>
								<th field="jciFukuanri" width="10" align="center">付款日</th>
								<th field="jciPeriods" width="10" align="center">账单期数</th>
								<th field="jciBeginPeriods" width="15" align="center">开始周期</th>
								<th field="jciEndPeriods" width="15" align="center">结束周期</th>
								<th field="jciMoney" width="10" align="center">金额</th>
								<th field="jciState" width="10" align="center">账单状态</th>
								<th field="auditStatus" width="10" align="center" formatter="auditStatusFormatter">审核状态</th>
								<th field="auditName" width="10" align="center">审核人</th>
								<th field="reviewName" width="10" align="center">复核人</th>
								<th field="draweeName" width="10" align="center">付款人</th>
							</tr>
						</thead>
					</table>
					<div id="payableInfoPageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="家私电器" id="detailAssetsInfo" tabindex="4" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-qianru" onclick="moveInAssets(1)">迁入资产</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-qianchu" onclick="moveOutAssets(1)">迁出资产</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-peizhi" onclick="addAsset()">添加资产</a>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="assetsInfoTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
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
					<div id="assetsPageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="合约记录" id="detailContInfo" tabindex="5" style="padding:5px 0 0 12px;">
				<br>
				<legend>业主合约</legend>
				<div style='padding:5px 0 0 0;'>
					<table id="landlordContinueTable" style="width:98%;height:127px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="jrlSignedTime" width="7" align="center">签约时间</th>
								<th field="jrlContractType" width="7" align="center">合同性质</th>
								<th field="jrlBeginTime" width="7" align="center">开始时间</th>
								<th field="jrlEndTime" width="7" align="center">到期时间</th>
								<th field="jrlTheTerm" width="7" align="center">合同期限</th>
								<th field="jrlPaymentMethod" width="7" align="center">缴费方式</th>
								<th field="jrlRegistrationTime" width="9" align="center">登记时间</th>
								<th field="jrlImgNum" width="9" align="center">图片/文件</th>
							</tr>
						</thead>
					</table>
					<div id="landlordContinuePageDiv" style="width:98%;text-align:center;"></div>
				</div>
				<br><br><br>
				<legend>历史租客合约</legend>
				<div style='padding:5px 0 0 0;'>
					<table id="hisRenewalContinueTable" style="width:98%;height:127px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="jrrSignedTime" width="7" align="center">签约时间</th>
								<th field="jrrContractType" width="7" align="center">合同性质</th>
								<th field="jrrBeginTime" width="7" align="center">开始时间</th>
								<th field="jrrEndTime" width="7" align="center">到期时间</th>
								<th field="jrrTheTerm" width="7" align="center">合同期限</th>
								<th field="jrrPaymentMethod" width="7" align="center">缴费方式</th>
								<th field="jrrRegistrationTime" width="9" align="center">登记时间</th>
								<th field="jrrImgNum" width="9" align="center">图片/文件</th>
							</tr>
						</thead>
					</table>
					<div id="rentHisContinuePageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="短信记录" id="detailMessageInfo" tabindex="6" style="padding:5px 0 0 12px;">
				<div style="padding:5px 0 0 10px; height: 5%;">
					短信内容关键字查询：<input style="width:130px"  id="searchMessageNote" onkeyup="queryMsgOnkeyup(this.id,5,0)">
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="sendMessageTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="addCommunity" width="25" align="center">楼盘名称</th>
								<th field="popName" width="10" align="center">姓名</th>
								<th field="popTelephone" width="10" align="center">电话</th>
								<th field="smState" width="10" align="center" formatter="formatterSmState">发送状态</th>
								<th field="smTreatmentStatus" width="10" align="center" formatter="formattersmTreatmentStatus">处理状态</th>
								<th field="smUserName" width="10" align="center">发送人</th>
								<th field="smDataTime" width="20" align="center">发送时间</th>
								<th field="smCount" width="10" align="center">短信条数</th>
							</tr>
						</thead>
					</table>
					<div id="sendMessagePageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="房间照片" id="detailHsPicInfo" tabindex="7" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-upload" onclick="upload_hstab_img()">上传</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-shanchutupian" onclick="remove_hstab_img()">选择删除</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-shuaxin" onclick="refresh_hstab_img()">刷新</a>
					<span id="_hstab_imgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
				</div>
				<div id="_hstab_title" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
				<div id="_hstab_btn" style="margin:10px 0 0 10px;text-align:left;display:none;">
					<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemove_hstab_img()">删除</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel_hstab_img()">取消</a>
				</div>
				<div id="_hstab_imgWrapper" style="margin:10px 0 0 10px;min-height: 400px;"></div>
				<div style="clear:both"></div>

			</div>
			<div title="能源卡号" id="detailEnergyInfo" tabindex="8" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add-notice" onclick="addCard()">添加卡号</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-edit-number" onclick="updateCard1()">修改卡号</a>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="energyCardTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="jdcnCardName" width="10" align="center">类型</th>
								<th field="jdcnCardNumber" width="20" align="center">用户编号</th>
								<th field="jdcnMeterNumber" width="20" align="center">表号</th>
								<th field="jdcnBelongingToPeople" width="10" align="center">归属人</th>
								<th field="jdcnIdCard" width="20" align="center">证件号码</th>
								<th field="jdcnTelephone" width="10" align="center">电话</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<div title="维保记录" id="detailRepairInfo" tabindex="9" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addRepairButton" onclick="addRepair()">添加维保</a>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="repairInfoTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden"></table>
					<div id="repairInfoPageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="审批记录" id="detailEventInfo" tabindex="10" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" id="addEventButton" onclick="addEvent()">添加审批</a>
					<a class="easyui-linkbutton" iconCls="icon-fujian" plain="true" onclick="showAttachmentHandle()">查看附件</a>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="eventInfoTable" style="width:98%;height:402px"></table>
					<div id="eventInfoPageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="任务记录" id="detailTaskInfo" tabindex="12" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addTaskButton" onclick="addTask()">添加任务</a>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="taskInfoTable" style="width:98%;height:402px"></table>
					<div id="taskInfoPageDiv" style="width:98%;text-align:center;"></div>
				</div>
			</div>
			<div title="智能设备" id="detailDeviceInfo" tabindex="11" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="bindDevice()">绑定设备</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="deviceControl" onclick="chooseOperateDlg()">操作设备</a>
				</div>
				<legend>房间设备</legend>
				<div style="padding:5px 0 0 0;">
					<table id="deviceInfoTable" style="width:98%;height:200px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="brandName" width="20" align="center" hidden="hidden">设备品牌</th>
								<th field="brandType" width="10" align="center">设备类型</th>
								<th field="brandModel" width="20" align="center">设备型号</th>
								<th field="devNickname" width="30" align="center">设备名称</th>
								<th field="devState" width="30" align="center" >在线状态</th>
								<th field="devStatus" width="30" align="center" >设备状态</th>
							</tr>
						</thead>
					</table>
				</div>
				<legend>公区设备</legend>
				<div style="padding:5px 0 0 0;">
					<table id="deviceInfoOfficeTable" style="width:98%;height:200px;table-layout:fixed;overflow:hidden;"
						   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
						<tr>
							<th field="brandName" width="20" align="center" hidden="hidden">设备品牌</th>
							<th field="brandType" width="10" align="center">设备类型</th>
							<th field="brandModel" width="20" align="center">设备型号</th>
							<th field="devNickname" width="30" align="center">设备名称</th>
							<th field="devState" width="30" align="center" >在线状态</th>
							<th field="devStatus" width="30" align="center" >设备状态</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
			<div title="授权管理" id="doorLockInfo" tabindex="12" style="overflow:hidden;">
				<div style="padding:5px 0 0 10px;width: 98%;">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add"  onclick="showAddDoorCart()">添加授权</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add"  onclick="logoutDoorCart(1)">取消授权</a>
					<!-- <a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="" onclick="logoutDoorCart(2)">退卡</a>  -->
					<table id="doorLockTable"></table>
				</div>
				<div style="padding:5px 0 0 10px;width: 98%;">
					<table id="doorLockFollowTable"></table>
				</div>
			</div>
			<div title="能源读数" id="energyReadingsInfo" tabindex="13" style="padding:5px 0 0 12px;">
				<div class="clearfix" style="padding:5px 0 0 10px; height: 5%;">
					<div style="margin:0 0 5px 0;color:black;font-size:13px;float:left;">
						时间：<input id="searchStartTime" style="width:80px" class="Wdate" type="text"
							onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchEndTime\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryEnergyReadings()})">到
						<input id="searchEndTime" style="width:80px" class="Wdate" type="text"
							onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchStartTime\',{d:1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryEnergyReadings()})">
					</div>
					<div style="margin:0 0 5px 20px;float:left">
						设备：<select id="searchDevice" style="width:100px;" onchange="queryEnergyReadings()">
							<option value="水表">水表</option>
							<option value="电表">电表</option>
						</select>
					</div>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="energyReadingsInfoTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<%--<th field="brandName" width="30" align="center">设备品牌</th>--%>
								<th field="brandType" width="20" align="center">设备类型</th>
								<th field="erNum" width="20" align="center">读数</th>
								<th field="erDate" width="30" align="center" >日期</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!--显示/隐藏对话框-->
	<div id="columnsCheckBox" class="easyui-dialog" data-options="closed:true"><!--  class="easyui-dialog" data-options="closed:true" -->
		<fieldset>
			<legend>选择列(勾选需要显示的列)</legend>
			<div style="width:100%;height:85%;">
				<div style="margin:5px 0 0 5px;float:left">
					<input type="checkbox" id="AllColumns" value="all" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>全选</label>
				</div>
				<div style="clear:both"></div>
				<div style="margin:20px 0 0 5px;float:left">
					<input type="checkbox" id="AllHouseSourceColumns" value="all" />
				</div>
				<div style="margin:20px 0 0 5px;float:left">
					<label>房屋基本信息</label>
				</div>
				<div style="clear:both"></div>
				<div id="houseSourceColumns">

					<div style="margin:5px 0 0 5px;float:left">
						<input type="checkbox" value="hsSectionType" id="hsSectionType" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>户型</label>
					</div>

					<div style="margin:5px 0 0 50px;float:left">
						<input type="checkbox" value="hsHouseSquare" id="hsHouseSquare" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>面积</label>
					</div>

					<div style="margin:5px 0 0 50px;float:left">
						<input type="checkbox" value="hsAddZone" id="hsAddZone" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>片区</label>
					</div>

					<div style="margin:5px 0 0 50px;float:left">
						<input type="checkbox" value="hsHouseOwner" id="hsHouseOwner" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>用途</label>
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 5px;float:left">
						<input type="checkbox" value="hsHouseDirection" id="hsHouseDirection" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>朝向</label>
					</div>

					<div style="clear:both"></div>
				</div>
				<div id="renterColumns">
					<div style="margin:20px 0 0 5px;float:left">
						<input type="checkbox" id="AllRenterColumns" value="all" />
					</div>
					<div style="margin:20px 0 0 5px;float:left">
						<label>其他信息</label>
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 5px;float:left">
						<input type="checkbox" value="hsInPrice" id="hsInPrice" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>当期成本价</label>
					</div>
					<div style="margin:5px 0 0 18px;float:left">
						<input type="checkbox" value="hsGuidePrice" id="hsGuidePrice" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>指导价</label>
					</div>
					<div style="margin:5px 0 0 30px;float:left">
						<input type="checkbox" value="hsTransactionPrice" id="hsTransactionPrice" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>最新成交价</label>
					</div>
					<div style="margin:5px 0 0 15px;float:left">
						<input type="checkbox" value="hsVacancyDay" id="hsVacancyDay2" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>空置天数</label>
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 5px;float:left">
						<input type="checkbox" value="hsEndTime" id="hsEndTime" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>托管到期</label>
					</div>
					<div style="margin:5px 0 0 30px;float:left">
						<input type="checkbox" value="hsLeaseState" id="hsLeaseState" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>空置状态</label>
					</div>
					<div style="margin:5px 0 0 18px;float:left">
						<input type="checkbox" value="hsManagerUserName" id="hsManagerUserName" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>房管员</label>
					</div>
					<div style="margin:5px 0 0 39px;float:left">
						<input type="checkbox" value="hsDownDeposit" id="hsDownDeposit" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>下定状态</label>
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 5px;float:left">
						<input type="checkbox" value="hsState" id="hsState" />
					</div>
					<div style="margin:5px 0 0 5px;float:left">
						<label>管理状态</label>
					</div>
					<div style="clear:both"></div>
				</div>
				</br>
				<div id="getHidenColumn" style="width:100%;height:30px;text-align: center;">
					<a class="easyui-linkbutton" iconcls="icon-save" onclick="displayCols()">保存</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#columnsCheckBox').dialog('close')">取消</a>
				</div>
			</div>
		</fieldset>
	</div>


	<!-- 业主续签窗口 -->
	<div id="landlordRenewDlg" style="padding:6px;display:none;">
		<fieldset>
			<legend>
				基本信息
			</legend>
			<div style='margin:5px 0 0 24px;float: left;'>
				楼盘名称：<input id="landlordRenewAddress" style="width:418px"
					disabled="disabled">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 24px;float: left;'>
				房东姓名：<input id="landlordRenewLandlordName" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 29px;float: left;display:none'>
				联系方式：<input id="landlordRenewPhone" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				前次房屋押金：<input id="landlordRenewDespoit" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 29px;float: left;'>
				签约次数：<input id="landlordRenewNums" style="width:80px"
					disabled="disabled">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				前次开始时间：<input id="landlordRenewLastBegin" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				前次结束时间：<input id="landlordRenewLastEnd" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				前次合同期限：<input id="landlordRenewLastTerm" style="width:80px"
					disabled="disabled">
			</div>
			<div style="clear:both"></div>
			<!-- <div style='margin:5px 0 0 12px;float: left;'>
				前次免租期：<input id="landlordRenewLastFreeDays" style="width:80px"
					disabled="disabled">
			</div> -->
			<div style='margin:5px 0 0 24px;float: left;'>
				前次租金：<input id="landlordRenewLastPrice" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				前次合同性质：<input id="landlordRenewLastContractType" style="width:80px"
					disabled="disabled">
			</div>
			<div style="clear:both"></div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>
				续签合同信息
			</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				开始时间：<input id="landlordRenewBegin" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				合同期限：<select id="landlordRenewTermYear" style="width:40px;"
					onchange="lrChangeDate()" needs="1">
					<%
						for (int i = 0; i < 11; ++i) {
							out.println("<option value='" + i + "'>" + i + "</option>");
						}
					%>
				</select>年 <select id="landlordRenewTermMonth" style="width:40px;"
					onchange="lrChangeDate()" needs="1">
					<%
						for (int i = 0; i < 12; ++i) {
							out.println("<option value='" + i + "'>" + i + "</option>");
						}
					%>
				</select>月 <select id="landlordRenewTermDay" style="width:40px;"
					onchange="lrChangeDate()" needs="1">
					<%
						for (int i = 0; i < 31; ++i) {
							out.println("<option value='" + i + "'>" + i + "</option>");
						}
					%>
				</select>日
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				结束时间：<input id="landlordRenewEnd" style="width:80px"
					disabled="disabled">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				签约时间：<input id="landlordRenewSignedTime" style="width:80px"
					class="Wdate" type="text" onfocus="WdatePicker()" needs="1">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				缴费方式：<select id="landlordRenewPayment" style="width:80px" needs="1">
					<option></option>
					<option value="月付">月付</option>
					<option value="季付">季付</option>
					<option value="年付">年付</option>
					<option value="半年付">半年付</option>
					<option value="全额付">全额付</option>
				</select>
			</div>
			<!-- <div style='margin:5px 0 0 5px;float: left;'>
				免租期：<input id="landlordRenewFreedDays" style="width:47px"
					onkeyup="lrChangeDate()" needs="1"> 天
			</div> -->
			<div style='margin:5px 0 0 5px;float: left;'>
				提前 <input id="landlordRenewAdvancePay" style="width:39px" needs="1" type="number">天交租
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				新房屋押金：<input id="landlordRenewAddDeposit" style="width:44px" needs="1" type="number" data-type="money">元
			</div>
			<div style='margin:5px 0 0 2px;float: left;display:none;'>
				价格阶梯：<input id="lrjrlPriceLadder">
			</div>
			<div style='margin:5px 0 0 2px;float: left;display:none;'>
				免租期时段：<input id="lrjrlRentFreeSegment">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				合同性质：<input id="landlordRenewContractType" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 17px;float: left;'>
				登记人：<input id="landlordRenewUser" style="width:80px"
					disabled="disabled">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				主单人：<input id="doLandlordRenewShowUserInfo" needs="1" style="width:175px;cursor: pointer;" readonly="readonly" class="choose_user_button" doFlag="doLandlordRenew" doFun="" value="">
				<input id="doLandlordRenewGetUserStoreId" type="hidden">
				<input id="doLandlordRenewGetUserDetId" type="hidden">
				<input id="doLandlordRenewGetUserId" type="hidden">
				<div id="doLandlordRenewShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 0;">
				合同编号：<input id="landlordRenewContractNum" style="width:80px;"
					onkeyup="$(this).val($(this).val().toUpperCase());if(event.keyCode==13){contractNumCheckout(1);}"
					onblur="contractNumCheckout(1)">
				<span id="landlordRenewContractNumTips" style="height:20px;color:red;"></span>
				<span style="display:inline-block;vertical-align: bottom;" id="landlordRenewUsedContractNum"></span>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<div id="lrpriceLadder">
			<fieldset>
				<legend>租金设置</legend>
				<div class="lrpriceLadderDiv"></div>
			</fieldset>
			<fieldset>
				<legend>免租期设置</legend>
				<div class="lrrentFreeSegmentDiv"></div>
			</fieldset>
		</div>
		<center>
			<div id="landlordRenewTips" style="height:20px;color:red;"></div>
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="lrCheckSetting()"> 提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#landlordRenewDlg').dialog('close')">关闭</a>
		</center>
	</div>

	<!-- 写跟进 -->
	<div id="writeFollowDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style='margin:5px 0 0 0;float: left;'>
			跟进类型：<select id="writeFollowType" style="width:90px" clear="clear" require="require">
				<option></option>
				<option value="0">业务跟进</option>
				<option value="1">行政跟进</option>
				<option value="2">财务跟进</option>
				<option value="3">房屋巡查</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			跟进归属：<select id="writeFollowBelong" style="width:90px" clear="clear" require="require">
				<option></option>
				<option value="0">业主</option>
				<option value="1">其他</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>工作台跟进提醒：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<input type="checkbox" id="writeFollowRemind">
		</div>
		<div style="clear:both"></div>
		<div style='margin:8px 0 0 0;float: left;'>
			跟进方式：<select class="follow_way" id="writeFollowWay" style="width:150px" clear="clear" require="require">
				<option value=""></option>
			</select>
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">上传附件</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 5px 0;float: left;'>
			<label>生成协同事务:</label>
			<input type="checkbox" name="adminFlag" onclick="assistingAffairs1(0)" id="adminFlagRepair">维保
            <input type="checkbox" name="adminFlag" onclick="assistingAffairs1(1)" id="adminFlagTask">任务
        </div>
        <div style="clear:both"></div>
        <div id="maintenance" style="display:none">
        	<div style='margin:5px 0 0 0;float: left;'>
				维保类型：<select id="marepairTypeRp" style="width:100px;" clear="clear" require="repair">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				费用归属：<select id="maRepairResponsibility" style="width:100px;" clear="clear" require="repair">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				客户姓名：<input id="marepairName" style="width:100px" clear="clear" require="repair">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				客户电话：<input id="marepairPhone" style="width:100px" clear="clear" require="repair">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>
				负责人：<input id="maintenanceShowUserInfo" style="width:270px; cursor: pointer;" class="choose_user_button"
					doFlag="maintenance" doFun="" value="" readonly="readonly" clear="clear" require="repair">
				<input id="maintenanceGetUserStoreId" type="hidden" clear="clear">
				<input id="maintenanceGetUserDetId" type="hidden" clear="clear">
				<input id="maintenanceGetUserId" type="hidden" clear="clear">
				<div id="maintenanceShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 0;float:left;position:relative;">
				期望时间：<select class="repair_hope_select" id="repair_hope_select3" style="width:270px;" onChange="hopeTimeVal('repair_hope_select3', 'repair_hope_time3')" choose="choose">
					<option></option>
				</select>
				<input id="repair_hope_time3" style="margin-left:-273px; left:36px;width:250px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;" clear="clear" require="repair">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				<span style="vertical-align: middle;">短信提醒：</span>
				<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="mashorMessage" checked=true>
			</div>
        </div>
        <div id="taskAffairs" style="display:none">
        	<div style='margin:5px 0 0 0;float: left;'>
				任务类型：<select id="taskrepairTypeRp" style="width:100px;" clear="clear" require="task">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				责任归属：<select id="taskAffairsRepairResponsibility" style="width:100px;" clear="clear" require="task">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				客户姓名：<input id="taskAffairsrepairName" style="width:100px" clear="clear" require="task">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				客户电话：<input id="taskAffairsrepairPhone" style="width:100px" clear="clear" require="task">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>
				负责人：<input id="taskAffairsShowUserInfo" style="width:270px; cursor: pointer;" class="choose_user_button"
					doFlag="taskAffairs" doFun="" value="" readonly="readonly" clear="clear" require="task">
				<input id="taskAffairsGetUserStoreId" type="hidden" clear="clear">
				<input id="taskAffairsGetUserDetId" type="hidden" clear="clear">
				<input id="taskAffairsGetUserId" type="hidden" clear="clear">
				<div id="taskAffairsShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 0;float:left;position:relative;">
				期望时间：<select class="repair_hope_select" id="repair_hope_select4" style="width:270px;" onChange="hopeTimeVal('repair_hope_select4', 'repair_hope_time4')" choose="choose">
					<option></option>
				</select>
				<input id="repair_hope_time4" style="margin-left:-273px; left:36px;width:250px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;" clear="clear" require="task">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				<span style="vertical-align: middle;">短信提醒：</span>
				<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="taskAffairsshorMessage" checked=true>
			</div>

        </div>
        <div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'>跟进内容：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea style="width:370px;height:60px" id="writeFollowNote" clear="clear" require="require"></textarea>
		</div>
        <div style="clear:both"></div>
		<center style="margin:0 0 10px 0;"><sapn style="color:red;">客户可在微信公众号看到 【房屋巡查】 描述，注意语言规范。</sapn></center>
		<center>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('writeFollowDlg')){followTrusteeship(0)}">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#writeFollowDlg').dialog('close')">关闭</a>
			<!-- <a class="easyui-linkbutton" iconcls="icon-ok" onclick="followTrusteeship(0)">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#writeFollowDlg').dialog('close')">关闭</a> -->
		</center>
	</div>

	<div id="downFollowInfo" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<center>
			<div style="margin:0 0 5px 0; float:left;">
				<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="showFollowUpImg()" >查看跟进图片</a>
			</div>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>跟进时间：</td>
						<td colspan="3"><span id="readDownFollowjhfFollowTime" clano="clano"></span></td>
					</tr>
					<tr>
						<td>跟进人：</td>
						<td><span id="readDownFollowjhfUserName" clano="clano"></span></td>
						<td>跟进类型：</td>
						<td><span id="readDownFollowjhfPaymentWay" clano="clano"></span></td>
					</tr>
					<tr>
						<td>跟进归属：</td>
						<td colspan="3"><span id="readDownFollowjhfFollowBelong" clano="clano"></span></td>
					</tr>
					<tr>
						<td>跟进内容：</td>
						<td colspan="3" style="text-align:left"><span id="readDownFollowjhfFollowRemark" clano="clano"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<div id="showFollowUpImg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style="padding:5px 0 0 10px;">
			<span id="followUpImgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div id="followUpImgWrapper" style="margin:10px 0 0 10px;"></div>
	</div>

<!-- 定金设置窗口 -->
<div id="depositManagerDlg" style="padding: 6px; width: 685px; height: 380px;display:none; " title="" class="panel-body panel-body-noborder window-body"><!--  class="easyui-dialog" data-options="closed:true" -->
  <div id="addDeposit">
      <div style="margin:2px 0 0 85px;float: left;" id="selectRenter">
          <a class="easyui-linkbutton l-btn l-btn-small" iconcls="icon-yixiangren" onclick="depositRenter()" id="choseRenterButton" group=""><span >选择客户</span>
          </a>
      </div>
      <div style="margin:5px 0 0 98px;float: left;">
          姓名：<input id="depositRenterName" style="width:110px"  require="require" readonly="readonly">
          <input id="depositRenterId" style="display:none" >
          <input id="depositPopId" style="display:none" >
      </div>
      <div style="margin:5px 0 0 32px;float: left;">
          联系电话：<input id="depositRenterPhone" style="width:150px"  require="require" readonly="readonly">
      </div>
  </div>
  <div style="clear:both"></div>
  <div id="updateDeposit" style="display: none;">
      <div style="margin:5px 0 0 32px;float: left;">
          经手人：<input id="depositUserName" disabled="disabled" >
      </div>
  </div>
  <div style="clear:both"></div>
  <div style="margin:5px 0 0 32px;float: left;">
      经手人：<input id="depositFollowShowUserInfo" style="width:110px;cursor: pointer;" require="add" readonly="readonly" class="choose_user_button" doflag="depositFollow" dofun="" value="" >
      <input id="depositFollowGetUserStoreId" type="hidden" >
      <input id="depositFollowGetUserDetId" type="hidden" >
      <input id="depositFollowGetUserId" type="hidden" >
      <div id="depositFollowShowUserInfoDiv" style="display:none;"></div>
  </div>
  <div style="margin:5px 0 0 47px;float: left;">
      开始时间：<input class="Wdate" id="depositDateBegin" style="width:110px" type="text" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'depositDateEnd\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})" require="require" >
  </div>
  <div style="margin:5px 0 0 32px;float: left;">
      有效时间：<input class="Wdate" id="depositDateEnd" style="width:81px" type="text" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'depositDateBegin\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})" require="require" >
  </div>
  <div style="margin:5px 0 0 5px;float: left;">
      <input id="threeDay" type="button" value="3天" onclick="getNewData(3,1)" style="width: 30px; "  />
      <input id="sevenDay" type="button" value="7天" onclick="getNewData(7,1)" style="width: 30px;"  />
  </div>

  <div id="depositInfoDiv">
      <div style="clear:both"></div>
      <div style="margin:5px 0 0 20px;float: left;">
          下定类型：<select style="width:110px" require="require" id="depositType">
          <option></option>
          <option value="客户定金">客户定金</option>
          <option value="意向预订">意向预订</option>
      </select>
      </div>
      <div style="margin:5px 0 0 47px;float: left;">
          合同开始：<input class="Wdate" id="contractBegin" style="width:110px" type="text" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'contractEnd\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})" require="require" >
      </div>
      <div style="margin:5px 0 0 32px;float: left;">
          合同结束：<input class="Wdate" id="contractEnd" style="width:81px" type="text" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'contractBegin\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})" require="require" >
      </div>
      <div style="margin:5px 0 0 5px;float: left;">
          <input id="thirtyDay" type="button" value="30天" onclick="getNewData(365,2)" style="width: 30px; height: 20px; padding: 0 0 0 1px" autocomplete="on">
          <input id="ninetyDay" type="button" value="90天" onclick="getNewData(365,3)" style="width: 30px; height: 20px; padding: 0 0 0 1px" autocomplete="on">
      </div>
  </div>
  <div style="clear:both"></div>
  <div style="margin:5px 0 0 23px;float: left;">
      定金(元)：<input type="number" data-type="money" mType="定金"
                   mNote="客户下定-定金：" bigType="主营类" id="depositGet" style="width:110px" require="require" >
  </div>
  <div style="margin:5px 0 0 50px;float: left;">
      租金(元)：<input type="number" data-type="money" mType="租金"
                   mNote="客户下定-租金：" bigType="主营类" id="rent" style="width:110px" require="require" >
  </div>
  <div style="margin:5px 0 0 35px;float: left;">
      其它(元)：<input type="number" data-type="money" mType="其它费用"  mNote="客户下定-其它费用：" bigType="其他类" id="otherFee" style="width:150px" require="require" >
  </div>
  <div style="clear:both"></div>
  <div style="margin:5px 0 0 11px;float: left;">
      物管费(元)：<input type="number" data-type="money" mType="物业管理费"
                    mNote="客户下定-物业管理费：" bigType="能源类" id="propertyFee" style="width:110px" require="require" >
  </div>
  <div style="margin:5px 0 0 38px;float: left;">
      网络费(元)：<input type="number" data-type="money"  mType="网络费"
                    mNote="客户下定-网络费：" bigType="能源类"  id="netFee" style="width:110px" require="require" >
  </div>
  <div style="margin:5px 0 0 23px;float: left;">
      电视费(元)：<input type="number" data-type="money" id="tvFee" mType="电视"
                    mNote="客户下定-电视：" bigType="能源类" style="width:150px" require="require" >
  </div>
  <div style="clear:both"></div>
  <div style="margin:5px 0 0 11px;float: left;">
      服务费(元)：<input type="number" data-type="money" id="serverFee"  mType="佣金服务费"
                    mNote="客户下定-佣金服务费：" bigType="主营类" style="width:110px" require="require" >
  </div>
  <div style="margin:5px 0 0 26px;float: left;">
      房屋押金(元)：<input type="number" data-type="money" mType="房屋押金"
                     mNote="客户下定-房屋押金：" bigType="押金类"  id="housingDeposit" style="width:110px" require="require" >
  </div>
  <div style="margin:5px 0 0 11px;float: left;">
      门卡押金(元)：<input type="number" data-type="money"  mType="门卡押金"
                     mNote="客户下定-门卡押金：" bigType="押金类" id="doorcardDeposit" style="width:150px" require="require" >
  </div>
  <div style="clear:both"></div>
  <div style="margin:5px 0 0 0px;float: left;">
      水电押金(元)：<input type="number" data-type="money" mType="水电押金"
                     mNote="客户下定-水电押金：" bigType="押金类" id="hydropowerDeposit" style="width:110px" require="require" >
  </div>
  <div style="margin:5px 0 0 25px;float: left;">
      其他押金(元)：<input type="number" data-type="money"  mType="其他押金"
                     mNote="客户下定-其他押金：" bigType="押金类" id="otherDeposit" style="width:110px" require="require" >
  </div>
  <div style="clear:both"></div>
  <div style="margin:5px 0 0 20px;float: left;">
      账户类型：<select style="width:110px" onchange="changeWay1(0)" class="add_financial_way" id="depositFinancialWay" require="require">
      <option></option>
      <!-- <option value="0">现金A类</option><option value="1">现金B类</option><option value="2">现金备用</option><option value="3">债权</option><option value="4">负债</option> -->
      </select>
  </div>
  <div style="margin:5px 0 0 46px;float: left;">
      账户名称：<select style="width:110px" id="depositAccountName" require="require" onchange="getAccountId1()">
      <option></option>
  </select>
  </div>
  <div style="margin:5px 0 0 32px;float: left;">
      收支方式：<select style="width:150px" require="require" class="financial_payType" id="depositPayType">
      <option></option>
     </select>
  </div>
  <div style="clear:both"></div>
  <div style="margin:5px 0 0 20px;float: left;">
      账户归属：<input style="width:110px" readonly="readonly" id="depositFinancialAccountBelong" >
  </div>
  <div style="margin:5px 0 0 46px;float: left;">
      账户号码：<input style="width:110px" readonly="readonly" id="depositFinancialAccountNums" >
      <input style="display:none" id="depositFinancialBankNums" >
  </div>
	  <div style="margin:5px 0 0 32px;float: left;">
      票据编号：<input type="text" id="depositBillNumber" style="width:150px" >
  </div>
  <div style="clear:both"></div>
  <div style="margin:5px 0 0 20px;float: left;">
     定金备注：<textarea id="depositRemark" rows="3" cols="91"></textarea>
  </div>
  <div style="clear:both"></div>
  <br>
  <center>
      <input id="isPrint" type="checkbox" value="" ><span id="printTips">打印定金票据</span>
      <a class="easyui-linkbutton l-btn l-btn-small" iconcls="icon-save" onclick="addDeposit()" id="addDepositSaveButton" group=""><span >保存</span></a>
      <a class="easyui-linkbutton l-btn l-btn-small" iconcls="icon-cancel" onclick="$('#depositManagerDlg').dialog('close')" group="" id=""><span >关闭</span></a>
	  <a class="easyui-linkbutton l-btn l-btn-small" onclick="updateDeposit()" id="updateDepositSaveButton"  ><span>取消下定</span></a>
  </center>
</div>
	<!-- 定金-选择租客对话框 -->
	<div id="choseRenter" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style='margin:0 0 10px 10px;'>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				客户类型：<select id="lowerDepositPersonnel" onchange="queryRenter(1,0);">
					<option value="1">意向人</option>
					<option value="2">客户</option>
				</select>
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				姓名：<input id="searchRenterName" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryRenter(1, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				电话：<input id="searchRenterPhone" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryRenter(1, 0)')" style="width:100px">
			</div>
			<a class="easyui-linkbutton" onclick="addIntended()" iconCls="icon-add-zuke" plain="true" id="addIntendedButton">添加租客意向人</a>
		</div>
		<div style="clear:both"></div>
		<!-- 选择租客列表 -->
		<table id="choseRenterTable"></table>
		<div id="choseRenterPageDiv" style="width:99%"></div>
	</div>
	<!-- 定金-选择租客对话框-添加租客意向人 -->
	<div id="addIntendedDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<fieldset>
			<legend>人口信息</legend>
			<div style="margin:0 0 0 24px;float:left">
				姓名：<input id="intendedPopName" style="width:100px">
			</div>
			<div style="margin:0 0 0 34px;float:left">
				电话：<input id="intendedPopPhone" style="width:100px">
			</div>
		</fieldset>
		</br>
		<center>
			<a id="updateSaveButton" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddIntended()" id="saveAddIntended">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addIntendedDlg').dialog('close')">取消</a>
		</center>
	</div>

	<!-- 业主短信息窗口 -->
	<div id="sendMessageDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<fieldset>
			<legend>基本信息</legend>
			<div style="margin:0 0 0 12px;float:left">
				短信类型：<select id="sendMessageType" style="width:100px" onchange="resizeSendMessage()" require="require">
					<option></option>
					<option value="1">定金失效</option>
				</select>
			</div>
			<div style="margin:0 0 0 12px;float:left">
				发送人类型：<select id="sendMessageManType" onchange="changeSendMan()" style="width:120px" require="require"></select>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 36px;float:left">
				姓名：<input id="sendMessageName" style="width:100px" readonly="readonly" require="require">
				<input id="sendMessageRenterId" style="display:none">
				<input id="sendMessageLandlordId" style="display:none">
				<input id="sendMessageHouseStoreId" style="display:none">
				<input id="sendMessagePopId" style="display:none">
				<input id="sendMessageRoomAddress" style="display:none">
			</div>
			<div style="margin:5px 0 0 24px;float:left">
				电话号码：<input id="sendMessagePhone" style="width:120px" readonly="readonly" require="require">
			</div>
		</fieldset>
		<div id="sendMessageSendInfo">
			<fieldset>
				<legend>发送内容</legend>
				<div id="sendMessageDivOne" style="display:none">
					<div style="margin:5px 0 0 24px;float:left">
						租金：<input id="sendMessageRentMoney" style="width:80px" onkeyup="changeSendPrice(this)" moneyType="租金">
					</div>
				</div>
			</fieldset>
		</div>
		</br>
		<center>
			<div id="sendMessageTips" style="height:20px;color:red;"></div>
			<a class="easyui-linkbutton" iconcls="icon-yulan" onclick="if(validateRequire('sendMessageDlg')){previewSendMessage()}"> 示例预览</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('sendMessageDlg')){doSendMessage()}">保存</a>
			<!-- <a class="easyui-linkbutton" iconcls="icon-send" onclick="doSendMessage()"> 发送</a> -->
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#sendMessageDlg').dialog('close')">取消</a>
		</center>
	</div>

	<div id="previewSendMessageDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style="margin:5px 0 0 12px;float:left">
			短信类型：<input id="previewSendMessageType" style="width:150px"
				readonly="readonly">
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
	<div id="updateManagerUserDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div id="updateManagerUserDlg1">
		<fieldset>
			<legend>楼盘名称与现房管员</legend>
			<div style='margin:5px 0 0 0px;float: left;'>
				楼盘名称：<input style="width:400px" id="turnoverAddress"
					disabled="disabled">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				原房管员：<input style="width:200px" id="turnoverStore" disabled="disabled">
			</div>
		</fieldset>
		</div>
		<fieldset>
			<legend>新房管员</legend>
			新房管员：<input id="pickHsManagerShowUserInfo" style="width:200px;cursor: pointer;"
					readonly="readonly" class="choose_user_button" doFlag="pickHsManager" doFun="" value="" >
				<input id="pickHsManagerGetUserStoreId" type="hidden">
				<input id="pickHsManagerGetUserDetId" type="hidden">
				<input id="pickHsManagerGetUserId" type="hidden">
				<div id="pickHsManagerShowUserInfoDiv" style="display:none;"></div>
		</fieldset>
		<div style="clear:both"></div>
		</br>
		<div id="turnoverTips" style="height:20px;width:100%;"></div>
		<div style="text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateManagerUser()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateManagerUserDlg').dialog('close')">关闭</a>
		</div>
	</div>

	<!-- 合租房预生成 -->
	<div id="splitFlatShareDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<fieldset>
			<legend>合租房设置</legend>
			<div style='margin:5px 0 5px 10px;float: left;'>
				楼盘名称：<input style="width:250px" id="splitFlatShareAddress" disabled="disabled">
			</div>
			<div style='margin:5px 0 5px 10px;float: left;' id="splitFlatShareNumsDiv">
				合租房数量：<input style="width:60px" id="splitFlatShareNums" type="number" min="2" max="9999" step="1" onkeyup="if(value >9999){value =9999;}">
			</div>
			<div style='margin:5px 0 5px 10px;float: left;' id="setSplitFlatShareNumsDiv">
				合租房数量：<input style="width:40px" id="setSplitFlatShareNums" disabled="disabled"> <input style="display:none" id="setSplitFlatShareNums1">
			</div>
			<div style='margin:3px 0 5px 10px;float: left;' id="splitFlatShareButtonDiv">
				<a class="easyui-linkbutton" iconcls="icon-edit" onclick="newSplitFlatShare()">预生成</a>
			</div>
			<div style='margin:3px 0 5px 10px;float: left;' id="setSplitFlatShareButtonDiv">
				<a class="easyui-linkbutton" iconcls="icon-add" onclick="addSplitFlatShare()">继续新增一间合租房</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="deleteAddSplitFlatShare()">取消新增一间合租房</a>
				<a class="easyui-linkbutton" iconcls="icon-huanyuan" id="reflashSplitFlatShare" onclick="reflashSplitFlatShare()">还原为整租房</a>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>合租房详细设置</legend>
			<div id="splitFlatShareDiv" style="width:100%;height:300px;overflow-x: hidden;overflow-y: auto ;"></div>
		</fieldset>
		<div style="clear:both"></div>
		<div style="text-align: center;">
			</br>
			<div id="splitFlatShareTips" style="height:20px;width:100%;color:red"></div>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doSplitFlatShare()" id="doSplitFlatShareButton">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doSetSplitFlatShare()" id="doSetSplitFlatShareButton">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#splitFlatShareDlg').dialog('close')">关闭</a>
		</div>
		<!-- <a class="easyui-linkbutton" iconcls="icon-save" onclick="doSplitFlatShare(1)" id="doSplitFlatShareButton1">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="doSplitFlatShare(2)" id="doSplitFlatShareButton2">保存</a>
		<a class="easyui-linkbutton" onclick="$('#splitFlatShareDlg').dialog('close')" iconcls="icon-cancel">关闭</a> -->
	</div>
	<%--暂时没发现有用到2019.04.22------------------------------2019.6--%>
	<!-- 合租房继续拆分、删除 -->
	<%--<div id="setSplitFlatShareDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<fieldset>
			<legend>合租房设置</legend>
			<div style='margin:5px 0 5px 10px;float: left;'>
				楼盘名称：<input style="width:250px" id="setSplitFlatShareAddress" disabled="disabled">
			</div>
			<div style='margin:5px 0 5px 10px;float: left;'>
				合租房数量：<input style="width:40px" id="setSplitFlatShareNums" disabled="disabled"> <input style="display:none" id="setSplitFlatShareNums1">
			</div>
			<div style='margin:3px 0 5px 10px;float: left;'>
				<a class="easyui-linkbutton" iconcls="icon-add" onclick="addSplitFlatShare()">继续新增一间合租房</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="deleteAddSplitFlatShare()">取消新增一间合租房</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" id="reflashSplitFlatShare" onclick="reflashSplitFlatShare()">还原为未拆分</a>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>合租房信息</legend>
			<div id="setSplitFlatShareDiv" style="width:100%;height:300px;"></div>
		</fieldset>
		<div style="clear:both"></div>
		<div style="text-align: center;">
			</br>
			<div id="setSplitFlatShareTips" style="height:20px;width:100%;color:red"></div>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doSetSplitFlatShare()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#setSplitFlatShareDlg').dialog('close')">关闭</a>
		</div>
	</div>--%>


	<!-- 短信信息详细窗口 -->
	<div id="readonlyMessageDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style='margin:5px 0 0 2px;float: left;display:none;'>
			短信编号：<input style="width:130px" readonly='readonly' class="messageId">
			<input style="display:none" class='message_index'>
		</div>
		<div style='margin:5px 0 0 6px;float: left;display:none;'>
			类&emsp;&emsp;别：<input style="width:130px" readonly='readonly' class="messageType">
		</div>
		<div style='margin:5px 0 0 6px;float: left;'>
			发送状态：<input style="width:130px" readonly='readonly' class="messageStatus">
		</div>
		<div style='margin:5px 0 0 6px;float: left;'>
			处理状态：<input style="width:130px" readonly='readonly' class="messageTreatmentStatus">
		</div>
		<div style='clear:both;'>
		<div style='margin:5px 0 0 6px;float: left;'>
			姓&emsp;&emsp;名：<input style="width:130px" readonly='readonly' class="messageName">
		</div>
		<div style='margin:5px 0 0 6px;float: left;'>
			电&emsp;&emsp;话：<input style="width:130px" readonly='readonly' class="messagePhone">
		</div>
		<div style='clear:both;'>
		<div style='margin:5px 0 0 6px;float: left;'>
			短信条数：<input style="width:130px" readonly='readonly' class="messageCount">
		</div>
		<div style='margin:5px 0 0 6px;float: left;'>
			发送时间：<input style="width:130px" readonly='readonly' class="messageTime">
		</div>
		<div style='clear:both;'>
		<div style='margin:5px 0 0 6px;float: left;'>短信内容：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea style="width:326px;height:100px;" readonly='readonly' class="messageContent"></textarea>
		</div>
		<div style="display:none;">
			<div style='margin:5px 0 0 5px;float: left;'>接口返回：</div>
			<div style='margin:5px 0 0 1px;float: left;'>
				<textarea style="width:326px;height:100px;" readonly='readonly' class="messageField"></textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="display:none;">
			<center id='readStatus'>
				<a class="easyui-linkbutton" onclick="$('#readonlyMessageDlg').dialog('close')" iconcls="icon-cancel" onclick="">关闭</a>
				<a display="none" class="easyui-linkbutton" iconcls="icon-ok" onclick="updateShotMessage()">已读</a>
			</center>
		</div>
	</div>
	<!-- 迁入资产对话框 -->
	<div id="moveInAssetsDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
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
			<legend>资产列表</legend>
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
				&emsp;经手人：<input id="pickHsManagerinShowUserInfo" style="width:200px;cursor: pointer;" must="must"
					readonly="readonly" class="choose_user_button" doFlag="pickHsManagerin" doFun="" value="">
				<input id="pickHsManagerinGetUserStoreId" type="hidden">
				<input id="pickHsManagerinGetUserDetId" type="hidden">
				<input id="pickHsManagerinGetUserId" type="hidden">
				<div id="pickHsManagerinShowUserInfoDiv" style="display:none;"></div>
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
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveInAssets(1)" id="doMoveAddHrButton1">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveInAssets(2)" id="doMoveAddHrButton2">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moveInAssetsDlg').dialog('close')">取消</a>
		</center>
	</div>
	<!-- 迁出资产 -->
	<div id="moveOutAssetsDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
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
			经手人：<input id="pickHsManagertShowUserInfo" style="width:200px;cursor: pointer;" must="must"
			 readonly="readonly" class="choose_user_button" doFlag="pickHsManagert" doFun="" value="">
				<input id="pickHsManagertGetUserStoreId" type="hidden">
				<input id="pickHsManagertGetUserDetId" type="hidden">
				<input id="pickHsManagertGetUserId" type="hidden">
				<div id="pickHsManagertShowUserInfoDiv" style="display:none;"></div>


		</div>
        <div class="clearfix">
            <div style="margin:5px 0 5px 34px;float:left;">迁移原因：</div>
            <div style="margin:5px 0 5px 0;float:left;">
                <textarea id="move_to_asset_reason" style="width:400px;height:50px;"
                    clear="clear" placeholder="可选"></textarea>
            </div>
        </div>
		<center style="margin:15px 0 5px 5px;">
			<!-- <a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveOutAssets()">保存</a> -->

			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveOutAssetsButton(1)" id="doMoveOutAssetsButton1">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doMoveOutAssetsButton(2)" id="doMoveOutAssetsButton2">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#moveOutAssetsDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 归属关联列表显示  -->
	<div id="choseHouseAssetDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
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
					楼盘名称：<input id="searchAddCommunityAsset" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;choseHouseDataAsset(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchAddBuildingAsset" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;choseHouseDataAsset(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchAddDoorplatenoAsset" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;choseHouseDataAsset(1)')" style="width:100px;">
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
					项目名称：<input id="searchVirtualName2" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;choseHouseDataAsset(1)')" style="width:100px;">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					项目联系人：<input id="searchVirtualContact2" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;choseHouseDataAsset(1)')" style="width:100px;">
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
					<legend>家私电器</legend>
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
				<left>
					<div id="_asset_btn" style="margin:10px 0 0 10px;display:none;">
						<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemove_asset_img()">删除</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel_asset_img()">取消</a>
					</div>
				</left>
				<div id="_asset_imgWrapper" style="margin:10px 0 0 10px;"></div>
				<div style="clear:both"></div>

			</div>
		</div>
	</div>
	<!-- 资产跟进详情 -->
	<div id="assetFollowInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>跟进时间：</td>
						<td colspan="3"><span id="readDownFollowtime"></span></td>
					</tr>
					<tr>
						<td>跟进人：</td>
						<td><span id="readDownFollowregistrantName"></span></td>
						<td>经手人：</td>
						<td><span id="readDownFollowagentName"></span></td>
					</tr>
					<tr>
						<td>跟进内容：</td>
						<td colspan="3" style="text-align:left"><span id="readDownFollowtext"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	<!-- 添加资产 -->
	<div id="addAssetDlg2" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>资产信息</legend>
			<div style="margin:0 0 5px 5px;float:left;">
				资产所属：<select id="add_asset_type2" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				使用情况：<select id="add_asset_use2" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				资产状态：<select id="add_asset_status2" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;价格：<input id="add_asset_price2" style="width:130px;" clear="clear" must="must" placeholder="必填" placeholder="必填"
					onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
					onfocus="if (value =='0.00') {value = ''}">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				资产类型：<select id="add_asset_classify2" style="width:130px;" choose="choose" must="must" onchange="changeAssetsType2('add_asset_')">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;名称：<select id="add_asset_name2" style="width:130px;" choose="choose" must="must">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;品牌：<input id="add_asset_brand2" style="width:130px;" clear="clear">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				&emsp;&emsp;型号：<input id="add_asset_model2" style="width:130px;" clear="clear">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
			<div style="margin:0 0 5px 0;float:left;">
				<textarea id="add_asset_remark2" style="width:325px;height:50px;" clear="clear"></textarea>
			</div>
			<div style="margin:3px 0 5px 5px;float:left;">
				&emsp;&emsp;数量：<input id="add_asset_number2" style="width:130px;" clear="clear" must="must" placeholder="必填"
					onkeyup="this.value=this.value.replace(/\D/g,'')"
					onafterpaste="this.value=this.value.replace(/\D/g,'')">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				<a class="easyui-linkbutton" iconcls="icon-add" onclick="addToDataGrid2()">添加</a>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="cleanDataGrid2()">清除</a>
			</div>
		</fieldset>
		<div id="addAssetTable2Div2" style="margin:5px 0 5px 0;">
			<table id="addAssetTable2"></table>
		</div>
		<center style="margin:10px 0 5px 5px;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddAsset2()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addAssetDlg2').dialog('close')">关闭</a>
		</center>
	</div>

	<!-- 能源卡号添加、修改窗口  -->
	<div id="addCardDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<fieldset>
			<legend>
				卡号归属
			</legend>
			<input style="display:none" id='addHouseStoreId'>
			<input style="display:none" id='jdcnId'>
			<div style='margin:5px 0 0 2px;float: left;'>
				房屋地址：
				<input style="width:200px" id="addAddress" readonly>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 2px;float: left;' id='landNameDiv'>
				房东姓名：
				<input style="width:100px" id="landName" readonly>
			</div>
			<div style='margin:5px 0 0 2px;float: left;' id='landIdCardDiv'>
				身份证号：
				<input style="width:200px" id="landIdCard" readonly>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 2px;float: left;' id='landTelDiv'>
				房东电话：
				<input style="width:100px" id="landTel" readonly>
			</div>
		</fieldset>
		<fieldset>
			<legend>
				卡号信息
			</legend>
			<div style="margin:5px 0 0 2px;float:left;position:relative;">
				&emsp;&emsp;卡名：
				<select id="fromic" style="width:100px;"
					onChange="document.getElementById('cardName').value=document.getElementById('fromic').options[document.getElementById('fromic').selectedIndex].value;">
					<option value="" style="color:#c2c2c2;">---请选择---</option>
					<option value="水卡">水卡</option>
					<option value="电卡">电卡</option>
					<option value="气卡">气卡</option>
					<option value="电视卡">电视卡</option>
				</select><input type="text" id="cardName" require="require"
					style="position:absolute;left:64px;width:80px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;">
			</div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardNum">&emsp;&emsp;卡号：</label>
				<input style="width:200px;" id="cardNum" require="require">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardPeople">&emsp;归属人：</label>
				<input style="width:100px;" id="cardPeople">
			</div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardPeopleId">身份证号：</label>
				<input style="width:200px;" id="cardPeopleId">
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardTel">联系电话：</label>
				<input style="width:100px;" id="cardTel">
			</div>
			<div style="margin:5px 0 0 2px; float:left;">
				<label for="cardRemark">&emsp;&emsp;表号：</label>
				<input style="width:200px;" id="jdcnMeterNumber" require="require">
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
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addCardDlg')){doAddCard()}" id="addCardButton">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addCardDlg')){doUpdateCard()}" id="updateCardButton">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addCardDlg').dialog('close')">关闭</a>
		</center>
	</div>

	<!-- 收支详情 -->
	<div id="financialInfoDlg" style="padding:6px;display:none;">
		<fieldset>
			<legend>收支归属</legend>
			<div style='margin:5px 0 0 12px;float: left;'>
				流水号：<input style="width:126px" readonly="readonly"
						class="financialInfo_jfFinancialCoding">
			</div>
			<div style='margin:5px 0 0 0;float: left;display:none'>
				费用关联：<input style="width:60px" readonly='readonly'
					class="financialInfo_houseCoding"> <input
					style="display:none" class='financialInfo_jfId'><input
					style="display:none" class='financialInfo_jfStrikeBalanceEncoding'>
				<input style="display:none" class='financialInfo_index'>
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				归属类型：<input style="width:80px" readonly='readonly'
					class="financialInfo_jfTheOwnershipType">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				归属名称：<input style="width:80px" readonly="readonly"
					class="financialInfo_jfBelongingToTheName"> <input
					style="display:none" class="financialInfo_belongId">
			</div>
			<div style='margin:5px 0 0 2px;float: left;'>
				记账日期：<input style="width:70px" class="financialInfo_jfBillingDate"
					readonly='readonly'>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				费用归属：<input style="width:338px" readonly='readonly'
					class="financialInfo_jfAccountingWhy">
			</div>
		</fieldset>
		<fieldset>
			<legend>收支信息</legend>
			<div style='margin:5px 0 0 0px;float: left;'>
				账户类型：<input readonly="readonly" style="width:90px"
					class="financialInfo_jfClosedWay">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户名称：<input readonly="readonly" style="width:130px"
					class="financialInfo_bankName">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户号码：<input readonly="readonly" style="width:180px"
					class="financialInfo_bankNums">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				收支性质：<input readonly="readonly" style="width:90px"
					class="financialInfo_jfNatureOfThe">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支种类：<input readonly="readonly"
					class="financialInfo_jfAccountingSpecies" style="width:130px">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户归属：<input readonly="readonly" style="width:180px"
					class="financialInfo_bankBelong">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 24px;float: left;'>
				金额：<input readonly="readonly" style="width:90px"
					class="financialInfo_jfSumMoney">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支方式：<input readonly="readonly" style="width:130px"
					class="financialInfo_payType">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				归属周期：<input readonly="readonly" class='financialInfo_belongBegin'
					style="width:80px"> 到 <input readonly="readonly"
					class='financialInfo_belongEnd' style="width:81px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>
				账户余额：<input readonly="readonly" style="width:90px"
					class="financialInfo_nowBalance">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				票据编号：<input readonly="readonly" style="width:130px"
					class="financialInfo_nums">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				凭证号：<input style="width:180px" readonly="readonly"
					class="financialInfo_jfCertificateNumber">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>收支原因：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea readonly="readonly" style="width:540px;height:47px;"
                          class="financialInfo_jfFinanNote"></textarea>
                    </div>
                    <div style="clear:both"></div>
                    <div id="jfOperationRecordsDiv">
                        <div style='margin:5px 0 0 0;float: left;'>操作记录：</div>
                        <div style='margin:5px 0 0 0;float: left;'>
					<textarea style="width:540px;height:52px" readonly="readonly"
						class="financialInfo_jfOperationRecords"></textarea>
				</div>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>
				其它信息
			</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				财务状态：<input style="width:80px" readonly="readonly"
					class="financialInfo_jfAuditState">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				冲账状态：<input style="width:80px" readonly="readonly"
					class="financialInfo_jfStrikeAbalanceStatus">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>
				经手人：<input style="width:80px" readonly='readonly'
					class="financialInfo_handlersName">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				记账人：<input style="width:80px" readonly="readonly"
					class="financialInfo_cashierPeopleName">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				审核人：<input style="width:80px" readonly="readonly"
					class="financialInfo_reviewerName">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				复核人：<input style="width:80px" readonly="readonly"
					class="financialInfo_reviewOneName">
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<div style='margin:10px 0 0 0;width:100%;text-align:center;'>
			<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)"> 上一条</a>
			<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)"> 下一条</a>
		</div>
	</div>

	<!-- 查看房东账单信息 -->
	<div id="payableInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'payableInfoDlg', 'payableInfoTable', 'jciId', 'jciImgPath', 'queryInstallmentById', 'deleteInstallmentPic')">付款凭证</a>
		<a class="easyui-linkbutton" iconCls="icon-lishipiaojudayin" plain="true" onclick="lookatThePrintBill()">票据打印</a>
		<fieldset>
			<legend>账单信息</legend>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;房东：<input style="width:100px;" id="landlordName1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;地址：<input style="width:265px;" id="address1" readonly>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;期数：<input style="width:100px;" id="jciPeriods1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				开始周期：<input style="width:100px;" id="jciBeginPeriods1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				结束周期：<input style="width:100px;" id="jciEndPeriods1" readonly>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 5px;float:left;">
				应付租金：<input style="width:100px;" id="jciMoney1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				欠结金额：<input style="width:100px;" id="hsBaseMoney1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				实际应付：<input style="width:100px;" id="shouldPayMoney1" readonly>
			</div>
			<div style="clear:both"></div>
			<div style="margin:5px 0 0 5px;float:left;">
				账单状态：<input style="width:100px;" id="jciState1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				特殊编号：<input style="width:265px;" id="jciSpecialNumber1" readonly>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>房东账户</legend>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;户名：<input style="width:100px" id="bankName1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;银行：<input style="width:100px" id="bankType1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;&emsp;账号：<input style="width:100px" id="bankNum1" readonly>
			</div>
		</fieldset>
		<fieldset id="account-info">
			<legend>付款账户</legend>
			<input style="display:none" id="paymentAccountId1">
			<div style="margin:5px 0 0 5px;float:left;">
				付款账户：<select style="width:150px;" id="paymentAccountType1" onchange="changeWay()">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户名称：<select style="width:150px" id="paymentAccountName1" onchange="getAccountId()">
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>
				账户号码：<input style="width:150px" id="paymentAccountNum1" readonly>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户归属：<input style="width:150px" id="paymentAccountBelong1" readonly>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 5px;float: left;'>
				收支方式：<select style="width:150px" id="paymentMethod1">
					<option></option>
				</select>
			</div>
			<div style="margin:3px 0 0 10px;float:left;position:relative;" id="sentMsgDiv1">
				是否发送短信提醒房东：<input id="sentMsg1" type="checkbox" checked style="width:14px;height:14px;margin-left:0;position:relative;top:3px;">
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<fieldset>
			<legend>审核信息</legend>
			<input style="display:none" id='payable_index'>
			<div style="margin:5px 0 0 5px;float:left;">
				审核状态：<input style="width:100px;" id="auditStatus1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;审核人：<input style="width:100px;" id="auditName1" readonly>
			</div>
			<div style="margin:5px 0 0 5px;float:left;">
				&emsp;复核人：<input style="width:100px;" id="reviewName1" readonly>
			</div>
			<div style="clear:both"></div>
		</fieldset>
		<div style='margin:10px 0 0 0;'>
			<center>
				<div class="errorMsg" style="height:20px;color:red;"></div>
				<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext3(0)">上一条</a>
				<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext3(1)">下一条</a>
			</center>
		</div>
	</div>

	<!-- 业主退房 -->
	<div id="landlordCheckoutDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style='margin:5px 0 0 34px;'>
			退房性质：<select id="landlordCheckoutWhy" style="width:100px" require="require">
				<option></option>
			</select>
		</div>
		<div style='margin:5px 0 0 34px;float: left;'>退房原因：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea id="landlordCheckoutReason" style="width:270px;height:60px"></textarea>
		</div>
		<div style="clear:both"></div>
		<center>
			<div id="landlordCheckoutTips" style="height:20px;color:red;"></div>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('landlordCheckoutDlg')){doLandlordCheckout()}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#landlordCheckoutDlg').dialog('close')">关闭</a>
		</center>
	</div>

	<!-- 添加维修对话框 -->
	<div id="addRepairDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<input class="repair_houseRentCoding" style="display:none" clear="clear">
		<input class="repair_houseStoreCoding" style="display:none" clear="clear">
		<input class="repair_houseCoding" style="display:none" clear="clear">
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			维保类型：<select class="repair_type_rp" style="width:100px;" clear="clear" require="require">
				<option></option>
			</select>
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			费用归属：<select class="repair_responsibility" style="width:100px;" clear="clear" require="require">
				<option></option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			客户姓名：<input class="repair_name" style="width:100px" clear="clear" require="require">
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			客户电话：<input class="repair_phone" style="width:100px" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 24px;float: left;'>
			负责人：<input id="doRepairShowUserInfo" style="width:270px;cursor: pointer;" readonly="readonly" class="choose_user_button" doFlag="doRepair" doFun="" value="" clear="clear" require="require">
			<input id="doRepairGetUserStoreId" type="hidden" clear="clear">
			<input id="doRepairGetUserDetId" type="hidden" clear="clear">
			<input id="doRepairGetUserId" type="hidden" clear="clear">
			<div id="doRepairShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 12px;float:left;position:relative;">
			期望时间：<select class="repair_hope_select" id="repair_hope_select" style="width:270px;"
				onChange="hopeTimeVal('repair_hope_select', 'repair_hope_time')" choose="choose">
				<option></option>
			</select>
			<input id="repair_hope_time" style="margin-left:-273px; left:36px;width:250px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>维保描述：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea class="repair_event_rp" style="width:270px;height:60px" clear="clear" require="require"></textarea>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<sapn style="color:red">客户可在微信公众号看到此描述，注意语言规范。</sapn>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 10px;float:left'>
			<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div style='margin:10px 0 0 10px;float: left;'>是否短信提醒：</div>
		<div style='margin:10px 0 0 0;float: left;'>
			<input type="checkbox" id="shorMessageRemind" checked=true>
		</div>
		<div style="clear:both"></div>
		<div id="addRepairSave" style="margin:10px 0 10px 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addRepairDlg')){doAddRepair(0)}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRepairDlg').dialog('close')">取消</a>
		</div>
	</div>

	<!-- 维修详细窗口 -->
	<div id="repairInfoDlghr" class="easyui-dialog" style="padding:6px" data-options="closed:true">
		<div style='margin:5px 0 0 5px;float: left;'>
			楼盘名称：<input readonly='readonly' class="repair_address2" style="width:295px">
			<input class="repair_id2" style="display:none">
			<input id="repair_index2" style="display:none">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			维修类型：<input readonly='readonly' class="repair_type2"
				style="width:100px">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			维修分类：<input readonly='readonly' class="repair_houseType2"
				style="width:100px">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float: left;'>
			客户姓名：<input readonly='readonly' class="repair_contacis2"
				style="width:100px">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			客户电话：<input readonly='readonly' class="repair_contacisPhone2"
				style="width:130px">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			费用归属：<input readonly='readonly' id="repair_responsibility2"
				style="width:100px">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			维修状态：<input readonly='readonly' class="repair_state2"
				style="width:100px">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float: left;'>
			登记人：&emsp;<input readonly='readonly' class="repair_userName2"
				style="width:100px"> <input class="repair_userId2"
				style="display:none">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			登记时间：<input readonly='readonly' class="repair_time2"
				style="width:130px">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			期望时间：<input readonly='readonly' class="repair_hope_time2"
				style="width:100px">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			收取费用：<input readonly='readonly' class="repair_toll_rp2"
				style="width:100px">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float: left;'>
			负责人：&emsp;<input readonly='readonly' class="repair_peopleName2"
				style="width:100px"> <input class="repair_peopleId2"
				style="display:none">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			领取时间：<input readonly='readonly' class="repair_receive2"
				style="width:130px">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			回访结果：<input readonly='readonly' class="repair_returnning2"
				style="width:100px">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			维保编号：<input readonly='readonly' class="rep_number2"
				style="width:100px">
		</div>
		<div style="clear:both"></div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float: left;'>维修描述：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea readonly='readonly' class="repair_event2"
                      style="width:625px;height:40px"></textarea>
                </div>
                <div style="clear:both"></div>
                <div style='float: right;'>
                    <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'repair3', 'repairInfoTable', 'repId', 'repImgPath', 'queryRepairById', 'deleteRepairPic')">附件</a>
                    <span id="repImgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
                </div>
                <div style="clear:both"></div>
                <div style='margin:5px 0 0 5px;width:99%;height:127px;'>
                    <table id="showProgressTable2"></table>
                </div>
                <div style='margin:5px 0 0 5px;width:99%;height:77px;'>
                    <table id="showReturningTable2"></table>
                </div>
                <div class="clearfix" style="margin:5px 0 0 0;">
                    <center>
                        <a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'repair_index2', 'repairInfoTable', 'repairInfoDlghr', 'queryRepairInfo(row)');">上一条</a>
                        <a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'repair_index2', 'repairInfoTable', 'repairInfoDlghr', 'queryRepairInfo(row)');">下一条</a>
                    </center>
                </div>
            </div>
            <!-- 维保回访  -->
            <div id="showReturningDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
                <center>
                    <table class="xwtable" style="margin-top:10px;">
                        <tbody>
                        <tr>
                            <td>回访时间：</td>
                            <td colspan="3"><span style="color:blue" id="readShowReturningretTime"></span></td>
                        </tr>
                        <tr>
                            <td>处理人：</td>
                            <td ><span style="color:blue" id="readShowReturninguserName"></span></td>
                            <td>回访结果：</td>
                            <td><span style="color:blue" id="readShowReturningretResult"></span></td>
                        </tr>
                        <tr>
                            <td>备注：</td>
                            <td colspan="3" style="text-align:left"><span
                                    id="readShowReturningrteRemark"></span></td>
                        </tr>
                        </tbody>
                    </table>
                </center>
            </div>
            <!-- 维保进展 -->
            <div id="showProgressDlg2" style="padding:6px" class="easyui-dialog" data-options="closed:true">
                <center>
                    <table class="xwtable" style="margin-top:10px;">
                        <tbody>
                        <tr>
                            <td>进展时间：</td>
                            <td colspan="3"><span style="color:blue" id="readShowProgress2proTime"></span></td>
                        </tr>
                        <tr>
                            <td>处理人：</td>
                            <td ><span style="color:blue" id="readShowProgress2userName"></span></td>
                            <td>进展状态：</td>
                            <td><span style="color:blue" id="readShowProgress2proState"></span></td>
                        </tr>
                        <tr>
                            <td>结算情况：</td>
                            <td ><span style="color:blue" id="readShowProgress2proBillingInfo"></span></td>
                            <td>人工费：</td>
                            <td><span style="color:blue" id="readShowProgress2proManMoney"></span></td>
                        </tr>
                        <tr>
                            <td>材料费：</td>
                            <td ><span style="color:blue" id="readShowProgress2proUseMoney"></span></td>
                            <td>其他费用：</td>
                            <td><span style="color:blue" id="readShowProgress2proOtherMoney"></span></td>
                        </tr>
                        <tr>
                            <td>备注：</td>
                            <td colspan="3" style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue" id="readShowProgress2proRemark"></span></td>
                        </tr>
                        </tbody>
                    </table>
                </center>
            </div>


	<!-- 添加任务窗口 -->
	<div id="addvirtualRepair" style="padding:6px;display:none;">
		<div class="do_overDiv"></div>
			<input id="repairHouseStoreCoding" style="display:none" noos="noos">
			<input id="repairHouseCoding" style="display:none" noos="noos">
			<input id="repairHouseType" style="display:none" noos="noos">
			<div style='margin:5px 0 0 0px;float:left;display:none'>
				登记时间：<input id="repairReportingTime"  style="width:130px" readonly noos="noos">
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				任务类型：<select id="repairTypeRp" style="width:100px;" noos="noos" clear="clear" require="require">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				责任归属：<select id="repairResponsibility" style="width:100px;" noos="noos" clear="clear" require="require">
					<option></option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>
				业主姓名：<input id="repairName" style="width:100px" noos="noos" clear="clear" require="require">
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				业主电话：<input id="repairPhone" style="width:100px" noos="noos" clear="clear" require="require">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 16px;float: left;'>
				负 责 人  : <input id="doTaskShowUserInfo" style="width:270px;cursor: pointer;" readonly="readonly" class="choose_user_button" doFlag="doTask" doFun="" value="" clear="clear" require="require">
				<input id="doTaskGetUserStoreId" type="hidden" clear="clear">
				<input id="doTaskGetUserDetId" type="hidden" clear="clear">
				<input id="doTaskGetUserId" type="hidden" clear="clear">
				<div id="doTaskShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="margin:5px 0 0 12px;float:left;position:relative;">
				期望时间：<select class="repair_hope_select" id="repairHopeSelect" style="width:270px;" onChange="hopeTimeVal('repairHopeSelect', 'repairHopeTime')" clear="clear">
					<option></option>
				</select>
				<input id="repairHopeTime" style="margin-left:-273px; left:36px;width:250px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;" clear="clear" require="require">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 12px;float: left;'>任务描述：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea id="repairEventRp" style="width:270px;height:60px" noos="noos" clear="clear" require="require"></textarea>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件</a>
				<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
				<span style="vertical-align: middle;">短信提醒：</span>
				<input style="vertical-align: middle;position:relative;top:1px;" type="checkbox" id="sendTaskMessageRemind" checked=true>
			</div>
			<div style="clear:both"></div>
			<div style="margin:10px 0 0 0;text-align: center;">
				<!-- <div class="errMsg" style="box-sizing:border-box;height:5px;color:red;"></div> -->
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addvirtualRepair')){doAddvirtualRepair(0)}">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addvirtualRepair').dialog('close')">取消</a>
			</div>
			<!-- <div style="margin:10px 0 0 0;text-align: center;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddvirtualRepair(0)">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addvirtualRepair').dialog('close')">取消</a>
			</div> -->
	</div>

	<!-- 任务详细信息窗口 -->
	<div id="repairInfoDlg" style="display:none;">
		<div style='margin:5px 0 5px 10px;float: left;'>
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'repair2', 'taskInfoTable', 'repId', 'repImgPath', 'queryRepairById', 'deleteRepairPic')">上传及查看图片</a>
		</div>
		<div style="clear:both"></div>
			<div style='margin:0 0 0 10px;float: left;'>
				地址/项目名：<input readonly='readonly' id="repairAddress" style="width:295px">
				<input id="repairId" style="display:none">
				<input class="repair_index" style="display:none">
			</div>
			<div style='margin:0 0 0 34px;float: left;'>
				任务类型：<input readonly='readonly' id="repairType" style="width:68px">
				<input disabled='disabled' id="repairHouseType1" style="width:69px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>
				任务状态：<input readonly='readonly' id="repairState" style="width:100px">
			</div>
			<div style='margin:5px 0 0 47px;float: left;'>
				负责人：<input readonly='readonly' id="repairPeopleName" style="width:100px">
					<input id="repairPeopleId" style="display:none">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				领取时间：<input readonly='readonly' id="repairReceive" style="width:140px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>
				客户姓名：<input readonly='readonly' id="repairContacis" style="width:100px">
			</div>
			<div style='margin:5px 0 0 35px;float: left;'>
				客户电话：<input readonly='readonly' id="repairContacisPhone" style="width:100px">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				期望时间：<input readonly='readonly' id="repairHopeTime1" style="width:140px">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 27px;float: left;'>任务描述：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea readonly='readonly' id="repairEvent" style="width:295px;height:45px"></textarea>
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				登 记 人 ：<input readonly='readonly' id="repairUserName1" style="width:140px">
				<input id="repairUserId1" style="display:none">
			</div>
			<div style='margin:5px 0 0 34px;float: left;'>
				登记时间：<input readonly='readonly' id="repairTime" style="width:140px">
			</div>
			<div style="clear:both"></div>
		<div style='margin:20px 0 0 5px;width:99%;height:25%;'>
			<table id="showProgressTable"> </table>
		</div>
		<div style='margin:8px 0 0 0;text-align:center;'>
			<a  class="easyui-linkbutton" iconcls="icon-up" onclick="repairLaterOrNext(0)">上一条</a>
			<a  class="easyui-linkbutton" iconcls="icon-down" onclick="repairLaterOrNext(1)">下一条</a>
		</div>
	</div>
	<!-- 任务跟进详细显示窗口 -->
	<div id="showProgressDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>进展时间：</td>
						<td colspan="3"><span style="color:blue" id="readShowProgressproTime"></span></td>
					</tr>
					<tr>
						<td>处理人：</td>
						<td ><span style="color:blue" id="readShowProgressuserName"></span></td>
						<td>进展状态：</td>
						<td><span style="color:blue" id="readShowProgressproState"></span></td>
					</tr>
					<tr>
						<td>备注：</td>
						<td colspan="3" style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue" id="readShowProgressproRemark"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>

	<!-- 审批图片列表 -->
	<div id="attachmentDlgHandle" style="padding:6px;display:none;">
		<div style="clear:both"></div>
		<div style="padding:5px 0 0 10px;">
			<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refreshHandle()">刷新</a>
		</div>
		<div id="imgWrapperHandle" style="margin:10px 0 0 10px;"></div>
		<div style="clear:both"></div>
	</div>

	<!-- 审批详情 -->
	<div id="seeEventDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<input id="event_index" type="hidden">
		<input id="rentId" type="hidden" notes="notes"><!-- 已租id： -->
		<input id="storeId" type="hidden" notes="notes"><!-- 未租id： -->
		<input id="houseId" type="hidden" notes="notes"><!-- 盘源/项目id： -->
		<input id="addCity" type="hidden" notes="notes">
		<input id="addCommunity" type="hidden" notes="notes">
		<div class="clearfix">
			<div style='margin:5px 0 0 5px;float: left;'>
				归属地址：<span class="houseAddress" readonly style="width:200px;" clear="clear"></span>
			</div>
			<div style='margin:5px 20px 0 0;float: right;'>
				审批编号：<span id="eaApprovalNumber1" style="width:120px" clear="clear"></span>
			</div>
		</div>
		<table class="maintable eventInfo" style="margin:5px 2px 0 2px;width:620px;">
			<center>
				<tbody>
					<tr>
						<td>申请人</td>
						<td><span class="publisherName" clear="clear"></span></td>
						<td>申请时间</td>
						<td><span class="eaReleaseTime" clear="clear"></span> </td>
					</tr>
					<tr>
						<td>申请内容</td>
						<td colspan="3" style="text-align: left;"><span class="eaEventContent" clear="clear"></span></td>
					</tr>
					<tr>
						<td>涉及金额</td>
						<td colspan="3">￥ : <span class="eaAmountInvolved" clear="clear"></span>元（大写 :<span class="eaAmountInvolved2" clear="clear"></span>）</td>
					</tr>
					<tr class="shoukuanzhanghu">
						<td>收款账户</td>
						<td><span class="eaBankName" clear="clear"></span></td>
						<td><span class="eaBankUsername" clear="clear"></span></td>
						<td><span class="eaBankAccountNumber" clear="clear"></span></td>
					</tr>
				</tbody>
			</center>
		</table>
		<div class="clearfix" style='margin:2px 0 2px 0;'>
			<div style="float:right;">
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="true" onclick="showAttachmentHandle()">附件</a>
				<span class="attachmentNumHandle" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
			</div>
		</div>
		<div style='box-sizing:border-box;padding:5px 2px 0 2px;width:100%;height:35%;'>
			<table id="showProcessTable"></table>
		</div>
		<table class="maintable payInfo" style="margin:5px 2px 0 2px;width:620px">
			<center>
				<tbody>
					<tr>
						<td>操作人</td>
						<td><span class="cashierPeopleName" clear="clear"></span></td>
						<td>付款金额</td>
						<td>￥ : <span class="jfSumMoney" clear="clear"></span>元</td>
						<td>财务流水号</td>
						<td><span class="jfFinancialCoding" clear="clear"></span></td>
					</tr>
					<tr>
						<td>付款时间</td>
						<td><span class="jfCheckInTime" clear="clear"></span></td>
						<td>付款账户</td>
						<td colspan="3">
							<span class="jfClosedWay" clear="clear"></span> -
							<span class="faUserName" clear="clear"></span> -
							<span class="faBelonging" clear="clear"></span> -
							<span class="account" clear="clear"></span>
						</td>
					</tr>
				</tbody>
			</center>
		</table>
		<div id="seeEventSave" style="margin:15px 0 0 0;text-align:center;">
			<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext2(0)">上一条</a>
			<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext2(1)">下一条</a>
		</div>
	</div>
	<!-- 添加审批窗口 -->
	<div id="addEventDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<fieldset>
			<legend>归属房源</legend>
			<div style='margin:5px 0 0 0;'>
				审批归属：<input class="houseAddress" style="width:524px" readonly>
				<input class="rentId" style="display:none;"><!-- 已租id： -->
				<input class="storeId" style="display:none;"><!-- 未租id： -->
				<input class="houseId" style="display:none;"><!-- 盘源/项目id： -->
				<input class="houseType" style="display:none;"><!-- 归属类型 -->
			</div>
		</fieldset>
		<fieldset>
			<legend>审批信息</legend>
			<div style='margin:5px 0 0 0;float: left;'>
				事务类型：<select class="eventType" style="width:100px;" choose="choose" require="require">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				审批人：&emsp;<input id="doEventShowUserInfo" style="width:120px;cursor: pointer;" type="text"
					readonly="readonly" clear="clear" require="require" class="choose_user_button" doFlag="doEvent" doFun="">
				<input id="doEventGetUserStoreId" type="hidden">
				<input id="doEventGetUserDetId" type="hidden">
				<input id="doEventGetUserId" type="hidden">
				<div id="doEventShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件</a>
				<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0px;float: left;'>
				审批编号：<input id="eaApprovalNumber" style="width:100px" readonly="readonly" clear="clear" require="require">
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>
				涉及金额：<input class="amountInvolved" type="number" style="width:100px" clear="clear" type="number" data-type="money"
					data-fn-keyup="changeMoney();" >
			</div>
			<div style='margin:5px 0 0 12px;float: left;'>短信提醒：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<input type="checkbox" id="shorMessageRemind1">
			</div>
			<div style='margin:5px 0 0 10px;float: left;color:red'>优先处理：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<input type="checkbox" id="ifSpeed">
			</div>
			<div style="clear:both"></div>
			<div id="payBankInfo">
				<div style='margin:5px 0 0 12px;float: left;'>
					开户名：<input id="eaBankUsername" style="width:100px" clear="clear">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					收款银行：<input id="eaBankName" style="width:120px" clear="clear">
				</div>
				<div style='margin:5px 0 0 12px;float: left;'>
					收款账号：<input id="eaBankAccountNumber" style="width:160px" clear="clear">
				</div>
				<div style="clear:both"></div>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 0;float: left;'>审批内容：</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<textarea class="eventDescribe" style="width:524px;height:80px" clear="clear" require="require"></textarea>
			</div>
		</fieldset>
		<div style="margin:10px 0 0 0;text-align: center;">
			<!-- <div class="errMsg" style="box-sizing:border-box;height:20px;color:red;"></div> -->
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addEventDlg')){doAddEvent()}">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addEventDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 审批详情 -->
	<div id="handleInfo" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<center>
			<table class="maintable" style="margin-top:10px;">
				<tbody>
					<tr class="tr1">
						<td class="td1">审批时间：</td>
						<td class="td2"><span id="readHandle_time"></span></td>
						<td class="td3">审批人：</td>
						<td class="td4"><span id="readHandle_name"></span></td>
					</tr>
					<tr>
						<td>审批意见：</td>
						<td colspan="3" class="adviseTd"><span id="readHandle_advise"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>

	<!-- 授权窗口  -->
	<div id="pushingCardDlg1" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div id="pushingCardSelect1" style='margin:10px 0 0 15px;float: left;'>
	</div>
		<div style="clear:both"></div>
		<!-- <div style='margin:10px 0 0 15px;float: left;'>
			租客：<select id="selectRentan" style="width:120px" choose="choose">
		</select>
		</div> -->
		<!-- <div style="margin:10px 0 0 15px;color:black;font-size:13px;float:left;">
			用户：<input id="searchLockManagerShowUserInfo" class="choose_user_button" doFlag="searchLockManager" doFun=""
					style="width:120px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
				<input id="searchLockManagerGetUserStoreId" type="hidden" clear="clear">
				<input id="searchLockManagerGetUserDetId" type="hidden" clear="clear">
				<input id="searchLockManagerGetUserId" type="hidden" clear="clear">
				<div id="searchLockManagerShowUserInfoDiv" style="display:none;" clear="clear"></div>
		</div> -->
		<div style='margin:10px 0 0 17px;float: left;'>
			类型：<select id="selectType" style="width:120px" require="require" clear="clear">
			<option></option>
			<option value="1">第三方维保</option>
			<option value="2">第三方看房</option>
			<option value="3">其他</option>
		</select>
		</div>
		<div style='margin:10px 0 0 17px;float: left;'><!-- readonly="readonly" -->
			公司：<input id="pushingCardCompany" style="width:120px;" clear="clear" require="require">
		</div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 17px;float: left;'><!-- readonly="readonly" -->
			姓名：<input id="pushingCardName" style="width:120px;" clear="clear" require="require">
		</div>
		<div style='margin:10px 0 0 17px;float: left;'><!-- readonly="readonly" -->
			电话：<input id="pushingCardPhone" type="number" style="width:120px;" clear="clear" require="require">
		</div>
		<!-- <div style='margin:10px 0 0 17px;float: left;display:none'>
			期限：<input id="pushingTime1" style="width:120px;" readonly="readonly"  clear="clear">
		</div> -->
		<div style='margin:10px 0 0 17px;float: left;'>
			<label>生成授权事务:</label>
			<input type="checkbox" name="authorize" onclick="assistingAffairs2(0)" id="UnlockingTimes" require="require">开锁次数
            <input type="checkbox" name="authorize" onclick="assistingAffairs2(1)" id="UnlockingPeriod" require="require">开锁期限
        </div>
        <div style="clear:both"></div>
        <div id="MaxNumber" style="display:none">
        	<div style='margin:10px 0 0 17px;float: left;'>
				授权最大开锁次数：<input id="authorizeTimes" style="width:220px;" clear="clear" require="shouquan">
			</div>
        </div>
        <div id="DeadlineTime" style="display:none">
        	<div style='margin:10px 0 0 17px;float: left;'>
				期限时间：<input id="hopeTime" style="width:100px" require="shouquan" clear="clear"
					onfocus="WdatePicker({minDate:'%y-%M-{%d}',dateFmt:'yyyy-MM-dd 23:59:59',autoPickDate:true,errDealMode:2})">
			</div>
        </div>
		<div style="clear:both"></div>
		<div style='margin:10px 0 0 17px;float: left;'><!-- readonly="readonly" -->
			原因：<textarea id="pushingCardReason" style="width:292px;height:100px"  clear="clear" require="require"></textarea>
		</div>
		<div style="clear:both"></div>
		<div style="text-align:center;">
			<a id="doPushingCard1" class="easyui-linkbutton" style="margin:40px 5px 0  0;" iconcls="icon-save" onclick="doPushingCard1()">授权</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" style="margin:40px 0 0 5px;" onclick="$('#pushingCardDlg1').dialog('close')">关闭</a>
		</div>
	</div>

	<div id="addShortRentDlg" style="padding:6px;text-align:center" class="easyui-dialog" data-options="closed:true">
		<div style="clear:both"></div>
		<div id="isNotShortRent" style="display:none">
			<div style="float:left;margin:10px 0 0 20px">
				日租价格 ：<input id="hsDailyRent" type="number" style="width:100px;" clear="clear" require="require"/>
			</div>

			<div style="float:left;margin:10px 0 0 20px">
				高峰价格： <input id="hsHotDailyRent" type="number" style="width:100px;" clear="clear" require="require"/>
			</div>

			<div style="float:left;margin:10px 0 0 20px">
				可住人数： <input id="hsResidentiality" type="number" style="width:100px;" clear="clear" require="require"/>
			</div>

			<div style="float:left;margin:10px 0 0 20px">
				短租房型： <select id="shortHouseType">
					</select>
			</div>
			<div style="clear:both"></div>
			<div style="float:left;margin:10px 0 0 20px">
				钟点价格： <input id="timePrice" type="number" style="width:100px;" clear="clear" require="require"/>
			</div>
			<div style="clear:both"></div>
			<div id="room_configuration">
				<div style="float:left;margin:10px 0 10px  20px">房间配置：</div>
				<div style="clear:both"></div>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="热水淋浴">热水淋浴</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="无线网络">无线网络</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="空调">空调</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电视">电视</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="门禁系统">门禁系统</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="停车位">停车位</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="饮水设备">饮水设备</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="有线网络">有线网络</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电脑">电脑</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="拖鞋">拖鞋</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="手纸">手纸</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="牙具">牙具</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="毛巾">毛巾</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴液">浴液</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="洗发水">洗发水</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="香皂">香皂</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜儿童">适宜儿童</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜老人">适宜老人</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜残疾人">适宜残疾人</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电梯">电梯</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="洗衣机">洗衣机</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="冰箱">冰箱</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴缸">浴缸</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="暖气">暖气</button>
			</div>

			<div style="clear:both"></div>
			<center style="margin:15px 0 0 0;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addShortRentDlg')){changeShortRent(1)}">确认</a>
				<!-- <a class="easyui-linkbutton" iconcls="icon-save" onclick="changeShortRent(1)">确认</a> -->
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addShortRentDlg').dialog('close')">取消</a>
			</center>
		</div>
		<div id="isShortRent" style="display:none">
			<center style="margin:45px 0 0 0;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="changeShortRent(2)">取消短租</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addShortRentDlg').dialog('close')">取消</a>
			</center>
		</div>
	</div>


	<!-- 添加未租窗口 -->
	<div id="addHomeDlg" class="easyui-dialog" data-options="closed:true">
		<iframe id="addHomeBill" style="width:100%;height:99%;boder:0px;" frameborder="0" scrolling="auto">
		</iframe>
	</div>
	<!-- 批量添加未租窗口 -->
	<div id="addBatchHomeDlg" class="easyui-dialog" data-options="closed:true">
		<iframe id="addBatchHomeBill" style="width:100%;height:99%;boder:0px;" frameborder="0" scrolling="auto">
		</iframe>
	</div>

	<!-- 添加已租窗口 -->
	<div id="addRentDlg" class="easyui-dialog" data-options="closed:true">
		<iframe id="addRentBill" style="width:100%;height:99%;boder:0px;" frameborder="0" scrolling="auto">
		</iframe>
	</div>

	<div id="menu" class="easyui-menu" style="width:130px;">
		<div id="splitFlatShareButton2"><a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="splitFlatShare()">设置合租房</a></div>
<%--		<div id="landlordRenewButton3"><a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" onclick="landlordRenew()">业主续签</a></div>--%>
<%--		<div id="checkoutUpdate3"><a class="easyui-linkbutton" plain="true" iconCls="icon-tuifang" onclick="landlordCheckout()">业主退房</a></div>--%>
		<div id="updateManagerUserButton3"><a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="updateManagerUser()">设置房管员</a></div>
		<div id="guidePriceButton3"><a class="easyui-linkbutton" plain="true" iconCls="icon-zhidaojia" onclick="guidePrice()">设置指导价</a></div>
		<div id="depositManagerButton3"><a class="easyui-linkbutton" plain="true" iconCls="icon-dingjin" onclick="depositManager()">定金管理</a></div>
		<div id="sendMessageButton3"><a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" onclick="sendMessageDlg()">发送短信</a></div>
		<div id="printAssetButton2"><a class="easyui-linkbutton" plain="true" iconCls="icon-dayin" onclick="printQRcode()">打印二维码</a></div>
<%--		<div id="sepUpShortRenButton"><a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="openAddShortRent()">设置日租房</a></div>--%>
		<div>
			<span><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >相关信息</a></span>
			<div>
				<div class="hrefTitle" id="detailLandlordInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >业主信息</a></div>
				<div class="hrefTitle" id="detailFinancialInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >房屋收支</a></div>
				<div class="hrefTitle" id="detailLandlordBillInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >业主账单</a></div>
				<div class="hrefTitle" id="detailAssetsInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >家私电器</a></div>
				<div class="hrefTitle" id="detailContInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >合约记录</a></div>
				<div class="hrefTitle" id="detailMessageInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >短信记录</a></div>
				<div class="hrefTitle" id="detailHsPicInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >房间图片</a></div>
				<div class="hrefTitle" id="detailEnergyInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >能源卡号</a></div>
				<div class="hrefTitle" id="detailRepairInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >维保记录</a></div>
				<div class="hrefTitle" id="detailEventInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >审批记录</a></div>
				<div class="hrefTitle" id="detailTaskInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >任务记录</a></div>
				<div class="hrefTitle" id="detailDeviceInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >智能设备</a></div>
				<div class="hrefTitle" id="detailAuthorizeInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >授权管理</a></div>
				<div class="hrefTitle" id="detailEnergyReadingsInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >能源读数</a></div>
			</div>
		</div>
	</div>
        <jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
        <jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
        <jsp:include page="/ui/setHsCentralized.jsp"></jsp:include><!-- 设置集散房 -->
        <jsp:include page="/ui/device.jsp"></jsp:include>
        <script src="js/fg.public.js"></script>
        <script src="js/fg.trusteeship.js"></script>
        <script src="js/device.js"></script>
        <script src="js/upload.js"></script>
</body>
</html>