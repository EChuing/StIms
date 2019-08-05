var _element = null;
$(function(){
        noticeQueryAll();
    //富文本框样式初始化
    $('.summernote').ready(function () {
        $('.summernote').summernote({
            lang: 'zh-CN',
            height: 180,                 // set editor height
            minHeight: null,             // set minimum height of editor
            maxHeight: null,             // set maximum height of editor
            focus: true                  // set focus to editable area after initializing summernote
        });
    });
        //表格双击事件
        $('#table').on('dbl-click-row.bs.table',function(row,element,field){
            $('#scranModal').modal('show');
            _element = element;
            $('#noticeAuthor3').val(element.dnId);
            $('#noticeTitle3').val(element.dnTitle);
            $('#noticeType3').val(element.dnType);
            $('.summernote').eq(2).summernote('code',element.dnContent);
            $('#noticeAuthor3').val(element.suStaffName);
            $('#noticeTime3').val(element.dnTime);
            console.log(element.dnType);
        })
        //表格单击事件，把行数据放入全局变量
        $('#table').on('click-row.bs.table',function(row,element,field){
            _element=element;
        })
        for (var i in _noticeType) {
            $('#noticeType').append(
                "<option value='" + _noticeType[i] + "'>" + _noticeType[i] + "</option>");
            $('#noticeType2').append(
                "<option value='" + _noticeType[i] + "'>" + _noticeType[i] + "</option>");
        }
        //初始化validator验证插件
        validInsert();
        validUpdate();

        $('#uploadDlg6').on('hide.bs.modal', function () {
            closeUploader();
            doCancelAttachment6();
        })
})
//=====================================================================================================
function noticeQueryAll(){
    $('#table').bootstrapTable('destroy');
    $('#table').bootstrapTable({
        url: '../noticeQueryAll.action',
        queryParamsType : 'undefined',
        queryParams: function queryParams(params) {   // 设置查询参数
            var param = {
                startNum: (params.pageNumber - 1) * params.pageSize,
                endNum: params.pageSize
            };
            return param;
        },
        cache: false,
        showColumns: true,
        showToggle: true,
        pagination: true,
        paginationPreText: '<<',
        paginationNextText: '>>',
        sidePagination: 'server',
        pageList: [],
        pageNumber: 1,
            pageSize: 10,
        toolbar: '#form-performance',
    });
}

