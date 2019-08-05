<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.zz.po.sys.SysUserExpand" %>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>公告</title>
    <link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.css">
    <link rel="stylesheet" href="http://pic-static.fangzhizun.com/css/webuploader.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="css/upload.css">
    <link href="css/summernote.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>
    <script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table-zh-CN.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
            integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
            crossorigin="anonymous"></script>
    <script src="js/config.js"></script>
</head>
<style>
    .tWidth {
        width: 15%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
<body>
<%--添加公告对话框--%>
<div class="modal fade" id="insertModal" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" onclick="clearInsertValid()">&times;</button>
                <h4 class="modal-title">添加公告</h4>
            </div>
            <div class="modal-body">
                <form id="form1" class="form-horizontal valid">
                    <div class="form-group">
                        <label for="noticeTitle" class="col-sm-2 control-label">输入公告标题：</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control " id="noticeTitle" name="title"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="noticeType" class="col-sm-2 control-label">输入公告类型：</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="noticeType" name="type">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">选择上传文件：</label>
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-success" onclick="openAttachment6()">上传及查看文件</button>
                            <span class="attachmentNum6"
                                  style="vertical-align: middle;line-height: 26px;color: #444;"></span>
                        </div>
                    </div>
                    <%--<div class="form-group">--%>
                    <%--<label class="col-sm-3 control-label">输入公告内容</label>--%>
                    <%--<div class="col-sm-8">--%>
                    <%--&lt;%&ndash;<textarea class="form-control" rows="6" id="noticeContent" name="content"></textarea>&ndash;%&gt;--%>
                    <div class="summernote"></div>
                    <%--</div>--%>
                    <%--</div>--%>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" onclick="clearInsertValid()">关闭
                </button>
                <button type="submit" class="btn btn-primary"
                        onclick="insertValid()">保存
                </button>
            </div>
        </div>
    </div>
</div>
<%--修改公告对话框--%>
<div class="modal fade" id="updateModal" data-backdrop="static" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" onclick="">&times;</button>
                <h4 class="modal-title">修改公告</h4>
            </div>
            <div class="modal-body">
                <form id="form2" class="form-horizontal valid">
                    <div class="form-group">
                        <label for="noticeTitle" class="col-sm-2 control-label">公告标题</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control " id="noticeTitle2" name="title2"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="noticeType" class="col-sm-2 control-label">公告类型</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="noticeType2" name="type2">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">公告文件</label>
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-success" onclick="openAttachment7()">上传及查看图片</button>
                            <span class="attachmentNum7"
                                  style="vertical-align: middle;line-height: 26px;color: #444;"></span>
                        </div>
                    </div>
                    <%--<div class="form-group">--%>
                    <%--<label for="noticeContent2" class="col-sm-2 control-label">公告内容</label>--%>
                    <%--<div class="col-sm-8">--%>
                    <%--<textarea class="form-control" rows="6" id="noticeContent2" name="content2"></textarea>--%>
                    <%--</div>--%>
                    <%--</div>--%>
                    <div class="summernote"></div>
                    <div class="form-group">
                        <label for="noticeTitle" class="col-sm-2 control-label">公告时间</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control " id="noticeTime2" readonly="readonly"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" onclick="">关闭</button>
                <button type="submit" class="btn btn-primary"
                        onclick="updateValid()">保存
                </button>
            </div>
        </div>
    </div>
</div>
<%--查看公告--%>
<div class="modal fade" id="scranModal" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" onclick="">&times;</button>
                <h4 class="modal-title">查看公告</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="noticeTitle" class="col-sm-2 control-label">公 告 人</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control " id="noticeAuthor3" readonly="readonly"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="noticeTitle" class="col-sm-2 control-label">公告标题</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control " id="noticeTitle3" readonly="readonly"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="noticeType" class="col-sm-2 control-label">公告类型</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="noticeType3" readonly="readonly"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">上传文件</label>
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-success" onclick="scanPic()">查看图片</button>
                        </div>
                    </div>
                    <%--<div class="form-group">--%>
                    <%--<label  class="col-sm-2 control-label">公告内容</label>--%>
                    <%--<div class="col-sm-8">--%>
                    <%--<textarea class="form-control" rows="6" id="noticeContent3" readonly="readonly"></textarea>--%>
                    <%--</div>--%>
                    <%--</div>--%>
                    <div class="summernote"></div>
                    <div class="form-group">
                        <label for="noticeTitle" class="col-sm-2 control-label">公告时间</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control " id="noticeTime3" readonly="readonly"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" onclick="">关闭</button>
            </div>
        </div>
    </div>
</div>
<%--列表按钮--%>
<div id="attachmentDlg6" style="padding:6px;" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="width: 600px;height: 600px;overflow: auto">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"
                                                                                                  onclick="clear()">&times;</span>
                </button>
                <h4 class="modal-title">上传及查看文件</h4>
            </div>
            <div class="modal-body">
                <div id="hideFirst" style="padding:5px 0 0 10px;">
                    <button class="btn btn-default" onclick="upload_file_img6()"><span style="color: #198D19"
                                                                                       class="glyphicon glyphicon-picture"></span>
                        上传
                    </button>
                    <button class="btn btn-default" onclick="removeAttachment6()"><span style="color: #198D19"
                                                                                        class="glyphicon glyphicon-th-list"></span>
                        选择删除
                    </button>
                    <button class="btn btn-default" onclick="refreshAttachment6()"><span style="color: #198D19"
                                                                                         class="glyphicon glyphicon-refresh"></span>
                        刷新
                    </button>
                    <span class="attachmentNum8" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
                </div>
                <div id="removePictureText6" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
                <div style="clear:both"></div>
                <left>
                    <div id="doRemovePic6" style="margin:10px 0 0 10px;display:none;">
                        <button type="button" class="btn btn-default"
                                onclick="javascript:if($('#dnId').val()==null||$('#dnId').val()==''){doRemoveAttachment6()}else{doRemoveAttachment7()}">
                            删除
                        </button>
                        <button type="button" class="btn btn-default" onclick="doCancelAttachment6()">取消</button>
                    </div>
                </left>
                <div id="imgWrapperAttachment6" style="margin:10px 0 0 0;"></div>
            </div>
        </div>
    </div>
</div>
<!--=============================列表按钮==================================================================================-->

<div id="form-performance">
    <button type="button" style="margin-left: 5px" class="btn btn-default btn-sm" data-toggle="modal"
            onclick="insertNoticeBt()">
        <span style="color: #198D19" class="glyphicon glyphicon-plus"></span>添加公告
    </button>
    <button type="button" class="btn btn-default btn-sm" data-toggle="modal" onclick="updateNotice()">
        <span style="color: #198D19" class="glyphicon glyphicon-pencil"></span>修改公告
    </button>
    <button type="button" class="btn btn-default btn-sm" data-toggle="modal" onclick="deleteNotice()">
        <span style="color: #198D19" class="glyphicon glyphicon-remove"></span>删除公告
    </button>
</div>

<table id="table" data-id-field="dnId"
       data-select-item-name="dnId"
       data-click-to-select="true" data-toggle="table" data-height="500" data-toolbar="#form-performance"
       style="table-layout:fixed;">
    <thead>
        <th data-radio="true"></th>
        <th data-class="tWidth" data-field="dnId" data-halign="center" data-align="center">公告编号</th>
        <th data-class="tWidth" data-field="dnType" data-halign="center" data-align="center">类型</th>
        <th data-class="tWidth" data-field="dnTitle" data-halign="center" data-align="center">标题</th>
        <th data-class="tWidth" data-field="dnContent" data-width="300" data-halign="center" data-align="center">内容</th>
        <th data-class="tWidth" data-field="suStaffName" data-halign="center" data-align="center">发布人</th>
        <th data-class="tWidth" data-field="dnTime" data-halign="center" data-align="center">发布时间</th>
    </thead>
    <tbody>
    </tbody>
</table>

<div id="warmByUpdate" class="modal fade" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
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

<div id="warm1" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
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

<div id="deleteModal" class="modal fade" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
                <p class="modal-title">温馨提示</p>
            </div>
            <div class="modal-body">
                <h4>确定要删除此条公告吗？</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="submit" class="btn btn-default" data-dismiss="modal" onclick="executeDelete()">删除</button>
            </div>
        </div>
    </div>
</div>
<div id="imgShow" class="modal fade" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
                <p class="modal-title">查看文件</p>
            </div>
            <div id="scanPic" class="modal-body">
                <h4>此公告没有附带文件！</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<%--=============================================================================================================================--%>
<div class="modal fade" id="uploadDlg6" tabindex="-1" role="dialog" data-backdrop="static"
     aria-labelledby="myModalLabel" aria-hidden="true"><!-- style="background-color:#fafafa;" -->
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
                        onclick="javascript:if($('#dnId').val()==''){showPictureAttachment6()}else{showPictureAttachment7()}">
                    &times;
                </button>
                <h4 class="modal-title">上传</h4>
            </div>
            <div class="modal-body">
                <div class="page-body">
                    <div id="uploader" class="uploader-body">
                        <div class="queueList">
                            <div id="dndArea" class="placeholder clearfix" style="width:275px;margin: 0 auto;">
                                <div id="qrcode" style="width:120px;height:120px;float:left;"></div>
                                <div id="filePicker" style="width:122px;height:122px;margin: 0 0 0 30px;float:left;">
                                    <div style="margin:85px 0 0 0;">上传电脑图片</div>
                                </div>
                                <div style="width:120px;font-size:14px;color:#333;">使用微信扫描二维码（5分钟内有效）即可上传图片</div>
                            </div>
                        </div>
                        <div class="statusBar" style="display:none;">
                            <div class="progress">
                                <span class="text">0%</span>
                                <span class="percentage"></span>
                            </div>
                            <div class="info"></div>
                            <div class="btns">
                                <div id="filePicker2"></div>
                                <div class="uploadBtn">开始上传</div>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" clear=true id="token">
                <input type="hidden" clear=true id="co">
                <input type="hidden" clear=true id="att">
                <input type="hidden" clear=true id="dnId">
            </div>
        </div>
    </div>
</div>
<script src="js/summernote.min.js"></script>
<script src="js/summernote-zh-CN.min.js"></script>
<script src="https://cdn.bootcss.com/moment.js/2.22.1/moment-with-locales.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
<script src="bootstrapvalidator-master/dist/js/bootstrapValidator.min.js"></script>
<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
<script src="js/config.js"></script>
<script src="js/fg.file.js"></script>
<script src="js/fg.public.js"></script>
<script src="js/fg.notice.js"></script>
<script src="js/upload.js"></script>
</body>
</html>