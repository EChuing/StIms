<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<%
    SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo");
%>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>学生管理</title>
    <link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
    <link href="css/icon.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/upload.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script src="js/config.js"></script>
    <script src="js/baseISSObject.js"></script>
    <script src="js/baseISSOnline.js"></script>
    <script src="js/common.js"></script>
</head>
<body>
<div class="bodyLoadingOver"></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<!--区域管理列表-->
<%--<div id="DataGridStorefront" style="width: 20%; height: 100%; float: left">--%>
    <%--<!--区域管理工具-->--%>
    <%--<div id="storefrontTb" style="height: auto">--%>
        <%--<div style="margin: 5px 0 0 0;">--%>
            <%--<a class="easyui-linkbutton" iconCls="icon-xinzengdianmian"--%>
               <%--plain="true" id="addStorefrontButton" onclick="addStorefrontDlg()">新增校区</a>--%>
            <%--<a class="easyui-linkbutton" iconCls="icon-edit-zuke" plain="true"--%>
               <%--id="delStorefrontButton" onclick="uppStorefront()">修改校区</a>--%>
        <%--</div>--%>
    <%--</div>--%>
    <%--<div style="margin: 0 0 0 5px">--%>
        <%--<div style="margin: 3px 0 5px 5px; color: black; float: left">--%>
            <%--校区状态：<select id="searchStorefrontState"--%>
                         <%--class="searchStorefrontState" style="width: 80px"--%>
                         <%--onchange="queryStorefront()">--%>
        <%--</select>--%>
        <%--</div>--%>
    <%--</div>--%>
    <%--<table id="storefrontDg"--%>
           <%--style="width: 100%; height: 80%; table-layout: fixed; overflow: hidden;"--%>
           <%--data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">--%>
        <%--<thead>--%>
        <%--<tr>--%>
            <%--<th field="storefrontId" width="10" align="center">校区编号</th>--%>
            <%--<th field="storefrontName" width="25" align="center">校区名称</th>--%>
        <%--</tr>--%>
        <%--</thead>--%>
    <%--</table>--%>
    <%--<div id="storefrontPageDiv" style="width: 100%; text-align: center;"></div>--%>
<%--</div>--%>
<!--班级管理列表-->
<div id="DataGridDepartment"
     style="width: 20%; height: 100%; float: left;margin-top: 33px">
    <!--班级管理工具-->
    <%--<div id="departmentTb" style="height: auto">--%>
        <%--<div style="margin: 5px 0 0 0;">--%>
            <%--<a class="easyui-linkbutton" iconCls="icon-xinzengdianmian"--%>
               <%--plain="true" id="addDepartmentButton" onclick="addDepartmentDlg()">新增班级</a>--%>
            <%--<a class="easyui-linkbutton" iconCls="icon-xinzengbumen"--%>
               <%--plain="true" id="updateDepartmentButton" onclick="uppDepartment()">修改班级</a>--%>
        <%--</div>--%>
    <%--</div>--%>
    <%--<div style="margin: 5px 0 0 0">--%>
        <%--<div style="margin: 3px 0 5px 5px; color: black; float: left">--%>
            <%--班级状态：<select id="searchDepartmentState"--%>
                         <%--class="searchDepartmentState" style="width: 80px"--%>
                         <%--onchange="queryDepartment()">--%>
        <%--</select>--%>
        <%--</div>--%>
    <%--</div>--%>
    <table id="departmentDg"
           style="width: 100%; height: 90%; table-layout: fixed; overflow: hidden;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="sucClassId" width="10" align="center">班级编号</th>
            <th field="hsAddCommunity" width="25" align="center">班级名称</th>
        </tr>
        </thead>
    </table>
    <div id="departmentPageDiv" style="width: 100%; text-align: center;"></div>
