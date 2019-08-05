<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<%
    SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo");
%>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>教师管理</title>
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
<!--校区管理列表-->
<div id="DataGridStorefront" style="width: 20%; height: 100%; float: left">
    <!--校区管理工具-->
    <div id="storefrontTb" style="height: auto">
        <div style="margin: 5px 0 0 0;">
            <a class="easyui-linkbutton" iconCls="icon-xinzengdianmian"
               plain="true" id="addStorefrontButton" onclick="addStorefrontDlg()">新增校区</a>
            <a class="easyui-linkbutton" iconCls="icon-edit-zuke" plain="true"
               id="delStorefrontButton" onclick="uppStorefront()">修改校区</a>
        </div>
    </div>
    <div style="margin: 0 0 0 5px">
        <div style="margin: 3px 0 5px 5px; color: black; float: left">
            校区状态：<select id="searchStorefrontState"
                         class="searchStorefrontState" style="width: 80px"
                         onchange="queryStorefront()">
        </select>
        </div>
    </div>
    <table id="storefrontDg"
           style="width: 100%; height: 80%; table-layout: fixed; overflow: hidden;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="storefrontId" width="10" align="center">校区编号</th>
            <th field="storefrontName" width="25" align="center">校区名称</th>
        </tr>
        </thead>
    </table>
    <div id="storefrontPageDiv" style="width: 100%; text-align: center;"></div>
</div>
<!--部门管理列表-->
<div id="DataGridDepartment"
     style="width: 20%; height: 100%; float: left">
    <!--部门管理工具-->
    <div id="departmentTb" style="height: auto">
        <div style="margin: 5px 0 0 0;">
            <a class="easyui-linkbutton" iconCls="icon-xinzengdianmian"
               plain="true" id="addDepartmentButton" onclick="addDepartmentDlg()">新增部门</a>
            <a class="easyui-linkbutton" iconCls="icon-xinzengbumen"
               plain="true" id="updateDepartmentButton" onclick="uppDepartment()">修改部门</a>
        </div>
    </div>
    <div style="margin: 0 0 0 5px">
        <div style="margin: 3px 0 5px 5px; color: black; float: left">
            部门状态：<select id="searchDepartmentState"
                         class="searchDepartmentState" style="width: 80px"
                         onchange="queryDepartment()">
        </select>
        </div>
    </div>
    <table id="departmentDg"
           style="width: 100%; height: 80%; table-layout: fixed; overflow: hidden;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="departmentId" width="10" align="center">部门编号</th>
            <th field="departmentName" width="25" align="center">部门名称</th>
        </tr>
        </thead>
    </table>
    <div id="departmentPageDiv" style="width: 100%; text-align: center;"></div>
</div>
<!--教师管理列表-->
<div id="DataGridUser" style="width: 60%; height: 100%; float: left">
    <!--教师管理工具-->
    <div id="userInfoTb" style="height:auto">
        <div style="margin:5px 0 0 0;">
            <a class="easyui-linkbutton" iconCls="icon-add-zuke" plain="true"
               id="addUserButton" onclick="addUserDlg()">新增教师</a>
            <a class="easyui-linkbutton" iconCls="icon-edit-zuke" plain="true"
               id="quitUserButton" onclick="employeeQuit()">普通离职</a>
            <a class="easyui-linkbutton" iconCls="icon-edit-zuke" plain="true"
               id="outUserButton" onclick="employeeTurnover()">教师离职交接</a>
            <%--<a class="easyui-linkbutton" iconCls="icon-add-zuke" plain="true"--%>
               <%--onclick="getCodeUrl()">微信授权</a>--%>
            <a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true"
               id="deptTransfer" onclick="deptTransfer()">部门调换</a>
            <%--<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true"--%>
               <%--onclick="open_common_img_dialog('private', 'users', 'userDg', 'userId', 'suImgPath', 'queryUserById', 'deleteUserPic')">上传及查看图片</a>--%>
        </div>
        <div style="clear: both"></div>
        <div id="searchUser" style="margin: 0 0 0 5px">
            <div style="margin: 3px 0 5px 5px; color: black; float: left">
                姓名：<input id="searchSuStaffName"
                          onkeyup="searchOnkeyup(this.id, 'queryUser()')"
                          style="width: 80px">
            </div>
            <div style="margin: 3px 0 5px 5px; color: black; float: left">
                教师状态：<select id="searchSuStaffState" class="searchSuStaffState"
                             onchange="queryUser()" style="width: 80px">
            </select>
            </div>
            <input style="width:0px;hight:0px;border:none"><%--此input用来处理chrome浏览器自动填充教师名的，页面加载完成后会干掉它--%>
        </div>
    </div>
    <table id="userDg"
           style="width: 100%; height: 80%; table-layout: fixed; overflow: hidden;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="suState" width="10" align="center">教师状态</th>
            <th field="suStaffName" width="10" align="center">姓名</th>
            <th field="suContact" width="15" align="center">手机号码</th>
            <th field="suName" width="10" align="center">教师账号</th>
        </thead>
    </table>
    <div id="userPageDiv" style="width: 100%; text-align: center;"></div>
