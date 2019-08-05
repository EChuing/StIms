<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>权限管理</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
	<style type="text/css">
		.checkBoxInput {
			float: left;
			margin: 4px 0 5px 10px
		}
		.checkBoxName {
			float: left;
			margin: 2px 0 5px 5px;
			width: 80px;
		}
		.checkBoxAll {
			width: 100%;
			height: 20px;
			line-height: 20px;
			background: #D2EDFF
		}
		.target-fix {  
		    position: relative;  
		    top: -81px; 
		    display: block;  
		    height: 0;  
		    overflow: hidden;  
		}  
		.dataPurview {
			float:left;
			width:450px;
			margin:0 30px 0 0;
		}
		.operatePurview {
			float:left;
			width:450px;;
		}
		.second-menu {
			font-size: 15px;
			color:#50B4D2;
		}
		.second-menu-select {
			margin:-4px 0 0 0;
		}
		.second-menu-select-all {
			margin:-2px 0 0 0;
		}
	</style>
</head>
<!-- 
	1.更新fg_purview.jsp
		包括数据权限和操作权限
	
		A 	00 	b 	01
		|	|	|	|
		|	|	|	|-第一个数据权限，00的位置是占位符，防止0001解析成1
		|	|	|
		|	|	|-数据权限（a:页面权限	b:数据权限 c:操作权限 值为1代表有权限 值为0代表无权限）
		|	|
		|	|-第一个小菜单的下标
		|
		|-第一个大菜单
		
	2.每个jsp页面
	
		顶部增加
		< %@ page import="com.zz.po.sys.SysUserExpand"%>
		< % SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
		
		body增加
		<input id="loginPurview" type="hidden" value='< %=user.getSpNewPurview()%>'>
		
		可参考fg_dataHouse.jsp
	
	3.更新doPurview.js
	
	4.所有权限页面上必须按顺序来显示，不能缺失。若权限作废，不能直接删除，可采用页面隐藏的方式，或者使用新功能替代之。
		所有权限：页面权限、数据权限、操作权限
		例：
			正确的显示顺序 A00,A01,A02
			错误的显示顺序 A00,A02,A01或A00,A02
		权限作废处理方式1：display:none;
		权限作废处理方式2：使用新功能替代，但要注意用户之前是否就拥有该权限，可写段小脚本清除所有公司所有用户该功能权限
-->
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="width:100%;height:100%;">
		<div class="easyui-layout" data-options="fit:true">
			<div class="easyui-panel" title="现有权限" data-options="region:'west',split:true" style="width:200px;height:100%;">
				<div>
					<a class="easyui-linkbutton" iconCls="icon-add" plain="true" id="addPurviewButton" onclick="addPurview()">新增权限</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a class="easyui-linkbutton" iconCls="icon-cancel" plain="true" id="deletePurviewButton" onclick="deletePurview()">删除权限</a>
				</div>
				<div id="DataGridPurviewInfo" style="width:100%;height:90%">
					<table id="purviewInfoDg" style="width:100%;height:100%;table-layout:fixed;overflow:hidden;"
						data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
						<thead>
							<tr>
								<th field="spName" width="10" align="center">权限名称</th>
							</tr>
						</thead>
					</table>
				</div>
				<div id="purviewHave"></div>
			</div>
			<div class="easyui-panel" title="权限显示" data-options="region:'center'" style="height:100%;">
				<div id="purviewOverDiv" style="position: absolute; z-index: 9999; top: 0px; left: 0px;  
				    width: 100%; height: 100%; background: #000; text-align: center;padding:0px;filter:alpha(opacity=50);   
				    -moz-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;line-height:100%;">
				</div>
				<div id="purviewShow" style="width:100%;height:98%;padding:0px">
					<div style="background:#fff;width:100%;height:90px;position: absolute;padding:5px;border-bottom:1px solid #95B8E7;">
						<div style="height:20px;">
							<div style="margin:0 0 0 12px;float:left;">
								权限名称：<input id="update_spName">
							</div>
							<div style="margin:-4px 0 0 12px;float:left;">
								<a class="easyui-linkbutton" iconCls="icon-save" plain=true id="updatePurviewButton" 
									onclick="updatePurview()">保存修改</a>
							</div>
							<div style="margin:0 0 0 12px;float:left;">
								<input type="checkbox" class="second-menu-select-all" id="getAllPurview">
								勾选所有权限
							</div>
							<div style="clear:both"></div>
						</div>
						<div style="clear:both"></div>
						<!-- 大板块 -->
						<jsp:include page="/ui/public/purviewTop.jsp"></jsp:include>
					</div>
					<div style="clear:both"></div>

					<jsp:include page="/ui/public/purviewSecond.jsp"></jsp:include>
				</div>
			</div>
		</div>
	</div>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.purview.js"></script>
</body>
</html>