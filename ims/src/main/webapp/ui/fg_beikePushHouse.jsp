<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>贝壳分散式发布</title>
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
	<style type="text/css">
		.cover {
		    position: absolute;
		    transform: rotate(-45deg);
		    font-family: HiraginoSansGB-W6;
		    font-size: 12px;
		    color: #fff;
		    background: #34bb8e;
		    padding: 10px 20px 3px;
		    top: -4px;
		    left: -22px;
			cursor: default;
			z-index: 5;
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<!-- 房屋 -->
	<div style="width:30%;float:left;">
		<a class="easyui-linkbutton" iconCls="icon-fabu" plain="true" onclick="pushHouseDlg()">发布房屋</a>
		<a class="easyui-linkbutton" iconCls="icon-bianji" plain="true" onclick="updatePushHouseDlg()">更新房屋</a>
		<div style="clear:both"></div>
		<!-- <div>
			<div style="padding:5px 0 5px 8px;color:black;font-size:13px;float:left;">
				楼盘名称： <input id=""style="width:100px">
			</div>
			<div style="padding:5px 0 0 31px;color:black;font-size:13px;float:left;">
				楼栋： <input id="" style="width:100px">
			</div>
			<div style="padding:5px 0 0 17px;color:black;font-size:13px;float:left;">
				门牌号： <input id="" style="width:100px">
			</div>
		</div> -->
		<table id="houseDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="pbhHouseAddress" width="20" align="center">房屋</th>
				</tr>
			</thead>
		</table>
		<div id="housePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 出租单元-->
	<div style="width:40%;float:left;">
		<a class="easyui-linkbutton" iconCls="icon-fabu" plain="true" onclick="pushRentUnitDlg()">发布出租单元</a>
		<a class="easyui-linkbutton" iconCls="icon-bianji" plain="true" onclick="updatePushRentUnitDlg()">更新出租单元</a>
		<a class="easyui-linkbutton" iconCls="icon-shangjia" plain="true" onclick="updatePaymentDlg()">更新价格</a>
		<a class="easyui-linkbutton" iconCls="icon-shangjia" plain="true" onclick="updateRentUnitStatus()">上架/下架</a>
		<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="queryRentUnit(1, 0)">刷新</a>
		<div style="clear:both"></div>
		<table id="rentUnitDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="pbruUnitName" width="20" align="center">出租单元</th>
				</tr>
			</thead>
		</table>
		<div id="rentUnitPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 发布状态 -->
	<div style="width:30%;float:left;margin-top:26px;">
		<table id="houseStatusDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="pbhsAuditStatus" width="20" align="center" formatter="approvalStatus">审核状态</th>
					<th field="pbhsOnoffStatus" width="20" align="center" formatter="upperAndLowerShelfStatus">上下架状态</th>
					<th field="pbhsProblemStatus" width="20" align="center" formatter="problemListing">问题房源</th>
				</tr>
			</thead>
		</table>
		<div id="houseStaterPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 发布房屋 -->
	<div id="pushHouseDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment('public', 'pushHouse')">上传及查看图片</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div style="display:none">
			商户品牌Code：<input id="brandCode" clear="clear">
			城市代码:<input id="cityCode" clear="clear">
			第三方小区id：<input id="thirdResblockId" clear="clear">
			贝壳小区id：<input id="resblockId" clear="clear">
			接入系统委托编号：<input id="thirdHouseCode" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			选择房源：<input id="bindAddress" style="width:265px;cursor:pointer;" readonly onclick="chooseHouseForStore(1)" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			出租类型：<select id="rentType" style="width:100px" require="require" choose="choose">
				<option value="0"></option>
				<option value="1">整租</option>
				<option value="2">合租</option>
			  </select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城市：<input id="cityName" style="width:100px;" require="require" clear="clear" onblur="queryCityCode()">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城区：<input id="thirdDistrictName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属商圈：<input id="thirdBizcircleName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属小区：<input id="thirdResblockName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			小区详细地址：<input id="resblockAddress" style="width:150px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			楼栋名：<input id="houseBuildingName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			单元名：<input id="houseUnitName" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			门牌号：<input id="houseNo" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			楼层：<input id="floor" style="width:100px" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			总楼层：<input id="totalFloor" style="width:150px" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			面积：<input id="houseArea" style="width:100px" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			朝向：<select id="face" style="width:100px;" require="require" choose="choose">
				<option value="0">未知</option>
				<option value="1">东</option>
				<option value="2">西</option>
				<option value="4">南</option>
				<option value="8">北</option>
				<option value="5">东南</option>
				<option value="9">东北</option>
				<option value="6">西南</option>
				<option value="10">西北</option>
			</select>
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			车位：<select style="width:100px" id="parking" require="require" choose="choose">
			  	<option value="0">未知</option>
			  	<option value="1">有免费车位</option>
			  	<option value="2">有可租车位</option>
			  	<option value="3">无车位</option>
			  </select>
		</div>
		<div style='margin:5px 0 0 29px; float:left;' >
			装修：<select style="width:100px" id="decoration" require="require" choose="choose">
				<option value="0">未知</option>
				<option value="1">毛坯</option>
				<option value="2">简装</option>
				<option value="3">精装修</option>
			</select>
		</div>
		<div style='margin:5px 0 0 53px;float:left;'>
			供暖：<select style="width:150px" id="heating" require="require" choose="choose">
				<option value="0">未知</option>
				<option value="1">自采暖</option>
				<option value="2">集中供暖</option>
				<option value="3">无需供暖</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			户型结构：<select style="width:100px" id="houseStructure" require="require" choose="choose">
				<option value="0">未知</option>
				<option value="1">平层</option>
				<option value="2">跃层</option>
				<option value="3">复式</option>
				<option value="4">错层</option>
				<option value="5">LOFT</option>
				<option value="6">跃复一体</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			是否改造：<select style="width:100px" id="transformState" require="require" choose="choose">
				<option value="0">未改造</option>
				<option value="1">已改造</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			原始户型：<input id="roomNum" style="width:35px;" require="require" clear="clear"> 室
			<input id="hallNum" style="width:35px;" require="require" clear="clear"> 厅
			<input id="kitchenNum" style="width:35px;" require="require" clear="clear"> 厨
			<input id="toiletNum" style="width:35px;" require="require" clear="clear"> 卫
		</div>
		<div id="transformationDiv" style='margin:5px 0 0 20px;float:left;display:none'>
			改后户型：<input id="transformRoomNum" style="width:35px;" clear="clear"> 室
			<input id="transformHallNum" style="width:35px;" clear="clear"> 厅
			<input id="transformKitchenNum" style="width:35px;" clear="clear"> 厨
			<input id="transformToiletNum" style="width:35px;" clear="clear"> 卫
		</div>
		<div style="clear:both;"></div>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doPushHouse()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#pushHouseDlg').dialog('close')">关闭</a>
		</div>
	</div>
	
	<!-- 更新房屋 -->
	<div id="updatePushHouseDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<!-- <div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment('public', 'pushHouse')">上传及查看图片</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div> -->
		<div style="display:none">
			城市代码:<input id="cityCode2" clear="clear">
			第三方小区id：<input id="thirdResblockId2" clear="clear">
			贝壳小区id：<input id="resblockId2" clear="clear">
			接入系统委托编号：<input id="thirdHouseCode2" clear="clear">
			发布房屋时返回的房源code：<input id="houseCode2" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			选择房源：<input id="bindAddress2" style="width:265px;" clear="clear" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			出租类型：<select id="rentType2" style="width:100px" require="require" choose="choose" disabled="disabled">
				<option value="0"></option>
				<option value="1">整租</option>
				<option value="2">合租</option>
			  </select>
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城市：<input id="cityName2" style="width:100px;" clear="clear" disabled="disabled">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属城区：<input id="thirdDistrictName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属商圈：<input id="thirdBizcircleName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			所属小区：<input id="thirdResblockName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			小区详细地址：<input id="resblockAddress2" style="width:150px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			楼栋名：<input id="houseBuildingName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			单元名：<input id="houseUnitName2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px;float:left;'>
			门牌号：<input id="houseNo2" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			楼层：<input id="floor2" style="width:100px" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			总楼层：<input id="totalFloor2" style="width:150px" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			面积：<input id="houseArea2" style="width:100px" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			朝向：<select id="face2" style="width:100px;" require="require" choose="choose">
				<option value="0">未知</option>
				<option value="1">东</option>
				<option value="2">西</option>
				<option value="4">南</option>
				<option value="8">北</option>
				<option value="5">东南</option>
				<option value="9">东北</option>
				<option value="6">西南</option>
				<option value="10">西北</option>
			</select>
		</div>
		<div style='margin:5px 0 0 29px;float:left;'>
			车位：<select style="width:100px" id="parking2" require="require" choose="choose">
			  	<option value="0">未知</option>
			  	<option value="1">有免费车位</option>
			  	<option value="2">有可租车位</option>
			  	<option value="3">无车位</option>
			  </select>
		</div>
		<div style='margin:5px 0 0 29px; float:left;' >
			装修：<select style="width:100px" id="decoration2" require="require" choose="choose">
				<option value="0">未知</option>
				<option value="1">毛坯</option>
				<option value="2">简装</option>
				<option value="3">精装修</option>
			</select>
		</div>
		<div style='margin:5px 0 0 53px;float:left;'>
			供暖：<select style="width:150px" id="heating2" require="require" choose="choose">
				<option value="0">未知</option>
				<option value="1">自采暖</option>
				<option value="2">集中供暖</option>
				<option value="3">无需供暖</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			户型结构：<select style="width:100px" id="houseStructure2" require="require" choose="choose">
				<option value="0">未知</option>
				<option value="1">平层</option>
				<option value="2">跃层</option>
				<option value="3">复式</option>
				<option value="4">错层</option>
				<option value="5">LOFT</option>
				<option value="6">跃复一体</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			是否改造：<select style="width:100px" id="transformState2" require="require" choose="choose">
				<option value="0">未改造</option>
				<option value="1">已改造</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;float:left;'>
			原始户型：<input id="roomNum2" style="width:35px;" require="require" clear="clear"> 室
			<input id="hallNum2" style="width:35px;" require="require" clear="clear"> 厅
			<input id="kitchenNum2" style="width:35px;" require="require" clear="clear"> 厨
			<input id="toiletNum2" style="width:35px;" require="require" clear="clear"> 卫
		</div>
		<div id="transformationDiv2" style='margin:5px 0 0 20px;float:left;display:none'>
			改后户型：<input id="transformRoomNum2" style="width:35px;" clear="clear"> 室
			<input id="transformHallNum2" style="width:35px;" clear="clear"> 厅
			<input id="transformKitchenNum2" style="width:35px;" clear="clear"> 厨
			<input id="transformToiletNum2" style="width:35px;" clear="clear"> 卫
		</div>
		<div style="clear:both;"></div>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdatePushHouse()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updatePushHouseDlg').dialog('close')">关闭</a>
		</div>
	</div>
	
	<!-- 发布出租单元 -->
	<div id="pushRentUnitDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="padding:5px 0 5px 5px;">
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="openAttachment('public', 'pushRentUnit')">上传及查看图片</a>
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
		</div>
		<div style="display:none">
			发布房屋时返回的房源code：<input id="houseCode" clear="clear">
			第三方出租单元编号：<input id="thirdRentUnitCode" clear="clear">
			房间名称：<input id="roomName" clear="clear">
		</div>
		<div id="bindAddress2Div" style='margin:5px 0 0 5px; float:left;'>
			选择房源：<input id="bindAddress2" style="width:265px;cursor:pointer;" readonly onclick="chooseHouseForStore(2)" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px; float:left;'>
			房间类型：<select id="roomType">
				<option value="0">未知</option>
				<option value="1">主卧</option>
				<option value="2">次卧</option>
				<option value="3">隔断</option>
			</select>
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			朝向：<select id="face" style="width:100px;">
				<option value="0">未知</option>
				<option value="1">东</option>
				<option value="2">西</option>
				<option value="4">南</option>
				<option value="8">北</option>
				<option value="5">东南</option>
				<option value="9">东北</option>
				<option value="6">西南</option>
				<option value="10">西北</option>
			</select>
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			面积：<input id="area" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			可入住时间：<input id="liveTime" onfocus="WdatePicker({autoPickDate:true})" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			可看房时间：<select id="lookTime">
				<option value="0">未知</option>
				<option value="1">可随时看房</option>
				<option value="2">下班后可看房</option>
				<option value="3">提前预约可看房</option>
				<option value="4">只能周末看房</option>
				<option value="5">内有租户，需要预约</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			最短租期：<input id="minLease" style="width:88px;" require="require" clear="clear">月
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			最长租期：<input id="maxLease" style="width:88px;" require="require" clear="clear">月
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			首次出租：<select id="isFirstRent" style="width:100px;">
				<option value="0">否</option>
				<option value="1">是</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			独立卫生间：<select id="independentToilet">
				<option value="9">未知</option>
				<option value="0">无</option>
				<option value="1">有</option>
			</select>
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			独立阳台：<select id="independentBalcony">
				<option value="9">未知</option>
				<option value="0">无</option>
				<option value="1">有</option>
			</select>
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			窗类型：<select id="window">
				<option value="0">未知</option>
				<option value="1">无窗</option>
				<option value="2">内窗</option>
				<option value="3">外窗</option>
			</select>
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			隔断类型：<select id="roomPartition">
				<option value="9">未知</option>
				<option value="0">非隔断间</option>
				<option value="1">隔断间</option>
			</select>
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			联系人：<input id="contacts"  require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			联系电话：<input id="phone"  require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			经营状态：<select id="manageStatus" style="width:100px;">
				<option value="0">已出租</option>
				<option value="1">待出租</option>
				<option value="2">不可租</option>
				<option value="3">配置中</option>
				<option value="4">已预订</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			付款方式：<select id="payType">
				<option value="0">未知</option>
				<option value="1">月付</option>
				<option value="2">季付</option>
				<option value="3">半年付</option>
				<option value="4">年付</option>
				<option value="5">双月付</option>
			</select>
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			押金类型：<select id="depositType">
				<option value="-1">未知</option>
				<option value="0">无押金</option>
				<option value="1">压一</option>
				<option value="2">压二</option>
				<option value="3">压三</option>
				<option value="4">自定义</option>
			</select>
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			押金：<input id="depositCash" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			租金：<input id="rentCash" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			中介费：<input id="agencyFee" style="width:100px;" require="require" clear="clear">
		</div>
		<div style="clear:both;"></div>
		<div style='margin:5px 0 0 17px; float:left;'>
			服务费：<input id="fee" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			服务费单位：<select id="feeUnit" >
				<option value="1">元/天</option>
				<option value="2">元/月</option>
				<option value="3">元/年</option>
				<option value="4">元(一次收取)</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="serviceContent">
			<div style="margin:5px 0 5px 0;">服务内容：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="1">免费维修</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="2">免费保洁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="3">免费宽带</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="4">公区卫生费</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="5">公区水电费</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="6">其他</button>
			<input id="otherContent" style="margin-top:-5px;width:200px;" placeholder="其他服务内容，选择其他时必填">
		</div>
		<div id="tenantRequest">
			<div style="margin:5px 0 5px 0;">租客要求：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="unknown">无要求</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="single">单身</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="only_woman">仅限女生</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="only_man">仅限男生</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="family_first">一家人优先</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="neat_first">爱干净</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="no_smoking">不吸烟</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="no_pet">不养宠物</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="no_baby">没有小宝宝</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="other">其他</button>
		</div>
		<div id="facilities">
			<div style="margin:5px 0 5px 0;">房屋设施：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="intelligent_lock">智能锁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="bed">床</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="wardrobe">衣柜</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="desk">书桌</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="telephone">固话</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="heating">暖气</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="natural_gas">天然气</button>
			<div style="clear:both"></div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="wifi">宽带</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="television">电视</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="refrigerator">冰箱</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="washing_machine">洗衣机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="air_conditioner">空调</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="water_heater">热水器</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="microwave_oven">微波炉</button>
		</div>
		<div style='margin:5px 0 0 0;'>
			<div style='margin:5px 0 0 5px;'>
				<div>房间描述：</div>
				<textarea id="description" style="margin:5px 0 0 0;width:900px;height:80px;" require="require" clear="clear"></textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doPushRentUnit()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#pushRentUnitDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<!-- 更新出租单元 -->
	<div id="updatePushRentUnitDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="display:none">
			发布出租单元时时返回的出租单元code：<input id="rentUnitCode3" clear="clear">
			第三方出租单元编号：<input id="thirdRentUnitCode3" clear="clear">
			房间名称：<input id="roomName3" clear="clear">
			封面：<input id="coverImage3" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style='margin:5px 0 0 5px; float:left;'>
			房间类型：<select id="roomType3">
				<option value="0">未知</option>
				<option value="1">主卧</option>
				<option value="2">次卧</option>
				<option value="3">隔断</option>
			</select>
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			朝向：<select id="face3" style="width:100px;">
				<option value="0">未知</option>
				<option value="1">东</option>
				<option value="2">西</option>
				<option value="4">南</option>
				<option value="8">北</option>
				<option value="5">东南</option>
				<option value="9">东北</option>
				<option value="6">西南</option>
				<option value="10">西北</option>
			</select>
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			面积：<input id="area3" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			可入住时间：<input id="liveTime3" onfocus="WdatePicker({autoPickDate:true})" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			可看房时间：<select id="lookTime3">
				<option value="0">未知</option>
				<option value="1">可随时看房</option>
				<option value="2">下班后可看房</option>
				<option value="3">提前预约可看房</option>
				<option value="4">只能周末看房</option>
				<option value="5">内有租户，需要预约</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			最短租期：<input id="minLease3" style="width:88px;" require="require" clear="clear">月
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			最长租期：<input id="maxLease3" style="width:88px;" require="require" clear="clear">月
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			首次出租：<select id="isFirstRent3" style="width:100px;">
				<option value="0">否</option>
				<option value="1">是</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			独立卫生间：<select id="independentToilet3">
				<option value="9">未知</option>
				<option value="0">无</option>
				<option value="1">有</option>
			</select>
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			独立阳台：<select id="independentBalcony3">
				<option value="9">未知</option>
				<option value="0">无</option>
				<option value="1">有</option>
			</select>
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			窗类型：<select id="window3">
				<option value="0">未知</option>
				<option value="1">无窗</option>
				<option value="2">内窗</option>
				<option value="3">外窗</option>
			</select>
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			隔断类型：<select id="roomPartition3">
				<option value="9">未知</option>
				<option value="0">非隔断间</option>
				<option value="1">隔断间</option>
			</select>
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			联系人：<input id="contacts3"  require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			联系电话：<input id="phone3"  require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 17px; float:left;'>
			经营状态：<select id="manageStatus3" style="width:100px;">
				<option value="0">已出租</option>
				<option value="1">待出租</option>
				<option value="2">不可租</option>
				<option value="3">配置中</option>
				<option value="4">已预订</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div id="serviceContent3">
			<div style="margin:5px 0 5px 0;">服务内容：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="1">免费维修</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="2">免费保洁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="3">免费宽带</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="4">公区卫生费</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="5">公区水电费</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="6">其他</button>
			<input id="otherContent3" style="margin-top:-5px;width:200px;" placeholder="其他服务内容，选择其他时必填">
		</div>
		<div id="tenantRequest3">
			<div style="margin:5px 0 5px 0;">租客要求：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="unknown">无要求</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="single">单身</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="only_woman">仅限女生</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="only_man">仅限男生</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="family_first">一家人优先</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="neat_first">爱干净</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="no_smoking">不吸烟</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="no_pet">不养宠物</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="no_baby">没有小宝宝</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="other">其他</button>
		</div>
		<div id="facilities3">
			<div style="margin:5px 0 5px 0;">房屋设施：</div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="intelligent_lock">智能锁</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="bed">床</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="wardrobe">衣柜</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="desk">书桌</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="telephone">固话</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="heating">暖气</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="natural_gas">天然气</button>
			<div style="clear:both"></div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="wifi">宽带</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="television">电视</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="refrigerator">冰箱</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="washing_machine">洗衣机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="air_conditioner">空调</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="water_heater">热水器</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="microwave_oven">微波炉</button>
		</div>
		<div style='margin:5px 0 0 0;'>
			<div style='margin:5px 0 0 5px;'>
				<div>房间描述：</div>
				<textarea id="description3" style="margin:5px 0 0 0;width:900px;height:80px;" require="require" clear="clear"></textarea>
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdatePushRentUnit()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updatePushRentUnitDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<!-- 更新出租单元 -->
	<div id="updatePaymentDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 0 17px; float:left;'>
			付款方式：<select id="payType3">
				<option value="0">未知</option>
				<option value="1">月付</option>
				<option value="2">季付</option>
				<option value="3">半年付</option>
				<option value="4">年付</option>
				<option value="5">双月付</option>
			</select>
		</div>
		<div style="clear:both;"></div>
		<div style='margin:5px 0 0 17px; float:left;'>
			押金类型：<select id="depositType3">
				<option value="-1">未知</option>
				<option value="0">无押金</option>
				<option value="1">压一</option>
				<option value="2">压二</option>
				<option value="3">压三</option>
				<option value="4">自定义</option>
			</select>
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			押金：<input id="depositCash3" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 41px; float:left;'>
			租金：<input id="rentCash3" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			中介费：<input id="agencyFee3" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 29px; float:left;'>
			服务费：<input id="fee3" style="width:100px;" require="require" clear="clear">
		</div>
		<div style='margin:5px 0 0 5px; float:left;'>
			服务费单位：<select id="feeUnit3">
				<option value="1">元/天</option>
				<option value="2">元/月</option>
				<option value="3">元/年</option>
				<option value="4">元(一次收取)</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdatePayment()">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updatePaymentDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<div id="updateRentUnitStatusDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 0 5px;text-align: center;">
			发布状态：<select id="onoff" onchange="checkOnoff()">
				<option value="0">下架</option>
				<option value="1">上架</option>
			</select>
		</div>
		<div style='margin:5px 0 0 5px;text-align: center;' id="onoffReasonDiv">
			下架原因：<select id="onoffReason">
				<option value="1">已出租</option>
				<option value="2">已预定</option>
				<option value="3">配置中</option>
				<option value="4">不可租</option>
				<option value="5">不可租（故障/政策影响）</option>
				<option value="7">其他</option>
				<option value="8">编辑房源</option>
			</select>
		</div>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" onclick="doUpdateRentUnitStatus()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateRentUnitStatusDlg').dialog('close')">关闭</a>
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
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/upload.js"></script><!-- upload.js要先于fg.beikePushHouse.js，uploadAttachment函数有重写 -->
	<script src="js/fg.beikePushHouse.js"></script>
	<script src="js/fg.beikePushHouseUpload.js"></script>
</body>
</html>
<!-- <div id="infrastructure">
	<div style="margin:5px 0 5px 0;">基础设施：</div>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="elevator">电梯</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="metro">地铁</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="store">便利店/超市</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="park">停车场</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="gym">健身房</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="place">活动场地</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="monitoring">安全监控</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="bookBar">书吧</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="barCounter">吧台</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="leisureArea">休闲区</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="billiardsArea">桌球区</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="dinnerBar">DIY餐吧</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="laundry">洗衣房</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="tableFootball">桌上足球</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="skyGarden">空中花园</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="restArea">休息区</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="avAone">影音区</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="reception">前台</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="receptionArea">会客区</button>
	<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="danceRoom">舞蹈室</button>
</div> -->