function updateNotice(){
    var element = _element;
    console.log(element);
    if(element != null){
        $('#dnId').val(element.dnId);
        $.post("../noticeQueryAll.action",{
            dnId    :element.dnId
        },function(data){
            console.log(data);
            var num = data.rows[0].fileImgNum;
            console.log(num);
            if (num != null && num != "") {
                var img = num.split('/')[0];
                var file = num.split('/')[1];
                $(".attachmentNum7").html("（图片：" + img + "张    文件：" + file + "个）");
            } else {
                $(".attachmentNum7").html("（图片：0张    文件：0个）");
            }
        });
        $('#updateModal').modal('show');
        $('#noticeAuthor2').val(element.dnId);
        $('#noticeTitle2').val(element.dnTitle);
        $('#noticeType2').val(element.dnType);
        $('.summernote').eq(1).summernote('code',element.dnContent);
        $('#noticeAuthor2').val(element.suStaffName);
        $('#noticeTime2').val(element.dnTime);
    }else{
        $('#warmByUpdate').modal('show');
    }
}
function deleteNotice(){
    var element = _element;
    if(element != null){
        $('#deleteModal').modal('show');
    }else{
        $('#warmByUpdate').modal('show');
    }
}
function executeDelete() {
    var element = _element;
    var noticeId = element.dnId;
    $.post("../deleteNotice.action",{
        dnId : noticeId
    },function (data) {
        console.log(JSON.stringify(data));
        _element=null;
        noticeQueryAll();
    });
}
// 执行更新公告
function executeUpdate(){
    var element =_element;
    var noticeId = element.dnId;
    var noticeTitle = $('#noticeTitle2').val();
    var noticeType = $('#noticeType2').val();
    var noticeContent = $('.summernote').eq(1).summernote('code');
    $.post("../updateNotice.action",{
        dnId : noticeId,
        dnTitle : noticeTitle,
        dnType : noticeType,
        dnContent : noticeContent,
    },function (data) {
        console.log(JSON.stringify(data));
    });
    $("#form2").data('bootstrapValidator').destroy();
    $("#form2").data('bootstrapValidator', null);
    validUpdate();
    $('#dnId').val('');
    $('#updateModal').modal('hide');
    _element=null;
    noticeQueryAll();
}
function validInsert(){
    $("#form1").bootstrapValidator({
        message: 'This value is not valid',
        live:'submitted',
        submitButtons: 'button[type="submit"]',
        fields: {
            title: {
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    }
                }
            },
            type: {
                validators: {
                    notEmpty: {
                        message: '类型不能为空'
                    }
                }
            },
            content: {
                validators: {
                    notEmpty: {
                        message: '内容不能为空'
                    }
                }
            }
        }
    });
}
function validUpdate(){
    $("#form2").bootstrapValidator({
        message: 'This value is not valid',
        live:'submitted',
        submitButtons: 'button[type="submit"]',
        fields: {
            title2: {
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    }
                }
            },
            type2: {
                validators: {
                    notEmpty: {
                        message: '类型不能为空'
                    }
                }
            },
            content2: {
                validators: {
                    notEmpty: {
                        message: '内容不能为空'
                    }
                }
            }
        }
    });
}
function clearInsertValid() {
    $('#noticeTitle').val('');
    $('#noticeType').val('');
    $('#noticeContent').val('');
    $('.summernote').eq(0).summernote('code', '');
    $("#form1").data('bootstrapValidator').destroy();
    $("#form1").data('bootstrapValidator', null);
    validInsert();
    clear();
}
function clearUpdateValid() {
    $("#form2").data('bootstrapValidator').destroy();
    $("#form2").data('bootstrapValidator', null);
    validUpdate();
}
function insertValid(){
    if ($('.summernote').eq(0).summernote('isEmpty')) {
        $('#warm1').modal('show');
        clearInsertValid();
    } else {
        yanzheng();
        if (yanzhengbool())
            addNotice();
    }
}
function updateValid(){
    if ($('.summernote').eq(1).summernote('isEmpty')) {
        $('#warm1').modal('show');
        $('#updateModal').modal('hide');
        clearUpdateValid();
    } else {
        yanzheng2();
        if (yanzhengbool2())
            executeUpdate();
    }
}

function yanzheng() {
    $("#form1").data("bootstrapValidator").validate();
}
function yanzhengbool() {
    var flag = $("#form1").data("bootstrapValidator").isValid();
    return flag;
}
function yanzheng2() {
    $("#form2").data("bootstrapValidator").validate();
}
function yanzhengbool2() {
    var flag = $("#form2").data("bootstrapValidator").isValid();
    return flag;
}
// 执行添加公告
function addNotice() {
    var noticeId = _loginUserId;
    var noticeTitle = $('#noticeTitle').val();
    var noticeType = $('#noticeType').val();
    var noticeContent = $('.summernote').eq(0).summernote('code');
    var att = $('#att').val();
    $.post("../getAttachment.action", {
        att: att
    }, function (data) {
        data = data.body;
        console.log(data);
        if (data == null || data == "") {
        } //不上传
        else {//上传
            console.log(data[0].path)
            var fileImgPath = "[" + data[0].path.getRealJsonStr() + "]".getRealJsonStr();
            var fileImgNum = data[0].num;
        }
        $.post("../insertNotice.action", {
            dnUserId: noticeId,
            dnTitle: noticeTitle,
            dnType: noticeType,
            dnContent: noticeContent,
            fileImgPath: fileImgPath,
            fileImgNum: fileImgNum
        }, function (data) {
            console.log(JSON.stringify(data));
        });
        $('#insertModal').modal('hide');
        clearInsertValid();
        noticeQueryAll();
    });
}

