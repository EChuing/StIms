<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="renterRenewalImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<div style="padding:5px 0 0 10px;">
		<a class="easyui-linkbutton" iconCls="icon-upload" plain="true"
			onclick="uploadRentCont()">上传</a>
		<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true"
			onclick="removeRenterContract()">选择删除</a>
		<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true"
			onclick="refreshRent()">刷新</a>
		<span id="imageNumRent" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
	</div>
	<div style="clear:both"></div>
	<left>
		<div id='doRemoveRentPic' style='margin:10px 0 0 10px;display:none;'>
			<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemoveRent()">删除</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancelRent()">取消</a>
	</div>
	</left>
	<div id="removeRentPicture" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
	<div id="imgWrapperRent" style="margin:10px 0 0 10px;"></div>
</div>