</div>
<!--用户管理列表-->
<div id="DataGridUser" style="width: 80%; height: 100%; float: left">
    <!--用户管理工具-->
    <div id="userInfoTb" style="height:auto">
        <div style="margin:5px 0 0 0;">
            <a class="easyui-linkbutton" iconCls="icon-add-zuke" plain="true"
               id="addUserButton" onclick="addUserDlg()">新增学生</a>
            <a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true"
               id="deptTransfer" onclick="deptTransfer()">班级调换</a>
            <div style="margin: 3px 0 5px 5px; color: black; float: left">
                姓名：<input id="searchSuStaffName"
                          onkeyup="searchOnkeyup(this.id, 'queryUser()')"
                          style="width: 80px">
            </div>
            <div style="margin: 3px 0 5px 5px; color: black; float: left">
                学生状态：<select id="studentState" onchange="searchOnkeyup(this.id, 'queryUser()')" class="studentRelationship" style="width: 95px;">
                <option></option>
                <option value="在校">在校</option>
                <option value="离校">离校</option>
            </select>
            </div>
            <%--<div style="margin: 3px 0 5px 5px; color: black; float: left">--%>
                <%--学生状态：<select id="searchSuStaffState" class="searchSuStaffState"--%>
                             <%--onchange="queryUser()" style="width: 80px">--%>
            <%--</select>--%>
            <%--</div>--%>
            <input style="width:0px;hight:0px;border:none">
            <%--<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true"--%>
               <%--onclick="open_common_img_dialog('private', 'users', 'userDg', 'userId', 'suImgPath', 'queryUserById', 'deleteUserPic')">上传及查看图片</a>--%>
        </div>
        <div style="clear: both"></div>
        <div id="searchUser" style="margin: 0 0 0 5px">
            <%--<div style="margin: 3px 0 5px 5px; color: black; float: left">--%>
                <%--姓名：<input id="searchSuStaffName"--%>
                          <%--onkeyup="searchOnkeyup(this.id, 'queryUser()')"--%>
                          <%--style="width: 80px">--%>
            <%--</div>--%>
            <%--<div style="margin: 3px 0 5px 5px; color: black; float: left">--%>
                <%--学生状态：<select id="searchSuStaffState" class="searchSuStaffState"--%>
                             <%--onchange="queryUser()" style="width: 80px">--%>
            <%--</select>--%>
            <%--</div>--%>
            <%--<input style="width:0px;hight:0px;border:none">&lt;%&ndash;此input用来处理chrome浏览器自动填充用户名的，页面加载完成后会干掉它&ndash;%&gt;--%>
        </div>
    </div>
    <table id="userDg"
           style="width: 100%; height:90%; table-layout: fixed; overflow: hidden;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="studentId" width="10" align="center">学生学号</th>
            <th field="studentName" width="10" align="center">姓名</th>
            <th field="studentRelationship" width="10" align="center">联系人关系</th>
            <th field="studentEmergencycontact" width="10" align="center">联系人</th>
            <th field="studentPhone" width="15" align="center">联系人号码</th>
            <th field="studentNowAddress" width="10" align="center">住址</th>
            <th field="studentState" width="10" align="center">学生状态</th>
        </tr>
        </thead>
    </table>
    <div id="userPageDiv" style="width: 100%; text-align: center;"></div>
