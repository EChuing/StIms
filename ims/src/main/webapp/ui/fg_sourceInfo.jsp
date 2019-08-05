<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>已租房间</title>
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
	</style>
</head>
<body>
<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<!-- 整租信息工具栏 -->
<div>
	<div style="padding:5px 0 5px 5px">
		<a class="easyui-linkbutton" plain="true" iconCls="icon-add-house" id="addSourceButton" onclick="addHrDlg()">添加出租</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" id="landlordRenewButton"onclick="landlordRenewData(0)">业主续签</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" id="renterRenewButton" onclick="renterRenew()">租客续签</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-house-tuoguan-edit" id="renterCheckoutButton" onclick="renterCheckout()">租客退房</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateManagerUserButton" onclick="updateManagerUser()">设置房管员</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" id="sendMessageButton" onclick="sendMessageDlg()">发送短信</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-xinzengshouzhi" id="nuwAddFinancialButton" onclick="generatingATemporaryBill()">添加临时账单</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-huanFang" id="exchangeHousesButton" onclick="exchangeHouses()">租客换房</a>
		<a class="easyui-linkbutton" plain="true" iconcls="icon-fangyuancaiwushengtaitongji" onclick="showElectronicContract()">电子签约</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-yingchang" onclick="columnsCheck()">显示/隐藏列</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="advancedScreening(1)" id="screening">高级筛选</a>
	</div>
</div>
<input type="hidden" id="hsHouseSort_index">
<input type="hidden" id="hrHouseRent_index">
<div id="searchSource" style="margin:0 0 0 5px" class="advancedScreening">
	<div class="advanced1">
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			楼盘名称：<input id="sourceCommunity" onkeyup="searchOnkeyup(this.id, 'querySourceInfo(1, 0)')" style="width:100px;" clear="clear">
		</div>
		<div style="margin:0 0 5px 31px;color:black;font-size:13px;float:left;">
			楼栋：<input id="sourceBuilding" onkeyup="searchOnkeyup(this.id, 'querySourceInfo(1, 0)')" style="width:100px" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			门牌号：<input id="sourceDoorplateno" onkeyup="searchOnkeyup(this.id, 'querySourceInfo(1, 0)')" style="width:100px" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			房屋类型：<select id="searchhrFlatShareLogo" onchange="cleanButtonValue();querySourceInfo(1,0)" style="width:100px" clear="clear">
			<option value="">全部</option>
			<option value="1">整租房</option>
			<option value="2">合租房</option>
		</select>
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			租客：<input id="sourceRenterName" onkeyup="searchOnkeyup(this.id, 'querySourceInfo(1, 0)')" style="width:100px" clear="clear">
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			业主：<input id="sourceLandlordPopName" onkeyup="searchOnkeyup(this.id, 'querySourceInfo(1, 0)')" style="width:100px" clear="clear">
		</div>
		<div style="margin:0 0 5px 10px;color:black;float:left;">
			<div id="showTheSortButton" class="showTheSortButton" onclick="showTheSortDlg()" >排序方式<span id="showTheSortjia" class="showTheSortjia">+</span></div>
			<div class="theSortDlg" id="theSortDlg" style="height:300px;">
				<div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
				<div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse" searchVal="2">倒序</div>
				<input type="hidden" id="theSortContraryInput"  value="2">
				<div class="theSortTerm" id="theSortTermhrAddCommunity" searchVal="1">楼盘名称</div>
				<div class="theSortTerm" id="theSortTermhrAddBuilding" searchVal="2">楼栋</div>
				<div class="theSortTerm" id="theSortTermhrAddDoorplateno" searchVal="3">门牌号</div>
				<div class="theSortTerm theSortTermSelect" id="theSortTermhrRegisterTime" searchVal="4">登记时间</div>
				<div class="theSortTerm" searchVal="10">最新跟进时间</div>
				<div class="theSortTerm" searchVal="11">最新签约时间</div>
				<div class="theSortTerm" id="theSortTermhrBeginTime" searchVal="5">租赁开始时间</div>
				<div class="theSortTerm" id="theSortTermhrEndTime" searchVal="6">租赁结束时间</div>
				<div class="theSortTerm" id="theSortTermhrLeaseState" searchVal="7">租赁状态</div>
				<div class="theSortTerm" id="theSortTermoverplusTime" searchVal="8">剩余租期</div>
				<div class="theSortTerm" id="theSortTermhrHousePrice" searchVal="9">每月租金</div>
				<input type="hidden" id="theSortTermInput" value="4">
			</div>
		</div>
	</div>
	<div class="advanced2">
		<div style="clear:both"></div>
		<div style="margin:0 0 5px 31px;color:black;font-size:13px;float:left;">
			城区：<select id="sourceDistrict" onchange="cleanButtonValue();querySourceInfo(1,0)" style="width:100px" clear="clear">
			<option></option>
		</select>
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			租赁状态：<select id="searchLeaseState" onchange="cleanButtonValue();querySourceInfoState(0)" style="width:100px" clear="clear">
			<option value="在租">在租</option>
			<option value="正办退房">正办退房</option>
			<option value="已退房">已退房</option>
			<option value="">全部</option>
		</select>
		</div>
		<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
			房管员：<input id="searchHrManagerShowUserInfo" class="choose_user_button" doFlag="searchHrManager" doFun="cleanButtonValue();querySourceInfo(1,0)"
					   style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require">
			<input id="searchHrManagerGetUserStoreId" type="hidden" clear="clear">
			<input id="searchHrManagerGetUserDetId" type="hidden" clear="clear">
			<input id="searchHrManagerGetUserId" type="hidden" clear="clear">
			<div id="searchHrManagerShowUserInfoDiv" style="display:none;" clear="clear"></div>
		</div>
	</div>
</div>
<div class="houseRentState" style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
	<input id="searchButtonState" type="hidden" value="">
	<button type="button" class="btn btn-success"    style="margin:0 0 5px 5px;width:160px;" value="即将到期">租客即将到期<span class="totalNum0"></span></button>
	<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="正在转租">正在转租<span class="totalNum1"></span></button>
	<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="到期不续">到期不续<span class="totalNum2"></span></button>
	<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="正在维保">正在维保<span class="totalNum3"></span></button>
	<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;" value="逾期房间">逾期房间<span class="totalNum4"></span></button>
</div>
<div style="margin:2px 0 5px 5px;color:black;font-size:13px;float:left;">
	<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="reflashList()" ></a>
</div>
<div style="clear:both"></div>
<!-- 整租信息列表 -->
<div id="DataGridSourceInfo" style="width:100%;height:87%;">
	<table id="sourceInfoDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
		   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
		<thead>
		<tr>
			<th data-options="field:'ck',checkbox:true"></th>
			<th field="hrAddDistrict" width="10" align="center">城区</th>
			<th field="detailedAddress" width="20" align="center">详细地址</th>
			<th field="hrSectionType" width="10" align="center">户型</th>
			<th field="hrHouseSquare" width="10" align="center">面积</th>
			<th field="hrHouseDirection" width="10" align="center">朝向</th>
			<th field="hrHouseOwner" width="10" align="center">用途</th>
			<th field="hrPaymentType" width="10" align="center">付租方式</th>
			<th field="hrLeaseState" width="10" align="center">租赁状态</th>
			<th field="renterPopName" width="10" align="center">租客</th>
			<th field="renterPopNameRemark" width="10" align="center">备注</th>
			<th field="hrBeginTime" width="12" align="center">租赁开始</th>
			<th field="hrEndTime" width="12" align="center">租赁到期</th>
			<th field="overplusTime" width="10" align="center" formatter="formatoverplusTime">剩余租期</th>
			<th field="hrHouseDeposit" width="10" align="center">押金</th>
			<th field="hrRegisterTime" width="10" align="center">登记时间</th>
			<th field="adminName" width="10" align="center">业务员</th>
			<th field="hrManagerUserName" width="10" align="center">房管员</th>
			<th field="hrState" width="10" align="center">房屋状态</th>
			<th field="wxOpenidIf" width="10" align="center" formatter="formatwxOpenidIf">微信绑定</th>
			<th field="hrLandlordId" width="10" align="center">业主ID</th>
			<th field="hrHouse4storeId" width="10" align="center">房屋ID</th>
			<th field="hrUserId" width="10" align="center">业务员ID</th>
			<th field="renterCoding" width="10" align="center">租客编号</th>
		</tr>
		</thead>
	</table>
	<!-- 房源分页 -->
	<div id="sourcePageDiv" style="width:100%;text-align:center;"></div>
</div>
<!-- 显示/隐藏列对话框 -->
<div id="columnsCheckBox" style="display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
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
					<input type="checkbox" value="hrSectionType" id="hrSectionType" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>户型</label>
				</div>
				<div style="margin:5px 0 0 54px;float:left">
					<input type="checkbox" value="hrHouseSquare" id="hrHouseSquare" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>面积</label>
				</div>
				<div style="margin:5px 0 0 54px;float:left">
					<input type="checkbox" value="hrHouseDirection" id="hrHouseDirection" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>朝向</label>
				</div>
				<div style="margin:5px 0 0 54px;float:left">
					<input type="checkbox" value="hrHouseOwner" id="hrHouseOwner" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>用途</label>
				</div>
				<div style="clear:both"></div>
			</div>
			<div id="renterColumns">
				<div style="margin:20px 0 0 5px;float:left">
					<input type="checkbox" id="AllRenterColumns" value="all" />
				</div>
				<div style="margin:20px 0 0 5px;float:left">
					<label>租客信息</label>
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 5px;float:left">
					<input type="checkbox" value="renterPopName" id="renterPopName" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>租客</label>
				</div>
				<div style="margin:5px 0 0 54px;float:left">
					<input type="checkbox" value="renterPopNameRemark" id="renterPopNameRemark" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>备注</label>
				</div>
				<div style="margin:5px 0 0 30px;float:left">
					<input type="checkbox" value="hrBeginTime" id="hrBeginTime" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>租赁开始</label>
				</div>
				<div style="margin:5px 0 0 30px;float:left">
					<input type="checkbox" value="hrEndTime" id="hrEndTime" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>租赁到期</label>
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 5px;float:left">
					<input type="checkbox" value="hrLeaseState" id="hrLeaseState" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>租赁状态</label>
				</div>
				<div style="margin:5px 0 0 30px;float:left">
					<input type="checkbox" value="hrHouseDeposit" id="hrHouseDeposit" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>押金</label>
				</div>
				<div style="margin:5px 0 0 54px;float:left">
					<input type="checkbox" value="wxOpenidIf" id="wxOpenidIf" />
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					<label>微信绑定</label>
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

<!-- 添加任务窗口 -->
<div id="addvirtualRepair" style="padding:6px;display:none;">
	<div class="do_overDiv"></div>
	<input id="repHouse4rentId" style="display:none" noos="noos">
	<input id="repairHouseStoreCoding" style="display:none" noos="noos">
	<input id="repairHouseCoding" style="display:none" noos="noos">
	<input id="repairHouseType" style="display:none" noos="noos">
	<div style='margin:5px 0 0 12px;float:left;display:none'>
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
		客户姓名：<input id="repairName" style="width:100px" noos="noos" clear="clear" require="require">
	</div>
	<div style='margin:5px 0 0 10px;float: left;'>
		客户电话：<input id="repairPhone" style="width:100px" noos="noos" clear="clear" require="require">
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 24px;float: left;'>
		负责人：<input id="doTaskShowUserInfo" style="width:270px;cursor: pointer;" readonly="readonly" class="choose_user_button" doFlag="doTask" doFun="" value="" clear="clear" require="require">
		<input id="doTaskGetUserStoreId" type="hidden">
		<input id="doTaskGetUserDetId" type="hidden">
		<input id="doTaskGetUserId" type="hidden">
		<div id="doTaskShowUserInfoDiv" style="display:none;"></div>
	</div>
	<div style="margin:5px 0 0 12px;float:left;position:relative;">
		期望时间：<select class="repair_hope_select" id="repairHopeSelect" style="width:270px;"
					 onChange="hopeTimeVal('repairHopeSelect', 'repairHopeTime')" choose="choose">
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
		<div class="errMsg1" style="box-sizing:border-box;height:5px;color:red;"></div>
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addvirtualRepair')){doAddvirtualRepair(0)}">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addvirtualRepair').dialog('close')">取消</a>
		<!-- <a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddvirtualRepair(0)">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="javascript:$('#addvirtualRepair').dialog('close')">取消</a> -->
	</div>
</div>

<!-- 任务详细信息窗口 -->
<div id="repairInfoDlg" style="display:none;">
	<div style='margin:5px 0 5px 10px;float: left;'>
		<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'repair2', 'virtualRepairTable', 'repId', 'repImgPath', 'queryRepairById', 'deleteRepairPic')">上传及查看图片</a>
	</div>
	<div style="clear:both"></div>
	<div style='margin:0 0 0 10px;float: left;'>
		地址/项目名：<input readonly='readonly' id="repairAddress" style="width:278px">
		<input id="repairId" style="display:none">
		<input class="repair_index" style="display:none">
	</div>
	<div style='margin:0 0 0 26px;float: left;'>
		任务类型：<input readonly='readonly' id="repairType" style="width:68px">
		<input disabled='disabled' id="repairHouseType1" style="width:69px">
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 10px;float: left;'>
		任务状态：<input readonly='readonly' id="repairState" style="width:100px">
	</div>
	<div style='margin:5px 0 0 47px;float: left;'>
		负责人：<input readonly='readonly' id="repairPeopleName" style="width:100px">
		<input id="repairPeopleId" style="display:none">
	</div>
	<div style='margin:5px 0 0 26px;float: left;'>
		领取时间：<input readonly='readonly' id="repairReceive" style="width:140px">
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 10px;float: left;'>
		客户姓名：<input readonly='readonly' id="repairContacis" style="width:100px">
	</div>
	<div style='margin:5px 0 0 35px;float: left;'>
		客户电话：<input readonly='readonly' id="repairContacisPhone" style="width:100px">
	</div>
	<div style='margin:5px 0 0 26px;float: left;'>
		期望时间：<input readonly='readonly' id="repairHopeTime1" style="width:140px">
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 10px;float: left;'>任务描述：</div>
	<div style='margin:5px 0 0 0;float: left;'>
		<textarea readonly='readonly' id="repairEvent" style="width:295px;height:45px"></textarea>
	</div>
	<div style='margin:5px 0 0 38px;float: left;'>
		登记人：<input readonly='readonly' id="repairUserName1" style="width:140px">
		<input id="repairUserId1" style="display:none">
	</div>
	<div style='margin:5px 0 0 26px;float: left;'>
		登记时间：<input readonly='readonly' id="repairTime" style="width:140px">
	</div>
	<div style="clear:both"></div>
	<div style='margin:20px 0 0 5px;width:99%;height:25%;'>
		<table id="showProgressTable"></table>
	</div>
	<div style='margin:20px 0 0 0;text-align:center;'>
		<a class="easyui-linkbutton" iconcls="icon-up" onclick="repairLaterOrNext(0)">上一条</a>
		<a class="easyui-linkbutton" iconcls="icon-down" onclick="repairLaterOrNext(1)">下一条</a>
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

