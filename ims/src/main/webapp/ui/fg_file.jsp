<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>文件</title>
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/css/webuploader.css">
	<link rel="stylesheet" href="css/upload.css">
    <style>
    	::-webkit-scrollbar{width:6px;height:6px}
		::-webkit-scrollbar-thumb{border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#c3c3c3}
		::-webkit-scrollbar-track{background-color:transparent}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div class="clearfix" style="padding:10px;">
		<button type="button" class="btn btn-info" onclick="upload_file_img()" id="pcUploadButton">上传</button>
		<button type="button" class="btn btn-default" onclick="initFileList()">刷新列表</button>
	</div>
	<div class="form-inline" style="padding:10px 10px 0 10px;">
		<div class="form-group">
			<label for="searchFileName">文件名</label>
			<input class="form-control" id="searchFileName" onkeyup="searchOnkeyup(this.id, 'initFileList()')">
		</div>
		<div class="form-group">
			<label for="searchFileTag">标签名</label>
			<input class="form-control" id="searchFileTag" onkeyup="searchOnkeyup(this.id, 'initFileList()')">
		</div>
	</div>
	<div style="padding: 0 10px;">
		<table id="fileTable" class="table-no-bordered">
			<thead>
		        <tr>
		        	<!-- <th data-checkbox=true data-width="10%"></th> -->
		            <th data-field="fileName" data-width="10%" data-align="center" data-halign="center">文件名</th>
		            <th data-field="fileTag" data-width="10%" data-align="center" data-halign="center">标签名</th>
		            <th data-field="fileType" data-width="10%" data-align="center" data-halign="center">文件类型</th>
		            <th data-field="userName" data-width="10%" data-align="center" data-halign="center">上传人</th>
		            <th data-field="fileTime" data-width="10%" data-align="center" data-halign="center">上传时间</th>
		            <th data-field="operate" data-width="20%" data-align="center" data-halign="center" data-events="operateEvents1" data-formatter="operateFormatter">操作</th>
		        </tr>
		    </thead>
		</table>
	</div>
	<div class="modal fade" id="updateFile" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                <h4 class="modal-title">修改文件</h4>
	            </div>
	            <div class="modal-body">
	            	<div class="alert alert-warning alert-dismissible fade in noticeAlert" role="alert">
				      	<span class="alert-content">修改失败！</span>
				    </div>
	            	<div class="alert alert-warning alert-dismissible fade in noticeAlert2" role="alert">
				      	<span class="alert-content">无修改文件权限！</span>
				    </div>
				    <input type="hidden" id="editFileId" clear="clear">
					<div class="form-group">
						<label for="editFileName">文件名</label>
						<input class="form-control" id="editFileName" placeholder="必填" clear="clear">
					</div>
					<div class="form-group">
					  	<label for="editFileTag">标签名</label>
					  	<input class="form-control" id="editFileTag" placeholder="" clear="clear">
					</div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	                <button type="button" class="btn btn-primary" onclick="doUpdateFile()">提交</button>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="modal fade" id="uploadDlg" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true"><!-- style="background-color:#fafafa;" -->
		<div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                <h4 class="modal-title">上传</h4>
	            </div>
	            <div class="modal-body">
	            	<div class="alert alert-success alert-dismissible fade in noticeAlert" role="alert">
				      	<span class="alert-content">上传成功！</span>
				    </div>
					<div id="fileTagShow">
						<div class="form-group">
						  	<label for="fileTag">标签名：</label>
						  	<input class="form-control" id="fileTag" placeholder="可选" clear="clear">
						</div>
					</div>
					<div class="page-body">
						<div id="uploader" class="uploader-body">
							<div class="queueList">
								<div id="dndArea" class="placeholder clearfix" style="width:275px;margin: 0 auto;">
									<div id="qrcode" style="width:120px;height:120px;float:left;"></div>
									<div id="filePicker" style="width:122px;height:122px;margin: 0 0 0 30px;float:left;"><div style="margin:85px 0 0 0;">上传电脑图片</div></div>
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
					<input type="hidden" clear=true id="fileId">
					<input type="hidden" clear=true id="userCoding">
	            </div>
	        </div>
	    </div>
	</div>
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.file.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>