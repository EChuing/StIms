var row={};
var _rows="";
var _userId;//教师Id
$(function() {

    queryStore();
    $('#storefrontDg').datagrid({
        onClickRow : function(rowIndex, rowData) {
            queryDepartment();
        },
        onDblClickRow : function(rowIndex, rowData) {
            $('.add_storefront_name').val(rowData.storefrontName);
            $('.add_storefront_address').val(rowData.storefrontAddress);
            $('.add_storefront_note').val(rowData.storefrontNote);
            $('.add_storefront_id').val(rowData.storefrontId);
            $('#add_storefront_state').val(rowData.storefrontState);
            updateStorefrontDlg();
        }
    });
    $('#departmentDg').datagrid({
        onClickRow : function(rowIndex, rowData) {
            $('#searchSuStaffName').val('');
            queryUser();
        },
        onDblClickRow : function(rowIndex, rowData) {
            $('#add_department_theStore').val(rowData.departmentStorefrontId);
            $('.add_department_address').val(rowData.departmentName);
            $('.add_department_note').val(rowData.departmentNote);
            $('.add_department_id').val(rowData.departmentId);
            $('#add_department_state').val(rowData.departmentState);
            updateDepartmentDlg();
        }
    });
    //查任务类型

    for(var k in _userType){
        $('.add_userType').append("<option value = '"+_userType[k]+"'>"+_userType[k]+"</option>")
    }
    $('#userDg').datagrid({
        onDblClickRow : function(rowIndex, rowData) {
            _userId=rowData.userId
            row = rowData;
            console.log(row);
            $('#addTheStore').val(row.suStoreId);
            $('#addTheDepartment').val(row.suDepartmentId);
            $('.add_userId').val(row.userId);
            $('.add_permissions').val(row.suPermissionsId);
            $('.add_userType').val(row.suType);

            $('.add_userName').val(row.suStaffName);
            $('.add_userPhone').val(row.suContact);
            $('.add_userIdCard').val(row.suIdcard);
            $('.add_chooseRoomNumber').val(row.suChooseRoomLimit);
            $('.add_checkType').val(row.suMd5CheckType);
            $('.add_check').val(row.suMd5Check);

            for (var i in _bankType) {
                if (row.suBankType == _bankType[i]) {
                    $('.add_userBankType').val(i);
                }
            }
            for(var i in _userInfoData){
                if (row.suSuperior == _userInfoData[i]["userId"]) {
                    $("#doEventGetUserStoreId").val(_userInfoData[i]["suStoreId"]);
                    $("#doEventGetUserDetId").val(_userInfoData[i]["suDepartmentId"]);
                    $("#doEventGetUserId").val(_userInfoData[i]["userId"]);
                    $("#doEventShowUserInfo").val(_userInfoData[i]["storefrontName"]+" "+_userInfoData[i]["departmentName"]+" "+_userInfoData[i]["suStaffName"]);
                }
            }
            console.log(row);
            $(".currentAddress").val(row.currentAddress);
            $(".servicememotextnull").val(row.servicememotextnull);
            $(".remark").val(row.remark);
            $(".nativeplace").val(row.nativeplace);
            $(".linkman").val(row.linkman);
            $(".linkmanphone").val(row.linkmanphone);

            if(row.marriage ==''||row.marriage == null){
                $("#marriage").find("opton[value = '0']").prop("selected","selected");
            }else{
                $("#marriage").find("option[value="+row.marriage+"]").prop("selected","selected");

            }
            if(row.linkmanrelation == '' || row.linkmanrelation == null){
                $("#linkmanrelation").find("opton[value = '0']").prop("selected","selected");
            }else{
                $("#linkmanrelation").find("option[value ="+row.linkmanrelation+"]").prop("selected","selected");

            }

            if(row.suDiscountAuthPassword !='' && row.suDiscountAuthPassword != null) {
                var jsonStr = row.suDiscountAuthPassword.getRealJsonStr();
                console.log(jsonStr);
                var suPsd =JSON.parse(jsonStr);
                console.log(suPsd);
                var authPsd = suPsd.authPassword;
                var cardPsd = suPsd.cardPassword;
                var psd =$("#authPassword").val(authPsd);
                var psd =$("#cardPassword").val(cardPsd);
            }
//			$("#linkmanrelation").find("option[value ="+row.linkmanrelation+"]").prop("selected","selected");
//			$("#marriage").find("option[value="+row.marriage+"]").prop("selected","selected");
            //$('#addUserIdCard').val(row.suIdcard);
            $('#add_userState').val(row.suState);
            $('.add_userBankNum').val(row.suBankCardNum);
            $('.add_userAccount').val(row.suName);
            $('.add_userPassword').val(row.suPassword);
            $('.userAddress').val(row.sustaffaddress);
            $('.userNation').val(row.sustaffnation);
            $('#doorCardNum').val(row.suCardNumber);

            if(row.sustaffidimgpers == ''||row.sustaffidimgpers == null){
                $("#userImsphoto").attr("src","images/userImage.png");
            }else{
                $('#userImsphoto').attr("src","data:image/jpg;base64,"+row.sustaffidimgpers);
            }

            if(row.sufollow != null && row.sufollow !=""){
                personalinformationroot(row.sufollow);
            }else{
                $("#followUpInformationTable1").attr("style","display:none");
            }
            updateUserDlg();
        }
    });
    for (var i in _bankType) {
        $(".add_userBankType").append("<option value='" + i + "'>" + _bankType[i] + "</option>");
    }
    for (var i in _storeState) {
        $(".searchStorefrontState").append("<option value='" + _storeState[i] + "'>" + _storeState[i] + "</option>");
    }
    $("#searchStorefrontState").append("<option value=''>全部</option>");
    for (var i in _departmentState) {
        $(".searchDepartmentState").append("<option value='" + _departmentState[i] + "'>" + _departmentState[i] + "</option>");
    }
    $("#searchDepartmentState").append("<option value=''>全部</option>");
    for (var i in _userState) {
        $(".searchSuStaffState").append("<option value='" + _userState[i] + "'>" + _userState[i] + "</option>");
    }
    $.post("../queryStorefront.action",{
        storefrontState: '正常'
    }, function(data) {
        if (data.code < 0) {
            $.messager.alert('通知', '查询区域失败', 'error');
            return;
        }
        data = data.body;

        $('.add_theStore').html('<option></option>');
        for (var i in data) {
            $(".add_theStore").append("<option value='" + data[i].storefrontId + "'>" + data[i].storefrontName + "</option>");
        }
    });
    $.post("../selectAll.action", function(data) {
        /*if (data.code < 0) {
            $.messager.alert('通知', '查询权限失败', 'error');
            return;
        }*/
        if(data.code>0){
            data = data.body;
            for (var i in data) {
                $(".add_permissions").append("<option value='" + data[i].spId + "'>" + data[i].spName + "</option>");
            }
        }
    }, "json");
    $(".add_userAccount").on('blur',function(){
        $.post("../getUsername.action",{
            suName : $(this).val()
        },function(data){

            if(data.code>0){
                $("#errMsg1").html("用户账号已存在");
            }
        });
    });
    queryStorefront();
});
//修改区域（按钮）
function uppStorefront(){
    var row = $('#storefrontDg').datagrid('getSelected');
    $('.add_storefront_name').val(row.storefrontName);
    $('.add_storefront_address').val(row.storefrontAddress);
    $('.add_storefront_note').val(row.storefrontNote);
    $('.add_storefront_id').val(row.storefrontId);
    $('#add_storefront_state').val(row.storefrontState);
    updateStorefrontDlg();
}
//修改部门（按钮）
function uppDepartment(){
    var row = $('#departmentDg').datagrid('getSelected');
    $('#add_department_theStore').val(row.departmentStorefrontId);
    $('.add_department_address').val(row.departmentName);
    $('.add_department_note').val(row.departmentNote);
    $('.add_department_id').val(row.departmentId);
    $('#add_department_state').val(row.departmentState);
    updateDepartmentDlg();
}
// 查询区域
function queryStorefront() {
    var storefrontState = $("#searchStorefrontState").find("option:selected").val();
    $.post("../queryStorefront.action", {
        storefrontState:storefrontState
    }, function(data) {
        if (data.code < 0) {
            var noData = [];
            $('#storefrontDg').datagrid({
                data : noData,
                view : myview,
                emptyMsg : data.msg
            });
            $('#departmentDg').datagrid({
                data : noData,
                view : myview,
                emptyMsg : data.msg
            });
            $('#userDg').datagrid({
                data : noData,
                view : myview,
                emptyMsg : data.msg
            });
        } else {
            $("#storefrontDg").datagrid("loadData", data.body);
            $('#storefrontDg').datagrid('selectRow', 0);
            queryDepartment();
        }
    }, "json");
}
// 查询部门
function queryDepartment() {
    var row = $('#storefrontDg').datagrid('getSelected');
    var departmentState = $("#searchDepartmentState").find("option:selected").val();
    $("#searchUser input").val('');
    $.post("../queryDepartment.action", {
        departmentStorefrontId : row.storefrontId,
        departmentState:departmentState,
    }, function(data) {
        console.log(data)
        if (data.code < 0) {
            var noData = [];
            $('#departmentDg').datagrid({
                data : noData,
                view : myview,
                emptyMsg : data.msg
            });
            $('#userDg').datagrid({
                data : noData,
                view : myview,
                emptyMsg : data.msg
            });
        } else {
            $("#departmentDg").datagrid("loadData", data.body);
            $('#departmentDg').datagrid('selectRow', 0);
            queryUser();
        }
    }, "json");
}
// 查询用户
function queryUser() {
    var row = $('#departmentDg').datagrid('getSelected');
    var suStaffName = $("#searchSuStaffName").val();
    var suState = $("#searchSuStaffState").find("option:selected").val();
    $.post("../queryUserById.action", {
        suDepartmentId : row.departmentId,
        suStaffName : suStaffName,
        suState:suState,
    }, function(data) {
        if (data.code < 0) {
            $('#userDg').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
        } else {
            $("#userDg").datagrid("loadData", data.body);
            $('#userDg').datagrid('selectRow', 0);
        }
    }, "json");
}
// 新增区域对话框
function addStorefrontDlg() {
    $("#addStorefrontDlg").dialog({
        title : '新增区域',
        top : getTop(200),
        left : getLeft(300),
        width : 300,
        height : 200,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#addStorefrontDlg [clear="clear"]').val('');
            $('#addStorefrontDlg [clean="clean"]').html('');
            $('#addStorefrontDlg [require]').css('border', '1px solid #a9a9a9');
            $("#addStorefrontDlg input").val('');
            $("#addStorefrontDlg textarea").val('');
        }
    });
    $(".do_overDiv").hide();
    $("#saveAddStoreDiv").show();

    $("#saveUpdateStoreDiv").hide();
    $("#addStorefrontDlg").dialog('open');
}
// 新增部门对话框
function addDepartmentDlg() {
    $("#addDepartmentDlg").dialog({
        title : '新增部门',
        top : getTop(200),
        left : getLeft(300),
        width : 300,
        height : 200,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#addDepartmentDlg [clear="clear"]').val('');
            $('#addDepartmentDlg [clean="clean"]').html('');
            $('#addDepartmentDlg [require]').css('border', '1px solid #a9a9a9');
            $("#addDepartmentDlg input").val('');
            $("#addDepartmentDlg select").val('');
            $("#addDepartmentDlg textarea").val('');
        }
    });
    $(".do_overDiv").hide();
    $("#saveAddDepartmentDiv").show();
    $("#saveUpdateDepartmentDiv").hide();
    var row = $('#storefrontDg').datagrid('getSelected');
    $("#add_department_theStore").val(row.storefrontId);
    $("#addDepartmentDlg").dialog('open');
}
// 新增用户对话框
function addUserDlg() {
    $("#addUserDlg").dialog({
        title : '新增用户',
        top : getTop(380),
        left : getLeft(800),
        width : 800,
        height : 440,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#userImsphoto").attr("src","images/userImage.png");
            $("#addUserDlg input").val('');
            $("#addUserDlg select").val('');
            $("#addUserDlg textarea").val('');
            $("#discountAuthDlg [require=required]").val('');
            $("#errMsg1").html('');
            $("#errMsg2").html('');
            $("#existingRelationRoomDg").datagrid("loadData", []);
            $("#addUserDlg input[verify=verify]").each(function () {
                $(this).css("border","1px solid #A9A9A9");
            });
//			$("#doEventShowUserInfo").val('');
//			$("#add_userAccount").val('');
//			$("#add_userPassword").val('');

            $("#addUserDlg input[needs=1]").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
            $("#addUserDlg select[needs=1]").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
            $("#discountAuthDlg [require=required]").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
            $("#suStaffStateDiv").show('');

            $("#imgwrap ul li").remove();
            //隐藏警告语句
            $("#RepeatedWarnings").css('display','none');
            _rows='';
        }
    });
    $(".add_checkType option[value='0']").prop("selected",true);
    $("#appAuth option[value='0']").prop("selected",true);
    $("#authPassword").val('');
    $("#cardPassword").val('');
    $("#astheinformation input").val('');
    $("#astheinformation select").val('');
    $("#astheinformation textarea").val('');
    $("#errMsg1").html('');
    $("#errMsg2").html('');
    $("#followUpInformationTable").hide();
    $("#saveAddUserDiv").show();
    $("#saveUpdateUserDiv").hide();

    $("#saveAddUserDiv1").show();
    $("#saveUpdateUserDiv1").hide();
    $("#saveUsers2").show();
    $("#saveUsers1").hide();
    $("#followUpInformationTable1").attr("style","display:none");

    $("#suStaffStateDiv").hide('');
    $(".do_overDiv").hide();
    $(".add_userPassword").attr("Type","password");
    $("#showPassword").hide();
    $("#managementEquipment").hide();
    $("#managementEquipment1").show();
    var storefrontRow = $('#storefrontDg').datagrid('getSelected');
    var departmentRow = $('#departmentDg').datagrid('getSelected');
    $("#addTheStore").val(storefrontRow.storefrontId);
    storeAndDepartment('add', departmentRow.departmentId);
    $("#addTheStore").attr("disabled", false);
    $("#addTheDepartment").attr("disabled", false);

    $("#addUserDlg").dialog('open');

}
// 执行新增区域
function doAddStorefront() {
    $(".do_overDiv").show();
    var storefrontName = $('.add_storefront_name').val();
    var storefrontAddress = $('.add_storefront_address').val();
    var storefrontNote = $('.add_storefront_note').val();
    $.post('../insertStorefront.action', {
        storefrontName : storefrontName,
        storefrontAddress : storefrontAddress,
        storefrontNote : storefrontNote
    }, function(data) {
        if (data < 0||data=='') {
            myTips('添加失败！！', 'error');
            $(".do_overDiv").hide();
            return;
        }
        queryStorefront();
        myTips('添加成功！', 'success');
        $("#addStorefrontDlg").dialog('close');
        $(".do_overDiv").hide();
        $.post("../queryStorefront.action",{
            storefrontState: '正常'
        }, function(data) {
            if (data.code < 0) {
                $.messager.alert('通知', '查询区域失败', 'error');
                return;
            }
            data = data.body;
            $(".add_theStore").html('<option></option>');
            for (var i in data) {
                $(".add_theStore").append("<option value='" + data[i].storefrontId + "'>"+ data[i].storefrontName + "</option>");
            }
        });
    });
}
// 执行新增部门
function doAddDepartment() {
    $(".do_overDiv").show();
    var departmentStorefrontId = $('#add_department_theStore').val();
    var departmentName = $('.add_department_address').val();
    var departmentNote = $('.add_department_note').val();
    $.post('../insertDepartment.action', {
        departmentStorefrontId : departmentStorefrontId,
        departmentName : departmentName,
        departmentNote : departmentNote,
    }, function(data) {
        console.log(data)
        if (data.code < 0) {
            myTips(data.msg, 'error');
            $(".do_overDiv").hide();
            return;
        }
        var row = $('#storefrontDg').datagrid('getSelected');
        queryDepartment();
        myTips('添加成功！', 'success');
        $("#addDepartmentDlg").dialog('close');
        $(".do_overDiv").hide();

    });
}
// 执行新增用户
function doAddUser() {
    $(".do_overDiv").show();
    var checkFlag = 0;
    $("#addUserDlg input[verify=verify]").each(function(){
        if($(this).val()==""||$(this).val()==null){
            $(this).css("border","1px solid red");
            checkFlag++;
        }
    });
    if(checkFlag > 0){
        myTips("有必填项未填写!","error");
        return;
    }
    $("#astheinformation input[needs=1]").each(function(){
        if($(this).val()==''||$(this).val()==null){
            $(this).css("border","1px solid red");
            checkFlag++;
        }else{
            $(this).css("border","1px solid #A9A9A9");
        }
    });
    $("#astheinformation select[needs=1]").each(function(){
        if($(this).val()==''||$(this).val()==null){
            $(this).css("border","1px solid red");
            checkFlag++;
        }else{
            $(this).css("border","1px solid #A9A9A9");
        }
    });
    if(checkFlag >0){
        myTips("请填写任职详情!","error");
        $('.do_overDiv').hide();
        return;
    }

    var authPassword = $("#authPassword").val();
    var cardPassword = $("#cardPassword").val();
    console.log(authPassword);
    if(authPassword !='' && cardPassword !=''){
        var suDiscountAuthPassword ={
            authPassword:authPassword,cardPassword:cardPassword
        };
        suDiscountAuthPassword =JSON.stringify(suDiscountAuthPassword);
    }

    console.log(suDiscountAuthPassword);

    var suStoreId = $('#addTheStore').val();
    var suDepartmentId = $('#addTheDepartment').val();
    var suPermissionsId = $('.add_permissions').val();
    var suStaffName = $('.add_userName').val();
    var suContact = $('.add_userPhone').val();
    var suIdcard = $('.add_userIdCard').val();
    var suBankType = $('.add_userBankType').find('option:selected').text();
    var suBankCardNum = $('.add_userBankNum').val();
    var suChooseRoomLimit = $('.add_chooseRoomNumber').val();
    var suType = $('.add_userType').val();

    var suMd5CheckType = $('.add_checkType').val();
    var suMd5Check = $('.add_check').val();

    var suSuperior = $("#doEventGetUserId").val();

    var addUserIdCard	=	$("#addUserIdCard").val();	//身份证号码
    var userBirthday	=	$("#userBirthday").val();		//身份证信息
    var userAddress		=	$("#userAddress").val();		//身份证住址
    var userImsphoto	=	$("#userImsphoto").val();		//身份证头像
    var userSex			=	$("#userSex").val();				//身份证性别
    var userNation		=	$("#userNation").val();			//身份证民族
    var userIdIssued	=	$("#userIdIssued").val();		//身份证签发机关
    //var userIssuedData	=	$("#userIssuedData").val();	//身份证签发时间
    var userValidData	=	$("#userValidData").val();	//身份证有效期

    var currentAddress		= $("#currentAddress").val();
    var servicememotextnull	= $("#servicememotextnull").val();
    var remark				= $("#remark").val();
    var nativeplace 		= $("#nativeplace").val();
    var marriage 			= $("#marriage").val();
    var linkman 			= $("#linkman").val();
    var linkmanphone 		= $("#linkmanphone").val();
    var linkmanrelation 	= $("#linkmanrelation").val();

    var suCardNumber		= $("#doorCardNum").val();


    // if(suMd5CheckType!=0&&(suMd5Check==''||suMd5Check==null)){
    //     $('#errMsg1').html('您选择的安全级别不为0，请输入安全加密！');
    //     $('.do_overDiv').hide();
    //     myTips("您选择的安全级别不为0，请输入安全加密", 'error');
    //     return;
    // }


    var suName = $('.add_userAccount').val();
    var suPassword = $('.add_userPassword').val();

    // if(!_regex1.test(suName)){
    //     $('#errMsg1').html('用户名由字母、数字、下划线组成，长度2~16位');
    //     $('.do_overDiv').hide();
    //     myTips('用户名由字母、数字、下划线组成，长度2~16位', 'error');
    //     return;
    // }
    // if(!_regex2.test(suPassword)){
    //     $('#errMsg1').html('密码由字母、数字、符号组成，长度3到16位');
    //     $('.do_overDiv').hide();
    //     myTips('密码由字母、数字、符号组成，长度3到16位', 'error');
    //     return;
    // }

    $.post('../insertUser.action', {
        suCardNumber		: suCardNumber,
        suStoreId 			: suStoreId,
        suDepartmentId 		: suDepartmentId,
        suPermissionsId		: suPermissionsId,
        suStaffName 		: suStaffName,
        suContact 			: suContact,
        suIdcard 			: suIdcard,
        suBankType 			: suBankType,
        suBankCardNum 		: suBankCardNum,
        suChooseRoomLimit	: suChooseRoomLimit,
        suName 				: suName,
        suPassword 			: suPassword,
        suType				: suType,
        suSuperior			: suSuperior,
        suMd5CheckType		: suMd5CheckType,//3
        suMd5Check			: suMd5Check,//4
        sustaffcertnumber 	: addUserIdCard,
        sustaffbirthday 	: userBirthday,
        sustaffaddress 		: userAddress,
        sustaffidimgpers 	: userImsphoto,
        sustaffgender 		: userSex,
        sustaffnation 		: userNation,
        sustaffidissued 	: userIdIssued,
        sustaffissuedvaliddate 		: userValidData,
        currentAddress		: currentAddress,
        servicememotextnull	: servicememotextnull,
        remark				: remark	,
        nativeplace 		: nativeplace,
        marriage 			: marriage,
        linkman 			: linkman ,
        linkmanphone 		: linkmanphone,
        linkmanrelation 	: linkmanrelation,
        suDiscountAuthPassword:suDiscountAuthPassword

    }, function(data) {
        data1 = data.body;
        console.log("++++++++++++++++++++++++++++++++++++++");
        console.log(data);
        $(".do_overDiv").hide();
        $('#errMsg1').html('');
        $('#errMsg11').html('');
        if (data.code < 0) {
            myTips(data.msg, 'error');
            return;
        }
        //
        if(_rows.length != 0){
            console.log(data1[0].userId);
            var result = doPushingCard(data1[0].userId);
        }
        var selectRow = $('#existingRelationRoomDg').datagrid('selectAll');
        console.log(selectRow.length);
        if(selectRow.length>0){
            updateRelations(2,data1[0]);
        }
        myTips('添加人员成功！', 'success');
        queryUser();
        upp();

        $("#addUserDlg").dialog('close');
        $.getScript("js/config.js");
        $.getScript("js/public.js");
    });
}



