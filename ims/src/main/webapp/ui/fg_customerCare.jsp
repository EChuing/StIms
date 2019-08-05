<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019.5.9
  Time: 18:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<html>
<head>
    <meta charset="utf-8">
    <title>客户关怀</title>
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
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
    <script src="js/config.js"></script>
    <script src="js/fg.public.js"></script>
</head>
<body>
<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<div>
    <div style="margin:5px 0 10px 10px; float:left;">
        <a class="easyui-linkbutton" iconCls="icon-addCare" plain="true" id="addCareButton" onclick="addCare()">添加关怀</a>
    </div>
    <div style="margin:5px 0 10px 10px; float:left;">
        <a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="updateCareButton" onclick="updateCare()">修改关怀信息</a>
    </div>
    <div style="clear:both"></div>
    <div style="margin:0 0 5px 5px;float:left;">
        发送时间：<input id="searchSendingTime" onfocus="WdatePicker({autoPickDate:true,dchanging:queryCare(1, 0)})" style="width:80px">
    </div>
    <div style="margin:0 0 5px 5px;float:left;">
        关怀方式：<select id="searchCaringMode" style="width:100px;" clear="clear" onchange="queryCare(1, 0)">
            <option value="">全部</option>
            <option value="1">短信关怀</option>
        </select>
    </div>
    <div style="padding:0 0 5px 5px;float:left;">
        登记人：<input id="searchRegisterShowUserInfo" class="choose_user_button" doFlag="searchRegister" doFun="queryCare(1,0)"
                   style="width:150px;cursor:pointer;" readonly="readonly" clear="clear" require="require" >
        <input id="searchRegisterGetUserStoreId" type="hidden">
        <input id="searchRegisterGetUserDetId" type="hidden">
        <input id="searchRegisterGetUserId" type="hidden">
        <div id="searchRegisterShowUserInfoDiv" style="display:none;"></div>
    </div>
</div>

<div style='margin:0 auto;width:99%;'>
    <table id="careDataGrid" style="width:100%; height:503px; table-layout:fixed; overflow:hidden;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
        <thead>
        <tr>
            <th field="jcSendingTime" width="10" align="center">发送时间</th>
            <th field="jcCaringContent" width="20" align="center">关怀内容</th>
            <th field="caringMode" width="10" align="center">关怀方式</th>
            <th field="username" width="10" align="center">登记人</th>
            <th field="jcRegisterTime" width="10" align="center">登记时间</th>
        </tr>
        </thead>
    </table>
    <div id="carePageDiv" style="width:100%;text-align:center;"></div>
</div>
<div id="addCareDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="margin: 10px 0 10px 0">
        <label for="sendingTime">发送时间：</label>
        <input id="sendingTime" style="width:100px;" clear="clear" require="require" onfocus="WdatePicker({autoPickDate:true})" >
        <label for="username" style="margin: 0 0 0 20px;">登记人：</label>
        <input id="username" style="width:100px;" clear="clear" require="require" readonly="readonly">
    </div>
    <div style="margin: 10px 0 10px 0">
        关怀方式：
        <select id="caringMode" style="width:100px;" clear="clear" require="require">
                <option value="1">短信关怀</option>
                <option value="2">微信关怀</option>
        </select>
        <span style="margin: 0 0 0 8px;">选择模版：</span>
        <select id="template" style="width:100px;" clear="clear" require="require" onchange="selectedTemplate()">
            <option value=""></option>
        </select>
    </div>
    <div style="margin: 10px 0 10px 0">
        <a style="margin-left: 60px" class="easyui-linkbutton" id="addCare" plain="true" iconcls="icon-renkouguanli" onclick="openCustomerDlg()">选择客户</a>
        <a style="margin-left: 60px;display:none" class="easyui-linkbutton" id="updateCare" plain="true" iconcls="icon-renkouguanli" onclick="openCustomerDlg(1)">选择客户</a>
        <input id="cocId" hidden="hidden">
    </div>
    <div>
        <label for="caringContent">短信示例：</label>
        <textarea type="text" require="require" id="caringContent" readonly="readonly" style="width: 294px;height: 60px;color: #00b7ee"></textarea>
    </div>
    <div style="height: 20px;clear: both"></div>
    <div style="margin:0 auto;text-align: center">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddCare()" id="doAddCare">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-save" style="display:none" onclick="doUpdateCare()" id="doUpdateCare">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addCareDlg').dialog('close')">取消</a>
    </div>
</div>
<div id="queryCareDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="margin: 10px 0 10px 0">
        <label>发送时间：</label>
        <input id="time" style="width:100px;" clear="clear" readonly="readonly">
        <label style="margin: 0 0 0 10px;">登记人：</label>
        <input id="user" style="width:100px;" clear="clear" readonly="readonly">
    </div>
    <div style="margin: 10px 0 10px 0">
        关怀方式：
        <select id="mode" style="width:100px;" clear="clear" disabled="disabled">
            <option value="1">短信关怀</option>
            <option value="2">微信关怀</option>
        </select>
    </div>
    <div>
        <label for="caringContent">关怀内容：</label>
        <textarea id="content" type="text" style="width: 294px;height: 53px;" readonly="readonly"></textarea>
    </div>
    <div style="height: 20px;clear: both"></div>
    <div style="margin:0 auto;text-align: center">
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#queryCareDlg').dialog('close')">关闭</a>
    </div>
</div>
<div id="customerDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="margin:0 0 5px 5px;float:left;">
        姓名：<input id="searchCustomerName" onkeyup="searchOnkeyup(this.id, 'queryCustomer(1, 0)')"
                  style="width:80px">
    </div>
    <div style="margin:0 0 5px 5px;float:left;">
        电话：<input id="searchCustomerPhone" onkeyup="searchOnkeyup(this.id, 'queryCustomer(1, 0)')"
                  style="width:80px">
    </div>
    <div style="margin:0 0 5px 5px;float:left">
        状态：<select id="searchCustomerState" style="width:100px;" onchange="queryCustomer(1,0)">
        <option value="">全部</option>
        <option value="潜在客户">潜在客户</option>
        <option value="意向客户">意向客户</option>
        <option value="暂缓">暂缓</option>
        <option value="报备">报备</option>
        <option value="无效">无效</option>
     </select>
    </div>
    <!--客户信息列表-->
    <div id="DataGridCustomer" style="width:100%;height:90%;">
        <table id="customerDg" style="width:100%;height:503px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
            <thead>
            <tr>
                <th data-options="field:'ck',checkbox:true"></th>
                <th field="cocContacts" width="15" align="center">联系人</th>
                <th field="cocPhone" width="20" align="center">电话号码</th>
                <th field="cocCompany" width="20" align="center">公司名称</th>
                <th field="cocFixedTelephone" width="10" align="center">固定电话</th>
                <th field="cocGrade" width="10" align="center">客户等级</th>
                <th field="cocType" width="10" align="center">类型</th>
                <th field="cocRelation" width="15" align="center">关系</th>
                <th field="cocSource" width="20" align="center">来源</th>
                <th field="cocRegisterTime" width="15" align="center">登记日期</th>
            </tr>
            </thead>
        </table>
        <div style="height: 10px"></div>
        <div style="margin:0 auto;text-align: center">
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doSelectedCustomer()" id="doSelectedCustomer">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#customerDlg').dialog('close')">取消</a>
        </div>
    </div>
</div>
</body>
<script src="js/fg_customerCare.js"></script>
</html>

