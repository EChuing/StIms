$(function(){
	if($('#att2').val()!=""){
		$('#type').val(1);
	}
});
var $ = jQuery,    // just in case. Make sure it's not an other libaray.

    $wrap = $('#uploader'),

    // 图片容器
    $queue = $('<ul class="filelist"></ul>')
        .appendTo( $wrap.find('.queueList') ),

    // 状态栏，包括进度和控制按钮
    $statusBar = $wrap.find('.statusBar'),

    // 文件总体选择信息。
    $info = $statusBar.find('.info'),

    // 上传按钮
    $upload = $wrap.find('.uploadBtn'),

    // 没选择文件之前的内容。
    $placeHolder = $wrap.find('.placeholder'),

    // 总体进度条
    $progress = $statusBar.find('.progress').hide(),

    // 添加的文件数量
    fileCount = 0,

    // 添加的文件总大小
    fileSize = 0,

    // 优化retina, 在retina下这个值是2
    ratio = window.devicePixelRatio || 1,

    // 缩略图大小
    thumbnailWidth = 110 * ratio,
    thumbnailHeight = 110 * ratio,

    // 可能有pedding, ready, uploading, confirm, done.
    state = 'pedding',

    // 所有文件的进度信息，key为file id
    percentages = {},

    supportTransition = (function(){
        var s = document.createElement('p').style,
            r = 'transition' in s ||
                  'WebkitTransition' in s ||
                  'MozTransition' in s ||
                  'msTransition' in s ||
                  'OTransition' in s;
        s = null;
        return r;
    })(),

    // WebUploader实例
    uploader,
    
    token,
    co,
    jrlId,
    jrrId,
    fileId,
    saId,
    att,
    att2,
    eaId,
    handlerId,
    handlerName,
    rcoId,
    nrcId,
    repId,
    variablesId,
    hsId,
    supId,
    userName,
    userId,
    fileTag,
    jciId,
    userCoding,
    formData,
    jsrsuId,
    subId,
    dnId,
    jsrsuRoomType,
    houseCoding;


function getFormData(){
	token = $('#token').val();
	co = $('#co').val();
	jrlId = $('#jrlId').val();
	jrrId = $('#jrrId').val();
	saId = $('#saId').val();
	att = $('#att').val();
	att2 = $('#att2').val();
	eaId = $('#eaId').val();
	handlerId = $('#handlerId').val();
	handlerName = $('#handlerName').val();
	rcoId = $('#rcoId').val();
	nrcId = $('#nrcId').val();
	repId = $('#repId').val();
	variablesId = $('#variablesId').val();
	hsId = $('#hsId').val();
	supId = $('#supId').val();
	userName = $('#userName').val();
	userId = $('#userId').val();
	fileId = $('#fileId').val();
	fileTag = $('#fileTag').val();
	jciId = $('#jciId').val();
	userCoding = $('#userCoding').val();
	id = $('#id').val();
	cgsuId = $("#cgsuId").val();
	type= $("#type").val();
	jsrsuId=$("#jsrsuId").val();
	jsrsuRoomType=$("#jsrsu_room_type").val();
	subId=$("#subId").val();
	dnId=$('#dnId').val();
    houseCoding=$('#houseCoding').val();
	console.log(jsrsuRoomType);
	formData = {
		'token':token,
		'x:co':co,
		'x:jrlId':jrlId,
		'x:jrrId':jrrId,
		'x:saId':saId,
		'x:att':att,
		'x:att2':att2,
		'x:eaId':eaId,
		'x:handlerId':handlerId,
		'x:handlerName':handlerName,
		'x:rcoId':rcoId,
		'x:nrcId':nrcId,
		'x:repId':repId,
		'x:variablesId':variablesId,
		'x:hsId':hsId,
		'x:supId':supId,
		'x:userName':userName,
		'x:userId':userId,
		'x:fileId':fileId,
		'x:fileTag':fileTag,
		'x:jciId':jciId,
		'x:userCoding':userCoding,
		'x:id':id,
		'x:cgsuId':cgsuId,
		'x:type':type,
		'x:jsrsuId':jsrsuId,
		'x:jsrsuRoomType':jsrsuRoomType,
        'x:subId':subId,
        'x:dnId':dnId,
        'x:houseCoding':houseCoding,
	};
	return formData;
}