</div>
<!-- 新增校区对话框 -->
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
<!-- 新增部门对话框 -->
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
        部门名称：<input style="width: 180px" class="add_department_address"
                    require="require"> <input style="display: none"
                                              class="add_department_id">
    </div>
    <div style='margin: 5px 0 0 0; float: left; display: none'
         id="departmentStateDiv">
        部门状态：<select style="width: 180px" id="add_department_state"
                     class="searchDepartmentState">
    </select>
    </div>
    <div style='margin: 5px 0 0 0; float: left;'>部门描述：</div>
    <div style='margin: 5px 0 5px 0; float: left;'>
			<textarea style="width: 180px; height: 60px"
                      class="add_department_note"></textarea>
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

<!-- 新增教师详细页面对话框 -->
<div id="addUserDlg" style="padding: 6px" class="easyui-dialog"
     data-options="closed:true">
    <input id="population_index" type="hidden">
    <div style="float: left;">
        <div style='margin: 10px 0 0 10px; float: left;'>
            教师状态：<select style="width:100px;" id="add_userState" class="searchSuStaffState">
        </select>
        </div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            姓名：<input id="add_userName" class="add_userName" style="width: 80px" verify="verify" >
        </div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            电话：<input id="pop_telephone"  class="add_userPhone" style="width: 80px" verify="verify" >
        </div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            备注：<input id="remark" class="remark" style=""  >
        </div>
        <div style="clear: both"></div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            证件号码：<input class="add_userIdCard" id="addUserIdCard" style="width: 226px" verify="verify"  >
        </div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            民族：<input  id="userNation"  class="userNation" style="width: 80px" verify="verify" >

        </div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            籍贯：<input  id="nativeplace" class="nativeplace" style="" clear="clear"  verify="verify">
        </div>
        <div style="clear: both"></div>
        <div style='margin: 10px 0 0 10px; float: left;'>
            证件地址：<input  id="userAddress" class="userAddress" style="width: 226px"
                         verify="verify" >
        </div>
        <div style='margin: 10px 0 0 112px; float: left;' >
            婚姻状况：<select id="marriage" class="marriage" style="" >
            <option value="0"></option>
            <option value="已婚">已婚</option>
            <option value="未婚">未婚</option>
            <option value="离异">离异</option>
            <option value="其他">其他</option>
        </select>

        </div>
        <div style="clear: both"></div>
        <div style='margin: 10px 0 0 10px; float: left;' >
            居住地址：<input id="currentAddress" class="currentAddress" style="width: 226px"
                        clear="clear" verify="verify">
        </div>
        <div style='margin: 10px 0 0 100px; float: left;' >
            紧急联系人：<input id="linkman" class="linkman" verify="verify"/>
        </div>

        <div style="clear: both"></div>
        <div style='margin:10px 0 0 10px;float: left;'>
            安全级别：<select style="width:60px" class="add_checkType" needs=1>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        </div>
        <div style='margin:10px 0 0 34px;float: left;'>
            工号：<input id="doorCardNum" style="width:96px;"  clear="clear" verify="verify">
        </div>
        <div style='margin:10px 0 0 112px;float: left;'>
            安全加密：<input style="width:100px" class="add_check" >
        </div>
        <div style="clear:both"></div>
        <div style='margin:10px 0 0 14px;float: left;'>
            运维app：<select style="width:60px" id="appAuth">
            <option value="1">是</option><option value="0">否</option>
        </select>
        </div>
        <div style='margin:10px 0 0 10px;float: left;'>
            教师账号：<input style="width:96px" class="add_userAccount" needs="1"  verify="verify">
        </div>
        <div style='margin:5px 0 0 112px;float: left;'>
            登录密码：<input style="width:100px" class="add_userPassword" type="password" needs="1"  verify="verify">
            <%--<a class="easyui-linkbutton" id="showPassword" onclick="showPassword()" >显示密码</a>--%>
        </div>
        <div style="clear: both;"></div>
        <div style='margin: 10px 0 0 6px; float: left;'>
            备注信息：
            <textarea id="servicememotextnull" class="servicememotextnull" rows="" cols="" style="width: 226px; height: 56px;" ></textarea>
        </div>

        <div style='margin: 10px 0 0 100px; float: left;' >
            联系人关系：<select id="linkmanrelation" class="linkmanrelation" style="width: 100px;">
            <option value="0"></option>
            <option value="父母">父母</option>
            <option value="兄弟">兄弟</option>
            <option value="姐妹">姐妹</option>
            <option value="子女">子女</option>
            <option value="亲属">亲属</option>
        </select>
        </div>

        <div style="clear: both"></div>
        <div style='margin: -25px 0 0 396px; float: left;'>
            联系人电话：<input id="linkmanphone" class="linkmanphone" style="width: 100px;"  verify="verify"/>
        </div >
        <div style="clear: both"></div>

    </div>

    <div style="margin: 10px 0 0 45px; float: left;">
        <img width="120px" height="140px" src="images/userImage.png"
             style="margin-left: 5px" ondragstart="return false;" id="userImsphoto">

    </div>
    <div style="margin: 10px 0 0 75px; float: left;">
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

    <div style='margin: 5px 0 5px 10px; float: left;'>
        <div style='margin: 5px 0 5px 30px; float: left;display: none;'>
            <button style="width: 115px;height: 30px;">
                工作经历
            </button>
        </div>
        <div style='margin: 5px 0 5px 30px; float: left;display: none;'>
            <button style="width: 115px;height: 30px;">
                教育经历
            </button>
        </div>
        <div style='margin: 5px 0 5px 30px; float: left;display: none;'>
            <button style="width: 115px;height: 30px;">
                奖罚信息
            </button>
        </div>
        <div style='margin: 5px 0 5px 60px; float: left;'id="beinofficeinformation">
            <button style="width: 115px;height: 30px; " onclick="upastheinformation()">
                任职信息
            </button>
        </div>

        <div style='margin: 10px 0 5px 60px; float: left;'id="managementEquipment">
            <button style="width: 115px;height: 30px; " onclick="upmanagementEquipment(1)">
                管理设备
            </button>
        </div>
        <div style='margin: 10px 0 5px 60px; float: left;'id="managementEquipment1">
            <button style="width: 115px;height: 30px; " onclick="upmanagementEquipment(2)">
                管理设备
            </button>
        </div>
        <div style="margin:10px 0 5px 60px; float: left;">
            <button  id="equipmentAuthorization" style="width: 115px ;height: 30px" onclick="equipmentAuthorization()">
                门锁授权
            </button>
        </div>
        <div style="margin:10px 0 5px 60px; float: left;">
            <button  id="classAuthority" style="width: 115px ;height: 30px" onclick="classRoomOn()">
                班级权限
            </button>
        <%--<input id="listInfoHouse4store" type="hidden" must="must">--%>
        </div>
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
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateUser('addUserDlg')">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addUserDlg').dialog('close')">关闭</a>
        </div>
    </div>