// ==================================================================================================================
function insertNoticeBt(){
    $('#insertModal').modal('show');
    $('.attachmentNum6').html('（图片0张    文件0个）');
    $('.attachmentNum8').html('（图片0张    文件0个）');
}
function scanPic(){
    var dnId=_element.dnId;
    $.post("../noticeQueryAll.action",{
        dnId   :    dnId
    },function (data) {
        var path=data.rows[0].fileImgPath;
        if(path != null && path != "") {
            $('#hideFirst').hide();
            doCancelAttachment6();
            showPictureAttachment7();
        }else{
            $('#imgShow').modal('show');
        }
    })
}
var isSave = false;
//清除att
function clearAttachment6() {
    var att = $("#att").val();
    if (att != "") {
        if (isSave) {
            $.post("../deleteAttachment.action", {
                att: att,
                attType: 1
            });
        } else {
            $.post("../deleteAttachmentAndFile.action", {
                att: att,
                attType: 1
            });
        }
    }
    $('#att').val('');
    $('.attachmentNum6').html('（图片0张    文件0个）');
    $('.attachmentNum8').html('（图片0张    文件0个）');
    isSave = false;
}

//删除图片，删除att
function clear() {
    clearAttachment6();
    $("#imgWrapperAttachment6").empty();
}