</div>
<!-- 新增区域对话框 -->
<div id="addStorefrontDlg" style="padding: 6px" class="easyui-dialog"
     data-options="closed:true">
    <div class="do_overDiv"></div>
    <div style='margin: 5px 0 0 0; float: left;'>
        校区名称：<input style="width: 180px" class="add_storefront_name"
                    require="require">
    </div>

    <div style="clear: both"></div>

    <div style='margin: 5px 0 0 0; float: left;'>
        校区地址：<input style="width: 180px" class="add_storefront_address"
                    require="require"> <input style="display: none"
                                              class="add_storefront_id">
    </div>

    <div style="clear: both"></div>

    <div style='margin: 5px 0 0 0; float: left; display: none'
         id="storefrontStateDiv">
        校区状态：<select style="width: 180px" id="add_storefront_state"
                     class="searchStorefrontState">
    </select>
    </div>

    <div style="clear: both"></div>

    <div style='margin: 5px 0 0 0; float: left;'>校区描述：</div>
    <div style='margin: 5px 0 5px 0; float: left;'>
			<textarea style="width: 180px; height: 60px"
                      class="add_storefront_note" require="require"></textarea>
    </div>
    </br>
    <div id="saveAddStoreDiv" style="text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save"
           onclick="if(validateRequire('addStorefrontDlg')){doAddStorefront()}">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel"
           onclick="$('#addStorefrontDlg').dialog('close')">关闭</a>
    </div>
    <div id="saveUpdateStoreDiv" style="text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save"
           onclick="if(validateRequire('addStorefrontDlg')){doUpdateStorefront()}">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel"
           onclick="$('#addStorefrontDlg').dialog('close')">关闭</a>
    </div>
</div>
<!-- 新增班级对话框 -->
<div id="addDepartmentDlg" style="padding: 6px" class="easyui-dialog"
     data-options="closed:true">
    <div class="do_overDiv"></div>
    <div style='margin: 5px 0 0 24px; float: left;'>
        校区：<select style="width: 100px" id="add_department_theStore"
                   class="add_theStore" require="require">
        <option></option>
    </select>
    </div>
    <div style='margin: 5px 0 0 0; float: left;'>
        班级名称：<input style="width: 180px" class="add_department_address"
                    require="require"> <input style="display: none"
                                              class="add_department_id">
    </div>
    <div style='margin: 5px 0 0 0; float: left; display: none'
         id="departmentStateDiv">
        班级状态：<select style="width: 180px;" id="add_department_state"
                     class="searchDepartmentState">
    </select>
    </div>
    <div style='margin: 10px 0 0 0; float: left;'>班级编号：</div>
    <div style='margin: 10px 0 0 0; float: left;'>
        <input style="width: 180px" class="add_department_note"
               require="require">
    </div>
    </br>
    <div id="saveAddDepartmentDiv" style="text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save"
           onclick="if(validateRequire('addDepartmentDlg')){doAddDepartment()}">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel"
           onclick="$('#addDepartmentDlg').dialog('close')">关闭</a>
    </div>
    <div id="saveUpdateDepartmentDiv" style="text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save"
           onclick="if(validateRequire('addDepartmentDlg')){doUpdateDepartment()}">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel"
           onclick="$('#addDepartmentDlg').dialog('close')">关闭</a>
    </div>
</div>