</div>
<div id="equipmentAuthorizationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="margin:10px 0 0 5px;">
        <%--设备品牌：<input id="searchBrandShowBrandInfo" class="choose_brand_button" doFlag="searchBrand" doFun="queryDeviceInfo(1)"--%>
        <%--style="width:150px;cursor: pointer;" type="text" readonly="readonly">--%>
        <%--<div id="searchBrandShowBrandInfoDiv" style="display:none;"></div>--%>
        <%--<label for="searchDevTypeShowDeviceType">设备类型：</label>--%>
        <%--<input id="searchDevTypeShowDeviceType" class="choose_device_type_button" doFlag="searchDevType" doFun="queryDeviceInfo(1)"--%>
        <%--style="width:100px;cursor: pointer;" type="text" readonly="readonly">--%>
        <%--<input id="searchDevTypeGetDeviceName" type="hidden">--%>
        <%--<input id="searchDevTypeGetDeviceOneId" type="hidden">--%>
        <%--<input id="searchDevTypeGetDeviceType" type="hidden">--%>
        <%--<input id="searchDevTypeGetDeviceTwoId" type="hidden">--%>
        <%--<div id="searchDevTypeShowDeviceTypeDiv" style="display:none;"></div>--%>
        设备名称：<input id="searchDevTypeName" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">
        设备SN：<input id="searchDevSnCode" onkeyup="searchOnkeyup(this.id, 'queryDeviceInfo(1)')" style="width:100px">
        <input style="width:0px;hight:0px;border:none"><%--此input用来处理chrome浏览器自动填充教师名的--%>
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
        教师：<input id="selectRentan" readonly="readonly" style="width:120px"/>
    </div>
    <div style='margin:10px 0 0 15px;float: left;'>
        授权：<input id="cardId" onkeyup="value=value.replace(/[\W]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" style="width:120px;" autocomplete="off" type="text" onfocus="this.type='password'"/>
    </div>
    <%--<div style='margin:10px 0 0 15px;float: left;'>
        卡号：<input id="" style="width:120px;"  clear="clear">
    </div>--%>
    <div style="clear:both"></div>
    <div style="text-align:center;">
        <a class="easyui-linkbutton" style="margin:40px 0 0 5px;" onclick="$('#pushingCardDlg').dialog('close')">确定</a>
    </div>