function initUploader(){
	if ( !WebUploader.Uploader.support() ) {
		if ($.messager != undefined) {
			$.messager.alert('通知','Web Uploader 不支持您的浏览器！',"error");
		} else {
			alert( 'Web Uploader 不支持您的浏览器！');
		}
        throw new Error( 'WebUploader does not support the browser you are using.' );
        return;
    }
	// 实例化
    uploader = WebUploader.create({
        pick: {
            id: '#filePicker',
            innerHTML: ''
        },
        dnd: '#uploader .queueList',
        paste: document.body,

//        accept: {
//            title: 'Images',
//            extensions: 'gif,jpg,jpeg,bmp,png',
//            mimeTypes: 'image/*'
//        },

        disableGlobalDnd: true,

        //chunked: true,
        server: 'http://up-z2.qiniu.com/',
        fileNumLimit: 300,//文件最大个数
        //fileSizeLimit: 5 * 1920 * 1080,
        //fileSingleSizeLimit: 1 * 1920 * 1080, 
		
		formData: getFormData(),
		
		method: 'POST',
		
		threads: 1,
    });
    //添加“添加文件”的按钮，
    uploader.addButton({
        id: '#filePicker2',
        label: '继续添加'
    });
    uploader.onUploadProgress = function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');

        $percent.css( 'width', percentage * 100 + '%' );
        percentages[ file.id ][ 1 ] = percentage;
        updateTotalProgress();
    };

    uploader.onFileQueued = function( file ) {
        fileCount++;
        fileSize += file.size;

        if ( fileCount === 1 ) {
            $placeHolder.addClass( 'element-invisible' );
            $statusBar.show();
        }

        addFile( file );
        setState( 'ready' );
        updateTotalProgress();
    };

    uploader.onFileDequeued = function( file ) {
        fileCount--;
        fileSize -= file.size;

        if ( !fileCount ) {
            setState( 'pedding' );
        }

        removeFile( file );
        updateTotalProgress();

    };
    
    /*uploader.onUploadSuccess = function( file, response ){
    	console.log(response)
    }*/

    uploader.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                setState( 'confirm' );
                break;

            case 'startUpload':
                setState( 'uploading' );
                break;

            case 'stopUpload':
                setState( 'paused' );
                break;

        }
    });

    uploader.onError = function( code ) {
    	if ($.messager != undefined) {
    		$.messager.alert('通知','Eroor: ' + code,"error");
    	} else {
    		alert( 'Eroor: ' + code );
    	}
    };
    
    uploader.onUploadBeforeSend = function(object,data,headers){
    	var str = $('#fileTag').val();
    	var a = {"x:fileTag":str};
    	for (var item in a) {
    		data[item]=a[item];
		}
    };
    
    uploader.onUploadAccept = function(file, response){
		if ( response.response == 'error' ) {
			return false;
		}
    };

    $upload.addClass( 'state-' + state );
    updateTotalProgress();
}

$upload.on('click', function() {
    if ( $(this).hasClass( 'disabled' ) ) {
        return false;
    }

    if ( state === 'ready' ) {
        uploader.upload();
    } else if ( state === 'paused' ) {
        uploader.upload();
    } else if ( state === 'uploading' ) {
        uploader.stop();
    }
});

$info.on( 'click', '.retry', function() {
    uploader.retry();
} );

$info.on( 'click', '.ignore', function() {
    //alert( '忽略' );
} );

// 当有文件添加进来时执行，负责view的创建
function addFile(file) {
    var $li = $('<li id="' + file.id + '">' +
            '<p class="title">' + file.name + '</p>' +
            '<p class="imgWrap"></p>'+
            '<p class="progress"><span></span></p>' +
            '</li>'),

       $btns = $('<div class="file-panel">' +
            '<span class="cancel">删除</span>' +
            //'<span class="rotateRight">向右旋转</span>' +
            //'<span class="rotateLeft">向左旋转</span>' + 
			'</div>').appendTo( $li ),
        $prgress = $li.find('p.progress span'),
        $wrap = $li.find( 'p.imgWrap' ),
        $info = $('<p class="error"></p>'),
        
        showError = function(code) {
            switch(code) {
                case 'exceed_size':
                    text = '文件大小超出';
                    break;

                case 'interrupt':
                    text = '上传暂停';
                    break;
                
                default:
                    text = '上传失败，请重试';
                    break;
            }

            $info.text( text ).appendTo( $li );
        };

    if ( file.getStatus() === 'invalid' ) {
        showError( file.statusText );
    } else {
        // @todo lazyload
        $wrap.text( '预览中' );
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $wrap.text( '不能预览' );
                return;
            }

            var img = $('<img src="'+src+'">');
            $wrap.empty().append( img );
        }, thumbnailWidth, thumbnailHeight );

        percentages[ file.id ] = [ file.size, 0 ];
        file.rotation = 0;
    }

    file.on('statuschange', function( cur, prev ) {
        if ( prev === 'progress' ) {
            $prgress.hide().width(0);
        } else if ( prev === 'queued' ) {
            $li.off( 'mouseenter mouseleave' );
            $btns.remove();
        }

        // 成功
        if ( cur === 'error' || cur === 'invalid' ) {
            showError( file.statusText );
            percentages[ file.id ][ 1 ] = 1;
        } else if ( cur === 'interrupt' ) {
            showError( 'interrupt' );
        } else if ( cur === 'queued' ) {
            percentages[ file.id ][ 1 ] = 0;
        } else if ( cur === 'progress' ) {
            $info.remove();
            $prgress.css('display', 'block');
        } else if ( cur === 'complete' ) {
            $li.append( '<span class="success"></span>' );
        }

        $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
    });

    $li.on( 'mouseenter', function() {
        $btns.stop().animate({height: 30});
    });

    $li.on( 'mouseleave', function() {
        $btns.stop().animate({height: 0});
    });

    $btns.on( 'click', 'span', function() {
        var index = $(this).index(),
            deg;

        switch ( index ) {
            case 0:
                uploader.removeFile( file );
                return;

            case 1:
                file.rotation += 90;
                break;

            case 2:
                file.rotation -= 90;
                break;
        }

        if ( supportTransition ) {
            deg = 'rotate(' + file.rotation + 'deg)';
            $wrap.css({
                '-webkit-transform': deg,
                '-mos-transform': deg,
                '-o-transform': deg,
                'transform': deg
            });
        } else {
            $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
        }

    });

    $li.appendTo( $queue );
}