// 修改区域对话框
function updateStorefrontDlg() {
    $("#addStorefrontDlg").dialog({
        title : '修改区域',
        top : getTop(200),
        left : getLeft(300),
        width : 300,
        height : 220,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#addStorefrontDlg [clear="clear"]').val('');
            $('#addStorefrontDlg [clean="clean"]').html('');
            $("#addStorefrontDlg input").val('');
            $("#addStorefrontDlg textarea").val('');
            $("#storefrontStateDiv").hide('');
            $("input[style]").each(function(){
                $(this).css('border', '1px solid #a9a9a9');
            });
        }
    });
    $("#storefrontStateDiv").show('');
    $(".do_overDiv").hide();
    $("#saveAddStoreDiv").hide();
    $("#saveUpdateStoreDiv").show();
    $("#addStorefrontDlg").dialog('open');

}
// 修改部门对话框
function updateDepartmentDlg() {
    $("#addDepartmentDlg").dialog({
        title : '修改部门',
        top : getTop(200),
        left : getLeft(300),
        width : 300,
        height : 220,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $('#addDepartmentDlg [clear="clear"]').val('');
            $('#addDepartmentDlg [clean="clean"]').html('');
            $('#addDepartmentDlg [require]').css('border', '1px solid #a9a9a9');
            $("#addDepartmentDlg input").val('');
            $("#addDepartmentDlg select").val('');
            $("#addDepartmentDlg textarea").val('');
            $("#departmentStateDiv").hide('');
        }
    });
    $("#departmentStateDiv").show('');
    $(".do_overDiv").hide();
    $("#saveAddDepartmentDiv").hide();
    $("#saveUpdateDepartmentDiv").show();
    var row = $('#storefrontDg').datagrid('getSelected');
    $("#add_department_theStore").val(row.storefrontId);
    $("#addDepartmentDlg").dialog('open');
}
// 修改用户对话框
function updateUserDlg() {
    $("#addUserDlg").dialog({
        title : '用户详情',
        top : getTop(518),
        left : getLeft(800),
        width : 800,
        height : 518,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#userImsphoto").attr("src","images/userImage.png");
            $("#addUserDlg input").val('');
            $("#addUserDlg select").val('');
            $("#addUserDlg textarea").val('');
            $("#errMsg1").html('');
            $("#errMsg2").html('');
            $("#addUserDlg input[verify=verify]").each(function () {
                $(this).css("border","1px solid #A9A9A9");
            });
            $("#addUserDlg input[needs=1]").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
            $("#addUserDlg select[needs=1]").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
            $("#imgwrap ul li").remove();
            //隐藏警告语句
            $("#RepeatedWarnings").css('display','none');
            _rows='';
        }
    });

    $(".do_overDiv").hide();
    $("#beinofficeinformation").show();
    $(".add_userPassword").attr("Type","password");
    $("#showPassword").show();
    $("#saveAddUserDiv1").hide();
    $("#saveUsers1").show();
    $("#saveUsers2").hide();
    $("#saveUpdateUserDiv1").show();
    $("#saveAddUserDiv").hide();
    $("#saveUpdateUserDiv").show();
    $("#showPassword").text("显示密码");
    $("#followUpInformationTable1").attr("style","display:block");
    var storefrontRow = $('#storefrontDg').datagrid('getSelected');
    var departmentRow = $('#departmentDg').datagrid('getSelected');
    $("#addTheStore").val(storefrontRow.storefrontId);
    storeAndDepartment('add', departmentRow.departmentId);
    $("#addTheStore").attr("disabled", true);
    $("#addTheDepartment").attr("disabled", true);
    $("#managementEquipment1").hide();
    $("#managementEquipment").show();
    $("#addUserDlg").dialog('open');
}
// 执行修改区域
function doUpdateStorefront() {
    $(".do_overDiv").show();
    var storefrontId = $('.add_storefront_id').val();
    console.log(storefrontId)
    var storefrontName = $('.add_storefront_name').val();
    var storefrontAddress = $('.add_storefront_address').val();
    var storefrontNote = $('.add_storefront_note').val();
    var storefrontState = $('#add_storefront_state').find('option:selected').text();
    if(storefrontState=='注销'){
        $.post("../queryStorefront.action",{
            storefrontState: '正常',
        }, function(data) {
            hideLoading();
            data=data.body;
            console.log(data.length);
            if (data.length == 1) {
                myTips("对不起，至少保留一个区域!","error");
                $("#addStorefrontDlg").dialog('close');
                $(".do_overDiv").hide();
                return
            }else{
                var row=$('#storefrontDg').datagrid('getSelected');
                $.post('../queryDepartment.action',{
                    departmentStorefrontId : row.storefrontId,
                    departmentState : '正常'
                },function(data){
                    hideLoading();
                    console.log('code:'+data.code);
                    if(data.code > 0){
                        myTips("请先注销所有部门！","error");
                        $("#addStorefrontDlg").dialog('close');
                        return;
                    }else{
                        $.post('../updateStorefront.action', {
                            storefrontId : storefrontId,
                            storefrontName : storefrontName,
                            storefrontAddress : storefrontAddress,
                            storefrontNote : storefrontNote,
                            storefrontState:storefrontState
                        }, function(data) {
                            if (data < 0||data=='') {
                                myTips('修改失败！', 'error');
                                $(".do_overDiv").hide();
                                return;
                            }
                            queryStorefront();
                            myTips('修改成功！', 'success');
                            $("#addStorefrontDlg").dialog('close');
                            $(".do_overDiv").hide();
                            $.post("../queryStorefront.action",{
                                storefrontState: '正常'
                            }, function(data) {
                                if (data.code < 0) {
                                    $.messager.alert('通知', '查询区域失败', 'error');
                                    return;
                                }
                                data = data.body;
                                $(".add_theStore").html('<option></option>');
                                for (var i in data) {
                                    $(".add_theStore").append("<option value='" + data[i].storefrontId + "'>"+ data[i].storefrontName + "</option>");
                                }
                            });
                        });
                    }
                });
            }
        });
    }else{
        $.post('../updateStorefront.action', {
            storefrontId : storefrontId,
            storefrontName : storefrontName,
            storefrontAddress : storefrontAddress,
            storefrontNote : storefrontNote,
            storefrontState:storefrontState
        }, function(data) {
            if (data < 0||data=='') {
                myTips('修改失败！', 'error');
                $(".do_overDiv").hide();
                return;
            }
            queryStorefront();
            myTips('修改成功！', 'success');
            $("#addStorefrontDlg").dialog('close');
            $(".do_overDiv").hide();
            $.post("../queryStorefront.action",{
                storefrontState: '正常'
            }, function(data) {
                if (data.code < 0) {
                    $.messager.alert('通知', '查询区域失败', 'error');
                    return;
                }
                data = data.body;
                $(".add_theStore").html('<option></option>');
                for (var i in data) {
                    $(".add_theStore").append("<option value='" + data[i].storefrontId + "'>"+ data[i].storefrontName + "</option>");
                }
            });
        });
    }
}
//删除门店
function delStorefrontDlg(){
    var row = $('#storefrontDg').datagrid('getSelected');
    console.log(row.storefrontId);
    $.post("../queryStorefront.action",{
        storefrontState: '正常',
    }, function(data) {
        data=data.body;
        console.log(data.length);
        if (data.length == 1) {
            myTips("对不起，至少保留一个区域!","error");
            return;
        }else{
            $.post('../queryDepartment.action',{
                departmentStorefrontId : row.storefrontId,
                departmentState : '正常'
            },function(data){
                hideLoading();
                console.log('code:'+data.code);
                if(data.code > 0){
                    myTips("请先删除所有部门！","error");
                    return;
                }else{
                    $.messager.confirm("操作提示", "确定要删除 "+row.storefrontName+" 区域吗？", function(data) {
                        if(data){
                            $.post('../deleteStorefront.action', {
                                storefrontId : row.storefrontId,
                            }, function(data) {
                                hideLoading();
                                if(data.code < 0){
                                    $.messager.alert('通知',data.msg,"info");
                                    return;
                                }
                                $.messager.alert('通知','删除成功！',"info");
                                queryStorefront();
                            });
                        }else{
                            return
                        }
                    });
                }
            });
        }
    }, "json");

}
// 执行修改部门
function doUpdateDepartment() {
    $(".do_overDiv").show();
    var row = $('#departmentDg').datagrid('getSelected');
    console.log(row);
    var departmentId = $('.add_department_id').val();
    var departmentStorefrontId = $('#add_department_theStore').val();
    var departmentName = $('.add_department_address').val();
    var departmentNote = $('.add_department_note').val();
    var departmentState = $('#add_department_state').find('option:selected').text();
    $.post("../queryUserByDepartmentID.action", {
        suDepartmentId : departmentId
    }, function(data) {
        data=data.body;
        console.log(data);
        if (data != null) {
            myTips("请先转移该部门下所有用户！","error");
            $("#addDepartmentDlg").dialog('close');
            return;
        }else{
            $.post('../updateDepartment.action', {
                departmentId : departmentId,
                departmentStorefrontId : departmentStorefrontId,
                departmentName : departmentName,
                departmentNote : departmentNote,
                departmentState:departmentState,
            }, function(data) {
                if (data.code < 0) {
                    myTips(data.msg, 'error');
                    $(".do_overDiv").hide();
                    return;
                }
                queryDepartment();
                myTips('修改成功！', 'success');
                $("#addStorefrontDlg").dialog('close');
                $("#addDepartmentDlg").dialog('close');
                $(".do_overDiv").hide();
            });
        }
    });
}
// 执行修改用户
function doUpdateUser(id) {
    var checkFlag = 0;
    $("#addUserDlg input[verify=verify]").each(function(){
        if($(this).val()==""||$(this).val()==null){
            $(this).css("border","1px solid red");
            checkFlag++;
        }
    });

    $("#addUserDlg input[needs=1]").each(function(){
        if($(this).val()==''||$(this).val()==null){
            $(this).css("border","1px solid red");
            checkFlag++;
        }else{
            $(this).css("border","1px solid #A9A9A9");
        }
    });
    $("#addUserDlg select[needs=1]").each(function(){
        if($(this).val()==''||$(this).val()==null){
            $(this).css("border","1px solid red");
            checkFlag++;
        }else{
            $(this).css("border","1px solid #A9A9A9");
        }
    });

    var authPassword = $("#authPassword").val();
    var cardPassword = $("#cardPassword").val();

    if(authPassword !='' && cardPassword !=''){
        var suDiscountAuthPassword ={
            authPassword:authPassword,cardPassword:cardPassword
        };
        suDiscountAuthPassword =JSON.stringify(suDiscountAuthPassword);
    }

    console.log(suDiscountAuthPassword);

    if(checkFlag!=0){
        myTips("有必填项未填写!","error");
        return;
    }
    var userId = $('.add_userId').val();
    var suStoreId = $('#addTheStore').val();
    var suDepartmentId = $('#addTheDepartment').val();
    var suPermissionsId = $('.add_permissions').val();
    var suStaffName = $('.add_userName').val();
    var suContact = $('.add_userPhone').val();
    var suIdcard = $('.add_userIdCard').val();
    var suBankType = $('.add_userBankType').find('option:selected').text();
    var suBankCardNum = $('.add_userBankNum').val();
    var suChooseRoomLimit = $('.add_chooseRoomNumber').val();
    var suName = $('.add_userAccount').val();//1
    var suPassword = $('.add_userPassword').val();//2

    var suSuperior = $("#doEventGetUserId").val();
    var suCardNumber =$("#doorCardNum").val();

    //获取当前用户未修改前的状态
    var state=row.suState;

    var suState = $('#add_userState').find('option:selected').text();
    var suType = $('.add_userType').val();

    var suMd5CheckType = $('.add_checkType').val();//3
    var suMd5Check = $('.add_check').val();//4
    //身份证信息
    var addUserIdCard	=	$("#addUserIdCard").val();	//身份证号码
    var userBirthday	=	$("#userBirthday").val();		//身份证信息
    var userAddress		=	$("#userAddress").val();		//身份证住址
    var userImsphoto	=	$("#userImsphoto").val();		//身份证头像
    var userSex			=	$("#userSex").val();				//身份证性别
    var userNation		=	$("#userNation").val();			//身份证民族
    var userIdIssued	=	$("#userIdIssued").val();		//身份证签发机关
    //var userIssuedData	=	$("#userIssuedData").val();	//身份证签发时间
    var userValidData	=	$("#userValidData").val();	//身份证有效期

    var currentAddress		= $("#currentAddress").val();
    var servicememotextnull	= $("#servicememotextnull").val();
    var remark				= $("#remark").val();
    var nativeplace 		= $("#nativeplace").val();
    var marriage 			= $("#marriage").val();
    var linkman 			= $("#linkman").val();
    var linkmanphone 		= $("#linkmanphone").val();
    var linkmanrelation 	= $("#linkmanrelation").val();

    var appAuth = $('#appAuth').val();
    console.log('app'+appAuth)


    if(suMd5CheckType!=0&&(suMd5Check==''||suMd5Check==null)){
        $('#errMsg2').html('您选择的安全级别不为0，请输入安全加密！');
        return;
    }

    if(!_regex1.test(suName)){
        $('#errMsg2').html('用户名由字母、数字、下划线组成，长度2~16位');
        return;
    }
    if(!_regex2.test(suPassword)){
        $('#errMsg2').html('密码由字母、数字、符号组成，长度3到16位');
        return;
    }
    $('#errMsg2').html('');
    console.log(suCardNumber+"99999999999999999999999999999999999999");
    showLoading();
    if(_rows.length != 0){
        var code123 = doPushingCard(userId);
        $.post('../updateUser.action', {
            suCardNumber		: suCardNumber,
            userId 				: userId,
            suStoreId 			: suStoreId,
            suDepartmentId 		: suDepartmentId,
            suStaffName 		: suStaffName,
            suContact 			: suContact,
            suIdcard 			: suIdcard,
            suBankType 			: suBankType,
            suBankCardNum 		: suBankCardNum,
            suChooseRoomLimit	: suChooseRoomLimit,
            suName 				: suName,//1
            suPassword 			: suPassword,//2
            suPermissionsId		: suPermissionsId,
            suState				: suState,
            suMd5CheckType		: suMd5CheckType,//3
            suMd5Check			: suMd5Check,//4
//		suMd5CheckType		: suMd5CheckType,
//		suMd5Check			: suMd5Check,
            suType				: suType,
            suIdcard            :addUserIdCard,			//身份证号码
            //	suIdInformation		:suIdInformation,		//身份证全部信息

            sustaffcertnumber 	: addUserIdCard,
            sustaffbirthday 	: userBirthday,
            sustaffaddress 		: userAddress,
            sustaffidimgpers 	: userImsphoto,
            sustaffgender 		: userSex,
            sustaffnation 		: userNation,
            sustaffidissued 	: userIdIssued,
            sustaffissuedvaliddate 		: userValidData,

            currentAddress			: currentAddress,
            servicememotextnull	: servicememotextnull,
            remark					: remark,
            nativeplace 			: nativeplace,
            marriage 				: marriage,
            linkman 				: linkman,
            linkmanphone 			: linkmanphone,
            linkmanrelation 		: linkmanrelation,
            registrantName 		: _loginUserName,
            suDiscountAuthPassword:suDiscountAuthPassword,
            suAppAuth           :appAuth,
            state               :state,
            suSuperior			: suSuperior!=''?suSuperior:null
        }, function(data) {
            hideLoading();
            if (data.code < 0) {
                myTips(data.msg, 'error');
                return;
            }
            queryUser();
            upp();
            $("#"+id).dialog('close');

        });
        myTips("修改成功！", 'success');

    }else{

        $.post('../updateUser.action', {
            suCardNumber		: suCardNumber,
            userId 				: userId,
            suStoreId 			: suStoreId,
            suDepartmentId 		: suDepartmentId,
            suStaffName 		: suStaffName,
            suContact 			: suContact,
            suIdcard 			: suIdcard,
            suBankType 			: suBankType,
            suBankCardNum 		: suBankCardNum,
            suChooseRoomLimit	: suChooseRoomLimit,
            suName 				: suName,//1
            suPassword 			: suPassword,//2
            suPermissionsId		: suPermissionsId,
            suState				: suState,
            suMd5CheckType		: suMd5CheckType,//3
            suMd5Check			: suMd5Check,//4
            //		suMd5CheckType		: suMd5CheckType,
            //		suMd5Check			: suMd5Check,
            suType				: suType,
            suIdcard            :addUserIdCard,			//身份证号码
            //	suIdInformation		:suIdInformation,		//身份证全部信息
            suAppAuth           : appAuth,
            sustaffcertnumber 	: addUserIdCard,
            sustaffbirthday 	: userBirthday,
            sustaffaddress 		: userAddress,
            sustaffidimgpers 	: userImsphoto,
            sustaffgender 		: userSex,
            sustaffnation 		: userNation,
            sustaffidissued 	: userIdIssued,
            sustaffissuedvaliddate 		: userValidData,

            currentAddress			: currentAddress,
            servicememotextnull	: servicememotextnull,
            remark					: remark,
            nativeplace 			: nativeplace,
            marriage 				: marriage,
            linkman 				: linkman,
            linkmanphone 			: linkmanphone,
            linkmanrelation 		: linkmanrelation,
            registrantName 		: _loginUserName,
            suDiscountAuthPassword:suDiscountAuthPassword,

            state               :state,
            suSuperior			: suSuperior!=''?suSuperior:null
        }, function(data) {
            hideLoading();
            if (data.code < 0) {
                myTips(data.msg, 'error');
                return;
            }
            queryUser();
            upp();
            $("#"+id).dialog('close');
        });
        myTips('修改成功！', 'success');
    }
}
function formatSuWhetherGoOut(value, row, index) {
    if (row.suWhetherGoOut == '是' ) {
        return "<a style='text-decoration:none;color:red;'>外出中<a>";
    } else{
        return "<a style='text-decoration:none;color:blue;'>未外出<a>";
    }
}
function showPassword(){
    if($("#showPassword").text()=="显示密码"){
        $("#showPassword").text("隐藏密码");
        $(".add_userPassword").attr("Type","text");
    }else{
        $("#showPassword").text("显示密码");
        $(".add_userPassword").attr("Type","password");
    }
}
function employeeTurnover(){
    var row = $('#userDg').datagrid('getSelected');
    if(!row){
        myTips("请选择要进行离职操作的用户！","error");
        return;
    }
    console.log(row)
    $("#employeeTurnoverDlg").dialog({
        title : '离职操作',
        top : getTop(280),
        left : getLeft(540),
        width : 540,
        height : 250,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#employeeTurnoverDlg input").val('');
            $("#employeeTurnoverDlg select").val('');
            $("#handlerDept").empty();
            $("#handler").empty();
        }
    });
    $("#turnoverStore").val(row.storefrontName);
    $("#turnoverDept").val(row.departmentName);
    $("#turnoverUserName").val(row.suStaffName);
    console.log(row.userId);
    $("#turnoverUserId").val(row.userId);
    $("#employeeTurnoverDlg").dialog('open');
}
//执行离职
function doTurnover(){
    var staffOne = $("#turnoverUserId").val();
    var staffTwo = $("#handler option:selected").val();
    if(staffTwo==undefined || staffTwo=="" || staffTwo == null){
        myTips("请选择接手用户！","error");
        return;
    }
    if(staffOne==staffTwo){
        myTips("离职用户和接手用户不能为同一人！","error");
        return;
    }
    $.post('../employeeTurnover.action', {
        staffOne : staffOne,
        staffTwo : staffTwo,
    }, function(data) {
        if(data.code<0){
            myTips(data.msg, "error");
            return;
        }
        myTips("操作成功！","success");
        $("#handler").html("");
        queryUser();
        $("#employeeTurnoverDlg").dialog('close');
    });
}
//查询门店
function queryStore(){
    $.post("../queryStorefront.action",{
        storefrontState: '正常',
    }, function(data) {
        console.log(data)
        if (data.code < 0) {
            $.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
            return;
        }
        data = data.body;
        for (var i in data) {
            $("#handlerStore").append("<option value = '" + data[i].storefrontId + "'>" + data[i].storefrontName + "</option>");
        }
        for (var i in data) {
            $("#transferStore").append("<option value = '" + data[i].storefrontId + "'>" + data[i].storefrontName + "</option>");
        }
    }, "json");
}
//选择门店
function choseStore(storeId,deptId,staffId){
    var store = $('#' + storeId);
    var dept = $('#' + deptId);
    var staff = $('#' + staffId);
    dept.empty();
    staff.empty();
    dept.append("<option></option>");
    staff.append("<option></option>");
    var storefront = store.val();
    if(storefront == ''){
        return;
    }
    $.post("../queryDepartment.action", {
        departmentStorefrontId : storefront,
    }, function(data) {
        if (data.code < 0) {
            $.messager.alert('通知', '查询部门失败', 'error');
            return;
        }
        for (var i in data.body) {
            dept.append("<option value = '" + data.body[i].departmentId + "'>" + data.body[i].departmentName + "</option>");
        }
    }, "json");
}
//选择部门
function choseDept(deptId, staffId) {
    var dept = $('#' + deptId);
    var staff = $('#' + staffId);
    staff.empty();
    staff.append("<option></option>");
    var deptment = dept.val();
    if (deptment == '') {
        return;
    }
    $.post("../queryUserByDepartmentID.action", {
        suDepartmentId : deptment
    }, function(data) {
        if (data.code < 0) {
            $.messager.alert('通知', '查询人员失败', 'error');
            return;
        }
        data = data.body;
        for (var i in data) {
            staff.append("<option value = '" + data[i].userId + "'>" + data[i].suStaffName + "</option>");
        }
    });
}
//部门转移
function deptTransfer(){
    var row = $('#userDg').datagrid('getSelected');
    if(!row){
        myTips("请选择要调转部门的用户！","error");
        return;
    }
    $("#deptTransferDlg").dialog({
        title : '调转部门',
        top : getTop(280),
        left : getLeft(540),
        width : 540,
        height : 250,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#deptTransferDlg input").val('');
            $("#deptTransferDlg select").val('');
            $("#transferDept").empty();
            $("#transferTips").html("");
        }
    });
    $("#originalStore").val(row.storefrontName);
    $("#originalDept").val(row.departmentName);
    $("#originalStoreId").val(row.suStoreId);
    $("#originalDeptId").val(row.suDepartmentId);
    $("#originalUserName").val(row.suStaffName);
    $("#originalUserId").val(row.userId);
    $("#deptTransferDlg").dialog('open');
}
//执行调转
function doDeptTransfer(){
    var userId = $("#originalUserId").val();
    var OneDepartment = $("#originalDeptId").val();
    var TwoDepartment = $("#transferDept").val();
    var OneStore = $("#originalStoreId").val();
    var TwoStore = $("#transferStore").val();
    if(TwoDepartment==''){
        $("#transferTips").html("请选择调转部门！");
        return;
    }
    if(OneDepartment==TwoDepartment){
        $("#transferTips").html("调转部门不能是原部门！");
        return;
    }
    showLoading();
    $.post('../personnelTransfer.action', {
        userId : userId,
        OneDepartment : OneDepartment,
        TwoDepartment : TwoDepartment,
        OneStore : OneStore,
        TwoStore : TwoStore,
    }, function(data) {
        hideLoading();
        if(data.code<0){
            $.messager.alert('通知',data.msg,"error");
            return;
        }
        $.messager.alert('通知','调转成功！',"info");
        queryUser();
        $("#deptTransferDlg").dialog('close');
    });
}