</div>

<!--折扣授权信息-->
<div id="discountAuthDlg" class="easyui-dialog" data-options="closed:true">
    <div style='margin: 5px 0 0 40px; float: left;' >
        折扣授权密码：<input id="authPassword" class="authPassword" type="password" style="width: 100px;" require ='required'/>
    </div>

    <div style='margin: 5px 0 0 40px; float: left;'>
        折扣授权卡密码：<input id="cardPassword" class="authPassword" type="password" style="width: 100px;" require ='required'/>
    </div>

    <div style="text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save" style="margin: 10px 0 0 0" onclick="$('#discountAuthDlg').dialog('close')">确定</a>
    </div>
</div>

<div id="deptTransferDlg" style="padding: 6px" class="easyui-dialog"
     data-options="closed:true">
    <fieldset>
        <legend>原先部门</legend>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            校区：<input style="width: 100px" id="originalStore"
                      disabled="disabled"> <input
                style="width: 100px; display: none;" id="originalStoreId">
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            部门：<input style="width: 100px" id="originalDept" disabled="disabled">
            <input style="width: 100px; display: none;" id="originalDeptId">
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            姓名：<input style="width: 100px" id="originalUserName"
                      disabled="disabled"> <input style="display: none"
                                                  id="originalUserId">
        </div>
    </fieldset>
    <fieldset>
        <legend>调转部门</legend>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            校区：<select id='transferStore' style="width: 100px;"
                       onchange="choseStore('transferStore','transferDept','transfer')">
            <option></option>
        </select>
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            部门：<select id='transferDept' style="width: 100px;">
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
        <legend>离职教师</legend>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            校区：<input style="width: 100px" id="turnoverStore"
                      disabled="disabled">
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            部门：<input style="width: 100px" id="turnoverDept" disabled="disabled">
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            姓名：<input style="width: 100px" id="turnoverUserName"
                      disabled="disabled"> <input style="display: none"
                                                  id="turnoverUserId">
        </div>
    </fieldset>
    <fieldset>
        <legend>接手教师</legend>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            校区：<select id='handlerStore' style="width: 100px;"
                       onchange="choseStore('handlerStore','handlerDept','handler')">
            <option></option>
        </select>
        </div>
        <div style='margin: 5px 0 5px 12px; float: left;'>
            部门：<select id='handlerDept' style="width: 100px;"
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
<!-- 任职详细窗口 -->
<div id="astheinformation" style="padding:6px" class="easyui-dialog"
     data-options="closed:true">
    <input id="updateuserId" type="hidden">
    <div class="do_overDiv"></div>
    <fieldset>
        <legend>职位信息</legend>

        <div style='margin:5px 0 0 24px;float: left;'>
            校区：<select style="width:80px" id="addTheStore"
                       onchange="storeAndDepartment('add','noSelect')"
                       class="add_theStore" needs="1">
            <option></option>
        </select>
        </div>
        <div style='margin:5px 0 0 34px;float: left;'>
            部门：<select style="width:80px" id="addTheDepartment"
                       class="add_theDepartment" needs="1">
            <option></option>
        </select>
        </div>
        <div style='margin:5px 0 0 10px;float: left;'>
            岗位：
            <select class="add_userType" style="width:100px;" clear="clear" require="require" needs=1>
                <option></option>
            </select>
        </div>
    </fieldset>
    <fieldset>
        <legend>基本信息</legend>
        <div style='margin:5px 0 0 0px;float: left;'>
            <input style="display:none" class="add_userId">
        </div>

        <div style="clear:both"></div>
        <!-- <div style='margin:5px 0 0 0;float: left;'>
            联系电话：<input style="width:150px" class="add_userPhone">
        </div>
         -->
        <div style='margin:5px 0 0 22px;float: left;'>
        </div>
        <div style="clear:both"></div>
        <div style='margin:5px 0 0 0px;float: left;'>
            银行名称：<select style="width:150px" class="add_userBankType">
            <option></option>
        </select>
        </div>
        <div style='margin:5px 0 0 10px;float: left;'>
            银行卡号：<input style="width:150px" class="add_userBankNum">
        </div>
        <div style="clear:both"></div>
        <div style='margin:5px 0 0 25px;float: left;'>
            权限：<select style="width:150px" class="add_permissions" needs="1">
            <option></option>
        </select>
        </div>

        <div style="clear:both"></div>
        <div style='margin:5px 0 0 0;float: left;'>
            直属上级：<input id="doEventShowUserInfo" style="width:150px;cursor: pointer;" type="text"
                        readonly="readonly" clear="clear" require="require" class="choose_user_button"  doFlag="doEvent" doFun="" >
            <input id="doEventGetUserStoreId" type="hidden" clear="clear">
            <input id="doEventGetUserDetId" type="hidden" clear="clear">
            <input id="doEventGetUserId" type="hidden" clear="clear">
            <div id="doEventShowUserInfoDiv" style="display:none;"></div>
        </div>
        <div style='float:left;margin-left:64px;height:20px'>
            <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true"
               onclick="open_common_img_dialog('private', 'users', 'userDg', 'userId', 'suImgPath', 'queryUserById', 'deleteUserPic')">上传及查看图片</a>
        </div>
        <div style="clear: both;"></div>
    </fieldset>
    <div style="clear:both"></div>
    </br>
    <div style="margin: 10px 0 0 0; text-align: center;">
        <div id="saveAddUserDiv" style="text-align: center;">
            <div id="errMsg1" style="height:20px;color:red;"></div>
        </div>
        <div id="saveUpdateUserDiv" style="text-align: center;">
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateUser('astheinformation')">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#astheinformation').dialog('close')">关闭</a>
        </div>
    </div>