// 负责view的销毁
function removeFile( file ) {
    var $li = $('#'+file.id);

    delete percentages[ file.id ];
    updateTotalProgress();
    $li.off().find('.file-panel').off().end().remove();
}

function updateTotalProgress() {
    var loaded = 0,
        total = 0,
        spans = $progress.children(),
        percent;

    $.each( percentages, function( k, v ) {
        total += v[ 0 ];
        loaded += v[ 0 ] * v[ 1 ];
    } );

    percent = total ? loaded / total : 0;

    spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
    spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
    updateStatus();
}

function updateStatus() {
    var text = '', stats;

    if ( state === 'ready' ) {
        text = '选中' + fileCount + '张图片，共' +
                WebUploader.formatSize( fileSize ) + '。';
    } else if ( state === 'confirm' ) {
        stats = uploader.getStats();
        if ( stats.uploadFailNum ) {
            text = '已成功上传' + stats.successNum+ '张图片，'+
                stats.uploadFailNum + '张附件上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
        }
    } else {
        stats = uploader.getStats();
        text = '共' + fileCount + '张（' +
                WebUploader.formatSize( fileSize )  +
                '），已上传' + stats.successNum + '张';

        if ( stats.uploadFailNum ) {
            text += '，失败' + stats.uploadFailNum + '张';
        }
    }

    $info.html( text );
}

function setState( val ) {
	
    var file, stats;

    if ( val === state ) {
        return;
    }

    $upload.removeClass( 'state-' + state );
    $upload.addClass( 'state-' + val );
    state = val;

    switch ( state ) {
        case 'pedding':
            $placeHolder.removeClass( 'element-invisible' );
            $queue.parent().removeClass('filled');
            $queue.hide();
            $statusBar.addClass( 'element-invisible' );
            $statusBar.hide();
            uploader.refresh();
            break;

        case 'ready':
            $placeHolder.addClass( 'element-invisible' );
            $( '#filePicker2' ).removeClass( 'element-invisible');
            $queue.parent().addClass('filled');
            $queue.show();
            $statusBar.removeClass('element-invisible');
            $statusBar.show();
			$upload.removeClass( 'disabled' );
            uploader.refresh();
            break;

        case 'uploading':
            $( '#filePicker2' ).addClass( 'element-invisible' );
            $progress.show();
            $upload.text( '暂停上传' );
            break;

        case 'paused':
            $progress.show();
            $upload.text( '继续上传' );
            break;

        case 'confirm':
            $progress.hide();
            $upload.text( '开始上传' ).addClass( 'disabled' );
            stats = uploader.getStats();
            if ( stats.successNum && !stats.uploadFailNum ) {
                setState( 'finish' );
                return;
            }
            break;
        case 'finish':
            stats = uploader.getStats();
            if ( stats.successNum ) {
				$( '#filePicker2' ).removeClass( 'element-invisible');
                if ($.messager != undefined) {
                	$.messager.alert('通知','上传成功',"info");
                } else {
                	// alert( '上传成功' );
                	$('.noticeAlert').show();
                }
				break;
            } else {
                // 没有成功的图片，重设
                state = 'done';
                location.reload();
            }
            break;
    }

    updateStatus();
}
/*关闭上传框窗口后恢复上传框初始状态*/
function closeUploader() {        
    // 移除所有缩略图并将上传文件移出上传序列
    for (var i = 0; i < uploader.getFiles().length; i++) {
        // 将图片从上传序列移除
        uploader.removeFile(uploader.getFiles()[i]);
        //uploader.removeFile(uploader.getFiles()[i], true);
        //delete uploader.getFiles()[i];
        // 将图片从缩略图容器移除
        var $li = $('#' + uploader.getFiles()[i].id);
        $li.off().remove();
    }
    // 修复预览bug
    $('#uploader .filelist li').off().remove();
    setState('pedding');
     
    // 重置文件总个数和总大小
    fileCount = 0;
    fileSize = 0;
    // 重置uploader，目前只重置了文件队列
    uploader.reset();
    // 更新状态等，重新计算文件总个数和总大小
    updateStatus();
}

/***********************************************************图片上传start****************************************************************/