<!-- 新增学生详细页面对话框 -->
<div id="addUserDlg" style="padding: 6px" class="easyui-dialog"
     data-options="closed:true">
    <input id="population_index" type="hidden">
    <div style="float: left;">
        <div style='margin: 10px 0 0 33px; float: left;'>
            姓名：<input id="studentName" class="studentName" style="width: 80px" verify="verify" >
        </div>
        <div style='margin: 10px 0 0 5px; float: left;'>
            班级：<input id="studentClass" class="studentClass" style="width: 90px" verify="verify" >
        </div>
        <div style='margin: 10px 0 0 5px; float: left;'>
            班级编号：<input id="studentClassId"  class="studentClassId" style="width: 92px" verify="verify" >
        </div>

        <div style="clear: both"></div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            证件号码：<input class="studentIdcard" id="studentIdcard" style="width: 226px" verify="verify"  >
        </div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            民族：<input  id="studentUserNation"  class="studentUserNation" style="width: 95px" verify="verify" >
        </div>
        <div style="clear: both"></div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            证件地址：<input  id="studentIdcardAddress" class="studentIdcardAddress" style="width: 226px"
                         verify="verify" >
        </div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            籍贯：<input  id="studentNativePlace" style="width: 95px"class="studentNativePlace" style="" clear="clear"  verify="verify">
        </div>
        <div style="clear: both"></div>
        <div style='margin: 10px 0 0 10px; float: left;' >
            居住地址：<input id="studentNowAddress" class="studentNowAddress" style="width: 226px"clear="clear" verify="verify">
        </div>
        <div style='margin:10px 0 0 10px;float: left;'>
            学号：<input id="studentId" style="width:95px;"  clear="clear" verify="verify">
        </div>
        <div style="clear: both"></div>
        <div style="clear:both"></div>
        <div style='margin: 10px 0 0 0px; float: left;' >
            紧急联系人：<input id="studentEmergencycontact"style="width: 110px" class="studentEmergencycontact" verify="verify"/>
        </div>
        <div style='margin: 10px 0 0 90px; float: left;' >
            联系人关系：<select id="studentRelationship" class="studentRelationship" style="width: 95px;">
            <option value="0"></option>
            <option value="父亲">父亲</option>
            <option value="母亲">母亲</option>
            <option value="姐姐">姐姐</option>
            <option value="哥哥">哥哥</option>
            <option value="亲属">亲属</option>
        </select>
        </div>
        <div style="clear: both"></div>
        <div style='margin: 10px 0 0 0px; float: left;'>
            联系人电话：<input id="studentPhone" class="studentPhone" style="width: 100px;"  verify="verify"/>
        </div >
        <div style='margin: 10px 0 0 135px; float: left;'>
            校区：<select style="width: 95px" id="schoolName"
                       class="add_theStore" require="require">
            <option></option>
        </select>
        </div>
    </div>

    <div style="margin: 10px 0 0 45px; float: left;">
        <img width="120px" height="140px" src="images/userImage.png"
             style="margin-left: 5px" ondragstart="return false;" id="userImsphoto">
    </div>
    <div style="clear:both"></div>
    <div style="margin:5px 0 5px 60px; float: left;" id="doorck">
        <button  id="equipmentAuthorization" style="width: 115px ;height: 30px" onclick="equipmentAuthorization()">
            门锁授权
        </button>
    </div>
    <div style="margin: 10px 30px 0 0px; float: right;">
        <a class="easyui-linkbutton" id="userIdCard" onclick="new Device().startFun(this.id)">读取身份证</a>
        <!-- <input  id="adduserIdCard" class="add_userIdCard" style="display: none;"> -->
        <input id="userBirthday" style="display: none;" />	<!-- 身份证出生信息 -->
        <!--<input id="userAddress" />-->						<!-- 身份证住址信息 -->
        <!--<input id="userImsphoto" />	-->						<!-- 身份证头像 -->
        <input id="userSex"style="display: none;" />		<!-- 身份证性别信息 -->
        <!--<input id="userNation" />-->						<!-- 身份证民族信息 -->
        <input id="userIdIssued"style="display: none;" />	<!-- 身份证签发机关信息 -->
        <!--<input id="userIssuedData"/>-->						<!-- 身份证签发时间信息 -->
        <input id="userValidData" style="display: none;"/>	<!-- 身份证有效期信息 -->
    </div>
    <div style="clear: both"></div>
    <div id ="followUpInformationTable1" style="margin: 10px 0 0 0; height: 125px;">
        <table id="followUpInformationTable"></table>
    </div>
    <div style="margin: 10px 0 0 0; text-align: center;">
        <div id="saveAddUserDiv1" style="text-align: center;">
            <div id="errMsg11" style="height:20px;color:red;"></div>
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddUser('addUserDlg')">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addUserDlg').dialog('close')">关闭</a>
        </div>
        <div id="saveUpdateUserDiv1" style="text-align: center;">
            <div id="errMsg21" style="height:20px;color:red;"></div>
            <div id="errMsg2" style="height:20px;color:red;"></div>
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateUser('addUserDlg')">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addUserDlg').dialog('close')">关闭</a>
        </div>
    </div>