function employeeQuit(){
    var row = $('#userDg').datagrid('getSelected');
    if(!row){
        myTips("请选择要离职的用户！","error");
        return;
    }
    if(row.suState == "离职"){
        myTips("该用户已经离职！","error");
        return;
    }
    $.messager.confirm("操作提示", "确定为 "+row.storefrontName+"-"+row.departmentName+"-"+row.suStaffName+" 办理离职吗？", function(data) {
        if(data){
            doDealWithDoorLock("注销", 2);


        }else{
            return
        }
    });
}
function upp(){
    $.post("../queryUserByDepartmentID.action", {

    }, function(data) {
        data = data.body;
        _userInfoData=[];
        _allUserInfo=[];
        for(var i in data){
            _userInfoData.push({
                suStoreId		: data[i].suStoreId,
                suDepartmentId	: data[i].suDepartmentId,
                userId			: data[i].userId,
                storefrontName	: data[i].storefrontName,
                departmentName	: data[i].departmentName,
                suStaffName		: data[i].suStaffName,
            });
            if(i==0){
                _allUserInfo.push({
                    storeName:data[i].storefrontName,
                    storeId:data[i].suStoreId,
                    storeDep:[{
                        depName:data[i].departmentName,
                        depId:data[i].suDepartmentId,
                        depUser:[{
                            userName:data[i].suStaffName,
                            userId:data[i].userId,
                        }],
                    }],
                });
            }else{
                var storeFlag = -1;
                var depFlag = -1;
                for(var j in _allUserInfo){
                    if(_allUserInfo[j].storeId==data[i].suStoreId){
                        storeFlag=j;
                        break;
                    }
                }
                if(storeFlag!=-1){
                    for(var j in _allUserInfo[storeFlag].storeDep){
                        if(_allUserInfo[storeFlag].storeDep[j].depId==data[i].suDepartmentId){
                            depFlag=j;
                            break;
                        }
                    }
                    if(depFlag!=-1){
                        _allUserInfo[storeFlag].storeDep[depFlag].depUser.push({
                            userName:data[i].suStaffName,
                            userId:data[i].userId,
                        });
                    }else{
                        _allUserInfo[storeFlag].storeDep.push({
                            depName:data[i].departmentName,
                            depId:data[i].suDepartmentId,
                            depUser:[{
                                userName:data[i].suStaffName,
                                userId:data[i].userId,
                            }],
                        });
                    }
                }else{
                    _allUserInfo.push({
                        storeName:data[i].storefrontName,
                        storeId:data[i].suStoreId,
                        storeDep:[{
                            depName:data[i].departmentName,
                            depId:data[i].suDepartmentId,
                            depUser:[{
                                userName:data[i].suStaffName,
                                userId:data[i].userId,
                            }],
                        }],
                    });
                }
            }
        }
        parent._userInfoData=_userInfoData;
        parent._allUserInfo=_allUserInfo;
        $(".choose_user_button").each(function(){
            showAllUser($(this).attr("doFlag"),$(this).attr("doFun"));
        });
    });
}