/**
 * 使用方法
 * <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'assets', 'assetDg', 'saId', 'saPhotos', 'queryAssetsCommon', 'deleteAssetsPic')">上传及查看图片</a>
 * 
 * 参数说明
 * TYPE: private（私有） | public（公开） 私有上传需要下载凭证，公开不需要
 * XXXX: 上传的标识，用于区分上传到哪里，如租客合同、房东合同、资产，如repair
 * TABLE: 表格，如repairDg
 * ID: 表格主键:如repId
 * IMGPATH: 数据库图片字段名，如repImgPath
 * QUERYURL: 查询，如queryAllRepair
 * DELURL: 删除图片的action，如deleteRepairPic
 * 
 * 上传功能实现步骤：
 * 1.数据库新建两个字段：图片路径、图片数量
 * 2.页面上加一个模板按钮，配置好参数
 * 3.页面导入上传相关的js、jsp、css
 * 	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
 * 	<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
 * 	<link href="css/upload.css" rel="stylesheet">
 * 	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
 * 	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
 * 	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
 * 	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
 * 	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
 * 	<script src="js/upload.js"></script>
 * 4.jour_qrcode表添加字段
 * 4.po（新功能的po和JournalQrcode）、mapper（resultMap、insert、update）
 * 5.UploadUtil.getUpTokenCallback
 * 	UploadAction
 * 	upload.js
 * 	mobUpload.js
 * 	uploadDlg.jsp
 * 	mobUpload.jsp
 * 6.查询图片、删除图片的action

 */


