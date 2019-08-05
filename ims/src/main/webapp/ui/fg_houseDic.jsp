<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>楼盘字典</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/jquery.pinyin-min.js"></script>
	<script src="js/config.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="padding:5px 0 5px 5px">
			<a class="easyui-linkbutton" iconCls="icon-add-notice" plain="true" id="addHouseDicButton" onclick="addHouseDic()">添加字典</a>
		</div>
		<div id="searchHouseDic" class="clearfix">
			<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
				城区：<select id="searchDistrict" onchange="queryDic(1,0)" style="width:100px">
					<option></option>
				</select>
			</div>
			<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
				商圈：<input id="searchZone" onkeyup="searchOnkeyup(this.id, 'queryDic(1, 0)')" style="width:100px">
			</div>
			<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
				地址：<input id="searchRoad" onkeyup="searchOnkeyup(this.id, 'queryDic(1, 0)')" style="width:100px">
			</div>
			<div style="padding:5px 0 5px 15px;color:black;font-size:13px;float:left;">
				楼盘/小区：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryDic(1, 0)')" style="width:100px">
			</div>
		</div>
	</div>
	<!--房屋字典列表-->
	<div id="DataGridHouseDic" style="width:100%;height:90%;">
		<table id="houseDicDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="hdCity" width="10" align="center">城市</th>
					<th field="hdDistrict" width="20" align="center">城区</th>
					<th field="hdZone" width="20" align="center">商圈</th>
					<th field="hdRoad" width="20" align="center">地址</th>
					<th field="hdCommunity" width="20" align="center">楼盘/小区</th>
				</tr>
			</thead>
		</table>
		<!-- 房屋字典分页 -->
		<div id="houseDicPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 房屋字典详细 -->
	<div id="houseDicInfoDlg" class="easyui-dialog" data-options="closed:true">
		<fieldset>
			<legend>位置信息</legend>
			<div id="distpicker" style='margin:5px 0 0 10px;float: left;'>
               	城市：<select class="houseDic_province" style="width:100px;margin:0 0 0 0;" require="require" disabled="disabled"></select><!-- 省 -->
				<select class="houseDic_city" style="width:100px;margin:0 0 0 5px;" require="require"></select><!-- 市 -->
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
	<script src="js/fg.public.js"></script>
	<script src="js/fg.houseDic.js"></script>
	<script src="js/distpicker.js"></script>
</body>
</html>