</div>

<!--教室选择-->
<div id="classRoomDiv" style="padding:6px;" class="easyui-dialog" data-options="closed:true">

    <div style="margin:5px 10px 10px 5px;color:black;float:left;">
        <label for="roomName">地址名称：</label>
        <input id="roomName" onkeyup="searchOnkeyup(this.id, 'queryClassRoom(1)')">
    </div>

    <div style="margin:5px 10px 10px 0px;color:black;float:left;">
        状态：<select id="roomState" onchange="queryClassRoom(1)" >
            <option value="正常">正常</option>
            <option value="注销">注销</option>
        </select>
    </div>

    <div style="margin:5px 10px 10px 0px;color:black;font-size:13px;float:left;">
        类型：<select id="hsAddCity" onchange="queryClassRoom(1)" >
            <option value="教室">教室</option>
            <option value="公区">公区</option>
            <option value="办公室">办公室</option>
        </select>
    </div>

    <div style="margin:5px 0 10px 0px;color:black;font-size:13px;float:left;">
        绑定情况：<select id="userClass" onchange="queryClassRoom(1)" >
            <option value="未绑定">未绑定</option>
            <option value="已绑定">已绑定</option>
        </select>
    </div>
    <div style="clear:both;"></div>
    <hr color=#95b8e7 size=1 style="margin:0 0 10px 0">

    <table id="classRoomDataGrid" style="width:100%; height:453px; table-layout:fixed; overflow:hidden; float: left;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
        <thead>
        <tr>
            <th id="checkAll" data-options="field:'ck',checkbox:true"></th>
            <th field="hsAddCommunity" width="70" align="center">地址名称</th>
            <th field="hsState" width="30" align="center">状态</th>
        </tr>
        </thead>
    </table>
    <div id="classRoomDataGridPageDiv" style="width: 100%; text-align: center;"></div>
    <div style="margin:20px 0 0 0;text-align: center;">
        <a class="easyui-linkbutton" iconCls="icon-save" id="cancelBinding" onclick="cancelBinding()">取消绑定</a>
        <a class="easyui-linkbutton" iconcls="icon-save" id="addClassRoom" onclick="addClassRoom()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="closeClassRoom()">取消</a>
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
<script src="js/school_teacher.js"></script>
<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
<jsp:include page="/ui/public/photoDlg.jsp"></jsp:include>
<script src="js/fg.public.js"></script>
<script src="js/upload.js"></script>
</body>
</html>