//上传
function upload_common_img(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL) {
	creat_common_qr(TYPE, XXXX, TABLE, ID);
	var row = $("#" + TABLE).datagrid("getSelected");
	if (!row) {
		$.messager.alert("消息","请选择一条记录","info");
		return;
	}
	var url = "";
	if (TYPE == "private") {
		url = "../upload/getUpTokenCallback.action";
	} else if (TYPE == "public") {
		url = "../pubupload/getUpTokenCallback.action";
	} else {
		alert("系统异常");
		return;
	}
	$("#uploadDlg").dialog({
		title : "上传",
		top : getTop(464),
		left : getLeft(600),
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refresh_common_img(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL);
		}
	});
	$.post(url, function (data) {
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$("#uploadDlg input[clear=true]").val("");
		$("#token").val(token);
		$("#co").val(co);
		$("#" + ID).val(row[ID]);
		$("#userCoding").val(_loginUserId);
		initUploader();
		doCancel_common_img(XXXX);
		$("#uploadDlg").dialog("open");
	});
}
//二维码
function creat_common_qr(TYPE, XXXX, TABLE, ID) {
    console.log("0000000000000000000000000000")
	var row = $("#" + TABLE).datagrid("getSelected");
	if (!row) {
		$.messager.alert("消息","请选择一条记录","info");
		return;
	}
	var url = "";
	if (TYPE == "private") {
		url = "../upload/getMobUploadUrl.action";
	} else if (TYPE == "public") {
		url = "../pubupload/getMobUploadUrl.action";
	} else {
		alert("系统异常");
		return;
	}
	var params = {};
	params[ID] = row[ID];
	$.post(url, params, function (data) {
		$('#qrcode').empty();
		$("#qrcode").qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel_common_img(XXXX);
	});
}
//删除图片
function remove_common_img(XXXX) {
	var file = $("._" + XXXX + "_file");
	if (file.length == 0) {
		$.messager.alert("消息","没有图片可以删除","error");
	} else {
		$("#_" + XXXX + "_title").html("请选择要删除的图片").show();
		$("._" + XXXX + "_checkbox").show();
		$("#_" + XXXX + "_btn").show();
	}
}
//取消删除图片
function doCancel_common_img(XXXX){
	$("#_" + XXXX + "_title").hide();
	$("._" + XXXX + "_checkbox").hide().removeAttr("checked");
	$("#_" + XXXX + "_btn").hide();
}
//执行删除图片
function doremove_common_img(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL, DELURL) {
	var row = $("#" + TABLE).datagrid("getSelected");
	var arr = 0;
	var path = "";
	var name = "";
	var chk = $("._" + XXXX + "_checkbox");
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#_" + XXXX + "_imgWrapper input[name='image']:checked").each(function() {
			path += $(this).parent().children("img").attr("src").split("?")[0] + ",";
			$(this).parent("div").remove();
	    });
		$("#_" + XXXX + "_imgWrapper input[name='other']:checked").each(function() {
			path += $(this).parent().children("a").attr("href").split("?")[0] + ",";
			$(this).parent("div").remove();
	    });
		path = path.substring(0, path.length-1);
		var params = {};
		params[ID] = row[ID];
		params[IMGPATH] = path;
		params.repUserId = _loginUserId;
		params.repDepartment = _loginDepartment;
		params.repStorefront = _loginStore;
		$.post("../" + DELURL + ".action", params, function(data) {
			if (data < 0) {
				myTips("删除失败！", "error");
				return;
			} else {
				myTips("删除成功！", "success");
				show_common_img(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL);
			}
		});
		doCancel_common_img(XXXX);
	}else{
		$.messager.alert("消息","未选中任何图片","error");
	}
}
//打开上传图片对话框
function open_common_img_dialog(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL, DELURL) {
	var row = $('#' + TABLE).datagrid('getSelected');
	if (row) {
        if ($("#_" + XXXX + "_imgDlg").length == 0) {
            //动态加载上传对话框
            append_common_imgDlg(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL, DELURL);
            //解析目标为指定DOM的所有子孙元素，不包含这个DOM自身
            $.parser.parse($("#_" + XXXX + "_imgDlg"));
        }
		doCancel_common_img(XXXX);
		show_common_img(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL);
	} else {
		$.messager.alert('消息','请选择一条记录',"info");
	}
}
//查看图片
function show_common_img(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL){
	var row = $('#' + TABLE).datagrid('getSelected');
	$("#_" + XXXX + "_imgDlg").dialog({
		title : "查看图片",
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#_" + XXXX + "_imgWrapper").empty();
		}
	});
	$("#_" + XXXX + "_imgWrapper").empty();
	var params = {};
	params[ID] = row[ID];
	$.post("../" + QUERYURL + ".action", params, function(data) {
		if(data.code < 0){
			$("#_" + XXXX + "_imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		$("#_" + XXXX + "_imgDlg").dialog("open");
		var path = data.body[0][IMGPATH];
		if(path == "" || path == null){
			$("#_" + XXXX + "_imgNum").html("（图片：0 张    文件：0 个）");
			return;
		}
		var img = eval("([" + path.getRealJsonStr() + "])");
		if (TYPE == "private") {
			var urls = "";
			for(var i in img){
				if(i==0){
					urls += img[i].path;
				}else{
					urls += ","+img[i].path;
				}
			}
			$.post("../upload/getDownloadUrl.action",{
				baseUrls : urls
			},function(data){
				var newUrls = data.split(",");
				load_common_img(TYPE, XXXX, img, newUrls);
			});
		} else if (TYPE == "public") {
			load_common_img(TYPE, XXXX, img, img);
		} else {
			alert("系统异常");
			return;
		}
	});
}
//刷新
function refresh_common_img(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL){
	var row = $("#" + TABLE).datagrid("getSelected");
	if (row){
		doCancel_common_img(XXXX);
		show_common_img(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL);
	}
}
/**
 * 加载图片
 * img 不带下载凭证的图片链接
 * newUrls 带下载凭证的图片链接
 */
function load_common_img(TYPE, XXXX, img, newUrls){
	var imgNum = 0;
	var fileNum = 0;
	if (TYPE == 'private') {
		for(var i in img){
			var strs = img[i].path.split(".");//拆分文件路径
			var ext = strs[strs.length-1];//文件后缀
			var j = parseInt(i) + parseInt(img.length);//缩略图下标
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$("#_" + XXXX + "_imgWrapper").prepend('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$("#_" + XXXX + "_imgWrapper .fileList").append('<li>' +
					'<input name="other" class="_' + XXXX + '_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
					'<a href="'+newUrls[i]+'" class="_' + XXXX + '_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
					'</li>');
				fileNum++;
			}else{
				if (imgNum == 0) {
					$("#_" + XXXX + "_imgWrapper").append('<div style="clear:both"></div><ul class="imageList clearfix"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$("#_" + XXXX + "_imgWrapper .imageList").append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="_' + XXXX + '_group _' + XXXX + '_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
					'<input name="image" class="_' + XXXX + '_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
	} else {
		for(var i in img){
			var strs = img[i].path.split(".");//拆分文件路径
			var ext = strs[strs.length-1];//文件后缀
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$("#_" + XXXX + "_imgWrapper").prepend('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$("#_" + XXXX + "_imgWrapper .fileList").append('<li>' +
					'<input name="other" class="_' + XXXX + '_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
					'<a href="'+img[i].path+'" class="_' + XXXX + '_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
					'</li>');
				fileNum++;
			}else{
				if (imgNum == 0) {
					$("#_" + XXXX + "_imgWrapper").append('<div style="clear:both"></div><ul class="imageList clearfix"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$("#_" + XXXX + "_imgWrapper .imageList").append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="_' + XXXX + '_group _' + XXXX + '_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="_' + XXXX + '_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
	}
	$("#_" + XXXX + "_imgNum").html("（图片：" + imgNum + "张    文件：" + fileNum + "个）");
	$("._" + XXXX + "_group").colorbox({
		rel:"_" + XXXX + "_group", 
		transition:"none", 
		width:"60%", 
		height:"90%"
	});
}
/**
 * 动态加载上传对话框
 */
function append_common_imgDlg(TYPE, XXXX, TABLE, ID, IMGPATH, QUERYURL, DELURL){
	var html = ['<div id="_' + XXXX + '_imgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">',
		'	<div style="padding:5px 0 0 10px;">',
		'		<a class="easyui-linkbutton" iconCls="icon-upload" 	  plain="true" onclick="upload_common_img(\'' + TYPE + '\', \'' + XXXX + '\', \'' + TABLE + '\', \'' + ID + '\', \'' + IMGPATH + '\', \'' + QUERYURL + '\')">上传</a>',
		'		<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="remove_common_img(\'' + XXXX + '\')">选择删除</a>',
		'		<a class="easyui-linkbutton" iconCls="icon-shuaxin" 		  plain="true" onclick="refresh_common_img(\'' + TYPE + '\', \'' + XXXX + '\', \'' + TABLE + '\', \'' + ID + '\', \'' + IMGPATH + '\', \'' + QUERYURL + '\')">刷新</a>',
		'		<span id="_' + XXXX + '_imgNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>',
		'	</div>',
		'	<div id="_' + XXXX + '_title" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>',
		'	<div style="clear:both"></div>',
		'	<left>',
		'		<div id="_' + XXXX + '_btn" style="margin:10px 0 0 10px;display:none;">',
		'			<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doremove_common_img(\'' + TYPE + '\', \'' + XXXX + '\', \'' + TABLE + '\', \'' + ID + '\', \'' + IMGPATH + '\', \'' + QUERYURL + '\', \'' + DELURL +'\')">删除</a>',
		'			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel_common_img(\'' + XXXX + '\')">取消</a>',
		'		</div>',
		'	</left>',
		'	<div id="_' + XXXX + '_imgWrapper" style="margin:10px 0 0 10px;"></div>',
		'</div>'].join("");
	$("body").append(html);
}

/***********************************************************图片上传end****************************************************************/

/***********************************************************预先上传start**************************************************************/

/**
 * 使用方法：
 * <a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">上传</a>
 * <span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
 * 
 * 参数说明
 * TYPE: private（私有） | public（公开） 私有上传需要下载凭证，公开不需要
 * 特别注意：
 * “添加xx对话框”的关闭事件里要调用clearAttachment()清除att
 * “添加xx对话框”点击提交时isSave要置为true
 */

var isSave = false;
//清除att
function clearAttachment(){
	var att = $("#att").val();
	if (att != "") {
		if (isSave) {
			$.post("../deleteAttachment.action", {
				att : att,
				attType:1
			});
		} else {
			$.post("../deleteAttachmentAndFile.action", {
				att : att,
				attType:1
			});
		}
	}
	$('#att').val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	isSave = false;
}

//上传
function uploadAttachment(TYPE){
	$("#type").val("");
	$('#uploadDlg').dialog({
		title : '上传',
		top : getTop(464),
		left : getLeft(600),
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refreshAttachment(TYPE);
		}
	});
	var url = "";
	if (TYPE == 'private') {
		url = '../upload/getUpTokenCallback.action';
	} else if (TYPE == 'public') {
		url = '../pubupload/getUpTokenCallback.action';
	} else {
		alert("上传功能出错，请联系管理员处理");
		return;
	}
	creatQrAttachment(TYPE);
	$.post(url, function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$("#token").val(token);
		$("#co").val(co);
		initUploader();
		$('#uploadDlg').dialog('open');
	});
}

//生成二维码
function creatQrAttachment(TYPE){
	var url = "";
	if (TYPE == 'private') {
		url = '../upload/getMobUploadUrl.action';
	} else if (TYPE == 'public') {
		url = '../pubupload/getMobUploadUrl.action';
	} else {
		alert("系统异常");
		return;
	}
	$.post(url, {
		att : $("#att").val()
	}, function(data) {
	    console.log(data);
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		console.log('qr='+data);
	});
}

//查看图片
function openAttachment(TYPE) {

	if($("#att").val()==""){
		var att = parseInt((Math.random()*9+1)*10000000);
		console.log("att:"+att);
		$.post("../insertAttachment.action",{
			att : att,
		},function(data){
			if (data.code < 0) {
				$.messager.alert('消息','服务器异常，请重试',"error");
				return;
			}else{
				$("#att").val(att);
				doCancelAttachment();
				showPictureAttachment(TYPE);
			}
		});
	}else{
		doCancelAttachment();
		showPictureAttachment(TYPE);
	}
	
}

//删除图片
function removeAttachment(){
	var photos = $('.attachment');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePictureText').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemovePic').show();
	}
}

//取消删除图片
function doCancelAttachment(){
	$('#removePictureText').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic').hide();
}

//执行删除图片
function doRemoveAttachment(TYPE){
	var att = $("#att").val();
	var arr = 0;
	var path = '';
	var chk = $('.picturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapperAttachment input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapperAttachment input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		$.post("../deleteAttachmentPic.action",{
			att : att,
			attType:1,
			path : path
		}, function(data) {
			if (data.code < 0) {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				refreshAttachment(TYPE);
			}
		});
		doCancelAttachment();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}

//显示图片
function showPictureAttachment(TYPE) {
	if ($("#attachmentDlg").length == 0) {
		appendAttachmentImgDlg(TYPE);
		$.parser.parse($("#attachmentDlg"));
	}
	$('#attachmentDlg').dialog({
		title : '上传及查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapperAttachment").empty();
		},
	});
	$("#imgWrapperAttachment").empty();
	$('#attachmentDlg').dialog('open');
	var att = $("#att").val();
	$.post("../getAttachment.action",{
		att : att,
		attType:1
	}, function(data) {
		if (data.code < 0) {
			$(".attachmentNum").html("（图片：0张 文件：0个）");
			return;
		}
		data = data.body;
		console.log(data.body);
		var path = data[0].path.getRealJsonStr();
		var img = eval('([' + path + '])');
		if (TYPE == "private") {
			var urls = "";
			for(var i in img){
				if(i==0){
					urls += img[i].path;
				}else{
					urls += ","+img[i].path;
				}
			}
			$.post("../upload/getDownloadUrl.action",{
				baseUrls : urls
			},function(data){
				var newUrls = data.split(",");
				loadAttachmentImg(TYPE, img, newUrls);
			});
		} else if (TYPE == "public") {
			loadAttachmentImg(TYPE, img, img);
		} else {
			alert("系统异常");
			return;
		}
	});
}

//刷新
function refreshAttachment(TYPE){
	doCancelAttachment();
	showPictureAttachment(TYPE);
}

//加载预览图
function loadAttachmentImg(TYPE, img, newUrls){
	var imgNum = 0;
	var fileNum = 0;
	if (TYPE == 'private') {
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			var j = parseInt(i) + parseInt(img.length);
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapperAttachment').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapperAttachment .fileList').append('<li>' +
					'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
					'<a href="'+newUrls[i]+'" class="attachment" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
					'</li>');
				fileNum++;
			}else{
				if(imgNum == 0){
					$('#imgWrapperAttachment').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapperAttachment .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="attachmentImg attachment" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
	} else {
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapperAttachment').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapperAttachment .fileList').append('<li>' +
					'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
					'<a href="'+img[i].path+'" class="attachment" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
					'</li>');
				fileNum++;
			}else{
				if(imgNum == 0){
					$('#imgWrapperAttachment').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapperAttachment .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="attachmentImg attachment" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
	}
	
	$(".attachmentNum").html("（图片：" + imgNum + "张 文件：" + fileNum + "个）");
	$(".attachmentImg").colorbox({
		rel : 'attachmentImg',
		transition : "none",
		width : "60%",
		height : "90%"
	});
}

//动态加载上传对话框
function appendAttachmentImgDlg(TYPE){
	var html = ['<div id="attachmentDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">',
		'	<div style="padding:5px 0 0 10px;">',
		'		<a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadAttachment(\'' + TYPE + '\')">上传</a>',
		'		<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removeAttachment()">选择删除</a> ',
		'		<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refreshAttachment(\'' + TYPE + '\')">刷新</a> ',
		'		<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>',
		'	</div>',
		'	<div id="removePictureText" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>',
		'	<div style="clear:both"></div>',
		'	<left>',
		'		<div id="doRemovePic" style="margin:10px 0 0 10px;display:none;">',
		'			<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemoveAttachment(\'' + TYPE + '\')">删除</a> ',
		'			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancelAttachment()">取消</a>',
		'		</div>',
		'	</left>',
		'	<div id="imgWrapperAttachment" style="margin:10px 0 0 10px;"></div>',
	
		'</div>'].join("");
	$("body").append(html);
}
/***********************************************************预先上传end****************************************************************/

/***********************************************************att2**************************************************************/
/***********************************************************预先上传start**************************************************************/
/**
 * 使用方法：
 * <a class="easyui-linkbutton" iconCls="icon-fujian" plain="false" onclick="openAttachment('private')">上传</a>
 * <span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
 * 
 * 参数说明
 * TYPE: private（私有） | public（公开） 私有上传需要下载凭证，公开不需要
 * 特别注意：
 * “添加xx对话框”的关闭事件里要调用clearAttachment()清除att
 * “添加xx对话框”点击提交时isSave要置为true
 */

var isSave = false;
//清除att2
function clearAttachment2(){
	var att2 = $("#att2").val();
	if (att2 != "") {
		if (isSave) {
			$.post("../deleteAttachment.action", {
				att2 : att2,
				attType:2
			});
		} else {
			$.post("../deleteAttachmentAndFile.action", {
				att2 : att2,
				attType:2
			});
		}
	}
	$('#att2').val('');
	$('.attachmentNum').html('（图片0张    文件0个）');
	isSave = false;
}

//上传
function uploadAttachment2(TYPE){
	$("#type").val("1");
	$('#uploadDlg').dialog({
		title : '上传',
		top : getTop(464),
		left : getLeft(600),
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refreshAttachment2(TYPE);
		}
	});
	var url = "";
	if (TYPE == 'private') {
		url = '../upload/getUpTokenCallback.action';
	} else if (TYPE == 'public') {
		url = '../pubupload/getUpTokenCallback.action';
	} else {
		alert("上传功能出错，请联系管理员处理");
		return;
	}
	creatQrAttachment2(TYPE);
	$.post(url, function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$("#token").val(token);
		$("#co").val(co);
		initUploader();
		$('#uploadDlg').dialog('open');
		console.log('att2='+$("#att2").val());
	});
}

