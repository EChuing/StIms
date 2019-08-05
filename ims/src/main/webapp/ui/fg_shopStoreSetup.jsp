<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
	<head>
		<meta charset="utf-8">
		<title>商品管理</title>
		<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
		<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
		<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
		<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
		<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
		<link href="css/upload.css" rel="stylesheet">
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
		<script src="https://unpkg.com/wangeditor@3.1.1/release/wangEditor.min.js"></script>
		<script src="js/config.js"></script>
	</head>
  
  <body>
    	
		<div style="margin:10px 0 0 20px;float:left">
			起送金额:<input type="number" data-type="money" id="cgsuGisongjine" style="width:100px" />
		</div>
		<div style="margin:10px 0 0 20px;float:left">
			配送费用:<input type="number" data-type="money" id="cgsuShippingFee" style="width:100px" />
		</div>
		<div style="margin:10px 0 0 20px;float:left">
			允许欠结:<select id="cgsuOweState">
				<option value="1">允许</option>
				<option value="0">不允许</option>
			</select>
		</div>
		<div style="margin:10px 0 0 20px;float:left">
			最大欠结:<input type="number" data-type="money" id="cgsuOweMax" style="width:100px" />
		</div>
		<div style="margin:10px 0 0 20px;float:left">
			商店名字:<input id="cgsuShopName" style="width:100px" />
		</div>
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 20px;float:left">
			满减运费:<input type="number" data-type="money" id="cgsuFreeShippingFeeNum" style="width:100px" />
		</div>
		<div style="margin:10px 0 0 20px;float:left">
			广告图片:<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic()">上传及查看图片</a>
		</div>
		<div style="margin:10px 0 0 20px;float:left">
			执照图片:<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic1()">上传及查看图片</a>
		</div>
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 20px;float:left">
			营业时间:<input id="cgsuBeginTime" type="time" style="width:100px" /> 
		</div>
		<div style="margin:10px 0 0 20px;float:left">
			到 <input id="cgsuEndTime" type="time" style="width:100px" />
		</div>
		<div style="margin:10px 0 0 20px;float:left">
			营业状态: <select id="cgsuState">
				<option value="1">营业中</option>
				<option value="0">停业中</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<fieldset class="clearfix" id="cgsuShopAccount" style="width:30%;float:left;margin:10px 0 0 40px;">
			<legend>
				<font style='font-size: 18px;font-family: ' 微软雅黑 ';' color='#50B4D2'>新零售商户平台结算账户</font>
			</legend>
			<div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
				<input style="display:none" class="accountId">
				<div style="margin:5px 0 0 5px;float:left;">
					收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
					</select>
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>
					账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
					</select>
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 5px;float: left;'>
					账户号码：<input style="width:150px" class="accountNum" readonly>
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>
					账户归属：<input style="width:150px" class="accountBelong" readonly>
				</div>
			</div>
		</fieldset>
		<fieldset class="clearfix" id="cgsuCashAccount" style="width:30%;float:left;margin:10px 0 0 100px;">
			<legend>
				<font style='font-size: 18px;font-family: ' 微软雅黑 ';' color='#50B4D2'>新零售商户现金账户</font>
			</legend>
			<div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
				<input style="display:none" class="accountId">
				<div style="margin:5px 0 0 5px;float:left;">
					收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
					</select>
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>
					账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
					</select>
				</div>
				<div style="clear:both"></div>
				<div style='margin:5px 0 0 5px;float: left;'>
					账户号码：<input style="width:150px" class="accountNum" readonly>
				</div>
				<div style='margin:5px 0 0 5px;float: left;'>
					账户归属：<input style="width:150px" class="accountBelong" readonly>
				</div>
			</div>
		</fieldset>
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 20px;float:left;width:325px;">
			<div style="font-size:15px;margin:0 0 0 100px">文字轮播<img src="img/add.png" onclick="addInput('ad')" style="height:20px;width:20px;margin: 0px 0 -4px 10px" /></div>
			<div id="ad" style="margin:0px 0 0 0 ">
				<div style="margin:0 0 0 0px"><input class="adFontItem" value="" style="width:280px;margin:10px 0 0 0" /></div>
				<div style="margin: 10px 0 0 0px"><input class="adFontItem" value="" style="width:280px;" /><img src="img/minus.png" style="height:20px;width:20px;margin: 0px 0 -5px 10px" /></div>
			</div>
		</div>
		<div style="margin:10px 0 0 20px;float:left;width:325px;">
			<div style="font-size:15px;margin:0 0 0 100px">送货小区<img src="img/add.png" onclick="addInput('address')" style="height:20px;width:20px;margin: 0px 0 -4px 10px" /></div>
			<div id="address" style="margin:0px 0 0 0 ">
			</div>
		</div>
		<div style="clear:both"></div>
		<center style="margin:15px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="updateShopSetUp()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#shopSetUpDlg').dialog('close')">取消</a>
		</center>
		<div id="shopImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
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
	<script src="js/fg.public.js"></script>
	<script src="js/fg_shopStoreSetup.js"></script>
  </body>
</html>