</div>
<div id="equipmentAuthorizationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="margin:10px 0 0 5px;">
        设备名称：<input id="searchDevTypeName" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">
        设备SN：<input id="searchDevSnCode" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">
        <input style="width:0px;hight:0px;border:none"><%--此input用来处理chrome浏览器自动填充学生名的--%>
    </div>
    <div style="padding:5px 0 0 0;">
        <table id="personInfomationDivTable" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
            <thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
                <%--<th field="brandName" width="10" align="center">设备品牌</th>--%>
                <th field="devFirstType" width="10" align="center"formatter="formatBrandType">设备类型</th>
                <th field="devSecondType" width="10" align="center"formatter="formatBrandType2">设备型号</th>
                <th field="devNickname" width="10" align="center">设备名称</th>
                <th field="detailedAddress" width="20" align="center">设备安装地址</th>
                <th field="devSn" width="15" align="center">设备SN</th>
            </tr>
            </thead>
        </table>
        <div id="saveequipmentAuthorization" style="text-align: center;margin: 5px 0 5px 0;">
            <a class="easyui-linkbutton" iconcls="" onclick="equipmentAuthorizationNext()">下一步</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#equipmentAuthorizationDlg').dialog('close')">关闭</a>
        </div>
    </div>
</div>
<!-- 发卡窗口  -->
<div id="pushingCardDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div id="pushingCardSelect" style='margin:10px 0 0 15px;float: left;'></div>

    <div style="clear:both"></div>
    <div id="photoUploadDiv"style='margin:10px 0 0 15px;height:20px; float: left;'>
        <a id="photoUpload" class="easyui-linkbutton" style='height:20px;'iconCls="icon-upload" plain="false" onclick="openAttachment('public')">相片上传</a>
    </div>
    <div style='margin:10px 0 0 5px;height:20px; float: left;'>
        <a id="photoDlgs" class="easyui-linkbutton" style='height:20px;'iconCls="icon-upload" plain="false" onclick="new_page()">拍照上传</a>
    </div>
    <div style="clear:both"></div>
    <div style='margin:10px 0 0 15px;float: left;'>
        学生：<input id="selectRentan" readonly="readonly" style="width:120px"/>
    </div>
    <div style="clear:both"></div>
    <div style="text-align:center;">
        <a class="easyui-linkbutton" style="margin:40px 0 0 5px;" onclick="$('#pushingCardDlg').dialog('close')">确定</a>
    </div>
</div>
<div id="deptTransferDlg" style="padding: 6px" class="easyui-dialog"
     data-options="closed:true">
    <fieldset>
        <legend>原先班级</legend>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            校区：<input style="width: 100px" id="originalStore"
                      disabled="disabled"> <input
                style="width: 100px; display: none;" id="originalStoreId">
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            班级：<input style="width: 100px" id="originalDept" disabled="disabled">
            <input style="width: 100px; display: none;" id="originalDeptId">
        </div>
        <div style='display: none'>
            学号：<input style="width: 100px" id="StudentTId" disabled="disabled">
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            姓名：<input style="width: 100px" id="originalUserName"
                      disabled="disabled"> <input style="display: none" id="originalUserId">
        </div>
    </fieldset>
    <fieldset>
        <legend>调转班级</legend>
        <%--<div style='margin: 5px 0 5px 12px; float: left;'>--%>
            <%--校区：<select id='transferStore' style="width: 100px;"--%>
                       <%--onchange="choseStore('transferStore','transferDept','transfer')">--%>
            <%--<option></option>--%>
        <%--</select>--%>
        <%--</div>--%>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            班级：<select id='transferDept' style="width: 100px;">
            <option></option>
        </select>
        </div>
    </fieldset>
    <div style="clear: both"></div>
    </br>
    <div id="transferTips" style="height: 20px; width: 100%;"></div>
    <div style="text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doDeptTransfer()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#deptTransferDlg').dialog('close')">关闭</a>
    </div>