//生成二维码
function creatQrAttachment2(TYPE){
	console.log("att2=="+$("#att2").val());
	var url = "";
	if (TYPE == 'private') {
		url = '../upload/getMobUploadUrl.action';
	} else if (TYPE == 'public') {
		url = '../pubupload/getMobUploadUrl.action';
	} else {
		alert("系统异常");
		return;
	}
	
	$.post(url, {
		att2 : $("#att2").val()
	}, function(data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		console.log("att2==---"+$("#att2").val());
		console.log('qr='+data);
	});
}

//查看图片
function openAttachment2(TYPE) {
	if($("#att2").val()==""){
		var att2 = parseInt((Math.random()*9+1)*10000000);
		console.log("att2:"+att2);
		$.post("../insertAttachment.action",{
			att2 : att2,
		},function(data){
			if (data.code < 0) {
				$.messager.alert('消息','服务器异常，请重试',"error");
				return;
			}else{
				$("#att2").val(att2);
				doCancelAttachment2();
				showPictureAttachment2(TYPE);
			}
		});
	}else{
		doCancelAttachment2();
		showPictureAttachment2(TYPE);
	}
}

//删除图片
function removeAttachment2(){
	var photos = $('.attachment');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePictureText2').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemovePic2').show();
	}
}

//取消删除图片
function doCancelAttachment2(){
	$('#removePictureText2').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic2').hide();
}

