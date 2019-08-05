<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
	<head>
		<meta charset="utf-8">
		<title>优惠方案</title>
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
		<script src="js/fg_shopConcessionScheme.js"></script>
	</head>
  
  <body>
  	<!-- 优惠方案 -->
    
		<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" style="margin:5px 0 0 10px"  onclick="openDiscountOpreation(1)">添加优惠方案</a>
		<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" style="margin:5px 0 0 10px"  onclick="startAndEndPlan(1)">启用</a>
		<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" style="margin:5px 0 0 10px"  onclick="startAndEndPlan(0)">停用</a>
		<a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" style="margin:5px 0 0 10px"  onclick="startAndEndPlan(2)">删除</a>
		<div id="discountGrid" style="width:100%;margin:0.5% 0 0 0%" >
			<table id="discountDg" style="width:100%;height:600px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
				data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="cgdName" width="15" align="center">方案名称</th>
						<th field="categoryName" width="10" align="center">优惠品类</th>
						<th field="cgdType" width="10" align="center">方案类型</th>
						<th field="cgdDescribe" width="20" align="center">方案描述</th>
						<th field="state" width="10" align="center">方案状态</th>
						<th field="cgdRegisterTime" width="15" align="center">登记时间</th>
					</tr>
				</thead>
			</table>
			<div id="checkGoodsPageDiv" style="width:99%;text-align:center;"></div>
		</div>

	<!-- 添加 修改 优惠方案详情 -->
	<div id="discountOpreationDlg" class="easyui-dialog" data-options="closed:true">
		<input type="hidden" id="cgdId" />
		<div style="margin:20px 0 0 30px">
			名称方案：<input  id="discountName" style="width:200px;border-left:0px;border-top:0px;border-right:0px;" clean="clean" />
		</div>
		<div style="margin:10px 0 0 30px">
			优惠类型：<select id="discountType" onchange="checkDiscountType()" style="width:200px;" clean="clean">
				<option></option>
				<option value="通用满减">通用满减</option>
				<option value="优惠满减">优惠满减</option>
				<option value="品类满减">品类满减</option>
			</select>
		</div>
		<div id="discountCategory" style="margin:10px 0 0 30px;display:none">
			选择品类：<select id="discountCategoryId" style="width:200px;" clean="clean"></select>
		</div>
		<div style="margin:10px 0 0 30px">
			方案阶梯：<select id="discountLadder" onchange="changLadder()" style="width:200px;" clean="clean">
				<option></option>
				<option value="1">一级</option>
				<option value="2">二级</option>
				<option value="3">三级</option>
			</select>
		</div>
		<div style="margin:10px 0 0 30px">
			方案描述：<textarea id="describe" style="width:200px;height:50px" clean="clean"></textarea>
		</div>
		<div style="margin:10px 0 0 30px">
			<div>优惠阶梯:</div>
			<div id="ladderDiv"></div>
		</div>
		<center style="margin:30px 0 0 0;">
			<a id="saveDiscountButton" style="display:none"  class="easyui-linkbutton" iconcls="icon-save" onclick="saveDiscount()">保存</a>
			<a id="updateDiscountButton" style="display:none" class="easyui-linkbutton" iconcls="icon-save" onclick="beginUpdateDiscount()">修改</a>
			<a id="doUpdateDiscountButton" style="display:none" class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdate()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#discountOpreationDlg').dialog('close')">取消</a>
		</center>
	</div>
  </body>
</html>