function getCodeUrl (){
    var row =$("#userDg").datagrid('getSelected');
    console.log(row.userId);
    $.post("../getCodeUrl.action",{
        toUserId:row.userId
    },function(data){
        if(data.code<0){
            console.log(data.msg);
        }
        data=data.body;
        console.log(data);
        $("#openIdDg").dialog({
            title: '微信授权',
            top: getTop(200),
            left: getLeft(300),
            width: 300,
            height: 320,
            closed: true,
            cache: false,
            modal: true,
            onClose: function () {
                $('#openIdDg [clear="clear"]').val('');
                $('#openIdDg [clean="clean"]').html('');
                $('#openIdDg [require]').css('border', '1px solid #a9a9a9');
                $("#openIdDg input").val('');
                $("#openIdDg select").val('');
                $("#openIdDg textarea").val('');
            }
        });
        $('#openIdQr').empty();
        $("#openIdQr").qrcode({
            render : "canvas",
            width:240,
            height:240,
            text:data
        });
        $("#openIdDg").dialog('open');
        // $.post("../getOpenIdByCode.action",function (data) {
        // 	if(data<0){
        // 		console.log("detault"+data.msg);
        // 	}
        // 	$("#resultTip").val(data.msg)
        // 	data=data.body;
        // 	console.log("=="+data);
        // 	window.location.href=data;
        // });
    });

}
function upastheinformation(){
    $("#astheinformation").dialog({
        title : '任职详情',
        top : getTop(390),
        left : getLeft(600),
        width : 600,
        height : 300,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
//			$("#astheinformation input").val('');
//			$("#astheinformation select").val('');
//			$("#astheinformation textarea").val('');
//			$("#errMsg1").html('');
//			$("#errMsg2").html('');

            $("#addUserDlg input[needs=1]").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
            $("#addUserDlg select[needs=1]").each(function(){
                $(this).css("border","1px solid #A9A9A9");
            });
        }
    });
    $(".do_overDiv").hide();
    $(".add_userPassword").attr("Type","password");
    $("#showPassword").show();
    $("#showPassword").text("显示密码");
    var storefrontRow = $('#storefrontDg').datagrid('getSelected');
    var departmentRow = $('#departmentDg').datagrid('getSelected');
    $("#addTheStore").val(storefrontRow.storefrontId);
    storeAndDepartment('add', departmentRow.departmentId);
    $("#addTheStore").attr("disabled", true);
    $("#addTheDepartment").attr("disabled", true);
    $("#astheinformation").dialog('open');

}
function personalinformationroot(row){

    var data = eval(row.getRealJsonStr());

    if ($('#followUpInformationTable').hasClass('datagrid-f')) {

    } else {
        $("#followUpInformationTable").datagrid({
            columns :
                [ [ {
                    field : 'time',
                    title : '跟进时间',
                    width : '20%',
                    align : 'center',
                    sortable:true
                }, {
                    field : 'registrantName',
                    title : '跟进人',
                    width : '10%',
                    align : 'center'
                }, {
                    field : 'type',
                    title : '归属',
                    width : '10%',
                    align : 'center'
                }, {
                    field : 'text',
                    title : '跟进内容',
                    width : '55%',
                    align : 'center'
                } ] ],
            width : '100%',
            height : '125px',
            singleSelect : true,
            autoRowHeight : false,
            pageSize : 10,
            scrollbarSize : 0,
            showPageList : false,
            onDblClickRow : function(rowIndex, rowData) {
                var row = $('#followUpInformationTable').datagrid('getSelected');
            }
        });
    }
    $("#followUpInformationTable").datagrid("loadData", data);
}
//管理设备
function upmanagementEquipment(type){
    if(type==1){
        var row = $('#userDg').datagrid('getSelected');
        console.log(row);
        if(row == null){
            myTips("请选择至少一个用户！", "error");
            return;
        }
        $('#officeAssociatedUsersDig').dialog({
            title 	: '关联用户',
            top		: getTop(305),
            left	: getLeft(700),
            width	: 480,
            height	: 500,
            closed	: true,
            cache	: false,
            modal	: true,
            onClose	: function(){
                $('#equipmentType').val('');
                $('#equipmentName').val('');
            }
        });
        queryUnrelateddevices();
        queryOnrelateddevices();
        $('#officeAssociatedUsersDig').dialog('open');
    }if(type==2){
        $('#officeAssociatedUsersDig').dialog({
            title 	: '关联用户',
            top		: getTop(305),
            left	: getLeft(700),
            width	: 480,
            height	: 500,
            closed	: true,
            cache	: false,
            modal	: true,
            onClose	: function(){
                $('#equipmentType').val('');
                $('#equipmentName').val('');
            }
        });
        queryUnrelateddevices();

        $('#officeAssociatedUsersDig').dialog('open');
    }
}
//查询未关联的设备
function queryUnrelateddevices(){
    var equipmentType = $("#equipmentType").val();
    var equipment = $("#equipment").val();
    $.post("../selectNoRelationdevice.action",{
        hsAddCommunity : equipmentType,
        devNickname : equipment,
    },function(data){
        console.log("设备");
        console.log(data);
        if(data<0){
            $('#unRelatedRoomDg').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
        }else{
            data=data.body;
            for (var i in data) {
                for(var j in data[i]){
                    if(data[i][j]==null){
                        data[i][j]='';
                    }
                }
            }
            if(data!=null){
                $("#unRelatedRoomDg").datagrid("loadData", data);
            }else{
                $("#unRelatedRoomDg").datagrid("loadData", []);
            }
        }
    },"json");
}
//更新关联设备
function updateRelations(type,data1){
    if(type==1){
        var hsRows = $('#existingRelationRoomDg').datagrid('getRows');
        var row = $("#userDg").datagrid('getSelected');
        console.log(row);
        var data = [];
        var jsonArray = [];
        if (hsRows.length == 0) {
            jsonArray.push({
                judId 	: hsRows.judId,
                judDeviceId : 0,
                judUserId 		: row.userId,
            });
        }else{
            for (var j in hsRows) {
                console.log(hsRows[j].id);
                jsonArray.push({
                    judId 	:    hsRows[j].judId,
                    judDeviceId		: hsRows[j].id,
                    judUserId		: row.userId
                });
            }
        }
        var splitJson = JSON.stringify(jsonArray);

        $.post("../updateUnrelateddevices.action", {jhoIdJson : splitJson}, function(data) {

            if(data.code<0){
                myTips(data.msg,"error");
                return;
            }else{
                myTips(data.msg,"success");
            }
        });
    }else if(type==2){
        console.log("添加成功！");
        var hsRows = $('#existingRelationRoomDg').datagrid('getRows');
        var data = [];
        var jsonArray = [];
        if (hsRows.length == 0) {
            jsonArray.push({
                judId 	: hsRows.judId,
                judDeviceId : 0,
                judUserId		: data1.userId,
            });
        }else{
            for (var j in hsRows) {
                console.log(hsRows[j].id);
                jsonArray.push({
                    judId 	:    hsRows[j].judId,
                    judDeviceId		: hsRows[j].id,
                    judUserId		: data1.userId,
                });
            }
        }
        var splitJson = JSON.stringify(jsonArray);

        $.post("../updateUnrelateddevices.action", {jhoIdJson : splitJson}, function(data) {

            if(data.code<0){
                myTips(data.msg,"error");
                return;
            }else{
                //myTips(data.msg,"success");
            }
        });
    }

}
//设备更新关联(左右移动)
function updateHsRelation(type){
    if(type==0){//添加关联
        var rows =$("#unRelatedRoomDg").datagrid('getChecked');
        if(rows==0){
            myTips("请选择要关联的设备","error");
            return;
        }
        var relatedRrows = $('#existingRelationRoomDg').datagrid("getRows");
        console.log(relatedRrows);
        for (var i in relatedRrows){
            for(var j in rows){
                if(relatedRrows[i].id == rows[j].id){
                    $.messager.alert('Warning',rows[j].devNickname+"设备 "+"已关联，请勿重复关联！");
                    return;
                }
            }
        }
        var addRelation=[];//计数器
        for(var i in rows){
            $("#existingRelationRoomDg").datagrid('appendRow',rows[i]);
            var index = $("#unRelatedRoomDg").datagrid("getRowIndex",rows[i]);
            $("#unRelatedRoomDg").datagrid('deleteRow',index);
        }
        $("#unRelatedRoomDg").datagrid('clearChecked');
    }
    if(type==1){//移除关联
        var row = $("#existingRelationRoomDg").datagrid("getChecked");
        if(row.length == 0){
            myTips("请选择要取消关联的设备","error");
            return;
        }
        for(var i in row){
            var index = $("#existingRelationRoomDg").datagrid("getRowIndex",row[i]);
            $("#existingRelationRoomDg").datagrid('deleteRow',index);
            if(row[i].judId==''||row[i].judId==null){

                $("#unRelatedRoomDg").datagrid('appendRow',row[i]);
            }
        }
        $("#existingRelationRoomDg").datagrid('clearChecked');
    }
}
//查询已关联设备
function queryOnrelateddevices(){
    var row = $("#userDg").datagrid('getSelected');
    var equipmentType=$("#equipmentType").val()
    var equipment=$("#equipment").val()

    console.log("userId:"+row.userId);
    $.post("../selectRelateddevice.action", {
        hsAddCommunity : equipmentType,
        devNickname : equipment,
        judUserId	:row.userId,
    },function(data){
        console.log(data);
        if(data.code>0&&data.body!=null){
            data=data.body;
            console.log(data)
            $("#existingRelationRoomDg").datagrid("loadData", data);
        }else{
            $('#existingRelationRoomDg').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
        }

    },"json");
}
function equipmentAuthorization(){
    $("#equipmentAuthorizationDlg").dialog({
        title : '选择设备',
        top : getTop(550),
        left : getLeft(980),
        width : 800,
        height : 530,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            console.log(_rows.length);
        }
    });
    $.post("../selectDoorDevice.action",{

    },function(data){
        if(data.code<0){
            $('#personInfomationDivTable').datagrid({
                data: [],
                view: myview,
                emptyMsg: data.msg
            });
        }else{
            data = data.body;
            for (var i in data) {
                data[i].detailedAddress = data[i].hsAddCommunity + " "
                    + data[i].hsAddBuilding + " "
                    + data[i].hsAddDoorplateno;
            }
            console.log("=================================")
            console.log(data);
            $("#personInfomationDivTable").datagrid("loadData", data);
        }
    });
    $("#equipmentAuthorizationDlg").dialog('open');
}
function formatBrandType(value, row, index){
    var devFirstJson = eval(_devFirstJson);
    for(var i in devFirstJson){
        if(row.devFirstType==devFirstJson[i].dft_id){
            return devFirstJson[i].dft_name;
        }
    }
}

