<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>58分散式发布</title>
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
	<!-- 按钮及筛选条件 -->
	<div>
		<div style="padding:5px 0 0 5px;">
			<a class="easyui-linkbutton" iconCls="icon-fabu" plain="true" onclick="pushHouseDlg()">发布房源</a>
			<a class="easyui-linkbutton" iconCls="icon-bianji" plain="true" onclick="updatePushHouseDlg()">修改并重新发布</a>
			<a class="easyui-linkbutton" iconCls="icon-shangjia" plain="true" onclick="updateHouseStatus()">上架/下架</a>
			<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="queryPushHouse(1, 0)" >刷新</a>
			<a class="easyui-linkbutton" iconCls="icon-bangding" plain="true" onclick="bindDlg()" >账号绑定</a>
		</div>
		<div>
			<div style="padding:5px 0 5px 8px;color:black;font-size:13px;float:left;">
				楼盘名称： <input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryPushHouse(1, 0)')"
					style="width:100px">
			</div>
			<div style="padding:5px 0 0 31px;color:black;font-size:13px;float:left;">
				楼栋： <input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryPushHouse(1, 0)')"
					style="width:100px">
			</div>
			<div style="padding:5px 0 0 17px;color:black;font-size:13px;float:left;">
				门牌号： <input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryPushHouse(1, 0)')"
					style="width:100px">
			</div>
		</div>
	</div>
	<!-- 房源列表 -->
	<div>
		<table id="houseDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="detailedAddress" width="20" align="center">房源地址</th>
					<th field="houseStatusDesc" width="20" align="center">发布状态</th>
				</tr>
			</thead>
		</table>
		<div id="housePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 发布房源 -->
	<div id="pushHouseDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment('public')">上传及查看图片</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<input id="appId" type="hidden"><!-- 58分配给合作公寓的接入ID -->
		<div style='margin:5px 0 0 5px;float:left;'>
			选择房源：<input id="bindAddress" style="width:265px;cursor:pointer;" readonly onclick="chooseHouseForStore()" require="require" clear="clear">
			<input id="outHouseId" type="hidden" clear="clear" value="789"><!-- 合作公寓系统的房屋id -->
		</div>
		<!-- <div style='margin:2px 0 0 5px;float:left;display:none;'>
			资料审核状态：<input id="houseStatus2" style="width:100px;" readonly clear="clear">
			<a class="easyui-linkbutton" style="margin:0 5px;" onclick="">刷新</a>
		</div> -->
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城市：<input id="cityName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城区：<input id="countyName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属商圈：<input id="areaName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属小区：<input id="districtName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			小区详细地址：<input id="street" style="width:150px;" require="require" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 17px;float:left;'>
			门牌号：<input id="address" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			出租方式：<select id="rentType" style="width:100px;" require="require" choose="choose" onchange="changeRentType()">
				<option></option>
				<option value="1">整租</option>
				<option value="2">单间</option>
			</select>
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
		<div style='margin:5px 0 0 5px;float:left;'>
			有无电梯：<select id="hasLift" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="2">有</option>
				<option value="1">无</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			单间出租类别：<select id="bedRoomType" style="width:150px;" choose="choose" disabled="disabled">
				<option></option>
				<option value="31">主卧</option>
				<option value="32">次卧</option>
			</select>
		</div>
		<div style="clear:both"></div>
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
			楼层总数：<input id="totalFloor" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 41px;float:left;'>
			楼层数：<input id="houseFloor" style="width:150px;" require="require" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 29px;float:left;'>
			面积：<input id="rentRoomArea" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			起租时间：<input id="rentStartDate" style="width:100px;" require="require" clear="clear"
				onfocus="WdatePicker({autoPickDate:true})">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			短租：<select id="shortRent" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="1">支持</option>
				<option value="0">不支持</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			压付方式：<select id="paymentMode" style="width:100px;" require="require" choose="choose">
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
		<div style='margin:5px 0 0 53px;float:left;'>
			租金：<input id="monthRent" style="width:150px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			联系人：<input id="agentName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			联系电话：<input id="agentPhone" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			经度：<input id="xCoord" style="width:100px;cursor:pointer;" require="require" clear="clear" readonly="readonly" onclick="openMap(1)">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			纬度：<input id="yCoord" style="width:100px;cursor:pointer;" require="require" clear="clear" readonly="readonly" onclick="openMap(1)">
		</div>
		<div style="clear:both"></div>
		<div id="featureTag">
			<div style="margin:5px 0 5px 0;">房屋特点集：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="10">离地铁近</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="11">独立阳台</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="12">独立卫生间</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="13">厨房</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="14">公共阳台</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="15">公共卫生间</button>
		</div>
		<div id="detailPoint" style="width:80%;">
			<div style="margin:5px 0 5px 0;">房屋配置集：</div>
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
		<div id="servicePoint">
			<div style="margin:5px 0 5px 0;">周边配套设施：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="91">健身房</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="92">公寓超市</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="93">智能门锁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="94">ATM机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="95">代收快递</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="96">专属客服</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="97">房间清洁</button>
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
				<div>房间描述：</div>
				<textarea id="houseDesc" style="margin:5px 0 0 0;width:900px;height:50px;" require="require" clear="clear" placeholder="描述50-500字符"></textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doPushHouse()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#pushHouseDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<!-- 修改房源 -->
	<div id="updatePushHouseDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<!-- <div style="padding:5px 0 5px 5px;" id="picUrlList2">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment2('public')">上传及查看图片</a>
			<span class="attachmentNum2" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div> -->
		<input id="appId2" type="hidden"><!-- 58分配给合作公寓的接入ID -->
		<div style='margin:5px 0 0 5px;float:left;'>
			房源地址：<input id="bindAddress2" style="width:265px;" readonly clear="clear">
			<input id="outHouseId2" type="hidden" clear="clear" value="789"><!-- 合作公寓系统的房屋id -->
		</div>
		<%--<div style='margin:5px 0 0 5px;float:left;'>
			<div clear="clear"></div>
			<input id="outHouseId2" type="hidden" clear="clear"><!-- 合作公寓系统的房屋id -->
		</div>--%>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城市：<input id="cityName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城区：<input id="countyName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属商圈：<input id="areaName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属小区：<input id="districtName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			小区详细地址：<input id="street2" style="width:150px;" require="require" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 17px;float:left;'>
			门牌号：<input id="address2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			出租方式：<select id="rentType2" style="width:100px;" require="require" choose="choose" onchange="changeRentType()">
				<option></option>
				<option value="1">整租</option>
				<option value="2">单间</option>
			</select>
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
		<div style='margin:5px 0 0 5px;float:left;'>
			有无电梯：<select id="hasLift2" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="2">有</option>
				<option value="1">无</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			单间出租类别：<select id="bedRoomType2" style="width:150px;" choose="choose" disabled="disabled">
				<option></option>
				<option value="31">主卧</option>
				<option value="32">次卧</option>
			</select>
		</div>
		<div style="clear:both"></div>
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
			楼层总数：<input id="totalFloor2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 41px;float:left;'>
			楼层数：<input id="houseFloor2" style="width:150px;" require="require" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 29px;float:left;'>
			面积：<input id="rentRoomArea2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			起租时间：<input id="rentStartDate2" style="width:100px;" require="require" clear="clear"
				onfocus="WdatePicker({autoPickDate:true})">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			短租：<select id="shortRent2" style="width:100px;" require="require" choose="choose">
				<option></option>
				<option value="1">支持</option>
				<option value="0">不支持</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			压付方式：<select id="paymentMode2" style="width:100px;" require="require" choose="choose">
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
		<div style='margin:5px 0 0 53px;float:left;'>
			租金：<input id="monthRent2" style="width:150px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			联系人：<input id="agentName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			联系电话：<input id="agentPhone2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			经度：<input id="xCoord2" style="width:100px;cursor:pointer;" require="require" clear="clear" readonly="readonly" onclick="openMap(2)">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			纬度：<input id="yCoord2" style="width:100px;cursor:pointer;" require="require" clear="clear" readonly="readonly" onclick="openMap(2)">
		</div>
		<div style="clear:both"></div>
		<div id="featureTag2">
			<div style="margin:5px 0 5px 0;">房屋特点集：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="10">离地铁近</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="11">独立阳台</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="12">独立卫生间</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="13">厨房</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="14">公共阳台</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="15">公共卫生间</button>
		</div>
		<div id="detailPoint2" style="width:80%;">
			<div style="margin:5px 0 5px 0;">房屋配置集：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="71">床</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="72">衣柜</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="73">书桌</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="74">空调</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="75">暖气</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="76">电视机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="77">燃气</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="78">微波炉</button>
			<div style="clear:both"></div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="79">电磁炉</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="80">热水器</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="81">洗衣机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="82">冰箱</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="83">WIFI</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="84">沙发</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="85">橱柜</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="86">油烟机</button>
		</div>
		<div id="servicePoint2">
			<div style="margin:5px 0 5px 0;">周边配套设施：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="91">健身房</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="92">公寓超市</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="93">智能门锁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="94">ATM机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="95">代收快递</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="96">专属客服</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="97">房间清洁</button>
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
				<div>房间描述：</div>
				<textarea id="houseDesc2" style="margin:5px 0 0 0;width:900px;height:50px;" require="require" clear="clear"></textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdatePushHouse()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updatePushHouseDlg').dialog('close')">关闭</a>
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
				楼盘/小区：<input id="choseCommunity" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				楼栋：<input id="choseBuilding" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:80px">
			</div>
			<div style="margin:5px 0 5px 5px;color:black;font-size:13px;float:left;">
				门牌号：<input id="choseDoorplateno" onkeyup="searchOnkeyup(this.id, 'query4StoreInfo(1, 0)')" style="width:80px">
			</div>
		</div>
		<!-- 选择房屋列表 -->
		<table id="choseHouseTable"></table>
		<div id="choseHousePageDiv" style="width:99%"></div>
	</div>
	<div id="updateHouseStatusDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 0 5px;text-align: center;">
			发布状态：<select id="houseStatus">
				<option></option>
				<option value="3000">已发布</option>
				<option value="4000">已下架</option>
				<option value="5000">已出租</option>
			</select>
		</div>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" id="" onclick="doUpdateHouseStatus()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateHouseStatusDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<!-- 地图选址 -->
	<div id="mapDlg" class="easyui-dialog" data-options="closed:true">
		<div id="allmap" style="height:100%;"></div>
	</div>
	<div id="bindDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<input type="easyui-textbox" style="margin:10px 0 10px 10px;width:250px;height:40px;" placeholder="授权码" clear="clear">
		<div style="text-align:center;"><span style="padding:0 10px;font-size:14px;color:red;">开通58品牌公寓请致电 010-59565858</span></div>
		<div style="margin:10px 0 10px 10px;width:250px;height:40px;line-height:40px;text-align:center;font-size:16px;color:#fff;border:1px solid #4cae4c;border-radius:2px;background:#5cb85c;box-sizing:border-box;" onclick="$.messager.alert('通知','授权码错误','error')">绑定</div>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.58PushHouse.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>