<!-- 添加维修对话框 -->
<div id="addRepairDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<input class="repair_houseRentCoding" style="display:none" clear="clear">
	<input class="repair_houseStoreCoding" style="display:none" clear="clear">
	<input class="repair_houseCoding" style="display:none" clear="clear">
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 12px;float: left;'>
		维保类型：<select class="repair_type_rp" style="width:100px;" choose="choose" require="require">
		<option></option>
	</select>
	</div>
	<div style='margin:5px 0 0 10px;float: left;'>
		费用归属：<select class="repair_responsibility" style="width:100px;" choose="choose" require="require">
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

<!-- 租客退房 -->
<div id="renterCheckoutDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<div style='margin:5px 0 0 10px;float: left;'>
		预约退房时间：<input id="renterCheckoutTime" style="width:100px" require="require"
					  onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,errDealMode:2})">
	</div>
	<div style='margin:5px 0 0 10px;float: left;'>
		退房性质：<select id="renterCheckoutWhy" style="width:100px" onchange="renterCheckoutSelect()" require="require">
		<option></option>
	</select>
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 0 34px;float: left;'>退房原因：</div>
	<div style='margin:5px 0 0 0;float: left;'>
		<textarea id="renterCheckoutReason" style="width:270px;height:60px"></textarea>
	</div>
	<div style="clear:both"></div>
	<div id="renterCheckoutCheck" style="height:20px;">
		<!-- <div style='margin:5px 0 0 34px;float: left;' id="renterCheckoutMsgDiv">
				发送短信：<input id="renterCheckoutMsg" type="checkbox">
			</div> -->
		<div style='margin:5px 0 0 10px;float: left;' id="renterCheckoutPrintDiv">
			打印转租协议：<input id="renterCheckoutPrint" type="checkbox">
		</div>
	</div>
	<div style="clear:both"></div>
	<center>
		<div id="renterCheckoutTips" style="height:20px;color:red;"></div>
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('renterCheckoutDlg')){doRenterCheckout()}">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#renterCheckoutDlg').dialog('close')">关闭</a>
	</center>
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
	<div style="width:100%;">
		</br>
		<center>
			<a class="easyui-linkbutton" iconcls="icon-ok"
			   id="doCheckCheckoutOne" onclick="doCheckCheckout(0)"> 提交</a> <a
				class="easyui-linkbutton" iconcls="icon-ok" id="doCheckCheckoutTwo"
				onclick="doCheckCheckout(1)"> 提交</a><a class="easyui-linkbutton"
													   iconcls="icon-cancel"
													   onclick="$('#checkCheckoutDlg').dialog('close')">关闭</a>
		</center>
	</div>
</div>

<!-- 添加跟进 -->
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
	<div style='margin:5px 0 0 5px;float: left;' id="hrwriteFollow">
		跟进归属：<select id="writeFollowBelong" style="width:90px" clear="clear" require="hr">
		<option></option>
		<option value="0">租客</option>
		<option value="1">业主</option>
		<option value="2">住户</option>
		<option value="3">其他</option>

	</select>
	</div>
	<div style='margin:5px 0 0 5px;float: left;' id="hswriteFollow">
		跟进归属：<select id="writeFollowBelong1" style="width:90px" clear="clear" require="hs">
		<option></option>
		<option value="0">业主</option>
		<option value="1">其他</option>
	</select>
	</div>
	<div style='margin:5px 0 0 5px;float: left;'>工作台跟进提醒：</div>
	<div style='margin:5px 0 0 0;float: left;'>
		<input type="checkbox" id="writeFollowRemind" >
	</div>
	<div style="clear:both"></div>
	<div style='margin:8px 0 0 0;float: left;'>
		跟进方式：<select class="follow_way" id="writeFollowWay" style="width:150px" clear="clear" require="require">
		<option value=""></option>
	</select>
	</div>
	<div style='margin:5px 0 0 10px;float: left;'>
		<a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">附件上传</a>
		<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
	</div>
	<div style="clear:both"></div>
	<div style='margin:5px 0 5px 0;float: left;'>
		<label>生成协同事务:</label>
		<input type="checkbox" name="adminFlag" onclick="assistingAffairs(0)" id="adminFlagRepair">维保</input>
		<input type="checkbox" name="adminFlag" onclick="assistingAffairs(1)" id="adminFlagTask">任务</input>
		<input id="adminFlagState" style="display:none;">
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
			任务类型：<select id="taskrepairTypeRp" style="width:100px;" claer="clear" require="task">
			<option></option>
		</select>
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>
			责任归属：<select id="taskAffairsRepairResponsibility" style="width:100px;" claer="clear" require="task">
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
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('writeFollowDlg')){followSource(0)}" id="hrSource">提交</a>
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('writeFollowDlg')){followTrusteeship(0)}" id="hsTrusteeship">提交</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#writeFollowDlg').dialog('close')">关闭</a>
		<!-- <a class="easyui-linkbutton" iconcls="icon-ok" onclick="followSource(0)" id="hrSource"> 提交</a>
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="followTrusteeship(0)" id="hsTrusteeship">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#writeFollowDlg').dialog('close')"> 关闭</a> -->
	</center>
</div>
<div id="showFollowUpImg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<div style="padding:5px 0 0 10px;">
		<span id="followUpImgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
	</div>
	<div id="followUpImgWrapper" style="margin:10px 0 0 10px;"></div>
</div>

<!-- 租客续签对话框 -->
<div id="renterRenewDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<input id="jrrTypeOfContract" type="hidden" clear="clear">
	<fieldset>
		<legend>基本信息</legend>
		<div style='margin:5px 0 0 24px;float: left;'>
			楼盘名称：<input id="renterRenewAddress" style="width:418px" disabled="disabled">
			<input style="display:none" id="landlordCheckEnd1">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 24px;float: left;'>
			租客姓名：<input id="renterRenewRenterName" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 29px;float: left;'>
			联系方式：<input id="renterRenewPhone" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 29px;float: left;'>
			签约次数：<input id="renterRenewNums" style="width:80px" disabled="disabled">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'>
			前次开始时间：<input id="renterRenewLastBegin" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			前次结束时间：<input id="renterRenewLastEnd" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			前次合同期限：<input id="renterRenewLastTerm" style="width:80px" disabled="disabled">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0px;float: left;'>
			前次房屋押金：<input id="renterRenewDespoit" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 29px;float: left;'>
			前次租金：<input id="renterRenewLastPrice" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			前次合同性质：<input id="renterRenewLastContractType" style="width:80px" disabled="disabled">
		</div>
		<div style="clear:both"></div>
	</fieldset>
	<fieldset>
		<legend>续签合同信息</legend>
		<div style='margin:5px 0 0 0;float: left;'>
			开始时间：<input id="renterRenewBegin" style="width:80px" disabled="disabled" needs="1">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			合同期限：<select id="renterRenewTermYear" style="width:40px;" needs="1" onchange="changeDate(1)">
			<% for (int i = 0; i < 11; ++i) {
				out.println("<option value='" + i + "'>" + i + "</option>");
			}
			%>
		</select>年 <select id="renterRenewTermMonth" style="width:40px;" onchange="changeDate(1)" needs="1">
			<% for (int i = 0; i < 12; ++i) {
				out.println("<option value='" + i + "'>" + i + "</option>");
			}
			%>
		</select>月 <select id="renterRenewTermDay" style="width:40px;" onchange="changeDate(1)" needs="1">
			<% for (int i = 0; i < 31; ++i) {
				out.println("<option value='" + i + "'>" + i + "</option>");
			}
			%>
		</select>日
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			结束时间：<input id="renterRenewEnd" style="width:80px" disabled="disabled" needs="1">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			新租金：<input type="number" data-type="money" id="renterRenewPrice" style="width:80px" needs="1">元/月
		</div>
		<div style='margin:5px 0 0 17px;float: left;'>
			租金缴费方式：<select id="renterRenewPayment" style="width:80px" needs="1">
			<option></option>
			<option value="月付">月付</option>
			<option value="季付">季付</option>
			<option value="半年付">半年付</option>
			<option value="年付">年付</option>
		</select>
		</div>
		<div style='margin:5px 0 0 24px;float: left;'>
			签约时间：<input id="renterRenewSignedTime" style="width:80px" class="Wdate" type="text" onfocus="WdatePicker()" needs="1">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'>
			新物管费：<input class="add_source_manage_cost" type="number" id="renterRenewjrrManageCost" needs="1" style="width:80px" >元/月
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			物管费缴费方式：<select class="add_payment_type" id="renterRenewjrrManagePayment" style="width:80px;" needs="1">
			<option></option>
		</select>
		</div>
		<div style='margin:5px 0 0 12px;float: left;'>
			新房屋押金：<input type="number" data-type="money" id="renterRenewAddDeposit" style="width:80px" needs="1"> 元
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0px;float: left;'>
			新服务费：<input class="add_source_server_cost" type="number" id="renterRenewjrrServerCost" needs="1" style="width:80px" >元/月
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			服务费缴费方式：<select class="add_payment_type" id="renterRenewjrrServerPayment" style="width:80px;" needs="1">
			<option></option>
		</select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0px;float: left;'>
			<!-- 提前： <input id="renterRenewAdvancePay" style="width:80px" needs="1"> 天交租 -->
			收租方式：按<select id="advanceMode1" style="width:60px;" onchange="acquisitionOfRentDay(2)">
			<option value="1">自然月</option>
			<option value="2">整月</option>
		</select> 方式
			&nbsp;固定每月的 <input id="renterRenewAdvancePay" type="number" style="width:25px" needs="1"> 号收
			<select id="numberMode1" style="width:50px;">
				<option value="1">本月</option>
				<option value="2">次月</option>
			</select>租金
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0px;float: left;'>
			合同编号：<input id="contractNum1" style="width:80px;"
						onkeyup="$(this).val($(this).val().toUpperCase());$('#contractNumCheckoutIf1').val('');$('#contractNumTips1').html('');"
						onblur="contractNumCheckout('contractNum1','contractNumCheckoutIf1','contractNumTips1')"><!-- 合同编号 -->
			<input id="contractNumCheckoutIf1" type="hidden"><!-- 合同编号id -->
			<span id="contractNumTips1"></span><!-- 验证后的文字描述 -->
		</div>
		<div style='margin:5px 0 0 10px;float: left;'>发送电子合同</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<input type="checkbox" id="shorContractMessage" >
		</div>
		<div style="clear:both"></div>
		<div id="isElectronicsContract" style="display:none">
			<div style='margin:5px 0 0 0px;float: left;'>
				合同备注：
			</div>
			<div style='margin:5px 0 0 0;float: left;'>
				<input type="text" id="contractRemark" style="width:455px">
			</div>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			主单人：<input id="doRebterRenewShowUserInfo" needs="1" style="width:145px;cursor: pointer;" readonly="readonly" class="choose_user_button" doFlag="doRebterRenew" doFun="" value="">
			<input id="doRebterRenewGetUserStoreId" type="hidden">
			<input id="doRebterRenewGetUserDetId" type="hidden">
			<input id="doRebterRenewGetUserId" type="hidden">
			<div id="doRebterRenewShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			合同性质：<input id="renterRenewContractType" style="width:80px" disabled="disabled" needs="1">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			登记人：<input id="renterRenewUser" style="width:80px" disabled="disabled">
		</div>
		<div style="clear:both"></div>
	</fieldset>
	</br>
	<center>
		<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doRenterRenew()"> 提交</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#renterRenewDlg').dialog('close')">关闭</a>
	</center>
</div>

<!-- 跟进详细信息 -->
<div id="downFollowInfo" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<center>
		<div style="margin:5px 0 5px 5px; float:left;" id="followPicture"><!-- 业主信息 -->
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="showFollowUpImg(0)" >查看跟进图片</a>
		</div>
		<div style="margin:5px 0 5px 5px; float:left;" id="followPicture1"><!-- 租客信息 -->
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="showFollowUpImg(1)" >查看跟进图片</a>
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

<!-- 更换租客对话框 -->
<div id="renterChangeDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<fieldset>
		<legend>现租客</legend>
		<center>
			<div style='margin:5px 0 0 5px;float: left;'>
				姓名：<input id="oldrenterPopName" style="width:80px" disabled="disabled">
				<input id="oldhrId" type="hidden">
				<input id="oldhrHouseId" type="hidden">
				<input id="oldhrHouse4storeId" type="hidden">
				<input id="oldhrRenterId" type="hidden">
				<input id="oldpopId" type="hidden">
				<input id="olddetailedAddress" type="hidden">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				电话：<input id="oldrenterPopTelephone" style="width:80px" disabled="disabled">
			</div>
			<div style='margin:5px 0 0 5px;float: left;'>
				身份证：<input id="oldrenterPopIdcard" style="width:140px" disabled="disabled">
			</div>
		</center>
	</fieldset>

	<div style="margin:30px 0 0 0 ">
		<a class="easyui-linkbutton" style="margin:0 5px;" onclick="choosePopulation();">选择新租客</a>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 15px;float: left;'>
			姓名：<input id="newrenterPopName" style="width:80px" disabled="disabled">
			<input id="newrenterPopId" type="hidden">
			<input id="newpopResident" type="hidden">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			电话：<input id="newrenterPopTelephone" style="width:80px" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 5px;float: left;'>
			身份证：<input id="newrenterPopIdcard" style="width:140px" disabled="disabled">
		</div>
	</div>

	<div style="margin:50px 0 0 0">
		<center>
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doChangeRenter()"> 提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#renterChangeDlg').dialog('close')">关闭</a>
		</center>
	</div>
</div>

<!-- 选择人口对话框 -->
<div id="chosePopulationDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<div style='margin:0 0 10px 10px;'>
		<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			租客姓名：<input id="searchPopName"
						onkeyup="queryPop(1,0)" style="width:80px">
		</div>
		<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			租客电话：<input id="searchPopPhone"
						onkeyup="queryPop(1,0)" style="width:100px">
		</div>
		<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
			租客身份证：<input id="searchPopIdcard"
						 onkeyup="queryPop(1,0)" style="width:100px">
		</div>
	</div>
	<!-- 选择租客列表 -->
	<table id="chosePopTable">
	</table>
	<div id="chosePopPageDiv" style="width:99%"></div>
</div>