//电脑上传
function upload_file_img6() {
    $.post('../pubupload/getUpTokenCallback.action', function (data) {
        var token = data.split('#####')[0];
        var co = data.split('#####')[1];
        var att = $('#att').val();
        $('#token').val(token);
        $('#co').val(co);
        initUploader();//初始化上传文件
        creat_file_qr();//初始化上传二维码
        $('#uploadDlg6').modal('show');
    });
}
//手机上传
function creat_file_qr() {
    var att = $('#att').val();
    $.post("../pubupload/getMobUploadUrl.action", {
        att: att,
    }, function (data) {
        $('#qrcode').empty();
        $('#qrcode').qrcode({
            width: 120,
            height: 120,
            text: data
        });
        $('#qrcodeDlg').modal('show')
    });
}
//点击上传及查看图片按钮触发
function openAttachment6() {
    $('#hideFirst').show();
    if ($("#att").val() == "") {//判断att输入框是否为空
        var att = parseInt((Math.random() * 9 + 1) * 10000000);//为空，创建9为随机数
        console.log("att:" + att);
        $.post("../insertAttachment.action", {//jour_upload_tmp表插入一条新数据
            att: att,
        }, function (data) {
            if (data.code < 0) {//插入失败报错
                alert('服务器异常，请重试');
                return;
            } else {
                $("#att").val(att);//成功把9位随机数插入att输入框
                doCancelAttachment6();//隐藏所有删除图片的div
                showPictureAttachment6();//显示图片
            }
        });
    } else {
        doCancelAttachment6();
        showPictureAttachment6();
    }
}
//点击删除图片
function removeAttachment6() {
    var photos = $('.attachment6');
    if (photos.length == 0) {//如果class为attachment的元素为0
        alert('没有图片可以删除');
    } else {
        $('#removePictureText6').html('请选择要删除的图片').show();
        $('.picturecheck6').show();
        $('#doRemovePic6').show();
    }
}
// 取消删除图片
function doCancelAttachment6() {
    $('#removePictureText6').hide();//隐藏删除提醒文本
    $('.picturecheck6').hide().removeAttr('checked');//隐藏复选框
    $('#doRemovePic6').hide();//隐藏删除和取消按钮
}
//执行删除图片
function doRemoveAttachment6() {
    var att = $('#att').val();
    var arr = 0;
    var path = '';
    var name = '';
    var chk = $('.picturecheck6');
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            arr++;
        }
    }
    if (arr > 0) {
        $("#imgWrapperAttachment6 input[name='image']:checked").each(function () { // 遍历选中的checkbox
            path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
            name += $(this).parent().children("img").attr('title') + ',';
            $(this).parent("div").remove();  // 删除包含当前图片的那个div
        });
        $("#imgWrapperAttachment6 input[name='other']:checked").each(function () { // 遍历选中的checkbox
            path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
            name += $(this).parent().children("a").html() + ',';
            $(this).parent("div").remove();  // 删除包含当前图片的那个div
        });
        path = path.substring(0, path.length - 1);//去掉最后一个逗号
        name = name.substring(0, name.length - 1);
        $.post("../deleteAttachmentPic.action", {
            att: att,
            attType: 1,
            path: path
        }, function (data) {
            if (data.code < 0) {
                console.log('删除失败！', 'error');
                return;
            } else {
                console.log('删除成功！', 'success');
                refreshAttachment6();
            }
        });
        doCancelAttachment();
    } else {
        alert('未选中任何图片');
    }
}
// 显示图片
function showPictureAttachment6() {
    $("#imgWrapperAttachment6").empty();//清空 文件列表、图片列表div
    if ($('#attachmentDlg6').css('display') == "none") {//判断上传及查看图片窗口是否为打开状态
        $('#attachmentDlg6').modal('show');	//打开附件窗口
    }
    var att = $("#att").val();
    $.post("../getAttachment.action", {
        att: att,
        attType: 1//规定类型，为一张表
    }, function (data) {
        if (data.code < 0) {
            $(".attachmentNum6").html("（图片：0张 文件：0个）");
            $(".attachmentNum8").html("（图片：0张 文件：0个）");
            return;
        }
        data = data.body;
        var path = data[0].path.getRealJsonStr();
        console.log(path);
        var img = eval('([' + path + '])');
        loadAttachmentImg6(img);
    });
}
//刷新
function refreshAttachment6() {
    doCancelAttachment6();
    showPictureAttachment6();
}
//加载预览图
function loadAttachmentImg6(img) {
    var imgNum = 0;//=================图片个数
    var fileNum = 0;//================文件个数
    for (var i in img) {
        console.log(img[i].path);
        var strs = img[i].path.split(".");
        var ext = strs[strs.length - 1];//获取后缀
        if (ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png") {
            if (fileNum == 0) {//如果文件个数为0
                $('#imgWrapperAttachment6').append('<div style="clear:both"><ul class="fileList" style="list-style: none"><li style="font-size:16px;">文件列表：</li></ul>');//追加文件列表
            }
            $('#imgWrapperAttachment6 .fileList').append('<li>' +
                '<input name="other" class="picturecheck6" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
                '<a href="' + img[i].path + '" class="attachment6" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">' + img[i].name + '</a>' +
                '</li>');
            fileNum++;
        } else {
            if (imgNum == 0) {//如果图片个数为0
                $('#imgWrapperAttachment6').append('<div style="clear:both"><ul class="imageList" style="list-style: none"><li style="font-size:16px;">图片列表：</li></ul>');
            }
            $('#imgWrapperAttachment6 .imageList').append('<li style="float:left;position:relative;">' +
                '<img title="' + img[i].name + '" class="attachmentImg attachment6" style="display:inline-block;width:150px;height:150px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="' + img[i].path + '" src="' + img[i].path + '">' +
                '<input name="image" class="picturecheck6" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
                '<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
                '</li>');
            imgNum++;
        }
    }
    $(".attachmentNum6").html("（图片：" + imgNum + "张 文件：" + fileNum + "个）");
    $(".attachmentNum8").html("（图片：" + imgNum + "张 文件：" + fileNum + "个）");
    $(".attachmentImg").colorbox({
        rel : 'attachmentImg',
        transition : "none",
        width : "60%",
        height : "90%"
    });
}

/****************************************************************************附件上传end**************************************************************************************/

