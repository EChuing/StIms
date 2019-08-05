<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>58集中式发布</title>
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
	<script src="http://api.map.baidu.com/api?v=3.0&ak=nw1sj1PFR8Qjo1ld5CvkwxTA3SSOIcY3"></script>
	<script src="js/config.js"></script>
	<style type="text/css">
		.checkbox{
			float: left;
			margin: -2px 0 0 0;
		}
		.checkBoxInput {
			float: left;
			margin: 4px 0 5px 15px
		}
		.checkBoxName {
			float: left;
			margin: 2px 0 5px 5px;
			width: 80px;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="width:20%;float:left;">
		<div>
			<div style="padding:5px 0 5px 5px;">
				<a class="easyui-linkbutton" iconCls="icon-fabu" plain="true" id="" onclick="addApartmentDlg()">添加门店</a>
				<!-- <a class="easyui-linkbutton" iconCls="icon-bianji" plain="true" id="" onclick="updateApartmentDlg()">修改门店</a> -->
			</div>
		</div>
		<!-- 门店列表 -->
		<div>
			<table id="apartmentDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="p5aApartmentName" width="20" align="center">门店</th>
					</tr>
				</thead>
			</table>
			<div id="apartmentPageDiv" style="width:100%;text-align:center;"></div>
		</div>
	</div>
	<div style="width:20%;float:left;">
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-fabu" plain="true" id="" onclick="addLayoutDlg()">添加房型</a>
			<!-- <a class="easyui-linkbutton" iconCls="icon-bianji" plain="true" id="" onclick="updateLayoutDlg()">修改房型</a> -->
		</div>
		<!-- 房型列表 -->
		<div>
			<table id="layoutDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="p5lLayoutName" width="20" align="center">房型</th>
					</tr>
				</thead>
			</table>
			<div id="layoutPageDiv" style="width:100%;text-align:center;"></div>
		</div>
	</div>
	<div style="width:60%;float:left;">
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-fabu" plain="true" id="" onclick="addRoomDlg()">添加房间</a>
			<a class="easyui-linkbutton" iconCls="icon-bianji" plain="true" id="" onclick="updateRoomDlg()">修改房间</a>
		</div>
		<!-- 房间列表 -->
		<div>
			<table id="roomDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="detailedAddress" width="20" align="center">房间</th>
						<th field="roomStatus" width="20" align="center">状态</th>
					</tr>
				</thead>
			</table>
			<div id="roomPageDiv" style="width:100%;text-align:center;"></div>
		</div>
	</div>
	<!-- 添加门店 -->
	<div id="addApartmentDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment('public')">上传及查看图片</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<input id="appId" type="hidden"><!-- 58分配给合作公寓的接入ID -->
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			门店名字：<input id="apartmentName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城市：<select id="cityCode" style="width:100px;" require="require" choose="choose" onchange="changeCity()">
				<option></option>
				<option value="1">北京</option>
				<option value="2">上海</option>
				<option value="3">广州</option>
				<option value="4">深圳</option>
				<option value="5">苏州</option>
				<option value="18">天津</option>
				<option value="37">重庆</option>
				<option value="79">杭州</option>
				<option value="102">成都</option>
				<option value="122">青岛</option>
				<option value="147">大连</option>
				<option value="158">武汉</option>
				<option value="172">南京</option>
				<option value="188">沈阳</option>
				<option value="241">石家庄</option>
				<option value="265">济南</option>
				<option value="342">郑州</option>
				<option value="414">长沙</option>
				<option value="483">西安</option>
				<option value="606">厦门</option>
				<option value="740">太原</option>
				<option value="801">包头</option>
				<option value="837">合肥</option>
				<option value="845">南宁</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城区：<select id="countyCode" style="width:100px;" require="require" choose="choose" onchange="changeCounty()">
				<option></option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属商圈：<select id="areaCode" style="width:100px;" require="require" choose="choose">
				<option></option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			门店地址：<input id="street" style="width:157px;" require="require" clear="clear">
		</div>
		<div style="clear:both;"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			咨询电话：<input id="apartmentPhone" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			楼层总数：<input id="totalFloor" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			每层几房：<input id="roomNum" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			有无电梯：<select id="hasLift" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="2">有</option>
				<option value="1">无</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			经度：<input id="xCoord" style="width:70px;cursor:pointer;" require="require" clear="clear" readonly="readonly" onclick="openMap(1)">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			纬度：<input id="yCoord" style="width:70px;cursor:pointer;" require="require" clear="clear" readonly="readonly" onclick="openMap(1)">
		</div>
		<div style="clear:both"></div>
		<div id="servicePoint">
			<div style="margin:5px 0 5px 0;">周边配套设施：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="141">24H安保</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="142">代收快递</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="143">保洁维修</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="144">ATM</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="145">智能门锁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="146">专属客服</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="147">社区活动</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="148">公寓超市</button>
		</div>
		<div id="rentRequire">
			<div style="margin:5px 0 5px 0;">入住要求：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="163">不可带小孩</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="164">不可养宠物</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="165">只租女生</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="166">只租男生</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="167">无特殊要求</button>
		</div>
		<div style='margin:5px 0 0 0;'>
			<div style='margin:5px 0 0 5px;'>
				<div>退租声明：</div>
				<textarea id="unrent" style="margin:5px 0 0 0;width:900px;height:50px;" require="require" clear="clear">
					*********************************************描述50-500字符*********************************************
				</textarea>
			</div>
		</div>
		<div style='margin:5px 0 0 0;'>
			<div style='margin:5px 0 0 5px;'>
				<div>转租声明：</div>
				<textarea id="sublet" style="margin:5px 0 0 0;width:900px;height:50px;" require="require" clear="clear">
					*********************************************描述50-500字符*********************************************
				</textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doAddApartment()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addApartmentDlg').dialog('close')">关闭</a>
		</div>
	</div>
	
	<!-- 修改门店 -->
	<div id="updateApartmentDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<!-- <div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment('public')">上传及查看图片</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div> -->
		<input id="appId2" type="hidden"><!-- 58分配给合作公寓的接入ID -->
		<input id="outApartmentId2" type="hidden"><!-- ims门店id，实际上没有使用门店id，而是随机生成的 -->
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			门店名字：<input id="apartmentName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城市：<input id="cityName2" style="width:100px;" require="require" clear="clear" readonly="readonly">
			<!-- <select id="cityCode2" style="width:100px;" require="require" choose="choose" onchange="changeCity()">
				<option></option>
				<option value="1">北京</option>
				<option value="2">上海</option>
				<option value="3">广州</option>
				<option value="4">深圳</option>
				<option value="5">苏州</option>
				<option value="18">天津</option>
				<option value="37">重庆</option>
				<option value="79">杭州</option>
				<option value="102">成都</option>
				<option value="122">青岛</option>
				<option value="147">大连</option>
				<option value="158">武汉</option>
				<option value="172">南京</option>
				<option value="188">沈阳</option>
				<option value="241">石家庄</option>
				<option value="265">济南</option>
				<option value="342">郑州</option>
				<option value="414">长沙</option>
				<option value="483">西安</option>
				<option value="606">厦门</option>
				<option value="740">太原</option>
				<option value="801">包头</option>
				<option value="837">合肥</option>
				<option value="845">南宁</option>
			</select> -->
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城区：<input id="countyName2" style="width:100px;" require="require" clear="clear" readonly="readonly">
			<!-- <select id="countyCode2" style="width:100px;" require="require" choose="choose" onchange="changeCounty()">
				<option></option>
			</select> -->
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属商圈：<input id="areaName2" style="width:100px;" require="require" clear="clear" readonly="readonly">
			<!-- <select id="areaCode2" style="width:100px;" require="require" choose="choose">
				<option></option>
			</select> -->
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			门店地址：<input id="street2" style="width:157px;" require="require" clear="clear">
		</div>
		<div style="clear:both;"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			咨询电话：<input id="apartmentPhone2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			楼层总数：<input id="totalFloor2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			每层几房：<input id="roomNum2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			有无电梯：<select id="hasLift2" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="2">有</option>
				<option value="1">无</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			经度：<input id="xCoord2" style="width:70px;cursor:pointer;" require="require" clear="clear" readonly="readonly" onclick="openMap(2)">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			纬度：<input id="yCoord2" style="width:70px;cursor:pointer;" require="require" clear="clear" readonly="readonly" onclick="openMap(2)">
		</div>
		<div style="clear:both"></div>
		<div id="servicePoint2">
			<div style="margin:5px 0 5px 0;">周边配套设施：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="141">24H安保</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="142">代收快递</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="143">保洁维修</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="144">ATM</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="145">智能门锁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="146">专属客服</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="147">社区活动</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="148">公寓超市</button>
		</div>
		<div id="rentRequire2">
			<div style="margin:5px 0 5px 0;">入住要求：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="163">不可带小孩</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="164">不可养宠物</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="165">只租女生</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="166">只租男生</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="167">无特殊要求</button>
		</div>
		<div style='margin:5px 0 0 0;'>
			<div style='margin:5px 0 0 5px;'>
				<div>退租声明：</div>
				<textarea id="unrent2" style="margin:5px 0 0 0;width:900px;height:50px;" require="require" clear="clear">
					*********************************************描述50-500字符*********************************************
				</textarea>
			</div>
		</div>
		<div style='margin:5px 0 0 0;'>
			<div style='margin:5px 0 0 5px;'>
				<div>转租声明：</div>
				<textarea id="sublet2" style="margin:5px 0 0 0;width:900px;height:50px;" require="require" clear="clear">
					*********************************************描述50-500字符*********************************************
				</textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<!-- <div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdateApartment()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateApartmentDlg').dialog('close')">关闭</a>
		</div> -->
	</div>
	
	<!-- 添加房型 -->
	<div id="addLayoutDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment('public')">上传及查看图片</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<input id="appId" type="hidden"><!-- 58分配给合作公寓的接入ID -->
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 29px;float:left;'>
			门店：<select id="apartmentId" style="width:100px;" require="require" choose="choose"></select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			房型名字：<input id="styleName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			房管姓名：<input id="agentName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			房管电话：<input id="agentPhone" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			房间数：<input id="bedRoomNum" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			客厅数：<input id="livingRoomNum" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			卫生间数：<input id="toiletNum" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			付款方式：<select id="rentPayType" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="149">押一付三</option>
				<option value="150">押一付一</option>
				<option value="151">押一付二</option>
				<option value="152">押二付二</option>
				<option value="153">半年付</option>
				<option value="154">年付</option>
				<option value="161">押二付一</option>
				<option value="162">押二付三</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			最低租金：<input id="monthRent" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			最高租金：<input id="maxMonthRent" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			面积：<input id="rentRoomArea" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			朝向：<select id="faceToType" style="width:100px;" choose="choose">
				<option></option>
				<option value="60">东</option>
				<option value="61">南</option>
				<option value="62">西</option>
				<option value="63">北</option>
				<option value="64">东南</option>
				<option value="65">西南</option>
				<option value="66">东北</option>
				<option value="67">西北</option>
				<option value="68">东西</option>
				<option value="69">南北</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="featureTag">
			<div style="margin:5px 0 5px 5px;">房型特色：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="155">开放式厨房</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="156">独立卫生间</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="157">临近地铁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="158">可短租</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="159">南北通透</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="160">家电齐全</button>
		</div>
		<div id="detailPoint">
			<div style="margin:5px 0 5px 5px;">房型常规配置：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="71">床</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="72">衣柜</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="73">书桌</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="74">空调</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="75">暖气</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="76">电视机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="77">燃气</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="78">微波炉</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="79">电磁炉</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="80">热水器</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="81">洗衣机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="82">冰箱</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="83">WIFI</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="84">沙发</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="85">橱柜</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="86">油烟机</button>
		</div>
		<div style='margin:5px 0 0 0;'>
			<div style='margin:5px 0 0 5px;'>
				<div>房型描述：</div>
				<textarea id="houseDesc" style="margin:5px 0 0 0;width:700px;height:50px;" require="require" clear="clear">
					*********************************************描述50-500字符*********************************************
				</textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doAddLayout()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addLayoutDlg').dialog('close')">关闭</a>
		</div>
	</div>
	
	<!-- 修改房型 -->
	<div id="updateLayoutDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<!-- <div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment('public')">上传及查看图片</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div> -->
		<input id="appId2" type="hidden"><!-- 58分配给合作公寓的接入ID -->
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 29px;float:left;'>
			门店：<select id="apartmentId2" style="width:100px;" require="require" choose="choose"></select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			房型名字：<input id="styleName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			房管姓名：<input id="agentName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			房管电话：<input id="agentPhone2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			房间数：<input id="bedRoomNum2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			客厅数：<input id="livingRoomNum2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			卫生间数：<input id="toiletNum2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			付款方式：<select id="rentPayType2" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="149">押一付三</option>
				<option value="150">押一付一</option>
				<option value="151">押一付二</option>
				<option value="152">押二付二</option>
				<option value="153">半年付</option>
				<option value="154">年付</option>
				<option value="161">押二付一</option>
				<option value="162">押二付三</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			最低租金：<input id="monthRent2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			最高租金：<input id="maxMonthRent2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			面积：<input id="rentRoomArea2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			朝向：<select id="faceToType2" style="width:100px;" choose="choose">
				<option></option>
				<option value="60">东</option>
				<option value="61">南</option>
				<option value="62">西</option>
				<option value="63">北</option>
				<option value="64">东南</option>
				<option value="65">西南</option>
				<option value="66">东北</option>
				<option value="67">西北</option>
				<option value="68">东西</option>
				<option value="69">南北</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="featureTag2">
			<div style="margin:5px 0 5px 5px;">房型特色：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="155">开放式厨房</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="156">独立卫生间</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="157">临近地铁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="158">可短租</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="159">南北通透</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="160">家电齐全</button>
		</div>
		<div id="detailPoint2">
			<div style="margin:5px 0 5px 5px;">房型常规配置：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="71">床</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="72">衣柜</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="73">书桌</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="74">空调</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="75">暖气</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="76">电视机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="77">燃气</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="78">微波炉</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="79">电磁炉</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="80">热水器</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="81">洗衣机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="82">冰箱</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="83">WIFI</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="84">沙发</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="85">橱柜</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="86">油烟机</button>
		</div>
		<div style='margin:5px 0 0 0;'>
			<div style='margin:5px 0 0 5px;'>
				<div>房型描述：</div>
				<textarea id="houseDesc2" style="margin:5px 0 0 0;width:700px;height:50px;" require="require" clear="clear">
					*********************************************描述50-500字符*********************************************
				</textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<!-- <div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdateLayout()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateLayoutDlg').dialog('close')">关闭</a>
		</div> -->
	</div>
	<!-- 添加房间 -->
	<div id="addRoomDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<input id="appId" type="hidden"><!-- 58分配给合作公寓的接入ID -->
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			选择房源：<input id="addRoomBindAddress" style="width:265px;cursor:pointer;" readonly onclick="chooseHouseForStore()" require="require" clear="clear">
			<input id="addRoomOutHouseId" type="hidden" clear="clear" value=""><!-- 合作公寓系统的房屋id -->
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			门店：<input id="addRoomApartmentName" style="width:100px;" require="require" clear="clear" readonly="readonly">
			<input id="addRoomApartmentId" type="hidden" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			房型：<input id="addRoomHouseName" style="width:100px;" require="require" clear="clear" readonly="readonly">
			<input id="addRoomHouseId" type="hidden" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			楼层数：<input id="addRoomFloorNum" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			房间号：<input id="addRoomRoomNum" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			房间状态：<select id="addRoomRoomStatus" style="width:100px;" require="require" clear="clear">
				<option></option>
				<option value="3000">可出租</option>
				<option value="5000">已出租</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doAddRoom()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRoomDlg').dialog('close')">关闭</a>
		</div>
	</div>
	
	<!-- 修改房间 -->
	<div id="updateRoomDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<input id="appId" type="hidden"><!-- 58分配给合作公寓的接入ID -->
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 17px;float:left;'>
			楼层数：<input id="updateRoomFloorNum" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			房间号：<input id="updateRoomRoomNum" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			房间状态：<select id="updateRoomRoomStatus" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="3000">可出租</option>
				<option value="5000">已出租</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdateRoom()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateRoomDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<!-- 选择房屋对话框 -->
	<div id="choseHouse" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div id="search4Store" style="margin:0 0 0 5px">
			<div style="margin:5px 0 5px 0;color:black;font-size:13px;float:left;">
				城区：<select id="choseDistrict" onchange="query4StoreInfo(1,0)" style="width:80px">
					<option></option>
				</select>
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼盘/小区：<input id="choseCommunity" onkeyup="queryOnkeyup(this.id,5,1)" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼栋：<input id="choseBuilding" onkeyup="queryOnkeyup(this.id,3,1)" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				门牌号：<input id="choseDoorplateno" onkeyup="queryOnkeyup(this.id,3,1)" style="width:80px">
			</div>
		</div>
		<!-- 选择房屋列表 -->
		<table id="choseHouseTable"></table>
		<div id="choseHousePageDiv" style="width:99%"></div>
	</div>
	<!-- 地图选址 -->
	<div id="mapDlg" class="easyui-dialog" data-options="closed:true">
		<div id="allmap" style="height:100%;"></div>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.zzyPushRoom.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>