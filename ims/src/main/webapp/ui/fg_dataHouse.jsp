<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>房源资料</title>
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
	<script src="js/jquery.selectseach.min.js"></script>
	<script src="js/jquery.form.js"></script>
	<script src="js/upload-csv.js"></script>
	<script src="js/jQuery.Hz2Py-min.js"></script>
</head>
<body id="dataHouseBody">
	<div class="bodyLoadingOver"></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="padding:5px 0 5px 5px">
			<input type="hidden" class="add_saveHouse_index">
			<a class="easyui-linkbutton" iconCls="icon-ziliao-fangyuan" plain="true" id="addDataHouseButton" onclick="addSaveHouse()">添加房源</a>
			<a class="easyui-linkbutton" onclick="setStateOwned()" iconCls="icon-house-edit" id="setStateOwnedButton" plain="true">锁盘/解锁</a>
			<a class="easyui-linkbutton" onclick="setFirstFollow()" iconCls="icon-sipan-guanzhu" id="firstFollowButton" plain="true">关注房源</a>
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('public', 'housePaper', 'housePaperDg', 'houseCoding', 'houseImgPath', 'queryHousePaper', 'deleteHousePaperPic')">房间照片</a>
			<a class="easyui-linkbutton" onclick="queryFollowInfoDlg()" iconCls="icon-search" id="queryFollowInfoButton" plain="true">跟进查询</a>
			<a class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="advancedScreening(1)" id="screening">高级筛选</a>
			<!-- 导入和批量添加以后可能会完善，先保留着 -->
			<!-- <a class="easyui-linkbutton" onclick="numsAddSaveHouse1()" iconCls="icon-shuju-daoru" id="numsAddSaveHouse1" plain="true">导入</a> -->
			<!-- <a class="easyui-linkbutton" onclick="numsAddSaveHouse()" iconCls="icon-piliang" id="numsAddSaveHouse" plain="true">批量添加</a> -->
		</div>
		<div id="searchSaveHouse" style="margin:0 0 0 5px;" class="advancedScreening">
			<div class="advanced1">
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;display:none">
					片区：<select id="searchZone" onchange="queryHousePaper(1,0)" style="width:100px">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryHousePaper(1,0)')" style="width:100px">
				</div>
				<div style="margin:0 0 5px 31px;color:black;font-size:13px;float:left;">
					楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryHousePaper(1,0)')" style="width:80px">
				</div>
				<div style="margin:0 0 5px 19px;color:black;font-size:13px;float:left;">
					门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryHousePaper(1,0)')" style="width:80px">
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					房屋状态：<select id="searchHouseState" onchange="queryHousePaper(1,0)" style="width:80px">
						<option></option>
						<option value="useful" selected="selected">有效</option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					业主电话：<input id="searchLandlordPhone" onkeyup="searchOnkeyup(this.id, 'queryHousePaper(1,0)')" style="width:80px">
				</div>
				<div style="margin:0px 0 5px 10px;color:black;float:left;">
					<div id="showTheSortButton" class="showTheSortButton" onclick="showTheSortDlg()" >排序方式<span id="showTheSortjia" class="showTheSortjia">+</span></div>
					<div class="theSortDlg" id="theSortDlg" style="height:250px;">
						<div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
						<div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse"  searchVal="2">倒序</div>
						<input type="hidden" id="theSortContraryInput"  value="2">
						<div class="theSortTerm" id="theSortTermaddCommunity" searchVal="1">楼盘名称</div>
						<div class="theSortTerm" id="theSortTermaddBuilding" searchVal="2">楼栋</div>
						<div class="theSortTerm" id="theSortTermaddDoorplateno" searchVal="3">门牌号</div>
						<div class="theSortTerm theSortTermSelect" id="theSortTermregisterTime" searchVal="4">登记时间</div>
						<div class="theSortTerm" id="theSortTermhousePrice" searchVal="5">租价</div>
						<div class="theSortTerm" id="theSortTermhouseSellingPrice" searchVal="6">售价</div>
						<div class="theSortTerm" id="theSortTermmaxtime" searchVal="7">跟进时间</div>
						<input type="hidden" id="theSortTermInput" value="4">
					</div>
				</div>
			</div>
			<div class="advanced2">
				<div style="clear:both"></div>
				<div style="margin:0 0 5px 31px;color:black;font-size:13px;float:left;">
					城区：<select class="companyRentDistrict" id="searchDistrict" onchange="queryHousePaper(1,0)" style="width:100px">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;" id="searchSignedStateDiv">
					签约状态：<select id="searchSignedState" onchange="queryHousePaper(1,0)" style="width:80px">
						<option>未托管</option>
						<option>已托管</option>
						<option>全部</option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					公盘私盘：<select id="searchStateOwned" onchange="queryHousePaper(1,0)" style="width:80px">
						<option value="全部">全部</option>
						<option value="公盘">公盘</option>
						<option value="私盘">私盘</option>
					</select>
				</div>
				<div style="margin:0 0 5px 31px;color:black;font-size:13px;float:left;">
					户型：<select id="searchSectionType" onchange="queryHousePaper(1,0)" style="width:80px">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					有无钥匙：<select id="searchKey" onchange="queryHousePaper(1,0)" style="width:80px">
						<option value=""></option>
						<option value="1">有</option>
						<option value="2">无</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	
	<!--资料房源列表-->
	<div>
		<table id="housePaperDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" 
			data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="addDistrict" width="10" align="center">城区</th>
					<th field="detailedAddress" width="20" align="center">房屋地址</th>
					<th field="sectionType" width="10" align="center">户型</th>
					<th field="storeSquare" width="10" align="center">面积</th>
					<th field="housePrice" width="10" align="center">租价</th>
					<th field="houseSellingPrice" width="10" align="center">售价</th>
					<th field="houseState" width="10" align="center">状态</th>
					<th field="tenantName" width="10" align="center" formatter="ifPublicHouseRent">租方跟进人</th>
					<th field="whilePeopleName" width="10" align="center" formatter="ifPublicHouseSale">售方跟进人</th>
					<th field="keyPeopleName" width="10" align="center" formatter="ifPublickeyPeopleName">钥匙管理人</th>
					<th field="keyNumber" width="10" align="center">钥匙编号</th>
					<th field="userName" width="10" align="center">登记人</th>
				</tr>
			</thead>
		</table>
		<!-- 房源分页 -->
