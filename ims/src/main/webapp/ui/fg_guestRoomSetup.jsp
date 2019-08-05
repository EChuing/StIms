<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>客房设置</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
	
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
  	<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
  	<link href="css/upload.css" rel="stylesheet">
  	<link href="css/contextMenu.css" rel="stylesheet">
  	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
  	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div id="setUpDlg" style="padding:6px;">
		<input type="hidden" id="jsrsuAdImgs">
		<div style="float:left;margin:10px 0 0 16px">
			入住时间：<input type="time"  id="jsrsuCheckInTime" style="width:100px;text-align:center"/>
		</div>
		<div style="float:left;margin:10px 0 0 12px">
			退房时间：<input type="time"  id="jsrsuCheckOutTime" style="width:100px;text-align:center"/>
		</div>
		<div style="float:left;margin:10px 0 0 12px">
			对外简称：<input type="text"  id="jsrsuWxgzhTitle" style="width:100px;text-align:center"/>
		</div>
		<div style="float:left;margin:10px 0 0 12px">
			线上下单：<select id="jsrsuState">
				<option value="1">是</option>
				<option value="0">否</option>
			</select>
		</div>			
		<!-- 公众号的交易 -->
		<div style="clear:both"></div>
		<div style="float:left;margin:0 0 0 16px;width:90%;">
			<h3 style="font-size: 15px;color:black;">交易规则</h3>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:0 0 0 16px">
			预定方式：<input type="text"  id="jsrsuPredeterminedMode" style="width:200px;text-align:center"/>
		</div>
		<div style="float:left;margin:0 0 0 12px">
			入住天数：<input type="text"  id="jsrsuCheckInMode" style="width:200px;text-align:center"/>
		</div>
		<div style="float:left;margin:0 0 0 12px">
			在线订金比: <input type="text"  id="jsrsuOnlineDepositRatio" style="width:200px;text-align:center"/>
		</div>
		<div style="float:left;margin:0 0 0 12px">
			其他费用：<input type="text"  id="jsrsuOtherExpenses" style="width:200px;text-align:center"/>
		</div>
		<div style="clear:both"></div>
		<div style="float:left;margin:10px 0 0 40px">
			押金：<input type="text"  id="jsrsuTradingDeposit" style="width:200px;text-align:center"/>
		</div>
		<div style="float:left;margin:10px 0 0 36px">
			加客：<input type="text"  id="jsrsuAddGuest" style="width:200px;text-align:center"/>
		</div>
		<div style="float:left;margin:10px 0 0 20px">
			入住须知：<input type="text"  id="jsrsuInstructionsForAdmission" style="width:200px;text-align:center"/>
		</div>
		<div style="float:left;margin:10px 0 0 11px">
			公众号首页顶部广告: <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic()">上传及查看图片</a>
		</div>
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 20px;float:left;width:325px;">
			<div style="font-size:15px;margin:0 0 0 0">房型字段<img src="img/add.png" onclick="addInput('jsrsuRoomType')" style="height:20px;width:20px;margin: 0px 0 -4px 10px" /></div>
			<div id="jsrsuRoomType" style="margin:0px 0 0 0 ">
			</div>
		</div>
		
		<!-- 钟点房规则 -->
		<div style="float:left;">
			<div style="height:20px;padding:0;width:150px;margin: 0">
				<h4 style="margin-left:20px;height:20px;width: 100px">钟点房使用规则</h4>
			</div>
			<div style="float:left;margin:10px 0 0 16px;clear:both">
				使用时间：<input type="time"  id="hourRoomStartTime" style="width:100px;text-align:center"/>--
				--<input type="time"  id="hourRoomEndTime" style="width:100px;text-align:center"/>
			</div>
			<!-- <div style="float:left;margin:10px 0 0 12px">
				退房时间：<input type="time"  id="jsrsuCheckOutTime" style="width:100px;text-align:center"/>
			</div> -->
			<div style="float:left;margin:10px 0 0 12px">
				钟点房：<select id="hourRoom">
					<option value="1">1小时</option>
					<option value="2">2小时</option>
					<option value="3">3小时</option>
					<option value="4">4小时</option>
					<option value="5">5小时</option>
					<option value="6">6小时</option>
				</select>
			</div>
		</div>
		
		
		<div id="addServiceDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<!-- <div id="addServiceDlg" smargin:20px 0 0 0"> -->
		
		<!-- 	<div style="width:300px;height:177px;border:1px solid #95b8e7;margin:20px 0 0 52%;"> -->
				<div  style="width:250px;margin:10px 0 0 10px;">
					服务：<input style="width: 200px;"id="service">
				</div>
				<div  style="width:250px;margin:10px 0 0 10px;">
					金额：<input style="width: 200px;" id="charge" type="number">
				</div>
				<div style="clear:both"></div>
					<center style="margin:25px 0 0 0;">
						<a class="easyui-linkbutton" iconcls="icon-save" onclick="doservice()">保存</a>
						<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addServiceDlg').dialog('close')">关闭</a>
					</center>
			<!-- </div> -->
			
		</div>
		
		<div style="clear:both"></div>
		<div style="float:left;width:99%;height:300px;margin:0 0 0 10px">
			<div style="float:left">
				<h4 style="font-size: 14px;color:black;margin:13px 0 0 6px;">服务消费</h4>
			</div>
			<div style="float:left;margin:0 0 0 10px">
				<a style="float:left;margin:10px 10px 10px 10px" class="easyui-linkbutton" iconcls="icon-add" onclick="addService()">添加</a>
			</div>
			<div style="clear:both"></div>
			<table id="serviceCharge"></table>
			
		<div style="clear:both"></div>
		<center style="margin:25px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doSetUp()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#setUpDlg').dialog('close')">关闭</a>
		</center>
	</div>
	<!-- 上传及查看图片窗口 -->
	<div id="adImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="padding:5px 0 0 10px;">
			<a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadPic()">上传</a>
			<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removePic()">选择删除</a>
			<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refresh()">刷新</a>
		</div>
		<div id="removePicture" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
		<div style="clear:both"></div>
		<left>
			<div id='doRemovePic' style='margin:10px 0 0 10px;display:none;'>
				<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemovePic()">删除</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel()">取消</a>
			</div>
		</left>
		<div id="imgWrapper" style="margin:10px 0 0 10px;"></div>
		
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/upload.js"></script>
	<script src="js/contextMenu.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.guestRoomSetup.js"></script>
</body>
</html>