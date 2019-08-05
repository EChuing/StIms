<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="_hs_imgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<div style="padding:5px 0 0 10px;">
		<a class="easyui-linkbutton" plain="true" iconCls="icon-diannao" onclick="upload_hs_img()">上传</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-shanchutupian" onclick="remove_hs_img()">删除</a>
		<a class="easyui-linkbutton" plain="true" iconCls="icon-shuaxin" onclick="refresh_hs_img()">刷新</a>
		<span id="_hs_imgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
	</div>
	<div id="_hs_title" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
	<div style="clear:both"></div>
	<left>
		<div id='_hs_btn' style='margin:10px 0 0 10px;display:none;'>
			<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemove_hs_img()">删除</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel_hs_img()">取消</a>
		</div>
	</left>
	<div id="_hs_imgWrapper" style="margin:10px 0 0 10px;"></div>
	
	
</div>