function formatBrandType2(value, row, index){
    var devSecondJson = eval(_devFirstJson2);
    for(var i in devSecondJson){
        if(row.devSecondType==devSecondJson[i].dst_id){
            return devSecondJson[i].dst_name;
        }
    }
}
function equipmentAuthorizationNext(){
    _rows = $("#personInfomationDivTable").datagrid("getChecked");
    if(_rows.length == 0){
        myTips('请选择设备！', 'error');
        return;
    }
    var userName = $("#add_userName").val();
    $("#selectRentan").val(userName);
    $("#pushingCardDlg").dialog({
        title : '授权信息',
        top : getTop(230),
        left : getLeft(400),
        width : 230,
        height : 230,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            $("#equipmentAuthorizationDlg").dialog('close');
        }
    });
    $("#pushingCardDlg").dialog('open');
}
//判定授权的值
function decisionValue(){

}

//执行授权
function doPushingCard(data1) {
    var att = $("#att").val();
    var img='';
    if(typeof($("#imgwrap img:eq(0)").attr("src")) != "undefined" && ($("#imgwrap img:eq(0)").attr("src")) !='') {
        img = img+($("#imgwrap img:eq(0)").attr("src"));
    }
    if(typeof($("#imgwrap img:eq(1)").attr("src")) != "undefined" && ($("#imgwrap img:eq(1)").attr("src")) !='') {
        img = img+"-"+($("#imgwrap img:eq(1)").attr("src"));
    }
    if(typeof($("#imgwrap img:eq(2)").attr("src")) != "undefined" && ($("#imgwrap img:eq(2)").attr("src")) !='') {
        img = img+"-"+($("#imgwrap img:eq(2)").attr("src"));
    }
    console.log(img);
    var obj = document.getElementsByName("lock");
    console.log(obj);
    var lockArray = [];
    var lockName = " ";
    for (k in obj) {
        if (obj[k].checked) {
            lockArray.push(JSON.parse(obj[k].value))
            lockName += JSON.parse(obj[k].value).devNickname;
            lockName += " "
        }
    }

    var cardId = $('#cardId').val();//授权
    var doorCardNum = $('#cardId').val();//卡号
    var popName = $("#add_userName").val();
    var operatingRecording = {
        text : "门卡授权：为客户 " + popName + " 发放" + lockName + "的门卡，卡号"
            + doorCardNum + "。",
        time : new Date().format("yyyy-MM-dd hh:mm:ss"),
        type : "系统跟进",
        registrantName : _loginUserName
    }
    var jdcOperatingRecording = "[" + JSON.stringify(operatingRecording) + "]";
    var inseratData = {
        personType : "教师",
        jdcUserId : data1,
        img : img,
        att :att,
        popName : popName,
        coid : _loginCoId,
        departmentId : _loginDepartment,
        storefrontId : _loginStore,
        registerPeopleId : _loginUserId,
        jdcState : '使用中',
        jdcCardId : cardId,
        jdcCardNum : doorCardNum,
        jdcOperatingRecording : jdcOperatingRecording,

    }

    var doorCardJson = "";
//人脸识别需要修改
    for ( var i in _rows) {
        inseratData.jdcDeviceId = _rows[i].id;
        if (_rows[i].devAuthNum != null && _rows[i].devAuthNum != '') {
            inseratData.jdcAuthNum = _rows[i].devAuthNum;
        }
        if (i == 0) {
            doorCardJson += JSON.stringify(inseratData);
        } else {
            doorCardJson += "," + JSON.stringify(inseratData);
        }
    }

    doorCardJson = "[" + doorCardJson + "]";
    if(_rows.length>0){
        showLoading();
    }
    $.ajax({
        type : "post",
        url : "../inseartDoorCard.action",
        data : {
            doorCardJson : doorCardJson
        },
        dataType : "json",
        success : function(result) {
            hideLoading();
            console.log(result);
            if (result.code == 1) {
                return 1;
            } else {
                myTips('添加授权失败，请重新添加！', 'error');

            }

        }
    });

}
//储存视频音频
var MediaStreamTrack;
//拍照上传
function new_page( ) {
    $("#photoDlg").dialog({
        title : '拍照',
        top : getTop(600),
        left : getLeft(700),
        width : 700,
        height : 600,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
            //循环关闭音频视频
            MediaStreamTrack.forEach(function (Track) {
                Track.stop();
            });

        }
    });
    /**
     * 调用摄像头
     */
        //设置摄相机宽高
    var opt = {
            audio: true,
            video: {
                //摄像宽高
                width: 150,
                height: 200
            }
        };
    //调用摄像机

    var Devicestate = navigator.mediaDevices.getUserMedia(opt);
    Devicestate.then(function(mediaStream) {
        MediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks();
        video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    });
    //用户拒绝使用,或者没有摄像头
    Devicestate.catch(function(err) {
        $("#RepeatedWarnings").text("用户拒绝使用摄像头,或者没有摄像头!");
        $("#RepeatedWarnings").show();
        var err = err.name;
        console.log(err);
    });
    $("#photoDlg").dialog("open");
}
/**
 * 执行 注销/退卡
 */