<!-- 添加租客意向人窗口 -->
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
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddIntended()" id="saveAddIntended">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="javascript:$('#addIntendedDlg').dialog('close')">取消</a>
	</center>
</div>
<!-- 租客信息发送窗口 -->
<div id="sendMessageDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<fieldset>
		<legend>
			基本信息
		</legend>
		<div style="margin:0 0 0 12px;float:left">
			短信类型：<select id="sendMessageType" style="width:150px" require="require"
						 onchange="resizeSendMessage()">
			<option></option>
			<option value="1">租金提醒</option>
			<option value="2">合同到期提醒</option>
			<option value="3">合同即将到期续签提醒</option>
			<option value="4">合同到期不做出租</option>
			<option value="5">续约确认</option>
			<option value="6">合同已经过期续签提醒</option>
			<option value="7">欠费提醒</option>
			<option value="8">欠费截止提醒</option>
			<option value="9">微信关注提醒</option>
			<!-- <option value="10">租客到期不续</option> -->
		</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 12px;float:left">
			客户类型：<select id="sendMessageManType" onchange="changeSendMan()" require="require" style="width:60px">
			<option value=""></option>
		</select>
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			姓名：<select id="sendMessageName" style="width:80px" require="require"
					   onchange="$('#sendMessagePopId').val($('#sendMessageName').val().split('#')[0]);$('#sendMessagePhone').val($('#sendMessageName').val().split('#')[1]);
					$('#hrRenterNameRemark').val($('#sendMessageName').val().split('#')[2]);">
		</select>
			<input id="sendMessageRenterId" 	style="display:none">
			<input id="sendMessageLandlordId" 	style="display:none">
			<input id="sendMessageHouseRentId" 	style="display:none">
			<input id="sendMessageHouseStoreId" style="display:none">
			<input id="sendMessagePopId" 		style="display:none">
			<input id="sendMessageRoomAddress" 	style="display:none">
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			备注：<input id="hrRenterNameRemark" style="width:80px" disabled="disabled">
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			电话号码：<input id="sendMessagePhone" style="width:80px" disabled="disabled" require="require">
		</div>
	</fieldset>
	<div id="sendMessageSendInfo">
		<fieldset>
			<legend>
				发送内容
			</legend>
			<div id="sendMessageDivOne" style="display:none">
				<div style="margin:5px 0 0 24px;float:left">
					租金：<input id="sendMessageRentMoney" style="width:80px" type="number" data-type="money"
							  data-fn-keyup="changeSendPrice(this)" moneyType="租金">
				</div>
				<div style="margin:5px 0 0 24px;float:left">
					水费：<input id="sendMessageRentWater" style="width:80px" type="number" data-type="money"
							  data-fn-keyup="changeSendPrice(this)" moneyType="水费">
				</div>
				<div style="margin:5px 0 0 24px;float:left">
					电费：<input id="sendMessageRentEcl" style="width:80px" type="number" data-type="money"
							  data-fn-keyup="changeSendPrice(this)" moneyType="电费">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 12px;float:left">
					燃气费：<input id="sendMessageRentGas" style="width:80px" type="number" data-type="money"
							   data-fn-keyup="changeSendPrice(this)" moneyType="燃气费">
				</div>
				<div style="margin:5px 0 0 12px;float:left">
					物管费：<input id="sendMessageRentManage" style="width:80px" type="number" data-type="money"
							   data-fn-keyup="changeSendPrice(this)" moneyType="物管费">
				</div>
				<div style="margin:5px 0 0 12px;float:left">
					总金额：<input id="sendMessagePirce" style="width:80px" disabled="disabled">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 0;float:left">短信备注：</div>
				<div style="margin:5px 0 0 0;float:left">
					<textarea id="sendMessageNote" style="width:300px;height:50px"></textarea>
				</div>
			</div>
			<div id="sendMessageDivTwo" style="display:none">
				<div style="margin:0 0 0 12px;float:left" id="sendMessageCSPhoneDiv">
					客服电话：<input id="sendMessageCSPhone" style="width:100px">
				</div>
				<div style="margin:0 0 0 12px;float:left" id="sendMessageGoOnMoneyDiv">
					续签租金：<input id="sendMessageGoOnMoney" style="width:100px" onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
								onfocus="if (value =='0.00'){value =''}">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 12px;float:left" id="sendMessageAddressDiv">
					公司地址：<input id="sendMessageAddress" style="width:300px;">
				</div>
			</div>
			<div id="sendMessageDivThree" style="display:none">
				<div style="margin:5px 0 0 12px;float:left"
					 id="sendMessageUnpaidmMoneyDiv">
					欠费金额：<input id="sendMessageUnpaidmMoney" style="width:80px" onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
								onfocus="if (value =='0.00'){value =''}">
				</div>
				<div style="margin:5px 0 0 12px;float:left" id="sendMessageDeadlineDiv">
					截止日期：<input id="sendMessageDeadline" style="width:80px" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 36px;float:left" id="sendMessageUnpaidmNoteDiv1">备注：</div>
				<div style="margin:5px 0 0 0;float:left" id="sendMessageUnpaidmNoteDiv2">
					<textarea id="sendMessageUnpaidmNote" style="width:300px;height:50px"></textarea>
				</div>
			</div>
		</fieldset>
	</div>
	</br>
	<center>
		<div id="sendMessageTips" style="height:20px;color:red;"></div>
		<a class="easyui-linkbutton" iconcls="icon-yulan" onclick="if(validateRequire('sendMessageDlg')){previewSendMessage()}"> 示例预览</a>
		<a class="easyui-linkbutton" iconcls="icon-send" onclick="if(validateRequire('sendMessageDlg')){doSendMessage()}"> 发送</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#sendMessageDlg').dialog('close')">取消</a>
	</center>
</div>
<!-- 短信预览窗口 -->
<div id="previewSendMessageDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<div style="margin:5px 0 0 12px;float:left">
		短信类型：<input id="previewSendMessageType" style="width:150px" readonly="readonly">
	</div>
	<div style="clear:both"></div>
	<div style="margin:5px 0 0 12px;float:left">短信示例：</div>
	<div style="margin:5px 0 0 0;float:left">
		<textarea id="previewSendMessageNote" style="width:300px;height:90px" readonly="readonly"></textarea>
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
			楼盘名称：<input style="width:400px" id="turnoverAddress" disabled="disabled">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 0;float: left;'>
			原房管员：<input style="width:200px" id="turnoverStore" disabled="disabled">
		</div>
	</fieldset>
	</div>
	<fieldset>
		<legend>
			新房管员
		</legend>
		新房管员：<input id="pickHrManagerShowUserInfo" style="width:200px;cursor: pointer;"
					readonly="readonly" class="choose_user_button" doFlag="pickHrManager" doFun="" value="">
		<input id="pickHrManagerGetUserStoreId" type="hidden">
		<input id="pickHrManagerGetUserDetId" type="hidden">
		<input id="pickHrManagerGetUserId" type="hidden">
		<div id="pickHrManagerShowUserInfoDiv" style="display:none;"></div>
	</fieldset>
	<div style="clear:both"></div>
	</br>
	<div id="turnoverTips" style="height:20px;width:100%;"></div>
	<center>
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateManagerUser()">保存</a>
		<a class="easyui-linkbutton" onclick="$('#updateManagerUserDlg').dialog('close')" iconcls="icon-cancel">关闭</a>
	</center>
</div>
<!-- 添加审批信息 -->
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
			审批类型：<select class="eventType" style="width:100px;" choose="choose" require="require">
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
			涉及金额：<input class="amountInvolved" type="number" style="width:120px" clear="clear"
						onKeyUp="moneyKeyupFomat(this);changeMoney();" >
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

