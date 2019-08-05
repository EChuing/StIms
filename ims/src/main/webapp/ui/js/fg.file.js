/**
 * 初始化文件列表
 */
function initFileList() {
	var fileName = $('#searchFileName').val();
	var fileTag = $('#searchFileTag').val();
	$('#fileTable').bootstrapTable('destroy');
	$('#fileTable').bootstrapTable({
	    url: '../queryFiles.action',//修改
	    queryParamsType : 'undefined', 
	    queryParams: function queryParams(params) {   //修改    //传递参数（*）
	    	var param = {
	    		startNum: (params.pageNumber - 1) * params.pageSize,
	    		endNum: params.pageSize,
	    		fileName : fileName,
	    		fileTag : fileTag
	    	};
	    	return param;                   
	    },  
	    height: 492,//修改    //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度,设置了行高后编辑时标头宽度不会随着下面的行改变，且颜色也不会改变？？？？  头：63px 每行：37px 分页：59px
	    cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		striped: false, //是否显示行间隔色
		showColumns: false, //是否显示所有的列
		showToggle: false, 
		showRefresh: false, //是否显示刷新按钮
		clickToSelect: false, //是否启用点击选中行
		search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端
		pagination: true, //是否显示分页
		paginationPreText: '上一页',
		paginationNextText: '下一页',
		sidePagination: 'server',
		pageList: [],
		pageNumber: 1,
		pageSize: 10,//修改    //每页的记录行数（*）
		toolbar: '',//修改    //工具按钮用哪个容器
	});
}

/**
 * 操作列格式化
 */
function operateFormatter(value, row, index) {  
	// 设置download属性后，文件不能重命名的原因：如果下载文件不是在子集的服务器或域名中，浏览器会忽视download属性，换句话来说，文件名不变
    return [
        '<a href="' + row.fileDownloadPath + '" class="label label-info" download="' + row.fileName + '">下载</a>',
        '<a href="#updateFile" data-toggle="modal" class="label label-warning updateFileBtn">修改</a>',
        '<a href="#deleteFile" data-toggle="modal" class="label label-danger deleteFileBtn">删除</a>',
        ].join(' ');  
}
/**
 * 操作事件
 */
window.operateEvents1 = {
    'click .updateFileBtn': function(e, value, row, index) {
    	$('#editFileId').val(row.fileId);
    	$('#editFileName').val(row.fileName);
    	$('#editFileTag').val(row.fileTag);
    },
    'click .deleteFileBtn': function(e, value, row, index) {
    	$('#editFileId').val(row.fileId);
    	doDeleteFile();
    },
};
/**
 * 执行修改文件
 */
function doUpdateFile() {
	var loginPurview = $('#loginPurview').val();
	var loginPurviewJson = JSON.parse(loginPurview);
	if (_thisPurview['a'] == 0 || _thisPurview['c'][2]==0) {//修改文件
		$('.noticeAlert2').show();
		return;
	}
	var fileId = $('#editFileId').val();
	var fileName = $('#editFileName').val();
	var fileTag = $('#editFileTag').val();
	$.post("../updateFile.action", {
		fileId: fileId,
		fileName: fileName,
		fileTag: fileTag
	}, function(data) {
		if (data < 0 || data == '' || data == null) {
			$('.noticeAlert').show();
			return;
		} else {
			$('#updateFile').modal('hide');
			topAlert('修改成功！');
			initFileList();
		}
	});	
}
/**
 * 执行删除文件
 */
function doDeleteFile() {
	var loginPurview = $('#loginPurview').val();
	var loginPurviewJson = JSON.parse(loginPurview);
	if (_thisPurview['a'] == 0 || _thisPurview['c'][3]==0) {//删除文件
		topAlert('无删除文件权限');
		return;
	}
	var fileId = $('#editFileId').val();
	$.post('../deleteFile.action', {
		fileId: fileId
	}, function(data) {
		if (data < 0 || data == '') {
			topAlert('删除失败！', 'error');
		} else {
			topAlert('删除成功！');
		}
		initFileList();
	});
}

/***********************************************************附件上传start****************************************************************/
//电脑上传
function upload_file_img() {
	$.post('../upload/getUpTokenCallback.action', function (data) {
		var token = data.split('#####')[0];
		var co = data.split('#####')[1];
		$('#uploadDlg input[clear=true]').val('');
		$('#token').val(token);
		$('#co').val(co);
		$('#fileId').val(1);
		$('#userCoding').val(_loginUserId);
		var _$modal = $('#uploadDlg');
        _$modal.css('display', 'block');
        _$modal.addClass("webuploader-element-invisible");
        initUploader();//判断浏览器是否兼容，并增加一个继续添加的按钮
        $.post("../upload/getMobUploadUrl.action", {
    		fileId : 1,
    		userCoding : _loginUserId,
    	}, function (data) {
    		$('#qrcode').empty();
    		$('#qrcode').qrcode({
    			width:120,
    			height:120,
    			text:data
    		});
    	});
		$('#uploadDlg').modal('show');
	});
}

//手机上传
function creat_file_qr() {
	$.post("../upload/getMobUploadUrl.action", {
		fileId : 1,
		userCoding : _loginUserId,
	}, function (data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		$('#qrcodeDlg').modal('show');
	});
}
/***********************************************************附件上传end****************************************************************/

//页面顶部提示信息
function topAlert(msg, status){
	if (status == 'error') {
		$('body').prepend('<div id="topMsg" style="position:fixed;top:0;left:0;z-index:10;width:100%;" class="alert alert-danger alert-dismissible fade in text-center" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="top-alert alert-content">' + msg + '</span></div>');
	} else {
		$('body').prepend('<div id="topMsg" style="position:fixed;top:0;left:0;z-index:10;width:100%;" class="alert alert-success alert-dismissible fade in text-center" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="top-alert alert-content">' + msg + '</span></div>');
	}
	
	$('#topMsg').hide();
	$('#topMsg').fadeIn('2000');
	setTimeout(function() {
		$('#topMsg').fadeOut('3000');
	}, 3000);
	setTimeout(function() {
		$('#topMsg').remove();
	}, 6000);
}

$(function(){
	initFileList();
	$('#updateFile').on('show.bs.modal', function (e) {
		$('.noticeAlert').hide();
		$('.noticeAlert2').hide();
	});
	$('#updateFile').on('hidden.bs.modal', function (e) {
		$('#updateFile [clear="clear"]').val('');
	});
	$('#uploadDlg').on('show.bs.modal', function (e) {
		$('.noticeAlert').hide();
		$('#uploadDlg').removeClass("webuploader-element-invisible");
	});
	$('#uploadDlg').on('hidden.bs.modal', function (e) {
		$('#uploadDlg [clear="clear"]').val('');
		closeUploader();
		$('#qrcode').empty();
		initFileList();
	});
});