<%--		<div id="housePaperPageDiv" style="width:100%;text-align:center;"></div>--%>
		<div id="dataHousePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
	<!-- 添加 、修改、查看窗口 -->
	<div id="housePaperDlg" class="easyui-dialog" data-options="closed:true">
		<form id="addSaveHouseForm">
			<div id="addSaveHouseDiv">
				<div style="margin:0 0 0 5px;">
					<legend>基本信息</legend>
					<div style='margin:0 0 0 24px;float: left;'>
						状态：<select class="add_saveHouse_house_state" style="width:80px;">
						</select>
						<input type="hidden" id="add_saveHouse_house_state">
					</div>
					<div style='margin:0 0 0 26px;float: left;'>
						城区：<select class="companyRentDistrict" id="add_saveHouse_district" onchange="zoneLink(0)" style="width:80px;" require="require">
							<option></option>
						</select>
					</div>
					<div style='margin:0 0 0 5px;float: left;display:none;'>
						片区：<select class="add_saveHouse_zone" id="add_saveHouse_zone" onchange="buildNameLink(0)" style="width:80px;">
							<option></option>
						</select>
					</div>
					<div id="detailedAddressDiv" style='margin:0 0 0 12px;float: left;'>
						房屋地址：<input type="text" id="detailedAddress" style="width: 286px;" >
					</div>
					<div id="buildingNameAddrss" style='margin:0 0 0 12px;float: left;'>
						楼盘名称：<input type="text" id="AddrssName" style="width: 90px;" >
					</div>
					<!-- 添加时显示 -->
					<!--<div id="addrssBuilding" style='margin:0 0 0 12px;float: left;'>
						<div>
							楼盘名称：<input id="buildingName" style="width: 90px;" require="add" readonly="readonly"
								onkeyup='resetOption("buildingName", "add_saveHouse_buildingName" ,"buildingNameDiv")'
								onclick='resetOption("buildingName", "add_saveHouse_buildingName" ,"buildingNameDiv")'
								onfocus='resetOption("buildingName", "add_saveHouse_buildingName" ,"buildingNameDiv")' >
						</div>
						<div id="buildingNameDiv" style="margin-left:59px;height:150px;width: 150px;border:1px solid #A9A9AA;display:none;position : absolute; z-index : -1;background-color: #fff">
							<select class="add_saveHouse_buildingName" id="add_saveHouse_buildingName" multiple="multiple"
								style="height:150px;width: 150px;" onchange='streeLink(0)'>
								<option></option>
							</select>
							<input class="add_saveHouse_buildingId" id="add_saveHouse_buildingId" style="display:none">