<!-- 已租详细信息对话框 -->
<div id="roomInfoDlg" class="easyui-dialog" data-options="closed:true">

	<!-- 已租详细信息选项卡 -->
	<div id="roomInfoTab" class="easyui-tabs" data-options="tabPosition:'left'">
		<!-- <div title="已租详情" id="detailHouseInfo" tabindex="-1" style="padding:5px 0 0 12px;list-style: none;">
				<div style="width:98.25%;">
					<fieldset><legend>房源信息</legend>
						<div style="margin:10px 0 0 15px;float: left;">
							租赁状态：<input style="width:100px;" disabled="disabled" id="infoReadhrLeaseState1">
						</div>
						<div style="margin:10px 0 0 31px;float: left;">
							物业地址：<input style="width:247px;" disabled="disabled" id="infoReadhrAddress1">
						</div>
						<div style="margin:10px 0 0 44px;float: left;">
							面积：<input style="width:100px;" disabled="disabled" id="infoReadhrHouseSquare1">
						</div>
						<div style="margin:10px 0 0 56px;float: left;">
							户型：<input style="width:100px;" disabled="disabled" id="infoReadhrSectionType1">
						</div>
						<div style="clear:both"></div>
						<div style="margin:5px 0 0 15px;float: left;">
							用途类型：<input style="width:100px;" disabled="disabled" id="infoReadhrHouseOwner1">
						</div>
						<div style="margin:5px 0 0 55px;float: left;">
							朝向：<input style="width:80px;" disabled="disabled" id="infoReadhrHouseDirection1">
						</div>
						<div style="margin:5px 0 0 27px;float: left;">
							微信绑定：<input style="width:80px;" disabled="disabled" id="infoReadwxOpen1">
						</div>
						<div style="margin:5px 0 0 32px;float: left;">
							房管员：<input style="width:100px;" disabled="disabled" id="infoReadhrManagerUser1">
						</div>
						<div style="margin:5px 0 0 44px;float: left;" id="infoReadhrBaseTd">
							预存款：<input style="width:100px;color:red;" disabled="disabled" id="infoReadhrBase1">
						</div>
						<div style="clear:both"></div>
						<div style="margin:5px 0 0 15px;float: left;">
							剩余租期：<input style="width:100px;" disabled="disabled" id="infoReadoverplus1">
						</div>
						<div style="margin:5px 0 0 19px;float: left;">
							业绩受益人：<input style="width:247px;" disabled="disabled" id="infoReadRassInfo1">
						</div>
						<div style="margin:5px 0 0 32px;float: left;">
							业务员：<input style="width:100px;" disabled="disabled" id="infoReadhrAdminUser1">
						</div>
						<div style="margin:5px 0 0 44px;float: left;">
							录入人：<input style="width:100px;" disabled="disabled" id="infoReadhrUser1">
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
				<div style="width:98%;">
						<div style="margin:5px 0 0 0;float:left;width:100%;">
							<table id="followInfoTables"></table>
							跟进分页
							<div id="followPageDiv1" style="width:100%;text-align:center;"></div>
						</div>
				</div>
				<div style="clear:both"></div>
				<div style="width:100%; margin: 5px 0 5px 0;">
					<div style="margin:0 0 5px 0;text-align: center;">
						<a class="easyui-linkbutton" iconcls="icon-up" onclick="hslaterOrNext(0)">上一条</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#readonlyTruDlg').dialog('close')">关闭</a>
						<a class="easyui-linkbutton" iconcls="icon-down" onclick="hslaterOrNext(1)">下一条</a>
					</div>
				</div>
			</div> -->
		<div title="租客信息" id="detailRenterInfo" tabindex="15">
			<div style="padding:0 0 0 10px;">
				<div style="margin:10px 0 0 15px;float: left;">
					租赁状态：<input style="width:100px;" disabled="disabled" id="infoReadhrLeaseState">
				</div>
				<div style="margin:10px 0 0 31px;float: left;">
					物业地址：<input style="width:247px;" disabled="disabled" id="infoReadhrAddress">
				</div>
				<div style="margin:10px 0 0 44px;float: left;">
					面积：<input style="width:100px;" disabled="disabled" id="infoReadhrHouseSquare">
				</div>
				<div style="margin:10px 0 0 56px;float: left;">
					户型：<input style="width:100px;" disabled="disabled" id="infoReadhrSectionType">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 15px;float: left;">
					用途类型：<input style="width:100px;" disabled="disabled" id="infoReadhrHouseOwner">
				</div>
				<div style="margin:5px 0 0 55px;float: left;">
					朝向：<input style="width:80px;" disabled="disabled" id="infoReadhrHouseDirection">
				</div>
				<div style="margin:5px 0 0 27px;float: left;">
					微信绑定：<input style="width:80px;" disabled="disabled" id="infoReadwxOpen">
				</div>
				<div style="margin:5px 0 0 32px;float: left;">
					房管员：<input style="width:100px;" disabled="disabled" id="infoReadhrManagerUser">
				</div>
				<div style="margin:5px 0 0 44px;float: left;" id="infoReadhrBaseTd">
					预存款：<input style="width:100px;color:red;" disabled="disabled" id="infoReadhrBase">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 15px;float: left;">
					剩余租期：<input style="width:100px;" disabled="disabled" id="infoReadoverplus">
				</div>
				<div style="margin:5px 0 0 19px;float: left;">
					业绩受益人：<input style="width:247px;" disabled="disabled" id="infoReadRassInfo">
				</div>
				<div style="margin:5px 0 0 32px;float: left;">
					业务员：<input style="width:100px;" disabled="disabled" id="infoReadhrAdminUser">
				</div>
				<div style="margin:5px 0 0 44px;float: left;">
					录入人：<input style="width:100px;" disabled="disabled" id="infoReadhrUser">
				</div>
				<div style="clear:both"></div>
				<div style="width:100%;height:165px;margin:5px 0 0 0;">
					<div style="float:left;width:49%;height:100%;">
						<fieldset>
							<legend>租客信息</legend>
							<div style="margin:5px 0 0 14px;float: left;">
								承租人：<input style="width:80px;" disabled="disabled" id="infoReadrenterPopName">
								<input style="width:100px;" disabled="disabled" id="infoReadrenterPopTelephone">
								<input style="width:170px;" disabled="disabled" id="infoReadrenterPopIdcard">
							</div>
							<div style="clear:both"></div>
							<div style="margin:5px 0 0 26px;float: left;">
								备注：<input style="width:358px;" disabled="disabled" id="infoReadrenterPopNameRemark">
							</div>
							<div style="clear:both"></div>
							<div style="margin:5px 0 0 14px;float: left;">
								联系人：<input style="width:80px;" disabled="disabled" id="infoReadrenterSecondContacts">
								<input style="width:100px;" disabled="disabled" id="infoReadrenterSecondPhone">
								<input style="width:170px;" disabled="disabled" id="infoRead">
							</div>
							<div style="clear:both"></div>
							<div style="margin:5px 0 0 14px;float: left;">
								代理人：<input style="width:80px;" disabled="disabled" id="infoRead1">
								<input style="width:100px;" disabled="disabled" id="infoRead2">
								<input style="width:170px;" disabled="disabled" id="infoRead3">
							</div>
							<div style="clear:both"></div>
							<div style="margin:5px 0 0 2px;float: left;">
								合同备注：<input style="width:358px;" disabled="disabled" id="infoReadhrHouseNote">
							</div>
							<div style="clear:both"></div>
						</fieldset>
					</div>
					<div style="float:left;width:49%;height:100%;">
						<fieldset>
							<legend>其它信息</legend>
							<div style="overflow: scroll; height:125px;">
								<div style="margin:5px 0 0 2px;float: left;"id="info">
									结清读数：<input style="width:120px;" disabled="disabled" id="infoReadwLast">
									<input style="width:120px;" disabled="disabled" id="infoReadeLast">
									<input style="width: 120px;" disabled="disabled" id="infoReadgLast">
									<input style="width: 120px;margin:5px 0 0 60px" disabled="disabled" id="infoReadhwLast">
									<input style="width: 120px;margin:5px 0 0 1px " disabled="disabled" id="infoReadhaLast">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 2px;float: left;">
									房屋押金：<input style="width:80px;" disabled="disabled" id="infoReadhrHouseDeposit">
								</div>
								<div style="margin:5px 0 0 3px;float: left;">
									水电押金：<input style="width:80px;" disabled="disabled" id="infoReadhrPowerDeposit">
								</div>
								<div style="margin:5px 0 0 4px;float: left;">
									门卡押金：<input style="width:80px;" disabled="disabled" id="infoReadhrDoorDeposit">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 2px;float: left;">
									其它押金：<input style="width:80px;" disabled="disabled" id="infoReadhrOtherDeposit">
								</div>
								<div style="margin:5px 0 0 27px;float: left;">
									租金：<input style="width:80px;" disabled="disabled" id="cdfjciMoney">
								</div>
								<div style="margin:5px 0 0 16px;float: left;">
									物管费：<input style="width:80px;" disabled="disabled" id="cdfjciManageCost">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 14px;float: left;">
									服务费：<input style="width:80px;" disabled="disabled" id="cdfjciServerCost">
								</div>
								<div style="margin:5px 0 0 15px;float: left;">
									网络费：<input style="width:80px;" disabled="disabled" id="infoReadhrWifiCharge">
								</div>
								<div style="margin:5px 0 0 16px;float: left;">
									电视费：<input style="width:80px;" disabled="disabled" id="infoReadhrTvCharge">
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 14px;float: left;">
									其它费：<input style="width:80px;" disabled="disabled" id="infoReadhrOtherPay">
								</div>
							</div>
						</fieldset>
					</div>
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 5px;float:left;">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" id="renterRenewButton2" onclick="renterRenew()">租客续签</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-tuifang" id="renterCheckoutButton2" onclick="renterCheckout()">租客退房</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-changeRenter" id="renterChangeButton" onclick="renterChange()">更换租客</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" id="sendMessageButton2" onclick="sendMessageDlg()">发送短信</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateManagerUserButton2" onclick="updateManagerUser()">设置房管员</a>
					<a class="easyui-linkbutton" iconCls="icon-fujian" plain="true" onclick="openAttachment('private')">附件上传</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-follow-up" id="writeFollowButton" onclick="writeFollowDlg(0)">写跟进</a>
				</div>
				<div style="margin:7px 0 0 10px;float:left;">
					<select id="infoFollowType1" onchange="infoFollowInfo(1)">
						<option value=''>全部跟进</option>
						<option value='系统跟进'>系统跟进</option>
						<option value='业务跟进'>业务跟进</option>
						<option value='行政跟进'>行政跟进</option>
						<option value='财务跟进'>财务跟进</option>
						<option value="房屋巡查">房屋巡查</option>
					</select>
				</div>
				<div style="clear:both"></div>
				<div style="width:98%;">
					<div style="margin:5px 0 0 0;float:left;width:100%;">
						<table id="followInfoTable1"></table>
						<!-- 跟进分页 -->
						<div id="followPageDiv1" style="width:100%;text-align:center;"></div>
					</div>
				</div>
				<div style="clear:both"></div>
				<%--<div style="text-align: center;">--%>
					<%--<a class="easyui-linkbutton" iconcls="icon-up" onclick="hslaterOrNext(0,1);">上一条</a>--%>
					<%--<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#roomInfoDlg').dialog('close')">关闭</a>--%>
					<%--<a class="easyui-linkbutton" iconcls="icon-down" onclick="hslaterOrNext(1,1);">下一条</a>--%>
				<%--</div>--%>
			</div>
		</div>
		<div title="业主信息" id="detailLandlordInfo" tabindex="0" id="readhs">
			<div style="margin:0 0 0 10px;">
				<div style="margin:10px 0 0 15px;float: left;">
					租赁状态：<input style="width:100px;" disabled="disabled" id="readhsLeaseState">
				</div>
				<div style="margin:10px 0 0 31px;float: left;">
					物业地址：<input style="width:247px;" disabled="disabled" id="hsAddress">
				</div>
				<div style="margin:10px 0 0 44px;float: left;">
					面积：<input style="width:100px;" disabled="disabled" id="readhsHouseSquare">
				</div>
				<div style="margin:10px 0 0 56px;float: left;">
					户型：<input style="width:100px;" disabled="disabled" id="readhsSectionType">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 15px;float: left;">
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
				<div style="margin:5px 0 0 15px;float: left;">
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
				<div style="margin:5px 0 0 16px;float: left;">
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
					<a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" id="landlordRenewButton3"onclick="landlordRenewData(1)">业主续签</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" id="sendMessageButton3" onclick="sendMessageDlg1()">发送短信</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateManagerUserButton3" onclick="updateManagerUser()">设置房管员</a>
					<!--
					<a class="easyui-linkbutton" plain="true" iconCls="icon-zhidaojia" id="guidePriceButton" onclick="guidePrice()">设置指导价</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="housingReleaseSettings" onclick="updateReleaseSettings()">房源发布设置</a> -->
					<a class="easyui-linkbutton" plain="true" iconCls="icon-follow-up" id="writeFollowButton2" onclick="writeFollowDlg(1)">写跟进</a>
				</div>
				<div style="margin:7px 0 0 10px;float:left;">
					<select id="infoFollowType" onchange="infoFollowInfo(0)">
						<option value=''>全部跟进</option>
						<option value='系统跟进'>系统跟进</option>
						<option value='业务跟进'>业务跟进</option>
						<option value='行政跟进'>行政跟进</option>
						<option value='财务跟进'>财务跟进</option>
						<option value="房屋巡查">房屋巡查</option>
					</select>
				</div>
				<div style="clear:both"></div>
				<div style="width:98%;">
					<div style="margin:5px 0 0 0;float:left;width:100%;">
						<table id="followInfoTable"></table>
						<!-- 跟进分页 -->
						<div id="followPageDiv" style="width:100%;text-align:center;"></div>
					</div>
				</div>
				<div style="clear:both"></div>
				<div style="text-align:center;">
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="hslaterOrNext(0,0)">上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-down" style="margin:0 0 0 20px;" onclick="hslaterOrNext(1,0)">下一条</a>
				</div>
			</div>
		</div>
		<div title="房屋收支" id="detailFinancialInfo" tabindex="1" style="overflow:hidden;">
			<div style="margin:5px 0 0 10px">
				<div style="margin:2px 0 0 5px;color:black;float:left;">
					归属类型：<select id="searchJfTheOwnershipType"
								 onchange="queryFinancial(1,0)" style="width:80px">
					<option></option>
				</select>
				</div>
				<div style="margin:2px 0 0 10px;color:black;float:left;">
					登记时间段：<input id="searchJfCheckInTimeStart"
								 onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
								 style="width:80px"> 至：<input id="searchJfCheckInTimeEnd"
															  onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFinancial(1,0)})"
															  style="width:80px">
				</div>
				<div style="margin:2px 0 0 10px;color:black;float:left;">
					<a class="easyui-linkbutton" iconcls="icon-search" id="financilSearchButton" >分类查询</a>
					<div id="financilSearchDiv"></div>
				</div>
				<input id="financilSearchJfNatureOfThe" style="display:none">
				<input id="financilSearchJfBigType" style="display:none">
				<input id="financilSearchJfAccountingSpecies" style="display:none">
			</div>
			<div style="clear:both"></div>
			<div style="padding:5px 0 0 15px;width: 97%; height: 90%;">
				<table id="paymentInfoTable" style="height:402px"></table>
				<!-- 收支分页 -->
				<div id="financialPageDiv" style="width:100%;text-align:center;"></div>
			</div>
		</div>
		<div title="业主账单" id="detailLandlordBillInfo" tabindex="6" style="overflow:hidden;">
			<div style="padding:5px 0 0 10px;width: 100%; height: 450px">
				<!-- <div style="margin:0 0 5px 5px;color:black;float:left;">
						审核状态：<select id="searchAuditStatus" onchange="queryPayable(1,0)" style="width:80px;">
							<option value="已付款">已付款</option>
							<option></option>
							<option value="未审核">未审核</option>
							<option value="已审核">已审核</option>
							<option value="待付款">待付款</option>
							<option value="重新核验">重新核验</option>
						</select>
					</div> -->
				<div style="margin:5px 0 5px 5px;float:left;">
					账单状态：<select id="searchLaJciState" onchange="queryPayable(1,0)" style="width:80px">
					<option value="">全部</option>
					<option value="已付">已付</option>
					<option value="待付" selected="selected">待付</option>
				</select>
				</div>
				<div style="clear:both"></div>
				<div id="DataGridPayableInfo" style="width:98%;height:80%;">
					<table id="payableInfoTable" style="height:402px"></table>
					<div id="payableInfoPageDiv" style="text-align:center;"></div>
				</div>
			</div>
		</div>
		<div title="租客账单" id="detailRenterBillInfo" tabindex="7" style="overflow:hidden;">
			<div style="padding:5px 0 0 10px;width: 100%; height: 450px">
				<div>
					<div style="margin:0 0 5px 5px;color:black;float:left;">
						账单状态：<select id="searchJciState" onchange="queryInstallment(1,0)" style="width:80px">
						<option value="">全部</option>
						<option value="已收">已收</option>
						<option value="待收" selected="selected">待收</option>

					</select>
					</div>
				</div>
				<div style="clear:both"></div>
				<div id="DataGridReceivableInfo" style="width:98%;height:80%;">
					<table id="receivableInfoTable" style="height:402px"></table>
					<!-- 收支分页 -->
					<div id="receivableInfoPageDiv" style="width:100%;text-align:center;"></div>
				</div>
			</div>
		</div>
		<div title="客户信息" id="detailPopulationInfo" tabindex="8" style="overflow:hidden;">
			<div style="padding:5px 0 0 10px;width: 100%; height: 450px">
				<div>
					<a class="easyui-linkbutton" onclick="addResident()" iconCls="icon-add" plain="true" id="addResidentButton">添加住户</a>
				</div>
				<div style="clear:both"></div>
				<div id="DataGridResident" style="width:98%;height:80%;">
					<table id="populationDg" style="width:100%;height:377px;table-layout:fixed;overflow:hidden;"></table>
					<div id="populationPageDiv" style="width:100%;text-align:center;"></div>
				</div>
			</div>
		</div>
		<div title="家私电器" id="detailAssetsInfo" tabindex="9">
			<div class="clearfix" style="margin:5px 0 5px 10px;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-qianru" onclick="moveInAssets(1)">迁入资产</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-qianchu" onclick="moveOutAssets(1)">迁出资产</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-peizhi" onclick="addAsset()">添加资产</a>
			</div>
			<div style="padding:0 0 5px 10px;width:98%; height:80%">
				<table id="assetsInfoTable" style="width:100%;height:327px;table-layout:fixed;overflow:hidden;"
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
		<div title="合约记录" id="detailContInfo" tabindex="2" style="padding:5px 0 0 12px;">
			<br>
			<legend>租客合约</legend>
			<div style="padding:5px 0 0 0;width: 98%;">
				<table id="renewalContinueTable"></table>
				<div id="RenterContinuePageDiv" style="width:100%;text-align:center;"></div>
			</div>
			<br><br><br>
			<legend>业主合约</legend>
			<div style="padding:5px 0 0 0;width: 98%;">
				<table id="landlordContinueTable"></table>
				<div id="landlordContinuePageDiv" style="width:100%;text-align:center;"></div>
			</div>
		</div>
		<div title="短信记录" id="detailMessageInfo" tabindex="12" style="overflow:hidden;">
			<div style="padding:5px 0 0 10px;width: 100%; height: 5%;">
				短信内容关键字查询：<input style="width:130px"  id="searchMessageNote" onkeyup="queryMsgOnkeyup(this.id,5,0)">
			</div>
			<div style="padding:5px 0 0 10px;width: 98%; height: 90%;">
				<table id="sendMessageTable" style="width:100%;height:402px;"></table>
				<div id="sendMessagePageDiv" style="width:100%;text-align:center;"></div>
			</div>
		</div>
		<div title="房间照片" id="detailHrPicInfo" tabindex="13" >
			<div style="display:none">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-chakantupian" id="check_hs_imgButton" onclick="check_hs_img()">上传及查看图片</a>
			</div>
			<div style="padding:5px 0 0 10px;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-upload" onclick="upload_hstab_img()">上传</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-shanchutupian" onclick="remove_hstab_img()">选择删除</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-shuaxin" onclick="refresh_hstab_img()">刷新</a>
				<span id="_hstab_imgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
			</div>
			<div id="_hstab_title" style="margin:5px 0 0 5px;font-size:16px;color:#F00;display:none;"></div>
			<div style="clear:both"></div>
			<left>
				<div id="_hstab_btn" style="margin:10px 0 0 10px;display:none;">
					<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemove_hstab_img()">删除</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel_hstab_img()">取消</a>
				</div>
			</left>
			<div id="_hstab_imgWrapper" style="margin:10px 0 0 10px;width: 98%;min-height: 400px;"></div>

		</div>
		<div title="能源卡号" id="detailEnergyInfo" tabindex="10" style="overflow:hidden;">
			<!-- <fieldset>
					<legend>
						抄表数据
					</legend>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add-chaobiao" id="metterButton" onclick="rentMetter()">添加抄表</a>
					<div style="margin:5px 0 5px 5px">
						水表&emsp;&emsp; 本次读数： <input id="wThis" style="width:80px;" readonly>
						上次读数：<input id="wLast" style="width:80px;" readonly>
					</div>
					<div style="margin:5px 0 5px 5px">
						电表&emsp;&emsp; 本次读数： <input id="eThis" style="width:80px;" readonly>
						上次读数：<input id="eLast" style="width:80px;" readonly>
					</div>
					<div style="margin:5px 0 5px 5px">
						燃气表&emsp; 本次读数： <input id="gThis" style="width:80px;" readonly>
						上次读数：<input id="gLast" style="width:80px;" readonly>
					</div>
				</fieldset> -->
			<div class="clearfix" style="margin:5px 0 5px 10px;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add-notice" onclick="addCard()">添加卡号</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-edit-number" onclick="updateCard()">修改卡号</a>
			</div>
			<legend style="padding:5px 0 0 10px;">能源卡号列表</legend>
			<div style="padding:5px 0 0 10px;width: 98%;">
				<table id="energyCardInfoTable"></table>
			</div>
			<legend style="padding:5px 0 0 10px;">能源账单列表</legend>
			<div style="padding:5px 0 0 10px;width: 98%;">
				<table id="accountReceivableTable"></table>
				<div id="accountReceivablePageDiv" style="width:100%;text-align:center;"></div>
			</div>
		</div>
		<div title="维保记录" id="detailRepairInfo" tabindex="4" style="overflow:hidden;">
			<div style="padding:5px 0 0 10px;width: 98%;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addRepairButton" onclick="addRepair()">添加维修</a>
				<table id="repairInfoTable"></table>
				<div id="repairInfoPageDiv" style="width:100%;text-align:center;"></div>
			</div>
		</div>
		<div title="审批记录" id="detailEventInfo" tabindex="5" style="overflow:hidden;">
			<div style="padding:5px 0 0 10px;width: 98%;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add-event" id="addEventButton" onclick="addEvent()">添加审批</a>
				<a class="easyui-linkbutton" iconCls="icon-fujian" plain="true" onclick="showAttachmentHandle()">查看附件</a>
				<table id="eventInfoTable"></table>
				<div id="eventInfoPageDiv" style="width:100%;text-align:center;"></div>
			</div>
		</div>
		<div title="任务记录" id="detailTaskInfo" tabindex="12" style="overflow:hidden;">
			<div style="padding:5px 0 0 10px;width: 98%;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addTaskButton" onclick="addvirtualRepair()">添加任务</a>
				<table id="virtualRepairTable"></table>
				<div id="virtualRepairPageDiv" style="width:100%;text-align:center;"></div>
			</div>
		</div>
		<div title="授权管理" id="doorLockInfo" tabindex="15" style="overflow:hidden;">
			<div style="padding:5px 0 0 10px;width: 98%;">
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add"  onclick="showAddDoorCart()">授权</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add"  onclick="logoutDoorCart(1)">注销</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add"  onclick="logoutDoorCart(2)">退卡</a>
				<a class="easyui-linkbutton" plain="true" iconCls="icon-add"  onclick="logoutDoorCart(3)">续期</a>
				<select id="stateSelect">
					<option>全部</option>
					<option>使用中</option>
					<option>注销</option>
					<option>退卡</option>
					<option>授权到期</option>
				</select>
				<table id="doorLockTable"></table>
			</div>
			<div style="padding:5px 0 0 10px;width: 98%;">
				<table id="doorLockFollowTable"></table>
			</div>
		</div>
		<!-- <div title="智能设备" tabindex="16" style="padding:5px 0 0 12px;">
				<div class="clearfix">
					<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="bindDevice()">绑定设备</a>
					<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="operateDeviceDlg()">操作设备</a>
				</div>
				<div style="padding:5px 0 0 0;">
					<table id="deviceInfoTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="brandName" width="20" align="center">设备品牌</th>
								<th field="brandType" width="10" align="center">设备类型</th>
								<th field="brandModel" width="20" align="center">设备型号</th>
								<th field="devNickname" width="30" align="center">设备名称</th>
							</tr>
						</thead>
					</table>
				</div>
			</div> -->
		<!-- <div title="跟进记录" tabindex="3" style="overflow:hidden;">
				<div style="padding:5px 0 0 10px;width: 100%; height: 100%;">
					<div style="margin:0 0 5px 10px;">
						<select id="mainFollowType" onchange="queryFollowDb(1, 0)">
							<option value=''>全部跟进</option>
							<option value='系统跟进'>系统跟进</option>
							<option value='业务跟进'>业务跟进</option>
							<option value='行政跟进'>行政跟进</option>
							<option value='财务跟进'>财务跟进</option>
							<option value='房屋巡查'>房屋巡查</option>
						</select>
						<a class="easyui-linkbutton" plain="true" iconCls="icon-follow-up" id="writeFollowButton" onclick="writeFollowDlg()">写跟进</a>
					</div>
					<table id="inFollowInfoTable" style="height:380px">
					</table>
					<%--跟进分页 --%>
					<div id="followDbPageDiv" style="width:100%;text-align:center;"></div>
				</div>
			</div> -->
	</div>