function doDealWithDoorLock(jdcState, type) {
    var row = $('#userDg').datagrid('getSelected');
    var userId = row.userId;
    var operatingRecording = {
        text : "门卡" + jdcState + "：为客户 " + row.suStaffName + jdcState + ".",
        time : new Date().format("yyyy-MM-dd hh:mm:ss"),
        type : "系统跟进",
        registrantName : _loginUserName
    }

    $.ajax({
        type : "post",
        url : "../deleteDoorCard.action",
        data : {
            jdcUserId :userId,
            jdcState : jdcState,
            type : type
        },
        dataType : "json",
        success : function(result) {
            if (result.code == 1) {
                $.post('../employeeQuit.action', {
                    userId : row.userId,
                }, function(data) {

                    hideLoading();
                    if(data.code < 0){
                        $.messager.alert('通知',data.msg,"info");
                        return;
                    }
                    $.messager.alert('通知','离职成功！',"info");
                    queryUser();
                });
            } else {
                return 2;
            }
        }
    });
}
//班级权限
function classRoomOn() {
    $("#classRoomDiv").dialog({
        title : "班级列表",
        top : getTop(630),
        left : getLeft(810),
        width : 800,
        height : 630,
        closed : true,
        cache : false,
        modal : true,
        onClose : function() {
         $('#roomState').val('正常');
         $('#roomName').val('');
         $('#userClass').val('未绑定');
         $('#hsAddCity').val('教室');
        },
    });
    //初始化班级表格
    $("#classRoomDataGrid").datagrid({
    });
    //查询班级名称
    queryClassRoom(1);
    $("#classRoomDiv").dialog('open');
}