<%--							<input id="add_saveHouse_zone1" style="display:none">--%>
						</div>
					</div>-->
					<div id="addrssBuilding" style='margin:0 0 0 12px;float: left;'>
						<div>
							楼盘名称：<select id="buildingName" style="width: 90px;" require="add" onchange="exchangeZone()"></select>
						</div>
					</div>
					<!-- 添加时显示 -->
					<div>
						<div id="divSelect" style='margin:0 0 0 10px;float: left;'>
							楼栋：<input style="width:150px" id="inputSelect" class="add_saveHouse_addBuilding" require="require">
							<input id="buildingDefinitionyVal" readonly="readonly" style="display:none">
						</div>
						<div id="selectBuilding" style="border-radius:10px 10px 10px 10px;margin: 30px 0 0 0;height:110px;width: 310px;border:1px solid #A9A9AA;display:none;position : absolute; z-index : -1;background-color: #fff;left:350px;">
							<div style="border-radius:9px 9px 0 0;width: 100%;height: 28px;background-color: #96D2FF;">
								<div style="margin:3px 0 0 15px;float: left;">
									<span style="font-size: 15px;font-family:'微软雅黑';color: #000;">选择楼栋</span>
								</div>
								<div style="margin:1px 5px 0 0;float: right;">
									<a class="easyui-linkbutton" plain="true" iconcls="icon-cancel" onclick="$('#selectBuilding').hide();"></a>
								</div>
								<div style="clear: both;"></div>
							</div>
							<div style="width:100%;height:80px ;font-size: 12px;padding: 5px;color: #000;">
								<div style="margin:0 0 0 39px;float: left;">
									字母： <select id="buildingLetter" style="width:70px;">
									</select>
								</div>
								<div style="margin:0 0 0 39px;float: left;">
									数字： <select id="buildingNum" style="width:70px;">
									</select>
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 2px;float: left;">
									字母+数字 ： <select id="buildingGroupTwo" style="width:70px;">
									</select>
								</div>
								<div style="margin:5px 0 0 7px;float: left;">
									数字+字母： <select id="buildingGroupOne" style="width:70px;">
									</select>
								</div>
								<div style="clear:both"></div>
								<div style="margin:5px 0 0 27px;float: left;">
									自定义： <input id="buildingDefinitiony" style="width: 70px;">
								</div>
							</div>
						</div>
					</div>
					<div style="clear:both"></div>
					<!-- 添加时显示 -->
					<div id="addDoorplatenoDiv" style='margin:5px 0 0 12px;float: left;'>
						门牌号：<input class="add_saveHouse_addDoorplateno" style="width:80px;" clear="clear" 
								onblur="$(this).val($(this).val().toUpperCase());validateDoorno();" require="require">
							<span id="doornoMsg" style="color:red;" clear="clear"></span>
							<input type="hidden" class='hd_doorplateno_relus'> 
					</div>
					<div style='margin:5px 0 0 26px;float: left;'>
						片区：<input type="text" id="add_saveHouse_zone1" style="width: 80px;" require="require">
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 24px;float: left;'>
						户型：<select class="add_saveHouse_sectionType" style="width:80px;">
							<option></option>
						</select>
						<input type="hidden" id="add_saveHouse_sectionType">
						<input type="hidden" class="add_saveHouse_houseCoding">
					</div>
					<div style='margin:5px 0 0 5px;float: left;display:none'>
						房型：<select class="add_saveHouse_houseType" style="width:80px;">
							<option></option>
						</select>
					</div>
					<div style='margin:5px 0 0 26px;float: left;'>
						用途：<select class="add_saveHouse_state" style="width:80px;">
							<option></option>
						</select>
					</div>
					<div style='margin:5px 0 0 12px;float: left;'>
						建筑面积：<input class="add_saveHouse_square" style="width:70px" type="number" onKeyUp="matchedPositiveNumber(this.className);changePriceForSquare(this.className)" >m²
					</div>
					<div style='margin:5px 0 0 14px;float: left;'>
						朝向：<select class="add_saveHouse_direction" style="width:50px;">
							<option></option>
						</select>
					</div>
					<div style='margin:5px 0 0 5px;float: left;'>
						配置：<select class="fgsource_furniture_config" style="width:59px;">
							<option></option>
						</select>
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 24px;float: left;'>
						租价：<input class="add_saveHouse_rentPriceTotal" style="width:54px" type="number" type="number" data-type="money"
						data-fn-keyup="changePriceForSquare(this.className)" >元/月
					</div>
					<div style='margin:5px 0 0 12px;float: left;'>
						租单价：<input class="add_saveHouse_rentPrice" style="width:52px" type="number" type="number" data-type="money"
						data-fn-keyup="changePriceForSquare(this.className)" >元/m²
					</div>
					<div style='margin:5px 0 0 19px;float: left;'>
							租委托：<select class="add_saveHouse_entrust4rent" style="width:90px">
								<option></option>
								<option value="0">是</option>
								<option value="1">否</option>
							</select>
					</div>
					<div style='margin:5px 0 0 10px;float: left;'>
						租方：<input id="rentManShowUserInfo" class="choose_user_button"  doFlag="rentMan" doFun=""
							style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear" disabled="disabled">
						<input id="rentManGetUserStoreId" type="hidden">
						<input id="rentManGetUserDetId" type="hidden">
						<input id="rentManGetUserId" type="hidden">
						<div id="rentManShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 24px;float: left;'>
						售价：<input class="add_saveHouse_salePriceTotal" style="width:56px" type="number" type="number" data-type="money"
						data-fn-keyup="changePriceForSquare(this.className)">万元
					</div>
					<div style='margin:5px 0 0 14px;float: left;'>
						售单价：<input class="add_saveHouse_salePrice" style="width:56px" type="number" data-type="money"
						data-fn-keyup="changePriceForSquare(this.className)">万元
					</div>
					<div style='margin:5px 0 0 24px;float: left;'>
							售委托：<select class="add_saveHouse_entrust4sell" style="width:90px">
								<option></option>
								<option value="0">是</option>
								<option value="1">否</option>
							</select>
					</div>
					<div style='margin:5px 0 0 10px;float: left;'>
						售方：<input id="saleManShowUserInfo" class="choose_user_button"  doFlag="saleMan" doFun=""
							style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear"
							disabled="disabled">
						<input id="saleManGetUserStoreId" type="hidden">
						<input id="saleManGetUserDetId" type="hidden">
						<input id="saleManGetUserId" type="hidden">
						<div id="saleManShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 24px;float: left;'>
						产权：<select class="add_saveHouse_property" style="width:80px">
							<option></option>
						</select>
					</div>
					<div style='margin:5px 0 0 26px;float: left;'>
						来源：<select class="add_saveHouse_source" style="width:80px">
							<option></option>
						</select>
					</div>
					<div style='margin:5px 0 0 12px;float: left;'>
						钥匙编号：<input class="add_saveHouse_keyNums"  style="width:90px">
					</div>
					<div style='margin:5px 0 0 10px;float: left;'>
						钥匙：<input id="keyManShowUserInfo" class="choose_user_button"  doFlag="keyMan" doFun=""
							style="width:150px;cursor: pointer;" type="text" readonly="readonly" clear="clear"
							disabled="disabled">
						<input id="keyManGetUserStoreId" type="hidden">
						<input id="keyManGetUserDetId" type="hidden">
						<input id="keyManGetUserId" type="hidden">
						<div id="keyManShowUserInfoDiv" style="display:none;"></div>
					</div>
					<div style="clear:both"></div>
					<div style="float: left;width:600px">
						<div style='margin:5px 0 0 0px;float: left;'>
							购房日期：<input style="width:80px" type="text" onclick="WdatePicker({maxDate:'%y-%M-%d'})" class="add_saveHouse_buyTime">
						</div>
						<div style='margin:5px 0 0 14px;float: left;'>
							录入人：<input class="add_saveHouse_userName" style="width:80px;" disabled='disabled' readonly='readonly' />
							<input class="add_saveHouse_userId" style="display:none" />
						</div>
						<div style='margin:5px 0 0 12px;float:left;' id="saveHouse_register_time">
							登记时间：<input class="add_saveHouse_register_time" style="width:90px;" disabled='disabled' readonly='readonly' />
						</div>
					</div>
					<div style="clear:both"></div>
					<div style="float: left;">
						<div style='margin:5px 0 0 24px;float: left;'>备注：</div>
						<div style='margin:5px 0 0 0;float: left;'>
							<textarea class="add_saveHouse_house_remake" style="height:35px;width:580px;"></textarea>
						</div>
					</div>
					<div style="clear:both"></div>
				</div>
				<div id="landlordInfo" style="display:none;margin:5px 0 0 5px;">
					<legend>业主信息</legend>
					<div style='margin:5px 0 0 24px;float: left;'>
						业主：<input style="width:80px" class="add_saveHouse_landlordName" require="require">
						<input class="add_saveHouse_laId" style="display:none">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						手机号码：<input style="width:100px" class="add_saveHouse_landlordPhone" require="require">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						其它联系方式：<input style="width:252px" class="add_saveHouse_landlordOther">
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 12px;float: left;'>
						联系人：<input style="width:80px" class="add_saveHouse_contacts_people">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						手机号码：<input style="width:100px" class="add_saveHouse_contacts_infomation">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						其它联系方式：<input style="width:252px" class="add_saveHouse_other_contact_info">
					</div>
					<div style="clear:both"></div>
					<div style='margin:5px 0 0 12px;float: left;'>
						代理人：<input style="width:80px" class="add_saveHouse_the_agent">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						手机号码：<input style="width:100px" class="add_saveHouse_agent_phone">
					</div>
					<div style='margin:5px 0 0 2px;float: left;'>
						其它联系方式：<input style="width:252px" class="add_saveHouse_agent_other_contact">
					</div>
				</div>
				<div id="followInfoDiv" style="width:100%">
					<div style="float:left; margin:5px 0 0 10px">
						<!-- <a class="easyui-linkbutton" iconCls="icon-house-edit" onclick="setStateOwned()">锁盘/解锁</a> -->
						<a class="easyui-linkbutton" iconcls="icon-edit" id="writeFollowButton" onclick="writeFollow()">写跟进</a>					
					</div>
					<div style="float:left; margin:8px 0 0 10px">
						<select style="width:80px;" id="infoFollowType" onchange="infoFollowInfo('A')">
							<option value=''>全部跟进</option>
							<option value='系统跟进'>系统跟进</option>
							<option value='业务跟进'>业务跟进</option>
							<option value='行政跟进'>行政跟进</option>
							<option value='财务跟进'>财务跟进</option>
						</select>
					</div>
					<div style="clear:both"></div>
					<div style="width:638px; float:left; margin:5px 0 0 7px;">
						<table id="infoFollowTable"></table>
					</div>
				</div>
			</div>
			<div style="clear:both"></div>
			<div id="addDataHouse" style="margin:10px 0 0 0;">
				<center>
					<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('housePaperDlg')){doAddSaveHouse()}">提交</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#housePaperDlg').dialog('close')">关闭</a>
					<!-- <a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddSaveHouse()">保存</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#housePaperDlg').dialog('close')">关闭</a> -->
				</center>
			</div>
			<div id="updateDataHouse" style="margin:10px 0 0 0;">
				<center>
					<a class="easyui-linkbutton" iconcls="icon-up" onclick="laterOrNext(0)">上一条</a>
					<a class="easyui-linkbutton" iconcls="icon-edit" id="canUpdateDataHouse" onclick="readAndWrite(2)">修改</a>
					<a class="easyui-linkbutton" iconcls="icon-save" id="saveUpdateDataHouse" onclick="doUpdateSaveHouse()">保存</a>
					<a class="easyui-linkbutton" iconcls="icon-search" id="lookLandlordButton" onclick="lookLandlord()">看业主</a>
					<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#housePaperDlg').dialog('close')">关闭</a>
					<a class="easyui-linkbutton" iconcls="icon-down" onclick="laterOrNext(1)">下一条</a>
				</center>
			</div>
		</form>
	</div>
	
	<!-- 批量添加，别删，待完善  -->
	<!-- <div id="numsAddDataHouse" class="easyui-dialog"
		data-options="closed:true">
		<form id="formToUpdate" method="post" action="#" enctype="multipart/form-data">
			<br/>
			<fieldset>
				<legend>房屋信息</legend>
				<div style='margin:5px 0 0 24px;float: left;display:none'>
					城市：<select class="add_saveHouse_city" id="addSaveHouseCity"
						onchange="districtLink(1)" style="width:80px;">
					</select><input type="hidden" id="addCity" name="infoHouseExpand.addCity">
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>
					城区：<select class="companyRentDistrict" id="addSaveHouseDistrict"
						onchange="zoneLink(1)" style="width:80px;">
						<option></option>
					</select><input type="hidden" id="addDistrict"
						name="infoHouseExpand.addDistrict">
				</div>
				<div style='margin:0 0 0 5px;float: left;display:none'>
					片区：<select class="add_saveHouse_zone" id="addSaveHouseZone"
						onchange="buildNameLink(1)" style="width:80px;display:none'">
						<option></option>
					</select><input type="hidden" id="addZone" name="infoHouseExpand.addZone">
				</div>
				<div style='margin:5px 0 0 24px;float: left;display:none'>
					地址：<input class="add_saveHouse_stree" id="addSaveHouseStree"
						style="display:none"> <input type="hidden" id="addStreet"
						name="infoHouseExpand.addStreet">
				</div>
				<div style='margin:5px 0 0 10px;float: left;'>
					<div>
						楼盘名称：<input id="addSaveHouseBuildingName" style="width: 150px;"
							onkeyup='resetOption("addSaveHouseBuildingName", "saveHouse_buildingName" ,"buildingNamesDiv")'
							onclick='resetOption("addSaveHouseBuildingName", "saveHouse_buildingName" ,"buildingNamesDiv")'
							onfocus='resetOption("addSaveHouseBuildingName", "saveHouse_buildingName" ,"buildingNamesDiv")' />
					</div>
					<div id="buildingNamesDiv" style="margin-left:59px;height:150px;width: 150px;border:1px solid #A9A9AA;display:none;position : absolute; z-index : -1;background-color: #fff">
						<select class="add_saveHouse_buildingName" id="saveHouse_buildingName" multiple="multiple"
							style="height:150px;width: 150px;" onchange="streeLink(1)">
							<option></option>
						</select>
					</div>
				</div>
				<input type="hidden" id="addCommunity"
					name="infoHouseExpand.addCommunity"><input
					class="add_saveHouse_buildingId" id="houseDictId"
					name="infoHouseExpand.houseDictId" style="display:none"> <input
					class="add_saveHouse_user_id" id="userId"
					name="infoHouseExpand.userId" style="display:none">
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 24px;float: left;'>
					文件：<input type="file" accept=".csv" name="infoHouseExpand.myFile">
				</div>
			</fieldset>
		</form>
		<center>
			<a  id="ajaxSubmit"
				class="easyui-linkbutton" iconcls="icon-save">保存</a><a
				 class="easyui-linkbutton"
				iconcls="icon-cancel"
				onclick="javascript:$('#numsAddDataHouse').dialog('close')">关闭</a>
		</center>
	</div> -->
	<!-- 数据导入，别删，待完善  -->
	<!-- <div id="numsAddDataHouse1" class="easyui-dialog" data-options="closed:true">
		<form id="formToUpdate1" method="post" action="#" enctype="multipart/form-data">
			<div style="padding:5px 0 0 10px;">
                <a class="easyui-linkbutton" iconCls="icon-xiazai" plain="true" 
                    href="http://pic-static.fangzhizun.com/demo/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx">下载导入模板</a>
            </div>
			<div style='margin:20px 0 0 15px;'>
				文件：<input type="file" accept=".csv" name="importAttr.myFile">
			</div>
		</form>
		<center style="margin: 20px 0 0 0;">
			<a id="ajaxSubmit1" class="easyui-linkbutton" iconcls="icon-save">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#numsAddDataHouse1').dialog('close')">关闭</a>
		</center>
	</div> -->
	<!-- 跟进记录详细信息对话框 -->
	<!-- <div id="followInfoDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style='margin:0 0 0 24px;float: left;'>
			跟进人：<input style="width:80px" disabled='disabled'
				readonly='readonly' class="jhf_user_name">
		</div>
		<div style='margin:0 0 0 20px;float: left;'>
			跟进时间：<input style="width:150px" disabled='disabled'
				readonly='readonly' class="jhf_follow_time">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>
			跟进类型：<input style="width:80px" disabled='disabled'
				readonly='readonly' class="jhf_payment_way">
		</div>
		<div style='margin:5px 0 0 20px;float: left;'>
			跟进归属：<input style="width:150px" disabled='disabled'
				readonly='readonly' class="jhf_payment_belong">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 12px;float: left;'>跟进内容：</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea class="jhf_follow_remark" disabled='disabled'
				readonly='readonly' style="height:86px;width:312px"></textarea>
		</div>
	</div> -->
	<!-- 写跟进对话框--点进查看业主  -->
	<div id="writeFollow2" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style='margin:0 0 0 0;float: left;'>
			跟进归属：<select id="writeFollowBelong2" style="width:90px">
			<option value="0" selected="selected">业主</option>
			<option value="1">其他</option>
		</select>
		</div>
		<div style='margin:3px 0 0 12px;float: left;'>是否提醒：</div>
		<div style='margin:2px 0 0 0;float: left;'>
			<input type="checkbox" id="writeFollowRemind2">
		</div>
		<div style="clear:both;"></div>
		<div style='margin:5px 0 0 0;float: left;'>
			跟进内容：
		</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea class="follow_mark2" style="width:250px;height:70px"></textarea>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="followSaveHouse2()">保存</a>