</div>

<!-- 短信详细信息 -->
<div id="readonlyMessageDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
	<div style='margin:5px 0 0 2px;float: left;display:none;'>
		短信编号：<input style="width:130px" readonly='readonly' class="messageId">
		<input style="display:none" class='message_index'>
	</div>
	<div style='margin:5px 0 0 6px;float: left;display:none;'>
		类&emsp;&emsp;别：<input style="width:130px" readonly='readonly'
							  class="messageType">
	</div>
	<div style='margin:5px 0 0 6px;float: left;'>
		发送状态：<input style="width:130px" readonly='readonly'
					class="messageStatus">
	</div>
	<div style='margin:5px 0 0 6px;float: left;'>
		处理状态：<input style="width:130px" readonly='readonly'
					class="messageTreatmentStatus">
	</div>
	<div style='clear:both;'>
		<div style='margin:5px 0 0 6px;float: left;'>
			姓&emsp;&emsp;名：<input style="width:130px" readonly='readonly'
								  class="messageName">
		</div>
		<div style='margin:5px 0 0 6px;float: left;'>
			电&emsp;&emsp;话：<input style="width:130px" readonly='readonly'
								  class="messagePhone">
		</div>
		<div style='clear:both;'>
			<div style='margin:5px 0 0 6px;float: left;'>
				短信条数：<input style="width:130px" readonly='readonly'
							class="messageCount">
			</div>
			<div style='margin:5px 0 0 6px;float: left;'>
				发送时间：<input style="width:130px" readonly='readonly'
							class="messageTime">
			</div>
			<div style='clear:both;'>
				<div style='margin:5px 0 0 6px;float: left;'>短信内容：</div>
				<div style='margin:5px 0 0 0;float: left;'>
			<textarea style="width:326px;height:100px;" readonly='readonly'
					  class="messageContent"></textarea>
				</div>
				<div style="display:none;">
					<div style='margin:5px 0 0 5px;float: left;'>接口返回：</div>
					<div style='margin:5px 0 0 1px;float: left;'>
				<textarea style="width:326px;height:100px;" readonly='readonly'
						  class="messageField"></textarea>
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
			<div id="addAssetDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
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
					<div style="margin:0 0 5px 5px;float:left;">
						资产所属：<select id="add_asset_type" style="width:130px;" choose="choose" must="must">
						<option></option>
					</select>
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						使用情况：<select id="add_asset_use" style="width:130px;" choose="choose" must="must">
						<option></option>
					</select>
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						资产状态：<select id="add_asset_status" style="width:130px;" choose="choose" must="must">
						<option></option>
					</select>
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;价格：<input id="add_asset_price" style="width:130px;" clear="clear" must="must" placeholder="必填" placeholder="必填"
											  onKeyUp="moneyKeyupFomat(this)" onBlur="moneyBlurFomat(this)"
											  onfocus="if (value =='0.00') {value = ''}">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						资产类型：<select id="add_asset_classify" style="width:130px;" choose="choose" must="must" onchange="changeAssetsType('add_asset_')">
						<option></option>
					</select>
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;名称：<select id="add_asset_name" style="width:130px;" choose="choose" must="must">
						<option></option>
					</select>
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;品牌：<input id="add_asset_brand" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						&emsp;&emsp;型号：<input id="add_asset_model" style="width:130px;" clear="clear">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">&emsp;&emsp;备注：</div>
					<div style="margin:0 0 5px 0;float:left;">
						<textarea id="add_asset_remark" style="width:325px;height:50px;" clear="clear"></textarea>
					</div>
					<!-- <div style="margin:0 0 5px 5px;float:left;">
				&emsp;供应商：<input id="assets_changeSupplier" readonly="readonly" onclick="choseSupplier(0)"
					style="width:325px" placeholder="单击选择供应商，可选" clear="clear">
				<input type="hidden" id="assets_supplier_id" clear="clear">
			</div> -->
					<div style="margin:3px 0 5px 5px;float:left;">
						&emsp;&emsp;数量：<input id="add_asset_number" style="width:130px;" clear="clear" must="must" placeholder="必填"
											  onkeyup="this.value=this.value.replace(/\D/g,'')"
											  onafterpaste="this.value=this.value.replace(/\D/g,'')">
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						<a class="easyui-linkbutton" iconcls="icon-add" onclick="addToDataGrid()">添加</a>
					</div>
					<div style="margin:0 0 5px 5px;float:left;">
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="cleanDataGrid()">清除</a>
					</div>
				</fieldset>
				<div id="addAssetTableDiv" style="margin:5px 0 5px 0;">
					<table id="addAssetTable"></table>
				</div>
				<center style="margin:10px 0 5px 5px;">
					<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddAsset()">保存</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addAssetDlg').dialog('close')">关闭</a>
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
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="hslaterOrNext(0,2)"> 上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="hslaterOrNext(1,2)"> 下一条</a>
				</div>
			</div>
			<div id="readonlyInFollowInfoTable" style="padding:6px;" class="easyui-dialog"
				 data-options="closed:true,title : '跟进详细',width:500,height:250,cache : false,modal : true">
				<center>
					<table class="xwtable" style="margin-top:10px;">
						<tbody>
						<tr>
							<td>楼盘名称：</td>
							<td colspan="3"><span id="inFollowInfoTableaddCommunity"></span>-<span id="inFollowInfoTableaddBuilding"></span>-<span id="inFollowInfoTableaddDoorplateno"></span></td>
						</tr>
						<tr>
							<td>跟进人：</td>
							<td><span id="inFollowInfoTablejhfUserName"></span></td>
							<td>跟进类型：</td>
							<td><span id="inFollowInfoTablejhfPaymentWay"></span></td>
						</tr>
						<tr>
							<td>跟进归属：</td>
							<td colspan="3"><span id="inFollowInfoTablejhfFollowBelong"></span></td>
						</tr>
						<tr>
							<td>跟进内容：</td>
							<td colspan="3" style="text-align:left"><span id="inFollowInfoTablejhfFollowRemark"></span></td>
						</tr>
						</tbody>
					</table>
				</center>
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
					<span id="_repair3_imgNumre" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
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

			<!-- 业主账单详细窗口 -->
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
						特殊编号：<input style="width:110px;" id="jciSpecialNumber1" readonly>
					</div>
					<div style="clear:both"></div>
				</fieldset>
				<fieldset>
					<legend>房东账户</legend>
					<div style="margin:5px 0 0 5px;float:left;">
						户名：<input style="width:100px" id="bankName1" readonly>
					</div>
					<div style="margin:5px 0 0 5px;float:left;">
						银行：<input style="width:100px" id="bankType1" readonly>
					</div>
					<div style="margin:5px 0 0 5px;float:left;">
						账号：<input style="width:172px" id="bankNum1" readonly>
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
						<a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'payable_index', 'payableInfoTable', 'payableInfoDlg', 'seePayable(row)');">上一条</a>
						<a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'payable_index', 'payableInfoTable', 'payableInfoDlg', 'seePayable(row)');">下一条</a>
					</center>
				</div>
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

			<!-- 客户详细信息窗口 -->
			<div id="populationDetailedDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
				<input id="population_index" type="hidden">
				<div style="float: left;">
					<div style='margin:10px 0 0 34px;float: left;'>
						姓名：<input id="pop_name" style="width:80px" clear="clear">
					</div>
					<div style='margin:10px 0 0 30px;float: left;'>
						电话：<input id="pop_telephone" style="width:80px" clear="clear">
					</div>
					<div style='margin:10px 0 0 40px;float: left;'>
						备注：<input id="pop_name_remark" style="" clear="clear">
					</div>
					<div style="clear:both"></div>
					<div style='margin:10px 0 0 10px;float: left;'>
						证件号码：<input id="pop_idcard" style="width:226px" clear="clear">
					</div>
					<div style='margin:10px 0 0 40px;float: left;'>
						证件类型：<select id="pop_idcard_type" style="" choose="choose">
						<option value=""></option>
						<option value="身份证/临时身份证/户口本">身份证/临时身份证/户口本</option>
						<option value="回乡证/护照">回乡证/护照</option>
						<option value="其他">其他</option>
					</select>
					</div>
					<div style="clear:both"></div>
					<div style='margin:10px 0 0 34px;float: left;'>
						性别：<select id="pop_sex" style="width:80px" choose="choose">
						<option value=""></option>
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
					</div>
					<div style='margin:10px 0 0 30px;float: left;'>
						民族：<input id="pop_nation" style="width:80px" clear="clear">
					</div>
					<div style='margin:10px 0 0 40px;float: left;'>
						婚姻状况：<select id="pop_marriage_state" style=" " choose="choose">
						<option value=""></option>
						<option value="已婚">已婚</option>
						<option value="未婚">未婚</option>
						<option value="离异">离异</option>
						<option value="其他">其他</option>
					</select>

					</div>
					<div style="clear:both"></div>
					<div style='margin:10px 0 0 10px;float: left;'>
						户籍地址：<input id="pop_idcard_address" style="width:226px" clear="clear">
					</div>
					<div style='margin:10px 0 0 40px;float: left;'>
						文化程度：<select id="pop_degree_education" style="" choose="choose">
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

					<div style="clear:both"></div>

					<div style='margin:10px 0 0 34px;float: left;'>
						职业：<select id="pop_occupation" style="width:80px" choose="choose">
						<option value=""></option>
						<option value="工人">工人</option>
						<option value="公务员">公务员</option>
						<option value="职员">职员</option>
						<option value="农民">农民</option>
						<option value="其他">其他</option>
					</select>
					</div>
					<div style='margin:10px 0 0 30px;float: left;'>
						生日：<input id="pop_birth" style="width:80px;" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
					</div>
					<div style='margin:10px 0 0 36px;float: left;'>
						内/外信用：<input id="pop_inner_credit_level" style="width:48px;" clear="clear">
						<input id="pop_outer_credit_level" style="width:49px;" clear="clear">
					</div>

					<div style="clear:both"></div>
				</div>

				<div style="margin:10px 0 0 45px;float: left;">
					<img width="120px" height="140px" src="images/userImage.png" style="margin-left:5px" id="id_img_pers">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 5px 0px;float: left;'>
					<a class="easyui-linkbutton" iconCls="icon-fujian" plain="true" onclick="showAttachmentHandle()">查看附件</a>
					<a class="easyui-linkbutton" onclick="pushingCard(1)" iconCls="icon-add" plain="true" id="cardIssuingButton">授权</a>
					<%--121qq  updataIdCard  --%>
					<%--display: 1显示,0隐藏 ;   下面保存和修改按钮实现--%>
					<a class="easyui-linkbutton" id="updataIdCard" onclick="new Device().startFun(this.id)"style="display:none;float:right;">读取身份证</a>
				</div>

				<div style="clear:both"></div>
				<div style="margin:10px 0 0 0;">
					<table id="houseDg" style="width:100%;height:147px;table-layout:fixed;overflow:hidden;"
						   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
						<tr>
							<th field="detailedAddress" width="40" align="center">关联房屋地址</th>
							<th field="popHouseRelation" width="20" align="center">关系</th>
							<th field="contStatus" width="20" align="center">合约状态</th>
							<th field="registrationTime" width="20" align="center">登记日期</th>
						</tr>
						</thead>
					</table>
				</div>
				<div style="margin:10px 0 0 0;">
					<table id="followUpInformationTable" style="width:100%;height:147px;table-layout:fixed;overflow:hidden;"
						   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
						<tr>
							<th field="text" width="70" align="center">内容</th>
							<th field="registrantName" width="10" align="center">操作人</th>
							<th field="time" width="20" align="center">操作时间</th>
						</tr>
						</thead>
					</table>
				</div>
				<div style="margin:10px 0 0 0;text-align:center;">
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'population_index', 'populationDg', 'populationDetailedDlg', 'populationDetailedDlg(row)')">上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-edit" onclick="updateLivingMen()" id="updateLivingMenButton">修改住户</a>
					<a class="easyui-linkbutton" iconcls="icon-edit" onclick="openUpdate(1)" id="updateButton">修改</a>
					<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdatePopulation(0)" id="doUpdateButton">保存</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'population_index', 'populationDg', 'populationDetailedDlg', 'populationDetailedDlg(row)')">下一条</a>
				</div>
			</div>

			<!-- 发卡窗口  -->
			<div id="pushingCardDlg1" style="padding:6px" class="easyui-dialog" data-options="closed:true">
				<div id="pushingCardSelect1" style='margin:10px 0 0 15px;float: left;'>
				</div>

				<%--<div id="deviceNameDiv" style='margin:10px 0 0 15px;float: left;'>
            人脸识别：<input id="deviceName2" style="margin:0 10px 0 0" type="checkbox" />
        </div>--%>

				<div style="clear:both"></div>
				<div style='margin:10px 0 0 15px;float: left;'>
					租客：<select id="selectRentan" style="width:120px" choose="choose">
				</select>
				</div>
				<div id="photoUploadDiv"style='margin:10px 0 0 15px;height:20px; float: left;'>
					<a id="photoUpload" class="easyui-linkbutton" style='height:20px;display:none'iconCls="icon-upload" plain="false" onclick="openAttachment('public')">相片上传</a>
				</div>
				<div style='margin:10px 0 0 5px;height:20px; float: left;'>
					<a id="photoDlgs" class="easyui-linkbutton" style='height:20px;display:none'iconCls="icon-upload" plain="false" onclick="new_page()">拍照上传</a>
				</div>
				<div style='margin:10px 0 0 17px;float: left;'>
					<label>授权方式:</label>
					<input type="checkbox" name="authorize" onclick="assistingAffairs1(0)" id="SmartDoor" require="require">门卡授权
					<input type="checkbox" name="authorize" onclick="assistingAffairs1(1)" id="PasswordDoor" require="require">密码授权
				</div>
				<div style="clear:both"></div>
				<div id="cardId1Div" style='margin:10px 0 0 15px;float: left; display:none'>
					授权：<input id="cardId1" style="width:120px;" autocomplete="off" autofocus="autofocus" type="password"  clear="clear">
				</div>
				<div id="pushingTimeDiv" style='margin:10px 0 0 17px;float: left; display:none'><!-- readonly="readonly" -->
					期限：<input id="pushingTime1" style="width:120px;" type="date"  clear="clear">
				</div>

				<div id="pwdUnlockSelect" style='margin:10px 0 0 17px;float: left; display:none'>
					<label>限次/限时:</label>
					<input type="checkbox" name="authorize1" onclick="assistingAffairs1(2)" id="UnlockingTimes" require="require">开锁次数
					<input type="checkbox" name="authorize1" onclick="assistingAffairs1(3)" id="UnlockingPeriod" require="require">开锁期限
				</div>
				<div id="MaxNumber" style='margin:10px 0 0 15px;float: left; display:none' >
					次数：<input id="authorizeTimes" style="width:120px;" autocomplete="off" autofocus="autofocus" type="text"  clear="clear">
				</div>
				<div id="DeadlineTimeDiv" style='margin:10px 0 0 17px;float: left; display:none'><!-- readonly="readonly" -->
					期限：<input id="pushingTime2" style="width:120px;" type="date"  clear="clear">
				</div>
				<div style="float: left;">
					<div id="doorCardNum1Div" style='margin:10px 0 0 15px;float: left; display:none'>
						卡号：<input id="doorCardNum1" style="width:120px;"  clear="clear">
					</div>
					<div id="doorCardFeeCheck1Div" style='margin:10px 0 0 17px;float: left;display:none;'>
						收费：<input type="checkbox" id="doorCardFeeCheck1" value="all"/>
					</div>
					<div style="clear:both"></div>
					<div id="doorCardFee1" style="display:none">
						<div style='margin:10px 0 0 15px;float: left;'>
							押金：<input id="doorCardFeeDeposit1" style="width:120px"  clear="clear">
						</div>
						<div style='margin:10px 0 0 5px;float: left;'>
							工本费：<input id="doorCardMaterialFee1" style="width:120px;"  clear="clear">
						</div>
					</div>
				</div>
				<div style="clear:both"></div>
				<div style="margin:10px 0 0 0">
					<table id="populationDoorLockDg" class="easyui-datagrid" style="width:100%;height:150px;table-layout:fixed;overflow:hidden;"
						   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
						<tr>
							<th field="houseAddrss" width="50" align="center">已发卡地址</th>
							<th field="devNickname" width="25" align="center">锁名</th>
							<th field="jdcState" width="25" align="center">状态</th>
						</tr>
						</thead>
					</table>
				</div>
				<div style="clear:both"></div>
				<div style="text-align:center;">
					<a id="doPushingCard1" class="easyui-linkbutton" style="margin:40px 5px 0  0;" iconcls="icon-save" onclick="doPushingCard1()">授权</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" style="margin:40px 0 0 5px;" onclick="$('#pushingCardDlg1').dialog('close')">关闭</a>
				</div>
			</div>

			<!-- 发卡窗口  -->
			<div id="pushingCardDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
				<div id="pushingCardSelect" style='margin:10px 0 0 15px;float: left;'></div>

				<div style="clear:both"></div>
				<div style='margin:10px 0 0 15px;float: left;'>
					授权：<input id="cardId" style="width:120px;" oninput="watchInput()" autocomplete="off" autofocus="autofocus" type="text" onfocus="this.type='password'" clear="clear">
				</div>
				<div style='margin:10px 0 0 17px;float: left;'><!-- readonly="readonly" -->
					期限：<input id="pushingTime" style="width:120px;" type="date"  clear="clear">
				</div>
				<div id="shouquan" style="float: left;display:none">
					<div style='margin:10px 0 0 15px;float: left;'>
						卡号：<input id="doorCardNum" style="width:120px;"  clear="clear">
					</div>
					<div style='margin:10px 0 0 17px;float: left;'>
						收费：<input type="checkbox" id="doorCardFeeCheck" value="all"  />
					</div>
					<div style="clear:both"></div>
					<div id="doorCardFee" style="display:none">
						<div style='margin:10px 0 0 15px;float: left;'>
							押金：<input id="doorCardFeeDeposit" style="width:120px"  clear="clear">
						</div>
						<div style='margin:10px 0 0 5px;float: left;'>
							工本费：<input id="doorCardMaterialFee" style="width:120px;"  clear="clear">
						</div>
					</div>
				</div>
				<div style="clear:both"></div>
				<div style="text-align:center;">
					<a id="doPushingCard" class="easyui-linkbutton" style="margin:40px 5px 0  0;" iconcls="icon-save" onclick="doPushingCard()">授权</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" style="margin:40px 0 0 5px;" onclick="$('#pushingCardDlg').dialog('close')">关闭</a>
				</div>
			</div>

			<!-- 房屋相关人员 -->
			<div id="housePopulationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
				<table id="housePopulationDg" class="easyui-datagrid" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
					   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
					<thead>
					<tr>
						<th field="popName" width="25" align="center">姓名</th>
						<th field="popRelation" width="25" align="center">承租人关系</th>
						<th field="contStatus" width="25" align="center">居住状态</th>
						<th field="popGmtModified" width="25" align="center">更新日期</th>
					</tr>
					</thead>
				</table>
			</div>
			<!-- 客户信息添加信息窗口 -->
			<div id="addResidentDbDlg" style="padding:6px;display:none;">
				<input id="identityInformation" type="hidden"/>
				<div style="clear:both"></div>
				<div style='margin:10px 0 0 34px;float: left;'>
					姓名：<input id="popName" style="width:80px" clear="clear" require="require">
				</div>
				<div style='margin:10px 0 0 10px;float: left;'>
					备注：<input id="popNameRemark" style="width:80px" clear="clear">
				</div>
				<div style='margin:10px 0 0 50px;float: left;'>
					电话：<input id="popTelephone" style="width:80px" clear="clear" require="require">
				</div>

				<div style='margin:10px 0 0 47px;float: left;'>
					<img width="120px" height="140px" src="images/userImage.png" onerror="this.src='images/userImage.png'" style="margin-left:5px" id="id_img_perss">
					<!-- <img width="120px" height="140px" src="images/userImage.png" style="margin-left:5px" id="id_img_pers"> -->
					<br/>
				</div>

				<div style="clear:both"></div>

				<div style='margin:-124px 0 0 0px;float: left;'>
					<div style='margin:10px 0 0 10px;float: left;'>
						证件号码：<input id="popIdcard" style="width:230px" clear="clear" require="require">
					</div>

					<div style='margin:10px 0 0 50px;float: left;'>

						民族：<input id="popNation" style="width:80px" clear="clear">
					</div>
					<div style="clear:both"></div>
					<div style='margin:10px 0 0 10px;float: left;'>
						户籍地址：<input id="popIdcardAddress" style="width:230px" clear="clear">
					</div>

					<div style='margin:10px 0 0 50px;float: left;'>
						性别：<select id="popSex" style="width:80px" choose="choose">
						<option value=""></option>
						<option value="男">男</option>
						<option value="女">女</option>
					</select>

					</div>
					<div style="clear:both"></div>

					<div style='margin:10px 0 0 34px;float: left;'>
						生日：<input id="popBirth" style="width:80px;" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
					</div>
					<div style='margin:10px 0 0 34px;float: left;'>
						职业：<select id="popOccupation" style="width:80px" choose="choose">
						<option value=""></option>
						<option value="工人">工人</option>
						<option value="公务员">公务员</option>
						<option value="职员">职员</option>
						<option value="农民">农民</option>
						<option value="其他">其他</option>
					</select>
					</div>

					<div style='margin:10px 0 0 26px;float: left;'>
						婚姻状况：<select id="popMarriageState" style="width:80px" choose="choose">
						<option value=""></option>
						<option value="已婚">已婚</option>
						<option value="未婚">未婚</option>
						<option value="离异">离异</option>
						<option value="其他">其他</option>
					</select>
					</div>
					<div style="clear:both"></div>
					<div style="margin:10px 0 0 10px;float:left">
						文化程度：<select id="popDegreeEducation" style="width:80px" choose="choose">
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

					<div style='margin:10px 0 0 10px;float: left;'>
						住户状态：<select id="addrtTypeDb" style="width:80px;">
						<option></option>
						<option valuse="在住">在住</option>
						<option valuse="搬离">搬离</option>
						<option valuse="无效">无效</option>
					</select>
					</div>
					<input id="idIssued" style="display: none;">
					<input id="issuedValidDate" style="display: none;">
					<div style='margin:10px 0 0 95px;float: left;'>



						<a id="addHouseholdsID" class="easyui-linkbutton" onclick="new Device().startFun(this.id)">读取身份证</a>
						<!-- <a id="addHouseholdsID" class="easyui-linkbutton" onclick="IDCardInformation()">读取身份证</a> -->
					</div>
					<div style="clear:both"></div>
				</div>


				<div style="clear:both"></div>

				<div id="addResidentSaveDb" style="margin:25px 0 10px 0;">
					<center>
						<a id="addResidentSaveButtonDb" class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addResidentDbDlg')){doAddResident()}">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addResidentDbDlg').dialog('close')">取消</a>
					</center>
				</div>
				<div id="updateResidentSaveDb" style="margin:25px 0 10px 0;">
					<center>
						<a id="updateResidentSaveButtonDb" class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addResidentDbDlg')){doUpdateResident()}" id="saveUpdateResidentDb">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addResidentDbDlg').dialog('close')">取消</a>
					</center>
				</div>
			</div>
			<div id="attachmentDlgHandle" style="padding:6px;display:none;">
				<div style="padding:5px 0 0 10px;">
					<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refreshHandle()">刷新</a>
				</div>
				<div id="imgWrapperHandle" style="margin:10px 0 0 10px;"></div>
				<div style="clear:both"></div>
			</div>

			<!-- 能源卡号的添加, 修改 -->
			<div id="addCardDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
				<fieldset>
					<legend>
						卡号归属
					</legend>
					<!-- <div style='margin:5px 0 0 2px;float: left;'>
				选择房源：
				<input style="width:100px" readonly='readonly'
					onclick="relationDlg()" id="addHouseCoding" value="单击选择房源">
				<input style="display:none" id='addHouseStoreId'>
			</div> -->
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
					<legend>
						卡号信息
					</legend>
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

			<!-- 查看能源账单 -->
			<div id="energyBillDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
				<input type="hidden" id='energyBill_index'>
				<div style='margin:5px 0 0 2px;float: left;'>
					账单状态：
					<input style="width:84px" class="jciState" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					交租日：
					<input style="width:72px" class="jciFukuanri" readonly clear="clear">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 2px;float: left;'>
					水表：本次读数
					<input style="width:60px" class="waterThis" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					上次读数：
					<input style="width:60px" class="waterLast" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					差值：
					<input style="width:60px" class="waterNum" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					水费：
					<input style="width:60px" class="water" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					抄表日期：
					<input style="width:60px" class="waterDate" readonly clear="clear">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 2px;float: left;'>
					电表：本次读数
					<input style="width:60px" class="electThis" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					上次读数：
					<input style="width:60px" class="electLast" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					差值：
					<input style="width:60px" class="electNum" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					电费：
					<input style="width:60px" class="elect" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					抄表日期：
					<input style="width:60px" class="electDate" readonly clear="clear">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 2px;float: left;'>
					气表：本次读数
					<input style="width:60px" class="gasThis" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					上次读数：
					<input style="width:60px" class="gasLast" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					差值：
					<input style="width:60px" class="gasNum" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					气费：
					<input style="width:60px" class="gas" readonly clear="clear">
				</div>
				<div style='margin:5px 0 0 2px;float: left;'>
					抄表日期：
					<input style="width:60px" class="gasDate" readonly clear="clear">
				</div>
				<div style="clear:both"></div>
				<div style='margin:8px 0 0 0;text-align:center;'>
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'energyBill_index', 'accountReceivableTable', 'energyBillDlg', 'energyBillDlg(row)')">上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'energyBill_index', 'accountReceivableTable', 'energyBillDlg', 'energyBillDlg(row)')">下一条</a>
				</div>
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

			<!-- 维保事务回访  -->
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
			<!-- 维保事务进展 -->
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
						业主姓名：<input id="landlordRenewLandlordName" style="width:80px"
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
				免租期：<input id="landlordRenewFreedDays" style="width:47px" onkeyup="lrChangeDate()" needs="1"> 天
			</div> -->
					<div style='margin:5px 0 0 5px;float: left;'>
						提前 <input type="number" id="landlordRenewAdvancePay" style="width:39px" needs="1">天交租
					</div>
					<div style='margin:5px 0 0 5px;float: left;'>
						新房屋押金：<input type="number" data-type="money" id="landlordRenewAddDeposit" style="width:44px" needs="1">元
					</div>
					<div style='margin:5px 0 0 2px;float: left;display:none;'>
						价格阶梯：<input id="lrjrlPriceLadder">
					</div>
					<div style='margin:5px 0 0 2px;float: left;display:none;'>
						免租期时段：<input id="lrjrlRentFreeSegment">
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 0;float: left;'>
						合同性质：<input id="landlordRenewContractType" style="width:80px" disabled="disabled">
					</div>
					<div style='margin:5px 0 0 17px;float: left;'>
						登记人：<input id="landlordRenewUser" style="width:80px" disabled="disabled">
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
									onkeyup="$(this).val($(this).val().toUpperCase());if(event.keyCode==13){contractNumCheckoutHs(1);}"
									onblur="contractNumCheckoutHs(1)">
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

			<!-- 业主短信息窗口 -->
			<div id="sendMessageDlg1" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
				<fieldset>
					<legend>基本信息</legend>
					<div style="margin:0 0 0 12px;float:left">
						短信类型：<select id="sendMessageType1" style="width:150px" onchange="resizeSendMessage1()" require="require">
						<option></option>
						<option value="1">定金失效</option>
					</select>
					</div>
					<div style="clear:both"></div>
					<div style="margin:5px 0 0 0;float:left">
						发送人类型：<select id="sendMessageManType1" onchange="changeSendMan1()" style="width:100px" require="require"></select>
					</div>
					<div style="margin:5px 0 0 10px;float:left">
						姓名：<input id="sendMessageName1" style="width:100px" require="require">
						<input id="sendMessageRenterId1" style="display:none">
						<input id="sendMessageLandlordId1" style="display:none">
						<input id="sendMessageHouseStoreId1" style="display:none">
						<input id="sendMessagePopId1" style="display:none">
						<input id="sendMessageRoomAddress1" style="display:none">
					</div>
					<div style="margin:5px 0 0 10px;float:left">
						电话号码：<input id="sendMessagePhone1" style="width:150px" require="require">
					</div>
				</fieldset>
				<div id="sendMessageSendInfo1">
					<fieldset>
						<legend>发送内容</legend>
						<div id="sendMessageDivOne1" style="display:none">
							<div style="margin:5px 0 0 24px;float:left">
								租金：<input id="sendMessageRentMoney3" style="width:80px" onkeyup="changeSendPrice(this)" moneyType="租金">
							</div>
						</div>
					</fieldset>
				</div>
				</br>
				<center>
					<div id="sendMessageTips1" style="height:20px;color:red;"></div>
					<a class="easyui-linkbutton" iconcls="icon-yulan" onclick="if(validateRequire('sendMessageDlg1')){previewSendMessage1()}"> 示例预览</a>
					<a class="easyui-linkbutton" iconcls="icon-send" onclick="if(validateRequire('sendMessageDlg1')){doSendMessage1()}"> 发送</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#sendMessageDlg1').dialog('close')">取消</a>
				</center>
			</div>

			<!-- 业主定金设置窗口 -->
			<!-- <div id="depositManagerDlg" style="padding:6px;display:none;">
		<div id="addDeposit">
			<div style='margin:2px 0 0 70px;float: left;'>
				<a class="easyui-linkbutton" iconcls="icon-yixiangren" onclick="depositRenter()" id="choseRenterButton"">选择租客</a>
			</div>
			<div style='margin:5px 0 0 44px;float: left;'>
				经手人：<select id="depositTheStore1" class="select-dept" onchange="deptStaffChose('depositTheStore1','depositFollowUserName1',0)"
					needs="1" style="width:100px;">
					<option></option>
				</select>
				<select id="depositFollowUserName1" style="width:100px;" needs="1">
					<option></option>
				</select>
			</div>
		</div>
		<div style="clear:both"></div>
		<div id="updateDeposit">
			<div style='margin:5px 0 0 22px;float: left;'>
				经手人：<input id="depositUserName1" disabled="disabled">
			</div>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 22px;float: left;'>
			意向人：<input id="depositRenterName1" style="width:100px" disabled="disabled" needs="1">
			<input id="depositRenterId1" style="display:none">
		</div>
		<div style='margin:5px 0 0 22px;float: left;'>
			联系电话：<input id="depositRenterPhone1" style="width:100px" disabled="disabled" needs="1">
		</div>
		<div style='margin:5px 0 0 22px;float: left;'>
			身份证：<input id="depositRenterIdCard1" style="width:150px" disabled="disabled">
		</div>
		<div id="depositInfoDiv">
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 34px;float: left;'>
				定金：<input id="depositGet1" style="width:100px" needs="1">元
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				开始时间：<input class="Wdate" id="depositDateBegin1" style="width:100px" type="text"
					onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'depositDateEnd\',{d:-1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})" needs="1">
			</div>`
			<div style='margin:5px 0 0 10px;float: left;'>
				有效时间：<input class="Wdate" id="depositDateEnd1" style="width:100px" type="text"
					onfocus="WdatePicker({minDate:'#F{$dp.$D(\'depositDateBegin\',{d:1});}',dateFmt:'yyyy-MM-dd',autoPickDate:true})" needs="1">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户类型：<select style="width:100px" onchange="changeWay2(0)" class="add_financial_way" id="depositFinancialWay1" needs="1">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				账户名称：<select style="width:150px" id="depositAccountName1" needs="1" onchange="getAccountId2()">
					<option></option>
				</select>
			</div>
			<div style='margin:5px 0 0 10px;float: left;'>
				收支方式：<select style="width:80px" needs="1" class="financial_payType" id="depositPayType1">
						<option></option>
					</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 10px;float: left;'>
				账户归属：<input style="width:100px" readonly="readonly" id="depositFinancialAccountBelong1">
			</div>
			<div style='margin:5px 0 0 22px;float: left;'>
				账户号码：<input style="width:150px" readonly="readonly" id="depositFinancialAccountNums1">
				<input style="display:none" id="depositFinancialBankNums1">
			</div>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 10px;float: left;'>
			票据编号：<input id="depositBillNumber" style="width:100px">
		</div>
		<div style="clear:both"></div>
		<br>
		<center>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="addDeposit()" id="addDepositSaveButton">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="updateDeposit()" id="updateDepositSaveButton">取消下定</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#depositManagerDlg').dialog('close')">关闭</a>
		</center>
	</div> -->
			<!-- 定金-选择租客对话框 -->
			<!-- <div id="choseRenter1" style="padding:6px;display:none;">
		<div style='margin:0 0 10px 10px;'>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				姓名：<input id="searchRenterName1" onkeyup="searchOnkeyup(this.id, 'queryRenter(1, 0)')" style="width:80px">
			</div>
			<div
				style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				电话：<input id="searchRenterPhone1" onkeyup="searchOnkeyup(this.id, 'queryRenter(1, 0)')" style="width:100px">
			</div>
			<a class="easyui-linkbutton" onclick="addIntended()" iconCls="icon-add-zuke" plain="true" id="addIntendedButton">添加租客意向人</a>
		</div>
		选择租客列表
		<table id="choseRenterTable1">
		</table>
		<div id="choseRenterPageDiv1" style="width:99%"></div>
	</div> -->

			<!-- 电子合同窗口 -->
			<div id="contractInfoTableDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
				<div style="height:auto" id="toolbarDiv">
					<div style="margin:10px 0 10px 5px;color:black;font-size:13px;float:left">
						楼盘名称：<input id="searcAddCommunity" style="width:80px;" onkeyup="queryConstract(1,0)">
					</div>
					<div style="margin:10px 0 5px 5px;color:black;font-size:13px;float:left">
						楼栋：<input id="searcAddBuilding" style="width:80px;" onkeyup="queryConstract(1,0)">
					</div>
					<div style="margin:10px 0 5px 5px;color:black;font-size:13px;float:left">
						门牌号：<input id="searcAddDoorplateno" style="width:80px;" onkeyup="queryConstract(1,0)">
					</div>
					<div style="margin:10px 0 5px 5px;color:black;font-size:13px;float:left">
						合同状态：<select id="searcElectronState" style="width:80px;" onchange="queryConstract(1,0)">
						<option></option>
						<option>未签约</option>
						<option>已签约</option>
						<option>注销</option>
					</select>
					</div>
					<div style="margin:10px 0 5px 5px;color:black;font-size:13px;float:left">
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="cancellationContract()">注销</a>
					</div>
					<div style="clear:both"></div>
				</div>
				<table id="contractInfoDg" class="easyui-datagrid"
					   style="width:100%;height:352px;table-layout:fixed;overflow:hidden;"
					   data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:10,
				fitColumns:true,
				scrollbarSize:0">
					<thead>
					<tr>
						<th field="totalPage" width="20" align="center">房屋地址</th>
						<th field="ectName" width="10" align="center">租客</th>
						<th field="ectIdCard" width="15" align="center">身份证</th>
						<th field="ectTelphone" width="10" align="center">电话</th>
						<th field="ectStatus" width="10" align="center">状态</th>
						<th field="ectSignUrl" width="10" align="center">签署地址</th>
						<th field="ectCreationTime" width="10" align="center">登记时间</th>
					</tr>
					</thead>
				</table>
				<div id="contractPageDiv" style="width:100%;text-align:center;"></div>
			</div>

			<!-- 绑定设备对话框 -->
			<div id="bindDeviceDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
				<div class="clearfix">
					<div style="margin:0 0 10px 5px;color:black;font-size:13px;float:left;vertical-align:middle;">
						<a class="easyui-linkbutton" iconCls="icon-add" id="addDeviceButton" onclick="addDeviceDlg()">添加新设备</a>
						<a id="searchBrandChooseBrandButton" class="easyui-linkbutton choose_brand_button" iconCls="icon-search" doFlag="searchBrand" doFun="queryDeviceList(1)" value="">设备型号</a>
						<input id="searchBrandShowBrandInfo" style="width:200px" type="text" disabled="disabled">
						<div id="searchBrandShowBrandInfoDiv" style="display:none;"></div>
						<input id="searchBrandGetBrandName" type="hidden">
						<input id="searchBrandGetBrandType" type="hidden">
						<input id="searchBrandGetBrandId" type="hidden">
						设备名称：<input id="searchDevNickname" onkeyup="searchOnkeyup(this.id, 'queryDeviceList(1)')" style="width:100px">
					</div>
				</div>
				<fieldset>
					<legend>智能设备</legend>
					<div style="width:99%;height:38%">
						<table id="deviceListTable"></table>
						<div id="deviceListTablePageDiv" style="width:100%;text-align:center;"></div>
					</div>
				</fieldset>
				<fieldset>
					<legend>待绑定的设备</legend>
					<div style="width:99%;height:35%">
						<table id="bindDeviceTable"></table>
					</div>
				</fieldset>
				<center style="margin:20px 0 0 0;">
					<a class="easyui-linkbutton" iconcls="icon-save" onclick="doBindDevice()">保存</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#bindDeviceDlg').dialog('close')">取消</a>
				</center>
			</div>
			<!-- 选择设备操作对话框 -->
			<div id="operateDeviceDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
				<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="doOperateDeviceDlg('01')" data-brand="1,2">设置限时密码</a>
				<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="doOperateDeviceDlg('02')" data-brand="1,2">获取密码列表</a>
				<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="doOperateDeviceDlg('03')" data-brand="2">清空密码</a>
				<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="doOperateDeviceDlg('04')" data-brand="1,2">获取开锁记录</a>
				<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="doOperateDeviceDlg('05')" data-brand="2">远程开锁</a>
				<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="doOperateDeviceDlg('10')" data-brand="3">获取读数</a>
				<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="doOperateDevice('00')" data-brand="1,2,3">从本房源中移除此设备</a>
			</div>
			<!-- 设备操作对话框 -->
			<div id="doOperateDeviceDlg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
				<!-- 设置限时密码-->
				<div id="doOperateDevice01" operate="1">
					<div style="margin:10px 0 20px 150px;float:left;">
						限时密码：<input id="limitTimePassword" style="width:200px">
					</div>
					<div style="clear:both"></div>
					<div style="margin:10px 0 20px 150px;float:left;"id="passwordTime">
						到期时间：<input id="limitTimeEnd" class="Wdate" style="width:200px" onfocus="WdatePicker({minDate:'%y-%M-%d-%H-%m',dateFmt:'yyyy-MM-dd HH:MM',autoPickDate:true})" >
					</div>
					<div style="margin:10px 0 20px 150px;float:left;" id="passwordType">
						密码类型：<select id="limitPasswordType" style="width:120px">
						<option value="2">普通用户密码</option>
						<option value="1">管理员密码</option>
					</select>
					</div>
					<div style="clear:both"></div>
					<div style="text-align:center;">
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="doOperateDevice('01')">提交</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#doOperateDeviceDlg').dialog('close')">取消</a>
					</div>
				</div>
				<!-- 获取密码列表-->
				<div id="doOperateDevice02" operate="1">
					<span style="color:red">设置临时密码后,可能会因为门锁服务商方面的问题,密码列表查询会有延迟的情况。</span>
					<table id="brandAllDeviceDg" style="width:98%;height:300px;table-layout:fixed;overflow:hidden;"
						   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
						<tr>
							<th field="keyPass" width="40" align="center">密码</th>
							<th field="timeEnd" width="20" align="center">到期时间</th>
						</tr>
						</thead>
					</table>
				</div>
				<!-- 清空密码-->
				<div id="doOperateDevice03" operate="1">

				</div>
				<!-- 获取开锁记录-->
				<div id="doOperateDevice04" operate="1">
					<div style="margin:10px 0 10px 50px;float:left;">
						查询从 <input id="consoleTimeStart" class="Wdate" style="width:200px" pattern="单击选择时间" onfocus="WdatePicker({maxDate:'%y-%M-%d-%H-%m',dateFmt:'yyyy-MM-dd HH:MM',autoPickDate:true})" >开始到现在的开锁记录
						<a class="easyui-linkbutton" iconcls="icon-search" onclick="doOperateDevice('04')">查询</a>
					</div>
					<table id="deviceOpenRecordDg" style="width:98%;height:300px;table-layout:fixed;overflow:hidden;"
						   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
						<tr>
							<th field="createTime" width="40" align="center">开锁时间</th>
						</tr>
						</thead>
					</table>
				</div>
				<!-- 远程开锁-->
				<div id="doOperateDevice05" operate="1">

				</div>
				<!-- 获取读数-->
				<div id="doOperateDevice10" operate="1">

				</div>
			</div>

			<!-- 租客账单详细信息查看 -->
			<div id="readonlyMonthlyBillsDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
				<div style='margin:0 0 0 24px;float: left;'>
					水表： 本次读数：<input style="width:80px" disabled="disabled" id="monthlyBillsThisWater1">
				</div>
				<div style='margin:0 0 0 15px;float: left;'>
					上次读数：<input style="width:80px" disabled="disabled" id="monthlyBillsLastWater1">
				</div>
				<div style='margin:0 0 0 15px;float: left;'>
					差值：<input style="width:80px" disabled="disabled" id="monthlyBillsWaterDiff1">
				</div>
				<div style='margin:0 0 0 15px;float: left;'>
					计费方案：<input style="width:150px" disabled="disabled" id="monthlyBillsfWaterPlan1">
				</div>
				<div style='clear:both;'></div>
				<div style='margin:5px 0 0 24px;float: left;'>
					电表： 本次读数：<input style="width:80px" disabled="disabled" id="monthlyBillsThisElectrit1">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					上次读数：<input style="width:80px" disabled="disabled" id="monthlyBillsLastElectrit1">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					差值：<input style="width:80px" disabled="disabled" id="monthlyBillsElectritDiff1">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					计费方案：<input style="width:150px" disabled="disabled" id="monthlyBillsfElectritPlan1">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 24px;float: left;'>
					气表： 本次读数：<input style="width:80px" disabled="disabled" id="monthlyBillsThisGas1">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					上次读数：<input style="width:80px" id="monthlyBillsLastGas1" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					差值：<input style="width:80px" id="monthlyBillsDiffGas1" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 15px;float: left;'>
					计费方案：<input style="width:150px" id="monthlyBillsfGasPlan1" disabled="disabled">
				</div>
				<div style="clear:both"></div>
				<div style="height:10px;"></div>
				<div style="margin:5px 0 0 24px;float:left">
					租金：<input id="sendMessageRentMoney1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 17px;float:left">
					水费：<input id="sendMessageRentWater1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 22px;float:left">
					电费：<input id="sendMessageRentEcl1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 34px;float:left">
					燃气费：<input id="sendMessageRentGas1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 10px;float:left" id="rentOweDiv">
					历史欠结：<input id="sendMessageRentOwe1" style="width:80px" disabled="disabled">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 12px;float:left">
					电视费：<input id="sendMessageRentTV1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 17px;float:left">
					网费：<input id="sendMessageRentWifi1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 10px;float:left">
					物管费：<input id="sendMessageRentManage1" style="width:80px" disabled="disabled">
				</div>
				<div style='margin:5px 0 0 10px;float: left;'>
					租赁服务费：<input id="monthlyBillsServer1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 34px;float:left">
					其他：<input id="sendMessageRentOther1" style="width:80px" disabled="disabled">
				</div>
				<div style="clear:both"></div>
				<%--<div style="margin:5px 0 0 34px;float:left">--%>
					<%--房屋押金：<input id="sendMessageHouseDeposit" style="width:80px" disabled="disabled">--%>
				<%--</div>--%>
				<%--<div style="margin:5px 0 0 34px;float:left">--%>
					<%--门卡押金：<input id="sendMessageDoorDeposit" style="width:80px" disabled="disabled">--%>
				<%--</div>--%>
				<%--<div style="margin:5px 0 0 34px;float:left">--%>
					<%--水电押金：<input id="sendMessagePowerDeposit" style="width:80px" disabled="disabled">--%>
				<%--</div>--%>
				<%--<div style="margin:5px 0 0 34px;float:left">--%>
					<%--其他押金：<input id="sendMessageOtherDeposit" style="width:80px" disabled="disabled">--%>
				<%--</div>--%>
				<%--<div style="clear:both"></div>--%>

			<%--<div style="margin:5px 0 0 34px;float:left">--%>
				<%--门卡工本：<input id="sendMessageDoorTrendFee" style="width:80px" disabled="disabled">--%>
				<%--</div>--%>
				<%--<div style="margin:5px 0 0 34px;float:left">--%>
				<%--佣金服务：<input id="sendMessageComServiceFee" style="width:80px" disabled="disabled">--%>
				<%--</div>--%>
				<%--<div style="margin:5px 0 0 34px;float:left">--%>
				<%--换锁费用：<input id="sendMessageLockFee" style="width:80px" disabled="disabled">--%>
				<%--</div>--%>
				<%--<div style="margin:5px 0 0 34px;float:left">--%>
				<%--其他费用：<input id="sendMessageOtherFee" style="width:80px" disabled="disabled">--%>
				<%--</div>--%>
				<%--<div style="clear:both"></div>--%>
				<div style='margin:5px 0 0 0;float: left;'>
					正常费用：<input id="sendMessagePower1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 5px;float:left">
					滞纳金：<input id="sendMessageRentDamages1" style="width:80px" disabled="disabled">
				</div>
				<div style="margin:5px 0 0 10px;float:left">
					总金额：<input id="sendMessagePirce1" style="width:80px" disabled="disabled">
				</div>
				<div style="clear:both"></div>
				<div style="margin:5px 0 0 0;float:left">短信备注：</div>
				<div style="margin:5px 0 0 0;float:left">
					<textarea id="sendMessageNote1" style="width:663px;height:40px" disabled="disabled"></textarea>
				</div>
				<input id="monthlyBills_index" type="hidden">
				<div style="clear:both"></div>
				<div style='margin:8px 0 0 0;text-align:center;'>
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'monthlyBills_index', 'receivableInfoTable', 'readonlyMonthlyBillsDlg', 'readonlyMonthlyBills(row)')">上一条</a>
					<a class="easyui-linkbutton" onclick="printPreview()" iconCls="icon-print" >打印票据</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'monthlyBills_index', 'receivableInfoTable', 'readonlyMonthlyBillsDlg', 'readonlyMonthlyBills(row)')">下一条</a>
				</div>
			</div>

			<!-- 打印票据处理  -->
			<div id="printDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
				<div id="dlg-toolbar">
					<table cellpadding="0" cellspacing="0" style="width:100%">
						<tr>
							<td>
								<a href="#" class="easyui-linkbutton" iconCls="icon-print" plain="true" onclick="window.printFrame.print()">打印票据</a>
							</td>
						</tr>
					</table>
					<iframe id="printFrame" name="printFrame" style="width:100%;height:500px;"></iframe>
				</div>

				<!-- 生成临时账单窗口 -->
				<div id="generatingATemporaryBillDlg" style="display:none;">
					<iframe id="generatingATemporaryBill" src="" style="width:100%;height:99%;boder:0px;"frameborder="0" scrolling="auto">
					</iframe>
				</div>
				<!-- 跟进详情 -->
				<div id="followInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
					<center>
						<table class="xwtable" style="margin-top:10px;">
							<tbody>
							<tr>
								<td>操作人：</td>
								<td colspan="3"><span id="followregistrantName"></span></td>
							</tr>
							<tr>
								<td>操作时间：</td>
								<td colspan="3"><span id="followtime"></span></td>
							</tr>
							<tr>
								<td>内容：</td>
								<td colspan="3" style="text-align:left"><span id="followtext"></span></td>
							</tr>
							</tbody>
						</table>
					</center>
				</div>
				<!-- 修改住户 -->
				<div id="updateLivingMenDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
					<div style="margin:10px 0 0 12px;float:left">
						住户状态：<select id="updateLivingMenRtTypeNew" style="width:300px;" choose="choose" require="require">
						<option></option>
						<option valuse="在住">在住</option>
						<option valuse="曾住">曾住</option>
						<option valuse="搬离">搬离</option>
						<option valuse="无效">无效</option>
					</select>
					</div>
					<input id="updateLivingMenRtTypeOld" style="display:none" clear="clear"><!-- 住户状态（旧的） -->
					<div style="clear:both"></div>
					<div style="margin:10px 0 0 24px;float:left">
						入住房：<input id="updateLivingMenHrAddressNew" style="width:300px;cursor: pointer;" onclick="relationDlg();" readonly="readonly" clear="clear" require="require">
						<input id="updateLivingMenHrAddressOld" style="display:none" clear="clear"><!-- 入住房（旧的） -->
						<input id="updateLivingMenRtHrIdNew" style="display:none" clear="clear">
						<input id="updateLivingMenRtHrIdOld" style="display:none" clear="clear">
						<input id="updateLivingMenRtId" style="display:none" clear="clear">
					</div>
					<div style="clear:both"></div>
					<div style="margin:20px 0 0 0;text-align: center;">
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateLivingMen()">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateLivingMenDlg').dialog('close')">取消</a>
					</div>
				</div>

				<!-- 住户修改选择已租房 -->
				<div id="relationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
					<div id="relationSelect">
						<div style='margin:0 0 10px 0;'>
							<div
									style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;display: none">
								城市：<select id="searchAddCity" onchange="queryAddCity()" style="width:80px">
							</select>
							</div>
							<div
									style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
								城区：<select id="searchAddDistrict" onchange="relationDate(1,0)" style="width:100px">
								<option></option>
							</select>
							</div>
							<div
									style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;display: none">
								片区：<select id="searchAddZone" onchange="relationDate(1,0)" style="width:100px">
								<option></option>
							</select>
							</div>
							<div
									style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
								楼盘/小区：<input id="searchAddCommunity" onkeyup="relationDate(1,0)" style="width:80px">
							</div>
							<div
									style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
								楼栋：<input id="searchAddBuilding" onkeyup="relationDate(1,0)" style="width:60px">
							</div>
							<div
									style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
								门牌号：<input id="searchAddDoorplateno" onkeyup="relationDate(1,0)" style="width:60px">
							</div>
							<div style="clear:both"></div>
						</div>
					</div>
					<div id="relationDataGrid" style="width:100%;height:89%">
						<div id="choseSource" style="width:100%;height:100%;">
							<table id="choseSourceTable"></table>
							<div id="choseSourcePageDiv" style="width:99%;text-align:center;"></div>
						</div>
					</div>
				</div>



				<div id="menu" class="easyui-menu" style="width:130px;">
					<div id="landlordRenewButton2"><a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" onclick="landlordRenewData(0)">业主续签</a></div>
					<div id="renterRenewButton3"><a class="easyui-linkbutton" plain="true" iconCls="icon-xuqian" onclick="renterRenew()">租客续签</a></div>
					<div id="renterCheckoutButton3"><a class="easyui-linkbutton" plain="true" iconCls="icon-house-tuoguan-edit" onclick="renterCheckout()">租客退房</a></div>
					<div id="updateManagerUserButton4"><a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="updateManagerUser()">设置房管员</a></div>
					<div id="sendMessageButton4"><a class="easyui-linkbutton" plain="true" iconCls="icon-send-message" onclick="sendMessageDlg()">发送短信</a></div>
					<div>
						<span><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >相关信息</a></span>
						<div>
							<div class="hrefTitle" id="detailRenterInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >租客信息</a></div>
							<div class="hrefTitle" id="detailLandlordInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >业主信息</a></div>
							<div class="hrefTitle" id="detailFinancialInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >房屋收支</a></div>
							<div class="hrefTitle" id="detailLandlordBillInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >业主账单</a></div>
							<div class="hrefTitle" id="detailRenterBillInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >租客账单</a></div>
							<div class="hrefTitle" id="detailPopulationInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >客户信息</a></div>
							<div class="hrefTitle" id="detailAssetsInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >家私电器</a></div>
							<div class="hrefTitle" id="detailContInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >合约记录</a></div>
							<div class="hrefTitle" id="detailMessageInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >短信记录</a></div>
							<div class="hrefTitle" id="detailHrPicInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >房间照片</a></div>
							<div class="hrefTitle" id="detailEnergyInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >能源卡号</a></div>
							<div class="hrefTitle" id="detailRepairInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >维保记录</a></div>
							<div class="hrefTitle" id="detailEventInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >审批记录</a></div>
							<div class="hrefTitle" id="detailTaskInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >任务记录</a></div>
							<div class="hrefTitle" id="detailDeviceInfoRow" ><a class="easyui-linkbutton" plain="true" iconCls="icon-bangding" >门卡管理</a></div>
						</div>
					</div>
				</div>

				<!-- 租客换房窗口 -->
				<div id="exchangeHousesDlg" class="easyui-dialog" data-options="closed:true">
					<iframe id="exchangeHouses" src="" style="width:100%;height:99%;boder:0px;"frameborder="0" scrolling="auto">
					</iframe>
				</div>

				<!-- 添加出租窗口 -->
				<div id="addRentDlg" class="easyui-dialog" data-options="closed:true">
					<iframe id="addRentBill" style="width:100%;height:99%;boder:0px;" frameborder="0" scrolling="auto">
					</iframe>
				</div>

				<jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
				<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
				<!-- 拍照上传的公共页面 -->
				<jsp:include page="/ui/public/photoDlg.jsp"></jsp:include>
				<jsp:include page="/ui/public/renterContImgDlg.jsp"></jsp:include>
				<script src="js/fg.public.js"></script>
				<script src="js/fg.source.info.js"></script>
				<script src="js/fg.source.infoDb.js"></script>
				<script src="js/upload.js"></script>
				<script src="js/contUpload.js"></script>
</body>
</html>