<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="uploadDlg" class="easyui-dialog" data-options="closed:true" style="background-color:#fafafa;">
	<div class="page-body">
		<div id="uploader" class="uploader-body">
			<div class="queueList">
				<div id="dndArea" class="placeholder clearfix" style="width:275px;margin: 0 auto;">
					<div id="qrcode" style="width:120px;height:120px;float:left;"></div>
					<div id="filePicker" style="width:120px;height:120px;margin: 0 0 0 30px;float:left;"><div style="margin:85px 0 0 0;">上传</div></div>
					<div style="width:120px;font-size:14px;color:#333;">使用微信扫描二维码（5分钟内有效）即可上传图片</div>
				</div>
			</div>
			<div class="statusBar" style="display:none;">
				<div class="progress">
					<span class="text">0%</span>
					<span class="percentage"></span>
				</div><div class="info"></div>
				<div class="btns">
					<div id="filePicker2"></div><div class="uploadBtn">开始上传</div>
				</div>
			</div>
		</div>
	</div>

	<input type="hidden" clear=true id="token">
	<input type="hidden" clear=true id="co">
	<input type="hidden" clear=true id="att">
	<input type="hidden" clear=true id="att2">
	<input type="hidden" clear=true id="eaId">
	<input type="hidden" clear=true id="handlerId">
	<input type="hidden" clear=true id="handlerName">
	<input type="hidden" clear=true id="jrlId">
	<input type="hidden" clear=true id="jrrId">
	<input type="hidden" clear=true id="rcoId">
	<input type="hidden" clear=true id="nrcId">
	<input type="hidden" clear=true id="repId">
	<input type="hidden" clear=true id="variablesId">
	<input type="hidden" clear=true id="hsId">
	<input type="hidden" clear=true id="saId">
	<input type="hidden" clear=true id="supId">
	<input type="hidden" clear=true id="userName">
	<input type="hidden" clear=true id="userId">
	<input type="hidden" clear=true id="fileId">
	<input type="hidden" clear=true id="jciId">
	<input type="hidden" clear=true id="userCoding"><!--上传人id-->
	<input type="hidden" clear=true id="id">
	<input type="hidden" clear=true id="cgsuId">
	<input type="hidden" clear=true id="type">
	<input type="hidden" clear=true id="jsrsuId">
	<input type="hidden" clear=true id="houseCoding">
</div>