//执行删除图片
function doRemoveAttachment2(TYPE){
	var att2 = $("#att2").val();
	var arr = 0;
	var path = '';
	var chk = $('.picturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapperAttachment2 input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapperAttachment2 input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		$.post("../deleteAttachmentPic.action",{
			att2 : att2,
			attType:2,
			path : path
		}, function(data) {
			if (data.code < 0) {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				refreshAttachment2(TYPE);
			}
		});
		doCancelAttachment2();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}

//显示图片
function showPictureAttachment2(TYPE) {
	if ($("#attachmentDlg2").length == 0) {
		appendAttachmentImgDlg2(TYPE);
		$.parser.parse($("#attachmentDlg2"));
	}
	$('#attachmentDlg2').dialog({
		title : '上传及查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapperAttachment2").empty();
		},
	});
	$("#imgWrapperAttachment2").empty();
	$('#attachmentDlg2').dialog('open');
	var att2 = $("#att2").val();
	$.post("../getAttachment.action",{
		att2 : att2,
		attType :2
	}, function(data) {
		if (data.code < 0) {
			$(".attachmentNum").html("（图片：0张 文件：0个）");
			return;
		}
		data = data.body;
		var path = data[0].path.getRealJsonStr();
		var img = eval('([' + path + '])');
		if (TYPE == "private") {
			var urls = "";
			for(var i in img){
				if(i==0){
					urls += img[i].path;
				}else{
					urls += ","+img[i].path;
				}
			}
			$.post("../upload/getDownloadUrl.action",{
				baseUrls : urls
			},function(data){
				var newUrls = data.split(",");
				loadAttachmentImg2(TYPE, img, newUrls);
			});
		} else if (TYPE == "public") {
			loadAttachmentImg2(TYPE, img, img);
		} else {
			alert("系统异常");
			return;
		}
	});
}