<%--			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#writeFollow2').dialog('close')">关闭</a>--%>
		</div>
	</div>

	<!-- 写跟进对话框  -->
	<div id="writeFollow" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style='margin:0 0 0 0;float: left;'>
			跟进归属：<select id="writeFollowBelong" style="width:90px">
				<option value="0" selected="selected">业主</option>
				<option value="1">其他</option>
			</select>
		</div>
		<div style='margin:3px 0 0 12px;float: left;'>是否提醒：</div>
		<div style='margin:2px 0 0 0;float: left;'>
			<input type="checkbox" id="writeFollowRemind">
		</div>
		<div style="clear:both;"></div>
		<div style='margin:5px 0 0 0;float: left;'>
			跟进内容：
		</div>
		<div style='margin:5px 0 0 0;float: left;'>
			<textarea class="follow_mark" style="width:250px;height:70px"></textarea>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="followSaveHouse()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#writeFollow').dialog('close')">关闭</a>
		</div>
	</div>
	
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
						<td colspan="3" ><span id="readDownFollowjhfFollowBelong"></span></td>
					</tr>
					<tr>
						<td>跟进地址：</td>
						<td colspan="3" ><span id="readDownFollowdetailedAddress"></span></td>
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
	<div id="queryFollowInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 10px 10px;float: left;'>
			跟进类型：<select id="followTypeSearch" onchange="queryFollowInfo(1,0)">
				<option></option>
				<option value=''>全部跟进</option>
				<option value='系统跟进'>系统跟进</option>
				<option value='业务跟进'>业务跟进</option>
				<option value='行政跟进'>行政跟进</option>
				<option value='财务跟进'>财务跟进</option>
			</select>
		</div>
		<div style="margin:5px 0 10px 18px;color:black;font-size:13px;float:left;">
			跟进人：<input id="searchFollowShowUserInfo" class="choose_user_button"  doFlag="searchFollow" doFun="queryFollowInfo(1,0)"
				style="width:120px;cursor:pointer;" readonly="readonly" clear="clear" require="require">
			<input id="searchFollowGetUserStoreId" type="hidden">
			<input id="searchFollowGetUserDetId" type="hidden">
			<input id="searchFollowGetUserId" type="hidden" needs="1">
			<div id="searchFollowShowUserInfoDiv" style="display:none;"></div>
		</div>

		<div style="margin:5px 0 10px 10px;color:black;font-size:13px;float:left;">
			跟进时间：<input id="searchStartTime" style="width:80px" class="Wdate" type="text" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFollowInfo(1,0)})">到
			<input id="searchEndTime" style="width:80px" class="Wdate" type="text" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryFollowInfo(1,0)})">
		</div>
		<div style="clear: both;"></div>
		
		<div style='margin:5px 0 10px 10px;float: left;'>
			周期选择：<select id="followTurn" onchange="queryFollowInfo(1,0)">
				<option></option>
				<option value="本周">本周</option>
				<option value="上周">上周</option>
				<option value="本月">本月</option>
				<option value="上月">上月</option>
				<option value="本季度">本季度</option>
				<option value="上季度">上季度</option>
				<option value="本年">本年</option>
				<option value="去年">去年</option>
			</select>
		</div>
		<div style="margin:5px 0 10px 10px;float:left;">
			签约状态：<select id="searchFollowSignedState" onchange="queryFollowInfo(1,0)" style="width:80px">
				<option value="未托管">未托管</option>
				<option value="">全部</option>
				<option value="已托管">已托管</option>
			</select>
		</div>
		<div style="width:99%;heigjt:95%">
			<!-- 跟进信息列表  -->
			<table id="followInfoTable" style="width : 100%;height : 277px;">
			</table>
			<!-- 跟进分页  -->
			<div id="followInfoPageDiv" style="width:100%;text-align:center;"></div>
		</div>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.dataHouse.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>