/****************************************************************************修改上传start**************************************************************************************/
//查看图片
function openAttachment7() {
    $('#hideFirst').show();
    doCancelAttachment6();
    showPictureAttachment7();
}
//删除图片
function removeAttachment6() {
    var photos = $('.attachment6');
    if (photos.length == 0) {//attachment6元素个数为0
        alert('没有图片可以删除');
    } else {
        $('#removePictureText6').html('请选择要删除的图片').show();
        $('.picturecheck6').show();
        $('#doRemovePic6').show();
    }
}
//执行删除图片
function doRemoveAttachment7() {
    var dnId = $('#dnId').val();
    var arr = 0;
    var path = '';
    var name = '';
    var chk = $('.picturecheck6');
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            arr++;
        }
    }
    if (arr > 0) {
        $("#imgWrapperAttachment6 input[name='image']:checked").each(function () { // 遍历选中的checkbox
            path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
            name += $(this).parent().children("img").attr('title') + ',';
            $(this).parent("div").remove();  // 删除包含当前图片的那个div
        });
        $("#imgWrapperAttachment6 input[name='other']:checked").each(function () { // 遍历选中的checkbox
            path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
            name += $(this).parent().children("a").html() + ',';
            $(this).parent("div").remove();  // 删除包含当前图片的那个div
        });
        path = path.substring(0, path.length - 1);//去掉最后一个逗号
        console.log(path);
        name = name.substring(0, name.length - 1);
        $.post("../deleteNoticePic.action", {
            dnId: dnId,
            fileImgPath : path
        }, function (data) {
            if (data.code < 0) {
                console.log('更新失败！', 'error');
                return;
            } else {
                console.log('更新成功！', 'success');
                refreshAttachment7();
            }
        });
        doCancelAttachment6();
    } else {
        alert('未选中任何图片');
    }
}
// 显示图片
function showPictureAttachment7() {
    $("#imgWrapperAttachment6").empty();//清空 文件列表、图片列表div
    if ($('#attachmentDlg6').css('display') == "none") {//判断上传及查看图片窗口是否为打开状态
        $('#attachmentDlg6').modal('show');	//打开附件窗口
    }
    var dnId = $('#dnId').val();
    console.log(dnId);
    $.post("../noticeQueryAll.action", {
        dnId: dnId,
    }, function (data) {
        console.log(data)
        var path = data.rows[0].fileImgPath;
        console.log(path)
        if(path != null && path != "") {
            loadAttachmentImg7(path);
        }else{
            $(".attachmentNum7").html("（图片：0张 文件：0个）");
            $(".attachmentNum8").html("（图片：0张 文件：0个）");
        }
    });
}
function refreshAttachment7() {
    doCancelAttachment6();
    showPictureAttachment7();
}
//加载预览图
function loadAttachmentImg7(img) {
    var imgNum = 0;//=================图片个数
    var fileNum = 0;//================文件个数
    for (var i in img) {
        console.log(img[i].path);
        var strs = img[i].path.split(".");//以.分割文件名
        var ext = strs[strs.length - 1];//获取后缀
        if (ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png") {
            if (fileNum == 0) {//判断后缀类型，如果文件个数为0
                $('#imgWrapperAttachment6').append('<div style="clear:both"><ul class="fileList" style="list-style: none"><li style="font-size:16px;">文件列表：</li></ul>');//追加文件列表
            }
            $('#imgWrapperAttachment6 .fileList').append('<li>' +
                '<input name="other" class="picturecheck6" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
                '<a href="' + img[i].path + '" class="attachment6" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">' + img[i].name + '</a>' +
                '</li>');
            fileNum++;
        } else {
            if (imgNum == 0) {//如果图片个数为0
                $('#imgWrapperAttachment6').append('<div style="clear:both"><ul class="imageList" style="list-style: none"><li style="font-size:16px;">图片列表：</li></ul>');
            }
            $('#imgWrapperAttachment6 .imageList').append('<li style="float:left;position:relative;">' +
                '<img title="' + img[i].name + '" class="attachmentImg attachment6" style="display:inline-block;width:150px;height:150px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="' + img[i].path + '" src="' + img[i].path + '">' +
                '<input name="image" class="picturecheck6" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
                '<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
                '</li>');
            imgNum++;
        }
    }
    $(".attachmentNum7").html("（图片：" + imgNum + "张 文件：" + fileNum + "个）");
    $(".attachmentNum8").html("（图片：" + imgNum + "张 文件：" + fileNum + "个）");
    $(".attachmentImg").colorbox({
        rel : 'attachmentImg',
        transition : "none",
        width : "60%",
        height : "90%"
    });
}