</div>

<div id="employeeTurnoverDlg" style="padding: 6px" class="easyui-dialog" data-options="closed:true">
    <fieldset>
        <legend>离职学生</legend>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            校区：<input style="width: 100px" id="turnoverStore"
                      disabled="disabled">
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            班级：<input style="width: 100px" id="turnoverDept" disabled="disabled">
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            姓名：<input style="width: 100px" id="turnoverUserName"
                      disabled="disabled"> <input style="display: none"
                                                  id="turnoverUserId">
        </div>
    </fieldset>
    <fieldset>
        <legend>接手学生</legend>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            校区：<select id='handlerStore' style="width: 100px;"
                       onchange="choseStore('handlerStore','handlerDept','handler')">
            <option></option>
        </select>
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            班级：<select id='handlerDept' style="width: 100px;"
                       onchange="choseDept('handlerDept','handler')">
            <option></option>
        </select>
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            姓名：<select id='handler' style="width: 100px;">
            <option></option>
        </select>
        </div>
    </fieldset>
    <div style="clear: both"></div>
    </br>
    <div id="turnoverTips" style="height: 20px; width: 100%;"></div>
    <div style="text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doTurnover()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#employeeTurnoverDlg').dialog('close')">关闭</a>
    </div>
</div>
<div id="openIdDg" style="padding: 6px" class="easyui-dialog"data-options="closed:true">
    <div id="openIdQr" style="text-align: center"></div>
    <div style="border: 0"></div>
    <div id="resultTip" style="text-align: center"></div>
</div>
<!-- 关联设备 -->
<div id="officeAssociatedUsersDig"style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <input id="relationIndex" hidden="hidden">
    <div class="search1">
        <div style="margin:5px 0 5px 5px;float:left;">
            设备安装地址：<input id="equipmentType" onkeyup="queryUnrelateddevices()" style="width:120px">
        </div>
        <div style="margin:5px 0 5px 10px;float:left;">
            设备名称：<input id="equipment" onkeyup="queryUnrelateddevices()" style="width:120px">
        </div>
    </div>
    <div style="clear:both;"></div>
    <div style="padding:2px 0 0 0;">
        <div style="padding:5px 0 0 5px;width:40%;float: left;">
            <table id="unRelatedRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
                <thead>
                <tr>
                    <th data-options="field:'ck',checkbox:true"></th>
                    <th field="id" width="2" align="center" hidden="true">id</th>
                    <th field="hsAddCommunity" width="19" align="center">设备安装地址</th>
                    <th field="devNickname" width="24" align="center">设备名称</th>
                </tr>
                </thead>
            </table>
        </div>
        <div style="margin:165px 5px 5px 5px;float: left;">
            <a class="easyui-linkbutton"  iconCls="icon-add" plain="true" onclick="updateHsRelation(0)">添加</a>
            <br>
            <a class="easyui-linkbutton"  iconCls="icon-remove" plain="true" onclick="updateHsRelation(1)">移除</a>
        </div>
        <div style="padding:5px 0 0 5px;width:40%;float: left;">
            <table id="existingRelationRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
                <thead>
                <tr>
                    <th data-options="field:'ck',checkbox:true"></th>
                    <th field="id" width="2" align="center" hidden="true">id</th>
                    <th field="hsAddCommunity" width="19" align="center">设备安装地址</th>
                    <th field="devNickname" width="24" align="center">设备名称</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div style="margin:10px 0 0 0;text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="updateRelations(1,0)" id="saveUsers1">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="$('#officeAssociatedUsersDig').dialog('close')" id="saveUsers2">确认</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#officeAssociatedUsersDig').dialog('close')">取消</a>
    </div>
</div>
<script src="js/school_student.js"></script>
<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
<jsp:include page="/ui/public/photoDlg.jsp"></jsp:include>
<script src="js/fg.public.js"></script>
<script src="js/upload.js"></script>
</body>
</html>