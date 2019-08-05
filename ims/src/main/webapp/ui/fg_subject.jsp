<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
    <title>专题</title>
    <link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/css/webuploader.css">
	<link href="css/summernote.css" rel="stylesheet">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/css/webuploader.css">
	<link rel="stylesheet" href="css/upload.css">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table-zh-CN.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
  </head>
	<style>
		.tWidth{
			width: 15%;
			text-overflow:ellipsis;
			overflow:hidden;
			white-space:nowrap;
		}
	</style>
  <body>
    <!-- ============================添加专题对话框======================== -->
	<%--=========================================================================================================================--%>
    <div class="modal fade" id="insertModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
		<div class="modal-dialog modal-lg">
		    <div class="modal-content">
		        <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="clearInsertModal()">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">添加专题</h4>
		        </div>
		        <div class="modal-body">
		            <form id="form1" class="form-horizontal">
          				<div class="form-group">
	          	  			<label for="subjectTitle" class="col-sm-1 control-label">标题</label>
	          	  			<div class="col-sm-11">
	          	  				<input type="text" class="form-control " id="subjectTitle" name="title" />
	          	  			</div>
	          			</div>
						<div class="form-group" >
	          	  			<label for="subjectDateStart" class="col-sm-1 control-label">日期</label>
	          	  			<div class="col-sm-5">
						            <!--指定 date标记-->
						            <div class='input-group date datetimepicker1' >
						                <input type='text' class="form-control" name="date" id="subjectDateStart" data-format="yyyy-MM-dd" />
						                <span class="input-group-addon">
						                    <span class="glyphicon glyphicon-calendar"></span>
						                </span>
						            </div>
	          	  			</div>
		          	  		<div class="col-sm-1 text-center" style="padding: 7px;">至</div>
	          	  			<div class="col-sm-5">
						            <!--指定 date标记-->
						            <div class='input-group date datetimepicker2'>
						                <input type='text' class="form-control" id="subjectDateEnd" data-format="yyyy-MM-dd" />
						                <span class="input-group-addon">
						                    <span class="glyphicon glyphicon-calendar"></span>
						                </span>
						            </div>
	          	  			</div>
						</div>
	          			<div class="form-group">
	          	  			<label for="subjectPlace" class="col-sm-1 control-label">地点</label>
	          	  			<div class="col-sm-11">
	            				<input  type="text" class="form-control"  id="subjectPlace" name="place"/>
	          				</div>
	          			</div>
	          			<div class="form-group">
							<label  class="col-sm-1 control-label">文件</label>
							<div class="col-sm-11">
								<button type="button" class="btn btn-info" onclick="openAttachment6()" >上传及查看图片</button>
								<span class="attachmentNum6" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
							</div>
						</div>
        				<div class="summernote" ></div>
        			</form>
		        </div>
		        <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal" onclick="clearInsertModal()">关闭</button>
		                <button type="submit" class="btn btn-primary" onclick="insertSummernoteValid()">提交</button>
		            </div>
		        </div>
		    </div>
		</div>
	<%--data-backdrop="static" data-keyboard="false"--%>
    <%--============================================================================================================--%>
	<%--=============================修改专题对话框=======================--%>
	<div class="modal fade" id="updateModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabe2" aria-hidden="true" >
		<div class="modal-dialog modal-lg">
			<div class="modal-content">

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="clearUpdateModal()">&times;</button>
					<h4 class="modal-title" id="myModalLabel2">修改专题</h4>
				</div>
				<div class="modal-body">
					<form id="form2" class="form-horizontal">
						<div class="form-group" >
							<label for="subjectTitle2" class="col-sm-1 control-label">标题</label>
							<div class="col-sm-11">
								<input type="text" class="form-control " id="subjectTitle2" name="title2" />
							</div>
						</div>
						<div class="form-group" >
							<label for="subjectDateStart2" class="col-sm-1 control-label">日期</label>
							<div class="col-sm-5">
								<!--指定 date标记-->
								<div class='input-group date datetimepicker1' >
									<input type='text' class="form-control" name="date2" id="subjectDateStart2" data-format="yyyy-MM-dd" />
									<span class="input-group-addon">
						                    <span class="glyphicon glyphicon-calendar"></span>
						                </span>
								</div>
							</div>
							<div class="col-sm-1 text-center" style="padding: 7px;">至</div>
							<div class="col-sm-5">
								<!--指定 date标记-->
								<div class='input-group date datetimepicker2' >
									<input type='text' class="form-control" id="subjectDateEnd2" data-format="yyyy-MM-dd" />
									<span class="input-group-addon">
						                    <span class="glyphicon glyphicon-calendar"></span>
						                </span>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label for="subjectPlace2" class="col-sm-1 control-label">地点</label>
							<div class="col-sm-11">
								<input  type="text" class="form-control"  id="subjectPlace2" name="place2" >
							</div>
						</div>
						<div class="form-group">
							<label  class="col-sm-1 control-label">文件</label>
							<div class="col-sm-11">
								<button type="button" class="btn btn-info" onclick="openAttachment7()">上传及查看图片</button>
								<span class="attachmentNum7" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
							</div>
						</div>
						<div class="summernote"></div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" onclick="clearUpdateModal()">关闭</button>
					<button type="submit" class="btn btn-primary" onclick="updateSummernoteValid()">修改</button>
				</div>
			</div>
		</div>
	</div>
   	<!-- =====================================专题列表展示================================================== -->
	<%--====================================================================================================--%>
	<div id="warm1" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<p class="modal-title">温馨提示</p>
				</div>
				<div class="modal-body">
					<h4>内容不能为空!</h4>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<div id="warm2" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<p class="modal-title">温馨提示</p>
				</div>
				<div class="modal-body">
					<h4>请选中行!</h4>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<%--======================================================================================================================--%>
	<div id="attachmentDlg6" style="padding:6px;" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog" role="document">
			<div class="modal-content" style="width: 600px;height: 600px;overflow: auto">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onclick="clear()">&times;</span></button>
					<h4 class="modal-title">上传及查看图片</h4>
					</div>
				<div class="modal-body">
					<div style="padding:5px 0 0 10px;">
						<button class="btn btn-default"   onclick="upload_file_img6()">上传</button>
						<button class="btn btn-default"   onclick="removeAttachment6()">选择删除</button>
						<button class="btn btn-default"   onclick="refreshAttachment6()">刷新</button>
						<span class="attachmentNum8" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
						</div>
					<div id="removePictureText6" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
					<div style="clear:both"></div>
                        <left>
                            <div id="doRemovePic6" style="margin:10px 0 0 10px;display:none;">
                                <button type="button" class="btn btn-default"  onclick="javascript:if($('#subId').val()==null||$('#subId').val()==''){doRemoveAttachment6()}else{doRemoveAttachment7()}">删除</button>
                                <button type="button" class="btn btn-default"  onclick="doCancelAttachment6()">取消</button>
                            </div>
                        </left>
					<div id="imgWrapperAttachment6" style="margin:10px 0 0 0;"></div>
				</div>
			</div>
		</div>
	</div>
	<%--============================================================================================================--%>
	<div id="form-performance" class="form-inline">

	<button style="margin-left: 5px" class="btn btn-default btn-sm" data-toggle="modal" onclick="insertSubjectBt()">
		<span style="color: #198D19"  class="glyphicon glyphicon-plus" ></span>添加专题
	</button>
	<button  type="button" class="btn btn-default btn-sm" data-toggle="modal" onclick="updateSubjectBt()">
		<span style="color: #198D19"  class="glyphicon glyphicon-pencil"></span>修改专题
	</button>
	</div>

	<%--=========================================初始化查询出来的表格===============================================--%>
		<table id="table"
			   data-toggle="table"
			   data-height="500"
			   style="table-layout:fixed;"
		<%--data-search-align="left"--%>
		<%--data-side-pagination="server"--%>
		<%--是否开启分页,及分页开关--%>
		<%--data-pagination="true"--%>
		<%--data-show-pagination-switch="true"--%>
		<%--data-page-size="8"--%>
		<%--data-query-params-type=""--%>
		<%--data-query-params="queryParams"--%>
		<%--data-url="../selectAllSubject.action"--%>
		<%--data-show-refresh="true"--%>
		<%--data-show-columns="true"--%>
		<%--data-show-toggle="true"--%>
		<%--data-toolbar="#form-performance"--%>
		>
			<thead>
				<th data-class="tWidth" data-field="subTitle">标题</th>
				<th data-class="tWidth" data-field="subDateStart">起始时间</th>
				<th data-class="tWidth" data-field="subDateEnd">结束时间</th>
				<th data-class="tWidth" data-field="subContent">内容</th>
				<th data-class="tWidth" data-field="subPlace">地点</th>
			</thead>
		</table>
	<%--===========================================================文件上传按钮=====================================================--%>
	<div class="modal fade" id="uploadDlg6" role="dialog" data-backdrop="static" data-keyboard="false" ><!-- style="background-color:#fafafa;" -->
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="javascript:if($('#subId').val()==''){console.log(231321321321);showPictureAttachment6()}else{console.log(6776767677676);showPictureAttachment7()}">&times;</button>
					<h4 class="modal-title">上传</h4>
				</div>
				<div class="modal-body">

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
					<input type="hidden" clear=true id="att">
					<input type="hidden" clear=true id="subId">
				</div>
			</div>
		</div>
	</div>
	<%--================================================================================================================--%>
	<script src="js/summernote.min.js"></script>
	<script src="js/summernote-zh-CN.min.js"></script>
	<script src="https://cdn.bootcss.com/moment.js/2.22.1/moment-with-locales.min.js"></script>
	<script src="https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
	<script src="bootstrapvalidator-master/dist/js/bootstrapValidator.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg_subject.js"></script>
  	<script src="js/upload.js"></script>
  </body>
</html>
