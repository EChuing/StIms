<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>房间管理</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
  	<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
  	<link href="css/upload.css" rel="stylesheet">
  	<link href="css/contextMenu.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/jquery.pinyin-min.js"></script>
	<script src="js/config.js"></script>
	
  	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
  	<script src="js/jQuery.Hz2Py-min.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="height:100%;overflow:scroll">
		 <div style="margin:5px 0 0 0 ">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addTrusteeshipButton" onclick="addshortHouse()">添加客房</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="batchAdditionSRHButton" onclick="batchAdditionSRH()">批量添加客房</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="batchShelves(0)">批量发布</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="batchShelves(1)">批量下架</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="batchShelves(2)">批量注销</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="batchShelves(3)">批量启用</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="houseDict()">门店管理</a>
		</div>
		<div style="clear:both;"></div>
		<div style="float:left;margin:5px 0 0 10px">
			城区: <select id="searchHsAddDistrict" onchange="queryTrusteeship(1,0)" style="width:100px" />
			<option value="">全部</option>
			</select>
		</div>
		<div style="float:left;margin:5px 0 0 10px">
			门店: <input id="searchHsAddCommunity" onkeyup="queryTrusteeship(1,0)" style="width:100px" />
		</div>
		<div style="float:left;margin:5px 0 0 10px">
			房号: <input id="searchHsAddDoorplateno" onkeyup="queryTrusteeship(1,0)" style="width:100px" />
		</div>
		<div style="float:left;margin:5px 0 0 10px">
			房型: <select id="searchHsRoomType" onchange="queryTrusteeship(1,0)" style="width:100px" >
			</select>
		</div>
		<div style="float:left;margin:5px 0 0 10px">
			发布状态: <select id="searchHsMicronetIdentification" onchange="queryTrusteeship(1,0)" style="width:100px" >
			<option value="">全部</option>
			<option value="2">已发布</option>
			<option value="1">未发布</option>
			</select>
		</div>
		<div style="float:left;margin:5px 0 0 10px">
			客房状态: <select id="searchHsRoomStatusType" onchange="queryTrusteeship(1,0)" style="width:100px" >
			<option value="">全部</option>
			<option value="已住">已住</option>
			<option value="预定">预定</option>
			<option value="保留">保留</option>
			<option value="退房">退房</option>
			<option value="退定">退定</option>
			<option value="退定中">退定中</option>
			<option value="提前搬离">提前搬离</option>
			<option value="取消保留">取消保留</option>
			</select>
		</div>
		<div style="clear:both;"></div>
		<div id="shortRentHouse" style="width:100%;margin:10px 0 0 0">
			<table id="shortRentHouseTable" style="width:100%;height:526px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
				<thead>
					<tr>
						<th data-options="field:'ck',checkbox:true"></th>
						<th field="hsAddDistrict" width="15" align="center">城区</th>
						<th field="detailedAddress" width="30" align="center">门店地址</th>
						<th field="hsResidentiality" width="10" align="center">可住人数</th>
						<th field="hsRoomType" width="15" align="center">客房类型</th>
						<th field="hsMicronetIdentifica" width="15" align="center">发布状态</th>
						<th field="jsrcState" width="15" align="center">客房状态</th>
						<th field="houseShortState" width="15" align="center">房间状态</th>
					</tr>
				</thead>
			</table>
			<div id="shortRentHousePageDiv" style="width:100%;text-align:center;"></div>
		</div>
	</div>
	<div id="addGuestRoomsDlg" class="easyui-dialog" data-options="closed:true">
		<input id="addOldhsId" type="hidden" />
		<input id="addOldHsDailyRent" type="hidden" />
		<input id="addOldHsHotDailyRent" type="hidden" />
		<input id="addOldHsRoomType" type="hidden" />
		<input id="addOldHsFurnitureConfig" type="hidden" />
		<div id="addHsNoPaper" style='float:left'>
			<div style='margin:10px 0 0 29px;float:left'>
				省份: <input id="shortRentProvince" style="width:120px;" readonly="readonly" clear="clear1"></select>
			</div>
			<div style='margin:10px 0 0 10px;float:left'>
				城市: <input id="shortRentCity" style="width:120px;" readonly="readonly" clear="clear1">
			</div>
			<div style='margin:10px 0 0 29px;float:left'>
				城区: <select id="addShortRentDistrict" style="width:120px" require="require" onchange="noZoneLink()">
					<option></option>
				</select> 
			</div>
			<div style="clear:both"></div>
			<div style="margin:10px 0 0 5px;float:left">
				<input type="hidden" id="addShortRentZone" clear="clear">
				<input type="hidden" id="addShortRentStreet" clear="clear">
				门店名称: <input type="text" id=buildingName style="width: 120px;" clear="clear" require="require"
					onkeyup='resetOption("buildingName", "addNoTrusteeshipBuildingName" ,"buildingNameDiv")'
					onclick='resetOption("buildingName", "addNoTrusteeshipBuildingName" ,"buildingNameDiv")'
					onfocus='resetOption("buildingName", "addNoTrusteeshipBuildingName" ,"buildingNameDiv")' >
				<div id="buildingNameDiv" style="margin-left:56px;height:100px;width:120px;display:none;position : absolute; z-index : -1;background-color: #fff">
					<select id="addNoTrusteeshipBuildingName" multiple="multiple" style="height:100px;width:120px;" onchange="noStreeLink()">
						<option></option>
					</select>
				</div>
			</div>
			<div style="margin:10px 0 0 10px;float:left">
				房号: <input id="addShortRentDoorplateno" style="width:120px" clear="clear" require="require" >
			</div>
			<div style="float:left;margin:10px 0 0 5px">
				可住人数: <input id="addHsResidentiality" type="number" style="width:120px;" clear="clear" require="require"/>
			</div>
			<div style="clear:both"></div>
			<div style="float:left;margin:10px 0 0 5px;">
				客房类型: <select id="addShortHouseType" style="width:120px;" onchange="shortHouseMoney()">
				</select>
			</div>

		</div>
		<div style="clear:both"></div>
		<center style="margin:20px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('addGuestRoomsDlg')){addShortRentHouse()}">确认</a>
			<!-- <a class="easyui-linkbutton" iconcls="icon-save" onclick="changeShortRent(1)">确认</a> -->
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addGuestRoomsDlg').dialog('close')">取消</a>
		</center>
	</div>
	<div id="showFollowUpImg" style="padding:6px;display:none;"><!--  class="easyui-dialog" data-options="closed:true" -->
		<div style="padding:5px 0 0 10px;">
			<span id="followUpImgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div id="followUpImgWrapper" style="margin:10px 0 0 10px;"></div>
	</div>
	
	<!-- 批量添加短租房 -->
	<div id="centralizedApartmentDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div class="process-bar" style="padding:0 10px">
			<span class="process arrow-in arrow-out step1" data-step="1" id="gotoNav1"><span class="process-require">*</span>1.规则设置</span>
			<span class="process arrow-in arrow-out step2" data-step="2" id="gotoNav2"><span class="process-require">*</span>2.预览房间</span>
		</div>
		<hr color=#95b8e7 size=1 style="margin:3px">
		<div class="centralizedApartmentSteps">
			<div class="step centralizedApartmentStep1">
				<div style="min-height:320px;padding:5px 0 0 0;">
					<div style="padding:10px 0 0 5px;width:98%;">
						<table id="centralizedApartmentRuleDg2"></table>
						<div id="centralizedApartmentRuleTB2">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="append4()">新增规则</a>
							<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeit4()">删除规则</a>
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="accept4()">保存规则</a>
						</div>
					</div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="centralizedNextStep(2)">下一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="$('#centralizedApartmentDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="centralizedApartmentSteps">
			<div class="step centralizedApartmentStep2">
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
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('centralizedApartment', 1);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="centralizedNextStep(3)">保存</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="$('#centralizedApartmentDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 门店管理对话框 -->
	<div id="houseDict" class="easyui-dialog" data-options="closed:true">
		<div>
			<div style="padding:5px 0 5px 5px">
				<a class="easyui-linkbutton" iconCls="icon-add-notice" plain="true" id="addHouseDicButton" onclick="addHouseDic()">添加字典</a>
			</div>
			<div id="searchHouseDic" class="clearfix">
				<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
					城区：<select id="searchDistrict" onchange="queryDic(1,0)" style="width:100px" clear="clear">
						<option value="">全部</option>
					</select>
				</div>
				<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
					商圈：<input id="searchZone" onkeyup="searchOnkeyup(this.id, 'queryDic(1, 0)')" style="width:100px" clear="clear">
				</div>
				<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
					地址：<input id="searchRoad" onkeyup="searchOnkeyup(this.id, 'queryDic(1, 0)')" style="width:100px" clear="clear">
				</div>
				<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
					门店：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryDic(1, 0)')" style="width:100px" clear="clear">
				</div>
			</div>
		</div>
		<!--房屋字典列表-->
		<div id="DataGridHouseDic" style="width:100%;margin:5px 0 0 0">
			<table id="houseDicDg" style="width:100%;height:400px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="hdCity" width="10" align="center">城市</th>
						<th field="hdDistrict" width="20" align="center">城区</th>
						<th field="hdZone" width="20" align="center">商圈</th>
						<th field="hdRoad" width="20" align="center">地址</th>
						<th field="hdCommunity" width="20" align="center">门店</th>
					</tr>
				</thead>
			</table>
			<!-- 房屋字典分页 -->
			<!-- <div id="houseDicPageDiv" style="width:100%;text-align:center;"></div> -->
		</div>
		<!-- 房屋字典详细 -->
		<div id="houseDicInfoDlg" class="easyui-dialog" data-options="closed:true">
			<fieldset>
				<legend>位置信息</legend>
				<div id="distpicker" style='margin:5px 0 0 10px;float: left;'>
	               	城市：<select class="houseDic_province" style="width:100px;margin:0 0 0 0;" require="require" disabled="disabled"></select><!-- 省 -->
					<select class="houseDic_city" style="width:100px;margin:0 0 0 5px;" require="require" disabled="disabled"></select><!-- 市 -->
					<select class="houseDic_district" style="width:100px;margin:0 0 0 5px;" require="require" choose="choose"></select><!-- 区 -->
				</div>
				<div style='margin:5px 12px 0 0px;float: right;'>
					商圈：<input class="houseDic_zone"  style="width:100px" require="require">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 10px;float: left;'>
					地址：<input class="houseDic_road"  style="width:318px" require="require">
				</div> 
				<div style='margin:5px 0 0 40px;float: left;'>
					经度-x：<input type="number" class="houseDic_baidu_x" class="houseDic_baidu_x" style="width:100px">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 10px;float: left;'>
					楼盘：<input id="houseDicCommunity" onblur="toPinyin('houseDicCommunity','houseDicPinyin')" style="width:318px" require="require">
					<input type="hidden" id="houseDicPinyin" style="width:300px;">
				</div>
				<div style='margin:5px 0 0 40px;float: left;'>
					纬度-y：<input type="number" class="houseDic_baidu_y" style="width:100px">
				</div>
				<div style="clear:both"></div>
			</fieldset>
			<fieldset>
				<legend>门牌规则</legend>
				<div style='margin:10px 0 0 10px;'>
					楼层：<select class="doorplateno_type" id="doorplatenoType1" onchange="doorplatenoSelect()" style="width:80px;" choose="choose" require="require">
						<option></option>
					</select> 
					房号：<select class="doorplateno_type" id="doorplatenoType2" onchange="doorplatenoSelect()" style="width:80px;" choose="choose" require="require">
						<option></option>
					</select> 
					<select class="doorplateno_type" id="doorplatenoType3" onchange="doorplatenoSelect()" style="width:80px;" choose="choose" require="require">
						<option></option>
					</select>
					<input type="hidden" class="hd_doorplateno_relus">
				</div>
			</fieldset>
			<fieldset style="display:none;">
				<legend>楼盘信息（选填）</legend>
				<div style='margin:5px 0 0 12px;float: left;'>
					建筑类型：<input class="houseDic_form" style="width:100px">
				</div>
				<div style='margin:5px 0 0 25px;float: left;'>
					物业类别：<input class="houseDic_type" style="width:100px">
				</div>
				<div style='margin:5px 0 0 25px;float: left;'>
					竣工时间：<input class="houseDic_time" style="width:100px" onfocus="WdatePicker();">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 24px;float: left;'>
					开发商：<input class="houseDic_developers" style="width:200px">
				</div>
				<div style='margin:5px 0 0 10px;float: left;'>
					项目特色：<input class="houseDic_features" style="width:200px">
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 12px;float: left;'>
					环线位置：<input class="houseDic_position" style="width:200px">
				</div>
				<div style='margin:5px 0 0 22px;float: left;'>
					容积率：<input class="houseDic_plot_ratio" style="width:60px">%
				</div>
				<div style='margin:5px 0 0 10px;float: left;'>
					绿化率：<input class="houseDic_afforestation_rate" style="width:60px">%
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 12px;float: left;'>
					物业公司：<input class="houseDic_property_free" style="width:200px">
				</div>
				<div style='margin:5px 0 0 22px;float: left;'>
					物业费：<input class="houseDic_property_company" style="width:60px">元/平米*月
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 10px;float: left;'>物业公司<br>附加信息：</div>
				<div style='margin:5px 0 0 0;float: left;'>
					<textarea class="houseDic_property_note" style="height:50px;width:472px"></textarea>
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 12px;float: left;'>
					占地面积：<input class="houseDic_covers_area" style="width:80px">万平米
				</div>
				<div style='margin:5px 0 0 20px;float: left;'>
					建筑面积：<input class="houseDic_floor_area" style="width:80px">万平米
				</div>
				<div style='margin:5px 0 0 20px;float: left;'>
					总户数：<input class="houseDic_sum_households" style="width:80px">户
				</div>
	
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 0;float: left;'>
					地上停车位：<input class="houseDic_space_top" style="width:80px">个
				</div>
				<div style='margin:5px 0 0 32px;float: left;'>
					地下停车位：<input class="houseDic_space_nude" style="width:80px">个
				</div>
				<div style='margin:5px 0 0 32px;float: left;'>
					当期户数：<input class="houseDic_current_number" style="width:80px">户
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 12px;float: left;'>区位介绍：</div>
				<div style='margin:5px 0 0 0;float: left;'>
					<textarea class="houseDic_introduce" style="height:50px;width:472px"></textarea>
				</div>
			</fieldset>
			<div id="saveHouseDic" style="margin:10px 0 0 0;text-align: center;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddHouseDic()">保存</a> 
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#houseDicInfoDlg').dialog('close')">取消</a>
			</div>
			<div id="updateHouseDic" style="margin:10px 0 0 0;text-align: center;">
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateHouseDic()" id="updateHouseDicButton">保存</a> 
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#houseDicInfoDlg').dialog('close')">取消</a>
			</div>
		</div>
	</div>
	<!-- 批量添加客房窗口 -->
	<div id="batchAdditionShortRentHouseDlg" class="easyui-dialog" data-options="closed:true">
		<iframe id="batchAdditionShortRentHouseBill" style="width:100%;height:99%;boder:0px;" frameborder="0" scrolling="auto">
		</iframe>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<jsp:include page="/ui/public/hsImgDlg.jsp"></jsp:include>
	<jsp:include page="/ui/fg_shortRentHouseDetails.jsp"></jsp:include>
	<script src="js/upload.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg_shortRentHouse.js"></script>
	<script src="js/fg_shortRentHouseDetails.js"></script>
	<script src="js/fg.houseDic.js"></script>
	<script src="js/distpicker.js"></script>
</body>
</html>