//刷新
function refreshAttachment2(TYPE){
	doCancelAttachment2();
	showPictureAttachment2(TYPE);
}

//加载预览图
function loadAttachmentImg2(TYPE, img, newUrls){
	var imgNum = 0;
	var fileNum = 0;
	if (TYPE == 'private') {
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			var j = parseInt(i) + parseInt(img.length);
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapperAttachment2').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapperAttachment2 .fileList').append('<li>' +
					'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
					'<a href="'+newUrls[i]+'" class="attachment" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
					'</li>');
				fileNum++;
			}else{
				if(imgNum == 0){
					$('#imgWrapperAttachment2').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapperAttachment2 .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="attachmentImg attachment" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
	} else {
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapperAttachment2').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapperAttachment2 .fileList').append('<li>' +
					'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
					'<a href="'+img[i].path+'" class="attachment" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
					'</li>');
				fileNum++;
			}else{
				if(imgNum == 0){
					$('#imgWrapperAttachment2').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapperAttachment2 .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="attachmentImg attachment" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
	}
	
	$(".attachmentNum").html("（图片：" + imgNum + "张 文件：" + fileNum + "个）");
	$(".attachmentImg").colorbox({
		rel : 'attachmentImg',
		transition : "none",
		width : "60%",
		height : "90%"
	});
}

//动态加载上传对话框
function appendAttachmentImgDlg2(TYPE){
	var html = ['<div id="attachmentDlg2" style="padding:6px;" class="easyui-dialog" data-options="closed:true">',
		'	<div style="padding:5px 0 0 10px;">',
		'		<a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadAttachment2(\'' + TYPE + '\')">上传</a>',
		'		<a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removeAttachment2()">选择删除</a> ',
		'		<a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refreshAttachment2(\'' + TYPE + '\')">刷新</a> ',
		'		<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>',
		'	</div>',
		'	<div id="removePictureText2" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>',
		'	<div style="clear:both"></div>',
		'	<left>',
		'		<div id="doRemovePic2" style="margin:10px 0 0 10px;display:none;">',
		'			<a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemoveAttachment2(\'' + TYPE + '\')">删除</a> ',
		'			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancelAttachment2()">取消</a>',
		'		</div>',
		'	</left>',
		'	<div id="imgWrapperAttachment2" style="margin:10px 0 0 10px;"></div>',
		
		'</div>'].join("");
	$("body").append(html);
}
/***********************************************************预先上传end****************************************************************/