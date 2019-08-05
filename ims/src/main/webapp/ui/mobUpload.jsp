<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ page import="com.zz.po.journal.JournalQrcode" %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>附件上传</title>
    <link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
    <link href="../ui/css/upload.css" rel="stylesheet">
    <style>
		.form-group {
		    margin-bottom: 15px;
		}
		label {
		    display: inline-block;
		    max-width: 100%;
		    margin-bottom: 5px;
		    font-weight: 700;
		}
		.form-control {
		    display: block;
		    width: 90%;
		    height: 34px;
		    padding: 6px 12px;
		    font-size: 14px;
		    line-height: 1.42857143;
		    color: #555;
		    background-color: #fff;
		    background-image: none;
		    border: 1px solid #ccc;
		    border-radius: 4px;
		    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
		    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		}
		#uploader .placeholder {
			padding-top:115px;
		}
    </style>
</head>
	<div id="fileTagShow" style="display:none;">
		<div class="form-group">
		  	<label for="fileTag">标签名：</label>
		  	<input class="form-control" id="fileTag" placeholder="可选" clear="clear">
		</div>
	</div>
	<div class="page-body">
		<div class="container">
			<div id="uploader" class="uploader-body">
				<div class="queueList">
					<div id="dndArea" class="placeholder clearfix" style="width:125px;margin: 0 auto;">
						<div id="filePicker" style="width:120px;height:120px;float:left;"><div style="margin:85px 0 0 0;">选择图片</div></div>
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
	</div>
	
    <input id="token" type="hidden" value="${qrcode.token}">
	<input id="co" type="hidden" value="${qrcode.co}">
	<input id="qr" type="hidden" value="${qrcode.qr}">
	<input id="jrlId" type="hidden" value="${qrcode.jrlId}">
	<input id="jrrId" type="hidden" value="${qrcode.jrrId}">
	<input id="att" type="hidden" value="${qrcode.att}">
	<input id="att2" type="hidden" value="${qrcode.att2}">
	<input id="eaId" type="hidden" value="${qrcode.eaId}">
	<input id="fileTag" type="hidden" value="${qrcode.fileTag}">
	<input id="fileUser" type="hidden" value="${qrcode.fileUser}">
	<input id="saId" type="hidden" value="${qrcode.saId}">
	<input id="handlerId" type="hidden" value="${qrcode.handlerId}">
	<input id="handlerName" type="hidden" value="${qrcode.handlerName}">
	<input id="rcoId" type="hidden" value="${qrcode.rcoId}">
	<input id="nrcId" type="hidden" value="${qrcode.nrcId}">
	<input id="repId" type="hidden" value="${qrcode.repId}">
	<input id="variablesId" type="hidden" value="${qrcode.variablesId}">
	<input id="hsId" type="hidden" value="${qrcode.hsId}">
	<input id="supId" type="hidden" value="${qrcode.supId}">
	<input id="userName" type="hidden" value="${qrcode.userName}">
	<input id="userId" type="hidden" value="${qrcode.userId}">
	<input id="fileId" type="hidden" value="${qrcode.fileId}">
	<input id="jciId" type="hidden" value="${qrcode.jciId}">
	<input id="userCoding" type="hidden" value="${qrcode.userCoding}">
	<input id="id" type="hidden" value="${qrcode.id}">
	<input id="cgsuId" type="hidden" value="${qrcode.cgsuId}">
	<input id="type" type="hidden" value="${qrcode.type}">
	<input id="jsrsuId" type="hidden" value="${qrcode.jsrsuId}">
	<input id="subId" type="hidden" value="${qrcode.subId}">
	<input id="dnId" type="hidden" value="${qrcode.dnId}">
	<input id="houseCoding" type="hidden" value="${qrcode.houseCoding}">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="../ui/js/mobUpload.js"></script>
</body>
</html>