// 加载教室房间数据
function queryClassRoom(page) {
    console.log(_userId)
    var startNum = (parseInt(page) - 1) * 17;
    var endNum = 17;

    var userClass = $('#userClass').val();
    var hsAddCity = $('#hsAddCity').val();
    var roomState = $('#roomState').val();
    var roomName = $('#roomName').val();

    if(userClass == "已绑定"){
        $('#cancelBinding').show();
        $('#addClassRoom').hide();
    }else{
        $('#cancelBinding').hide();
        $('#addClassRoom').show();
    }

    $.post("../queryClassRoom.action", {
        startNum    : startNum,
        endNum      : endNum,
        sucUserId   : _userId, //教师Id
        type        : userClass,  //班级绑定装填
        hsAddCity       : hsAddCity,
        hsState         : roomState,
        hsAddCommunity  : roomName,
    }, function(data) {
        if (data.code<0) {
            sourcePage(0,0,0);
            $('#classRoomDataGrid').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
        } else {
            data = data.body;
            if(page == 1){
                _indexNum[0] = 0;
                sourcePage(data[0].totalNum,page);
            }
            $("#classRoomDataGrid").datagrid("loadData", data);
        }
    }, "json");
}

//分页操作
function sourcePage(totalNum, page) {
    var pageNum = Math.ceil(totalNum / 17);
    $("#classRoomDataGridPage").remove();
    $("#classRoomDataGridPageDiv")
        .append(
            "<div class='tcdPageCode' id='classRoomDataGridPage' style='text-align:center;'></div>");
    $("#classRoomDataGridPage").createPage({
        onePageNums:17,
        totalNum:totalNum,
        pageCount : pageNum,
        current : 1,
        backFn : function(p) {
            if (p <= pageNum) {
                _pageNum[0] = p;
                _indexNum[0]=0;
                console.log(p)
                queryClassRoom(p);
            }
        }
    });
}
//添加教室名称
function addClassRoom() {
    var rows = $('#classRoomDataGrid').datagrid('getChecked');
    if(rows.length == 0){
        myTips("请选择需要绑定的班级！","error");
        return;
    }
    var jsonArray = [];
    for(var i in rows){
        var obj = {
            sucClassId  : rows[i].hsId,
            sucUserId   : _userId //教师Id
        }
        jsonArray.push(obj);
    }
    console.log(rows)
    $.post("../insertUserClass.action",{
        jsonArray : JSON.stringify(jsonArray)
    },function(data){
        if(data.code < 0){
            myTips(data.msg,"error");
            return;
        }else{
            queryClassRoom(1);
            $('#classRoomDiv').dialog('close');
            myTips(data.msg,"success");
            return;
        }
    });
}
function cancelBinding(){
    var rows = $('#classRoomDataGrid').datagrid('getChecked');

    if(rows.length == 0){
        myTips("请选择需要取消绑定的班级！","error");
        return;
    }
    var jsonArray = [];
    for(var i in rows){
        var obj = {};
        obj.sucId = rows[i].sucId
        jsonArray.push(obj);
    }
    jsonArray = JSON.stringify(jsonArray);

    $.post("../deleteByPrimaryKey.action", {
        jsonArray : jsonArray
    }, function(data) {
        if(data.code > 0){
            queryClassRoom(1)
            myTips("取消绑定成功!","success")
            return;
        }else{
            myTips(data.msg,"error");
            return;
        }
    });
}
